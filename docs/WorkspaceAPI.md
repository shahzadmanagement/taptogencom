# Workspace Entry API

This document details parameters and interface definitions for workspace loaders.

---

## 1. `createWorkspace()`

```typescript
export async function createWorkspace(
  toolSlug: string,
  input: HTMLTextAreaElement,
  output: HTMLElement,
  generate: () => void
): Promise<void>
```

### Parameters
* **`toolSlug`** (`string`): The identifier of the active tool matching its config registration.
* **`input`** (`HTMLTextAreaElement`): The primary user input textarea node.
* **`output`** (`HTMLElement`): The target output node rendering conversions.
* **`generate`** (`() => void`): The baseline generation callback function.
