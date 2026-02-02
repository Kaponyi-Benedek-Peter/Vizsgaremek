// Icons
export const ICONS = {
  // User & Auth
  user: 'assets/icons/userwhite.png',
  login: 'assets/icons/loginwhite.png',
  
  // Shopping
  basket: 'assets/icons/basketwhite.png',
  buy: 'assets/icons/buywhite.png',
  
  // Social Media
  facebook: 'assets/icons/facebookwhite.png',
  instagram: 'assets/icons/instagramwhite.png',
  x: 'assets/icons/xwhite.png',
  
  // UI Elements
  support: 'assets/icons/supportwhite.png',
  language: 'assets/icons/languagewhite.png',
  arrow: 'assets/icons/arrowwhite.png',
  search: 'assets/icons/searchwhite.png',
  filter: 'assets/icons/filterwhite.png',
  
  // Theme Toggle (Hozzáadva!)
  sun: 'assets/icons/sun.png',      // Nappali ikon (dark mode-ban látszik)
  moon: 'assets/icons/moon.png',    // Éjszakai ikon (light mode-ban látszik)
  
  // Admin & Management
  add: 'assets/icons/add.png',
  delete: 'assets/icons/deletewhite.png',
  edit: 'assets/icons/rename.png',
  
  // Info & Status
  info: 'assets/icons/infowhite.png',
  calendar: 'assets/icons/calendarwhite.png',
  location: 'assets/icons/locationwhite.png',
  
  // E-commerce
  favorites: 'assets/icons/favoriteswhite.png',
  order: 'assets/icons/orderwhite.png',
  payment: 'assets/icons/paymentwhite.png',
  shipping: 'assets/icons/shippingwhite.png',
  
  // Other
  natural: 'assets/icons/naturalwhite.png',
  mail: 'assets/icons/mailwhite.png',
  phone: 'assets/icons/phonewhite.png',
  sale: 'assets/icons/salewhite.png',
  customers: 'assets/icons/customerswhite.png',
  reports: 'assets/icons/reportwhite.png',
  safetypay: 'assets/icons/safetypaywhite.png',
  select: 'assets/icons/selectwhite.png',
  share: 'assets/icons/sharewhite.png',
  ship: 'assets/icons/shipwhite.png',
  sort: 'assets/icons/sortwhite.png',
  support247: 'assets/icons/247white.png',
} as const;

// Images
export const IMAGES = {
  logo: 'assets/images/ROYS_SHACK_WHITE.png',
  heroBg: 'assets/images/herobg.jpg',
  
  // Hero images
  hero1: 'assets/images/hero1.png',
  hero2: 'assets/images/hero2.png',
  hero3: 'assets/images/hero3.png',
  hero4: 'assets/images/hero4.png',
  
  // Flags
  flagHungary: 'assets/images/Hungary.png',
  flagEnglish: 'assets/images/English.png',
  flagGerman: 'assets/images/German.png',
} as const;

// Export types for type safety
export type IconKey = keyof typeof ICONS;
export type ImageKey = keyof typeof IMAGES;
