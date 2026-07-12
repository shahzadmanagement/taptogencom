# Developer Experimentation Guide

This guide walks developers through creating, registering, integrating, and launching A/B experiments on the TapToGen platform.

---

## 1. How to Register a New Experiment

All experiments must be registered in the `EXPERIMENT_REGISTRY` object inside [`src/lib/ab-testing.ts`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/lib/ab-testing.ts).

### Example Registry Entry
```typescript
'cta_button_text_experiment': {
  id: 'cta_button_text_experiment',
  name: 'CTA Button Text Experiment',
  description: 'Test alternative copy call-to-actions (Generate vs Create Now)',
  status: 'active', // 'draft' | 'active' | 'paused' | 'archived'
  variants: ['control', 'create_now', 'start_free'],
  trafficAllocation: 0.5, // 50% of incoming users get assigned to test variants
  startDate: '2026-07-10',
  endDate: '2026-08-10'
}
```

---

## 2. Integrating Variant Layouts on Pages

Because our platform renders static pages, variants should be handled dynamically in client-side scripts.

### Code Integration Example
```typescript
import { triggerExposure } from '@/lib/ab-testing';

// Initialize exposure log and get variant
const variant = triggerExposure('cta_button_text_experiment');

const generateBtn = document.getElementById('generate-btn');
if (generateBtn) {
  if (variant === 'create_now') {
    generateBtn.textContent = 'Create Now';
  } else if (variant === 'start_free') {
    generateBtn.textContent = 'Start Free';
  } else {
    generateBtn.textContent = 'Generate'; // control
  }
}
```

---

## 3. Launching and Ending Experiments

### Life Cycle States
1. **Draft**: Configured but not executed. `getVariant` resolves to `'control'`.
2. **Active**: Live for allocated traffic. Exposure tracking events fire.
3. **Paused**: Exposure logging suspended. All users receive `'control'`.
4. **Archived**: Completed. The winning variant should be codified permanently in the main files, and the registry entry removed.
