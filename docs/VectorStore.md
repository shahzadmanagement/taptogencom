# Vector Storage Abstraction Standards

This document details abstract vector provider interfaces, cosine similarity formulas, and in-memory search indexes.

---

## 1. Cosine Similarity Formula

We compare embedding vectors using normalized dot product calculations:
```typescript
import { cosineSimilarity } from './similarity';

const similarity = cosineSimilarity(vectorA, vectorB);
```
This isolates provider-specific database drivers (e.g. Pinecone/Chroma) from model operations layers.
