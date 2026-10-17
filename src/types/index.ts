export interface OrderFormData {
  fullName: string;
  contact: string;
  deliveryCity: string;
  deliveryAddress: string;
  notes?: string;
}

export interface ConfirmedOrderData {
  reference: string;
  createdAt: string;
  productName: string;
  unitPriceFCFA: number;
  quantity: number;
  totalFCFA: number;
  productImage?: string;
  customer: OrderFormData;
}
