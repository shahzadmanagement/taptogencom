# Governance & Audit Logging Standards

This guide details role-based access lists, change logs histories, and policies enforcement.

---

## 1. Role Permission checks

Roles evaluate access before invoking settings modifications:
* **`viewer`**: Allowed dashboard query reads.
* **`operator`**: Allowed dashboard query reads and feature toggling.
* **`admin`**: Allowed all system adjustments.
