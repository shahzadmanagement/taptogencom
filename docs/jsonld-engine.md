# JSON-LD Schema Engine Specs

This document defines the functions, class methods, and component integration of the structured data engine.

---

## 1. Engine Core Functionality
- **`buildSchemas(options)`**: Standardizes pathname, parses language locale rules, formats canonical paths, and compiles JSON-LD collections.

---

## 2. Global Integration Layer
- **File**: [`theme/layouts/BaseLayout.astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/theme/layouts/BaseLayout.astro)
- **Call implementation**:
  ```typescript
  const allSchemas = buildSchemas({
    pathname: Astro.url.pathname,
    lang,
    title,
    description,
    customSchemas: schema
  });
  ```
