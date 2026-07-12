# Event Bus Platform Architecture

This document describes the design, middlewares, and batching logic of the client-side Event Bus built for TapToGen.

---

## 1. Pub/Sub Interface

The event bus provides an asynchronous publisher/subscriber interface to decoupled modules:
```typescript
import { eventBus } from '@/lib/event-bus';

// Subscribe
eventBus.subscribe('page_view', (event) => {
  console.log('Page view tracked:', event.payload);
});

// Publish
eventBus.publish('page_view', { path: '/tools/fancy-text-generator' }, 'medium');
```

---

## 2. Event Batching & Queueing

To preserve browser responsiveness and limit network calls, the Event Bus batches medium and low priority events:
- **Batch Size**: 10 events.
- **Flush Interval**: 3 seconds (runs on a background interval timer).
- **High-Priority Exception**: Events with `'high'` priority (e.g. exceptions, button clicks) bypass the queue and dispatch immediately.
