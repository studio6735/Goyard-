import { Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PRODUCT_CONFIG } from '../config/product.ts';
import { formatPriceFCFA } from '../utils/order.ts';

export function DeliveryGuide() {
  return (
    <section id="livraison" className="py-16 sm:py-24 bg-[#F5EFEB] border-t border-[#E8E2D5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8F723D] font-semibold">
            Processus Simple & Rapide
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2824] font-normal">
            Comment se déroule votre commande ?
          </h2>
          <p className="text-sm text-[#6E6860] leading-relaxed">
            Profitez d’une expérience d’achat directe, pensée pour votre confort et sans inscription préalable.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-7 rounded-xs border border-[#E8E2D5] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xs bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center text-[#8F723D] font-serif font-bold text-lg">
              1
            </div>
            <h3 className="font-serif text-xl text-[#2C2824] font-medium">
              Prix Unique & Fixe
            </h3>
            <p className="text-xs text-[#6E6860] leading-relaxed">
              Le {PRODUCT_CONFIG.name} est proposé au tarif fixe de {formatPriceFCFA(PRODUCT_CONFIG.unitPriceFCFA)}. Sélectionnez la quantité souhaitée, le total se calcule instantanément.
            </p>
          </div>

          <div className="bg-white p-7 rounded-xs border border-[#E8E2D5] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xs bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center text-[#8F723D]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#2C2824] font-medium">
              Organisation de la Livraison
            </h3>
            <p className="text-xs text-[#6E6860] leading-relaxed">
              Renseignez votre nom, votre contact et votre adresse ou lieu de livraison pour coordonner la remise en toute simplicité.
            </p>
          </div>

          <div className="bg-white p-7 rounded-xs border border-[#E8E2D5] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xs bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center text-[#8F723D]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#2C2824] font-medium">
              Règlement à la Réception
            </h3>
            <p className="text-xs text-[#6E6860] leading-relaxed">
              Aucun paiement en ligne requis. Vous réglez directement le montant exact en espèces ou mobile money lors de la remise de votre commande.
            </p>
          </div>

        </div>

        {/* Reassurance Banner */}
        <div className="bg-white border border-[#E8E2D5] p-6 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#8F723D] shrink-0" />
            <p className="text-xs sm:text-sm text-[#2C2824]">
              Prêt à commander ? Le formulaire est accessible directement en haut de page.
            </p>
          </div>
          <a
            href="#commande"
            className="px-5 py-2.5 bg-[#B89758] hover:bg-[#A38346] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
          >
            Accéder à la commande
          </a>
        </div>

      </div>
    </section>
  );
}
