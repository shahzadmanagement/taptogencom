# Image SEO Engine Specs

This document defines function signatures, property outputs, and Astro templates integrations.

---

## 1. Engine Core Functionality
- **`getImageMetadata(src, type)`**: Standardizes image parameters, resolving dimensions, social formats, and sitemaps structures dynamically.

---

## 2. Layout Integration
- **Integration**: Deployed globally inside [`theme/layouts/BaseLayout.astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/theme/layouts/BaseLayout.astro):
  ```typescript
  const imageMeta = getImageMetadata(ogImage || siteConfig.defaultOgImage, 'general');
  ```
