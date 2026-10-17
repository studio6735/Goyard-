import { useState } from 'react';
import { Plus, Minus, CheckCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import { PRODUCT_CONFIG } from '../config/product.ts';
import type { OrderFormData } from '../types/index.ts';
import { calculateOrderTotal, formatPriceFCFA, validateOrder } from '../utils/order.ts';

interface ProductSectionProps {
  onConfirmOrder: (formData: OrderFormData, quantity: number, totalFCFA: number, image: string) => void;
}

export function ProductSection({ onConfirmOrder }: ProductSectionProps) {
  // Quantity state (default 1)
  const [quantity, setQuantity] = useState<number>(1);

  // Direct order form state
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    contact: '',
    deliveryCity: '',
    deliveryAddress: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData | 'quantity', string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live total calculation: quantity multiplied by 3 000 FCFA
  const totalFCFA = calculateOrderTotal(quantity, PRODUCT_CONFIG.unitPriceFCFA);

  const handleQuantityChange = (newQty: number) => {
    const valid = Math.max(1, newQty);
    setQuantity(valid);
    if (errors.quantity) {
      setErrors((prev) => ({ ...prev, quantity: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateOrder(formData, quantity);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Instant validation in-memory
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmOrder(formData, quantity, totalFCFA, PRODUCT_CONFIG.defaultImage);
    }, 300);
  };

  return (
    <section id="produit" className="py-12 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Side Image / Right Side Order Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Photo Définitive du Pagne (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative bg-white border border-[#E8E2D5] rounded-xs shadow-sm overflow-hidden">
              <div className="aspect-[3/4] sm:aspect-[4/5] max-h-[620px] bg-[#F7F4EE] relative flex items-center justify-center overflow-hidden">
                <img
                  src={PRODUCT_CONFIG.defaultImage}
                  alt={PRODUCT_CONFIG.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information, Quantity & Direct Order Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-8" id="commande">
            
            {/* Header & Fixed Price */}
            <div className="space-y-2 border-b border-[#E8E2D5] pb-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[#8F723D] font-semibold">
                Produit Unique
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#2C2824] font-normal tracking-tight">
                {PRODUCT_CONFIG.name}
              </h1>

              {/* Fixed Price (3 000 FCFA) */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-[#2C2824] tabular-nums font-sans">
                  {formatPriceFCFA(PRODUCT_CONFIG.unitPriceFCFA)}
                </span>
                <span className="text-xs text-[#948E84] uppercase tracking-wider font-medium">
                  Prix fixe unitaire
                </span>
              </div>
            </div>

            {/* Step 1: Choose Quantity with Live Multiplication */}
            <div className="bg-white border border-[#E8E2D5] p-5 rounded-xs space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="quantity-input" className="text-xs font-semibold uppercase tracking-wider text-[#2C2824] block">
                    1. Choisissez la quantité
                  </label>
                  <p className="text-xs text-[#6E6860] mt-0.5">
                    Sélectionnez le nombre de pièces souhaité
                  </p>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#E8E2D5] bg-[#FAF8F5] rounded-xs">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    aria-label="Diminuer la quantité"
                    className="px-3 py-2 text-[#6E6860] hover:text-[#2C2824] disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-12 text-center text-sm font-semibold text-[#2C2824] bg-transparent focus:outline-none tabular-nums"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    aria-label="Augmenter la quantité"
                    className="px-3 py-2 text-[#6E6860] hover:text-[#2C2824] cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {errors.quantity && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.quantity}</span>
                </p>
              )}

              {/* Dynamic Live Subtotal Banner */}
              <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                <span className="text-[#6E6860]">
                  Calcul : <strong className="text-[#2C2824]">{quantity} pièce{quantity > 1 ? 's' : ''}</strong> × {formatPriceFCFA(PRODUCT_CONFIG.unitPriceFCFA)}
                </span>
                <span className="font-semibold text-sm text-[#8F723D] tabular-nums font-sans">
                  Total : {formatPriceFCFA(totalFCFA)}
                </span>
              </div>
            </div>

            {/* Step 2: Direct Order Form */}
            <form onSubmit={handleSubmit} className="bg-white border border-[#E8E2D5] p-6 sm:p-7 rounded-xs space-y-6 shadow-2xs">
              
              <div className="space-y-1">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#2C2824]">
                  2. Informations de livraison
                </h2>
                <p className="text-xs text-[#6E6860]">
                  Aucun compte ni mot de passe requis. Le montant est réglé en espèces ou mobile money à la remise de votre commande.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-xs font-medium text-[#2C2824] block">
                  Nom et Prénom <span className="text-[#8F723D]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="Ex : Aminata Koné"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-sm text-[#2C2824] placeholder-[#A8A29E] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#B89758] transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-[#E8E2D5]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone / Contact */}
              <div className="space-y-1.5">
                <label htmlFor="contact" className="text-xs font-medium text-[#2C2824] block">
                  Numéro de téléphone / Contact <span className="text-[#8F723D]">*</span>
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  placeholder="Ex : +225 07 12 34 56 78 ou contact@exemple.com"
                  value={formData.contact}
                  onChange={(e) => {
                    setFormData({ ...formData, contact: e.target.value });
                    if (errors.contact) setErrors({ ...errors, contact: undefined });
                  }}
                  className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-sm text-[#2C2824] placeholder-[#A8A29E] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#B89758] transition-colors ${
                    errors.contact ? 'border-red-500' : 'border-[#E8E2D5]'
                  }`}
                />
                {errors.contact && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.contact}</span>
                  </p>
                )}
              </div>

              {/* City and Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="deliveryCity" className="text-xs font-medium text-[#2C2824] block">
                    Ville de livraison <span className="text-[#8F723D]">*</span>
                  </label>
                  <input
                    id="deliveryCity"
                    type="text"
                    required
                    placeholder="Ex : Abidjan, Dakar, Douala..."
                    value={formData.deliveryCity}
                    onChange={(e) => {
                      setFormData({ ...formData, deliveryCity: e.target.value });
                      if (errors.deliveryCity) setErrors({ ...errors, deliveryCity: undefined });
                    }}
                    className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-sm text-[#2C2824] placeholder-[#A8A29E] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#B89758] transition-colors ${
                      errors.deliveryCity ? 'border-red-500' : 'border-[#E8E2D5]'
                    }`}
                  />
                  {errors.deliveryCity && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.deliveryCity}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="deliveryAddress" className="text-xs font-medium text-[#2C2824] block">
                    Quartier ou lieu précis <span className="text-[#8F723D]">*</span>
                  </label>
                  <input
                    id="deliveryAddress"
                    type="text"
                    required
                    placeholder="Ex : Cocody, près du supermarché"
                    value={formData.deliveryAddress}
                    onChange={(e) => {
                      setFormData({ ...formData, deliveryAddress: e.target.value });
                      if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: undefined });
                    }}
                    className={`w-full bg-[#FAF8F5] border px-3.5 py-2.5 text-sm text-[#2C2824] placeholder-[#A8A29E] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#B89758] transition-colors ${
                      errors.deliveryAddress ? 'border-red-500' : 'border-[#E8E2D5]'
                    }`}
                  />
                  {errors.deliveryAddress && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.deliveryAddress}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Notes (Optional) */}
              <div className="space-y-1.5">
                <label htmlFor="notes" className="text-xs font-medium text-[#2C2824] block">
                  Instructions complémentaires pour la livraison (facultatif)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  placeholder="Créneau préféré, précisions pour le livreur..."
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D5] px-3.5 py-2.5 text-sm text-[#2C2824] placeholder-[#A8A29E] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#B89758] transition-colors"
                />
              </div>

              {/* Order Recap Summary Box */}
              <div className="p-4 bg-[#F4EFE6] border border-[#E8E2D5] rounded-xs space-y-2.5">
                <div className="text-xs uppercase tracking-wider text-[#8F723D] font-semibold">
                  Récapitulatif de votre commande
                </div>
                <div className="flex justify-between items-center text-xs text-[#2C2824]">
                  <span>Article :</span>
                  <span className="font-medium">{PRODUCT_CONFIG.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#2C2824]">
                  <span>Quantité :</span>
                  <span className="font-medium tabular-nums">{quantity} pièce{quantity > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#2C2824]">
                  <span>Prix unitaire fixe :</span>
                  <span className="tabular-nums font-sans">{formatPriceFCFA(PRODUCT_CONFIG.unitPriceFCFA)}</span>
                </div>
                <div className="pt-2 border-t border-[#E8E2D5] flex justify-between items-baseline text-base font-bold text-[#2C2824]">
                  <span>Montant total à régler :</span>
                  <span className="text-[#8F723D] text-lg tabular-nums font-sans">
                    {formatPriceFCFA(totalFCFA)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-[#B89758] hover:bg-[#A38346] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89758]"
              >
                <CheckCircle className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Validation en cours...' : 'Confirmer ma commande'}
                </span>
              </button>

              {/* Technical Disclaimer Notice */}
              <div className="flex items-start gap-2 text-[11px] text-[#948E84] leading-normal">
                <ShieldCheck className="w-4 h-4 text-[#8F723D] shrink-0 mt-0.5" />
                <p>
                  Votre commande est enregistrée dans la mémoire de cette session de démonstration. Aucune donnée n’est transmise à un serveur externe ni conservée durablement.
                </p>
              </div>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
