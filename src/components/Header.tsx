import { ShoppingBag } from 'lucide-react';
import { PRODUCT_CONFIG } from '../config/product.ts';
import { formatPriceFCFA } from '../utils/order.ts';

interface HeaderProps {
  onOrderClick: () => void;
}

export function Header({ onOrderClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-8 h-18 sm:h-20">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            className="group flex flex-col items-start whitespace-nowrap shrink min-w-0 focus-visible:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-[0.05em] sm:tracking-[0.1em] text-[#2C2824] group-hover:text-[#8F723D] transition-colors">
              MAISON DU PAGNE
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#8F723D] font-sans font-medium">
              Vente Exclusive
            </span>
          </a>

          {/* Zone 2: Clean single-line links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6E6860]">
            <a
              href="#produit"
              className="hover:text-[#2C2824] transition-colors whitespace-nowrap shrink-0"
            >
              Le Pagne
            </a>
            <a
              href="#commande"
              className="hover:text-[#2C2824] transition-colors whitespace-nowrap shrink-0"
            >
              Commander
            </a>
            <a
              href="#livraison"
              className="hover:text-[#2C2824] transition-colors whitespace-nowrap shrink-0"
            >
              Modalités de Livraison
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOrderClick}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#B89758] hover:bg-[#A38346] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89758] whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Commander ({formatPriceFCFA(PRODUCT_CONFIG.unitPriceFCFA)})</span>
              <span className="sm:hidden">Commander</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
