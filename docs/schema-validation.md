# JSON-LD Schema Validation Specifications

This document defines syntax criteria, sanitization checks, and Google search validator checklist guidelines.

---

## 1. Google Rich Results Checklist
- [x] **No raw HTML**: Strip all markup symbols from text variables.
- [x] **Always HTTPS**: Absolute links point strictly to secure HTTPS addresses.
- [x] **UTF-8 safe**: Correct symbols encoding.
- [x] **Organization matching ID**: Uses `#organization` anchors to connect references.
- [x] **SearchAction configuration**: Search queries target path maps matches.
