# Multi-Factor Authentication (MFA)

This guide describes MFA secret key generation, recovery codes, and logins audit history logs.

---

## 1. trusted devices & TOTP

Logins are tracked along with source IP. Trusted device cookies bypass TOTP checks on subsequent requests.
