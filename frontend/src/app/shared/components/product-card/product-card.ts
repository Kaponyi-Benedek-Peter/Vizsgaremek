import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() image!: string;
  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  productdata = [];
}
