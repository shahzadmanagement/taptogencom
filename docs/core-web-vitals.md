# Core Web Vitals Optimization Guidelines

This document details key metrics metrics, target values, and verification methods.

---

## 1. Core Web Vitals Metrics
- **Largest Contentful Paint (LCP)**: Target $< 2.5\text{s}$ (Optimized via preloading and eager loading hero parameters).
- **Interaction to Next Paint (INP)**: Target $< 200\text{ms}$ (Optimized via non-blocking lightweight modular scripts).
- **Cumulative Layout Shift (CLS)**: Target $< 0.1$ (Optimized via intrinsic width/height allocations on 100% of images and container aspect ratio rules).
