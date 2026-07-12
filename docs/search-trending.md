# Search Trending Engine

This document details the algorithms, time windows, and spike calculations of the query trending engine.

---

## 1. Time-decay Scoring

Trending scores are calculated over three distinct rolling periods:
- **Trending Today**: 24-hour window, applying a popularity weight factor of `1.5`.
- **Trending Week**: 168-hour window, applying a popularity weight factor of `1.2`.
- **Trending Month**: 720-hour window, applying a popularity weight factor of `1.0`.

---

## 2. Fast-Rising Query Spikes
- **Spike Formula**:
  $$\text{Spike Ratio} = \frac{\text{Today Count} - \text{Yesterday Count}}{\text{Yesterday Count}}$$
- Queries with a Spike Ratio exceeding `0.5` are marked as **Fast Rising** queries and elevated inside recommendation components.
