export interface Product {
  id: string;
  name: string;
  nameHu: string;
  nameEn: string;
  nameDe: string;
  description: string;
  descriptionHu: string;
  descriptionEn: string;
  descriptionDe: string;
  price: number;
  imageUrl: string;
  images?: string[];
  category: ProductCategory;
  categoryName?: string;
  manufacturer: string;
  brand: string;
  inStock: boolean;
  stockQuantity: number;
  requiresPrescription: boolean;
  discountPercentage?: number;
  rating?: number;
  reviewCount?: number;
  sku: string;

  // Pharmaceutical details
  activeIngredients?: string;
  dosage?: string;
  packaging?: string;
  storageConditions?: string;
  sideEffects?: string;
  contraindications?: string;
  expirationMonths?: number;
}

export type ProductCategory =
  | 'medicine'
  | 'vitamins'
  | 'supplements'
  | 'cosmetics'
  | 'baby-care'
  | 'medical-devices'
  | 'personal-care'
  | 'health-monitoring';

export interface Category {
  id: string;
  name: string;
  nameHu: string;
  nameEn: string;
  nameDe: string;
  icon?: string;
  count?: number;
  slug: ProductCategory;
}

export interface ProductFilterOptions {
  categories: string[];
  priceRange: { min: number; max: number } | null;
  inStockOnly: boolean;
  requiresPrescription?: boolean;
  brands?: string[];
  manufacturers?: string[];
  minRating?: number;
  sortBy: SortOption;
}

export type SortOption =
  | 'popularity'
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
