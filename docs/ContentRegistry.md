# Centralized Content Registry

This document lists details on programmatic content registration parameters for platform tools.

---

## 1. Schema Properties

Every tool registers content inside `src/data/content-registry.ts` matching the following properties:

```typescript
export interface ToolMetadata {
  slug: string;
  tags: string[];
  intro: string;
  compatibility: string;
  useCases: string[];
}
```

---

## 2. Shared Assets Databases

To avoid boilerplate content duplication, general examples are fetched from [`src/data/examples-registry.ts`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/data/examples-registry.ts) dynamically on load.
