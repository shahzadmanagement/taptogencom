# Platform Administration Guide

This guide details configuration governance, deployment release checkpoints, and feature rollouts verification workflows.

---

## 1. Governance verification

Always run verification before staging code modifications:
```bash
node scripts/check-governance.js
```
This guarantees mfa enforcement and variables configurations parameters conform to release standards.
