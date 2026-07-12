# Performance & Web Vitals Monitoring

This guide outlines the performance tracking observer schemas deployed client-side.

---

## 1. Web Vitals Observers

We monitor standard Core Web Vitals parameters using browser-native `PerformanceObserver` structures:
- **First Contentful Paint (FCP)**: Captures when the first element appears.
- **Largest Contentful Paint (LCP)**: Tracks when the main content becomes visible.
- **Cumulative Layout Shift (CLS)**: Gathers visual layout shifts during page interaction.
- **Time to First Byte (TTFB)**: Extracted from navigation response timings.

---

## 2. Main Thread Long Tasks

Long Tasks block the main thread and impact responsiveness:
- The system registers an observer listening to `type: 'longtask'` to track execution durations exceeding `50ms`.
- Identified long tasks emit telemetry notifications to alert growth teams of thread bottlenecks.
