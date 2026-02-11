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
  id: string; // Base64 encoded user ID
  password: string; // Base64 encoded password
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
  private readonly API_URL = 'https://api.roysshack.hu/api';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/profile`).pipe(catchError(this.handleError));
  }

  /**
   * Update user profile
   * Requires JWT authentication
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
   * Requires JWT authentication
   * Sends confirmation email
   * @param userId User's ID
   * @param password User's password for confirmation
   */
  deleteAccountRequest(userId: string, password: string): Observable<ApiResponse> {
    const request: DeleteAccountRequest = {
      id: this.encodeBase64(userId),
      password: this.encodeBase64(password),
    };

    return this.http.post<ApiResponse>(`${this.API_URL}/delacc_request`, request).pipe(
      tap(() => {
        console.log('Account deletion requested - confirmation email sent');
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Confirm account deletion with token from email
   * Requires JWT authentication
   * @param userId User's ID
   * @param token Confirmation token from email
   */
  confirmAccountDeletion(userId: string, token: string): Observable<ApiResponse> {
    const request = {
      id: this.encodeBase64(userId),
      token: this.encodeBase64(token),
    };

    return this.http.post<ApiResponse>(`${this.API_URL}/delacc_promise`, request).pipe(
      tap(() => {
        console.log('Account deleted successfully');
        this.authService.logout();
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Change user password
   * Requires JWT authentication
   * @param userId User's ID
   * @param currentPassword Current password for verification
   * @param newPassword New password
   */
  changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Observable<ApiResponse> {
    const request = {
      id: this.encodeBase64(userId),
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

  getOrderHistory(): Observable<ApiResponse<any[]>> {
    return this.http
      .get<ApiResponse<any[]>>(`${this.API_URL}/orders`)
      .pipe(catchError(this.handleError));
  }

  getSavedAddresses(): Observable<ApiResponse<any[]>> {
    return this.http
      .get<ApiResponse<any[]>>(`${this.API_URL}/addresses`)
      .pipe(catchError(this.handleError));
  }

  exampleAuthenticatedRequest(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/some-protected-endpoint`)
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
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'account.errors.bad_request';
          break;
        case 401:
          errorMessage = 'account.errors.unauthorized';
          break;
        case 403:
          errorMessage = 'account.errors.forbidden';
          break;
        case 404:
          errorMessage = 'account.errors.not_found';
          break;
        case 500:
          errorMessage = 'account.errors.server_error';
          break;
        default:
          errorMessage = error.error?.message || error.message || errorMessage;
      }
    }

    console.error('Account Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
