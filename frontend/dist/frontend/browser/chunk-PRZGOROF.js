import {
  ProductService
} from "./chunk-CE6P7JRB.js";
import {
  ICONS
} from "./chunk-KM3DUJ3P.js";
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
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-UT7KEETW.js";
import "./chunk-NEOTYJOM.js";
import {
  Router,
  RouterModule
} from "./chunk-JGUC3CXT.js";
import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  __async,
  __spreadProps,
  __spreadValues,
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
  ɵɵdefineDirective,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵresolveWindow,
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

// src/app/shared/directives/resizable-table.directive.ts
var ResizableTableDirective = class _ResizableTableDirective {
  el;
  zone;
  tableId = "";
  table;
  cleanupFns = [];
  initTimer = null;
  GRAB_ZONE = 8;
  MIN_COL_WIDTH = 60;
  STORAGE_PREFIX = "roys_admin_col_widths_";
  constructor(el, zone) {
    this.el = el;
    this.zone = zone;
  }
  ngAfterViewInit() {
    this.table = this.el.nativeElement;
    this.zone.runOutsideAngular(() => {
      this.initTimer = setTimeout(() => this.initColumns(), 50);
    });
  }
  ngOnDestroy() {
    if (this.initTimer !== null)
      clearTimeout(this.initTimer);
    this.cleanupFns.forEach((fn) => fn());
    this.cleanupFns = [];
  }
  get storageKey() {
    return this.STORAGE_PREFIX + (this.tableId || "default");
  }
  saveWidths() {
    try {
      const widths = this.getHeaders().map((h) => h.getBoundingClientRect().width);
      localStorage.setItem(this.storageKey, JSON.stringify(widths));
    } catch {
    }
  }
  loadWidths() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  getHeaders() {
    return Array.from(this.table.querySelectorAll("thead th"));
  }
  initColumns() {
    const headers = this.getHeaders();
    if (!headers.length)
      return;
    const saved = this.loadWidths();
    if (saved) {
      headers.forEach((th, i) => {
        if (saved[i])
          th.style.minWidth = `${saved[i]}px`;
      });
    }
    headers.forEach((th) => {
      const onMouseMove = (e) => {
        const rect = th.getBoundingClientRect();
        const nearRightEdge = e.clientX >= rect.right - this.GRAB_ZONE;
        th.style.cursor = nearRightEdge ? "col-resize" : "default";
      };
      const onMouseDown = (e) => {
        const rect = th.getBoundingClientRect();
        if (e.clientX < rect.right - this.GRAB_ZONE)
          return;
        e.preventDefault();
        e.stopPropagation();
        const startX = e.clientX;
        const startWidth = rect.width;
        th.classList.add("is-resizing");
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
        const onDragMove = (ev) => {
          const newWidth = Math.max(this.MIN_COL_WIDTH, startWidth + (ev.clientX - startX));
          th.style.minWidth = `${newWidth}px`;
        };
        const onDragEnd = () => {
          document.removeEventListener("mousemove", onDragMove);
          document.removeEventListener("mouseup", onDragEnd);
          th.classList.remove("is-resizing");
          document.body.style.cursor = "";
          document.body.style.userSelect = "";
          this.saveWidths();
        };
        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragEnd);
      };
      th.addEventListener("mousemove", onMouseMove);
      th.addEventListener("mousedown", onMouseDown);
      this.cleanupFns.push(() => {
        th.removeEventListener("mousemove", onMouseMove);
        th.removeEventListener("mousedown", onMouseDown);
      });
    });
  }
  static \u0275fac = function ResizableTableDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResizableTableDirective)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _ResizableTableDirective, selectors: [["", "appResizableTable", ""]], inputs: { tableId: [0, "appResizableTable", "tableId"] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResizableTableDirective, [{
    type: Directive,
    args: [{
      selector: "[appResizableTable]",
      standalone: true
    }]
  }], () => [{ type: ElementRef }, { type: NgZone }], { tableId: [{
    type: Input,
    args: ["appResizableTable"]
  }] });
})();

// src/app/core/utils/image-utils.ts
function formatFileSize(bytes) {
  if (bytes === 0)
    return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

// src/app/pages/admin/admin.mock.ts
var MOCK_MODE = false;
var MOCK_USERS = [
  {
    id: "1",
    email: "kovacs.bela@gmail.com",
    first_name: "B\xE9la",
    last_name: "Kov\xE1cs",
    account_state: "admin",
    created_at: "2024-01-15T10:23:00"
  },
  {
    id: "2",
    email: "nagy.anna@outlook.com",
    first_name: "Anna",
    last_name: "Nagy",
    account_state: "verified",
    created_at: "2024-02-03T08:11:00"
  },
  {
    id: "3",
    email: "horvath.peter@freemail.hu",
    first_name: "P\xE9ter",
    last_name: "Horv\xE1th",
    account_state: "verified",
    created_at: "2024-03-22T14:55:00"
  },
  {
    id: "4",
    email: "toth.maria@citromail.hu",
    first_name: "M\xE1ria",
    last_name: "T\xF3th",
    account_state: "unverified",
    created_at: "2024-04-10T09:30:00"
  },
  {
    id: "5",
    email: "szabo.gabor@gmail.com",
    first_name: "G\xE1bor",
    last_name: "Szab\xF3",
    account_state: "banned",
    created_at: "2024-04-18T16:42:00"
  },
  {
    id: "6",
    email: "kiss.eva@yahoo.com",
    first_name: "\xC9va",
    last_name: "Kiss",
    account_state: "verified",
    created_at: "2024-05-01T11:00:00"
  },
  {
    id: "7",
    email: "fekete.laszlo@gmail.com",
    first_name: "L\xE1szl\xF3",
    last_name: "Fekete",
    account_state: "deleted",
    created_at: "2024-05-15T07:18:00"
  },
  {
    id: "8",
    email: "molnar.zsuzsa@gmail.com",
    first_name: "Zsuzsa",
    last_name: "Moln\xE1r",
    account_state: "verified",
    created_at: "2024-06-02T13:27:00"
  }
];
var MOCK_ORDERS = [
  {
    id: "1001",
    user_id: "2",
    email: "nagy.anna@outlook.com",
    billing_name: "Nagy Anna",
    order_status: "delivered",
    created_at: "2025-02-10T10:15:00",
    price: "12490",
    city: "Budapest",
    zipcode: "1051",
    address: "V\xE1ci utca",
    house_number: "14",
    apartment_number: "3",
    phone_number: "+36301234567",
    note: ""
  },
  {
    id: "1002",
    user_id: "3",
    email: "horvath.peter@freemail.hu",
    billing_name: "Horv\xE1th P\xE9ter",
    order_status: "shipped",
    created_at: "2025-02-18T14:40:00",
    price: "7890",
    city: "P\xE9cs",
    zipcode: "7621",
    address: "Kir\xE1ly utca",
    house_number: "22",
    apartment_number: "",
    phone_number: "+36209876543",
    note: "K\xE9rem a cseng\u0151re nyomni: Horv\xE1th"
  },
  {
    id: "1003",
    user_id: "6",
    email: "kiss.eva@yahoo.com",
    billing_name: "Kiss \xC9va",
    order_status: "processing",
    created_at: "2025-03-01T09:05:00",
    price: "24990",
    city: "Debrecen",
    zipcode: "4024",
    address: "Piac utca",
    house_number: "5",
    apartment_number: "2",
    phone_number: "+36701112233",
    note: ""
  },
  {
    id: "1004",
    user_id: "8",
    email: "molnar.zsuzsa@gmail.com",
    billing_name: "Moln\xE1r Zsuzsa",
    order_status: "pending",
    created_at: "2025-03-10T17:30:00",
    price: "4990",
    city: "Gy\u0151r",
    zipcode: "9021",
    address: "Baross G\xE1bor \xFAt",
    house_number: "31",
    apartment_number: "",
    phone_number: "+36305559988",
    note: "Munkaid\u0151ben k\xE9zbes\xEDts\xE9k"
  },
  {
    id: "1005",
    user_id: "2",
    email: "nagy.anna@outlook.com",
    billing_name: "Nagy Anna",
    order_status: "cancelled",
    created_at: "2025-03-12T11:00:00",
    price: "9800",
    city: "Budapest",
    zipcode: "1051",
    address: "V\xE1ci utca",
    house_number: "14",
    apartment_number: "3",
    phone_number: "+36301234567",
    note: "T\xE9ves rendel\xE9s"
  },
  {
    id: "1006",
    user_id: "3",
    email: "horvath.peter@freemail.hu",
    billing_name: "Horv\xE1th P\xE9ter",
    order_status: "delivered",
    created_at: "2025-03-14T08:22:00",
    price: "31500",
    city: "P\xE9cs",
    zipcode: "7621",
    address: "Kir\xE1ly utca",
    house_number: "22",
    apartment_number: "",
    phone_number: "+36209876543",
    note: ""
  },
  {
    id: "1007",
    user_id: "6",
    email: "kiss.eva@yahoo.com",
    billing_name: "Kiss \xC9va",
    order_status: "shipped",
    created_at: "2025-03-16T15:10:00",
    price: "18200",
    city: "Debrecen",
    zipcode: "4024",
    address: "Piac utca",
    house_number: "5",
    apartment_number: "2",
    phone_number: "+36701112233",
    note: ""
  }
];

// src/app/core/models/admin.models.ts
var ACCOUNT_STATES = ["verified", "unverified", "admin", "superadmin"];
var ORDER_COLUMNS = {
  id: (o) => o.id,
  email: (o) => o.email || "",
  billing: (o) => o.billing_name || "",
  city: (o) => o.city || "",
  zip: (o) => o.zipcode || "",
  address: (o) => o.address || "",
  phone: (o) => o.phone_number || "",
  price: (o) => o.price || "",
  status: (o) => o.order_status || "",
  note: (o) => o.note || ""
};
var USER_COLUMNS = {
  id: (u) => u.id,
  email: (u) => u.email || "",
  name: (u) => `${u.last_name} ${u.first_name}`.trim(),
  firstname: (u) => u.first_name || "",
  lastname: (u) => u.last_name || "",
  role: (u) => u.account_state || "",
  state: (u) => u.account_state || ""
};
var PRODUCT_COLUMNS = {
  id: (p) => p.id || "",
  name: (p) => p.name || "",
  brand: (p) => p.brand || "",
  category: (p) => p.category || "",
  sku: (p) => p.sku || "",
  price: (p) => String(p.price ?? ""),
  stock: (p) => String(p.stock_number ?? ""),
  rating: (p) => String(p.rating_number ?? ""),
  status: (p) => p.in_stock ? "active" : "inactive"
};

// src/app/core/utils/admin.utils.ts
function emptyProductForm() {
  return {
    name_hu: "",
    name_en: "",
    name_de: "",
    description_hu: "",
    description_en: "",
    description_de: "",
    description_preview_hu: "",
    description_preview_en: "",
    description_preview_de: "",
    price_huf: 0,
    sale_percentage: 0,
    stock: 0,
    category_id: "",
    manufacturer: "",
    brand: "",
    sku: "",
    active_ingredients: "",
    packaging_hu: "",
    packaging_en: "",
    packaging_de: "",
    thumbnail_url: "",
    featured: false
  };
}
function parseSearchQuery(raw) {
  const colonIndex = raw.indexOf(":");
  if (colonIndex > 0 && colonIndex < raw.length - 1) {
    const column = raw.substring(0, colonIndex).trim().toLowerCase();
    const value = raw.substring(colonIndex + 1).trim().toLowerCase();
    if (column && value) {
      return { column, value };
    }
  }
  return { column: null, value: raw.trim().toLowerCase() };
}
function smartFilter(items, rawQuery, columnMap) {
  if (!rawQuery.trim())
    return items;
  const { column, value } = parseSearchQuery(rawQuery);
  if (!value)
    return items;
  if (column) {
    const extractor = columnMap[column];
    if (extractor) {
      return items.filter((item) => extractor(item).toLowerCase().includes(value));
    }
    return items;
  }
  const extractors = Object.values(columnMap);
  return items.filter((item) => extractors.some((extract) => extract(item).toLowerCase().includes(value)));
}

// src/app/pages/admin/admin.ts
var _c0 = (a0) => ({ name: a0 });
var _c1 = (a0, a1) => ({ name: a0, state: a1 });
var _forTrack0 = ($index, $item) => $item.id;
function Admin_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "Roy's Admin");
    \u0275\u0275elementEnd();
  }
}
function Admin_For_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, item_r2.label));
  }
}
function Admin_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275listener("click", function Admin_For_12_Template_button_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setSection(item_r2.id));
    });
    \u0275\u0275element(2, "img", 25);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275conditionalCreate(4, Admin_For_12_Conditional_4_Template, 3, 3, "span", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap("nav-item" + (ctx_r2.activeSection() === item_r2.id ? " active" : ""));
    \u0275\u0275attribute("title", \u0275\u0275pipeBind1(1, 6, item_r2.label));
    \u0275\u0275advance(2);
    \u0275\u0275property("src", item_r2.icon, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("alt", \u0275\u0275pipeBind1(3, 8, item_r2.label));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.showNavLabels() ? 4 : -1);
  }
}
function Admin_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "button", 27);
    \u0275\u0275listener("click", function Admin_Conditional_13_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.logout());
    });
    \u0275\u0275element(2, "img", 28);
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r2.icons.login, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 2, "profile.logout"));
  }
}
function Admin_Conditional_29_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_29_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.stats().totalOrders);
  }
}
function Admin_Conditional_29_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_29_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatRevenue(ctx_r2.stats().revenue));
  }
}
function Admin_Conditional_29_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_29_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.stats().totalUsers);
  }
}
function Admin_Conditional_29_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_29_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.stats().totalProducts);
  }
}
function Admin_Conditional_29_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r2.stats().lowStock, " ", \u0275\u0275pipeBind1(2, 2, "admin.stats.low_stock"), " ");
  }
}
function Admin_Conditional_29_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "span", 50);
    \u0275\u0275text(2, "\u23F3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "admin.loading"));
  }
}
function Admin_Conditional_29_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 51);
    \u0275\u0275listener("click", function Admin_Conditional_29_Conditional_52_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.loadOrders());
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", \u0275\u0275pipeBind1(3, 2, ctx_r2.ordersError()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 4, "common.retry"), " ");
  }
}
function Admin_Conditional_29_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "admin.no_orders"));
  }
}
function Admin_Conditional_29_Conditional_54_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 54);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 55);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", order_r7.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r7.email || order_r7.user_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(order_r7.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getOrderAddressSummary(order_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatRevenue(order_r7.price));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getOrderStatusClass(order_r7.order_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r7.order_status, " ");
  }
}
function Admin_Conditional_29_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "table", 52)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody");
    \u0275\u0275repeaterCreate(23, Admin_Conditional_29_Conditional_54_For_24_Template, 14, 8, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 6, "admin.table.order_id"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 8, "admin.table.email"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 10, "admin.table.date"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 12, "admin.table.address"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 14, "admin.table.total"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 16, "admin.table.status"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.recentOrders());
  }
}
function Admin_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 29)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 30)(6, "div", 31)(7, "div", 32);
    \u0275\u0275element(8, "img", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 34);
    \u0275\u0275conditionalCreate(10, Admin_Conditional_29_Conditional_10_Template, 2, 0, "span", 35)(11, Admin_Conditional_29_Conditional_11_Template, 2, 1, "span", 36);
    \u0275\u0275elementStart(12, "span", 37);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 38)(16, "div", 32);
    \u0275\u0275element(17, "img", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 34);
    \u0275\u0275conditionalCreate(19, Admin_Conditional_29_Conditional_19_Template, 2, 0, "span", 35)(20, Admin_Conditional_29_Conditional_20_Template, 2, 1, "span", 36);
    \u0275\u0275elementStart(21, "span", 37);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 39)(25, "div", 32);
    \u0275\u0275element(26, "img", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 34);
    \u0275\u0275conditionalCreate(28, Admin_Conditional_29_Conditional_28_Template, 2, 0, "span", 35)(29, Admin_Conditional_29_Conditional_29_Template, 2, 1, "span", 36);
    \u0275\u0275elementStart(30, "span", 37);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 40)(34, "div", 32);
    \u0275\u0275element(35, "img", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 34);
    \u0275\u0275conditionalCreate(37, Admin_Conditional_29_Conditional_37_Template, 2, 0, "span", 35)(38, Admin_Conditional_29_Conditional_38_Template, 2, 1, "span", 36);
    \u0275\u0275elementStart(39, "span", 37);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(42, Admin_Conditional_29_Conditional_42_Template, 3, 4, "span", 41);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div", 42)(44, "div", 43)(45, "h2", 44);
    \u0275\u0275text(46);
    \u0275\u0275pipe(47, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 45);
    \u0275\u0275listener("click", function Admin_Conditional_29_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setSection("orders"));
    });
    \u0275\u0275text(49);
    \u0275\u0275pipe(50, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(51, Admin_Conditional_29_Conditional_51_Template, 6, 3, "div", 46)(52, Admin_Conditional_29_Conditional_52_Template, 7, 6, "div", 47)(53, Admin_Conditional_29_Conditional_53_Template, 3, 3, "div", 48)(54, Admin_Conditional_29_Conditional_54_Template, 25, 18, "div", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 17, "admin.greeting", \u0275\u0275pureFunction1(32, _c0, ctx_r2.adminName())));
    \u0275\u0275advance(5);
    \u0275\u0275property("src", ctx_r2.icons.order, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.ordersLoading() ? 10 : 11);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 20, "admin.stats.total_orders"));
    \u0275\u0275advance(4);
    \u0275\u0275property("src", ctx_r2.icons.payment, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.ordersLoading() ? 19 : 20);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 22, "admin.stats.revenue"));
    \u0275\u0275advance(4);
    \u0275\u0275property("src", ctx_r2.icons.customers, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.usersLoading() ? 28 : 29);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(32, 24, "admin.stats.total_users"));
    \u0275\u0275advance(4);
    \u0275\u0275property("src", ctx_r2.icons.sale, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.productsLoading() ? 37 : 38);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(41, 26, "admin.stats.total_products"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.productsLoading() && ctx_r2.stats().lowStock > 0 ? 42 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(47, 28, "admin.recent_orders"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(50, 30, "admin.view_all"), " \u2192 ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.ordersLoading() ? 51 : ctx_r2.ordersError() ? 52 : ctx_r2.recentOrders().length === 0 ? 53 : 54);
  }
}
function Admin_Conditional_30_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "span", 50);
    \u0275\u0275text(2, "\u23F3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "admin.loading"));
  }
}
function Admin_Conditional_30_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 51);
    \u0275\u0275listener("click", function Admin_Conditional_30_Conditional_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.loadOrders());
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", \u0275\u0275pipeBind1(3, 2, ctx_r2.ordersError()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 4, "common.retry"), " ");
  }
}
function Admin_Conditional_30_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "admin.no_orders"));
  }
}
function Admin_Conditional_30_Conditional_11_Conditional_3_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 54);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 54);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 55);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td")(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 62);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", order_r10.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r10.email || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r10.billing_name || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(order_r10.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getOrderAddressSummary(order_r10));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r10.phone_number || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatRevenue(order_r10.price));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getOrderStatusClass(order_r10.order_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r10.order_status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r10.note || "\u2014");
  }
}
function Admin_Conditional_30_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 61)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th");
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th");
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "tbody");
    \u0275\u0275repeaterCreate(31, Admin_Conditional_30_Conditional_11_Conditional_3_For_32_Template, 20, 11, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 9, "admin.table.order_id"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 11, "admin.table.email"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 13, "admin.table.billing"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 15, "admin.table.date"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 17, "admin.table.address"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 19, "admin.table.phone"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 21, "admin.table.total"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 23, "admin.table.status"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 25, "admin.table.note"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.filteredOrders());
  }
}
function Admin_Conditional_30_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 49);
    \u0275\u0275conditionalCreate(2, Admin_Conditional_30_Conditional_11_Conditional_2_Template, 3, 3, "div", 48)(3, Admin_Conditional_30_Conditional_11_Conditional_3_Template, 33, 27, "table", 61);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.filteredOrders().length === 0 ? 2 : 3);
  }
}
function Admin_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 56)(2, "div", 57);
    \u0275\u0275element(3, "img", 58);
    \u0275\u0275elementStart(4, "input", 59);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Admin_Conditional_30_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.orderSearch, $event) || (ctx_r2.orderSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 60);
    \u0275\u0275listener("click", function Admin_Conditional_30_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadOrders());
    });
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, Admin_Conditional_30_Conditional_9_Template, 6, 3, "div", 46)(10, Admin_Conditional_30_Conditional_10_Template, 7, 6, "div", 47)(11, Admin_Conditional_30_Conditional_11_Template, 4, 1, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r2.icons.search, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.orderSearch);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(5, 6, "admin.search_orders") + "   (city:budapest, status:delivered)");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.ordersLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F504} ", \u0275\u0275pipeBind1(8, 8, "common.refresh"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.ordersLoading() ? 9 : ctx_r2.ordersError() ? 10 : 11);
  }
}
function Admin_Conditional_31_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "span", 50);
    \u0275\u0275text(2, "\u23F3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "admin.loading"));
  }
}
function Admin_Conditional_31_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 51);
    \u0275\u0275listener("click", function Admin_Conditional_31_Conditional_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.loadUsers());
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", \u0275\u0275pipeBind1(3, 2, ctx_r2.usersError()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 4, "common.retry"), " ");
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "admin.no_users"));
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Conditional_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 77);
    \u0275\u0275listener("click", function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Conditional_1_For_5_Template_button_click_0_listener() {
      const state_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const user_r14 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.requestChangeRole(user_r14, state_r18));
    });
    \u0275\u0275element(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const state_r18 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(8);
    \u0275\u0275advance();
    \u0275\u0275classMap("role-dot " + ctx_r2.getAccountStateClass(state_r18));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", state_r18, " ");
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72)(1, "span", 73);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Conditional_1_For_5_Template, 3, 3, "button", 74, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "div", 75);
    \u0275\u0275elementStart(7, "button", 76);
    \u0275\u0275listener("click", function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r16);
      const user_r14 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.requestBanUser(user_r14));
    });
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r14 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "admin.user_actions.set_role"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.getAvailableStates(user_r14));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 4, "admin.user_actions.ban"), " ");
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 78);
    \u0275\u0275listener("click", function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const user_r14 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.requestUnbanUser(user_r14));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "div", 75);
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "admin.user_actions.unban"), " ");
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275conditionalCreate(1, Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Conditional_1_Template, 10, 6)(2, Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Conditional_2_Template, 4, 3);
    \u0275\u0275elementStart(3, "button", 71);
    \u0275\u0275listener("click", function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r15);
      const user_r14 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.requestDeleteUser(user_r14));
    });
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r14.account_state !== "banned" ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 2, "admin.user_actions.delete"), " ");
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67)(1, "button", 69);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275listener("click", function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      const user_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.toggleUserMenu(user_r14.id, $event));
    });
    \u0275\u0275text(3, " \u22EE ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Conditional_4_Template, 6, 4, "div", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(2, 2, "admin.table.actions"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.activeUserMenu() === user_r14.id ? 4 : -1);
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "admin.user_actions.you"));
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 65)(3, "div", 66);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 54);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 54);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 54);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275conditionalCreate(17, Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_17_Template, 5, 4, "div", 67)(18, Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_18_Template, 3, 3, "span", 68)(19, Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Conditional_19_Template, 2, 0, "span", 54);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("row-banned", user_r14.account_state === "banned")("row-deleted", user_r14.account_state === "deleted");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.getUserInitial(user_r14));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getUserFullName(user_r14));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r14.email);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("role-badge " + ctx_r2.getAccountStateClass(user_r14.account_state));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r14.account_state, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(user_r14.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", user_r14.id);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.isSelf(user_r14) && user_r14.account_state !== "deleted" ? 17 : ctx_r2.isSelf(user_r14) ? 18 : 19);
  }
}
function Admin_Conditional_31_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 63)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275repeaterCreate(21, Admin_Conditional_31_Conditional_11_Conditional_3_For_22_Template, 20, 13, "tr", 64, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 5, "admin.table.user"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 7, "admin.table.email"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 9, "admin.table.role"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 11, "admin.table.registered"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 13, "admin.table.actions"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.filteredUsers());
  }
}
function Admin_Conditional_31_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 49);
    \u0275\u0275conditionalCreate(2, Admin_Conditional_31_Conditional_11_Conditional_2_Template, 3, 3, "div", 48)(3, Admin_Conditional_31_Conditional_11_Conditional_3_Template, 23, 15, "table", 63);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.filteredUsers().length === 0 ? 2 : 3);
  }
}
function Admin_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 56)(2, "div", 57);
    \u0275\u0275element(3, "img", 58);
    \u0275\u0275elementStart(4, "input", 59);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Admin_Conditional_31_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userSearch, $event) || (ctx_r2.userSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 60);
    \u0275\u0275listener("click", function Admin_Conditional_31_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadUsers());
    });
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, Admin_Conditional_31_Conditional_9_Template, 6, 3, "div", 46)(10, Admin_Conditional_31_Conditional_10_Template, 7, 6, "div", 47)(11, Admin_Conditional_31_Conditional_11_Template, 4, 1, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r2.icons.search, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.userSearch);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(5, 6, "admin.search_users") + "   (role:admin, email:gmail)");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.usersLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F504} ", \u0275\u0275pipeBind1(8, 8, "common.refresh"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.usersLoading() ? 9 : ctx_r2.usersError() ? 10 : 11);
  }
}
function Admin_Conditional_32_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "span", 50);
    \u0275\u0275text(2, "\u23F3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "admin.loading"));
  }
}
function Admin_Conditional_32_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 51);
    \u0275\u0275listener("click", function Admin_Conditional_32_Conditional_13_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.loadProducts());
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", \u0275\u0275pipeBind1(3, 2, ctx_r2.productsError()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 4, "common.retry"), " ");
  }
}
function Admin_Conditional_32_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "admin.no_products"));
  }
}
function Admin_Conditional_32_Conditional_14_Conditional_3_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 81)(3, "div", 82);
    \u0275\u0275element(4, "img", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 84)(6, "span", 85);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(8, "td")(9, "button", 86);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275listener("click", function Admin_Conditional_32_Conditional_14_Conditional_3_For_34_Template_button_click_9_listener() {
      const product_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.openGallery(product_r23));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 87);
    \u0275\u0275element(12, "rect", 88)(13, "circle", 89)(14, "polyline", 90);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "span", 91);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "td", 54);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 54);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 54);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 55);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td")(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "td", 54);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "td")(32, "span");
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "translate");
    \u0275\u0275pipe(35, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "td")(37, "div", 92)(38, "button", 93);
    \u0275\u0275pipe(39, "translate");
    \u0275\u0275listener("click", function Admin_Conditional_32_Conditional_14_Conditional_3_For_34_Template_button_click_38_listener() {
      const product_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.openProductForm(product_r23));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(40, "svg", 94);
    \u0275\u0275element(41, "path", 95)(42, "path", 96);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(43, "button", 97);
    \u0275\u0275pipe(44, "translate");
    \u0275\u0275listener("click", function Admin_Conditional_32_Conditional_14_Conditional_3_For_34_Template_button_click_43_listener($event) {
      const product_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.requestDeleteProduct(product_r23, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(45, "svg", 94);
    \u0275\u0275element(46, "polyline", 98)(47, "path", 99);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const product_r23 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275property("src", ctx_r2.icons.categoryMedicines, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r23.name);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("title", \u0275\u0275pipeBind1(10, 18, "admin.table.view_images"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.getProductImageCount(product_r23));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r23.brand);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r23.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r23.sku);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatRevenue(product_r23.price));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(product_r23.stock_number < 10 ? "stock-low" : "stock-ok");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", product_r23.stock_number, " ", \u0275\u0275pipeBind1(28, 20, "common.items_unit"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u2605 ", product_r23.rating_number.toFixed(1));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("status-badge status-" + (product_r23.in_stock ? "delivered" : "cancelled"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", product_r23.in_stock ? \u0275\u0275pipeBind1(34, 22, "admin.active") : \u0275\u0275pipeBind1(35, 24, "admin.inactive"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275attribute("title", \u0275\u0275pipeBind1(39, 26, "common.edit"));
    \u0275\u0275advance(5);
    \u0275\u0275attribute("title", \u0275\u0275pipeBind1(44, 28, "admin.product_form.delete"));
  }
}
function Admin_Conditional_32_Conditional_14_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 80)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th");
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th");
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "tbody");
    \u0275\u0275repeaterCreate(33, Admin_Conditional_32_Conditional_14_Conditional_3_For_34_Template, 48, 30, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 9, "admin.table.product"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 11, "admin.table.images"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 13, "admin.table.brand"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 15, "admin.table.category"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 17, "admin.table.price"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 19, "admin.table.stock"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(25, 21, "admin.table.rating"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 23, "admin.table.status"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(31, 25, "admin.table.actions"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.filteredProducts());
  }
}
function Admin_Conditional_32_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 49);
    \u0275\u0275conditionalCreate(2, Admin_Conditional_32_Conditional_14_Conditional_2_Template, 3, 3, "div", 48)(3, Admin_Conditional_32_Conditional_14_Conditional_3_Template, 35, 27, "table", 80);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.filteredProducts().length === 0 ? 2 : 3);
  }
}
function Admin_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 56)(2, "div", 57);
    \u0275\u0275element(3, "img", 58);
    \u0275\u0275elementStart(4, "input", 59);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function Admin_Conditional_32_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.productSearch, $event) || (ctx_r2.productSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 79);
    \u0275\u0275listener("click", function Admin_Conditional_32_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openProductForm());
    });
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 60);
    \u0275\u0275listener("click", function Admin_Conditional_32_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadProducts());
    });
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, Admin_Conditional_32_Conditional_12_Template, 6, 3, "div", 46)(13, Admin_Conditional_32_Conditional_13_Template, 7, 6, "div", 47)(14, Admin_Conditional_32_Conditional_14_Template, 4, 1, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r2.icons.search, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.productSearch);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(5, 7, "admin.search_products") + "   (brand:bayer, category:medicines)");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" + ", \u0275\u0275pipeBind1(8, 9, "admin.product_form.add"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.productsLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F504} ", \u0275\u0275pipeBind1(11, 11, "common.refresh"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.productsLoading() ? 12 : ctx_r2.productsError() ? 13 : 14);
  }
}
function Admin_Conditional_33_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 105);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.name);
  }
}
function Admin_Conditional_33_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 115)(1, "span", 50);
    \u0275\u0275text(2, "\u23F3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "admin.loading"));
  }
}
function Admin_Conditional_33_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 124);
    \u0275\u0275listener("click", function Admin_Conditional_33_Conditional_23_For_2_Template_div_click_0_listener() {
      const image_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openImageDetail(image_r27));
    });
    \u0275\u0275elementStart(1, "div", 125);
    \u0275\u0275element(2, "img", 126);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 127);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275listener("click", function Admin_Conditional_33_Conditional_23_For_2_Template_button_click_3_listener($event) {
      const image_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.requestDeleteImage(image_r27, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 94);
    \u0275\u0275element(7, "polyline", 98)(8, "path", 99)(9, "line", 128)(10, "line", 129);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "div", 130);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const image_r27 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", image_r27.objectUrl || image_r27.image_url, \u0275\u0275sanitizeUrl)("alt", image_r27.alt_text_en);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(4, 5, "admin.gallery.delete_image"))("title", \u0275\u0275pipeBind1(5, 7, "admin.gallery.delete_image"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", image_r27.alt_text_en || ctx_r2.extractFileName(image_r27.image_url), " ");
  }
}
function Admin_Conditional_33_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 116);
    \u0275\u0275repeaterCreate(1, Admin_Conditional_33_Conditional_23_For_2_Template, 13, 9, "div", 117, _forTrack0);
    \u0275\u0275elementStart(3, "div", 118);
    \u0275\u0275listener("click", function Admin_Conditional_33_Conditional_23_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.triggerFileUpload());
    });
    \u0275\u0275elementStart(4, "div", 119);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 120);
    \u0275\u0275element(6, "line", 121)(7, "line", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "span", 123);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.galleryImages());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 1, "admin.gallery.upload"));
  }
}
function Admin_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 100);
    \u0275\u0275listener("click", function Admin_Conditional_33_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onGalleryOverlayClick($event));
    });
    \u0275\u0275elementStart(1, "div", 101)(2, "div", 102)(3, "div", 103)(4, "h2", 104);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, Admin_Conditional_33_Conditional_7_Template, 2, 1, "span", 105);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 106)(9, "label", 107);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementStart(11, "span", 108);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 109);
    \u0275\u0275listener("click", function Admin_Conditional_33_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleTransparent());
    });
    \u0275\u0275element(15, "span", 110);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 111);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275listener("click", function Admin_Conditional_33_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeGallery());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 94);
    \u0275\u0275element(19, "line", 112)(20, "line", 113);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "div", 114);
    \u0275\u0275conditionalCreate(22, Admin_Conditional_33_Conditional_22_Template, 6, 3, "div", 115)(23, Admin_Conditional_33_Conditional_23_Template, 11, 3, "div", 116);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 9, "admin.gallery.title"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.galleryProduct()) ? 7 : -1, tmp_2_0);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("title", \u0275\u0275pipeBind1(10, 11, "admin.gallery.transparent_hint"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 13, "admin.gallery.transparent"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.uploadTransparent());
    \u0275\u0275attribute("aria-checked", ctx_r2.uploadTransparent());
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(17, 15, "common.close"));
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r2.galleryLoading() ? 22 : 23);
  }
}
function Admin_Conditional_34_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 141);
    \u0275\u0275listener("load", function Admin_Conditional_34_Conditional_9_Template_img_load_0_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDetailImageLoad($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r30 = ctx;
    \u0275\u0275property("src", img_r30.objectUrl || img_r30.image_url, \u0275\u0275sanitizeUrl)("alt", img_r30.alt_text_en);
  }
}
function Admin_Conditional_34_Conditional_14_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 142)(1, "span", 143);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 144);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const meta_r31 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "admin.gallery.meta.size"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(meta_r31.size);
  }
}
function Admin_Conditional_34_Conditional_14_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 142)(1, "span", 143);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 144);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const meta_r31 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "admin.gallery.meta.modified"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(meta_r31.lastModified);
  }
}
function Admin_Conditional_34_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 139)(1, "div", 142)(2, "span", 143);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 144);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 142)(8, "span", 143);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 144);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 142)(14, "span", 143);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 144);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, Admin_Conditional_34_Conditional_14_Conditional_19_Template, 6, 4, "div", 142);
    \u0275\u0275conditionalCreate(20, Admin_Conditional_34_Conditional_14_Conditional_20_Template, 6, 4, "div", 142);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const meta_r31 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 8, "admin.gallery.meta.filename"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(meta_r31.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 10, "admin.gallery.meta.type"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(meta_r31.type);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 12, "admin.gallery.meta.resolution"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(meta_r31.resolution);
    \u0275\u0275advance();
    \u0275\u0275conditional(meta_r31.size !== "\u2014" ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(meta_r31.lastModified !== "\u2014" ? 20 : -1);
  }
}
function Admin_Conditional_34_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 140)(1, "button", 145);
    \u0275\u0275listener("click", function Admin_Conditional_34_Conditional_15_Template_button_click_1_listener() {
      const img_r33 = \u0275\u0275restoreView(_r32);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.downloadImage(img_r33));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 94);
    \u0275\u0275element(3, "path", 146)(4, "polyline", 147)(5, "line", 148);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 1, "admin.gallery.download"), " ");
  }
}
function Admin_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 131);
    \u0275\u0275listener("click", function Admin_Conditional_34_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDetailOverlayClick($event));
    });
    \u0275\u0275elementStart(1, "div", 132)(2, "button", 133);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275listener("click", function Admin_Conditional_34_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeImageDetail());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 94);
    \u0275\u0275element(5, "line", 112)(6, "line", 113);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 134)(8, "div", 135);
    \u0275\u0275conditionalCreate(9, Admin_Conditional_34_Conditional_9_Template, 1, 2, "img", 136);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 137)(11, "h3", 138);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, Admin_Conditional_34_Conditional_14_Template, 21, 14, "div", 139);
    \u0275\u0275conditionalCreate(15, Admin_Conditional_34_Conditional_15_Template, 8, 3, "div", 140);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(3, 5, "common.close"));
    \u0275\u0275advance(7);
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.detailImage()) ? 9 : -1, tmp_2_0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 7, "admin.gallery.details"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_4_0 = ctx_r2.detailMeta()) ? 14 : -1, tmp_4_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r2.detailImage()) ? 15 : -1, tmp_5_0);
  }
}
function Admin_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275listener("click", function Admin_Conditional_35_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelDeleteImage());
    });
    \u0275\u0275elementStart(1, "div", 150);
    \u0275\u0275listener("click", function Admin_Conditional_35_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r34);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 151);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 152);
    \u0275\u0275element(4, "polyline", 98)(5, "path", 99);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "h3", 153);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 154);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 155)(13, "button", 156);
    \u0275\u0275listener("click", function Admin_Conditional_35_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelDeleteImage());
    });
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 157);
    \u0275\u0275listener("click", function Admin_Conditional_35_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmDeleteImage());
    });
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 4, "admin.gallery.confirm_delete_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 6, "admin.gallery.confirm_delete_text"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 8, "common.cancel"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(18, 10, "admin.gallery.delete_image"), " ");
  }
}
function Admin_Conditional_36_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function Admin_Conditional_36_For_12_Template_button_click_0_listener() {
      const tab_r37 = \u0275\u0275restoreView(_r36).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setProductFormTab(tab_r37.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r37 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("pf-tab" + (ctx_r2.productFormTab() === tab_r37.id ? " pf-tab-active" : ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 3, tab_r37.label), " ");
  }
}
function Admin_Conditional_36_Conditional_14_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 177);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r39 = ctx.$implicit;
    \u0275\u0275property("value", cat_r39.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", cat_r39.icon, " ", cat_r39.name_en);
  }
}
function Admin_Conditional_36_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 168)(1, "h3", 169);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 170)(5, "div", 171)(6, "label", 172);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 173);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_14_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("name_hu", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 171)(11, "label", 172);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 173);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_14_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("name_en", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 171)(16, "label", 172);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 173);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_14_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("name_de", $event));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(20, "div", 168)(21, "h3", 169);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 174)(25, "div", 171)(26, "label", 172);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 173);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_14_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("brand", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 171)(31, "label", 172);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 173);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_14_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("manufacturer", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 171)(36, "label", 172);
    \u0275\u0275text(37, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 173);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_14_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("sku", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 171)(40, "label", 172);
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "select", 175);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_14_Template_select_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("category_id", $event));
    });
    \u0275\u0275elementStart(44, "option", 176);
    \u0275\u0275text(45, "\u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(46, Admin_Conditional_36_Conditional_14_For_47_Template, 2, 3, "option", 177, _forTrack0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div", 168)(49, "div", 171)(50, "label", 172);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "input", 178);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_14_Template_input_ngModelChange_53_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("thumbnail_url", $event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 17, "admin.product_form.names"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 19, "admin.product_form.name_hu"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().name_hu);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 21, "admin.product_form.name_en"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().name_en);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 23, "admin.product_form.name_de"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().name_de);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 25, "admin.product_form.identification"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 27, "admin.table.brand"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().brand);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(33, 29, "admin.product_form.manufacturer"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().manufacturer);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().sku);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(42, 31, "admin.table.category"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().category_id);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.availableCategories());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(52, 33, "admin.product_form.thumbnail_url"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().thumbnail_url);
  }
}
function Admin_Conditional_36_Conditional_15_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 181)(1, "span", 182);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 183);
    \u0275\u0275text(4, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 184);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 185);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatRevenue(ctx_r2.productFormData().price_huf));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.formatRevenue(ctx_r2.productFormData().price_huf * (1 - ctx_r2.productFormData().sale_percentage / 100)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("-", ctx_r2.productFormData().sale_percentage, "%");
  }
}
function Admin_Conditional_36_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 168)(1, "div", 170)(2, "div", 171)(3, "label", 172);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 179);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_15_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r40);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("price_huf", +$event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 171)(8, "label", 172);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 180);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_15_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r40);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("sale_percentage", +$event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 171)(13, "label", 172);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 179);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_15_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r40);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("stock", +$event));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(17, Admin_Conditional_36_Conditional_15_Conditional_17_Template, 9, 3, "div", 181);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 7, "admin.product_form.price_huf"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().price_huf);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 9, "admin.product_form.sale_pct"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().sale_percentage);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 11, "admin.table.stock"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().stock);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.productFormData().price_huf > 0 && ctx_r2.productFormData().sale_percentage > 0 ? 17 : -1);
  }
}
function Admin_Conditional_36_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 168)(1, "h3", 169);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 170)(5, "div", 171)(6, "label", 172);
    \u0275\u0275text(7, "HU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 186);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_16_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("description_preview_hu", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 171)(10, "label", 172);
    \u0275\u0275text(11, "EN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "textarea", 186);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_16_Template_textarea_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("description_preview_en", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 171)(14, "label", 172);
    \u0275\u0275text(15, "DE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "textarea", 186);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_16_Template_textarea_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("description_preview_de", $event));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 168)(18, "h3", 169);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 187)(22, "div", 171)(23, "label", 172);
    \u0275\u0275text(24, "HU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "textarea", 188);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_16_Template_textarea_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("description_hu", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 171)(27, "label", 172);
    \u0275\u0275text(28, "EN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "textarea", 188);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_16_Template_textarea_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("description_en", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 171)(31, "label", 172);
    \u0275\u0275text(32, "DE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "textarea", 188);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_16_Template_textarea_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("description_de", $event));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 8, "admin.product_form.previews"));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().description_preview_hu);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().description_preview_en);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().description_preview_de);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 10, "admin.product_form.full_descriptions"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().description_hu);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().description_en);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().description_de);
  }
}
function Admin_Conditional_36_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 168)(1, "div", 171)(2, "label", 172);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "textarea", 189);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_17_Template_textarea_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("active_ingredients", $event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 168)(7, "h3", 169);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 170)(11, "div", 171)(12, "label", 172);
    \u0275\u0275text(13, "HU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 173);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_17_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("packaging_hu", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 171)(16, "label", 172);
    \u0275\u0275text(17, "EN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 173);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_17_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("packaging_en", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 171)(20, "label", 172);
    \u0275\u0275text(21, "DE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 173);
    \u0275\u0275listener("ngModelChange", function Admin_Conditional_36_Conditional_17_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateProductField("packaging_de", $event));
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "div", 168)(24, "label", 107)(25, "span", 108);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 109);
    \u0275\u0275listener("click", function Admin_Conditional_36_Conditional_17_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleProductFeatured());
    });
    \u0275\u0275element(29, "span", 110);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 10, "admin.product_form.active_ingredients"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().active_ingredients);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 12, "admin.product_form.packaging"));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().packaging_hu);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().packaging_en);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.productFormData().packaging_de);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(27, 14, "admin.product_form.featured"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.productFormData().featured);
    \u0275\u0275attribute("aria-checked", ctx_r2.productFormData().featured);
  }
}
function Admin_Conditional_36_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 167);
    \u0275\u0275text(1, "\u23F3");
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_36_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, ctx_r2.productFormIsEdit() ? "admin.product_form.save" : "admin.product_form.create"), " ");
  }
}
function Admin_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 158);
    \u0275\u0275listener("click", function Admin_Conditional_36_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onProductFormOverlayClick($event));
    });
    \u0275\u0275elementStart(1, "div", 159)(2, "div", 160)(3, "h2", 161);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 111);
    \u0275\u0275listener("click", function Admin_Conditional_36_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeProductForm());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 94);
    \u0275\u0275element(8, "line", 112)(9, "line", 113);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "div", 162);
    \u0275\u0275repeaterCreate(11, Admin_Conditional_36_For_12_Template, 3, 5, "button", 9, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 163);
    \u0275\u0275conditionalCreate(14, Admin_Conditional_36_Conditional_14_Template, 54, 35);
    \u0275\u0275conditionalCreate(15, Admin_Conditional_36_Conditional_15_Template, 18, 13);
    \u0275\u0275conditionalCreate(16, Admin_Conditional_36_Conditional_16_Template, 34, 12);
    \u0275\u0275conditionalCreate(17, Admin_Conditional_36_Conditional_17_Template, 30, 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 164)(19, "button", 165);
    \u0275\u0275listener("click", function Admin_Conditional_36_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeProductForm());
    });
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 166);
    \u0275\u0275listener("click", function Admin_Conditional_36_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveProduct());
    });
    \u0275\u0275conditionalCreate(23, Admin_Conditional_36_Conditional_23_Template, 2, 0, "span", 167)(24, Admin_Conditional_36_Conditional_24_Template, 2, 3);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 9, ctx_r2.productFormIsEdit() ? "admin.product_form.edit_title" : "admin.product_form.add_title"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r2.productFormTabs);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.productFormTab() === "basic" ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.productFormTab() === "pricing" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.productFormTab() === "descriptions" ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.productFormTab() === "details" ? 17 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.productFormSaving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(21, 11, "common.cancel"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.productFormSaving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.productFormSaving() ? 23 : 24);
  }
}
function Admin_Conditional_37_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 167);
    \u0275\u0275text(1, "\u23F3");
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_37_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "admin.product_form.delete"), " ");
  }
}
function Admin_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275listener("click", function Admin_Conditional_37_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelDeleteProduct());
    });
    \u0275\u0275elementStart(1, "div", 150);
    \u0275\u0275listener("click", function Admin_Conditional_37_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r43);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 190);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 152);
    \u0275\u0275element(4, "polyline", 98)(5, "path", 99);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "h3", 153);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 154);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 155)(13, "button", 165);
    \u0275\u0275listener("click", function Admin_Conditional_37_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelDeleteProduct());
    });
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 191);
    \u0275\u0275listener("click", function Admin_Conditional_37_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmDeleteProduct());
    });
    \u0275\u0275conditionalCreate(17, Admin_Conditional_37_Conditional_17_Template, 2, 0, "span", 167)(18, Admin_Conditional_37_Conditional_18_Template, 2, 3);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 6, "admin.product_form.confirm_delete_title"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 8, "admin.product_form.confirm_delete_text", \u0275\u0275pureFunction1(13, _c0, ctx.name)), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.productDeleteLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 11, "common.cancel"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.productDeleteLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.productDeleteLoading() ? 17 : 18);
  }
}
function Admin_Conditional_38_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 152);
    \u0275\u0275element(1, "polyline", 98)(2, "path", 99);
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_38_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 152);
    \u0275\u0275element(1, "circle", 194)(2, "line", 195);
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_38_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 152);
    \u0275\u0275element(1, "path", 196)(2, "circle", 197)(3, "polyline", 198);
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_38_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 192)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 199);
    \u0275\u0275text(4, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const req_r45 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap("role-badge " + ctx_r2.getAccountStateClass(req_r45.user.account_state));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(req_r45.user.account_state);
    \u0275\u0275advance(3);
    \u0275\u0275classMap("role-badge " + ctx_r2.getAccountStateClass(req_r45.newState));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(req_r45.newState);
  }
}
function Admin_Conditional_38_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 167);
    \u0275\u0275text(1, "\u23F3");
    \u0275\u0275elementEnd();
  }
}
function Admin_Conditional_38_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, ctx_r2.getUserActionTitle()), " ");
  }
}
function Admin_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275listener("click", function Admin_Conditional_38_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r44);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelUserAction());
    });
    \u0275\u0275elementStart(1, "div", 150);
    \u0275\u0275listener("click", function Admin_Conditional_38_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r44);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 151);
    \u0275\u0275conditionalCreate(3, Admin_Conditional_38_Conditional_3_Template, 3, 0, ":svg:svg", 152)(4, Admin_Conditional_38_Conditional_4_Template, 3, 0, ":svg:svg", 152)(5, Admin_Conditional_38_Conditional_5_Template, 4, 0, ":svg:svg", 152);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 153);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 154);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, Admin_Conditional_38_Conditional_12_Template, 7, 6, "div", 192);
    \u0275\u0275elementStart(13, "div", 155)(14, "button", 165);
    \u0275\u0275listener("click", function Admin_Conditional_38_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r44);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelUserAction());
    });
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 193);
    \u0275\u0275listener("click", function Admin_Conditional_38_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r44);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmUserAction());
    });
    \u0275\u0275conditionalCreate(18, Admin_Conditional_38_Conditional_18_Template, 2, 0, "span", 167)(19, Admin_Conditional_38_Conditional_19_Template, 2, 3);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const req_r45 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("confirm-icon-danger", req_r45.action === "delete" || req_r45.action === "ban")("confirm-icon-primary", req_r45.action === "change_role" || req_r45.action === "unban");
    \u0275\u0275advance();
    \u0275\u0275conditional(req_r45.action === "delete" ? 3 : req_r45.action === "ban" ? 4 : 5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 14, ctx_r2.getUserActionTitle()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 16, ctx_r2.getUserActionText(), \u0275\u0275pureFunction2(21, _c1, ctx_r2.getUserFullName(req_r45.user), req_r45.newState || "")), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(req_r45.newState ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.userActionLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 19, "common.cancel"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getUserActionBtnClass());
    \u0275\u0275property("disabled", ctx_r2.userActionLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.userActionLoading() ? 18 : 19);
  }
}
var Admin = class _Admin {
  authService = inject(AuthService);
  accountService = inject(AccountService);
  productService = inject(ProductService);
  toastService = inject(ToastService);
  translate = inject(TranslateService);
  router = inject(Router);
  icons = ICONS;
  ACCOUNT_STATES = ACCOUNT_STATES;
  activeSection = signal("dashboard", ...ngDevMode ? [{ debugName: "activeSection" }] : []);
  sidebarCollapsed = signal(false, ...ngDevMode ? [{ debugName: "sidebarCollapsed" }] : []);
  isMobileView = signal(typeof window !== "undefined" && window.innerWidth <= 768, ...ngDevMode ? [{ debugName: "isMobileView" }] : []);
  showNavLabels = computed(() => this.isMobileView() ? this.sidebarCollapsed() : !this.sidebarCollapsed(), ...ngDevMode ? [{ debugName: "showNavLabels" }] : []);
  mobileOverlayActive = computed(() => this.isMobileView() && this.sidebarCollapsed(), ...ngDevMode ? [{ debugName: "mobileOverlayActive" }] : []);
  onResize() {
    this.isMobileView.set(window.innerWidth <= 768);
  }
  onDocumentClick(event) {
    const target = event.target;
    if (!target.closest(".user-actions-wrapper")) {
      this.activeUserMenu.set(null);
    }
  }
  orderSearch = "";
  orderStatusFilter = "all";
  userSearch = "";
  productSearch = "";
  usersLoading = signal(false, ...ngDevMode ? [{ debugName: "usersLoading" }] : []);
  usersError = signal(null, ...ngDevMode ? [{ debugName: "usersError" }] : []);
  ordersLoading = signal(false, ...ngDevMode ? [{ debugName: "ordersLoading" }] : []);
  ordersError = signal(null, ...ngDevMode ? [{ debugName: "ordersError" }] : []);
  productsLoading = signal(false, ...ngDevMode ? [{ debugName: "productsLoading" }] : []);
  productsError = signal(null, ...ngDevMode ? [{ debugName: "productsError" }] : []);
  apiUsers = signal([], ...ngDevMode ? [{ debugName: "apiUsers" }] : []);
  apiOrders = signal([], ...ngDevMode ? [{ debugName: "apiOrders" }] : []);
  galleryOpen = signal(false, ...ngDevMode ? [{ debugName: "galleryOpen" }] : []);
  galleryProduct = signal(null, ...ngDevMode ? [{ debugName: "galleryProduct" }] : []);
  galleryImages = signal([], ...ngDevMode ? [{ debugName: "galleryImages" }] : []);
  galleryLoading = signal(false, ...ngDevMode ? [{ debugName: "galleryLoading" }] : []);
  uploadTransparent = signal(false, ...ngDevMode ? [{ debugName: "uploadTransparent" }] : []);
  uploadInProgress = signal(false, ...ngDevMode ? [{ debugName: "uploadInProgress" }] : []);
  detailOpen = signal(false, ...ngDevMode ? [{ debugName: "detailOpen" }] : []);
  detailImage = signal(null, ...ngDevMode ? [{ debugName: "detailImage" }] : []);
  detailMeta = signal(null, ...ngDevMode ? [{ debugName: "detailMeta" }] : []);
  detailNaturalWidth = signal(0, ...ngDevMode ? [{ debugName: "detailNaturalWidth" }] : []);
  detailNaturalHeight = signal(0, ...ngDevMode ? [{ debugName: "detailNaturalHeight" }] : []);
  deleteConfirmOpen = signal(false, ...ngDevMode ? [{ debugName: "deleteConfirmOpen" }] : []);
  deleteTargetImage = signal(null, ...ngDevMode ? [{ debugName: "deleteTargetImage" }] : []);
  activeUserMenu = signal(null, ...ngDevMode ? [{ debugName: "activeUserMenu" }] : []);
  userActionConfirm = signal(null, ...ngDevMode ? [{ debugName: "userActionConfirm" }] : []);
  userActionLoading = signal(false, ...ngDevMode ? [{ debugName: "userActionLoading" }] : []);
  productFormOpen = signal(false, ...ngDevMode ? [{ debugName: "productFormOpen" }] : []);
  productFormTab = signal("basic", ...ngDevMode ? [{ debugName: "productFormTab" }] : []);
  productFormData = signal(emptyProductForm(), ...ngDevMode ? [{ debugName: "productFormData" }] : []);
  productFormEditId = signal(null, ...ngDevMode ? [{ debugName: "productFormEditId" }] : []);
  productFormSaving = signal(false, ...ngDevMode ? [{ debugName: "productFormSaving" }] : []);
  productDeleteConfirm = signal(null, ...ngDevMode ? [{ debugName: "productDeleteConfirm" }] : []);
  productDeleteLoading = signal(false, ...ngDevMode ? [{ debugName: "productDeleteLoading" }] : []);
  productFormIsEdit = computed(() => this.productFormEditId() !== null, ...ngDevMode ? [{ debugName: "productFormIsEdit" }] : []);
  availableCategories = computed(() => this.productService.categories(), ...ngDevMode ? [{ debugName: "availableCategories" }] : []);
  adminName = computed(() => {
    const user = this.authService.currentUser();
    return user ? `${user.firstname} ${user.lastname}`.trim() : "Admin";
  }, ...ngDevMode ? [{ debugName: "adminName" }] : []);
  currentAdminId = computed(() => {
    return this.authService.currentUser()?.id ?? "";
  }, ...ngDevMode ? [{ debugName: "currentAdminId" }] : []);
  stats = computed(() => {
    const orders = this.apiOrders();
    const users = this.apiUsers();
    const products = this.productService.products();
    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.price) || 0), 0);
    const lowStock = products.filter((p) => p.stock_number > 0 && p.stock_number < 10).length;
    return {
      totalOrders: orders.length,
      revenue: totalRevenue,
      totalUsers: users.length,
      totalProducts: products.length,
      lowStock
    };
  }, ...ngDevMode ? [{ debugName: "stats" }] : []);
  navItems = [
    { id: "dashboard", icon: ICONS.reports, label: "admin.nav.dashboard" },
    { id: "orders", icon: ICONS.order, label: "admin.nav.orders" },
    { id: "users", icon: ICONS.customers, label: "admin.nav.users" },
    { id: "products", icon: ICONS.sale, label: "admin.nav.products" }
  ];
  productFormTabs = [
    { id: "basic", label: "admin.product_form.tab_basic" },
    { id: "pricing", label: "admin.product_form.tab_pricing" },
    { id: "descriptions", label: "admin.product_form.tab_descriptions" },
    { id: "details", label: "admin.product_form.tab_details" }
  ];
  filteredOrders = computed(() => {
    return smartFilter(this.apiOrders(), this.orderSearch, ORDER_COLUMNS);
  }, ...ngDevMode ? [{ debugName: "filteredOrders" }] : []);
  filteredUsers = computed(() => {
    return smartFilter(this.apiUsers(), this.userSearch, USER_COLUMNS);
  }, ...ngDevMode ? [{ debugName: "filteredUsers" }] : []);
  filteredProducts = computed(() => {
    return smartFilter(this.productService.products(), this.productSearch, PRODUCT_COLUMNS);
  }, ...ngDevMode ? [{ debugName: "filteredProducts" }] : []);
  recentOrders = computed(() => this.apiOrders().slice(0, 5), ...ngDevMode ? [{ debugName: "recentOrders" }] : []);
  currentSectionLabel = computed(() => {
    const item = this.navItems.find((n) => n.id === this.activeSection());
    return item?.label || "admin.nav.dashboard";
  }, ...ngDevMode ? [{ debugName: "currentSectionLabel" }] : []);
  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return;
    }
    this.loadUsers();
    this.loadOrders();
    this.loadProducts();
  }
  loadUsers() {
    if (MOCK_MODE) {
      this.apiUsers.set(MOCK_USERS);
      return;
    }
    this.usersLoading.set(true);
    this.usersError.set(null);
    this.accountService.getAllUsersAdmin().subscribe({
      next: (response) => {
        if (response.statuscode === "200" && Array.isArray(response.users)) {
          this.apiUsers.set(response.users);
        } else {
          this.usersError.set("admin.errors.users_load_failed");
        }
        this.usersLoading.set(false);
      },
      error: (err) => {
        console.error("Admin users load error:", err);
        this.usersError.set("admin.errors.users_load_failed");
        this.usersLoading.set(false);
      }
    });
  }
  loadOrders() {
    if (MOCK_MODE) {
      this.apiOrders.set(MOCK_ORDERS);
      return;
    }
    this.ordersLoading.set(true);
    this.ordersError.set(null);
    this.accountService.getAllOrdersAdmin().subscribe({
      next: (response) => {
        if (response.statuscode === "200" && Array.isArray(response.orders)) {
          this.apiOrders.set(response.orders);
        } else {
          this.ordersError.set("admin.errors.orders_load_failed");
        }
        this.ordersLoading.set(false);
      },
      error: (err) => {
        console.error("Admin orders load error:", err);
        this.ordersError.set("admin.errors.orders_load_failed");
        this.ordersLoading.set(false);
      }
    });
  }
  loadProducts() {
    this.productsLoading.set(true);
    this.productsError.set(null);
    this.productService.loadProducts().then(() => {
      this.productsLoading.set(false);
    }).catch((err) => {
      console.error("Admin products load error:", err);
      this.productsError.set("admin.errors.products_load_failed");
      this.productsLoading.set(false);
    });
  }
  setSection(section) {
    this.activeSection.set(section);
    this.closeMobileSidebar();
  }
  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }
  closeMobileSidebar() {
    if (this.isMobileView()) {
      this.sidebarCollapsed.set(false);
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  formatRevenue(amount) {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0
    }).format(num || 0);
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "\u2014";
    try {
      return new Date(dateStr).toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return dateStr;
    }
  }
  getUserFullName(user) {
    const full = `${user.last_name} ${user.first_name}`.trim();
    return full || user.email;
  }
  getUserInitial(user) {
    return (user.last_name || user.first_name || user.email).charAt(0).toUpperCase();
  }
  getAccountStateClass(state) {
    const map = {
      admin: "role-admin",
      superadmin: "role-admin",
      verified: "role-pharmacist",
      unverified: "role-user",
      banned: "role-banned",
      deleted: "role-deleted"
    };
    return map[state] ?? "role-user";
  }
  getOrderAddressSummary(order) {
    const parts = [
      order.city,
      order.zipcode ? `(${order.zipcode})` : null,
      order.address,
      order.house_number,
      order.apartment_number ? `/${order.apartment_number}` : null
    ].filter(Boolean);
    return parts.join(" ") || "\u2014";
  }
  getOrderStatusClass(status) {
    const map = {
      pending: "status-pending",
      processing: "status-processing",
      shipped: "status-shipped",
      delivered: "status-delivered",
      cancelled: "status-cancelled"
    };
    return "status-badge " + (map[status] ?? "status-pending");
  }
  trackById(_index, item) {
    return item.id;
  }
  trackByProductId(_index, item) {
    return item.id;
  }
  isSelf(user) {
    return user.id === this.currentAdminId();
  }
  toggleUserMenu(userId, event) {
    event.stopPropagation();
    this.activeUserMenu.update((current) => current === userId ? null : userId);
  }
  getAvailableStates(user) {
    return ACCOUNT_STATES.filter((s) => s !== user.account_state);
  }
  requestChangeRole(user, newState) {
    this.activeUserMenu.set(null);
    this.userActionConfirm.set({ user, action: "change_role", newState });
  }
  requestBanUser(user) {
    this.activeUserMenu.set(null);
    this.userActionConfirm.set({ user, action: "ban" });
  }
  requestUnbanUser(user) {
    this.activeUserMenu.set(null);
    this.userActionConfirm.set({ user, action: "unban", newState: "verified" });
  }
  requestDeleteUser(user) {
    this.activeUserMenu.set(null);
    this.userActionConfirm.set({ user, action: "delete" });
  }
  cancelUserAction() {
    this.userActionConfirm.set(null);
  }
  confirmUserAction() {
    const req = this.userActionConfirm();
    if (!req)
      return;
    this.userActionLoading.set(true);
    if (MOCK_MODE) {
      this.executeMockUserAction(req);
      return;
    }
    switch (req.action) {
      case "change_role":
      case "unban":
        this.accountService.updateUserStateAdmin(req.user.id, req.newState).subscribe({
          next: (res) => {
            if (res.statuscode === "200") {
              this.applyUserStateChange(req.user.id, req.newState);
              this.toastService.show("admin.user_actions.success", "success");
            } else {
              this.toastService.show("admin.user_actions.error", "error");
            }
            this.finishUserAction();
          },
          error: () => {
            this.toastService.show("admin.user_actions.error", "error");
            this.finishUserAction();
          }
        });
        break;
      case "ban":
        this.accountService.banUserAdmin(req.user.id).subscribe({
          next: (res) => {
            if (res.statuscode === "200") {
              this.applyUserStateChange(req.user.id, "banned");
              this.toastService.show("admin.user_actions.banned", "success");
            } else {
              this.toastService.show("admin.user_actions.error", "error");
            }
            this.finishUserAction();
          },
          error: () => {
            this.toastService.show("admin.user_actions.error", "error");
            this.finishUserAction();
          }
        });
        break;
      case "delete":
        this.accountService.deleteUserAdmin(req.user.id).subscribe({
          next: (res) => {
            if (res.statuscode === "200") {
              this.apiUsers.update((users) => users.filter((u) => u.id !== req.user.id));
              this.toastService.show("admin.user_actions.deleted", "success");
            } else {
              this.toastService.show("admin.user_actions.error", "error");
            }
            this.finishUserAction();
          },
          error: () => {
            this.toastService.show("admin.user_actions.error", "error");
            this.finishUserAction();
          }
        });
        break;
    }
  }
  requestDeleteProduct(product, event) {
    event.stopPropagation();
    this.productDeleteConfirm.set(product);
  }
  cancelDeleteProduct() {
    this.productDeleteConfirm.set(null);
  }
  confirmDeleteProduct() {
    const product = this.productDeleteConfirm();
    if (!product)
      return;
    this.productDeleteLoading.set(true);
    if (MOCK_MODE) {
      this.toastService.show("admin.product_form.deleted", "success");
      this.productDeleteLoading.set(false);
      this.productDeleteConfirm.set(null);
      return;
    }
    const auth = this.buildAdminAuth();
    this.productService.deleteProductAdmin(auth, product.id).subscribe({
      next: (res) => {
        if (res.statuscode === "200") {
          this.toastService.show("admin.product_form.deleted", "success");
          this.loadProducts();
        } else {
          this.toastService.show("admin.product_form.delete_error", "error");
        }
        this.productDeleteLoading.set(false);
        this.productDeleteConfirm.set(null);
      },
      error: () => {
        this.toastService.show("admin.product_form.delete_error", "error");
        this.productDeleteLoading.set(false);
        this.productDeleteConfirm.set(null);
      }
    });
  }
  openProductForm(product) {
    if (product) {
      this.productFormEditId.set(product.id);
      this.productFormData.set({
        name_hu: product.name_hu || "",
        name_en: product.name_en || "",
        name_de: product.name_de || "",
        description_hu: product.description_hu || product.description_hu || "",
        description_en: product.description_en || product.description_en || "",
        description_de: product.description_de || product.description_de || "",
        description_preview_hu: product.description_preview_hu || "",
        description_preview_en: product.description_preview_en || "",
        description_preview_de: product.description_preview_de || "",
        price_huf: product.price_number || 0,
        sale_percentage: product.sale_percentage_number || 0,
        stock: product.stock_number || 0,
        category_id: product.category_id || "",
        manufacturer: product.manufacturer || "",
        brand: product.brand || "",
        sku: product.sku || "",
        active_ingredients: product.active_ingredients || product.active_ingredients || "",
        packaging_hu: product.packaging_hu ?? "",
        packaging_en: product.packaging_en ?? "",
        packaging_de: product.packaging_de ?? "",
        thumbnail_url: product.thumbnail_url || "",
        featured: product.is_featured || false
      });
    } else {
      this.productFormEditId.set(null);
      this.productFormData.set(emptyProductForm());
    }
    this.productFormTab.set("basic");
    this.productFormOpen.set(true);
    document.body.style.overflow = "hidden";
  }
  closeProductForm() {
    this.productFormOpen.set(false);
    this.productFormEditId.set(null);
    this.productFormData.set(emptyProductForm());
    document.body.style.overflow = "";
  }
  onProductFormOverlayClick(event) {
    if (event.target.classList.contains("product-form-overlay")) {
      this.closeProductForm();
    }
  }
  setProductFormTab(tab) {
    this.productFormTab.set(tab);
  }
  updateProductField(key, value) {
    this.productFormData.update((data) => __spreadProps(__spreadValues({}, data), { [key]: value }));
  }
  toggleProductFeatured() {
    this.productFormData.update((data) => __spreadProps(__spreadValues({}, data), { featured: !data.featured }));
  }
  saveProduct() {
    const data = this.productFormData();
    const editId = this.productFormEditId();
    if (!data.name_en.trim()) {
      this.toastService.show("admin.product_form.error_name_required", "error");
      this.productFormTab.set("basic");
      return;
    }
    this.productFormSaving.set(true);
    if (MOCK_MODE) {
      this.toastService.show(editId ? "admin.product_form.updated" : "admin.product_form.created", "success");
      this.productFormSaving.set(false);
      this.closeProductForm();
      this.loadProducts();
      return;
    }
    const body = this.buildProductApiBody(data, editId);
    this.productService.saveProductAdmin(body, !!editId).subscribe({
      next: (res) => {
        if (res.statuscode === "200") {
          this.toastService.show(editId ? "admin.product_form.updated" : "admin.product_form.created", "success");
          this.closeProductForm();
          this.loadProducts();
        } else {
          this.toastService.show("admin.product_form.save_error", "error");
        }
        this.productFormSaving.set(false);
      },
      error: () => {
        this.toastService.show("admin.product_form.save_error", "error");
        this.productFormSaving.set(false);
      }
    });
  }
  buildProductApiBody(data, editId) {
    const auth = this.buildAdminAuth();
    const body = __spreadProps(__spreadValues({}, auth), {
      name_hu: btoa(data.name_hu),
      name_en: btoa(data.name_en),
      name_de: btoa(data.name_de),
      description_hu: btoa(data.description_hu),
      description_en: btoa(data.description_en),
      description_de: btoa(data.description_de),
      description_preview_hu: btoa(data.description_preview_hu),
      description_preview_en: btoa(data.description_preview_en),
      description_preview_de: btoa(data.description_preview_de),
      price_huf: data.price_huf,
      sale_percentage: data.sale_percentage,
      stock: data.stock,
      category_id: btoa(data.category_id),
      manufacturer: btoa(data.manufacturer),
      brand: btoa(data.brand),
      sku: btoa(data.sku),
      active_ingredients: btoa(data.active_ingredients),
      packaging_hu: btoa(data.packaging_hu),
      packaging_en: btoa(data.packaging_en),
      packaging_de: btoa(data.packaging_de),
      thumbnail_url: btoa(data.thumbnail_url),
      featured: data.featured ? 1 : 0
    });
    if (editId) {
      body["product_id"] = btoa(editId);
    }
    return body;
  }
  buildAdminAuth() {
    const storedId = sessionStorage.getItem("user_id") ?? "";
    const token = this.authService.getSessionToken() ?? this.authService.getToken() ?? "";
    return {
      id: btoa(storedId),
      session_token: btoa(token)
    };
  }
  executeMockUserAction(req) {
    switch (req.action) {
      case "change_role":
      case "unban":
        this.applyUserStateChange(req.user.id, req.newState);
        break;
      case "ban":
        this.applyUserStateChange(req.user.id, "banned");
        break;
      case "delete":
        this.apiUsers.update((users) => users.filter((u) => u.id !== req.user.id));
        break;
    }
    this.finishUserAction();
  }
  applyUserStateChange(userId, newState) {
    this.apiUsers.update((users) => users.map((u) => u.id === userId ? __spreadProps(__spreadValues({}, u), { account_state: newState }) : u));
  }
  finishUserAction() {
    this.userActionLoading.set(false);
    this.userActionConfirm.set(null);
  }
  getUserActionTitle() {
    const req = this.userActionConfirm();
    if (!req)
      return "";
    switch (req.action) {
      case "change_role":
        return "admin.user_actions.confirm_role_title";
      case "ban":
        return "admin.user_actions.confirm_ban_title";
      case "unban":
        return "admin.user_actions.confirm_unban_title";
      case "delete":
        return "admin.user_actions.confirm_delete_title";
    }
  }
  getUserActionText() {
    const req = this.userActionConfirm();
    if (!req)
      return "";
    switch (req.action) {
      case "change_role":
        return "admin.user_actions.confirm_role_text";
      case "ban":
        return "admin.user_actions.confirm_ban_text";
      case "unban":
        return "admin.user_actions.confirm_unban_text";
      case "delete":
        return "admin.user_actions.confirm_delete_text";
    }
  }
  getUserActionBtnClass() {
    const req = this.userActionConfirm();
    if (!req)
      return "";
    return req.action === "delete" || req.action === "ban" ? "confirm-delete-btn" : "confirm-action-btn";
  }
  openGallery(product) {
    this.productService.invalidateImageCache();
    this.galleryProduct.set(product);
    this.galleryImages.set([]);
    this.galleryOpen.set(true);
    this.galleryLoading.set(true);
    this.uploadTransparent.set(false);
    document.body.style.overflow = "hidden";
    if (MOCK_MODE) {
      this.loadMockGalleryImages(product);
    } else {
      this.productService.getProductImages(product.id).subscribe({
        next: (images) => {
          this.galleryImages.set(images.map((img) => __spreadProps(__spreadValues({}, img), {
            objectUrl: void 0,
            file: void 0,
            meta: void 0
          })));
          this.galleryLoading.set(false);
        },
        error: () => {
          this.galleryLoading.set(false);
        }
      });
    }
  }
  loadMockGalleryImages(product) {
    const mockImages = [];
    if (product.thumbnail_url) {
      mockImages.push({
        id: "mock-1",
        product_id: product.id,
        image_url: product.thumbnail_url,
        alt_text_hu: product.name_hu || product.name,
        alt_text_en: product.name_en || product.name,
        alt_text_de: product.name_de || product.name,
        sort_id: "1"
      });
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach((url, i) => {
        if (url !== product.thumbnail_url) {
          mockImages.push({
            id: `mock-${i + 2}`,
            product_id: product.id,
            image_url: url,
            alt_text_hu: product.name_hu || product.name,
            alt_text_en: product.name_en || product.name,
            alt_text_de: product.name_de || product.name,
            sort_id: `${i + 2}`
          });
        }
      });
    }
    this.galleryImages.set(mockImages);
    this.galleryLoading.set(false);
  }
  closeGallery() {
    this.galleryImages().forEach((img) => {
      if (img.objectUrl)
        URL.revokeObjectURL(img.objectUrl);
    });
    this.galleryOpen.set(false);
    this.galleryProduct.set(null);
    this.galleryImages.set([]);
    this.uploadTransparent.set(false);
    if (!this.detailOpen()) {
      document.body.style.overflow = "";
    }
  }
  onGalleryOverlayClick(event) {
    if (event.target.classList.contains("gallery-overlay")) {
      this.closeGallery();
    }
  }
  getProductImageCount(product) {
    const count = product.images?.length ?? 0;
    return count > 0 ? count : product.thumbnail_url ? 1 : 0;
  }
  toggleTransparent() {
    this.uploadTransparent.update((v) => !v);
  }
  triggerFileUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e) => {
      const files = e.target.files;
      if (files)
        this.handleFileUpload(files);
    };
    input.click();
  }
  handleFileUpload(files) {
    return __async(this, null, function* () {
      const product = this.galleryProduct();
      if (!product)
        return;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        const dims = yield new Promise((resolve) => {
          img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
          img.onerror = () => resolve({ w: 0, h: 0 });
          img.src = objectUrl;
        });
        const newImage = {
          id: `new-${Date.now()}-${i}`,
          product_id: product.id,
          image_url: objectUrl,
          alt_text_hu: file.name,
          alt_text_en: file.name,
          alt_text_de: file.name,
          sort_id: `${this.galleryImages().length + 1}`,
          file,
          objectUrl,
          meta: {
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type || "unknown",
            width: dims.w,
            height: dims.h,
            resolution: dims.w > 0 ? `${dims.w} \xD7 ${dims.h}` : "\u2014",
            lastModified: new Date(file.lastModified).toLocaleDateString("hu-HU")
          }
        };
        this.galleryImages.update((imgs) => [...imgs, newImage]);
        if (!MOCK_MODE) {
          this.uploadImageToBackend(product.id, file, newImage.id);
        }
      }
    });
  }
  uploadImageToBackend(productId, file, tempId) {
    this.uploadInProgress.set(true);
    const auth = this.buildAdminAuth();
    this.productService.uploadProductImageAdmin(auth, productId, file.name, this.uploadTransparent()).subscribe({
      next: (res) => {
        if (res.statuscode === "200" && res.image) {
          this.galleryImages.update((imgs) => imgs.map((img) => img.id === tempId ? __spreadProps(__spreadValues({}, img), { id: res.image.id, image_url: res.image.image_url, file: void 0 }) : img));
          this.productService.invalidateImageCache();
        }
        this.uploadInProgress.set(false);
      },
      error: (err) => {
        console.error("Image upload failed:", err);
        this.uploadInProgress.set(false);
      }
    });
  }
  requestDeleteImage(image, event) {
    event.stopPropagation();
    this.deleteTargetImage.set(image);
    this.deleteConfirmOpen.set(true);
  }
  confirmDeleteImage() {
    const target = this.deleteTargetImage();
    if (!target)
      return;
    if (target.objectUrl) {
      URL.revokeObjectURL(target.objectUrl);
    }
    this.galleryImages.update((imgs) => imgs.filter((img) => img.id !== target.id));
    this.productService.invalidateImageCache();
    this.cancelDeleteImage();
  }
  cancelDeleteImage() {
    this.deleteConfirmOpen.set(false);
    this.deleteTargetImage.set(null);
  }
  openImageDetail(image) {
    this.detailImage.set(image);
    this.detailNaturalWidth.set(0);
    this.detailNaturalHeight.set(0);
    if (image.meta) {
      this.detailMeta.set(image.meta);
    } else {
      this.detailMeta.set({
        name: this.extractFileName(image.image_url),
        size: "\u2014",
        type: this.guessImageType(image.image_url),
        width: 0,
        height: 0,
        resolution: "...",
        lastModified: "\u2014"
      });
    }
    this.detailOpen.set(true);
  }
  onDetailImageLoad(event) {
    const img = event.target;
    this.detailNaturalWidth.set(img.naturalWidth);
    this.detailNaturalHeight.set(img.naturalHeight);
    const meta = this.detailMeta();
    if (meta) {
      this.detailMeta.set(__spreadProps(__spreadValues({}, meta), {
        width: img.naturalWidth,
        height: img.naturalHeight,
        resolution: `${img.naturalWidth} \xD7 ${img.naturalHeight}`
      }));
    }
  }
  closeImageDetail() {
    this.detailOpen.set(false);
    this.detailImage.set(null);
    this.detailMeta.set(null);
  }
  onDetailOverlayClick(event) {
    if (event.target.classList.contains("detail-overlay")) {
      this.closeImageDetail();
    }
  }
  extractFileName(url) {
    const parts = url.split("/");
    return parts[parts.length - 1] || "image";
  }
  guessImageType(url) {
    const ext = url.split(".").pop()?.toLowerCase();
    const map = {
      webp: "image/webp",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      svg: "image/svg+xml"
    };
    return map[ext ?? ""] ?? "image/*";
  }
  downloadImage(image) {
    const link = document.createElement("a");
    link.href = image.objectUrl || image.image_url;
    link.download = this.extractFileName(image.image_url);
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  static \u0275fac = function Admin_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Admin)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Admin, selectors: [["app-admin"]], hostBindings: function Admin_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function Admin_resize_HostBindingHandler() {
        return ctx.onResize();
      }, \u0275\u0275resolveWindow)("click", function Admin_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 39, vars: 31, consts: [[1, "admin-page"], ["aria-hidden", "true", 1, "sidebar-overlay", 3, "click"], [1, "admin-sidebar"], [1, "sidebar-header"], [1, "sidebar-logo"], ["alt", "Admin", "aria-hidden", "true", 1, "logo-icon", 3, "src"], [1, "logo-text"], [1, "sidebar-toggle", 3, "click"], [1, "sidebar-nav"], [3, "class"], [1, "sidebar-footer"], [1, "admin-main"], [1, "admin-topbar"], [1, "topbar-left"], [1, "mobile-menu-btn", 3, "click"], [1, "page-heading"], [1, "topbar-right"], [1, "admin-badge"], [1, "admin-name"], [1, "section-content"], [1, "gallery-overlay"], [1, "detail-overlay"], [1, "confirm-overlay"], [1, "product-form-overlay"], [3, "click"], ["aria-hidden", "true", 1, "nav-icon", 3, "src"], [1, "nav-label"], [1, "nav-item", "logout-btn", 3, "click"], ["alt", "", "aria-hidden", "true", 1, "nav-icon", 3, "src"], [1, "dashboard-greeting"], [1, "stats-grid"], [1, "stat-card", "primary"], [1, "stat-icon"], ["alt", "", "aria-hidden", "true", 1, "stat-icon-img", 3, "src"], [1, "stat-body"], [1, "stat-value", "loading-pulse"], [1, "stat-value"], [1, "stat-label"], [1, "stat-card", "success"], [1, "stat-card", "info"], [1, "stat-card", "warning"], [1, "stat-change", "warning-text"], [1, "admin-card"], [1, "card-header"], [1, "card-title"], [1, "view-all-btn", 3, "click"], [1, "loading-state"], [1, "error-state"], [1, "empty-state"], [1, "table-wrapper"], [1, "spinner"], [1, "retry-btn", 3, "click"], ["appResizableTable", "dashboard-orders", 1, "admin-table"], [1, "order-id"], [1, "muted"], [1, "font-bold"], [1, "section-toolbar"], [1, "search-input-wrapper"], ["alt", "", "aria-hidden", "true", 1, "search-icon-small", 3, "src"], ["type", "search", 1, "admin-search", 3, "ngModelChange", "ngModel", "placeholder"], [1, "retry-btn", 3, "click", "disabled"], ["appResizableTable", "orders", 1, "admin-table"], [1, "muted", "note-cell"], ["appResizableTable", "users", 1, "admin-table"], [3, "row-banned", "row-deleted"], [1, "user-cell"], [1, "user-avatar"], [1, "user-actions-wrapper"], [1, "muted", "self-label"], [1, "action-menu-btn", 3, "click"], [1, "action-dropdown"], [1, "dropdown-item", "dropdown-item-danger", 3, "click"], [1, "dropdown-section"], [1, "dropdown-label"], [1, "dropdown-item"], [1, "dropdown-divider"], [1, "dropdown-item", "dropdown-item-warn", 3, "click"], [1, "dropdown-item", 3, "click"], [1, "dropdown-item", "dropdown-item-success", 3, "click"], [1, "add-btn", 3, "click"], ["appResizableTable", "products", 1, "admin-table"], [1, "product-cell"], [1, "product-thumb"], ["alt", "", "aria-hidden", "true", 1, "product-thumb-img", 3, "src"], [1, "product-cell-info"], [1, "product-name"], [1, "images-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "images-icon"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["cx", "8.5", "cy", "8.5", "r", "1.5"], ["points", "21 15 16 10 5 21"], [1, "images-count"], [1, "row-actions"], [1, "row-action-btn", "edit-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], [1, "row-action-btn", "delete-btn", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"], [1, "gallery-overlay", 3, "click"], [1, "gallery-modal"], [1, "gallery-modal-header"], [1, "gallery-modal-title-group"], [1, "gallery-modal-title"], [1, "gallery-product-name"], [1, "gallery-header-controls"], [1, "transparent-toggle"], [1, "transparent-label"], ["role", "switch", 1, "toggle-switch", 3, "click"], [1, "toggle-knob"], [1, "gallery-close-btn", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "gallery-modal-body"], [1, "gallery-loading"], [1, "gallery-grid"], [1, "gallery-card"], [1, "gallery-card", "gallery-card-add", 3, "click"], [1, "gallery-card-add-content"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "gallery-add-icon"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "gallery-add-text"], [1, "gallery-card", 3, "click"], [1, "gallery-card-image-wrapper"], ["loading", "lazy", 1, "gallery-card-image", 3, "src", "alt"], [1, "gallery-card-delete", 3, "click"], ["x1", "10", "y1", "11", "x2", "10", "y2", "17"], ["x1", "14", "y1", "11", "x2", "14", "y2", "17"], [1, "gallery-card-label"], [1, "detail-overlay", 3, "click"], [1, "detail-modal"], [1, "gallery-close-btn", "detail-close-btn", 3, "click"], [1, "detail-content"], [1, "detail-image-container"], [1, "detail-full-image", 3, "src", "alt"], [1, "detail-info-panel"], [1, "detail-info-title"], [1, "detail-meta-list"], [1, "detail-actions"], [1, "detail-full-image", 3, "load", "src", "alt"], [1, "detail-meta-row"], [1, "detail-meta-label"], [1, "detail-meta-value"], [1, "detail-download-btn", 3, "click"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "7 10 12 15 17 10"], ["x1", "12", "y1", "15", "x2", "12", "y2", "3"], [1, "confirm-overlay", 3, "click"], [1, "confirm-dialog", 3, "click"], [1, "confirm-icon-wrapper"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "confirm-icon"], [1, "confirm-title"], [1, "confirm-text"], [1, "confirm-actions"], [1, "confirm-cancel-btn", 3, "click"], [1, "confirm-delete-btn", 3, "click"], [1, "product-form-overlay", 3, "click"], [1, "product-form-modal"], [1, "product-form-header"], [1, "product-form-title"], [1, "product-form-tabs"], [1, "product-form-body"], [1, "product-form-footer"], [1, "confirm-cancel-btn", 3, "click", "disabled"], [1, "confirm-action-btn", 3, "click", "disabled"], [1, "spinner-small"], [1, "pf-section"], [1, "pf-section-title"], [1, "pf-grid-3"], [1, "pf-field"], [1, "pf-label"], [1, "pf-input", 3, "ngModelChange", "ngModel"], [1, "pf-grid-2"], [1, "pf-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["placeholder", "assets/products/1/1.webp", 1, "pf-input", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 1, "pf-input", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", 1, "pf-input", 3, "ngModelChange", "ngModel"], [1, "pf-price-preview"], [1, "pf-price-original"], [1, "pf-price-arrow"], [1, "pf-price-discounted"], [1, "pf-price-badge"], [1, "pf-textarea", "pf-textarea-sm", 3, "ngModelChange", "ngModel"], [1, "pf-stack"], ["rows", "4", 1, "pf-textarea", 3, "ngModelChange", "ngModel"], ["rows", "3", 1, "pf-textarea", 3, "ngModelChange", "ngModel"], [1, "confirm-icon-wrapper", "confirm-icon-danger"], [1, "confirm-delete-btn", 3, "click", "disabled"], [1, "confirm-state-preview"], [3, "click", "disabled"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "4.93", "y1", "4.93", "x2", "19.07", "y2", "19.07"], ["d", "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "8.5", "cy", "7", "r", "4"], ["points", "17 11 19 13 23 9"], [1, "state-arrow"]], template: function Admin_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275listener("click", function Admin_Template_div_click_1_listener() {
        return ctx.closeMobileSidebar();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "aside", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "img", 5);
      \u0275\u0275conditionalCreate(6, Admin_Conditional_6_Template, 2, 0, "span", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275listener("click", function Admin_Template_button_click_7_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "nav", 8);
      \u0275\u0275repeaterCreate(11, Admin_For_12_Template, 5, 10, "button", 9, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, Admin_Conditional_13_Template, 6, 4, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "main", 11)(15, "header", 12)(16, "div", 13)(17, "button", 14);
      \u0275\u0275pipe(18, "translate");
      \u0275\u0275listener("click", function Admin_Template_button_click_17_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275text(19, " \u2630 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "h1", 15);
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 16)(24, "span", 17);
      \u0275\u0275text(25);
      \u0275\u0275pipe(26, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span", 18);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(29, Admin_Conditional_29_Template, 55, 34, "div", 19);
      \u0275\u0275conditionalCreate(30, Admin_Conditional_30_Template, 12, 10, "div", 19);
      \u0275\u0275conditionalCreate(31, Admin_Conditional_31_Template, 12, 10, "div", 19);
      \u0275\u0275conditionalCreate(32, Admin_Conditional_32_Template, 15, 13, "div", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(33, Admin_Conditional_33_Template, 24, 17, "div", 20);
      \u0275\u0275conditionalCreate(34, Admin_Conditional_34_Template, 16, 9, "div", 21);
      \u0275\u0275conditionalCreate(35, Admin_Conditional_35_Template, 19, 12, "div", 22);
      \u0275\u0275conditionalCreate(36, Admin_Conditional_36_Template, 25, 13, "div", 23);
      \u0275\u0275conditionalCreate(37, Admin_Conditional_37_Template, 19, 15, "div", 22);
      \u0275\u0275conditionalCreate(38, Admin_Conditional_38_Template, 20, 24, "div", 22);
    }
    if (rf & 2) {
      let tmp_20_0;
      let tmp_21_0;
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.mobileOverlayActive());
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.sidebarCollapsed());
      \u0275\u0275advance(3);
      \u0275\u0275property("src", ctx.icons.admin, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showNavLabels() ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(8, 23, "admin.toggle_sidebar"));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.sidebarCollapsed() ? "\u25B6" : "\u25C0", " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.navItems);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showNavLabels() ? 13 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(18, 25, "admin.toggle_sidebar"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 27, ctx.currentSectionLabel()));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 29, "admin.role"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.adminName());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeSection() === "dashboard" ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeSection() === "orders" ? 30 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeSection() === "users" ? 31 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeSection() === "products" ? 32 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.galleryOpen() ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.detailOpen() ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.deleteConfirmOpen() ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.productFormOpen() ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_20_0 = ctx.productDeleteConfirm()) ? 37 : -1, tmp_20_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_21_0 = ctx.userActionConfirm()) ? 38 : -1, tmp_21_0);
    }
  }, dependencies: [RouterModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, TranslateModule, ResizableTableDirective, TranslatePipe], styles: ['\n\n.admin-page[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-secondary);\n}\n.admin-sidebar[_ngcontent-%COMP%] {\n  width: 240px;\n  background: var(--bg-primary);\n  border-right: 1px solid var(--border-color);\n  display: flex;\n  flex-direction: column;\n  position: sticky;\n  top: 0;\n  height: 100vh;\n  overflow-y: auto;\n  transition: width 0.25s ease;\n  flex-shrink: 0;\n  z-index: 10;\n}\n.admin-sidebar.collapsed[_ngcontent-%COMP%] {\n  width: 64px;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-4) var(--space-3);\n  border-bottom: 1px solid var(--border-color);\n  min-height: 64px;\n}\n.sidebar-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  overflow: hidden;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: var(--text-base, 1rem);\n  color: var(--color-primary);\n  white-space: nowrap;\n}\n.sidebar-toggle[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-sm, 0.375rem);\n  cursor: pointer;\n  padding: var(--space-1) var(--space-2);\n  color: var(--text-secondary);\n  font-size: 12px;\n  transition: all 0.15s;\n  flex-shrink: 0;\n}\n.sidebar-toggle[_ngcontent-%COMP%]:hover {\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--space-3) var(--space-2);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  background: transparent;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.15s;\n  text-align: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  min-height: 44px;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: white;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  transition: filter 0.15s;\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%] {\n  filter: brightness(0) saturate(100%) invert(1);\n}\n.nav-label[_ngcontent-%COMP%] {\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 500;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-2);\n  border-top: 1px solid var(--border-color);\n}\n.logout-btn[_ngcontent-%COMP%] {\n  color: var(--color-error) !important;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-error-light) !important;\n}\n.logout-btn[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%] {\n  filter: brightness(0) saturate(100%) invert(20%) sepia(80%) saturate(6000%) hue-rotate(355deg);\n}\n.admin-main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n.admin-topbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 var(--space-6);\n  height: 64px;\n  background: var(--bg-primary);\n  border-bottom: 1px solid var(--border-color);\n  position: sticky;\n  top: 0;\n  z-index: 9;\n  gap: var(--space-4);\n}\n.topbar-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.topbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.mobile-menu-btn[_ngcontent-%COMP%] {\n  display: none;\n  background: transparent;\n  border: none;\n  font-size: 22px;\n  cursor: pointer;\n  color: var(--text-primary);\n  padding: var(--space-2);\n  border-radius: var(--radius-md, 0.5rem);\n}\n.page-heading[_ngcontent-%COMP%] {\n  font-size: var(--text-xl, 1.25rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.admin-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding: 3px var(--space-2);\n  background: rgba(6, 122, 69, 0.12);\n  color: var(--color-primary);\n  border-radius: var(--radius-full, 9999px);\n  border: 1px solid rgba(6, 122, 69, 0.2);\n}\n.admin-name[_ngcontent-%COMP%] {\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.section-content[_ngcontent-%COMP%] {\n  padding: var(--space-6);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-6);\n}\n.dashboard-greeting[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: clamp(1.2rem, 2.5vw, 1.5rem);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-4);\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  padding: var(--space-5);\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  border: 1px solid var(--border-color);\n  transition: all 0.2s;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-md);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-icon-img[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n}\n.stat-card.primary[_ngcontent-%COMP%]   .stat-icon-img[_ngcontent-%COMP%] {\n  filter: brightness(0) saturate(100%) invert(28%) sepia(90%) saturate(700%) hue-rotate(120deg);\n}\n.stat-card.success[_ngcontent-%COMP%]   .stat-icon-img[_ngcontent-%COMP%] {\n  filter: brightness(0) saturate(100%) invert(60%) sepia(50%) saturate(500%) hue-rotate(120deg);\n}\n.stat-card.info[_ngcontent-%COMP%]   .stat-icon-img[_ngcontent-%COMP%] {\n  filter: brightness(0) saturate(100%) invert(40%) sepia(80%) saturate(500%) hue-rotate(200deg);\n}\n.stat-card.warning[_ngcontent-%COMP%]   .stat-icon-img[_ngcontent-%COMP%] {\n  filter: brightness(0) saturate(100%) invert(75%) sepia(60%) saturate(800%) hue-rotate(10deg);\n}\n.stat-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: clamp(1.1rem, 2vw, 1.5rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.stat-change[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.stat-change.positive[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.stat-change.negative[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.stat-change.neutral[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n}\n.stat-card.primary[_ngcontent-%COMP%] {\n  border-top: 3px solid var(--color-primary);\n}\n.stat-card.success[_ngcontent-%COMP%] {\n  border-top: 3px solid var(--color-success);\n}\n.stat-card.info[_ngcontent-%COMP%] {\n  border-top: 3px solid var(--color-info);\n}\n.stat-card.warning[_ngcontent-%COMP%] {\n  border-top: 3px solid #f59e0b;\n}\n.admin-card[_ngcontent-%COMP%] {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--space-5) var(--space-6);\n  border-bottom: 1px solid var(--border-color);\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: var(--text-lg, 1.1rem);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.view-all-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--color-primary);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: opacity 0.15s;\n}\n.view-all-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.7;\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.admin-table[_ngcontent-%COMP%] {\n  table-layout: auto;\n  width: max-content;\n  min-width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: var(--text-sm, 0.9rem);\n}\n.admin-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: var(--space-3) var(--space-4);\n  background: var(--bg-secondary);\n  color: var(--text-secondary);\n  font-weight: 600;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  white-space: nowrap;\n  position: relative;\n  border-bottom: 1px solid var(--border-color);\n  -webkit-user-select: none;\n  user-select: none;\n  cursor: col-resize;\n}\n.admin-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 20%;\n  right: 0;\n  width: 2px;\n  height: 60%;\n  background: var(--border-color);\n  border-radius: 2px;\n  pointer-events: none;\n  transition: background 0.15s, width 0.1s;\n}\n.admin-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:hover::after {\n  background: var(--color-primary);\n  width: 3px;\n}\n.admin-table[_ngcontent-%COMP%]   th.is-resizing[_ngcontent-%COMP%]::after {\n  background: var(--color-primary);\n  width: 3px;\n}\n.admin-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4);\n  border-bottom: 1px solid var(--border-color);\n  color: var(--text-primary);\n  vertical-align: middle;\n  white-space: nowrap;\n}\n.admin-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.admin-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-secondary);\n}\n.order-id[_ngcontent-%COMP%] {\n  font-family: "Inconsolata", monospace;\n  font-weight: 600;\n}\n.muted[_ngcontent-%COMP%] {\n  color: var(--text-secondary) !important;\n}\n.font-bold[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  border-radius: var(--radius-full, 9999px);\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  white-space: nowrap;\n}\n.status-pending[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  color: var(--color-warning-hover);\n  border: 1px solid rgba(245, 158, 11, 0.3);\n}\n.status-processing[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.12);\n  color: var(--color-info);\n  border: 1px solid rgba(59, 130, 246, 0.3);\n}\n.status-shipped[_ngcontent-%COMP%] {\n  background: rgba(139, 92, 246, 0.12);\n  color: #7c3aed;\n  border: 1px solid rgba(139, 92, 246, 0.3);\n}\n.status-delivered[_ngcontent-%COMP%] {\n  background: rgba(6, 122, 69, 0.12);\n  color: var(--color-success);\n  border: 1px solid rgba(6, 122, 69, 0.3);\n}\n.status-cancelled[_ngcontent-%COMP%] {\n  background: rgba(220, 38, 38, 0.12);\n  color: var(--color-error);\n  border: 1px solid rgba(220, 38, 38, 0.3);\n}\n.role-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  border-radius: var(--radius-full, 9999px);\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.role-admin[_ngcontent-%COMP%] {\n  background: var(--color-error-light);\n  color: var(--color-error);\n  border: 1px solid rgba(220, 38, 38, 0.3);\n}\n.role-pharmacist[_ngcontent-%COMP%] {\n  background: var(--color-success-light);\n  color: var(--color-success);\n  border: 1px solid rgba(6, 122, 69, 0.3);\n}\n.role-user[_ngcontent-%COMP%] {\n  background: rgba(234, 179, 8, 0.1);\n  color: var(--color-warning-hover);\n  border: 1px solid rgba(234, 179, 8, 0.3);\n}\n.role-banned[_ngcontent-%COMP%] {\n  background: rgba(234, 88, 12, 0.12);\n  color: var(--color-warning-hover);\n  border: 1px solid rgba(234, 88, 12, 0.25);\n  text-decoration: line-through;\n}\n.role-deleted[_ngcontent-%COMP%] {\n  background: rgba(100, 116, 139, 0.12);\n  color: #64748b;\n  border: 1px solid rgba(100, 116, 139, 0.25);\n  text-decoration: line-through;\n}\n.stock-ok[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.stock-low[_ngcontent-%COMP%] {\n  color: var(--color-error);\n  font-weight: 700;\n}\n.action-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: var(--space-1) var(--space-2);\n  border-radius: var(--radius-sm, 0.375rem);\n  font-size: 16px;\n  transition: background 0.15s;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-secondary);\n}\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  flex-shrink: 0;\n}\n.product-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.product-thumb[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--radius-md, 0.5rem);\n  background: var(--bg-secondary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  border: 1px solid var(--border-color);\n  padding: 4px;\n}\n.product-thumb-img[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n}\n.section-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-3);\n  align-items: center;\n  flex-wrap: wrap;\n}\n.search-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-width: 200px;\n}\n.search-icon-small[_ngcontent-%COMP%] {\n  position: absolute;\n  left: var(--space-3);\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n  width: 16px;\n  height: 16px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.6;\n}\n.admin-search[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-2) var(--space-10) var(--space-2) var(--space-8);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.9rem);\n  min-height: 40px;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.admin-search[_ngcontent-%COMP%]::-webkit-search-cancel-button, \n.admin-search[_ngcontent-%COMP%]::-webkit-search-decoration {\n  -webkit-appearance: none;\n  appearance: none;\n  display: none;\n}\n.admin-search[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.admin-select[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-4);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.9rem);\n  min-height: 40px;\n  cursor: pointer;\n}\n.retry-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-4);\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  min-height: 44px;\n  white-space: nowrap;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    transform 0.1s;\n}\n.retry-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--bg-tertiary);\n  border-color: var(--border-color-hover);\n}\n.retry-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.97);\n}\n.retry-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.sidebar-overlay[_ngcontent-%COMP%] {\n  display: none;\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: var(--z-dropdown);\n  cursor: pointer;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-3);\n  padding: var(--space-10) var(--space-6);\n  color: var(--text-secondary);\n  font-size: var(--text-sm, 0.9rem);\n  text-align: center;\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  animation: _ngcontent-%COMP%_spinEmoji 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spinEmoji {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-state[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.error-state[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.loading-pulse[_ngcontent-%COMP%] {\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_pulse 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 0.4;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n.warning-text[_ngcontent-%COMP%] {\n  color: var(--color-warning-hover);\n}\n.add-btn[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  min-height: 40px;\n  white-space: nowrap;\n  transition: background 0.15s, transform 0.15s;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark);\n  transform: translateY(-1px);\n}\n@media (max-width: 1024px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .sidebar-overlay.active[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .admin-sidebar[_ngcontent-%COMP%] {\n    position: fixed;\n    left: 0;\n    top: 0;\n    height: 100vh;\n    z-index: var(--z-dropdown);\n    transform: translateX(-100%);\n    transition: transform 0.25s ease, width 0.25s ease;\n    box-shadow: var(--shadow-xl);\n  }\n  .admin-sidebar.collapsed[_ngcontent-%COMP%] {\n    width: 240px;\n    transform: translateX(0);\n  }\n  .mobile-menu-btn[_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .sidebar-toggle[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .admin-topbar[_ngcontent-%COMP%] {\n    padding: 0 var(--space-4);\n  }\n  .section-content[_ngcontent-%COMP%] {\n    padding: var(--space-4);\n    gap: var(--space-4);\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    gap: var(--space-3);\n  }\n  .stat-icon-img[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .section-toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .search-input-wrapper[_ngcontent-%COMP%] {\n    min-width: unset;\n  }\n  .admin-topbar[_ngcontent-%COMP%] {\n    padding: 0 var(--space-3);\n  }\n  .page-heading[_ngcontent-%COMP%] {\n    font-size: var(--text-base, 1rem);\n  }\n  .admin-name[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n[data-theme=dark][_ngcontent-%COMP%]   .admin-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-tertiary);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .admin-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: var(--bg-tertiary);\n}\n@media (prefers-reduced-motion: reduce) {\n  .admin-sidebar[_ngcontent-%COMP%], \n   .stat-card[_ngcontent-%COMP%], \n   .nav-item[_ngcontent-%COMP%], \n   .add-btn[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.images-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 10px;\n  background: rgba(6, 122, 69, 0.08);\n  border: 1px solid rgba(6, 122, 69, 0.2);\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  color: var(--color-primary);\n  transition: all 0.15s;\n  white-space: nowrap;\n}\n.images-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(6, 122, 69, 0.16);\n  border-color: rgba(6, 122, 69, 0.4);\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(6, 122, 69, 0.15);\n}\n.images-btn[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.images-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n}\n.images-count[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  min-width: 18px;\n  height: 18px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-primary);\n  color: white;\n  border-radius: var(--radius-full, 9999px);\n  line-height: 1;\n}\n.gallery-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop, 1040);\n  background: rgba(6, 60, 35, 0.55);\n  backdrop-filter: blur(6px);\n  -webkit-backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6);\n  animation: _ngcontent-%COMP%_overlayFadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_overlayFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.gallery-modal[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  max-width: 820px;\n  max-height: 85vh;\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--color-success-light);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_modalSlideIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes _ngcontent-%COMP%_modalSlideIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95) translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n.gallery-modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-5) var(--space-6);\n  border-bottom: 1px solid var(--border-color);\n  gap: var(--space-4);\n  flex-shrink: 0;\n}\n.gallery-modal-title-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.gallery-modal-title[_ngcontent-%COMP%] {\n  font-size: var(--text-lg, 1.1rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.gallery-product-name[_ngcontent-%COMP%] {\n  font-size: var(--text-sm, 0.85rem);\n  color: var(--text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gallery-close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  color: var(--text-secondary);\n  flex-shrink: 0;\n  transition: all 0.15s;\n}\n.gallery-close-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-tertiary);\n  color: var(--text-primary);\n  border-color: var(--border-color-hover);\n}\n.gallery-close-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n.gallery-modal-body[_ngcontent-%COMP%] {\n  padding: var(--space-5) var(--space-6);\n  overflow-y: auto;\n  flex: 1;\n}\n.gallery-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-3);\n  padding: var(--space-12) var(--space-6);\n  color: var(--text-secondary);\n  font-size: var(--text-sm, 0.9rem);\n}\n.gallery-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: var(--space-4);\n}\n.gallery-card[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: var(--radius-lg, 0.75rem);\n  border: 1px solid var(--border-color);\n  background: var(--bg-secondary);\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.2s;\n  aspect-ratio: 1;\n  display: flex;\n  flex-direction: column;\n}\n.gallery-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  box-shadow: 0 4px 16px rgba(6, 122, 69, 0.12), 0 0 0 1px rgba(6, 122, 69, 0.08);\n  transform: translateY(-2px);\n}\n.gallery-card-image-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  padding: var(--space-2);\n  background: var(--bg-tertiary, var(--bg-secondary));\n}\n.gallery-card-image[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n  border-radius: var(--radius-sm, 0.375rem);\n}\n.gallery-card-label[_ngcontent-%COMP%] {\n  padding: 6px var(--space-3);\n  font-size: 0.7rem;\n  color: var(--text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  border-top: 1px solid var(--border-color);\n  background: var(--bg-primary);\n}\n.gallery-card-delete[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(220, 38, 38, 0.9);\n  color: white;\n  border: none;\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  opacity: 0;\n  transform: scale(0.85);\n  transition: all 0.15s;\n  z-index: 2;\n}\n.gallery-card-delete[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.gallery-card[_ngcontent-%COMP%]:hover   .gallery-card-delete[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scale(1);\n}\n.gallery-card-delete[_ngcontent-%COMP%]:hover {\n  background: var(--color-error);\n  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);\n}\n.gallery-card-add[_ngcontent-%COMP%] {\n  border-style: dashed;\n  border-width: 2px;\n  border-color: var(--border-color);\n  background: transparent;\n}\n.gallery-card-add[_ngcontent-%COMP%]:hover {\n  border-color: var(--color-primary);\n  background: rgba(6, 122, 69, 0.04);\n}\n.gallery-card-add-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  padding: var(--space-4);\n}\n.gallery-add-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  color: var(--color-primary);\n  opacity: 0.6;\n  transition: opacity 0.15s;\n}\n.gallery-card-add[_ngcontent-%COMP%]:hover   .gallery-add-icon[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.gallery-add-text[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--color-primary);\n  opacity: 0.7;\n  transition: opacity 0.15s;\n}\n.gallery-card-add[_ngcontent-%COMP%]:hover   .gallery-add-text[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n.row-action-btn[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  color: var(--text-secondary);\n  transition: all 0.15s;\n  padding: 0;\n}\n.row-action-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n}\n.row-action-btn.edit-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(6, 122, 69, 0.08);\n  border-color: rgba(6, 122, 69, 0.2);\n  color: var(--color-primary);\n}\n.row-action-btn.delete-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-error-light);\n  border-color: rgba(220, 38, 38, 0.2);\n  color: var(--color-error);\n}\n.product-form-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop, 1040);\n  background: rgba(6, 60, 35, 0.55);\n  backdrop-filter: blur(6px);\n  -webkit-backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-4);\n  animation: _ngcontent-%COMP%_overlayFadeIn 0.2s ease;\n}\n.product-form-modal[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  max-width: 780px;\n  max-height: 90vh;\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--color-success-light);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_modalSlideIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.product-form-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-5) var(--space-6);\n  border-bottom: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n.product-form-title[_ngcontent-%COMP%] {\n  font-size: var(--text-lg, 1.1rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.product-form-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 1px solid var(--border-color);\n  padding: 0 var(--space-6);\n  gap: 0;\n  flex-shrink: 0;\n  overflow-x: auto;\n}\n.pf-tab[_ngcontent-%COMP%] {\n  padding: var(--space-3) var(--space-4);\n  background: transparent;\n  border: none;\n  border-bottom: 2px solid transparent;\n  color: var(--text-secondary);\n  font-size: var(--text-sm, 0.85rem);\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.15s;\n}\n.pf-tab[_ngcontent-%COMP%]:hover {\n  color: var(--text-primary);\n}\n.pf-tab-active[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  border-bottom-color: var(--color-primary);\n}\n.product-form-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--space-5) var(--space-6);\n}\n.pf-section[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-5);\n}\n.pf-section-title[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--text-secondary);\n  margin-bottom: var(--space-3);\n}\n.pf-grid-3[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-3);\n}\n.pf-grid-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: var(--space-3);\n}\n.pf-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n.pf-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.pf-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  color: var(--text-secondary);\n}\n.pf-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md, 0.5rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.85rem);\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.pf-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.pf-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md, 0.5rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.85rem);\n  cursor: pointer;\n}\n.pf-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.pf-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md, 0.5rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.85rem);\n  font-family: inherit;\n  resize: vertical;\n  min-height: 80px;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.pf-textarea-sm[_ngcontent-%COMP%] {\n  min-height: 50px;\n}\n.pf-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.pf-price-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: var(--bg-secondary);\n  border-radius: var(--radius-md, 0.5rem);\n  border: 1px solid var(--border-color);\n}\n.pf-price-original[_ngcontent-%COMP%] {\n  font-size: var(--text-sm, 0.85rem);\n  color: var(--text-secondary);\n  text-decoration: line-through;\n}\n.pf-price-arrow[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.pf-price-discounted[_ngcontent-%COMP%] {\n  font-size: var(--text-base, 1rem);\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.pf-price-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 2px var(--space-2);\n  background: var(--color-error-light);\n  color: var(--color-error);\n  border-radius: var(--radius-full, 9999px);\n}\n.product-form-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: var(--space-3);\n  padding: var(--space-4) var(--space-6);\n  border-top: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n@media (max-width: 768px) {\n  .product-form-modal[_ngcontent-%COMP%] {\n    max-height: 95vh;\n  }\n  .product-form-header[_ngcontent-%COMP%] {\n    padding: var(--space-4);\n  }\n  .product-form-body[_ngcontent-%COMP%] {\n    padding: var(--space-4);\n  }\n  .product-form-tabs[_ngcontent-%COMP%] {\n    padding: 0 var(--space-4);\n  }\n  .product-form-footer[_ngcontent-%COMP%] {\n    padding: var(--space-3) var(--space-4);\n  }\n  .pf-grid-3[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .pf-grid-2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.detail-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal, 1050);\n  background: rgba(6, 60, 35, 0.65);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6);\n  animation: _ngcontent-%COMP%_overlayFadeIn 0.2s ease;\n}\n.detail-modal[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  max-width: 960px;\n  max-height: 90vh;\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--color-success-light);\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_modalSlideIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n  display: flex;\n  flex-direction: column;\n}\n.detail-close-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: var(--space-3);\n  right: var(--space-3);\n  z-index: 5;\n}\n.detail-content[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  flex: 1;\n  overflow: hidden;\n}\n.detail-image-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6);\n  background: var(--bg-secondary);\n  min-height: 300px;\n  overflow: auto;\n}\n.detail-full-image[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 70vh;\n  object-fit: contain;\n  border-radius: var(--radius-sm, 0.375rem);\n}\n.detail-info-panel[_ngcontent-%COMP%] {\n  width: 280px;\n  flex-shrink: 0;\n  padding: var(--space-6);\n  border-left: 1px solid var(--border-color);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n  overflow-y: auto;\n}\n.detail-info-title[_ngcontent-%COMP%] {\n  font-size: var(--text-base, 1rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.detail-meta-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n.detail-meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.detail-meta-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--text-secondary);\n}\n.detail-meta-value[_ngcontent-%COMP%] {\n  font-size: var(--text-sm, 0.85rem);\n  color: var(--text-primary);\n  word-break: break-all;\n}\n.detail-actions[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: var(--space-4);\n  border-top: 1px solid var(--border-color);\n}\n.detail-download-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-3) var(--space-5);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  width: 100%;\n  justify-content: center;\n  transition: all 0.15s;\n}\n.detail-download-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-primary-dark, #0b5f39);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(6, 122, 69, 0.3);\n}\n.detail-download-btn[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.detail-download-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n.confirm-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: calc(var(--z-modal, 1050) + 10);\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(3px);\n  -webkit-backdrop-filter: blur(3px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6);\n  animation: _ngcontent-%COMP%_overlayFadeIn 0.15s ease;\n}\n.confirm-dialog[_ngcontent-%COMP%] {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.35);\n  padding: var(--space-8) var(--space-6) var(--space-6);\n  max-width: 380px;\n  width: 100%;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-3);\n  animation: _ngcontent-%COMP%_modalSlideIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.confirm-icon-wrapper[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-error-light);\n  border-radius: var(--radius-full, 9999px);\n  margin-bottom: var(--space-1);\n}\n.confirm-icon[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  color: var(--color-error);\n}\n.confirm-title[_ngcontent-%COMP%] {\n  font-size: var(--text-base, 1rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.confirm-text[_ngcontent-%COMP%] {\n  font-size: var(--text-sm, 0.85rem);\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.5;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-3);\n  width: 100%;\n  margin-top: var(--space-3);\n}\n.confirm-cancel-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--space-3) var(--space-4);\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.confirm-cancel-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-tertiary);\n  border-color: var(--border-color-hover);\n}\n.confirm-delete-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--space-3) var(--space-4);\n  background: var(--color-error);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.confirm-delete-btn[_ngcontent-%COMP%]:hover {\n  background: var(--color-error-hover);\n  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n}\n@media (max-width: 768px) {\n  .gallery-overlay[_ngcontent-%COMP%], \n   .detail-overlay[_ngcontent-%COMP%] {\n    padding: var(--space-3);\n  }\n  .gallery-modal[_ngcontent-%COMP%] {\n    max-height: 90vh;\n  }\n  .gallery-modal-header[_ngcontent-%COMP%] {\n    padding: var(--space-4);\n  }\n  .gallery-modal-body[_ngcontent-%COMP%] {\n    padding: var(--space-4);\n  }\n  .gallery-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n    gap: var(--space-3);\n  }\n  .detail-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .detail-image-container[_ngcontent-%COMP%] {\n    min-height: 200px;\n    padding: var(--space-4);\n  }\n  .detail-info-panel[_ngcontent-%COMP%] {\n    width: 100%;\n    border-left: none;\n    border-top: 1px solid var(--border-color);\n    padding: var(--space-4);\n  }\n  .detail-full-image[_ngcontent-%COMP%] {\n    max-height: 40vh;\n  }\n}\n@media (max-width: 480px) {\n  .gallery-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: var(--space-2);\n  }\n  .gallery-card-delete[_ngcontent-%COMP%] {\n    opacity: 1;\n    transform: scale(1);\n  }\n  .confirm-dialog[_ngcontent-%COMP%] {\n    padding: var(--space-6) var(--space-4) var(--space-4);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .gallery-overlay[_ngcontent-%COMP%], \n   .detail-overlay[_ngcontent-%COMP%], \n   .confirm-overlay[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .gallery-modal[_ngcontent-%COMP%], \n   .detail-modal[_ngcontent-%COMP%], \n   .confirm-dialog[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .gallery-card[_ngcontent-%COMP%], \n   .images-btn[_ngcontent-%COMP%], \n   .gallery-card-delete[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.gallery-header-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  flex-shrink: 0;\n}\n.transparent-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.transparent-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  white-space: nowrap;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.toggle-switch[_ngcontent-%COMP%] {\n  position: relative;\n  width: 40px;\n  height: 22px;\n  background: var(--border-color);\n  border: none;\n  border-radius: var(--radius-full, 9999px);\n  cursor: pointer;\n  padding: 0;\n  transition: background 0.2s;\n  flex-shrink: 0;\n}\n.toggle-switch.active[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n}\n.toggle-knob[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  width: 18px;\n  height: 18px;\n  background: white;\n  border-radius: 50%;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  transition: transform 0.2s;\n}\n.toggle-switch.active[_ngcontent-%COMP%]   .toggle-knob[_ngcontent-%COMP%] {\n  transform: translateX(18px);\n}\n.toggle-switch[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.toggle-switch[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n}\n.user-actions-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.action-menu-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  padding: var(--space-1) var(--space-2);\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 1;\n  color: var(--text-secondary);\n  transition: all 0.15s;\n  min-width: 32px;\n  min-height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 1px;\n}\n.action-menu-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-secondary);\n  border-color: var(--border-color);\n  color: var(--text-primary);\n}\n.action-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 4px);\n  right: 0;\n  z-index: 50;\n  min-width: 180px;\n  background: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-2);\n  animation: _ngcontent-%COMP%_dropdownFadeIn 0.15s ease;\n}\n@keyframes _ngcontent-%COMP%_dropdownFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.dropdown-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.dropdown-label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--text-secondary);\n  padding: var(--space-1) var(--space-3);\n  margin-bottom: 2px;\n}\n.dropdown-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  background: transparent;\n  border: none;\n  border-radius: var(--radius-md, 0.5rem);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.85rem);\n  cursor: pointer;\n  text-align: left;\n  white-space: nowrap;\n  transition: background 0.1s;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover {\n  background: var(--bg-secondary);\n}\n.dropdown-item-warn[_ngcontent-%COMP%] {\n  color: var(--color-warning-hover);\n}\n.dropdown-item-warn[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, 0.08);\n}\n.dropdown-item-danger[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.dropdown-item-danger[_ngcontent-%COMP%]:hover {\n  background: var(--color-error-light);\n}\n.dropdown-item-success[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.dropdown-item-success[_ngcontent-%COMP%]:hover {\n  background: rgba(6, 122, 69, 0.08);\n}\n.dropdown-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--border-color);\n  margin: var(--space-1) 0;\n}\n.role-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.role-dot.role-admin[_ngcontent-%COMP%] {\n  background: var(--color-error);\n}\n.role-dot.role-pharmacist[_ngcontent-%COMP%] {\n  background: #067a45;\n}\n.role-dot.role-user[_ngcontent-%COMP%] {\n  background: #d97706;\n}\n.role-dot.role-banned[_ngcontent-%COMP%] {\n  background: #ea580c;\n}\n.role-dot.role-deleted[_ngcontent-%COMP%] {\n  background: #64748b;\n}\n.self-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-style: italic;\n}\n.row-banned[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.row-deleted[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  opacity: 0.4;\n  text-decoration: line-through;\n}\n.confirm-icon-danger[_ngcontent-%COMP%] {\n  background: var(--color-error-light) !important;\n}\n.confirm-icon-danger[_ngcontent-%COMP%]   .confirm-icon[_ngcontent-%COMP%] {\n  color: var(--color-error) !important;\n}\n.confirm-icon-primary[_ngcontent-%COMP%] {\n  background: var(--color-success-light) !important;\n}\n.confirm-icon-primary[_ngcontent-%COMP%]   .confirm-icon[_ngcontent-%COMP%] {\n  color: var(--color-primary) !important;\n}\n.confirm-action-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--space-3) var(--space-4);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.confirm-action-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-primary-dark, #0b5f39);\n  box-shadow: 0 4px 12px rgba(6, 122, 69, 0.3);\n}\n.confirm-action-btn[_ngcontent-%COMP%]:disabled, \n.confirm-delete-btn[_ngcontent-%COMP%]:disabled, \n.confirm-cancel-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.confirm-state-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: var(--bg-secondary);\n  border-radius: var(--radius-md, 0.5rem);\n  width: 100%;\n  justify-content: center;\n}\n.state-arrow[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.spinner-small[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  animation: _ngcontent-%COMP%_spinEmoji 1s linear infinite;\n  display: inline-block;\n}\n.admin-search[_ngcontent-%COMP%]::placeholder {\n  font-size: 0.8rem;\n  opacity: 0.55;\n}\n@media (max-width: 768px) {\n  .gallery-header-controls[_ngcontent-%COMP%] {\n    gap: var(--space-3);\n  }\n  .transparent-label[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .action-dropdown[_ngcontent-%COMP%] {\n    position: fixed;\n    top: auto;\n    right: var(--space-3);\n    bottom: var(--space-3);\n    left: var(--space-3);\n    min-width: unset;\n    border-radius: var(--radius-xl, 1rem);\n    box-shadow: var(--shadow-2xl);\n  }\n}\n/*# sourceMappingURL=admin.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Admin, [{
    type: Component,
    args: [{ selector: "app-admin", standalone: true, imports: [RouterModule, FormsModule, TranslateModule, ResizableTableDirective], template: `<div class="admin-page">\r
  <div\r
    class="sidebar-overlay"\r
    [class.active]="mobileOverlayActive()"\r
    (click)="closeMobileSidebar()"\r
    aria-hidden="true"\r
  ></div>\r
\r
  <aside class="admin-sidebar" [class.collapsed]="sidebarCollapsed()">\r
    <div class="sidebar-header">\r
      <div class="sidebar-logo">\r
        <img [src]="icons.admin" alt="Admin" class="logo-icon" aria-hidden="true" />\r
        @if (showNavLabels()) {\r
          <span class="logo-text">Roy's Admin</span>\r
        }\r
      </div>\r
      <button\r
        class="sidebar-toggle"\r
        (click)="toggleSidebar()"\r
        [attr.aria-label]="'admin.toggle_sidebar' | translate"\r
      >\r
        {{ sidebarCollapsed() ? '\u25B6' : '\u25C0' }}\r
      </button>\r
    </div>\r
\r
    <nav class="sidebar-nav">\r
      @for (item of navItems; track item.id) {\r
        <button\r
          [class]="'nav-item' + (activeSection() === item.id ? ' active' : '')"\r
          (click)="setSection(item.id)"\r
          [attr.title]="item.label | translate"\r
        >\r
          <img\r
            [src]="item.icon"\r
            [attr.alt]="item.label | translate"\r
            class="nav-icon"\r
            aria-hidden="true"\r
          />\r
          @if (showNavLabels()) {\r
            <span class="nav-label">{{ item.label | translate }}</span>\r
          }\r
        </button>\r
      }\r
    </nav>\r
\r
    @if (showNavLabels()) {\r
      <div class="sidebar-footer">\r
        <button class="nav-item logout-btn" (click)="logout()">\r
          <img [src]="icons.login" alt="" class="nav-icon" aria-hidden="true" />\r
          <span class="nav-label">{{ 'profile.logout' | translate }}</span>\r
        </button>\r
      </div>\r
    }\r
  </aside>\r
\r
  <main class="admin-main">\r
    <header class="admin-topbar">\r
      <div class="topbar-left">\r
        <button\r
          class="mobile-menu-btn"\r
          (click)="toggleSidebar()"\r
          [attr.aria-label]="'admin.toggle_sidebar' | translate"\r
        >\r
          \u2630\r
        </button>\r
        <h1 class="page-heading">{{ currentSectionLabel() | translate }}</h1>\r
      </div>\r
      <div class="topbar-right">\r
        <span class="admin-badge">{{ 'admin.role' | translate }}</span>\r
        <span class="admin-name">{{ adminName() }}</span>\r
      </div>\r
    </header>\r
\r
    @if (activeSection() === 'dashboard') {\r
      <div class="section-content">\r
        <div class="dashboard-greeting">\r
          <h2>{{ 'admin.greeting' | translate: { name: adminName() } }}</h2>\r
        </div>\r
\r
        <div class="stats-grid">\r
          <div class="stat-card primary">\r
            <div class="stat-icon">\r
              <img [src]="icons.order" alt="" aria-hidden="true" class="stat-icon-img" />\r
            </div>\r
            <div class="stat-body">\r
              @if (ordersLoading()) {\r
                <span class="stat-value loading-pulse">\u2014</span>\r
              } @else {\r
                <span class="stat-value">{{ stats().totalOrders }}</span>\r
              }\r
              <span class="stat-label">{{ 'admin.stats.total_orders' | translate }}</span>\r
            </div>\r
          </div>\r
\r
          <div class="stat-card success">\r
            <div class="stat-icon">\r
              <img [src]="icons.payment" alt="" aria-hidden="true" class="stat-icon-img" />\r
            </div>\r
            <div class="stat-body">\r
              @if (ordersLoading()) {\r
                <span class="stat-value loading-pulse">\u2014</span>\r
              } @else {\r
                <span class="stat-value">{{ formatRevenue(stats().revenue) }}</span>\r
              }\r
              <span class="stat-label">{{ 'admin.stats.revenue' | translate }}</span>\r
            </div>\r
          </div>\r
\r
          <div class="stat-card info">\r
            <div class="stat-icon">\r
              <img [src]="icons.customers" alt="" aria-hidden="true" class="stat-icon-img" />\r
            </div>\r
            <div class="stat-body">\r
              @if (usersLoading()) {\r
                <span class="stat-value loading-pulse">\u2014</span>\r
              } @else {\r
                <span class="stat-value">{{ stats().totalUsers }}</span>\r
              }\r
              <span class="stat-label">{{ 'admin.stats.total_users' | translate }}</span>\r
            </div>\r
          </div>\r
\r
          <div class="stat-card warning">\r
            <div class="stat-icon">\r
              <img [src]="icons.sale" alt="" aria-hidden="true" class="stat-icon-img" />\r
            </div>\r
            <div class="stat-body">\r
              @if (productsLoading()) {\r
                <span class="stat-value loading-pulse">\u2014</span>\r
              } @else {\r
                <span class="stat-value">{{ stats().totalProducts }}</span>\r
              }\r
              <span class="stat-label">{{ 'admin.stats.total_products' | translate }}</span>\r
              @if (!productsLoading() && stats().lowStock > 0) {\r
                <span class="stat-change warning-text">\r
                  {{ stats().lowStock }} {{ 'admin.stats.low_stock' | translate }}\r
                </span>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="admin-card">\r
          <div class="card-header">\r
            <h2 class="card-title">{{ 'admin.recent_orders' | translate }}</h2>\r
            <button class="view-all-btn" (click)="setSection('orders')">\r
              {{ 'admin.view_all' | translate }} \u2192\r
            </button>\r
          </div>\r
\r
          @if (ordersLoading()) {\r
            <div class="loading-state">\r
              <span class="spinner">\u23F3</span>\r
              <span>{{ 'admin.loading' | translate }}</span>\r
            </div>\r
          } @else if (ordersError()) {\r
            <div class="error-state">\r
              <span>\u26A0\uFE0F {{ ordersError()! | translate }}</span>\r
              <button class="retry-btn" (click)="loadOrders()">\r
                {{ 'common.retry' | translate }}\r
              </button>\r
            </div>\r
          } @else if (recentOrders().length === 0) {\r
            <div class="empty-state">{{ 'admin.no_orders' | translate }}</div>\r
          } @else {\r
            <div class="table-wrapper">\r
              <table class="admin-table" appResizableTable="dashboard-orders">\r
                <thead>\r
                  <tr>\r
                    <th>{{ 'admin.table.order_id' | translate }}</th>\r
                    <th>{{ 'admin.table.email' | translate }}</th>\r
                    <th>{{ 'admin.table.date' | translate }}</th>\r
                    <th>{{ 'admin.table.address' | translate }}</th>\r
                    <th>{{ 'admin.table.total' | translate }}</th>\r
                    <th>{{ 'admin.table.status' | translate }}</th>\r
                  </tr>\r
                </thead>\r
                <tbody>\r
                  @for (order of recentOrders(); track order.id) {\r
                    <tr>\r
                      <td class="order-id">#{{ order.id }}</td>\r
                      <td class="muted">{{ order.email || order.user_id }}</td>\r
                      <td class="muted">{{ formatDate(order.created_at) }}</td>\r
                      <td>{{ getOrderAddressSummary(order) }}</td>\r
                      <td class="font-bold">{{ formatRevenue(order.price) }}</td>\r
                      <td>\r
                        <span [class]="getOrderStatusClass(order.order_status)">\r
                          {{ order.order_status }}\r
                        </span>\r
                      </td>\r
                    </tr>\r
                  }\r
                </tbody>\r
              </table>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    }\r
\r
    @if (activeSection() === 'orders') {\r
      <div class="section-content">\r
        <div class="section-toolbar">\r
          <div class="search-input-wrapper">\r
            <img [src]="icons.search" alt="" class="search-icon-small" aria-hidden="true" />\r
            <input\r
              type="search"\r
              class="admin-search"\r
              [(ngModel)]="orderSearch"\r
              [placeholder]="\r
                ('admin.search_orders' | translate) + '   (city:budapest, status:delivered)'\r
              "\r
            />\r
          </div>\r
          <button class="retry-btn" (click)="loadOrders()" [disabled]="ordersLoading()">\r
            \u{1F504} {{ 'common.refresh' | translate }}\r
          </button>\r
        </div>\r
\r
        @if (ordersLoading()) {\r
          <div class="loading-state">\r
            <span class="spinner">\u23F3</span>\r
            <span>{{ 'admin.loading' | translate }}</span>\r
          </div>\r
        } @else if (ordersError()) {\r
          <div class="error-state">\r
            <span>\u26A0\uFE0F {{ ordersError()! | translate }}</span>\r
            <button class="retry-btn" (click)="loadOrders()">\r
              {{ 'common.retry' | translate }}\r
            </button>\r
          </div>\r
        } @else {\r
          <div class="admin-card">\r
            <div class="table-wrapper">\r
              @if (filteredOrders().length === 0) {\r
                <div class="empty-state">{{ 'admin.no_orders' | translate }}</div>\r
              } @else {\r
                <table class="admin-table" appResizableTable="orders">\r
                  <thead>\r
                    <tr>\r
                      <th>{{ 'admin.table.order_id' | translate }}</th>\r
                      <th>{{ 'admin.table.email' | translate }}</th>\r
                      <th>{{ 'admin.table.billing' | translate }}</th>\r
                      <th>{{ 'admin.table.date' | translate }}</th>\r
                      <th>{{ 'admin.table.address' | translate }}</th>\r
                      <th>{{ 'admin.table.phone' | translate }}</th>\r
                      <th>{{ 'admin.table.total' | translate }}</th>\r
                      <th>{{ 'admin.table.status' | translate }}</th>\r
                      <th>{{ 'admin.table.note' | translate }}</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody>\r
                    @for (order of filteredOrders(); track order.id) {\r
                      <tr>\r
                        <td class="order-id">#{{ order.id }}</td>\r
                        <td class="muted">{{ order.email || '\u2014' }}</td>\r
                        <td>{{ order.billing_name || '\u2014' }}</td>\r
                        <td class="muted">{{ formatDate(order.created_at) }}</td>\r
                        <td>{{ getOrderAddressSummary(order) }}</td>\r
                        <td class="muted">{{ order.phone_number || '\u2014' }}</td>\r
                        <td class="font-bold">{{ formatRevenue(order.price) }}</td>\r
                        <td>\r
                          <span [class]="getOrderStatusClass(order.order_status)">\r
                            {{ order.order_status }}\r
                          </span>\r
                        </td>\r
                        <td class="muted note-cell">{{ order.note || '\u2014' }}</td>\r
                      </tr>\r
                    }\r
                  </tbody>\r
                </table>\r
              }\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    }\r
\r
    @if (activeSection() === 'users') {\r
      <div class="section-content">\r
        <div class="section-toolbar">\r
          <div class="search-input-wrapper">\r
            <img [src]="icons.search" alt="" class="search-icon-small" aria-hidden="true" />\r
            <input\r
              type="search"\r
              class="admin-search"\r
              [(ngModel)]="userSearch"\r
              [placeholder]="('admin.search_users' | translate) + '   (role:admin, email:gmail)'"\r
            />\r
          </div>\r
          <button class="retry-btn" (click)="loadUsers()" [disabled]="usersLoading()">\r
            \u{1F504} {{ 'common.refresh' | translate }}\r
          </button>\r
        </div>\r
\r
        @if (usersLoading()) {\r
          <div class="loading-state">\r
            <span class="spinner">\u23F3</span>\r
            <span>{{ 'admin.loading' | translate }}</span>\r
          </div>\r
        } @else if (usersError()) {\r
          <div class="error-state">\r
            <span>\u26A0\uFE0F {{ usersError()! | translate }}</span>\r
            <button class="retry-btn" (click)="loadUsers()">\r
              {{ 'common.retry' | translate }}\r
            </button>\r
          </div>\r
        } @else {\r
          <div class="admin-card">\r
            <div class="table-wrapper">\r
              @if (filteredUsers().length === 0) {\r
                <div class="empty-state">{{ 'admin.no_users' | translate }}</div>\r
              } @else {\r
                <table class="admin-table" appResizableTable="users">\r
                  <thead>\r
                    <tr>\r
                      <th>{{ 'admin.table.user' | translate }}</th>\r
                      <th>{{ 'admin.table.email' | translate }}</th>\r
                      <th>{{ 'admin.table.role' | translate }}</th>\r
                      <th>{{ 'admin.table.registered' | translate }}</th>\r
                      <th>ID</th>\r
                      <th>{{ 'admin.table.actions' | translate }}</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody>\r
                    @for (user of filteredUsers(); track user.id) {\r
                      <tr\r
                        [class.row-banned]="user.account_state === 'banned'"\r
                        [class.row-deleted]="user.account_state === 'deleted'"\r
                      >\r
                        <td>\r
                          <div class="user-cell">\r
                            <div class="user-avatar">{{ getUserInitial(user) }}</div>\r
                            <span>{{ getUserFullName(user) }}</span>\r
                          </div>\r
                        </td>\r
                        <td class="muted">{{ user.email }}</td>\r
                        <td>\r
                          <span [class]="'role-badge ' + getAccountStateClass(user.account_state)">\r
                            {{ user.account_state }}\r
                          </span>\r
                        </td>\r
                        <td class="muted">{{ formatDate(user.created_at) }}</td>\r
                        <td class="muted">#{{ user.id }}</td>\r
                        <td>\r
                          @if (!isSelf(user) && user.account_state !== 'deleted') {\r
                            <div class="user-actions-wrapper">\r
                              <button\r
                                class="action-menu-btn"\r
                                (click)="toggleUserMenu(user.id, $event)"\r
                                [attr.aria-label]="'admin.table.actions' | translate"\r
                              >\r
                                \u22EE\r
                              </button>\r
                              @if (activeUserMenu() === user.id) {\r
                                <div class="action-dropdown">\r
                                  @if (user.account_state !== 'banned') {\r
                                    <div class="dropdown-section">\r
                                      <span class="dropdown-label">{{\r
                                        'admin.user_actions.set_role' | translate\r
                                      }}</span>\r
                                      @for (state of getAvailableStates(user); track state) {\r
                                        <button\r
                                          class="dropdown-item"\r
                                          (click)="requestChangeRole(user, state)"\r
                                        >\r
                                          <span\r
                                            [class]="'role-dot ' + getAccountStateClass(state)"\r
                                          ></span>\r
                                          {{ state }}\r
                                        </button>\r
                                      }\r
                                    </div>\r
                                    <div class="dropdown-divider"></div>\r
                                    <button\r
                                      class="dropdown-item dropdown-item-warn"\r
                                      (click)="requestBanUser(user)"\r
                                    >\r
                                      {{ 'admin.user_actions.ban' | translate }}\r
                                    </button>\r
                                  } @else {\r
                                    <button\r
                                      class="dropdown-item dropdown-item-success"\r
                                      (click)="requestUnbanUser(user)"\r
                                    >\r
                                      {{ 'admin.user_actions.unban' | translate }}\r
                                    </button>\r
                                    <div class="dropdown-divider"></div>\r
                                  }\r
                                  <button\r
                                    class="dropdown-item dropdown-item-danger"\r
                                    (click)="requestDeleteUser(user)"\r
                                  >\r
                                    {{ 'admin.user_actions.delete' | translate }}\r
                                  </button>\r
                                </div>\r
                              }\r
                            </div>\r
                          } @else if (isSelf(user)) {\r
                            <span class="muted self-label">{{\r
                              'admin.user_actions.you' | translate\r
                            }}</span>\r
                          } @else {\r
                            <span class="muted">\u2014</span>\r
                          }\r
                        </td>\r
                      </tr>\r
                    }\r
                  </tbody>\r
                </table>\r
              }\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    }\r
\r
    @if (activeSection() === 'products') {\r
      <div class="section-content">\r
        <div class="section-toolbar">\r
          <div class="search-input-wrapper">\r
            <img [src]="icons.search" alt="" class="search-icon-small" aria-hidden="true" />\r
            <input\r
              type="search"\r
              class="admin-search"\r
              [(ngModel)]="productSearch"\r
              [placeholder]="\r
                ('admin.search_products' | translate) + '   (brand:bayer, category:medicines)'\r
              "\r
            />\r
          </div>\r
          <button class="add-btn" (click)="openProductForm()">\r
            + {{ 'admin.product_form.add' | translate }}\r
          </button>\r
          <button class="retry-btn" (click)="loadProducts()" [disabled]="productsLoading()">\r
            \u{1F504} {{ 'common.refresh' | translate }}\r
          </button>\r
        </div>\r
\r
        @if (productsLoading()) {\r
          <div class="loading-state">\r
            <span class="spinner">\u23F3</span>\r
            <span>{{ 'admin.loading' | translate }}</span>\r
          </div>\r
        } @else if (productsError()) {\r
          <div class="error-state">\r
            <span>\u26A0\uFE0F {{ productsError()! | translate }}</span>\r
            <button class="retry-btn" (click)="loadProducts()">\r
              {{ 'common.retry' | translate }}\r
            </button>\r
          </div>\r
        } @else {\r
          <div class="admin-card">\r
            <div class="table-wrapper">\r
              @if (filteredProducts().length === 0) {\r
                <div class="empty-state">{{ 'admin.no_products' | translate }}</div>\r
              } @else {\r
                <table class="admin-table" appResizableTable="products">\r
                  <thead>\r
                    <tr>\r
                      <th>{{ 'admin.table.product' | translate }}</th>\r
                      <th>{{ 'admin.table.images' | translate }}</th>\r
                      <th>{{ 'admin.table.brand' | translate }}</th>\r
                      <th>{{ 'admin.table.category' | translate }}</th>\r
                      <th>SKU</th>\r
                      <th>{{ 'admin.table.price' | translate }}</th>\r
                      <th>{{ 'admin.table.stock' | translate }}</th>\r
                      <th>{{ 'admin.table.rating' | translate }}</th>\r
                      <th>{{ 'admin.table.status' | translate }}</th>\r
                      <th>{{ 'admin.table.actions' | translate }}</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody>\r
                    @for (product of filteredProducts(); track product.id) {\r
                      <tr>\r
                        <td>\r
                          <div class="product-cell">\r
                            <div class="product-thumb">\r
                              <img\r
                                [src]="icons.categoryMedicines"\r
                                alt=""\r
                                aria-hidden="true"\r
                                class="product-thumb-img"\r
                              />\r
                            </div>\r
                            <div class="product-cell-info">\r
                              <span class="product-name">{{ product.name }}</span>\r
                            </div>\r
                          </div>\r
                        </td>\r
                        <td>\r
                          <button\r
                            class="images-btn"\r
                            (click)="openGallery(product)"\r
                            [attr.title]="'admin.table.view_images' | translate"\r
                          >\r
                            <svg\r
                              class="images-icon"\r
                              viewBox="0 0 24 24"\r
                              fill="none"\r
                              stroke="currentColor"\r
                              stroke-width="1.8"\r
                              stroke-linecap="round"\r
                              stroke-linejoin="round"\r
                            >\r
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />\r
                              <circle cx="8.5" cy="8.5" r="1.5" />\r
                              <polyline points="21 15 16 10 5 21" />\r
                            </svg>\r
                            <span class="images-count">{{ getProductImageCount(product) }}</span>\r
                          </button>\r
                        </td>\r
                        <td class="muted">{{ product.brand }}</td>\r
                        <td class="muted">{{ product.category }}</td>\r
                        <td class="muted">{{ product.sku }}</td>\r
                        <td class="font-bold">{{ formatRevenue(product.price) }}</td>\r
                        <td>\r
                          <span [class]="product.stock_number < 10 ? 'stock-low' : 'stock-ok'">\r
                            {{ product.stock_number }} {{ 'common.items_unit' | translate }}\r
                          </span>\r
                        </td>\r
                        <td class="muted">\u2605 {{ product.rating_number.toFixed(1) }}</td>\r
                        <td>\r
                          <span\r
                            [class]="\r
                              'status-badge status-' + (product.in_stock ? 'delivered' : 'cancelled')\r
                            "\r
                          >\r
                            {{\r
                              product.in_stock\r
                                ? ('admin.active' | translate)\r
                                : ('admin.inactive' | translate)\r
                            }}\r
                          </span>\r
                        </td>\r
                        <td>\r
                          <div class="row-actions">\r
                            <button\r
                              class="row-action-btn edit-btn"\r
                              (click)="openProductForm(product)"\r
                              [attr.title]="'common.edit' | translate"\r
                            >\r
                              <svg\r
                                viewBox="0 0 24 24"\r
                                fill="none"\r
                                stroke="currentColor"\r
                                stroke-width="2"\r
                                stroke-linecap="round"\r
                                stroke-linejoin="round"\r
                              >\r
                                <path\r
                                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"\r
                                />\r
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />\r
                              </svg>\r
                            </button>\r
                            <button\r
                              class="row-action-btn delete-btn"\r
                              (click)="requestDeleteProduct(product, $event)"\r
                              [attr.title]="'admin.product_form.delete' | translate"\r
                            >\r
                              <svg\r
                                viewBox="0 0 24 24"\r
                                fill="none"\r
                                stroke="currentColor"\r
                                stroke-width="2"\r
                                stroke-linecap="round"\r
                                stroke-linejoin="round"\r
                              >\r
                                <polyline points="3 6 5 6 21 6" />\r
                                <path\r
                                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"\r
                                />\r
                              </svg>\r
                            </button>\r
                          </div>\r
                        </td>\r
                      </tr>\r
                    }\r
                  </tbody>\r
                </table>\r
              }\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    }\r
  </main>\r
</div>\r
\r
@if (galleryOpen()) {\r
  <div class="gallery-overlay" (click)="onGalleryOverlayClick($event)">\r
    <div class="gallery-modal">\r
      <div class="gallery-modal-header">\r
        <div class="gallery-modal-title-group">\r
          <h2 class="gallery-modal-title">\r
            {{ 'admin.gallery.title' | translate }}\r
          </h2>\r
          @if (galleryProduct(); as product) {\r
            <span class="gallery-product-name">{{ product.name }}</span>\r
          }\r
        </div>\r
        <div class="gallery-header-controls">\r
          <label\r
            class="transparent-toggle"\r
            [attr.title]="'admin.gallery.transparent_hint' | translate"\r
          >\r
            <span class="transparent-label">{{ 'admin.gallery.transparent' | translate }}</span>\r
            <button\r
              class="toggle-switch"\r
              [class.active]="uploadTransparent()"\r
              (click)="toggleTransparent()"\r
              role="switch"\r
              [attr.aria-checked]="uploadTransparent()"\r
            >\r
              <span class="toggle-knob"></span>\r
            </button>\r
          </label>\r
          <button\r
            class="gallery-close-btn"\r
            (click)="closeGallery()"\r
            [attr.aria-label]="'common.close' | translate"\r
          >\r
            <svg\r
              viewBox="0 0 24 24"\r
              fill="none"\r
              stroke="currentColor"\r
              stroke-width="2"\r
              stroke-linecap="round"\r
              stroke-linejoin="round"\r
            >\r
              <line x1="18" y1="6" x2="6" y2="18" />\r
              <line x1="6" y1="6" x2="18" y2="18" />\r
            </svg>\r
          </button>\r
        </div>\r
      </div>\r
\r
      <div class="gallery-modal-body">\r
        @if (galleryLoading()) {\r
          <div class="gallery-loading">\r
            <span class="spinner">\u23F3</span>\r
            <span>{{ 'admin.loading' | translate }}</span>\r
          </div>\r
        } @else {\r
          <div class="gallery-grid">\r
            @for (image of galleryImages(); track image.id) {\r
              <div class="gallery-card" (click)="openImageDetail(image)">\r
                <div class="gallery-card-image-wrapper">\r
                  <img\r
                    [src]="image.objectUrl || image.image_url"\r
                    [alt]="image.alt_text_en"\r
                    class="gallery-card-image"\r
                    loading="lazy"\r
                  />\r
                </div>\r
                <button\r
                  class="gallery-card-delete"\r
                  (click)="requestDeleteImage(image, $event)"\r
                  [attr.aria-label]="'admin.gallery.delete_image' | translate"\r
                  [attr.title]="'admin.gallery.delete_image' | translate"\r
                >\r
                  <svg\r
                    viewBox="0 0 24 24"\r
                    fill="none"\r
                    stroke="currentColor"\r
                    stroke-width="2"\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                  >\r
                    <polyline points="3 6 5 6 21 6" />\r
                    <path\r
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"\r
                    />\r
                    <line x1="10" y1="11" x2="10" y2="17" />\r
                    <line x1="14" y1="11" x2="14" y2="17" />\r
                  </svg>\r
                </button>\r
                <div class="gallery-card-label">\r
                  {{ image.alt_text_en || extractFileName(image.image_url) }}\r
                </div>\r
              </div>\r
            }\r
\r
            <div class="gallery-card gallery-card-add" (click)="triggerFileUpload()">\r
              <div class="gallery-card-add-content">\r
                <svg\r
                  class="gallery-add-icon"\r
                  viewBox="0 0 24 24"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  stroke-width="2"\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                >\r
                  <line x1="12" y1="5" x2="12" y2="19" />\r
                  <line x1="5" y1="12" x2="19" y2="12" />\r
                </svg>\r
                <span class="gallery-add-text">{{ 'admin.gallery.upload' | translate }}</span>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
@if (detailOpen()) {\r
  <div class="detail-overlay" (click)="onDetailOverlayClick($event)">\r
    <div class="detail-modal">\r
      <button\r
        class="gallery-close-btn detail-close-btn"\r
        (click)="closeImageDetail()"\r
        [attr.aria-label]="'common.close' | translate"\r
      >\r
        <svg\r
          viewBox="0 0 24 24"\r
          fill="none"\r
          stroke="currentColor"\r
          stroke-width="2"\r
          stroke-linecap="round"\r
          stroke-linejoin="round"\r
        >\r
          <line x1="18" y1="6" x2="6" y2="18" />\r
          <line x1="6" y1="6" x2="18" y2="18" />\r
        </svg>\r
      </button>\r
\r
      <div class="detail-content">\r
        <div class="detail-image-container">\r
          @if (detailImage(); as img) {\r
            <img\r
              [src]="img.objectUrl || img.image_url"\r
              [alt]="img.alt_text_en"\r
              class="detail-full-image"\r
              (load)="onDetailImageLoad($event)"\r
            />\r
          }\r
        </div>\r
\r
        <div class="detail-info-panel">\r
          <h3 class="detail-info-title">{{ 'admin.gallery.details' | translate }}</h3>\r
\r
          @if (detailMeta(); as meta) {\r
            <div class="detail-meta-list">\r
              <div class="detail-meta-row">\r
                <span class="detail-meta-label">{{\r
                  'admin.gallery.meta.filename' | translate\r
                }}</span>\r
                <span class="detail-meta-value">{{ meta.name }}</span>\r
              </div>\r
              <div class="detail-meta-row">\r
                <span class="detail-meta-label">{{ 'admin.gallery.meta.type' | translate }}</span>\r
                <span class="detail-meta-value">{{ meta.type }}</span>\r
              </div>\r
              <div class="detail-meta-row">\r
                <span class="detail-meta-label">{{\r
                  'admin.gallery.meta.resolution' | translate\r
                }}</span>\r
                <span class="detail-meta-value">{{ meta.resolution }}</span>\r
              </div>\r
              @if (meta.size !== '\u2014') {\r
                <div class="detail-meta-row">\r
                  <span class="detail-meta-label">{{ 'admin.gallery.meta.size' | translate }}</span>\r
                  <span class="detail-meta-value">{{ meta.size }}</span>\r
                </div>\r
              }\r
              @if (meta.lastModified !== '\u2014') {\r
                <div class="detail-meta-row">\r
                  <span class="detail-meta-label">{{\r
                    'admin.gallery.meta.modified' | translate\r
                  }}</span>\r
                  <span class="detail-meta-value">{{ meta.lastModified }}</span>\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          @if (detailImage(); as img) {\r
            <div class="detail-actions">\r
              <button class="detail-download-btn" (click)="downloadImage(img)">\r
                <svg\r
                  viewBox="0 0 24 24"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  stroke-width="2"\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                >\r
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />\r
                  <polyline points="7 10 12 15 17 10" />\r
                  <line x1="12" y1="15" x2="12" y2="3" />\r
                </svg>\r
                {{ 'admin.gallery.download' | translate }}\r
              </button>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
@if (deleteConfirmOpen()) {\r
  <div class="confirm-overlay" (click)="cancelDeleteImage()">\r
    <div class="confirm-dialog" (click)="$event.stopPropagation()">\r
      <div class="confirm-icon-wrapper">\r
        <svg\r
          class="confirm-icon"\r
          viewBox="0 0 24 24"\r
          fill="none"\r
          stroke="currentColor"\r
          stroke-width="2"\r
          stroke-linecap="round"\r
          stroke-linejoin="round"\r
        >\r
          <polyline points="3 6 5 6 21 6" />\r
          <path\r
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"\r
          />\r
        </svg>\r
      </div>\r
      <h3 class="confirm-title">{{ 'admin.gallery.confirm_delete_title' | translate }}</h3>\r
      <p class="confirm-text">{{ 'admin.gallery.confirm_delete_text' | translate }}</p>\r
      <div class="confirm-actions">\r
        <button class="confirm-cancel-btn" (click)="cancelDeleteImage()">\r
          {{ 'common.cancel' | translate }}\r
        </button>\r
        <button class="confirm-delete-btn" (click)="confirmDeleteImage()">\r
          {{ 'admin.gallery.delete_image' | translate }}\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
@if (productFormOpen()) {\r
  <div class="product-form-overlay" (click)="onProductFormOverlayClick($event)">\r
    <div class="product-form-modal">\r
      <div class="product-form-header">\r
        <h2 class="product-form-title">\r
          {{\r
            (productFormIsEdit() ? 'admin.product_form.edit_title' : 'admin.product_form.add_title')\r
              | translate\r
          }}\r
        </h2>\r
        <button class="gallery-close-btn" (click)="closeProductForm()">\r
          <svg\r
            viewBox="0 0 24 24"\r
            fill="none"\r
            stroke="currentColor"\r
            stroke-width="2"\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
          >\r
            <line x1="18" y1="6" x2="6" y2="18" />\r
            <line x1="6" y1="6" x2="18" y2="18" />\r
          </svg>\r
        </button>\r
      </div>\r
\r
      <div class="product-form-tabs">\r
        @for (tab of productFormTabs; track tab.id) {\r
          <button\r
            [class]="'pf-tab' + (productFormTab() === tab.id ? ' pf-tab-active' : '')"\r
            (click)="setProductFormTab(tab.id)"\r
          >\r
            {{ tab.label | translate }}\r
          </button>\r
        }\r
      </div>\r
\r
      <div class="product-form-body">\r
        <!-- \u2500\u2500 BASIC TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\r
        @if (productFormTab() === 'basic') {\r
          <div class="pf-section">\r
            <h3 class="pf-section-title">{{ 'admin.product_form.names' | translate }}</h3>\r
            <div class="pf-grid-3">\r
              <div class="pf-field">\r
                <label class="pf-label">{{ 'admin.product_form.name_hu' | translate }}</label>\r
                <input\r
                  class="pf-input"\r
                  [ngModel]="productFormData().name_hu"\r
                  (ngModelChange)="updateProductField('name_hu', $event)"\r
                />\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">{{ 'admin.product_form.name_en' | translate }}</label>\r
                <input\r
                  class="pf-input"\r
                  [ngModel]="productFormData().name_en"\r
                  (ngModelChange)="updateProductField('name_en', $event)"\r
                />\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">{{ 'admin.product_form.name_de' | translate }}</label>\r
                <input\r
                  class="pf-input"\r
                  [ngModel]="productFormData().name_de"\r
                  (ngModelChange)="updateProductField('name_de', $event)"\r
                />\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="pf-section">\r
            <h3 class="pf-section-title">{{ 'admin.product_form.identification' | translate }}</h3>\r
            <div class="pf-grid-2">\r
              <div class="pf-field">\r
                <label class="pf-label">{{ 'admin.table.brand' | translate }}</label>\r
                <input\r
                  class="pf-input"\r
                  [ngModel]="productFormData().brand"\r
                  (ngModelChange)="updateProductField('brand', $event)"\r
                />\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">{{ 'admin.product_form.manufacturer' | translate }}</label>\r
                <input\r
                  class="pf-input"\r
                  [ngModel]="productFormData().manufacturer"\r
                  (ngModelChange)="updateProductField('manufacturer', $event)"\r
                />\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">SKU</label>\r
                <input\r
                  class="pf-input"\r
                  [ngModel]="productFormData().sku"\r
                  (ngModelChange)="updateProductField('sku', $event)"\r
                />\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">{{ 'admin.table.category' | translate }}</label>\r
                <select\r
                  class="pf-select"\r
                  [ngModel]="productFormData().category_id"\r
                  (ngModelChange)="updateProductField('category_id', $event)"\r
                >\r
                  <option value="">\u2014</option>\r
                  @for (cat of availableCategories(); track cat.id) {\r
                    <option [value]="cat.id">{{ cat.icon }} {{ cat.name_en }}</option>\r
                  }\r
                </select>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="pf-section">\r
            <div class="pf-field">\r
              <label class="pf-label">{{ 'admin.product_form.thumbnail_url' | translate }}</label>\r
              <input\r
                class="pf-input"\r
                [ngModel]="productFormData().thumbnail_url"\r
                (ngModelChange)="updateProductField('thumbnail_url', $event)"\r
                placeholder="assets/products/1/1.webp"\r
              />\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- \u2500\u2500 PRICING TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\r
        @if (productFormTab() === 'pricing') {\r
          <div class="pf-section">\r
            <div class="pf-grid-3">\r
              <div class="pf-field">\r
                <label class="pf-label">{{ 'admin.product_form.price_huf' | translate }}</label>\r
                <input\r
                  class="pf-input"\r
                  type="number"\r
                  min="0"\r
                  [ngModel]="productFormData().price_huf"\r
                  (ngModelChange)="updateProductField('price_huf', +$event)"\r
                />\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">{{ 'admin.product_form.sale_pct' | translate }}</label>\r
                <input\r
                  class="pf-input"\r
                  type="number"\r
                  min="0"\r
                  max="100"\r
                  [ngModel]="productFormData().sale_percentage"\r
                  (ngModelChange)="updateProductField('sale_percentage', +$event)"\r
                />\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">{{ 'admin.table.stock' | translate }}</label>\r
                <input\r
                  class="pf-input"\r
                  type="number"\r
                  min="0"\r
                  [ngModel]="productFormData().stock"\r
                  (ngModelChange)="updateProductField('stock', +$event)"\r
                />\r
              </div>\r
            </div>\r
          </div>\r
\r
          @if (productFormData().price_huf > 0 && productFormData().sale_percentage > 0) {\r
            <div class="pf-price-preview">\r
              <span class="pf-price-original">{{\r
                formatRevenue(productFormData().price_huf)\r
              }}</span>\r
              <span class="pf-price-arrow">\u2192</span>\r
              <span class="pf-price-discounted">{{\r
                formatRevenue(\r
                  productFormData().price_huf * (1 - productFormData().sale_percentage / 100)\r
                )\r
              }}</span>\r
              <span class="pf-price-badge">-{{ productFormData().sale_percentage }}%</span>\r
            </div>\r
          }\r
        }\r
\r
        <!-- \u2500\u2500 DESCRIPTIONS TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\r
        @if (productFormTab() === 'descriptions') {\r
          <div class="pf-section">\r
            <h3 class="pf-section-title">{{ 'admin.product_form.previews' | translate }}</h3>\r
            <div class="pf-grid-3">\r
              <div class="pf-field">\r
                <label class="pf-label">HU</label>\r
                <textarea\r
                  class="pf-textarea pf-textarea-sm"\r
                  [ngModel]="productFormData().description_preview_hu"\r
                  (ngModelChange)="updateProductField('description_preview_hu', $event)"\r
                ></textarea>\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">EN</label>\r
                <textarea\r
                  class="pf-textarea pf-textarea-sm"\r
                  [ngModel]="productFormData().description_preview_en"\r
                  (ngModelChange)="updateProductField('description_preview_en', $event)"\r
                ></textarea>\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">DE</label>\r
                <textarea\r
                  class="pf-textarea pf-textarea-sm"\r
                  [ngModel]="productFormData().description_preview_de"\r
                  (ngModelChange)="updateProductField('description_preview_de', $event)"\r
                ></textarea>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="pf-section">\r
            <h3 class="pf-section-title">\r
              {{ 'admin.product_form.full_descriptions' | translate }}\r
            </h3>\r
            <div class="pf-stack">\r
              <div class="pf-field">\r
                <label class="pf-label">HU</label>\r
                <textarea\r
                  class="pf-textarea"\r
                  rows="4"\r
                  [ngModel]="productFormData().description_hu"\r
                  (ngModelChange)="updateProductField('description_hu', $event)"\r
                ></textarea>\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">EN</label>\r
                <textarea\r
                  class="pf-textarea"\r
                  rows="4"\r
                  [ngModel]="productFormData().description_en"\r
                  (ngModelChange)="updateProductField('description_en', $event)"\r
                ></textarea>\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">DE</label>\r
                <textarea\r
                  class="pf-textarea"\r
                  rows="4"\r
                  [ngModel]="productFormData().description_de"\r
                  (ngModelChange)="updateProductField('description_de', $event)"\r
                ></textarea>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- \u2500\u2500 DETAILS TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\r
        @if (productFormTab() === 'details') {\r
          <div class="pf-section">\r
            <div class="pf-field">\r
              <label class="pf-label">{{\r
                'admin.product_form.active_ingredients' | translate\r
              }}</label>\r
              <textarea\r
                class="pf-textarea"\r
                rows="3"\r
                [ngModel]="productFormData().active_ingredients"\r
                (ngModelChange)="updateProductField('active_ingredients', $event)"\r
              ></textarea>\r
            </div>\r
          </div>\r
\r
          <div class="pf-section">\r
            <h3 class="pf-section-title">{{ 'admin.product_form.packaging' | translate }}</h3>\r
            <div class="pf-grid-3">\r
              <div class="pf-field">\r
                <label class="pf-label">HU</label>\r
                <input\r
                  class="pf-input"\r
                  [ngModel]="productFormData().packaging_hu"\r
                  (ngModelChange)="updateProductField('packaging_hu', $event)"\r
                />\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">EN</label>\r
                <input\r
                  class="pf-input"\r
                  [ngModel]="productFormData().packaging_en"\r
                  (ngModelChange)="updateProductField('packaging_en', $event)"\r
                />\r
              </div>\r
              <div class="pf-field">\r
                <label class="pf-label">DE</label>\r
                <input\r
                  class="pf-input"\r
                  [ngModel]="productFormData().packaging_de"\r
                  (ngModelChange)="updateProductField('packaging_de', $event)"\r
                />\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="pf-section">\r
            <label class="transparent-toggle">\r
              <span class="transparent-label">{{ 'admin.product_form.featured' | translate }}</span>\r
              <button\r
                class="toggle-switch"\r
                [class.active]="productFormData().featured"\r
                (click)="toggleProductFeatured()"\r
                role="switch"\r
                [attr.aria-checked]="productFormData().featured"\r
              >\r
                <span class="toggle-knob"></span>\r
              </button>\r
            </label>\r
          </div>\r
        }\r
      </div>\r
\r
      <div class="product-form-footer">\r
        <button\r
          class="confirm-cancel-btn"\r
          (click)="closeProductForm()"\r
          [disabled]="productFormSaving()"\r
        >\r
          {{ 'common.cancel' | translate }}\r
        </button>\r
        <button class="confirm-action-btn" (click)="saveProduct()" [disabled]="productFormSaving()">\r
          @if (productFormSaving()) {\r
            <span class="spinner-small">\u23F3</span>\r
          } @else {\r
            {{\r
              (productFormIsEdit() ? 'admin.product_form.save' : 'admin.product_form.create')\r
                | translate\r
            }}\r
          }\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
@if (productDeleteConfirm(); as product) {\r
  <div class="confirm-overlay" (click)="cancelDeleteProduct()">\r
    <div class="confirm-dialog" (click)="$event.stopPropagation()">\r
      <div class="confirm-icon-wrapper confirm-icon-danger">\r
        <svg\r
          class="confirm-icon"\r
          viewBox="0 0 24 24"\r
          fill="none"\r
          stroke="currentColor"\r
          stroke-width="2"\r
          stroke-linecap="round"\r
          stroke-linejoin="round"\r
        >\r
          <polyline points="3 6 5 6 21 6" />\r
          <path\r
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"\r
          />\r
        </svg>\r
      </div>\r
      <h3 class="confirm-title">{{ 'admin.product_form.confirm_delete_title' | translate }}</h3>\r
      <p class="confirm-text">\r
        {{ 'admin.product_form.confirm_delete_text' | translate: { name: product.name } }}\r
      </p>\r
      <div class="confirm-actions">\r
        <button\r
          class="confirm-cancel-btn"\r
          (click)="cancelDeleteProduct()"\r
          [disabled]="productDeleteLoading()"\r
        >\r
          {{ 'common.cancel' | translate }}\r
        </button>\r
        <button\r
          class="confirm-delete-btn"\r
          (click)="confirmDeleteProduct()"\r
          [disabled]="productDeleteLoading()"\r
        >\r
          @if (productDeleteLoading()) {\r
            <span class="spinner-small">\u23F3</span>\r
          } @else {\r
            {{ 'admin.product_form.delete' | translate }}\r
          }\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
@if (userActionConfirm(); as req) {\r
  <div class="confirm-overlay" (click)="cancelUserAction()">\r
    <div class="confirm-dialog" (click)="$event.stopPropagation()">\r
      <div\r
        class="confirm-icon-wrapper"\r
        [class.confirm-icon-danger]="req.action === 'delete' || req.action === 'ban'"\r
        [class.confirm-icon-primary]="req.action === 'change_role' || req.action === 'unban'"\r
      >\r
        @if (req.action === 'delete') {\r
          <svg\r
            class="confirm-icon"\r
            viewBox="0 0 24 24"\r
            fill="none"\r
            stroke="currentColor"\r
            stroke-width="2"\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
          >\r
            <polyline points="3 6 5 6 21 6" />\r
            <path\r
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"\r
            />\r
          </svg>\r
        } @else if (req.action === 'ban') {\r
          <svg\r
            class="confirm-icon"\r
            viewBox="0 0 24 24"\r
            fill="none"\r
            stroke="currentColor"\r
            stroke-width="2"\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
          >\r
            <circle cx="12" cy="12" r="10" />\r
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />\r
          </svg>\r
        } @else {\r
          <svg\r
            class="confirm-icon"\r
            viewBox="0 0 24 24"\r
            fill="none"\r
            stroke="currentColor"\r
            stroke-width="2"\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
          >\r
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />\r
            <circle cx="8.5" cy="7" r="4" />\r
            <polyline points="17 11 19 13 23 9" />\r
          </svg>\r
        }\r
      </div>\r
      <h3 class="confirm-title">{{ getUserActionTitle() | translate }}</h3>\r
      <p class="confirm-text">\r
        {{\r
          getUserActionText()\r
            | translate: { name: getUserFullName(req.user), state: req.newState || '' }\r
        }}\r
      </p>\r
      @if (req.newState) {\r
        <div class="confirm-state-preview">\r
          <span [class]="'role-badge ' + getAccountStateClass(req.user.account_state)">{{\r
            req.user.account_state\r
          }}</span>\r
          <span class="state-arrow">\u2192</span>\r
          <span [class]="'role-badge ' + getAccountStateClass(req.newState)">{{\r
            req.newState\r
          }}</span>\r
        </div>\r
      }\r
      <div class="confirm-actions">\r
        <button\r
          class="confirm-cancel-btn"\r
          (click)="cancelUserAction()"\r
          [disabled]="userActionLoading()"\r
        >\r
          {{ 'common.cancel' | translate }}\r
        </button>\r
        <button\r
          [class]="getUserActionBtnClass()"\r
          (click)="confirmUserAction()"\r
          [disabled]="userActionLoading()"\r
        >\r
          @if (userActionLoading()) {\r
            <span class="spinner-small">\u23F3</span>\r
          } @else {\r
            {{ getUserActionTitle() | translate }}\r
          }\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
`, styles: ['/* src/app/pages/admin/admin.css */\n.admin-page {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-secondary);\n}\n.admin-sidebar {\n  width: 240px;\n  background: var(--bg-primary);\n  border-right: 1px solid var(--border-color);\n  display: flex;\n  flex-direction: column;\n  position: sticky;\n  top: 0;\n  height: 100vh;\n  overflow-y: auto;\n  transition: width 0.25s ease;\n  flex-shrink: 0;\n  z-index: 10;\n}\n.admin-sidebar.collapsed {\n  width: 64px;\n}\n.sidebar-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-4) var(--space-3);\n  border-bottom: 1px solid var(--border-color);\n  min-height: 64px;\n}\n.sidebar-logo {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  overflow: hidden;\n}\n.logo-icon {\n  width: 26px;\n  height: 26px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n}\n.logo-text {\n  font-weight: 700;\n  font-size: var(--text-base, 1rem);\n  color: var(--color-primary);\n  white-space: nowrap;\n}\n.sidebar-toggle {\n  background: transparent;\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-sm, 0.375rem);\n  cursor: pointer;\n  padding: var(--space-1) var(--space-2);\n  color: var(--text-secondary);\n  font-size: 12px;\n  transition: all 0.15s;\n  flex-shrink: 0;\n}\n.sidebar-toggle:hover {\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n}\n.sidebar-nav {\n  flex: 1;\n  padding: var(--space-3) var(--space-2);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n}\n.nav-item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  background: transparent;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.15s;\n  text-align: left;\n  width: 100%;\n  white-space: nowrap;\n  overflow: hidden;\n  min-height: 44px;\n}\n.nav-item:hover {\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n}\n.nav-item.active {\n  background: var(--color-primary);\n  color: white;\n}\n.nav-icon {\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  flex-shrink: 0;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  transition: filter 0.15s;\n}\n.nav-item.active .nav-icon {\n  filter: brightness(0) saturate(100%) invert(1);\n}\n.nav-label {\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 500;\n}\n.sidebar-footer {\n  padding: var(--space-3) var(--space-2);\n  border-top: 1px solid var(--border-color);\n}\n.logout-btn {\n  color: var(--color-error) !important;\n}\n.logout-btn:hover {\n  background: var(--color-error-light) !important;\n}\n.logout-btn .nav-icon {\n  filter: brightness(0) saturate(100%) invert(20%) sepia(80%) saturate(6000%) hue-rotate(355deg);\n}\n.admin-main {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n.admin-topbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 var(--space-6);\n  height: 64px;\n  background: var(--bg-primary);\n  border-bottom: 1px solid var(--border-color);\n  position: sticky;\n  top: 0;\n  z-index: 9;\n  gap: var(--space-4);\n}\n.topbar-left {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.topbar-right {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.mobile-menu-btn {\n  display: none;\n  background: transparent;\n  border: none;\n  font-size: 22px;\n  cursor: pointer;\n  color: var(--text-primary);\n  padding: var(--space-2);\n  border-radius: var(--radius-md, 0.5rem);\n}\n.page-heading {\n  font-size: var(--text-xl, 1.25rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.admin-badge {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding: 3px var(--space-2);\n  background: rgba(6, 122, 69, 0.12);\n  color: var(--color-primary);\n  border-radius: var(--radius-full, 9999px);\n  border: 1px solid rgba(6, 122, 69, 0.2);\n}\n.admin-name {\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.section-content {\n  padding: var(--space-6);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-6);\n}\n.dashboard-greeting h2 {\n  font-size: clamp(1.2rem, 2.5vw, 1.5rem);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: var(--space-4);\n}\n.stat-card {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  padding: var(--space-5);\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  border: 1px solid var(--border-color);\n  transition: all 0.2s;\n}\n.stat-card:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-md);\n}\n.stat-icon {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-icon-img {\n  width: 40px;\n  height: 40px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n}\n.stat-card.primary .stat-icon-img {\n  filter: brightness(0) saturate(100%) invert(28%) sepia(90%) saturate(700%) hue-rotate(120deg);\n}\n.stat-card.success .stat-icon-img {\n  filter: brightness(0) saturate(100%) invert(60%) sepia(50%) saturate(500%) hue-rotate(120deg);\n}\n.stat-card.info .stat-icon-img {\n  filter: brightness(0) saturate(100%) invert(40%) sepia(80%) saturate(500%) hue-rotate(200deg);\n}\n.stat-card.warning .stat-icon-img {\n  filter: brightness(0) saturate(100%) invert(75%) sepia(60%) saturate(800%) hue-rotate(10deg);\n}\n.stat-body {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.stat-value {\n  font-size: clamp(1.1rem, 2vw, 1.5rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.stat-label {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.stat-change {\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.stat-change.positive {\n  color: var(--color-primary);\n}\n.stat-change.negative {\n  color: var(--color-error);\n}\n.stat-change.neutral {\n  color: var(--color-warning);\n}\n.stat-card.primary {\n  border-top: 3px solid var(--color-primary);\n}\n.stat-card.success {\n  border-top: 3px solid var(--color-success);\n}\n.stat-card.info {\n  border-top: 3px solid var(--color-info);\n}\n.stat-card.warning {\n  border-top: 3px solid #f59e0b;\n}\n.admin-card {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  overflow: hidden;\n}\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--space-5) var(--space-6);\n  border-bottom: 1px solid var(--border-color);\n}\n.card-title {\n  font-size: var(--text-lg, 1.1rem);\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.view-all-btn {\n  background: transparent;\n  border: none;\n  color: var(--color-primary);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: opacity 0.15s;\n}\n.view-all-btn:hover {\n  opacity: 0.7;\n}\n.table-wrapper {\n  overflow-x: auto;\n}\n.admin-table {\n  table-layout: auto;\n  width: max-content;\n  min-width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: var(--text-sm, 0.9rem);\n}\n.admin-table th {\n  text-align: left;\n  padding: var(--space-3) var(--space-4);\n  background: var(--bg-secondary);\n  color: var(--text-secondary);\n  font-weight: 600;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  white-space: nowrap;\n  position: relative;\n  border-bottom: 1px solid var(--border-color);\n  -webkit-user-select: none;\n  user-select: none;\n  cursor: col-resize;\n}\n.admin-table th::after {\n  content: "";\n  position: absolute;\n  top: 20%;\n  right: 0;\n  width: 2px;\n  height: 60%;\n  background: var(--border-color);\n  border-radius: 2px;\n  pointer-events: none;\n  transition: background 0.15s, width 0.1s;\n}\n.admin-table th:hover::after {\n  background: var(--color-primary);\n  width: 3px;\n}\n.admin-table th.is-resizing::after {\n  background: var(--color-primary);\n  width: 3px;\n}\n.admin-table td {\n  padding: var(--space-3) var(--space-4);\n  border-bottom: 1px solid var(--border-color);\n  color: var(--text-primary);\n  vertical-align: middle;\n  white-space: nowrap;\n}\n.admin-table tr:last-child td {\n  border-bottom: none;\n}\n.admin-table tr:hover td {\n  background: var(--bg-secondary);\n}\n.order-id {\n  font-family: "Inconsolata", monospace;\n  font-weight: 600;\n}\n.muted {\n  color: var(--text-secondary) !important;\n}\n.font-bold {\n  font-weight: 600;\n}\n.status-badge {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  border-radius: var(--radius-full, 9999px);\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  white-space: nowrap;\n}\n.status-pending {\n  background: rgba(245, 158, 11, 0.12);\n  color: var(--color-warning-hover);\n  border: 1px solid rgba(245, 158, 11, 0.3);\n}\n.status-processing {\n  background: rgba(59, 130, 246, 0.12);\n  color: var(--color-info);\n  border: 1px solid rgba(59, 130, 246, 0.3);\n}\n.status-shipped {\n  background: rgba(139, 92, 246, 0.12);\n  color: #7c3aed;\n  border: 1px solid rgba(139, 92, 246, 0.3);\n}\n.status-delivered {\n  background: rgba(6, 122, 69, 0.12);\n  color: var(--color-success);\n  border: 1px solid rgba(6, 122, 69, 0.3);\n}\n.status-cancelled {\n  background: rgba(220, 38, 38, 0.12);\n  color: var(--color-error);\n  border: 1px solid rgba(220, 38, 38, 0.3);\n}\n.role-badge {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  border-radius: var(--radius-full, 9999px);\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.role-admin {\n  background: var(--color-error-light);\n  color: var(--color-error);\n  border: 1px solid rgba(220, 38, 38, 0.3);\n}\n.role-pharmacist {\n  background: var(--color-success-light);\n  color: var(--color-success);\n  border: 1px solid rgba(6, 122, 69, 0.3);\n}\n.role-user {\n  background: rgba(234, 179, 8, 0.1);\n  color: var(--color-warning-hover);\n  border: 1px solid rgba(234, 179, 8, 0.3);\n}\n.role-banned {\n  background: rgba(234, 88, 12, 0.12);\n  color: var(--color-warning-hover);\n  border: 1px solid rgba(234, 88, 12, 0.25);\n  text-decoration: line-through;\n}\n.role-deleted {\n  background: rgba(100, 116, 139, 0.12);\n  color: #64748b;\n  border: 1px solid rgba(100, 116, 139, 0.25);\n  text-decoration: line-through;\n}\n.stock-ok {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.stock-low {\n  color: var(--color-error);\n  font-weight: 700;\n}\n.action-btn {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: var(--space-1) var(--space-2);\n  border-radius: var(--radius-sm, 0.375rem);\n  font-size: 16px;\n  transition: background 0.15s;\n}\n.action-btn:hover {\n  background: var(--bg-secondary);\n}\n.user-cell {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.user-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: var(--color-primary);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 14px;\n  flex-shrink: 0;\n}\n.product-cell {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n}\n.product-thumb {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--radius-md, 0.5rem);\n  background: var(--bg-secondary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  border: 1px solid var(--border-color);\n  padding: 4px;\n}\n.product-thumb-img {\n  width: 22px;\n  height: 22px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n}\n.section-toolbar {\n  display: flex;\n  gap: var(--space-3);\n  align-items: center;\n  flex-wrap: wrap;\n}\n.search-input-wrapper {\n  position: relative;\n  flex: 1;\n  min-width: 200px;\n}\n.search-icon-small {\n  position: absolute;\n  left: var(--space-3);\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n  width: 16px;\n  height: 16px;\n  object-fit: contain;\n  filter: var(--icon-filter, brightness(0) saturate(100%));\n  opacity: 0.6;\n}\n.admin-search {\n  width: 100%;\n  padding: var(--space-2) var(--space-10) var(--space-2) var(--space-8);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.9rem);\n  min-height: 40px;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.admin-search::-webkit-search-cancel-button,\n.admin-search::-webkit-search-decoration {\n  -webkit-appearance: none;\n  appearance: none;\n  display: none;\n}\n.admin-search:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.admin-select {\n  padding: var(--space-2) var(--space-4);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.9rem);\n  min-height: 40px;\n  cursor: pointer;\n}\n.retry-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-4);\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  min-height: 44px;\n  white-space: nowrap;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    transform 0.1s;\n}\n.retry-btn:hover:not(:disabled) {\n  background: var(--bg-tertiary);\n  border-color: var(--border-color-hover);\n}\n.retry-btn:active:not(:disabled) {\n  transform: scale(0.97);\n}\n.retry-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.sidebar-overlay {\n  display: none;\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: var(--z-dropdown);\n  cursor: pointer;\n}\n.loading-state,\n.error-state,\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-3);\n  padding: var(--space-10) var(--space-6);\n  color: var(--text-secondary);\n  font-size: var(--text-sm, 0.9rem);\n  text-align: center;\n}\n.loading-state .spinner {\n  font-size: 1.5rem;\n  animation: spinEmoji 1s linear infinite;\n}\n@keyframes spinEmoji {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-state {\n  color: var(--color-error);\n}\n.error-state span {\n  font-weight: 500;\n}\n.loading-pulse {\n  opacity: 0.4;\n  animation: pulse 1.5s ease-in-out infinite;\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 0.4;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n.warning-text {\n  color: var(--color-warning-hover);\n}\n.add-btn {\n  padding: var(--space-2) var(--space-4);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  min-height: 40px;\n  white-space: nowrap;\n  transition: background 0.15s, transform 0.15s;\n}\n.add-btn:hover {\n  background: var(--color-primary-dark);\n  transform: translateY(-1px);\n}\n@media (max-width: 1024px) {\n  .stats-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .sidebar-overlay.active {\n    display: block;\n  }\n  .admin-sidebar {\n    position: fixed;\n    left: 0;\n    top: 0;\n    height: 100vh;\n    z-index: var(--z-dropdown);\n    transform: translateX(-100%);\n    transition: transform 0.25s ease, width 0.25s ease;\n    box-shadow: var(--shadow-xl);\n  }\n  .admin-sidebar.collapsed {\n    width: 240px;\n    transform: translateX(0);\n  }\n  .mobile-menu-btn {\n    display: flex;\n  }\n  .sidebar-toggle {\n    display: none;\n  }\n  .admin-topbar {\n    padding: 0 var(--space-4);\n  }\n  .section-content {\n    padding: var(--space-4);\n    gap: var(--space-4);\n  }\n  .stats-grid {\n    grid-template-columns: 1fr 1fr;\n    gap: var(--space-3);\n  }\n  .stat-icon-img {\n    width: 32px;\n    height: 32px;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid {\n    grid-template-columns: 1fr;\n  }\n  .section-toolbar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .search-input-wrapper {\n    min-width: unset;\n  }\n  .admin-topbar {\n    padding: 0 var(--space-3);\n  }\n  .page-heading {\n    font-size: var(--text-base, 1rem);\n  }\n  .admin-name {\n    display: none;\n  }\n}\n[data-theme=dark] .admin-table tr:hover td {\n  background: var(--bg-tertiary);\n}\n[data-theme=dark] .admin-table th {\n  background: var(--bg-tertiary);\n}\n@media (prefers-reduced-motion: reduce) {\n  .admin-sidebar,\n  .stat-card,\n  .nav-item,\n  .add-btn {\n    transition: none;\n  }\n}\n.images-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 10px;\n  background: rgba(6, 122, 69, 0.08);\n  border: 1px solid rgba(6, 122, 69, 0.2);\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  color: var(--color-primary);\n  transition: all 0.15s;\n  white-space: nowrap;\n}\n.images-btn:hover {\n  background: rgba(6, 122, 69, 0.16);\n  border-color: rgba(6, 122, 69, 0.4);\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(6, 122, 69, 0.15);\n}\n.images-btn:active {\n  transform: translateY(0);\n}\n.images-icon {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n}\n.images-count {\n  font-size: 0.75rem;\n  font-weight: 700;\n  min-width: 18px;\n  height: 18px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-primary);\n  color: white;\n  border-radius: var(--radius-full, 9999px);\n  line-height: 1;\n}\n.gallery-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop, 1040);\n  background: rgba(6, 60, 35, 0.55);\n  backdrop-filter: blur(6px);\n  -webkit-backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6);\n  animation: overlayFadeIn 0.2s ease;\n}\n@keyframes overlayFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.gallery-modal {\n  position: relative;\n  width: 100%;\n  max-width: 820px;\n  max-height: 85vh;\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--color-success-light);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  animation: modalSlideIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes modalSlideIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95) translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n.gallery-modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-5) var(--space-6);\n  border-bottom: 1px solid var(--border-color);\n  gap: var(--space-4);\n  flex-shrink: 0;\n}\n.gallery-modal-title-group {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.gallery-modal-title {\n  font-size: var(--text-lg, 1.1rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.gallery-product-name {\n  font-size: var(--text-sm, 0.85rem);\n  color: var(--text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gallery-close-btn {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  color: var(--text-secondary);\n  flex-shrink: 0;\n  transition: all 0.15s;\n}\n.gallery-close-btn:hover {\n  background: var(--bg-tertiary);\n  color: var(--text-primary);\n  border-color: var(--border-color-hover);\n}\n.gallery-close-btn svg {\n  width: 18px;\n  height: 18px;\n}\n.gallery-modal-body {\n  padding: var(--space-5) var(--space-6);\n  overflow-y: auto;\n  flex: 1;\n}\n.gallery-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-3);\n  padding: var(--space-12) var(--space-6);\n  color: var(--text-secondary);\n  font-size: var(--text-sm, 0.9rem);\n}\n.gallery-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: var(--space-4);\n}\n.gallery-card {\n  position: relative;\n  border-radius: var(--radius-lg, 0.75rem);\n  border: 1px solid var(--border-color);\n  background: var(--bg-secondary);\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.2s;\n  aspect-ratio: 1;\n  display: flex;\n  flex-direction: column;\n}\n.gallery-card:hover {\n  border-color: var(--color-primary);\n  box-shadow: 0 4px 16px rgba(6, 122, 69, 0.12), 0 0 0 1px rgba(6, 122, 69, 0.08);\n  transform: translateY(-2px);\n}\n.gallery-card-image-wrapper {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  padding: var(--space-2);\n  background: var(--bg-tertiary, var(--bg-secondary));\n}\n.gallery-card-image {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n  border-radius: var(--radius-sm, 0.375rem);\n}\n.gallery-card-label {\n  padding: 6px var(--space-3);\n  font-size: 0.7rem;\n  color: var(--text-secondary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  border-top: 1px solid var(--border-color);\n  background: var(--bg-primary);\n}\n.gallery-card-delete {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(220, 38, 38, 0.9);\n  color: white;\n  border: none;\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  opacity: 0;\n  transform: scale(0.85);\n  transition: all 0.15s;\n  z-index: 2;\n}\n.gallery-card-delete svg {\n  width: 14px;\n  height: 14px;\n}\n.gallery-card:hover .gallery-card-delete {\n  opacity: 1;\n  transform: scale(1);\n}\n.gallery-card-delete:hover {\n  background: var(--color-error);\n  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);\n}\n.gallery-card-add {\n  border-style: dashed;\n  border-width: 2px;\n  border-color: var(--border-color);\n  background: transparent;\n}\n.gallery-card-add:hover {\n  border-color: var(--color-primary);\n  background: rgba(6, 122, 69, 0.04);\n}\n.gallery-card-add-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  padding: var(--space-4);\n}\n.gallery-add-icon {\n  width: 32px;\n  height: 32px;\n  color: var(--color-primary);\n  opacity: 0.6;\n  transition: opacity 0.15s;\n}\n.gallery-card-add:hover .gallery-add-icon {\n  opacity: 1;\n}\n.gallery-add-text {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--color-primary);\n  opacity: 0.7;\n  transition: opacity 0.15s;\n}\n.gallery-card-add:hover .gallery-add-text {\n  opacity: 1;\n}\n.row-actions {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n.row-action-btn {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  color: var(--text-secondary);\n  transition: all 0.15s;\n  padding: 0;\n}\n.row-action-btn svg {\n  width: 15px;\n  height: 15px;\n}\n.row-action-btn.edit-btn:hover {\n  background: rgba(6, 122, 69, 0.08);\n  border-color: rgba(6, 122, 69, 0.2);\n  color: var(--color-primary);\n}\n.row-action-btn.delete-btn:hover {\n  background: var(--color-error-light);\n  border-color: rgba(220, 38, 38, 0.2);\n  color: var(--color-error);\n}\n.product-form-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop, 1040);\n  background: rgba(6, 60, 35, 0.55);\n  backdrop-filter: blur(6px);\n  -webkit-backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-4);\n  animation: overlayFadeIn 0.2s ease;\n}\n.product-form-modal {\n  position: relative;\n  width: 100%;\n  max-width: 780px;\n  max-height: 90vh;\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--color-success-light);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  animation: modalSlideIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.product-form-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: var(--space-5) var(--space-6);\n  border-bottom: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n.product-form-title {\n  font-size: var(--text-lg, 1.1rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.product-form-tabs {\n  display: flex;\n  border-bottom: 1px solid var(--border-color);\n  padding: 0 var(--space-6);\n  gap: 0;\n  flex-shrink: 0;\n  overflow-x: auto;\n}\n.pf-tab {\n  padding: var(--space-3) var(--space-4);\n  background: transparent;\n  border: none;\n  border-bottom: 2px solid transparent;\n  color: var(--text-secondary);\n  font-size: var(--text-sm, 0.85rem);\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.15s;\n}\n.pf-tab:hover {\n  color: var(--text-primary);\n}\n.pf-tab-active {\n  color: var(--color-primary);\n  border-bottom-color: var(--color-primary);\n}\n.product-form-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--space-5) var(--space-6);\n}\n.pf-section {\n  margin-bottom: var(--space-5);\n}\n.pf-section-title {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--text-secondary);\n  margin-bottom: var(--space-3);\n}\n.pf-grid-3 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-3);\n}\n.pf-grid-2 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: var(--space-3);\n}\n.pf-stack {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n.pf-field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.pf-label {\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  color: var(--text-secondary);\n}\n.pf-input {\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md, 0.5rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.85rem);\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.pf-input:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.pf-select {\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md, 0.5rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.85rem);\n  cursor: pointer;\n}\n.pf-select:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.pf-textarea {\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-md, 0.5rem);\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.85rem);\n  font-family: inherit;\n  resize: vertical;\n  min-height: 80px;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.pf-textarea-sm {\n  min-height: 50px;\n}\n.pf-textarea:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px var(--color-success-light);\n}\n.pf-price-preview {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: var(--bg-secondary);\n  border-radius: var(--radius-md, 0.5rem);\n  border: 1px solid var(--border-color);\n}\n.pf-price-original {\n  font-size: var(--text-sm, 0.85rem);\n  color: var(--text-secondary);\n  text-decoration: line-through;\n}\n.pf-price-arrow {\n  color: var(--text-secondary);\n}\n.pf-price-discounted {\n  font-size: var(--text-base, 1rem);\n  font-weight: 700;\n  color: var(--color-primary);\n}\n.pf-price-badge {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 2px var(--space-2);\n  background: var(--color-error-light);\n  color: var(--color-error);\n  border-radius: var(--radius-full, 9999px);\n}\n.product-form-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: var(--space-3);\n  padding: var(--space-4) var(--space-6);\n  border-top: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n@media (max-width: 768px) {\n  .product-form-modal {\n    max-height: 95vh;\n  }\n  .product-form-header {\n    padding: var(--space-4);\n  }\n  .product-form-body {\n    padding: var(--space-4);\n  }\n  .product-form-tabs {\n    padding: 0 var(--space-4);\n  }\n  .product-form-footer {\n    padding: var(--space-3) var(--space-4);\n  }\n  .pf-grid-3 {\n    grid-template-columns: 1fr;\n  }\n  .pf-grid-2 {\n    grid-template-columns: 1fr;\n  }\n}\n.detail-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal, 1050);\n  background: rgba(6, 60, 35, 0.65);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6);\n  animation: overlayFadeIn 0.2s ease;\n}\n.detail-modal {\n  position: relative;\n  width: 100%;\n  max-width: 960px;\n  max-height: 90vh;\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--color-success-light);\n  overflow: hidden;\n  animation: modalSlideIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n  display: flex;\n  flex-direction: column;\n}\n.detail-close-btn {\n  position: absolute;\n  top: var(--space-3);\n  right: var(--space-3);\n  z-index: 5;\n}\n.detail-content {\n  display: flex;\n  gap: 0;\n  flex: 1;\n  overflow: hidden;\n}\n.detail-image-container {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6);\n  background: var(--bg-secondary);\n  min-height: 300px;\n  overflow: auto;\n}\n.detail-full-image {\n  max-width: 100%;\n  max-height: 70vh;\n  object-fit: contain;\n  border-radius: var(--radius-sm, 0.375rem);\n}\n.detail-info-panel {\n  width: 280px;\n  flex-shrink: 0;\n  padding: var(--space-6);\n  border-left: 1px solid var(--border-color);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5);\n  overflow-y: auto;\n}\n.detail-info-title {\n  font-size: var(--text-base, 1rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.detail-meta-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n.detail-meta-row {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.detail-meta-label {\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--text-secondary);\n}\n.detail-meta-value {\n  font-size: var(--text-sm, 0.85rem);\n  color: var(--text-primary);\n  word-break: break-all;\n}\n.detail-actions {\n  margin-top: auto;\n  padding-top: var(--space-4);\n  border-top: 1px solid var(--border-color);\n}\n.detail-download-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-3) var(--space-5);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  width: 100%;\n  justify-content: center;\n  transition: all 0.15s;\n}\n.detail-download-btn:hover {\n  background: var(--color-primary-dark, #0b5f39);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(6, 122, 69, 0.3);\n}\n.detail-download-btn:active {\n  transform: translateY(0);\n}\n.detail-download-btn svg {\n  width: 18px;\n  height: 18px;\n}\n.confirm-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: calc(var(--z-modal, 1050) + 10);\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(3px);\n  -webkit-backdrop-filter: blur(3px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--space-6);\n  animation: overlayFadeIn 0.15s ease;\n}\n.confirm-dialog {\n  background: var(--bg-primary);\n  border-radius: var(--radius-xl, 1rem);\n  border: 1px solid var(--border-color);\n  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.35);\n  padding: var(--space-8) var(--space-6) var(--space-6);\n  max-width: 380px;\n  width: 100%;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-3);\n  animation: modalSlideIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.confirm-icon-wrapper {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--color-error-light);\n  border-radius: var(--radius-full, 9999px);\n  margin-bottom: var(--space-1);\n}\n.confirm-icon {\n  width: 24px;\n  height: 24px;\n  color: var(--color-error);\n}\n.confirm-title {\n  font-size: var(--text-base, 1rem);\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.confirm-text {\n  font-size: var(--text-sm, 0.85rem);\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.5;\n}\n.confirm-actions {\n  display: flex;\n  gap: var(--space-3);\n  width: 100%;\n  margin-top: var(--space-3);\n}\n.confirm-cancel-btn {\n  flex: 1;\n  padding: var(--space-3) var(--space-4);\n  background: var(--bg-secondary);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.confirm-cancel-btn:hover {\n  background: var(--bg-tertiary);\n  border-color: var(--border-color-hover);\n}\n.confirm-delete-btn {\n  flex: 1;\n  padding: var(--space-3) var(--space-4);\n  background: var(--color-error);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.confirm-delete-btn:hover {\n  background: var(--color-error-hover);\n  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n}\n@media (max-width: 768px) {\n  .gallery-overlay,\n  .detail-overlay {\n    padding: var(--space-3);\n  }\n  .gallery-modal {\n    max-height: 90vh;\n  }\n  .gallery-modal-header {\n    padding: var(--space-4);\n  }\n  .gallery-modal-body {\n    padding: var(--space-4);\n  }\n  .gallery-grid {\n    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n    gap: var(--space-3);\n  }\n  .detail-content {\n    flex-direction: column;\n  }\n  .detail-image-container {\n    min-height: 200px;\n    padding: var(--space-4);\n  }\n  .detail-info-panel {\n    width: 100%;\n    border-left: none;\n    border-top: 1px solid var(--border-color);\n    padding: var(--space-4);\n  }\n  .detail-full-image {\n    max-height: 40vh;\n  }\n}\n@media (max-width: 480px) {\n  .gallery-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: var(--space-2);\n  }\n  .gallery-card-delete {\n    opacity: 1;\n    transform: scale(1);\n  }\n  .confirm-dialog {\n    padding: var(--space-6) var(--space-4) var(--space-4);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .gallery-overlay,\n  .detail-overlay,\n  .confirm-overlay {\n    animation: none;\n  }\n  .gallery-modal,\n  .detail-modal,\n  .confirm-dialog {\n    animation: none;\n  }\n  .gallery-card,\n  .images-btn,\n  .gallery-card-delete {\n    transition: none;\n  }\n}\n.gallery-header-controls {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  flex-shrink: 0;\n}\n.transparent-toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.transparent-label {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  white-space: nowrap;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.toggle-switch {\n  position: relative;\n  width: 40px;\n  height: 22px;\n  background: var(--border-color);\n  border: none;\n  border-radius: var(--radius-full, 9999px);\n  cursor: pointer;\n  padding: 0;\n  transition: background 0.2s;\n  flex-shrink: 0;\n}\n.toggle-switch.active {\n  background: var(--color-primary);\n}\n.toggle-knob {\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  width: 18px;\n  height: 18px;\n  background: white;\n  border-radius: 50%;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  transition: transform 0.2s;\n}\n.toggle-switch.active .toggle-knob {\n  transform: translateX(18px);\n}\n.toggle-switch:hover {\n  opacity: 0.85;\n}\n.toggle-switch:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n}\n.user-actions-wrapper {\n  position: relative;\n  display: inline-block;\n}\n.action-menu-btn {\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: var(--radius-md, 0.5rem);\n  cursor: pointer;\n  padding: var(--space-1) var(--space-2);\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 1;\n  color: var(--text-secondary);\n  transition: all 0.15s;\n  min-width: 32px;\n  min-height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  letter-spacing: 1px;\n}\n.action-menu-btn:hover {\n  background: var(--bg-secondary);\n  border-color: var(--border-color);\n  color: var(--text-primary);\n}\n.action-dropdown {\n  position: absolute;\n  top: calc(100% + 4px);\n  right: 0;\n  z-index: 50;\n  min-width: 180px;\n  background: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: var(--radius-lg, 0.75rem);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-2);\n  animation: dropdownFadeIn 0.15s ease;\n}\n@keyframes dropdownFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.dropdown-section {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.dropdown-label {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n  color: var(--text-secondary);\n  padding: var(--space-1) var(--space-3);\n  margin-bottom: 2px;\n}\n.dropdown-item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  background: transparent;\n  border: none;\n  border-radius: var(--radius-md, 0.5rem);\n  color: var(--text-primary);\n  font-size: var(--text-sm, 0.85rem);\n  cursor: pointer;\n  text-align: left;\n  white-space: nowrap;\n  transition: background 0.1s;\n}\n.dropdown-item:hover {\n  background: var(--bg-secondary);\n}\n.dropdown-item-warn {\n  color: var(--color-warning-hover);\n}\n.dropdown-item-warn:hover {\n  background: rgba(245, 158, 11, 0.08);\n}\n.dropdown-item-danger {\n  color: var(--color-error);\n}\n.dropdown-item-danger:hover {\n  background: var(--color-error-light);\n}\n.dropdown-item-success {\n  color: var(--color-primary);\n}\n.dropdown-item-success:hover {\n  background: rgba(6, 122, 69, 0.08);\n}\n.dropdown-divider {\n  height: 1px;\n  background: var(--border-color);\n  margin: var(--space-1) 0;\n}\n.role-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.role-dot.role-admin {\n  background: var(--color-error);\n}\n.role-dot.role-pharmacist {\n  background: #067a45;\n}\n.role-dot.role-user {\n  background: #d97706;\n}\n.role-dot.role-banned {\n  background: #ea580c;\n}\n.role-dot.role-deleted {\n  background: #64748b;\n}\n.self-label {\n  font-size: 0.7rem;\n  font-style: italic;\n}\n.row-banned td {\n  opacity: 0.6;\n}\n.row-deleted td {\n  opacity: 0.4;\n  text-decoration: line-through;\n}\n.confirm-icon-danger {\n  background: var(--color-error-light) !important;\n}\n.confirm-icon-danger .confirm-icon {\n  color: var(--color-error) !important;\n}\n.confirm-icon-primary {\n  background: var(--color-success-light) !important;\n}\n.confirm-icon-primary .confirm-icon {\n  color: var(--color-primary) !important;\n}\n.confirm-action-btn {\n  flex: 1;\n  padding: var(--space-3) var(--space-4);\n  background: var(--color-primary);\n  color: white;\n  border: none;\n  border-radius: var(--radius-lg, 0.75rem);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.confirm-action-btn:hover:not(:disabled) {\n  background: var(--color-primary-dark, #0b5f39);\n  box-shadow: 0 4px 12px rgba(6, 122, 69, 0.3);\n}\n.confirm-action-btn:disabled,\n.confirm-delete-btn:disabled,\n.confirm-cancel-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.confirm-state-preview {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: var(--bg-secondary);\n  border-radius: var(--radius-md, 0.5rem);\n  width: 100%;\n  justify-content: center;\n}\n.state-arrow {\n  font-size: 1.1rem;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.spinner-small {\n  font-size: 0.85rem;\n  animation: spinEmoji 1s linear infinite;\n  display: inline-block;\n}\n.admin-search::placeholder {\n  font-size: 0.8rem;\n  opacity: 0.55;\n}\n@media (max-width: 768px) {\n  .gallery-header-controls {\n    gap: var(--space-3);\n  }\n  .transparent-label {\n    display: none;\n  }\n  .action-dropdown {\n    position: fixed;\n    top: auto;\n    right: var(--space-3);\n    bottom: var(--space-3);\n    left: var(--space-3);\n    min-width: unset;\n    border-radius: var(--radius-xl, 1rem);\n    box-shadow: var(--shadow-2xl);\n  }\n}\n/*# sourceMappingURL=admin.css.map */\n'] }]
  }], null, { onResize: [{
    type: HostListener,
    args: ["window:resize"]
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Admin, { className: "Admin", filePath: "src/app/pages/admin/admin.ts", lineNumber: 38 });
})();
export {
  Admin
};
//# sourceMappingURL=chunk-PRZGOROF.js.map
