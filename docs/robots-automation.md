# Dynamic Robots.txt Automation Specs

This document details the dynamic compilation logic and build integration of the robots.txt generator.

---

## 1. Module Functions

- **`generateRobotsTxt(env, siteUrl)`**: Translates environment status flags into robots directives conforming to Google's specs.
- **`writeRobotsTxt(publicDir, env)`**: Resolves public folder paths and writes the compiled string to `public/robots.txt`.

---

## 2. Directory Disallows
- `/api/`
- `/private/`
- `/draft/`
- `/tmp/`
- `/cache/`
- `/node_modules/`
- `/admin/`
