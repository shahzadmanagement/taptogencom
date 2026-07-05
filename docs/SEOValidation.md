# SEO Metrics Validation Guide

This document describes how metadata completeness is verified.

---

## 1. Automated Scans

* **Validator**: [`src/platform/seoValidator.ts`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/platform/seoValidator.ts) audits title lengths, descriptions presence, duplicate canonical paths, and FAQ page mappings.
* **CI Integration**: Executed automatically on every pull request to ensure high quality releases.
