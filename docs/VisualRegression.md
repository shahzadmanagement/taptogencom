# Visual Regression Testing Guide

This document describes how layout screenshot comparisons are configured and run.

---

## 1. Execution Command

To run visual regressions and capture baseline images:
```bash
npx playwright test -c playwright.visual.config.ts --update-snapshots
```

---

## 2. Threshold Adjustments

Matches compare layout configurations dynamically with constraints:
* **`maxDiffPixelRatio`**: Set at `0.05` to catch layout shifts without failing on tiny subpixel variations.
* **`threshold`**: Set at `0.2`.
