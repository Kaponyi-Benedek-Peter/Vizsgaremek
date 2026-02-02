export const ICONS = {
  user: 'assets/icons/userwhite.png',
  login: 'assets/icons/loginwhite.png',

  basket: 'assets/icons/basketwhite.png',
  buy: 'assets/icons/buywhite.png',

  facebook: 'assets/icons/facebookwhite.png',
  instagram: 'assets/icons/instagramwhite.png',
  x: 'assets/icons/xwhite.png',

  support: 'assets/icons/supportwhite.png',
  language: 'assets/icons/languagewhite.png',
  arrow: 'assets/icons/arrowwhite.png',
  search: 'assets/icons/searchwhite.png',
  filter: 'assets/icons/filterwhite.png',

  sun: 'assets/icons/sun.png',
  moon: 'assets/icons/moon.png',

  add: 'assets/icons/add.png',
  delete: 'assets/icons/deletewhite.png',
  edit: 'assets/icons/rename.png',

  info: 'assets/icons/infowhite.png',
  calendar: 'assets/icons/calendarwhite.png',
  location: 'assets/icons/locationwhite.png',

  favorites: 'assets/icons/favoriteswhite.png',
  order: 'assets/icons/orderwhite.png',
  payment: 'assets/icons/paymentwhite.png',
  shipping: 'assets/icons/shippingwhite.png',

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

export const IMAGES = {
  logo: 'assets/images/ROYS_SHACK_WHITE.png',
  heroBg: 'assets/images/herobg.jpg',

  hero1: 'assets/images/hero1.png',
  hero2: 'assets/images/hero2.png',
  hero3: 'assets/images/hero3.png',
  hero4: 'assets/images/hero4.png',

  flagHungary: 'assets/images/Hungary.png',
  flagEnglish: 'assets/images/English.png',
  flagGerman: 'assets/images/German.png',
} as const;

export type IconKey = keyof typeof ICONS;
export type ImageKey = keyof typeof IMAGES;
