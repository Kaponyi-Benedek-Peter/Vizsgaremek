import { Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { ProductFilterOptions, SortOption } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

interface FilterState {
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  inStockOnly: boolean;
  sortBy: SortOption;
}

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  @Output() filterChanged = new EventEmitter<ProductFilterOptions>();
  @Output() clearFilters = new EventEmitter<void>();

  filterState = signal<FilterState>({
    categories: [],
    priceMin: null,
    priceMax: null,
    inStockOnly: false,
    sortBy: 'popularity',
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
      state.inStockOnly ||
      state.sortBy !== 'popularity'
    );
  });

  toggleExpanded(): void {
    this.isExpanded.update((v) => !v);
  }

  updateSortBy(sortBy: SortOption): void {
    this.filterState.update((state) => ({ ...state, sortBy }));
    this.emitFilters();
  }

  updateInStockOnly(): void {
    this.filterState.update((state) => ({ ...state, inStockOnly: !state.inStockOnly }));
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
      inStockOnly: false,
      sortBy: 'popularity',
    });
    this.clearFilters.emit();
  }

  private emitFilters(): void {
    const state = this.filterState();
    const filters: ProductFilterOptions = {
      categories: state.categories,
      priceRange:
        state.priceMin !== null || state.priceMax !== null
          ? { min: state.priceMin ?? 0, max: state.priceMax ?? Infinity }
          : null,
      inStockOnly: state.inStockOnly,
      sortBy: state.sortBy,
    };

    this.filterChanged.emit(filters);
  }
}
