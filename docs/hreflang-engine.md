# Dynamic Hreflang Engine Specs

This document defines class method formats, input parameters, and central deployment interfaces.

---

## 1. Engine Core Functionality
- **`getHreflangAlternates(pathname)`**: Standardizes character casings, matches path parts, parses localized database listings, and compiles regional link tags.

---

## 2. Dynamic Layout Integration
- **Integration**: Deployed globally inside [`theme/layouts/BaseLayout.astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/theme/layouts/BaseLayout.astro):
  ```typescript
  const hreflangs = getHreflangAlternates(Astro.url.pathname);
  ```
