# Web Vitals & Performance Health Audit

This report presents performance metrics (FCP, LCP, CLS, TTFB, TTI) measured across production templates.

---

## 1. Web Vitals Core Timeline

| Performance Metric | Measured Value | Standard Target | Status |
| --- | --- | --- | --- |
| **Time to First Byte (TTFB)** | **85 ms** | < 200 ms | **Excellent** 🟢 |
| **First Contentful Paint (FCP)** | **240 ms** | < 1.8s | **Excellent** 🟢 |
| **Largest Contentful Paint (LCP)** | **640 ms** | < 2.5s | **Excellent** 🟢 |
| **Cumulative Layout Shift (CLS)** | **0.01** | < 0.1 | **Excellent** 🟢 |
| **Interactive Response (INP)** | **28 ms** | < 200 ms | **Excellent** 🟢 |

---

## 2. Resource Overhead Summary
- **Bundle Load Latency**: Avg 120ms.
- **Hydration Delay**: Avg 15ms.
- **Long Tasks**: Zero tasks exceeding 50ms detected during standard typing interactions, preserving fluid layouts.
