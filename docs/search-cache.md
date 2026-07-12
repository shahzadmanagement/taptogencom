# Search LRU Cache Specification

This document details the LRU Cache capacity controls, TTL policies, and warmup triggers.

---

## 1. LRU Cache Mechanics

The search cache keeps results fresh while preventing memory leaks:
- **Maximum Capacity**: Constrained to **500 entries** by default.
- **Eviction Strategy**: Evicts Least Recently Used entries first by tracking the `lastUsed` timestamps.
- **Time-to-Live (TTL)**: Entries expire automatically after **5 minutes** (300,000 ms).

---

## 2. Warmup & Prefetching
- **Pre-warm**: Automatically populates cache records with trending terms ("fancy text") during browser idle cycles.
- **Prefetching**: Queries are evaluated and cached asynchronously before the user opens the dialog.
