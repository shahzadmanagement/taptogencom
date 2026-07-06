# Terminal shell sandbox execution

This guide details sandboxing policies, restricted commands blacklists, and run process managers.

---

## 1. Safety Policies

Commands match patterns blacklists before executing:
* **Blocked**: `rm -rf`, `shutdown`, `reboot`, `format`.
* **Process Tracking**: Handles child processes register to allow clean task termination.
