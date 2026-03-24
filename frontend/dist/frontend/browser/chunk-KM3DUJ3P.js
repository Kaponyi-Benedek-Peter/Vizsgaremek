import {
  environment
} from "./chunk-JGUC3CXT.js";

// src/app/core/constants/visuals.ts
var ASSETS = environment.assetsURL;
var PLACEHOLDER_BASE = "https://via.placeholder.com";
var PRIMARY_COLOR = "067a45";
var SECONDARY_COLOR = "0b5f39";
var PLACEHOLDERS = {
  product: (width = 400, height = 400, text = "Product") => `${PLACEHOLDER_BASE}/${width}x${height}/${PRIMARY_COLOR}/ffffff?text=${encodeURIComponent(text)}`,
  hero: (width = 1920, height = 600, text = "Hero") => `${PLACEHOLDER_BASE}/${width}x${height}/${PRIMARY_COLOR}/ffffff?text=${encodeURIComponent(text)}`,
  category: (width = 300, height = 300, text = "Category") => `${PLACEHOLDER_BASE}/${width}x${height}/${SECONDARY_COLOR}/ffffff?text=${encodeURIComponent(text)}`,
  avatar: (width = 100, height = 100) => `${PLACEHOLDER_BASE}/${width}x${height}/cccccc/666666?text=User`,
  logo: (width = 200, height = 60) => `${PLACEHOLDER_BASE}/${width}x${height}/${PRIMARY_COLOR}/ffffff?text=Roy's+Shack`
};
var ICONS = {
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
  // ── Forum / Blog ──────────────────────────────────────────────────────────
  forumSearch: `${ASSETS}/assets/icons/forum/search.webp`,
  forumNewPost: `${ASSETS}/assets/icons/forum/new_post.webp`,
  forumReadingTime: `${ASSETS}/assets/icons/forum/reading_time_white.webp`,
  forumDate: `${ASSETS}/assets/icons/forum/date.webp`,
  forumRetry: `${ASSETS}/assets/icons/forum/retry.webp`,
  // ── Post stats ────────────────────────────────────────────────────────────
  statViews: `${ASSETS}/assets/icons/stats/views.webp`,
  statLikes: `${ASSETS}/assets/icons/stats/likes.webp`,
  statComments: `${ASSETS}/assets/icons/stats/comments.webp`,
  // ── Post badges ───────────────────────────────────────────────────────────
  badgePinned: `${ASSETS}/assets/icons/badges/pinned.webp`,
  badgeFeatured: `${ASSETS}/assets/icons/badges/featured.webp`,
  badgeQuestion: `${ASSETS}/assets/icons/badges/question.webp`,
  badgeAnswered: `${ASSETS}/assets/icons/badges/answered.webp`,
  badgeVerified: `${ASSETS}/assets/icons/badges/verified.webp`,
  // ── Category icons (forum chips + product cards) ──────────────────────────
  categoryDefault: `${ASSETS}/assets/icons/categories/default.webp`,
  categoryAll: `${ASSETS}/assets/icons/categories/all.webp`,
  categoryMedicines: `${ASSETS}/assets/icons/categories/medicines.webp`,
  categoryNaturalRemedies: `${ASSETS}/assets/icons/categories/natural_remedies.webp`,
  categoryBabyMother: `${ASSETS}/assets/icons/categories/baby_mother.webp`,
  categoryLifestyle: `${ASSETS}/assets/icons/categories/healthy_lifestyle.webp`,
  categorySeasonalHealth: `${ASSETS}/assets/icons/categories/seasonal_health.webp`,
  categoryQa: `${ASSETS}/assets/icons/categories/qa.webp`,
  categoryGeneral: `${ASSETS}/assets/icons/categories/general.webp`
};
function getLogoSrc(theme) {
  return theme === "dark" ? `${ASSETS}/assets/images/ROYS_SHACK_WHITE_NF.webp` : `${ASSETS}/assets/images/ROYS_SHACK_BLACK_NF.webp`;
}
var IMAGES = {
  // Logo
  logo: `${ASSETS}/assets/images/ROYS_SHACK_WHITE.webp`,
  // Hero background
  heroBg: `${ASSETS}/assets/images/herobg.webp`,
  // Hero slides
  hero1: `${ASSETS}/assets/images/hero1.webp`,
  hero2: `${ASSETS}/assets/images/hero2.webp`,
  hero3: `${ASSETS}/assets/images/hero3.webp`,
  hero4: `${ASSETS}/assets/images/hero4.webp`,
  // Language flags – actual webp images instead of emoji
  flagHungary: `${ASSETS}/assets/images/Hungary.webp`,
  flagEnglish: `${ASSETS}/assets/images/English.webp`,
  flagGerman: `${ASSETS}/assets/images/German.webp`,
  productDefault: PLACEHOLDERS.product(400, 400, "Term\xE9k"),
  // ── Empty / error state illustrations ─────────────────────────────────────
  stateError: `${ASSETS}/assets/icons/states/error.webp`,
  stateEmptyForum: `${ASSETS}/assets/icons/states/empty_forum.webp`,
  stateNoResults: `${ASSETS}/assets/icons/states/no_results.webp`
};
var HERO_SLIDES = [
  {
    image: IMAGES.hero1,
    title: "slider.slide1.title",
    subtitle: "slider.slide1.subtitle",
    cta: "slider.cta",
    link: "/products"
  },
  {
    image: IMAGES.hero2,
    title: "slider.slide2.title",
    subtitle: "slider.slide2.subtitle",
    cta: "slider.cta",
    link: "/products"
  },
  {
    image: IMAGES.hero3,
    title: "slider.slide3.title",
    subtitle: "slider.slide3.subtitle",
    cta: "slider.cta",
    link: "/products"
  },
  {
    image: IMAGES.hero4,
    title: "slider.slide4.title",
    subtitle: "slider.slide4.subtitle",
    cta: "slider.cta",
    link: "/products"
  }
];
var LANGUAGE_OPTIONS = [
  { code: "hu", name: "Magyar", flag: IMAGES.flagHungary, flagImage: IMAGES.flagHungary },
  { code: "en", name: "English", flag: IMAGES.flagEnglish, flagImage: IMAGES.flagEnglish },
  { code: "de", name: "Deutsch", flag: IMAGES.flagGerman, flagImage: IMAGES.flagGerman }
];
var CATEGORY_VISUALS = {
  medicine: {
    id: "medicine",
    icon: ICONS.categoryMedicines,
    image: PLACEHOLDERS.category(300, 300, "Gy\xF3gyszerek")
  },
  vitamins: {
    id: "vitamins",
    icon: ICONS.categoryNaturalRemedies,
    image: PLACEHOLDERS.category(300, 300, "Vitaminok")
  },
  supplements: {
    id: "supplements",
    icon: ICONS.categoryNaturalRemedies,
    image: PLACEHOLDERS.category(300, 300, "T\xE1pl\xE1l\xE9kkieg\xE9sz\xEDt\u0151k")
  },
  cosmetics: {
    id: "cosmetics",
    icon: ICONS.categoryGeneral,
    image: PLACEHOLDERS.category(300, 300, "Kozmetikumok")
  },
  "baby-care": {
    id: "baby-care",
    icon: ICONS.categoryBabyMother,
    image: PLACEHOLDERS.category(300, 300, "Baba\xE1pol\xE1s")
  },
  "medical-devices": {
    id: "medical-devices",
    icon: ICONS.categoryMedicines,
    image: PLACEHOLDERS.category(300, 300, "Orvosi eszk\xF6z\xF6k")
  },
  // ── Forum categories ──
  medicines: {
    id: "medicines",
    icon: ICONS.categoryMedicines,
    image: PLACEHOLDERS.category(300, 300, "Gy\xF3gyszerek")
  },
  "natural-remedies": {
    id: "natural-remedies",
    icon: ICONS.categoryNaturalRemedies,
    image: PLACEHOLDERS.category(300, 300, "Term\xE9szetes gy\xF3gym\xF3dok")
  },
  "baby-mother": {
    id: "baby-mother",
    icon: ICONS.categoryBabyMother,
    image: PLACEHOLDERS.category(300, 300, "Baba & Anya")
  },
  "healthy-lifestyle": {
    id: "healthy-lifestyle",
    icon: ICONS.categoryLifestyle,
    image: PLACEHOLDERS.category(300, 300, "Eg\xE9szs\xE9ges \xE9letm\xF3d")
  },
  "seasonal-health": {
    id: "seasonal-health",
    icon: ICONS.categorySeasonalHealth,
    image: PLACEHOLDERS.category(300, 300, "Szezon\xE1lis eg\xE9szs\xE9g")
  },
  qa: {
    id: "qa",
    icon: ICONS.categoryQa,
    image: PLACEHOLDERS.category(300, 300, "K\xE9rd\xE9sek & V\xE1laszok")
  },
  general: {
    id: "general",
    icon: ICONS.categoryGeneral,
    image: PLACEHOLDERS.category(300, 300, "\xC1ltal\xE1nos")
  }
};
function getImageUrl(path, fallback) {
  if (!path || path === "") {
    return fallback || IMAGES.productDefault;
  }
  return path;
}
function getCategoryIcon(categoryId) {
  return CATEGORY_VISUALS[categoryId]?.icon || ICONS.categoryDefault;
}

export {
  ICONS,
  getLogoSrc,
  IMAGES,
  HERO_SLIDES,
  LANGUAGE_OPTIONS,
  getImageUrl,
  getCategoryIcon
};
//# sourceMappingURL=chunk-KM3DUJ3P.js.map
