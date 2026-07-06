# AI Model Routing & Fallbacks

This guide details router logic and model failover strategies.

---

## 1. Failover Strategy

If a routed model call (e.g. OpenAI) fails, the router catches the exception and immediately falls back to Gemini, preventing service degradation.
