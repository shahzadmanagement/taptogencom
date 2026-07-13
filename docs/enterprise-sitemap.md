# Enterprise Sitemap Index Platform

This document describes the design specifications, file division logic, and XML configurations of the dynamic sitemap indices.

---

## 1. Sitemap Index Design

Instead of listing all ~7,000 URLs inside a single, large `sitemap.xml`, the site serves a central sitemap index:
- **Index path**: `/sitemap-index.xml` (or `/sitemap.xml` for crawler compatibility).
- **Index subfiles**:
  - `sitemap-pages.xml`: Static pages and standard landing pages.
  - `sitemap-blog.xml`: Blog listings and articles.
  - `sitemap-tools.xml`: Default English tool generator detail pages.
  - `sitemap-categories.xml`: Category listing details.
  - `sitemap-hubs.xml`: Navigational category hubs.
  - `sitemap-locales.xml`: Multilingual tool details for the 17 localized locales.

---

## 2. Limit & File Splitting Logic
- **URL Count Limit**: Constrained to Google's standard threshold of **50,000 URLs** per file. If this limit is exceeded, URLs are automatically chunked into split sequences (e.g. `sitemap-locales-1.xml`, `sitemap-locales-2.xml`).
