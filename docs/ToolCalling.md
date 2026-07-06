# Tool Calling Engine

This guide details tool registrations schema structures, validator checks, and execution wrappers.

---

## 1. Parameters validation

Tool inputs check parameter presence and type compliance matches before invoking handlers:
```typescript
import { executeTool } from './toolExecutor';

const res = await executeTool('action-name', { param: 'val' });
```
This keeps execution operations clean of malformed arguments hazards.
