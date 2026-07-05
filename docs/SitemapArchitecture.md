# XML Sitemap Architecture

This document describes how sitemaps list active English and translated generator routes.

---

## 1. Automated Sitemap Generation

* **Script**: [`scripts/generate-sitemap.ts`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/scripts/generate-sitemap.ts) compiles tool entries into standard `/sitemap.xml`.
* **Exclusions**: Safe noindex pages are skipped dynamically.
