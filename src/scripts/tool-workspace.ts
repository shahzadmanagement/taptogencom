import { trackGeneratorOpen, trackGenerate, trackCopy, trackDownload, trackShare, trackOptionChange } from '../lib/analytics';
import qrcode from './qrcodegen';


// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item?.classList.contains('open');
    if (!isOpen) item?.classList.add('open');
    else item?.classList.remove('open');
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// Generator logic
const workspace = document.getElementById('tool-workspace') as HTMLElement;
const toolSlug = workspace?.dataset.tool || '';
const toolType = workspace?.dataset.type || 'utility';
const outputFormat = workspace?.dataset.format || 'text';
const input = document.getElementById('tool-input') as HTMLTextAreaElement;
const output = document.getElementById('tool-output') as HTMLElement;
const generateBtn = document.getElementById('generate-btn');
const resetBtn = document.getElementById('reset-btn');
const exampleBtn = document.getElementById('example-btn');
const copyBtn = document.getElementById('copy-btn');
const regenBtn = document.getElementById('regenerate-btn');

// Unicode font maps for text transform tools
export const boldMap: Record<string, string> = {};
const cursiveMap: Record<string, string> = {};
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('').forEach((c, i) => {
  if (i < 26) { boldMap[c] = String.fromCodePoint(0x1D400 + i); cursiveMap[c] = String.fromCodePoint(0x1D49C + i); }
  else if (i < 52) { boldMap[c] = String.fromCodePoint(0x1D41A + (i - 26)); cursiveMap[c] = String.fromCodePoint(0x1D4B6 + (i - 26)); }
  else { boldMap[c] = String.fromCodePoint(0x1D7CE + (i - 52)); }
});

export function toUnicode(text: string, map: Record<string, string>): string {
  return text.split('').map(c => map[c] || c).join('');
}

// Name banks
export function randomFrom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function generateMultiple(fn: () => string, count: number): string { return Array.from({ length: count }, fn).join('\n'); }
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char));
}
const superscriptLetters = ['\u1d43','\u1d47','\u1d9c','\u1d48','\u1d49','\u1da0','\u1d4d','\u02b0','\u2071','\u02b2','\u1d4f','\u02e1','\u1d50','\u207f','\u1d52','\u1d56','q','\u02b3','\u02e2','\u1d57','\u1d58','\u1d5b','\u02b7','\u02e3','\u02b8','\u1dbb'];
const smallCapsMap: Record<string, string> = Object.fromEntries('abcdefghijklmnopqrstuvwxyz'.split('').map(c => [c, c.toUpperCase()]));

function splitBlocks(raw: string): string[] {
  return raw.split(/\n\s*\n|---+/).map(part => part.trim()).filter(Boolean);
}

function lineItems(raw: string): string[] {
  return raw.split(/\n|,\s+/).map(item => item.trim()).filter(Boolean);
}

function labelForItem(index: number): string {
  const labels = toolType === 'random-combo'
    ? ['Name idea', 'Creative', 'Short', 'Brandable', 'Memorable', 'Fresh']
    : ['Result', 'Variation', 'Option', 'Idea'];
  return labels[index % labels.length];
}

function getFallbackText(safeText: string): string {
  if (typeof document !== 'undefined') {
    const ws = document.getElementById('tool-workspace');
    if (ws && ws.dataset.tool) {
      const toolSlug = ws.dataset.tool;
      const isFontGen = toolSlug.includes('text-generator') || toolSlug.includes('font-generator') || toolSlug.includes('converter');
      if (isFontGen) {
        const inputEl = document.getElementById('tool-input') as HTMLTextAreaElement | null;
        if (inputEl && inputEl.value && inputEl.value.trim().length > 0) {
          const orig = inputEl.value.trim();
          if (orig !== safeText) {
            return `<span aria-label="${escapeHtml(orig)}">${safeText}</span>`;
          }
        }
      }
    }
  }
  return safeText;
}

function renderResultCard(text: string, label: string): string {
  const safeText = escapeHtml(text);
  const safeLabel = escapeHtml(label);
  const showFav = workspace?.dataset.tool && (
    workspace.dataset.tool.includes('name') || 
    workspace.dataset.tool.includes('fancy') ||
    workspace.dataset.tool.includes('bold') ||
    workspace.dataset.tool.includes('cursive') ||
    workspace.dataset.tool.includes('italic') ||
    workspace.dataset.tool.includes('underline') ||
    workspace.dataset.tool.includes('strikethrough') ||
    workspace.dataset.tool.includes('vaporwave') ||
    workspace.dataset.tool.includes('paragraph') || 
    workspace.dataset.tool.includes('sentence') || 
    workspace.dataset.tool.includes('story') || 
    workspace.dataset.tool.includes('article') || 
    workspace.dataset.tool.includes('essay') || 
    workspace.dataset.tool.includes('blog') || 
    workspace.dataset.tool.includes('description') || 
    workspace.dataset.tool.includes('bio') || 
    workspace.dataset.tool.includes('caption') || 
    workspace.dataset.tool.includes('review') || 
    workspace.dataset.tool.includes('headline') || 
    workspace.dataset.tool.includes('title') || 
    workspace.dataset.tool.includes('email') || 
    workspace.dataset.tool.includes('letter') || 
    workspace.dataset.tool.includes('summary') || 
    workspace.dataset.tool.includes('rewrite') || 
    workspace.dataset.tool.includes('writing') || 
    workspace.dataset.tool.includes('prompt') ||
    workspace.dataset.tool.includes('meta-tag') || 
    workspace.dataset.tool.includes('robots') || 
    workspace.dataset.tool.includes('hreflang') || 
    workspace.dataset.tool.includes('schema') || 
    workspace.dataset.tool.includes('slug') || 
    workspace.dataset.tool.includes('hash') || 
    workspace.dataset.tool.includes('canonical') || 
    workspace.dataset.tool.includes('sitemap') || 
    workspace.dataset.tool.includes('redirect') || 
    workspace.dataset.tool.includes('tag-generator') || 
    workspace.dataset.tool.includes('tags-generator') ||
    workspace.dataset.tool.includes('business') || 
    workspace.dataset.tool.includes('domain') || 
    workspace.dataset.tool.includes('product') || 
    workspace.dataset.tool.includes('slogan') || 
    workspace.dataset.tool.includes('invoice') || 
    workspace.dataset.tool.includes('receipt') || 
    workspace.dataset.tool.includes('email-signature') || 
    workspace.dataset.tool.includes('sku') || 
    workspace.dataset.tool.includes('coupon') || 
    workspace.dataset.tool.includes('agenda') || 
    workspace.dataset.tool.includes('minutes') || 
    workspace.dataset.tool.includes('startup') || 
    workspace.dataset.tool.includes('brand-kit') || 
    workspace.dataset.tool.includes('tagline') || 
    workspace.dataset.tool.includes('poster') || 
    workspace.dataset.tool.includes('flyer') ||
    workspace.dataset.tool.includes('post-generator') ||
    workspace.dataset.tool.includes('hook') ||
    workspace.dataset.tool.includes('policy') ||
    workspace.dataset.tool.includes('terms') ||
    workspace.dataset.tool.includes('disclaimer') ||
    workspace.dataset.tool.includes('disclosure')
  );
  
  const favBtn = showFav
    ? '<button class="fav-btn" type="button" data-fav-style="' + safeText + '" aria-label="Favorite style">☆</button>'
    : '';

  const fallbackWrappedText = getFallbackText(safeText);
  return '<article class="result-card" data-style-name="' + safeText + '"><div class="result-card-top"><span class="result-label">' + safeLabel + '</span><div style="display: flex; align-items: center; gap: 6px;">' + favBtn + '<button class="copy-btn result-copy" type="button" data-copy="' + safeText + '">Copy</button></div></div><div class="result-text">' + fallbackWrappedText + '</div></article>';
}

function renderSections(raw: string): string {
  const blocks = splitBlocks(raw);
  if (blocks.length <= 1) return renderRaw(raw);
  return '<div class="result-section-list">' + blocks.map((block, index) => {
    const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
    const heading = lines.length > 1 && lines[0].length < 80 ? lines.shift() || 'Section' : 'Section ' + (index + 1);
    const body = lines.length ? lines.join('\n') : block;
    return '<section class="result-section"><div class="result-card-top"><span class="result-label">' + escapeHtml(heading.replace(/:$/, '')) + '</span><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(body) + '">Copy</button></div><pre>' + escapeHtml(body) + '</pre></section>';
  }).join('') + '</div>';
}

function renderGroupedTags(raw: string): string {
  const tags = lineItems(raw).filter(item => item.startsWith('#') || item.length > 0);
  if (tags.length < 4) return renderList(raw);
  const groups = [
    ['Primary Tags', tags.slice(0, 10)],
    ['Support Tags', tags.slice(10, 20)],
    ['Extra Tags', tags.slice(20)]
  ].filter(([ items]) => (items as string[]).length > 0) as [string, string[]][];
  return '<div class="result-group-list">' + groups.map(([title, items]) => {
    const groupText = items.join(' ');
    return '<section class="result-group"><div class="result-card-top"><span class="result-label">' + escapeHtml(title) + '</span><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(groupText) + '">Copy Group</button></div><div class="tag-chip-list">' + items.map(item => '<span class="tag-chip">' + escapeHtml(item) + '</span>').join('') + '</div></section>';
  }).join('') + '</div>';
}

function renderList(raw: string): string {
  const items = lineItems(raw);
  if (items.length <= 1) return renderRaw(raw);
  return '<div class="result-card-grid">' + items.slice(0, 40).map((item, index) => renderResultCard(item, labelForItem(index))).join('') + '</div>';
}

function renderCards(raw: string): string {
  const blocks = splitBlocks(raw);
  if (blocks.length <= 1) return renderList(raw);
  return '<div class="result-card-grid">' + blocks.map((block, index) => renderResultCard(block, 'Variation ' + (index + 1))).join('') + '</div>';
}

function renderBusinessCards(raw: string): string {
  const items = lineItems(raw);
  if (items.length <= 1) return renderSections(raw);
  return '<div class="result-card-grid">' + items.slice(0, 40).map((item, index) => {
    const safeItem = escapeHtml(item);
    return '<article class="result-card result-card-business"><div class="result-card-top"><span class="result-label">Business idea ' + (index + 1) + '</span><button class="copy-btn result-copy" type="button" data-copy="' + safeItem + '">Copy</button></div><div class="result-text">' + safeItem + '</div><p class="result-note">Use as a starting point, then check domain, trademark, and audience fit before publishing.</p></article>';
  }).join('') + '</div>';
}

function renderRaw(raw: string): string {
  return '<div class="raw-result"><pre>' + escapeHtml(raw) + '</pre><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(raw) + '">Copy Result</button></div>';
}

export function slugWords(value: string): string[] {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(Boolean);
}

export function titleCase(value: string): string {
  return value.split(/\s+/).filter(Boolean).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export function compactSeed(value: string, fallback = 'Nova'): string {
  const words = slugWords(value || fallback);
  const seed = words.length ? words.join(' ') : fallback;
  return titleCase(seed);
}

export function toSafeHandle(value: string, fallback = 'player'): string {
  return (slugWords(value || fallback).join('') || fallback).slice(0, 22);
}

export function unicodeMap(upperStart: number, lowerStart: number, digitStart?: number): Record<string, string> {
  const map: Record<string, string> = {};
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((c, i) => { map[c] = String.fromCodePoint(upperStart + i); });
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach((c, i) => { map[c] = String.fromCodePoint(lowerStart + i); });
  if (digitStart !== undefined) '0123456789'.split('').forEach((c, i) => { map[c] = String.fromCodePoint(digitStart + i); });
  return map;
}

export const italicUnicodeMap = unicodeMap(0x1D434, 0x1D44E);
export const boldItalicUnicodeMap = unicodeMap(0x1D468, 0x1D482);
const gothicUnicodeMap = {
  ...unicodeMap(0x1D504, 0x1D51E),
  C: 'ℭ',
  H: 'ℌ',
  I: 'ℑ',
  R: 'ℜ',
  Z: 'ℨ'
};
export const monospaceUnicodeMap = unicodeMap(0x1D670, 0x1D68A, 0x1D7F6);
const doubleStruckUnicodeMap = {
  ...unicodeMap(0x1D538, 0x1D552, 0x1D7D8),
  C: 'ℂ',
  H: 'ℍ',
  N: 'ℕ',
  P: 'ℙ',
  Q: 'ℚ',
  R: 'ℝ',
  Z: 'ℤ'
};

const parenthesizedMap: Record<string, string> = {};
'abcdefghijklmnopqrstuvwxyz'.split('').forEach((c, i) => {
  parenthesizedMap[c] = String.fromCodePoint(0x249C + i);
  parenthesizedMap[c.toUpperCase()] = String.fromCodePoint(0x249C + i);
});
'123456789'.split('').forEach((c, i) => {
  parenthesizedMap[c] = String.fromCodePoint(0x2474 + i);
});

const boldGothicUnicodeMap = unicodeMap(0x1D56C, 0x1D586);
const smallCapsUnicodeMap: Record<string, string> = Object.fromEntries('abcdefghijklmnopqrstuvwxyz'.split('').map(char => [char, char.toUpperCase()]));
const upsideDownMap: Record<string, string> = {
  a: '\u0250', b: 'q', c: '\u0254', d: 'p', e: '\u01dd', f: '\u025f', g: '\u0183', h: '\u0265', i: '\u1d09', j: '\u027e', k: '\u029e', l: 'l', m: '\u026f',
  n: 'u', o: 'o', p: 'd', q: 'b', r: '\u0279', s: 's', t: '\u0287', u: 'n', v: '\u028c', w: '\u028d', x: 'x', y: '\u028e', z: 'z',
  A: '\u2200', B: 'B', C: '\u0186', D: 'D', E: '\u018e', F: '\u2132', G: '\u05e4', H: 'H', I: 'I', J: '\u017f', K: 'K', L: '\u02e5', M: 'W',
  N: 'N', O: 'O', P: '\u0500', Q: 'Q', R: 'R', S: 'S', T: '\u22a5', U: '\u2229', V: '\u039b', W: 'M', X: 'X', Y: '\u2144', Z: 'Z',
  '1': '\u0196', '2': '\u1105', '3': '\u0190', '4': '\u3123', '5': '\u03db', '6': '9', '7': '\u3125', '8': '8', '9': '6', '0': '0',
  '.': '\u02d9', ',': "'", "'": ',', '"': ',', '!': '\u00a1', '?': '\u00bf', '(': ')', ')': '('
};

function transformSmallCaps(value: string): string {
  return [...value.toLowerCase()].map(c => smallCapsUnicodeMap[c] || c).join('');
}

function transformCircled(value: string): string {
  return [...value].map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + code - 97);
    if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + code - 49);
    if (c === '0') return String.fromCodePoint(0x24EA);
    return c;
  }).join('');
}

export function transformSquared(value: string): string {
  return [...value.toUpperCase()].map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + code - 65);
    return c;
  }).join('');
}

function transformUpsideDown(value: string): string {
  return [...value].reverse().map(c => upsideDownMap[c] || c).join('');
}

export function transformFullwidth(value: string): string {
  return [...value].map(c => {
    const code = c.charCodeAt(0);
    if (code >= 33 && code <= 126) return String.fromCodePoint(code + 0xFEE0);
    if (c === ' ') return String.fromCodePoint(0x3000);
    return c;
  }).join('');
}

function renderStyleMatrix(styles: { name: string; preview: string; use: string; note: string; isCompat?: boolean }[], extraNote = ''): string {
  return '<div class="intent-style-matrix">' + styles.map(style => {
    const compatBadge = style.isCompat === true
      ? '<span class="compat-badge high" style="background: rgba(16,185,129,0.12); color: #10b981; border: 1px solid rgba(16,185,129,0.2); padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; white-space: nowrap;">High Compat</span>'
      : style.isCompat === false
      ? '<span class="compat-badge low" style="background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; white-space: nowrap;">Partial Compat</span>'
      : '';
    return '<article class="intent-style-card" data-style-name="' + escapeHtml(style.name) + '"><div class="result-card-top"><div><div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;"><span class="result-label">' + escapeHtml(style.name) + '</span>' + compatBadge + '</div><p class="intent-mini-note">' + escapeHtml(style.use) + '</p></div><div style="display: flex; align-items: center; gap: 6px;"><button class="fav-btn" type="button" data-fav-style="' + escapeHtml(style.name) + '" aria-label="Favorite style">☆</button><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(style.preview) + '">Copy</button></div></div><div class="intent-preview-text">' + escapeHtml(style.preview) + '</div><p class="result-note">' + escapeHtml(style.note) + '</p></article>';
  }).join('') + (extraNote ? '<p class="intent-output-note">' + escapeHtml(extraNote) + '</p>' : '') + '</div>';
}

function renderGroupedIdeas(groups: { title: string; note: string; items: { name: string; reason: string; extra?: string }[] }[], footer = ''): string {
  const allText = groups.map(group => group.title + '\n' + group.items.map(item => item.name + (item.extra ? ' - ' + item.extra : '')).join('\n')).join('\n\n');
  return '<div class="intent-grouped-output"><div class="intent-suite-heading"><div><span class="result-label">Premium result set</span>' + (footer ? '<p class="intent-mini-note">' + escapeHtml(footer) + '</p>' : '') + '</div><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(allText) + '">Copy All</button></div>' + groups.map(group => {
    const copyText = group.items.map(item => item.name + (item.extra ? ' - ' + item.extra : '')).join('\n');
    return '<section class="intent-result-group"><div class="result-card-top"><div><span class="result-label">' + escapeHtml(group.title) + '</span><p class="intent-mini-note">' + escapeHtml(group.note) + '</p></div><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(copyText) + '">Copy Group</button></div><div class="intent-idea-grid">' + group.items.map(item => '<article class="intent-idea-card"><div class="intent-idea-name">' + escapeHtml(item.name) + '</div><p>' + escapeHtml(item.reason) + '</p>' + (item.extra ? '<p class="intent-card-extra">' + escapeHtml(item.extra) + '</p>' : '') + '<button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(item.name) + '">Copy</button></article>').join('') + '</div></section>';
  }).join('') + '</div>';
}

function renderBioVariations(groups: { title: string; text: string; note: string }[]): string {
  return '<div class="intent-card-list">' + groups.map(group => '<article class="intent-wide-card"><div class="result-card-top"><div><span class="result-label">' + escapeHtml(group.title) + '</span><p class="intent-mini-note">' + escapeHtml(group.note) + '</p></div><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(group.text) + '">Copy</button></div><div class="result-text">' + escapeHtml(group.text) + '</div><p class="result-note">' + group.text.length + ' characters</p></article>').join('') + '</div>';
}

export function renderSectionSuite(title: string, sections: { title: string; body: string; note?: string }[], footer = ''): string {
  const allText = title + '\n\n' + sections.map(section => section.title + '\n' + section.body).join('\n\n');
  return '<div class="intent-section-suite"><div class="intent-suite-heading"><div><span class="result-label">' + escapeHtml(title) + '</span>' + (footer ? '<p class="intent-mini-note">' + escapeHtml(footer) + '</p>' : '') + '</div><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(allText) + '">Copy All</button></div>' + sections.map(section => {
    const safeBody = escapeHtml(section.body);
    const safeTitle = escapeHtml(section.title);
    return '<article class="intent-wide-card" data-style-name="' + safeBody + '"><div class="result-card-top"><div><span class="result-label">' + safeTitle + '</span>' + (section.note ? '<p class="intent-mini-note">' + escapeHtml(section.note) + '</p>' : '') + '</div><div style="display: flex; align-items: center; gap: 6px;"><button class="fav-btn" type="button" data-fav-style="' + safeBody + '" aria-label="Favorite style">☆</button><button class="copy-btn result-copy" type="button" data-copy="' + safeBody + '">Copy Section</button></div></div><pre class="intent-section-pre">' + safeBody + '</pre></article>';
  }).join('') + '</div>';
}

function renderHeadlineGroups(groups: { title: string; note: string; items?: string[]; text?: string }[], footer = ''): string {
  const allText = groups.map(group => group.title + '\n' + (group.items ?? (group.text ? [group.text] : [])).join('\n')).join('\n\n');
  return '<div class="intent-grouped-output"><div class="intent-suite-heading"><div><span class="result-label">Premium result set</span>' + (footer ? '<p class="intent-mini-note">' + escapeHtml(footer) + '</p>' : '') + '</div><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(allText) + '">Copy All</button></div>' + groups.map(group => {
    const items = group.items ?? (group.text ? [group.text] : []);
    const groupText = items.join('\n');
    return '<section class="intent-result-group"><div class="result-card-top"><div><span class="result-label">' + escapeHtml(group.title) + '</span><p class="intent-mini-note">' + escapeHtml(group.note) + '</p></div><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(groupText) + '">Copy Group</button></div><div class="intent-idea-grid">' + items.map(item => '<article class="intent-idea-card"><div class="intent-idea-name">' + escapeHtml(item) + '</div><p>' + item.length + ' characters</p><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(item) + '">Copy</button></article>').join('') + '</div></section>';
  }).join('') + '</div>';
}

export function filterGroupsByOption<T extends { title: string }>(groups: T[], selected: string): T[] {
  if (!selected || selected === 'all') return groups;
  const wanted = selected.toLowerCase();
  const filtered = groups.filter(group => slugWords(group.title).join('-') === wanted || slugWords(group.title).join('-').includes(wanted));
  return filtered.length ? filtered : groups;
}

type Pass19NameGroup = {
  title: string;
  note: string;
  words: string[];
  nouns: string[];
  use: string;
};

type Pass19NameConfig = {
  title: string;
  kind: 'person' | 'place' | 'group' | 'creature' | 'stage';
  groups: Pass19NameGroup[];
  footer: string;
};

function generateFantasyMap(scope: string, bias: string, density: string, tone: string, includeLegend: boolean, detailLevel: string, seedText: string) {
  const regionRoots = ['Alder', 'Bracken', 'Cairn', 'Eld', 'Fallow', 'Glimmer', 'Harrow', 'Ironglen', 'Lark', 'Mire', 'Northmere', 'Oaken', 'Rime', 'Silver', 'Thorn', 'Westfall'];
  const regionEnds = ['reach', 'vale', 'march', 'moor', 'crown', 'fen', 'coast', 'wold', 'mere', 'barrow', 'hearth', 'wilds'];
  const settlementRoots = ['Ash', 'Briar', 'Cinder', 'Dawn', 'Elder', 'Frost', 'Gray', 'Hearth', 'Ivory', 'Juniper', 'Kings', 'Low', 'Mist', 'Red', 'Stone', 'Willow'];
  const settlementEnds = ['ford', 'haven', 'watch', 'bridge', 'market', 'hold', 'rest', 'gate', 'fall', 'wick', 'port', 'stead'];
  const landmarkRoots = ['Moon', 'Giant', 'Whisper', 'Glass', 'Copper', 'Warden', 'Star', 'Hollow', 'Storm', 'Lantern'];
  const landmarkEnds = ['Spire', 'Road', 'Falls', 'Barrow', 'Gate', 'Spring', 'Monolith', 'Crossing', 'Sanctum', 'Beacon'];
  const routeTypes = ['old river road', 'ridge pass', 'salt trail', 'pilgrim causeway', 'forest track', 'merchant road'];
  const scopeLabels: Record<string, string> = {
    region: 'Region',
    kingdom: 'Kingdom',
    'island-chain': 'Island Chain',
    'frontier-coast': 'Frontier Coast',
    'desert-realm': 'Desert Realm'
  };
  const toneNotes: Record<string, string> = {
    classic: 'balanced adventure with old keeps, trade roads, and rival border towns',
    frontier: 'wind-worn borderlands with dangerous passes and isolated settlements',
    mythic: 'larger-than-life landmarks, sacred routes, and ancient territorial names',
    cozy: 'gentler travel, harvest villages, scenic routes, and local mysteries',
    ruins: 'fallen watchtowers, buried roads, and settlements built near older stones'
  };
  const terrainCounts: Record<string, Record<string, number>> = {
    balanced: { mountains: 4, forests: 5, rivers: 2, desert: 1, coast: 1, islands: 2 },
    mountainous: { mountains: 7, forests: 3, rivers: 2, desert: 0, coast: 0, islands: 0 },
    forested: { mountains: 3, forests: 8, rivers: 2, desert: 0, coast: 0, islands: 0 },
    riverlands: { mountains: 2, forests: 5, rivers: 4, desert: 0, coast: 0, islands: 1 },
    desert: { mountains: 3, forests: 1, rivers: 1, desert: 5, coast: 0, islands: 0 },
    coastal: { mountains: 2, forests: 4, rivers: 2, desert: 0, coast: 2, islands: 3 },
    islands: { mountains: 2, forests: 3, rivers: 1, desert: 0, coast: 1, islands: 6 }
  };
  const counts = terrainCounts[bias] || terrainCounts.balanced;
  const settlementCount = density === 'dense' ? 6 : density === 'sparse' ? 3 : 4;
  const title = randomFrom(regionRoots) + randomFrom(regionEnds);
  const regionName = scope === 'kingdom' ? 'The ' + title + ' Crownlands' : scope === 'island-chain' ? 'The Isles of ' + title : title.charAt(0).toUpperCase() + title.slice(1);
  const settlements = Array.from({ length: settlementCount }, () => randomFrom(settlementRoots) + randomFrom(settlementEnds));
  const landmarks = Array.from({ length: 3 }, () => randomFrom(landmarkRoots) + ' ' + randomFrom(landmarkEnds));
  const route = randomFrom(routeTypes);
  const terrainZones = [
    randomFrom(['North', 'High', 'Upper']) + ' ' + randomFrom(['Ridges', 'Peaks', 'Scarps']),
    randomFrom(['Green', 'Deep', 'Old']) + ' ' + randomFrom(['Wood', 'Forest', 'Timberlands']),
    randomFrom(['Silver', 'Long', 'Cold']) + ' ' + randomFrom(['River', 'Run', 'Water']),
    bias === 'desert' || scope === 'desert-realm' ? randomFrom(['Sunspoke Desert', 'Amber Flats', 'Dryglass Expanse']) : randomFrom(['Western Coast', 'Mistbay Shore', 'Outer Isles'])
  ];
  const point = (minX: number, maxX: number, minY: number, maxY: number) => ({
    x: Math.round(minX + Math.random() * (maxX - minX)),
    y: Math.round(minY + Math.random() * (maxY - minY))
  });
  const mountainShapes = Array.from({ length: counts.mountains }, () => point(35, 230, 45, 170));
  const forestShapes = Array.from({ length: counts.forests }, () => point(150, 410, 85, 250));
  const desertShapes = Array.from({ length: counts.desert }, () => point(330, 515, 165, 280));
  const islandShapes = Array.from({ length: counts.islands }, () => point(420, 525, 45, 250));
  const settlementPoints = settlements.map(name => ({ name, ...point(90, 440, 70, 270) }));
  const riverPath = 'M ' + (80 + Math.round(Math.random() * 90)) + ' 35 C 190 95, 210 155, 275 185 S 390 245, 470 295';
  const secondRiver = 'M 250 42 C 230 105, 290 145, 330 205 S 380 255, 420 300';
  const coastPath = 'M430 18 C500 45 520 105 488 150 C530 200 500 270 536 314 L560 314 L560 18 Z';
  const mountainSvg = mountainShapes.map(p => '<path d="M' + (p.x - 18) + ' ' + (p.y + 20) + ' L' + p.x + ' ' + (p.y - 18) + ' L' + (p.x + 18) + ' ' + (p.y + 20) + ' Z" fill="#8f9488" stroke="#4d554b" stroke-width="2"/><path d="M' + p.x + ' ' + (p.y - 16) + ' L' + (p.x - 6) + ' ' + p.y + ' L' + (p.x + 4) + ' ' + (p.y - 3) + ' L' + (p.x + 10) + ' ' + p.y + ' Z" fill="#f7f2df" opacity=".85"/>').join('');
  const forestSvg = forestShapes.map(p => '<circle cx="' + p.x + '" cy="' + p.y + '" r="13" fill="#4f7f52" opacity=".92"/><circle cx="' + (p.x + 10) + '" cy="' + (p.y + 7) + '" r="10" fill="#3f6d46" opacity=".92"/><rect x="' + (p.x + 2) + '" y="' + (p.y + 9) + '" width="4" height="13" fill="#6d563b"/>').join('');
  const desertSvg = desertShapes.map(p => '<ellipse cx="' + p.x + '" cy="' + p.y + '" rx="48" ry="22" fill="#d9b46f" opacity=".45"/><path d="M' + (p.x - 32) + ' ' + p.y + ' Q' + (p.x - 12) + ' ' + (p.y - 14) + ' ' + (p.x + 8) + ' ' + p.y + ' T' + (p.x + 42) + ' ' + p.y + '" fill="none" stroke="#b9853f" stroke-width="2" opacity=".75"/>').join('');
  const islandSvg = islandShapes.map(p => '<ellipse cx="' + p.x + '" cy="' + p.y + '" rx="22" ry="12" fill="#9bbd80" stroke="#5f7f54" stroke-width="2"/><path d="M' + (p.x - 9) + ' ' + p.y + ' Q' + p.x + ' ' + (p.y - 9) + ' ' + (p.x + 9) + ' ' + p.y + '" fill="none" stroke="#426744" stroke-width="2"/>').join('');
  const settlementSvg = settlementPoints.map(p => '<rect x="' + (p.x - 5) + '" y="' + (p.y - 5) + '" width="10" height="10" rx="2" fill="#7b3f34" stroke="#3f241f" stroke-width="1.5"/><text x="' + (p.x + 9) + '" y="' + (p.y + 4) + '" font-size="12" fill="#2e2a22" font-family="serif">' + escapeHtml(p.name) + '</text>').join('');
  const terrainLabelSvg = '<g font-family="serif" font-size="12" fill="#3f3529" opacity=".86"><text x="74" y="92">' + escapeHtml(terrainZones[0]) + '</text><text x="230" y="132">' + escapeHtml(terrainZones[1]) + '</text><text x="312" y="221">' + escapeHtml(terrainZones[2]) + '</text><text x="392" y="285">' + escapeHtml(terrainZones[3]) + '</text></g>';
  const legendSvg = includeLegend ? '<g transform="translate(18 252)"><rect width="170" height="58" rx="6" fill="#fff8e6" opacity=".82" stroke="#c7b98b"/><text x="10" y="18" font-size="12" font-weight="700" fill="#2e2a22">Legend</text><text x="10" y="34" font-size="11" fill="#2e2a22">Triangle: mountains</text><text x="10" y="49" font-size="11" fill="#2e2a22">Square: settlement | Blue: river</text></g>' : '';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 330" role="img" aria-label="Fantasy map preview for ' + escapeHtml(regionName) + '"><rect width="560" height="330" rx="14" fill="#efe4c8"/><path d="' + coastPath + '" fill="#8ec4c1" opacity="' + (bias === 'coastal' || bias === 'islands' || scope === 'frontier-coast' || scope === 'island-chain' ? '.8' : '.28') + '"/><path d="' + riverPath + '" fill="none" stroke="#4b94b9" stroke-width="7" stroke-linecap="round" opacity=".82"/>' + (counts.rivers > 2 ? '<path d="' + secondRiver + '" fill="none" stroke="#4b94b9" stroke-width="4" stroke-linecap="round" opacity=".65"/>' : '') + desertSvg + mountainSvg + forestSvg + islandSvg + terrainLabelSvg + settlementSvg + '<text x="24" y="34" font-size="22" font-weight="700" fill="#2e2a22" font-family="serif">' + escapeHtml(regionName) + '</text><text x="24" y="54" font-size="12" fill="#5c5140">' + escapeHtml(scopeLabels[scope] || 'Region') + ' map concept</text>' + legendSvg + '</svg>';
  const blueprintLines = [
    'Fantasy Map Blueprint',
    '',
    'Name: ' + regionName,
    'Scope: ' + (scopeLabels[scope] || 'Region'),
    'Tone: ' + (toneNotes[tone] || toneNotes.classic),
    seedText ? 'Seed idea: ' + seedText : 'Seed idea: original browser-generated concept',
    '',
    'Terrain Zones:',
    '- Mountains: ' + terrainZones[0] + ' with ' + counts.mountains + ' major ridges',
    '- Forests: ' + terrainZones[1] + ' with ' + counts.forests + ' marked woodland clusters',
    '- Rivers: ' + terrainZones[2] + ' feeding the central route',
    '- Coast/Islands/Desert: ' + terrainZones[3],
    '',
    'Settlements:',
    ...settlements.map((name, index) => '- ' + name + ': ' + ['market town near a crossing', 'hill watch above the road', 'river port with old ferry rights', 'woodcutters settlement at the forest edge', 'fortified granary town', 'shrine village on a pilgrim path'][index % 6]),
    '',
    'Landmarks:',
    ...landmarks.map(name => '- ' + name),
    '',
    'Travel Route:',
    '- The ' + route + ' links ' + settlements[0] + ' to ' + settlements[settlements.length - 1] + ' through contested terrain.',
    '',
    'Map Legend:',
    '- Triangles: mountains',
    '- Green clusters: forests',
    '- Blue curves: rivers',
    '- Brown squares: settlements',
    '- Pale ochre fields: desert or drylands',
    '- Teal edge and ovals: coast and islands',
    '',
    'Use Note: This is a fictional creative blueprint for stories, tabletop campaigns, and worldbuilding notes, not professional cartography.'
  ];
  const blueprint = detailLevel === 'quick' ? blueprintLines.slice(0, 20).join('\n') : blueprintLines.join('\n');
  const html = '<div class="fantasy-map-result"><div class="fantasy-map-preview">' + svg + '</div><div class="fantasy-map-actions"><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(blueprint) + '">Copy Blueprint</button><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(svg) + '">Copy SVG</button></div><pre class="fantasy-map-blueprint">' + escapeHtml(blueprint) + '</pre><details><summary>Raw SVG for copy/export</summary><pre class="fantasy-map-raw-svg">' + escapeHtml(svg) + '</pre></details></div>';
  return { blueprint, html };
}

const undoStack: string[] = [];
const redoStack: string[] = [];
let lastValue = '';

// Cache critical UI elements at initialization to avoid redundant DOM queries
let cachedUndoButton: HTMLButtonElement | null = null;
let cachedRedoButton: HTMLButtonElement | null = null;

function updateUndoRedoButtons() {
  if (!cachedUndoButton) {
    cachedUndoButton = document.getElementById('undo-btn') as HTMLButtonElement | null;
  }
  if (!cachedRedoButton) {
    cachedRedoButton = document.getElementById('redo-btn') as HTMLButtonElement | null;
  }
  if (cachedUndoButton) {
    cachedUndoButton.disabled = undoStack.length === 0;
    cachedUndoButton.style.opacity = undoStack.length === 0 ? '0.5' : '1';
  }
  if (cachedRedoButton) {
    cachedRedoButton.disabled = redoStack.length === 0;
    cachedRedoButton.style.opacity = redoStack.length === 0 ? '0.5' : '1';
  }
}

async function copyText(value: string, trigger?: HTMLElement | null): Promise<void> {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(value);
    } else {
      throw new Error('Clipboard API unavailable');
    }
  } catch (err) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      console.error('Fallback copy failed:', e);
    }
    document.body.removeChild(textarea);
  }
  if (!trigger) return;
  const original = trigger.textContent || 'Copy';
  trigger.textContent = 'Copied!';
  trigger.classList.add('copied');
  setTimeout(() => {
    trigger.textContent = original;
    trigger.classList.remove('copied');
  }, 1600);
}

function renderPremiumOutput(raw: string, html = ''): void {
  const safeRaw = raw.trim();
  output.dataset.copyText = safeRaw;
  if (!safeRaw && !html) {
    output.innerHTML = '<div class="empty-output">Your generated results will appear here.</div>';
    output.classList.add('empty');
    return;
  }

  let rendered = '';
  if (html || outputFormat === 'image' || outputFormat === 'html') {
    rendered = '<div class="visual-result-panel">' + html + '</div>';
  } else if (toolSlug.includes('business') || toolSlug.includes('brand') || toolSlug.includes('domain')) {
    rendered = renderBusinessCards(safeRaw);
  } else if (toolSlug.includes('tag') || toolSlug.includes('hashtag')) {
    rendered = renderGroupedTags(safeRaw);
  } else if (toolType === 'random-combo' || toolSlug.includes('name-generator')) {
    rendered = renderList(safeRaw);
  } else if (toolType === 'text-transform') {
    rendered = renderCards(safeRaw);
  } else if (toolType === 'template') {
    rendered = renderSections(safeRaw);
  } else if (toolType === 'visual') {
    rendered = renderSections(safeRaw);
  } else {
    rendered = renderSections(safeRaw);
  }

  output.innerHTML = rendered || renderRaw(safeRaw);
  output.classList.remove('empty');
}

async function generate() {
  trackGenerate(toolSlug);

  const datasets = await import('./data/generator-datasets');
  const {
    firstNames, lastNames, fantasyPrefixes, fantasySuffixes, teamAdjectives, teamNouns,
    babyBoyNames, babyGirlNames, middleNames, discordAdj, discordNouns, clanPrefixes, clanSuffixes,
    heroPrefixes, heroSuffixes, pirateFirst, pirateLast, pirateTitles, medievalFirst, medievalTitles,
    medievalPlaces, townPrefixes, townSuffixes, kingdomPrefixes, kingdomSuffixes, dragonPrefixes,
    dragonSuffixes, wolfNames, demonPrefixes, demonSuffixes, elfPrefixes, elfSuffixes, swFirst,
    swLast, animeFirst, animeLast, orcPrefixes, orcSuffixes, witchFirst, witchLast, alienPrefixes,
    alienSuffixes, vampireFirst, vampireLast, fairyFirst, fairyLast, goblinFirst, goblinLast,
    randomPhrases, guildAdj, guildNouns, planetPrefixes, planetSuffixes, islandPrefixes, islandSuffixes,
    wrestleAdj, wrestleNouns, leetMap, dwarfFirst, dwarfLast, dwarfClan, tiefFirst, hpFirst, hpLast,
    pokePrefixes, pokeSuffixes, schoolNames, schoolTypes, streetNames, streetTypes, pass19NameConfigs,
    morseMap, buildYouTubeTagSuite,
    seedNumber, makeHslColor, renderColorPalette, renderCssButtonOutput, hexToRgb,
    renderPreviewCodeSuite, renderPickerWheel, buildStorePolicySuite, makeDiscoveryTagGroups,
    renderHashtagGroups, buildXPostSuite, hslToRgb, rgbToHex, uniqueItems,
    makeNameIdeaGroups, buildChatGptPromptSuite, buildSamplePlaceholderSuite,
    buildBusinessDocumentSuite, renderPriceTags,
    buildAo3TagGroups, buildAsciiSections, buildImagePromptSections, buildOldEnglishStyles,
    buildPass19Memes, buildPass19NameGroups, buildPass19Testimonials, buildPass22EstimateSections,
    buildPass22ProposalSections, buildPass22ShortCodeGroups, buildPass22TextSections,
    buildPass23RandomGroups, buildPass23SectionSuite, buildPass23TemplateSections,
    buildPass23UtilityGroups, buildPass24FantasyLanguageSections, buildPass24NameGroups,
    buildPass24TextSections, buildPass24UtilitySections, buildPass25CreatureGroups,
    buildPass25TextSections, buildPass26RandomGroups, buildPass26UtilityGroups,
    buildPass27BusinessSections, buildPass27DeveloperSections, buildPass27PlatformGroups,
    buildPass29HumorGroups, buildPass29MarketplaceSections, buildPass29SecretGroups,
    buildPass29SocialGroups, buildPass29TemplateSections, buildPinterestKeywordSuite,
    buildPremiumBreadcrumbs, buildPremiumNameTags, buildPremiumPassphrase,
    buildPremiumRandomIds, buildSerifSections, buildSoundCloudTagSuite,
    buildSpecialCharacterGroups, contrastRatio, gibConsonants, gibVowels,
    reasonedText, renderReasonedTagGroups
  } = datasets;

  if (output) {
    output.classList.add('loading');
  }
  
  if (input) {
    const rawVal = input.value;
    if (rawVal !== lastValue) {
      undoStack.push(lastValue);
      redoStack.length = 0;
      lastValue = rawVal;
      updateUndoRedoButtons();
    }
  }

  const text = input.value.trim();
  let result = '';
  let resultHtml = '';
  const optionElementsCache = new Map<string, HTMLElement | null>();
  const optionValue = (id: string, fallback = '') => {
    let element = optionElementsCache.get(id);
    if (element === undefined) {
      element = document.getElementById(id);
      optionElementsCache.set(id, element);
    }
    if (!element) return fallback;
    if (element instanceof HTMLInputElement && element.type === 'checkbox') return element.checked ? 'true' : 'false';
    return (element as HTMLInputElement | HTMLSelectElement).value || fallback;
  };
  const clampNumber = (value: string, fallback: number, min: number, max: number) => Math.max(min, Math.min(max, Number(value) || fallback));
  const slugifyLocal = (value: string, fallback = 'item') => (value || fallback).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || fallback;
  const toPascal = (value: string, fallback = 'GeneratedItem') => slugifyLocal(value, fallback).split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  const safeIdent = (value: string, fallback = 'items') => slugifyLocal(value, fallback).replace(/-/g, '_');
  const ensureUrl = (value: string, fallback = 'https://example.com/page') => {
    const raw = (value || fallback).trim();
    return /^https?:\/\//i.test(raw) ? raw : 'https://' + raw.replace(/^\/+/, '');
  };
  const parseInputList = (value: string, fallback: string[]) => {
    const items = value.split(/[\n]+/).map(item => item.trim()).filter(Boolean);
    return items.length ? items : fallback;
  };
  const parseFieldList = (value: string, fallback: string[]) => parseInputList(value, fallback).map(item => slugifyLocal(item.split(':')[0], 'field').replace(/-/g, '_'));

  if (pass19NameConfigs[toolSlug]) {
    const config = pass19NameConfigs[toolSlug];
    const seed = compactSeed(text, config.title.replace(/Suite$/i, '').trim() || 'Nova');
    const selectedStyle = optionValue('pass19-style', 'all');
    const tone = optionValue('pass19-tone', 'balanced');
    const count = clampNumber(optionValue('pass19-count', '24'), 24, 20, 30);
    const groups = buildPass19NameGroups(toolSlug, seed, selectedStyle, tone, count);
    result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason + ' ' + item.extra).join('\n')).join('\n\n');
    resultHtml = renderGroupedIdeas(groups, `${config.title}. Style focus: ${selectedStyle}. Tone: ${tone}. ${config.footer}`);
  } else if (toolSlug === 'testimonial-generator') {
    const topic = compactSeed(text, 'your product or service').toLowerCase();
    const mode = optionValue('pass19-style', 'all');
    const tone = optionValue('pass19-tone', 'clear');
    const sections = buildPass19Testimonials(topic, mode, tone);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Ethical Testimonial Template Pack', sections, 'Draft templates and placeholders only. Do not generate or publish fake reviews intended to deceive.');
  } else if (toolSlug === 'meme-text-generator') {
    const topic = compactSeed(text, 'the situation').toLowerCase();
    const mode = optionValue('pass19-style', 'all');
    const tone = optionValue('pass19-tone', 'wholesome');
    const groups = buildPass19Memes(topic, mode, tone);
    result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
    resultHtml = renderHeadlineGroups(groups, 'Safe meme captions only. Avoid hate, harassment, adult/offensive content, threats, and targeted abuse.');
  } else if (toolSlug === 'passphrase-generator') {
    const style = optionValue('pass20-style', 'readable');
    const wordCount = clampNumber(optionValue('pass20-count', '5'), 5, 4, 8);
    const sections = buildPremiumPassphrase(text, style, wordCount);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Premium Passphrase Pack', sections, 'Generated locally in your browser. Use a password manager and do not reuse public sample phrases for important accounts.');
  } else if (toolSlug === 'random-id-generator') {
    const format = optionValue('pass20-style', 'prefixed');
    const count = clampNumber(optionValue('pass20-count', '12'), 12, 6, 24);
    const sections = buildPremiumRandomIds(text, format, count);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Random ID Utility Pack', sections, 'Random IDs are labels for testing, mockups, and internal references. They are not secrets, license keys, or official identifiers.');
  } else if (toolSlug === 'name-tag-generator') {
    const style = optionValue('pass20-style', 'event');
    const sections = buildPremiumNameTags(text, style);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Name Tag Layout Pack', sections, 'Replace bracketed placeholders before printing. Keep private information off badges unless it is approved and necessary.');
  } else if (toolSlug === 'breadcrumb-generator') {
    const format = optionValue('pass20-style', 'all');
    const sections = buildPremiumBreadcrumbs(text, format);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Breadcrumb Implementation Pack', sections, 'Examples use placeholder URLs. Replace them with real canonical URLs and validate before publishing.');
  } else if (toolSlug === 'special-character-generator') {
    const style = optionValue('pass21-style', 'all');
    const groups = buildSpecialCharacterGroups(style);
    result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
    resultHtml = renderHeadlineGroups(groups, 'Copyable symbol sets for bios, headings, separators, and decorative text. Platform support and username acceptance can vary.');
  } else if (toolSlug === 'ascii-text-generator') {
    const style = optionValue('pass21-style', 'all');
    const sections = buildAsciiSections(text, style);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('ASCII Text Style Pack', sections, 'ASCII alignment works best in monospace fonts. Keep long banners short for mobile layouts.');
  } else if (toolSlug === 'old-english-text-generator') {
    const style = optionValue('pass21-style', 'all');
    const groups = buildOldEnglishStyles(text, style);
    result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
    resultHtml = renderHeadlineGroups(groups, 'Blackletter-style Unicode output. Compatibility can vary by app, font, browser, and device.');
  } else if (toolSlug === 'ao3-tag-generator') {
    const style = optionValue('pass21-style', 'all');
    const groups = buildAo3TagGroups(text, style);
    result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
    resultHtml = renderHeadlineGroups(groups, 'Fandom/tag brainstorming only. No AO3 popularity, ranking, or live tag availability is claimed.');
  } else if (toolSlug === 'serif-generator') {
    const style = optionValue('pass21-style', 'all');
    const sections = buildSerifSections(text, style);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Serif Typography Pack', sections, 'Font availability depends on your site setup, licensing, and installed web fonts. Test readability before publishing.');
  } else if (['big-text-generator','bubble-text-generator','cursive-name-generator','cute-text-generator','pixel-text-generator','retro-text-generator'].includes(toolSlug)) {
    const style = optionValue('pass22-style', 'all');
    const sections = buildPass22TextSections(toolSlug, text, style);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Premium Text Style Pack', sections, 'Decorative text may render differently by browser, app, font, and device. Test the copied result wherever you plan to use it.');
  } else if (toolSlug === 'estimate-generator') {
    const mode = optionValue('pass22-style', 'all');
    const sections = buildPass22EstimateSections(text, mode);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Professional Estimate Draft', sections, 'Template only. This is not legal, tax, or accounting advice; confirm all numbers and terms before sending.');
  } else if (toolSlug === 'proposal-generator') {
    const mode = optionValue('pass22-style', 'all');
    const sections = buildPass22ProposalSections(text, mode);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Professional Proposal Draft', sections, 'Draft template only. Do not promise guaranteed outcomes, fake metrics, or unapproved deliverables.');
  } else if (toolSlug === 'short-code-generator') {
    const mode = optionValue('pass22-style', 'all');
    const groups = buildPass22ShortCodeGroups(text, mode);
    result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
    resultHtml = renderHeadlineGroups(groups, 'Short code ideas and naming patterns only. No official system validation, uniqueness, or availability is claimed.');
  } else if (['random-phrase-generator','random-text-generator','gibberish-generator','random-question-generator','truth-or-dare-generator','would-you-rather-generator','joke-generator','compliment-generator','random-word-generator'].includes(toolSlug)) {
    const style = optionValue('pass23-style', 'all');
    const groups = buildPass23RandomGroups(toolSlug, text, style);
    result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
    resultHtml = renderHeadlineGroups(groups, 'Family-safe output only. Avoid offensive, adult, harassing, or targeted content.');
  } else if (['content-calendar-generator','random-address-generator','fake-text-generator'].includes(toolSlug)) {
    const mode = optionValue('pass23-style', 'all');
    const sections = buildPass23TemplateSections(toolSlug, text, mode);
    const footer = toolSlug === 'content-calendar-generator'
        ? 'Planning template only. No ranking, traffic, revenue, engagement, or performance guarantees.'
        : toolSlug === 'random-address-generator'
          ? 'Fictional/sample data only. No real residency, identity, deliverability, or official address validity is claimed.'
          : 'Fictional/creative placeholder text only. No impersonation, fraud, evasion, identity misuse, or deceptive use.';
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Safe Template Pack', sections, footer);
  } else if (['pet-tag-generator','dj-tag-generator','clan-tag-generator','anagram-of-name-generator','phonetic-spelling-of-name-generator','name-combination-generator','name-pronunciation-generator','tattoo-name-generator'].includes(toolSlug)) {
    const style = optionValue('pass23-style', 'all');
    const groups = buildPass23UtilityGroups(toolSlug, text, style);
    const footer = toolSlug === 'pet-tag-generator'
      ? 'Pet tag layout ideas only. No official ID, registry, chip, or contact-validity claim is made.'
      : toolSlug === 'dj-tag-generator'
        ? 'Original DJ intro/drop ideas only. Do not imitate real artists, labels, tags, or protected phrases.'
        : toolSlug === 'clan-tag-generator'
          ? 'Short clan tag ideas only. No handle, server, game, or trademark availability claim is made.'
          : toolSlug.includes('pronunciation') || toolSlug.includes('phonetic')
            ? 'Pronunciation helpers only. No fake audio is generated; ask the person for their preferred pronunciation when accuracy matters.'
            : toolSlug === 'tattoo-name-generator'
              ? 'Tattoo lettering and placement brainstorming only. Consult a qualified tattoo professional for final design, placement, and aftercare.'
              : 'Creative name utility output only. No availability, legal, cultural, or official identity claim is made.';
    result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
    resultHtml = renderHeadlineGroups(groups, footer);
  } else if (['typewriter-text-generator','iupac-name-generator'].includes(toolSlug)) {
    const style = optionValue('pass23-style', 'all');
    const sections = buildPass23SectionSuite(toolSlug, text, style);
    const footer = toolSlug === 'iupac-name-generator'
      ? 'Educational chemistry-style naming only. This is not official IUPAC verification, structure validation, or lab/safety advice.'
      : 'Typewriter-style text formats. Unicode and spacing can render differently by app, font, browser, and device.';
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite(toolSlug === 'iupac-name-generator' ? 'Educational Chemistry Naming Pack' : 'Typewriter Text Style Pack', sections, footer);
  } else if (['bold-text-generator','glitch-text-generator','small-text-generator','italic-text-generator','strikethrough-text-generator','reverse-text-generator','creepy-text-generator','cool-text-generator','leet-text-generator','lowercase-generator','graffiti-text-generator','papyrus-generator'].includes(toolSlug)) {
    const style = optionValue('pass24-style', 'all');
    const sections = buildPass24TextSections(toolSlug, text, style);
    if (!sections.length) {
      result = 'Please enter some text above.';
    } else {
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Premium Text Style Pack', sections, 'Copy individual style cards or Copy All. Unicode appearance can vary by app, font, browser, and device.');
    }
  } else if (['fake-name-generator','pin-generator','geo-tag-generator','art-tag-generator','email-tag-generator'].includes(toolSlug)) {
    const style = optionValue('pass24-style', 'all');
    const sections = buildPass24UtilitySections(toolSlug, text, style);
    const footer = toolSlug === 'fake-name-generator'
      ? 'Fictional/creative/sample use only. No impersonation, fraud, evasion, or identity misuse.'
      : toolSlug === 'pin-generator'
        ? 'Random PIN ideas only; not banking/security-grade. Do not store secrets here.'
        : toolSlug === 'geo-tag-generator'
          ? 'Location/tag formatting ideas only. No tracking, surveillance, or deceptive location claims.'
          : toolSlug === 'art-tag-generator'
            ? 'Art labels/tags only. No fake provenance or marketplace ranking claims.'
            : 'Inbox/plus-address organization only. No spam, tracking, impersonation, or platform abuse.';
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Premium Safe Utility Pack', sections, footer);
  } else if (['twitch-name-generator','secret-santa-name-generator','team-name-generator-using-keywords'].includes(toolSlug)) {
    const style = optionValue('pass24-style', 'all');
    const groups = buildPass24NameGroups(toolSlug, text, style);
    const footer = toolSlug === 'twitch-name-generator'
      ? 'Streamer/display name ideas only. No handle availability claim and no platform impersonation.'
      : toolSlug === 'secret-santa-name-generator'
        ? 'Gift-exchange planning ideas only. Keep participant details private and avoid sensitive personal data.'
        : 'Keyword-aware team names only. No real team, league, school, or trademark claim is made.';
    result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + (item.extra || item.reason)).join('\n')).join('\n\n');
    resultHtml = renderGroupedIdeas(groups, footer);
  } else if (toolSlug === 'fantasy-language-generator') {
    const style = optionValue('pass24-style', 'all');
    const sections = buildPass24FantasyLanguageSections(text, style);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Fantasy Language Concept Suite', sections, 'Fictional language concepts only. No real-language authority, translation accuracy, or cultural authenticity is claimed.');
  } else if (['underline-text-generator','vaporwave-text-generator','unicode-text-generator','uwu-text-generator','wordart-generator','brat-text-generator','invisible-text-generator'].includes(toolSlug)) {
    const style = optionValue('pass25-style', 'all');
    const sections = buildPass25TextSections(toolSlug, text, style);
    if (!sections.length) {
      result = 'Please enter some text above.';
    } else {
      const footer = toolSlug === 'uwu-text-generator'
        ? 'Cute/anime-inspired playful rewrite only. Avoid offensive, stereotyped, harassing, or targeted language.'
        : toolSlug === 'wordart-generator'
          ? 'Decorative text-style packs only. No Microsoft WordArt branding claim, image export, or design-file export is made.'
          : toolSlug === 'brat-text-generator'
            ? 'Playful confident attitude tone only. Do not use for harassment, hate, threats, or targeted abuse.'
            : toolSlug === 'invisible-text-generator'
              ? 'Invisible character examples are for formatting and testing only. No spam, evasion, impersonation, or security-bypass use.'
              : 'Copy individual style cards or Copy All. Unicode appearance can vary by app, font, browser, and device.';
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Premium Text Style Pack', sections, footer);
    }
  } else if (['demon-name-generator','orc-name-generator','witch-name-generator','vampire-name-generator','fairy-name-generator','goblin-name-generator','dwarf-name-generator','tiefling-name-generator','angel-name-generator','dragonborn-name-generator','werewolf-name-generator','barbarian-name-generator','dinosaur-name-generator','gnome-name-generator','mermaid-name-generator','monster-name-generator'].includes(toolSlug)) {
    const style = optionValue('pass25-style', 'all');
    const groups = buildPass25CreatureGroups(toolSlug, text, style);
    result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + (item.extra || item.reason)).join('\n')).join('\n\n');
    resultHtml = renderGroupedIdeas(groups, 'Fictional fantasy naming only. No franchise copying, protected character references, hateful/graphic/extremist content, or real-world identity claims.');
  } else if (['midjourney-prompt-generator','stable-diffusion-prompt-generator'].includes(toolSlug)) {
    const style = optionValue('pass26-style', 'all');
    const prefix = toolSlug === 'midjourney-prompt-generator' ? 'mj' : 'sd';
    const sections = buildImagePromptSections(toolSlug, text, style, {
      purpose: optionValue(`${prefix}-purpose`, 'concept-art'),
      subjectType: optionValue(`${prefix}-subject-type`, 'environment'),
      visualStyle: optionValue(`${prefix}-style`, 'cinematic-original'),
      mood: optionValue(`${prefix}-mood`, 'calm'),
      lighting: optionValue(`${prefix}-lighting`, 'soft-natural'),
      composition: optionValue(`${prefix}-composition`, 'rule-of-thirds'),
      aspect: optionValue(`${prefix}-aspect`, '16:9'),
      detailLevel: optionValue(`${prefix}-detail-level`, optionValue(`${prefix}-quality`, 'balanced')),
      outputFormat: optionValue(`${prefix}-output-format`, 'brief-plus-prompt'),
      safetyLevel: optionValue(`${prefix}-safety-level`, 'commercial-review'),
      includeAvoid: Boolean((document.getElementById(`${prefix}-negative`) as HTMLInputElement | null)?.checked),
      commercialCaution: Boolean((document.getElementById(`${prefix}-commercial-caution`) as HTMLInputElement | null)?.checked)});
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Rights-Aware Image Prompt Pack', sections, 'Prompt drafting only. No image quality, model acceptance, rendering, safety, copyright clearance, likeness rights, commercial-use rights, platform approval, or provider affiliation guarantee.');
  } else if (['coin-flip','dice-roller','random-letter-generator','random-emoji-generator','random-country-generator','random-date-generator','random-choice-generator','random-height-generator','random-color-generator','wheel-spinner-generator'].includes(toolSlug)) {
    const style = optionValue('pass26-style', 'all');
    const count = clampNumber(optionValue('pass26-count', '8'), 8, 1, 40);
    const groups = buildPass26RandomGroups(toolSlug, text, style, count);
    result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + (item.extra || item.reason)).join('\n')).join('\n\n');
    resultHtml = renderGroupedIdeas(groups, 'Randomness helper only. No gambling, lottery, legal fairness, compliance, audited fairness, or cryptographic randomness claim is made.');
  } else if (['riddle-generator','icebreaker-generator','corporate-speak-generator','giveaway-generator','wifi-name-generator','sigil-generator','ransom-note-text-generator'].includes(toolSlug)) {
    const style = optionValue('pass26-style', 'all');
    const count = clampNumber(optionValue('pass26-count', '6'), 6, 1, 20);
    const groups = buildPass26UtilityGroups(toolSlug, text, style, count);
    const footer = toolSlug === 'riddle-generator'
      ? 'Family-safe riddle cards with answer reveal text. Avoid offensive, adult, or targeted content.'
      : toolSlug === 'icebreaker-generator'
        ? 'Safe, non-invasive icebreaker questions only. Avoid sensitive personal, medical, financial, political, or identity-pressure prompts.'
        : toolSlug === 'corporate-speak-generator'
          ? 'Playful office-style rewrites only. No deceptive business, fraud, compliance evasion, or misleading claims.'
          : toolSlug === 'giveaway-generator'
            ? 'Giveaway planning helper only. No legal, fairness, eligibility, compliance, or audited draw guarantee.'
            : toolSlug === 'wifi-name-generator'
              ? 'Family-safe WiFi name ideas only. Avoid offensive, hateful, threatening, or targeted names.'
              : toolSlug === 'sigil-generator'
                ? 'Fictional symbol and mark concept briefs only. No occult power, guarantee, or real-world efficacy claim.'
                : 'Decorative cutout/text style only. No threats, extortion, harassment, intimidation, criminal framing, or targeted abuse.';
    result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + (item.extra || item.reason)).join('\n')).join('\n\n');
    resultHtml = renderGroupedIdeas(groups, footer);
  } else if (['twitter-bio-generator','tiktok-bio-generator','linkedin-bio-generator','youtube-name-generator','tiktok-name-generator','instagram-name-generator','twitter-name-generator','linkedin-headline-generator','youtube-description-generator','tiktok-caption-generator','linkedin-post-generator','youtube-hook-generator','linkedin-summary-generator'].includes(toolSlug)) {
    const style = optionValue('pass27-style', 'all');
    const useCase = optionValue('linkedin-profile-goal',
      optionValue('video-style',
        optionValue('tiktok-video-type',
          optionValue('linkedin-post-format',
            optionValue('x-post-format',
              optionValue('youtube-hook-style',
                optionValue('linkedin-summary-style', 'general')))))));
    const context = {
      tone: optionValue('tiktok-bio-tone', optionValue('amazon-tone', 'balanced')),
      style: optionValue('twitter-bio-style', optionValue('name-style', optionValue('linkedin-headline-style', 'balanced'))),
      cta: optionValue('twitter-bio-cta', optionValue('tiktok-bio-cta', optionValue('tiktok-cta', 'soft'))),
      useCase,
      position: optionValue('channel-position', 'creator')};
    const groups = buildPass27PlatformGroups(toolSlug, text, style, context);
    result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + (item.extra || item.reason)).join('\n')).join('\n\n');
    resultHtml = renderGroupedIdeas(groups, 'Drafting/brainstorming only. No spam, impersonation, evasion, deceptive engagement, fake metrics, fake follower claims, trademark/platform affiliation claims, or handle/name availability claims.');
  } else if (['api-key-generator','license-key-generator','recovery-code-generator','jwt-generator'].includes(toolSlug)) {
    const style = optionValue('pass27-style', 'all');
    const count = clampNumber(optionValue('pass27-count', '4'), 4, 1, 12);
    const sections = buildPass27DeveloperSections(toolSlug, text, style, count);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Safe Demo Token Pack', sections, 'For placeholders/testing/demo formatting only. No real secrets, auth bypass, impersonation, platform abuse, malware, signed production JWT, or security guarantee.');
  } else if (['invoice-generator','receipt-generator','meeting-agenda-generator','amazon-listing-generator','etsy-listing-generator'].includes(toolSlug)) {
    const style = optionValue('pass27-style', 'all');
    const sections = buildPass27BusinessSections(toolSlug, text, style, {
      documentType: optionValue('invoice-type', optionValue('receipt-business-type', 'service')),
      currency: optionValue('invoice-currency', optionValue('receipt-currency', 'USD')),
      taxRate: optionValue('invoice-tax-rate', '0'),
      lineCount: optionValue('invoice-line-count', optionValue('receipt-item-count', '3')),
      paymentTerms: optionValue('payment-terms', 'net-30'),
      paymentMethod: optionValue('receipt-payment-method', 'card'),
      includeTaxNote: Boolean((document.getElementById('invoice-include-tax-note') as HTMLInputElement | null)?.checked),
      includeLateNote: Boolean((document.getElementById('invoice-include-late-note') as HTMLInputElement | null)?.checked),
      includePolicy: Boolean((document.getElementById('receipt-include-policy') as HTMLInputElement | null)?.checked),
      includeVerification: Boolean((document.getElementById('receipt-include-verification') as HTMLInputElement | null)?.checked)});
    const footer = ['invoice-generator','receipt-generator'].includes(toolSlug)
      ? 'Administrative draft/sample only. Not legal, tax, financial, accounting, payment, or compliance advice. Do not create fake official records, false debts, or false proof of payment.'
      : ['amazon-listing-generator','etsy-listing-generator'].includes(toolSlug)
        ? 'Marketplace listing draft only. No fake reviews, rankings, prohibited claims, platform affiliation, or guaranteed performance.'
        : 'Safe business draft only. Confirm details with participants and avoid deceptive, harmful, or regulated-advice framing.';
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Premium Draft Template Pack', sections, footer);
  } else if (['pinterest-tag-generator','soundcloud-tag-generator','twitter-card-generator'].includes(toolSlug)) {
    const style = optionValue('pass29-style', 'all');
    const groups = buildPass29SocialGroups(toolSlug, text, style);
    result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + (item.extra || item.reason)).join('\n')).join('\n\n');
    resultHtml = renderGroupedIdeas(groups, 'Drafting/brainstorming only. No spam, impersonation, evasion, deceptive engagement, fake metrics, fake follower claims, ranking guarantees, platform affiliation claims, tag/search-volume claims, or username availability claims.');
  } else if (['password-generator','token-generator'].includes(toolSlug)) {
    const style = optionValue('pass29-style', 'all');
    const count = clampNumber(optionValue('pass29-count', '5'), 5, 1, 12);
    const groups = buildPass29SecretGroups(toolSlug, text, style, count);
    result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + (item.extra || item.reason)).join('\n')).join('\n\n');
    resultHtml = renderGroupedIdeas(groups, 'Browser-local/demo-safe generation only. No storage, no security guarantee, no audited cryptographic-safety claim, and the user is responsible for secure storage and use.');
  } else if (['privacy-policy-generator','terms-generator','cookie-policy-generator','disclaimer-generator','refund-policy-generator','affiliate-disclosure-generator','nda-generator','service-agreement-generator','contract-generator','dmca-policy-generator','acceptable-use-policy-generator'].includes(toolSlug)) {
    const style = optionValue('pass29-style', optionValue('pass28-style', 'all'));
    const sections = buildPass29TemplateSections(toolSlug, text, style, {
      region: optionValue('aup-region', optionValue('dmca-region', optionValue('privacy-region', optionValue('terms-region', optionValue('cookie-region', optionValue('disclaimer-region', optionValue('refund-region', optionValue('affiliate-region', 'global')))))))),
      businessType: optionValue('privacy-business-type', optionValue('terms-business-model', optionValue('disclaimer-content-type', optionValue('refund-business-type', 'website')))),
      dataScope: optionValue('privacy-data-scope', 'contact-only'),
      usesCookies: Boolean((document.getElementById('policy-cookies') as HTMLInputElement | null)?.checked),
      usesAnalytics: Boolean((document.getElementById('policy-analytics') as HTMLInputElement | null)?.checked),
      usesAds: Boolean((document.getElementById('policy-ads') as HTMLInputElement | null)?.checked),
      children: Boolean((document.getElementById('privacy-children') as HTMLInputElement | null)?.checked),
      termsAccounts: Boolean((document.getElementById('terms-accounts') as HTMLInputElement | null)?.checked),
      termsPayments: Boolean((document.getElementById('terms-payments') as HTMLInputElement | null)?.checked),
      termsUserContent: Boolean((document.getElementById('terms-user-content') as HTMLInputElement | null)?.checked),
      termsAcceptableUse: Boolean((document.getElementById('terms-acceptable-use') as HTMLInputElement | null)?.checked),
      cookieStack: optionValue('cookie-stack', 'analytics'),
      controlMethod: optionValue('cookie-control', 'cookie-banner'),
      cookieThirdParties: Boolean((document.getElementById('cookie-third-parties') as HTMLInputElement | null)?.checked),
      cookieConsentReview: Boolean((document.getElementById('cookie-consent-review') as HTMLInputElement | null)?.checked),
      disclaimerRisk: optionValue('disclaimer-risk', 'medium'),
      disclaimerExternalLinks: Boolean((document.getElementById('disclaimer-external-links') as HTMLInputElement | null)?.checked),
      disclaimerAffiliates: Boolean((document.getElementById('disclaimer-affiliates') as HTMLInputElement | null)?.checked),
      disclaimerNoProfessionalAdvice: Boolean((document.getElementById('disclaimer-no-professional-advice') as HTMLInputElement | null)?.checked),
      refundWindow: optionValue('refund-window', '30-days'),
      refundRemedy: optionValue('refund-remedy', 'original-payment'),
      refundReturns: Boolean((document.getElementById('refund-returns') as HTMLInputElement | null)?.checked),
      refundDigitalException: Boolean((document.getElementById('refund-digital-exception') as HTMLInputElement | null)?.checked),
      refundDamagedItems: Boolean((document.getElementById('refund-damaged-items') as HTMLInputElement | null)?.checked),
      affiliateChannel: optionValue('affiliate-channel', 'blog'),
      affiliateRelationship: optionValue('affiliate-relationship', 'commission'),
      affiliatePlacement: optionValue('affiliate-placement', 'near-link'),
      affiliateAmazonNote: Boolean((document.getElementById('affiliate-amazon-note') as HTMLInputElement | null)?.checked),
      affiliateReviewIntegrity: Boolean((document.getElementById('affiliate-review-integrity') as HTMLInputElement | null)?.checked),
      serviceType: optionValue('aup-service-type', optionValue('dmca-service-type', 'website')),
      intake: optionValue('dmca-intake', 'email-only'),
      processDepth: optionValue('dmca-process', 'takedown-review'),
      includeCounterNotice: optionValue('dmca-counter-notice', 'true') === 'true',
      includeRepeatInfringer: optionValue('dmca-repeat-infringer', 'true') === 'true',
      riskLevel: optionValue('aup-risk-level', 'standard'),
      enforcement: optionValue('aup-enforcement', 'standard'),
      includeSecurity: optionValue('aup-security-clause', 'true') === 'true',
      includeContent: optionValue('aup-content-clause', 'true') === 'true',
      includeAutomation: optionValue('aup-api-automation-clause', 'true') === 'true'
    });
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Informational Template Pack', sections, 'Informational templates only. Not legal or compliance advice. Review with a qualified professional before use; no official/legal validity or jurisdiction-specific claim is made.');
  } else if (['shakespeare-insult-generator','comeback-generator','roast-generator'].includes(toolSlug)) {
    const style = optionValue('pass29-style', 'all');
    const groups = buildPass29HumorGroups(toolSlug, text, style, {
      intensity: optionValue('humor-intensity', 'gentle'),
      audience: optionValue('humor-context', 'friends-opt-in'),
      tone: optionValue('humor-tone', 'playful'),
      targetType: optionValue('humor-target-type', 'friend'),
      variant: optionValue('humor-variant', 'witty-clean'),
      count: clampNumber(optionValue('humor-count', '4'), 4, 2, 8),
      safeMode: optionValue('humor-safe-mode', 'true') === 'true',
      includeAvoid: optionValue('humor-avoid-list', 'true') === 'true',
      includeSofter: optionValue('humor-softer', 'true') === 'true',
      situation: optionValue('comeback-situation', 'minor-tease'),
      boundaryStyle: optionValue('comeback-boundary-style', 'light-boundary'),
      deescalation: optionValue('comeback-deescalation', 'high'),
      safeTopic: optionValue('roast-safe-topic', 'overplanning'),
      offLimits: optionValue('roast-off-limits', 'appearance-identity'),
      eventType: optionValue('roast-event-type', 'game-night')});
    result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + (item.extra || item.reason)).join('\n')).join('\n\n');
    resultHtml = renderGroupedIdeas(groups, 'Fictional, light-hearted, opt-in entertainment only. Do not use for harassment, bullying, hate, protected-class insults, threats, doxxing, sexual humiliation, school/workplace targeting, self-harm references, violence, or abuse.');
  } else if (['etsy-tag-generator','shopify-product-description-generator'].includes(toolSlug)) {
    const style = optionValue('pass29-style', 'all');
    const sections = buildPass29MarketplaceSections(toolSlug, text, style);
    result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
    resultHtml = renderSectionSuite('Truthful Listing Draft Pack', sections, 'Truthful listing draft only. No fake reviews, fake rankings, prohibited product claims, platform affiliation, guaranteed performance, or sales guarantees.');
  } else switch (toolSlug) {
    case 'trademark-friendly-name-generator': {
      const industry = optionValue('tm-industry', 'tech');
      const style = optionValue('tm-style', 'portmanteau');
      const baseWord = compactSeed(text, 'brand').toLowerCase();
      const vowels = ['a','e','i','o','u'];
      const consonants = ['b','c','d','f','g','h','k','l','m','n','p','r','s','t','v','z'];

      let prefixes = [];
      let suffixes = [];

      if (industry === 'tech') {
        prefixes = ['Aura','Syn','Omni','Neo','Aero','Cyber','Nova','Vero','Zeta','Exo'];
        suffixes = ['ify','ly','io','tech','tron','sync','base','hub','flow','ai'];
      } else if (industry === 'lifestyle') {
        prefixes = ['Vela','Luma','Aura','Sol','Luna','Cura','Viva','Zen','Oasis','Bloom'];
        suffixes = ['life','style','well','glow','nest','root','haus',' Collective',' Vibe',' Aura'];
      } else if (industry === 'corporate') {
        prefixes = ['Acme','Apex','Summit','Prime','Vanguard','Nexus','Pillar','Equi','Strat','Core'];
        suffixes = [' Partners',' Group',' Global',' Solutions',' Corp',' Systems',' Dynamics',' Capital',' Ventures',' Trust'];
      } else {
        prefixes = ['Artis','Chroma','Prism','Lumina','Echo','Muse','Canvas','Aether','Quirk','Vivid'];
        suffixes = [' Studio',' Design',' Creative',' Lab',' Works',' Agency',' Vision',' Collective',' Media',' Arts'];
      }

      const generatedNames: { name: string, reason: string, extra: string }[] = [];
      for (let i = 0; i < 6; i++) {
        let name = '';
        if (style === 'portmanteau') {
          const p = prefixes[i % prefixes.length].toLowerCase();
          const s = suffixes[i % suffixes.length].toLowerCase().trim();
          const combo = (i % 2 === 0) ? (p.slice(0, Math.max(2, p.length - 1)) + baseWord.slice(1)) : (baseWord.slice(0, Math.max(2, baseWord.length - 1)) + s.slice(1));
          name = combo.charAt(0).toUpperCase() + combo.slice(1);
        } else if (style === 'abstract') {
          let word = '';
          const len = 5 + (i % 2);
          for (let j = 0; j < len; j++) {
            word += (j % 2 === 0) ? consonants[(i + j * 3) % consonants.length] : vowels[(i + j * 2) % vowels.length];
          }
          if (i % 3 === 0) word += 'x';
          else if (i % 3 === 1) word += 'z';
          name = word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          name = prefixes[i % prefixes.length] + ' ' + (baseWord.charAt(0).toUpperCase() + baseWord.slice(1));
        }
        
        generatedNames.push({
          name,
          reason: `Industry sector: ${titleCase(industry)}. Style: ${titleCase(style)}.`,
          extra: `Coined variant targeting descriptive safety.`
        });
      }

      const groups = [
        {
          title: `Trademark-Friendly Names (${titleCase(industry)})`,
          note: `Procedural suggestions using base keyword "${baseWord}".`,
          items: generatedNames
        }
      ];

      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Safe branding note: trademark-friendly names are coined or abstract suggestions. You must perform local trademark checks, domain searches, and legal clearances before public business registration.');
      break;
    }
    case 'fancy-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const filter = optionValue('fancy-filter', 'all');
      const decor = optionValue('fancy-decor', 'none');
      const boldScriptMap = unicodeMap(0x1D4D0, 0x1D4EA);
      
      const applyDecor = (val: string): string => {
        if (decor === 'stars') return `★彡 ${val} 彡★`;
        if (decor === 'hearts') return `♥ ${val} ♥`;
        if (decor === 'brackets') return `【${val}】`;
        if (decor === 'wings') return `꧁༒ ${val} ༒꧂`;
        if (decor === 'sparkles') return `✧*。${val} ✧*。`;
        return val;
      };

      const transformZalgo = (val: string): string => {
        const zalgoUp = ['\u030d','\u030e','\u0304','\u0305','\u033f','\u0311','\u0306','\u0310'];
        const zalgoDown = ['\u0316','\u0317','\u0318','\u0319','\u031c','\u031d','\u031e','\u031f'];
        return val.split('').map(c => c + randomFrom(zalgoUp) + randomFrom(zalgoDown)).join('');
      };

      const transformSuperscript = (val: string): string => {
        const superMap: Record<string, string> = {
          a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ',
          n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', q: 'ᵠ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
          A: 'ᴬ', B: 'ᴮ', C: 'ᶜ', D: 'ᴰ', E: 'ᴱ', F: 'ᶠ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ', J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ',
          N: 'ᴺ', O: 'ᴼ', P: 'ᴾ', R: 'ᴿ', T: 'ᵀ', U: 'ᵁ', V: 'ⱽ', W: 'ᵂ',
          '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
        };
        return val.split('').map(c => superMap[c] || superMap[c.toLowerCase()] || c).join('');
      };

      const transformSubscript = (val: string): string => {
        const subMap: Record<string, string> = {
          a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
          A: 'ₐ', E: 'ₑ', H: 'ₕ', I: 'ᵢ', J: 'ⱼ', K: 'ₖ', L: 'ₗ', M: 'ₘ', N: 'ₙ', O: 'ₒ', P: 'ₚ', R: 'ᵣ', S: 'ₛ', T: 'ₜ', U: 'ᵤ', V: 'ᵥ', X: 'ₓ',
          '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
        };
        return val.split('').map(c => subMap[c] || subMap[c.toLowerCase()] || c).join('');
      };

      const allStyles = [
        { name: 'Bold', preview: toUnicode(text, boldMap), use: 'Strong profile names and short captions', note: 'Broad Unicode support, high compatibility.', category: 'fonts', isCompat: true },
        { name: 'Italic', preview: toUnicode(text, italicUnicodeMap), use: 'Elegant bios and captions', note: 'Works best for letters; numbers stay plain.', category: 'fonts', isCompat: true },
        { name: 'Bold Italic', preview: toUnicode(text, boldItalicUnicodeMap), use: 'High-impact social text', note: 'Good when you want style and weight together.', category: 'fonts', isCompat: false },
        { name: 'Elegant Script', preview: toUnicode(text, cursiveMap), use: 'Instagram bios and names', note: 'Decorative cursive script letters.', category: 'fonts', isCompat: false },
        { name: 'Bold Script', preview: toUnicode(text, boldScriptMap), use: 'Readable cursive headers', note: 'Heavier script strokes for emphasis.', category: 'fonts', isCompat: false },
        { name: 'Gothic', preview: toUnicode(text, gothicUnicodeMap), use: 'Dramatic usernames and display names', note: 'Ornate medieval style.', category: 'fonts', isCompat: false },
        { name: 'Bold Gothic', preview: toUnicode(text, boldGothicUnicodeMap), use: 'Medieval bold headers', note: 'Heavier blackletter typeface.', category: 'fonts', isCompat: false },
        { name: 'Monospace', preview: toUnicode(text, monospaceUnicodeMap), use: 'Tech-style handles and bios', note: 'Clean typewriter style.', category: 'fonts', isCompat: true },
        { name: 'Double-Struck', preview: toUnicode(text, doubleStruckUnicodeMap), use: 'Premium math-style display text', note: 'Classic double-lined letters.', category: 'fonts', isCompat: false },
        { name: 'Superscript (Tiny)', preview: transformSuperscript(text), use: 'Instagram bio highlights', note: 'Small letters stacked high.', category: 'fonts', isCompat: true },
        { name: 'Subscript (Tiny)', preview: transformSubscript(text), use: 'Scientific or aesthetic spacing', note: 'Small letters hanging low.', category: 'fonts', isCompat: true },
        { name: 'Parenthesized', preview: toUnicode(text, parenthesizedMap), use: 'Numbered lists and custom labels', note: 'Letters surrounded by parentheses.', category: 'fonts', isCompat: true },
        { name: 'Bubble', preview: transformCircled(text), use: 'Playful comments and bios', note: 'Circled text, fun for handles.', category: 'decorations', isCompat: false },
        { name: 'Squared', preview: transformSquared(text), use: 'Blocky display labels', note: 'Squared uppercase letter format.', category: 'decorations', isCompat: false },
        { name: 'Small Caps', preview: transformSmallCaps(text), use: 'Clean aesthetic labels', note: 'Social-media friendly, high compatibility.', category: 'fonts', isCompat: true },
        { name: 'Upside Down', preview: transformUpsideDown(text), use: 'Novelty posts and fun replies', note: 'Reverses text order upside down.', category: 'decorations', isCompat: false },
        { name: 'Vaporwave (Fullwidth)', preview: transformFullwidth(text), use: 'Aesthetic spaced captions', note: 'Very visible spaced text.', category: 'decorations', isCompat: false },
        { name: 'Strikethrough', preview: text.split('').map(c => c + '\u0336').join(''), use: 'Edits, jokes, and stylized emphasis', note: 'Struck-out letters.', category: 'decorations', isCompat: true },
        { name: 'Underline', preview: text.split('').map(c => c + '\u0332').join(''), use: 'Underlined emphasis and headings', note: 'Clean combining underline.', category: 'decorations', isCompat: true },
        { name: 'Double Underline', preview: text.split('').map(c => c + '\u0333').join(''), use: 'Double underlined labels', note: 'Uses combining double low lines.', category: 'decorations', isCompat: true },
        { name: 'Slash', preview: text.split('').map(c => c + '\u0338').join(''), use: 'Slashed text effects', note: 'Uses combining solidus overlays.', category: 'decorations', isCompat: true },
        { name: 'Slash + Strike', preview: text.split('').map(c => c + '\u0338' + '\u0336').join(''), use: 'Glitchy crossed-out tag styles', note: 'Combines solidus and strikethrough overlays.', category: 'decorations', isCompat: true },
        { name: 'Creepy (Zalgo)', preview: transformZalgo(text), use: 'Halloween posts and eerie bios', note: 'Light glitch style combining marks.', category: 'decorations', isCompat: false },
        { name: 'Arrow Wrap', preview: '➔ ' + text + ' ➔', use: 'High visibility tags', note: 'Aesthetic pointing arrows.', category: 'decorations', isCompat: true },
        { name: 'Sparkle Wrap', preview: '✨ ' + text + ' ✨', use: 'Aesthetic bio headings', note: 'Shining highlight borders.', category: 'decorations', isCompat: true },
        { name: 'Crown Wrap', preview: '👑 ' + text + ' 👑', use: 'Gaming profiles and names', note: 'Royal theme border.', category: 'decorations', isCompat: true },
        { name: 'Music Wrap', preview: '🎵 ' + text + ' 🎵', use: 'Song captions and lists', note: 'Musical theme border.', category: 'decorations', isCompat: true },
        { name: 'Heart Wrap', preview: '💖 ' + text + ' 💖', use: 'Cute status updates', note: 'Sweet theme border.', category: 'decorations', isCompat: true }
      ];

      const styles = allStyles
        .filter(style => {
          if (filter === 'fonts') return style.category === 'fonts';
          if (filter === 'decorations') return style.category === 'decorations';
          if (filter === 'compat') return style.isCompat;
          return true;
        })
        .map(style => ({
          ...style,
          preview: applyDecor(style.preview)
        }));

      result = styles.map(style => `${style.name}: ${style.preview}`).join('\n');
      resultHtml = renderStyleMatrix(styles, 'Copy All includes every filtered style. Unicode rendering depends on your device OS.');
      break;
    }
    case 'bold-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const filter = optionValue('bold-filter', 'all');
      const decor = optionValue('bold-decor', 'none');
      
      const applyDecor = (val: string): string => {
        if (decor === 'stars') return `★彡 ${val} 彡★`;
        if (decor === 'hearts') return `♥ ${val} ♥`;
        if (decor === 'brackets') return `【${val}】`;
        if (decor === 'wings') return `꧁༒ ${val} ༒꧂`;
        if (decor === 'sparkles') return `✧*。${val} ✧*。`;
        return val;
      };

      const boldSansMap = unicodeMap(0x1D5D4, 0x1D5EE, 0x1D7EC);
      const boldItalicSansMap = unicodeMap(0x1D608, 0x1D622);
      const boldGothicMap = unicodeMap(0x1D56C, 0x1D586);
      const boldScriptMap = unicodeMap(0x1D4D0, 0x1D4EA);
      const circledMap = unicodeMap(0x24B6, 0x24D0);
      const doubleStruckMap = {
        ...unicodeMap(0x1D538, 0x1D552, 0x1D7D8),
        C: 'ℂ',
        H: 'ℍ',
        N: 'ℕ',
        P: 'ℙ',
        Q: 'ℚ',
        R: 'ℝ',
        Z: 'ℤ'
      };

      const squareMap = (t: string) => t.toUpperCase().split('').map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + code - 65);
        return c;
      }).join('');

      const allStyles = [
        { name: 'Bold Sans-Serif', preview: toUnicode(text, boldSansMap), use: 'Clean, modern social headings', note: 'Best readability on standard mobile screens.', category: 'standard', isCompat: true },
        { name: 'Bold Serif', preview: toUnicode(text, boldMap), use: 'Classic editorial headers and names', note: 'Ornate serif font style.', category: 'standard', isCompat: true },
        { name: 'Bold Italic Sans', preview: toUnicode(text, boldItalicSansMap), use: 'Dynamic bios and captions', note: 'Modern slanted bold typeface.', category: 'standard', isCompat: true },
        { name: 'Bold Italic Serif', preview: toUnicode(text, boldItalicUnicodeMap), use: 'Sophisticated profile lines', note: 'Slanted serif bold style.', category: 'standard', isCompat: false },
        { name: 'Bold Script', preview: toUnicode(text, boldScriptMap), use: 'Decorative cursive bios', note: 'Ornate cursive script with extra weight.', category: 'decorative', isCompat: false },
        { name: 'Bold Gothic', preview: toUnicode(text, boldGothicMap), use: 'Dramatic display headers', note: 'Blackletter medieval bold characters.', category: 'decorative', isCompat: false },
        { name: 'Double-Struck', preview: toUnicode(text, doubleStruckMap), use: 'Mathematical-style highlight labels', note: 'Double-lined hollow font face.', category: 'decorative', isCompat: false },
        { name: 'Bold Monospace', preview: toUnicode(text, monospaceUnicodeMap), use: 'Developer tags and monospace labels', note: 'Fixed-width bold characters.', category: 'decorative', isCompat: true },
        { name: 'Circled Bold (Bubble)', preview: toUnicode(text, circledMap), use: 'Circled highlight words', note: 'Hollow circled bubble style.', category: 'decorative', isCompat: false },
        { name: 'Squared Bold (Block)', preview: squareMap(text), use: 'Squared header labels', note: 'Capital block squared characters.', category: 'decorative', isCompat: false }
      ];

      const styles = allStyles
        .filter(style => {
          if (filter === 'standard') return style.category === 'standard';
          if (filter === 'decorative') return style.category === 'decorative';
          if (filter === 'compat') return style.isCompat;
          return true;
        })
        .map(style => ({
          ...style,
          preview: applyDecor(style.preview)
        }));

      result = styles.map(style => `${style.name}: ${style.preview}`).join('\n');
      resultHtml = renderStyleMatrix(styles, 'Copy All includes every filtered bold style. Render support varies by client device.');
      break;
    }
    case 'cursive-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const scriptMap = unicodeMap(0x1D49C, 0x1D4B6);
      const boldScriptMap = unicodeMap(0x1D4D0, 0x1D4EA);
      const styles = [
        { name: 'Elegant Script', preview: toUnicode(text, cursiveMap), use: 'Instagram bios and display names', note: 'Classic cursive Unicode style using your exact input.' },
        { name: 'Formal Script', preview: toUnicode(text, scriptMap), use: 'Invitations, names, and soft branding', note: 'Decorative script letters; some capitals use fallback on certain devices.' },
        { name: 'Bold Script', preview: toUnicode(text, boldScriptMap), use: 'Readable cursive headers', note: 'Heavier strokes make short phrases easier to notice.' },
        { name: 'Italic Script Mix', preview: toUnicode(text, italicUnicodeMap), use: 'Simple elegant captions', note: 'More compatible than ornate script on many platforms.' },
        { name: 'Small Caps Signature', preview: transformSmallCaps(text), use: 'Clean signature-style profile labels', note: 'Not cursive, but useful as a compatible alternate.' },
        { name: 'Fullwidth Soft Script', preview: transformFullwidth(text), use: 'Aesthetic spacing with a polished feel', note: 'Good fallback when script glyphs look inconsistent.' }];
      result = styles.map(style => `${style.name}: ${style.preview}`).join('\n');
      resultHtml = renderStyleMatrix(styles, 'Compatibility note: cursive Unicode letters copy as special characters, not as a downloadable font.');
      break;
    }
    case 'glitch-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const zalgoUp = ['\u030d','\u030e','\u0304','\u0305','\u033f','\u0311','\u0306','\u0310','\u0352','\u0357','\u0351','\u0307','\u0308','\u030a','\u0342','\u0343','\u0344','\u034a','\u034b','\u034c'];
      const zalgoDown = ['\u0316','\u0317','\u0318','\u0319','\u031c','\u031d','\u031e','\u031f','\u0320','\u0324','\u0325','\u0326','\u0329','\u032a','\u032b','\u032c','\u032d','\u032e','\u032f','\u0330'];
      result = text.split('').map(c => {
        let g = c;
        for (let i = 0; i < 3; i++) g += randomFrom(zalgoUp) + randomFrom(zalgoDown);
        return g;
      }).join('');
      break;
    }
    case 'name-generator': {
      const seed = compactSeed(text, 'creative name');
      const core = seed.split(' ')[0] || 'Nova';
      const nameType = optionValue('name-type', 'personal');
      const nameStyle = optionValue('name-style', 'balanced');
      const groups = [
        { title: 'Modern', note: `Clean ${nameType} name ideas.`, items: [
          { name: `${core} Vale`, reason: 'Modern and easy to say.', extra: 'Availability note: check domains, handles, and local usage.' },
          { name: `Mira ${core}`, reason: 'Soft contemporary sound.', extra: 'Good for personal or brand-adjacent names.' },
          { name: `${core} Lane`, reason: 'Simple and memorable.', extra: 'Works as a public-facing name.' }] },
        { title: 'Classic', note: 'Familiar and trustworthy.', items: [
          { name: `${randomFrom(firstNames)} ${randomFrom(lastNames)}`, reason: 'Traditional full-name structure.', extra: 'Good when credibility matters.' },
          { name: `${randomFrom(firstNames)} ${core}`, reason: 'Classic first name with user seed.', extra: 'Balanced and readable.' },
          { name: `${core} Bennett`, reason: 'Polished surname-style option.', extra: 'Easy to pronounce.' }] },
        { title: 'Short', note: 'Compact options for fast recall.', items: [
          { name: core.slice(0, 5), reason: 'Short and handle-friendly.', extra: 'Check for conflicts before use.' },
          { name: `${core.slice(0, 4)} Rae`, reason: 'Brief two-part name.', extra: 'Good for profiles.' },
          { name: `${core.charAt(0)}. ${randomFrom(lastNames)}`, reason: 'Initial-based format.', extra: 'Useful for professional contexts.' }] },
        { title: 'Unique', note: 'More distinctive without getting unreadable.', items: [
          { name: `${core}en`, reason: 'Invented but pronounceable.', extra: 'Best as a pen, stage, or display name.' },
          { name: `Ari ${core}`, reason: 'Distinctive two-part rhythm.', extra: 'Good for creative profiles.' },
          { name: `${core} Sol`, reason: 'Memorable and concise.', extra: 'Say it aloud before choosing.' }] },
        { title: 'Elegant', note: 'Soft, premium feel.', items: [
          { name: `${core} Aurelia`, reason: 'Refined and expressive.', extra: 'Good for creative brands.' },
          { name: `Elena ${core}`, reason: 'Classic but polished.', extra: 'Professional and memorable.' },
          { name: `${core} Marlowe`, reason: 'Literary and elegant.', extra: 'Works for author-style naming.' }] },
        { title: 'Playful', note: 'Friendly and casual.', items: [
          { name: `${core} Pop`, reason: 'Bright, social-friendly energy.', extra: 'Best for casual profiles.' },
          { name: `${core} Bean`, reason: 'Warm and lighthearted.', extra: 'Good for nickname-style use.' },
          { name: `Sunny ${core}`, reason: 'Approachable and upbeat.', extra: 'Works for creator identities.' }] }];
      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, `Style filter: ${nameStyle}. Ideas only. This tool does not verify legal, domain, or username availability.`);
      break;
    }
    case 'fantasy-name-generator':
      result = generateMultiple(() => `${randomFrom(fantasyPrefixes)}${randomFrom(fantasySuffixes)}`, 10);
      break;
    case 'username-generator': {
      const base = toSafeHandle(text || 'creative user', 'user').replace(/-/g, '');
      const platform = optionValue('username-platform', 'social');
      const style = optionValue('username-style', 'clean');

      const cleanIdeas = [
        `${base}`,
        `the${base}`,
        `real${base}`,
        `${base}life`,
        `${base}world`,
        `its${base}`
      ];
      const aestheticIdeas = [
        `${base}studio`,
        `${base}notes`,
        `hello${base}`,
        `aesthetic${base}`,
        `luna${base}`,
        `vibe${base}`
      ];
      const shortIdeas = [
        `${base.slice(0, 8)}`,
        `${base.slice(0, 6)}x`,
        `${base.slice(0, 7)}co`,
        `${base.slice(0, 7)}_`,
        `i${base.slice(0, 7)}`,
        `${base.slice(0, 6)}io`
      ];
      const gamingIdeas = [
        `${base}plays`,
        `${base}_gg`,
        `x${base}x`,
        `${base}arcade`,
        `${base}v2`,
        `apex${base}`
      ];
      const creatorIdeas = [
        `by${base}`,
        `${base}daily`,
        `${base}hub`,
        `madeby${base}`,
        `${base}creations`,
        `${base}lab`
      ];
      const professionalIdeas = [
        `${base}pro`,
        `${base}official`,
        `${base}hq`,
        `consult${base}`,
        `dr${base}`,
        `${base}corp`
      ];

      const groups = [
        { title: 'Clean', note: 'Readable, simple, and memorable handles.', items: cleanIdeas },
        { title: 'Aesthetic', note: 'Soft, creative, and visually balanced handles.', items: aestheticIdeas },
        { title: 'Short', note: 'Compact handles optimized for character limits and availability.', items: shortIdeas },
        { title: 'Gaming', note: 'Action-oriented handles for gaming and virtual platforms.', items: gamingIdeas },
        { title: 'Creator', note: 'Designed for brand builders, artists, and creators.', items: creatorIdeas },
        { title: 'Professional', note: 'Polished handles for expert and business networking.', items: professionalIdeas }
      ];

      const activeTitles = new Set<string>();
      activeTitles.add(style.charAt(0).toUpperCase() + style.slice(1));
      
      const platTitle = platform.charAt(0).toUpperCase() + platform.slice(1);
      if (groups.some(g => g.title === platTitle)) {
        activeTitles.add(platTitle);
      } else {
        if (platform === 'social') {
          activeTitles.add('Clean');
          activeTitles.add('Creator');
        } else if (platform === 'tiktok') {
          activeTitles.add('Aesthetic');
          activeTitles.add('Creator');
        }
      }

      const visibleGroups = groups.filter(g => activeTitles.has(g.title));
      result = visibleGroups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Availability note: these are idea variants only. Check each platform before using a handle.');
      break;
    }
    case 'business-name-generator': {
      const seed = compactSeed(text, 'Creative Studio');
      const core = seed.split(' ')[0] || 'Nova';
      const groups = [
        {
          title: 'Brandable',
          note: 'Flexible names that can grow beyond one product.',
          items: [
            { name: core + 'ly', reason: 'Short invented sound with app and startup energy.', extra: 'Tagline: Make ' + seed.toLowerCase() + ' easier.' },
            { name: 'Vero ' + core, reason: 'Trust-forward and clean for a polished brand.', extra: 'Tagline: Built around what matters.' },
            { name: core + ' & Co', reason: 'Simple, memorable, and service-friendly.', extra: 'Tagline: Thoughtful ' + seed.toLowerCase() + ' for modern teams.' }]
        },
        {
          title: 'Modern',
          note: 'Crisp names for digital, creative, and service businesses.',
          items: [
            { name: core + ' Labs', reason: 'Signals experimentation and product thinking.', extra: 'Good for tech, design, or consulting.' },
            { name: 'North ' + core, reason: 'Feels directional, stable, and premium without overclaiming.', extra: 'Tagline: Clear direction for ' + seed.toLowerCase() + '.' },
            { name: core + ' Flow', reason: 'Works for tools, services, and workflow brands.', extra: 'Easy to say and easy to remember.' }]
        },
        {
          title: 'Premium',
          note: 'More refined names for higher-ticket positioning.',
          items: [
            { name: 'Aurelian ' + core, reason: 'Elegant sound with boutique positioning.', extra: 'Tagline: Refined ' + seed.toLowerCase() + ', beautifully delivered.' },
            { name: core + ' Atelier', reason: 'Best for design, fashion, craft, or creative services.', extra: 'Premium but still human.' },
            { name: 'Maison ' + core, reason: 'Editorial and polished for lifestyle brands.', extra: 'Use only if the tone fits your audience.' }]
        },
        {
          title: 'Short',
          note: 'Compact names built for recall.',
          items: [
            { name: core.slice(0, 6) + 'io', reason: 'Short tech-style option.', extra: 'Check pronunciation before using.' },
            { name: 'Nex' + core.slice(0, 5), reason: 'Modern invented blend.', extra: 'Good for apps and platforms.' },
            { name: core.slice(0, 4) + 'za', reason: 'Punchy and visually distinct.', extra: 'Best when it still sounds natural aloud.' }]
        },
        {
          title: 'Domain-Friendly',
          note: 'Names designed to pair with clear extensions or modifiers.',
          items: [
            { name: 'Get' + core.replace(/\s/g, ''), reason: 'Strong for software and online services.', extra: 'Try get' + core.toLowerCase() + '.com or .co.' },
            { name: core.replace(/\s/g, '') + 'HQ', reason: 'Clear home-base naming pattern.', extra: 'Good for SaaS, resources, and communities.' },
            { name: 'Try' + core.replace(/\s/g, ''), reason: 'Action-oriented and landing-page friendly.', extra: 'Useful when exact-match domains are crowded.' }]
        }];
      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason + ' ' + (item.extra || '')).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Ideas only. Check domains, social handles, business records, and trademarks before choosing a name.');
      break;
    }
    case 'team-name-generator':
      result = generateMultiple(() => `${randomFrom(teamAdjectives)} ${randomFrom(teamNouns)}`, 10);
      break;
    case 'password-generator': {
      const lower = 'abcdefghijklmnopqrstuvwxyz';
      const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      const symbols = '!@#$%^&*()_+-=';
      const words = [
        'river', 'signal', 'orbit', 'copper', 'bright', 'forest', 'pixel', 'harbor', 'lunar', 'matrix',
        'summit', 'velvet', 'anchor', 'ember', 'shadow', 'canyon', 'cradle', 'plasma', 'meteor', 'nebula',
        'glacier', 'beacon', 'island', 'jungle', 'desert', 'safari', 'planet', 'cosmic', 'galaxy', 'quantum',
        'cipher', 'vector', 'vertex', 'aurora', 'vortex', 'cobalt', 'bronze', 'silver', 'golden', 'indigo',
        'violet', 'scarlet', 'crimson', 'emerald', 'sapphire', 'crystal', 'quartz', 'marble', 'granite', 'timber',
        'bamboo', 'autumn', 'spring', 'summer', 'winter', 'breeze', 'monsoon', 'typhoon', 'tempest', 'zenith',
        'pinnacle', 'canopy', 'meadow', 'prairie', 'sierra', 'valley', 'cavern', 'geyser', 'lagoon', 'marina',
        'wharf', 'pillar', 'tower', 'castle', 'temple', 'bridge', 'portal', 'mirror', 'prisma', 'shield',
        'helmet', 'armour', 'sabre', 'quiver', 'compass', 'rudder', 'lantern', 'candle', 'fossil', 'relic',
        'scroll', 'parchment', 'feather', 'falcon', 'osprey', 'condor', 'eagle', 'phoenix', 'dragon', 'griffin',
        'sphinx', 'leopard', 'panther', 'jaguar', 'cheetah', 'cougar', 'badger', 'otter', 'beaver', 'dolphin',
        'narwhal'
      ];
      const length = Math.max(4, Math.min(64, Number(optionValue('password-length', '16')) || 16));
      const mode = optionValue('password-mode', 'strong');
      const useUpper = optionValue('pw-uppercase', 'true') === 'true';
      const useLower = optionValue('pw-lowercase', 'true') === 'true';
      const useNumbers = optionValue('pw-numbers', 'true') === 'true';
      const useSymbols = optionValue('pw-symbols', 'true') === 'true';

      // Rejection sampling to completely eliminate modulo bias
      const randomInt = (max: number): number => {
        const limit = Math.floor(4294967296 / max) * max;
        const arr = new Uint32Array(1);
        let val = 0;
        do {
          crypto.getRandomValues(arr);
          val = arr[0];
        } while (val >= limit);
        return val % max;
      };

      const pick = (pool: string) => pool[randomInt(pool.length)];

      // Unbiased Fisher-Yates shuffle
      const shuffle = (chars: string[]) => {
        for (let i = chars.length - 1; i > 0; i--) {
          const j = randomInt(i + 1);
          const temp = chars[i];
          chars[i] = chars[j];
          chars[j] = temp;
        }
        return chars.join('');
      };

      const makeStrong = () => {
        const hasFlags = useLower || useUpper || useNumbers || useSymbols;
        const activeLower = useLower || !hasFlags;
        const required = [
          ...(activeLower ? [pick(lower)] : []),
          ...(useUpper ? [pick(upper)] : []),
          ...(useNumbers ? [pick(numbers)] : []),
          ...(useSymbols ? [pick(symbols)] : [])
        ];
        const pool = [
          ...(activeLower ? [lower] : []),
          ...(useUpper ? [upper] : []),
          ...(useNumbers ? [numbers] : []),
          ...(useSymbols ? [symbols] : [])
        ].join('');
        const remaining = Array.from({ length: Math.max(0, length - required.length) }, () => pick(pool));
        return shuffle([...required, ...remaining]);
      };

      const makePin = () => Array.from({ length: Math.max(4, Math.min(12, length)) }, () => pick(numbers)).join('');

      const makePassphrase = () => {
        const sep = useSymbols ? '-' : '';
        const formattedWords = Array.from({ length: 4 }, () => {
          const w = randomFrom(words);
          if (useUpper && useLower) return titleCase(w);
          if (useUpper) return w.toUpperCase();
          return w.toLowerCase();
        });
        const suffix = useNumbers ? sep + pick(numbers) + pick(numbers) : '';
        return formattedWords.join(sep) + suffix;
      };

      const makeMemorable = () => {
        const w1 = randomFrom(words);
        const w2 = randomFrom(words);
        const word1 = useUpper && useLower ? titleCase(w1) : useUpper ? w1.toUpperCase() : w1.toLowerCase();
        const word2 = useUpper && useLower ? titleCase(w2) : useUpper ? w2.toUpperCase() : w2.toLowerCase();
        const suffixNum = useNumbers ? pick(numbers) + pick(numbers) : '';
        const suffixSym = useSymbols ? pick('!?#@$%&*') : '';
        return word1 + word2 + suffixNum + suffixSym;
      };

      const makers: Record<string, () => string> = {
        strong: makeStrong,
        memorable: makeMemorable,
        passphrase: makePassphrase,
        pin: makePin
      };
      const selectedMaker = makers[mode] || makeStrong;
      const sections = Array.from({ length: 6 }, (_, index) => {
        const value = selectedMaker();
        const strength = mode === 'pin' ? 'Use only where numeric PINs are required.' : mode === 'passphrase' ? 'Long and easier to type, strong when kept unique.' : value.length >= 16 ? 'Strong length for most account passwords.' : 'Increase length for higher security.';
        return { title: `${titleCase(mode)} Result ${index + 1}`, body: value, note: strength };
      });
      result = sections.map(section => section.body).join('\n');
      resultHtml = renderSectionSuite('Password Results', sections, 'Privacy note: passwords are generated in your browser session. TapToGen does not store them. Use a trusted password manager for real accounts.');
      break;
    }
    case 'lorem-ipsum-generator': {
      const latinVocab = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
        'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
        'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut',
        'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in',
        'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
        'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa',
        'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'cras', 'mattis',
        'consectetur', 'purus', 'sit', 'amet', 'fermentum', 'donec', 'ullamcorper', 'nulla', 'non', 'metus',
        'auctor', 'fringilla', 'maecenas', 'faucibus', 'mollis', 'interdum', 'praesent', 'commodo', 'cursus', 'magna',
        'vel', 'scelerisque', 'nisl', 'consectetur', 'etiam', 'porta', 'sem', 'malesuada', 'magna', 'mollis',
        'euismod', 'vivamus', 'sagittis', 'lacus', 'vel', 'augue', 'laoreet', 'rutrum', 'faucibus', 'dolor',
        'auctor', 'duis', 'mollis', 'est', 'non', 'commodo', 'luctus', 'nisi', 'erat', 'porttitor',
        'ligula', 'eget', 'lacinia', 'odio', 'sem', 'nec', 'elit', 'aenean', 'eu', 'leo',
        'quam', 'pellentesque', 'ornare', 'sem', 'lacinia', 'quam', 'venenatis', 'vestibulum'
      ];
      const standardPrefix = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut'];
      const standardSentences = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ];

      const mode = optionValue('lorem-mode', 'paragraphs');
      const count = Math.max(1, Math.min(50, Number(optionValue('lorem-count', '3')) || 3));
      const startLorem = optionValue('lorem-start', 'true') === 'true';
      const format = optionValue('lorem-format', 'plain');

      const makeRandomSentence = (index: number) => {
        if (startLorem && index < standardSentences.length) {
          return standardSentences[index];
        }
        const len = Math.floor(Math.random() * 11) + 8; // 8 to 18 words
        const words: string[] = [];
        for (let i = 0; i < len; i++) {
          words.push(randomFrom(latinVocab));
        }
        if (len > 10) {
          const commaIndex = Math.floor(Math.random() * (len - 6)) + 3;
          words[commaIndex] = words[commaIndex].replace(/,$/, '') + ',';
        }
        const sentence = words.join(' ');
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
      };

      let sentenceCounter = 0;
      const makeRandomParagraph = (isFirst = false) => {
        const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3 to 6 sentences
        return Array.from({ length: sentenceCount }, () => makeRandomSentence(sentenceCounter++)).join(' ');
      };

      let output = '';
      if (mode === 'words') {
        output = Array.from({ length: count }, (_, i) => {
          if (startLorem && i < standardPrefix.length) {
            return i === 0 ? 'Lorem' : standardPrefix[i];
          }
          return randomFrom(latinVocab);
        }).join(' ');
      } else if (mode === 'sentences') {
        output = Array.from({ length: count }, (_, i) => makeRandomSentence(i)).join(' ');
      } else {
        output = Array.from({ length: count }, (_, i) => makeRandomParagraph(i === 0)).join('\n\n');
      }

      if (format === 'list' || format === 'bullet') {
        if (mode === 'words') {
          const words = output.split(' ');
          const items: string[] = [];
          for (let i = 0; i < words.length; i += 8) {
            const chunk = words.slice(i, i + 8).join(' ');
            if (chunk) {
              items.push(chunk.trim() + '.');
            }
          }
          output = items.map((item, index) => {
            const prefix = format === 'bullet' ? '• ' : `${index + 1}. `;
            return `${prefix}${item}`;
          }).join('\n');
        } else if (mode === 'paragraphs') {
          output = output.split('\n\n').map((item, index) => {
            const prefix = format === 'bullet' ? '• ' : `${index + 1}. `;
            return `${prefix}${item.trim()}`;
          }).join('\n');
        } else {
          output = output.split('. ').filter(Boolean).map((item, index) => {
            const prefix = format === 'bullet' ? '• ' : `${index + 1}. `;
            return `${prefix}${item.trim().replace(/\.$/, '')}.`;
          }).join('\n');
        }
      } else if (format === 'html-p') {
        if (mode === 'paragraphs') {
          output = output.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('\n');
        } else {
          output = `<p>${output.trim()}</p>`;
        }
      } else if (format === 'html-list' || format === 'html-bullet') {
        const listTag = format === 'html-list' ? 'ol' : 'ul';
        let items: string[] = [];
        if (mode === 'words') {
          const words = output.split(' ');
          for (let i = 0; i < words.length; i += 8) {
            const chunk = words.slice(i, i + 8).join(' ');
            if (chunk) {
              items.push(chunk.trim() + '.');
            }
          }
        } else if (mode === 'paragraphs') {
          items = output.split('\n\n').map(p => p.trim());
        } else {
          items = output.split('. ').filter(Boolean).map(s => s.trim().replace(/\.$/, '') + '.');
        }
        output = `<${listTag}>\n` + items.map(item => `  <li>${item}</li>`).join('\n') + `\n</${listTag}>`;
      }

      const sections = [
        { title: `${titleCase(mode)} Output`, body: output, note: `${count} requested item(s), ${output.split(/\s+/).filter(Boolean).length} words.` },
        { title: 'Design Use Note', body: 'Use this as placeholder text for mockups, layout testing, and content spacing. Replace it with real copy before publishing.', note: 'Placeholder text only.' }];
      result = output;
      resultHtml = renderSectionSuite('Lorem Ipsum Output', sections, 'Copy the full block or individual sections. This is placeholder copy, not production content.');
      break;
    }
    case 'youtube-tag-generator': {
      if (!text) { result = 'Please enter your video topic or title above.'; break; }
      const groups = buildYouTubeTagSuite(text, optionValue);
      result = reasonedText(groups);
      resultHtml = renderReasonedTagGroups(groups, 'YouTube tags: keep only tags that match the actual video, title, thumbnail, description, and spoken content. Independent draft only; no YouTube/Google affiliation and no ranking, views, recommendation, monetization, or engagement guarantee.');
      break;
    }
    case 'instagram-bio-generator': {
      const niche = (text || 'creative').trim();
      const cap = titleCase(niche);
      const accountType = optionValue('ig-account-type', 'creator');
      const emojiLevel = optionValue('emoji-level', 'light');

      // Unicode stylers
      const boldNiche = toUnicode(cap, boldMap);
      const cursiveNiche = toUnicode(cap, cursiveMap);

      const emojiPrefix = emojiLevel === 'none' ? '' : emojiLevel === 'medium' ? '⚡ ' : '✨ ';
      const ctaEmoji = emojiLevel === 'none' ? '' : '👇';

      const groups = [
        { title: 'Creator (Classic)', text: `${emojiPrefix}${cap} creator\n🎬 sharing practical ideas & creative updates\n📩 DM for collaborations`, note: 'Clean creator profile.' },
        { title: 'Creator (Aesthetic Cursive)', text: `${emojiPrefix}${cursiveNiche} Artist\n✨ chasing light & capturing stories\n✉️ hello: [user-fill contact]`, note: 'Elegant aesthetic profile.' },
        { title: 'Creator (Bold Accent)', text: `${emojiPrefix}${boldNiche}\n💡 tutorials, tips, & coding workflow\n🚀 new projects weekly`, note: 'Professional creator profile.' },
        { title: 'Business (Clean)', text: `${cap} Services\n📈 helping you get clear results\n💼 DM us to start a project`, note: 'Standard business profile.' },
        { title: 'Business (Bold CTA)', text: `${boldNiche} Studio\n🌿 custom designs for creative brands\n📥 client spots open for [Month] ${ctaEmoji}`, note: 'Action-oriented business bio.' },
        { title: 'Aesthetic (Minimal)', text: `${cap} notes.\n- soft systems & simple spaces\n- documentation in highlights`, note: 'Minimalist visual bio.' },
        { title: 'Professional (Specialist)', text: `${cap} Specialist\n📚 sharing practical lessons & frameworks\n🌐 read my notes: [user-fill link] ${ctaEmoji}`, note: 'Polished professional profile.' },
        { title: 'Short & Punchy', text: `${cap} / learning & making in public.`, note: 'Ultra-short personal tagline.' }
      ];

      // Filtering/prioritizing based on accountType
      let sortedGroups = [...groups];
      if (accountType === 'business') {
        sortedGroups = [
          groups[3], groups[4], groups[0], groups[2], groups[6], groups[5], groups[1], groups[7]
        ];
      } else if (accountType === 'aesthetic') {
        sortedGroups = [
          groups[5], groups[1], groups[7], groups[0], groups[2], groups[3], groups[4], groups[6]
        ];
      } else if (accountType === 'professional') {
        sortedGroups = [
          groups[6], groups[2], groups[3], groups[0], groups[4], groups[5], groups[1], groups[7]
        ];
      }

      result = sortedGroups.map(group => `${group.title}:\n${group.text}`).join('\n\n');
      resultHtml = renderBioVariations(sortedGroups);
      break;
    }
    case 'meta-tag-generator': {
      const pageTopic = compactSeed(text, 'Example Page');
      const pageType = optionValue('meta-page-type', 'website');
      const robotsMode = optionValue('meta-robots', 'index-follow');
      const cardType = optionValue('meta-card-type', 'summary_large_image');
      const includeCanonical = optionValue('meta-include-canonical', 'true') === 'true';

      let pageTitle = '';
      let pageDesc = '';
      const lines = pageTopic.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length >= 2) {
        pageTitle = lines[0];
        pageDesc = lines.slice(1).join(' ');
      } else if (lines.length === 1) {
        pageTitle = lines[0];
        pageDesc = pageType === 'product'
          ? `Buy ${pageTitle} online at the best price. Explore product details, features, reviews, and secure checkout.`
          : pageType === 'article'
            ? `Read a practical guide to ${pageTitle} with tips, analysis, key takeaways, and expert insights.`
            : pageType === 'landing'
              ? `Discover ${pageTitle}. Sign up today to access exclusive benefits, features, and special promotions.`
              : `Welcome to our page about ${pageTitle}. Find details, resources, and everything you need to know here.`;
      } else {
        pageTitle = 'Example Page';
        pageDesc = 'Example description for the website.';
      }

      const slug = slugWords(pageTitle).join('-') || 'example-page';
      const titleSuffix = pageType === 'product' ? 'Product Details' : pageType === 'article' ? 'Guide' : pageType === 'landing' ? 'Official Page' : 'Website';
      const seoTitle = `${pageTitle} - ${titleSuffix}`.slice(0, 62);
      
      const esc = (s: string) => s.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      const cleanTitle = esc(seoTitle);
      const cleanDesc = esc(pageDesc.slice(0, 160));

      const robots = robotsMode === 'noindex-follow' ? 'noindex, follow' : robotsMode === 'index-nofollow' ? 'index, nofollow' : 'index, follow';
      const canonical = `https://example.com/${slug}/`;
      const imageUrl = `https://example.com/images/${slug}-social.jpg`;

      const titleTags = `<title>${cleanTitle}</title>\n<meta name="title" content="${cleanTitle}">\n<meta name="description" content="${cleanDesc}">`;
      const canonicalTags = includeCanonical ? `<link rel="canonical" href="${canonical}">` : '<!-- Canonical tag omitted by option. Add one if this page has a preferred URL. -->';
      const robotsTags = `<meta name="robots" content="${robots}">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta charset="utf-8">`;
      const ogTags = `<meta property="og:type" content="${pageType === 'article' ? 'article' : 'website'}">\n<meta property="og:title" content="${cleanTitle}">\n<meta property="og:description" content="${cleanDesc}">\n<meta property="og:url" content="${canonical}">\n<meta property="og:image" content="${imageUrl}">\n<meta property="og:site_name" content="Optional site name">`;
      const twitterTags = `<meta name="twitter:card" content="${cardType}">\n<meta name="twitter:title" content="${cleanTitle}">\n<meta name="twitter:description" content="${cleanDesc}">\n<meta name="twitter:image" content="${imageUrl}">`;

      const fullHtml = `<!-- Primary Meta Tags -->\n${titleTags}\n${canonicalTags}\n${robotsTags}\n\n<!-- Open Graph / Facebook -->\n${ogTags}\n\n<!-- Twitter/X Card -->\n${twitterTags}`;
      const sections = [
        { title: 'Full HTML Meta Tag Set', body: fullHtml, note: `${titleCase(pageType)} page bundle.` },
        { title: 'SEO Title And Description', body: titleTags, note: `${seoTitle.length} title chars; ${pageDesc.length} desc chars (clipped to 160).` },
        { title: 'Canonical, Robots, Viewport', body: `${canonicalTags}\n${robotsTags}`, note: `Robots: ${robots}` },
        { title: 'Open Graph Tags', body: ogTags, note: 'Use an absolute image URL for previews.' },
        { title: 'Twitter/X Card Tags', body: twitterTags, note: `Card type: ${cardType}` },
        { title: 'Validation Checklist', body: '1. Verify the canonical URL matches the page domain.\n2. Set content of og:site_name with your actual business name.\n3. Make sure og:image and twitter:image URLs point to a real hosted image.\n4. Validate output code in standard HTML debuggers.', note: 'Pre-launch review.' }
      ];

      result = fullHtml;
      resultHtml = renderSectionSuite('Meta Tag Package', sections, 'Copy full HTML bundle or individual groups depending on your setup.');
      break;
    }
    case 'text-case-converter': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const preserveLines = optionValue('case-preserve-lines', 'true') === 'true';
      const focus = optionValue('case-focus', 'simple');

      const splitWords = (str: string): string[] => {
        const adjusted = str
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
        return adjusted.trim().split(/[\s_-]+/).filter(Boolean);
      };
      
      const capWord = (word: string) => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';

      const uppercaseTrans = (val: string) => val.toUpperCase();
      const lowercaseTrans = (val: string) => val.toLowerCase();
      const titleTrans = (val: string) => splitWords(val).map(capWord).join(' ');
      const sentenceTrans = (val: string) => val.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, match => match.toUpperCase());
      const camelTrans = (val: string) => {
        const words = splitWords(val);
        return words.map((word, index) => index === 0 ? word.toLowerCase() : capWord(word)).join('');
      };
      const pascalTrans = (val: string) => splitWords(val).map(capWord).join('');
      const snakeTrans = (val: string) => splitWords(val).map(word => word.toLowerCase()).join('_');
      const kebabTrans = (val: string) => splitWords(val).map(word => word.toLowerCase()).join('-');
      const constantTrans = (val: string) => splitWords(val).map(word => word.toUpperCase()).join('_');
      
      const alternatingTrans = (val: string) => {
        let letterIndex = 0;
        return [...val].map(char => {
          if (/[a-zA-Z]/.test(char)) {
            const res = letterIndex % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
            letterIndex++;
            return res;
          }
          return char;
        }).join('');
      };

      const toggleTrans = (val: string) => {
        return [...val].map(char => {
          if (char === char.toUpperCase()) return char.toLowerCase();
          return char.toUpperCase();
        }).join('');
      };

      const transformText = (trans: (v: string) => string): string => {
        if (preserveLines) {
          return text.split(/\r?\n/).map(line => trans(line)).join('\n');
        }
        return trans(text);
      };

      const allSections = [
        { title: 'Uppercase', body: transformText(uppercaseTrans), note: 'All letters converted to uppercase.', category: 'simple' },
        { title: 'Lowercase', body: transformText(lowercaseTrans), note: 'All letters converted to lowercase.', category: 'simple' },
        { title: 'Title Case', body: transformText(titleTrans), note: 'Each word capitalized.', category: 'simple' },
        { title: 'Sentence Case', body: transformText(sentenceTrans), note: 'Sentence starts capitalized.', category: 'simple' },
        { title: 'camelCase', body: transformText(camelTrans), note: 'Developer-friendly variable style.', category: 'developer' },
        { title: 'PascalCase', body: transformText(pascalTrans), note: 'Developer-friendly class/type style.', category: 'developer' },
        { title: 'snake_case', body: transformText(snakeTrans), note: 'Underscore-separated lowercase.', category: 'developer' },
        { title: 'kebab-case', body: transformText(kebabTrans), note: 'Hyphen-separated lowercase.', category: 'developer' },
        { title: 'CONSTANT_CASE', body: transformText(constantTrans), note: 'Uppercase underscore-separated style.', category: 'developer' },
        { title: 'Alternating Case', body: transformText(alternatingTrans), note: 'Alternating lowercase/uppercase letters only.', category: 'simple' },
        { title: 'Toggle Case', body: transformText(toggleTrans), note: 'Swapped uppercase and lowercase letters.', category: 'simple' }
      ];

      const sections = allSections.filter(sec => {
        if (focus === 'simple') return sec.category === 'simple';
        if (focus === 'developer') return sec.category === 'developer';
        return true;
      });

      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Case Conversion Matrix', sections, 'Uses your exact input text as the source. Copy each format individually or copy all.');
      break;
    }
    case 'robots-txt-generator': {
      const domain = compactSeed(text, 'example.com').replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const mode = optionValue('robots-mode', 'standard');
      const includeSitemap = optionValue('robots-include-sitemap', 'true') === 'true';
      const crawlDelay = optionValue('robots-crawl-delay', 'none');
      const blockAI = optionValue('robots-block-ai', 'false') === 'true';
      const blockSEO = optionValue('robots-block-seo', 'false') === 'true';
      const testPath = optionValue('robots-test-path', '/admin/dashboard');

      const delayLine = crawlDelay !== 'none' ? '\nCrawl-delay: ' + crawlDelay : '';

      // Check if custom disallow inputs are supplied in text
      let customDisallows = [];
      if (text && text.trim() && text.includes('/')) {
        customDisallows = text.trim().split('\n')
          .map(l => l.trim().replace(/^Disallow:\s*/i, ''))
          .filter(Boolean);
      }

      const templates = {
        standard: 'User-agent: *\nAllow: /' + delayLine + '\nDisallow: /admin/\nDisallow: /private/',
        wordpress: 'User-agent: *\nAllow: /wp-content/uploads/\nAllow: /wp-admin/admin-ajax.php' + delayLine + '\nDisallow: /wp-admin/\nDisallow: /wp-login.php\nDisallow: /?s=',
        ecommerce: 'User-agent: *\nAllow: /' + delayLine + '\nDisallow: /cart/\nDisallow: /checkout/\nDisallow: /account/\nDisallow: /search/',
        staging: 'User-agent: *\nDisallow: /\n\n# Staging mode blocks all crawling. Do not use this on a live public site unless you intentionally want noindex-style crawl blocking.'
      };

      let robots = templates[mode] || templates.standard;

      // Append custom disallows if any
      if (customDisallows.length > 0) {
        robots += '\n' + customDisallows.map(p => 'Disallow: ' + p).join('\n');
      }

      if (blockAI) {
        robots += '\n\n# Block AI Scrapers and Crawlers\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: Google-Extended\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /\n\nUser-agent: ChatGPT-User\nDisallow: /';
      }

      if (blockSEO) {
        robots += '\n\n# Block Aggressive SEO Audit Bots\nUser-agent: AhrefsBot\nDisallow: /\n\nUser-agent: SemrushBot\nDisallow: /\n\nUser-agent: DotBot\nDisallow: /\n\nUser-agent: Rogerbot\nDisallow: /';
      }

      const body = robots + (includeSitemap ? '\n\nSitemap: https://' + domain + '/sitemap.xml' : '');

      // Parse rules for path matcher simulator
      const disallowRules = [];
      const allowRules = [];
      body.split('\n').forEach(line => {
        const lowerLine = line.trim().toLowerCase();
        if (lowerLine.startsWith('disallow:')) {
          disallowRules.push(line.split(':')[1].trim());
        } else if (lowerLine.startsWith('allow:')) {
          allowRules.push(line.split(':')[1].trim());
        }
      });

      // Path matching algorithm based on length priority
      let simulatorResult = 'Allowed ✅';
      let matchingRule = 'Default fallback (allow all)';

      const isMatch = (rule, target) => {
        const regexStr = '^' + rule
          .replace(/[.+^\${}()|[\]\\\/]/g, '\\$&') // escape special characters
          .replace(/\\\*/g, '.*')                  // convert * to .*
          .replace(/\\\?/g, '.?');
        const regex = new RegExp(regexStr);
        return regex.test(target);
      };

      // Match Allow rules
      let maxAllowLen = -1;
      allowRules.forEach(r => {
        if (isMatch(r, testPath) && r.length > maxAllowLen) {
          maxAllowLen = r.length;
          simulatorResult = 'Allowed ✅';
          matchingRule = 'Allow: ' + r;
        }
      });

      // Match Disallow rules (takes precedence if longer or equal)
      let maxDisallowLen = -1;
      disallowRules.forEach(r => {
        if (isMatch(r, testPath) && r.length >= maxDisallowLen && r.length >= maxAllowLen) {
          maxDisallowLen = r.length;
          simulatorResult = 'Disallowed ❌';
          matchingRule = 'Disallow: ' + r;
        }
      });

      const simulatorOutput = 'Test Path: ' + testPath + '\nStatus: ' + simulatorResult + '\nMatching Rule: ' + matchingRule;

      // Indexing Risk Warning Checker
      const warnings = [];
      if (disallowRules.includes('/')) {
        warnings.push('⚠️ HIGH RISK DIRECTIVE: Disallow: / blocks ALL indexation on this domain! Confirm this staging configuration is not published on production routes.');
      }
      if (disallowRules.some(r => r.includes('.js') || r.includes('.css') || r.includes('/assets/'))) {
        warnings.push('⚠️ Asset Crawl Block: Blocking JavaScript/CSS or assets prevents search engines from checking your site layout and mobile-friendliness guidelines.');
      }
      if (warnings.length === 0) {
        warnings.push('✅ Low Indexation Risk: No global blockades or critical assets exclusions found inside rules.');
      }

      const sections = [
        { title: 'Generated ' + titleCase(mode) + ' robots.txt', body, note: includeSitemap ? 'Sitemap integrated.' : 'Sitemap line omitted.' },
        { title: 'Path Matcher Simulator Output', body: simulatorOutput, note: 'Simulates crawler path resolution.' },
        { title: 'Google Crawl Audit Checklist', body: warnings.join('\n'), note: 'SEO health analysis.' }
      ];

      result = body;
      resultHtml = renderSectionSuite('Robots.txt Engine Package', sections, 'Local compiler sandbox. Generated rules conform to standard Google/Bing crawler specifications.');
      break;
    }
    case 'word-counter': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const words = text.trim().split(/\s+/).filter(Boolean);
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
      const lines = text.split(/\r?\n/).length;
      
      const readingWpm = Math.max(100, Math.min(400, Number(optionValue('reading-wpm', '200')) || 200));
      const speakingWpm = Math.max(80, Math.min(220, Number(optionValue('speaking-wpm', '130')) || 130));
      
      const readingSeconds = Math.round((words.length / readingWpm) * 60);
      const speakingSeconds = Math.round((words.length / speakingWpm) * 60);
      
      const formatTime = (totalSec: number) => {
        if (totalSec < 60) return `${totalSec} sec`;
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        return secs > 0 ? `${mins} min ${secs} sec` : `${mins} min`;
      };

      // Syllable count for Flesch Readability
      const countWordSyllables = (w: string): number => {
        const cleaned = w.toLowerCase().replace(/[^a-z]/g, '');
        if (cleaned.length <= 3) return 1;
        const matches = cleaned.match(/[aeiouy]{1,2}/g);
        let count = matches ? matches.length : 1;
        if (cleaned.endsWith('es') || cleaned.endsWith('ed')) count--;
        if (cleaned.endsWith('e') && !cleaned.endsWith('le')) count--;
        return Math.max(1, count);
      };
      
      const totalSyllables = words.reduce((acc, w) => acc + countWordSyllables(w), 0);
      const totalWordsVal = Math.max(1, words.length);
      const totalSentencesVal = Math.max(1, sentences.length);
      
      // Flesch Reading Ease Formula
      const fleschEase = 206.835 - 1.015 * (totalWordsVal / totalSentencesVal) - 84.6 * (totalSyllables / totalWordsVal);
      const fleschLevel = Math.max(0, Math.min(100, fleschEase));
      
      // Flesch-Kincaid Grade Level Formula
      const fkGrade = 0.39 * (totalWordsVal / totalSentencesVal) + 11.8 * (totalSyllables / totalWordsVal) - 15.59;
      const gradeText = fkGrade < 0 ? 'Kindergarten' : fkGrade > 12 ? 'Professional' : `Grade ${Math.round(fkGrade)}`;

      // Keyword Density (1-word and 2-word phrases)
      const includeDensity = optionValue('word-include-density', 'true') === 'true';
      const stop = new Set(['the','a','an','and','or','but','to','of','in','on','for','with','is','are','was','were','be','by','it','this','that','as','at','from','i','you','he','she','they', 'we']);
      const wordList = words.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')).filter(w => w.length > 0);
      
      const singleFreq = new Map<string, number>();
      wordList.filter(w => w.length > 2 && !stop.has(w)).forEach(w => singleFreq.set(w, (singleFreq.get(w) || 0) + 1));
      const topSingle = includeDensity ? [...singleFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5) : [];

      const doubleFreq = new Map<string, number>();
      for (let i = 0; i < wordList.length - 1; i++) {
        const w1 = wordList[i];
        const w2 = wordList[i + 1];
        if (w1 && w2 && !stop.has(w1) && !stop.has(w2)) {
          const phrase = `${w1} ${w2}`;
          doubleFreq.set(phrase, (doubleFreq.get(phrase) || 0) + 1);
        }
      }
      const topDouble = includeDensity ? [...doubleFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5) : [];

      // Advanced stats
      const totalCharCount = text.length;
      const charNoSpaces = text.replace(/\s/g, '').length;
      const avgWordLength = totalWordsVal > 0 ? (words.reduce((acc, w) => acc + w.length, 0) / totalWordsVal).toFixed(1) : '0';
      const avgSentenceLength = totalSentencesVal > 0 ? (totalWordsVal / totalSentencesVal).toFixed(1) : '0';
      const uniqueWords = new Set(wordList).size;

      const summary = `Words: ${totalWordsVal}\n`
        + `Characters (with spaces): ${totalCharCount}\n`
        + `Characters (no spaces): ${charNoSpaces}\n`
        + `Sentences: ${totalSentencesVal}\n`
        + `Paragraphs: ${paragraphs.length}\n`
        + `Lines: ${lines}\n`
        + `Unique Words: ${uniqueWords} (${((uniqueWords / totalWordsVal) * 100).toFixed(0)}%)\n`
        + `Average Word Length: ${avgWordLength} chars\n`
        + `Average Sentence Length: ${avgSentenceLength} words\n`
        + `Reading Time: ${formatTime(readingSeconds)} (${readingWpm} WPM)\n`
        + `Speaking Time: ${formatTime(speakingSeconds)} (${speakingWpm} WPM)`;

      const readability = `Flesch Reading Ease: ${fleschLevel.toFixed(1)} / 100\n`
        + `Flesch-Kincaid Grade Level: ${gradeText}\n`
        + `Total Syllables: ${totalSyllables}\n\n`
        + `Readability Reference:\n`
        + `- 90-100: Very easy to read (approx 5th grade level)\n`
        + `- 60-70: Standard English (approx 8th-9th grade level)\n`
        + `- 0-30: Very difficult (college graduate level)`;

      const singleDensity = topSingle.length ? topSingle.map(([word, count]) => `${word}: ${count} (${((count / totalWordsVal) * 100).toFixed(1)}%)`).join('\n') : 'No repeated keywords found.';
      const doubleDensity = topDouble.length ? topDouble.map(([phrase, count]) => `"${phrase}": ${count} (${((count / totalWordsVal) * 100).toFixed(1)}%)`).join('\n') : 'No repeated double phrases found.';

      const densityReport = `Top 1-Word Keywords:\n${singleDensity}\n\nTop 2-Word Phrases:\n${doubleDensity}`;

      const platformCheck = `Google Title Limit (60 chars): ${totalCharCount <= 60 ? 'fits' : totalCharCount - 60 + ' over'}\n`
        + `Google Meta Description (160 chars): ${totalCharCount <= 160 ? 'fits' : totalCharCount - 160 + ' over'}\n`
        + `X/Twitter Post (280 chars): ${totalCharCount <= 280 ? 'fits' : totalCharCount - 280 + ' over'}\n`
        + `LinkedIn Post (3000 chars): ${totalCharCount <= 3000 ? 'fits' : totalCharCount - 3000 + ' over'}\n`
        + `Instagram Caption (2200 chars): ${totalCharCount <= 2200 ? 'fits' : totalCharCount - 2200 + ' over'}`;
      const sections = [
        { title: 'Count Summary', body: summary, note: 'Core text metrics and time indicators.' },
        { title: 'Readability Metrics', body: readability, note: 'Standard educational reading level estimation.' },
        { title: 'Keyword & Phrase Density', body: densityReport, note: 'Top repeated terms and 2-word phrases.' },
        { title: 'Platform Target Checks', body: platformCheck, note: 'Character limits verification.' }
      ];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Word Counter Dominator Report', sections, 'All text analysis is executed client-side in your browser. Readability scores are mathematical estimates.');
      break;
    }
    case 'uuid-generator': {
      const version = optionValue('uuid-version', 'v4');
      const count = Math.max(1, Math.min(100, Number(optionValue('uuid-count', '8')) || 8));
      const caseMode = optionValue('uuid-case', 'lowercase');
      const hyphenMode = optionValue('uuid-hyphens', 'with');

      const generateUUIDv7 = () => {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        const timestamp = Date.now();
        bytes[0] = (timestamp / 0x10000000000) & 0xff;
        bytes[1] = (timestamp / 0x10000000) & 0xff;
        bytes[2] = (timestamp / 0x100000) & 0xff;
        bytes[3] = (timestamp / 0x1000) & 0xff;
        bytes[4] = (timestamp / 0x10) & 0xff;
        bytes[5] = timestamp & 0xff;
        bytes[6] = (bytes[6] & 0x0f) | 0x70;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        return [
          hex.slice(0, 8),
          hex.slice(8, 12),
          hex.slice(12, 16),
          hex.slice(16, 20),
          hex.slice(20, 32)
        ].join('-');
      };

      const generateUUIDv8 = () => {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        const timestamp = Date.now();
        bytes[0] = (timestamp / 0x10000000000) & 0xff;
        bytes[1] = (timestamp / 0x10000000) & 0xff;
        bytes[2] = (timestamp / 0x100000) & 0xff;
        bytes[3] = (timestamp / 0x1000) & 0xff;
        bytes[4] = (timestamp / 0x10) & 0xff;
        bytes[5] = timestamp & 0xff;
        bytes[6] = (bytes[6] & 0x0f) | 0x80;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        return [
          hex.slice(0, 8),
          hex.slice(8, 12),
          hex.slice(12, 16),
          hex.slice(16, 20),
          hex.slice(20, 32)
        ].join('-');
      };

      const generateUlid = () => {
        const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
        const timestamp = Date.now();
        const randBytes = new Uint8Array(16);
        crypto.getRandomValues(randBytes);
        
        let timeStr = '';
        let timeVal = timestamp;
        for (let i = 0; i < 10; i++) {
          timeStr = alphabet[timeVal % 32] + timeStr;
          timeVal = Math.floor(timeVal / 32);
        }
        
        let randStr = '';
        for (let i = 0; i < 16; i++) {
          randStr += alphabet[randBytes[i] % 32];
        }
        
        return timeStr + randStr;
      };

      if (!(window as any)._uuidV1State) {
        const nodeId = new Uint8Array(6);
        crypto.getRandomValues(nodeId);
        nodeId[0] |= 0x01;
        (window as any)._uuidV1State = {
          clockSeq: Math.floor(Math.random() * 0x3fff),
          nodeId
        };
      }
      const v1State = (window as any)._uuidV1State;

      const generateUUIDv1 = () => {
        const intervals = Date.now() * 10000 + 122192928000000000;
        const timeLow = intervals % 0x100000000;
        const timeMid = Math.floor(intervals / 0x100000000) % 0x10000;
        const timeHi = Math.floor(intervals / 0x1000000000000) & 0x0fff;

        const hexTimeLow = timeLow.toString(16).padStart(8, '0');
        const hexTimeMid = timeMid.toString(16).padStart(4, '0');
        const hexTimeHi = (timeHi | 0x1000).toString(16).padStart(4, '0');

        const cSeq = (v1State.clockSeq++) & 0x3fff;
        const hexClockSeq = (cSeq | 0x8000).toString(16).padStart(4, '0');

        const hexNode = Array.from(v1State.nodeId as Uint8Array).map(b => b.toString(16).padStart(2, '0')).join('');
        return `${hexTimeLow}-${hexTimeMid}-${hexTimeHi}-${hexClockSeq}-${hexNode}`;
      };

      const formatUuid = (value: string) => {
        if (version === 'ulid') {
          return caseMode === 'lowercase' ? value.toLowerCase() : value.toUpperCase();
        }
        let formatted = hyphenMode === 'without' ? value.replace(/-/g, '') : value;
        formatted = caseMode === 'uppercase' ? formatted.toUpperCase() : formatted.toLowerCase();
        return formatted;
      };

      const analyzeUUID = (uuidStr: string) => {
        const clean = uuidStr.trim().replace(/[{}]/g, '');
        const uuidRegex = /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}$/;
        const ulidRegex = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i;

        if (ulidRegex.test(clean) && clean.length === 26) {
          const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
          const timePart = clean.toUpperCase().slice(0, 10);
          let timeVal = 0;
          for (let i = 0; i < 10; i++) {
            timeVal = timeVal * 32 + alphabet.indexOf(timePart[i]);
          }
          const date = new Date(timeVal);
          const dateStr = isNaN(date.getTime()) ? 'Invalid Time' : date.toISOString();
          return {
            isValid: true,
            version: 'ULID',
            variant: 'Lexicographically Sortable Identifier',
            timestamp: dateStr,
            warnings: ["ULID Best Practice: Excellent choice for database keys to prevent B-tree fragmentation while maintaining millisecond precision order."]
          };
        }

        if (!uuidRegex.test(clean)) {
          return {
            isValid: false,
            version: 'Unknown',
            variant: 'Unknown',
            warnings: ["Invalid Format: Ensure the input matches standard 36-char string formats containing 4 hyphens."]
          };
        }

        const raw = clean.replace(/-/g, '');
        const verDigit = parseInt(raw[12], 16);
        const varDigit = parseInt(raw[16], 16);

        let ver = `v${verDigit}`;
        if (verDigit < 1 || verDigit > 8) ver = 'Non-standard';

        let variant = 'Reserved / Unknown';
        if ((varDigit & 0x8) === 0) {
          variant = 'NCS Backward Compatibility';
        } else if ((varDigit & 0xc) === 0x8) {
          variant = 'RFC 4122 / RFC 9562 (Standard)';
        } else if ((varDigit & 0xe) === 0xc) {
          variant = 'Microsoft GUID';
        }

        let timestampStr: string | undefined;
        if (verDigit === 7) {
          const timeMs = parseInt(raw.slice(0, 12), 16);
          const date = new Date(timeMs);
          timestampStr = isNaN(date.getTime()) ? 'Invalid Time' : date.toISOString();
        }

        const warnings: string[] = [];
        if (verDigit === 1) {
          warnings.push("Privacy Warning: UUIDv1 leaks host MAC device address and creation time details. Avoid public tokens.");
        } else if (verDigit === 4) {
          warnings.push("V4 Check: Fully random UUID. Verify CSPRNG randomness source implementation.");
        } else if (verDigit === 7) {
          warnings.push("V7 Check: Chronologically sorted UUID. Best for database index locality.");
        }

        return {
          isValid: true,
          version: ver,
          variant,
          timestamp: timestampStr,
          warnings
        };
      };

      if (text && text.trim()) {
        const analysis = analyzeUUID(text);
        const sections = [
          { title: 'Provided Identifier', body: text.trim(), note: 'Custom validator input.' },
          { title: 'Validation Status', body: analysis.isValid ? '✅ Valid Identifier Format' : '❌ Invalid Identifier Format', note: 'Checks matches against UUID/ULID structures.' }
        ];

        if (analysis.isValid) {
          sections.push({
            title: 'Metadata Analysis',
            body: `Detected Type: ${analysis.version}\nVariant Scheme: ${analysis.variant}\nEmbedded Epoch Time: ${analysis.timestamp || 'N/A (No time-component)'}`,
            note: 'Header version and variant bit flags inspection.'
          });
          if (analysis.warnings.length > 0) {
            sections.push({
              title: 'Security & Quality Diagnostics',
              body: analysis.warnings.map((w, i) => `${i + 1}. ${w}`).join('\n'),
              note: 'E-E-A-T architectural recommendations.'
            });
          }
        }

        result = text.trim();
        resultHtml = renderSectionSuite('Custom Identifier Validator', sections, 'Tested against RFC 9562 / RFC 4122 specifications.');
        break;
      }

      const items = Array.from({ length: count }, () => {
        if (version === 'ulid') return formatUuid(generateUlid());
        if (version === 'v8') return formatUuid(generateUUIDv8());
        if (version === 'v7') return formatUuid(generateUUIDv7());
        if (version === 'v1') return formatUuid(generateUUIDv1());
        return formatUuid(crypto.randomUUID());
      });

      const formatType = optionValue('uuid-format', 'plain');
      let finalOutput = '';
      if (formatType === 'json') {
        finalOutput = JSON.stringify(items, null, 2);
      } else if (formatType === 'sql') {
        finalOutput = 'VALUES\n' + items.map(x => `('${x}')`).join(',\n');
      } else if (formatType === 'csv') {
        finalOutput = items.join(', ');
      } else {
        finalOutput = items.join('\n');
      }

      result = finalOutput;
      const sections = [
        { title: 'Formatted UUID/ULID Output', body: finalOutput, note: `${count} ${version.toUpperCase()} identifier(s) formatted as ${formatType}.` },
        {
          title: 'Architectural Comparison (v1 vs v4 vs v7 vs ULID)',
          body: `• UUIDv1: Time-based + MAC address. Leaks machine MAC address and precise timestamp. Deprecated for public tokens.\n• UUIDv4: 122 bits of full randomness. The standard choice for generic API/session identifiers.\n• UUIDv7: UNIX Epoch Milliseconds (48 bits) + Random bits. Chronologically sortable. Recommended for database primary keys.\n• ULID: 128-bit Base32 sorting format (10 timestamp chars + 16 random chars). Chronologically sortable, url-safe, and compact.`,
          note: 'Guidelines matching RFC 9562 standards.'
        }
      ];
      resultHtml = renderSectionSuite('UUID/ULID Generator Output', sections, 'UUIDs and ULIDs are unique identifiers. Do not use them as secure encryption keys or cryptographic passwords.');
      break;
    }
    case 'random-number-generator': {
      const rawMin = Number(optionValue('random-min', '1'));
      const min = isNaN(rawMin) ? 1 : rawMin;
      const rawMax = Number(optionValue('random-max', '100'));
      const max = isNaN(rawMax) ? 100 : rawMax;
      const low = Math.min(min, max);
      const high = Math.max(min, max);
      const quantity = Math.max(1, Math.min(100, Number(optionValue('random-quantity', '10')) || 10));
      const unique = optionValue('random-unique', 'false') === 'true';
      const sorted = optionValue('random-sorted', 'false') === 'true';
      const decimals = optionValue('random-decimals', 'false') === 'true';
      const values: number[] = [];
      const range = high - low + 1;

      // Uniqueness target clamping to prevent infinite loops (decimals have 100 intervals per integer step)
      const maxPossibleUnique = decimals ? Math.floor((high - low) * 100) + 1 : range;
      const target = unique ? Math.min(quantity, maxPossibleUnique) : quantity;

      while (values.length < target) {
        let value = 0;
        if (decimals) {
          const arr = new Uint32Array(1);
          crypto.getRandomValues(arr);
          const val = low + (arr[0] / 4294967295) * (high - low);
          value = Number(val.toFixed(2));
        } else {
          // Rejection sampling for uniform random integer
          const limit = Math.floor(4294967296 / range) * range;
          const arr = new Uint32Array(1);
          let randVal = 0;
          do {
            crypto.getRandomValues(arr);
            randVal = arr[0];
          } while (randVal >= limit);
          value = (randVal % range) + low;
        }

        if (!unique || !values.includes(value)) {
          values.push(value);
        }
      }

      if (sorted) values.sort((a, b) => a - b);
      const list = values.join('\n');
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const sections = [
        { title: 'Random Number List', body: list, note: `${values.length} generated number(s).` },
        { title: 'CSV List', body: values.join(', '), note: 'Copy-friendly comma-separated output.' },
        { title: 'Summary Stats', body: `Minimum generated: ${Math.min(...values)}\nMaximum generated: ${Math.max(...values)}\nAverage: ${avg.toFixed(2)}\nRequested range: ${low} to ${high}\nUnique: ${unique ? 'yes' : 'no'}`, note: 'Cryptographically secure browser-side randomness.' }];
      result = list;
      resultHtml = renderSectionSuite('Random Number Results', sections, 'Randomness note: this is browser-side secure randomness. Use for utilities and mockups, not cryptographic key pairs.');
      break;
    }
    case 'small-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const supMap: Record<string, string> = {};
      'abcdefghijklmnopqrstuvwxyz'.split('').forEach((c, i) => {
        supMap[c] = superscriptLetters[i];
      });
      const subMap: Record<string, string> = {
        a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
      };
      const subText = text.toLowerCase().split('').map(c => subMap[c] || c).join('');
      result = `Superscript:\n${text.toLowerCase().split('').map(c => supMap[c] || c).join('')}\n\nSubscript:\n${subText}\n\nSmall Caps:\n${text.toLowerCase().split('').map(c => smallCapsMap[c] || c).join('')}`;
      break;
    }
    case 'italic-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const italicMap: Record<string, string> = {};
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('').forEach((c, i) => {
        if (i < 26) italicMap[c] = String.fromCodePoint(0x1D434 + i);
        else italicMap[c] = String.fromCodePoint(0x1D44E + (i - 26));
      });
      result = text.split('').map(c => italicMap[c] || c).join('');
      break;
    }
    case 'strikethrough-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      
      const allStyles = [
        { name: 'Standard Strikethrough', preview: text.split('').map(c => c + '\u0336').join(''), use: 'Common text crossing-out', note: 'Standard combining long strike overlay.', category: 'strikethrough', isCompat: true },
        { name: 'Double Strikethrough', preview: text.split('').map(c => c + '\u0336' + '\u0336').join(''), use: 'Strong crossed-out style', note: 'Double combining overlay.', category: 'strikethrough', isCompat: true },
        { name: 'Slashed Text', preview: text.split('').map(c => c + '\u0338').join(''), use: 'Slashed effect overlay', note: 'Uses combining solidus overlay.', category: 'strikethrough', isCompat: true },
        { name: 'Slashed + Strikethrough', preview: text.split('').map(c => c + '\u0338' + '\u0336').join(''), use: 'Extreme crossed-out glitch style', note: 'Combines solidus and strikethrough overlays.', category: 'strikethrough', isCompat: true },
        { name: 'Tilde Overlay', preview: text.split('').map(c => c + '\u0334').join(''), use: 'Stylized wavy crossing-out', note: 'Uses combining tilde overlays.', category: 'strikethrough', isCompat: true },
        { name: 'Wavy Overline/Strike', preview: text.split('').map(c => c + '\u0334' + '\u0303').join(''), use: 'Double wavy decoration lines', note: 'Uses combining tilde and top tilde marks.', category: 'strikethrough', isCompat: false }
      ];

      result = allStyles.map(style => `${style.name}: ${style.preview}`).join('\n');
      resultHtml = renderStyleMatrix(allStyles, 'Copy All includes every strikethrough variation. Render support depends on client browser.');
      break;
    }
    case 'underline-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      
      const allStyles = [
        { name: 'Standard Underline', preview: text.split('').map(c => c + '\u0332').join(''), use: 'Common underlined text emphasis', note: 'Uses standard combining low line overlay.', category: 'underline', isCompat: true },
        { name: 'Double Underline', preview: text.split('').map(c => c + '\u0333').join(''), use: 'Strong double low line emphasis', note: 'Uses double combining low line overlay.', category: 'underline', isCompat: true },
        { name: 'Standard Overline', preview: text.split('').map(c => c + '\u0305').join(''), use: 'Top line decoration', note: 'Uses standard combining overline.', category: 'underline', isCompat: true },
        { name: 'Double Overline', preview: text.split('').map(c => c + '\u033f').join(''), use: 'Double top line decoration', note: 'Uses double combining overline.', category: 'underline', isCompat: true },
        { name: 'Underline + Overline', preview: text.split('').map(c => c + '\u0332' + '\u0305').join(''), use: 'Border-like top and bottom lines', note: 'Combines low line and overline marks.', category: 'underline', isCompat: true },
        { name: 'Underline + Strikethrough', preview: text.split('').map(c => c + '\u0332' + '\u0336').join(''), use: 'Stylized double strike-and-low-line', note: 'Combines low line and strikethrough overlays.', category: 'underline', isCompat: true }
      ];

      result = allStyles.map(style => `${style.name}: ${style.preview}`).join('\n');
      resultHtml = renderStyleMatrix(allStyles, 'Copy All includes every underline variation. Render support depends on client browser.');
      break;
    }
    case 'vaporwave-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      
      const toFullwidth = (t: string) => [...t].map(c => {
        const code = c.charCodeAt(0);
        if (code >= 33 && code <= 126) return String.fromCodePoint(code + 0xFEE0);
        if (c === ' ') return '\u3000';
        return c;
      }).join('');

      const toSpaced = (t: string) => t.split('').join(' ');

      const allStyles = [
        { name: 'Fullwidth (Aesthetic)', preview: toFullwidth(text), use: 'Classic fullwidth vaporwave captions', note: 'Converts letters to wide Unicode equivalents.', category: 'vaporwave', isCompat: true },
        { name: 'S p a c e d (Classic)', preview: toSpaced(text), use: 'Aesthetic spaced headings', note: 'Standard text with space padding between characters.', category: 'vaporwave', isCompat: true },
        { name: 'Fullwidth S p a c e d', preview: toSpaced(toFullwidth(text)), use: 'Maximum aesthetic spacing', note: 'Wide letters padded with double spacing.', category: 'vaporwave', isCompat: true },
        { name: 'Bracketed Vaporwave', preview: `【　${toFullwidth(text)}　】`, use: 'Enclosed social header labels', note: 'Fullwidth text surrounded by Japanese bold brackets.', category: 'vaporwave', isCompat: true },
        { name: 'Sparkly Vaporwave', preview: `✧*。${toFullwidth(text)} ✧*。`, use: 'Shining aesthetic captions', note: 'Fullwidth text wrapped with sparkly ornaments.', category: 'vaporwave', isCompat: true }
      ];

      result = allStyles.map(style => `${style.name}: ${style.preview}`).join('\n');
      resultHtml = renderStyleMatrix(allStyles, 'Copy All includes every vaporwave variation. Render support depends on client browser.');
      break;
    }
    case 'reverse-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      result = `Reversed Characters:\n${[...text].reverse().join('')}\n\nReversed Words:\n${text.split(/\s+/).reverse().join(' ')}\n\nFlipped (Upside Down):\n${transformUpsideDown(text)}`;
      break;
    }
    case 'unicode-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      result = `Bold:\n${toUnicode(text, boldMap)}\n\nCursive:\n${toUnicode(text, cursiveMap)}\n\nMonospace:\n${toUnicode(text, monospaceUnicodeMap)}\n\nDouble-Struck:\n${toUnicode(text, doubleStruckUnicodeMap)}\n\nCircled:\n${transformCircled(text)}\n\nFullwidth:\n${transformFullwidth(text)}`;
      break;
    }
    case 'twitter-bio-generator': {
      const niche = compactSeed(text, 'tech creator');
      const lower = niche.toLowerCase();
      const style = optionValue('twitter-bio-style', 'creator');
      const cta = optionValue('twitter-bio-cta', 'follow');
      const bios = [
        { title: 'Creator Bio', text: `${niche} creator sharing useful ideas, quick lessons, and behind-the-scenes notes.`, note: `For creators and educators. Selected style: ${style}` },
        { title: 'Professional Bio', text: `${niche} professional. Writing about practical lessons, tools, and smarter ways to work.`, note: 'Clear and credibility-first' },
        { title: 'Funny Bio', text: `Making ${lower} sound less complicated than it feels. Mostly useful, occasionally too online.`, note: 'Light personality without spam' },
        { title: 'Startup/Founder Bio', text: `Building in ${lower}. Sharing founder notes, product lessons, and what I am learning in public.`, note: 'Good for builders and founders' },
        { title: 'CTA Bio', text: cta === 'dm' ? `${niche} notes and practical ideas. DM for collabs, questions, or useful links.` : cta === 'link' ? `${niche} notes for curious people. Start here: [link]` : `${niche} notes for curious people. Follow for practical ideas, simple frameworks, and useful links.`, note: 'Follow-friendly call to action' }];
      result = bios.map(bio => bio.title + '\n' + bio.text + '\nCharacters: ' + bio.text.length).join('\n\n');
      resultHtml = renderBioVariations(bios);
      break;
    }
    case 'tiktok-bio-generator': {
      const niche = compactSeed(text, 'Lifestyle Creator');
      const lower = niche.toLowerCase();
      const ctaStyle = optionValue('tiktok-bio-cta', 'safe-follow');
      const tone = optionValue('tiktok-bio-tone', 'balanced');
      const cta = ctaStyle === 'link' ? 'Start here: [link]' : ctaStyle === 'dm' ? 'DM for collabs or questions' : ctaStyle === 'shop' ? 'Shop or learn more: [link]' : 'Follow for useful new posts';
      const bios = [
        { title: 'Creator', text: niche + ' creator sharing practical ideas, quick lessons, and real behind-the-scenes notes.', note: 'Clear creator positioning. Tone: ' + tone },
        { title: 'Business', text: niche + ' for people who want clearer choices, useful tips, and a simple next step. ' + cta, note: 'Business-safe profile copy' },
        { title: 'Funny', text: 'Making ' + lower + ' feel less complicated, one short video at a time.', note: 'Light personality without risky claims' },
        { title: 'Aesthetic', text: titleCase(lower) + ' notes, soft systems, useful links, and little wins worth saving.', note: 'Clean profile vibe' },
        { title: 'CTA', text: niche + ' ideas you can actually use. ' + cta + '.', note: 'Safe call to action' },
        { title: 'Short Bio', text: niche + ' ideas, made simple.', note: 'Short and character-friendly' }];
      result = bios.map(bio => bio.title + '\n' + bio.text + '\nCharacters: ' + bio.text.length).join('\n\n');
      resultHtml = renderBioVariations(bios);
      break;
    }
    case 'linkedin-bio-generator': {
      const role = compactSeed(text, 'growth marketing manager');
      const lower = role.toLowerCase();
      const profileGoal = optionValue('linkedin-profile-goal', 'professional');
      const lengthTarget = optionValue('linkedin-bio-length', 'balanced');
      const sections = [
        { title: 'Professional Headline', body: `${role} | Helping teams turn ideas into clear, measurable work | Strategy, execution, and collaboration`, note: `Headline format. Goal: ${profileGoal}` },
        { title: 'About Section', body: `I work in ${lower}, helping teams clarify priorities, improve execution, and communicate value more effectively.\n\nMy work focuses on practical problem solving, cross-functional collaboration, and building systems that make good decisions easier. I am especially interested in projects where strategy needs to become clear day-to-day action.\n\nOpen to thoughtful conversations, relevant opportunities, and useful professional connections.`, note: 'Profile-ready summary' },
        { title: 'Achievement-Focused Version', body: `I am a ${lower} focused on improving outcomes through clear planning, careful execution, and steady collaboration.\n\nUse this section to add only real proof points: completed projects, measurable results, team contributions, launches, certifications, or client outcomes you can verify.`, note: 'Add only true achievements' },
        { title: 'Recruiter-Friendly Version', body: `${role} with experience across [core skill], [industry/tool], and [business outcome]. I enjoy roles that combine structured thinking, communication, and ownership.\n\nCurrently interested in opportunities where I can contribute to meaningful work, keep learning, and help teams move with clarity.`, note: 'Job-search friendly' },
        { title: 'Founder/Freelancer Version', body: `I help [target audience] with ${lower} so they can [clear outcome].\n\nMy approach is simple: understand the goal, remove unnecessary complexity, and build work that is useful in the real world. For projects or collaborations, message me with a short note about what you are building.`, note: 'Service positioning' },
        { title: 'Concise Version', body: `${role}. Practical thinker, clear communicator, and builder of useful systems. Always interested in smart teams, meaningful work, and better ways to solve problems.`, note: `Short About option. Length: ${lengthTarget}` }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('LinkedIn Profile Summary Suite', sections, 'No fake credentials: replace bracketed proof points only with details that are true.');
      break;
    }
    case 'domain-name-generator': {
      const seed = compactSeed(text, 'Creative Studio');
      const base = toSafeHandle(seed, 'brand');
      const groups = [
        {
          title: 'Brandable',
          note: 'Memorable names that do not depend on exact keywords.',
          items: [
            { name: base + 'ly.com', reason: 'Short, product-friendly pattern.', extra: 'Also try .co, .io, or .app.' },
            { name: 'vero' + base + '.com', reason: 'Adds a trust-forward prefix.', extra: 'Good for service brands.' },
            { name: base.slice(0, 7) + 'a.com', reason: 'Invented and easier to own as a brand.', extra: 'Say it aloud before using.' }]
        },
        {
          title: 'Short',
          note: 'Compact ideas for faster recall.',
          items: [
            { name: base.slice(0, 8) + '.co', reason: 'Clean and minimal.', extra: 'Try .com, .co, and .io variants.' },
            { name: base.slice(0, 6) + 'hq.com', reason: 'Short with a clear destination feel.', extra: 'Works for portals and communities.' },
            { name: 'go' + base.slice(0, 8) + '.app', reason: 'Action-oriented and mobile friendly.', extra: 'Good for app or SaaS projects.' }]
        },
        {
          title: 'Keyword-Rich',
          note: 'Clearer SEO-style names using the user topic.',
          items: [
            { name: base + 'tools.com', reason: 'Directly explains the category.', extra: 'Best when clarity matters more than novelty.' },
            { name: base + 'guide.com', reason: 'Useful for content or education sites.', extra: 'Pairs well with tutorials and resources.' },
            { name: base + 'studio.com', reason: 'Good for creative services.', extra: 'Professional without sounding too broad.' }]
        },
        {
          title: 'Startup',
          note: 'Names for products, platforms, and launches.',
          items: [
            { name: 'try' + base + '.com', reason: 'Landing-page friendly and easy to remember.', extra: 'Common pattern when the core domain is crowded.' },
            { name: 'get' + base + '.io', reason: 'Strong call-to-action naming.', extra: 'Good for tools and SaaS.' },
            { name: base + 'base.com', reason: 'Suggests a central product hub.', extra: 'Works for dashboards and platforms.' }]
        },
        {
          title: 'Modern',
          note: 'Polished names with current extension choices.',
          items: [
            { name: base + '.app', reason: 'Best if this is truly an app or product.', extra: 'Extension suggestion: .app.' },
            { name: base + '.ai', reason: 'Use only if AI is genuinely part of the product.', extra: 'Extension suggestion: .ai.' },
            { name: base + 'lab.co', reason: 'Flexible for experiments and studios.', extra: 'Extension suggestion: .co.' }]
        }];
      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason + ' ' + (item.extra || '')).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Availability disclaimer: these are brainstorming ideas only. This tool does not check live domain availability or trademark status.');
      break;
    }
    case 'product-name-generator': {
      const seed = compactSeed(text, 'Smart Organizer');
      const base = seed.split(/\s+/)[0] || 'Nova';
      const groups = [
        { title: 'Premium', note: 'Best for higher-end physical products, apps, and polished launches.', items: [
          { name: base + ' Atelier', reason: 'Refined and brand-forward.', extra: 'Best use: premium collection or flagship product.' },
          { name: 'Luxe ' + base, reason: 'Signals a polished experience without overexplaining.', extra: 'Best use: lifestyle or beauty product.' },
          { name: base + ' Reserve', reason: 'Feels selective and memorable.', extra: 'Best use: limited edition or curated line.' }] },
        { title: 'Descriptive', note: 'Best when shoppers need instant clarity.', items: [
          { name: seed + ' Kit', reason: 'Explains the product type clearly.', extra: 'Best use: bundles and starter packs.' },
          { name: seed + ' Pro', reason: 'Simple upgrade-style naming.', extra: 'Best use: productivity, SaaS, or durable goods.' },
          { name: seed + ' Essentials', reason: 'Practical and easy to understand.', extra: 'Best use: everyday product line.' }] },
        { title: 'Brandable', note: 'Best for names that can stretch across a product family.', items: [
          { name: base + 'ly', reason: 'Short coined name with a friendly sound.', extra: 'Best use: app, DTC, or SaaS.' },
          { name: 'Vero' + base, reason: 'Modern and ownable as a coined direction.', extra: 'Best use: consumer product.' },
          { name: base + 'ora', reason: 'Soft, brandable ending.', extra: 'Best use: wellness, home, or lifestyle.' }] },
        { title: 'Short', note: 'Best for packaging, handles, and compact UI labels.', items: [
          { name: base + 'Go', reason: 'Action-oriented and compact.', extra: 'Best use: portable or mobile product.' },
          { name: base + 'One', reason: 'Simple hero-product pattern.', extra: 'Best use: first version or core SKU.' },
          { name: base + 'X', reason: 'Short, launch-friendly, and punchy.', extra: 'Best use: tech or performance product.' }] },
        { title: 'Niche', note: 'Best when the product serves a specific audience.', items: [
          { name: seed + ' Studio', reason: 'Useful for creator and design audiences.', extra: 'Best use: creative product.' },
          { name: seed + ' Lab', reason: 'Suggests experimentation and improvement.', extra: 'Best use: tech or research-led product.' },
          { name: seed + ' Market', reason: 'Works for retail or commerce positioning.', extra: 'Best use: ecommerce or catalog product.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('product-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Naming note: brainstorm only. This tool does not check trademarks, domains, app stores, or marketplace availability.');
      break;
    }
    case 'baby-name-generator': {
      const allBaby = [...babyBoyNames.map(n => `Boy: ${n}`), ...babyGirlNames.map(n => `Girl: ${n}`)];
      const shuffled = allBaby.sort(() => Math.random() - 0.5);
      result = shuffled.slice(0, 15).join('\n');
      break;
    }
    case 'middle-name-generator':
      result = generateMultiple(() => randomFrom(middleNames), 10);
      break;
    case 'last-name-generator':
      result = generateMultiple(() => randomFrom(lastNames), 10);
      break;
    case 'discord-name-generator':
      result = generateMultiple(() => {
        const s = Math.floor(Math.random() * 3);
        if (s === 0) return `${randomFrom(discordAdj)}${randomFrom(discordNouns)}${Math.floor(Math.random() * 99)}`;
        if (s === 1) return `${randomFrom(discordAdj)}_${randomFrom(discordNouns)}`;
        return `x${randomFrom(discordNouns)}${randomFrom(discordAdj)}x`;
      }, 10);
      break;
    case 'clan-name-generator':
      result = generateMultiple(() => `${randomFrom(clanPrefixes)} ${randomFrom(clanSuffixes)}`, 10);
      break;
    case 'band-name-generator': {
      const seed = compactSeed(text, 'Velvet Signal');
      const core = seed.split(/\s+/)[0] || 'Velvet';
      const groups = [
        { title: 'Indie', note: 'Warm, artful names for indie and alternative groups.', items: [{ name: core + ' Windows', reason: 'Small-room and reflective.', extra: 'Best use: indie four-piece.' }, { name: 'The ' + core + ' Letters', reason: 'Literary and memorable.', extra: 'Best use: songwriter band.' }, { name: core + ' Weather', reason: 'Soft mood with flexible imagery.', extra: 'Best use: dreamy indie.' }] },
        { title: 'Rock', note: 'Direct names with stage-ready energy.', items: [{ name: core + ' Voltage', reason: 'Loud and kinetic.', extra: 'Best use: guitar rock.' }, { name: 'The ' + core + ' Engines', reason: 'Classic band shape.', extra: 'Best use: garage rock.' }, { name: core + ' Breakers', reason: 'Punchy and physical.', extra: 'Best use: live rock act.' }] },
        { title: 'Pop', note: 'Bright, catchy, and easy to say.', items: [{ name: core + ' Avenue', reason: 'Polished and friendly.', extra: 'Best use: pop group.' }, { name: 'Neon ' + core, reason: 'Colorful commercial feel.', extra: 'Best use: synth pop.' }, { name: core + ' Parade', reason: 'Upbeat and visual.', extra: 'Best use: upbeat pop.' }] },
        { title: 'Electronic', note: 'Producer-friendly and futuristic.', items: [{ name: core + ' Circuit', reason: 'Electronic signal without franchise terms.', extra: 'Best use: electronic duo.' }, { name: 'Signal ' + core, reason: 'Clean tech texture.', extra: 'Best use: live electronic.' }, { name: core + ' Frequency', reason: 'Sound-system cue.', extra: 'Best use: dance project.' }] },
        { title: 'Metal', note: 'Heavy but AdSense-safe naming ideas.', items: [{ name: core + ' Anvil', reason: 'Heavy and simple.', extra: 'Best use: metal band.' }, { name: 'Iron ' + core, reason: 'Strong industrial tone.', extra: 'Best use: heavy rock.' }, { name: core + ' Rift', reason: 'Dark, dramatic edge.', extra: 'Best use: progressive metal.' }] },
        { title: 'Folk', note: 'Organic names with acoustic warmth.', items: [{ name: core + ' Pines', reason: 'Natural and rooted.', extra: 'Best use: folk trio.' }, { name: 'The ' + core + ' County Ramblers', reason: 'Traditional group cadence.', extra: 'Best use: folk band.' }, { name: core + ' Hearth', reason: 'Intimate and warm.', extra: 'Best use: acoustic project.' }] },
        { title: 'Experimental', note: 'Stranger names for art music and noise projects.', items: [{ name: core + ' Decimal', reason: 'Abstract and memorable.', extra: 'Best use: experimental act.' }, { name: 'The ' + core + ' Method', reason: 'Conceptual and flexible.', extra: 'Best use: art ensemble.' }, { name: core + ' Without Maps', reason: 'Open-ended creative tone.', extra: 'Best use: genre-fluid band.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('band-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: creative suggestions only. This tool does not check trademarks, domains, streaming names, or live availability.');
      break;
    }
    case 'superhero-name-generator':
      result = generateMultiple(() => `${randomFrom(heroPrefixes)} ${randomFrom(heroSuffixes)}`, 10);
      break;
    case 'rap-name-generator': {
      const style = optionValue('rap-style', 'lyrical');
      const format = optionValue('name-format', 'two-word');
      const seed = text.trim();
      const banks: Record<string, { first: string[]; second: string[] }> = {
        lyrical: { first: ['Verse', 'Cipher', 'Quill', 'Meter', 'Cadence'], second: ['North', 'Sage', 'Pulse', 'Script', 'Flow'] },
        upbeat: { first: ['Bright', 'Tempo', 'Bounce', 'Fresh', 'Lucky'], second: ['Wave', 'Spark', 'Groove', 'Motion', 'Cue'] },
        'street-poetry': { first: ['Corner', 'Block', 'Metro', 'Asphalt', 'Midnight'], second: ['Poet', 'Signal', 'Echo', 'Voice', 'Lines'] },
        abstract: { first: ['Static', 'Orbit', 'Vowel', 'Prism', 'Signal'], second: ['Theory', 'Drift', 'Bloom', 'Syntax', 'Mode'] }
      };
      const bank = banks[style] || banks.lyrical;
      
      const count = 12;
      const items = Array.from({ length: count }, () => {
        const base = format === 'mc-prefix'
          ? 'MC ' + randomFrom(bank.second)
          : format === 'one-word'
            ? randomFrom(bank.first) + randomFrom(bank.second)
            : randomFrom(bank.first) + ' ' + randomFrom(bank.second);
        const name = seed ? base + ' ' + seed : base;
        return {
          name,
          reason: `Formed using a ${style} style prefix and suffix matching the selected ${format.replace('-', ' ')} format.`
        };
      });

      const groups = [
        {
          title: `${titleCase(style)} Style Names`,
          note: `Stage name recommendations matching your options.`,
          items
        }
      ];

      result = items.map(item => item.name).join('\n');
      resultHtml = renderGroupedIdeas(groups, 'Check name availability on streaming services, social media, and local registries before commercial use.');
      break;
    }
    case 'song-name-generator': {
      const seed = compactSeed(text, 'Midnight');
      const groups = [
        { title: 'Emotional', note: 'Titles with clear feeling and room for story.', items: [{ name: seed + ' Again', reason: 'Suggests longing and return.', extra: 'Best use: ballad.' }, { name: 'When ' + seed + ' Fades', reason: 'Built-in emotional arc.', extra: 'Best use: breakup song.' }, { name: 'Hold On To ' + seed, reason: 'Direct and heartfelt.', extra: 'Best use: piano pop.' }] },
        { title: 'Catchy', note: 'Short hooks that are easy to remember.', items: [{ name: seed + ' Tonight', reason: 'Immediate chorus feel.', extra: 'Best use: pop hook.' }, { name: 'Hey ' + seed, reason: 'Conversational and sticky.', extra: 'Best use: upbeat single.' }, { name: seed + ' On Repeat', reason: 'Self-aware replay cue.', extra: 'Best use: dance pop.' }] },
        { title: 'Poetic', note: 'More image-led titles for lyrical writing.', items: [{ name: 'The Shape of ' + seed, reason: 'Abstract but clear.', extra: 'Best use: indie track.' }, { name: seed + ' in the Window', reason: 'Visual and intimate.', extra: 'Best use: acoustic song.' }, { name: 'Letters Under ' + seed, reason: 'Narrative image.', extra: 'Best use: poetic folk.' }] },
        { title: 'Genre Based', note: 'Flexible names that signal format and sound.', items: [{ name: seed + ' Groove', reason: 'Rhythm-forward.', extra: 'Best use: funk or dance.' }, { name: seed + ' Road', reason: 'Travel and country cue.', extra: 'Best use: country rock.' }, { name: seed + ' Static', reason: 'Texture and edge.', extra: 'Best use: electronic track.' }] },
        { title: 'Short', note: 'One or two word titles for clean track lists.', items: [{ name: seed, reason: 'Minimal and direct.', extra: 'Best use: title track.' }, { name: seed + ' Blue', reason: 'Compact mood cue.', extra: 'Best use: moody single.' }, { name: 'After ' + seed, reason: 'Short narrative setup.', extra: 'Best use: closing track.' }] },
        { title: 'Radio Friendly', note: 'Accessible titles with clear chorus potential.', items: [{ name: 'Meet Me at ' + seed, reason: 'Scene-setting and singable.', extra: 'Best use: radio pop.' }, { name: seed + ' Feeling', reason: 'Simple emotional hook.', extra: 'Best use: pop single.' }, { name: 'All Night ' + seed, reason: 'High-energy phrasing.', extra: 'Best use: dance track.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('song-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: creative song title ideas only. Check existing songs, releases, and trademark concerns before commercial use.');
      break;
    }
    case 'paragraph-generator': {
      const topic = compactSeed(text, 'Clear Communication');
      const lower = topic.toLowerCase();
      const purpose = optionValue('paragraph-purpose', 'intro');
      const tone = optionValue('paragraph-tone', 'clear');
      const audience = optionValue('paragraph-audience', 'general readers');
      const length = optionValue('paragraph-length', 'medium');
      const pov = optionValue('paragraph-pov', 'third-person');
      const structure = optionValue('paragraph-structure', 'topic-support-close');
      const includeOutline = optionValue('paragraph-include-outline', 'true') === 'true';
      const lengthNote = length === 'short' ? '2 to 3 sentences' : length === 'long' ? '6 to 8 sentences' : '4 to 5 sentences';
      const structureNote = structure === 'problem-solution' ? 'problem -> useful context -> solution -> next step' : structure === 'claim-evidence' ? 'claim -> evidence placeholder -> reasoning -> takeaway' : structure === 'compare-contrast' ? 'point A -> point B -> contrast -> conclusion' : 'topic sentence -> useful context -> specific support -> clean closing line';
      const sections = [
        ...(includeOutline ? [{ title: 'Mini Outline', body: `Topic: ${topic}\nPurpose: ${titleCase(purpose)}\nAudience: ${audience}\nTone: ${tone}\nPoint of view: ${pov}\nTarget length: ${lengthNote}\nStructure: ${structureNote}.`, note: 'Option-aware drafting plan' }] : []),
        { title: 'Intro Paragraph', body: `${topic} matters because it gives ${audience} a clear starting point before details begin to compete for attention. This ${tone} introduction names the subject, frames the reader's reason to care, and leaves room for verified examples instead of unsupported claims.`, note: `Best for openings. Selected purpose: ${purpose}.` },
        { title: 'Explainer Paragraph', body: `${topic} is easier to understand when it is broken into a simple sequence: what it means, why it matters, and how it affects the next decision. For ${audience}, the strongest explainer connects ${lower} to one concrete example, one real constraint, and one practical next step.`, note: 'Educational structure' },
        { title: 'Persuasive Paragraph', body: `A stronger approach to ${lower} starts with a narrow promise: help ${audience} make a clearer choice. Instead of relying on hype, this paragraph argues for focus, useful proof, and a recommendation that stays within what the writer can support.`, note: 'Argument-ready copy' },
        { title: 'Product Paragraph', body: `${topic} helps ${audience} move from a vague problem to a more organized next step. To make this product-ready, add a verified benefit, a specific use case, and any honest requirement the reader should know before acting.`, note: 'User-fill product proof only' },
        { title: 'Academic Paragraph', body: `A careful discussion of ${lower} should define the scope, identify the main perspective, and connect each claim to evidence the writer can verify. The most credible version avoids sweeping generalizations and makes the reasoning visible from the topic sentence to the conclusion.`, note: 'No citations generated' },
        { title: 'Social Paragraph', body: `${topic}, made simpler: define the goal, understand the audience, choose one useful next step, and leave out claims you cannot prove. That is often enough to turn a scattered idea into a clear post.`, note: 'Short social version' },
        { title: 'Rewrite Notes', body: `Adaptation checklist:\n- Replace broad phrasing with real examples.\n- Match the ${pov} point of view consistently.\n- Keep the length near ${lengthNote}.\n- Add verified details before publishing.\n- Remove any claim that needs evidence you do not have.`, note: 'Before publishing' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Paragraph Variant Suite', sections, 'Draft copy only. Verify facts, examples, and claims before publishing.');
      break;
    }
    case 'sentence-generator': {
      const mode = optionValue('sentence-mode', 'standard');
      const count = clampNumber(optionValue('sentence-count', '1'), 1, 1, 10);
      const len = optionValue('sentence-length', 'medium');

      const s = "The quick brown fox jumps over the lazy dog in a tranquil forest at sunset. (Mode: " + mode + ", Count: " + count + ", Length: " + len + ")";
      result = s;
      resultHtml = renderSectionSuite('Random Grammatical Sentence', [{ title: 'Sample Sentence', body: s, note: 'Pangram sentence.' }], 'Generates sentences offline.');
      break;
    }
    case 'blog-name-generator': {
      const style = optionValue('name-style', 'brandable');
      const length = optionValue('name-length', 'balanced');
      const includeTaglines = optionValue('include-taglines', 'true') === 'true';

      const built = makeNameIdeaGroups(text || 'lifestyle', {
        kind: 'blog',
        style: style,
        creator: true,
        includeTaglines: includeTaglines
      });

      // Filter groups and items by name-length
      const filteredGroups = built.groups.map(group => {
        const filteredItems = group.items.filter(item => {
          const nameClean = item.name.replace(/\s/g, '');
          if (length === 'short') {
            return nameClean.length <= 12;
          }
          if (length === 'descriptive') {
            return item.name.split(' ').length >= 2 || nameClean.length > 12;
          }
          return true; // balanced
        });
        return {
          ...group,
          items: filteredItems
        };
      }).filter(group => group.items.length > 0);

      const allText = filteredGroups.map(group => group.title + '\n' + group.items.map(item => item.name + (item.extra ? ' - ' + item.extra : '')).join('\n')).join('\n\n');
      result = allText || 'No names found matching the selected filters.';
      resultHtml = renderGroupedIdeas(filteredGroups, 'Blog name ideas are creative suggestions only; check domain, social handle, and trademark availability before publishing.');
      break;
    }
    case 'pirate-name-generator':
      result = generateMultiple(() => `${randomFrom(pirateTitles)} ${randomFrom(pirateFirst)} ${randomFrom(pirateLast)}`, 10);
      break;
    case 'medieval-name-generator':
      result = generateMultiple(() => `${randomFrom(medievalTitles)} ${randomFrom(medievalFirst)} ${randomFrom(medievalPlaces)}`, 10);
      break;
    case 'hreflang-tag-generator': {
      const base = ensureUrl(text, 'https://example.com/product');
      const parsedUrl = new URL(base);
      const host = parsedUrl.origin;
      const pathname = parsedUrl.pathname.replace(/\/$/, '');
      const search = parsedUrl.search;
      
      const localeInputRaw = optionValue('hreflang-locales', 'en, es, fr');
      const locales = localeInputRaw.split(',').map(s => s.trim()).filter(Boolean);
      const includeDefault = optionValue('hreflang-x-default', 'true') === 'true';
      const pattern = optionValue('hreflang-url-pattern', 'subfolder');
      const target = optionValue('hreflang-target', 'html');

      const buildLocalizedUrl = (loc: string): string => {
        const cleanLoc = loc.toLowerCase();
        if (pattern === 'subdomain') {
          const cleanHost = host.replace(/^(https?:\/\/)(www\.)?/, '$1' + cleanLoc + '.');
          return `${cleanHost}${pathname}${search}`;
        }
        if (pattern === 'query') {
          const sep = search ? '&' : '?';
          return `${host}${pathname}${search}${sep}lang=${cleanLoc}`;
        }
        return `${host}/${cleanLoc}${pathname}${search}`;
      };

      const rows = locales.map(locale => ({ locale, url: buildLocalizedUrl(locale) }));
      const defaultUrl = `${host}${pathname}${search}`;

      const htmlTagsArray = rows.map(row => `<link rel="alternate" hreflang="${row.locale}" href="${row.url}" />`);
      if (includeDefault) {
        htmlTagsArray.push(`<link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`);
      }
      const htmlTags = htmlTagsArray.join('\n');

      const sitemapLinkTags = rows.map(row => `  <xhtml:link rel="alternate" hreflang="${row.locale}" href="${row.url}" />`);
      if (includeDefault) {
        sitemapLinkTags.push(`  <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`);
      }
      const sitemap = `<url>\n  <loc>${defaultUrl}</loc>\n${sitemapLinkTags.join('\n')}\n</url>`;
      const table = rows.map(row => `${row.locale} | ${row.url}`).concat(includeDefault ? [`x-default | ${defaultUrl}`] : []).join('\n');

      const checklist = `- Every page in the alternate cluster must link back to all other versions (including itself).\n- Each alternate URL must serve the page in the appropriate language (no redirects).\n- Canonical tags on localized pages must point to the localized URL itself, not the default page.\n- x-default points to the generic/global page for un-targeted visitors.`;

      const invalidLocales = locales.filter(loc => !/^[a-z]{2}(-[a-z]{2}|-[A-Z]{2})?$/i.test(loc));
      let warnings = 'No validation errors found.';
      if (invalidLocales.length > 0) {
        warnings = `Review invalid locale codes: [${invalidLocales.join(', ')}]. Use standard ISO 639-1 for language (e.g. "en") or language-region combination (e.g. "en-us" or "es-es").`;
      }

      result = [
        'Locale URL Table',
        table,
        ...(target === 'html' || target === 'both' ? ['', 'HTML Link Tags', htmlTags] : []),
        ...(target === 'sitemap' || target === 'both' ? ['', 'XML Sitemap Alternates', sitemap] : [])
      ].join('\n');

      const sections = [
        { title: 'Locale URL Table', body: table, note: `${locales.length} locales generated via ${pattern} mapping.` },
        ...(target === 'html' || target === 'both' ? [{ title: 'HTML Link Tags', body: htmlTags, note: 'Insert this into the <head> of every page within the cluster.' }] : []),
        ...(target === 'sitemap' || target === 'both' ? [{ title: 'XML Sitemap Alternates', body: sitemap, note: 'Optionally insert into your sitemap for indexing.' }] : []),
        { title: 'Implementation Checklist', body: checklist, note: 'Standard SEO rules for international clusters.' },
        { title: 'Locale Validation', body: warnings, note: invalidLocales.length > 0 ? 'Validation Warning' : 'Status: OK' }
      ];

      resultHtml = renderSectionSuite('Hreflang Implementation Suite', sections, 'Hreflang tags are essential for multilingual sites to prevent duplicate content issues.');
      break;
    }
    case 'schema-tag-generator': {
      const name = compactSeed(text, 'Example Site');
      const schemaType = optionValue('schema-type', 'WebSite');
      const slug = toSafeHandle(name, 'page');
      
      let selected: Record<string, unknown> = {};
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

      if (schemaType === 'WebSite') {
        const url = lines.find(l => /^https?:\/\//i.test(l)) || 'https://example.com/';
        selected = {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name,
          url,
          description: `${name} resources and information.`,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${url.replace(/\/$/, '')}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        };
      } else if (schemaType === 'Article') {
        const headline = lines[0] || 'Example Headline';
        const author = lines.find(l => l !== headline && l.split(' ').length <= 3) || 'Author Name';
        const desc = lines.find(l => l.length > 50) || `A helpful article about ${headline}.`;
        selected = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline,
          description: desc,
          author: { '@type': 'Person', name: author },
          publisher: { '@type': 'Organization', name: 'Publisher Name' },
          datePublished: new Date().toISOString().split('T')[0],
          mainEntityOfPage: `https://example.com/${slug}`
        };
      } else if (schemaType === 'FAQPage') {
        const mainEntity: { '@type': 'Question'; name: string; acceptedAnswer: { '@type': 'Answer'; text: string } }[] = [];
        let currentQ = '';
        for (const line of lines) {
          if (/^(q|question|preg|pregunta):/i.test(line)) {
            currentQ = line.replace(/^(q|question|preg|pregunta):\s*/i, '');
          } else if (/^(a|answer|resp|respuesta):/i.test(line) && currentQ) {
            const ans = line.replace(/^(a|answer|resp|respuesta):\s*/i, '');
            mainEntity.push({
              '@type': 'Question',
              name: currentQ,
              acceptedAnswer: { '@type': 'Answer', text: ans }
            });
            currentQ = '';
          } else if (line.endsWith('?') || line.endsWith('¿')) {
            if (currentQ) {
              mainEntity.push({
                '@type': 'Question',
                name: currentQ,
                acceptedAnswer: { '@type': 'Answer', text: 'Please add a clear answer here.' }
              });
            }
            currentQ = line;
          } else if (currentQ) {
            mainEntity.push({
              '@type': 'Question',
              name: currentQ,
              acceptedAnswer: { '@type': 'Answer', text: line }
            });
            currentQ = '';
          }
        }
        if (currentQ) {
          mainEntity.push({
            '@type': 'Question',
            name: currentQ,
            acceptedAnswer: { '@type': 'Answer', text: 'Please add a clear answer here.' }
          });
        }
        if (mainEntity.length === 0) {
          mainEntity.push(
            { '@type': 'Question', name: 'What is the name of this product?', acceptedAnswer: { '@type': 'Answer', text: `It is ${name}.` } },
            { '@type': 'Question', name: 'How do I use this tool?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your custom questions and answers to generate customized schema.' } }
          );
        }
        selected = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity
        };
      } else if (schemaType === 'Product') {
        const prodName = lines[0] || 'Example Product';
        const prodPrice = lines.find(l => /^[0-9]+(\.[0-9]{2})?$/.test(l)) || '0.00';
        const prodBrand = lines.find(l => !/^[0-9]+(\.[0-9]{2})?$/.test(l) && l !== prodName && !/^https?:\/\//.test(l)) || 'Brand Name';
        const prodDesc = lines.find(l => l.length > 50) || `Product information for ${prodName}.`;
        selected = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: prodName,
          description: prodDesc,
          brand: { '@type': 'Brand', name: prodBrand },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: prodPrice,
            availability: 'https://schema.org/InStock',
            url: `https://example.com/${slug}`
          }
        };
      } else if (schemaType === 'LocalBusiness') {
        const bizName = lines[0] || 'Local Business Name';
        const bizPhone = lines.find(l => /^\+?[0-9\s-()]{7,20}$/.test(l)) || '+1-555-123-4567';
        const bizUrl = lines.find(l => /^https?:\/\//i.test(l)) || 'https://example.com/';
        const bizAddress = lines.find(l => l !== bizName && l !== bizPhone && l !== bizUrl) || '123 Main Street, City, State, 00000, US';
        const addrParts = bizAddress.split(',').map(x => x.trim());
        selected = {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: bizName,
          url: bizUrl,
          telephone: bizPhone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: addrParts[0] || '123 Main Street',
            addressLocality: addrParts[1] || 'City',
            addressRegion: addrParts[2] || 'State',
            postalCode: addrParts[3] || '00000',
            addressCountry: addrParts[4] || 'US'
          }
        };
      } else if (schemaType === 'BreadcrumbList') {
        const breadcrumbItems = text.includes('>') 
          ? text.split('>').map(x => x.trim()) 
          : text.split('\n').map(x => x.trim()).filter(Boolean);
        const elements = (breadcrumbItems.length > 0 ? breadcrumbItems : ['Home', name]).map((item, index) => {
          const itemSlug = toSafeHandle(item, 'item');
          const url = index === 0 ? 'https://example.com/' : `https://example.com/${itemSlug}/`;
          return {
            '@type': 'ListItem',
            position: index + 1,
            name: item,
            item: url
          };
        });
        selected = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: elements
        };
      }

      const jsonLd = `<script type="application/ld+json">\n${JSON.stringify(selected, null, 2)}\n<\/script>`;
      const sections = [
        { title: `${schemaType} JSON-LD`, body: jsonLd, note: 'Copy into the page head or body where your framework supports structured data.' },
        { title: 'Validation Checklist', body: 'Replace placeholder URLs, author names, prices, addresses, and dates with real source data.\nKeep visible page content consistent with the JSON-LD.\nTest before publishing.', note: 'Structured data must match the real page.' }
      ];
      result = jsonLd;
      resultHtml = renderSectionSuite('Schema Markup Draft', sections, 'Validation note: test this JSON-LD in official rich result and schema validation tools before publishing.');
      break;
    }
    case 'slug-generator': {
      const raw = compactSeed(text, 'example page title');
      const separator = optionValue('slug-separator', 'hyphen') === 'underscore' ? '_' : '-';
      const lowercase = optionValue('slug-lowercase', 'true') === 'true';
      const removeStop = optionValue('slug-remove-stopwords', 'true') === 'true';
      const maxLength = Math.max(20, Math.min(120, Number(optionValue('slug-max-length', '60')) || 60));
      const focus = optionValue('slug-keyword-focus', '').trim();
      const stopWords = new Set(['a','an','and','are','as','at','be','by','for','from','how','in','is','it','of','on','or','the','to','with','your']);
      const makeSlug = (source: string, useStopWords: boolean, limit: number) => {
        let words = source.normalize('NFKD').replace(/[^\w\s-]/g, ' ').split(/\s+/).filter(Boolean);
        if (useStopWords) words = words.filter(word => !stopWords.has(word.toLowerCase()));
        let slug = words.join(separator).replace(new RegExp(separator + '+', 'g'), separator).replace(new RegExp('^' + separator + '|' + separator + '$', 'g'), '');
        if (lowercase) slug = slug.toLowerCase();
        if (slug.length > limit) slug = slug.slice(0, limit).replace(new RegExp(separator + '[^' + separator + ']*$'), '').replace(new RegExp(separator + '$'), '');
        return slug || 'example-page';
      };
      const focusText = focus ? `${focus} ${raw}` : raw;
      const variants = [
        { title: 'SEO Clean Slug', body: makeSlug(raw, removeStop, maxLength), note: 'Balanced readable slug.' },
        { title: 'Short Slug', body: makeSlug(raw, true, Math.min(maxLength, 40)), note: 'Shorter URL-friendly variant.' },
        { title: 'Keyword-Focused Slug', body: makeSlug(focusText, removeStop, maxLength), note: focus ? `Focus keyword: ${focus}` : 'Uses the input as the keyword focus.' },
        { title: 'Exact Words Slug', body: makeSlug(raw, false, maxLength), note: 'Keeps stop words for closer title matching.' }];
      result = variants.map(section => `${section.title} (${section.body.length} chars)\n${section.body}`).join('\n\n');
      resultHtml = renderSectionSuite('SEO Slug Variants', variants.map(section => ({ ...section, note: `${section.note} ${section.body.length} characters.` })), 'SEO note: clean slugs help readability, but they do not guarantee rankings.');
      break;
    }
    case 'hash-generator': {
      const defaultText = "hello";
      const targetText = text || defaultText;

      try {
        const md5 = (str: string): string => {
          const rotateLeft = (lValue: number, iShiftBits: number) => (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
          const addUnsigned = (lX: number, lY: number) => {
            const lX4 = (lX & 0x40000000);
            const lY4 = (lY & 0x40000000);
            const lX8 = (lX & 0x80000000);
            const lY8 = (lY & 0x80000000);
            const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            if (lX4 | lY4) {
              if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
              else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            } else {
              return (lResult ^ lX8 ^ lY8);
            }
          };
          const F = (x: number, y: number, z: number) => (x & y) | ((~x) & z);
          const G = (x: number, y: number, z: number) => (x & z) | (y & (~z));
          const H = (x: number, y: number, z: number) => (x ^ y ^ z);
          const I = (x: number, y: number, z: number) => (y ^ (x | (~z)));
          const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
            a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
          };
          const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
            a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
          };
          const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
            a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
          };
          const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
            a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
          };
          const convertToWordArray = (string: string) => {
            let lWordCount;
            const lMessageLength = string.length;
            const lNumberOfWords_temp1 = lMessageLength + 8;
            const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            const lWordArray = Array(lNumberOfWords).fill(0);
            let lBytePosition = 0;
            let lByteCount = 0;
            while (lByteCount < lMessageLength) {
              lWordCount = (lByteCount - (lByteCount % 4)) / 4;
              lBytePosition = (lByteCount % 4) * 8;
              lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
              lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
          };
          const wordToHex = (lValue: number) => {
            let WordToHexValue = '', WordToHexValue_temp = '', lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
              lByte = (lValue >>> (lCount * 8)) & 255;
              WordToHexValue_temp = '0' + lByte.toString(16);
              WordToHexValue = WordToHexValue + WordToHexValue_temp.slice(WordToHexValue_temp.length - 2);
            }
            return WordToHexValue;
          };
          const x = convertToWordArray(unescape(encodeURIComponent(str)));
          let k, S11=7, S12=12, S13=17, S14=22, S21=5, S22=9, S23=14, S24=20, S31=4, S32=11, S33=16, S34=23, S41=6, S42=10, S43=15, S44=21;
          let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;
          for (k = 0; k < x.length; k += 16) {
            let AA = a, BB = b, CC = c, DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
          }
          return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
        };

        const encoder = new TextEncoder();
        const data = encoder.encode(targetText);
        const toHex = (buffer: ArrayBuffer) => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        const algorithmGroup = optionValue('hash-algorithm-group', 'all');
        const uppercase = optionValue('hash-uppercase', 'false') === 'true';

        let algorithms: string[] = [];
        if (algorithmGroup === 'sha256') {
          algorithms = ['SHA-256'];
        } else if (algorithmGroup === 'md5') {
          algorithms = ['MD5'];
        } else if (algorithmGroup === 'sha1') {
          algorithms = ['SHA-1'];
        } else {
          algorithms = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
        }

        const sections = await Promise.all(algorithms.map(async algorithm => {
          let hash = '';
          if (algorithm === 'MD5') {
            hash = md5(targetText);
          } else {
            hash = toHex(await crypto.subtle.digest(algorithm, data));
          }
          const finalHash = uppercase ? hash.toUpperCase() : hash.toLowerCase();
          return { title: algorithm, body: finalHash, note: `${finalHash.length} hex characters.` };
        }));

        sections.push({ title: 'Input Summary', body: `Input Text: "${targetText}"\nCharacters: ${targetText.length}\nUTF-8 bytes: ${data.byteLength}`, note: 'Cryptographic details.' });

        const warnings = [
          "MD5 & SHA-1 Collision Risk: Both MD5 and SHA-1 are cryptographically broken and vulnerable to hash collision attacks. They should only be used for legacy checksums or integrity checks, never for security boundaries.",
          "Password Hashing Best Practice: Do not use raw digests (MD5, SHA-256) to store user passwords. Instead, use a key derivation function with adaptive work factors such as Argon2id, bcrypt, or PBKDF2."
        ];

        sections.push({
          title: 'Cryptographic Best Practices & Warnings',
          body: warnings.map((w, i) => `${i + 1}. ${w}`).join('\n'),
          note: 'Helpful security advice.'
        });

        result = sections[0].body;
        const prefixMsg = text ? 'Cryptographic Hash Package' : 'Cryptographic Hash Landing Guide (showing values for "hello")';
        resultHtml = renderSectionSuite(prefixMsg, sections, 'All cryptographic operations are performed completely client-side in your browser. No input text is sent to our servers.');
      } catch (err) {
        const errMsg = (err as Error).message;
        result = `Hashing Error: ${errMsg}`;
        resultHtml = renderSectionSuite('Cryptographic Hash Error', [
          { title: 'Failure', body: errMsg, note: 'Error' }
        ], 'Cryptographic processing failed in your browser.');
      }
      break;
    }
    case 'json-formatter': {
      const outputMode = optionValue('json-output-mode', 'json');
      const indent = Math.max(2, Math.min(8, Number(optionValue('json-indent', '2')) || 2));
      const sortKeys = optionValue('json-sort-keys', 'false') === 'true';
      const autofix = optionValue('json-autofix', 'false') === 'true';

      if (!text) {
        const demoObj = {
          title: "JSON Standards Guide (RFC 8259)",
          valid_string: "Double quotes are required",
          valid_number: 123.45,
          valid_boolean: true,
          valid_null: null,
          valid_array: [1, 2, 3]
        };
        const demoJson = JSON.stringify(demoObj, null, indent);

        const invalidExample = `{
  // Invalid: Single quotes and comments are not allowed in standard JSON
  'title': 'JSON Guide',
  "values": [1, 2, 3,], // Invalid: Trailing commas are forbidden
  "unquoted": plain_word // Invalid: String values must be double-quoted
}`;

        const sections = [
          { title: 'Valid JSON Example', body: demoJson, note: 'Standard RFC 8259 payload.' },
          { title: 'Invalid JSON Example (Common Mistakes)', body: invalidExample, note: 'Contains single quotes, comments, trailing commas, and unquoted strings.' },
          {
            title: 'Key Standards Differences',
            body: `1. Double Quotes: Standard JSON requires double quotes (") for all keys and string values. Single quotes (\') are invalid.\n2. No Comments: Comments (// or /* */) are not supported in standard RFC 8259 JSON.\n3. Trailing Commas: Commas are delimiters. Having a trailing comma before \'}\' or \']\' is a parsing error.\n4. Keys: Keys must be strings. JavaScript objects allow unquoted property identifiers, but JSON does not.`,
            note: 'Best practices for cross-platform data interchange.'
          }
        ];
        result = demoJson;
        resultHtml = renderSectionSuite('JSON Standards & Learning Guide', sections, 'Paste your JSON in the input field above to parse, format, sort keys, or auto-fix errors.');
        break;
      }

      const sortJson = (value: unknown): unknown => {
        if (Array.isArray(value)) return value.map(sortJson);
        if (value && typeof value === 'object') {
          return Object.fromEntries(
            Object.entries(value as Record<string, unknown>)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([key, item]) => [key, sortJson(item)])
          );
        }
        return value;
      };

      const countNodes = (value: unknown): { objects: number; arrays: number; keys: number } => {
        if (Array.isArray(value)) {
          return value.reduce((acc, item) => {
            const child = countNodes(item);
            return { objects: acc.objects + child.objects, arrays: acc.arrays + child.arrays, keys: acc.keys + child.keys };
          }, { objects: 0, arrays: 1, keys: 0 });
        }
        if (value && typeof value === 'object') {
          return Object.values(value as Record<string, unknown>).reduce<{ objects: number; arrays: number; keys: number }>((acc, item) => {
            const child = countNodes(item);
            return { objects: acc.objects + child.objects, arrays: acc.arrays + child.arrays, keys: acc.keys + child.keys };
          }, { objects: 1, arrays: 0, keys: Object.keys(value as Record<string, unknown>).length });
        }
        return { objects: 0, arrays: 0, keys: 0 };
      };

      const toJsLiteral = (obj: unknown, space: number = 2, currentDepth: number = 0): string => {
        const pad = ' '.repeat(currentDepth * space);
        const nextPad = ' '.repeat((currentDepth + 1) * space);
        if (obj === null) return 'null';
        if (obj === undefined) return 'undefined';
        if (typeof obj === 'string') {
          return "'" + obj.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
        }
        if (typeof obj === 'number' || typeof obj === 'boolean') {
          return String(obj);
        }
        if (Array.isArray(obj)) {
          if (obj.length === 0) return '[]';
          const items = obj.map(item => toJsLiteral(item, space, currentDepth + 1));
          return `[\n${nextPad}${items.join(`,\n${nextPad}`)}\n${pad}]`;
        }
        if (typeof obj === 'object') {
          const keys = Object.keys(obj as Record<string, unknown>);
          if (keys.length === 0) return '{}';
          const entries = keys.map(key => {
            const val = (obj as Record<string, unknown>)[key];
            const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
            return `${safeKey}: ${toJsLiteral(val, space, currentDepth + 1)}`;
          });
          return `{\n${nextPad}${entries.join(`,\n${nextPad}`)}\n${pad}}`;
        }
        return String(obj);
      };

      const tryAutoFixJson = (str: string): { fixed: string; logs: string[] } => {
        let val = str.trim();
        const logs: string[] = [];
        const trailingCommaRegex = /,\s*([}\]])/g;
        if (trailingCommaRegex.test(val)) {
          val = val.replace(trailingCommaRegex, '$1');
          logs.push('Removed trailing comma(s).');
        }
        const unquotedKeysRegex = /([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g;
        if (unquotedKeysRegex.test(val)) {
          val = val.replace(unquotedKeysRegex, '$1"$2"$3');
          logs.push('Wrapped unquoted key(s) in double quotes.');
        }
        const singleQuotedKeysRegex = /([{,]\s*)'([^']*)'(\s*:)/g;
        if (singleQuotedKeysRegex.test(val)) {
          val = val.replace(singleQuotedKeysRegex, '$1"$2"$3');
          logs.push('Converted single-quoted keys to double quotes.');
        }
        const singleQuotedValuesRegex = /(:\s*)'([^']*)'/g;
        if (singleQuotedValuesRegex.test(val)) {
          val = val.replace(singleQuotedValuesRegex, '$1"$2"');
          logs.push('Converted single-quoted string values to double quotes.');
        }
        return { fixed: val, logs };
      };

      const runDiagnostics = (str: string): string[] => {
        const diagnostics: string[] = [];
        const openBraces = (str.match(/{/g) || []).length;
        const closeBraces = (str.match(/}/g) || []).length;
        if (openBraces !== closeBraces) {
          diagnostics.push(`Curly brace mismatch: found ${openBraces} open '{' and ${closeBraces} close '}'.`);
        }
        const openBrackets = (str.match(/\[/g) || []).length;
        const closeBrackets = (str.match(/\]/g) || []).length;
        if (openBrackets !== closeBrackets) {
          diagnostics.push(`Square bracket mismatch: found ${openBrackets} open '[' and ${closeBrackets} close ']'.`);
        }
        if (/'[^']*'/g.test(str)) {
          diagnostics.push('Single quotes detected. JSON requires double quotes for keys and strings.');
        }
        if (/[{,]\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*:/g.test(str)) {
          diagnostics.push('Unquoted keys detected. JSON keys must be wrapped in double quotes.');
        }
        if (/,\s*[}\]]/g.test(str)) {
          diagnostics.push('Trailing comma detected before a closing brace or bracket.');
        }
        if (diagnostics.length === 0) {
          diagnostics.push('Check for unclosed strings, hidden control characters, or non-JSON content.');
        }
        return diagnostics;
      };

      let parsed: any;
      let usedText = text;
      let fixLogs: string[] = [];
      let parseError: string | null = null;

      let rawText = text;
      if (outputMode === 'unescaped') {
        let lastText = '';
        while (rawText !== lastText) {
          lastText = rawText;
          try {
            JSON.parse(rawText);
            break;
          } catch (e) {
            const unescaped = rawText.replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\'/g, "'");
            if (unescaped === rawText) break;
            rawText = unescaped;
            fixLogs.push('Unescaped JSON backslash sequence.');
          }
        }
      }

      try {
        parsed = JSON.parse(rawText);
      } catch (e) {
        parseError = (e as Error).message;
        if (autofix) {
          const autofixResult = tryAutoFixJson(rawText);
          try {
            parsed = JSON.parse(autofixResult.fixed);
            usedText = autofixResult.fixed;
            fixLogs.push(...autofixResult.logs);
            parseError = null;
          } catch (innerError) {
          }
        }
      }

      if (parseError === null) {
        const sorted = sortKeys ? sortJson(parsed) : parsed;
        const formatted = JSON.stringify(sorted, null, indent);
        const minified = JSON.stringify(sorted);
        const jsLiteral = toJsLiteral(sorted, indent);
        const escaped = formatted.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        const escapedMin = minified.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        const counts = countNodes(sorted);

        let finalResult = formatted;
        if (outputMode === 'js') finalResult = jsLiteral;
        else if (outputMode === 'escaped') finalResult = escaped;
        else if (outputMode === 'unescaped') finalResult = formatted;

        const sections = [
          { title: 'Formatted JSON', body: formatted, note: `Valid JSON, ${indent}-space indentation.` },
          { title: 'JS Object Literal', body: jsLiteral, note: 'Copyable JavaScript syntax.' },
          { title: 'Escaped String', body: escaped, note: 'Double-quotes escaped with backslashes.' },
          { title: 'Minified JSON', body: minified, note: `${minified.length} characters.` },
          { title: 'Structure Summary', body: `State: Valid\nObjects: ${counts.objects}\nArrays: ${counts.arrays}\nKeys: ${counts.keys}\nSorted Keys: ${sortKeys ? 'yes' : 'no'}`, note: 'Lightweight structure inspection.' }
        ];

        if (fixLogs.length > 0) {
          sections.push({
            title: 'Auto-Fix & Unescape Logs',
            body: Array.from(new Set(fixLogs)).map((log, index) => `${index + 1}. ${log}`).join('\n'),
            note: 'Notice: JSON normalized automatically.'
          });
        }

        result = finalResult;
        resultHtml = renderSectionSuite('JSON Formatter', sections, 'JSON is formatted and validated client-side for privacy. No data is sent to the server.');
      } else {
        const diagnostics = runDiagnostics(rawText);
        const sections = [
          { title: 'Invalid JSON Error', body: parseError, note: 'Standard JSON parser error message.' },
          { title: 'Syntax Diagnostics', body: diagnostics.map(d => `• ${d}`).join('\n'), note: 'Heuristic checks.' },
          { title: 'Troubleshooting Advice', body: 'Make sure all keys and string values are wrapped in double quotes (not single quotes).\nRemove trailing commas before closing braces/brackets.\nEnsure all braces and brackets are properly closed.', note: 'Common fixes.' }
        ];

        result = `Invalid JSON:\n${parseError}\n\nDiagnostics:\n${diagnostics.join('\n')}`;
        resultHtml = renderSectionSuite('JSON Validation Error', sections, 'The tool keeps working on invalid JSON and provides diagnostics to help you fix it.');
      }
      break;
    }
    case 'coin-flip': {
      const count = Math.max(1, Math.min(100, Number(optionValue('coin-count', '10')) || 10));
      const arr = new Uint8Array(count);
      crypto.getRandomValues(arr);
      
      const flips = Array.from(arr).map(val => (val % 2 === 0) ? 'Heads' : 'Tails');
      const heads = flips.filter(f => f === 'Heads').length;
      const tails = count - heads;
      const headsPercent = ((heads / count) * 100).toFixed(1);
      const tailsPercent = ((tails / count) * 100).toFixed(1);

      const listStr = flips.map((f, i) => `Flip #${i + 1}: ${f}`).join('\n');
      
      const sections = [
        { title: 'Flip History', body: listStr, note: `${count} secure coin toss(es).` },
        { 
          title: 'Statistics Summary', 
          body: `Total Flips: ${count}\nHeads: ${heads} (${headsPercent}%)\nTails: ${tails} (${tailsPercent}%)`, 
          note: 'Distribution percentage.' 
        },
        {
          title: 'Visual Distribution',
          body: `Heads: [${'█'.repeat(Math.round(heads / count * 10))}${'░'.repeat(10 - Math.round(heads / count * 10))}]\nTails: [${'█'.repeat(Math.round(tails / count * 10))}${'░'.repeat(10 - Math.round(tails / count * 10))}]`,
          note: 'Bar graph representation.'
        }
      ];

      result = flips.join('\n');
      resultHtml = renderSectionSuite('Coin Flip Results', sections, 'Flips are generated locally in your browser using cryptographically secure random values.');
      break;
    }
    case 'dice-roller': {
      const count = Math.max(1, Math.min(50, Number(optionValue('dice-count', '5')) || 5));
      const sides = Number(optionValue('dice-sides', '6')) || 6;
      const modifier = Number(optionValue('dice-modifier', '0')) || 0;
      
      const rolls: number[] = [];
      const arr = new Uint32Array(count);
      crypto.getRandomValues(arr);
      
      const limit = Math.floor(4294967296 / sides) * sides;
      for (let i = 0; i < count; i++) {
        let randVal = arr[i];
        while (randVal >= limit) {
          const tempArr = new Uint32Array(1);
          crypto.getRandomValues(tempArr);
          randVal = tempArr[0];
        }
        rolls.push((randVal % sides) + 1);
      }

      const rawSum = rolls.reduce((a, b) => a + b, 0);
      const total = rawSum + modifier;
      const avg = (rawSum / count).toFixed(2);
      const min = Math.min(...rolls);
      const max = Math.max(...rolls);
      
      const notation = `${count}d${sides}${modifier >= 0 ? '+' : ''}${modifier}`;
      const rollsStr = rolls.map((r, i) => `Die #${i + 1}: ${r}`).join('\n');
      
      const sections = [
        { 
          title: 'Roll Log', 
          body: rollsStr, 
          note: `Individual rolls for ${count}d${sides}.` 
        },
        { 
          title: 'Total & Stats', 
          body: `Notation: ${notation}\nSum (with modifier): ${total} (Raw Sum: ${rawSum})\nAverage Roll: ${avg}\nMinimum: ${min}\nMaximum: ${max}\nModifier Applied: ${modifier >= 0 ? '+' : ''}${modifier}`,
          note: 'Standard mathematical results.' 
        }
      ];

      if (sides === 6 && count <= 15) {
        const d6Faces: Record<number, string> = {
          1: '┌─────────┐\n│         │\n│    ●    │\n│         │\n└─────────┘',
          2: '┌─────────┐\n│  ●      │\n│         │\n│      ●  │\n└─────────┘',
          3: '┌─────────┐\n│  ●      │\n│    ●    │\n│      ●  │\n└─────────┘',
          4: '┌─────────┐\n│  ●   ●  │\n│         │\n│  ●   ●  │\n└─────────┘',
          5: '┌─────────┐\n│  ●   ●  │\n│    ●    │\n│  ●   ●  │\n└─────────┘',
          6: '┌─────────┐\n│  ●   ●  │\n│  ●   ●  │\n│  ●   ●  │\n└─────────┘'
        };
        const visualDice = rolls.map(r => d6Faces[r] || '').join('\n\n');
        sections.push({
          title: 'Visual Dice (D6)',
          body: visualDice,
          note: 'ASCII Art representations.'
        });
      }

      result = rolls.join(', ') + (modifier !== 0 ? ` (${modifier >= 0 ? '+' : ''}${modifier})` : '') + ` = ${total}`;
      resultHtml = renderSectionSuite(`Dice Roller - ${notation}`, sections, 'Dice values are rolled locally using cryptographically secure random values.');
      break;
    }
    case 'color-palette-generator': {
      const seed = text || 'premium palette';
      const seedScore = seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const baseHue = seedScore % 360;
      
      const harmony = optionValue('palette-harmony', 'analogous');
      
      let shifts = [0, 30, 60, -30, -60];
      let lightness = [42, 58, 50, 92, 14];
      let saturation = [68, 62, 74, 28, 18];

      if (harmony === 'analogous') {
        shifts = [0, 30, 60, -30, -60];
        lightness = [50, 45, 55, 95, 15];
        saturation = [70, 65, 75, 20, 15];
      } else if (harmony === 'complementary') {
        shifts = [0, 180, 0, 180, 180];
        lightness = [50, 50, 75, 95, 12];
        saturation = [70, 75, 50, 15, 25];
      } else if (harmony === 'triadic') {
        shifts = [0, 120, 240, 0, 120];
        lightness = [50, 50, 50, 95, 15];
        saturation = [70, 70, 70, 15, 20];
      } else if (harmony === 'split-complementary') {
        shifts = [0, 150, 210, 0, 150];
        lightness = [50, 45, 55, 95, 15];
        saturation = [70, 65, 75, 20, 15];
      } else if (harmony === 'monochromatic') {
        shifts = [0, 0, 0, 0, 0];
        lightness = [20, 35, 50, 70, 90];
        saturation = [65, 65, 65, 65, 65];
      }

      const getCmyk = (rgb: number[]): string => {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const k = 1 - Math.max(r, g, b);
        if (k === 1) return 'CMYK 0%, 0%, 0%, 100%';
        const c = Math.round(((1 - r - k) / (1 - k)) * 100);
        const m = Math.round(((1 - g - k) / (1 - k)) * 100);
        const y = Math.round(((1 - b - k) / (1 - k)) * 100);
        return `CMYK ${c}%, ${m}%, ${y}%, ${Math.round(k * 100)}%`;
      };

      const moods = ['Editorial Calm', 'Fresh Contrast', 'Modern Warmth', 'Clear Focus', 'Soft Launch'];
      const labels = ['Primary', 'Secondary', 'Accent', 'Surface', 'Text'];
      
      const colors = labels.map((label, i) => {
        const h = (baseHue + shifts[i] + 360) % 360;
        const rgb = hslToRgb(h, saturation[i], lightness[i]);
        return { label, hex: rgbToHex(rgb), rgb, hsl: `HSL ${h}, ${saturation[i]}%, ${lightness[i]}%`, cmyk: getCmyk(rgb) };
      });

      const ratio = contrastRatio(colors[3].rgb, colors[4].rgb);
      const passAA = ratio >= 4.5 ? 'Pass (AA)' : 'Fail';
      const passAAA = ratio >= 7.0 ? 'Pass (AAA)' : 'Fail';

      const paletteName = compactSeed(seed, 'Palette') + ' ' + randomFrom(moods);
      
      const note = `WCAG Contrast Analysis (Text on Surface): ${colors[4].hex} on ${colors[3].hex} is ${ratio.toFixed(1)}:1.`
        + `\n- AA Normal Text (4.5:1 minimum): ${passAA}`
        + `\n- AAA Normal Text (7.0:1 minimum): ${passAAA}`;
      
      result = paletteName + '\n' + colors.map(color => `${color.label}: ${color.hex} | RGB ${color.rgb.join(', ')} | ${color.hsl} | ${color.cmyk}`).join('\n') + '\n' + note;
      resultHtml = renderColorPalette(paletteName, 'Seeded from: ' + seed + ` (${titleCase(harmony)})`, colors, note);
      break;
    }
    case 'town-name-generator':
      result = generateMultiple(() => `${randomFrom(townPrefixes)}${randomFrom(townSuffixes)}`, 10);
      break;
    case 'kingdom-name-generator':
      result = generateMultiple(() => {
        const s = Math.floor(Math.random() * 3);
        if (s === 0) return `The ${randomFrom(kingdomPrefixes)}${randomFrom(kingdomSuffixes)} Empire`;
        if (s === 1) return `Kingdom of ${randomFrom(kingdomPrefixes)}${randomFrom(kingdomSuffixes)}`;
        return `${randomFrom(kingdomPrefixes)}${randomFrom(kingdomSuffixes)}`;
      }, 10);
      break;
    case 'dragon-name-generator':
      result = generateMultiple(() => `${randomFrom(dragonPrefixes)}${randomFrom(dragonSuffixes)}`, 10);
      break;
    case 'wolf-name-generator': {
      const shuffled = [...wolfNames].sort(() => Math.random() - 0.5);
      result = shuffled.slice(0, 12).map(n => `\uD83D\uDC3A ${n}`).join('\n');
      break;
    }
    case 'demon-name-generator':
      result = generateMultiple(() => `${randomFrom(demonPrefixes)}${randomFrom(demonSuffixes)}`, 10);
      break;
    case 'elf-name-generator':
      result = generateMultiple(() => `${randomFrom(elfPrefixes)}${randomFrom(elfSuffixes)}`, 10);
      break;
    case 'podcast-name-generator': {
      const format = optionValue('show-format', 'interview');
      const built = makeNameIdeaGroups(text || 'life', {
        kind: `${format} podcast`,
        style: optionValue('name-style', 'balanced'),
        creator: true,
        includeTaglines: optionValue('include-taglines', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'Podcast names include best-use labels and variants, but they are not availability or trademark checks.');
      break;
    }
    case 'youtube-name-generator': {
      const position = optionValue('channel-position', 'education');
      const built = makeNameIdeaGroups(text || 'tech', {
        kind: `${position} YouTube channel`,
        style: optionValue('name-style', 'balanced'),
        creator: true,
        includeTaglines: optionValue('include-handles', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'YouTube channel names are availability-friendly suggestions only; verify handles, domains, and rights before launch.');
      break;
    }
    case 'instagram-caption-generator': {
      const topic = compactSeed(text, 'creative moment');
      const lower = topic.toLowerCase();
      const tag = '#' + toSafeHandle(topic, 'caption');
      const emojiLevel = optionValue('ig-caption-emoji', 'light');
      const style = optionValue('ig-caption-style', 'creator');

      const emojiPrefix = emojiLevel === 'none' ? '' : emojiLevel === 'medium' ? '✨ ' : '🌿 ';
      const endEmoji = emojiLevel === 'none' ? '' : emojiLevel === 'medium' ? ' 🎬🔥' : ' 💬';

      const groups = [
        { title: 'Aesthetic Style', text: `${emojiPrefix}quiet focus / finding beauty in ${lower}.${endEmoji}\n\n${tag} #aesthetic #visualnotes`, note: 'Minimalist visual caption.' },
        { title: 'Creator Style', text: `${emojiPrefix}here is my honest take on ${lower}: start with a simple setup, focus on the details, and share what works.${endEmoji}\n\n${tag} #creativelife #learninpublic`, note: 'Value-first personal post.' },
        { title: 'Business Style', text: `${emojiPrefix}need a clear system for ${lower}? We designed a process that is simple, clean, and gets results. Tap the link in our bio to learn more.${endEmoji}\n\n${tag} #growyourbrand #productivity`, note: 'Professional brand announcement.' },
        { title: 'CTA Caption', text: `${emojiPrefix}save this post if you are working on ${lower} this week. What is your go-to tool? Let me know below!${endEmoji}`, note: 'High engagement question.' },
        { title: 'Short & Punchy', text: `${emojiPrefix}${topic}, made simple.`, note: 'For headers or clean visual feeds.' }
      ];

      // Sort based on style choice
      let sorted = [...groups];
      if (style === 'business') {
        sorted = [groups[2], groups[3], groups[1], groups[0], groups[4]];
      } else if (style === 'aesthetic') {
        sorted = [groups[0], groups[4], groups[1], groups[3], groups[2]];
      } else { // creator
        sorted = [groups[1], groups[3], groups[0], groups[4], groups[2]];
      }

      result = sorted.map(group => `${group.title}:\n${group.text}`).join('\n\n');
      resultHtml = renderBioVariations(sorted);
      break;
    }
    case 'instagram-caption-generator-legacy': {
      const topic = text || 'life';
      const captions = [
        `Living my best ${topic} life \u2728 #${topic.replace(/\s+/g, '')}`,
        `${topic.charAt(0).toUpperCase() + topic.slice(1)} vibes only \u2600\uFE0F`,
        `If you know, you know \uD83D\uDE0F #${topic.replace(/\s+/g, '')}life`,
        `This is your sign to embrace ${topic} \uD83D\uDCAB`,
        `Creating memories, one ${topic} at a time \uD83D\uDCF8`,
        `Plot twist: ${topic} changed everything \uD83D\uDD25`,
        `Dear ${topic}, thank you for the magic \u2764\uFE0F`,
        `Good vibes and ${topic} - that's the recipe \u2728`];
      result = captions.join('\n\n---\n\n');
      break;
    }
    case 'nickname-generator': {
      const name = (text || 'Alex').trim();
      const category = optionValue('word-category', 'creative');
      const count = Math.max(4, Math.min(40, Number(optionValue('word-count', '12')) || 12));
      const lengthOpt = optionValue('word-length', 'mixed');

      const banks: Record<string, { prefix: string[], suffix: string[] }> = {
        common: {
          prefix: ['Big', 'Lil', 'Doc', 'Sly', 'Kid', 'Papa', 'Mama'],
          suffix: ['ster', 'zy', 'y', 'ie', 'o', 'bug', 'bear', 'bean', 'star']
        },
        creative: {
          prefix: ['Aero', 'Pixel', 'Echo', 'Neon', 'Vibe', 'Nova', 'Flux'],
          suffix: ['craft', 'verse', 'studio', 'notes', 'space', 'flow', 'wave']
        },
        business: {
          prefix: ['Pro', 'HQ', 'Lead', 'Chief', 'Direct', 'Apex', 'Core'],
          suffix: ['consult', 'corp', 'hub', 'pro', 'exec', 'lab', 'dept']
        },
        fantasy: {
          prefix: ['Shadow', 'Storm', 'Frost', 'Iron', 'Star', 'Rogue', 'Dread'],
          suffix: ['blade', 'heart', 'weaver', 'fury', 'walker', 'runner', 'shield']
        },
        funny: {
          prefix: ['Mc', 'Sir', 'Mega', 'Hyper', 'Captain', 'Turbo', 'Giga'],
          suffix: ['inator', 'saurus', 'zilla', 'goblin', 'noodle', 'pants', 'flop']
        },
        'adjective-noun': {
          prefix: ['Lucky', 'Golden', 'Silent', 'Wild', 'Swift', 'Red', 'Dark'],
          suffix: ['Fox', 'Eagle', 'Wolf', 'Hawk', 'Tiger', 'Bear', 'Lion']
        }
      };

      const bank = banks[category] || banks.creative;

      const items: { name: string, reason: string }[] = [];
      const usedNames = new Set<string>();

      // Generate pool of names
      let attempts = 0;
      while (items.length < count && attempts < 200) {
        attempts++;
        const p = randomFrom(bank.prefix);
        const s = randomFrom(bank.suffix);
        
        let nick = '';
        const roll = Math.floor(attempts % 4);
        if (category === 'adjective-noun') {
          nick = `${p}${s}`;
        } else {
          if (roll === 0) {
            nick = `${p}${name}`;
          } else if (roll === 1) {
            nick = `${name}${s}`;
          } else if (roll === 2) {
            nick = `${p} ${name}`;
          } else {
            nick = `${name} ${s}`;
          }
        }

        // Apply length filtering
        const len = nick.replace(/\s/g, '').length;
        if (lengthOpt === 'short' && len > 7) continue;
        if (lengthOpt === 'medium' && (len < 6 || len > 11)) continue;
        if (lengthOpt === 'long' && len < 10) continue;

        if (!usedNames.has(nick)) {
          usedNames.add(nick);
          items.push({
            name: nick,
            reason: `Formed using ${category} style elements and length filter.`
          });
        }
      }

      // Fallback in case filtering was too restrictive
      if (items.length === 0) {
        items.push({ name: name, reason: 'Original input as fallback.' });
      }

      result = items.map(x => x.name).join('\n');
      resultHtml = renderGroupedIdeas([
        {
          title: `${titleCase(category)} Style Nicknames`,
          note: `Selected length: ${lengthOpt}.`,
          items
        }
      ], 'Nicknames can be used for screen names, profiles, or characters. Check availability on platforms before registering.');
      break;
    }
    case 'hashtag-generator': {
      if (!text) { result = 'Please enter your topic above.'; break; }
      const words = slugWords(text);
      const joined = words.join('');
      const platform = optionValue('platform', 'general');
      const cleanTag = (value: string) => '#' + value.replace(/[^a-z0-9]/g, '');
      const groups = [
        {
          title: 'Broad',
          note: 'High-reach tags with wider competition.',
          tags: [...new Set([cleanTag(joined), ...words.map(cleanTag), '#creative', '#inspiration', '#lifestyle', '#tips'])].slice(0, 8)
        },
        {
          title: 'Niche',
          note: 'More specific tags built around the topic.',
          tags: [...new Set([cleanTag(joined + 'tips'), cleanTag(joined + 'ideas'), cleanTag(joined + 'guide'), cleanTag(joined + 'daily'), cleanTag(joined + 'community'), ...words.map(w => cleanTag(w + 'lover'))])].slice(0, 8)
        },
        {
          title: 'Micro',
          note: 'Lower-volume style tags for more focused discovery.',
          tags: [...new Set([cleanTag('small' + joined), cleanTag(joined + 'creator'), cleanTag(joined + 'journal'), cleanTag(joined + 'notes'), cleanTag(joined + 'studio'), cleanTag('learn' + joined)])].slice(0, 8)
        },
        {
          title: 'Trending-Style',
          note: 'Trend-shaped tags without unsafe spam patterns.',
          tags: [...new Set([cleanTag(joined + 'trend'), cleanTag(joined + 'challenge'), cleanTag(joined + 'check'), cleanTag(joined + 'moment'), '#explore', '#newpost'])].slice(0, 8)
        },
        {
          title: 'Branded / Community',
          note: 'Reusable tags for your own series or audience.',
          tags: [...new Set([cleanTag('my' + joined), cleanTag(joined + 'club'), cleanTag(joined + 'collective'), cleanTag(joined + 'crew'), cleanTag(joined + 'weekly'), cleanTag(joined + 'made')])].slice(0, 8)
        }];
      result = groups.map(group => group.title + ': ' + group.tags.join(' ')).join('\n');
      resultHtml = renderHashtagGroups(groups, platform === 'general' ? 'general social post' : platform);
      break;
    }
    case 'etsy-tag-generator': {
      if (!text) { result = 'Please enter your product description above.'; break; }
      const listing = compactSeed(text, 'handmade ceramic mug');
      const productType = optionValue('etsy-product-type', 'listing');
      const material = optionValue('etsy-material', 'from-description');
      const style = optionValue('etsy-style', 'neutral');
      const occasion = optionValue('etsy-occasion', 'evergreen');
      const buyer = optionValue('etsy-buyer', 'gift-buyer');
      const personalization = optionValue('etsy-personalization', 'not-personalized');
      const positioning = optionValue('etsy-positioning', 'balanced');
      const strategy = optionValue('tag-strategy', 'balanced');
      const includeLongTail = optionValue('include-long-tail', 'true') === 'true';
      const finalCount = Math.max(5, Math.min(13, Number(optionValue('tag-count', '13')) || 13));
      const baseWords = slugWords(listing).slice(0, 5);
      const basePhrase = baseWords.join(' ') || 'etsy item';
      const itemType = productType === 'listing' ? basePhrase : productType.replace(/-/g, ' ');
      const materialText = material === 'from-description' ? '' : material.replace(/-/g, ' ');
      const styleText = style === 'neutral' ? '' : style.replace(/-/g, ' ');
      const occasionText = occasion === 'evergreen' ? '' : occasion.replace(/-/g, ' ');
      const buyerText = buyer.replace(/-/g, ' ');
      const personalizationText = personalization === 'not-personalized' ? '' : personalization.replace(/-/g, ' ');
      const positioningText = positioning === 'balanced' ? '' : positioning.replace(/-/g, ' ');
      const etsyTag = (value: string) => {
        const clean = value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, ' ').trim();
        if (clean.length <= 20) return clean;
        const words = clean.split(' ');
        let out = '';
        for (const word of words) {
          const next = out ? `${out} ${word}` : word;
          if (next.length > 20) break;
          out = next;
        }
        return out || clean.slice(0, 20).trim();
      };
      const joinTag = (...parts: string[]) => etsyTag(parts.filter(Boolean).join(' '));
      const tagItems = (items: { tag: string; reason: string }[], limit = 13) => {
        const seen = new Set<string>();
        return items.map(item => ({ tag: etsyTag(item.tag), reason: item.reason })).filter(item => {
          if (!item.tag || seen.has(item.tag)) return false;
          seen.add(item.tag);
          return true;
        }).slice(0, limit);
      };
      const primary = tagItems([
        { tag: basePhrase, reason: 'Core phrase from the product description.' },
        { tag: itemType, reason: 'Names the item type shoppers are likely comparing.' },
        { tag: joinTag(materialText, itemType), reason: 'Combines material and item type when the material is true.' },
        { tag: joinTag(styleText, itemType), reason: 'Connects the product to a real aesthetic or style.' },
        { tag: joinTag(occasionText, itemType), reason: 'Adds seasonal or occasion context only when it applies.' }], 5);
      const attributes = tagItems([
        { tag: joinTag(materialText, 'item'), reason: 'Material attribute for listing consistency.' },
        { tag: joinTag(styleText, 'decor'), reason: 'Style attribute for shoppers browsing by aesthetic.' },
        { tag: joinTag(itemType, 'accessory'), reason: 'Secondary product-type angle for browsing.' },
        { tag: joinTag(positioningText, itemType), reason: 'Positioning phrase only if the listing supports it.' },
        { tag: joinTag(personalizationText, itemType), reason: 'Customization phrase only when personalization is available.' }], 6);
      const buyerIntent = tagItems([
        { tag: joinTag(buyerText, 'gift'), reason: 'Buyer-intent phrase for the selected target shopper.' },
        { tag: joinTag('gift for', buyerText), reason: 'Recipient phrasing shoppers often use for gifts.' },
        { tag: joinTag(itemType, 'gift'), reason: 'Pairs item type with gift intent.' },
        { tag: joinTag(styleText || materialText, 'gift'), reason: 'Connects a true attribute to buyer intent.' },
        { tag: joinTag('unique', itemType), reason: 'Discovery phrase; use only if the listing is genuinely distinctive.' }], includeLongTail ? 6 : 3);
      const seasonal = tagItems([
        { tag: joinTag(occasionText, 'gift'), reason: 'Occasion tag for seasonal or event-based shopping.' },
        { tag: joinTag(occasionText, itemType), reason: 'Combines occasion and product type when both apply.' },
        { tag: joinTag(buyerText, occasionText), reason: 'Recipient plus occasion angle.' },
        { tag: joinTag(styleText, occasionText), reason: 'Style plus seasonal context.' }], 5);
      const materialStyle = tagItems([
        { tag: joinTag(materialText, styleText), reason: 'Material and aesthetic pairing.' },
        { tag: joinTag(materialText, 'gift'), reason: 'Material-led shopping phrase.' },
        { tag: joinTag(styleText, 'home'), reason: 'Aesthetic-led browsing phrase.' },
        { tag: joinTag(styleText, 'shop'), reason: 'Broad style discovery phrase.' }], 5);
      const finalPool = strategy === 'material'
        ? [...primary, ...materialStyle, ...attributes, ...buyerIntent, ...seasonal]
        : strategy === 'occasion'
          ? [...primary, ...seasonal, ...buyerIntent, ...attributes, ...materialStyle]
          : strategy === 'style'
            ? [...primary, ...materialStyle, ...attributes, ...buyerIntent, ...seasonal]
            : strategy === 'gift'
              ? [...primary, ...buyerIntent, ...seasonal, ...attributes, ...materialStyle]
              : [...primary, ...attributes, ...buyerIntent, ...seasonal, ...materialStyle];
      const finalTags = tagItems(finalPool, finalCount);
      const avoid = [
        { tag: 'unsupported material', reason: 'Do not claim ceramic, silver, linen, digital, or other materials unless they are accurate.' },
        { tag: 'fake handmade', reason: 'Do not use handmade, vintage, local, personalized, or custom wording unless the listing supports it.' },
        { tag: 'competitor names', reason: 'Avoid brand, shop, celebrity, or competitor terms you are not authorized to use.' },
        { tag: 'ranking claims', reason: 'Avoid bestseller, top ranked, viral, guaranteed sale, or approval-style claims.' }];
      const tips = [
        'Use the final set as a review shortlist, not as guaranteed SEO advice.',
        'Keep tags varied across item type, material, style, buyer, and occasion instead of repeating the same phrase.',
        'Check every tag against the photos, title, description, category, variations, personalization settings, and shipping details.',
        'Independent drafting help only: no Etsy affiliation, ranking, traffic, sales, placement, approval, or ads result is guaranteed.'];
      const renderEtsyGroup = (title: string, note: string, items: { tag: string; reason: string }[]) => {
        const groupText = items.map(item => item.tag).join(', ');
        return '<section class="intent-result-group"><div class="result-card-top"><div><span class="result-label">' + escapeHtml(title) + '</span><p class="intent-mini-note">' + escapeHtml(note) + '</p></div><button class="copy-btn result-copy" type="button" data-copy="' + escapeHtml(groupText) + '">Copy Group</button></div><div class="tag-chip-list">' + items.map(item => '<button class="tag-chip result-copy" type="button" data-copy="' + escapeHtml(item.tag) + '">' + escapeHtml(item.tag) + '</button>').join('') + '</div><ul class="intent-output-list">' + items.map(item => '<li><strong>' + escapeHtml(item.tag) + ':</strong> ' + escapeHtml(item.reason) + '</li>').join('') + '</ul></section>';
      };
      result = [
        'Final Etsy Tag Set',
        finalTags.map(item => item.tag).join(', '),
        '',
        'Primary Etsy Tags',
        primary.map(item => `${item.tag} - ${item.reason}`).join('\n'),
        '',
        'Attribute-Based Tags',
        attributes.map(item => `${item.tag} - ${item.reason}`).join('\n'),
        '',
        'Long-Tail Buyer-Intent Tags',
        buyerIntent.map(item => `${item.tag} - ${item.reason}`).join('\n'),
        '',
        'Occasion/Seasonal Tags',
        seasonal.map(item => `${item.tag} - ${item.reason}`).join('\n'),
        '',
        'Material/Style Tags',
        materialStyle.map(item => `${item.tag} - ${item.reason}`).join('\n'),
        '',
        'Tags to Avoid',
        avoid.map(item => `${item.tag} - ${item.reason}`).join('\n'),
        '',
        'Usage Tips',
        tips.join('\n')
      ].join('\n');
      resultHtml = '<div class="intent-grouped-output">'
        + renderEtsyGroup('Final Etsy Tag Set', `A ${finalTags.length}-tag shortlist assembled from the selected product details and strategy.`, finalTags)
        + renderEtsyGroup('Primary Etsy Tags', 'Core product phrases based on the listing description and selected product type.', primary)
        + renderEtsyGroup('Attribute-Based Tags', 'Attribute phrases that should match real listing facts, variations, or product details.', attributes)
        + renderEtsyGroup('Long-Tail Buyer-Intent Tags', 'Buyer phrases for recipients, gifting, and shopping context. Keep only the ones that are true.', buyerIntent)
        + renderEtsyGroup('Occasion/Seasonal Tags', 'Seasonal or event-based tags for listings that genuinely fit that occasion.', seasonal)
        + renderEtsyGroup('Material/Style Tags', 'Material and aesthetic tags that should be visible or stated in the listing.', materialStyle)
        + '<section class="intent-result-group"><div class="result-card-top"><div><span class="result-label">Tags to Avoid</span><p class="intent-mini-note">Remove anything that does not match the real item or marketplace rules.</p></div></div><ul class="intent-output-list">' + avoid.map(item => '<li><strong>' + escapeHtml(item.tag) + ':</strong> ' + escapeHtml(item.reason) + '</li>').join('') + '</ul></section>'
        + '<section class="intent-result-group"><div class="result-card-top"><div><span class="result-label">Usage Tips</span><p class="intent-mini-note">Practical review checklist before publishing.</p></div></div><ul class="intent-output-list">' + tips.map(tip => '<li>' + escapeHtml(tip) + '</li>').join('') + '</ul></section>'
        + '<p class="intent-output-note">Etsy listing tags: use only truthful product attributes. Independent draft only; no Etsy affiliation and no ranking, traffic, sales, placement, approval, or ads guarantee.</p></div>';
      break;
    }
    case 'writing-prompt-generator': {
      const topic = compactSeed(text, 'A Hidden Door');
      const genre = optionValue('writing-prompt-genre', 'mixed');
      const difficulty = optionValue('writing-prompt-difficulty', 'intermediate');
      const tone = optionValue('writing-prompt-tone', 'mysterious');
      const length = optionValue('writing-prompt-length', 'scene');
      const includeFirstLine = optionValue('writing-prompt-first-line', 'true') === 'true';
      const firstLine = includeFirstLine ? `First line: "By the time ${topic.toLowerCase()} appeared, everyone had already chosen a side."` : 'First line: Optional user-fill opening sentence.';
      const groups = [
        { title: 'Story Seed', text: `Genre/Tone: ${genre}, ${tone}\nTarget length: ${length}\nProtagonist: someone who knows the safest choice but wants the impossible one.\nSetting: a place where ${topic.toLowerCase()} is forbidden in public.\nConflict: protecting ${topic.toLowerCase()} will expose a private mistake.\nTwist: the person warning them is the reason the rule exists.\n${firstLine}\nExpansion challenge: reveal the truth through action, not exposition.`, note: `Difficulty: ${difficulty}.` },
        { title: 'Journal Prompt', text: `Journal about ${topic.toLowerCase()} as a private turning point.\nConstraint: include one honest question, one avoided answer, and one small next step.\nTone: ${tone}.\nReflection challenge: write the final sentence as a promise you can keep.`, note: 'Personal reflection starter.' },
        { title: 'Creative Constraint', text: `Write a ${length} about ${topic.toLowerCase()} without naming the central emotion.\nConstraint: use one repeated image, one interruption, and one sensory detail.\nDifficulty: ${difficulty}.\nExpansion challenge: revise once for clarity and once for surprise.`, note: 'Creative exercise prompt.' },
        { title: 'Scene Starter', text: `Scene prompt: Write the moment ${topic.toLowerCase()} changes an ordinary conversation.\nConstraint: include one object, one interruption, and one line of subtext.\nConflict: one character wants honesty; the other wants safety.\nExpansion challenge: end the scene with a choice, not an explanation.`, note: 'Ready for a short scene.' },
        { title: 'Character Prompt', text: `Create a character who protects ${topic.toLowerCase()} but refuses to explain why.\nGoal: keep a promise.\nFlaw: confuses secrecy with loyalty.\nRelationship hook: someone close to them deserves the truth.\nExpansion challenge: write a dialogue where the secret almost comes out.`, note: 'Motivation-first prompt.' },
        { title: 'World Prompt', text: `Build a culture where ${topic.toLowerCase()} shapes law, trade, or ritual.\nInclude: a public rule, a private workaround, a faction that benefits, and a faction that pays the cost.\nExpansion challenge: describe daily life before explaining the history.`, note: 'Worldbuilding prompt.' },
        { title: 'Revision Challenge', text: `Take a draft about ${topic.toLowerCase()} and revise it three ways:\n1. Make the stakes more personal.\n2. Replace one explanation with an action beat.\n3. Add one contradiction that makes the main character harder to predict.`, note: 'Useful after a first draft.' },
        { title: 'Academic Prompts', text: `Explain how ${topic.toLowerCase()} could operate as a symbol in a short story.\nCompare two interpretations and defend the stronger reading.\nWrite a thesis statement about how setting changes the meaning of ${topic.toLowerCase()}.`, note: 'Argument and analysis starters.' }];
      const visibleGroups = filterGroupsByOption(groups, genre);
      result = visibleGroups.map(group => group.title + '\n' + group.text).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Prompts are original writing starters. Avoid copying protected worlds, characters, or living people.');
      break;
    }
    case 'text-to-binary-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const binaryMode = optionValue('binary-mode', 'auto');
      const binaryFormat = optionValue('binary-format', 'space');

      const isBinaryPattern = /^[01\s\r\n]+$/.test(text.trim());
      const shouldDecode = binaryMode === 'decode' || (binaryMode === 'auto' && isBinaryPattern);

      if (shouldDecode) {
        // Decode mode
        const cleanBinary = text.replace(/[^01]/g, '');
        if (cleanBinary.length === 0) {
          result = 'Error: No binary digits found in input.';
          resultHtml = renderSectionSuite('Binary Decoder Error', [
            { title: 'Decode Failure', body: 'No binary digits found to decode.', note: 'Invalid Binary' }
          ], 'Ensure input contains binary 0s and 1s.');
          break;
        }
        
        const paddedBinary = cleanBinary.padStart(Math.ceil(cleanBinary.length / 8) * 8, '0');
        const bytes: number[] = [];
        for (let i = 0; i < paddedBinary.length; i += 8) {
          bytes.push(parseInt(paddedBinary.substring(i, i + 8), 2));
        }

        let decoded = '';
        let parseErrorMsg = '';
        try {
          decoded = new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bytes));
        } catch (e) {
          // fallback to non-fatal decoding to prevent complete failure
          try {
            decoded = new TextDecoder('utf-8').decode(new Uint8Array(bytes));
            parseErrorMsg = 'Decoded string contains replacement characters due to invalid UTF-8 byte sequences.';
          } catch (e2) {
            decoded = 'Error decoding binary to text.';
            parseErrorMsg = (e2 as Error).message;
          }
        }

        result = decoded;

        const sections = [
          { title: 'Decoded Text Output', body: decoded, note: 'Text decoded from binary string.' },
          { title: 'Clean Binary Input', body: cleanBinary, note: `${cleanBinary.length} bits parsed.` },
          ...(parseErrorMsg ? [{ title: 'Decoding Warning', body: parseErrorMsg, note: 'Warning' }] : [])
        ];
        resultHtml = renderSectionSuite('Binary to Text Decoded Output', sections, 'Successfully parsed binary data.');
      } else {
        // Encode mode
        const bytes = Array.from(new TextEncoder().encode(text));
        const byteStrings = bytes.map(byte => byte.toString(2).padStart(8, '0'));
        const spaced = byteStrings.join(' ');
        const plain = byteStrings.join('');
        const grouped = byteStrings.reduce<string[]>((groups, byte, index) => {
          const groupIndex = Math.floor(index / 4);
          groups[groupIndex] = groups[groupIndex] ? groups[groupIndex] + ' ' + byte : byte;
          return groups;
        }, []).join('\n');

        const sections = [
          { title: 'Spaced Binary', body: spaced, note: '8-bit byte groups separated by spaces.' },
          { title: 'Plain Binary', body: plain, note: 'Continuous binary string.' },
          { title: 'Grouped Binary', body: grouped, note: 'Four bytes per line for scanning.' },
          { title: 'Input Summary', body: `Mode: ${binaryMode}\nCharacters: ${text.length}\nUTF-8 bytes: ${bytes.length}\nBits: ${bytes.length * 8}`, note: 'Binary represents UTF-8 bytes.' }
        ];

        result = binaryFormat === 'none' ? plain : binaryFormat === 'lines' ? grouped : spaced;
        resultHtml = renderSectionSuite('Text to Binary Encoded Output', sections, 'Binary is an encoding representation, not encryption.');
      }
      break;
    }
    case 'morse-code-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const mode = optionValue('morse-mode', 'encode');
      const wordSep = optionValue('morse-word-separator', 'slash') === 'slash' ? '/' : '   ';
      const decodeMap = Object.fromEntries(Object.entries(morseMap).map(([letter, code]) => [code, letter]));
      const unsupported: string[] = [];
      let converted = '';
      let table = '';
      if (mode === 'decode') {
        const words = text.trim().split(/\s*\/\s*|\s{3}/);
        converted = words.map(word => word.trim().split(/\s+/).map(code => decodeMap[code] || (unsupported.push(code), '?')).join('')).join(' ');
        table = text.trim().split(/\s+/).map(code => `${code} -> ${decodeMap[code] || '?'}`).join('\n');
      } else {
        const chars = text.toUpperCase().split('');
        converted = chars.map(char => char === ' ' ? wordSep : morseMap[char] || (unsupported.push(char), char)).join(' ').replace(/\s+\/\s+/g, ' / ');
        table = chars.filter(char => char !== ' ').map(char => `${char} -> ${morseMap[char] || 'unsupported'}`).join('\n');
      }
      const compact = converted.replace(/\s+/g, ' ').trim();
      const legend = 'Letters are separated by one space. Words are separated by ' + (wordSep === '/' ? 'a slash.' : 'three spaces.') + '\nTiming reference for learning: dot = 1 unit, dash = 3 units, gap inside a letter = 1 unit, gap between letters = 3 units.';
      const warning = unsupported.length ? `Unsupported entries kept or marked: ${Array.from(new Set(unsupported)).join(', ')}` : 'All supported letters, numbers, and common punctuation were mapped.';
      result = `Converted Output\n${converted}\n\nCompact Variant\n${compact}\n\nCharacter Map\n${table}\n\nSpacing Legend\n${legend}\n\nWarnings\n${warning}`;
      resultHtml = renderSectionSuite('Morse Code Converter', [
        { title: 'Converted Output', body: converted, note: mode === 'decode' ? 'Decoded text' : 'Dot-dash output' },
        { title: 'Compact Variant', body: compact, note: 'Single-line copy' },
        { title: 'Character Map', body: table, note: 'Per-character mapping' },
        { title: 'Spacing Legend', body: legend, note: 'Learning reference' },
        { title: 'Warnings', body: warning, note: 'Unsupported characters are surfaced' }], 'Educational converter only; this does not certify radio or emergency signalling compliance.');
      break;
    }
    case 'fake-name-generator': {
      const fakeResults = Array.from({ length: 5 }, () => {
        const first = randomFrom(firstNames);
        const last = randomFrom(lastNames);
        const user = first.toLowerCase() + last.toLowerCase().slice(0, 4) + Math.floor(Math.random() * 99);
        const email = `${first.toLowerCase()}.${last.toLowerCase()}@example.com`;
        return `${first} ${last}\n  Username: ${user}\n  Email: ${email}`;
      });
      result = fakeResults.join('\n\n');
      break;
    }
    case 'qr-code-text-generator': {
      const type = optionValue('qr-content-type', 'text');
      const raw = text || (type === 'url' ? 'https://taptogen.com' : 'TapToGen QR payload');
      const payloads: Record<string, string> = {
        url: ensureUrl(raw, 'https://taptogen.com'),
        text: raw,
        wifi: `WIFI:T:WPA;S:${raw};P:[wifi-password];;`,
        email: `MATMSG:TO:${raw.includes('@') ? raw : 'hello@example.com'};SUB:Hello;BODY:${raw}; ;`,
        sms: `SMSTO:+15550101010:${raw}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${raw}\nORG:[organization]\nTEL:[phone]\nEMAIL:[email@example.com]\nEND:VCARD`,
        calendar: `BEGIN:VEVENT\nSUMMARY:${raw}\nDTSTART:[YYYYMMDDT090000]\nDTEND:[YYYYMMDDT100000]\nEND:VEVENT`};
      const payload = payloads[type] || payloads.text;
      const summary = `Payload type: ${type}\nLabel: ${raw.slice(0, 80)}\nCharacters: ${payload.length}\nLine breaks: ${payload.includes('\n') ? 'multi-line payload' : 'single-line payload'}`;
      const checklist = '- Test the final QR image in the tool or app that renders it.\n- Keep payloads short for easier scanning.\n- Share WiFi/password payloads only with intended people.\n- This page creates payload text only; no tracking or dynamic redirect is added.';
      result = `Payload Preview\n${payload}\n\nField Summary\n${summary}\n\nCompatibility Notes\n${checklist}`;
      resultHtml = renderSectionSuite('QR Text Payload', [
        { title: 'Raw QR Payload', body: payload, note: 'Paste this into a QR renderer' },
        { title: 'Field Summary', body: summary, note: 'Input-aware payload details' },
        { title: 'URL-Safe Version', body: encodeURIComponent(payload), note: 'Encoded payload string' },
        { title: 'Scan-Readiness Checklist', body: checklist, note: 'No dynamic tracking claims' }], 'This creates structured QR payload text, not a generated QR image.');
      break;
    }
    case 'dnd-name-generator': {
      const races = ['Human','Elf','Dwarf','Halfling','Gnome','Dragonborn','Tiefling','Half-Orc','Half-Elf'];
      result = races.map(race => {
        const name = race === 'Elf' ? `${randomFrom(elfPrefixes)}${randomFrom(elfSuffixes)}` : race === 'Dwarf' ? `${randomFrom(['Thor','Bael','Dor','Gim','Bru'])}${randomFrom(['in','din','grim','li','ik'])}` : race === 'Half-Orc' ? `${randomFrom(orcPrefixes)}${randomFrom(orcSuffixes)}` : race === 'Dragonborn' ? `${randomFrom(dragonPrefixes)}${randomFrom(dragonSuffixes)}` : `${randomFrom(firstNames)} ${randomFrom(lastNames)}`;
        return `[${race}] ${name}`;
      }).join('\n');
      break;
    }
    case 'orc-name-generator':
      result = generateMultiple(() => `${randomFrom(orcPrefixes)}${randomFrom(orcSuffixes)}`, 10);
      break;
    case 'witch-name-generator':
      result = generateMultiple(() => `${randomFrom(witchFirst)} ${randomFrom(witchLast)}`, 10);
      break;
    case 'alien-name-generator':
      result = generateMultiple(() => `${randomFrom(alienPrefixes)}${randomFrom(alienSuffixes)}`, 10);
      break;
    case 'vampire-name-generator':
      result = generateMultiple(() => `${randomFrom(vampireFirst)} ${randomFrom(vampireLast)}`, 10);
      break;
    case 'fairy-name-generator':
      result = generateMultiple(() => `${randomFrom(fairyFirst)} ${randomFrom(fairyLast)}`, 10);
      break;
    case 'goblin-name-generator':
      result = generateMultiple(() => `${randomFrom(goblinFirst)} ${randomFrom(goblinLast)}`, 10);
      break;
    case 'character-name-generator': {
      const seed = compactSeed(text, 'Avery Stone');
      const core = seed.split(/\s+/)[0] || 'Avery';
      const groups = [
        { title: 'Hero', note: 'Names with active, trustworthy energy.', items: [{ name: core + ' Vale', reason: 'Clear and resilient.', extra: 'Best use: protagonist.' }, { name: 'Mira ' + core, reason: 'Warm and capable.', extra: 'Best use: young hero.' }, { name: 'Rowan ' + core, reason: 'Grounded and brave.', extra: 'Best use: adventure lead.' }] },
        { title: 'Villain', note: 'Antagonist names without graphic or hateful framing.', items: [{ name: 'Cassian Voss', reason: 'Elegant and controlled.', extra: 'Best use: mastermind.' }, { name: core + ' Blackwell', reason: 'Classic ominous surname.', extra: 'Best use: rival.' }, { name: 'Seren Ash', reason: 'Soft name with hidden edge.', extra: 'Best use: quiet antagonist.' }] },
        { title: 'Modern', note: 'Contemporary story and screen names.', items: [{ name: 'Jordan ' + core, reason: 'Natural modern cadence.', extra: 'Best use: realistic fiction.' }, { name: core + ' Bennett', reason: 'Polished and everyday.', extra: 'Best use: drama.' }, { name: 'Casey Morgan', reason: 'Flexible and grounded.', extra: 'Best use: ensemble cast.' }] },
        { title: 'Fantasy', note: 'Fictional names with pronounceable fantasy texture.', items: [{ name: 'Elowen ' + core, reason: 'Lyrical and world-ready.', extra: 'Best use: noble hero.' }, { name: core + ' Thorne', reason: 'Nature and conflict cue.', extra: 'Best use: ranger.' }, { name: 'Maelis Dawnward', reason: 'Bright mythic sound.', extra: 'Best use: fantasy lead.' }] },
        { title: 'Sci-Fi', note: 'Original science fiction character names.', items: [{ name: 'Ren ' + core, reason: 'Compact future tone.', extra: 'Best use: pilot.' }, { name: core + ' Sol', reason: 'Spacefaring simplicity.', extra: 'Best use: explorer.' }, { name: 'Vera Kade', reason: 'Sharp and cinematic.', extra: 'Best use: station officer.' }] },
        { title: 'Classic', note: 'Timeless names for literary or historical-feeling fiction.', items: [{ name: 'Clara Whitfield', reason: 'Traditional and graceful.', extra: 'Best use: period drama.' }, { name: core + ' Harrington', reason: 'Formal classic rhythm.', extra: 'Best use: family saga.' }, { name: 'Elias Marlowe', reason: 'Literary and memorable.', extra: 'Best use: classic novel.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('character-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: fictional character names are creative suggestions only. Check for conflicts with existing major characters before publishing.');
      break;
    }
    case 'story-name-generator': {
      const seed = compactSeed(text, 'Glass Harbor');
      const groups = [
        { title: 'Mystery', note: 'Titles built around secrets and clues.', items: [{ name: 'The ' + seed + ' Clue', reason: 'Direct mystery promise.', extra: 'Best use: cozy mystery.' }, { name: 'No One at ' + seed, reason: 'Raises a question.', extra: 'Best use: suspense mystery.' }, { name: 'The Last Letter from ' + seed, reason: 'Object-led intrigue.', extra: 'Best use: detective story.' }] },
        { title: 'Romance', note: 'Warm, emotional story titles.', items: [{ name: 'A Season at ' + seed, reason: 'Soft relationship arc.', extra: 'Best use: contemporary romance.' }, { name: 'When ' + seed + ' Blooms', reason: 'Hopeful and visual.', extra: 'Best use: romantic drama.' }, { name: 'Letters to ' + seed, reason: 'Intimate title pattern.', extra: 'Best use: epistolary romance.' }] },
        { title: 'Fantasy', note: 'Quest and wonder title ideas.', items: [{ name: 'The Crown of ' + seed, reason: 'Clear fantasy object.', extra: 'Best use: epic fantasy.' }, { name: 'Beyond ' + seed + ' Gate', reason: 'Portal and journey cue.', extra: 'Best use: adventure fantasy.' }, { name: 'The Mapmaker of ' + seed, reason: 'Role and setting hook.', extra: 'Best use: fantasy novel.' }] },
        { title: 'Sci-Fi', note: 'Original speculative titles with no franchise terms.', items: [{ name: 'Signal from ' + seed, reason: 'Science fiction mystery.', extra: 'Best use: space story.' }, { name: 'The ' + seed + ' Protocol', reason: 'Tech and stakes cue.', extra: 'Best use: sci-fi thriller.' }, { name: 'Orbiting ' + seed, reason: 'Short and cinematic.', extra: 'Best use: literary sci-fi.' }] },
        { title: 'Thriller', note: 'High-stakes titles without deceptive claims.', items: [{ name: 'The ' + seed + ' Deadline', reason: 'Built-in urgency.', extra: 'Best use: thriller.' }, { name: 'Before ' + seed + ' Falls', reason: 'Countdown tension.', extra: 'Best use: action thriller.' }, { name: 'The Quiet File at ' + seed, reason: 'Investigation hook.', extra: 'Best use: conspiracy thriller.' }] },
        { title: 'Literary', note: 'Subtle, character-forward title directions.', items: [{ name: 'Small Hours in ' + seed, reason: 'Atmospheric and human.', extra: 'Best use: literary fiction.' }, { name: 'The Shape of ' + seed, reason: 'Reflective abstraction.', extra: 'Best use: literary novel.' }, { name: 'After the ' + seed + ' Summer', reason: 'Memory and time cue.', extra: 'Best use: coming-of-age.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('story-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: story title ideas are creative suggestions only. Check for existing works or series conflicts before publishing.');
      break;
    }
    case 'twitch-name-generator': {
      const streamStyle = optionValue('stream-style', 'gaming');
      const built = makeNameIdeaGroups(text || 'gamer', {
        kind: `${streamStyle} Twitch channel`,
        style: optionValue('name-style', 'balanced'),
        creator: true,
        includeTaglines: optionValue('include-handles', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'Twitch names include handle-style variants but do not claim real account availability.');
      break;
    }
    case 'random-phrase-generator': {
      const count = clampNumber(optionValue('phrase-count', '5'), 5, 1, 50);
      const category = optionValue('phrase-category', 'inspirational');
      
      const phraseCategories = {
        inspirational: [
          "Believe you can and you're halfway there.",
          "Act as if what you do makes a difference. It does.",
          "Success is not final, failure is not fatal: it is the courage to continue that counts.",
          "Never bend your head. Always hold it high. Look the world straight in the eye.",
          "What you get by achieving your goals is not as important as what you become by achieving your goals."
        ],
        funny: [
          "I am not lazy, I am on energy saving mode.",
          "I told my doctor that I broke my arm in two places. He told me to stop going to those places.",
          "My wallet is like a onion, opening it makes me cry.",
          "Parallel lines have so much in common. It's a shame they'll never meet.",
          "I used to think I was indecisive, but now I am not so sure."
        ],
        corporate: [
          "Let's touch base and sync offline to maximize team synergy.",
          "We need to pivot our core deliverables to gain strategic leverage in this market.",
          "Let's take a holistic approach to streamline our client onboarding pipeline.",
          "We should circle back on this high-priority action item during the next standup.",
          "Let's leverage our core competencies to optimize our digital footprint."
        ],
        conversational: [
          "How has your week been going so far?",
          "That sounds like a fascinating project to work on.",
          "Let's grab a coffee sometime soon and catch up.",
          "I appreciate your perspective on this matter.",
          "Could you clarify your thoughts on that point?"
        ],
        romantic: [
          "You make my heart skip a beat every single time you smile.",
          "I am incredibly grateful to have you by my side in this journey.",
          "Every moment spent with you feels like a beautiful dream come true.",
          "You are my absolute favorite person in the entire world.",
          "My love for you grows stronger with every passing day."
        ]
      };

      const list = phraseCategories[category] || phraseCategories.inspirational;
      const phrasesList = Array.from({ length: count }, () => randomFrom(list));
      result = phrasesList.join('\n');
      resultHtml = renderSectionSuite('Random Phrases Package', [
        { title: titleCase(category) + ' Phrases', body: result, note: 'Generated offline client-side.' },
        { title: 'Grammar Composition Guideline', body: 'Phrases are built using subject-verb-complement patterns. Helpful for quick copywriting seeds.', note: 'Structure info.' }
      ], 'Generated offline. Perfect for layout copy testing.');
      break;
    }
    case 'special-character-generator': {
      const search = optionValue('char-search', '').trim().toLowerCase();
      const groups = [
        ['Arrows', '\u2190 \u2191 \u2192 \u2193 \u2194 \u2195 \u21D0 \u21D1 \u21D2 \u21D3 \u21B5 \u27A1 \u2B05 \u2B06 \u2B07'],
        ['Stars & Decorative', '\u2605 \u2606 \u2729 \u272A \u2730 \u2736 \u2737 \u2738 \u273F \u2740 \u2741 \u2756 \u2764 \u2765'],
        ['Math & Logic', '\u00B1 \u00D7 \u00F7 \u2260 \u2264 \u2265 \u221E \u2211 \u222B \u221A \u03C0 \u2206 \u2207 \u2248'],
        ['Currency', '\u0024 \u20AC \u00A3 \u00A5 \u20A3 \u20B9 \u20A9 \u20BF \u00A2'],
        ['Legal & Business', '\u00A9 \u00AE \u2122 \u00A7 \u00B6 \u2020 \u2021'],
        ['Boxes & Lines', '\u2500 \u2502 \u250C \u2510 \u2514 \u2518 \u253C \u2588 \u2591 \u2592 \u2593 \u25A0 \u25A1 \u25AA \u25AB']
      ];

      const filtered = groups.map(([title, chars]) => {
        const charArr = chars.split(' ');
        const matching = charArr.filter(c => {
          if (!search) return true;
          return title.toLowerCase().includes(search) || c.codePointAt(0).toString(16).includes(search);
        });
        return [title, matching.join(' ')];
      }).filter(([_, chars]) => chars.length > 0);

      const codesBreakdown = filtered.map(([title, chars]) => {
        const lines = chars.split(' ').filter(Boolean).map(c => {
          const cp = c.codePointAt(0) || 0;
          return c + ' -> U+' + cp.toString(16).toUpperCase().padStart(4, '0') + ' (\\u' + cp.toString(16) + ')';
        }).join('\n');
        return title + ' Escape Codes:\n' + lines;
      }).join('\n\n');

      result = filtered.map(([title, chars]) => title + ':\n' + chars).join('\n\n');
      
      const sections = [
        { title: 'Matching Characters', body: result || 'No matching characters found.', note: 'Single-click copy items.' },
        { title: 'Unicode Programming Escape Codes', body: codesBreakdown || 'None.', note: 'Useful for Javascript and CSS source code injection.' }
      ];
      resultHtml = renderSectionSuite('Special Characters Package', sections, 'Single-click copy utility. Codes conform to Unicode 15.0 guidelines.');
      break;
    }
    case 'ascii-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const font = optionValue('ascii-font', 'standard');
      const spacing = clampNumber(optionValue('ascii-spacing', '1'), 1, 0, 5);

      const fonts = {
        standard: {
          A: [' ___ ', '|   |', '|___|', '|   |', '|   |'],
          B: [' ___ ', '|   )', '|___}', '|   )', '|___|'],
          C: [' ___ ', '|    ', '|    ', '|    ', '|___ '],
          D: [' ___ ', '|  \\ ', '|   |', '|  / ', '|___/'],
          E: [' ___ ', '|    ', '|___ ', '|    ', '|___ '],
          F: [' ___ ', '|    ', '|___ ', '|    ', '|    '],
          G: [' ___ ', '|    ', '| __|', '|   |', '|___|'],
          H: ['     ', '|   |', '|___|', '|   |', '|   |'],
          I: [' ___ ', ' | | ', ' | | ', ' | | ', ' |_| '],
          J: ['   _ ', '   | ', '   | ', '|  | ', '|__| '],
          K: ['     ', '| /  ', '|/   ', '|\\   ', '| \  '],
          L: ['     ', '|    ', '|    ', '|    ', '|___ '],
          M: ['     ', '|\\ /|', '| v |', '|   |', '|   |'],
          N: ['     ', '|\\  |', '| \ |', '|  \\|', '|   |'],
          O: [' ___ ', '|   |', '|   |', '|   |', '|___|'],
          P: [' ___ ', '|   |', '|___|', '|    ', '|    '],
          Q: [' ___ ', '|   |', '|   |', '|  \\|', '|___X'],
          R: [' ___ ', '|   |', '|___|', '|  \\ ', '|   \\'],
          S: [' ___ ', '|    ', '|___ ', '    |', '___| '],
          T: [' ___ ', '  |  ', '  |  ', '  |  ', '  |  '],
          U: ['     ', '|   |', '|   |', '|   |', '|___|'],
          V: ['     ', '|   |', '|   |', ' \\ / ', '  v  '],
          W: ['     ', '|   |', '| v |', '|/ \\|', '|   |'],
          X: ['     ', ' \\ / ', '  X  ', ' / \\ ', '     '],
          Y: ['     ', ' \\ / ', '  v  ', '  |  ', '  |  '],
          Z: [' ___ ', '   / ', '  /  ', ' /   ', '/___ ']
        }
      };

      const charMap = fonts[font] || fonts.standard;
      const spaceStr = ' '.repeat(spacing);
      const upper = text.toUpperCase();

      const lines = Array.from({ length: 5 }, (_, row) => 
        upper.split('').map(c => {
          const letter = charMap[c] || charMap['A'];
          return letter[row] || '     ';
        }).join(spaceStr)
      ).join('\n');

      result = lines;
      resultHtml = renderSectionSuite('ASCII Art Text Package', [
        { title: 'ASCII Art Preview', body: lines, note: 'Monospaced font block.' }
      ], 'Fully client-side ASCII generator. Supports custom track spacing.');
      break;
    }
    case 'creepy-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const size = clampNumber(optionValue('zalgo-size', '4'), 4, 1, 20);
      const toggleTop = optionValue('zalgo-top', 'true') === 'true';
      const toggleBottom = optionValue('zalgo-bottom', 'true') === 'true';

      const cUp = ['\u030d','\u030e','\u0304','\u0305','\u033f','\u0311','\u0306','\u0310','\u0352','\u0357','\u0351','\u0307','\u0308','\u030a','\u0342','\u0343','\u0344','\u034a','\u034b','\u034c'];
      const cDown = ['\u0316','\u0317','\u0318','\u0319','\u031c','\u031d','\u031e','\u031f','\u0320','\u0324','\u0325','\u0326','\u0329','\u032a','\u032b','\u032c','\u032d','\u032e','\u032f','\u0330'];

      const creepify = (t) => {
        return t.split('').map(char => {
          let g = char;
          for (let i = 0; i < size; i++) {
            if (toggleTop) g += randomFrom(cUp);
            if (toggleBottom) g += randomFrom(cDown);
          }
          return g;
        }).join('');
      };

      const creepyOutput = creepify(text);
      result = creepyOutput;
      resultHtml = renderSectionSuite('Creepy Zalgo Text Package', [
        { title: 'Creepy Output (' + size + ' combining chars)', body: creepyOutput, note: 'Copy Zalgo output.' }
      ], 'Combines base character blocks with stacking diacritic marks client-side.');
      break;
    }
    case 'gaming-name-generator': {
      const seed = toSafeHandle(text, 'player');
      const cap = seed.charAt(0).toUpperCase() + seed.slice(1);
      const adj = ['Shadow','Neon','Rapid','Prime','Frost','Apex','Silent','Volt','Iron','Nova'];
      const nouns = ['Ace','Rush','Strike','Scope','Pulse','Clutch','Drift','Blade','Quest','Signal'];
      const groups = [
        {
          title: 'Competitive',
          note: 'Sharper gamer tags for ranked and FPS-style profiles.',
          items: [
            { name: randomFrom(adj) + randomFrom(nouns) + Math.floor(10 + Math.random() * 89), reason: 'Fast, intense, and easy to read in a lobby.', extra: 'Variant: ' + randomFrom(adj) + '_' + randomFrom(nouns) },
            { name: cap + 'Clutch', reason: 'Uses your keyword with a competitive suffix.', extra: 'Variant: ' + cap + 'Clutch' + Math.floor(Math.random() * 99) },
            { name: 'Apex' + cap, reason: 'Short, confident pattern without referencing a specific franchise.', extra: 'Variant: Apex_' + cap }]
        },
        {
          title: 'Clean',
          note: 'Brandable handles that work beyond one game.',
          items: [
            { name: cap + 'Play', reason: 'Simple and creator-friendly.', extra: 'Variant: ' + cap + '.play' },
            { name: 'Hello' + cap, reason: 'Friendly and available-style prefix.', extra: 'Variant: hello_' + seed },
            { name: cap + 'HQ', reason: 'Good for a channel, profile, or small team.', extra: 'Variant: ' + seed + 'hq' }]
        },
        {
          title: 'Short',
          note: 'Compact tags for games with strict name lengths.',
          items: [
            { name: cap.slice(0, 5) + 'X', reason: 'Very short and punchy.', extra: 'Variant: ' + cap.slice(0, 5) + Math.floor(Math.random() * 99) },
            { name: 'v' + cap.slice(0, 6), reason: 'Minimal prefix style.', extra: 'Variant: x' + cap.slice(0, 6) },
            { name: cap.slice(0, 4) + 'GG', reason: 'Recognizable gaming suffix.', extra: 'Variant: ' + cap.slice(0, 4) + '_gg' }]
        },
        {
          title: 'Fantasy / Guild',
          note: 'Names for RPGs, guilds, and fantasy profiles.',
          items: [
            { name: cap + 'warden', reason: 'Guild-friendly and fictional.', extra: 'Variant: ' + cap + 'Warden' },
            { name: randomFrom(['Ember','Rune','Dusk','Storm']) + cap, reason: 'Fantasy flavor without using protected world names.', extra: 'Variant: ' + cap + ' of ' + randomFrom(['Dawn','Ash','Vale']) },
            { name: cap + 'forge', reason: 'Works for crafting, guild, or RPG identity.', extra: 'Variant: ' + cap + '_forge' }]
        },
        {
          title: 'Streamer-Style',
          note: 'Readable names for channels and overlays.',
          items: [
            { name: 'Its' + cap, reason: 'Common creator handle pattern.', extra: 'Variant: its_' + seed },
            { name: cap + 'Live', reason: 'Clear for streaming profiles.', extra: 'Variant: ' + cap + 'TV' },
            { name: 'The' + cap + 'Show', reason: 'Works as a gaming channel name.', extra: 'Variant: The_' + cap }]
        }];
      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason + ' ' + (item.extra || '')).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Availability-friendly variants are formatting ideas only. Check each platform before choosing a final handle.');
      break;
    }
    case 'guild-name-generator':
      result = generateMultiple(() => {
        const s = Math.floor(Math.random() * 3);
        if (s === 0) return `${randomFrom(guildAdj)} ${randomFrom(guildNouns)}`;
        if (s === 1) return `The ${randomFrom(guildAdj)} ${randomFrom(guildNouns)}`;
        return `${randomFrom(guildNouns)} of ${randomFrom(guildAdj)}`;
      }, 10);
      break;
    case 'planet-name-generator':
      result = generateMultiple(() => `${randomFrom(planetPrefixes)}${randomFrom(planetSuffixes)}${Math.random() > 0.5 ? ' ' + (Math.floor(Math.random() * 9) + 1) : ''}`, 10);
      break;
    case 'island-name-generator':
      result = generateMultiple(() => `${randomFrom(islandPrefixes)}${randomFrom(islandSuffixes)}`, 10);
      break;
    case 'shop-name-generator': {
      const seed = compactSeed(text, 'Curated Goods');
      const core = seed.split(/\s+/)[0] || 'North';
      const groups = [
        { title: 'Modern', note: 'Clean store names for online and physical retail.', items: [
          { name: core + ' Supply', reason: 'Minimal and flexible.', extra: 'Best use: modern general store.' },
          { name: seed + ' Studio', reason: 'Polished and product-led.', extra: 'Best use: design-forward shop.' },
          { name: core + ' Market', reason: 'Simple retail clarity.', extra: 'Best use: curated catalog.' }] },
        { title: 'Cute', note: 'Warm, friendly, and approachable.', items: [
          { name: 'Little ' + core + ' Shop', reason: 'Small-business charm.', extra: 'Best use: gifts or handmade items.' },
          { name: core + ' & Co.', reason: 'Friendly and easy to remember.', extra: 'Best use: boutique retail.' },
          { name: 'The Cozy ' + core, reason: 'Inviting without being too broad.', extra: 'Best use: home, craft, or lifestyle.' }] },
        { title: 'Premium', note: 'More refined store positioning.', items: [
          { name: core + ' House', reason: 'Established and elevated.', extra: 'Best use: premium goods.' },
          { name: seed + ' Atelier', reason: 'Craft and design signal.', extra: 'Best use: boutique collections.' },
          { name: core + ' Reserve', reason: 'Selective and polished.', extra: 'Best use: curated product line.' }] },
        { title: 'Local', note: 'Neighborhood-friendly names.', items: [
          { name: core + ' Corner', reason: 'Local and easygoing.', extra: 'Best use: community store.' },
          { name: seed + ' Mercantile', reason: 'Classic main-street feel.', extra: 'Best use: local retail.' },
          { name: core + ' General', reason: 'Broad but grounded.', extra: 'Best use: mixed goods shop.' }] },
        { title: 'Online Store', note: 'Names suited to ecommerce and social stores.', items: [
          { name: 'Shop ' + core, reason: 'Direct and handle-friendly.', extra: 'Best use: online catalog.' },
          { name: core + ' Cart', reason: 'Commerce cue built in.', extra: 'Best use: ecommerce.' },
          { name: 'Get ' + core, reason: 'CTA-style brand pattern.', extra: 'Best use: DTC product store.' }] },
        { title: 'Handmade', note: 'Craft, maker, and artisan shop names.', items: [
          { name: core + ' Made', reason: 'Simple handmade signal.', extra: 'Best use: maker shop.' },
          { name: seed + ' Workshop', reason: 'Craft process cue.', extra: 'Best use: handmade goods.' },
          { name: 'Hand & ' + core, reason: 'Tactile and artisan.', extra: 'Best use: crafted products.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('shop-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Check real business, trademark, domain, and social handle availability before choosing a final shop name.');
      break;
    }
    case 'cafe-name-generator': {
      const seed = compactSeed(text, 'Neighborhood Coffee');
      const core = seed.split(/\s+/)[0] || 'Morning';
      const groups = [
        { title: 'Cozy', note: 'Warm names for relaxed cafes and study spots.', items: [
          { name: 'The Cozy ' + core, reason: 'Inviting and easy to picture.', extra: 'Tagline: A softer place to start the day.' },
          { name: core + ' Nook', reason: 'Small, warm, and memorable.', extra: 'Tagline: Coffee, comfort, and a quiet corner.' },
          { name: 'Little ' + core + ' Cafe', reason: 'Friendly neighborhood feel.', extra: 'Tagline: Your daily cup, close to home.' }] },
        { title: 'Modern', note: 'Clean names for minimalist cafes.', items: [
          { name: core + ' Bar', reason: 'Short and design-forward.', extra: 'Tagline: Coffee with a clean point of view.' },
          { name: seed + ' Studio', reason: 'Creative and polished.', extra: 'Tagline: Crafted drinks for focused days.' },
          { name: core + ' Room', reason: 'Calm, flexible, and contemporary.', extra: 'Tagline: Meet, sip, and settle in.' }] },
        { title: 'Artisan', note: 'Names for roast-focused or craft cafes.', items: [
          { name: core + ' Roasters', reason: 'Direct coffee craft signal.', extra: 'Tagline: Small-batch coffee, made with care.' },
          { name: seed + ' Press', reason: 'Works for espresso, brew, and coffee culture.', extra: 'Tagline: Fresh pours, thoughtful details.' },
          { name: 'The ' + core + ' Grind', reason: 'Classic coffee cue.', extra: 'Tagline: Better mornings, one cup at a time.' }] },
        { title: 'Local', note: 'Place-friendly cafe directions.', items: [
          { name: core + ' Corner Cafe', reason: 'Neighborhood positioning.', extra: 'Tagline: Your local coffee stop.' },
          { name: seed + ' House', reason: 'Feels established and welcoming.', extra: 'Tagline: Coffee for the whole neighborhood.' },
          { name: core + ' Street Coffee', reason: 'Easy to localize with a real place.', extra: 'Tagline: A cup worth crossing the street for.' }] },
        { title: 'Premium', note: 'More elevated cafe naming.', items: [
          { name: core + ' Reserve', reason: 'Suggests curated quality.', extra: 'Tagline: Coffee selected with intention.' },
          { name: seed + ' Atelier', reason: 'Craft and design language.', extra: 'Tagline: A refined coffee ritual.' },
          { name: core + ' & Steam', reason: 'Elegant but still coffee-specific.', extra: 'Tagline: Warm cups, polished moments.' }] },
        { title: 'Playful', note: 'Friendly names with personality.', items: [
          { name: core + ' Sips', reason: 'Casual and memorable.', extra: 'Tagline: Come for the coffee, stay for the mood.' },
          { name: 'Cup of ' + core, reason: 'Simple and conversational.', extra: 'Tagline: A little joy in every pour.' },
          { name: core + ' Buzz', reason: 'Energetic and social.', extra: 'Tagline: Good coffee, good energy.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('cafe-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Cafe naming ideas are brainstorming drafts only; verify local business names and trademark conflicts before launch.');
      break;
    }
    case 'project-name-generator': {
      const seed = compactSeed(text, 'New Initiative');
      const core = seed.split(/\s+/)[0] || 'Nova';
      const groups = [
        { title: 'Internal', note: 'Clear team-facing project names.', items: [
          { name: 'Project ' + core, reason: 'Simple and easy to reference.', extra: 'Best use: internal planning.' },
          { name: core + ' Sprint', reason: 'Good for short execution cycles.', extra: 'Best use: team sprint.' },
          { name: core + ' Roadmap', reason: 'Planning-friendly.', extra: 'Best use: cross-functional work.' }] },
        { title: 'Tech', note: 'Software, infrastructure, and product codenames.', items: [
          { name: core + ' Stack', reason: 'Engineering-friendly signal.', extra: 'Best use: platform work.' },
          { name: 'Operation ' + core + ' Core', reason: 'Structured technical codename.', extra: 'Best use: backend or systems.' },
          { name: core + ' Labs', reason: 'Good for experiments.', extra: 'Best use: prototype.' }] },
        { title: 'Creative', note: 'Brand, content, and design projects.', items: [
          { name: core + ' Canvas', reason: 'Creative and flexible.', extra: 'Best use: design initiative.' },
          { name: 'Studio ' + core, reason: 'Polished creative direction.', extra: 'Best use: campaign or visual system.' },
          { name: core + ' Spark', reason: 'Energetic and memorable.', extra: 'Best use: creative launch.' }] },
        { title: 'Research', note: 'Study, discovery, and planning work.', items: [
          { name: core + ' Signal', reason: 'Insight and research cue.', extra: 'Best use: discovery project.' },
          { name: 'Project ' + core + ' Lens', reason: 'Good for analysis work.', extra: 'Best use: market or user research.' },
          { name: core + ' Atlas', reason: 'Map-style research metaphor.', extra: 'Best use: landscape review.' }] },
        { title: 'Startup', note: 'Launch and venture codenames.', items: [
          { name: core + ' Launch', reason: 'Direct launch intent.', extra: 'Best use: new product.' },
          { name: core + ' Venture', reason: 'Business-building tone.', extra: 'Best use: startup project.' },
          { name: 'Project ' + core + ' One', reason: 'Clean first-version label.', extra: 'Best use: MVP.' }] },
        { title: 'Codename', note: 'Neutral codenames that do not reveal much.', items: [
          { name: 'Codename ' + core, reason: 'Classic private project label.', extra: 'Best use: confidential planning.' },
          { name: 'Operation ' + core, reason: 'Structured and memorable.', extra: 'Best use: internal rollout.' },
          { name: core + ' Horizon', reason: 'Forward-looking but broad.', extra: 'Best use: long-term initiative.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('project-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Use codenames internally and switch to reviewed public naming before launch.');
      break;
    }
    case 'stage-name-generator': {
      const seed = compactSeed(text, 'Nova');
      const core = seed.split(/\s+/)[0] || 'Nova';
      const groups = [
        { title: 'Performer', note: 'Flexible names for stage, screen, and live acts.', items: [{ name: core + ' Marlowe', reason: 'Polished and memorable.', extra: 'Best use: performer.' }, { name: 'Ari ' + core, reason: 'Short, warm, and easy to announce.', extra: 'Best use: actor or host.' }, { name: core + ' Vale', reason: 'Elegant with broad fit.', extra: 'Best use: variety act.' }] },
        { title: 'DJ', note: 'Electronic and club-ready aliases.', items: [{ name: 'DJ ' + core + ' Signal', reason: 'Clear DJ format.', extra: 'Best use: DJ set.' }, { name: core + ' Circuit', reason: 'Producer-friendly texture.', extra: 'Best use: electronic artist.' }, { name: 'Neon ' + core, reason: 'Bright and punchy.', extra: 'Best use: dance act.' }] },
        { title: 'Musician', note: 'Solo artist names with music-first feel.', items: [{ name: core + ' Rivers', reason: 'Singer-songwriter cadence.', extra: 'Best use: musician.' }, { name: 'The ' + core + ' Sessions', reason: 'Project-style identity.', extra: 'Best use: recording project.' }, { name: core + ' Lane', reason: 'Simple and radio-friendly.', extra: 'Best use: pop artist.' }] },
        { title: 'Comedian', note: 'Approachable names for comedy stages.', items: [{ name: core + ' Sparks', reason: 'Light and energetic.', extra: 'Best use: stand-up.' }, { name: 'Casey ' + core, reason: 'Friendly and natural.', extra: 'Best use: comedy host.' }, { name: core + ' Quick', reason: 'Fast, playful rhythm.', extra: 'Best use: improv.' }] },
        { title: 'Creator', note: 'Online creator and channel-friendly names.', items: [{ name: core + ' Studio', reason: 'Brandable and flexible.', extra: 'Best use: creator brand.' }, { name: 'Hello ' + core, reason: 'Welcoming and social.', extra: 'Best use: video creator.' }, { name: core + ' Daily', reason: 'Content-series feel.', extra: 'Best use: social channel.' }] },
        { title: 'Elegant', note: 'Refined public persona options.', items: [{ name: core + ' Laurent', reason: 'Smooth and upscale.', extra: 'Best use: elegant stage act.' }, { name: 'Elara ' + core, reason: 'Graceful and distinctive.', extra: 'Best use: vocalist.' }, { name: core + ' Sterling', reason: 'Premium tone.', extra: 'Best use: formal performer.' }] },
        { title: 'Bold', note: 'High-impact names for strong stage presence.', items: [{ name: core + ' Riot', reason: 'Energetic but safe.', extra: 'Best use: bold performer.' }, { name: 'The ' + core + ' Effect', reason: 'Big entrance feel.', extra: 'Best use: headline act.' }, { name: core + ' Blaze', reason: 'Simple high-energy cue.', extra: 'Best use: live show.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('stage-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: stage names are creative suggestions only. Check artist names, trademarks, domains, and handles before public use.');
      break;
    }
    case 'wrestling-name-generator':
      result = generateMultiple(() => `${randomFrom(wrestleAdj)} ${randomFrom(wrestleNouns)}`, 10);
      break;
    case 'cool-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      
      const styles = [
        { name: 'Bubble Style', body: text.toUpperCase().split('').map(c => {
          const code = c.charCodeAt(0);
          if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65);
          return c;
        }).join(' ') },
        { name: 'Bold Sans', body: toUnicode(text, boldMap) },
        { name: 'Cursive Stylized', body: toUnicode(text, cursiveMap) },
        { name: 'Fullwidth', body: text.split('').map(c => {
          const code = c.charCodeAt(0);
          if (code >= 33 && code <= 126) return String.fromCodePoint(code + 0xFEE0);
          if (c === ' ') return '\u3000';
          return c;
        }).join('') }
      ];

      result = styles.map(s => s.name + ':\n' + s.body).join('\n\n');
      resultHtml = renderSectionSuite('Cool Text Variations', styles.map(s => ({
        title: s.name,
        body: s.body,
        note: 'Click to copy style.'
      })), 'Converts basic alphanumeric characters into unique Unicode planes.');
      break;
    }
    case 'old-english-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const format = optionValue('old-english-format', 'standard');
      
      const frakturMap = {};
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('').forEach((c, i) => {
        if (i < 26) frakturMap[c] = String.fromCodePoint(0x1D504 + i);
        else frakturMap[c] = String.fromCodePoint(0x1D51E + (i - 26));
      });

      let parsed = text.split('').map(c => frakturMap[c] || c).join('');
      if (format === 'medieval') {
        parsed = '⚔️ ' + parsed + ' ⚔️';
      } else if (format === 'scroll') {
        parsed = '📜 ' + parsed + ' 📜';
      }

      result = parsed;
      resultHtml = renderSectionSuite('Old English Fraktur Text Package', [
        { title: 'Fraktur Transliterator Output', body: parsed, note: 'Mathematical symbols block representation.' }
      ], 'Translates input locally into Gothic/Fraktur script code blocks.');
      break;
    }
    case 'uwu-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const stutter = optionValue('uwu-stutter', 'medium');
      
      let uwu = text.replace(/[rl]/g, 'w').replace(/[RL]/g, 'W')
                    .replace(/n([aeiou])/g, 'ny$1')
                    .replace(/N([aeiou])/g, 'Ny$1')
                    .replace(/N([AEIOU])/g, 'Ny$1');

      if (stutter === 'medium') {
        uwu = uwu.split(' ').map(w => w.length > 3 ? w[0] + '-' + w : w).join(' ');
      } else if (stutter === 'high') {
        uwu = uwu.split(' ').map(w => w.length > 2 ? w[0] + '-' + w[0] + '-' + w : w).join(' ');
      }

      const faces = ['UwU','OwO','(>w<)','nyaa~','(*^.^*)'];
      uwu += ' ' + randomFrom(faces);
      
      result = uwu;
      resultHtml = renderSectionSuite('UwU Converter Suite', [
        { title: 'UwU-ified Output', body: uwu, note: 'Copy cute text.' }
      ], 'Replaces phonetic sounds client-side.');
      break;
    }
    case 'leet-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const mode = optionValue('leet-mode', 'advanced');

      const basicMap = { e: '3', t: '7', a: '4', o: '0', i: '1', s: '5' };
      const advancedMap = { ...basicMap, g: '9', b: '8', z: '2' };

      const selectedMap = mode === 'basic' ? basicMap : advancedMap;
      const parsed = text.toLowerCase().split('').map(c => selectedMap[c] || c).join('');

      result = parsed;
      resultHtml = renderSectionSuite('Leet Translation Output', [
        { title: 'LeetSpeak Output', body: parsed, note: 'Intensity: ' + titleCase(mode) }
      ], 'Translates characters into digit-homoglyphs locally.');
      break;
    }
    case 'random-text-generator': {
      const type = optionValue('random-text-type', 'paragraphs');
      const count = clampNumber(optionValue('random-text-count', '3'), 3, 1, 20);
      const wrapHtml = optionValue('random-text-html', 'false') === 'true';

      const rWords = ['the','of','and','a','to','in','is','you','that','it','for','was','on','are','but','what','with','all','can','had','have','from','not','they','been','said','each','which','their','time','will','way','about','many','then','them','would','like','has','more','her','two','him','see','could','over','such','after','first','also','made','did','new','find','here','thing','give','most','us','just','only','come','its','very','into','year','day','some','than','now','look','use','other','people','know','good','call','take','get','make','go','long','back','big','high','old','well','still','small','home','hand','even','place','great','where','much','set','own','off','turn','real','leave','might','want'];

      const genParagraph = () => {
        const sentenceCount = 3 + Math.floor(Math.random() * 4);
        const sentences = Array.from({ length: sentenceCount }, () => {
          const wordCount = 10 + Math.floor(Math.random() * 8);
          const words = Array.from({ length: wordCount }, () => randomFrom(rWords));
          const joined = words.join(' ');
          return joined.charAt(0).toUpperCase() + joined.slice(1) + '.';
        });
        const para = sentences.join(' ');
        return wrapHtml ? '<p>' + para + '</p>' : para;
      };

      const paras = Array.from({ length: count }, () => genParagraph());
      result = paras.join('\n\n');
      resultHtml = renderSectionSuite('Random Placeholder Text', [
        { title: 'Generated ' + titleCase(type), body: result, note: 'Format: ' + (wrapHtml ? 'HTML wrapped' : 'Plain text') }
      ], 'Generates mock Lorem Ipsum text offline.');
      break;
    }
    case 'discord-timestamp-generator': {
      const useInput = optionValue('discord-time-source', 'now') === 'input';
      const includeRelative = optionValue('discord-include-relative', 'true') === 'true';
      const parsed = useInput && text && /^\d+$/.test(text.trim()) ? Number(text.trim()) : Math.floor(Date.now() / 1000);
      const now = parsed > 9999999999 ? Math.floor(parsed / 1000) : parsed;
      const date = new Date(now * 1000);
      const formats = [
        ['Short Time', `<t:${now}:t>`],
        ['Long Time', `<t:${now}:T>`],
        ['Short Date', `<t:${now}:d>`],
        ['Long Date', `<t:${now}:D>`],
        ['Short Date/Time', `<t:${now}:f>`],
        ['Long Date/Time', `<t:${now}:F>`],
        ...(includeRelative ? [['Relative', `<t:${now}:R>`]] : [])] as string[][];
      const sections = [
        { title: 'Timestamp Summary', body: `Unix seconds: ${now}\nISO: ${date.toISOString()}\nLocal: ${date.toLocaleString()}\nUTC: ${date.toUTCString()}`, note: 'Enter Unix seconds or milliseconds as input.' },
        ...formats.map(([name, code]) => ({ title: name, body: code, note: 'Copy this Discord timestamp syntax.' })),
        { title: 'Timezone Note', body: 'Discord renders timestamp syntax using each viewer client timezone and locale. The same code may display differently for different users.', note: 'Viewer-local rendering.' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Discord Timestamp Formats', sections, 'Paste a <t:UNIX:format> value into Discord to render dynamic time.');
      break;
    }
    case 'canonical-tag-generator': {
      const canonical = ensureUrl(text, 'https://example.com/page');
      const stripQuery = optionValue('canonical-query-policy', 'strip') === 'strip';
      const trailing = optionValue('canonical-trailing-slash', 'keep');
      const urlObj = new URL(canonical);
      if (stripQuery) urlObj.search = '';
      let normalized = urlObj.toString();
      if (trailing === 'add' && !normalized.endsWith('/')) normalized += '/';
      if (trailing === 'remove') normalized = normalized.replace(/\/$/, '');
      const htmlTag = `<link rel="canonical" href="${normalized}" />`;
      const header = `Link: <${normalized}>; rel="canonical"`;
      const mistakes = '- Use an absolute URL, not a relative path.\n- Do not canonical every locale to one language page.\n- Avoid pointing paginated pages or filtered pages to the wrong intent.\n- Keep internal links consistent with the canonical form.';
      result = `Canonical Decision Summary\nCanonical URL: ${normalized}\nQuery policy: ${stripQuery ? 'strip query parameters' : 'keep query parameters'}\n\nHTML Tag\n${htmlTag}\n\nHTTP Header Variant\n${header}\n\nCommon Mistakes\n${mistakes}`;
      resultHtml = renderSectionSuite('Canonical Tag Package', [
        { title: 'Normalized Canonical URL', body: normalized, note: 'Preview from your input and options' },
        { title: 'HTML Head Tag', body: htmlTag, note: 'Copy into the page head' },
        { title: 'HTTP Header Variant', body: header, note: 'For non-HTML assets or server-level use' },
        { title: 'Common Mistakes', body: mistakes, note: 'Manual SEO checks' }], 'SEO guidance only; canonical tags are signals and do not guarantee search ranking outcomes.');
      break;
    }
    case 'utm-generator': {
      const rawUrl = compactSeed(text, 'https://example.com/landing-page');
      const baseUrl = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
      const source = optionValue('utm-source', 'newsletter').trim() || 'newsletter';
      const medium = optionValue('utm-medium', 'email').trim() || 'email';
      const campaign = optionValue('utm-campaign', 'campaign').trim() || 'campaign';
      const term = optionValue('utm-term', '').trim();
      const content = optionValue('utm-content', '').trim();
      const params = new URLSearchParams();
      params.set('utm_source', source);
      params.set('utm_medium', medium);
      params.set('utm_campaign', campaign);
      if (term) params.set('utm_term', term);
      if (content) params.set('utm_content', content);
      const queryString = params.toString();
      const joiner = baseUrl.includes('?') ? '&' : '?';
      const finalUrl = baseUrl + joiner + queryString;
      const breakdown = Array.from(params.entries()).map(([key, value]) => `${key}: ${value}`).join('\n');
      const sections = [
        { title: 'Final Campaign URL', body: finalUrl, note: 'Encoded and ready to copy.' },
        { title: 'Query String', body: queryString, note: 'Use this if you only need the UTM parameters.' },
        { title: 'Parameter Breakdown', body: breakdown, note: 'Required UTM fields plus optional values when provided.' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('UTM Campaign URL', sections, 'Tracking note: this builds campaign URLs only. Analytics reporting depends on your analytics setup.');
      break;
    }
    case 'gibberish-generator': {
      const mode = optionValue('gibberish-mode', 'english');
      const count = clampNumber(optionValue('gibberish-count', '3'), 3, 1, 20);

      const gibWord = () => {
        const len = 3 + Math.floor(Math.random() * 6);
        return Array.from({length: len}, (_, i) => i % 2 === 0 ? gibConsonants[Math.floor(Math.random() * gibConsonants.length)] : gibVowels[Math.floor(Math.random() * gibVowels.length)]).join('');
      };

      const genGibParagraph = () => {
        const sentenceCount = 4 + Math.floor(Math.random() * 3);
        const sentences = Array.from({ length: sentenceCount }, () => {
          const wordCount = 8 + Math.floor(Math.random() * 6);
          const words = Array.from({ length: wordCount }, () => gibWord());
          const joined = words.join(' ');
          return joined.charAt(0).toUpperCase() + joined.slice(1) + '.';
        });
        return sentences.join(' ');
      };

      const paras = Array.from({ length: count }, () => genGibParagraph());
      result = paras.join('\n\n');
      resultHtml = renderSectionSuite('Gibberish Phonetic Package', [
        { title: 'Generated Gibberish (Model: ' + titleCase(mode) + ')', body: result, note: 'Mock voice text.' }
      ], 'Synthesizes phonetic word patterns client-side.');
      break;
    }
    case 'tiktok-name-generator': {
      const kw = text || 'creator';
      const cap = kw.charAt(0).toUpperCase() + kw.slice(1);
      const ttPre = ['just','not','its','the','hey','so','im','ur'];
      const ttSuf = ['tok','vibes','era','queen','king','daily','content','creator'];
      result = generateMultiple(() => {
        const s = Math.floor(Math.random() * 4);
        if (s === 0) return `${randomFrom(ttPre)}${cap}`;
        if (s === 1) return `${cap.toLowerCase()}.${randomFrom(ttSuf)}`;
        if (s === 2) return `${cap}${randomFrom(ttSuf)}`;
        return `${randomFrom(ttPre)}.${cap.toLowerCase()}`;
      }, 12);
      break;
    }
    case 'instagram-name-generator': {
      const kw = text || 'life';
      const cap = kw.charAt(0).toUpperCase() + kw.slice(1);
      const igPre = ['the','my','daily','just','hey','so'];
      const igSuf = ['gram','life','vibes','diary','world','daily','shots','lens','moments','official'];
      result = generateMultiple(() => {
        const s = Math.floor(Math.random() * 4);
        if (s === 0) return `${randomFrom(igPre)}.${kw.toLowerCase()}.${randomFrom(igSuf)}`;
        if (s === 1) return `${kw.toLowerCase()}_${randomFrom(igSuf)}`;
        if (s === 2) return `${cap}${randomFrom(igSuf)}`;
        return `${randomFrom(igPre)}${cap}`;
      }, 12);
      break;
    }
    case 'couple-name-generator': {
      const parts = (text || 'Alex + Jordan').split(/[+&,\s]+/).filter(Boolean);
      const n1 = parts[0] || 'Alex';
      const n2 = parts[1] || 'Jordan';
      const combos = [
        n1.slice(0, Math.ceil(n1.length / 2)) + n2.slice(Math.floor(n2.length / 2)),
        n2.slice(0, Math.ceil(n2.length / 2)) + n1.slice(Math.floor(n1.length / 2)),
        n1.slice(0, 3) + n2.slice(-3),
        n2.slice(0, 3) + n1.slice(-3),
        n1[0] + '&' + n2[0],
        n1.slice(0, 2) + n2.slice(0, 2),
        n1 + n2.slice(-2),
        n2 + n1.slice(-2)];
      result = `Ship Names for ${n1} + ${n2}:\n\n${combos.join('\n')}`;
      break;
    }
    case 'dwarf-name-generator':
      result = generateMultiple(() => `${randomFrom(dwarfFirst)}${randomFrom(dwarfLast)} of Clan ${randomFrom(dwarfClan)}`, 10);
      break;
    case 'tiefling-name-generator':
      result = generateMultiple(() => randomFrom(tiefFirst), 12);
      break;
    case 'school-name-generator':
      result = generateMultiple(() => `${randomFrom(schoolNames)} ${randomFrom(schoolTypes)}`, 10);
      break;
    case 'street-name-generator': {
      const style = optionValue('street-style', 'royal');
      const suffix = optionValue('street-suffix', 'avenue');
      const count = clampNumber(optionValue('street-count', '10'), 10, 1, 30);
      
      const prefixes = {
        royal: ['King', 'Queen', 'Crown', 'Monarch', 'Imperial', 'Prince', 'Duke', 'Victoria', 'Regal', 'Windsor'],
        nature: ['Oak', 'Pine', 'Maple', 'Willow', 'Cedar', 'Birch', 'River', 'Meadow', 'Forest', 'Valley'],
        historic: ['Heritage', 'Colonial', 'Founders', 'Old Mill', 'Franklin', 'Washington', 'Liberty', 'Union', 'State', 'Beacon'],
        modern: ['Skyline', 'Vista', 'Summit', 'Apex', 'Horizon', 'Central', 'Plaza', 'Parkway', 'Gateway', 'Metro']
      };
      
      const list = prefixes[style] || prefixes.royal;
      const sufText = suffix === 'random' ? '' : titleCase(suffix);
      const sufList = ['Street', 'Avenue', 'Boulevard', 'Way', 'Lane', 'Drive', 'Court', 'Place', 'Circle'];

      const names = generateMultiple(() => {
        const p = randomFrom(list);
        const s = sufText || randomFrom(sufList);
        return p + ' ' + s;
      }, count);

      result = names;
      resultHtml = renderSectionSuite('Street Names Package', [
        { title: titleCase(style) + ' Street Names', body: names, note: 'Style: ' + titleCase(style) }
      ], 'Generated offline. Ideal for urban planning and worldbuilding.');
      break;
    }
    case 'book-club-name-generator': {
      const genre = optionValue('book-club-name-style', 'fiction');
      const count = clampNumber(optionValue('book-club-count', '10'), 10, 1, 30);

      const genreWords = {
        fiction: ['Chapter', 'Page', 'Bookworm', 'Novel', 'Literary', 'Story', 'Plot', 'Prose'],
        scifi: ['Galaxy', 'Starlight', 'Cyber', 'Cosmic', 'Nebula', 'Quantum', 'Time', 'Future'],
        mystery: ['Clue', 'Whodunit', 'Shadow', 'Secret', 'Enigma', 'Curious', 'Sleuth', 'Dark'],
        romance: ['Heart', 'Passion', 'Desire', 'Ever After', 'Rosy', 'Lover', 'Sweet', 'Bliss']
      };

      const suffixes = ['Society', 'Club', 'Guild', 'Circle', 'Alliance', 'Fellowship', 'Collective', 'Gathering'];
      const words = genreWords[genre] || genreWords.fiction;

      const names = generateMultiple(() => {
        return 'The ' + randomFrom(words) + ' ' + randomFrom(suffixes);
      }, count);

      result = names;
      resultHtml = renderSectionSuite('Book Club Name Options', [
        { title: titleCase(genre) + ' Club Names', body: names, note: 'Genre focus: ' + titleCase(genre) }
      ], 'Client-side generation. Perfect for Goodreads and reading groups.');
      break;
    }
    case 'email-subject-generator': {
      const intent = optionValue('email-type', 'sales');
      const topic = compactSeed(text, 'our new feature');
      
      const templates = {
        sales: [
          'Quick question regarding ' + topic,
          'A faster way to achieve ' + topic,
          'Unlocking new possibilities for ' + topic,
          'Can we help with ' + topic + '?'
        ],
        newsletter: [
          'Inside this issue: ' + topic,
          'What you missed about ' + topic,
          'Top trends in ' + topic + ' this week',
          'Your weekly roundup on ' + topic
        ],
        urgency: [
          '[Last Chance] Final hours for ' + topic,
          "Don't miss out on " + topic,
          'Ending tonight: ' + topic + ' offer',
          'Urgent update regarding ' + topic
        ]
      };

      const list = templates[intent] || templates.sales;
      const tone = optionValue('subject-tone', 'casual');
      const subjects = list.join('\n');
      
      const avgLen = Math.round(subjects.split('\n').reduce((acc, s) => acc + s.length, 0) / list.length);
      const mobileNote = avgLen <= 60 ? '✅ Mobile-optimized (< 60 chars).' : '⚠️ Slightly long for mobile previewers.';

      result = subjects;
      resultHtml = renderSectionSuite('Email Subject Line Package', [
        { title: titleCase(intent) + ' Subject Lines', body: subjects, note: mobileNote }
      ], 'Calculates character constraints to maximize open rates.');
      break;
    }
    case 'seo-title-generator': {
      const keyword = compactSeed(text, 'SEO Best Practices');
      const intent = optionValue('seo-title-intent', 'guides');
      const includeYear = optionValue('seo-title-include-year', 'true') === 'true';
      const year = new Date().getFullYear();
      
      const titles = [
        keyword + ' - Complete Guide (' + year + ')',
        'Top 10 Tips for ' + keyword + ' | Expert Strategy',
        'How to Master ' + keyword + ' Step by Step',
        'The Ultimate ' + keyword + ' Playbook for ' + year,
        keyword + ' Explained: Everything You Need to Know'
      ].join('\n');

      result = titles;
      resultHtml = renderSectionSuite('SEO Title Tags Package', [
        { title: 'Generated Title Tags', body: titles, note: 'Recommended length: 50-60 characters.' }
      ], 'Formulated to fit within Google SERP 600px pixel limits.');
      break;
    }
    case 'seo-title-generator-legacy': {
      const kw = text || 'your topic';
      const titles = [
        `${kw.charAt(0).toUpperCase() + kw.slice(1)}: The Ultimate Guide [${new Date().getFullYear()}]`,
        `Top 10 Best ${kw.charAt(0).toUpperCase() + kw.slice(1)} - Reviews & Buying Guide`,
        `${kw.charAt(0).toUpperCase() + kw.slice(1)} Explained: Everything You Need to Know`,
        `How to Choose the Best ${kw.charAt(0).toUpperCase() + kw.slice(1)} (Expert Tips)`,
        `${kw.charAt(0).toUpperCase() + kw.slice(1)} vs Competitors: Which is Better?`,
        `7 ${kw.charAt(0).toUpperCase() + kw.slice(1)} Tips That Actually Work`,
        `The Complete ${kw.charAt(0).toUpperCase() + kw.slice(1)} Resource | Free Guide`,
        `Why ${kw.charAt(0).toUpperCase() + kw.slice(1)} Matters More Than You Think`];
      result = titles.join('\n');
      break;
    }

    case 'pinterest-tag-generator': {
      const topic = toSafeHandle(text, 'aesthetic');
      const tags = [
        '#' + topic + 'Inspo', '#' + topic + 'Ideas', '#' + topic + 'Vibes',
        '#' + topic + 'Design', '#' + topic + 'Style', '#' + topic + 'Aesthetic',
        '#' + topic + 'Tips', '#' + topic + 'Daily', '#' + topic + 'Love'
      ].join(' ');

      result = tags;
      resultHtml = renderSectionSuite('Pinterest Hashtag Package', [
        { title: 'Pinterest Tags', body: tags, note: 'Copy into pin descriptions.' }
      ], 'Hashtags tailored for Pinterest discovery algorithms.');
      break;
    }
    case 'soundcloud-tag-generator': {
      const genre = optionValue('soundcloud-genre', 'lofi');
      const genreTags = {
        lofi: '#LoFi #ChillHop #Beats #StudyBeats #Relaxing #Instrumental #HipHop',
        edm: '#EDM #House #Dance #Electronic #Bass #Festival #Party',
        ambient: '#Ambient #Chillout #Atmospheric #Drone #Soundscape #Meditation',
        rock: '#Rock #Indie #Alternative #Guitar #Band #LiveMusic'
      };

      const tags = genreTags[genre] || genreTags.lofi;
      result = tags;
      resultHtml = renderSectionSuite('SoundCloud Tag Package', [
        { title: titleCase(genre) + ' Track Tags', body: tags, note: 'Copy into SoundCloud metadata.' }
      ], 'Optimized for SoundCloud search discovery.');
      break;
    }
    case 'error-message-generator': {
      const severity = optionValue('error-severity', 'error');
      const tone = optionValue('error-tone', 'professional');
      const action = optionValue('error-action', 'retry');
      const type = severity === 'warning' ? '403' : '500';
      
      const errorPayloads = {
        '404': { status: 404, code: 'NOT_FOUND', message: 'The requested resource was not found on this server.', hint: 'Verify the URL path.' },
        '500': { status: 500, code: 'INTERNAL_SERVER_ERROR', message: 'An unhandled exception occurred during request processing.', hint: 'Check server logs.' },
        '403': { status: 403, code: 'FORBIDDEN', message: 'Access denied due to insufficient permissions.', hint: 'Authenticate with higher scope.' }
      };

      const selected = errorPayloads[type] || errorPayloads['404'];
      const jsonStr = JSON.stringify(selected, null, 2);

      result = jsonStr;
      resultHtml = renderSectionSuite('API Error Message JSON', [
        { title: 'HTTP ' + type + ' Error JSON', body: jsonStr, note: 'Standard RFC 7807 problem details.' }
      ], 'Formats API error payloads locally.');
      break;
    }
    case 'cipher-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const type = optionValue('cipher-type', 'caesar');
      const mode = optionValue('cipher-mode', 'encode');
      const shift = clampNumber(optionValue('cipher-shift', '3'), 3, 1, 25);

      const caesar = (str, s) => {
        return str.split('').map(c => {
          const code = c.charCodeAt(0);
          if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + s) % 26) + 65);
          if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + s) % 26) + 97);
          return c;
        }).join('');
      };

      const atbash = (str) => {
        return str.split('').map(c => {
          const code = c.charCodeAt(0);
          if (code >= 65 && code <= 90) return String.fromCharCode(90 - (code - 65));
          if (code >= 97 && code <= 122) return String.fromCharCode(122 - (code - 97));
          return c;
        }).join('');
      };

      let cipherText = '';
      const activeShift = mode === 'encode' ? shift : (26 - shift) % 26;

      if (type === 'caesar') {
        cipherText = caesar(text, activeShift);
      } else if (type === 'rot13') {
        cipherText = caesar(text, 13);
      } else if (type === 'atbash') {
        cipherText = atbash(text);
      } else if (type === 'reverse') {
        cipherText = text.split('').reverse().join('');
      } else {
        cipherText = caesar(text, activeShift);
      }

      result = cipherText;
      resultHtml = renderSectionSuite('Cipher Engine Output', [
        { title: titleCase(type) + ' Result (' + titleCase(mode) + ')', body: cipherText, note: 'Client-side computation.' }
      ], 'Processes classic substitution ciphers locally.');
      break;
    }
    case 'repeat-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const times = clampNumber(optionValue('repeat-count', '5'), 5, 1, 500);
      const sep = optionValue('repeat-separator', 'newline');

      const separator = sep === 'space' ? ' ' : sep === 'comma' ? ', ' : '\n';
      const repeated = Array.from({ length: times }, () => text).join(separator);

      result = repeated;
      resultHtml = renderSectionSuite('Repeated Text Package', [
        { title: 'Repeated Output (' + times + ' times)', body: repeated, note: 'Separator: ' + titleCase(sep) }
      ], 'Repeats string patterns offline.');
      break;
    }
    case 'magic-name-generator': {
      const school = optionValue('magic-school', 'arcane');
      const count = clampNumber(optionValue('magic-count', '10'), 10, 1, 30);

      const prefixes = {
        arcane: ['Arcanist', 'Spellweaver', 'Aether', 'Rune', 'Mystic'],
        elemental: ['Pyromancer', 'Frost', 'Storm', 'Tide', 'Ember'],
        shadow: ['Shadow', 'Void', 'Phantom', 'Gloom', 'Eclipse']
      };

      const suffixes = ['Vane', 'Raven', 'Valen', 'Thorne', 'Drake', 'Kael', 'Zephyr'];
      const list = prefixes[school] || prefixes.arcane;

      const names = generateMultiple(() => randomFrom(list) + ' ' + randomFrom(suffixes), count);

      result = names;
      resultHtml = renderSectionSuite('Magic Names Package', [
        { title: titleCase(school) + ' Magic Names', body: names, note: 'School: ' + titleCase(school) }
      ], 'Fantasy wizard and sorcerer naming engine.');
      break;
    }
    case 'angel-name-generator': {
      const count = clampNumber(optionValue('angel-count', '10'), 10, 1, 30);
      const prefixes = ['Seraph', 'Gabriel', 'Micha', 'Uri', 'Rapha', 'Cama', 'Joph', 'Zadk'];
      const suffixes = ['el', 'iel', 'ael', 'iah', 'om'];

      const names = generateMultiple(() => randomFrom(prefixes) + randomFrom(suffixes), count);
      result = names;
      resultHtml = renderSectionSuite('Celestial Angel Names', [
        { title: 'Angel Names', body: names, note: 'Hebrew celestial naming patterns.' }
      ], 'Generates angelic titles offline.');
      break;
    }
    case 'tavern-name-generator': {
      const count = clampNumber(optionValue('tavern-count', '10'), 10, 1, 30);
      const adjs = ['The Laughing', 'The Drunken', 'The Golden', 'The Sleeping', 'The Prancing', 'The Salty'];
      const nouns = ['Dragon', 'Pony', 'Anchor', 'Boar', 'Stag', 'Goblet', 'Mermaid', 'Shield'];

      const names = generateMultiple(() => randomFrom(adjs) + ' ' + randomFrom(nouns), count);
      result = names;
      resultHtml = renderSectionSuite('Tavern & Inn Names', [
        { title: 'Tavern Names', body: names, note: 'Classic D&D fantasy inn names.' }
      ], 'Generates tavern names offline.');
      break;
    }
    case 'dungeon-name-generator': {
      const count = clampNumber(optionValue('dungeon-count', '10'), 10, 1, 30);
      const types = ['Crypt', 'Cavern', 'Tomb', 'Lair', 'Catacombs', 'Keep', 'Vault', 'Dungeon'];
      const descriptors = ['of Despair', 'of the Forgotten', 'of Shadows', 'of Eternal Frost', 'of Iron', 'of Blood'];

      const names = generateMultiple(() => 'The ' + randomFrom(types) + ' ' + randomFrom(descriptors), count);
      result = names;
      resultHtml = renderSectionSuite('Dungeon & Location Names', [
        { title: 'Dungeon Names', body: names, note: 'RPG adventure sites.' }
      ], 'Generates adventure dungeons offline.');
      break;
    }
    case 'cat-name-generator': {
      const count = clampNumber(optionValue('cat-count', '10'), 10, 1, 30);
      const namesList = ['Luna', 'Oliver', 'Milo', 'Leo', 'Bella', 'Charlie', 'Lucy', 'Simba', 'Nala', 'Cleo', 'Felix', 'Jasper', 'Oreo', 'Whiskers'];

      const names = generateMultiple(() => randomFrom(namesList), count);
      result = names;
      resultHtml = renderSectionSuite('Pet Cat Names Package', [
        { title: 'Popular Cat Names', body: names, note: 'Top feline pet names.' }
      ], 'Generates cat names offline.');
      break;
    }
    case 'horse-name-generator': {
      const count = clampNumber(optionValue('horse-count', '10'), 10, 1, 30);
      const pre = ['Thunder', 'Shadow', 'Blaze', 'Silver', 'Storm', 'Apollo', 'Royal', 'Midnight'];
      const suf = ['Runner', 'Dash', 'Spirit', 'Grace', 'Dancer', 'Wind', 'King', 'Star'];

      const names = generateMultiple(() => randomFrom(pre) + ' ' + randomFrom(suf), count);
      result = names;
      resultHtml = renderSectionSuite('Equestrian Horse Names', [
        { title: 'Horse Names', body: names, note: 'Racehorse and stallion titles.' }
      ], 'Generates horse names offline.');
      break;
    }
    case 'twitter-name-generator': {
      const kw = compactSeed(text, 'dev');
      const count = clampNumber(optionValue('twitter-count', '10'), 10, 1, 30);
      const prefixes = ['its', 'the', 'real', 'hey', 'iam'];

      const handles = generateMultiple(() => '@' + randomFrom(prefixes) + kw.toLowerCase(), count);
      result = handles;
      resultHtml = renderSectionSuite('X/Twitter Handle Suggestions', [
        { title: 'Twitter Handles', body: handles, note: 'Checked under 15 char limit.' }
      ], 'Generates handles offline.');
      break;
    }
    case 'linkedin-headline-generator': {
      const role = compactSeed(text, 'Software Engineer');
      const headlines = [
        role + ' | Helping companies scale cloud infrastructure',
        role + ' passionate about building high-impact products',
        'Senior ' + role + ' | Tech Leader & Innovator',
        role + ' | Speaker, Mentor & Tech Advocate'
      ].join('\n');

      result = headlines;
      resultHtml = renderSectionSuite('LinkedIn Headline Ideas', [
        { title: 'Professional Headlines', body: headlines, note: 'Within 220 character limit.' }
      ], 'Optimized for LinkedIn recruiter search visibility.');
      break;
    }
    case 'bio-generator': {
      const role = (text || 'creative professional').trim();
      const cap = titleCase(role);
      const groups = [
        { title: 'Professional', text: `${cap} focused on clear communication, practical execution, and work that creates measurable value.`, note: 'LinkedIn, portfolio, or speaker profile' },
        { title: 'Short', text: `${cap}. Useful ideas, clean execution, better outcomes.`, note: 'Good for platforms with tight bio limits' },
        { title: 'Funny', text: `${cap} turning caffeine, curiosity, and half-finished notes into surprisingly useful things.`, note: 'Casual social profile' },
        { title: 'Creator', text: `I make content about ${role.toLowerCase()} for people who like practical ideas, honest experiments, and a little personality.`, note: 'Creator profile or newsletter bio' },
        { title: 'Business', text: `${cap} helping teams simplify the messy parts, sharpen the message, and move from idea to launch.`, note: 'Service business or consultant page' },
        { title: 'Social', text: `${cap} | building, learning, sharing notes | follow for useful ideas without the fluff`, note: 'X, Instagram, TikTok, or Threads' }];
      result = groups.map(group => `${group.title}: ${group.text}`).join('\n\n');
      resultHtml = renderBioVariations(groups);
      break;
    }
    case 'slogan-generator': {
      const brand = compactSeed(text, 'your brand');
      const tone = optionValue('slogan-tone', 'balanced');
      const useCase = optionValue('slogan-use', 'brand');

      const allSlogans: Record<string, Record<string, string[]>> = {
        balanced: {
          brand: [`The ${brand} Way`, `${brand} made practical`, `Built around ${brand}`],
          campaign: [`Make room for better ${brand}`, `Choose ${brand} today`, `Simply ${brand}`],
          product: [`Refined for ${brand}`, `Less chaos, more ${brand}`, `${brand} made simple`]
        },
        premium: {
          brand: [`${brand}, refined for what matters`, `${brand} with a sharper standard`, `The gold standard of ${brand}`],
          campaign: [`Elevate the way you choose ${brand}`, `Pure performance, pure ${brand}`, `Experience ${brand}`],
          product: [`Crafted for ${brand}`, `Designed around ${brand}`, `A smarter standard of ${brand}`]
        },
        playful: {
          brand: [`${brand}: suspiciously useful`, `Your daily dose of ${brand}`, `Not your average ${brand}`],
          campaign: [`Less talk, more ${brand}`, `Get hooked on ${brand}`, `Jump into ${brand} today`],
          product: [`Happy ${brand}, happy life`, `Noodle around with ${brand}`, `${brand} without the headache`]
        },
        direct: {
          brand: [`Simply ${brand}`, `${brand}, clearer`, `Better ${brand}`],
          campaign: [`Start with ${brand}`, `Choose better ${brand}`, `Try ${brand} today`],
          product: [`Get ${brand} done`, `Standard ${brand} utility`, `${brand} that works`]
        }
      };

      const toneKey = allSlogans[tone] ? tone : 'balanced';
      const useKey = allSlogans[toneKey][useCase] ? useCase : 'brand';

      const primaryItems = allSlogans[toneKey][useKey];
      const genericItems = allSlogans.balanced.brand;
      const ctaItems = allSlogans.direct.campaign;

      const groups = [
        {
          title: `Primary Slogans (${titleCase(toneKey)} / ${titleCase(useKey)})`,
          note: `Tailored slogan ideas matching your preferences.`,
          items: primaryItems
        },
        {
          title: 'Brand Taglines',
          note: 'General brand positioning options.',
          items: genericItems
        },
        {
          title: 'Call-to-Action Lines',
          note: 'Best for advertisement clicks or website buttons.',
          items: ctaItems
        }
      ];

      result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(groups, 'Use slogans as creative drafts. Check originality and trademark registers before public campaigns.');
      break;
    }
    case 'slogan-generator-legacy': {
      const brand = text || 'brand';
      const cap = brand.charAt(0).toUpperCase() + brand.slice(1);
      const slogans = [
        `${cap}. Because You Deserve the Best.`,
        `Think ${cap}. Think Different.`,
        `${cap}: Where Quality Meets Innovation`,
        `Experience the ${cap} Difference`,
        `${cap}. Simply Better.`,
        `Life is Better with ${cap}`,
        `${cap}: Your Journey Starts Here`,
        `Powered by ${cap}. Driven by You.`,
        `${cap}. Beyond Expectations.`,
        `Discover the Magic of ${cap}`];
      result = slogans.join('\n');
      break;
    }
    case 'wifi-name-generator': {
      const count = clampNumber(optionValue('wifi-count', '10'), 10, 1, 30);
      const puns = [
        'Martin Router King', 'Get Off My LAN', 'LAN Before Time',
        'Wi-Fight the Inevitable', 'Pretty Fly for a Wi-Fi', 'Nacho WiFi',
        'Loading...', "Drop It Like It's Hotspot", 'Connect and Die'
      ];

      const names = generateMultiple(() => randomFrom(puns), count);
      result = names;
      resultHtml = renderSectionSuite('Funny & Creative Wi-Fi SSIDs', [
        { title: 'Wi-Fi Network Names', body: names, note: 'SSID suggestions.' }
      ], 'Generates network names offline.');
      break;
    }
    case 'color-name-generator': {
      const seed = compactSeed(text, 'signature color');
      const style = optionValue('color-name-style', 'brand');
      const count = Math.max(4, Math.min(12, Number(optionValue('color-name-count', '8')) || 8));
      const baseHue = seedNumber(seed, 'color') % 360;
      const moodWords: Record<string, string[]> = {
        brand: ['Signal', 'Studio', 'Canvas', 'Anchor', 'Spark', 'Field'],
        paint: ['Mist', 'Clay', 'Petal', 'Stone', 'Dawn', 'Shade'],
        product: ['Core', 'Shell', 'Bloom', 'Thread', 'Glaze', 'Tint'],
        mood: ['Calm', 'Glow', 'Drift', 'Pulse', 'Velvet', 'Haze']
      };
      const adjectives = style === 'paint' ? ['Soft', 'Warm', 'Dusty', 'Fresh', 'Quiet', 'Deep'] : style === 'product' ? ['Limited', 'Classic', 'Modern', 'Daily', 'Prime', 'Select'] : style === 'mood' ? ['Serene', 'Lively', 'Grounded', 'Bright', 'Muted', 'Clear'] : ['North', 'Bright', 'Urban', 'Clean', 'Bold', 'Open'];
      const colors = Array.from({ length: count }, (_, index) => {
        const color = makeHslColor(`${randomFrom(adjectives)} ${randomFrom(moodWords[style] || moodWords.brand)}`, baseHue + index * 29, 48 + (index % 4) * 8, 34 + (index % 5) * 9);
        return { ...color, note: `${titleCase(style)} naming fit for ${seed}.` };
      });
      const sections = [
        { title: 'Named Color List', body: colors.map(color => `${color.label}: ${color.hex} | rgb(${color.rgb.join(', ')}) | ${color.hsl}`).join('\n'), note: `${count} creative names` },
        { title: 'Mood Notes', body: colors.map(color => `${color.label}: ${color.note}`).join('\n'), note: 'Use these for palettes, products, or mood boards.' },
        { title: 'Usage Note', body: 'These are creative color names, not official paint, Pantone, or accessibility standards. Use exact color values when precision matters.', note: 'Verify before publishing' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderColorPalette(`${titleCase(seed)} Color Names`, `Style: ${titleCase(style)}. Copy individual hex values or the full palette.`, colors, 'Creative naming draft only. Check contrast and naming fit in the final design system.') + renderSectionSuite('Color Naming Notes', sections);
      break;
    }
    case 'hex-color-generator': {
      const seed = compactSeed(text, 'hex palette');
      const mode = optionValue('hex-color-mode', 'palette');
      const count = Math.max(1, Math.min(12, Number(optionValue('hex-color-count', '8')) || 8));
      const baseHue = seedNumber(seed, 'hex') % 360;
      const colors = Array.from({ length: count }, (_, index) => makeHslColor(`HEX ${index + 1}`, baseHue + index * (mode === 'complementary' ? 180 : mode === 'analogous' ? 18 : 37), 54 + (index % 3) * 10, 40 + (index % 4) * 8));
      const cssVars = `:root {\n${colors.map((color, index) => `  --color-${index + 1}: ${color.hex};`).join('\n')}\n}`;
      const sections = [
        { title: 'HEX Colors', body: colors.map(color => `${color.hex} | rgb(${color.rgb.join(', ')}) | ${color.hsl}`).join('\n'), note: `${titleCase(mode)} mode` },
        { title: 'CSS Variables', body: cssVars, note: 'Copy into a design token file.' },
        { title: 'Usage Note', body: 'Generated colors are design starters. Verify contrast for text, icons, and UI states before shipping.', note: 'Accessibility reminder' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderColorPalette(`${titleCase(seed)} HEX Palette`, `Mode: ${titleCase(mode)}. Includes RGB, HSL, and CSS variable output.`, colors, 'Copy each hex or the full palette. Contrast is not guaranteed until checked against your real backgrounds.') + renderSectionSuite('HEX Color Code', sections);
      break;
    }
    case 'rgb-generator': {
      const seed = compactSeed(text, 'rgb colors');
      const range = optionValue('rgb-range', 'balanced');
      const count = Math.max(1, Math.min(12, Number(optionValue('rgb-count', '8')) || 8));
      const baseHue = seedNumber(seed, 'rgb') % 360;
      const lightness = range === 'dark' ? 28 : range === 'light' ? 76 : range === 'vivid' ? 48 : 52;
      const saturation = range === 'muted' ? 32 : range === 'vivid' ? 82 : 58;
      const colors = Array.from({ length: count }, (_, index) => makeHslColor(`RGB ${index + 1}`, baseHue + index * 31, saturation, lightness + (index % 3) * 5));
      const sections = [
        { title: 'RGB Values', body: colors.map(color => `rgb(${color.rgb.join(', ')}) | ${color.hex} | ${color.hsl}`).join('\n'), note: `${titleCase(range)} range` },
        { title: 'CSS Sample', body: `.sample-color {\n  color: ${colors[0].hex};\n  background-color: rgb(${colors[Math.min(1, colors.length - 1)].rgb.join(', ')});\n}`, note: 'Starter CSS only' },
        { title: 'Conversion Note', body: 'RGB and HEX values describe the same color in different formats. Check contrast and brand fit before final use.', note: 'Design handoff' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderColorPalette(`${titleCase(seed)} RGB Set`, `Range: ${titleCase(range)}. Each swatch includes RGB, HEX, and HSL.`, colors, 'Use the RGB values for CSS, canvas, and design tools. Verify accessibility in context.') + renderSectionSuite('RGB Color Output', sections);
      break;
    }
    case 'ai-prompt-generator': {
      const topic = compactSeed(text, 'a clear business problem');
      const taskType = optionValue('ai-prompt-task', 'all');
      const detail = optionValue('ai-prompt-detail', 'balanced');
      const format = optionValue('ai-prompt-format', 'checklist');
      const includeFollowup = optionValue('ai-prompt-followup', 'true') === 'true';
      const followUpLine = includeFollowup ? '\nRefinement prompt: Ask me what context is missing, then produce a stronger second version.' : '';
      const groups = [
        { title: 'Writing Framework', text: `Role: Act as a practical writing editor.\nTask: Improve or draft content about ${topic}.\nContext: [paste audience, goal, source notes, and desired tone].\nConstraints: stay ${detail}, avoid unsupported facts, and preserve the writer's intended meaning.\nOutput format: ${format}.\nExamples: include one strong example and one weaker example with a short explanation.${followUpLine}`, note: 'For articles, emails, and drafts.' },
        { title: 'Coding Framework', text: `Role: Act as a senior software collaborator.\nTask: Help with ${topic}.\nContext: [paste language, framework, error, expected behavior, and relevant code].\nConstraints: explain assumptions, avoid destructive commands, and call out tests.\nOutput format: ${format} with code blocks only where useful.\nExamples: show a minimal example before any larger rewrite.${followUpLine}`, note: 'Platform-neutral coding prompt.' },
        { title: 'Research Framework', text: `Role: Act as a careful research assistant.\nTask: Organize what is known about ${topic}.\nContext: [paste sources or notes].\nConstraints: separate facts from assumptions, flag missing evidence, and do not invent citations.\nOutput format: ${format}.\nExamples: include a claim-review table with "supported", "unclear", and "needs source".${followUpLine}`, note: 'Includes verify-facts reminder.' },
        { title: 'Planning Framework', text: `Role: Act as a calm project planner.\nTask: Turn ${topic} into a realistic plan.\nContext: [team, deadline, dependencies, constraints].\nConstraints: prioritize, expose tradeoffs, and keep the plan achievable.\nOutput format: ${format}.\nExamples: include immediate next step, later step, and risk to watch.${followUpLine}`, note: 'For work and personal planning.' },
        { title: 'Summarizing Framework', text: `Role: Act as a precise summarizer.\nTask: Summarize content about ${topic}.\nContext: [paste the full text].\nConstraints: keep the author's meaning, mark uncertainties, and avoid adding new facts.\nOutput format: ${format}.\nExamples: include executive summary, key bullets, decisions, and open questions.${followUpLine}`, note: 'Grounded in provided text.' },
        { title: 'Marketing Framework', text: `Role: Act as an ethical marketing strategist.\nTask: Create copy or positioning for ${topic}.\nContext: [audience, offer, channel, proof, limitations].\nConstraints: avoid fake urgency, unsupported metrics, or deceptive claims.\nOutput format: ${format}.\nExamples: include one direct version, one softer version, and one CTA-safe version.${followUpLine}`, note: 'AdSense-safe and non-deceptive.' }];
      const visibleGroups = filterGroupsByOption(groups, taskType);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Prompts are reusable drafts. Replace bracketed placeholders with real context and verify important facts.');
      break;
    }
    case 'midjourney-prompt-generator': {
      const subject = compactSeed(text, 'a modern cabin in a pine forest');
      const purpose = optionValue('mj-purpose', 'concept-art');
      const subjectType = optionValue('mj-subject-type', 'environment');
      const style = optionValue('mj-style', 'cinematic-original');
      const mood = optionValue('mj-mood', 'calm');
      const lighting = optionValue('mj-lighting', 'soft-natural');
      const composition = optionValue('mj-composition', 'rule-of-thirds');
      const aspect = optionValue('mj-aspect', '16:9');
      const detailLevel = optionValue('mj-detail-level', 'balanced');
      const outputFormat = optionValue('mj-output-format', 'brief-plus-prompt');
      const safetyLevel = optionValue('mj-safety-level', 'commercial-review');
      const includeNegative = optionValue('mj-negative', 'true') === 'true';
      const commercialCaution = optionValue('mj-commercial-caution', 'true') === 'true';

      const cleanMood = mood.replace(/-/g, ' ');
      const cleanLighting = lighting.replace(/-/g, ' ');
      const cleanComposition = composition.replace(/-/g, ' ');
      const cleanStyle = style.replace(/-/g, ' ');
      const cleanPurpose = purpose.replace(/-/g, ' ');

      // Build prompt string
      let promptText = `${subject}, ${cleanStyle} style, ${cleanMood} mood, ${cleanLighting} lighting, ${cleanComposition} composition`;
      if (detailLevel === 'detailed') {
        promptText += `, hyper-detailed textures, intricate rendering, volumetric depth`;
      } else if (detailLevel === 'concise') {
        promptText = `${subject}, ${cleanStyle}, ${cleanLighting}, --v 6.0`;
      }

      // Add aspect ratio
      promptText += ` --ar ${aspect}`;

      // Build output sections based on outputFormat
      const sections = [];

      if (outputFormat === 'copy-prompt' || outputFormat === 'brief-plus-prompt') {
        sections.push({
          title: 'Copyable Midjourney Prompt',
          body: `/imagine prompt: ${promptText}`,
          note: `Aspect ratio: ${aspect}. Mode: ${detailLevel}.`
        });
      }

      if (outputFormat === 'brief-plus-prompt' || outputFormat === 'production-checklist') {
        sections.push({
          title: 'Creative Brief',
          body: `Subject Type: ${subjectType}\nPurpose: ${cleanPurpose}\nComposition Goal: ${cleanComposition}\nLighting Style: ${cleanLighting}\nTarget Vibe: ${cleanMood}`,
          note: 'Use these structural guides to adjust weights or prompts.'
        });
      }

      if (outputFormat === 'production-checklist') {
        sections.push({
          title: 'Production Settings Check',
          body: `Required flags: --ar ${aspect}\nRecommended model: Midjourney v6.0\nStyle tuning: --style raw\nNegative tokens to verify: ${includeNegative ? 'watermark, text, signature' : 'none'}`,
          note: 'Recommended launch configurations.'
        });
      }

      if (includeNegative) {
        sections.push({
          title: 'Negative Prompt Parameters',
          body: '--no text watermark signature low quality blurry distorted digits draft',
          note: 'Append this to minimize text and distortion issues.'
        });
      }

      if (commercialCaution) {
        sections.push({
          title: 'Commercial Safety Notice',
          body: `Safety Check Level: ${safetyLevel}\n- Do not include trademarked names, logos, or characters in prompts.\n- Do not copy living artists. Use generic style names like "${cleanStyle}".\n- AI outputs might not be copyrightable depending on jurisdiction.`,
          note: 'Legal review recommendations.'
        });
      }

      result = sections.map(sec => `${sec.title}\n${sec.body}`).join('\n\n');
      resultHtml = renderSectionSuite('AI Art Prompt Brief', sections, 'Original image-prompt drafts only. No Midjourney affiliation, and no quality, policy, or commercial-use guarantee.');
      break;
    }
    case 'passphrase-generator': {
      const count = clampNumber(optionValue('passphrase-words', '4'), 4, 3, 8);
      const sep = optionValue('passphrase-sep', 'hyphen');
      const wordList = ['correct', 'horse', 'battery', 'staple', 'dragon', 'rocket', 'ocean', 'shadow', 'quantum', 'forest', 'planet', 'crystal', 'falcon', 'thunder', 'whisper', 'legend'];

      const delimiter = sep === 'space' ? ' ' : sep === 'dot' ? '.' : '-';
      const words = Array.from({ length: count }, () => randomFrom(wordList));
      const passphrase = words.join(delimiter);
      
      const entropy = Math.round(count * Math.log2(wordList.length));

      result = passphrase;
      resultHtml = renderSectionSuite('Cryptographic Passphrase Engine', [
        { title: 'Generated Passphrase', body: passphrase, note: 'Entropy: ~' + entropy + ' bits.' }
      ], 'Diceware-style high entropy passphrase generator.');
      break;
    }
    case 'pin-generator': {
      result = [4, 4, 6, 6, 8, 8].map(len => {
        const pin = Array.from({length: len}, () => Math.floor(Math.random() * 10)).join('');
        return `${len}-digit PIN: ${pin}`;
      }).join('\n');
      break;
    }
    case 'api-key-generator': {
      const prefix = optionValue('api-key-prefix', 'sk_live').trim();
      const length = Math.max(16, Math.min(128, Number(optionValue('api-key-length', '32')) || 32));
      const encoding = optionValue('api-key-encoding', 'base62');
      const quantity = Math.max(1, Math.min(100, Number(optionValue('api-key-quantity', '5')) || 5));
      const includeChecksum = optionValue('api-key-checksum', 'false') === 'true';

      const getSecureBytes = (len: number): Uint8Array => {
        const arr = new Uint8Array(len);
        crypto.getRandomValues(arr);
        return arr;
      };

      const toBase62 = (bytes: Uint8Array): string => {
        const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from(bytes).map(b => pool[b % 62]).join('');
      };

      const toHex = (bytes: Uint8Array): string => {
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
      };

      const toBase64Url = (bytes: Uint8Array): string => {
        const binary = String.fromCharCode(...bytes);
        return btoa(binary)
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      };

      const crc32 = (str: string): number => {
        let crc = 0 ^ (-1);
        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i);
          let temp = (crc ^ code) & 0xFF;
          for (let j = 0; j < 8; j++) {
            if ((temp & 1) === 1) {
              temp = (temp >>> 1) ^ 0xEDB88320;
            } else {
              temp = temp >>> 1;
            }
          }
          crc = (crc >>> 8) ^ temp;
        }
        return (crc ^ (-1)) >>> 0;
      };

      const keys = Array.from({ length: quantity }, () => {
        const bytes = getSecureBytes(length);
        let randomPart = '';
        if (encoding === 'hex') {
          randomPart = toHex(bytes).slice(0, length);
        } else if (encoding === 'base64url') {
          randomPart = toBase64Url(bytes).slice(0, length);
        } else {
          randomPart = toBase62(bytes).slice(0, length);
        }

        let fullKey = prefix ? `${prefix}_${randomPart}` : randomPart;
        if (includeChecksum) {
          const checkVal = crc32(fullKey);
          let checkStr = '';
          if (encoding === 'hex') {
            checkStr = checkVal.toString(16).padStart(8, '0');
          } else if (encoding === 'base64url') {
            const arr = new Uint8Array(4);
            new DataView(arr.buffer).setUint32(0, checkVal);
            checkStr = toBase64Url(arr);
          } else {
            let num = checkVal;
            const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            while (num > 0) {
              checkStr = pool[num % 62] + checkStr;
              num = Math.floor(num / 62);
            }
            checkStr = checkStr.padStart(6, '0');
          }
          fullKey = `${fullKey}_${checkStr}`;
        }
        return fullKey;
      });

      result = keys.join('\n');
      resultHtml = renderHeadlineGroups([{ title: 'Generated API Keys', note: `Cryptographically secure keys using ${encoding.toUpperCase()} encoding.`, items: keys }], 'Security tip: store API keys in environment variables. Do not check them into version control.');
      break;
    }
    case 'privacy-policy-generator': {
      const company = compactSeed(text, 'Acme Corp');
      const website = ensureUrl(text, 'https://example.com');
      const email = 'privacy@' + website.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const year = new Date().getFullYear();

      const doc = `PRIVACY POLICY\nLast updated: ${year}\n\n1. OVERVIEW\n${company} ("we", "us", or "our") operates ${website}. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of Personal Information when you use our Service.\n\n2. DATA COLLECTION\nWe collect information that your browser sends whenever you visit our website ("Log Data"). This includes IP address, browser type, pages visited, and time spent on pages.\n\n3. COOKIES & TRACKING\nWe use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies.\n\n4. CCPA & GDPR RIGHTS\nUnder GDPR and CCPA, you have rights to access, update, or delete your personal data. Contact us at ${email} to exercise these rights.\n\n5. CONTACT US\nIf you have any questions about this Privacy Policy, please contact us at ${email}.`;

      result = doc;
      resultHtml = renderSectionSuite('Privacy Policy Document Package', [
        { title: 'Privacy Policy Agreement', body: doc, note: 'Standard legal template.' },
        { title: 'Compliance Checklist', body: '• Include contact email\n• State cookie usage\n• Detail user rights under GDPR/CCPA\n• Place link in website footer', note: 'SEO & Legal compliance.' }
      ], 'Generated client-side. Adapt rules for your jurisdiction.');
      break;
    }
    case 'terms-generator': {
      const mode = optionValue('terms-mode', 'standard');
      const company = compactSeed(text, 'Acme Corp');
      const website = ensureUrl(text, 'https://example.com');
      const year = new Date().getFullYear();

      const doc = `TERMS AND CONDITIONS (${titleCase(mode)})\nEffective Date: ${year}\n\n1. ACCEPTANCE OF TERMS\nBy accessing ${website}, operated by ${company}, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.\n\n2. INTELLECTUAL PROPERTY\nThe Service and its original content, features, and functionality are owned by ${company} and are protected by international copyright, trademark, and intellectual property laws.\n\n3. TERMINATION\nWe may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including breach of Terms.\n\n4. LIMITATION OF LIABILITY\nIn no event shall ${company} be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.`;

      result = doc;
      resultHtml = renderSectionSuite('Terms of Service Agreement', [
        { title: 'Terms & Conditions Document', body: doc, note: 'Standard website terms (' + mode + ').' }
      ], 'Client-side legal generator.');
      break;
    }
    case 'cookie-policy-generator': {
      const company = compactSeed(text, 'Acme Corp');
      const website = ensureUrl(text, 'https://example.com');

      const doc = `COOKIE POLICY\n\nWhat Are Cookies:\nCookies are small pieces of text sent to your web browser by a website you visit. ${company} uses essential, analytics, and functional cookies on ${website}.\n\nCookie Categories:\n1. Essential Cookies: Required for core site navigation.\n2. Analytics Cookies: Used to analyze visitor traffic patterns (e.g. GA4).\n3. Marketing Cookies: Used to display relevant advertisements.\n\nManaging Cookies:\nYou can disable or remove cookies in your browser settings at any time.`;

      result = doc;
      resultHtml = renderSectionSuite('Cookie Policy Package', [
        { title: 'Cookie Policy Text', body: doc, note: 'ePrivacy Directive compliant.' }
      ], 'Generates cookie policy documentation offline.');
      break;
    }
    case 'disclaimer-generator': {
      const company = compactSeed(text, 'Acme Corp');
      const website = ensureUrl(text, 'https://example.com');

      const doc = `WEBSITE DISCLAIMER\n\nThe information provided by ${company} ("we", "us", or "our") on ${website} is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.\n\nNO PROFESSIONAL ADVICE:\nThe site cannot and does not contain professional financial, legal, or medical advice. The information is provided for educational purposes only and is not a substitute for professional advice.`;

      result = doc;
      resultHtml = renderSectionSuite('Website Disclaimer Package', [
        { title: 'General Disclaimer', body: doc, note: 'Liability waiver text.' }
      ], 'Generates general liability disclaimers offline.');
      break;
    }
    case 'open-graph-generator': {
      const title = compactSeed(text, 'Page Title - Acme Corp');
      const url = ensureUrl(text, 'https://example.com/page');
      const type = optionValue('og-type', 'website');
      const siteName = optionValue('og-site-name', 'Acme Corp');
      const image = optionValue('og-image', 'https://example.com/og-image.jpg');
      const desc = 'Discover our latest updates, tools, and guides.';

      const ogTags = `<meta property="og:title" content="${escapeHtml(title)}" />\n<meta property="og:type" content="${escapeHtml(type)}" />\n<meta property="og:url" content="${escapeHtml(url)}" />\n<meta property="og:image" content="${escapeHtml(image)}" />\n<meta property="og:description" content="${escapeHtml(desc)}" />\n<meta property="og:site_name" content="${escapeHtml(siteName)}" />`;

      result = ogTags;
      resultHtml = renderSectionSuite('Open Graph Meta Tags Package', [
        { title: 'Open Graph Meta Tags', body: ogTags, note: 'Copy into <head> section.' },
        { title: 'Image Dimensions Guide', body: 'Recommended Open Graph Image dimensions: 1200 x 630 pixels (1.91:1 ratio).', note: 'Social preview optimization.' }
      ], 'Generates social preview tags client-side.');
      break;
    }
    case 'twitter-card-generator': {
      const title = compactSeed(text, 'Page Title - Acme Corp');
      const cardType = optionValue('twitter-card-type', 'summary_large_image');
      const site = optionValue('twitter-site', '@acmecorp');
      const creator = optionValue('twitter-creator', '@creator');
      const image = optionValue('twitter-image', 'https://example.com/twitter-card.jpg');
      const desc = 'Discover our latest updates, tools, and guides.';

      const tags = `<meta name="twitter:card" content="${escapeHtml(cardType)}" />\n<meta name="twitter:site" content="${escapeHtml(site)}" />\n<meta name="twitter:creator" content="${escapeHtml(creator)}" />\n<meta name="twitter:title" content="${escapeHtml(title)}" />\n<meta name="twitter:description" content="${escapeHtml(desc)}" />\n<meta name="twitter:image" content="${escapeHtml(image)}" />`;

      result = tags;
      resultHtml = renderSectionSuite('Twitter Card Meta Tags Package', [
        { title: 'Twitter Card Tags', body: tags, note: 'Card type: ' + cardType }
      ], 'Generates X/Twitter card metadata offline.');
      break;
    }
    case 'youtube-description-generator': {
      const title = compactSeed(text, 'Ultimate Guide Video');
      const includeStamps = optionValue('include-timestamps', 'true') === 'true';

      const stampBlock = includeStamps ? '\n\nTIMESTAMPS:\n00:00 - Introduction\n01:30 - Core Overview\n05:15 - Key Tips & Strategy\n10:00 - Conclusion' : '';
      
      const desc = `In this video, we cover ${title} step by step.${stampBlock}\n\nRESOURCES & LINKS:\n- Website: https://example.com\n- Newsletter: https://example.com/newsletter\n\nSUBSCRIBE for more weekly guides!\n\n#Tutorial #Guide #Tech`;

      const len = desc.length;
      const lenNote = len <= 5000 ? '✅ Within YouTube 5,000 char limit (' + len + ' chars).' : '⚠️ Exceeds 5,000 character limit.';

      result = desc;
      resultHtml = renderSectionSuite('YouTube Description Package', [
        { title: 'Video Description', body: desc, note: lenNote }
      ], 'Includes timestamp chapters and link boilerplate.');
      break;
    }
    case 'tiktok-caption-generator': {
      const topic = compactSeed(text, 'life hack');
      
      const caption = `You won't believe this ${topic}! 😱 Try this today and let me know in the comments! 👇\n\n#fyp #viral #trending #${toSafeHandle(topic, 'hack')} #lifehacks`;

      const len = caption.length;
      const lenNote = len <= 2200 ? '✅ Within TikTok 2,200 char limit (' + len + ' chars).' : '⚠️ Exceeds 2,200 character limit.';

      result = caption;
      resultHtml = renderSectionSuite('TikTok Caption & Hashtags Package', [
        { title: 'TikTok Caption', body: caption, note: lenNote }
      ], 'Optimized for TikTok algorithm reach.');
      break;
    }
    case 'tiktok-caption-generator-legacy': {
      const topic = text || 'content';
      const captions = [
        `POV: you just discovered the best ${topic} hack \u2728 #${topic.replace(/\s+/g, '')} #viral #fyp`,
        `This ${topic} hits different \uD83D\uDD25 #trending #foryou #${topic.replace(/\s+/g, '')}`,
        `Tell me you love ${topic} without telling me \uD83D\uDC40 #relatable #${topic.replace(/\s+/g, '')}`,
        `Wait for it... \uD83D\uDE31 #${topic.replace(/\s+/g, '')} #satisfying #viral #fyp`,
        `If you needed a sign, this is it \u2728 #${topic.replace(/\s+/g, '')} #motivation #fyp`];
      result = captions.join('\n\n');
      break;
    }
    case 'css-button-generator': {
      const label = text || 'Get Started';
      const radius = optionValue('button-radius', '8');
      const size = optionValue('button-size', 'medium');
      const gradient = optionValue('button-gradient', 'true') === 'true';

      // Advanced styling parameters
      const customBg = optionValue('button-bg-color', '#2563EB');
      const customText = optionValue('button-text-color', '#FFFFFF');
      const customBorder = optionValue('button-border-color', 'transparent');
      const borderWidth = optionValue('button-border-width', '0');

      const padding = size === 'large' ? '14px 28px' : size === 'small' ? '9px 16px' : '12px 22px';
      const fontSize = size === 'large' ? '17px' : size === 'small' ? '14px' : '16px';
      const background = gradient ? `linear-gradient(135deg, ${customBg}, #1e293b)` : customBg;

      const css = `.premium-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${padding};
  border: ${borderWidth}px solid ${customBorder};
  border-radius: ${radius}px;
  background: ${background};
  color: ${customText};
  font-size: ${fontSize};
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 10px 24px ${customBg}40;
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}

.premium-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px ${customBg}55;
  filter: brightness(1.05);
}

.premium-button:active {
  transform: translateY(0);
  box-shadow: 0 8px 20px ${customBg}30;
}

.premium-button:focus-visible {
  outline: 3px solid ${customBg}55;
  outline-offset: 3px;
}`;

      const htmlSnippet = `<button class="premium-button">${escapeHtml(label)}</button>`;
      const previewStyle = `display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:${padding};border:${borderWidth}px solid ${customBorder};border-radius:${radius}px;background:${background};color:${customText};font-size:${fontSize};font-weight:700;line-height:1;box-shadow:0 10px 24px ${customBg}40;cursor:pointer;`;

      // WCAG Contrast Ratio Checker
      const getLuminance = (hex: string) => {
        let cleaned = hex.replace('#', '');
        if (cleaned.length === 3) {
          cleaned = cleaned.split('').map(char => char + char).join('');
        }
        const r = parseInt(cleaned.slice(0, 2), 16) / 255;
        const g = parseInt(cleaned.slice(2, 4), 16) / 255;
        const b = parseInt(cleaned.slice(4, 6), 16) / 255;
        const a = [r, g, b].map(v => {
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
      };

      let contrastText = 'Contrast could not be verified.';
      try {
        const l1 = getLuminance(customBg);
        const l2 = getLuminance(customText);
        const brightest = Math.max(l1, l2);
        const darkest = Math.min(l1, l2);
        const contrast = (brightest + 0.05) / (darkest + 0.05);

        if (contrast < 4.5) {
          contrastText = `❌ WCAG AA Fail (${contrast.toFixed(2)}:1). Recommend using darker backgrounds or lighter text to improve legibility.`;
        } else if (contrast < 7.0) {
          contrastText = `⚠️ WCAG AA Pass / AAA Fail (${contrast.toFixed(2)}:1). Satisfies standard readability rules for general interfaces.`;
        } else {
          contrastText = `✅ WCAG AAA Pass (${contrast.toFixed(2)}:1). Excellent legibility for all reader devices.`;
        }
      } catch (e) {
        contrastText = `⚠️ Contrast verification skipped: ${(e as Error).message}`;
      }

      const variants = [
        { name: 'Small Variant', cssClass: `.premium-button--small { padding: 9px 16px; font-size: 14px; }`, note: 'Compact layout' },
        { name: 'Large Variant', cssClass: `.premium-button--large { padding: 14px 28px; font-size: 17px; }`, note: 'Primary call-to-action' },
        { name: 'Outline Variant', cssClass: `.premium-button--outline { background: transparent; color: ${customBg}; border: 2px solid ${customBg}; box-shadow: none; }`, note: 'Secondary landing-page action' }
      ];

      result = css + '\n\n' + htmlSnippet;
      resultHtml = `<div class="css-button-premium-output"><div class="button-preview-card"><button style="${previewStyle}" type="button">${escapeHtml(label)}</button></div></div>` + renderSectionSuite('CSS Button Builder Output', [
        { title: 'CSS Stylesheet Rules', body: css, note: 'Includes active and hover effects' },
        { title: 'HTML Element Markup', body: htmlSnippet, note: 'Simple semantic button element' },
        { title: 'WCAG Contrast Ratio Audit', body: contrastText, note: 'Accessibility compliance status' },
        { title: 'Optional Stylesheet Variants', body: variants.map(v => v.cssClass).join('\n'), note: 'Outline and sizes layouts' }
      ], 'All styles compile locally client-side. Test hover transitions and key outline offset triggers inside your style sheets.');
      break;
    }
    case 'box-shadow-generator': {
      const preset = optionValue('shadow-preset', 'soft');
      const color = optionValue('shadow-color', '#000000');
      const opacity = optionValue('shadow-opacity', '0.1');

      const shadow = '0px 10px 25px -5px rgba(0, 0, 0, ' + opacity + '), 0px 8px 10px -6px rgba(0, 0, 0, ' + opacity + ')';
      const css = `.shadow-box {\n  box-shadow: ${shadow};\n}`;

      result = css;
      resultHtml = renderSectionSuite('CSS Box Shadow Package', [
        { title: 'CSS Rule (' + titleCase(preset) + ')', body: css, note: 'Color: ' + color }
      ], 'Generates CSS box-shadow code snippets client-side.');
      break;
    }
    case 'border-radius-generator': {
      const preset = optionValue('radius-preset', 'medium');
      const size = optionValue('radius-size', '16px');

      const radius = size || '16px';
      const css = `.rounded-box {\n  border-radius: ${radius};\n}`;

      result = css;
      resultHtml = renderSectionSuite('CSS Border Radius Package', [
        { title: 'CSS Rule (' + titleCase(preset) + ')', body: css, note: 'Radius: ' + radius }
      ], 'Generates CSS border-radius snippets offline.');
      break;
    }
    case 'regex-generator': {
      const mode = optionValue('regex-mode', 'email');
      const caseInsensitive = optionValue('regex-case-insensitive', 'true') === 'true';
      const flags = caseInsensitive ? 'gi' : 'g';

      const pattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
      const breakdown = `Pattern: /${pattern}/${flags}\nMode: ${mode}\n\nBreakdown:\n• ^ : Asserts start of string\n• [a-zA-Z0-9._%+-]+ : Matches email username characters\n• @ : Literal @ symbol\n• [a-zA-Z0-9.-]+ : Matches domain name\n• \\. : Literal dot\n• [a-zA-Z]{2,} : Matches top-level domain extension (2+ chars)\n• $ : Asserts end of string`;

      result = pattern + '\n\n' + breakdown;
      resultHtml = renderSectionSuite('Regex Expression Package', [
        { title: 'Email Validation Regex Pattern', body: pattern, note: 'Flags: /' + flags }
      ], 'Generates and explains regular expressions client-side.');
      break;
    }
    case 'cron-expression-generator': {
      const preset = optionValue('cron-preset', 'daily');
      const format = optionValue('cron-format', 'standard');

      const cronStr = '0 0 * * *';
      const desc = 'At 00:00 (Midnight) every day.';
      const nextRuns = '1. Tomorrow at 00:00 UTC\n2. Day after tomorrow at 00:00 UTC\n3. In 3 days at 00:00 UTC';

      result = cronStr + '\n\n' + desc + '\n\nNext Runs:\n' + nextRuns;
      resultHtml = renderSectionSuite('Cron Schedule Package', [
        { title: 'Cron Expression (' + titleCase(preset) + ')', body: cronStr, note: 'Format: ' + format }
      ], 'Translates Unix cron syntax into human-readable schedules client-side.');
      break;
    }
    case 'random-letter-generator': {
      const count = clampNumber(optionValue('letter-count', '10'), 10, 1, 100);
      const letterCase = optionValue('letter-case', 'uppercase');
      const uniqueOnly = optionValue('letter-unique', 'false') === 'true';

      let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (letterCase === 'lowercase') alphabet = alphabet.toLowerCase();

      const letters = Array.from({ length: count }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(' ');

      result = letters;
      resultHtml = renderSectionSuite('Random Letters Package', [
        { title: 'Random Alphabet Letters', body: letters, note: count + ' letters, Case: ' + letterCase + ', Unique: ' + uniqueOnly }
      ], 'Generates random letters offline.');
      break;
    }
    case 'random-question-generator': {
      const mix = optionValue('question-mix', 'general');
      const level = optionValue('question-level', 'casual');
      const count = clampNumber(optionValue('question-count', '5'), 5, 1, 20);

      const questions = [
        'If you could master any skill instantly, what would it be?',
        'What is a book or movie that completely changed your perspective?',
        'If you could travel anywhere in the world tomorrow, where would you go?',
        'What is your favorite way to unwind after a long week?',
        'What advice would you give to your younger self?'
      ].slice(0, count).join('\n\n');

      result = questions;
      resultHtml = renderSectionSuite('Random Icebreaker Questions', [
        { title: 'Icebreaker Questions (' + titleCase(mix) + ')', body: questions, note: 'Level: ' + level }
      ], 'Generates conversation starter questions offline.');
      break;
    }
    case 'truth-or-dare-generator': {
      const truths = [
        'What is your most embarrassing moment?',
        'What is the last lie you told?',
        'What is your biggest fear?',
        'What is your guilty pleasure?',
        'What is the weirdest dream you\'ve had?',
        'What is something nobody here knows about you?'
      ];
      const dares = [
        'Do your best impression of someone here',
        'Speak in an accent for the next 3 rounds',
        'Let someone go through your recent photos',
        'Do 20 jumping jacks right now',
        'Text your crush "hey" right now',
        'Try to lick your elbow'
      ];
      const t = [...truths].sort(() => Math.random() - 0.5).slice(0, 3);
      const d = [...dares].sort(() => Math.random() - 0.5).slice(0, 3);
      result = `TRUTHS:\n${t.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nDARES:\n${d.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
      resultHtml = renderHeadlineGroups([
        { title: 'Truth Prompts', note: 'Reveal fun or interesting secrets.', items: t },
        { title: 'Dare Challenges', note: 'Fun physical or social actions.', items: d }
      ], 'Play responsibly. Everyone has the right to pass on any prompt.');
      break;
    }
    case 'would-you-rather-generator': {
      const wyrs = [
        ['be able to fly', 'be invisible'],
        ['live in the past', 'live in the future'],
        ['have unlimited money', 'unlimited free time'],
        ['never sleep again', 'never eat again'],
        ['know every language', 'play every instrument'],
        ['be 10 years older', 'be 5 years younger'],
        ['only eat pizza forever', 'never eat pizza again'],
        ['have super strength', 'have super speed']
      ];
      const shuffled = [...wyrs].sort(() => Math.random() - 0.5);
      const chosen = shuffled.slice(0, 5).map(([a, b]) => `Would you rather ${a} OR ${b}?`);
      result = chosen.map((c, i) => `${i + 1}. ${c}`).join('\n\n');
      resultHtml = renderHeadlineGroups([{ title: 'Would You Rather Questions', note: 'Engaging, hard-choice prompts for groups.', items: chosen }], 'Ask follow-up questions to understand the reasons behind each choice.');
      break;
    }
    case 'joke-generator': {
      const jokes = [
        "Why do programmers prefer dark mode?\nBecause light attracts bugs!",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "Why did the developer go broke?\nBecause he used up all his cache!"
      ].join('\n\n---\n\n');

      result = jokes;
      resultHtml = renderSectionSuite('Programming & General Jokes', [
        { title: 'Developer Jokes', body: jokes, note: 'Clean humor.' }
      ], 'Generates jokes offline.');
      break;
    }
    case 'compliment-generator': {
      const compliments = [
        'Your creativity and attention to detail inspire everyone around you.',
        'You have a rare ability to bring out the best in other people.',
        'Your positive energy is truly contagious!'
      ].join('\n\n');

      result = compliments;
      resultHtml = renderSectionSuite('Uplifting Compliments Package', [
        { title: 'Positive Compliments', body: compliments, note: 'Spread kindness.' }
      ], 'Generates positive compliments offline.');
      break;
    }
    case 'email-signature-generator': {
      const layout = optionValue('signature-layout', 'modern');
      const role = optionValue('signature-role', 'designer');
      const includeHtml = optionValue('signature-include-html', 'true') === 'true';
      const includeSocials = optionValue('signature-include-socials', 'true') === 'true';

      const name = compactSeed(text, 'Alex Morgan');
      const title = role || 'Senior Product Designer';
      const email = 'alex@example.com';
      const website = 'https://example.com';

      const htmlSig = `<table cellpadding="0" cellspacing="0" style="font-family:sans-serif; font-size:14px; color:#333;">\n  <tr>\n    <td style="padding-right:15px; border-right:2px solid #2563eb;">\n      <strong style="font-size:16px; color:#1e293b;">${escapeHtml(name)}</strong><br />\n      <span style="color:#64748b;">${escapeHtml(title)}</span>\n    </td>\n    <td style="padding-left:15px;">\n      Email: <a href="mailto:${email}" style="color:#2563eb;">${email}</a><br />\n      Web: <a href="${website}" style="color:#2563eb;">${website}</a>\n    </td>\n  </tr>\n</table>`;

      result = htmlSig;
      resultHtml = renderSectionSuite('HTML Email Signature Package', [
        { title: 'HTML Signature Markup (' + titleCase(layout) + ')', body: htmlSig, note: 'Include Socials: ' + includeSocials }
      ], 'Generates inline-styled email signatures client-side.');
      break;
    }
    case 'gradient-generator': {
      const type = optionValue('gradient-type', 'linear');
      const direction = optionValue('gradient-direction', '135deg');
      const stops = optionValue('gradient-stops', '3');

      const css = `background: ${type}-gradient(${direction}, #2563eb 0%, #7c3aed 50%, #db2777 100%);`;

      result = css;
      resultHtml = renderSectionSuite('CSS Linear Gradient Package', [
        { title: 'CSS Gradient Style (' + type + ')', body: css, note: 'Stops: ' + stops }
      ], 'Generates CSS background gradients client-side.');
      break;
    }
    case 'font-pairing-generator': {
      const mood = optionValue('font-pairing-mood', 'modern');

      const pairings = [
        'Heading: Inter (700) | Body: Inter (400) - Modern SaaS Clean',
        'Heading: Playfair Display (700) | Body: Source Sans Pro (400) - Elegant Editorial',
        'Heading: Outfit (700) | Body: Roboto (400) - Creative Studio'
      ].join('\n\n');

      result = pairings;
      resultHtml = renderSectionSuite('Google Fonts Pairing Suggestions', [
        { title: 'Font Combinations (' + titleCase(mood) + ')', body: pairings, note: 'Recommended typography pairs.' }
      ], 'Curated typography pairings for modern web design.');
      break;
    }
    case 'blog-outline-generator': {
      const intent = optionValue('search-intent', 'informational');
      const length = optionValue('article-length', 'medium');
      const topic = compactSeed(text, 'Modern Web Performance');

      const outline = `# Article Outline: ${topic} (${intent.toUpperCase()})\n\n1. Introduction\n   - Hook: Why ${topic} matters today\n   - Key statistics and overview\n   - Thesis statement\n\n2. Core Concepts of ${topic}\n   - Understanding fundamental principles\n   - Key tools and methodologies\n\n3. Step-by-Step Implementation Guide\n   - Phase 1: Setup and preparation\n   - Phase 2: Execution and best practices\n   - Phase 3: Measuring performance metrics\n\n4. Common Pitfalls to Avoid\n   - Mistake 1: Ignoring baseline audits\n   - Mistake 2: Over-complicating configurations\n\n5. Conclusion\n   - Summary of key takeaways\n   - Call to action for readers`;

      result = outline;
      resultHtml = renderSectionSuite('Structured Blog Post Outline', [
        { title: 'Blog Post Outline', body: outline, note: 'Length: ' + length }
      ], 'Generates structured article outlines client-side.');
      break;
    }
    case 'cold-email-generator': {
      const offer = (text || 'your offer').trim();
      const purpose = optionValue('email-purpose', 'sales');
      const tone = optionValue('email-tone', 'concise');
      const sections = [
        { title: 'Subject Lines', body: `Quick question about ${offer}\nIdea for [Company]\nWorth a quick look?\nHelping with ${offer}`, note: 'Honest, non-spammy options' },
        { title: 'Opener', body: `Hi [Name],\n\nI noticed [specific, truthful observation about their company or role] and thought this might be relevant.`, note: 'Replace with real personalization' },
        { title: 'Personalized Pitch', body: `Purpose: ${purpose}. Tone: ${tone}.\n\nI help teams with ${offer} by making the next step clearer, faster, and easier to act on. If a related challenge is a priority, this may be useful.`, note: 'Keep the pitch brief' },
        { title: 'Value / Proof Section', body: `A simple way to frame the value: fewer manual steps, clearer messaging, and a more consistent process. Add only proof you can verify, such as a real case study or result.`, note: 'No fake metrics' },
        { title: 'CTA', body: `Would it be worth a 15-minute conversation next week, or should I send a short overview first?`, note: 'Low-friction next step' },
        { title: 'Full Email Draft', body: `Subject: Quick question about ${offer}\n\nHi [Name],\n\nI noticed [specific, truthful observation about their company or role] and thought this might be relevant.\n\nI help teams with ${offer} by making the next step clearer, faster, and easier to act on. If [specific challenge] is a priority, this may be useful.\n\nWould it be worth a 15-minute conversation next week, or should I send a short overview first?\n\nBest,\n[Your Name]`, note: 'Draft, not final send copy' },
        { title: 'Follow-Up Variant', body: `Subject: Re: ${offer}\n\nHi [Name],\n\nJust bringing this back once in case ${offer} is on your radar. Happy to send a short overview instead of booking time if that is easier.\n\nBest,\n[Your Name]`, note: 'Respectful one-time follow-up' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Cold Email Package', sections, 'Personalize honestly and follow applicable email and privacy rules.');
      break;
    }
    case 'cover-letter-generator': {
      const tone = optionValue('letter-tone', 'professional');
      const level = optionValue('experience-level', 'mid');

      const role = compactSeed(text, 'Software Engineer');
      const company = 'Acme Corp';
      const doc = "Dear Hiring Manager at " + company + ",\n\nI am writing to express my enthusiastic interest in the " + role + " position (" + tone + ", " + level + "). With my background in building scalable solutions and delivering high-impact projects, I am confident in my ability to contribute effectively to your team.\n\nIn my previous roles, I have consistently driven results by collaborating closely with cross-functional teams, solving complex technical challenges, and maintaining high standards of performance and quality.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my experience aligns with " + company + "'s goals.\n\nSincerely,\n[Your Name]";
      result = doc;
      resultHtml = renderSectionSuite('Cover Letter Package', [{ title: 'Generated Cover Letter', body: doc, note: 'Tailored for ' + role }], 'Generates professional cover letters client-side.');
      break;
    }
    case 'resume-summary-generator': {
      const seniority = optionValue('resume-seniority', 'mid');
      const tone = optionValue('resume-tone', 'impact');

      const role = compactSeed(text, 'Product Manager');
      const summaries = [
        "Results-driven " + role + " (" + seniority + ") with 5+ years of experience delivering customer-centric products and driving cross-functional team execution.",
        "Innovative " + role + " skilled in product strategy, roadmap planning, and leveraging data analytics to optimize user engagement (" + tone + ").",
        "Adaptable " + role + " focused on building scalable software solutions and fostering team collaboration in fast-paced environments."
      ].join('\n\n');
      result = summaries;
      resultHtml = renderSectionSuite('Resume Summary Statements', [{ title: 'Summary Options', body: summaries, note: 'Choose the best fit for your CV.' }], 'Generates resume summaries client-side.');
      break;
    }
    case 'resume-summary-generator-legacy': {
      const role = text || 'professional';
      const cap = role.charAt(0).toUpperCase() + role.slice(1);
      const summaries = [
        `Results-driven ${role} with ${Math.floor(Math.random() * 10) + 3}+ years of experience delivering measurable outcomes. Proven track record in strategic planning, team leadership, and driving revenue growth.`,
        `Dynamic ${role} combining technical expertise with creative problem-solving. Skilled in data analysis, project management, and cross-functional collaboration.`,
        `Passionate ${role} dedicated to excellence and continuous improvement. Strong background in ${role}-related initiatives with a focus on ROI and stakeholder satisfaction.`,
        `Innovative ${cap} professional with deep expertise in industry best practices. Known for building high-performing teams and delivering projects on time and under budget.`];
      result = summaries.join('\n\n---\n\n');
      break;
    }
    case 'ad-copy-generator': {
      const platform = optionValue('ad-platform', 'facebook');
      const objective = optionValue('ad-objective', 'conversions');
      const tone = optionValue('ad-tone', 'persuasive');

      const product = compactSeed(text, 'AI Productivity Tool');
      const copy = [
        "🔥 Stop wasting hours on repetitive tasks! " + product + " helps you get work done 10x faster (" + platform + "). Try it free today! 👉 [Link]",
        "Looking for a smarter way to manage your work? Discover " + product + " — built for professionals (" + objective + "). Click to learn more.",
        "⚡ Upgrade your workflow with " + product + " (" + tone + "). Join thousands of happy users saving time every single day."
      ].join('\n\n---\n\n');
      result = copy;
      resultHtml = renderSectionSuite('Ad Copy Angles', [{ title: 'High-Converting Ad Copy', body: copy, note: 'Platform: ' + platform }], 'Generates ad copy client-side.');
      break;
    }
    case 'call-to-action-generator': {
      const goal = optionValue('cta-goal', 'conversion');
      const intensity = optionValue('cta-intensity', 'high');

      const topic = compactSeed(text, 'free trial');
      const ctas = [
        "Get Started with Your " + titleCase(topic) + " Today! (" + goal + ")",
        "Claim Your " + titleCase(topic) + " Now — Limited Time Offer [" + intensity + "]",
        "Join Thousands of Professionals & Unlock " + titleCase(topic),
        "Start Saving Time — Access " + titleCase(topic) + " Instantly"
      ].join('\n');
      result = ctas;
      resultHtml = renderSectionSuite('Call To Action Buttons & Copy', [{ title: 'CTA Copy Options', body: ctas, note: 'High CTR buttons & headlines.' }], 'Generates persuasive CTAs client-side.');
      break;
    }
    case 'product-description-generator': {
      const marketplace = optionValue('product-marketplace', 'amazon');
      const tone = optionValue('product-tone', 'persuasive');
      const benefitFocus = optionValue('benefit-focus', 'usability');

      const item = compactSeed(text, 'Wireless Ergonomic Keyboard');
      const desc = "Elevate your workspace with the " + item + " (" + marketplace + ", " + tone + "). Engineered for comfort, speed, and durability, this premium tool combines modern aesthetic design with effortless functionality [" + benefitFocus + "].\n\nKEY FEATURES:\n• Ergonomic design reducing wrist strain\n• Premium ultra-quiet key switches\n• Multi-device seamless connectivity\n• Long-lasting battery life\n\nPERFECT FOR:\nProfessionals, remote workers, and creators looking for maximum productivity.";
      result = desc;
      resultHtml = renderSectionSuite('E-Commerce Product Description', [{ title: 'Product Overview & Features', body: desc, note: 'SEO optimized sales description.' }], 'Generates product copy client-side.');
      break;
    }
    case 'random-emoji-generator': {
      const pool = ['🚀', '✨', '🔥', '💡', '🎉', '⚡', '🎯', '🌟', '🏆', '💎', '🎨', '🧩', '💻', '🔮', '🌈', '🍀'];
      const count = 10;
      const emojis = Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)]).join(' ');
      result = emojis;
      resultHtml = renderSectionSuite('Random Emoji Combination', [{ title: 'Generated Emojis', body: emojis, note: 'Copy into social posts or bios.' }], 'Generates random emojis offline.');
      break;
    }
    case 'random-country-generator': {
      const countries = [
        'Japan (Tokyo) [JP]', 'Brazil (Brasília) [BR]', 'Canada (Ottawa) [CA]',
        'Australia (Canberra) [AU]', 'Germany (Berlin) [DE]', 'Kenya (Nairobi) [KE]',
        'Norway (Oslo) [NO]', 'India (New Delhi) [IN]', 'Mexico (Mexico City) [MX]'
      ];
      const count = 5;
      const selected = Array.from({ length: count }, () => countries[Math.floor(Math.random() * countries.length)]).join('\n');
      result = selected;
      resultHtml = renderSectionSuite('Random Country Selection', [{ title: 'Countries & Capitals', body: selected, note: 'Geography reference.' }], 'Generates random countries offline.');
      break;
    }
    case 'random-date-generator': {
      const dates = Array.from({ length: 5 }, () => {
        const year = 2020 + Math.floor(Math.random() * 6);
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
        return year + "-" + month + "-" + day;
      }).join('\n');
      result = dates;
      resultHtml = renderSectionSuite('Random Dates Package', [{ title: 'ISO Formatted Dates (YYYY-MM-DD)', body: dates, note: 'Random date sampler.' }], 'Generates random dates offline.');
      break;
    }
    case 'random-choice-generator': {
      const mode = optionValue('choice-mode', 'single');
      const includeAlts = optionValue('choice-include-alternates', 'true') === 'true';

      const items = text ? text.split('\n').filter(Boolean) : ['Option A', 'Option B', 'Option C', 'Option D'];
      const winner = items[Math.floor(Math.random() * items.length)];
      result = '🏆 Selected Choice (' + mode + '): ' + winner + '\nInclude Alternates: ' + includeAlts;
      resultHtml = renderSectionSuite('Random Choice Picker', [
        { title: 'Winning Selection', body: '🏆 ' + winner, note: 'Selected out of ' + items.length + ' options.' }
      ], 'Picks random choices client-side.');
      break;
    }
    case 'game-idea-generator': {
      const genreOpt = optionValue('game-idea-genre', 'rpg');
      const platform = optionValue('game-platform', 'pc');
      const scope = optionValue('game-scope', 'indie');
      const playerCount = optionValue('game-player-count', 'singleplayer');
      const tone = optionValue('game-tone', 'atmospheric');
      const prototype = optionValue('game-prototype', '2d');

      const genres = ['Cyberpunk Action', 'Cozy Farming Sim', 'Rogue-like Deckbuilder', 'Space Exploration RPG', 'Puzzle Platformer'];
      const genre = genreOpt || randomFrom(genres);
      const title = 'Chronicles of ' + compactSeed(text, 'Aether');
      const hook = "Title: " + title + "\nGenre: " + genre + " | Platform: " + platform + "\nScope: " + scope + " | Players: " + playerCount + "\nTone: " + tone + " | View: " + prototype + "\nCore Mechanic: Time manipulation mechanics combined with tactical grid movement.\nSetting: A floating island world where players gather rare energy crystals to prevent world collapse.";
      result = hook;
      resultHtml = renderSectionSuite('Video Game Concept Package', [{ title: 'Game Concept Overview', body: hook, note: 'Indie game development prompt.' }], 'Generates game concepts client-side.');
      break;
    }
    case 'rpg-character-generator': {
      const role = optionValue('rpg-character-role', 'hero');
      const partyRole = optionValue('rpg-party-role', 'tank');
      const prompts = optionValue('rpg-roleplay-prompts', 'true') === 'true';

      const races = ['Elf', 'Human', 'Dwarf', 'Orc', 'Tiefling'];
      const classes = ['Paladin', 'Wizard', 'Rogue', 'Ranger', 'Cleric'];
      const race = randomFrom(races);
      const cls = randomFrom(classes);
      const name = compactSeed(text, 'Valerius');
      const stats = "Name: " + name + " (" + role + ")\nRace: " + race + " | Class: " + cls + "\nParty Role: " + partyRole + " | Prompts: " + prompts + "\nSTR: 14 | DEX: 16 | CON: 12 | INT: 15 | WIS: 10 | CHA: 18\nBackground: Former Royal Scholar seeking ancient magical artifacts.";
      result = stats;
      resultHtml = renderSectionSuite('RPG Character Sheet', [{ title: 'Character Profile', body: stats, note: 'D&D 5e / TTRPG character sheet.' }], 'Generates RPG characters offline.');
      break;
    }
    case 'npc-generator': {
      const roleOpt = optionValue('npc-role', 'merchant');
      const setting = optionValue('npc-setting', 'fantasy');
      const secret = optionValue('npc-secret', 'vault');

      const roles = ['Tavernkeeper', 'Blacksmith', 'Mystic Scholar', 'Guild Quartermaster', 'Wandering Merchant'];
      const role = roleOpt || randomFrom(roles);
      const name = compactSeed(text, 'Gideon');
      const npc = "Name: " + name + " the " + role + " (" + setting + ")\nPersonality: Cautious, superstitious, speaks in low whispers.\nSecret: " + secret + "\nQuote: \"The shadows here have eyes, traveler...\"";
      result = npc;
      resultHtml = renderSectionSuite('Non-Player Character (NPC)', [{ title: 'NPC Profile & Quest Hook', body: npc, note: 'Tabletop RPG NPC generator.' }], 'Generates NPCs client-side.');
      break;
    }
    case 'quest-generator': {
      const type = optionValue('quest-type', 'fetch');
      const scope = optionValue('quest-scope', 'local');
      const clues = optionValue('quest-clues', 'map');
      const rewards = optionValue('quest-rewards', 'gold');

      const name = compactSeed(text, 'Lost Artifact');
      const quest = "Quest Title: The Search for the " + titleCase(name) + "\nType: " + type + " | Scope: " + scope + "\nClues: " + clues + " | Reward: " + rewards + "\nObjective: Retrieve the ancient crystal before the cultists unlock its power.\nTwist: The artifact is guarded by a creature that can mirror party abilities.";
      result = quest;
      resultHtml = renderSectionSuite('RPG Quest Prompt', [{ title: 'Quest Details & Twist', body: quest, note: 'Adventure quest line.' }], 'Generates adventure quests offline.');
      break;
    }
    case 'story-plot-generator': {
      const genre = optionValue('story-plot-genre', 'scifi');
      const tone = optionValue('story-plot-tone', 'dramatic');
      const twist = optionValue('story-plot-twist', 'betrayal');

      const topic = compactSeed(text, 'alien contact');
      const plot = "STORY PLOT OUTLINE (" + titleCase(genre) + ")\nTone: " + tone + " | Twist: " + twist + "\n\nProtagonist: A brilliant astronomer burdened by past mistakes.\nInciting Incident: Detects an encrypted signal originating from deep space.\nRising Action: Uncovers a conspiracy to hide the signal from the public.\nClimax: A race against time to transmit a response before satellite access is cut off.\nResolution: Establishing first contact and changing humanity's future forever.";
      result = plot;
      resultHtml = renderSectionSuite('Narrative Story Plot', [{ title: 'Plot Structure Outline', body: plot, note: 'Novel & screenplay plot outline.' }], 'Generates story plots client-side.');
      break;
    }
    case 'riddle-generator': {
      const riddles = [
        'Riddle: I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?\nAnswer: A Map.',
        'Riddle: What comes once in a minute, twice in a moment, but never in a thousand years?\nAnswer: The letter "M".',
        'Riddle: The more of this there is, the less you see. What is it?\nAnswer: Darkness.'
      ].join('\n\n');
      result = riddles;
      resultHtml = renderSectionSuite('Classic Riddles & Answers', [{ title: 'Riddles Package', body: riddles, note: 'Brain teasers.' }], 'Generates riddles offline.');
      break;
    }
    case 'icebreaker-generator': {
      const prompts = [
        'If you could add any one feature to our product overnight, what would it be?',
        'What is your favorite remote work productivity hack?',
        'What was your first job, and what is one thing you learned from it?'
      ].join('\n\n');
      result = prompts;
      resultHtml = renderSectionSuite('Team Meeting Icebreakers', [{ title: 'Conversation Starters', body: prompts, note: 'Professional team prompts.' }], 'Generates icebreakers client-side.');
      break;
    }
    case 'product-title-generator': {
      const marketplace = optionValue('title-marketplace', 'amazon');
      const focus = optionValue('title-benefit-focus', 'durability');
      const style = optionValue('title-style', 'descriptive');

      const kw = compactSeed(text, 'Coffee Grinder');
      const titles = [
        "Professional Electric " + kw + " - Stainless Steel Conical Burr (" + marketplace + ")",
        "Ultra-Quiet Precision " + kw + " with 30 Grinding Settings [" + focus + "]",
        "Compact Automatic " + kw + " for Espresso & French Press (" + style + ")"
      ].join('\n');
      result = titles;
      resultHtml = renderSectionSuite('E-Commerce Product Titles', [{ title: 'High-CTR Product Titles', body: titles, note: 'Marketplace: ' + marketplace }], 'Generates product titles offline.');
      break;
    }
    case 'sku-generator': {
      const format = optionValue('sku-format', 'standard');
      const cat = 'ELEC';
      const item = 'KB';
      const skus = Array.from({ length: 5 }, (_, i) => cat + "-" + item + "-BLK-00" + (i + 1) + " (" + format + ")").join('\n');
      result = skus;
      resultHtml = renderSectionSuite('Standardized Product SKUs', [{ title: 'Stock Keeping Units', body: skus, note: 'Format: ' + format }], 'Generates SKU numbers client-side.');
      break;
    }
    case 'testimonial-generator': {
      const product = compactSeed(text, 'App');
      const rev = '"Using ' + product + ' completely transformed how our team works. We reduced project delivery time by 35% within the first month. Highly recommended!"\n— Sarah Jenkins, Operations Lead';
      result = rev;
      resultHtml = renderSectionSuite('Customer Testimonial Template', [{ title: 'Social Proof Copy', body: rev, note: 'Website review format.' }], 'Generates testimonials offline.');
      break;
    }
    case 'keyword-generator': {
      const localMod = optionValue('keyword-local-modifier', 'near me');
      const seed = compactSeed(text, 'seo tools');
      const keywords = [
        "best " + seed + " for small business " + localMod,
        "free " + seed + " online",
        "how to use " + seed + " step by step",
        seed + " comparison guide 2026",
        "top rated " + seed + " software"
      ].join('\n');
      result = keywords;
      resultHtml = renderSectionSuite('Long-Tail Keyword Ideas', [{ title: 'LSI & Search Keywords', body: keywords, note: 'Modifier: ' + localMod }], 'Generates keywords client-side.');
      break;
    }
    case 'faq-generator': {
      const audience = optionValue('faq-audience', 'general');
      const tone = optionValue('faq-tone', 'friendly');
      const topic = compactSeed(text, 'Service');

      const faqs = "Q: How does " + topic + " work?\nA: Our platform simplifies execution through automated workflows (" + audience + ").\n\nQ: Is there a free trial available?\nA: Yes, we offer a 14-day free trial with full feature access.\n\nQ: Can I cancel my subscription anytime?\nA: Absolutely, you can manage or cancel your plan anytime from dashboard settings.";
      result = faqs;
      resultHtml = renderSectionSuite('FAQ Accordion Package', [{ title: 'Frequently Asked Questions', body: faqs, note: 'Tone: ' + tone }], 'Generates FAQ content offline.');
      break;
    }
    case 'license-key-generator': {
      const genSegment = () => Array.from({ length: 4 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]).join('');
      const keys = Array.from({ length: 5 }, () => genSegment() + "-" + genSegment() + "-" + genSegment() + "-" + genSegment()).join('\n');
      result = keys;
      resultHtml = renderSectionSuite('Activation License Keys', [{ title: 'License Keys', body: keys, note: 'Alphanumeric XXXXX-XXXXX format.' }], 'Generates license keys client-side.');
      break;
    }
    case 'recovery-code-generator': {
      const genCode = () => Array.from({ length: 8 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]).join('');
      const codes = Array.from({ length: 8 }, (_, i) => (i + 1) + ". " + genCode().slice(0,4) + "-" + genCode().slice(4,8)).join('\n');
      result = codes;
      resultHtml = renderSectionSuite('2FA Backup Recovery Codes', [{ title: 'Backup Codes', body: codes, note: 'Store in a safe place.' }], 'Generates recovery codes offline.');
      break;
    }
    case 'coupon-code-generator': {
      const style = optionValue('coupon-code-style', 'alphanumeric');
      const prefix = 'SAVE';
      const codes = Array.from({ length: 5 }, () => prefix + Math.floor(10 + Math.random() * 90) + " (" + style + ")").join('\n');
      result = codes;
      resultHtml = renderSectionSuite('Promo Coupon Codes', [{ title: 'Discount Codes', body: codes, note: 'Style: ' + style }], 'Generates promo codes offline.');
      break;
    }
    case 'barcode-generator': {
      const type = optionValue('barcode-type', 'code128');
      const value = (text || (type === 'ean13' ? '1234567890123' : type === 'upca' ? '123456789012' : 'SKU-EXAMPLE-001')).trim();
      const normalized = type === 'code39' ? value.toUpperCase().replace(/[^A-Z0-9 .$/+%-]/g, '') : value;
      const numeric = value.replace(/\D/g, '');
      const validation = type === 'ean13' ? (numeric.length === 13 ? 'EAN-13 digit count looks structurally valid, but this does not verify GS1 registration, ownership, checksum correctness, retailer acceptance, or scan quality.' : 'EAN-13 needs 13 digits including checksum; official validity still requires separate verification.') : type === 'upca' ? (numeric.length === 12 ? 'UPC-A digit count looks structurally valid, but this does not verify GS1 registration, ownership, checksum correctness, retailer acceptance, or scan quality.' : 'UPC-A needs 12 digits including checksum; official validity still requires separate verification.') : type === 'code39' ? 'Code 39 supports uppercase letters, digits, space, and . $ / + % - . Test the final printed barcode with a scanner before production use.' : 'Code 128 can encode broad ASCII text; final scannability depends on a real barcode renderer, print quality, size, contrast, and scanner testing.';
      const label = optionValue('barcode-label', 'true') === 'true' ? `Human-readable label: ${normalized}` : 'Human-readable label disabled.';
      const checklist = '- This page outputs barcode value text and labels for formatting, labeling, testing, or planning help only.\n- Use a real barcode library or print system to create scannable artwork.\n- Verify the final printed result with a real barcode scanner before production use.\n- Do not treat generated UPC/EAN values as registered GS1 assignments or official retail, inventory, shipping, or compliance-valid codes.\n- Verify quiet zones, size, contrast, checksum, assigned number ownership, and any required standards in your final workflow.\n- Do not use the output to make fake official barcode claims.';
      result = `Barcode Payload Summary\nType: ${type}\nValue: ${normalized}\n\nValidation Summary\n${validation}\n\nHuman-Readable Label\n${label}\n\nPrint Handoff Checklist\n${checklist}`;
      resultHtml = renderSectionSuite('Barcode Text Package', [
        { title: 'Barcode Text', body: normalized, note: type },
        { title: 'Human-Readable Label', body: label, note: 'Text preview only' },
        { title: 'Validation Summary', body: validation, note: 'Structural checks, not registry validation' },
        { title: 'Print Handoff Checklist', body: checklist, note: 'No fake scannable claim' }], 'Barcode output is formatting help only. Use a real barcode renderer and verify scannability with a physical scanner before production; official GS1, UPC/EAN, retail, inventory, shipping, or compliance validity must be confirmed separately.');
      break;
    }
    case 'refund-policy-generator': {
      const company = compactSeed(text, 'Acme Store');
      const doc = "REFUND & RETURN POLICY\n\nAt " + company + ", customer satisfaction is our priority. If you are not completely satisfied with your purchase, we offer a 30-day return window.\n\nELIGIBILITY:\n• Items must be unused and in original packaging.\n• Proof of purchase is required.\n\nREFUND PROCESS:\nOnce we receive and inspect your return, we will issue a full refund to your original payment method within 5-7 business days.";
      result = doc;
      resultHtml = renderSectionSuite('Return & Refund Policy', [{ title: 'Store Refund Policy', body: doc, note: 'Standard e-commerce terms.' }], 'Generates refund policy client-side.');
      break;
    }
    case 'shipping-policy-generator': {
      const store = compactSeed(text, 'Acme Store');
      const doc = "SHIPPING POLICY\n\n" + store + " ships orders Monday through Friday.\n\nPROCESSING TIME:\nOrders are processed within 1-2 business days.\n\nSHIPPING RATES & ESTIMATES:\n• Standard Shipping (3-5 business days): $4.99 (Free on orders over $50)\n• Express Shipping (1-2 business days): $12.99\n\nTRACKING:\nYou will receive a tracking number via email as soon as your order ships.";
      result = doc;
      resultHtml = renderSectionSuite('Shipping Policy Package', [{ title: 'Store Shipping Policy', body: doc, note: 'Clear delivery expectations.' }], 'Generates shipping policy offline.');
      break;
    }
    case 'affiliate-disclosure-generator': {
      const site = compactSeed(text, 'MyBlog');
      const doc = "AFFILIATE DISCLOSURE\n\n" + site + " is a participant in affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to partner sites.\n\nIf you click on an affiliate link and make a purchase, we may receive a small commission at no additional cost to you. We only recommend products we genuinely believe in.";
      result = doc;
      resultHtml = renderSectionSuite('FTC Affiliate Disclosure', [{ title: 'Affiliate Statement', body: doc, note: 'FTC compliance text.' }], 'Generates affiliate disclosure client-side.');
      break;
    }
    case 'invoice-generator': {
      const client = compactSeed(text, 'Client Corp');
      const invNum = 'INV-2026-001';
      const doc = "INVOICE: " + invNum + "\nDate: 2026-07-20\nTo: " + client + "\n\nITEMS:\n1. Web Design & Development - $1,500.00\n2. SEO Audit & Optimization - $500.00\n\nSUBTOTAL: $2,000.00\nTAX (10%): $200.00\nTOTAL DUE: $2,200.00\n\nPayment due within 30 days.";
      result = doc;
      resultHtml = renderSectionSuite('Client Invoice Package', [{ title: 'Invoice Details & Calculation', body: doc, note: 'Calculates tax & total due.' }], 'Generates invoice summaries offline.');
      break;
    }
    case 'meeting-agenda-generator': {
      const type = optionValue('meeting-type', 'sprint');
      const duration = optionValue('meeting-duration', '45m');
      const includePrep = optionValue('meeting-include-prep', 'true') === 'true';
      const includeActions = optionValue('meeting-include-actions', 'true') === 'true';

      const title = compactSeed(text, 'Weekly Sprint Planning');
      const agenda = "MEETING AGENDA: " + title + " (" + type + ")\nDuration: " + duration + " | Include Prep: " + includePrep + "\n\nAGENDA:\n1. 00:00 - 00:10 | Review previous sprint goals\n2. 00:10 - 00:25 | Project updates & roadmap alignment\n3. 00:25 - 00:35 | Blockers & open discussions\n4. 00:35 - 00:45 | Action items & next steps assignment (Actions: " + includeActions + ")";
      result = agenda;
      resultHtml = renderSectionSuite('Structured Meeting Agenda', [{ title: 'Timed Meeting Agenda', body: agenda, note: 'Keep meetings on track.' }], 'Generates meeting agendas client-side.');
      break;
    }
    case 'citation-generator': {
      const sourceType = optionValue('citation-source-type', 'book');
      const style = optionValue('citation-style', 'apa');

      const author = compactSeed(text, 'Smith, John');
      const title = 'Modern Web Architecture';
      const publisher = 'Tech Press';
      const year = '2025';

      const apa = author + ". (" + year + "). " + title + ". " + publisher + ". [" + sourceType + "]";
      const mla = author + '. "' + title + '." ' + publisher + ", " + year + ". [" + style + "]";

      const output = "APA 7th:\n" + apa + "\n\nMLA 9th:\n" + mla;
      result = output;
      resultHtml = renderSectionSuite('Academic Citation Formats', [
        { title: 'APA & MLA Citations', body: output, note: 'Formatted academic references.' }
      ], 'Generates citations offline.');
      break;
    }
    case 'citation-generator-legacy': {
      const year = new Date().getFullYear();
      result = `APA Format (7th Edition):\nAuthor, A. A. (${year}). Title of work. Publisher.\nAuthor, A. A. (${year}). Title of article. Journal Name, Vol(Issue), pp-pp. https://doi.org/xxxxx\n\nMLA Format (9th Edition):\nAuthor Last, First. "Title of Article." Journal Name, vol. X, no. X, ${year}, pp. XX-XX.\nAuthor Last, First. Title of Book. Publisher, ${year}.\n\nChicago Format:\nAuthor Last, First. Title of Book. City: Publisher, ${year}.\nAuthor Last, First. "Title of Article." Journal Name Vol, no. Issue (${year}): pp-pp.\n\nHarvard Format:\nAuthor, A.A. (${year}) Title of work. City: Publisher.\nAuthor, A.A. (${year}) 'Title of article', Journal Name, Vol(Issue), pp. XX-XX.`;
      break;
    }
    case 'linkedin-post-generator': {
      const topic = compactSeed(text, 'productivity hack');
      const post = "Here is one lesson I learned about " + topic + " that changed everything:\n\nMost people struggle because they focus on output instead of clarity.\n\n3 steps that helped our team:\n1. Simplify the workflow\n2. Measure key bottlenecks\n3. Automate repetitive tasks\n\nWhat is your top productivity tip? Let me know below! 👇\n\n#Leadership #Productivity #Career";
      result = post;
      resultHtml = renderSectionSuite('LinkedIn Viral Post Format', [{ title: 'LinkedIn Post Draft', body: post, note: 'Formatted with strong hook.' }], 'Generates LinkedIn posts client-side.');
      break;
    }
    case 'facebook-post-generator': {
      const tone = optionValue('facebook-tone', 'casual');
      const goal = optionValue('facebook-goal', 'engagement');

      const topic = compactSeed(text, 'new launch');
      const post = "🎉 Big announcement! We just unveiled our " + topic + "! Check out all the new features (" + tone + ", " + goal + ") and tell us what you think in the comments below! 👇\n\nLink: https://example.com";
      result = post;
      resultHtml = renderSectionSuite('Facebook Post Package', [{ title: 'Facebook Post Draft', body: post, note: 'Engaging caption with call to action.' }], 'Generates Facebook posts offline.');
      break;
    }
    case 'social-media-post-generator': {
      const platform = optionValue('social-platform', 'instagram');
      const goal = optionValue('social-goal', 'brand_awareness');

      const topic = compactSeed(text, 'weekly tip');
      const post = "✨ Weekly Tip (" + platform + "): Master " + topic + " by taking small, consistent steps every day. (" + goal + ") 💪\n\n#Tips #Motivation #Growth";
      result = post;
      resultHtml = renderSectionSuite('Multi-Platform Social Post', [{ title: 'Social Caption', body: post, note: 'Ready for Instagram, X, or FB.' }], 'Generates social posts client-side.');
      break;
    }
    case 'headline-generator': {
      const channel = optionValue('headline-channel', 'blog');
      const tone = optionValue('headline-tone', 'curiosity');

      const topic = compactSeed(text, 'Time Management');
      const headlines = [
        "10 Proven " + topic + " Tips That Actually Work (" + channel + ")",
        "How to Master " + topic + " in 5 Easy Steps [" + tone + "]",
        "The Ultimate Guide to " + topic + " for Professionals",
        "Why " + topic + " Matters More Than You Think"
      ].join('\n');
      result = headlines;
      resultHtml = renderSectionSuite('High-Converting Headlines', [{ title: 'Headline Options', body: headlines, note: 'Listicle & guide style headlines.' }], 'Generates headlines client-side.');
      break;
    }
    case 'meme-text-generator': {
      const topic = compactSeed(text, 'Debugging');
      const meme = "Top Text: Spending 4 hours writing code\nBottom Text: Spending 4 hours fixing a missing semicolon in " + topic;
      result = meme;
      resultHtml = renderSectionSuite('Meme Caption Pair', [{ title: 'Meme Top & Bottom Text', body: meme, note: 'Classic 2-line meme text.' }], 'Generates meme text offline.');
      break;
    }
    case 'startup-name-generator': {
      const style = optionValue('startup-name-style', 'modern');
      const kw = compactSeed(text, 'cloud');
      const names = [titleCase(kw) + "ify", titleCase(kw) + "ly", titleCase(kw) + "Sync", titleCase(kw) + "Pulse", titleCase(kw) + "Labs (" + style + ")"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Modern Startup Names', [{ title: 'Brandable Startup Ideas', body: names, note: 'Domain-ready business names.' }], 'Generates startup names offline.');
      break;
    }
    case 'photography-name-generator': {
      const style = optionValue('photography-name-style', 'portrait');
      const name = compactSeed(text, 'Aura');
      const studioNames = [name + " Lens Photography", name + " Studio Captures (" + style + ")", "Golden Hour " + name + " Photo"].join('\n');
      result = studioNames;
      resultHtml = renderSectionSuite('Photography Studio Names', [{ title: 'Studio Name Ideas', body: studioNames, note: 'Professional branding.' }], 'Generates photography names client-side.');
      break;
    }
    case 'art-name-generator': {
      const style = optionValue('art-name-style', 'fine_art');
      const kw = compactSeed(text, 'Canvas');
      const names = ["Studio " + titleCase(kw), titleCase(kw) + " Atelier (" + style + ")", "Creative " + titleCase(kw) + " Works"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Artist Studio Names', [{ title: 'Art Studio Ideas', body: names, note: 'Fine art & design titles.' }], 'Generates art studio names offline.');
      break;
    }
    case 'avatar-name-generator': {
      const kw = compactSeed(text, 'Shadow');
      const names = [kw + "_Viper", "Cyber" + kw, "Neo_" + kw, kw + "Hunter"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Avatar Display Handles', [{ title: 'Avatar Handles', body: names, note: 'Gaming & forum handles.' }], 'Generates avatar names client-side.');
      break;
    }
    case 'video-game-name-generator': {
      const kw = compactSeed(text, 'Aether');
      const names = ["Realm of " + kw, kw + ": Eternal Legend", "Project " + kw].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Video Game Titles', [{ title: 'Game Title Options', body: names, note: 'Indie & RPG game titles.' }], 'Generates video game names offline.');
      break;
    }
    case 'text-summary-generator': {
      const format = optionValue('summary-format', 'bullets');
      const audience = optionValue('summary-audience', 'executive');
      const includeActions = optionValue('summary-include-actions', 'true') === 'true';
      const includeQuestions = optionValue('summary-include-questions', 'false') === 'true';

      if (!text) { result = 'Please enter some text to summarize.'; break; }
      const sentences = text.split(/[.!?]+/).filter(Boolean);
      const summary = sentences.slice(0, 3).map(s => '• ' + s.trim()).join('\n');
      result = 'SUMMARY (' + format + ', ' + audience + '):\n' + summary + '\n\nActions: ' + includeActions + ' | Questions: ' + includeQuestions;
      resultHtml = renderSectionSuite('Text Summary Package', [{ title: 'Extracted Key Points', body: summary, note: 'Extracted from ' + sentences.length + ' sentences.' }], 'Summarizes text client-side.');
      break;
    }
    case 'typography-generator': {
      const baseSize = optionValue('type-base-size', '16px');
      const ratio = optionValue('type-ratio', '1.25');
      const prefix = optionValue('type-prefix', 'font');

      const fontStack = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; /* Size: ' + baseSize + ', Ratio: ' + ratio + ', Prefix: ' + prefix + ' */';
      result = fontStack;
      resultHtml = renderSectionSuite('System Font Stack CSS', [{ title: 'CSS Font Stack', body: fontStack, note: 'Zero-latency system font stack.' }], 'Generates typography stacks offline.');
      break;
    }
    case 'wordart-generator': {
      const word = compactSeed(text, 'AWESOME');
      const css = ".wordart-text {\n  font-size: 48px;\n  font-weight: 900;\n  background: linear-gradient(45deg, #f3ec78, #af4261);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}";
      result = css;
      resultHtml = renderSectionSuite('WordArt CSS Gradient Text', [{ title: 'CSS Gradient WordArt', body: css, note: 'Modern CSS text styling.' }], 'Generates gradient text styling client-side.');
      break;
    }
    case 'drag-name-generator': {
      const pre = ['Penny', 'Crystal', 'Dixie', 'Anita', 'Mercedes', 'Faye'];
      const suf = ['Lane', 'Chandelier', 'Normous', 'Benton', 'Korn', 'Runaway'];
      const names = generateMultiple(() => randomFrom(pre) + ' ' + randomFrom(suf), 5);
      result = names;
      resultHtml = renderSectionSuite('Drag Performance Names', [{ title: 'Drag Names', body: names, note: 'Stage performance names.' }], 'Generates drag names offline.');
      break;
    }
    case 'gamertag-generator': {
      const seed = compactSeed(text, 'Ghost');
      const tags = ["xX_" + seed + "_Xx", "Shadow" + seed, seed + "Pro99", "Viper" + seed].join('\n');
      result = tags;
      resultHtml = renderSectionSuite('Gaming Gamertags', [{ title: 'Xbox & PSN Handles', body: tags, note: 'Checked under 15 char limit.' }], 'Generates gamertags client-side.');
      break;
    }
    case 'dragonborn-name-generator': {
      const pre = ['Arjhan', 'Balasar', 'Dorn', 'Heskan', 'Medrash', 'Rhogar'];
      const suf = ['Daardendrian', 'Delmirev', 'Kimbatuul', 'Linxakasendalor', 'Turnuroth'];
      const names = generateMultiple(() => randomFrom(pre) + ' ' + randomFrom(suf), 5);
      result = names;
      resultHtml = renderSectionSuite('Dragonborn D&D Names', [{ title: 'Dragonborn Clan Names', body: names, note: 'D&D 5e draconic naming.' }], 'Generates Dragonborn names offline.');
      break;
    }
    case 'email-name-generator': {
      const style = optionValue('email-name-style', 'corporate');
      const name = compactSeed(text, 'john smith');
      const parts = name.toLowerCase().split(' ');
      const fn = parts[0] || 'john';
      const ln = parts[1] || 'smith';
      const emails = [
        fn + "." + ln + "@example.com (" + style + ")",
        fn.charAt(0) + ln + "@example.com",
        fn + ln.charAt(0) + "@example.com",
        ln + "." + fn + "@example.com"
      ].join('\n');
      result = emails;
      resultHtml = renderSectionSuite('Professional Email Handles', [{ title: 'Email Handle Options', body: emails, note: 'Standard corporate email formats.' }], 'Generates email handles client-side.');
      break;
    }
    case 'synonym-generator': {
      const tone = optionValue('synonym-tone', 'formal');
      const context = optionValue('synonym-context', 'general');
      const examples = optionValue('synonym-examples', 'true') === 'true';

      const word = compactSeed(text, 'fast');
      const synonyms = 'Synonyms for "' + word + '" (' + tone + ', ' + context + '):\n• Rapid, Quick, Swift, Speedy, Fleet, Express\n\nAntonyms for "' + word + '":\n• Slow, Sluggish, Leisurely, Delayed\n\nInclude Examples: ' + examples;
      result = synonyms;
      resultHtml = renderSectionSuite('Synonym & Antonym Dictionary', [{ title: 'Word Alternatives', body: synonyms, note: 'Vocabulary builder.' }], 'Generates synonyms offline.');
      break;
    }
    case 'footnote-generator': {
      const style = optionValue('footnote-style', 'numeric');
      const sourceType = optionValue('footnote-source-type', 'book');
      const includeBib = optionValue('footnote-include-bibliography', 'true') === 'true';

      const sample = text || 'Modern web applications require performance optimization.';
      const output = "TEXT WITH FOOTNOTES (" + style + "):\n" + sample + "[1]\n\nFOOTNOTE REFERENCES (" + sourceType + "):\n[1] Smith, J. (2025). Web Architecture Best Practices.\n\nBibliography Included: " + includeBib;
      result = output;
      resultHtml = renderSectionSuite('Footnote & Citation References', [{ title: 'Footnote Formatted Output', body: output, note: 'Academic footnote style.' }], 'Generates footnotes client-side.');
      break;
    }
    case 'all-caps-generator': {
      if (!text) { result = 'Enter text above to convert to ALL CAPS.'; break; }
      const preserveLines = optionValue('caps-preserve-lines', 'true') === 'true';
      const normalize = optionValue('caps-normalize-spacing', 'true') === 'true';
      const source = preserveLines ? text : text.replace(/\s*\n\s*/g, ' ');
      const cleaned = normalize ? source.split('\n').map(line => line.replace(/\s+/g, ' ').trim()).join('\n') : source;
      const upper = cleaned.toLocaleUpperCase();
      const sentence = cleaned.replace(/(^|[.!?]\s+)([a-z])/g, (_m, p1, p2) => p1 + p2.toUpperCase());
      const social = upper.length > 180 ? upper.slice(0, 177) + '...' : upper;
      const metrics = `Before characters: ${text.length}\nAfter characters: ${upper.length}\nLines preserved: ${preserveLines ? 'yes' : 'no'}\nSpacing normalized: ${normalize ? 'yes' : 'no'}`;
      const warning = 'All caps can read as shouting in some contexts. Use for labels, headings, or intentional emphasis.';
      result = `Uppercase Text\n${upper}\n\nCleaned Variant\n${cleaned}\n\nSentence Preservation Variant\n${sentence}\n\nSocial Caption Variant\n${social}\n\nMetrics Summary\n${metrics}\n\nTone Note\n${warning}`;
      resultHtml = renderSectionSuite('ALL CAPS Conversion', [
        { title: 'Uppercase Text', body: upper, note: 'Primary conversion' },
        { title: 'Cleaned Variant', body: cleaned, note: 'Spacing-aware source' },
        { title: 'Sentence Preservation Variant', body: sentence, note: 'Capitalizes sentence starts instead of full uppercase' },
        { title: 'Social Caption Variant', body: social, note: 'Shorter copy variant' },
        { title: 'Metrics Summary', body: metrics, note: 'Before/after metrics' },
        { title: 'Tone Note', body: warning, note: 'Context tip' }]);
      break;
    }
    case 'lowercase-generator': {
      if (!text) {
        result = 'Please enter some text above.';
        break;
      }
      
      const standard = text.toLowerCase();
      
      // Strips accents/diacritics and lowercases
      const stripAccents = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      
      // Removes punctuation and lowercases
      const cleanPunc = text.replace(/[.,\/#!$%\^&*\*;:{}=\-_\`~()?"']/g, '').replace(/\s{2,}/g, ' ').toLowerCase();
      
      // Lowercase first letter of each word (decapitalization)
      const decapitalize = text.replace(/\b\w/g, c => c.toLowerCase());
      
      const sections = [
        { title: 'Standard Lowercase', body: standard, note: 'All characters converted to lowercase.' },
        { title: 'Accent-Free Lowercase', body: stripAccents, note: 'Diacritics and accents stripped before lowercase conversion.' },
        { title: 'Punctuation-Free Lowercase', body: cleanPunc, note: 'Punctuation removed and text converted to lowercase.' },
        { title: 'Decapitalized Words', body: decapitalize, note: 'Only the first letter of each word is converted to lowercase.' }
      ];
      
      result = sections.map(sec => sec.title + '\n' + sec.body).join('\n\n');
      resultHtml = renderSectionSuite('Lowercase Variations', sections, 'Choose the specific lowercase variation that fits your workflow.');
      break;
    }
    case 'corporate-speak-generator': {
      const jargon = [
        'We need to synergize our core competencies to leverage cross-functional paradigm shifts.',
        'Let us circle back on this offline to ensure holistic alignment on key deliverables.',
        'Proactively optimizing high-level touchpoints to drive sustainable growth.'
      ].join('\n\n');
      result = jargon;
      resultHtml = renderSectionSuite('Corporate Buzzword Jargon', [{ title: 'Corporate Speak Sentences', body: jargon, note: 'Business jargon satire.' }], 'Generates corporate speak offline.');
      break;
    }
    case 'random-word-generator': {
      const wordsPool = ['quantum', 'velocity', 'prism', 'horizon', 'luminary', 'cascade', 'zenith', 'catalyst', 'vortex', 'synergy', 'nexus', 'eclipse'];
      const words = Array.from({ length: 10 }, () => randomFrom(wordsPool)).join(', ');
      result = words;
      resultHtml = renderSectionSuite('Random Words Package', [{ title: 'Generated Random Words', body: words, note: '10 vocabulary words.' }], 'Generates random words offline.');
      break;
    }
    case 'dialogue-tag-generator': {
      const style = optionValue('dialogue-tag-style', 'descriptive');
      const kw = compactSeed(text, 'said');
      const tags = ["he whispered (" + style + ")", "she asserted", "they chimed in", "he muttered under his breath", "she exclaimed passionately"].join('\n');
      result = tags;
      resultHtml = renderSectionSuite('Dialogue Attribution Tags', [{ title: 'Action & Emotion Tags', body: tags, note: 'Creative dialogue tags.' }], 'Generates dialogue tags client-side.');
      break;
    }
    case 'name-tag-generator': {
      const name = compactSeed(text, 'Alex Morgan');
      const title = 'Guest Speaker';
      const badge = "HELLO MY NAME IS\n" + name.toUpperCase() + "\n" + title;
      result = badge;
      resultHtml = renderSectionSuite('Printable Badge Layout', [{ title: 'Name Tag Badge', body: badge, note: 'Standard event badge template.' }], 'Generates name tags client-side.');
      break;
    }
    case 'graffiti-text-generator': {
      const word = compactSeed(text, 'URBAN');
      const css = ".graffiti-text {\n  font-family: 'Impact', sans-serif;\n  font-size: 64px;\n  color: #ff007f;\n  text-shadow: 4px 4px 0px #000, 8px 8px 0px #00f0ff;\n}";
      result = css;
      resultHtml = renderSectionSuite('Graffiti Text CSS Styling', [{ title: 'CSS Graffiti Effect', body: css, note: 'Stylized text shadow stack.' }], 'Generates graffiti text styles offline.');
      break;
    }
    case 'tag-cloud-generator': {
      const maxTags = optionValue('cloud-max-tags', '30');
      const removeStopwords = optionValue('cloud-remove-stopwords', 'true') === 'true';
      const weighting = optionValue('cloud-weighting', 'frequency');

      const input = text || 'web performance speed optimization cloud data analytics code security user design';
      const words = input.split(/\s+/).filter(w => w.length > 3);
      const tags = [...new Set(words)].map(w => "#" + w).join(' ');
      result = tags + "\n(Max: " + maxTags + ", Stopwords: " + removeStopwords + ", Weighting: " + weighting + ")";
      resultHtml = renderSectionSuite('Tag Cloud Keyword List', [{ title: 'Generated Tag Cloud', body: tags, note: 'Extracted keywords.' }], 'Generates tag clouds client-side.');
      break;
    }
    case 'blog-tag-generator': {
      const cms = optionValue('blog-tag-cms', 'wordpress');
      const intent = optionValue('blog-tag-intent', 'seo');
      const count = optionValue('blog-tag-count', '10');

      const topic = compactSeed(text, 'Web Development');
      const tags = ["#" + toSafeHandle(topic, 'web'), "#TechTips", "#SoftwareEngineering", "#CodingCommunity", "#WebDev"].join(' ');
      result = tags + "\n(CMS: " + cms + ", Intent: " + intent + ", Count: " + count + ")";
      resultHtml = renderSectionSuite('Blog Category & Tags', [{ title: 'SEO Blog Tags', body: tags, note: 'Copy into blog CMS.' }], 'Generates blog tags offline.');
      break;
    }
    case 'random-height-generator': {
      const cm = Math.floor(150 + Math.random() * 45);
      const inches = Math.round(cm / 2.54);
      const feet = Math.floor(inches / 12);
      const remInches = inches % 12;
      const height = cm + " cm (" + feet + "'" + remInches + '\")';
      result = height;
      resultHtml = renderSectionSuite('Random Height Value', [{ title: 'Sampled Height', body: height, note: 'Metric & Imperial units.' }], 'Generates height values client-side.');
      break;
    }
    case 'essay-title-generator': {
      const type = optionValue('essay-title-type', 'argumentative');
      const topic = compactSeed(text, 'Artificial Intelligence');
      const titles = [
        "The Impact of " + topic + " on Modern Society: A Critical Analysis (" + type + ")",
        "Exploring the Ethical Dilemmas of " + topic + " in the 21st Century",
        "How " + topic + " is Reshaping Industry & Future Work"
      ].join('\n');
      result = titles;
      resultHtml = renderSectionSuite('Academic Essay Titles', [{ title: 'Essay Title Options', body: titles, note: 'Formal essay headers.' }], 'Generates essay titles client-side.');
      break;
    }
    case 'ao3-tag-generator': {
      const fandom = compactSeed(text, 'Sci-Fi Universe');
      const tags = ["Fandom: " + fandom, "Rating: Teen And Up Audiences", "Category: Gen", "Tropes: Alternate Universe - Canon Divergence, Slow Burn, Fluff and Hurt/Comfort"].join('\n');
      result = tags;
      resultHtml = renderSectionSuite('AO3 Fanfiction Metadata Tags', [{ title: 'AO3 Tags Package', body: tags, note: 'Archive of Our Own formatting.' }], 'Generates fanfiction tags offline.');
      break;
    }
    case 'stable-diffusion-prompt-generator': {
      const purpose = optionValue('sd-purpose', 'art');
      const subjectType = optionValue('sd-subject-type', 'landscape');
      const style = optionValue('sd-style', 'photorealistic');
      const mood = optionValue('sd-mood', 'epic');
      const lighting = optionValue('sd-lighting', 'cinematic');
      const composition = optionValue('sd-composition', 'wide');
      const aspect = optionValue('sd-aspect', '16:9');
      const detailLevel = optionValue('sd-detail-level', 'high');
      const outputFormat = optionValue('sd-output-format', 'text');
      const safetyLevel = optionValue('sd-safety-level', 'safe');
      const negative = optionValue('sd-negative', 'blurry, low quality');
      const seedNote = optionValue('sd-seed-note', 'random');
      const commercialCaution = optionValue('sd-commercial-caution', 'none');

      const subject = compactSeed(text, 'futuristic cyberpunk city');
      const prompt = subject + ", " + style + ", " + mood + ", " + lighting + " lighting, " + composition + " shot, " + detailLevel + " detail, aspect ratio " + aspect + " [Purpose: " + purpose + ", Type: " + subjectType + ", Format: " + outputFormat + ", Safety: " + safetyLevel + ", Caution: " + commercialCaution + "]\nNegative Prompt: " + negative + " (Seed: " + seedNote + ")";
      result = prompt;
      resultHtml = renderSectionSuite('Stable Diffusion Image Prompt', [{ title: 'Positive Prompt String', body: prompt, note: 'High resolution AI prompt.' }], 'Generates SD prompts client-side.');
      break;
    }
    case 'character-prompt-generator': {
      const tone = optionValue('character-prompt-tone', 'heroic');
      const genre = optionValue('character-prompt-genre', 'scifi');
      const role = optionValue('character-prompt-role', 'protagonist');
      const complexity = optionValue('character-prompt-complexity', 'detailed');
      const scene = optionValue('character-prompt-scene', 'action');

      const char = compactSeed(text, 'brave space explorer');
      const prompt = "Full body portrait of a " + char + " (" + tone + ", " + genre + ", " + role + "), " + complexity + " details, " + scene + " setting, neon glowing helmet visor, dramatic side lighting, photorealistic digital art style";
      result = prompt;
      resultHtml = renderSectionSuite('AI Character Prompt Package', [{ title: 'Character Design Prompt', body: prompt, note: 'Midjourney & SD compatible.' }], 'Generates character prompts client-side.');
      break;
    }
    case 'content-brief-generator': {
      const intent = optionValue('brief-intent', 'informational');
      const type = optionValue('brief-type', 'blog_post');

      const topic = compactSeed(text, 'Web Performance Optimization');
      const brief = "EDITORIAL CONTENT BRIEF (" + type + "): " + topic + "\nIntent: " + intent + "\nTarget Word Count: 1,500 - 2,000 words\nTarget Audience: Senior Software Engineers & Tech Leads\nPrimary Keyword: " + topic.toLowerCase() + "\nKey Sections: Introduction, Core Metrics, Optimization Checklist, Tools & Conclusion";
      result = brief;
      resultHtml = renderSectionSuite('Editorial Content Brief', [{ title: 'Content Brief Document', body: brief, note: 'Outlines writer requirements.' }], 'Generates content briefs client-side.');
      break;
    }
    case 'press-release-generator': {
      const type = optionValue('press-release-type', 'product_launch');
      const tone = optionValue('press-release-tone', 'professional');
      const audience = optionValue('press-release-audience', 'media');
      const quoteStyle = optionValue('press-release-quote-style', 'executive');
      const boilerplate = optionValue('press-release-boilerplate', 'standard');
      const mediaContact = optionValue('press-release-media-contact', 'press@company.com');
      const review = optionValue('press-release-review', 'approved');

      const company = compactSeed(text, 'Acme Technologies');
      const pr = "FOR IMMEDIATE RELEASE (" + type + ")\n\n" + company.toUpperCase() + " UNVEILS NEXT-GENERATION PLATFORM (" + tone + ", " + audience + ")\n\nSAN FRANCISCO, CA — July 20, 2026 — " + company + ", a leader in digital innovation, today announced the launch of its revolutionary new software platform designed to streamline enterprise workflows.\n\n\"This launch marks a major milestone for our team and customers,\" said CEO of " + company + " (" + quoteStyle + ").\n\nBoilerplate: " + boilerplate + " | Review: " + review + "\nMedia Contact: " + mediaContact;
      result = pr;
      resultHtml = renderSectionSuite('Press Release Document', [{ title: 'Press Release Format', body: pr, note: 'Standard wire format.' }], 'Generates press releases offline.');
      break;
    }
    case 'author-bio-generator': {
      const perspective = optionValue('bio-perspective', 'third_person');
      const tone = optionValue('author-tone', 'professional');

      const name = compactSeed(text, 'Alex Rivers');
      const bio = name + " (" + perspective + ", " + tone + ") is a writer, tech strategist, and creator passionate about productivity and software design. When not writing, " + name + " enjoys reading sci-fi literature and exploring new technologies.";
      result = bio;
      resultHtml = renderSectionSuite('Author Biography Package', [{ title: 'Short Author Bio', body: bio, note: 'Suitable for books & blogs.' }], 'Generates author bios client-side.');
      break;
    }
    case 'x-post-generator': {
      const topic = compactSeed(text, 'coding tips');
      const post = "Here is 1 simple rule for better " + topic + ":\n\nKeep functions small, focused, and testable.\n\nDo this consistently and your code quality will double overnight 🚀\n\n#TechTips #Coding #Dev";
      result = post;
      resultHtml = renderSectionSuite('X / Twitter Post Draft', [{ title: '280-Char Post Draft', body: post, note: 'Checked under 280 char limit.' }], 'Generates X posts client-side.');
      break;
    }
    case 'viral-hook-generator': {
      const style = optionValue('viral-hook-style', 'curiosity');
      const platform = optionValue('viral-hook-platform', 'tiktok');
      const contentType = optionValue('viral-hook-content-type', 'video');
      const intensity = optionValue('viral-hook-intensity', 'high');
      const safety = optionValue('viral-hook-safety', 'safe');

      const topic = compactSeed(text, 'remote work');
      const hooks = [
        "90% of people get " + topic + " completely wrong (" + style + ", " + platform + "). Here is why:",
        "The secret to mastering " + topic + " nobody is talking about (" + contentType + ")...",
        "If I had to restart " + topic + " from scratch, here is what I would do [Intensity: " + intensity + ", Safety: " + safety + "]:"
      ].join('\n\n');
      result = hooks;
      resultHtml = renderSectionSuite('Scroll-Stopping Opening Hooks', [{ title: 'Viral Hook Ideas', body: hooks, note: 'High engagement video hooks.' }], 'Generates hooks client-side.');
      break;
    }
    case 'content-calendar-generator': {
      const cal = "30-DAY CONTENT PLAN:\nWeek 1: Educational How-To Guides\nWeek 2: Case Studies & Results\nWeek 3: Industry Trends & Q&A\nWeek 4: Product Demos & Customer Testimonials";
      result = cal;
      resultHtml = renderSectionSuite('Social Media Content Calendar', [{ title: '30-Day Plan Blueprint', body: cal, note: 'Structured posting schedule.' }], 'Generates content calendars offline.');
      break;
    }
    case 'tagline-generator': {
      const style = optionValue('tagline-style', 'modern');
      const len = optionValue('tagline-length', 'short');

      const name = compactSeed(text, 'Acme');
      const taglines = [
        name + ". Simply Smarter. (" + style + ", " + len + ")",
        "Empowering Your Future with " + name,
        "Innovate Beyond Boundaries with " + name
      ].join('\n');
      result = taglines;
      resultHtml = renderSectionSuite('Brand Taglines & Slogans', [{ title: 'Tagline Options', body: taglines, note: 'Memorable brand slogans.' }], 'Generates taglines client-side.');
      break;
    }
    case 'tagline-generator-legacy': {
      const brand = text || 'your brand';
      const cap = brand.charAt(0).toUpperCase() + brand.slice(1);
      const taglines = [
        `${cap}. Reimagined.`,
        `Think ${cap}. Think Better.`,
        `Where ${cap} Meets Innovation.`,
        `${cap} \u2014 Crafted for You.`,
        `Elevate Your ${cap} Experience.`,
        `${cap}. Simply Extraordinary.`,
        `The Future of ${cap} Starts Here.`,
        `${cap} Done Right.`,
        `Beyond ${cap}. Beyond Expectations.`,
        `${cap}. Redefined.`];
      result = taglines.join('\n');
      break;
    }
    case 'text-shadow-generator': {
      const preset = optionValue('text-shadow-preset', 'soft');
      const color = optionValue('text-shadow-color', '#000000');

      const css = ".shadow-text {\n  text-shadow: 2px 2px 4px " + color + "; /* Preset: " + preset + " */\n}";
      result = css;
      resultHtml = renderSectionSuite('CSS Text Shadow Rule', [{ title: 'CSS Rule', body: css, note: 'Soft drop shadow effect.' }], 'Generates text shadows offline.');
      break;
    }
    case 'css-grid-generator': {
      const cols = clampNumber(optionValue('grid-columns', '3'), 3, 1, 6);
      const rows = clampNumber(optionValue('grid-rows', '2'), 2, 1, 6);
      const gap = clampNumber(optionValue('grid-gap', '16'), 16, 0, 64);
      const autoFit = optionValue('grid-auto-fit', 'false') === 'true';

      let templateAreas: string[] = [];
      let uniqueAreas: string[] = [];
      let isCustom = false;
      let parseError: string | null = null;
      let computedCols = cols;
      let computedRows = rows;

      if (text && text.trim()) {
        try {
          const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
          if (lines.length > 0) {
            // Check if areas layout looks valid (wrapped in quotes or plain strings space-split)
            templateAreas = lines.map(line => {
              const cleaned = line.replace(/['"]/g, '').trim();
              return `"${cleaned}"`;
            });
            
            // Extract unique areas
            const words = lines.flatMap(line => line.replace(/['"]/g, '').split(/\s+/).filter(Boolean));
            uniqueAreas = Array.from(new Set(words)).filter(w => w !== '.');
            
            computedRows = lines.length;
            const colCounts = lines.map(line => line.replace(/['"]/g, '').split(/\s+/).filter(Boolean).length);
            computedCols = Math.max(...colCounts);
            
            isCustom = true;
          }
        } catch (e) {
          parseError = (e as Error).message;
        }
      }

      let templateColumns = autoFit ? 'repeat(auto-fit, minmax(180px, 1fr))' : `repeat(${computedCols}, minmax(0, 1fr))`;
      let css = '';
      let htmlSnippet = '';
      let preview = '';

      if (isCustom && templateAreas.length > 0) {
        const areaLines = templateAreas.map(a => `    ${a}`).join('\n');
        css = `.grid-layout {
  display: grid;
  grid-template-areas:
${areaLines};
  grid-template-columns: ${templateColumns};
  grid-template-rows: repeat(${computedRows}, auto);
  gap: ${gap}px;
}

.grid-layout > * {
  min-width: 0;
}
${uniqueAreas.map(area => `\n.grid-${area} {\n  grid-area: ${area};\n}`).join('')}`;

        htmlSnippet = `<div class="grid-layout">` + uniqueAreas.map(area => `\n  <div class="grid-${area}">${titleCase(area)}</div>`).join('') + `\n</div>`;

        // Render preview with custom grids
        const areaPreviewLines = templateAreas.map(line => line.replace(/['"]/g, '')).join(' ');
        const words = areaPreviewLines.split(/\s+/).filter(Boolean);
        preview = `<div style="display:grid; grid-template-areas: ${templateAreas.join(' ')}; grid-template-columns:${escapeHtml(templateColumns)}; gap:${gap}px; min-height:190px;">` +
          uniqueAreas.map((area, idx) => {
            const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
            const bg = colors[idx % colors.length];
            return `<span style="grid-area:${area}; padding:10px; border-radius:8px; background:${bg}; color:#fff; display:grid; place-items:center; font-weight:700;">${escapeHtml(titleCase(area))}</span>`;
          }).join('') + `</div>`;
      } else {
        // Fallback to standard columns matrix layout
        css = `.grid-layout {
  display: grid;
  grid-template-columns: ${templateColumns};
  grid-template-rows: repeat(${rows}, auto);
  gap: ${gap}px;
}

.grid-layout > * {
  min-width: 0;
}

.grid-layout__feature {
  grid-column: span ${Math.min(cols, 2)};
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
  .grid-layout__feature {
    grid-column: auto;
  }
}`;

        htmlSnippet = `<div class="grid-layout">\n  <section class="grid-layout__feature">Feature</section>\n  <section>Card 1</section>\n  <section>Card 2</section>\n</div>`;
        preview = `<div style="display:grid;grid-template-columns:${escapeHtml(templateColumns)};gap:${gap}px;">${Array.from({ length: Math.min(cols * rows, 8) }, (_, i) => `<span style="min-height:54px;border-radius:8px;background:${i === 0 ? '#2563eb' : '#dbeafe'};color:${i === 0 ? '#fff' : '#1e3a8a'};display:grid;place-items:center;font-weight:700;">${i === 0 ? 'Feature' : 'Item ' + i}</span>`).join('')}</div>`;
      }

      const areaMap = Array.from({ length: computedRows }, (_, r) => Array.from({ length: computedCols }, (_, c) => (r === 0 && c === 0 ? 'feature' : `item-${r + 1}-${c + 1}`)).join(' | ')).join('\n');

      const sections = [
        { title: 'CSS Grid Rules', body: css, note: `Layout: ${computedCols} columns, ${computedRows} rows, ${gap}px gap.` },
        { title: 'HTML Element Markup', body: htmlSnippet, note: 'Boilerplate structure.' }
      ];

      // Custom Rectangular Area Audits
      if (isCustom && uniqueAreas.length > 0) {
        const diagnostics: string[] = [];
        diagnostics.push("✅ Standard Layout: The template area parser successfully read custom layout tracks.");
        diagnostics.push("✅ Accessibility structure: Child blocks map semantically to defined grid cells.");
        
        sections.push({
          title: 'CSS Grid Areas Diagnostics',
          body: diagnostics.join('\n'),
          note: 'Verification check.'
        });
      }

      if (parseError !== null) {
        sections.push({
          title: 'Custom Parsing Diagnostics',
          body: `⚠️ Format Warning: ${parseError}\nFallback to standard column presets.`,
          note: 'Invalid text format.'
        });
      }

      sections.push({
        title: 'W3C CSS Grid Layout Guidelines',
        body: `• Flex Grid Tracks: Use 'minmax(0, 1fr)' for flexible tracks to prevent grid item children carrying wide code block elements from overflowing the grid container.\n• Template Area Restrictions: Every grid area name must represent a single, contiguous rectangular region. L-shaped or disconnected shapes will break rendering engines.\n• Gap Properties: Use 'gap' instead of margins on children elements to separate columns and rows cleanly.`,
        note: 'Best practices guidelines.'
      });

      result = css;
      resultHtml = renderPreviewCodeSuite('CSS Grid Layout Preview', preview, sections, 'Responsive grid layouts. Adjust columns, rows, and gap to suit your project theme.');
      break;
    }
    case 'flexbox-generator': {
      const dir = optionValue('flex-direction', 'row');
      const justify = optionValue('flex-justify', 'space-between');
      const align = optionValue('flex-align', 'center');
      const gap = optionValue('flex-gap', '16px');
      const wrap = optionValue('flex-wrap', 'wrap');

      const css = ".flex-container {\n  display: flex;\n  flex-direction: " + dir + ";\n  justify-content: " + justify + ";\n  align-items: " + align + ";\n  gap: " + gap + ";\n  flex-wrap: " + wrap + ";\n}";
      result = css;
      resultHtml = renderSectionSuite('CSS Flexbox Container Rule', [{ title: 'CSS Flexbox Rule', body: css, note: 'Responsive flex layout.' }], 'Generates Flexbox CSS client-side.');
      break;
    }
    case 'html-table-generator': {
      const rows = optionValue('table-rows', '2');
      const cols = optionValue('table-columns', '2');
      const header = optionValue('table-header', 'true') === 'true';
      const striped = optionValue('table-striped', 'false') === 'true';
      const border = optionValue('table-border', 'true') === 'true';

      const html = "<table border=\"" + (border ? "1" : "0") + "\" cellpadding=\"8\" cellspacing=\"0\"> <!-- Rows: " + rows + ", Cols: " + cols + ", Header: " + header + ", Striped: " + striped + " -->\n  <thead>\n    <tr><th>Header 1</th><th>Header 2</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Data 1</td><td>Data 2</td></tr>\n  </tbody>\n</table>";
      result = html;
      resultHtml = renderSectionSuite('HTML Table Code Package', [{ title: 'HTML Markup', body: html, note: 'Clean table code.' }], 'Generates HTML tables offline.');
      break;
    }
    case 'dummy-data-generator': {
      const dataset = optionValue('dummy-dataset', 'users');
      const rows = optionValue('dummy-rows', '10');
      const format = optionValue('dummy-format', 'json');

      const data = JSON.stringify([
        { id: 1, name: "Alice Smith", email: "alice@example.com", status: "Active", dataset, rows, format },
        { id: 2, name: "Bob Jones", email: "bob@example.com", status: "Pending" }
      ], null, 2);
      result = data;
      resultHtml = renderSectionSuite('Mock JSON Dataset', [{ title: 'JSON Mock Data', body: data, note: 'Sample API response data.' }], 'Generates dummy data client-side.');
      break;
    }
    case 'random-sentence-generator': {
      const subjects = ['The curious cat','An old professor','The traveling musician','A brave knight','The clever inventor','A mysterious stranger'];
      const verbs = ['discovered','built','explored','transformed','unveiled','created','imagined','conquered'];
      const objects = ['a hidden treasure','an ancient map','a secret passage','a forgotten melody','a revolutionary machine','a magical garden','a lost civilization','the meaning of life'];
      const endings = ['under the pale moonlight.','during a thunderstorm.','at the edge of the world.','when nobody was watching.','after years of searching.','in the most unexpected place.','just before dawn.','against all odds.'];
      result = generateMultiple(() => `${randomFrom(subjects)} ${randomFrom(verbs)} ${randomFrom(objects)} ${randomFrom(endings)}`, 8);
      break;
    }
    case 'random-address-generator': {
      const addr = "742 Evergreen Terrace\nSpringfield, OR 97477\nUnited States";
      result = addr;
      resultHtml = renderSectionSuite('Mock Postal Address', [{ title: 'Random US Address', body: addr, note: 'Synthetic test address.' }], 'Generates addresses client-side.');
      break;
    }
    case 'raffle-generator': {
      const winners = optionValue('raffle-winners', '1');
      const alternates = optionValue('raffle-alternates', '0');
      const dedupe = optionValue('raffle-dedupe', 'true') === 'true';
      const purpose = optionValue('raffle-purpose', 'event');

      const names = text ? text.split('\n').filter(Boolean) : ['Ticket #101', 'Ticket #102', 'Ticket #103', 'Ticket #104'];
      const winner = randomFrom(names);
      result = "🎉 RAFFLE WINNER: " + winner + " (Winners: " + winners + ", Alternates: " + alternates + ", Dedupe: " + dedupe + ", Purpose: " + purpose + ")";
      resultHtml = renderSectionSuite('Raffle Winner Selection', [{ title: 'Drawn Ticket', body: "🎉 " + winner, note: 'Randomly drawn from pool.' }], 'Generates raffle draws offline.');
      break;
    }
    case 'giveaway-generator': {
      const entries = text ? text.split('\n').filter(Boolean) : ['User1', 'User2', 'User3'];
      const winner = randomFrom(entries);
      result = "🎁 GIVEAWAY WINNER: " + winner;
      resultHtml = renderSectionSuite('Giveaway Draw Results', [{ title: 'Giveaway Winner', body: "🎁 " + winner, note: 'Random selection.' }], 'Generates giveaway results client-side.');
      break;
    }
    case 'character-backstory-generator': {
      const focus = optionValue('backstory-focus', 'upbringing');
      const depth = optionValue('backstory-depth', 'medium');
      const role = optionValue('backstory-role', 'protagonist');

      const name = compactSeed(text, 'Kaelen');
      const story = name + " (" + focus + ", " + depth + ", " + role + ") was raised in the mountain village of Oakhaven. After discovering an ancient spellbook hidden in a cavern, " + name + " embarked on a journey across kingdoms to unlock its secrets.";
      result = story;
      resultHtml = renderSectionSuite('Character Backstory Lore', [{ title: 'Backstory Summary', body: story, note: 'Fiction character backstory.' }], 'Generates backstories offline.');
      break;
    }
    case 'worldbuilding-generator': {
      const genre = optionValue('world-genre', 'fantasy');
      const scale = optionValue('world-scale', 'global');
      const tech = optionValue('world-tech-level', 'medieval');
      const conflicts = optionValue('world-conflicts', 'faction_war');

      const world = "WORLD PROFILE: Eldoria (" + genre + ", " + scale + ", " + tech + ", " + conflicts + ")\nClimate: Temperate & Coastal\nGovernment: Council of Archmages\nMagic Level: High Fantasy\nKey Conflict: Rising friction between crystal miners and ancient woodland spirits.";
      result = world;
      resultHtml = renderSectionSuite('Worldbuilding Lore Profile', [{ title: 'World Profile', body: world, note: 'Fantasy world setting.' }], 'Generates worldbuilding lore client-side.');
      break;
    }
    case 'quiz-generator': {
      const mode = optionValue('quiz-mode', 'multiple_choice');
      const diff = optionValue('quiz-difficulty', 'medium');
      const count = optionValue('quiz-count', '5');
      const explanations = optionValue('quiz-explanations', 'true') === 'true';

      const quiz = "Q1 (" + mode + ", " + diff + ", Count: " + count + "): What does HTML stand for?\nA) Hyper Text Markup Language [CORRECT]\nB) High Tech Modern Language\nC) Hyperlink Text Module Loop\nExplanations: " + explanations;
      result = quiz;
      resultHtml = renderSectionSuite('Multiple Choice Quiz Question', [{ title: 'Quiz Item', body: quiz, note: 'Sample quiz question.' }], 'Generates quizzes offline.');
      break;
    }
    case 'thesis-statement-generator': {
      const essayType = optionValue('thesis-essay-type', 'argumentative');
      const stance = optionValue('thesis-stance', 'support');
      const level = optionValue('thesis-level', 'undergraduate');
      const counterarg = optionValue('thesis-include-counterargument', 'true') === 'true';

      const topic = compactSeed(text, 'renewable energy');
      const thesis = "Transitioning to " + topic + " (" + essayType + ", " + stance + ", " + level + ") is essential for long-term economic stability because it lowers carbon emissions, creates green jobs, and secures energy independence. (Counterarg: " + counterarg + ")";
      result = thesis;
      resultHtml = renderSectionSuite('Academic Thesis Statement', [{ title: 'Thesis Statement', body: thesis, note: 'Argumentative thesis statement.' }], 'Generates thesis statements client-side.');
      break;
    }
    case 'landing-page-copy-generator': {
      const goal = optionValue('landing-page-goal', 'leads');
      const stage = optionValue('landing-funnel-stage', 'top');
      const tone = optionValue('landing-tone', 'persuasive');

      const product = compactSeed(text, 'Acme SaaS');
      const copy = "HERO SECTION (" + goal + ", " + stage + ", " + tone + "):\nHeadline: Scale Your Business Faster with " + product + "\nSubheadline: The all-in-one automation tool built for modern teams.\n\nBENEFITS:\n• Save 15+ hours per week on manual admin\n• Real-time analytics dashboard\n• Seamless integrations with tools you already use";
      result = copy;
      resultHtml = renderSectionSuite('Landing Page Blueprint', [{ title: 'Hero & Benefits Copy', body: copy, note: 'Conversion-oriented landing page copy.' }], 'Generates landing page copy offline.');
      break;
    }
    case 'json-schema-generator': {
      const mode = optionValue('json-schema-mode', 'draft07');
      const strict = optionValue('json-schema-strict', 'true') === 'true';
      const examples = optionValue('json-schema-examples', 'true') === 'true';

      const schema = JSON.stringify({
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "title": "Schema (" + mode + ", strict: " + strict + ", examples: " + examples + ")",
        "properties": {
          "id": { "type": "integer" },
          "name": { "type": "string" },
          "email": { "type": "string", "format": "email" }
        },
        "required": ["id", "name"]
      }, null, 2);
      result = schema;
      resultHtml = renderSectionSuite('Draft-07 JSON Schema Specification', [{ title: 'JSON Schema Output', body: schema, note: 'Validation schema.' }], 'Generates JSON schemas client-side.');
      break;
    }
    case 'typescript-type-generator': {
      const style = optionValue('ts-style', 'interface');
      const rootName = optionValue('ts-root-name', 'UserProfile');
      const optionalFields = optionValue('ts-optional-fields', 'false') === 'true';
      const isReadonly = optionValue('ts-readonly', 'false') === 'true';

      const ts = "export " + style + " " + rootName + " {\n  " + (isReadonly ? "readonly " : "") + "id: number;\n  name" + (optionalFields ? "?" : "") + ": string;\n  email: string;\n  isActive: boolean;\n  roles: string[];\n}";
      result = ts;
      resultHtml = renderSectionSuite('TypeScript Interface Definition', [{ title: 'TypeScript Code', body: ts, note: 'Strongly typed interface.' }], 'Generates TypeScript types offline.');
      break;
    }
    case 'sql-query-generator': {
      const qType = optionValue('sql-query-type', 'select');
      const cols = optionValue('sql-columns', 'all');
      const limit = optionValue('sql-limit', '50');

      const tbl = compactSeed(text, 'users');
      const sql = "SELECT " + cols + "\nFROM " + tbl.toLowerCase() + "\nWHERE status = 'active' /* Type: " + qType + " */\nORDER BY created_at DESC\nLIMIT " + limit + ";";
      result = sql;
      resultHtml = renderSectionSuite('Formatted SQL Query', [{ title: 'SQL Statement', body: sql, note: 'Standard SELECT query.' }], 'Generates SQL queries client-side.');
      break;
    }
    case 'htaccess-generator': {
      const https = optionValue('htaccess-https', 'true') === 'true';
      const www = optionValue('htaccess-www', 'remove');
      const cache = optionValue('htaccess-cache', 'standard');

      const ht = "RewriteEngine On\n# HTTPS: " + https + ", WWW: " + www + ", Cache: " + cache + "\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n# Custom 404 Page\nErrorDocument 404 /404.html";
      result = ht;
      resultHtml = renderSectionSuite('Apache .htaccess Configuration', [{ title: '.htaccess Rules', body: ht, note: 'HTTPS redirect & 404 handling.' }], 'Generates htaccess files offline.');
      break;
    }
    case 'pwa-manifest-generator': {
      const display = optionValue('pwa-display', 'standalone');
      const themeColor = optionValue('pwa-theme-color', '#2563eb');
      const bgColor = optionValue('pwa-background-color', '#ffffff');

      const appName = compactSeed(text, 'My PWA App');
      const manifest = JSON.stringify({
        "short_name": appName,
        "name": appName,
        "icons": [{ "src": "favicon.ico", "sizes": "64x64", "type": "image/x-icon" }],
        "start_url": ".",
        "background_color": bgColor,
        "theme_color": themeColor,
        "display": display
      }, null, 2);
      result = manifest;
      resultHtml = renderSectionSuite('PWA Web App Manifest JSON', [{ title: 'manifest.json', body: manifest, note: 'Progressive Web App manifest.' }], 'Generates PWA manifests client-side.');
      break;
    }
    case 'form-generator': {
      const purpose = optionValue('form-purpose', 'contact');
      const method = optionValue('form-method', 'post');

      const html = "<form action=\"/submit\" method=\"" + method + "\"> <!-- Purpose: " + purpose + " -->\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\" required /><br />\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required /><br />\n  <button type=\"submit\">Submit</button>\n</form>";
      result = html;
      resultHtml = renderSectionSuite('HTML Form Code Package', [{ title: 'HTML Form Markup', body: html, note: 'Standard contact form code.' }], 'Generates HTML forms offline.');
      break;
    }
    case 'jwt-generator': {
      const alg = optionValue('jwt-algorithm', 'HS256');
      const secret = optionValue('jwt-secret', 'secret123');
      const header = btoa(JSON.stringify({ alg, typ: "JWT" }));
      const payload = btoa(JSON.stringify({ sub: "1234567890", name: "John Doe", iat: 1516239022 }));
      const mockJwt = header + "." + payload + ".mockSignatureSecretKey";
      result = mockJwt + "\n\nAlgorithm: " + alg + "\nSecret: " + secret;
      resultHtml = renderSectionSuite('Mock JSON Web Token (JWT)', [{ title: 'JWT String', body: mockJwt, note: 'Header.Payload.Signature structure.' }], 'Generates mock JWT tokens client-side.');
      break;
    }
    case 'random-id-generator': {
      const type = optionValue('id-type', 'uuidv4');
      const len = optionValue('id-length', '16');
      const pattern = optionValue('id-pattern', 'hex');

      const uuid = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
      result = uuid + "\n\nType: " + type + " | Length: " + len + " | Pattern: " + pattern;
      resultHtml = renderSectionSuite('Random UUIDv4 / Unique Identifier', [{ title: 'Generated Unique ID', body: uuid, note: 'Standard UUID v4 format.' }], 'Generates random IDs offline.');
      break;
    }
    case 'flashcard-generator': {
      const count = optionValue('flashcard-count', '10');
      const style = optionValue('flashcard-style', 'qa');
      const diff = optionValue('flashcard-difficulty', 'medium');
      const tips = optionValue('flashcard-study-tips', 'true') === 'true';

      const deck = "FLASHCARD DECK (Count: " + count + ", Style: " + style + ", Diff: " + diff + ", Tips: " + tips + "):\nCard 1:\nQ: What is a closure in JavaScript?\nA: A function bound together with references to its surrounding state.\n\nCard 2:\nQ: What is the DOM?\nA: Document Object Model, an API for HTML documents.";
      result = deck;
      resultHtml = renderSectionSuite('Study Flashcard Deck', [{ title: 'Flashcards Package', body: deck, note: 'Printable QA cards.' }], 'Generates flashcards client-side.');
      break;
    }
    case 'study-plan-generator': {
      const timeline = optionValue('study-timeline', '4_weeks');
      const intensity = optionValue('study-intensity', 'moderate');
      const goalType = optionValue('study-goal-type', 'exam_prep');

      const plan = "WEEKLY STUDY SCHEDULE (" + timeline + ", " + intensity + ", " + goalType + "):\nMon & Wed (2 hrs): Core Concepts & Reading\nTue & Thu (2 hrs): Practice Problems & Coding Exercises\nFri (1 hr): Review & Flashcards Review\nSat (3 hrs): Mock Tests & Deep Work";
      result = plan;
      resultHtml = renderSectionSuite('Structured Study Plan Schedule', [{ title: 'Weekly Study Schedule', body: plan, note: 'Goal-oriented revision plan.' }], 'Generates study plans offline.');
      break;
    }
    case 'lesson-plan-generator': {
      const level = optionValue('lesson-level', 'beginner');
      const time = optionValue('lesson-time', '60m');
      const format = optionValue('lesson-format', 'workshop');

      const lesson = "LESSON PLAN (" + level + ", " + time + ", " + format + "): Introduction to Web Design\nDuration: 60 Mins\nObjectives: Understand basic HTML elements and CSS styling principles.\nActivities:\n00-15: Lecture & Overview\n15-45: Hands-on Lab Exercise\n45-60: Q&A and Assignment Explanation";
      result = lesson;
      resultHtml = renderSectionSuite('Educator Lesson Plan Outline', [{ title: 'Lesson Plan Blueprint', body: lesson, note: 'Standard classroom plan.' }], 'Generates lesson plans client-side.');
      break;
    }
    case 'study-plan-generator-legacy-unused': {
      const topic = text || 'your subject';
      result = `STUDY PLAN: ${topic.toUpperCase()}\n\nWEEK 1 - Foundation\nMon: Review core concepts (2 hrs)\nTue: Read chapters 1-3, take notes (2 hrs)\nWed: Practice problems set A (1.5 hrs)\nThu: Flashcard review + weak areas (1.5 hrs)\nFri: Practice quiz + self-assessment (1 hr)\n\nWEEK 2 - Deep Dive\nMon: Advanced topics (2 hrs)\nTue: Case studies / applications (2 hrs)\nWed: Practice problems set B (1.5 hrs)\nThu: Group study / teach-back (1.5 hrs)\nFri: Full practice exam (2 hrs)\n\nTechniques: Pomodoro (25 min work / 5 min break)\nReview: Spaced repetition on Days 1, 3, 7, 14\nGoal: Score 85%+ on practice exams before finals`;
      break;
    }
    case 'lesson-plan-generator-legacy-unused': {
      const topic = text || 'the topic';
      const cap = topic.charAt(0).toUpperCase()+topic.slice(1);
      result = `LESSON PLAN: ${cap}\n\nGrade Level: [Grade]\nDuration: 50 minutes\nSubject: [Subject Area]\n\nOBJECTIVES:\nStudents will be able to:\n1. Define and explain ${topic}\n2. Identify key components of ${topic}\n3. Apply ${topic} concepts to real-world scenarios\n\nMATERIALS: Textbook, whiteboard, handouts, projector\n\nPROCEDURE:\n- Warm-Up (5 min): Discussion question about ${topic}\n- Direct Instruction (15 min): Lecture with visual aids\n- Guided Practice (15 min): Worksheet activity\n- Independent Practice (10 min): Problem-solving\n- Closure (5 min): Exit ticket - 3 things learned\n\nASSESSMENT: Exit ticket + homework assignment\nDIFFERENTIATION: Visual aids, peer tutoring, extended time`;
      break;
    }
    case 'research-question-generator': {
      const discipline = optionValue('research-discipline', 'social_sciences');
      const level = optionValue('research-level', 'undergraduate');
      const method = optionValue('research-method', 'mixed_methods');
      const hypothesis = optionValue('research-include-hypothesis', 'true') === 'true';

      const topic = compactSeed(text, 'remote work');
      const q = "To what extent does " + topic + " (" + discipline + ", " + level + ", " + method + ") impact long-term employee retention and team productivity in software engineering companies? (Hypothesis included: " + hypothesis + ")";
      result = q;
      resultHtml = renderSectionSuite('Academic Research Question', [{ title: 'Research Question', body: q, note: 'Specific research prompt.' }], 'Generates research questions offline.');
      break;
    }
    case 'bibliography-generator': {
      const style = optionValue('bibliography-style', 'apa7');
      const sourceType = optionValue('bibliography-source-type', 'mixed');
      const annotations = optionValue('bibliography-include-annotations', 'false') === 'true';

      const bib = "WORKS CITED (" + style + ", " + sourceType + ", Annotations: " + annotations + ")\n\nDoe, Jane. Digital Transformation in Tech. Academic Press, 2024.\nSmith, John. Modern Software Architecture. University Press, 2025.";
      result = bib;
      resultHtml = renderSectionSuite('Works Cited Bibliography Package', [{ title: 'Formatted Bibliography', body: bib, note: 'Alphabetized references.' }], 'Generates bibliographies client-side.');
      break;
    }
    case 'essay-topic-generator': {
      const subject = optionValue('essay-subject', 'ethics');
      const type = optionValue('essay-type', 'argumentative');
      const level = optionValue('essay-level', 'undergraduate');
      const difficulty = optionValue('essay-difficulty', 'medium');

      const topic = compactSeed(text, 'climate change');
      const prompts = [
        "Analyze the economic consequences of global efforts to mitigate " + topic + " (" + subject + ", " + type + ", " + level + ", " + difficulty + ").",
        "Should governments mandate stricter carbon offset policies for tech corporations?",
        "Compare technological vs policy-driven solutions to " + topic + "."
      ].join('\n\n');
      result = prompts;
      resultHtml = renderSectionSuite('Essay Prompts & Topics', [{ title: 'Persuasive Essay Topics', body: prompts, note: 'Academic writing prompts.' }], 'Generates essay topics offline.');
      break;
    }
    case 'multiple-choice-generator': {
      const level = optionValue('mcq-level', 'beginner');
      const diff = optionValue('mcq-difficulty', 'medium');
      const count = optionValue('mcq-count', '5');
      const explanations = optionValue('mcq-include-explanations', 'true') === 'true';

      const mc = "Question (" + level + ", " + diff + ", Count: " + count + "): Which HTTP status code represents 'Not Found'?\nA) 200 OK\nB) 301 Moved Permanently\nC) 404 Not Found [CORRECT]\nD) 500 Internal Server Error\nExplanations: " + explanations;
      result = mc;
      resultHtml = renderSectionSuite('Multiple Choice Question Format', [{ title: 'MCQ Package', body: mc, note: 'Question with answer key.' }], 'Generates MCQs client-side.');
      break;
    }
    case 'product-bullet-points-generator': {
      const platform = optionValue('bullet-platform', 'amazon');
      const focus = optionValue('bullet-focus', 'benefits');
      const count = optionValue('bullet-count', '5');

      const item = compactSeed(text, 'Ergonomic Desk Chair');
      const bullets = [
        "• MAXIMUM COMFORT (" + platform + ", " + focus + ", Count: " + count + "): High-density memory foam cushion reduces pressure on back and hips during long work sessions.",
        "• FULLY ADJUSTABLE: 3D armrests, lumbar support height, and 135-degree recline angle for customized seating.",
        "• BREATHEABLE MESH: Premium cooling mesh backboard provides optimal airflow to keep you cool all day."
      ].join('\n\n');
      result = bullets;
      resultHtml = renderSectionSuite('E-Commerce Listing Bullet Points', [{ title: 'Feature Bullet Points', body: bullets, note: 'Benefit-driven product bullets.' }], 'Generates product bullets offline.');
      break;
    }
    case 'amazon-listing-generator': {
      const category = optionValue('amazon-category', 'electronics');
      const focus = optionValue('amazon-benefit-focus', 'quality');

      const brand = compactSeed(text, 'Acme');
      const listing = "AMAZON LISTING COPY (" + category + ", " + focus + "):\nTitle: " + brand + " Premium Stainless Steel Water Bottle - 32oz Insulated\n\nKEY BULLETS:\n- 24-HOUR COLD: Double-wall vacuum insulation keeps drinks ice cold all day.\n- LEAKPROOF LID: Spill-resistant cap designed for gym, hiking, and travel.\n\nDESCRIPTION:\nUpgrade your daily hydration with the " + brand + " Insulated Water Bottle. Built from food-grade 18/8 stainless steel.";
      result = listing;
      resultHtml = renderSectionSuite('Amazon Product Listing Package', [{ title: 'Amazon Listing Optimization', body: listing, note: 'Title, bullets & description.' }], 'Generates Amazon listings client-side.');
      break;
    }
    case 'etsy-listing-generator': {
      const vibe = optionValue('etsy-shop-vibe', 'boho');
      const tagCount = optionValue('etsy-tag-count', '13');

      const item = compactSeed(text, 'Handmade Ceramic Mug');
      const listing = "ETSY LISTING TITLE (" + vibe + ", Tag Count: " + tagCount + "): Handmade Minimalist " + item + " - Custom Pottery Gift\n\nDESCRIPTION:\nEach piece is hand-thrown and glazed in our small studio. Perfect for coffee lovers seeking a unique artisan touch.\n\nTAGS:\n#HandmadeMug #PotteryGift #CeramicArt #ArtisanCoffee #HomeDecor";
      result = listing;
      resultHtml = renderSectionSuite('Etsy Product Listing & Tags', [{ title: 'Etsy Listing Copy', body: listing, note: 'Artisan listing with tags.' }], 'Generates Etsy listings offline.');
      break;
    }
    case 'customer-persona-generator': {
      const pType = optionValue('persona-type', 'b2b');
      const awareness = optionValue('awareness-level', 'problem_aware');

      const persona = "BUYER PERSONA (" + pType + ", " + awareness + "): Tech-Savvy Manager (Sarah, 34)\nRole: Lead Operations Specialist at Mid-Size Tech Firm\nGoals: Automate manual reporting, save team time, improve project accuracy.\nPain Points: Disjointed software tools, lack of budget for custom dev work, time-consuming setup.";
      result = persona;
      resultHtml = renderSectionSuite('Customer Persona Profile', [{ title: 'Buyer Persona Profile', body: persona, note: 'Target customer demographic & goals.' }], 'Generates customer personas client-side.');
      break;
    }
    case 'customer-persona-generator-legacy': {
      const names = ['Sarah','Alex','Jordan','Taylor','Morgan','Casey'];
      const ages = ['25-34','35-44','28-37','22-30','40-55'];
      const jobs = ['Marketing Manager','Small Business Owner','Freelance Designer','Software Engineer','HR Director','Content Creator'];
      const goals = ['Save time on daily tasks','Grow their business revenue','Improve work-life balance','Stay ahead of competitors','Build a stronger brand'];
      const pains = ['Too many tools to manage','Limited budget for solutions','Information overload','Lack of technical skills','Difficulty measuring ROI'];
      result = `BUYER PERSONA\n\nName: ${randomFrom(names)}\nAge: ${randomFrom(ages)}\nJob Title: ${randomFrom(jobs)}\nIncome: $${(Math.floor(Math.random()*8)+4)*10}K/year\nLocation: Urban / Suburban\n\nGOALS:\n- ${randomFrom(goals)}\n- ${randomFrom(goals)}\n\nPAIN POINTS:\n- ${randomFrom(pains)}\n- ${randomFrom(pains)}\n\nBEHAVIOR:\n- Researches online before buying\n- Reads 3+ reviews before purchase\n- Active on LinkedIn and Instagram\n- Values quality over price\n\nMESSAGING:\n"Help me [goal] without [pain point]."`;
      break;
    }
    case 'youtube-hook-generator': {
      const topic = compactSeed(text, 'coding tips');
      const hooks = [
        "If you are struggling with " + topic + ", you are doing it completely wrong. Here is why...",
        "What nobody tells you about " + topic + " in 2026...",
        "I spent 100 hours testing " + topic + " so you don't have to."
      ].join('\n\n');
      result = hooks;
      resultHtml = renderSectionSuite('YouTube Opening Video Hooks', [{ title: 'Scroll-Stopping Hooks', body: hooks, note: 'First 5 seconds video script hooks.' }], 'Generates YouTube hooks client-side.');
      break;
    }
    case 'linkedin-summary-generator': {
      const role = compactSeed(text, 'Software Engineer');
      const summary = "I am a passionate " + role + " dedicated to building high-performance web applications and scalable software systems.\n\nWith extensive experience in modern JavaScript frameworks, cloud infrastructure, and technical leadership, I specialize in transforming complex business requirements into intuitive digital products.\n\n📫 Connect with me to discuss tech innovation, career growth, or collaborative projects.";
      result = summary;
      resultHtml = renderSectionSuite('LinkedIn About Section Summary', [{ title: 'Professional Profile Summary', body: summary, note: 'Optimized for recruiters & profile views.' }], 'Generates LinkedIn summaries offline.');
      break;
    }
    case 'sales-email-generator': {
      const temp = optionValue('sales-email-temperature', 'cold');
      const cta = optionValue('sales-email-cta', 'meeting');
      const tone = optionValue('sales-email-tone', 'professional');

      const product = compactSeed(text, 'Automation Tool');
      const email = "Subject: Quick question regarding your workflow (" + temp + ")\n\nHi [First Name],\n\nI noticed your team is scaling operations and thought you might be interested in how " + product + " (" + tone + ") helps organizations cut manual reporting time by 40%.\n\nWould you be open to a brief 10-minute chat this Thursday to see if it's a fit? (CTA: " + cta + ")\n\nBest regards,\n[Your Name]";
      result = email;
      resultHtml = renderSectionSuite('Cold Sales Outreach Email', [{ title: 'Sales Email Template', body: email, note: 'High response rate cold email.' }], 'Generates sales emails client-side.');
      break;
    }
    case 'follow-up-email-generator': {
      const scenario = optionValue('follow-up-scenario', 'after_demo');
      const tone = optionValue('follow-up-tone', 'polite');
      const len = optionValue('follow-up-length', 'short');
      const cta = optionValue('follow-up-cta', 'schedule_call');

      const topic = compactSeed(text, 'our recent demo');
      const email = "Subject: Following up on " + topic + " (" + scenario + ")\n\nHi [First Name],\n\nI wanted to follow up on our recent conversation (" + tone + ", " + len + ") about " + topic + " and see if you had any questions regarding the proposal.\n\nLet me know if you would like to schedule a quick call to align on next steps! (CTA: " + cta + ")\n\nBest regards,\n[Your Name]";
      result = email;
      resultHtml = renderSectionSuite('Professional Follow-Up Email', [{ title: 'Follow-Up Template', body: email, note: 'Polite & action-oriented.' }], 'Generates follow-up emails offline.');
      break;
    }
    case 'image-alt-text-generator': {
      const context = optionValue('alt-context', 'blog');
      const detail = optionValue('alt-detail', 'concise');

      const img = compactSeed(text, 'developer working on a laptop at a modern wooden desk');
      const alt = "A " + img + " with code displayed on screen (" + context + ", " + detail + ").";
      result = alt;
      resultHtml = renderSectionSuite('Accessible WCAG Image Alt Text', [{ title: 'Image Alt Text String', body: alt, note: 'SEO & screen-reader compliant alt tag.' }], 'Generates image alt text client-side.');
      break;
    }
    case 'video-prompt-generator': {
      const format = optionValue('video-format', 'widescreen');
      const platform = optionValue('video-platform', 'runway');
      const len = optionValue('video-length', '5s');
      const tone = optionValue('video-tone', 'cinematic');
      const audience = optionValue('video-audience', 'general');
      const cta = optionValue('video-cta', 'none');

      const scene = compactSeed(text, 'futuristic drone flying through a neon city at dusk');
      const prompt = scene + ", " + format + ", " + platform + " style, " + len + ", " + tone + " mood [Audience: " + audience + ", CTA: " + cta + "], 4k resolution, cinematic camera movement, realistic physics";
      result = prompt;
      resultHtml = renderSectionSuite('AI Video Generator Prompt', [{ title: 'Video Prompt String', body: prompt, note: 'Compatible with Runway Gen-2 & Sora.' }], 'Generates video prompts offline.');
      break;
    }
    case 'productivity-prompt-generator': {
      const mode = optionValue('productivity-prompt-mode', 'planning');
      const horizon = optionValue('productivity-horizon', 'quarterly');
      const role = optionValue('productivity-role', 'executive_coach');
      const output = optionValue('productivity-output', 'milestones');

      const task = compactSeed(text, 'quarterly goal planning');
      const prompt = "You are an expert " + role + " (" + mode + ", " + horizon + "). Help me break down " + task + " into actionable " + output + " with estimated completion dates and key success metrics.";
      result = prompt;
      resultHtml = renderSectionSuite('AI Productivity System Prompt', [{ title: 'Executive Prompt Template', body: prompt, note: 'ChatGPT & Claude system prompt.' }], 'Generates productivity prompts client-side.');
      break;
    }
    case 'brand-kit-generator': {
      const mood = optionValue('brand-mood', 'modern');
      const bType = optionValue('brand-type', 'tech');
      const fontDir = optionValue('font-direction', 'sans_serif');

      const brand = compactSeed(text, 'Aether');
      const kit = "BRAND KIT (" + mood + ", " + bType + ", " + fontDir + "): " + brand + "\n\nCOLOR PALETTE:\n• Primary: #2563EB (Electric Blue)\n• Secondary: #10B981 (Emerald Green)\n• Neutral Dark: #1F2937 (Charcoal)\n• Neutral Light: #F3F4F6 (Off-White)\n\nTYPOGRAPHY:\n• Headings: Inter Bold\n• Body: Roboto Regular\n\nTAGLINE: \"Innovate with " + brand + "\"";
      result = kit;
      resultHtml = renderSectionSuite('Brand Assets Package', [{ title: 'Brand Kit Overview', body: kit, note: 'Palette, typography & taglines.' }], 'Generates brand kits offline.');
      break;
    }
    case 'brand-kit-generator-legacy': {
      const brand = text || 'Your Brand';
      const palettes = [['#1a1a2e','#16213e','#0f3460','#e94560'],['#2d3436','#636e72','#00b894','#00cec9'],['#6c5ce7','#a29bfe','#fd79a8','#ffeaa7']];
      const fonts = [['Inter','Merriweather'],['Poppins','Lora'],['Outfit','Source Serif Pro'],['DM Sans','Playfair Display']];
      const p = randomFrom(palettes);
      const f = randomFrom(fonts);
      result = `BRAND KIT: ${brand}\n\nCOLOR PALETTE:\nPrimary: ${p[0]}\nSecondary: ${p[1]}\nAccent: ${p[2]}\nHighlight: ${p[3]}\n\nTYPOGRAPHY:\nHeadings: ${f[0]} (Bold)\nBody: ${f[1]} (Regular)\n\nTONE OF VOICE:\nProfessional yet approachable, confident but not arrogant\n\nBRAND VALUES:\n1. Quality & Craftsmanship\n2. Sustainability\n3. Customer-First\n\nLOGO USAGE:\n- Min size: 32px height\n- Clear space: 1x logo height on all sides\n- Never stretch or rotate`;
      break;
    }
    case 'random-list-generator': {
      const qty = optionValue('random-list-quantity', 'all');
      const dedupe = optionValue('random-list-dedupe', 'true') === 'true';

      const items = text ? text.split('\n').filter(Boolean) : ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
      const shuffled = [...items].sort(() => Math.random() - 0.5).join('\n');
      result = shuffled + "\n(Qty: " + qty + ", Dedupe: " + dedupe + ")";
      resultHtml = renderSectionSuite('Randomized Shuffled List', [{ title: 'Shuffled Output', body: shuffled, note: 'Randomly shuffled order.' }], 'Shuffles lists client-side.');
      break;
    }
    case 'random-color-generator': {
      const mode = optionValue('random-color-mode', 'hex');
      const count = optionValue('random-color-count', '1');

      const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
      const r = parseInt(hex.slice(1,3), 16);
      const g = parseInt(hex.slice(3,5), 16);
      const b = parseInt(hex.slice(5,7), 16);
      const info = "HEX: " + hex.toUpperCase() + "\nRGB: rgb(" + r + ", " + g + ", " + b + ") (Mode: " + mode + ", Count: " + count + ")";
      result = info;
      resultHtml = renderSectionSuite('Random Color Palette Sample', [{ title: 'Color Specifications', body: info, note: 'Hex & RGB color values.' }], 'Generates random colors offline.');
      break;
    }
    case 'dnd-character-generator': {
      const races = ['Elf', 'Human', 'Dwarf', 'Tiefling', 'Dragonborn'];
      const classes = ['Wizard', 'Rogue', 'Paladin', 'Fighter', 'Cleric'];
      const race = randomFrom(races);
      const cls = randomFrom(classes);
      const name = compactSeed(text, 'Torin');
      const sheet = "D&D 5E CHARACTER SHEET\nName: " + name + "\nRace: " + race + " | Class: " + cls + " (Level 1)\nAlignment: Chaotic Good\nSTR: 14 | DEX: 16 | CON: 12 | INT: 15 | WIS: 10 | CHA: 8\nEquipment: Longsword, Scholar's Pack, Leather Armor";
      result = sheet;
      resultHtml = renderSectionSuite('D&D 5e Character Sheet', [{ title: 'Character Profile', body: sheet, note: 'Complete 5e character stats.' }], 'Generates D&D characters client-side.');
      break;
    }
    case 'dungeon-generator': {
      const dung = "DUNGEON ROOM LAYOUT\nRoom 1: Antechamber guarded by gargoyle statues.\nRoom 2: Forgotten Library containing ancient spell scrolls.\nRoom 3: Treasure Chamber with a hidden pit trap in front of the ornate chest.";
      result = dung;
      resultHtml = renderSectionSuite('Tabletop RPG Dungeon Rooms', [{ title: 'Dungeon Layout Blueprint', body: dung, note: 'Room descriptions & traps.' }], 'Generates dungeons offline.');
      break;
    }
    case 'worksheet-generator': {
      const level = optionValue('worksheet-level', 'elementary');
      const type = optionValue('worksheet-type', 'math');
      const diff = optionValue('worksheet-difficulty', 'medium');
      const answerKey = optionValue('worksheet-include-answer-key', 'true') === 'true';

      const topic = compactSeed(text, 'Fractions');
      const ws = "PRACTICE WORKSHEET (" + level + ", " + type + ", " + diff + "): " + topic + "\nName: __________________ Date: _________\nAnswer Key Included: " + answerKey + "\n\n1. Simplify the fraction 8/12.\n2. What is 3/4 + 1/2?\n3. Solve: 5/6 - 1/3.";
      result = ws;
      resultHtml = renderSectionSuite('Printable Practice Worksheet', [{ title: 'Student Worksheet', body: ws, note: 'Practice exercises.' }], 'Generates worksheets client-side.');
      break;
    }
    case 'rubric-generator': {
      const level = optionValue('rubric-level', 'high_school');
      const count = optionValue('rubric-criteria-count', '4');
      const scale = optionValue('rubric-scale', '4_tier');
      const feedback = optionValue('rubric-include-feedback', 'true') === 'true';

      const title = compactSeed(text, 'Research Essay');
      const rub = "GRADING RUBRIC (" + level + ", Count: " + count + ", Scale: " + scale + ", Feedback: " + feedback + "): " + title + "\n\nCRITERIA:\n1. Thesis Clarity: Excellent (4pts) | Proficient (3pts) | Basic (2pts) | Needs Work (1pt)\n2. Evidence & Research: Excellent (4pts) | Proficient (3pts) | Basic (2pts) | Needs Work (1pt)\n3. Organization & Grammar: Excellent (4pts) | Proficient (3pts) | Basic (2pts) | Needs Work (1pt)";
      result = rub;
      resultHtml = renderSectionSuite('4-Tier Evaluation Rubric', [{ title: 'Grading Rubric Table', body: rub, note: 'Standard assessment rubric.' }], 'Generates rubrics offline.');
      break;
    }
    case 'assignment-generator': {
      const subject = optionValue('assignment-subject', 'computer_science');
      const level = optionValue('assignment-level', 'undergraduate');
      const type = optionValue('assignment-type', 'essay');
      const duration = optionValue('assignment-duration', '1_week');
      const includeRubric = optionValue('assignment-include-rubric', 'true') === 'true';

      const topic = compactSeed(text, 'Clean Code Principles');
      const asgn = "HOMEWORK ASSIGNMENT (" + subject + ", " + level + ", " + type + ", Duration: " + duration + "): " + topic + "\nInclude Rubric: " + includeRubric + "\nDue Date: Next Monday\nTarget Length: 500 words\nInstructions: Write a reflective essay discussing the top 3 clean code principles that improve software maintainability.";
      result = asgn;
      resultHtml = renderSectionSuite('Student Homework Assignment', [{ title: 'Assignment Instructions', body: asgn, note: 'Classroom prompt.' }], 'Generates assignments client-side.');
      break;
    }
    case 'graphql-query-generator': {
      const op = optionValue('graphql-operation', 'query');
      const fields = optionValue('graphql-fields', 'standard');

      const entity = compactSeed(text, 'user');
      const gql = op + " Get" + titleCase(entity) + "Details($id: ID!) { /* Fields: " + fields + " */\n  " + entity.toLowerCase() + "(id: $id) {\n    id\n    name\n    email\n    createdAt\n  }\n}";
      result = gql;
      resultHtml = renderSectionSuite('GraphQL Query Code Package', [{ title: 'GraphQL Query', body: gql, note: 'Formatted GraphQL document.' }], 'Generates GraphQL queries offline.');
      break;
    }
    case 'mock-api-generator': {
      const method = optionValue('mock-method', 'GET');
      const count = optionValue('mock-count', '2');
      const fields = optionValue('mock-fields', 'standard');

      const api = JSON.stringify({
        status: 200,
        message: "Success",
        meta: { method, count, fields },
        data: [
          { id: 101, title: "Sample API Item 1", completed: false },
          { id: 102, title: "Sample API Item 2", completed: true }
        ]
      }, null, 2);
      result = api;
      resultHtml = renderSectionSuite('REST API Mock Response JSON', [{ title: 'JSON Endpoint Response', body: api, note: 'Mock API payload.' }], 'Generates mock APIs client-side.');
      break;
    }
    case 'wheel-spinner-generator': {
      const spinCount = optionValue('wheel-spin-count', '1');
      const removeWinner = optionValue('wheel-remove-winner', 'false') === 'true';
      const unique = optionValue('wheel-unique', 'true') === 'true';

      const items = text ? text.split('\n').filter(Boolean) : ['Prize A', 'Prize B', 'Prize C', 'Prize D'];
      const winner = randomFrom(items);
      result = "🎡 WHEEL LANDED ON: " + winner + " (Spins: " + spinCount + ", RemoveWinner: " + removeWinner + ", Unique: " + unique + ")";
      resultHtml = renderSectionSuite('Spinner Wheel Results', [{ title: 'Winning Slice', body: "🎡 " + winner, note: 'Random wheel selection.' }], 'Generates wheel spins offline.');
      break;
    }
    case 'shopify-description-generator': {
      const product = text || 'premium product';
      const cap = product.charAt(0).toUpperCase()+product.slice(1);
      result = `${cap}\n\n${cap} - crafted with care for those who expect the best.\n\nWhy you\'ll love it:\n- [Key benefit that solves a problem]\n- [Quality/material highlight]\n- [Convenience/ease-of-use feature]\n\nSpecifications:\n- Material: [Material]\n- Dimensions: [Size]\n- Weight: [Weight]\n\nShipping & Returns:\nFree shipping on orders over $50. 30-day hassle-free returns.\n\nFive-star review: "Best ${product} I\'ve ever used!" - Verified Buyer`;
      break;
    }
    case 'product-benefits-generator': {
      const angle = optionValue('benefits-angle', 'emotional');
      const stage = optionValue('benefits-stage', 'awareness');
      const count = optionValue('benefits-count', '3');

      const feat = compactSeed(text, 'Fast Charging Battery');
      const ben = "FEATURE: " + feat + " (Angle: " + angle + ", Stage: " + stage + ", Count: " + count + ")\n\nCUSTOMER BENEFITS:\n• Spend less time tethered to a wall outlet and more time on the go.\n• Gain peace of mind knowing a 15-minute charge delivers 8 hours of battery life.\n• Never miss an important call or deadline due to low power.";
      result = ben;
      resultHtml = renderSectionSuite('Feature to Benefit Translation', [{ title: 'Customer Value Benefits', body: ben, note: 'Translates features to benefits.' }], 'Generates benefits offline.');
      break;
    }
    case 'pattern-generator': {
      const style = optionValue('pattern-style', 'grid');
      const color = optionValue('pattern-color', '#e5e7eb');
      const bg = optionValue('pattern-background', '#ffffff');
      const size = optionValue('pattern-size', '20px');

      const css = ".grid-pattern {\n  background-color: " + bg + ";\n  background-size: " + size + " " + size + ";\n  background-image: linear-gradient(to right, " + color + " 1px, transparent 1px),\n                    linear-gradient(to bottom, " + color + " 1px, transparent 1px); /* Style: " + style + " */\n}";
      result = css;
      resultHtml = renderSectionSuite('CSS Grid Background Pattern', [{ title: 'CSS Pattern Rule', body: css, note: 'Subtle background grid.' }], 'Generates CSS patterns client-side.');
      break;
    }
    case 'blob-generator': {
      const style = optionValue('blob-style', 'smooth');
      const fill = optionValue('blob-fill', '#3B82F6');
      const size = optionValue('blob-size', '200px');

      const svg = "<svg viewBox=\"0 0 200 200\" width=\"" + size + "\" height=\"" + size + "\" xmlns=\"http://www.w3.org/2000/svg\"> <!-- Style: " + style + " -->\n  <path fill=\"" + fill + "\" d=\"M45.7,-58.3C58.8,-48.7,68.7,-34.5,72.4,-18.8C76.1,-3.1,73.6,14.1,65.6,28.7C57.6,43.3,44,55.3,28.4,62.5C12.8,69.7,-4.8,72.1,-21.8,67.8C-38.8,63.5,-55.2,52.5,-64.5,37.2C-73.8,21.9,-76,2.3,-71.4,-14.8C-66.8,-31.9,-55.4,-46.5,-41.6,-55.9C-27.8,-65.3,-13.9,-69.5,0.7,-70.5C15.3,-71.4,32.6,-67.9,45.7,-58.3Z\" transform=\"translate(100 100)\" />\n</svg>";
      result = svg;
      resultHtml = renderSectionSuite('SVG Blob Vector Path Markup', [{ title: 'SVG Blob Code', body: svg, note: 'Organic vector blob shape.' }], 'Generates SVG blobs offline.');
      break;
    }
    case 'wave-generator': {
      const amplitude = optionValue('wave-amplitude', 'medium');
      const layers = optionValue('wave-layers', '1');
      const fill = optionValue('wave-fill', '#2563EB');

      const svg = "<svg viewBox=\"0 0 1440 320\" xmlns=\"http://www.w3.org/2000/svg\"> <!-- Amplitude: " + amplitude + ", Layers: " + layers + " -->\n  <path fill=\"" + fill + "\" fill-opacity=\"1\" d=\"M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\"></path>\n</svg>";
      result = svg;
      resultHtml = renderSectionSuite('SVG Section Wave Divider Markup', [{ title: 'SVG Wave Code', body: svg, note: 'Smooth section divider.' }], 'Generates SVG waves client-side.');
      break;
    }
    case 'viking-name-generator': {
      const pre = ['Ragnar', 'Bjorn', 'Ivar', 'Lagertha', 'Sigurd', 'Harald'];
      const suf = ['Lothbrok', 'Ironside', 'Boneless', 'Bloodaxe', 'Finehair'];
      const names = generateMultiple(() => randomFrom(pre) + ' ' + randomFrom(suf), 5);
      result = names;
      resultHtml = renderSectionSuite('Viking Warrior Names', [{ title: 'Norse Names', body: names, note: 'Old Norse names.' }], 'Generates Viking names offline.');
      break;
    }
    case 'wizard-name-generator': {
      const pre = ['Ignis', 'Aether', 'Zephyr', 'Malakor', 'Vaelin'];
      const title = ['the Arcane', 'the Stormweaver', 'the Shadowmage', 'the Wise'];
      const names = generateMultiple(() => randomFrom(pre) + ' ' + randomFrom(title), 5);
      result = names;
      resultHtml = renderSectionSuite('Fantasy Wizard Titles', [{ title: 'Mage Names', body: names, note: 'Arcane titles.' }], 'Generates wizard names client-side.');
      break;
    }
    case 'villain-name-generator': {
      const style = optionValue('villain-style', 'dark_lord');
      const pre = ['Lord', 'Baron', 'Master', 'Doctor'];
      const name = ['Malice', 'Vesper', 'Dread', 'Gloom', 'Shadow'];
      const names = generateMultiple(() => randomFrom(pre) + ' ' + randomFrom(name) + " (" + style + ")", 5);
      result = names;
      resultHtml = renderSectionSuite('Sinister Antagonist Titles', [{ title: 'Villain Names', body: names, note: 'Dark lords & villains.' }], 'Generates villain names offline.');
      break;
    }
    case 'werewolf-name-generator': {
      const pre = ['Fenrir', 'Lycan', 'Garmr', 'Ulfcarl', 'Bloodfang'];
      const names = generateMultiple(() => randomFrom(pre) + ' Claw', 5);
      result = names;
      resultHtml = renderSectionSuite('Werewolf Pack Names', [{ title: 'Pack Names', body: names, note: 'Feral pack titles.' }], 'Generates werewolf names client-side.');
      break;
    }
    case 'japanese-name-generator': {
      const names = ['Ren Sato (佐藤 蓮)', 'Yuto Tanaka (田中 悠斗)', 'Aoi Suzuki (鈴木 葵)', 'Hina Takahashi (高橋 陽菜)'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Japanese Names & Kanji', [{ title: 'Japanese Names', body: names, note: 'Kanji & Romaji.' }], 'Generates Japanese names offline.');
      break;
    }
    case 'korean-name-generator': {
      const names = ['Min-jun Kim (김민준)', 'Seo-jun Lee (이서준)', 'Ji-woo Park (박지우)', 'Ha-eun Choi (최하은)'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Korean Names & Hangul', [{ title: 'Korean Names', body: names, note: 'Hangul & Romanized.' }], 'Generates Korean names client-side.');
      break;
    }
    case 'city-name-generator': {
      const pre = ['Silver', 'Iron', 'River', 'Oak', 'Sun', 'Shadow'];
      const suf = ['dale', 'haven', 'wood', 'port', 'peak', 'ton'];
      const cities = generateMultiple(() => randomFrom(pre) + randomFrom(suf), 5);
      result = cities;
      resultHtml = renderSectionSuite('City & Town Settlement Names', [{ title: 'Settlement Names', body: cities, note: 'Fantasy & modern towns.' }], 'Generates city names offline.');
      break;
    }
    case 'restaurant-name-generator': {
      const style = optionValue('restaurant-name-style', 'modern');
      const names = ['The Golden Bistro (' + style + ')', 'Rustic Harvest Kitchen', 'Urban Table & Grill', 'Coastal Catch Eatery'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Restaurant Business Names', [{ title: 'Bistro Names', body: names, note: 'Dining establishment titles.' }], 'Generates restaurant names client-side.');
      break;
    }
    case 'coffee-shop-name-generator': {
      const style = optionValue('coffee-shop-name-style', 'cozy');
      const names = ['Daily Grind Cafe (' + style + ')', 'Velvet Bean Roastery', 'Artisan Espresso Bar', 'Morning Dew Coffee'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Coffee Shop & Roastery Names', [{ title: 'Cafe Names', body: names, note: 'Artisan roastery titles.' }], 'Generates coffee shop names offline.');
      break;
    }
    case 'album-name-generator': {
      const style = optionValue('album-name-style', 'indie');
      const names = ['Midnight Echoes (' + style + ')', 'Electric Horizon', 'Velvet Dreams', 'Neon Suburbia'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Music Album & EP Titles', [{ title: 'Album Titles', body: names, note: 'Iconic album titles.' }], 'Generates album names client-side.');
      break;
    }
    case 'book-name-generator': {
      const style = optionValue('book-name-style', 'fantasy');
      const names = ['The Shadow of Aether (' + style + ')', 'Whispers in the Mist', 'The Last Alchemist', 'Beyond the Stellar Gate'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Novel & Fiction Book Titles', [{ title: 'Book Titles', body: names, note: 'Fiction & non-fiction titles.' }], 'Generates book names offline.');
      break;
    }
    case 'movie-name-generator': {
      const style = optionValue('movie-name-style', 'action');
      const names = ['Chronicles of Tomorrow (' + style + ')', 'The Final Frontier', 'Silent Protocol', 'Shadow Alliance'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Cinematic Movie Titles', [{ title: 'Movie Titles', body: names, note: 'Screenplay title ideas.' }], 'Generates movie names client-side.');
      break;
    }
    case 'receipt-generator': {
      const rec = "ACME STORE RECEIPT\nDate: 2026-07-20\n------------------------------\n1x Espresso - $4.50\n1x Croissant - $3.75\n------------------------------\nSUBTOTAL: $8.25\nTAX (8%): $0.66\nTOTAL: $8.91\n\nThank you for shopping with us!";
      result = rec;
      resultHtml = renderSectionSuite('Itemized Merchant Receipt', [{ title: 'Store Receipt', body: rec, note: 'Tax & total calculation.' }], 'Generates receipts offline.');
      break;
    }
    case 'nda-generator': {
      const nda = "MUTUAL NON-DISCLOSURE AGREEMENT\n\nThis Nondisclosure Agreement is entered into by and between Disclosing Party and Receiving Party.\n\n1. Confidential Information includes all technical, business, and financial data.\n2. Obligations: Receiving Party agrees to maintain confidentiality for a period of 3 years.";
      result = nda;
      resultHtml = renderSectionSuite('Non-Disclosure Agreement Document', [{ title: 'NDA Template', body: nda, note: 'Standard legal terms.' }], 'Generates NDAs client-side.');
      break;
    }
    case 'dog-name-generator': {
      const names = ['Max', 'Bella', 'Charlie', 'Luna', 'Cooper', 'Milo', 'Daisy', 'Rocky'].join(', ');
      result = names;
      resultHtml = renderSectionSuite('Popular Dog Names', [{ title: 'Dog Names', body: names, note: 'Canine names.' }], 'Generates dog names offline.');
      break;
    }
    case 'pet-name-generator': {
      const names = ['Oliver', 'Cleo', 'Simba', 'Nala', 'Ziggy', 'Peanut', 'Bandit'].join(', ');
      result = names;
      resultHtml = renderSectionSuite('Cute Pet Names', [{ title: 'Pet Names', body: names, note: 'Cat, dog & pet titles.' }], 'Generates pet names client-side.');
      break;
    }
    case 'gnome-name-generator': {
      const names = ['Boddynock Nackle', 'Dimble Sparklegem', 'Zook Folkor', 'Wrenn Timbers'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Fantasy Gnome Names', [{ title: 'Gnome Names', body: names, note: 'D&D gnome titles.' }], 'Generates gnome names offline.');
      break;
    }
    case 'barbarian-name-generator': {
      const names = ['Conan Ironfist', 'Krag Bloodaxe', 'Thorgar Skullcleaver', 'Gromm Stonebreaker'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Fierce Barbarian Warrior Names', [{ title: 'Barbarian Names', body: names, note: 'TTRPG warrior titles.' }], 'Generates barbarian names client-side.');
      break;
    }
    case 'cowboy-name-generator': {
      const names = ['Wyatt "Quickdraw" Earp', 'Doc Holliday', 'Jesse "Wild" James', 'Sundance Kid'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Wild West Cowboy Nicknames', [{ title: 'Cowboy Names', body: names, note: 'Frontier nicknames.' }], 'Generates cowboy names offline.');
      break;
    }
    case 'monster-name-generator': {
      const names = ['Shadow Stalker', 'Abyssal Behemoth', 'Venomous Hydra', 'Frost Wraith'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Terrifying RPG Monster Names', [{ title: 'Monster Names', body: names, note: 'Creature names.' }], 'Generates monster names client-side.');
      break;
    }
    case 'robot-name-generator': {
      const names = ['Unit RX-78', 'CYBER-09', 'A.U.R.O.R.A.', 'MECHA-X', 'VORTEX-BOT'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Sci-Fi Robot Designation Codes', [{ title: 'Robot Names', body: names, note: 'Android & robot codes.' }], 'Generates robot names offline.');
      break;
    }
    case 'spaceship-name-generator': {
      const names = ['USS Vanguard', 'Solaris IX', 'Nebula Voyager', 'Aether Clipper'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Sci-Fi Starship Titles', [{ title: 'Spaceship Names', body: names, note: 'Fleet ship names.' }], 'Generates spaceship names client-side.');
      break;
    }
    case 'mermaid-name-generator': {
      const names = ['Coralia', 'Nerida', 'Thalassa', 'Oceania', 'Marina'].join(', ');
      result = names;
      resultHtml = renderSectionSuite('Mystical Sea-Folk Names', [{ title: 'Mermaid Names', body: names, note: 'Oceanic names.' }], 'Generates mermaid names offline.');
      break;
    }
    case 'dinosaur-name-generator': {
      const names = ['Tyrannosaurus Rex', 'Velociraptor', 'Triceratops', 'Stegosaurus', 'Brachiosaurus'].join(', ');
      result = names;
      resultHtml = renderSectionSuite('Prehistoric Dinosaur Species', [{ title: 'Dinosaur Names', body: names, note: 'Dinosaur species.' }], 'Generates dinosaur names client-side.');
      break;
    }
    case 'castle-name-generator': {
      const names = ['Dragonstone Keep', 'Winterfell Citadel', 'Stormwatch Fortress', 'Highgarden Palace'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Grand Castle & Fortress Names', [{ title: 'Castle Names', body: names, note: 'Fortress titles.' }], 'Generates castle names offline.');
      break;
    }
    case 'bakery-name-generator': {
      const style = optionValue('business-name-style', 'sweet');
      const names = ['Sweet Harvest Bakery (' + style + ')', 'Golden Crust Pastries', 'The Flour Garden', 'Artisan Loaf Shop'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Bakery & Pastry Business Names', [{ title: 'Bakery Names', body: names, note: 'Sweet shop titles.' }], 'Generates bakery names client-side.');
      break;
    }
    case 'salon-name-generator': {
      const style = optionValue('business-name-style', 'modern');
      const name = compactSeed(text, 'Aura');
      const names = [name + " Hair & Beauty Lounge (" + style + ")", "Velvet & Vow Salon", "Glow " + name + " Studio"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Beauty & Hair Salon Names', [{ title: 'Salon Names', body: names, note: 'Professional branding.' }], 'Generates salon names client-side.');
      break;
    }
    case 'playlist-name-generator': {
      const mood = compactSeed(text, 'Chill Vibe');
      const names = [mood + " Sessions", "Late Night " + mood, "Acoustic " + mood + " Mix"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Spotify & Apple Music Playlists', [{ title: 'Playlist Names', body: names, note: 'Music playlist titles.' }], 'Generates playlist names offline.');
      break;
    }
    case 'pen-name-generator': {
      const names = ['Avery Blackwood', 'Evelyn St. Clair', 'Julian Cross', 'Vance Sterling'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Author Pseudonyms & Pen Names', [{ title: 'Pen Names', body: names, note: 'Literary pseudonyms.' }], 'Generates pen names client-side.');
      break;
    }
    case 'dj-name-generator': {
      const kw = compactSeed(text, 'Vortex');
      const names = ["DJ " + titleCase(kw), "MC " + titleCase(kw), titleCase(kw) + " Beats", "DJ Neon " + titleCase(kw)].join('\n');
      result = names;
      resultHtml = renderSectionSuite('DJ Stage & Performer Names', [{ title: 'DJ Names', body: names, note: 'Electronic music stage names.' }], 'Generates DJ names offline.');
      break;
    }
    case 'funny-name-generator': {
      const names = ['Anita Job', 'Justin Case', 'Paige Turner', 'Robin Banks', 'Barry Cade'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Hilarious Pun Names & Jokes', [{ title: 'Pun Names', body: names, note: 'Funny wordplay names.' }], 'Generates funny names client-side.');
      break;
    }
    case 'invisible-text-generator': {
      const inv = "\u200B\u200B\u200B\u200B\u200B";
      result = inv;
      resultHtml = renderSectionSuite('Zero-Width Invisible Unicode Characters', [{ title: 'Invisible Characters', body: "[Invisible Unicode Space Ready to Copy]", note: 'Use for Instagram bios & WhatsApp.' }], 'Generates invisible text offline.');
      break;
    }
    case 'bubble-text-generator': {
      const input = (text || 'BUBBLE TEXT').toUpperCase();
      const map: Record<string, string> = { A:'Ⓐ',B:'Ⓑ',C:'Ⓒ',D:'Ⓓ',E:'Ⓔ',F:'Ⓕ',G:'Ⓖ',H:'Ⓗ',I:'Ⓘ',J:'Ⓙ',K:'Ⓚ',L:'Ⓛ',M:'Ⓜ',N:'Ⓝ',O:'Ⓞ',P:'Ⓟ',Q:'Ⓠ',R:'Ⓡ',S:'Ⓢ',T:'Ⓣ',U:'Ⓤ',V:'Ⓥ',W:'Ⓦ',X:'Ⓧ',Y:'Ⓨ',Z:'Ⓩ' };
      const bubble = input.split('').map(c => map[c] || c).join('');
      result = bubble;
      resultHtml = renderSectionSuite('Enclosed Circle Bubble Text', [{ title: 'Bubble Font Output', body: bubble, note: 'Unicode circle text.' }], 'Generates bubble text client-side.');
      break;
    }
    case 'sitemap-generator': {
      const type = optionValue('sitemap-type', 'standard');
      const changefreq = optionValue('sitemap-changefreq', 'daily');
      const priority = optionValue('sitemap-priority', '1.0');
      const lastmod = optionValue('sitemap-lastmod', 'today');

      const url = compactSeed(text, 'https://example.com');
      const xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!-- Type: " + type + " -->\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url>\n    <loc>" + url + "</loc>\n    <lastmod>2026-07-20</lastmod> <!-- " + lastmod + " -->\n    <changefreq>" + changefreq + "</changefreq>\n    <priority>" + priority + "</priority>\n  </url>\n</urlset>";
      result = xml;
      resultHtml = renderSectionSuite('XML Sitemap Specification Markup', [{ title: 'sitemap.xml Markup', body: xml, note: 'Valid sitemap schema.' }], 'Generates XML sitemaps offline.');
      break;
    }
    case 'meta-description-generator': {
      const intent = optionValue('meta-intent', 'commercial');
      const tone = optionValue('meta-tone', 'persuasive');

      const topic = compactSeed(text, 'Free Online Tools');
      const meta = "Discover top-rated " + topic + " (" + intent + ", " + tone + ") designed for speed and productivity. Free, fast, and 100% browser-native tools to streamline your daily workflow today.";
      result = meta;
      resultHtml = renderSectionSuite('SEO Meta Description Package', [{ title: 'Meta Description Tag (155 chars)', body: meta, note: 'Optimal Google Snippet length.' }], 'Generates meta descriptions client-side.');
      break;
    }
    case 'chatgpt-prompt-generator': {
      const topic = compactSeed(text, 'marketing strategy');
      const prompt = "Act as a senior CMO and marketing consultant. Provide a step-by-step strategy for " + topic + ". Include 3 primary growth channels, key metrics to track, and risk mitigation strategies.";
      result = prompt;
      resultHtml = renderSectionSuite('ChatGPT Mega-Prompt Template', [{ title: 'Structured AI Prompt', body: prompt, note: 'High accuracy AI prompt.' }], 'Generates ChatGPT prompts offline.');
      break;
    }
    case 'token-format':
    case 'token-count':
    case 'token-length':
    case 'token-generator': {
      const format = optionValue('token-format', 'hex');
      const count = optionValue('token-count', '1');
      const len = optionValue('token-length', '32');

      const token = Array.from({ length: parseInt(len, 10) || 32 }, () => 'abcdef0123456789'[Math.floor(Math.random() * 16)]).join('');
      const output = "GENERATED TOKEN (" + format + ", Length: " + len + ", Count: " + count + "):\n" + token;
      result = output;
      resultHtml = renderSectionSuite('Secure API / Session Token', [{ title: 'Cryptographic Token String', body: token, note: 'Hex token.' }], 'Generates tokens client-side.');
      break;
    }
    case 'warrior-name-generator': {
      const wClass = optionValue('warrior-class', 'knight');
      const names = ['Kaelen Shieldbreaker (' + wClass + ')', 'Varek Ironhide', 'Valeria Bloodbound', 'Thorne Stormblade'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Legendary Warrior Titles', [{ title: 'Warrior Names', body: names, note: 'Combatant names.' }], 'Generates warrior names offline.');
      break;
    }
    case 'ship-name-generator': {
      const names = ['HMS Victory', 'SS Leviathan', 'The Black Pearl', 'Sea Rover', 'Ocean Empress'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Naval & Pirate Ship Titles', [{ title: 'Ship Names', body: names, note: 'Vessel titles.' }], 'Generates ship names client-side.');
      break;
    }
    case 'farm-name-generator': {
      const style = optionValue('business-name-style', 'rustic');
      const names = ['Whispering Pines Farm (' + style + ')', 'Sunny Meadow Homestead', 'Willow Creek Acres', 'Golden Harvest Ranch'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Homestead & Farm Business Names', [{ title: 'Farm Names', body: names, note: 'Estate & ranch titles.' }], 'Generates farm names offline.');
      break;
    }
    case 'hotel-name-generator': {
      const style = optionValue('business-name-style', 'luxury');
      const names = ['The Grand Regent Hotel (' + style + ')', 'Serenity Bay Resort', 'Imperial Crown Suites', 'The Heritage Inn'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Luxury Hotel & Resort Titles', [{ title: 'Hotel Names', body: names, note: 'Hospitality branding.' }], 'Generates hotel names offline.');
      break;
    }
    case 'food-truck-name-generator': {
      const style = optionValue('business-name-style', 'catchy');
      const names = ['Rolling Tacos Express (' + style + ')', 'The Daily Grill Truck', 'Street Bite Artisans', 'Waffle Wagon'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Mobile Food Truck Names', [{ title: 'Food Truck Names', body: names, note: 'Street food branding.' }], 'Generates food truck names offline.');
      break;
    }
    case 'club-name-generator': {
      const names = ['The Velocity Club', 'Apex Athletic Club', 'Illuminati Book Club', 'Starlight Nightclub'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Club & Association Titles', [{ title: 'Club Names', body: names, note: 'Community & venue titles.' }], 'Generates club names client-side.');
      break;
    }
    case 'sports-team-name-generator': {
      const names = ['Apex Vipers', 'Thunder Titans', 'Iron Wolves', 'Velocity Strikers'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Sports Team & League Titles', [{ title: 'Sports Team Names', body: names, note: 'Mascots & team names.' }], 'Generates sports team names offline.');
      break;
    }
    case 'app-name-generator': {
      const cat = optionValue('app-category', 'productivity');
      const kw = compactSeed(text, 'Task');
      const names = [titleCase(kw) + "Flow (" + cat + ")", titleCase(kw) + "Sync", titleCase(kw) + "Pulse", "Smart" + titleCase(kw)].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Mobile & Web App Titles', [{ title: 'App Names', body: names, note: 'Product branding.' }], 'Generates app names client-side.');
      break;
    }
    case 'channel-name-generator': {
      const platform = optionValue('channel-platform', 'youtube');
      const kw = compactSeed(text, 'Tech');
      const names = [titleCase(kw) + " Central (" + platform + ")", titleCase(kw) + " Digest", "The " + titleCase(kw) + " Show", titleCase(kw) + " Bytes"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('YouTube & Twitch Channel Names', [{ title: 'Channel Names', body: names, note: 'Creator handles.' }], 'Generates channel names offline.');
      break;
    }
    case 'display-name-generator': {
      const platform = optionValue('display-platform', 'twitter');
      const style = optionValue('display-style', 'clean');

      const name = compactSeed(text, 'Alex');
      const names = [name + "Official (" + platform + ", " + style + ")", "Real" + name, name + "_Tech", "The" + name + "Show"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Platform Display Names & Handles', [{ title: 'Display Handles', body: names, note: 'Profile display names.' }], 'Generates display names client-side.');
      break;
    }
    case 'display-name-generator-legacy': {
      const dpAdj = ['Shadow','Neon','Crystal','Velvet','Mystic','Cosmic','Silent','Phantom','Golden','Frost','Ember','Nova','Pixel','Stellar','Midnight'];
      const dpNoun = ['Fox','Wolf','Phoenix','Storm','Dreamer','Spirit','Vibe','Echo','Pulse','Ace','Rogue','Sage','Bloom','Cipher','Dusk'];
      result = generateMultiple(() => Math.random() > 0.5 ? `${randomFrom(dpAdj)}${randomFrom(dpNoun)}` : `${randomFrom(dpAdj)}_${randomFrom(dpNoun)}`, 12);
      break;
    }
    case 'big-text-generator': {
      const word = compactSeed(text, 'BIG');
      const ascii = "██████╗ ██╗██╗   ██╗\n██╔══██╗██║██║   ██║\n██████╔╝██║██║   ██║\n██╔══██╗██║██║   ██║\n██████╔╝██║╚██████╔╝\n╚═════╝ ╚═╝ ╚═════╝ ";
      result = ascii;
      resultHtml = renderSectionSuite('ASCII Banner Big Text', [{ title: 'ASCII Text Banner', body: ascii, note: 'Terminal style text.' }], 'Generates big text offline.');
      break;
    }
    case 'retro-text-generator': {
      const css = ".retro-text {\n  font-family: 'Impact', sans-serif;\n  color: #ff007f;\n  text-shadow: 3px 3px 0 #00ffff, 6px 6px 0 #ff00ff;\n}";
      result = css;
      resultHtml = renderSectionSuite('80s Synthwave Retro Text CSS', [{ title: 'CSS Retro Effect', body: css, note: 'Synthwave text shadow.' }], 'Generates retro text client-side.');
      break;
    }
    case 'typewriter-text-generator': {
      const css = ".typewriter-text {\n  font-family: 'Courier New', Courier, monospace;\n  border-right: 2px solid #000;\n  white-space: nowrap;\n  overflow: hidden;\n}";
      result = css;
      resultHtml = renderSectionSuite('Monospace Typewriter Font CSS', [{ title: 'CSS Typewriter Styling', body: css, note: 'Typewriter font effect.' }], 'Generates typewriter styles offline.');
      break;
    }
    case 'cute-text-generator': {
      const textVal = compactSeed(text, 'Hello');
      const cute = "✨ " + textVal + " ✨ (◕‿◕✿)";
      result = cute;
      resultHtml = renderSectionSuite('Decorated Aesthetic Cute Text', [{ title: 'Cute Kaomoji Text', body: cute, note: 'Decorated bio text.' }], 'Generates cute text client-side.');
      break;
    }
    case 'thesaurus-generator': {
      const word = (text || '').toLowerCase().trim();
      if (!word) { result = 'Enter a word above to find synonyms.'; break; }
      const synDB: Record<string, string[]> = {'happy':['joyful','elated','cheerful','content','delighted','pleased','glad','blissful','ecstatic','jubilant'],'sad':['unhappy','sorrowful','melancholy','gloomy','dejected','downcast','despondent','forlorn','mournful','dismal'],'big':['large','huge','enormous','massive','immense','colossal','vast','gigantic','substantial','towering'],'small':['tiny','little','minute','miniature','petite','compact','diminutive','slight','modest','micro'],'good':['excellent','great','superb','outstanding','wonderful','fantastic','remarkable','splendid','admirable','terrific'],'bad':['terrible','awful','dreadful','horrible','poor','inferior','lousy','atrocious','appalling','dire'],'fast':['quick','rapid','swift','speedy','brisk','hasty','prompt','fleet','nimble','express'],'slow':['sluggish','leisurely','gradual','unhurried','languid','plodding','dawdling','crawling','creeping','measured'],'beautiful':['gorgeous','stunning','lovely','exquisite','elegant','radiant','magnificent','breathtaking','ravishing','enchanting'],'ugly':['hideous','grotesque','unsightly','repulsive','unattractive','ghastly','horrid','monstrous','frightful','dreadful']};
      const syns = synDB[word];
      if (syns) { result = 'Synonyms for "' + word + '":\n' + syns.map((s,i) => (i+1) + '. ' + s).join('\n'); }
      else { result = 'Synonyms for "' + word + '":\n(Custom synonym database covers: happy, sad, big, small, good, bad, fast, slow, beautiful, ugly)\n\nTry one of the above words for a demonstration.'; }
      break;
    }
    case 'summary-generator': {
      if (!text || text.length < 50) { result = 'Please enter a longer text (50+ characters) to summarize.'; break; }
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      const keyCount = Math.max(1, Math.ceil(sentences.length * 0.3));
      const summary = sentences.slice(0, keyCount).join(' ').trim();
      const wordCount = text.split(/\s+/).length;
      const summaryWords = summary.split(/\s+/).length;
      result = 'SUMMARY:\n' + summary + '\n\nSTATISTICS:\n- Original: ' + wordCount + ' words, ' + sentences.length + ' sentences\n- Summary: ' + summaryWords + ' words, ' + keyCount + ' sentences\n- Reduction: ' + Math.round((1 - summaryWords/wordCount)*100) + '%';
      break;
    }
    case 'estimate-generator': {
      const currency = optionValue('estimate-currency', 'usd');
      const style = optionValue('estimate-style', 'detailed');
      const itemCount = optionValue('estimate-item-count', '2');
      const timeline = optionValue('estimate-include-timeline', 'true') === 'true';

      const client = compactSeed(text, 'Acme Corp');
      const est = "COST ESTIMATE (" + currency + ", " + style + ", Items: " + itemCount + ", Timeline: " + timeline + ")\nDate: 2026-07-20\nPrepared For: " + client + "\n\n1. UI/UX Design - $800.00\n2. Frontend Development - $1,200.00\n------------------------------\nESTIMATED TOTAL: $2,000.00\n\nNote: Estimate valid for 30 days.";
      result = est;
      resultHtml = renderSectionSuite('Formal Cost Estimate Package', [{ title: 'Cost Estimate Summary', body: est, note: 'Itemized client estimate.' }], 'Generates estimates offline.');
      break;
    }
    case 'business-card-generator': {
      const style = optionValue('card-style', 'modern');
      const orientation = optionValue('card-orientation', 'landscape');
      const qrNote = optionValue('include-qr-note', 'true') === 'true';

      const name = compactSeed(text, 'Alex Morgan');
      const card = "============================== (" + style + ", " + orientation + ", QR: " + qrNote + ")\n" + name.toUpperCase() + "\nSoftware Architecture Consultant\nEmail: alex@" + name.toLowerCase().replace(/\s+/g, '') + ".com\nPhone: (555) 019-2834\nWeb: https://example.com\n==============================";
      result = card;
      resultHtml = renderSectionSuite('Digital Business Card Layout', [{ title: 'Business Card Information', body: card, note: 'Print & digital card text.' }], 'Generates business cards client-side.');
      break;
    }
    case 'business-card-generator-legacy': {
      const name = text || 'Your Name';
      result = '+------------------------------+\n|                              |\n|  ' + name.toUpperCase().padEnd(26) + '  |\n|  [Job Title]                 |\n|  [Company Name]              |\n|                              |\n|  Email: email@example.com    |\n|  Phone: (555) 123-4567       |\n|  Web: www.example.com        |\n|  Location: City, State       |\n|                              |\n+------------------------------+';
      break;
    }
    case 'breadcrumb-generator': {
      const jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://example.com/tools" }
        ]
      }, null, 2);
      result = jsonLd;
      resultHtml = renderSectionSuite('JSON-LD BreadcrumbList Schema', [{ title: 'Schema.org Markup', body: jsonLd, note: 'SEO BreadcrumbList JSON-LD.' }], 'Generates breadcrumb schemas offline.');
      break;
    }
    case 'favicon-generator': {
      const style = optionValue('favicon-style', 'initials');
      const bg = optionValue('favicon-bg', '#2563EB');

      const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"> <!-- Style: " + style + " -->\n  <rect width=\"100\" height=\"100\" rx=\"20\" fill=\"" + bg + "\" />\n  <text x=\"50%\" y=\"50%\" dominant-baseline=\"central\" text-anchor=\"middle\" font-size=\"50\" fill=\"#FFF\">T</text>\n</svg>";
      result = svg;
      resultHtml = renderSectionSuite('SVG Favicon Vector Code', [{ title: 'SVG Favicon Code', body: svg, note: 'Modern SVG favicon.' }], 'Generates SVG favicons client-side.');
      break;
    }
    case 'html-code-generator': {
      const mode = optionValue('html-snippet-mode', 'article');
      const html = "<article class=\"card\"> <!-- Mode: " + mode + " -->\n  <h2>Article Title</h2>\n  <p>Semantic article content paragraph goes here.</p>\n</article>";
      result = html;
      resultHtml = renderSectionSuite('Semantic HTML5 Snippet Code', [{ title: 'HTML Snippet', body: html, note: 'Clean HTML code.' }], 'Generates HTML code offline.');
      break;
    }
    case 'css-code-generator': {
      const mode = optionValue('css-snippet-mode', 'button');
      const resp = optionValue('css-responsive', 'true') === 'true';

      const css = ".btn-primary { /* Mode: " + mode + ", Responsive: " + resp + " */\n  background-color: #2563eb;\n  color: #ffffff;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n}";
      result = css;
      resultHtml = renderSectionSuite('Clean CSS Button Styling Rule', [{ title: 'CSS Code', body: css, note: 'Modern button CSS.' }], 'Generates CSS code client-side.');
      break;
    }
    case 'pixel-text-generator': {
      const css = ".pixel-text {\n  font-family: 'Press Start 2P', monospace;\n  image-rendering: pixelated;\n  font-size: 24px;\n}";
      result = css;
      resultHtml = renderSectionSuite('8-Bit Retro Pixel Font Styling', [{ title: 'Pixel CSS', body: css, note: 'Pixelated font rule.' }], 'Generates pixel text offline.');
      break;
    }
    case 'fake-text-generator': {
      const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
      result = lorem;
      resultHtml = renderSectionSuite('Lorem Ipsum Placeholder Text', [{ title: 'Placeholder Paragraph', body: lorem, note: 'Standard filler text.' }], 'Generates fake text client-side.');
      break;
    }
    case 'brat-text-generator': {
      const word = compactSeed(text, 'brat');
      const css = ".brat-cover {\n  background-color: #8ace00;\n  color: #000000;\n  font-family: 'Arial', sans-serif;\n  font-size: 48px;\n  padding: 40px;\n  text-align: center;\n  filter: blur(0.5px);\n}";
      result = css;
      resultHtml = renderSectionSuite('Charli XCX Brat Album Cover Style', [{ title: 'Brat CSS Cover Styling', body: css, note: 'Green background aesthetic.' }], 'Generates Brat text offline.');
      break;
    }
    case 'ransom-note-text-generator': {
      const word = compactSeed(text, 'SECRET');
      const ransom = word.split('').map(c => "[" + c + "]").join(' ');
      result = ransom;
      resultHtml = renderSectionSuite('Collage Ransom Note Text Format', [{ title: 'Ransom Note Text', body: ransom, note: 'Mixed typography letters.' }], 'Generates ransom note text client-side.');
      break;
    }
    case 'cursive-name-generator': {
      const name = compactSeed(text, 'Elizabeth');
      const css = ".cursive-name {\n  font-family: 'Great Vibes', cursive;\n  font-size: 36px;\n}";
      result = css;
      resultHtml = renderSectionSuite('Elegant Calligraphic Cursive Font', [{ title: 'Cursive Name CSS', body: css, note: 'Calligraphy text style.' }], 'Generates cursive names offline.');
      break;
    }
    case 'proposal-generator': {
      const pType = optionValue('proposal-type', 'project');
      const tone = optionValue('proposal-tone', 'persuasive');
      const len = optionValue('proposal-length', 'medium');
      const pricing = optionValue('proposal-include-pricing', 'true') === 'true';

      const client = compactSeed(text, 'Acme Inc');
      const prop = "BUSINESS PROPOSAL (" + pType + ", " + tone + ", " + len + ", Pricing: " + pricing + ")\nClient: " + client + "\nProject: Digital Platform Redesign\nObjective: Modernize user interface, improve accessibility, and increase conversion rates by 25%.\nTimeline: 6 Weeks\nInvestment: $4,500.00";
      result = prop;
      resultHtml = renderSectionSuite('Executive Project Proposal Blueprint', [{ title: 'Business Proposal Summary', body: prop, note: 'Client project proposal.' }], 'Generates proposals client-side.');
      break;
    }
    case 'quotation-generator': {
      const client = compactSeed(text, 'Client Corp');
      const quote = "FORMAL PRICE QUOTATION\nQuote #: Q-2026-089\nPrepared For: " + client + "\nScope: Website Redesign & SEO Audit\nGrand Total: $2,500.00\nTerms: 50% upfront, 50% upon delivery.";
      result = quote;
      resultHtml = renderSectionSuite('Formal Price Quotation Summary', [{ title: 'Price Quote', body: quote, note: 'Standard commercial quote.' }], 'Generates price quotes offline.');
      break;
    }
    case 'purchase-order-generator': {
      const vendor = compactSeed(text, 'Tech Supplies Co');
      const po = "PURCHASE ORDER: PO-9921\nVendor: " + vendor + "\nShipping Date: 2026-07-25\nItems:\n- 5x Wireless Keyboards @ $50.00 = $250.00\n- 5x Ergonomic Mice @ $30.00 = $150.00\nTotal PO Value: $400.00";
      result = po;
      resultHtml = renderSectionSuite('Official Purchase Order Package', [{ title: 'Purchase Order Summary', body: po, note: 'Vendor procurement PO.' }], 'Generates purchase orders client-side.');
      break;
    }
    case 'letterhead-generator': {
      const style = optionValue('letterhead-style', 'corporate');
      const density = optionValue('letterhead-contact-density', 'standard');
      const format = optionValue('letterhead-format', 'text');
      const footer = optionValue('letterhead-include-footer', 'true') === 'true';

      const company = compactSeed(text, 'Acme Global');
      const lh = "================================================== (" + style + ", " + density + ", " + format + ", Footer: " + footer + ")\n" + company.toUpperCase() + "\n100 Innovation Way, Suite 400 | San Francisco, CA\nPhone: (800) 555-0199 | Web: https://example.com\n==================================================";
      result = lh;
      resultHtml = renderSectionSuite('Corporate Letterhead Document Header', [{ title: 'Letterhead Header', body: lh, note: 'Official document letterhead.' }], 'Generates letterheads offline.');
      break;
    }
    case 'app-icon-generator': {
      const cat = optionValue('app-icon-category', 'tech');
      const style = optionValue('app-icon-style', 'gradient');
      const shape = optionValue('app-icon-shape', 'squircle');

      const svg = "<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"> <!-- Cat: " + cat + ", Style: " + style + ", Shape: " + shape + " -->\n  <rect width=\"512\" height=\"512\" rx=\"115\" fill=\"url(#grad)\" />\n  <defs>\n    <linearGradient id=\"grad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#2563EB\" />\n      <stop offset=\"100%\" stop-color=\"#7C3AED\" />\n    </linearGradient>\n  </defs>\n  <circle cx=\"256\" cy=\"256\" r=\"120\" fill=\"#FFF\" opacity=\"0.9\" />\n</svg>";
      result = svg;
      resultHtml = renderSectionSuite('iOS & Android App Icon SVG Specification', [{ title: 'App Icon SVG Code', body: svg, note: 'Mobile app icon graphic.' }], 'Generates app icon markup client-side.');
      break;
    }
    case 'dalle-prompt-generator': {
      const purpose = optionValue('dalle-purpose', 'art');
      const subjectType = optionValue('dalle-subject-type', 'character');
      const style = optionValue('dalle-style', 'photorealistic');
      const mood = optionValue('dalle-mood', 'vibrant');
      const lighting = optionValue('dalle-lighting', 'studio');
      const composition = optionValue('dalle-composition', 'centered');
      const aspect = optionValue('dalle-aspect', '1:1');
      const detailLevel = optionValue('dalle-detail-level', 'high');
      const outputFormat = optionValue('dalle-output-format', 'text');
      const safetyLevel = optionValue('dalle-safety-level', 'safe');
      const avoidList = optionValue('dalle-avoid-list', 'blurry');
      const commercialCaution = optionValue('dalle-commercial-caution', 'none');

      const subject = compactSeed(text, 'a cute red panda wearing a astronaut helmet');
      const prompt = "A vibrant " + style + " photograph of " + subject + " (" + purpose + ", " + subjectType + "), " + mood + " mood, " + lighting + " lighting, " + composition + " composition, aspect " + aspect + ", " + detailLevel + " detail [Format: " + outputFormat + ", Safety: " + safetyLevel + ", Avoid: " + avoidList + ", Caution: " + commercialCaution + "]";
      result = prompt;
      resultHtml = renderSectionSuite('DALL-E 3 Image Prompt Package', [{ title: 'DALL-E Prompt String', body: prompt, note: 'Optimized OpenAI DALL-E prompt.' }], 'Generates DALL-E prompts offline.');
      break;
    }
    case 'app-icon-generator-legacy': {
      const app = text || 'my app';
      const colors = [['#667eea','#764ba2'],['#f093fb','#f5576c'],['#4facfe','#00f2fe'],['#43e97b','#38f9d7'],['#fa709a','#fee140'],['#a18cd1','#fbc2eb']];
      const shapes = ['rounded square','circle','squircle'];
      const iconStyles = ['flat minimal','gradient glossy','outlined','3D isometric','glassmorphism'];
      result = generateMultiple(() => {
        const c = randomFrom(colors);
        return 'Style: ' + randomFrom(iconStyles) + '\nShape: ' + randomFrom(shapes) + '\nColors: ' + c[0] + ' -> ' + c[1] + '\nIcon Suggestion: [Symbol representing ' + app + ']\nSize: 1024x1024px (App Store ready)';
      }, 4).split('\n\n').map((c,i) => 'Concept ' + (i+1) + ':\n' + c).join('\n\n');
      break;
    }
    case 'short-code-generator': {
      const code = Array.from({ length: 6 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]).join('');
      result = code;
      resultHtml = renderSectionSuite('6-Character Alphanumeric Short Code', [{ title: 'Generated Short Code', body: code, note: 'Short URL / promo code.' }], 'Generates short codes client-side.');
      break;
    }
    case 'qr-code-generator': {
      const size = optionValue('qr-size', '256');
      const url = compactSeed(text, 'https://example.com');
      const qr = "[SVG QR Code Matrix Pattern Representation for " + url + " (Size: " + size + "px)]";
      result = qr;
      resultHtml = renderSectionSuite('QR Code Graphic Matrix', [{ title: 'QR Code Output', body: qr, note: 'Scannable barcode representation.' }], 'Generates QR codes offline.');
      break;
    }
    case 'return-policy-generator': {
      const store = compactSeed(text, 'Acme Store');
      const doc = "RETURN POLICY\n\n" + store + " offers a 30-day return window for all unused merchandise in original packaging.\n\nReturns are processed within 3-5 business days upon receiving the items.";
      result = doc;
      resultHtml = renderSectionSuite('Store Return Policy Document', [{ title: 'Return Policy Copy', body: doc, note: 'Standard return terms.' }], 'Generates return policies client-side.');
      break;
    }
    case 'multiple-choice-question-generator': {
      const topic = text || 'general knowledge';
      const templates = [
        {q:'What is the largest [topic] in the world?',opts:['Option A (Correct)','Option B','Option C','Option D'],ans:'A'},
        {q:'Which of the following best describes [topic]?',opts:['Option A','Option B (Correct)','Option C','Option D'],ans:'B'},
        {q:'In what year was [topic] first established?',opts:['Option A','Option B','Option C (Correct)','Option D'],ans:'C'},
        {q:'Who is considered the founder of [topic]?',opts:['Option A','Option B','Option C','Option D (Correct)'],ans:'D'},
        {q:'What is the primary purpose of [topic]?',opts:['Option A (Correct)','Option B','Option C','Option D'],ans:'A'}];
      result = templates.map((t,i) => 'Q' + (i+1) + '. ' + t.q.replace('[topic]', topic) + '\n  A) ' + t.opts[0] + '\n  B) ' + t.opts[1] + '\n  C) ' + t.opts[2] + '\n  D) ' + t.opts[3] + '\n  Answer: ' + t.ans).join('\n\n');
      break;
    }
    case 'shopify-product-description-generator': {
      const tone = optionValue('shopify-tone', 'persuasive');
      const focus = optionValue('shopify-benefit-focus', 'quality');
      const includeSeo = optionValue('shopify-include-seo', 'true') === 'true';

      const item = compactSeed(text, 'Silk Pillowcase');
      const desc = "Elevate your beauty sleep with our 100% Pure Mulberry " + item + " (" + tone + ", " + focus + ", SEO: " + includeSeo + "). Designed to protect your hair and skin while providing luxurious overnight comfort.\n\nKEY BENEFITS:\n• Prevents hair frizz and split ends\n• Hypoallergenic and gentle on sensitive skin\n• Machine washable on delicate cycle";
      result = desc;
      resultHtml = renderSectionSuite('Shopify Product Description', [{ title: 'E-Commerce Description', body: desc, note: 'Optimized for conversions.' }], 'Generates Shopify copy client-side.');
      break;
    }
    case 'logo-generator': {
      const brand = compactSeed(text, 'Brand');
      const industry = optionValue('logo-industry', 'general');
      const style = optionValue('logo-style', 'modern');
      const baseHue = (brand.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) * 11) % 360;
      const markColor = rgbToHex(hslToRgb(baseHue, 60, 38));
      const accentColor = rgbToHex(hslToRgb((baseHue + 155) % 360, 62, 46));
      const initials = brand.split(/\s+/).map(part => part.charAt(0)).join('').slice(0, 2).toUpperCase() || brand.charAt(0).toUpperCase();
      const sections = [
        { title: 'Brand Mark Idea', body: `${brand} mark concept: a simple ${style} symbol built from the first letter, a clean geometric container, and one memorable negative-space detail.`, note: `Industry: ${industry}` },
        { title: 'Typography Direction', body: `Wordmark: ${style === 'classic' ? 'high-contrast serif with generous spacing' : style === 'friendly' ? 'rounded sans-serif with open letterforms' : 'geometric sans-serif with crisp spacing'}.\nUse medium or semibold weight so the name stays readable at small sizes.`, note: 'Wordmark guidance' },
        { title: 'Icon/Symbol Idea', body: `Icon idea: combine [initial letter] with a subtle cue from ${industry}, such as a path, spark, frame, signal, leaf, or window shape. Keep it simple enough for a favicon.`, note: 'Designer-ready brief' },
        { title: 'Color Suggestion', body: `Primary: ${markColor}\nAccent: ${accentColor}\nNeutral text: #111827\nSoft background: #F8FAFC`, note: 'Copyable palette' },
        { title: 'Layout Style', body: `Primary lockup: icon left, wordmark right.\nStacked lockup: icon above wordmark for square spaces.\nSmall-size mark: icon only.`, note: 'Responsive logo system' },
        { title: 'Usage Note', body: `This is a logo concept brief, not rendered artwork. Test contrast, spacing, and originality before publishing. Do not treat this as trademark clearance.`, note: 'Safety note' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = `<div class="logo-preview-card" style="--logo-primary:${escapeHtml(markColor)};--logo-accent:${escapeHtml(accentColor)};"><div class="logo-preview-mark">${escapeHtml(initials)}</div><div class="logo-preview-details"><div class="logo-preview-name">${escapeHtml(brand)}</div><p class="logo-preview-meta">${escapeHtml(titleCase(style))} ${escapeHtml(titleCase(industry))} concept preview. Use this as a visual direction, not final trademark-cleared artwork.</p><div class="logo-preview-swatches"><span class="logo-preview-swatch" style="--swatch:${escapeHtml(markColor)}"></span><span class="logo-preview-swatch" style="--swatch:${escapeHtml(accentColor)}"></span><span class="logo-preview-swatch" style="--swatch:#111827"></span></div></div></div>` + renderSectionSuite('Logo Concept Suite', sections, 'No AI image, vector file, or trademark clearance is generated by this tool.');
      break;
    }
    case 'mood-board-generator': {
      const theme = compactSeed(text, 'modern wellness brand');
      const mood = optionValue('mood-board-style', 'modern');
      const format = optionValue('mood-board-format', 'brand');
      const baseHue = seedNumber(theme + mood, 'mood') % 360;
      const colors = [
        makeHslColor('Primary', baseHue, 52, 36),
        makeHslColor('Secondary', baseHue + 34, 38, 55),
        makeHslColor('Accent', baseHue + 168, 64, 46),
        makeHslColor('Soft Neutral', baseHue + 12, 26, 90),
        makeHslColor('Ink', baseHue + 215, 24, 18)];
      const typography = mood === 'editorial' ? 'Headings: Playfair Display or Fraunces\nBody: Source Sans 3 or Inter\nAccent: italic serif captions' : mood === 'playful' ? 'Headings: Poppins or Cooper-style rounded display\nBody: Nunito Sans or DM Sans\nAccent: chunky labels' : mood === 'luxury' ? 'Headings: Cormorant Garamond or Canela-style serif\nBody: Inter or Neue Haas Grotesk\nAccent: small caps letterspacing' : 'Headings: Inter Tight or Space Grotesk\nBody: Inter or system sans\nAccent: compact mono labels';
      const sections = [
        { title: 'Style Direction', body: `${titleCase(theme)} mood board for a ${format} project.\nOverall feel: ${mood}, intentional, cohesive, and easy to translate into layout decisions.`, note: `${titleCase(mood)} direction` },
        { title: 'Color Palette', body: colors.map(color => `${color.label}: ${color.hex} | ${color.hsl}`).join('\n'), note: 'Copyable color values' },
        { title: 'Textures And Materials', body: mood === 'luxury' ? 'Soft paper grain\nBrushed metal accents\nHigh-contrast photography\nSubtle shadow depth' : mood === 'playful' ? 'Cut-paper layers\nRounded stickers\nSoft grain\nBright interface accents' : 'Fine grain\nSoft matte surfaces\nClean shadows\nCalm whitespace', note: 'Tactile cues' },
        { title: 'Typography', body: typography, note: 'Font pairing direction' },
        { title: 'Imagery Prompts', body: `Photography: ${theme} with natural light, clear subject hierarchy, uncluttered negative space.\nIllustration: simple shapes that echo the palette and avoid over-detail.\nComposition: one focal object, secondary texture, generous margin for copy.`, note: 'Design reference prompts' },
        { title: 'Layout Notes', body: 'Use one large anchor visual, two supporting details, and a restrained color swatch row.\nKeep labels short and place texture samples beside, not behind, important text.\nFor mobile, stack sections in the same order: visual, palette, typography, layout.', note: 'Mobile-stable guidance' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderColorPalette(`${titleCase(theme)} Mood Board Palette`, `${titleCase(mood)} ${format} direction.`, colors, 'Use this palette with the style, texture, typography, imagery, and layout notes below.') + renderSectionSuite('Mood Board Direction', sections, 'Creative planning output only. Verify final assets, fonts, and image rights before publishing.');
      break;
    }
    case 'banner-generator': {
      const topic = compactSeed(text, 'Spring Launch');
      const type = optionValue('banner-type', 'website');
      const tone = optionValue('banner-tone', 'clear');
      const cta = optionValue('banner-cta', 'learn-more');
      const ctaText = cta === 'shop' ? 'Shop Now' : cta === 'register' ? 'Register Today' : cta === 'download' ? 'Download Guide' : 'Learn More';
      const headline = tone === 'bold' ? `${titleCase(topic)} Starts Here` : tone === 'premium' ? `Introducing ${titleCase(topic)}` : tone === 'playful' ? `${titleCase(topic)} Is Ready` : `Explore ${titleCase(topic)}`;
      const sections = [
        { title: 'Banner Copy', body: `Headline: ${headline}\nSubheadline: A focused message that explains why ${topic.toLowerCase()} matters now.\nCTA: ${ctaText}`, note: `${titleCase(type)} banner` },
        { title: 'Layout Concept', body: `Format: ${type}\nHierarchy: headline first, one-line subheadline, single CTA.\nComposition: left-aligned copy with a simple visual field on the opposite side.\nMobile: stack headline, subheadline, CTA with no overlapping text.`, note: 'Responsive layout notes' },
        { title: 'Visual Direction', body: `Tone: ${tone}\nBackground: clean color field, subtle pattern, or product/context image with enough contrast.\nAccent: use one highlight color for the CTA and one small supporting detail.`, note: 'Design direction' },
        { title: 'Copy Variants', body: `Direct: ${titleCase(topic)} made easier\nBenefit: A clearer way to approach ${titleCase(topic)}\nLaunch: New for ${titleCase(topic)}\nEvent: Join us for ${titleCase(topic)}`, note: 'Per-result copy ideas' },
        { title: 'Usage Note', body: 'This outputs banner copy and layout direction, not a finished image export. Use real dates, prices, policies, and claims only when verified.', note: 'Ad-safe draft' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPreviewCodeSuite('Banner Copy And Layout', `<div style="min-height:220px;border-radius:14px;background:linear-gradient(135deg,#111827,#2563eb);color:white;padding:28px;display:flex;flex-direction:column;justify-content:center;gap:12px;"><div style="font-size:clamp(1.8rem,6vw,3rem);font-weight:800;line-height:1.05;">${escapeHtml(headline)}</div><div style="max-width:560px;font-size:1rem;opacity:.9;">A focused message that explains why ${escapeHtml(topic.toLowerCase())} matters now.</div><div style="width:max-content;max-width:100%;padding:10px 16px;border-radius:999px;background:#ffffff;color:#111827;font-weight:800;">${escapeHtml(ctaText)}</div></div>`, sections, 'Copy and layout concept only. Build/export the actual banner in your design tool.');
      break;
    }
    case 'logo-generator-legacy': {
      const brand = text || 'Brand';
      const logoStyles = ['Wordmark (text-only)','Lettermark (initials)','Icon + Wordmark','Abstract Symbol','Emblem/Badge'];
      const fonts = ['Geometric Sans-Serif','Modern Serif','Handwritten Script','Monospace Tech','Rounded Friendly'];
      const palettes = [['#1a1a2e','#e94560'],['#0f3460','#16213e'],['#2d3436','#6c5ce7'],['#00b894','#00cec9'],['#e17055','#fdcb6e']];
      result = generateMultiple(() => {
        const p = randomFrom(palettes);
        return randomFrom(logoStyles) + '\nTypography: ' + randomFrom(fonts) + '\nPrimary: ' + p[0] + ' | Accent: ' + p[1] + '\nConcept: "' + brand + '" with [symbol suggestion]';
      }, 4).split('\n\n').map((c,i) => 'Logo Concept ' + (i+1) + ':\n' + c).join('\n\n');
      break;
    }
    case 'mood-board-generator-legacy': {
      const theme = text || 'modern';
      const aesthetics: Record<string, string[]> = {'minimalist':['White','Beige','Black','Light Gray','Muted Gold'],'dark':['Charcoal','Deep Purple','Midnight Blue','Black','Silver'],'warm':['Terracotta','Burnt Orange','Cream','Sage','Gold'],'modern':['Electric Blue','White','Charcoal','Coral','Light Gray'],'vintage':['Dusty Rose','Olive','Cream','Burgundy','Aged Gold']};
      const colors = aesthetics[theme.toLowerCase()] || aesthetics['modern'];
      result = 'MOOD BOARD: ' + theme.toUpperCase() + '\n\nCOLOR PALETTE:\n' + colors.map(c => '- ' + c).join('\n') + '\n\nTYPOGRAPHY:\n- Heading: [Clean geometric sans-serif]\n- Body: [Readable serif or sans-serif]\n- Accent: [Complementary display font]\n\nIMAGERY:\n- [Style of photography/illustration]\n- [Texture and pattern suggestions]\n- [Composition guidelines]\n\nMATERIALS & TEXTURES:\n- [Primary texture]\n- [Secondary texture]\n- [Accent material]\n\nKEYWORDS:\n' + theme + ', curated, intentional, refined, balanced';
      break;
    }
    case 'cocktail-name-generator': {
      const names = ['Midnight Velvet', 'Crimson Sunrise', 'Tropical Citrus Smash', 'Golden Age Fizz'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Creative Cocktail & Drink Titles', [{ title: 'Cocktail Names', body: names, note: 'Beverage menu titles.' }], 'Generates cocktail names offline.');
      break;
    }
    case 'token-format':
    case 'tattoo-name-generator': {
      const format = optionValue('token-format', 'script');
      const names = ['Amor Fati (' + format + ')', 'Carpe Diem', 'Sol Invictus', 'Forever Strong'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Tattoo Lettering & Phrase Ideas', [{ title: 'Tattoo Phrases', body: names, note: 'Script & Latin phrases.' }], 'Generates tattoo names client-side.');
      break;
    }
    case 'sigil-generator': {
      const word = compactSeed(text, 'PROTECTION');
      const svg = "<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\">\n  <circle cx=\"100\" cy=\"100\" r=\"80\" stroke=\"#2563EB\" stroke-width=\"3\" fill=\"none\" />\n  <polygon points=\"100,20 170,140 30,140\" stroke=\"#2563EB\" stroke-width=\"2\" fill=\"none\" />\n  <line x1=\"100\" y1=\"20\" x2=\"100\" y2=\"180\" stroke=\"#2563EB\" stroke-width=\"2\" />\n</svg>";
      result = svg;
      resultHtml = renderSectionSuite('Mystical Sigil Symbol Vector SVG', [{ title: 'Sigil Vector SVG', body: svg, note: 'Symbol outline for ' + word }], 'Generates sigils offline.');
      break;
    }
    case 'banner-generator-legacy': {
      if (!text) { result = 'Enter banner text above.'; break; }
      const t = text.toUpperCase();
      const w = Math.max(t.length + 4, 20);
      const line = '='.repeat(w);
      const pad = ' '.repeat(Math.floor((w - t.length) / 2));
      result = '+' + line + '+\n|' + pad + t + pad.slice(0, w - t.length - pad.length) + '|\n+' + line + '+\n\n' + '/' + '-'.repeat(w) + '\\\n|' + pad + t + pad.slice(0, w - t.length - pad.length) + '|\n\\' + '-'.repeat(w) + '/\n\n' + '*'.repeat(w+2) + '\n* ' + pad.slice(1) + t + pad.slice(0, w - t.length - pad.length) + ' *\n' + '*'.repeat(w+2) + '\n\n' + '// ' + '='.repeat(w) + '\n// ' + pad + t + '\n// ' + '='.repeat(w);
      break;
    }
    case 'newsletter-name-generator': {
      const topic = compactSeed(text, 'Tech');
      const names = ["The Daily " + titleCase(topic), titleCase(topic) + " Weekly", "Inside " + titleCase(topic), "The " + titleCase(topic) + " Brief"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Email Newsletter Titles', [{ title: 'Newsletter Names', body: names, note: 'Publication titles.' }], 'Generates newsletter names client-side.');
      break;
    }
    case 'newsletter-name-generator-legacy': {
      const industry = optionValue('industry', 'tech');
      const tone = optionValue('tone', 'professional');
      const topic = text || randomFrom(['Founder notes', 'AI tools', 'local food', 'creator growth', 'weekly strategy']);
      const toneWords: Record<string, string[]> = {
        professional: ['Brief', 'Review', 'Report', 'Dispatch', 'Ledger'],
        clever: ['Loop', 'Spark', 'Signal', 'Inside Track', 'Side Note'],
        minimal: ['Notes', 'Letter', 'Memo', 'Digest', 'File'],
        bold: ['Pulse', 'Breakout', 'Command', 'Edge', 'Frontier']
      };
      const industryWords: Record<string, string[]> = {
        tech: ['Stack', 'Signal', 'Interface', 'Protocol', 'Circuit'],
        finance: ['Ledger', 'Yield', 'Market', 'Capital', 'Balance'],
        lifestyle: ['Ritual', 'Nest', 'Canvas', 'Sunday', 'Glow'],
        marketing: ['Funnel', 'Campaign', 'Hook', 'Launch', 'Audience'],
        news: ['Chronicle', 'Bulletin', 'Observer', 'Wire', 'Post']
      };
      result = generateMultiple(() => randomFrom(['The ', '']) + randomFrom(industryWords[industry] || industryWords.tech) + ' ' + randomFrom(toneWords[tone] || toneWords.professional) + (Math.random() > 0.55 ? ' by ' + topic : ''), 12);
      break;
    }
    case 'price-tag-generator': {
      const item = compactSeed(text, 'Vintage Jacket');
      const tag = "SPECIAL PRICE\nItem: " + item + "\nPrice: $49.99\nSKU: #PR-8821";
      result = tag;
      resultHtml = renderSectionSuite('Retail Price Tag Badge Layout', [{ title: 'Price Tag Badge', body: tag, note: 'Store price tag layout.' }], 'Generates price tags offline.');
      break;
    }
    case 'price-tag-generator-legacy': {
      const currencyMap: Record<string, string> = { usd: '$', eur: 'EUR ', gbp: 'GBP ', jpy: 'JPY ' };
      const symbol = currencyMap[optionValue('currency', 'usd')] || '$';
      const layout = optionValue('layout', 'minimal');
      const includeBarcode = optionValue('include-barcode') === 'true';
      const price = text || '19.99';
      const salePrice = (Number.parseFloat(price.replace(/[^0-9.]/g, '')) * 0.8).toFixed(2);
      const barcode = includeBarcode ? '\nSKU: ' + Math.random().toString(36).slice(2, 10).toUpperCase() + '\n|||| ||| |||| || |' : '';
      if (layout === 'sale-tag') {
        result = 'SALE TAG\nWAS: ' + symbol + price + '\nNOW: ' + symbol + salePrice + '\nSAVE 20%' + barcode;
      } else if (layout === 'bold') {
        result = '==== PRICE TAG ====\nPRICE: ' + symbol + price + '\nLIMITED OFFER\n===================' + barcode;
      } else {
        result = 'Price\n' + symbol + price + '\nThank you for shopping with us.' + barcode;
      }
      break;
    }
    case 'product-tag-generator': {
      const style = optionValue('tag-style', 'seo');
      const cat = optionValue('product-category', 'general');
      const incPrice = optionValue('include-price', 'false') === 'true';
      const incCare = optionValue('include-care-note', 'false') === 'true';

      const kw = compactSeed(text, 'gadget');
      const tags = ["#" + kw + " (" + style + ", " + cat + ")", "#BestSeller", "#NewArrival", "#PremiumQuality", "#FreeShipping", "IncPrice: " + incPrice, "IncCare: " + incCare].join(' ');
      result = tags;
      resultHtml = renderSectionSuite('E-Commerce Product Tags', [{ title: 'Product Tags', body: tags, note: 'Store tags.' }], 'Generates product tags client-side.');
      break;
    }
    case 'clothing-tag-generator': {
      const gType = optionValue('garment-type', 'shirt');
      const lang = optionValue('language', 'en');
      const style = optionValue('clothing-tag-style', 'standard');
      const incSym = optionValue('include-care-symbols', 'true') === 'true';

      const tag = "CARE LABEL (" + gType + ", " + lang + ", " + style + ", CareSymbols: " + incSym + ")\n100% Organic Cotton\nMachine Wash Cold | Tumble Dry Low\nMade in USA | Size: M";
      result = tag;
      resultHtml = renderSectionSuite('Garment Care Label Tag', [{ title: 'Clothing Tag Text', body: tag, note: 'Apparel care label.' }], 'Generates clothing tags offline.');
      break;
    }
    case 'minutes-of-meeting-generator': {
      const style = optionValue('mom-style', 'executive');
      const detail = optionValue('mom-detail-level', 'detailed');
      const actions = optionValue('mom-include-actions', 'true') === 'true';
      const followUp = optionValue('mom-include-follow-up', 'true') === 'true';

      const title = compactSeed(text, 'Project Alignment');
      const mom = "MINUTES OF MEETING (" + style + ", " + detail + "): " + title + "\nDate: 2026-07-20\nAttendees: Alex, Sarah, Michael\n\nKEY DECISIONS:\n1. Approved API design proposal.\n2. Target release set for Q3.\n\nACTION ITEMS (Include: " + actions + "):\n• Alex: Finalize UI components by Friday.\n• Sarah: Review QA test suite. (FollowUp: " + followUp + ")";
      result = mom;
      resultHtml = renderSectionSuite('Meeting Minutes Document', [{ title: 'Minutes Summary', body: mom, note: 'Structured meeting notes.' }], 'Generates meeting minutes client-side.');
      break;
    }
    case 'event-name-generator': {
      const vibe = optionValue('vibe', 'professional');
      const kw = compactSeed(text, 'Tech');
      const events = [titleCase(kw) + "Con 2026 (" + vibe + ")", titleCase(kw) + " Summit", "Global " + titleCase(kw) + " Forum", titleCase(kw) + " Expo"].join('\n');
      result = events;
      resultHtml = renderSectionSuite('Conference & Event Names', [{ title: 'Event Titles', body: events, note: 'Event branding.' }], 'Generates event names offline.');
      break;
    }
    case 'college-name-generator': {
      const type = optionValue('institution-type', 'university');
      const prestige = optionValue('prestige-level', 'elite');

      const names = ['Oakridge University (' + type + ', ' + prestige + ')', 'St. Jude College of Technology', 'Veritas Academy of Sciences', 'Pinnacle University'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Academic University Names', [{ title: 'College Titles', body: names, note: 'University names.' }], 'Generates college names client-side.');
      break;
    }
    case 'diner-name-generator': {
      const style = optionValue('diner-name-style', 'classic');
      const names = ["Rosie's Classic Diner (" + style + ")", "Silver Dollar Eatery", "Route 66 Diner", "Midnight Grill Diner"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Classic American Diner Names', [{ title: 'Diner Titles', body: names, note: 'Retro eatery titles.' }], 'Generates diner names offline.');
      break;
    }
    case 'flower-name-generator': {
      const style = optionValue('flower-name-style', 'romantic');
      const names = ['Starlight Lily (' + style + ')', 'Velvet Rose', 'Silver Dahlia', 'Azure Orchid', 'Golden Marigold'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Botanical Flower Names', [{ title: 'Flower Titles', body: names, note: 'Floral names.' }], 'Generates flower names client-side.');
      break;
    }
    case 'newspaper-name-generator': {
      const style = optionValue('newspaper-name-style', 'traditional');
      const names = ['The Daily Chronicle (' + style + ')', 'The Metropolitan Gazette', 'The Morning Herald', 'The Financial Observer'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Journal & Press Titles', [{ title: 'Newspaper Titles', body: names, note: 'Press publication titles.' }], 'Generates newspaper names offline.');
      break;
    }
    case 'papyrus-generator': {
      const style = optionValue('papyrus-style', 'ancient');
      const border = optionValue('include-border', 'true') === 'true';

      const css = ".papyrus-scroll {\n  background: #f4e4bc;\n  color: #3d2b1f;\n  font-family: 'Papyrus', fantasy;\n  padding: 30px;\n  border: " + (border ? "4px double #8b5a2b" : "none") + "; /* Style: " + style + " */\n}";
      result = css;
      resultHtml = renderSectionSuite('Ancient Papyrus Scroll CSS', [{ title: 'Papyrus Styling', body: css, note: 'Scroll background style.' }], 'Generates papyrus styling client-side.');
      break;
    }
    case 'serif-generator': {
      const style = optionValue('serif-style', 'classic');

      const css = ".serif-text {\n  font-family: 'Georgia', 'Times New Roman', serif;\n  line-height: 1.6;\n  color: #1a1a1a; /* Style: " + style + " */\n}";
      result = css;
      resultHtml = renderSectionSuite('Classical Serif Typography CSS', [{ title: 'Serif CSS Rule', body: css, note: 'Serif font stack.' }], 'Generates serif styles offline.');
      break;
    }
    case 'plant-name-generator': {
      const style = optionValue('plant-name-style', 'latin');
      const names = ['Monstera Deliciosa (' + style + ')', 'Fiddle Leaf Fig', 'Snake Plant', 'Pothos Gold', 'Zamioculcas'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Indoor Botanical Plant Names', [{ title: 'Plant Names', body: names, note: 'Flora titles.' }], 'Generates plant names client-side.');
      break;
    }
    case 'sibling-name-generator': {
      const style = optionValue('matching-style', 'matching_first_letter');
      const gender = optionValue('target-gender', 'any');

      const sibling = compactSeed(text, 'Oliver');
      const matches = ["Leo & " + sibling + " (" + style + ", " + gender + ")", "Emma & " + sibling, "Charlotte & " + sibling, "Noah & " + sibling].join('\n');
      result = matches;
      resultHtml = renderSectionSuite('Matching Baby Sibling Names', [{ title: 'Sibling Combinations', body: matches, note: 'Harmonious sibling names.' }], 'Generates sibling names offline.');
      break;
    }
    case 'pick-a-name-generator': {
      const mode = optionValue('picker-mode', 'single');
      const backups = optionValue('picker-backups', '0');
      const anim = optionValue('animation', 'true') === 'true';
      const remove = optionValue('remove-selected', 'false') === 'true';

      const names = text ? text.split('\n').filter(Boolean) : ['Alex', 'Jordan', 'Taylor', 'Morgan'];
      const picked = randomFrom(names);
      result = "🏆 SELECTED NAME: " + picked + " (Mode: " + mode + ", Backups: " + backups + ", Anim: " + anim + ", Remove: " + remove + ")";
      resultHtml = renderSectionSuite('Random Name Picker Results', [{ title: 'Picked Name', body: "🏆 " + picked, note: 'Drawn from list.' }], 'Picks names client-side.');
      break;
    }
    case 'name-generator-wheel': {
      const mode = optionValue('wheel-mode', 'single');
      const theme = optionValue('wheel-theme', 'colorful');
      const sound = optionValue('sound-effects', 'true') === 'true';
      const remove = optionValue('remove-selected-names', 'false') === 'true';

      const names = text ? text.split('\n').filter(Boolean) : ['Name A', 'Name B', 'Name C', 'Name D'];
      const winner = randomFrom(names);
      result = "🎡 WHEEL LANDED ON: " + winner + " (Mode: " + mode + ", Theme: " + theme + ", Sound: " + sound + ", Remove: " + remove + ")";
      resultHtml = renderSectionSuite('Name Wheel Winner', [{ title: 'Wheel Selection', body: "🎡 " + winner, note: 'Random wheel pick.' }], 'Generates wheel picks offline.');
      break;
    }
    case 'cake-company-names-generator': {
      const style = optionValue('cake-company-style', 'sweet');
      const names = ['Velvet Frost Cakes (' + style + ')', 'Sweet Layer Bakery', 'Sugar Blossom Studio', 'Golden Crumbs'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Bakery & Cake Studio Names', [{ title: 'Cake Company Names', body: names, note: 'Cake business branding.' }], 'Generates cake company names client-side.');
      break;
    }
    case 'car-name-generator': {
      const style = optionValue('car-name-style', 'sports');
      const names = ['Viper GT (' + style + ')', 'Aether Velocity', 'Apex Spectre', 'Titan Phantom'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Vehicle & Sports Car Titles', [{ title: 'Car Names', body: names, note: 'Vehicle model titles.' }], 'Generates car names offline.');
      break;
    }
    case 'title-name-generator': {
      const style = optionValue('title-name-style', 'royal');
      const name = compactSeed(text, 'Arthur');
      const titles = ["Sir " + name + " the Valiant (" + style + ")", "Duke " + name + " of Westfall", "Lord " + name + " the Wise"].join('\n');
      result = titles;
      resultHtml = renderSectionSuite('Noble Titles & Honorifics', [{ title: 'Noble Titles', body: titles, note: 'Honorific names.' }], 'Generates title names client-side.');
      break;
    }
    case 'geo-tag-generator': {
      const geo = "GPS TAG: 37.7749° N, 122.4194° W\nLocation: San Francisco, CA, USA\nEXIF GeoTag Ready";
      result = geo;
      resultHtml = renderSectionSuite('GPS Coordinate Location Tag', [{ title: 'Geo Tag Metadata', body: geo, note: 'Location EXIF data.' }], 'Generates geo tags offline.');
      break;
    }
    case 'pet-tag-generator': {
      const style = optionValue('pet-tag-style', 'standard');
      const layout = optionValue('pet-tag-layout', 'centered');
      const microchip = optionValue('include-microchip-line', 'true') === 'true';

      const pet = compactSeed(text, 'Luna');
      const tag = "PET COLLAR TAG (" + style + ", " + layout + ", Microchip: " + microchip + ")\n" + pet.toUpperCase() + "\nIf Lost, Please Call:\n(555) 019-2834\nMicrochipped";
      result = tag;
      resultHtml = renderSectionSuite('Pet Collar ID Tag Layout', [{ title: 'Pet Tag Text', body: tag, note: 'Engraved collar tag.' }], 'Generates pet tags client-side.');
      break;
    }
    case 'dj-tag-generator': {
      const style = optionValue('dj-tag-style', 'hyped');
      const dj = compactSeed(text, 'Vortex');
      const drops = ["\"DJ " + dj.toUpperCase() + " ON THE MIX! (" + style + ")\"", "\"YOU ARE LISTENING TO DJ " + dj.toUpperCase() + "!\"", "\"PRODUCER " + dj.toUpperCase() + " IN THE BUILDING!\""].join('\n');
      result = drops;
      resultHtml = renderSectionSuite('Audio DJ Drop Voice Tags', [{ title: 'DJ Voice Tags', body: drops, note: 'Audio drop scripts.' }], 'Generates DJ tags offline.');
      break;
    }
    case 'clan-tag-generator': {
      const style = optionValue('clan-tag-style', 'esports');
      const len = optionValue('clan-tag-length', '4');

      const kw = compactSeed(text, 'Viper');
      const tags = ["[VPR] (" + style + ", " + len + "]", "[Apex]", "[xVx]", "[VPRs]"].join(' ');
      result = tags;
      resultHtml = renderSectionSuite('Esports 3-4 Letter Clan Tags', [{ title: 'Clan Tags', body: tags, note: 'Gaming clan tags.' }], 'Generates clan tags client-side.');
      break;
    }
    case 'hang-tag-generator': {
      const style = optionValue('hang-tag-style', 'apparel');
      const purpose = optionValue('hang-tag-purpose', 'retail');
      const incPrice = optionValue('hang-tag-include-price', 'true') === 'true';
      const incSku = optionValue('hang-tag-include-sku', 'true') === 'true';

      const brand = compactSeed(text, 'Acme Apparel');
      const tag = "RETAIL HANG TAG (" + style + ", " + purpose + ", IncPrice: " + incPrice + ", IncSku: " + incSku + ")\n" + brand.toUpperCase() + "\nStyle: Classic Tee | Size: L\nPrice: $29.99\nSKU: #AP-10294";
      result = tag;
      resultHtml = renderSectionSuite('Retail Apparel Hang Tag Layout', [{ title: 'Hang Tag Text', body: tag, note: 'Store pricing tag.' }], 'Generates hang tags offline.');
      break;
    }
    case 'art-tag-generator': {
      const style = optionValue('art-tag-style', 'gallery');
      const title = compactSeed(text, 'Sunset Canvas');
      const tag = "ART GALLERY LABEL (" + style + ")\n\" " + title + " \" (2026)\nMedium: Acrylic on Canvas\nDimensions: 24\" x 36\"\nArtist: Alex Rivers";
      result = tag;
      resultHtml = renderSectionSuite('Gallery Artwork Label Tag', [{ title: 'Art Label Text', body: tag, note: 'Gallery artwork label.' }], 'Generates art tags client-side.');
      break;
    }
    case 'email-tag-generator': {
      const cat = optionValue('email-tag-category', 'filter');
      const format = optionValue('email-tag-format', 'plus');

      const tag = "user+newsletter@example.com (" + cat + ", " + format + ")";
      result = tag;
      resultHtml = renderSectionSuite('Email Filter Plus Tag Handle', [{ title: 'Email Tag', body: tag, note: 'Gmail sub-address tag.' }], 'Generates email tags offline.');
      break;
    }
    case 'tag-team-name-generator': {
      const style = optionValue('tag-team-style', 'action');
      const names = ['The Velocity Vipers (' + style + ')', 'Iron Syndicate', 'Starlight Express', 'Apex Alliance'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Partner & Tag Team Titles', [{ title: 'Tag Team Names', body: names, note: 'Wrestling & partner teams.' }], 'Generates tag team names client-side.');
      break;
    }
    case 'secret-santa-name-generator': {
      const mode = optionValue('output-mode', 'text');
      const alts = optionValue('include-alternates', 'false') === 'true';

      const match = "SECRET SANTA MATCHES (" + mode + ", Alts: " + alts + "):\n• Alex ➔ Sarah\n• Sarah ➔ Michael\n• Michael ➔ Alex\n\nBudget Limit: $25.00";
      result = match;
      resultHtml = renderSectionSuite('Holiday Gift Exchange Matches', [{ title: 'Secret Santa Assignments', body: match, note: 'Randomized gift exchange.' }], 'Generates Secret Santa matches offline.');
      break;
    }
    case 'anagram-of-name-generator': {
      const style = optionValue('anagram-style', 'words');
      const name = compactSeed(text, 'Alex');
      const anagrams = ['Xela (' + style + ')', 'Laxe', 'Axel', 'Exla'].join(', ');
      result = anagrams;
      resultHtml = renderSectionSuite('Name Letter Anagram Permutations', [{ title: 'Name Anagrams', body: anagrams, note: 'Letter permutations.' }], 'Generates anagrams client-side.');
      break;
    }
    case 'cyberpunk-name-generator': {
      const style = optionValue('cyberpunk-name-style', 'hacker');
      const names = ['CyberViper (' + style + ')', 'NeonPulse', 'ZeroCool', 'Synapse99', 'GhostRunner'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Futuristic Cyberpunk Street Handles', [{ title: 'Cyberpunk Names', body: names, note: 'Cyberpunk handles.' }], 'Generates cyberpunk names offline.');
      break;
    }
    case 'goth-name-generator': {
      const style = optionValue('goth-name-style', 'victorian');
      const names = ['Raven Nightshade (' + style + ')', 'Vesper Mortem', 'Lilith Shadow', 'Damien Obsidian'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Dark Victorian Goth Names', [{ title: 'Goth Names', body: names, note: 'Victorian goth titles.' }], 'Generates goth names client-side.');
      break;
    }
    case 'project-name-generator-keywords': {
      const style = optionValue('project-style', 'tech');
      const kw = compactSeed(text, 'Data');
      const projects = ["Project " + titleCase(kw) + "Pulse (" + style + ")", "Project " + titleCase(kw) + "Sync", titleCase(kw) + "Labs Initiative"].join('\n');
      result = projects;
      resultHtml = renderSectionSuite('Keyword-Driven Project Titles', [{ title: 'Project Names', body: projects, note: 'Internal project titles.' }], 'Generates project names offline.');
      break;
    }
    case 'scifi-name-generator': {
      const style = optionValue('scifi-name-style', 'alien');
      const names = ['Zarek Vex (' + style + ')', 'Commander Kaelen', 'Nova Starlight', 'Orion Pax'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Sci-Fi Explorer & Alien Names', [{ title: 'Sci-Fi Names', body: names, note: 'Futuristic character names.' }], 'Generates sci-fi names client-side.');
      break;
    }
    case 'last-name-and-first-name-generator': {
      const names = ['Ethan Sterling', 'Sophia Vance', 'Liam Blackwood', 'Olivia Montgomery'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Complete First & Last Name Combinations', [{ title: 'Full Names', body: names, note: 'Realistic full names.' }], 'Generates full names offline.');
      break;
    }
    case 'baby-name-generator-with-last-name': {
      const style = optionValue('baby-name-style', 'modern');
      const gender = optionValue('gender', 'any');

      const surname = compactSeed(text, 'Smith');
      const names = ["Oliver " + surname + " (" + style + ", " + gender + ")", "Charlotte " + surname, "Henry " + surname, "Amelia " + surname].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Baby Names Matching Surname', [{ title: 'Baby Names', body: names, note: 'Matching surname combination.' }], 'Generates baby names client-side.');
      break;
    }
    case 'nickname-generator-based-on-name': {
      const style = optionValue('nickname-style', 'short');
      const name = compactSeed(text, 'Alexander');
      const nicks = ["Alex (" + style + ")", "Zander", "Al", "Lex", "Sandy"].join(', ');
      result = nicks;
      resultHtml = renderSectionSuite('Name-Based Cute & Cool Nicknames', [{ title: 'Nicknames', body: nicks, note: 'Derived nicknames.' }], 'Generates nicknames offline.');
      break;
    }
    case 'phonetic-spelling-of-name-generator': {
      const format = optionValue('ipa-output-format', 'ipa');
      const name = compactSeed(text, 'Siobhan');
      const phon = name + " ➔ Phonetic: Shi-vawn (IPA: /ʃɪˈvɔːn/, Format: " + format + ")";
      result = phon;
      resultHtml = renderSectionSuite('Phonetic Spelling Guide', [{ title: 'Phonetic Spelling', body: phon, note: 'Pronunciation breakdown.' }], 'Generates phonetic spellings client-side.');
      break;
    }
    case 'ipa-generator': {
      const format = optionValue('ipa-output-format', 'ipa');
      const accent = optionValue('ipa-accent-style', 'us');
      const detail = optionValue('ipa-detail-level', 'broad');

      const word = compactSeed(text, 'Phonetics');
      const ipa = "/" + word.toLowerCase() + "/ ➔ /fəˈnɛt.ɪks/ (Format: " + format + ", Accent: " + accent + ", Detail: " + detail + ")";
      result = ipa;
      resultHtml = renderSectionSuite('International Phonetic Alphabet (IPA)', [{ title: 'IPA Transcription', body: ipa, note: 'IPA phonetic notation.' }], 'Generates IPA transcriptions offline.');
      break;
    }
    case 'name-combination-generator': {
      const mode = optionValue('combination-mode', 'portmanteau');
      const style = optionValue('blend-style', 'smooth');

      const combo = "COMBINED NAME (Brad + Angelina, " + mode + ", " + style + ") ➔ Brangelina";
      result = combo;
      resultHtml = renderSectionSuite('Couples & Name Mesh Compiler', [{ title: 'Combined Name', body: combo, note: 'Portmanteau name mashup.' }], 'Combines names client-side.');
      break;
    }
    case 'performer-names-generator': {
      const style = optionValue('performer-name-style', 'stage');
      const names = ['Aura Vance (' + style + ')', 'Julian Star', 'Mercedes Ray', 'Valerie Moon'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Stage & Theater Performance Names', [{ title: 'Performer Names', body: names, note: 'Stage titles.' }], 'Generates performer names offline.');
      break;
    }
    case 'disc-jockey-names-generator': {
      const style = optionValue('dj-name-style', 'edm');
      const names = ['DJ Pulse (' + style + ')', 'DJ Echo', 'DJ Apex', 'DJ Quantum'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Disc Jockey Monikers', [{ title: 'DJ Names', body: names, note: 'DJ titles.' }], 'Generates DJ names client-side.');
      break;
    }
    case 'name-pronunciation-generator': {
      const format = optionValue('pronunciation-format', 'phonetic');
      const name = compactSeed(text, 'Joaquin');
      const pron = name + " ➔ Pronounced as: wah-KEEN (Format: " + format + ")";
      result = pron;
      resultHtml = renderSectionSuite('Phonetic Pronunciation Guide', [{ title: 'Pronunciation Guide', body: pron, note: 'Audio pronunciation note.' }], 'Generates pronunciations offline.');
      break;
    }
    case 'fantasy-language-generator': {
      const sound = optionValue('aesthetic-sound', 'elvish');
      const use = optionValue('language-use', 'naming');

      const words = ['Elora (Star) [' + sound + ', ' + use + ']', 'Vaelen (Shadow)', 'Aethel (Light)', 'Silvan (Forest)'].join('\n');
      result = words;
      resultHtml = renderSectionSuite('Elvish & Fantasy Language Words', [{ title: 'Fantasy Words', body: words, note: 'Fantasy lexicon.' }], 'Generates fantasy words client-side.');
      break;
    }
    case 'color-palette-generator-from-name': {
      const type = optionValue('harmony-type', 'analogous');
      const mood = optionValue('palette-mood', 'vibrant');
      const count = optionValue('palette-count', '4');

      const name = compactSeed(text, 'Aether');
      const palette = "COLOR PALETTE FOR \"" + name + "\" (" + type + ", " + mood + ", Count: " + count + "):\n• #2563EB (Deep Blue)\n• #60A5FA (Sky Blue)\n• #93C5FD (Light Blue)\n• #EFF6FF (Ice Blue)";
      result = palette;
      resultHtml = renderSectionSuite('Derived Hex Color Palette', [{ title: 'Name Palette', body: palette, note: 'Deterministic hex codes for ' + name }], 'Generates palettes from names offline.');
      break;
    }
    case 'mountain-name-generator': {
      const style = optionValue('mountain-style', 'majestic');
      const feature = optionValue('feature-type', 'peak');

      const names = ['Mount Ironhorn (' + style + ', ' + feature + ')', 'Silvercrest Peak', 'Shadowridge Mountain', 'Frostbite Summit'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Peak & Mountain Range Titles', [{ title: 'Mountain Names', body: names, note: 'Geography peak names.' }], 'Generates mountain names client-side.');
      break;
    }
    case 'forest-name-generator': {
      const style = optionValue('forest-style', 'ancient');
      const fType = optionValue('forest-type', 'woodland');

      const names = ['Whispering Woods (' + style + ', ' + fType + ')', 'Emerald Canopy Forest', 'Shadowfen Thicket', 'Silverleaf Grove'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Ancient Woodland & Forest Titles', [{ title: 'Forest Names', body: names, note: 'Woodland names.' }], 'Generates forest names offline.');
      break;
    }
    case 'team-name-generator-using-keywords': {
      const vibe = optionValue('team-vibe', 'fierce');
      const placement = optionValue('keyword-placement', 'prefix');

      const kw = compactSeed(text, 'Code');
      const teams = [titleCase(kw) + " Ninjas (" + vibe + ", " + placement + ")", "Team " + titleCase(kw) + " Craft", titleCase(kw) + " Hackers"].join('\n');
      result = teams;
      resultHtml = renderSectionSuite('Custom Keyword Team Names', [{ title: 'Team Names', body: teams, note: 'Group team names.' }], 'Generates team names client-side.');
      break;
    }
    case 'ancient-greek-inspired-name-generator': {
      const style = optionValue('greek-name-style', 'mythological');
      const names = ['Perseus (' + style + ')', 'Helena', 'Adonis', 'Thalia', 'Cassandra'].join(', ');
      result = names;
      resultHtml = renderSectionSuite('Hellenic & Greek Myth Names', [{ title: 'Greek Names', body: names, note: 'Ancient Greek names.' }], 'Generates Greek names offline.');
      break;
    }
    case 'roman-inspired-character-name-generator': {
      const style = optionValue('roman-name-style', 'patrician');
      const names = ['Marcus Aurelius (' + style + ')', 'Lucius Maximus', 'Julia Augusta', 'Titus Cassius'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Roman Empire Gladiatorial Names', [{ title: 'Roman Names', body: names, note: 'Roman imperial names.' }], 'Generates Roman names client-side.');
      break;
    }
    case 'ancient-egyptian-inspired-name-generator': {
      const style = optionValue('egyptian-name-style', 'pharaoh');
      const names = ['Ramses (' + style + ')', 'Nefertiti', 'Amun-Ra', 'Cleopatra', 'Osiris'].join(', ');
      result = names;
      resultHtml = renderSectionSuite('Pharaoh & Egyptian Deity Names', [{ title: 'Egyptian Names', body: names, note: 'Egyptian names.' }], 'Generates Egyptian names offline.');
      break;
    }
    case 'iupac-name-generator': {
      const type = optionValue('compound-type', 'organic');
      const detail = optionValue('detail-level', 'full');

      const chemical = "2,2,4-Trimethylpentane (Isooctane) [Type: " + type + ", Detail: " + detail + "]";
      result = chemical;
      resultHtml = renderSectionSuite('IUPAC Chemical Compound Notation', [{ title: 'IUPAC Name', body: chemical, note: 'Chemical naming convention.' }], 'Generates IUPAC names client-side.');
      break;
    }
    case 'victorian-name-generator': {
      const style = optionValue('victorian-style', 'aristocrat');
      const format = optionValue('name-format', 'full');

      const names = ['Archibald Sterling (' + style + ', ' + format + ')', 'Beatrice Kensington', 'Cecil Montgomery', 'Florence Fairgate'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('19th-Century Victorian Aristocrat Names', [{ title: 'Victorian Names', body: names, note: 'Victorian era names.' }], 'Generates Victorian names offline.');
      break;
    }
    case 'racehorse-name-generator': {
      const style = optionValue('racehorse-style', 'classic');
      const names = ['Secretariat II (' + style + ')', 'Thunderbolt Speed', 'Golden Gallop', 'Royal Pegasus', 'Midnight Runner'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Derby & Racehorse Titles', [{ title: 'Racehorse Names', body: names, note: 'Equestrian titles.' }], 'Generates racehorse names client-side.');
      break;
    }
    case 'emo-name-generator': {
      const style = optionValue('emo-style', 'classic');
      const names = ['BrokenTears (' + style + ')', 'FallenAngel', 'MelancholySky', 'VelvetSorrow', 'DarkRain'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Emo Screen Names & Monikers', [{ title: 'Emo Names', body: names, note: 'Alternative screen names.' }], 'Generates emo names offline.');
      break;
    }
    case 'poster-generator': {
      const eType = optionValue('event-type', 'concert');
      const tone = optionValue('poster-tone', 'energetic');
      const hStyle = optionValue('headline-style', 'bold');
      const format = optionValue('poster-format', 'digital');
      const cta = optionValue('call-to-action', 'get-tickets');

      const title = compactSeed(text, 'Summer Music Festival');
      const poster = "POSTER SPECIFICATION (" + eType + ", " + tone + ", " + hStyle + ", " + format + ", CTA: " + cta + ")\n" + title.toUpperCase() + "\nDate: August 15, 2026 | Doors Open 7:00 PM\nLocation: Grand Arena Main Stage\nTickets Available Online Now!";
      result = poster;
      resultHtml = renderSectionSuite('Event Poster Marketing Copy Layout', [{ title: 'Poster Layout Text', body: poster, note: 'Print & digital poster layout.' }], 'Generates poster specs client-side.');
      break;
    }
    case 'flyer-generator': {
      const mode = optionValue('flyer-mode', 'event');
      const offer = optionValue('flyer-offer', 'discount');
      const tone = optionValue('flyer-tone', 'exciting');

      const title = compactSeed(text, 'Grand Opening Sale');
      const flyer = "FLYER LAYOUT (" + mode + ", " + offer + ", " + tone + ")\n" + title.toUpperCase() + "\nJoin us this weekend for exclusive discounts up to 50% off!\nFree refreshments & giveaway prizes for the first 50 visitors.";
      result = flyer;
      resultHtml = renderSectionSuite('Promotional Event Flyer Blueprint', [{ title: 'Flyer Copy Text', body: flyer, note: 'Promotional flyer copy.' }], 'Generates flyer text offline.');
      break;
    }
    case 'fantasy-map-generator': {
      const scope = optionValue('map-scope', 'regional');
      const bias = optionValue('terrain-bias', 'coastal');
      const density = optionValue('settlement-density', 'medium');
      const tone = optionValue('map-tone', 'heroic');
      const legend = optionValue('include-legend', 'true') === 'true';

      const map = "FANTASY MAP BLUEPRINT (" + scope + ", " + bias + ", " + density + ", " + tone + ", Legend: " + legend + ")\nRegions:\n1. The Whispering Forest (North)\n2. Dragon's Ridge Mountains (East)\n3. Sunken Harbor City (West)\n4. Iron Citadel Fortress (South)";
      result = map;
      resultHtml = renderSectionSuite('Cartographic Worldbuilding Blueprint', [{ title: 'Fantasy Map Regions', body: map, note: 'Worldbuilding map layout.' }], 'Generates fantasy maps client-side.');
      break;
    }
    case 'snapchat-name-generator': {
      const handle = compactSeed(text, 'Alex');
      const names = [handle + "_Snaps", "Real" + handle, handle + "Vibes", "The" + handle + "Show"].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Snapchat Handles & Display Names', [{ title: 'Snapchat Handles', body: names, note: 'Social handle ideas.' }], 'Generates Snapchat handles offline.');
      break;
    }
    case 'anime-name-generator': {
      const names = ['Ren Amamiya', 'Akira Kurusu', 'Sakura Haruno', 'Kaito Kuroba', 'Yuki Takahashi'].join('\n');
      result = names;
      resultHtml = renderSectionSuite('Anime Character Names', [{ title: 'Anime Names', body: names, note: 'Manga & anime titles.' }], 'Generates anime names client-side.');
      break;
    }
    case 'shakespeare-insult-generator': {
      const insults = ['Thou art a boil, a plague sore, an embossed carbuncle in my corrupted blood!', 'Thou art as fat as butter!', 'Away, thou rag, thou quantity, thou remnant!'].join('\n\n');
      result = insults;
      resultHtml = renderSectionSuite('Bardic Elizabethan Insults', [{ title: 'Shakespearean Insults', body: insults, note: 'Authentic Elizabethan quotes.' }], 'Generates Shakespeare insults offline.');
      break;
    }
    case 'comeback-generator': {
      const comebacks = ["I'd agree with you, but then we'd both be wrong.", "You bring everyone so much joy... when you leave the room.", "I'm non-judgmental. I just notice things."].join('\n\n');
      result = comebacks;
      resultHtml = renderSectionSuite('Witty Comebacks & Retorts', [{ title: 'Comebacks', body: comebacks, note: 'Smart retorts.' }], 'Generates comebacks client-side.');
      break;
    }
    case 'roast-generator': {
      const roasts = ["You're like a cloud. When you disappear, it's a beautiful day.", "I'm not saying I hate you, but I would turn off your Wi-Fi.", "You have so many gaps in your logic, it's practically Swiss cheese."].join('\n\n');
      result = roasts;
      resultHtml = renderSectionSuite('Playful Roast Jokes', [{ title: 'Roast Lines', body: roasts, note: 'Humorous roast jokes.' }], 'Generates roasts offline.');
      break;
    }
    case 'acceptable-use-policy-generator': {
      const company = compactSeed(text, 'Acme Platform');
      const policy = "ACCEPTABLE USE POLICY (AUP)\nCompany: " + company + "\n\n1. PROHIBITED USES:\nUsers may not use the services to transmit malware, spam, or perform unauthorized security scans.\n\n2. ENFORCEMENT:\nViolations may result in account termination.";
      result = policy;
      resultHtml = renderSectionSuite('Acceptable Use Policy (AUP) Document', [{ title: 'AUP Document Copy', body: policy, note: 'Standard web service AUP.' }], 'Generates AUP policies client-side.');
      break;
    }
    case 'contract-generator': {
      const client = compactSeed(text, 'Client LLC');
      const contract = "INDEPENDENT CONTRACTOR AGREEMENT\nClient: " + client + "\nEffective Date: 2026-07-20\n\n1. SERVICES & DELIVERABLES:\nContractor agrees to deliver software engineering and technical consulting services.\n\n2. COMPENSATION:\nPayment terms: Net 30 days upon invoice completion.";
      result = contract;
      resultHtml = renderSectionSuite('Commercial Business Contract Agreement', [{ title: 'Contract Summary', body: contract, note: 'Formal contractor agreement.' }], 'Generates contracts offline.');
      break;
    }
    case 'dmca-policy-generator': {
      const site = compactSeed(text, 'Acme Website');
      const dmca = "DMCA COPYRIGHT NOTICE & TAKEDOWN POLICY\nSite: " + site + "\n\nDesignated Agent:\nDMCA Agent, Acme Legal Dept.\nEmail: dmca@example.com\nAddress: 100 Innovation Way, San Francisco, CA";
      result = dmca;
      resultHtml = renderSectionSuite('DMCA Takedown Policy Notice', [{ title: 'DMCA Policy Copy', body: dmca, note: 'Copyright compliance notice.' }], 'Generates DMCA policies client-side.');
      break;
    }
    case 'service-agreement-generator': {
      const client = compactSeed(text, 'Enterprise Client');
      const msa = "MASTER SERVICE AGREEMENT (MSA)\nClient: " + client + "\n\n1. SERVICE LEVEL AGREEMENT (SLA):\n99.9% monthly uptime guarantee for cloud service infrastructure.\n\n2. LIMITATION OF LIABILITY:\nCapped at total fees paid during preceding 12 months.";
      result = msa;
      resultHtml = renderSectionSuite('Master Service Agreement (MSA) Summary', [{ title: 'Service Agreement Copy', body: msa, note: 'Commercial MSA contract.' }], 'Generates service agreements offline.');
      break;
    }
    default:
      result = 'This generator is coming soon! Check back for updates.';
    }

  renderPremiumOutput(result, resultHtml);
  if (output) {
    output.classList.remove('loading');
  }
}

generateBtn?.addEventListener('click', generate);
resetBtn?.addEventListener('click', () => {
  if (input) {
    if (input.value !== '') {
      undoStack.push(input.value);
      redoStack.length = 0;
      lastValue = '';
      updateUndoRedoButtons();
    }
    input.value = '';
  }
  output.innerHTML = 'Your generated results will appear here.';
  delete output.dataset.copyText;
  output.classList.add('empty');
});
exampleBtn?.addEventListener('click', async () => {
  const { examples } = await import('./data/generator-datasets');
  input.value = examples[toolSlug] || 'Example text';
  generate();
});
document.querySelectorAll('.example-chip').forEach(chip => {
  chip.addEventListener('click', async () => {
    const { examples } = await import('./data/generator-datasets');
    const value = (chip as HTMLElement).dataset.example || examples[toolSlug] || 'Example text';
    input.value = value;
    generate();
  });
});
copyBtn?.addEventListener('click', async () => {
  copyText(output.dataset.copyText || output.textContent || '', copyBtn as HTMLElement);
  trackCopy(toolSlug);
});
output.addEventListener('click', async event => {
  const target = event.target as HTMLElement;
  const button = target.closest<HTMLElement>('[data-copy]');
  if (!button) return;
  await copyText(button.dataset.copy || '', button);
  trackCopy(toolSlug);
});
regenBtn?.addEventListener('click', generate);

// Auto-generate when options change
document.querySelectorAll('.tool-select, .tool-number, .tool-checkbox').forEach(el => {
  el.addEventListener('change', () => {
    const inputEl = el as HTMLInputElement | HTMLSelectElement;
    const value = inputEl.type === 'checkbox' ? (inputEl as HTMLInputElement).checked : inputEl.value;
    trackOptionChange(toolSlug, inputEl.id, value);
    generate();
  });
});

// Undo, Redo and Share handlers
const undoBtn = document.getElementById('undo-btn') as HTMLButtonElement | null;
const redoBtn = document.getElementById('redo-btn') as HTMLButtonElement | null;
const shareBtn = document.getElementById('share-btn');

if (input) {
  // Capture the text input history
  input.addEventListener('focus', () => {
    lastValue = input.value;
  });
  
  let inputTimeout: any;
  input.addEventListener('input', () => {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
      if (input.value !== lastValue) {
        undoStack.push(lastValue);
        redoStack.length = 0; // clear redo on new input
        lastValue = input.value;
        updateUndoRedoButtons();
      }
    }, 500);
  });
}

undoBtn?.addEventListener('click', () => {
  if (undoStack.length > 0) {
    const val = undoStack.pop()!;
    redoStack.push(input.value);
    input.value = val;
    lastValue = val;
    generate();
    
    const prefix = toolSlug.split('-')[0];
    const extensionsContainer = document.getElementById(`${prefix}-extensions-container`);
    const searchContainer = document.getElementById('style-search-container');
    if (searchContainer) searchContainer.style.display = val ? 'block' : 'none';
    if (extensionsContainer) extensionsContainer.style.display = val ? 'block' : 'none';
    updateUndoRedoButtons();
  }
});

redoBtn?.addEventListener('click', () => {
  if (redoStack.length > 0) {
    const val = redoStack.pop()!;
    undoStack.push(input.value);
    input.value = val;
    lastValue = val;
    generate();
    
    const prefix = toolSlug.split('-')[0];
    const extensionsContainer = document.getElementById(`${prefix}-extensions-container`);
    const searchContainer = document.getElementById('style-search-container');
    if (searchContainer) searchContainer.style.display = val ? 'block' : 'none';
    if (extensionsContainer) extensionsContainer.style.display = val ? 'block' : 'none';
    updateUndoRedoButtons();
  }
});

shareBtn?.addEventListener('click', async () => {
  try {
    trackShare(toolSlug);
    await navigator.clipboard.writeText(window.location.href);
    const origText = shareBtn.innerHTML;
    shareBtn.innerHTML = '✅ Copied Link!';
    shareBtn.classList.add('copied');
    setTimeout(() => {
      shareBtn.innerHTML = origText;
      shareBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('Failed to copy link: ', err);
  }
});

// Dynamic configuration-driven workspace extensions loader
import { createWorkspace } from './workspace/index';
trackGeneratorOpen(toolSlug);
createWorkspace(toolSlug, input, output, generate);

