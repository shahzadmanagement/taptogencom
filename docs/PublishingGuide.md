# Tool Publishing Guide

Follow these steps to configure, document, and publish a new generator tool on the platform.

---

## 1. Setup Configuration & Meta

1. Registry profile: Create `src/config/<slug>.ts` mapping metrics, search, and exporters parameters.
2. Content metadata: Register tags, intro, and useCases inside `src/data/content-registry.ts`.
3. Add native translation key mappings under `src/data/localization.ts`.

---

## 2. Diagnostics Checks

Before committing changes, run:
```bash
node scripts/platform-cli.js verify
```
This validates slugs consistency, missing templates, and routes paths.
