# Deployment Architecture Standards

This document describes how env profiles, version manager details, and deployment logs are structured.

---

## 1. Environments Definition

We support distinct running environments defined under `environment.ts`:
* **`development`**: Local testing.
* **`production`**: Live end-user traffic on Vercel Edge networks.
