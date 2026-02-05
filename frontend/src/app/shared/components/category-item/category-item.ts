import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from '../../../core/models/product.model';

@Component({
  selector: 'app-category-item',
  imports: [CommonModule, TranslateModule],
  templateUrl: './category-item.html',
  styleUrl: './category-item.css',
})
export class CategoryItem {
  @Input({ required: true }) category!: Category;
  @Input() isSelected = false;
  @Output() categoryClick = new EventEmitter<Category>();

  handleClick(): void {
    this.categoryClick.emit(this.category);
  }
}
