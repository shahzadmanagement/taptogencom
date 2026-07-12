# Client-Side Search Engine Architecture

This document describes the design, indexing strategy, tokenization pipeline, and performance optimization details of the native client-side search engine.

---

## 1. Engine Architecture

The search engine operates client-side to ensure instant, zero-latency query resolution.

```
                  ┌──────────────────────┐
                  │     Search Query     │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │  normalizeQuery()    │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │     tokenize()       │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │     scoreResult()    │
                  │   - Title (x10)      │
                  │   - Keywords (x8)    │
                  │   - Category (x4)    │
                  │   - Description (x1) │
                  │   - Fuzzy Match      │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │    rankResults()     │
                  │ (Deterministic Sort) │
                  └──────────────────────┘
```

---

## 2. Normalization & Tokenization Pipeline
1. **NFKD Normalization**: Cleans Unicode characters, strips diacritics/accents, and converts the query to lowercase.
2. **Splitting & Punctuation**: Regex breaks down the string into tokens.
3. **Stop-Words Filter**: Common prepositions, conjunctions, and pronouns are filtered out to improve query signal.

---

## 3. Typo Tolerance & Fuzzy Matching
- **Levenshtein Distance**: Standard matrix distance check.
- **Dynamic Threshold**: If token length is between 4 and 6 characters, it permits a maximum of 1 typo. If length is greater than 6, it permits a maximum of 2 typos. Lengths below 4 require exact matches.

---

## 4. Deterministic Sort & Tie-Breaking
To ensure consistent results across multiple executions:
- Primary sort matches by **Score Descending**.
- Secondary sort matches alphabetically by **Title Ascending**.
- Tertiary sort matches alphabetically by **Document Slug Ascending**.
