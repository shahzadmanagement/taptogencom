# Search Quality Scoring Specifications

This document defines the metrics, weighting criteria, and formulas used to calculate Search Quality.

---

## 1. Metrics Scorecard

Search Quality evaluates five core signals:
- **`relevance`** (0-100): Matches result token counts and is penalized by latency.
- **`coverage`** (0-100): Percentage of matched documents relative to limits.
- **`intentAccuracy`** (0-100): Evaluates if terms align with categorized intents.
- **`ctrScore`** (0-100): 100 if user clicked a card, 0 otherwise.
- **`satisfaction`** (0-100): Weighted formula combining clicks, relevance, and coverage.

$$\text{Satisfaction} = (\text{Relevance} \times 0.4) + (\text{Coverage} \times 0.2) + (\text{CTR} \times 0.4)$$

---

## 2. Overall Quality Score
Consolidates all signals:
$$\text{Overall Quality} = \frac{\text{Relevance} + \text{Coverage} + \text{Intent} + \text{CTR} + \text{Satisfaction}}{5}$$
Scores are computed per query and stored in the analytics log to measure search quality over time.
