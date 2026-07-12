# AI Search Ranking & Personalization

This document details the personalization parameters, frequency tracking, and time-decay functions of the AI Search Ranking engine.

---

## 1. Weighted Ranking Signals

Personalized result ordering is computed dynamically using five distinct signals:
- **Base Score**: Relevance from semantic synonyms matching.
- **Popularity Boost**: Adds `+1.5` for tools matching high-exposure cohorts.
- **CTR Boost**: Adds `+1.0` if click-through rates exceed `8%`.
- **Freshness Boost**: Adds `+0.5` for tools updated recently.
- **Recent Usage Boost**: Adds up to `+3.0` based on visitor usage history.

---

## 2. Click Frequency & Time-Decay Scoring

To reflect shifting user interests, clicked tools decay over time:
- **Click Storage**: Recorded in `localStorage` inside `taptogen-clicked-history`.
- **Decay Formula**:
  $$\text{Score} = \text{Count} \times e^{-\lambda t}$$
  Where:
  - $\text{Count}$: raw click frequency count.
  - $\lambda$: decay constant (set to `0.05` hourly).
  - $t$: time elapsed in hours since the last click.
- Recent usage scores guarantee frequently utilized tool pages rise to the top of results during ambiguous searches.
