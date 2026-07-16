# Rollout Status & Gradual Exposure Map

This report maps the gradual exposure parameters, rollout phases, and deployment targets for active experiments.

---

## 1. Rollout Matrix

| Experiment ID | Status | Allocation Rate | Release Stage | Cohort Targeting |
| --- | --- | --- | --- | --- |
| `hero_layout_experiment` | Active | **100%** | Full Rollout | Desktop Only |
| `output_cards_experiment` | Active | **50%** | Balanced Pilot | All Devices |
| `related_tools_experiment` | Active | **100%** | Full Rollout | All Devices |
| `examples_experiment` | Active | **100%** | Full Rollout | All Devices |
| `cta_buttons_experiment` | Active | **100%** | Full Rollout | All Devices |

---

## 2. Emergency Stop (Kill Switch) Configuration
Kill switches can be triggered client-side by setting localStorage values (e.g. `taptogen-ab-kill-global = true`). No redeploy is necessary to pause an active test.
