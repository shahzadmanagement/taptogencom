# Production Analytics configuration guidelines

Follow this list to initialize Plausible or PostHog credentials on production instances.

---

## 1. Credentials Configuration

1. Initialize measurements keys under dynamic variables config.
2. Bind actions to event trackers:
```typescript
import { eventBus } from '../analytics/eventBus';

eventBus.publish('button_click', { itemId: 'download' });
```
This automatically updates GA/PostHog stats.
