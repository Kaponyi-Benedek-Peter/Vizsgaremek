import {
  ProductService,
  enrichProduct
} from "./chunk-CE6P7JRB.js";
import {
  ICONS
} from "./chunk-KM3DUJ3P.js";
import {
  CartService,
  CurrencyService,
  toSignal
} from "./chunk-FGAT32LH.js";
import {
  TranslationService
} from "./chunk-NEOTYJOM.js";
import {
  ActivatedRoute,
  DatePipe,
  HttpClient,
  Router,
  RouterLink,
  environment
} from "./chunk-JGUC3CXT.js";
import {
  Component,
  Injectable,
  TranslateModule,
  TranslatePipe,
  __async,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  firstValueFrom,
  inject,
  map,
  of,
  setClassMetadata,
  signal,
  timeout,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-WLHV2EEC.js";

// src/app/core/models/review.model.ts
function enrichReview(review) {
  return __spreadProps(__spreadValues({}, review), {
    rating_number: parseFloat(review.rating?.replace(",", ".")) || 0
  });
}

// src/app/core/services/review.service.ts
var ReviewService = class _ReviewService {
  API_URL = environment.baseURL;
  http = inject(HttpClient);
  getReviewsByProductId(productId, page = 1, amount = 50) {
    const body = {
      product_id: btoa(productId),
      page: btoa(String(page)),
      amount: btoa(String(amount))
    };
    return this.http.post(`${this.API_URL}/api/get_all_reviews_page_by_product_id`, body).pipe(timeout(5e3), map((r) => {
      if (r.statuscode !== "200")
        throw new Error(`API Error: ${r.status}`);
      if (!Array.isArray(r.reviews))
        return [];
      return r.reviews.map(enrichReview);
    }), catchError((err) => {
      console.error("ReviewService: Failed to load reviews", err);
      return of([]);
    }));
  }
  getAverageRating(reviews) {
    if (reviews.length === 0)
      return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating_number, 0);
    return sum / reviews.length;
  }
  getRatingStars(rating_number) {
    if (!rating_number)
      return "";
    const full = Math.floor(rating_number);
    const half = rating_number % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return "\u2605".repeat(full) + (half ? "\u2BE8" : "") + "\u2606".repeat(empty);
  }
  static \u0275fac = function ReviewService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReviewService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReviewService, factory: _ReviewService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReviewService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/pages/product-detail/product-detail.ts
var _c0 = () => ["/home"];
var _c1 = () => ["/products"];
var _forTrack0 = ($index, $item) => $item.id;
function ProductDetail_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 4);
    \u0275\u0275elementStart(2, "p", 5);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 1, "common.loading"));
  }
}
function ProductDetail_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 6);
    \u0275\u0275element(2, "img", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 8);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 9);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 10);
    \u0275\u0275listener("click", function ProductDetail_Conditional_2_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.icons.search, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 4, "product.not_found"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 6, "product.not_found_desc"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u2190 ", \u0275\u0275pipeBind1(11, 8, "product.back_to_products"), " ");
  }
}
function ProductDetail_Conditional_3_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("click", function ProductDetail_Conditional_3_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.previousImage());
    });
    \u0275\u0275text(2, " \u2039 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("disabled", !ctx_r1.canGoPrevious());
    \u0275\u0275property("disabled", !ctx_r1.canGoPrevious());
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 4, "product.previous_image"));
  }
}
function ProductDetail_Conditional_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275text(2, "\u211E");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("title", \u0275\u0275pipeBind1(1, 1, "product.requires_prescription"));
  }
}
function ProductDetail_Conditional_3_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("-", ctx_r1.product().discount_percentage, "%");
  }
}
function ProductDetail_Conditional_3_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("click", function ProductDetail_Conditional_3_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextImage());
    });
    \u0275\u0275text(2, " \u203A ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("disabled", !ctx_r1.canGoNext());
    \u0275\u0275property("disabled", !ctx_r1.canGoNext());
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 6, "product.next_image"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.selectedImageIndex() + 1, " / ", ctx_r1.images.length);
  }
}
function ProductDetail_Conditional_3_Conditional_22_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 56);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("click", function ProductDetail_Conditional_3_Conditional_22_For_2_Template_button_click_0_listener() {
      const $index_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectImage($index_r7));
    });
    \u0275\u0275element(2, "img", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r8 = ctx.$implicit;
    const $index_r7 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.selectedImageIndex() === $index_r7);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 5, "product.view_image") + " " + ($index_r7 + 1));
    \u0275\u0275advance(2);
    \u0275\u0275property("src", img_r8, \u0275\u0275sanitizeUrl)("alt", ctx_r1.product().name);
  }
}
function ProductDetail_Conditional_3_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275repeaterCreate(1, ProductDetail_Conditional_3_Conditional_22_For_2_Template, 3, 7, "button", 55, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.images);
  }
}
function ProductDetail_Conditional_3_Conditional_30_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("(", ctx_r1.review_count(), " ", \u0275\u0275pipeBind1(2, 2, "product.reviews"), ")");
  }
}
function ProductDetail_Conditional_3_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ProductDetail_Conditional_3_Conditional_30_Conditional_5_Template, 3, 4, "span", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getRatingStars());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.product().rating_number.toFixed(1));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.review_count() > 0 ? 5 : -1);
  }
}
function ProductDetail_Conditional_3_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 62);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formattedPrice());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formattedDiscountedPrice());
  }
}
function ProductDetail_Conditional_3_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formattedPrice());
  }
}
function ProductDetail_Conditional_3_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span", 33);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 63);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "product.manufacturer"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product().manufacturer);
  }
}
function ProductDetail_Conditional_3_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span", 33);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 63);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "product.brand"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product().brand);
  }
}
function ProductDetail_Conditional_3_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "span", 33);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 64);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "product.sku"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product().sku);
  }
}
function ProductDetail_Conditional_3_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate2(" (", ctx_r1.product().stock_quantity, " ", \u0275\u0275pipeBind1(1, 2, "product.pieces"), ") ");
  }
}
function ProductDetail_Conditional_3_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "common.added_to_cart"), " ");
  }
}
function ProductDetail_Conditional_3_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.icons.basket, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, "common.add_to_cart"), " ");
  }
}
function ProductDetail_Conditional_3_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275element(1, "img", 67);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.icons.info, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "product.prescription_required_notice"));
  }
}
function ProductDetail_Conditional_3_Conditional_73_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 2, "product.active_ingredients"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product().active_ingredients);
  }
}
function ProductDetail_Conditional_3_Conditional_73_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 2, "product.dosage"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product().dosage);
  }
}
function ProductDetail_Conditional_3_Conditional_73_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 2, "product.packaging"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product().packaging);
  }
}
function ProductDetail_Conditional_3_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "h2", 45);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ProductDetail_Conditional_3_Conditional_73_Conditional_4_Template, 6, 4, "div", 68);
    \u0275\u0275conditionalCreate(5, ProductDetail_Conditional_3_Conditional_73_Conditional_5_Template, 6, 4, "div", 68);
    \u0275\u0275conditionalCreate(6, ProductDetail_Conditional_3_Conditional_73_Conditional_6_Template, 6, 4, "div", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, "product.pharmaceutical_details"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.product().active_ingredients ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.product().dosage ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.product().packaging ? 6 : -1);
  }
}
function ProductDetail_Conditional_3_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "div", 69);
    \u0275\u0275elementEnd();
  }
}
function ProductDetail_Conditional_3_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "img", 70);
    \u0275\u0275elementStart(2, "p", 71);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.icons.statComments, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "product.no_reviews"));
  }
}
function ProductDetail_Conditional_3_Conditional_80_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 73)(2, "span", 74);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 75);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 76);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 77);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const review_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getRatingStars(review_r9.rating_number));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(review_r9.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 4, review_r9.created_at, "yyyy. MM. dd."));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(review_r9.body);
  }
}
function ProductDetail_Conditional_3_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275repeaterCreate(1, ProductDetail_Conditional_3_Conditional_80_For_2_Template, 11, 7, "div", 72, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.reviews());
  }
}
function ProductDetail_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "nav", 11)(2, "a", 12);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 13);
    \u0275\u0275text(6, "\u203A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 12);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 13);
    \u0275\u0275text(11, "\u203A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 14);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 15)(15, "div", 16)(16, "div", 17);
    \u0275\u0275conditionalCreate(17, ProductDetail_Conditional_3_Conditional_17_Template, 3, 6, "button", 18);
    \u0275\u0275element(18, "img", 19);
    \u0275\u0275conditionalCreate(19, ProductDetail_Conditional_3_Conditional_19_Template, 3, 3, "span", 20);
    \u0275\u0275conditionalCreate(20, ProductDetail_Conditional_3_Conditional_20_Template, 2, 1, "span", 21);
    \u0275\u0275conditionalCreate(21, ProductDetail_Conditional_3_Conditional_21_Template, 5, 8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(22, ProductDetail_Conditional_3_Conditional_22_Template, 3, 0, "div", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 23)(24, "div", 24)(25, "span", 25)(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "h1", 26);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(30, ProductDetail_Conditional_3_Conditional_30_Template, 6, 3, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 28);
    \u0275\u0275conditionalCreate(32, ProductDetail_Conditional_3_Conditional_32_Template, 5, 2, "div", 29)(33, ProductDetail_Conditional_3_Conditional_33_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 31);
    \u0275\u0275conditionalCreate(35, ProductDetail_Conditional_3_Conditional_35_Template, 6, 4, "div", 32);
    \u0275\u0275conditionalCreate(36, ProductDetail_Conditional_3_Conditional_36_Template, 6, 4, "div", 32);
    \u0275\u0275conditionalCreate(37, ProductDetail_Conditional_3_Conditional_37_Template, 6, 4, "div", 32);
    \u0275\u0275elementStart(38, "div", 32)(39, "span", 33);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 34);
    \u0275\u0275text(43);
    \u0275\u0275pipe(44, "translate");
    \u0275\u0275pipe(45, "translate");
    \u0275\u0275conditionalCreate(46, ProductDetail_Conditional_3_Conditional_46_Template, 2, 4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 35)(48, "div", 36)(49, "button", 37);
    \u0275\u0275pipe(50, "translate");
    \u0275\u0275listener("click", function ProductDetail_Conditional_3_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.decreaseQuantity());
    });
    \u0275\u0275text(51, " \u2212 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "span", 38);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "button", 37);
    \u0275\u0275pipe(55, "translate");
    \u0275\u0275listener("click", function ProductDetail_Conditional_3_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.increaseQuantity());
    });
    \u0275\u0275text(56, " + ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 39)(58, "span", 40);
    \u0275\u0275text(59);
    \u0275\u0275pipe(60, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "span", 41);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "button", 42);
    \u0275\u0275listener("click", function ProductDetail_Conditional_3_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleAddToCart());
    });
    \u0275\u0275conditionalCreate(64, ProductDetail_Conditional_3_Conditional_64_Template, 4, 3)(65, ProductDetail_Conditional_3_Conditional_65_Template, 3, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(66, ProductDetail_Conditional_3_Conditional_66_Template, 5, 4, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "div", 44)(68, "h2", 45);
    \u0275\u0275text(69);
    \u0275\u0275pipe(70, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "p", 46);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(73, ProductDetail_Conditional_3_Conditional_73_Template, 7, 6, "div", 47);
    \u0275\u0275elementStart(74, "div", 48)(75, "h2", 45);
    \u0275\u0275text(76);
    \u0275\u0275pipe(77, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(78, ProductDetail_Conditional_3_Conditional_78_Template, 2, 0, "div", 49)(79, ProductDetail_Conditional_3_Conditional_79_Template, 5, 4, "div", 50)(80, ProductDetail_Conditional_3_Conditional_80_Template, 3, 0, "div", 51);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(65, _c0));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 45, "header.home"));
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(66, _c1));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 47, "header.products"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.product().name);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.images.length > 1 ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.selectedImage, \u0275\u0275sanitizeUrl)("alt", ctx_r1.product().name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.product().requires_prescription ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.has_discount ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.images.length > 1 ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.images.length > 0 ? 22 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.categoryName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.product().name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.product().rating_number > 0 ? 30 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.has_discount ? 32 : 33);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.product().manufacturer ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.product().brand ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.product().sku ? 37 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(41, 49, "product.availability"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("in-stock", ctx_r1.product().in_stock)("out-of-stock", !ctx_r1.product().in_stock);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.product().in_stock ? \u0275\u0275pipeBind1(44, 51, "product.in_stock") : \u0275\u0275pipeBind1(45, 53, "product.out_of_stock"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.product().in_stock && ctx_r1.product().stock_quantity ? 46 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", !ctx_r1.product().in_stock);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.quantity() <= 1 || !ctx_r1.product().in_stock);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(50, 55, "product.decrease_quantity"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.quantity());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.quantity() >= ctx_r1.product().stock_quantity || !ctx_r1.product().in_stock);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(55, 57, "product.increase_quantity"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(60, 59, "product.total"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formattedTotalPrice());
    \u0275\u0275advance();
    \u0275\u0275classProp("added", ctx_r1.addedToCart());
    \u0275\u0275property("disabled", !ctx_r1.canAddToCart);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.addedToCart() ? 64 : 65);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.product().requires_prescription ? 66 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(70, 61, "product.description"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.product().description);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.product().active_ingredients || ctx_r1.product().dosage || ctx_r1.product().packaging ? 73 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(77, 63, "product.reviews_title"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.reviewsLoading() ? 78 : ctx_r1.reviews().length === 0 ? 79 : 80);
  }
}
var ProductDetail = class _ProductDetail {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  reviewService = inject(ReviewService);
  cartService = inject(CartService);
  currencyService = inject(CurrencyService);
  translationService = inject(TranslationService);
  icons = ICONS;
  currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: this.translationService.getCurrentLanguage()
  });
  langSub;
  product = signal(null, ...ngDevMode ? [{ debugName: "product" }] : []);
  reviews = signal([], ...ngDevMode ? [{ debugName: "reviews" }] : []);
  isLoading = signal(true, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  reviewsLoading = signal(false, ...ngDevMode ? [{ debugName: "reviewsLoading" }] : []);
  notFound = signal(false, ...ngDevMode ? [{ debugName: "notFound" }] : []);
  quantity = signal(1, ...ngDevMode ? [{ debugName: "quantity" }] : []);
  selectedImageIndex = signal(0, ...ngDevMode ? [{ debugName: "selectedImageIndex" }] : []);
  addedToCart = signal(false, ...ngDevMode ? [{ debugName: "addedToCart" }] : []);
  galleryImages = signal([], ...ngDevMode ? [{ debugName: "galleryImages" }] : []);
  canGoPrevious = computed(() => this.selectedImageIndex() > 0, ...ngDevMode ? [{ debugName: "canGoPrevious" }] : []);
  canGoNext = computed(() => this.product() !== null && this.selectedImageIndex() < this.product().images.length - 1, ...ngDevMode ? [{ debugName: "canGoNext" }] : []);
  review_count = computed(() => this.reviews().length, ...ngDevMode ? [{ debugName: "review_count" }] : []);
  get images() {
    return this.product()?.images ?? [];
  }
  get selectedImage() {
    return this.images[this.selectedImageIndex()] ?? "";
  }
  get has_discount() {
    return this.product()?.has_discount ?? false;
  }
  formattedPrice = computed(() => {
    const p = this.product();
    if (!p)
      return "";
    return this.currencyService.formatPrice(this.currencyService.getBasePrice(p));
  }, ...ngDevMode ? [{ debugName: "formattedPrice" }] : []);
  formattedDiscountedPrice = computed(() => {
    const p = this.product();
    if (!p)
      return "";
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(p));
  }, ...ngDevMode ? [{ debugName: "formattedDiscountedPrice" }] : []);
  formattedTotalPrice = computed(() => {
    const p = this.product();
    if (!p)
      return "";
    const unitPrice = this.currencyService.getDiscountedPrice(p);
    return this.currencyService.formatPrice(unitPrice * this.quantity());
  }, ...ngDevMode ? [{ debugName: "formattedTotalPrice" }] : []);
  get canAddToCart() {
    const p = this.product();
    return !!(p?.in_stock && !p?.requires_prescription && this.quantity() <= p.stock_quantity);
  }
  get categoryName() {
    const cat = this.productService.getCategoryById(this.product()?.category ?? "");
    const lang = this.currentLang();
    if (!cat)
      return "";
    return lang === "hu" ? cat.name_hu : lang === "de" ? cat.name_de : cat.name_en;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const id = this.route.snapshot.paramMap.get("id");
      if (!id) {
        this.router.navigate(["/products"]);
        return;
      }
      yield Promise.all([this.productService.loadProducts(), this.productService.loadCategories()]);
      const all = this.productService.products();
      const found = all.find((p) => p.id === id);
      if (found) {
        this.product.set(found);
        this.loadReviews(id);
        this.loadProductImages(id, found);
      } else {
        this.notFound.set(true);
      }
      this.isLoading.set(false);
      this.langSub = this.translationService.currentLang$.subscribe((lang) => {
        const current = this.product();
        if (current) {
          this.product.set(enrichProduct(current, lang, this.galleryImages()));
        }
      });
    });
  }
  ngOnDestroy() {
    this.langSub?.unsubscribe();
    document.body.style.overflow = "";
  }
  loadProductImages(productId, rawProduct) {
    return __async(this, null, function* () {
      try {
        const images = yield firstValueFrom(this.productService.getProductImages(productId));
        this.galleryImages.set(images);
        const lang = this.currentLang();
        this.product.set(enrichProduct(rawProduct, lang, images));
        this.selectedImageIndex.set(0);
      } catch (err) {
        console.warn("Could not load gallery images, thumbnail will be used", err);
      }
    });
  }
  loadReviews(productId) {
    return __async(this, null, function* () {
      this.reviewsLoading.set(true);
      try {
        const reviews = yield firstValueFrom(this.reviewService.getReviewsByProductId(productId));
        this.reviews.set(reviews);
      } finally {
        this.reviewsLoading.set(false);
      }
    });
  }
  getRatingStars(rating_number) {
    const rating = rating_number ?? this.product()?.rating_number ?? 0;
    if (!rating)
      return "";
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return "\u2605".repeat(full) + (half ? "\u2BE8" : "") + "\u2606".repeat(empty);
  }
  selectImage(index) {
    this.selectedImageIndex.set(index);
  }
  nextImage() {
    if (this.canGoNext()) {
      this.selectedImageIndex.update((i) => i + 1);
    }
  }
  previousImage() {
    if (this.canGoPrevious()) {
      this.selectedImageIndex.update((i) => i - 1);
    }
  }
  increaseQuantity() {
    const p = this.product();
    if (p && this.quantity() < p.stock_quantity) {
      this.quantity.update((q) => q + 1);
    }
  }
  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }
  handleAddToCart() {
    const p = this.product();
    if (this.canAddToCart && p) {
      this.cartService.addToCart(p, this.quantity());
      this.addedToCart.set(true);
      setTimeout(() => this.addedToCart.set(false), 2500);
    }
  }
  goBack() {
    this.router.navigate(["/products"]);
  }
  static \u0275fac = function ProductDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductDetail)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetail, selectors: [["app-product-detail"]], decls: 4, vars: 3, consts: [[1, "product-detail-page"], [1, "loading-state"], [1, "not-found-state"], [1, "detail-container"], [1, "spinner"], [1, "loading-text"], [1, "not-found-icon"], ["alt", "", "aria-hidden", "true", 1, "state-icon", 3, "src"], [1, "not-found-title"], [1, "not-found-desc"], [1, "back-btn", 3, "click"], ["aria-label", "breadcrumb", 1, "breadcrumb"], [1, "breadcrumb-link", 3, "routerLink"], [1, "breadcrumb-sep"], [1, "breadcrumb-current"], [1, "detail-layout"], [1, "image-section"], [1, "main-image-wrapper"], [1, "image-nav", "prev", 3, "disabled"], ["loading", "eager", 1, "main-image", 3, "src", "alt"], [1, "rx-badge", 3, "title"], [1, "discount-badge"], [1, "thumbnail-strip"], [1, "info-section"], [1, "info-header"], [1, "category-badge"], [1, "product-title"], [1, "rating-row"], [1, "price-block"], [1, "price-with-discount"], [1, "price"], [1, "meta-grid"], [1, "meta-row"], [1, "meta-label"], [1, "meta-value", "availability"], [1, "cart-section"], [1, "quantity-controls"], [1, "qty-btn", 3, "click", "disabled"], [1, "qty-value"], [1, "total-display"], [1, "total-label"], [1, "total-value"], [1, "add-to-cart-btn", 3, "click", "disabled"], [1, "prescription-notice"], [1, "description-block"], [1, "section-heading"], [1, "description-text"], [1, "pharma-block"], [1, "reviews-block"], [1, "reviews-loading"], [1, "reviews-empty"], [1, "reviews-list"], [1, "image-nav", "prev", 3, "click", "disabled"], [1, "image-nav", "next", 3, "click", "disabled"], [1, "image-counter"], [1, "thumb", 3, "active"], [1, "thumb", 3, "click"], ["loading", "lazy", 3, "src", "alt"], [1, "rating-stars"], [1, "rating-value"], [1, "rating-count"], [1, "original-price"], [1, "discounted-price"], [1, "meta-value"], [1, "meta-value", "sku"], [1, "btn-icon"], ["alt", "", "aria-hidden", "true", 1, "btn-icon-img", 3, "src"], ["alt", "", "aria-hidden", "true", 1, "notice-icon-img", 3, "src"], [1, "pharma-item"], [1, "spinner", "spinner-sm"], ["alt", "", "aria-hidden", "true", 1, "reviews-empty-icon", 3, "src"], [1, "reviews-empty-text"], [1, "review-item"], [1, "review-header"], [1, "review-stars"], [1, "review-title"], [1, "review-date"], [1, "review-body"]], template: function ProductDetail_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ProductDetail_Conditional_1_Template, 5, 3, "div", 1);
      \u0275\u0275conditionalCreate(2, ProductDetail_Conditional_2_Template, 12, 10, "div", 2);
      \u0275\u0275conditionalCreate(3, ProductDetail_Conditional_3_Template, 81, 67, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading() && ctx.notFound() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading() && ctx.product() ? 3 : -1);
    }
  }, dependencies: [TranslateModule, RouterLink, DatePipe, TranslatePipe], styles: ['\n\n.product-detail-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--color-background);\n}\n.state-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.5;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-4);\n  padding: var(--space-16) var(--space-6);\n  min-height: 60vh;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border: 3px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.75s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-text[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  font-size: var(--text-base);\n}\n.not-found-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-4);\n  padding: var(--space-16) var(--space-6);\n  min-height: 60vh;\n  text-align: center;\n}\n.not-found-icon[_ngcontent-%COMP%] {\n  font-size: 5rem;\n  opacity: 0.4;\n}\n.not-found-title[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0;\n}\n.not-found-desc[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--color-text-secondary);\n  margin: 0;\n  max-width: 400px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-8);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  border-radius: var(--radius-full);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 48px;\n  box-shadow: var(--shadow-primary);\n}\n@media (hover: hover) and (pointer: fine) {\n  .back-btn[_ngcontent-%COMP%]:hover {\n    background: var(--gradient-primary-hover);\n    box-shadow: var(--shadow-primary-lg);\n    transform: translateY(-2px);\n  }\n}\n.detail-container[_ngcontent-%COMP%] {\n  max-width: 1240px;\n  margin: 0 auto;\n  padding: var(--space-8) var(--space-6);\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: var(--space-2);\n  margin-bottom: var(--space-8);\n  font-size: var(--text-sm);\n}\n.breadcrumb-link[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n  font-weight: var(--font-medium);\n}\n@media (hover: hover) and (pointer: fine) {\n  .breadcrumb-link[_ngcontent-%COMP%]:hover {\n    color: var(--color-primary);\n  }\n}\n.breadcrumb-sep[_ngcontent-%COMP%] {\n  color: var(--color-text-tertiary);\n}\n.breadcrumb-current[_ngcontent-%COMP%] {\n  color: var(--color-text-primary);\n  font-weight: var(--font-semibold);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 220px;\n}\n.detail-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var(--space-8);\n}\n@media (min-width: 768px) {\n  .detail-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    align-items: start;\n  }\n}\n@media (min-width: 1024px) {\n  .detail-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 5fr 6fr;\n    gap: var(--space-16);\n  }\n}\n.image-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  position: sticky;\n  top: var(--space-6);\n}\n@media (max-width: 767px) {\n  .image-section[_ngcontent-%COMP%] {\n    position: static;\n  }\n}\n.main-image-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 1;\n  background: var(--gradient-image-bg);\n  border-radius: var(--radius-2xl);\n  overflow: hidden;\n  border: 1px solid var(--color-border);\n  box-shadow: var(--shadow-xl);\n}\n.main-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  display: block;\n  padding: 12px;\n  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));\n  transition: transform var(--transition-slow);\n}\n.image-nav[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 48px;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  color: white;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  font-size: 26px;\n  font-weight: bold;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  z-index: 5;\n  font-family: var(--font-primary);\n  line-height: 1;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.image-nav.prev[_ngcontent-%COMP%] {\n  left: 12px;\n}\n.image-nav.next[_ngcontent-%COMP%] {\n  right: 12px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .image-nav[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: rgba(6, 122, 69, 0.8);\n    border-color: rgba(255, 255, 255, 0.4);\n    transform: translateY(-50%) scale(1.08);\n  }\n}\n.image-nav[_ngcontent-%COMP%]:disabled, \n.image-nav.disabled[_ngcontent-%COMP%] {\n  opacity: 0.25;\n  cursor: not-allowed;\n}\n.image-counter[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 14px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  color: white;\n  padding: 5px 16px;\n  border-radius: var(--radius-full);\n  font-size: var(--text-sm);\n  font-weight: var(--font-semibold);\n  -webkit-user-select: none;\n  user-select: none;\n  border: 1px solid rgba(255, 255, 255, 0.15);\n}\n.rx-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: var(--gradient-primary);\n  color: white;\n  width: 46px;\n  height: 46px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n  font-weight: var(--font-bold);\n  box-shadow: var(--shadow-primary);\n  z-index: 2;\n}\n.discount-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n  background:\n    linear-gradient(\n      135deg,\n      #dc2626,\n      #ef4444);\n  color: white;\n  padding: 4px 12px;\n  border-radius: var(--radius-full);\n  font-size: var(--text-sm);\n  font-weight: var(--font-bold);\n  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.45);\n  z-index: 2;\n}\n.thumbnail-strip[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n  overflow-x: auto;\n  padding: var(--space-1);\n  scrollbar-width: thin;\n  scrollbar-color: var(--color-primary) var(--color-surface-elevated);\n}\n.thumbnail-strip[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 4px;\n}\n.thumbnail-strip[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--color-primary);\n  border-radius: 2px;\n}\n.thumb[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 76px;\n  height: 76px;\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  cursor: pointer;\n  background: var(--gradient-image-bg);\n  padding: 4px;\n  transition: all var(--transition-fast);\n}\n@media (hover: hover) and (pointer: fine) {\n  .thumb[_ngcontent-%COMP%]:hover {\n    border-color: var(--color-primary);\n    transform: scale(1.06);\n    box-shadow: var(--shadow-primary);\n  }\n}\n.thumb.active[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  border-width: 3px;\n  box-shadow: var(--shadow-primary);\n}\n.thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.info-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-6);\n}\n.info-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n.category-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: fit-content;\n  padding: 5px 14px;\n  background: var(--color-primary-light);\n  color: #ffffff;\n  border: 1px solid rgba(6, 122, 69, 0.2);\n  border-radius: var(--radius-full);\n  font-size: 0.7rem;\n  font-weight: var(--font-bold);\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.product-title[_ngcontent-%COMP%] {\n  font-size: clamp(1.5rem, 4vw, 2.2rem);\n  font-weight: var(--font-extrabold);\n  color: var(--color-text-primary);\n  margin: 0;\n  line-height: 1.2;\n  letter-spacing: -0.01em;\n}\n.rating-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n}\n.rating-stars[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n  font-size: var(--text-lg);\n  letter-spacing: -1px;\n}\n.rating-value[_ngcontent-%COMP%] {\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n}\n.rating-count[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  font-size: var(--text-sm);\n}\n.price-block[_ngcontent-%COMP%] {\n  padding: var(--space-5) 0;\n  border-top: 1px solid var(--color-border);\n  border-bottom: 1px solid var(--color-border);\n}\n.price[_ngcontent-%COMP%] {\n  font-size: clamp(1.75rem, 4vw, 2.5rem);\n  font-weight: 800;\n  color: var(--color-primary);\n  line-height: 1;\n}\n.price-with-discount[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n}\n.original-price[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--color-text-tertiary);\n  text-decoration: line-through;\n}\n.discounted-price[_ngcontent-%COMP%] {\n  font-size: clamp(1.75rem, 4vw, 2.5rem);\n  font-weight: 800;\n  color: var(--color-error);\n  line-height: 1;\n}\n.meta-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  overflow: hidden;\n  box-shadow: var(--shadow-xs);\n}\n.meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  border-bottom: 1px solid var(--color-border);\n  transition: background var(--transition-fast);\n}\n.meta-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.meta-row[_ngcontent-%COMP%]:nth-child(even) {\n  background: var(--color-surface-elevated);\n}\n@media (hover: hover) and (pointer: fine) {\n  .meta-row[_ngcontent-%COMP%]:hover {\n    background: var(--color-primary-light);\n  }\n}\n.meta-label[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  font-weight: var(--font-medium);\n  flex-shrink: 0;\n  margin-right: var(--space-4);\n}\n.meta-value[_ngcontent-%COMP%] {\n  color: var(--color-text-primary);\n  font-weight: var(--font-semibold);\n  text-align: right;\n}\n.meta-value.sku[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: var(--text-xs);\n  letter-spacing: 0.05em;\n  background: var(--color-surface-elevated);\n  padding: 2px 8px;\n  border-radius: var(--radius-sm);\n}\n.meta-value.in-stock[_ngcontent-%COMP%] {\n  color: var(--color-success);\n}\n.meta-value.out-of-stock[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.cart-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n  padding: var(--space-6);\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-2xl);\n  box-shadow: var(--shadow-lg);\n  position: relative;\n  overflow: hidden;\n}\n.cart-section[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: var(--gradient-primary);\n}\n.quantity-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-5);\n  padding: var(--space-3);\n  background: var(--color-surface-elevated);\n  border-radius: var(--radius-xl);\n  border: 1px solid var(--color-border);\n}\n.quantity-controls.disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.qty-btn[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: var(--radius-lg);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all var(--transition-bounce);\n  font-family: var(--font-primary);\n  line-height: 1;\n  box-shadow: var(--shadow-primary);\n}\n@media (hover: hover) and (pointer: fine) {\n  .qty-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--gradient-primary-hover);\n    box-shadow: var(--shadow-primary-lg);\n    transform: scale(1.1);\n  }\n}\n.qty-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  background: var(--color-text-tertiary);\n  box-shadow: none;\n}\n.qty-value[_ngcontent-%COMP%] {\n  min-width: 60px;\n  text-align: center;\n  font-size: var(--text-2xl);\n  font-weight: var(--font-extrabold);\n  color: var(--color-text-primary);\n}\n.total-display[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--space-4) var(--space-5);\n  background: var(--color-primary-light);\n  border-radius: var(--radius-xl);\n  border: 1px solid rgba(6, 122, 69, 0.15);\n}\n.total-label[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  font-weight: var(--font-medium);\n  color: var(--color-text-on-primary);\n}\n.total-value[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: 800;\n  color: #ffffff;\n}\n.add-to-cart-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-5) var(--space-6);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  border-radius: var(--radius-xl);\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-3);\n  font-family: var(--font-primary);\n  min-height: 56px;\n  box-shadow: var(--shadow-primary);\n  letter-spacing: 0.02em;\n}\n@media (hover: hover) and (pointer: fine) {\n  .add-to-cart-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--gradient-primary-hover);\n    box-shadow: var(--shadow-primary-lg);\n    transform: translateY(-2px);\n  }\n}\n.add-to-cart-btn.added[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #15803d,\n      #16a34a);\n  box-shadow: 0 8px 24px rgba(22, 163, 74, 0.4);\n}\n.add-to-cart-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n  background: var(--color-text-secondary);\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: var(--text-xl);\n}\n.btn-icon-img[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: brightness(0) saturate(100%) invert(1);\n}\n.prescription-notice[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: rgba(17, 185, 252, 0.1);\n  border: 1px solid rgba(17, 185, 252, 0.3);\n  color: var(--color-info);\n  border-radius: var(--radius-lg);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n}\n.notice-icon-img[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n}\n.description-block[_ngcontent-%COMP%], \n.pharma-block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n.section-heading[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0;\n  padding-bottom: var(--space-2);\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  letter-spacing: -0.01em;\n}\n.section-heading[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  height: 2px;\n  background: var(--gradient-primary);\n  border-radius: 2px;\n  margin-left: var(--space-2);\n  opacity: 0.5;\n}\n.description-text[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  line-height: var(--leading-relaxed);\n  color: var(--color-text-secondary);\n  margin: 0;\n}\n.pharma-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  padding: var(--space-4);\n  background: var(--color-surface-elevated);\n  border-radius: var(--radius-lg);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-primary);\n  box-shadow: var(--shadow-xs);\n  transition: all var(--transition-fast);\n}\n@media (hover: hover) and (pointer: fine) {\n  .pharma-item[_ngcontent-%COMP%]:hover {\n    transform: translateX(4px);\n    box-shadow: var(--shadow-sm);\n  }\n}\n.pharma-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-primary);\n  font-weight: var(--font-semibold);\n}\n.pharma-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  line-height: var(--leading-normal);\n}\n@media (max-width: 480px) {\n  .detail-container[_ngcontent-%COMP%] {\n    padding: var(--space-4) var(--space-3);\n  }\n  .breadcrumb[_ngcontent-%COMP%] {\n    font-size: var(--text-xs);\n    margin-bottom: var(--space-5);\n  }\n  .breadcrumb-current[_ngcontent-%COMP%] {\n    max-width: 150px;\n  }\n  .thumb[_ngcontent-%COMP%] {\n    width: 64px;\n    height: 64px;\n  }\n  .cart-section[_ngcontent-%COMP%] {\n    padding: var(--space-4) var(--space-4);\n  }\n  .qty-value[_ngcontent-%COMP%] {\n    min-width: 48px;\n    font-size: var(--text-xl);\n  }\n  .total-value[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n  .add-to-cart-btn[_ngcontent-%COMP%] {\n    font-size: var(--text-base);\n    min-height: 50px;\n  }\n}\n@media (max-width: 375px) {\n  .detail-container[_ngcontent-%COMP%] {\n    padding: var(--space-3) var(--space-2);\n  }\n  .qty-btn[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n  }\n  .total-display[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: var(--space-1);\n    text-align: center;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .add-to-cart-btn[_ngcontent-%COMP%], \n   .qty-btn[_ngcontent-%COMP%], \n   .thumb[_ngcontent-%COMP%], \n   .image-nav[_ngcontent-%COMP%], \n   .pharma-item[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.reviews-block[_ngcontent-%COMP%] {\n  margin-top: var(--space-8);\n  padding-top: var(--space-6);\n  border-top: 1px solid var(--color-border);\n}\n.reviews-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: var(--space-8) 0;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-width: 2px;\n}\n.reviews-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-10) var(--space-4);\n  text-align: center;\n}\n.reviews-empty-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  width: 48px;\n  height: 48px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.45;\n}\n.reviews-empty-text[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--color-text-secondary);\n  margin: 0;\n}\n.reviews-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n.review-item[_ngcontent-%COMP%] {\n  padding: var(--space-4) var(--space-5);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  transition: border-color var(--transition-normal);\n}\n.review-item[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary-mid);\n}\n.review-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n  margin-bottom: var(--space-2);\n}\n.review-stars[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n  letter-spacing: -1px;\n  font-size: var(--text-base);\n  flex-shrink: 0;\n}\n.review-title[_ngcontent-%COMP%] {\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  font-size: var(--text-base);\n  flex: 1;\n  min-width: 0;\n}\n.review-date[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--color-text-tertiary);\n  flex-shrink: 0;\n}\n.review-body[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-relaxed);\n  margin: 0;\n}\n@media (max-width: 480px) {\n  .review-item[_ngcontent-%COMP%] {\n    padding: var(--space-3) var(--space-4);\n  }\n  .review-header[_ngcontent-%COMP%] {\n    gap: var(--space-2);\n  }\n  .review-date[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .review-item[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=product-detail.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductDetail, [{
    type: Component,
    args: [{ selector: "app-product-detail", standalone: true, imports: [DatePipe, TranslateModule, RouterLink], template: `<div class="product-detail-page">\r
  @if (isLoading()) {\r
    <div class="loading-state">\r
      <div class="spinner"></div>\r
      <p class="loading-text">{{ 'common.loading' | translate }}</p>\r
    </div>\r
  }\r
\r
  @if (!isLoading() && notFound()) {\r
    <div class="not-found-state">\r
      <!-- \u{1F50D} \u2192 searchwhite.webp -->\r
      <div class="not-found-icon">\r
        <img [src]="icons.search" alt="" class="state-icon" aria-hidden="true" />\r
      </div>\r
      <h2 class="not-found-title">{{ 'product.not_found' | translate }}</h2>\r
      <p class="not-found-desc">{{ 'product.not_found_desc' | translate }}</p>\r
      <button class="back-btn" (click)="goBack()">\r
        \u2190 {{ 'product.back_to_products' | translate }}\r
      </button>\r
    </div>\r
  }\r
\r
  @if (!isLoading() && product()) {\r
    <div class="detail-container">\r
      <nav class="breadcrumb" aria-label="breadcrumb">\r
        <a [routerLink]="['/home']" class="breadcrumb-link">{{ 'header.home' | translate }}</a>\r
        <span class="breadcrumb-sep">\u203A</span>\r
        <a [routerLink]="['/products']" class="breadcrumb-link">{{\r
          'header.products' | translate\r
        }}</a>\r
        <span class="breadcrumb-sep">\u203A</span>\r
        <span class="breadcrumb-current">{{ product()!.name }}</span>\r
      </nav>\r
\r
      <div class="detail-layout">\r
        <div class="image-section">\r
          <div class="main-image-wrapper">\r
            @if (images.length > 1) {\r
              <button\r
                class="image-nav prev"\r
                [class.disabled]="!canGoPrevious()"\r
                [disabled]="!canGoPrevious()"\r
                (click)="previousImage()"\r
                [attr.aria-label]="'product.previous_image' | translate"\r
              >\r
                \u2039\r
              </button>\r
            }\r
\r
            <img [src]="selectedImage" [alt]="product()!.name" class="main-image" loading="eager" />\r
\r
            @if (product()!.requires_prescription) {\r
              <span class="rx-badge" [title]="'product.requires_prescription' | translate">\u211E</span>\r
            }\r
\r
            @if (has_discount) {\r
              <span class="discount-badge">-{{ product()!.discount_percentage }}%</span>\r
            }\r
\r
            @if (images.length > 1) {\r
              <button\r
                class="image-nav next"\r
                [class.disabled]="!canGoNext()"\r
                [disabled]="!canGoNext()"\r
                (click)="nextImage()"\r
                [attr.aria-label]="'product.next_image' | translate"\r
              >\r
                \u203A\r
              </button>\r
\r
              <div class="image-counter">{{ selectedImageIndex() + 1 }} / {{ images.length }}</div>\r
            }\r
          </div>\r
\r
          @if (images.length > 0) {\r
            <div class="thumbnail-strip">\r
              @for (img of images; track $index) {\r
                <button\r
                  class="thumb"\r
                  [class.active]="selectedImageIndex() === $index"\r
                  (click)="selectImage($index)"\r
                  [attr.aria-label]="('product.view_image' | translate) + ' ' + ($index + 1)"\r
                >\r
                  <img [src]="img" [alt]="product()!.name" loading="lazy" />\r
                </button>\r
              }\r
            </div>\r
          }\r
        </div>\r
\r
        <div class="info-section">\r
          <div class="info-header">\r
            <span class="category-badge">\r
              <span>{{ categoryName }}</span>\r
            </span>\r
\r
            <h1 class="product-title">{{ product()!.name }}</h1>\r
\r
            @if (product()!.rating_number > 0) {\r
              <div class="rating-row">\r
                <span class="rating-stars">{{ getRatingStars() }}</span>\r
                <span class="rating-value">{{ product()!.rating_number.toFixed(1) }}</span>\r
                @if (review_count() > 0) {\r
                  <span class="rating-count"\r
                    >({{ review_count() }} {{ 'product.reviews' | translate }})</span\r
                  >\r
                }\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="price-block">\r
            @if (has_discount) {\r
              <div class="price-with-discount">\r
                <span class="original-price">{{ formattedPrice() }}</span>\r
                <span class="discounted-price">{{ formattedDiscountedPrice() }}</span>\r
              </div>\r
            } @else {\r
              <span class="price">{{ formattedPrice() }}</span>\r
            }\r
          </div>\r
\r
          <div class="meta-grid">\r
            @if (product()!.manufacturer) {\r
              <div class="meta-row">\r
                <span class="meta-label">{{ 'product.manufacturer' | translate }}</span>\r
                <span class="meta-value">{{ product()!.manufacturer }}</span>\r
              </div>\r
            }\r
            @if (product()!.brand) {\r
              <div class="meta-row">\r
                <span class="meta-label">{{ 'product.brand' | translate }}</span>\r
                <span class="meta-value">{{ product()!.brand }}</span>\r
              </div>\r
            }\r
            @if (product()!.sku) {\r
              <div class="meta-row">\r
                <span class="meta-label">{{ 'product.sku' | translate }}</span>\r
                <span class="meta-value sku">{{ product()!.sku }}</span>\r
              </div>\r
            }\r
            <div class="meta-row">\r
              <span class="meta-label">{{ 'product.availability' | translate }}</span>\r
              <span\r
                class="meta-value availability"\r
                [class.in-stock]="product()!.in_stock"\r
                [class.out-of-stock]="!product()!.in_stock"\r
              >\r
                {{\r
                  product()!.in_stock\r
                    ? ('product.in_stock' | translate)\r
                    : ('product.out_of_stock' | translate)\r
                }}\r
                @if (product()!.in_stock && product()!.stock_quantity) {\r
                  ({{ product()!.stock_quantity }} {{ 'product.pieces' | translate }})\r
                }\r
              </span>\r
            </div>\r
          </div>\r
\r
          <div class="cart-section">\r
            <div class="quantity-controls" [class.disabled]="!product()!.in_stock">\r
              <button\r
                class="qty-btn"\r
                (click)="decreaseQuantity()"\r
                [disabled]="quantity() <= 1 || !product()!.in_stock"\r
                [attr.aria-label]="'product.decrease_quantity' | translate"\r
              >\r
                \u2212\r
              </button>\r
              <span class="qty-value">{{ quantity() }}</span>\r
              <button\r
                class="qty-btn"\r
                (click)="increaseQuantity()"\r
                [disabled]="quantity() >= product()!.stock_quantity || !product()!.in_stock"\r
                [attr.aria-label]="'product.increase_quantity' | translate"\r
              >\r
                +\r
              </button>\r
            </div>\r
\r
            <div class="total-display">\r
              <span class="total-label">{{ 'product.total' | translate }}:</span>\r
              <span class="total-value">{{ formattedTotalPrice() }}</span>\r
            </div>\r
\r
            <button\r
              class="add-to-cart-btn"\r
              [class.added]="addedToCart()"\r
              [disabled]="!canAddToCart"\r
              (click)="handleAddToCart()"\r
            >\r
              @if (addedToCart()) {\r
                <span class="btn-icon">\u2713</span>\r
                {{ 'common.added_to_cart' | translate }}\r
              } @else {\r
                <!-- \u{1F6D2} \u2192 basketwhite.webp -->\r
                <img [src]="icons.basket" alt="" class="btn-icon-img" aria-hidden="true" />\r
                {{ 'common.add_to_cart' | translate }}\r
              }\r
            </button>\r
\r
            @if (product()!.requires_prescription) {\r
              <div class="prescription-notice">\r
                <!-- \u2139\uFE0F \u2192 infowhite.webp -->\r
                <img [src]="icons.info" alt="" class="notice-icon-img" aria-hidden="true" />\r
                <span>{{ 'product.prescription_required_notice' | translate }}</span>\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="description-block">\r
            <h2 class="section-heading">{{ 'product.description' | translate }}</h2>\r
            <p class="description-text">{{ product()!.description }}</p>\r
          </div>\r
\r
          @if (product()!.active_ingredients || product()!.dosage || product()!.packaging) {\r
            <div class="pharma-block">\r
              <h2 class="section-heading">{{ 'product.pharmaceutical_details' | translate }}</h2>\r
\r
              @if (product()!.active_ingredients) {\r
                <div class="pharma-item">\r
                  <strong>{{ 'product.active_ingredients' | translate }}:</strong>\r
                  <span>{{ product()!.active_ingredients }}</span>\r
                </div>\r
              }\r
              @if (product()!.dosage) {\r
                <div class="pharma-item">\r
                  <strong>{{ 'product.dosage' | translate }}:</strong>\r
                  <span>{{ product()!.dosage }}</span>\r
                </div>\r
              }\r
              @if (product()!.packaging) {\r
                <div class="pharma-item">\r
                  <strong>{{ 'product.packaging' | translate }}:</strong>\r
                  <span>{{ product()!.packaging }}</span>\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <!-- \u2500\u2500\u2500 Reviews section \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\r
          <div class="reviews-block">\r
            <h2 class="section-heading">{{ 'product.reviews_title' | translate }}</h2>\r
\r
            @if (reviewsLoading()) {\r
              <div class="reviews-loading">\r
                <div class="spinner spinner-sm"></div>\r
              </div>\r
            } @else if (reviews().length === 0) {\r
              <div class="reviews-empty">\r
                <!-- \u{1F4AC} \u2192 stats/comments.webp -->\r
                <img\r
                  [src]="icons.statComments"\r
                  alt=""\r
                  class="reviews-empty-icon"\r
                  aria-hidden="true"\r
                />\r
                <p class="reviews-empty-text">{{ 'product.no_reviews' | translate }}</p>\r
              </div>\r
            } @else {\r
              <div class="reviews-list">\r
                @for (review of reviews(); track review.id) {\r
                  <div class="review-item">\r
                    <div class="review-header">\r
                      <span class="review-stars">{{ getRatingStars(review.rating_number) }}</span>\r
                      <span class="review-title">{{ review.title }}</span>\r
                      <span class="review-date">{{\r
                        review.created_at | date: 'yyyy. MM. dd.'\r
                      }}</span>\r
                    </div>\r
                    <p class="review-body">{{ review.body }}</p>\r
                  </div>\r
                }\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/product-detail/product-detail.css */\n.product-detail-page {\n  min-height: 100vh;\n  background: var(--color-background);\n}\n.state-icon {\n  width: 64px;\n  height: 64px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.5;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-4);\n  padding: var(--space-16) var(--space-6);\n  min-height: 60vh;\n}\n.spinner {\n  width: 52px;\n  height: 52px;\n  border: 3px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: spin 0.75s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-text {\n  color: var(--color-text-secondary);\n  font-size: var(--text-base);\n}\n.not-found-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-4);\n  padding: var(--space-16) var(--space-6);\n  min-height: 60vh;\n  text-align: center;\n}\n.not-found-icon {\n  font-size: 5rem;\n  opacity: 0.4;\n}\n.not-found-title {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0;\n}\n.not-found-desc {\n  font-size: var(--text-base);\n  color: var(--color-text-secondary);\n  margin: 0;\n  max-width: 400px;\n}\n.back-btn {\n  padding: var(--space-3) var(--space-8);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  border-radius: var(--radius-full);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 48px;\n  box-shadow: var(--shadow-primary);\n}\n@media (hover: hover) and (pointer: fine) {\n  .back-btn:hover {\n    background: var(--gradient-primary-hover);\n    box-shadow: var(--shadow-primary-lg);\n    transform: translateY(-2px);\n  }\n}\n.detail-container {\n  max-width: 1240px;\n  margin: 0 auto;\n  padding: var(--space-8) var(--space-6);\n}\n.breadcrumb {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: var(--space-2);\n  margin-bottom: var(--space-8);\n  font-size: var(--text-sm);\n}\n.breadcrumb-link {\n  color: var(--color-text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n  font-weight: var(--font-medium);\n}\n@media (hover: hover) and (pointer: fine) {\n  .breadcrumb-link:hover {\n    color: var(--color-primary);\n  }\n}\n.breadcrumb-sep {\n  color: var(--color-text-tertiary);\n}\n.breadcrumb-current {\n  color: var(--color-text-primary);\n  font-weight: var(--font-semibold);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 220px;\n}\n.detail-layout {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var(--space-8);\n}\n@media (min-width: 768px) {\n  .detail-layout {\n    grid-template-columns: 1fr 1fr;\n    align-items: start;\n  }\n}\n@media (min-width: 1024px) {\n  .detail-layout {\n    grid-template-columns: 5fr 6fr;\n    gap: var(--space-16);\n  }\n}\n.image-section {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  position: sticky;\n  top: var(--space-6);\n}\n@media (max-width: 767px) {\n  .image-section {\n    position: static;\n  }\n}\n.main-image-wrapper {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 1;\n  background: var(--gradient-image-bg);\n  border-radius: var(--radius-2xl);\n  overflow: hidden;\n  border: 1px solid var(--color-border);\n  box-shadow: var(--shadow-xl);\n}\n.main-image {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  display: block;\n  padding: 12px;\n  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));\n  transition: transform var(--transition-slow);\n}\n.image-nav {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 48px;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  color: white;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  font-size: 26px;\n  font-weight: bold;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  z-index: 5;\n  font-family: var(--font-primary);\n  line-height: 1;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.image-nav.prev {\n  left: 12px;\n}\n.image-nav.next {\n  right: 12px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .image-nav:hover:not(:disabled) {\n    background: rgba(6, 122, 69, 0.8);\n    border-color: rgba(255, 255, 255, 0.4);\n    transform: translateY(-50%) scale(1.08);\n  }\n}\n.image-nav:disabled,\n.image-nav.disabled {\n  opacity: 0.25;\n  cursor: not-allowed;\n}\n.image-counter {\n  position: absolute;\n  bottom: 14px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  color: white;\n  padding: 5px 16px;\n  border-radius: var(--radius-full);\n  font-size: var(--text-sm);\n  font-weight: var(--font-semibold);\n  -webkit-user-select: none;\n  user-select: none;\n  border: 1px solid rgba(255, 255, 255, 0.15);\n}\n.rx-badge {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  background: var(--gradient-primary);\n  color: white;\n  width: 46px;\n  height: 46px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n  font-weight: var(--font-bold);\n  box-shadow: var(--shadow-primary);\n  z-index: 2;\n}\n.discount-badge {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n  background:\n    linear-gradient(\n      135deg,\n      #dc2626,\n      #ef4444);\n  color: white;\n  padding: 4px 12px;\n  border-radius: var(--radius-full);\n  font-size: var(--text-sm);\n  font-weight: var(--font-bold);\n  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.45);\n  z-index: 2;\n}\n.thumbnail-strip {\n  display: flex;\n  gap: var(--space-2);\n  overflow-x: auto;\n  padding: var(--space-1);\n  scrollbar-width: thin;\n  scrollbar-color: var(--color-primary) var(--color-surface-elevated);\n}\n.thumbnail-strip::-webkit-scrollbar {\n  height: 4px;\n}\n.thumbnail-strip::-webkit-scrollbar-thumb {\n  background: var(--color-primary);\n  border-radius: 2px;\n}\n.thumb {\n  flex-shrink: 0;\n  width: 76px;\n  height: 76px;\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  cursor: pointer;\n  background: var(--gradient-image-bg);\n  padding: 4px;\n  transition: all var(--transition-fast);\n}\n@media (hover: hover) and (pointer: fine) {\n  .thumb:hover {\n    border-color: var(--color-primary);\n    transform: scale(1.06);\n    box-shadow: var(--shadow-primary);\n  }\n}\n.thumb.active {\n  border-color: var(--color-primary);\n  border-width: 3px;\n  box-shadow: var(--shadow-primary);\n}\n.thumb img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.info-section {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-6);\n}\n.info-header {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n.category-badge {\n  display: inline-block;\n  width: fit-content;\n  padding: 5px 14px;\n  background: var(--color-primary-light);\n  color: #ffffff;\n  border: 1px solid rgba(6, 122, 69, 0.2);\n  border-radius: var(--radius-full);\n  font-size: 0.7rem;\n  font-weight: var(--font-bold);\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.product-title {\n  font-size: clamp(1.5rem, 4vw, 2.2rem);\n  font-weight: var(--font-extrabold);\n  color: var(--color-text-primary);\n  margin: 0;\n  line-height: 1.2;\n  letter-spacing: -0.01em;\n}\n.rating-row {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n}\n.rating-stars {\n  color: var(--color-warning);\n  font-size: var(--text-lg);\n  letter-spacing: -1px;\n}\n.rating-value {\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n}\n.rating-count {\n  color: var(--color-text-secondary);\n  font-size: var(--text-sm);\n}\n.price-block {\n  padding: var(--space-5) 0;\n  border-top: 1px solid var(--color-border);\n  border-bottom: 1px solid var(--color-border);\n}\n.price {\n  font-size: clamp(1.75rem, 4vw, 2.5rem);\n  font-weight: 800;\n  color: var(--color-primary);\n  line-height: 1;\n}\n.price-with-discount {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n}\n.original-price {\n  font-size: var(--text-base);\n  color: var(--color-text-tertiary);\n  text-decoration: line-through;\n}\n.discounted-price {\n  font-size: clamp(1.75rem, 4vw, 2.5rem);\n  font-weight: 800;\n  color: var(--color-error);\n  line-height: 1;\n}\n.meta-grid {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  overflow: hidden;\n  box-shadow: var(--shadow-xs);\n}\n.meta-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  border-bottom: 1px solid var(--color-border);\n  transition: background var(--transition-fast);\n}\n.meta-row:last-child {\n  border-bottom: none;\n}\n.meta-row:nth-child(even) {\n  background: var(--color-surface-elevated);\n}\n@media (hover: hover) and (pointer: fine) {\n  .meta-row:hover {\n    background: var(--color-primary-light);\n  }\n}\n.meta-label {\n  color: var(--color-text-secondary);\n  font-weight: var(--font-medium);\n  flex-shrink: 0;\n  margin-right: var(--space-4);\n}\n.meta-value {\n  color: var(--color-text-primary);\n  font-weight: var(--font-semibold);\n  text-align: right;\n}\n.meta-value.sku {\n  font-family: monospace;\n  font-size: var(--text-xs);\n  letter-spacing: 0.05em;\n  background: var(--color-surface-elevated);\n  padding: 2px 8px;\n  border-radius: var(--radius-sm);\n}\n.meta-value.in-stock {\n  color: var(--color-success);\n}\n.meta-value.out-of-stock {\n  color: var(--color-error);\n}\n.cart-section {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n  padding: var(--space-6);\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-2xl);\n  box-shadow: var(--shadow-lg);\n  position: relative;\n  overflow: hidden;\n}\n.cart-section::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: var(--gradient-primary);\n}\n.quantity-controls {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-5);\n  padding: var(--space-3);\n  background: var(--color-surface-elevated);\n  border-radius: var(--radius-xl);\n  border: 1px solid var(--color-border);\n}\n.quantity-controls.disabled {\n  opacity: 0.5;\n}\n.qty-btn {\n  width: 48px;\n  height: 48px;\n  border-radius: var(--radius-lg);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all var(--transition-bounce);\n  font-family: var(--font-primary);\n  line-height: 1;\n  box-shadow: var(--shadow-primary);\n}\n@media (hover: hover) and (pointer: fine) {\n  .qty-btn:hover:not(:disabled) {\n    background: var(--gradient-primary-hover);\n    box-shadow: var(--shadow-primary-lg);\n    transform: scale(1.1);\n  }\n}\n.qty-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  background: var(--color-text-tertiary);\n  box-shadow: none;\n}\n.qty-value {\n  min-width: 60px;\n  text-align: center;\n  font-size: var(--text-2xl);\n  font-weight: var(--font-extrabold);\n  color: var(--color-text-primary);\n}\n.total-display {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--space-4) var(--space-5);\n  background: var(--color-primary-light);\n  border-radius: var(--radius-xl);\n  border: 1px solid rgba(6, 122, 69, 0.15);\n}\n.total-label {\n  font-size: var(--text-base);\n  font-weight: var(--font-medium);\n  color: var(--color-text-on-primary);\n}\n.total-value {\n  font-size: var(--text-2xl);\n  font-weight: 800;\n  color: #ffffff;\n}\n.add-to-cart-btn {\n  width: 100%;\n  padding: var(--space-5) var(--space-6);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  border-radius: var(--radius-xl);\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-3);\n  font-family: var(--font-primary);\n  min-height: 56px;\n  box-shadow: var(--shadow-primary);\n  letter-spacing: 0.02em;\n}\n@media (hover: hover) and (pointer: fine) {\n  .add-to-cart-btn:hover:not(:disabled) {\n    background: var(--gradient-primary-hover);\n    box-shadow: var(--shadow-primary-lg);\n    transform: translateY(-2px);\n  }\n}\n.add-to-cart-btn.added {\n  background:\n    linear-gradient(\n      135deg,\n      #15803d,\n      #16a34a);\n  box-shadow: 0 8px 24px rgba(22, 163, 74, 0.4);\n}\n.add-to-cart-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n  background: var(--color-text-secondary);\n}\n.btn-icon {\n  font-size: var(--text-xl);\n}\n.btn-icon-img {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: brightness(0) saturate(100%) invert(1);\n}\n.prescription-notice {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: rgba(17, 185, 252, 0.1);\n  border: 1px solid rgba(17, 185, 252, 0.3);\n  color: var(--color-info);\n  border-radius: var(--radius-lg);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n}\n.notice-icon-img {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n}\n.description-block,\n.pharma-block {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n.section-heading {\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0;\n  padding-bottom: var(--space-2);\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  letter-spacing: -0.01em;\n}\n.section-heading::after {\n  content: "";\n  flex: 1;\n  height: 2px;\n  background: var(--gradient-primary);\n  border-radius: 2px;\n  margin-left: var(--space-2);\n  opacity: 0.5;\n}\n.description-text {\n  font-size: var(--text-base);\n  line-height: var(--leading-relaxed);\n  color: var(--color-text-secondary);\n  margin: 0;\n}\n.pharma-item {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  padding: var(--space-4);\n  background: var(--color-surface-elevated);\n  border-radius: var(--radius-lg);\n  font-size: var(--text-sm);\n  border-left: 4px solid var(--color-primary);\n  box-shadow: var(--shadow-xs);\n  transition: all var(--transition-fast);\n}\n@media (hover: hover) and (pointer: fine) {\n  .pharma-item:hover {\n    transform: translateX(4px);\n    box-shadow: var(--shadow-sm);\n  }\n}\n.pharma-item strong {\n  color: var(--color-text-primary);\n  font-weight: var(--font-semibold);\n}\n.pharma-item span {\n  color: var(--color-text-secondary);\n  line-height: var(--leading-normal);\n}\n@media (max-width: 480px) {\n  .detail-container {\n    padding: var(--space-4) var(--space-3);\n  }\n  .breadcrumb {\n    font-size: var(--text-xs);\n    margin-bottom: var(--space-5);\n  }\n  .breadcrumb-current {\n    max-width: 150px;\n  }\n  .thumb {\n    width: 64px;\n    height: 64px;\n  }\n  .cart-section {\n    padding: var(--space-4) var(--space-4);\n  }\n  .qty-value {\n    min-width: 48px;\n    font-size: var(--text-xl);\n  }\n  .total-value {\n    font-size: var(--text-xl);\n  }\n  .add-to-cart-btn {\n    font-size: var(--text-base);\n    min-height: 50px;\n  }\n}\n@media (max-width: 375px) {\n  .detail-container {\n    padding: var(--space-3) var(--space-2);\n  }\n  .qty-btn {\n    width: 44px;\n    height: 44px;\n  }\n  .total-display {\n    flex-direction: column;\n    gap: var(--space-1);\n    text-align: center;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner {\n    animation: none;\n  }\n  .add-to-cart-btn,\n  .qty-btn,\n  .thumb,\n  .image-nav,\n  .pharma-item {\n    transition: none;\n  }\n}\n.reviews-block {\n  margin-top: var(--space-8);\n  padding-top: var(--space-6);\n  border-top: 1px solid var(--color-border);\n}\n.reviews-loading {\n  display: flex;\n  justify-content: center;\n  padding: var(--space-8) 0;\n}\n.spinner-sm {\n  width: 24px;\n  height: 24px;\n  border-width: 2px;\n}\n.reviews-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-10) var(--space-4);\n  text-align: center;\n}\n.reviews-empty-icon {\n  font-size: 2.5rem;\n  width: 48px;\n  height: 48px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.45;\n}\n.reviews-empty-text {\n  font-size: var(--text-base);\n  color: var(--color-text-secondary);\n  margin: 0;\n}\n.reviews-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n.review-item {\n  padding: var(--space-4) var(--space-5);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  transition: border-color var(--transition-normal);\n}\n.review-item:hover {\n  border-color: var(--color-primary-mid);\n}\n.review-header {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n  margin-bottom: var(--space-2);\n}\n.review-stars {\n  color: var(--color-warning);\n  letter-spacing: -1px;\n  font-size: var(--text-base);\n  flex-shrink: 0;\n}\n.review-title {\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  font-size: var(--text-base);\n  flex: 1;\n  min-width: 0;\n}\n.review-date {\n  font-size: var(--text-xs);\n  color: var(--color-text-tertiary);\n  flex-shrink: 0;\n}\n.review-body {\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-relaxed);\n  margin: 0;\n}\n@media (max-width: 480px) {\n  .review-item {\n    padding: var(--space-3) var(--space-4);\n  }\n  .review-header {\n    gap: var(--space-2);\n  }\n  .review-date {\n    width: 100%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .review-item {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=product-detail.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetail, { className: "ProductDetail", filePath: "src/app/pages/product-detail/product-detail.ts", lineNumber: 24 });
})();
export {
  ProductDetail
};
//# sourceMappingURL=chunk-Z7W6AXSD.js.map
