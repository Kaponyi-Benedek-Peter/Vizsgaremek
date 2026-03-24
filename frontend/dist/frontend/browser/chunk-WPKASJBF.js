import {
  CartService,
  CurrencyService
} from "./chunk-NJHE25JR.js";
import {
  AccountService
} from "./chunk-M3AZ375S.js";
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
import "./chunk-NEOTYJOM.js";
import {
  Router,
  RouterModule
} from "./chunk-GK2QC6TC.js";
import {
  Component,
  TranslateModule,
  TranslatePipe,
  __async,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WLHV2EEC.js";

// src/app/pages/purchase/purchase.ts
var _forTrack0 = ($index, $item) => $item.product.id;
function Purchase_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 11);
    \u0275\u0275element(2, "path", 12)(3, "polyline", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 1, ctx_r0.successMessage() || ""));
  }
}
function Purchase_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 11);
    \u0275\u0275element(2, "circle", 14)(3, "line", 15)(4, "line", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 1, ctx_r0.errorMessage() || ""));
  }
}
function Purchase_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 17);
    \u0275\u0275listener("click", function Purchase_Conditional_12_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.continueShopping());
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "cart.empty"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 4, "checkout.continue_shopping"), " ");
  }
}
function Purchase_Conditional_13_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("-", item_r4.product.discount_percentage, "%");
  }
}
function Purchase_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "img", 24);
    \u0275\u0275elementStart(2, "div", 25)(3, "h3", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 27);
    \u0275\u0275text(6);
    \u0275\u0275conditionalCreate(7, Purchase_Conditional_13_For_2_Conditional_7_Template, 2, 1, "span", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 29)(9, "button", 30);
    \u0275\u0275listener("click", function Purchase_Conditional_13_For_2_Template_button_click_9_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.updateQuantity(item_r4.product.id, item_r4.quantity - 1));
    });
    \u0275\u0275text(10, " - ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 31);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 30);
    \u0275\u0275listener("click", function Purchase_Conditional_13_For_2_Template_button_click_13_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.updateQuantity(item_r4.product.id, item_r4.quantity + 1));
    });
    \u0275\u0275text(14, " + ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 32)(16, "p", 33);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 34);
    \u0275\u0275listener("click", function Purchase_Conditional_13_For_2_Template_button_click_18_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeFromCart(item_r4.product.id));
    });
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r4.product.image_url, \u0275\u0275sanitizeUrl)("alt", item_r4.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFormattedUnitPrice(item_r4.product), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r4.product.discount_percentage ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", item_r4.quantity <= 1 || ctx_r0.isSubmitting());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.quantity);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", item_r4.quantity >= item_r4.product.stock_quantity || ctx_r0.isSubmitting());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFormattedItemTotal(item_r4.product, item_r4.quantity), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 11, "cart.remove"), " ");
  }
}
function Purchase_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275repeaterCreate(1, Purchase_Conditional_13_For_2_Template, 21, 13, "div", 19, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "div", 21)(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 21)(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(17, "div", 22);
    \u0275\u0275elementStart(18, "div", 23)(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.cartItems());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(7, 6, "checkout.subtotal"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.currencyService.formatPrice(ctx_r0.cartTotal()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(13, 8, "checkout.shipping"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 10, "checkout.free_shipping"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(21, 12, "checkout.total"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.currencyService.formatPrice(ctx_r0.cartTotal()));
  }
}
function Purchase_Conditional_14_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 55);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "checkout.processing"), " ");
  }
}
function Purchase_Conditional_14_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "checkout.place_order"), " ");
  }
}
function Purchase_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "h2", 8);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 35, 0);
    \u0275\u0275listener("ngSubmit", function Purchase_Conditional_14_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitOrder());
    });
    \u0275\u0275elementStart(6, "div", 36)(7, "div", 37)(8, "label", 38);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 39);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Purchase_Conditional_14_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.city, $event) || (ctx_r0.form.city = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 37)(14, "label", 40);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 41);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Purchase_Conditional_14_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.zipcode, $event) || (ctx_r0.form.zipcode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 37)(20, "label", 42);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 43);
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Purchase_Conditional_14_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.address, $event) || (ctx_r0.form.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 36)(26, "div", 37)(27, "label", 44);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 45);
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Purchase_Conditional_14_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.houseNumber, $event) || (ctx_r0.form.houseNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 37)(33, "label", 46);
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 47);
    \u0275\u0275pipe(37, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Purchase_Conditional_14_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.apartmentNumber, $event) || (ctx_r0.form.apartmentNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 37)(39, "label", 48);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 49);
    \u0275\u0275pipe(43, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Purchase_Conditional_14_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.phoneNumber, $event) || (ctx_r0.form.phoneNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 37)(45, "label", 50);
    \u0275\u0275text(46);
    \u0275\u0275pipe(47, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "textarea", 51);
    \u0275\u0275pipe(49, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Purchase_Conditional_14_Template_textarea_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.note, $event) || (ctx_r0.form.note = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 52)(51, "button", 53);
    \u0275\u0275listener("click", function Purchase_Conditional_14_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.continueShopping());
    });
    \u0275\u0275text(52);
    \u0275\u0275pipe(53, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "button", 54);
    \u0275\u0275conditionalCreate(55, Purchase_Conditional_14_Conditional_55_Template, 3, 3)(56, Purchase_Conditional_14_Conditional_56_Template, 2, 3);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const checkoutForm_r6 = \u0275\u0275reference(5);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 33, "checkout.shipping_info"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(10, 35, "checkout.city"), " *");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.city);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(12, 37, "checkout.city_placeholder"))("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(16, 39, "checkout.zipcode"), " *");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.zipcode);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(18, 41, "checkout.zipcode_placeholder"))("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(22, 43, "checkout.address"), " *");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.address);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(24, 45, "checkout.address_placeholder"))("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(29, 47, "checkout.house_number"), " *");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.houseNumber);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(31, 49, "checkout.house_number_placeholder"))("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(35, 51, "checkout.apartment_number"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.apartmentNumber);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(37, 53, "checkout.apartment_placeholder"))("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(41, 55, "checkout.phone"), " *");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.phoneNumber);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(43, 57, "checkout.phone_placeholder"))("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(47, 59, "checkout.note"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.note);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(49, 61, "checkout.note_placeholder"))("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(53, 63, "checkout.continue_shopping"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting() || !checkoutForm_r6.valid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSubmitting() ? 55 : 56);
  }
}
var Purchase = class _Purchase {
  cartService = inject(CartService);
  currencyService = inject(CurrencyService);
  authService = inject(AuthService);
  accountService = inject(AccountService);
  toastService = inject(ToastService);
  router = inject(Router);
  cartItems = computed(() => this.cartService.items(), ...ngDevMode ? [{ debugName: "cartItems" }] : []);
  cartTotal = computed(() => this.cartService.totalPrice(), ...ngDevMode ? [{ debugName: "cartTotal" }] : []);
  cartItemCount = computed(() => this.cartService.itemCount(), ...ngDevMode ? [{ debugName: "cartItemCount" }] : []);
  isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : []);
  errorMessage = signal(null, ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  successMessage = signal(null, ...ngDevMode ? [{ debugName: "successMessage" }] : []);
  form = {
    city: "",
    zipcode: "",
    address: "",
    houseNumber: "",
    apartmentNumber: "",
    phoneNumber: "",
    note: ""
  };
  ngOnInit() {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: "/purchase" }
      });
      return;
    }
    if (this.cartItems().length === 0) {
      this.router.navigate(["/products"]);
    }
  }
  updateQuantity(productId, quantity) {
    this.cartService.updateQuantity(productId, quantity);
  }
  removeFromCart(productId) {
    this.cartService.removeFromCart(productId);
    if (this.cartItems().length === 0) {
      this.router.navigate(["/products"]);
    }
  }
  getFormattedUnitPrice(product) {
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(product));
  }
  getFormattedItemTotal(product, quantity) {
    return this.currencyService.formatPrice(this.cartService.getItemTotal(product, quantity));
  }
  submitOrder() {
    return __async(this, null, function* () {
      if (!this.validateForm())
        return;
      this.isSubmitting.set(true);
      this.errorMessage.set(null);
      try {
        const user = this.authService.currentUser();
        const orderData = {
          order: {
            user_id: btoa(user?.id ?? ""),
            session_token: btoa(this.authService.getSessionToken() ?? ""),
            email: btoa(user?.email ?? ""),
            billing_name: btoa(`${user?.firstname} ${user?.lastname}`),
            shipping_name: btoa(`${user?.firstname} ${user?.lastname}`),
            shipping_company: btoa(""),
            price: btoa(String(this.cartTotal())),
            city: btoa(this.form.city),
            guest: btoa("0"),
            zipcode: btoa(this.form.zipcode),
            address: btoa(this.form.address),
            apartment_number: btoa(this.form.apartmentNumber ?? "0"),
            note: btoa(this.form.note ?? ""),
            house_number: btoa(this.form.houseNumber),
            phone_number: btoa(this.form.phoneNumber)
          },
          items: this.cartItems().map((i) => ({
            product_id: btoa(String(i.product.id)),
            quantity: btoa(String(i.quantity))
          }))
        };
        const response = yield firstValueFrom(this.accountService.createOrder(orderData));
        if (response.statuscode === "200") {
          this.successMessage.set("checkout.success");
          this.toastService.success("checkout.success");
          this.cartService.clearCart();
          setTimeout(() => {
            this.router.navigate(["/profile"]);
          }, 2e3);
        } else {
          this.errorMessage.set("checkout.error");
          this.toastService.error("checkout.error");
        }
      } catch (error) {
        this.errorMessage.set("checkout.error");
        this.toastService.error("checkout.error");
        console.error("Order submission error:", error);
      } finally {
        this.isSubmitting.set(false);
      }
    });
  }
  validateForm() {
    if (!this.form.city || !this.form.zipcode || !this.form.address || !this.form.houseNumber || !this.form.phoneNumber) {
      this.errorMessage.set("checkout.validation_error");
      return false;
    }
    if (!/^\d{4,10}$/.test(this.form.zipcode)) {
      this.errorMessage.set("checkout.invalid_zipcode");
      return false;
    }
    if (!/^\+?\d{9,12}$/.test(this.form.phoneNumber.replace(/\s/g, ""))) {
      this.errorMessage.set("checkout.invalid_phone");
      return false;
    }
    return true;
  }
  continueShopping() {
    this.router.navigate(["/products"]);
  }
  static \u0275fac = function Purchase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Purchase)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Purchase, selectors: [["app-purchase"]], decls: 15, vars: 10, consts: [["checkoutForm", "ngForm"], [1, "purchase-container"], [1, "container"], [1, "page-title"], [1, "alert", "alert-success"], [1, "alert", "alert-error"], [1, "checkout-layout"], [1, "checkout-section", "order-summary"], [1, "section-title"], [1, "empty-cart"], [1, "checkout-section", "checkout-form"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "btn-primary", 3, "click"], [1, "order-items"], [1, "order-item"], [1, "order-total"], [1, "total-row"], [1, "total-divider"], [1, "total-row", "grand-total"], [1, "item-image", 3, "src", "alt"], [1, "item-details"], [1, "item-name"], [1, "item-price"], [1, "discount-badge"], [1, "item-quantity"], [1, "quantity-btn", 3, "click", "disabled"], [1, "quantity-value"], [1, "item-actions"], [1, "item-total"], [1, "remove-btn", 3, "click", "disabled"], [3, "ngSubmit"], [1, "form-row"], [1, "form-group"], ["for", "city"], ["type", "text", "id", "city", "name", "city", "required", "", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], ["for", "zipcode"], ["type", "text", "id", "zipcode", "name", "zipcode", "required", "", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], ["for", "address"], ["type", "text", "id", "address", "name", "address", "required", "", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], ["for", "houseNumber"], ["type", "text", "id", "houseNumber", "name", "houseNumber", "required", "", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], ["for", "apartmentNumber"], ["type", "text", "id", "apartmentNumber", "name", "apartmentNumber", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], ["for", "phoneNumber"], ["type", "tel", "id", "phoneNumber", "name", "phoneNumber", "required", "", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], ["for", "note"], ["id", "note", "name", "note", "rows", "3", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], [1, "form-actions"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn-primary", 3, "disabled"], [1, "spinner"]], template: function Purchase_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1", 3);
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, Purchase_Conditional_5_Template, 7, 3, "div", 4);
      \u0275\u0275conditionalCreate(6, Purchase_Conditional_6_Template, 8, 3, "div", 5);
      \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "h2", 8);
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(12, Purchase_Conditional_12_Template, 7, 6, "div", 9)(13, Purchase_Conditional_13_Template, 24, 14);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, Purchase_Conditional_14_Template, 57, 65, "div", 10);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 6, "checkout.title"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.successMessage() ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 6 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 8, "checkout.order_summary"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.cartItems().length === 0 ? 12 : 13);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.cartItems().length > 0 ? 14 : -1);
    }
  }, dependencies: [RouterModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, TranslateModule, TranslatePipe], styles: ['\n\n.purchase-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 80px);\n  padding: 2rem 0;\n  background-color: var(--bg-secondary);\n}\n.page-title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n  color: var(--text-primary);\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  margin-bottom: 2rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  animation: _ngcontent-%COMP%_slideInDown 0.3s ease;\n}\n.alert[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  flex-shrink: 0;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background-color: var(--color-success-light);\n  border: 1px solid var(--color-primary);\n  color: var(--color-primary);\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: var(--color-error-light);\n  border: 1px solid #dc2626;\n  color: var(--color-error);\n}\n.checkout-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 2rem;\n  align-items: start;\n}\n.checkout-section[_ngcontent-%COMP%] {\n  background-color: var(--bg-primary);\n  border-radius: 12px;\n  padding: 2rem;\n  box-shadow: var(--shadow-md);\n}\n.section-title[_ngcontent-%COMP%] {\n  margin: 0 0 1.5rem 0;\n  font-size: 1.5rem;\n  color: var(--text-primary);\n  border-bottom: 2px solid var(--color-primary);\n  padding-bottom: 0.5rem;\n}\n.empty-cart[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem;\n}\n.empty-cart[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 1.5rem;\n  font-size: 1.1rem;\n}\n.order-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n}\n.order-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n  padding: 1.5rem;\n  background-color: var(--bg-secondary);\n  border-radius: 8px;\n  transition: box-shadow 0.3s ease;\n}\n.order-item[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-sm);\n}\n.item-image[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  object-fit: cover;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n.item-details[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.item-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.item-price[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  color: var(--color-primary);\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.discount-badge[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: white;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.item-quantity[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n.quantity-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--border-color);\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  font-weight: 700;\n  font-size: 1.1rem;\n}\n.quantity-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.quantity-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.quantity-value[_ngcontent-%COMP%] {\n  min-width: 40px;\n  text-align: center;\n  font-weight: 700;\n  font-size: 1.1rem;\n  color: var(--text-primary);\n}\n.item-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.75rem;\n}\n.item-total[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.remove-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--color-error);\n  cursor: pointer;\n  font-size: 0.9rem;\n  text-decoration: underline;\n  transition: opacity 0.2s ease;\n}\n.remove-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.7;\n}\n.remove-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.order-total[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  background-color: var(--bg-secondary);\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.total-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 1rem;\n}\n.total-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.total-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-weight: 600;\n}\n.total-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background-color: var(--border-color);\n  margin: 0.5rem 0;\n}\n.grand-total[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  margin-top: 0.5rem;\n}\n.grand-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-weight: 600;\n}\n.grand-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: var(--color-primary);\n}\n.checkout-form[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-primary);\n  font-size: 0.95rem;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border: 1px solid var(--border-color);\n  border-radius: 6px;\n  background-color: var(--input-bg);\n  color: var(--input-text);\n  font-size: 1rem;\n  transition: all 0.2s ease;\n  font-family: "Inconsolata", monospace;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n  margin-top: 1rem;\n}\n.btn-primary[_ngcontent-%COMP%], \n.btn-secondary[_ngcontent-%COMP%] {\n  padding: 1rem 2rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  flex: 1;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--color-primary-dark);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(6, 122, 69, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--bg-tertiary);\n}\n.btn-secondary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.6s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_slideInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 1024px) {\n  .checkout-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .order-summary[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .checkout-form[_ngcontent-%COMP%] {\n    order: 2;\n  }\n}\n@media (max-width: 768px) {\n  .purchase-container[_ngcontent-%COMP%] {\n    padding: 1rem 0;\n  }\n  .checkout-section[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .order-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .item-image[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 200px;\n  }\n  .item-actions[_ngcontent-%COMP%] {\n    flex-direction: row;\n    width: 100%;\n    justify-content: space-between;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n@media (max-width: 480px) {\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .item-name[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .grand-total[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .grand-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1.3rem;\n  }\n}\n/*# sourceMappingURL=purchase.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Purchase, [{
    type: Component,
    args: [{ selector: "app-purchase", standalone: true, imports: [RouterModule, FormsModule, TranslateModule], template: `<div class="purchase-container">\r
  <div class="container">\r
    <h1 class="page-title">{{ 'checkout.title' | translate }}</h1>\r
\r
    @if (successMessage()) {\r
      <div class="alert alert-success">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>\r
          <polyline points="22 4 12 14.01 9 11.01"></polyline>\r
        </svg>\r
        <span>{{ successMessage() || '' | translate }}</span>\r
      </div>\r
    }\r
\r
    @if (errorMessage()) {\r
      <div class="alert alert-error">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
          <circle cx="12" cy="12" r="10"></circle>\r
          <line x1="12" y1="8" x2="12" y2="12"></line>\r
          <line x1="12" y1="16" x2="12.01" y2="16"></line>\r
        </svg>\r
        <span>{{ errorMessage() || '' | translate }}</span>\r
      </div>\r
    }\r
\r
    <div class="checkout-layout">\r
      <div class="checkout-section order-summary">\r
        <h2 class="section-title">{{ 'checkout.order_summary' | translate }}</h2>\r
\r
        @if (cartItems().length === 0) {\r
          <div class="empty-cart">\r
            <p>{{ 'cart.empty' | translate }}</p>\r
            <button class="btn-primary" (click)="continueShopping()">\r
              {{ 'checkout.continue_shopping' | translate }}\r
            </button>\r
          </div>\r
        } @else {\r
          <div class="order-items">\r
            @for (item of cartItems(); track item.product.id) {\r
              <div class="order-item">\r
                <img [src]="item.product.image_url" [alt]="item.product.name" class="item-image" />\r
                <div class="item-details">\r
                  <h3 class="item-name">{{ item.product.name }}</h3>\r
                  <p class="item-price">\r
                    {{ getFormattedUnitPrice(item.product) }}\r
                    @if (item.product.discount_percentage) {\r
                      <span class="discount-badge">-{{ item.product.discount_percentage }}%</span>\r
                    }\r
                  </p>\r
                  <div class="item-quantity">\r
                    <button\r
                      class="quantity-btn"\r
                      (click)="updateQuantity(item.product.id, item.quantity - 1)"\r
                      [disabled]="item.quantity <= 1 || isSubmitting()"\r
                    >\r
                      -\r
                    </button>\r
                    <span class="quantity-value">{{ item.quantity }}</span>\r
                    <button\r
                      class="quantity-btn"\r
                      (click)="updateQuantity(item.product.id, item.quantity + 1)"\r
                      [disabled]="item.quantity >= item.product.stock_quantity || isSubmitting()"\r
                    >\r
                      +\r
                    </button>\r
                  </div>\r
                </div>\r
                <div class="item-actions">\r
                  <p class="item-total">\r
                    {{ getFormattedItemTotal(item.product, item.quantity) }}\r
                  </p>\r
                  <button\r
                    class="remove-btn"\r
                    (click)="removeFromCart(item.product.id)"\r
                    [disabled]="isSubmitting()"\r
                  >\r
                    {{ 'cart.remove' | translate }}\r
                  </button>\r
                </div>\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="order-total">\r
            <div class="total-row">\r
              <span>{{ 'checkout.subtotal' | translate }}:</span>\r
              <strong>{{ currencyService.formatPrice(cartTotal()) }}</strong>\r
            </div>\r
            <div class="total-row">\r
              <span>{{ 'checkout.shipping' | translate }}:</span>\r
              <strong>{{ 'checkout.free_shipping' | translate }}</strong>\r
            </div>\r
            <div class="total-divider"></div>\r
            <div class="total-row grand-total">\r
              <span>{{ 'checkout.total' | translate }}:</span>\r
              <strong>{{ currencyService.formatPrice(cartTotal()) }}</strong>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      @if (cartItems().length > 0) {\r
        <div class="checkout-section checkout-form">\r
          <h2 class="section-title">{{ 'checkout.shipping_info' | translate }}</h2>\r
\r
          <form (ngSubmit)="submitOrder()" #checkoutForm="ngForm">\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label for="city">{{ 'checkout.city' | translate }} *</label>\r
                <input\r
                  type="text"\r
                  id="city"\r
                  name="city"\r
                  [(ngModel)]="form.city"\r
                  [placeholder]="'checkout.city_placeholder' | translate"\r
                  required\r
                  [disabled]="isSubmitting()"\r
                />\r
              </div>\r
\r
              <div class="form-group">\r
                <label for="zipcode">{{ 'checkout.zipcode' | translate }} *</label>\r
                <input\r
                  type="text"\r
                  id="zipcode"\r
                  name="zipcode"\r
                  [(ngModel)]="form.zipcode"\r
                  [placeholder]="'checkout.zipcode_placeholder' | translate"\r
                  required\r
                  [disabled]="isSubmitting()"\r
                />\r
              </div>\r
            </div>\r
\r
            <div class="form-group">\r
              <label for="address">{{ 'checkout.address' | translate }} *</label>\r
              <input\r
                type="text"\r
                id="address"\r
                name="address"\r
                [(ngModel)]="form.address"\r
                [placeholder]="'checkout.address_placeholder' | translate"\r
                required\r
                [disabled]="isSubmitting()"\r
              />\r
            </div>\r
\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label for="houseNumber">{{ 'checkout.house_number' | translate }} *</label>\r
                <input\r
                  type="text"\r
                  id="houseNumber"\r
                  name="houseNumber"\r
                  [(ngModel)]="form.houseNumber"\r
                  [placeholder]="'checkout.house_number_placeholder' | translate"\r
                  required\r
                  [disabled]="isSubmitting()"\r
                />\r
              </div>\r
\r
              <div class="form-group">\r
                <label for="apartmentNumber">{{ 'checkout.apartment_number' | translate }}</label>\r
                <input\r
                  type="text"\r
                  id="apartmentNumber"\r
                  name="apartmentNumber"\r
                  [(ngModel)]="form.apartmentNumber"\r
                  [placeholder]="'checkout.apartment_placeholder' | translate"\r
                  [disabled]="isSubmitting()"\r
                />\r
              </div>\r
            </div>\r
\r
            <div class="form-group">\r
              <label for="phoneNumber">{{ 'checkout.phone' | translate }} *</label>\r
              <input\r
                type="tel"\r
                id="phoneNumber"\r
                name="phoneNumber"\r
                [(ngModel)]="form.phoneNumber"\r
                [placeholder]="'checkout.phone_placeholder' | translate"\r
                required\r
                [disabled]="isSubmitting()"\r
              />\r
            </div>\r
\r
            <div class="form-group">\r
              <label for="note">{{ 'checkout.note' | translate }}</label>\r
              <textarea\r
                id="note"\r
                name="note"\r
                [(ngModel)]="form.note"\r
                [placeholder]="'checkout.note_placeholder' | translate"\r
                rows="3"\r
                [disabled]="isSubmitting()"\r
              ></textarea>\r
            </div>\r
\r
            <div class="form-actions">\r
              <button\r
                type="button"\r
                class="btn-secondary"\r
                (click)="continueShopping()"\r
                [disabled]="isSubmitting()"\r
              >\r
                {{ 'checkout.continue_shopping' | translate }}\r
              </button>\r
              <button\r
                type="submit"\r
                class="btn-primary"\r
                [disabled]="isSubmitting() || !checkoutForm.valid"\r
              >\r
                @if (isSubmitting()) {\r
                  <span class="spinner"></span>\r
                  {{ 'checkout.processing' | translate }}\r
                } @else {\r
                  {{ 'checkout.place_order' | translate }}\r
                }\r
              </button>\r
            </div>\r
          </form>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['/* src/app/pages/purchase/purchase.css */\n.purchase-container {\n  min-height: calc(100vh - 80px);\n  padding: 2rem 0;\n  background-color: var(--bg-secondary);\n}\n.page-title {\n  text-align: center;\n  margin-bottom: 2rem;\n  color: var(--text-primary);\n}\n.alert {\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  margin-bottom: 2rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  animation: slideInDown 0.3s ease;\n}\n.alert svg {\n  width: 24px;\n  height: 24px;\n  flex-shrink: 0;\n}\n.alert-success {\n  background-color: var(--color-success-light);\n  border: 1px solid var(--color-primary);\n  color: var(--color-primary);\n}\n.alert-error {\n  background-color: var(--color-error-light);\n  border: 1px solid #dc2626;\n  color: var(--color-error);\n}\n.checkout-layout {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 2rem;\n  align-items: start;\n}\n.checkout-section {\n  background-color: var(--bg-primary);\n  border-radius: 12px;\n  padding: 2rem;\n  box-shadow: var(--shadow-md);\n}\n.section-title {\n  margin: 0 0 1.5rem 0;\n  font-size: 1.5rem;\n  color: var(--text-primary);\n  border-bottom: 2px solid var(--color-primary);\n  padding-bottom: 0.5rem;\n}\n.empty-cart {\n  text-align: center;\n  padding: 3rem 1rem;\n}\n.empty-cart p {\n  color: var(--text-secondary);\n  margin-bottom: 1.5rem;\n  font-size: 1.1rem;\n}\n.order-items {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n}\n.order-item {\n  display: flex;\n  gap: 1.5rem;\n  padding: 1.5rem;\n  background-color: var(--bg-secondary);\n  border-radius: 8px;\n  transition: box-shadow 0.3s ease;\n}\n.order-item:hover {\n  box-shadow: var(--shadow-sm);\n}\n.item-image {\n  width: 100px;\n  height: 100px;\n  object-fit: cover;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n.item-details {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.item-name {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.item-price {\n  margin: 0;\n  font-size: 1rem;\n  color: var(--color-primary);\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.discount-badge {\n  background-color: var(--color-primary);\n  color: white;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.item-quantity {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n.quantity-btn {\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--border-color);\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  font-weight: 700;\n  font-size: 1.1rem;\n}\n.quantity-btn:hover:not(:disabled) {\n  background-color: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.quantity-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.quantity-value {\n  min-width: 40px;\n  text-align: center;\n  font-weight: 700;\n  font-size: 1.1rem;\n  color: var(--text-primary);\n}\n.item-actions {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.75rem;\n}\n.item-total {\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.remove-btn {\n  background: none;\n  border: none;\n  color: var(--color-error);\n  cursor: pointer;\n  font-size: 0.9rem;\n  text-decoration: underline;\n  transition: opacity 0.2s ease;\n}\n.remove-btn:hover:not(:disabled) {\n  opacity: 0.7;\n}\n.remove-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.order-total {\n  padding: 1.5rem;\n  background-color: var(--bg-secondary);\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.total-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 1rem;\n}\n.total-row span {\n  color: var(--text-secondary);\n}\n.total-row strong {\n  color: var(--text-primary);\n  font-weight: 600;\n}\n.total-divider {\n  height: 1px;\n  background-color: var(--border-color);\n  margin: 0.5rem 0;\n}\n.grand-total {\n  font-size: 1.3rem;\n  margin-top: 0.5rem;\n}\n.grand-total span {\n  color: var(--text-primary);\n  font-weight: 600;\n}\n.grand-total strong {\n  font-size: 1.5rem;\n  color: var(--color-primary);\n}\n.checkout-form form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-group label {\n  font-weight: 600;\n  color: var(--text-primary);\n  font-size: 0.95rem;\n}\n.form-group input,\n.form-group textarea {\n  padding: 0.75rem;\n  border: 1px solid var(--border-color);\n  border-radius: 6px;\n  background-color: var(--input-bg);\n  color: var(--input-text);\n  font-size: 1rem;\n  transition: all 0.2s ease;\n  font-family: "Inconsolata", monospace;\n}\n.form-group input:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.form-group input:disabled,\n.form-group textarea:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.form-group textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n.form-actions {\n  display: flex;\n  gap: 1rem;\n  justify-content: space-between;\n  margin-top: 1rem;\n}\n.btn-primary,\n.btn-secondary {\n  padding: 1rem 2rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  flex: 1;\n}\n.btn-primary {\n  background-color: var(--color-primary);\n  color: white;\n}\n.btn-primary:hover:not(:disabled) {\n  background-color: var(--color-primary-dark);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(6, 122, 69, 0.3);\n}\n.btn-primary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-secondary {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n}\n.btn-secondary:hover:not(:disabled) {\n  background-color: var(--bg-tertiary);\n}\n.btn-secondary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.spinner {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: spin 0.6s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes slideInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 1024px) {\n  .checkout-layout {\n    grid-template-columns: 1fr;\n  }\n  .order-summary {\n    order: 1;\n  }\n  .checkout-form {\n    order: 2;\n  }\n}\n@media (max-width: 768px) {\n  .purchase-container {\n    padding: 1rem 0;\n  }\n  .checkout-section {\n    padding: 1.5rem;\n  }\n  .order-item {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .item-image {\n    width: 100%;\n    height: 200px;\n  }\n  .item-actions {\n    flex-direction: row;\n    width: 100%;\n    justify-content: space-between;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .form-actions {\n    flex-direction: column;\n  }\n}\n@media (max-width: 480px) {\n  .section-title {\n    font-size: 1.2rem;\n  }\n  .item-name {\n    font-size: 1rem;\n  }\n  .grand-total {\n    font-size: 1.1rem;\n  }\n  .grand-total strong {\n    font-size: 1.3rem;\n  }\n}\n/*# sourceMappingURL=purchase.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Purchase, { className: "Purchase", filePath: "src/app/pages/purchase/purchase.ts", lineNumber: 32 });
})();
export {
  Purchase
};
//# sourceMappingURL=chunk-WPKASJBF.js.map
