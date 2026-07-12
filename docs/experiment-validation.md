# Experiment Validation & Health Auditing

This guide describes how to run validation checks and analyze statistical outcomes for active experiments.

---

## 1. Validation Logic & Diagnostics

The experiment validator in [`src/lib/ab-validator.ts`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/lib/ab-validator.ts) inspects:
- **Variant Names**: Must match `snake_case` naming conventions.
- **Traffic Allocation**: Must reside between `0.0` and `1.0`.
- **Weight Allocations**: Sum of weights must equal exactly `1.0` (100%).
- **Dependency Paths**: Confirms prerequisite dependencies exist and are active.
- **Conflict Scenarios**: Flags overlaps in active targeting when mutual exclusions are missing.

---

## 2. Success Lift & Significance

Statistical significance determines if a variant outperforms control. We calculate z-score confidence levels client-side:
- **Conversion Lift**: Measures percentage changes in conversion rate relative to baseline.
- **Z-Score Formula**: Calculates standard deviation gaps to determine if variant lifts are statistically significant.
- **Confidence Interval**: Expressed as percentage probability (e.g. `95%` or higher indicates robust success).
