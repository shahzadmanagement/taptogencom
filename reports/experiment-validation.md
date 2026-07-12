# Experiment Configuration Validation Audit

This report contains validation results of the Experiment Registry, checking for conflict hazards, expirations, and syntactic consistency.

---

## 1. Global Diagnostics Log

```
[SYSTEM INFO] Booting Experiment Validation Engine...
[SUCCESS] Loaded 5 experiment configurations.
[HEALTH CHECK] Running rules for active, draft, completed, and archived tests:
  - Checking duplicate identifiers... OK (0 duplicates)
  - Checking traffic allocation ranges... OK
  - Checking weights distribution sum... OK
  - Checking variant snake_case naming... OK
  - Checking dependency paths validity... OK
  - Checking mutual exclusions overlaps... OK (cta_buttons_experiment/output_cards_experiment overlap resolved via exclusions)

[STATUS] 5/5 configurations valid. Validation Score: 100/100.
```

---

## 2. Dynamic Override Status
No active local overrides or forced debug assignments are recorded in baseline configurations. Override priority parameters function correctly.
