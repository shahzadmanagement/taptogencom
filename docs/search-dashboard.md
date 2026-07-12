# Developer Search Dashboard

This document describes the structure and widgets of the search metrics dashboard sandbox panel.

---

## 1. Widget Layout

The developer-only dashboard renders search diagnostics:
- **Telemetry Counter**: Realtime successful vs. zero-result search runs.
- **Latency Histogram**: Displays loop execution durations (average targeted under < 2.5 ms).
- **Funnel Drop-offs**: Visualizes conversion from query input to tool execution.
- **AI Intent Distribution**: Categorizes natural language intent groups (e.g. Fancy Text vs Nicknames).

---

## 2. Analytics Export Control
- **Format Toggle**: Allows downloading logs as **JSON** files or standard comma-separated **CSV** logs.
