# XML Sitemap Engine Specs

This document defines function signatures, file creation routines, and build scripts integrations.

---

## 1. Engine Core Functionality
- **`generateSitemaps(publicDir)`**: Automatically compiles and outputs:
  - `sitemap-pages.xml` (Static pages)
  - `sitemap-blog.xml` (Blog posts)
  - `sitemap-tools.xml` (English dynamic tool pages)
  - `sitemap-categories.xml` (Categories index and detail directories)
  - `sitemap-hubs.xml` (Topic category hubs)
  - `sitemap-locales.xml` (All indexable translated pages)
  - `sitemap-images.xml` (Google-compliant Image sitemap tags)
  - `sitemap-videos.xml` (Future-ready compliant Video sitemap skeleton)
  - `sitemap-news.xml` (Future-ready compliant News sitemap skeleton)
  - `sitemap-index.xml` (Central XML index file)
