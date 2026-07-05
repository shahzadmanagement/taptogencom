# Multi-Tier Caching Strategy

This guide describes how memory caches and storage layers operate.

---

## 1. Cache Storage Tiers

* **Memory Cache**: Maps transient values within memory lists for quick retrieval.
* **Session Cache**: Wraps `sessionStorage` to persist properties across tab reloads.
* **LocalStorage Cache**: Caches persistent values locally across multiple browser sessions.

---

## 2. Eviction & Versioning

* **Time-to-Live (TTL)**: Restricts entry lifespan. Expired entries are automatically evicted.
* **Version Invalidation**: If the cache registry version updates, older cached keys are invalidated to fetch fresh data.
