# Global Error Handling & Exception boundaries

This document details platform safeguards built to isolate script exceptions and prevent UI failures.

---

## 1. Global Catchers

* **Global Error Listener**: Captures standard runtime syntax errors and uncaught failures.
* **Unhandled Rejection Listener**: Hooks into promise failures automatically.

---

## 2. Functional Error Boundaries

The wrapper utility `wrapErrorBoundary` encapsulates execution blocks:
```typescript
import { wrapErrorBoundary } from './errorBoundary';

const safeFunc = wrapErrorBoundary(() => {
  // critical task
}, fallbackValue);
```
If an exception occurs within the boundary, the error reporter logs the payload while the fallback value is returned, avoiding site crashes.
