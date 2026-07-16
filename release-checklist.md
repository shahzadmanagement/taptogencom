# Go-Live Release Checklist

This report details manual and automated checks required before releasing to production.

---

## 1. Automated Pipeline Checklist

- [x] **Compile and Typecheck**: Verified.
- [x] **Run unit test suites**: Verified.
- [x] **Build optimizations**: Verified.
- [x] **SEO metadata checking**: Verified.

---

## 2. Manual Pre-Release Checklist
- **DNS check**: Confirm `taptogen.com` A/AAAA records point to hosting servers.
- **Search Console Claim**: Submit sitemaps index at `/sitemap-index.xml`.
- **SSL certificate validation**: Confirm domain certificate matches HTTPS standards.
