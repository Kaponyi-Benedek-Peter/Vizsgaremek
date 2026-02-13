import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Product,
  ProductsApiResponse,
  ProductWithHelpers,
  enrichProduct,
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
  private filtersSignal = signal<ProductFilterOptions>({
    categories: [],
    priceRange: null,
    inStockOnly: false,
    sortBy: 'popularity',
  });
  private currentPageSignal = signal<number>(1);
  private itemsPerPageSignal = signal<number>(30);

  products = computed(() => this.allProductsSignal());
  currentFilters = computed(() => this.filtersSignal());

  private filteredProducts = computed(() => {
    let products = this.allProductsSignal();
    const filters = this.filtersSignal();

    if (filters.categories && filters.categories.length > 0) {
      products = products.filter((p) => filters.categories!.includes(p.category));
    }

    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      products = products.filter((p) => {
        const price = p.price;
        return price >= min && price <= max;
      });
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

    return {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
    };
  });

  paginatedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const page = this.currentPageSignal();
    const perPage = this.itemsPerPageSignal();
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return filtered.slice(start, end);
  });

  async loadProducts(): Promise<void> {
    try {
      const products = await firstValueFrom(this.getAllProducts());
      const currentLang = this.translationService.getCurrentLanguage();
      const enrichedProducts = products.map((p) => enrichProduct(p, currentLang));
      this.allProductsSignal.set(enrichedProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
      this.allProductsSignal.set([]);
    }
  }

  setFilters(filters: Partial<ProductFilterOptions>): void {
    this.filtersSignal.update((current) => ({
      ...current,
      ...filters,
    }));
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
    if (page >= 1 && page <= totalPages) {
      this.currentPageSignal.set(page);
    }
  }

  setItemsPerPage(count: number): void {
    this.itemsPerPageSignal.set(count);
    this.currentPageSignal.set(1);
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
      case 'default':
      default:
        return sorted;
    }
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ProductsApiResponse>(`${this.API_URL}/api/get_all_products`).pipe(
      map((response) => {
        if (response.statuscode !== '200') {
          throw new Error(`API Error: ${response.status}`);
        }

        if (!response.products || !Array.isArray(response.products)) {
          throw new Error('Invalid API response: products array missing');
        }

        return response.products;
      }),
      catchError(this.handleError),
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.getAllProducts().pipe(map((products) => products.find((p) => p.id === id)));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => p.category === category)),
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    return this.getAllProducts().pipe(
      map((products) =>
        products.filter(
          (p) =>
            p.name_en.toLowerCase().includes(lowerQuery) ||
            p.name_hu.toLowerCase().includes(lowerQuery) ||
            p.name_de.toLowerCase().includes(lowerQuery),
        ),
      ),
    );
  }

  getSaleProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => parseFloat(p.sale_percentage) > 0)),
    );
  }

  getInStockProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => parseFloat(p.stock) > 0)),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request';
          break;
        case 404:
          errorMessage = 'Products not found';
          break;
        case 500:
          errorMessage = 'Server error';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    console.error('ProductService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
