# Internal Link Engine Architecture

This document describes internal link logic.

---

## 1. Dynamic Linking Resolution

The linking manager `internalLinks.ts` computes links dynamically:
1. First-tier: Resolves explicit tags related list.
2. Second-tier: Resolves siblings category templates.
3. Third-tier: Resolves general popular tools.
