# Performance Monitoring Architecture

This document outlines browser monitoring capabilities built to track page interaction durations.

---

## 1. Metrics Collected

* **Navigation timing API**: Captures server response speed and DOM ready compilation timings.
* **Long Task API**: Emits warning flags if main thread is blocked for more than 50ms.
* **Largest Contentful Paint (LCP)**: Buffers visual load times to analyze page speed indices.

---

## 2. Timing Instruments Helper

```typescript
import { startMark, endMark } from './performance';

startMark('task-name');
// ... perform task ...
const duration = endMark('task-name');
```
Metrics are printed in development logs and can be routed to a remote analytics collector.
