# Platform Engineering Overview

This guide details the core frameworks of the TapToGen platform.

---

## 1. Feature Flag Controls

Feature flags are centralized under `src/platform/featureFlags.ts`.
By using these flags, tool workspaces dynamically adjust loaded dependencies, decreasing JS payloads.

---

## 2. Observer Layers & Analytics

Analytics abstractions are registered inside `src/platform/analytics.ts`.
A custom `AnalyticsProvider` interface enables the plug-and-play addition of third-party platforms (like PostHog, Plausible, or Google Analytics) without modifying the source code of individual workspace components.

---

## 3. Diagnostics & Health Controls

Dynamic checks are defined in `src/platform/health.ts` to verify:
* Registry consistency (slug matching configurations).
* Crucial interface nodes presence (input and output textareas).
