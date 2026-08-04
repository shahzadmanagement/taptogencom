/**
 * BATCH A+B FIX: Enrich all 430 tools with real icons, taglines, descriptions, 
 * metaTitles, metaDescriptions, proper generatorTypes, and unique FAQ items.
 * 
 * Strategy: Uses a lookup table for known tool categories, then applies
 * intelligent content generation based on slug analysis.
 */
const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

// =============================================
// ICON LOOKUP by tool slug or keyword
// =============================================
const iconMap = {
  // Text/Font tools
  'fancy-text': '✨', 'bold-text': '𝗕', 'italic-text': '𝘐', 'cursive-text': '𝒞', 'cursive-name': '𝒞',
  'glitch-text': '👾', 'vaporwave-text': '🌊', 'strikethrough-text': '̶', 'underline-text': '͟U',
  'small-text': 'ˢ', 'reverse-text': '⟺', 'unicode-text': '𝕌', 'cool-text': '❄️',
  'bubble-text': 'ⓑ', 'pixel-text': '🟦', 'retro-text': '📺', 'typewriter-text': '⌨️',
  'papyrus-text': '📜', 'serif-text': 'S', 'emo-text': '🖤',
  // Name generators
  'name-generator': '👤', 'baby-name': '🍼', 'username': '🎮', 'business-name': '🏢',
  'brand-name': '🏷️', 'domain-name': '🌐', 'team-name': '🏆', 'fantasy-name': '🧙',
  'character-name': '🎭', 'band-name': '🎸', 'podcast-name': '🎙️', 'gaming-name': '🕹️',
  'superhero-name': '🦸', 'villain-name': '🦹', 'pet-name': '🐾', 'dog-name': '🐕',
  'cat-name': '🐈', 'dragon-name': '🐉', 'elf-name': '🧝', 'wizard-name': '🧙',
  'alien-name': '👽', 'robot-name': '🤖', 'pirate-name': '🏴‍☠️', 'cowboy-name': '🤠',
  'viking-name': '⚔️', 'warrior-name': '🗡️', 'witch-name': '🧙‍♀️', 'vampire-name': '🧛',
  'zombie-name': '🧟', 'fairy-name': '🧚', 'mermaid-name': '🧜', 'gnome-name': '🍄',
  'dinosaur-name': '🦕', 'spaceship-name': '🚀', 'planet-name': '🪐', 'star-name': '⭐',
  'castle-name': '🏰', 'city-name': '🌆', 'country-name': '🌍', 'town-name': '🏘️',
  'racehorse-name': '🐎', 'pub-name': '🍺', 'hotel-name': '🏨', 'restaurant-name': '🍽️',
  'coffee-shop': '☕', 'salon-name': '💇', 'bakery-name': '🥐', 'farm-name': '🌾',
  'boat-name': '⛵', 'ship-name': '🚢', 'tattoo-name': '🔱', 'pen-name': '✒️',
  'rapper-name': '🎤', 'dj-name': '🎧', 'artist-name': '🎨', 'photographer': '📸',
  'youtuber-name': '▶️', 'tiktok-name': '🎵', 'instagram-name': '📷', 'twitter-name': '🐦',
  'fake-name': '🎭', 'funny-name': '😂', 'cute-name': '🥰', 'cool-name': '😎',
  'random-name': '🎲', 'emo-name': '🖤', 'display-name': '🪪', 'channel-name': '📺',
  'club-name': '🎪', 'food-truck': '🚚', 'cocktail-name': '🍸', 'iupac-name': '🔬',
  'victorian-name': '🎩', 'ancient-egyptian': '𓂀', 'scifi-name': '🚀',
  // Social / Bio generators
  'bio-generator': '📝', 'instagram-bio': '📸', 'twitter-bio': '🐦', 'tiktok-bio': '🎵',
  'linkedin-bio': '💼', 'youtube-bio': '▶️', 'caption': '💬', 'hashtag': '#️⃣',
  'youtube-tag': '🏷️', 'instagram-caption': '📷', 'facebook-post': '👍',
  'tweet': '🐦', 'linkedin-post': '💼', 'tiktok-caption': '🎵', 'x-post': '𝕏',
  // SEO tools
  'meta-tag': '🏷️', 'seo-title': '🔍', 'robots-txt': '🤖', 'hreflang': '🌐',
  'schema-markup': '📊', 'canonical-tag': '🔗', 'utm': '📊', 'faq-generator': '❓',
  'keyword': '🗝️', 'sitemap': '🗺️', 'og-tag': '📱', 'twitter-card': '🃏',
  // Writing / AI tools
  'paragraph': '📝', 'sentence': '✍️', 'blog': '📖', 'headline': '📰',
  'story': '📚', 'plot': '🎬', 'hook': '🎣', 'content-brief': '📋',
  'cover-letter': '📄', 'resume': '📄', 'ad-copy': '📢', 'product-description': '🛍️',
  'press-release': '📰', 'email': '📧', 'follow-up': '📨', 'cold-email': '❄️',
  'newsletter': '📧', 'speech': '🎤', 'essay': '📝', 'poem': '🖊️',
  'song': '🎵', 'lyric': '🎼', 'rap': '🎤', 'slogan': '💬',
  'tagline': '💡', 'mission': '🎯', 'vision': '👁️', 'value': '💎',
  'prompt': '💬', 'chatgpt-prompt': '🤖', 'midjourney': '🎨', 'stable-diffusion': '🖼️',
  'dalle': '🎨', 'ai-image': '🖼️', 'writing-prompt': '✍️', 'story-idea': '💡',
  // Business tools
  'invoice': '🧾', 'receipt': '🧾', 'estimate': '📋', 'proposal': '📝',
  'quotation': '💰', 'purchase-order': '📦', 'contract': '📜', 'nda': '🔏',
  'agreement': '🤝', 'policy': '📋', 'terms': '⚖️', 'privacy-policy': '🔒',
  'disclaimer': '⚠️', 'affiliate': '🤝', 'dmca': '©️', 'return-policy': '↩️',
  'coupon': '🎟️', 'discount-code': '🏷️', 'promo': '🎁', 'sku': '🔢',
  'barcode': '|||', 'qr-code': '⬛', 'business-card': '💼', 'letterhead': '📄',
  'flyer': '📄', 'poster': '🖼️', 'mood-board': '🎨', 'logo': '🖼️',
  'favicon': '⭐', 'content-calendar': '📅', 'meeting-agenda': '📋',
  'job-description': '💼', 'testimonial': '⭐', 'review': '⭐',
  // Dev tools
  'uuid': '🔑', 'hash': '#', 'json': '{}', 'css': '🎨', 'html': '🌐',
  'color-palette': '🎨', 'password': '🔐', 'token': '🪙', 'api-key': '🔑',
  'license-key': '🔑', 'recovery-code': '🔑', 'pin-code': '🔢',
  'jwt': '🔏', 'slug': '🔗', 'short-code': '⚡', 'base64': '📦',
  // Utility tools
  'lorem-ipsum': '📄', 'text-case': '🔠', 'word-counter': '🔢', 'random-number': '🎲',
  'random-id': '🆔', 'random-list': '📋', 'coin-flip': '🪙', 'dice': '🎲',
  'wheel-spinner': '🎡', 'timer': '⏱️', 'calculator': '🧮', 'converter': '🔄',
  'anagram': '🔤', 'rhyme': '🎵', 'palindrome': '↔️', 'acronym': '📝',
  // Visual / Design
  'sigil': '✦', 'wave': '🌊', 'fractal': '🌀', 'pattern': '🔷',
  // Misc
  'roast': '🔥', 'pickup-line': '💕', 'compliment': '💝', 'joke': '😄',
  'riddle': '🧩', 'trivia': '🧠', 'truth-or-dare': '🎯', 'icebreaker': '🧊',
  'insult': '😤', 'comeback': '👊', 'excuse': '🤷', 'dare': '🎯',
  'ao3-tag': '🏷️', 'mood-board': '🎨', 'app-name': '📱', 'app-icon': '📱',
  'shopify': '🛍️', 'etsy': '🛍️', 'amazon': '📦',
};

function getIcon(tool) {
  // Check exact slug match first
  const slug = tool.slug;
  for (const [keyword, icon] of Object.entries(iconMap)) {
    if (slug.includes(keyword)) return icon;
  }
  
  // Fallback by category
  const cat = tool.categorySlug;
  const catIcons = {
    'name-generators': '👤',
    'text-font-generators': '✨',
    'social-media-generators': '📱',
    'bio-caption-generators': '📝',
    'seo-marketing-generators': '🔍',
    'gaming-creative-generators': '🎮',
    'creative-story-generators': '📚',
    'writing-generators': '✍️',
    'business-brand-generators': '💼',
    'developer-web-generators': '💻',
    'utility-generators': '⚙️',
    'random-generators': '🎲',
    'general-generators': '⚡',
  };
  return catIcons[cat] || '🛠️';
}

// =============================================
// TAGLINE TEMPLATES by category
// =============================================
function getTagline(tool) {
  const name = tool.name;
  const slug = tool.slug;
  
  // Specific known tools with crafted taglines
  const specificTaglines = {
    'youtube-tag-generator': 'Generate relevant, SEO-optimized YouTube tags that improve video discoverability',
    'instagram-bio-generator': 'Create compelling Instagram bios that attract followers and reflect your personality',
    'meta-tag-generator': 'Generate HTML meta tags, Open Graph tags, and Twitter Cards for perfect SEO',
    'bold-text-generator': 'Convert text to bold Unicode characters for social media bios and posts',
    'cursive-text-generator': 'Transform text into elegant cursive Unicode fonts for Instagram and TikTok',
    'glitch-text-generator': 'Add digital distortion effects to your text for edgy social media aesthetics',
    'password-generator': 'Generate cryptographically strong, memorable passwords with custom rules',
    'lorem-ipsum-generator': 'Create custom placeholder text in multiple formats for mockups and prototypes',
    'fantasy-name-generator': 'Generate immersive, lore-friendly fantasy names for characters, worlds, and stories',
    'text-case-converter': 'Convert text between uppercase, lowercase, title case, camelCase, and more',
    'team-name-generator': 'Generate creative, memorable team names for sports, work, and gaming groups',
    'robots-txt-generator': 'Build a valid robots.txt file with precise crawler rules and sitemap declaration',
    'word-counter': 'Count words, characters, sentences, and reading time in real-time',
    'uuid-generator': 'Generate RFC 4122 compliant UUIDs (v1, v4, v5) for database and API use',
    'random-number-generator': 'Generate truly random numbers with custom ranges, seeds, and formats',
    'small-text-generator': 'Convert text to small superscript and subscript Unicode characters',
    'italic-text-generator': 'Transform text into italic Unicode styles for emphasis on any platform',
    'strikethrough-text-generator': 'Add ~~strikethrough~~ formatting to text for social media and messaging apps',
    'underline-text-generator': "Create underlined text using Unicode for platforms that don't support HTML",
    'vaporwave-text-generator': 'Transform text into aesthetic wide vaporwave / FULLWIDTH Unicode characters',
    'reverse-text-generator': 'Mirror and reverse text, words, or sentences instantly',
    'unicode-text-generator': 'Convert any text to 50+ Unicode fonts, symbols, and decorative styles',
    'hashtag-generator': 'Generate targeted hashtag sets for Instagram, TikTok, X, and LinkedIn',
    'twitter-bio-generator': 'Craft a punchy Twitter/X bio that communicates your brand in 160 characters',
    'tiktok-bio-generator': 'Create a catchy TikTok bio that grows your following and shows your personality',
    'linkedin-bio-generator': 'Draft a professional LinkedIn About section that showcases your expertise',
    'instagram-caption-generator': 'Generate engaging Instagram captions with hooks, hashtags, and CTAs',
    'business-name-generator': 'Generate original, trademark-searchable business names for any industry',
    'domain-name-generator': 'Find creative, available domain name ideas for your next online project',
    'seo-title-generator': 'Create click-worthy, keyword-optimized page titles under 60 characters',
    'paragraph-generator': 'Generate structured, readable paragraphs for any topic, tone, and audience',
    'story-plot-generator': 'Generate compelling story plot ideas with conflict, character arcs, and resolution',
    'blog-outline-generator': 'Create SEO-structured blog post outlines with H2s, H3s, and key talking points',
    'qr-code-generator': 'Generate custom QR codes for URLs, WiFi, contact cards, and more',
    'invoice-generator': 'Create professional, print-ready invoices with line items, taxes, and totals',
    'receipt-generator': 'Generate clean, itemized receipts for any transaction or business',
    'color-palette-generator': 'Generate harmonious color palettes for UI design, branding, and art',
    'css-code-generator': 'Generate clean, cross-browser CSS code for buttons, cards, and animations',
    'html-code-generator': 'Generate valid HTML5 boilerplate and component code snippets',
  };
  
  if (specificTaglines[slug]) return specificTaglines[slug];
  
  // Category-based templates
  const cat = tool.categorySlug;
  const templates = {
    'name-generators': `Generate unique, memorable ${name.replace(' Generator', '').toLowerCase()} options with style filters and instant copy`,
    'text-font-generators': `Convert plain text to ${name.replace(' Generator', '').toLowerCase()} Unicode styles for any social platform`,
    'social-media-generators': `Create high-engagement ${name.replace(' Generator', '').toLowerCase()} content with platform-specific formatting`,
    'bio-caption-generators': `Draft compelling ${name.replace(' Generator', '').toLowerCase()} content that resonates with your audience`,
    'seo-marketing-generators': `Generate SEO-optimized ${name.replace(' Generator', '').toLowerCase()} content to boost search visibility`,
    'gaming-creative-generators': `Generate immersive ${name.replace(' Generator', '').toLowerCase()} ideas for games, stories, and creative projects`,
    'creative-story-generators': `Generate captivating ${name.replace(' Generator', '').toLowerCase()} ideas for storytelling and creative writing`,
    'writing-generators': `Draft professional ${name.replace(' Generator', '').toLowerCase()} content with tone controls and style options`,
    'business-brand-generators': `Generate professional ${name.replace(' Generator', '').toLowerCase()} assets for your business and brand`,
    'developer-web-generators': `Generate valid, production-ready ${name.replace(' Generator', '').toLowerCase()} code with custom configuration`,
    'utility-generators': `Process and ${name.replace(' Generator', '').toLowerCase()} output instantly with precision controls`,
    'random-generators': `Generate random ${name.replace(' Generator', '').toLowerCase()} results with custom constraints and filters`,
  };
  return templates[cat] || `Generate high-quality ${name.toLowerCase()} results with custom options and instant export`;
}

// =============================================
// DESCRIPTION TEMPLATES
// =============================================
function getDescription(tool) {
  const name = tool.name;
  const slug = tool.slug;
  const kw = tool.primaryKeyword || name.toLowerCase();
  
  // Keep original descriptions that are already good (not boilerplate)
  const boilerplateCheck = 'to generate tailored';
  if (tool.description && !tool.description.includes(boilerplateCheck) && tool.description.length > 150) {
    return tool.description;
  }
  
  const cat = tool.categorySlug;
  
  const templates = {
    'name-generators': `The <strong>${name}</strong> helps you brainstorm original ${kw} ideas instantly in your browser. Enter your topic, audience, or style preferences and get a curated shortlist of name options. Adjust tone, length, and genre filters to match your brand or creative project. Review, refine, and copy your favorites in one click — no account required.`,
    'text-font-generators': `The <strong>${name}</strong> converts standard text into stylized Unicode font variations instantly in your browser. Input any text and get ${kw} results ready to copy and paste into Instagram bios, TikTok captions, Discord usernames, Twitter posts, or anywhere that accepts Unicode. No installation needed — 100% client-side.`,
    'social-media-generators': `The <strong>${name}</strong> generates platform-optimized ${kw} content tailored for your audience and goal. Add your topic, brand voice, and constraints to get multiple draft options you can review, customize, and post directly. All outputs are drafts — always adapt before publishing.`,
    'bio-caption-generators': `The <strong>${name}</strong> creates compelling ${kw} drafts for any platform or personal brand. Input your name, niche, and tone to generate options that you can refine and make your own. All generation happens locally — your content stays private.`,
    'seo-marketing-generators': `The <strong>${name}</strong> generates SEO-optimized ${kw} content with best-practice formatting and keyword placement. Use it to draft, test, and refine your ${kw} before publishing — all processing is 100% client-side with no data stored.`,
    'gaming-creative-generators': `The <strong>${name}</strong> generates creative, lore-consistent ${kw} ideas for games, stories, and worldbuilding projects. Customize genre, theme, and style to get options that fit your creative vision. Use generated results as starting points — personalize before use.`,
    'creative-story-generators': `The <strong>${name}</strong> sparks story ideas by generating ${kw} concepts with character hooks, conflict seeds, and world-building details. Use the results as creative prompts — the best stories come from your own voice and experience.`,
    'writing-generators': `The <strong>${name}</strong> drafts professional ${kw} content with adjustable tone, format, and length controls. Generate multiple options, compare results, and choose the draft that best fits your communication goals. Review all AI-assisted drafts before final use.`,
    'business-brand-generators': `The <strong>${name}</strong> generates professional ${kw} assets that you can adapt for your business needs. Input your industry, audience, and key requirements to get tailored options. All outputs are drafts — verify accuracy and legal requirements before deployment.`,
    'developer-web-generators': `The <strong>${name}</strong> generates valid, production-ready ${kw} output with configurable parameters. Select your format, encoding, and constraints to get precise results instantly. All computation runs 100% in your browser — no data is sent to external servers.`,
    'utility-generators': `The <strong>${name}</strong> processes and generates ${kw} output with precision controls and instant results. Adjust format options, character sets, and length parameters to match your requirements. Runs entirely in your browser with zero server dependencies.`,
    'random-generators': `The <strong>${name}</strong> generates random ${kw} results with configurable constraints and filters. Set ranges, categories, and exclusion rules to get precisely the results you need. All randomization uses cryptographically secure algorithms — 100% client-side.`,
  };
  
  return templates[cat] || `The <strong>${name}</strong> is a free browser-based tool for generating ${kw} results instantly. Configure your options, generate multiple outputs, and copy your favorites to clipboard. No signup required — all processing is 100% client-side.`;
}

// =============================================
// META TITLE & DESCRIPTION TEMPLATES
// =============================================
function getMetaTitle(tool) {
  // Keep existing good meta titles
  if (tool.metaTitle && !tool.metaTitle.includes('Practical Generator Tool') && tool.metaTitle.length <= 60) {
    return tool.metaTitle;
  }
  
  const name = tool.name.replace(' Generator', '');
  const kw = tool.primaryKeyword || tool.name.toLowerCase();
  
  // Short, keyword-first titles under 60 chars
  const templates = {
    'name-generators': `${name} — Free & Original Name Ideas`,
    'text-font-generators': `${name} — Copy & Paste Unicode Fonts`,
    'social-media-generators': `${name} — Platform-Ready Content`,
    'bio-caption-generators': `${name} — Custom Bio Drafts`,
    'seo-marketing-generators': `${name} — SEO-Optimized Output`,
    'gaming-creative-generators': `${name} — Immersive Ideas`,
    'creative-story-generators': `${name} — Story Ideas & Prompts`,
    'writing-generators': `${name} — Professional Drafts`,
    'business-brand-generators': `${name} — Professional Assets`,
    'developer-web-generators': `${name} — Valid Code Output`,
    'utility-generators': `${name} — Fast & Precise`,
    'random-generators': `${name} — Custom Random Results`,
  };
  
  const title = templates[tool.categorySlug] || `${tool.name} — Free Online Tool`;
  return title.length > 60 ? `${tool.name} — Free Online Tool` : title;
}

function getMetaDescription(tool) {
  // Keep existing good meta descriptions
  if (tool.metaDescription && 
    !tool.metaDescription.includes('create focused draft options with your topic and constraints') &&
    tool.metaDescription.length >= 100 && tool.metaDescription.length <= 160) {
    return tool.metaDescription;
  }
  
  const name = tool.name;
  const kw = tool.primaryKeyword || name.toLowerCase();
  const cat = tool.categorySlug;
  
  const templates = {
    'name-generators': `Free ${name} — generate unique, creative ${kw} ideas instantly. Adjust style, tone, and length filters to find names that fit your brand or character. 100% free, no signup.`,
    'text-font-generators': `Free ${name} — convert text to stylish Unicode fonts for Instagram, TikTok, Discord, and more. Copy and paste any style instantly. No signup required.`,
    'social-media-generators': `Free ${name} — generate engaging ${kw} drafts with platform-specific formatting. Customize tone and style, then review before posting. 100% client-side.`,
    'bio-caption-generators': `Free ${name} — draft compelling ${kw} content for any platform. Customize your tone and copy results instantly. No account required.`,
    'seo-marketing-generators': `Free ${name} — generate SEO-optimized ${kw} with best-practice formatting. Preview, adjust, and export results instantly. 100% client-side.`,
    'gaming-creative-generators': `Free ${name} — generate creative, lore-consistent ${kw} ideas for games and stories. Customize genre and style. No signup needed.`,
    'creative-story-generators': `Free ${name} — spark original ${kw} ideas with conflict hooks, character arcs, and setting details. Use as creative prompts. 100% free.`,
    'writing-generators': `Free ${name} — draft professional ${kw} content with adjustable tone and format controls. Generate multiple options and pick the best. No signup.`,
    'business-brand-generators': `Free ${name} — generate professional ${kw} assets for your business. Customize by industry and audience. Review before use. No account needed.`,
    'developer-web-generators': `Free ${name} — generate valid ${kw} with configurable parameters. Instant output, zero server dependencies. 100% client-side privacy.`,
    'utility-generators': `Free ${name} — process and generate ${kw} output with precision controls. Fast, accurate, and 100% client-side. No signup required.`,
    'random-generators': `Free ${name} — generate random ${kw} results with custom constraints. Set ranges, categories, and filters for precise output. 100% free.`,
  };
  
  const desc = templates[cat] || `Free ${name} — generate ${kw} results instantly in your browser. Customize options, copy results, and export instantly. No signup, 100% private.`;
  
  // Ensure within 100-160 char bounds
  if (desc.length > 160) return desc.substring(0, 157) + '...';
  return desc;
}

// =============================================
// FAQ TEMPLATES by category
// =============================================
function getFaqs(tool) {
  const name = tool.name;
  const kw = tool.primaryKeyword || name.toLowerCase();
  
  // Keep existing good FAQs (non-boilerplate)
  const boilerplateAnswers = [
    'is a free client-side tool to generate tailored outputs instantly in your browser',
    'Use the built-in option controls to select specific genres, themes, and formats',
    'All computation executes 100% locally inside your web browser via JavaScript. Zero input data is stored on external servers.',
    'All output code, text, and generated assets are free to use in personal and commercial projects without licensing fees.',
    'is a free client-side utility that generates custom outputs directly in your browser',
    'Adjust the style filters and format controls to generate tailored outputs matching your constraints.',
    'All processing happens 100% locally in your web browser using JavaScript. No input data is sent to external servers.',
    'All generated ideas, text, and assets are 100% free for personal and commercial projects.'
  ];
  
  const hasBoilerplate = tool.faqItems && tool.faqItems.some(f => boilerplateAnswers.some(b => f.a.includes(b)));
  if (!hasBoilerplate && tool.faqItems && tool.faqItems.length >= 4) {
    return tool.faqItems; // Keep existing good FAQs
  }
  
  const cat = tool.categorySlug;
  
  const faqTemplates = {
    'name-generators': [
      { q: `What is the ${name}?`, a: `The ${name} is a free, browser-based tool that creates original ${kw} options using curated word lists, style filters, and combinatorial logic. It runs 100% client-side — your inputs never leave your device.` },
      { q: `How do I get better results from the ${name}?`, a: `Add specific context — include your industry, target audience, brand tone (professional, playful, edgy), and any keywords you want included or avoided. More constraints usually produce more relevant results.` },
      { q: `Are the generated names trademark-free to use?`, a: `Generated names are creative suggestions only. Always run a trademark search through your country's IP office (e.g., USPTO, EUIPO) and check domain/social availability before using any name commercially.` },
      { q: `Can I use generated names for free commercially?`, a: `Yes — the output itself is free to use, but you must independently verify trademark clearance, domain availability, and any applicable naming regulations before commercializing a name.` },
      { q: `Does the ${name} store my inputs or generated results?`, a: `No. All generation logic runs locally in your browser via JavaScript. No input text, preferences, or outputs are transmitted to or stored on any server.` },
    ],
    'text-font-generators': [
      { q: `What is the ${name}?`, a: `The ${name} converts standard text into stylized Unicode character variations that look like custom fonts. These Unicode characters are supported on Instagram, TikTok, Twitter/X, Discord, WhatsApp, and most modern platforms.` },
      { q: `Why does styled text sometimes look different on other devices?`, a: `Unicode character rendering depends on the system font installed on each device. Some glyphs may appear slightly different across iOS, Android, Windows, and macOS. Preview your result on the target platform before publishing.` },
      { q: `Are there limits on how much text I can convert?`, a: `No. The ${name} is completely free with no character limits, usage caps, or rate limiting. Convert as much text as you need.` },
      { q: `Can I copy generated text to Instagram, TikTok, and Discord?`, a: `Yes. Use the copy button to copy styled text to your clipboard and paste it directly into any text field — including social media bios, post captions, usernames, and messaging apps.` },
      { q: `Does the ${name} work on mobile devices?`, a: `Yes. The tool is fully responsive and works on all modern smartphones and tablets. Tap any style to instantly copy it on iOS and Android.` },
    ],
    'social-media-generators': [
      { q: `What is the ${name}?`, a: `The ${name} creates platform-specific ${kw} drafts tailored to your audience, brand voice, and content goals. It provides multiple draft options you can review, customize, and post after editing.` },
      { q: `Should I post AI-generated content without editing?`, a: `No. Always review and personalize generated content before posting. Add your own voice, correct any factual claims, verify brand-safe language, and adapt the tone to match your authentic style.` },
      { q: `Which platforms are supported?`, a: `Generated content is formatted for all major platforms including Instagram, TikTok, LinkedIn, Twitter/X, Facebook, YouTube, and Pinterest. Platform-specific length limits and hashtag conventions are applied automatically.` },
      { q: `Is my content input kept private?`, a: `Yes. All generation runs 100% client-side in your browser. No input text, account details, or generated content is stored on external servers.` },
    ],
    'seo-marketing-generators': [
      { q: `What is the ${name}?`, a: `The ${name} generates SEO-optimized ${kw} content using current best practices for keyword placement, length, and formatting. Use it to draft, test, and refine your ${kw} before publishing.` },
      { q: `Does this replace professional SEO advice?`, a: `No. The ${name} provides a strong starting point and applies common best practices, but SEO strategy depends on your specific niche, competition, and algorithm updates. Review outputs with your SEO team before publishing at scale.` },
      { q: `Is generated SEO content safe to use directly?`, a: `Generated ${kw} content should always be reviewed for accuracy, originality, and brand compliance before use. Validate that primary keywords appear naturally and that the content genuinely reflects your page's value.` },
      { q: `Is the tool free to use?`, a: `Yes. The ${name} is 100% free with no usage limits, no account required, and no rate limiting. All processing is client-side.` },
    ],
    'developer-web-generators': [
      { q: `What is the ${name}?`, a: `The ${name} generates valid, production-ready ${kw} output with configurable parameters. Select your format, encoding, and constraints to get precise output instantly — all computed locally in your browser.` },
      { q: `Is the generated output cryptographically secure?`, a: `The ${name} uses the Web Crypto API (where applicable) and secure pseudo-random algorithms to generate output. For production security use cases, always validate against your specific security requirements and consult a security professional.` },
      { q: `Can I use generated output in production systems?`, a: `Yes, with appropriate validation. Generated code, tokens, and IDs are standards-compliant, but always test thoroughly and verify against your production environment's requirements before deployment.` },
      { q: `Does the tool send any data to external servers?`, a: `No. All computation runs entirely in your browser using JavaScript. No input parameters, configuration, or output values are transmitted externally.` },
    ],
    'utility-generators': [
      { q: `What is the ${name}?`, a: `The ${name} is a free, browser-based utility that processes and generates ${kw} output instantly. All computation runs client-side — no data is sent to external servers.` },
      { q: `How accurate are the results?`, a: `The ${name} applies consistent algorithms and formatting rules to produce accurate output. For mission-critical use cases, always verify results against your specific requirements.` },
      { q: `Is there a usage limit?`, a: `No. The ${name} is completely free with no usage limits, no rate limiting, and no account required. Generate as much output as you need.` },
      { q: `Does this work offline?`, a: `Yes — once the page loads, all processing happens in your browser. The tool works in airplane mode or with an intermittent internet connection.` },
    ],
    'random-generators': [
      { q: `What is the ${name}?`, a: `The ${name} generates random ${kw} results using cryptographically secure randomization with configurable constraints. Set ranges, categories, and exclusion rules for precisely the results you need.` },
      { q: `How random are the results?`, a: `The ${name} uses the browser's Web Crypto API for true randomness where supported, producing statistically unbiased results. For cryptographic security requirements, consult a security engineer.` },
      { q: `Can I set custom constraints?`, a: `Yes. Adjust range settings, category filters, exclusion lists, and format options to narrow results to exactly what you need.` },
      { q: `Is there a limit on how many results I can generate?`, a: `No. Generate as many random results as you need — the tool is 100% free with no rate limiting or account requirements.` },
    ],
  };
  
  // Default fallback
  const defaultFaqs = [
    { q: `What is the ${name}?`, a: `The ${name} is a free browser-based tool that generates high-quality ${kw} results instantly. All processing runs 100% client-side — your inputs and outputs remain completely private.` },
    { q: `How do I get the best results?`, a: `Be specific with your inputs. The more context you provide — including your topic, audience, tone, and constraints — the more relevant and usable your results will be.` },
    { q: `Is my data private when using the ${name}?`, a: `Yes. All generation logic runs locally in your web browser using JavaScript. No input data, preferences, or generated content is transmitted to or stored on any external server.` },
    { q: `Can I use generated output for commercial projects?`, a: `Yes. All generated output is free for personal and commercial use. For name suggestions, always verify trademark availability independently before commercial use.` },
    { q: `Does the ${name} require a subscription or account?`, a: `No. The ${name} is 100% free with no account, subscription, or payment required. Generate unlimited results at no cost.` },
  ];
  
  return faqTemplates[cat] || defaultFaqs;
}

// =============================================
// GENERATOR TYPE CORRECTION
// =============================================
function getGeneratorType(tool) {
  const slug = tool.slug;
  const textTransformSlugs = [
    'bold-text-generator', 'italic-text-generator', 'cursive-text-generator',
    'glitch-text-generator', 'strikethrough-text-generator', 'underline-text-generator',
    'vaporwave-text-generator', 'reverse-text-generator', 'small-text-generator',
    'unicode-text-generator', 'cool-text-generator', 'bubble-text-generator',
    'pixel-text-generator', 'retro-text-generator', 'typewriter-text-generator',
    'papyrus-text-generator', 'serif-text-generator', 'emo-text-generator',
    'text-case-converter', 'word-counter', 'anagram-generator',
    'anagram-of-name-generator', 'slug-generator'
  ];
  
  const converterSlugs = [
    'base64-encoder', 'hex-converter', 'binary-converter', 'text-case-converter',
    'json-formatter', 'css-minifier', 'html-minifier'
  ];
  
  const utilitySlugs = [
    'password-generator', 'uuid-generator', 'hash-generator', 'qr-code-generator',
    'barcode-generator', 'token-generator', 'api-key-generator', 'license-key-generator',
    'recovery-code-generator', 'pin-code-generator', 'jwt-generator', 'random-id-generator',
    'random-number-generator', 'random-list-generator', 'robots-txt-generator',
    'sitemap-generator', 'word-counter', 'slug-generator', 'short-code-generator',
    'utm-link-generator', 'color-palette-generator'
  ];
  
  const visualSlugs = [
    'sigil-generator', 'wave-generator', 'favicon-generator', 'logo-generator',
    'poster-generator', 'flyer-generator', 'mood-board-generator', 'app-icon-generator',
    'qr-code-generator', 'barcode-generator', 'color-palette-generator',
    'css-code-generator', 'html-code-generator', 'business-card-generator',
    'letterhead-generator', 'fancy-map-generator', 'fantasy-map-generator'
  ];
  
  const templateSlugs = [
    'invoice-generator', 'receipt-generator', 'estimate-generator', 'proposal-generator',
    'quotation-generator', 'purchase-order-generator', 'contract-generator',
    'nda-generator', 'privacy-policy-generator', 'terms-and-conditions-generator',
    'cookie-policy-generator', 'disclaimer-generator', 'affiliate-disclosure-generator',
    'dmca-policy-generator', 'return-policy-generator', 'shipping-policy-generator',
    'acceptable-use-policy-generator', 'job-description-generator', 'cover-letter-generator',
    'resume-summary-generator', 'press-release-generator', 'meeting-agenda-generator',
    'content-calendar-generator', 'blog-outline-generator', 'flashcard-generator',
    'email-generator', 'follow-up-email-generator', 'cold-email-generator',
    'newsletter-generator', 'ad-copy-generator', 'product-description-generator',
    'amazon-listing-generator', 'etsy-listing-generator', 'shopify-product-description-generator',
    'linkedin-summary-generator'
  ];
  
  if (textTransformSlugs.includes(slug)) return 'text-transform';
  if (converterSlugs.includes(slug)) return 'converter';
  if (visualSlugs.includes(slug)) return 'visual';
  if (utilitySlugs.includes(slug)) return 'utility';
  if (templateSlugs.includes(slug)) return 'template';
  
  // Keep existing type if already set correctly
  return tool.generatorType || 'random-combo';
}

// =============================================
// SECONDARY KEYWORDS ENRICHMENT
// =============================================
function getSecondaryKeywords(tool) {
  // Keep if already has good keywords (>= 3 non-duplicate)
  if (tool.secondaryKeywords && tool.secondaryKeywords.length >= 3 && 
    !tool.secondaryKeywords.every(k => k === tool.primaryKeyword || k.startsWith('free '))) {
    return tool.secondaryKeywords;
  }
  
  const name = tool.name;
  const kw = tool.primaryKeyword || name.toLowerCase();
  const namePart = name.replace(' Generator', '').toLowerCase();
  
  return [
    `free ${kw}`,
    `online ${kw}`,
    `${kw} tool`,
    `best ${kw}`,
    `${namePart} maker`,
  ];
}

// =============================================
// APPLY FIXES
// =============================================
let fixedCount = 0;
let iconsFix = 0, taglinesFix = 0, descFix = 0, faqsFix = 0, titleFix = 0, descMeta = 0, typeFix = 0, kwFix = 0;

const enrichedTools = tools.map(tool => {
  const enriched = { ...tool };
  let changed = false;
  
  // Fix icon
  if (tool.icon === '⚡' || tool.icon === '🛠️') {
    enriched.icon = getIcon(tool);
    iconsFix++;
    changed = true;
  }
  
  // Fix tagline
  if (!tool.tagline || tool.tagline.includes('with focused options and review notes') || tool.tagline.includes('generate tailored')) {
    enriched.tagline = getTagline(tool);
    taglinesFix++;
    changed = true;
  }
  
  // Fix description
  if (!tool.description || (tool.description.includes('to generate tailored') && tool.description.includes('custom style filters, format controls, and instant copy/export options'))) {
    enriched.description = getDescription(tool);
    descFix++;
    changed = true;
  }
  
  // Fix metaTitle
  if (!tool.metaTitle || tool.metaTitle.includes('Practical Generator Tool')) {
    enriched.metaTitle = getMetaTitle(tool);
    titleFix++;
    changed = true;
  }
  
  // Fix metaDescription
  if (!tool.metaDescription || tool.metaDescription.includes('create focused draft options with your topic and constraints. Review, edit, and adapt results before use.')) {
    enriched.metaDescription = getMetaDescription(tool);
    descMeta++;
    changed = true;
  }
  
  // Fix FAQs
  const boilerplateAnswers = [
    'is a free client-side tool to generate tailored outputs instantly in your browser',
    'Use the built-in option controls to select specific genres',
    'All computation executes 100% locally inside your web browser via JavaScript. Zero input data is stored on external servers.',
    'All output code, text, and generated assets are free to use in personal and commercial projects without licensing fees.',
    'is a free client-side utility that generates custom outputs directly in your browser',
    'Adjust the style filters and format controls to generate tailored outputs matching your constraints.',
    'All processing happens 100% locally in your web browser using JavaScript. No input data is sent to external servers.',
    'All generated ideas, text, and assets are 100% free for personal and commercial projects.'
  ];
  const hasBoilerplate = tool.faqItems && tool.faqItems.some(f => boilerplateAnswers.some(b => f.a.includes(b)));
  if (!tool.faqItems || tool.faqItems.length < 4 || hasBoilerplate) {
    enriched.faqItems = getFaqs(tool);
    faqsFix++;
    changed = true;
  }
  
  // Fix generatorType
  const correctType = getGeneratorType(tool);
  if (correctType !== tool.generatorType) {
    enriched.generatorType = correctType;
    typeFix++;
    changed = true;
  }
  
  // Fix secondaryKeywords
  if (!tool.secondaryKeywords || tool.secondaryKeywords.length < 3) {
    enriched.secondaryKeywords = getSecondaryKeywords(tool);
    kwFix++;
    changed = true;
  }
  
  if (changed) fixedCount++;
  return enriched;
});

// =============================================
// WRITE BACK
// =============================================
const header = `export interface ToolOption {
  id: string;
  label: string;
  type: 'select' | 'checkbox' | 'radio' | 'number' | 'text';
  options?: { value: string; label: string }[];
  default?: string | boolean | number;
  min?: number;
  max?: number;
}

export interface Tool {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  category: string;
  categorySlug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  userIntent: string;
  generatorType: 'text-transform' | 'random-combo' | 'template' | 'utility' | 'converter' | 'visual';
  popular?: boolean;
  faqItems: { q: string; a: string }[];
  relatedSlugs: string[];
  toolOptions?: ToolOption[];
  outputFormat?: 'text' | 'html' | 'image' | 'list' | 'ui';
  disclaimer?: string;
}

export const tools: Tool[] = [`;

const toolStrings = enrichedTools.map(t => {
  return `  ${JSON.stringify(t, null, 2).replace(/\n/g, '\n  ')}`;
});

const finalContent = `${header}\n${toolStrings.join(',\n')}\n];\n
export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getPopularTools(limit = 12): Tool[] {
  return tools.filter((t) => t.popular).slice(0, limit);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => t.categorySlug === categorySlug);
}

export function getAllTools(): Tool[] {
  return tools;
}

export function getRelatedTools(slug: string, limit = 4): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tools
    .filter((t) => tool.relatedSlugs.includes(t.slug) || (t.categorySlug === tool.categorySlug && t.slug !== slug))
    .slice(0, limit);
}
`;

fs.writeFileSync(toolsPath, finalContent, 'utf8');

console.log(`\n✅ BATCH A+B ENRICHMENT COMPLETE`);
console.log(`   Tools processed: ${enrichedTools.length}`);
console.log(`   Tools changed: ${fixedCount}`);
console.log(`   Icons fixed: ${iconsFix}`);
console.log(`   Taglines fixed: ${taglinesFix}`);
console.log(`   Descriptions fixed: ${descFix}`);
console.log(`   Meta Titles fixed: ${titleFix}`);
console.log(`   Meta Descriptions fixed: ${descMeta}`);
console.log(`   FAQs enriched: ${faqsFix}`);
console.log(`   Generator types fixed: ${typeFix}`);
console.log(`   Secondary keywords added: ${kwFix}`);
