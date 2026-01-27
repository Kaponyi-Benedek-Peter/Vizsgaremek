import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-featured-product-card',
  imports: [],
  templateUrl: './featured-product-card.html',
  styleUrl: './featured-product-card.css',
})
export class FeaturedProductCard {
  @Input() img: string = '';
  @Input() alt: string = 'Termék kép';

  @Output() cardClick = new EventEmitter<void>();

  constructor() {}

  onCardClick(): void {
    this.cardClick.emit();
  }
}
