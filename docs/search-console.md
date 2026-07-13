# Production Google Search Console Verification

This document details the meta verification parameters for Google Search Console.

---

## 1. Verification Meta Tag

- **Key String**: `zNi383TtQyy3KK6TnLiwNE0-1pZMGPyolr29s6nLQA0`
- **Component Placement**: Managed under `siteConfig.verification.google` in `src/config/site.ts` and rendered globally on all pages inside `theme/layouts/BaseLayout.astro` under the `<head>` block.

---

## 2. Validation Checks
- Checked presence on home, category, and tool pages.
- Confirmed correct uppercase/lowercase casing matches.
