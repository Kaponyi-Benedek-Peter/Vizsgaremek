import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  User,
  LoginRequest,
  LoginRequestResponse,
  LoginPromiseRequest,
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
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.baseURL;

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly EXPIRES_KEY = 'auth_expires';
  private readonly STORAGE_TYPE_KEY = 'auth_storage_type';
  private readonly SESSION_TOKEN_KEY = 'auth_session_token';

  private toastService = inject(ToastService);

  private authStateSignal = signal<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    sessionToken: null,
    expiresAt: null,
  });

  public authState = this.authStateSignal.asReadonly();
  public isAuthenticated = computed(() => this.authStateSignal().isAuthenticated);
  public currentUser = computed(() => this.authStateSignal().user);
  public token = computed(() => this.authStateSignal().token);
  public sessionToken = computed(() => this.authStateSignal().sessionToken);

  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    sessionToken: null,
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
    const sessionToken = this.getStoredSessionToken();

    if (token && user && expiresAt) {
      if (new Date() < expiresAt) {
        this.updateAuthState({
          isAuthenticated: true,
          user,
          token,
          sessionToken,
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
            sessionToken: null,
            expiresAt: null,
          });

          if (!this.router.url.includes('/login')) {
            this.router.navigate(['/login'], { queryParams: {} });
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

  // Stage 1: email + password -> email
  loginRequest(email: string, password: string) {
    const request: LoginRequest = {
      email: this.encodeBase64(email),
      password: this.encodeBase64(password),
    };

    return this.http
      .post<LoginRequestResponse>(`${this.API_URL}/api/login_request`, request)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Stage 2: id and confirmation_token b64 from url
  loginPromise(
    id: string,
    confirmationToken: string,
    stayLoggedIn: boolean,
  ): Observable<LoginResponse> {
    const request: LoginPromiseRequest = {
      id,
      confirmation_token: confirmationToken,
    };

    return this.http.post<LoginResponse>(`${this.API_URL}/api/login_promise`, request).pipe(
      tap((response) => {
        this.handleLoginSuccess(response, stayLoggedIn);
      }),
      catchError(this.handleError.bind(this)),
    );
  }

  // registration_request: b64 string
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

  // id and token b64 from url
  completeRegistration(
    id: string,
    token: string,
    stayLoggedIn: boolean = true,
  ): Observable<RegistrationResponse> {
    const request: RegistrationPromiseRequest = {
      id,
      token,
    };

    return this.http
      .post<RegistrationResponse>(`${this.API_URL}/api/registration_promise`, request)
      .pipe(
        tap((response) => {
          this.handleLoginSuccess(
            response as unknown as LoginResponse,
            stayLoggedIn,
            response.user,
            true, // skipNavigation
          );
        }),
        catchError(this.handleError.bind(this)),
      );
  }

  // chpass_request: b64 string
  requestPasswordChange(email: string, newPassword: string) {
    const request: PasswordChangeRequest = {
      email: this.encodeBase64(email),
      password: this.encodeBase64(newPassword),
    };

    return this.http
      .post<void>(`${this.API_URL}/api/chpass_request`, request)
      .pipe(catchError(this.handleError.bind(this)));
  }

  completePasswordChange(id: string, token: string) {
    const request: PasswordChangePromiseRequest = {
      id, // b64 from url
      token, // b64 from url
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
      sessionToken: null,
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

  getSessionToken(): string | null {
    return this.authStateSignal().sessionToken;
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
      console.error('JWT decode error:', error);
      return null;
    }
  }

  private handleLoginSuccess(
    response: LoginResponse,
    stayLoggedIn: boolean,
    user?: User,
    skipNavigation = false,
  ): void {
    const jwtToken = response.jwt_token;
    const sessionToken = response.session_token ?? null;
    const expiresAt = response.jwt_token_expiration
      ? new Date(response.jwt_token_expiration)
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // fallback: 7 days

    let userData = user;
    if (!userData && jwtToken) {
      const decoded = this.decodeJWT(jwtToken);
      if (decoded) {
        userData = {
          id: decoded.sub || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          email:
            decoded.email ||
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
          firstname: decoded.firstname || '',
          lastname: decoded.lastname || '',
        };
      }
    }

    this.clearStorage();
    this.storeToken(jwtToken, expiresAt, stayLoggedIn);
    this.storeSessionToken(sessionToken, stayLoggedIn);
    if (userData) {
      this.storeUser(userData, stayLoggedIn);
    }

    this.updateAuthState({
      isAuthenticated: true,
      user: userData || this.getStoredUser(),
      token: jwtToken,
      sessionToken,
      expiresAt,
    });

    if (!skipNavigation) {
      this.router.navigate(['/home'], { queryParams: {} });
      setTimeout(() => {
        this.toastService.success('auth.success.welcome_back');
      }, 300);
    }
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

  private storeSessionToken(sessionToken: string | null, stayLoggedIn: boolean): void {
    if (!sessionToken) return;
    const storage = stayLoggedIn ? localStorage : sessionStorage;
    storage.setItem(this.SESSION_TOKEN_KEY, sessionToken);
  }

  private storeUser(user: User, stayLoggedIn: boolean): void {
    const storage = stayLoggedIn ? localStorage : sessionStorage;
    storage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredSessionToken(): string | null {
    return (
      localStorage.getItem(this.SESSION_TOKEN_KEY) || sessionStorage.getItem(this.SESSION_TOKEN_KEY)
    );
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
      storage.removeItem(this.SESSION_TOKEN_KEY);
    });
  }

  encodeBase64(value: string): string {
    try {
      return btoa(unescape(encodeURIComponent(value)));
    } catch {
      return btoa(value);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'auth.errors.unknown_error';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'auth.errors.network_error';
    } else {
      const apiError = error.error as ApiErrorResponse;
      const backendStatus = apiError?.status; // backend "status" field , pl. "wrong_password"

      // backend status code
      switch (backendStatus) {
        case 'inexistent_user_or_incorrect_data':
          errorMessage = 'auth.errors.invalid_credentials_or_inexistent_user';
          break;
        case 'user_not_found':
          errorMessage = 'auth.errors.invalid_credentials';
          break;
        case 'user_already_exists':
          errorMessage = 'auth.errors.email_exists';
          break;
        case 'user_already_activated':
          errorMessage = 'auth.errors.already_activated';
          break;
        case 'wrong_token':
        case 'wrong_confirmation_token':
          errorMessage = 'auth.errors.invalid_token';
          break;
        case 'confirmation_expired':
          errorMessage = 'auth.errors.token_expired';
          break;
        case 'user_banned':
          errorMessage = 'auth.errors.account_banned';
          break;
        case 'malformed_request':
          errorMessage = 'auth.errors.bad_request';
          break;
        case 'internal_error':
          errorMessage = 'auth.errors.server_error';
          break;
        default:
          // Fallback: HTTP status
          switch (error.status) {
            case 0:
              errorMessage = 'auth.errors.network_error';
              break;
            case 400:
              errorMessage = 'auth.errors.bad_request';
              break;
            case 401:
              errorMessage = 'auth.errors.invalid_credentials';
              break;
            case 403:
              errorMessage = 'auth.errors.invalid_credentials__or_inexistent_user';
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
          }
      }

      // wrong jwt = logout
      if (backendStatus === 'hianyzo_auth_header' || backendStatus === 'hibas_token') {
        this.logout();
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
