import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  User,
  LoginRequest,
  LoginResponse,
  RegistrationRequest,
  RegistrationPromiseRequest,
  RegistrationResponse,
  PasswordChangeRequest,
  PasswordChangePromiseRequest,
  AuthState,
  ApiErrorResponse,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://api.roysshack.hu';

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly EXPIRES_KEY = 'auth_expires';
  private readonly STORAGE_TYPE_KEY = 'auth_storage_type';

  private authStateSignal = signal<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    expiresAt: null,
  });

  public authState = this.authStateSignal.asReadonly();
  public isAuthenticated = computed(() => this.authStateSignal().isAuthenticated);
  public currentUser = computed(() => this.authStateSignal().user);
  public token = computed(() => this.authStateSignal().token);

  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    expiresAt: null,
  });
  public authState$ = this.authStateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.initAuth();
  }

  private initAuth(): void {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    const expiresAt = this.getStoredExpiration();

    if (token && user && expiresAt) {
      if (new Date() < expiresAt) {
        this.updateAuthState({
          isAuthenticated: true,
          user,
          token,
          expiresAt,
        });
      } else {
        this.clearStorage();
      }
    }
  }

  /**
   * Login user
   * @param email User email
   * @param password User password
   * @param stayLoggedIn Whether to persist session (localStorage vs sessionStorage)
   */
  login(email: string, password: string, stayLoggedIn: boolean): Observable<LoginResponse> {
    const request: LoginRequest = {
      email: this.encodeBase64(email),
      password: this.encodeBase64(password),
    };

    return this.http.post<LoginResponse>(`${this.API_URL}/login`, request).pipe(
      tap((response) => {
        this.handleLoginSuccess(response, stayLoggedIn);
      }),
      catchError(this.handleError),
    );
  }

  register(email: string, password: string, firstname: string, lastname: string): Observable<void> {
    const request: RegistrationRequest = {
      email: this.encodeBase64(email),
      password: this.encodeBase64(password),
      firstname: this.encodeBase64(firstname),
      lastname: this.encodeBase64(lastname),
    };

    return this.http
      .post<void>(`${this.API_URL}/registration_request`, request)
      .pipe(catchError(this.handleError));
  }

  /**
   * verify email with sessionToken
   * @param sessionToken Token from email verification link
   * @param stayLoggedIn Whether to persist session
   */
  completeRegistration(
    sessionToken: string,
    stayLoggedIn: boolean = true,
  ): Observable<RegistrationResponse> {
    const request: RegistrationPromiseRequest = {
      sessionToken,
    };

    return this.http
      .post<RegistrationResponse>(`${this.API_URL}/registration_promise`, request)
      .pipe(
        tap((response) => {
          const loginResponse: LoginResponse = {
            token: response.token,
            expires_in: 604800, // 7 days default
          };
          this.handleLoginSuccess(loginResponse, stayLoggedIn, response.user);
        }),
        catchError(this.handleError),
      );
  }

  requestPasswordChange(email: string): Observable<void> {
    const request: PasswordChangeRequest = {
      email: this.encodeBase64(email),
    };

    return this.http
      .post<void>(`${this.API_URL}/chpass_request`, request)
      .pipe(catchError(this.handleError));
  }

  completePasswordChange(sessionToken: string, newPassword: string): Observable<void> {
    const request: PasswordChangePromiseRequest = {
      sessionToken,
      newPassword: this.encodeBase64(newPassword),
    };

    return this.http
      .post<void>(`${this.API_URL}/chpass_promise`, request)
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    this.clearStorage();
    this.updateAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      expiresAt: null,
    });
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.authStateSignal().token;
  }

  isUserAuthenticated(): boolean {
    return this.authStateSignal().isAuthenticated;
  }

  private handleLoginSuccess(response: LoginResponse, stayLoggedIn: boolean, user?: User): void {
    const expiresAt = new Date(Date.now() + response.expires_in * 1000);

    this.storeToken(response.token, expiresAt, stayLoggedIn);

    if (user) {
      this.storeUser(user, stayLoggedIn);
    }

    this.updateAuthState({
      isAuthenticated: true,
      user: user || this.getStoredUser(),
      token: response.token,
      expiresAt,
    });

    this.router.navigate(['/home']);
  }

  private updateAuthState(state: AuthState): void {
    this.authStateSignal.set(state);
    this.authStateSubject.next(state);
  }

  private storeToken(token: string, expiresAt: Date, stayLoggedIn: boolean): void {
    const storage = stayLoggedIn ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.EXPIRES_KEY, expiresAt.toISOString());
    storage.setItem(this.STORAGE_TYPE_KEY, stayLoggedIn ? 'local' : 'session');
  }

  private storeUser(user: User, stayLoggedIn: boolean): void {
    const storage = stayLoggedIn ? localStorage : sessionStorage;
    storage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  private getStoredExpiration(): Date | null {
    const expiresStr =
      localStorage.getItem(this.EXPIRES_KEY) || sessionStorage.getItem(this.EXPIRES_KEY);
    if (!expiresStr) return null;

    try {
      return new Date(expiresStr);
    } catch {
      return null;
    }
  }

  private clearStorage(): void {
    [localStorage, sessionStorage].forEach((storage) => {
      storage.removeItem(this.TOKEN_KEY);
      storage.removeItem(this.USER_KEY);
      storage.removeItem(this.EXPIRES_KEY);
      storage.removeItem(this.STORAGE_TYPE_KEY);
    });
  }

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
      const apiError = error.error as ApiErrorResponse;

      switch (error.status) {
        case 400:
          errorMessage = 'auth.errors.bad_request';
          break;
        case 401:
          errorMessage = 'auth.errors.invalid_credentials';
          break;
        case 404:
          errorMessage = 'auth.errors.not_found';
          break;
        case 409:
          errorMessage = 'auth.errors.email_exists';
          break;
        case 500:
          errorMessage = 'auth.errors.server_error';
          break;
        default:
          errorMessage = apiError?.message || apiError?.error || errorMessage;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
