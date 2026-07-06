# Logging Transports Architecture

This document describes log delivery targets across browser consoles and remote endpoints.

---

## 1. Non-Blocking remote log delivery

* Remote logs transmit asynchronously using `navigator.sendBeacon` to keep thread load free of request overhead delays.
* Development runs use standard console formatting.
