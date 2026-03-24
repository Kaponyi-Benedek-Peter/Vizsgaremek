import {
  ThemeService
} from "./chunk-BLABTRJ2.js";
import {
  getLogoSrc
} from "./chunk-KM3DUJ3P.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-JGUC3CXT.js";
import {
  Component,
  TranslateModule,
  TranslatePipe,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinterpolate,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-WLHV2EEC.js";

// src/app/pages/not-found/not-found.ts
var NotFound = class _NotFound {
  themeService = inject(ThemeService);
  themeSub;
  currentTheme = signal("light", ...ngDevMode ? [{ debugName: "currentTheme" }] : []);
  get logoSrc() {
    return getLogoSrc(this.currentTheme());
  }
  ngOnInit() {
    this.currentTheme.set(this.themeService.getCurrentTheme());
    this.themeSub = this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme.set(theme);
    });
  }
  ngOnDestroy() {
    this.themeSub?.unsubscribe();
  }
  static \u0275fac = function NotFound_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotFound)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotFound, selectors: [["app-not-found"]], decls: 62, vars: 29, consts: [[1, "nf-page"], ["aria-hidden", "true", 1, "nf-particles"], [1, "particle", "particle-1"], [1, "particle", "particle-2"], [1, "particle", "particle-3"], [1, "particle", "particle-4"], [1, "particle", "particle-5"], [1, "particle", "particle-6"], [1, "nf-content"], ["aria-hidden", "true", 1, "nf-code-wrapper"], [1, "nf-digit"], [1, "nf-digit", "nf-digit--zero"], [1, "nf-logo-wrapper"], ["alt", "Roy's Shack Est. 1888", 1, "nf-logo", 3, "src"], ["aria-hidden", "true", 1, "nf-divider"], [1, "nf-divider-line"], [1, "nf-divider-icon"], [1, "nf-message"], [1, "nf-title"], [1, "nf-subtitle"], [1, "nf-actions"], ["routerLink", "/home", 1, "nf-btn", "nf-btn--primary"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "nf-btn-icon"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"], ["routerLink", "/products", 1, "nf-btn", "nf-btn--secondary"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"], [1, "nf-quick-links", 3, "aria-label"], [1, "nf-quick-links-label"], [1, "nf-quick-links-list"], ["routerLink", "/forum", 1, "nf-quick-link"], ["aria-hidden", "true", 1, "nf-quick-link-sep"], ["routerLink", "/profile", 1, "nf-quick-link"], ["routerLink", "/legal", 1, "nf-quick-link"], ["aria-hidden", "true", 1, "nf-est-badge"]], template: function NotFound_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "span", 2)(3, "span", 3)(4, "span", 4)(5, "span", 5)(6, "span", 6)(7, "span", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 8)(9, "div", 9)(10, "span", 10);
      \u0275\u0275text(11, "4");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span", 11);
      \u0275\u0275text(13, "0");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15, "4");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 12);
      \u0275\u0275element(17, "img", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 14);
      \u0275\u0275element(19, "span", 15);
      \u0275\u0275elementStart(20, "span", 16);
      \u0275\u0275text(21, "\u2726");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "span", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 17)(24, "h1", 18);
      \u0275\u0275text(25);
      \u0275\u0275pipe(26, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p", 19);
      \u0275\u0275text(28);
      \u0275\u0275pipe(29, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 20)(31, "a", 21);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(32, "svg", 22);
      \u0275\u0275element(33, "path", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275text(34);
      \u0275\u0275pipe(35, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(36, "a", 24);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(37, "svg", 22);
      \u0275\u0275element(38, "path", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275text(39);
      \u0275\u0275pipe(40, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(41, "nav", 26);
      \u0275\u0275pipe(42, "translate");
      \u0275\u0275elementStart(43, "span", 27);
      \u0275\u0275text(44);
      \u0275\u0275pipe(45, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 28)(47, "a", 29);
      \u0275\u0275text(48);
      \u0275\u0275pipe(49, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "span", 30);
      \u0275\u0275text(51, "\xB7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "a", 31);
      \u0275\u0275text(53);
      \u0275\u0275pipe(54, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "span", 30);
      \u0275\u0275text(56, "\xB7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "a", 32);
      \u0275\u0275text(58);
      \u0275\u0275pipe(59, "translate");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(60, "div", 33);
      \u0275\u0275text(61, "Est. 1888");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(17);
      \u0275\u0275property("src", ctx.logoSrc, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 11, "not_found.title"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 13, "not_found.subtitle"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(35, 15, "not_found.go_home"), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(40, 17, "not_found.browse_products"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate(\u0275\u0275pipeBind1(42, 19, "not_found.quick_links_label")));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(45, 21, "not_found.quick_links"));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(49, 23, "header.forum"));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(54, 25, "header.profile"));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(59, 27, "footer.legal"));
    }
  }, dependencies: [RouterModule, RouterLink, TranslateModule, TranslatePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.nf-page[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100dvh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  background-color: var(--color-background);\n  padding: var(--space-8) var(--space-4);\n}\n.nf-page[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse 60% 50% at 50% 40%,\n      rgba(6, 122, 69, 0.07) 0%,\n      transparent 70%);\n  pointer-events: none;\n}\n.nf-particles[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n.particle[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  background: var(--color-green-primary);\n  opacity: 0.08;\n  animation: _ngcontent-%COMP%_particle-float linear infinite;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .particle[_ngcontent-%COMP%] {\n  opacity: 0.12;\n}\n.particle-1[_ngcontent-%COMP%] {\n  width: 180px;\n  height: 180px;\n  top: -60px;\n  left: -40px;\n  animation-duration: 18s;\n  animation-delay: 0s;\n}\n.particle-2[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  top: 15%;\n  right: 8%;\n  animation-duration: 22s;\n  animation-delay: -4s;\n}\n.particle-3[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  top: 60%;\n  left: 6%;\n  animation-duration: 16s;\n  animation-delay: -8s;\n}\n.particle-4[_ngcontent-%COMP%] {\n  width: 220px;\n  height: 220px;\n  bottom: -80px;\n  right: -60px;\n  animation-duration: 26s;\n  animation-delay: -12s;\n}\n.particle-5[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  top: 40%;\n  left: 20%;\n  animation-duration: 14s;\n  animation-delay: -6s;\n}\n.particle-6[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  bottom: 20%;\n  right: 20%;\n  animation-duration: 20s;\n  animation-delay: -2s;\n}\n@keyframes _ngcontent-%COMP%_particle-float {\n  0%, 100% {\n    transform: translateY(0px) scale(1);\n  }\n  33% {\n    transform: translateY(-18px) scale(1.04);\n  }\n  66% {\n    transform: translateY(10px) scale(0.97);\n  }\n}\n.nf-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--space-6);\n  max-width: 560px;\n  width: 100%;\n  animation: _ngcontent-%COMP%_nf-entrance 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes _ngcontent-%COMP%_nf-entrance {\n  from {\n    opacity: 0;\n    transform: translateY(24px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.nf-code-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.05em;\n  line-height: 1;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.nf-digit[_ngcontent-%COMP%] {\n  font-family: var(--font-mono, "Inconsolata", monospace);\n  font-size: clamp(5rem, 18vw, 10rem);\n  font-weight: 800;\n  letter-spacing: -0.03em;\n  background: var(--gradient-primary, linear-gradient(135deg, #067a45, #0a9e5a));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  filter: drop-shadow(0 2px 16px rgba(6, 122, 69, 0.25));\n}\n.nf-digit--zero[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_digit-wobble 6s ease-in-out infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_digit-wobble {\n  0%, 100% {\n    transform: rotate(0deg) scale(1);\n  }\n  20% {\n    transform: rotate(-3deg) scale(1.02);\n  }\n  40% {\n    transform: rotate(3deg) scale(0.98);\n  }\n  60% {\n    transform: rotate(-1.5deg) scale(1.01);\n  }\n  80% {\n    transform: rotate(1deg) scale(0.99);\n  }\n}\n.nf-logo-wrapper[_ngcontent-%COMP%] {\n  padding: var(--space-2) 0;\n}\n.nf-logo[_ngcontent-%COMP%] {\n  height: clamp(64px, 12vw, 96px);\n  width: auto;\n  object-fit: contain;\n  transition: opacity var(--transition-normal);\n  animation: _ngcontent-%COMP%_logo-appear 0.5s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n@keyframes _ngcontent-%COMP%_logo-appear {\n  from {\n    opacity: 0;\n    transform: scale(0.88);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.nf-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n  max-width: 320px;\n}\n.nf-divider-line[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 1px;\n  background:\n    linear-gradient(\n      to right,\n      transparent,\n      var(--color-border),\n      transparent);\n}\n.nf-divider-icon[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--color-green-primary);\n  opacity: 0.6;\n}\n.nf-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.nf-title[_ngcontent-%COMP%] {\n  font-family: var(--font-primary);\n  font-size: var(--text-2xl, clamp(1.4rem, 4vw, 1.9rem));\n  font-weight: 700;\n  color: var(--color-text-primary);\n  letter-spacing: -0.02em;\n}\n.nf-subtitle[_ngcontent-%COMP%] {\n  font-size: var(--text-base, 1rem);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-relaxed, 1.75);\n  max-width: 420px;\n}\n.nf-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-3);\n  justify-content: center;\n  width: 100%;\n}\n.nf-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-3) var(--space-6);\n  border-radius: var(--radius-full, 999px);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  text-decoration: none;\n  cursor: pointer;\n  transition:\n    background var(--transition-normal),\n    box-shadow var(--transition-normal),\n    transform var(--transition-fast),\n    color var(--transition-normal);\n  white-space: nowrap;\n}\n.nf-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-green-primary);\n  outline-offset: 3px;\n}\n.nf-btn--primary[_ngcontent-%COMP%] {\n  background: var(--gradient-primary, linear-gradient(135deg, #067a45, #0a9e5a));\n  color: #fff;\n  box-shadow: var(--shadow-primary, 0 6px 20px rgba(6, 122, 69, 0.35));\n}\n@media (hover: hover) and (pointer: fine) {\n  .nf-btn--primary[_ngcontent-%COMP%]:hover {\n    background: var(--gradient-primary-hover, linear-gradient(135deg, #055c34, #067a45));\n    box-shadow: var(--shadow-primary-lg, 0 8px 28px rgba(6, 122, 69, 0.5));\n    transform: translateY(-2px);\n  }\n  .nf-btn--primary[_ngcontent-%COMP%]:active {\n    transform: translateY(0);\n  }\n}\n.nf-btn--secondary[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--color-green-primary);\n  border: 1.5px solid var(--color-green-primary);\n}\n@media (hover: hover) and (pointer: fine) {\n  .nf-btn--secondary[_ngcontent-%COMP%]:hover {\n    background: rgba(6, 122, 69, 0.06);\n    box-shadow: 0 4px 12px rgba(6, 122, 69, 0.12);\n    transform: translateY(-2px);\n  }\n  .nf-btn--secondary[_ngcontent-%COMP%]:active {\n    transform: translateY(0);\n  }\n}\n.nf-btn-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n}\n.nf-quick-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  margin-top: var(--space-2);\n}\n.nf-quick-links-label[_ngcontent-%COMP%] {\n  font-size: var(--text-xs, 0.78rem);\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--color-text-secondary);\n  opacity: 0.7;\n}\n.nf-quick-links-list[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.nf-quick-link[_ngcontent-%COMP%] {\n  font-size: var(--text-sm, 0.875rem);\n  color: var(--color-text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n}\n@media (hover: hover) and (pointer: fine) {\n  .nf-quick-link[_ngcontent-%COMP%]:hover {\n    color: var(--color-green-primary);\n  }\n}\n.nf-quick-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-green-primary);\n  border-radius: 2px;\n  outline-offset: 2px;\n}\n.nf-quick-link-sep[_ngcontent-%COMP%] {\n  color: var(--color-border);\n  font-size: var(--text-base, 1rem);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.nf-est-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: var(--space-4);\n  right: var(--space-6);\n  font-family: var(--font-mono, "Inconsolata", monospace);\n  font-size: 0.7rem;\n  letter-spacing: 0.12em;\n  color: var(--color-text-secondary);\n  opacity: 0.3;\n  -webkit-user-select: none;\n  user-select: none;\n}\n@media (max-width: 480px) {\n  .nf-content[_ngcontent-%COMP%] {\n    gap: var(--space-5);\n  }\n  .nf-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .nf-btn[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .nf-est-badge[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (min-width: 768px) {\n  .nf-content[_ngcontent-%COMP%] {\n    gap: var(--space-8);\n  }\n}\n/*# sourceMappingURL=not-found.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotFound, [{
    type: Component,
    args: [{ selector: "app-not-found", standalone: true, imports: [RouterModule, TranslateModule], template: `<div class="nf-page">\r
  <div class="nf-particles" aria-hidden="true">\r
    <span class="particle particle-1"></span>\r
    <span class="particle particle-2"></span>\r
    <span class="particle particle-3"></span>\r
    <span class="particle particle-4"></span>\r
    <span class="particle particle-5"></span>\r
    <span class="particle particle-6"></span>\r
  </div>\r
\r
  <div class="nf-content">\r
    <div class="nf-code-wrapper" aria-hidden="true">\r
      <span class="nf-digit">4</span>\r
      <span class="nf-digit nf-digit--zero">0</span>\r
      <span class="nf-digit">4</span>\r
    </div>\r
\r
    <div class="nf-logo-wrapper">\r
      <img [src]="logoSrc" alt="Roy's Shack Est. 1888" class="nf-logo" />\r
    </div>\r
\r
    <div class="nf-divider" aria-hidden="true">\r
      <span class="nf-divider-line"></span>\r
      <span class="nf-divider-icon">\u2726</span>\r
      <span class="nf-divider-line"></span>\r
    </div>\r
\r
    <div class="nf-message">\r
      <h1 class="nf-title">{{ 'not_found.title' | translate }}</h1>\r
      <p class="nf-subtitle">{{ 'not_found.subtitle' | translate }}</p>\r
    </div>\r
\r
    <div class="nf-actions">\r
      <a routerLink="/home" class="nf-btn nf-btn--primary">\r
        <svg\r
          class="nf-btn-icon"\r
          viewBox="0 0 24 24"\r
          fill="none"\r
          stroke="currentColor"\r
          stroke-width="2"\r
          aria-hidden="true"\r
        >\r
          <path\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
            d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"\r
          />\r
        </svg>\r
        {{ 'not_found.go_home' | translate }}\r
      </a>\r
\r
      <a routerLink="/products" class="nf-btn nf-btn--secondary">\r
        <svg\r
          class="nf-btn-icon"\r
          viewBox="0 0 24 24"\r
          fill="none"\r
          stroke="currentColor"\r
          stroke-width="2"\r
          aria-hidden="true"\r
        >\r
          <path\r
            stroke-linecap="round"\r
            stroke-linejoin="round"\r
            d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"\r
          />\r
        </svg>\r
        {{ 'not_found.browse_products' | translate }}\r
      </a>\r
    </div>\r
\r
    <nav class="nf-quick-links" aria-label="{{ 'not_found.quick_links_label' | translate }}">\r
      <span class="nf-quick-links-label">{{ 'not_found.quick_links' | translate }}</span>\r
      <div class="nf-quick-links-list">\r
        <a routerLink="/forum" class="nf-quick-link">{{ 'header.forum' | translate }}</a>\r
        <span class="nf-quick-link-sep" aria-hidden="true">\xB7</span>\r
        <a routerLink="/profile" class="nf-quick-link">{{ 'header.profile' | translate }}</a>\r
        <span class="nf-quick-link-sep" aria-hidden="true">\xB7</span>\r
        <a routerLink="/legal" class="nf-quick-link">{{ 'footer.legal' | translate }}</a>\r
      </div>\r
    </nav>\r
  </div>\r
\r
  <div class="nf-est-badge" aria-hidden="true">Est. 1888</div>\r
</div>\r
`, styles: ['/* src/app/pages/not-found/not-found.css */\n:host {\n  display: block;\n}\n.nf-page {\n  position: relative;\n  min-height: 100dvh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  background-color: var(--color-background);\n  padding: var(--space-8) var(--space-4);\n}\n.nf-page::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse 60% 50% at 50% 40%,\n      rgba(6, 122, 69, 0.07) 0%,\n      transparent 70%);\n  pointer-events: none;\n}\n.nf-particles {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n.particle {\n  position: absolute;\n  border-radius: 50%;\n  background: var(--color-green-primary);\n  opacity: 0.08;\n  animation: particle-float linear infinite;\n}\n[data-theme=dark] .particle {\n  opacity: 0.12;\n}\n.particle-1 {\n  width: 180px;\n  height: 180px;\n  top: -60px;\n  left: -40px;\n  animation-duration: 18s;\n  animation-delay: 0s;\n}\n.particle-2 {\n  width: 100px;\n  height: 100px;\n  top: 15%;\n  right: 8%;\n  animation-duration: 22s;\n  animation-delay: -4s;\n}\n.particle-3 {\n  width: 60px;\n  height: 60px;\n  top: 60%;\n  left: 6%;\n  animation-duration: 16s;\n  animation-delay: -8s;\n}\n.particle-4 {\n  width: 220px;\n  height: 220px;\n  bottom: -80px;\n  right: -60px;\n  animation-duration: 26s;\n  animation-delay: -12s;\n}\n.particle-5 {\n  width: 40px;\n  height: 40px;\n  top: 40%;\n  left: 20%;\n  animation-duration: 14s;\n  animation-delay: -6s;\n}\n.particle-6 {\n  width: 80px;\n  height: 80px;\n  bottom: 20%;\n  right: 20%;\n  animation-duration: 20s;\n  animation-delay: -2s;\n}\n@keyframes particle-float {\n  0%, 100% {\n    transform: translateY(0px) scale(1);\n  }\n  33% {\n    transform: translateY(-18px) scale(1.04);\n  }\n  66% {\n    transform: translateY(10px) scale(0.97);\n  }\n}\n.nf-content {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--space-6);\n  max-width: 560px;\n  width: 100%;\n  animation: nf-entrance 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes nf-entrance {\n  from {\n    opacity: 0;\n    transform: translateY(24px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.nf-code-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 0.05em;\n  line-height: 1;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.nf-digit {\n  font-family: var(--font-mono, "Inconsolata", monospace);\n  font-size: clamp(5rem, 18vw, 10rem);\n  font-weight: 800;\n  letter-spacing: -0.03em;\n  background: var(--gradient-primary, linear-gradient(135deg, #067a45, #0a9e5a));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  filter: drop-shadow(0 2px 16px rgba(6, 122, 69, 0.25));\n}\n.nf-digit--zero {\n  animation: digit-wobble 6s ease-in-out infinite;\n  display: inline-block;\n}\n@keyframes digit-wobble {\n  0%, 100% {\n    transform: rotate(0deg) scale(1);\n  }\n  20% {\n    transform: rotate(-3deg) scale(1.02);\n  }\n  40% {\n    transform: rotate(3deg) scale(0.98);\n  }\n  60% {\n    transform: rotate(-1.5deg) scale(1.01);\n  }\n  80% {\n    transform: rotate(1deg) scale(0.99);\n  }\n}\n.nf-logo-wrapper {\n  padding: var(--space-2) 0;\n}\n.nf-logo {\n  height: clamp(64px, 12vw, 96px);\n  width: auto;\n  object-fit: contain;\n  transition: opacity var(--transition-normal);\n  animation: logo-appear 0.5s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n@keyframes logo-appear {\n  from {\n    opacity: 0;\n    transform: scale(0.88);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.nf-divider {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n  max-width: 320px;\n}\n.nf-divider-line {\n  flex: 1;\n  height: 1px;\n  background:\n    linear-gradient(\n      to right,\n      transparent,\n      var(--color-border),\n      transparent);\n}\n.nf-divider-icon {\n  font-size: 0.75rem;\n  color: var(--color-green-primary);\n  opacity: 0.6;\n}\n.nf-message {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.nf-title {\n  font-family: var(--font-primary);\n  font-size: var(--text-2xl, clamp(1.4rem, 4vw, 1.9rem));\n  font-weight: 700;\n  color: var(--color-text-primary);\n  letter-spacing: -0.02em;\n}\n.nf-subtitle {\n  font-size: var(--text-base, 1rem);\n  color: var(--color-text-secondary);\n  line-height: var(--leading-relaxed, 1.75);\n  max-width: 420px;\n}\n.nf-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-3);\n  justify-content: center;\n  width: 100%;\n}\n.nf-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-3) var(--space-6);\n  border-radius: var(--radius-full, 999px);\n  font-size: var(--text-sm, 0.9rem);\n  font-weight: 600;\n  text-decoration: none;\n  cursor: pointer;\n  transition:\n    background var(--transition-normal),\n    box-shadow var(--transition-normal),\n    transform var(--transition-fast),\n    color var(--transition-normal);\n  white-space: nowrap;\n}\n.nf-btn:focus-visible {\n  outline: 2px solid var(--color-green-primary);\n  outline-offset: 3px;\n}\n.nf-btn--primary {\n  background: var(--gradient-primary, linear-gradient(135deg, #067a45, #0a9e5a));\n  color: #fff;\n  box-shadow: var(--shadow-primary, 0 6px 20px rgba(6, 122, 69, 0.35));\n}\n@media (hover: hover) and (pointer: fine) {\n  .nf-btn--primary:hover {\n    background: var(--gradient-primary-hover, linear-gradient(135deg, #055c34, #067a45));\n    box-shadow: var(--shadow-primary-lg, 0 8px 28px rgba(6, 122, 69, 0.5));\n    transform: translateY(-2px);\n  }\n  .nf-btn--primary:active {\n    transform: translateY(0);\n  }\n}\n.nf-btn--secondary {\n  background: transparent;\n  color: var(--color-green-primary);\n  border: 1.5px solid var(--color-green-primary);\n}\n@media (hover: hover) and (pointer: fine) {\n  .nf-btn--secondary:hover {\n    background: rgba(6, 122, 69, 0.06);\n    box-shadow: 0 4px 12px rgba(6, 122, 69, 0.12);\n    transform: translateY(-2px);\n  }\n  .nf-btn--secondary:active {\n    transform: translateY(0);\n  }\n}\n.nf-btn-icon {\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n}\n.nf-quick-links {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  margin-top: var(--space-2);\n}\n.nf-quick-links-label {\n  font-size: var(--text-xs, 0.78rem);\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--color-text-secondary);\n  opacity: 0.7;\n}\n.nf-quick-links-list {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.nf-quick-link {\n  font-size: var(--text-sm, 0.875rem);\n  color: var(--color-text-secondary);\n  text-decoration: none;\n  transition: color var(--transition-fast);\n}\n@media (hover: hover) and (pointer: fine) {\n  .nf-quick-link:hover {\n    color: var(--color-green-primary);\n  }\n}\n.nf-quick-link:focus-visible {\n  outline: 2px solid var(--color-green-primary);\n  border-radius: 2px;\n  outline-offset: 2px;\n}\n.nf-quick-link-sep {\n  color: var(--color-border);\n  font-size: var(--text-base, 1rem);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.nf-est-badge {\n  position: absolute;\n  bottom: var(--space-4);\n  right: var(--space-6);\n  font-family: var(--font-mono, "Inconsolata", monospace);\n  font-size: 0.7rem;\n  letter-spacing: 0.12em;\n  color: var(--color-text-secondary);\n  opacity: 0.3;\n  -webkit-user-select: none;\n  user-select: none;\n}\n@media (max-width: 480px) {\n  .nf-content {\n    gap: var(--space-5);\n  }\n  .nf-actions {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .nf-btn {\n    justify-content: center;\n  }\n  .nf-est-badge {\n    display: none;\n  }\n}\n@media (min-width: 768px) {\n  .nf-content {\n    gap: var(--space-8);\n  }\n}\n/*# sourceMappingURL=not-found.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotFound, { className: "NotFound", filePath: "src/app/pages/not-found/not-found.ts", lineNumber: 18 });
})();
export {
  NotFound
};
//# sourceMappingURL=chunk-34FMDWOX.js.map
