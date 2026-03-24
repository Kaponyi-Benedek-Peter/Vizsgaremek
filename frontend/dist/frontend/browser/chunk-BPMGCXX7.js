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
  inject,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WLHV2EEC.js";

// src/app/pages/register/register.ts
function Register_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, ctx_r0.successMessage()), " ");
  }
}
function Register_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, ctx_r0.errorMessage()), " ");
  }
}
function Register_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "auth.register.creating_account"), " ");
  }
}
function Register_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "auth.register.button"), " ");
  }
}
var Register = class _Register {
  authService;
  router;
  translationService = inject(TranslationService);
  email = signal("", ...ngDevMode ? [{ debugName: "email" }] : []);
  password = signal("", ...ngDevMode ? [{ debugName: "password" }] : []);
  confirmPassword = signal("", ...ngDevMode ? [{ debugName: "confirmPassword" }] : []);
  firstname = signal("", ...ngDevMode ? [{ debugName: "firstname" }] : []);
  lastname = signal("", ...ngDevMode ? [{ debugName: "lastname" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  successMessage = signal("", ...ngDevMode ? [{ debugName: "successMessage" }] : []);
  showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
  showConfirmPassword = signal(false, ...ngDevMode ? [{ debugName: "showConfirmPassword" }] : []);
  language = computed(() => this.translationService.getCurrentLanguage(), ...ngDevMode ? [{ debugName: "language" }] : []);
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  onSubmit() {
    this.errorMessage.set("");
    this.successMessage.set("");
    if (!this.email() || !this.password() || !this.confirmPassword() || !this.firstname() || !this.lastname()) {
      this.errorMessage.set("auth.errors.empty_fields");
      return;
    }
    if (!this.isValidEmail(this.email())) {
      this.errorMessage.set("auth.errors.invalid_email");
      return;
    }
    if (this.password().length < 8) {
      this.errorMessage.set("auth.errors.password_too_short");
      return;
    }
    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set("auth.errors.passwords_dont_match");
      return;
    }
    this.isLoading.set(true);
    this.authService.register(this.email(), this.password(), this.firstname(), this.lastname(), this.language()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set("auth.register.success_message");
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.message || "auth.errors.registration_failed");
      }
    });
  }
  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  static \u0275fac = function Register_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Register)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Register, selectors: [["app-register"]], decls: 68, vars: 72, consts: [[1, "auth-container"], [1, "auth-card"], [1, "auth-header"], [1, "auth-subtitle"], [1, "auth-form", 3, "ngSubmit"], [1, "form-row"], [1, "form-group"], ["for", "firstname", 1, "form-label"], ["type", "text", "id", "firstname", "name", "firstname", "required", "", "autocomplete", "given-name", 1, "form-input", 3, "ngModelChange", "placeholder", "ngModel", "disabled"], ["for", "lastname", 1, "form-label"], ["type", "text", "id", "lastname", "name", "lastname", "required", "", "autocomplete", "family-name", 1, "form-input", 3, "ngModelChange", "placeholder", "ngModel", "disabled"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "name", "email", "required", "", "autocomplete", "email", 1, "form-input", 3, "ngModelChange", "placeholder", "ngModel", "disabled"], ["for", "password", 1, "form-label"], [1, "password-input-wrapper"], ["id", "password", "name", "password", "required", "", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "type", "placeholder", "ngModel", "disabled"], ["type", "button", 1, "password-toggle", 3, "click"], [1, "form-hint"], ["for", "confirmPassword", 1, "form-label"], ["id", "confirmPassword", "name", "confirmPassword", "required", "", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "type", "placeholder", "ngModel", "disabled"], [1, "success-message"], [1, "error-message"], ["type", "submit", 1, "submit-btn", 3, "disabled"], [1, "auth-divider"], [1, "auth-footer"], ["routerLink", "/login", 1, "link-primary"], [1, "spinner"]], template: function Register_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 3);
      \u0275\u0275text(7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "form", 4);
      \u0275\u0275listener("ngSubmit", function Register_Template_form_ngSubmit_9_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(10, "div", 5)(11, "div", 6)(12, "label", 7);
      \u0275\u0275text(13);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "input", 8);
      \u0275\u0275pipe(16, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function Register_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.firstname, $event) || (ctx.firstname = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 6)(18, "label", 9);
      \u0275\u0275text(19);
      \u0275\u0275pipe(20, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 10);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function Register_Template_input_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.lastname, $event) || (ctx.lastname = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 6)(24, "label", 11);
      \u0275\u0275text(25);
      \u0275\u0275pipe(26, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "input", 12);
      \u0275\u0275pipe(28, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function Register_Template_input_ngModelChange_27_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 6)(30, "label", 13);
      \u0275\u0275text(31);
      \u0275\u0275pipe(32, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 14)(34, "input", 15);
      \u0275\u0275pipe(35, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function Register_Template_input_ngModelChange_34_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 16);
      \u0275\u0275pipe(37, "translate");
      \u0275\u0275listener("click", function Register_Template_button_click_36_listener() {
        return ctx.togglePasswordVisibility();
      });
      \u0275\u0275text(38);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "p", 17);
      \u0275\u0275text(40);
      \u0275\u0275pipe(41, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "div", 6)(43, "label", 18);
      \u0275\u0275text(44);
      \u0275\u0275pipe(45, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 14)(47, "input", 19);
      \u0275\u0275pipe(48, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function Register_Template_input_ngModelChange_47_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.confirmPassword, $event) || (ctx.confirmPassword = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "button", 16);
      \u0275\u0275pipe(50, "translate");
      \u0275\u0275listener("click", function Register_Template_button_click_49_listener() {
        return ctx.toggleConfirmPasswordVisibility();
      });
      \u0275\u0275text(51);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(52, Register_Conditional_52_Template, 3, 3, "div", 20);
      \u0275\u0275conditionalCreate(53, Register_Conditional_53_Template, 3, 3, "div", 21);
      \u0275\u0275elementStart(54, "button", 22);
      \u0275\u0275conditionalCreate(55, Register_Conditional_55_Template, 3, 3)(56, Register_Conditional_56_Template, 2, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 23)(58, "span");
      \u0275\u0275text(59);
      \u0275\u0275pipe(60, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "div", 24)(62, "p");
      \u0275\u0275text(63);
      \u0275\u0275pipe(64, "translate");
      \u0275\u0275elementStart(65, "a", 25);
      \u0275\u0275text(66);
      \u0275\u0275pipe(67, "translate");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 36, "auth.register.title"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 38, "auth.register.subtitle"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 40, "auth.fields.firstname"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(16, 42, "auth.placeholders.firstname"));
      \u0275\u0275twoWayProperty("ngModel", ctx.firstname);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 44, "auth.fields.lastname"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(22, 46, "auth.placeholders.lastname"));
      \u0275\u0275twoWayProperty("ngModel", ctx.lastname);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(26, 48, "auth.fields.email"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(28, 50, "auth.placeholders.email"));
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(32, 52, "auth.fields.password"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275property("type", ctx.showPassword() ? "text" : "password")("placeholder", \u0275\u0275pipeBind1(35, 54, "auth.placeholders.password"));
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(37, 56, "auth.show_password"));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.showPassword() ? "\u{1F441}\uFE0F" : "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(41, 58, "auth.register.password_hint"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(45, 60, "auth.fields.confirm_password"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275property("type", ctx.showConfirmPassword() ? "text" : "password")("placeholder", \u0275\u0275pipeBind1(48, 62, "auth.placeholders.confirm_password"));
      \u0275\u0275twoWayProperty("ngModel", ctx.confirmPassword);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(50, 64, "auth.show_password"));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.showConfirmPassword() ? "\u{1F441}\uFE0F" : "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage() ? 52 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 53 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 55 : 56);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(60, 66, "auth.or"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(64, 68, "auth.register.have_account"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(67, 70, "auth.register.sign_in"), " ");
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterModule, RouterLink, TranslateModule, TranslatePipe], styles: ['\n\n.auth-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 55px - 200px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-8) var(--space-4);\n  background-color: var(--bg-secondary);\n}\n.auth-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-primary);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10);\n  width: 100%;\n  max-width: 440px;\n  transition: all var(--transition-normal);\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: var(--space-8);\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: var(--text-3xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin-bottom: var(--space-2);\n}\n.auth-subtitle[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--text-primary);\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  font-size: 1rem;\n  font-family: var(--font-primary);\n  color: var(--input-text);\n  background-color: var(--input-bg);\n  border: 2px solid var(--input-border);\n  border-radius: var(--radius-md);\n  transition: all var(--transition-fast);\n  outline: none;\n  min-height: 48px;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-border-focus);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.form-input[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--input-placeholder);\n}\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  padding-right: var(--space-12);\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  width: 44px;\n  height: 44px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: var(--text-xl);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n  transition: color var(--transition-fast);\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n}\n@media (hover: hover) and (pointer: fine) {\n  .password-toggle[_ngcontent-%COMP%]:hover {\n    color: var(--text-primary);\n  }\n}\n.password-toggle[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.checkbox-group[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--space-2);\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  font-size: var(--text-sm);\n  color: var(--text-primary);\n  -webkit-user-select: none;\n  user-select: none;\n  min-height: 44px;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  accent-color: var(--color-primary);\n  flex-shrink: 0;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.error-message[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4);\n  background-color: var(--color-error-light);\n  color: var(--color-error);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-error);\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  font-family: var(--font-primary);\n  color: var(--btn-primary-text);\n  background-color: var(--btn-primary-bg);\n  border: none;\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  transition: all var(--transition-normal);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 48px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background-color: var(--btn-primary-hover);\n    transform: translateY(-1px);\n    box-shadow: var(--shadow-md);\n  }\n}\n.submit-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  flex-shrink: 0;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: var(--space-2);\n}\n.link[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n  padding: var(--space-2) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link[_ngcontent-%COMP%]:hover {\n    color: var(--color-primary);\n    text-decoration: underline;\n  }\n}\n.auth-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: var(--space-6) 0 var(--space-4);\n  color: var(--text-secondary);\n  font-size: var(--text-sm);\n}\n.auth-divider[_ngcontent-%COMP%]::before, \n.auth-divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid var(--border-color);\n}\n.auth-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 var(--space-3);\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: var(--space-2);\n}\n.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.link-primary[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: var(--font-semibold);\n  transition: color var(--transition-fast);\n  padding: var(--space-1) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link-primary[_ngcontent-%COMP%]:hover {\n    color: var(--color-primary-hover);\n    text-decoration: underline;\n  }\n}\n.verification-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--space-4);\n  padding: var(--space-4) 0;\n}\n.icon-wrapper[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background-color: var(--color-success-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.icon-wrapper.success[_ngcontent-%COMP%] {\n  background-color: rgba(6, 122, 69, 0.15);\n}\n.mail-icon[_ngcontent-%COMP%], \n.check-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  color: var(--color-primary);\n  stroke: var(--color-primary);\n}\n.verification-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin: 0;\n}\n.verification-text[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n  max-width: 340px;\n  line-height: 1.6;\n}\n.verification-steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  width: 100%;\n  text-align: left;\n}\n.step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n}\n.step-number[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background-color: var(--color-primary);\n  color: white;\n  font-size: var(--text-sm);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.step[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n  padding-top: var(--space-1);\n  line-height: 1.5;\n}\n.redirect-info[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4);\n  background-color: rgba(6, 122, 69, 0.08);\n  border-radius: var(--radius-md);\n  width: 100%;\n}\n.redirect-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-primary);\n  margin: 0;\n  font-weight: var(--font-medium);\n}\n.form-hint[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--text-secondary);\n  margin-top: var(--space-1);\n  margin-bottom: 0;\n}\n@media (max-width: 768px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: var(--space-4) var(--space-3);\n    align-items: flex-start;\n    padding-top: var(--space-8);\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: var(--space-8) var(--space-6);\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-2xl);\n  }\n  .auth-header[_ngcontent-%COMP%] {\n    margin-bottom: var(--space-6);\n  }\n}\n@media (max-width: 480px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: var(--space-3) var(--space-3);\n    padding-top: var(--space-6);\n    align-items: flex-start;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: var(--space-6) var(--space-4);\n    border-radius: var(--radius-md);\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n  .auth-subtitle[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n  }\n  .auth-form[_ngcontent-%COMP%] {\n    gap: var(--space-4);\n  }\n  .auth-divider[_ngcontent-%COMP%] {\n    margin: var(--space-4) 0 var(--space-3);\n  }\n  .verification-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n  .icon-wrapper[_ngcontent-%COMP%] {\n    width: 64px;\n    height: 64px;\n  }\n  .mail-icon[_ngcontent-%COMP%], \n   .check-icon[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n  }\n}\n@media (max-width: 375px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: var(--space-2) var(--space-2);\n    padding-top: var(--space-4);\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    padding: var(--space-5) var(--space-3);\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: var(--text-lg);\n  }\n  .auth-form[_ngcontent-%COMP%] {\n    gap: var(--space-3);\n  }\n  .step-number[_ngcontent-%COMP%] {\n    width: 24px;\n    height: 24px;\n    font-size: var(--text-xs);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner[_ngcontent-%COMP%] {\n    animation: none;\n    border-top-color: white;\n    opacity: 0.7;\n  }\n  .submit-btn[_ngcontent-%COMP%], \n   .link[_ngcontent-%COMP%], \n   .link-primary[_ngcontent-%COMP%], \n   .password-toggle[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n\n\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-4);\n}\n.form-hint[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--text-secondary);\n  margin-top: var(--space-1);\n  margin-bottom: 0;\n}\n.success-message[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4);\n  background-color: var(--color-success-light);\n  color: var(--color-success);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-success);\n}\n@media (max-width: 640px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: var(--space-4);\n  }\n}\n@media (max-width: 480px) {\n  .auth-form[_ngcontent-%COMP%] {\n    gap: var(--space-3);\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n}\n@media (max-width: 375px) {\n  .auth-form[_ngcontent-%COMP%] {\n    gap: var(--space-2);\n  }\n  .form-hint[_ngcontent-%COMP%] {\n    font-size: 0.6875rem;\n  }\n}\n/*# sourceMappingURL=register.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Register, [{
    type: Component,
    args: [{ selector: "app-register", standalone: true, imports: [FormsModule, RouterModule, TranslateModule], template: `<div class="auth-container">\r
  <div class="auth-card">\r
    <div class="auth-header">\r
      <h1>{{ 'auth.register.title' | translate }}</h1>\r
      <p class="auth-subtitle">{{ 'auth.register.subtitle' | translate }}</p>\r
    </div>\r
\r
    <form class="auth-form" (ngSubmit)="onSubmit()">\r
      <div class="form-row">\r
        <div class="form-group">\r
          <label for="firstname" class="form-label">\r
            {{ 'auth.fields.firstname' | translate }}\r
          </label>\r
          <input\r
            type="text"\r
            id="firstname"\r
            class="form-input"\r
            [placeholder]="'auth.placeholders.firstname' | translate"\r
            [(ngModel)]="firstname"\r
            name="firstname"\r
            [disabled]="isLoading()"\r
            required\r
            autocomplete="given-name"\r
          />\r
        </div>\r
\r
        <div class="form-group">\r
          <label for="lastname" class="form-label">\r
            {{ 'auth.fields.lastname' | translate }}\r
          </label>\r
          <input\r
            type="text"\r
            id="lastname"\r
            class="form-input"\r
            [placeholder]="'auth.placeholders.lastname' | translate"\r
            [(ngModel)]="lastname"\r
            name="lastname"\r
            [disabled]="isLoading()"\r
            required\r
            autocomplete="family-name"\r
          />\r
        </div>\r
      </div>\r
\r
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
        />\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="password" class="form-label">\r
          {{ 'auth.fields.password' | translate }}\r
        </label>\r
        <div class="password-input-wrapper">\r
          <input\r
            [type]="showPassword() ? 'text' : 'password'"\r
            id="password"\r
            class="form-input"\r
            [placeholder]="'auth.placeholders.password' | translate"\r
            [(ngModel)]="password"\r
            name="password"\r
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
        <p class="form-hint">{{ 'auth.register.password_hint' | translate }}</p>\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="confirmPassword" class="form-label">\r
          {{ 'auth.fields.confirm_password' | translate }}\r
        </label>\r
        <div class="password-input-wrapper">\r
          <input\r
            [type]="showConfirmPassword() ? 'text' : 'password'"\r
            id="confirmPassword"\r
            class="form-input"\r
            [placeholder]="'auth.placeholders.confirm_password' | translate"\r
            [(ngModel)]="confirmPassword"\r
            name="confirmPassword"\r
            [disabled]="isLoading()"\r
            required\r
            autocomplete="new-password"\r
          />\r
          <button\r
            type="button"\r
            class="password-toggle"\r
            (click)="toggleConfirmPasswordVisibility()"\r
            [attr.aria-label]="'auth.show_password' | translate"\r
          >\r
            {{ showConfirmPassword() ? '\u{1F441}\uFE0F' : '\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F' }}\r
          </button>\r
        </div>\r
      </div>\r
\r
      @if (successMessage()) {\r
        <div class="success-message">\r
          {{ successMessage() | translate }}\r
        </div>\r
      }\r
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
          {{ 'auth.register.creating_account' | translate }}\r
        } @else {\r
          {{ 'auth.register.button' | translate }}\r
        }\r
      </button>\r
\r
      <div class="auth-divider">\r
        <span>{{ 'auth.or' | translate }}</span>\r
      </div>\r
\r
      <div class="auth-footer">\r
        <p>\r
          {{ 'auth.register.have_account' | translate }}\r
          <a routerLink="/login" class="link-primary">\r
            {{ 'auth.register.sign_in' | translate }}\r
          </a>\r
        </p>\r
      </div>\r
    </form>\r
  </div>\r
</div>\r
`, styles: ['/* src/app/pages/login/login.css */\n.auth-container {\n  min-height: calc(100vh - 55px - 200px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-8) var(--space-4);\n  background-color: var(--bg-secondary);\n}\n.auth-card {\n  background-color: var(--bg-primary);\n  border-radius: var(--radius-lg);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-10);\n  width: 100%;\n  max-width: 440px;\n  transition: all var(--transition-normal);\n}\n.auth-header {\n  text-align: center;\n  margin-bottom: var(--space-8);\n}\n.auth-header h1 {\n  font-size: var(--text-3xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin-bottom: var(--space-2);\n}\n.auth-subtitle {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.form-label {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--text-primary);\n}\n.form-input {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  font-size: 1rem;\n  font-family: var(--font-primary);\n  color: var(--input-text);\n  background-color: var(--input-bg);\n  border: 2px solid var(--input-border);\n  border-radius: var(--radius-md);\n  transition: all var(--transition-fast);\n  outline: none;\n  min-height: 48px;\n  box-sizing: border-box;\n}\n.form-input:focus {\n  border-color: var(--color-border-focus);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.form-input:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.form-input::placeholder {\n  color: var(--input-placeholder);\n}\n.password-input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-input-wrapper .form-input {\n  padding-right: var(--space-12);\n}\n.password-toggle {\n  position: absolute;\n  right: 0;\n  width: 44px;\n  height: 44px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: var(--text-xl);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n  transition: color var(--transition-fast);\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n}\n@media (hover: hover) and (pointer: fine) {\n  .password-toggle:hover {\n    color: var(--text-primary);\n  }\n}\n.password-toggle:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.checkbox-group {\n  flex-direction: row;\n  align-items: center;\n  gap: var(--space-2);\n}\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  font-size: var(--text-sm);\n  color: var(--text-primary);\n  -webkit-user-select: none;\n  user-select: none;\n  min-height: 44px;\n}\n.checkbox-label input[type=checkbox] {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  accent-color: var(--color-primary);\n  flex-shrink: 0;\n}\n.checkbox-label input[type=checkbox]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.error-message {\n  padding: var(--space-3) var(--space-4);\n  background-color: var(--color-error-light);\n  color: var(--color-error);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-error);\n}\n.submit-btn {\n  width: 100%;\n  padding: var(--space-3) var(--space-6);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  font-family: var(--font-primary);\n  color: var(--btn-primary-text);\n  background-color: var(--btn-primary-bg);\n  border: none;\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  transition: all var(--transition-normal);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 48px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .submit-btn:hover:not(:disabled) {\n    background-color: var(--btn-primary-hover);\n    transform: translateY(-1px);\n    box-shadow: var(--shadow-md);\n  }\n}\n.submit-btn:active:not(:disabled) {\n  transform: translateY(0);\n}\n.submit-btn:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.spinner {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  flex-shrink: 0;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-links {\n  display: flex;\n  justify-content: center;\n  margin-top: var(--space-2);\n}\n.link {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n  padding: var(--space-2) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link:hover {\n    color: var(--color-primary);\n    text-decoration: underline;\n  }\n}\n.auth-divider {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: var(--space-6) 0 var(--space-4);\n  color: var(--text-secondary);\n  font-size: var(--text-sm);\n}\n.auth-divider::before,\n.auth-divider::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid var(--border-color);\n}\n.auth-divider span {\n  padding: 0 var(--space-3);\n}\n.auth-footer {\n  text-align: center;\n  margin-top: var(--space-2);\n}\n.auth-footer p {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n}\n.link-primary {\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: var(--font-semibold);\n  transition: color var(--transition-fast);\n  padding: var(--space-1) 0;\n  display: inline-block;\n}\n@media (hover: hover) and (pointer: fine) {\n  .link-primary:hover {\n    color: var(--color-primary-hover);\n    text-decoration: underline;\n  }\n}\n.verification-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--space-4);\n  padding: var(--space-4) 0;\n}\n.icon-wrapper {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background-color: var(--color-success-light);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.icon-wrapper.success {\n  background-color: rgba(6, 122, 69, 0.15);\n}\n.mail-icon,\n.check-icon {\n  width: 40px;\n  height: 40px;\n  color: var(--color-primary);\n  stroke: var(--color-primary);\n}\n.verification-content h1 {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--text-primary);\n  margin: 0;\n}\n.verification-text {\n  font-size: var(--text-base);\n  color: var(--text-secondary);\n  margin: 0;\n  max-width: 340px;\n  line-height: 1.6;\n}\n.verification-steps {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  width: 100%;\n  text-align: left;\n}\n.step {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n}\n.step-number {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background-color: var(--color-primary);\n  color: white;\n  font-size: var(--text-sm);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.step p {\n  font-size: var(--text-sm);\n  color: var(--text-secondary);\n  margin: 0;\n  padding-top: var(--space-1);\n  line-height: 1.5;\n}\n.redirect-info {\n  padding: var(--space-3) var(--space-4);\n  background-color: rgba(6, 122, 69, 0.08);\n  border-radius: var(--radius-md);\n  width: 100%;\n}\n.redirect-info p {\n  font-size: var(--text-sm);\n  color: var(--color-primary);\n  margin: 0;\n  font-weight: var(--font-medium);\n}\n.form-hint {\n  font-size: var(--text-xs);\n  color: var(--text-secondary);\n  margin-top: var(--space-1);\n  margin-bottom: 0;\n}\n@media (max-width: 768px) {\n  .auth-container {\n    padding: var(--space-4) var(--space-3);\n    align-items: flex-start;\n    padding-top: var(--space-8);\n  }\n  .auth-card {\n    padding: var(--space-8) var(--space-6);\n  }\n  .auth-header h1 {\n    font-size: var(--text-2xl);\n  }\n  .auth-header {\n    margin-bottom: var(--space-6);\n  }\n}\n@media (max-width: 480px) {\n  .auth-container {\n    padding: var(--space-3) var(--space-3);\n    padding-top: var(--space-6);\n    align-items: flex-start;\n  }\n  .auth-card {\n    padding: var(--space-6) var(--space-4);\n    border-radius: var(--radius-md);\n  }\n  .auth-header h1 {\n    font-size: var(--text-xl);\n  }\n  .auth-subtitle {\n    font-size: var(--text-sm);\n  }\n  .auth-form {\n    gap: var(--space-4);\n  }\n  .auth-divider {\n    margin: var(--space-4) 0 var(--space-3);\n  }\n  .verification-content h1 {\n    font-size: var(--text-xl);\n  }\n  .icon-wrapper {\n    width: 64px;\n    height: 64px;\n  }\n  .mail-icon,\n  .check-icon {\n    width: 32px;\n    height: 32px;\n  }\n}\n@media (max-width: 375px) {\n  .auth-container {\n    padding: var(--space-2) var(--space-2);\n    padding-top: var(--space-4);\n  }\n  .auth-card {\n    padding: var(--space-5) var(--space-3);\n  }\n  .auth-header h1 {\n    font-size: var(--text-lg);\n  }\n  .auth-form {\n    gap: var(--space-3);\n  }\n  .step-number {\n    width: 24px;\n    height: 24px;\n    font-size: var(--text-xs);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner {\n    animation: none;\n    border-top-color: white;\n    opacity: 0.7;\n  }\n  .submit-btn,\n  .link,\n  .link-primary,\n  .password-toggle {\n    transition: none;\n  }\n}\n\n/* src/app/pages/register/register.css */\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-4);\n}\n.form-hint {\n  font-size: var(--text-xs);\n  color: var(--text-secondary);\n  margin-top: var(--space-1);\n  margin-bottom: 0;\n}\n.success-message {\n  padding: var(--space-3) var(--space-4);\n  background-color: var(--color-success-light);\n  color: var(--color-success);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-success);\n}\n@media (max-width: 640px) {\n  .form-row {\n    grid-template-columns: 1fr;\n    gap: var(--space-4);\n  }\n}\n@media (max-width: 480px) {\n  .auth-form {\n    gap: var(--space-3);\n  }\n  .auth-card {\n    max-width: 100%;\n  }\n}\n@media (max-width: 375px) {\n  .auth-form {\n    gap: var(--space-2);\n  }\n  .form-hint {\n    font-size: 0.6875rem;\n  }\n}\n/*# sourceMappingURL=register.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Register, { className: "Register", filePath: "src/app/pages/register/register.ts", lineNumber: 16 });
})();
export {
  Register
};
//# sourceMappingURL=chunk-BPMGCXX7.js.map
