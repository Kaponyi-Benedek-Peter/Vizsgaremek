import {
  AuthService
} from "./chunk-BGHGLIZX.js";
import "./chunk-NEOTYJOM.js";
import {
  ActivatedRoute,
  Location,
  Router,
  RouterModule
} from "./chunk-GK2QC6TC.js";
import {
  Component,
  TranslateModule,
  TranslatePipe,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-WLHV2EEC.js";

// src/app/pages/login-promise/login-promise.ts
function LoginPromise_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 2);
    \u0275\u0275domElement(1, "div", 3);
    \u0275\u0275domElementStart(2, "h1");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p", 4);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "auth.login_promise.verifying"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 4, "auth.login_promise.please_wait"));
  }
}
function LoginPromise_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 2)(1, "div", 5);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(2, "svg", 6);
    \u0275\u0275domElement(3, "path", 7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "p", 4);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 2, "auth.login_promise.success_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 4, "auth.login_promise.success_message"));
  }
}
function LoginPromise_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 2)(1, "div", 8);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(2, "svg", 6);
    \u0275\u0275domElement(3, "path", 9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "p", 10);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "button", 11);
    \u0275\u0275domListener("click", function LoginPromise_Conditional_4_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToLogin());
    });
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 3, "auth.login_promise.error_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, ctx_r1.errorMessage()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 7, "auth.login_promise.back_to_login"), " ");
  }
}
var LoginPromise = class _LoginPromise {
  route;
  router;
  authService;
  location = inject(Location);
  isVerifying = signal(false, ...ngDevMode ? [{ debugName: "isVerifying" }] : []);
  isSuccess = signal(false, ...ngDevMode ? [{ debugName: "isSuccess" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  constructor(route, router, authService) {
    this.route = route;
    this.router = router;
    this.authService = authService;
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const raw = params.get("login_promise") ?? "";
      const parts = raw.split(";");
      if (parts.length !== 2) {
        this.errorMessage.set("auth.errors.invalid_login_link");
        return;
      }
      const id = parts[0].trim();
      const confirmationToken = parts[1].trim();
      if (!id || !confirmationToken) {
        this.errorMessage.set("auth.errors.invalid_login_link");
        return;
      }
      const stayLoggedIn = sessionStorage.getItem("login_stay") === "1";
      sessionStorage.removeItem("login_stay");
      this.completeLogin(id, confirmationToken, stayLoggedIn);
    });
  }
  completeLogin(id, confirmationToken, stayLoggedIn) {
    this.isVerifying.set(true);
    this.errorMessage.set("");
    this.authService.loginPromise(id, confirmationToken, stayLoggedIn).subscribe({
      next: () => {
        this.isVerifying.set(false);
        this.isSuccess.set(true);
      },
      error: (error) => {
        this.isVerifying.set(false);
        this.errorMessage.set(error.message || "auth.errors.login_failed");
      }
    });
  }
  backToLogin() {
    this.router.navigate(["/login"]);
  }
  static \u0275fac = function LoginPromise_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginPromise)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginPromise, selectors: [["app-login-promise"]], decls: 5, vars: 3, consts: [[1, "auth-container"], [1, "auth-card"], [1, "verification-content"], [1, "spinner-large"], [1, "verification-text"], [1, "icon-wrapper", "success"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M5 13l4 4L19 7"], [1, "icon-wrapper", "error"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"], [1, "verification-text", "error-text"], [1, "submit-btn", 3, "click"]], template: function LoginPromise_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275conditionalCreate(2, LoginPromise_Conditional_2_Template, 8, 6, "div", 2);
      \u0275\u0275conditionalCreate(3, LoginPromise_Conditional_3_Template, 10, 6, "div", 2);
      \u0275\u0275conditionalCreate(4, LoginPromise_Conditional_4_Template, 13, 9, "div", 2);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isVerifying() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isVerifying() && ctx.isSuccess() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isVerifying() && ctx.errorMessage() ? 4 : -1);
    }
  }, dependencies: [RouterModule, TranslateModule, TranslatePipe], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 140px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6) var(--space-4);\n  background: var(--bg-secondary);\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10) var(--space-8);\n  width: 100%;\n  max-width: 480px;\n  animation: _ngcontent-%COMP%_slideUp 0.4s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.verification-content[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.verification-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(1.25rem, 3vw, 1.6rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: var(--space-5) 0 var(--space-3);\n}\n.verification-text[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: var(--text-base, 1rem);\n  line-height: 1.6;\n  margin-bottom: var(--space-6);\n}\n.error-text[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.icon-wrapper[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  margin: 0 auto var(--space-4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-wrapper[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n}\n.icon-wrapper.success[_ngcontent-%COMP%] {\n  background: rgba(6, 122, 69, 0.12);\n  color: var(--color-success);\n}\n.icon-wrapper.error[_ngcontent-%COMP%] {\n  background: var(--color-error-light);\n  color: var(--color-error);\n}\n.spinner-large[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border: 4px solid var(--border-color);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin: 0 auto var(--space-5);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  background:\n    linear-gradient(\n      135deg,\n      #067a45 0%,\n      #048a4f 100%);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base, 1rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all var(--transition-fast, 0.15s);\n  min-height: 48px;\n  margin-top: var(--space-2);\n}\n.submit-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(6, 122, 69, 0.4);\n}\n/*# sourceMappingURL=login-promise.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPromise, [{
    type: Component,
    args: [{ selector: "app-login-promise", standalone: true, imports: [RouterModule, TranslateModule], template: `<div class="auth-container">\r
  <div class="auth-card">\r
    @if (isVerifying()) {\r
      <div class="verification-content">\r
        <div class="spinner-large"></div>\r
        <h1>{{ 'auth.login_promise.verifying' | translate }}</h1>\r
        <p class="verification-text">{{ 'auth.login_promise.please_wait' | translate }}</p>\r
      </div>\r
    }\r
\r
    @if (!isVerifying() && isSuccess()) {\r
      <div class="verification-content">\r
        <div class="icon-wrapper success">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />\r
          </svg>\r
        </div>\r
        <h1>{{ 'auth.login_promise.success_title' | translate }}</h1>\r
        <p class="verification-text">{{ 'auth.login_promise.success_message' | translate }}</p>\r
      </div>\r
    }\r
\r
    @if (!isVerifying() && errorMessage()) {\r
      <div class="verification-content">\r
        <div class="icon-wrapper error">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />\r
          </svg>\r
        </div>\r
        <h1>{{ 'auth.login_promise.error_title' | translate }}</h1>\r
        <p class="verification-text error-text">{{ errorMessage() | translate }}</p>\r
        <button class="submit-btn" (click)="backToLogin()">\r
          {{ 'auth.login_promise.back_to_login' | translate }}\r
        </button>\r
      </div>\r
    }\r
  </div>\r
</div>\r
`, styles: ["/* src/app/pages/login-promise/login-promise.css */\n.auth-container {\n  min-height: calc(100vh - 140px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6) var(--space-4);\n  background: var(--bg-secondary);\n}\n.auth-card {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10) var(--space-8);\n  width: 100%;\n  max-width: 480px;\n  animation: slideUp 0.4s ease-out;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.verification-content {\n  text-align: center;\n}\n.verification-content h1 {\n  font-size: clamp(1.25rem, 3vw, 1.6rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: var(--space-5) 0 var(--space-3);\n}\n.verification-text {\n  color: var(--text-secondary);\n  font-size: var(--text-base, 1rem);\n  line-height: 1.6;\n  margin-bottom: var(--space-6);\n}\n.error-text {\n  color: var(--color-error);\n}\n.icon-wrapper {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  margin: 0 auto var(--space-4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-wrapper svg {\n  width: 40px;\n  height: 40px;\n}\n.icon-wrapper.success {\n  background: rgba(6, 122, 69, 0.12);\n  color: var(--color-success);\n}\n.icon-wrapper.error {\n  background: var(--color-error-light);\n  color: var(--color-error);\n}\n.spinner-large {\n  width: 56px;\n  height: 56px;\n  border: 4px solid var(--border-color);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin: 0 auto var(--space-5);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.submit-btn {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  background:\n    linear-gradient(\n      135deg,\n      #067a45 0%,\n      #048a4f 100%);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base, 1rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all var(--transition-fast, 0.15s);\n  min-height: 48px;\n  margin-top: var(--space-2);\n}\n.submit-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(6, 122, 69, 0.4);\n}\n/*# sourceMappingURL=login-promise.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginPromise, { className: "LoginPromise", filePath: "src/app/pages/login-promise/login-promise.ts", lineNumber: 14 });
})();
export {
  LoginPromise
};
//# sourceMappingURL=chunk-4OGPNWGS.js.map
