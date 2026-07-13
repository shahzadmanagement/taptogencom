# Internal Linking Engine Specs

This document defines function signatures, property layouts, and dynamic segment resolvers.

---

## 1. Engine Core Functionality
- **`getInternalLinks(pathname, lang)`**: Resolves categories, hubs, blogs, and static directories, compiling indexable links to fill the 5-8 count threshold.

---

## 2. Template Integration
- **Integration**: Deployed inside:
  - [`src/pages/tools/[slug].astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/pages/tools/[slug].astro)
  - [`src/components/LocalizedToolPage.astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/components/LocalizedToolPage.astro)
  - [`src/components/RelatedSection.astro`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/components/RelatedSection.astro)
