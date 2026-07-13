# Dynamic Metadata Engine Specs

This document defines function signatures, property layouts, and optimization helpers.

---

## 1. Engine Core Functionality
- **`buildMetadata(options)`**: Sanitizes HTML inputs, checks routing paths, queries the database, and truncates/expands meta descriptions to perfect lengths.

---

## 2. Layout Integration
- **Integration**: Deployed globally inside [`theme/layouts/BaseLayout.astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/theme/layouts/BaseLayout.astro):
  ```typescript
  const meta = buildMetadata({
    pathname: Astro.url.pathname,
    lang,
    titleOverride: title,
    descriptionOverride: description,
    noindexOverride: noindex
  });
  ```
