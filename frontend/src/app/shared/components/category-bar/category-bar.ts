import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from '../../../core/models/product.model';
import { CategoryItem } from '../category-item/category-item';

@Component({
  selector: 'app-category-bar',
  imports: [CommonModule, TranslateModule, CategoryItem],
  templateUrl: './category-bar.html',
  styleUrl: './category-bar.css',
})
export class CategoryBar {
  @Input({ required: true }) categories: Category[] = [];
  @Input() selectedCategories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();
  @Output() clearCategories = new EventEmitter<void>();

  scrollPosition = signal(0);

  isCategorySelected(categoryId: string): boolean {
    return this.selectedCategories.includes(categoryId);
  }

  handleCategoryClick(category: Category): void {
    this.categorySelected.emit(category.id);
  }

  handleClearAll(): void {
    this.clearCategories.emit();
  }

  scrollLeft(): void {
    const container = document.querySelector('.categories-scroll') as HTMLElement;
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    const container = document.querySelector('.categories-scroll') as HTMLElement;
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
}
