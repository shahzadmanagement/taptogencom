import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const distDir = path.join(repoRoot, 'dist');

// Loader function like in ts-loader
function loadTS(filePath) {
  const absolutePath = path.resolve(filePath);
  const code = fs.readFileSync(absolutePath, 'utf8');
  const result = esbuild.transformSync(code, {
    loader: 'ts',
    format: 'cjs'
  });
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', result.code);
  fn(m, m.exports, (id) => {
    if (id.includes('site') || id.includes('exclusions')) return {};
    if (id.startsWith('@/data/')) {
      const target = path.join(repoRoot, 'src/data', path.basename(id).replace(/\.ts$/, ''));
      return loadTS(target + '.ts');
    }
    if (id.startsWith('./')) {
      const target = path.join(path.dirname(filePath), id);
      if (fs.existsSync(target + '.ts')) return loadTS(target + '.ts');
      if (fs.existsSync(target + '/index.ts')) return loadTS(target + '/index.ts');
    }
    try {
      return require(id);
    } catch(e) {
      return {};
    }
  }, path.dirname(absolutePath), absolutePath);
  return m.exports;
}

// Load tools and localization modules
const { tools } = loadTS(path.join(repoRoot, 'src/data/tools.ts'));
const { localizedPilotTools, getLocalizedPageCopy } = loadTS(path.join(repoRoot, 'src/data/localization.ts'));

console.log(`Loaded ${tools.length} English tools and ${localizedPilotTools.length} localized tool entries.`);

const englishToolsMap = new Map(tools.map(t => [t.slug, t]));

const localizedMap = new Map();
localizedPilotTools.forEach(entry => {
  localizedMap.set(`${entry.language}_${entry.localizedSlug}`, entry);
});

// Helper to find all HTML files
function getHtmlFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        results = results.concat(getHtmlFiles(full));
      } else if (file.endsWith('.html')) {
        results.push(full);
      }
    });
  } catch (e) {}
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
let patchCount = 0;

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  const urlPath = '/' + relPath.replace(/index\.html$/, '');
  
  if (!urlPath.includes('/tools/')) {
    continue;
  }

  const parts = urlPath.split('/').filter(Boolean);
  let lang = 'en';
  let slug = '';

  if (parts.length === 2 && parts[0] === 'tools') {
    slug = parts[1];
  } else if (parts.length === 3 && parts[1] === 'tools') {
    lang = parts[0];
    slug = parts[2];
  }

  if (!slug) continue;

  let title = '';
  let description = '';

  if (lang === 'en') {
    const tool = englishToolsMap.get(slug);
    if (tool) {
      title = tool.metaTitle;
      description = tool.metaDescription;
    }
  } else {
    const entry = localizedMap.get(`${lang}_${slug}`);
    if (entry) {
      const copy = getLocalizedPageCopy(entry);
      title = copy.metaTitle;
      description = copy.metaDescription;
    }
  }

  if (title && description) {
    let html = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Replace <title>
    const newTitleTag = `<title>${title}</title>`;
    if (html.includes('<title>')) {
      html = html.replace(/<title>([^<]*)<\/title>/gi, newTitleTag);
      modified = true;
    }

    // 2. Replace meta description
    const metaDescRegex = /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i;
    const metaDescRegexAlt = /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i;
    if (metaDescRegex.test(html)) {
      html = html.replace(metaDescRegex, (match) => {
        return match.replace(/content=["']([^"']*)["']/i, `content="${description.replace(/"/g, '&quot;')}"`);
      });
      modified = true;
    } else if (metaDescRegexAlt.test(html)) {
      html = html.replace(metaDescRegexAlt, (match) => {
        return match.replace(/content=["']([^"']*)["']/i, `content="${description.replace(/"/g, '&quot;')}"`);
      });
      modified = true;
    }

    // 3. Replace og:title, og:description, twitter:title
    if (html.includes('og:title')) {
      html = html.replace(/property=["']og:title["'][^>]*content=["']([^"']*)["']/gi, `property="og:title" content="${title.replace(/"/g, '&quot;')}"`);
      html = html.replace(/content=["']([^"']*)["'][^>]*property=["']og:title["']/gi, `content="${title.replace(/"/g, '&quot;')}" property="og:title"`);
    }
    if (html.includes('og:description')) {
      html = html.replace(/property=["']og:description["'][^>]*content=["']([^"']*)["']/gi, `property="og:description" content="${description.replace(/"/g, '&quot;')}"`);
      html = html.replace(/content=["']([^"']*)["']/gi, `content="${description.replace(/"/g, '&quot;')}" property="og:description"`);
    }
    if (html.includes('twitter:title')) {
      html = html.replace(/name=["']twitter:title["'][^>]*content=["']([^"']*)["']/gi, `name="twitter:title" content="${title.replace(/"/g, '&quot;')}"`);
      html = html.replace(/content=["']([^"']*)["']/gi, `content="${title.replace(/"/g, '&quot;')}" name="twitter:title"`);
    }

    if (modified) {
      fs.writeFileSync(file, html, 'utf8');
      patchCount++;
    }
  }
}

console.log(`Successfully patched SEO metadata in-place for ${patchCount} built HTML files.`);
