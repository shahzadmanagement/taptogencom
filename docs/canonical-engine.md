# Centralized Canonical URL Engine Specs

This document defines the class method and runtime exports of the canonicalization module.

---

## 1. Module Export Functions

- **`resolveCanonicalUrl(input: string): string`**: Standardizes absolute paths, cleans double slashes, normalizes casing, and prefixes the production base domain.

---

## 2. Component Integration
Integrated natively inside the site layout header:
- File path: [`theme/layouts/BaseLayout.astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/theme/layouts/BaseLayout.astro)
- Assignment:
  ```typescript
  const canonicalUrl = resolveCanonicalUrl(canonical || Astro.url.pathname);
  ```
