export interface ToolHub {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  categorySlugs: string[];
  featuredToolSlugs: string[];
  relatedHubSlugs: string[];
  faqs: { q: string; a: string }[];
}

export const toolHubs: ToolHub[] = [
  {
    slug: 'name-generators',
    title: 'Name Generators Hub - TapToGen',
    h1: 'Name Generators',
    description: 'Find free name generators for characters, brands, babies, usernames, fantasy worlds, pets, teams, and creative projects on TapToGen.',
    intro: 'Start with the kind of name you need, then move into more specific generators for characters, brands, games, stories, teams, places, and polished public-facing ideas.',
    categorySlugs: ['name-generators', 'gaming-generators'],
    featuredToolSlugs: [
      'name-generator', 'username-generator', 'baby-name-generator', 'middle-name-generator', 'last-name-generator',
      'nickname-generator', 'character-name-generator', 'fantasy-name-generator', 'business-name-generator',
      'team-name-generator', 'clan-name-generator', 'guild-name-generator', 'band-name-generator',
      'podcast-name-generator', 'dragon-name-generator', 'wizard-name-generator', 'viking-name-generator',
      'japanese-name-generator', 'korean-name-generator', 'city-name-generator', 'restaurant-name-generator',
      'coffee-shop-name-generator', 'book-name-generator', 'movie-name-generator'
    ],
    relatedHubSlugs: ['business-generators', 'creative-generators', 'text-generators'],
    faqs: [
      { q: 'Which name generator should I start with?', a: 'Use the general Name Generator for broad brainstorming, then switch to a specific tool such as Character Name Generator, Business Name Generator, Baby Name Generator, or Fantasy Name Generator.' },
      { q: 'Can I use generated names publicly?', a: 'Treat names as draft ideas. Check spelling, availability, trademarks, platform rules, and confusing similarity before using a name for a real brand, product, profile, or publication.' },
      { q: 'How do I get better name ideas?', a: 'Add audience, tone, genre, words to include, words to avoid, and the place where the name will appear.' }
    ]
  },
  {
    slug: 'text-generators',
    title: 'Text Generators and Font Tools - TapToGen',
    h1: 'Text Generators and Font Tools',
    description: 'Browse free text generators for fancy text, bold Unicode, cursive fonts, glitch text, case conversion, ASCII art, and copy-paste styling.',
    intro: 'Use these tools to transform plain text into copyable styles, clean formats, decorative labels, captions, and practical text utilities.',
    categorySlugs: ['text-font-generators', 'utility-generators'],
    featuredToolSlugs: [
      'fancy-text-generator', 'bold-text-generator', 'cursive-text-generator', 'italic-text-generator',
      'unicode-text-generator', 'small-text-generator', 'strikethrough-text-generator', 'underline-text-generator',
      'vaporwave-text-generator', 'glitch-text-generator', 'reverse-text-generator', 'text-case-converter',
      'ascii-text-generator', 'special-character-generator', 'cool-text-generator', 'old-english-text-generator',
      'uwu-text-generator', 'leet-text-generator', 'random-text-generator', 'gibberish-generator',
      'repeat-text-generator', 'big-text-generator', 'bubble-text-generator', 'serif-generator'
    ],
    relatedHubSlugs: ['writing-generators', 'creative-generators', 'name-generators'],
    faqs: [
      { q: 'Are fancy text results real fonts?', a: 'Most fancy text output uses Unicode characters that look like fonts. Paste support depends on the app, browser, and platform.' },
      { q: 'What should I check before publishing styled text?', a: 'Check readability, accessibility, search visibility, and whether the platform supports the characters you copied.' },
      { q: 'Which text tool is best for cleanup?', a: 'Use Text Case Converter for formatting, Reverse Text Generator for quick transformations, and Word Counter when you need length checks.' }
    ]
  },
  {
    slug: 'writing-generators',
    title: 'Writing Generators Hub - TapToGen',
    h1: 'Writing Generators',
    description: 'Explore writing generators for paragraphs, prompts, outlines, essays, blog planning, emails, stories, scripts, and content drafts.',
    intro: 'These writing tools help you shape first drafts, outlines, prompts, and copy blocks that you can review, combine, and adapt for your audience.',
    categorySlugs: ['ai-writing-generators', 'bio-caption-generators'],
    featuredToolSlugs: [
      'paragraph-generator', 'sentence-generator', 'writing-prompt-generator', 'blog-outline-generator',
      'content-brief-generator', 'essay-topic-generator', 'thesis-statement-generator', 'story-plot-generator',
      'dialogue-tag-generator', 'character-prompt-generator', 'cold-email-generator', 'email-subject-generator',
      'follow-up-email-generator', 'landing-page-copy-generator', 'ad-copy-generator', 'product-benefits-generator',
      'quiz-generator', 'flashcard-generator', 'study-plan-generator', 'lesson-plan-generator',
      'research-question-generator', 'bibliography-generator', 'multiple-choice-generator'
    ],
    relatedHubSlugs: ['seo-generators', 'business-generators', 'creative-generators'],
    faqs: [
      { q: 'Are writing generator outputs final copy?', a: 'No. Use them as editable drafts, then check facts, originality, tone, claims, and fit for the real audience.' },
      { q: 'How do I make writing outputs less generic?', a: 'Add the audience, purpose, format, tone, constraints, examples, and what the final piece should avoid.' },
      { q: 'Which tools help with SEO writing?', a: 'Start with Blog Outline Generator or Content Brief Generator, then use SEO Title Generator and Meta Description Generator for page metadata.' }
    ]
  },
  {
    slug: 'seo-generators',
    title: 'SEO Generators Hub - TapToGen',
    h1: 'SEO Generators',
    description: 'Use free SEO generators for meta tags, title tags, descriptions, schema, hreflang, robots.txt, slugs, sitemaps, and content planning.',
    intro: 'These tools help draft metadata, technical SEO snippets, search-intent notes, and implementation checklists for pages you will review before publishing.',
    categorySlugs: ['seo-generators', 'developer-generators'],
    featuredToolSlugs: [
      'meta-tag-generator', 'meta-description-generator', 'seo-title-generator', 'canonical-tag-generator',
      'robots-txt-generator', 'hreflang-tag-generator', 'schema-tag-generator', 'open-graph-generator',
      'slug-generator', 'sitemap-generator', 'breadcrumb-generator', 'utm-generator', 'keyword-generator',
      'blog-outline-generator', 'content-brief-generator', 'image-alt-text-generator', 'pwa-manifest-generator',
      'htaccess-generator', 'html-code-generator', 'css-code-generator'
    ],
    relatedHubSlugs: ['writing-generators', 'business-generators', 'text-generators'],
    faqs: [
      { q: 'Can these SEO tools guarantee rankings?', a: 'No. They create drafts and implementation helpers. Review search intent, page quality, crawl rules, and current SEO guidance before publishing.' },
      { q: 'Which SEO generator should I use first?', a: 'For a page draft, start with SEO Title Generator, Meta Description Generator, and Meta Tag Generator. For technical checks, use Robots.txt, Canonical Tag, Hreflang, and Schema tools.' },
      { q: 'Should generated SEO snippets be edited?', a: 'Yes. Match every title, description, URL, and schema field to the actual page content and site rules.' }
    ]
  },
  {
    slug: 'business-generators',
    title: 'Business Generators Hub - TapToGen',
    h1: 'Business Generators',
    description: 'Browse business generators for brand names, product names, domains, proposals, estimates, product copy, customer personas, and marketing drafts.',
    intro: 'Use these generators to brainstorm business names, product positioning, customer-facing copy, operational drafts, and launch materials that still need human review.',
    categorySlugs: ['business-generators'],
    featuredToolSlugs: [
      'business-name-generator', 'domain-name-generator', 'product-name-generator', 'brand-kit-generator',
      'logo-generator', 'app-name-generator', 'app-icon-generator', 'shop-name-generator', 'cafe-name-generator',
      'restaurant-name-generator', 'coffee-shop-name-generator', 'bakery-name-generator', 'salon-name-generator',
      'hotel-name-generator', 'food-truck-name-generator', 'business-card-generator', 'letterhead-generator',
      'proposal-generator', 'estimate-generator', 'quotation-generator', 'purchase-order-generator',
      'product-bullet-points-generator', 'customer-persona-generator', 'sales-email-generator'
    ],
    relatedHubSlugs: ['name-generators', 'seo-generators', 'writing-generators'],
    faqs: [
      { q: 'Can I use generated business names immediately?', a: 'Use them for brainstorming first. Check domains, social handles, trademarks, local registrations, and market confusion before launching.' },
      { q: 'Which tools help with product launches?', a: 'Try Product Name Generator, Product Benefits Generator, Product Bullet Points Generator, Brand Kit Generator, and Landing Page Copy Generator.' },
      { q: 'Are business document drafts legally complete?', a: 'No. Operational and business drafts need review for your real details, jurisdiction, policies, pricing, and professional requirements.' }
    ]
  },
  {
    slug: 'creative-generators',
    title: 'Creative Generators Hub - TapToGen',
    h1: 'Creative Generators',
    description: 'Find creative generators for story titles, characters, bands, songs, prompts, fantasy maps, posters, mood boards, names, and idea exploration.',
    intro: 'These tools are built for creative exploration: story starts, character concepts, names, titles, visual prompts, playful drafts, and worldbuilding helpers.',
    categorySlugs: ['creative-generators', 'gaming-generators'],
    featuredToolSlugs: [
      'story-name-generator', 'story-plot-generator', 'character-name-generator', 'character-prompt-generator',
      'band-name-generator', 'song-name-generator', 'album-name-generator', 'rap-name-generator',
      'superhero-name-generator', 'villain-name-generator', 'stage-name-generator', 'pen-name-generator',
      'fantasy-map-generator', 'mood-board-generator', 'poster-generator', 'flyer-generator',
      'dnd-character-generator', 'dungeon-generator', 'fantasy-language-generator', 'planet-name-generator',
      'island-name-generator', 'spaceship-name-generator', 'sigil-generator', 'tattoo-name-generator'
    ],
    relatedHubSlugs: ['name-generators', 'writing-generators', 'text-generators'],
    faqs: [
      { q: 'What are creative generators best for?', a: 'They are best for first-pass ideas, alternate directions, fictional details, naming angles, and prompts you can reshape into original work.' },
      { q: 'How do I keep creative outputs original?', a: 'Combine several options, change details, avoid copying protected characters or settings, and revise the output in your own voice.' },
      { q: 'Which tools help with worldbuilding?', a: 'Try Fantasy Map Generator, Fantasy Language Generator, Planet Name Generator, Island Name Generator, Dungeon Generator, and Character Name Generator.' }
    ]
  }
];

export function getToolHub(slug: string): ToolHub | undefined {
  return toolHubs.find((hub) => hub.slug === slug);
}
