# Authentication Platform Architecture

This document describes how password hashing, JWT credentials, sessions, and OAuth providers are structured.

---

## 1. Credentials Verification Flow

```
          [ Login request ]
                  │
                  ▼
         [ verifyPassword() ]
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
    [ generateToken() ]   [ createSession() ]
```
Active user profiles authenticate securely against this service block.
