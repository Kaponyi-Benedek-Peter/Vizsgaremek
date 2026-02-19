export interface Product {
  id: string;
  name_de: string;
  name_hu: string;
  name_en: string;
  description_de: string;
  description_hu: string;
  description_en: string;
  description_preview_de: string;
  description_preview_hu: string;
  description_preview_en: string;
  price_huf: string;
  price_usd: string;
  price_eur: string;
  times_ordered: string;
  stock: string;
  sale_percentage: string;
  category: string;
  manufacturer: string;
  brand: string;
  rating: string;
  sku: string;
  active_ingredients: string;
  packaging: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface ProductsApiResponse {
  statuscode: string;
  status: string;
  products: Product[];
}

export interface ProductWithHelpers extends Product {
  priceNumber: number;
  stockNumber: number;
  salePercentageNumber: number;
  ratingNumber: number;

  inStock: boolean;
  hasDiscount: boolean;
  requiresPrescription: boolean;

  price: number;
  discountPercentage: number;
  stockQuantity: number;
  reviewCount: number;

  nameHu: string;
  nameEn: string;
  nameDe: string;
  description: string;
  descriptionHu: string;
  descriptionEn: string;
  descriptionDe: string;
  activeIngredients: string;

  imageUrl: string;
  images: string[];

  dosage?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameHu: string;
  nameEn: string;
  nameDe: string;
  icon?: string;
  count?: number;
}

export type SortOption =
  | 'popularity'
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'rating'
  | 'rating-desc';

export interface ProductFilterOptions {
  categories?: string[];
  priceRange?: {
    min: number;
    max: number;
  } | null;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  hasDiscount?: boolean;
  sortBy?: SortOption;
  searchQuery?: string;
  manufacturers?: string[];
  brands?: string[];
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

import { environment } from '../../../environments/environment';

// Helper function to convert Product to ProductWithHelpers
export function enrichProduct(
  product: Product,
  currentLang: 'hu' | 'en' | 'de' = 'hu',
): ProductWithHelpers {
  const priceNumber = parseFloat(product.price_huf) || 0;
  const stockNumber = parseFloat(product.stock) || 0;
  const salePercentageNumber = parseFloat(product.sale_percentage) || 0;
  const ratingNumber = parseFloat(product.rating) || 0;

  const inStock = stockNumber > 0;
  const hasDiscount = salePercentageNumber > 0;
  const requiresPrescription = false;

  const discountedPrice = hasDiscount
    ? priceNumber * (1 - salePercentageNumber / 100)
    : priceNumber;

  let name = product.name || '';
  let description = '';

  switch (currentLang) {
    case 'hu':
      name = product.name_hu || product.name;
      description = product.description_hu;
      break;
    case 'en':
      name = product.name_en || product.name;
      description = product.description_en;
      break;
    case 'de':
      name = product.name_de || product.name;
      description = product.description_de;
      break;
  }

  return {
    ...product,
    // Override name with localized version
    name,

    priceNumber,
    stockNumber,
    salePercentageNumber,
    ratingNumber,

    inStock,
    hasDiscount,
    requiresPrescription,

    price: discountedPrice,
    discountPercentage: salePercentageNumber,
    stockQuantity: stockNumber,
    reviewCount: 0, // TODO: Can be computed from reviews table

    nameHu: product.name_hu,
    nameEn: product.name_en,
    nameDe: product.name_de,
    description,
    descriptionHu: product.description_hu,
    descriptionEn: product.description_en,
    descriptionDe: product.description_de,
    activeIngredients: product.active_ingredients,

    // Image handling - absolute URLs
    imageUrl: `${environment.assetsURL}/assets/images/products/${product.id || 'placeholder'}.webp`,
    images: [
      `${environment.assetsURL}/assets/images/products/${product.id || 'placeholder'}.webp`,
      `${environment.assetsURL}/assets/images/products/${product.id || 'placeholder'}-2.webp`,
      `${environment.assetsURL}/assets/images/products/${product.id || 'placeholder'}-3.webp`,
    ],

    dosage: undefined,
  };
}
