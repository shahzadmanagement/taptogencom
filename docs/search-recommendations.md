# Related Tools Recommendation Engine

This document details the scoring algorithm, weights configuration, disjoint sorting, and integration of the Recommendation Engine.

---

## 1. Scoring Logic & Weights

Recommendations are evaluated using a deterministic scoring model with five main weights:
- **`category`** (Weight: `5.0`): Candidate belongs to same category slug.
- **`generator`** (Weight: `2.5`): Candidate shares same tool generator type.
- **`keywords`** (Weight: `1.5`): Applied per keyword overlapping matches.
- **`intent`** (Weight: `0.5`): Applied per user intent token overlap.
- **`popularity`** (Weight: `1.0`): If candidate is a popular tool.

---

## 2. Disjoint List Distribution
To maximize tool discovery without displaying duplicate cards:
1. Sort candidate tools by final score descending.
2. Group results into three completely disjoint arrays:
   - **Related Tools**: Top 4 matches.
   - **You May Also Like**: Next 4 matches.
   - **Frequently Used Together**: Next 4 matches.

---

## 3. Performance Timing & Caching
- **Caching**: Cached in-memory by keying `target_slug` to disjoint groups.
- **Complexity**: $O(N \log N)$ where $N = 430$ tools. Under cache hits, retrieval takes less than **0.01 ms**.
