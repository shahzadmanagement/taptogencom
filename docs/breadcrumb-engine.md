# Centralized Breadcrumb Engine Specs

This document defines class method structures, interfaces, and integration details.

---

## 1. Engine Core Functionality
- **`getBreadcrumbs(pathname, lang, title)`**: Standardizes character formats, extracts localized prefix routes, and generates a structured navigation array.

---

## 2. Dynamic Integration Layers
- **Source Code**: [`src/lib/search-breadcrumb.ts`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/lib/search-breadcrumb.ts)
- **UI Integration**: Mapped inside English tool details [`src/pages/tools/[slug].astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/pages/tools/[slug].astro) and localized pages [`src/components/LocalizedToolPage.astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/components/LocalizedToolPage.astro).
