# Enterprise Image SEO Specifications

This document defines accessibility alt requirements, fetch priority rules, loading modes, and social/structured metadata guidelines.

---

## 1. Quality & Performance Rules
- **Non-Empty Alt Attributes**: Dynamic resolver enforces meaningful alt descriptions (no empty `alt=""`).
- **Fetch Priority**: Hero images above the fold receive `loading="eager"` and `fetchpriority="high"` optimization.
- **Lazy Loading**: Non-above-the-fold images default to `loading="lazy"` and `decoding="async"`.
- **Social Integration**: Automates width, height, and type tags for OpenGraph images.
