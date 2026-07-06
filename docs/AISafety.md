# AI Safety & Request Validations

This guide details input keyword blocklists, rate limiting, and response type validations.

---

## 1. Input Safety

Prompts are checked against a blocklist. Blocklisted inputs are rejected immediately to protect the models from exploitation attempts.
