import {
  ForumService
} from "./chunk-IJ6OFOVF.js";
import {
  ICONS,
  IMAGES
} from "./chunk-B4AVD7OH.js";
import {
  AuthService
} from "./chunk-NOGI6VVO.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-646OUKHF.js";
import "./chunk-NEOTYJOM.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-YSEAUUG4.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WLHV2EEC.js";

// src/app/shared/components/post-card/post-card.ts
var _c0 = (a0) => ["/forum", a0];
function PostCardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "img", 13);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.ICONS.badgeFeatured, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "forum.featured"));
  }
}
function PostCardComponent_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "img", 17);
    \u0275\u0275elementStart(2, "span", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.categoryInfo.color_class);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.categoryInfo.icon_src, \u0275\u0275sanitizeUrl)("alt", ctx_r0.categoryInfo.display_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.categoryInfo.display_name);
  }
}
function PostCardComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "img", 14);
    \u0275\u0275conditionalCreate(2, PostCardComponent_Conditional_2_Conditional_2_Template, 4, 5, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.post.image_url, \u0275\u0275sanitizeUrl)("alt", ctx_r0.post.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showCategory && ctx_r0.categoryInfo ? 2 : -1);
  }
}
function PostCardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "img", 17);
    \u0275\u0275elementStart(2, "span", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.categoryInfo.color_class);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.categoryInfo.icon_src, \u0275\u0275sanitizeUrl)("alt", ctx_r0.categoryInfo.display_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.categoryInfo.display_name);
  }
}
function PostCardComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.post.excerpt);
  }
}
function PostCardComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 20)(2, "div", 21);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 22)(5, "span", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.post.user_id.charAt(0).toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", ctx_r0.post.user_id);
  }
}
function PostCardComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 24);
    \u0275\u0275element(2, "img", 25);
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 24);
    \u0275\u0275element(6, "img", 25);
    \u0275\u0275elementStart(7, "span", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 24);
    \u0275\u0275element(10, "img", 25);
    \u0275\u0275elementStart(11, "span", 26);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r0.ICONS.statViews, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.post.views);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r0.ICONS.statLikes, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.post.likes);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r0.ICONS.statComments, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.post.comment_count);
  }
}
function PostCardComponent_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("#", tag_r2.trim());
  }
}
function PostCardComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, PostCardComponent_Conditional_14_For_2_Template, 2, 1, "span", 27, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.post.tags.split(",").slice(0, 3));
  }
}
var PostCardComponent = class _PostCardComponent {
  post;
  showExcerpt = true;
  showImage = true;
  showCategory = true;
  showAuthor = true;
  showStats = true;
  compactMode = false;
  cardClick = new EventEmitter();
  ICONS = ICONS;
  translateService = inject(TranslateService);
  forumService = inject(ForumService);
  get categoryInfo() {
    return this.forumService.categories().find((cat) => cat.id === this.post.category_id);
  }
  // author_role nincs a DB-ben — user_id alapján nem tudunk szerepet meghatározni,
  // a badge-et a backend oldal bővítésekor lehet majd visszahozni
  get authorBadgeClass() {
    return "badge-user";
  }
  getRelativeTime() {
    const now = /* @__PURE__ */ new Date();
    const postDate = new Date(this.post.created_at);
    const diffMs = now.getTime() - postDate.getTime();
    const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1e3 * 60));
        return this.translateService.instant("time.minutes_ago", { count: diffMinutes });
      }
      return this.translateService.instant("time.hours_ago", { count: diffHours });
    } else if (diffDays === 1) {
      return this.translateService.instant("time.yesterday");
    } else if (diffDays < 7) {
      return this.translateService.instant("time.days_ago", { count: diffDays });
    } else if (diffDays < 30) {
      return this.translateService.instant("time.weeks_ago", { count: Math.floor(diffDays / 7) });
    } else if (diffDays < 365) {
      return this.translateService.instant("time.months_ago", { count: Math.floor(diffDays / 30) });
    } else {
      return this.translateService.instant("time.years_ago", { count: Math.floor(diffDays / 365) });
    }
  }
  handleCardClick() {
    this.cardClick.emit(this.post);
  }
  static \u0275fac = function PostCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PostCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PostCardComponent, selectors: [["app-post-card"]], inputs: { post: "post", showExcerpt: "showExcerpt", showImage: "showImage", showCategory: "showCategory", showAuthor: "showAuthor", showStats: "showStats", compactMode: "compactMode" }, outputs: { cardClick: "cardClick" }, decls: 15, vars: 16, consts: [[1, "post-card", 3, "click", "routerLink"], [1, "featured-badge"], [1, "post-image"], [1, "post-content"], [1, "post-header"], [1, "category-badge-inline", 3, "class"], [1, "post-meta"], [1, "post-date"], [1, "post-title"], [1, "post-excerpt"], [1, "post-author"], [1, "post-stats"], [1, "post-tags"], ["alt", "", "aria-hidden", "true", 1, "badge-icon", 3, "src"], ["loading", "lazy", 3, "src", "alt"], [1, "category-badge-overlay", 3, "class"], [1, "category-badge-overlay"], [1, "badge-icon", 3, "src", "alt"], [1, "category-name"], [1, "category-badge-inline"], [1, "author-info"], [1, "author-avatar-placeholder"], [1, "author-details"], [1, "author-name"], [1, "stat-item"], ["alt", "", "aria-hidden", "true", 1, "stat-icon-img", 3, "src"], [1, "stat-value"], [1, "tag"]], template: function PostCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "article", 0);
      \u0275\u0275listener("click", function PostCardComponent_Template_article_click_0_listener() {
        return ctx.handleCardClick();
      });
      \u0275\u0275conditionalCreate(1, PostCardComponent_Conditional_1_Template, 5, 4, "div", 1);
      \u0275\u0275conditionalCreate(2, PostCardComponent_Conditional_2_Template, 3, 3, "div", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
      \u0275\u0275conditionalCreate(5, PostCardComponent_Conditional_5_Template, 4, 5, "div", 5);
      \u0275\u0275elementStart(6, "div", 6)(7, "span", 7);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "h3", 8);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(11, PostCardComponent_Conditional_11_Template, 2, 1, "p", 9);
      \u0275\u0275conditionalCreate(12, PostCardComponent_Conditional_12_Template, 7, 2, "div", 10);
      \u0275\u0275conditionalCreate(13, PostCardComponent_Conditional_13_Template, 13, 6, "div", 11);
      \u0275\u0275conditionalCreate(14, PostCardComponent_Conditional_14_Template, 3, 0, "div", 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("compact", ctx.compactMode)("featured", ctx.post.is_featured === 1);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(14, _c0, ctx.post.id));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.post.is_featured === 1 ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showImage && ctx.post.image_url ? 2 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showCategory && ctx.categoryInfo && !ctx.post.image_url ? 5 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.getRelativeTime());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.post.title);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showExcerpt ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAuthor ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showStats ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.post.tags ? 14 : -1);
    }
  }, dependencies: [RouterModule, RouterLink, TranslateModule, TranslatePipe], styles: ["\n\n.post-card[_ngcontent-%COMP%] {\n  position: relative;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  transition: all var(--transition-normal);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.post-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n  border-color: var(--color-primary);\n}\n.pinned-badge[_ngcontent-%COMP%], \n.featured-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: var(--space-3);\n  right: var(--space-3);\n  background: var(--color-primary);\n  color: white;\n  padding: var(--space-2) var(--space-3);\n  border-radius: var(--radius-md);\n  font-size: var(--text-xs);\n  font-weight: var(--font-semibold);\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n  box-shadow: var(--shadow-sm);\n}\n.pinned-badge[_ngcontent-%COMP%] {\n  background: var(--color-secondary);\n}\n.post-image[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  overflow: hidden;\n  background: var(--color-neutral-100);\n}\n.post-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform var(--transition-normal);\n}\n.post-card[_ngcontent-%COMP%]:hover   .post-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.category-badge-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: var(--space-3);\n  left: var(--space-3);\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: var(--space-2) var(--space-3);\n  border-radius: var(--radius-md);\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  box-shadow: var(--shadow-md);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .category-badge-overlay[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.8);\n}\n.forum-badges[_ngcontent-%COMP%] {\n  position: absolute;\n  top: var(--space-3);\n  left: var(--space-3);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.question-badge[_ngcontent-%COMP%], \n.answered-badge[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: var(--space-2) var(--space-3);\n  border-radius: var(--radius-md);\n  font-size: var(--text-xs);\n  font-weight: var(--font-semibold);\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n  box-shadow: var(--shadow-sm);\n}\n.question-badge[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.answered-badge[_ngcontent-%COMP%] {\n  background: var(--color-success);\n  color: white;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .question-badge[_ngcontent-%COMP%], \n[data-theme=dark][_ngcontent-%COMP%]   .answered-badge[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.8);\n}\n.post-content[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  flex: 1;\n}\n.post-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--space-2);\n}\n.category-badge-inline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-1) var(--space-2);\n  border-radius: var(--radius-sm);\n  font-size: var(--text-xs);\n  font-weight: var(--font-medium);\n  background: var(--color-neutral-100);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .category-badge-inline[_ngcontent-%COMP%] {\n  background: var(--color-neutral-800);\n}\n.post-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  font-size: var(--text-xs);\n  color: var(--color-text-secondary);\n}\n.reading-time[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n}\n.post-title[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  line-height: var(--leading-tight);\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.post-excerpt[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-normal);\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.post-author[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: var(--space-2);\n  border-top: 1px solid var(--color-border);\n}\n.author-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n}\n.author-avatar[_ngcontent-%COMP%], \n.author-avatar-placeholder[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.author-avatar-placeholder[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: var(--font-semibold);\n  font-size: var(--text-sm);\n}\n.author-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-xs);\n}\n.author-name[_ngcontent-%COMP%] {\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n}\n.verified-icon[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: bold;\n}\n.author-role[_ngcontent-%COMP%] {\n  padding: var(--space-1) var(--space-2);\n  border-radius: var(--radius-sm);\n  font-size: 10px;\n  font-weight: var(--font-semibold);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.badge-admin[_ngcontent-%COMP%] {\n  background: var(--color-error-light);\n  color: var(--color-error);\n}\n.badge-pharmacist[_ngcontent-%COMP%] {\n  background: var(--color-success-light);\n  color: var(--color-success);\n}\n.badge-user[_ngcontent-%COMP%] {\n  background: var(--color-neutral-200);\n  color: var(--color-neutral-600);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .badge-user[_ngcontent-%COMP%] {\n  background: var(--color-neutral-700);\n  color: var(--color-neutral-300);\n}\n.post-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding-top: var(--space-2);\n  border-top: 1px solid var(--color-border);\n}\n.stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n  font-size: var(--text-xs);\n  color: var(--color-text-secondary);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-weight: var(--font-medium);\n}\n.post-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-2);\n}\n.tag[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--color-secondary);\n  background: rgba(16, 185, 129, 0.1);\n  padding: var(--space-1) var(--space-3);\n  border-radius: var(--radius-full);\n  font-weight: var(--font-medium);\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  transition: all var(--transition-fast);\n}\n.tag[_ngcontent-%COMP%]:hover {\n  background: rgba(16, 185, 129, 0.15);\n  border-color: var(--color-secondary);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%] {\n  color: var(--color-success);\n  background: rgba(16, 185, 129, 0.15);\n  border-color: rgba(16, 185, 129, 0.4);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]:hover {\n  background: rgba(16, 185, 129, 0.25);\n  border-color: var(--color-success);\n}\n.category-medicines[_ngcontent-%COMP%] {\n  color: var(--color-error);\n  border-color: var(--color-error);\n}\n.category-natural[_ngcontent-%COMP%] {\n  color: var(--color-success);\n  border-color: var(--color-success);\n}\n.category-baby[_ngcontent-%COMP%] {\n  color: #d946ef;\n  border-color: #d946ef;\n}\n.category-lifestyle[_ngcontent-%COMP%] {\n  color: var(--color-info);\n  border-color: var(--color-info);\n}\n.category-seasonal[_ngcontent-%COMP%] {\n  color: var(--color-warning-hover);\n  border-color: var(--color-warning-hover);\n}\n.category-qa[_ngcontent-%COMP%] {\n  color: #7c3aed;\n  border-color: #7c3aed;\n}\n.category-general[_ngcontent-%COMP%] {\n  color: #6b7280;\n  border-color: #6b7280;\n}\n.post-card.compact[_ngcontent-%COMP%] {\n  flex-direction: row;\n  height: auto;\n}\n.post-card.compact[_ngcontent-%COMP%]   .post-image[_ngcontent-%COMP%] {\n  width: 200px;\n  aspect-ratio: 1;\n  flex-shrink: 0;\n}\n.post-card.compact[_ngcontent-%COMP%]   .post-content[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n}\n.post-card.compact[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  -webkit-line-clamp: 1;\n  line-clamp: 1;\n}\n.post-card.compact[_ngcontent-%COMP%]   .post-excerpt[_ngcontent-%COMP%] {\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n}\n@media (max-width: 768px) {\n  .post-card.compact[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .post-card.compact[_ngcontent-%COMP%]   .post-image[_ngcontent-%COMP%] {\n    width: 100%;\n    aspect-ratio: 16 / 9;\n  }\n  .post-content[_ngcontent-%COMP%] {\n    padding: var(--space-3);\n  }\n  .post-title[_ngcontent-%COMP%] {\n    font-size: var(--text-base);\n  }\n  .category-badge-overlay[_ngcontent-%COMP%], \n   .category-badge-inline[_ngcontent-%COMP%] {\n    font-size: 10px;\n    padding: var(--space-1) var(--space-2);\n  }\n}\n@media (hover: hover) {\n  .post-card[_ngcontent-%COMP%]:hover   .post-title[_ngcontent-%COMP%] {\n    color: var(--color-primary);\n  }\n}\n[data-theme=dark][_ngcontent-%COMP%]   .post-card[_ngcontent-%COMP%] {\n  border-color: var(--color-neutral-700);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .post-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n/*# sourceMappingURL=post-card.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PostCardComponent, [{
    type: Component,
    args: [{ selector: "app-post-card", standalone: true, imports: [RouterModule, TranslateModule], template: `<article\r
  class="post-card"\r
  [class.compact]="compactMode"\r
  [class.featured]="post.is_featured === 1"\r
  [routerLink]="['/forum', post.id]"\r
  (click)="handleCardClick()"\r
>\r
  <!-- is_pinned mez\u0151 nem l\xE9tezik a posts t\xE1bl\xE1ban \u2014 elt\xE1vol\xEDtva -->\r
\r
  @if (post.is_featured === 1) {\r
    <div class="featured-badge">\r
      <img [src]="ICONS.badgeFeatured" alt="" class="badge-icon" aria-hidden="true" />\r
      <span>{{ 'forum.featured' | translate }}</span>\r
    </div>\r
  }\r
\r
  @if (showImage && post.image_url) {\r
    <div class="post-image">\r
      <img [src]="post.image_url" [alt]="post.title" loading="lazy" />\r
\r
      @if (showCategory && categoryInfo) {\r
        <div class="category-badge-overlay" [class]="categoryInfo.color_class">\r
          <img [src]="categoryInfo.icon_src" [alt]="categoryInfo.display_name" class="badge-icon" />\r
          <span class="category-name">{{ categoryInfo.display_name }}</span>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <div class="post-content">\r
    <div class="post-header">\r
      @if (showCategory && categoryInfo && !post.image_url) {\r
        <div class="category-badge-inline" [class]="categoryInfo.color_class">\r
          <img [src]="categoryInfo.icon_src" [alt]="categoryInfo.display_name" class="badge-icon" />\r
          <span class="category-name">{{ categoryInfo.display_name }}</span>\r
        </div>\r
      }\r
\r
      <div class="post-meta">\r
        <span class="post-date">{{ getRelativeTime() }}</span>\r
      </div>\r
    </div>\r
\r
    <h3 class="post-title">{{ post.title }}</h3>\r
\r
    @if (showExcerpt) {\r
      <p class="post-excerpt">{{ post.excerpt }}</p>\r
    }\r
\r
    @if (showAuthor) {\r
      <div class="post-author">\r
        <div class="author-info">\r
          <!-- author_name nincs a DB-ben \u2014 user_id els\u0151 karakter\xE9t mutatjuk -->\r
          <div class="author-avatar-placeholder">\r
            {{ post.user_id.charAt(0).toUpperCase() }}\r
          </div>\r
          <div class="author-details">\r
            <span class="author-name">#{{ post.user_id }}</span>\r
            <!-- author_role nincs a DB-ben \u2014 badge elt\xE1vol\xEDtva -->\r
          </div>\r
        </div>\r
      </div>\r
    }\r
\r
    @if (showStats) {\r
      <div class="post-stats">\r
        <div class="stat-item">\r
          <img [src]="ICONS.statViews" alt="" class="stat-icon-img" aria-hidden="true" />\r
          <span class="stat-value">{{ post.views }}</span>\r
        </div>\r
        <div class="stat-item">\r
          <img [src]="ICONS.statLikes" alt="" class="stat-icon-img" aria-hidden="true" />\r
          <span class="stat-value">{{ post.likes }}</span>\r
        </div>\r
        <div class="stat-item">\r
          <img [src]="ICONS.statComments" alt="" class="stat-icon-img" aria-hidden="true" />\r
          <span class="stat-value">{{ post.comment_count }}</span>\r
        </div>\r
      </div>\r
    }\r
\r
    @if (post.tags) {\r
      <div class="post-tags">\r
        @for (tag of post.tags.split(',').slice(0, 3); track tag) {\r
          <span class="tag">#{{ tag.trim() }}</span>\r
        }\r
      </div>\r
    }\r
  </div>\r
</article>\r
`, styles: ["/* src/app/shared/components/post-card/post-card.css */\n.post-card {\n  position: relative;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  transition: all var(--transition-normal);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.post-card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n  border-color: var(--color-primary);\n}\n.pinned-badge,\n.featured-badge {\n  position: absolute;\n  top: var(--space-3);\n  right: var(--space-3);\n  background: var(--color-primary);\n  color: white;\n  padding: var(--space-2) var(--space-3);\n  border-radius: var(--radius-md);\n  font-size: var(--text-xs);\n  font-weight: var(--font-semibold);\n  z-index: 10;\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n  box-shadow: var(--shadow-sm);\n}\n.pinned-badge {\n  background: var(--color-secondary);\n}\n.post-image {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  overflow: hidden;\n  background: var(--color-neutral-100);\n}\n.post-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform var(--transition-normal);\n}\n.post-card:hover .post-image img {\n  transform: scale(1.05);\n}\n.category-badge-overlay {\n  position: absolute;\n  bottom: var(--space-3);\n  left: var(--space-3);\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: var(--space-2) var(--space-3);\n  border-radius: var(--radius-md);\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  box-shadow: var(--shadow-md);\n}\n[data-theme=dark] .category-badge-overlay {\n  background: rgba(0, 0, 0, 0.8);\n}\n.forum-badges {\n  position: absolute;\n  top: var(--space-3);\n  left: var(--space-3);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.question-badge,\n.answered-badge {\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: var(--space-2) var(--space-3);\n  border-radius: var(--radius-md);\n  font-size: var(--text-xs);\n  font-weight: var(--font-semibold);\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n  box-shadow: var(--shadow-sm);\n}\n.question-badge {\n  color: var(--color-primary);\n}\n.answered-badge {\n  background: var(--color-success);\n  color: white;\n}\n[data-theme=dark] .question-badge,\n[data-theme=dark] .answered-badge {\n  background: rgba(0, 0, 0, 0.8);\n}\n.post-content {\n  padding: var(--space-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  flex: 1;\n}\n.post-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--space-2);\n}\n.category-badge-inline {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-1) var(--space-2);\n  border-radius: var(--radius-sm);\n  font-size: var(--text-xs);\n  font-weight: var(--font-medium);\n  background: var(--color-neutral-100);\n}\n[data-theme=dark] .category-badge-inline {\n  background: var(--color-neutral-800);\n}\n.post-meta {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  font-size: var(--text-xs);\n  color: var(--color-text-secondary);\n}\n.reading-time {\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n}\n.post-title {\n  font-size: var(--text-lg);\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  line-height: var(--leading-tight);\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.post-excerpt {\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-normal);\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.post-author {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: var(--space-2);\n  border-top: 1px solid var(--color-border);\n}\n.author-info {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n}\n.author-avatar,\n.author-avatar-placeholder {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.author-avatar-placeholder {\n  background: var(--color-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: var(--font-semibold);\n  font-size: var(--text-sm);\n}\n.author-details {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-xs);\n}\n.author-name {\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n}\n.verified-icon {\n  color: var(--color-primary);\n  font-weight: bold;\n}\n.author-role {\n  padding: var(--space-1) var(--space-2);\n  border-radius: var(--radius-sm);\n  font-size: 10px;\n  font-weight: var(--font-semibold);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.badge-admin {\n  background: var(--color-error-light);\n  color: var(--color-error);\n}\n.badge-pharmacist {\n  background: var(--color-success-light);\n  color: var(--color-success);\n}\n.badge-user {\n  background: var(--color-neutral-200);\n  color: var(--color-neutral-600);\n}\n[data-theme=dark] .badge-user {\n  background: var(--color-neutral-700);\n  color: var(--color-neutral-300);\n}\n.post-stats {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding-top: var(--space-2);\n  border-top: 1px solid var(--color-border);\n}\n.stat-item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n  font-size: var(--text-xs);\n  color: var(--color-text-secondary);\n}\n.stat-icon {\n  font-size: 14px;\n}\n.stat-value {\n  font-weight: var(--font-medium);\n}\n.post-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-2);\n}\n.tag {\n  font-size: var(--text-xs);\n  color: var(--color-secondary);\n  background: rgba(16, 185, 129, 0.1);\n  padding: var(--space-1) var(--space-3);\n  border-radius: var(--radius-full);\n  font-weight: var(--font-medium);\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  transition: all var(--transition-fast);\n}\n.tag:hover {\n  background: rgba(16, 185, 129, 0.15);\n  border-color: var(--color-secondary);\n}\n[data-theme=dark] .tag {\n  color: var(--color-success);\n  background: rgba(16, 185, 129, 0.15);\n  border-color: rgba(16, 185, 129, 0.4);\n}\n[data-theme=dark] .tag:hover {\n  background: rgba(16, 185, 129, 0.25);\n  border-color: var(--color-success);\n}\n.category-medicines {\n  color: var(--color-error);\n  border-color: var(--color-error);\n}\n.category-natural {\n  color: var(--color-success);\n  border-color: var(--color-success);\n}\n.category-baby {\n  color: #d946ef;\n  border-color: #d946ef;\n}\n.category-lifestyle {\n  color: var(--color-info);\n  border-color: var(--color-info);\n}\n.category-seasonal {\n  color: var(--color-warning-hover);\n  border-color: var(--color-warning-hover);\n}\n.category-qa {\n  color: #7c3aed;\n  border-color: #7c3aed;\n}\n.category-general {\n  color: #6b7280;\n  border-color: #6b7280;\n}\n.post-card.compact {\n  flex-direction: row;\n  height: auto;\n}\n.post-card.compact .post-image {\n  width: 200px;\n  aspect-ratio: 1;\n  flex-shrink: 0;\n}\n.post-card.compact .post-content {\n  padding: var(--space-3);\n}\n.post-card.compact .post-title {\n  font-size: var(--text-base);\n  -webkit-line-clamp: 1;\n  line-clamp: 1;\n}\n.post-card.compact .post-excerpt {\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n}\n@media (max-width: 768px) {\n  .post-card.compact {\n    flex-direction: column;\n  }\n  .post-card.compact .post-image {\n    width: 100%;\n    aspect-ratio: 16 / 9;\n  }\n  .post-content {\n    padding: var(--space-3);\n  }\n  .post-title {\n    font-size: var(--text-base);\n  }\n  .category-badge-overlay,\n  .category-badge-inline {\n    font-size: 10px;\n    padding: var(--space-1) var(--space-2);\n  }\n}\n@media (hover: hover) {\n  .post-card:hover .post-title {\n    color: var(--color-primary);\n  }\n}\n[data-theme=dark] .post-card {\n  border-color: var(--color-neutral-700);\n}\n[data-theme=dark] .post-card:hover {\n  border-color: var(--color-primary);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n/*# sourceMappingURL=post-card.css.map */\n"] }]
  }], null, { post: [{
    type: Input,
    args: [{ required: true }]
  }], showExcerpt: [{
    type: Input
  }], showImage: [{
    type: Input
  }], showCategory: [{
    type: Input
  }], showAuthor: [{
    type: Input
  }], showStats: [{
    type: Input
  }], compactMode: [{
    type: Input
  }], cardClick: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PostCardComponent, { className: "PostCardComponent", filePath: "src/app/shared/components/post-card/post-card.ts", lineNumber: 16 });
})();

// src/app/pages/forum/forum.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function Forum_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("click", function Forum_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275text(2, " \u2715 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 1, "common.clear"));
  }
}
function Forum_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    \u0275\u0275property("value", option_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, option_r3.translateKey));
  }
}
function Forum_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275element(1, "img", 23);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.ICONS.forumNewPost, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 2, "forum.new_post"), " ");
  }
}
function Forum_Conditional_29_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function Forum_Conditional_29_For_8_Template_button_click_0_listener() {
      const category_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectCategory(category_r6.id));
    });
    \u0275\u0275element(1, "img", 28);
    \u0275\u0275elementStart(2, "span", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("category-chip " + category_r6.color_class + (ctx_r1.selectedCategory() === category_r6.id ? " active" : ""));
    \u0275\u0275advance();
    \u0275\u0275property("src", category_r6.icon_src, \u0275\u0275sanitizeUrl)("alt", category_r6.display_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r6.display_name);
  }
}
function Forum_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 19);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275elementStart(2, "button", 24);
    \u0275\u0275listener("click", function Forum_Conditional_29_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectCategory("all"));
    });
    \u0275\u0275element(3, "img", 25);
    \u0275\u0275elementStart(4, "span", 26);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(7, Forum_Conditional_29_For_8_Template, 4, 5, "button", 27, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 5, "forum.filter_by_category"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("category-chip" + (ctx_r1.selectedCategory() === "all" ? " active" : ""));
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.ICONS.categoryAll, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 7, "forum.all_categories"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.categories());
  }
}
function Forum_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275element(2, "div", 29);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 2, "common.loading"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 4, "common.loading"));
  }
}
function Forum_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "img", 30);
    \u0275\u0275elementStart(2, "h3", 31);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 32);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 33);
    \u0275\u0275listener("click", function Forum_Conditional_31_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.forumService.loadPosts());
    });
    \u0275\u0275element(9, "img", 23);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.IMAGES.stateError, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 5, "forum.error_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 7, "forum.error_description"));
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r1.ICONS.forumRetry, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 9, "common.retry"), " ");
  }
}
function Forum_Conditional_32_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-post-card", 37);
    \u0275\u0275listener("cardClick", function Forum_Conditional_32_Conditional_0_For_2_Template_app_post_card_cardClick_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onPostClick($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const post_r9 = ctx.$implicit;
    \u0275\u0275property("post", post_r9)("showExcerpt", true)("showImage", true)("showCategory", true)("showAuthor", true)("showStats", true);
  }
}
function Forum_Conditional_32_Conditional_0_Conditional_3_For_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "...");
    \u0275\u0275elementEnd();
  }
}
function Forum_Conditional_32_Conditional_0_Conditional_3_For_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function Forum_Conditional_32_Conditional_0_Conditional_3_For_7_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const pageNum_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.goToPage(pageNum_r12));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pageNum_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", ctx_r1.forumService.current_page() === pageNum_r12);
    \u0275\u0275attribute("aria-label", ctx_r1.getPageAriaLabel(pageNum_r12))("aria-current", ctx_r1.forumService.current_page() === pageNum_r12 ? "page" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pageNum_r12, " ");
  }
}
function Forum_Conditional_32_Conditional_0_Conditional_3_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Forum_Conditional_32_Conditional_0_Conditional_3_For_7_Conditional_0_Template, 2, 0, "span", 40)(1, Forum_Conditional_32_Conditional_0_Conditional_3_For_7_Conditional_1_Template, 2, 5, "button", 41);
  }
  if (rf & 2) {
    const pageNum_r12 = ctx.$implicit;
    \u0275\u0275conditional(pageNum_r12 === -1 ? 0 : 1);
  }
}
function Forum_Conditional_32_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 36)(1, "button", 38);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275listener("click", function Forum_Conditional_32_Conditional_0_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.previousPage());
    });
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 39);
    \u0275\u0275repeaterCreate(6, Forum_Conditional_32_Conditional_0_Conditional_3_For_7_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 38);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275listener("click", function Forum_Conditional_32_Conditional_0_Conditional_3_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.nextPage());
    });
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.forumService.current_page() === 1);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(2, 6, "common.previous_page"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u2039 ", \u0275\u0275pipeBind1(4, 8, "pagination.previous"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.getPageNumbers());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.forumService.current_page() === ctx_r1.total_pages());
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(9, 10, "common.next_page"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 12, "pagination.next"), " \u203A ");
  }
}
function Forum_Conditional_32_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 34);
    \u0275\u0275repeaterCreate(1, Forum_Conditional_32_Conditional_0_For_2_Template, 1, 6, "app-post-card", 35, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, Forum_Conditional_32_Conditional_0_Conditional_3_Template, 12, 14, "nav", 36);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.posts());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.total_pages() > 1 ? 3 : -1);
  }
}
function Forum_Conditional_32_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "img", 30);
    \u0275\u0275elementStart(2, "h3", 31);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 32);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 33);
    \u0275\u0275listener("click", function Forum_Conditional_32_Conditional_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resetFilters());
    });
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.IMAGES.stateNoResults, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, "forum.no_results_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 6, "forum.no_results_description"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 8, "forum.reset_filters"), " ");
  }
}
function Forum_Conditional_32_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275element(1, "img", 23);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.ICONS.forumNewPost, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 2, "forum.new_post"), " ");
  }
}
function Forum_Conditional_32_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "img", 30);
    \u0275\u0275elementStart(2, "h3", 31);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 32);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, Forum_Conditional_32_Conditional_2_Conditional_8_Template, 4, 4, "button", 43);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.IMAGES.stateEmptyForum, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, "forum.empty_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 6, "forum.empty_description"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isAuthenticated() ? 8 : -1);
  }
}
function Forum_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Forum_Conditional_32_Conditional_0_Template, 4, 1)(1, Forum_Conditional_32_Conditional_1_Template, 11, 10, "div", 21)(2, Forum_Conditional_32_Conditional_2_Template, 9, 8, "div", 21);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.posts().length > 0 ? 0 : ctx_r1.search_query() || ctx_r1.selectedCategory() !== "all" ? 1 : 2);
  }
}
var Forum = class _Forum {
  search_query = signal("", ...ngDevMode ? [{ debugName: "search_query" }] : []);
  selectedCategory = signal("all", ...ngDevMode ? [{ debugName: "selectedCategory" }] : []);
  selectedSort = signal("newest", ...ngDevMode ? [{ debugName: "selectedSort" }] : []);
  ICONS = ICONS;
  IMAGES = IMAGES;
  translate = inject(TranslateService);
  authService = inject(AuthService);
  forumService = inject(ForumService);
  isAuthenticated = computed(() => this.authService.isAuthenticated(), ...ngDevMode ? [{ debugName: "isAuthenticated" }] : []);
  posts = computed(() => this.forumService.paginatedPosts(), ...ngDevMode ? [{ debugName: "posts" }] : []);
  total_pages = computed(() => this.forumService.total_pages(), ...ngDevMode ? [{ debugName: "total_pages" }] : []);
  categories = computed(() => this.forumService.categories(), ...ngDevMode ? [{ debugName: "categories" }] : []);
  sortOptions = [
    { value: "newest", translateKey: "forum.sort.newest" },
    { value: "oldest", translateKey: "forum.sort.oldest" },
    { value: "most-viewed", translateKey: "forum.sort.most_viewed" },
    { value: "most-liked", translateKey: "forum.sort.most_liked" },
    { value: "trending", translateKey: "forum.sort.trending" }
  ];
  ngOnInit() {
    this.forumService.loadPosts();
  }
  applySearch() {
    const filters = {
      search_query: this.search_query() || void 0,
      category_id: this.selectedCategory() !== "all" ? this.selectedCategory() : void 0
    };
    this.forumService.setFilters(filters);
  }
  selectCategory(category) {
    this.selectedCategory.set(category);
    this.applySearch();
  }
  changeSort(sort_by) {
    this.selectedSort.set(sort_by);
    this.forumService.setSorting(sort_by);
  }
  clearSearch() {
    this.search_query.set("");
    this.applySearch();
  }
  resetFilters() {
    this.search_query.set("");
    this.selectedCategory.set("all");
    this.forumService.setFilters({});
  }
  goToPage(page) {
    this.forumService.setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  previousPage() {
    const current = this.forumService.current_page();
    if (current > 1)
      this.goToPage(current - 1);
  }
  nextPage() {
    const current = this.forumService.current_page();
    if (current < this.total_pages())
      this.goToPage(current + 1);
  }
  getPageNumbers() {
    const current = this.forumService.current_page();
    const total = this.total_pages();
    const pages = [];
    pages.push(1);
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2)
      pages.push(-1);
    for (let i = start; i <= end; i++)
      pages.push(i);
    if (end < total - 1)
      pages.push(-1);
    if (total > 1)
      pages.push(total);
    return pages;
  }
  getPageAriaLabel(pageNum) {
    return `${this.translate.instant("pagination.page")} ${pageNum}`;
  }
  onPostClick(post) {
    void post;
  }
  static \u0275fac = function Forum_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Forum)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Forum, selectors: [["app-forum"]], decls: 33, vars: 24, consts: [[1, "forum-page"], [1, "forum-hero"], [1, "hero-content"], [1, "hero-title"], [1, "hero-description"], [1, "forum-container"], [1, "search-filters"], [1, "search-bar"], [1, "search-input-wrapper"], ["alt", "", "aria-hidden", "true", 1, "search-icon-img", 3, "src"], ["type", "search", 1, "search-input", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], [1, "clear-search"], [1, "search-button", 3, "click"], [1, "toolbar"], [1, "sort-controls"], ["for", "sort-select", 1, "sort-label"], ["id", "sort-select", 1, "sort-select", 3, "ngModelChange", "ngModel"], [3, "value"], ["routerLink", "/forum/new", 1, "new-post-button"], ["role", "group", 1, "category-filters"], ["role", "status", 1, "loading-container"], [1, "empty-state"], [1, "clear-search", 3, "click"], ["alt", "", "aria-hidden", "true", 1, "btn-icon", 3, "src"], [3, "click"], ["alt", "", "aria-hidden", "true", 1, "category-icon-img", 3, "src"], [1, "category-name"], [3, "class"], [1, "category-icon-img", 3, "src", "alt"], [1, "spinner"], ["alt", "", "aria-hidden", "true", 1, "empty-state-img", 3, "src"], [1, "empty-state-title"], [1, "empty-state-description"], [1, "empty-state-action", 3, "click"], [1, "posts-grid"], [3, "post", "showExcerpt", "showImage", "showCategory", "showAuthor", "showStats"], ["aria-label", "Pagination", 1, "pagination"], [3, "cardClick", "post", "showExcerpt", "showImage", "showCategory", "showAuthor", "showStats"], [1, "pagination-button", 3, "click", "disabled"], [1, "page-numbers"], [1, "pagination-ellipsis"], [1, "page-number", 3, "active"], [1, "page-number", 3, "click"], ["routerLink", "/forum/new", 1, "empty-state-action"]], template: function Forum_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 5)(10, "section", 6)(11, "div", 7)(12, "div", 8);
      \u0275\u0275element(13, "img", 9);
      \u0275\u0275elementStart(14, "input", 10);
      \u0275\u0275pipe(15, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function Forum_Template_input_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.search_query, $event) || (ctx.search_query = $event);
        return $event;
      });
      \u0275\u0275listener("keyup.enter", function Forum_Template_input_keyup_enter_14_listener() {
        return ctx.applySearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, Forum_Conditional_16_Template, 3, 3, "button", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 12);
      \u0275\u0275listener("click", function Forum_Template_button_click_17_listener() {
        return ctx.applySearch();
      });
      \u0275\u0275text(18);
      \u0275\u0275pipe(19, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 13)(21, "div", 14)(22, "label", 15);
      \u0275\u0275text(23);
      \u0275\u0275pipe(24, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "select", 16);
      \u0275\u0275twoWayListener("ngModelChange", function Forum_Template_select_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedSort, $event) || (ctx.selectedSort = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Forum_Template_select_ngModelChange_25_listener($event) {
        return ctx.changeSort($event);
      });
      \u0275\u0275repeaterCreate(26, Forum_For_27_Template, 3, 4, "option", 17, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(28, Forum_Conditional_28_Template, 4, 4, "button", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(29, Forum_Conditional_29_Template, 9, 9, "section", 19);
      \u0275\u0275conditionalCreate(30, Forum_Conditional_30_Template, 6, 6, "div", 20);
      \u0275\u0275conditionalCreate(31, Forum_Conditional_31_Template, 12, 11, "div", 21);
      \u0275\u0275conditionalCreate(32, Forum_Conditional_32_Template, 3, 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 14, "forum.title"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 16, "forum.description"));
      \u0275\u0275advance(6);
      \u0275\u0275property("src", ctx.ICONS.forumSearch, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.search_query);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(15, 18, "forum.search_placeholder"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.search_query() ? 16 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 20, "common.search"), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(24, 22, "forum.sort_by"), ":");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedSort);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.sortOptions);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isAuthenticated() ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.categories().length > 0 ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.forumService.isLoading() ? 30 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.forumService.isLoading() && ctx.forumService.loadError() ? 31 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.forumService.isLoading() && !ctx.forumService.loadError() ? 32 : -1);
    }
  }, dependencies: [RouterModule, RouterLink, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, TranslateModule, PostCardComponent, TranslatePipe], styles: ['\n\n.forum-page[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100vh;\n  background: var(--color-background);\n}\n.forum-hero[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #065f36 0%,\n      #067a45 25%,\n      #0b5f39 50%,\n      #044d2c 75%,\n      #023a21 100%);\n  color: white;\n  padding: var(--space-16) var(--space-4) var(--space-12);\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n}\n.forum-hero[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse at 20% 50%,\n      rgba(255, 255, 255, 0.08) 0%,\n      transparent 50%),\n    radial-gradient(\n      ellipse at 80% 20%,\n      rgba(114, 228, 240, 0.06) 0%,\n      transparent 40%),\n    radial-gradient(\n      ellipse at 60% 80%,\n      rgba(255, 255, 255, 0.04) 0%,\n      transparent 45%);\n  pointer-events: none;\n}\n.forum-hero[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.2) 50%,\n      transparent 100%);\n  pointer-events: none;\n}\n.hero-content[_ngcontent-%COMP%] {\n  max-width: 680px;\n  margin: 0 auto;\n  position: relative;\n  z-index: 1;\n}\n.hero-title[_ngcontent-%COMP%] {\n  font-size: clamp(1.75rem, 4vw, 2.5rem);\n  font-weight: var(--font-bold);\n  margin: 0 0 var(--space-3) 0;\n  line-height: var(--leading-tight);\n  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n.hero-description[_ngcontent-%COMP%] {\n  font-size: clamp(1rem, 2vw, 1.125rem);\n  margin: 0;\n  opacity: 0.92;\n  line-height: var(--leading-relaxed);\n}\n.forum-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--space-8) var(--space-4);\n}\n.search-filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n  margin-bottom: var(--space-6);\n}\n.search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-3);\n  width: 100%;\n}\n.search-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: var(--space-3);\n  font-size: 18px;\n  pointer-events: none;\n  color: var(--color-text-secondary);\n  line-height: 1;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-10) var(--space-3) var(--space-10);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base);\n  background: var(--color-surface);\n  color: var(--color-text-primary);\n  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);\n}\n.search-input[_ngcontent-%COMP%]::-webkit-search-cancel-button, \n.search-input[_ngcontent-%COMP%]::-webkit-search-decoration {\n  -webkit-appearance: none;\n  appearance: none;\n  display: none;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.12);\n}\n.clear-search[_ngcontent-%COMP%] {\n  position: absolute;\n  right: var(--space-3);\n  background: transparent;\n  border: none;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  font-size: 16px;\n  padding: var(--space-2);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  transition: background var(--transition-fast), color var(--transition-fast);\n}\n.clear-search[_ngcontent-%COMP%]:hover {\n  background: var(--color-neutral-200);\n  color: var(--color-text-primary);\n}\n.search-button[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-6);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition:\n    background var(--transition-fast),\n    transform var(--transition-fast),\n    box-shadow var(--transition-fast);\n  white-space: nowrap;\n  min-height: 44px;\n}\n.search-button[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n  transform: translateY(-1px);\n  box-shadow: var(--shadow-md);\n}\n.search-button[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--space-4);\n}\n.sort-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n}\n.sort-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-secondary);\n  white-space: nowrap;\n}\n.sort-select[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-4);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: var(--color-surface);\n  color: var(--color-text-primary);\n  font-size: var(--text-sm);\n  cursor: pointer;\n  transition: border-color var(--transition-fast);\n  min-height: 40px;\n}\n.sort-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n}\n.new-post-button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-secondary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition:\n    background var(--transition-fast),\n    transform var(--transition-fast),\n    box-shadow var(--transition-fast);\n  min-height: 40px;\n  white-space: nowrap;\n}\n.new-post-button[_ngcontent-%COMP%]:hover {\n  background: var(--color-secondary-dark);\n  transform: translateY(-1px);\n  box-shadow: var(--shadow-sm);\n}\n.category-filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-2);\n  margin-bottom: var(--space-6);\n  padding: var(--space-4);\n  background: var(--color-surface);\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n}\n.category-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-4);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: var(--color-background);\n  color: var(--color-text-primary);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  min-height: 40px;\n}\n@media (hover: hover) {\n  .category-chip[_ngcontent-%COMP%]:hover {\n    transform: translateY(-2px);\n    box-shadow: var(--shadow-sm);\n  }\n}\n.category-chip.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.category-chip.category-medicines.active[_ngcontent-%COMP%] {\n  background: var(--color-error);\n  border-color: var(--color-error);\n}\n.category-chip.category-natural.active[_ngcontent-%COMP%] {\n  background: #16a34a;\n  border-color: var(--color-success);\n}\n.category-chip.category-baby.active[_ngcontent-%COMP%] {\n  background: #d946ef;\n  border-color: #d946ef;\n}\n.category-chip.category-lifestyle.active[_ngcontent-%COMP%] {\n  background: #2563eb;\n  border-color: var(--color-info);\n}\n.category-chip.category-seasonal.active[_ngcontent-%COMP%] {\n  background: #ea580c;\n  border-color: var(--color-warning-hover);\n}\n.category-chip.category-qa.active[_ngcontent-%COMP%] {\n  background: #7c3aed;\n  border-color: #7c3aed;\n}\n.category-chip.category-general.active[_ngcontent-%COMP%] {\n  background: #6b7280;\n  border-color: #6b7280;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-16) var(--space-4);\n  gap: var(--space-4);\n  color: var(--color-text-secondary);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.9s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.posts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: var(--space-6);\n  margin-bottom: var(--space-8);\n}\n.no-results[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--space-16) var(--space-4);\n}\n.no-results-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  margin-bottom: var(--space-4);\n  opacity: 0.5;\n  display: block;\n}\n.no-results-title[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  margin: 0 0 var(--space-2) 0;\n}\n.no-results-description[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--color-text-secondary);\n  margin: 0 0 var(--space-6) 0;\n}\n.reset-filters-button[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-6);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-md);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition: background var(--transition-fast), transform var(--transition-fast);\n  min-height: 44px;\n}\n.reset-filters-button[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n  transform: translateY(-1px);\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-6) 0;\n}\n.pagination-button[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-surface);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  min-height: 40px;\n}\n.pagination-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.pagination-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.page-numbers[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n}\n.page-number[_ngcontent-%COMP%] {\n  min-width: 40px;\n  height: 40px;\n  padding: var(--space-2);\n  background: var(--color-surface);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n}\n.page-number[_ngcontent-%COMP%]:hover {\n  background: var(--color-neutral-100);\n  border-color: var(--color-primary);\n}\n.page-number.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.pagination-ellipsis[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 40px;\n  height: 40px;\n  color: var(--color-text-secondary);\n  font-weight: var(--font-semibold);\n  pointer-events: none;\n}\n@media (max-width: 768px) {\n  .forum-hero[_ngcontent-%COMP%] {\n    padding: var(--space-10) var(--space-4) var(--space-8);\n  }\n  .forum-container[_ngcontent-%COMP%] {\n    padding: var(--space-6) var(--space-3);\n  }\n  .search-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .search-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .sort-controls[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n  .new-post-button[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .category-filters[_ngcontent-%COMP%] {\n    padding: var(--space-3);\n  }\n  .posts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: var(--space-4);\n  }\n  .pagination[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: var(--space-2);\n  }\n  .page-numbers[_ngcontent-%COMP%] {\n    order: -1;\n    width: 100%;\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n}\n@media (max-width: 480px) {\n  .forum-hero[_ngcontent-%COMP%] {\n    padding: var(--space-8) var(--space-3) var(--space-6);\n  }\n  .category-chip[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: var(--space-1) var(--space-3);\n    min-height: 36px;\n    gap: var(--space-1);\n  }\n  .category-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .page-number[_ngcontent-%COMP%], \n   .pagination-button[_ngcontent-%COMP%] {\n    min-width: 36px;\n    height: 36px;\n    font-size: 13px;\n  }\n}\n@media (max-width: 375px) {\n  .forum-container[_ngcontent-%COMP%] {\n    padding: var(--space-4) var(--space-3);\n  }\n  .search-input[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n  }\n  .no-results-icon[_ngcontent-%COMP%] {\n    font-size: 48px;\n  }\n  .no-results-title[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n}\n[data-theme=dark][_ngcontent-%COMP%]   .forum-hero[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #044d2c 0%,\n      #065f36 25%,\n      #0b5f39 50%,\n      #033d23 75%,\n      #022b18 100%);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .category-filters[_ngcontent-%COMP%] {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-700);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .category-chip[_ngcontent-%COMP%] {\n  background: var(--color-neutral-900);\n  border-color: var(--color-neutral-600);\n  color: var(--color-neutral-200);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .category-chip[_ngcontent-%COMP%]:hover {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-500);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-600);\n  color: var(--color-neutral-100);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.2);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .sort-select[_ngcontent-%COMP%] {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-600);\n  color: var(--color-neutral-100);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .pagination-button[_ngcontent-%COMP%], \n[data-theme=dark][_ngcontent-%COMP%]   .page-number[_ngcontent-%COMP%] {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-600);\n  color: var(--color-neutral-200);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .page-number[_ngcontent-%COMP%]:hover {\n  background: var(--color-neutral-700);\n  border-color: var(--color-primary);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .clear-search[_ngcontent-%COMP%]:hover {\n  background: var(--color-neutral-700);\n  color: var(--color-neutral-100);\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner[_ngcontent-%COMP%] {\n    animation: none;\n    border-top-color: var(--color-primary);\n    opacity: 0.7;\n  }\n  .category-chip[_ngcontent-%COMP%], \n   .search-button[_ngcontent-%COMP%], \n   .new-post-button[_ngcontent-%COMP%], \n   .page-number[_ngcontent-%COMP%], \n   .pagination-button[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.blog-hero[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-secondary) 0%,\n      var(--color-secondary-dark) 100%);\n  color: white;\n  padding: var(--space-16) var(--space-4) var(--space-8);\n}\n.blog-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  text-align: center;\n  margin-bottom: var(--space-10);\n}\n.featured-posts[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.featured-title[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  margin: 0 0 var(--space-6) 0;\n  text-align: center;\n}\n.featured-carousel[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: var(--space-6);\n}\n.featured-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  cursor: pointer;\n  transition: all var(--transition-normal);\n  box-shadow: var(--shadow-lg);\n}\n.featured-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .featured-card[_ngcontent-%COMP%] {\n  background: var(--color-neutral-800);\n}\n.featured-image[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  overflow: hidden;\n  background: var(--color-neutral-100);\n}\n.featured-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform var(--transition-normal);\n}\n.featured-card[_ngcontent-%COMP%]:hover   .featured-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.featured-content[_ngcontent-%COMP%] {\n  padding: var(--space-5);\n}\n.featured-category[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  font-weight: var(--font-semibold);\n  margin-bottom: var(--space-2);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.featured-post-title[_ngcontent-%COMP%] {\n  font-size: var(--text-xl);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0 0 var(--space-3) 0;\n  line-height: var(--leading-tight);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .featured-post-title[_ngcontent-%COMP%] {\n  color: white;\n}\n.featured-excerpt[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-normal);\n  margin: 0 0 var(--space-4) 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .featured-excerpt[_ngcontent-%COMP%] {\n  color: var(--color-neutral-400);\n}\n.featured-meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: var(--text-xs);\n  color: var(--color-text-secondary);\n  padding-top: var(--space-3);\n  border-top: 1px solid var(--color-border);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .featured-meta[_ngcontent-%COMP%] {\n  color: var(--color-neutral-400);\n  border-color: var(--color-neutral-700);\n}\n.author[_ngcontent-%COMP%] {\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .author[_ngcontent-%COMP%] {\n  color: white;\n}\n.reading-time[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n}\n.results-count[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-secondary);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .blog-hero[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-secondary) 0%,\n      #065f46 100%);\n}\n@media (max-width: 768px) {\n  .blog-hero[_ngcontent-%COMP%] {\n    padding: var(--space-10) var(--space-4) var(--space-6);\n  }\n  .blog-hero[_ngcontent-%COMP%]   .hero-content[_ngcontent-%COMP%] {\n    margin-bottom: var(--space-6);\n  }\n  .featured-title[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n  .featured-carousel[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: var(--space-4);\n  }\n}\n/*# sourceMappingURL=forum.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Forum, [{
    type: Component,
    args: [{ selector: "app-forum", standalone: true, imports: [RouterModule, FormsModule, TranslateModule, PostCardComponent], template: `<div class="forum-page">\r
  <section class="forum-hero">\r
    <div class="hero-content">\r
      <h1 class="hero-title">{{ 'forum.title' | translate }}</h1>\r
      <p class="hero-description">{{ 'forum.description' | translate }}</p>\r
    </div>\r
  </section>\r
\r
  <div class="forum-container">\r
    <!-- \u2500\u2500 Search + Sort \u2500\u2500 -->\r
    <section class="search-filters">\r
      <div class="search-bar">\r
        <div class="search-input-wrapper">\r
          <img [src]="ICONS.forumSearch" alt="" class="search-icon-img" aria-hidden="true" />\r
          <input\r
            type="search"\r
            [(ngModel)]="search_query"\r
            (keyup.enter)="applySearch()"\r
            [placeholder]="'forum.search_placeholder' | translate"\r
            class="search-input"\r
          />\r
          @if (search_query()) {\r
            <button\r
              class="clear-search"\r
              (click)="clearSearch()"\r
              [attr.aria-label]="'common.clear' | translate"\r
            >\r
              \u2715\r
            </button>\r
          }\r
        </div>\r
        <button class="search-button" (click)="applySearch()">\r
          {{ 'common.search' | translate }}\r
        </button>\r
      </div>\r
\r
      <div class="toolbar">\r
        <div class="sort-controls">\r
          <label for="sort-select" class="sort-label">{{ 'forum.sort_by' | translate }}:</label>\r
          <select\r
            id="sort-select"\r
            [(ngModel)]="selectedSort"\r
            (ngModelChange)="changeSort($event)"\r
            class="sort-select"\r
          >\r
            @for (option of sortOptions; track option.value) {\r
              <option [value]="option.value">{{ option.translateKey | translate }}</option>\r
            }\r
          </select>\r
        </div>\r
\r
        @if (isAuthenticated()) {\r
          <button class="new-post-button" routerLink="/forum/new">\r
            <img [src]="ICONS.forumNewPost" alt="" class="btn-icon" aria-hidden="true" />\r
            {{ 'forum.new_post' | translate }}\r
          </button>\r
        }\r
      </div>\r
    </section>\r
\r
    <!-- \u2500\u2500 Category chips \u2500\u2500 -->\r
    @if (categories().length > 0) {\r
      <section\r
        class="category-filters"\r
        role="group"\r
        [attr.aria-label]="'forum.filter_by_category' | translate"\r
      >\r
        <button\r
          [class]="'category-chip' + (selectedCategory() === 'all' ? ' active' : '')"\r
          (click)="selectCategory('all')"\r
        >\r
          <img [src]="ICONS.categoryAll" alt="" class="category-icon-img" aria-hidden="true" />\r
          <span class="category-name">{{ 'forum.all_categories' | translate }}</span>\r
        </button>\r
\r
        @for (category of categories(); track category.id) {\r
          <button\r
            [class]="\r
              'category-chip ' +\r
              category.color_class +\r
              (selectedCategory() === category.id ? ' active' : '')\r
            "\r
            (click)="selectCategory(category.id)"\r
          >\r
            <img [src]="category.icon_src" [alt]="category.display_name" class="category-icon-img" />\r
            <span class="category-name">{{ category.display_name }}</span>\r
          </button>\r
        }\r
      </section>\r
    }\r
\r
    <!-- \u2500\u2500 Loading \u2500\u2500 -->\r
    @if (forumService.isLoading()) {\r
      <div class="loading-container" role="status" [attr.aria-label]="'common.loading' | translate">\r
        <div class="spinner"></div>\r
        <p>{{ 'common.loading' | translate }}</p>\r
      </div>\r
    }\r
\r
    <!-- \u2500\u2500 Error state: backend unreachable \u2500\u2500 -->\r
    @if (!forumService.isLoading() && forumService.loadError()) {\r
      <div class="empty-state">\r
        <img [src]="IMAGES.stateError" alt="" class="empty-state-img" aria-hidden="true" />\r
        <h3 class="empty-state-title">{{ 'forum.error_title' | translate }}</h3>\r
        <p class="empty-state-description">{{ 'forum.error_description' | translate }}</p>\r
        <button class="empty-state-action" (click)="forumService.loadPosts()">\r
          <img [src]="ICONS.forumRetry" alt="" class="btn-icon" aria-hidden="true" />\r
          {{ 'common.retry' | translate }}\r
        </button>\r
      </div>\r
    }\r
\r
    <!-- \u2500\u2500 Content \u2500\u2500 -->\r
    @if (!forumService.isLoading() && !forumService.loadError()) {\r
      @if (posts().length > 0) {\r
        <section class="posts-grid">\r
          @for (post of posts(); track post.id) {\r
            <app-post-card\r
              [post]="post"\r
              [showExcerpt]="true"\r
              [showImage]="true"\r
              [showCategory]="true"\r
              [showAuthor]="true"\r
              [showStats]="true"\r
              (cardClick)="onPostClick($event)"\r
            />\r
          }\r
        </section>\r
\r
        @if (total_pages() > 1) {\r
          <nav class="pagination" aria-label="Pagination">\r
            <button\r
              class="pagination-button"\r
              [disabled]="forumService.current_page() === 1"\r
              (click)="previousPage()"\r
              [attr.aria-label]="'common.previous_page' | translate"\r
            >\r
              \u2039 {{ 'pagination.previous' | translate }}\r
            </button>\r
\r
            <div class="page-numbers">\r
              @for (pageNum of getPageNumbers(); track pageNum) {\r
                @if (pageNum === -1) {\r
                  <span class="pagination-ellipsis">...</span>\r
                } @else {\r
                  <button\r
                    class="page-number"\r
                    [class.active]="forumService.current_page() === pageNum"\r
                    (click)="goToPage(pageNum)"\r
                    [attr.aria-label]="getPageAriaLabel(pageNum)"\r
                    [attr.aria-current]="forumService.current_page() === pageNum ? 'page' : null"\r
                  >\r
                    {{ pageNum }}\r
                  </button>\r
                }\r
              }\r
            </div>\r
\r
            <button\r
              class="pagination-button"\r
              [disabled]="forumService.current_page() === total_pages()"\r
              (click)="nextPage()"\r
              [attr.aria-label]="'common.next_page' | translate"\r
            >\r
              {{ 'pagination.next' | translate }} \u203A\r
            </button>\r
          </nav>\r
        }\r
      } @else if (search_query() || selectedCategory() !== 'all') {\r
        <!-- \u2500\u2500 No results (active search/filter) \u2500\u2500 -->\r
        <div class="empty-state">\r
          <img [src]="IMAGES.stateNoResults" alt="" class="empty-state-img" aria-hidden="true" />\r
          <h3 class="empty-state-title">{{ 'forum.no_results_title' | translate }}</h3>\r
          <p class="empty-state-description">{{ 'forum.no_results_description' | translate }}</p>\r
          <button class="empty-state-action" (click)="resetFilters()">\r
            {{ 'forum.reset_filters' | translate }}\r
          </button>\r
        </div>\r
      } @else {\r
        <!-- \u2500\u2500 Truly empty: no posts on the forum yet \u2500\u2500 -->\r
        <div class="empty-state">\r
          <img [src]="IMAGES.stateEmptyForum" alt="" class="empty-state-img" aria-hidden="true" />\r
          <h3 class="empty-state-title">{{ 'forum.empty_title' | translate }}</h3>\r
          <p class="empty-state-description">{{ 'forum.empty_description' | translate }}</p>\r
          @if (isAuthenticated()) {\r
            <button class="empty-state-action" routerLink="/forum/new">\r
              <img [src]="ICONS.forumNewPost" alt="" class="btn-icon" aria-hidden="true" />\r
              {{ 'forum.new_post' | translate }}\r
            </button>\r
          }\r
        </div>\r
      }\r
    }\r
  </div>\r
</div>\r
`, styles: ['/* src/app/pages/forum/forum.css */\n.forum-page {\n  width: 100%;\n  min-height: 100vh;\n  background: var(--color-background);\n}\n.forum-hero {\n  background:\n    linear-gradient(\n      135deg,\n      #065f36 0%,\n      #067a45 25%,\n      #0b5f39 50%,\n      #044d2c 75%,\n      #023a21 100%);\n  color: white;\n  padding: var(--space-16) var(--space-4) var(--space-12);\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n}\n.forum-hero::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse at 20% 50%,\n      rgba(255, 255, 255, 0.08) 0%,\n      transparent 50%),\n    radial-gradient(\n      ellipse at 80% 20%,\n      rgba(114, 228, 240, 0.06) 0%,\n      transparent 40%),\n    radial-gradient(\n      ellipse at 60% 80%,\n      rgba(255, 255, 255, 0.04) 0%,\n      transparent 45%);\n  pointer-events: none;\n}\n.forum-hero::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.2) 50%,\n      transparent 100%);\n  pointer-events: none;\n}\n.hero-content {\n  max-width: 680px;\n  margin: 0 auto;\n  position: relative;\n  z-index: 1;\n}\n.hero-title {\n  font-size: clamp(1.75rem, 4vw, 2.5rem);\n  font-weight: var(--font-bold);\n  margin: 0 0 var(--space-3) 0;\n  line-height: var(--leading-tight);\n  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n.hero-description {\n  font-size: clamp(1rem, 2vw, 1.125rem);\n  margin: 0;\n  opacity: 0.92;\n  line-height: var(--leading-relaxed);\n}\n.forum-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--space-8) var(--space-4);\n}\n.search-filters {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n  margin-bottom: var(--space-6);\n}\n.search-bar {\n  display: flex;\n  gap: var(--space-3);\n  width: 100%;\n}\n.search-input-wrapper {\n  position: relative;\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n.search-icon {\n  position: absolute;\n  left: var(--space-3);\n  font-size: 18px;\n  pointer-events: none;\n  color: var(--color-text-secondary);\n  line-height: 1;\n}\n.search-input {\n  width: 100%;\n  padding: var(--space-3) var(--space-10) var(--space-3) var(--space-10);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base);\n  background: var(--color-surface);\n  color: var(--color-text-primary);\n  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);\n}\n.search-input::-webkit-search-cancel-button,\n.search-input::-webkit-search-decoration {\n  -webkit-appearance: none;\n  appearance: none;\n  display: none;\n}\n.search-input:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.12);\n}\n.clear-search {\n  position: absolute;\n  right: var(--space-3);\n  background: transparent;\n  border: none;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  font-size: 16px;\n  padding: var(--space-2);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  transition: background var(--transition-fast), color var(--transition-fast);\n}\n.clear-search:hover {\n  background: var(--color-neutral-200);\n  color: var(--color-text-primary);\n}\n.search-button {\n  padding: var(--space-3) var(--space-6);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition:\n    background var(--transition-fast),\n    transform var(--transition-fast),\n    box-shadow var(--transition-fast);\n  white-space: nowrap;\n  min-height: 44px;\n}\n.search-button:hover {\n  background: var(--color-primary-dark);\n  transform: translateY(-1px);\n  box-shadow: var(--shadow-md);\n}\n.search-button:active {\n  transform: translateY(0);\n}\n.toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--space-4);\n}\n.sort-controls {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n}\n.sort-label {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-secondary);\n  white-space: nowrap;\n}\n.sort-select {\n  padding: var(--space-2) var(--space-4);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: var(--color-surface);\n  color: var(--color-text-primary);\n  font-size: var(--text-sm);\n  cursor: pointer;\n  transition: border-color var(--transition-fast);\n  min-height: 40px;\n}\n.sort-select:focus {\n  outline: none;\n  border-color: var(--color-primary);\n}\n.new-post-button {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-secondary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition:\n    background var(--transition-fast),\n    transform var(--transition-fast),\n    box-shadow var(--transition-fast);\n  min-height: 40px;\n  white-space: nowrap;\n}\n.new-post-button:hover {\n  background: var(--color-secondary-dark);\n  transform: translateY(-1px);\n  box-shadow: var(--shadow-sm);\n}\n.category-filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-2);\n  margin-bottom: var(--space-6);\n  padding: var(--space-4);\n  background: var(--color-surface);\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n}\n.category-chip {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-4);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-md);\n  background: var(--color-background);\n  color: var(--color-text-primary);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  min-height: 40px;\n}\n@media (hover: hover) {\n  .category-chip:hover {\n    transform: translateY(-2px);\n    box-shadow: var(--shadow-sm);\n  }\n}\n.category-chip.active {\n  background: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.category-chip.category-medicines.active {\n  background: var(--color-error);\n  border-color: var(--color-error);\n}\n.category-chip.category-natural.active {\n  background: #16a34a;\n  border-color: var(--color-success);\n}\n.category-chip.category-baby.active {\n  background: #d946ef;\n  border-color: #d946ef;\n}\n.category-chip.category-lifestyle.active {\n  background: #2563eb;\n  border-color: var(--color-info);\n}\n.category-chip.category-seasonal.active {\n  background: #ea580c;\n  border-color: var(--color-warning-hover);\n}\n.category-chip.category-qa.active {\n  background: #7c3aed;\n  border-color: #7c3aed;\n}\n.category-chip.category-general.active {\n  background: #6b7280;\n  border-color: #6b7280;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-16) var(--space-4);\n  gap: var(--space-4);\n  color: var(--color-text-secondary);\n}\n.spinner {\n  width: 48px;\n  height: 48px;\n  border: 4px solid var(--color-border);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: spin 0.9s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.posts-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: var(--space-6);\n  margin-bottom: var(--space-8);\n}\n.no-results {\n  text-align: center;\n  padding: var(--space-16) var(--space-4);\n}\n.no-results-icon {\n  font-size: 64px;\n  margin-bottom: var(--space-4);\n  opacity: 0.5;\n  display: block;\n}\n.no-results-title {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  margin: 0 0 var(--space-2) 0;\n}\n.no-results-description {\n  font-size: var(--text-base);\n  color: var(--color-text-secondary);\n  margin: 0 0 var(--space-6) 0;\n}\n.reset-filters-button {\n  padding: var(--space-3) var(--space-6);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-md);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition: background var(--transition-fast), transform var(--transition-fast);\n  min-height: 44px;\n}\n.reset-filters-button:hover {\n  background: var(--color-primary-dark);\n  transform: translateY(-1px);\n}\n.pagination {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-6) 0;\n}\n.pagination-button {\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-surface);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  min-height: 40px;\n}\n.pagination-button:hover:not(:disabled) {\n  background: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.pagination-button:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.page-numbers {\n  display: flex;\n  gap: var(--space-2);\n}\n.page-number {\n  min-width: 40px;\n  height: 40px;\n  padding: var(--space-2);\n  background: var(--color-surface);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n}\n.page-number:hover {\n  background: var(--color-neutral-100);\n  border-color: var(--color-primary);\n}\n.page-number.active {\n  background: var(--color-primary);\n  color: white;\n  border-color: var(--color-primary);\n}\n.pagination-ellipsis {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 40px;\n  height: 40px;\n  color: var(--color-text-secondary);\n  font-weight: var(--font-semibold);\n  pointer-events: none;\n}\n@media (max-width: 768px) {\n  .forum-hero {\n    padding: var(--space-10) var(--space-4) var(--space-8);\n  }\n  .forum-container {\n    padding: var(--space-6) var(--space-3);\n  }\n  .search-bar {\n    flex-direction: column;\n  }\n  .search-button {\n    width: 100%;\n  }\n  .toolbar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .sort-controls {\n    justify-content: space-between;\n  }\n  .new-post-button {\n    justify-content: center;\n  }\n  .category-filters {\n    padding: var(--space-3);\n  }\n  .posts-grid {\n    grid-template-columns: 1fr;\n    gap: var(--space-4);\n  }\n  .pagination {\n    flex-wrap: wrap;\n    gap: var(--space-2);\n  }\n  .page-numbers {\n    order: -1;\n    width: 100%;\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n}\n@media (max-width: 480px) {\n  .forum-hero {\n    padding: var(--space-8) var(--space-3) var(--space-6);\n  }\n  .category-chip {\n    font-size: 12px;\n    padding: var(--space-1) var(--space-3);\n    min-height: 36px;\n    gap: var(--space-1);\n  }\n  .category-icon {\n    font-size: 14px;\n  }\n  .page-number,\n  .pagination-button {\n    min-width: 36px;\n    height: 36px;\n    font-size: 13px;\n  }\n}\n@media (max-width: 375px) {\n  .forum-container {\n    padding: var(--space-4) var(--space-3);\n  }\n  .search-input {\n    font-size: var(--text-sm);\n  }\n  .no-results-icon {\n    font-size: 48px;\n  }\n  .no-results-title {\n    font-size: var(--text-xl);\n  }\n}\n[data-theme=dark] .forum-hero {\n  background:\n    linear-gradient(\n      135deg,\n      #044d2c 0%,\n      #065f36 25%,\n      #0b5f39 50%,\n      #033d23 75%,\n      #022b18 100%);\n}\n[data-theme=dark] .category-filters {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-700);\n}\n[data-theme=dark] .category-chip {\n  background: var(--color-neutral-900);\n  border-color: var(--color-neutral-600);\n  color: var(--color-neutral-200);\n}\n[data-theme=dark] .category-chip:hover {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-500);\n}\n[data-theme=dark] .search-input {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-600);\n  color: var(--color-neutral-100);\n}\n[data-theme=dark] .search-input:focus {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.2);\n}\n[data-theme=dark] .sort-select {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-600);\n  color: var(--color-neutral-100);\n}\n[data-theme=dark] .pagination-button,\n[data-theme=dark] .page-number {\n  background: var(--color-neutral-800);\n  border-color: var(--color-neutral-600);\n  color: var(--color-neutral-200);\n}\n[data-theme=dark] .page-number:hover {\n  background: var(--color-neutral-700);\n  border-color: var(--color-primary);\n}\n[data-theme=dark] .clear-search:hover {\n  background: var(--color-neutral-700);\n  color: var(--color-neutral-100);\n}\n@media (prefers-reduced-motion: reduce) {\n  .spinner {\n    animation: none;\n    border-top-color: var(--color-primary);\n    opacity: 0.7;\n  }\n  .category-chip,\n  .search-button,\n  .new-post-button,\n  .page-number,\n  .pagination-button {\n    transition: none;\n  }\n}\n.blog-hero {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-secondary) 0%,\n      var(--color-secondary-dark) 100%);\n  color: white;\n  padding: var(--space-16) var(--space-4) var(--space-8);\n}\n.blog-hero .hero-content {\n  max-width: 800px;\n  margin: 0 auto;\n  text-align: center;\n  margin-bottom: var(--space-10);\n}\n.featured-posts {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.featured-title {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  margin: 0 0 var(--space-6) 0;\n  text-align: center;\n}\n.featured-carousel {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: var(--space-6);\n}\n.featured-card {\n  background: white;\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  cursor: pointer;\n  transition: all var(--transition-normal);\n  box-shadow: var(--shadow-lg);\n}\n.featured-card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);\n}\n[data-theme=dark] .featured-card {\n  background: var(--color-neutral-800);\n}\n.featured-image {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  overflow: hidden;\n  background: var(--color-neutral-100);\n}\n.featured-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform var(--transition-normal);\n}\n.featured-card:hover .featured-image img {\n  transform: scale(1.1);\n}\n.featured-content {\n  padding: var(--space-5);\n}\n.featured-category {\n  font-size: var(--text-xs);\n  font-weight: var(--font-semibold);\n  margin-bottom: var(--space-2);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.featured-post-title {\n  font-size: var(--text-xl);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0 0 var(--space-3) 0;\n  line-height: var(--leading-tight);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n[data-theme=dark] .featured-post-title {\n  color: white;\n}\n.featured-excerpt {\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-normal);\n  margin: 0 0 var(--space-4) 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n[data-theme=dark] .featured-excerpt {\n  color: var(--color-neutral-400);\n}\n.featured-meta {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: var(--text-xs);\n  color: var(--color-text-secondary);\n  padding-top: var(--space-3);\n  border-top: 1px solid var(--color-border);\n}\n[data-theme=dark] .featured-meta {\n  color: var(--color-neutral-400);\n  border-color: var(--color-neutral-700);\n}\n.author {\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n}\n[data-theme=dark] .author {\n  color: white;\n}\n.reading-time {\n  display: flex;\n  align-items: center;\n  gap: var(--space-1);\n}\n.results-count {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-secondary);\n}\n[data-theme=dark] .blog-hero {\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-secondary) 0%,\n      #065f46 100%);\n}\n@media (max-width: 768px) {\n  .blog-hero {\n    padding: var(--space-10) var(--space-4) var(--space-6);\n  }\n  .blog-hero .hero-content {\n    margin-bottom: var(--space-6);\n  }\n  .featured-title {\n    font-size: var(--text-xl);\n  }\n  .featured-carousel {\n    grid-template-columns: 1fr;\n    gap: var(--space-4);\n  }\n}\n/*# sourceMappingURL=forum.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Forum, { className: "Forum", filePath: "src/app/pages/forum/forum.ts", lineNumber: 19 });
})();
export {
  Forum
};
//# sourceMappingURL=chunk-3IGUV2OL.js.map
