# Error Monitoring & Crash Tracking

This guide details runtime exception mapping and unhandled promise rejection tracking.

---

## 1. Exception Capture

The error monitor registers global listeners on window:
- **`window.addEventListener('error')`**: Logs uncaught JS exceptions, recording message, source file, line, and column indices.
- **`window.addEventListener('unhandledrejection')`**: Captures unhandled Promises, converting rejection reasons to readable string stacks.

---

## 2. Workspace Failure Signals

Generator failures (such as configuration errors, generation failures, or execution bottlenecks) are forwarded via the same channel:
```typescript
import { errorMonitor } from '@/lib/error-monitor';

errorMonitor.logError({
  message: 'Failed to generate font output: missing styles mapping',
  type: 'workspace',
  timestamp: new Date().toISOString()
});
```
All errors are published to the Event Bus under the `'tool_error'` channel for delivery.
