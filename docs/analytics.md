# Production-Grade Analytics System

This document outlines the design, architecture, and schema for the unified client-side tracking system in the TapToGencom platform.

---

## 1. System Design

The analytics system is designed to provide zero-dependency, fail-safe, non-blocking tracking of user interactions.

Key architectural points:
- **Centralized implementation**: Defined in [`src/lib/analytics.ts`](file:///src/lib/analytics.ts).
- **Graceful degradation**: Checks for browser globals (`gtag`, `va`) dynamically. If analytics blocks are missing, blocked by adblockers, or disabled, it falls back silently to local logs (in development) and never throws runtime exceptions.
- **Fail-safe wrapper**: Every public function is wrapped inside a robust `try-catch` block to guarantee that analytics issues never disrupt tool generation workflows.
- **Unified workspace binding**: Fully wired inside [`tool-workspace.ts`](file:///src/scripts/tool-workspace.ts) and [`downloads.ts`](file:///src/scripts/workspace/downloads.ts) to track actions across all 430 generators automatically without duplicate event listener wiring.

---

## 2. Event Taxonomy & Schema

The following custom events are dispatched to the analytics providers:

### `generator_open`
Fires automatically when a generator tool workspace loads in the browser.
- **Payload**:
  - `generator_slug` (string): The unique URL slug of the generator (e.g., `fancy-text-generator`).

### `generator_generate`
Fires whenever a user initiates a text or data generation sequence.
- **Payload**:
  - `generator_slug` (string): The slug of the active generator.

### `generator_copy`
Fires when the user copies the entire output content or individual intent cards.
- **Payload**:
  - `generator_slug` (string): The slug of the active generator.

### `generator_download`
Fires when the user exports outputs to local files (`.txt`, `.html`, `.json`).
- **Payload**:
  - `generator_slug` (string): The slug of the active generator.

### `generator_share`
Fires when the user copies the shareable page URL.
- **Payload**:
  - `generator_slug` (string): The slug of the active generator.

### `generator_option_change`
Fires whenever a select dropdown, numeric field, or checkbox option is updated.
- **Payload**:
  - `generator_slug` (string): The slug of the active generator.
  - `option_id` (string): The unique ID of the input option element.
  - `option_value` (string): The stringified value of the new state (e.g. `"true"`, `"dark"`, etc.).

---

## 3. GA4 & Vercel Analytics Integration

### Google Analytics 4 (GA4)
Events are dispatched using the standard `gtag.js` tracking interface:
```javascript
window.gtag('event', event_name, params_object);
```

### Vercel Analytics
Dispatched via custom Vercel Analytics tracking if Vercel packages are active:
```javascript
window.va('event', { name: event_name, data: params_object });
```

---

## 4. Local Diagnostics Fallback
In development (`process.env.NODE_ENV === 'development'`), events are cleanly printed in the browser console for testing and verifying tag layouts:
```text
[Analytics Event]: generator_option_change { generator_slug: "nda-generator", option_id: "pass29-style", option_value: "overview" }
```
