# Enterprise Robots.txt Directives Specs

This document defines crawl optimization directives, user-agent mappings, and environment controls.

---

## 1. Environment Routing Policies

To prevent search crawler indices leakage:
- **Production Env**: Enables indexing of all dynamic sitemaps, templates, and categories.
- **Preview & Development Env**: Enforces global exclusion:
  ```txt
  User-agent: *
  Disallow: /
  ```

---

## 2. Crawler Target Mappings
- **Googlebot**: Allowed. Access restrictions defined for private APIs and draft directories.
- **Bingbot**: Allowed. Same exclusion parameters applied.
- **Google Crawlers (Image, Video, News, Ads)**: Full allowed clearance.
- **Other bots**: 2-second crawl delay requested to save bandwidth.
