# Internationalization (i18n) Audit Report

This report outlines the localization coverage, locale codes, translation system, and structural gaps.

---

## 1. i18n Profiles

- **Total Supported Languages**: 18
- **Locale Codes**: `en`, `hi`, `es`, `ru`, `fr`, `de`, `it`, `pt`, `bn`, `ja`, `ko`, `ms`, `pl`, `id`, `ar`, `bg`, `tr`, `sv`.
- **Default Language**: `en`
- **RTL Language**: `ar` (Arabic)

---

## 2. Localization Coverage Statistics
- **Total Localized Tools Per Language**: 379
- **Localized Pages Count**: $379 \text{ tools} \times 17 \text{ languages} = 6,443$ pages.
- **Translation Strategy**: Mapped directly from `/src/data/localization.ts` and dynamic rollout batch modules.

---

## 3. Structural Gaps
- Localized pages are limited exclusively to dynamic tool details. There are **0 localized hub pages**, **0 localized categories**, and **0 localized homepages**.
- Locale switches correctly append alternatives, but canonical tags lack cross-linking index entries.
