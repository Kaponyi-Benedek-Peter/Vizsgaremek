import {
  ForumService
} from "./chunk-MQ3N62BI.js";
import {
  ICONS,
  IMAGES
} from "./chunk-KM3DUJ3P.js";
import {
  AuthService
} from "./chunk-ZSAXXJLT.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-UT7KEETW.js";
import "./chunk-NEOTYJOM.js";
import {
  ActivatedRoute,
  RouterLink,
  RouterModule
} from "./chunk-JGUC3CXT.js";
import {
  Component,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WLHV2EEC.js";

// src/app/pages/forum-detail/forum-detail.ts
var _c0 = (a0) => ["/forum", a0];
var _forTrack0 = ($index, $item) => $item.id;
function ForumDetail_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 3);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 1, "common.loading"));
  }
}
function ForumDetail_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "img", 35)(2, "div", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.post().image_url, \u0275\u0275sanitizeUrl)("alt", ctx_r0.post().title);
  }
}
function ForumDetail_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275element(1, "img", 38);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r2 = ctx;
    \u0275\u0275classMap(cat_r2.color_class);
    \u0275\u0275advance();
    \u0275\u0275property("src", cat_r2.icon_src, \u0275\u0275sanitizeUrl)("alt", cat_r2.display_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r2.display_name);
  }
}
function ForumDetail_Conditional_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "button", 39);
    \u0275\u0275listener("click", function ForumDetail_Conditional_2_Conditional_24_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleContent());
    });
    \u0275\u0275elementStart(2, "span", 40);
    \u0275\u0275text(3, "\u2022\u2022\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 1, "forum.read_more"));
  }
}
function ForumDetail_Conditional_2_Conditional_38_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("#", tag_r4.trim());
  }
}
function ForumDetail_Conditional_2_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275repeaterCreate(1, ForumDetail_Conditional_2_Conditional_38_For_2_Template, 2, 1, "span", 41, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.post().tags.split(","));
  }
}
function ForumDetail_Conditional_2_Conditional_44_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "forum.comment_edited"));
  }
}
function ForumDetail_Conditional_2_Conditional_44_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 44)(4, "div", 45)(5, "span", 46);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 47);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "p", 48);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 49)(12, "span", 50);
    \u0275\u0275element(13, "img", 24);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, ForumDetail_Conditional_2_Conditional_44_For_2_Conditional_15_Template, 3, 3, "span", 51);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const comment_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", comment_r5.user_id.charAt(0).toUpperCase(), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("#", comment_r5.user_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(comment_r5.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(comment_r5.content);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r0.ICONS.statLikes, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", comment_r5.likes, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(comment_r5.is_edited ? 15 : -1);
  }
}
function ForumDetail_Conditional_2_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275repeaterCreate(1, ForumDetail_Conditional_2_Conditional_44_For_2_Template, 16, 7, "div", 42, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.comments());
  }
}
function ForumDetail_Conditional_2_Conditional_45_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 55);
  }
}
function ForumDetail_Conditional_2_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "h3", 52);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "textarea", 53);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function ForumDetail_Conditional_2_Conditional_45_Template_textarea_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newComment, $event) || (ctx_r0.newComment = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 54);
    \u0275\u0275listener("click", function ForumDetail_Conditional_2_Conditional_45_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.submitComment());
    });
    \u0275\u0275conditionalCreate(7, ForumDetail_Conditional_2_Conditional_45_Conditional_7_Template, 1, 0, "span", 55);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 6, "forum.write_comment"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newComment);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(5, 8, "forum.comment_placeholder"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.newComment().trim() || ctx_r0.isSubmittingComment());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSubmittingComment() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 10, "forum.submit_comment"), " ");
  }
}
function ForumDetail_Conditional_2_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 56);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "forum.login_to_comment"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 4, "header.login"));
  }
}
function ForumDetail_Conditional_2_Conditional_47_For_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "img", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const related_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", related_r8.image_url, \u0275\u0275sanitizeUrl)("alt", related_r8.title);
  }
}
function ForumDetail_Conditional_2_Conditional_47_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 62);
    \u0275\u0275conditionalCreate(1, ForumDetail_Conditional_2_Conditional_47_For_11_Conditional_1_Template, 2, 2, "div", 64);
    \u0275\u0275elementStart(2, "div", 65)(3, "h3", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 67);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 68)(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const related_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c0, related_r8.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(related_r8.image_url ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(related_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(related_r8.excerpt);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", related_r8.user_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(related_r8.created_at));
  }
}
function ForumDetail_Conditional_2_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 32)(1, "div", 57)(2, "h2", 58);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 59)(6, "button", 60);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275listener("click", function ForumDetail_Conditional_2_Conditional_47_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.sliderPrev());
    });
    \u0275\u0275text(8, " \u2039 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 61);
    \u0275\u0275repeaterCreate(10, ForumDetail_Conditional_2_Conditional_47_For_11_Template, 12, 8, "a", 62, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 63);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275listener("click", function ForumDetail_Conditional_2_Conditional_47_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.sliderNext());
    });
    \u0275\u0275text(14, " \u203A ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 5, "forum.related_posts"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r0.canSliderPrev);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(7, 7, "common.previous"));
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.sliderVisible);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.canSliderNext);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(13, 9, "common.next"));
  }
}
function ForumDetail_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 4);
    \u0275\u0275conditionalCreate(1, ForumDetail_Conditional_2_Conditional_1_Template, 3, 2, "div", 5);
    \u0275\u0275elementStart(2, "div", 6)(3, "header", 7);
    \u0275\u0275conditionalCreate(4, ForumDetail_Conditional_2_Conditional_4_Template, 4, 5, "div", 8);
    \u0275\u0275elementStart(5, "h1", 9);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 10)(8, "div", 11)(9, "div", 12);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 13)(12, "span", 14);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 15)(15, "span", 16);
    \u0275\u0275element(16, "img", 17);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(18, "div", 18)(19, "p", 19);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 20)(22, "p");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(24, ForumDetail_Conditional_2_Conditional_24_Template, 7, 3, "div", 21);
    \u0275\u0275elementStart(25, "div", 22)(26, "div", 23);
    \u0275\u0275element(27, "img", 24);
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 23);
    \u0275\u0275element(31, "img", 24);
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 23);
    \u0275\u0275element(35, "img", 24);
    \u0275\u0275elementStart(36, "span");
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(38, ForumDetail_Conditional_2_Conditional_38_Template, 3, 0, "div", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "section", 26)(40, "div", 27)(41, "h2", 28);
    \u0275\u0275text(42);
    \u0275\u0275pipe(43, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(44, ForumDetail_Conditional_2_Conditional_44_Template, 3, 0, "div", 29);
    \u0275\u0275conditionalCreate(45, ForumDetail_Conditional_2_Conditional_45_Template, 10, 12, "div", 30)(46, ForumDetail_Conditional_2_Conditional_46_Template, 7, 6, "div", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(47, ForumDetail_Conditional_2_Conditional_47_Template, 15, 11, "section", 32);
    \u0275\u0275elementStart(48, "div", 33)(49, "a", 34);
    \u0275\u0275text(50);
    \u0275\u0275pipe(51, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.post().image_url ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_2_0 = ctx_r0.getCategoryInfo(ctx_r0.post().category_id)) ? 4 : -1, tmp_2_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.post().title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.post().user_id.charAt(0).toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", ctx_r0.post().user_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r0.ICONS.forumDate, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(ctx_r0.post().created_at), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("collapsed", !ctx_r0.contentExpanded());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.post().excerpt);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.post().content);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.contentExpanded() ? 24 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r0.ICONS.statViews, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.post().views);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r0.ICONS.statLikes, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.post().likes);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r0.ICONS.statComments, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.comments().length);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.post().tags ? 38 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(43, 25, "forum.comments"), " (", ctx_r0.comments().length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.comments().length > 0 ? 44 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isAuthenticated() ? 45 : 46);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.relatedPosts().length > 0 ? 47 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u2190 ", \u0275\u0275pipeBind1(51, 27, "forum.back_to_forum"), " ");
  }
}
function ForumDetail_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 34);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "forum.post_not_found"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u2190 ", \u0275\u0275pipeBind1(6, 4, "forum.back_to_forum"));
  }
}
var ForumDetail = class _ForumDetail {
  route = inject(ActivatedRoute);
  forumService = inject(ForumService);
  authService = inject(AuthService);
  translate = inject(TranslateService);
  post = signal(null, ...ngDevMode ? [{ debugName: "post" }] : []);
  relatedPosts = signal([], ...ngDevMode ? [{ debugName: "relatedPosts" }] : []);
  comments = signal([], ...ngDevMode ? [{ debugName: "comments" }] : []);
  isLoading = signal(true, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  contentExpanded = signal(false, ...ngDevMode ? [{ debugName: "contentExpanded" }] : []);
  newComment = signal("", ...ngDevMode ? [{ debugName: "newComment" }] : []);
  isSubmittingComment = signal(false, ...ngDevMode ? [{ debugName: "isSubmittingComment" }] : []);
  sliderIndex = signal(0, ...ngDevMode ? [{ debugName: "sliderIndex" }] : []);
  ICONS = ICONS;
  IMAGES = IMAGES;
  isAuthenticated = this.authService.isAuthenticated;
  get sessionToken() {
    return this.authService.sessionToken() ?? "";
  }
  categories = computed(() => this.forumService.categories(), ...ngDevMode ? [{ debugName: "categories" }] : []);
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id)
        this.loadPost(id);
    });
  }
  loadPost(id) {
    this.isLoading.set(true);
    this.contentExpanded.set(false);
    this.sliderIndex.set(0);
    this.comments.set([]);
    const userId = this.authService.currentUser()?.id ?? "";
    const sessToken = this.sessionToken;
    const isAdmin = this.authService.isAdmin();
    this.forumService.getPostById(id, isAdmin, isAdmin ? userId : "", isAdmin ? sessToken : "").subscribe((post) => {
      this.post.set(post);
      this.isLoading.set(false);
      if (post) {
        if (this.authService.isAuthenticated()) {
          this.forumService.incrementViews(post.id, userId, sessToken).subscribe();
        }
        this.forumService.getComments(post.id).subscribe((comments) => {
          this.comments.set(comments);
        });
        this.forumService.getRelatedPosts(post.id, 6).subscribe((related) => {
          this.relatedPosts.set(related);
        });
      }
    });
  }
  getCategoryInfo(categoryId) {
    return this.categories().find((c) => c.id === categoryId);
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "";
    return new Intl.DateTimeFormat(this.translate.currentLang || "hu", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(dateStr));
  }
  toggleContent() {
    this.contentExpanded.update((v) => !v);
  }
  submitComment() {
    const text = this.newComment().trim();
    const post = this.post();
    if (!text || !this.isAuthenticated() || !post || !this.sessionToken)
      return;
    this.isSubmittingComment.set(true);
    setTimeout(() => {
      this.newComment.set("");
      this.isSubmittingComment.set(false);
    }, 400);
  }
  get sliderVisible() {
    return this.relatedPosts().slice(this.sliderIndex(), this.sliderIndex() + 3);
  }
  sliderPrev() {
    this.sliderIndex.update((i) => Math.max(0, i - 1));
  }
  sliderNext() {
    this.sliderIndex.update((i) => Math.min(this.relatedPosts().length - 3, i + 1));
  }
  get canSliderPrev() {
    return this.sliderIndex() > 0;
  }
  get canSliderNext() {
    return this.sliderIndex() + 3 < this.relatedPosts().length;
  }
  static \u0275fac = function ForumDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ForumDetail)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForumDetail, selectors: [["app-forum-detail"]], decls: 4, vars: 3, consts: [[1, "forum-detail-page"], [1, "loading-container"], [1, "not-found"], [1, "spinner"], [1, "article"], [1, "article-hero"], [1, "article-container"], [1, "article-header"], [1, "article-category", 3, "class"], [1, "article-title"], [1, "article-meta"], [1, "meta-author"], [1, "author-avatar-placeholder"], [1, "author-info"], [1, "author-name"], [1, "meta-details"], [1, "meta-date"], ["alt", "", "aria-hidden", "true", 1, "meta-icon", 3, "src"], [1, "article-body"], [1, "article-excerpt"], [1, "article-content"], [1, "read-more-section"], [1, "article-stats"], [1, "stat"], ["alt", "", "aria-hidden", "true", 1, "stat-icon-img", 3, "src"], [1, "article-tags"], [1, "comments-section"], [1, "comments-container"], [1, "comments-title"], [1, "comments-list"], [1, "new-comment"], [1, "login-to-comment"], [1, "related-section"], [1, "back-section"], ["routerLink", "/forum", 1, "back-link"], [1, "hero-image", 3, "src", "alt"], [1, "hero-overlay"], [1, "article-category"], [1, "category-icon-img", 3, "src", "alt"], [1, "read-more-btn", 3, "click"], [1, "dots"], [1, "tag"], [1, "comment"], [1, "comment-avatar-placeholder"], [1, "comment-body"], [1, "comment-header"], [1, "comment-author"], [1, "comment-date"], [1, "comment-content"], [1, "comment-footer"], [1, "comment-likes"], [1, "comment-edited"], [1, "new-comment-title"], ["rows", "4", 1, "comment-input", 3, "ngModelChange", "ngModel", "placeholder"], [1, "submit-comment-btn", 3, "click", "disabled"], [1, "btn-spinner"], ["routerLink", "/login", 1, "login-link"], [1, "related-container"], [1, "related-title"], [1, "slider-wrapper"], [1, "slider-btn", "slider-btn-prev", 3, "click", "disabled"], [1, "slider-track"], [1, "related-card", 3, "routerLink"], [1, "slider-btn", "slider-btn-next", 3, "click", "disabled"], [1, "related-image"], [1, "related-info"], [1, "related-post-title"], [1, "related-excerpt"], [1, "related-meta"], ["loading", "lazy", 3, "src", "alt"]], template: function ForumDetail_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ForumDetail_Conditional_1_Template, 5, 3, "div", 1);
      \u0275\u0275conditionalCreate(2, ForumDetail_Conditional_2_Template, 52, 29);
      \u0275\u0275conditionalCreate(3, ForumDetail_Conditional_3_Template, 7, 6, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading() && ctx.post() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading() && !ctx.post() ? 3 : -1);
    }
  }, dependencies: [RouterModule, RouterLink, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, TranslateModule, TranslatePipe], styles: ['\n\n.forum-detail-page[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100vh;\n  background: var(--color-background);\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  gap: 1rem;\n  color: var(--text-secondary);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid var(--border-color);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.article-hero[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 360px;\n  overflow: hidden;\n}\n.hero-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.hero-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      to bottom,\n      transparent 40%,\n      rgba(0, 0, 0, 0.4) 100%);\n}\n.article-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: var(--space-8) var(--space-6);\n}\n.article-header[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-8);\n}\n.article-category[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 14px;\n  border-radius: 20px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  margin-bottom: var(--space-4);\n  background: var(--color-success-light);\n  color: var(--color-primary);\n}\n.article-title[_ngcontent-%COMP%] {\n  font-size: clamp(1.5rem, 4vw, 2.25rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.3;\n  margin: 0 0 var(--space-5);\n}\n.article-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: var(--space-4);\n  padding-bottom: var(--space-5);\n  border-bottom: 1px solid var(--border-color);\n}\n.meta-author[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.author-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid var(--color-primary);\n}\n.author-avatar-placeholder[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.1rem;\n  flex-shrink: 0;\n}\n.author-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.author-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-primary);\n  font-size: 0.95rem;\n}\n.verified-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  font-size: 10px;\n  margin-left: 4px;\n}\n.author-role[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n}\n.meta-details[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-4);\n  font-size: 0.85rem;\n  color: var(--text-secondary);\n}\n.article-body[_ngcontent-%COMP%] {\n  position: relative;\n}\n.article-body.collapsed[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow: hidden;\n}\n.article-body.collapsed[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 120px;\n  background:\n    linear-gradient(\n      to bottom,\n      transparent,\n      var(--color-background));\n  pointer-events: none;\n}\n.article-excerpt[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  line-height: 1.7;\n  color: var(--text-primary);\n  font-weight: 500;\n  margin-bottom: var(--space-5);\n}\n.article-content[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.8;\n  color: var(--text-secondary);\n}\n.article-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-4);\n}\n.read-more-section[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--space-6) 0;\n}\n.read-more-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: 1px solid var(--border-color);\n  padding: var(--space-3) var(--space-6);\n  border-radius: var(--radius-lg, 12px);\n  cursor: pointer;\n  color: var(--color-primary);\n  font-weight: 600;\n  font-size: 0.95rem;\n  transition: all 0.2s ease;\n}\n.read-more-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(6, 122, 69, 0.06);\n  border-color: var(--color-primary);\n}\n.read-more-btn[_ngcontent-%COMP%]   .dots[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  letter-spacing: 4px;\n  line-height: 1;\n}\n.article-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-6);\n  padding: var(--space-5) 0;\n  border-top: 1px solid var(--border-color);\n  border-bottom: 1px solid var(--border-color);\n  margin: var(--space-6) 0;\n}\n.stat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.95rem;\n  color: var(--text-secondary);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.article-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: var(--space-6);\n}\n.tag[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n  font-weight: 500;\n}\n.comments-section[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border-color);\n  background: var(--color-surface-elevated, var(--color-background));\n  padding: var(--space-10) 0;\n}\n.comments-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 0 var(--space-6);\n}\n.comments-title[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 var(--space-6);\n}\n.comments-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n  margin-bottom: var(--space-8);\n}\n.comment[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-4);\n}\n.comment-avatar-placeholder[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.comment-body[_ngcontent-%COMP%] {\n  flex: 1;\n  background: var(--color-surface);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 12px);\n  padding: var(--space-4);\n}\n.comment-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  margin-bottom: var(--space-2);\n  flex-wrap: wrap;\n}\n.comment-author[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-primary);\n  font-size: 0.9rem;\n}\n.comment-date[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--text-secondary);\n  margin-left: auto;\n}\n.comment-content[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: var(--text-primary);\n  line-height: 1.6;\n  margin: 0 0 var(--space-3);\n}\n.comment-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n}\n.comment-likes[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.comment-edited[_ngcontent-%COMP%] {\n  font-style: italic;\n}\n.new-comment[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border-color);\n  padding-top: var(--space-6);\n}\n.new-comment-title[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0 0 var(--space-4);\n}\n.comment-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-lg, 12px);\n  font-size: 0.95rem;\n  background: var(--color-surface);\n  color: var(--text-primary);\n  resize: vertical;\n  transition: border-color 0.2s ease;\n  box-sizing: border-box;\n  font-family: inherit;\n}\n.comment-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n}\n.submit-comment-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  margin-top: var(--space-3);\n  padding: var(--space-3) var(--space-6);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-md, 8px);\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-height: 44px;\n}\n.submit-comment-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-primary-dark);\n  transform: translateY(-1px);\n}\n.submit-comment-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n.login-to-comment[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border-color);\n  padding-top: var(--space-6);\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  color: var(--text-secondary);\n  font-size: 0.95rem;\n}\n.login-link[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.login-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.related-section[_ngcontent-%COMP%] {\n  background: var(--color-surface-elevated, var(--color-background));\n  padding: var(--space-10) 0;\n  border-top: 1px solid var(--border-color);\n}\n.related-container[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 var(--space-6);\n}\n.related-title[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: var(--space-6);\n  text-align: center;\n}\n.slider-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.slider-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  border: 2px solid var(--color-border);\n  background: var(--color-surface);\n  color: var(--text-primary);\n  font-size: 1.5rem;\n  font-weight: 700;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  line-height: 1;\n}\n.slider-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.slider-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.3;\n  cursor: not-allowed;\n}\n.slider-track[_ngcontent-%COMP%] {\n  flex: 1;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-4);\n  overflow: hidden;\n}\n.related-card[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 12px);\n  overflow: hidden;\n  text-decoration: none;\n  color: inherit;\n  transition: all 0.25s ease;\n  display: flex;\n  flex-direction: column;\n}\n.related-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n  border-color: var(--color-primary);\n}\n.related-image[_ngcontent-%COMP%] {\n  height: 140px;\n  overflow: hidden;\n}\n.related-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.related-card[_ngcontent-%COMP%]:hover   .related-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.related-info[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  flex: 1;\n}\n.related-post-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  line-height: 1.4;\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.related-excerpt[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--text-secondary);\n  line-height: 1.5;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  margin: 0;\n}\n.related-meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.75rem;\n  color: var(--text-tertiary);\n  margin-top: auto;\n  padding-top: 8px;\n  border-top: 1px solid var(--border-color);\n}\n.back-section[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: var(--space-6);\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: 600;\n  font-size: 0.95rem;\n  transition: opacity 0.2s;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.7;\n}\n.not-found[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  gap: var(--space-4);\n  color: var(--text-secondary);\n}\n@media (max-width: 768px) {\n  .article-hero[_ngcontent-%COMP%] {\n    height: 240px;\n  }\n  .article-container[_ngcontent-%COMP%] {\n    padding: var(--space-5) var(--space-4);\n  }\n  .article-meta[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .meta-details[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .article-stats[_ngcontent-%COMP%] {\n    gap: var(--space-4);\n  }\n  .comments-container[_ngcontent-%COMP%] {\n    padding: 0 var(--space-4);\n  }\n  .related-container[_ngcontent-%COMP%] {\n    padding: 0 var(--space-3);\n  }\n  .slider-track[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .slider-btn[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .slider-wrapper[_ngcontent-%COMP%] {\n    gap: 0;\n  }\n}\n@media (max-width: 480px) {\n  .article-hero[_ngcontent-%COMP%] {\n    height: 200px;\n  }\n  .article-title[_ngcontent-%COMP%] {\n    font-size: 1.3rem;\n  }\n  .article-excerpt[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .login-to-comment[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner[_ngcontent-%COMP%], \n   .btn-spinner[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .related-card[_ngcontent-%COMP%], \n   .related-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=forum-detail.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ForumDetail, [{
    type: Component,
    args: [{ selector: "app-forum-detail", standalone: true, imports: [RouterModule, FormsModule, TranslateModule], template: `<div class="forum-detail-page">\r
  @if (isLoading()) {\r
    <div class="loading-container">\r
      <div class="spinner"></div>\r
      <p>{{ 'common.loading' | translate }}</p>\r
    </div>\r
  }\r
\r
  @if (!isLoading() && post()) {\r
    <article class="article">\r
      @if (post()!.image_url) {\r
        <div class="article-hero">\r
          <img [src]="post()!.image_url" [alt]="post()!.title" class="hero-image" />\r
          <div class="hero-overlay"></div>\r
        </div>\r
      }\r
\r
      <div class="article-container">\r
        <header class="article-header">\r
          <!-- category \u2192 category_id -->\r
          @if (getCategoryInfo(post()!.category_id); as cat) {\r
            <div class="article-category" [class]="cat.color_class">\r
              <img [src]="cat.icon_src" [alt]="cat.display_name" class="category-icon-img" />\r
              <span>{{ cat.display_name }}</span>\r
            </div>\r
          }\r
\r
          <h1 class="article-title">{{ post()!.title }}</h1>\r
\r
          <div class="article-meta">\r
            <div class="meta-author">\r
              <!-- author_name/author_role nincs a DB-ben \u2014 user_id alapj\xE1n -->\r
              <div class="author-avatar-placeholder">\r
                {{ post()!.user_id.charAt(0).toUpperCase() }}\r
              </div>\r
              <div class="author-info">\r
                <span class="author-name">#{{ post()!.user_id }}</span>\r
              </div>\r
            </div>\r
\r
            <div class="meta-details">\r
              <span class="meta-date">\r
                <img [src]="ICONS.forumDate" alt="" class="meta-icon" aria-hidden="true" />\r
                {{ formatDate(post()!.created_at) }}\r
              </span>\r
            </div>\r
          </div>\r
        </header>\r
\r
        <div class="article-body" [class.collapsed]="!contentExpanded()">\r
          <p class="article-excerpt">{{ post()!.excerpt }}</p>\r
          <div class="article-content">\r
            <p>{{ post()!.content }}</p>\r
          </div>\r
        </div>\r
\r
        @if (!contentExpanded()) {\r
          <div class="read-more-section">\r
            <button class="read-more-btn" (click)="toggleContent()">\r
              <span class="dots">\u2022\u2022\u2022</span>\r
              <span>{{ 'forum.read_more' | translate }}</span>\r
            </button>\r
          </div>\r
        }\r
\r
        <div class="article-stats">\r
          <div class="stat">\r
            <img [src]="ICONS.statViews" alt="" class="stat-icon-img" aria-hidden="true" />\r
            <span>{{ post()!.views }}</span>\r
          </div>\r
          <div class="stat">\r
            <img [src]="ICONS.statLikes" alt="" class="stat-icon-img" aria-hidden="true" />\r
            <span>{{ post()!.likes }}</span>\r
          </div>\r
          <div class="stat">\r
            <img [src]="ICONS.statComments" alt="" class="stat-icon-img" aria-hidden="true" />\r
            <span>{{ comments().length }}</span>\r
          </div>\r
        </div>\r
\r
        @if (post()!.tags) {\r
          <div class="article-tags">\r
            @for (tag of post()!.tags.split(','); track tag) {\r
              <span class="tag">#{{ tag.trim() }}</span>\r
            }\r
          </div>\r
        }\r
      </div>\r
    </article>\r
\r
    <section class="comments-section">\r
      <div class="comments-container">\r
        <h2 class="comments-title">{{ 'forum.comments' | translate }} ({{ comments().length }})</h2>\r
\r
        @if (comments().length > 0) {\r
          <div class="comments-list">\r
            @for (comment of comments(); track comment.id) {\r
              <div class="comment">\r
                <!-- author_name nincs a DB-ben \u2014 user_id alapj\xE1n -->\r
                <div class="comment-avatar-placeholder">\r
                  {{ comment.user_id.charAt(0).toUpperCase() }}\r
                </div>\r
                <div class="comment-body">\r
                  <div class="comment-header">\r
                    <span class="comment-author">#{{ comment.user_id }}</span>\r
                    <span class="comment-date">{{ formatDate(comment.created_at) }}</span>\r
                  </div>\r
                  <p class="comment-content">{{ comment.content }}</p>\r
                  <div class="comment-footer">\r
                    <span class="comment-likes">\r
                      <img\r
                        [src]="ICONS.statLikes"\r
                        alt=""\r
                        class="stat-icon-img"\r
                        aria-hidden="true"\r
                      />\r
                      {{ comment.likes }}\r
                    </span>\r
                    @if (comment.is_edited) {\r
                      <span class="comment-edited">{{ 'forum.comment_edited' | translate }}</span>\r
                    }\r
                  </div>\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        }\r
\r
        @if (isAuthenticated()) {\r
          <div class="new-comment">\r
            <h3 class="new-comment-title">{{ 'forum.write_comment' | translate }}</h3>\r
            <textarea\r
              class="comment-input"\r
              [(ngModel)]="newComment"\r
              [placeholder]="'forum.comment_placeholder' | translate"\r
              rows="4"\r
            ></textarea>\r
            <button\r
              class="submit-comment-btn"\r
              (click)="submitComment()"\r
              [disabled]="!newComment().trim() || isSubmittingComment()"\r
            >\r
              @if (isSubmittingComment()) {\r
                <span class="btn-spinner"></span>\r
              }\r
              {{ 'forum.submit_comment' | translate }}\r
            </button>\r
          </div>\r
        } @else {\r
          <div class="login-to-comment">\r
            <p>{{ 'forum.login_to_comment' | translate }}</p>\r
            <a routerLink="/login" class="login-link">{{ 'header.login' | translate }}</a>\r
          </div>\r
        }\r
      </div>\r
    </section>\r
\r
    @if (relatedPosts().length > 0) {\r
      <section class="related-section">\r
        <div class="related-container">\r
          <h2 class="related-title">{{ 'forum.related_posts' | translate }}</h2>\r
          <div class="slider-wrapper">\r
            <button\r
              class="slider-btn slider-btn-prev"\r
              (click)="sliderPrev()"\r
              [disabled]="!canSliderPrev"\r
              [attr.aria-label]="'common.previous' | translate"\r
            >\r
              \u2039\r
            </button>\r
\r
            <div class="slider-track">\r
              @for (related of sliderVisible; track related.id) {\r
                <a class="related-card" [routerLink]="['/forum', related.id]">\r
                  @if (related.image_url) {\r
                    <div class="related-image">\r
                      <img [src]="related.image_url" [alt]="related.title" loading="lazy" />\r
                    </div>\r
                  }\r
                  <div class="related-info">\r
                    <h3 class="related-post-title">{{ related.title }}</h3>\r
                    <p class="related-excerpt">{{ related.excerpt }}</p>\r
                    <!-- author_name nincs a DB-ben \u2014 user_id alapj\xE1n -->\r
                    <div class="related-meta">\r
                      <span>#{{ related.user_id }}</span>\r
                      <span>{{ formatDate(related.created_at) }}</span>\r
                    </div>\r
                  </div>\r
                </a>\r
              }\r
            </div>\r
\r
            <button\r
              class="slider-btn slider-btn-next"\r
              (click)="sliderNext()"\r
              [disabled]="!canSliderNext"\r
              [attr.aria-label]="'common.next' | translate"\r
            >\r
              \u203A\r
            </button>\r
          </div>\r
        </div>\r
      </section>\r
    }\r
\r
    <div class="back-section">\r
      <a routerLink="/forum" class="back-link"> \u2190 {{ 'forum.back_to_forum' | translate }} </a>\r
    </div>\r
  }\r
\r
  @if (!isLoading() && !post()) {\r
    <div class="not-found">\r
      <h2>{{ 'forum.post_not_found' | translate }}</h2>\r
      <a routerLink="/forum" class="back-link">\u2190 {{ 'forum.back_to_forum' | translate }}</a>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/forum-detail/forum-detail.css */\n.forum-detail-page {\n  width: 100%;\n  min-height: 100vh;\n  background: var(--color-background);\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  gap: 1rem;\n  color: var(--text-secondary);\n}\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 3px solid var(--border-color);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.article-hero {\n  position: relative;\n  width: 100%;\n  height: 360px;\n  overflow: hidden;\n}\n.hero-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.hero-overlay {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      to bottom,\n      transparent 40%,\n      rgba(0, 0, 0, 0.4) 100%);\n}\n.article-container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: var(--space-8) var(--space-6);\n}\n.article-header {\n  margin-bottom: var(--space-8);\n}\n.article-category {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 14px;\n  border-radius: 20px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  margin-bottom: var(--space-4);\n  background: var(--color-success-light);\n  color: var(--color-primary);\n}\n.article-title {\n  font-size: clamp(1.5rem, 4vw, 2.25rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.3;\n  margin: 0 0 var(--space-5);\n}\n.article-meta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: var(--space-4);\n  padding-bottom: var(--space-5);\n  border-bottom: 1px solid var(--border-color);\n}\n.meta-author {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.author-avatar {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid var(--color-primary);\n}\n.author-avatar-placeholder {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1.1rem;\n  flex-shrink: 0;\n}\n.author-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.author-name {\n  font-weight: 600;\n  color: var(--text-primary);\n  font-size: 0.95rem;\n}\n.verified-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  font-size: 10px;\n  margin-left: 4px;\n}\n.author-role {\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n}\n.meta-details {\n  display: flex;\n  gap: var(--space-4);\n  font-size: 0.85rem;\n  color: var(--text-secondary);\n}\n.article-body {\n  position: relative;\n}\n.article-body.collapsed {\n  max-height: 300px;\n  overflow: hidden;\n}\n.article-body.collapsed::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 120px;\n  background:\n    linear-gradient(\n      to bottom,\n      transparent,\n      var(--color-background));\n  pointer-events: none;\n}\n.article-excerpt {\n  font-size: 1.15rem;\n  line-height: 1.7;\n  color: var(--text-primary);\n  font-weight: 500;\n  margin-bottom: var(--space-5);\n}\n.article-content {\n  font-size: 1rem;\n  line-height: 1.8;\n  color: var(--text-secondary);\n}\n.article-content p {\n  margin-bottom: var(--space-4);\n}\n.read-more-section {\n  text-align: center;\n  padding: var(--space-6) 0;\n}\n.read-more-btn {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: 1px solid var(--border-color);\n  padding: var(--space-3) var(--space-6);\n  border-radius: var(--radius-lg, 12px);\n  cursor: pointer;\n  color: var(--color-primary);\n  font-weight: 600;\n  font-size: 0.95rem;\n  transition: all 0.2s ease;\n}\n.read-more-btn:hover {\n  background: rgba(6, 122, 69, 0.06);\n  border-color: var(--color-primary);\n}\n.read-more-btn .dots {\n  font-size: 1.5rem;\n  letter-spacing: 4px;\n  line-height: 1;\n}\n.article-stats {\n  display: flex;\n  gap: var(--space-6);\n  padding: var(--space-5) 0;\n  border-top: 1px solid var(--border-color);\n  border-bottom: 1px solid var(--border-color);\n  margin: var(--space-6) 0;\n}\n.stat {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.95rem;\n  color: var(--text-secondary);\n}\n.stat-icon {\n  font-size: 1.1rem;\n}\n.article-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: var(--space-6);\n}\n.tag {\n  padding: 4px 12px;\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n  font-weight: 500;\n}\n.comments-section {\n  border-top: 1px solid var(--border-color);\n  background: var(--color-surface-elevated, var(--color-background));\n  padding: var(--space-10) 0;\n}\n.comments-container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 0 var(--space-6);\n}\n.comments-title {\n  font-size: 1.3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 var(--space-6);\n}\n.comments-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n  margin-bottom: var(--space-8);\n}\n.comment {\n  display: flex;\n  gap: var(--space-4);\n}\n.comment-avatar-placeholder {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.comment-body {\n  flex: 1;\n  background: var(--color-surface);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 12px);\n  padding: var(--space-4);\n}\n.comment-header {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  margin-bottom: var(--space-2);\n  flex-wrap: wrap;\n}\n.comment-author {\n  font-weight: 600;\n  color: var(--text-primary);\n  font-size: 0.9rem;\n}\n.comment-date {\n  font-size: 0.78rem;\n  color: var(--text-secondary);\n  margin-left: auto;\n}\n.comment-content {\n  font-size: 0.95rem;\n  color: var(--text-primary);\n  line-height: 1.6;\n  margin: 0 0 var(--space-3);\n}\n.comment-footer {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n}\n.comment-likes {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.comment-edited {\n  font-style: italic;\n}\n.new-comment {\n  border-top: 1px solid var(--border-color);\n  padding-top: var(--space-6);\n}\n.new-comment-title {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0 0 var(--space-4);\n}\n.comment-input {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-lg, 12px);\n  font-size: 0.95rem;\n  background: var(--color-surface);\n  color: var(--text-primary);\n  resize: vertical;\n  transition: border-color 0.2s ease;\n  box-sizing: border-box;\n  font-family: inherit;\n}\n.comment-input:focus {\n  outline: none;\n  border-color: var(--color-primary);\n}\n.submit-comment-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  margin-top: var(--space-3);\n  padding: var(--space-3) var(--space-6);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-md, 8px);\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-height: 44px;\n}\n.submit-comment-btn:hover:not(:disabled) {\n  background: var(--color-primary-dark);\n  transform: translateY(-1px);\n}\n.submit-comment-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-spinner {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n.login-to-comment {\n  border-top: 1px solid var(--border-color);\n  padding-top: var(--space-6);\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  color: var(--text-secondary);\n  font-size: 0.95rem;\n}\n.login-link {\n  color: var(--color-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.login-link:hover {\n  text-decoration: underline;\n}\n.related-section {\n  background: var(--color-surface-elevated, var(--color-background));\n  padding: var(--space-10) 0;\n  border-top: 1px solid var(--border-color);\n}\n.related-container {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 var(--space-6);\n}\n.related-title {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: var(--space-6);\n  text-align: center;\n}\n.slider-wrapper {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.slider-btn {\n  flex-shrink: 0;\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  border: 2px solid var(--color-border);\n  background: var(--color-surface);\n  color: var(--text-primary);\n  font-size: 1.5rem;\n  font-weight: 700;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  line-height: 1;\n}\n.slider-btn:hover:not(:disabled) {\n  background: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.slider-btn:disabled {\n  opacity: 0.3;\n  cursor: not-allowed;\n}\n.slider-track {\n  flex: 1;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-4);\n  overflow: hidden;\n}\n.related-card {\n  background: var(--color-surface);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 12px);\n  overflow: hidden;\n  text-decoration: none;\n  color: inherit;\n  transition: all 0.25s ease;\n  display: flex;\n  flex-direction: column;\n}\n.related-card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n  border-color: var(--color-primary);\n}\n.related-image {\n  height: 140px;\n  overflow: hidden;\n}\n.related-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.related-card:hover .related-image img {\n  transform: scale(1.05);\n}\n.related-info {\n  padding: var(--space-4);\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  flex: 1;\n}\n.related-post-title {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  line-height: 1.4;\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.related-excerpt {\n  font-size: 0.82rem;\n  color: var(--text-secondary);\n  line-height: 1.5;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  margin: 0;\n}\n.related-meta {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.75rem;\n  color: var(--text-tertiary);\n  margin-top: auto;\n  padding-top: 8px;\n  border-top: 1px solid var(--border-color);\n}\n.back-section {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: var(--space-6);\n}\n.back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: 600;\n  font-size: 0.95rem;\n  transition: opacity 0.2s;\n}\n.back-link:hover {\n  opacity: 0.7;\n}\n.not-found {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  gap: var(--space-4);\n  color: var(--text-secondary);\n}\n@media (max-width: 768px) {\n  .article-hero {\n    height: 240px;\n  }\n  .article-container {\n    padding: var(--space-5) var(--space-4);\n  }\n  .article-meta {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .meta-details {\n    flex-wrap: wrap;\n  }\n  .article-stats {\n    gap: var(--space-4);\n  }\n  .comments-container {\n    padding: 0 var(--space-4);\n  }\n  .related-container {\n    padding: 0 var(--space-3);\n  }\n  .slider-track {\n    grid-template-columns: 1fr;\n  }\n  .slider-btn {\n    display: none;\n  }\n  .slider-wrapper {\n    gap: 0;\n  }\n}\n@media (max-width: 480px) {\n  .article-hero {\n    height: 200px;\n  }\n  .article-title {\n    font-size: 1.3rem;\n  }\n  .article-excerpt {\n    font-size: 1rem;\n  }\n  .login-to-comment {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner,\n  .btn-spinner {\n    animation: none;\n  }\n  .related-card,\n  .related-image img {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=forum-detail.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForumDetail, { className: "ForumDetail", filePath: "src/app/pages/forum-detail/forum-detail.ts", lineNumber: 19 });
})();
export {
  ForumDetail
};
//# sourceMappingURL=chunk-TYBSPWK6.js.map
