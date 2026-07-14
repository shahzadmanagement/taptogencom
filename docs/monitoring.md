# Production Telemetry & Health Monitoring Guide

This document defines metric collections, Core Web Vitals checks, and crawler warnings.

---

## 1. Production Health Trackers
- **HTTP status monitors**: Logs 404 and 500 error pathways.
- **SEO Validation audits**: Triggers warnings for missing canonicals, hreflangs, or schema metadata.
- **WebVitals tracking**: Logs FCP, LCP, CLS, TTFB, and INP scores via analytics endpoints.
