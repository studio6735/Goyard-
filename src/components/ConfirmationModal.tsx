import { CheckCircle2, ArrowLeft, Info, MapPin, User, Phone, Package, Hash } from 'lucide-react';
import type { ConfirmedOrderData } from '../types/index.ts';
import { formatPriceFCFA } from '../utils/order.ts';

interface ConfirmationModalProps {
  order: ConfirmedOrderData | null;
  onClose: () => void;
}

export function ConfirmationModal({ order, onClose }: ConfirmationModalProps) {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <div
        className="relative w-full max-w-xl bg-white border border-[#E8E2D5] rounded-xs shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Line */}
        <div className="h-1 bg-gradient-to-r from-[#8F723D] via-[#B89758] to-[#DFC7A5]" />

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header & Success Icon */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F4EFE6] border border-[#B89758]/40 flex items-center justify-center text-[#8F723D]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-[11px] uppercase tracking-[0.2em] text-[#8F723D] font-semibold">
              Confirmation de Commande
            </div>

            {/* MANDATORY EXACT TEXT REQUIRED BY USER */}
            <h2 id="confirmation-title" className="font-serif text-2xl sm:text-3xl text-[#2C2824] font-normal leading-snug">
              Votre commande a été enregistrée avec succès. Merci pour votre confiance !
            </h2>

            <p className="text-xs text-[#6E6860]">
              Récapitulatif de votre commande directe en session de démonstration.
            </p>
          </div>

          {/* Reference Card with explicit demo warning */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xs text-center space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-[#948E84] flex items-center justify-center gap-1 font-medium">
              <Hash className="w-3 h-3 text-[#B89758]" />
              <span>Numéro de référence temporaire</span>
            </div>
            <div className="text-2xl font-bold font-mono tracking-widest text-[#8F723D]">
              {order.reference}
            </div>
            <div className="text-[10px] text-[#948E84]">
              Généré côté navigateur pour cette session de démonstration
            </div>
          </div>

          {/* Transparent Demonstration Limitation Disclaimer (Mandatory) */}
          <div className="p-4 bg-[#F4EFE6] border border-[#E8E2D5] rounded-xs text-xs text-[#6E6860] flex gap-3 leading-relaxed">
            <Info className="w-4 h-4 text-[#8F723D] shrink-0 mt-0.5" />
            <div className="text-[11px]">
              <strong className="text-[#2C2824]">Information importante :</strong> Cette commande est enregistrée uniquement dans la mémoire temporaire de votre navigateur. Elle n'est pas transmise au vendeur ni enregistrée sur un serveur et ne sera pas conservée durablement après la fermeture ou l'actualisation de la page.
            </div>
          </div>

          {/* Order Item & Total Recap (Mandatory) */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D5] rounded-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 font-semibold text-[#2C2824] uppercase tracking-wider pb-2 border-b border-[#E8E2D5]">
              <Package className="w-4 h-4 text-[#B89758]" />
              <span>Article commandé</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                {order.productImage && (
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-12 h-14 object-cover object-top rounded-xs border border-[#E8E2D5]"
                  />
                )}
                <div>
                  <span className="font-medium text-[#2C2824] block">{order.productName}</span>
                  <span className="text-xs text-[#948E84]">Prix fixe : {formatPriceFCFA(order.unitPriceFCFA)}</span>
                </div>
              </div>
              <span className="text-[#6E6860] tabular-nums font-medium">
                {order.quantity} pièce{order.quantity > 1 ? 's' : ''}
              </span>
            </div>

            <div className="pt-2 border-t border-[#E8E2D5] flex justify-between items-baseline text-base font-bold text-[#2C2824]">
              <span>Montant total :</span>
              <span className="text-[#8F723D] text-lg tabular-nums font-sans">
                {formatPriceFCFA(order.totalFCFA)}
              </span>
            </div>
          </div>

          {/* Customer & Delivery Destination Recap */}
          <div className="p-4 bg-white border border-[#E8E2D5] rounded-xs space-y-2 text-xs text-[#6E6860]">
            <div className="font-semibold text-[#2C2824] uppercase tracking-wider pb-1">
              Coordonnées de livraison
            </div>
            
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#B89758] shrink-0" />
              <span className="text-[#2C2824] font-medium">{order.customer.fullName}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#B89758] shrink-0" />
              <span>{order.customer.contact}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B89758] shrink-0" />
              <span>{order.customer.deliveryAddress}, {order.customer.deliveryCity}</span>
            </div>

            {order.customer.notes && (
              <div className="pt-1 text-[11px] text-[#948E84] italic">
                « {order.customer.notes} »
              </div>
            )}
          </div>

          {/* Return / Reset Button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 bg-[#B89758] hover:bg-[#A38346] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89758]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Passer une autre commande / Retour</span>
          </button>

        </div>
      </div>
    </div>
  );
}
