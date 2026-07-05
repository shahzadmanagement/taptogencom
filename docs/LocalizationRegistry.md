# Localization Registry Architecture

This document describes how translated copies and hreflangs routes are managed.

---

## 1. Localized Routes Mapping

Localized content maps properties inside `src/data/localization.ts` to:
* **Languages**: English, Spanish, Portuguese, Italian, Russian, Turkish, Hindi, Bengali, Arabic.
* **Paths Routing**: Maps canonical canonicalIds to localized slugs paths matching native spelling directories.
