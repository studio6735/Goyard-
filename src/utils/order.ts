import type { OrderFormData } from '../types/index.ts';

/**
 * Calcule le montant total : quantité multipliée par le prix unitaire fixe (3 000 FCFA).
 */
export function calculateOrderTotal(quantity: number, unitPriceFCFA: number = 3000): number {
  const safeQty = Math.max(0, Math.floor(quantity));
  return safeQty * unitPriceFCFA;
}

/**
 * Formate un montant numérique en FCFA avec séparateur d'espaces.
 * Exemple: 3000 -> "3 000 FCFA", 9000 -> "9 000 FCFA"
 */
export function formatPriceFCFA(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('fr-FR').format(rounded);
  return `${formatted} FCFA`;
}

/**
 * Génère un numéro de référence temporaire unique pour la session de démonstration.
 * Format : PG-XXXXXX
 */
export function generateOrderReference(): string {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `PG-${randomSuffix}`;
}

/**
 * Valide les informations nécessaires à l'organisation de la livraison.
 */
export function validateOrder(
  formData: OrderFormData,
  quantity: number
): {
  isValid: boolean;
  errors: Partial<Record<keyof OrderFormData | 'quantity', string>>;
} {
  const errors: Partial<Record<keyof OrderFormData | 'quantity', string>> = {};

  if (!quantity || quantity < 1) {
    errors.quantity = 'Veuillez sélectionner au moins 1 pièce.';
  }

  if (!formData.fullName || formData.fullName.trim().length < 2) {
    errors.fullName = 'Veuillez renseigner votre nom complet (au moins 2 caractères).';
  }

  if (!formData.contact || formData.contact.trim().length < 5) {
    errors.contact = 'Veuillez indiquer un numéro de téléphone ou un contact pour la livraison.';
  }

  if (!formData.deliveryCity || formData.deliveryCity.trim().length < 2) {
    errors.deliveryCity = 'Veuillez préciser la ville de livraison (ex : Abidjan, Dakar, etc.).';
  }

  if (!formData.deliveryAddress || formData.deliveryAddress.trim().length < 3) {
    errors.deliveryAddress = 'Veuillez préciser le quartier, la commune ou le lieu exact de livraison.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
