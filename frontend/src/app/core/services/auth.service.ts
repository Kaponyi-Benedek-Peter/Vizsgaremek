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
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.baseURL;

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
    this.setupStorageListener();
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

  private setupStorageListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key === this.TOKEN_KEY && event.newValue === null) {
          this.updateAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            expiresAt: null,
          });

          if (!this.router.url.includes('/login')) {
            this.router.navigate(['/login']);
          }
        }

        if (event.key === this.TOKEN_KEY && event.newValue !== null) {
          this.initAuth();
        }
      });
    }
  }

  isTokenExpired(): boolean {
    const expiresAt = this.authStateSignal().expiresAt;
    if (!expiresAt) return true;

    const now = new Date();
    const expirationTime = new Date(expiresAt);
    const fiveMinutes = 5 * 60 * 1000;

    return now.getTime() >= expirationTime.getTime() - fiveMinutes;
  }

  login(email: string, password: string, stayLoggedIn: boolean): Observable<LoginResponse> {
    const request: LoginRequest = {
      email: this.encodeBase64(email),
      password: this.encodeBase64(password),
    };

    return this.http.post<LoginResponse>(`${this.API_URL}/api/login`, request).pipe(
      tap((response) => {
        this.handleLoginSuccess(response, stayLoggedIn);
      }),
      catchError(this.handleError.bind(this)),
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
      .post<void>(`${this.API_URL}/api/registration_request`, request)
      .pipe(catchError(this.handleError.bind(this)));
  }

  completeRegistration(
    id: string,
    token: string,
    stayLoggedIn: boolean = true,
  ): Observable<RegistrationResponse> {
    const request: RegistrationPromiseRequest = {
      id: id,
      token: token,
    };

    return this.http
      .post<RegistrationResponse>(`${this.API_URL}/api/registration_promise`, request)
      .pipe(
        tap((response) => {
          const loginResponse: LoginResponse = {
            token: response.token,
            expires_in: 604800, // 7 days
          };
          this.handleLoginSuccess(loginResponse, stayLoggedIn, response.user);
        }),
        catchError(this.handleError.bind(this)),
      );
  }

  requestPasswordChange(id: string, email: string, password: string): Observable<void> {
    const request: PasswordChangeRequest = {
      id: this.encodeBase64(id),
      password: this.encodeBase64(password),
    };

    return this.http
      .post<void>(`${this.API_URL}/api/chpass_request`, request)
      .pipe(catchError(this.handleError.bind(this)));
  }

  completePasswordChange(id: string, token: string): Observable<void> {
    const request: PasswordChangePromiseRequest = {
      id: id,
      token: token,
    };

    return this.http
      .post<void>(`${this.API_URL}/api/chpass_promise`, request)
      .pipe(catchError(this.handleError.bind(this)));
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
    const token = this.authStateSignal().token;

    if (token && this.isTokenExpired()) {
      this.logout();
      return null;
    }

    return token;
  }

  isUserAuthenticated(): boolean {
    const isAuth = this.authStateSignal().isAuthenticated;
    const hasValidToken = this.getToken() !== null;
    return isAuth && hasValidToken;
  }

  refreshAuthState(): void {
    this.initAuth();
  }

  hasStoredSession(): boolean {
    return this.getStoredToken() !== null;
  }

  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  private handleLoginSuccess(response: LoginResponse, stayLoggedIn: boolean, user?: User): void {
    const expiresAt = new Date(Date.now() + response.expires_in * 1000);

    let userData = user;
    if (!userData && response.token) {
      const decoded = this.decodeJWT(response.token);
      if (decoded) {
        userData = {
          id: decoded.sub || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          email:
            decoded.email ||
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
          firstname: '',
          lastname: '',
        };
      }
    }

    this.clearStorage();

    this.storeToken(response.token, expiresAt, stayLoggedIn);
    if (userData) {
      this.storeUser(userData, stayLoggedIn);
    }

    this.updateAuthState({
      isAuthenticated: true,
      user: userData || this.getStoredUser(),
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
          if (apiError?.error === 'hianyzo_auth_header') {
            errorMessage = 'auth.errors.missing_auth_header';
          } else if (apiError?.error === 'hibas_token') {
            errorMessage = 'auth.errors.invalid_token';
            this.logout();
          } else {
            errorMessage = 'auth.errors.invalid_credentials';
          }
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
