# Enterprise Canonical URL Specs

This document defines the canonicalization rules, casing controls, query parameters removal, and trailing slash normalizations.

---

## 1. Engine Core Rules
- **HTTPS Enforcement**: All resolved canonical paths prefix with `https://` strictly.
- **Lowercase Path Conversion**: Normalizes character casing to prevent index duplication (e.g. `/Tools/` to `/tools/`).
- **Trailing Slash Standardization**: Appends a trailing slash `/` to all standard route paths, while protecting files with extensions (e.g. `/sitemap.xml`).
- **Parameter Stripping**: Strips tracking parameters, query lists, and fragments automatically.
