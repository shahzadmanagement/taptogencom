# Deployment Automation Specifications

This document defines environment-variable validation gates, health check endpoints, and release scripts.

---

## 1. Deployment Requirements
- **One-Command Build**: Executable via standard `npm run build` routine.
- **Environment Checks**: The build script fails early if required variables like `GEMINI_API_KEY` are absent.
- **Health Check endpoints**: Verified routing targets at `/robots.txt` and `/sitemap-index.xml`.
