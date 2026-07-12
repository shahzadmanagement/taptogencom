# Progressive Feature Rollout Status Map

This report details progressive release allocations, targeting rules, and active release stages.

---

## 1. Rollout Matrix

| Feature ID | Rollout Stage | Target Categories | Excluded Cohorts |
| --- | --- | --- | --- |
| `enable_new_workspace_design` | **10% Canary** | `text-font-generators` only | Desktop users only |
| `enable_quick_action_cards` | **100% General** | All | Blocked if parent layout is inactive |
| `enable_experimental_features` | **0% Draft** | Sandbox | Locked |

---

## 2. Dynamic Rollout Rules
Rollouts respect deterministic user hash buckets. Visitors falling within the threshold bucket get the feature enabled, preserving stable assignments.
