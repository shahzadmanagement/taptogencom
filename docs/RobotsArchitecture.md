# Robots.txt Policies Architecture

This document describes how crawler rules are configured for various search engines.

---

## 1. Automated Generation

* **Script**: [`scripts/generate-robots.ts`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/scripts/generate-robots.ts) builds `public/robots.txt` dynamically.
* **Allow/Disallow**: Blocks access to internal folders while granting full access to public tool views.
