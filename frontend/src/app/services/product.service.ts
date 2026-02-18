import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
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

// ═══════════════════════════════════════════════════════════════════════════
// MOCK PRODUCTS - Used as fallback when backend is unavailable
// ═══════════════════════════════════════════════════════════════════════════

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name_de: 'Algopyrin 500mg Tabletten',
    name_hu: 'Algopyrin 500mg Tabletta',
    name_en: 'Algopyrin 500mg Tablets',
    description_de: 'Schmerzlinderung und Fiebersenkung für Kopfschmerzen, Muskelschmerzen und Fieber.',
    description_hu: 'Fájdalomcsillapító és lázcsillapító tabletta fejfájás, izomfájdalom és láz esetén.',
    description_en: 'Pain relief and fever reducing tablets for headache, muscle pain and fever.',
    description_preview_de: 'Schmerzlinderung und Fiebersenkung',
    description_preview_hu: 'Fájdalomcsillapító és lázcsillapító',
    description_preview_en: 'Pain relief and fever reducing',
    price_huf: '2490',
    price_usd: '7',
    price_eur: '6',
    times_ordered: '156',
    stock: '45',
    sale_percentage: '15',
    category: 'medicine',
    manufacturer: 'Richter Gedeon',
    brand: 'Algopyrin',
    rating: '4.5',
    sku: 'ALG-500-20',
    active_ingredients: 'Metamizol-nátrium',
    packaging: '20 tabletta',
    created_at: '2024-01-15',
    updated_at: '2024-02-10',
    name: 'Algopyrin 500mg',
  },
  {
    id: '2',
    name_de: 'Aspirin Plus C Brausetabletten',
    name_hu: 'Aspirin Plus C Pezsgőtabletta',
    name_en: 'Aspirin Plus C Effervescent',
    description_de: 'Schnelle Linderung bei Erkältung und Grippe mit Vitamin C.',
    description_hu: 'Gyors megkönnyebbülés megfázás és influenza esetén C-vitaminnal.',
    description_en: 'Fast relief for cold and flu with Vitamin C.',
    description_preview_de: 'Erkältungs- und Grippemittel',
    description_preview_hu: 'Megfázás és influenza elleni szer',
    description_preview_en: 'Cold and flu relief',
    price_huf: '3490',
    price_usd: '10',
    price_eur: '9',
    times_ordered: '230',
    stock: '30',
    sale_percentage: '10',
    category: 'medicine',
    manufacturer: 'Bayer',
    brand: 'Aspirin',
    rating: '4.7',
    sku: 'ASP-C-10',
    active_ingredients: 'Acetilszalicilsav, Aszkorbinsav',
    packaging: '10 pezsgőtabletta',
    created_at: '2024-01-20',
    updated_at: '2024-02-15',
    name: 'Aspirin Plus C',
  },
  {
    id: '3',
    name_de: 'Bepanthen Wund- und Heilsalbe',
    name_hu: 'Bepanthen Sebgyógyító Krém',
    name_en: 'Bepanthen Wound Healing Ointment',
    description_de: 'Unterstützt die Wundheilung und Regeneration der Haut.',
    description_hu: 'Támogatja a sebgyógyulást és a bőr regenerálódását.',
    description_en: 'Supports wound healing and skin regeneration.',
    description_preview_de: 'Wundheilung und Hautregeneration',
    description_preview_hu: 'Sebgyógyulás és bőr regeneráció',
    description_preview_en: 'Wound healing and skin regeneration',
    price_huf: '2890',
    price_usd: '8',
    price_eur: '7',
    times_ordered: '189',
    stock: '50',
    sale_percentage: '0',
    category: 'cosmetics',
    manufacturer: 'Bayer',
    brand: 'Bepanthen',
    rating: '4.8',
    sku: 'BEP-50G',
    active_ingredients: 'Dexpantenol',
    packaging: '50g krém',
    created_at: '2024-01-25',
    updated_at: '2024-02-20',
    name: 'Bepanthen',
  },
  {
    id: '4',
    name_de: 'Voltaren Schmerzgel',
    name_hu: 'Voltaren Fájdalomcsillapító Gél',
    name_en: 'Voltaren Pain Relief Gel',
    description_de: 'Entzündungshemmendes Gel für Muskel- und Gelenkschmerzen.',
    description_hu: 'Gyulladáscsökkentő gél izom- és ízületi fájdalmakra.',
    description_en: 'Anti-inflammatory gel for muscle and joint pain.',
    description_preview_de: 'Gegen Muskel- und Gelenkschmerzen',
    description_preview_hu: 'Izom- és ízületi fájdalmak ellen',
    description_preview_en: 'For muscle and joint pain',
    price_huf: '4290',
    price_usd: '12',
    price_eur: '11',
    times_ordered: '312',
    stock: '25',
    sale_percentage: '20',
    category: 'medicine',
    manufacturer: 'Novartis',
    brand: 'Voltaren',
    rating: '4.6',
    sku: 'VOL-100G',
    active_ingredients: 'Diklofenak',
    packaging: '100g gél',
    created_at: '2024-02-01',
    updated_at: '2024-02-25',
    name: 'Voltaren',
  },
  {
    id: '5',
    name_de: 'Vitamin C 1000mg Tabletten',
    name_hu: 'C-vitamin 1000mg Tabletta',
    name_en: 'Vitamin C 1000mg Tablets',
    description_de: 'Hochdosiertes Vitamin C zur Stärkung des Immunsystems.',
    description_hu: 'Magas dózisú C-vitamin az immunrendszer erősítésére.',
    description_en: 'High dose Vitamin C to strengthen the immune system.',
    description_preview_de: 'Immunsystem-Stärkung',
    description_preview_hu: 'Immunrendszer erősítés',
    description_preview_en: 'Immune system support',
    price_huf: '3490',
    price_usd: '10',
    price_eur: '9',
    times_ordered: '445',
    stock: '142',
    sale_percentage: '0',
    category: 'vitamins',
    manufacturer: 'Pharma Nord',
    brand: 'Bio-C',
    rating: '4.9',
    sku: 'VITC-1000-60',
    active_ingredients: 'Aszkorbinsav',
    packaging: '60 tabletta',
    created_at: '2024-01-10',
    updated_at: '2024-03-01',
    name: 'Vitamin C 1000mg',
  },
  {
    id: '6',
    name_de: 'D3-Vitamin 2000NE Tropfen',
    name_hu: 'D3-vitamin 2000NE Cseppek',
    name_en: 'Vitamin D3 2000IU Drops',
    description_de: 'Vitamin D3 Tropfen für Knochen und Immunsystem.',
    description_hu: 'D3-vitamin cseppek a csontok és immunrendszer támogatására.',
    description_en: 'Vitamin D3 drops for bones and immune system.',
    description_preview_de: 'Knochen und Immunsystem',
    description_preview_hu: 'Csontok és immunrendszer',
    description_preview_en: 'Bones and immune system',
    price_huf: '2990',
    price_usd: '8',
    price_eur: '7',
    times_ordered: '367',
    stock: '87',
    sale_percentage: '5',
    category: 'vitamins',
    manufacturer: 'Pharma Nord',
    brand: 'Bio-D3',
    rating: '4.7',
    sku: 'VITD3-2000-30ML',
    active_ingredients: 'Kolekalciferol',
    packaging: '30ml cseppek',
    created_at: '2024-01-12',
    updated_at: '2024-03-05',
    name: 'D3-vitamin 2000NE',
  },
  {
    id: '7',
    name_de: 'Probiotikum Komplex Kapseln',
    name_hu: 'Probiotikum Komplex Kapszula',
    name_en: 'Probiotic Complex Capsules',
    description_de: 'Multi-Stamm Probiotikum für die Darmgesundheit.',
    description_hu: 'Több törzset tartalmazó probiotikum a bélflóra egészségéért.',
    description_en: 'Multi-strain probiotic for gut health.',
    description_preview_de: 'Darmgesundheit Probiotikum',
    description_preview_hu: 'Bélflóra probiotikum',
    description_preview_en: 'Gut health probiotic',
    price_huf: '5490',
    price_usd: '15',
    price_eur: '14',
    times_ordered: '198',
    stock: '34',
    sale_percentage: '0',
    category: 'supplements',
    manufacturer: 'Biocodex',
    brand: 'FloraBalance',
    rating: '4.4',
    sku: 'PROB-COMP-30',
    active_ingredients: 'Lactobacillus, Bifidobacterium',
    packaging: '30 kapszula',
    created_at: '2024-02-05',
    updated_at: '2024-03-10',
    name: 'Probiotikum Komplex',
  },
  {
    id: '8',
    name_de: 'Omega-3 Fischöl Kapseln',
    name_hu: 'Omega-3 Halolaj Kapszula',
    name_en: 'Omega-3 Fish Oil Capsules',
    description_de: 'Premium Omega-3 Fettsäuren für Herz und Gehirn.',
    description_hu: 'Prémium Omega-3 zsírsavak a szív és agy egészségéért.',
    description_en: 'Premium Omega-3 fatty acids for heart and brain health.',
    description_preview_de: 'Herz- und Gehirngesundheit',
    description_preview_hu: 'Szív és agy egészség',
    description_preview_en: 'Heart and brain health',
    price_huf: '4290',
    price_usd: '12',
    price_eur: '11',
    times_ordered: '278',
    stock: '56',
    sale_percentage: '10',
    category: 'supplements',
    manufacturer: 'Nordic Naturals',
    brand: 'OmegaPlus',
    rating: '4.6',
    sku: 'OMG3-120',
    active_ingredients: 'EPA, DHA',
    packaging: '120 kapszula',
    created_at: '2024-01-18',
    updated_at: '2024-03-01',
    name: 'Omega-3 Halolaj',
  },
  {
    id: '9',
    name_de: 'Babycreme Sensitive',
    name_hu: 'Babakrém Sensitive',
    name_en: 'Baby Cream Sensitive',
    description_de: 'Sanfte Pflege für empfindliche Babyhaut.',
    description_hu: 'Gyengéd ápolás érzékeny bababőrre.',
    description_en: 'Gentle care for sensitive baby skin.',
    description_preview_de: 'Sanfte Babyhautpflege',
    description_preview_hu: 'Gyengéd bababőr ápolás',
    description_preview_en: 'Gentle baby skin care',
    price_huf: '1990',
    price_usd: '6',
    price_eur: '5',
    times_ordered: '134',
    stock: '78',
    sale_percentage: '0',
    category: 'baby-care',
    manufacturer: 'Penaten',
    brand: 'BabySoft',
    rating: '4.8',
    sku: 'BABY-CREAM-100',
    active_ingredients: 'Pantenol, Kamilla kivonat',
    packaging: '100ml krém',
    created_at: '2024-02-10',
    updated_at: '2024-03-15',
    name: 'Babakrém Sensitive',
  },
  {
    id: '10',
    name_de: 'Magnésium 375mg Tabletten',
    name_hu: 'Magnézium 375mg Tabletta',
    name_en: 'Magnesium 375mg Tablets',
    description_de: 'Magnesium für Muskeln, Nerven und Energiestoffwechsel.',
    description_hu: 'Magnézium az izmok, idegek és energiaanyagcsere támogatására.',
    description_en: 'Magnesium for muscles, nerves and energy metabolism.',
    description_preview_de: 'Muskeln und Nervensystem',
    description_preview_hu: 'Izmok és idegrendszer',
    description_preview_en: 'Muscles and nervous system',
    price_huf: '2790',
    price_usd: '8',
    price_eur: '7',
    times_ordered: '321',
    stock: '92',
    sale_percentage: '0',
    category: 'supplements',
    manufacturer: 'Pharma Nord',
    brand: 'MagPower',
    rating: '4.5',
    sku: 'MAG-375-90',
    active_ingredients: 'Magnézium-citrát',
    packaging: '90 tabletta',
    created_at: '2024-01-22',
    updated_at: '2024-03-08',
    name: 'Magnézium 375mg',
  },
  {
    id: '11',
    name_de: 'Digitales Fieberthermometer',
    name_hu: 'Digitális Lázmérő',
    name_en: 'Digital Fever Thermometer',
    description_de: 'Schnelles und genaues digitales Thermometer.',
    description_hu: 'Gyors és pontos digitális hőmérő.',
    description_en: 'Fast and accurate digital thermometer.',
    description_preview_de: 'Schnelle Temperaturmessung',
    description_preview_hu: 'Gyors hőmérsékletmérés',
    description_preview_en: 'Fast temperature measurement',
    price_huf: '3990',
    price_usd: '11',
    price_eur: '10',
    times_ordered: '89',
    stock: '40',
    sale_percentage: '0',
    category: 'medical-devices',
    manufacturer: 'Omron',
    brand: 'Omron',
    rating: '4.3',
    sku: 'THERM-DIG-01',
    active_ingredients: '',
    packaging: '1 db',
    created_at: '2024-02-15',
    updated_at: '2024-03-12',
    name: 'Digitális Lázmérő',
  },
  {
    id: '12',
    name_de: 'Nasenspray Meerwasser',
    name_hu: 'Orrspray Tengervíz',
    name_en: 'Nasal Spray Sea Water',
    description_de: 'Natürliches Meerwasser-Nasenspray zur Befeuchtung.',
    description_hu: 'Természetes tengervizes orrspray a nyálkahártya hidratálására.',
    description_en: 'Natural sea water nasal spray for moisturizing.',
    description_preview_de: 'Natürliche Nasenpflege',
    description_preview_hu: 'Természetes orrápolás',
    description_preview_en: 'Natural nasal care',
    price_huf: '1890',
    price_usd: '5',
    price_eur: '5',
    times_ordered: '210',
    stock: '65',
    sale_percentage: '15',
    category: 'medicine',
    manufacturer: 'Quixx',
    brand: 'Quixx',
    rating: '4.4',
    sku: 'NASAL-SEA-30',
    active_ingredients: 'Tengervíz oldat',
    packaging: '30ml spray',
    created_at: '2024-01-28',
    updated_at: '2024-03-05',
    name: 'Orrspray Tengervíz',
  },
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
  currentFilters = computed(() => this.filtersSignal());
  isUsingMockData = computed(() => this.usingMockData());

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
      this.rawProducts.set(products);
      this.allProductsSignal.set(enrichedProducts);
      this.usingMockData.set(false);
      console.log(`Loaded ${products.length} products from backend`);
    } catch (error) {
      console.warn('Backend unavailable, loading mock data:', error);
      this.loadMockProducts();
    }
  }

  private loadMockProducts(): void {
    const currentLang = this.translationService.getCurrentLanguage();
    // Add [TEST] prefix to mock product names so they are visually distinguishable
    const labeledMockProducts = MOCK_PRODUCTS.map((p) => ({
      ...p,
      name_hu: `[TEST] ${p.name_hu}`,
      name_en: `[TEST] ${p.name_en}`,
      name_de: `[TEST] ${p.name_de}`,
      name: `[TEST] ${p.name}`,
    }));
    const enrichedProducts = labeledMockProducts.map((p) => enrichProduct(p, currentLang));
    this.rawProducts.set(labeledMockProducts);
    this.allProductsSignal.set(enrichedProducts);
    this.usingMockData.set(true);
    console.log(`Loaded ${MOCK_PRODUCTS.length} mock products (backend unavailable)`);
  }

  /**
   * Get featured products for homepage (top rated, in stock).
   * Uses same data source (backend or mock fallback).
   */
  getFeaturedProducts(count: number = 4): ProductWithHelpers[] {
    const currentLang = this.translationService.getCurrentLanguage();
    const source = this.rawProducts().length > 0 ? this.rawProducts() : MOCK_PRODUCTS;
    return source
      .filter((p) => parseFloat(p.stock) > 0)
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, count)
      .map((p) => enrichProduct(p, currentLang));
  }

  /**
   * Get raw mock products (for development/testing).
   */
  getMockProducts(): Product[] {
    return MOCK_PRODUCTS;
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
      timeout(5000),
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
    return this.getAllProducts().pipe(
      map((products) => products.find((p) => p.id === id)),
      catchError(() => {
        const mock = MOCK_PRODUCTS.find((p) => p.id === id);
        return of(mock);
      }),
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => p.category === category)),
      catchError(() => of(MOCK_PRODUCTS.filter((p) => p.category === category))),
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
      catchError(() =>
        of(
          MOCK_PRODUCTS.filter(
            (p) =>
              p.name_en.toLowerCase().includes(lowerQuery) ||
              p.name_hu.toLowerCase().includes(lowerQuery) ||
              p.name_de.toLowerCase().includes(lowerQuery),
          ),
        ),
      ),
    );
  }

  getSaleProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => parseFloat(p.sale_percentage) > 0)),
      catchError(() => of(MOCK_PRODUCTS.filter((p) => parseFloat(p.sale_percentage) > 0))),
    );
  }

  getInStockProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => parseFloat(p.stock) > 0)),
      catchError(() => of(MOCK_PRODUCTS.filter((p) => parseFloat(p.stock) > 0))),
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
