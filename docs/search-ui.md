# Production Search UI Component

This document outlines the user interface design, accessibility combobox compliance, keyboard shortcuts, and tracking attributes of the Search UI component.

---

## 1. Spotlight Overlay Triggering

The Search UI is designed as a floating spotlight dialog to prevent layout shifts.
- **Trigger Hotkey**: `Ctrl+K` or `/` opens the dialog.
- **Trigger Element**: Floating search toggle pill injected fixed to the screen top-right.

---

## 2. Keyboard & Accessibility Traversal (WAI-ARIA Combobox)

The search modal complies with standard WAI-ARIA ComboBox specifications:
- **`role="combobox"`**: Injected on the root query block.
- **`role="listbox"`**: Marks the results list container.
- **`role="option"`**: Assigned to individual result items.
- **Arrow Keys**: `ArrowDown` and `ArrowUp` cycle the focus indexes of results.
- **Enter Key**: Activates the selected tool card and saves history.
- **Escape Key**: Instantly closes the search dialog modal.

---

## 3. Storage & Analytics Telemetry

### Local History Cache
- Search keywords are stored in `localStorage` inside `taptogen-recent-searches`.
- Restricts length to a maximum of **10 entries**.

### Telemetry Pipeline
Events are pushed dynamically through the consolidated `EventBus`:
- `search_started`: Query initialization phase.
- `search_completed`: Lists result count and duration calculations.
- `result_clicked`: Tracks target selection.
- `zero_results`: Captures queries with empty result sets.
