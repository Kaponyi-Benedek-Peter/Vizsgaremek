import { describe, it, expect } from 'vitest';
import { enrichProduct, Product, ProductImage } from './product.model';

const BASE_PRODUCT: Product = {
  id: '1',
  name: 'Aspirin',
  name_hu: 'Aspirin 500mg',
  name_en: 'Aspirin 500mg',
  name_de: 'Aspirin 500mg Tabletten',
  description_hu: 'Fájdalomcsillapító',
  description_en: 'Pain reliever',
  description_de: 'Schmerzmittel',
  description_preview_hu: 'Fájdalom ellen',
  description_preview_en: 'Against pain',
  description_preview_de: 'Gegen Schmerzen',
  price_huf: '1990',
  price_usd: '5.59',
  price_eur: '5.19',
  sale_percentage: '0',
  stock: '50',
  times_ordered: '120',
  category_id: '1',
  manufacturer: 'Bayer',
  brand: 'Aspirin',
  rating: '4.5',
  sku: 'ASP-500',
  active_ingredients: 'Acetylsalicylic acid 500mg',
  packaging_hu: '30 tabletta',
  packaging_en: '30 tablets',
  packaging_de: '30 Tabletten',
  thumbnail_url: 'assets/products/1/1.webp',
  featured: '1',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
};

describe('enrichProduct', () => {
  it('should parse numeric fields correctly', () => {
    const result = enrichProduct(BASE_PRODUCT, 'en');

    expect(result.price_number).toBe(1990);
    expect(result.stock_number).toBe(50);
    expect(result.sale_percentage_number).toBe(0);
    expect(result.rating_number).toBe(4.5);
  });

  it('should handle Hungarian comma decimal separators', () => {
    const product = { ...BASE_PRODUCT, price_huf: '1990,50', sale_percentage: '15,5', rating: '4,7' };
    const result = enrichProduct(product, 'en');

    expect(result.price_number).toBe(1990.5);
    expect(result.sale_percentage_number).toBe(15.5);
    expect(result.rating_number).toBe(4.7);
  });

  it('should compute stock booleans correctly', () => {
    const inStock = enrichProduct(BASE_PRODUCT, 'en');
    expect(inStock.in_stock).toBe(true);
    expect(inStock.stock_quantity).toBe(50);

    const outOfStock = enrichProduct({ ...BASE_PRODUCT, stock: '0' }, 'en');
    expect(outOfStock.in_stock).toBe(false);
    expect(outOfStock.stock_quantity).toBe(0);
  });

  it('should compute discount correctly', () => {
    const noDiscount = enrichProduct(BASE_PRODUCT, 'en');
    expect(noDiscount.has_discount).toBe(false);
    expect(noDiscount.price).toBe(1990);

    const withDiscount = enrichProduct({ ...BASE_PRODUCT, sale_percentage: '20' }, 'en');
    expect(withDiscount.has_discount).toBe(true);
    expect(withDiscount.discount_percentage).toBe(20);
    expect(withDiscount.price).toBe(1990 * 0.8);
  });

  it('should resolve name by language', () => {
    const hu = enrichProduct(BASE_PRODUCT, 'hu');
    expect(hu.name).toBe('Aspirin 500mg');

    const en = enrichProduct(BASE_PRODUCT, 'en');
    expect(en.name).toBe('Aspirin 500mg');

    const de = enrichProduct(BASE_PRODUCT, 'de');
    expect(de.name).toBe('Aspirin 500mg Tabletten');
  });

  it('should resolve description by language', () => {
    const hu = enrichProduct(BASE_PRODUCT, 'hu');
    expect(hu.description).toBe('Fájdalomcsillapító');

    const en = enrichProduct(BASE_PRODUCT, 'en');
    expect(en.description).toBe('Pain reliever');

    const de = enrichProduct(BASE_PRODUCT, 'de');
    expect(de.description).toBe('Schmerzmittel');
  });

  it('should resolve packaging by language', () => {
    const hu = enrichProduct(BASE_PRODUCT, 'hu');
    expect(hu.packaging).toBe('30 tabletta');

    const en = enrichProduct(BASE_PRODUCT, 'en');
    expect(en.packaging).toBe('30 tablets');

    const de = enrichProduct(BASE_PRODUCT, 'de');
    expect(de.packaging).toBe('30 Tabletten');
  });

  it('should detect featured products', () => {
    const featured = enrichProduct(BASE_PRODUCT, 'en');
    expect(featured.is_featured).toBe(true);

    const notFeatured = enrichProduct({ ...BASE_PRODUCT, featured: '0' }, 'en');
    expect(notFeatured.is_featured).toBe(false);
  });

  it('should use thumbnail as single image when no gallery provided', () => {
    const result = enrichProduct(BASE_PRODUCT, 'en');

    expect(result.image_url).toBe('assets/products/1/1.webp');
    expect(result.images).toEqual(['assets/products/1/1.webp']);
  });

  it('should sort gallery images by sort_id', () => {
    const gallery: ProductImage[] = [
      { id: '3', product_id: '1', image_url: 'c.webp', alt_text_hu: '', alt_text_en: '', alt_text_de: '', sort_id: '3' },
      { id: '1', product_id: '1', image_url: 'a.webp', alt_text_hu: '', alt_text_en: '', alt_text_de: '', sort_id: '1' },
      { id: '2', product_id: '1', image_url: 'b.webp', alt_text_hu: '', alt_text_en: '', alt_text_de: '', sort_id: '2' },
    ];
    const result = enrichProduct(BASE_PRODUCT, 'en', gallery);

    expect(result.images).toEqual(['a.webp', 'b.webp', 'c.webp']);
  });

  it('should return empty images array when no thumbnail and no gallery', () => {
    const noImage = { ...BASE_PRODUCT, thumbnail_url: '' };
    const result = enrichProduct(noImage, 'en');

    expect(result.images).toEqual([]);
    expect(result.image_url).toBe('');
  });

  it('should handle missing/invalid numeric fields gracefully', () => {
    const broken = {
      ...BASE_PRODUCT,
      price_huf: '',
      stock: 'abc',
      sale_percentage: '',
      rating: '',
    };
    const result = enrichProduct(broken, 'en');

    expect(result.price_number).toBe(0);
    expect(result.stock_number).toBe(0);
    expect(result.sale_percentage_number).toBe(0);
    expect(result.rating_number).toBe(0);
    expect(result.in_stock).toBe(false);
    expect(result.has_discount).toBe(false);
  });

  it('should resolve category from category_id or category fallback', () => {
    const withCategoryId = enrichProduct({ ...BASE_PRODUCT, category_id: '5', category: '3' }, 'en');
    expect(withCategoryId.category).toBe('5');

    const withoutCategoryId = enrichProduct({ ...BASE_PRODUCT, category_id: undefined, category: '3' }, 'en');
    expect(withoutCategoryId.category).toBe('3');
  });

  it('should default language to hu when not specified', () => {
    const result = enrichProduct(BASE_PRODUCT);
    expect(result.name).toBe('Aspirin 500mg');
    expect(result.description).toBe('Fájdalomcsillapító');
  });
});
