# Short & Long-Term Memory systems

This document details sliding context buffers and vector store memories maps.

---

## 1. Sliding short-term buffer

Short-term records are limited to a sliding count threshold to keep token usage within models context limits:
```typescript
import { shortTermMemory } from './shortTermMemory';

shortTermMemory.addMessage('user', 'query');
```
Long-term elements map directly to similarity indexes.
