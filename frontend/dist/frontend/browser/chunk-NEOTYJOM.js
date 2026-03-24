import {
  BehaviorSubject,
  Injectable,
  TranslateService,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-WLHV2EEC.js";

// src/app/core/services/translation.service.ts
var TranslationService = class _TranslationService {
  translate = inject(TranslateService);
  currentLangSubject = new BehaviorSubject(localStorage.getItem("preferredLanguage") || "en");
  currentLang$ = this.currentLangSubject.asObservable();
  constructor() {
    this.initLanguage();
  }
  initLanguage() {
    const defaultLang = "en";
    const supportedLangs = ["hu", "en", "de"];
    this.translate.addLangs(supportedLangs);
    this.translate.setDefaultLang(defaultLang);
    const savedLang = this.getSavedLanguage();
    const langToUse = savedLang || defaultLang;
    this.setLanguage(langToUse);
  }
  setLanguage(lang) {
    this.translate.use(lang);
    this.currentLangSubject.next(lang);
    this.saveLanguage(lang);
  }
  getCurrentLanguage() {
    return this.currentLangSubject.value;
  }
  saveLanguage(lang) {
    localStorage.setItem("preferredLanguage", lang);
  }
  getSavedLanguage() {
    const saved = localStorage.getItem("preferredLanguage");
    return saved;
  }
  instant(key) {
    return this.translate.instant(key);
  }
  static \u0275fac = function TranslationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TranslationService, factory: _TranslationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  TranslationService
};
//# sourceMappingURL=chunk-NEOTYJOM.js.map
