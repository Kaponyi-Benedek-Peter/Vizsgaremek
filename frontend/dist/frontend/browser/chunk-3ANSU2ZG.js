import {
  AccountService
} from "./chunk-3KGP4PMK.js";
import {
  AuthService
} from "./chunk-ZSAXXJLT.js";
import "./chunk-NEOTYJOM.js";
import {
  ActivatedRoute,
  Location,
  Router,
  RouterModule
} from "./chunk-JGUC3CXT.js";
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

// src/app/pages/delacc-promise/delacc-promise.ts
function DelaccPromise_Conditional_2_Template(rf, ctx) {
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
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "profile.delacc.processing"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 4, "profile.delacc.please_wait"));
  }
}
function DelaccPromise_Conditional_3_Template(rf, ctx) {
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
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "p", 8);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 3, "profile.delacc.success_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, "profile.delacc.success_message"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 7, "profile.delacc.redirecting"));
  }
}
function DelaccPromise_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 2)(1, "div", 9);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(2, "svg", 6);
    \u0275\u0275domElement(3, "path", 10);
    \u0275\u0275domElementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "p", 11);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "button", 12);
    \u0275\u0275domListener("click", function DelaccPromise_Conditional_4_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goHome());
    });
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 3, "profile.delacc.error_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, ctx_r1.errorMessage()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 7, "common.go_home"), " ");
  }
}
var DelaccPromise = class _DelaccPromise {
  route;
  router;
  location = inject(Location);
  accountService = inject(AccountService);
  authService = inject(AuthService);
  isProcessing = signal(false, ...ngDevMode ? [{ debugName: "isProcessing" }] : []);
  isSuccess = signal(false, ...ngDevMode ? [{ debugName: "isSuccess" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  constructor(route, router) {
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const accdel = params["accdel"];
      if (!accdel) {
        this.errorMessage.set("auth.errors.invalid_link");
        return;
      }
      const parts = accdel.split(";");
      if (parts.length !== 2) {
        this.errorMessage.set("auth.errors.invalid_link");
        return;
      }
      const encodedId = parts[0].trim();
      const encodedToken = parts[1].trim();
      if (!encodedId || !encodedToken) {
        this.errorMessage.set("auth.errors.invalid_link");
        return;
      }
      const cleanUrl = `/delacc-promise?accdel=${encodedId};${encodedToken}`;
      this.location.replaceState(cleanUrl);
      this.confirmDeletion(encodedId, encodedToken);
    });
  }
  confirmDeletion(encodedId, encodedToken) {
    this.isProcessing.set(true);
    this.errorMessage.set("");
    this.accountService.confirmAccountDeletion(encodedId, encodedToken).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.isSuccess.set(true);
        setTimeout(() => {
          this.router.navigate(["/home"]);
        }, 3e3);
      },
      error: (error) => {
        this.isProcessing.set(false);
        this.errorMessage.set(error.message || "profile.errors.delete_failed");
      }
    });
  }
  goHome() {
    this.router.navigate(["/home"]);
  }
  static \u0275fac = function DelaccPromise_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DelaccPromise)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DelaccPromise, selectors: [["app-delacc-promise"]], decls: 5, vars: 3, consts: [[1, "auth-container"], [1, "auth-card"], [1, "verification-content"], [1, "spinner-large"], [1, "verification-text"], [1, "icon-wrapper", "success"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M5 13l4 4L19 7"], [1, "redirect-notice"], [1, "icon-wrapper", "error"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"], [1, "verification-text", "error-text"], [1, "submit-btn", 3, "click"]], template: function DelaccPromise_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275conditionalCreate(2, DelaccPromise_Conditional_2_Template, 8, 6, "div", 2);
      \u0275\u0275conditionalCreate(3, DelaccPromise_Conditional_3_Template, 13, 9, "div", 2);
      \u0275\u0275conditionalCreate(4, DelaccPromise_Conditional_4_Template, 13, 9, "div", 2);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isProcessing() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isProcessing() && ctx.isSuccess() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isProcessing() && ctx.errorMessage() ? 4 : -1);
    }
  }, dependencies: [RouterModule, TranslateModule, TranslatePipe], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 140px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6) var(--space-4);\n  background: var(--bg-secondary);\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10) var(--space-8);\n  width: 100%;\n  max-width: 480px;\n  animation: _ngcontent-%COMP%_slideUp 0.4s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.verification-content[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.verification-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(1.25rem, 3vw, 1.6rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: var(--space-5) 0 var(--space-3);\n}\n.verification-text[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: var(--text-base, 1rem);\n  line-height: 1.6;\n  margin-bottom: var(--space-4);\n}\n.error-text[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.redirect-notice[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--text-secondary);\n  opacity: 0.7;\n}\n.icon-wrapper[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  margin: 0 auto var(--space-4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-wrapper[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n}\n.icon-wrapper.success[_ngcontent-%COMP%] {\n  background: rgba(6, 122, 69, 0.12);\n  color: var(--color-success);\n}\n.icon-wrapper.error[_ngcontent-%COMP%] {\n  background: var(--color-error-light);\n  color: var(--color-error);\n}\n.spinner-large[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border: 4px solid var(--border-color);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin: 0 auto var(--space-5);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  background:\n    linear-gradient(\n      135deg,\n      #067a45 0%,\n      #048a4f 100%);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base, 1rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all var(--transition-fast, 0.15s);\n  min-height: 48px;\n  margin-top: var(--space-2);\n}\n.submit-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(6, 122, 69, 0.4);\n}\n/*# sourceMappingURL=delacc-promise.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DelaccPromise, [{
    type: Component,
    args: [{ selector: "app-delacc-promise", standalone: true, imports: [RouterModule, TranslateModule], template: `<div class="auth-container">\r
  <div class="auth-card">\r
    @if (isProcessing()) {\r
      <div class="verification-content">\r
        <div class="spinner-large"></div>\r
        <h1>{{ 'profile.delacc.processing' | translate }}</h1>\r
        <p class="verification-text">{{ 'profile.delacc.please_wait' | translate }}</p>\r
      </div>\r
    }\r
\r
    @if (!isProcessing() && isSuccess()) {\r
      <div class="verification-content">\r
        <div class="icon-wrapper success">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />\r
          </svg>\r
        </div>\r
        <h1>{{ 'profile.delacc.success_title' | translate }}</h1>\r
        <p class="verification-text">{{ 'profile.delacc.success_message' | translate }}</p>\r
        <p class="redirect-notice">{{ 'profile.delacc.redirecting' | translate }}</p>\r
      </div>\r
    }\r
\r
    @if (!isProcessing() && errorMessage()) {\r
      <div class="verification-content">\r
        <div class="icon-wrapper error">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />\r
          </svg>\r
        </div>\r
        <h1>{{ 'profile.delacc.error_title' | translate }}</h1>\r
        <p class="verification-text error-text">{{ errorMessage() | translate }}</p>\r
        <button class="submit-btn" (click)="goHome()">\r
          {{ 'common.go_home' | translate }}\r
        </button>\r
      </div>\r
    }\r
  </div>\r
</div>\r
`, styles: ["/* src/app/pages/delacc-promise/delacc-promise.css */\n.auth-container {\n  min-height: calc(100vh - 140px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6) var(--space-4);\n  background: var(--bg-secondary);\n}\n.auth-card {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10) var(--space-8);\n  width: 100%;\n  max-width: 480px;\n  animation: slideUp 0.4s ease-out;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.verification-content {\n  text-align: center;\n}\n.verification-content h1 {\n  font-size: clamp(1.25rem, 3vw, 1.6rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: var(--space-5) 0 var(--space-3);\n}\n.verification-text {\n  color: var(--text-secondary);\n  font-size: var(--text-base, 1rem);\n  line-height: 1.6;\n  margin-bottom: var(--space-4);\n}\n.error-text {\n  color: var(--color-error);\n}\n.redirect-notice {\n  font-size: 0.85rem;\n  color: var(--text-secondary);\n  opacity: 0.7;\n}\n.icon-wrapper {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  margin: 0 auto var(--space-4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-wrapper svg {\n  width: 40px;\n  height: 40px;\n}\n.icon-wrapper.success {\n  background: rgba(6, 122, 69, 0.12);\n  color: var(--color-success);\n}\n.icon-wrapper.error {\n  background: var(--color-error-light);\n  color: var(--color-error);\n}\n.spinner-large {\n  width: 56px;\n  height: 56px;\n  border: 4px solid var(--border-color);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin: 0 auto var(--space-5);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.submit-btn {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  background:\n    linear-gradient(\n      135deg,\n      #067a45 0%,\n      #048a4f 100%);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base, 1rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all var(--transition-fast, 0.15s);\n  min-height: 48px;\n  margin-top: var(--space-2);\n}\n.submit-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(6, 122, 69, 0.4);\n}\n/*# sourceMappingURL=delacc-promise.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DelaccPromise, { className: "DelaccPromise", filePath: "src/app/pages/delacc-promise/delacc-promise.ts", lineNumber: 15 });
})();
export {
  DelaccPromise
};
//# sourceMappingURL=chunk-3ANSU2ZG.js.map
