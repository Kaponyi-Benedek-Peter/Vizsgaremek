import {
  ThemeService
} from "./chunk-BLABTRJ2.js";
import {
  ProductService
} from "./chunk-HFUAAYM2.js";
import {
  HERO_SLIDES,
  ICONS,
  IMAGES,
  LANGUAGE_OPTIONS
} from "./chunk-YD7FXNWO.js";
import {
  CartService,
  CurrencyService,
  takeUntilDestroyed,
  toSignal
} from "./chunk-NJHE25JR.js";
import {
  AuthService,
  ToastService
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
  ActivatedRoute,
  HttpClient,
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  environment,
  provideHttpClient,
  provideRouter,
  withComponentInputBinding,
  withInterceptors
} from "./chunk-GK2QC6TC.js";
import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  Input,
  Output,
  Pipe,
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  __async,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  effect,
  filter,
  inject,
  map,
  of,
  provideTranslateService,
  setClassMetadata,
  signal,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WLHV2EEC.js";

// node_modules/@ngx-translate/http-loader/fesm2022/ngx-translate-http-loader.mjs
var TranslateHttpLoader = class _TranslateHttpLoader {
  http;
  prefix;
  suffix;
  constructor(http, prefix = "/assets/i18n/", suffix = ".json") {
    this.http = http;
    this.prefix = prefix;
    this.suffix = suffix;
  }
  /**
   * Gets the translations from the server
   */
  getTranslation(lang) {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
  static \u0275fac = function TranslateHttpLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslateHttpLoader)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(String), \u0275\u0275inject(String));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TranslateHttpLoader,
    factory: _TranslateHttpLoader.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateHttpLoader, [{
    type: Injectable
  }], () => [{
    type: HttpClient
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }], null);
})();

// src/app/core/interceptors/auth.interceptors.ts
var authInterceptor = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
  const publicEndpoints = [
    "/login_request",
    "/login_promise",
    "/registration_request",
    "/registration_promise",
    "/chpass_request",
    "/chpass_promise",
    "/get_all_products",
    "/get_all_featured_products",
    "/newsletter_subscription",
    "/get_all_product_categories",
    // Forum — public endpoints
    "/get_all_posts",
    "/get_post_by_id",
    "/get_post_by_slug",
    "/get_all_post_categories",
    "/increment_post_view_by_id",
    "/get_post_comments_by_post_id"
  ];
  const isPublicEndpoint = publicEndpoints.some((endpoint) => req.url.includes(endpoint));
  let clonedRequest = req.clone({
    setHeaders: { "Content-Type": "application/json" }
  });
  if (token && !isPublicEndpoint) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  }
  return next(clonedRequest).pipe(catchError((error) => {
    if (error.status === 401) {
      const errorType = error.error?.error;
      if (errorType === "hianyzo_auth_header" && !isPublicEndpoint || errorType === "hibas_token") {
        const message = errorType === "hibas_token" ? "session_expired" : void 0;
        window.dispatchEvent(new CustomEvent("auth:force-logout", { detail: { message } }));
      }
    }
    if (error.status === 403) {
      router.navigate(["/login"]);
    }
    return throwError(() => error);
  }));
};

// src/app/shared/components/slide/slide.ts
var _c0 = (a0) => ({ number: a0 });
var _forTrack0 = ($index, $item) => $item.image;
function Slide_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "img", 18);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275element(3, "div", 19);
    \u0275\u0275elementStart(4, "div", 20)(5, "div", 21)(6, "span", 22);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "h2", 23);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 24);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "a", 25);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementStart(18, "span", 26);
    \u0275\u0275text(19, "\u2192");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const slide_r1 = ctx.$implicit;
    const \u0275$index_14_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.isActive(\u0275$index_14_r2))("prev", ctx_r2.isPrevious(\u0275$index_14_r2));
    \u0275\u0275advance();
    \u0275\u0275property("src", slide_r1.image, \u0275\u0275sanitizeUrl)("alt", \u0275\u0275pipeBind2(2, 14, "slider.slide_alt", \u0275\u0275pureFunction1(25, _c0, \u0275$index_14_r2 + 1)))("loading", \u0275$index_14_r2 === 0 ? "eager" : "lazy");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("visible", ctx_r2.isActive(\u0275$index_14_r2));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 17, "slider.badge"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 19, slide_r1.title));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 21, slide_r1.subtitle));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", slide_r1.link);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 23, slide_r1.cta), " ");
  }
}
function Slide_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("click", function Slide_For_21_Template_button_click_0_listener() {
      const \u0275$index_62_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goTo(\u0275$index_62_r5));
    });
    \u0275\u0275element(2, "span", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_62_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.isActive(\u0275$index_62_r5));
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind2(1, 6, "slider.go_to", \u0275\u0275pureFunction1(9, _c0, \u0275$index_62_r5 + 1)))("aria-selected", ctx_r2.isActive(\u0275$index_62_r5));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("animation-duration", ctx_r2.autoplayDuration + "ms");
  }
}
var Slide = class _Slide {
  slides = HERO_SLIDES;
  currentIndex = 0;
  previousIndex = -1;
  isPaused = false;
  autoplayDuration = 5e3;
  intervalId = null;
  ngOnInit() {
    this.startAutoplay();
  }
  ngOnDestroy() {
    this.stopAutoplay();
  }
  startAutoplay() {
    this.stopAutoplay();
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoplayDuration);
  }
  stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  pause() {
    this.isPaused = true;
  }
  resume() {
    this.isPaused = false;
  }
  next() {
    this.previousIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }
  prev() {
    this.previousIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
  goTo(index) {
    if (index === this.currentIndex)
      return;
    this.previousIndex = this.currentIndex;
    this.currentIndex = index;
    this.startAutoplay();
  }
  isActive(index) {
    return this.currentIndex === index;
  }
  isPrevious(index) {
    return this.previousIndex === index;
  }
  static \u0275fac = function Slide_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Slide)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Slide, selectors: [["app-slide"]], decls: 29, vars: 14, consts: [["role", "region", 1, "slider", 3, "mouseenter", "mouseleave"], [1, "blur-edge", "blur-top"], [1, "blur-edge", "blur-bottom"], [1, "blur-edge", "blur-left"], [1, "blur-edge", "blur-right"], [1, "slides"], [1, "slide", 3, "active", "prev"], [1, "arrow", "arrow-left", 3, "click"], [1, "arrow-icon"], [1, "arrow", "arrow-right", 3, "click"], [1, "slider-footer"], ["role", "tablist", 1, "dots"], ["role", "tab", 1, "dot", 3, "active"], [1, "slide-counter"], [1, "counter-current"], [1, "counter-sep"], [1, "counter-total"], [1, "slide"], [1, "slide-img", 3, "src", "alt", "loading"], [1, "slide-overlay"], [1, "slide-content"], [1, "slide-text-wrapper"], [1, "slide-badge"], [1, "slide-title"], [1, "slide-subtitle"], [1, "slide-cta", 3, "routerLink"], [1, "slide-cta-arrow"], ["role", "tab", 1, "dot", 3, "click"], [1, "dot-progress"]], template: function Slide_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275pipe(1, "translate");
      \u0275\u0275listener("mouseenter", function Slide_Template_div_mouseenter_0_listener() {
        return ctx.pause();
      })("mouseleave", function Slide_Template_div_mouseleave_0_listener() {
        return ctx.resume();
      });
      \u0275\u0275element(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4);
      \u0275\u0275elementStart(6, "div", 5);
      \u0275\u0275repeaterCreate(7, Slide_For_8_Template, 20, 27, "div", 6, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 7);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275listener("click", function Slide_Template_button_click_9_listener() {
        return ctx.prev();
      });
      \u0275\u0275elementStart(11, "span", 8);
      \u0275\u0275text(12, "\u2039");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "button", 9);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275listener("click", function Slide_Template_button_click_13_listener() {
        return ctx.next();
      });
      \u0275\u0275elementStart(15, "span", 8);
      \u0275\u0275text(16, "\u203A");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 10)(18, "div", 11);
      \u0275\u0275pipe(19, "translate");
      \u0275\u0275repeaterCreate(20, Slide_For_21_Template, 3, 11, "button", 12, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 13)(23, "span", 14);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span", 15);
      \u0275\u0275text(26, "/");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span", 16);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 6, "slider.aria_label"));
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.slides);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(10, 8, "slider.previous"));
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(14, 10, "slider.next"));
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(19, 12, "slider.navigation"));
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.slides);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate((ctx.currentIndex + 1).toString().padStart(2, "0"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.slides.length.toString().padStart(2, "0"));
    }
  }, dependencies: [TranslateModule, RouterModule, RouterLink, TranslatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.slider[_ngcontent-%COMP%] {\n  z-index: 3 !important;\n  position: relative;\n  width: 100%;\n  height: 500px;\n  min-height: 500px;\n  overflow: hidden;\n  background-color: var(--bg-secondary, #1a2e24);\n}\n.blur-edge[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 6;\n  pointer-events: none;\n}\n.blur-top[_ngcontent-%COMP%] {\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 60px;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0.45) 0%,\n      transparent 100%);\n}\n.blur-bottom[_ngcontent-%COMP%] {\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 80px;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.5) 0%,\n      transparent 100%);\n}\n.blur-left[_ngcontent-%COMP%] {\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100px;\n  background:\n    linear-gradient(\n      to right,\n      rgba(0, 0, 0, 0.4) 0%,\n      transparent 100%);\n}\n.blur-right[_ngcontent-%COMP%] {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 100px;\n  background:\n    linear-gradient(\n      to left,\n      rgba(0, 0, 0, 0.4) 0%,\n      transparent 100%);\n}\n.slides[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.slide[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transition: opacity 0.8s ease;\n}\n.slide.active[_ngcontent-%COMP%] {\n  opacity: 1;\n  z-index: 2;\n}\n.slide.prev[_ngcontent-%COMP%] {\n  opacity: 0;\n  z-index: 1;\n}\n.slide-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n  transform: scale(1.03);\n  transition: transform 6s ease;\n}\n.slide.active[_ngcontent-%COMP%]   .slide-img[_ngcontent-%COMP%] {\n  transform: scale(1);\n}\n.slide-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      105deg,\n      rgba(0, 0, 0, 0.65) 0%,\n      rgba(0, 0, 0, 0.35) 50%,\n      rgba(0, 0, 0, 0.1) 100%);\n}\n.slide-content[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 4;\n  display: flex;\n  align-items: center;\n  padding: 0 8% 60px;\n}\n.slide-text-wrapper[_ngcontent-%COMP%] {\n  max-width: 560px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.slide-badge[_ngcontent-%COMP%], \n.slide-title[_ngcontent-%COMP%], \n.slide-subtitle[_ngcontent-%COMP%], \n.slide-cta[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: translateY(24px);\n  transition: opacity 0.6s ease, transform 0.6s ease;\n}\n.slide-content.visible[_ngcontent-%COMP%]   .slide-badge[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n  transition-delay: 0.15s;\n}\n.slide-content.visible[_ngcontent-%COMP%]   .slide-title[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n  transition-delay: 0.3s;\n}\n.slide-content.visible[_ngcontent-%COMP%]   .slide-subtitle[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n  transition-delay: 0.45s;\n}\n.slide-content.visible[_ngcontent-%COMP%]   .slide-cta[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n  transition-delay: 0.6s;\n}\n.slide-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(6, 122, 69, 0.85);\n  color: #fff;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  padding: 5px 12px;\n  border-radius: 20px;\n  width: fit-content;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.slide-title[_ngcontent-%COMP%] {\n  font-size: clamp(1.8rem, 3.5vw, 2.8rem);\n  font-weight: 800;\n  color: #ffffff;\n  line-height: 1.15;\n  letter-spacing: -0.02em;\n  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);\n}\n.slide-subtitle[_ngcontent-%COMP%] {\n  font-size: clamp(0.95rem, 1.5vw, 1.1rem);\n  color: rgba(255, 255, 255, 0.88);\n  line-height: 1.6;\n  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);\n  max-width: 440px;\n}\n.slide-cta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--color-primary, #067a45);\n  color: #fff;\n  text-decoration: none;\n  font-size: 0.95rem;\n  font-weight: 700;\n  padding: 13px 26px;\n  border-radius: 10px;\n  width: fit-content;\n  margin-top: 4px;\n  box-shadow: 0 4px 20px rgba(6, 122, 69, 0.45);\n  transition:\n    background 0.25s ease,\n    transform 0.2s ease,\n    box-shadow 0.25s ease;\n}\n.slide-cta[_ngcontent-%COMP%]:hover {\n  background: #055c35;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 28px rgba(6, 122, 69, 0.6);\n}\n.slide-cta-arrow[_ngcontent-%COMP%] {\n  transition: transform 0.25s ease;\n  font-size: 1.1rem;\n}\n.slide-cta[_ngcontent-%COMP%]:hover   .slide-cta-arrow[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 10;\n  background: rgba(255, 255, 255, 0.12);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 50%;\n  width: 52px;\n  height: 52px;\n  cursor: pointer;\n  transition: all 0.25s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.arrow[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.28);\n  border-color: rgba(255, 255, 255, 0.5);\n  transform: translateY(-50%) scale(1.08);\n}\n.arrow[_ngcontent-%COMP%]:active {\n  transform: translateY(-50%) scale(0.95);\n}\n.arrow-left[_ngcontent-%COMP%] {\n  left: 22px;\n}\n.arrow-right[_ngcontent-%COMP%] {\n  right: 22px;\n}\n.arrow-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  font-weight: 300;\n  color: white;\n  line-height: 1;\n  -webkit-user-select: none;\n  user-select: none;\n  padding-bottom: 3px;\n}\n.slider-footer[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 22px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.dots[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.dot[_ngcontent-%COMP%] {\n  position: relative;\n  width: 36px;\n  height: 4px;\n  border-radius: 2px;\n  background: rgba(255, 255, 255, 0.3);\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  transition: background 0.3s ease, width 0.3s ease;\n  overflow: hidden;\n}\n.dot.active[_ngcontent-%COMP%] {\n  width: 48px;\n  background: rgba(255, 255, 255, 0.25);\n}\n.dot-progress[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 100%;\n  width: 0%;\n  background: #ffffff;\n  border-radius: 2px;\n}\n.dot.active[_ngcontent-%COMP%]   .dot-progress[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_dotProgress linear forwards;\n}\n@keyframes _ngcontent-%COMP%_dotProgress {\n  from {\n    width: 0%;\n  }\n  to {\n    width: 100%;\n  }\n}\n.slide-counter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 3px;\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 0.78rem;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-variant-numeric: tabular-nums;\n}\n.counter-current[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.counter-sep[_ngcontent-%COMP%] {\n  margin: 0 1px;\n  opacity: 0.5;\n}\n@media (max-width: 768px) {\n  .slider[_ngcontent-%COMP%] {\n    z-index: 3 !important;\n    height: 420px;\n  }\n  .slide-content[_ngcontent-%COMP%] {\n    padding: 0 5% 55px;\n    align-items: flex-end;\n  }\n  .slide-text-wrapper[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .blur-left[_ngcontent-%COMP%], \n   .blur-right[_ngcontent-%COMP%] {\n    width: 60px;\n  }\n  .arrow[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n  .arrow-icon[_ngcontent-%COMP%] {\n    font-size: 30px;\n  }\n  .arrow-left[_ngcontent-%COMP%] {\n    left: 10px;\n  }\n  .arrow-right[_ngcontent-%COMP%] {\n    right: 10px;\n  }\n}\n@media (max-width: 480px) {\n  .slider[_ngcontent-%COMP%] {\n    z-index: 3 !important;\n    height: 340px;\n  }\n  .blur-top[_ngcontent-%COMP%] {\n    height: 50px;\n  }\n  .blur-bottom[_ngcontent-%COMP%] {\n    height: 70px;\n  }\n  .blur-left[_ngcontent-%COMP%], \n   .blur-right[_ngcontent-%COMP%] {\n    width: 40px;\n  }\n  .slide-badge[_ngcontent-%COMP%] {\n    font-size: 0.65rem;\n  }\n  .slide-cta[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    padding: 10px 18px;\n  }\n  .arrow[_ngcontent-%COMP%] {\n    width: 34px;\n    height: 34px;\n  }\n  .arrow-icon[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .dots[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .dot[_ngcontent-%COMP%] {\n    width: 28px;\n  }\n  .dot.active[_ngcontent-%COMP%] {\n    width: 36px;\n  }\n  .slide-counter[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.arrow[_ngcontent-%COMP%]:focus-visible, \n.dot[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-primary, #067a45);\n  outline-offset: 3px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .slide[_ngcontent-%COMP%], \n   .slide-img[_ngcontent-%COMP%], \n   .slide-badge[_ngcontent-%COMP%], \n   .slide-title[_ngcontent-%COMP%], \n   .slide-subtitle[_ngcontent-%COMP%], \n   .slide-cta[_ngcontent-%COMP%], \n   .arrow[_ngcontent-%COMP%], \n   .dot[_ngcontent-%COMP%], \n   .dot-progress[_ngcontent-%COMP%] {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=slide.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Slide, [{
    type: Component,
    args: [{ selector: "app-slide", standalone: true, imports: [TranslateModule, RouterModule], template: `<div\r
  class="slider"\r
  (mouseenter)="pause()"\r
  (mouseleave)="resume()"\r
  role="region"\r
  [attr.aria-label]="'slider.aria_label' | translate"\r
>\r
  <div class="blur-edge blur-top"></div>\r
  <div class="blur-edge blur-bottom"></div>\r
  <div class="blur-edge blur-left"></div>\r
  <div class="blur-edge blur-right"></div>\r
\r
  <div class="slides">\r
    @for (slide of slides; track slide.image; let i = $index) {\r
      <div class="slide" [class.active]="isActive(i)" [class.prev]="isPrevious(i)">\r
        <img\r
          [src]="slide.image"\r
          [alt]="'slider.slide_alt' | translate: { number: i + 1 }"\r
          class="slide-img"\r
          [loading]="i === 0 ? 'eager' : 'lazy'"\r
        />\r
\r
        <div class="slide-overlay"></div>\r
\r
        <div class="slide-content" [class.visible]="isActive(i)">\r
          <div class="slide-text-wrapper">\r
            <span class="slide-badge">{{ 'slider.badge' | translate }}</span>\r
            <h2 class="slide-title">{{ slide.title | translate }}</h2>\r
            <p class="slide-subtitle">{{ slide.subtitle | translate }}</p>\r
            <a [routerLink]="slide.link" class="slide-cta">\r
              {{ slide.cta | translate }}\r
              <span class="slide-cta-arrow">\u2192</span>\r
            </a>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
\r
  <button\r
    class="arrow arrow-left"\r
    (click)="prev()"\r
    [attr.aria-label]="'slider.previous' | translate"\r
  >\r
    <span class="arrow-icon">\u2039</span>\r
  </button>\r
\r
  <button class="arrow arrow-right" (click)="next()" [attr.aria-label]="'slider.next' | translate">\r
    <span class="arrow-icon">\u203A</span>\r
  </button>\r
\r
  <div class="slider-footer">\r
    <div class="dots" role="tablist" [attr.aria-label]="'slider.navigation' | translate">\r
      @for (slide of slides; track slide.image; let i = $index) {\r
        <button\r
          class="dot"\r
          [class.active]="isActive(i)"\r
          (click)="goTo(i)"\r
          [attr.aria-label]="'slider.go_to' | translate: { number: i + 1 }"\r
          [attr.aria-selected]="isActive(i)"\r
          role="tab"\r
        >\r
          <span class="dot-progress" [style.animation-duration]="autoplayDuration + 'ms'"></span>\r
        </button>\r
      }\r
    </div>\r
\r
    <div class="slide-counter">\r
      <span class="counter-current">{{ (currentIndex + 1).toString().padStart(2, '0') }}</span>\r
      <span class="counter-sep">/</span>\r
      <span class="counter-total">{{ slides.length.toString().padStart(2, '0') }}</span>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/shared/components/slide/slide.css */\n:host {\n  display: block;\n  width: 100%;\n}\n.slider {\n  z-index: 3 !important;\n  position: relative;\n  width: 100%;\n  height: 500px;\n  min-height: 500px;\n  overflow: hidden;\n  background-color: var(--bg-secondary, #1a2e24);\n}\n.blur-edge {\n  position: absolute;\n  z-index: 6;\n  pointer-events: none;\n}\n.blur-top {\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 60px;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0.45) 0%,\n      transparent 100%);\n}\n.blur-bottom {\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 80px;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.5) 0%,\n      transparent 100%);\n}\n.blur-left {\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100px;\n  background:\n    linear-gradient(\n      to right,\n      rgba(0, 0, 0, 0.4) 0%,\n      transparent 100%);\n}\n.blur-right {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 100px;\n  background:\n    linear-gradient(\n      to left,\n      rgba(0, 0, 0, 0.4) 0%,\n      transparent 100%);\n}\n.slides {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.slide {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transition: opacity 0.8s ease;\n}\n.slide.active {\n  opacity: 1;\n  z-index: 2;\n}\n.slide.prev {\n  opacity: 0;\n  z-index: 1;\n}\n.slide-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n  transform: scale(1.03);\n  transition: transform 6s ease;\n}\n.slide.active .slide-img {\n  transform: scale(1);\n}\n.slide-overlay {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      105deg,\n      rgba(0, 0, 0, 0.65) 0%,\n      rgba(0, 0, 0, 0.35) 50%,\n      rgba(0, 0, 0, 0.1) 100%);\n}\n.slide-content {\n  position: absolute;\n  inset: 0;\n  z-index: 4;\n  display: flex;\n  align-items: center;\n  padding: 0 8% 60px;\n}\n.slide-text-wrapper {\n  max-width: 560px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.slide-badge,\n.slide-title,\n.slide-subtitle,\n.slide-cta {\n  opacity: 0;\n  transform: translateY(24px);\n  transition: opacity 0.6s ease, transform 0.6s ease;\n}\n.slide-content.visible .slide-badge {\n  opacity: 1;\n  transform: translateY(0);\n  transition-delay: 0.15s;\n}\n.slide-content.visible .slide-title {\n  opacity: 1;\n  transform: translateY(0);\n  transition-delay: 0.3s;\n}\n.slide-content.visible .slide-subtitle {\n  opacity: 1;\n  transform: translateY(0);\n  transition-delay: 0.45s;\n}\n.slide-content.visible .slide-cta {\n  opacity: 1;\n  transform: translateY(0);\n  transition-delay: 0.6s;\n}\n.slide-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(6, 122, 69, 0.85);\n  color: #fff;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  padding: 5px 12px;\n  border-radius: 20px;\n  width: fit-content;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.slide-title {\n  font-size: clamp(1.8rem, 3.5vw, 2.8rem);\n  font-weight: 800;\n  color: #ffffff;\n  line-height: 1.15;\n  letter-spacing: -0.02em;\n  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);\n}\n.slide-subtitle {\n  font-size: clamp(0.95rem, 1.5vw, 1.1rem);\n  color: rgba(255, 255, 255, 0.88);\n  line-height: 1.6;\n  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);\n  max-width: 440px;\n}\n.slide-cta {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--color-primary, #067a45);\n  color: #fff;\n  text-decoration: none;\n  font-size: 0.95rem;\n  font-weight: 700;\n  padding: 13px 26px;\n  border-radius: 10px;\n  width: fit-content;\n  margin-top: 4px;\n  box-shadow: 0 4px 20px rgba(6, 122, 69, 0.45);\n  transition:\n    background 0.25s ease,\n    transform 0.2s ease,\n    box-shadow 0.25s ease;\n}\n.slide-cta:hover {\n  background: #055c35;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 28px rgba(6, 122, 69, 0.6);\n}\n.slide-cta-arrow {\n  transition: transform 0.25s ease;\n  font-size: 1.1rem;\n}\n.slide-cta:hover .slide-cta-arrow {\n  transform: translateX(4px);\n}\n.arrow {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 10;\n  background: rgba(255, 255, 255, 0.12);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 50%;\n  width: 52px;\n  height: 52px;\n  cursor: pointer;\n  transition: all 0.25s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.arrow:hover {\n  background: rgba(255, 255, 255, 0.28);\n  border-color: rgba(255, 255, 255, 0.5);\n  transform: translateY(-50%) scale(1.08);\n}\n.arrow:active {\n  transform: translateY(-50%) scale(0.95);\n}\n.arrow-left {\n  left: 22px;\n}\n.arrow-right {\n  right: 22px;\n}\n.arrow-icon {\n  font-size: 36px;\n  font-weight: 300;\n  color: white;\n  line-height: 1;\n  -webkit-user-select: none;\n  user-select: none;\n  padding-bottom: 3px;\n}\n.slider-footer {\n  position: absolute;\n  bottom: 22px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.dots {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.dot {\n  position: relative;\n  width: 36px;\n  height: 4px;\n  border-radius: 2px;\n  background: rgba(255, 255, 255, 0.3);\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  transition: background 0.3s ease, width 0.3s ease;\n  overflow: hidden;\n}\n.dot.active {\n  width: 48px;\n  background: rgba(255, 255, 255, 0.25);\n}\n.dot-progress {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 100%;\n  width: 0%;\n  background: #ffffff;\n  border-radius: 2px;\n}\n.dot.active .dot-progress {\n  animation: dotProgress linear forwards;\n}\n@keyframes dotProgress {\n  from {\n    width: 0%;\n  }\n  to {\n    width: 100%;\n  }\n}\n.slide-counter {\n  display: flex;\n  align-items: baseline;\n  gap: 3px;\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 0.78rem;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-variant-numeric: tabular-nums;\n}\n.counter-current {\n  color: #fff;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.counter-sep {\n  margin: 0 1px;\n  opacity: 0.5;\n}\n@media (max-width: 768px) {\n  .slider {\n    z-index: 3 !important;\n    height: 420px;\n  }\n  .slide-content {\n    padding: 0 5% 55px;\n    align-items: flex-end;\n  }\n  .slide-text-wrapper {\n    gap: 12px;\n  }\n  .blur-left,\n  .blur-right {\n    width: 60px;\n  }\n  .arrow {\n    width: 40px;\n    height: 40px;\n  }\n  .arrow-icon {\n    font-size: 30px;\n  }\n  .arrow-left {\n    left: 10px;\n  }\n  .arrow-right {\n    right: 10px;\n  }\n}\n@media (max-width: 480px) {\n  .slider {\n    z-index: 3 !important;\n    height: 340px;\n  }\n  .blur-top {\n    height: 50px;\n  }\n  .blur-bottom {\n    height: 70px;\n  }\n  .blur-left,\n  .blur-right {\n    width: 40px;\n  }\n  .slide-badge {\n    font-size: 0.65rem;\n  }\n  .slide-cta {\n    font-size: 0.85rem;\n    padding: 10px 18px;\n  }\n  .arrow {\n    width: 34px;\n    height: 34px;\n  }\n  .arrow-icon {\n    font-size: 24px;\n  }\n  .dots {\n    gap: 6px;\n  }\n  .dot {\n    width: 28px;\n  }\n  .dot.active {\n    width: 36px;\n  }\n  .slide-counter {\n    display: none;\n  }\n}\n.arrow:focus-visible,\n.dot:focus-visible {\n  outline: 2px solid var(--color-primary, #067a45);\n  outline-offset: 3px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .slide,\n  .slide-img,\n  .slide-badge,\n  .slide-title,\n  .slide-subtitle,\n  .slide-cta,\n  .arrow,\n  .dot,\n  .dot-progress {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=slide.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Slide, { className: "Slide", filePath: "src/app/shared/components/slide/slide.ts", lineNumber: 13 });
})();

// src/app/shared/components/featured/featured.ts
var _c02 = ["*"];
var Featured = class _Featured {
  showAll = signal(false, ...ngDevMode ? [{ debugName: "showAll" }] : []);
  toggleShowAll() {
    this.showAll.set(!this.showAll());
  }
  static \u0275fac = function Featured_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Featured)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Featured, selectors: [["app-featured"]], ngContentSelectors: _c02, decls: 13, vars: 10, consts: [[1, "featured-section"], [1, "featured-header"], [1, "section-title"], [1, "featured-products-grid"], [1, "featured-show-more"], [1, "show-more-btn", 3, "click"], [1, "show-more-arrow"]], template: function Featured_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "section", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(5, "div", 3);
      \u0275\u0275projection(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "div", 4)(8, "button", 5);
      \u0275\u0275domListener("click", function Featured_Template_button_click_8_listener() {
        return ctx.toggleShowAll();
      });
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275domElementStart(11, "span", 6);
      \u0275\u0275text(12, "\u2193");
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 6, "home.featured.title"));
      \u0275\u0275advance(2);
      \u0275\u0275classProp("show-all", ctx.showAll());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 8, ctx.showAll() ? "home.featured.showLess" : "home.featured.showMore"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("rotated", ctx.showAll());
    }
  }, dependencies: [TranslateModule, TranslatePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.featured-section[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 90%;\n  background-color: var(--color-featured-bg);\n  position: relative;\n  padding: 60px clamp(12px, 3vw, 40px);\n  margin: 0 auto;\n}\n.featured-section[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      var(--color-featured-divider) 10%,\n      var(--color-featured-divider) 90%,\n      transparent 100%);\n}\n.featured-section[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      var(--color-featured-divider) 10%,\n      var(--color-featured-divider) 90%,\n      transparent 100%);\n}\n.featured-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: clamp(32px, 5vw, 60px);\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: "Inconsolata", monospace;\n  font-size: clamp(20px, 3.5vw, 34px);\n  font-weight: 700;\n  letter-spacing: 3px;\n  text-align: center;\n  color: var(--text-primary);\n  text-transform: uppercase;\n  position: relative;\n  margin: 0;\n}\n.section-title[_ngcontent-%COMP%]::after {\n  content: "";\n  display: block;\n  width: 60px;\n  height: 2px;\n  background: var(--color-primary);\n  margin: 12px auto 0;\n}\n.featured-products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: clamp(14px, 2vw, 28px);\n  align-items: stretch;\n}\n.featured-show-more[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (max-width: 1200px) {\n  .featured-products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 900px) {\n  .featured-products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .featured-section[_ngcontent-%COMP%] {\n    padding: 40px 12px;\n  }\n  .featured-products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .featured-section[_ngcontent-%COMP%] {\n    padding: 32px 10px;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    letter-spacing: 2px;\n  }\n  .featured-products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 10px;\n  }\n  .featured-products-grid[_ngcontent-%COMP%]:not(.show-all)    > [_ngcontent-%COMP%]:nth-child(n+5) {\n    display: none;\n  }\n  .featured-show-more[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: center;\n    padding-top: 20px;\n  }\n  .show-more-btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    background: transparent;\n    border: 1.5px solid var(--color-primary);\n    color: var(--color-primary);\n    font-size: 0.9rem;\n    font-weight: 600;\n    padding: 10px 24px;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: all 0.2s ease;\n  }\n  .show-more-btn[_ngcontent-%COMP%]:hover {\n    background: var(--color-primary);\n    color: white;\n  }\n  .show-more-arrow[_ngcontent-%COMP%] {\n    display: inline-block;\n    transition: transform 0.3s ease;\n    font-size: 1rem;\n  }\n  .show-more-arrow.rotated[_ngcontent-%COMP%] {\n    transform: rotate(180deg);\n  }\n}\n@media (max-width: 360px) {\n  .featured-products-grid[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .show-more-arrow[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=featured.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Featured, [{
    type: Component,
    args: [{ selector: "app-featured", standalone: true, imports: [TranslateModule], template: `<section class="featured-section">\r
  <div class="featured-header">\r
    <h2 class="section-title">{{ 'home.featured.title' | translate }}</h2>\r
  </div>\r
\r
  <div class="featured-products-grid" [class.show-all]="showAll()">\r
    <ng-content></ng-content>\r
  </div>\r
\r
  <div class="featured-show-more">\r
    <button class="show-more-btn" (click)="toggleShowAll()">\r
      {{ (showAll() ? 'home.featured.showLess' : 'home.featured.showMore') | translate }}\r
      <span class="show-more-arrow" [class.rotated]="showAll()">\u2193</span>\r
    </button>\r
  </div>\r
</section>\r
`, styles: ['/* src/app/shared/components/featured/featured.css */\n:host {\n  display: block;\n  width: 100%;\n}\n.featured-section {\n  width: 100%;\n  max-width: 90%;\n  background-color: var(--color-featured-bg);\n  position: relative;\n  padding: 60px clamp(12px, 3vw, 40px);\n  margin: 0 auto;\n}\n.featured-section::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      var(--color-featured-divider) 10%,\n      var(--color-featured-divider) 90%,\n      transparent 100%);\n}\n.featured-section::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      var(--color-featured-divider) 10%,\n      var(--color-featured-divider) 90%,\n      transparent 100%);\n}\n.featured-header {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: clamp(32px, 5vw, 60px);\n}\n.section-title {\n  font-family: "Inconsolata", monospace;\n  font-size: clamp(20px, 3.5vw, 34px);\n  font-weight: 700;\n  letter-spacing: 3px;\n  text-align: center;\n  color: var(--text-primary);\n  text-transform: uppercase;\n  position: relative;\n  margin: 0;\n}\n.section-title::after {\n  content: "";\n  display: block;\n  width: 60px;\n  height: 2px;\n  background: var(--color-primary);\n  margin: 12px auto 0;\n}\n.featured-products-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: clamp(14px, 2vw, 28px);\n  align-items: stretch;\n}\n.featured-show-more {\n  display: none;\n}\n@media (max-width: 1200px) {\n  .featured-products-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 900px) {\n  .featured-products-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .featured-section {\n    padding: 40px 12px;\n  }\n  .featured-products-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .featured-section {\n    padding: 32px 10px;\n  }\n  .section-title {\n    letter-spacing: 2px;\n  }\n  .featured-products-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 10px;\n  }\n  .featured-products-grid:not(.show-all) > :nth-child(n+5) {\n    display: none;\n  }\n  .featured-show-more {\n    display: flex;\n    justify-content: center;\n    padding-top: 20px;\n  }\n  .show-more-btn {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    background: transparent;\n    border: 1.5px solid var(--color-primary);\n    color: var(--color-primary);\n    font-size: 0.9rem;\n    font-weight: 600;\n    padding: 10px 24px;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: all 0.2s ease;\n  }\n  .show-more-btn:hover {\n    background: var(--color-primary);\n    color: white;\n  }\n  .show-more-arrow {\n    display: inline-block;\n    transition: transform 0.3s ease;\n    font-size: 1rem;\n  }\n  .show-more-arrow.rotated {\n    transform: rotate(180deg);\n  }\n}\n@media (max-width: 360px) {\n  .featured-products-grid {\n    gap: 8px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .show-more-arrow {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=featured.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Featured, { className: "Featured", filePath: "src/app/shared/components/featured/featured.ts", lineNumber: 12 });
})();

// src/app/shared/pipes/currency.pipe.ts
var CurrencyPipe = class _CurrencyPipe {
  currencyService = inject(CurrencyService);
  transform(value) {
    if (value == null || isNaN(value)) {
      return "";
    }
    return this.currencyService.formatPrice(value);
  }
  static \u0275fac = function CurrencyPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencyPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "appCurrency", type: _CurrencyPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrencyPipe, [{
    type: Pipe,
    args: [{
      name: "appCurrency",
      standalone: true,
      pure: true
    }]
  }], null, null);
})();

// src/app/shared/components/featured-product-card/featured-product-card.ts
function FeaturedProductCard_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("src", ctx_r0.image_url(), \u0275\u0275sanitizeUrl)("alt", ctx_r0.altText());
  }
}
function FeaturedProductCard_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" -", ctx_r0.discount_percentage(), "% ");
  }
}
function FeaturedProductCard_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 7);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275text(2, " \u211E ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275domProperty("title", \u0275\u0275pipeBind1(1, 1, "product.requires_prescription"));
  }
}
function FeaturedProductCard_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3);
    \u0275\u0275conditionalCreate(1, FeaturedProductCard_Conditional_3_Conditional_1_Template, 2, 1, "span", 6);
    \u0275\u0275conditionalCreate(2, FeaturedProductCard_Conditional_3_Conditional_2_Template, 3, 3, "span", 7);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.discount_percentage() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.requires_prescription() ? 2 : -1);
  }
}
function FeaturedProductCard_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4)(1, "div", 8);
    \u0275\u0275text(2, "?");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 9);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "product.no_image"));
  }
}
function FeaturedProductCard_Conditional_5_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "appCurrency");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, ctx_r0.oldPrice()), " ");
  }
}
function FeaturedProductCard_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "h3", 10);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 11)(4, "span", 12);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "appCurrency");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, FeaturedProductCard_Conditional_5_Conditional_7_Template, 3, 3, "span", 13);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 14);
    \u0275\u0275domElement(9, "span", 15);
    \u0275\u0275domElementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.productName());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 8, ctx_r0.price()));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.oldPrice() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("featured-stock-in", ctx_r0.in_stock())("featured-stock-out", !ctx_r0.in_stock());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 10, ctx_r0.in_stock() ? "product.in_stock" : "product.out_of_stock"));
  }
}
var FeaturedProductCard = class _FeaturedProductCard {
  product;
  cardClick = new EventEmitter();
  currencyService = inject(CurrencyService);
  translationService = inject(TranslationService);
  currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: this.translationService.getCurrentLanguage()
  });
  productName = computed(() => {
    const lang = this.currentLang();
    if (lang === "hu")
      return this.product?.name_hu || this.product?.name || "";
    if (lang === "de")
      return this.product?.name_de || this.product?.name || "";
    return this.product?.name_en || this.product?.name || "";
  }, ...ngDevMode ? [{ debugName: "productName" }] : []);
  image_url = computed(() => {
    return this.product?.image_url || IMAGES.productDefault;
  }, ...ngDevMode ? [{ debugName: "image_url" }] : []);
  altText = computed(() => {
    const name = this.productName();
    return name || this.translationService.instant("product.product_image");
  }, ...ngDevMode ? [{ debugName: "altText" }] : []);
  price = computed(() => this.currencyService.getDiscountedPrice(this.product), ...ngDevMode ? [{ debugName: "price" }] : []);
  oldPrice = computed(() => this.product?.has_discount ? this.currencyService.getBasePrice(this.product) : null, ...ngDevMode ? [{ debugName: "oldPrice" }] : []);
  in_stock = computed(() => {
    return this.product?.in_stock || false;
  }, ...ngDevMode ? [{ debugName: "in_stock" }] : []);
  discount_percentage = computed(() => {
    return this.product?.discount_percentage || 0;
  }, ...ngDevMode ? [{ debugName: "discount_percentage" }] : []);
  requires_prescription = computed(() => {
    return this.product?.requires_prescription || false;
  }, ...ngDevMode ? [{ debugName: "requires_prescription" }] : []);
  onCardClick() {
    if (this.product) {
      this.cardClick.emit();
    }
  }
  static \u0275fac = function FeaturedProductCard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FeaturedProductCard)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FeaturedProductCard, selectors: [["app-featured-product-card"]], inputs: { product: "product" }, outputs: { cardClick: "cardClick" }, decls: 6, vars: 4, consts: [[1, "featured-product-card", 3, "click"], [1, "featured-product-image-wrapper"], [1, "featured-product-image", 3, "src", "alt"], [1, "featured-badges"], [1, "featured-product-card-placeholder"], [1, "featured-product-info"], [1, "featured-badge", "featured-badge-discount"], [1, "featured-badge", "featured-badge-prescription", 3, "title"], [1, "featured-placeholder-icon"], [1, "featured-placeholder-text"], [1, "featured-product-name"], [1, "featured-product-price-row"], [1, "featured-product-price"], [1, "featured-product-old-price"], [1, "featured-product-stock"], [1, "featured-stock-indicator"]], template: function FeaturedProductCard_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domListener("click", function FeaturedProductCard_Template_div_click_0_listener() {
        return ctx.onCardClick();
      });
      \u0275\u0275domElementStart(1, "div", 1);
      \u0275\u0275conditionalCreate(2, FeaturedProductCard_Conditional_2_Template, 1, 2, "img", 2);
      \u0275\u0275conditionalCreate(3, FeaturedProductCard_Conditional_3_Template, 3, 2, "div", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(4, FeaturedProductCard_Conditional_4_Template, 6, 3, "div", 4);
      \u0275\u0275conditionalCreate(5, FeaturedProductCard_Conditional_5_Template, 13, 12, "div", 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.image_url() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.discount_percentage() || ctx.requires_prescription() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.image_url() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.productName() ? 5 : -1);
    }
  }, dependencies: [TranslateModule, TranslatePipe, CurrencyPipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.featured-product-card[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  height: auto;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);\n  transition:\n    transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1),\n    box-shadow 0.38s cubic-bezier(0.4, 0, 0.2, 1),\n    border-color 0.25s ease;\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  isolation: isolate;\n}\n.featured-product-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(6, 122, 69, 0.07) 0%,\n      rgba(6, 122, 69, 0.03) 40%,\n      transparent 70%);\n  opacity: 0;\n  transition: opacity 0.38s ease;\n  z-index: 0;\n  pointer-events: none;\n}\n.featured-product-card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: -1px;\n  border-radius: 17px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      transparent 60%);\n  opacity: 0;\n  transition: opacity 0.38s ease;\n  z-index: -1;\n  pointer-events: none;\n}\n@media (hover: hover) and (pointer: fine) {\n  .featured-product-card[_ngcontent-%COMP%]:hover {\n    transform: translateY(-10px) scale(1.025);\n    box-shadow:\n      0 20px 40px rgba(6, 122, 69, 0.15),\n      0 8px 16px rgba(0, 0, 0, 0.1),\n      0 2px 4px rgba(0, 0, 0, 0.06);\n    border-color: var(--color-primary);\n  }\n  .featured-product-card[_ngcontent-%COMP%]:hover::before {\n    opacity: 1;\n  }\n  .featured-product-card[_ngcontent-%COMP%]:hover::after {\n    opacity: 0.25;\n  }\n  .featured-product-card[_ngcontent-%COMP%]:hover   .featured-product-image[_ngcontent-%COMP%] {\n    transform: scale(1.07) translateY(-2px);\n    filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15));\n  }\n  .featured-product-card[_ngcontent-%COMP%]:hover   .featured-product-name[_ngcontent-%COMP%] {\n    color: var(--color-primary);\n  }\n}\n@media (hover: none) {\n  .featured-product-card[_ngcontent-%COMP%]:active {\n    transform: scale(0.985);\n    border-color: var(--color-primary);\n    box-shadow: 0 8px 20px rgba(6, 122, 69, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);\n  }\n}\n.featured-product-image-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 220px;\n  background: var(--color-surface-elevated);\n  border-bottom: 1px solid var(--color-border);\n  overflow: hidden;\n  padding: 20px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  z-index: 1;\n}\n.featured-product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n  transition: transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1), filter 0.38s ease;\n}\n.featured-product-card-placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 220px;\n  flex-shrink: 0;\n  background: var(--color-surface-elevated);\n  border-bottom: 1px solid var(--color-border);\n  color: var(--text-secondary);\n  gap: 16px;\n  z-index: 1;\n}\n.featured-placeholder-icon[_ngcontent-%COMP%] {\n  width: 70px;\n  height: 70px;\n  border: 3px solid var(--text-secondary);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 36px;\n  font-weight: 700;\n  opacity: 0.35;\n  font-family: "Inconsolata", monospace;\n}\n.featured-placeholder-text[_ngcontent-%COMP%] {\n  font-family: "Inconsolata", monospace;\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 3px;\n  text-transform: uppercase;\n  opacity: 0.45;\n}\n.featured-badges[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  z-index: 10;\n}\n.featured-badge[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-align: center;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n  color: white;\n  letter-spacing: 0.5px;\n}\n.featured-badge-discount[_ngcontent-%COMP%] {\n  background: var(--color-error);\n}\n.featured-badge-prescription[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.2rem;\n  padding: 0;\n}\n.featured-product-info[_ngcontent-%COMP%] {\n  padding: 18px 16px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  flex: 1;\n  position: relative;\n  z-index: 1;\n}\n.featured-product-name[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.4;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  transition: color 0.25s ease;\n}\n.featured-product-price-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  margin-top: 6px;\n  flex-wrap: wrap;\n}\n.featured-product-price[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--color-primary);\n  letter-spacing: -0.5px;\n}\n.featured-product-old-price[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: var(--text-secondary);\n  text-decoration: line-through;\n}\n.featured-product-stock[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 10px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.featured-stock-in[_ngcontent-%COMP%] {\n  color: var(--color-success);\n}\n.featured-stock-out[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.featured-stock-indicator[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.featured-stock-in[_ngcontent-%COMP%]   .featured-stock-indicator[_ngcontent-%COMP%] {\n  background-color: var(--color-success);\n  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.15);\n  animation: _ngcontent-%COMP%_pulse-stock 2.5s ease-in-out infinite;\n}\n.featured-stock-out[_ngcontent-%COMP%]   .featured-stock-indicator[_ngcontent-%COMP%] {\n  background-color: var(--color-error);\n}\n@keyframes _ngcontent-%COMP%_pulse-stock {\n  0%, 100% {\n    box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.15);\n  }\n  50% {\n    box-shadow: 0 0 0 6px rgba(6, 122, 69, 0.06);\n  }\n}\n@media (max-width: 768px) {\n  .featured-product-image-wrapper[_ngcontent-%COMP%], \n   .featured-product-card-placeholder[_ngcontent-%COMP%] {\n    height: 190px;\n    padding: 14px;\n  }\n  .featured-product-info[_ngcontent-%COMP%] {\n    padding: 14px;\n    gap: 6px;\n  }\n  .featured-product-name[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .featured-product-price[_ngcontent-%COMP%] {\n    font-size: 1.3rem;\n  }\n  .featured-product-old-price[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n}\n@media (max-width: 480px) {\n  .featured-product-card[_ngcontent-%COMP%] {\n    border-radius: 12px;\n  }\n  .featured-product-image-wrapper[_ngcontent-%COMP%], \n   .featured-product-card-placeholder[_ngcontent-%COMP%] {\n    height: 170px;\n    padding: 10px;\n  }\n  .featured-product-info[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .featured-product-name[_ngcontent-%COMP%] {\n    font-size: 0.9375rem;\n  }\n  .featured-product-price[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .featured-stock-indicator[_ngcontent-%COMP%] {\n    width: 7px;\n    height: 7px;\n  }\n  .featured-product-stock[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 320px) {\n  .featured-product-image-wrapper[_ngcontent-%COMP%], \n   .featured-product-card-placeholder[_ngcontent-%COMP%] {\n    height: 150px;\n  }\n  .featured-product-price[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .featured-placeholder-icon[_ngcontent-%COMP%] {\n    width: 52px;\n    height: 52px;\n    font-size: 28px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .featured-product-card[_ngcontent-%COMP%], \n   .featured-product-card[_ngcontent-%COMP%]::before, \n   .featured-product-card[_ngcontent-%COMP%]::after, \n   .featured-product-image[_ngcontent-%COMP%], \n   .featured-product-name[_ngcontent-%COMP%] {\n    transition: none;\n    animation: none;\n  }\n  .featured-stock-in[_ngcontent-%COMP%]   .featured-stock-indicator[_ngcontent-%COMP%] {\n    animation: none;\n    box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.15);\n  }\n}\n/*# sourceMappingURL=featured-product-card.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FeaturedProductCard, [{
    type: Component,
    args: [{ selector: "app-featured-product-card", imports: [TranslateModule, CurrencyPipe], template: `<div class="featured-product-card" (click)="onCardClick()">\r
  <div class="featured-product-image-wrapper">\r
    @if (image_url()) {\r
      <img [src]="image_url()" [alt]="altText()" class="featured-product-image" />\r
    }\r
\r
    @if (discount_percentage() || requires_prescription()) {\r
      <div class="featured-badges">\r
        @if (discount_percentage()) {\r
          <span class="featured-badge featured-badge-discount">\r
            -{{ discount_percentage() }}%\r
          </span>\r
        }\r
        @if (requires_prescription()) {\r
          <span\r
            class="featured-badge featured-badge-prescription"\r
            [title]="'product.requires_prescription' | translate"\r
          >\r
            \u211E\r
          </span>\r
        }\r
      </div>\r
    }\r
  </div>\r
\r
  @if (!image_url()) {\r
    <div class="featured-product-card-placeholder">\r
      <div class="featured-placeholder-icon">?</div>\r
      <div class="featured-placeholder-text">{{ 'product.no_image' | translate }}</div>\r
    </div>\r
  }\r
\r
  @if (productName()) {\r
    <div class="featured-product-info">\r
      <h3 class="featured-product-name">{{ productName() }}</h3>\r
\r
      <div class="featured-product-price-row">\r
        <span class="featured-product-price">{{ price() | appCurrency }}</span>\r
        @if (oldPrice()) {\r
          <span class="featured-product-old-price">\r
            {{ oldPrice() | appCurrency }}\r
          </span>\r
        }\r
      </div>\r
\r
      <div\r
        class="featured-product-stock"\r
        [class.featured-stock-in]="in_stock()"\r
        [class.featured-stock-out]="!in_stock()"\r
      >\r
        <span class="featured-stock-indicator"></span>\r
        <span>{{ (in_stock() ? 'product.in_stock' : 'product.out_of_stock') | translate }}</span>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/shared/components/featured-product-card/featured-product-card.css */\n:host {\n  display: block;\n  min-width: 0;\n}\n.featured-product-card {\n  width: 100%;\n  min-width: 0;\n  height: auto;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);\n  transition:\n    transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1),\n    box-shadow 0.38s cubic-bezier(0.4, 0, 0.2, 1),\n    border-color 0.25s ease;\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  isolation: isolate;\n}\n.featured-product-card::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(6, 122, 69, 0.07) 0%,\n      rgba(6, 122, 69, 0.03) 40%,\n      transparent 70%);\n  opacity: 0;\n  transition: opacity 0.38s ease;\n  z-index: 0;\n  pointer-events: none;\n}\n.featured-product-card::after {\n  content: "";\n  position: absolute;\n  inset: -1px;\n  border-radius: 17px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-primary),\n      transparent 60%);\n  opacity: 0;\n  transition: opacity 0.38s ease;\n  z-index: -1;\n  pointer-events: none;\n}\n@media (hover: hover) and (pointer: fine) {\n  .featured-product-card:hover {\n    transform: translateY(-10px) scale(1.025);\n    box-shadow:\n      0 20px 40px rgba(6, 122, 69, 0.15),\n      0 8px 16px rgba(0, 0, 0, 0.1),\n      0 2px 4px rgba(0, 0, 0, 0.06);\n    border-color: var(--color-primary);\n  }\n  .featured-product-card:hover::before {\n    opacity: 1;\n  }\n  .featured-product-card:hover::after {\n    opacity: 0.25;\n  }\n  .featured-product-card:hover .featured-product-image {\n    transform: scale(1.07) translateY(-2px);\n    filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15));\n  }\n  .featured-product-card:hover .featured-product-name {\n    color: var(--color-primary);\n  }\n}\n@media (hover: none) {\n  .featured-product-card:active {\n    transform: scale(0.985);\n    border-color: var(--color-primary);\n    box-shadow: 0 8px 20px rgba(6, 122, 69, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);\n  }\n}\n.featured-product-image-wrapper {\n  position: relative;\n  width: 100%;\n  height: 220px;\n  background: var(--color-surface-elevated);\n  border-bottom: 1px solid var(--color-border);\n  overflow: hidden;\n  padding: 20px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  z-index: 1;\n}\n.featured-product-image {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n  transition: transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1), filter 0.38s ease;\n}\n.featured-product-card-placeholder {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 220px;\n  flex-shrink: 0;\n  background: var(--color-surface-elevated);\n  border-bottom: 1px solid var(--color-border);\n  color: var(--text-secondary);\n  gap: 16px;\n  z-index: 1;\n}\n.featured-placeholder-icon {\n  width: 70px;\n  height: 70px;\n  border: 3px solid var(--text-secondary);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 36px;\n  font-weight: 700;\n  opacity: 0.35;\n  font-family: "Inconsolata", monospace;\n}\n.featured-placeholder-text {\n  font-family: "Inconsolata", monospace;\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 3px;\n  text-transform: uppercase;\n  opacity: 0.45;\n}\n.featured-badges {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  z-index: 10;\n}\n.featured-badge {\n  padding: 4px 10px;\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-align: center;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n  color: white;\n  letter-spacing: 0.5px;\n}\n.featured-badge-discount {\n  background: var(--color-error);\n}\n.featured-badge-prescription {\n  background: var(--color-primary);\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.2rem;\n  padding: 0;\n}\n.featured-product-info {\n  padding: 18px 16px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  flex: 1;\n  position: relative;\n  z-index: 1;\n}\n.featured-product-name {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.4;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  transition: color 0.25s ease;\n}\n.featured-product-price-row {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  margin-top: 6px;\n  flex-wrap: wrap;\n}\n.featured-product-price {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--color-primary);\n  letter-spacing: -0.5px;\n}\n.featured-product-old-price {\n  font-size: 0.95rem;\n  color: var(--text-secondary);\n  text-decoration: line-through;\n}\n.featured-product-stock {\n  margin-top: auto;\n  padding-top: 10px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.featured-stock-in {\n  color: var(--color-success);\n}\n.featured-stock-out {\n  color: var(--color-error);\n}\n.featured-stock-indicator {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.featured-stock-in .featured-stock-indicator {\n  background-color: var(--color-success);\n  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.15);\n  animation: pulse-stock 2.5s ease-in-out infinite;\n}\n.featured-stock-out .featured-stock-indicator {\n  background-color: var(--color-error);\n}\n@keyframes pulse-stock {\n  0%, 100% {\n    box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.15);\n  }\n  50% {\n    box-shadow: 0 0 0 6px rgba(6, 122, 69, 0.06);\n  }\n}\n@media (max-width: 768px) {\n  .featured-product-image-wrapper,\n  .featured-product-card-placeholder {\n    height: 190px;\n    padding: 14px;\n  }\n  .featured-product-info {\n    padding: 14px;\n    gap: 6px;\n  }\n  .featured-product-name {\n    font-size: 1rem;\n  }\n  .featured-product-price {\n    font-size: 1.3rem;\n  }\n  .featured-product-old-price {\n    font-size: 0.875rem;\n  }\n}\n@media (max-width: 480px) {\n  .featured-product-card {\n    border-radius: 12px;\n  }\n  .featured-product-image-wrapper,\n  .featured-product-card-placeholder {\n    height: 170px;\n    padding: 10px;\n  }\n  .featured-product-info {\n    padding: 12px;\n  }\n  .featured-product-name {\n    font-size: 0.9375rem;\n  }\n  .featured-product-price {\n    font-size: 1.2rem;\n  }\n  .featured-stock-indicator {\n    width: 7px;\n    height: 7px;\n  }\n  .featured-product-stock {\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 320px) {\n  .featured-product-image-wrapper,\n  .featured-product-card-placeholder {\n    height: 150px;\n  }\n  .featured-product-price {\n    font-size: 1.1rem;\n  }\n  .featured-placeholder-icon {\n    width: 52px;\n    height: 52px;\n    font-size: 28px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .featured-product-card,\n  .featured-product-card::before,\n  .featured-product-card::after,\n  .featured-product-image,\n  .featured-product-name {\n    transition: none;\n    animation: none;\n  }\n  .featured-stock-in .featured-stock-indicator {\n    animation: none;\n    box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.15);\n  }\n}\n/*# sourceMappingURL=featured-product-card.css.map */\n'] }]
  }], null, { product: [{
    type: Input
  }], cardClick: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FeaturedProductCard, { className: "FeaturedProductCard", filePath: "src/app/shared/components/featured-product-card/featured-product-card.ts", lineNumber: 16 });
})();

// src/app/shared/directives/scroll-reveal.directive.ts
var ScrollRevealDirective = class _ScrollRevealDirective {
  animationType = "fade-scale";
  animationDelay = 0;
  animationDuration = 600;
  threshold = 0.1;
  autoPlay = false;
  el = inject(ElementRef);
  hasAnimated = false;
  ngOnInit() {
    this.setupElement();
    if (this.autoPlay) {
      setTimeout(() => {
        this.reveal();
      }, 50);
    } else {
      this.checkVisibility();
    }
  }
  setupElement() {
    const element = this.el.nativeElement;
    element.style.opacity = "0";
    element.style.transition = `all ${this.animationDuration}ms ease`;
    element.style.transitionDelay = `${this.animationDelay}ms`;
    switch (this.animationType) {
      case "fade":
        break;
      case "slide-up":
        element.style.transform = "translateY(50px)";
        break;
      case "slide-down":
        element.style.transform = "translateY(-50px)";
        break;
      case "slide-left":
        element.style.transform = "translateX(50px)";
        break;
      case "slide-right":
        element.style.transform = "translateX(-50px)";
        break;
      case "scale":
        element.style.transform = "scale(0.8)";
        break;
      case "fade-scale":
        element.style.transform = "translateY(30px) scale(0.95)";
        break;
    }
  }
  onWindowEvent() {
    if (this.autoPlay) {
      return;
    }
    this.checkVisibility();
  }
  checkVisibility() {
    if (this.hasAnimated) {
      return;
    }
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibilityRatio = visibleHeight / elementHeight;
    if (visibilityRatio >= this.threshold && rect.top < windowHeight) {
      this.reveal();
    }
  }
  reveal() {
    if (this.hasAnimated) {
      return;
    }
    const element = this.el.nativeElement;
    element.style.opacity = "1";
    element.style.transform = "translateY(0) translateX(0) scale(1)";
    this.hasAnimated = true;
  }
  static \u0275fac = function ScrollRevealDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollRevealDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ScrollRevealDirective, selectors: [["", "appScrollReveal", ""]], hostBindings: function ScrollRevealDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("scroll", function ScrollRevealDirective_scroll_HostBindingHandler() {
        return ctx.onWindowEvent();
      }, \u0275\u0275resolveWindow)("resize", function ScrollRevealDirective_resize_HostBindingHandler() {
        return ctx.onWindowEvent();
      }, \u0275\u0275resolveWindow);
    }
  }, inputs: { animationType: "animationType", animationDelay: "animationDelay", animationDuration: "animationDuration", threshold: "threshold", autoPlay: "autoPlay" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollRevealDirective, [{
    type: Directive,
    args: [{
      selector: "[appScrollReveal]",
      standalone: true
    }]
  }], null, { animationType: [{
    type: Input
  }], animationDelay: [{
    type: Input
  }], animationDuration: [{
    type: Input
  }], threshold: [{
    type: Input
  }], autoPlay: [{
    type: Input
  }], onWindowEvent: [{
    type: HostListener,
    args: ["window:scroll", []]
  }, {
    type: HostListener,
    args: ["window:resize", []]
  }] });
})();

// src/app/pages/home/home.ts
var _forTrack02 = ($index, $item) => $item.id;
function Home_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-featured-product-card", 5);
    \u0275\u0275listener("cardClick", function Home_For_14_Template_app_featured_product_card_cardClick_0_listener() {
      const product_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onProductClick(product_r2.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r2 = ctx.$implicit;
    const \u0275$index_21_r4 = ctx.$index;
    \u0275\u0275property("product", product_r2)("animationType", "slide-up")("animationDelay", \u0275$index_21_r4 * 150)("threshold", 0.1);
  }
}
var Home = class _Home {
  router = inject(Router);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  IMAGES = IMAGES;
  ICONS = ICONS;
  featuredProducts = computed(() => this.productService.featuredProducts(), ...ngDevMode ? [{ debugName: "featuredProducts" }] : []);
  ngOnInit() {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      if (params["activate"]) {
        const parts = params["activate"].split(";");
        if (parts.length === 2) {
          const id = parts[0].trim();
          const token = parts[1].trim();
          this.authService.completeRegistration(id, token, true).subscribe({
            next: () => {
              this.router.navigate(["/home"], { replaceUrl: true });
            },
            error: () => {
              this.router.navigate(["/home"], { replaceUrl: true });
            }
          });
        }
      }
    });
    this.productService.loadFeaturedProducts();
  }
  onProductClick(productId) {
    this.router.navigate(["/products", productId]);
  }
  static \u0275fac = function Home_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Home)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Home, selectors: [["app-home"]], decls: 15, vars: 22, consts: [[1, "home"], [1, "hero"], ["appScrollReveal", "", 3, "animationType", "animationDuration", "autoPlay"], ["appScrollReveal", "", 3, "animationType", "animationDelay", "animationDuration", "autoPlay"], ["appScrollReveal", "", 3, "product", "animationType", "animationDelay", "threshold"], ["appScrollReveal", "", 3, "cardClick", "product", "animationType", "animationDelay", "threshold"]], template: function Home_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2", 3);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 3);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(11, "app-slide");
      \u0275\u0275elementStart(12, "app-featured");
      \u0275\u0275repeaterCreate(13, Home_For_14_Template, 1, 4, "app-featured-product-card", 4, _forTrack02);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275styleProp("background-image", "url(" + ctx.IMAGES.heroBg + ")");
      \u0275\u0275advance();
      \u0275\u0275property("animationType", "fade-scale")("animationDuration", 800)("autoPlay", true);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 16, "home.hero.title"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("animationType", "slide-up")("animationDelay", 200)("animationDuration", 800)("autoPlay", true);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 18, "home.hero.subtitle"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("animationType", "fade")("animationDelay", 400)("animationDuration", 800)("autoPlay", true);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 20, "home.hero.description"), " ");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.featuredProducts());
    }
  }, dependencies: [Slide, Featured, FeaturedProductCard, ScrollRevealDirective, TranslateModule, TranslatePipe], styles: ['\n\n.home[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.hero[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  position: relative;\n  width: 100%;\n  min-height: 680px;\n  height: auto;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 60px 24px 80px;\n}\n.hero[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      160deg,\n      rgba(3, 50, 26, 0.78) 0%,\n      rgba(6, 90, 50, 0.62) 50%,\n      rgba(4, 60, 35, 0.8) 100%);\n  z-index: 1;\n}\n.hero[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: -50%;\n  background-image:\n    radial-gradient(\n      circle at 20% 80%,\n      rgba(114, 228, 240, 0.08) 0%,\n      transparent 50%),\n    radial-gradient(\n      circle at 80% 20%,\n      rgba(6, 122, 69, 0.12) 0%,\n      transparent 50%);\n  animation: _ngcontent-%COMP%_heroFloat 12s ease-in-out infinite alternate;\n  z-index: 1;\n  pointer-events: none;\n}\n.hero[_ngcontent-%COMP%]   app-slide[_ngcontent-%COMP%] {\n  width: 100%;\n  display: block;\n}\n@keyframes _ngcontent-%COMP%_heroFloat {\n  0% {\n    transform: translate(0, 0) scale(1);\n  }\n  100% {\n    transform: translate(2%, 3%) scale(1.05);\n  }\n}\n.hero[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n}\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  text-align: center;\n  color: white;\n  margin-bottom: 12px;\n  font-size: clamp(2rem, 5vw, 3.5rem);\n  font-weight: 800;\n  line-height: 1.1;\n  letter-spacing: -0.02em;\n  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 60%,\n      #a8f0c8 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.hero[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  color: rgba(255, 255, 255, 0.88);\n  margin-bottom: 16px;\n  font-size: clamp(1.1rem, 2.5vw, 1.6rem);\n  font-weight: 500;\n  line-height: 1.4;\n  letter-spacing: 0.01em;\n  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);\n}\n.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0 auto 24px;\n  max-width: 760px;\n  padding: 0 20px;\n  color: rgba(255, 255, 255, 0.78);\n  line-height: 1.8;\n  font-size: clamp(0.9rem, 1.5vw, 1.05rem);\n}\n.hero-scroll-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 28px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  z-index: 2;\n  animation: _ngcontent-%COMP%_scrollBounce 2s ease-in-out infinite;\n  opacity: 0.6;\n  color: white;\n  font-size: 0.7rem;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.hero-scroll-indicator[_ngcontent-%COMP%]::after {\n  content: "\\2193";\n  font-size: 1.2rem;\n  animation: _ngcontent-%COMP%_scrollBounce 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_scrollBounce {\n  0%, 100% {\n    transform: translateX(-50%) translateY(0);\n  }\n  50% {\n    transform: translateX(-50%) translateY(6px);\n  }\n}\n@media (max-width: 1024px) {\n  .hero[_ngcontent-%COMP%] {\n    background-attachment: scroll;\n  }\n  .hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    max-width: 600px;\n  }\n}\n@media (max-width: 768px) {\n  .hero[_ngcontent-%COMP%] {\n    min-height: 520px;\n    padding: 40px 20px 64px;\n    align-items: flex-start;\n    background-attachment: scroll;\n  }\n  .hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    text-align: left;\n    font-size: clamp(1.7rem, 6vw, 2.4rem);\n    letter-spacing: -0.01em;\n  }\n  .hero[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    text-align: left;\n    font-size: 1.1rem;\n  }\n  .hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    text-align: left;\n    font-size: 0.95rem;\n    padding: 0;\n    margin: 0 0 16px;\n    max-width: 100%;\n  }\n  .hero-scroll-indicator[_ngcontent-%COMP%] {\n    bottom: 16px;\n  }\n}\n@media (max-width: 480px) {\n  .hero[_ngcontent-%COMP%] {\n    min-height: 440px;\n    padding: 28px 16px 56px;\n  }\n  .hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.7rem;\n  }\n}\n@media (max-width: 375px) {\n  .hero[_ngcontent-%COMP%] {\n    min-height: 380px;\n    padding: 24px 14px 48px;\n  }\n  .hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.4rem;\n  }\n  .hero[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .hero[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n  .hero-scroll-indicator[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .hero[_ngcontent-%COMP%] {\n    background-attachment: scroll;\n  }\n}\n/*# sourceMappingURL=home.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Home, [{
    type: Component,
    args: [{ selector: "app-home", standalone: true, imports: [Slide, Featured, FeaturedProductCard, ScrollRevealDirective, TranslateModule], template: `<div class="home">\r
  <div class="hero" [style.background-image]="'url(' + IMAGES.heroBg + ')'">\r
    <h1 appScrollReveal [animationType]="'fade-scale'" [animationDuration]="800" [autoPlay]="true">\r
      {{ 'home.hero.title' | translate }}\r
    </h1>\r
\r
    <h2\r
      appScrollReveal\r
      [animationType]="'slide-up'"\r
      [animationDelay]="200"\r
      [animationDuration]="800"\r
      [autoPlay]="true"\r
    >\r
      {{ 'home.hero.subtitle' | translate }}\r
    </h2>\r
\r
    <p\r
      appScrollReveal\r
      [animationType]="'fade'"\r
      [animationDelay]="400"\r
      [animationDuration]="800"\r
      [autoPlay]="true"\r
    >\r
      {{ 'home.hero.description' | translate }}\r
    </p>\r
  </div>\r
\r
  <app-slide></app-slide>\r
\r
  <app-featured>\r
    @for (product of featuredProducts(); track product.id; let i = $index) {\r
      <app-featured-product-card\r
        [product]="product"\r
        (cardClick)="onProductClick(product.id)"\r
        appScrollReveal\r
        [animationType]="'slide-up'"\r
        [animationDelay]="i * 150"\r
        [threshold]="0.1"\r
      >\r
      </app-featured-product-card>\r
    }\r
  </app-featured>\r
</div>\r
`, styles: ['/* src/app/pages/home/home.css */\n.home {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.hero {\n  background-color: var(--color-primary);\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  position: relative;\n  width: 100%;\n  min-height: 680px;\n  height: auto;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 60px 24px 80px;\n}\n.hero::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      160deg,\n      rgba(3, 50, 26, 0.78) 0%,\n      rgba(6, 90, 50, 0.62) 50%,\n      rgba(4, 60, 35, 0.8) 100%);\n  z-index: 1;\n}\n.hero::after {\n  content: "";\n  position: absolute;\n  inset: -50%;\n  background-image:\n    radial-gradient(\n      circle at 20% 80%,\n      rgba(114, 228, 240, 0.08) 0%,\n      transparent 50%),\n    radial-gradient(\n      circle at 80% 20%,\n      rgba(6, 122, 69, 0.12) 0%,\n      transparent 50%);\n  animation: heroFloat 12s ease-in-out infinite alternate;\n  z-index: 1;\n  pointer-events: none;\n}\n.hero app-slide {\n  width: 100%;\n  display: block;\n}\n@keyframes heroFloat {\n  0% {\n    transform: translate(0, 0) scale(1);\n  }\n  100% {\n    transform: translate(2%, 3%) scale(1.05);\n  }\n}\n.hero > * {\n  position: relative;\n  z-index: 2;\n}\n.hero h1 {\n  text-align: center;\n  color: white;\n  margin-bottom: 12px;\n  font-size: clamp(2rem, 5vw, 3.5rem);\n  font-weight: 800;\n  line-height: 1.1;\n  letter-spacing: -0.02em;\n  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 60%,\n      #a8f0c8 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.hero h2 {\n  text-align: center;\n  color: rgba(255, 255, 255, 0.88);\n  margin-bottom: 16px;\n  font-size: clamp(1.1rem, 2.5vw, 1.6rem);\n  font-weight: 500;\n  line-height: 1.4;\n  letter-spacing: 0.01em;\n  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);\n}\n.hero p {\n  text-align: center;\n  margin: 0 auto 24px;\n  max-width: 760px;\n  padding: 0 20px;\n  color: rgba(255, 255, 255, 0.78);\n  line-height: 1.8;\n  font-size: clamp(0.9rem, 1.5vw, 1.05rem);\n}\n.hero-scroll-indicator {\n  position: absolute;\n  bottom: 28px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  z-index: 2;\n  animation: scrollBounce 2s ease-in-out infinite;\n  opacity: 0.6;\n  color: white;\n  font-size: 0.7rem;\n  font-weight: 500;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.hero-scroll-indicator::after {\n  content: "\\2193";\n  font-size: 1.2rem;\n  animation: scrollBounce 1.5s ease-in-out infinite;\n}\n@keyframes scrollBounce {\n  0%, 100% {\n    transform: translateX(-50%) translateY(0);\n  }\n  50% {\n    transform: translateX(-50%) translateY(6px);\n  }\n}\n@media (max-width: 1024px) {\n  .hero {\n    background-attachment: scroll;\n  }\n  .hero p {\n    max-width: 600px;\n  }\n}\n@media (max-width: 768px) {\n  .hero {\n    min-height: 520px;\n    padding: 40px 20px 64px;\n    align-items: flex-start;\n    background-attachment: scroll;\n  }\n  .hero h1 {\n    text-align: left;\n    font-size: clamp(1.7rem, 6vw, 2.4rem);\n    letter-spacing: -0.01em;\n  }\n  .hero h2 {\n    text-align: left;\n    font-size: 1.1rem;\n  }\n  .hero p {\n    text-align: left;\n    font-size: 0.95rem;\n    padding: 0;\n    margin: 0 0 16px;\n    max-width: 100%;\n  }\n  .hero-scroll-indicator {\n    bottom: 16px;\n  }\n}\n@media (max-width: 480px) {\n  .hero {\n    min-height: 440px;\n    padding: 28px 16px 56px;\n  }\n  .hero h1 {\n    font-size: 1.7rem;\n  }\n}\n@media (max-width: 375px) {\n  .hero {\n    min-height: 380px;\n    padding: 24px 14px 48px;\n  }\n  .hero h1 {\n    font-size: 1.4rem;\n  }\n  .hero h2 {\n    font-size: 1rem;\n  }\n  .hero p {\n    font-size: 0.85rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .hero::after {\n    animation: none;\n  }\n  .hero-scroll-indicator {\n    animation: none;\n  }\n  .hero {\n    background-attachment: scroll;\n  }\n}\n/*# sourceMappingURL=home.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Home, { className: "Home", filePath: "src/app/pages/home/home.ts", lineNumber: 21 });
})();

// src/app/core/guards/auth.guard.ts
var authGuard = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isUserAuthenticated()) {
    router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
  return authService.checkUserStateGuard().pipe(map((allowed) => {
    if (!allowed) {
      router.navigate(["/login"]);
      return false;
    }
    return true;
  }), catchError(() => {
    router.navigate(["/login"]);
    return of(false);
  }));
};
var adminGuard = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isUserAuthenticated()) {
    router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
  return authService.checkUserStateGuard().pipe(map((allowed) => {
    if (!allowed) {
      router.navigate(["/login"]);
      return false;
    }
    if (!authService.isAdmin()) {
      router.navigate(["/home"]);
      return false;
    }
    return true;
  }), catchError(() => {
    router.navigate(["/home"]);
    return of(false);
  }));
};
var guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isUserAuthenticated()) {
    return router.createUrlTree(["/home"]);
  }
  return true;
};

// src/app/app.routes.ts
var routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: Home },
  {
    path: "forum",
    loadComponent: () => import("./chunk-N2HO3N3P.js").then((m) => m.Forum)
  },
  {
    path: "forum/:id",
    loadComponent: () => import("./chunk-IOBGT5AU.js").then((m) => m.ForumDetail)
  },
  {
    path: "products",
    loadComponent: () => import("./chunk-GT2MWCWD.js").then((m) => m.Products)
  },
  {
    path: "products/:id",
    loadComponent: () => import("./chunk-PQO3S4CD.js").then((m) => m.ProductDetail)
  },
  {
    path: "profile",
    loadComponent: () => import("./chunk-ZKIEGUTH.js").then((m) => m.Profile),
    canActivate: [authGuard]
  },
  {
    path: "purchase",
    loadComponent: () => import("./chunk-WPKASJBF.js").then((m) => m.Purchase),
    canActivate: [authGuard]
  },
  {
    path: "legal",
    loadComponent: () => import("./chunk-B5GHL5BE.js").then((m) => m.Legal)
  },
  {
    path: "admin",
    loadComponent: () => import("./chunk-7LDEEG5J.js").then((m) => m.Admin),
    canActivate: [adminGuard]
  },
  {
    path: "login",
    loadComponent: () => import("./chunk-J6SJVQBW.js").then((m) => m.Login),
    canActivate: [guestGuard]
  },
  {
    path: "register",
    loadComponent: () => import("./chunk-BPMGCXX7.js").then((m) => m.Register),
    canActivate: [guestGuard]
  },
  {
    path: "login-promise",
    loadComponent: () => import("./chunk-4OGPNWGS.js").then((m) => m.LoginPromise)
  },
  {
    path: "registration-promise",
    loadComponent: () => import("./chunk-3S6XSQ4B.js").then((m) => m.RegistrationPromise)
  },
  {
    path: "password-reset-request",
    loadComponent: () => import("./chunk-6LXP57EQ.js").then((m) => m.PasswordResetRequest)
  },
  {
    path: "password-reset",
    loadComponent: () => import("./chunk-CKBLOQS2.js").then((m) => m.PasswordReset)
  },
  {
    path: "delacc-promise",
    loadComponent: () => import("./chunk-SPDZ7DDK.js").then((m) => m.DelaccPromise),
    canActivate: [authGuard]
  },
  {
    path: "**",
    loadComponent: () => import("./chunk-JFRZCWDJ.js").then((m) => m.NotFound)
  }
];

// src/app/app.config.ts
function HttpLoaderFactory(http) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
var appConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideTranslateService({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
};

// src/app/shared/components/primary-btn/primary-btn.ts
var _c03 = ["*"];
var PrimaryBtn = class _PrimaryBtn {
  clicked = new EventEmitter();
  onClick() {
    this.clicked.emit();
  }
  static \u0275fac = function PrimaryBtn_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PrimaryBtn)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PrimaryBtn, selectors: [["app-primary-btn"]], outputs: { clicked: "clicked" }, ngContentSelectors: _c03, decls: 4, vars: 0, consts: [[1, "primary-btn", 3, "click"], [1, "btn-text"], [1, "underline"]], template: function PrimaryBtn_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "button", 0);
      \u0275\u0275domListener("click", function PrimaryBtn_Template_button_click_0_listener() {
        return ctx.onClick();
      });
      \u0275\u0275domElementStart(1, "span", 1);
      \u0275\u0275projection(2);
      \u0275\u0275domElement(3, "span", 2);
      \u0275\u0275domElementEnd()();
    }
  }, styles: ['\n\n.primary-btn[_ngcontent-%COMP%] {\n  height: 30px;\n  padding: 0 16px;\n  min-width: 100px;\n  background: transparent;\n  border: none;\n  color: currentColor;\n  font-family: "Inconsolata", monospace;\n  font-size: clamp(12px, 3vw, 16px);\n  letter-spacing: 0.13em;\n  line-height: 1;\n  font-weight: 500;\n  position: relative;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  transition: color 0.3s ease, opacity 0.2s ease;\n}\n.primary-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.btn-text[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  justify-content: center;\n  z-index: 1;\n}\n.btn-text[_ngcontent-%COMP%]   .underline[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -6px;\n  left: 50%;\n  transform: translateX(-50%);\n  height: 2px;\n  width: 16px;\n  background-color: var(--btn-underline-color, var(--color-accent-bright));\n  transition: width 0.3s ease;\n}\n.primary-btn[_ngcontent-%COMP%]:hover   .btn-text[_ngcontent-%COMP%]   .underline[_ngcontent-%COMP%] {\n  width: calc(100% - 0.13em);\n}\n/*# sourceMappingURL=primary-btn.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrimaryBtn, [{
    type: Component,
    args: [{ selector: "app-primary-btn", standalone: true, imports: [], template: '<button class="primary-btn" (click)="onClick()">\r\n  <span class="btn-text">\r\n    <ng-content></ng-content>\r\n    <span class="underline"></span>\r\n  </span>\r\n</button>\r\n', styles: ['/* src/app/shared/components/primary-btn/primary-btn.css */\n.primary-btn {\n  height: 30px;\n  padding: 0 16px;\n  min-width: 100px;\n  background: transparent;\n  border: none;\n  color: currentColor;\n  font-family: "Inconsolata", monospace;\n  font-size: clamp(12px, 3vw, 16px);\n  letter-spacing: 0.13em;\n  line-height: 1;\n  font-weight: 500;\n  position: relative;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  transition: color 0.3s ease, opacity 0.2s ease;\n}\n.primary-btn:hover {\n  opacity: 0.75;\n}\n.btn-text {\n  position: relative;\n  display: inline-flex;\n  justify-content: center;\n  z-index: 1;\n}\n.btn-text .underline {\n  position: absolute;\n  bottom: -6px;\n  left: 50%;\n  transform: translateX(-50%);\n  height: 2px;\n  width: 16px;\n  background-color: var(--btn-underline-color, var(--color-accent-bright));\n  transition: width 0.3s ease;\n}\n.primary-btn:hover .btn-text .underline {\n  width: calc(100% - 0.13em);\n}\n/*# sourceMappingURL=primary-btn.css.map */\n'] }]
  }], null, { clicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PrimaryBtn, { className: "PrimaryBtn", filePath: "src/app/shared/components/primary-btn/primary-btn.ts", lineNumber: 10 });
})();

// src/app/shared/components/icon-btn/icon-btn.ts
var IconBtn = class _IconBtn {
  iconImg;
  static \u0275fac = function IconBtn_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IconBtn)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _IconBtn, selectors: [["app-icon-btn"]], inputs: { iconImg: "iconImg" }, decls: 2, vars: 1, consts: [[1, "icon-btn"], ["alt", "icon", 1, "icon", 3, "src"]], template: function IconBtn_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "button", 0);
      \u0275\u0275domElement(1, "img", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275domProperty("src", ctx.iconImg, \u0275\u0275sanitizeUrl);
    }
  }, styles: ["\n\n.icon-btn[_ngcontent-%COMP%] {\n  width: 35px;\n  height: 35px;\n  padding: 0px;\n  border-radius: 50%;\n  background-color: #403e3e;\n  border: #f5f0e1 solid 3px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n}\n.icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  display: block;\n  transition: transform 0.2s ease, border 0.2s ease;\n}\n.icon-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(0.95);\n  border: #f5f0e1 solid 3.2px;\n}\n.icon-btn[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n/*# sourceMappingURL=icon-btn.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconBtn, [{
    type: Component,
    args: [{ selector: "app-icon-btn", standalone: true, imports: [], template: '<button class="icon-btn">\r\n  <img [src]="iconImg" alt="icon" class="icon" />\r\n</button>\r\n', styles: ["/* src/app/shared/components/icon-btn/icon-btn.css */\n.icon-btn {\n  width: 35px;\n  height: 35px;\n  padding: 0px;\n  border-radius: 50%;\n  background-color: #403e3e;\n  border: #f5f0e1 solid 3px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n}\n.icon {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  display: block;\n  transition: transform 0.2s ease, border 0.2s ease;\n}\n.icon-btn:hover {\n  transform: scale(0.95);\n  border: #f5f0e1 solid 3.2px;\n}\n.icon-btn:hover img {\n  transform: scale(1.1);\n}\n/*# sourceMappingURL=icon-btn.css.map */\n"] }]
  }], null, { iconImg: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(IconBtn, { className: "IconBtn", filePath: "src/app/shared/components/icon-btn/icon-btn.ts", lineNumber: 10 });
})();

// src/app/shared/components/language-switcher/language-switcher.ts
var _forTrack03 = ($index, $item) => $item.code;
function LanguageSwitcher_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.currentLang.code.toUpperCase());
  }
}
function LanguageSwitcher_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "img", 5);
    \u0275\u0275domListener("error", function LanguageSwitcher_Conditional_4_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onImageError(ctx_r0.currentLang.code));
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("src", ctx_r0.currentLang.flagImage, \u0275\u0275sanitizeUrl)("alt", ctx_r0.currentLang.name);
  }
}
function LanguageSwitcher_Conditional_5_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const lang_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(lang_r4.code.toUpperCase());
  }
}
function LanguageSwitcher_Conditional_5_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "img", 11);
    \u0275\u0275domListener("error", function LanguageSwitcher_Conditional_5_For_3_Conditional_2_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r5);
      const lang_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onImageError(lang_r4.code));
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const lang_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("src", lang_r4.flagImage, \u0275\u0275sanitizeUrl)("alt", lang_r4.name);
  }
}
function LanguageSwitcher_Conditional_5_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 8);
    \u0275\u0275domListener("click", function LanguageSwitcher_Conditional_5_For_3_Template_button_click_0_listener() {
      const lang_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectLanguage(lang_r4.code));
    });
    \u0275\u0275conditionalCreate(1, LanguageSwitcher_Conditional_5_For_3_Conditional_1_Template, 2, 1, "span", 2)(2, LanguageSwitcher_Conditional_5_For_3_Conditional_2_Template, 1, 2, "img", 9);
    \u0275\u0275domElementStart(3, "span", 10);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const lang_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.currentLanguage === lang_r4.code);
    \u0275\u0275advance();
    \u0275\u0275conditional(lang_r4.imageError ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(lang_r4.name);
  }
}
function LanguageSwitcher_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4)(1, "div", 6);
    \u0275\u0275repeaterCreate(2, LanguageSwitcher_Conditional_5_For_3_Template, 5, 4, "button", 7, _forTrack03);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.languages);
  }
}
var LanguageSwitcher = class _LanguageSwitcher {
  elementRef = inject(ElementRef);
  translationService = inject(TranslationService);
  destroyRef = inject(DestroyRef);
  isOpen = false;
  currentLanguage = "en";
  languages = [
    {
      code: "en",
      name: "English",
      flagImage: `${environment.assetsURL}/assets/images/English.webp`,
      imageError: false
    },
    {
      code: "hu",
      name: "Magyar",
      flagImage: `${environment.assetsURL}/assets/images/Hungary.webp`,
      imageError: false
    },
    {
      code: "de",
      name: "Deutsch",
      flagImage: `${environment.assetsURL}/assets/images/German.webp`,
      imageError: false
    }
  ];
  ngOnInit() {
    this.translationService.currentLang$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }
  get currentLang() {
    return this.languages.find((l) => l.code === this.currentLanguage) || this.languages[1];
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  selectLanguage(langCode) {
    this.translationService.setLanguage(langCode);
    this.isOpen = false;
  }
  onImageError(langCode) {
    this.languages = this.languages.map((l) => l.code === langCode ? __spreadProps(__spreadValues({}, l), { imageError: true }) : l);
  }
  onDocumentClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
  onEscapeKey() {
    this.isOpen = false;
  }
  static \u0275fac = function LanguageSwitcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LanguageSwitcher)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LanguageSwitcher, selectors: [["app-language-switcher"]], hostBindings: function LanguageSwitcher_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function LanguageSwitcher_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument)("keydown.escape", function LanguageSwitcher_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 6, vars: 6, consts: [[1, "language-switcher"], [1, "lang-button", 3, "click"], [1, "fallback-text"], [1, "lang-flag-img", 3, "src", "alt"], [1, "lang-dropdown"], [1, "lang-flag-img", 3, "error", "src", "alt"], [1, "lang-list"], [1, "lang-item", 3, "active"], [1, "lang-item", 3, "click"], [1, "lang-item-flag-img", 3, "src", "alt"], [1, "lang-item-name"], [1, "lang-item-flag-img", 3, "error", "src", "alt"]], template: function LanguageSwitcher_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275pipe(2, "translate");
      \u0275\u0275domListener("click", function LanguageSwitcher_Template_button_click_1_listener() {
        return ctx.toggleDropdown();
      });
      \u0275\u0275conditionalCreate(3, LanguageSwitcher_Conditional_3_Template, 2, 1, "span", 2)(4, LanguageSwitcher_Conditional_4_Template, 1, 2, "img", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(5, LanguageSwitcher_Conditional_5_Template, 4, 0, "div", 4);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.isOpen)("aria-label", \u0275\u0275pipeBind1(2, 4, "language.switch"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.currentLang.imageError ? 3 : 4);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isOpen ? 5 : -1);
    }
  }, dependencies: [TranslateModule, TranslatePipe], styles: ['\n\n.language-switcher[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  height: 35px;\n}\n.lang-button[_ngcontent-%COMP%] {\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  background-color: transparent;\n  border: 3px solid white;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  outline: none;\n  padding: 0;\n  overflow: hidden;\n  margin: 0;\n  flex-shrink: 0;\n}\n.lang-button[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.lang-button[_ngcontent-%COMP%]:focus {\n  outline: 3px solid rgba(255, 255, 255, 0.5);\n  outline-offset: 2px;\n}\n.lang-flag-img[_ngcontent-%COMP%] {\n  width: 29px;\n  height: 29px;\n  object-fit: cover;\n  border-radius: 50%;\n  display: block;\n}\n.fallback-text[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 0.875rem;\n  font-weight: bold;\n  line-height: 1;\n}\n.lang-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 192px;\n  max-width: calc(100vw - 40px);\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  z-index: var(--z-modal-backdrop);\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.lang-list[_ngcontent-%COMP%] {\n  padding: 4px 0;\n}\n.lang-item[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  text-align: left;\n  background: none;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  transition: background-color 0.15s ease;\n}\n.lang-item[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n}\n.lang-item.active[_ngcontent-%COMP%] {\n  background-color: #f9fafb;\n}\n.lang-item-flag-img[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  object-fit: cover;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n.lang-item-name[_ngcontent-%COMP%] {\n  color: #1f2937;\n  font-weight: 500;\n  font-size: 0.95rem;\n}\n@media (max-width: 640px) {\n  .lang-dropdown[_ngcontent-%COMP%] {\n    width: 160px;\n  }\n  .lang-item[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n  }\n  .lang-item-name[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .lang-item-flag-img[_ngcontent-%COMP%] {\n    width: 20px;\n    height: 20px;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .lang-button[_ngcontent-%COMP%] {\n    border-color: rgba(255, 255, 255, 0.8);\n  }\n}\n.lang-item-flag-img[src=""][_ngcontent-%COMP%], \n.lang-flag-img[src=""][_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n}\n/*# sourceMappingURL=language-switcher.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LanguageSwitcher, [{
    type: Component,
    args: [{ selector: "app-language-switcher", standalone: true, imports: [TranslateModule], template: `<div class="language-switcher">\r
  <button\r
    class="lang-button"\r
    (click)="toggleDropdown()"\r
    [attr.aria-expanded]="isOpen"\r
    [attr.aria-label]="'language.switch' | translate"\r
  >\r
    @if (currentLang.imageError) {\r
      <span class="fallback-text">{{ currentLang.code.toUpperCase() }}</span>\r
    } @else {\r
      <img\r
        [src]="currentLang.flagImage"\r
        [alt]="currentLang.name"\r
        class="lang-flag-img"\r
        (error)="onImageError(currentLang.code)"\r
      />\r
    }\r
  </button>\r
\r
  @if (isOpen) {\r
    <div class="lang-dropdown">\r
      <div class="lang-list">\r
        @for (lang of languages; track lang.code) {\r
          <button\r
            class="lang-item"\r
            [class.active]="currentLanguage === lang.code"\r
            (click)="selectLanguage(lang.code)"\r
          >\r
            @if (lang.imageError) {\r
              <span class="fallback-text">{{ lang.code.toUpperCase() }}</span>\r
            } @else {\r
              <img\r
                [src]="lang.flagImage"\r
                [alt]="lang.name"\r
                class="lang-item-flag-img"\r
                (error)="onImageError(lang.code)"\r
              />\r
            }\r
            <span class="lang-item-name">{{ lang.name }}</span>\r
          </button>\r
        }\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/shared/components/language-switcher/language-switcher.css */\n.language-switcher {\n  position: relative;\n  display: flex;\n  align-items: center;\n  height: 35px;\n}\n.lang-button {\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  background-color: transparent;\n  border: 3px solid white;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  outline: none;\n  padding: 0;\n  overflow: hidden;\n  margin: 0;\n  flex-shrink: 0;\n}\n.lang-button:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.lang-button:focus {\n  outline: 3px solid rgba(255, 255, 255, 0.5);\n  outline-offset: 2px;\n}\n.lang-flag-img {\n  width: 29px;\n  height: 29px;\n  object-fit: cover;\n  border-radius: 50%;\n  display: block;\n}\n.fallback-text {\n  color: white;\n  font-size: 0.875rem;\n  font-weight: bold;\n  line-height: 1;\n}\n.lang-dropdown {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 192px;\n  max-width: calc(100vw - 40px);\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  z-index: var(--z-modal-backdrop);\n  animation: fadeIn 0.2s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.lang-list {\n  padding: 4px 0;\n}\n.lang-item {\n  width: 100%;\n  padding: 12px 16px;\n  text-align: left;\n  background: none;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  transition: background-color 0.15s ease;\n}\n.lang-item:hover {\n  background-color: #f3f4f6;\n}\n.lang-item.active {\n  background-color: #f9fafb;\n}\n.lang-item-flag-img {\n  width: 24px;\n  height: 24px;\n  object-fit: cover;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n.lang-item-name {\n  color: #1f2937;\n  font-weight: 500;\n  font-size: 0.95rem;\n}\n@media (max-width: 640px) {\n  .lang-dropdown {\n    width: 160px;\n  }\n  .lang-item {\n    padding: 10px 12px;\n  }\n  .lang-item-name {\n    font-size: 0.875rem;\n  }\n  .lang-item-flag-img {\n    width: 20px;\n    height: 20px;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .lang-button {\n    border-color: rgba(255, 255, 255, 0.8);\n  }\n}\n.lang-item-flag-img[src=""],\n.lang-flag-img[src=""] {\n  background-color: #e5e7eb;\n}\n/*# sourceMappingURL=language-switcher.css.map */\n'] }]
  }], null, { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }], onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LanguageSwitcher, { className: "LanguageSwitcher", filePath: "src/app/shared/components/language-switcher/language-switcher.ts", lineNumber: 21 });
})();

// src/app/shared/components/header/header.ts
var _forTrack04 = ($index, $item) => $item.product.id;
function Header_Conditional_15_Conditional_3_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 36);
    \u0275\u0275listener("click", function Header_Conditional_15_Conditional_3_Conditional_15_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.closeUserMenu());
    });
    \u0275\u0275element(1, "img", 29);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.ICONS.admin, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 2, "header.admin"), " ");
  }
}
function Header_Conditional_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "p", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "div", 25);
    \u0275\u0275elementStart(7, "a", 26);
    \u0275\u0275listener("click", function Header_Conditional_15_Conditional_3_Template_a_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeUserMenu());
    });
    \u0275\u0275element(8, "img", 27);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 28);
    \u0275\u0275listener("click", function Header_Conditional_15_Conditional_3_Template_a_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeUserMenu());
    });
    \u0275\u0275element(12, "img", 29);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, Header_Conditional_15_Conditional_3_Conditional_15_Template, 4, 4, "a", 30);
    \u0275\u0275element(16, "div", 25);
    \u0275\u0275elementStart(17, "button", 31);
    \u0275\u0275listener("click", function Header_Conditional_15_Conditional_3_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 32);
    \u0275\u0275element(19, "path", 33)(20, "polyline", 34)(21, "line", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.firstname, " ", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.lastname);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentUser == null ? null : ctx_r1.currentUser.email);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r1.ICONS.user, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 9, "header.my_profile"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r1.ICONS.basket, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 11, "header.my_orders"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isAdmin ? 15 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(23, 13, "header.logout"), " ");
  }
}
function Header_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "app-icon-btn", 20);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275listener("click", function Header_Conditional_15_Template_app_icon_btn_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleUserMenu());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, Header_Conditional_15_Conditional_3_Template, 24, 15, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("iconImg", ctx_r1.ICONS.user);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(2, 3, "header.profile"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showUserMenu() ? 3 : -1);
  }
}
function Header_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-icon-btn", 9);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("iconImg", ctx_r1.ICONS.login);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 2, "header.login"));
  }
}
function Header_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.cartItemCount());
  }
}
function Header_Conditional_22_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275element(1, "img", 40);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.ICONS.basket, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "cart.empty"));
  }
}
function Header_Conditional_22_Conditional_9_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" = ", ctx_r1.currencyService.formatPrice(ctx_r1.currencyService.getDiscountedPrice(item_r7.product) * item_r7.quantity), " ");
  }
}
function Header_Conditional_22_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275element(1, "img", 48);
    \u0275\u0275elementStart(2, "div", 49)(3, "h4", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 51)(6, "span", 52);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, Header_Conditional_22_Conditional_9_For_2_Conditional_8_Template, 2, 1, "span", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 54)(10, "button", 55);
    \u0275\u0275listener("click", function Header_Conditional_22_Conditional_9_For_2_Template_button_click_10_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateQuantity(item_r7.product.id, item_r7.quantity - 1));
    });
    \u0275\u0275text(11, " - ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 56);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 55);
    \u0275\u0275listener("click", function Header_Conditional_22_Conditional_9_For_2_Template_button_click_14_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateQuantity(item_r7.product.id, item_r7.quantity + 1));
    });
    \u0275\u0275text(15, " + ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "button", 57);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275listener("click", function Header_Conditional_22_Conditional_9_For_2_Template_button_click_16_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeFromCart(item_r7.product.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 58);
    \u0275\u0275element(19, "line", 59)(20, "line", 60);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r7.product.image_url, \u0275\u0275sanitizeUrl)("alt", item_r7.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r7.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.currencyService.formatPrice(ctx_r1.currencyService.getDiscountedPrice(item_r7.product)), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r7.quantity > 1 ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", item_r7.quantity <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r7.quantity);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", item_r7.quantity >= item_r7.product.stock_quantity);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(17, 9, "cart.remove"));
  }
}
function Header_Conditional_22_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275repeaterCreate(1, Header_Conditional_22_Conditional_9_For_2_Template, 21, 11, "div", 42, _forTrack04);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 43)(4, "div", 44)(5, "div", 45)(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 46);
    \u0275\u0275listener("click", function Header_Conditional_22_Conditional_9_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearCart());
    });
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 47);
    \u0275\u0275listener("click", function Header_Conditional_22_Conditional_9_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToCheckout());
    });
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.cartItems());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(8, 4, "cart.total"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.currencyService.formatPrice(ctx_r1.cartTotal()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 6, "cart.clear_all"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 8, "cart.checkout"), " ");
  }
}
function Header_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 37)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 38);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, Header_Conditional_22_Conditional_8_Template, 5, 4, "div", 39)(9, Header_Conditional_22_Conditional_9_Template, 17, 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, "cart.title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.cartItemCount(), " ", \u0275\u0275pipeBind1(7, 6, "cart.items"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.cartItems().length === 0 ? 8 : 9);
  }
}
function Header_Conditional_32_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "div", 64);
    \u0275\u0275elementStart(1, "a", 65);
    \u0275\u0275listener("click", function Header_Conditional_32_Conditional_10_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeMobileMenu());
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 66);
    \u0275\u0275listener("click", function Header_Conditional_32_Conditional_10_Template_a_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeMobileMenu());
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 2, "header.my_profile"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 4, "header.my_orders"), " ");
  }
}
function Header_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 19)(1, "a", 61);
    \u0275\u0275listener("click", function Header_Conditional_32_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMobileMenu());
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 62);
    \u0275\u0275listener("click", function Header_Conditional_32_Template_a_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMobileMenu());
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 63);
    \u0275\u0275listener("click", function Header_Conditional_32_Template_a_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeMobileMenu());
    });
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, Header_Conditional_32_Conditional_10_Template, 7, 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 4, "header.home"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 6, "header.forum"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 8, "header.products"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isAuthenticated ? 10 : -1);
  }
}
var Header = class _Header {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  cartService = inject(CartService);
  currencyService = inject(CurrencyService);
  subs = [];
  ICONS = ICONS;
  IMAGES = IMAGES;
  currentTheme = "light";
  isAuthenticated = false;
  isAdmin = false;
  currentUser = null;
  showUserMenu = signal(false, ...ngDevMode ? [{ debugName: "showUserMenu" }] : []);
  showCartDropdown = signal(false, ...ngDevMode ? [{ debugName: "showCartDropdown" }] : []);
  showMobileMenu = signal(false, ...ngDevMode ? [{ debugName: "showMobileMenu" }] : []);
  cartItemCount = computed(() => this.cartService.itemCount(), ...ngDevMode ? [{ debugName: "cartItemCount" }] : []);
  cartItems = computed(() => this.cartService.items(), ...ngDevMode ? [{ debugName: "cartItems" }] : []);
  cartTotal = computed(() => this.cartService.totalPrice(), ...ngDevMode ? [{ debugName: "cartTotal" }] : []);
  ngOnInit() {
    this.subs.push(this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    }), this.authService.authState$.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.currentUser = state.user;
      this.isAdmin = state.role === "admin";
    }));
  }
  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }
  toggleMobileMenu() {
    this.showMobileMenu.update((v) => !v);
    if (this.showMobileMenu()) {
      this.showUserMenu.set(false);
      this.showCartDropdown.set(false);
    }
  }
  closeMobileMenu() {
    this.showMobileMenu.set(false);
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  toggleUserMenu() {
    this.showUserMenu.update((v) => !v);
    if (this.showCartDropdown()) {
      this.showCartDropdown.set(false);
    }
  }
  toggleCartDropdown() {
    this.showCartDropdown.update((v) => !v);
    if (this.showUserMenu()) {
      this.showUserMenu.set(false);
    }
  }
  closeUserMenu() {
    this.showUserMenu.set(false);
  }
  closeCartDropdown() {
    this.showCartDropdown.set(false);
  }
  logout() {
    this.authService.logout();
    this.closeUserMenu();
  }
  removeFromCart(productId) {
    this.cartService.removeFromCart(productId);
  }
  updateQuantity(productId, quantity) {
    this.cartService.updateQuantity(productId, quantity);
  }
  clearCart() {
    this.cartService.clearCart();
  }
  goToCheckout() {
    this.closeCartDropdown();
  }
  onDocumentClick(event) {
    const target = event.target;
    const userMenuWrapper = target.closest(".user-menu-wrapper");
    const cartMenuWrapper = target.closest(".cart-menu-wrapper");
    const mobileMenuWrapper = target.closest(".mobile-menu-wrapper");
    if (!userMenuWrapper && this.showUserMenu()) {
      this.closeUserMenu();
    }
    if (!cartMenuWrapper && this.showCartDropdown()) {
      this.closeCartDropdown();
    }
    if (!mobileMenuWrapper && this.showMobileMenu()) {
      this.closeMobileMenu();
    }
  }
  static \u0275fac = function Header_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Header)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Header, selectors: [["app-header"]], hostBindings: function Header_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function Header_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 33, vars: 32, consts: [[1, "header"], [1, "header-left"], ["routerLink", "/home"], ["alt", "Roy's Shack official logo", 1, "logo", 3, "src"], [1, "header-center"], ["routerLink", "/forum"], ["routerLink", "/products"], [1, "header-right"], [1, "user-menu-wrapper"], ["routerLink", "/login", 3, "iconImg"], [1, "cart-menu-wrapper"], [1, "cart-button", 3, "click"], [3, "iconImg"], [1, "cart-badge"], [1, "cart-dropdown"], [3, "click", "iconImg"], [1, "mobile-menu-wrapper"], [1, "hamburger-btn", 3, "click"], [1, "hamburger-line"], ["role", "navigation", 1, "mobile-dropdown"], [1, "user-menu-trigger", 3, "click", "iconImg"], [1, "user-dropdown"], [1, "user-dropdown-header"], [1, "user-name"], [1, "user-email"], [1, "user-dropdown-divider"], ["routerLink", "/profile", 1, "user-dropdown-item", 3, "click"], ["alt", "profile", 1, "dropdown-icon", 3, "src"], ["routerLink", "/purchase", 1, "user-dropdown-item", 3, "click"], ["alt", "orders", 1, "dropdown-icon", 3, "src"], ["routerLink", "/admin", 1, "user-dropdown-item"], [1, "user-dropdown-item", "logout-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "dropdown-icon"], ["d", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"], ["points", "16 17 21 12 16 7"], ["x1", "21", "y1", "12", "x2", "9", "y2", "12"], ["routerLink", "/admin", 1, "user-dropdown-item", 3, "click"], [1, "cart-dropdown-header"], [1, "cart-item-count"], [1, "cart-empty"], ["alt", "Empty cart", 1, "empty-cart-icon", 3, "src"], [1, "cart-items"], [1, "cart-item"], [1, "cart-dropdown-footer"], [1, "cart-footer-actions"], [1, "cart-total"], [1, "clear-cart-btn", 3, "click"], ["routerLink", "/purchase", 1, "checkout-btn", 3, "click"], [1, "cart-item-image", 3, "src", "alt"], [1, "cart-item-details"], [1, "cart-item-name"], [1, "cart-item-price-row"], [1, "cart-item-unit-price"], [1, "cart-item-line-total"], [1, "cart-item-quantity"], [1, "quantity-btn", 3, "click", "disabled"], [1, "quantity-value"], [1, "remove-item-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], ["routerLink", "/home", 1, "mobile-nav-item", 3, "click"], ["routerLink", "/forum", 1, "mobile-nav-item", 3, "click"], ["routerLink", "/products", 1, "mobile-nav-item", 3, "click"], [1, "mobile-nav-divider"], ["routerLink", "/profile", 1, "mobile-nav-item", 3, "click"], ["routerLink", "/purchase", 1, "mobile-nav-item", 3, "click"]], template: function Header_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "a", 2);
      \u0275\u0275element(3, "img", 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4)(5, "app-primary-btn", 2);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "app-primary-btn", 5);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "app-primary-btn", 6);
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 7);
      \u0275\u0275conditionalCreate(15, Header_Conditional_15_Template, 4, 5, "div", 8)(16, Header_Conditional_16_Template, 2, 4, "app-icon-btn", 9);
      \u0275\u0275elementStart(17, "div", 10)(18, "button", 11);
      \u0275\u0275pipe(19, "translate");
      \u0275\u0275listener("click", function Header_Template_button_click_18_listener() {
        return ctx.toggleCartDropdown();
      });
      \u0275\u0275element(20, "app-icon-btn", 12);
      \u0275\u0275conditionalCreate(21, Header_Conditional_21_Template, 2, 1, "span", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(22, Header_Conditional_22_Template, 10, 8, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "app-icon-btn", 15);
      \u0275\u0275pipe(24, "translate");
      \u0275\u0275listener("click", function Header_Template_app_icon_btn_click_23_listener() {
        return ctx.toggleTheme();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "app-language-switcher");
      \u0275\u0275elementStart(26, "div", 16)(27, "button", 17);
      \u0275\u0275pipe(28, "translate");
      \u0275\u0275listener("click", function Header_Template_button_click_27_listener() {
        return ctx.toggleMobileMenu();
      });
      \u0275\u0275element(29, "span", 18)(30, "span", 18)(31, "span", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(32, Header_Conditional_32_Template, 11, 10, "nav", 19);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("src", ctx.IMAGES.logo, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 20, "header.home"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 22, "header.forum"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 24, "header.products"));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isAuthenticated ? 15 : 16);
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(19, 26, "header.cart"));
      \u0275\u0275advance(2);
      \u0275\u0275property("iconImg", ctx.ICONS.basket);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.cartItemCount() > 0 ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showCartDropdown() ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("iconImg", ctx.currentTheme === "dark" ? ctx.ICONS.sun : ctx.ICONS.moon);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(24, 28, "theme.toggle"));
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(28, 30, "header.menu"))("aria-expanded", ctx.showMobileMenu());
      \u0275\u0275advance(2);
      \u0275\u0275classProp("open", ctx.showMobileMenu());
      \u0275\u0275advance();
      \u0275\u0275classProp("open", ctx.showMobileMenu());
      \u0275\u0275advance();
      \u0275\u0275classProp("open", ctx.showMobileMenu());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showMobileMenu() ? 32 : -1);
    }
  }, dependencies: [PrimaryBtn, IconBtn, RouterModule, RouterLink, LanguageSwitcher, TranslateModule, TranslatePipe], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: var(--z-modal-backdrop);\n  background-color: rgba(6, 122, 69, 0.92);\n  backdrop-filter: blur(12px) saturate(150%);\n  -webkit-backdrop-filter: blur(12px) saturate(150%);\n  border: none;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.12);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);\n  color: var(--color-white);\n  padding: 1rem 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2rem;\n  transition: background-color 0.3s ease, box-shadow 0.3s ease;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  background-color: rgba(15, 30, 22, 0.88);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.07);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\n}\n.header-left[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.logo[_ngcontent-%COMP%] {\n  height: 50px;\n  width: auto;\n  display: block;\n  transition: transform 0.3s ease;\n  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.25));\n}\n.logo[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.header-center[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  flex: 1;\n  justify-content: center;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n  flex-shrink: 0;\n}\n.mobile-menu-wrapper[_ngcontent-%COMP%] {\n  display: none;\n  position: relative;\n}\n.hamburger-btn[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  width: 40px;\n  height: 40px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 6px;\n  transition: background-color 0.2s ease;\n}\n.hamburger-btn[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.15);\n}\n.hamburger-line[_ngcontent-%COMP%] {\n  display: block;\n  width: 22px;\n  height: 2px;\n  background-color: white;\n  border-radius: 2px;\n  transition: all 0.3s ease;\n  transform-origin: center;\n}\n.hamburger-line.open[_ngcontent-%COMP%]:nth-child(1) {\n  transform: translateY(7px) rotate(45deg);\n}\n.hamburger-line.open[_ngcontent-%COMP%]:nth-child(2) {\n  opacity: 0;\n  transform: scaleX(0);\n}\n.hamburger-line.open[_ngcontent-%COMP%]:nth-child(3) {\n  transform: translateY(-7px) rotate(-45deg);\n}\n.mobile-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 10px);\n  right: 0;\n  background-color: var(--bg-primary);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: var(--shadow-lg);\n  min-width: 220px;\n  z-index: var(--z-modal);\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\n  overflow: hidden;\n}\n.mobile-nav-item[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0.85rem 1.25rem;\n  color: var(--text-primary);\n  text-decoration: none;\n  font-size: 0.95rem;\n  font-weight: 500;\n  transition: background-color 0.2s ease;\n}\n.mobile-nav-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-secondary);\n  color: var(--color-primary);\n}\n.mobile-nav-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background-color: var(--border-color);\n  margin: 0.25rem 0;\n}\n.user-menu-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.user-menu-trigger[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.user-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 10px);\n  right: 0;\n  background-color: var(--bg-primary);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: var(--shadow-lg);\n  min-width: 250px;\n  z-index: var(--z-modal);\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .user-dropdown[_ngcontent-%COMP%] {\n  background-color: rgba(20, 35, 28, 0.95);\n}\n.user-dropdown-header[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-bottom: 1px solid var(--border-color);\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0 0 0.25rem 0;\n  font-size: 0.95rem;\n}\n.user-email[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin: 0;\n  font-size: 0.85rem;\n}\n.user-dropdown-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background-color: var(--border-color);\n  margin: 0.5rem 0;\n}\n.user-dropdown-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  color: var(--text-primary);\n  text-decoration: none;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  border: none;\n  background: none;\n  width: 100%;\n  text-align: left;\n  font-size: 0.9rem;\n}\n.user-dropdown-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-secondary);\n}\n.dropdown-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  color: var(--text-secondary);\n}\n.logout-btn[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-error-light);\n}\n.logout-btn[_ngcontent-%COMP%]   .dropdown-icon[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.cart-menu-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.cart-button[_ngcontent-%COMP%] {\n  position: relative;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.cart-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  background-color: #ffffff;\n  color: var(--color-primary);\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.7rem;\n  font-weight: 700;\n  border: 2px solid var(--bg-primary);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);\n  animation: _ngcontent-%COMP%_popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .cart-badge[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: #ffffff;\n}\n@keyframes _ngcontent-%COMP%_popIn {\n  0% {\n    transform: scale(0);\n  }\n  50% {\n    transform: scale(1.2);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.cart-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 10px);\n  right: 0;\n  background-color: var(--bg-primary);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: var(--shadow-lg);\n  width: 380px;\n  max-height: 500px;\n  z-index: var(--z-modal);\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\n  display: flex;\n  flex-direction: column;\n}\n.cart-dropdown-header[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-bottom: 1px solid var(--border-color);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.cart-dropdown-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  color: var(--text-primary);\n}\n.cart-item-count[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 0.85rem;\n}\n.cart-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 2rem;\n  gap: 1rem;\n}\n.empty-cart-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  opacity: 0.3;\n}\n.cart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin: 0;\n  text-align: center;\n}\n.cart-items[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  max-height: 300px;\n  padding: 0.5rem 0;\n}\n.cart-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1rem;\n  border-bottom: 1px solid var(--border-color);\n  transition: background-color 0.2s ease;\n}\n.cart-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-secondary);\n}\n.cart-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.cart-item-image[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  object-fit: cover;\n  border-radius: 6px;\n  border: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n.cart-item-details[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.cart-item-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.cart-item-price-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n.cart-item-unit-price[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.cart-item-line-total[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--color-text-secondary);\n  font-weight: 500;\n  opacity: 0.85;\n}\n.cart-item-quantity[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.quantity-btn[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 1px solid var(--border-color);\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  border-radius: 4px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  font-weight: 600;\n}\n.quantity-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.quantity-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.quantity-value[_ngcontent-%COMP%] {\n  min-width: 30px;\n  text-align: center;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.remove-item-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: none;\n  background-color: transparent;\n  color: var(--text-secondary);\n  border-radius: 4px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  flex-shrink: 0;\n}\n.remove-item-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.remove-item-btn[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-error-light);\n  color: var(--color-error);\n}\n.cart-dropdown-footer[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background-color: var(--bg-secondary);\n  border-radius: 0 0 8px 8px;\n}\n.cart-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 1rem;\n}\n.cart-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.cart-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-size: 1.2rem;\n}\n.checkout-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  background-color: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 0.95rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.checkout-btn[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary-dark);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(6, 122, 69, 0.3);\n}\n.cart-footer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.75rem;\n}\n.cart-footer-actions[_ngcontent-%COMP%]   .cart-total[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.clear-cart-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid rgba(220, 38, 38, 0.3);\n  color: var(--color-error);\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.2s ease;\n}\n.clear-cart-btn[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-error-light);\n  border-color: var(--color-error);\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 1024px) {\n  .header-center[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n}\n@media (max-width: 768px) {\n  .header[_ngcontent-%COMP%] {\n    padding: 1rem;\n    gap: 1rem;\n  }\n  .header-center[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .mobile-menu-wrapper[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .cart-dropdown[_ngcontent-%COMP%] {\n    width: 320px;\n    right: -20px;\n  }\n  .user-dropdown[_ngcontent-%COMP%] {\n    right: -20px;\n  }\n}\n@media (max-width: 480px) {\n  .logo[_ngcontent-%COMP%] {\n    height: 40px;\n  }\n  .header-right[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .cart-dropdown[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 70px;\n    left: 10px;\n    right: 10px;\n    width: auto;\n    max-height: calc(100vh - 90px);\n  }\n  .user-dropdown[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 70px;\n    left: 10px;\n    right: 10px;\n    width: auto;\n    min-width: unset;\n  }\n  .mobile-dropdown[_ngcontent-%COMP%] {\n    min-width: 200px;\n    right: -10px;\n  }\n}\n/*# sourceMappingURL=header.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Header, [{
    type: Component,
    args: [{ selector: "app-header", standalone: true, imports: [PrimaryBtn, IconBtn, RouterModule, LanguageSwitcher, TranslateModule], template: `<header class="header">\r
  <div class="header-left">\r
    <a routerLink="/home">\r
      <img class="logo" [src]="IMAGES.logo" alt="Roy's Shack official logo" />\r
    </a>\r
  </div>\r
\r
  <div class="header-center">\r
    <app-primary-btn routerLink="/home">{{ 'header.home' | translate }}</app-primary-btn>\r
    <app-primary-btn routerLink="/forum">{{ 'header.forum' | translate }}</app-primary-btn>\r
    <app-primary-btn routerLink="/products">{{ 'header.products' | translate }}</app-primary-btn>\r
  </div>\r
\r
  <div class="header-right">\r
    @if (isAuthenticated) {\r
      <div class="user-menu-wrapper">\r
        <app-icon-btn\r
          [iconImg]="ICONS.user"\r
          [attr.aria-label]="'header.profile' | translate"\r
          (click)="toggleUserMenu()"\r
          class="user-menu-trigger"\r
        >\r
        </app-icon-btn>\r
\r
        @if (showUserMenu()) {\r
          <div class="user-dropdown">\r
            <div class="user-dropdown-header">\r
              <p class="user-name">{{ currentUser?.firstname }} {{ currentUser?.lastname }}</p>\r
              <p class="user-email">{{ currentUser?.email }}</p>\r
            </div>\r
            <div class="user-dropdown-divider"></div>\r
            <a routerLink="/profile" class="user-dropdown-item" (click)="closeUserMenu()">\r
              <img [src]="ICONS.user" alt="profile" class="dropdown-icon" />\r
              {{ 'header.my_profile' | translate }}\r
            </a>\r
            <a routerLink="/purchase" class="user-dropdown-item" (click)="closeUserMenu()">\r
              <img [src]="ICONS.basket" alt="orders" class="dropdown-icon" />\r
              {{ 'header.my_orders' | translate }}\r
            </a>\r
            @if (isAdmin) {\r
              <a routerLink="/admin" class="user-dropdown-item" (click)="closeUserMenu()">\r
                <img [src]="ICONS.admin" alt="orders" class="dropdown-icon" />\r
                {{ 'header.admin' | translate }}\r
              </a>\r
            }\r
            <div class="user-dropdown-divider"></div>\r
            <button class="user-dropdown-item logout-btn" (click)="logout()">\r
              <svg\r
                class="dropdown-icon"\r
                viewBox="0 0 24 24"\r
                fill="none"\r
                stroke="currentColor"\r
                stroke-width="2"\r
              >\r
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>\r
                <polyline points="16 17 21 12 16 7"></polyline>\r
                <line x1="21" y1="12" x2="9" y2="12"></line>\r
              </svg>\r
              {{ 'header.logout' | translate }}\r
            </button>\r
          </div>\r
        }\r
      </div>\r
    } @else {\r
      <app-icon-btn\r
        routerLink="/login"\r
        [iconImg]="ICONS.login"\r
        [attr.aria-label]="'header.login' | translate"\r
      >\r
      </app-icon-btn>\r
    }\r
\r
    <div class="cart-menu-wrapper">\r
      <button\r
        class="cart-button"\r
        (click)="toggleCartDropdown()"\r
        [attr.aria-label]="'header.cart' | translate"\r
      >\r
        <app-icon-btn [iconImg]="ICONS.basket"></app-icon-btn>\r
        @if (cartItemCount() > 0) {\r
          <span class="cart-badge">{{ cartItemCount() }}</span>\r
        }\r
      </button>\r
\r
      @if (showCartDropdown()) {\r
        <div class="cart-dropdown">\r
          <div class="cart-dropdown-header">\r
            <h3>{{ 'cart.title' | translate }}</h3>\r
            <span class="cart-item-count"\r
              >{{ cartItemCount() }} {{ 'cart.items' | translate }}</span\r
            >\r
          </div>\r
\r
          @if (cartItems().length === 0) {\r
            <div class="cart-empty">\r
              <img [src]="ICONS.basket" alt="Empty cart" class="empty-cart-icon" />\r
              <p>{{ 'cart.empty' | translate }}</p>\r
            </div>\r
          } @else {\r
            <div class="cart-items">\r
              @for (item of cartItems(); track item.product.id) {\r
                <div class="cart-item">\r
                  <img\r
                    [src]="item.product.image_url"\r
                    [alt]="item.product.name"\r
                    class="cart-item-image"\r
                  />\r
                  <div class="cart-item-details">\r
                    <h4 class="cart-item-name">{{ item.product.name }}</h4>\r
                    <div class="cart-item-price-row">\r
                      <span class="cart-item-unit-price">\r
                        {{\r
                          currencyService.formatPrice(\r
                            currencyService.getDiscountedPrice(item.product)\r
                          )\r
                        }}\r
                      </span>\r
                      @if (item.quantity > 1) {\r
                        <span class="cart-item-line-total">\r
                          =\r
                          {{\r
                            currencyService.formatPrice(\r
                              currencyService.getDiscountedPrice(item.product) * item.quantity\r
                            )\r
                          }}\r
                        </span>\r
                      }\r
                    </div>\r
                    <div class="cart-item-quantity">\r
                      <button\r
                        class="quantity-btn"\r
                        (click)="updateQuantity(item.product.id, item.quantity - 1)"\r
                        [disabled]="item.quantity <= 1"\r
                      >\r
                        -\r
                      </button>\r
                      <span class="quantity-value">{{ item.quantity }}</span>\r
                      <button\r
                        class="quantity-btn"\r
                        (click)="updateQuantity(item.product.id, item.quantity + 1)"\r
                        [disabled]="item.quantity >= item.product.stock_quantity"\r
                      >\r
                        +\r
                      </button>\r
                    </div>\r
                  </div>\r
                  <button\r
                    class="remove-item-btn"\r
                    (click)="removeFromCart(item.product.id)"\r
                    [attr.aria-label]="'cart.remove' | translate"\r
                  >\r
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                      <line x1="18" y1="6" x2="6" y2="18"></line>\r
                      <line x1="6" y1="6" x2="18" y2="18"></line>\r
                    </svg>\r
                  </button>\r
                </div>\r
              }\r
            </div>\r
\r
            <div class="cart-dropdown-footer">\r
              <div class="cart-footer-actions">\r
                <div class="cart-total">\r
                  <span>{{ 'cart.total' | translate }}:</span>\r
                  <strong>{{ currencyService.formatPrice(cartTotal()) }}</strong>\r
                </div>\r
                <button class="clear-cart-btn" (click)="clearCart()">\r
                  {{ 'cart.clear_all' | translate }}\r
                </button>\r
              </div>\r
              <button class="checkout-btn" routerLink="/purchase" (click)="goToCheckout()">\r
                {{ 'cart.checkout' | translate }}\r
              </button>\r
            </div>\r
          }\r
        </div>\r
      }\r
    </div>\r
\r
    <app-icon-btn\r
      [iconImg]="currentTheme === 'dark' ? ICONS.sun : ICONS.moon"\r
      (click)="toggleTheme()"\r
      [attr.aria-label]="'theme.toggle' | translate"\r
    >\r
    </app-icon-btn>\r
\r
    <app-language-switcher></app-language-switcher>\r
\r
    <div class="mobile-menu-wrapper">\r
      <button\r
        class="hamburger-btn"\r
        (click)="toggleMobileMenu()"\r
        [attr.aria-label]="'header.menu' | translate"\r
        [attr.aria-expanded]="showMobileMenu()"\r
      >\r
        <span class="hamburger-line" [class.open]="showMobileMenu()"></span>\r
        <span class="hamburger-line" [class.open]="showMobileMenu()"></span>\r
        <span class="hamburger-line" [class.open]="showMobileMenu()"></span>\r
      </button>\r
\r
      @if (showMobileMenu()) {\r
        <nav class="mobile-dropdown" role="navigation">\r
          <a routerLink="/home" class="mobile-nav-item" (click)="closeMobileMenu()">\r
            {{ 'header.home' | translate }}\r
          </a>\r
          <a routerLink="/forum" class="mobile-nav-item" (click)="closeMobileMenu()">\r
            {{ 'header.forum' | translate }}\r
          </a>\r
          <a routerLink="/products" class="mobile-nav-item" (click)="closeMobileMenu()">\r
            {{ 'header.products' | translate }}\r
          </a>\r
          @if (isAuthenticated) {\r
            <div class="mobile-nav-divider"></div>\r
            <a routerLink="/profile" class="mobile-nav-item" (click)="closeMobileMenu()">\r
              {{ 'header.my_profile' | translate }}\r
            </a>\r
            <a routerLink="/purchase" class="mobile-nav-item" (click)="closeMobileMenu()">\r
              {{ 'header.my_orders' | translate }}\r
            </a>\r
          }\r
        </nav>\r
      }\r
    </div>\r
  </div>\r
</header>\r
`, styles: ["/* src/app/shared/components/header/header.css */\n.header {\n  position: sticky;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: var(--z-modal-backdrop);\n  background-color: rgba(6, 122, 69, 0.92);\n  backdrop-filter: blur(12px) saturate(150%);\n  -webkit-backdrop-filter: blur(12px) saturate(150%);\n  border: none;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.12);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);\n  color: var(--color-white);\n  padding: 1rem 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2rem;\n  transition: background-color 0.3s ease, box-shadow 0.3s ease;\n}\n[data-theme=dark] .header {\n  background-color: rgba(15, 30, 22, 0.88);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.07);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\n}\n.header-left {\n  flex-shrink: 0;\n}\n.logo {\n  height: 50px;\n  width: auto;\n  display: block;\n  transition: transform 0.3s ease;\n  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.25));\n}\n.logo:hover {\n  transform: scale(1.05);\n}\n.header-center {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  flex: 1;\n  justify-content: center;\n}\n.header-right {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n  flex-shrink: 0;\n}\n.mobile-menu-wrapper {\n  display: none;\n  position: relative;\n}\n.hamburger-btn {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  width: 40px;\n  height: 40px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 6px;\n  transition: background-color 0.2s ease;\n}\n.hamburger-btn:hover {\n  background-color: rgba(255, 255, 255, 0.15);\n}\n.hamburger-line {\n  display: block;\n  width: 22px;\n  height: 2px;\n  background-color: white;\n  border-radius: 2px;\n  transition: all 0.3s ease;\n  transform-origin: center;\n}\n.hamburger-line.open:nth-child(1) {\n  transform: translateY(7px) rotate(45deg);\n}\n.hamburger-line.open:nth-child(2) {\n  opacity: 0;\n  transform: scaleX(0);\n}\n.hamburger-line.open:nth-child(3) {\n  transform: translateY(-7px) rotate(-45deg);\n}\n.mobile-dropdown {\n  position: absolute;\n  top: calc(100% + 10px);\n  right: 0;\n  background-color: var(--bg-primary);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: var(--shadow-lg);\n  min-width: 220px;\n  z-index: var(--z-modal);\n  animation: slideDown 0.2s ease;\n  overflow: hidden;\n}\n.mobile-nav-item {\n  display: block;\n  padding: 0.85rem 1.25rem;\n  color: var(--text-primary);\n  text-decoration: none;\n  font-size: 0.95rem;\n  font-weight: 500;\n  transition: background-color 0.2s ease;\n}\n.mobile-nav-item:hover {\n  background-color: var(--bg-secondary);\n  color: var(--color-primary);\n}\n.mobile-nav-divider {\n  height: 1px;\n  background-color: var(--border-color);\n  margin: 0.25rem 0;\n}\n.user-menu-wrapper {\n  position: relative;\n}\n.user-menu-trigger {\n  cursor: pointer;\n}\n.user-dropdown {\n  position: absolute;\n  top: calc(100% + 10px);\n  right: 0;\n  background-color: var(--bg-primary);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: var(--shadow-lg);\n  min-width: 250px;\n  z-index: var(--z-modal);\n  animation: slideDown 0.2s ease;\n}\n[data-theme=dark] .user-dropdown {\n  background-color: rgba(20, 35, 28, 0.95);\n}\n.user-dropdown-header {\n  padding: 1rem;\n  border-bottom: 1px solid var(--border-color);\n}\n.user-name {\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0 0 0.25rem 0;\n  font-size: 0.95rem;\n}\n.user-email {\n  color: var(--text-secondary);\n  margin: 0;\n  font-size: 0.85rem;\n}\n.user-dropdown-divider {\n  height: 1px;\n  background-color: var(--border-color);\n  margin: 0.5rem 0;\n}\n.user-dropdown-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  color: var(--text-primary);\n  text-decoration: none;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  border: none;\n  background: none;\n  width: 100%;\n  text-align: left;\n  font-size: 0.9rem;\n}\n.user-dropdown-item:hover {\n  background-color: var(--bg-secondary);\n}\n.dropdown-icon {\n  width: 18px;\n  height: 18px;\n  color: var(--text-secondary);\n}\n.logout-btn {\n  color: var(--color-error);\n}\n.logout-btn:hover {\n  background-color: var(--color-error-light);\n}\n.logout-btn .dropdown-icon {\n  color: var(--color-error);\n}\n.cart-menu-wrapper {\n  position: relative;\n}\n.cart-button {\n  position: relative;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.cart-badge {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  background-color: #ffffff;\n  color: var(--color-primary);\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.7rem;\n  font-weight: 700;\n  border: 2px solid var(--bg-primary);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);\n  animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n[data-theme=dark] .cart-badge {\n  background-color: var(--color-primary);\n  color: #ffffff;\n}\n@keyframes popIn {\n  0% {\n    transform: scale(0);\n  }\n  50% {\n    transform: scale(1.2);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.cart-dropdown {\n  position: absolute;\n  top: calc(100% + 10px);\n  right: 0;\n  background-color: var(--bg-primary);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: var(--shadow-lg);\n  width: 380px;\n  max-height: 500px;\n  z-index: var(--z-modal);\n  animation: slideDown 0.2s ease;\n  display: flex;\n  flex-direction: column;\n}\n.cart-dropdown-header {\n  padding: 1rem;\n  border-bottom: 1px solid var(--border-color);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.cart-dropdown-header h3 {\n  margin: 0;\n  font-size: 1.1rem;\n  color: var(--text-primary);\n}\n.cart-item-count {\n  color: var(--text-secondary);\n  font-size: 0.85rem;\n}\n.cart-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 2rem;\n  gap: 1rem;\n}\n.empty-cart-icon {\n  width: 60px;\n  height: 60px;\n  opacity: 0.3;\n}\n.cart-empty p {\n  color: var(--text-secondary);\n  margin: 0;\n  text-align: center;\n}\n.cart-items {\n  overflow-y: auto;\n  max-height: 300px;\n  padding: 0.5rem 0;\n}\n.cart-item {\n  display: flex;\n  gap: 1rem;\n  padding: 1rem;\n  border-bottom: 1px solid var(--border-color);\n  transition: background-color 0.2s ease;\n}\n.cart-item:hover {\n  background-color: var(--bg-secondary);\n}\n.cart-item:last-child {\n  border-bottom: none;\n}\n.cart-item-image {\n  width: 60px;\n  height: 60px;\n  object-fit: cover;\n  border-radius: 6px;\n  border: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n.cart-item-details {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.cart-item-name {\n  margin: 0;\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.cart-item-price-row {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n.cart-item-unit-price {\n  font-size: 0.9rem;\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.cart-item-line-total {\n  font-size: 0.8rem;\n  color: var(--color-text-secondary);\n  font-weight: 500;\n  opacity: 0.85;\n}\n.cart-item-quantity {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.quantity-btn {\n  width: 24px;\n  height: 24px;\n  border: 1px solid var(--border-color);\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  border-radius: 4px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  font-weight: 600;\n}\n.quantity-btn:hover:not(:disabled) {\n  background-color: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.quantity-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.quantity-value {\n  min-width: 30px;\n  text-align: center;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.remove-item-btn {\n  width: 28px;\n  height: 28px;\n  border: none;\n  background-color: transparent;\n  color: var(--text-secondary);\n  border-radius: 4px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  flex-shrink: 0;\n}\n.remove-item-btn svg {\n  width: 16px;\n  height: 16px;\n}\n.remove-item-btn:hover {\n  background-color: var(--color-error-light);\n  color: var(--color-error);\n}\n.cart-dropdown-footer {\n  padding: 1rem;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background-color: var(--bg-secondary);\n  border-radius: 0 0 8px 8px;\n}\n.cart-total {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 1rem;\n}\n.cart-total span {\n  color: var(--text-secondary);\n}\n.cart-total strong {\n  color: var(--text-primary);\n  font-size: 1.2rem;\n}\n.checkout-btn {\n  width: 100%;\n  padding: 0.75rem;\n  background-color: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 0.95rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.checkout-btn:hover {\n  background-color: var(--color-primary-dark);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(6, 122, 69, 0.3);\n}\n.cart-footer-actions {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.75rem;\n}\n.cart-footer-actions .cart-total {\n  flex: 1;\n}\n.clear-cart-btn {\n  background: none;\n  border: 1px solid rgba(220, 38, 38, 0.3);\n  color: var(--color-error);\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.2s ease;\n}\n.clear-cart-btn:hover {\n  background-color: var(--color-error-light);\n  border-color: var(--color-error);\n}\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 1024px) {\n  .header-center {\n    gap: 0.5rem;\n  }\n}\n@media (max-width: 768px) {\n  .header {\n    padding: 1rem;\n    gap: 1rem;\n  }\n  .header-center {\n    display: none;\n  }\n  .mobile-menu-wrapper {\n    display: block;\n  }\n  .cart-dropdown {\n    width: 320px;\n    right: -20px;\n  }\n  .user-dropdown {\n    right: -20px;\n  }\n}\n@media (max-width: 480px) {\n  .logo {\n    height: 40px;\n  }\n  .header-right {\n    gap: 0.5rem;\n  }\n  .cart-dropdown {\n    position: fixed;\n    top: 70px;\n    left: 10px;\n    right: 10px;\n    width: auto;\n    max-height: calc(100vh - 90px);\n  }\n  .user-dropdown {\n    position: fixed;\n    top: 70px;\n    left: 10px;\n    right: 10px;\n    width: auto;\n    min-width: unset;\n  }\n  .mobile-dropdown {\n    min-width: 200px;\n    right: -10px;\n  }\n}\n/*# sourceMappingURL=header.css.map */\n"] }]
  }], null, { onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Header, { className: "Header", filePath: "src/app/shared/components/header/header.ts", lineNumber: 31 });
})();

// src/app/shared/components/footer/footer-bottom/footer-bottom.ts
var FooterBottom = class _FooterBottom {
  ICONS = ICONS;
  IMAGES = IMAGES;
  static \u0275fac = function FooterBottom_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterBottom)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterBottom, selectors: [["app-footer-bottom"]], decls: 8, vars: 5, consts: [[1, "footer-bottom"], [1, "footer-left"], [3, "iconImg"], [1, "footer-center"], [1, "footer-right"], ["routerLink", "/legal"]], template: function FooterBottom_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "app-icon-btn", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "div", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "app-primary-btn", 5);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("iconImg", ctx.ICONS.support);
      \u0275\u0275attribute("aria-label", "Support");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 3, "footer.legal"));
    }
  }, dependencies: [IconBtn, PrimaryBtn, RouterModule, RouterLink, TranslateModule, TranslatePipe], styles: ["\n\n.footer-bottom[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-dark);\n  padding: 16px 20px;\n  width: 100%;\n  min-height: 70px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  padding: clamp(12px, 3vw, 20px);\n  transition: background-color var(--transition-speed) var(--transition-ease);\n}\n.footer-left[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n.footer-center[_ngcontent-%COMP%] {\n  flex: 2;\n  display: flex;\n  justify-content: center;\n  gap: clamp(12px, 3vw, 24px);\n}\n.footer-right[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  justify-content: flex-end;\n  gap: clamp(10px, 3vw, 16px);\n}\n@media (max-width: 768px) {\n  .footer-center[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .footer-right[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n}\n/*# sourceMappingURL=footer-bottom.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterBottom, [{
    type: Component,
    args: [{ selector: "app-footer-bottom", standalone: true, imports: [IconBtn, PrimaryBtn, RouterModule, TranslateModule], template: `<div class="footer-bottom">\r
  <div class="footer-left">\r
    <app-icon-btn \r
      [iconImg]="ICONS.support"\r
      [attr.aria-label]="'Support'">\r
    </app-icon-btn>\r
  </div>\r
  <div class="footer-center"></div>\r
  <div class="footer-right">\r
    <app-primary-btn routerLink="/legal">{{ 'footer.legal' | translate }}</app-primary-btn>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/shared/components/footer/footer-bottom/footer-bottom.css */\n.footer-bottom {\n  background-color: var(--color-primary-dark);\n  padding: 16px 20px;\n  width: 100%;\n  min-height: 70px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  padding: clamp(12px, 3vw, 20px);\n  transition: background-color var(--transition-speed) var(--transition-ease);\n}\n.footer-left {\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n.footer-center {\n  flex: 2;\n  display: flex;\n  justify-content: center;\n  gap: clamp(12px, 3vw, 24px);\n}\n.footer-right {\n  flex: 1;\n  display: flex;\n  justify-content: flex-end;\n  gap: clamp(10px, 3vw, 16px);\n}\n@media (max-width: 768px) {\n  .footer-center {\n    display: none;\n  }\n  .footer-right {\n    gap: 8px;\n  }\n}\n/*# sourceMappingURL=footer-bottom.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterBottom, { className: "FooterBottom", filePath: "src/app/shared/components/footer/footer-bottom/footer-bottom.ts", lineNumber: 15 });
})();

// src/app/shared/components/footer/newsletter-form/newsletter-form.ts
var _forTrack05 = ($index, $item) => $item.name;
var _forTrack1 = ($index, $item) => $item.code;
function NewsletterForm_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12);
    \u0275\u0275element(1, "img", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const social_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", social_r1.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("aria-label", social_r1.name);
    \u0275\u0275advance();
    \u0275\u0275property("src", social_r1.icon, \u0275\u0275sanitizeUrl)("alt", social_r1.name);
  }
}
function NewsletterForm_For_3_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "footer.no_social_link"), " ");
  }
}
function NewsletterForm_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function NewsletterForm_For_3_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const social_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSocialTooltip(social_r1.name));
    });
    \u0275\u0275element(1, "img", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, NewsletterForm_For_3_Conditional_2_Conditional_2_Template, 3, 3, "div", 15);
  }
  if (rf & 2) {
    const social_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", social_r1.name);
    \u0275\u0275advance();
    \u0275\u0275property("src", social_r1.icon, \u0275\u0275sanitizeUrl)("alt", social_r1.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeSocialTooltip === social_r1.name ? 2 : -1);
  }
}
function NewsletterForm_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275conditionalCreate(1, NewsletterForm_For_3_Conditional_1_Template, 2, 4, "a", 12)(2, NewsletterForm_For_3_Conditional_2_Template, 3, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const social_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(social_r1.url ? 1 : 2);
  }
}
function NewsletterForm_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function NewsletterForm_Conditional_14_For_2_Template_button_click_0_listener() {
      const lang_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectNewsletterLang(lang_r5.code));
    });
    \u0275\u0275element(1, "img", 5);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lang_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.newsletterLang() === lang_r5.code);
    \u0275\u0275advance();
    \u0275\u0275property("src", lang_r5.flag, \u0275\u0275sanitizeUrl)("alt", lang_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lang_r5.name);
  }
}
function NewsletterForm_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, NewsletterForm_Conditional_14_For_2_Template, 4, 5, "button", 16, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.languages);
  }
}
var LANG_TO_BACKEND = {
  hu: "hungarian",
  en: "english",
  de: "german"
};
var NewsletterForm = class _NewsletterForm {
  http = inject(HttpClient);
  toastService = inject(ToastService);
  translationService = inject(TranslationService);
  API_URL = environment.baseURL;
  toBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  }
  ICONS = ICONS;
  IMAGES = IMAGES;
  email = "";
  isSubmitting = false;
  isLangDropdownOpen = false;
  activeSocialTooltip = null;
  selectedLang = toSignal(this.translationService.currentLang$, {
    initialValue: this.translationService.getCurrentLanguage()
  });
  newsletterLang = signal(this.translationService.getCurrentLanguage(), ...ngDevMode ? [{ debugName: "newsletterLang" }] : []);
  languages = LANGUAGE_OPTIONS;
  socialLinks = [
    { name: "Facebook", icon: ICONS.facebook, url: null },
    { name: "Instagram", icon: ICONS.instagram, url: null },
    { name: "X (Twitter)", icon: ICONS.x, url: null }
  ];
  constructor() {
    effect(() => {
      this.newsletterLang.set(this.selectedLang());
    });
  }
  currentLangOption = computed(() => this.languages.find((l) => l.code === this.newsletterLang()) ?? this.languages[0], ...ngDevMode ? [{ debugName: "currentLangOption" }] : []);
  toggleLangDropdown() {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }
  selectNewsletterLang(code) {
    this.newsletterLang.set(code);
    this.isLangDropdownOpen = false;
  }
  toggleSocialTooltip(name) {
    this.activeSocialTooltip = this.activeSocialTooltip === name ? null : name;
    if (this.activeSocialTooltip) {
      setTimeout(() => {
        if (this.activeSocialTooltip === name) {
          this.activeSocialTooltip = null;
        }
      }, 3e3);
    }
  }
  onSubmit() {
    if (!this.email || this.isSubmitting)
      return;
    this.isSubmitting = true;
    const payload = {
      email: this.toBase64(this.email),
      news_level: btoa("1"),
      language: LANG_TO_BACKEND[this.newsletterLang()]
    };
    this.http.post(`${this.API_URL}/api/newsletter_subscription`, payload).subscribe({
      next: (response) => {
        if (response.statuscode === "200") {
          this.toastService.show("footer.newsletter_success", "success");
          this.email = "";
        } else {
          this.toastService.show("footer.newsletter_error", "error");
        }
        this.isSubmitting = false;
      },
      error: () => {
        this.toastService.show("footer.newsletter_error", "error");
        this.isSubmitting = false;
      }
    });
  }
  static \u0275fac = function NewsletterForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NewsletterForm)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NewsletterForm, selectors: [["app-newsletter-form"]], decls: 22, vars: 19, consts: [[1, "newsletter"], [1, "social-icons"], [1, "social-icon-wrapper"], [1, "newsletter-lang-selector"], ["type", "button", 1, "newsletter-lang-btn", 3, "click"], [1, "newsletter-flag", 3, "src", "alt"], [1, "newsletter-lang-name"], [1, "newsletter-lang-arrow"], [1, "newsletter-lang-dropdown"], [3, "ngSubmit"], ["type", "email", "name", "email", "required", "", 3, "ngModelChange", "placeholder", "ngModel"], ["type", "submit", 3, "disabled"], ["target", "_blank", 3, "href"], [3, "src", "alt"], [1, "social-icon-btn", 3, "click"], [1, "social-tooltip"], ["type", "button", 1, "newsletter-lang-item", 3, "active"], ["type", "button", 1, "newsletter-lang-item", 3, "click"]], template: function NewsletterForm_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275repeaterCreate(2, NewsletterForm_For_3_Template, 3, 1, "div", 2, _forTrack05);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p");
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 3)(8, "button", 4);
      \u0275\u0275listener("click", function NewsletterForm_Template_button_click_8_listener() {
        return ctx.toggleLangDropdown();
      });
      \u0275\u0275element(9, "img", 5);
      \u0275\u0275elementStart(10, "span", 6);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span", 7);
      \u0275\u0275text(13, "\u25BE");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(14, NewsletterForm_Conditional_14_Template, 3, 0, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "form", 9);
      \u0275\u0275listener("ngSubmit", function NewsletterForm_Template_form_ngSubmit_15_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(16, "input", 10);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function NewsletterForm_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 11);
      \u0275\u0275text(19);
      \u0275\u0275pipe(20, "translate");
      \u0275\u0275pipe(21, "translate");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.socialLinks);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 11, "footer.newsletter"));
      \u0275\u0275advance(4);
      \u0275\u0275property("src", ctx.currentLangOption().flag, \u0275\u0275sanitizeUrl)("alt", ctx.currentLangOption().name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.currentLangOption().name);
      \u0275\u0275advance();
      \u0275\u0275classProp("open", ctx.isLangDropdownOpen);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLangDropdownOpen ? 14 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(17, 13, "footer.emailPlaceholder"));
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSubmitting);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isSubmitting ? \u0275\u0275pipeBind1(20, 15, "footer.sending") : \u0275\u0275pipeBind1(21, 17, "footer.send"), " ");
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, TranslateModule, TranslatePipe], styles: ['\n\n.newsletter[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  margin-top: 8px;\n}\n.newsletter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 230px;\n  height: 35px;\n  padding: 0 12px;\n  border: none;\n  background-color: var(--input-bg);\n  color: var(--input-text);\n  font-family: inherit;\n  transition: background-color var(--transition-speed) var(--transition-ease);\n}\n.newsletter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: var(--input-placeholder);\n}\n.newsletter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: 2px solid var(--color-primary);\n  outline-offset: -2px;\n}\n.newsletter[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%] {\n  width: 80px;\n  height: 35px;\n  color: #111;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  font-weight: 500;\n  transition: opacity 0.2s ease;\n}\n.newsletter[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.newsletter[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]:active {\n  opacity: 0.8;\n}\n.newsletter[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.newsletter[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n  color: var(--text-inverse);\n}\n.social-icons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.social-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.2s ease;\n  background: none;\n  cursor: pointer;\n}\n.social-icons[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.social-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n.social-icon-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n}\n.social-icon-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: fit-content;\n  cursor: default;\n}\n.social-icon-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n  opacity: 0.85;\n  filter: brightness(1.4);\n}\n.social-icon-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  filter: brightness(1.8);\n}\n.social-icon-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.social-tooltip[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  white-space: nowrap;\n  box-shadow: var(--shadow-md);\n  border: 1px solid var(--border-color);\n  animation: _ngcontent-%COMP%_tooltipFadeIn 0.2s ease;\n  z-index: 10;\n}\n.social-tooltip[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border: 5px solid transparent;\n  border-top-color: var(--bg-primary);\n}\n@keyframes _ngcontent-%COMP%_tooltipFadeIn {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) translateY(0);\n  }\n}\n.newsletter-lang-selector[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  margin-bottom: 8px;\n}\n.newsletter-lang-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 10px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 6px;\n  color: var(--text-inverse);\n  font-family: inherit;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: background 0.2s ease, border-color 0.2s ease;\n}\n.newsletter-lang-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.18);\n  border-color: rgba(255, 255, 255, 0.4);\n}\n.newsletter-flag[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 14px;\n  object-fit: cover;\n  border-radius: 2px;\n  flex-shrink: 0;\n}\n.newsletter-lang-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.newsletter-lang-arrow[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  opacity: 0.8;\n  transition: transform 0.2s ease;\n  line-height: 1;\n}\n.newsletter-lang-arrow.open[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.newsletter-lang-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 4px);\n  left: 0;\n  background: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: var(--shadow-md);\n  overflow: hidden;\n  z-index: var(--z-dropdown);\n  min-width: 140px;\n  animation: _ngcontent-%COMP%_dropdownFadeIn 0.15s ease;\n}\n@keyframes _ngcontent-%COMP%_dropdownFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.newsletter-lang-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 8px 12px;\n  background: none;\n  border: none;\n  color: var(--text-primary);\n  font-family: inherit;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: background 0.15s ease;\n  text-align: left;\n}\n.newsletter-lang-item[_ngcontent-%COMP%]:hover {\n  background: var(--bg-secondary);\n}\n.newsletter-lang-item.active[_ngcontent-%COMP%] {\n  background: var(--bg-secondary);\n  font-weight: 600;\n  color: var(--color-primary);\n}\n@media (max-width: 480px) {\n  .newsletter[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .newsletter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 44px;\n  }\n  .newsletter[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 44px;\n  }\n  .social-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n  }\n}\n[data-theme=dark][_ngcontent-%COMP%]   .newsletter[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%] {\n  color: var(--text-inverse);\n  background-color: #111;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .newsletter[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]:hover {\n  background-color: #e8e8e8;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .social-icon-btn[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], \n[data-theme=dark][_ngcontent-%COMP%]   .social-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  filter: brightness(2) saturate(0);\n  opacity: 0.9;\n}\n/*# sourceMappingURL=newsletter-form.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NewsletterForm, [{
    type: Component,
    args: [{ selector: "app-newsletter-form", standalone: true, imports: [FormsModule, TranslateModule], template: `<div class="newsletter">\r
  <div class="social-icons">\r
    @for (social of socialLinks; track social.name) {\r
      <div class="social-icon-wrapper">\r
        @if (social.url) {\r
          <a [href]="social.url" target="_blank" [attr.aria-label]="social.name">\r
            <img [src]="social.icon" [alt]="social.name" />\r
          </a>\r
        } @else {\r
          <button\r
            class="social-icon-btn"\r
            (click)="toggleSocialTooltip(social.name)"\r
            [attr.aria-label]="social.name"\r
          >\r
            <img [src]="social.icon" [alt]="social.name" />\r
          </button>\r
\r
          @if (activeSocialTooltip === social.name) {\r
            <div class="social-tooltip">\r
              {{ 'footer.no_social_link' | translate }}\r
            </div>\r
          }\r
        }\r
      </div>\r
    }\r
  </div>\r
\r
  <p>{{ 'footer.newsletter' | translate }}</p>\r
\r
  <div class="newsletter-lang-selector">\r
    <button class="newsletter-lang-btn" type="button" (click)="toggleLangDropdown()">\r
      <img\r
        [src]="currentLangOption().flag"\r
        [alt]="currentLangOption().name"\r
        class="newsletter-flag"\r
      />\r
      <span class="newsletter-lang-name">{{ currentLangOption().name }}</span>\r
      <span class="newsletter-lang-arrow" [class.open]="isLangDropdownOpen">\u25BE</span>\r
    </button>\r
\r
    @if (isLangDropdownOpen) {\r
      <div class="newsletter-lang-dropdown">\r
        @for (lang of languages; track lang.code) {\r
          <button\r
            class="newsletter-lang-item"\r
            type="button"\r
            [class.active]="newsletterLang() === lang.code"\r
            (click)="selectNewsletterLang(lang.code)"\r
          >\r
            <img [src]="lang.flag" [alt]="lang.name" class="newsletter-flag" />\r
            <span>{{ lang.name }}</span>\r
          </button>\r
        }\r
      </div>\r
    }\r
  </div>\r
\r
  <form (ngSubmit)="onSubmit()">\r
    <input\r
      type="email"\r
      [placeholder]="'footer.emailPlaceholder' | translate"\r
      [(ngModel)]="email"\r
      name="email"\r
      required\r
    />\r
    <button type="submit" [disabled]="isSubmitting">\r
      {{ isSubmitting ? ('footer.sending' | translate) : ('footer.send' | translate) }}\r
    </button>\r
  </form>\r
</div>\r
`, styles: ['/* src/app/shared/components/footer/newsletter-form/newsletter-form.css */\n.newsletter form {\n  display: flex;\n  margin-top: 8px;\n}\n.newsletter input {\n  width: 230px;\n  height: 35px;\n  padding: 0 12px;\n  border: none;\n  background-color: var(--input-bg);\n  color: var(--input-text);\n  font-family: inherit;\n  transition: background-color var(--transition-speed) var(--transition-ease);\n}\n.newsletter input::placeholder {\n  color: var(--input-placeholder);\n}\n.newsletter input:focus {\n  outline: 2px solid var(--color-primary);\n  outline-offset: -2px;\n}\n.newsletter button[type=submit] {\n  width: 80px;\n  height: 35px;\n  color: #111;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  font-weight: 500;\n  transition: opacity 0.2s ease;\n}\n.newsletter button[type=submit]:hover {\n  opacity: 0.9;\n}\n.newsletter button[type=submit]:active {\n  opacity: 0.8;\n}\n.newsletter button[type=submit]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.newsletter p {\n  margin-bottom: 6px;\n  color: var(--text-inverse);\n}\n.social-icons {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.social-icons a {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.2s ease;\n  background: none;\n  cursor: pointer;\n}\n.social-icons img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.social-icons a:hover,\n.social-icon-btn:hover {\n  transform: scale(1.1);\n}\n.social-icon-wrapper {\n  position: relative;\n  width: fit-content;\n  cursor: default;\n}\n.social-icon-btn {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  transition: transform 0.2s ease, opacity 0.2s ease;\n  opacity: 0.85;\n  filter: brightness(1.4);\n}\n.social-icon-btn:hover {\n  opacity: 1;\n  filter: brightness(1.8);\n}\n.social-icon-btn img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.social-tooltip {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  white-space: nowrap;\n  box-shadow: var(--shadow-md);\n  border: 1px solid var(--border-color);\n  animation: tooltipFadeIn 0.2s ease;\n  z-index: 10;\n}\n.social-tooltip::after {\n  content: "";\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border: 5px solid transparent;\n  border-top-color: var(--bg-primary);\n}\n@keyframes tooltipFadeIn {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) translateY(0);\n  }\n}\n.newsletter-lang-selector {\n  position: relative;\n  display: inline-block;\n  margin-bottom: 8px;\n}\n.newsletter-lang-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 10px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 6px;\n  color: var(--text-inverse);\n  font-family: inherit;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: background 0.2s ease, border-color 0.2s ease;\n}\n.newsletter-lang-btn:hover {\n  background: rgba(255, 255, 255, 0.18);\n  border-color: rgba(255, 255, 255, 0.4);\n}\n.newsletter-flag {\n  width: 20px;\n  height: 14px;\n  object-fit: cover;\n  border-radius: 2px;\n  flex-shrink: 0;\n}\n.newsletter-lang-name {\n  font-weight: 500;\n}\n.newsletter-lang-arrow {\n  font-size: 0.7rem;\n  opacity: 0.8;\n  transition: transform 0.2s ease;\n  line-height: 1;\n}\n.newsletter-lang-arrow.open {\n  transform: rotate(180deg);\n}\n.newsletter-lang-dropdown {\n  position: absolute;\n  top: calc(100% + 4px);\n  left: 0;\n  background: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: var(--shadow-md);\n  overflow: hidden;\n  z-index: var(--z-dropdown);\n  min-width: 140px;\n  animation: dropdownFadeIn 0.15s ease;\n}\n@keyframes dropdownFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.newsletter-lang-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 8px 12px;\n  background: none;\n  border: none;\n  color: var(--text-primary);\n  font-family: inherit;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: background 0.15s ease;\n  text-align: left;\n}\n.newsletter-lang-item:hover {\n  background: var(--bg-secondary);\n}\n.newsletter-lang-item.active {\n  background: var(--bg-secondary);\n  font-weight: 600;\n  color: var(--color-primary);\n}\n@media (max-width: 480px) {\n  .newsletter form {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .newsletter input {\n    width: 100%;\n    min-height: 44px;\n  }\n  .newsletter button[type=submit] {\n    width: 100%;\n    min-height: 44px;\n  }\n  .social-icons a {\n    width: 44px;\n    height: 44px;\n  }\n}\n[data-theme=dark] .newsletter button[type=submit] {\n  color: var(--text-inverse);\n  background-color: #111;\n}\n[data-theme=dark] .newsletter button[type=submit]:hover {\n  background-color: #e8e8e8;\n}\n[data-theme=dark] .social-icon-btn img,\n[data-theme=dark] .social-icons a img {\n  filter: brightness(2) saturate(0);\n  opacity: 0.9;\n}\n/*# sourceMappingURL=newsletter-form.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NewsletterForm, { className: "NewsletterForm", filePath: "src/app/shared/components/footer/newsletter-form/newsletter-form.ts", lineNumber: 33 });
})();

// src/app/shared/components/footer/footer-main/footer-main.ts
var _c04 = (a0) => ({ year: a0 });
var FooterMain = class _FooterMain {
  currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  static \u0275fac = function FooterMain_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterMain)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterMain, selectors: [["app-footer-main"]], decls: 27, vars: 18, consts: [[1, "footer-main"], [1, "footer-column"], [1, "underline"], [1, "content"], [1, "small-text"]], template: function FooterMain_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h4");
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275element(5, "span", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "p", 4);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 1)(11, "h4");
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "translate");
      \u0275\u0275element(14, "span", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 3)(16, "ul")(17, "li");
      \u0275\u0275text(18);
      \u0275\u0275pipe(19, "translate");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(20, "div", 1)(21, "h4");
      \u0275\u0275text(22);
      \u0275\u0275pipe(23, "translate");
      \u0275\u0275element(24, "span", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 3);
      \u0275\u0275element(26, "app-newsletter-form");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 5, "footer.copyright", \u0275\u0275pureFunction1(16, _c04, ctx.currentYear)), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 8, "footer.info"), " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 10, "footer.contactInfo"), " ");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 12, "footer.email"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(23, 14, "footer.followUs"), " ");
    }
  }, dependencies: [TranslateModule, NewsletterForm, TranslatePipe], styles: ["\n\n.footer-main[_ngcontent-%COMP%] {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: clamp(40px, 6vw, 80px) 20px;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 40px;\n}\n.footer-column[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 12px;\n  color: var(--text-inverse);\n}\n.footer-column[_ngcontent-%COMP%]   .underline[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 2px;\n  background-color: var(--text-inverse);\n  margin-top: 8px;\n}\n.footer-column[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n  max-width: 320px;\n  margin: 0 0 6px 0;\n  color: var(--text-inverse);\n}\n.footer-column[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\n.footer-column[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.6;\n  margin-bottom: 6px;\n  color: var(--text-inverse);\n}\n@media (max-width: 768px) {\n  .footer-main[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 32px;\n    padding: 40px 20px;\n  }\n}\n/*# sourceMappingURL=footer-main.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterMain, [{
    type: Component,
    args: [{ selector: "app-footer-main", standalone: true, imports: [TranslateModule, NewsletterForm], template: `<div class="footer-main">\r
  <div class="footer-column">\r
    <h4>\r
      {{ 'footer.copyright' | translate: { year: currentYear } }}\r
      <span class="underline"></span>\r
    </h4>\r
\r
    <div class="content">\r
      <p class="small-text">\r
        {{ 'footer.info' | translate }}\r
      </p>\r
    </div>\r
  </div>\r
\r
  <div class="footer-column">\r
    <h4>\r
      {{ 'footer.contactInfo' | translate }}\r
      <span class="underline"></span>\r
    </h4>\r
\r
    <div class="content">\r
      <ul>\r
        <li>{{ 'footer.email' | translate }}</li>\r
      </ul>\r
    </div>\r
  </div>\r
\r
  <div class="footer-column">\r
    <h4>\r
      {{ 'footer.followUs' | translate }}\r
      <span class="underline"></span>\r
    </h4>\r
\r
    <div class="content">\r
      <app-newsletter-form></app-newsletter-form>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/shared/components/footer/footer-main/footer-main.css */\n.footer-main {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: clamp(40px, 6vw, 80px) 20px;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 40px;\n}\n.footer-column h4 {\n  font-size: 18px;\n  margin-bottom: 12px;\n  color: var(--text-inverse);\n}\n.footer-column .underline {\n  display: block;\n  width: 100%;\n  height: 2px;\n  background-color: var(--text-inverse);\n  margin-top: 8px;\n}\n.footer-column .content p {\n  font-size: 14px;\n  line-height: 1.6;\n  max-width: 320px;\n  margin: 0 0 6px 0;\n  color: var(--text-inverse);\n}\n.footer-column .content ul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\n.footer-column .content li {\n  font-size: 14px;\n  line-height: 1.6;\n  margin-bottom: 6px;\n  color: var(--text-inverse);\n}\n@media (max-width: 768px) {\n  .footer-main {\n    grid-template-columns: 1fr;\n    gap: 32px;\n    padding: 40px 20px;\n  }\n}\n/*# sourceMappingURL=footer-main.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterMain, { className: "FooterMain", filePath: "src/app/shared/components/footer/footer-main/footer-main.ts", lineNumber: 12 });
})();

// src/app/shared/components/footer/footer.ts
var Footer = class _Footer {
  static \u0275fac = function Footer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Footer)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Footer, selectors: [["app-footer"]], decls: 3, vars: 0, consts: [[1, "footer"]], template: function Footer_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "footer", 0);
      \u0275\u0275element(1, "app-footer-main")(2, "app-footer-bottom");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [FooterBottom, FooterMain], styles: ["\n\n.footer[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--color-white);\n  width: 100%;\n  transition: background-color var(--transition-speed) var(--transition-ease);\n}\n/*# sourceMappingURL=footer.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Footer, [{
    type: Component,
    args: [{ selector: "app-footer", standalone: true, imports: [FooterBottom, FooterMain], template: '<footer class="footer">\r\n  <app-footer-main></app-footer-main>\r\n  <app-footer-bottom></app-footer-bottom>\r\n</footer>\r\n', styles: ["/* src/app/shared/components/footer/footer.css */\n.footer {\n  background-color: var(--color-primary);\n  color: var(--color-white);\n  width: 100%;\n  transition: background-color var(--transition-speed) var(--transition-ease);\n}\n/*# sourceMappingURL=footer.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Footer, { className: "Footer", filePath: "src/app/shared/components/footer/footer.ts", lineNumber: 12 });
})();

// src/app/shared/components/toast/toast.ts
var _forTrack06 = ($index, $item) => $item.id;
function Toast_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "svg", 3);
    \u0275\u0275domElement(1, "path", 8);
    \u0275\u0275domElementEnd();
  }
}
function Toast_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "svg", 3);
    \u0275\u0275domElement(1, "circle", 9)(2, "path", 10);
    \u0275\u0275domElementEnd();
  }
}
function Toast_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "svg", 3);
    \u0275\u0275domElement(1, "circle", 9)(2, "path", 11);
    \u0275\u0275domElementEnd();
  }
}
function Toast_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "svg", 3);
    \u0275\u0275domElement(1, "path", 12);
    \u0275\u0275domElementEnd();
  }
}
function Toast_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div")(1, "div", 2);
    \u0275\u0275conditionalCreate(2, Toast_For_2_Conditional_2_Template, 2, 0, ":svg:svg", 3);
    \u0275\u0275conditionalCreate(3, Toast_For_2_Conditional_3_Template, 3, 0, ":svg:svg", 3);
    \u0275\u0275conditionalCreate(4, Toast_For_2_Conditional_4_Template, 3, 0, ":svg:svg", 3);
    \u0275\u0275conditionalCreate(5, Toast_For_2_Conditional_5_Template, 2, 0, ":svg:svg", 3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "div", 4)(7, "p", 5);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "button", 6);
    \u0275\u0275domListener("click", function Toast_For_2_Template_button_click_10_listener() {
      const toast_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.close(toast_r2.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(11, "svg", 3);
    \u0275\u0275domElement(12, "path", 7);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    \u0275\u0275classMap(\u0275\u0275interpolate1("toast toast-", toast_r2.type));
    \u0275\u0275property("@slideIn", void 0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(toast_r2.type === "success" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(toast_r2.type === "error" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(toast_r2.type === "info" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(toast_r2.type === "warning" ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, toast_r2.message));
  }
}
var Toast = class _Toast {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts$;
  close(id) {
    this.toastService.remove(id);
  }
  static \u0275fac = function Toast_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Toast)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Toast, selectors: [["app-toast"]], decls: 3, vars: 0, consts: [[1, "toast-container"], [3, "class"], [1, "toast-icon"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor"], [1, "toast-content"], [1, "toast-message"], ["type", "button", 1, "toast-close", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"], ["cx", "12", "cy", "12", "r", "10", "stroke-width", "2"], ["stroke-linecap", "round", "stroke-width", "2", "d", "M12 8v4M12 16h.01"], ["stroke-linecap", "round", "stroke-width", "2", "d", "M12 16v-4M12 8h.01"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"]], template: function Toast_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, Toast_For_2_Template, 13, 11, "div", 1, _forTrack06);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.toasts());
    }
  }, dependencies: [TranslateModule, TranslatePipe], styles: ["\n\n.toast-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 80px;\n  right: 20px;\n  z-index: var(--z-toast);\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  pointer-events: none;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 320px;\n  max-width: 420px;\n  padding: 16px;\n  background: var(--bg-primary);\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n  pointer-events: auto;\n  animation: _ngcontent-%COMP%_slideInRight 0.3s ease-out;\n  border-left: 4px solid;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.toast-success[_ngcontent-%COMP%] {\n  border-left-color: var(--color-success);\n}\n.toast-error[_ngcontent-%COMP%] {\n  border-left-color: var(--color-error);\n}\n.toast-info[_ngcontent-%COMP%] {\n  border-left-color: var(--color-info);\n}\n.toast-warning[_ngcontent-%COMP%] {\n  border-left-color: var(--color-warning);\n}\n.toast-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.toast-success[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: var(--color-success);\n}\n.toast-error[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.toast-info[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: var(--color-info);\n}\n.toast-warning[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n}\n.toast-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.toast-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.toast-message[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text-primary);\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1.5;\n  word-wrap: break-word;\n}\n.toast-close[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  border: none;\n  background: none;\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n}\n.toast-close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n@keyframes _ngcontent-%COMP%_slideInRight {\n  from {\n    opacity: 0;\n    transform: translateX(100px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@media (max-width: 768px) {\n  .toast-container[_ngcontent-%COMP%] {\n    top: 70px;\n    right: 12px;\n    left: 12px;\n  }\n  .toast[_ngcontent-%COMP%] {\n    min-width: auto;\n    max-width: none;\n  }\n}\n@media (max-width: 480px) {\n  .toast[_ngcontent-%COMP%] {\n    padding: 12px;\n    gap: 8px;\n  }\n  .toast-icon[_ngcontent-%COMP%] {\n    width: 20px;\n    height: 20px;\n  }\n  .toast-message[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .toast-close[_ngcontent-%COMP%] {\n    width: 18px;\n    height: 18px;\n  }\n}\n/*# sourceMappingURL=toast.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Toast, [{
    type: Component,
    args: [{ selector: "app-toast", standalone: true, imports: [TranslateModule], template: `<div class="toast-container">\r
  @for (toast of toasts(); track toast.id) {\r
    <div class="toast toast-{{ toast.type }}" [@slideIn]>\r
      <div class="toast-icon">\r
        @if (toast.type === 'success') {\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">\r
            <path\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
              stroke-width="2"\r
              d="M5 13l4 4L19 7"\r
            />\r
          </svg>\r
        }\r
        @if (toast.type === 'error') {\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">\r
            <circle cx="12" cy="12" r="10" stroke-width="2" />\r
            <path stroke-linecap="round" stroke-width="2" d="M12 8v4M12 16h.01" />\r
          </svg>\r
        }\r
        @if (toast.type === 'info') {\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">\r
            <circle cx="12" cy="12" r="10" stroke-width="2" />\r
            <path stroke-linecap="round" stroke-width="2" d="M12 16v-4M12 8h.01" />\r
          </svg>\r
        }\r
        @if (toast.type === 'warning') {\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">\r
            <path\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
              stroke-width="2"\r
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"\r
            />\r
          </svg>\r
        }\r
      </div>\r
\r
      <div class="toast-content">\r
        <p class="toast-message">{{ toast.message | translate }}</p>\r
      </div>\r
\r
      <button class="toast-close" (click)="close(toast.id)" type="button">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">\r
          <path\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
            stroke-width="2"\r
            d="M6 18L18 6M6 6l12 12"\r
          />\r
        </svg>\r
      </button>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/shared/components/toast/toast.css */\n.toast-container {\n  position: fixed;\n  top: 80px;\n  right: 20px;\n  z-index: var(--z-toast);\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  pointer-events: none;\n}\n.toast {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 320px;\n  max-width: 420px;\n  padding: 16px;\n  background: var(--bg-primary);\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n  pointer-events: auto;\n  animation: slideInRight 0.3s ease-out;\n  border-left: 4px solid;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.toast-success {\n  border-left-color: var(--color-success);\n}\n.toast-error {\n  border-left-color: var(--color-error);\n}\n.toast-info {\n  border-left-color: var(--color-info);\n}\n.toast-warning {\n  border-left-color: var(--color-warning);\n}\n.toast-icon {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.toast-success .toast-icon {\n  color: var(--color-success);\n}\n.toast-error .toast-icon {\n  color: var(--color-error);\n}\n.toast-info .toast-icon {\n  color: var(--color-info);\n}\n.toast-warning .toast-icon {\n  color: var(--color-warning);\n}\n.toast-icon svg {\n  width: 100%;\n  height: 100%;\n}\n.toast-content {\n  flex: 1;\n  min-width: 0;\n}\n.toast-message {\n  margin: 0;\n  color: var(--text-primary);\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1.5;\n  word-wrap: break-word;\n}\n.toast-close {\n  flex-shrink: 0;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  border: none;\n  background: none;\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n.toast-close:hover {\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n}\n.toast-close svg {\n  width: 100%;\n  height: 100%;\n}\n@keyframes slideInRight {\n  from {\n    opacity: 0;\n    transform: translateX(100px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@media (max-width: 768px) {\n  .toast-container {\n    top: 70px;\n    right: 12px;\n    left: 12px;\n  }\n  .toast {\n    min-width: auto;\n    max-width: none;\n  }\n}\n@media (max-width: 480px) {\n  .toast {\n    padding: 12px;\n    gap: 8px;\n  }\n  .toast-icon {\n    width: 20px;\n    height: 20px;\n  }\n  .toast-message {\n    font-size: 13px;\n  }\n  .toast-close {\n    width: 18px;\n    height: 18px;\n  }\n}\n/*# sourceMappingURL=toast.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Toast, { className: "Toast", filePath: "src/app/shared/components/toast/toast.ts", lineNumber: 13 });
})();

// src/app/core/services/image-cache.service.ts
var CACHE_NAME = "roy-shack-images-v1";
var ImageCacheService = class _ImageCacheService {
  supported = typeof caches !== "undefined";
  preloaded = false;
  preloadPromise = null;
  preloadCriticalImages() {
    return __async(this, null, function* () {
      if (!this.supported || this.preloaded)
        return;
      if (this.preloadPromise)
        return this.preloadPromise;
      this.preloadPromise = this.doPreload();
      return this.preloadPromise;
    });
  }
  doPreload() {
    return __async(this, null, function* () {
      try {
        const cache = yield caches.open(CACHE_NAME);
        const existingKeys = yield cache.keys();
        const existingUrls = new Set(existingKeys.map((r) => r.url));
        const urls = this.collectPreloadUrls();
        const toCache = urls.filter((url) => {
          const absolute = new URL(url, window.location.origin).href;
          return !existingUrls.has(absolute);
        });
        if (toCache.length === 0) {
          this.preloaded = true;
          return;
        }
        const batches = this.chunk(toCache, 6);
        for (const batch of batches) {
          const results = yield Promise.allSettled(batch.map((url) => __async(this, null, function* () {
            const res = yield fetch(url, { mode: "cors", credentials: "same-origin" });
            if (res.ok) {
              yield cache.put(url, res);
            }
          })));
          results.forEach((r, i) => {
            if (r.status === "rejected") {
              console.warn(`ImageCache: failed to cache ${batch[i]}`);
            }
          });
        }
        this.preloaded = true;
      } catch (err) {
        console.warn("ImageCache: preload failed", err);
        this.preloaded = true;
      }
    });
  }
  getCachedUrl(src) {
    return __async(this, null, function* () {
      if (!this.supported || !src)
        return src;
      try {
        const cache = yield caches.open(CACHE_NAME);
        const match = yield cache.match(src);
        if (match) {
          const blob = yield match.blob();
          return URL.createObjectURL(blob);
        }
        const response = yield fetch(src, { mode: "cors", credentials: "same-origin" });
        if (response.ok) {
          const cloned = response.clone();
          cache.put(src, cloned).catch(() => {
          });
          const blob = yield response.blob();
          return URL.createObjectURL(blob);
        }
      } catch {
      }
      return src;
    });
  }
  cacheUrl(src) {
    return __async(this, null, function* () {
      if (!this.supported || !src)
        return;
      try {
        const cache = yield caches.open(CACHE_NAME);
        const match = yield cache.match(src);
        if (match)
          return;
        const response = yield fetch(src, { mode: "cors", credentials: "same-origin" });
        if (response.ok) {
          yield cache.put(src, response);
        }
      } catch {
      }
    });
  }
  clearCache() {
    return __async(this, null, function* () {
      if (!this.supported)
        return;
      yield caches.delete(CACHE_NAME);
      this.preloaded = false;
      this.preloadPromise = null;
    });
  }
  collectPreloadUrls() {
    const urls = [];
    Object.values(ICONS).forEach((url) => {
      if (typeof url === "string" && url && !url.startsWith("data:")) {
        urls.push(url);
      }
    });
    Object.entries(IMAGES).forEach(([, url]) => {
      if (typeof url === "string" && url && !url.startsWith("data:") && !url.includes("placeholder")) {
        urls.push(url);
      }
    });
    return [...new Set(urls)];
  }
  chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
  static \u0275fac = function ImageCacheService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImageCacheService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ImageCacheService, factory: _ImageCacheService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImageCacheService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/app.ts
var App = class _App {
  route;
  router;
  translationService;
  title = signal("frontend", ...ngDevMode ? [{ debugName: "title" }] : []);
  imageCacheService = inject(ImageCacheService);
  constructor(route, router, translationService) {
    this.route = route;
    this.router = router;
    this.translationService = translationService;
  }
  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0);
    });
    const chpass = new URLSearchParams(window.location.search).get("chpass");
    if (chpass) {
      this.router.navigate(["/password-reset"], {
        queryParams: { chpass },
        replaceUrl: true
      });
    }
    this.imageCacheService.preloadCriticalImages();
  }
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(TranslationService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 5, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-header");
      \u0275\u0275elementStart(1, "main");
      \u0275\u0275element(2, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "app-footer")(4, "app-toast");
    }
  }, dependencies: [RouterOutlet, Header, Footer, Toast], styles: ["\n\nmain[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0;\n  padding: 0;\n  overflow-x: hidden;\n}\n/*# sourceMappingURL=app.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet, Header, Footer, Toast], template: "<app-header />\r\n<main>\r\n  <router-outlet />\r\n</main>\r\n<app-footer />\r\n<app-toast />\r\n", styles: ["/* src/app/app.css */\nmain {\n  display: block;\n  margin: 0;\n  padding: 0;\n  overflow-x: hidden;\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: TranslationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 16 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
