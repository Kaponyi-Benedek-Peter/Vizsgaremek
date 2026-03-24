import {
  AuthService
} from "./chunk-BGHGLIZX.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-5SSVEJZT.js";
import {
  TranslationService
} from "./chunk-NEOTYJOM.js";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-GK2QC6TC.js";
import {
  Component,
  TranslateModule,
  TranslatePipe,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WLHV2EEC.js";

// src/app/pages/password-reset-request/password-reset-request.ts
function PasswordResetRequest_Conditional_2_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, ctx_r1.errorMessage()), " ");
  }
}
function PasswordResetRequest_Conditional_2_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "auth.password_reset.sending"), " ");
  }
}
function PasswordResetRequest_Conditional_2_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "auth.password_reset.button"), " ");
  }
}
function PasswordResetRequest_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "h1");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 4);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 5);
    \u0275\u0275listener("ngSubmit", function PasswordResetRequest_Conditional_2_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(8, "div", 6)(9, "label", 7);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 8);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function PasswordResetRequest_Conditional_2_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.email, $event) || (ctx_r1.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 6)(15, "label", 9);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 10)(19, "input", 11);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function PasswordResetRequest_Conditional_2_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newPassword, $event) || (ctx_r1.newPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 12);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275listener("click", function PasswordResetRequest_Conditional_2_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePasswordVisibility());
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 6)(25, "label", 13);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 14);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function PasswordResetRequest_Conditional_2_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.confirmPassword, $event) || (ctx_r1.confirmPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, PasswordResetRequest_Conditional_2_Conditional_30_Template, 3, 3, "div", 15);
    \u0275\u0275elementStart(31, "button", 16);
    \u0275\u0275conditionalCreate(32, PasswordResetRequest_Conditional_2_Conditional_32_Template, 3, 3)(33, PasswordResetRequest_Conditional_2_Conditional_33_Template, 2, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 17)(35, "span");
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 18)(39, "a", 19);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 23, "auth.password_reset.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 25, "auth.password_reset.subtitle"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 27, "auth.fields.email"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(13, 29, "auth.placeholders.email"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.email);
    \u0275\u0275property("disabled", ctx_r1.isLoading());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 31, "auth.password_reset.new_password"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("type", ctx_r1.showPassword() ? "text" : "password")("placeholder", \u0275\u0275pipeBind1(20, 33, "auth.placeholders.new_password"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newPassword);
    \u0275\u0275property("disabled", ctx_r1.isLoading());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(22, 35, "auth.show_password"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.showPassword() ? "\u{1F441}\uFE0F" : "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(27, 37, "auth.password_reset.confirm_password"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("type", ctx_r1.showPassword() ? "text" : "password")("placeholder", \u0275\u0275pipeBind1(29, 39, "auth.placeholders.confirm_password"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.confirmPassword);
    \u0275\u0275property("disabled", ctx_r1.isLoading());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isLoading() ? 32 : 33);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(37, 41, "auth.or"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(41, 43, "auth.password_reset.back_to_login"), " ");
  }
}
function PasswordResetRequest_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 22);
    \u0275\u0275element(3, "path", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 24);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 25)(11, "div", 26)(12, "span", 27);
    \u0275\u0275text(13, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 26)(18, "span", 27);
    \u0275\u0275text(19, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 26)(24, "span", 27);
    \u0275\u0275text(25, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p");
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "button", 28);
    \u0275\u0275listener("click", function PasswordResetRequest_Conditional_3_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToLogin());
    });
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 6, "auth.password_reset.email_sent"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 8, "auth.password_reset.email_sent_message"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 10, "auth.password_reset.step_1"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 12, "auth.password_reset.step_2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 14, "auth.password_reset.step_3"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(31, 16, "auth.password_reset.back_to_login"), " ");
  }
}
var PasswordResetRequest = class _PasswordResetRequest {
  authService;
  router;
  translationService;
  email = "";
  newPassword = "";
  confirmPassword = "";
  showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  isEmailSent = signal(false, ...ngDevMode ? [{ debugName: "isEmailSent" }] : []);
  language = computed(() => this.translationService.getCurrentLanguage(), ...ngDevMode ? [{ debugName: "language" }] : []);
  constructor(authService, router, translationService) {
    this.authService = authService;
    this.router = router;
    this.translationService = translationService;
  }
  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
  onSubmit() {
    this.errorMessage.set("");
    if (!this.email) {
      this.errorMessage.set("auth.errors.email_required");
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.errorMessage.set("auth.errors.invalid_email");
      return;
    }
    if (!this.newPassword) {
      this.errorMessage.set("auth.errors.empty_fields");
      return;
    }
    if (this.newPassword.length < 8) {
      this.errorMessage.set("auth.errors.password_too_short");
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage.set("auth.errors.passwords_dont_match");
      return;
    }
    this.isLoading.set(true);
    this.authService.requestPasswordChange(this.email, this.newPassword, this.language()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isEmailSent.set(true);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || "auth.errors.request_failed");
      }
    });
  }
  backToLogin() {
    this.router.navigate(["/login"]);
  }
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  static \u0275fac = function PasswordResetRequest_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PasswordResetRequest)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(TranslationService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PasswordResetRequest, selectors: [["app-password-reset-request"]], decls: 4, vars: 2, consts: [[1, "auth-container"], [1, "auth-card"], [1, "verification-content"], [1, "auth-header"], [1, "auth-subtitle"], [1, "auth-form", 3, "ngSubmit"], [1, "form-group"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "name", "email", "required", "", "autocomplete", "email", "autofocus", "", 1, "form-input", 3, "ngModelChange", "placeholder", "ngModel", "disabled"], ["for", "newPassword", 1, "form-label"], [1, "password-input-wrapper"], ["id", "newPassword", "name", "newPassword", "required", "", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "type", "placeholder", "ngModel", "disabled"], ["type", "button", 1, "password-toggle", 3, "click"], ["for", "confirmPassword", 1, "form-label"], ["id", "confirmPassword", "name", "confirmPassword", "required", "", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "type", "placeholder", "ngModel", "disabled"], [1, "error-message"], ["type", "submit", 1, "submit-btn", 3, "disabled"], [1, "auth-divider"], [1, "auth-footer"], ["routerLink", "/login", 1, "link-primary"], [1, "spinner"], [1, "icon-wrapper"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "mail-icon"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"], [1, "verification-text"], [1, "verification-steps"], [1, "step"], [1, "step-number"], [1, "submit-btn", 3, "click"]], template: function PasswordResetRequest_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275conditionalCreate(2, PasswordResetRequest_Conditional_2_Template, 42, 45);
      \u0275\u0275conditionalCreate(3, PasswordResetRequest_Conditional_3_Template, 32, 18, "div", 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isEmailSent() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEmailSent() ? 3 : -1);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, RouterLink, TranslateModule, TranslatePipe], styles: ['\n\n.auth-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 55px - 200px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-8) var(--space-4);\n  background-color: var(--bg-secondary);\n}\n.auth-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-primary);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10);\n  width: 100%;\n  max-width: 440px;\n  transition: all var(--transition-normal);\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: var(--space-8);\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: var(--text-3xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin-bottom: var(--space-2);\n}\n.auth-subtitle[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--text-primary);\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  font-size: 1rem;\n  font-family: var(--font-primary);\n  color: var(--input-text);\n  background-color: var(--input-bg);\n  border: 2px solid var(--input-border);\n  border-radius: var(--radius-md);\n  transition: all var(--transition-fast);\n  outline: none;\n  min-height: 48px;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-border-focus);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.form-input[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--input-placeholder);\n}\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  padding-right: var(--space-12);\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  width: 44px;\n  height: 44px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: var(--text-xl);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n  transition: color var(--transition-fast);\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n}\n@media (hover: hover) and (pointer: fine) {\n  .password-toggle[_ngcontent-%COMP%]:hover {\n    color: var(--text-primary);\n  }\n}\n.password-toggle[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.checkbox-group[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--space-2);\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  font-size: var(--text-sm);\n  color: var(--text-primary);\n  -webkit-user-select: none;\n  user-select: none;\n  min-height: 44px;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  accent-color: var(--color-primary);\n  flex-shrink: 0;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.error-message[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4);\n  background-color: var(--color-error-light);\n  color: var(--color-error);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-error);\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  font-family: var(--font-primary);\n  color: var(--btn-primary-text);\n  background-color: var(--btn-primary-bg);\n  border: none;\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  transition: all var(--transition-normal);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 48px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background-color: var(--btn-primary-hover);\n    transform: translateY(-1px);\n    box-shadow: var(--shadow-md);\n  }\n}\n.submit-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  flex-shrink: 0;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: var(--space-2);\n}\n.link[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n  padding: var(--space-2) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link[_ngcontent-%COMP%]:hover {\n    color: var(--color-primary);\n    text-decoration: underline;\n  }\n}\n.auth-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: var(--space-6) 0 var(--space-4);\n  color: var(--text-secondary);\n  font-size: var(--text-sm);\n}\n.auth-divider[_ngcontent-%COMP%]::before, \n.auth-divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid var(--border-color);\n}\n.auth-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 var(--space-3);\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: var(--space-2);\n}\n.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.link-primary[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: var(--font-semibold);\n  transition: color var(--transition-fast);\n  padding: var(--space-1) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link-primary[_ngcontent-%COMP%]:hover {\n    color: var(--color-primary-hover);\n    text-decoration: underline;\n  }\n}\n.verification-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--space-4);\n  padding: var(--space-4) 0;\n}\n.icon-wrapper[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background-color: var(--color-success-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.icon-wrapper.success[_ngcontent-%COMP%] {\n  background-color: rgba(6, 122, 69, 0.15);\n}\n.mail-icon[_ngcontent-%COMP%], \n.check-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  color: var(--color-primary);\n  stroke: var(--color-primary);\n}\n.verification-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin: 0;\n}\n.verification-text[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n  max-width: 340px;\n  line-height: 1.6;\n}\n.verification-steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  width: 100%;\n  text-align: left;\n}\n.step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n}\n.step-number[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background-color: var(--color-primary);\n  color: white;\n  font-size: var(--text-sm);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.step[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n  padding-top: var(--space-1);\n  line-height: 1.5;\n}\n.redirect-info[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4);\n  background-color: rgba(6, 122, 69, 0.08);\n  border-radius: var(--radius-md);\n  width: 100%;\n}\n.redirect-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-primary);\n  margin: 0;\n  font-weight: var(--font-medium);\n}\n.form-hint[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--text-secondary);\n  margin-top: var(--space-1);\n  margin-bottom: 0;\n}\n@media (max-width: 768px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: var(--space-4) var(--space-3);\n    align-items: flex-start;\n    padding-top: var(--space-8);\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: var(--space-8) var(--space-6);\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-2xl);\n  }\n  .auth-header[_ngcontent-%COMP%] {\n    margin-bottom: var(--space-6);\n  }\n}\n@media (max-width: 480px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: var(--space-3) var(--space-3);\n    padding-top: var(--space-6);\n    align-items: flex-start;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: var(--space-6) var(--space-4);\n    border-radius: var(--radius-md);\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n  .auth-subtitle[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n  }\n  .auth-form[_ngcontent-%COMP%] {\n    gap: var(--space-4);\n  }\n  .auth-divider[_ngcontent-%COMP%] {\n    margin: var(--space-4) 0 var(--space-3);\n  }\n  .verification-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n  .icon-wrapper[_ngcontent-%COMP%] {\n    width: 64px;\n    height: 64px;\n  }\n  .mail-icon[_ngcontent-%COMP%], \n   .check-icon[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n  }\n}\n@media (max-width: 375px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: var(--space-2) var(--space-2);\n    padding-top: var(--space-4);\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: var(--space-5) var(--space-3);\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-lg);\n  }\n  .auth-form[_ngcontent-%COMP%] {\n    gap: var(--space-3);\n  }\n  .step-number[_ngcontent-%COMP%] {\n    width: 24px;\n    height: 24px;\n    font-size: var(--text-xs);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner[_ngcontent-%COMP%] {\n    animation: none;\n    border-top-color: white;\n    opacity: 0.7;\n  }\n  .submit-btn[_ngcontent-%COMP%], \n   .link[_ngcontent-%COMP%], \n   .link-primary[_ngcontent-%COMP%], \n   .password-toggle[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n\n\n\n/*# sourceMappingURL=password-reset-request.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PasswordResetRequest, [{
    type: Component,
    args: [{ selector: "app-password-reset-request", standalone: true, imports: [FormsModule, RouterModule, TranslateModule], template: `<div class="auth-container">\r
  <div class="auth-card">\r
    @if (!isEmailSent()) {\r
      <div class="auth-header">\r
        <h1>{{ 'auth.password_reset.title' | translate }}</h1>\r
        <p class="auth-subtitle">{{ 'auth.password_reset.subtitle' | translate }}</p>\r
      </div>\r
\r
      <form class="auth-form" (ngSubmit)="onSubmit()">\r
        <div class="form-group">\r
          <label for="email" class="form-label">\r
            {{ 'auth.fields.email' | translate }}\r
          </label>\r
          <input\r
            type="email"\r
            id="email"\r
            class="form-input"\r
            [placeholder]="'auth.placeholders.email' | translate"\r
            [(ngModel)]="email"\r
            name="email"\r
            [disabled]="isLoading()"\r
            required\r
            autocomplete="email"\r
            autofocus\r
          />\r
        </div>\r
\r
        <div class="form-group">\r
          <label for="newPassword" class="form-label">\r
            {{ 'auth.password_reset.new_password' | translate }}\r
          </label>\r
          <div class="password-input-wrapper">\r
            <input\r
              [type]="showPassword() ? 'text' : 'password'"\r
              id="newPassword"\r
              class="form-input"\r
              [placeholder]="'auth.placeholders.new_password' | translate"\r
              [(ngModel)]="newPassword"\r
              name="newPassword"\r
              [disabled]="isLoading()"\r
              required\r
              autocomplete="new-password"\r
            />\r
            <button\r
              type="button"\r
              class="password-toggle"\r
              (click)="togglePasswordVisibility()"\r
              [attr.aria-label]="'auth.show_password' | translate"\r
            >\r
              {{ showPassword() ? '\u{1F441}\uFE0F' : '\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F' }}\r
            </button>\r
          </div>\r
        </div>\r
\r
        <div class="form-group">\r
          <label for="confirmPassword" class="form-label">\r
            {{ 'auth.password_reset.confirm_password' | translate }}\r
          </label>\r
          <input\r
            [type]="showPassword() ? 'text' : 'password'"\r
            id="confirmPassword"\r
            class="form-input"\r
            [placeholder]="'auth.placeholders.confirm_password' | translate"\r
            [(ngModel)]="confirmPassword"\r
            name="confirmPassword"\r
            [disabled]="isLoading()"\r
            required\r
            autocomplete="new-password"\r
          />\r
        </div>\r
\r
        @if (errorMessage()) {\r
          <div class="error-message">\r
            {{ errorMessage() | translate }}\r
          </div>\r
        }\r
\r
        <button type="submit" class="submit-btn" [disabled]="isLoading()">\r
          @if (isLoading()) {\r
            <span class="spinner"></span>\r
            {{ 'auth.password_reset.sending' | translate }}\r
          } @else {\r
            {{ 'auth.password_reset.button' | translate }}\r
          }\r
        </button>\r
\r
        <div class="auth-divider">\r
          <span>{{ 'auth.or' | translate }}</span>\r
        </div>\r
\r
        <div class="auth-footer">\r
          <a routerLink="/login" class="link-primary">\r
            {{ 'auth.password_reset.back_to_login' | translate }}\r
          </a>\r
        </div>\r
      </form>\r
    }\r
\r
    @if (isEmailSent()) {\r
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
        <h1>{{ 'auth.password_reset.email_sent' | translate }}</h1>\r
        <p class="verification-text">{{ 'auth.password_reset.email_sent_message' | translate }}</p>\r
\r
        <div class="verification-steps">\r
          <div class="step">\r
            <span class="step-number">1</span>\r
            <p>{{ 'auth.password_reset.step_1' | translate }}</p>\r
          </div>\r
          <div class="step">\r
            <span class="step-number">2</span>\r
            <p>{{ 'auth.password_reset.step_2' | translate }}</p>\r
          </div>\r
          <div class="step">\r
            <span class="step-number">3</span>\r
            <p>{{ 'auth.password_reset.step_3' | translate }}</p>\r
          </div>\r
        </div>\r
\r
        <button class="submit-btn" (click)="backToLogin()">\r
          {{ 'auth.password_reset.back_to_login' | translate }}\r
        </button>\r
      </div>\r
    }\r
  </div>\r
</div>\r
`, styles: ['/* src/app/pages/login/login.css */\n.auth-container {\n  min-height: calc(100vh - 55px - 200px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-8) var(--space-4);\n  background-color: var(--bg-secondary);\n}\n.auth-card {\n  background-color: var(--bg-primary);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10);\n  width: 100%;\n  max-width: 440px;\n  transition: all var(--transition-normal);\n}\n.auth-header {\n  text-align: center;\n  margin-bottom: var(--space-8);\n}\n.auth-header h1 {\n  font-size: var(--text-3xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin-bottom: var(--space-2);\n}\n.auth-subtitle {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.form-label {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--text-primary);\n}\n.form-input {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  font-size: 1rem;\n  font-family: var(--font-primary);\n  color: var(--input-text);\n  background-color: var(--input-bg);\n  border: 2px solid var(--input-border);\n  border-radius: var(--radius-md);\n  transition: all var(--transition-fast);\n  outline: none;\n  min-height: 48px;\n  box-sizing: border-box;\n}\n.form-input:focus {\n  border-color: var(--color-border-focus);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.form-input:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.form-input::placeholder {\n  color: var(--input-placeholder);\n}\n.password-input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-input-wrapper .form-input {\n  padding-right: var(--space-12);\n}\n.password-toggle {\n  position: absolute;\n  right: 0;\n  width: 44px;\n  height: 44px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: var(--text-xl);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n  transition: color var(--transition-fast);\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n}\n@media (hover: hover) and (pointer: fine) {\n  .password-toggle:hover {\n    color: var(--text-primary);\n  }\n}\n.password-toggle:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.checkbox-group {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--space-2);\n}\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  font-size: var(--text-sm);\n  color: var(--text-primary);\n  -webkit-user-select: none;\n  user-select: none;\n  min-height: 44px;\n}\n.checkbox-label input[type=checkbox] {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  accent-color: var(--color-primary);\n  flex-shrink: 0;\n}\n.checkbox-label input[type=checkbox]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.error-message {\n  padding: var(--space-3) var(--space-4);\n  background-color: var(--color-error-light);\n  color: var(--color-error);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-error);\n}\n.submit-btn {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  font-family: var(--font-primary);\n  color: var(--btn-primary-text);\n  background-color: var(--btn-primary-bg);\n  border: none;\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  transition: all var(--transition-normal);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 48px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .submit-btn:hover:not(:disabled) {\n    background-color: var(--btn-primary-hover);\n    transform: translateY(-1px);\n    box-shadow: var(--shadow-md);\n  }\n}\n.submit-btn:active:not(:disabled) {\n  transform: translateY(0);\n}\n.submit-btn:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.spinner {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  flex-shrink: 0;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-links {\n  display: flex;\n  justify-content: center;\n  margin-top: var(--space-2);\n}\n.link {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n  padding: var(--space-2) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link:hover {\n    color: var(--color-primary);\n    text-decoration: underline;\n  }\n}\n.auth-divider {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: var(--space-6) 0 var(--space-4);\n  color: var(--text-secondary);\n  font-size: var(--text-sm);\n}\n.auth-divider::before,\n.auth-divider::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid var(--border-color);\n}\n.auth-divider span {\n  padding: 0 var(--space-3);\n}\n.auth-footer {\n  text-align: center;\n  margin-top: var(--space-2);\n}\n.auth-footer p {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.link-primary {\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: var(--font-semibold);\n  transition: color var(--transition-fast);\n  padding: var(--space-1) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link-primary:hover {\n    color: var(--color-primary-hover);\n    text-decoration: underline;\n  }\n}\n.verification-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--space-4);\n  padding: var(--space-4) 0;\n}\n.icon-wrapper {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background-color: var(--color-success-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.icon-wrapper.success {\n  background-color: rgba(6, 122, 69, 0.15);\n}\n.mail-icon,\n.check-icon {\n  width: 40px;\n  height: 40px;\n  color: var(--color-primary);\n  stroke: var(--color-primary);\n}\n.verification-content h1 {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin: 0;\n}\n.verification-text {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n  max-width: 340px;\n  line-height: 1.6;\n}\n.verification-steps {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  width: 100%;\n  text-align: left;\n}\n.step {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n}\n.step-number {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background-color: var(--color-primary);\n  color: white;\n  font-size: var(--text-sm);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.step p {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n  padding-top: var(--space-1);\n  line-height: 1.5;\n}\n.redirect-info {\n  padding: var(--space-3) var(--space-4);\n  background-color: rgba(6, 122, 69, 0.08);\n  border-radius: var(--radius-md);\n  width: 100%;\n}\n.redirect-info p {\n  font-size: var(--text-sm);\n  color: var(--color-primary);\n  margin: 0;\n  font-weight: var(--font-medium);\n}\n.form-hint {\n  font-size: var(--text-xs);\n  color: var(--text-secondary);\n  margin-top: var(--space-1);\n  margin-bottom: 0;\n}\n@media (max-width: 768px) {\n  .auth-container {\n    padding: var(--space-4) var(--space-3);\n    align-items: flex-start;\n    padding-top: var(--space-8);\n  }\n  .auth-card {\n    padding: var(--space-8) var(--space-6);\n  }\n  .auth-header h1 {\n    font-size: var(--text-2xl);\n  }\n  .auth-header {\n    margin-bottom: var(--space-6);\n  }\n}\n@media (max-width: 480px) {\n  .auth-container {\n    padding: var(--space-3) var(--space-3);\n    padding-top: var(--space-6);\n    align-items: flex-start;\n  }\n  .auth-card {\n    padding: var(--space-6) var(--space-4);\n    border-radius: var(--radius-md);\n  }\n  .auth-header h1 {\n    font-size: var(--text-xl);\n  }\n  .auth-subtitle {\n    font-size: var(--text-sm);\n  }\n  .auth-form {\n    gap: var(--space-4);\n  }\n  .auth-divider {\n    margin: var(--space-4) 0 var(--space-3);\n  }\n  .verification-content h1 {\n    font-size: var(--text-xl);\n  }\n  .icon-wrapper {\n    width: 64px;\n    height: 64px;\n  }\n  .mail-icon,\n  .check-icon {\n    width: 32px;\n    height: 32px;\n  }\n}\n@media (max-width: 375px) {\n  .auth-container {\n    padding: var(--space-2) var(--space-2);\n    padding-top: var(--space-4);\n  }\n  .auth-card {\n    padding: var(--space-5) var(--space-3);\n  }\n  .auth-header h1 {\n    font-size: var(--text-lg);\n  }\n  .auth-form {\n    gap: var(--space-3);\n  }\n  .step-number {\n    width: 24px;\n    height: 24px;\n    font-size: var(--text-xs);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner {\n    animation: none;\n    border-top-color: white;\n    opacity: 0.7;\n  }\n  .submit-btn,\n  .link,\n  .link-primary,\n  .password-toggle {\n    transition: none;\n  }\n}\n\n/* src/app/pages/password-reset-request/password-reset-request.css */\n/*# sourceMappingURL=password-reset-request.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }, { type: TranslationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PasswordResetRequest, { className: "PasswordResetRequest", filePath: "src/app/pages/password-reset-request/password-reset-request.ts", lineNumber: 16 });
})();
export {
  PasswordResetRequest
};
//# sourceMappingURL=chunk-6LXP57EQ.js.map
