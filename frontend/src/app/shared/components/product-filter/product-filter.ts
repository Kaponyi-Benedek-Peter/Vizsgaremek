import {
  Component,
  computed,
  EventEmitter,
  inject,
  Output,
  signal,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductFilterOptions, SortOption } from '../../../core/models/product.model';
import { ICONS } from '../../../core/constants/visuals';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

interface FilterState {
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  in_stock_only: boolean;
  sort_by: SortOption;
  search_query: string;
}

@Component({
  selector: 'app-product-filter',
  imports: [FormsModule, TranslateModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  @Output() filterChanged = new EventEmitter<ProductFilterOptions>();
  @Output() clearFilters = new EventEmitter<void>();

  protected readonly icons = ICONS;

  private destroyRef = inject(DestroyRef);
  private searchSubject = new Subject<string>();

  filterState = signal<FilterState>({
    categories: [],
    priceMin: null,
    priceMax: null,
    in_stock_only: false,
    sort_by: 'popularity',
    search_query: '',
  });

  isExpanded = signal(false);

  sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: 'popularity', label: 'filter.sort.popularity' },
    { value: 'name-asc', label: 'filter.sort.name_asc' },
    { value: 'name-desc', label: 'filter.sort.name_desc' },
    { value: 'price-asc', label: 'filter.sort.price_asc' },
    { value: 'price-desc', label: 'filter.sort.price_desc' },
    { value: 'rating', label: 'filter.sort.rating' },
    { value: 'newest', label: 'filter.sort.newest' },
  ];

  hasActiveFilters = computed(() => {
    const state = this.filterState();
    return (
      state.categories.length > 0 ||
      state.priceMin !== null ||
      state.priceMax !== null ||
      state.in_stock_only ||
      state.sort_by !== 'popularity'
    );
  });

  hasSearchQuery = computed(() => this.filterState().search_query.trim().length > 0);

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((query) => {
        this.filterState.update((state) => ({ ...state, search_query: query }));
        this.emitFilters();
      });
  }

  handleSearchInput(value: string): void {
    this.searchSubject.next(value);
  }

  clearSearch(): void {
    this.filterState.update((state) => ({ ...state, search_query: '' }));
    this.emitFilters();
  }

  toggleExpanded(): void {
    this.isExpanded.update((v) => !v);
  }

  updateSortBy(sort_by: SortOption): void {
    this.filterState.update((state) => ({ ...state, sort_by }));
    this.emitFilters();
  }

  updateInStockOnly(): void {
    this.filterState.update((state) => ({ ...state, in_stock_only: !state.in_stock_only }));
    this.emitFilters();
  }

  updatePriceRange(): void {
    this.emitFilters();
  }

  handlePriceMinChange(value: string): void {
    const num = value ? parseFloat(value) : null;
    this.filterState.update((state) => ({ ...state, priceMin: num }));
    this.emitFilters();
  }

  handlePriceMaxChange(value: string): void {
    const num = value ? parseFloat(value) : null;
    this.filterState.update((state) => ({ ...state, priceMax: num }));
    this.emitFilters();
  }

  handleClearFilters(): void {
    this.filterState.set({
      categories: [],
      priceMin: null,
      priceMax: null,
      in_stock_only: false,
      sort_by: 'popularity',
      search_query: '',
    });
    this.clearFilters.emit();
  }

  private emitFilters(): void {
    const state = this.filterState();
    const filters: ProductFilterOptions = {
      categories: state.categories,
      price_range:
        state.priceMin !== null || state.priceMax !== null
          ? { min: state.priceMin ?? 0, max: state.priceMax ?? Infinity }
          : null,
      in_stock_only: state.in_stock_only,
      sort_by: state.sort_by,
      search_query: state.search_query.trim() || undefined,
    };

    this.filterChanged.emit(filters);
  }
}
