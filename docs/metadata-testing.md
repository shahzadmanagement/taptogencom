# Metadata Automated Testing Guide

This document maps out automated test scripts and verification scopes.

---

## 1. Test Harness Coverage
- Test path: [`tests/search/search-metadata.test.cjs`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/tests/search/search-metadata.test.cjs)
- Assertions:
  - Homepage title and robots tag format checks.
  - Tool detail localized translations validations.
  - Length optimizer (expands short strings and truncates long descriptions on spaces).
  - Robots `noindex` exclusions mapping checks.
