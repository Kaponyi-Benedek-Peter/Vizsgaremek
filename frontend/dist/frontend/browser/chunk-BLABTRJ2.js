import {
  BehaviorSubject,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-WLHV2EEC.js";

// src/app/core/services/theme.service.ts
var ThemeService = class _ThemeService {
  currentThemeSubject = new BehaviorSubject("light");
  currentTheme$ = this.currentThemeSubject.asObservable();
  constructor() {
    this.initTheme();
  }
  initTheme() {
    const savedTheme = this.getSavedTheme();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const themeToUse = savedTheme || (prefersDark ? "dark" : "light");
    this.setTheme(themeToUse);
  }
  setTheme(theme) {
    this.currentThemeSubject.next(theme);
    this.applyTheme(theme);
    this.saveTheme(theme);
  }
  toggleTheme() {
    const newTheme = this.currentThemeSubject.value === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }
  getCurrentTheme() {
    return this.currentThemeSubject.value;
  }
  applyTheme(theme) {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("data-theme", theme);
  }
  saveTheme(theme) {
    localStorage.setItem("preferredTheme", theme);
  }
  getSavedTheme() {
    const saved = localStorage.getItem("preferredTheme");
    return saved;
  }
  static \u0275fac = function ThemeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  ThemeService
};
//# sourceMappingURL=chunk-BLABTRJ2.js.map
