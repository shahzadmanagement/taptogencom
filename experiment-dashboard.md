# Experiment Manager Dashboard Report

This dashboard lists all experiments configured in the registry, their states, targeting metrics, and allocations.

---

## 1. Registry Status Grid

| Experiment ID | Status | Allocation | Target Devices / Cohorts | Owner | Start Date | End Date |
| --- | --- | --- | --- | --- | --- | --- |
| `hero_layout_experiment` | **Active** | 100% | Desktop Only | Growth | 2026-07-12 | 2026-08-12 |
| `output_cards_experiment` | **Active** | 50% | All | UX | 2026-07-12 | 2026-08-12 |
| `related_tools_experiment` | **Active** | 100% | All | Growth | 2026-07-12 | 2026-08-12 |
| `examples_experiment` | **Active** | 100% | All | Product | 2026-07-12 | 2026-08-12 |
| `cta_buttons_experiment` | **Active** | 100% | All | Growth | 2026-07-12 | 2026-08-12 |

---

## 2. Key Observations
- All five primary user engagement experiments are deployed, running at their targeted rollout allocations.
- Overlapping conflict risks (between output cards and CTA buttons) are guarded through mutual exclusions.
