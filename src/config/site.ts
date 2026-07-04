export const siteConfig = {
  name: 'TapToGen',
  tagline: 'Tap to Generate',
  url: 'https://taptogen.com',
  description: 'TapToGen offers premium free online generator tools. Generate text, names, fonts, tags, bios, usernames, SEO meta, and more — all instant, private, and free.',
  contactEmail: 'contact@taptogen.com',
  defaultLocale: 'en' as const,
  locales: ['en', 'hi', 'es', 'ru', 'fr', 'de', 'it', 'pt', 'bn', 'ja', 'ko', 'ms', 'pl', 'id', 'ar', 'bg', 'tr', 'sv'] as const,
  rtlLocales: ['ar'] as const,
  social: {
    twitter: '',
    github: '',
    facebook: '',
    instagram: '',
    youtube: '',
  },
  verification: {
    google: '',
    bing: '',
    yandex: '',
  },
  defaultOgImage: '/og-default.png',
  postsPerPage: 12,
  toolsPerPage: 24,
};

export type Locale = typeof siteConfig.locales[number];
