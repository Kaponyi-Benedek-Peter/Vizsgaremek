import {
  TranslationService
} from "./chunk-NEOTYJOM.js";
import {
  HttpClient,
  Router,
  environment
} from "./chunk-YSEAUUG4.js";
import {
  BehaviorSubject,
  Injectable,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  inject,
  map,
  of,
  setClassMetadata,
  signal,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WLHV2EEC.js";

// src/app/core/services/toast.service.ts
var ToastService = class _ToastService {
  toasts = signal([], ...ngDevMode ? [{ debugName: "toasts" }] : []);
  toasts$ = this.toasts.asReadonly();
  show(message, type = "info", duration = 3e3) {
    const id = Math.random().toString(36).substring(7);
    const toast = { id, message, type, duration };
    this.toasts.update((current) => [...current, toast]);
    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }
  success(message, duration) {
    this.show(message, "success", duration);
  }
  error(message, duration) {
    this.show(message, "error", duration);
  }
  info(message, duration) {
    this.show(message, "info", duration);
  }
  warning(message, duration) {
    this.show(message, "warning", duration);
  }
  remove(id) {
    this.toasts.update((current) => current.filter((toast) => toast.id !== id));
  }
  clear() {
    this.toasts.set([]);
  }
  static \u0275fac = function ToastService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  http;
  router;
  API_URL = environment.baseURL;
  TOKEN_KEY = "auth_token";
  USER_KEY = "auth_user";
  EXPIRES_KEY = "auth_expires";
  STORAGE_TYPE_KEY = "auth_storage_type";
  SESSION_TOKEN_KEY = "auth_session_token";
  STATUS_POLL_INTERVAL = 1e5;
  toastService = inject(ToastService);
  translationService = inject(TranslationService);
  statusPollingId = null;
  authStateSignal = signal({
    isAuthenticated: false,
    user: null,
    token: null,
    sessionToken: null,
    expiresAt: null,
    role: null
  }, ...ngDevMode ? [{ debugName: "authStateSignal" }] : []);
  authState = this.authStateSignal.asReadonly();
  isAuthenticated = computed(() => this.authStateSignal().isAuthenticated, ...ngDevMode ? [{ debugName: "isAuthenticated" }] : []);
  currentUser = computed(() => this.authStateSignal().user, ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  token = computed(() => this.authStateSignal().token, ...ngDevMode ? [{ debugName: "token" }] : []);
  sessionToken = computed(() => this.authStateSignal().sessionToken, ...ngDevMode ? [{ debugName: "sessionToken" }] : []);
  language = computed(() => this.translationService.getCurrentLanguage(), ...ngDevMode ? [{ debugName: "language" }] : []);
  authStateSubject = new BehaviorSubject({
    isAuthenticated: false,
    user: null,
    token: null,
    sessionToken: null,
    expiresAt: null,
    role: null
  });
  authState$ = this.authStateSubject.asObservable();
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.initAuth();
    this.setupStorageListener();
    this.setupForceLogoutListener();
  }
  initAuth() {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    const expiresAt = this.getStoredExpiration();
    const sessionToken = this.getStoredSessionToken();
    const role = this.getStoredRole();
    if (token && user && expiresAt) {
      if (/* @__PURE__ */ new Date() < expiresAt) {
        this.updateAuthState({
          isAuthenticated: true,
          user,
          token,
          sessionToken,
          expiresAt,
          role
        });
        this.startStatusPolling();
      } else {
        this.clearStorage();
      }
    }
  }
  getUserState() {
    const id = localStorage.getItem("user_id") ?? sessionStorage.getItem("user_id") ?? "";
    const sessionToken = this.getSessionToken() ?? "";
    if (!id || id === "undefined") {
      return of({ account_state: "", statuscode: "401", status: "no_id" });
    }
    return this.http.post(`${this.API_URL}/api/get_user_state`, {
      id: btoa(id),
      session_token: btoa(sessionToken)
    });
  }
  checkUserStateGuard() {
    return this.getUserState().pipe(map((res) => {
      const state = res?.account_state ?? "";
      return this.applyFreshAccountState(state);
    }), catchError(() => of(false)));
  }
  startStatusPolling() {
    this.stopStatusPolling();
    this.statusPollingId = setInterval(() => {
      if (!this.isUserAuthenticated()) {
        this.stopStatusPolling();
        return;
      }
      this.getUserState().pipe(catchError(() => of(null))).subscribe((res) => {
        if (!res?.account_state)
          return;
        this.applyFreshAccountState(res.account_state);
      });
    }, this.STATUS_POLL_INTERVAL);
  }
  stopStatusPolling() {
    if (this.statusPollingId !== null) {
      clearInterval(this.statusPollingId);
      this.statusPollingId = null;
    }
  }
  applyFreshAccountState(state) {
    if (!state)
      return true;
    if (state === "banned" || state === "deleted") {
      this.stopStatusPolling();
      this.logout();
      const key = state === "banned" ? "auth.errors.account_banned" : "auth.errors.account_deleted";
      setTimeout(() => this.toastService.error(key), 150);
      return false;
    }
    const current = this.authStateSignal();
    if (current.role !== state) {
      const stayLoggedIn = localStorage.getItem(this.TOKEN_KEY) !== null;
      const storage = stayLoggedIn ? localStorage : sessionStorage;
      storage.setItem("auth_role", state);
      this.updateAuthState(__spreadProps(__spreadValues({}, current), { role: state }));
    }
    return true;
  }
  storeRole(role, stayLoggedIn) {
    const storage = stayLoggedIn ? localStorage : sessionStorage;
    storage.setItem("auth_role", role);
  }
  storeId(user_id, stayLoggedIn) {
    const storage = stayLoggedIn ? localStorage : sessionStorage;
    storage.setItem("user_id", user_id);
  }
  getStoredRole() {
    return localStorage.getItem("auth_role") || sessionStorage.getItem("auth_role");
  }
  setupStorageListener() {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (event) => {
        if (event.key === this.TOKEN_KEY && event.newValue === null) {
          this.updateAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            sessionToken: null,
            expiresAt: null,
            role: null
          });
          if (!this.router.url.includes("/login")) {
            this.router.navigate(["/login"], { queryParams: {} });
          }
        }
        if (event.key === this.TOKEN_KEY && event.newValue !== null) {
          this.initAuth();
        }
      });
    }
  }
  setupForceLogoutListener() {
    if (typeof window !== "undefined") {
      window.addEventListener("auth:force-logout", (event) => {
        const message = event.detail?.message;
        this.logout(message);
      });
    }
  }
  isTokenExpired() {
    const expiresAt = this.authStateSignal().expiresAt;
    if (!expiresAt)
      return true;
    const now = /* @__PURE__ */ new Date();
    const expirationTime = new Date(expiresAt);
    const fiveMinutes = 5 * 60 * 1e3;
    return now.getTime() >= expirationTime.getTime() - fiveMinutes;
  }
  // Stage 1: email + password -> email
  loginRequest(email, password, language) {
    const request = {
      email: this.encodeBase64(email),
      password: this.encodeBase64(password),
      language: this.encodeBase64(language)
    };
    return this.http.post(`${this.API_URL}/api/login_request`, request).pipe(catchError(this.handleError.bind(this)));
  }
  // Stage 2: id and confirmation_token b64 from url
  loginPromise(id, confirmationToken, stayLoggedIn) {
    const request = {
      id,
      confirmation_token: confirmationToken
    };
    return this.http.post(`${this.API_URL}/api/login_promise`, request).pipe(tap((response) => {
      this.handleLoginSuccess(response, stayLoggedIn);
    }), catchError(this.handleError.bind(this)));
  }
  // registration_request: b64 string
  register(email, password, firstname, lastname, language) {
    const request = {
      email: this.encodeBase64(email),
      password: this.encodeBase64(password),
      firstname: this.encodeBase64(firstname),
      lastname: this.encodeBase64(lastname),
      language: this.encodeBase64(language)
    };
    return this.http.post(`${this.API_URL}/api/registration_request`, request).pipe(catchError(this.handleError.bind(this)));
  }
  // id and token b64 from url
  completeRegistration(id, token, stayLoggedIn = true) {
    const request = {
      id,
      token
    };
    return this.http.post(`${this.API_URL}/api/registration_promise`, request).pipe(tap((response) => {
      this.handleLoginSuccess(response, stayLoggedIn, response.user, true);
    }), catchError(this.handleError.bind(this)));
  }
  // chpass_request: b64 string
  requestPasswordChange(email, newPassword, language) {
    const request = {
      email: this.encodeBase64(email),
      password: this.encodeBase64(newPassword),
      language: this.encodeBase64(language)
    };
    return this.http.post(`${this.API_URL}/api/chpass_request`, request).pipe(catchError(this.handleError.bind(this)));
  }
  completePasswordChange(id, token) {
    const request = {
      id,
      token
    };
    const stayLoggedIn = localStorage.getItem(this.STORAGE_TYPE_KEY) === "local";
    return this.http.post(`${this.API_URL}/api/chpass_promise`, request, {
      responseType: "text"
    }).pipe(tap((body) => {
      try {
        const response = typeof body === "string" ? JSON.parse(body) : body;
        if (response?.jwt_token) {
          this.handleLoginSuccess(response, stayLoggedIn, void 0, true);
        }
      } catch {
      }
    }), map(() => void 0), catchError(this.handleError.bind(this)));
  }
  logout(sessionExpiredMessage) {
    this.stopStatusPolling();
    this.clearStorage();
    this.updateAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      sessionToken: null,
      expiresAt: null,
      role: null
    });
    const queryParams = sessionExpiredMessage ? { message: sessionExpiredMessage } : {};
    this.router.navigate(["/login"], { replaceUrl: true, queryParams });
  }
  getToken() {
    const token = this.authStateSignal().token;
    if (token && this.isTokenExpired()) {
      this.logout();
      return null;
    }
    return token;
  }
  getSessionToken() {
    return this.authStateSignal().sessionToken;
  }
  isUserAuthenticated() {
    const isAuth = this.authStateSignal().isAuthenticated;
    const hasValidToken = this.getToken() !== null;
    return isAuth && hasValidToken;
  }
  refreshAuthState() {
    this.initAuth();
  }
  refreshUserState() {
    if (!this.isUserAuthenticated())
      return;
    this.http.get(`${this.API_URL}/api/profile`).pipe(catchError(() => [])).subscribe((freshUser) => {
      if (!freshUser || !("account_state" in freshUser))
        return;
      const current = this.authStateSignal();
      const freshRole = freshUser.account_state;
      const roleChanged = current.role !== freshRole;
      const userChanged = current.user?.account_state !== freshUser.account_state || current.user?.firstname !== freshUser.firstname || current.user?.lastname !== freshUser.lastname || current.user?.email !== freshUser.email;
      if (!roleChanged && !userChanged)
        return;
      const stayLoggedIn = localStorage.getItem(this.TOKEN_KEY) !== null;
      const storage = stayLoggedIn ? localStorage : sessionStorage;
      if (roleChanged) {
        storage.setItem("auth_role", freshRole);
      }
      storage.setItem(this.USER_KEY, JSON.stringify(freshUser));
      this.updateAuthState(__spreadProps(__spreadValues({}, current), {
        user: freshUser,
        role: freshRole
      }));
    });
  }
  hasStoredSession() {
    return this.getStoredToken() !== null;
  }
  decodeJWT(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("JWT decode error:", error);
      return null;
    }
  }
  handleLoginSuccess(response, stayLoggedIn, user, skipNavigation = false) {
    const jwtToken = response.jwt_token;
    const sessionToken = response.session_token ?? null;
    const expiresAt = response.jwt_token_expiration ? new Date(response.jwt_token_expiration) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3);
    let userData = user;
    if (!userData && jwtToken) {
      const decoded = this.decodeJWT(jwtToken);
      if (decoded) {
        userData = {
          id: decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "",
          email: decoded.email || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "",
          firstname: decoded.firstname || "",
          lastname: decoded.lastname || ""
        };
      }
    }
    const id = response.user_id ?? userData?.id ?? "";
    const role = response.user_state;
    if (userData && userData.id !== id) {
      userData = __spreadProps(__spreadValues({}, userData), { id });
    }
    this.clearStorage();
    this.storeRole(role, stayLoggedIn);
    this.storeId(id, stayLoggedIn);
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
      role
    });
    this.startStatusPolling();
    if (!skipNavigation) {
      this.router.navigate(["/home"], { queryParams: {} });
      setTimeout(() => {
        this.toastService.success("auth.success.welcome_back");
      }, 300);
    }
  }
  updateAuthState(state) {
    this.authStateSignal.set(state);
    this.authStateSubject.next(state);
  }
  storeToken(token, expiresAt, stayLoggedIn) {
    const storage = stayLoggedIn ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.EXPIRES_KEY, expiresAt.toISOString());
    storage.setItem(this.STORAGE_TYPE_KEY, stayLoggedIn ? "local" : "session");
  }
  storeSessionToken(sessionToken, stayLoggedIn) {
    if (!sessionToken)
      return;
    const storage = stayLoggedIn ? localStorage : sessionStorage;
    storage.setItem(this.SESSION_TOKEN_KEY, sessionToken);
  }
  storeUser(user, stayLoggedIn) {
    const storage = stayLoggedIn ? localStorage : sessionStorage;
    storage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  getStoredToken() {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }
  getStoredUser() {
    const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    if (!userStr)
      return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  getStoredExpiration() {
    const expiresStr = localStorage.getItem(this.EXPIRES_KEY) || sessionStorage.getItem(this.EXPIRES_KEY);
    if (!expiresStr)
      return null;
    const date = new Date(expiresStr);
    return isNaN(date.getTime()) ? null : date;
  }
  getStoredSessionToken() {
    return localStorage.getItem(this.SESSION_TOKEN_KEY) || sessionStorage.getItem(this.SESSION_TOKEN_KEY);
  }
  clearStorage() {
    [localStorage, sessionStorage].forEach((storage) => {
      storage.removeItem(this.TOKEN_KEY);
      storage.removeItem(this.USER_KEY);
      storage.removeItem(this.EXPIRES_KEY);
      storage.removeItem(this.STORAGE_TYPE_KEY);
      storage.removeItem(this.SESSION_TOKEN_KEY);
      storage.removeItem("auth_role");
      storage.removeItem("user_id");
    });
  }
  encodeBase64(value) {
    try {
      return btoa(unescape(encodeURIComponent(value)));
    } catch {
      return btoa(value);
    }
  }
  handleError(error) {
    let errorMessage = "auth.errors.unknown_error";
    if (error.error instanceof ErrorEvent) {
      errorMessage = "auth.errors.network_error";
    } else {
      const apiError = error.error;
      const backendStatus = apiError?.status;
      switch (backendStatus) {
        case "inexistent_user_or_incorrect_data":
          errorMessage = "auth.errors.invalid_credentials_or_inexistent_user";
          break;
        case "user_not_found":
          errorMessage = "auth.errors.invalid_credentials";
          break;
        case "user_already_exists":
          errorMessage = "auth.errors.email_exists";
          break;
        case "user_already_activated":
          errorMessage = "auth.errors.already_activated";
          break;
        case "wrong_token":
        case "wrong_confirmation_token":
          errorMessage = "auth.errors.invalid_token";
          break;
        case "confirmation_expired":
          errorMessage = "auth.errors.token_expired";
          break;
        case "user_banned":
          errorMessage = "auth.errors.account_banned";
          break;
        case "malformed_request":
          errorMessage = "auth.errors.bad_request";
          break;
        case "internal_error":
          errorMessage = "auth.errors.server_error";
          break;
        default:
          switch (error.status) {
            case 0:
              errorMessage = "auth.errors.network_error";
              break;
            case 400:
              errorMessage = "auth.errors.bad_request";
              break;
            case 401:
              errorMessage = "auth.errors.invalid_credentials";
              break;
            case 403:
              errorMessage = "auth.errors.invalid_credentials__or_inexistent_user";
              break;
            case 404:
              errorMessage = "auth.errors.not_found";
              break;
            case 409:
              errorMessage = "auth.errors.email_exists";
              break;
            case 500:
              errorMessage = "auth.errors.server_error";
              break;
          }
      }
      if (backendStatus === "hianyzo_auth_header" || backendStatus === "hibas_token") {
        this.logout();
      }
    }
    return throwError(() => new Error(errorMessage));
  }
  isAdmin() {
    return this.authStateSignal().role === "admin";
  }
  isVerified() {
    return this.authStateSignal().role === "verified";
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

export {
  ToastService,
  AuthService
};
//# sourceMappingURL=chunk-NOGI6VVO.js.map
