# Production Google Analytics (GA4) Integration

This document outlines the setup, Measurement ID, and telemetry configuration for Google Analytics 4.

---

## 1. Setup Configuration

- **Measurement ID**: `G-RRXK1L32WK`
- **Script Location**: Embedded globally inside `<head>` in `theme/layouts/BaseLayout.astro`.
- **Initialization Options**:
  - `anonymize_ip`: `true` (guarantees GDPR compliance by masking IPs).
  - `send_page_view`: `true` (enables automatic page tracking across page loads).

---

## 2. Event Telemetry Integration
- Interacts with our existing event dispatcher bus logic (tracking generator copying, downloading, and click actions).
- Triggers custom GA4 parameters (e.g. `search_latency` or `detected_intent`).
