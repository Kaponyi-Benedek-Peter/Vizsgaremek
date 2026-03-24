import {
  AccountService
} from "./chunk-3KGP4PMK.js";
import {
  AuthService,
  ToastService
} from "./chunk-ZSAXXJLT.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-UT7KEETW.js";
import {
  TranslationService
} from "./chunk-NEOTYJOM.js";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-JGUC3CXT.js";
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
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
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

// src/app/pages/profile/profile.ts
function Profile_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 3);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 4);
    \u0275\u0275element(3, "path", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 6);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 2, "profile.not_authenticated"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 4, "auth.login"));
  }
}
function Profile_Conditional_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "profile.nav.overview"), " ");
  }
}
function Profile_Conditional_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "profile.nav.personal"), " ");
  }
}
function Profile_Conditional_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "profile.nav.security"), " ");
  }
}
function Profile_Conditional_2_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "profile.nav.orders"), " ");
  }
}
function Profile_Conditional_2_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "profile.nav.danger"), " ");
  }
}
function Profile_Conditional_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "Admin");
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275listener("click", function Profile_Conditional_2_Conditional_69_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleSidebar());
    });
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_71_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "Admin");
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_71_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "profile.role.verified"));
  }
}
function Profile_Conditional_2_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 37);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275elementStart(2, "div", 39)(3, "div", 40)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 41)(7, "h1", 42);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 43);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, Profile_Conditional_2_Conditional_71_Conditional_11_Template, 2, 0, "span", 20)(12, Profile_Conditional_2_Conditional_71_Conditional_12_Template, 3, 3, "span", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 45)(14, "div", 46)(15, "div", 47);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 4);
    \u0275\u0275element(17, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "div", 48)(19, "span", 49);
    \u0275\u0275text(20, "\u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 50);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 51)(25, "div", 47);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(26, "svg", 4);
    \u0275\u0275element(27, "path", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(28, "div", 48)(29, "span", 49);
    \u0275\u0275text(30, "\u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 50);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 53)(35, "div", 47);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(36, "svg", 4);
    \u0275\u0275element(37, "path", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(38, "div", 48)(39, "span", 49);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 50);
    \u0275\u0275text(42);
    \u0275\u0275pipe(43, "translate");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(44, "div", 54)(45, "h2", 55);
    \u0275\u0275text(46);
    \u0275\u0275pipe(47, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 56)(49, "button", 57);
    \u0275\u0275listener("click", function Profile_Conditional_2_Conditional_71_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setSection("personal"));
    });
    \u0275\u0275elementStart(50, "span", 58);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(51, "svg", 9);
    \u0275\u0275element(52, "path", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(53, "span", 60)(54, "strong");
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "small");
    \u0275\u0275text(58);
    \u0275\u0275pipe(59, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(60, "svg", 61);
    \u0275\u0275element(61, "path", 62);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(62, "button", 57);
    \u0275\u0275listener("click", function Profile_Conditional_2_Conditional_71_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setSection("security"));
    });
    \u0275\u0275elementStart(63, "span", 63);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(64, "svg", 9);
    \u0275\u0275element(65, "path", 64);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(66, "span", 60)(67, "strong");
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "small");
    \u0275\u0275text(71);
    \u0275\u0275pipe(72, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(73, "svg", 61);
    \u0275\u0275element(74, "path", 62);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(75, "a", 65)(76, "span", 66);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(77, "svg", 9);
    \u0275\u0275element(78, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(79, "span", 60)(80, "strong");
    \u0275\u0275text(81);
    \u0275\u0275pipe(82, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "small");
    \u0275\u0275text(84);
    \u0275\u0275pipe(85, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(86, "svg", 61);
    \u0275\u0275element(87, "path", 62);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(1, 17, "profile.nav.overview")));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.initials());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.fullName());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.email());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.accountState() === "admin" ? 11 : 12);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 19, "profile.stats.orders"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(33, 21, "profile.stats.reviews"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.accountState());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(43, 23, "profile.stats.status"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(47, 25, "profile.quick_actions"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(56, 27, "profile.nav.personal"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(59, 29, "profile.quick.edit_info_desc"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(69, 31, "profile.nav.security"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(72, 33, "profile.quick.security_desc"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(82, 35, "profile.nav.orders"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(85, 37, "profile.quick.orders_desc"));
  }
}
function Profile_Conditional_2_Conditional_72_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "Admin");
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_72_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "profile.role.verified"));
  }
}
function Profile_Conditional_2_Conditional_72_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "profile.role.unverified"));
  }
}
function Profile_Conditional_2_Conditional_72_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 9);
    \u0275\u0275element(2, "path", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, ctx_r1.profileEditError()), " ");
  }
}
function Profile_Conditional_2_Conditional_72_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 84);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 9);
    \u0275\u0275element(2, "path", 89);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, "profile.success.profile_updated"), " ");
  }
}
function Profile_Conditional_2_Conditional_72_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 87);
  }
}
function Profile_Conditional_2_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 37);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275elementStart(2, "div", 67)(3, "div", 68);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 9);
    \u0275\u0275element(5, "path", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div")(7, "h1", 69);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 70);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 54)(14, "h2", 55);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 71)(18, "div", 72)(19, "span", 73);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 74);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 75);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 72)(28, "span", 73);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 74);
    \u0275\u0275conditionalCreate(32, Profile_Conditional_2_Conditional_72_Conditional_32_Template, 2, 0, "span", 20)(33, Profile_Conditional_2_Conditional_72_Conditional_33_Template, 3, 3, "span", 44)(34, Profile_Conditional_2_Conditional_72_Conditional_34_Template, 3, 3, "span", 76);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(35, "div", 54)(36, "h2", 55);
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 77)(40, "div", 78)(41, "label", 79);
    \u0275\u0275text(42);
    \u0275\u0275pipe(43, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 80);
    \u0275\u0275pipe(45, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Profile_Conditional_2_Conditional_72_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editFirstname, $event) || (ctx_r1.editFirstname = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 78)(47, "label", 81);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "input", 82);
    \u0275\u0275pipe(51, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Profile_Conditional_2_Conditional_72_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editLastname, $event) || (ctx_r1.editLastname = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(52, Profile_Conditional_2_Conditional_72_Conditional_52_Template, 5, 3, "div", 83);
    \u0275\u0275conditionalCreate(53, Profile_Conditional_2_Conditional_72_Conditional_53_Template, 5, 3, "div", 84);
    \u0275\u0275elementStart(54, "div", 85)(55, "button", 86);
    \u0275\u0275listener("click", function Profile_Conditional_2_Conditional_72_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.savePersonalInfo());
    });
    \u0275\u0275conditionalCreate(56, Profile_Conditional_2_Conditional_72_Conditional_56_Template, 1, 0, "span", 87);
    \u0275\u0275text(57);
    \u0275\u0275pipe(58, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(1, 24, "profile.nav.personal")));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 26, "profile.nav.personal"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 28, "profile.personal.subtitle"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 30, "profile.personal.account_info"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 32, "profile.personal.email"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.email());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 34, "profile.personal.email_note"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(30, 36, "profile.personal.account_state"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.accountState() === "admin" ? 32 : ctx_r1.accountState() === "verified" ? 33 : 34);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(38, 38, "profile.personal.edit_name"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(43, 40, "profile.personal.first_name"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editFirstname);
    \u0275\u0275property("disabled", ctx_r1.isUpdatingProfile())("placeholder", \u0275\u0275pipeBind1(45, 42, "profile.personal.first_name_placeholder"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(49, 44, "profile.personal.last_name"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editLastname);
    \u0275\u0275property("disabled", ctx_r1.isUpdatingProfile())("placeholder", \u0275\u0275pipeBind1(51, 46, "profile.personal.last_name_placeholder"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.profileEditError() ? 52 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.profileEditSuccess() ? 53 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isUpdatingProfile());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isUpdatingProfile() ? 56 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(58, 48, "profile.personal.save"), " ");
  }
}
function Profile_Conditional_2_Conditional_73_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 84);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 9);
    \u0275\u0275element(2, "path", 98);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, "profile.security.email_sent_check"), " ");
  }
}
function Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "path", 108);
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "path", 109)(2, "path", 110);
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "path", 108);
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "path", 109)(2, "path", 110);
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 9);
    \u0275\u0275element(2, "path", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, ctx_r1.changePasswordError()), " ");
  }
}
function Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 87);
  }
}
function Profile_Conditional_2_Conditional_73_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 94)(1, "div", 78)(2, "label", 99);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 100);
    \u0275\u0275elementStart(6, "p", 101);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 78)(10, "label", 102);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 103)(14, "input", 104);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Profile_Conditional_2_Conditional_73_Conditional_25_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.changePasswordNew, $event) || (ctx_r1.changePasswordNew = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 105);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275listener("click", function Profile_Conditional_2_Conditional_73_Conditional_25_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.togglePasswordVisibility("new"));
    });
    \u0275\u0275conditionalCreate(18, Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_18_Template, 2, 0, ":svg:svg", 9)(19, Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_19_Template, 3, 0, ":svg:svg", 9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 78)(21, "label", 106);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 103)(25, "input", 107);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Profile_Conditional_2_Conditional_73_Conditional_25_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.changePasswordConfirm, $event) || (ctx_r1.changePasswordConfirm = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 105);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275listener("click", function Profile_Conditional_2_Conditional_73_Conditional_25_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.togglePasswordVisibility("confirm"));
    });
    \u0275\u0275conditionalCreate(29, Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_29_Template, 2, 0, ":svg:svg", 9)(30, Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_30_Template, 3, 0, ":svg:svg", 9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(31, Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_31_Template, 5, 3, "div", 83);
    \u0275\u0275elementStart(32, "div", 85)(33, "button", 86);
    \u0275\u0275listener("click", function Profile_Conditional_2_Conditional_73_Conditional_25_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.requestPasswordChange());
    });
    \u0275\u0275conditionalCreate(34, Profile_Conditional_2_Conditional_73_Conditional_25_Conditional_34_Template, 1, 0, "span", 87);
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 21, "auth.fields.email"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r1.email());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 23, "profile.security.email_prefilled"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 25, "profile.security.new_password"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("type", ctx_r1.showNewPassword() ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.changePasswordNew);
    \u0275\u0275property("disabled", ctx_r1.isChangingPassword())("placeholder", \u0275\u0275pipeBind1(15, 27, "profile.security.new_password_placeholder"));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(17, 29, ctx_r1.showNewPassword() ? "common.hide" : "common.show"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showNewPassword() ? 18 : 19);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(23, 31, "profile.security.confirm_password"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("type", ctx_r1.showConfirmPassword() ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.changePasswordConfirm);
    \u0275\u0275property("disabled", ctx_r1.isChangingPassword())("placeholder", \u0275\u0275pipeBind1(26, 33, "profile.security.confirm_password_placeholder"));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(28, 35, ctx_r1.showConfirmPassword() ? "common.hide" : "common.show"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showConfirmPassword() ? 29 : 30);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.changePasswordError() ? 31 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isChangingPassword());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isChangingPassword() ? 34 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(36, 37, "profile.security.change_password_btn"), " ");
  }
}
function Profile_Conditional_2_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 37);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275elementStart(2, "div", 67)(3, "div", 90);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 9);
    \u0275\u0275element(5, "path", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div")(7, "h1", 69);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 70);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 54)(14, "div", 91)(15, "h2", 55);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 92);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "p", 93);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, Profile_Conditional_2_Conditional_73_Conditional_24_Template, 5, 3, "div", 84)(25, Profile_Conditional_2_Conditional_73_Conditional_25_Template, 37, 39, "div", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 95)(27, "div", 91)(28, "h2", 55);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 96);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "p", 93);
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 85)(38, "a", 97);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(39, "svg", 9);
    \u0275\u0275element(40, "path", 98);
    \u0275\u0275elementEnd();
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(1, 12, "profile.nav.security")));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 14, "profile.nav.security"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 16, "profile.security.subtitle"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 18, "profile.security.change_password"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 20, "profile.security.email_confirmation"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(23, 22, "profile.security.change_password_desc"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.changePasswordEmailSent() ? 24 : 25);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(30, 24, "profile.security.forgot_password_title"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(33, 26, "profile.security.no_login_needed"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(36, 28, "profile.security.forgot_password_desc_alt"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(42, 30, "profile.security.forgot_password_btn"), " ");
  }
}
function Profile_Conditional_2_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 37);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275elementStart(2, "div", 67)(3, "div", 111);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 9);
    \u0275\u0275element(5, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div")(7, "h1", 69);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 70);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 54)(14, "div", 112)(15, "div", 113);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 114);
    \u0275\u0275element(17, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "h3");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "a", 115);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(1, 7, "profile.nav.orders")));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, "profile.nav.orders"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 11, "profile.orders.subtitle"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 13, "profile.orders.empty_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 15, "profile.orders.empty_desc"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(26, 17, "profile.orders.browse_products"), " ");
  }
}
function Profile_Conditional_2_Conditional_75_Conditional_26_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "path", 108);
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_75_Conditional_26_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "path", 109)(2, "path", 110);
    \u0275\u0275elementEnd();
  }
}
function Profile_Conditional_2_Conditional_75_Conditional_26_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 9);
    \u0275\u0275element(2, "path", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, ctx_r1.deleteError()), " ");
  }
}
function Profile_Conditional_2_Conditional_75_Conditional_26_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 126);
  }
}
function Profile_Conditional_2_Conditional_75_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 94)(1, "div", 78)(2, "label", 123);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 103)(6, "input", 124);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Profile_Conditional_2_Conditional_75_Conditional_26_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.deletePassword, $event) || (ctx_r1.deletePassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 105);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275listener("click", function Profile_Conditional_2_Conditional_75_Conditional_26_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.togglePasswordVisibility("delete"));
    });
    \u0275\u0275conditionalCreate(10, Profile_Conditional_2_Conditional_75_Conditional_26_Conditional_10_Template, 2, 0, ":svg:svg", 9)(11, Profile_Conditional_2_Conditional_75_Conditional_26_Conditional_11_Template, 3, 0, ":svg:svg", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "span", 101);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(15, Profile_Conditional_2_Conditional_75_Conditional_26_Conditional_15_Template, 5, 3, "div", 83);
    \u0275\u0275elementStart(16, "div", 85)(17, "button", 125);
    \u0275\u0275listener("click", function Profile_Conditional_2_Conditional_75_Conditional_26_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.requestDeleteAccount());
    });
    \u0275\u0275conditionalCreate(18, Profile_Conditional_2_Conditional_75_Conditional_26_Conditional_18_Template, 1, 0, "span", 126);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 9);
    \u0275\u0275element(20, "path", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 12, "profile.danger.confirm_password"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("type", ctx_r1.showDeletePassword() ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.deletePassword);
    \u0275\u0275property("disabled", ctx_r1.isDeletingAccount())("placeholder", \u0275\u0275pipeBind1(7, 14, "profile.danger.password_placeholder"));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(9, 16, ctx_r1.showDeletePassword() ? "common.hide" : "common.show"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showDeletePassword() ? 10 : 11);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 18, "profile.danger.password_hint"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.deleteError() ? 15 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isDeletingAccount());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isDeletingAccount() ? 18 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 20, "profile.danger.delete_btn"), " ");
  }
}
function Profile_Conditional_2_Conditional_75_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 122)(1, "div", 127);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 4);
    \u0275\u0275element(3, "path", 98);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 2, "profile.danger.email_sent_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 4, "profile.danger.email_sent_desc"));
  }
}
function Profile_Conditional_2_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 37);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275elementStart(2, "div", 67)(3, "div", 116);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 9);
    \u0275\u0275element(5, "path", 117);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div")(7, "h1", 118);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 70);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 119);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 9);
    \u0275\u0275element(15, "path", 117);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 120)(20, "h2", 121);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 93);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, Profile_Conditional_2_Conditional_75_Conditional_26_Template, 23, 22, "div", 94)(27, Profile_Conditional_2_Conditional_75_Conditional_27_Template, 10, 6, "div", 122);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(1, 8, "profile.nav.danger")));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 10, "profile.nav.danger"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 12, "profile.danger.subtitle"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 14, "profile.danger.warning_banner"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 16, "profile.danger.delete_account"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(25, 18, "profile.danger.delete_desc"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.deleteConfirmationSent() ? 26 : 27);
  }
}
function Profile_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 7)(2, "button", 8);
    \u0275\u0275listener("click", function Profile_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSidebar());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 9);
    \u0275\u0275element(4, "path", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 11);
    \u0275\u0275conditionalCreate(9, Profile_Conditional_2_Case_9_Template, 2, 3)(10, Profile_Conditional_2_Case_10_Template, 2, 3)(11, Profile_Conditional_2_Case_11_Template, 2, 3)(12, Profile_Conditional_2_Case_12_Template, 2, 3)(13, Profile_Conditional_2_Case_13_Template, 2, 3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "aside", 12)(15, "div", 13)(16, "div", 14)(17, "span", 15);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 17)(21, "p", 18);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 19);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(25, Profile_Conditional_2_Conditional_25_Template, 2, 0, "span", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "nav", 21);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementStart(28, "button", 22);
    \u0275\u0275listener("click", function Profile_Conditional_2_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSection("overview"));
    });
    \u0275\u0275elementStart(29, "span", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(30, "svg", 9);
    \u0275\u0275element(31, "path", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(32, "span", 25);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "button", 22);
    \u0275\u0275listener("click", function Profile_Conditional_2_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSection("personal"));
    });
    \u0275\u0275elementStart(36, "span", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(37, "svg", 9);
    \u0275\u0275element(38, "path", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(39, "span", 25);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "button", 22);
    \u0275\u0275listener("click", function Profile_Conditional_2_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSection("security"));
    });
    \u0275\u0275elementStart(43, "span", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(44, "svg", 9);
    \u0275\u0275element(45, "path", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(46, "span", 25);
    \u0275\u0275text(47);
    \u0275\u0275pipe(48, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "button", 22);
    \u0275\u0275listener("click", function Profile_Conditional_2_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSection("orders"));
    });
    \u0275\u0275elementStart(50, "span", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(51, "svg", 9);
    \u0275\u0275element(52, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(53, "span", 25);
    \u0275\u0275text(54);
    \u0275\u0275pipe(55, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(56, "div", 29);
    \u0275\u0275elementStart(57, "button", 30);
    \u0275\u0275listener("click", function Profile_Conditional_2_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSection("danger"));
    });
    \u0275\u0275elementStart(58, "span", 31);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(59, "svg", 9);
    \u0275\u0275element(60, "path", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(61, "span", 25);
    \u0275\u0275text(62);
    \u0275\u0275pipe(63, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "button", 33);
    \u0275\u0275listener("click", function Profile_Conditional_2_Template_button_click_64_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(65, "svg", 9);
    \u0275\u0275element(66, "path", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275text(67);
    \u0275\u0275pipe(68, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(69, Profile_Conditional_2_Conditional_69_Template, 1, 0, "div", 35);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(70, "main", 36);
    \u0275\u0275conditionalCreate(71, Profile_Conditional_2_Conditional_71_Template, 88, 39, "section", 37);
    \u0275\u0275conditionalCreate(72, Profile_Conditional_2_Conditional_72_Template, 59, 50, "section", 37);
    \u0275\u0275conditionalCreate(73, Profile_Conditional_2_Conditional_73_Template, 43, 32, "section", 37);
    \u0275\u0275conditionalCreate(74, Profile_Conditional_2_Conditional_74_Template, 27, 19, "section", 37);
    \u0275\u0275conditionalCreate(75, Profile_Conditional_2_Conditional_75_Template, 28, 20, "section", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-expanded", ctx_r1.isSidebarOpen());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 34, "profile.menu"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_3_0 = ctx_r1.activeSection()) === "overview" ? 9 : tmp_3_0 === "personal" ? 10 : tmp_3_0 === "security" ? 11 : tmp_3_0 === "orders" ? 12 : tmp_3_0 === "danger" ? 13 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("sidebar--open", ctx_r1.isSidebarOpen());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.initials());
    \u0275\u0275advance();
    \u0275\u0275classProp("avatar-status--admin", ctx_r1.accountState() === "admin");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.fullName());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.email());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.accountState() === "admin" ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(27, 36, "profile.nav.label"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("nav-item--active", ctx_r1.activeSection() === "overview");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(34, 38, "profile.nav.overview"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("nav-item--active", ctx_r1.activeSection() === "personal");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(41, 40, "profile.nav.personal"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("nav-item--active", ctx_r1.activeSection() === "security");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(48, 42, "profile.nav.security"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("nav-item--active", ctx_r1.activeSection() === "orders");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(55, 44, "profile.nav.orders"));
    \u0275\u0275advance(3);
    \u0275\u0275classProp("nav-item--active", ctx_r1.activeSection() === "danger");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(63, 46, "profile.nav.danger"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(68, 48, "profile.logout"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isSidebarOpen() ? 69 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.activeSection() === "overview" ? 71 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeSection() === "personal" ? 72 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeSection() === "security" ? 73 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeSection() === "orders" ? 74 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeSection() === "danger" ? 75 : -1);
  }
}
var Profile = class _Profile {
  authService = inject(AuthService);
  accountService = inject(AccountService);
  toastService = inject(ToastService);
  router = inject(Router);
  translationService = inject(TranslationService);
  user = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;
  fullName = computed(() => {
    const u = this.user();
    if (!u)
      return "";
    return `${u.firstname} ${u.lastname}`.trim();
  }, ...ngDevMode ? [{ debugName: "fullName" }] : []);
  initials = computed(() => {
    const u = this.user();
    if (!u)
      return "?";
    const f = u.firstname?.[0] ?? "";
    const l = u.lastname?.[0] ?? "";
    return (f + l).toUpperCase() || "?";
  }, ...ngDevMode ? [{ debugName: "initials" }] : []);
  email = computed(() => this.user()?.email ?? "", ...ngDevMode ? [{ debugName: "email" }] : []);
  accountState = computed(() => this.user()?.account_state ?? "verified", ...ngDevMode ? [{ debugName: "accountState" }] : []);
  language = computed(() => this.translationService.getCurrentLanguage(), ...ngDevMode ? [{ debugName: "language" }] : []);
  activeSection = signal("overview", ...ngDevMode ? [{ debugName: "activeSection" }] : []);
  editFirstname = "";
  editLastname = "";
  isUpdatingProfile = signal(false, ...ngDevMode ? [{ debugName: "isUpdatingProfile" }] : []);
  profileEditError = signal("", ...ngDevMode ? [{ debugName: "profileEditError" }] : []);
  profileEditSuccess = signal(false, ...ngDevMode ? [{ debugName: "profileEditSuccess" }] : []);
  changePasswordNew = "";
  changePasswordConfirm = "";
  showNewPassword = signal(false, ...ngDevMode ? [{ debugName: "showNewPassword" }] : []);
  showConfirmPassword = signal(false, ...ngDevMode ? [{ debugName: "showConfirmPassword" }] : []);
  isChangingPassword = signal(false, ...ngDevMode ? [{ debugName: "isChangingPassword" }] : []);
  changePasswordError = signal("", ...ngDevMode ? [{ debugName: "changePasswordError" }] : []);
  changePasswordEmailSent = signal(false, ...ngDevMode ? [{ debugName: "changePasswordEmailSent" }] : []);
  deletePassword = "";
  showDeletePassword = signal(false, ...ngDevMode ? [{ debugName: "showDeletePassword" }] : []);
  isDeletingAccount = signal(false, ...ngDevMode ? [{ debugName: "isDeletingAccount" }] : []);
  deleteError = signal("", ...ngDevMode ? [{ debugName: "deleteError" }] : []);
  deleteConfirmationSent = signal(false, ...ngDevMode ? [{ debugName: "deleteConfirmationSent" }] : []);
  isSidebarOpen = signal(false, ...ngDevMode ? [{ debugName: "isSidebarOpen" }] : []);
  ngOnInit() {
    this.loadPersonalInfoIntoForm();
  }
  setSection(section) {
    this.activeSection.set(section);
    this.isSidebarOpen.set(false);
    this.resetForms();
  }
  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }
  logout() {
    this.authService.logout();
  }
  loadPersonalInfoIntoForm() {
    const u = this.user();
    this.editFirstname = u?.firstname ?? "";
    this.editLastname = u?.lastname ?? "";
  }
  savePersonalInfo() {
    this.profileEditError.set("");
    this.profileEditSuccess.set(false);
    const firstname = this.editFirstname.trim();
    const lastname = this.editLastname.trim();
    if (!firstname || !lastname) {
      this.profileEditError.set("profile.errors.name_required");
      return;
    }
    this.isUpdatingProfile.set(true);
    this.accountService.updateProfile({ firstname, lastname }).subscribe({
      next: () => {
        this.isUpdatingProfile.set(false);
        this.profileEditSuccess.set(true);
        this.toastService.success("profile.success.profile_updated");
      },
      error: (err) => {
        this.isUpdatingProfile.set(false);
        this.profileEditError.set(err.message ?? "profile.errors.update_failed");
      }
    });
  }
  requestPasswordChange() {
    this.changePasswordError.set("");
    this.changePasswordEmailSent.set(false);
    if (!this.changePasswordNew || this.changePasswordNew.length < 6) {
      this.changePasswordError.set("profile.errors.new_password_too_short");
      return;
    }
    if (this.changePasswordNew !== this.changePasswordConfirm) {
      this.changePasswordError.set("profile.errors.passwords_do_not_match");
      return;
    }
    const userEmail = this.email();
    if (!userEmail) {
      this.changePasswordError.set("auth.errors.not_authenticated");
      return;
    }
    this.isChangingPassword.set(true);
    this.authService.requestPasswordChange(userEmail, this.changePasswordNew, this.language()).subscribe({
      next: () => {
        this.isChangingPassword.set(false);
        this.changePasswordEmailSent.set(true);
        this.changePasswordNew = "";
        this.changePasswordConfirm = "";
      },
      error: (err) => {
        this.isChangingPassword.set(false);
        this.changePasswordError.set(err.message ?? "profile.errors.password_change_failed");
      }
    });
  }
  requestDeleteAccount() {
    this.deleteError.set("");
    const password = this.deletePassword.trim();
    if (!password) {
      this.deleteError.set("auth.errors.empty_fields");
      return;
    }
    const userId = this.user()?.id;
    if (!userId) {
      this.deleteError.set("auth.errors.not_authenticated");
      return;
    }
    this.isDeletingAccount.set(true);
    this.accountService.deleteAccountRequest(userId, password).subscribe({
      next: () => {
        this.isDeletingAccount.set(false);
        this.deleteConfirmationSent.set(true);
      },
      error: (err) => {
        this.isDeletingAccount.set(false);
        this.deleteError.set(err.message ?? "profile.errors.delete_failed");
      }
    });
  }
  togglePasswordVisibility(field) {
    if (field === "new")
      this.showNewPassword.update((v) => !v);
    else if (field === "confirm")
      this.showConfirmPassword.update((v) => !v);
    else
      this.showDeletePassword.update((v) => !v);
  }
  resetForms() {
    this.profileEditError.set("");
    this.profileEditSuccess.set(false);
    this.changePasswordError.set("");
    this.changePasswordEmailSent.set(false);
    this.deleteError.set("");
    this.deleteConfirmationSent.set(false);
    this.changePasswordNew = "";
    this.changePasswordConfirm = "";
    this.loadPersonalInfoIntoForm();
  }
  static \u0275fac = function Profile_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Profile)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Profile, selectors: [["app-profile"]], decls: 3, vars: 2, consts: [[1, "profile-page"], [1, "auth-gate"], [1, "profile-layout"], [1, "auth-gate__icon"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"], ["routerLink", "/login", 1, "btn", "btn-primary"], [1, "mobile-bar"], [1, "mobile-menu-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M4 6h16M4 12h16M4 18h16"], [1, "mobile-section-label"], [1, "sidebar"], [1, "sidebar-profile"], [1, "sidebar-avatar"], [1, "avatar-initials"], [1, "avatar-status"], [1, "sidebar-user-info"], [1, "sidebar-name"], [1, "sidebar-email"], [1, "badge", "badge--admin"], ["role", "navigation", 1, "sidebar-nav"], [1, "nav-item", 3, "click"], [1, "nav-icon"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"], [1, "nav-label"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"], [1, "nav-divider"], [1, "nav-item", "nav-item--danger", 3, "click"], [1, "nav-icon-danger"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], [1, "sidebar-logout", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"], [1, "sidebar-overlay"], [1, "profile-main"], [1, "content-section", 3, "aria-label"], [1, "sidebar-overlay", 3, "click"], [1, "overview-hero"], [1, "overview-avatar"], [1, "overview-info"], [1, "overview-name"], [1, "overview-email"], [1, "badge", "badge--verified"], [1, "stats-grid"], [1, "stat-card", "stat-card--green"], [1, "stat-card__icon"], [1, "stat-card__content"], [1, "stat-number"], [1, "stat-label"], [1, "stat-card", "stat-card--blue"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"], [1, "stat-card", "stat-card--purple"], [1, "content-card"], [1, "card-title"], [1, "quick-actions"], [1, "quick-action-btn", 3, "click"], [1, "qa-icon", "qa-icon--green"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], [1, "qa-text"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "qa-arrow"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 5l7 7-7 7"], [1, "qa-icon", "qa-icon--blue"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"], ["routerLink", "/purchase", 1, "quick-action-btn"], [1, "qa-icon", "qa-icon--orange"], [1, "section-header"], [1, "section-header__icon", "section-header__icon--green"], [1, "section-title"], [1, "section-subtitle"], [1, "info-grid"], [1, "info-row"], [1, "info-label"], [1, "info-value"], [1, "info-note"], [1, "badge", "badge--unverified"], [1, "form-grid"], [1, "form-field"], ["for", "editFirstname", 1, "form-label"], ["id", "editFirstname", "type", "text", "name", "editFirstname", "autocomplete", "given-name", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled", "placeholder"], ["for", "editLastname", 1, "form-label"], ["id", "editLastname", "type", "text", "name", "editLastname", "autocomplete", "family-name", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled", "placeholder"], ["role", "alert", 1, "alert", "alert--error"], ["role", "status", 1, "alert", "alert--success"], [1, "card-actions"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "btn-spinner"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "section-header__icon", "section-header__icon--blue"], [1, "card-title-row"], [1, "card-badge", "card-badge--info"], [1, "card-description"], [1, "form-stack"], [1, "content-card", "content-card--muted"], [1, "card-badge", "card-badge--neutral"], ["routerLink", "/password-reset-request", 1, "btn", "btn-secondary"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"], [1, "form-label"], ["type", "email", "readonly", "", "disabled", "", 1, "form-input", "form-input--readonly", 3, "value"], [1, "form-hint"], ["for", "newPwd", 1, "form-label"], [1, "input-with-toggle"], ["id", "newPwd", "name", "newPwd", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "type", "ngModel", "disabled", "placeholder"], ["type", "button", 1, "toggle-visibility", 3, "click"], ["for", "confirmPwd", 1, "form-label"], ["id", "confirmPwd", "name", "confirmPwd", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "type", "ngModel", "disabled", "placeholder"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], [1, "section-header__icon", "section-header__icon--orange"], [1, "empty-state"], [1, "empty-state__icon"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1"], ["routerLink", "/products", 1, "btn", "btn-primary"], [1, "section-header__icon", "section-header__icon--red"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"], [1, "section-title", "section-title--danger"], [1, "danger-banner"], [1, "content-card", "content-card--danger"], [1, "card-title", "card-title--danger"], [1, "delete-sent"], ["for", "deletePwd", 1, "form-label"], ["id", "deletePwd", "name", "deletePwd", "autocomplete", "current-password", 1, "form-input", "form-input--danger", 3, "ngModelChange", "type", "ngModel", "disabled", "placeholder"], [1, "btn", "btn-danger-solid", 3, "click", "disabled"], [1, "btn-spinner", "btn-spinner--danger"], [1, "delete-sent__icon"]], template: function Profile_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, Profile_Conditional_1_Template, 10, 6, "div", 1);
      \u0275\u0275conditionalCreate(2, Profile_Conditional_2_Template, 76, 50, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isAuthenticated() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isAuthenticated() && ctx.user() ? 2 : -1);
    }
  }, dependencies: [RouterModule, RouterLink, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, TranslateModule, TranslatePipe], styles: [`

.profile-page[_ngcontent-%COMP%] {
  min-height: calc(100vh - 140px);
  background: var(--bg-secondary);
}
.auth-gate[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  min-height: 60vh;
  padding: var(--space-8);
  text-align: center;
}
.auth-gate__icon[_ngcontent-%COMP%] {
  width: 80px;
  height: 80px;
  background: var(--bg-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
}
.auth-gate__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  color: var(--text-secondary);
}
.auth-gate[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: var(--text-xl);
  color: var(--text-primary);
  margin: 0;
}
.profile-layout[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr;
  min-height: calc(100vh - 140px);
  max-width: 1200px;
  margin: 0 auto;
  gap: 0;
}
.mobile-bar[_ngcontent-%COMP%] {
  display: none;
  grid-column: 1 / -1;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 30;
}
.mobile-menu-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast);
  white-space: nowrap;
}
.mobile-menu-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.mobile-menu-btn[_ngcontent-%COMP%]:hover {
  background: var(--bg-tertiary);
}
.mobile-section-label[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sidebar[_ngcontent-%COMP%] {
  grid-row: 1 / -1;
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
.sidebar-overlay[_ngcontent-%COMP%] {
  display: none;
}
.sidebar-profile[_ngcontent-%COMP%] {
  padding: var(--space-6) var(--space-5) var(--space-5);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background:
    linear-gradient(
      135deg,
      #067a45 0%,
      #048a4f 100%);
}
.sidebar-avatar[_ngcontent-%COMP%] {
  position: relative;
  flex-shrink: 0;
}
.avatar-initials[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
  display: flex;
}
.sidebar-avatar[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.avatar-status[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid var(--bg-primary);
}
.avatar-status--admin[_ngcontent-%COMP%] {
  background: #f59e0b;
}
.sidebar-user-info[_ngcontent-%COMP%] {
  min-width: 0;
  flex: 1;
}
.sidebar-name[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  margin: 0 0 2px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sidebar-email[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 var(--space-1) 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--space-2);
  border-radius: var(--radius-full, 9999px);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.badge--admin[_ngcontent-%COMP%] {
  background: rgba(245, 158, 11, 0.2);
  color: var(--color-warning);
  border: 1px solid rgba(245, 158, 11, 0.4);
}
.badge--verified[_ngcontent-%COMP%] {
  background: rgba(34, 197, 94, 0.15);
  color: var(--text-secondary);
  border: 1px solid rgba(34, 197, 94, 0.3);
}
.badge--unverified[_ngcontent-%COMP%] {
  background: rgba(156, 163, 175, 0.15);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
.sidebar-nav[_ngcontent-%COMP%] {
  flex: 1;
  padding: var(--space-3) var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-3);
  border-radius: var(--radius-lg);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
  width: 100%;
  text-decoration: none;
}
.nav-item[_ngcontent-%COMP%]:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}
.nav-item--active[_ngcontent-%COMP%] {
  background: var(--color-success-light);
  color: var(--color-success);
  font-weight: 600;
}
.nav-item--active[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%] {
  color: var(--color-success);
}
.nav-item--danger[_ngcontent-%COMP%] {
  color: var(--text-secondary);
}
.nav-item--danger[_ngcontent-%COMP%]:hover {
  background: var(--color-error-light);
  color: var(--color-error);
}
.nav-item--danger.nav-item--active[_ngcontent-%COMP%] {
  background: var(--color-error-light);
  color: var(--color-error);
}
.nav-icon[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: inherit;
}
.nav-icon-danger[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: inherit;
}
.nav-icon-danger[_ngcontent-%COMP%]:hover {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-error-hover);
}
.nav-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
}
.nav-label[_ngcontent-%COMP%] {
  flex: 1;
}
.nav-divider[_ngcontent-%COMP%] {
  height: 1px;
  background: var(--border-color);
  margin: var(--space-2) 0;
}
.sidebar-logout[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  margin: var(--space-3);
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.sidebar-logout[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.sidebar-logout[_ngcontent-%COMP%]:hover {
  background: rgba(220, 38, 38, 0.06);
  border-color: var(--color-error);
  color: var(--color-error);
}
.profile-main[_ngcontent-%COMP%] {
  padding: var(--space-8);
  overflow-y: auto;
  min-width: 0;
}
.content-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  animation: _ngcontent-%COMP%_fadeSlideIn 0.25s ease-out;
}
@keyframes _ngcontent-%COMP%_fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.section-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
.section-header__icon[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.section-header__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 26px;
  height: 26px;
}
.section-header__icon--green[_ngcontent-%COMP%] {
  background: rgba(6, 122, 69, 0.12);
  color: var(--color-success);
}
.section-header__icon--blue[_ngcontent-%COMP%] {
  background: var(--color-info-light);
  color: var(--color-info);
}
.section-header__icon--orange[_ngcontent-%COMP%] {
  background: rgba(234, 88, 12, 0.1);
  color: var(--color-warning-hover);
}
.section-header__icon--red[_ngcontent-%COMP%] {
  background: var(--color-error-light);
  color: var(--color-error);
}
.section-title[_ngcontent-%COMP%] {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
  line-height: 1.2;
}
.section-title--danger[_ngcontent-%COMP%] {
  color: var(--color-error);
}
.section-subtitle[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}
.content-card[_ngcontent-%COMP%] {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
.content-card--muted[_ngcontent-%COMP%] {
  background: var(--bg-secondary);
  border-style: dashed;
}
.content-card--danger[_ngcontent-%COMP%] {
  border-color: rgba(220, 38, 38, 0.25);
  background: var(--bg-primary);
}
.card-title[_ngcontent-%COMP%] {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-4) 0;
}
.card-title--danger[_ngcontent-%COMP%] {
  color: var(--color-error);
}
.card-title-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}
.card-title-row[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {
  margin: 0;
}
.card-badge[_ngcontent-%COMP%] {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 3px var(--space-2);
  border-radius: var(--radius-full);
}
.card-badge--info[_ngcontent-%COMP%] {
  background: var(--color-info-light);
  color: var(--color-info);
}
.card-badge--neutral[_ngcontent-%COMP%] {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
.card-description[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 var(--space-5) 0;
  line-height: 1.6;
}
.card-actions[_ngcontent-%COMP%] {
  margin-top: var(--space-5);
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.overview-hero[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #067a45 0%,
      #04a35e 50%,
      #067a45 100%);
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-8);
  display: flex;
  align-items: center;
  gap: var(--space-6);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(6, 122, 69, 0.3);
}
.overview-hero[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.overview-avatar[_ngcontent-%COMP%] {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.overview-info[_ngcontent-%COMP%] {
  position: relative;
  z-index: 1;
}
.overview-name[_ngcontent-%COMP%] {
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 700;
  color: white;
  margin: 0 0 4px 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.overview-email[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 var(--space-2) 0;
}
.stats-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
.stat-card[_ngcontent-%COMP%] {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);
}
.stat-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.stat-card__icon[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-card__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
}
.stat-card--green[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background: var(--color-success-light);
  color: var(--color-success);
}
.stat-card--blue[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background: var(--color-info-light);
  color: var(--color-info);
}
.stat-card--purple[_ngcontent-%COMP%]   .stat-card__icon[_ngcontent-%COMP%] {
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
}
.stat-card__content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.stat-number[_ngcontent-%COMP%] {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}
.stat-label[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.quick-actions[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.quick-action-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-4);
  border-radius: var(--radius-lg);
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  transition: background var(--transition-fast);
  width: 100%;
  color: var(--text-primary);
}
.quick-action-btn[_ngcontent-%COMP%]:hover {
  background: var(--bg-secondary);
}
.qa-icon[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.qa-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 22px;
  height: 22px;
}
.qa-icon--green[_ngcontent-%COMP%] {
  background: var(--color-success-light);
  color: var(--color-success);
}
.qa-icon--blue[_ngcontent-%COMP%] {
  background: var(--color-info-light);
  color: var(--color-info);
}
.qa-icon--orange[_ngcontent-%COMP%] {
  background: rgba(234, 88, 12, 0.1);
  color: var(--color-warning-hover);
}
.qa-text[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.qa-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}
.qa-text[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
.qa-arrow[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
  flex-shrink: 0;
}
.info-grid[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.info-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: center;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-color);
  gap: var(--space-4);
  flex-wrap: wrap;
}
.info-row[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.info-label[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.info-value[_ngcontent-%COMP%] {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
  word-break: break-word;
}
.info-note[_ngcontent-%COMP%] {
  grid-column: 2;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-style: italic;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
.form-stack[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.form-field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.form-label[_ngcontent-%COMP%] {
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.form-input[_ngcontent-%COMP%] {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  box-sizing: border-box;
  min-height: 48px;
  font-family: inherit;
}
.form-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.12);
}
.form-input[_ngcontent-%COMP%]:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background: var(--bg-secondary);
}
.form-input--danger[_ngcontent-%COMP%]:focus {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px var(--color-error-light);
}
.form-hint[_ngcontent-%COMP%] {
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.4;
}
.input-with-toggle[_ngcontent-%COMP%] {
  position: relative;
}
.input-with-toggle[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {
  padding-right: 3rem;
}
.toggle-visibility[_ngcontent-%COMP%] {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--transition-fast);
}
.toggle-visibility[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
}
.toggle-visibility[_ngcontent-%COMP%]:hover {
  color: var(--text-primary);
}
.alert[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
}
.alert[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}
.alert--error[_ngcontent-%COMP%] {
  background: var(--color-error-light);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: var(--color-error);
}
.alert--success[_ngcontent-%COMP%] {
  background: rgba(6, 122, 69, 0.08);
  border: 1px solid rgba(6, 122, 69, 0.2);
  color: var(--color-success);
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-lg);
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  min-height: 44px;
  font-family: inherit;
}
.btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}
.btn-primary[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #067a45,
      #048a4f);
  color: white;
  box-shadow: 0 2px 8px rgba(6, 122, 69, 0.3);
}
.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(6, 122, 69, 0.4);
}
.btn-secondary[_ngcontent-%COMP%] {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}
.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: var(--bg-tertiary);
  border-color: var(--color-success);
  color: var(--color-success);
  transform: translateY(-1px);
}
.btn-danger-solid[_ngcontent-%COMP%] {
  background: var(--color-error);
  color: white;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
}
.btn-danger-solid[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: var(--color-error-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.4);
}
.btn-spinner[_ngcontent-%COMP%] {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: white;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 0.65s linear infinite;
}
.btn-spinner--danger[_ngcontent-%COMP%] {
  border-color: rgba(255, 255, 255, 0.35);
  border-top-color: white;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
.danger-banner[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: rgba(234, 88, 12, 0.07);
  border: 1px solid rgba(234, 88, 12, 0.2);
  border-radius: var(--radius-lg);
  color: var(--color-warning-hover);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.6;
}
.danger-banner[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}
.danger-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
.delete-sent[_ngcontent-%COMP%] {
  text-align: center;
  padding: var(--space-8) var(--space-4);
}
.delete-sent__icon[_ngcontent-%COMP%] {
  width: 72px;
  height: 72px;
  background: var(--color-success-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-5);
}
.delete-sent__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  color: var(--color-success);
}
.delete-sent[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-3) 0;
}
.delete-sent[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}
.empty-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: var(--space-12) var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}
.empty-state__icon[_ngcontent-%COMP%] {
  width: 80px;
  height: 80px;
  background: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty-state__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  color: var(--text-secondary);
  opacity: 0.5;
}
.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
  max-width: 320px;
}
.form-input--readonly[_ngcontent-%COMP%] {
  background-color: var(--color-bg-secondary, #f5f5f5);
  color: var(--color-text-muted, #888);
  cursor: not-allowed;
  opacity: 0.7;
}
.form-hint[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: var(--color-text-muted, #888);
  margin-top: 4px;
}
[data-theme=dark][_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {
  background: #1a1f2e;
  border-color: #2a3040;
}
[data-theme=dark][_ngcontent-%COMP%]   .sidebar-profile[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #054d2d 0%,
      #036637 100%);
}
[data-theme=dark][_ngcontent-%COMP%]   .content-card[_ngcontent-%COMP%] {
  background: #1a1f2e;
  border-color: #2a3040;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
[data-theme=dark][_ngcontent-%COMP%]   .content-card--muted[_ngcontent-%COMP%] {
  background: #141820;
}
[data-theme=dark][_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {
  background: #1a1f2e;
  border-color: #2a3040;
}
[data-theme=dark][_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.05);
}
[data-theme=dark][_ngcontent-%COMP%]   .nav-item--active[_ngcontent-%COMP%] {
  background: rgba(6, 122, 69, 0.2);
}
[data-theme=dark][_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {
  background: #141820;
  border-color: #2a3040;
  color: #f1f5f9;
}
[data-theme=dark][_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus {
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}
[data-theme=dark][_ngcontent-%COMP%]   .quick-action-btn[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.04);
}
[data-theme=dark][_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {
  border-color: #2a3040;
}
@media (max-width: 1024px) {
  .stats-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
  }
  .profile-layout[_ngcontent-%COMP%] {
    grid-template-columns: 240px 1fr;
  }
}
@media (max-width: 768px) {
  .profile-layout[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  .mobile-bar[_ngcontent-%COMP%] {
    display: flex;
  }
  .sidebar[_ngcontent-%COMP%] {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform var(--transition-normal);
    box-shadow: var(--shadow-lg);
    grid-row: auto;
  }
  .sidebar--open[_ngcontent-%COMP%] {
    transform: translateX(0);
  }
  .sidebar-overlay[_ngcontent-%COMP%] {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 199;
  }
  .profile-main[_ngcontent-%COMP%] {
    padding: var(--space-5) var(--space-4);
  }
  .overview-hero[_ngcontent-%COMP%] {
    flex-direction: column;
    text-align: center;
    padding: var(--space-6);
  }
  .stats-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .info-row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: var(--space-1);
  }
  .info-note[_ngcontent-%COMP%] {
    grid-column: 1;
  }
}
@media (max-width: 480px) {
  .profile-main[_ngcontent-%COMP%] {
    padding: var(--space-4) var(--space-3);
  }
  .content-card[_ngcontent-%COMP%] {
    padding: var(--space-4);
  }
  .section-header[_ngcontent-%COMP%] {
    gap: var(--space-3);
  }
  .section-header__icon[_ngcontent-%COMP%] {
    width: 44px;
    height: 44px;
  }
  .section-header__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
    width: 22px;
    height: 22px;
  }
  .card-title-row[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
  }
  .stat-card[_ngcontent-%COMP%] {
    gap: var(--space-3);
    padding: var(--space-4);
  }
}
@media (prefers-reduced-motion: reduce) {
  .content-section[_ngcontent-%COMP%] {
    animation: none;
  }
  .sidebar[_ngcontent-%COMP%] {
    transition: none;
  }
  .stat-card[_ngcontent-%COMP%], 
   .btn[_ngcontent-%COMP%], 
   .nav-item[_ngcontent-%COMP%], 
   .quick-action-btn[_ngcontent-%COMP%] {
    transition: none;
  }
}
/*# sourceMappingURL=profile.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Profile, [{
    type: Component,
    args: [{ selector: "app-profile", standalone: true, imports: [RouterModule, FormsModule, TranslateModule], template: `<div class="profile-page">\r
  @if (!isAuthenticated()) {\r
    <div class="auth-gate">\r
      <div class="auth-gate__icon">\r
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">\r
          <path\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"\r
          />\r
        </svg>\r
      </div>\r
      <h2>{{ 'profile.not_authenticated' | translate }}</h2>\r
      <a routerLink="/login" class="btn btn-primary">{{ 'auth.login' | translate }}</a>\r
    </div>\r
  }\r
\r
  @if (isAuthenticated() && user()) {\r
    <div class="profile-layout">\r
      <div class="mobile-bar">\r
        <button\r
          class="mobile-menu-btn"\r
          (click)="toggleSidebar()"\r
          [attr.aria-expanded]="isSidebarOpen()"\r
        >\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />\r
          </svg>\r
          <span>{{ 'profile.menu' | translate }}</span>\r
        </button>\r
        <span class="mobile-section-label">\r
          @switch (activeSection()) {\r
            @case ('overview') {\r
              {{ 'profile.nav.overview' | translate }}\r
            }\r
            @case ('personal') {\r
              {{ 'profile.nav.personal' | translate }}\r
            }\r
            @case ('security') {\r
              {{ 'profile.nav.security' | translate }}\r
            }\r
            @case ('orders') {\r
              {{ 'profile.nav.orders' | translate }}\r
            }\r
            @case ('danger') {\r
              {{ 'profile.nav.danger' | translate }}\r
            }\r
          }\r
        </span>\r
      </div>\r
\r
      <aside class="sidebar" [class.sidebar--open]="isSidebarOpen()">\r
        <div class="sidebar-profile">\r
          <div class="sidebar-avatar">\r
            <span class="avatar-initials">{{ initials() }}</span>\r
            <span\r
              class="avatar-status"\r
              [class.avatar-status--admin]="accountState() === 'admin'"\r
            ></span>\r
          </div>\r
          <div class="sidebar-user-info">\r
            <p class="sidebar-name">{{ fullName() }}</p>\r
            <p class="sidebar-email">{{ email() }}</p>\r
            @if (accountState() === 'admin') {\r
              <span class="badge badge--admin">Admin</span>\r
            }\r
          </div>\r
        </div>\r
\r
        <nav\r
          class="sidebar-nav"\r
          role="navigation"\r
          [attr.aria-label]="'profile.nav.label' | translate"\r
        >\r
          <button\r
            class="nav-item"\r
            [class.nav-item--active]="activeSection() === 'overview'"\r
            (click)="setSection('overview')"\r
          >\r
            <span class="nav-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"\r
                />\r
              </svg>\r
            </span>\r
            <span class="nav-label">{{ 'profile.nav.overview' | translate }}</span>\r
          </button>\r
\r
          <button\r
            class="nav-item"\r
            [class.nav-item--active]="activeSection() === 'personal'"\r
            (click)="setSection('personal')"\r
          >\r
            <span class="nav-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"\r
                />\r
              </svg>\r
            </span>\r
            <span class="nav-label">{{ 'profile.nav.personal' | translate }}</span>\r
          </button>\r
\r
          <button\r
            class="nav-item"\r
            [class.nav-item--active]="activeSection() === 'security'"\r
            (click)="setSection('security')"\r
          >\r
            <span class="nav-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"\r
                />\r
              </svg>\r
            </span>\r
            <span class="nav-label">{{ 'profile.nav.security' | translate }}</span>\r
          </button>\r
\r
          <button\r
            class="nav-item"\r
            [class.nav-item--active]="activeSection() === 'orders'"\r
            (click)="setSection('orders')"\r
          >\r
            <span class="nav-icon">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"\r
                />\r
              </svg>\r
            </span>\r
            <span class="nav-label">{{ 'profile.nav.orders' | translate }}</span>\r
          </button>\r
\r
          <div class="nav-divider"></div>\r
\r
          <button\r
            class="nav-item nav-item--danger"\r
            [class.nav-item--active]="activeSection() === 'danger'"\r
            (click)="setSection('danger')"\r
          >\r
            <span class="nav-icon-danger">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"\r
                />\r
              </svg>\r
            </span>\r
            <span class="nav-label">{{ 'profile.nav.danger' | translate }}</span>\r
          </button>\r
        </nav>\r
\r
        <button class="sidebar-logout" (click)="logout()">\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"\r
            />\r
          </svg>\r
          {{ 'profile.logout' | translate }}\r
        </button>\r
      </aside>\r
\r
      @if (isSidebarOpen()) {\r
        <div class="sidebar-overlay" (click)="toggleSidebar()"></div>\r
      }\r
\r
      <main class="profile-main">\r
        @if (activeSection() === 'overview') {\r
          <section class="content-section" aria-label="{{ 'profile.nav.overview' | translate }}">\r
            <div class="overview-hero">\r
              <div class="overview-avatar">\r
                <span>{{ initials() }}</span>\r
              </div>\r
              <div class="overview-info">\r
                <h1 class="overview-name">{{ fullName() }}</h1>\r
                <p class="overview-email">{{ email() }}</p>\r
                @if (accountState() === 'admin') {\r
                  <span class="badge badge--admin">Admin</span>\r
                } @else {\r
                  <span class="badge badge--verified">{{\r
                    'profile.role.verified' | translate\r
                  }}</span>\r
                }\r
              </div>\r
            </div>\r
\r
            <div class="stats-grid">\r
              <div class="stat-card stat-card--green">\r
                <div class="stat-card__icon">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"\r
                    />\r
                  </svg>\r
                </div>\r
                <div class="stat-card__content">\r
                  <span class="stat-number">\u2014</span>\r
                  <span class="stat-label">{{ 'profile.stats.orders' | translate }}</span>\r
                </div>\r
              </div>\r
\r
              <div class="stat-card stat-card--blue">\r
                <div class="stat-card__icon">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"\r
                    />\r
                  </svg>\r
                </div>\r
                <div class="stat-card__content">\r
                  <span class="stat-number">\u2014</span>\r
                  <span class="stat-label">{{ 'profile.stats.reviews' | translate }}</span>\r
                </div>\r
              </div>\r
\r
              <div class="stat-card stat-card--purple">\r
                <div class="stat-card__icon">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"\r
                    />\r
                  </svg>\r
                </div>\r
                <div class="stat-card__content">\r
                  <span class="stat-number">{{ accountState() }}</span>\r
                  <span class="stat-label">{{ 'profile.stats.status' | translate }}</span>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <div class="content-card">\r
              <h2 class="card-title">{{ 'profile.quick_actions' | translate }}</h2>\r
              <div class="quick-actions">\r
                <button class="quick-action-btn" (click)="setSection('personal')">\r
                  <span class="qa-icon qa-icon--green">\r
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                      <path\r
                        stroke-linecap="round"\r
                        stroke-linejoin="round"\r
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"\r
                      />\r
                    </svg>\r
                  </span>\r
                  <span class="qa-text">\r
                    <strong>{{ 'profile.nav.personal' | translate }}</strong>\r
                    <small>{{ 'profile.quick.edit_info_desc' | translate }}</small>\r
                  </span>\r
                  <svg\r
                    class="qa-arrow"\r
                    viewBox="0 0 24 24"\r
                    fill="none"\r
                    stroke="currentColor"\r
                    stroke-width="2"\r
                  >\r
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />\r
                  </svg>\r
                </button>\r
\r
                <button class="quick-action-btn" (click)="setSection('security')">\r
                  <span class="qa-icon qa-icon--blue">\r
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                      <path\r
                        stroke-linecap="round"\r
                        stroke-linejoin="round"\r
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"\r
                      />\r
                    </svg>\r
                  </span>\r
                  <span class="qa-text">\r
                    <strong>{{ 'profile.nav.security' | translate }}</strong>\r
                    <small>{{ 'profile.quick.security_desc' | translate }}</small>\r
                  </span>\r
                  <svg\r
                    class="qa-arrow"\r
                    viewBox="0 0 24 24"\r
                    fill="none"\r
                    stroke="currentColor"\r
                    stroke-width="2"\r
                  >\r
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />\r
                  </svg>\r
                </button>\r
\r
                <a class="quick-action-btn" routerLink="/purchase">\r
                  <span class="qa-icon qa-icon--orange">\r
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                      <path\r
                        stroke-linecap="round"\r
                        stroke-linejoin="round"\r
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"\r
                      />\r
                    </svg>\r
                  </span>\r
                  <span class="qa-text">\r
                    <strong>{{ 'profile.nav.orders' | translate }}</strong>\r
                    <small>{{ 'profile.quick.orders_desc' | translate }}</small>\r
                  </span>\r
                  <svg\r
                    class="qa-arrow"\r
                    viewBox="0 0 24 24"\r
                    fill="none"\r
                    stroke="currentColor"\r
                    stroke-width="2"\r
                  >\r
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />\r
                  </svg>\r
                </a>\r
              </div>\r
            </div>\r
          </section>\r
        }\r
\r
        @if (activeSection() === 'personal') {\r
          <section class="content-section" aria-label="{{ 'profile.nav.personal' | translate }}">\r
            <div class="section-header">\r
              <div class="section-header__icon section-header__icon--green">\r
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"\r
                  />\r
                </svg>\r
              </div>\r
              <div>\r
                <h1 class="section-title">{{ 'profile.nav.personal' | translate }}</h1>\r
                <p class="section-subtitle">{{ 'profile.personal.subtitle' | translate }}</p>\r
              </div>\r
            </div>\r
\r
            <div class="content-card">\r
              <h2 class="card-title">{{ 'profile.personal.account_info' | translate }}</h2>\r
              <div class="info-grid">\r
                <div class="info-row">\r
                  <span class="info-label">{{ 'profile.personal.email' | translate }}</span>\r
                  <span class="info-value">{{ email() }}</span>\r
                  <span class="info-note">{{ 'profile.personal.email_note' | translate }}</span>\r
                </div>\r
                <div class="info-row">\r
                  <span class="info-label">{{ 'profile.personal.account_state' | translate }}</span>\r
                  <span class="info-value">\r
                    @if (accountState() === 'admin') {\r
                      <span class="badge badge--admin">Admin</span>\r
                    } @else if (accountState() === 'verified') {\r
                      <span class="badge badge--verified">{{\r
                        'profile.role.verified' | translate\r
                      }}</span>\r
                    } @else {\r
                      <span class="badge badge--unverified">{{\r
                        'profile.role.unverified' | translate\r
                      }}</span>\r
                    }\r
                  </span>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <div class="content-card">\r
              <h2 class="card-title">{{ 'profile.personal.edit_name' | translate }}</h2>\r
\r
              <div class="form-grid">\r
                <div class="form-field">\r
                  <label class="form-label" for="editFirstname">\r
                    {{ 'profile.personal.first_name' | translate }}\r
                  </label>\r
                  <input\r
                    id="editFirstname"\r
                    type="text"\r
                    class="form-input"\r
                    [(ngModel)]="editFirstname"\r
                    name="editFirstname"\r
                    [disabled]="isUpdatingProfile()"\r
                    [placeholder]="'profile.personal.first_name_placeholder' | translate"\r
                    autocomplete="given-name"\r
                  />\r
                </div>\r
\r
                <div class="form-field">\r
                  <label class="form-label" for="editLastname">\r
                    {{ 'profile.personal.last_name' | translate }}\r
                  </label>\r
                  <input\r
                    id="editLastname"\r
                    type="text"\r
                    class="form-input"\r
                    [(ngModel)]="editLastname"\r
                    name="editLastname"\r
                    [disabled]="isUpdatingProfile()"\r
                    [placeholder]="'profile.personal.last_name_placeholder' | translate"\r
                    autocomplete="family-name"\r
                  />\r
                </div>\r
              </div>\r
\r
              @if (profileEditError()) {\r
                <div class="alert alert--error" role="alert">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"\r
                    />\r
                  </svg>\r
                  {{ profileEditError() | translate }}\r
                </div>\r
              }\r
\r
              @if (profileEditSuccess()) {\r
                <div class="alert alert--success" role="status">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"\r
                    />\r
                  </svg>\r
                  {{ 'profile.success.profile_updated' | translate }}\r
                </div>\r
              }\r
\r
              <div class="card-actions">\r
                <button\r
                  class="btn btn-primary"\r
                  (click)="savePersonalInfo()"\r
                  [disabled]="isUpdatingProfile()"\r
                >\r
                  @if (isUpdatingProfile()) {\r
                    <span class="btn-spinner"></span>\r
                  }\r
                  {{ 'profile.personal.save' | translate }}\r
                </button>\r
              </div>\r
            </div>\r
          </section>\r
        }\r
\r
        @if (activeSection() === 'security') {\r
          <section class="content-section" aria-label="{{ 'profile.nav.security' | translate }}">\r
            <div class="section-header">\r
              <div class="section-header__icon section-header__icon--blue">\r
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"\r
                  />\r
                </svg>\r
              </div>\r
              <div>\r
                <h1 class="section-title">{{ 'profile.nav.security' | translate }}</h1>\r
                <p class="section-subtitle">{{ 'profile.security.subtitle' | translate }}</p>\r
              </div>\r
            </div>\r
\r
            <div class="content-card">\r
              <div class="card-title-row">\r
                <h2 class="card-title">{{ 'profile.security.change_password' | translate }}</h2>\r
                <span class="card-badge card-badge--info">{{\r
                  'profile.security.email_confirmation' | translate\r
                }}</span>\r
              </div>\r
              <p class="card-description">\r
                {{ 'profile.security.change_password_desc' | translate }}\r
              </p>\r
\r
              @if (changePasswordEmailSent()) {\r
                <div class="alert alert--success" role="status">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"\r
                    />\r
                  </svg>\r
                  {{ 'profile.security.email_sent_check' | translate }}\r
                </div>\r
              } @else {\r
                <div class="form-stack">\r
                  <div class="form-field">\r
                    <label class="form-label">\r
                      {{ 'auth.fields.email' | translate }}\r
                    </label>\r
                    <input\r
                      type="email"\r
                      class="form-input form-input--readonly"\r
                      [value]="email()"\r
                      readonly\r
                      disabled\r
                    />\r
                    <p class="form-hint">{{ 'profile.security.email_prefilled' | translate }}</p>\r
                  </div>\r
\r
                  <div class="form-field">\r
                    <label class="form-label" for="newPwd">\r
                      {{ 'profile.security.new_password' | translate }}\r
                    </label>\r
                    <div class="input-with-toggle">\r
                      <input\r
                        id="newPwd"\r
                        [type]="showNewPassword() ? 'text' : 'password'"\r
                        class="form-input"\r
                        [(ngModel)]="changePasswordNew"\r
                        name="newPwd"\r
                        [disabled]="isChangingPassword()"\r
                        [placeholder]="'profile.security.new_password_placeholder' | translate"\r
                        autocomplete="new-password"\r
                      />\r
                      <button\r
                        type="button"\r
                        class="toggle-visibility"\r
                        (click)="togglePasswordVisibility('new')"\r
                        [attr.aria-label]="\r
                          (showNewPassword() ? 'common.hide' : 'common.show') | translate\r
                        "\r
                      >\r
                        @if (showNewPassword()) {\r
                          <svg\r
                            viewBox="0 0 24 24"\r
                            fill="none"\r
                            stroke="currentColor"\r
                            stroke-width="2"\r
                          >\r
                            <path\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"\r
                            />\r
                          </svg>\r
                        } @else {\r
                          <svg\r
                            viewBox="0 0 24 24"\r
                            fill="none"\r
                            stroke="currentColor"\r
                            stroke-width="2"\r
                          >\r
                            <path\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"\r
                            />\r
                            <path\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"\r
                            />\r
                          </svg>\r
                        }\r
                      </button>\r
                    </div>\r
                  </div>\r
\r
                  <div class="form-field">\r
                    <label class="form-label" for="confirmPwd">\r
                      {{ 'profile.security.confirm_password' | translate }}\r
                    </label>\r
                    <div class="input-with-toggle">\r
                      <input\r
                        id="confirmPwd"\r
                        [type]="showConfirmPassword() ? 'text' : 'password'"\r
                        class="form-input"\r
                        [(ngModel)]="changePasswordConfirm"\r
                        name="confirmPwd"\r
                        [disabled]="isChangingPassword()"\r
                        [placeholder]="'profile.security.confirm_password_placeholder' | translate"\r
                        autocomplete="new-password"\r
                      />\r
                      <button\r
                        type="button"\r
                        class="toggle-visibility"\r
                        (click)="togglePasswordVisibility('confirm')"\r
                        [attr.aria-label]="\r
                          (showConfirmPassword() ? 'common.hide' : 'common.show') | translate\r
                        "\r
                      >\r
                        @if (showConfirmPassword()) {\r
                          <svg\r
                            viewBox="0 0 24 24"\r
                            fill="none"\r
                            stroke="currentColor"\r
                            stroke-width="2"\r
                          >\r
                            <path\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"\r
                            />\r
                          </svg>\r
                        } @else {\r
                          <svg\r
                            viewBox="0 0 24 24"\r
                            fill="none"\r
                            stroke="currentColor"\r
                            stroke-width="2"\r
                          >\r
                            <path\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"\r
                            />\r
                            <path\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"\r
                            />\r
                          </svg>\r
                        }\r
                      </button>\r
                    </div>\r
                  </div>\r
\r
                  @if (changePasswordError()) {\r
                    <div class="alert alert--error" role="alert">\r
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                        <path\r
                          stroke-linecap="round"\r
                          stroke-linejoin="round"\r
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"\r
                        />\r
                      </svg>\r
                      {{ changePasswordError() | translate }}\r
                    </div>\r
                  }\r
\r
                  <div class="card-actions">\r
                    <button\r
                      class="btn btn-primary"\r
                      (click)="requestPasswordChange()"\r
                      [disabled]="isChangingPassword()"\r
                    >\r
                      @if (isChangingPassword()) {\r
                        <span class="btn-spinner"></span>\r
                      }\r
                      {{ 'profile.security.change_password_btn' | translate }}\r
                    </button>\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
\r
            <div class="content-card content-card--muted">\r
              <div class="card-title-row">\r
                <h2 class="card-title">\r
                  {{ 'profile.security.forgot_password_title' | translate }}\r
                </h2>\r
                <span class="card-badge card-badge--neutral">{{\r
                  'profile.security.no_login_needed' | translate\r
                }}</span>\r
              </div>\r
              <p class="card-description">\r
                {{ 'profile.security.forgot_password_desc_alt' | translate }}\r
              </p>\r
              <div class="card-actions">\r
                <a routerLink="/password-reset-request" class="btn btn-secondary">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"\r
                    />\r
                  </svg>\r
                  {{ 'profile.security.forgot_password_btn' | translate }}\r
                </a>\r
              </div>\r
            </div>\r
          </section>\r
        }\r
\r
        @if (activeSection() === 'orders') {\r
          <section class="content-section" aria-label="{{ 'profile.nav.orders' | translate }}">\r
            <div class="section-header">\r
              <div class="section-header__icon section-header__icon--orange">\r
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"\r
                  />\r
                </svg>\r
              </div>\r
              <div>\r
                <h1 class="section-title">{{ 'profile.nav.orders' | translate }}</h1>\r
                <p class="section-subtitle">{{ 'profile.orders.subtitle' | translate }}</p>\r
              </div>\r
            </div>\r
\r
            <div class="content-card">\r
              <div class="empty-state">\r
                <div class="empty-state__icon">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"\r
                    />\r
                  </svg>\r
                </div>\r
                <h3>{{ 'profile.orders.empty_title' | translate }}</h3>\r
                <p>{{ 'profile.orders.empty_desc' | translate }}</p>\r
                <a routerLink="/products" class="btn btn-primary">\r
                  {{ 'profile.orders.browse_products' | translate }}\r
                </a>\r
              </div>\r
            </div>\r
          </section>\r
        }\r
\r
        @if (activeSection() === 'danger') {\r
          <section class="content-section" aria-label="{{ 'profile.nav.danger' | translate }}">\r
            <div class="section-header">\r
              <div class="section-header__icon section-header__icon--red">\r
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"\r
                  />\r
                </svg>\r
              </div>\r
              <div>\r
                <h1 class="section-title section-title--danger">\r
                  {{ 'profile.nav.danger' | translate }}\r
                </h1>\r
                <p class="section-subtitle">{{ 'profile.danger.subtitle' | translate }}</p>\r
              </div>\r
            </div>\r
\r
            <div class="danger-banner">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"\r
                />\r
              </svg>\r
              <p>{{ 'profile.danger.warning_banner' | translate }}</p>\r
            </div>\r
\r
            <div class="content-card content-card--danger">\r
              <h2 class="card-title card-title--danger">\r
                {{ 'profile.danger.delete_account' | translate }}\r
              </h2>\r
              <p class="card-description">{{ 'profile.danger.delete_desc' | translate }}</p>\r
\r
              @if (!deleteConfirmationSent()) {\r
                <div class="form-stack">\r
                  <div class="form-field">\r
                    <label class="form-label" for="deletePwd">\r
                      {{ 'profile.danger.confirm_password' | translate }}\r
                    </label>\r
                    <div class="input-with-toggle">\r
                      <input\r
                        id="deletePwd"\r
                        [type]="showDeletePassword() ? 'text' : 'password'"\r
                        class="form-input form-input--danger"\r
                        [(ngModel)]="deletePassword"\r
                        name="deletePwd"\r
                        [disabled]="isDeletingAccount()"\r
                        [placeholder]="'profile.danger.password_placeholder' | translate"\r
                        autocomplete="current-password"\r
                      />\r
                      <button\r
                        type="button"\r
                        class="toggle-visibility"\r
                        (click)="togglePasswordVisibility('delete')"\r
                        [attr.aria-label]="\r
                          (showDeletePassword() ? 'common.hide' : 'common.show') | translate\r
                        "\r
                      >\r
                        @if (showDeletePassword()) {\r
                          <svg\r
                            viewBox="0 0 24 24"\r
                            fill="none"\r
                            stroke="currentColor"\r
                            stroke-width="2"\r
                          >\r
                            <path\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"\r
                            />\r
                          </svg>\r
                        } @else {\r
                          <svg\r
                            viewBox="0 0 24 24"\r
                            fill="none"\r
                            stroke="currentColor"\r
                            stroke-width="2"\r
                          >\r
                            <path\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"\r
                            />\r
                            <path\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"\r
                            />\r
                          </svg>\r
                        }\r
                      </button>\r
                    </div>\r
                    <span class="form-hint">{{ 'profile.danger.password_hint' | translate }}</span>\r
                  </div>\r
\r
                  @if (deleteError()) {\r
                    <div class="alert alert--error" role="alert">\r
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                        <path\r
                          stroke-linecap="round"\r
                          stroke-linejoin="round"\r
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"\r
                        />\r
                      </svg>\r
                      {{ deleteError() | translate }}\r
                    </div>\r
                  }\r
\r
                  <div class="card-actions">\r
                    <button\r
                      class="btn btn-danger-solid"\r
                      (click)="requestDeleteAccount()"\r
                      [disabled]="isDeletingAccount()"\r
                    >\r
                      @if (isDeletingAccount()) {\r
                        <span class="btn-spinner btn-spinner--danger"></span>\r
                      }\r
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                        <path\r
                          stroke-linecap="round"\r
                          stroke-linejoin="round"\r
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"\r
                        />\r
                      </svg>\r
                      {{ 'profile.danger.delete_btn' | translate }}\r
                    </button>\r
                  </div>\r
                </div>\r
              } @else {\r
                <div class="delete-sent">\r
                  <div class="delete-sent__icon">\r
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">\r
                      <path\r
                        stroke-linecap="round"\r
                        stroke-linejoin="round"\r
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"\r
                      />\r
                    </svg>\r
                  </div>\r
                  <h3>{{ 'profile.danger.email_sent_title' | translate }}</h3>\r
                  <p>{{ 'profile.danger.email_sent_desc' | translate }}</p>\r
                </div>\r
              }\r
            </div>\r
          </section>\r
        }\r
      </main>\r
    </div>\r
  }\r
</div>\r
`, styles: [`/* src/app/pages/profile/profile.css */
.profile-page {
  min-height: calc(100vh - 140px);
  background: var(--bg-secondary);
}
.auth-gate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  min-height: 60vh;
  padding: var(--space-8);
  text-align: center;
}
.auth-gate__icon {
  width: 80px;
  height: 80px;
  background: var(--bg-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
}
.auth-gate__icon svg {
  width: 40px;
  height: 40px;
  color: var(--text-secondary);
}
.auth-gate h2 {
  font-size: var(--text-xl);
  color: var(--text-primary);
  margin: 0;
}
.profile-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr;
  min-height: calc(100vh - 140px);
  max-width: 1200px;
  margin: 0 auto;
  gap: 0;
}
.mobile-bar {
  display: none;
  grid-column: 1 / -1;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 30;
}
.mobile-menu-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast);
  white-space: nowrap;
}
.mobile-menu-btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.mobile-menu-btn:hover {
  background: var(--bg-tertiary);
}
.mobile-section-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sidebar {
  grid-row: 1 / -1;
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
.sidebar-overlay {
  display: none;
}
.sidebar-profile {
  padding: var(--space-6) var(--space-5) var(--space-5);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background:
    linear-gradient(
      135deg,
      #067a45 0%,
      #048a4f 100%);
}
.sidebar-avatar {
  position: relative;
  flex-shrink: 0;
}
.avatar-initials {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
  display: flex;
}
.sidebar-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid var(--bg-primary);
}
.avatar-status--admin {
  background: #f59e0b;
}
.sidebar-user-info {
  min-width: 0;
  flex: 1;
}
.sidebar-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  margin: 0 0 2px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sidebar-email {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 var(--space-1) 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--space-2);
  border-radius: var(--radius-full, 9999px);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.badge--admin {
  background: rgba(245, 158, 11, 0.2);
  color: var(--color-warning);
  border: 1px solid rgba(245, 158, 11, 0.4);
}
.badge--verified {
  background: rgba(34, 197, 94, 0.15);
  color: var(--text-secondary);
  border: 1px solid rgba(34, 197, 94, 0.3);
}
.badge--unverified {
  background: rgba(156, 163, 175, 0.15);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
.sidebar-nav {
  flex: 1;
  padding: var(--space-3) var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-3);
  border-radius: var(--radius-lg);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
  width: 100%;
  text-decoration: none;
}
.nav-item:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}
.nav-item--active {
  background: var(--color-success-light);
  color: var(--color-success);
  font-weight: 600;
}
.nav-item--active .nav-icon {
  color: var(--color-success);
}
.nav-item--danger {
  color: var(--text-secondary);
}
.nav-item--danger:hover {
  background: var(--color-error-light);
  color: var(--color-error);
}
.nav-item--danger.nav-item--active {
  background: var(--color-error-light);
  color: var(--color-error);
}
.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: inherit;
}
.nav-icon-danger {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: inherit;
}
.nav-icon-danger:hover {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-error-hover);
}
.nav-icon svg {
  width: 20px;
  height: 20px;
}
.nav-label {
  flex: 1;
}
.nav-divider {
  height: 1px;
  background: var(--border-color);
  margin: var(--space-2) 0;
}
.sidebar-logout {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  margin: var(--space-3);
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.sidebar-logout svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.sidebar-logout:hover {
  background: rgba(220, 38, 38, 0.06);
  border-color: var(--color-error);
  color: var(--color-error);
}
.profile-main {
  padding: var(--space-8);
  overflow-y: auto;
  min-width: 0;
}
.content-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  animation: fadeSlideIn 0.25s ease-out;
}
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.section-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
.section-header__icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.section-header__icon svg {
  width: 26px;
  height: 26px;
}
.section-header__icon--green {
  background: rgba(6, 122, 69, 0.12);
  color: var(--color-success);
}
.section-header__icon--blue {
  background: var(--color-info-light);
  color: var(--color-info);
}
.section-header__icon--orange {
  background: rgba(234, 88, 12, 0.1);
  color: var(--color-warning-hover);
}
.section-header__icon--red {
  background: var(--color-error-light);
  color: var(--color-error);
}
.section-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
  line-height: 1.2;
}
.section-title--danger {
  color: var(--color-error);
}
.section-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}
.content-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
.content-card--muted {
  background: var(--bg-secondary);
  border-style: dashed;
}
.content-card--danger {
  border-color: rgba(220, 38, 38, 0.25);
  background: var(--bg-primary);
}
.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-4) 0;
}
.card-title--danger {
  color: var(--color-error);
}
.card-title-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}
.card-title-row .card-title {
  margin: 0;
}
.card-badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 3px var(--space-2);
  border-radius: var(--radius-full);
}
.card-badge--info {
  background: var(--color-info-light);
  color: var(--color-info);
}
.card-badge--neutral {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
.card-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 var(--space-5) 0;
  line-height: 1.6;
}
.card-actions {
  margin-top: var(--space-5);
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.overview-hero {
  background:
    linear-gradient(
      135deg,
      #067a45 0%,
      #04a35e 50%,
      #067a45 100%);
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-8);
  display: flex;
  align-items: center;
  gap: var(--space-6);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(6, 122, 69, 0.3);
}
.overview-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.overview-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.overview-info {
  position: relative;
  z-index: 1;
}
.overview-name {
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 700;
  color: white;
  margin: 0 0 4px 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.overview-email {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 var(--space-2) 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
.stat-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.stat-card__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-card__icon svg {
  width: 24px;
  height: 24px;
}
.stat-card--green .stat-card__icon {
  background: var(--color-success-light);
  color: var(--color-success);
}
.stat-card--blue .stat-card__icon {
  background: var(--color-info-light);
  color: var(--color-info);
}
.stat-card--purple .stat-card__icon {
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
}
.stat-card__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.stat-number {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}
.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.quick-action-btn {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-4);
  border-radius: var(--radius-lg);
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  transition: background var(--transition-fast);
  width: 100%;
  color: var(--text-primary);
}
.quick-action-btn:hover {
  background: var(--bg-secondary);
}
.qa-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.qa-icon svg {
  width: 22px;
  height: 22px;
}
.qa-icon--green {
  background: var(--color-success-light);
  color: var(--color-success);
}
.qa-icon--blue {
  background: var(--color-info-light);
  color: var(--color-info);
}
.qa-icon--orange {
  background: rgba(234, 88, 12, 0.1);
  color: var(--color-warning-hover);
}
.qa-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.qa-text strong {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}
.qa-text small {
  font-size: 0.8rem;
  color: var(--text-secondary);
}
.qa-arrow {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
  flex-shrink: 0;
}
.info-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.info-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: center;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-color);
  gap: var(--space-4);
  flex-wrap: wrap;
}
.info-row:last-child {
  border-bottom: none;
}
.info-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.info-value {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
  word-break: break-word;
}
.info-note {
  grid-column: 2;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-style: italic;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
.form-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.form-label {
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  box-sizing: border-box;
  min-height: 48px;
  font-family: inherit;
}
.form-input:focus {
  outline: none;
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.12);
}
.form-input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background: var(--bg-secondary);
}
.form-input--danger:focus {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px var(--color-error-light);
}
.form-hint {
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.4;
}
.input-with-toggle {
  position: relative;
}
.input-with-toggle .form-input {
  padding-right: 3rem;
}
.toggle-visibility {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--transition-fast);
}
.toggle-visibility svg {
  width: 18px;
  height: 18px;
}
.toggle-visibility:hover {
  color: var(--text-primary);
}
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
}
.alert svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}
.alert--error {
  background: var(--color-error-light);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: var(--color-error);
}
.alert--success {
  background: rgba(6, 122, 69, 0.08);
  border: 1px solid rgba(6, 122, 69, 0.2);
  color: var(--color-success);
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-lg);
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  min-height: 44px;
  font-family: inherit;
}
.btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}
.btn-primary {
  background:
    linear-gradient(
      135deg,
      #067a45,
      #048a4f);
  color: white;
  box-shadow: 0 2px 8px rgba(6, 122, 69, 0.3);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(6, 122, 69, 0.4);
}
.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}
.btn-secondary:hover:not(:disabled) {
  background: var(--bg-tertiary);
  border-color: var(--color-success);
  color: var(--color-success);
  transform: translateY(-1px);
}
.btn-danger-solid {
  background: var(--color-error);
  color: white;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
}
.btn-danger-solid:hover:not(:disabled) {
  background: var(--color-error-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.4);
}
.btn-spinner {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}
.btn-spinner--danger {
  border-color: rgba(255, 255, 255, 0.35);
  border-top-color: white;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.danger-banner {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: rgba(234, 88, 12, 0.07);
  border: 1px solid rgba(234, 88, 12, 0.2);
  border-radius: var(--radius-lg);
  color: var(--color-warning-hover);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.6;
}
.danger-banner svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}
.danger-banner p {
  margin: 0;
}
.delete-sent {
  text-align: center;
  padding: var(--space-8) var(--space-4);
}
.delete-sent__icon {
  width: 72px;
  height: 72px;
  background: var(--color-success-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-5);
}
.delete-sent__icon svg {
  width: 36px;
  height: 36px;
  color: var(--color-success);
}
.delete-sent h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-3) 0;
}
.delete-sent p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}
.empty-state {
  text-align: center;
  padding: var(--space-12) var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}
.empty-state__icon {
  width: 80px;
  height: 80px;
  background: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty-state__icon svg {
  width: 40px;
  height: 40px;
  color: var(--text-secondary);
  opacity: 0.5;
}
.empty-state h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.empty-state p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
  max-width: 320px;
}
.form-input--readonly {
  background-color: var(--color-bg-secondary, #f5f5f5);
  color: var(--color-text-muted, #888);
  cursor: not-allowed;
  opacity: 0.7;
}
.form-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted, #888);
  margin-top: 4px;
}
[data-theme=dark] .sidebar {
  background: #1a1f2e;
  border-color: #2a3040;
}
[data-theme=dark] .sidebar-profile {
  background:
    linear-gradient(
      135deg,
      #054d2d 0%,
      #036637 100%);
}
[data-theme=dark] .content-card {
  background: #1a1f2e;
  border-color: #2a3040;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
[data-theme=dark] .content-card--muted {
  background: #141820;
}
[data-theme=dark] .stat-card {
  background: #1a1f2e;
  border-color: #2a3040;
}
[data-theme=dark] .nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
}
[data-theme=dark] .nav-item--active {
  background: rgba(6, 122, 69, 0.2);
}
[data-theme=dark] .form-input {
  background: #141820;
  border-color: #2a3040;
  color: #f1f5f9;
}
[data-theme=dark] .form-input:focus {
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}
[data-theme=dark] .quick-action-btn:hover {
  background: rgba(255, 255, 255, 0.04);
}
[data-theme=dark] .info-row {
  border-color: #2a3040;
}
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  .profile-layout {
    grid-template-columns: 240px 1fr;
  }
}
@media (max-width: 768px) {
  .profile-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  .mobile-bar {
    display: flex;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform var(--transition-normal);
    box-shadow: var(--shadow-lg);
    grid-row: auto;
  }
  .sidebar--open {
    transform: translateX(0);
  }
  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 199;
  }
  .profile-main {
    padding: var(--space-5) var(--space-4);
  }
  .overview-hero {
    flex-direction: column;
    text-align: center;
    padding: var(--space-6);
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .info-row {
    grid-template-columns: 1fr;
    gap: var(--space-1);
  }
  .info-note {
    grid-column: 1;
  }
}
@media (max-width: 480px) {
  .profile-main {
    padding: var(--space-4) var(--space-3);
  }
  .content-card {
    padding: var(--space-4);
  }
  .section-header {
    gap: var(--space-3);
  }
  .section-header__icon {
    width: 44px;
    height: 44px;
  }
  .section-header__icon svg {
    width: 22px;
    height: 22px;
  }
  .card-title-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .stat-card {
    gap: var(--space-3);
    padding: var(--space-4);
  }
}
@media (prefers-reduced-motion: reduce) {
  .content-section {
    animation: none;
  }
  .sidebar {
    transition: none;
  }
  .stat-card,
  .btn,
  .nav-item,
  .quick-action-btn {
    transition: none;
  }
}
/*# sourceMappingURL=profile.css.map */
`] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Profile, { className: "Profile", filePath: "src/app/pages/profile/profile.ts", lineNumber: 20 });
})();
export {
  Profile
};
//# sourceMappingURL=chunk-HHIZNQYT.js.map
