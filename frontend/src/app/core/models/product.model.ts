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

  category_id?: string;
  category?: string;

  manufacturer: string;
  brand: string;
  rating: string;
  sku: string;
  active_ingredients: string;
  packaging_hu: string;
  packaging_en: string;
  packaging_de: string;

  thumbnail_url: string;

  featured: string;

  created_at: string;
  updated_at: string;
}

export interface ProductImageGroup {
  name: string;
  files: string[];
}

export interface AllProductImagesApiResponse {
  status: string;
  statuscode: number | string;
  images: ProductImageGroup[];
}

export interface ProductCategory {
  id: string;
  category_en: string;
  category_hu: string;
  category_de: string;
  emoji: string;
  color: string;
  number_of_products: string;
}

export interface Category {
  id: string;
  name_hu: string;
  name_en: string;
  name_de: string;
  icon: string;
  color: string;
  count: number;
}

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
  price_number: number;
  stock_number: number;
  sale_percentage_number: number;
  rating_number: number;

  in_stock: boolean;
  has_discount: boolean;
  requires_prescription: boolean;
  is_featured: boolean;

  price: number;
  discount_percentage: number;
  stock_quantity: number;
  review_count: number;

  category: string;

  // Language-resolved computed fields
  description: string;
  packaging: string;

  image_url: string;
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
  price_range?: { min: number; max: number } | null;
  min_price?: number;
  max_price?: number;
  in_stock_only?: boolean;
  has_discount?: boolean;
  sort_by?: SortOption;
  search_query?: string;
  manufacturers?: string[];
  brands?: string[];
  search?: string;
}

export interface PaginationConfig {
  current_page: number;
  items_per_page: number;
  total_items: number;
  total_pages: number;
}

export function enrichProduct(
  product: Product,
  current_lang: 'hu' | 'en' | 'de' = 'hu',
  gallery_images: ProductImage[] = [],
): ProductWithHelpers {
  const price_number = parseFloat(product.price_huf?.replace(',', '.')) || 0;
  const stock_number = parseInt(product.stock) || 0;
  const sale_percentage_number = parseFloat(product.sale_percentage?.replace(',', '.')) || 0;
  const rating_number = parseFloat(product.rating?.replace(',', '.')) || 0;

  const in_stock = stock_number > 0;
  const has_discount = sale_percentage_number > 0;
  const requires_prescription = false;
  const is_featured = product.featured === '1';

  const discounted_price = has_discount
    ? price_number * (1 - sale_percentage_number / 100)
    : price_number;

  let name = product.name || '';
  let description = '';
  let packaging = '';

  switch (current_lang) {
    case 'hu':
      name = product.name_hu || product.name;
      description = product.description_hu || '';
      packaging = product.packaging_hu || '';
      break;
    case 'en':
      name = product.name_en || product.name;
      description = product.description_en || '';
      packaging = product.packaging_en || '';
      break;
    case 'de':
      name = product.name_de || product.name;
      description = product.description_de || '';
      packaging = product.packaging_de || '';
      break;
  }

  const image_url = product.thumbnail_url || '';
  const images =
    gallery_images.length > 0
      ? gallery_images
          .sort((a, b) => parseInt(a.sort_id) - parseInt(b.sort_id))
          .map((img) => img.image_url)
      : image_url
        ? [image_url]
        : [];

  const resolved_category = product.category_id ?? product.category ?? '';

  return {
    ...product,
    name,
    price_number,
    stock_number,
    sale_percentage_number,
    rating_number,
    in_stock,
    has_discount,
    requires_prescription,
    is_featured,
    price: discounted_price,
    discount_percentage: sale_percentage_number,
    stock_quantity: stock_number,
    review_count: 0,
    category: resolved_category,
    description,
    packaging,
    image_url,
    images,
    dosage: undefined,
  };
}
