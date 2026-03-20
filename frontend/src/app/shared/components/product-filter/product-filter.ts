import { Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { ProductFilterOptions, SortOption } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

interface FilterState {
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  in_stock_only: boolean;
  sort_by: SortOption;
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
    in_stock_only: false,
    sort_by: 'popularity',
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
    };

    this.filterChanged.emit(filters);
  }
}
