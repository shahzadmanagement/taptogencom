# Progressive Delivery & Rollout Guide

Progressive delivery controls exposure levels to verify feature performance and catch regressions early.

---

## 1. Percentage Rollout Buckets

The platform evaluates the user's stable UUID seed in FNV-1a to determine bucket ranges:
- **1% to 10% (Canary Release)**: Minor sample cohort to verify client stability.
- **25% to 50% (Phased Release)**: Broader evaluation phase.
- **100% (Full Release)**: Deployed to all matching visitors.

---

## 2. Emergency Override Options

Overrides bypass normal allocation logic without requiring a fresh deployment:
- **URL Parameter Override**: Append `?flag_[flag_id]=true` (or `false`) to force states.
- **Debugger Console Override**: Select options inside the Debugger Panel to lock override states in `localStorage`.
