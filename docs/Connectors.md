# Service Connectors Platform Architecture

This document describes REST integrations registries, configuration state managers, and connectivity health validation checks.

---

## 1. Connector Configurations

We register API integration setups using config keys mappings:
* **`ConnectorConfig`**: Base settings definitions.
* **`checkConnectorHealth()`**: Scopes connection properties availability.
* **`retryTask()`**: Retries fail handlers with exponential delay intervals.
