# Analytics Platform Architecture

This document describes how analytical events are routed across providers using a centralized pub-sub channel.

---

## 1. Event Bus Routing

The event bus decouples client actions from analytic implementations.

```
       [ Client interaction click ]
                    │
                    ▼
          [ eventBus.publish() ]
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
    [ Plausible ]        [ PostHog ]
```
Individual providers register subscriptions on load.
