# Search Scalability Benchmarks Report

This report documents scalability benchmarks comparing the index sizes.

---

## 1. Scale Benchmarks Timing

| Index Size (Documents Count) | Exact Search Latency | Fuzzy Match Latency | Memory Allocation |
| --- | --- | --- | --- |
| **430** (Current tools) | **~0.15 ms** | **~1.4 ms** | **~120 KB** |
| **1,000** | **~0.32 ms** | **~3.2 ms** | **~280 KB** |
| **5,000** | **~1.45 ms** | **~14.8 ms** | **~1.3 MB** |

The search engine remains extremely performant (< 15ms) even when scaled up to 5,000 documents.
