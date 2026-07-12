# Search Analytics Engine

This document details the telemetry fields, storage buffers, and metrics formulas of the Search Analytics platform.

---

## 1. Tracked Events & Fields

The engine captures search telemetry via the following events:
- **`Started`**: Triggered when query matches start.
- **`Completed`**: Captures matched count, latency, and query string.
- **`ZeroResults`**: Captures queries that yielded empty results.
- **`ResultClicked`**: Tracks the selected tool card and its list index position.

### Captured Metadata
Each event payload records:
- `query`, `normalizedQuery`, `detectedIntent`
- `resultCount`, `searchLatency` (ms), `confidenceScore` (0-100)
- `clickedTool` (slug), `clickPosition`
- `sessionId`, `deviceType` (mobile/desktop), `locale`

---

## 2. Metrics Aggregations

Consolidated insights are computed locally:
- **Zero Result Rate**: Failed query counts / Total queries.
- **Search Click CTR**: Result click count / Completed queries.
- **Average Latency**: Search loop execution times / Completed queries.
