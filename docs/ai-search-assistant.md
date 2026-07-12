# AI Search Assistant Platform

This document describes the Natural Language Intent Engine, intent groups, multi-stage pipelines, confidence scoring, and suggestions.

---

## 1. Natural Language Intent Engine

The intent engine parses visitor requests by stripping out non-essential filler words (e.g., "please", "can you", "show me") and extracting key search queries.

---

## 2. Intent Groups & Mappings

The engine groups queries into five main intents:
1. **Fancy Text**: Matches queries relating to fonts, decorative characters, and stylish writing styles.
2. **Nickname Generator**: Matches names, gamertags, and aliases.
3. **Bio Generator**: Matches profiles, taglines, and bios.
4. **Text Utilities**: Matches editing requests (removing duplicates, line count, trimming, case adjustments).
5. **Emoji Tools**: Matches sparklers, symbols, and smileys.

---

## 3. Scoring & Confidence Levels
- **Confidence Rating**: Scores queries from `0` to `100` based on the density of matches.
- **Intent Boost**: If a search matches the category of the detected intent, it gets an additional boost in confidence.
- **Fallback Suggestions**: If confidence falls below `40%`, the Search UI displays relevant alternative suggestions.
