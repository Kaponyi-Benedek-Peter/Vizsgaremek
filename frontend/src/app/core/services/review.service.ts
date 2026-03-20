import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import {
  Review,
  ReviewsApiResponse,
  ReviewWithHelpers,
  enrichReview,
} from '../../core/models/review.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly API_URL = environment.baseURL;
  private http = inject(HttpClient);

  getReviewsByProductId(productId: string, page = 1, amount = 50): Observable<ReviewWithHelpers[]> {
    const body = {
      product_id: btoa(productId),
      page: btoa(String(page)),
      amount: btoa(String(amount)),
    };

    return this.http
      .post<ReviewsApiResponse>(`${this.API_URL}/api/get_all_reviews_page_by_product_id`, body)
      .pipe(
        timeout(5000),
        map((r) => {
          if (r.statuscode !== '200') throw new Error(`API Error: ${r.status}`);
          if (!Array.isArray(r.reviews)) return [];
          return r.reviews.map(enrichReview);
        }),
        catchError((err) => {
          console.error('ReviewService: Failed to load reviews', err);
          return of([]);
        }),
      );
  }

  getAverageRating(reviews: ReviewWithHelpers[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating_number, 0);
    return sum / reviews.length;
  }

  getRatingStars(rating_number: number): string {
    if (!rating_number) return '';
    const full = Math.floor(rating_number);
    const half = rating_number % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
  }
}
