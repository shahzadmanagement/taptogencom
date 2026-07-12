# Event Catalog & Schema Mappings

This catalog lists the telemetry event vocabulary, priorities, and schemas.

---

## 1. Observability Events List

### `page_view` (Priority: Medium)
- **Description**: Triggered when a visitor views a page.
- **Payload Schema**:
  ```json
  {
    "path": "/tools/fancy-text-generator",
    "referrer": "",
    "session": { "sessionId": "abc123xyz" }
  }
  ```

### `tool_open` (Priority: Medium)
- **Description**: Triggered when a tool page workspace initialises.
- **Payload Schema**:
  ```json
  {
    "toolSlug": "fancy-text-generator",
    "session": { "sessionId": "abc123xyz" }
  }
  ```

### `tool_generate` (Priority: High)
- **Description**: Triggered when a generation query completes.
- **Payload Schema**:
  ```json
  {
    "toolSlug": "fancy-text-generator",
    "metadata": { "length": 45 },
    "session": { "sessionId": "abc123xyz" }
  }
  ```

### `tool_copy` (Priority: High)
- **Description**: Triggered when output is copied to keyboard buffer.

### `tool_error` (Priority: High)
- **Description**: Uncaught runtime errors and workspace crashes.
