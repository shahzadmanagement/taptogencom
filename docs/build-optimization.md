# Build Optimizations Specs

This document defines bundler configurations, manual chunks properties, and compiler switches.

---

## 1. Vite & Astro Compiler Rules
- **HTML compression**: Enabled via `compressHTML: true`.
- **CSS minification**: Configured via `cssMinify: true` using standard Vite minifiers.
- **Dynamic Chunks Splitting**: Configured manual chunks in `rollupOptions` separating library references into `vendor` bundles.
