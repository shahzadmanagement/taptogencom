# Bundle Optimization & Loading Rules

This document outlines strategies for loading platform scripts quickly.

---

## 1. Resource Hints Injection

* **Preconnect**: Establishes early TCP/TLS connections to asset domains on load.
* **Preload**: Pre-fetches high-priority layout assets.
* **Prefetch**: Fetch links and templates in the background on idle.

---

## 2. Dynamic ESM Chunks

Dynamic imports ensure client payloads are minimal on load, and chunks hydrate asynchronously on DOM Interactive triggers.
