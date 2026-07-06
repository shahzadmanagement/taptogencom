# API Keys & Request Signature Platform

This guide describes API Key generation, verification scopes, and HMAC request signing.

---

## 1. Request Signing

Signature parameters are generated via HMAC key secrets:
```typescript
import { signRequest } from './requestSigning';

const sig = signRequest('secret-key', 'request-payload');
```
This protects requests from header modification hazards.
