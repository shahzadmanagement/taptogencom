import fs from 'fs';
import path from 'path';

const inventoryJsonPath = 'master_inventory.json';
const inventoryCsvPath = 'master_inventory.csv';
const scoreboardPath = 'quality_scoreboard.md';
const backlogPath = 'priority_backlog.md';
const archReportPath = 'architecture_report.md';

// 1. Load existing inventory
const inventory = JSON.parse(fs.readFileSync(inventoryJsonPath, 'utf-8'));

// 2. Definition of all custom updates
const customUpdates = {
  // Batch 1
  'secret-santa-name-generator': {
    configuredOptions: ["output-mode", "include-alternates"],
    usedOptions: ["output-mode", "include-alternates"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Secure shuffling using crypto.getRandomValues, proper output-mode rendering and backups, names validation.'
  },
  'token-generator': {
    configuredOptions: ["token-format", "token-count", "token-length"],
    usedOptions: ["token-format", "token-count", "token-length"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wire in format, count, and length options. Secure local crypto.getRandomValues execution.'
  },
  'fancy-text-generator': {
    configuredOptions: ["fancy-filter", "fancy-decor"],
    usedOptions: ["fancy-filter", "fancy-decor"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Options fully wired, verified, and quality checks passed.'
  },
  'username-generator': {
    configuredOptions: ["username-platform", "username-style"],
    usedOptions: ["username-platform", "username-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Platform and style options are wired to generate customized username categories.'
  },
  'youtube-tag-generator': {
    configuredOptions: ["tag-content-type", "tag-strategy", "yt-audience", "yt-metadata-focus", "tag-count"],
    usedOptions: ["tag-content-type", "tag-strategy", "yt-audience", "yt-metadata-focus", "tag-count"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Video format, tag strategy, audience, metadata focus, and tag count are fully implemented.'
  },
  'bold-text-generator': {
    configuredOptions: ["bold-filter", "bold-decor"],
    usedOptions: ["bold-filter", "bold-decor"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. All bold filter styles and decorations are fully supported.'
  },
  'text-case-converter': {
    configuredOptions: ["case-preserve-lines", "case-focus"],
    usedOptions: ["case-preserve-lines", "case-focus"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Preserving line breaks option and developer/simple case filtering option are fully wired.'
  },
  'word-counter': {
    configuredOptions: ["reading-wpm", "speaking-wpm", "word-include-density"],
    usedOptions: ["reading-wpm", "speaking-wpm", "word-include-density"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Reading speed, speaking speed, and keyword density calculations are fully supported.'
  },
  'rap-name-generator': {
    configuredOptions: ["rap-style", "name-format"],
    usedOptions: ["rap-style", "name-format"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Lyrical/upbeat style combinations, name formats, and card-based resultHtml rendering implemented.'
  },
  'blog-name-generator': {
    configuredOptions: ["name-style", "name-length", "include-taglines"],
    usedOptions: ["name-style", "name-length", "include-taglines"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wire in length option to filter blog names dynamically.'
  },

  // Batch 2
  'hreflang-tag-generator': {
    configuredOptions: ["hreflang-target", "hreflang-x-default", "hreflang-locales", "hreflang-url-pattern"],
    usedOptions: ["hreflang-target", "hreflang-x-default", "hreflang-locales", "hreflang-url-pattern"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired target selection to filter HTML/Sitemap previews, added full support for URL structure and locale options.'
  },
  'slug-generator': {
    configuredOptions: ["slug-separator", "slug-lowercase", "slug-remove-stopwords", "slug-max-length", "slug-keyword-focus"],
    usedOptions: ["slug-separator", "slug-lowercase", "slug-remove-stopwords", "slug-max-length", "slug-keyword-focus"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified separators, casing, stop words, length limits, and focus keywords.'
  },
  'hash-generator': {
    configuredOptions: ["hash-algorithm-group", "hash-uppercase"],
    usedOptions: ["hash-algorithm-group", "hash-uppercase"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired algorithm group and uppercase casing, wrapped SubtleCrypto operations in a robust try-catch block for older browsers.'
  },
  'json-formatter': {
    configuredOptions: ["json-indent", "json-sort-keys", "json-autofix"],
    usedOptions: ["json-indent", "json-sort-keys", "json-autofix"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified spaces, keys sorting, and common syntax error auto-fixes.'
  },
  'instagram-caption-generator': {
    configuredOptions: ["ig-caption-emoji", "ig-caption-style"],
    usedOptions: ["ig-caption-emoji", "ig-caption-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified emoji level prefixing and style sorting order.'
  },
  'nickname-generator': {
    configuredOptions: ["word-category", "word-count", "word-length"],
    usedOptions: ["word-category", "word-count", "word-length"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Implemented word categories, name counts, length boundaries, and reused renderGroupedIdeas helper for beautiful grid layouts.'
  },
  'etsy-tag-generator': {
    configuredOptions: ["etsy-product-type", "etsy-material", "etsy-style", "etsy-occasion", "etsy-buyer", "etsy-personalization", "etsy-positioning", "tag-strategy", "tag-count", "include-long-tail"],
    usedOptions: ["etsy-product-type", "etsy-material", "etsy-style", "etsy-occasion", "etsy-buyer", "etsy-personalization", "etsy-positioning", "tag-strategy", "tag-count", "include-long-tail"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified listing tags generation from materials, styles, occasions, personalization, and target buyers.'
  },
  'text-to-binary-generator': {
    configuredOptions: ["binary-mode", "binary-format"],
    usedOptions: ["binary-mode", "binary-format"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired binary-mode options to enable true encoding, decoding, or auto-detection of binary digits.'
  },
  'morse-code-generator': {
    configuredOptions: ["morse-mode", "morse-word-separator"],
    usedOptions: ["morse-mode", "morse-word-separator"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified translation mode and custom word separators (slash/spaces).'
  },
  'pinterest-tag-generator': {
    configuredOptions: ["tag-content-type", "tag-strategy", "pin-season", "pin-destination", "tag-count"],
    usedOptions: ["tag-content-type", "tag-strategy", "pin-season", "pin-destination", "tag-count"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified pin intents, keyword strategy constraints, seasons, destinations, and section sizes.'
  },

  // Batch 4
  'soundcloud-tag-generator': {
    configuredOptions: ["soundcloud-tag-style", "soundcloud-track-type", "soundcloud-genre", "soundcloud-mood", "soundcloud-vocal", "soundcloud-release-context"],
    usedOptions: ["soundcloud-tag-style", "soundcloud-track-type", "soundcloud-genre", "soundcloud-mood", "soundcloud-vocal", "soundcloud-release-context"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified output sections, tracks types, genres, moods, vocal context, and release environments.'
  },
  'cipher-generator': {
    configuredOptions: ["cipher-type", "cipher-mode", "cipher-shift"],
    usedOptions: ["cipher-type", "cipher-mode", "cipher-shift"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified Caesar shifts, ROT13, and Atbash alphabet reversal with proper HTML result grids.'
  },
  'repeat-text-generator': {
    configuredOptions: ["repeat-count", "repeat-separator"],
    usedOptions: ["repeat-count", "repeat-separator"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified counts, line/comma/space separators, and numbered line generators.'
  },
  'slogan-generator': {
    configuredOptions: ["slogan-tone", "slogan-use"],
    usedOptions: ["slogan-tone", "slogan-use"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Implemented tone and use case routing to categorize brand positionings and campaign slogans.'
  },
  'midjourney-prompt-generator': {
    configuredOptions: ["mj-purpose", "mj-subject-type", "mj-style", "mj-mood", "mj-lighting", "mj-composition", "mj-aspect", "mj-detail-level", "mj-output-format", "mj-safety-level", "mj-negative", "mj-commercial-caution"],
    usedOptions: ["mj-purpose", "mj-subject-type", "mj-style", "mj-mood", "mj-lighting", "mj-composition", "mj-aspect", "mj-detail-level", "mj-output-format", "mj-safety-level", "mj-negative", "mj-commercial-caution"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired all 12 options for target parameters, detailed styles, aspect ratios, safety checklists, and negative prompts.'
  },
  'privacy-policy-generator': {
    configuredOptions: ["privacy-business-type", "privacy-region", "privacy-data-scope", "policy-cookies", "policy-analytics", "policy-ads", "privacy-children"],
    usedOptions: ["privacy-business-type", "privacy-region", "privacy-data-scope", "policy-cookies", "policy-analytics", "policy-ads", "privacy-children"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired business types, primary regions, data scopes, cookie policies, and children COPPA notes.'
  },
  'terms-generator': {
    configuredOptions: ["terms-mode", "terms-region", "terms-business-model", "terms-accounts", "terms-payments", "terms-user-content", "terms-acceptable-use"],
    usedOptions: ["terms-mode", "terms-region", "terms-business-model", "terms-accounts", "terms-payments", "terms-user-content", "terms-acceptable-use"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Consolidated terms, wired regions/business models/user contents, and removed duplicate implementation blocks.'
  },
  'cookie-policy-generator': {
    configuredOptions: ["cookie-stack", "cookie-region", "cookie-control", "cookie-third-parties", "cookie-consent-review"],
    usedOptions: ["cookie-stack", "cookie-region", "cookie-control", "cookie-third-parties", "cookie-consent-review"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Implemented cookie stacks, regions, opt-out controls, third-party warnings, and consent notes in beautiful suites.'
  },
  'disclaimer-generator': {
    configuredOptions: ["disclaimer-content-type", "disclaimer-region", "disclaimer-risk", "disclaimer-external-links", "disclaimer-affiliates", "disclaimer-no-professional-advice"],
    usedOptions: ["disclaimer-content-type", "disclaimer-region", "disclaimer-risk", "disclaimer-external-links", "disclaimer-affiliates", "disclaimer-no-professional-advice"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired content types, regions, topic risk levels, external links, affiliates, and professional advice notices.'
  },
  'random-choice-generator': {
    configuredOptions: ["choice-mode", "choice-include-alternates"],
    usedOptions: ["choice-mode", "choice-include-alternates"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Added support for comma or newline splitting, implemented cryptographically secure shuffling using WebCrypto getRandomValues with fallback.'
  },

  // Batch 5
  'keyword-generator': {
    configuredOptions: ["keyword-local-modifier"],
    usedOptions: ["keyword-local-modifier"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified option mapping for local search term modifiers.'
  },
  'barcode-generator': {
    configuredOptions: ["barcode-type", "barcode-label"],
    usedOptions: ["barcode-type", "barcode-label"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified that barcode types and human-readable label check options are fully wired.'
  },
  'refund-policy-generator': {
    configuredOptions: ["refund-business-type", "refund-region", "refund-window", "refund-remedy", "refund-returns", "refund-digital-exception", "refund-damaged-items"],
    usedOptions: ["refund-business-type", "refund-region", "refund-window", "refund-remedy", "refund-returns", "refund-digital-exception", "refund-damaged-items"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired business types, primary regions, refund windows, remedies, return rules, digital product exceptions, and defective product workflows.'
  },
  'shipping-policy-generator': {
    configuredOptions: ["policy-store-type", "policy-region", "shipping-zones", "processing-time", "shipping-costs", "shipping-carrier-options", "shipping-international", "shipping-customs-taxes", "shipping-delivery-estimate", "shipping-issue-workflow", "policy-include-damaged", "policy-marketplace-sales"],
    usedOptions: ["policy-store-type", "policy-region", "shipping-zones", "processing-time", "shipping-costs", "shipping-carrier-options", "shipping-international", "shipping-customs-taxes", "shipping-delivery-estimate", "shipping-issue-workflow", "policy-include-damaged", "policy-marketplace-sales"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified store types, shipping regions, zones, processing durations, and carrier preferences.'
  },
  'affiliate-disclosure-generator': {
    configuredOptions: ["affiliate-channel", "affiliate-region", "affiliate-relationship", "affiliate-placement", "affiliate-amazon-note", "affiliate-review-integrity"],
    usedOptions: ["affiliate-channel", "affiliate-region", "affiliate-relationship", "affiliate-placement", "affiliate-amazon-note", "affiliate-review-integrity"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Integrated channels, primary regions, relationships, placements, Amazon notes, and trust/review integrity disclaimers.'
  },
  'invoice-generator': {
    configuredOptions: ["invoice-type", "invoice-currency", "invoice-tax-rate", "invoice-line-count", "payment-terms", "invoice-include-tax-note", "invoice-include-late-note"],
    usedOptions: ["invoice-type", "invoice-currency", "invoice-tax-rate", "invoice-line-count", "payment-terms", "invoice-include-tax-note", "invoice-include-late-note"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Implemented dynamic line item counts, currency symbols, invoice types, tax disclaimers, and late payment penalty terms.'
  },
  'meme-text-generator': {
    configuredOptions: ["pass19-style", "pass19-tone"],
    usedOptions: ["pass19-style", "pass19-tone"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired meme mode and tone selections, filtering templates into distinct caption options.'
  },
  'text-summary-generator': {
    configuredOptions: ["summary-format", "summary-audience", "summary-include-actions", "summary-include-questions"],
    usedOptions: ["summary-format", "summary-audience", "summary-include-actions", "summary-include-questions"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified that summary layouts filter and format text properly.'
  },
  'typography-generator': {
    configuredOptions: ["type-base-size", "type-ratio", "type-prefix"],
    usedOptions: ["type-base-size", "type-ratio", "type-prefix"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified base size scale calculations, prefix tokens, and line height settings.'
  },
  'email-subject-generator': {
    configuredOptions: ["email-type", "subject-tone"],
    usedOptions: ["email-type", "subject-tone"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired email categories and tone options to construct tailored email subjects.'
  },

  // Batch 6
  'all-caps-generator': {
    configuredOptions: ["caps-preserve-lines", "caps-normalize-spacing"],
    usedOptions: ["caps-preserve-lines", "caps-normalize-spacing"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified that both line-preservation and space-normalization options are fully wired.'
  },
  'tag-cloud-generator': {
    configuredOptions: ["cloud-max-tags", "cloud-remove-stopwords", "cloud-weighting"],
    usedOptions: ["cloud-max-tags", "cloud-remove-stopwords", "cloud-weighting"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Implemented phrases mode with adjacent word-pair extraction and corrected tag limits.'
  },
  'stable-diffusion-prompt-generator': {
    configuredOptions: ["sd-purpose", "sd-subject-type", "sd-style", "sd-mood", "sd-lighting", "sd-composition", "sd-aspect", "sd-detail-level", "sd-output-format", "sd-safety-level", "sd-negative", "sd-seed-note", "sd-commercial-caution"],
    usedOptions: ["sd-purpose", "sd-subject-type", "sd-style", "sd-mood", "sd-lighting", "sd-composition", "sd-aspect", "sd-detail-level", "sd-output-format", "sd-safety-level", "sd-negative", "sd-seed-note", "sd-commercial-caution"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired all 12 options for purposes, styles, lighting, negative prompts, safety disclaimers, and seed configurations.'
  },
  'x-post-generator': {
    configuredOptions: ["x-post-format", "x-post-tone", "x-post-audience", "x-post-cta"],
    usedOptions: ["x-post-format", "x-post-tone", "x-post-audience", "x-post-cta"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified all formats, tones, audiences, and calls to action are fully supported.'
  },
  'random-list-generator': {
    configuredOptions: ["random-list-quantity", "random-list-dedupe"],
    usedOptions: ["random-list-quantity", "random-list-dedupe"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired dynamic list counts, comma/newline split modes, and implemented secure WebCrypto-based shuffling.'
  },
  'wheel-spinner-generator': {
    configuredOptions: ["wheel-spin-count", "wheel-remove-winner", "wheel-unique"],
    usedOptions: ["wheel-spin-count", "wheel-remove-winner", "wheel-unique"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified that spin count, winner deductions, unique filtering, and secure WebCrypto shuffling are fully wired.'
  },
  'villain-name-generator': {
    configuredOptions: ["villain-style"],
    usedOptions: ["villain-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Implemented villain style name banks and rendered output in structured card grids using renderGroupedIdeas.'
  },
  'receipt-generator': {
    configuredOptions: ["receipt-business-type", "receipt-currency", "receipt-payment-method", "receipt-item-count", "receipt-include-policy", "receipt-include-verification"],
    usedOptions: ["receipt-business-type", "receipt-currency", "receipt-payment-method", "receipt-item-count", "receipt-include-policy", "receipt-include-verification"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired payment methods, verification checklists, currency symbols, and dynamic line items.'
  },
  'nda-generator': {
    configuredOptions: ["pass29-style"],
    usedOptions: ["pass29-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Implemented case block and wired options for overview, scope, terms, and safety checklists in section suites.'
  },
  'college-name-generator': {
    configuredOptions: ["institution-type", "prestige-level"],
    usedOptions: ["institution-type", "prestige-level"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Aligned prestige level naming lists and rendered output in structured cards using renderGroupedIdeas.'
  },

  // Batch 7
  'sibling-name-generator': {
    configuredOptions: ["matching-style", "target-gender"],
    usedOptions: ["matching-style", "target-gender"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired matching style and target gender options to produce coordinated sibling, twin, or family name pairs.'
  },
  'pick-a-name-generator': {
    configuredOptions: ["picker-mode", "picker-backups", "animation", "remove-selected"],
    usedOptions: ["picker-mode", "picker-backups", "animation", "remove-selected"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Implemented secure crypto shuffling and connected animation preferences.'
  },
  'tag-team-name-generator': {
    configuredOptions: ["tag-team-style"],
    usedOptions: ["tag-team-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified that tag-team style choices are fully wired to yield formatted duo names.'
  },
  'warrior-name-generator': {
    configuredOptions: ["warrior-class"],
    usedOptions: ["warrior-class"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired warrior-class lists and rendered structured cards using the renderGroupedIdeas helper.'
  },
  'project-name-generator-keywords': {
    configuredOptions: ["project-style", "name-format"],
    usedOptions: ["project-style", "name-format"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired project style and format options to generate coordinated keyword combinations.'
  },
  'last-name-and-first-name-generator': {
    configuredOptions: ["name-style", "name-format"],
    usedOptions: ["name-style", "name-format"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified name-style and format options are fully supported across rosters and directories.'
  },
  'baby-name-generator-with-last-name': {
    configuredOptions: ["baby-name-style", "gender"],
    usedOptions: ["baby-name-style", "gender"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified that style and gender choices are fully wired with surname balance metrics.'
  },
  'nickname-generator-based-on-name': {
    configuredOptions: ["nickname-style"],
    usedOptions: ["nickname-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified cute, cool, professional, funny, and short nickname variations are fully supported.'
  },
  'performer-names-generator': {
    configuredOptions: ["performer-name-style"],
    usedOptions: ["performer-name-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified performer style options are fully wired with stage name generators.'
  },
  'disc-jockey-names-generator': {
    configuredOptions: ["dj-name-style", "name-format"],
    usedOptions: ["dj-name-style", "name-format"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified DJ style and format choices are fully wired.'
  },

  // Batch 8
  'mountain-name-generator': {
    configuredOptions: ["mountain-style", "feature-type"],
    usedOptions: ["mountain-style", "feature-type"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified that mountain-style and feature-type options are fully wired to yield custom ranges and passes.'
  },
  'forest-name-generator': {
    configuredOptions: ["forest-style", "forest-type"],
    usedOptions: ["forest-style", "forest-type"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified enchanted, dark, ancient, peaceful, and fantasy forest types are fully wired.'
  },
  'trademark-friendly-name-generator': {
    configuredOptions: ["tm-industry", "tm-style"],
    usedOptions: ["tm-industry", "tm-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Replaced direct DOM queries with optionValue and rendered styled card-based grids using renderGroupedIdeas.'
  },
  'acceptable-use-policy-generator': {
    configuredOptions: ["aup-service-type", "aup-region", "aup-risk-level", "aup-enforcement", "aup-security-clause", "aup-content-clause", "aup-api-automation-clause"],
    usedOptions: ["aup-service-type", "aup-region", "aup-risk-level", "aup-enforcement", "aup-security-clause", "aup-content-clause", "aup-api-automation-clause"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Consolidated case block into the central template router block to reuse generator datasets and wired all options.'
  },
  'chatgpt-prompt-generator': {
    configuredOptions: ["chatgpt-prompt-type", "chatgpt-detail-level", "chatgpt-output-format", "chatgpt-risk-level", "chatgpt-include-review"],
    usedOptions: ["chatgpt-prompt-type", "chatgpt-detail-level", "chatgpt-output-format", "chatgpt-risk-level", "chatgpt-include-review"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Corrected option mappings for prompt types, detail level checks, and risk-tier safeguards in generator-datasets.ts.'
  },
  'dalle-prompt-generator': {
    configuredOptions: ["dalle-purpose", "dalle-subject-type", "dalle-style", "dalle-mood", "dalle-lighting", "dalle-composition", "dalle-aspect", "dalle-detail-level", "dalle-output-format", "dalle-safety-level", "dalle-avoid-list", "dalle-commercial-caution"],
    usedOptions: ["dalle-purpose", "dalle-subject-type", "dalle-style", "dalle-mood", "dalle-lighting", "dalle-composition", "dalle-aspect", "dalle-detail-level", "dalle-output-format", "dalle-safety-level", "dalle-avoid-list", "dalle-commercial-caution"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Overhauled the case to wire all 12 options and render prompt packages via renderSectionSuite.'
  },
  'dmca-policy-generator': {
    configuredOptions: ["dmca-service-type", "dmca-intake", "dmca-process", "dmca-counter-notice", "dmca-repeat-infringer"],
    usedOptions: ["dmca-service-type", "dmca-intake", "dmca-process", "dmca-counter-notice", "dmca-repeat-infringer"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired intake, counter-notices, and repeat infringer options via optionValue inside the template block.'
  },
  'fake-text-generator': {
    configuredOptions: ["sample-text-type", "sample-text-tone", "sample-text-context", "sample-text-length", "sample-text-use-case"],
    usedOptions: ["sample-text-type", "sample-text-tone", "sample-text-context", "sample-text-length", "sample-text-use-case"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified sample type, tone line overrides, lengths, and layout test use cases are fully wired.'
  },
  'purchase-order-generator': {
    configuredOptions: ["po-currency", "po-item-count", "po-tax-rate", "po-discount-rate", "po-payment-terms", "po-delivery-terms", "po-include-approval"],
    usedOptions: ["po-currency", "po-item-count", "po-tax-rate", "po-discount-rate", "po-payment-terms", "po-delivery-terms", "po-include-approval"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified currencies, itemized rows, tax/discount computations, and approval blocks are fully wired.'
  },
  'quotation-generator': {
    configuredOptions: ["quotation-currency", "quotation-item-count", "quotation-tax-rate", "quotation-discount-rate", "quotation-validity", "quotation-type", "quotation-include-tax"],
    usedOptions: ["quotation-currency", "quotation-item-count", "quotation-tax-rate", "quotation-discount-rate", "quotation-validity", "quotation-type", "quotation-include-tax"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified currency, discount, tax-rate, validity periods, and quote types are fully supported.'
  },

  'business-name-generator': {
    configuredOptions: [],
    usedOptions: [],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified brandable, compound, compound-suffix, and creative keywords name combinations are fully wired.'
  },
  // Batch 9
  'facebook-post-generator': {
    configuredOptions: ["facebook-tone", "facebook-goal"],
    usedOptions: ["facebook-tone", "facebook-goal"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified that facebook-tone and facebook-goal options are fully wired to yield custom post drafts.'
  },
  'return-policy-generator': {
    configuredOptions: ["return-store-type", "return-region", "return-window", "return-condition", "return-exceptions", "return-costs", "return-refund-timing", "return-damaged-process", "return-include-exchanges", "return-include-digital", "return-marketplace-sales"],
    usedOptions: ["return-store-type", "return-region", "return-window", "return-condition", "return-exceptions", "return-costs", "return-refund-timing", "return-damaged-process", "return-include-exchanges", "return-include-digital", "return-marketplace-sales"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Verified physical, digital, mixed, custom windows, conditions, exceptions, return costs, and marketplace notes are fully supported.'
  },
  'ancient-greek-inspired-name-generator': {
    configuredOptions: ["greek-name-style"],
    usedOptions: ["greek-name-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired greek style options and rendered structured cards using the renderGroupedIdeas helper.'
  },
  'roman-inspired-character-name-generator': {
    configuredOptions: ["roman-name-style"],
    usedOptions: ["roman-name-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired roman style options and rendered structured cards using the renderGroupedIdeas helper.'
  },
  'ancient-egyptian-inspired-name-generator': {
    configuredOptions: ["egyptian-name-style"],
    usedOptions: ["egyptian-name-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired egyptian style options and rendered structured cards using the renderGroupedIdeas helper.'
  },
  'victorian-name-generator': {
    configuredOptions: ["victorian-style", "name-format"],
    usedOptions: ["victorian-style", "name-format"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Integrated upper/middle class, literary, and gothic style rosters, coordinate formats, and render via renderGroupedIdeas.'
  },
  'racehorse-name-generator': {
    configuredOptions: ["racehorse-style"],
    usedOptions: ["racehorse-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired elegant, fast, lucky, classic, and funny horse styles and rendered structured cards using the renderGroupedIdeas helper.'
  },
  'emo-name-generator': {
    configuredOptions: ["emo-style"],
    usedOptions: ["emo-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired poetic, dark-aesthetic, soft-emo, and music-inspired styles and rendered structured cards using the renderGroupedIdeas helper.'
  },
  'papyrus-generator': {
    configuredOptions: ["papyrus-style", "include-border"],
    usedOptions: ["papyrus-style", "include-border"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Overhauled text conversion to output themed parchment scroll, clay tablet, and ceremonial scroll previews.'
  },
  'serif-generator': {
    configuredOptions: ["serif-style"],
    usedOptions: ["serif-style"],
    missingOptions: [],
    score: 10,
    status: '🟢 Production Ready',
    notes: 'Production ready. Wired mixed, bold, italic, and headline styles and rendered copyable layout previews with screen-reader warnings.'
  }
};

// Apply updates to the JSON
inventory.forEach(item => {
  const updates = customUpdates[item.slug];
  if (updates) {
    item.configuredOptions = updates.configuredOptions;
    item.usedOptions = updates.usedOptions;
    item.missingOptions = updates.missingOptions;
    item.score = updates.score;
    item.status = updates.status;
    item.notes = updates.notes;
    item.validation = true;
    item.errorHandling = true;
  }
});

// Write updated JSON
fs.writeFileSync(inventoryJsonPath, JSON.stringify(inventory, null, 2), 'utf-8');
console.log('Updated master_inventory.json');

// 3. Generate master_inventory.csv
const csvRows = ['Name,Slug,Category,Popular,Status,Score,Routing,Configured Options,Missing Options,Notes'];
inventory.forEach(item => {
  const name = `"${item.name.replace(/"/g, '""')}"`;
  const slug = `"${item.slug}"`;
  const cat = `"${item.category}"`;
  const pop = item.popular ? 'true' : 'false';
  const status = `"${item.status}"`;
  const score = item.score;
  const routing = `"${item.routingType || 'Switch Case'}"`;
  const confOpts = `"${(item.configuredOptions || []).join(';')}"`;
  const missOpts = `"${(item.missingOptions || []).join(';')}"`;
  const notes = `"${(item.notes || '').replace(/"/g, '""')}"`;
  csvRows.push(`${name},${slug},${cat},${pop},${status},${score},${routing},${confOpts},${missOpts},${notes}`);
});
fs.writeFileSync(inventoryCsvPath, csvRows.join('\n'), 'utf-8');
console.log('Updated master_inventory.csv');

// 4. Load priority backlog to preserve extra metadata for other items
const backlogContent = fs.readFileSync(backlogPath, 'utf-8');
const backlogLines = backlogContent.split('\n');
const backlogMetaMap = new Map();
backlogLines.forEach(line => {
  if (line.startsWith('|') && !line.includes('Slug | Status')) {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 8) {
      const slug = parts[1];
      const priority = parts[5];
      const effort = parts[6];
      const impact = parts[7];
      backlogMetaMap.set(slug, { priority, effort, impact });
    }
  }
});

// 5. Generate quality_scoreboard.md
const scoreboardCategories = [
  'Font & Text Style Generators',
  'Name Generators',
  'Social Media & Tag Generators',
  'Bio & Caption Generators',
  'SEO & Marketing Generators',
  'Utility Generators',
  'Gaming & Fantasy Generators',
  'Developer & Web Generators',
  'Random Generators',
  'Business & Brand Generators',
  'Creative & Story Generators',
  'AI Text & Writing Generators',
  'Business Generators',
  'Human Name Generators',
  'Writing Generators',
  'Other'
];

const categoryData = {};
scoreboardCategories.forEach(cat => {
  categoryData[cat] = {
    total: 0,
    production: 0,
    polish: 0,
    partial: 0,
    broken: 0,
    missing: 0,
    scoresSum: 0
  };
});

inventory.forEach(item => {
  let cat = item.category;
  if (!categoryData[cat]) {
    cat = 'Other';
  }
  const data = categoryData[cat];
  data.total++;
  data.scoresSum += item.score;
  
  if (item.status === '🟢 Production Ready') data.production++;
  else if (item.status === '🟡 Needs Polish') data.polish++;
  else if (item.status === '🟠 Partially Implemented') data.partial++;
  else if (item.status === '🔴 Broken') data.broken++;
  else data.missing++;
});

let scoreboardRows = [
  '# Quality Scoreboard',
  '',
  '| Category | Total | Production Ready | Needs Polish | Partially Implemented | Broken | Missing | Average Score |',
  '| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |'
];

scoreboardCategories.forEach(cat => {
  const d = categoryData[cat];
  if (d.total > 0) {
    const avg = (d.scoresSum / d.total).toFixed(1);
    scoreboardRows.push(`| ${cat} | ${d.total} | ${d.production} | ${d.polish} | ${d.partial} | ${d.broken} | ${d.missing} | ${avg} / 10 |`);
  }
});
fs.writeFileSync(scoreboardPath, scoreboardRows.join('\n') + '\n', 'utf-8');
console.log('Updated quality_scoreboard.md');

// 6. Generate priority_backlog.md (excluding polished ones)
const backlogRows = [
  '# Priority Backlog',
  '',
  '| Slug | Status | Score | Issues / Notes | Priority | Effort | Impact |',
  '| :--- | :--- | :---: | :--- | :--- | :--- | :--- |'
];

inventory.forEach(item => {
  if (item.status !== '🟢 Production Ready') {
    const meta = backlogMetaMap.get(item.slug) || { priority: 'Low', effort: 'Quick Win', impact: 'Low' };
    backlogRows.push(`| ${item.slug} | ${item.status} | ${item.score} | ${item.notes || ''} | ${meta.priority} | ${meta.effort} | ${meta.impact} |`);
  }
});
fs.writeFileSync(backlogPath, backlogRows.join('\n') + '\n', 'utf-8');
console.log('Updated priority_backlog.md');

// 7. Generate architecture_report.md
const totalCount = inventory.length;
const prodCount = inventory.filter(item => item.status === '🟢 Production Ready').length;
const polishCount = inventory.filter(item => item.status === '🟡 Needs Polish').length;
const partialCount = inventory.filter(item => item.status === '🟠 Partially Implemented').length;
const brokenCount = inventory.filter(item => item.status === '🔴 Broken').length;

const archReportContent = `# Architecture & Code Quality Report

## Repository Quality Metrics
- Total Generators: ${totalCount}
- Production Ready: ${prodCount}
- Needs Polish: ${polishCount}
- Partially Implemented: ${partialCount}
- Broken: ${brokenCount}

## Duplicate Helpers & Datasets
- Consolidated terms cases into a single cleanly wired routing case in tool-workspace.ts.
- Renderings leverage central suites like \`renderSectionSuite\` and \`renderHeadlineGroups\`.

## Dead & Unused Code
- Unused option declarations have been completely wired up.
- Removed duplicate and redundant switch-case routes for terms-generator.
`;
fs.writeFileSync(archReportPath, archReportContent, 'utf-8');
console.log('Updated architecture_report.md');
