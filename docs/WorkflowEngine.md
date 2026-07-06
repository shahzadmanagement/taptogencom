# Workflow Engine standards

This guide describes workflow schemas, state tracking context maps, and run histories traces.

---

## 1. Running Steps

Steps are resolved sequentially through `workflowRunner.ts`. Failure triggers logs record and sets the status to `FAILED`.
