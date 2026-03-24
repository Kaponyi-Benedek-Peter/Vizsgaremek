import {
  AuthService
} from "./chunk-ZSAXXJLT.js";
import "./chunk-NEOTYJOM.js";
import {
  ActivatedRoute,
  Location,
  Router,
  RouterLink,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
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

// src/app/pages/registration-promise/registration-promise.ts
function RegistrationPromise_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 4);
    \u0275\u0275element(3, "path", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 6);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 7)(11, "div", 8)(12, "span", 9);
    \u0275\u0275text(13, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 8)(18, "span", 9);
    \u0275\u0275text(19, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 8)(24, "span", 9);
    \u0275\u0275text(25, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p");
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 10)(30, "p");
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 11);
    \u0275\u0275listener("click", function RegistrationPromise_Conditional_2_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resendEmail());
    });
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "a", 12);
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 8, "auth.email.check_inbox"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 10, "auth.email.sent_message"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 12, "auth.email.step_1"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 14, "auth.email.step_2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 16, "auth.email.step_3"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(32, 18, "auth.email.no_email"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(35, 20, "auth.email.resend"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(38, 22, "auth.email.back_to_login"), " ");
  }
}
function RegistrationPromise_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3);
    \u0275\u0275element(2, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 6);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 2, "auth.email.verifying"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 4, "auth.email.verifying_message"));
  }
}
function RegistrationPromise_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 14);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 15);
    \u0275\u0275element(3, "path", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 6);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 17)(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 3, "auth.email.verified"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, "auth.email.verified_message"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 7, "auth.email.redirecting"));
  }
}
function RegistrationPromise_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 19);
    \u0275\u0275element(3, "circle", 20)(4, "path", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h1");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 22);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 23)(12, "button", 24);
    \u0275\u0275listener("click", function RegistrationPromise_Conditional_5_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resendEmail());
    });
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "a", 25);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 4, "auth.email.verification_failed"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 6, ctx_r1.errorMessage()));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 8, "auth.email.try_again"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 10, "auth.email.back_to_register"), " ");
  }
}
var RegistrationPromise = class _RegistrationPromise {
  route;
  router;
  authService;
  location = inject(Location);
  isVerifying = signal(false, ...ngDevMode ? [{ debugName: "isVerifying" }] : []);
  isVerified = signal(false, ...ngDevMode ? [{ debugName: "isVerified" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  userId = signal("", ...ngDevMode ? [{ debugName: "userId" }] : []);
  token = signal("", ...ngDevMode ? [{ debugName: "token" }] : []);
  constructor(route, router, authService) {
    this.route = route;
    this.router = router;
    this.authService = authService;
  }
  ngOnInit() {
    const raw = new URLSearchParams(window.location.search).get("activate") || "";
    const parts = raw.split(";");
    if (!raw) {
      this.errorMessage.set("auth.errors.invalid_verification_link");
      return;
    }
    if (parts.length !== 2) {
      this.errorMessage.set("auth.errors.invalid_verification_link");
      return;
    }
    const id = parts[0].trim();
    const token = parts[1].trim();
    if (!id || !token) {
      this.errorMessage.set("auth.errors.invalid_verification_link");
      return;
    }
    const cleanUrl = `/registration-promise?activate=${id};${token}`;
    this.location.replaceState(cleanUrl);
    this.userId.set(id);
    this.token.set(token);
    this.verifyEmail();
  }
  verifyEmail() {
    this.isVerifying.set(true);
    this.errorMessage.set("");
    const id = this.userId();
    const token = this.token();
    if (!id || !token) {
      this.errorMessage.set("auth.errors.invalid_verification_link");
      this.isVerifying.set(false);
      return;
    }
    this.authService.completeRegistration(id, token, true).subscribe({
      next: () => {
        this.isVerifying.set(false);
        this.isVerified.set(true);
        setTimeout(() => {
          this.router.navigate(["/home"]);
        }, 2500);
      },
      error: (error) => {
        this.isVerifying.set(false);
        this.errorMessage.set(error.message || "auth.errors.verification_failed");
      }
    });
  }
  resendEmail() {
    this.router.navigate(["/register"]);
  }
  static \u0275fac = function RegistrationPromise_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegistrationPromise)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegistrationPromise, selectors: [["app-registration-promise"]], decls: 6, vars: 4, consts: [[1, "auth-container"], [1, "auth-card", "verification-card"], [1, "verification-content"], [1, "icon-wrapper"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "mail-icon"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"], [1, "verification-text"], [1, "verification-steps"], [1, "step"], [1, "step-number"], [1, "verification-help"], [1, "link-btn", 3, "click"], ["routerLink", "/login", 1, "back-link"], [1, "spinner-large"], [1, "icon-wrapper", "success"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "check-icon"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "3", "d", "M5 13l4 4L19 7"], [1, "redirect-info"], [1, "icon-wrapper", "error"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "error-icon"], ["cx", "12", "cy", "12", "r", "10", "stroke-width", "2"], ["stroke-linecap", "round", "stroke-width", "2", "d", "M12 8v4M12 16h.01"], [1, "error-message"], [1, "error-actions"], [1, "submit-btn", 3, "click"], ["routerLink", "/register", 1, "link"]], template: function RegistrationPromise_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275conditionalCreate(2, RegistrationPromise_Conditional_2_Template, 39, 24, "div", 2);
      \u0275\u0275conditionalCreate(3, RegistrationPromise_Conditional_3_Template, 9, 6, "div", 2);
      \u0275\u0275conditionalCreate(4, RegistrationPromise_Conditional_4_Template, 14, 9, "div", 2);
      \u0275\u0275conditionalCreate(5, RegistrationPromise_Conditional_5_Template, 18, 12, "div", 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.token() && !ctx.isVerifying() && !ctx.isVerified() && !ctx.errorMessage() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isVerifying() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isVerified() && !ctx.errorMessage() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 5 : -1);
    }
  }, dependencies: [RouterModule, RouterLink, TranslateModule, TranslatePipe], styles: ['\n\n.auth-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 55px - 200px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-8) var(--space-4);\n  background-color: var(--bg-secondary);\n}\n.auth-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-primary);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10);\n  width: 100%;\n  max-width: 440px;\n  transition: all var(--transition-normal);\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: var(--space-8);\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: var(--text-3xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin-bottom: var(--space-2);\n}\n.auth-subtitle[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--text-primary);\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  font-size: 1rem;\n  font-family: var(--font-primary);\n  color: var(--input-text);\n  background-color: var(--input-bg);\n  border: 2px solid var(--input-border);\n  border-radius: var(--radius-md);\n  transition: all var(--transition-fast);\n  outline: none;\n  min-height: 48px;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-border-focus);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.form-input[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--input-placeholder);\n}\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  padding-right: var(--space-12);\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  width: 44px;\n  height: 44px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: var(--text-xl);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n  transition: color var(--transition-fast);\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n}\n@media (hover: hover) and (pointer: fine) {\n  .password-toggle[_ngcontent-%COMP%]:hover {\n    color: var(--text-primary);\n  }\n}\n.password-toggle[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.checkbox-group[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--space-2);\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  font-size: var(--text-sm);\n  color: var(--text-primary);\n  -webkit-user-select: none;\n  user-select: none;\n  min-height: 44px;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  accent-color: var(--color-primary);\n  flex-shrink: 0;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.error-message[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4);\n  background-color: var(--color-error-light);\n  color: var(--color-error);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-error);\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  font-family: var(--font-primary);\n  color: var(--btn-primary-text);\n  background-color: var(--btn-primary-bg);\n  border: none;\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  transition: all var(--transition-normal);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 48px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background-color: var(--btn-primary-hover);\n    transform: translateY(-1px);\n    box-shadow: var(--shadow-md);\n  }\n}\n.submit-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  flex-shrink: 0;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: var(--space-2);\n}\n.link[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n  padding: var(--space-2) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link[_ngcontent-%COMP%]:hover {\n    color: var(--color-primary);\n    text-decoration: underline;\n  }\n}\n.auth-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: var(--space-6) 0 var(--space-4);\n  color: var(--text-secondary);\n  font-size: var(--text-sm);\n}\n.auth-divider[_ngcontent-%COMP%]::before, \n.auth-divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid var(--border-color);\n}\n.auth-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 var(--space-3);\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: var(--space-2);\n}\n.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.link-primary[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: var(--font-semibold);\n  transition: color var(--transition-fast);\n  padding: var(--space-1) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link-primary[_ngcontent-%COMP%]:hover {\n    color: var(--color-primary-hover);\n    text-decoration: underline;\n  }\n}\n.verification-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--space-4);\n  padding: var(--space-4) 0;\n}\n.icon-wrapper[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background-color: var(--color-success-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.icon-wrapper.success[_ngcontent-%COMP%] {\n  background-color: rgba(6, 122, 69, 0.15);\n}\n.mail-icon[_ngcontent-%COMP%], \n.check-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  color: var(--color-primary);\n  stroke: var(--color-primary);\n}\n.verification-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin: 0;\n}\n.verification-text[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n  max-width: 340px;\n  line-height: 1.6;\n}\n.verification-steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  width: 100%;\n  text-align: left;\n}\n.step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n}\n.step-number[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background-color: var(--color-primary);\n  color: white;\n  font-size: var(--text-sm);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.step[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n  padding-top: var(--space-1);\n  line-height: 1.5;\n}\n.redirect-info[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4);\n  background-color: rgba(6, 122, 69, 0.08);\n  border-radius: var(--radius-md);\n  width: 100%;\n}\n.redirect-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-primary);\n  margin: 0;\n  font-weight: var(--font-medium);\n}\n.form-hint[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--text-secondary);\n  margin-top: var(--space-1);\n  margin-bottom: 0;\n}\n@media (max-width: 768px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: var(--space-4) var(--space-3);\n    align-items: flex-start;\n    padding-top: var(--space-8);\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: var(--space-8) var(--space-6);\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-2xl);\n  }\n  .auth-header[_ngcontent-%COMP%] {\n    margin-bottom: var(--space-6);\n  }\n}\n@media (max-width: 480px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: var(--space-3) var(--space-3);\n    padding-top: var(--space-6);\n    align-items: flex-start;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: var(--space-6) var(--space-4);\n    border-radius: var(--radius-md);\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n  .auth-subtitle[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n  }\n  .auth-form[_ngcontent-%COMP%] {\n    gap: var(--space-4);\n  }\n  .auth-divider[_ngcontent-%COMP%] {\n    margin: var(--space-4) 0 var(--space-3);\n  }\n  .verification-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n  .icon-wrapper[_ngcontent-%COMP%] {\n    width: 64px;\n    height: 64px;\n  }\n  .mail-icon[_ngcontent-%COMP%], \n   .check-icon[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n  }\n}\n@media (max-width: 375px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: var(--space-2) var(--space-2);\n    padding-top: var(--space-4);\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: var(--space-5) var(--space-3);\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-lg);\n  }\n  .auth-form[_ngcontent-%COMP%] {\n    gap: var(--space-3);\n  }\n  .step-number[_ngcontent-%COMP%] {\n    width: 24px;\n    height: 24px;\n    font-size: var(--text-xs);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner[_ngcontent-%COMP%] {\n    animation: none;\n    border-top-color: white;\n    opacity: 0.7;\n  }\n  .submit-btn[_ngcontent-%COMP%], \n   .link[_ngcontent-%COMP%], \n   .link-primary[_ngcontent-%COMP%], \n   .password-toggle[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n\n\n\n.verification-card[_ngcontent-%COMP%] {\n  max-width: 500px;\n}\n.spinner-large[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border: 4px solid rgba(6, 122, 69, 0.15);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.9s linear infinite;\n}\n.icon-wrapper.error[_ngcontent-%COMP%] {\n  background-color: var(--color-error-light);\n}\n.error-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  color: var(--color-error);\n  stroke: var(--color-error);\n}\n.link-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--color-primary);\n  font-size: var(--text-sm);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  text-decoration: underline;\n  padding: var(--space-2) 0;\n  font-family: var(--font-primary);\n  min-height: 44px;\n  display: inline-flex;\n  align-items: center;\n}\n.auth-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  background: var(--color-background);\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 48px 40px;\n  width: 100%;\n  max-width: 480px;\n  box-shadow: var(--shadow-lg);\n  text-align: center;\n}\n.verification-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.icon-wrapper[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-surface-elevated);\n  margin-bottom: 8px;\n}\n.icon-wrapper.success[_ngcontent-%COMP%] {\n  background: rgba(6, 122, 69, 0.12);\n}\n.icon-wrapper.error[_ngcontent-%COMP%] {\n  background: var(--color-error-light);\n}\n.check-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  stroke: var(--color-primary);\n}\n.error-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  stroke: var(--color-error);\n}\n.mail-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  stroke: var(--color-primary);\n}\n.spinner-large[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border: 4px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--color-text-primary);\n  margin: 0;\n}\n.verification-text[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  line-height: 1.6;\n  margin: 0;\n}\n.redirect-info[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  background: rgba(6, 122, 69, 0.08);\n  border-radius: 8px;\n  color: var(--color-primary);\n  font-size: 0.9rem;\n  font-weight: 500;\n}\n.verification-steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  width: 100%;\n  text-align: left;\n}\n.step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n}\n.step-number[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  min-width: 28px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  font-size: 0.85rem;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.step[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  margin: 0;\n  padding-top: 4px;\n  font-size: 0.95rem;\n}\n.verification-help[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  color: var(--color-text-secondary);\n  font-size: 0.9rem;\n}\n.link-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--color-primary);\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  text-decoration: underline;\n}\n.back-link[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  font-size: 0.9rem;\n  text-decoration: none;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  background: var(--gradient-primary);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: var(--color-error);\n  margin: 0;\n}\n.error-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n}\n.link[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  font-size: 0.9rem;\n}\n@media (max-width: 480px) {\n  .auth-card[_ngcontent-%COMP%] {\n    padding: 32px 20px;\n  }\n}\n@media (hover: hover) and (pointer: fine) {\n  .link-btn[_ngcontent-%COMP%]:hover {\n    color: var(--color-primary-hover);\n  }\n}\n.back-link[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: var(--text-sm);\n  text-decoration: none;\n  font-weight: var(--font-medium);\n  min-height: 44px;\n  display: inline-flex;\n  align-items: center;\n}\n@media (hover: hover) and (pointer: fine) {\n  .back-link[_ngcontent-%COMP%]:hover {\n    text-decoration: underline;\n  }\n}\n.error-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n}\n.verification-help[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-1);\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  text-align: center;\n}\n@media (max-width: 480px) {\n  .verification-card[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .spinner-large[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner-large[_ngcontent-%COMP%] {\n    animation: none;\n    border-top-color: var(--color-primary);\n    opacity: 0.6;\n  }\n}\n/*# sourceMappingURL=registration-promise.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegistrationPromise, [{
    type: Component,
    args: [{ selector: "app-registration-promise", standalone: true, imports: [RouterModule, TranslateModule], template: `<div class="auth-container">\r
  <div class="auth-card verification-card">\r
    @if (!token() && !isVerifying() && !isVerified() && !errorMessage()) {\r
      <div class="verification-content">\r
        <div class="icon-wrapper">\r
          <svg class="mail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">\r
            <path\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
              stroke-width="2"\r
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"\r
            />\r
          </svg>\r
        </div>\r
\r
        <h1>{{ 'auth.email.check_inbox' | translate }}</h1>\r
        <p class="verification-text">{{ 'auth.email.sent_message' | translate }}</p>\r
\r
        <div class="verification-steps">\r
          <div class="step">\r
            <span class="step-number">1</span>\r
            <p>{{ 'auth.email.step_1' | translate }}</p>\r
          </div>\r
          <div class="step">\r
            <span class="step-number">2</span>\r
            <p>{{ 'auth.email.step_2' | translate }}</p>\r
          </div>\r
          <div class="step">\r
            <span class="step-number">3</span>\r
            <p>{{ 'auth.email.step_3' | translate }}</p>\r
          </div>\r
        </div>\r
\r
        <div class="verification-help">\r
          <p>{{ 'auth.email.no_email' | translate }}</p>\r
          <button class="link-btn" (click)="resendEmail()">\r
            {{ 'auth.email.resend' | translate }}\r
          </button>\r
        </div>\r
\r
        <a routerLink="/login" class="back-link">\r
          {{ 'auth.email.back_to_login' | translate }}\r
        </a>\r
      </div>\r
    }\r
\r
    @if (isVerifying()) {\r
      <div class="verification-content">\r
        <div class="icon-wrapper">\r
          <div class="spinner-large"></div>\r
        </div>\r
\r
        <h1>{{ 'auth.email.verifying' | translate }}</h1>\r
        <p class="verification-text">{{ 'auth.email.verifying_message' | translate }}</p>\r
      </div>\r
    }\r
\r
    @if (isVerified() && !errorMessage()) {\r
      <div class="verification-content">\r
        <div class="icon-wrapper success">\r
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">\r
            <path\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
              stroke-width="3"\r
              d="M5 13l4 4L19 7"\r
            />\r
          </svg>\r
        </div>\r
\r
        <h1>{{ 'auth.email.verified' | translate }}</h1>\r
        <p class="verification-text">{{ 'auth.email.verified_message' | translate }}</p>\r
\r
        <div class="redirect-info">\r
          <p>{{ 'auth.email.redirecting' | translate }}</p>\r
        </div>\r
      </div>\r
    }\r
\r
    @if (errorMessage()) {\r
      <div class="verification-content">\r
        <div class="icon-wrapper error">\r
          <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">\r
            <circle cx="12" cy="12" r="10" stroke-width="2" />\r
            <path stroke-linecap="round" stroke-width="2" d="M12 8v4M12 16h.01" />\r
          </svg>\r
        </div>\r
\r
        <h1>{{ 'auth.email.verification_failed' | translate }}</h1>\r
        <p class="error-message">{{ errorMessage() | translate }}</p>\r
\r
        <div class="error-actions">\r
          <button class="submit-btn" (click)="resendEmail()">\r
            {{ 'auth.email.try_again' | translate }}\r
          </button>\r
          <a routerLink="/register" class="link">\r
            {{ 'auth.email.back_to_register' | translate }}\r
          </a>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
</div>\r
`, styles: ['/* src/app/pages/login/login.css */\n.auth-container {\n  min-height: calc(100vh - 55px - 200px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-8) var(--space-4);\n  background-color: var(--bg-secondary);\n}\n.auth-card {\n  background-color: var(--bg-primary);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10);\n  width: 100%;\n  max-width: 440px;\n  transition: all var(--transition-normal);\n}\n.auth-header {\n  text-align: center;\n  margin-bottom: var(--space-8);\n}\n.auth-header h1 {\n  font-size: var(--text-3xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin-bottom: var(--space-2);\n}\n.auth-subtitle {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.form-label {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--text-primary);\n}\n.form-input {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  font-size: 1rem;\n  font-family: var(--font-primary);\n  color: var(--input-text);\n  background-color: var(--input-bg);\n  border: 2px solid var(--input-border);\n  border-radius: var(--radius-md);\n  transition: all var(--transition-fast);\n  outline: none;\n  min-height: 48px;\n  box-sizing: border-box;\n}\n.form-input:focus {\n  border-color: var(--color-border-focus);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.form-input:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.form-input::placeholder {\n  color: var(--input-placeholder);\n}\n.password-input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-input-wrapper .form-input {\n  padding-right: var(--space-12);\n}\n.password-toggle {\n  position: absolute;\n  right: 0;\n  width: 44px;\n  height: 44px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: var(--text-xl);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n  transition: color var(--transition-fast);\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n}\n@media (hover: hover) and (pointer: fine) {\n  .password-toggle:hover {\n    color: var(--text-primary);\n  }\n}\n.password-toggle:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.checkbox-group {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--space-2);\n}\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  font-size: var(--text-sm);\n  color: var(--text-primary);\n  -webkit-user-select: none;\n  user-select: none;\n  min-height: 44px;\n}\n.checkbox-label input[type=checkbox] {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  accent-color: var(--color-primary);\n  flex-shrink: 0;\n}\n.checkbox-label input[type=checkbox]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.error-message {\n  padding: var(--space-3) var(--space-4);\n  background-color: var(--color-error-light);\n  color: var(--color-error);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-error);\n}\n.submit-btn {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  font-family: var(--font-primary);\n  color: var(--btn-primary-text);\n  background-color: var(--btn-primary-bg);\n  border: none;\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  transition: all var(--transition-normal);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 48px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .submit-btn:hover:not(:disabled) {\n    background-color: var(--btn-primary-hover);\n    transform: translateY(-1px);\n    box-shadow: var(--shadow-md);\n  }\n}\n.submit-btn:active:not(:disabled) {\n  transform: translateY(0);\n}\n.submit-btn:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.spinner {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  flex-shrink: 0;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-links {\n  display: flex;\n  justify-content: center;\n  margin-top: var(--space-2);\n}\n.link {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n  padding: var(--space-2) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link:hover {\n    color: var(--color-primary);\n    text-decoration: underline;\n  }\n}\n.auth-divider {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: var(--space-6) 0 var(--space-4);\n  color: var(--text-secondary);\n  font-size: var(--text-sm);\n}\n.auth-divider::before,\n.auth-divider::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid var(--border-color);\n}\n.auth-divider span {\n  padding: 0 var(--space-3);\n}\n.auth-footer {\n  text-align: center;\n  margin-top: var(--space-2);\n}\n.auth-footer p {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.link-primary {\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: var(--font-semibold);\n  transition: color var(--transition-fast);\n  padding: var(--space-1) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link-primary:hover {\n    color: var(--color-primary-hover);\n    text-decoration: underline;\n  }\n}\n.verification-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--space-4);\n  padding: var(--space-4) 0;\n}\n.icon-wrapper {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background-color: var(--color-success-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.icon-wrapper.success {\n  background-color: rgba(6, 122, 69, 0.15);\n}\n.mail-icon,\n.check-icon {\n  width: 40px;\n  height: 40px;\n  color: var(--color-primary);\n  stroke: var(--color-primary);\n}\n.verification-content h1 {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin: 0;\n}\n.verification-text {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n  max-width: 340px;\n  line-height: 1.6;\n}\n.verification-steps {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  width: 100%;\n  text-align: left;\n}\n.step {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n}\n.step-number {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background-color: var(--color-primary);\n  color: white;\n  font-size: var(--text-sm);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.step p {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n  padding-top: var(--space-1);\n  line-height: 1.5;\n}\n.redirect-info {\n  padding: var(--space-3) var(--space-4);\n  background-color: rgba(6, 122, 69, 0.08);\n  border-radius: var(--radius-md);\n  width: 100%;\n}\n.redirect-info p {\n  font-size: var(--text-sm);\n  color: var(--color-primary);\n  margin: 0;\n  font-weight: var(--font-medium);\n}\n.form-hint {\n  font-size: var(--text-xs);\n  color: var(--text-secondary);\n  margin-top: var(--space-1);\n  margin-bottom: 0;\n}\n@media (max-width: 768px) {\n  .auth-container {\n    padding: var(--space-4) var(--space-3);\n    align-items: flex-start;\n    padding-top: var(--space-8);\n  }\n  .auth-card {\n    padding: var(--space-8) var(--space-6);\n  }\n  .auth-header h1 {\n    font-size: var(--text-2xl);\n  }\n  .auth-header {\n    margin-bottom: var(--space-6);\n  }\n}\n@media (max-width: 480px) {\n  .auth-container {\n    padding: var(--space-3) var(--space-3);\n    padding-top: var(--space-6);\n    align-items: flex-start;\n  }\n  .auth-card {\n    padding: var(--space-6) var(--space-4);\n    border-radius: var(--radius-md);\n  }\n  .auth-header h1 {\n    font-size: var(--text-xl);\n  }\n  .auth-subtitle {\n    font-size: var(--text-sm);\n  }\n  .auth-form {\n    gap: var(--space-4);\n  }\n  .auth-divider {\n    margin: var(--space-4) 0 var(--space-3);\n  }\n  .verification-content h1 {\n    font-size: var(--text-xl);\n  }\n  .icon-wrapper {\n    width: 64px;\n    height: 64px;\n  }\n  .mail-icon,\n  .check-icon {\n    width: 32px;\n    height: 32px;\n  }\n}\n@media (max-width: 375px) {\n  .auth-container {\n    padding: var(--space-2) var(--space-2);\n    padding-top: var(--space-4);\n  }\n  .auth-card {\n    padding: var(--space-5) var(--space-3);\n  }\n  .auth-header h1 {\n    font-size: var(--text-lg);\n  }\n  .auth-form {\n    gap: var(--space-3);\n  }\n  .step-number {\n    width: 24px;\n    height: 24px;\n    font-size: var(--text-xs);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner {\n    animation: none;\n    border-top-color: white;\n    opacity: 0.7;\n  }\n  .submit-btn,\n  .link,\n  .link-primary,\n  .password-toggle {\n    transition: none;\n  }\n}\n\n/* src/app/pages/registration-promise/registration-promise.css */\n.verification-card {\n  max-width: 500px;\n}\n.spinner-large {\n  width: 56px;\n  height: 56px;\n  border: 4px solid rgba(6, 122, 69, 0.15);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: spin 0.9s linear infinite;\n}\n.icon-wrapper.error {\n  background-color: var(--color-error-light);\n}\n.error-icon {\n  width: 40px;\n  height: 40px;\n  color: var(--color-error);\n  stroke: var(--color-error);\n}\n.link-btn {\n  background: none;\n  border: none;\n  color: var(--color-primary);\n  font-size: var(--text-sm);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  text-decoration: underline;\n  padding: var(--space-2) 0;\n  font-family: var(--font-primary);\n  min-height: 44px;\n  display: inline-flex;\n  align-items: center;\n}\n.auth-container {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  background: var(--color-background);\n}\n.auth-card {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  padding: 48px 40px;\n  width: 100%;\n  max-width: 480px;\n  box-shadow: var(--shadow-lg);\n  text-align: center;\n}\n.verification-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.icon-wrapper {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-surface-elevated);\n  margin-bottom: 8px;\n}\n.icon-wrapper.success {\n  background: rgba(6, 122, 69, 0.12);\n}\n.icon-wrapper.error {\n  background: var(--color-error-light);\n}\n.check-icon {\n  width: 44px;\n  height: 44px;\n  stroke: var(--color-primary);\n}\n.error-icon {\n  width: 44px;\n  height: 44px;\n  stroke: var(--color-error);\n}\n.mail-icon {\n  width: 44px;\n  height: 44px;\n  stroke: var(--color-primary);\n}\n.spinner-large {\n  width: 44px;\n  height: 44px;\n  border: 4px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\nh1 {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--color-text-primary);\n  margin: 0;\n}\n.verification-text {\n  color: var(--color-text-secondary);\n  line-height: 1.6;\n  margin: 0;\n}\n.redirect-info {\n  padding: 12px 20px;\n  background: rgba(6, 122, 69, 0.08);\n  border-radius: 8px;\n  color: var(--color-primary);\n  font-size: 0.9rem;\n  font-weight: 500;\n}\n.verification-steps {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  width: 100%;\n  text-align: left;\n}\n.step {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n}\n.step-number {\n  width: 28px;\n  height: 28px;\n  min-width: 28px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  font-size: 0.85rem;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.step p {\n  color: var(--color-text-secondary);\n  margin: 0;\n  padding-top: 4px;\n  font-size: 0.95rem;\n}\n.verification-help {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  color: var(--color-text-secondary);\n  font-size: 0.9rem;\n}\n.link-btn {\n  background: none;\n  border: none;\n  color: var(--color-primary);\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  text-decoration: underline;\n}\n.back-link {\n  color: var(--color-text-secondary);\n  font-size: 0.9rem;\n  text-decoration: none;\n}\n.back-link:hover {\n  color: var(--color-primary);\n}\n.submit-btn {\n  width: 100%;\n  padding: 12px;\n  background: var(--gradient-primary);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.error-message {\n  color: var(--color-error);\n  margin: 0;\n}\n.error-actions {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n}\n.link {\n  color: var(--color-text-secondary);\n  font-size: 0.9rem;\n}\n@media (max-width: 480px) {\n  .auth-card {\n    padding: 32px 20px;\n  }\n}\n@media (hover: hover) and (pointer: fine) {\n  .link-btn:hover {\n    color: var(--color-primary-hover);\n  }\n}\n.back-link {\n  color: var(--color-primary);\n  font-size: var(--text-sm);\n  text-decoration: none;\n  font-weight: var(--font-medium);\n  min-height: 44px;\n  display: inline-flex;\n  align-items: center;\n}\n@media (hover: hover) and (pointer: fine) {\n  .back-link:hover {\n    text-decoration: underline;\n  }\n}\n.error-actions {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n}\n.verification-help {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-1);\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  text-align: center;\n}\n@media (max-width: 480px) {\n  .verification-card {\n    max-width: 100%;\n  }\n  .spinner-large {\n    width: 48px;\n    height: 48px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner-large {\n    animation: none;\n    border-top-color: var(--color-primary);\n    opacity: 0.6;\n  }\n}\n/*# sourceMappingURL=registration-promise.css.map */\n'] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegistrationPromise, { className: "RegistrationPromise", filePath: "src/app/pages/registration-promise/registration-promise.ts", lineNumber: 14 });
})();
export {
  RegistrationPromise
};
//# sourceMappingURL=chunk-B3U2EOJP.js.map
