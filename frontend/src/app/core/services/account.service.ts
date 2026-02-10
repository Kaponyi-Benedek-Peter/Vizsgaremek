import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../models/auth.model';

export interface UpdateProfileRequest {
  firstname?: string;
  lastname?: string;
  email?: string;
}

export interface DeleteAccountRequest {
  password: string;
}

export interface ApiResponse<T = any> {
  statuscode: string;
  status: string;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly API_URL = 'https://api.roysshack.hu';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  /**
   * Get current user profile information
   */
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/profile`).pipe(catchError(this.handleError));
  }

  /**
   * Update user profile
   * @param updates Profile fields to update
   */
  updateProfile(updates: UpdateProfileRequest): Observable<ApiResponse<User>> {
    const encodedUpdates: any = {};

    if (updates.firstname) {
      encodedUpdates.firstname = this.encodeBase64(updates.firstname);
    }
    if (updates.lastname) {
      encodedUpdates.lastname = this.encodeBase64(updates.lastname);
    }
    if (updates.email) {
      encodedUpdates.email = this.encodeBase64(updates.email);
    }

    return this.http.put<ApiResponse<User>>(`${this.API_URL}/profile`, encodedUpdates).pipe(
      tap((response) => {
        console.log('Profile updated successfully');
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Request account deletion
   * @param password User's password for confirmation
   */
  deleteAccount(password: string): Observable<ApiResponse> {
    const request: DeleteAccountRequest = {
      password: this.encodeBase64(password),
    };

    return this.http.post<ApiResponse>(`${this.API_URL}/delacc_request`, request).pipe(
      tap(() => {
        console.log('Account deletion requested');
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Confirm account deletion with token
   * @param token Confirmation token from email
   */
  confirmAccountDeletion(token: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/delacc_promise`, { token }).pipe(
      tap(() => {
        console.log('Account deleted successfully');
        this.authService.logout();
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Change user password
   * @param currentPassword Current password for verification
   * @param newPassword New password
   */
  changePassword(currentPassword: string, newPassword: string): Observable<ApiResponse> {
    const request = {
      currentPassword: this.encodeBase64(currentPassword),
      newPassword: this.encodeBase64(newPassword),
    };

    return this.http.post<ApiResponse>(`${this.API_URL}/change-password`, request).pipe(
      tap(() => {
        console.log('Password changed successfully');
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Get user order history
   */
  getOrderHistory(): Observable<ApiResponse<any[]>> {
    return this.http
      .get<ApiResponse<any[]>>(`${this.API_URL}/orders`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get user's saved addresses
   */
  getSavedAddresses(): Observable<ApiResponse<any[]>> {
    return this.http
      .get<ApiResponse<any[]>>(`${this.API_URL}/addresses`)
      .pipe(catchError(this.handleError));
  }

  // Helper methods

  private encodeBase64(value: string): string {
    try {
      return btoa(unescape(encodeURIComponent(value)));
    } catch (error) {
      console.error('Base64 encoding error:', error);
      return btoa(value);
    }
  }

  private decodeBase64(value: string): string {
    try {
      return decodeURIComponent(escape(atob(value)));
    } catch (error) {
      console.error('Base64 decoding error:', error);
      return atob(value);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      const apiError = error.error as ApiResponse;

      switch (error.status) {
        case 400:
          errorMessage = apiError?.message || 'Bad request';
          break;
        case 401:
          errorMessage = 'Unauthorized - please log in';
          break;
        case 403:
          errorMessage = 'Forbidden - you do not have permission';
          break;
        case 404:
          errorMessage = apiError?.message || 'Resource not found';
          break;
        case 500:
          errorMessage = 'Server error - please try again later';
          break;
        default:
          errorMessage = apiError?.message || errorMessage;
      }
    }

    console.error('Account Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
