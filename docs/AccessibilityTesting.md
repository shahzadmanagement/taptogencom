# Automated Accessibility Testing Standards

This guide describes WCAG accessibility check configurations on the platform.

---

## 1. Axe-Playwright Integration

Accessibility verification runs during E2E checks via `axe-playwright`:
```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

await injectAxe(page);
await checkA11y(page);
```

---

## 2. Supported Rules

Checks validate standard WCAG 2.2 AA targets:
* Contrast ratios.
* Explicit label associations.
* Aria-live notification triggers.
* Focus focus-visible state indicators.
