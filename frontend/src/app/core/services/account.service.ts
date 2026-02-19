import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../models/auth.model';
import { environment } from '../../../environments/environment';

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

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  city: string;
  zipcode: string;
  address: string;
  houseNumber: number;
  apartmentNumber: number;
  phoneNumber: string;
  note: string;
  items: OrderItem[];
}

// --- Admin API response types ---

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  first_name: string;
  last_name: string;
  /** unverified | verified | admin | banned | deleted */
  account_state: string;
}

export interface AdminUsersResponse {
  statuscode: string;
  status: string;
  users: AdminUser[];
}

export interface AdminOrder {
  id: string;
  user_id: string;
  created_at: string;
  price: string;
  city: string;
  apartment_number: string;
  note: string;
  house_number: string;
  phone_number: string;
}

export interface AdminOrdersResponse {
  statuscode: string;
  status: string;
  orders: AdminOrder[];
}

export interface AdminAuthBody {
  id: string; // B64(admin user id)
  token: string; // B64(admin session token or jwt token)
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly API_URL = environment.baseURL;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/api/profile`).pipe(catchError(this.handleError));
  }

  /**
   * Update user profile
   * Requires JWT authentication
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

    return this.http.put<ApiResponse<User>>(`${this.API_URL}/api/profile`, encodedUpdates).pipe(
      tap(() => console.log('Profile updated successfully')),
      catchError(this.handleError),
    );
  }

  /**
   * Request account deletion — JWT required
   * Sends B64(userId) and B64(password) in body
   */
  deleteAccountRequest(userId: string, password: string): Observable<ApiResponse> {
    const request: DeleteAccountRequest = {
      id: this.encodeBase64(userId),
      password: this.encodeBase64(password),
    };

    return this.http.post<ApiResponse>(`${this.API_URL}/api/delacc_request`, request).pipe(
      tap(() => console.log('Account deletion requested — confirmation email sent')),
      catchError(this.handleError),
    );
  }

  /**
   * Confirm account deletion — JWT required
   * IMPORTANT: id and token come already B64-encoded from the email URL.
   * Note: The email link sends B64(email) as "id"
   */
  confirmAccountDeletion(encodedId: string, encodedToken: string): Observable<ApiResponse> {
    const request = {
      id: encodedId, // B64 from URL
      token: encodedToken, // B64 from URL
    };

    return this.http.post<ApiResponse>(`${this.API_URL}/api/delacc_promise`, request).pipe(
      tap(() => {
        console.log('Account deleted successfully');
        this.authService.logout();
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Change user password — JWT required
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

    return this.http.post<ApiResponse>(`${this.API_URL}/api/change-password`, request).pipe(
      tap(() => console.log('Password changed successfully')),
      catchError(this.handleError),
    );
  }

  /**
   * Create a new order — JWT required
   */
  createOrder(order: CreateOrderRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/api/create_order`, order).pipe(
      tap(() => console.log('Order created successfully')),
      catchError(this.handleError),
    );
  }

  getOrderHistory(): Observable<ApiResponse<any[]>> {
    return this.http
      .get<ApiResponse<any[]>>(`${this.API_URL}/api/orders`)
      .pipe(catchError(this.handleError));
  }

  getSavedAddresses(): Observable<ApiResponse<any[]>> {
    return this.http
      .get<ApiResponse<any[]>>(`${this.API_URL}/api/addresses`)
      .pipe(catchError(this.handleError));
  }

  // ─── Admin API methods ───────────────────────────────────────────────────────

  /**
   * Get all users — JWT required, admin only
   * Sends admin user id and token (session token) in the request body
   */
  getAllUsersAdmin(): Observable<AdminUsersResponse> {
    const body = this.buildAdminAuthBody();
    return this.http
      .post<AdminUsersResponse>(`${this.API_URL}/api/get_all_users`, body)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all orders — JWT required, admin only
   * Sends admin user id and token (session token) in the request body
   */
  getAllOrdersAdmin(): Observable<AdminOrdersResponse> {
    const body = this.buildAdminAuthBody();
    return this.http
      .post<AdminOrdersResponse>(`${this.API_URL}/api/get_all_orders`, body)
      .pipe(catchError(this.handleError));
  }

  /**
   * Builds the body required by admin-only endpoints:
   * { id: B64(admin_user_id), token: B64(session_token || jwt_token) }
   */
  private buildAdminAuthBody(): AdminAuthBody {
    const user = this.authService.currentUser();
    const sessionToken = this.authService.getSessionToken();
    const jwtToken = this.authService.getToken();

    const tokenToSend = sessionToken ?? jwtToken ?? '';
    const userId = user?.id ?? '';

    return {
      id: this.encodeBase64(userId),
      token: this.encodeBase64(tokenToSend),
    };
  }

  private encodeBase64(value: string): string {
    try {
      return btoa(unescape(encodeURIComponent(value)));
    } catch (error) {
      console.error('Base64 encoding error:', error);
      return btoa(value);
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
