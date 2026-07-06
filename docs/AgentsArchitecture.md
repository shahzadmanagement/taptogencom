# AI Agents Platform Architecture

This document describes how registries, session trackers, and model execution steps are structured.

---

## 1. Executor Orchestration

We execute model queries using unified providers parameters:
* **`AgentRegistry`**: Stores configurations descriptions.
* **`executeAgentStep()`**: Formulates system prompts and fetches answers.
