import { Component } from '@angular/core';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCard, HttpClient],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {}
