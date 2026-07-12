# Search Performance Optimizations

This document details the background indexing scheduler, idle-time requestIdleCallback task distribution, and incremental index mappings.

---

## 1. Asynchronous CPU Idle-time Scheduling

To maintain main thread responsiveness during page loads, the indexer schedules heavy rebuilding tasks during CPU idle intervals:
- **`requestIdleCallback`**: Utilized to trigger the indexing phase. If unavailable, falls back to a 1ms timeout wrapper.
- **Benefits**: Zero latency impact on user typing inputs.

---

## 2. Incremental Indexing
Instead of reconstructing the entire index when new generator options load:
- **Incremental append**: `addIncrementalDocs` adds new document slices directly to the existing index array.
- **Latency impact**: Avoids $O(N)$ rebuilding cycles.
