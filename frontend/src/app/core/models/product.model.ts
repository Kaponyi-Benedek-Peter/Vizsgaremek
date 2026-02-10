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
  imageUrl: string;
}
