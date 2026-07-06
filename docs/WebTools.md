# HTTP client & Web Scrapers

This guide details url validations checks, HTTP request operations, and HTML text scrapers.

---

## 1. Web Scraping

We fetch layout data asynchronously using node HTTP clients:
```typescript
import { scrapeWebPage } from './webScraper';

const cleanText = await scrapeWebPage('https://example.com');
```
This sanitizes HTML text by stripping tag sequences before return delivery.
