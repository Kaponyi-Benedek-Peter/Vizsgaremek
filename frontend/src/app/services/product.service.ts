import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = [];
  url = 'roysshack.hu/api';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(this.url + '/products');
  }
}
