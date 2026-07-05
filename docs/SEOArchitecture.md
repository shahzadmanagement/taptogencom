# Platform SEO Architecture

This document details sitemaps configurations, alternate hreflangs rules, and metadata rendering across localized pages.

---

## 1. Alternates & Canonical Configurations

* Every page resolves its canonical path using static schema URL builders.
* Alternates mapping fetches localized paths matching language subsets dynamically to keep search bots in-sync.

---

## 2. Meta Tags Rendering

* **Title Tags**: Custom `<title>` strings are constructed inside layout templates using `metaTitle` config fields.
* **Open Graph & Twitter Cards**: Dynamic social sharing attributes map title, summary text, and brand colors cleanly.
