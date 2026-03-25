import { FieldExtractor, ProductFormData } from '../models/admin.models';

export function emptyProductForm(): ProductFormData {
  return {
    name_hu: '',
    name_en: '',
    name_de: '',
    description_hu: '',
    description_en: '',
    description_de: '',
    description_preview_hu: '',
    description_preview_en: '',
    description_preview_de: '',
    price_huf: 0,
    sale_percentage: 0,
    stock: 0,
    category_id: '',
    manufacturer: '',
    brand: '',
    sku: '',
    active_ingredients: '',
    packaging_hu: '',
    packaging_en: '',
    packaging_de: '',
    thumbnail_url: '',
    featured: false,
  };
}

interface SearchQuery {
  column: string | null;
  value: string;
}

function parseSearchQuery(raw: string): SearchQuery {
  const colonIndex = raw.indexOf(':');
  if (colonIndex > 0 && colonIndex < raw.length - 1) {
    const column = raw.substring(0, colonIndex).trim().toLowerCase();
    const value = raw
      .substring(colonIndex + 1)
      .trim()
      .toLowerCase();
    if (column && value) {
      return { column, value };
    }
  }
  return { column: null, value: raw.trim().toLowerCase() };
}

export function smartFilter<T>(
  items: T[],
  rawQuery: string,
  columnMap: Record<string, FieldExtractor<T>>,
): T[] {
  if (!rawQuery.trim()) return items;

  const { column, value } = parseSearchQuery(rawQuery);
  if (!value) return items;

  if (column) {
    const extractor = columnMap[column];
    if (extractor) {
      return items.filter((item) => extractor(item).toLowerCase().includes(value));
    }
    return items;
  }

  const extractors = Object.values(columnMap);
  return items.filter((item) =>
    extractors.some((extract) => extract(item).toLowerCase().includes(value)),
  );
}
