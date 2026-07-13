# Internal Linking Automated Testing Guide

This document maps out automated test scripts and verification scopes.

---

## 1. Test Harness Coverage
- Test path: [`tests/search/search-internal-links.test.cjs`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/tests/search/search-internal-links.test.cjs)
- Assertions:
  - Link count verification checks (5 to 8).
  - Locale correctness.
  - Zero self-links.
  - Excludes noindex tools.
