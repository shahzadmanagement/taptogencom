# Platform Release Process Guide

This document outlines the pipeline checkpoints executed on every production release branch push.

---

## 1. Branch Quality Pipelines

```
             ┌──────────────────────────────┐
             │         git push main        │
             └──────────────┬───────────────┘
                            ▼
             ┌──────────────────────────────┐
             │   Static check (TS & Lint)   │
             └──────────────┬───────────────┘
                            ▼
             ┌──────────────────────────────┐
             │       Vitest unit tests      │
             └──────────────┬───────────────┘
                            ▼
             ┌──────────────────────────────┐
             │  Playwright E2E & WCAG checks│
             └──────────────┬───────────────┘
                            ▼
             ┌──────────────────────────────┐
             │      Lighthouse budgets      │
             └──────────────┬───────────────┘
                            ▼
             ┌──────────────────────────────┐
             │      Production Release      │
             └==============================┘
```
Release validation is handled automatically on GitHub Actions CI.
