# Enterprise JSON-LD Structured Data Platform

This document describes the design specifications, configuration mappings, and Google Rich Results guidelines of the centralized Schema Platform.

---

## 1. Deployed Schema Mappings
- **Home**: Mapped with `WebSite` (incorporating `SearchAction`), `Organization`, and `WebPage`.
- **Dynamic Tools**: Mapped with `WebApplication` (SoftwareApplication category) and dynamic `BreadcrumbList`.
- **Categories / Hubs**: Mapped with `CollectionPage` and dynamic `BreadcrumbList`.
- **FAQ Page**: Rendered dynamically if the template resolves custom FAQ questions.
- **Static Pages**: Rendered as generic `WebPage` schemas with category breadcrumbs.

---

## 2. Dynamic Tag Sanitization
- Auto-sanitizes raw HTML tag markups inside title or description fields to prevent JSON schema validator warnings.
