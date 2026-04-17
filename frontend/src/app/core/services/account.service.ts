import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { SupportedLanguage } from './translation.service';

export interface UpdateProfileRequest {
  firstname?: string;
  lastname?: string;
  email?: string;
}

export interface DeleteAccountRequest {
  id: string;
  password: string;
  language: SupportedLanguage;
}

export interface ApiResponse<T = any> {
  statuscode: string;
  status: string;
  message?: string;
  data?: T;
}

export interface OrderItem {
  product_id: string;
  quantity: string;
}

export interface CreateOrderRequest {
  order: {
    user_id: string;
    session_token: string;
    email: string;
    billing_name: string;
    shipping_name: string;
    shipping_company: string;
    price: string;
    city: string;
    guest: string;
    zipcode: string;
    address: string;
    apartment_number: string;
    note: string;
    house_number: string;
    phone_number: string;
  };
  items: OrderItem[];
}

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  first_name: string;
  last_name: string;
  account_state: string;
}

export interface AdminUsersResponse {
  statuscode: string;
  status: string;
  users: AdminUser[];
}

export interface OrderProductDetail {
  id: string;
  order_id: string;
  product_id: string;
  quantity: string;
  price: string;
  unit_price: string;
  product_name_hu: string;
  product_name_en: string;
  product_name_de: string;
  thumbnail_url: string;
  sku: string;
}

export interface AdminOrder {
  id: string;
  user_id: string;
  email: string;
  billing_name: string;
  order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  price: string;
  city: string;
  zipcode: string;
  address: string;
  house_number: string;
  apartment_number: string;
  phone_number: string;
  note: string;
  tracking_token?: string;
  products?: OrderProductDetail[];
}

export interface AdminOrdersResponse {
  statuscode: string;
  status: string;
  orders: AdminOrder[];
}

export interface AdminAuthBody {
  id: string;
  session_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly API_URL = environment.baseURL;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/api/getUser`).pipe(catchError(this.handleError));
  }

  updateProfile(updates: UpdateProfileRequest): Observable<ApiResponse<User>> {
    const encodedUpdates: Partial<UpdateProfileRequest> = {};

    if (updates.firstname) encodedUpdates.firstname = updates.firstname;
    if (updates.lastname) encodedUpdates.lastname = updates.lastname;
    if (updates.email) encodedUpdates.email = updates.email;

    return this.http
      .put<ApiResponse<User>>(`${this.API_URL}/api/update_name_by_id`, encodedUpdates)
      .pipe(catchError(this.handleError));
  }

  deleteAccountRequest(
    userId: string,
    password: string,
    language: SupportedLanguage,
  ): Observable<ApiResponse> {
    const request: DeleteAccountRequest = {
      id: userId,
      password: password,
      language: language as SupportedLanguage,
    };

    return this.http
      .post<ApiResponse>(`${this.API_URL}/api/delacc_request`, request)
      .pipe(catchError(this.handleError));
  }

  confirmAccountDeletion(encodedId: string, encodedToken: string): Observable<ApiResponse> {
    const request = {
      id: encodedId,
      token: encodedToken,
    };

    return this.http.post<ApiResponse>(`${this.API_URL}/api/delacc_promise`, request).pipe(
      tap(() => this.authService.logout()),
      catchError(this.handleError),
    );
  }

  changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Observable<ApiResponse> {
    const request = {
      id: userId,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    return this.http
      .post<ApiResponse>(`${this.API_URL}/api/change-password`, request)
      .pipe(catchError(this.handleError));
  }

  createOrder(order: CreateOrderRequest): Observable<ApiResponse & { tracking_token?: string }> {
    return this.http
      .post<ApiResponse & { tracking_token?: string }>(`${this.API_URL}/api/create_order`, order)
      .pipe(catchError(this.handleError));
  }

  updateUserStateAdmin(
    admin_id: string,
    admin_session_token: string,
    target_user_id: string,
    new_user_state: string,
    reason: string,
  ): Observable<ApiResponse> {
    const body = {
      admin_id: admin_id,
      admin_session_token: admin_session_token,
      target_user_id: target_user_id,
      new_user_state: new_user_state,
      reason: reason,
    };
    return this.http
      .post<ApiResponse>(`${this.API_URL}/api/update_user_state_admin`, body)
      .pipe(catchError(this.handleError));
  }

  deleteUserAdmin(userId: string): Observable<ApiResponse> {
    const auth = this.buildAdminAuthBody();
    const body = {
      ...auth,
      user_id: userId,
    };
    return this.http
      .post<ApiResponse>(`${this.API_URL}/api/delete_user_admin`, body)
      .pipe(catchError(this.handleError));
  }

  getOrderHistory(): Observable<ApiResponse<any[]>> {
    const body = this.buildAdminAuthBody();
    return this.http
      .post<ApiResponse<any[]>>(`${this.API_URL}/api/get_all_orders_user`, body)
      .pipe(catchError(this.handleError));
  }

  getSavedAddresses(): Observable<ApiResponse<any[]>> {
    return this.http
      .get<ApiResponse<any[]>>(`${this.API_URL}/api/addresses`)
      .pipe(catchError(this.handleError));
  }

  getAllUsersAdmin(): Observable<AdminUsersResponse> {
    const body = this.buildAdminAuthBody();
    return this.http
      .post<AdminUsersResponse>(`${this.API_URL}/api/get_all_users_admin`, body)
      .pipe(catchError(this.handleError));
  }

  getAllOrdersAdmin(): Observable<AdminOrdersResponse> {
    const body = this.buildAdminAuthBody();
    return this.http
      .post<AdminOrdersResponse>(`${this.API_URL}/api/get_all_orders_admin`, body)
      .pipe(catchError(this.handleError));
  }

  updateOrderStatusAdmin(orderId: string, newStatus: string): Observable<ApiResponse> {
    const storedId = sessionStorage.getItem('user_id') ?? localStorage.getItem('user_id') ?? '';
    const sessionToken = this.authService.getSessionToken() ?? this.authService.getToken() ?? '';
    const body = {
      admin_id: storedId,
      admin_session_token: sessionToken,
      target_order_id: orderId,
      new_order_status: newStatus,
    };
    return this.http
      .post<ApiResponse>(`${this.API_URL}/api/update_order_status_admin`, body)
      .pipe(catchError(this.handleError));
  }

  private buildAdminAuthBody(): AdminAuthBody {
    const storedId = sessionStorage.getItem('user_id') ?? localStorage.getItem('user_id') ?? '';
    const sessionToken = this.authService.getSessionToken();
    const jwtToken = this.authService.getToken();

    const tokenToSend = sessionToken ?? jwtToken ?? '';

    return {
      id: storedId,
      session_token: tokenToSend,
    };
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

    return throwError(() => new Error(errorMessage));
  }
}
