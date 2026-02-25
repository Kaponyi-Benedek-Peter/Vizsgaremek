export interface Product {
  id: string;

  name: string;
  name_hu: string;
  name_en: string;
  name_de: string;

  description_hu: string;
  description_en: string;
  description_de: string;
  description_preview_hu: string;
  description_preview_en: string;
  description_preview_de: string;

  price_huf: string;
  price_usd: string;
  price_eur: string;

  sale_percentage: string;
  stock: string;
  times_ordered: string;

  // Backend sends category_id; older mock data may use category
  category_id?: string;
  category?: string;

  manufacturer: string;
  brand: string;
  rating: string;
  sku: string;
  active_ingredients: string;
  packaging: string;

  thumbnail_url: string;

  featured: string;

  created_at: string;
  updated_at: string;
}

// ─── Raw backend shape ───────────────────────────────────────────────────────
// Matches the product_categories table:
//   id, category_en, category_hu, category_de, emoji, color, number_of_products
export interface ProductCategory {
  id: string;
  category_en: string;
  category_hu: string;
  category_de: string;
  emoji: string;
  color: string;
  number_of_products: string;
}

// ─── Frontend-friendly shape used by components ──────────────────────────────
export interface Category {
  id: string;
  name_hu: string;
  name_en: string;
  name_de: string;
  icon: string;
  color: string;
  count: number; // computed from actual products, NOT from number_of_products
}

/**
 * Maps a raw ProductCategory from the API to the frontend Category shape.
 * `count` is intentionally 0 here – ProductService.categories computed
 * signal overrides it with the real product count derived from allProductsSignal.
 */
export function mapProductCategory(raw: ProductCategory): Category {
  return {
    id: raw.id,
    name_hu: raw.category_hu,
    name_en: raw.category_en,
    name_de: raw.category_de,
    icon: raw.emoji,
    color: raw.color,
    count: 0,
  };
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text_hu: string;
  alt_text_en: string;
  alt_text_de: string;
  sort_id: string;
}

export interface ProductsApiResponse {
  statuscode: string;
  status: string;
  products: Product[];
}

export interface ProductCategoriesApiResponse {
  statuscode: string;
  status: string;
  product_categories: ProductCategory[];
}

export interface ProductImagesApiResponse {
  statuscode: string;
  status: string;
  images: ProductImage[];
}

export interface ProductWithHelpers extends Product {
  priceNumber: number;
  stockNumber: number;
  salePercentageNumber: number;
  ratingNumber: number;

  inStock: boolean;
  hasDiscount: boolean;
  requiresPrescription: boolean;
  isFeatured: boolean;

  price: number;
  discountPercentage: number;
  stockQuantity: number;
  reviewCount: number;

  category: string;

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
  priceRange?: { min: number; max: number } | null;
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

export function enrichProduct(
  product: Product,
  currentLang: 'hu' | 'en' | 'de' = 'hu',
  galleryImages: ProductImage[] = [],
): ProductWithHelpers {
  const priceNumber = parseFloat(product.price_huf) || 0;
  const stockNumber = parseInt(product.stock) || 0;
  const salePercentageNumber = parseFloat(product.sale_percentage) || 0;
  const ratingNumber = parseFloat(product.rating) || 0;

  const inStock = stockNumber > 0;
  const hasDiscount = salePercentageNumber > 0;
  const requiresPrescription = false;
  const isFeatured = product.featured === '1';

  const discountedPrice = hasDiscount
    ? priceNumber * (1 - salePercentageNumber / 100)
    : priceNumber;

  let name = product.name || '';
  let description = '';

  switch (currentLang) {
    case 'hu':
      name = product.name_hu || product.name;
      description = product.description_hu || '';
      break;
    case 'en':
      name = product.name_en || product.name;
      description = product.description_en || '';
      break;
    case 'de':
      name = product.name_de || product.name;
      description = product.description_de || '';
      break;
  }

  const imageUrl = product.thumbnail_url || '';
  const images =
    galleryImages.length > 0
      ? galleryImages
          .sort((a, b) => parseInt(a.sort_id) - parseInt(b.sort_id))
          .map((img) => img.image_url)
      : imageUrl
        ? [imageUrl]
        : [];

  const resolvedCategory = product.category_id ?? product.category ?? '';

  return {
    ...product,
    name,
    priceNumber,
    stockNumber,
    salePercentageNumber,
    ratingNumber,
    inStock,
    hasDiscount,
    requiresPrescription,
    isFeatured,
    price: discountedPrice,
    discountPercentage: salePercentageNumber,
    stockQuantity: stockNumber,
    reviewCount: 0,

    category: resolvedCategory,
    nameHu: product.name_hu,
    nameEn: product.name_en,
    nameDe: product.name_de,
    description,
    descriptionHu: product.description_hu,
    descriptionEn: product.description_en,
    descriptionDe: product.description_de,
    activeIngredients: product.active_ingredients,
    imageUrl,
    images,
    dosage: undefined,
  };
}
