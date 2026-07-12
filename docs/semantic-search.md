# Semantic Search & Synonym Platform Architecture

This document describes the design, query expansion pipeline, scoring boosts, and group settings of the Semantic Search engine.

---

## 1. Engine Core & Query Expansion

The semantic search module (`src/lib/search-semantic.ts`) expands the visitor's query using synonyms before running matches.

```
                  ┌──────────────────────┐
                  │     Search Query     │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │  getSynonymsForTerm  │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │    Execute Search    │
                  │ - Core Search: query │
                  │ - Synonyms Searches  │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │    Semantic Boost    │
                  │ (Synonym Match: 7.5) │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │  De-duplicate & Sort │
                  └──────────────────────┘
```

---

## 2. Configurable Synonym Groups

Synonym groups are declared in [`src/lib/search-synonyms.ts`](file:///c:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/lib/search-synonyms.ts):
- **`fancy_text`**: Maps "cool font", "stylish letters", "emoji text", "aesthetic letters" $\rightarrow$ "fancy text".
- **`instagram`**: Maps "ig", "insta" $\rightarrow$ "instagram".
- **`bio`**: Maps "status", "profile", "tagline" $\rightarrow$ "bio".
- **`username`**: Maps "profile name", "handle", "nickname" $\rightarrow$ "username".

---

## 3. Score Boosting Strategy

To maintain standard relevancies:
1. **Direct Exact Match** (Score: `10.0`)
2. **Title Partial Match** (Score: `5.0` to `2.0`)
3. **Synonym Match** (Score: **`7.5`** boost)
4. **Keyword Match** (Score: `6.4`)
5. **Description Match** (Score: `1.5`)

Synonym match boosts ensure expanded query results appear below direct title matches but above standard keyword descriptions.
