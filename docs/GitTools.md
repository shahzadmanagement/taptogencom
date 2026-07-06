# Git Tools & Connectors

This guide details shell commands wrapper bindings for Git checks, commit pushes, and branch queries.

---

## 1. Commit automation

Commit operations escape message strings to execute cleanly under subshells:
```typescript
import { commitChanges } from './gitCommit';

await commitChanges('feat: Add search platform');
```
This enables agent platforms to stage and save updates dynamically.
