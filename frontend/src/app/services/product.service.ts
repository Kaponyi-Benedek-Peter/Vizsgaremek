import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { PaginationConfig, Product, ProductFilterOptions } from '../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private allProducts = signal<Product[]>([]);
  private filters = signal<ProductFilterOptions>({
    categories: [],
    priceRange: null,
    inStockOnly: false,
    sortBy: 'popularity',
  });

  private pagination = signal({
    currentPage: 1,
    itemsPerPage: 10,
  });

  products = this.allProducts.asReadonly();
  currentFilters = this.filters.asReadonly();

  filteredProducts = computed(() => {
    let products = this.allProducts();
    const currentFilters = this.filters();

    if (currentFilters.categories.length > 0) {
      products = products.filter((p) => currentFilters.categories.includes(p.category));
    }

    if (currentFilters.priceRange) {
      products = products.filter(
        (p) =>
          p.price >= currentFilters.priceRange!.min && p.price <= currentFilters.priceRange!.max,
      );
    }

    if (currentFilters.inStockOnly) {
      products = products.filter((p) => p.inStock);
    }

    if (currentFilters.requiresPrescription !== undefined) {
      products = products.filter(
        (p) => p.requiresPrescription === currentFilters.requiresPrescription,
      );
    }

    if (currentFilters.brands && currentFilters.brands.length > 0) {
      products = products.filter((p) => currentFilters.brands!.includes(p.brand));
    }

    if (currentFilters.minRating !== undefined) {
      products = products.filter((p) => (p.rating || 0) >= currentFilters.minRating!);
    }

    products = this.sortProducts(products, currentFilters.sortBy);

    return products;
  });

  paginationState = computed(() => {
    const pag = this.pagination();
    const totalItems = this.filteredProducts().length;
    const totalPages = Math.ceil(totalItems / pag.itemsPerPage);

    return {
      currentPage: pag.currentPage,
      itemsPerPage: pag.itemsPerPage,
      totalItems,
      totalPages,
    };
  });

  paginatedProducts = computed(() => {
    const products = this.filteredProducts();
    const pag = this.paginationState();
    const startIndex = (pag.currentPage - 1) * pag.itemsPerPage;
    const endIndex = startIndex + pag.itemsPerPage;

    return products.slice(startIndex, endIndex);
  });

  setProducts(products: Product[]): void {
    this.allProducts.set(products);
  }

  setFilters(filters: Partial<ProductFilterOptions>): void {
    this.filters.update((current) => ({ ...current, ...filters }));
    this.setPage(1);
  }

  clearFilters(): void {
    this.filters.set({
      categories: [],
      priceRange: null,
      inStockOnly: false,
      sortBy: 'popularity',
    });
    this.setPage(1);
  }

  setItemsPerPage(count: number): void {
    this.pagination.update((p) => ({
      ...p,
      itemsPerPage: count,
      currentPage: 1,
    }));
  }

  setPage(page: number): void {
    const totalPages = this.paginationState().totalPages;
    if (page >= 1 && page <= totalPages) {
      this.pagination.update((p) => ({ ...p, currentPage: page }));
    }
  }

  nextPage(): void {
    const current = this.paginationState();
    if (current.currentPage < current.totalPages) {
      this.setPage(current.currentPage + 1);
    }
  }

  previousPage(): void {
    const current = this.paginationState();
    if (current.currentPage > 1) {
      this.setPage(current.currentPage - 1);
    }
  }

  private sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];

    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return sorted;
      case 'popularity':
      default:
        return sorted;
    }
  }

  // API simulation (replace with actual HTTP calls)
  async loadProducts(): Promise<void> {
    // TODO: Replace with actual API call
    const mockProducts = this.getMockProducts();
    this.setProducts(mockProducts);
  }

  private getMockProducts(): Product[] {
    return [
      {
        id: '1',
        name: 'Algopyrin 500mg',
        nameHu: 'Algopyrin 500mg Tabletta',
        nameEn: 'Algopyrin 500mg Tablets',
        nameDe: 'Algopyrin 500mg Tabletten',
        description: 'Fájdalomcsillapító és lázcsillapító tabletta',
        descriptionHu:
          'Fájdalomcsillapító és lázcsillapító tabletta fejfájás, izomfájdalom és láz esetén.',
        descriptionEn:
          'Pain relief and fever reducing tablets for headache, muscle pain and fever.',
        descriptionDe:
          'Schmerzmittel und fiebersenkende Tabletten bei Kopfschmerzen, Muskelschmerzen und Fieber.',
        price: 2490,
        imageUrl: 'https://via.placeholder.com/300x300/4CAF50/ffffff?text=Algopyrin',
        category: 'medicine',
        manufacturer: 'Sanofi',
        brand: 'Algopyrin',
        inStock: true,
        stockQuantity: 45,
        requiresPrescription: false,
        rating: 4.5,
        reviewCount: 128,
        sku: 'ALG-500-20',
        activeIngredients: 'Acetylsalicylic acid 500mg',
        dosage: '1-2 tabletta 4-6 óránként',
        packaging: '20 tabletta',
        discountPercentage: 15,
      },
      {
        id: '2',
        name: 'C-Vitamin 1000mg',
        nameHu: 'C-Vitamin 1000mg Rágótabletta',
        nameEn: 'Vitamin C 1000mg Chewable',
        nameDe: 'Vitamin C 1000mg Kautabletten',
        description: 'Természetes C-vitamin rágótabletta',
        descriptionHu:
          'Nagy dózisú C-vitamin az immunrendszer támogatására, fáradtság csökkentésére.',
        descriptionEn: 'High-dose vitamin C to support immune system and reduce fatigue.',
        descriptionDe:
          'Hochdosiertes Vitamin C zur Unterstützung des Immunsystems und Verringerung von Müdigkeit.',
        price: 3990,
        imageUrl: 'https://via.placeholder.com/300x300/FF9800/ffffff?text=C-Vitamin',
        category: 'vitamins',
        manufacturer: 'Vitabalans',
        brand: 'VitaMax',
        inStock: true,
        stockQuantity: 89,
        requiresPrescription: false,
        rating: 4.8,
        reviewCount: 245,
        sku: 'VIT-C-60',
        dosage: 'Napi 1 tabletta',
        packaging: '60 rágótabletta',
      },
      {
        id: '3',
        name: 'Omega-3 Halolaj',
        nameHu: 'Omega-3 Halolaj Kapszula',
        nameEn: 'Omega-3 Fish Oil Capsules',
        nameDe: 'Omega-3 Fischölkapseln',
        description: 'Omega-3 zsírsavakat tartalmazó étrend-kiegészítő',
        descriptionHu: 'EPA és DHA omega-3 zsírsavak a szív egészségének megőrzésére.',
        descriptionEn: 'EPA and DHA omega-3 fatty acids for maintaining heart health.',
        descriptionDe: 'EPA und DHA Omega-3-Fettsäuren zur Erhaltung der Herzgesundheit.',
        price: 5490,
        imageUrl: 'https://via.placeholder.com/300x300/2196F3/ffffff?text=Omega-3',
        category: 'supplements',
        manufacturer: 'Nordic Naturals',
        brand: 'Nordic Omega',
        inStock: true,
        stockQuantity: 67,
        requiresPrescription: false,
        rating: 4.7,
        reviewCount: 189,
        sku: 'OMG-3-90',
        dosage: 'Napi 2 kapszula',
        packaging: '90 lágy kapszula',
        discountPercentage: 10,
      },
      {
        id: '4',
        name: 'Nivea Soft Krém',
        nameHu: 'Nivea Soft Hidratáló Krém',
        nameEn: 'Nivea Soft Moisturizing Cream',
        nameDe: 'Nivea Soft Feuchtigkeitscreme',
        description: 'Univerzális hidratáló krém arcra, testre és kézre',
        descriptionHu: 'Gyorsan felszívódó, könnyű textúrájú hidratáló krém minden bőrtípusra.',
        descriptionEn: 'Fast-absorbing, lightweight moisturizing cream for all skin types.',
        descriptionDe: 'Schnell einziehende, leichte Feuchtigkeitscreme für alle Hauttypen.',
        price: 1890,
        imageUrl: 'https://via.placeholder.com/300x300/E91E63/ffffff?text=Nivea',
        category: 'cosmetics',
        manufacturer: 'Beiersdorf',
        brand: 'Nivea',
        inStock: true,
        stockQuantity: 134,
        requiresPrescription: false,
        rating: 4.6,
        reviewCount: 312,
        sku: 'NIV-300',
        packaging: '300ml',
      },
      {
        id: '5',
        name: 'Bepanthen Baby',
        nameHu: 'Bepanthen Baby Popsikrém',
        nameEn: 'Bepanthen Baby Diaper Cream',
        nameDe: 'Bepanthen Baby Wundschutzcreme',
        description: 'Védő és ápoló popsikrém babáknak',
        descriptionHu: 'Megelőzi és kezeli a pelenkakiütést, dexpanthenol tartalommal.',
        descriptionEn: 'Prevents and treats diaper rash with dexpanthenol.',
        descriptionDe: 'Beugt Windelausschlag vor und behandelt ihn mit Dexpanthenol.',
        price: 3290,
        imageUrl: 'https://via.placeholder.com/300x300/9C27B0/ffffff?text=Bepanthen',
        category: 'baby-care',
        manufacturer: 'Bayer',
        brand: 'Bepanthen',
        inStock: true,
        stockQuantity: 56,
        requiresPrescription: false,
        rating: 4.9,
        reviewCount: 421,
        sku: 'BEP-100',
        packaging: '100g',
      },
      {
        id: '6',
        name: 'Omron Vérnyomásmérő',
        nameHu: 'Omron M3 Digitális Vérnyomásmérő',
        nameEn: 'Omron M3 Digital Blood Pressure Monitor',
        nameDe: 'Omron M3 Digitales Blutdruckmessgerät',
        description: 'Automata felkaros vérnyomásmérő',
        descriptionHu: 'Klinikai pontosságú automata vérnyomásmérő memóriafunkcióval.',
        descriptionEn: 'Clinically accurate automatic blood pressure monitor with memory function.',
        descriptionDe: 'Klinisch genaues automatisches Blutdruckmessgerät mit Speicherfunktion.',
        price: 21990,
        imageUrl: 'https://via.placeholder.com/300x300/607D8B/ffffff?text=Omron',
        category: 'medical-devices',
        manufacturer: 'Omron Healthcare',
        brand: 'Omron',
        inStock: true,
        stockQuantity: 23,
        requiresPrescription: false,
        rating: 4.8,
        reviewCount: 567,
        sku: 'OMR-M3',
        packaging: '1 db készülék + tok',
        discountPercentage: 20,
      },
      {
        id: '7',
        name: 'Magnézium 375mg',
        nameHu: 'Magnézium B-vitaminnal 375mg',
        nameEn: 'Magnesium with B-Vitamins 375mg',
        nameDe: 'Magnesium mit B-Vitaminen 375mg',
        description: 'Magnézium-citrát étrend-kiegészítő',
        descriptionHu:
          'Jól felszívódó magnézium-citrát B6-vitaminnal az idegrendszer támogatására.',
        descriptionEn:
          'Highly absorbable magnesium citrate with B6 vitamin for nervous system support.',
        descriptionDe:
          'Gut absorbierbares Magnesiumcitrat mit B6-Vitamin zur Unterstützung des Nervensystems.',
        price: 4290,
        imageUrl: 'https://via.placeholder.com/300x300/3F51B5/ffffff?text=Magnesium',
        category: 'supplements',
        manufacturer: 'Bioglan',
        brand: 'MagneMax',
        inStock: true,
        stockQuantity: 102,
        requiresPrescription: false,
        rating: 4.6,
        reviewCount: 178,
        sku: 'MAG-375',
        dosage: 'Napi 2 tabletta',
        packaging: '60 tabletta',
      },
      {
        id: '8',
        name: 'D-Vitamin 4000NE',
        nameHu: 'D3-Vitamin 4000NE Csepp',
        nameEn: 'Vitamin D3 4000IU Drops',
        nameDe: 'Vitamin D3 4000IE Tropfen',
        description: 'Magas dózisú D3-vitamin csepp',
        descriptionHu:
          'Koncentrált D3-vitamin olajban oldva a csontok és immunrendszer támogatására.',
        descriptionEn: 'Concentrated vitamin D3 in oil for bone and immune system support.',
        descriptionDe:
          'Konzentriertes Vitamin D3 in Öl zur Unterstützung von Knochen und Immunsystem.',
        price: 3790,
        imageUrl: 'https://via.placeholder.com/300x300/FFC107/ffffff?text=D-Vitamin',
        category: 'vitamins',
        manufacturer: 'HealthAid',
        brand: 'D-Max',
        inStock: true,
        stockQuantity: 78,
        requiresPrescription: false,
        rating: 4.7,
        reviewCount: 203,
        sku: 'VIT-D3',
        dosage: 'Napi 5 csepp',
        packaging: '50ml',
      },
      {
        id: '9',
        name: 'Tantum Verde Spray',
        nameHu: 'Tantum Verde Torokspray',
        nameEn: 'Tantum Verde Throat Spray',
        nameDe: 'Tantum Verde Rachenspray',
        description: 'Torokfertőtlenítő és fájdalomcsillapító spray',
        descriptionHu: 'Benzydamin hatóanyagú spray torokfájás és gyulladás kezelésére.',
        descriptionEn: 'Benzydamine spray for treating sore throat and inflammation.',
        descriptionDe: 'Benzydamin-Spray zur Behandlung von Halsschmerzen und Entzündungen.',
        price: 2890,
        imageUrl: 'https://via.placeholder.com/300x300/00BCD4/ffffff?text=Tantum',
        category: 'medicine',
        manufacturer: 'Angelini',
        brand: 'Tantum Verde',
        inStock: true,
        stockQuantity: 91,
        requiresPrescription: false,
        rating: 4.4,
        reviewCount: 156,
        sku: 'TAN-30',
        dosage: '4-8 permetezés naponta',
        packaging: '30ml spray',
      },
      {
        id: '10',
        name: 'Probiotikum Complex',
        nameHu: 'Probiotikum Complex 10 Milliárd',
        nameEn: 'Probiotic Complex 10 Billion',
        nameDe: 'Probiotikum Komplex 10 Milliarden',
        description: 'Többtörzsű probiotikum kapszula',
        descriptionHu: '10 milliárd élő baktérium 8 különböző törzzsel a bélflóra egyensúlyáért.',
        descriptionEn: '10 billion live bacteria with 8 different strains for gut flora balance.',
        descriptionDe:
          '10 Milliarden lebende Bakterien mit 8 verschiedenen Stämmen für Darmflora-Balance.',
        price: 6490,
        imageUrl: 'https://via.placeholder.com/300x300/8BC34A/ffffff?text=Probio',
        category: 'supplements',
        manufacturer: 'OptiBac',
        brand: 'ProBio Max',
        inStock: true,
        stockQuantity: 54,
        requiresPrescription: false,
        rating: 4.8,
        reviewCount: 267,
        sku: 'PRO-10B',
        dosage: 'Napi 1 kapszula',
        packaging: '30 kapszula',
        discountPercentage: 12,
      },
      {
        id: '11',
        name: 'La Roche-Posay Effaclar',
        nameHu: 'La Roche-Posay Effaclar Duo+',
        nameEn: 'La Roche-Posay Effaclar Duo+',
        nameDe: 'La Roche-Posay Effaclar Duo+',
        description: 'Pattanások elleni arckrém',
        descriptionHu: 'Korrigáló és megújító ápolás pattanásos, problémás bőrre.',
        descriptionEn: 'Corrective and resurfacing care for acne-prone, problematic skin.',
        descriptionDe:
          'Korrigierende und erneuernde Pflege für zu Akne neigende, problematische Haut.',
        price: 7290,
        imageUrl: 'https://via.placeholder.com/300x300/673AB7/ffffff?text=LRP',
        category: 'cosmetics',
        manufacturer: "L'Oréal",
        brand: 'La Roche-Posay',
        inStock: true,
        stockQuantity: 42,
        requiresPrescription: false,
        rating: 4.7,
        reviewCount: 389,
        sku: 'LRP-EFF',
        packaging: '40ml',
      },
      {
        id: '12',
        name: 'Pampers Premium Care',
        nameHu: 'Pampers Premium Care 4-es',
        nameEn: 'Pampers Premium Care Size 4',
        nameDe: 'Pampers Premium Care Größe 4',
        description: 'Prémium minőségű pelenka',
        descriptionHu: 'Ultra puha, légáteresztő pelenka 9-14kg babáknak, 44 darab.',
        descriptionEn: 'Ultra soft, breathable diapers for 9-14kg babies, 44 pieces.',
        descriptionDe: 'Ultraweiche, atmungsaktive Windeln für 9-14kg Babys, 44 Stück.',
        price: 5990,
        imageUrl: 'https://via.placeholder.com/300x300/FF5722/ffffff?text=Pampers',
        category: 'baby-care',
        manufacturer: 'Procter & Gamble',
        brand: 'Pampers',
        inStock: true,
        stockQuantity: 198,
        requiresPrescription: false,
        rating: 4.8,
        reviewCount: 892,
        sku: 'PAM-PC4',
        packaging: '44 db pelenka',
        discountPercentage: 18,
      },
      {
        id: '13',
        name: 'Strepsils Citrom',
        nameHu: 'Strepsils Citrom Szopogató Tabletta',
        nameEn: 'Strepsils Lemon Lozenges',
        nameDe: 'Strepsils Zitrone Lutschtabletten',
        description: 'Torokfájás csillapító szopogató tabletta',
        descriptionHu: 'Enyhe torokfájás és irritáció kezelésére, citrom ízesítéssel.',
        descriptionEn: 'For relief of mild sore throat and irritation, lemon flavored.',
        descriptionDe:
          'Zur Linderung von leichten Halsschmerzen und Reizungen, mit Zitronengeschmack.',
        price: 1790,
        imageUrl: 'https://via.placeholder.com/300x300/FFEB3B/ffffff?text=Strepsils',
        category: 'medicine',
        manufacturer: 'Reckitt Benckiser',
        brand: 'Strepsils',
        inStock: true,
        stockQuantity: 156,
        requiresPrescription: false,
        rating: 4.3,
        reviewCount: 234,
        sku: 'STR-CIT',
        dosage: '2 óránként 1 tabletta',
        packaging: '24 db szopogató tabletta',
      },
      {
        id: '14',
        name: 'Coldrex MaxGrip',
        nameHu: 'Coldrex MaxGrip Citrom',
        nameEn: 'Coldrex MaxGrip Lemon',
        nameDe: 'Coldrex MaxGrip Zitrone',
        description: 'Megfázás és influenza tüneteinek enyhítésére',
        descriptionHu: 'Forró ital megfázás, influenza tüneteinek enyhítésére, citrom ízesítéssel.',
        descriptionEn: 'Hot drink for relief of cold and flu symptoms, lemon flavored.',
        descriptionDe:
          'Heißgetränk zur Linderung von Erkältungs- und Grippesymptomen, Zitronengeschmack.',
        price: 3490,
        imageUrl: 'https://via.placeholder.com/300x300/F44336/ffffff?text=Coldrex',
        category: 'medicine',
        manufacturer: 'GlaxoSmithKline',
        brand: 'Coldrex',
        inStock: true,
        stockQuantity: 73,
        requiresPrescription: false,
        rating: 4.6,
        reviewCount: 412,
        sku: 'COL-MAX',
        dosage: 'Napi 3-4 tasak',
        packaging: '10 tasak',
        discountPercentage: 8,
      },
      {
        id: '15',
        name: 'Microlife Lázmérő',
        nameHu: 'Microlife Digitális Lázmérő',
        nameEn: 'Microlife Digital Thermometer',
        nameDe: 'Microlife Digitales Thermometer',
        description: 'Gyors és pontos digitális lázmérő',
        descriptionHu: 'Klinikai pontosságú digitális lázmérő 10 másodperces méréssel.',
        descriptionEn: 'Clinically accurate digital thermometer with 10-second measurement.',
        descriptionDe: 'Klinisch genaues digitales Thermometer mit 10-Sekunden-Messung.',
        price: 2990,
        imageUrl: 'https://via.placeholder.com/300x300/009688/ffffff?text=Microlife',
        category: 'medical-devices',
        manufacturer: 'Microlife',
        brand: 'Microlife',
        inStock: true,
        stockQuantity: 87,
        requiresPrescription: false,
        rating: 4.5,
        reviewCount: 298,
        sku: 'MIC-TEMP',
        packaging: '1 db + tok',
      },
    ];
  }
}
