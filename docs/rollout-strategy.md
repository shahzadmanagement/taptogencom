# Experiment Rollout Strategy

This document details the progressive rollout policy for active experiments on the TapToGen platform.

---

## 1. Gradual Traffic Rollouts

All experiments support a traffic allocation threshold (`trafficAllocation` parameter ranging from `0.0` to `1.0`):
- **0% Rollout (Draft)**: Allocates all users to `'control'`.
- **10% - 25% Rollout (Pilot)**: Low-exposure phase to verify layout performance and error tracking logs in production.
- **50% Rollout (Balanced)**: Medium-exposure phase to begin collecting metrics.
- **100% Rollout (Active)**: Full traffic exposure to reach statistical significance.

---

## 2. Dynamic Kill Switches

To avoid emergency hotfixes, developers can trigger browser-level kill switches via `localStorage`:
- **Global**: `localStorage.setItem('taptogen-ab-kill-global', 'true')`
- **Category-specific**: `localStorage.setItem('taptogen-ab-kill-category-[category_slug]', 'true')`
- **Tool-specific**: `localStorage.setItem('taptogen-ab-kill-tool-[tool_slug]', 'true')`
- **Experiment-specific**: `localStorage.setItem('taptogen-ab-kill-experiment-[id]', 'true')`

If active, the bucketer engine immediately bypasses assignments and returns `'control'`.
