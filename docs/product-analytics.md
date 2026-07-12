# Product Analytics & Session Tracking

This document outlines session management, visitor tracking, and funnels calculations.

---

## 1. Visitor Session Lifecycle

The product analytics module (`src/lib/product-analytics.ts`) instantiates stateful visitor scopes client-side:
- **`sessionId`**: Unique string persisted in `sessionStorage` (resets when browser tab closes).
- **`visitNumber`**: Persisted in `localStorage` to increment across multiple visits.
- **`isReturning`**: Resolves to `true` if `visitNumber > 1`.
- **`pagesViewed`**: Dynamic array collecting all unique paths loaded in the active session.

---

## 2. Tool Flow Funnels

Conversion funnels track progressive actions taken by visitors:
1. `page_view` (Visitor lands on site).
2. `tool_open` (Visitor views a generator tool workspace).
3. `tool_generate` (Visitor triggers the generate action).
4. `tool_copy` (Visitor copies the output).
