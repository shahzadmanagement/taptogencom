# Production Feature Flags Platform

This document describes the design and API usage of the client-side progressive feature flag delivery platform built for TapToGen.

---

## 1. Evaluation Mechanics

Feature flags are evaluated client-side to prevent SSR lag and page load shifts. They can be triggered by calling:
```typescript
import { isFeatureEnabled } from '@/lib/feature-flags';

if (isFeatureEnabled('enable_new_workspace_design', 'fancy-text-generator', 'text-font-generators')) {
  // Render new spacious layout features
}
```

---

## 2. Advanced Targeting Qualifiers

The flag evaluation engine matches request parameters against registry targets:
- **Viewport Targeting**: Detects client width limits to enable `mobile_only`, `tablet_only`, or `desktop_only`.
- **Locale Targeting**: Evaluates international locale settings.
- **Dependency Paths**: Prevents flags from loading unless parent prerequisite features are active.
