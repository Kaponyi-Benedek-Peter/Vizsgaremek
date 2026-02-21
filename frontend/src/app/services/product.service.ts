import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import {
  Product,
  ProductCategory,
  ProductCategoriesApiResponse,
  ProductsApiResponse,
  ProductWithHelpers,
  Category,
  enrichProduct,
  mapProductCategory,
  ProductFilterOptions,
  PaginationConfig,
  SortOption,
} from '../core/models/product.model';
import { TranslationService } from '../core/services/translation.service';
import { environment } from '../../environments/environment';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Algopyrin 500mg',
    name_hu: 'Algopyrin 500mg Tabletta',
    name_en: 'Algopyrin 500mg Tablets',
    name_de: 'Algopyrin 500mg Tabletten',
    description_hu:
      'Fájdalomcsillapító és lázcsillapító tabletta fejfájás, izomfájdalom és láz esetén.',
    description_en: 'Pain relief and fever reducing tablets for headache, muscle pain and fever.',
    description_de:
      'Schmerzlinderung und Fiebersenkung für Kopfschmerzen, Muskelschmerzen und Fieber.',
    description_preview_hu: 'Fájdalomcsillapító és lázcsillapító',
    description_preview_en: 'Pain relief and fever reducing',
    description_preview_de: 'Schmerzlinderung und Fiebersenkung',
    price_huf: '2490',
    price_usd: '6.96',
    price_eur: '6.23',
    sale_percentage: '15',
    stock: '45',
    times_ordered: '156',
    category_id: '1',
    category: '1',
    manufacturer: 'Richter Gedeon',
    brand: 'Algopyrin',
    rating: '4.5',
    sku: 'ALG-500-20',
    active_ingredients: 'Metamizol-nátrium',
    packaging: '20 tabletta',
    thumbnail_url: '',
    featured: '1',
    created_at: '2024-01-15',
    updated_at: '2024-02-10',
  },
  {
    id: '2',
    name: 'Aspirin Plus C',
    name_hu: 'Aspirin Plus C Pezsgőtabletta',
    name_en: 'Aspirin Plus C Effervescent',
    name_de: 'Aspirin Plus C Brausetabletten',
    description_hu: 'Gyors megkönnyebbülés megfázás és influenza esetén C-vitaminnal.',
    description_en: 'Fast relief for cold and flu with Vitamin C.',
    description_de: 'Schnelle Linderung bei Erkältung und Grippe mit Vitamin C.',
    description_preview_hu: 'Megfázás és influenza elleni szer',
    description_preview_en: 'Cold and flu relief',
    description_preview_de: 'Erkältungs- und Grippemittel',
    price_huf: '3490',
    price_usd: '9.75',
    price_eur: '8.73',
    sale_percentage: '10',
    stock: '30',
    times_ordered: '230',
    category_id: '1',
    category: '1',
    manufacturer: 'Bayer',
    brand: 'Aspirin',
    rating: '4.7',
    sku: 'ASP-C-10',
    active_ingredients: 'Acetilszalicilsav, Aszkorbinsav',
    packaging: '10 pezsgőtabletta',
    thumbnail_url: '',
    featured: '0',
    created_at: '2024-01-20',
    updated_at: '2024-02-15',
  },
  {
    id: '3',
    name: 'C-vitamin 1000mg',
    name_hu: 'C-vitamin 1000mg Tabletta',
    name_en: 'Vitamin C 1000mg Tablets',
    name_de: 'Vitamin C 1000mg Tabletten',
    description_hu: 'Magas dózisú C-vitamin az immunrendszer erősítésére.',
    description_en: 'High dose Vitamin C to strengthen the immune system.',
    description_de: 'Hochdosiertes Vitamin C zur Stärkung des Immunsystems.',
    description_preview_hu: 'Immunrendszer erősítés',
    description_preview_en: 'Immune system support',
    description_preview_de: 'Immunsystem-Stärkung',
    price_huf: '3490',
    price_usd: '9.75',
    price_eur: '8.73',
    sale_percentage: '0',
    stock: '142',
    times_ordered: '445',
    category_id: '2',
    category: '2',
    manufacturer: 'Pharma Nord',
    brand: 'Bio-C',
    rating: '4.9',
    sku: 'VITC-1000-60',
    active_ingredients: 'Aszkorbinsav',
    packaging: '60 tabletta',
    thumbnail_url: '',
    featured: '1',
    created_at: '2024-01-10',
    updated_at: '2024-03-01',
  },
  {
    id: '4',
    name: 'D3-vitamin 2000NE',
    name_hu: 'D3-vitamin 2000NE Cseppek',
    name_en: 'Vitamin D3 2000IU Drops',
    name_de: 'D3-Vitamin 2000NE Tropfen',
    description_hu: 'D3-vitamin cseppek a csontok és immunrendszer támogatására.',
    description_en: 'Vitamin D3 drops for bones and immune system.',
    description_de: 'Vitamin D3 Tropfen für Knochen und Immunsystem.',
    description_preview_hu: 'Csontok és immunrendszer',
    description_preview_en: 'Bones and immune system',
    description_preview_de: 'Knochen und Immunsystem',
    price_huf: '2990',
    price_usd: '8.36',
    price_eur: '7.48',
    sale_percentage: '5',
    stock: '87',
    times_ordered: '367',
    category_id: '2',
    category: '2',
    manufacturer: 'Pharma Nord',
    brand: 'Bio-D3',
    rating: '4.7',
    sku: 'VITD3-2000-30ML',
    active_ingredients: 'Kolekalciferol',
    packaging: '30ml cseppek',
    thumbnail_url: '',
    featured: '1',
    created_at: '2024-01-12',
    updated_at: '2024-03-05',
  },
  {
    id: '5',
    name: 'Omega-3 Halolaj',
    name_hu: 'Omega-3 Halolaj Kapszula',
    name_en: 'Omega-3 Fish Oil Capsules',
    name_de: 'Omega-3 Fischöl Kapseln',
    description_hu: 'Prémium Omega-3 zsírsavak a szív és agy egészségéért.',
    description_en: 'Premium Omega-3 fatty acids for heart and brain health.',
    description_de: 'Premium Omega-3 Fettsäuren für Herz und Gehirn.',
    description_preview_hu: 'Szív és agy egészség',
    description_preview_en: 'Heart and brain health',
    description_preview_de: 'Herz- und Gehirngesundheit',
    price_huf: '4290',
    price_usd: '11.99',
    price_eur: '10.73',
    sale_percentage: '10',
    stock: '56',
    times_ordered: '278',
    category_id: '3',
    category: '3',
    manufacturer: 'Nordic Naturals',
    brand: 'OmegaPlus',
    rating: '4.6',
    sku: 'OMG3-120',
    active_ingredients: 'EPA, DHA',
    packaging: '120 kapszula',
    thumbnail_url: '',
    featured: '0',
    created_at: '2024-01-18',
    updated_at: '2024-03-01',
  },
  {
    id: '6',
    name: 'Probiotikum Komplex',
    name_hu: 'Probiotikum Komplex Kapszula',
    name_en: 'Probiotic Complex Capsules',
    name_de: 'Probiotikum Komplex Kapseln',
    description_hu: 'Több törzset tartalmazó probiotikum a bélflóra egészségéért.',
    description_en: 'Multi-strain probiotic for gut health.',
    description_de: 'Multi-Stamm Probiotikum für die Darmgesundheit.',
    description_preview_hu: 'Bélflóra probiotikum',
    description_preview_en: 'Gut health probiotic',
    description_preview_de: 'Darmgesundheit Probiotikum',
    price_huf: '5490',
    price_usd: '15.34',
    price_eur: '13.73',
    sale_percentage: '0',
    stock: '34',
    times_ordered: '198',
    category_id: '3',
    category: '3',
    manufacturer: 'Biocodex',
    brand: 'FloraBalance',
    rating: '4.4',
    sku: 'PROB-COMP-30',
    active_ingredients: 'Lactobacillus, Bifidobacterium',
    packaging: '30 kapszula',
    thumbnail_url: '',
    featured: '0',
    created_at: '2024-02-05',
    updated_at: '2024-03-10',
  },
  {
    id: '7',
    name: 'DermaGlow Arckrém',
    name_hu: 'DermaGlow Intenzív Hidratáló Arckrém',
    name_en: 'DermaGlow Intensive Moisturising Face Cream',
    name_de: 'DermaGlow Intensive Feuchtigkeitscreme',
    description_hu: 'Hialuronsavas, ceramidos arckrém 72 órás hidratálással.',
    description_en: 'Hyaluronic acid and ceramide face cream with 72-hour hydration.',
    description_de: 'Gesichtscreme mit Hyaluronsäure und Ceramiden, 72-Stunden-Feuchtigkeit.',
    description_preview_hu: '72 órás hidratálás, hialuronsav',
    description_preview_en: '72-hour hydration, hyaluronic acid',
    description_preview_de: '72-Stunden-Feuchtigkeit, Hyaluronsäure',
    price_huf: '4490',
    price_usd: '12.55',
    price_eur: '11.23',
    sale_percentage: '20',
    stock: '38',
    times_ordered: '74',
    category_id: '4',
    category: '4',
    manufacturer: 'DermaCare Lab',
    brand: 'DermaGlow',
    rating: '4.85',
    sku: 'DGL-IMC-50ML',
    active_ingredients: 'Sodium Hyaluronate, Niacinamid, Ceramide NP',
    packaging: '50ml tubus',
    thumbnail_url: '',
    featured: '1',
    created_at: '2024-02-18',
    updated_at: '2024-02-18',
  },
  {
    id: '8',
    name: 'BabyCalm Hasfájás Cseppek',
    name_hu: 'BabyCalm Hasfájás Cseppek',
    name_en: 'BabyCalm Colic Drops',
    name_de: 'BabyCalm Blähungslinderung Tropfen',
    description_hu: 'Szimethikon alapú hasfájás cseppek csecsemőknek.',
    description_en: 'Simethicone-based colic drops for infants.',
    description_de: 'Simeticon-basierte Blähungstropfen für Säuglinge.',
    description_preview_hu: 'Hasfájás és puffadás ellen',
    description_preview_en: 'Colic and bloating relief',
    description_preview_de: 'Gegen Blähungen und Darmkrämpfe',
    price_huf: '2190',
    price_usd: '6.12',
    price_eur: '5.48',
    sale_percentage: '0',
    stock: '95',
    times_ordered: '137',
    category_id: '5',
    category: '5',
    manufacturer: 'BabyCare Pharma',
    brand: 'BabyCalm',
    rating: '4.6',
    sku: 'BCM-SIM-30ML',
    active_ingredients: 'Szimethikon 40mg/ml',
    packaging: '30ml cseppentős üveg',
    thumbnail_url: '',
    featured: '0',
    created_at: '2024-03-01',
    updated_at: '2024-03-01',
  },
];

const MOCK_CATEGORIES: ProductCategory[] = [
  { id: '1', category: 'gyogyszerek', emoji: '💊', color: '#E53935', number_of_products: '2' },
  { id: '2', category: 'vitaminok', emoji: '🌿', color: '#43A047', number_of_products: '2' },
  {
    id: '3',
    category: 'taplelkiegeszitok',
    emoji: '💪',
    color: '#FB8C00',
    number_of_products: '2',
  },
  { id: '4', category: 'kozmetikumok', emoji: '✨', color: '#E91E8C', number_of_products: '1' },
  { id: '5', category: 'babaapolas', emoji: '👶', color: '#1E88E5', number_of_products: '1' },
  { id: '6', category: 'orvosi-eszkozok', emoji: '🩺', color: '#8E24AA', number_of_products: '0' },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_URL = environment.baseURL;
  private http = inject(HttpClient);
  private translationService = inject(TranslationService);

  private allProductsSignal = signal<ProductWithHelpers[]>([]);
  private rawProducts = signal<Product[]>([]);
  private featuredSignal = signal<ProductWithHelpers[]>([]);
  private categoriesSignal = signal<Category[]>([]);
  private usingMockData = signal(false);

  private filtersSignal = signal<ProductFilterOptions>({
    categories: [],
    priceRange: null,
    inStockOnly: false,
    sortBy: 'popularity',
  });
  private currentPageSignal = signal<number>(1);
  private itemsPerPageSignal = signal<number>(30);

  products = computed(() => this.allProductsSignal());
  featuredProducts = computed(() => this.featuredSignal());
  categories = computed(() => this.categoriesSignal());
  currentFilters = computed(() => this.filtersSignal());
  isUsingMockData = computed(() => this.usingMockData());

  private filteredProducts = computed(() => {
    let products = this.allProductsSignal();
    const filters = this.filtersSignal();

    if (filters.categories && filters.categories.length > 0) {
      // Filter uses the resolved `category` field from enrichProduct (handles both endpoints)
      products = products.filter((p) => filters.categories!.includes(p.category));
    }

    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      products = products.filter((p) => p.price >= min && p.price <= max);
    }

    if (filters.inStockOnly) {
      products = products.filter((p) => p.inStock);
    }

    if (filters.sortBy) {
      products = this.sortProducts(products, filters.sortBy);
    }

    return products;
  });

  paginationState = computed<PaginationConfig>(() => {
    const totalItems = this.filteredProducts().length;
    const itemsPerPage = this.itemsPerPageSignal();
    const currentPage = this.currentPageSignal();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return { currentPage, itemsPerPage, totalItems, totalPages };
  });

  paginatedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const page = this.currentPageSignal();
    const perPage = this.itemsPerPageSignal();
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  });

  async loadProducts(): Promise<void> {
    try {
      const products = await firstValueFrom(this.getAllProducts());
      const currentLang = this.translationService.getCurrentLanguage();

      // Build id → slug map from loaded categories (if available)
      const categorySlugMap = this.buildCategorySlugMap();

      // Resolve numeric category IDs to slug strings before enriching
      const resolved = products.map((p) => this.resolveCategorySlug(p, categorySlugMap));

      const enriched = resolved.map((p) => enrichProduct(p, currentLang));
      this.rawProducts.set(resolved);
      this.allProductsSignal.set(enriched);
      this.usingMockData.set(false);
      console.log(`Loaded ${products.length} products from backend`);
    } catch {
      console.warn('Backend unavailable, loading mock data');
      this.loadMockProducts();
    }
  }

  async loadFeaturedProducts(): Promise<void> {
    try {
      const products = await firstValueFrom(this.getFeaturedFromApi());
      const currentLang = this.translationService.getCurrentLanguage();
      const categorySlugMap = this.buildCategorySlugMap();
      const resolved = products.map((p) => this.resolveCategorySlug(p, categorySlugMap));
      const enriched = resolved.map((p) => enrichProduct(p, currentLang));
      this.featuredSignal.set(enriched);
    } catch {
      const fallback = this.allProductsSignal().filter((p) => p.isFeatured);
      if (fallback.length > 0) {
        this.featuredSignal.set(fallback);
      } else {
        const currentLang = this.translationService.getCurrentLanguage();
        const mockFeatured = MOCK_PRODUCTS.filter((p) => p.featured === '1').map((p) =>
          enrichProduct(p, currentLang),
        );
        this.featuredSignal.set(mockFeatured);
      }
    }
  }

  async loadCategories(): Promise<void> {
    try {
      const raw = await firstValueFrom(this.getAllCategories());
      const mapped = raw.map(mapProductCategory);
      this.categoriesSignal.set(mapped);
    } catch {
      console.warn('Category backend unavailable, using mock categories');
      this.categoriesSignal.set(MOCK_CATEGORIES.map(mapProductCategory));
    }
  }

  private loadMockProducts(): void {
    const currentLang = this.translationService.getCurrentLanguage();
    const labeled = MOCK_PRODUCTS.map((p) => ({
      ...p,
      name_hu: `[TEST] ${p.name_hu}`,
      name_en: `[TEST] ${p.name_en}`,
      name_de: `[TEST] ${p.name_de}`,
      name: `[TEST] ${p.name}`,
    }));
    const enriched = labeled.map((p) => enrichProduct(p, currentLang));
    this.rawProducts.set(labeled);
    this.allProductsSignal.set(enriched);
    this.usingMockData.set(true);

    this.featuredSignal.set(enriched.filter((p) => p.isFeatured));
    console.log(`Loaded ${MOCK_PRODUCTS.length} mock products`);
  }

  setFilters(filters: Partial<ProductFilterOptions>): void {
    this.filtersSignal.update((current) => ({ ...current, ...filters }));
    this.currentPageSignal.set(1);
  }

  clearFilters(): void {
    this.filtersSignal.set({
      categories: [],
      priceRange: null,
      inStockOnly: false,
      sortBy: 'popularity',
    });
    this.currentPageSignal.set(1);
  }

  setPage(page: number): void {
    const totalPages = this.paginationState().totalPages;
    if (page >= 1 && page <= totalPages) this.currentPageSignal.set(page);
  }

  setItemsPerPage(count: number): void {
    this.itemsPerPageSignal.set(count);
    this.currentPageSignal.set(1);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ProductsApiResponse>(`${this.API_URL}/api/get_all_products`).pipe(
      timeout(5000),
      map((r) => {
        if (r.statuscode !== '200') throw new Error(`API Error: ${r.status}`);
        if (!Array.isArray(r.products)) throw new Error('Invalid products response');
        return r.products;
      }),
      catchError(this.handleError),
    );
  }

  getAllCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<ProductCategoriesApiResponse>(`${this.API_URL}/api/get_all_product_categories`)
      .pipe(
        timeout(5000),
        map((r) => {
          if (r.statuscode !== '200') throw new Error(`API Error: ${r.status}`);
          if (!Array.isArray(r.categories)) throw new Error('Invalid categories response');
          return r.categories;
        }),
        catchError(this.handleError),
      );
  }

  getFeaturedFromApi(): Observable<Product[]> {
    return this.http.get<ProductsApiResponse>(`${this.API_URL}/api/get_all_featured_products`).pipe(
      timeout(5000),
      map((r) => {
        if (r.statuscode !== '200') throw new Error(`API Error: ${r.status}`);
        if (!Array.isArray(r.products)) throw new Error('Invalid featured response');
        return r.products;
      }),
      catchError(this.handleError),
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.getAllProducts().pipe(
      map((products) => products.find((p) => p.id === id)),
      catchError(() => of(MOCK_PRODUCTS.find((p) => p.id === id))),
    );
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      // Support both field names from backend
      map((products) => products.filter((p) => (p.category ?? p.category_id) === categoryId)),
      catchError(() =>
        of(MOCK_PRODUCTS.filter((p) => (p.category ?? p.category_id) === categoryId)),
      ),
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    const q = query.toLowerCase();
    return this.getAllProducts().pipe(
      map((products) =>
        products.filter(
          (p) =>
            p.name_en.toLowerCase().includes(q) ||
            p.name_hu.toLowerCase().includes(q) ||
            p.name_de.toLowerCase().includes(q),
        ),
      ),
      catchError(() =>
        of(
          MOCK_PRODUCTS.filter(
            (p) =>
              p.name_en.toLowerCase().includes(q) ||
              p.name_hu.toLowerCase().includes(q) ||
              p.name_de.toLowerCase().includes(q),
          ),
        ),
      ),
    );
  }

  getSaleProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((p) => p.filter((x) => parseFloat(x.sale_percentage) > 0)),
      catchError(() => of(MOCK_PRODUCTS.filter((x) => parseFloat(x.sale_percentage) > 0))),
    );
  }

  getInStockProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((p) => p.filter((x) => parseInt(x.stock) > 0)),
      catchError(() => of(MOCK_PRODUCTS.filter((x) => parseInt(x.stock) > 0))),
    );
  }

  getMockProducts(): Product[] {
    return MOCK_PRODUCTS;
  }

  /**
   * Builds a map from category numeric ID → slug string.
   * Uses whatever categories are currently loaded in the signal.
   * Also adds the raw ProductCategory items from the categories signal.
   */
  private buildCategorySlugMap(): Map<string, string> {
    const map = new Map<string, string>();
    const categories = this.categoriesSignal();
    // Category.id is the numeric id, Category.slug is the slug string
    categories.forEach((cat) => {
      map.set(cat.id, cat.slug);
    });
    return map;
  }

  /**
   * Resolves the category field on a raw Product to its slug.
   * - If get_all_products returns `category: "gyogyszerek"` (already a slug) → kept as-is
   * - If it returns `category: "3"` (numeric ID string) → looked up in categorySlugMap
   * - If it returns `category_id: "3"` → same lookup
   * Falls back to the original value if no mapping found.
   */
  private resolveCategorySlug(product: Product, slugMap: Map<string, string>): Product {
    // Use the `category` field first (get_all_products), then `category_id` (get_all_featured)
    const rawCategory = product.category ?? product.category_id ?? '';

    // If the value is purely numeric → it's an ID, try to resolve to slug
    const isNumericId = /^\d+$/.test(rawCategory);
    const resolved = isNumericId ? (slugMap.get(rawCategory) ?? rawCategory) : rawCategory;

    return { ...product, category: resolved };
  }

  private sortProducts(products: ProductWithHelpers[], sortBy: SortOption): ProductWithHelpers[] {
    const sorted = [...products];
    switch (sortBy) {
      case 'popularity':
        return sorted.sort((a, b) => parseFloat(b.times_ordered) - parseFloat(a.times_ordered));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'rating':
      case 'rating-desc':
        return sorted.sort((a, b) => b.ratingNumber - a.ratingNumber);
      case 'newest':
        return sorted.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      default:
        return sorted;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let msg = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      const codes: Record<number, string> = {
        400: 'Bad request',
        404: 'Not found',
        500: 'Server error',
      };
      msg = codes[error.status] ?? `Error ${error.status}: ${error.message}`;
    }
    console.error('ProductService Error:', msg);
    return throwError(() => new Error(msg));
  }
}
