# Enterprise Analytics Specifications

This document defines measurement IDs, tag triggers, environment boundaries, and consent-aware options.

---

## 1. Analytics & Tracking Rules
- **Environment Boundaries**: Analytics tags load strictly in the production environment (no localhost/preview tracking leaks).
- **Consent Checks**: Loads scripts only after explicit user consent is resolved.
- **Provider abstractions**: Integrates GA4, GTM, Microsoft Clarity, and Plausible under a unified configuration.
