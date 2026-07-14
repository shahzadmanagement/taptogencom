# Security Header Configurations Specs

This document defines CSP rules, HSTS transport security, and browser sandboxing rules.

---

## 1. Deployed Security Headers List
- **Content-Security-Policy**: Prevents XSS scripting injections.
- **Strict-Transport-Security (HSTS)**: Forces HTTPS network routing.
- **X-Content-Type-Options**: Enforces strict MIME sniffing validation rules.
- **X-Frame-Options**: Prevents clickjacking overlays attacks.
