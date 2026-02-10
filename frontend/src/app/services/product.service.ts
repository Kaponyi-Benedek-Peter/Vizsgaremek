import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductsApiResponse } from '../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_URL = 'https://api.roysshack.hu';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ProductsApiResponse>(`${this.API_URL}/api/get_all_products`).pipe(
      map((response) => {
        if (response.statuscode !== '200') {
          throw new Error(`API Error: ${response.status}`);
        }

        if (!response.products || !Array.isArray(response.products)) {
          throw new Error('Invalid API response: products array missing');
        }

        return response.products;
      }),
      catchError(this.handleError),
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.getAllProducts().pipe(map((products) => products.find((p) => p.id === id)));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => p.category === category)),
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    return this.getAllProducts().pipe(
      map((products) =>
        products.filter(
          (p) =>
            p.name_en.toLowerCase().includes(lowerQuery) ||
            p.name_hu.toLowerCase().includes(lowerQuery) ||
            p.name_de.toLowerCase().includes(lowerQuery),
        ),
      ),
    );
  }

  getSaleProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => parseFloat(p.sale_percentage) > 0)),
    );
  }

  getInStockProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((p) => parseFloat(p.stock) > 0)),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request';
          break;
        case 404:
          errorMessage = 'Products not found';
          break;
        case 500:
          errorMessage = 'Server error';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    console.error('ProductService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
