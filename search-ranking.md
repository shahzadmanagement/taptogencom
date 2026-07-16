# AI Search Ranking & Relevancy Report

This report analyzes ranking signals, time-decay metrics, and scoring outcomes.

---

## 1. Scoring Boost Matrix

| Boost Type | Value Increment | Target Conditions | Purpose |
| --- | --- | --- | --- |
| **Popularity** | `+1.5` | Tool popularity flag active | Promotes high-value hubs |
| **CTR** | `+1.0` | Simulated CTR > 8% | Selects high-engagement tools |
| **Freshness** | `+0.5` | Recently updated | Keeps new tools visible |
| **Recent Clicks** | Up to `+3.0` | Dynamic usage with decay | Ranks user favorites first |

---

## 2. Time-Decay Decay Speeds

| Elapsed Time | Decay Factor | Initial Click Weight (Count = 2) |
| --- | --- | --- |
| 0 hours | `1.000` | **2.000** (Full boost: `+3.0` score) |
| 12 hours | `0.548` | **1.096** |
| 24 hours (1 day) | `0.301` | **0.602** |
| 72 hours (3 days) | `0.027` | **0.054** (Decayed) |

---

## 3. Relevancy Latency Timing
- **Personalization Scoring Latency**: **~0.03 ms** (runs instantly at sorting phase).
- **History Retrieval**: **< 0.01 ms** (O(1) local read).
