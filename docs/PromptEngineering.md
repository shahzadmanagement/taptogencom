# Prompt Engineering Standards

This guide describes variables compilation formats and templates.

---

## 1. Templates Registry

Prompts templates define placeholders variables compiled on load:
```typescript
import { compilePrompt } from './prompts';

const prompt = compilePrompt('seo-meta', { topic: 'Astro Web App' });
```
This guarantees consistent prompt inputs quality.
