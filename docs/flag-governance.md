# Feature Flag Governance Policy

This document defines the lifecycle states and deprecation schedules for progressive delivery feature flags.

---

## 1. Feature Flag States

Every flag defined in the registry must conform to one of the following lifecycle states:
- **`draft`**: Beta sandbox development. Never exposed to production traffic.
- **`active`**: Currently rolling out to production traffic.
- **`paused`**: Emergency mute. Resolves to `false` for all traffic cohorts.
- **`deprecated`**: Marks flag for deletion. Code clean-ups should proceed.
- **`archived`**: Flag has been deleted from client paths. Kept for audit logs.

---

## 2. Deprecation Audits

To prevent code bloating:
- **Lifetime Limit**: Deployed flags must be cleaned up within 60 days of achieving 100% rollout.
- **Topological Dependency Scans**: Run configurations through `runGlobalFlagChecks()` weekly to detect orphans.
