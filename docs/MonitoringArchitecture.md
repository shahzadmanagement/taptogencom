# Production Telemetry & Monitoring Architecture

This document describes client-side tracking hooks, session tracking, and health metrics check parameters.

---

## 1. Web Vitals & Runtime Telemetry

* **Cumulative Layout Shift (CLS)** and **First Input Delay (FID)** are monitored via PerformanceObservers.
* Uptime metrics are tracked from app launch time.
