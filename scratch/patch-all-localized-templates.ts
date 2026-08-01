import fs from 'fs';
import path from 'path';

const localizedTemplates = [
  'src/pages/ar/tools/[slug].astro',
  'src/pages/bg/tools/[slug].astro',
  'src/pages/bn/tools/[slug].astro',
  'src/pages/de/tools/[slug].astro',
  'src/pages/es/tools/[slug].astro',
  'src/pages/fr/tools/[slug].astro',
  'src/pages/hi/tools/[slug].astro',
  'src/pages/id/tools/[slug].astro',
  'src/pages/it/tools/[slug].astro',
  'src/pages/ja/tools/[slug].astro',
  'src/pages/ko/tools/[slug].astro',
  'src/pages/ms/tools/[slug].astro',
  'src/pages/pl/tools/[slug].astro',
  'src/pages/pt/tools/[slug].astro',
  'src/pages/ru/tools/[slug].astro',
  'src/pages/sv/tools/[slug].astro',
  'src/pages/tr/tools/[slug].astro'
];

async function patchLocalizedTemplates() {
  let count = 0;

  for (const tPath of localizedTemplates) {
    const fullPath = path.join(process.cwd(), tPath);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf-8');

    // 1. Add import AuthorByline if not present
    if (!content.includes('AuthorByline')) {
      content = content.replace("import BaseLayout from 'theme/layouts/BaseLayout.astro';", "import BaseLayout from 'theme/layouts/BaseLayout.astro';\nimport AuthorByline from '@/components/AuthorByline.astro';");
    }

    // 2. Add author and publisher to toolSchema if not present
    if (!content.includes('"author"')) {
      content = content.replace('"operatingSystem": "Any",', `"operatingSystem": "Any",\n  "author": {\n    "@type": "Organization",\n    "name": "TapToGen Editorial Team",\n    "url": "https://taptogen.com/about-us/"\n  },\n  "publisher": {\n    "@type": "Organization",\n    "name": "TapToGen",\n    "url": "https://taptogen.com/"\n  },`);
    }

    // 3. Mount <AuthorByline /> above FaqSection or FAQ section
    if (!content.includes('<AuthorByline />')) {
      if (content.includes('<FaqSection')) {
        content = content.replace('<FaqSection', '<AuthorByline />\n\n        <FaqSection');
      } else if (content.includes('<Faq')) {
        content = content.replace('<Faq', '<AuthorByline />\n\n        <Faq');
      } else if (content.includes('<section class="content-card">')) {
        content = content.replace('<section class="content-card">', '<AuthorByline />\n\n        <section class="content-card">');
      }
    }

    fs.writeFileSync(fullPath, content, 'utf-8');
    count++;
    console.log(`Patched E-E-A-T AuthorByline in ${tPath}`);
  }

  console.log(`TOTAL_TEMPLATES_PATCHED: ${count}`);
}

patchLocalizedTemplates().catch(console.error);
