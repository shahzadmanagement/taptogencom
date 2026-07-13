# Routing Architecture Audit Report

This report documents the Astro routing hierarchy, dynamic segments, redirects, and sitemaps layout.

---

## 1. Routing Hierarchy

### Static Routes (English Only)
- Homepage: `/`
- Tools Directory: `/tools/`
- Categories Directory: `/categories/`
- Blog Index: `/blog/`
- Sitemap List: `/sitemap/`

### Dynamic Routes
- English Tools: `/tools/[slug]/`
- English Categories: `/categories/[slug]/`
- Localized Tools: `/[lang]/tools/[slug]/`

---

## 2. Invalid Link Analysis
- Localized dynamic routes link back to non-existent localized list views (e.g. `/es/` and `/es/tools/`), resulting in **404 redirects** or invalid routing paths.
