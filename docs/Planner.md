# Execution Planners & Task Queues

This document describes how abstract goals translate into planned queue tasks lists.

---

## 1. Plan Compilation

Goal inputs compile into PlannedTask sets scheduled sequentially in `taskQueue.ts`.
This guarantees steps execute in order under the planner controller.
