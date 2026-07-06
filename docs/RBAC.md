# Role-Based Access Control (RBAC)

This guide describes roles registry, actions permissions, and recursive inheritance rules.

---

## 1. Inheritance Checking

RBAC checks permissions recursively based on inheritsFrom roles parameters:
```typescript
import { checkPermission } from './rbac';

const isAuthorized = checkPermission('moderator', 'read_tools');
```
This isolates viewer/admin layers cleanly.
