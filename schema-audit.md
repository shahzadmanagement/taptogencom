# JSON-LD Structured Data Audit Report

This report documents schema validation and identifies missing structural markups.

---

## 1. Existing Schema Implementations

- **`WebApplication`**: Embedded on tool templates. Represents software details (operatingSystem, browserRequirements, pricing).
- **`FAQPage`**: Embedded on tool details using custom FAQ lists.
- **`BreadcrumbList`**: Automatically generated for page trees.

---

## 2. Structural Gaps & Enhancements

- **Organization & Website**: Registered only on the global base layout. Website schema includes `SearchAction` mapping.
- **Missing Breadcrumb Trails**: No breadcrumbs exist on Category lists, Hub indices, or Homepage targets.
- **HTML tags in JSON-LD**: Some description text contains raw HTML tags (e.g. `<strong>`), causing syntax validation failures inside crawlers.
