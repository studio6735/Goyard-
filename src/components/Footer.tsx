import { ArrowUp, Shield } from 'lucide-react';
import { PRODUCT_CONFIG } from '../config/product.ts';
import { formatPriceFCFA } from '../utils/order.ts';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E2D5] text-[#6E6860] text-xs pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-serif text-2xl text-[#2C2824] tracking-[0.08em] block">
              MAISON DU PAGNE
            </span>
            <p className="text-xs text-[#6E6860] leading-relaxed max-w-sm">
              Boutique dédiée à la vente exclusive du {PRODUCT_CONFIG.name} au prix fixe de {formatPriceFCFA(PRODUCT_CONFIG.unitPriceFCFA)}. Commande directe en quelques clics sans inscription.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#8F723D]">
              <Shield className="w-3.5 h-3.5" />
              <span>Session de démonstration sécurisée sans conservation de données</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider text-[#2C2824] font-semibold">
              Accès Rapide
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#produit" className="hover:text-[#8F723D] transition-colors">
                  Le Pagne ({formatPriceFCFA(PRODUCT_CONFIG.unitPriceFCFA)})
                </a>
              </li>
              <li>
                <a href="#commande" className="hover:text-[#8F723D] transition-colors">
                  Formulaire de Commande Directe
                </a>
              </li>
              <li>
                <a href="#livraison" className="hover:text-[#8F723D] transition-colors">
                  Modalités de Livraison
                </a>
              </li>
            </ul>
          </div>

          {/* Summary / Terms */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider text-[#2C2824] font-semibold">
              Conditions de Commande
            </h4>
            <p className="text-xs text-[#6E6860] leading-relaxed">
              Prix unitaire fixé à {formatPriceFCFA(PRODUCT_CONFIG.unitPriceFCFA)}. Les commandes sont validées instantanément dans votre navigateur pour préparer la remise en mains propres.
            </p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#948E84]">
          <span>© {new Date().getFullYear()} Maison du Pagne. Tous droits réservés.</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#8F723D] hover:text-[#B89758] transition-colors cursor-pointer"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
