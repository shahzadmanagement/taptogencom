# Feature Flags & Progressive Rollouts

This guide describes features registries, A/B experiments, and user ID percentage rollouts.

---

## 1. Experiments Variations

Variations resolve consistently based on user hashing:
```typescript
import { experiments } from './experiments';

const variation = experiments.getVariation('new-feature', 'user-id-985');
```
This isolates tests groups clean from rendering skew risks.
