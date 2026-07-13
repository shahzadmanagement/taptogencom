# Dynamic Sitemap Generation Specs

This document details the build-time generation code, execution routines, and configuration parameters of the sitemap engine.

---

## 1. Engine Core & Methods

The sitemap generator engine (`src/lib/search-sitemap.ts`) exports:
- **`generateSitemaps(publicDir)`**: Compiles sitemap categories, filters `noindex` entities, and writes XML outputs.
- **`getSitemapData()`**: Resolves and maps all active production-ready URLs.

---

## 2. Dynamic Routing Integration
- **Deduplication**: Maps and registers unique URLs using localized pilot listings and `getToolRoute` lookups.
- **Priority Weights**:
  - Home: `1.0` (daily)
  - English Tools: `0.8` (daily)
  - Localized Tools: `0.7` (daily)
  - Hubs / Categories: `0.7` (weekly)
  - Static Legal: `0.3` (monthly)
