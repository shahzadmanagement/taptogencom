# Knowledge Base & Chunking Standards

This guide describes knowledge base document mapping registers, sliding window sliding chunks segmentations, and source citations extraction.

---

## 1. Sliding Text Chunking

We split documents content using sliding margins to keep semantic parameters contiguous:
```typescript
import { chunkText } from './chunking';

const chunks = chunkText('doc-id', 'document-content-text-body', 500, 100);
```
Citations are generated to trace outputs back to original source documents.
