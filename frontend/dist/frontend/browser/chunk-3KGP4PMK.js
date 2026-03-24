import {
  AuthService
} from "./chunk-ZSAXXJLT.js";
import {
  HttpClient,
  environment
} from "./chunk-JGUC3CXT.js";
import {
  Injectable,
  __spreadProps,
  __spreadValues,
  catchError,
  inject,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-WLHV2EEC.js";

// src/app/core/services/account.service.ts
var AccountService = class _AccountService {
  API_URL = environment.baseURL;
  http = inject(HttpClient);
  authService = inject(AuthService);
  getProfile() {
    return this.http.get(`${this.API_URL}/api/getUser`).pipe(catchError(this.handleError));
  }
  updateProfile(updates) {
    const encodedUpdates = {};
    if (updates.firstname)
      encodedUpdates.firstname = this.encodeBase64(updates.firstname);
    if (updates.lastname)
      encodedUpdates.lastname = this.encodeBase64(updates.lastname);
    if (updates.email)
      encodedUpdates.email = this.encodeBase64(updates.email);
    return this.http.put(`${this.API_URL}/api/update_name_by_id`, encodedUpdates).pipe(catchError(this.handleError));
  }
  deleteAccountRequest(userId, password) {
    const request = {
      id: this.encodeBase64(userId),
      password: this.encodeBase64(password)
    };
    return this.http.post(`${this.API_URL}/api/delacc_request`, request).pipe(catchError(this.handleError));
  }
  // encodedId and encodedToken comes from url, already b64
  confirmAccountDeletion(encodedId, encodedToken) {
    const request = {
      id: encodedId,
      token: encodedToken
    };
    return this.http.post(`${this.API_URL}/api/delacc_promise`, request).pipe(tap(() => this.authService.logout()), catchError(this.handleError));
  }
  changePassword(userId, currentPassword, newPassword) {
    const request = {
      id: this.encodeBase64(userId),
      currentPassword: this.encodeBase64(currentPassword),
      newPassword: this.encodeBase64(newPassword)
    };
    return this.http.post(`${this.API_URL}/api/change-password`, request).pipe(catchError(this.handleError));
  }
  createOrder(order) {
    return this.http.post(`${this.API_URL}/api/create_order`, order).pipe(catchError(this.handleError));
  }
  updateUserStateAdmin(userId, newState) {
    const auth = this.buildAdminAuthBody();
    const body = __spreadProps(__spreadValues({}, auth), {
      user_id: this.encodeBase64(userId),
      new_account_state: this.encodeBase64(newState)
    });
    return this.http.post(`${this.API_URL}/api/update_user_state_admin`, body).pipe(catchError(this.handleError));
  }
  banUserAdmin(userId, reason = "") {
    const auth = this.buildAdminAuthBody();
    const body = __spreadProps(__spreadValues({}, auth), {
      user_id: this.encodeBase64(userId),
      ban_reason: this.encodeBase64(reason)
    });
    return this.http.post(`${this.API_URL}/api/ban_user_admin`, body).pipe(catchError(this.handleError));
  }
  deleteUserAdmin(userId) {
    const auth = this.buildAdminAuthBody();
    const body = __spreadProps(__spreadValues({}, auth), {
      user_id: this.encodeBase64(userId)
    });
    return this.http.post(`${this.API_URL}/api/delete_user_admin`, body).pipe(catchError(this.handleError));
  }
  getOrderHistory() {
    return this.http.get(`${this.API_URL}/api/orders`).pipe(catchError(this.handleError));
  }
  getSavedAddresses() {
    return this.http.get(`${this.API_URL}/api/addresses`).pipe(catchError(this.handleError));
  }
  getAllUsersAdmin() {
    const body = this.buildAdminAuthBody();
    return this.http.post(`${this.API_URL}/api/get_all_users_admin`, body).pipe(catchError(this.handleError));
  }
  getAllOrdersAdmin() {
    const body = this.buildAdminAuthBody();
    return this.http.post(`${this.API_URL}/api/get_all_orders_admin`, body).pipe(catchError(this.handleError));
  }
  buildAdminAuthBody() {
    const storedId = sessionStorage.getItem("user_id") ?? "";
    const sessionToken = this.authService.getSessionToken();
    const jwtToken = this.authService.getToken();
    const tokenToSend = sessionToken ?? jwtToken ?? "";
    return {
      id: this.encodeBase64(storedId),
      session_token: this.encodeBase64(tokenToSend)
    };
  }
  encodeBase64(value) {
    try {
      return btoa(unescape(encodeURIComponent(value)));
    } catch {
      return btoa(value);
    }
  }
  handleError(error) {
    let errorMessage = "An unknown error occurred";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = "account.errors.bad_request";
          break;
        case 401:
          errorMessage = "account.errors.unauthorized";
          break;
        case 403:
          errorMessage = "account.errors.forbidden";
          break;
        case 404:
          errorMessage = "account.errors.not_found";
          break;
        case 500:
          errorMessage = "account.errors.server_error";
          break;
        default:
          errorMessage = error.error?.message || error.message || errorMessage;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
  static \u0275fac = function AccountService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AccountService, factory: _AccountService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AccountService
};
//# sourceMappingURL=chunk-3KGP4PMK.js.map
