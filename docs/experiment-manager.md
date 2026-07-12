# Enterprise Experiment Manager User Guide

The Experiment Manager is a client-side dashboard panel built for developers to monitor active tests, force overrides, and trigger kill switches.

---

## 1. Accessing the Manager

In development mode (`process.env.NODE_ENV === 'development'`), the manager panel automatically mounts to the bottom-right corner of the page.

To open the panel programmatically, call:
```javascript
import { injectDebugPanel } from '@/lib/ab-testing';
injectDebugPanel();
```

---

## 2. Interactive Panel Sections

### ⚙️ Tests Tab
Lists all experiments declared in the registry with their current status, owner, description, and assigned variant.
- Use the drop-down selectors next to each experiment to instantly force a variant.
- Forcing a variant updates `localStorage` and triggers a clean page reload.

### 🛑 Kills Tab (Kill Switches)
Enables emergency overrides without requiring deployment.
- **Global Kill Switch**: Instantly returns all experiments across all pages to `'control'`.
- **Category Kill Switch**: Disable experiments matching specific categories (e.g. `text-font-generators`).

### 🩺 Health Tab
Runs real-time client-side diagnostics to flag configuration warnings, dependencies issues, or expired campaigns.
