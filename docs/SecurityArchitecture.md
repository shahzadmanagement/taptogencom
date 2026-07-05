# Security Architecture Standards

This document describes security headers, CSP directives, and input sanitization parameters.

---

## 1. Content Security Policy (CSP)

The CSP builder `csp.ts` defines security scopes:
* **`default-src`**: Restricts resource fetching to `'self'`.
* **`script-src` / `style-src`**: Restricts scripts and styles domains.

---

## 2. Input Sanitization & Validation

User keyboard inputs are scrubbed of HTML tags, preventing scripting injection risks.
