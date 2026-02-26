import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../../../core/models/product.model';

@Component({
  selector: 'app-category-item',
  imports: [CommonModule],
  templateUrl: './category-item.html',
  styleUrl: './category-item.css',
})
export class CategoryItem {
  @Input({ required: true }) category!: Category;
  @Input() isSelected = false;
  @Output() categoryClick = new EventEmitter<Category>();

  private translateService = inject(TranslateService);

  /**
   * Returns the category name in the currently active language.
   * Falls back to English if the localized name is missing.
   */
  get displayName(): string {
    const lang = this.translateService.currentLang || 'hu';

    switch (lang) {
      case 'hu':
        return this.category.name_hu || this.category.name_en;
      case 'de':
        return this.category.name_de || this.category.name_en;
      default:
        return this.category.name_en;
    }
  }

  handleClick(): void {
    this.categoryClick.emit(this.category);
  }
}
