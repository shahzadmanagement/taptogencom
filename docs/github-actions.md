# CI GitHub Actions Guide

This document details GitHub Actions triggers, secrets management, and build steps.

---

## 1. CI Workflow
- **Workflow File**: [`.github/workflows/deploy.yml`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/.github/workflows/deploy.yml)
- **Validation Gates**: Executed on push or pull request to the `main` branch.
- **Failures Checks**: Enforces type checking, unit test assertions, and Astro builds parameters.
