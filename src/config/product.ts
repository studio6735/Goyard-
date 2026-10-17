import pagnePhotoImg from '../../file_00000000319081f4b54991697870ee9c.png';

/**
 * Configuration centrale du produit unique.
 * Le prix unitaire est facilement modifiable ici.
 */
export const PRODUCT_CONFIG = {
  // Nom affiché requis
  name: 'Pagne Goyard',

  // Prix unitaire fixe en FCFA (facilement modifiable)
  unitPriceFCFA: 3000,

  // Devise officielle
  currency: 'FCFA',

  // Photo réelle du produit importée dans Google AI Studio
  defaultImage: pagnePhotoImg,
} as const;
