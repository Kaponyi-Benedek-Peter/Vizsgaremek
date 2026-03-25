import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom, of } from 'rxjs';
import { catchError, map, shareReplay, timeout } from 'rxjs/operators';
import {
  Product,
  ProductCategory,
  ProductCategoriesApiResponse,
  ProductsApiResponse,
  ProductWithHelpers,
  ProductImage,
  ProductImagesApiResponse,
  Category,
  enrichProduct,
  mapProductCategory,
  ProductFilterOptions,
  PaginationConfig,
  SortOption,
  ProductImageGroup,
  AllProductImagesApiResponse,
} from '../models/product.model';
import { TranslationService } from './translation.service';
import { environment } from '../../../environments/environment';
import {
  MOCK_MODE,
  MOCK_RAW_PRODUCTS,
  MOCK_RAW_CATEGORIES,
} from '../../pages/products/product.mock';

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
    price_range: null,
    in_stock_only: false,
    sort_by: 'popularity',
  });
  private current_pageSignal = signal<number>(1);
  private items_per_pageSignal = signal<number>(30);

  private allProductImagesCache$: Observable<ProductImageGroup[]> | null = null;

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

    if (filters.price_range) {
      const { min, max } = filters.price_range;
      products = products.filter((p) => p.price >= min && p.price <= max);
    }

    if (filters.in_stock_only) {
      products = products.filter((p) => p.in_stock);
    }

    if (filters.sort_by) {
      products = this.sortProducts(products, filters.sort_by);
    }
    if (filters.search_query?.trim()) {
      const term = filters.search_query.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.manufacturer?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term),
      );
    }

    return products;
  });

  paginationState = computed<PaginationConfig>(() => {
    const total_items = this.filteredProducts().length;
    const items_per_page = this.items_per_pageSignal();
    const current_page = this.current_pageSignal();
    const total_pages = Math.ceil(total_items / items_per_page);
    return { current_page, items_per_page, total_items, total_pages };
  });

  paginatedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const page = this.current_pageSignal();
    const perPage = this.items_per_pageSignal();
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  });

  // --- Load methods ---

  async loadProducts(): Promise<void> {
    if (MOCK_MODE) {
      const currentLang = this.translationService.getCurrentLanguage();
      const enriched = MOCK_RAW_PRODUCTS.map((p) => enrichProduct(p, currentLang));
      this.rawProducts.set(MOCK_RAW_PRODUCTS);
      this.allProductsSignal.set(enriched);
      this.updateCategoryCounts();
      return;
    }

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
    if (MOCK_MODE) {
      const currentLang = this.translationService.getCurrentLanguage();
      const enriched = MOCK_RAW_PRODUCTS.filter((p) => p.featured === '1').map((p) =>
        enrichProduct(p, currentLang),
      );
      this.featuredSignal.set(enriched);
      return;
    }

    try {
      const products = await firstValueFrom(this.getFeaturedFromApi());
      const currentLang = this.translationService.getCurrentLanguage();
      const categoryIdMap = this.buildCategoryIdMap();
      const normalized = products.map((p) => this.normalizeCategoryId(p, categoryIdMap));
      const enriched = normalized.map((p) => enrichProduct(p, currentLang));
      this.featuredSignal.set(enriched);
    } catch (err) {
      const fallback = this.allProductsSignal().filter((p) => p.is_featured);
      this.featuredSignal.set(fallback);
      console.warn(
        'Featured products endpoint unavailable, using loaded products as fallback:',
        err,
      );
    }
  }

  async loadCategories(): Promise<void> {
    if (MOCK_MODE) {
      const mapped = MOCK_RAW_CATEGORIES.map(mapProductCategory);
      this.categoriesSignal.set(mapped);
      this.updateCategoryCounts();
      return;
    }

    try {
      const raw = await firstValueFrom(this.getAllCategories());
      const mapped = raw.map(mapProductCategory);
      this.categoriesSignal.set(mapped);
      this.updateCategoryCounts();
    } catch (err) {
      console.error('Failed to load categories from backend:', err);
      this.categoriesSignal.set([]);
    }
  }

  // --- Filter / Pagination controls ---

  setFilters(filters: Partial<ProductFilterOptions>): void {
    this.filtersSignal.update((current) => ({ ...current, ...filters }));
    this.current_pageSignal.set(1);
  }

  clearFilters(): void {
    this.filtersSignal.set({
      categories: [],
      price_range: null,
      in_stock_only: false,
      sort_by: 'popularity',
      search_query: '',
    });
    this.current_pageSignal.set(1);
  }

  setPage(page: number): void {
    const total_pages = this.paginationState().total_pages;
    if (page >= 1 && page <= total_pages) this.current_pageSignal.set(page);
  }

  setItemsPerPage(count: number): void {
    this.items_per_pageSignal.set(count);
    this.current_pageSignal.set(1);
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

  private getAllProductImages(): Observable<ProductImageGroup[]> {
    if (!this.allProductImagesCache$) {
      this.allProductImagesCache$ = this.http
        .get<AllProductImagesApiResponse>(`${this.API_URL}/api/get_all_product_image`)
        .pipe(
          timeout(5000),
          map((r) => {
            if (String(r.statuscode) !== '200') throw new Error(`API Error: ${r.status}`);
            if (!Array.isArray(r.images)) return [];
            return r.images;
          }),
          catchError((err) => {
            console.warn('ProductService: Failed to load all product images', err);
            this.allProductImagesCache$ = null;
            return of([]);
          }),
          shareReplay({ bufferSize: 1, refCount: false, windowTime: 60_000 }),
        );
    }
    return this.allProductImagesCache$;
  }

  getProductImages(productId: string): Observable<ProductImage[]> {
    return this.getAllProductImages().pipe(
      map((groups) => {
        const group = groups.find((g) => g.name === productId);
        if (!group) return [];
        return group.files.map((url, i) => ({
          id: `${productId}-${i + 1}`,
          product_id: productId,
          image_url: url,
          alt_text_hu: '',
          alt_text_en: '',
          alt_text_de: '',
          sort_id: `${i + 1}`,
        }));
      }),
      catchError((err) => {
        console.warn(
          'ProductService: Failed to load product images, falling back to thumbnail',
          err,
        );
        return of([]);
      }),
    );
  }

  invalidateImageCache(): void {
    this.allProductImagesCache$ = null;
  }

  uploadProductImageAdmin(
    adminId: string,
    adminSessionToken: string,
    productId: string,
    imageBase64: string,
  ): Observable<{ statuscode: string; status: string; image?: ProductImage }> {
    const body = {
      admin_id: btoa(adminId),
      admin_session_token: btoa(adminSessionToken),
      product_id: btoa(productId),
      image_b64: imageBase64,
    };
    return this.http
      .post<{
        statuscode: string;
        status: string;
        image?: ProductImage;
      }>(`${this.API_URL}/api/upload_product_image_admin`, body)
      .pipe(catchError(this.handleError));
  }

  deleteProductImageAdmin(
    adminId: string,
    adminSessionToken: string,
    productId: string,
    imageId: string,
  ): Observable<{ statuscode: string; status: string }> {
    const body = {
      admin_id: btoa(adminId),
      admin_session_token: btoa(adminSessionToken),
      product_id: btoa(productId),
      image_id: btoa(imageId),
    };
    return this.http
      .post<{
        statuscode: string;
        status: string;
      }>(`${this.API_URL}/api/delete_product_image_admin`, body)
      .pipe(catchError(this.handleError));
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

  deleteProductAdmin(
    auth: Record<string, string>,
    productId: string,
  ): Observable<{ statuscode: string; status: string }> {
    const body = { ...auth, product_id: btoa(productId) };
    return this.http.post<{ statuscode: string; status: string }>(
      `${this.API_URL}/api/delete_product_admin`,
      body,
    );
  }

  saveProductAdmin(
    body: Record<string, string | number>,
    isEdit: boolean,
  ): Observable<{ statuscode: string; status: string }> {
    const endpoint = isEdit
      ? `${this.API_URL}/api/update_product_admin`
      : `${this.API_URL}/api/create_product_admin`;
    return this.http.post<{ statuscode: string; status: string }>(endpoint, body);
  }

  // --- Private helpers ---

  private buildCategoryIdMap(): Map<string, string> {
    const map = new Map<string, string>();
    this.categoriesSignal().forEach((cat) => {
      map.set(cat.id, cat.id);
    });
    return map;
  }

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

  getCategoryById(id: string): import('../models/product.model').Category | undefined {
    return this.categoriesSignal().find((cat) => cat.id === id);
  }

  private normalizeCategoryId(product: Product, _idMap: Map<string, string>): Product {
    const resolved = product.category ?? product.category_id ?? '';
    return { ...product, category: resolved };
  }

  private sortProducts(products: ProductWithHelpers[], sort_by: SortOption): ProductWithHelpers[] {
    const sorted = [...products];
    switch (sort_by) {
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
        return sorted.sort((a, b) => b.rating_number - a.rating_number);
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
