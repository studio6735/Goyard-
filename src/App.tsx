import { useState } from 'react';
import { PRODUCT_CONFIG } from './config/product.ts';
import type { OrderFormData, ConfirmedOrderData } from './types/index.ts';
import { generateOrderReference } from './utils/order.ts';
import { Header } from './components/Header.tsx';
import { ProductSection } from './components/ProductSection.tsx';
import { DeliveryGuide } from './components/DeliveryGuide.tsx';
import { ConfirmationModal } from './components/ConfirmationModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  // Pure in-memory order confirmation state (no localStorage, no server, per strict constraints)
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrderData | null>(null);

  const handleConfirmOrder = (
    formData: OrderFormData,
    quantity: number,
    totalFCFA: number,
    image: string
  ) => {
    const reference = generateOrderReference();
    const orderData: ConfirmedOrderData = {
      reference,
      createdAt: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      productName: PRODUCT_CONFIG.name,
      unitPriceFCFA: PRODUCT_CONFIG.unitPriceFCFA,
      quantity,
      totalFCFA,
      productImage: image,
      customer: formData,
    };

    setConfirmedOrder(orderData);
  };

  const handleCloseConfirmation = () => {
    setConfirmedOrder(null);
  };

  const handleScrollToOrder = () => {
    const el = document.getElementById('commande');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2824]">
      {/* Header with Top Bar Contract */}
      <Header onOrderClick={handleScrollToOrder} />

      {/* Main Single Product Showcase & Direct Order Form */}
      <main className="flex-1">
        <ProductSection onConfirmOrder={handleConfirmOrder} />
        <DeliveryGuide />
      </main>

      {/* Footer with Legal & Technical Transparency */}
      <Footer />

      {/* Order Confirmation Modal with Mandatory Message */}
      <ConfirmationModal
        order={confirmedOrder}
        onClose={handleCloseConfirmation}
      />
    </div>
  );
}
