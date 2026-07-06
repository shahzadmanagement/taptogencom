# RAG Platform Architecture Standards

This document describes how retrieved context blocks are injected into prompts templates and processed.

---

## 1. RAG Execution Pipeline

```
         [ User Question Query ]
                    │
                    ▼
          [ retrieveChunks() ]
                    │
                    ▼
        [ buildPromptContext() ]
                    │
                    ▼
        [ AI Router text generate ]
```
Answers return with citations metadata mapping source references cleanly.
