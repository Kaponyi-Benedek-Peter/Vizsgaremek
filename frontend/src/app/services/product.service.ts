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
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  private filtersSignal = signal<ProductFilterOptions>({
    categories: [],
    priceRange: null,
    inStockOnly: false,
    sortBy: 'popularity',
  });
  private currentPageSignal = signal<number>(1);
  private itemsPerPageSignal = signal<number>(30);

  // --- Public readonly signals ---
  products = computed(() => this.allProductsSignal());
  featuredProducts = computed(() => this.featuredSignal());
  categories = computed(() => this.categoriesSignal());
  currentFilters = computed(() => this.filtersSignal());
  isLoading = computed(() => this.loadingSignal());
  error = computed(() => this.errorSignal());

  private filteredProducts = computed(() => {
    let products = this.allProductsSignal();
    const filters = this.filtersSignal();

    if (filters.categories && filters.categories.length > 0) {
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

  // --- Load methods ---

  async loadProducts(): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const products = await firstValueFrom(this.getAllProducts());
      const currentLang = this.translationService.getCurrentLanguage();
      const categoryIdMap = this.buildCategoryIdMap();
      const normalized = products.map((p) => this.normalizeCategoryId(p, categoryIdMap));
      const enriched = normalized.map((p) => enrichProduct(p, currentLang));
      this.rawProducts.set(normalized);
      this.allProductsSignal.set(enriched);
      this.updateCategoryCounts();
      console.log(`Loaded ${products.length} products from backend`);
    } catch (err) {
      console.error('Failed to load products from backend:', err);
      this.errorSignal.set('products.error.load_failed');
      this.allProductsSignal.set([]);
      this.rawProducts.set([]);
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async loadFeaturedProducts(): Promise<void> {
    try {
      const products = await firstValueFrom(this.getFeaturedFromApi());
      const currentLang = this.translationService.getCurrentLanguage();
      const categoryIdMap = this.buildCategoryIdMap();
      const normalized = products.map((p) => this.normalizeCategoryId(p, categoryIdMap));
      const enriched = normalized.map((p) => enrichProduct(p, currentLang));
      this.featuredSignal.set(enriched);
      console.log(`Loaded ${products.length} featured products from backend`);
    } catch (err) {
      // Fallback: derive featured from already-loaded products
      const fallback = this.allProductsSignal().filter((p) => p.isFeatured);
      this.featuredSignal.set(fallback);
      console.warn(
        'Featured products endpoint unavailable, using loaded products as fallback:',
        err,
      );
    }
  }

  async loadCategories(): Promise<void> {
    try {
      const raw = await firstValueFrom(this.getAllCategories());
      const mapped = raw.map(mapProductCategory);
      this.categoriesSignal.set(mapped);
      this.updateCategoryCounts();
      console.log(`Loaded ${raw.length} categories from backend`);
    } catch (err) {
      console.error('Failed to load categories from backend:', err);
      this.categoriesSignal.set([]);
    }
  }

  // --- Filter / Pagination controls ---

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

  // --- API calls ---

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
          if (!Array.isArray(r.product_categories)) throw new Error('Invalid categories response');
          return r.product_categories;
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
      catchError(() => of(undefined)),
    );
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => (p.category ?? p.category_id) === categoryId)),
      catchError(() => of([])),
    );
  }

  getInStockProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => parseInt(p.stock) > 0)),
      catchError(() => of([])),
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
      catchError(() => of([])),
    );
  }

  getSaleProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((p) => p.filter((x) => parseFloat(x.sale_percentage) > 0)),
      catchError(() => of([])),
    );
  }

  // --- Private helpers ---

  /**
   * Builds a map from category numeric ID → id string.
   * Used to normalize product.category / product.category_id fields.
   */
  private buildCategoryIdMap(): Map<string, string> {
    const map = new Map<string, string>();
    this.categoriesSignal().forEach((cat) => {
      map.set(cat.id, cat.id);
    });
    return map;
  }

  /**
   * Counts how many products belong to each category and updates
   * the categories signal with the real counts.
   */
  private updateCategoryCounts(): void {
    const products = this.allProductsSignal();
    const categories = this.categoriesSignal();
    if (categories.length === 0) return;

    const countMap = new Map<string, number>();
    products.forEach((p) => {
      const catId = p.category_id ?? p.category ?? '';
      if (catId) {
        countMap.set(catId, (countMap.get(catId) ?? 0) + 1);
      }
    });

    const updated = categories.map((cat) => ({
      ...cat,
      count: countMap.get(cat.id) ?? 0,
    }));
    this.categoriesSignal.set(updated);
  }

  /**
   * Returns the Category object for a given category ID.
   * Used by product detail components to display the category name
   * instead of using the raw ID as a translation key.
   */
  getCategoryById(id: string): import('../core/models/product.model').Category | undefined {
    return this.categoriesSignal().find((cat) => cat.id === id);
  }

  /**
   * Ensures product.category is set to a consistent category ID string.
   * Handles backends that return `category_id` separately from `category`.
   */
  private normalizeCategoryId(product: Product, _idMap: Map<string, string>): Product {
    const resolved = product.category ?? product.category_id ?? '';
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
