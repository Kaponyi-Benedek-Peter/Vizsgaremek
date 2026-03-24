import {
  ProductService
} from "./chunk-KG3HXK6P.js";
import {
  ICONS,
  getCategoryIcon,
  getImageUrl
} from "./chunk-B4AVD7OH.js";
import {
  CartService,
  CurrencyService,
  takeUntilDestroyed,
  toSignal
} from "./chunk-2QWXMZZS.js";
import {
  FormsModule,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-646OUKHF.js";
import {
  TranslationService
} from "./chunk-NEOTYJOM.js";
import {
  Router,
  RouterLink
} from "./chunk-YSEAUUG4.js";
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  Subject,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
  debounceTime,
  distinctUntilChanged,
  inject,
  interval,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-WLHV2EEC.js";

// src/app/shared/components/category-item/category-item.ts
function CategoryItem_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 1);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.category.icon);
  }
}
var CategoryItem = class _CategoryItem {
  category;
  isSelected = false;
  categoryClick = new EventEmitter();
  translateService = inject(TranslateService);
  /**
   * Returns the category name in the currently active language.
   * Falls back to English if the localized name is missing.
   */
  get display_name() {
    const lang = this.translateService.currentLang || "hu";
    switch (lang) {
      case "hu":
        return this.category.name_hu || this.category.name_en;
      case "de":
        return this.category.name_de || this.category.name_en;
      default:
        return this.category.name_en;
    }
  }
  handleClick() {
    this.categoryClick.emit(this.category);
  }
  static \u0275fac = function CategoryItem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryItem)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryItem, selectors: [["app-category-item"]], inputs: { category: "category", isSelected: "isSelected" }, outputs: { categoryClick: "categoryClick" }, decls: 6, vars: 7, consts: [[1, "category-item", 3, "click"], [1, "category-icon"], [1, "category-name"], [1, "category-count"]], template: function CategoryItem_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "button", 0);
      \u0275\u0275domListener("click", function CategoryItem_Template_button_click_0_listener() {
        return ctx.handleClick();
      });
      \u0275\u0275conditionalCreate(1, CategoryItem_Conditional_1_Template, 2, 1, "span", 1);
      \u0275\u0275domElementStart(2, "span", 2);
      \u0275\u0275text(3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "span", 3);
      \u0275\u0275text(5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("active", ctx.isSelected);
      \u0275\u0275attribute("aria-label", ctx.display_name)("aria-pressed", ctx.isSelected);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.category.icon ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.display_name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("(", ctx.category.count, ")");
    }
  }, styles: ["\n\n.category-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-3) var(--space-5);\n  background: var(--color-surface);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-full);\n  cursor: pointer;\n  font-family: var(--font-primary);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  transition: all var(--transition-fast);\n  white-space: nowrap;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.category-item[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-light);\n  border-color: var(--color-primary);\n  transform: translateY(-1px);\n}\n.category-item[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.category-item.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-text-on-primary);\n  box-shadow: var(--shadow-md);\n}\n.category-icon[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.category-name[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n.category-count[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  opacity: 0.8;\n  font-weight: var(--font-normal);\n}\n@media (max-width: 640px) {\n  .category-item[_ngcontent-%COMP%] {\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-xs);\n  }\n}\n/*# sourceMappingURL=category-item.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryItem, [{
    type: Component,
    args: [{ selector: "app-category-item", imports: [], template: '<button\r\n  class="category-item"\r\n  [class.active]="isSelected"\r\n  (click)="handleClick()"\r\n  [attr.aria-label]="display_name"\r\n  [attr.aria-pressed]="isSelected"\r\n>\r\n  @if (category.icon) {\r\n    <span class="category-icon">{{ category.icon }}</span>\r\n  }\r\n\r\n  <span class="category-name">{{ display_name }}</span>\r\n\r\n  <span class="category-count">({{ category.count }})</span>\r\n</button>\r\n', styles: ["/* src/app/shared/components/category-item/category-item.css */\n.category-item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-3) var(--space-5);\n  background: var(--color-surface);\n  border: 2px solid var(--color-border);\n  border-radius: var(--radius-full);\n  cursor: pointer;\n  font-family: var(--font-primary);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  transition: all var(--transition-fast);\n  white-space: nowrap;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.category-item:hover {\n  background: var(--color-primary-light);\n  border-color: var(--color-primary);\n  transform: translateY(-1px);\n}\n.category-item:active {\n  transform: translateY(0);\n}\n.category-item.active {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-text-on-primary);\n  box-shadow: var(--shadow-md);\n}\n.category-icon {\n  font-size: var(--text-lg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.category-name {\n  line-height: 1;\n}\n.category-count {\n  font-size: var(--text-xs);\n  opacity: 0.8;\n  font-weight: var(--font-normal);\n}\n@media (max-width: 640px) {\n  .category-item {\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-xs);\n  }\n}\n/*# sourceMappingURL=category-item.css.map */\n"] }]
  }], null, { category: [{
    type: Input,
    args: [{ required: true }]
  }], isSelected: [{
    type: Input
  }], categoryClick: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryItem, { className: "CategoryItem", filePath: "src/app/shared/components/category-item/category-item.ts", lineNumber: 11 });
})();

// src/app/shared/components/category-bar/category-bar.ts
var _forTrack0 = ($index, $item) => $item.id;
function CategoryBar_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("click", function CategoryBar_Conditional_0_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.handleClearAll());
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 2, "category.clear_all"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 4, "category.clear_all"), " ");
  }
}
function CategoryBar_Conditional_0_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-category-item", 11);
    \u0275\u0275listener("categoryClick", function CategoryBar_Conditional_0_For_13_Template_app_category_item_categoryClick_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.handleCategoryClick($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("category", category_r5)("isSelected", ctx_r2.isCategorySelected(category_r5.id));
  }
}
function CategoryBar_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CategoryBar_Conditional_0_Conditional_5_Template, 4, 6, "button", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 4)(7, "button", 5);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275listener("click", function CategoryBar_Conditional_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.scrollLeft());
    });
    \u0275\u0275text(9, " \u2039 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 6)(11, "div", 7);
    \u0275\u0275repeaterCreate(12, CategoryBar_Conditional_0_For_13_Template, 1, 2, "app-category-item", 8, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 9);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275listener("click", function CategoryBar_Conditional_0_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.scrollRight());
    });
    \u0275\u0275text(16, " \u203A ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, "category.filter_by"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selectedCategories.length > 0 ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(8, 6, "common.scroll_left"));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.categories);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(15, 8, "common.scroll_right"));
  }
}
var CategoryBar = class _CategoryBar {
  categories = [];
  selectedCategories = [];
  categorySelected = new EventEmitter();
  clearCategories = new EventEmitter();
  scrollPosition = signal(0, ...ngDevMode ? [{ debugName: "scrollPosition" }] : []);
  isCategorySelected(categoryId) {
    return this.selectedCategories.includes(categoryId);
  }
  handleCategoryClick(category) {
    this.categorySelected.emit(category.id);
  }
  handleClearAll() {
    this.clearCategories.emit();
  }
  scrollLeft() {
    const container = document.querySelector(".categories-scroll");
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  }
  scrollRight() {
    const container = document.querySelector(".categories-scroll");
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  }
  static \u0275fac = function CategoryBar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryBar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryBar, selectors: [["app-category-bar"]], inputs: { categories: "categories", selectedCategories: "selectedCategories" }, outputs: { categorySelected: "categorySelected", clearCategories: "clearCategories" }, decls: 1, vars: 1, consts: [[1, "category-bar"], [1, "category-bar-header"], [1, "category-title"], [1, "clear-button"], [1, "category-bar-wrapper"], [1, "scroll-button", "scroll-left", 3, "click"], [1, "categories-scroll"], [1, "categories-container"], [3, "category", "isSelected"], [1, "scroll-button", "scroll-right", 3, "click"], [1, "clear-button", 3, "click"], [3, "categoryClick", "category", "isSelected"]], template: function CategoryBar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, CategoryBar_Conditional_0_Template, 17, 10, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.categories.length > 0 ? 0 : -1);
    }
  }, dependencies: [TranslateModule, CategoryItem, TranslatePipe], styles: ["\n\n.category-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--color-surface);\n  border-bottom: 1px solid var(--color-border);\n  padding: var(--space-4) 0;\n}\n.category-bar-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 var(--space-6);\n  margin-bottom: var(--space-3);\n}\n.category-title[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  margin: 0;\n}\n.clear-button[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-4);\n  background: transparent;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  color: var(--color-text-secondary);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n}\n.clear-button[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-light);\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.category-bar-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.scroll-button[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  box-shadow: var(--shadow-md);\n  display: flex;\n  justify-content: center;\n  cursor: pointer;\n  font-size: var(--text-2xl);\n  line-height: 1;\n  color: var(--color-text-primary);\n  transition: all var(--transition-fast);\n  z-index: var(--z-dropdown);\n  font-family: var(--font-primary);\n}\n.scroll-button[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary);\n  color: var(--color-text-on-primary);\n  border-color: var(--color-primary);\n}\n.scroll-left[_ngcontent-%COMP%] {\n  left: var(--space-4);\n}\n.scroll-right[_ngcontent-%COMP%] {\n  right: var(--space-4);\n}\n.categories-scroll[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-x: auto;\n  overflow-y: hidden;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  padding: 0 var(--space-16);\n}\n.categories-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.categories-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-3);\n  padding: var(--space-2) 0;\n  min-width: min-content;\n}\n@media (max-width: 768px) {\n  .category-bar-header[_ngcontent-%COMP%] {\n    padding: 0 var(--space-4);\n  }\n  .scroll-button[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-xl);\n  }\n  .scroll-left[_ngcontent-%COMP%] {\n    left: var(--space-2);\n  }\n  .scroll-right[_ngcontent-%COMP%] {\n    right: var(--space-2);\n  }\n  .categories-scroll[_ngcontent-%COMP%] {\n    padding: 0 var(--space-12);\n  }\n}\n@media (max-width: 480px) {\n  .category-bar[_ngcontent-%COMP%] {\n    padding: var(--space-3) 0;\n  }\n  .category-bar-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: var(--space-2);\n  }\n  .scroll-button[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .categories-scroll[_ngcontent-%COMP%] {\n    padding: 0 var(--space-4);\n  }\n}\n/*# sourceMappingURL=category-bar.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryBar, [{
    type: Component,
    args: [{ selector: "app-category-bar", imports: [TranslateModule, CategoryItem], template: `@if (categories.length > 0) {\r
  <div class="category-bar">\r
    <div class="category-bar-header">\r
      <h3 class="category-title">{{ 'category.filter_by' | translate }}</h3>\r
\r
      @if (selectedCategories.length > 0) {\r
        <button\r
          class="clear-button"\r
          (click)="handleClearAll()"\r
          [attr.aria-label]="'category.clear_all' | translate"\r
        >\r
          {{ 'category.clear_all' | translate }}\r
        </button>\r
      }\r
    </div>\r
\r
    <div class="category-bar-wrapper">\r
      <button\r
        class="scroll-button scroll-left"\r
        (click)="scrollLeft()"\r
        [attr.aria-label]="'common.scroll_left' | translate"\r
      >\r
        \u2039\r
      </button>\r
\r
      <div class="categories-scroll">\r
        <div class="categories-container">\r
          @for (category of categories; track category.id) {\r
            <app-category-item\r
              [category]="category"\r
              [isSelected]="isCategorySelected(category.id)"\r
              (categoryClick)="handleCategoryClick($event)"\r
            />\r
          }\r
        </div>\r
      </div>\r
\r
      <button\r
        class="scroll-button scroll-right"\r
        (click)="scrollRight()"\r
        [attr.aria-label]="'common.scroll_right' | translate"\r
      >\r
        \u203A\r
      </button>\r
    </div>\r
  </div>\r
}\r
`, styles: ["/* src/app/shared/components/category-bar/category-bar.css */\n.category-bar {\n  width: 100%;\n  background: var(--color-surface);\n  border-bottom: 1px solid var(--color-border);\n  padding: var(--space-4) 0;\n}\n.category-bar-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 var(--space-6);\n  margin-bottom: var(--space-3);\n}\n.category-title {\n  font-size: var(--text-lg);\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  margin: 0;\n}\n.clear-button {\n  padding: var(--space-2) var(--space-4);\n  background: transparent;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  color: var(--color-text-secondary);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n}\n.clear-button:hover {\n  background: var(--color-primary-light);\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n.category-bar-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.scroll-button {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  box-shadow: var(--shadow-md);\n  display: flex;\n  justify-content: center;\n  cursor: pointer;\n  font-size: var(--text-2xl);\n  line-height: 1;\n  color: var(--color-text-primary);\n  transition: all var(--transition-fast);\n  z-index: var(--z-dropdown);\n  font-family: var(--font-primary);\n}\n.scroll-button:hover {\n  background: var(--color-primary);\n  color: var(--color-text-on-primary);\n  border-color: var(--color-primary);\n}\n.scroll-left {\n  left: var(--space-4);\n}\n.scroll-right {\n  right: var(--space-4);\n}\n.categories-scroll {\n  flex: 1;\n  overflow-x: auto;\n  overflow-y: hidden;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  padding: 0 var(--space-16);\n}\n.categories-scroll::-webkit-scrollbar {\n  display: none;\n}\n.categories-container {\n  display: flex;\n  gap: var(--space-3);\n  padding: var(--space-2) 0;\n  min-width: min-content;\n}\n@media (max-width: 768px) {\n  .category-bar-header {\n    padding: 0 var(--space-4);\n  }\n  .scroll-button {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-xl);\n  }\n  .scroll-left {\n    left: var(--space-2);\n  }\n  .scroll-right {\n    right: var(--space-2);\n  }\n  .categories-scroll {\n    padding: 0 var(--space-12);\n  }\n}\n@media (max-width: 480px) {\n  .category-bar {\n    padding: var(--space-3) 0;\n  }\n  .category-bar-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: var(--space-2);\n  }\n  .scroll-button {\n    display: none;\n  }\n  .categories-scroll {\n    padding: 0 var(--space-4);\n  }\n}\n/*# sourceMappingURL=category-bar.css.map */\n"] }]
  }], null, { categories: [{
    type: Input,
    args: [{ required: true }]
  }], selectedCategories: [{
    type: Input
  }], categorySelected: [{
    type: Output
  }], clearCategories: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryBar, { className: "CategoryBar", filePath: "src/app/shared/components/category-bar/category-bar.ts", lineNumber: 12 });
})();

// src/app/shared/components/product-card/product-card.ts
var _c0 = (a0) => ["/products", a0];
function ProductCard_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" -", ctx_r0.product.discount_percentage, "% ");
  }
}
function ProductCard_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275text(2, " \u211E ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("title", \u0275\u0275pipeBind1(1, 1, "product.requires_prescription"));
  }
}
function ProductCard_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "product.out_of_stock"));
  }
}
function ProductCard_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.categoryName, " ");
  }
}
function ProductCard_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.localizedDescription());
  }
}
function ProductCard_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13)(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 2, "product.manufacturer"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.product.manufacturer);
  }
}
function ProductCard_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getRatingStars());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.product.rating_number.toFixed(1));
  }
}
function ProductCard_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formattedPrice);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formattedDiscountedPrice);
  }
}
function ProductCard_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.formattedPrice);
  }
}
function ProductCard_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "button", 30);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275listener("click", function ProductCard_Conditional_20_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.decreaseQuantity());
    });
    \u0275\u0275text(3, " \u2212 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 30);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275listener("click", function ProductCard_Conditional_20_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.increaseQuantity());
    });
    \u0275\u0275text(8, " + ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("disabled", !ctx_r0.product.in_stock);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.quantity() <= 1 || !ctx_r0.product.in_stock);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(2, 7, "product.decrease_quantity"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.quantity());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.quantity() >= ctx_r0.product.stock_quantity || !ctx_r0.product.in_stock);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(7, 9, "product.increase_quantity"));
  }
}
function ProductCard_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("click", function ProductCard_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onViewDetails());
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 2, "product.view_details") + ": " + ctx_r0.localizedName());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 4, "product.view_details"), " ");
  }
}
var ProductCard = class _ProductCard {
  product;
  compact = false;
  addToCart = new EventEmitter();
  viewDetails = new EventEmitter();
  quantityChange = new EventEmitter();
  getImageUrl = getImageUrl;
  getCategoryIcon = getCategoryIcon;
  // Expose ICONS to template
  icons = ICONS;
  quantity = signal(1, ...ngDevMode ? [{ debugName: "quantity" }] : []);
  currencyService = inject(CurrencyService);
  productService = inject(ProductService);
  translationService = inject(TranslationService);
  router = inject(Router);
  currentLang = toSignal(this.translationService.currentLang$, {
    initialValue: this.translationService.getCurrentLanguage()
  });
  get has_discount() {
    return this.product.has_discount;
  }
  get formattedPrice() {
    return this.currencyService.formatPrice(this.currencyService.getBasePrice(this.product));
  }
  get formattedDiscountedPrice() {
    return this.currencyService.formatPrice(this.currencyService.getDiscountedPrice(this.product));
  }
  get canAddToCart() {
    return this.product.in_stock && !this.product.requires_prescription && this.quantity() <= this.product.stock_quantity;
  }
  get hasRating() {
    return this.product.rating_number > 0;
  }
  localizedName = computed(() => {
    const lang = this.currentLang();
    if (lang === "hu")
      return this.product.name_hu || this.product.name;
    if (lang === "de")
      return this.product.name_de || this.product.name;
    return this.product.name_en || this.product.name;
  }, ...ngDevMode ? [{ debugName: "localizedName" }] : []);
  localizedDescription = computed(() => {
    const lang = this.currentLang();
    if (lang === "hu")
      return this.product.description_hu || this.product.description;
    if (lang === "de")
      return this.product.description_de || this.product.description;
    return this.product.description_en || this.product.description;
  }, ...ngDevMode ? [{ debugName: "localizedDescription" }] : []);
  get categoryName() {
    const cat = this.productService.getCategoryById(this.product.category);
    const lang = this.currentLang();
    if (!cat)
      return "";
    return lang === "hu" ? cat.name_hu : lang === "de" ? cat.name_de : cat.name_en;
  }
  getRatingStars() {
    const rating = this.product.rating_number;
    if (!rating)
      return "";
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return "\u2605".repeat(full) + (half ? "\u2BE8" : "") + "\u2606".repeat(empty);
  }
  increaseQuantity() {
    if (this.quantity() < this.product.stock_quantity) {
      this.quantity.update((q) => q + 1);
      this.quantityChange.emit({ product: this.product, quantity: this.quantity() });
    }
  }
  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
      this.quantityChange.emit({ product: this.product, quantity: this.quantity() });
    }
  }
  onAddToCart() {
    this.addToCart.emit({ product: this.product, quantity: this.quantity() });
  }
  onViewDetails() {
    this.viewDetails.emit(this.product);
    this.router.navigate(["/products", this.product.id]);
  }
  static \u0275fac = function ProductCard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductCard)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductCard, selectors: [["app-product-card"]], inputs: { product: "product", compact: "compact" }, outputs: { addToCart: "addToCart", viewDetails: "viewDetails", quantityChange: "quantityChange" }, decls: 27, vars: 33, consts: [[1, "product-card"], [1, "product-link", 3, "routerLink"], [1, "product-image-wrapper"], ["loading", "lazy", 1, "product-image", 3, "src", "alt"], [1, "product-image-overlay"], [1, "badges"], [1, "badge", "discount-badge"], [1, "badge", "prescription-badge", 3, "title"], [1, "out-of-stock-overlay"], [1, "product-content"], [1, "product-category"], [1, "product-title"], [1, "product-description"], [1, "product-meta"], [1, "product-rating"], [1, "product-price-section"], [1, "price-with-discount"], [1, "price"], [1, "product-actions"], [1, "quantity-controls", 3, "disabled"], [1, "add-to-cart-button", 3, "click", "disabled"], ["alt", "", "aria-hidden", "true", 1, "button-icon", 3, "src"], [1, "details-button"], [1, "meta-label"], [1, "meta-value"], [1, "rating-stars"], [1, "rating-value"], [1, "original-price"], [1, "discounted-price"], [1, "quantity-controls"], [1, "quantity-btn", 3, "click", "disabled"], [1, "quantity-value"], [1, "details-button", 3, "click"]], template: function ProductCard_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "article", 0)(1, "a", 1)(2, "div", 2);
      \u0275\u0275element(3, "img", 3)(4, "div", 4);
      \u0275\u0275elementStart(5, "div", 5);
      \u0275\u0275conditionalCreate(6, ProductCard_Conditional_6_Template, 2, 1, "span", 6);
      \u0275\u0275conditionalCreate(7, ProductCard_Conditional_7_Template, 3, 3, "span", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, ProductCard_Conditional_8_Template, 4, 3, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 9);
      \u0275\u0275conditionalCreate(10, ProductCard_Conditional_10_Template, 2, 1, "span", 10);
      \u0275\u0275elementStart(11, "h3", 11);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, ProductCard_Conditional_13_Template, 2, 1, "p", 12);
      \u0275\u0275conditionalCreate(14, ProductCard_Conditional_14_Template, 6, 4, "p", 13);
      \u0275\u0275conditionalCreate(15, ProductCard_Conditional_15_Template, 5, 2, "div", 14);
      \u0275\u0275elementStart(16, "div", 15);
      \u0275\u0275conditionalCreate(17, ProductCard_Conditional_17_Template, 5, 2, "div", 16)(18, ProductCard_Conditional_18_Template, 2, 1, "span", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 18);
      \u0275\u0275conditionalCreate(20, ProductCard_Conditional_20_Template, 9, 11, "div", 19);
      \u0275\u0275elementStart(21, "button", 20);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275listener("click", function ProductCard_Template_button_click_21_listener() {
        return ctx.onAddToCart();
      });
      \u0275\u0275element(23, "img", 21);
      \u0275\u0275text(24);
      \u0275\u0275pipe(25, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(26, ProductCard_Conditional_26_Template, 4, 6, "button", 22);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("compact", ctx.compact)("out-of-stock", !ctx.product.in_stock);
      \u0275\u0275attribute("aria-label", ctx.localizedName());
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(31, _c0, ctx.product.id));
      \u0275\u0275advance(2);
      \u0275\u0275property("src", ctx.product.image_url, \u0275\u0275sanitizeUrl)("alt", ctx.localizedName());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.has_discount ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.product.requires_prescription ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.product.in_stock ? 8 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.compact && ctx.categoryName ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("compact", ctx.compact);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.localizedName(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.compact ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.product.manufacturer && !ctx.compact ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasRating && !ctx.compact ? 15 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.has_discount ? 17 : 18);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.compact ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("compact", ctx.compact);
      \u0275\u0275property("disabled", !ctx.canAddToCart);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(22, 27, "common.add_to_cart") + ": " + ctx.localizedName());
      \u0275\u0275advance(2);
      \u0275\u0275property("src", ctx.icons.basket, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(25, 29, "common.add_to_cart"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.compact ? 26 : -1);
    }
  }, dependencies: [TranslateModule, RouterLink, TranslatePipe], styles: ['\n\n.product-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  overflow: hidden;\n  transition:\n    box-shadow var(--transition-normal),\n    transform var(--transition-bounce),\n    border-color var(--transition-normal);\n  height: 100%;\n  position: relative;\n}\n.product-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: var(--gradient-primary);\n  opacity: 0;\n  transition: opacity var(--transition-normal);\n  z-index: 1;\n}\n@media (hover: hover) and (pointer: fine) {\n  .product-card[_ngcontent-%COMP%]:hover {\n    box-shadow: var(--shadow-xl), 0 0 0 1px var(--color-primary-mid);\n    transform: translateY(-6px);\n    border-color: var(--color-primary);\n  }\n  .product-card[_ngcontent-%COMP%]:hover::before {\n    opacity: 1;\n  }\n  .product-card[_ngcontent-%COMP%]:hover   .product-image[_ngcontent-%COMP%] {\n    transform: scale(1.07);\n  }\n  .product-card[_ngcontent-%COMP%]:hover   .product-image-overlay[_ngcontent-%COMP%] {\n    opacity: 1;\n  }\n}\n@media (hover: none) {\n  .product-card[_ngcontent-%COMP%]:active {\n    border-color: var(--color-primary);\n    box-shadow: var(--shadow-md);\n  }\n}\n.product-card.out-of-stock[_ngcontent-%COMP%] {\n  opacity: 0.72;\n}\n.product-card.compact[_ngcontent-%COMP%] {\n  flex-direction: row;\n  height: auto;\n  border-radius: var(--radius-lg);\n}\n.product-link[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: inherit;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.product-card.compact[_ngcontent-%COMP%]   .product-link[_ngcontent-%COMP%] {\n  flex-direction: row;\n}\n.product-image-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 210px;\n  background: var(--gradient-image-bg);\n  overflow: hidden;\n  padding: 16px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.product-card.compact[_ngcontent-%COMP%]   .product-image-wrapper[_ngcontent-%COMP%] {\n  width: 120px;\n  min-width: 120px;\n  height: 120px;\n  padding: 8px;\n  flex-shrink: 0;\n}\n.product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n  transition: transform var(--transition-slow);\n  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));\n}\n.product-image-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(255, 255, 255, 0.08) 0%,\n      transparent 50%,\n      rgba(6, 122, 69, 0.06) 100%);\n  opacity: 0;\n  transition: opacity var(--transition-normal);\n  pointer-events: none;\n}\n.badges[_ngcontent-%COMP%] {\n  position: absolute;\n  top: var(--space-3);\n  right: var(--space-3);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  z-index: var(--z-base);\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: var(--radius-full);\n  font-size: 0.7rem;\n  font-weight: var(--font-bold);\n  text-align: center;\n  box-shadow: var(--shadow-sm);\n  letter-spacing: 0.03em;\n}\n.discount-badge[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #dc2626,\n      #ef4444);\n  color: white;\n  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);\n}\n.prescription-badge[_ngcontent-%COMP%] {\n  background: var(--gradient-primary);\n  color: white;\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--text-lg);\n  padding: 0;\n  box-shadow: var(--shadow-primary);\n}\n.out-of-stock-badge[_ngcontent-%COMP%] {\n  background: rgba(85, 85, 85, 0.9);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  color: white;\n}\n.out-of-stock-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: var(--z-base);\n}\n.out-of-stock-overlay[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.95);\n  color: #000000;\n  padding: var(--space-2) var(--space-5);\n  border-radius: var(--radius-full);\n  font-weight: var(--font-semibold);\n  font-size: var(--text-sm);\n  box-shadow: var(--shadow-md);\n}\n.product-content[_ngcontent-%COMP%] {\n  padding: var(--space-5) var(--space-4) var(--space-3);\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.product-card.compact[_ngcontent-%COMP%]   .product-content[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  gap: var(--space-1);\n}\n.product-category[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  font-weight: var(--font-bold);\n  letter-spacing: 0.08em;\n}\n.product-title[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0;\n  line-height: var(--leading-tight);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.product-title.compact[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  -webkit-line-clamp: 1;\n}\n.product-description[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-normal);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  margin: 0;\n}\n.product-meta[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--color-text-tertiary);\n  margin: 0;\n}\n.meta-label[_ngcontent-%COMP%] {\n  font-weight: var(--font-medium);\n}\n.meta-value[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n}\n.product-rating[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n}\n.rating-stars[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n  letter-spacing: -1px;\n}\n.rating-value[_ngcontent-%COMP%] {\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n}\n.rating-count[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  font-size: var(--text-xs);\n}\n.product-price-section[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: var(--space-3);\n  border-top: 1px solid var(--color-border);\n}\n.price[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-extrabold);\n  color: var(--color-primary);\n  line-height: 1;\n}\n.product-card.compact[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n}\n.price-with-discount[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n}\n.original-price[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-tertiary);\n  text-decoration: line-through;\n}\n.discounted-price[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-extrabold);\n  color: var(--color-error);\n  line-height: 1;\n}\n.product-card.compact[_ngcontent-%COMP%]   .discounted-price[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n}\n.product-actions[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4) var(--space-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.product-card.compact[_ngcontent-%COMP%]   .product-actions[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  padding-top: 0;\n  flex-direction: row;\n  align-items: center;\n}\n.quantity-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-3);\n  padding: var(--space-2);\n  background: var(--color-surface-elevated);\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n}\n.quantity-controls.disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.quantity-btn[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: var(--radius-md);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  font-size: var(--text-xl);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  line-height: 1;\n  box-shadow: var(--shadow-sm);\n}\n@media (hover: hover) and (pointer: fine) {\n  .quantity-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--gradient-primary-hover);\n    transform: scale(1.08);\n    box-shadow: var(--shadow-primary);\n  }\n}\n.quantity-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  background: var(--color-text-tertiary);\n  box-shadow: none;\n}\n.quantity-value[_ngcontent-%COMP%] {\n  min-width: 36px;\n  text-align: center;\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n}\n.add-to-cart-button[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  font-family: var(--font-primary);\n  min-height: 44px;\n  box-shadow: var(--shadow-primary);\n  letter-spacing: 0.01em;\n}\n.add-to-cart-button[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: brightness(0) saturate(100%) invert(1);\n}\n.add-to-cart-button.compact[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-3);\n  font-size: var(--text-sm);\n  min-height: 44px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .add-to-cart-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--gradient-primary-hover);\n    box-shadow: var(--shadow-primary-lg);\n    transform: translateY(-2px);\n  }\n}\n.add-to-cart-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  box-shadow: none;\n  transform: none;\n  background: var(--color-text-secondary);\n}\n.button-icon[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n}\n.details-button[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-2) var(--space-4);\n  background: transparent;\n  color: var(--color-primary);\n  border: 2px solid var(--color-primary);\n  border-radius: var(--radius-lg);\n  font-size: var(--text-sm);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .details-button[_ngcontent-%COMP%]:hover {\n    background: var(--color-primary);\n    color: white;\n    box-shadow: var(--shadow-primary);\n    transform: translateY(-1px);\n  }\n}\n@media (max-width: 768px) {\n  .product-card.compact[_ngcontent-%COMP%]   .product-image-wrapper[_ngcontent-%COMP%] {\n    width: 100px;\n    min-width: 100px;\n    height: 100px;\n  }\n  .product-content[_ngcontent-%COMP%] {\n    padding: var(--space-4) var(--space-3) var(--space-2);\n  }\n  .product-title[_ngcontent-%COMP%] {\n    font-size: var(--text-base);\n  }\n  .product-actions[_ngcontent-%COMP%] {\n    padding: var(--space-2) var(--space-3) var(--space-3);\n  }\n}\n@media (max-width: 375px) {\n  .product-card.compact[_ngcontent-%COMP%]   .product-image-wrapper[_ngcontent-%COMP%] {\n    width: 80px;\n    min-width: 80px;\n    height: 80px;\n    padding: 6px;\n  }\n  .product-content[_ngcontent-%COMP%] {\n    padding: var(--space-2) var(--space-3);\n    gap: var(--space-1);\n  }\n  .product-title[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n  }\n  .price[_ngcontent-%COMP%], \n   .discounted-price[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .product-card[_ngcontent-%COMP%], \n   .product-image[_ngcontent-%COMP%], \n   .quantity-btn[_ngcontent-%COMP%], \n   .add-to-cart-button[_ngcontent-%COMP%], \n   .details-button[_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .product-card[_ngcontent-%COMP%]::before {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=product-card.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductCard, [{
    type: Component,
    args: [{ selector: "app-product-card", standalone: true, imports: [TranslateModule, RouterLink], template: `<article\r
  class="product-card"\r
  [class.compact]="compact"\r
  [class.out-of-stock]="!product.in_stock"\r
  [attr.aria-label]="localizedName()"\r
>\r
  <a [routerLink]="['/products', product.id]" class="product-link">\r
    <div class="product-image-wrapper">\r
      <img [src]="product.image_url" [alt]="localizedName()" class="product-image" loading="lazy" />\r
\r
      <div class="product-image-overlay"></div>\r
\r
      <div class="badges">\r
        @if (has_discount) {\r
          <span class="badge discount-badge"> -{{ product.discount_percentage }}% </span>\r
        }\r
\r
        @if (product.requires_prescription) {\r
          <span\r
            class="badge prescription-badge"\r
            [title]="'product.requires_prescription' | translate"\r
          >\r
            \u211E\r
          </span>\r
        }\r
      </div>\r
\r
      @if (!product.in_stock) {\r
        <div class="out-of-stock-overlay">\r
          <span>{{ 'product.out_of_stock' | translate }}</span>\r
        </div>\r
      }\r
    </div>\r
\r
    <div class="product-content">\r
      @if (!compact && categoryName) {\r
        <span class="product-category">\r
          {{ categoryName }}\r
        </span>\r
      }\r
\r
      <h3 class="product-title" [class.compact]="compact">\r
        {{ localizedName() }}\r
      </h3>\r
\r
      @if (!compact) {\r
        <p class="product-description">{{ localizedDescription() }}</p>\r
      }\r
\r
      @if (product.manufacturer && !compact) {\r
        <p class="product-meta">\r
          <span class="meta-label">{{ 'product.manufacturer' | translate }}:</span>\r
          <span class="meta-value">{{ product.manufacturer }}</span>\r
        </p>\r
      }\r
\r
      @if (hasRating && !compact) {\r
        <div class="product-rating">\r
          <span class="rating-stars">{{ getRatingStars() }}</span>\r
          <span class="rating-value">{{ product.rating_number.toFixed(1) }}</span>\r
        </div>\r
      }\r
\r
      <div class="product-price-section">\r
        @if (has_discount) {\r
          <div class="price-with-discount">\r
            <span class="original-price">{{ formattedPrice }}</span>\r
            <span class="discounted-price">{{ formattedDiscountedPrice }}</span>\r
          </div>\r
        } @else {\r
          <span class="price">{{ formattedPrice }}</span>\r
        }\r
      </div>\r
    </div>\r
  </a>\r
\r
  <div class="product-actions">\r
    @if (!compact) {\r
      <div class="quantity-controls" [class.disabled]="!product.in_stock">\r
        <button\r
          class="quantity-btn"\r
          (click)="decreaseQuantity()"\r
          [disabled]="quantity() <= 1 || !product.in_stock"\r
          [attr.aria-label]="'product.decrease_quantity' | translate"\r
        >\r
          \u2212\r
        </button>\r
\r
        <span class="quantity-value">{{ quantity() }}</span>\r
\r
        <button\r
          class="quantity-btn"\r
          (click)="increaseQuantity()"\r
          [disabled]="quantity() >= product.stock_quantity || !product.in_stock"\r
          [attr.aria-label]="'product.increase_quantity' | translate"\r
        >\r
          +\r
        </button>\r
      </div>\r
    }\r
\r
    <button\r
      class="add-to-cart-button"\r
      [class.compact]="compact"\r
      [disabled]="!canAddToCart"\r
      (click)="onAddToCart()"\r
      [attr.aria-label]="('common.add_to_cart' | translate) + ': ' + localizedName()"\r
    >\r
      <!-- \u{1F6D2} \u2192 basketwhite.webp -->\r
      <img [src]="icons.basket" alt="" class="button-icon" aria-hidden="true" />\r
      {{ 'common.add_to_cart' | translate }}\r
    </button>\r
\r
    @if (!compact) {\r
      <button\r
        class="details-button"\r
        (click)="onViewDetails()"\r
        [attr.aria-label]="('product.view_details' | translate) + ': ' + localizedName()"\r
      >\r
        {{ 'product.view_details' | translate }}\r
      </button>\r
    }\r
  </div>\r
</article>\r
`, styles: ['/* src/app/shared/components/product-card/product-card.css */\n.product-card {\n  display: flex;\n  flex-direction: column;\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-xl);\n  overflow: hidden;\n  transition:\n    box-shadow var(--transition-normal),\n    transform var(--transition-bounce),\n    border-color var(--transition-normal);\n  height: 100%;\n  position: relative;\n}\n.product-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: var(--gradient-primary);\n  opacity: 0;\n  transition: opacity var(--transition-normal);\n  z-index: 1;\n}\n@media (hover: hover) and (pointer: fine) {\n  .product-card:hover {\n    box-shadow: var(--shadow-xl), 0 0 0 1px var(--color-primary-mid);\n    transform: translateY(-6px);\n    border-color: var(--color-primary);\n  }\n  .product-card:hover::before {\n    opacity: 1;\n  }\n  .product-card:hover .product-image {\n    transform: scale(1.07);\n  }\n  .product-card:hover .product-image-overlay {\n    opacity: 1;\n  }\n}\n@media (hover: none) {\n  .product-card:active {\n    border-color: var(--color-primary);\n    box-shadow: var(--shadow-md);\n  }\n}\n.product-card.out-of-stock {\n  opacity: 0.72;\n}\n.product-card.compact {\n  flex-direction: row;\n  height: auto;\n  border-radius: var(--radius-lg);\n}\n.product-link {\n  text-decoration: none;\n  color: inherit;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.product-card.compact .product-link {\n  flex-direction: row;\n}\n.product-image-wrapper {\n  position: relative;\n  width: 100%;\n  height: 210px;\n  background: var(--gradient-image-bg);\n  overflow: hidden;\n  padding: 16px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.product-card.compact .product-image-wrapper {\n  width: 120px;\n  min-width: 120px;\n  height: 120px;\n  padding: 8px;\n  flex-shrink: 0;\n}\n.product-image {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center;\n  transition: transform var(--transition-slow);\n  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));\n}\n.product-image-overlay {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(255, 255, 255, 0.08) 0%,\n      transparent 50%,\n      rgba(6, 122, 69, 0.06) 100%);\n  opacity: 0;\n  transition: opacity var(--transition-normal);\n  pointer-events: none;\n}\n.badges {\n  position: absolute;\n  top: var(--space-3);\n  right: var(--space-3);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  z-index: var(--z-base);\n}\n.badge {\n  padding: 4px 10px;\n  border-radius: var(--radius-full);\n  font-size: 0.7rem;\n  font-weight: var(--font-bold);\n  text-align: center;\n  box-shadow: var(--shadow-sm);\n  letter-spacing: 0.03em;\n}\n.discount-badge {\n  background:\n    linear-gradient(\n      135deg,\n      #dc2626,\n      #ef4444);\n  color: white;\n  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);\n}\n.prescription-badge {\n  background: var(--gradient-primary);\n  color: white;\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--text-lg);\n  padding: 0;\n  box-shadow: var(--shadow-primary);\n}\n.out-of-stock-badge {\n  background: rgba(85, 85, 85, 0.9);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  color: white;\n}\n.out-of-stock-overlay {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.55);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: var(--z-base);\n}\n.out-of-stock-overlay span {\n  background: rgba(255, 255, 255, 0.95);\n  color: #000000;\n  padding: var(--space-2) var(--space-5);\n  border-radius: var(--radius-full);\n  font-weight: var(--font-semibold);\n  font-size: var(--text-sm);\n  box-shadow: var(--shadow-md);\n}\n.product-content {\n  padding: var(--space-5) var(--space-4) var(--space-3);\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.product-card.compact .product-content {\n  padding: var(--space-3);\n  gap: var(--space-1);\n}\n.product-category {\n  font-size: 0.68rem;\n  text-transform: uppercase;\n  color: var(--color-primary);\n  font-weight: var(--font-bold);\n  letter-spacing: 0.08em;\n}\n.product-title {\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0;\n  line-height: var(--leading-tight);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.product-title.compact {\n  font-size: var(--text-base);\n  -webkit-line-clamp: 1;\n}\n.product-description {\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-normal);\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  margin: 0;\n}\n.product-meta {\n  font-size: var(--text-xs);\n  color: var(--color-text-tertiary);\n  margin: 0;\n}\n.meta-label {\n  font-weight: var(--font-medium);\n}\n.meta-value {\n  color: var(--color-text-secondary);\n}\n.product-rating {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n}\n.rating-stars {\n  color: var(--color-warning);\n  letter-spacing: -1px;\n}\n.rating-value {\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n}\n.rating-count {\n  color: var(--color-text-secondary);\n  font-size: var(--text-xs);\n}\n.product-price-section {\n  margin-top: auto;\n  padding-top: var(--space-3);\n  border-top: 1px solid var(--color-border);\n}\n.price {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-extrabold);\n  color: var(--color-primary);\n  line-height: 1;\n}\n.product-card.compact .price {\n  font-size: var(--text-lg);\n}\n.price-with-discount {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n}\n.original-price {\n  font-size: var(--text-sm);\n  color: var(--color-text-tertiary);\n  text-decoration: line-through;\n}\n.discounted-price {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-extrabold);\n  color: var(--color-error);\n  line-height: 1;\n}\n.product-card.compact .discounted-price {\n  font-size: var(--text-lg);\n}\n.product-actions {\n  padding: var(--space-3) var(--space-4) var(--space-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.product-card.compact .product-actions {\n  padding: var(--space-3);\n  padding-top: 0;\n  flex-direction: row;\n  align-items: center;\n}\n.quantity-controls {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-3);\n  padding: var(--space-2);\n  background: var(--color-surface-elevated);\n  border-radius: var(--radius-lg);\n  border: 1px solid var(--color-border);\n}\n.quantity-controls.disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.quantity-btn {\n  width: 44px;\n  height: 44px;\n  border-radius: var(--radius-md);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  font-size: var(--text-xl);\n  font-weight: var(--font-bold);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  line-height: 1;\n  box-shadow: var(--shadow-sm);\n}\n@media (hover: hover) and (pointer: fine) {\n  .quantity-btn:hover:not(:disabled) {\n    background: var(--gradient-primary-hover);\n    transform: scale(1.08);\n    box-shadow: var(--shadow-primary);\n  }\n}\n.quantity-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  background: var(--color-text-tertiary);\n  box-shadow: none;\n}\n.quantity-value {\n  min-width: 36px;\n  text-align: center;\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n}\n.add-to-cart-button {\n  width: 100%;\n  padding: var(--space-3) var(--space-4);\n  background: var(--gradient-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  border-radius: var(--radius-lg);\n  font-size: var(--text-base);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  font-family: var(--font-primary);\n  min-height: 44px;\n  box-shadow: var(--shadow-primary);\n  letter-spacing: 0.01em;\n}\n.add-to-cart-button .button-icon {\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: brightness(0) saturate(100%) invert(1);\n}\n.add-to-cart-button.compact {\n  padding: var(--space-2) var(--space-3);\n  font-size: var(--text-sm);\n  min-height: 44px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .add-to-cart-button:hover:not(:disabled) {\n    background: var(--gradient-primary-hover);\n    box-shadow: var(--shadow-primary-lg);\n    transform: translateY(-2px);\n  }\n}\n.add-to-cart-button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  box-shadow: none;\n  transform: none;\n  background: var(--color-text-secondary);\n}\n.button-icon {\n  font-size: var(--text-lg);\n}\n.details-button {\n  width: 100%;\n  padding: var(--space-2) var(--space-4);\n  background: transparent;\n  color: var(--color-primary);\n  border: 2px solid var(--color-primary);\n  border-radius: var(--radius-lg);\n  font-size: var(--text-sm);\n  font-weight: var(--font-semibold);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .details-button:hover {\n    background: var(--color-primary);\n    color: white;\n    box-shadow: var(--shadow-primary);\n    transform: translateY(-1px);\n  }\n}\n@media (max-width: 768px) {\n  .product-card.compact .product-image-wrapper {\n    width: 100px;\n    min-width: 100px;\n    height: 100px;\n  }\n  .product-content {\n    padding: var(--space-4) var(--space-3) var(--space-2);\n  }\n  .product-title {\n    font-size: var(--text-base);\n  }\n  .product-actions {\n    padding: var(--space-2) var(--space-3) var(--space-3);\n  }\n}\n@media (max-width: 375px) {\n  .product-card.compact .product-image-wrapper {\n    width: 80px;\n    min-width: 80px;\n    height: 80px;\n    padding: 6px;\n  }\n  .product-content {\n    padding: var(--space-2) var(--space-3);\n    gap: var(--space-1);\n  }\n  .product-title {\n    font-size: var(--text-sm);\n  }\n  .price,\n  .discounted-price {\n    font-size: var(--text-xl);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .product-card,\n  .product-image,\n  .quantity-btn,\n  .add-to-cart-button,\n  .details-button {\n    transition: none;\n  }\n  .product-card::before {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=product-card.css.map */\n'] }]
  }], null, { product: [{
    type: Input,
    args: [{ required: true }]
  }], compact: [{
    type: Input
  }], addToCart: [{
    type: Output
  }], viewDetails: [{
    type: Output
  }], quantityChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductCard, { className: "ProductCard", filePath: "src/app/shared/components/product-card/product-card.ts", lineNumber: 18 });
})();

// src/app/shared/components/product-filter/product-filter.ts
var _forTrack02 = ($index, $item) => $item.value;
function ProductFilter_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("click", function ProductFilter_Conditional_6_Template_button_click_0_listener() {
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
function ProductFilter_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    \u0275\u0275property("value", option_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, option_r3.label), " ");
  }
}
function ProductFilter_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
function ProductFilter_Conditional_24_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function ProductFilter_Conditional_24_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleClearFilters());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "filter.clear_all"), " ");
  }
}
function ProductFilter_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 17)(2, "h3", 18);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ProductFilter_Conditional_24_Conditional_5_Template, 3, 3, "button", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 20)(7, "div", 21)(8, "label", 22);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 23)(12, "input", 24);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275listener("input", function ProductFilter_Conditional_24_Template_input_input_12_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handlePriceMinChange($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 25);
    \u0275\u0275text(15, "\u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 24);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275listener("input", function ProductFilter_Conditional_24_Template_input_input_16_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handlePriceMaxChange($event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 21)(19, "label", 26)(20, "input", 27);
    \u0275\u0275listener("change", function ProductFilter_Conditional_24_Template_input_change_20_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateInStockOnly());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 28);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 9, "filter.advanced_filters"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasActiveFilters() ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 11, "filter.price_range"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.filterState().priceMin)("placeholder", \u0275\u0275pipeBind1(13, 13, "filter.min_price"));
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.filterState().priceMax)("placeholder", \u0275\u0275pipeBind1(17, 15, "filter.max_price"));
    \u0275\u0275advance(4);
    \u0275\u0275property("checked", ctx_r1.filterState().in_stock_only);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 17, "filter.in_stock_only"));
  }
}
var ProductFilter = class _ProductFilter {
  filterChanged = new EventEmitter();
  clearFilters = new EventEmitter();
  icons = ICONS;
  destroyRef = inject(DestroyRef);
  searchSubject = new Subject();
  filterState = signal({
    categories: [],
    priceMin: null,
    priceMax: null,
    in_stock_only: false,
    sort_by: "popularity",
    search_query: ""
  }, ...ngDevMode ? [{ debugName: "filterState" }] : []);
  isExpanded = signal(false, ...ngDevMode ? [{ debugName: "isExpanded" }] : []);
  sortOptions = [
    { value: "popularity", label: "filter.sort.popularity" },
    { value: "name-asc", label: "filter.sort.name_asc" },
    { value: "name-desc", label: "filter.sort.name_desc" },
    { value: "price-asc", label: "filter.sort.price_asc" },
    { value: "price-desc", label: "filter.sort.price_desc" },
    { value: "rating", label: "filter.sort.rating" },
    { value: "newest", label: "filter.sort.newest" }
  ];
  hasActiveFilters = computed(() => {
    const state = this.filterState();
    return state.categories.length > 0 || state.priceMin !== null || state.priceMax !== null || state.in_stock_only || state.sort_by !== "popularity";
  }, ...ngDevMode ? [{ debugName: "hasActiveFilters" }] : []);
  hasSearchQuery = computed(() => this.filterState().search_query.trim().length > 0, ...ngDevMode ? [{ debugName: "hasSearchQuery" }] : []);
  constructor() {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe((query) => {
      this.filterState.update((state) => __spreadProps(__spreadValues({}, state), { search_query: query }));
      this.emitFilters();
    });
  }
  handleSearchInput(value) {
    this.searchSubject.next(value);
  }
  clearSearch() {
    this.filterState.update((state) => __spreadProps(__spreadValues({}, state), { search_query: "" }));
    this.emitFilters();
  }
  toggleExpanded() {
    this.isExpanded.update((v) => !v);
  }
  updateSortBy(sort_by) {
    this.filterState.update((state) => __spreadProps(__spreadValues({}, state), { sort_by }));
    this.emitFilters();
  }
  updateInStockOnly() {
    this.filterState.update((state) => __spreadProps(__spreadValues({}, state), { in_stock_only: !state.in_stock_only }));
    this.emitFilters();
  }
  updatePriceRange() {
    this.emitFilters();
  }
  handlePriceMinChange(value) {
    const num = value ? parseFloat(value) : null;
    this.filterState.update((state) => __spreadProps(__spreadValues({}, state), { priceMin: num }));
    this.emitFilters();
  }
  handlePriceMaxChange(value) {
    const num = value ? parseFloat(value) : null;
    this.filterState.update((state) => __spreadProps(__spreadValues({}, state), { priceMax: num }));
    this.emitFilters();
  }
  handleClearFilters() {
    this.filterState.set({
      categories: [],
      priceMin: null,
      priceMax: null,
      in_stock_only: false,
      sort_by: "popularity",
      search_query: ""
    });
    this.clearFilters.emit();
  }
  emitFilters() {
    const state = this.filterState();
    const filters = {
      categories: state.categories,
      price_range: state.priceMin !== null || state.priceMax !== null ? { min: state.priceMin ?? 0, max: state.priceMax ?? Infinity } : null,
      in_stock_only: state.in_stock_only,
      sort_by: state.sort_by,
      search_query: state.search_query.trim() || void 0
    };
    this.filterChanged.emit(filters);
  }
  static \u0275fac = function ProductFilter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductFilter)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductFilter, selectors: [["app-product-filter"]], outputs: { filterChanged: "filterChanged", clearFilters: "clearFilters" }, decls: 25, vars: 20, consts: [[1, "product-filter"], [1, "quick-filter-bar"], [1, "search-input-wrapper"], ["alt", "", "aria-hidden", "true", 1, "search-icon-img", 3, "src"], ["type", "search", 1, "search-input", 3, "input", "value", "placeholder"], [1, "clear-search"], [1, "sort-select-wrapper"], ["for", "sort-select", 1, "sort-label"], ["id", "sort-select", 1, "sort-select", 3, "change", "value"], [3, "value"], [1, "select-arrow"], [1, "expand-button", 3, "click"], [1, "expand-icon"], [1, "expand-text"], [1, "active-indicator"], [1, "expanded-filters"], [1, "clear-search", 3, "click"], [1, "filters-header"], [1, "filters-title"], [1, "clear-all-button"], [1, "filters-grid"], [1, "filter-section"], [1, "filter-label"], [1, "price-inputs"], ["type", "number", "min", "0", "step", "100", 1, "price-input", 3, "input", "value", "placeholder"], [1, "price-separator"], [1, "checkbox-label"], ["type", "checkbox", 1, "checkbox-input", 3, "change", "checked"], [1, "checkbox-text"], [1, "clear-all-button", 3, "click"]], template: function ProductFilter_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "img", 3);
      \u0275\u0275elementStart(4, "input", 4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275listener("input", function ProductFilter_Template_input_input_4_listener($event) {
        return ctx.handleSearchInput($event.target.value);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, ProductFilter_Conditional_6_Template, 3, 3, "button", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 6)(8, "label", 7);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "select", 8);
      \u0275\u0275listener("change", function ProductFilter_Template_select_change_11_listener($event) {
        return ctx.updateSortBy($event.target.value);
      });
      \u0275\u0275repeaterCreate(12, ProductFilter_For_13_Template, 3, 4, "option", 9, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, "\u25BC");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "button", 11);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275listener("click", function ProductFilter_Template_button_click_16_listener() {
        return ctx.toggleExpanded();
      });
      \u0275\u0275elementStart(18, "span", 12);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span", 13);
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, ProductFilter_Conditional_23_Template, 1, 0, "span", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(24, ProductFilter_Conditional_24_Template, 24, 19, "div", 15);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("src", ctx.icons.search, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.filterState().search_query)("placeholder", \u0275\u0275pipeBind1(5, 12, "filter.search_placeholder"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hasSearchQuery() ? 6 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 14, "filter.sort_by"), ": ");
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.filterState().sort_by);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.sortOptions);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-expanded", ctx.isExpanded())("aria-label", \u0275\u0275pipeBind1(17, 16, "filter.toggle_filters"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isExpanded() ? "\u25B2" : "\u25BC");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 18, "filter.filters"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hasActiveFilters() ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isExpanded() ? 24 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, TranslateModule, TranslatePipe], styles: ["\n\n.product-filter[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n}\n.quick-filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-4);\n}\n.search-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  min-width: 0;\n}\n.search-icon-img[_ngcontent-%COMP%] {\n  position: absolute;\n  left: var(--space-3);\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  pointer-events: none;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.5;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-2) var(--space-10) var(--space-2) var(--space-10);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  background: var(--color-surface-elevated);\n  color: var(--color-text-primary);\n  font-family: var(--font-primary);\n  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);\n  min-height: 44px;\n}\n.search-input[_ngcontent-%COMP%]::-webkit-search-cancel-button, \n.search-input[_ngcontent-%COMP%]::-webkit-search-decoration {\n  -webkit-appearance: none;\n  appearance: none;\n  display: none;\n}\n.search-input[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.12);\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-text-tertiary);\n}\n.clear-search[_ngcontent-%COMP%] {\n  position: absolute;\n  right: var(--space-2);\n  background: transparent;\n  border: none;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  font-size: 14px;\n  padding: var(--space-1);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  transition: background var(--transition-fast), color var(--transition-fast);\n}\n.clear-search[_ngcontent-%COMP%]:hover {\n  background: var(--color-neutral-200);\n  color: var(--color-text-primary);\n}\n.sort-select-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  flex-shrink: 0;\n}\n.sort-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  white-space: nowrap;\n}\n.sort-select[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-10) var(--space-2) var(--space-3);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  appearance: none;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n}\n.sort-select[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n}\n.sort-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-primary-light);\n}\n.select-arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  right: var(--space-3);\n  font-size: var(--text-xs);\n  color: var(--color-text-secondary);\n  pointer-events: none;\n}\n.expand-button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  white-space: nowrap;\n  font-family: var(--font-primary);\n  min-height: 44px;\n  flex-shrink: 0;\n}\n@media (hover: hover) and (pointer: fine) {\n  .expand-button[_ngcontent-%COMP%]:hover {\n    border-color: var(--color-primary);\n    background: var(--color-primary-light);\n  }\n}\n.expand-icon[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  transition: transform var(--transition-fast);\n}\n.expand-text[_ngcontent-%COMP%] {\n  font-weight: var(--font-medium);\n}\n.active-indicator[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  background: var(--color-primary);\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.expanded-filters[_ngcontent-%COMP%] {\n  padding: var(--space-5) var(--space-4);\n  border-top: 1px solid var(--color-border);\n  animation: _ngcontent-%COMP%_slideDown 200ms ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.filters-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: var(--space-4);\n}\n.filters-title[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  margin: 0;\n}\n.clear-all-button[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-4);\n  background: transparent;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .clear-all-button[_ngcontent-%COMP%]:hover {\n    background: var(--color-error);\n    border-color: var(--color-error);\n    color: white;\n  }\n}\n.filters-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: var(--space-5);\n}\n.filter-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.filter-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n}\n.price-inputs[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n}\n.price-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--space-2) var(--space-3);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  color: var(--color-text-primary);\n  font-family: var(--font-primary);\n  transition: all var(--transition-fast);\n  min-height: 44px;\n}\n.price-input[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n}\n.price-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-primary-light);\n}\n.price-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--color-text-tertiary);\n}\n.price-separator[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  font-weight: var(--font-medium);\n  flex-shrink: 0;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  min-height: 44px;\n}\n.checkbox-input[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  accent-color: var(--color-primary);\n  flex-shrink: 0;\n}\n.checkbox-text[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-text-primary);\n}\n@media (max-width: 768px) {\n  .quick-filter-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .sort-select-wrapper[_ngcontent-%COMP%] {\n    max-width: none;\n  }\n  .expand-button[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .filters-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 480px) {\n  .quick-filter-bar[_ngcontent-%COMP%] {\n    padding: var(--space-3);\n    gap: var(--space-3);\n  }\n  .expanded-filters[_ngcontent-%COMP%] {\n    padding: var(--space-4) var(--space-3);\n  }\n  .sort-label[_ngcontent-%COMP%] {\n    font-size: var(--text-xs);\n  }\n  .price-inputs[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: var(--space-2);\n  }\n  .price-separator[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n  }\n  .price-input[_ngcontent-%COMP%] {\n    font-size: var(--text-xs);\n    padding: var(--space-2);\n  }\n  .filters-title[_ngcontent-%COMP%] {\n    font-size: var(--text-base);\n  }\n}\n@media (max-width: 375px) {\n  .quick-filter-bar[_ngcontent-%COMP%] {\n    padding: var(--space-2) var(--space-3);\n  }\n  .price-inputs[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .price-separator[_ngcontent-%COMP%] {\n    text-align: center;\n    display: block;\n  }\n  .price-input[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .expanded-filters[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=product-filter.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductFilter, [{
    type: Component,
    args: [{ selector: "app-product-filter", imports: [FormsModule, TranslateModule], template: `<div class="product-filter">\r
  <div class="quick-filter-bar">\r
    <div class="search-input-wrapper">\r
      <img [src]="icons.search" alt="" class="search-icon-img" aria-hidden="true" />\r
      <input\r
        type="search"\r
        class="search-input"\r
        [value]="filterState().search_query"\r
        (input)="handleSearchInput($any($event.target).value)"\r
        [placeholder]="'filter.search_placeholder' | translate"\r
      />\r
      @if (hasSearchQuery()) {\r
        <button\r
          class="clear-search"\r
          (click)="clearSearch()"\r
          [attr.aria-label]="'common.clear' | translate"\r
        >\r
          \u2715\r
        </button>\r
      }\r
    </div>\r
\r
    <div class="sort-select-wrapper">\r
      <label for="sort-select" class="sort-label"> {{ 'filter.sort_by' | translate }}: </label>\r
      <select\r
        id="sort-select"\r
        class="sort-select"\r
        [value]="filterState().sort_by"\r
        (change)="updateSortBy($any($event.target).value)"\r
      >\r
        @for (option of sortOptions; track option.value) {\r
          <option [value]="option.value">\r
            {{ option.label | translate }}\r
          </option>\r
        }\r
      </select>\r
      <span class="select-arrow">\u25BC</span>\r
    </div>\r
\r
    <button\r
      class="expand-button"\r
      (click)="toggleExpanded()"\r
      [attr.aria-expanded]="isExpanded()"\r
      [attr.aria-label]="'filter.toggle_filters' | translate"\r
    >\r
      <span class="expand-icon">{{ isExpanded() ? '\u25B2' : '\u25BC' }}</span>\r
      <span class="expand-text">{{ 'filter.filters' | translate }}</span>\r
      @if (hasActiveFilters()) {\r
        <span class="active-indicator"></span>\r
      }\r
    </button>\r
  </div>\r
\r
  @if (isExpanded()) {\r
    <div class="expanded-filters">\r
      <div class="filters-header">\r
        <h3 class="filters-title">{{ 'filter.advanced_filters' | translate }}</h3>\r
        @if (hasActiveFilters()) {\r
          <button class="clear-all-button" (click)="handleClearFilters()">\r
            {{ 'filter.clear_all' | translate }}\r
          </button>\r
        }\r
      </div>\r
\r
      <div class="filters-grid">\r
        <div class="filter-section">\r
          <label class="filter-label">{{ 'filter.price_range' | translate }}</label>\r
          <div class="price-inputs">\r
            <input\r
              type="number"\r
              class="price-input"\r
              [value]="filterState().priceMin"\r
              (input)="handlePriceMinChange($any($event.target).value)"\r
              [placeholder]="'filter.min_price' | translate"\r
              min="0"\r
              step="100"\r
            />\r
            <span class="price-separator">\u2014</span>\r
            <input\r
              type="number"\r
              class="price-input"\r
              [value]="filterState().priceMax"\r
              (input)="handlePriceMaxChange($any($event.target).value)"\r
              [placeholder]="'filter.max_price' | translate"\r
              min="0"\r
              step="100"\r
            />\r
          </div>\r
        </div>\r
\r
        <div class="filter-section">\r
          <label class="checkbox-label">\r
            <input\r
              type="checkbox"\r
              class="checkbox-input"\r
              [checked]="filterState().in_stock_only"\r
              (change)="updateInStockOnly()"\r
            />\r
            <span class="checkbox-text">{{ 'filter.in_stock_only' | translate }}</span>\r
          </label>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/shared/components/product-filter/product-filter.css */\n.product-filter {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n}\n.quick-filter-bar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-4);\n}\n.search-input-wrapper {\n  position: relative;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  min-width: 0;\n}\n.search-icon-img {\n  position: absolute;\n  left: var(--space-3);\n  width: 18px;\n  height: 18px;\n  object-fit: contain;\n  pointer-events: none;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.5;\n}\n.search-input {\n  width: 100%;\n  padding: var(--space-2) var(--space-10) var(--space-2) var(--space-10);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  background: var(--color-surface-elevated);\n  color: var(--color-text-primary);\n  font-family: var(--font-primary);\n  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);\n  min-height: 44px;\n}\n.search-input::-webkit-search-cancel-button,\n.search-input::-webkit-search-decoration {\n  -webkit-appearance: none;\n  appearance: none;\n  display: none;\n}\n.search-input:hover {\n  border-color: var(--color-primary);\n}\n.search-input:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px rgba(6, 122, 69, 0.12);\n}\n.search-input::placeholder {\n  color: var(--color-text-tertiary);\n}\n.clear-search {\n  position: absolute;\n  right: var(--space-2);\n  background: transparent;\n  border: none;\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  font-size: 14px;\n  padding: var(--space-1);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  transition: background var(--transition-fast), color var(--transition-fast);\n}\n.clear-search:hover {\n  background: var(--color-neutral-200);\n  color: var(--color-text-primary);\n}\n.sort-select-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  flex-shrink: 0;\n}\n.sort-label {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  white-space: nowrap;\n}\n.sort-select {\n  padding: var(--space-2) var(--space-10) var(--space-2) var(--space-3);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  appearance: none;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n}\n.sort-select:hover {\n  border-color: var(--color-primary);\n}\n.sort-select:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-primary-light);\n}\n.select-arrow {\n  position: absolute;\n  right: var(--space-3);\n  font-size: var(--text-xs);\n  color: var(--color-text-secondary);\n  pointer-events: none;\n}\n.expand-button {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  white-space: nowrap;\n  font-family: var(--font-primary);\n  min-height: 44px;\n  flex-shrink: 0;\n}\n@media (hover: hover) and (pointer: fine) {\n  .expand-button:hover {\n    border-color: var(--color-primary);\n    background: var(--color-primary-light);\n  }\n}\n.expand-icon {\n  font-size: var(--text-xs);\n  transition: transform var(--transition-fast);\n}\n.expand-text {\n  font-weight: var(--font-medium);\n}\n.active-indicator {\n  width: 8px;\n  height: 8px;\n  background: var(--color-primary);\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.expanded-filters {\n  padding: var(--space-5) var(--space-4);\n  border-top: 1px solid var(--color-border);\n  animation: slideDown 200ms ease-out;\n}\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.filters-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: var(--space-4);\n}\n.filters-title {\n  font-size: var(--text-lg);\n  font-weight: var(--font-semibold);\n  color: var(--color-text-primary);\n  margin: 0;\n}\n.clear-all-button {\n  padding: var(--space-2) var(--space-4);\n  background: transparent;\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-secondary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .clear-all-button:hover {\n    background: var(--color-error);\n    border-color: var(--color-error);\n    color: white;\n  }\n}\n.filters-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: var(--space-5);\n}\n.filter-section {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.filter-label {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n}\n.price-inputs {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n}\n.price-input {\n  flex: 1;\n  padding: var(--space-2) var(--space-3);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  color: var(--color-text-primary);\n  font-family: var(--font-primary);\n  transition: all var(--transition-fast);\n  min-height: 44px;\n}\n.price-input:hover {\n  border-color: var(--color-primary);\n}\n.price-input:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-primary-light);\n}\n.price-input::placeholder {\n  color: var(--color-text-tertiary);\n}\n.price-separator {\n  color: var(--color-text-secondary);\n  font-weight: var(--font-medium);\n  flex-shrink: 0;\n}\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  min-height: 44px;\n}\n.checkbox-input {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  accent-color: var(--color-primary);\n  flex-shrink: 0;\n}\n.checkbox-text {\n  font-size: var(--text-sm);\n  color: var(--color-text-primary);\n}\n@media (max-width: 768px) {\n  .quick-filter-bar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .sort-select-wrapper {\n    max-width: none;\n  }\n  .expand-button {\n    justify-content: center;\n  }\n  .filters-grid {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 480px) {\n  .quick-filter-bar {\n    padding: var(--space-3);\n    gap: var(--space-3);\n  }\n  .expanded-filters {\n    padding: var(--space-4) var(--space-3);\n  }\n  .sort-label {\n    font-size: var(--text-xs);\n  }\n  .price-inputs {\n    flex-direction: row;\n    gap: var(--space-2);\n  }\n  .price-separator {\n    font-size: var(--text-sm);\n  }\n  .price-input {\n    font-size: var(--text-xs);\n    padding: var(--space-2);\n  }\n  .filters-title {\n    font-size: var(--text-base);\n  }\n}\n@media (max-width: 375px) {\n  .quick-filter-bar {\n    padding: var(--space-2) var(--space-3);\n  }\n  .price-inputs {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .price-separator {\n    text-align: center;\n    display: block;\n  }\n  .price-input {\n    width: 100%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .expanded-filters {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=product-filter.css.map */\n"] }]
  }], () => [], { filterChanged: [{
    type: Output
  }], clearFilters: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductFilter, { className: "ProductFilter", filePath: "src/app/shared/components/product-filter/product-filter.ts", lineNumber: 33 });
})();

// src/app/shared/components/product-pagination/product-pagination.ts
function ProductPagination_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 9);
    \u0275\u0275domListener("click", function ProductPagination_For_7_Template_button_click_0_listener() {
      const option_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateItemsPerPage(option_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", option_r2 === ctx_r2.pagination.items_per_page);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r2, " ");
  }
}
function ProductPagination_For_27_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 10);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275domElementEnd();
  }
}
function ProductPagination_For_27_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 12);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275domListener("click", function ProductPagination_For_27_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const page_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage(page_r5));
    });
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const page_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", page_r5 === ctx_r2.pagination.current_page);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 5, "pagination.page") + " " + page_r5)("aria-current", page_r5 === ctx_r2.pagination.current_page ? "page" : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", page_r5, " ");
  }
}
function ProductPagination_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductPagination_For_27_Conditional_0_Template, 2, 0, "span", 10)(1, ProductPagination_For_27_Conditional_1_Template, 3, 7, "button", 11);
  }
  if (rf & 2) {
    const page_r5 = ctx.$implicit;
    \u0275\u0275conditional(page_r5 === -1 ? 0 : 1);
  }
}
var ProductPagination = class _ProductPagination {
  pagination;
  pageChange = new EventEmitter();
  items_per_pageChange = new EventEmitter();
  items_per_pageOptions = [10, 30, 60];
  get pages() {
    return this.getPageNumbers();
  }
  get hasPrevious() {
    return this.pagination.current_page > 1;
  }
  get hasNext() {
    return this.pagination.current_page < this.pagination.total_pages;
  }
  get startItem() {
    return (this.pagination.current_page - 1) * this.pagination.items_per_page + 1;
  }
  get endItem() {
    return Math.min(this.pagination.current_page * this.pagination.items_per_page, this.pagination.total_items);
  }
  goToPage(page) {
    if (page >= 1 && page <= this.pagination.total_pages && page !== this.pagination.current_page) {
      this.pageChange.emit(page);
    }
  }
  previousPage() {
    if (this.hasPrevious) {
      this.goToPage(this.pagination.current_page - 1);
    }
  }
  nextPage() {
    if (this.hasNext) {
      this.goToPage(this.pagination.current_page + 1);
    }
  }
  updateItemsPerPage(count) {
    this.items_per_pageChange.emit(count);
  }
  getPageNumbers() {
    const current = this.pagination.current_page;
    const total = this.pagination.total_pages;
    const delta = 2;
    const pages = [];
    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(total - 1, current + delta);
    pages.push(1);
    if (rangeStart > 2) {
      pages.push(-1);
    }
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    if (rangeEnd < total - 1) {
      pages.push(-1);
    }
    if (total > 1) {
      pages.push(total);
    }
    return pages;
  }
  static \u0275fac = function ProductPagination_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductPagination)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductPagination, selectors: [["app-product-pagination"]], inputs: { pagination: "pagination" }, outputs: { pageChange: "pageChange", items_per_pageChange: "items_per_pageChange" }, decls: 31, vars: 23, consts: [[1, "pagination-wrapper"], [1, "items-per-page"], [1, "items-label"], [1, "items-options"], [1, "items-option", 3, "active"], [1, "pagination-info"], [1, "pagination-controls"], [1, "page-button", "nav-button", 3, "click", "disabled"], [1, "page-numbers"], [1, "items-option", 3, "click"], [1, "ellipsis"], [1, "page-button", 3, "active"], [1, "page-button", 3, "click"]], template: function ProductPagination_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "label", 2);
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div", 3);
      \u0275\u0275repeaterCreate(6, ProductPagination_For_7_Template, 2, 3, "button", 4, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 5);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275domElementStart(11, "strong");
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(13, "-");
      \u0275\u0275domElementStart(14, "strong");
      \u0275\u0275text(15);
      \u0275\u0275domElementEnd();
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275domElementStart(18, "strong");
      \u0275\u0275text(19);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(20, "nav", 6);
      \u0275\u0275pipe(21, "translate");
      \u0275\u0275domElementStart(22, "button", 7);
      \u0275\u0275pipe(23, "translate");
      \u0275\u0275domListener("click", function ProductPagination_Template_button_click_22_listener() {
        return ctx.previousPage();
      });
      \u0275\u0275text(24, " \u2039 ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(25, "div", 8);
      \u0275\u0275repeaterCreate(26, ProductPagination_For_27_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(28, "button", 7);
      \u0275\u0275pipe(29, "translate");
      \u0275\u0275domListener("click", function ProductPagination_Template_button_click_28_listener() {
        return ctx.nextPage();
      });
      \u0275\u0275text(30, " \u203A ");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(4, 11, "pagination.items_per_page"), ":");
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.items_per_pageOptions);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 13, "pagination.showing"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.startItem);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.endItem);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 15, "pagination.of"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.pagination.total_items);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(21, 17, "pagination.navigation"));
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("disabled", !ctx.hasPrevious);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(23, 19, "pagination.previous"));
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.pages);
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("disabled", !ctx.hasNext);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(29, 21, "pagination.next"));
    }
  }, dependencies: [TranslateModule, TranslatePipe], styles: ["\n\n.pagination-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n  padding: var(--space-6);\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n}\n.items-per-page[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  justify-content: center;\n}\n.items-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-secondary);\n}\n.items-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n}\n.items-option[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n  min-width: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n@media (hover: hover) and (pointer: fine) {\n  .items-option[_ngcontent-%COMP%]:hover {\n    background: var(--color-primary-light);\n    border-color: var(--color-primary);\n  }\n}\n.items-option.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-text-on-primary);\n  box-shadow: var(--shadow-sm);\n}\n.pagination-info[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n}\n.pagination-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-text-primary);\n  font-weight: var(--font-semibold);\n}\n.pagination-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n}\n.page-numbers[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-1);\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.page-button[_ngcontent-%COMP%] {\n  min-width: 44px;\n  height: 44px;\n  padding: 0 var(--space-2);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n  font-family: var(--font-primary);\n}\n@media (hover: hover) and (pointer: fine) {\n  .page-button[_ngcontent-%COMP%]:hover:not(:disabled):not(.active) {\n    background: var(--color-primary-light);\n    border-color: var(--color-primary);\n    transform: translateY(-1px);\n  }\n}\n.page-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.page-button.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-text-on-primary);\n  box-shadow: var(--shadow-sm);\n  font-weight: var(--font-bold);\n}\n.nav-button[_ngcontent-%COMP%] {\n  font-size: var(--text-xl);\n  font-weight: var(--font-bold);\n}\n.ellipsis[_ngcontent-%COMP%] {\n  min-width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--color-text-secondary);\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n}\n@media (max-width: 768px) {\n  .pagination-wrapper[_ngcontent-%COMP%] {\n    padding: var(--space-4);\n    gap: var(--space-3);\n  }\n  .items-per-page[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: var(--space-2);\n  }\n  .pagination-info[_ngcontent-%COMP%] {\n    font-size: var(--text-xs);\n  }\n}\n@media (max-width: 480px) {\n  .pagination-wrapper[_ngcontent-%COMP%] {\n    padding: var(--space-3);\n    border-radius: var(--radius-md);\n  }\n  .page-numbers[_ngcontent-%COMP%] {\n    gap: 2px;\n  }\n  .page-button[_ngcontent-%COMP%] {\n    min-width: 40px;\n    height: 40px;\n    font-size: var(--text-xs);\n  }\n  .ellipsis[_ngcontent-%COMP%] {\n    min-width: 32px;\n    height: 40px;\n  }\n  .items-option[_ngcontent-%COMP%] {\n    padding: var(--space-1) var(--space-3);\n    min-height: 40px;\n    min-width: 40px;\n    font-size: var(--text-xs);\n  }\n  .items-label[_ngcontent-%COMP%] {\n    font-size: var(--text-xs);\n  }\n}\n@media (max-width: 375px) {\n  .page-button[_ngcontent-%COMP%] {\n    min-width: 36px;\n    height: 38px;\n  }\n  .ellipsis[_ngcontent-%COMP%] {\n    min-width: 28px;\n  }\n  .page-numbers[_ngcontent-%COMP%] {\n    gap: 1px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .page-button[_ngcontent-%COMP%], \n   .items-option[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=product-pagination.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductPagination, [{
    type: Component,
    args: [{ selector: "app-product-pagination", imports: [TranslateModule], template: `<div class="pagination-wrapper">\r
  <div class="items-per-page">\r
    <label class="items-label">{{ 'pagination.items_per_page' | translate }}:</label>\r
    <div class="items-options">\r
      @for (option of items_per_pageOptions; track option) {\r
        <button\r
          class="items-option"\r
          [class.active]="option === pagination.items_per_page"\r
          (click)="updateItemsPerPage(option)"\r
        >\r
          {{ option }}\r
        </button>\r
      }\r
    </div>\r
  </div>\r
\r
  <div class="pagination-info">\r
    {{ 'pagination.showing' | translate }}\r
    <strong>{{ startItem }}</strong\r
    >-<strong>{{ endItem }}</strong>\r
    {{ 'pagination.of' | translate }}\r
    <strong>{{ pagination.total_items }}</strong>\r
  </div>\r
\r
  <nav class="pagination-controls" [attr.aria-label]="'pagination.navigation' | translate">\r
    <button\r
      class="page-button nav-button"\r
      [disabled]="!hasPrevious"\r
      (click)="previousPage()"\r
      [attr.aria-label]="'pagination.previous' | translate"\r
    >\r
      \u2039\r
    </button>\r
\r
    <div class="page-numbers">\r
      @for (page of pages; track $index) {\r
        @if (page === -1) {\r
          <span class="ellipsis">\u2026</span>\r
        } @else {\r
          <button\r
            class="page-button"\r
            [class.active]="page === pagination.current_page"\r
            (click)="goToPage(page)"\r
            [attr.aria-label]="('pagination.page' | translate) + ' ' + page"\r
            [attr.aria-current]="page === pagination.current_page ? 'page' : null"\r
          >\r
            {{ page }}\r
          </button>\r
        }\r
      }\r
    </div>\r
\r
    <button\r
      class="page-button nav-button"\r
      [disabled]="!hasNext"\r
      (click)="nextPage()"\r
      [attr.aria-label]="'pagination.next' | translate"\r
    >\r
      \u203A\r
    </button>\r
  </nav>\r
</div>\r
`, styles: ["/* src/app/shared/components/product-pagination/product-pagination.css */\n.pagination-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n  padding: var(--space-6);\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-lg);\n}\n.items-per-page {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  justify-content: center;\n}\n.items-label {\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-secondary);\n}\n.items-options {\n  display: flex;\n  gap: var(--space-2);\n}\n.items-option {\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n  min-width: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n@media (hover: hover) and (pointer: fine) {\n  .items-option:hover {\n    background: var(--color-primary-light);\n    border-color: var(--color-primary);\n  }\n}\n.items-option.active {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-text-on-primary);\n  box-shadow: var(--shadow-sm);\n}\n.pagination-info {\n  text-align: center;\n  font-size: var(--text-sm);\n  color: var(--color-text-secondary);\n}\n.pagination-info strong {\n  color: var(--color-text-primary);\n  font-weight: var(--font-semibold);\n}\n.pagination-controls {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n}\n.page-numbers {\n  display: flex;\n  gap: var(--space-1);\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.page-button {\n  min-width: 44px;\n  height: 44px;\n  padding: 0 var(--space-2);\n  background: var(--color-surface-elevated);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-md);\n  font-size: var(--text-sm);\n  font-weight: var(--font-medium);\n  color: var(--color-text-primary);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 1;\n  font-family: var(--font-primary);\n}\n@media (hover: hover) and (pointer: fine) {\n  .page-button:hover:not(:disabled):not(.active) {\n    background: var(--color-primary-light);\n    border-color: var(--color-primary);\n    transform: translateY(-1px);\n  }\n}\n.page-button:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.page-button.active {\n  background: var(--color-primary);\n  border-color: var(--color-primary);\n  color: var(--color-text-on-primary);\n  box-shadow: var(--shadow-sm);\n  font-weight: var(--font-bold);\n}\n.nav-button {\n  font-size: var(--text-xl);\n  font-weight: var(--font-bold);\n}\n.ellipsis {\n  min-width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--color-text-secondary);\n  font-size: var(--text-lg);\n  font-weight: var(--font-bold);\n}\n@media (max-width: 768px) {\n  .pagination-wrapper {\n    padding: var(--space-4);\n    gap: var(--space-3);\n  }\n  .items-per-page {\n    flex-direction: column;\n    gap: var(--space-2);\n  }\n  .pagination-info {\n    font-size: var(--text-xs);\n  }\n}\n@media (max-width: 480px) {\n  .pagination-wrapper {\n    padding: var(--space-3);\n    border-radius: var(--radius-md);\n  }\n  .page-numbers {\n    gap: 2px;\n  }\n  .page-button {\n    min-width: 40px;\n    height: 40px;\n    font-size: var(--text-xs);\n  }\n  .ellipsis {\n    min-width: 32px;\n    height: 40px;\n  }\n  .items-option {\n    padding: var(--space-1) var(--space-3);\n    min-height: 40px;\n    min-width: 40px;\n    font-size: var(--text-xs);\n  }\n  .items-label {\n    font-size: var(--text-xs);\n  }\n}\n@media (max-width: 375px) {\n  .page-button {\n    min-width: 36px;\n    height: 38px;\n  }\n  .ellipsis {\n    min-width: 28px;\n  }\n  .page-numbers {\n    gap: 1px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .page-button,\n  .items-option {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=product-pagination.css.map */\n"] }]
  }], null, { pagination: [{
    type: Input,
    args: [{ required: true }]
  }], pageChange: [{
    type: Output
  }], items_per_pageChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductPagination, { className: "ProductPagination", filePath: "src/app/shared/components/product-pagination/product-pagination.ts", lineNumber: 11 });
})();

// src/app/shared/components/product-list/product-list.ts
var _c02 = () => [];
var _forTrack03 = ($index, $item) => $item.id;
function ProductList_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-product-card", 8);
    \u0275\u0275listener("addToCart", function ProductList_Conditional_5_For_2_Template_app_product_card_addToCart_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.handleAddToCart($event));
    })("viewDetails", function ProductList_Conditional_5_For_2_Template_app_product_card_viewDetails_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.handleViewDetails($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r4 = ctx.$implicit;
    \u0275\u0275property("product", product_r4);
  }
}
function ProductList_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275repeaterCreate(1, ProductList_Conditional_5_For_2_Template, 1, 1, "app-product-card", 6, _forTrack03);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-product-pagination", 7);
    \u0275\u0275listener("pageChange", function ProductList_Conditional_5_Template_app_product_pagination_pageChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.handlePageChange($event));
    })("items_per_pageChange", function ProductList_Conditional_5_Template_app_product_pagination_items_per_pageChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.handleItemsPerPageChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.products());
    \u0275\u0275advance(2);
    \u0275\u0275property("pagination", ctx_r2.pagination());
  }
}
function ProductList_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10);
    \u0275\u0275element(2, "img", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 12);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r2.icons.order, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 2, "products.empty"));
  }
}
function ProductList_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10);
    \u0275\u0275element(2, "img", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 13);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 14);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 15);
    \u0275\u0275listener("click", function ProductList_Conditional_6_Conditional_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.handleClearFilters());
    });
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r2.icons.search, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 4, "product.no_products_found"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(8, 6, "product.try_different_filters"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 8, "filter.clear_all"), " ");
  }
}
function ProductList_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductList_Conditional_6_Conditional_0_Template, 6, 4, "div", 9)(1, ProductList_Conditional_6_Conditional_1_Template, 12, 10, "div", 9);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.allProducts().length === 0 ? 0 : 1);
  }
}
var POLL_INTERVAL_MS = 6e4;
var ProductList = class _ProductList {
  productService = inject(ProductService);
  cartService = inject(CartService);
  destroyRef = inject(DestroyRef);
  icons = ICONS;
  products = this.productService.paginatedProducts;
  pagination = this.productService.paginationState;
  filters = this.productService.currentFilters;
  allProducts = this.productService.products;
  categories = computed(() => this.productService.categories(), ...ngDevMode ? [{ debugName: "categories" }] : []);
  selectedProduct = null;
  ngOnInit() {
    return __async(this, null, function* () {
      yield Promise.all([this.productService.loadProducts(), this.productService.loadCategories()]);
      this.startPolling();
    });
  }
  startPolling() {
    interval(POLL_INTERVAL_MS).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.productService.loadProducts();
    });
  }
  handleCategorySelected(categoryId) {
    const current = this.filters().categories || [];
    const updated = current.includes(categoryId) ? current.filter((c) => c !== categoryId) : [...current, categoryId];
    this.productService.setFilters({ categories: updated });
  }
  handleClearCategories() {
    this.productService.setFilters({ categories: [] });
  }
  handleFilterChanged(filters) {
    this.productService.setFilters(filters);
  }
  handleClearFilters() {
    this.productService.clearFilters();
  }
  handlePageChange(page) {
    this.productService.setPage(page);
    this.scrollToTop();
  }
  handleItemsPerPageChange(count) {
    this.productService.setItemsPerPage(count);
    this.scrollToTop();
  }
  handleAddToCart(event) {
    this.cartService.addToCart(event.product, event.quantity);
  }
  handleViewDetails(product) {
    this.selectedProduct = product;
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  static \u0275fac = function ProductList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductList)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductList, selectors: [["app-product-list"]], decls: 7, vars: 4, consts: [[1, "product-list-page"], [3, "categorySelected", "clearCategories", "categories", "selectedCategories"], [1, "filter-section"], [3, "filterChanged", "clearFilters"], [1, "products-section"], [1, "products-grid"], [3, "product"], [3, "pageChange", "items_per_pageChange", "pagination"], [3, "addToCart", "viewDetails", "product"], [1, "empty-state"], [1, "empty-icon"], ["alt", "", "aria-hidden", "true", 1, "empty-state-img", 3, "src"], [1, "empty-title-no-products"], [1, "empty-title"], [1, "empty-description"], [1, "clear-filters-button", 3, "click"]], template: function ProductList_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "app-category-bar", 1);
      \u0275\u0275listener("categorySelected", function ProductList_Template_app_category_bar_categorySelected_1_listener($event) {
        return ctx.handleCategorySelected($event);
      })("clearCategories", function ProductList_Template_app_category_bar_clearCategories_1_listener() {
        return ctx.handleClearCategories();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "section", 2)(3, "app-product-filter", 3);
      \u0275\u0275listener("filterChanged", function ProductList_Template_app_product_filter_filterChanged_3_listener($event) {
        return ctx.handleFilterChanged($event);
      })("clearFilters", function ProductList_Template_app_product_filter_clearFilters_3_listener() {
        return ctx.handleClearFilters();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "section", 4);
      \u0275\u0275conditionalCreate(5, ProductList_Conditional_5_Template, 4, 1)(6, ProductList_Conditional_6_Template, 2, 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("categories", ctx.categories())("selectedCategories", ctx.filters().categories || \u0275\u0275pureFunction0(3, _c02));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.products().length > 0 ? 5 : 6);
    }
  }, dependencies: [TranslateModule, CategoryBar, ProductFilter, ProductCard, ProductPagination, TranslatePipe], styles: ["\n\n.product-list-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--color-background);\n}\n.filter-section[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: var(--space-6);\n}\n.products-section[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 0 var(--space-6) var(--space-6);\n}\n.products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: var(--space-6);\n  margin-bottom: var(--space-8);\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-16) var(--space-6);\n  text-align: center;\n}\n.empty-state-img[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.4;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin-bottom: var(--space-4);\n  opacity: 0.5;\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0 0 var(--space-2) 0;\n}\n.empty-title-no-products[_ngcontent-%COMP%] {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: #6b6760;\n  margin: 0;\n  text-align: center;\n}\n.empty-description[_ngcontent-%COMP%] {\n  font-size: var(--text-base);\n  color: var(--color-text-secondary);\n  margin: 0 0 var(--space-6) 0;\n  max-width: 500px;\n}\n.clear-filters-button[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-6);\n  background: var(--color-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  border-radius: var(--radius-md);\n  font-size: var(--text-base);\n  font-weight: var(--font-medium);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .clear-filters-button[_ngcontent-%COMP%]:hover {\n    background: var(--color-primary-hover);\n    box-shadow: var(--shadow-md);\n    transform: translateY(-1px);\n  }\n}\n@media (min-width: 1024px) {\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n    gap: var(--space-8);\n  }\n}\n@media (max-width: 768px) {\n  .filter-section[_ngcontent-%COMP%], \n   .products-section[_ngcontent-%COMP%] {\n    padding-left: var(--space-4);\n    padding-right: var(--space-4);\n  }\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n    gap: var(--space-4);\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: var(--space-12) var(--space-4);\n  }\n  .empty-icon[_ngcontent-%COMP%] {\n    font-size: 3rem;\n  }\n  .empty-title[_ngcontent-%COMP%], \n   .empty-title-no-products[_ngcontent-%COMP%] {\n    font-size: var(--text-xl);\n  }\n}\n@media (max-width: 480px) {\n  .filter-section[_ngcontent-%COMP%], \n   .products-section[_ngcontent-%COMP%] {\n    padding-left: var(--space-3);\n    padding-right: var(--space-3);\n  }\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: var(--space-3);\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: var(--space-10) var(--space-3);\n  }\n  .empty-icon[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n    margin-bottom: var(--space-3);\n  }\n  .empty-title[_ngcontent-%COMP%], \n   .empty-title-no-products[_ngcontent-%COMP%] {\n    font-size: var(--text-lg);\n  }\n  .empty-description[_ngcontent-%COMP%] {\n    font-size: var(--text-sm);\n  }\n}\n@media (max-width: 375px) {\n  .filter-section[_ngcontent-%COMP%], \n   .products-section[_ngcontent-%COMP%] {\n    padding-left: var(--space-2);\n    padding-right: var(--space-2);\n  }\n  .products-grid[_ngcontent-%COMP%] {\n    gap: var(--space-2);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .clear-filters-button[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=product-list.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductList, [{
    type: Component,
    args: [{ selector: "app-product-list", imports: [TranslateModule, CategoryBar, ProductFilter, ProductCard, ProductPagination], template: `<div class="product-list-page">\r
  <app-category-bar\r
    [categories]="categories()"\r
    [selectedCategories]="filters().categories || []"\r
    (categorySelected)="handleCategorySelected($event)"\r
    (clearCategories)="handleClearCategories()"\r
  />\r
\r
  <section class="filter-section">\r
    <app-product-filter\r
      (filterChanged)="handleFilterChanged($event)"\r
      (clearFilters)="handleClearFilters()"\r
    />\r
  </section>\r
\r
  <section class="products-section">\r
    @if (products().length > 0) {\r
      <div class="products-grid">\r
        @for (product of products(); track product.id) {\r
          <app-product-card\r
            [product]="product"\r
            (addToCart)="handleAddToCart($event)"\r
            (viewDetails)="handleViewDetails($event)"\r
          />\r
        }\r
      </div>\r
\r
      <app-product-pagination\r
        [pagination]="pagination()"\r
        (pageChange)="handlePageChange($event)"\r
        (items_per_pageChange)="handleItemsPerPageChange($event)"\r
      />\r
    } @else {\r
      @if (allProducts().length === 0) {\r
        <!-- \u{1F4E6} \u2192 orderwhite.webp (no products at all) -->\r
        <div class="empty-state">\r
          <div class="empty-icon">\r
            <img [src]="icons.order" alt="" aria-hidden="true" class="empty-state-img" />\r
          </div>\r
          <h3 class="empty-title-no-products">{{ 'products.empty' | translate }}</h3>\r
        </div>\r
      } @else {\r
        <!-- \u{1F50D} \u2192 searchwhite.webp (no results for current filters) -->\r
        <div class="empty-state">\r
          <div class="empty-icon">\r
            <img [src]="icons.search" alt="" aria-hidden="true" class="empty-state-img" />\r
          </div>\r
          <h3 class="empty-title">{{ 'product.no_products_found' | translate }}</h3>\r
          <p class="empty-description">\r
            {{ 'product.try_different_filters' | translate }}\r
          </p>\r
          <button class="clear-filters-button" (click)="handleClearFilters()">\r
            {{ 'filter.clear_all' | translate }}\r
          </button>\r
        </div>\r
      }\r
    }\r
  </section>\r
</div>\r
`, styles: ["/* src/app/shared/components/product-list/product-list.css */\n.product-list-page {\n  min-height: 100vh;\n  background: var(--color-background);\n}\n.filter-section {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: var(--space-6);\n}\n.products-section {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 0 var(--space-6) var(--space-6);\n}\n.products-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: var(--space-6);\n  margin-bottom: var(--space-8);\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-16) var(--space-6);\n  text-align: center;\n}\n.empty-state-img {\n  width: 64px;\n  height: 64px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.4;\n}\n.empty-icon {\n  font-size: 4rem;\n  margin-bottom: var(--space-4);\n  opacity: 0.5;\n}\n.empty-title {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: var(--color-text-primary);\n  margin: 0 0 var(--space-2) 0;\n}\n.empty-title-no-products {\n  font-size: var(--text-2xl);\n  font-weight: var(--font-bold);\n  color: #6b6760;\n  margin: 0;\n  text-align: center;\n}\n.empty-description {\n  font-size: var(--text-base);\n  color: var(--color-text-secondary);\n  margin: 0 0 var(--space-6) 0;\n  max-width: 500px;\n}\n.clear-filters-button {\n  padding: var(--space-3) var(--space-6);\n  background: var(--color-primary);\n  color: var(--color-text-on-primary);\n  border: none;\n  border-radius: var(--radius-md);\n  font-size: var(--text-base);\n  font-weight: var(--font-medium);\n  cursor: pointer;\n  transition: all var(--transition-fast);\n  font-family: var(--font-primary);\n  min-height: 44px;\n}\n@media (hover: hover) and (pointer: fine) {\n  .clear-filters-button:hover {\n    background: var(--color-primary-hover);\n    box-shadow: var(--shadow-md);\n    transform: translateY(-1px);\n  }\n}\n@media (min-width: 1024px) {\n  .products-grid {\n    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n    gap: var(--space-8);\n  }\n}\n@media (max-width: 768px) {\n  .filter-section,\n  .products-section {\n    padding-left: var(--space-4);\n    padding-right: var(--space-4);\n  }\n  .products-grid {\n    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n    gap: var(--space-4);\n  }\n  .empty-state {\n    padding: var(--space-12) var(--space-4);\n  }\n  .empty-icon {\n    font-size: 3rem;\n  }\n  .empty-title,\n  .empty-title-no-products {\n    font-size: var(--text-xl);\n  }\n}\n@media (max-width: 480px) {\n  .filter-section,\n  .products-section {\n    padding-left: var(--space-3);\n    padding-right: var(--space-3);\n  }\n  .products-grid {\n    grid-template-columns: 1fr;\n    gap: var(--space-3);\n  }\n  .empty-state {\n    padding: var(--space-10) var(--space-3);\n  }\n  .empty-icon {\n    font-size: 2.5rem;\n    margin-bottom: var(--space-3);\n  }\n  .empty-title,\n  .empty-title-no-products {\n    font-size: var(--text-lg);\n  }\n  .empty-description {\n    font-size: var(--text-sm);\n  }\n}\n@media (max-width: 375px) {\n  .filter-section,\n  .products-section {\n    padding-left: var(--space-2);\n    padding-right: var(--space-2);\n  }\n  .products-grid {\n    gap: var(--space-2);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .clear-filters-button {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=product-list.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductList, { className: "ProductList", filePath: "src/app/shared/components/product-list/product-list.ts", lineNumber: 26 });
})();

// src/app/pages/products/products.ts
var Products = class _Products {
  static \u0275fac = function Products_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Products)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Products, selectors: [["app-products"]], decls: 2, vars: 0, consts: [[1, "products-page"]], template: function Products_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-product-list");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [ProductList], styles: ["\n\n.products-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--color-background);\n}\n/*# sourceMappingURL=products.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Products, [{
    type: Component,
    args: [{ selector: "app-products", standalone: true, imports: [ProductList], template: '<div class="products-page">\r\n  <app-product-list></app-product-list>\r\n</div>\r\n', styles: ["/* src/app/pages/products/products.css */\n.products-page {\n  min-height: 100vh;\n  background: var(--color-background);\n}\n/*# sourceMappingURL=products.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Products, { className: "Products", filePath: "src/app/pages/products/products.ts", lineNumber: 11 });
})();
export {
  Products
};
//# sourceMappingURL=chunk-PN424SLP.js.map
