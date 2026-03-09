/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Central visual config - Roy's Shack
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Everything stored here centrally
 *
 * Placeholder until we have our own
 *
 * Type-safe
 */

import { Category } from '../../core/models/product.model';
import { environment } from '../../../environments/environment';
import { SupportedLanguage } from '../services/translation.service';

const ASSETS = environment.assetsURL;

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

export interface SlideData {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string; // emoji or IMG url
  flagImage?: string; // image url if there is
}

export interface CategoryVisual {
  id: string;
  icon: string; // emoji
  image: string; // emoji or IMG url
}

// ═══════════════════════════════════════════════════════════════════════════
// PLACEHOLDER system
// ═══════════════════════════════════════════════════════════════════════════

const PLACEHOLDER_BASE = 'https://via.placeholder.com';
const PRIMARY_COLOR = '067a45'; // green
const SECONDARY_COLOR = '0b5f39'; // dark green

/**
 * Placeholder generator functions
 */
export const PLACEHOLDERS = {
  /** Products pic placeholder */
  product: (width = 400, height = 400, text = 'Product') =>
    `${PLACEHOLDER_BASE}/${width}x${height}/${PRIMARY_COLOR}/ffffff?text=${encodeURIComponent(text)}`,

  /** Hero/Slide pic placeholder */
  hero: (width = 1920, height = 600, text = 'Hero') =>
    `${PLACEHOLDER_BASE}/${width}x${height}/${PRIMARY_COLOR}/ffffff?text=${encodeURIComponent(text)}`,

  /** Category pic placeholder */
  category: (width = 300, height = 300, text = 'Category') =>
    `${PLACEHOLDER_BASE}/${width}x${height}/${SECONDARY_COLOR}/ffffff?text=${encodeURIComponent(text)}`,

  /** Avatar/profil pic placeholder */
  avatar: (width = 100, height = 100) =>
    `${PLACEHOLDER_BASE}/${width}x${height}/cccccc/666666?text=User`,

  /** Logo placeholder */
  logo: (width = 200, height = 60) =>
    `${PLACEHOLDER_BASE}/${width}x${height}/${PRIMARY_COLOR}/ffffff?text=Roy's+Shack`,
};

// ═══════════════════════════════════════════════════════════════════════════
// ICONS (Current)
// ═══════════════════════════════════════════════════════════════════════════

export const ICONS = {
  // User & Auth
  user: `${ASSETS}/assets/icons/userwhite.webp`,
  login: `${ASSETS}/assets/icons/loginwhite.webp`,

  // Admin
  admin: `${ASSETS}/assets/icons/adminwhite.webp`,

  // Shopping
  basket: `${ASSETS}/assets/icons/basketwhite.webp`,
  buy: `${ASSETS}/assets/icons/buywhite.webp`,

  // Social Media
  facebook: `${ASSETS}/assets/icons/facebookwhite.webp`,
  instagram: `${ASSETS}/assets/icons/instagramwhite.webp`,
  x: `${ASSETS}/assets/icons/xwhite.webp`,

  // Navigation & UI
  support: `${ASSETS}/assets/icons/supportwhite.webp`,
  language: `${ASSETS}/assets/icons/languagewhite.webp`,
  arrow: `${ASSETS}/assets/icons/arrowwhite.webp`,
  search: `${ASSETS}/assets/icons/searchwhite.webp`,
  filter: `${ASSETS}/assets/icons/filterwhite.webp`,

  // Theme
  sun: `${ASSETS}/assets/icons/sun.webp`,
  moon: `${ASSETS}/assets/icons/moon.webp`,

  // Actions
  add: `${ASSETS}/assets/icons/add.webp`,
  delete: `${ASSETS}/assets/icons/deletewhite.webp`,
  edit: `${ASSETS}/assets/icons/rename.webp`,

  // Info
  info: `${ASSETS}/assets/icons/infowhite.webp`,
  calendar: `${ASSETS}/assets/icons/calendarwhite.webp`,
  location: `${ASSETS}/assets/icons/locationwhite.webp`,

  // E-commerce
  favorites: `${ASSETS}/assets/icons/favoriteswhite.webp`,
  order: `${ASSETS}/assets/icons/orderwhite.webp`,
  payment: `${ASSETS}/assets/icons/paymentwhite.webp`,
  shipping: `${ASSETS}/assets/icons/shippingwhite.webp`,

  // Other
  natural: `${ASSETS}/assets/icons/naturalwhite.webp`,
  mail: `${ASSETS}/assets/icons/mailwhite.webp`,
  phone: `${ASSETS}/assets/icons/phonewhite.webp`,
  sale: `${ASSETS}/assets/icons/salewhite.webp`,
  customers: `${ASSETS}/assets/icons/customerswhite.webp`,
  reports: `${ASSETS}/assets/icons/reportwhite.webp`,
  safetypay: `${ASSETS}/assets/icons/safetypaywhite.webp`,
  select: `${ASSETS}/assets/icons/selectwhite.webp`,
  share: `${ASSETS}/assets/icons/sharewhite.webp`,
  ship: `${ASSETS}/assets/icons/shipwhite.webp`,
  sort: `${ASSETS}/assets/icons/sortwhite.webp`,
  support247: `${ASSETS}/assets/icons/247white.webp`,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// PICS (Current + Placeholders)
// ═══════════════════════════════════════════════════════════════════════════

export function getLogoSrc(theme: 'dark' | 'light'): string {
  return theme === 'dark'
    ? `${ASSETS}/assets/images/ROYS_SHACK_WHITE_NF.webp`
    : `${ASSETS}/assets/images/ROYS_SHACK_BLACK_NF.webp`;
}

export const IMAGES = {
  // Logo
  logo: `${ASSETS}/assets/images/ROYS_SHACK_WHITE.webp`,

  // Hero background
  heroBg: `${ASSETS}/assets/images/herobg.webp`,

  // Hero slides
  hero1: `${ASSETS}/assets/images/hero1.webp`,
  hero2: `${ASSETS}/assets/images/hero2.webp`,
  hero3: `${ASSETS}/assets/images/hero3.webp`,
  hero4: `${ASSETS}/assets/images/hero4.webp`,

  // Language flags - emoji version
  flagHungary: '🇭🇺',
  flagEnglish: '🇬🇧',
  flagGerman: '🇩🇪',

  productDefault: PLACEHOLDERS.product(400, 400, 'Termék'),
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE CONFIG
// ═══════════════════════════════════════════════════════════════════════════

export const HERO_SLIDES: SlideData[] = [
  {
    image: IMAGES.hero1,
    title: 'slider.slide1.title',
    subtitle: 'slider.slide1.subtitle',
    cta: 'slider.cta',
    link: '/products',
  },
  {
    image: IMAGES.hero2,
    title: 'slider.slide2.title',
    subtitle: 'slider.slide2.subtitle',
    cta: 'slider.cta',
    link: '/products',
  },
  {
    image: IMAGES.hero3,
    title: 'slider.slide3.title',
    subtitle: 'slider.slide3.subtitle',
    cta: 'slider.cta',
    link: '/products',
  },
  {
    image: IMAGES.hero4,
    title: 'slider.slide4.title',
    subtitle: 'slider.slide4.subtitle',
    cta: 'slider.cta',
    link: '/products',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// LANGUAGE OPTIONS
// ═══════════════════════════════════════════════════════════════════════════

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'hu',
    name: 'Magyar',
    flag: IMAGES.flagHungary,
  },
  {
    code: 'en',
    name: 'English',
    flag: IMAGES.flagEnglish,
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: IMAGES.flagGerman,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION ICONS (Unicode)
// ═══════════════════════════════════════════════════════════════════════════

export const NAV_ICONS = {
  arrowLeft: '‹',
  arrowRight: '›',
  arrowUp: '▴',
  arrowDown: '▾',

  close: '✕',
  check: '✓',
  menu: '☰',

  star: '★',
  starEmpty: '☆',
  heart: '♥',
  heartEmpty: '♡',
} as const;

export const NAV_SVG = {
  arrowLeft: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M15 18l-6-6 6-6"/>
  </svg>`,

  arrowRight: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M9 18l6-6-6-6"/>
  </svg>`,

  close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>`,

  check: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 6L9 17l-5-5"/>
  </svg>`,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY VISUALS
// ═══════════════════════════════════════════════════════════════════════════

export const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  medicine: {
    id: 'medicine',
    icon: '💊',
    image: PLACEHOLDERS.category(300, 300, 'Gyógyszerek'),
  },
  vitamins: {
    id: 'vitamins',
    icon: '🍊',
    image: PLACEHOLDERS.category(300, 300, 'Vitaminok'),
  },
  supplements: {
    id: 'supplements',
    icon: '💪',
    image: PLACEHOLDERS.category(300, 300, 'Táplálékkiegészítők'),
  },
  cosmetics: {
    id: 'cosmetics',
    icon: '💄',
    image: PLACEHOLDERS.category(300, 300, 'Kozmetikumok'),
  },
  'baby-care': {
    id: 'baby-care',
    icon: '👶',
    image: PLACEHOLDERS.category(300, 300, 'Babaápolás'),
  },
  'medical-devices': {
    id: 'medical-devices',
    icon: '🩺',
    image: PLACEHOLDERS.category(300, 300, 'Orvosi eszközök'),
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY NAMES (for conversion to full Category interface)
// ═══════════════════════════════════════════════════════════════════════════

const CATEGORY_NAMES: Record<string, { hu: string; en: string; de: string }> = {
  medicine: {
    hu: 'Gyógyszerek',
    en: 'Medicines',
    de: 'Medikamente',
  },
  vitamins: {
    hu: 'Vitaminok',
    en: 'Vitamins',
    de: 'Vitamine',
  },
  supplements: {
    hu: 'Táplálékkiegészítők',
    en: 'Supplements',
    de: 'Nahrungsergänzungsmittel',
  },
  cosmetics: {
    hu: 'Kozmetikumok',
    en: 'Cosmetics',
    de: 'Kosmetika',
  },
  'baby-care': {
    hu: 'Babaápolás',
    en: 'Baby Care',
    de: 'Babypflege',
  },
  'medical-devices': {
    hu: 'Orvosi eszközök',
    en: 'Medical Devices',
    de: 'Medizinische Geräte',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER Functions
// ═══════════════════════════════════════════════════════════════════════════

export function getImageUrl(path: string | undefined | null, fallback?: string): string {
  if (!path || path === '') {
    return fallback || IMAGES.productDefault;
  }
  return path;
}

export function getCategoryIcon(categoryId: string): string {
  return CATEGORY_VISUALS[categoryId]?.icon || '📦';
}

export function getCategoryImage(categoryId: string): string {
  return CATEGORY_VISUALS[categoryId]?.image || IMAGES.productDefault;
}

export function getHeroSlide(index: number): SlideData {
  return HERO_SLIDES[index] || HERO_SLIDES[0];
}

export function getLanguageOption(code: string): LanguageOption | undefined {
  return LANGUAGE_OPTIONS.find((lang) => lang.code === code);
}

export function getIconUrl(iconKey: keyof typeof ICONS): string {
  return ICONS[iconKey] || '';
}

export function isEmoji(value: string): boolean {
  return value.length <= 4 && /[\u{1F300}-\u{1F9FF}]/u.test(value);
}

export function getCategoriesFromVisuals(): Category[] {
  return Object.values(CATEGORY_VISUALS).map((visual) => ({
    id: visual.id,
    name_hu: '',
    name_en: '',
    name_de: '',
    icon: visual.icon,
    color: '#067a45',
    count: 0,
  }));
}

export function getCategoryById(categoryId: string): Category | undefined {
  const visual = CATEGORY_VISUALS[categoryId];
  if (!visual) return undefined;
  return {
    id: visual.id,
    name_hu: '',
    name_en: '',
    name_de: '',
    icon: visual.icon,
    color: '#067a45',
    count: 0,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type IconKey = keyof typeof ICONS;
export type ImageKey = keyof typeof IMAGES;
export type NavIconKey = keyof typeof NAV_ICONS;
export type CategoryId = keyof typeof CATEGORY_VISUALS;

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export default {
  PLACEHOLDERS,
  ICONS,
  IMAGES,
  HERO_SLIDES,
  LANGUAGE_OPTIONS,
  NAV_ICONS,
  NAV_SVG,
  CATEGORY_VISUALS,

  // Helpers
  getImageUrl,
  getCategoryIcon,
  getCategoryImage,
  getHeroSlide,
  getLanguageOption,
  getIconUrl,
  isEmoji,
  getCategoriesFromVisuals,
  getCategoryById,
};
