# Multi-Provider AI Platform Architecture

This document describes how provider clients, prompt compiles, and routing logic are structured.

---

## 1. Provider Abstraction

We decouple model calls from the application logic via `provider.ts` interfaces:
* **`OpenAIProvider`**
* **`GeminiProvider`**
* **`AnthropicProvider`**
