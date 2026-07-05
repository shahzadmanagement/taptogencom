# Platform Search Architecture

This document describes how search engines index and read platform generators metadata.

---

## 1. Unified Search Index

* **Registry**: [`src/data/search-index.ts`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/data/search-index.ts) manages search entries.
* **Fields**: Each tool records slugs, canonical metadata, descriptions, category groupings, keywords, locales, priority scores, and update dates.
