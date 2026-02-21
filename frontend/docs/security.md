# Security Notice – Angular Dependency Advisory

## Overview
This project is built using **Angular 21.x**. At the time of development, an official security advisory exists for Angular core related to **unsanitized SVG script attributes**, which is reported by `npm audit` as a **high severity vulnerability**.

This advisory originates from the **Angular framework itself (upstream dependency)**, and **no patched Angular release was available** at the time of implementation.

---

## Affected Advisory
- **Package**: `@angular/compiler` (and related Angular core packages)
- **Severity**: High (reported by `npm audit`)
- **Type**: Potential XSS via unsanitized SVG script attributes
- **Source**: Official Angular Security Advisory (GitHub)

---

## Why the Project Is Not Directly Affected
The vulnerability only becomes exploitable under specific conditions. This project **does not use** any of the following risky patterns:

- Dynamic SVG injection
- `[innerHTML]` bindings
- Rendering of user-provided HTML
- `DomSanitizer.bypassSecurityTrustHtml()` or similar bypass methods

All templates rely on **standard Angular template bindings**, which remain safe under normal usage.

---

## Risk Assessment
- **Theoretical risk**: Present (framework-level advisory)
- **Practical risk in this project**: Minimal / none
- **Runtime impact**: None
- **Build impact**: None

The application functions correctly and securely within its intended scope.

---

## Why Angular 21 Was Kept
Angular 21 was intentionally kept for the following reasons:

- The project is not a production system
- The advisory is upstream and outside the developer’s control
- Downgrading would introduce unnecessary refactoring overhead
- The issue is documented and understood

This decision was made consciously, with awareness of the trade-offs.

---

## Mitigation Measures
To ensure safety despite the advisory:

- No dynamic HTML rendering is used
- SVG assets are static and loaded from trusted sources
- No sanitizer bypasses are applied
- Dependency updates are monitored

---

## Future Plan
Once a patched Angular release becomes available, the project can be updated to remove the advisory entirely.

---

## Summary
This security warning is:
- **Known**
- **Documented**
- **Understood**
- **Not exploitable in the current implementation**

The project remains safe within its intended educational and demonstrational context.

