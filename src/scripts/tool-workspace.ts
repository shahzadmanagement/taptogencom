import { trackGeneratorOpen, trackGenerate, trackCopy, trackDownload, trackShare, trackOptionChange } from '../lib/analytics';

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
const boldMap: Record<string, string> = {};
const cursiveMap: Record<string, string> = {};
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('').forEach((c, i) => {
  if (i < 26) { boldMap[c] = String.fromCodePoint(0x1D400 + i); cursiveMap[c] = String.fromCodePoint(0x1D49C + i); }
  else if (i < 52) { boldMap[c] = String.fromCodePoint(0x1D41A + (i - 26)); cursiveMap[c] = String.fromCodePoint(0x1D4B6 + (i - 26)); }
  else { boldMap[c] = String.fromCodePoint(0x1D7CE + (i - 52)); }
});

function toUnicode(text: string, map: Record<string, string>): string {
  return text.split('').map(c => map[c] || c).join('');
}

// Name banks
function randomFrom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function generateMultiple(fn: () => string, count: number): string { return Array.from({ length: count }, fn).join('\n'); }
function escapeHtml(value: string): string {
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

  return '<article class="result-card" data-style-name="' + safeText + '"><div class="result-card-top"><span class="result-label">' + safeLabel + '</span><div style="display: flex; align-items: center; gap: 6px;">' + favBtn + '<button class="copy-btn result-copy" type="button" data-copy="' + safeText + '">Copy</button></div></div><div class="result-text">' + safeText + '</div></article>';
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

function slugWords(value: string): string[] {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(Boolean);
}

function titleCase(value: string): string {
  return value.split(/\s+/).filter(Boolean).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function compactSeed(value: string, fallback = 'Nova'): string {
  const words = slugWords(value || fallback);
  const seed = words.length ? words.join(' ') : fallback;
  return titleCase(seed);
}

function toSafeHandle(value: string, fallback = 'player'): string {
  return (slugWords(value || fallback).join('') || fallback).slice(0, 22);
}

function unicodeMap(upperStart: number, lowerStart: number, digitStart?: number): Record<string, string> {
  const map: Record<string, string> = {};
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((c, i) => { map[c] = String.fromCodePoint(upperStart + i); });
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach((c, i) => { map[c] = String.fromCodePoint(lowerStart + i); });
  if (digitStart !== undefined) '0123456789'.split('').forEach((c, i) => { map[c] = String.fromCodePoint(digitStart + i); });
  return map;
}

const italicUnicodeMap = unicodeMap(0x1D434, 0x1D44E);
const boldItalicUnicodeMap = unicodeMap(0x1D468, 0x1D482);
const gothicUnicodeMap = {
  ...unicodeMap(0x1D504, 0x1D51E),
  C: 'ℭ',
  H: 'ℌ',
  I: 'ℑ',
  R: 'ℜ',
  Z: 'ℨ'
};
const monospaceUnicodeMap = unicodeMap(0x1D670, 0x1D68A, 0x1D7F6);
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

function transformSquared(value: string): string {
  return [...value.toUpperCase()].map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + code - 65);
    return c;
  }).join('');
}

function transformUpsideDown(value: string): string {
  return [...value].reverse().map(c => upsideDownMap[c] || c).join('');
}

function transformFullwidth(value: string): string {
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

function renderSectionSuite(title: string, sections: { title: string; body: string; note?: string }[], footer = ''): string {
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

function filterGroupsByOption<T extends { title: string }>(groups: T[], selected: string): T[] {
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
    morseMap, buildYouTubeTagSuite
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
  } else if (['random-number-generator','random-phrase-generator','random-text-generator','gibberish-generator','random-question-generator','truth-or-dare-generator','would-you-rather-generator','joke-generator','compliment-generator','random-word-generator'].includes(toolSlug)) {
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

      const delayLine = crawlDelay !== 'none' ? `\nCrawl-delay: ${crawlDelay}` : '';

      const templates: Record<string, string> = {
        standard: `User-agent: *\nAllow: /${delayLine}\nDisallow: /admin/\nDisallow: /private/`,
        wordpress: `User-agent: *\nAllow: /wp-content/uploads/\nAllow: /wp-admin/admin-ajax.php${delayLine}\nDisallow: /wp-admin/\nDisallow: /wp-login.php\nDisallow: /?s=`,
        ecommerce: `User-agent: *\nAllow: /${delayLine}\nDisallow: /cart/\nDisallow: /checkout/\nDisallow: /account/\nDisallow: /search/`,
        staging: `User-agent: *\nDisallow: /\n\n# Staging mode blocks all crawling. Do not use this on a live public site unless you intentionally want noindex-style crawl blocking.`
      };

      let robots = templates[mode] || templates.standard;

      if (blockAI) {
        robots += `\n\n# Block AI Scrapers and Crawlers\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: Google-Extended\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /\n\nUser-agent: ChatGPT-User\nDisallow: /`;
      }

      if (blockSEO) {
        robots += `\n\n# Block Aggressive SEO Audit Bots\nUser-agent: AhrefsBot\nDisallow: /\n\nUser-agent: SemrushBot\nDisallow: /\n\nUser-agent: DotBot\nDisallow: /\n\nUser-agent: Rogerbot\nDisallow: /`;
      }

      const body = robots + (includeSitemap ? `\n\nSitemap: https://${domain}/sitemap.xml` : '');
      const sections = [
        { title: `${titleCase(mode)} robots.txt`, body, note: includeSitemap ? 'Includes sitemap line.' : 'Sitemap line omitted.' },
        { 
          title: 'Robots.txt Safety Checklist', 
          body: '1. Do not block CSS, JavaScript, or image assets required by search engines to render your site.\n2. Double check lowercase/uppercase routes (disallow paths are case-sensitive).\n3. Staging configuration blocks all indexing. Remove it when launching live.\n4. Make sure this file is placed at the root of your domain: https://example.com/robots.txt',
          note: 'Pre-deployment review.' 
        }
      ];
      result = body;
      resultHtml = renderSectionSuite('Robots.txt Template', sections, 'Crawler rules are suggestions. Well-behaved search bots respect them, but malicious bots might ignore them.');
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
      const count = Math.max(1, Math.min(50, Number(optionValue('uuid-count', '8')) || 8));
      const caseMode = optionValue('uuid-case', 'lowercase');
      const hyphenMode = optionValue('uuid-hyphens', 'with');

      const generateUUIDv7 = () => {
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        const timestamp = Date.now();
        bytes[0] = (timestamp / 0x10000000000) & 0xff;
        bytes[1] = (timestamp / 0x100000000) & 0xff;
        bytes[2] = (timestamp / 0x1000000) & 0xff;
        bytes[3] = (timestamp / 0x10000) & 0xff;
        bytes[4] = (timestamp / 0x100) & 0xff;
        bytes[5] = timestamp & 0xff;
        bytes[6] = (bytes[6] & 0x0f) | 0x70; // Set version to 7
        bytes[8] = (bytes[8] & 0x3f) | 0x80; // Set variant to RFC 4122
        const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        return [
          hex.slice(0, 8),
          hex.slice(8, 12),
          hex.slice(12, 16),
          hex.slice(16, 20),
          hex.slice(20, 32)
        ].join('-');
      };

      if (!(window as any)._uuidV1State) {
        const nodeId = new Uint8Array(6);
        crypto.getRandomValues(nodeId);
        nodeId[0] |= 0x01; // Multicast bit
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
        const hexTimeHi = (timeHi | 0x1000).toString(16).padStart(4, '0'); // v1

        const cSeq = (v1State.clockSeq++) & 0x3fff;
        const hexClockSeq = (cSeq | 0x8000).toString(16).padStart(4, '0'); // variant 1

        const hexNode = Array.from(v1State.nodeId as Uint8Array).map(b => b.toString(16).padStart(2, '0')).join('');
        return `${hexTimeLow}-${hexTimeMid}-${hexTimeHi}-${hexClockSeq}-${hexNode}`;
      };

      const formatUuid = (value: string) => {
        let formatted = hyphenMode === 'without' ? value.replace(/-/g, '') : value;
        formatted = caseMode === 'uppercase' ? formatted.toUpperCase() : formatted.toLowerCase();
        return formatted;
      };

      const items = Array.from({ length: count }, () => {
        if (version === 'v7') return formatUuid(generateUUIDv7());
        if (version === 'v1') return formatUuid(generateUUIDv1());
        return formatUuid(crypto.randomUUID());
      });

      result = items.join('\n');
      resultHtml = renderHeadlineGroups([{ title: 'UUID Results', note: `${count} UUID ${version.toUpperCase()} value(s). Use as identifiers.`, items }], 'UUIDs are identifiers. Do not use them as passwords, API secrets, or authentication tokens.');
      break;
    }
    case 'random-number-generator': {
      const min = Number(optionValue('random-min', '1')) || 1;
      const max = Number(optionValue('random-max', '100')) || 100;
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
      const topic = compactSeed(text, 'curious learners');
      const mode = optionValue('sentence-mode', 'random');
      const count = Math.max(3, Math.min(20, Number(optionValue('sentence-count', '8')) || 8));
      const length = optionValue('sentence-length', 'medium');
      const pools: Record<string, string[]> = {
        simple: [
          `${titleCase(topic)} can be easier to understand when each idea is explained one step at a time.`,
          `A focused example helps people remember the main point about ${topic}.`,
          `Good practice turns ${topic} from a confusing subject into a familiar skill.`
        ],
        creative: [
          `${titleCase(topic)} opened like a bright door at the end of a quiet hallway.`,
          `Every note about ${topic} felt like a map drawn in fresh ink.`,
          `The first lesson in ${topic} arrived with a spark, a question, and a reason to keep going.`
        ],
        funny: [
          `${titleCase(topic)} looked simple until the notes started bringing their own agenda.`,
          `I tried to explain ${topic} quickly, and my coffee requested a longer meeting.`,
          `The shortcut for ${topic} works best after learning the long way at least once.`
        ],
        professional: [
          `${titleCase(topic)} supports better decisions when teams define the goal before choosing the method.`,
          `A clear process for ${topic} reduces confusion and makes progress easier to measure.`,
          `The strongest approach to ${topic} combines practical examples with consistent review.`
        ],
        'writing-prompt': [
          `Write a scene where ${topic} changes the outcome of an ordinary day.`,
          `Describe ${topic} through the eyes of someone encountering it for the first time.`,
          `Create a short argument for why ${topic} matters more than people expect.`
        ]
      };
      const selectedPool = mode === 'random' ? Object.values(pools).flat() : (pools[mode] || pools.simple);
      const trimSentence = (sentence: string) => length === 'short' ? sentence.split(',')[0].replace(/\.$/, '') + '.' : length === 'long' ? sentence + ' Add one concrete example to make the idea memorable.' : sentence;
      const items = Array.from({ length: count }, () => trimSentence(randomFrom(selectedPool)));
      result = items.map((item, index) => `${index + 1}. ${item}`).join('\n');
      resultHtml = renderHeadlineGroups([{ title: 'Generated Sentences', note: `Mode: ${titleCase(mode.replace(/-/g, ' '))}. Topic: ${topic}.`, items }], 'Copy a single sentence or copy the full sentence bank for writing practice.');
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
      if (!text) { result = 'Please enter some text above.'; break; }
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const toHex = (buffer: ArrayBuffer) => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        const algorithmGroup = optionValue('hash-algorithm-group', 'all');
        const uppercase = optionValue('hash-uppercase', 'false') === 'true';
        const algorithms = algorithmGroup === 'sha256' ? ['SHA-256'] : ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
        const sections = await Promise.all(algorithms.map(async algorithm => {
          const rawHash = toHex(await crypto.subtle.digest(algorithm, data));
          const hash = uppercase ? rawHash.toUpperCase() : rawHash;
          return { title: algorithm, body: hash, note: `${hash.length} hex characters.` };
        }));
        sections.push({ title: 'Input Summary', body: `Characters: ${text.length}\nUTF-8 bytes: ${data.byteLength}\nMD5: not generated because browser SubtleCrypto does not support MD5.`, note: 'Supported browser crypto algorithms only.' });
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Cryptographic Hash Drawer', sections, 'All cryptographic operations are performed completely client-side in your browser. No input text is sent to our servers.');
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
      if (!text) { result = 'Please paste your JSON above.'; break; }
      const indent = Math.max(2, Math.min(8, Number(optionValue('json-indent', '2')) || 2));
      const sortKeys = optionValue('json-sort-keys', 'false') === 'true';
      const autofix = optionValue('json-autofix', 'false') === 'true';

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

      try {
        parsed = JSON.parse(text);
      } catch (e) {
        parseError = (e as Error).message;
        if (autofix) {
          const autofixResult = tryAutoFixJson(text);
          try {
            parsed = JSON.parse(autofixResult.fixed);
            usedText = autofixResult.fixed;
            fixLogs = autofixResult.logs;
            parseError = null; // Cleared on successful fix
          } catch (innerError) {
            // Keep original parse error if auto-fix fails
          }
        }
      }

      if (parseError === null) {
        const sorted = sortKeys ? sortJson(parsed) : parsed;
        const formatted = JSON.stringify(sorted, null, indent);
        const minified = JSON.stringify(sorted);
        const counts = countNodes(sorted);
        
        const sections = [
          { title: 'Formatted JSON', body: formatted, note: `Valid JSON, ${indent}-space indentation.` },
          { title: 'Minified JSON', body: minified, note: `${minified.length} characters.` },
          { title: 'Structure Summary', body: `State: Valid\nObjects: ${counts.objects}\nArrays: ${counts.arrays}\nKeys: ${counts.keys}\nSorted Keys: ${sortKeys ? 'yes' : 'no'}`, note: 'Lightweight structure inspection.' }
        ];

        if (fixLogs.length > 0) {
          sections.push({
            title: 'Auto-Fix Logs',
            body: fixLogs.map((log, index) => `${index + 1}. ${log}`).join('\n'),
            note: 'Notice: JSON fixed automatically to make it valid.'
          });
        }

        result = formatted;
        resultHtml = renderSectionSuite('JSON Formatter', sections, 'JSON is formatted and validated client-side for privacy. No data is sent to the server.');
      } else {
        const diagnostics = runDiagnostics(text);
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
      const moods = ['Editorial Calm', 'Fresh Contrast', 'Modern Warmth', 'Clear Focus', 'Soft Launch'];
      const labels = ['Primary', 'Secondary', 'Accent', 'Surface', 'Text'];
      const shifts = [0, 32, 164, 210, 0];
      const lightness = [42, 58, 50, 92, 14];
      const saturation = [68, 62, 74, 28, 18];
      const colors = labels.map((label, i) => {
        const h = (baseHue + shifts[i]) % 360;
        const rgb = hslToRgb(h, saturation[i], lightness[i]);
        return { label, hex: rgbToHex(rgb), rgb, hsl: `HSL ${h}, ${saturation[i]}%, ${lightness[i]}%` };
      });
      const ratio = contrastRatio(colors[3].rgb, colors[4].rgb);
      const paletteName = compactSeed(seed, 'Palette') + ' ' + randomFrom(moods);
      const note = ratio >= 4.5 ? `Simple contrast note: ${colors[4].hex} on ${colors[3].hex} is likely readable for normal text (${ratio.toFixed(1)}:1).` : `Simple contrast note: ${colors[4].hex} on ${colors[3].hex} is low for normal text (${ratio.toFixed(1)}:1); use larger text or adjust contrast.`;
      result = paletteName + '\n' + colors.map(color => `${color.label}: ${color.hex} | RGB ${color.rgb.join(', ')} | ${color.hsl}`).join('\n') + '\n' + note;
      resultHtml = renderColorPalette(paletteName, 'Seeded from: ' + seed, colors, note);
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
    case 'random-phrase-generator':
      result = generateMultiple(() => randomFrom(randomPhrases), 5);
      break;
    case 'special-character-generator': {
      const sections = [
        ['Arrows', '\u2190 \u2191 \u2192 \u2193 \u2194 \u2195 \u21D0 \u21D1 \u21D2 \u21D3 \u21B5 \u27A1 \u2B05 \u2B06 \u2B07'],
        ['Stars & Decorative', '\u2605 \u2606 \u2729 \u272A \u2730 \u2736 \u2737 \u2738 \u273F \u2740 \u2741 \u2756 \u2764 \u2765'],
        ['Math & Logic', '\u00B1 \u00D7 \u00F7 \u2260 \u2264 \u2265 \u221E \u2211 \u222B \u221A \u03C0 \u2206 \u2207 \u2248'],
        ['Currency', '\u0024 \u20AC \u00A3 \u00A5 \u20A3 \u20B9 \u20A9 \u20BF \u00A2'],
        ['Legal & Business', '\u00A9 \u00AE \u2122 \u00A7 \u00B6 \u2020 \u2021'],
        ['Boxes & Lines', '\u2500 \u2502 \u250C \u2510 \u2514 \u2518 \u253C \u2588 \u2591 \u2592 \u2593 \u25A0 \u25A1 \u25AA \u25AB']];
      result = sections.map(([title, chars]) => `${title}:\n${chars}`).join('\n\n');
      break;
    }
    case 'ascii-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const asciiChars: Record<string, string[]> = {
        A: [' ___ ','|   |','|___|','|   |','|   |'], B: [' ___ ','|   )','|___}','|   )','|___|'],
        C: [' ___ ','|    ','|    ','|    ','|___'], D: [' __ ','|  \\','|   |','|  /','|__/'],
        E: [' ___ ','|    ','|___ ','|    ','|___'], F: [' ___ ','|    ','|___ ','|    ','|   '],
        G: [' ___ ','|    ','| __|','|   |','|___|'], H: ['     ','|   |','|___|','|   |','|   |'],
        I: [' ___ ',' | | ',' | | ',' | | ',' |_| '], J: ['   _ ','   | ','   | ','|  | ','|__|'],
        K: ['     ','| / ','|/  ','|\\  ','| \\ '], L: ['     ','|    ','|    ','|    ','|___'],
        M: ['     ','|\\ /|','| v |','|   |','|   |'], N: ['     ','|\\  |','| \\ |','|  \\|','|   |'],
        O: [' ___ ','|   |','|   |','|   |','|___|'], P: [' ___ ','|   |','|___|','|    ','|    ']};
      const upper = text.toUpperCase();
      const lines = Array.from({length: 5}, (_, row) => upper.split('').map(c => (asciiChars[c] || ['     ','     ','     ','     ','     '])[row]).join(' ')).join('\n');
      result = lines;
      break;
    }
    case 'creepy-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const cUp = ['\u030d','\u030e','\u0304','\u0305','\u033f','\u0311','\u0306','\u0310','\u0352','\u0357','\u0351','\u0307','\u0308','\u030a','\u0342','\u0343','\u0344','\u034a','\u034b','\u034c'];
      const cDown = ['\u0316','\u0317','\u0318','\u0319','\u031c','\u031d','\u031e','\u031f','\u0320','\u0324','\u0325','\u0326','\u0329','\u032a','\u032b','\u032c','\u032d','\u032e','\u032f','\u0330'];
      const light = text.split('').map(c => { let g = c; for (let i = 0; i < 2; i++) g += randomFrom(cUp) + randomFrom(cDown); return g; }).join('');
      const medium = text.split('').map(c => { let g = c; for (let i = 0; i < 4; i++) g += randomFrom(cUp) + randomFrom(cDown); return g; }).join('');
      const heavy = text.split('').map(c => { let g = c; for (let i = 0; i < 7; i++) g += randomFrom(cUp) + randomFrom(cDown); return g; }).join('');
      result = `Light Creepy:\n${light}\n\nMedium Creepy:\n${medium}\n\nMaximum Creepy:\n${heavy}`;
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
      const squareMap = (t: string) => t.toUpperCase().split('').map(c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + code - 65); return c; }).join('');
      const negSquareMap = (t: string) => t.toUpperCase().split('').map(c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F170 + code - 65); return c; }).join('');
      result = `Bold: ${toUnicode(text, boldMap)}\n\nCursive: ${toUnicode(text, cursiveMap)}\n\nSquared: ${squareMap(text)}\n\nNeg Squared: ${negSquareMap(text)}\n\nFullwidth: ${text.split('').map(c => { const code = c.charCodeAt(0); if (code >= 33 && code <= 126) return String.fromCodePoint(code + 0xFEE0); if (c === ' ') return '\u3000'; return c; }).join('')}\n\nSmall Caps: ${text.toLowerCase().split('').map(c => smallCapsMap[c] || c).join('')}`;
      break;
    }
    case 'old-english-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const frakturMap: Record<string, string> = {};
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('').forEach((c, i) => {
        if (i < 26) frakturMap[c] = String.fromCodePoint(0x1D504 + i);
        else frakturMap[c] = String.fromCodePoint(0x1D51E + (i - 26));
      });
      result = text.split('').map(c => frakturMap[c] || c).join('');
      break;
    }
    case 'uwu-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      let uwu = text.replace(/[rl]/g, 'w').replace(/[RL]/g, 'W').replace(/n([aeiou])/g, 'ny$1').replace(/N([aeiou])/g, 'Ny$1').replace(/N([AEIOU])/g, 'Ny$1');
      const faces = ['UwU','OwO','(\u2267\u25E1\u2266)','\u2764','\u2728','>w<','(\u25E0\u25E1\u25E0)','~','\u2661','nyaa~'];
      uwu += ' ' + randomFrom(faces);
      result = uwu;
      break;
    }
    case 'leet-text-generator':
      result = text ? text.split('').map(c => leetMap[c] || c).join('') : 'Please enter some text above.';
      break;
    case 'random-text-generator': {
      const rWords = ['the','of','and','a','to','in','is','you','that','it','for','was','on','are','but','what','with','all','can','had','have','from','not','they','been','said','each','which','their','time','will','way','about','many','then','them','would','like','has','more','her','two','him','see','could','over','such','after','first','also','made','did','new','find','here','thing','give','most','us','just','only','come','its','very','into','year','day','some','than','now','look','use','other','people','know','good','call','take','get','make','go','long','back','big','high','old','well','still','small','home','hand','even','place','great','where','much','set','own','off','turn','real','leave','might','want'];
      result = Array.from({length: 5}, () => Array.from({length: 12 + Math.floor(Math.random() * 8)}, () => randomFrom(rWords)).join(' ') + '.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
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
      const gibWord = () => {
        const len = 3 + Math.floor(Math.random() * 6);
        return Array.from({length: len}, (_, i) => i % 2 === 0 ? gibConsonants[Math.floor(Math.random() * gibConsonants.length)] : gibVowels[Math.floor(Math.random() * gibVowels.length)]).join('');
      };
      result = Array.from({length: 5}, () => {
        const words = Array.from({length: 8 + Math.floor(Math.random() * 6)}, () => gibWord()).join(' ');
        return words.charAt(0).toUpperCase() + words.slice(1) + '.';
      }).join(' ');
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
    case 'street-name-generator':
      result = generateMultiple(() => `${Math.floor(Math.random() * 900) + 100} ${randomFrom(streetNames)} ${randomFrom(streetTypes)}`, 10);
      break;
    case 'book-club-name-generator': {
      const seed = compactSeed(text, 'Chapter');
      const core = seed.split(/\s+/)[0] || 'Chapter';
      const groups = [
        { title: 'Cozy', note: 'Warm names for relaxed reading groups.', items: [{ name: 'The Cozy ' + core + ' Club', reason: 'Soft and inviting.', extra: 'Best use: casual book club.' }, { name: core + ' & Tea', reason: 'Reading-night ritual.', extra: 'Best use: home group.' }, { name: 'Blankets and ' + core, reason: 'Comfort-first mood.', extra: 'Best use: cozy fiction club.' }] },
        { title: 'Literary', note: 'Classic reading-group names.', items: [{ name: 'The ' + core + ' Society', reason: 'Traditional and polished.', extra: 'Best use: literary club.' }, { name: core + ' Circle', reason: 'Discussion-focused.', extra: 'Best use: recurring meetup.' }, { name: 'The Marginalia Club', reason: 'Bookish and memorable.', extra: 'Best use: close readers.' }] },
        { title: 'Funny', note: 'Light names that stay friendly.', items: [{ name: 'Read It and Weep', reason: 'Playful reader joke.', extra: 'Best use: funny club.' }, { name: 'Booked for ' + core, reason: 'Simple pun.', extra: 'Best use: social group.' }, { name: 'The Plot Twisters', reason: 'Fun genre-neutral phrase.', extra: 'Best use: mixed reads.' }] },
        { title: 'Modern', note: 'Clean names for contemporary groups.', items: [{ name: core + ' Room', reason: 'Minimal and flexible.', extra: 'Best use: modern club.' }, { name: 'Next Page Collective', reason: 'Fresh group identity.', extra: 'Best use: online community.' }, { name: core + ' Notes', reason: 'Simple and discussion-ready.', extra: 'Best use: newsletter or club.' }] },
        { title: 'Local', note: 'Neighborhood and city-friendly names.', items: [{ name: core + ' Street Readers', reason: 'Easy local cue.', extra: 'Best use: neighborhood group.' }, { name: 'The Corner Book Club', reason: 'Approachable and place-based.', extra: 'Best use: library meetup.' }, { name: core + ' County Pages', reason: 'Regional feel.', extra: 'Best use: community club.' }] },
        { title: 'Premium', note: 'Polished names for curated communities.', items: [{ name: core + ' Literary Salon', reason: 'Refined discussion tone.', extra: 'Best use: premium club.' }, { name: 'The Reading Reserve', reason: 'Exclusive but clear.', extra: 'Best use: curated reads.' }, { name: core + ' Editions Club', reason: 'Collector-friendly.', extra: 'Best use: subscription club.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('book-club-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: book club names are creative suggestions only. Check local group, domain, and trademark conflicts before public use.');
      break;
    }
    case 'email-subject-generator': {
      const topic = compactSeed(text, 'product launch');
      const emailType = optionValue('email-type', 'newsletter');
      const tone = optionValue('subject-tone', 'balanced');

      const templates = {
        newsletter: {
          short: [`${topic} newsletter`, `the ${topic} briefing`, `weekly ${topic}`],
          balanced: [`This week in ${topic}`, `${topic} notes for your week`, `The latest updates on ${topic}`],
          professional: [`Official Newsletter: ${titleCase(topic)} Updates`, `The ${titleCase(topic)} Executive Briefing`, `Weekly Summary of ${titleCase(topic)} Trends`]
        },
        sales: {
          short: [`${topic} discount`, `${topic} offer`, `about ${topic}`],
          balanced: [`A practical option for ${topic}`, `See how ${topic} can help`, `Special offer on ${topic}`],
          professional: [`Enterprise Proposal: ${titleCase(topic)} Solutions`, `Introducing ${titleCase(topic)} Professional Services`, `${titleCase(topic)} Partnership Opportunities`]
        },
        'follow-up': {
          short: [`following up`, `re: ${topic}`, `quick check`],
          balanced: [`Following up on ${topic}`, `Quick note about ${topic}`, `Circling back with ${topic} details`],
          professional: [`Following Up on Our Discussion Regarding ${titleCase(topic)}`, `Update: ${titleCase(topic)} Inquiry Follow-up`, `Next Steps: ${titleCase(topic)} Consultation`]
        },
        announcement: {
          short: [`new ${topic}`, `${topic} is live`, `now launching`],
          balanced: [`Announcing our new ${topic}`, `${topic} is now available`, `Introducing the ${topic} project`],
          professional: [`Official Announcement: Launching ${titleCase(topic)}`, `Important Update: ${titleCase(topic)} System Launch`, `Notice: ${titleCase(topic)} Release Confirmation`]
        }
      };

      const typeKey = (templates[emailType] ? emailType : 'newsletter') as keyof typeof templates;
      const toneKey = (templates[typeKey][tone] ? tone : 'balanced') as keyof typeof templates['newsletter'];

      const primarySubjects = templates[typeKey][toneKey];

      const curiositySubjects = [
        `A different way to think about ${topic}`,
        `The ${topic} detail worth noticing`,
        `What changed my mind about ${topic}`
      ].map(s => tone === 'short' ? s.slice(0, 35) + '...' : s);

      const directSubjects = [
        `New update: ${topic}`,
        `${topic} details inside`,
        `Your guide to ${topic}`
      ].map(s => tone === 'short' ? s.slice(0, 35) + '...' : s);

      const groups = [
        {
          title: `Primary Subjects (${titleCase(typeKey)} / ${titleCase(toneKey)})`,
          note: 'Tailored email subject line ideas.',
          items: primarySubjects
        },
        {
          title: 'Curiosity Hooks',
          note: 'Inbox interest hooks without misleading clickbait.',
          items: curiositySubjects
        },
        {
          title: 'Direct/Informational',
          note: 'No-hype descriptive subject lines.',
          items: directSubjects
        }
      ];

      result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(groups, 'Spam-safety note: avoid fake RE/FWD prefixes, all-caps pressure, and promotional claims your email cannot support.');
      break;
    }
    case 'seo-title-generator': {
      const topic = compactSeed(text, 'your topic');
      const cap = titleCase(topic);
      const intentGroup = optionValue('seo-title-intent', 'all');
      const year = optionValue('seo-title-include-year', 'true') === 'true' ? ` ${new Date().getFullYear()}` : '';
      const allGroups = [
        { title: 'How-To', note: 'Instructional search intent.', items: [`How to Use ${cap} Without Overcomplicating It`, `How to Choose ${cap} for Better Results${year}`, `How to Get Started With ${cap}`] },
        { title: 'Best', note: 'Commercial or comparison intent.', items: [`Best ${cap} Options${year}`, `Best ${cap} Ideas for Practical Results`, `The Best Way to Approach ${cap}`] },
        { title: 'Review', note: 'Evaluation-focused title angle.', items: [`${cap} Review: What to Know Before You Start`, `${cap} Pros, Cons, and Practical Tips`, `Is ${cap} Worth It? A Clear Review`] },
        { title: 'Comparison', note: 'Versus and decision pages.', items: [`${cap} vs Alternatives: Which Fits Best?`, `${cap} Compared: Features, Uses, and Tradeoffs`, `${cap} or Another Option? How to Decide`] },
        { title: 'Listicle', note: 'Scannable roundup format.', items: [`11 ${cap} Tips That Actually Help`, `9 ${cap} Ideas You Can Use Today`, `7 Common ${cap} Mistakes to Avoid`] },
        { title: 'Brand', note: 'Homepage or brand-led pages.', items: [`${cap} Made Clear and Useful`, `${cap} Resources for Smarter Decisions`, `${cap} Tools, Tips, and Practical Guides`] }];
      const groups = intentGroup === 'all' ? allGroups : allGroups.filter(group => group.title.toLowerCase().replace(/[^a-z]+/g, '-') === intentGroup);
      result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(groups, 'SEO length note: aim for clear titles that usually fit around 50-60 characters, but prioritize accuracy over forcing a number.');
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
      if (!text) { result = 'Please enter your topic above.'; break; }
      const groups = buildPinterestKeywordSuite(text, optionValue);
      result = reasonedText(groups);
      resultHtml = renderReasonedTagGroups(groups, 'Pinterest keywords: match the pin image, title, board, description, and destination page. Independent draft only; no Pinterest affiliation and no traffic, ranking, saves, clicks, sales, or visibility guarantee.');
      break;
    }
    case 'soundcloud-tag-generator': {
      if (!text) { result = 'Please enter your track, beat, or mix details above.'; break; }
      const groups = buildSoundCloudTagSuite(text, optionValue);
      result = reasonedText(groups);
      resultHtml = renderReasonedTagGroups(groups, 'SoundCloud tags: keep genre, mood, instrument, vocal, and release-context tags truthful. Independent draft only; no SoundCloud affiliation and no plays, discovery, ranking, repost, follower, playlist, monetization, or engagement guarantee.');
      break;
    }
    case 'error-message-generator':
    {
      const scenario = text || 'payment could not be completed';
      const severity = optionValue('error-severity', 'warning');
      const tone = optionValue('error-tone', 'friendly');
      const code = `APP-${severity.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const userMsg = tone === 'direct' ? `We could not complete ${scenario}. Please try again.` : `Something stopped ${scenario}. Please try again in a moment.`;
      const logLine = `${new Date().toISOString()} level=${severity} code=${code} scenario="${scenario.replace(/"/g, '')}" action="retry_or_contact_support"`;
      const support = `User saw ${code} while trying to complete: ${scenario}. Ask what they were doing, confirm no sensitive details are shared, and escalate with the timestamp if it repeats.`;
      const recovery = optionValue('error-action', 'retry') === 'contact' ? 'Contact support with the error code if this continues.' : 'Try again. If it repeats, contact support with the error code.';
      const checklist = '- Do not expose stack traces, tokens, or personal data in user-facing copy.\n- Keep the recovery action specific.\n- Log enough context for developers without collecting secrets.';
      result = `User Message\n${userMsg}\n\nDeveloper Log Line\n${logLine}\n\nSupport Note\n${support}\n\nRecovery CTA\n${recovery}\n\nError Code\n${code}\n\nQA Checklist\n${checklist}`;
      resultHtml = renderSectionSuite('Error Message Package', [
        { title: 'User Message', body: userMsg, note: `${tone} tone, ${severity} severity` },
        { title: 'Developer Log Line', body: logLine, note: 'Avoid secrets and personal data' },
        { title: 'Support Note', body: support, note: 'Support-safe context' },
        { title: 'Recovery CTA', body: recovery, note: 'Next action' },
        { title: 'Error Code', body: code, note: 'Copyable reference' },
        { title: 'QA Checklist', body: checklist, note: 'Safe error copy review' }], 'Generated copy separates user, developer, and support audiences.');
      break;
    }
    case 'cipher-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const cipher = optionValue('cipher-type', 'caesar');
      const mode = optionValue('cipher-mode', 'encode');
      const shift = cipher === 'rot13' ? 13 : clampNumber(optionValue('cipher-shift', '3'), 3, 1, 25);
      const caesar = (value: string, amount: number) => value.replace(/[a-zA-Z]/g, c => { const base = c <= 'Z' ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - base + amount + 26) % 26 + base); });
      const atbash = (value: string) => value.replace(/[a-zA-Z]/g, c => { const base = c <= 'Z' ? 65 : 97; return String.fromCharCode(base + 25 - (c.charCodeAt(0) - base)); });
      const amount = mode === 'decode' ? -shift : shift;
      const cipherText = cipher === 'atbash' ? atbash(text) : caesar(text, amount);
      const preview = cipher === 'atbash' ? atbash(cipherText) : caesar(cipherText, -amount);
      const mapping = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(ch => `${ch}->${cipher === 'atbash' ? atbash(ch) : caesar(ch, amount)}`).join(' ');
      const keySummary = `Cipher: ${cipher}\nMode: ${mode}\nShift/key: ${cipher === 'atbash' ? 'reversed alphabet' : shift}\nSpaces and punctuation: preserved`;
      result = `Cipher Result\n${cipherText}\n\nDecode Preview\n${preview}\n\nMapping Table\n${mapping}\n\nKey Summary\n${keySummary}\n\nEducational Note\nClassic ciphers are for puzzles and learning, not secure encryption.`;
      resultHtml = renderSectionSuite('Classic Cipher Result', [
        { title: 'Cipher Text', body: cipherText, note: `${cipher} ${mode}` },
        { title: 'Decode Preview', body: preview, note: 'Round-trip check' },
        { title: 'Mapping Table', body: mapping, note: 'Alphabet mapping' },
        { title: 'Key Summary', body: keySummary, note: 'Copy key settings' },
        { title: 'Educational Note', body: 'Classic ciphers are for puzzles and learning, not secure encryption.', note: 'No security claim' }]);
      break;
    }
    case 'repeat-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const count = clampNumber(optionValue('repeat-count', '10'), 10, 1, 200);
      const separatorMode = optionValue('repeat-separator', 'space');
      const sep = separatorMode === 'line' ? '\n' : separatorMode === 'comma' ? ', ' : separatorMode === 'none' ? '' : ' ';
      const numbered = Array.from({ length: count }, (_, i) => `${i + 1}. ${text}`).join('\n');
      const repeated = Array.from({ length: count }, () => text).join(sep);
      const compact = Array.from({ length: count }, () => text).join('');
      const metrics = `Repeat count: ${count}\nSeparator: ${separatorMode}\nCharacters: ${repeated.length}\nLarge output warning: ${repeated.length > 10000 ? 'yes, consider reducing the count' : 'no'}`;
      result = `Repeated Output\n${repeated}\n\nNumbered Version\n${numbered}\n\nCompact Version\n${compact}\n\nSettings Summary\n${metrics}`;
      resultHtml = renderSectionSuite('Repeated Text Output', [
        { title: 'Repeated Output', body: repeated, note: `${count} repeats` },
        { title: 'Numbered Version', body: numbered, note: 'Line mode with numbering' },
        { title: 'Compact Version', body: compact, note: 'No separator variant' },
        { title: 'Settings Summary', body: metrics, note: 'Length guard' }]);
      break;
    }
    case 'magic-name-generator': {
      const mPre = ['Ael','Myr','Thal','Zan','Eld','Cel','Nym','Aur','Lyr','Sar'];
      const mSuf = ['andria','istia','owyn','aria','iel','wyn','ith','ora','una','ella'];
      result = generateMultiple(() => `${randomFrom(mPre)}${randomFrom(mSuf)} the ${randomFrom(['Enchanted','Arcane','Mystic','Eternal','Celestial','Shadowed','Illuminated','Blessed','Ancient','Radiant'])}`, 10);
      break;
    }
    case 'angel-name-generator': {
      const aPre = ['Seraphi','Celesti','Auri','Radi','Lumini','Ethere','Divini','Glori','Celsi','Sancti'];
      const aSuf = ['el','ael','iel','ael','uel','iel','ael','iel','ael','iel'];
      result = generateMultiple(() => `${randomFrom(aPre)}${randomFrom(aSuf)}`, 10);
      break;
    }
    case 'tavern-name-generator': {
      const tavAdj = ['The Rusty','The Golden','The Drunken','The Prancing','The Sleeping','The Laughing','The Broken','The Silver','The Black','The Red'];
      const tavNoun = ['Dragon','Pony','Giant','Griffin','Barrel','Sword','Mug','Goose','Stag','Lion','Bear','Fox','Crow','Bull','Serpent'];
      result = generateMultiple(() => `${randomFrom(tavAdj)} ${randomFrom(tavNoun)}`, 10);
      break;
    }
    case 'dungeon-name-generator': {
      const dunAdj = ['The Forsaken','The Cursed','The Endless','The Shadow','The Burning','The Frozen','The Lost','The Dark','The Abyssal','The Haunted'];
      const dunNoun = ['Crypt','Caverns','Labyrinth','Depths','Mines','Pit','Catacombs','Ruins','Tomb','Dungeon','Lair','Vault','Sanctum','Abyss','Keep'];
      result = generateMultiple(() => `${randomFrom(dunAdj)} ${randomFrom(dunNoun)}`, 10);
      break;
    }
    case 'cat-name-generator': {
      const catNames = ['Luna','Milo','Oliver','Bella','Leo','Charlie','Simba','Nala','Cleo','Oreo','Shadow','Whiskers','Mittens','Ginger','Felix','Jasper','Willow','Coco','Smokey','Salem','Pepper','Dusty','Patches','Tiger','Misty'];
      const shuffled = [...catNames].sort(() => Math.random() - 0.5);
      result = shuffled.slice(0, 12).map(n => `\uD83D\uDC31 ${n}`).join('\n');
      break;
    }
    case 'horse-name-generator': {
      const horseAdj = ['Midnight','Golden','Silver','Thunder','Storm','Wild','Royal','Shadow','Swift','Noble'];
      const horseNoun = ['Lightning','Arrow','Spirit','Star','Blaze','Dancer','Runner','Wind','Dream','Fire'];
      result = generateMultiple(() => `${randomFrom(horseAdj)} ${randomFrom(horseNoun)}`, 12);
      break;
    }
    case 'twitter-name-generator': case 'snapchat-name-generator': {
      const kw = text || 'cool';
      const cap = kw.charAt(0).toUpperCase() + kw.slice(1);
      const sPre = ['the','real','its','not','just','hey','so'];
      const sSuf = ['daily','vibes','hq','world','official','zone','hub'];
      result = generateMultiple(() => {
        const s = Math.floor(Math.random() * 4);
        if (s === 0) return `${randomFrom(sPre)}_${kw.toLowerCase()}`;
        if (s === 1) return `${cap}${randomFrom(sSuf)}`;
        if (s === 2) return `${randomFrom(sPre)}${cap}${Math.floor(Math.random() * 99)}`;
        return `${kw.toLowerCase()}.${randomFrom(sSuf)}`;
      }, 12);
      break;
    }
    case 'linkedin-headline-generator': {
      const role = compactSeed(text, 'Product Marketing Manager');
      const lower = role.toLowerCase();
      const groups = [
        { title: 'Professional', note: 'Clear role-first headline.', items: [
          role + ' | Strategy, execution, and clear communication',
          role + ' helping teams turn ideas into useful outcomes',
          role + ' focused on practical systems and measurable work'] },
        { title: 'Founder', note: 'For real founders and builders only.', items: [
          'Founder working on ' + lower + ' | Building useful systems for focused teams',
          'Building in ' + lower + ' | Product, customers, and practical execution',
          'Founder | ' + role + ' | Turning specific problems into useful products'] },
        { title: 'Freelancer', note: 'Service-focused positioning.', items: [
          role + ' for growing teams | Clear strategy and dependable execution',
          'Freelance ' + role + ' helping clients clarify, launch, and improve',
          role + ' consultant | Practical support for focused projects'] },
        { title: 'Job Seeker', note: 'No fake credentials; add only real skills.', items: [
          role + ' | Open to roles in [industry] | [real skill] + [real skill]',
          role + ' seeking teams that value clarity, ownership, and useful work',
          role + ' | [real tool/skill] | [real industry interest]'] },
        { title: 'Expert', note: 'Use only if your background supports it.', items: [
          role + ' specializing in [real specialty] and [real outcome]',
          role + ' | Helping teams improve [real process] with clearer decisions',
          role + ' with experience in [real industry], [real skill], and [real result]'] },
        { title: 'Keyword-Rich', note: 'Search-friendly without keyword stuffing.', items: [
          role + ' | ' + titleCase(lower) + ' Strategy | Growth, Operations, Communication',
          role + ' | Product, Marketing, Analytics, and Team Execution',
          role + ' | B2B, SaaS, Content, and Go-to-Market Support'] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('linkedin-headline-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Use only truthful roles, skills, credentials, and outcomes. Replace bracketed fields with real details.');
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

      const allSlogans = {
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

      const toneKey = (allSlogans[tone] ? tone : 'balanced') as 'balanced' | 'premium' | 'playful' | 'direct';
      const useKey = (allSlogans[toneKey][useCase] ? useCase : 'brand') as 'brand' | 'campaign' | 'product';

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
      const wifiNames = ['Pretty Fly for a Wi-Fi','Tell My WiFi Love Her','Drop It Like Its Hotspot','The LAN Before Time','Wi-Fi So Serious?','Nacho WiFi','FBI Surveillance Van','Loading...','404 Network Not Found','It Hurts When IP','Abraham Linksys','Bill Wi The Science Fi','Keep It On The Download','No More Mr. Wi-Fi','Lord of the Pings','The Promised LAN','New England Clam Router','Router? I Hardly Know Her','Silence of the LANs','Wu Tang LAN'];
      const shuffled = [...wifiNames].sort(() => Math.random() - 0.5);
      result = shuffled.slice(0, 12).map(n => `\uD83D\uDCF6 ${n}`).join('\n');
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
      const ppWords = ['correct','horse','battery','staple','purple','monkey','dolphin','sunset','crystal','thunder','garden','silver','quantum','cosmic','phantom','velvet','emerald','granite','harbor','meadow','orchid','pepper','summit','timber','voyage','walrus','zenith','blazer','cipher','dragon'];
      result = generateMultiple(() => {
        const count = 4 + Math.floor(Math.random() * 3);
        const words = Array.from({length: count}, () => randomFrom(ppWords));
        const phrase = words.join('-');
        const entropy = Math.floor(count * Math.log2(ppWords.length));
        return `${phrase}  (${entropy}-bit entropy)`;
      }, 8);
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
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const hex = '0123456789abcdef';
      const genKey = (len: number, pool: string) => Array.from({length: len}, () => pool[Math.floor(Math.random() * pool.length)]).join('');
      result = [
        `API Key (32): ${genKey(32, chars)}`,
        `API Key (48): ${genKey(48, chars)}`,
        `Secret Key (64): ${genKey(64, chars)}`,
        `Hex Token (32): ${genKey(32, hex)}`,
        `Hex Token (64): ${genKey(64, hex)}`,
        `Bearer Token: ${genKey(40, chars)}`].join('\n');
      break;
    }
    case 'privacy-policy-generator': {
      const site = compactSeed(text, 'YourWebsite.com');
      const businessType = optionValue('privacy-business-type', 'website');
      const region = optionValue('privacy-region', 'us');
      const dataScope = optionValue('privacy-data-scope', 'contact-only');
      const usesCookies = optionValue('policy-cookies', 'true') === 'true';
      const usesAnalytics = optionValue('policy-analytics', 'true') === 'true';
      const usesAds = optionValue('policy-ads', 'false') === 'true';
      const childrenReview = optionValue('privacy-children', 'false') === 'true';

      const contactDomain = site.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/[^a-z0-9.-]/g, '');

      const regionTitles: Record<string, string> = {
        us: 'United States (CCPA/CPRA, HIPAA notes where applicable)',
        'uk-eu': 'United Kingdom / European Union (GDPR compliance)',
        canada: 'Canada (PIPEDA notice standards)',
        australia: 'Australia (Privacy Act compliance)',
        global: 'Global / Multi-region context'
      };

      const sections = [
        { title: 'Important Disclaimer', body: 'This privacy policy is a draft template only and is not legal advice. Have a qualified professional review it for your jurisdiction, business model, and actual data practices.', note: 'Visible legal safety note.' },
        { title: 'Overview', body: `${site} operates this ${businessType.replace(/-/g, ' ')}. This draft explains what information may be collected, how it may be used, and how users can contact you about privacy questions. Built for compliance in ${regionTitles[region] || regionTitles.us}.`, note: 'Opening section.' },
        { title: 'Data Scope and Collection', body: `We collect information relevant to our operations, specifically in the scope of: ${dataScope.replace(/-/g, ' ')}.\n- User-Provided Data: Information you enter into form fields, contact logs, or profiles.\n- Automatic technical records: browser, IP address, page views, and interactions.`, note: 'Matches data collection scope.' },
        { title: 'How Information May Be Used', body: 'To provide and improve the service.\nTo respond to messages and support requests.\nTo process orders, accounts, or requested features when applicable.\nTo monitor security, prevent abuse, and understand site performance.', note: 'Keep only uses that apply.' },
        ...(usesCookies ? [{ title: 'Cookies and Tracking', body: `This ${businessType.replace(/-/g, ' ')} may use cookies or similar technologies for essential functionality${usesAnalytics ? ', analytics' : ''}${usesAds ? ', advertising and marketing' : ''}, and user preferences. Users can manage cookies through browser settings.`, note: 'Cookie wording enabled by option.' }] : []),
        { title: 'Third-Party Services', body: 'Third-party providers may process information on your behalf, such as hosting, analytics, payment, email, advertising, or customer support services. List the real providers you use.', note: 'Do not invent vendors.' },
        { title: 'User Rights and Choices', body: region === 'uk-eu'
          ? 'Under the GDPR, EU/UK users have rights to access, rectification, erasure (the "right to be forgotten"), data portability, restriction of processing, and to object to processing. Contact us to execute these rights.'
          : 'Users can contact us to request access, correction, or deletion of their personal data in accordance with local regulations.', note: 'Jurisdiction-specific review needed.' },
        ...(childrenReview ? [{ title: 'Children & Minors Protection', body: `We do not knowingly collect personal data from children under the age of 13. If you believe we have collected such data, please contact us immediately to have it deleted.`, note: 'COPPA compliance note enabled.' }] : []),
        { title: 'Contact', body: `Privacy questions can be sent to privacy@${contactDomain || 'example.com'}. Replace this with your real privacy contact method.`, note: 'Use a real contact address.' }
      ];

      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Privacy Policy Draft', sections, 'Template only, not legal advice. Update every placeholder and verify with a qualified professional before publishing.');
      break;
    }
    case 'terms-generator': {
      const site = compactSeed(text, 'YourWebsite.com');
      const mode = optionValue('terms-mode', 'general');
      const region = optionValue('terms-region', 'us');
      const businessModel = optionValue('terms-business-model', 'informational');
      const includesAccounts = optionValue('terms-accounts', 'true') === 'true';
      const includesPayments = optionValue('terms-payments', 'false') === 'true';
      const includesUserContent = optionValue('terms-user-content', 'false') === 'true';
      const includesAcceptableUse = optionValue('terms-acceptable-use', 'true') === 'true';

      const contactDomain = site.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/[^a-z0-9.-]/g, '');

      const regionJurisdiction: Record<string, string> = {
        us: 'the State of Delaware, United States',
        'uk-eu': 'the United Kingdom and the European Union consumer protection framework',
        canada: 'the Province of Ontario, Canada',
        australia: 'the State of New South Wales, Australia',
        global: 'our main administrative jurisdiction'
      };

      const sections = [
        { title: 'Important Disclaimer', body: 'These terms are a draft template only and are not legal advice. Have a qualified professional review them for your jurisdiction, products, services, and risk profile.', note: 'Visible legal safety note.' },
        { title: 'Acceptance of Terms', body: `By accessing or using ${site}, you agree to follow these ${mode} terms of service. If you do not agree to these terms, you should not access or use our services. Built for operation under the laws of ${regionJurisdiction[region] || regionJurisdiction.us}.`, note: 'Opening terms section.' },
        { title: 'Business Model and Services', body: `Our service model is primarily structured around: ${businessModel.replace(/-/g, ' ')}. Any digital products, physical goods, or paid services are subject to billing terms defined at the time of transaction.`, note: 'Matches selected business model.' },
        ...(includesAcceptableUse ? [{ title: 'Acceptable Use Policy', body: 'Users agree not to misuse, disrupt, reverse engineer, scrape, or attempt unauthorized access to the service. Any automated scraping or user-system abuse is strictly prohibited.', note: 'Acceptable use rules enabled.' }] : []),
        ...(includesAccounts ? [{ title: 'User Accounts', body: 'Users are responsible for keeping account information accurate and login credentials secure. Users should notify us immediately if they suspect unauthorized account access. Accounts are for individual use only.', note: 'Account option enabled.' }] : []),
        ...(includesUserContent ? [{ title: 'User-Generated Content License', body: 'Users retain ownership of content they submit, but grant us a worldwide, non-exclusive, royalty-free, transferable license to store, host, display, and distribute user content to operate our service.', note: 'User content licensing rules enabled.' }] : []),
        ...(includesPayments ? [{ title: 'Payments, Subscriptions and Refunds', body: 'Prices, billing cycles, renewals, and cancellation rules are specified at checkout. Unless stated otherwise, all fees are non-refundable. We reserve the right to modify pricing with advance notice.', note: 'Payment terms enabled.' }] : []),
        { title: 'Content and Intellectual Property', body: `${site} and its owners retain rights to site content, branding, design, and software unless otherwise stated. Users retain rights to content they submit, subject to permissions needed to operate the service.`, note: 'Adapt for your real rights model.' },
        { title: 'Disclaimers and Limitation of Liability', body: 'The service is provided as available. To the fullest extent allowed by applicable law, disclaim warranties and limit liability in a way that is valid for your jurisdiction.', note: 'Requires legal review.' },
        { title: 'Termination', body: 'Access may be suspended or terminated for misuse, unlawful activity, or violation of these terms. Explain any appeal or data access process if applicable.', note: 'Policy process.' },
        { title: 'Contact Information', body: `Questions about these terms can be sent to legal@${contactDomain || 'example.com'}. Replace this with your real legal contact method.`, note: 'Use a real contact address.' }
      ];

      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Terms Draft', sections, 'Template only, not legal advice. Replace placeholders and verify with a qualified professional before publishing.');
      break;
    }
    case 'cookie-policy-generator': {
      const site = compactSeed(text, 'YourWebsite.com');
      const stack = optionValue('cookie-stack', 'analytics');
      const region = optionValue('cookie-region', 'us');
      const control = optionValue('cookie-control', 'cookie-banner');
      const includesThirdParties = optionValue('cookie-third-parties', 'true') === 'true';
      const includesConsentReview = optionValue('cookie-consent-review', 'true') === 'true';

      const contactDomain = site.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/[^a-z0-9.-]/g, '');

      const regionNotice: Record<string, string> = {
        us: 'Complies with US state disclosures regarding tracking technologies.',
        'uk-eu': 'Structured around GDPR and ePrivacy Directive requirements (consent required before non-essential cookies).',
        canada: 'Matches PIPEDA standards for digital tracking consent.',
        australia: 'Conforms to Australian Privacy Act guidelines on tracking.',
        global: 'Follows multi-jurisdiction disclosures for cookies.'
      };

      const sections = [
        { title: 'Important Disclaimer', body: 'This cookie policy is an informational draft template only and is not legal advice. Have a qualified professional review it against your actual trackers and regional laws.', note: 'Visible legal safety note.' },
        { title: 'Cookie Policy Overview', body: `${site} uses cookies and similar tracking technologies to improve user experience, analyze performance, and serve relevant content. Built for ${regionNotice[region] || regionNotice.us}`, note: 'Overview notice.' },
        { title: 'Cookie Stack Configuration', body: `We employ the following category stack: ${stack.replace(/-/g, ' ')}.\n- Essential: Always active for site operations.\n- Non-essential: Analytics, marketing, or customization cookies depending on stack selection.`, note: 'Tailored stack disclosure.' },
        { title: 'How We Manage Consent', body: `Users can control tracking preferences via: ${control.replace(/-/g, ' ')}. Please note that disabling cookies may affect certain features of the service.`, note: 'User controls method.' },
        ...(includesThirdParties ? [{ title: 'Third-Party Trackers', body: 'Some cookies are placed by third-party services that appear on our pages. We do not control these third parties; please check their respective privacy policies for details.', note: 'Third-party warning.' }] : []),
        ...(includesConsentReview ? [{ title: 'Consent Verification Guidelines', body: 'Confirm you have verified: actual cookie names, expiration times, specific vendors (e.g. Google Analytics), opt-out mechanisms, and your active consent banners.', note: 'Operational recommendation.' }] : []),
        { title: 'Contact', body: `For any cookie or privacy inquiries, contact privacy@${contactDomain || 'example.com'}.`, note: 'Real email destination.' }
      ];

      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Cookie Policy Draft Suite', sections, 'Informational template only. Adapt to your actual cookie audit and regional laws before publishing.');
      break;
    }
    case 'disclaimer-generator': {
      const site = compactSeed(text, 'YourWebsite.com');
      const contentType = optionValue('disclaimer-content-type', 'general-site');
      const region = optionValue('disclaimer-region', 'us');
      const risk = optionValue('disclaimer-risk', 'medium');
      const includesExternal = optionValue('disclaimer-external-links', 'true') === 'true';
      const includesAffiliates = optionValue('disclaimer-affiliates', 'false') === 'true';
      const noProfessionalAdvice = optionValue('disclaimer-no-professional-advice', 'true') === 'true';

      const contactDomain = site.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/[^a-z0-9.-]/g, '');

      const regionJurisdiction: Record<string, string> = {
        us: 'the laws of the United States',
        'uk-eu': 'the consumer laws of the United Kingdom and the European Union',
        canada: 'the laws of Canada',
        australia: 'the laws of Australia',
        global: 'international laws and regulations'
      };

      const sections = [
        { title: 'Important Disclaimer', body: 'This disclaimer is a template draft only and is not professional or legal advice. Have a qualified professional review it for your specific content, products, and liabilities.', note: 'Visible legal safety note.' },
        { title: 'General Information Disclaimer', body: `All information on ${site} is provided in good faith and for general informational purposes only. We make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.`, note: 'Basic disclaimer statement.' },
        { title: 'Content Context', body: `This site publishes content of type: ${contentType.replace(/-/g, ' ')}. It operates under ${regionJurisdiction[region] || regionJurisdiction.us}. Target sensitivity level: ${risk}.`, note: 'Tailored content context.' },
        ...(noProfessionalAdvice ? [{ title: 'No Professional Advice', body: `The site cannot and does not contain professional advice (including but not limited to medical, fitness, legal, financial, or tax matters). The use or reliance of any information contained on this site is solely at your own risk. Always consult with a qualified professional before taking action.`, note: 'Professional advice warning.' }] : []),
        ...(includesExternal ? [{ title: 'External Links Disclaimer', body: 'The site may contain links to third-party websites or content. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.', note: 'External links protection.' }] : []),
        ...(includesAffiliates ? [{ title: 'Affiliate & Sponsor Disclosure', body: 'The site may contain links to affiliate websites, and we may receive an affiliate commission for any purchases made by you on the affiliate website using such links. We are a participant in advertising programs designed to provide a means for us to earn advertising fees.', note: 'Affiliate disclosure note.' }] : []),
        { title: 'Contact', body: `For questions about this disclaimer, contact legal@${contactDomain || 'example.com'}.`, note: 'Real legal contact.' }
      ];

      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Disclaimer Draft Suite', sections, 'Informational template only. Update placeholders and verify with a qualified professional before publishing.');
      break;
    }
    case 'open-graph-generator': {
      const rawUrl = compactSeed(text, 'https://example.com/page');
      const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
      const title = rawUrl.startsWith('http') ? 'Your Page Title' : titleCase(rawUrl);
      const description = `A clear social sharing description for ${title}.`;
      const siteName = optionValue('og-site-name', 'Your Site');
      const type = optionValue('og-type', 'website');
      const imagePreset = optionValue('og-image', 'default');
      const image = `${url.replace(/\/$/, '')}/${imagePreset === 'default' ? 'og-image' : imagePreset + '-image'}.jpg`;
      const tags = `<meta property="og:title" content="${escapeHtml(title)}">\n<meta property="og:description" content="${escapeHtml(description)}">\n<meta property="og:type" content="${escapeHtml(type)}">\n<meta property="og:url" content="${escapeHtml(url)}">\n<meta property="og:image" content="${escapeHtml(image)}">\n<meta property="og:site_name" content="${escapeHtml(siteName)}">\n<meta property="og:locale" content="en_US">`;
      const sections = [
        { title: 'Open Graph HTML Tags', body: tags, note: 'Place these in the HTML head.' },
        { title: 'Preview Data', body: `Title: ${title}\nDescription: ${description}\nURL: ${url}\nImage: ${image}\nSite: ${siteName}\nType: ${type}`, note: 'Data used in the preview card.' }];
      result = tags;
      resultHtml = `<div class="social-preview-card"><div class="social-preview-image">${escapeHtml(siteName)}</div><div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(description)}</p><span>${escapeHtml(url.replace(/^https?:\/\//, ''))}</span></div></div>` + renderSectionSuite('Open Graph Tags', sections, 'Preview note: social platforms may cache tags. Validate and refresh previews in each platform tool before launch.');
      break;
    }
    case 'twitter-card-generator': {
      const rawUrl = compactSeed(text, 'https://example.com/page');
      const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
      const card = optionValue('twitter-card-type', 'summary_large_image');
      const title = rawUrl.startsWith('http') ? 'Your Page Title' : titleCase(rawUrl);
      const description = `A truthful social preview description for ${title}.`;
      const imagePreset = optionValue('twitter-image', 'default');
      const image = `${url.replace(/\/$/, '')}/${imagePreset === 'default' ? 'twitter-image' : imagePreset + '-twitter-image'}.jpg`;
      const imageAlt = `Preview image for ${title}`;
      const siteHandle = optionValue('twitter-site', '@yourhandle').replace(/^([^@])/, '@$1');
      const creatorHandle = optionValue('twitter-creator', siteHandle).replace(/^([^@])/, '@$1');
      const tags = `<meta name="twitter:card" content="${escapeHtml(card)}">\n<meta name="twitter:site" content="${escapeHtml(siteHandle)}">\n<meta name="twitter:creator" content="${escapeHtml(creatorHandle)}">\n<meta name="twitter:title" content="${escapeHtml(title)}">\n<meta name="twitter:description" content="${escapeHtml(description)}">\n<meta name="twitter:image" content="${escapeHtml(image)}">\n<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}">`;
      const sections = [
        { title: 'Twitter/X Card HTML Tags', body: tags, note: `Independent metadata draft in ${card} mode; not an official platform integration.` },
        { title: 'Field Guidance', body: `Title: Use the real page title or a close truthful summary.\nDescription: Summarize the page accurately without clickbait or unsupported claims.\nImage: Use a rights-cleared image that is publicly reachable.\nImage alt: Describe the image for accessibility.\nURL: Publish these tags on the canonical live URL.\nHandles: Use only accounts you control or are authorized to reference.`, note: 'Review each field before publishing.' },
        { title: 'Preview Data', body: `Title: ${title}\nDescription: ${description}\nURL: ${url}\nImage: ${image}\nImage alt: ${imageAlt}\nSite: ${siteHandle}\nCreator: ${creatorHandle}`, note: 'Use truthful metadata that matches the destination page.' },
        { title: 'Cache and Limitations', body: 'Social platforms may cache previews, ignore fields, resize images, change card behavior, or apply their own account and content rules. Refresh or re-test the live URL in the target platform tools when available.', note: 'No rendering guarantee.' },
        { title: 'Safety Note', body: 'Drafting help only. No affiliation, endorsement, platform approval, ranking, reach, click-through, engagement, ad performance, or guaranteed preview rendering is claimed.', note: 'Required safe framing.' }];
      result = tags;
      resultHtml = `<div class="social-preview-card social-preview-x"><div class="social-preview-image">${card === 'summary' ? 'Card' : 'Image'}</div><div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(description)}</p><span>${escapeHtml(siteHandle)} | ${escapeHtml(url.replace(/^https?:\/\//, ''))}</span></div></div>` + renderSectionSuite('Twitter/X Card Tags', sections, 'Preview note: this is an independent metadata draft. Platforms may cache, alter, or ignore preview fields; test the live URL before publishing.');
      break;
    }
    case 'youtube-description-generator': {
      const topic = (text || 'tutorial').trim();
      const tagBase = toSafeHandle(topic, 'video');
      const videoStyle = optionValue('video-style', 'tutorial');
      const includeTimestamps = optionValue('include-timestamps', 'true') === 'true';
      const sections = [
        { title: 'Hook', body: `In this ${videoStyle} video, we break down ${topic} in a clear, practical way so viewers know what to do next.`, note: 'First 1-2 lines before the fold' },
        { title: 'Video Summary', body: `This ${videoStyle} covers the core ideas behind ${topic}, common mistakes to avoid, and practical steps viewers can use right away.`, note: 'Quick context for viewers and search' },
        { title: 'Key Points', body: `- What ${topic} means and why it matters\n- The simplest way to get started\n- Practical examples to watch for\n- Mistakes that slow people down\n- Next steps after watching`, note: 'Scannable value bullets' },
        ...(includeTimestamps ? [{ title: 'Timestamps Placeholder', body: `0:00 Intro\n0:45 Why ${topic} matters\n2:10 Step 1 or key idea\n4:30 Common mistakes\n6:45 Practical example\n8:30 Recap and next steps`, note: 'Replace with real timestamps before publishing' }] : []),
        { title: 'Links Placeholder', body: `Resources: [add link]\nRelated video: [add link]\nWebsite or newsletter: [add link]\nContact or social: [add link]`, note: 'No fake links generated' },
        { title: 'Subscribe CTA', body: `If this helped, subscribe for more practical videos about ${topic} and related topics.`, note: 'Soft creator CTA' },
        { title: 'Hashtags', body: `#${tagBase} #${tagBase}tips #howto`, note: 'Keep the hashtag block focused' },
        { title: 'Disclaimer Area', body: `Disclaimer: This video is for general information and personal learning. Verify details for your own situation before acting.`, note: 'Use when the topic needs context' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('YouTube Description Structure', sections, 'Edit placeholders before publishing. Do not claim fake links, chapters, sponsors, or results.');
      break;
    }
    case 'tiktok-caption-generator': {
      const topic = compactSeed(text, 'creator video');
      const lower = topic.toLowerCase();
      const tag = '#' + toSafeHandle(topic, 'video');
      const videoType = optionValue('tiktok-video-type', 'educational');
      const ctaStyle = optionValue('tiktok-cta', 'save');
      const groups = [
        { title: 'Hook-First Captions', text: `POV: ${lower} finally makes sense.\nWait until you see the simple version of ${lower}.`, note: `Video type: ${videoType}` },
        { title: 'Funny Captions', text: `Me pretending ${lower} was always this easy.\nWhen ${lower} starts making sense at the worst possible time.`, note: 'Light and relatable' },
        { title: 'Viral-Style Captions', text: `This changed how I think about ${lower}.\nThe ${lower} tip I wish I knew earlier.`, note: 'No guaranteed virality claims' },
        { title: 'Creator Captions', text: `Behind the scenes of ${lower}: one useful lesson and one thing I would do differently.`, note: 'For creator updates' },
        { title: 'Product Captions', text: `${topic} for people who want the shortcut without the noise.`, note: 'Safe product-friendly wording' },
        { title: 'CTA Captions', text: ctaStyle === 'direct' ? `Try this on your next ${lower} video.\nFollow for more practical ${lower} notes.` : `Save this for your next ${lower} idea.\nFollow for more practical ${lower} notes.`, note: `CTA style: ${ctaStyle}` },
        { title: 'Safe Hashtag Suggestions', text: `${tag} ${tag}tips #creatornotes #learnontiktok #practicaltips`, note: 'Focused hashtag set' }];
      result = groups.map(group => group.title + '\n' + group.text).join('\n\n');
      resultHtml = renderBioVariations(groups);
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
      const colors = ['#2563eb','#0f766e','#7c3aed','#be123c','#334155'];
      const c = randomFrom(colors);
      const radius = optionValue('button-radius', '8');
      const size = optionValue('button-size', 'medium');
      const gradient = optionValue('button-gradient', 'true') === 'true';
      const padding = size === 'large' ? '14px 28px' : size === 'small' ? '9px 16px' : '12px 22px';
      const fontSize = size === 'large' ? '17px' : size === 'small' ? '14px' : '16px';
      const background = gradient ? `linear-gradient(135deg, ${c}, #111827)` : c;
      const css = `.premium-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: ${padding};\n  border: 0;\n  border-radius: ${radius}px;\n  background: ${background};\n  color: #ffffff;\n  font-size: ${fontSize};\n  font-weight: 700;\n  line-height: 1;\n  cursor: pointer;\n  box-shadow: 0 10px 24px ${c}40;\n  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;\n}\n\n.premium-button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 14px 30px ${c}55;\n  filter: brightness(1.05);\n}\n\n.premium-button:focus-visible {\n  outline: 3px solid ${c}55;\n  outline-offset: 3px;\n}`;
      const htmlSnippet = `<button class="premium-button">${label}</button>`;
      const previewStyle = `display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:${padding};border:0;border-radius:${radius}px;background:${background};color:#fff;font-size:${fontSize};font-weight:700;line-height:1;box-shadow:0 10px 24px ${c}40;`;
      const variants = [
        { name: 'Small', cssClass: `.premium-button--small { padding: 9px 16px; font-size: 14px; }`, note: 'For compact toolbars and cards.' },
        { name: 'Large', cssClass: `.premium-button--large { padding: 14px 28px; font-size: 17px; }`, note: 'For primary landing-page actions.' },
        { name: 'Outline', cssClass: `.premium-button--outline { background: transparent; color: ${c}; border: 1px solid ${c}; box-shadow: none; }`, note: 'For secondary actions.' }];
      result = css + '\n\n' + htmlSnippet + '\n\n' + variants.map(v => v.cssClass).join('\n');
      resultHtml = renderCssButtonOutput(label, css, htmlSnippet, variants, previewStyle);
      break;
    }
    case 'box-shadow-generator': {
      const preset = optionValue('shadow-preset', 'soft-card');
      const color = optionValue('shadow-color', '#111827');
      const opacity = Math.max(0.05, Math.min(0.6, Number(optionValue('shadow-opacity', '0.18')) || 0.18));
      const rgba = (alpha: number) => `rgba(${hexToRgb(/^#[0-9a-f]{6}$/i.test(color) ? color : '#111827').join(', ')}, ${Math.min(0.8, alpha).toFixed(2)})`;
      const shadowMap: Record<string, string> = {
        'soft-card': `0 1px 2px ${rgba(opacity * 0.45)}, 0 14px 32px ${rgba(opacity)}`,
        elevated: `0 10px 18px -6px ${rgba(opacity)}, 0 28px 50px -18px ${rgba(opacity * 1.4)}`,
        inset: `inset 0 2px 8px ${rgba(opacity)}, inset 0 -1px 0 rgba(255,255,255,0.55)`,
        glow: `0 0 0 1px ${rgba(opacity * 0.45)}, 0 0 28px ${rgba(opacity * 1.8)}`,
        'hard-drop': `8px 8px 0 ${rgba(Math.min(0.8, opacity * 2.2))}`
      };
      const shadow = shadowMap[preset] || shadowMap['soft-card'];
      const css = `.shadow-preview {\n  width: min(260px, 100%);\n  min-height: 150px;\n  border-radius: 16px;\n  background: #ffffff;\n  box-shadow: ${shadow};\n}`;
      const variants = Object.entries(shadowMap).map(([name, value]) => `${titleCase(name.replace(/-/g, ' '))}: box-shadow: ${value};`).join('\n');
      result = `Selected Shadow\nbox-shadow: ${shadow};\n\nCSS\n${css}\n\nPresets\n${variants}`;
      resultHtml = renderPreviewCodeSuite('Box Shadow CSS', `<div style="display:grid;place-items:center;min-height:190px;background:linear-gradient(135deg,#f8fafc,#eef2ff);border-radius:10px;"><div style="width:min(260px,100%);min-height:150px;border-radius:16px;background:#fff;box-shadow:${escapeHtml(shadow)};display:grid;place-items:center;color:#111827;font-weight:700;">${escapeHtml(titleCase(preset.replace(/-/g, ' ')))}</div></div>`, [
        { title: 'Selected CSS', body: `box-shadow: ${shadow};`, note: `${titleCase(preset.replace(/-/g, ' '))} preset` },
        { title: 'Component CSS', body: css, note: 'Preview-ready card style' },
        { title: 'Shadow Presets', body: variants, note: 'Copy a preset and adjust blur, spread, opacity, or inset.' }], 'Shadow values are visual starters. Test on the real background and component size.');
      break;
    }
    case 'border-radius-generator': {
      const preset = optionValue('radius-preset', 'card');
      const size = Number(optionValue('radius-size', '16')) || 16;
      const radiusMap: Record<string, string> = {
        card: `${size}px`,
        pill: '9999px',
        circle: '50%',
        'top-only': `${size}px ${size}px 0 0`,
        'per-corner': `${size}px ${Math.max(0, size * 1.6)}px ${Math.max(0, size * 0.6)}px ${Math.max(0, size * 1.2)}px`,
        organic: `${30 + size}% ${70 - size}% ${55 + Math.floor(size / 2)}% ${45 - Math.floor(size / 2)}% / 45% 38% 62% 55%`
      };
      const radius = radiusMap[preset] || radiusMap.card;
      const css = `.rounded-preview {\n  width: min(280px, 100%);\n  aspect-ratio: ${preset === 'circle' ? '1 / 1' : '16 / 10'};\n  border-radius: ${radius};\n  background: linear-gradient(135deg, #2563eb, #14b8a6);\n}`;
      const perCorner = `border-top-left-radius: ${size}px;\nborder-top-right-radius: ${Math.max(0, size * 1.6)}px;\nborder-bottom-right-radius: ${Math.max(0, size * 0.6)}px;\nborder-bottom-left-radius: ${Math.max(0, size * 1.2)}px;`;
      result = `Selected Radius\nborder-radius: ${radius};\n\nPer-Corner CSS\n${perCorner}\n\nComponent CSS\n${css}`;
      resultHtml = renderPreviewCodeSuite('Border Radius CSS', `<div style="display:grid;place-items:center;min-height:210px;background:#f8fafc;border-radius:10px;"><div style="width:min(280px,100%);aspect-ratio:${preset === 'circle' ? '1 / 1' : '16 / 10'};border-radius:${escapeHtml(radius)};background:linear-gradient(135deg,#2563eb,#14b8a6);display:grid;place-items:center;color:white;font-weight:700;">${escapeHtml(titleCase(preset.replace(/-/g, ' ')))}</div></div>`, [
        { title: 'Selected CSS', body: `border-radius: ${radius};`, note: `${titleCase(preset.replace(/-/g, ' '))} preset` },
        { title: 'Per-Corner Values', body: perCorner, note: 'Useful for asymmetric cards.' },
        { title: 'Component CSS', body: css, note: 'Stable preview dimensions included.' }], 'Preview the radius at the real element width and height before shipping.');
      break;
    }
    case 'regex-generator': {
      const mode = optionValue('regex-mode', 'email');
      const customText = compactSeed(text, 'example');
      const escapedCustom = customText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const definitions: Record<string, { pattern: string; explanation: string; positive: string[]; negative: string[] }> = {
        email: { pattern: '^[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2}$', explanation: 'Matches common email address shapes with a domain and TLD.', positive: ['name@example.com', 'first.last+tag@domain.co'], negative: ['name@', 'example.com'] },
        url: { pattern: '^https?:\\/\\/[^\\s/$.?#].[^\\s]*$', explanation: 'Matches HTTP or HTTPS URLs with no whitespace.', positive: ['https://example.com', 'http://example.com/page?q=1'], negative: ['example.com', 'https://bad url.com'] },
        phone: { pattern: '^\\+?[0-9][0-9\\s().-]{7}$', explanation: 'Matches broad phone number formats with optional country code.', positive: ['+1 555-123-4567', '(555) 123-4567'], negative: ['phone', '123'] },
        numbers: { pattern: '^-?\\d+(\\.\\d+)?$', explanation: 'Matches integers and decimal numbers with optional minus sign.', positive: ['42', '-12.5'], negative: ['12px', 'one'] },
        username: { pattern: '^[A-Za-z0-9_]{3,20}$', explanation: 'Matches 3-20 character usernames using letters, numbers, and underscore.', positive: ['creator_123', 'UserName'], negative: ['ab', 'bad-name!'] },
        contains: { pattern: `.*${escapedCustom}.*`, explanation: `Matches text containing "${customText}".`, positive: [`hello ${customText}`, customText], negative: ['different text'] },
        starts: { pattern: `^${escapedCustom}.*`, explanation: `Matches text starting with "${customText}".`, positive: [`${customText} starts here`], negative: [`before ${customText}`] },
        ends: { pattern: `.*${escapedCustom}$`, explanation: `Matches text ending with "${customText}".`, positive: [`ends with ${customText}`], negative: [`${customText} first`] }};
      const selected = definitions[mode] || definitions.email;
      const flags = optionValue('regex-case-insensitive', 'false') === 'true' ? 'i' : '';
      const regexLine = `/${selected.pattern}/${flags}`;
      const sections = [
        { title: 'Regex Pattern', body: regexLine, note: titleCase(mode) + ' mode.' },
        { title: 'Explanation', body: selected.explanation, note: 'Adjust for your target regex engine.' },
        { title: 'Positive Test Examples', body: selected.positive.join('\n'), note: 'These should match.' },
        { title: 'Negative Test Examples', body: selected.negative.join('\n'), note: 'These should not match.' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Regex Pattern Suite', sections, 'Regex note: test in your target language or environment because engines and escaping rules vary.');
      break;
    }
    case 'cron-expression-generator': {
      const selectedPreset = optionValue('cron-preset', 'daily');
      const presets: Record<string, { label: string; expr: string; explain: string }> = {
        minute: { label: 'Every Minute', expr: '* * * * *', explain: 'Runs every minute of every hour.' },
        hourly: { label: 'Hourly', expr: '0 * * * *', explain: 'Runs at minute 0 of every hour.' },
        daily: { label: 'Daily', expr: '0 9 * * *', explain: 'Runs every day at 09:00 server time.' },
        weekly: { label: 'Weekly', expr: '0 9 * * 1', explain: 'Runs every Monday at 09:00 server time.' },
        monthly: { label: 'Monthly', expr: '0 9 1 * *', explain: 'Runs on the first day of every month at 09:00 server time.' },
        custom: { label: 'Custom Pattern', expr: text && text.trim() ? text.trim() : '*/15 * * * *', explain: 'Uses your input when provided, otherwise every 15 minutes.' }};
      const selected = presets[selectedPreset] || presets.daily;
      const fieldBreakdown = `Minute: ${selected.expr.split(/\s+/)[0] || '*'}\nHour: ${selected.expr.split(/\s+/)[1] || '*'}\nDay of month: ${selected.expr.split(/\s+/)[2] || '*'}\nMonth: ${selected.expr.split(/\s+/)[3] || '*'}\nDay of week: ${selected.expr.split(/\s+/)[4] || '*'}`;
      const groups = Object.values(presets).map(preset => ({ title: preset.label, note: preset.explain, items: [{ name: preset.expr, reason: preset.explain }] }));
      const sections = [
        { title: 'Selected Cron Expression', body: selected.expr, note: selected.explain },
        { title: 'Field Breakdown', body: fieldBreakdown, note: 'Standard 5-field cron format.' },
        { title: 'Format Guide', body: 'MINUTE HOUR DAY-OF-MONTH MONTH DAY-OF-WEEK\nExample: 0 9 * * 1 means Monday at 09:00.', note: 'Server timezone usually applies.' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Cron Expression Builder', sections, 'Cron syntax differs by system. Verify the expression in your scheduler and server timezone.') + renderGroupedIdeas(groups, 'Common cron presets. Copy the expression that matches your schedule.');
      break;
    }
    case 'random-letter-generator': {
      const count = Math.max(1, Math.min(26, Number(optionValue('letter-count', '10')) || 10));
      const casing = optionValue('letter-case', 'mixed');
      const unique = optionValue('letter-unique', 'false') === 'true';
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const pool = unique ? [...alphabet].sort(() => Math.random() - 0.5).slice(0, count) : Array.from({ length: count }, () => randomFrom(alphabet));
      const letters = pool.map(letter => casing === 'lowercase' ? letter.toLowerCase() : casing === 'mixed' && Math.random() > 0.5 ? letter.toLowerCase() : letter);
      const sections = [
        { title: 'Random Letters', body: letters.join(' '), note: `${count} ${unique ? 'unique ' : ''}${casing} letter(s)` },
        { title: 'Comma-Separated', body: letters.join(', '), note: 'Easy to paste into lists.' },
        { title: 'Compact String', body: letters.join(''), note: 'No spaces.' },
        { title: 'Use Note', body: 'Useful for games, classroom prompts, practice drills, labels, and randomization. Not for passwords or security tokens.', note: 'Safe use' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Random Letter Output', sections, 'Generate again for a fresh set. Use a password generator for security-sensitive strings.');
      break;
    }
    case 'random-question-generator': {
      const topic = compactSeed(text, 'Learning And Conversation');
      const level = optionValue('question-level', 'general');
      const mix = optionValue('question-mix', 'balanced');
      const count = Math.max(4, Math.min(16, Number(optionValue('question-count', '8')) || 8));
      const pools = {
        study: [`What is the main idea behind ${topic}?`, `Which example would best explain ${topic} to a beginner?`, `What is one common misconception about ${topic}?`, `How would you compare ${topic} with a related concept?`],
        icebreaker: [`What is your first association with ${topic}?`, `What personal experience connects to ${topic}?`, `What question about ${topic} would start a good group discussion?`, `What surprising angle on ${topic} would you like to explore?`],
        interview: [`Tell me about a time you worked through a challenge involving ${topic}.`, `How would you explain your approach to ${topic}?`, `What tradeoff would you consider before deciding on ${topic}?`, `What would you ask a stakeholder before starting work on ${topic}?`],
        practice: [`Define ${topic} in one sentence, then give one example.`, `List three details that would make an answer about ${topic} stronger.`, `Write one short-answer response about ${topic} and one follow-up question.`, `Create a quick scenario where ${topic} matters.`]
      };
      const selectedPools = mix === 'study' || mix === 'icebreaker' || mix === 'interview' || mix === 'practice' ? [mix] : ['study', 'icebreaker', 'interview', 'practice'];
      const sections = selectedPools.map(pool => ({
        title: `${titleCase(pool)} Questions`,
        body: pools[pool as keyof typeof pools].slice(0, Math.max(1, Math.ceil(count / selectedPools.length))).map((q, i) => `${i + 1}. ${q}`).join('\n'),
        note: `${titleCase(level.replace(/-/g, ' '))} level`
      }));
      sections.push({ title: 'Facilitator Notes', body: `Use these as planning, study, interview prep, or classroom practice prompts.\nAdjust wording for age, subject, and context before using in a high-stakes setting.`, note: 'Review before use' });
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Random Question Set', sections, 'Questions are prompts for practice and conversation, not an official assessment.');
      break;
    }
    case 'truth-or-dare-generator': {
      const truths = ['What is your most embarrassing moment?','What is the last lie you told?','What is your biggest fear?','What is your guilty pleasure?','What is the weirdest dream you\'ve had?','What is something nobody here knows about you?'];
      const dares = ['Do your best impression of someone here','Speak in an accent for the next 3 rounds','Let someone go through your recent photos','Do 20 jumping jacks right now','Text your crush "hey" right now','Try to lick your elbow'];
      const t = [...truths].sort(() => Math.random() - 0.5).slice(0, 3);
      const d = [...dares].sort(() => Math.random() - 0.5).slice(0, 3);
      result = `TRUTHS:\n${t.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nDARES:\n${d.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
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
        ['have super strength', 'have super speed']];
      const shuffled = [...wyrs].sort(() => Math.random() - 0.5);
      result = shuffled.slice(0, 5).map(([a, b], i) => `${i + 1}. Would you rather ${a} OR ${b}?`).join('\n\n');
      break;
    }
    case 'joke-generator': {
      const jokes = [
        'Why don\'t scientists trust atoms? Because they make up everything.',
        'I told my wife she was drawing her eyebrows too high. She looked surprised.',
        'Why don\'t eggs tell jokes? They\'d crack each other up.',
        'What do you call a fake noodle? An impasta.',
        'Why did the scarecrow win an award? He was outstanding in his field.',
        'I\'m reading a book about anti-gravity. It\'s impossible to put down.',
        'What do you call a bear with no teeth? A gummy bear.',
        'Why don\'t skeletons fight each other? They don\'t have the guts.',
        'What did the ocean say to the beach? Nothing, it just waved.',
        'I used to hate facial hair, but then it grew on me.',
        'What do you call a dog that does magic tricks? A Labracadabrador.',
        'Why did the math book look sad? Because it had too many problems.'];
      const shuffled = [...jokes].sort(() => Math.random() - 0.5);
      result = shuffled.slice(0, 5).map(j => `\uD83D\uDE02 ${j}`).join('\n\n');
      break;
    }
    case 'compliment-generator': {
      const compliments = [
        'You have the most amazing smile that lights up the entire room.',
        'Your creativity and imagination inspire everyone around you.',
        'You have an incredible ability to make people feel valued and heard.',
        'Your positive attitude is absolutely infectious.',
        'You bring out the best in everyone you meet.',
        'Your determination and work ethic are truly admirable.',
        'The world is a better place because you\'re in it.',
        'You have a gift for making difficult things look easy.',
        'Your kindness creates a ripple effect that touches many lives.',
        'You\'re braver than you believe, stronger than you seem, and smarter than you think.'];
      const shuffled = [...compliments].sort(() => Math.random() - 0.5);
      result = shuffled.slice(0, 5).map(c => `\u2764\uFE0F ${c}`).join('\n\n');
      break;
    }
    case 'email-signature-generator': {
      const name = compactSeed(text, 'Avery Stone');
      const layout = optionValue('signature-layout', 'compact');
      const roleType = optionValue('signature-role', 'consultant');
      const includeHtml = optionValue('signature-include-html', 'true') === 'true';
      const includeSocials = optionValue('signature-include-socials', 'true') === 'true';
      const handle = toSafeHandle(name, 'avery-stone');
      const company = roleType === 'founder' ? titleCase(handle.replace(/-/g, ' ')) + ' Studio' : roleType === 'creative' ? titleCase(handle.replace(/-/g, ' ')) + ' Creative' : roleType === 'sales' ? titleCase(handle.replace(/-/g, ' ')) + ' Partners' : titleCase(handle.replace(/-/g, ' ')) + ' Consulting';
      const title = roleType === 'founder' ? 'Founder' : roleType === 'creative' ? 'Creative Director' : roleType === 'sales' ? 'Client Partnerships' : 'Principal Consultant';
      const email = 'hello@' + handle.replace(/-/g, '') + '.com';
      const phone = '+1 555 014 2087';
      const website = handle.replace(/-/g, '') + '.com';
      const socialLine = includeSocials ? '\nLinkedIn: linkedin.com/in/' + handle + '\nSocial: @' + handle.replace(/-/g, '') : '';
      const plainBlocks: Record<string, string> = {
        compact: `${name} | ${title}, ${company}\n${email} | ${phone} | ${website}${socialLine}`,
        corporate: `Best regards,\n${name}\n${title} | ${company}\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website}${socialLine}`,
        creator: `${name}\n${title} at ${company}\n${website}\nEmail: ${email}${socialLine}`};
      const plain = plainBlocks[layout] || plainBlocks.compact;
      const html = `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; color: #111827;">\n  <tr>\n    <td style="padding-right: 12px; border-right: 2px solid #2563eb;">\n      <strong style="font-size: 16px;">${name}</strong><br>\n      <span>${title}, ${company}</span>\n    </td>\n    <td style="padding-left: 12px; font-size: 13px;">\n      <a href="mailto:${email}">${email}</a><br>\n      <span>${phone}</span><br>\n      <a href="https://${website}">${website}</a>\n    </td>\n  </tr>\n</table>`;
      const sections = [
        { title: `${titleCase(layout)} Plain Text Signature`, body: plain, note: 'Copy into email clients that prefer plain text.' },
        ...(includeHtml ? [{ title: 'HTML Signature', body: html, note: 'Copy into clients that support HTML signatures.' }] : []),
        { title: 'Contact Hierarchy', body: `Primary identity: ${name}, ${title}\nPrimary action: email ${email}\nSecondary action: visit ${website}\nMobile-safe rule: keep the first two lines short and put long links after the core contact details.`, note: 'Signature ordering' },
        { title: 'Deployment Notes', body: `Use the plain text version for maximum compatibility.\nUse the HTML version only where your email client supports pasted table signatures.\nKeep images, badges, and banners optional so the signature stays readable on mobile.`, note: 'Email-client safe' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Email Signature Formats', sections, 'Use real contact details before sending. Keep signatures compact for mobile email clients.');
      break;
    }
    case 'gradient-generator': {
      const seed = compactSeed(text, 'gradient');
      const type = optionValue('gradient-type', 'linear');
      const direction = optionValue('gradient-direction', '135deg');
      const stops = Math.max(2, Math.min(5, Number(optionValue('gradient-stops', '3')) || 3));
      const baseHue = seedNumber(seed, 'gradient') % 360;
      const colors = Array.from({ length: stops }, (_, index) => makeHslColor(`Stop ${index + 1}`, baseHue + index * 42, 62 + (index % 2) * 10, 44 + (index % 3) * 8));
      const stopText = colors.map((color, index) => `${color.hex} ${Math.round((index / Math.max(1, colors.length - 1)) * 100)}%`).join(', ');
      const gradient = type === 'radial'
        ? `radial-gradient(circle at center, ${stopText})`
        : type === 'conic'
          ? `conic-gradient(from ${direction}, ${stopText})`
          : `linear-gradient(${direction}, ${stopText})`;
      const css = `.gradient-background {\n  min-height: 220px;\n  border-radius: 18px;\n  background: ${gradient};\n}`;
      const htmlSnippet = `<div class="gradient-background"></div>`;
      const sections = [
        { title: 'CSS Background', body: `background: ${gradient};`, note: `${titleCase(type)} gradient` },
        { title: 'Full CSS', body: css, note: `${stops} color stops` },
        { title: 'HTML Preview Element', body: htmlSnippet, note: 'Paste with the CSS above.' },
        { title: 'Color Stops', body: colors.map(color => `${color.label}: ${color.hex} | ${color.hsl}`).join('\n'), note: 'Copyable stop data' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPreviewCodeSuite('Gradient Preview And CSS', `<div style="min-height:220px;border-radius:18px;background:${escapeHtml(gradient)};display:grid;place-items:center;color:#fff;font-weight:800;text-shadow:0 2px 14px rgba(0,0,0,.35);">CSS Gradient</div>`, sections, 'Copy the CSS and adjust final contrast if text sits on top of the gradient.');
      break;
    }
    case 'font-pairing-generator': {
      const mood = optionValue('font-pairing-mood', 'modern');
      const pairs = [
        { title: 'Modern SaaS', note: 'Clean UI, dashboards, landing pages', items: [{ name: 'Heading: Space Grotesk', reason: 'Confident geometric display role', extra: 'Body: Inter; Accent: JetBrains Mono' }] },
        { title: 'Editorial', note: 'Articles, portfolios, premium content', items: [{ name: 'Heading: Playfair Display', reason: 'Elegant high-contrast headings', extra: 'Body: Source Sans 3; Accent: Libre Baskerville' }] },
        { title: 'Friendly', note: 'Education, community, creator sites', items: [{ name: 'Heading: Poppins', reason: 'Rounded and approachable', extra: 'Body: Lato; Accent: Nunito Sans' }] },
        { title: 'Professional', note: 'B2B, docs, service businesses', items: [{ name: 'Heading: IBM Plex Sans', reason: 'Trustworthy technical tone', extra: 'Body: Roboto; Accent: IBM Plex Mono' }] }];
      const visible = filterGroupsByOption(pairs, mood);
      const css = visible.map(group => {
        const first = group.items[0];
        const heading = first.name.replace('Heading: ', '');
        const body = (first.extra || '').match(/Body: ([^;]+)/)?.[1] || 'Inter';
        return `/* ${group.title} */\n:root {\n  --font-heading: "${heading}", Georgia, serif;\n  --font-body: "${body}", Arial, sans-serif;\n}\nh1, h2, h3 { font-family: var(--font-heading); }\nbody { font-family: var(--font-body); }`;
      }).join('\n\n');
      result = visible.map(group => `${group.title}\n${group.items.map(item => `${item.name}\n${item.extra}\nUse case: ${group.note}`).join('\n')}`).join('\n\n') + `\n\nCSS Stack\n${css}`;
      resultHtml = renderGroupedIdeas(visible, 'Pairing guidance only. Check font licenses and load performance in your actual project.') + renderSectionSuite('Font CSS Stack', [{ title: 'CSS Stack', body: css, note: 'Fallback-safe role assignments' }]);
      break;
    }
    case 'blog-outline-generator': {
      const topic = (text || 'your topic').trim();
      const cap = titleCase(topic);
      const intent = optionValue('search-intent', 'informational');
      const articleLength = optionValue('article-length', 'standard');
      const sections = [
        { title: 'Title Ideas', body: `1. ${cap}: A Practical Guide for Beginners\n2. How to Approach ${cap} Without Overcomplicating It\n3. ${cap} Checklist: What to Know Before You Start`, note: 'SEO-friendly title options' },
        { title: 'Search Intent', body: `Primary intent: ${intent}\nReader wants: a clear explanation, steps, examples, and mistakes to avoid\nContent promise: make ${topic} easier to understand and act on`, note: 'Use this to keep the outline focused' },
        { title: 'Target Audience', body: `People researching ${topic} who need a practical starting point, comparison points, and enough detail to make a confident next step.`, note: 'Reader definition' },
        { title: 'Intro Angle', body: `Open with the common confusion around ${topic}, then promise a simple framework, practical examples, and a clear next action.`, note: 'Hook direction' },
        { title: 'H2/H3 Outline', body: `Recommended depth: ${articleLength}\n\nH2: What Is ${cap}?\nH3: Simple definition\nH3: When it matters\n\nH2: Why ${cap} Matters\nH3: Main benefits\nH3: Risks of ignoring it\n\nH2: How to Get Started With ${cap}\nH3: Step 1 - define the goal\nH3: Step 2 - choose the right approach\nH3: Step 3 - measure progress\n\nH2: Common Mistakes\nH3: Overcomplicating the setup\nH3: Skipping context\nH3: Measuring the wrong thing\n\nH2: FAQs About ${cap}\nH2: Final Takeaway`, note: 'Ready-to-draft outline' },
        { title: 'FAQ Ideas', body: `- What is ${topic} in simple terms?\n- Who should care about ${topic}?\n- What is the first step?\n- What mistakes should beginners avoid?\n- How do you know if it is working?`, note: 'Useful for SEO and readers' },
        { title: 'CTA Suggestion', body: `Invite readers to download a checklist, compare related tools, book a consultation, or read the next guide about ${topic}.`, note: 'Contextual next step' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('SEO Blog Outline', sections, 'Add research, examples, and verified facts before publishing.');
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
      const role = (text || 'the role').trim();
      const tone = optionValue('letter-tone', 'formal');
      const level = optionValue('experience-level', 'mid');
      const sections = [
        { title: 'Opening Paragraph', body: `Dear Hiring Manager,\n\nI am applying for ${role} because the role appears to match the kind of work I do best: solving practical problems, communicating clearly, and contributing reliably to a team.\n\nSelected tone: ${tone}. Experience level: ${level}.`, note: 'Tailor company and role details' },
        { title: 'Skills Match Paragraph', body: `My strongest fit is in [skill 1], [skill 2], and [skill 3]. In past work, I have used these strengths to support projects, improve processes, and deliver work that others can build on.`, note: 'Use only real skills' },
        { title: 'Company-Fit Paragraph', body: `What interests me about [Company] is [specific reason from real research]. I would be excited to bring my experience to a team focused on [company priority or value].`, note: 'Replace with verified research' },
        { title: 'Closing Paragraph', body: `I would welcome the chance to discuss how my background fits ${role}. Thank you for your time and consideration.\n\nSincerely,\n[Your Name]`, note: 'Concise closing' },
        { title: 'Short Version', body: `Dear Hiring Manager,\n\nI am interested in ${role} and believe my experience with [relevant skill or project] would help me contribute quickly. I am especially drawn to [Company] because [specific reason]. I would appreciate the opportunity to discuss how my background fits your needs.\n\nSincerely,\n[Your Name]`, note: 'For applications with limited space' },
        { title: 'Formal Variant', body: `Dear Hiring Manager,\n\nPlease accept my application for ${role}. My background in [field/skill] has prepared me to contribute thoughtful, reliable work, and I am particularly interested in [Company] because [verified reason]. I would appreciate the opportunity to discuss my qualifications further.\n\nSincerely,\n[Your Name]`, note: 'Conservative tone' },
        { title: 'Friendly Variant', body: `Hello,\n\nI am excited to apply for ${role}. The role stood out because it connects with the work I enjoy most: [specific work]. I would be glad to share how my experience with [real skill/project] could support your team.\n\nBest,\n[Your Name]`, note: 'Warmer tone' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Cover Letter Builder', sections, 'Do not add credentials, metrics, or company details unless they are true.');
      break;
    }
    case 'resume-summary-generator': {
      const role = compactSeed(text, 'marketing specialist');
      const seniority = optionValue('resume-seniority', 'mid');
      const tone = optionValue('resume-tone', 'professional');
      const groups = [
        { title: 'Entry-Level', text: `Motivated ${role} with a strong foundation in [relevant skill], [tool or method], and clear communication. Ready to support teams through organized execution, careful learning, and reliable follow-through.`, note: 'For early-career resumes' },
        { title: 'Experienced', text: `${role} with hands-on experience across [core responsibility], [industry/tool], and [business outcome]. Known for practical problem solving, cross-functional collaboration, and steady execution.`, note: `Seniority selected: ${seniority}` },
        { title: 'Leadership', text: `${role} with experience guiding priorities, aligning stakeholders, and helping teams move from strategy to delivery. Add only real team size, scope, or outcomes you can verify.`, note: 'Leadership-safe version' },
        { title: 'Career-Change', text: `Career-change ${role} bringing transferable strengths in [previous field skill], [communication/analysis skill], and structured execution. Focused on applying those strengths to [target role outcome].`, note: 'No invented credentials' },
        { title: 'Concise', text: `${role} focused on clear priorities, practical execution, and measurable work. Skilled in [skill], [skill], and [tool/process].`, note: 'Short resume profile' },
        { title: 'ATS-Friendly', text: `${role} with experience in [keyword 1], [keyword 2], [keyword 3], and [role-specific responsibility]. Strong background in collaborating with teams, improving processes, and delivering reliable outcomes.`, note: `Tone: ${tone}. Replace brackets with true details.` }];
      result = groups.map(group => group.title + '\n' + group.text).join('\n\n');
      resultHtml = renderBioVariations(groups);
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
      const offer = compactSeed(text, 'Project Management App');
      const platform = optionValue('ad-platform', 'social');
      const objective = optionValue('ad-objective', 'lead');
      const tone = optionValue('ad-tone', 'clear');
      const lower = offer.toLowerCase();
      const toneLine = tone === 'premium' ? 'polished and benefit-led' : tone === 'friendly' ? 'warm and approachable' : tone === 'urgent-safe' ? 'timely without false scarcity' : 'clear and direct';
      const cta = objective === 'sales' ? `Shop ${offer}` : objective === 'traffic' ? `Explore ${offer}` : objective === 'awareness' ? `Learn about ${offer}` : `Get the ${offer} details`;
      const sections = [
        { title: 'Hook', body: `Make ${lower} easier to understand before the next click.`, note: `${titleCase(platform)} opening line` },
        { title: 'Headline', body: `${offer} Made Simple\nA Clearer Way To Choose ${offer}\nCompare ${offer} With Confidence`, note: 'Short headline bank' },
        { title: 'Primary Text', body: `${offer} helps people compare the value, understand the next step, and decide whether it fits their needs. Keep the message ${toneLine}, then support it with real product details from your offer.`, note: `Objective: ${objective}` },
        { title: 'CTA', body: `${cta}\nSee How It Works\nCompare Your Options`, note: 'Use one primary CTA per ad.' },
        { title: 'Short Ad', body: `${offer} without the guesswork. See the benefits, check the details, and take the next step when you are ready.\nCTA: ${cta}`, note: 'Compact social/display version' },
        { title: 'Long Ad', body: `If ${lower} feels hard to compare, start with a clearer message. ${offer} gives your audience a practical way to understand the value, review the most relevant details, and choose the next step without pressure.\n\nCTA: ${cta}`, note: 'Primary text variant' },
        { title: 'Benefit-Led Variant', body: `Turn interest in ${lower} into a confident next step. Lead with the practical benefit, show the real details, and keep the CTA simple.\nCTA: ${cta}`, note: 'Conversion-safe angle' },
        { title: 'Policy-Safe Note', body: 'Avoid deceptive scarcity, fake testimonials, fake user counts, sensitive-attribute targeting, guaranteed outcomes, and unsupported health, financial, or legal claims.', note: 'AdSense-safe review' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Ad Copy Campaign Pack', sections, `Platform: ${platform}. Tone: ${toneLine}.`);
      break;
    }
    case 'call-to-action-generator': {
      const goal = (text || 'get started').trim();
      const cap = titleCase(goal);
      const selectedGoal = optionValue('cta-goal', 'sales');
      const intensity = optionValue('cta-intensity', 'direct');
      const groups = [
        { title: 'Sales CTA', note: 'For product pages and offers.', items: [`Get ${cap} Today`, `Start with ${cap}`, `Choose ${cap}`] },
        { title: 'Newsletter CTA', note: 'For signup forms.', items: [`Get the ${cap} Tips`, `Join the ${cap} List`, `Send Me the Guide`] },
        { title: 'Social Follow CTA', note: 'For profiles and posts.', items: [`Follow for ${cap} Ideas`, `See More ${cap} Notes`, `Join the ${cap} Conversation`] },
        { title: 'Download CTA', note: 'For lead magnets.', items: [`Download the ${cap} Checklist`, `Get the Free ${cap} Template`, `Save the ${cap} Guide`] },
        { title: 'Booking CTA', note: 'For service pages.', items: [`Book a ${cap} Call`, `Schedule a Quick Consult`, `Talk Through ${cap}`] },
        { title: 'Urgency CTA', note: 'Use only when timing is real.', items: [`Start ${cap} This Week`, `Reserve Your Spot`, `Get Started Before the Window Closes`] },
        { title: 'Soft CTA', note: 'Lower-pressure next steps.', items: [`Learn More About ${cap}`, `See How ${cap} Works`, `Explore the Options`] }];
      groups.unshift({ title: 'Selected Direction', note: `Primary goal: ${selectedGoal}. Intensity: ${intensity}.`, items: selectedGoal === 'newsletter' ? [`Get the ${cap} Email`, `Join for ${cap} Tips`, `Send Me the Next Issue`] : selectedGoal === 'booking' ? [`Book a ${cap} Call`, `Schedule ${cap}`, `Plan ${cap} Together`] : selectedGoal === 'download' ? [`Download ${cap}`, `Get the ${cap} File`, `Save the ${cap} Resource`] : [`Start ${cap}`, `Choose ${cap}`, `Try ${cap}`] });
      result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(groups, 'Avoid false scarcity or exaggerated promises. Pick one primary CTA per page.');
      break;
    }
    case 'product-description-generator': {
      const product = compactSeed(text, 'Everyday Carry Tote');
      const marketplace = optionValue('product-marketplace', 'general');
      const tone = optionValue('product-tone', 'clear');
      const focus = optionValue('benefit-focus', 'quality');
      const audienceMap: Record<string, string> = {
        general: 'everyday shoppers',
        amazon: 'comparison-focused shoppers',
        shopify: 'brand-site visitors',
        etsy: 'gift buyers and handmade-goods shoppers'
      };
      const benefitMap: Record<string, string> = {
        quality: 'reliable materials and a polished finish',
        convenience: 'simple setup, easy use, and less daily friction',
        giftability: 'a useful, easy-to-give presentation',
        sustainability: 'thoughtful materials and longer everyday use'
      };
      const audience = audienceMap[marketplace] || audienceMap.general;
      const benefit = benefitMap[focus] || benefitMap.quality;
      const toneLine = tone === 'premium' ? 'refined, confident, and concise' : tone === 'friendly' ? 'warm, helpful, and easy to scan' : tone === 'technical' ? 'specific, structured, and detail-led' : 'clear, practical, and direct';
      const sections = [
        { title: 'Product Title', body: `${product} for ${audience} - ${titleCase(focus)} Focus`, note: 'Ecommerce title' },
        { title: 'Short Description', body: `${product} gives ${audience} a straightforward way to get ${benefit} in one easy-to-understand product.`, note: 'Above-the-fold copy' },
        { title: 'Long Description', body: `${product} is built for people who want a product that feels useful immediately and simple to compare before checkout.\n\nThe strongest angle for this listing is ${benefit}. Keep the copy ${toneLine}, then support it with real product facts such as material, size, compatibility, included items, care instructions, or warranty terms when those details are available.`, note: 'Full product detail' },
        { title: 'Bullet Benefits', body: `- Clear product promise for ${audience}\n- Emphasizes ${benefit}\n- Easy to scan on product pages and marketplace listings\n- Leaves room for real specs, materials, sizing, and care details\n- Gives shoppers a practical next step without exaggerated claims`, note: 'Benefit-led bullets' },
        { title: 'Benefits And Specs', body: `Benefit angle: ${titleCase(focus)}\nPrimary customer: ${audience}\nTone: ${toneLine}\nCore proof to add: verified material, size, quantity, compatibility, included items, and care instructions.`, note: 'Retail-ready structure' },
        { title: 'SEO Meta Description', body: `${product} for ${audience}. Review key benefits, practical product details, and ${focus}-focused reasons to choose it.`, note: `${marketplace} friendly` },
        { title: 'CTA Line', body: `Choose ${product} when you want ${benefit} without overcomplicating the purchase.`, note: 'Safe purchase prompt' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Ecommerce Product Description Suite', sections, 'Do not add fake reviews, invented specs, guarantees, certifications, or health claims.');
      break;
    }
    case 'random-emoji-generator': {
      const emojis = ['\uD83D\uDE00','\uD83D\uDE02','\uD83E\uDD23','\uD83D\uDE0D','\uD83E\uDD29','\uD83D\uDE0E','\uD83E\uDD14','\uD83D\uDE31','\uD83D\uDE4F','\uD83D\uDC4D','\u2764\uFE0F','\uD83D\uDD25','\u2728','\uD83C\uDF1F','\uD83C\uDF08','\uD83C\uDF89','\uD83C\uDFAE','\uD83C\uDFB5','\uD83D\uDCDA','\uD83D\uDE80','\uD83C\uDF55','\uD83C\uDF54','\uD83C\uDF6A','\uD83C\uDF82','\u2615','\uD83D\uDC36','\uD83D\uDC31','\uD83E\uDD84','\uD83D\uDC22','\uD83E\uDD8B','\uD83C\uDF3A','\uD83C\uDF3B','\uD83C\uDF32','\uD83C\uDF0A','\u26A1','\u2744\uFE0F','\uD83C\uDF19','\u2B50','\uD83C\uDF1E','\uD83E\uDDE0'];
      const shuffled = [...emojis].sort(() => Math.random() - 0.5);
      result = `Random Emojis:\n\n${shuffled.slice(0, 20).join(' ')}\n\nSingle Pick: ${randomFrom(emojis)}`;
      break;
    }
    case 'random-country-generator': {
      const countries = ['Japan','Brazil','France','Australia','Canada','Germany','India','Italy','Mexico','Thailand','South Korea','Spain','United Kingdom','Argentina','Egypt','Greece','Iceland','Kenya','Morocco','New Zealand','Norway','Peru','Portugal','Singapore','South Africa','Sweden','Switzerland','Turkey','Vietnam','Colombia'];
      const shuffled = [...countries].sort(() => Math.random() - 0.5);
      result = shuffled.slice(0, 8).map((c, i) => `${i + 1}. \uD83C\uDF0D ${c}`).join('\n');
      break;
    }
    case 'random-date-generator': {
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      result = generateMultiple(() => {
        const year = 1970 + Math.floor(Math.random() * 56);
        const month = Math.floor(Math.random() * 12);
        const day = 1 + Math.floor(Math.random() * 28);
        const d = new Date(year, month, day);
        return `${days[d.getDay()]}, ${months[month]} ${day}, ${year}`;
      }, 8);
      break;
    }
    case 'random-choice-generator': {
      if (!text) { result = 'Enter options separated by commas or new lines above.'; break; }
      const options = text.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
      if (options.length < 2) { result = 'Please enter at least 2 options separated by commas or new lines.'; break; }
      const mode = optionValue('choice-mode', 'single');
      const includeAlternates = optionValue('choice-include-alternates', 'true') === 'true';
      
      let shuffled = [...options];
      try {
        const randomInt = (max: number) => {
          const arr = new Uint32Array(1);
          crypto.getRandomValues(arr);
          return arr[0] % max;
        };
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = randomInt(i + 1);
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
      } catch (e) {
        shuffled.sort(() => Math.random() - 0.5);
      }

      const pickCount = mode === 'top-three' ? Math.min(3, shuffled.length) : 1;
      const winners = shuffled.slice(0, pickCount);
      const alternates = includeAlternates ? shuffled.slice(pickCount, pickCount + 3) : [];
      const sections = [
        { title: pickCount > 1 ? 'Selected Choices' : 'Selected Choice', body: winners.map((item, index) => `${index + 1}. ${item}`).join('\n'), note: `${options.length} option pool` },
        ...(alternates.length ? [{ title: 'Alternates', body: alternates.map((item, index) => `${index + 1}. ${item}`).join('\n'), note: 'Backup choices if needed' }] : []),
        { title: 'Original Options', body: options.map((item, index) => `${index + 1}. ${item}`).join('\n'), note: 'Input list' },
        { title: 'Use Note', body: 'This is a random picker for lightweight decisions, games, classroom use, or planning. It is not a gambling, lottery, legal, hiring, or official audit tool.', note: 'Non-gambling randomization' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPickerWheel('Random Choice Result', winners.join(', '), options, alternates, 'Random selection only. Generate again for a fresh draw.', 'bright') + renderSectionSuite('Choice Details', sections);
      break;
    }
    case 'game-idea-generator': {
      const seed = compactSeed(text, 'cozy space delivery');
      const genre = optionValue('game-idea-genre', 'all');
      const platform = optionValue('game-platform', 'pc');
      const scope = optionValue('game-scope', 'small');
      const playerCount = optionValue('game-player-count', 'solo');
      const tone = optionValue('game-tone', 'cozy');
      const includePrototype = optionValue('game-prototype', 'true') === 'true';
      const groups = [
        { title: 'Casual', text: `Genre: casual ${titleCase(genre === 'all' ? 'adventure' : genre)}\nPlatform: ${platform}\nPlayers: ${playerCount}\nTone: ${tone}\nConcept: ${titleCase(seed)} where players complete small satisfying tasks in a changing hub.\nCore loop: choose task -> perform simple mechanic -> earn cosmetic or story progress -> unlock a new request.\nMechanics: collection, light timing, route choice.\nSetting: friendly hub plus two themed zones.\nProgression: new tools change how old spaces are used.\n${includePrototype ? 'Prototype checklist: one hub, one task type, one upgrade, one 5-minute playtest.' : 'Prototype note: keep the first test small.'}\nMonetization-safe note: prefer one-time purchase, expansions, or cosmetics; avoid pay-to-win and gambling-style loops.`, note: `${scope} scope.` },
        { title: 'Puzzle', text: `Genre: puzzle\nPlatform: ${platform}\nConcept: ${titleCase(seed)} built around rule discovery.\nCore loop: inspect board -> test rule -> solve compact challenge -> unlock a twist on the rule.\nMechanics: spatial constraints, reversible mistakes, optional hints.\nSetting: each puzzle room teaches part of the world.\nProgression: introduce one new rule at a time.\n${includePrototype ? 'Prototype checklist: 6 puzzle rooms, one hint system, one fail-safe undo.' : 'Prototype note: validate the rule before adding art.'}\nMonetization-safe note: avoid paid hints that pressure stuck players.`, note: 'Logic-first concept.' },
        { title: 'Strategy', text: `Genre: strategy\nPlatform: ${platform}\nConcept: ${titleCase(seed)} where players balance scarce resources and faction pressure.\nCore loop: scout -> allocate workers -> resolve event -> upgrade policy or infrastructure.\nMechanics: tradeoffs, visible consequences, lightweight diplomacy.\nSetting: a contested region with three needs that cannot all be solved at once.\nProgression: new advisors unlock harder choices.\n${includePrototype ? 'Prototype checklist: one resource board, three events, two factions, one win condition.' : 'Prototype note: start with paper-style systems.'}\nMonetization-safe note: do not sell power advantages.`, note: 'Decision-heavy concept.' },
        { title: 'RPG', text: `Genre: RPG\nPlatform: ${platform}\nConcept: ${titleCase(seed)} with relationship-driven quests and system-neutral roles.\nCore loop: talk -> choose quest approach -> resolve conflict -> earn bond, gear, or story clue.\nMechanics: party roles, branching outcomes, reputation.\nSetting: safe base, contested route, hidden origin site.\nProgression: character arcs unlock new solutions.\n${includePrototype ? 'Prototype checklist: one quest, three NPCs, two endings, one inventory reward.' : 'Prototype note: write the quest path before stats.'}\nMonetization-safe note: sell content fairly, not random advantage.`, note: 'Narrative progression.' },
        { title: 'Narrative', text: `Genre: narrative\nPlatform: ${platform}\nConcept: ${titleCase(seed)} told through choices, objects, and recurring locations.\nCore loop: explore scene -> uncover memory -> make a small choice -> change later dialogue.\nMechanics: branching dialogue, clue board, consequence flags.\nSetting: intimate spaces with meaningful reuse.\nProgression: truth opens through perspective shifts.\n${includePrototype ? 'Prototype checklist: 3 scenes, 2 choices, 1 changed ending line.' : 'Prototype note: test emotional clarity first.'}\nMonetization-safe note: avoid manipulative urgency or paid endings.`, note: 'Story-first concept.' },
        { title: 'Mobile Indie', text: `Genre: mobile/indie\nPlatform: ${platform}\nConcept: ${titleCase(seed)} playable in short sessions.\nCore loop: one-tap action -> quick decision -> visible progress -> optional daily goal.\nMechanics: session goals, streak-safe reminders, simple upgrades.\nSetting: bold readable locations that work on small screens.\nProgression: unlock variety without punishing breaks.\n${includePrototype ? 'Prototype checklist: 30-second loop, readable UI, no forced timer pressure.' : 'Prototype note: validate readability on mobile.'}\nMonetization-safe note: avoid manipulative timers, gambling, or dark patterns.`, note: 'Mobile-stable idea.' }];
      const visibleGroups = filterGroupsByOption(groups, genre);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Use this as a design seed, then test the core loop with a small prototype.');
      break;
    }
    case 'rpg-character-generator': {
      const seed = compactSeed(text, 'wandering oathkeeper');
      const role = optionValue('rpg-character-role', 'all');
      const partyRole = optionValue('rpg-party-role', 'utility');
      const includeRoleplay = optionValue('rpg-roleplay-prompts', 'true') === 'true';
      const groups = [
        { title: 'Warrior Archetype', text: `Class/Archetype: oathbound defender\nParty role: ${partyRole}\nTraits: protective, direct, slow to trust\nBackstory: once failed to protect ${seed} and now overcorrects by standing between danger and everyone else.\nGoal: rebuild trust through one brave but honest choice.\nFlaw: confuses sacrifice with leadership.\nEquipment: battered shield, travel journal, repaired family token.\n${includeRoleplay ? 'Roleplay prompt: What promise would they break if it saved the party?' : ''}`, note: 'Frontline character.' },
        { title: 'Scout Archetype', text: `Class/Archetype: careful scout\nParty role: ${partyRole}\nTraits: witty, observant, allergic to authority\nBackstory: learned to survive around ${seed} by reading rooms faster than enemies.\nGoal: repay an old debt without admitting they care.\nFlaw: leaves before people can rely on them.\nEquipment: lock tools, marked map, hidden keepsake.\n${includeRoleplay ? 'Roleplay prompt: What detail do they always notice first?' : ''}`, note: 'Good for intrigue.' },
        { title: 'Scholar Archetype', text: `Class/Archetype: field scholar\nParty role: ${partyRole}\nTraits: curious, precise, braver on paper than in person\nBackstory: found a record about ${seed} that contradicts accepted history.\nGoal: prove the truth without becoming reckless.\nFlaw: treats uncertainty like failure.\nEquipment: annotated notebook, measuring cord, sealed letter.\n${includeRoleplay ? 'Roleplay prompt: What question can they never resist asking?' : ''}`, note: 'Investigation-ready.' },
        { title: 'Mystic Archetype', text: `Class/Archetype: wandering seer\nParty role: ${partyRole}\nTraits: calm, cryptic, unexpectedly practical\nBackstory: received visions tied to ${seed}, but the visions are incomplete.\nGoal: learn which prophecy is warning and which is temptation.\nFlaw: withholds information to avoid panic.\nEquipment: charm set, ink-stained gloves, weathered staff.\n${includeRoleplay ? 'Roleplay prompt: What vision do they refuse to describe?' : ''}`, note: 'Useful for mystery hooks.' },
        { title: 'Face Archetype', text: `Class/Archetype: silver-tongued mediator\nParty role: ${partyRole}\nTraits: warm, strategic, tired of being underestimated\nBackstory: negotiated around ${seed} once and still owes someone a favor.\nGoal: win peace without surrendering leverage.\nFlaw: turns every emotion into a performance.\nEquipment: signet token, formal clothes, list of debts.\n${includeRoleplay ? 'Roleplay prompt: When do they drop the charm and tell the truth?' : ''}`, note: 'Social specialist.' },
        { title: 'Wildcard Archetype', text: `Class/Archetype: strange specialist\nParty role: ${partyRole}\nTraits: inventive, restless, oddly sincere\nBackstory: built a life around ${seed} after a plan went beautifully wrong.\nGoal: prove their unconventional method works.\nFlaw: escalates when patience would solve more.\nEquipment: improvised kit, lucky broken tool, coded notes.\n${includeRoleplay ? 'Roleplay prompt: What impossible solution do they suggest first?' : ''}`, note: 'Flexible oddball.' }];
      const visibleGroups = filterGroupsByOption(groups, role);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Adapt names, ancestry, rules, and stats to your tabletop system.');
      break;
    }
    case 'npc-generator': {
      const seed = compactSeed(text, 'market town');
      const role = optionValue('npc-role', 'all');
      const setting = optionValue('npc-setting', 'settlement');
      const includeSecret = optionValue('npc-secret', 'true') === 'true';
      const groups = [
        { title: 'Ally', text: `Role: practical local helper in ${seed}\nSetting: ${setting}\nFirst impression: capable, watchful, already carrying too much responsibility\nPersonality: kind in actions, cautious in words\n${includeSecret ? 'Secret: knows which route is safe but not why it changed.' : 'Secret: Optional user-fill hidden concern.'}\nQuest hook: asks the party to check on someone who missed a meeting.\nVoice cue: short sentences, direct warnings.\nDialogue line: "I can get you inside, but I cannot make people tell the truth."`, note: 'Support NPC.' },
        { title: 'Rival', text: `Role: competent fixer near ${seed}\nSetting: ${setting}\nFirst impression: polished, friendly, and already one step ahead\nPersonality: charming, competitive, careful with promises\n${includeSecret ? 'Secret: wants the party to succeed because failure would expose their own mistake.' : 'Secret: Optional user-fill past mistake.'}\nQuest hook: challenges the party to solve the problem first.\nVoice cue: compliments with an edge.\nDialogue line: "Try not to make this easy for me."`, note: 'Low-friction tension.' },
        { title: 'Merchant', text: `Role: traveling supplier near ${seed}\nSetting: ${setting}\nFirst impression: cheerful seller with an excellent memory\nPersonality: generous with regulars, exacting with strangers\n${includeSecret ? 'Secret: recognizes a stolen item but fears naming the thief.' : 'Secret: Optional user-fill inventory clue.'}\nQuest hook: offers a discount for proof and protection.\nVoice cue: practical jokes followed by sharp details.\nDialogue line: "I sell rope, lanterns, and occasionally the truth."`, note: 'Recurring contact.' },
        { title: 'Authority', text: `Role: official responsible for order in ${seed}\nSetting: ${setting}\nFirst impression: tired, formal, and worried about public panic\nPersonality: dutiful, suspicious, not cruel\n${includeSecret ? 'Secret: quietly disagrees with the public order they enforce.' : 'Secret: Optional user-fill political pressure.'}\nQuest hook: needs help without creating a scandal.\nVoice cue: measured language, precise questions.\nDialogue line: "Do this cleanly, and I never had to ask."`, note: 'Pressure NPC.' },
        { title: 'Informant', text: `Role: watcher who trades in overheard details\nSetting: ${setting}\nFirst impression: forgettable until they mention something impossible\nPersonality: amused, careful, loyal to one person only\n${includeSecret ? 'Secret: their best information came from the opposing faction.' : 'Secret: Optional user-fill source.'}\nQuest hook: sells a clue for a favor instead of coin.\nVoice cue: speaks around names.\nDialogue line: "Names are expensive. Directions are cheaper."`, note: 'Clue delivery NPC.' },
        { title: 'Wildcard', text: `Role: unexpected specialist tied to ${seed}\nSetting: ${setting}\nFirst impression: odd habits, useful tools, excellent timing\nPersonality: curious, blunt, secretly sentimental\n${includeSecret ? 'Secret: caused a small problem that became a large one.' : 'Secret: Optional user-fill accident.'}\nQuest hook: can solve one obstacle if the party accepts a strange condition.\nVoice cue: jumps from jokes to insight.\nDialogue line: "That will work, which is exactly why I hate it."`, note: 'Flexible encounter NPC.' }];
      const visibleGroups = filterGroupsByOption(groups, role);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'NPCs are system-neutral and safe to rename or reskin.');
      break;
    }
    case 'quest-generator': {
      const seed = compactSeed(text, 'lost caravan');
      const questType = optionValue('quest-type', 'all');
      const scope = optionValue('quest-scope', 'mid');
      const includeClues = optionValue('quest-clues', 'true') === 'true';
      const includeRewards = optionValue('quest-rewards', 'true') === 'true';
      const groups = [
        { title: 'Rescue', text: `Objective: find survivors connected to ${seed}\nScope: ${scope}\nSetting: storm-damaged road and abandoned waystation\nComplication: the missing group split over what to do next\nStakes: delay costs trust, supplies, and one future alliance\n${includeClues ? 'Clues: torn route marker, conflicting witness, hidden supply cache.' : 'Clues: Optional user-fill discovery trail.'}\n${includeRewards ? 'Reward: safe passage, local favor, and a useful map.' : 'Reward: Optional user-fill fair reward.'}\nTwist: one survivor is hiding evidence.\nNPC hook: a calm healer knows more than they admit.\nFail-forward: if the party is late, they still rescue someone but lose a clue.`, note: 'Classic rescue with choices.' },
        { title: 'Mystery', text: `Objective: discover what really happened to ${seed}\nScope: ${scope}\nSetting: market records, witness interviews, and a restricted storehouse\nComplication: every witness is protecting someone\nStakes: the wrong accusation strengthens the real culprit\n${includeClues ? 'Clues: missing page, false alibi, object found in the wrong location.' : 'Clues: Optional user-fill evidence chain.'}\n${includeRewards ? 'Reward: information, access, and a future ally.' : 'Reward: Optional user-fill discovery reward.'}\nTwist: the obvious suspect tried to prevent the crime.\nNPC hook: a clerk asks the party to read between missing lines.\nFail-forward: a failed check reveals a costlier route to the same truth.`, note: 'Roleplay-focused quest.' },
        { title: 'Delivery', text: `Objective: deliver a fragile item tied to ${seed}\nScope: ${scope}\nSetting: checkpoint road, rival patrol, unstable bridge\nComplication: speed and safety conflict\nStakes: the recipient needs the item before negotiations begin\n${includeClues ? 'Clues: tampered seal, wrong directions, watcher on the road.' : 'Clues: Optional user-fill travel clue.'}\n${includeRewards ? 'Reward: payment plus reputation with a trade group.' : 'Reward: Optional user-fill payment or favor.'}\nTwist: the package is less valuable than the person following it.\nNPC hook: a driver keeps changing the route.\nFail-forward: damaged cargo changes the negotiation instead of ending the quest.`, note: 'Adds decisions beyond combat.' },
        { title: 'Exploration', text: `Objective: map a place connected to ${seed}\nScope: ${scope}\nSetting: abandoned outpost, living terrain, sealed lower level\nComplication: the safe path destroys evidence\nStakes: rival explorers will claim the discovery first\n${includeClues ? 'Clues: old boundary stones, repeated symbols, fresh camp ash.' : 'Clues: Optional user-fill map clues.'}\n${includeRewards ? 'Reward: route knowledge, salvage, and a faction invitation.' : 'Reward: Optional user-fill exploration reward.'}\nTwist: the site is still being maintained.\nNPC hook: an apprentice explorer asks to join for personal reasons.\nFail-forward: wrong turns reveal danger and useful shortcuts.`, note: 'Map-free exploration.' },
        { title: 'Faction', text: `Objective: resolve a dispute around ${seed}\nScope: ${scope}\nSetting: council hall, public square, private archive\nComplication: both factions are partly right\nStakes: choosing too quickly creates a lasting enemy\n${includeClues ? 'Clues: contract clause, overheard promise, missing witness.' : 'Clues: Optional user-fill political evidence.'}\n${includeRewards ? 'Reward: faction favor, safe access, and negotiated resources.' : 'Reward: Optional user-fill faction reward.'}\nTwist: a third group benefits from the conflict.\nNPC hook: a mediator asks for quiet proof before the vote.\nFail-forward: a messy compromise still opens a new lead.`, note: 'Social quest.' },
        { title: 'Moral Dilemma', text: `Objective: decide what should happen to ${seed}\nScope: ${scope}\nSetting: sanctuary, border road, contested home\nComplication: the right action harms someone sympathetic\nStakes: reputation, trust, and future safety\n${includeClues ? 'Clues: personal letter, public order, hidden cost.' : 'Clues: Optional user-fill ethical facts.'}\n${includeRewards ? 'Reward: hard-won ally, truth, and a changed community.' : 'Reward: Optional user-fill consequence reward.'}\nTwist: the person asking for help withheld one crucial detail.\nNPC hook: two allies ask for opposite outcomes.\nFail-forward: any choice should create a playable consequence, not a dead end.`, note: 'Choice-heavy quest.' }];
      const visibleGroups = filterGroupsByOption(groups, questType);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Quest seeds are system-neutral. Adjust difficulty, rewards, and names for your table.');
      break;
    }
    case 'story-plot-generator': {
      const seed = compactSeed(text, 'a forgotten promise');
      const genre = optionValue('story-plot-genre', 'all');
      const tone = optionValue('story-plot-tone', 'bittersweet');
      const includeTwist = optionValue('story-plot-twist', 'true') === 'true';
      const twistLine = includeTwist ? `Twist: the person who seems to block the goal is protecting a more painful truth.` : 'Twist: Optional user-fill reveal.';
      const groups = [
        { title: 'Three Act', text: `Premise: A reluctant protagonist discovers ${seed} is the key to a choice they avoided.\nProtagonist: someone capable but emotionally unready.\nGoal: repair the damage before a public deadline.\nConflict: every practical step forces an emotional admission.\nAct 1: discovery, refusal, first consequence.\nMidpoint: the easy solution makes the real problem worse.\nAct 3: the protagonist wins by changing the terms of success.\n${twistLine}\nStakes: trust, reputation, and one relationship that may not recover.\nEnding direction: ${tone} resolution with a changed future.\nSequel hook: a consequence from the repaired promise reaches someone unexpected.`, note: 'General structure.' },
        { title: 'Mystery', text: `Premise: A careful investigator finds ${seed} hidden inside an ordinary case.\nProtagonist: a truth-seeker with one blind spot.\nGoal: solve the case without exposing an innocent person.\nConflict: every clue helps someone and harms someone else.\nMidpoint: the first theory solves the facts but not the motive.\n${includeTwist ? 'Twist: the first victim engineered part of the mystery.' : 'Twist: Optional user-fill culprit reversal.'}\nStakes: exposing the truth could destroy an innocent family.\nEnding direction: ${tone} reveal with a moral compromise.\nSequel hook: one clue points to a larger pattern.`, note: 'Suspense plot.' },
        { title: 'Romance', text: `Premise: Two people connected by ${seed} need opposite outcomes.\nProtagonist: someone who thinks independence means never asking.\nGoal: protect a dream without losing the person who understands it.\nConflict: attraction grows while the practical problem gets sharper.\nMidpoint: one honest act raises the emotional stakes.\n${twistLine}\nStakes: trust, home, identity, and a public commitment.\nEnding direction: ${tone} choice where love requires a concrete change.\nSequel hook: a new opportunity tests the relationship.`, note: 'Relationship-forward.' },
        { title: 'Adventure', text: `Premise: A map, rumor, or debt tied to ${seed} sends the protagonist beyond safe territory.\nProtagonist: brave in motion, avoidant in conversation.\nGoal: reach a place before a rival group does.\nConflict: the journey demands cooperation with someone they distrust.\nMidpoint: the treasure is useful, but not for the reason promised.\n${twistLine}\nStakes: survival, loyalty, and the future of a vulnerable community.\nEnding direction: ${tone} victory with a cost.\nSequel hook: the route home is no longer the same.`, note: 'Quest-ready plot.' },
        { title: 'Speculative', text: `Premise: In a world shaped by a strange rule, ${seed} becomes evidence that the rule is failing.\nProtagonist: a specialist who benefits from the current system.\nGoal: decide whether to preserve the system or expose the flaw.\nConflict: truth threatens public safety.\nMidpoint: the system works exactly as designed, which is the problem.\n${twistLine}\nStakes: social order, memory, and personal freedom.\nEnding direction: ${tone} transformation of the rule.\nSequel hook: someone outside the system noticed.`, note: 'Science fiction or fantasy.' },
        { title: 'Literary', text: `Premise: A quiet life is unsettled when ${seed} returns in a form the protagonist cannot ignore.\nProtagonist: someone skilled at explaining everything except themselves.\nGoal: finish one ordinary task that carries emotional weight.\nConflict: memory, duty, and desire pull in different directions.\nMidpoint: a small conversation reveals the real wound.\n${twistLine}\nStakes: self-knowledge, belonging, and the chance to stop repeating an old pattern.\nEnding direction: ${tone} clarity rather than a perfect solution.\nSequel hook: a final image suggests what healing will require.`, note: 'Character and theme.' }];
      const visibleGroups = filterGroupsByOption(groups, genre);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Use the structure as a draft seed and rewrite names, stakes, and genre details for originality.');
      break;
    }
    case 'riddle-generator': {
      const riddles = [
        ['I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?', 'A map'],
        ['What has keys but no locks?', 'A piano'],
        ['What can travel around the world while staying in a corner?', 'A stamp'],
        ['I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?', 'An echo'],
        ['What has a head, a tail, is brown, and has no legs?', 'A penny'],
        ['The more you take, the more you leave behind. What am I?', 'Footsteps']];
      const shuffled = [...riddles].sort(() => Math.random() - 0.5);
      result = shuffled.slice(0, 4).map(([q, a], i) => `Riddle ${i + 1}: ${q}\nAnswer: ${a}`).join('\n\n');
      break;
    }
    case 'icebreaker-generator': {
      const icebreakers = ['If you could have any superpower for one day, what would it be?','What is the most interesting thing you learned this week?','If you could visit any place in the world tomorrow, where?','What is a hidden talent you have?','What was the best meal you ever had?','If you could learn any skill instantly, what?','What is your favorite way to spend a weekend?','If you were a color, which would you be?','What is the best book or show you\'ve enjoyed recently?','If you could meet any historical figure, who?','What is one thing on your bucket list?','If you had a theme song, what would it be?'];
      const shuffled = [...icebreakers].sort(() => Math.random() - 0.5);
      result = '\uD83E\uDDCA Icebreaker Questions:\n\n' + shuffled.slice(0, 6).map((q, i) => `${i + 1}. ${q}`).join('\n');
      break;
    }
    case 'product-title-generator': {
      const product = compactSeed(text, 'Wireless Travel Mug');
      const marketplace = optionValue('title-marketplace', 'general');
      const focus = optionValue('title-benefit-focus', 'quality');
      const style = optionValue('title-style', 'keyword-first');
      const benefitMap: Record<string, string> = {
        quality: 'Durable Everyday Design',
        convenience: 'Easy Daily Use',
        gift: 'Gift Ready',
        technical: 'Clear Spec Details'
      };
      const marketplaceLabel = marketplace === 'amazon' ? 'Amazon-style' : marketplace === 'shopify' ? 'Shopify PDP' : marketplace === 'etsy' ? 'Etsy search' : 'Ecommerce';
      const titleVariants = [
        { title: 'Keyword-Rich Title', body: `${product} for ${benefitMap[focus] || benefitMap.quality} - ${marketplaceLabel} Listing`, note: 'Best for search relevance and category clarity.' },
        { title: 'Benefit-Led Title', body: `${product} That Makes ${focus === 'convenience' ? 'Daily Use Simpler' : focus === 'gift' ? 'Gifting Easier' : focus === 'technical' ? 'Specs Easier To Compare' : 'Everyday Quality Clear'}`, note: 'Best for ads, collection pages, and hero sections.' },
        { title: 'Attribute-Led Title', body: `${product} - Optional user-fill material, size, color, or compatibility detail`, note: 'Best when verified specs matter.' },
        { title: 'Short Title', body: style === 'brand-first' ? `Optional user-fill brand ${product}` : product, note: `${product.length} base characters; best for mobile cards.` },
        { title: 'Marketplace-Style Title', body: marketplace === 'amazon' ? `${product}, ${benefitMap[focus] || benefitMap.quality}, Optional user-fill Size/Color/Pack Count` : marketplace === 'etsy' ? `${product} | ${benefitMap[focus] || benefitMap.quality} | Optional user-fill Occasion` : marketplace === 'shopify' ? `${product} - ${benefitMap[focus] || benefitMap.quality}` : `${product} for ${benefitMap[focus] || benefitMap.quality}`, note: `Best-use label: ${marketplaceLabel}.` },
        { title: 'Length Notes', body: `Base title length: ${product.length} characters.\nKeyword-rich variant length: ${(`${product} for ${benefitMap[focus] || benefitMap.quality} - ${marketplaceLabel} Listing`).length} characters.\nKeep titles readable, avoid keyword stuffing, and only add attributes you can verify.`, note: 'Optimization checklist' }];
      result = titleVariants.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Ecommerce Product Title Variants', titleVariants, `Marketplace: ${marketplaceLabel}. Style: ${style}.`);
      break;
    }
    case 'sku-generator': {
      const seed = toSafeHandle(text || 'general product', 'GEN').toUpperCase().slice(0, 6);
      const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const gen = (len: number) => Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      const sections = [
        { title: 'Category Prefix SKUs', body: [seed + '-' + gen(4), seed + '-' + gen(5), seed.slice(0, 3) + '-' + gen(3) + '-' + gen(2)].join('\n'), note: 'Format: category-prefix plus random code.' },
        { title: 'Date-Based SKUs', body: [seed.slice(0, 3) + '-' + datePart + '-' + gen(3), datePart + '-' + seed.slice(0, 3) + '-' + gen(2), seed.slice(0, 2) + '-' + datePart.slice(2) + '-' + gen(4)].join('\n'), note: 'Format: date marker plus product prefix.' },
        { title: 'Sequential SKUs', body: [seed.slice(0, 3) + '-0001', seed.slice(0, 3) + '-0002', seed.slice(0, 3) + '-0003'].join('\n'), note: 'Format: readable sequence for manual catalogs.' },
        { title: 'Color-Size SKUs', body: [seed.slice(0, 3) + '-BLK-M-' + gen(3), seed.slice(0, 3) + '-WHT-L-' + gen(3), seed.slice(0, 3) + '-NAV-S-' + gen(3)].join('\n'), note: 'Format: product-color-size-suffix. Replace with real variants.' },
        { title: 'Compact SKUs', body: [seed.slice(0, 2) + gen(6), seed.slice(0, 3) + gen(5), gen(4) + seed.slice(0, 2)].join('\n'), note: 'Short codes for labels with limited space.' },
        { title: 'Structure Explanation', body: 'Use stable parts that mean something: category, product line, variant, date or sequence. Keep separators consistent. Do not reuse SKUs after launch unless your inventory process explicitly allows it.', note: 'Planning guidance only.' }];
      const skuFormat = optionValue('sku-format', 'all');
      const visibleSections = skuFormat === 'prefix'
        ? sections.slice(0, 1).concat(sections.slice(5))
        : skuFormat === 'date'
          ? sections.slice(1, 2).concat(sections.slice(5))
          : skuFormat === 'variant'
            ? sections.slice(3, 4).concat(sections.slice(5))
            : sections;
      result = visibleSections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('SKU Format Suite', visibleSections, 'No inventory-system validation is performed. Test final SKUs inside your real catalog or POS system.');
      break;
    }
    case 'testimonial-generator': {
      const service = text || 'service';
      const testimonials = [
        `"${service.charAt(0).toUpperCase() + service.slice(1)} completely transformed our workflow. We saw a 40% increase in productivity within the first month. Highly recommended!" - Sarah J., CEO`,
        `"I've tried many ${service} solutions, but this one stands out. The quality and attention to detail are unmatched." - Mark T., Director`,
        `"Outstanding ${service}! The team was professional, responsive, and delivered beyond our expectations." - Emily R., Manager`,
        `"Best investment we made this year. ${service.charAt(0).toUpperCase() + service.slice(1)} helped us achieve our goals faster than we thought possible." - David L., Founder`];
      result = testimonials.join('\n\n');
      break;
    }
    case 'keyword-generator': {
      if (!text) { result = 'Please enter a seed keyword above.'; break; }
      const seed = text.toLowerCase().trim();
      const local = optionValue('keyword-local-modifier', 'near me');
      const groups = [
        { title: 'Seed Keywords', note: 'Intent: core topic. Use as the root list.', items: [seed, seed + ' guide', seed + ' ideas', seed + ' examples', seed + ' tool'] },
        { title: 'Long-Tail Keywords', note: 'Intent: specific searches with clearer needs.', items: ['how to choose ' + seed, seed + ' for beginners', 'best way to use ' + seed, seed + ' checklist', seed + ' templates'] },
        { title: 'Question Keywords', note: 'Intent: informational questions for FAQ and blog sections.', items: ['what is ' + seed, 'how does ' + seed + ' work', 'why is ' + seed + ' important', 'when should you use ' + seed, 'how much does ' + seed + ' cost'] },
        { title: 'Commercial Keywords', note: 'Intent: comparison or purchase research.', items: ['best ' + seed, seed + ' pricing', seed + ' services', seed + ' software', seed + ' alternatives'] },
        { title: 'Informational Keywords', note: 'Intent: learning and evaluation.', items: [seed + ' tips', seed + ' process', seed + ' examples', seed + ' mistakes', seed + ' strategy'] },
        { title: 'Local Keywords', note: 'Intent: local discovery. Replace the modifier with a real city when useful.', items: [seed + ' ' + local, seed + ' services near me', seed + ' in [city]', 'local ' + seed, seed + ' consultant [city]'] },
        { title: 'Low-Competition Style', note: 'Intent: narrower angles; no live difficulty or volume claim.', items: [seed + ' for small teams', seed + ' checklist for beginners', seed + ' examples for [industry]', 'simple ' + seed + ' workflow', seed + ' mistakes to avoid'] }];
      result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(groups, 'Keyword ideas are suggestions only. No live search volume, ranking difficulty, CPC, or traffic data is claimed.');
      break;
    }
    case 'faq-generator': {
      const topic = compactSeed(text, 'Your Service');
      const audience = optionValue('faq-audience', 'customers');
      const tone = optionValue('faq-tone', 'clear');
      const faqs = [
        { q: 'What is ' + topic + '?', a: topic + ' is a topic, product, or service area that people may need explained in plain language.', schema: topic + ' is explained here in simple terms so ' + audience + ' can understand what it does, who it is for, and what to do next.' },
        { q: 'Who is ' + topic + ' for?', a: 'It is useful for ' + audience + ' who need a clear starting point or answer before taking action.', schema: topic + ' is for ' + audience + ' who want a straightforward explanation, comparison, or next step without unnecessary jargon.' },
        { q: 'How do I get started with ' + topic + '?', a: 'Start by defining your goal, reviewing the basic requirements, and choosing one practical next step.', schema: 'To get started with ' + topic + ', define the goal, gather the required details, compare the available options, and take the smallest useful next step.' },
        { q: 'What should I compare before choosing ' + topic + '?', a: 'Compare fit, cost, time, quality, support, and any requirements that matter to your situation.', schema: 'Before choosing ' + topic + ', compare fit, cost, timing, quality, support, limitations, and whether the option matches your actual needs.' },
        { q: 'What mistakes should I avoid with ' + topic + '?', a: 'Avoid vague goals, unsupported claims, missing details, and decisions based on one factor only.', schema: 'Common mistakes with ' + topic + ' include skipping research, relying on unsupported claims, ignoring constraints, and choosing before the requirements are clear.' },
        { q: 'What is the next step after learning about ' + topic + '?', a: 'Choose one action: request details, try a tool, compare options, or contact the right person.', schema: 'After learning about ' + topic + ', choose a practical next step such as comparing options, gathering missing details, testing a tool, or contacting the provider.' }];
      const sections = faqs.map((faq, index) => ({ title: 'FAQ ' + (index + 1) + ': ' + faq.q, body: 'Question: ' + faq.q + '\nShort answer: ' + faq.a + '\nSchema-friendly answer: ' + faq.schema, note: 'Audience: ' + audience + '. Tone: ' + tone }));
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('FAQ Content Pack', sections, 'Answers are draft copy. Verify facts, prices, policies, and support promises before publishing schema or page content.');
      break;
    }
    case 'license-key-generator': {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const gen = (len: number) => Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      result = [
        `${gen(5)}-${gen(5)}-${gen(5)}-${gen(5)}-${gen(5)}`,
        `${gen(5)}-${gen(5)}-${gen(5)}-${gen(5)}-${gen(5)}`,
        `${gen(4)}-${gen(4)}-${gen(4)}-${gen(4)}`,
        `${gen(4)}-${gen(4)}-${gen(4)}-${gen(4)}`,
        `${gen(8)}-${gen(8)}`,
        `${gen(8)}-${gen(8)}`].map((k, i) => `Key ${i + 1}: ${k}`).join('\n');
      break;
    }
    case 'recovery-code-generator': {
      const hex = '0123456789abcdef';
      const gen = (len: number) => Array.from({length: len}, () => hex[Math.floor(Math.random() * hex.length)]).join('');
      result = 'Backup Recovery Codes:\n(Save these in a secure location)\n\n' + Array.from({length: 10}, (_, i) => `${i + 1}. ${gen(4)}-${gen(4)}-${gen(4)}`).join('\n');
      break;
    }
    case 'coupon-code-generator': {
      const seed = toSafeHandle(text || 'save', 'SAVE').toUpperCase().slice(0, 8);
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const gen = (len: number) => Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      const groups = [
        { title: 'Seasonal', note: 'Campaign-friendly codes for real seasonal promotions.', items: ['SPRING-' + seed, 'SUMMER-' + gen(5), 'HOLIDAY-' + seed.slice(0, 4)] },
        { title: 'Percentage', note: 'Use only when the stated discount is real.', items: ['SAVE10-' + seed.slice(0, 4), 'TAKE15-' + gen(4), 'GET20-' + seed.slice(0, 3)] },
        { title: 'Welcome', note: 'First-order or subscriber welcome patterns.', items: ['WELCOME-' + seed, 'HELLO-' + gen(5), 'START-' + seed.slice(0, 5)] },
        { title: 'Loyalty', note: 'Retention and customer appreciation codes.', items: ['THANKYOU-' + seed.slice(0, 4), 'VIP-' + gen(6), 'LOYAL-' + seed.slice(0, 5)] },
        { title: 'Flash Sale', note: 'Use only for real, clearly dated promotions.', items: ['FLASH-' + gen(5), 'TODAY-' + seed.slice(0, 4), 'QUICK-' + gen(4)] },
        { title: 'Short Codes', note: 'Compact codes for print, SMS, and checkout entry.', items: [seed.slice(0, 4) + gen(3), 'GO' + gen(5), 'TRY' + seed.slice(0, 3) + gen(2)] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('coupon-code-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Use coupon codes honestly. Avoid gambling framing, fake scarcity, deceptive urgency, or discounts your checkout cannot honor.');
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
      const site = compactSeed(text, 'YourStore.com');
      const businessType = optionValue('refund-business-type', 'physical-goods');
      const region = optionValue('refund-region', 'us');
      const windowOpt = optionValue('refund-window', '30-days');
      const remedy = optionValue('refund-remedy', 'original-payment');
      const includesReturns = optionValue('refund-returns', 'true') === 'true';
      const digitalException = optionValue('refund-digital-exception', 'false') === 'true';
      const damagedItems = optionValue('refund-damaged-items', 'true') === 'true';

      const contactDomain = site.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/[^a-z0-9.-]/g, '');

      const regionNotice: Record<string, string> = {
        us: 'Complies with US federal and state commercial guidelines.',
        'uk-eu': 'Includes notice of statutory 14-day cooling-off rights under EU/UK consumer laws.',
        canada: 'Matches Canadian provincial consumer protection standards.',
        australia: 'Conforms to Australian Consumer Law (ACL) statutory guarantee requirements.',
        global: 'General multi-region consumer notification standards.'
      };

      const sections = [
        { title: 'Important Disclaimer', body: 'This refund policy is a draft template only and is not legal advice. Have a qualified professional review it against your product characteristics and regional consumer protection laws.', note: 'Visible legal safety note.' },
        { title: 'Overview & Scope', body: `This policy outlines the return, refund, and exchange guidelines for purchases made on ${site}. Built for business type: ${businessType.replace(/-/g, ' ')}. ${regionNotice[region] || regionNotice.us}`, note: 'Policy context.' },
        { title: 'Refund Window & Eligibility', body: `To be eligible for a refund or return, requests must be initiated within the following window: ${windowOpt.replace(/-/g, ' ')}.\n- Items must be in their original condition and packaging.\n- Proof of purchase or receipt is required.`, note: 'Eligibility conditions.' },
        { title: 'Primary Remedy', body: `Approved returns will be processed using the selected primary remedy: ${remedy.replace(/-/g, ' ')}. Processing times may vary depending on your bank or payment provider (typically 5-10 business days).`, note: 'Remedy parameters.' },
        ...(includesReturns ? [{ title: 'Return Shipping Fees', body: 'Customers are responsible for paying their own return shipping costs. Shipping costs are non-refundable unless the return is due to our error.', note: 'Shipping clause enabled.' }] : []),
        ...(digitalException ? [{ title: 'Digital Goods Policy', body: 'Please note that downloadable software, digital products, e-books, or gift cards are exempt from returns and are non-refundable once accessed or downloaded.', note: 'Digital products exception.' }] : []),
        ...(damagedItems ? [{ title: 'Damaged or Defective Items', body: 'If you receive a damaged or defective item, please inspect it immediately and contact us with details and photos within 48 hours of delivery to arrange a replacement or priority refund.', note: 'Damaged workflow.' }] : []),
        { title: 'Customer Support Contact', body: `For refund inquiries, please email returns@${contactDomain || 'example.com'} or submit a request on our support desk page.`, note: 'Real support contact.' }
      ];

      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Refund Policy Draft Suite', sections, 'Informational template only. Update placeholders and verify with a qualified professional before publishing.');
      break;
    }
    case 'shipping-policy-generator': {
      const sections = buildStorePolicySuite('shipping', text, optionValue);
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Draft Shipping Policy Suite', sections, 'Draft-only store policy helper. Not legal, tax, customs, consumer-protection, marketplace, carrier, or compliance advice; no legal or compliance result is guaranteed.');
      break;
    }
    case 'affiliate-disclosure-generator': {
      const site = compactSeed(text, 'YourSite.com');
      const channel = optionValue('affiliate-channel', 'blog');
      const region = optionValue('affiliate-region', 'us');
      const relationship = optionValue('affiliate-relationship', 'commission');
      const placement = optionValue('affiliate-placement', 'near-link');
      const amazonNote = optionValue('affiliate-amazon-note', 'true') === 'true';
      const reviewIntegrity = optionValue('affiliate-review-integrity', 'true') === 'true';

      const contactDomain = site.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/[^a-z0-9.-]/g, '');

      const regionNotice: Record<string, string> = {
        us: 'Complies with US Federal Trade Commission (FTC) guidelines for endorsements and testimonials.',
        'uk-eu': 'Structured around UK Advertising Standards Authority (ASA) and EU consumer transparency laws.',
        canada: 'Matches Canadian Competition Bureau guidelines on transparent disclosures.',
        australia: 'Conforms to Australian Consumer Law (ACL) regulations on sponsored recommendations.',
        global: 'General multi-region consumer disclosure standards.'
      };

      const relationshipText: Record<string, string> = {
        commission: `we receive a small commission when you purchase products or services through our links, at no extra cost to you.`,
        'free-products': `we occasionally receive free products, services, or samples to review, but all opinions remain our own.`,
        sponsorship: `this content is sponsored or paid for by a third-party brand partner.`,
        mixed: `we may receive commissions, free product samples, or sponsorship payments from the brand partners we mention.`
      };

      const sections = [
        { title: 'Important Disclaimer', body: 'This affiliate disclosure is a template draft only and is not legal or advertising compliance advice. Have a qualified professional review it against your channels, placement, and commercial relationships.', note: 'Visible legal safety note.' },
        { title: 'Disclosure Statement', body: `In compliance with transparency guidelines for our ${channel}, we disclose that ${relationshipText[relationship] || relationshipText.commission}`, note: 'Core disclosure wording.' },
        { title: 'Placement & Prominence Note', body: `Recommended placement for this disclosure: ${placement.replace(/-/g, ' ')}. It should be placed clearly and conspicuously, prior to or near the affiliate links or brand endorsements.`, note: 'Visibility reminder.' },
        { title: 'Regional Guidance', body: regionNotice[region] || regionNotice.us, note: 'Jurisdiction standard.' },
        ...(amazonNote ? [{ title: 'Amazon Associates Disclosure', body: `${site} is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.`, note: 'Required Amazon affiliate clause.' }] : []),
        ...(reviewIntegrity ? [{ title: 'Review Integrity & Honesty', body: 'We maintain strict editorial standards. Our reviews and recommendations are always based on honest evaluation and research, regardless of any affiliate commission or partnership.', note: 'User trust clause.' }] : []),
        { title: 'Contact', body: `For inquiries regarding our affiliate partnerships, please contact affiliates@${contactDomain || 'example.com'}.`, note: 'Affiliate contact email.' }
      ];

      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Affiliate Disclosure Draft Suite', sections, 'Informational template only. Update placeholders and verify with a qualified professional before publishing.');
      break;
    }
    case 'invoice-generator': {
      const company = compactSeed(text, 'Your Company');
      const invoiceType = optionValue('invoice-type', 'service');
      const currencyCode = optionValue('invoice-currency', 'USD');
      const taxRate = Math.max(0, Math.min(30, Number(optionValue('invoice-tax-rate', '10')) || 0));
      const lineCount = Math.max(1, Math.min(8, Number(optionValue('invoice-line-count', '3')) || 3));
      const terms = optionValue('payment-terms', 'net-30');
      const includeTaxNote = optionValue('invoice-include-tax-note', 'true') === 'true';
      const includeLateNote = optionValue('invoice-include-late-note', 'true') === 'true';

      const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', CAD: 'CA$', AUD: 'A$'
      };
      const symbol = currencySymbols[currencyCode] || '$';
      const money = (amount: number) => `${symbol}${amount.toFixed(2)}`;

      const items: { name: string, qty: number, rate: number }[] = [];
      const itemNames: Record<string, string[]> = {
        service: ['Consulting Hours', 'Project Planning', 'System Design', 'Code Audit', 'Integration Assistance', 'Maintenance Support', 'Training Session', 'Deployment support'],
        freelance: ['Milestone 1: Design', 'Milestone 2: Prototype', 'Milestone 3: Final Handoff', 'Hourly Freelance Work', 'Asset creation', 'Editing retainer', 'Design revisions', 'Asset packaging'],
        retail: ['Product Unit A', 'Product Unit B', 'Bulk Package C', 'Shipping Box D', 'Custom Hardware Unit', 'Unit Replacement', 'Component Upgrade', 'Fulfillment Fee'],
        subscription: ['Monthly Platform Retainer', 'SaaS License Fee', 'API Access Retainer', 'Server Maintenance Pack', 'User seat licenses', 'Enterprise tier support', 'Storage overage fee', 'Bandwidth allocation'],
        deposit: ['Initial Project Deposit', 'Milestone Pre-payment', 'Security Hold Retainer', 'Setup Deposit', 'Hardware Booking Fee', 'Travel expenses deposit', 'Pre-flight setup fee', 'Retainer Deposit']
      };

      const nameList = itemNames[invoiceType] || itemNames.service;
      for (let i = 0; i < lineCount; i++) {
        items.push({
          name: nameList[i % nameList.length] + ` (Row ${i + 1})`,
          qty: (invoiceType === 'retail' || invoiceType === 'subscription') ? (i + 1) : 1,
          rate: (invoiceType === 'deposit') ? 1000 / (i + 1) : 250 - (i * 40)
        });
      }

      const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
      const tax = subtotal * (taxRate / 100);
      const total = subtotal + tax;

      const dueDays = terms === 'due-on-receipt' ? 0 : terms === 'net-15' ? 15 : terms === 'net-30' ? 30 : 45;
      const dueDate = new Date(Date.now() + dueDays * 86400000).toLocaleDateString();

      const invNum = 'INV-' + Math.floor(Math.random() * 90000 + 10000);

      const invoiceText = `INVOICE (${invoiceType.toUpperCase()})\n\nFrom: ${company}\nBilling email: billing@example.com\n\nBill To:\n[Client name]\n[Client address]\n\nInvoice #: ${invNum}\nInvoice Date: ${new Date().toLocaleDateString()}\nDue Date: ${dueDays === 0 ? 'Due on receipt' : dueDate}\nCurrency: ${currencyCode}\n\nLine Items:\n${items.map((item, index) => `${index + 1}. ${item.name} | Qty ${item.qty} | Rate ${money(item.rate)} | Amount ${money(item.qty * item.rate)}`).join('\n')}\n\nSubtotal: ${money(subtotal)}\nTax (${taxRate}%): ${money(tax)}\nTotal Due: ${money(total)}\n\nPayment Terms: ${terms.replace(/-/g, ' ').toUpperCase()}`;

      const sections = [
        { title: 'Invoice Text', body: invoiceText, note: `Invoice Type: ${invoiceType}. Terms: ${terms}.` },
        { title: 'Line Item Summary', body: items.map(item => `${item.name}: ${item.qty} x ${money(item.rate)} = ${money(item.qty * item.rate)}`).join('\n'), note: `${lineCount} items generated dynamically.` },
        { title: 'Totals Breakdown', body: `Subtotal: ${money(subtotal)}\nTax (${taxRate}%): ${money(tax)}\nTotal: ${money(total)}`, note: `Calculated in currency: ${currencyCode}.` },
        ...(includeTaxNote ? [{ title: 'Tax & Compliance Note', body: `The tax rate of ${taxRate}% is calculated for drafting purposes only. Real transactions must comply with local VAT, GST, sales tax registration, exemptions, or invoicing requirements. Consult an accountant to verify.`, note: 'Tax disclosure clause.' }] : []),
        ...(includeLateNote ? [{ title: 'Late Payment Fee Wording', body: `Late Fee Wording: Payments not received by the due date (${dueDays === 0 ? 'Due on receipt' : dueDate}) may be subject to a 1.5% monthly interest charge or standard late fees as allowed by applicable local laws.`, note: 'Late fee terms clause.' }] : [])
      ];

      result = invoiceText;
      resultHtml = renderSectionSuite('Invoice Draft Package', sections, 'Draft invoice template only. Verify tax, currency, and invoice requirements with a qualified professional before sending.');
      break;
    }
    case 'meeting-agenda-generator': {
      const topic = compactSeed(text, 'Team Planning Meeting');
      const type = optionValue('meeting-type', 'team-sync');
      const duration = Math.max(15, Math.min(180, Number(optionValue('meeting-duration', '60')) || 60));
      const includePrep = optionValue('meeting-include-prep', 'true') === 'true';
      const includeActions = optionValue('meeting-include-actions', 'true') === 'true';
      const blocks = [
        { label: 'Opening And Objective', mins: Math.max(3, Math.round(duration * 0.1)), detail: `Confirm the purpose: align on ${topic} and identify the decisions needed today.` },
        { label: 'Context Review', mins: Math.max(5, Math.round(duration * 0.2)), detail: `Review current status, constraints, and relevant updates for ${topic}.` },
        { label: 'Discussion', mins: Math.max(8, Math.round(duration * 0.35)), detail: `Discuss options, risks, blockers, and tradeoffs. Keep notes tied to decisions or next actions.` },
        { label: 'Decision Check', mins: Math.max(4, Math.round(duration * 0.15)), detail: `Confirm what is decided, what remains open, and who needs to approve or review.` },
        { label: 'Action Items And Close', mins: Math.max(5, duration - (Math.max(3, Math.round(duration * 0.1)) + Math.max(5, Math.round(duration * 0.2)) + Math.max(8, Math.round(duration * 0.35)) + Math.max(4, Math.round(duration * 0.15)))), detail: `Assign owners, deadlines, and the next checkpoint for ${topic}.` }
      ];
      const agenda = blocks.map((block, i) => `${i + 1}. ${block.label} (${block.mins} min)\n   ${block.detail}`).join('\n\n');
      const sections = [
        { title: 'Agenda Overview', body: `Meeting: ${topic}\nType: ${titleCase(type.replace(/-/g, ' '))}\nDuration: ${duration} minutes\nObjective: Leave with clear decisions, owners, and next steps.\nAttendees: Optional user-fill attendees or roles`, note: 'Meeting metadata' },
        { title: 'Timed Agenda', body: agenda, note: `${blocks.reduce((sum, block) => sum + block.mins, 0)} minutes planned` },
        { title: 'Decisions Needed', body: `- What choice or recommendation must be made about ${topic}?\n- What information is missing before a decision is possible?\n- Who is the decision owner?\n- What deadline affects this decision?`, note: 'Decision log starter' },
        ...(includePrep ? [{ title: 'Preparation Checklist', body: `- Share context or pre-read before the meeting\n- Bring current status, blockers, and open questions\n- Identify one recommended path or option\n- Confirm who can approve decisions`, note: 'Before the meeting' }] : []),
        ...(includeActions ? [{ title: 'Action Item Template', body: `Owner | Action | Due Date | Status\nOptional user-fill owner | Follow up on ${topic} | Optional user-fill date | Open`, note: 'Copyable table' }] : [])
      ];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Meeting Agenda Pack', sections, 'Planning draft only. Adapt timing, attendee roles, and decision authority to your real meeting.');
      break;
    }
    case 'citation-generator': {
      const source = compactSeed(text, 'Sample Source Title');
      const year = new Date().getFullYear();
      const sourceType = optionValue('citation-source-type', 'web');
      const citationStyle = optionValue('citation-style', 'all');
      const sections = [
        { title: 'APA Draft', body: `Author, A. A. (${year}). ${source}. Publisher or Site Name. https://example.com/source`, note: `${sourceType} source template` },
        { title: 'MLA Draft', body: `Author Last, First. "${source}." Site or Container Name, Publisher, ${year}, https://example.com/source.`, note: 'MLA-style draft' },
        { title: 'Chicago Draft', body: `Author Last, First. "${source}." Site or Publisher. Accessed [Month Day, ${year}]. https://example.com/source.`, note: 'Chicago notes/bibliography style draft' },
        { title: 'Harvard Draft', body: `Author, A.A. (${year}) '${source}', Site or Publisher. Available at: https://example.com/source (Accessed: [date]).`, note: 'Harvard-style draft' },
        { title: 'In-Text Citation', body: `APA: (Author, ${year})\nMLA: (Author page)\nChicago note: Author Last, "${source}."\nHarvard: (Author ${year})`, note: 'Replace missing fields' },
        { title: 'Missing Field Checklist', body: `Author\nTitle\nPublication year or date\nPublisher/site/journal\nURL or DOI\nAccess date for web pages\nPage range if relevant`, note: 'Use before submitting' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Citation Drafts', sections, `Selected style: ${citationStyle}. Verify citation accuracy with official style guides and the real source metadata before academic submission.`);
      break;
    }
    case 'citation-generator-legacy': {
      const year = new Date().getFullYear();
      result = `APA Format (7th Edition):\nAuthor, A. A. (${year}). Title of work. Publisher.\nAuthor, A. A. (${year}). Title of article. Journal Name, Vol(Issue), pp-pp. https://doi.org/xxxxx\n\nMLA Format (9th Edition):\nAuthor Last, First. "Title of Article." Journal Name, vol. X, no. X, ${year}, pp. XX-XX.\nAuthor Last, First. Title of Book. Publisher, ${year}.\n\nChicago Format:\nAuthor Last, First. Title of Book. City: Publisher, ${year}.\nAuthor Last, First. "Title of Article." Journal Name Vol, no. Issue (${year}): pp-pp.\n\nHarvard Format:\nAuthor, A.A. (${year}) Title of work. City: Publisher.\nAuthor, A.A. (${year}) 'Title of article', Journal Name, Vol(Issue), pp. XX-XX.`;
      break;
    }
    case 'linkedin-post-generator': {
      const topic = compactSeed(text, 'Professional Growth');
      const lower = topic.toLowerCase();
      const posts = [
        { title: 'Thought Leadership', text: 'A useful lesson about ' + lower + ': clarity usually beats complexity.\n\nThe teams that make progress define the goal, remove one blocker, and communicate the next step plainly.\n\nWhat would become easier if your process were clearer?', note: 'Professional perspective without hype' },
        { title: 'Story', text: 'I used to think ' + lower + ' depended on having every answer first.\n\nThe better lesson: start with the real problem, ask better questions, and improve the system as you learn.\n\nThat shift makes the work more useful and less performative.', note: 'Personal but not overclaimed' },
        { title: 'Announcement', text: 'Quick update on ' + lower + ': [announce the real milestone].\n\nWhat changed: [specific detail].\nWhy it matters: [audience benefit].\nNext step: [clear action or link].', note: 'Replace placeholders with verified details' },
        { title: 'Educational', text: 'A simple framework for ' + lower + ':\n\n1. Define the outcome.\n2. Identify the constraint.\n3. Choose the smallest useful action.\n4. Review what changed.\n\nSimple does not mean shallow. It means usable.', note: 'Value-first post' },
        { title: 'CTA', text: 'If you are working on ' + lower + ', start by writing one sentence: what should be clearer after this work is done?\n\nThat answer will shape the next decision.', note: 'Soft CTA, non-spammy' },
        { title: 'Question', text: 'Question for people working on ' + lower + ': what is the hardest part to explain clearly to your team, client, or audience?', note: 'Conversation starter' }];
      const visiblePosts = filterGroupsByOption(posts, optionValue('linkedin-post-format', 'all'));
      result = visiblePosts.map(post => post.title + '\n' + post.text).join('\n\n');
      resultHtml = renderBioVariations(visiblePosts);
      break;
    }
    case 'facebook-post-generator': {
      const topic = compactSeed(text, 'new business update');
      const lower = topic.toLowerCase();
      const tone = optionValue('facebook-tone', 'friendly');
      const goal = optionValue('facebook-goal', 'engagement');

      const prefix = tone === 'friendly' ? '👋 Hello friends! ' 
                   : tone === 'local' ? '📍 Local update: ' 
                   : tone === 'community' ? '👥 Community Notice: ' 
                   : '📢 Announcement: ';

      const suffix = tone === 'friendly' ? ' Let us know what you think!' 
                   : tone === 'local' ? ' Stop by or reply here!' 
                   : tone === 'community' ? ' Thanks for being part of our community.' 
                   : ' Contact our team for details.';

      const posts = [
        { title: 'Community Update', text: `${prefix}We are sharing a quick update about ${lower}.${suffix}\n\nKey detail: [user-fill detail]`, note: `Tone: ${tone}. Goal: ${goal}` },
        { title: 'Story-Style Post', text: `${prefix}We started thinking about ${lower} because of a recent insight. That led us to adjust our approach to make things easier, clearer, and more useful for everyone.${suffix}`, note: 'Good for page updates' },
        { title: 'Promotional Post', text: `${prefix}${topic} is officially available. We want to keep it simple: one verified benefit, one clear detail, and one easy next step. Check the link or DM us to get started.${suffix}`, note: 'Value-driven promotion' },
        { title: 'Educational Post', text: `${prefix}Here is a quick, practical tip about ${lower}: [Tip or lesson]. Why it matters: it saves time and keeps the setup clean.${suffix}`, note: 'Value-first post' },
        { title: 'Engagement Question', text: `${prefix}Quick question: when you are working on ${lower}, what is the biggest challenge or roadblock you usually run into?${suffix}`, note: 'Conversation starter' }
      ];

      // Prioritize list based on goal
      let sorted = [...posts];
      if (goal === 'promotion') {
        sorted = [posts[2], posts[0], posts[1], posts[3], posts[4]];
      } else if (goal === 'education') {
        sorted = [posts[3], posts[0], posts[1], posts[2], posts[4]];
      } else { // engagement
        sorted = [posts[4], posts[0], posts[1], posts[2], posts[3]];
      }

      result = sorted.map(post => `${post.title}:\n${post.text}`).join('\n\n');
      resultHtml = renderBioVariations(sorted);
      break;
    }
    case 'social-media-post-generator': {
      const topic = compactSeed(text, 'product announcement');
      const lower = topic.toLowerCase();
      const hashtag = '#' + toSafeHandle(topic, 'update');
      const platformFocus = optionValue('social-platform', 'all');
      const socialGoal = optionValue('social-goal', 'engage');
      const posts = [
        { title: 'Instagram Caption', text: `${topic}, made simple.\n\nUse this caption to show the outcome, add one vivid detail, and invite people to learn more.\n\n${hashtag} #BehindTheScenes #UsefulIdeas`, note: `Visual-first caption. Focus: ${platformFocus}` },
        { title: 'Facebook Post', text: `We have a quick update about ${lower}.\n\nHere is what is changing, why it matters, and how it can help: [add the useful details]. What would you like to know next?`, note: 'Community-friendly' },
        { title: 'LinkedIn Post', text: `${topic} is a useful reminder that clear communication matters.\n\nThe practical takeaway: [insight].\n\nThe next step: [action or resource].`, note: 'Professional feed' },
        { title: 'X/Twitter Post', text: `${topic}: one practical idea, one clear benefit, and one next step.\n\nStart here: [link or action]`, note: 'Short format' },
        { title: 'TikTok/Reels Caption', text: `POV: ${lower} finally makes sense.\n\nSave this for later and try [simple action].\n\n${hashtag}`, note: 'Short-video caption' },
        { title: 'CTA', text: socialGoal === 'promote' ? `Ready for ${lower}? Visit [link] to see details, pricing, or the next step.` : `Want more on ${lower}? Follow along, save this post, or visit [link] for the full details.`, note: `Reusable CTA. Goal: ${socialGoal}` }];
      result = posts.map(post => post.title + '\n' + post.text).join('\n\n');
      resultHtml = renderBioVariations(posts);
      break;
    }
    case 'headline-generator': {
      const topic = (text || 'topic').trim();
      const cap = titleCase(topic);
      const channel = optionValue('headline-channel', 'blog');
      const tone = optionValue('headline-tone', 'clear');
      const groups = [
        { title: 'Selected Direction', note: `Channel: ${channel}. Tone: ${tone}.`, items: [`${cap} for ${channel.replace('-', ' ')}: A Clear Starting Point`, `A ${tone} Guide to ${cap}`, `${cap}: What to Know Next`] },
        { title: 'SEO Headline', note: 'Clear keyword-first titles.', items: [`${cap}: A Practical Guide`, `What Is ${cap}? A Simple Explanation`, `${cap} Guide: Steps, Examples, and Tips`] },
        { title: 'Emotional Headline', note: 'For landing pages and social posts.', items: [`Make ${cap} Feel Less Overwhelming`, `The Easier Way to Think About ${cap}`, `Stop Guessing About ${cap}`] },
        { title: 'Curiosity Headline', note: 'Raises a question without misleading.', items: [`The ${cap} Mistake Most Beginners Miss`, `What Changes When You Understand ${cap}`, `The Hidden Friction Behind ${cap}`] },
        { title: 'How-To Headline', note: 'Instructional and search-friendly.', items: [`How to Start With ${cap}`, `How to Improve ${cap} Without Overcomplicating It`, `How to Build a Better ${cap} Process`] },
        { title: 'Listicle Headline', note: 'Good for skimmable articles.', items: [`7 Practical ${cap} Tips`, `5 ${cap} Mistakes to Avoid`, `9 Ways to Make ${cap} Easier`] },
        { title: 'Short Social Headline', note: 'Fast hooks for posts.', items: [`${cap}, simplified`, `A better way to handle ${cap}`, `${cap} without the noise`] }];
      result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(groups, 'Best-use labels are suggestions. Avoid deceptive clickbait or claims the content cannot support.');
      break;
    }
    case 'meme-text-generator': {
      const context = compactSeed(text, 'coding all night');
      const style = optionValue('pass19-style', 'all');
      const tone = optionValue('pass19-tone', 'wholesome');

      const wholesomeMemes = [
        { top: 'WHEN YOU TRY TO HELP A FRIEND', bottom: 'AND THEY ACTUALLY SUCCEED AND YOU ARE SO PROUD', note: 'Wholesome support' },
        { top: 'MY COWORKER AFTER I SOLVE THE BUG', bottom: 'YOU DID IT. YOU CRAZY SON OF A BENCH, YOU DID IT', note: 'Team encouragement' },
        { top: 'ME LOOKING AT MY OLD CODE', bottom: 'IT IS NOT MUCH, BUT IT IS HONEST WORK', note: 'Self-acceptance' }
      ];

      const sarcasticMemes = [
        { top: 'OH, SO YOU SHUT DOWN WITHOUT SAVING?', bottom: 'PLEASE, TELL ME MORE ABOUT YOUR INCREDIBLE WORKFLOW', note: 'Sarcasm' },
        { top: 'ANOTHER MEETING THAT COULD HAVE BEEN AN EMAIL', bottom: '*VISIBLE CONFUSION* AND INTERNAL SCREAMING', note: 'Meeting fatigue' },
        { top: 'IT WORKS ON MY MACHINE', bottom: 'GUESS WE ARE SHIPPING YOUR LAPTOP TO PRODUCTION THEN', note: 'Developer sarcasm' }
      ];

      const workMemes = [
        { top: 'ME ESTIMATING A TASK AS "SIMPLE"', bottom: 'AND SPENDING THE NEXT 3 DAYS REDESIGNING THE SYSTEM', note: 'Estimate panic' },
        { top: 'BOSS: WE ARE GOING TO AGILE', bottom: 'ME: SO WE DO MORE MEETINGS NOW? BOSS: YES', note: 'Agile life' },
        { top: 'ME LEAVING THE OFFICE AT 4:59 PM', bottom: 'FASTEST MAN ALIVE', note: 'Off-hours sprint' }
      ];

      const schoolMemes = [
        { top: 'STUDYING 5 MINUTES BEFORE THE EXAM', bottom: 'IMPROVISE. ADAPT. OVERCOME.', note: 'Exam panic' },
        { top: 'WHEN THE TEACHER ASKS A QUESTION', bottom: 'AVOIDS EYE CONTACT AT ALL COSTS', note: 'Classroom dynamic' },
        { top: 'GROUP PROJECT TEAMMATES:', bottom: 'NOBODY DOES ANYTHING, STILL EXPECTS A+', note: 'Group work' }
      ];

      const reactionMemes = [
        { top: `POV: YOU EXPLAIN ${context.toUpperCase()}`, bottom: 'AND THEY JUST STARE IN COMPASSIONATE SILENCE', note: 'Reaction' },
        { top: 'MY BRAIN AT 3AM:', bottom: `LET'S THINK ABOUT THAT EMBARRASSING THING FROM 2018`, note: 'Insomnia reaction' },
        { top: `WHEN THEY SAY ${context.toUpperCase()} IS EASY`, bottom: '*PANICS INTERNALLY IN 404 NOT FOUND*', note: 'Panic reaction' }
      ];

      const candidates: { top: string, bottom: string, note: string }[] = [];
      
      const addFrom = (list: typeof wholesomeMemes) => {
        list.forEach(m => {
          let cleanTop = m.top;
          let cleanBottom = m.bottom;
          if (tone === 'dry') {
            cleanBottom = cleanBottom.toLowerCase() + '... ok.';
          } else if (tone === 'light-sarcasm') {
            cleanBottom = cleanBottom + ' (sure it is)';
          } else if (tone === 'playful') {
            cleanBottom = '✨ ' + cleanBottom + ' ✨';
          }
          candidates.push({ top: cleanTop, bottom: cleanBottom, note: m.note });
        });
      };

      if (style === 'wholesome' || tone === 'wholesome') addFrom(wholesomeMemes);
      if (style === 'sarcastic-light' || tone === 'light-sarcasm') addFrom(sarcasticMemes);
      if (style === 'work') addFrom(workMemes);
      if (style === 'school-social') addFrom(schoolMemes);
      if (style === 'reaction-captions') addFrom(reactionMemes);

      if (candidates.length === 0) {
        addFrom(wholesomeMemes);
        addFrom(sarcasticMemes);
      }

      const sections = candidates.slice(0, 6).map((c, idx) => ({
        title: `Meme Template Option ${idx + 1}`,
        body: `[Top Text]\n${c.top}\n\n[Bottom Text]\n${c.bottom}`,
        note: `Vibe: ${c.note}. Style: ${style}.`
      }));

      result = sections.map(sec => sec.title + '\n' + sec.body).join('\n\n');
      resultHtml = renderSectionSuite('Meme Caption Drawer', sections, 'Meme captions are for entertainment and creative drafts only. Avoid hate, harassment, threats, or targeted abuse.');
      break;
    }
    case 'startup-name-generator': {
      const seed = compactSeed(text, 'New Venture');
      const core = seed.split(/\s+/)[0] || 'Nova';
      const groups = [
        { title: 'SaaS', note: 'Productivity and software naming.', items: [{ name: core + 'Flow', reason: 'Workflow-friendly.', extra: 'Best use: SaaS platform.' }, { name: core + 'Stack', reason: 'Technical but broad.', extra: 'Best use: ops or dev tool.' }, { name: core + 'Pilot', reason: 'Guidance and control cue.', extra: 'Best use: dashboard or assistant.' }] },
        { title: 'Fintech', note: 'Finance-adjacent names without regulated claims.', items: [{ name: core + 'Ledger', reason: 'Money organization cue.', extra: 'Best use: finance tool.' }, { name: core + 'Vault', reason: 'Security-feeling, but not a security claim.', extra: 'Best use: budgeting or records.' }, { name: core + 'Signal', reason: 'Decision-support tone.', extra: 'Best use: analytics.' }] },
        { title: 'AI', note: 'Use only if AI is genuinely part of the product.', items: [{ name: core + 'Mind', reason: 'AI-product cue.', extra: 'Best use: AI workflow.' }, { name: core + 'Model', reason: 'Clear technical reference.', extra: 'Best use: AI tooling.' }, { name: core + 'Assist', reason: 'Practical helper positioning.', extra: 'Best use: assistant product.' }] },
        { title: 'Consumer', note: 'Friendly names for broad audiences.', items: [{ name: core + 'ly', reason: 'Soft consumer-app pattern.', extra: 'Best use: mobile app.' }, { name: 'Get' + core, reason: 'Action-oriented.', extra: 'Best use: DTC product.' }, { name: core + 'Nest', reason: 'Warm and memorable.', extra: 'Best use: home or lifestyle.' }] },
        { title: 'B2B', note: 'Clearer names for teams and companies.', items: [{ name: core + 'Ops', reason: 'Business operations cue.', extra: 'Best use: B2B workflow.' }, { name: core + 'HQ', reason: 'Central command feel.', extra: 'Best use: team platform.' }, { name: core + 'Works', reason: 'Broad service/product fit.', extra: 'Best use: B2B service.' }] },
        { title: 'Modern', note: 'Short current-sounding directions.', items: [{ name: core + 'Lab', reason: 'Flexible and experimental.', extra: 'Best use: early startup.' }, { name: core + 'Base', reason: 'Foundation cue.', extra: 'Best use: platform.' }, { name: core + 'Wave', reason: 'Energetic but simple.', extra: 'Best use: launch brand.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('startup-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Startup names are brainstorming ideas only. This tool does not check trademarks, domains, funding fit, or company registration availability.');
      break;
    }
    case 'photography-name-generator': {
      const seed = compactSeed(text, 'Light Studio');
      const core = seed.split(/\s+/)[0] || 'Bright';
      const groups = [
        { title: 'Wedding', note: 'Romantic but professional.', items: [{ name: core + ' Vows Photography', reason: 'Wedding-specific.', extra: 'Best use: wedding brand.' }, { name: seed + ' Weddings', reason: 'Clear service fit.', extra: 'Best use: wedding packages.' }, { name: core + ' & Lace Studio', reason: 'Soft event feel.', extra: 'Best use: elegant weddings.' }] },
        { title: 'Portrait', note: 'People-focused photography.', items: [{ name: core + ' Portrait Co.', reason: 'Direct and polished.', extra: 'Best use: portraits.' }, { name: seed + ' Faces', reason: 'Human-centered.', extra: 'Best use: family or personal brand.' }, { name: core + ' Frame Studio', reason: 'Classic photography cue.', extra: 'Best use: portrait studio.' }] },
        { title: 'Studio', note: 'Flexible business names.', items: [{ name: core + ' Lens Studio', reason: 'Broad but relevant.', extra: 'Best use: full-service studio.' }, { name: seed + ' Creative', reason: 'Flexible creative service.', extra: 'Best use: mixed photography.' }, { name: core + ' Capture House', reason: 'Established feel.', extra: 'Best use: studio team.' }] },
        { title: 'Premium', note: 'Elevated photography positioning.', items: [{ name: core + ' Atelier', reason: 'Refined and visual.', extra: 'Best use: premium studio.' }, { name: seed + ' Fine Photography', reason: 'High-end cue.', extra: 'Best use: luxury clients.' }, { name: core + ' Reserve Studio', reason: 'Curated feel.', extra: 'Best use: limited availability.' }] },
        { title: 'Creative', note: 'More artistic directions.', items: [{ name: core + ' Lightworks', reason: 'Creative but clear.', extra: 'Best use: creative portraits.' }, { name: seed + ' Story Studio', reason: 'Narrative positioning.', extra: 'Best use: documentary style.' }, { name: core + ' Still Co.', reason: 'Minimal and memorable.', extra: 'Best use: editorial look.' }] },
        { title: 'Local', note: 'Neighborhood and city-friendly.', items: [{ name: core + ' Street Studio', reason: 'Localizable pattern.', extra: 'Best use: local service.' }, { name: seed + ' Photo House', reason: 'Approachable studio name.', extra: 'Best use: community photography.' }, { name: core + ' County Photography', reason: 'Regional cue.', extra: 'Best use: local SEO.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('photography-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Before using a photography business name, check local registrations, trademarks, domains, and social handles.');
      break;
    }
    case 'art-name-generator': {
      const seed = compactSeed(text, 'Light Study');
      const core = seed.split(/\s+/)[0] || 'Light';
      const groups = [
        { title: 'Artwork', note: 'Individual artwork and painting titles.', items: [{ name: core + ' in Motion', reason: 'Visual and active.', extra: 'Best use: painting.' }, { name: 'Study for ' + seed, reason: 'Artist-statement friendly.', extra: 'Best use: sketch or series.' }, { name: 'The ' + core + ' Room', reason: 'Scene-like and flexible.', extra: 'Best use: photograph or canvas.' }] },
        { title: 'Project', note: 'Names for creative projects or series.', items: [{ name: seed + ' Project', reason: 'Clear working title.', extra: 'Best use: art project.' }, { name: core + ' Archive', reason: 'Series and documentation cue.', extra: 'Best use: mixed media.' }, { name: 'Field Notes on ' + core, reason: 'Research-led tone.', extra: 'Best use: conceptual work.' }] },
        { title: 'Gallery', note: 'Polished names for gallery rooms and collections.', items: [{ name: core + ' Gallery', reason: 'Simple and place-ready.', extra: 'Best use: gallery title.' }, { name: 'The ' + seed + ' Collection', reason: 'Curated feel.', extra: 'Best use: collection.' }, { name: core + ' House', reason: 'Elegant venue cue.', extra: 'Best use: gallery brand.' }] },
        { title: 'Exhibition', note: 'Exhibition and show title ideas.', items: [{ name: 'Between ' + core + ' and Form', reason: 'Curatorial rhythm.', extra: 'Best use: exhibition.' }, { name: seed + ': New Works', reason: 'Clean show label.', extra: 'Best use: solo show.' }, { name: 'After ' + core, reason: 'Minimal and thoughtful.', extra: 'Best use: contemporary show.' }] },
        { title: 'Abstract', note: 'Mood-led abstract titles.', items: [{ name: core + ' Interval', reason: 'Open-ended abstraction.', extra: 'Best use: abstract work.' }, { name: 'Soft Geometry of ' + core, reason: 'Shape and mood cue.', extra: 'Best use: abstract series.' }, { name: core + ' Without Edges', reason: 'Conceptual and visual.', extra: 'Best use: installation.' }] },
        { title: 'Minimal', note: 'Short, gallery-safe titles.', items: [{ name: core + ' I', reason: 'Clean series title.', extra: 'Best use: minimal piece.' }, { name: 'Plain ' + core, reason: 'Restrained and direct.', extra: 'Best use: study.' }, { name: seed, reason: 'Uses the input as a title.', extra: 'Best use: final title.' }] },
        { title: 'Dramatic', note: 'Higher-emotion titles for striking work.', items: [{ name: 'The Weight of ' + core, reason: 'Strong emotional frame.', extra: 'Best use: dramatic artwork.' }, { name: core + ' After Midnight', reason: 'Cinematic mood.', extra: 'Best use: dark composition.' }, { name: 'When ' + core + ' Breaks', reason: 'Built-in tension.', extra: 'Best use: expressive piece.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('art-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: art titles are creative suggestions only. Check existing exhibitions, collections, and brand conflicts before public use.');
      break;
    }
    case 'avatar-name-generator': {
      const avPre = ['Neo','Cyber','Pixel','Void','Echo','Nova','Glitch','Phantom','Data','Flux'];
      const avSuf = ['Walker','Runner','Drift','Core','Byte','Link','Wave','Pulse','Storm','Edge'];
      result = generateMultiple(() => `${randomFrom(avPre)}${randomFrom(avSuf)}`, 12);
      break;
    }
    case 'video-game-name-generator': {
      const gPre = ['Dark','Neon','Shadow','Eternal','Lost','Cyber','Infinite','Savage','Mystic','Final'];
      const gMid = ['Chronicles of','Legends of','Rise of','Fall of','Quest for','Realm of','Age of','Path of'];
      const gSuf = ['Redemption','Destiny','Oblivion','Ascension','Eclipse','Vanguard','Requiem','Genesis','Uprising','Dominion'];
      result = generateMultiple(() => {
        const s = Math.floor(Math.random() * 3);
        if (s === 0) return `${randomFrom(gPre)} ${randomFrom(gSuf)}`;
        if (s === 1) return `${randomFrom(gMid)} ${randomFrom(gSuf)}`;
        return `${randomFrom(gPre)} ${randomFrom(gMid).split(' ')[0]} ${randomFrom(gSuf)}`;
      }, 10);
      break;
    }
    case 'text-summary-generator': {
      if (!text || text.length < 50) {
        const sections = [{ title: 'Input Needed', body: 'Please enter a longer text passage of at least 50 characters to summarize.', note: 'No summary generated' }];
        result = sections[0].body;
        resultHtml = renderSectionSuite('Text Summary', sections, 'The summary tool only condenses input text. It does not verify facts beyond the provided text.');
        break;
      }
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
      const audience = optionValue('summary-audience', 'general');
      const format = optionValue('summary-format', 'all');
      const includeActions = optionValue('summary-include-actions', 'true') === 'true';
      const includeQuestions = optionValue('summary-include-questions', 'true') === 'true';
      const keyCount = Math.min(4, Math.max(1, Math.ceil(sentences.length / 3)));
      const selected = sentences.slice(0, keyCount).map(s => s.trim() + '.');
      const words = text.trim().split(/\s+/).length;
      const allSections = [
        { title: 'Short Summary', body: selected.slice(0, 2).join(' '), note: `${words} input words` },
        { title: 'Bullet Summary', body: selected.map(point => `- ${point}`).join('\n'), note: `Audience: ${audience}` },
        { title: 'Executive Summary', body: `This text focuses on ${selected[0].replace(/\.$/, '').toLowerCase()}. The main takeaway is that the reader should understand the core points, compare the stated details, and use the original text for nuance before making decisions.`, note: 'Condensed overview' },
        { title: 'Key Takeaways', body: selected.map((point, i) => `${i + 1}. ${point}`).join('\n'), note: 'Copy-ready list' },
        ...(includeActions ? [{ title: 'Possible Action Items', body: `- Review the original text for dates, names, and obligations.\n- Turn any explicit tasks in the text into owners and deadlines.\n- Mark unclear items as questions before sharing.`, note: 'Only derived from input' }] : []),
        ...(includeQuestions ? [{ title: 'Open Questions', body: `- What details are missing from the source text?\n- Which claims need outside verification before use?\n- Who needs this summary and what decision will it support?`, note: 'Follow-up prompts' }] : [])
      ];
      const sections = format === 'short' ? allSections.slice(0, 1) : format === 'bullets' ? allSections.slice(1, 2) : format === 'executive' ? allSections.slice(2, 3) : format === 'takeaways' ? allSections.slice(3, 4) : allSections;
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Text Summary Suite', sections, 'Summaries are based only on the submitted text and do not verify outside facts.');
      break;
    }
    case 'typography-generator': {
      if (!text) { result = 'Please enter text above to transform.'; break; }
      const base = clampNumber(optionValue('type-base-size', '16'), 16, 12, 24);
      const ratio = Number(optionValue('type-ratio', '1.25')) || 1.25;
      const prefix = slugifyLocal(optionValue('type-prefix', 'type'), 'type');
      const levels = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map((name, i) => ({ name, size: Number((base * Math.pow(ratio, i - 2)).toFixed(2)) }));
      const table = levels.map(level => `${level.name} | ${level.size}px | line-height ${level.size > 24 ? '1.15' : '1.5'}`).join('\n');
      const vars = `:root {\n${levels.map(level => `  --${prefix}-${level.name}: ${level.size}px;`).join('\n')}\n  --${prefix}-body-line: 1.6;\n  --${prefix}-heading-line: 1.15;\n}`;
      const headingCss = `h1 { font-size: var(--${prefix}-3xl); line-height: var(--${prefix}-heading-line); letter-spacing: 0; }\nh2 { font-size: var(--${prefix}-2xl); line-height: var(--${prefix}-heading-line); }\np { font-size: var(--${prefix}-base); line-height: var(--${prefix}-body-line); }`;
      const notes = base < 14 ? 'Base size is small; check readability on mobile.' : 'Scale is readable for most body text when paired with enough contrast and spacing.';
      result = `Type Scale Table\n${table}\n\nCSS Variables\n${vars}\n\nHeading CSS\n${headingCss}\n\nUsage Sample\n${text}\n\nReadability Notes\n${notes}`;
      resultHtml = renderSectionSuite('Typography Scale System', [
        { title: 'Type Scale Table', body: table, note: `${base}px base, ${ratio} ratio` },
        { title: 'CSS Variables', body: vars, note: 'Copy CSS tokens' },
        { title: 'Heading CSS', body: headingCss, note: 'Role assignments' },
        { title: 'Usage Sample', body: text, note: 'Preview copy' },
        { title: 'Readability Notes', body: notes, note: 'Accessibility guidance' }]);
      break;
    }
    case 'wordart-generator': {
      if (!text) { result = 'Please enter text above to transform.'; break; }
      const decorBorders = ['\u2554','\u2557','\u255A','\u255D','\u2550','\u2551'];
      const topBot = decorBorders[4].repeat(text.length + 4);
      const boxed = `${decorBorders[0]}${topBot}${decorBorders[1]}\n${decorBorders[5]}  ${text.toUpperCase()}  ${decorBorders[5]}\n${decorBorders[2]}${topBot}${decorBorders[3]}`;
      const spaced = text.split('').join(' \u2022 ');
      const sparkle = `\u2728 ${text.split('').join(' ')} \u2728`;
      const waved = text.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');
      result = `Boxed:\n${boxed}\n\nDotted:\n${spaced}\n\nSparkle:\n${sparkle}\n\nWaVeD:\n${waved}\n\nReversed:\n${text.split('').reverse().join('')}`;
      break;
    }






    case 'drag-name-generator': {
      const first = ['Crystal','Sapphire','Scarlett','Destiny','Nova','Raven','Ivy','Jade','Violet','Ruby','Bianca','Serena','Elektra','Venus','Stella'];
      const last = ['Chandelier','Velour','DeLuxe','St. James','Magnifico','Von Teese','Glamour','Divine','LaRue','Fontaine','Dazzle','Sparkle'];
      result = generateMultiple(() => `${randomFrom(first)} ${randomFrom(last)}`, 10);
      break;
    }
    case 'gamertag-generator': {
      const adj = ['Dark','Shadow','Neon','Toxic','Savage','Silent','Ghost','Frost','Storm','Blaze','Iron','Void','Chaos','Omega'];
      const noun = ['Wolf','Sniper','Knight','Ninja','Reaper','Phoenix','Viper','Hawk','Titan','Hunter','Blade','Demon','Wraith'];
      const nums = ['','','',String(Math.floor(Math.random()*99)),String(Math.floor(Math.random()*999)),'x','xx','_'];
      result = generateMultiple(() => {
        const s = Math.floor(Math.random() * 3);
        const n = randomFrom(nums);
        if (s === 0) return `${randomFrom(adj)}${randomFrom(noun)}${n}`;
        if (s === 1) return `x${randomFrom(adj)}${randomFrom(noun)}x`;
        return `${randomFrom(noun)}_${randomFrom(adj)}${n}`;
      }, 12);
      break;
    }
    case 'dragonborn-name-generator': {
      const dbFirst = ['Arjhan','Balasar','Bharash','Donaar','Ghesh','Heskan','Kriv','Medrash','Nadarr','Pandjed','Patrin','Rhogar','Shamash','Shedinn','Torinn'];
      const dbFem = ['Akra','Biri','Daar','Farideh','Harann','Jheri','Kava','Korinn','Mishann','Nala','Perra','Raiann','Sora','Surina','Thava'];
      const clans = ['Clethtinthiallor','Daardendrian','Delmirev','Drachedandion','Fenkenkabradon','Kepeshkmolik','Kerrhylon','Kimbatuul','Linxakasendalor','Myastan','Nemmonis','Norixius','Ophinshtalajiir','Prexijandilin','Shestendeliath','Turnuroth','Verthisathurgiesh','Yarjerit'];
      result = generateMultiple(() => {
        const isFem = Math.random() > 0.5;
        return `${randomFrom(isFem ? dbFem : dbFirst)} ${randomFrom(clans)}`;
      }, 10);
      break;
    }
    case 'email-name-generator': {
      const raw = text.trim() || 'Jordan Lee';
      const parts = slugWords(raw);
      const first = parts[0] || 'jordan';
      const last = parts[1] || 'lee';
      const role = parts.slice(2).join('') || 'work';
      const groups = [
        { title: 'First Last', note: 'Professional and easy to read.', items: [first + '.' + last, first + last, first + '-' + last] },
        { title: 'Initials', note: 'Useful when full-name versions are crowded.', items: [first.charAt(0) + last, first + last.charAt(0), first.charAt(0) + '.' + last] },
        { title: 'Role-Based', note: 'Use for public-facing work addresses.', items: [first + '.' + role, role + '.' + first, first + '.' + last + '.' + role] },
        { title: 'Business', note: 'Clean business username patterns.', items: ['hello.' + first, first + '.studio', first + '.works'] },
        { title: 'Clean', note: 'Low-punctuation options.', items: [first + last + 'hq', first + last + 'mail', first + last + 'online'] },
        { title: 'Memorable', note: 'Still professional, slightly more distinctive.', items: ['contact.' + first, first + '.notes', first + '.office'] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('email-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'These are username ideas only. This tool does not check live Gmail, Outlook, domain, or mailbox availability.');
      break;
    }
    case 'synonym-generator': {
      const word = (text || 'clear').trim().split(/\s+/)[0].toLowerCase();
      const context = optionValue('synonym-context', 'general-writing');
      const includeExamples = optionValue('synonym-examples', 'true') === 'true';
      const example = (alt: string) => includeExamples ? ` Example: The ${context.replace(/-/g, ' ')} version uses "${alt}" where it keeps the meaning accurate.` : ' Example: disabled.';
      const groups = [
        { title: 'Neutral', note: `Everyday alternatives for ${context}.`, items: [`plain ${word} - broad meaning shade.${example(`plain ${word}`)}`, `direct ${word} - clear and unembellished.${example(`direct ${word}`)}`, `simple ${word} - easy to understand.${example(`simple ${word}`)}`] },
        { title: 'Formal', note: 'Use for reports, essays, and professional writing.', items: [`considered ${word} - careful and deliberate.${example(`considered ${word}`)}`, `measured ${word} - restrained and thoughtful.${example(`measured ${word}`)}`, `structured ${word} - organized and methodical.${example(`structured ${word}`)}`] },
        { title: 'Casual', note: 'Use for conversational writing.', items: [`easy ${word} - approachable and relaxed.${example(`easy ${word}`)}`, `friendly ${word} - warm and reader-facing.${example(`friendly ${word}`)}`, `natural ${word} - conversational without slang.${example(`natural ${word}`)}`] },
        { title: 'Persuasive', note: 'Use when the sentence needs a stronger pitch.', items: [`focused ${word} - suggests purpose.${example(`focused ${word}`)}`, `compelling ${word} - use only when the claim is supported.${example(`compelling ${word}`)}`, `useful ${word} - practical and benefit-led.${example(`useful ${word}`)}`] },
        { title: 'Precise', note: 'Use when the meaning needs tighter boundaries.', items: [`specific ${word} - narrower than the original.${example(`specific ${word}`)}`, `targeted ${word} - aimed at a defined use.${example(`targeted ${word}`)}`, `limited ${word} - intentionally scoped.${example(`limited ${word}`)}`] },
        { title: 'Softer', note: 'Use when the tone should feel gentle or diplomatic.', items: [`gentle ${word} - low-pressure tone.${example(`gentle ${word}`)}`, `careful ${word} - cautious and respectful.${example(`careful ${word}`)}`, `subtle ${word} - understated and light.${example(`subtle ${word}`)}`] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('synonym-tone', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'These are writing alternatives, not a complete dictionary. Verify meaning in context.');
      break;
    }
    case 'footnote-generator': {
      const source = compactSeed(text, 'Sample Source Title');
      const year = new Date().getFullYear();
      const style = optionValue('footnote-style', 'chicago');
      const sourceType = optionValue('footnote-source-type', 'book');
      const includeBib = optionValue('footnote-include-bibliography', 'true') === 'true';
      const sections = [
        { title: 'Full Footnote Draft', body: `1. Author First Last, ${sourceType === 'article' ? `"${source}," Journal or Website Name` : `${source}, City: Publisher`}, ${year}, page or URL.`, note: `${titleCase(style)} style draft` },
        { title: 'Short Note Draft', body: `2. Last, ${source}, page.`, note: 'Use after first full note when allowed by your style guide' },
        { title: 'Explanatory Footnote', body: `1. This note can briefly clarify how ${source.toLowerCase()} connects to the argument without adding unsupported claims.`, note: 'Context note' },
        { title: 'Web Source Footnote', body: `1. Author First Last, "${source}," Website or Publisher, published or updated Optional user-fill date, accessed Optional user-fill access date, https://example.com/source.`, note: 'Replace URL and dates' },
        ...(includeBib ? [{ title: 'Bibliography Companion', body: `Last, First. ${sourceType === 'article' ? `"${source}." Website or Journal Name.` : `${source}. City: Publisher.`} ${year}.`, note: 'Bibliography draft' }] : []),
        { title: 'Missing Field Checklist', body: `Author\nTitle\nPublisher, journal, or website\nPublication date\nPage number or section\nURL or DOI\nAccess date if required`, note: 'Verify before submission' }
      ];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Footnote Draft Suite', sections, 'Citation drafts can be wrong if source fields are missing. Verify against official style guides and your real source metadata.');
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
      const verbs = ['leverage','synergize','optimize','streamline','facilitate','incentivize','revolutionize','disrupt','monetize','actualize'];
      const adj = ['cross-functional','data-driven','scalable','best-in-class','mission-critical','next-generation','cutting-edge','bleeding-edge','value-added','results-oriented'];
      const nouns = ['synergies','paradigms','bandwidth','deliverables','stakeholders','ecosystem','pipeline','runway','learnings','optics','verticals','touch-points'];
      result = generateMultiple(() => `Let\'s ${randomFrom(verbs)} our ${randomFrom(adj)} ${randomFrom(nouns)} to drive ${randomFrom(adj)} ${randomFrom(nouns)}.`, 8);
      break;
    }
    case 'random-word-generator': {
      const category = optionValue('word-category', 'creative');
      const count = Math.max(4, Math.min(40, Number(optionValue('word-count', '12')) || 12));
      const length = optionValue('word-length', 'mixed');
      const banks: Record<string, string[]> = {
        common: ['bright','garden','paper','window','river','market','simple','friend','travel','music','coffee','silver','gentle','summer','circle','button','forest','camera'],
        creative: ['luminous','cascade','reverie','harbor','velvet','signal','meadow','compass','ember','horizon','mosaic','wildflower','blueprint','lantern','echo','atlas'],
        business: ['strategy','pipeline','margin','launch','market','growth','brief','positioning','insight','workflow','retention','forecast','segment','offer','system','value'],
        fantasy: ['runestone','moonforge','starfall','thornkeep','embervale','mistwood','skyreach','ironroot','frostmere','sunspire','wolfgate','ravenhall','crystalfen','stormhold'],
        funny: ['pickle','noodle','waffle','bonkers','snort','wiggle','oops','bubble','muffin','zippy','socks','plop','goofy','sprinkle','wobble','snack'],
        'adjective-noun': ['bold compass','quiet signal','golden notebook','clever lantern','fresh blueprint','brisk meadow','silver market','bright harbor','kind engine','nimble idea']
      };
      const bank = banks[category] || banks.creative;
      const filtered = bank.filter(word => length === 'mixed' || (length === 'short' ? word.length <= 6 : length === 'medium' ? word.length > 6 && word.length <= 10 : word.length > 10));
      const source = filtered.length >= 4 ? filtered : bank;
      const items = Array.from({ length: count }, () => randomFrom(source));
      const groups = [
        { title: `${titleCase(category.replace(/-/g, ' '))} Words`, note: `Length filter: ${titleCase(length)}.`, items: items.map(word => ({ name: word, reason: `Useful ${category.replace(/-/g, ' ')} word for prompts, games, or naming.` })) },
        { title: 'Prompt Pairings', note: 'Use these for writing, naming, or classroom prompts.', items: items.slice(0, 6).map(word => ({ name: `${word} + ${randomFrom(['story','brand','challenge','scene','question','idea'])}`, reason: 'Quick two-part prompt seed.' })) }
      ];
      result = items.map((word, index) => `${index + 1}. ${word}`).join('\n');
      resultHtml = renderGroupedIdeas(groups, 'Copy individual words, grouped word banks, or prompt pairings.');
      break;
    }
    case 'dialogue-tag-generator': {
      const line = text || 'I thought you understood.';
      const groups = [
        { title: 'Simple Tags', note: 'Best for invisible attribution.', items: [`"${line}," she said. Best use: clear speaker attribution.`, `"${line}," he asked. Best use: direct question.`, `"${line}," they replied. Best use: response after another line.`] },
        { title: 'Emotional Tags', note: 'Use sparingly when emotion matters.', items: [`"${line}," she admitted. Best use: reluctant truth.`, `"${line}," he snapped. Best use: brief irritation, not constant anger.`, `"${line}," they whispered. Best use: low volume or secrecy.`] },
        { title: 'Action-Based Beats', note: 'Often stronger than a fancy speech verb.', items: [`"${line}" She folded the note and looked away. Best use: emotion through movement.`, `"${line}" He tapped the table twice. Best use: tension without naming it.`, `"${line}" They paused at the door. Best use: hesitation or exit beat.`] },
        { title: 'Subtle Tags', note: 'Quiet tension and restrained scenes.', items: [`"${line}," she murmured. Best use: soft delivery.`, `"${line}," he said after a moment. Best use: delayed response.`, `"${line}" They kept their eyes on the floor. Best use: avoid overexplaining discomfort.`] },
        { title: 'Dramatic Tags', note: 'Reserve for high-stakes moments.', items: [`"${line}," she declared. Best use: formal or public moment.`, `"${line}," he called across the room. Best use: distance or interruption.`, `"${line}" The room went quiet. Best use: scene reaction instead of a louder verb.`] },
        { title: 'Avoid Overuse Tips', note: 'Dialogue craft reminder.', items: ['Use said and asked when the tag should disappear.', 'Use action beats to show emotion instead of naming every feeling.', 'Punctuation tip: use a comma before said/asked, but a period before a separate action beat.', 'Avoid stacking a dramatic tag on every line.'] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('dialogue-tag-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Dialogue tags should support clarity and pacing, not compete with the conversation.');
      break;
    }
    case 'name-tag-generator': {
      const name = text || 'Your Name';
      result = `\u250C${'\u2500'.repeat(30)}\u2510\n\u2502  HELLO                        \u2502\n\u2502  MY NAME IS                   \u2502\n\u2502                               \u2502\n\u2502     ${name.padEnd(25)}\u2502\n\u2502                               \u2502\n\u2514${'\u2500'.repeat(30)}\u2518\n\nFormatted: HELLO, my name is ${name}\nCompany: ${name} | [Title] | [Company]`;
      break;
    }
    case 'graffiti-text-generator': {
      if (!text) { result = 'Enter text above to convert.'; break; }
      const graffMap: Record<string, string> = {A:'\u24B6',B:'\u24B7',C:'\u24B8',D:'\u24B9',E:'\u24BA',F:'\u24BB',G:'\u24BC',H:'\u24BD',I:'\u24BE',J:'\u24BF',K:'\u24C0',L:'\u24C1',M:'\u24C2',N:'\u24C3',O:'\u24C4',P:'\u24C5',Q:'\u24C6',R:'\u24C7',S:'\u24C8',T:'\u24C9',U:'\u24CA',V:'\u24CB',W:'\u24CC',X:'\u24CD',Y:'\u24CE',Z:'\u24CF'};
      const circled = text.toUpperCase().split('').map(c => graffMap[c] || c).join('');
      const bracketed = text.split('').map(c => `[${c}]`).join('');
      const tagged = `\u2588 ${text.toUpperCase()} \u2588`;
      result = `Circled:\n${circled}\n\nBracketed:\n${bracketed}\n\nBlock:\n${tagged}\n\nTagged:\n\u2605 ${text.toUpperCase()} \u2605`;
      break;
    }
    case 'tag-cloud-generator': {
      if (!text) { result = 'Enter keywords separated by spaces above.'; break; }
      const maxTags = clampNumber(optionValue('cloud-max-tags', '20'), 20, 8, 40);
      const removeStopwords = optionValue('cloud-remove-stopwords', 'true') === 'true';
      const weighting = optionValue('cloud-weighting', 'frequency');
      const stopwords = new Set(['the','and','for','with','from','this','that','into','your','you','are','was','were','has','have','will','not','but','all','can','is','it','to','of','in','on','at','by','an','as']);
      
      const words = text.split(/\s+/).map(word => word.toLowerCase().replace(/[^a-z0-9-]/g, '')).filter(word => word && (!removeStopwords || !stopwords.has(word)));
      const freq: Record<string, number> = {};

      if (weighting === 'phrases') {
        const pairs: string[] = [];
        for (let i = 0; i < words.length - 1; i++) {
          pairs.push(`${words[i]} ${words[i+1]}`);
        }
        [...words, ...pairs].forEach(w => { freq[w] = (freq[w] || 0) + 1; });
      } else {
        words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
      }

      const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, maxTags);
      const weighted = sorted.map(([word, count], index) => `${index + 1}. ${word} - weight ${weighting === 'balanced' ? Math.max(1, Math.ceil(count / 2)) : count}`);
      const sections = [
        { title: 'Weighted Tag Cloud', body: weighted.join('\n'), note: `${sorted.length} unique tag(s), ${weighting} weighting.` },
        { title: 'Copy-Friendly Tags', body: sorted.map(([word]) => word).join(', '), note: 'Comma-separated list for CMS or content planning.' },
        { title: 'Low-Competition Style Phrases', body: sorted.slice(0, 10).map(([word]) => `${word} ideas\n${word} tips\n${word} guide`).join('\n'), note: 'Phrase expansion without spammy repetition.' }];
      result = sections.map(section => `${section.title}\n${section.body}`).join('\n\n');
      resultHtml = renderSectionSuite('Tag Cloud Report', sections, 'Tag weights are derived from your input text only and do not claim search volume.');
      break;
    }
    case 'blog-tag-generator': {
      const built = makeDiscoveryTagGroups(text || 'technology', {
        platform: `${optionValue('blog-tag-cms', 'wordpress')} blog taxonomy`,
        hashtag: false,
        count: Number(optionValue('blog-tag-count', '8')),
        contentType: optionValue('blog-tag-intent', 'informational'),
        strategy: optionValue('blog-tag-intent', 'informational')
      });
      result = built.text;
      resultHtml = renderHashtagGroups(built.groups, 'Blog tags and categories; keep taxonomy focused so posts are not over-tagged');
      break;
    }
    case 'random-height-generator': {
      result = generateMultiple(() => {
        const inches = Math.floor(Math.random() * 24) + 54;
        const ft = Math.floor(inches / 12);
        const inR = inches % 12;
        const cm = Math.round(inches * 2.54);
        return `${ft}'${inR}" (${cm} cm)`;
      }, 10);
      break;
    }
    case 'essay-title-generator': {
      const topic = compactSeed(text, 'digital education');
      const cap = titleCase(topic);
      const type = optionValue('essay-title-type', 'all');
      const groups = [
        { title: 'Academic', text: `Understanding ${cap}: Context, Evidence, and Implications\nSubtitle option: A Review of Key Debates and Scope\nScope note: define field, period, population, or text set.\nThesis angle prompt: What does ${cap} change, reveal, or complicate?\n\nThe Role of ${cap} in Contemporary Research\nSubtitle option: Methods, Limits, and Practical Questions\nScope note: use only if the essay discusses real sources.`, note: 'Formal class or research tone.' },
        { title: 'Argumentative', text: `Why ${cap} Requires a More Practical Framework\nSubtitle option: An Argument for Clearer Criteria\nThesis angle prompt: argue what should change and why.\n\nThe Case for Rethinking ${cap}\nSubtitle option: Evidence, Tradeoffs, and Consequences\nScope note: avoid overclaiming beyond your evidence.`, note: 'Clear thesis direction.' },
        { title: 'Research', text: `${cap}: Trends, Challenges, and Future Directions\nSubtitle option: Evidence from [Field] and [Time Period]\nThesis angle prompt: identify a gap, pattern, or open question.\n\nEvaluating the Effects of ${cap} Across [Field]\nSubtitle option: A Comparative Study of [Group A] and [Group B]`, note: 'Includes clearly labeled user-fill placeholders.' },
        { title: 'Creative', text: `Beyond the Surface of ${cap}\nSubtitle option: A Reflective Essay on Change and Meaning\nThesis angle prompt: connect the topic to a personal, literary, or cultural lens.\n\nThe Hidden Tensions Behind ${cap}\nSubtitle option: What the Topic Reveals About Choice`, note: 'Better for reflective essays.' },
        { title: 'Concise', text: `${cap}: A Practical Analysis\nSubtitle option: Optional user-fill course or field\n\nRethinking ${cap}\nSubtitle option: Optional user-fill thesis angle\n\nThe Future of ${cap}\nSubtitle option: Optional user-fill scope`, note: 'Short title options.' }];
      const visibleGroups = filterGroupsByOption(groups, type);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Replace bracketed placeholders with your real field, comparison, or source focus.');
      break;
    }
    case 'ao3-tag-generator': {
      const topic = text || 'fantasy';
      const ratings = ['General Audiences','Teen And Up Audiences','Mature','Explicit'];
      const warnings = ['No Archive Warnings Apply','Creator Chose Not To Use Archive Warnings'];
      const addTags = [`Slow Burn`,`Fluff`,`Angst`,`Hurt/Comfort`,`Enemies to Lovers`,`Friends to Lovers`,`Alternate Universe`,`Found Family`,`Mutual Pining`,`Idiots in Love`,`${topic} AU`,`Canon Divergence`];
      const shuffled = [...addTags].sort(() => Math.random() - 0.5);
      result = `Rating: ${randomFrom(ratings)}\nArchive Warning: ${randomFrom(warnings)}\nFandom: [Your Fandom]\nRelationship: [Character A/Character B]\nCharacters: [Character A], [Character B]\n\nAdditional Tags:\n${shuffled.slice(0, 8).map(t => `- ${t}`).join('\n')}`;
      break;
    }
    case 'stable-diffusion-prompt-generator': {
      const subject = compactSeed(text, 'misty mountain village');
      const purpose = optionValue('sd-purpose', 'concept-art');
      const subjectType = optionValue('sd-subject-type', 'environment');
      const style = optionValue('sd-style', 'illustrative-original');
      const mood = optionValue('sd-mood', 'calm');
      const lighting = optionValue('sd-lighting', 'soft-natural');
      const composition = optionValue('sd-composition', 'layered-depth');
      const aspect = optionValue('sd-aspect', 'landscape');
      const detail = optionValue('sd-detail-level', 'balanced');
      const format = optionValue('sd-output-format', 'positive-negative');
      const safety = optionValue('sd-safety-level', 'commercial-review');
      const includeNegative = optionValue('sd-negative', 'true') === 'true';
      const seedNote = optionValue('sd-seed-note', 'true') === 'true';
      const commercialCaution = optionValue('sd-commercial-caution', 'true') === 'true';

      const cleanStyle = style.replace(/-/g, ' ');
      const cleanLighting = lighting.replace(/-/g, ' ');
      const cleanComposition = composition.replace(/-/g, ' ');
      const cleanMood = mood.replace(/-/g, ' ');

      const positivePrompt = `Positive Prompt: A high quality ${cleanStyle} of a ${subjectType} displaying ${subject}, ${cleanComposition}, ${cleanLighting} lighting, conveying a ${cleanMood} mood, ${detail} detail, aspect ratio ${aspect}`;
      const negativePrompt = `Negative Prompt: blurry, low quality, distorted anatomy, extra limbs, watermark, bad text, fake signature, low contrast, oversaturated`;

      const sections = [
        { title: 'Stable Diffusion Positive Prompt', body: positivePrompt, note: `Aspect: ${aspect}. Style: ${cleanStyle}.` },
        ...(includeNegative ? [{ title: 'Negative Prompt Parameters', body: negativePrompt, note: 'Exclude unwanted artifacts.' }] : []),
        ...(seedNote ? [{ title: 'Seed & Configuration Guideline', body: 'Recommended Settings:\n- Steps: 20-30\n- CFG Scale: 7.0\n- Sampler: DPM++ 2M Karras or Euler a\n- Seed: [Randomized; keep fixed to iterate details]', note: 'Technical setup guidance' }] : []),
        { title: 'Prompt Purpose Context', body: `Configured for ${purpose.replace(/-/g, ' ')}. Adjust terms to fit your specific generator checkpoint.`, note: 'Purpose orientation' },
        ...(commercialCaution ? [{ title: 'Commercial Use Warning', body: `Safety Review Level: ${safety}.\n- Do not include trademarked names, logos, or characters.\n- Do not copy living artists. Use broad style words.\n- Outputs may not be copyrightable under current laws.`, note: 'Legal safety guidelines' }] : [])
      ];

      result = sections.map(sec => sec.title + '\n' + sec.body).join('\n\n');
      resultHtml = renderSectionSuite('Stable Diffusion Prompt Package', sections, 'Original image-prompt drafts only. No Stable Diffusion affiliation, and no quality, safety, or commercial-use guarantee.');
      break;
    }
    case 'character-prompt-generator': {
      const seed = compactSeed(text, 'desert archivist');
      const tone = optionValue('character-prompt-tone', 'all');
      const genre = optionValue('character-prompt-genre', 'fantasy');
      const role = optionValue('character-prompt-role', 'protagonist');
      const complexity = optionValue('character-prompt-complexity', 'balanced');
      const includeScene = optionValue('character-prompt-scene', 'true') === 'true';
      const groups = [
        { title: 'Visual Design', text: `Create an original ${genre} ${role} based on ${seed}.\nAppearance: distinctive silhouette, practical clothing, one memorable accessory, readable expression, and age-appropriate design.\nPersonality cue: show one habit in posture or styling.\nMotivation hint: include one object they keep close.\nConflict cue: add one detail that does not match the rest of their look.\nComplexity: ${complexity}.\nComposition: full-body or waist-up reference pose with clear lighting.`, note: 'Best for art prompts.' },
        { title: 'Personality', text: `Character concept: ${seed} as a ${role}.\nAppearance anchor: one visual detail that suggests their routine.\nPersonality: outward habit, private fear, strongest value, social blind spot.\nMotivation: what they want this week, not just in life.\nConflict: the thing they say they believe versus what they actually do.\nVoice: write 3 sample lines that reveal mood without explaining it directly.\nComplexity: ${complexity}.`, note: 'Best for writing prompts.' },
        { title: 'Motivation', text: `Character: ${seed}.\nAppearance: practical look shaped by their daily goal.\nGoal: [clear external goal]\nNeed: [emotional change]\nConflict: someone they respect wants the opposite.\nBackstory hook: a past choice made the current goal urgent.\nChoice: force them to choose between comfort and growth.`, note: 'Includes labeled placeholders.' },
        { title: 'Conflict', text: `Build a conflict prompt for ${seed}.\nWant: something visible and achievable.\nFear: the personal cost of getting it.\nRelationship pressure: one ally asks for patience while one rival forces speed.\nScene starter: put them in a public place where hiding the truth becomes impossible.`, note: 'Scene-ready tension.' },
        { title: 'Backstory', text: `Build a concise backstory for ${seed}: origin, formative lesson, current relationship, hidden pressure, and one object they refuse to discard.\nKeep the backstory useful for present choices instead of only explaining the past.`, note: 'Story-ready structure.' },
        { title: 'Dialogue Voice', text: `Write ${seed} speaking in a voice that is specific but natural.\nInclude: greeting, refusal, confession, warning, and a line they use when cornered.\nAvoid: exposition-heavy lines, protected character imitation, or generic fantasy phrasing.`, note: 'Useful for scripts and fiction.' },
        ...(includeScene ? [{ title: 'Scene Starter', text: `Scene starter: put ${seed} in a ${genre} scene where their role as ${role} becomes inconvenient.\nOpening beat: someone asks for help they are not ready to give.\nConflict: their motivation and flaw point in opposite directions.\nEnd beat: they make a choice that reveals voice, backstory, and stakes without explaining all of it.`, note: 'Optional scene prompt.' }] : [])];
      const visibleGroups = filterGroupsByOption(groups, tone);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Use broad original directions and avoid copying protected characters or recognizable styles.');
      break;
    }
    case 'content-brief-generator': {
      const topic = (text || 'your topic').trim();
      const cap = titleCase(topic);
      const intent = optionValue('brief-intent', 'informational');
      const contentType = optionValue('brief-type', 'blog-post');
      const sections = [
        { title: 'Audience', body: `Primary reader: people evaluating or learning ${topic}\nKnowledge level: beginner to intermediate\nMain need: clear guidance, examples, and next steps`, note: 'Who the content serves' },
        { title: 'Search Intent', body: `Intent type: ${intent}\nContent type: ${contentType}\nReader question: What should I know about ${topic}, and what should I do next?`, note: 'SEO direction' },
        { title: 'Content Angle', body: `A practical, plain-language ${contentType.replace('-', ' ')} about ${topic} that reduces confusion and gives readers a usable checklist.`, note: 'Editorial angle' },
        { title: 'Recommended Word Count', body: `Recommended range: 1,500-2,200 words\nUse shorter length for simple definitions and longer length for comparisons, workflows, or examples.`, note: 'Planning estimate only' },
        { title: 'Outline', body: `H1: ${cap}: Practical Guide\nH2: What ${cap} Means\nH2: Why ${cap} Matters\nH2: How to Approach ${cap}\nH3: Step 1 - define the goal\nH3: Step 2 - choose the method\nH3: Step 3 - review results\nH2: Common Mistakes\nH2: FAQs\nH2: Final Recommendation`, note: 'Writer-ready structure' },
        { title: 'Keyword Ideas', body: `Primary: ${topic}\nSecondary: ${topic} guide, how to ${topic}, ${topic} tips, best ${topic} approach\nRelated entities: tools, examples, checklist, workflow, common mistakes`, note: 'Suggestions only, not search volume data' },
        { title: 'FAQ Ideas', body: `- What is ${topic}?\n- Who needs ${topic}?\n- How do you start with ${topic}?\n- What mistakes should readers avoid?\n- What should readers do after learning the basics?`, note: 'SERP and reader support' },
        { title: 'Internal Link Ideas', body: `Link to: beginner guide, glossary page, related tool, comparison article, checklist, case study or example page.`, note: 'Replace with real URLs' },
        { title: 'CTA', body: `CTA idea: invite readers to try a related tool, download a checklist, subscribe for more guidance, or book a consult if the page is commercial.`, note: 'Match CTA to page intent' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('SEO Content Brief', sections, 'Do not treat keyword ideas as live volume or difficulty data. Verify facts and sources before assigning.');
      break;
    }
    case 'press-release-generator': {
      const topic = compactSeed(text, 'new product launch');
      const releaseType = optionValue('press-release-type', 'standard');
      const tone = optionValue('press-release-tone', 'professional');
      const audience = optionValue('press-release-audience', 'industry media');
      const quoteStyle = optionValue('press-release-quote-style', 'executive');
      const includeBoilerplate = optionValue('press-release-boilerplate', 'true') === 'true';
      const includeContact = optionValue('press-release-media-contact', 'true') === 'true';
      const includeReview = optionValue('press-release-review', 'true') === 'true';
      const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const sections = [
        { title: 'Headline', body: `[Company Name] Announces ${titleCase(topic)} to Help [Audience] [Benefit]`, note: `${titleCase(releaseType)} announcement angle.` },
        { title: 'Subhead', body: `${titleCase(tone)} summary for ${audience}: [Company Name] introduces [verified update] for [specific audience], with availability beginning [verified date or timeline].`, note: 'Short supporting line.' },
        { title: 'Dateline', body: `[City, State], ${today} - [Company Name] today announced ${topic}, a [product/service/program/update] designed for [specific audience].`, note: 'Replace bracketed placeholders with verified details.' },
        { title: 'Lead', body: `The announcement addresses [specific problem] by offering [key capability], giving [audience] a clearer way to [desired outcome].`, note: 'Keep the first paragraph factual.' },
        { title: 'Quote Placeholder', body: `"${titleCase(topic)} reflects our focus on [mission or customer need]," said [${titleCase(quoteStyle)} Name], [Title] at [Company Name]. "We are excited to support [audience] with [specific benefit]."`, note: 'Use a real approved quote before publishing.' },
        { title: 'Body', body: `Key details include:\n- [Feature or milestone 1]\n- [Feature or milestone 2]\n- [Availability, date, location, or next step]\n\nAdditional context: [brief background, customer need, partner detail, or verified metric].`, note: 'No unsupported claims.' },
        ...(includeBoilerplate ? [{ title: 'Boilerplate', body: `About [Company Name]\n[Company Name] is a [company type] that helps [audience] [outcome]. Learn more at [website].`, note: 'Clearly labeled user-fill section.' }] : []),
        { title: 'CTA', body: `For more information, visit [website]${includeContact ? ' or contact [Media Contact Name] at [email] / [phone]' : ''}.`, note: 'Use real contact details.' },
        ...(includeReview ? [{ title: 'Claim Review Checklist', body: `Verify before sending:\n- Company name, date, location, and contact details\n- Quote approval from the named person\n- Product, event, partnership, award, or funding wording\n- Metrics, customer claims, and availability\n- Legal, financial, health, or regulatory implications`, note: 'No fake claims.' }] : [])];
      result = sections.map(section => `${section.title}\n${section.body}`).join('\n\n');
      resultHtml = renderSectionSuite('Press Release Draft', sections, 'Draft only. Verify names, dates, quotes, claims, metrics, and approvals before sending.');
      break;
    }
    case 'author-bio-generator': {
      const name = titleCase(text || 'Author Name');
      const perspective = optionValue('bio-perspective', 'third-person');
      const tone = optionValue('author-tone', 'professional');
      const pronounStart = perspective === 'first-person' ? 'I write' : `${name} writes`;
      const groups = [
        { title: 'Short', text: `${pronounStart} about [genre or topic], creating clear, thoughtful work for readers who enjoy [reader interest].`, note: `Book page or byline. Tone: ${tone}.` },
        { title: 'Medium', text: `${name} is an author focused on [genre or topic]. Their work explores [theme], [theme], and the questions that keep readers turning pages. When not writing, ${name} is usually [personal detail].`, note: 'Website or media kit' },
        { title: 'Professional', text: `${name} is a writer and subject-matter contributor in [field]. Their work helps readers understand [topic] through clear research, practical examples, and a grounded editorial voice.`, note: 'Professional profile' },
        { title: 'Casual', text: `${name} writes about [topic] with curiosity, clarity, and a soft spot for good stories. You can usually find them working on the next draft or collecting ideas for later.`, note: 'Personal site' },
        { title: 'Speaker / Guest Post', text: `${name} is an author and speaker on [topic]. For guest posts, interviews, and events, they bring a practical perspective on [theme] and [theme].`, note: 'Guest post or event intro' },
        { title: 'Social Profile', text: `${name} | author of [book/project] | writing about [topic] | notes, drafts, and useful links`, note: 'Short social bio' }];
      result = groups.map(group => `${group.title}: ${group.text}`).join('\n\n');
      resultHtml = renderBioVariations(groups);
      break;
    }
    case 'x-post-generator': {
      const posts = buildXPostSuite(text, optionValue);
      result = posts.map(post => post.title + '\n' + (post.items ?? []).join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(posts, 'Responsible post drafts only. No X/Twitter affiliation and no reach, impression, follower, ranking, engagement, viral, monetization, approval, or platform result is guaranteed.');
      break;
    }
    case 'viral-hook-generator': {
      const topic = compactSeed(text, 'better writing');
      const style = optionValue('viral-hook-style', 'all');
      const intensity = optionValue('viral-hook-intensity', 'medium');
      const platform = optionValue('viral-hook-platform', 'social');
      const contentType = optionValue('viral-hook-content-type', 'educational post');
      const includeSafety = optionValue('viral-hook-safety', 'true') === 'true';
      const promiseCheck = includeSafety ? `\nPromise check: use this on ${platform} only if the ${contentType} actually delivers a useful, specific answer about ${topic.toLowerCase()}.` : '';
      const groups = [
        { title: 'Curiosity', text: `The part of ${topic} most people skip is usually the part that makes it work.\nSafer rewrite: One overlooked part of ${topic} can make the process clearer.${promiseCheck}\n\nI changed one small part of my ${topic} process, and the result surprised me.\nSafer rewrite: This small ${topic} change made my process easier to review.${promiseCheck}`, note: `Curiosity hooks, intensity: ${intensity}.` },
        { title: 'Educational', text: `Here is the simple framework I use for ${topic}.\nSafer rewrite: A practical ${topic} framework you can adapt today.${promiseCheck}\n\nIf ${topic} feels confusing, start with these three questions.\nSafer rewrite: Three useful questions for making ${topic} clearer.${promiseCheck}`, note: 'Teaching-first hooks.' },
        { title: 'Contrarian', text: `You may not need more ${topic} advice. You may need clearer criteria.\nSafer rewrite: More advice is not always the fix; clearer criteria can help.${promiseCheck}\n\nThe popular ${topic} shortcut only works after you define the goal.\nSafer rewrite: Shortcuts work better when the ${topic} goal is already defined.${promiseCheck}`, note: 'Bold without deception.' },
        { title: 'Story', text: `I used to make ${topic} harder than it needed to be. This is what changed.\nSafer rewrite: One lesson that made my ${topic} process easier to repeat.${promiseCheck}\n\nThe mistake that finally made ${topic} click for me was surprisingly ordinary.\nSafer rewrite: A simple ${topic} mistake and the fix I now use.${promiseCheck}`, note: 'Personal angle.' },
        { title: 'List', text: `5 practical ways to make ${topic} easier today.\nSafer rewrite: 5 practical ${topic} ideas to test.${promiseCheck}\n\n3 signs your ${topic} process is too complicated.\nSafer rewrite: 3 signs your ${topic} process may need simplifying.${promiseCheck}`, note: 'Clear list starters.' },
        { title: 'Problem Solution', text: `If ${topic} feels messy, start by fixing this one step.\nSafer rewrite: If ${topic} feels messy, this is a useful first step.${promiseCheck}\n\nBefore you spend more time on ${topic}, check the brief.\nSafer rewrite: A quick brief check can improve ${topic} before you continue.${promiseCheck}`, note: 'Non-alarmist problem hooks.' },
        { title: 'CTA Safe', text: `${titleCase(topic)}, but simpler.\nSafer rewrite: Try this simpler way to approach ${topic}.${promiseCheck}\n\nSave this before your next ${topic} session.\nSafer rewrite: Keep this as a checklist for your next ${topic} session.${promiseCheck}`, note: 'Short CTA-safe variants.' }];
      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Hooks avoid misleading claims, fake stats, and manipulative urgency. Match the final post to real value.');
      break;
    }
    case 'content-calendar-generator': {
      const brand = text || 'your brand';
      const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      const themes = ['Educational','Behind-the-scenes','User spotlight','Tips & Tricks','Motivational','Product feature','Community engagement'];
      result = `CONTENT CALENDAR: ${brand}\n\nWEEK 1 THEME: Brand Awareness\n${days.slice(0, 5).map((d, i) => `${d}: ${themes[i]} post`).join('\n')}\n\nWEEK 2 THEME: Engagement\n${days.slice(0, 5).map((d, i) => `${d}: ${themes[(i + 2) % 7]} post`).join('\n')}\n\nWEEK 3 THEME: Conversion\n${days.slice(0, 5).map((d, i) => `${d}: ${themes[(i + 4) % 7]} post`).join('\n')}\n\nWEEK 4 THEME: Community\n${days.slice(0, 5).map((d, i) => `${d}: ${themes[(i + 1) % 7]} post`).join('\n')}\n\nBest Posting Times: 9 AM, 12 PM, 5 PM\nPlatform Mix: Instagram (40%), X (25%), LinkedIn (20%), TikTok (15%)`;
      break;
    }
    case 'tagline-generator': {
      const brand = compactSeed(text, 'your brand');
      const taglineStyle = optionValue('tagline-style', 'positioning');
      const taglineLength = optionValue('tagline-length', 'short');
      const groups = [
        { title: 'Brand Positioning', note: 'Evergreen homepage direction.', items: [`${brand} for people who value clarity`, `A clearer way to approach ${brand}`, `${brand} built around what matters`] },
        { title: 'Startup', note: 'Product and launch friendly.', items: [`Launch smarter with ${brand}`, `${brand} for modern builders`, `The simpler starting point for ${brand}`] },
        { title: 'Luxury', note: 'Premium but restrained.', items: [`${brand}, refined`, `Designed for a better ${brand} experience`, `Where ${brand} becomes effortless`] },
        { title: 'Friendly', note: 'Warm and approachable.', items: [`${brand} without the stress`, `Your easier way into ${brand}`, `Helpful ${brand}, made human`] },
        { title: 'Bold', note: 'Confident and punchy.', items: [`Own your ${brand}`, `Make ${brand} move`, `${brand} that gets noticed`] },
        { title: 'Minimalist', note: 'Short, quiet, and flexible.', items: [`Simply ${brand}`, `${brand}. Clearer.`, `Better by ${brand}`] }];
      result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(groups, `Selected style: ${taglineStyle}. Length: ${taglineLength}. Positioning note: taglines are evergreen brand directions; keep campaign slogans separate.`);
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
      const label = compactSeed(text, 'Shadow Text');
      const preset = optionValue('text-shadow-preset', 'soft');
      const color = optionValue('text-shadow-color', '#2563EB');
      const shadowMap: Record<string, string> = {
        soft: '0 2px 8px rgba(15, 23, 42, 0.25)',
        glow: `0 0 8px ${color}, 0 0 22px ${color}`,
        bold: '2px 2px 0 #111827, 4px 4px 0 rgba(17, 24, 39, 0.2)',
        outline: '-1px -1px 0 #111827, 1px -1px 0 #111827, -1px 1px 0 #111827, 1px 1px 0 #111827',
        retro: `3px 3px 0 ${color}, 6px 6px 0 rgba(251, 191, 36, 0.85)`
      };
      const shadow = shadowMap[preset] || shadowMap.soft;
      const css = `.text-shadow-preview {\n  color: ${preset === 'outline' ? '#ffffff' : '#111827'};\n  font-size: clamp(2rem, 8vw, 4rem);\n  font-weight: 800;\n  line-height: 1;\n  text-shadow: ${shadow};\n}`;
      const sections = [
        { title: 'Selected Text Shadow', body: `text-shadow: ${shadow};`, note: `${titleCase(preset)} preset` },
        { title: 'Full CSS', body: css, note: 'Responsive font size included' },
        { title: 'Preset Variants', body: Object.entries(shadowMap).map(([name, value]) => `${titleCase(name)}: text-shadow: ${value};`).join('\n'), note: 'Copy alternate effects' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPreviewCodeSuite('Text Shadow CSS', `<div style="display:grid;place-items:center;min-height:180px;background:#f8fafc;border-radius:10px;"><div style="color:${preset === 'outline' ? '#fff' : '#111827'};font-size:clamp(2rem,8vw,4rem);font-weight:800;line-height:1;text-shadow:${escapeHtml(shadow)};">${escapeHtml(label)}</div></div>`, sections, 'Check readability over the final background, especially for glow and outline effects.');
      break;
    }
    case 'css-grid-generator': {
      const cols = clampNumber(optionValue('grid-columns', '3'), 3, 1, 6);
      const rows = clampNumber(optionValue('grid-rows', '2'), 2, 1, 6);
      const gap = clampNumber(optionValue('grid-gap', '16'), 16, 0, 64);
      const autoFit = optionValue('grid-auto-fit', 'false') === 'true';
      const templateColumns = autoFit ? 'repeat(auto-fit, minmax(180px, 1fr))' : `repeat(${cols}, minmax(0, 1fr))`;
      const css = `.grid-layout {\n  display: grid;\n  grid-template-columns: ${templateColumns};\n  grid-template-rows: repeat(${rows}, auto);\n  gap: ${gap}px;\n}\n\n.grid-layout > * {\n  min-width: 0;\n}\n\n.grid-layout__feature {\n  grid-column: span ${Math.min(cols, 2)};\n}\n\n@media (max-width: 768px) {\n  .grid-layout {\n    grid-template-columns: 1fr;\n  }\n  .grid-layout__feature {\n    grid-column: auto;\n  }\n}`;
      const htmlSnippet = `<div class="grid-layout">\n  <section class="grid-layout__feature">Feature</section>\n  <section>Card 1</section>\n  <section>Card 2</section>\n</div>`;
      const areaMap = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => (r === 0 && c === 0 ? 'feature' : `item-${r + 1}-${c + 1}`)).join(' | ')).join('\n');
      const preview = `<div style="display:grid;grid-template-columns:${escapeHtml(templateColumns)};gap:${gap}px;">${Array.from({ length: Math.min(cols * rows, 8) }, (_, i) => `<span style="min-height:54px;border-radius:8px;background:${i === 0 ? '#2563eb' : '#dbeafe'};color:${i === 0 ? '#fff' : '#1e3a8a'};display:grid;place-items:center;font-weight:700;">${i === 0 ? 'Feature' : 'Item ' + i}</span>`).join('')}</div>`;
      result = `CSS Block\n${css}\n\nHTML Sample\n${htmlSnippet}\n\nNamed Area Map\n${areaMap}\n\nImplementation Notes\nAuto-fit: ${autoFit ? 'enabled' : 'disabled'}\nKeep children min-width: 0 to avoid overflow in tight grid tracks.`;
      resultHtml = renderPreviewCodeSuite('CSS Grid Layout', preview, [
        { title: 'CSS Block', body: css, note: `${cols} columns, ${rows} rows, ${gap}px gap` },
        { title: 'HTML Sample', body: htmlSnippet, note: 'Preview-ready markup' },
        { title: 'Named Area Map', body: areaMap, note: 'Planning map for content placement' },
        { title: 'Responsive Variant', body: css.match(/@media[\s\S]+$/)?.[0] || '', note: 'Mobile fallback' }], 'Generated CSS is static and dependency-free.');
      break;
    }
    case 'flexbox-generator': {
      const direction = optionValue('flex-direction', 'row');
      const justify = optionValue('flex-justify', 'center');
      const align = optionValue('flex-align', 'center');
      const gap = Math.max(0, Math.min(64, Number(optionValue('flex-gap', '16')) || 16));
      const wrap = optionValue('flex-wrap', 'wrap');
      const css = `.flex-layout {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  flex-wrap: ${wrap};\n  gap: ${gap}px;\n}\n\n.flex-layout > * {\n  flex: ${wrap === 'wrap' ? '1 1 160px' : '0 0 auto'};\n}`;
      const htmlSnippet = `<div class="flex-layout">\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</div>`;
      const previewItems = [1, 2, 3].map(i => `<span style="display:grid;place-items:center;min-width:72px;min-height:54px;padding:10px;border-radius:10px;background:#2563eb;color:white;font-weight:700;">Item ${i}</span>`).join('');
      const sections = [
        { title: 'Flexbox CSS', body: css, note: `${direction}, ${justify}, ${align}` },
        { title: 'HTML Markup', body: htmlSnippet, note: 'Starter structure' },
        { title: 'Responsive Note', body: wrap === 'wrap' ? 'Wrap is enabled, so items can move to a new row on smaller screens.' : 'Wrap is disabled. Watch for horizontal overflow on narrow screens.', note: 'Mobile layout' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPreviewCodeSuite('Flexbox Layout Code', `<div style="display:flex;flex-direction:${escapeHtml(direction)};justify-content:${escapeHtml(justify)};align-items:${escapeHtml(align)};flex-wrap:${escapeHtml(wrap)};gap:${gap}px;min-height:190px;background:#eef2ff;border-radius:10px;padding:18px;">${previewItems}</div>`, sections, 'Use this as a layout starter and rename classes to match your project.');
      break;
    }
    case 'html-table-generator': {
      const rowCount = Math.max(1, Math.min(20, Number(optionValue('table-rows', '4')) || 4));
      const colCount = Math.max(1, Math.min(8, Number(optionValue('table-columns', '3')) || 3));
      const includeHeader = optionValue('table-header', 'true') === 'true';
      const striped = optionValue('table-striped', 'true') === 'true';
      const border = optionValue('table-border', 'light');
      const headers = Array.from({ length: colCount }, (_, i) => `Column ${i + 1}`);
      const rows = Array.from({ length: rowCount }, (_, r) => headers.map((_, c) => `Row ${r + 1} Cell ${c + 1}`));
      const borderCss = border === 'none' ? 'border: 0;' : border === 'strong' ? 'border: 1px solid #111827;' : 'border: 1px solid #d1d5db;';
      const html = `<div class="table-wrap">\n<table class="generated-table">\n${includeHeader ? `  <thead>\n    <tr>\n${headers.map(h => `      <th>${escapeHtml(h)}</th>`).join('\n')}\n    </tr>\n  </thead>\n` : ''}  <tbody>\n${rows.map(row => `    <tr>\n${row.map(cell => `      <td>${escapeHtml(cell)}</td>`).join('\n')}\n    </tr>`).join('\n')}\n  </tbody>\n</table>\n</div>`;
      const css = `.table-wrap { overflow-x: auto; }\n.generated-table { width: 100%; border-collapse: collapse; }\n.generated-table th,\n.generated-table td { padding: 12px; text-align: left; ${borderCss} }\n.generated-table th { background: #f3f4f6; font-weight: 700; }\n${striped ? '.generated-table tbody tr:nth-child(even) { background: #f9fafb; }' : ''}`;
      result = html + '\n\n<style>\n' + css + '\n</style>';
      resultHtml = `<div class="html-table-premium"><div class="table-preview-wrap"><table class="generated-table-preview">${includeHeader ? '<thead><tr>' + headers.map(h => '<th>' + escapeHtml(h) + '</th>').join('') + '</tr></thead>' : ''}<tbody>${rows.map(row => '<tr>' + row.map(cell => '<td>' + escapeHtml(cell) + '</td>').join('') + '</tr>').join('')}</tbody></table></div></div>` + renderSectionSuite('HTML Table Code', [
        { title: 'HTML', body: html, note: `${rowCount} row(s), ${colCount} column(s).` },
        { title: 'CSS', body: css, note: `${striped ? 'Striped' : 'Plain'} rows with ${border} borders.` }], 'Accessibility note: use tables for tabular data, not page layout. Add real headers and captions before publishing.');
      break;
    }
    case 'dummy-data-generator': {
      const dataset = optionValue('dummy-dataset', 'users');
      const format = optionValue('dummy-format', 'json');
      const count = clampNumber(optionValue('dummy-rows', '5'), 5, 1, 20);
      const rows = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: ['Avery Stone', 'Jordan Lee', 'Morgan Patel', 'Riley Brooks', 'Taylor Chen'][i % 5],
        email: `user${i + 1}@example.test`,
        address: `${100 + i} Sample Street`,
        product: ['Notebook', 'Canvas Bag', 'Desk Lamp', 'Water Bottle', 'Cable Kit'][i % 5],
        total: Number((19 + i * 7.5).toFixed(2)),
        createdAt: `2026-01-${String(i + 1).padStart(2, '0')}`}));
      const selectedRows = rows.map(row => dataset === 'products' ? { id: row.id, name: row.product, sku: `SKU-${String(row.id).padStart(3, '0')}`, price: row.total } : dataset === 'orders' ? { id: row.id, customerEmail: row.email, total: row.total, createdAt: row.createdAt } : { id: row.id, name: row.name, email: row.email, address: row.address });
      const csv = Object.keys(selectedRows[0]).join(',') + '\n' + selectedRows.map(row => Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
      const json = JSON.stringify(selectedRows, null, 2);
      const sql = selectedRows.map(row => `INSERT INTO ${safeIdent(dataset)} (${Object.keys(row).join(', ')}) VALUES (${Object.values(row).map(value => typeof value === 'number' ? value : `'${String(value).replace(/'/g, "''")}'`).join(', ')});`).join('\n');
      const ts = `export const ${safeIdent(dataset)}Fixture = ${json} as const;`;
      const schema = Object.keys(selectedRows[0]).map(key => `${key}: ${typeof (selectedRows[0] as Record<string, unknown>)[key]}`).join('\n');
      const selected = format === 'csv' ? csv : format === 'sql' ? sql : format === 'typescript' ? ts : json;
      result = `Dataset Summary\nDataset: ${dataset}\nRows: ${count}\nFictional data only\n\nSelected Output\n${selected}\n\nSchema Map\n${schema}`;
      resultHtml = renderSectionSuite('Dummy Data Fixture', [
        { title: 'JSON', body: json, note: 'Structured fixture' },
        { title: 'CSV', body: csv, note: 'Spreadsheet-friendly' },
        { title: 'SQL Inserts', body: sql, note: 'Escaped insert examples' },
        { title: 'TypeScript Fixture', body: ts, note: 'Copy into tests' },
        { title: 'Schema Map', body: schema, note: 'Field overview' }], 'All values are fictional examples for testing and should not be treated as real personal data.');
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
      const streets = ['Oak','Maple','Cedar','Pine','Elm','Main','Washington','Lincoln','Park','Lake','Sunset','Broadway'];
      const types = ['St','Ave','Blvd','Dr','Ln','Rd','Way','Ct','Pl'];
      const cities = ['Springfield','Portland','Austin','Denver','Seattle','Miami','Boston','Chicago','Phoenix','Atlanta','Dallas','Nashville'];
      const states = ['CA','TX','NY','FL','IL','PA','OH','GA','NC','MI','WA','CO'];
      result = generateMultiple(() => {
        const num = Math.floor(Math.random() * 9000) + 100;
        const zip = Math.floor(Math.random() * 90000) + 10000;
        return `${num} ${randomFrom(streets)} ${randomFrom(types)}, ${randomFrom(cities)}, ${randomFrom(states)} ${zip}`;
      }, 8);
      break;
    }
    case 'raffle-generator': {
      const rawEntries = text.split(/[\n]+/).map(item => item.trim()).filter(Boolean);
      const sample = ['Avery Stone', 'Jordan Lee', 'Morgan Patel', 'Riley Chen', 'Taylor Brooks', 'Casey Rivera', 'Sam Carter', 'Jamie Quinn'];
      const dedupe = optionValue('raffle-dedupe', 'true') === 'true';
      const entries = dedupe ? Array.from(new Set(rawEntries.length ? rawEntries : sample)) : (rawEntries.length ? rawEntries : sample);
      const winnerCount = Math.min(entries.length, Math.max(1, Math.min(20, Number(optionValue('raffle-winners', '1')) || 1)));
      const alternateCount = Math.min(Math.max(0, Math.min(10, Number(optionValue('raffle-alternates', '2')) || 2)), Math.max(0, entries.length - winnerCount));
      const purpose = optionValue('raffle-purpose', 'community');
      const shuffled = [...entries].sort(() => Math.random() - 0.5);
      const winners = shuffled.slice(0, winnerCount);
      const alternates = shuffled.slice(winnerCount, winnerCount + alternateCount);
      const sections = [
        { title: 'Winner Draw', body: winners.map((winner, index) => `${index + 1}. ${winner}`).join('\n'), note: `${winnerCount} winner(s) selected.` },
        { title: 'Alternate Picks', body: alternates.length ? alternates.map((winner, index) => `${index + 1}. ${winner}`).join('\n') : 'No alternates requested for this draw.', note: 'Use only if a selected winner is unavailable.' },
        { title: 'Public Result Copy', body: `Draw type: ${titleCase(purpose)}\nSelected winner${winners.length > 1 ? 's' : ''}: ${winners.join(', ')}\nBackup pick${alternates.length === 1 ? '' : 's'}: ${alternates.length ? alternates.join(', ') : 'None'}\nEntry count reviewed: ${entries.length}`, note: 'Copyable announcement.' },
        { title: 'Transparent Draw Note', body: `Entries were cleaned from the submitted list${dedupe ? ' with duplicate names removed' : ''}. The picker uses browser-side random selection for an informal draw. Follow your own event, school, team, or promotion rules before announcing results.`, note: 'No gambling or legal compliance claim.' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Fair Raffle Result', sections, 'No gambling framing: use this for informal or policy-governed winner selection only.');
      break;
    }
    case 'giveaway-generator': {
      if (!text) { result = 'Enter names/entries separated by commas above.'; break; }
      const entries = text.split(',').map(s => s.trim()).filter(Boolean);
      if (entries.length < 2) { result = 'Please enter at least 2 entries separated by commas.'; break; }
      const shuffled = [...entries].sort(() => Math.random() - 0.5);
      const numWinners = Math.min(3, entries.length);
      result = `Total Entries: ${entries.length}\n\n\uD83C\uDFC6 WINNERS:\n${shuffled.slice(0, numWinners).map((w, i) => `${['\uD83E\uDD47','\uD83E\uDD48','\uD83E\uDD49'][i] || (i+1+'.')} ${w}`).join('\n')}\n\nAll Entries (randomized):\n${shuffled.map((e, i) => `${i + 1}. ${e}`).join('\n')}\n\n(Click Generate again for a new random draw!)`;
      break;
    }
    case 'character-backstory-generator': {
      const seed = compactSeed(text, 'quiet mapmaker');
      const focus = optionValue('backstory-focus', 'all');
      const depth = optionValue('backstory-depth', 'balanced');
      const role = optionValue('backstory-role', 'wanderer');
      const groups = [
        { title: 'Origin', text: `${titleCase(seed)} began as a ${role} shaped by two places: one that taught patience and one that rewarded quick decisions.\nTimeline:\n- Early life: learned to notice what others overlook.\n- Formative event: a small choice became public consequence.\n- Present day: carries proof, guilt, or duty into every new room.\nDepth: ${depth}.`, note: 'Foundation for voice and skills.' },
        { title: 'Motivation', text: `Public motivation: prove that careful work can prevent harm before it begins.\nPrivate desire: forgiveness from someone who may never offer it.\nFear: being trusted again and failing at the exact wrong moment.\nValue: truth with context, not truth used as a weapon.`, note: 'External and internal drive.' },
        { title: 'Flaw', text: `Core flaw: they confuse preparation with control.\nHow it appears: when plans break, they withdraw, overexplain, or take responsibility that belongs to the group.\nGrowth direction: trust someone before the perfect plan exists.`, note: 'Useful for character growth.' },
        { title: 'Goal', text: `Current goal: find the missing piece of a record, map, or promise tied to ${seed} before someone powerful rewrites the truth.\nStory use: this goal can drive a scene, quest, chapter, or campaign arc.`, note: 'Plot-ready objective.' },
        { title: 'Secret', text: `Secret: they once altered a detail to protect someone.\nWhy it matters: the choice saved a life, but it also started the conflict they are trying to solve now.\nReveal hook: someone else has the original version.`, note: 'Stakes without exploitative detail.' },
        { title: 'Relationship Hooks', text: `Ally: someone who trusts their judgment too much.\nRival: someone harmed by their old choice.\nMentor: someone who taught the right lesson for the wrong reason.\nDependent: someone who only knows the public version of the story.\nScene prompt: force two of these people into the same room with ${seed}.`, note: 'Connections for scenes.' }];
      const visibleGroups = filterGroupsByOption(groups, focus);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Backstories are draft seeds. Adjust tone, age, relationships, and stakes for your story.');
      break;
    }
    case 'worldbuilding-generator': {
      const seed = compactSeed(text, 'floating city');
      const genre = optionValue('world-genre', 'all');
      const scale = optionValue('world-scale', 'region');
      const techLevel = optionValue('world-tech-level', 'medium');
      const includeConflicts = optionValue('world-conflicts', 'true') === 'true';
      const sections = [
        { title: 'Geography', body: `Scale: ${scale}\nGenre: ${titleCase(genre === 'all' ? 'fantasy' : genre)}\n${titleCase(seed)} is built around one defining physical constraint: travel, food, shelter, or weather requires a local solution.\nRegions:\n- Safe center with political visibility\n- Resource edge with daily risk\n- Forgotten zone with evidence of the old world\nMap-free note: describe routes, borders, and travel costs without needing an image.`, note: 'Usable location logic.' },
        { title: 'Culture', body: `Daily life values [shared value], but outsiders notice [custom]. Status comes from [skill, service, lineage, or craft], not just wealth.\nRespect note: keep cultural details specific to this fictional world rather than lifting real-world cultures superficially.`, note: 'Labeled placeholders for user fill.' },
        { title: 'Economy', body: `The economy depends on one scarce resource from ${seed}. Trade routes create opportunity, while shortages create tension between workers, guilds, families, and leadership.\nEveryday cost: one ordinary item is expensive because of the world's core constraint.\nBlack market risk: a useful substitute exists, but it creates a new problem.`, note: 'Makes the setting usable.' },
        ...(includeConflicts ? [{ title: 'Conflict', body: `Main conflict: a practical survival need is turning into a political fight.\nPublic issue: who controls the scarce resource.\nPrivate issue: who already knew the danger was coming.\nEach side has a defensible reason, which keeps the conflict from feeling one-sided.`, note: 'Story-ready tension.' }] : []),
        { title: 'History', body: `A celebrated founding event is partly false. The official version protects stability, while the hidden version explains current unrest.\nTimeline:\n- Founding compromise\n- Prosperous silence\n- Recent shortage\n- First public contradiction`, note: 'Built-in mystery.' },
        { title: 'Factions', body: `Faction 1: public order and tradition.\nFaction 2: trade, innovation, and risk.\nFaction 3: overlooked locals who know the real cost of both sides.\nFaction 4: scholars, engineers, or mages working at ${techLevel} magic/tech level.\nHook: each faction can help the protagonist once and betray an expectation once.`, note: 'Useful for plots and quests.' },
        { title: 'Rules And Consistency', body: `Magic/tech level: ${techLevel}\nRule 1: every powerful method has a visible cost.\nRule 2: travel changes relationships, not just location.\nRule 3: history should explain current shortages, conflicts, and taboos.\nConsistency checklist: resources, laws, rituals, daily life, factions, conflict, and consequences should all point back to the same world logic.`, note: 'Prevents random lore.' },
        { title: 'Story Hooks', body: `- A courier finds the hidden version of the founding story.\n- A faction asks for help solving a shortage without public panic.\n- A child knows a route adults insist does not exist.\n- A festival repeats a ritual whose original purpose was erased.`, note: 'Campaign and fiction hooks.' }];
      result = sections.map(section => `${section.title}\n${section.body}`).join('\n\n');
      resultHtml = renderSectionSuite('Worldbuilding Framework', sections, 'Keep cultural details original and specific. Review for respectful, non-stereotyped portrayal before publishing.');
      break;
    }
    case 'quiz-generator': {
      const topic = compactSeed(text, 'general knowledge');
      const mode = optionValue('quiz-mode', 'multiple-choice');
      const difficulty = optionValue('quiz-difficulty', 'medium');
      const count = Math.max(3, Math.min(12, Number(optionValue('quiz-count', '5')) || 5));
      const includeExplanations = optionValue('quiz-explanations', 'true') === 'true';
      const stems = [
        `Which statement best explains the core idea of ${topic}?`,
        `What is a practical example of ${topic} in use?`,
        `Why does ${topic} matter for learners or teams?`,
        `Which step should come first when studying ${topic}?`,
        `What common mistake should people avoid with ${topic}?`,
        `How can someone check their understanding of ${topic}?`,
        `Which detail would make a ${topic} explanation stronger?`,
        `What is the best review habit for ${topic}?`,
        `How does ${topic} connect to real-world problem solving?`,
        `What question should a beginner ask about ${topic}?`,
        `Which resource would support deeper practice with ${topic}?`,
        `What outcome shows progress with ${topic}?`
      ].slice(0, count);
      const questions = stems.map((stem, index) => {
        if (mode === 'true-false') return `Q${index + 1}. True or false: ${stem.replace('Which statement best explains', 'A clear explanation can identify')}\nAnswer: True`;
        if (mode === 'short-answer') return `Q${index + 1}. ${stem}\nExpected answer: A clear response should name the main idea, give one accurate detail, and connect it back to ${topic}.`;
        return `Q${index + 1}. ${stem}\nA) A vague opinion with no example\nB) A clear answer with one accurate example\nC) A random fact unrelated to the topic\nD) A memorized phrase with no explanation`;
      });
      const answerKey = stems.map((_, index) => mode === 'multiple-choice' ? `${index + 1}. B` : mode === 'true-false' ? `${index + 1}. True` : `${index + 1}. Check for main idea, accurate detail, and topic connection`).join('\n');
      const sections = [
        { title: 'Quiz Questions', body: questions.join('\n\n'), note: `${titleCase(mode.replace(/-/g, ' '))}, ${difficulty} difficulty.` },
        { title: 'Answer Key', body: answerKey, note: 'Keep with the teacher or facilitator copy.' },
        ...(includeExplanations ? [{ title: 'Explanation Guide', body: `Each correct answer should connect directly to ${topic}, include one concrete example, and avoid unsupported claims. For ${difficulty} difficulty, ask learners to explain why other answers are weaker.`, note: 'Use for review.' }] : [])];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Structured Quiz Pack', sections, 'Educational draft: verify factual accuracy before classroom, training, or assessment use.');
      break;
    }
    case 'thesis-statement-generator': {
      const topic = compactSeed(text, 'Technology In Education');
      const essayType = optionValue('thesis-essay-type', 'argumentative');
      const stance = optionValue('thesis-stance', 'balanced');
      const level = optionValue('thesis-level', 'college');
      const counter = optionValue('thesis-include-counterargument', 'true') === 'true';
      const claim = `${topic} should be evaluated through evidence, context, and practical effects`;
      const reason = stance === 'strong' ? 'because it shapes outcomes in measurable and unequal ways' : stance === 'cautious' ? 'because its benefits depend on setting, access, and implementation' : 'because it creates both opportunities and limitations that deserve careful analysis';
      const scope = `${titleCase(level.replace(/-/g, ' '))} ${essayType.replace(/-/g, ' ')} essay focused on one audience, time period, or case study`;
      const sections = [
        { title: 'Primary Thesis', body: `${claim} ${reason}.`, note: `${titleCase(essayType.replace(/-/g, ' '))} thesis` },
        { title: 'Thesis Variants', body: `Argumentative: ${topic} requires a clearer position because its effects depend on who benefits, who carries the costs, and what safeguards exist.\nAnalytical: ${topic} reveals a tension between promise and practice, especially when examined through evidence, access, and long-term outcomes.\nCompare/Contrast: Compared with traditional approaches, ${topic} offers new flexibility but also introduces tradeoffs in reliability, fairness, and accountability.\nCause/Effect: The growth of ${topic} affects learners, institutions, or communities by changing expectations, resources, and decision-making patterns.`, note: 'Mode-aware options' },
        ...(counter ? [{ title: 'Counterargument-Aware Version', body: `Although critics may argue that ${topic.toLowerCase()} is too broad or context-dependent, a focused analysis shows that ${reason}.`, note: 'Use when the essay addresses objections' }] : []),
        { title: 'Claim Breakdown', body: `Claim: ${claim}\nReason: ${reason}\nScope: ${scope}\nEvidence to look for: examples, data, scholarly arguments, policy details, or close reading from assigned material`, note: 'Thesis anatomy' },
        { title: 'Improved Version', body: `A stronger thesis should name the specific group, setting, and outcome: In Optional user-fill setting, ${topic.toLowerCase()} should be assessed by its effect on Optional user-fill group because Optional user-fill evidence shows a clear pattern worth arguing.`, note: 'Revision model' },
        { title: 'Outline Starter', body: `1. Define the focused context for ${topic}\n2. Present the main reason and evidence\n3. Address a counterargument or limitation\n4. Explain the significance of the claim`, note: 'Drafting support' }
      ];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Thesis Statement Suite', sections, 'Use as drafting help. Add your own evidence and follow your instructor or style requirements.');
      break;
    }
    case 'landing-page-copy-generator': {
      const offer = compactSeed(text, 'Project Management Tool');
      const goal = optionValue('landing-page-goal', 'lead');
      const stage = optionValue('landing-funnel-stage', 'warm');
      const tone = optionValue('landing-tone', 'clear');
      const cta = goal === 'ecommerce' ? `Shop ${offer}` : goal === 'saas' ? `Start Exploring ${offer}` : goal === 'service' ? `Book A ${offer} Call` : `Get The ${offer} Guide`;
      const toneLine = tone === 'premium' ? 'polished and concise' : tone === 'friendly' ? 'warm and reassuring' : 'clear and direct';
      const sections = [
        { title: 'Hero Headline', body: `${offer} For A Clearer Next Step`, note: `${titleCase(stage)} audience` },
        { title: 'Subheadline', body: `Help visitors understand what ${offer.toLowerCase()} does, why it matters, and how to move forward without exaggerated promises.`, note: `Tone: ${toneLine}` },
        { title: 'Benefits', body: `- Makes the offer easier to compare\n- Turns key details into a simple decision path\n- Reduces uncertainty with clear, verifiable information\n- Gives visitors one obvious next step`, note: 'Benefit section' },
        { title: 'Features', body: `- Clear overview section for ${offer}\n- Benefit-focused copy blocks\n- Optional user-fill proof area for verified logos, reviews, or metrics\n- FAQ prompts for common objections\n- CTA section matched to ${goal}`, note: 'Feature section' },
        { title: 'Social Proof Placeholder', body: 'Optional user-fill placeholder: add verified customer quotes, real review snippets, recognizable client logos, press mentions, or measured results only when you have permission and evidence.', note: 'No fake testimonials' },
        { title: 'CTA', body: `${cta}\nSee How It Works\nCompare The Details`, note: 'Primary and secondary CTA options' },
        { title: 'FAQ Prompts', body: `- Who is ${offer} best for?\n- What details should a visitor know before choosing?\n- How does the process work?\n- What should shoppers or leads prepare before the next step?\n- What proof or policy details can you verify?`, note: 'Objection handling' },
        { title: 'Safety Checklist', body: 'Avoid fake testimonials, false urgency, invented metrics, guaranteed outcomes, and restricted-industry claims. Keep social proof clearly tied to verified evidence.', note: 'AdSense-safe review' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Landing Page Copy System', sections, `Goal: ${goal}. Funnel stage: ${stage}.`);
      break;
    }
    case 'json-schema-generator': {
      const name = compactSeed(text, 'item');
      const schemaName = titleCase(name).replace(/[^A-Za-z0-9]/g, '') || 'Item';
      const mode = optionValue('json-schema-mode', 'profile');
      const strict = optionValue('json-schema-strict', 'true') === 'true';
      const includeExamples = optionValue('json-schema-examples', 'true') === 'true';
      const fieldsByMode: Record<string, Array<{ key: string; type: string; required: boolean; extra?: Record<string, unknown>; example: unknown }>> = {
        profile: [
          { key: 'id', type: 'string', required: true, extra: { minLength: 1 }, example: 'user_123' },
          { key: 'name', type: 'string', required: true, extra: { minLength: 1 }, example: 'Alex Morgan' },
          { key: 'email', type: 'string', required: true, extra: { format: 'email' }, example: 'alex@example.com' },
          { key: 'active', type: 'boolean', required: false, example: true }],
        product: [
          { key: 'sku', type: 'string', required: true, example: 'SKU-001' },
          { key: 'name', type: 'string', required: true, example: name },
          { key: 'price', type: 'number', required: true, extra: { minimum: 0 }, example: 49.99 },
          { key: 'inStock', type: 'boolean', required: false, example: true }],
        article: [
          { key: 'title', type: 'string', required: true, example: name },
          { key: 'slug', type: 'string', required: true, example: toSafeHandle(name, 'article') },
          { key: 'publishedAt', type: 'string', required: true, extra: { format: 'date-time' }, example: new Date().toISOString() },
          { key: 'tags', type: 'array', required: false, extra: { items: { type: 'string' } }, example: ['example'] }]};
      const fields = fieldsByMode[mode] || fieldsByMode.profile;
      const schema = {
        '$schema': 'https://json-schema.org/draft/2020-12/schema',
        title: schemaName,
        type: 'object',
        properties: Object.fromEntries(fields.map(field => [field.key, { type: field.type, description: `${titleCase(field.key)} field`, ...(field.extra || {}) }])),
        required: fields.filter(field => field.required).map(field => field.key),
        additionalProperties: !strict};
      const example = Object.fromEntries(fields.map(field => [field.key, field.example]));
      const schemaJson = JSON.stringify(schema, null, 2);
      const sections = [
        { title: 'JSON Schema', body: schemaJson, note: `${schemaName} schema draft.` },
        ...(includeExamples ? [{ title: 'Example JSON', body: JSON.stringify(example, null, 2), note: 'Use to test the schema shape.' }] : []),
        { title: 'Required Fields', body: schema.required.join('\n') || 'None', note: 'Required array included in schema.' }];
      result = schemaJson;
      resultHtml = renderSectionSuite('JSON Schema Draft', sections, 'Validation note: test this with your target JSON Schema draft/version and runtime validator before relying on it.');
      break;
    }
    case 'typescript-type-generator': {
      const root = toPascal(optionValue('ts-root-name', text || 'UserProfile'), 'GeneratedItem');
      const fields = parseFieldList(text, ['id', 'name', 'email', 'active', 'created_at']);
      const style = optionValue('ts-style', 'interface');
      const optional = optionValue('ts-optional-fields', 'false') === 'true';
      const readonly = optionValue('ts-readonly', 'false') === 'true' ? 'readonly ' : '';
      const infer = (field: string) => field.includes('id') ? 'number' : field.includes('active') || field.includes('enabled') ? 'boolean' : field.includes('at') || field.includes('date') ? 'string' : 'string';
      const lines = fields.map(field => `  ${readonly}${field}${optional ? '?' : ''}: ${infer(field)};`).join('\n');
      const ts = style === 'type' ? `export type ${root} = {\n${lines}\n};` : `export interface ${root} {\n${lines}\n}`;
      const sample = JSON.stringify(Object.fromEntries(fields.map(field => [field, infer(field) === 'number' ? 1 : infer(field) === 'boolean' ? true : field.includes('email') ? 'user@example.test' : `sample ${field}`])), null, 2);
      const table = fields.map(field => `${field} | ${infer(field)} | ${optional ? 'optional' : 'required'}`).join('\n');
      result = `Generated TypeScript\n${ts}\n\nInferred Field Table\n${table}\n\nSample Object\n${sample}\n\nUsage Snippet\nconst item: ${root} = ${sample};`;
      resultHtml = renderSectionSuite('TypeScript Type Draft', [
        { title: 'Generated TypeScript', body: ts, note: `${style} draft` },
        { title: 'Inferred Field Table', body: table, note: 'Review inference decisions' },
        { title: 'Sample Object', body: sample, note: 'Aligned sample data' },
        { title: 'Usage Snippet', body: `const item: ${root} = ${sample};`, note: 'Copy into a test file' }], 'Review generated types before using them as production API contracts.');
      break;
    }
    case 'sql-query-generator': {
      const table = safeIdent(text || 'users');
      const queryType = optionValue('sql-query-type', 'select');
      const limit = clampNumber(optionValue('sql-limit', '10'), 10, 1, 100);
      const columns = parseFieldList(optionValue('sql-columns', 'id, name, email, created_at'), ['id', 'name', 'email', 'created_at']);
      const where = 'id = :id';
      const queries: Record<string, string> = {
        select: `SELECT ${columns.join(', ')}\nFROM ${table}\nWHERE ${where}\nORDER BY created_at DESC\nLIMIT ${limit};`,
        insert: `INSERT INTO ${table} (${columns.filter(c => c !== 'id').join(', ')})\nVALUES (${columns.filter(c => c !== 'id').map(c => ':' + c).join(', ')});`,
        update: `UPDATE ${table}\nSET ${columns.filter(c => c !== 'id').slice(0, 2).map(c => `${c} = :${c}`).join(', ')}\nWHERE ${where};`};
      const parameterized = queries[queryType] || queries.select;
      const plain = parameterized.replace(/:id/g, '1').replace(/:name/g, "'Example Name'").replace(/:email/g, "'user@example.test'").replace(/:created_at/g, "'2026-01-01'");
      const params = columns.map(c => `:${c} -> ${c === 'id' ? '1' : c.includes('email') ? 'user@example.test' : 'sample value'}`).join('\n');
      const checklist = '- Prefer parameterized queries in application code.\n- Review indexes for filtered and sorted columns.\n- UPDATE output includes a WHERE clause by default.\n- This tool only drafts SQL; it never runs queries.';
      result = `Parameterized SQL\n${parameterized}\n\nPlain SQL Preview\n${plain}\n\nParameter Map\n${params}\n\nSafety Checklist\n${checklist}`;
      resultHtml = renderSectionSuite('SQL Query Draft', [
        { title: 'Parameterized SQL', body: parameterized, note: `${queryType} template` },
        { title: 'Plain SQL Preview', body: plain, note: 'Readable example only' },
        { title: 'Parameter Map', body: params, note: 'Bind these in your app' },
        { title: 'Safety Checklist', body: checklist, note: 'No destructive default' }]);
      break;
    }
    case 'htaccess-generator': {
      const domain = (text || 'example.com').replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const https = optionValue('htaccess-https', 'true') === 'true';
      const www = optionValue('htaccess-www', 'non-www');
      const cache = optionValue('htaccess-cache', 'month');
      const redirect = `RewriteEngine On\n${https ? 'RewriteCond %{HTTPS} off [OR]\n' : ''}RewriteCond %{HTTP_HOST} ${www === 'www' ? `^${domain.replace(/^www\./, '')}$ [NC]` : `^www\\.${domain.replace(/^www\./, '')}$ [NC]`}\nRewriteRule ^(.*)$ ${https ? 'https' : 'http'}://${www === 'www' ? 'www.' + domain.replace(/^www\./, '') : domain.replace(/^www\./, '')}/$1 [L,R=301]`;
      const cacheBlock = `<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresByType text/css "access plus 1 ${cache}"\n  ExpiresByType application/javascript "access plus 1 ${cache}"\n  ExpiresByType image/webp "access plus 1 year"\n</IfModule>`;
      const security = `<IfModule mod_headers.c>\n  Header set X-Content-Type-Options "nosniff"\n  Header set Referrer-Policy "strict-origin-when-cross-origin"\n</IfModule>`;
      const full = `# Redirects first\n${redirect}\n\n# Cache headers\n${cacheBlock}\n\n# Security headers\n${security}\n\n# Custom error page\nErrorDocument 404 /404.html`;
      const checklist = '- Back up the current .htaccess file before editing.\n- Test in staging or during a low-traffic window.\n- Confirm mod_rewrite, mod_expires, and mod_headers are available on your host.\n- Remove conflicting redirects before publishing.';
      result = `Generated .htaccess\n${full}\n\nRedirect Only\n${redirect}\n\nCache Only\n${cacheBlock}\n\nTest Checklist\n${checklist}`;
      resultHtml = renderSectionSuite('.htaccess Rule Set', [
        { title: 'Generated .htaccess Block', body: full, note: 'Redirects before cache/security rules' },
        { title: 'Redirect-Only Block', body: redirect, note: `${www} preference` },
        { title: 'Cache-Only Block', body: cacheBlock, note: `${cache} cache setting` },
        { title: 'Test Checklist', body: checklist, note: 'Server availability caution' }], 'Server config can affect availability; test carefully and keep a rollback copy.');
      break;
    }
    case 'pwa-manifest-generator': {
      const app = text || 'My App';
      const display = optionValue('pwa-display', 'standalone');
      const theme = optionValue('pwa-theme-color', '#2563EB');
      const bg = optionValue('pwa-background-color', '#FFFFFF');
      const manifest = JSON.stringify({ name: app, short_name: app.slice(0, 12), start_url: '/', scope: '/', display, background_color: bg, theme_color: theme, icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }], shortcuts: [{ name: 'Open App', url: '/', icons: [{ src: '/icons/shortcut-96.png', sizes: '96x96' }] }] }, null, 2);
      const link = '<link rel="manifest" href="/manifest.webmanifest">';
      const checklist = '- Provide real 192x192 and 512x512 PNG icons.\n- Serve the manifest with the correct content type.\n- Confirm start_url and scope match your deployed paths.\n- Installability also depends on HTTPS and service worker setup.';
      result = `Manifest JSON\n${manifest}\n\nHTML Head Snippet\n${link}\n\nIcon Checklist\n${checklist}`;
      resultHtml = renderSectionSuite('PWA Manifest Package', [
        { title: 'Manifest JSON', body: manifest, note: `${display} display mode` },
        { title: 'HTML Link Tag', body: link, note: 'Place in the document head' },
        { title: 'Icon Checklist', body: checklist, note: 'User-fill icon assets' },
        { title: 'Shortcuts JSON', body: JSON.stringify(JSON.parse(manifest).shortcuts, null, 2), note: 'Optional manifest shortcut' }], 'This plans manifest text only; it does not generate icon files.');
      break;
    }
    case 'form-generator': {
      const purpose = optionValue('form-purpose', 'contact');
      const method = optionValue('form-method', 'post').toUpperCase();
      const fields = purpose === 'signup' ? ['email', 'name', 'company'] : purpose === 'feedback' ? ['name', 'rating', 'message'] : parseFieldList(text, ['name', 'email', 'message']);
      const html = `<form action="/submit" method="${method}">\n  <fieldset>\n    <legend>${titleCase(purpose)} Form</legend>\n${fields.map(field => `    <label for="${field}">${titleCase(field.replace(/_/g, ' '))}${field === 'email' || field === 'message' ? ' *' : ''}</label>\n    <${field === 'message' ? 'textarea' : 'input'} id="${field}" name="${field}"${field === 'message' ? ' rows="4"' : ` type="${field === 'email' ? 'email' : field === 'rating' ? 'number' : 'text'}"`}${field === 'email' || field === 'message' ? ' required' : ''}>${field === 'message' ? '</textarea>' : ''}`).join('\n')}\n    <button type="submit">Submit</button>\n  </fieldset>\n</form>`;
      const css = `.generated-form { display: grid; gap: 12px; max-width: 520px; }\n.generated-form input,\n.generated-form textarea { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; }`;
      const summary = fields.map(field => `${field}: label, id, name${field === 'email' || field === 'message' ? ', required' : ''}`).join('\n');
      const validation = '- Labels are paired with matching id values.\n- Required fields use the required attribute.\n- Generated form is a template and does not transmit data until wired to your backend.';
      result = `HTML Form\n${html}\n\nOptional CSS\n${css}\n\nField Summary\n${summary}\n\nValidation Notes\n${validation}`;
      resultHtml = renderSectionSuite('HTML Form Template', [
        { title: 'HTML', body: html, note: `${purpose} form` },
        { title: 'CSS', body: css, note: 'Optional light styling' },
        { title: 'Field Summary', body: summary, note: 'Accessibility labels included' },
        { title: 'Validation Messages', body: validation, note: 'Template-only note' }]);
      break;
    }
    case 'jwt-generator': {
      const header = btoa(JSON.stringify({alg:'HS256',typ:'JWT'}));
      const payload = btoa(JSON.stringify({sub:String(Math.floor(Math.random()*9000)+1000),name:'John Doe',iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+3600}));
      result = `HEADER:\n{"alg": "HS256", "typ": "JWT"}\n\nPAYLOAD:\n{\n  "sub": "${Math.floor(Math.random()*9000)+1000}",\n  "name": "John Doe",\n  "iat": ${Math.floor(Date.now()/1000)},\n  "exp": ${Math.floor(Date.now()/1000)+3600},\n  "role": "admin"\n}\n\nTOKEN (sample):\n${header}.${payload}.[signature]\n\nNote: This is a structural example. Use a real JWT library for production tokens.`;
      break;
    }
    case 'random-id-generator': {
      const hex = () => Math.random().toString(16).substring(2,10);
      const alnum = () => Math.random().toString(36).substring(2,14);
      const num = () => String(Math.floor(Math.random()*9000000000)+1000000000);
      result = `Numeric IDs:\n${num()}\n${num()}\n${num()}\n\nAlphanumeric IDs:\n${alnum()}\n${alnum()}\n${alnum()}\n\nHex IDs:\n${hex()}${hex()}\n${hex()}${hex()}\n${hex()}${hex()}\n\nShort IDs:\n${alnum().substring(0,6)}\n${alnum().substring(0,6)}\n${alnum().substring(0,6)}`;
      break;
    }
    case 'flashcard-generator': {
      const topic = compactSeed(text, 'general knowledge');
      const count = Math.max(3, Math.min(20, Number(optionValue('flashcard-count', '6')) || 6));
      const style = optionValue('flashcard-style', 'definition');
      const difficulty = optionValue('flashcard-difficulty', 'medium');
      const includeTips = optionValue('flashcard-study-tips', 'true') === 'true';
      const fronts = [
        `What is the main definition of ${topic}?`,
        `Name one practical example of ${topic}.`,
        `What is one common mistake when learning ${topic}?`,
        `How would you explain ${topic} to a beginner?`,
        `What detail makes ${topic} easier to remember?`,
        `How can someone practice ${topic}?`,
        `What question should you ask when reviewing ${topic}?`,
        `What is one real-world use for ${topic}?`,
        `What signal shows progress with ${topic}?`,
        `What should be reviewed first in ${topic}?`
      ].slice(0, count);
      const cards = fronts.map((front, index) => `Card ${index + 1}\nFront: ${front}\nBack: Answer with one clear definition, one example, and one connection to ${topic}.\nHint: Start with the simplest accurate explanation.`);
      const exportRows = fronts.map((front) => `"${front.replace(/"/g, '""')}","Answer with one clear definition, one example, and one connection to ${topic}."`).join('\n');
      const sections = [
        { title: 'Flashcard Deck', body: cards.join('\n\n'), note: `${titleCase(style.replace(/-/g, ' '))}, ${difficulty} difficulty.` },
        { title: 'Export-Friendly CSV', body: 'front,back\n' + exportRows, note: 'Copy into a spreadsheet or flashcard importer that accepts CSV.' },
        ...(includeTips ? [{ title: 'Study Tips', body: `Review ${topic} cards once today, again in two days, and again after one week.\nSay the answer before flipping the card.\nMove difficult cards into a short daily review stack.\nWrite one example from memory after each review session.`, note: 'Practical review routine.' }] : [])];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Flashcard Study Deck', sections, 'Learning note: these cards are study prompts, not a guarantee of test performance.');
      break;
    }
    case 'study-plan-generator': {
      const topic = compactSeed(text, 'exam preparation');
      const timeline = optionValue('study-timeline', '14-days');
      const intensity = optionValue('study-intensity', 'balanced');
      const goalType = optionValue('study-goal-type', 'exam');
      const dailyTime = intensity === 'light' ? '35 to 45 minutes' : intensity === 'intensive' ? '2 to 3 focused blocks' : '60 to 90 minutes';
      const sections = [
        { title: 'Study Goal', body: `Main focus: ${topic}\nGoal type: ${titleCase(goalType)}\nTimeline: ${titleCase(timeline.replace(/-/g, ' '))}\nDaily pace: ${dailyTime}\nSuccess signal: you can explain the main ideas, complete practice tasks, and identify weak areas without guessing.`, note: 'Plan overview.' },
        { title: 'Daily Task Pattern', body: `1. Review yesterday's notes for 10 minutes.\n2. Learn one focused ${topic} subtopic.\n3. Complete a short practice block.\n4. Write a three-line summary from memory.\n5. Mark one weak area for the next session.`, note: 'Repeatable study rhythm.' },
        { title: 'Schedule Blocks', body: `Block 1: Foundation review and core vocabulary.\nBlock 2: Worked examples and guided practice.\nBlock 3: Independent practice with answers checked.\nBlock 4: Mixed review of older material.\nBlock 5: Practice quiz or exam-style questions.\nBuffer: keep one catch-up session open each week.`, note: 'Fits the selected timeline.' },
        { title: 'Review Checkpoints', body: `Checkpoint 1: After the first study block, list what still feels unclear.\nCheckpoint 2: Midway through the plan, redo difficult examples without notes.\nCheckpoint 3: Two sessions before the end, take a timed practice set.\nCheckpoint 4: Final session, review errors and sleep instead of cramming late.`, note: 'Spaced review.' },
        { title: 'Exam Prep Checklist', body: `Explain ${topic} in plain language.\nSolve representative practice questions.\nReview mistakes by category.\nPrepare a one-page summary sheet.\nRest, hydrate, and start the final review early.`, note: 'Copyable checklist.' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Study Schedule And Review Plan', sections, 'No grade guarantee: adjust the pace to your real course, deadline, and energy level.');
      break;
    }
    case 'lesson-plan-generator': {
      const topic = compactSeed(text, 'critical thinking');
      const level = optionValue('lesson-level', 'middle-school');
      const minutes = optionValue('lesson-time', '45');
      const format = optionValue('lesson-format', 'lecture-practice');
      const sections = [
        { title: 'Lesson Snapshot', body: `Topic: ${topic}\nLevel: ${titleCase(level.replace(/-/g, ' '))}\nTime: ${minutes} minutes\nFormat: ${titleCase(format.replace(/-/g, ' '))}\nLearner outcome: students can explain the idea, practice it, and show understanding with a short response.`, note: 'Teacher-ready overview.' },
        { title: 'Objectives', body: `Students will define ${topic} in their own words.\nStudents will identify two useful examples of ${topic}.\nStudents will apply ${topic} to a short practice task.\nStudents will reflect on one question they still have.`, note: 'Measurable learning targets.' },
        { title: 'Materials', body: `Whiteboard or shared screen\nShort reading or example set about ${topic}\nStudent notes page\nPractice questions\nExit ticket`, note: 'Simple classroom materials.' },
        { title: 'Warm-Up', body: `Ask: Where have you seen ${topic} used outside class?\nGive students two quiet minutes to write one example, then collect two or three responses before the main lesson.`, note: '5 minute opener.' },
        { title: 'Lesson Steps', body: `1. Introduce the goal and key vocabulary.\n2. Model one example of ${topic}.\n3. Ask students to identify what made the example work.\n4. Guide students through a second example.\n5. Let students complete a short practice task independently or in pairs.`, note: 'Core instruction.' },
        { title: 'Activity', body: `Students create a mini example of ${topic}, trade it with a partner, and explain what is clear or confusing. End with one improvement before sharing.`, note: 'Practice task.' },
        { title: 'Assessment', body: `Exit ticket: define ${topic}, give one example, and answer one reflection question.\nReview responses for accuracy, clarity, and whether students can apply the idea without copying the model.`, note: 'Check for understanding.' },
        { title: 'Homework', body: `Find one real-world example of ${topic} and write four sentences explaining why it fits. Bring one question for the next class.`, note: 'Follow-up.' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Complete Lesson Plan', sections, 'Adapt timing, content, and assessment to your real class and school expectations.');
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
      const topic = compactSeed(text, 'Digital Learning');
      const discipline = optionValue('research-discipline', 'education');
      const level = optionValue('research-level', 'college');
      const method = optionValue('research-method', 'mixed');
      const includeHypothesis = optionValue('research-include-hypothesis', 'true') === 'true';
      const sections = [
        { title: 'Exploratory Questions', body: `1. What themes appear in current discussions of ${topic} within ${discipline}?\n2. How do participants describe their experience with ${topic}?\n3. What background factors may shape how ${topic.toLowerCase()} is understood?`, note: 'Good for early inquiry' },
        { title: 'Analytical Questions', body: `1. How does ${topic} influence a specific outcome in a defined setting?\n2. What evidence best explains the relationship between ${topic} and Optional user-fill outcome?\n3. Which assumptions about ${topic.toLowerCase()} are supported or challenged by available evidence?`, note: `${titleCase(level.replace(/-/g, ' '))} level` },
        { title: 'Comparative Questions', body: `1. How does ${topic} differ between Optional user-fill group A and Optional user-fill group B?\n2. Which approach to ${topic.toLowerCase()} produces clearer outcomes in Optional user-fill context?\n3. How have perspectives on ${topic.toLowerCase()} changed across two time periods or regions?`, note: 'Compare/contrast design' },
        { title: 'Argumentative Questions', body: `1. Should institutions change their approach to ${topic.toLowerCase()} based on current evidence?\n2. What policy or practice would most responsibly address ${topic.toLowerCase()}?\n3. Which interpretation of ${topic.toLowerCase()} is most persuasive when evidence and limitations are weighed together?`, note: 'Debatable and researchable' },
        { title: 'Method Fit And Scope', body: `Selected method: ${titleCase(method.replace(/-/g, ' '))}\nVariables or concepts: ${topic}; Optional user-fill population; Optional user-fill outcome\nScope check: define a place, time period, group, or dataset before collecting evidence.\nKeywords: ${slugWords(topic).join(', ')}, ${discipline}, method, evidence, outcomes`, note: 'Researchability check' },
        ...(includeHypothesis ? [{ title: 'Optional Hypothesis Drafts', body: `Quantitative: Higher exposure to ${topic.toLowerCase()} is associated with a measurable change in Optional user-fill outcome among Optional user-fill population.\nQualitative: Participants will describe ${topic.toLowerCase()} through themes related to access, motivation, and context.`, note: 'Only use when your method calls for it' }] : [])
      ];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Research Question Builder', sections, 'Research drafts should be narrowed and reviewed for ethics, feasibility, and course requirements.');
      break;
    }
    case 'bibliography-generator': {
      const source = compactSeed(text, 'Sample Source Title');
      const yr = new Date().getFullYear();
      const style = optionValue('bibliography-style', 'all');
      const sourceType = optionValue('bibliography-source-type', 'web');
      const includeAnnotation = optionValue('bibliography-include-annotations', 'false') === 'true';
      const sections = [
        { title: 'APA Draft', body: `Author, A. A. (${yr}). ${source}. Publisher or Site Name. https://example.com/source`, note: `${sourceType} source` },
        { title: 'MLA Draft', body: `Author Last, First. "${source}." Container or Site Name, Publisher, ${yr}, https://example.com/source.`, note: 'Works cited draft' },
        { title: 'Chicago Draft', body: `Author Last, First. "${source}." Site or Publisher. ${yr}. https://example.com/source.`, note: 'Bibliography draft' },
        { title: 'Harvard Draft', body: `Author, A.A. (${yr}) '${source}', Site or Publisher. Available at: https://example.com/source (Accessed: Optional user-fill date).`, note: 'Reference list draft' },
        ...(includeAnnotation ? [{ title: 'Annotation Starter', body: `This source appears relevant because it addresses ${source.toLowerCase()} in relation to Optional user-fill research focus. Verify the author's credentials, publication context, evidence, and limitations before relying on it.`, note: 'Annotated bibliography support' }] : []),
        { title: 'Missing Field Checklist', body: `Author or organization\nExact title\nPublication date\nPublisher, journal, or website\nVolume, issue, or pages when relevant\nURL or DOI\nAccess date if required\nAlphabetize final entries by author or title according to the selected style`, note: `Selected style: ${style}` }
      ];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Bibliography Citation Drafts', sections, 'Verify every citation against official APA, MLA, Chicago, Harvard, or instructor style guidance.');
      break;
    }
    case 'essay-topic-generator': {
      const topic = compactSeed(text, 'Modern Society');
      const subject = optionValue('essay-subject', 'general');
      const essayType = optionValue('essay-type', 'mixed');
      const level = optionValue('essay-level', 'high-school');
      const difficulty = optionValue('essay-difficulty', 'medium');
      const groups = [
        { title: 'Argumentative', key: 'argumentative', items: [`Should schools, workplaces, or communities change their approach to ${topic}?`, `Who benefits most from ${topic}, and who may be left out?`] },
        { title: 'Research', key: 'research', items: [`What evidence explains the rise of ${topic} in ${subject}?`, `How has ${topic} changed across one specific time period, place, or group?`] },
        { title: 'Creative', key: 'creative', items: [`Write a narrative that shows one person's changing relationship with ${topic}.`, `Imagine a future where ${topic.toLowerCase()} shapes everyday decisions.`] },
        { title: 'Compare/Contrast', key: 'compare-contrast', items: [`Compare two perspectives on ${topic} and explain which is more convincing.`, `How does ${topic} differ between two cultures, generations, or settings?`] },
        { title: 'Expository', key: 'expository', items: [`Explain the main causes and effects of ${topic}.`, `Describe the key terms, examples, and debates connected to ${topic}.`] },
        { title: 'Persuasive', key: 'persuasive', items: [`Persuade a specific audience to take a practical step related to ${topic}.`, `Argue for a responsible guideline or habit involving ${topic}.`] }
      ].filter(group => essayType === 'mixed' || group.key === essayType);
      const sections = groups.map(group => ({
        title: `${group.title} Topics`,
        body: group.items.map((item, i) => `${i + 1}. ${item}\n   Thesis angle: A focused essay can argue how ${topic.toLowerCase()} affects a defined audience.\n   Starter question: What evidence, example, or story would make this topic specific?`).join('\n\n'),
        note: `${titleCase(level.replace(/-/g, ' '))}, ${difficulty} difficulty`
      }));
      sections.push({ title: 'Classroom Note', body: `Use these topics for planning, discussion, drafting, or teacher-approved assignments. Narrow broad topics by adding a course theme, source set, location, population, or time period.`, note: 'Academic planning' });
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Essay Topic Idea Pack', sections, 'Topic ideas are brainstorming support, not a substitute for assigned instructions or required research.');
      break;
    }
    case 'multiple-choice-generator': {
      {
        const mcqTopic = compactSeed(text, 'General Knowledge');
        const level = optionValue('mcq-level', 'middle-school');
        const difficulty = optionValue('mcq-difficulty', 'medium');
        const count = Math.max(3, Math.min(12, Number(optionValue('mcq-count', '5')) || 5));
        const includeExplanations = optionValue('mcq-include-explanations', 'true') === 'true';
        const questions = Array.from({ length: count }, (_, i) => `Q${i + 1}. Which answer best supports understanding ${mcqTopic}?\nA) A vague opinion without evidence\nB) A clear explanation connected to ${mcqTopic}\nC) An unrelated fact from another topic\nD) A memorized phrase with no example`);
        const answerKey = Array.from({ length: count }, (_, i) => `${i + 1}. B`).join('\n');
        const sections = [
          { title: 'Quiz Overview', body: `Topic: ${mcqTopic}\nLevel: ${titleCase(level.replace(/-/g, ' '))}\nDifficulty: ${titleCase(difficulty)}\nLearning objective: Check whether learners can identify accurate explanations and examples.`, note: 'Teacher or study copy' },
          { title: 'Multiple Choice Questions', body: questions.join('\n\n'), note: `${count} questions with four options each` },
          { title: 'Answer Key', body: answerKey, note: 'Keep separate for practice or review' },
          ...(includeExplanations ? [{ title: 'Explanations And Distractor Notes', body: `Correct option B is strongest because it connects the answer directly to ${mcqTopic}.\nDistractor A is too vague.\nDistractor C is unrelated.\nDistractor D lacks reasoning or an example.\nReview every item for factual accuracy before classroom use.`, note: 'Distractor quality guide' }] : []),
          { title: 'Scoring Guide', body: `1 point per correct answer.\nSuggested review: ask learners to explain why the correct option is stronger than one distractor.`, note: 'Practice scoring' }
        ];
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('MCQ Quiz Pack', sections, 'Educational draft. Verify factual accuracy and answer alignment before assessment use.');
      }
      break;
    }
    case 'product-bullet-points-generator': {
      const product = compactSeed(text, 'Everyday Carry Bag');
      const platform = optionValue('bullet-platform', 'general');
      const focus = optionValue('bullet-focus', 'quality');
      const count = Math.max(3, Math.min(8, Number(optionValue('bullet-count', '5')) || 5));
      const focusText: Record<string, string> = {
        quality: 'reliable materials and clear construction details',
        convenience: 'simpler daily use and easier setup',
        comfort: 'a more comfortable everyday experience',
        gift: 'a thoughtful presentation for the right recipient'
      };
      const featureBullets = [
        `Built around ${focusText[focus] || focusText.quality}`,
        'Designed for common everyday use cases',
        'Easy to understand on mobile product pages',
        'Leaves room for verified material, size, color, and care details',
        'Works across marketplace listings and brand-store pages',
        'Keeps claims practical and evidence-friendly',
        'Supports quick comparison while shoppers browse',
        'Pairs with photos, specs, and policy details'
      ].slice(0, count);
      const sections = [
        { title: 'Feature Bullets', body: featureBullets.map(item => `- ${product}: ${item}`).join('\n'), note: 'Feature-focused group' },
        { title: 'Benefit Bullets', body: featureBullets.map(item => `- Helps shoppers see how ${item.toLowerCase()}.`).join('\n'), note: 'Buyer outcome group' },
        { title: 'Amazon-Style Bullets', body: featureBullets.map(item => `- ${titleCase(focus)}: ${item}. Add only verified product facts before publishing.`).join('\n'), note: 'Marketplace scan format' },
        { title: 'Shopify-Style Bullets', body: featureBullets.map(item => `- ${item} for customers comparing ${product.toLowerCase()}.`).join('\n'), note: 'Brand-store PDP format' },
        { title: 'Concise Bullets', body: featureBullets.map(item => `- ${item.split(' and ')[0]}`).join('\n'), note: 'Short mobile set' },
        { title: 'Claim Safety Notes', body: 'Do not add unsupported superlatives, guarantees, certifications, health outcomes, sustainability claims, or material/spec details unless the product data verifies them.', note: `Platform option: ${platform}` }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Product Bullet Point Sets', sections, `Copy each group separately. Focus: ${focus}.`);
      break;
    }
    case 'amazon-listing-generator': {
      const product = compactSeed(text, 'Stainless Steel Water Bottle');
      const category = optionValue('amazon-category', 'general');
      const focus = optionValue('amazon-benefit-focus', 'quality');
      const tone = optionValue('amazon-tone', 'clear');
      const benefit = focus === 'convenience' ? 'easy daily use' : focus === 'compatibility' ? 'clear fit and compatibility details' : focus === 'gift' ? 'gift-ready usefulness' : 'reliable everyday quality';
      const title = `${product} - ${titleCase(benefit)} - Optional user-fill Size, Color, Pack Count`;
      const bullets = [
        `${titleCase(focus)} Focus: ${product} helps shoppers understand ${benefit} before purchase.`,
        `Practical Details: add verified material, dimensions, compatibility, quantity, and care information.`,
        `Use Case Clarity: explain who ${product.toLowerCase()} is for and where it fits best.`,
        `Comparison Help: make the main advantage easy to scan without attacking competitors.`,
        `Purchase Confidence: point shoppers to real policies, included items, and support details.`
      ].join('\n');
      const description = `${product} is written for Amazon shoppers who need quick comparison, clear benefits, and verified details. Keep the tone ${tone}, lead with ${benefit}, and replace optional user-fill details only with facts from your product data.`;
      const keywords = slugWords(product).concat([category, focus, 'gift', 'daily use', 'product details']).filter(Boolean).slice(0, 12).join(', ');
      const sections = [
        { title: 'Product Title', body: title, note: `${title.length} characters before optional edits` },
        { title: 'Bullet Points', body: bullets, note: 'Five Amazon-style bullets' },
        { title: 'Description', body: description, note: 'Policy-safe product paragraph' },
        { title: 'Backend Keyword Ideas', body: keywords, note: 'Ideas only; verify relevance and avoid stuffing.' },
        { title: 'Compliance-Safe Note', body: 'Avoid fake reviews, bestseller/ranking claims, medical or financial outcomes, prohibited claims, unverified certifications, and guarantees unless your official policy supports them.', note: 'Marketplace review' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Amazon Listing Package', sections, `Category: ${category}. Benefit focus: ${focus}.`);
      break;
    }
    case 'etsy-listing-generator': {
      const product = compactSeed(text, 'Ceramic Mug');
      const type = optionValue('etsy-product-type', 'handmade-unspecified');
      const vibe = optionValue('etsy-shop-vibe', 'warm');
      const tagCount = Math.max(5, Math.min(13, Number(optionValue('etsy-tag-count', '13')) || 13));
      const canClaimHandmade = type === 'handmade-confirmed';
      const canClaimVintage = type === 'vintage-confirmed';
      const titlePrefix = canClaimHandmade ? 'Handmade ' : canClaimVintage ? 'Vintage ' : type === 'supply' ? 'Craft Supply ' : '';
      const tags = slugWords(product).concat([vibe, 'gift', 'home', 'personalized', 'small batch', 'shop gift', 'decor', 'minimal', 'cozy', 'custom option', 'artisan style']).filter(Boolean).slice(0, tagCount);
      const sections = [
        { title: 'Handmade-Style Title', body: `${titlePrefix}${product} | ${titleCase(vibe)} Gift | Optional user-fill Material Or Occasion`, note: canClaimHandmade || canClaimVintage ? 'Claim supported by listing type option.' : 'Does not claim handmade or vintage.' },
        { title: 'Product Story', body: `${product} brings a ${vibe} touch to everyday use, gifting, or display. Use this opening to explain the inspiration, recipient, and setting without claiming handmade or vintage status unless that is true.`, note: 'Shop voice opener' },
        { title: 'Materials And Details', body: `Optional user-fill material: add verified material only\nOptional user-fill size: add measured dimensions\nOptional user-fill color/finish: add actual variants\nOptional user-fill personalization: describe available choices only`, note: 'Verified details block' },
        { title: 'Tags', body: tags.join(', '), note: `${tags.length} Etsy tag ideas` },
        { title: 'Description', body: `${product} is positioned for shoppers looking for a ${vibe} item with clear details and a thoughtful presentation. Include real dimensions, material, color, personalization, processing time, and what is included before publishing.`, note: 'Listing body' },
        { title: 'Care And Shipping Note Placeholder', body: 'Optional user-fill placeholder: add real care instructions, processing time, shipping origin, returns policy, and personalization timing from your shop policies.', note: 'Clearly labeled placeholder' },
        { title: 'Claim Safety Note', body: 'Do not claim handmade, vintage, local origin, eco-friendly materials, licensed characters, or safety certifications unless your product information supports it.', note: 'Etsy-safe review' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Etsy Listing Package', sections, `Listing type: ${type}. Shop vibe: ${vibe}.`);
      break;
    }
    case 'customer-persona-generator': {
      const market = compactSeed(text, 'small business software');
      const lower = market.toLowerCase();
      const personaType = optionValue('persona-type', 'b2b');
      const awareness = optionValue('awareness-level', 'comparing');
      const personas = [
        {
          title: 'Primary Persona',
          body: `Persona name: Practical Priya\nSegment: ${personaType.toUpperCase()} buyer for ${lower}\nDemographics summary: Role-based working profile, not a sensitive personal profile\nGoals:\n- Solve a clear work or life problem faster\n- Compare options with less confusion\n- Feel confident before taking the next step\nPain points:\n- Too many similar choices\n- Limited time to research\n- Unclear proof or pricing\nObjections:\n- Will this work for my specific situation?\n- Is setup or switching too difficult?\nPreferred channels:\n- Search\n- LinkedIn or professional communities\n- Email newsletters\nBuying triggers:\n- A deadline, workflow problem, growth need, or trusted recommendation\nMessaging angle:\n- Make ${lower} easier to evaluate and act on`,
          note: 'Core buying persona'
        },
        {
          title: 'Budget-Conscious Persona',
          body: `Persona name: Careful Casey\nSegment: value-focused ${lower} evaluator\nGoals:\n- Avoid wasting money\n- Find a practical option with clear benefits\nPain points:\n- Hidden costs\n- Overbuilt tools\n- Vague promises\nObjections:\n- Is this worth it now?\n- Can I start small?\nPreferred channels:\n- Comparison pages\n- Reviews\n- Email follow-ups\nBuying triggers:\n- Transparent pricing and a low-risk next step\nMessaging angle:\n- Clear value, simple setup, and honest expectations`,
          note: 'Price-sensitive segment'
        },
        {
          title: 'Growth-Focused Persona',
          body: `Persona name: Scaling Sam\nSegment: ambitious ${lower} buyer\nGoals:\n- Improve results without adding friction\n- Build repeatable systems\nPain points:\n- Manual work\n- Inconsistent execution\n- Hard-to-measure outcomes\nObjections:\n- Will this scale with us?\n- Does it integrate with current work?\nPreferred channels:\n- LinkedIn\n- Webinars\n- case studies using verified examples\nBuying triggers:\n- A team bottleneck or growth target\nMessaging angle:\n- Turn scattered effort into a repeatable process`,
          note: 'Higher-intent segment'
        }];
      result = personas.map(persona => persona.title + '\n' + persona.body).join('\n\n');
      resultHtml = renderSectionSuite('Customer Persona Cards', personas, `Awareness level: ${awareness}. Avoid sensitive profiling. Validate personas with interviews, analytics, support notes, or sales conversations.`);
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
      const topic = compactSeed(text, 'The Topic');
      const lower = topic.toLowerCase();
      const groups = [
        { title: 'Honest Curiosity', note: 'Opens a question without inventing proof, urgency, or drama.', items: ['One practical question about ' + lower + ' this video answers clearly.', 'Here is the part of ' + lower + ' people often overlook, with examples from the video.', 'The first thing to check in ' + lower + ' is simpler than it looks.'] },
        { title: 'Problem-Solution', note: 'Clear pain point plus a useful promise the video can deliver.', items: ['If ' + lower + ' feels confusing, start with the step this video explains first.', 'Struggling with ' + lower + '? This breaks the real process into simple steps.', 'Here is a cleaner way to approach ' + lower + ', using examples shown in the video.'] },
        { title: 'Accuracy Check', note: 'Use only when the video supports the statement.', items: ['This video explains one way to make ' + lower + ' easier to understand.', 'You do not need to overcomplicate ' + lower + '; start with the verified basics.', 'A practical way to improve ' + lower + ' is to review this first step.'] },
        { title: 'How-To', note: 'Search-friendly tutorial hooks without guaranteed outcomes.', items: ['How to start with ' + lower + ' without getting overwhelmed.', 'How to improve your approach to ' + lower + ' in three practical steps.', 'How to choose a clearer approach to ' + lower + '.'] },
        { title: 'List', note: 'Good for structured videos when every item appears in the video.', items: ['5 ' + lower + ' mistakes this video actually covers.', '7 practical ' + lower + ' tips for beginners to review.', '3 ways to make ' + lower + ' clearer today, with examples.'] },
        { title: 'Safety Note', note: 'Responsible hook requirements.', items: ['Avoid misleading clickbait, deceptive thumbnails or titles, fake proof, scams, harmful claims, harassment, misinformation, spam, and guaranteed views, ranking, retention, engagement, monetization, approval, recommendations, or growth.'] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('youtube-hook-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n') + '\n\nResponsible use note: Choose only hooks that accurately match the video, title, thumbnail, sources, claims, and audience. No views, ranking, retention, engagement, monetization, approval, recommendation, or platform result is guaranteed.';
      resultHtml = renderHeadlineGroups(visibleGroups, 'Responsible hook note: avoid misleading clickbait, deceptive thumbnails or titles, fake urgency, scams, harmful claims, harassment, misinformation, and unsupported promises. Use hooks only when the video genuinely delivers on the opening promise.');
      break;
    }
    case 'linkedin-summary-generator': {
      const role = compactSeed(text, 'Product Strategist');
      const lower = role.toLowerCase();
      const summaries = [
        { title: 'Executive', text: 'I work in ' + lower + ', helping teams clarify priorities, make better decisions, and turn strategy into practical execution. My focus is building calm, useful systems that support real business outcomes.\n\nUse this space to add only verified leadership scope, industries, and results.', note: 'Senior positioning without fake achievements' },
        { title: 'Job Seeker', text: role + ' with a practical approach to problem solving, communication, and cross-functional work. I am interested in roles where I can help teams improve clarity, execution, and measurable outcomes.\n\nOptional user-fill proof: add real tools, projects, certifications, or results.', note: 'Recruiter-friendly' },
        { title: 'Freelancer', text: 'I help clients with ' + lower + ' by turning broad goals into clear plans, deliverables, and next steps. My process is collaborative, straightforward, and focused on work that can actually be used.\n\nMessage me with the project goal, timeline, and what success should look like.', note: 'Service positioning' },
        { title: 'Founder', text: 'Building in ' + lower + ', with a focus on solving practical problems for a specific audience. I share lessons from product decisions, customer conversations, and the work of turning ideas into something useful.', note: 'Founder About section' },
        { title: 'Concise', text: role + '. Practical thinker, clear communicator, and builder of useful systems. Interested in focused teams, better decisions, and work that creates real value.', note: 'Short About version' }];
      const visibleSummaries = filterGroupsByOption(summaries, optionValue('linkedin-summary-style', 'all'));
      result = visibleSummaries.map(summary => summary.title + '\n' + summary.text).join('\n\n');
      resultHtml = renderBioVariations(visibleSummaries);
      break;
    }
    case 'sales-email-generator': {
      const offer = compactSeed(text, 'SaaS Platform');
      const temperature = optionValue('sales-email-temperature', 'warm');
      const ctaMode = optionValue('sales-email-cta', 'reply');
      const tone = optionValue('sales-email-tone', 'concise');
      const ctaLine = ctaMode === 'book-call' ? 'Would a short call next week be useful?' : ctaMode === 'demo' ? 'Would you like a quick demo walkthrough?' : ctaMode === 'send-info' ? 'Should I send a short overview?' : 'Is this worth a quick conversation?';
      const opener = temperature === 'cold'
        ? `I noticed your team may be evaluating ways to improve ${offer.toLowerCase()}.`
        : temperature === 'inbound'
          ? `Thanks for your interest in ${offer}.`
          : temperature === 'renewal'
            ? `I wanted to check in before your next ${offer.toLowerCase()} decision point.`
            : `Following up on your interest in ${offer}.`;
      const shortEmail = `Hi Optional user-fill first name,\n\n${opener} The practical value is simple: clearer workflows, easier comparison, and a next step your team can evaluate without pressure.\n\n${ctaLine}\n\nBest,\nOptional user-fill sender name`;
      const followUp = `Subject: Re: ${offer}\n\nHi Optional user-fill first name,\n\nQuick follow-up in case this slipped down the list. If ${offer.toLowerCase()} is still relevant, I can send a concise overview or close the loop for now.\n\n${ctaLine}\n\nBest,\nOptional user-fill sender name`;
      const sections = [
        { title: 'Subject Lines', body: `${offer} question\nWorth a quick look at ${offer}?\nA clearer way to evaluate ${offer}\nFollowing up on ${offer}`, note: 'Non-deceptive subject bank' },
        { title: 'Opener', body: opener, note: `Outreach type: ${temperature}` },
        { title: 'Value Proposition', body: `${offer} helps buyers understand the offer, compare details, and decide on a practical next step. Add specific, verified benefits from your product or service before sending.`, note: `Tone: ${tone}` },
        { title: 'Proof Placeholder', body: 'Optional user-fill proof placeholder: add a verified case study, permissioned customer quote, real metric, integration, certification, or internal result only if you can substantiate it.', note: 'No fake proof' },
        { title: 'CTA', body: ctaLine, note: `CTA mode: ${ctaMode}` },
        { title: 'Short Sales Email', body: shortEmail, note: 'Primary email' },
        { title: 'Follow-Up', body: followUp, note: 'Polite follow-up' },
        { title: 'Compliance Note', body: 'Personalize honestly, avoid fake familiarity, deceptive urgency, scraped sensitive details, misleading RE/FWD subjects, and compliance guarantees. Follow applicable email and unsubscribe rules for your audience.', note: 'Non-spammy review' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Sales Email Sequence', sections, `Tone: ${tone}. Keep personalization truthful and permission-aware.`);
      break;
    }
    case 'follow-up-email-generator': {
      {
        const context = compactSeed(text, 'The Next Step');
        const scenario = optionValue('follow-up-scenario', 'meeting');
        const tone = optionValue('follow-up-tone', 'professional');
        const length = optionValue('follow-up-length', 'balanced');
        const cta = optionValue('follow-up-cta', 'reply');
        const ctaLine = cta === 'book-call' ? 'Would you be open to a short call next week?' : cta === 'send-info' ? 'I can send the details in a concise note if helpful.' : cta === 'confirm' ? 'Could you confirm the next step when you have a moment?' : 'A quick reply either way would help me plan the next step.';
        const openerMap: Record<string, string> = {
          sales: `Thank you for taking a look at ${context}.`,
          job: `Thank you again for the conversation about ${context}.`,
          meeting: `Thank you for taking the time to discuss ${context}.`,
          client: `I wanted to follow up on ${context} and keep the next step clear.`,
          invoice: `I am following up politely regarding ${context}.`
        };
        const opener = openerMap[scenario] || openerMap.meeting;
        const baseBody = `${opener}\n\nQuick recap: Optional user-fill recap of the discussion, request, or open item.\n\nNext step: ${ctaLine}\n\nBest,\nOptional user-fill sender name`;
        const shortBody = `${opener}\n\n${ctaLine}\n\nBest,\nOptional user-fill sender name`;
        const warmBody = `Hi Optional user-fill first name,\n\n${opener} I appreciated the context you shared and wanted to keep this easy to move forward.\n\nOptional user-fill helpful detail or recap.\n\n${ctaLine}\n\nWarmly,\nOptional user-fill sender name`;
        const formalBody = `Hello Optional user-fill first name,\n\n${opener} I am writing to confirm whether there are any updates or additional details needed from my side.\n\n${ctaLine}\n\nSincerely,\nOptional user-fill sender name`;
        const sections = [
          { title: 'Subject Lines', body: `Following up on ${context}\nQuick follow-up regarding ${context}\nNext step for ${context}\nChecking in on ${context}`, note: 'Honest, non-spammy subjects' },
          { title: 'Primary Follow-Up', body: `Subject: Following up on ${context}\n\nHi Optional user-fill first name,\n\n${length === 'short' ? shortBody : baseBody}`, note: `${scenario} scenario, ${tone} tone` },
          { title: 'Warm Variant', body: `Subject: Good to connect about ${context}\n\n${warmBody}`, note: 'Friendly but professional' },
          { title: 'Formal Variant', body: `Subject: Follow-up regarding ${context}\n\n${formalBody}`, note: 'Polished version' },
          { title: 'Timing Note', body: `For meetings and clients, one follow-up within 24 to 72 hours is usually reasonable.\nFor jobs, follow the timeline given by the recruiter or interviewer.\nFor invoices, verify your actual payment terms before sending reminders.`, note: 'Use judgment' },
          { title: 'Professional Checklist', body: `Personalize truthfully\nAvoid fake urgency or misleading RE/FWD subjects\nUse one clear CTA\nKeep proof or claims verifiable\nRemove optional user-fill fields before sending`, note: 'Non-spammy review' }
        ];
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Follow-Up Email Suite', sections, 'Professional draft only. Personalize honestly and follow the recipient relationship and applicable email rules.');
      }
      break;
    }
    case 'image-alt-text-generator': {
      const desc = compactSeed(text, 'product photo on a clean background');
      const context = optionValue('alt-context', 'general');
      const detail = optionValue('alt-detail', 'balanced');
      const concise = desc.length > 90 ? desc.slice(0, 87).trim() + '...' : desc;
      const descriptive = context === 'product'
        ? `${titleCase(desc)} shown clearly for shoppers comparing the item.`
        : context === 'article'
          ? `${titleCase(desc)} illustrating the article topic.`
          : context === 'social'
            ? `${titleCase(desc)} prepared for a social post.`
            : `${titleCase(desc)}.`;
      const detailed = detail === 'detailed'
        ? `${descriptive} Include only visible details such as setting, subject, action, and relevant text if it appears in the image.`
        : descriptive;
      const seoSafe = `${concise} for ${context.replace(/-/g, ' ')} context`;
      const sections = [
        { title: 'Concise Alt Text', body: concise, note: 'Best for simple images.' },
        { title: 'Descriptive Alt Text', body: detailed, note: `${titleCase(detail)} detail level.` },
        { title: 'SEO-Safe Variant', body: seoSafe, note: 'Natural keywords only; avoid stuffing.' },
        { title: 'Decorative Image Note', body: 'If the image is purely decorative and adds no information, use empty alt text: alt="". Do not add keyword-heavy alt text to decorative images.', note: 'Accessibility guidance' },
        { title: 'Review Checklist', body: 'Describe the image purpose in context.\nKeep it concise when possible.\nDo not start with "image of" unless the image type matters.\nDo not claim facts that are not visible or provided.\nVerify final alt text against the actual image.', note: 'Before publishing' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Accessible Image Alt Text Drafts', sections, 'Alt text is drafted from your input only. Verify against the actual image before publishing.');
      break;
    }
    case 'video-prompt-generator': {
      const topic = compactSeed(text, 'home office setup');
      const platform = optionValue('video-platform', 'general');
      const format = optionValue('video-format', 'all');
      const length = optionValue('video-length', '60s');
      const tone = optionValue('video-tone', 'practical');
      const audience = optionValue('video-audience', 'general viewers');
      const includeCta = optionValue('video-cta', 'true') === 'true';
      const cta = includeCta ? `CTA: "Save this for the next time you work on ${topic}."` : 'CTA: Optional user-fill viewer action.';
      const groups = [
        { title: 'Short Form', text: `Scene concept: quick ${tone} tip about ${topic}\nAudience: ${audience}\nLength: ${length}\nHook: "Here is the simple version of ${topic}."\nShot list: close-up problem, quick fix, before/after, final takeaway\nVisual direction: clean, fast, caption-friendly, readable on mobile\nNarration notes: one sentence per shot, no unsupported result claims\n${cta}\nPlatform format: ${platform}, vertical-friendly if needed.\nProduction note: show the real setup or clearly label reenactments.`, note: 'Good for short social video.' },
        { title: 'Tutorial', text: `Scene concept: teach ${topic} step by step\nLength: ${length}\nHook: "By the end, you will know the exact first step."\nShot list: intro result, materials/context, step 1, step 2, mistake to avoid, recap\nVisual direction: calm framing, clear hands or screen, stable captions\nNarration notes: define the outcome before showing steps\nCTA: "Try step one and adjust from there."\nPlatform format: ${platform}.\nProduction note: verify any technical, health, legal, or financial claims separately.`, note: 'Professional and non-spammy.' },
        { title: 'Story', text: `Scene concept: personal or brand story about learning ${topic}\nLength: ${length}\nHook: "I used to make this harder than it needed to be."\nShot list: old problem, turning point, new process, lesson, audience question\nVisual direction: reflective pacing, human details, simple b-roll\nNarration notes: name the lesson without exaggerating the outcome\nCTA: "What part of ${topic} feels most confusing?"\nPlatform format: ${platform}.`, note: 'Human but structured.' },
        { title: 'Product Demo', text: `Scene concept: demonstrate a tool, workflow, or item related to ${topic}\nLength: ${length}\nHook: "Here is what changed after I tested this setup."\nShot list: problem, feature in use, real limitation, best-use case, final verdict\nVisual direction: clear product visibility, honest before/after context\nNarration notes: include one limitation and who it is not for\nCTA: "Use it only if this matches your workflow."\nPlatform format: ${platform}.`, note: 'Avoids exaggerated claims.' },
        { title: 'Educational', text: `Scene concept: explain ${topic} with a simple model\nLength: ${length}\nHook: "The easiest way to understand ${topic} is to split it into three parts."\nShot list: visual model, example, common mistake, corrected version, recap\nVisual direction: simple graphics or objects, high contrast captions\nNarration notes: define terms before advice\nCTA: "Use this as a checklist, then adapt it to your situation."\nPlatform format: ${platform}.`, note: 'Teaching-focused video.' }];
      const visibleGroups = filterGroupsByOption(groups, format);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Keep claims accurate and replace CTAs with the real action you want viewers to take.');
      break;
    }
    case 'productivity-prompt-generator': {
      const focus = compactSeed(text, 'weekly planning');
      const mode = optionValue('productivity-prompt-mode', 'all');
      const horizon = optionValue('productivity-horizon', 'week');
      const role = optionValue('productivity-role', 'individual');
      const outputMode = optionValue('productivity-output', 'checklist');
      const groups = [
        { title: 'Planning', text: `Help me plan ${focus} for this ${horizon} as a ${role}.\nContext: [current situation]\nConstraints: [time, energy, deadlines]\nOutput format: ${outputMode}\nReturn: top priorities, next actions, risks, calendar-ready steps, and one anti-overload note.\nReflection question: What can be removed without hurting the outcome?`, note: 'Good first-pass planning prompt.' },
        { title: 'Prioritization', text: `Review this list for ${focus}: [paste tasks].\nRank items by urgency, impact, effort, and dependency.\nReturn: do now, schedule, delegate, defer, delete.\nOutput format: ${outputMode}\nAnti-overload note: explain what should not be added this ${horizon}.`, note: 'Cuts noisy task lists down.' },
        { title: 'Time Blocking', text: `Create a realistic time-block plan for ${focus} using [available hours] this ${horizon}.\nInclude deep work, admin, breaks, buffer time, and recovery time.\nFlag anything that does not fit.\nReturn calendar-ready blocks plus a fallback plan for interrupted days.`, note: 'Includes capacity check.' },
        { title: 'Review', text: `Run a review for ${focus} across this ${horizon}.\nAsk what worked, what slipped, what changed, and what deserves attention next.\nReturn 3 lessons, 3 next actions, and 1 thing to stop doing.\nOutput format: ${outputMode}.`, note: 'Useful at week end.' },
        { title: 'Delegation', text: `Help me delegate parts of ${focus}.\nContext: [team, skills, ownership, deadline]\nIdentify: what to delegate, what to keep, definition of done, check-in point, and risk.\nReturn a short message I can send without sounding controlling.`, note: 'Practical team workflow.' },
        { title: 'Habit', text: `Design a tiny habit that supports ${focus} during this ${horizon}.\nMake it under 5 minutes, attach it to an existing routine, and include a fallback version for busy days.\nReflection question: What cue makes this easier to start?`, note: 'Keeps habits realistic.' }];
      const visibleGroups = filterGroupsByOption(groups, mode);
      result = visibleGroups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Replace bracketed placeholders with real tasks, calendar limits, and deadlines.');
      break;
    }
    case 'brand-kit-generator': {
      const brand = compactSeed(text, 'Northstar Studio');
      const mood = optionValue('brand-mood', 'modern');
      const brandType = optionValue('brand-type', 'startup');
      const fontDirection = optionValue('font-direction', 'clean');
      const baseHue = (brand.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) * 17) % 360;
      const makeColor = (label: string, h: number, s: number, l: number) => {
        const rgb = hslToRgb(h % 360, s, l);
        return { label, hex: rgbToHex(rgb), rgb, hsl: `HSL ${h % 360}, ${s}%, ${l}%` };
      };
      const colors = [
        makeColor('Primary', baseHue, 58, 34),
        makeColor('Secondary', baseHue + 32, 42, 48),
        makeColor('Accent', baseHue + 168, 65, 45),
        makeColor('Soft Background', baseHue + 12, 35, 92),
        makeColor('Text', baseHue + 210, 24, 18)];
      const fontPair = fontDirection === 'editorial' ? 'Headings: Fraunces or Playfair Display\nBody: Source Sans 3 or Inter' : fontDirection === 'geometric' ? 'Headings: Space Grotesk or Outfit\nBody: Inter or system sans' : fontDirection === 'warm' ? 'Headings: Poppins or Nunito Sans\nBody: DM Sans or Inter' : mood === 'premium' ? 'Headings: Playfair Display or Fraunces\nBody: Inter or Source Sans 3' : 'Headings: Inter Tight or Outfit\nBody: Inter or system sans';
      const adjectives = mood === 'premium' ? ['refined', 'trusted', 'composed', 'selective', 'polished'] : mood === 'friendly' ? ['warm', 'clear', 'helpful', 'human', 'easy'] : mood === 'bold' ? ['direct', 'confident', 'sharp', 'energetic', 'memorable'] : ['clear', 'practical', 'focused', 'modern', 'reliable'];
      const tagline = brandType === 'retail' ? `${brand} made for everyday use` : brandType === 'creator' ? `Ideas from ${brand}, made useful` : brandType === 'service' ? `Clearer work with ${brand}` : `Build clearly with ${brand}`;
      const audience = brandType === 'retail' ? 'shoppers who want a product that is easy to understand and easy to choose' : brandType === 'creator' ? 'followers, subscribers, and collaborators who want a consistent point of view' : brandType === 'service' ? 'clients who want reliable help, clear communication, and visible progress' : 'early customers, investors, and teams who need a crisp reason to care';
      const sections = [
        { title: 'Font Direction', body: fontPair, note: 'Typography roles' },
        { title: 'Brand Voice', body: `Voice: ${adjectives.slice(0, 3).join(', ')}.\nTone rules: lead with the customer problem, explain value simply, and avoid inflated claims.\nUse plain language for benefits and more expressive language for campaign moments.`, note: 'Verbal identity' },
        { title: 'Tagline Ideas', body: `${tagline}\n${brand}, made clearer\nA simpler way to choose ${brand.toLowerCase()}`, note: 'Short brand lines' },
        { title: 'Brand Adjectives', body: adjectives.map(word => titleCase(word)).join('\n'), note: 'Creative guardrails' },
        { title: 'Audience Fit', body: `Best fit: ${audience}.\nMessaging angle: reduce friction and make the next step obvious.\nPrimary promise: ${tagline}.`, note: 'Positioning' },
        { title: 'Logo Usage Notes', body: `Use the primary mark on light backgrounds, the text color for body copy, and the accent only for moments that need attention.\nKeep clear space around the logo and avoid stretching, rotating, or recoloring it outside the palette.`, note: 'Visual rules' },
        { title: 'Usage Notes', body: `Use the primary color for main actions, the accent for highlights, and the soft background for panels.\nCheck contrast in the final design before publishing.\nDo not treat this as trademark or legal clearance.`, note: 'Implementation notes' }];
      result = 'Brand Kit: ' + brand + '\n\nPalette\n' + colors.map(color => color.label + ': ' + color.hex).join('\n') + '\n\n' + sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderColorPalette(brand + ' Brand Palette', `${mood} visual direction with copyable brand foundations.`, colors, 'Accessibility note: run final foreground/background pairs through a contrast checker before launch.') + renderSectionSuite('Brand Kit System', sections, 'This is a creative starting point, not trademark clearance.');
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
      if (!text) { result = 'Enter items separated by commas or new lines above.'; break; }
      const items = text.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
      const quantity = Math.max(1, Math.min(items.length, Number(optionValue('random-list-quantity', '10')) || 10));
      const dedupe = optionValue('random-list-dedupe', 'true') === 'true';
      const pool = dedupe ? uniqueItems(items, items.length) : items;
      
      let shuffled = [...pool];
      try {
        const randomInt = (max: number) => {
          const arr = new Uint32Array(1);
          crypto.getRandomValues(arr);
          return arr[0] % max;
        };
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = randomInt(i + 1);
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
      } catch (e) {
        shuffled.sort(() => Math.random() - 0.5);
      }

      const selected = shuffled.slice(0, quantity);
      const sections = [
        { title: 'Randomized Order', body: selected.map((item, i) => `${i + 1}. ${item}`).join('\n'), note: `${selected.length} of ${pool.length} item(s)` },
        { title: 'Original Input', body: pool.map((item, i) => `${i + 1}. ${item}`).join('\n'), note: dedupe ? 'Duplicates removed' : 'Duplicates kept' },
        { title: 'Use Note', body: 'Use this for planning, task ordering, classroom groups, playlists, or lightweight decisions. Generate again for a new order.', note: 'Randomized draft' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Randomized List Output', sections, 'Random order only. Not suitable for official audits, compliance draws, or regulated selection.');
      break;
    }
    case 'random-color-generator': {
      const seed = compactSeed(text, 'random color');
      const count = Math.max(1, Math.min(12, Number(optionValue('random-color-count', '8')) || 8));
      const paletteMode = optionValue('random-color-mode', 'mixed');
      const baseHue = seedNumber(seed + String(Math.random()), 'random-color') % 360;
      const colors = Array.from({ length: count }, (_, index) => {
        const hue = paletteMode === 'analogous' ? baseHue + index * 18 : paletteMode === 'complementary' ? baseHue + index * 180 : baseHue + index * 47;
        return makeHslColor(`Color ${index + 1}`, hue, 44 + Math.floor(Math.random() * 36), 36 + Math.floor(Math.random() * 34));
      });
      const sections = [
        { title: 'Random Colors', body: colors.map(color => `${color.hex} | rgb(${color.rgb.join(', ')}) | ${color.hsl}`).join('\n'), note: `${titleCase(paletteMode)} mode` },
        { title: 'Palette CSS Variables', body: `:root {\n${colors.map((color, index) => `  --random-color-${index + 1}: ${color.hex};`).join('\n')}\n}`, note: 'Copy all colors into CSS.' },
        { title: 'Use Note', body: 'Generated colors are inspiration values. Check contrast, brand fit, and final pairings before publishing.', note: 'Design review' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderColorPalette(`${titleCase(seed)} Random Palette`, `Mode: ${titleCase(paletteMode)}. Includes HEX, RGB, and HSL.`, colors, 'Copy a single swatch or the whole palette. Accessibility contrast is not guaranteed.') + renderSectionSuite('Random Color Code', sections);
      break;
    }
    case 'dnd-character-generator': {
      const races = ['Human','Elf','Dwarf','Halfling','Dragonborn','Gnome','Half-Orc','Tiefling','Half-Elf','Goliath'];
      const classes = ['Fighter','Wizard','Rogue','Cleric','Ranger','Paladin','Barbarian','Bard','Warlock','Druid','Monk','Sorcerer'];
      const bgs = ['Acolyte','Criminal','Folk Hero','Noble','Outlander','Sage','Sailor','Soldier','Urchin','Hermit'];
      const traits = ['I always have a plan for what to do when things go wrong.','I am always calm, no matter the situation.','I fall in and out of love easily.','I have a joke for every occasion.','Nothing can shake my optimistic attitude.'];
      const roll = () => Math.floor(Math.random()*16)+3;
      result = `D&D 5e CHARACTER\n\nRace: ${randomFrom(races)}\nClass: ${randomFrom(classes)}\nBackground: ${randomFrom(bgs)}\nAlignment: ${['Lawful Good','Neutral Good','Chaotic Good','Lawful Neutral','True Neutral','Chaotic Neutral'][Math.floor(Math.random()*6)]}\n\nABILITY SCORES:\nSTR: ${roll()} | DEX: ${roll()} | CON: ${roll()}\nINT: ${roll()} | WIS: ${roll()} | CHA: ${roll()}\n\nPersonality: ${randomFrom(traits)}\nHP: ${Math.floor(Math.random()*8)+8} | AC: ${Math.floor(Math.random()*5)+12}\nLevel: 1 | XP: 0`;
      break;
    }
    case 'dungeon-generator': {
      const rooms = ['A vast underground cavern','A narrow corridor lined with torches','A flooded chamber','An ancient library','A throne room in ruins','A prison block with rusted cells'];
      const encounters = ['2d6 goblins','a gelatinous cube','a mimic disguised as a chest','a sleeping ogre','a swarm of rats','a trapped adventurer asking for help'];
      const traps = ['Pressure plate -> poison darts','Tripwire -> swinging blade','False floor -> 20ft pit','Glyph of Warding -> fire burst','Collapsing ceiling tiles'];
      const loot = ['50 gold pieces','a +1 shortsword','a Potion of Healing','a mysterious scroll','a gemstone worth 100gp','a cursed ring'];
      result = `DUNGEON: The ${['Forgotten','Sunken','Burning','Frozen','Shadow','Iron'][Math.floor(Math.random()*6)]} ${['Crypt','Keep','Mines','Temple','Depths','Sanctum'][Math.floor(Math.random()*6)]}\n\nROOM 1: ${randomFrom(rooms)}\nEncounter: ${randomFrom(encounters)}\nTrap: ${randomFrom(traps)}\nLoot: ${randomFrom(loot)}\n\nROOM 2: ${randomFrom(rooms)}\nEncounter: ${randomFrom(encounters)}\nLoot: ${randomFrom(loot)}\n\nROOM 3 (BOSS): ${randomFrom(rooms)}\nBoss: [CR-appropriate creature]\nReward: ${randomFrom(loot)} + ${randomFrom(loot)}`;
      break;
    }
    case 'worksheet-generator': {
      {
        const topic = compactSeed(text, 'The Subject');
        const level = optionValue('worksheet-level', 'middle-school');
        const type = optionValue('worksheet-type', 'mixed-practice');
        const difficulty = optionValue('worksheet-difficulty', 'medium');
        const includeAnswerKey = optionValue('worksheet-include-answer-key', 'true') === 'true';
        const sections = [
          { title: 'Worksheet Header', body: `Title: ${topic} Practice Worksheet\nLevel: ${titleCase(level.replace(/-/g, ' '))}\nType: ${titleCase(type.replace(/-/g, ' '))}\nDifficulty: ${titleCase(difficulty)}\nName: Optional user-fill student name\nDate: Optional user-fill date`, note: 'Printable header' },
          { title: 'Student Instructions', body: `Read each prompt carefully. Use complete sentences when asked to explain. Show your thinking for practice questions and mark any item you want to review.`, note: 'Student-facing' },
          { title: 'Vocabulary', body: `1. Define ${topic} in your own words.\n2. Write two related terms and explain how they connect.\n3. Use ${topic.toLowerCase()} in one original sentence.`, note: 'Warm-up section' },
          { title: 'Fill In The Blank', body: `1. ${topic} is important because __________.\n2. One example of ${topic.toLowerCase()} is __________.\n3. A common mistake is __________.`, note: 'Practice section' },
          { title: 'Matching', body: `A. Key concept | 1. A real example\nB. Evidence | 2. Information that supports an answer\nC. Reflection | 3. Thinking about what was learned\nD. Application | 4. Using the idea in a new situation`, note: 'Matching exercise' },
          { title: 'Short Answer', body: `1. Explain ${topic} to someone new to the subject.\n2. Give one example and one non-example of ${topic.toLowerCase()}.\n3. What question do you still have about ${topic.toLowerCase()}?`, note: 'Written response' },
          { title: 'Challenge Task', body: `Create a mini scenario involving ${topic.toLowerCase()}, then write one question another student could answer from your scenario.`, note: 'Extension activity' },
          ...(includeAnswerKey ? [{ title: 'Answer Key', body: `Vocabulary and short answers should be checked for accurate use of ${topic}.\nFill in the blank answers vary but should be specific and relevant.\nMatching: A-1, B-2, C-3, D-4.\nChallenge task: accept clear scenarios that correctly apply the concept.`, note: 'Teacher copy' }] : [])
        ];
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Worksheet Pack', sections, 'Educational draft. Review for age fit, accuracy, and classroom expectations before use.');
      }
      break;
    }
    case 'rubric-generator': {
      {
        const assignment = compactSeed(text, 'The Assignment');
        const level = optionValue('rubric-level', 'high-school');
        const criteriaCount = Math.max(3, Math.min(6, Number(optionValue('rubric-criteria-count', '4')) || 4));
        const scale = optionValue('rubric-scale', '4-point');
        const includeFeedback = optionValue('rubric-include-feedback', 'true') === 'true';
        const criteria = ['Content And Accuracy', 'Organization', 'Evidence And Support', 'Critical Thinking', 'Presentation', 'Reflection'].slice(0, criteriaCount);
        const rubric = criteria.map((criterion, i) => `${i + 1}. ${criterion}\n   4 - Excellent: precise, complete, and clearly connected to ${assignment}.\n   3 - Proficient: mostly clear and accurate with minor gaps.\n   2 - Developing: partial understanding with missing detail or uneven support.\n   1 - Beginning: limited, unclear, incomplete, or off-task.`).join('\n\n');
        const sections = [
          { title: 'Rubric Overview', body: `Assignment: ${assignment}\nLevel: ${titleCase(level.replace(/-/g, ' '))}\nScale: ${scale}\nCriteria: ${criteriaCount}\nSuggested total: ${criteriaCount * 4} points`, note: 'Analytic rubric' },
          { title: 'Criteria And Levels', body: rubric, note: 'Four performance levels' },
          { title: 'Scoring Summary', body: criteria.map(criterion => `${criterion}: 1-4 points`).join('\n') + `\nTotal: Optional user-fill score / ${criteriaCount * 4}`, note: 'Point-weighted summary' },
          ...(includeFeedback ? [{ title: 'Feedback Stems', body: `Strength: Your work is effective because Optional user-fill specific evidence.\nNext step: Improve by Optional user-fill focused revision.\nQuestion: What would happen if you added Optional user-fill example or source?\nRevision target: Recheck clarity, evidence, and connection to the assignment goal.`, note: 'Teacher comment starters' }] : []),
          { title: 'Student Checklist', body: `I answered the prompt for ${assignment}.\nI used accurate details or evidence.\nMy work has a clear beginning, middle, and end.\nI checked grammar, formatting, and submission instructions.\nI can explain one improvement I made.`, note: 'Before submission' }
        ];
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Analytic Rubric Builder', sections, 'Draft rubric only. Teachers should adapt criteria, fairness, accommodations, and scoring to context.');
      }
      break;
    }
    case 'assignment-generator': {
      {
        const topic = compactSeed(text, 'The Topic');
        const subject = optionValue('assignment-subject', 'general');
        const level = optionValue('assignment-level', 'high-school');
        const type = optionValue('assignment-type', 'essay');
        const duration = optionValue('assignment-duration', 'one-week');
        const includeRubric = optionValue('assignment-include-rubric', 'true') === 'true';
        const sections = [
          { title: 'Assignment Brief', body: `Title: ${topic} ${titleCase(type.replace(/-/g, ' '))}\nSubject: ${titleCase(subject)}\nLevel: ${titleCase(level.replace(/-/g, ' '))}\nDuration: ${titleCase(duration.replace(/-/g, ' '))}\nWork mode: Optional user-fill individual, pair, or group`, note: 'Teacher-ready overview' },
          { title: 'Objective', body: `Students will explore ${topic}, organize evidence or examples, and produce a clear response that shows understanding of the subject.`, note: 'Learning goal' },
          { title: 'Task', body: `Create a ${type.replace(/-/g, ' ')} about ${topic}. Your work should explain the central idea, include specific examples, and show how the details support your conclusion.`, note: 'Student-facing prompt' },
          { title: 'Requirements', body: `- Include a clear title or research question\n- Use at least Optional user-fill number of approved sources or examples\n- Organize work into sections or paragraphs\n- Cite or credit sources when required\n- Submit an original draft and any required planning notes`, note: 'Submission requirements' },
          { title: 'Deliverables', body: `1. Planning notes or outline\n2. Final ${type.replace(/-/g, ' ')} draft\n3. Short reflection on what changed during revision`, note: 'Copyable checklist' },
          { title: 'Submission Format', body: `Format: Optional user-fill document, slides, worksheet, or LMS submission\nDue date: Optional user-fill date\nFile name: Optional user-fill naming convention`, note: 'Clearly labeled placeholders' },
          ...(includeRubric ? [{ title: 'Rubric Hint', body: `Content accuracy: 40%\nOrganization and clarity: 25%\nEvidence or examples: 25%\nPresentation and submission requirements: 10%`, note: 'Assessment snapshot' }] : []),
          { title: 'Academic Integrity Note', body: `Use this assignment as planning and drafting support. Students should use their own thinking, cite required sources, and follow teacher instructions.`, note: 'Honest classroom framing' }
        ];
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Assignment Brief Generator', sections, 'Draft assignment only. Review for age fit, safety, accessibility, and course requirements.');
      }
      break;
    }
    case 'graphql-query-generator': {
      const resource = slugifyLocal(text || 'users').replace(/-/g, '');
      const singular = resource.endsWith('s') ? resource.slice(0, -1) : resource;
      const cap = toPascal(singular, 'Item');
      const opType = optionValue('graphql-operation', 'query');
      const fields = parseFieldList(optionValue('graphql-fields', 'id, name, email, createdAt'), ['id', 'name', 'email', 'createdAt']);
      const selection = fields.map(field => `    ${field}`).join('\n');
      const operation = opType === 'mutation'
        ? `mutation Create${cap}($input: ${cap}Input!) {\n  create${cap}(input: $input) {\n${selection}\n  }\n}`
        : `query Get${cap}($id: ID!) {\n  ${singular}(id: $id) {\n${selection}\n  }\n}`;
      const variables = opType === 'mutation' ? `{\n  "input": {\n    "name": "Example ${cap}"\n  }\n}` : `{\n  "id": "example-id"\n}`;
      const fragment = `fragment ${cap}Fields on ${cap} {\n${selection}\n}`;
      const response = `{\n  "data": {\n    "${opType === 'mutation' ? 'create' + cap : singular}": {\n${fields.map(field => `      "${field}": "sample"`).join(',\n')}\n    }\n  }\n}`;
      result = `GraphQL Operation\n${operation}\n\nVariables JSON\n${variables}\n\nFragment\n${fragment}\n\nExpected Response Shape\n${response}`;
      resultHtml = renderSectionSuite('GraphQL Operation Draft', [
        { title: 'Operation', body: operation, note: opType },
        { title: 'Variables JSON', body: variables, note: 'Example variables' },
        { title: 'Response Shape', body: response, note: 'Illustrative only' },
        { title: 'Fragment', body: fragment, note: 'Reusable field set' }], 'No endpoint execution or schema introspection is performed.');
      break;
    }
    case 'mock-api-generator': {
      const resource = slugifyLocal(text || 'users', 'users');
      const method = optionValue('mock-method', 'GET');
      const count = clampNumber(optionValue('mock-count', '3'), 3, 1, 10);
      const fields = parseFieldList(optionValue('mock-fields', 'id, name, email, status'), ['id', 'name', 'email', 'status']);
      const data = Array.from({ length: count }, (_, i) => Object.fromEntries(fields.map(field => [field, field === 'id' ? i + 1 : field.includes('email') ? `user${i + 1}@example.test` : field === 'status' ? 'active' : `Sample ${titleCase(field)} ${i + 1}`])));
      const response = JSON.stringify({ status: 200, data, meta: { count, resource } }, null, 2);
      const errors = JSON.stringify({ status: 404, error: { code: 'NOT_FOUND', message: `${titleCase(resource)} item was not found.` } }, null, 2);
      const routeTable = `${method} /api/${resource} | 200 | list ${resource}\nGET /api/${resource}/:id | 200 | single item\nPOST /api/${resource} | 201 | create item\nGET /api/${resource}/missing | 404 | not found example`;
      const curl = `curl -X ${method} https://api.example.test/${resource} -H "Accept: application/json"`;
      const fixture = `export const ${safeIdent(resource)}Mock = ${response};`;
      const schema = fields.map(field => `${field}: ${field === 'id' ? 'number' : 'string'}`).join('\n');
      result = `Route Table\n${routeTable}\n\nResponse JSON\n${response}\n\nError Responses\n${errors}\n\ncURL Example\n${curl}\n\nFixture Object\n${fixture}\n\nSchema Map\n${schema}`;
      resultHtml = renderSectionSuite('Mock API Contract', [
        { title: 'Route Table', body: routeTable, note: 'Endpoint summary' },
        { title: 'Response JSON', body: response, note: `${count} fictional rows` },
        { title: 'Error Responses', body: errors, note: 'Status variant' },
        { title: 'cURL Example', body: curl, note: 'Illustrative request' },
        { title: 'Fixture Object', body: fixture, note: 'Frontend fixture' },
        { title: 'Schema Map', body: schema, note: 'JSON schema-lite' }], 'Mock data is fictional and contains no real credentials or personal data.');
      break;
    }
    case 'wheel-spinner-generator': {
      if (!text) { result = 'Enter items separated by commas or newlines above.'; break; }
      
      let items = text.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
      
      const filterUnique = optionValue('wheel-unique', 'true') === 'true';
      if (filterUnique) {
        items = [...new Set(items)];
      }

      if (items.length === 0) {
        result = 'Please enter at least one valid entry.';
        break;
      }

      const spinCount = Math.max(1, Math.min(items.length, Number(optionValue('wheel-spin-count', '1')) || 1));
      const removeWinner = optionValue('wheel-remove-winner', 'false') === 'true';

      const secureShuffle = <T>(arr: T[]): T[] => {
        const copy = [...arr];
        const randomValues = new Uint32Array(copy.length);
        crypto.getRandomValues(randomValues);
        for (let i = copy.length - 1; i > 0; i--) {
          const j = randomValues[i] % (i + 1);
          const temp = copy[i];
          copy[i] = copy[j];
          copy[j] = temp;
        }
        return copy;
      };

      let pool = [...items];
      const winners: string[] = [];

      for (let w = 0; w < spinCount; w++) {
        if (pool.length === 0) break;
        pool = secureShuffle(pool);
        const selected = pool[0];
        winners.push(selected);
        if (removeWinner) {
          pool = pool.filter(item => item !== selected);
        }
      }

      const winnersStr = winners.map((winner, i) => `Draw #${i + 1}: 🏆 ${winner}`).join('\n');
      const remainingStr = pool.length > 0 ? pool.join(', ') : 'None (all entries drawn)';

      const sections = [
        { 
          title: 'Spin Winners', 
          body: winnersStr, 
          note: `Selected ${spinCount} winner(s) out of ${items.length} options.` 
        },
        { 
          title: 'Pool Details', 
          body: `Deducted Winners: ${removeWinner ? 'Yes' : 'No'}\nUnique Entries: ${filterUnique ? 'Yes' : 'No'}\nOriginal Entries: ${items.join(', ')}\nRemaining Pool: ${remainingStr}`,
          note: 'Detailed status of spinner pool.'
        }
      ];

      result = `🏆 WINNERS:\n${winners.join('\n')}`;
      resultHtml = renderSectionSuite('Wheel Spinner Results', sections, 'Spins are determined locally in your browser using cryptographically secure random values (PRNG).');
      break;
    }
    case 'shopify-description-generator': {
      const product = text || 'premium product';
      const cap = product.charAt(0).toUpperCase()+product.slice(1);
      result = `${cap}\n\n${cap} - crafted with care for those who expect the best.\n\nWhy you\'ll love it:\n- [Key benefit that solves a problem]\n- [Quality/material highlight]\n- [Convenience/ease-of-use feature]\n\nSpecifications:\n- Material: [Material]\n- Dimensions: [Size]\n- Weight: [Weight]\n\nShipping & Returns:\nFree shipping on orders over $50. 30-day hassle-free returns.\n\nFive-star review: "Best ${product} I\'ve ever used!" - Verified Buyer`;
      break;
    }
    case 'product-benefits-generator': {
      const product = compactSeed(text, 'Noise Canceling Headphones');
      const angle = optionValue('benefits-angle', 'practical');
      const stage = optionValue('benefits-stage', 'comparing');
      const count = Math.max(3, Math.min(8, Number(optionValue('benefits-count', '5')) || 5));
      const featureSeeds = [
        'clear product information',
        'verified material or build detail',
        'simple setup or use pattern',
        'portable or space-saving design',
        'easy care or maintenance instructions',
        'compatible accessories or variants',
        'thoughtful packaging or presentation',
        'support or policy details'
      ].slice(0, count);
      const matrix = featureSeeds.map(feature => {
        const practical = `${product} turns ${feature} into an easier purchase decision.`;
        const emotional = `Shoppers feel more confident because ${feature} is easy to understand.`;
        const outcome = `Buyer outcome: less uncertainty when comparing ${product.toLowerCase()} with alternatives.`;
        const line = `${titleCase(feature)} that helps buyers choose ${product}.`;
        const comparison = `Comparison angle: highlight ${feature} only against real product facts, not unverified competitor claims.`;
        return `Feature: ${feature}\nPractical benefit: ${practical}\nEmotional benefit: ${emotional}\nBuyer outcome: ${outcome}\nShort benefit line: ${line}\nComparison angle: ${comparison}`;
      });
      const sections = [
        { title: 'Feature-To-Benefit Matrix', body: matrix.join('\n\n'), note: `${count} feature conversions` },
        { title: 'Practical Benefits', body: featureSeeds.map(feature => `- ${product}: ${feature} makes the product easier to evaluate and use.`).join('\n'), note: 'Functional value' },
        { title: 'Emotional Benefits', body: featureSeeds.map(feature => `- More confidence because ${feature} is explained clearly.`).join('\n'), note: 'Buyer confidence' },
        { title: 'Buyer Outcomes', body: featureSeeds.map(feature => `- Clearer decision around ${feature} before checkout.`).join('\n'), note: `Purchase stage: ${stage}` },
        { title: 'Short Benefit Lines', body: featureSeeds.map(feature => `- ${titleCase(feature)} for a clearer ${product.toLowerCase()} choice.`).join('\n'), note: 'Ad and PDP snippets' },
        { title: 'Comparison Angles', body: featureSeeds.map(feature => `- Compare ${feature} using verified specs, photos, policies, or included-item details.`).join('\n'), note: `Primary angle: ${angle}` },
        { title: 'Claim Safety Note', body: 'Avoid unsupported claims, guaranteed outcomes, fake evidence, medical or financial benefits, and unverifiable sustainability or durability promises.', note: 'Review before publishing' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Product Benefits Matrix', sections, `Angle: ${angle}. Convert only verified features into publishable benefits.`);
      break;
    }
    case 'pattern-generator': {
      const style = optionValue('pattern-style', 'dots');
      const color = optionValue('pattern-color', '#2563EB');
      const bg = optionValue('pattern-background', '#F8FAFC');
      const size = Math.max(8, Math.min(80, Number(optionValue('pattern-size', '24')) || 24));
      const cssMap: Record<string, string> = {
        dots: `background-color: ${bg};\nbackground-image: radial-gradient(${color} 1.5px, transparent 1.5px);\nbackground-size: ${size}px ${size}px;`,
        stripes: `background: repeating-linear-gradient(45deg, ${color}, ${color} ${Math.max(4, size / 3)}px, ${bg} ${Math.max(4, size / 3)}px, ${bg} ${Math.max(8, size)}px);`,
        grid: `background-color: ${bg};\nbackground-image: linear-gradient(${color}33 1px, transparent 1px), linear-gradient(90deg, ${color}33 1px, transparent 1px);\nbackground-size: ${size}px ${size}px;`,
        checker: `background-color: ${bg};\nbackground-image: linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(-45deg, ${color} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${color} 75%), linear-gradient(-45deg, transparent 75%, ${color} 75%);\nbackground-size: ${size}px ${size}px;\nbackground-position: 0 0, 0 ${size / 2}px, ${size / 2}px -${size / 2}px, -${size / 2}px 0;`
      };
      const css = `.pattern-background {\n  ${cssMap[style] || cssMap.dots}\n}`;
      const sections = [
        { title: 'Pattern CSS', body: css, note: `${titleCase(style)} repeat pattern` },
        { title: 'Settings', body: `Repeat style: ${style}\nForeground: ${color}\nBackground: ${bg}\nTile size: ${size}px`, note: 'Option-aware values' },
        { title: 'Usage Note', body: 'Use subtle opacity for large areas and test readability if text appears on top of the pattern.', note: 'Design review' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPreviewCodeSuite('CSS Pattern Preview', `<div style="min-height:220px;border-radius:12px;${escapeHtml(cssMap[style] || cssMap.dots)}"></div>`, sections, 'Pattern uses pure CSS backgrounds, no image export required.');
      break;
    }
    case 'blob-generator': {
      const seed = compactSeed(text, 'blob shape');
      const style = optionValue('blob-style', 'soft');
      const fill = optionValue('blob-fill', '#6366F1');
      const size = Math.max(120, Math.min(360, Number(optionValue('blob-size', '220')) || 220));
      const base = seedNumber(seed, 'blob');
      const shape = style === 'sharp'
        ? `${35 + base % 20}% ${65 - base % 20}% ${42 + base % 15}% ${58 - base % 15}% / 48% 37% 63% 52%`
        : style === 'round'
          ? '50% 50% 48% 52% / 52% 48% 52% 48%'
          : `${58 + base % 12}% ${42 - base % 12}% ${64 - base % 18}% ${36 + base % 18}% / 45% 58% 42% 55%`;
      const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(seed)} blob shape">\n  <path fill="${fill}" d="M43.7,-62.2C55.4,-51.9,62.7,-37.2,68.1,-21.7C73.5,-6.2,77,10.1,70.9,22.5C64.8,34.9,49.1,43.4,34.7,52.7C20.3,62,7.2,72.1,-6.5,75.3C-20.2,78.5,-34.5,74.8,-47.3,66.1C-60.1,57.4,-71.4,43.7,-75.2,28.2C-79,12.7,-75.4,-4.6,-68.8,-19.4C-62.2,-34.2,-52.6,-46.5,-40.5,-56.6C-28.5,-66.7,-14.2,-74.6,0.9,-75.9C16,-77.1,32,-72.6,43.7,-62.2Z" transform="translate(100 100)" />\n</svg>`;
      const css = `.blob-shape {\n  width: ${size}px;\n  height: ${size}px;\n  border-radius: ${shape};\n  background: ${fill};\n}`;
      const sections = [
        { title: 'CSS Blob', body: css, note: `${titleCase(style)} shape` },
        { title: 'SVG Blob', body: svg, note: 'Copyable inline SVG' },
        { title: 'Usage Note', body: 'Blob shapes are decorative design assets. Keep them behind content or away from important text and controls.', note: 'Layout safety' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPreviewCodeSuite('Blob Shape Preview', `<div style="display:grid;place-items:center;min-height:${size + 40}px;background:#f8fafc;border-radius:12px;"><div style="width:${size}px;height:${size}px;border-radius:${escapeHtml(shape)};background:${escapeHtml(fill)};"></div></div>`, sections, 'Copy CSS for a live shape or SVG for a portable vector.');
      break;
    }
    case 'wave-generator': {
      const amplitude = Math.max(20, Math.min(120, Number(optionValue('wave-amplitude', '64')) || 64));
      const layers = Math.max(1, Math.min(3, Number(optionValue('wave-layers', '2')) || 2));
      const fill = optionValue('wave-fill', '#2563EB');
      const h = amplitude + 80;
      const path1 = `M0,${Math.floor(h * 0.45)} C240,${Math.floor(h * 0.15)} 420,${Math.floor(h * 0.82)} 720,${Math.floor(h * 0.48)} C960,${Math.floor(h * 0.22)} 1160,${Math.floor(h * 0.62)} 1440,${Math.floor(h * 0.38)} L1440,${h} L0,${h} Z`;
      const path2 = `M0,${Math.floor(h * 0.55)} C280,${Math.floor(h * 0.35)} 520,${Math.floor(h * 0.75)} 800,${Math.floor(h * 0.5)} C1040,${Math.floor(h * 0.28)} 1210,${Math.floor(h * 0.6)} 1440,${Math.floor(h * 0.42)} L1440,${h} L0,${h} Z`;
      const svg = `<svg class="wave-divider" viewBox="0 0 1440 ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n  ${layers > 1 ? `<path fill="${fill}" opacity="0.35" d="${path2}"/>\n  ` : ''}<path fill="${fill}" d="${path1}"/>\n</svg>`;
      const css = `.wave-divider {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n.wave-section {\n  position: relative;\n  overflow: hidden;\n}`;
      const sections = [
        { title: 'SVG Wave', body: svg, note: `${layers} layer(s), ${amplitude}px amplitude` },
        { title: 'CSS', body: css, note: 'Responsive divider styling' },
        { title: 'Usage Note', body: 'Place the SVG between sections or at the bottom of a hero. Keep important content away from the wave overlap area.', note: 'Layout safety' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPreviewCodeSuite('Wave Divider Preview', `<div style="background:#f8fafc;border-radius:12px;overflow:hidden;"><div style="height:90px;background:#e0f2fe;"></div>${svg}</div>`, sections, 'Copy the SVG and CSS. No bitmap export is claimed.');
      break;
    }
    case 'viking-name-generator': {
      const firsts = ['Ragnar','Bjorn','Ivar','Rollo','Floki','Leif','Erik','Harald','Halfdan','Sigurd','Lagertha','Aslaug','Helga','Torvi','Astrid','Freydis','Gunnhild','Gyda','Siggy','Porunn'];
      const lasts = ['Lothbrok','Ironside','the Boneless','Bloodaxe','Bluetooth','Fairhair','Hardrada','Snake-in-the-Eye','Forkbeard','Finehair'];
      result = generateMultiple(() => `${randomFrom(firsts)} ${randomFrom(lasts)}`, 8);
      break;
    }
    case 'wizard-name-generator': {
      const firsts = ['Albus','Gandalf','Merlin','Saruman','Elminster','Radagast','Mordenkainen','Tasha','Bigby','Drawmij','Otiluke','Rary','Leomund','Nystul','Evard'];
      const lasts = ['the Grey','the White','Stormcaller','Fireweaver','Starwatcher','Voidwalker','Spellbinder','the Wise','the Ancient','Shadowcaster'];
      result = generateMultiple(() => `${randomFrom(firsts)} ${randomFrom(lasts)}`, 8);
      break;
    }
    case 'villain-name-generator': {
      const seed = compactSeed(text, 'Shadow');
      const style = optionValue('villain-style', 'dark-lord');
      const banks: Record<string, { name: string, reason: string, extra: string }[]> = {
        'dark-lord': [
          { name: 'Lord Veyran Blackspire', reason: 'Arcane conqueror archetype.', extra: 'Best use: fantasy emperor.' },
          { name: 'Mordain the Hollow', reason: 'Undead or void ruler.', extra: 'Best use: lich or necromancer.' },
          { name: 'Kael Nocturne', reason: 'Dark sorcerer or eclipse lord.', extra: 'Best use: cult leader.' },
          { name: 'Vesper Thorn', reason: 'Shadow-manipulating monarch.', extra: 'Best use: rebel warlord.' },
          { name: 'Darian Ashvale', reason: 'Corrupted noble or knight.', extra: 'Best use: fallen protector.' }
        ],
        mastermind: [
          { name: 'Silas Vale', reason: 'Industrialist or shadow broker.', extra: 'Best use: sci-fi corporate lead.' },
          { name: 'Marcellus Vane', reason: 'Political schemer or strategist.', extra: 'Best use: royal advisor.' },
          { name: 'Irene Blackwell', reason: 'Information dealer or spy master.', extra: 'Best use: syndicate head.' },
          { name: 'Cassian Rook', reason: 'Brilliant rogue or cartel lead.', extra: 'Best use: heist antagonist.' },
          { name: 'Octavia Glass', reason: 'Cold, calculative scientist.', extra: 'Best use: tech developer antagonist.' }
        ],
        'elegant-villainess': [
          { name: 'Lady Seraphine Voss', reason: 'High-society vampire or aristocrat.', extra: 'Best use: gothic antagonist.' },
          { name: 'Evelina Graves', reason: 'Noble host with dark secrets.', extra: 'Best use: manor host.' },
          { name: 'Marquise Adrienne Vale', reason: 'Court diplomat or poisoner.', extra: 'Best use: court intriguer.' },
          { name: 'Celeste Blackthorn', reason: 'Sorceress or dark priestess.', extra: 'Best use: coven leader.' },
          { name: 'Isadora Nightwell', reason: 'Eldritch collector or witch.', extra: 'Best use: museum curator antagonist.' }
        ],
        'rival-antagonist': [
          { name: 'Rowan Cross', reason: 'Mirror reflection rival.', extra: 'Best use: competitive colleague.' },
          { name: 'Mira Vexley', reason: 'Academy challenger or trickster.', extra: 'Best use: school rival.' },
          { name: 'Damon Strake', reason: 'Ruthless mercenary or hunter.', extra: 'Best use: active bounty hunter.' },
          { name: 'Clara Winters', reason: 'Ex-partner or betrayed ally.', extra: 'Best use: personal emotional rival.' },
          { name: 'Julian Wraith', reason: 'Vigilante with opposing methods.', extra: 'Best use: anti-hero antagonist.' }
        ]
      };

      const items = banks[style] || banks['dark-lord'];
      const groups = [
        {
          title: `Villain Names (${style.replace(/-/g, ' ').toUpperCase()})`,
          note: 'Tailored character alias ideas.',
          items: items.map(item => ({
            name: item.name.includes(seed) ? item.name : `${item.name} (${seed})`,
            reason: item.reason,
            extra: item.extra
          }))
        }
      ];

      result = groups.map(group => group.title + '\n' + group.items.map(i => `${i.name} - ${i.reason}`).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Check existing publications, games, and trademark registries before public character naming.');
      break;
    }
    case 'werewolf-name-generator': {
      const firsts = ['Fenrir','Lycaon','Remus','Romulus','Jacob','Lucian','William','Silas','Marcus','Viktor','Michael','Corvinus','Raze','Sabian','Singe'];
      const lasts = ['Bloodmoon','Nightcrawler','Shadowfang','Darkhowl','Silverclaw','Moonbane','Wolfheart','Grimfang','Bloodfang','Nightfang'];
      result = generateMultiple(() => `${randomFrom(firsts)} ${randomFrom(lasts)}`, 8);
      break;
    }
    case 'japanese-name-generator': {
      const lasts = ['Sato','Suzuki','Takahashi','Tanaka','Watanabe','Ito','Yamamoto','Nakamura','Kobayashi','Kato'];
      const firsts = ['Haruto','Yuto','Sota','Yuki','Hayato','Haruki','Ryota','Kaito','Yuri','Riku','Hina','Yui','Sakura','Mei','Rio','Yuna','Koharu','Hinata','Mio','Aoi'];
      result = generateMultiple(() => `${randomFrom(lasts)} ${randomFrom(firsts)}`, 8);
      break;
    }
    case 'korean-name-generator': {
      const lasts = ['Kim','Lee','Park','Choi','Jeong','Kang','Cho','Yoon','Jang','Lim'];
      const firsts = ['Min-jun','Seo-jun','Do-yun','Ye-jun','Si-woo','Ji-ho','Hae-in','Joo-won','Eun-woo','Geon-woo','Seo-yeon','Seo-yun','Ji-woo','Seo-hyun','Ha-eun','Ha-yoon','Min-seo','Ji-yoo','Ji-min','Chae-won'];
      result = generateMultiple(() => `${randomFrom(lasts)} ${randomFrom(firsts)}`, 8);
      break;
    }
    case 'city-name-generator': {
      const prefix = ['New ','Old ','North ','South ','East ','West ','Upper ','Lower ','Great ','Little '];
      const root = ['Spring','River','Lake','Wood','Hill','Mount','Stone','Iron','Gold','Silver','Black','White','Red','Blue','Green'];
      const suffix = ['field','ford','ville','ton','burg','borough','bury','mouth','port','haven','wood','bridge','water','land','stead'];
      result = generateMultiple(() => `${Math.random() > 0.7 ? randomFrom(prefix) : ''}${randomFrom(root)}${randomFrom(suffix)}`, 8);
      break;
    }
    case 'restaurant-name-generator': {
      const seed = compactSeed(text, 'Neighborhood Kitchen');
      const core = seed.split(/\s+/)[0] || 'Harvest';
      const groups = [
        { title: 'Cuisine', note: 'Flexible cuisine-forward names.', items: [{ name: core + ' Kitchen', reason: 'Clear dining signal.', extra: 'Best use: general cuisine.' }, { name: seed + ' Table', reason: 'Warm food-service cue.', extra: 'Best use: casual dining.' }, { name: core + ' Grill', reason: 'Direct and menu-friendly.', extra: 'Best use: grilled or hearty menu.' }] },
        { title: 'Premium', note: 'Elevated dining names.', items: [{ name: core + ' Reserve', reason: 'Refined and selective.', extra: 'Best use: upscale restaurant.' }, { name: seed + ' House', reason: 'Established feel.', extra: 'Best use: premium dining.' }, { name: core + ' Atelier', reason: 'Craft-led positioning.', extra: 'Best use: chef-driven concept.' }] },
        { title: 'Local', note: 'Neighborhood and place-friendly.', items: [{ name: core + ' Street Kitchen', reason: 'Easy to localize.', extra: 'Best use: local restaurant.' }, { name: seed + ' Corner', reason: 'Friendly neighborhood tone.', extra: 'Best use: casual local spot.' }, { name: core + ' County Table', reason: 'Regional cue.', extra: 'Best use: local sourcing.' }] },
        { title: 'Modern', note: 'Clean contemporary names.', items: [{ name: core + ' Dining', reason: 'Minimal and clear.', extra: 'Best use: modern restaurant.' }, { name: seed + ' Room', reason: 'Polished venue feel.', extra: 'Best use: dinner concept.' }, { name: core + ' & Co.', reason: 'Contemporary but approachable.', extra: 'Best use: casual-modern.' }] },
        { title: 'Family', note: 'Warm and accessible.', items: [{ name: core + ' Family Kitchen', reason: 'Direct audience cue.', extra: 'Best use: family dining.' }, { name: seed + ' Supper Club', reason: 'Friendly shared-meal feel.', extra: 'Best use: community dining.' }, { name: core + ' Plate', reason: 'Simple and welcoming.', extra: 'Best use: everyday restaurant.' }] },
        { title: 'Fusion', note: 'Good for blended concepts.', items: [{ name: core + ' Fusion Table', reason: 'Cuisine-mix signal.', extra: 'Best use: fusion concept.' }, { name: seed + ' Crossroads', reason: 'Blended culture cue.', extra: 'Best use: mixed menu.' }, { name: core + ' Mosaic Kitchen', reason: 'Variety and creativity.', extra: 'Best use: global flavors.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('restaurant-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Restaurant name ideas are brainstorming drafts only. Check local business registrations, trademarks, domains, and social handles before launch.');
      break;
    }
    case 'coffee-shop-name-generator': {
      const seed = compactSeed(text, 'Morning Roast');
      const core = seed.split(/\s+/)[0] || 'Bean';
      const groups = [
        { title: 'Cozy', note: 'Warm and welcoming coffee shop names.', items: [{ name: 'The Cozy ' + core, reason: 'Soft and inviting.', extra: 'Tagline: Your cup, your corner.' }, { name: core + ' Nook Coffee', reason: 'Small-shop charm.', extra: 'Tagline: Coffee for slow mornings.' }, { name: 'Little ' + core + ' Cafe', reason: 'Friendly and approachable.', extra: 'Tagline: A friendly stop for fresh coffee.' }] },
        { title: 'Artisan', note: 'Craft and roasting focus.', items: [{ name: core + ' Roasters', reason: 'Direct craft signal.', extra: 'Tagline: Roasted with care, poured with purpose.' }, { name: seed + ' Press', reason: 'Coffee method cue.', extra: 'Tagline: Better coffee, thoughtfully brewed.' }, { name: core + ' Grindhouse', reason: 'Strong coffee identity.', extra: 'Tagline: Fresh grounds, daily rituals.' }] },
        { title: 'Modern', note: 'Minimal contemporary names.', items: [{ name: core + ' Bar', reason: 'Short and current.', extra: 'Tagline: Coffee, cleanly done.' }, { name: seed + ' Studio', reason: 'Design-forward.', extra: 'Tagline: A modern room for better coffee.' }, { name: core + ' Room', reason: 'Flexible cafe identity.', extra: 'Tagline: Sip, work, stay awhile.' }] },
        { title: 'Local', note: 'Neighborhood-friendly names.', items: [{ name: core + ' Street Coffee', reason: 'Easy to place in a neighborhood.', extra: 'Tagline: Your local daily brew.' }, { name: seed + ' Corner', reason: 'Community feel.', extra: 'Tagline: Coffee around the corner.' }, { name: core + ' County Roasters', reason: 'Regional cue.', extra: 'Tagline: Roasted close to home.' }] },
        { title: 'Specialty', note: 'For espresso bars and high-quality beans.', items: [{ name: core + ' Reserve Coffee', reason: 'Premium coffee signal.', extra: 'Tagline: Selected beans, careful pours.' }, { name: seed + ' Origin', reason: 'Bean-origin cue.', extra: 'Tagline: Coffee with a point of origin.' }, { name: core + ' Single Pour', reason: 'Specialty preparation cue.', extra: 'Tagline: One thoughtful cup at a time.' }] },
        { title: 'Playful', note: 'Light and memorable directions.', items: [{ name: core + ' Buzz', reason: 'Energetic and simple.', extra: 'Tagline: Good coffee, good energy.' }, { name: 'Cup of ' + core, reason: 'Conversational and friendly.', extra: 'Tagline: A little lift in every cup.' }, { name: core + ' Sips', reason: 'Casual and social.', extra: 'Tagline: Sip happy, stay awhile.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('coffee-shop-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Coffee shop names are brainstorming ideas only. Verify local business names, trademarks, domains, and handles before use.');
      break;
    }
    case 'album-name-generator': {
      const seed = compactSeed(text, 'Afterglow');
      const groups = [
        { title: 'Concept Album', note: 'Titles that imply a full narrative arc.', items: [{ name: 'The ' + seed + ' Sequence', reason: 'Album-length journey cue.', extra: 'Best use: concept album.' }, { name: seed + ' in Three Acts', reason: 'Structured and theatrical.', extra: 'Best use: narrative album.' }, { name: 'Atlas of ' + seed, reason: 'Broad world-building feel.', extra: 'Best use: ambitious LP.' }] },
        { title: 'Pop', note: 'Bright and accessible album titles.', items: [{ name: seed + ' Season', reason: 'Easy campaign phrase.', extra: 'Best use: pop album.' }, { name: 'All About ' + seed, reason: 'Direct and catchy.', extra: 'Best use: radio pop.' }, { name: seed + ' Hearts', reason: 'Emotional and simple.', extra: 'Best use: pop release.' }] },
        { title: 'Indie', note: 'Personal and understated titles.', items: [{ name: seed + ' Apartment', reason: 'Intimate setting.', extra: 'Best use: indie record.' }, { name: 'Notes from ' + seed, reason: 'Journal-like tone.', extra: 'Best use: songwriter album.' }, { name: seed + ' Weather', reason: 'Atmospheric and flexible.', extra: 'Best use: indie rock.' }] },
        { title: 'Dark', note: 'Moody titles without unsafe content.', items: [{ name: seed + ' After Midnight', reason: 'Cinematic darkness.', extra: 'Best use: dark pop.' }, { name: 'Low ' + seed, reason: 'Minimal moody phrase.', extra: 'Best use: alt record.' }, { name: 'The Shadow of ' + seed, reason: 'Dramatic but safe.', extra: 'Best use: gothic or heavy album.' }] },
        { title: 'Poetic', note: 'Image-rich album names.', items: [{ name: 'A Garden Called ' + seed, reason: 'Lyrical metaphor.', extra: 'Best use: poetic album.' }, { name: seed + ' and Other Weather', reason: 'Literary phrasing.', extra: 'Best use: folk or indie.' }, { name: 'Letters Beneath ' + seed, reason: 'Narrative image.', extra: 'Best use: acoustic album.' }] },
        { title: 'Minimal', note: 'Short album names for clean covers.', items: [{ name: seed, reason: 'Simple title-track approach.', extra: 'Best use: minimal LP.' }, { name: seed + ' One', reason: 'Clean edition feel.', extra: 'Best use: debut.' }, { name: 'Soft ' + seed, reason: 'Two-word mood.', extra: 'Best use: ambient release.' }] },
        { title: 'Cinematic', note: 'Wide-screen album title ideas.', items: [{ name: seed + ' Horizon', reason: 'Big visual frame.', extra: 'Best use: cinematic album.' }, { name: 'The Long Road to ' + seed, reason: 'Journey structure.', extra: 'Best use: soundtrack-like LP.' }, { name: seed + ' in Wide Screen', reason: 'Film-like mood.', extra: 'Best use: instrumental album.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('album-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: album names are creative suggestions only. Check existing releases, artist catalogs, and trademark concerns before use.');
      break;
    }
    case 'book-name-generator': {
      const seed = compactSeed(text, 'Hidden Harbor');
      const groups = [
        { title: 'Fiction', note: 'Broad novel title directions.', items: [{ name: 'The ' + seed + ' Letters', reason: 'Built-in story object.', extra: 'Best use: fiction.' }, { name: 'A House Called ' + seed, reason: 'Place and mystery.', extra: 'Best use: literary fiction.' }, { name: 'After ' + seed, reason: 'Clean emotional setup.', extra: 'Best use: contemporary novel.' }] },
        { title: 'Nonfiction', note: 'Clear explanatory titles.', items: [{ name: 'Understanding ' + seed, reason: 'Direct reader promise.', extra: 'Best use: nonfiction.' }, { name: 'The Practical Guide to ' + seed, reason: 'Utility-focused.', extra: 'Best use: guidebook.' }, { name: seed + ' Explained', reason: 'Simple informational angle.', extra: 'Best use: educational book.' }] },
        { title: 'Memoir', note: 'Personal and reflective names.', items: [{ name: 'My Years in ' + seed, reason: 'Life-story frame.', extra: 'Best use: memoir.' }, { name: 'What ' + seed + ' Taught Me', reason: 'Reflective arc.', extra: 'Best use: personal essays.' }, { name: 'Leaving ' + seed, reason: 'Change and growth cue.', extra: 'Best use: memoir.' }] },
        { title: 'Business', note: 'Professional and benefit-led book titles.', items: [{ name: 'The ' + seed + ' Strategy', reason: 'Executive tone.', extra: 'Best use: business book.' }, { name: 'Building with ' + seed, reason: 'Action-focused.', extra: 'Best use: startup book.' }, { name: seed + ' Advantage', reason: 'Positioning cue.', extra: 'Best use: leadership book.' }] },
        { title: 'Fantasy', note: 'Quest and worldbuilding titles.', items: [{ name: 'The Crown of ' + seed, reason: 'Mythic object.', extra: 'Best use: fantasy.' }, { name: 'The Last Gate of ' + seed, reason: 'Journey and stakes.', extra: 'Best use: epic fantasy.' }, { name: seed + ' and the Starless Map', reason: 'Wonder and adventure.', extra: 'Best use: fantasy novel.' }] },
        { title: 'Mystery', note: 'Clue-forward title ideas.', items: [{ name: 'The Secret of ' + seed, reason: 'Classic mystery pattern.', extra: 'Best use: mystery.' }, { name: 'The ' + seed + ' Witness', reason: 'Character and crime cue.', extra: 'Best use: detective novel.' }, { name: 'No Trace at ' + seed, reason: 'Suspenseful but safe.', extra: 'Best use: thriller mystery.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('book-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: book title ideas are creative suggestions only. Check existing books, series names, and trademark issues before publishing.');
      break;
    }
    case 'movie-name-generator': {
      const seed = compactSeed(text, 'Last Signal');
      const groups = [
        { title: 'Action', note: 'Fast titles for high-motion concepts.', items: [{ name: seed + ' Run', reason: 'Immediate movement.', extra: 'Best use: action film.' }, { name: 'The ' + seed + ' Deadline', reason: 'Built-in urgency.', extra: 'Best use: chase thriller.' }, { name: 'Strike at ' + seed, reason: 'Direct conflict.', extra: 'Best use: action pitch.' }] },
        { title: 'Drama', note: 'Character-forward titles.', items: [{ name: 'The Days After ' + seed, reason: 'Emotional aftermath.', extra: 'Best use: drama.' }, { name: seed + ' Road', reason: 'Journey and memory.', extra: 'Best use: road drama.' }, { name: 'A Room in ' + seed, reason: 'Intimate setting.', extra: 'Best use: ensemble drama.' }] },
        { title: 'Comedy', note: 'Light, friendly movie title ideas.', items: [{ name: 'Meet Me at ' + seed, reason: 'Social premise.', extra: 'Best use: comedy.' }, { name: seed + ' Problems', reason: 'Simple comic setup.', extra: 'Best use: sitcom-style film.' }, { name: 'The ' + seed + ' Mix-Up', reason: 'Classic farce cue.', extra: 'Best use: family comedy.' }] },
        { title: 'Sci-Fi', note: 'Original speculative titles with no franchise references.', items: [{ name: 'Signal from ' + seed, reason: 'Space mystery cue.', extra: 'Best use: sci-fi.' }, { name: 'The ' + seed + ' Orbit', reason: 'Clean future tone.', extra: 'Best use: space drama.' }, { name: seed + ' Protocol', reason: 'Tech and stakes.', extra: 'Best use: sci-fi thriller.' }] },
        { title: 'Indie', note: 'Festival-friendly, understated titles.', items: [{ name: seed + ' Summer', reason: 'Personal and seasonal.', extra: 'Best use: indie film.' }, { name: 'Small Lights at ' + seed, reason: 'Visual and quiet.', extra: 'Best use: character film.' }, { name: 'After the ' + seed + ' Party', reason: 'Specific story moment.', extra: 'Best use: indie comedy-drama.' }] },
        { title: 'Thriller', note: 'Suspense titles without misleading claims.', items: [{ name: 'Before ' + seed, reason: 'Countdown structure.', extra: 'Best use: thriller.' }, { name: 'The ' + seed + ' File', reason: 'Investigation hook.', extra: 'Best use: mystery thriller.' }, { name: 'No Exit from ' + seed, reason: 'Contained tension.', extra: 'Best use: suspense film.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('movie-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: movie title ideas are creative suggestions only. Check existing films, series names, and trademark conflicts before use.');
      break;
    }
    case 'receipt-generator': {
      const item = compactSeed(text, 'Service Or Product');
      const businessType = optionValue('receipt-business-type', 'service');
      const currencyCode = optionValue('receipt-currency', 'usd').toUpperCase();
      const paymentMethod = optionValue('receipt-payment-method', 'card');
      const itemCount = Math.max(1, Math.min(8, Number(optionValue('receipt-item-count', '3')) || 3));
      const includePolicy = optionValue('receipt-include-policy', 'true') === 'true';
      const includeVerification = optionValue('receipt-include-verification', 'true') === 'true';

      const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', CAD: 'CA$', AUD: 'A$'
      };
      const symbol = currencySymbols[currencyCode] || '$';

      const rows = Array.from({ length: itemCount }, (_, i) => `Item ${i + 1}: ${i === 0 ? item : 'Optional user-fill item'} | Qty: 1 | Price: ${symbol}0.00 | Total: ${symbol}0.00`).join('\n');
      
      const sections = [
        { title: 'Receipt Draft Header', body: `Document type: Receipt draft\nBusiness: [Your Business Name]\nCustomer: [Customer Name]\nReceipt Reference: REC-${Math.floor(Math.random() * 90000 + 10000)}\nDate: ${new Date().toLocaleDateString()}\nBusiness Type: ${titleCase(businessType)}\nCurrency: ${currencyCode}`, note: 'Replace brackets with real business records.' },
        { title: 'Itemized Rows', body: rows, note: `${itemCount} editable line items` },
        { title: 'Payment Summary', body: `Subtotal: ${symbol}0.00\nTax/Fees: ${symbol}0.00\nTotal Paid: ${symbol}0.00\nPayment Method: ${titleCase(paymentMethod.replace(/-/g, ' '))}\nPayment Status: Paid / Completed`, note: 'Verify payment details.' },
        { title: 'Customer Message', body: `Thank you for your purchase of ${item}. Please keep this receipt draft with your records after replacing placeholders with real transaction details.`, note: 'Customer copy' },
        ...(includePolicy ? [{ title: 'Policy Placeholder', body: 'Returns & Refunds: Optional user-fill refund or exchange policy placeholder. Replace with your actual policy.', note: 'Clearly labeled policy placeholder' }] : []),
        ...(includeVerification ? [{ title: 'Verification Checklist', body: '- Verify payment is fully cleared in your payment gateway or processor.\n- Confirm item quantities and descriptions match the real sale.\n- Check tax calculation rules and compliance for your local jurisdiction.\n- Do not issue as fake proof of debt or for unverified funds.', note: 'Internal checklist' }] : []),
        { title: 'Disclaimer & Safety', body: 'This is a receipt template draft, not proof of payment by itself. Verify payment, tax, refund, and business record details in your actual billing system.', note: 'No accounting claim' }
      ];

      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Receipt Draft Template', sections, 'Template/draft style only. Do not use as fake official proof of payment.');
      break;
    }
    case 'nda-generator': {
      const topic = compactSeed(text, 'Project Alpha');
      const style = optionValue('pass29-style', 'all');

      const allSections = [
        { title: 'NDA Overview & Parties', body: `This Non-Disclosure Agreement ("Agreement") outline is drafted for ${topic}.\n- Disclosing Party: [Company/Individual Name]\n- Receiving Party: [Company/Individual Name]\n- Purpose: Mutual evaluation or discussion regarding ${topic}.`, note: 'Draft identification details.' },
        { title: 'Definition of Confidential Information', body: `Confidential Information includes all proprietary information, software, code, designs, business plans, trade secrets, and financial details related to ${topic} shared between the parties, whether written, oral, or electronic, and marked as confidential.`, note: 'Defines what must be protected.' },
        { title: 'Scope of Obligations', body: 'The Receiving Party agrees:\n- To keep the information strictly confidential.\n- To use the information only for the specified purpose of evaluating or working on ' + topic + '.\n- Not to disclose the information to third parties without prior written consent.', note: 'Core confidentiality rules.' },
        { title: 'Term & Termination Wording', body: `This Agreement and the Receiving Party's duty of confidentiality shall continue in force for a period of [e.g., 2 or 5 years] from the date of disclosure, or until Disclosing Party releases the obligation in writing.`, note: 'Duration guidelines.' },
        { title: 'Review & Safety Checklist', body: '- Verify exact definitions of confidential scope and exclusions (e.g. public info).\n- Confirm governing law and dispute jurisdiction matching both parties.\n- Do not sign or execute this outline directly. Use a qualified attorney to review the final contract draft.', note: 'Risk warnings.' }
      ];

      let sections = allSections;
      if (style === 'overview') sections = [allSections[0]];
      else if (style === 'scope') sections = [allSections[1], allSections[2]];
      else if (style === 'terms') sections = [allSections[3]];
      else if (style === 'review-note' || style === 'safety-note') sections = [allSections[4]];

      result = sections.map(sec => sec.title + '\n' + sec.body).join('\n\n');
      resultHtml = renderSectionSuite('NDA Outline Draft Suite', sections, 'Informational draft outline only. Not legal advice. Have a qualified professional review the final draft for your jurisdiction.');
      break;
    }
    case 'dog-name-generator': {
      const boyNames = ['Max','Buddy','Charlie','Cooper','Rocky','Bear','Duke','Tucker','Jack','Oliver','Leo','Milo','Finn','Zeus','Louie','Bentley','Teddy','Beau','Winston','Murphy'];
      const girlNames = ['Bella','Luna','Daisy','Lucy','Sadie','Molly','Bailey','Maggie','Sophie','Chloe','Stella','Penny','Zoey','Lily','Ruby','Rosie','Gracie','Coco','Willow','Nala'];
      result = 'MALE DOG NAMES:\n' + generateMultiple(() => randomFrom(boyNames), 10).split('\n').map((n,i) => `${i+1}. ${n}`).join('\n') + '\n\nFEMALE DOG NAMES:\n' + generateMultiple(() => randomFrom(girlNames), 10).split('\n').map((n,i) => `${i+1}. ${n}`).join('\n');
      break;
    }
    case 'pet-name-generator': {
      const cute = ['Biscuit','Mochi','Pudding','Waffle','Noodle','Pickle','Pepper','Ginger','Cinnamon','Oreo','Cookie','Maple','Honey','Truffle','Marshmallow'];
      const funny = ['Sir Barksalot','Professor Whiskers','Captain Fluffybottom','Lord Wigglesworth','Bark Twain','Meowly Cyrus','Purrlock Holmes','Chewbarka','Bark Obama','Cat Stevens'];
      const unique = ['Zephyr','Atlas','Nimbus','Cosmo','Echo','Pixel','Indigo','Koda','Onyx','Vega'];
      result = 'CUTE NAMES:\n' + cute.sort(() => Math.random()-0.5).slice(0,8).map((n,i) => `${i+1}. ${n}`).join('\n') + '\n\nFUNNY NAMES:\n' + funny.sort(() => Math.random()-0.5).slice(0,6).map((n,i) => `${i+1}. ${n}`).join('\n') + '\n\nUNIQUE NAMES:\n' + unique.sort(() => Math.random()-0.5).slice(0,6).map((n,i) => `${i+1}. ${n}`).join('\n');
      break;
    }
    case 'gnome-name-generator': {
      const gnFirst = ['Bimpnottin','Ellywick','Fizzlebang','Gimble','Jebeddo','Namfoodle','Orryn','Roondar','Seebo','Warryn','Zook','Dabbledob','Filchbatter','Glim','Kellen'];
      const gnLast = ['Beren','Daergel','Folkor','Garrick','Murnig','Nackle','Raulnor','Scheppen','Turen','Aleslosh','Ashhearth','Badger','Cloak','Doublelock','Filchbatter'];
      const gnClan = ['Sparklegem','Tinkertop','Gearloose','Wobblesprocket','Fizzwidget','Copperkettle','Brassbottom','Steamwhistle','Clockwork','Gadgetspring'];
      result = generateMultiple(() => `${randomFrom(gnFirst)} "${randomFrom(gnClan)}" ${randomFrom(gnLast)}`, 10);
      break;
    }
    case 'barbarian-name-generator': {
      const barbFirst = ['Grog','Thok','Krag','Borg','Skarn','Drog','Varg','Ulf','Brak','Hroth','Gruk','Thorak','Ymir','Kael','Ragnar','Sigurd','Grim','Bjorn','Fenris','Wulfgar'];
      const barbLast = ['Skullcrusher','Ironjaw','Bloodaxe','Stormfist','Bonecleaver','Goretusk','Thundermaw','Fleshripper','Warborn','Stonefist','Deathbringer','Oathbreaker','Worldender','Doomhammer','Beastslayer'];
      result = generateMultiple(() => `${randomFrom(barbFirst)} ${randomFrom(barbLast)}`, 10);
      break;
    }

    case 'cowboy-name-generator': {
      const cowFirst = ['Buck','Clint','Wyatt','Doc','Jesse','Billy','Hank','Dusty','Colt','Slim','Red','Tex','Clay','Jed','Butch','Shane','Maverick','Dallas','Wade','Boone'];
      const cowLast = ['McGraw','Cassidy','Earp','Holliday','Dalton','Ringo','Garrett','Sundance','Crockett','Cartwright'];
      const cowTitle = ['','','The Kid','Two-Guns','Dead-Eye','Ironhorse','Quickdraw','The Outlaw','The Sheriff','Trigger'];
      result = generateMultiple(() => { const t=randomFrom(cowTitle); return t ? `${randomFrom(cowFirst)} "${t}" ${randomFrom(cowLast)}` : `${randomFrom(cowFirst)} ${randomFrom(cowLast)}`; }, 10);
      break;
    }
    case 'monster-name-generator': {
      const monPre = ['Ghor','Zyl','Kra','Vor','Thr','Nyx','Xar','Dra','Mal','Gor','Sha','Bel','Fen','Grim','Skar'];
      const monSuf = ['moth','gax','zith','reth','thos','nox','vex','krull','maw','ghast','fiend','bane','spawn','wraith','beast'];
      const monTitle = ['the Devourer','the Unseen','of the Deep','the Eternal','the Formless','of Shadow','the Hungering','the Plague','Worldeater','Souldrinker'];
      result = generateMultiple(() => `${randomFrom(monPre)}${randomFrom(monSuf)}, ${randomFrom(monTitle)}`, 10);
      break;
    }
    case 'robot-name-generator': {
      const robPre = ['AX','BT','CX','DR','EV','FZ','GN','HK','IX','JT','KR','LX','MN','NV','OX','PR','QZ','RX','SV','TX'];
      const robNum = () => `-${Math.floor(Math.random()*900)+100}`;
      const robName = ['ATLAS','NEXUS','CIPHER','PULSE','ECHO','VORTEX','ZENITH','PRISM','SPARK','FLUX','NOVA','BYTE','CORE','GRID','NODE','SYNC','WAVE','APEX','LINK','ZERO'];
      result = generateMultiple(() => Math.random()>0.5 ? `${randomFrom(robPre)}${robNum()}` : `${randomFrom(robName)}-${Math.floor(Math.random()*99)}`, 10);
      break;
    }
    case 'spaceship-name-generator': {
      const shipPre = ['USS','ISS','HMS','SSV','ESV','CSV'];
      const shipAdj = ['Stellar','Cosmic','Void','Astral','Nebula','Solar','Quantum','Dark','Iron','Nova','Shadow','Crimson','Golden','Silent','Eternal'];
      const shipNoun = ['Horizon','Voyager','Pioneer','Discovery','Endeavour','Valkyrie','Phoenix','Tempest','Odyssey','Vanguard','Harbinger','Sentinel','Pathfinder','Sovereign','Defiant'];
      result = generateMultiple(() => Math.random()>0.5 ? `${randomFrom(shipPre)} ${randomFrom(shipNoun)}` : `The ${randomFrom(shipAdj)} ${randomFrom(shipNoun)}`, 10);
      break;
    }
    case 'mermaid-name-generator': {
      const merFirst = ['Coralia','Marina','Nerissa','Pearl','Ondine','Sirena','Thalassa','Oceana','Aquata','Ariel','Cascade','Delphine','Lorelei','Muriel','Sedna','Calypso','Nixie','Waverly','Coralline','Azura'];
      const merLast = ['Deepwater','Tidewalker','Seaspray','Coralreef','Moonwave','Pearlshine','Shelldancer','Foamweaver','Seasong','Driftcurrent'];
      result = generateMultiple(() => `${randomFrom(merFirst)} ${randomFrom(merLast)}`, 10);
      break;
    }
    case 'dinosaur-name-generator': {
      const dinoPre = ['Tyran','Velo','Stego','Brachio','Ptero','Ankylo','Theri','Spino','Carno','Giga','Mega','Ultra','Pyro','Cryo','Electro','Aqua','Terra','Astro','Neo','Chrono'];
      const dinoSuf = ['saurus','raptor','don','dactyl','tops','ceratops','nyx','therium','mimus','titan'];
      result = generateMultiple(() => `${randomFrom(dinoPre)}${randomFrom(dinoSuf)}`, 10);
      break;
    }
    case 'castle-name-generator': {
      const castlePre = ['Shadow','Storm','Iron','Dragon','Raven','Wolf','Frost','Thunder','Blood','Dark','Stone','Silver','Golden','Crystal','Black','White','Crimson','Ancient','Ember','Moon'];
      const castleSuf = ['keep','hold','spire','gate','wall','haven','guard','tower','forge','fell','crest','peak','throne','watch','helm','rock','bridge','moor','cliff','reach'];
      result = generateMultiple(() => `${randomFrom(castlePre)}${randomFrom(castleSuf)} Castle`, 10);
      break;
    }
    case 'bakery-name-generator': {
      const built = makeNameIdeaGroups(text || 'bakery', {
        kind: 'bakery',
        style: optionValue('business-name-style', 'friendly'),
        local: true,
        includeTaglines: optionValue('include-taglines', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'Bakery name ideas do not claim trademark availability; verify names before registering or printing signage.');
      break;
    }
    case 'salon-name-generator': {
      const built = makeNameIdeaGroups(text || 'salon', {
        kind: 'salon',
        style: optionValue('business-name-style', 'premium'),
        local: true,
        includeTaglines: optionValue('include-taglines', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'Salon name ideas are creative suggestions only; check local business, domain, and trademark availability separately.');
      break;
    }
    case 'playlist-name-generator': {
      const mood = text || 'vibes';
      const templates = [
        `${mood.charAt(0).toUpperCase()+mood.slice(1)} & Chill`,
        `Late Night ${mood.charAt(0).toUpperCase()+mood.slice(1)}`,
        `${mood.charAt(0).toUpperCase()+mood.slice(1)} Mode: ON`,
        `The ${mood.charAt(0).toUpperCase()+mood.slice(1)} Playlist`,
        `${mood.charAt(0).toUpperCase()+mood.slice(1)} Season`,
        `Soundtrack to ${mood}`,
        `${mood.charAt(0).toUpperCase()+mood.slice(1)} in the Background`,
        `Pure ${mood.charAt(0).toUpperCase()+mood.slice(1)}`,
        `${mood.charAt(0).toUpperCase()+mood.slice(1)} Hour`,
        `Lost in ${mood}`,
        `${mood.charAt(0).toUpperCase()+mood.slice(1)} After Dark`,
        `Good ${mood.charAt(0).toUpperCase()+mood.slice(1)} Only`];
      result = templates.sort(() => Math.random()-0.5).map((t,i) => `${i+1}. ${t}`).join('\n');
      break;
    }
    case 'pen-name-generator': {
      const penFirst = ['Alexander','Victoria','Sebastian','Eleanor','Theodore','Catherine','Nathaniel','Margaret','Benjamin','Elizabeth','Charlotte','William','Josephine','Frederick','Adelaide'];
      const penLast = ['Blackwell','Sterling','Ashworth','Sinclair','Hawthorne','Montgomery','Whitmore','Prescott','Fairfax','Crawford','Langley','Pemberton','Wainwright','Devereaux','Beaumont'];
      result = generateMultiple(() => `${randomFrom(penFirst)} ${randomFrom(penLast)}`, 10);
      break;
    }
    case 'dj-name-generator': {
      const djPre = ['DJ','DJ','','',''];
      const djNames = ['Nova','Pulse','Apex','Flux','Blaze','Vortex','Eclipse','Cipher','Prism','Orbit','Phantom','Zenith','Echo','Drift','Static','Sonic','Bass','Neon','Voltage','Strobe'];
      const djSuf = ['','','X','_','beats','sound','waves','mix','drop','bass'];
      result = generateMultiple(() => { const p=randomFrom(djPre); const s=randomFrom(djSuf); return `${p?p+' ':''}${randomFrom(djNames)}${s?' '+s:''}`; }, 10);
      break;
    }
    case 'funny-name-generator': {
      const funnyNames = ['Ben Dover','Anita Bath','Chris P. Bacon','Barb Dwyer','Al B. Zure','Brock O. Lee','Justin Time','Paige Turner','Crystal Clear','Bill Board','Art E. Choke','Candy Barr','Earl E. Bird','Ima Hogg','Rick O. Shay','Sandy Beach','Rusty Pipes','Sue Flay','Mona Lott','Barry D. Alive','Ella Vator','Harry Styles-His-Hair','Phil McCracken','Herb Garden','Cole Slaw'];
      result = funnyNames.sort(() => Math.random()-0.5).slice(0,12).map((n,i) => `${i+1}. ${n}`).join('\n');
      break;
    }
    case 'invisible-text-generator': {
      const count = text ? Math.min(parseInt(text) || 10, 100) : 10;
      const zwsp = '\u200B';
      const invisible = Array(count).fill(zwsp).join('');
      result = `${invisible}\n\n\u2191 ${count} invisible characters generated above this line.\nCopy the output to use invisible text.\n\nCharacters used: Zero-Width Space (U+200B)\nTotal characters: ${count}\n\nUse cases:\n\u2022 Blank messages in Discord, WhatsApp, etc.\n\u2022 Empty-looking usernames\n\u2022 Hidden text separators`;
      break;
    }
    case 'bubble-text-generator': {
      if (!text) { result = 'Please enter some text above.'; break; }
      const bubbleFilled = text.split('').map(c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + code - 97); if (code >= 48 && code <= 57) return String.fromCodePoint(0x2460 + code - 49); return c; }).join('');
      const bubbleBlack = text.toUpperCase().split('').map(c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F150 + code - 65); return c; }).join('');
      result = `Bubble (Circled):\n${bubbleFilled}\n\nNegative Circled:\n${bubbleBlack}\n\nOriginal:\n${text}`;
      break;
    }
    case 'sitemap-generator': {
      const fallbackUrls = ['https://example.com/', 'https://example.com/about', 'https://example.com/contact'];
      const rawUrls = text ? text.split(/\r?\n|,/).map(u => u.trim()).filter(Boolean) : fallbackUrls;
      
      let urls = [...new Set(rawUrls)].map(url => {
        if (/^https?:\/\//i.test(url)) return url;
        return `https://${url}`;
      });

      urls.sort((a, b) => {
        const depthA = a.split('/').length;
        const depthB = b.split('/').length;
        if (depthA !== depthB) return depthA - depthB;
        return a.localeCompare(b);
      });

      urls = urls.slice(0, 100);

      const today = new Date().toISOString().split('T')[0];
      const type = optionValue('sitemap-type', 'standard');
      const changefreq = optionValue('sitemap-changefreq', 'weekly');
      const priority = optionValue('sitemap-priority', '0.8');
      const includeLastmod = optionValue('sitemap-lastmod', 'true') === 'true';
      
      const escXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

      const getSlugName = (urlStr: string): string => {
        try {
          const u = new URL(urlStr);
          const parts = u.pathname.split('/').filter(Boolean);
          if (parts.length === 0) return 'Home';
          return parts[parts.length - 1].split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        } catch {
          return 'Page';
        }
      };

      const getSocialSlug = (urlStr: string): string => {
        try {
          const u = new URL(urlStr);
          const parts = u.pathname.split('/').filter(Boolean);
          if (parts.length === 0) return 'index';
          return parts[parts.length - 1];
        } catch {
          return 'page';
        }
      };

      let body = '';
      let fileNote = '';

      if (type === 'standard') {
        body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
          urls.map(url => {
            const loc = escXml(url);
            const lastmodLine = includeLastmod ? `\n    <lastmod>${today}</lastmod>` : '';
            return `  <url>\n    <loc>${loc}</loc>${lastmodLine}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
          }).join('\n')
        }\n</urlset>`;
        fileNote = 'Standard XML format for all search engines.';
      } else if (type === 'image') {
        body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${
          urls.map(url => {
            const loc = escXml(url);
            const title = escXml(getSlugName(url));
            const imgLoc = escXml(`${url.replace(/\/$/, '')}/images/${getSocialSlug(url)}.jpg`);
            return `  <url>\n    <loc>${loc}</loc>\n    <image:image>\n      <image:loc>${imgLoc}</image:loc>\n      <image:title>${title} Banner</image:title>\n    </image:image>\n  </url>`;
          }).join('\n')
        }\n</urlset>`;
        fileNote = 'Google Image sitemap format to index graphic assets.';
      } else if (type === 'video') {
        body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${
          urls.map(url => {
            const loc = escXml(url);
            const title = escXml(getSlugName(url));
            const thumbLoc = escXml(`${url.replace(/\/$/, '')}/videos/thumb-${getSocialSlug(url)}.jpg`);
            const contentLoc = escXml(`${url.replace(/\/$/, '')}/videos/${getSocialSlug(url)}.mp4`);
            return `  <url>\n    <loc>${loc}</loc>\n    <video:video>\n      <video:thumbnail_loc>${thumbLoc}</video:thumbnail_loc>\n      <video:title>How to Use ${title}</video:title>\n      <video:description>A practical video explanation about ${title}.</video:description>\n      <video:content_loc>${contentLoc}</video:content_loc>\n    </video:video>\n  </url>`;
          }).join('\n')
        }\n</urlset>`;
        fileNote = 'Google Video sitemap format for multimedia indexing.';
      } else if (type === 'news') {
        body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${
          urls.map(url => {
            const loc = escXml(url);
            const title = escXml(getSlugName(url));
            return `  <url>\n    <loc>${loc}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>Official News Hub</news:name>\n        <news:language>en</news:language>\n      </news:publication>\n      <news:publication_date>${today}</news:publication_date>\n      <news:title>${title} Released</news:title>\n    </news:news>\n  </url>`;
          }).join('\n')
        }\n</urlset>`;
        fileNote = 'Google News sitemap format (only include articles published in the last 2 days).';
      } else if (type === 'rss') {
        const buildDate = new Date().toUTCString();
        body = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n<channel>\n  <title>Recent Publications Feed</title>\n  <link>${escXml(urls[0] || 'https://example.com/')}</link>\n  <description>Recent page additions and updates.</description>\n  <lastBuildDate>${buildDate}</lastBuildDate>\n${
          urls.map(url => {
            const loc = escXml(url);
            const title = escXml(getSlugName(url));
            return `  <item>\n    <title>${title}</title>\n    <link>${loc}</link>\n    <guid>${loc}</guid>\n    <pubDate>${buildDate}</pubDate>\n  </item>`;
          }).join('\n')
        }\n</channel>\n</rss>`;
        fileNote = 'RSS 2.0 feed format for indexing feed readers.';
      } else {
        body = urls.join('\n');
        fileNote = 'Plain Text URL list (one URL per line).';
      }

      const rows = urls.map((url, index) => `${index + 1}. ${url} | Changefreq: ${changefreq} | Priority: ${priority}`).join('\n');
      
      const sections = [
        { title: 'Generated Sitemap Output', body, note: fileNote },
        { title: 'Processed URL Summary', body: rows, note: `${urls.length} unique URLs included (canonical sort applied).` },
        { 
          title: 'SEO Sitemap Best Practices', 
          body: '1. Place sitemap at root directory (e.g., https://example.com/sitemap.xml).\n2. Reference sitemap URL in robots.txt:\n   Sitemap: https://example.com/sitemap.xml\n3. Do not include URLs blocked by robots.txt or containing noindex meta tags.\n4. Keep sitemap size under 50MB and 50,000 URLs (split if exceeding).',
          note: 'Google Webmasters instructions.'
        }
      ];

      result = body;
      resultHtml = renderSectionSuite('XML Sitemap Package', sections, 'Sitemaps tell search engines which pages are available for crawling. Keep it updated with live pages.');
      break;
    }
    case 'meta-description-generator': {
      const topic = compactSeed(text, 'your page topic');
      const intent = optionValue('meta-intent', 'informational');
      const tone = optionValue('meta-tone', 'clear');
      const groups = [
        { title: 'Informational', text: `Learn ${topic} with a clear guide covering key ideas, practical steps, and useful tips for making confident decisions.`, note: 'Good for guides and explainers.' },
        { title: 'Commercial', text: `Compare ${topic} options, features, and practical benefits so you can choose the right fit without extra guesswork.`, note: 'Good for comparison and service pages.' },
        { title: 'Product', text: `Explore ${topic} features, benefits, and use cases in one concise overview designed to help shoppers decide faster.`, note: 'Good for ecommerce or product pages.' },
        { title: 'Local', text: `Find helpful ${topic} information, service details, and next steps for customers looking for a reliable local option.`, note: 'Good for location/service pages.' },
        { title: 'Friendly', text: `A simple, useful guide to ${topic}, with practical notes, clear next steps, and no confusing jargon.`, note: `Tone option: ${tone}.` },
        { title: 'CTA-Focused', text: `Get the essential ${topic} details, compare your options, and take the next step with a clear, practical guide.`, note: `Search intent option: ${intent}.` }];
      result = groups.map(group => `${group.title} (${group.text.length} chars)\n${group.text}`).join('\n\n');
      resultHtml = renderBioVariations(groups);
      break;
    }
    case 'chatgpt-prompt-generator': {
      const groups = buildChatGptPromptSuite(text, optionValue);
      result = groups.map(group => `${group.title}\n${group.text}`).join('\n\n');
      resultHtml = renderHeadlineGroups(groups, 'Independent prompt drafts only. Not affiliated with OpenAI or ChatGPT; verify facts, policies, and sensitive outputs before use. No accuracy, compliance, safety, or output-quality guarantee.');
      break;
    }
    case 'token-generator': {
      const format = optionValue('token-format', 'all');
      const count = Math.max(1, Math.min(20, Number(optionValue('token-count', '5')) || 5));
      const len = Math.max(8, Math.min(128, Number(optionValue('token-length', '32')) || 32));

      const getSecureBytes = (length: number): Uint8Array => {
        const bytes = new Uint8Array(length);
        crypto.getRandomValues(bytes);
        return bytes;
      };
      
      const hexToken = () => {
        const bytes = getSecureBytes(Math.ceil(len / 2));
        return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).slice(0, len).join('');
      };
      
      const b64Token = () => {
        const bytes = getSecureBytes(len);
        return btoa(String.fromCharCode(...bytes))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '')
          .slice(0, len);
      };
      
      const alphaToken = () => {
        const bytes = getSecureBytes(len);
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from(bytes, byte => chars[byte % chars.length]).join('');
      };

      const sections = [
        { title: `HEX Tokens (${len} characters, secure)`, body: generateMultiple(hexToken, count), note: 'Ideal for API keys or simple random identifiers.' },
        { title: `Base64URL Safe Tokens (${len} characters, secure)`, body: generateMultiple(b64Token, count), note: 'Url-safe base64 tokens, suitable for OAuth state/codes.' },
        { title: `Alphanumeric Tokens (${len} characters, secure)`, body: generateMultiple(alphaToken, count), note: 'Pure letters and numbers. Good for random passwords/pins.' },
        { title: 'UUID v4 (Standard secure UUID)', body: generateMultiple(() => crypto.randomUUID(), count), note: 'Standard unique identifiers generated by the browser.' }
      ];

      const visible = format === 'hex' ? [sections[0]]
        : format === 'base64url' ? [sections[1]]
        : format === 'alphanumeric' ? [sections[2]]
        : format === 'uuid' ? [sections[3]]
        : sections;

      result = visible.map(sec => `${sec.title}:\n${sec.body}`).join('\n\n');
      resultHtml = renderSectionSuite('Secure Token Draw Suite', visible, 'All token generation runs entirely locally in your browser using secure window.crypto random APIs. No keys or tokens are sent to servers.');
      break;
    }
    case 'warrior-name-generator': {
      const warriorClass = optionValue('warrior-class', 'knight-paladin');
      const seed = compactSeed(text, 'Valoria');
      const classes: Record<string, { first: string[]; titles: string[]; role: string }> = {
        barbarian: { first: ['Kael', 'Runa', 'Thorek', 'Vara', 'Borin'], titles: ['Stonehowl', 'Ashbreaker', 'Wildshield', 'Ironhide', 'Stormborn'], role: 'Frontline vanguard with tribal heritage.' },
        'knight-paladin': { first: ['Alaric', 'Seren', 'Cedric', 'Elian', 'Mira'], titles: ['Dawnshield', 'Brightlance', 'Oathkeeper', 'Silverguard', 'Lightward'], role: 'Holy warrior sworn to protect.' },
        gladiator: { first: ['Cassian', 'Lyra', 'Brutus', 'Vesta', 'Talon'], titles: ['Arena Flame', 'Bronze Fang', 'Crowdmark', 'Sand Victor', 'Red Laurels'], role: 'Arena champion of speed and theatrical combat.' },
        mercenary: { first: ['Draven', 'Nyx', 'Rook', 'Selka', 'Marek'], titles: ['Coinblade', 'Black Contract', 'Roadsteel', 'Free Pike', 'Grey Banner'], role: 'Hired steel prioritizing contracts.' }
      };
      
      const set = classes[warriorClass] || classes['knight-paladin'];
      const items = set.first.map((first, idx) => {
        const title = set.titles[idx % set.titles.length];
        return {
          name: `${first} ${title} of ${seed}`,
          reason: `Cohesive ${warriorClass} archetype.`,
          extra: set.role
        };
      });

      const groups = [
        {
          title: `Warrior Names (${titleCase(warriorClass.replace(/-/g, ' '))})`,
          note: `Fictional warrior characters. Seed origin: ${seed}.`,
          items
        }
      ];

      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Check trademark directories, fiction registries, and game lore before using character names in published work.');
      break;
    }
    case 'ship-name-generator': {
      const shipAdj = ['Crimson','Silver','Iron','Golden','Storm','Sea','Wild','Dark','Swift','Maiden','Royal','Emerald','Ancient','Phantom','Celestial'];
      const shipNoun = ['Tide','Serpent','Pearl','Horizon','Wave','Mariner','Fortune','Breeze','Compass','Siren','Corsair','Anchor','Galleon','Tempest','Kraken'];
      const shipPfx = ['HMS','SS','The','MV','SV'];
      result = generateMultiple(() => `${randomFrom(shipPfx)} ${randomFrom(shipAdj)} ${randomFrom(shipNoun)}`, 10);
      break;
    }
    case 'farm-name-generator': {
      const built = makeNameIdeaGroups(text || 'farm', {
        kind: 'farm',
        style: optionValue('business-name-style', 'local'),
        local: true,
        includeTaglines: optionValue('include-taglines', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'Farm name ideas are not legal or trademark advice; verify availability before use.');
      break;
    }
    case 'hotel-name-generator': {
      const built = makeNameIdeaGroups(text || 'hotel', {
        kind: 'hotel',
        style: optionValue('business-name-style', 'premium'),
        local: true,
        includeTaglines: optionValue('include-taglines', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'Hotel name ideas do not imply licensing, rating, or trademark availability.');
      break;
    }
    case 'food-truck-name-generator': {
      const built = makeNameIdeaGroups(text || 'food truck', {
        kind: 'food truck',
        style: optionValue('business-name-style', 'creative'),
        local: true,
        includeTaglines: optionValue('include-taglines', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'Food truck names are creative suggestions only; confirm local registration and trademark availability.');
      break;
    }
    case 'club-name-generator': {
      const clubAdj = ['Elite','Premier','Golden','Silver','Royal','Phoenix','Maverick','Pinnacle','Legacy','United','Rising','Stellar','Apex','Nova','Zenith'];
      const clubNoun = ['Society','Club','Circle','Alliance','Guild','League','Assembly','Collective','Fellowship','Order','Coalition','Syndicate','Association','Foundation','Network'];
      result = generateMultiple(() => `The ${randomFrom(clubAdj)} ${randomFrom(clubNoun)}`, 12);
      break;
    }
    case 'sports-team-name-generator': {
      const stCity = ['Thunder','Storm','Fire','Ice','Iron','Steel','Shadow','Solar','Coastal','Metro','Valley','Mountain','River','Pacific','Atlantic'];
      const stMascot = ['Wolves','Hawks','Bears','Lions','Eagles','Sharks','Vipers','Panthers','Titans','Warriors','Phoenix','Dragons','Raptors','Stallions','Cobras'];
      result = generateMultiple(() => `${randomFrom(stCity)} ${randomFrom(stMascot)}`, 12);
      break;
    }
    case 'app-name-generator': {
      const built = makeNameIdeaGroups(text || 'app', {
        kind: `${optionValue('app-category', 'productivity')} app`,
        style: optionValue('name-style', 'brandable'),
        creator: false,
        includeTaglines: optionValue('include-taglines', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'App names are availability-friendly ideas, not app store, domain, or trademark availability checks.');
      break;
    }
    case 'channel-name-generator': {
      const built = makeNameIdeaGroups(text || 'content', {
        kind: `${optionValue('channel-platform', 'creator')} channel`,
        style: optionValue('name-style', 'balanced'),
        creator: true,
        includeTaglines: optionValue('include-handles', 'true') === 'true'
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'Channel names include best-use labels and handle-style variants, but no real availability claims.');
      break;
    }
    case 'display-name-generator': {
      const base = compactSeed(text, 'creative profile');
      const platform = optionValue('display-platform', 'social');
      const displayStyle = optionValue('display-style', 'stylish');
      const groups = [
        { title: 'Professional', note: `For ${platform} profiles where credibility matters.`, items: [`${base} Studio`, `${base} Works`, `${base} Advisory`] },
        { title: 'Gamer', note: 'Readable gamer display names.', items: [`${base} Prime`, `${base} Plays`, `Nova ${base}`] },
        { title: 'Creator', note: 'Personal brand friendly.', items: [`By ${base}`, `${base} Notes`, `${base} Daily`] },
        { title: 'Social', note: 'Casual profile names.', items: [`Hello ${base}`, `${base} Club`, `${base} Social`] },
        { title: 'Minimal', note: 'Short and clean.', items: [`${base.split(' ')[0]}`, `${base.split(' ')[0]} Co`, `${base.split(' ')[0]} Lab`] },
        { title: 'Stylish', note: 'Polished visual identity feel.', items: [`The ${base} Edit`, `${base} Atelier`, `${base} House`] }];
      result = groups.map(group => group.title + '\n' + group.items.join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(groups, `Selected style: ${displayStyle}. Display names are profile labels, not availability checks. Avoid impersonating real people or brands.`);
      break;
    }
    case 'display-name-generator-legacy': {
      const dpAdj = ['Shadow','Neon','Crystal','Velvet','Mystic','Cosmic','Silent','Phantom','Golden','Frost','Ember','Nova','Pixel','Stellar','Midnight'];
      const dpNoun = ['Fox','Wolf','Phoenix','Storm','Dreamer','Spirit','Vibe','Echo','Pulse','Ace','Rogue','Sage','Bloom','Cipher','Dusk'];
      result = generateMultiple(() => Math.random() > 0.5 ? `${randomFrom(dpAdj)}${randomFrom(dpNoun)}` : `${randomFrom(dpAdj)}_${randomFrom(dpNoun)}`, 12);
      break;
    }
    case 'big-text-generator': {
      if (!text) { result = 'Please enter text above.'; break; }
      const chars = text.toUpperCase().split('').slice(0,20);
      const rows = [
        chars.map(c => c === ' ' ? '     ' : ' ### ').join(' '),
        chars.map(c => c === ' ' ? '     ' : '#   #').join(' '),
        chars.map(c => c === ' ' ? '     ' : '#####').join(' '),
        chars.map(c => c === ' ' ? '     ' : '#   #').join(' '),
        chars.map(c => c === ' ' ? '     ' : '#   #').join(' ')].join('\n');
      result = rows;
      break;
    }
    case 'retro-text-generator': {
      if (!text) { result = 'Please enter text above.'; break; }
      const retroStyles = [
        '>>> ' + text.toUpperCase() + ' <<<',
        '+--------------------+\n| ' + text.toUpperCase() + ' |\n+--------------------+',
        '*** ' + text + ' ***',
        '/\\/\\/\\ ' + text.toUpperCase() + ' /\\/\\/\\',
        '[ ' + text + ' ]',
        '::: ' + text.toUpperCase().split('').join(' ') + ' :::'];
      result = retroStyles.join('\n\n');
      break;
    }
    case 'typewriter-text-generator': {
      if (!text) { result = 'Please enter text above.'; break; }
      const mono = text.split('').map(c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D670 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D68A + code - 97); if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7F6 + code - 48); return c; }).join('');
      result = 'Monospace:\n' + mono + '\n\nOriginal:\n' + text;
      break;
    }
    case 'cute-text-generator': {
      if (!text) { result = 'Please enter text above.'; break; }
      const cuteStyles = [
        '* ' + text.split('').join(' ') + ' *',
        '<3 ' + text + ' <3',
        '( ' + text + ' )',
        '~ ' + text + ' ~',
        '[ ' + text + ' ]',
        '. ' + text + ' .',
        'cute note: ' + text,
        'music note: ' + text];
      result = cuteStyles.join('\n\n');
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
      {
        const project = compactSeed(text, 'Client Project');
        const currency = optionValue('estimate-currency', 'usd').toUpperCase();
        const style = optionValue('estimate-style', 'range');
        const itemCount = Math.max(2, Math.min(8, Number(optionValue('estimate-item-count', '4')) || 4));
        const includeTimeline = optionValue('estimate-include-timeline', 'true') === 'true';
        const rows = Array.from({ length: itemCount }, (_, i) => `Line ${i + 1}: ${i === 0 ? project : 'Optional user-fill item'} | Estimated range: Optional user-fill low-${currency} to high-${currency} | Notes: Optional user-fill assumptions`).join('\n');
        const sections = [
          { title: 'Estimate Header', body: `Estimate for: ${project}\nPrepared by: Optional user-fill business name\nPrepared for: Optional user-fill client name\nDate: Optional user-fill date\nCurrency: ${currency}\nEstimate style: ${titleCase(style)}`, note: 'Client-ready header' },
          { title: 'Scope Summary', body: `This estimate covers draft planning for ${project}. Final pricing depends on confirmed scope, materials, approvals, schedule, and client-provided information.`, note: 'Scope context' },
          { title: 'Itemized Estimate', body: rows, note: `${itemCount} editable rows` },
          { title: 'Assumptions And Exclusions', body: `Assumptions: Optional user-fill scope, access, timeline, materials, or review cycles\nExclusions: Optional user-fill out-of-scope work, third-party fees, taxes, rush work, or revisions beyond scope\nRange note: all ranges are planning estimates until final scope is approved.`, note: 'Range clarity' },
          ...(includeTimeline ? [{ title: 'Timeline', body: `Phase 1: Discovery and confirmation - Optional user-fill duration\nPhase 2: Work and review - Optional user-fill duration\nPhase 3: Final delivery - Optional user-fill duration`, note: 'Draft schedule' }] : []),
          { title: 'Validity And Approval Note', body: `Validity: Optional user-fill validity period\nApproval: Optional user-fill approval name, date, and signature line\nReminder: verify final prices, taxes, supplier costs, and terms before sending.`, note: 'Not a guarantee' }
        ];
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Project Estimate Draft', sections, 'Estimate draft only. It is not accounting, tax, or legal advice and does not guarantee final pricing.');
        break;
      }
    }
    case 'business-card-generator': {
      const name = compactSeed(text, 'Avery Stone');
      const style = optionValue('card-style', 'minimalist');
      const orientation = optionValue('card-orientation', 'standard');
      const includeQr = optionValue('include-qr-note', 'true') === 'true';
      const handle = toSafeHandle(name, 'avery-stone');
      const company = style === 'creative' ? titleCase(handle.replace(/-/g, ' ')) + ' Creative' : style === 'corporate' ? titleCase(handle.replace(/-/g, ' ')) + ' Advisory' : titleCase(handle.replace(/-/g, ' ')) + ' Studio';
      const role = style === 'creative' ? 'Brand Designer' : style === 'corporate' ? 'Strategy Consultant' : 'Founder';
      const email = 'hello@' + handle.replace(/-/g, '') + '.com';
      const website = handle.replace(/-/g, '') + '.com';
      const phone = '+1 555 014 2087';
      const qrNote = includeQr ? `\nQR note: add a real QR code that points to https://${website}/contact after testing the link in your design tool.` : '';
      const sections = [
        { title: 'Front Layout', body: `FRONT - ${titleCase(style)} ${titleCase(orientation)}\n${name}\n${role}\n${company}\n\nTagline: Clear work, thoughtfully delivered`, note: 'Primary face' },
        { title: 'Back Layout', body: `BACK\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website}\nLocation: Austin, TX${qrNote}`, note: 'Contact face' },
        { title: 'Contact Hierarchy', body: `1. Name: ${name}\n2. Role: ${role}\n3. Company: ${company}\n4. Primary contact: ${email}\n5. Secondary contact: ${website}\n6. Optional phone: ${phone}`, note: 'Readable ordering' },
        { title: 'Alternate Front Variant', body: `${company}\n${name}, ${role}\nClear strategy for practical growth`, note: 'Corporate-friendly option' },
        { title: 'Alternate Creative Variant', body: `${name}\n${role}\nBrand systems, launch visuals, and useful design direction\n${website}`, note: 'Portfolio-ready option' },
        { title: 'Print Notes', body: `Use the selected ${orientation} orientation with generous margins.\nKeep text away from trim edges.\nVerify bleed, safe area, color mode, and final QR scan in the print tool before ordering.`, note: 'Production note' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Business Card Copy And Layout Suite', sections, 'This creates layout copy blocks, not a print-ready PDF or real QR code.');
      break;
    }
    case 'business-card-generator-legacy': {
      const name = text || 'Your Name';
      result = '+------------------------------+\n|                              |\n|  ' + name.toUpperCase().padEnd(26) + '  |\n|  [Job Title]                 |\n|  [Company Name]              |\n|                              |\n|  Email: email@example.com    |\n|  Phone: (555) 123-4567       |\n|  Web: www.example.com        |\n|  Location: City, State       |\n|                              |\n+------------------------------+';
      break;
    }
    case 'breadcrumb-generator': {
      if (!text) { result = 'Enter breadcrumb path (e.g., Home > Products > Electronics).'; break; }
      const parts = text.split('>').map(p => p.trim()).filter(Boolean);
      const baseUrl = 'https://example.com';
      const items = parts.map((name, i) => {
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        const url = i === 0 ? baseUrl + '/' : baseUrl + '/' + slug;
        return '    {\n      "@type": "ListItem",\n      "position": ' + (i+1) + ',\n      "name": "' + name + '",\n      "item": "' + url + '"\n    }';
      });
      result = '{\n  "@context": "https://schema.org",\n  "@type": "BreadcrumbList",\n  "itemListElement": [\n' + items.join(',\n') + '\n  ]\n}';
      break;
    }
    case 'favicon-generator': {
      const label = compactSeed(text, 'A');
      const style = optionValue('favicon-style', 'letter');
      const bg = optionValue('favicon-bg', '#2563EB');
      const symbol = style === 'letter' ? label.trim().charAt(0).toUpperCase() : style === 'monogram' ? label.split(/\s+/).map(part => part.charAt(0)).join('').slice(0, 2).toUpperCase() : '*';
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n  <rect width="64" height="64" rx="${style === 'rounded' ? 18 : 12}" fill="${bg}"/>\n  <text x="32" y="39" text-anchor="middle" font-family="Arial, sans-serif" font-size="${symbol.length > 1 ? 24 : 34}" font-weight="700" fill="#ffffff">${symbol}</text>\n</svg>`;
      const link = `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(svg)}">`;
      const sections = [
        { title: 'SVG Favicon', body: svg, note: `${titleCase(style)} concept` },
        { title: 'HTML Link Tag', body: link, note: 'Paste in the document head.' },
        { title: 'Size Checklist', body: '16x16 browser tab\n32x32 standard favicon\n48x48 Windows shortcut\n180x180 Apple touch icon\n192x192 Android icon\n512x512 PWA icon', note: 'Export these sizes in a real icon workflow if needed.' },
        { title: 'Usage Note', body: 'This creates a simple SVG favicon concept and HTML snippet. Test browser support and export PNG or ICO files separately when your platform requires them.', note: 'No fake export claim' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPreviewCodeSuite('Favicon Concept And Code', `<div style="display:grid;place-items:center;min-height:180px;background:#f8fafc;border-radius:12px;"><div style="width:96px;height:96px;border-radius:${style === 'rounded' ? '28px' : '18px'};background:${escapeHtml(bg)};display:grid;place-items:center;color:#fff;font:700 ${symbol.length > 1 ? '38px' : '48px'} Arial,sans-serif;">${escapeHtml(symbol)}</div></div>`, sections, 'Simple SVG/HTML output only. Export real production icon files where required.');
      break;
    }
    case 'html-code-generator': {
      const label = compactSeed(text, 'Premium Component');
      const mode = optionValue('html-snippet-mode', 'card');
      const snippets: Record<string, string> = {
        card: `<article class="content-card">\n  <h2>${escapeHtml(label)}</h2>\n  <p>A concise supporting paragraph that explains the value of this section.</p>\n  <a href="#" class="content-card__link">Learn more</a>\n</article>`,
        section: `<section class="page-section" aria-labelledby="section-title">\n  <div class="section-inner">\n    <h2 id="section-title">${escapeHtml(label)}</h2>\n    <p>Use this section for a focused block of page content.</p>\n  </div>\n</section>`,
        button: `<a class="button-link" href="#" role="button">${escapeHtml(label)}</a>`,
        list: `<ul class="feature-list">\n  <li>Clear semantic markup</li>\n  <li>Readable structure</li>\n  <li>Easy styling hooks</li>\n</ul>`,
        form: `<form class="contact-form" action="/submit" method="post">\n  <label for="name">Name</label>\n  <input id="name" name="name" autocomplete="name" required>\n\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" autocomplete="email" required>\n\n  <button type="submit">${escapeHtml(label)}</button>\n</form>`};
      const html = snippets[mode] || snippets.card;
      const sections = [
        { title: `${titleCase(mode)} HTML`, body: html, note: 'Clean semantic snippet.' },
        { title: 'Structure Notes', body: 'Use real URLs, labels, and form actions before publishing.\nKeep IDs unique on a page.\nPair this HTML with your design system CSS.', note: 'Implementation checklist.' }];
      result = html;
      resultHtml = renderSectionSuite('HTML Snippet Generator', sections, 'Accessibility note: review labels, link purpose, focus order, and semantics in the final page.');
      break;
    }
    case 'css-code-generator': {
      const mode = optionValue('css-snippet-mode', 'card');
      const responsive = optionValue('css-responsive', 'true') === 'true';
      const snippets: Record<string, string> = {
        card: `.card {\n  padding: 24px;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  background: #ffffff;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);\n}\n\n.card > * + * {\n  margin-top: 12px;\n}`,
        button: `.button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 44px;\n  padding: 12px 20px;\n  border: 0;\n  border-radius: 8px;\n  background: #2563eb;\n  color: #ffffff;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n.button:focus-visible {\n  outline: 3px solid rgba(37, 99, 235, 0.35);\n  outline-offset: 3px;\n}`,
        gradient: `.gradient-panel {\n  background: linear-gradient(135deg, #2563eb, #14b8a6);\n  color: #ffffff;\n  padding: 32px;\n  border-radius: 12px;\n}`,
        shadow: `.soft-shadow {\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08),\n    0 16px 40px rgba(15, 23, 42, 0.12);\n}`,
        layout: `.layout-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 20px;\n}`};
      const css = snippets[mode] + (responsive ? `\n\n@media (max-width: 640px) {\n  .card,\n  .gradient-panel {\n    padding: 18px;\n  }\n\n  .layout-grid {\n    grid-template-columns: 1fr;\n  }\n}` : '');
      const sections = [
        { title: `${titleCase(mode)} CSS`, body: css, note: responsive ? 'Includes responsive-safe rules.' : 'Base CSS only.' },
        { title: 'Usage Notes', body: 'Rename classes to match your project.\nCheck color contrast and focus states in your real UI.\nAvoid pasting duplicate reset rules into an existing design system.', note: 'Production checklist.' }];
      result = css;
      resultHtml = renderSectionSuite('CSS Snippet Generator', sections, 'Responsive and accessibility checks should be verified in the final layout.');
      break;
    }
    case 'pixel-text-generator': {
      if (!text) { result = 'Please enter text above.'; break; }
      const ch = text.toUpperCase().split('').slice(0,15);
      const rows = [
        ch.map(c => c === ' ' ? '...' : '.#.').join(' '),
        ch.map(c => c === ' ' ? '...' : '#.#').join(' '),
        ch.map(c => c === ' ' ? '...' : '###').join(' '),
        ch.map(c => c === ' ' ? '...' : '#.#').join(' '),
        ch.map(c => c === ' ' ? '...' : '#.#').join(' ')].join('\n');
      result = rows;
      break;
    }
    case 'fake-text-generator': {
      const sections = buildSamplePlaceholderSuite(text, optionValue);
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Sample Placeholder Text Pack', sections, 'Fictional sample/placeholder/demo text only. Do not use for deception, impersonation, fake evidence, scams, fake reviews, phishing, harassment, misinformation, or official records.');
      break;
    }
    case 'brat-text-generator': {
      if (!text) { result = 'type something above'; break; }
      const brat = text.toLowerCase();
      result = brat + '\n\nStyle Guide:\n- Font: Arial Narrow (or similar condensed sans-serif)\n- Color: #8ACE00 (lime green) on white background\n- All lowercase, no punctuation\n- Clean, minimal, unapologetic\n\nCSS:\ncolor: #8ACE00;\nfont-family: "Arial Narrow", sans-serif;\ntext-transform: lowercase;\nfont-weight: 400;';
      break;
    }
    case 'ransom-note-text-generator': {
      if (!text) { result = 'Please enter text above.'; break; }
      const styles: Array<(c: string) => string> = [(c) => c.toUpperCase(), (c) => c.toLowerCase(), (c) => { const code = c.toLowerCase().charCodeAt(0); return (code >= 97 && code <= 122) ? String.fromCodePoint(0x1D400 + code - 97) : c; }, (c) => { const code = c.toLowerCase().charCodeAt(0); return (code >= 97 && code <= 122) ? String.fromCodePoint(0x1D468 + code - 97) : c; }, (c) => { const code = c.toLowerCase().charCodeAt(0); return (code >= 97 && code <= 122) ? String.fromCodePoint(0x1D5D4 + code - 97) : c; }];
      result = text.split('').map(c => c === ' ' ? ' ' : randomFrom(styles)(c)).join('');
      break;
    }
    case 'cursive-name-generator': {
      if (!text) { result = 'Please enter a name above.'; break; }
      const cursive = text.split('').map(c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D49C + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4B6 + code - 97); return c; }).join('');
      const boldCursive = text.split('').map(c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D4D0 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4EA + code - 97); return c; }).join('');
      result = 'Script:\n' + cursive + '\n\nBold Script:\n' + boldCursive + '\n\nOriginal:\n' + text;
      break;
    }
    case 'proposal-generator': {
      {
        const project = compactSeed(text, 'Client Project');
        const type = optionValue('proposal-type', 'service');
        const tone = optionValue('proposal-tone', 'professional');
        const length = optionValue('proposal-length', 'standard');
        const includePricing = optionValue('proposal-include-pricing', 'true') === 'true';
        const sections = [
          { title: 'Executive Summary', body: `${project} is proposed as a ${tone} ${type.replace(/-/g, ' ')} engagement focused on solving a clear client problem, defining scope, and agreeing on measurable next steps.`, note: `${titleCase(length)} proposal` },
          { title: 'Client Problem', body: `Current challenge: Optional user-fill client problem\nBusiness impact: Optional user-fill pain point or opportunity\nSuccess signal: Optional user-fill measurable or observable outcome`, note: 'Client context' },
          { title: 'Recommended Solution', body: `Approach: clarify goals, confirm requirements, deliver the agreed work, and review outcomes with the client.\nWhy it fits: connects ${project.toLowerCase()} to practical deliverables, timeline, and decision points.`, note: 'Solution section' },
          { title: 'Scope And Deliverables', body: `In scope:\n- Discovery and planning\n- Draft or implementation work for ${project}\n- Review and revision cycle\n- Final handoff\n\nOut of scope:\n- Optional user-fill exclusions\n- Third-party costs unless approved\n- Legal, tax, or accounting review`, note: 'Scope block' },
          { title: 'Timeline', body: `Phase 1: Discovery - Optional user-fill dates\nPhase 2: Production - Optional user-fill dates\nPhase 3: Review - Optional user-fill dates\nPhase 4: Delivery - Optional user-fill dates`, note: 'Draft timeline' },
          ...(includePricing ? [{ title: 'Investment Placeholder', body: `Optional user-fill pricing model: fixed fee, hourly, milestone, or range\nSubtotal: Optional user-fill amount\nTaxes/fees: Optional user-fill if applicable\nTotal: Optional user-fill total after verification`, note: 'Pricing draft only' }] : []),
          { title: 'Assumptions', body: `Client provides timely feedback and required materials.\nScope changes are reviewed before work continues.\nFinal terms, pricing, taxes, and contracts must be verified by the business and client.`, note: 'Risk control' },
          { title: 'Next-Step CTA', body: `If this direction looks right, the next step is to confirm scope, timeline, decision owner, and required materials so the proposal can become an approved plan.`, note: 'Professional close' }
        ];
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Business Proposal Draft', sections, 'Proposal template only. Verify scope, pricing, terms, and obligations before sending.');
        break;
      }
    }
    case 'quotation-generator': {
      {
        const sections = buildBusinessDocumentSuite('quotation', text, optionValue);
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Quotation Draft Suite', sections, 'Business quotation draft only. Not legal, financial, accounting, tax, commercial, or compliance advice; no acceptance, payment, tax, delivery, or commercial result is guaranteed.');
        break;
      }
    }
    case 'purchase-order-generator': {
      {
        const sections = buildBusinessDocumentSuite('purchase-order', text, optionValue);
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Purchase Order Draft Suite', sections, 'Business document draft only. Not legal, financial, accounting, tax, procurement, commercial, or compliance advice; do not use as a fake official record.');
        break;
      }
    }
    case 'letterhead-generator': {
      {
        const company = compactSeed(text, 'Your Company');
        const style = optionValue('letterhead-style', 'modern');
        const density = optionValue('letterhead-contact-density', 'standard');
        const format = optionValue('letterhead-format', 'print');
        const includeFooter = optionValue('letterhead-include-footer', 'true') === 'true';
        const sections = [
          { title: 'Formal Header', body: `${company.toUpperCase()}\nOptional user-fill brand line or tagline\nOptional user-fill street address | city, region, postal code\nOptional user-fill phone | Optional user-fill email | Optional user-fill website`, note: 'Formal layout' },
          { title: 'Modern Header', body: `${company}\nOptional user-fill short brand line\nContact: Optional user-fill email | Optional user-fill phone\nWeb: Optional user-fill website\nReference: Optional user-fill reference line`, note: `${style} style` },
          { title: 'Minimal Header', body: `${company}\nOptional user-fill email\nOptional user-fill website`, note: `${density} contact density` },
          { title: 'Correspondence Block', body: `Date: Optional user-fill date\nRecipient: Optional user-fill recipient name\nOrganization: Optional user-fill organization\nAddress: Optional user-fill recipient address\nSubject/reference: Optional user-fill reference line`, note: `${format} format` },
          ...(includeFooter ? [{ title: 'Footer Block', body: `${company} | Optional user-fill registered address if applicable | Optional user-fill contact line\nOptional user-fill footer note: add only verified registration, license, or policy text.`, note: 'Use verified footer text only' }] : []),
          { title: 'Email-Friendly Version', body: `${company}\nOptional user-fill tagline\nOptional user-fill sender name, title\nOptional user-fill phone | Optional user-fill email | Optional user-fill website`, note: 'For plain email signatures or docs' },
          { title: 'Usage Note', body: `Do not invent addresses, certifications, registration numbers, or legal footer claims. Keep long URLs and emails on their own line for mobile readability.`, note: 'Print/email handoff' }
        ];
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Letterhead Layout Blocks', sections, 'Text/layout draft only. Replace optional user-fill fields with verified business details.');
        break;
      }
    }

    case 'app-icon-generator': {
      const app = compactSeed(text, 'Focus Notes');
      const category = optionValue('app-icon-category', 'productivity');
      const style = optionValue('app-icon-style', 'minimal');
      const shape = optionValue('app-icon-shape', 'squircle');
      const baseHue = seedNumber(app + category, 'app-icon') % 360;
      const primary = rgbToHex(hslToRgb(baseHue, 62, 42));
      const accent = rgbToHex(hslToRgb((baseHue + 145) % 360, 70, 48));
      const initials = app.split(/\s+/).map(part => part.charAt(0)).join('').slice(0, 2).toUpperCase();
      const symbolMap: Record<string, string> = {
        productivity: 'check mark, page, focus ring, or stacked cards',
        finance: 'secure wallet, upward line, coin stack, or clean ledger mark',
        health: 'heart line, leaf, balanced ring, or calm pulse',
        education: 'book, spark, pencil, or simple graduation cap',
        social: 'chat bubble, circle network, smile mark, or profile frame'
      };
      const sections = [
        { title: 'Icon Concept Brief', body: `${app} app icon: ${style} ${shape} mark using a simple symbol for ${symbolMap[category] || symbolMap.productivity}. Keep the silhouette readable at 24px.`, note: `${titleCase(category)} app` },
        { title: 'Color Direction', body: `Primary: ${primary}\nAccent: ${accent}\nBackground: ${style === 'gradient' ? `linear-gradient(135deg, ${primary}, ${accent})` : primary}\nForeground: #ffffff`, note: 'Copyable color system' },
        { title: 'Shape And Style Notes', body: `Outer shape: ${shape}\nVisual style: ${style}\nSmall-size rule: remove fine details, keep one central symbol, and avoid tiny text inside the icon.`, note: 'Platform-friendly guidance' },
        { title: 'Platform Checklist', body: 'iOS: test rounded corners and safe area.\nAndroid: check adaptive icon foreground/background separation.\nPWA: prepare 192x192 and 512x512 assets.\nApp stores: export from a real design file before submission.', note: 'No fake export claim' },
        { title: 'Safety Note', body: 'This is an icon concept brief and preview, not a generated app-store-ready image file or trademark clearance.', note: 'Review before use' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderPreviewCodeSuite('App Icon Concept', `<div style="display:grid;place-items:center;min-height:220px;background:#f8fafc;border-radius:12px;"><div style="width:128px;height:128px;border-radius:${shape === 'circle' ? '50%' : shape === 'rounded' ? '24px' : '32px'};background:${style === 'gradient' ? `linear-gradient(135deg, ${escapeHtml(primary)}, ${escapeHtml(accent)})` : escapeHtml(primary)};display:grid;place-items:center;color:#fff;font:800 44px Arial,sans-serif;box-shadow:0 18px 45px rgba(15,23,42,.18);">${escapeHtml(initials)}</div></div>`, sections, 'Preview is a concept block only. Use a design/export workflow for final app icon files.');
      break;
    }
    case 'dalle-prompt-generator': {
      const subj = compactSeed(text, 'a futuristic city');
      const purpose = optionValue('dalle-purpose', 'creative');
      const subjectType = optionValue('dalle-subject-type', 'landscape');
      const style = optionValue('dalle-style', 'photorealistic');
      const mood = optionValue('dalle-mood', 'neutral');
      const lighting = optionValue('dalle-lighting', 'natural-sunlight');
      const composition = optionValue('dalle-composition', 'rule-of-thirds');
      const aspect = optionValue('dalle-aspect', 'square-1-1');
      const detail = optionValue('dalle-detail-level', 'standard');
      const outputFormat = optionValue('dalle-output-format', 'prompt-with-tips');
      const safetyLevel = optionValue('dalle-safety-level', 'standard');
      const avoidList = optionValue('dalle-avoid-list', 'true') === 'true';
      const commercialCaution = optionValue('dalle-commercial-caution', 'true') === 'true';

      const styleMapping: Record<string, string> = {
        photorealistic: 'photorealistic 8k DSLR camera photograph, highly detailed, realistic textures',
        'oil-painting': 'expressive oil painting style, visible canvas texture, rich impasto brushstrokes',
        'digital-art': 'sleek digital art, vibrant colors, clean vector lines, smooth gradients, modern concept art',
        'vector-illustration': 'flat vector illustration, clean lines, minimalist shapes, corporate design style',
        'vintage-photo': 'analog vintage photograph, 35mm film grain, faded colors, subtle vignette, nostalgic feel'
      };

      const aspectMapping: Record<string, string> = {
        'square-1-1': 'aspect ratio 1:1',
        'wide-16-9': 'aspect ratio 16:9',
        'tall-9-16': 'aspect ratio 9:16'
      };

      const aspectLabel = aspectMapping[aspect] || 'aspect ratio 1:1';
      const selectedStyle = styleMapping[style] || styleMapping.photorealistic;

      const promptParts = [
        `${titleCase(subjectType)} of ${subj}`,
        selectedStyle,
        `mood: ${mood.replace(/-/g, ' ')}`,
        `lighting: ${lighting.replace(/-/g, ' ')}`,
        `composition: ${composition.replace(/-/g, ' ')}`,
        detail === 'highly-detailed' ? 'extremely high detail, intricate textures, sharp focus' : detail === 'simple' ? 'clean simple design, minimal details' : 'standard detailed texture'
      ];
      const mainPrompt = promptParts.join(', ');

      const sections = [
        {
          title: 'Primary DALL-E Prompt',
          body: `"${mainPrompt}"`,
          note: `Purpose: ${titleCase(purpose)}. Aspect: ${aspectLabel}.`
        },
        ...(outputFormat !== 'prompt-only' ? [{
          title: 'Prompt Tips & Modifiers',
          body: `- Aspect modifier: DALL-E 3 handles layout natively. Set aspect in your UI or add: "${aspectLabel}".\n- Avoid quality buzzwords like "photorealistic" in DALL-E 3 unless specific camera gear is defined.\n- Keep descriptions descriptive rather than technical.`,
          note: 'Best practices for DALL-E.'
        }] : []),
        ...(outputFormat === 'prompt-with-negative' ? [{
          title: 'Negative / Avoid Guidance',
          body: avoidList
            ? 'Avoid/Negative cues to prevent common flaws:\n- Avoid text, letters, watermark, signature, labels.\n- Avoid duplicate faces, distorted limbs, blurry hands.\n- Avoid oversaturated highlights.'
            : 'Custom avoid list not requested.',
          note: 'Negative prompts guidance.'
        }] : []),
        ...(safetyLevel === 'strict' ? [{
          title: 'Strict Safety Checklist',
          body: '- Ensure prompt contains no real-world names, celebrities, trademarked logos, or brand marks.\n- Avoid terms related to violence, public figures, or sensitive political themes.\n- DALL-E has built-in content filters; using neutral synonyms prevents unnecessary prompt blocks.',
          note: 'Content moderation safety.'
        }] : []),
        ...(commercialCaution ? [{
          title: 'Commercial Verification',
          body: 'Check the generated image for copyright, public domain compatibility, and trademark conflicts before commercial deployment. DALL-E images generally lack trademark protection.',
          note: 'Intellectual property notice.'
        }] : [])
      ];

      result = sections.map(sec => sec.title + '\n' + sec.body).join('\n\n');
      resultHtml = renderSectionSuite('DALL-E Prompt Draft Suite', sections, 'Independent prompt drafts. Not affiliated with OpenAI or DALL-E; verify intellectual property policies and safety restrictions before public use.');
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
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      const gen = (len: number) => Array.from({length:len}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
      result = '6-CHARACTER CODES:\n' + generateMultiple(() => gen(6), 5) + '\n\n8-CHARACTER CODES:\n' + generateMultiple(() => gen(8), 5) + '\n\n10-CHARACTER CODES:\n' + generateMultiple(() => gen(10), 3) + '\n\nPREFIXED CODES:\n' + generateMultiple(() => 'SAVE-' + gen(4), 3) + '\n' + generateMultiple(() => 'REF-' + gen(6), 3);
      break;
    }
    case 'qr-code-generator': {
      const raw = compactSeed(text, 'https://example.com');
      const type = optionValue('qr-content-type', 'url');
      const size = optionValue('qr-size', '200');
      const normalizedUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/\s+/g, '').toLowerCase()}`;
      const payloads: Record<string, string> = {
        url: normalizedUrl,
        text: raw,
        wifi: `WIFI:T:WPA;S:${raw};P:change-this-password;;`,
        email: `mailto:${raw.includes('@') ? raw : 'hello@example.com'}?subject=Hello&body=Message`,
        sms: `SMSTO:${raw.replace(/[^\d+]/g, '') || '+15551234567'}:Message`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${raw}\nORG:Company Name\nEMAIL:hello@example.com\nTEL:+15551234567\nEND:VCARD`};
      const payload = payloads[type] || payloads.url;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(payload)}`;
      const htmlEmbed = `<img src="${qrUrl}" alt="QR Code" width="${size}" height="${size}">`;
      const sections = [
        { title: `${titleCase(type)} Payload`, body: payload, note: 'This is the exact QR content payload.' },
        { title: 'QR Image URL', body: qrUrl, note: 'Open or download the generated QR image.' },
        { title: 'HTML Embed', body: htmlEmbed, note: 'Use where external image embeds are acceptable.' },
        { title: 'Markdown Embed', body: `![QR Code](${qrUrl})`, note: 'Useful for docs and markdown pages.' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = `<div class="qr-premium-output"><div class="qr-preview-card"><img src="${qrUrl}" alt="QR Code preview" width="${size}" height="${size}" loading="lazy" onerror="this.classList.add('is-hidden');this.nextElementSibling.classList.add('is-visible');"><div class="qr-fallback" aria-hidden="true"><div><span>QR</span><small>Preview unavailable</small></div></div><div><strong>${titleCase(type)} QR Preview</strong><p>Static QR payload. No tracking, analytics, or dynamic editing is claimed.</p><button class="copy-btn result-copy" type="button" data-copy="${escapeHtml(payload)}">Copy Payload</button></div></div></div>` + renderSectionSuite('QR Code Output', sections, 'Color, logo, tracking, and dynamic QR features are not included unless explicitly added by a real QR renderer.');
      break;
    }
    case 'return-policy-generator': {
      const sections = buildStorePolicySuite('return', text, optionValue);
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Draft Return Policy Suite', sections, 'Draft-only store policy helper. Not legal, tax, consumer-protection, marketplace, payment processor, or compliance advice; no legal or compliance result is guaranteed.');
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
      const product = compactSeed(text, 'Premium Leather Wallet');
      const tone = optionValue('shopify-tone', 'clear');
      const focus = optionValue('shopify-benefit-focus', 'quality');
      const includeSeo = optionValue('shopify-include-seo', 'true') === 'true';
      const benefit = focus === 'convenience' ? 'simple daily use' : focus === 'comfort' ? 'comfortable everyday handling' : focus === 'gift' ? 'gift-ready usefulness' : 'clear quality details';
      const toneLine = tone === 'premium' ? 'refined and concise' : tone === 'friendly' ? 'warm and helpful' : tone === 'technical' ? 'specific and detail-led' : 'clear and practical';
      const sections = [
        { title: 'Short Description', body: `${product} gives shoppers a quick way to understand ${benefit} before they compare options or add to cart.`, note: 'Above-the-fold PDP copy' },
        { title: 'Long Description', body: `${product} is for customers who want the product promise, key details, and purchase path to be easy to scan. Keep the tone ${toneLine}, then support the copy with verified details such as material, size, fit, compatibility, included items, and care instructions.`, note: 'Shopify product body' },
        { title: 'Feature Bullets', body: `- Clear product promise for ${product}\n- Optional user-fill verified material or build detail\n- Optional user-fill sizing, variant, or compatibility detail\n- Easy-to-scan information for mobile shoppers\n- Policy-safe copy that avoids unsupported claims`, note: 'Feature bullets' },
        { title: 'Benefit Bullets', body: `- Helps shoppers compare ${product.toLowerCase()} with less friction\n- Explains ${benefit} in practical language\n- Supports confidence with real specs and clear policy details\n- Gives the page a simple path from interest to CTA`, note: 'Benefit bullets' },
        ...(includeSeo ? [{ title: 'SEO Description', body: `${product} with ${benefit}. Review product details, benefits, options, and care information before choosing the right fit.`, note: 'Meta-style description' }] : []),
        { title: 'CTA', body: `Choose ${product}\nCompare The Details\nAdd ${product} To Your Cart`, note: 'Shopify CTA options' },
        { title: 'Claim Safety Note', body: 'Do not add fake reviews, unsupported guarantees, unverified performance claims, environmental claims, medical claims, warranty promises, or scarcity language unless your store data supports them.', note: 'Merchant review' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Shopify Product Copy Suite', sections, `Tone: ${toneLine}. Benefit focus: ${focus}.`);
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
      const adj = ['Midnight','Velvet','Crimson','Golden','Electric','Smoky','Sunset','Tropical','Mystic','Frozen','Ruby','Emerald','Silver','Lavender','Copper'];
      const noun = ['Sour','Martini','Fizz','Mule','Collins','Spritz','Daiquiri','Julep','Punch','Cooler','Smash','Negroni','Highball','Elixir','Dream'];
      result = generateMultiple(() => randomFrom(adj) + ' ' + randomFrom(noun), 12);
      break;
    }
    case 'tattoo-name-generator': {
      if (!text) { result = 'Enter a name or word above.'; break; }
      const gothic = text.split('').map(c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D504 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D51E + code - 97); return c; }).join('');
      const script = text.split('').map(c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D4D0 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4EA + code - 97); return c; }).join('');
      const caps = text.toUpperCase().split('').join(' ');
      result = 'Gothic/Old English:\n' + gothic + '\n\nScript/Cursive:\n' + script + '\n\nSpaced Capitals:\n' + caps + '\n\nMinimalist:\n' + text.toLowerCase() + '\n\nOriginal:\n' + text;
      break;
    }
    case 'sigil-generator': {
      if (!text) { result = 'Enter an intention or word above.'; break; }
      const unique = [...new Set(text.toUpperCase().replace(/[AEIOU\s]/g,'').split(''))];
      const symbols = ['+','x','o','*','#','@','%','=','~','^','v','<','>'];
      const pattern = unique.map(() => randomFrom(symbols)).join('-');
      result = '+-------------------+\n| ' + pattern.slice(0,17).padEnd(17) + ' |\n|    SIGIL OF       |\n|  "' + text.toUpperCase().slice(0,13).padEnd(13) + '"  |\n| ' + unique.reverse().map(() => randomFrom(symbols)).join('-').slice(0,17).padEnd(17) + ' |\n+-------------------+\n\nBase Letters: ' + unique.join(', ') + '\nGlyphs Used: ' + unique.length + '\n\nNote: This is an artistic text-based sigil. For visual sigil art, combine these symbols in a circular or geometric arrangement.';
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
      const industry = optionValue('industry', 'tech');
      const tone = optionValue('tone', 'professional');
      const topic = compactSeed(text, industry + ' newsletter');
      const groups = [
        {
          title: 'Niche-Based Names',
          note: `Built around ${industry} and the reader promise.`,
          items: [
            { name: `${topic} Dispatch`, reason: 'Clear recurring newsletter format.', extra: `Tagline: Useful ${topic.toLowerCase()} notes in your inbox.` },
            { name: `The ${topic} Brief`, reason: 'Professional and easy to understand.', extra: 'Positioning: concise weekly analysis.' },
            { name: `${topic} Signal`, reason: 'Suggests curated insight over noise.', extra: 'Best for expert-led newsletters.' }]
        },
        {
          title: 'Premium Names',
          note: 'Polished names for consulting, B2B, and executive audiences.',
          items: [
            { name: `${topic} Review`, reason: 'Editorial and credible.', extra: 'Tagline: Clear thinking for better decisions.' },
            { name: `${topic} Ledger`, reason: 'Structured and authoritative.', extra: 'Works well for finance, strategy, and ops.' },
            { name: `${topic} Advisory`, reason: 'Signals high-trust insight.', extra: 'Best for expert or firm-led newsletters.' }]
        },
        {
          title: 'Fun Names',
          note: 'Friendly and memorable without getting vague.',
          items: [
            { name: `${topic} Loop`, reason: 'Casual and community-friendly.', extra: 'Tagline: Stay in the loop without the noise.' },
            { name: `${topic} Spark`, reason: 'Creative and idea-led.', extra: 'Best for creators and builders.' },
            { name: `${topic} Side Note`, reason: 'Feels conversational.', extra: 'Good for personal newsletters.' }]
        },
        {
          title: 'Creator Names',
          note: 'Personal-brand friendly.',
          items: [
            { name: `${topic} Notes`, reason: 'Simple and flexible.', extra: 'Pairs well with author-led content.' },
            { name: `Inside ${topic}`, reason: 'Promises behind-the-scenes value.', extra: 'Good for builders in public.' },
            { name: `${topic} Field Guide`, reason: 'Practical and educational.', extra: 'Strong for tutorials and lessons.' }]
        },
        {
          title: 'B2B Names',
          note: `Tone selected: ${tone}.`,
          items: [
            { name: `${topic} Operator`, reason: 'Built for practical business readers.', extra: 'Positioning: tactics for teams.' },
            { name: `${topic} Pipeline`, reason: 'Good for growth and sales topics.', extra: 'Tagline: Better ideas for better execution.' },
            { name: `${topic} Index`, reason: 'Data-friendly and structured.', extra: 'Good for market or research newsletters.' }]
        }];
      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason + ' ' + (item.extra || '')).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Names are brainstorming ideas only. Check newsletter, domain, social, and trademark availability before using one.');
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
      const currencyMap: Record<string, string> = { usd: '$', eur: 'EUR ', gbp: 'GBP ', jpy: 'JPY ' };
      const symbol = currencyMap[optionValue('currency', 'usd')] || '$';
      const layout = optionValue('layout', 'minimal');
      const includeSku = optionValue('include-barcode') === 'true';
      const product = text.replace(/[0-9.$]/g, '').trim() || 'Featured Item';
      const enteredPrice = Number.parseFloat((text.match(/[0-9]+(?:\.[0-9]{1,2})?/) || ['19.99'])[0]);
      const priceValue = Number.isFinite(enteredPrice) ? enteredPrice : 19.99;
      const originalValue = Math.ceil(priceValue * 1.25) - 0.01;
      const decimals = optionValue('currency', 'usd') === 'jpy' ? 0 : 2;
      const price = symbol + priceValue.toFixed(decimals);
      const original = symbol + originalValue.toFixed(decimals);
      const skuNote = includeSku ? ' SKU placeholder: SKU-' + toSafeHandle(product, 'item').toUpperCase().slice(0, 10) + '.' : '';
      const tagData = [
        { label: layout === 'sale-tag' ? 'Sale Tag' : 'Minimal Tag', price, original: layout === 'sale-tag' ? original : '', layout: layout === 'sale-tag' ? 'sale' : 'minimal', note: product + ' - clean printable layout with product name and price.' + skuNote },
        { label: 'Bold Shelf Tag', price, original: layout === 'sale-tag' ? original : '', layout: 'bold', note: 'High-contrast layout for retail displays or craft fair tables.' + skuNote },
        { label: 'Boutique Hang Tag', price, original: layout === 'sale-tag' ? original : '', layout: 'boutique', note: 'Polished tag layout with room for material, size, or short SKU text.' + skuNote }];
      result = tagData.map(tag => tag.label + '\nProduct: ' + product + '\nPrice: ' + tag.price + (tag.original ? '\nOriginal: ' + tag.original : '') + '\nNote: ' + tag.note).join('\n\n');
      resultHtml = renderPriceTags(product + ' Price Tags', tagData, result);
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
      const style = optionValue('tag-style', 'minimal');
      const category = optionValue('product-category', 'home-goods');
      const includePrice = optionValue('include-price', 'true') === 'true';
      const includeCare = optionValue('include-care-note', 'true') === 'true';
      const name = compactSeed(text, 'Everyday Canvas Tote');
      const sku = 'SKU-' + toSafeHandle(name, 'product').toUpperCase().replace(/-/g, '').slice(0, 10) + '-24';
      const price = includePrice ? '$24.00' : 'Price shown at checkout';
      const materialMap: Record<string, string> = {
        'home-goods': 'Cotton canvas with reinforced stitching',
        apparel: 'Soft cotton blend with durable finish',
        beauty: 'Glass container with recyclable outer carton',
        'food-gift': 'Packaged dry goods with sealed inner pouch'
      };
      const care = includeCare ? (category === 'beauty' ? 'Store in a cool, dry place and keep cap closed.' : category === 'food-gift' ? 'Store sealed and check the printed best-by date.' : 'Spot clean gently and air dry before storing.') : 'Care note available on product page.';
      const styleLine = style === 'boutique' ? 'Small-batch goods with a polished retail finish' : style === 'bold' ? 'High-contrast shelf tag for quick product recognition' : style === 'eco' ? 'Low-waste tag copy with materials and care first' : 'Clean product label with essential retail details';
      const sections = [
        { title: 'Front Tag', body: `${name}\n${styleLine}\n${price}`, note: `${titleCase(style)} layout` },
        { title: 'Back Tag', body: `Product code: ${sku}\nMaterial/details: ${materialMap[category] || materialMap['home-goods']}\nCare/usage: ${care}`, note: 'Retail details' },
        { title: 'Shelf / Ecommerce Text', body: `${name} - ${materialMap[category] || materialMap['home-goods']}. ${care}`, note: 'Reusable product copy' },
        { title: 'Production Notes', body: `Use ${sku} as an internal product code only.\nDo not print barcode graphics unless your inventory system or barcode provider generates a real scannable code.\nVerify price, material, care, and origin details before printing.`, note: 'Safe retail handoff' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Retail Product Tag Suite', sections, 'No barcode, regulatory label, or scannability claim is generated.');
      break;
    }
    case 'clothing-tag-generator': {
      const lang = optionValue('language', 'english');
      const garmentType = optionValue('garment-type', 'tee');
      const style = optionValue('clothing-tag-style', 'minimal');
      const includeSymbols = optionValue('include-care-symbols') === 'true';
      const garment = compactSeed(text, garmentType === 'hoodie' ? 'Everyday Hoodie' : garmentType === 'dress' ? 'Weekend Dress' : garmentType === 'accessory' ? 'Ribbed Beanie' : 'Classic Tee');
      const careText: Record<string, string> = {
        english: 'Machine wash cold. Do not bleach. Tumble dry low. Cool iron if needed.',
        spanish: 'Lavar a maquina en frio. No usar blanqueador. Secar a baja temperatura.',
        french: 'Lavage en machine a froid. Ne pas javelliser. Sechage doux.'
      };
      const material = garmentType === 'hoodie' ? '80% cotton, 20% recycled polyester fleece' : garmentType === 'dress' ? '95% cotton, 5% elastane knit' : garmentType === 'accessory' ? '70% acrylic, 30% wool blend' : '60% cotton, 40% recycled polyester jersey';
      const sizeLine = garmentType === 'accessory' ? 'Size: One size' : 'Size: S / M / L / XL';
      const symbolLine = includeSymbols ? 'Care symbol guide: wash cold, no bleach, tumble low, cool iron.' : 'Care symbol guide: text-only care line selected.';
      const brandLine = style === 'boutique' ? 'Small-batch apparel, made for repeat wear.' : style === 'activewear' ? 'Designed for movement, comfort, and easy care.' : 'Clean essentials for everyday rotation.';
      const sections = [
        { title: 'Main Apparel Label', body: `${garment}\n${sizeLine}\nMaterial: ${material}\nOrigin: Final country of origin must match your real production records.`, note: `${titleCase(style)} label` },
        { title: 'Care Label', body: `${symbolLine}\nCare: ${careText[lang] || careText.english}`, note: `${titleCase(lang)} care text` },
        { title: 'Hang Tag Copy', body: `${garment}\n${brandLine}\nMade to be worn often, cared for simply, and styled across seasons.`, note: 'Retail-facing copy' },
        { title: 'Safety Note', body: `Verify fiber content, care instructions, size system, origin statement, and any required local labeling rules before printing. This output is drafting copy only, not legal compliance certification.`, note: 'Compliance-aware' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Apparel Tag And Care Label Suite', sections, 'Avoid printing compliance-sensitive details until verified against the actual garment.');
      break;
    }
    case 'minutes-of-meeting-generator': {
      {
        const topic = compactSeed(text, 'Weekly Project Sync');
        const style = optionValue('mom-style', optionValue('template-style', 'corporate'));
        const detail = optionValue('mom-detail-level', 'balanced');
        const includeActionTable = optionValue('mom-include-actions', optionValue('include-action-items-table', 'true')) === 'true';
        const includeFollowUp = optionValue('mom-include-follow-up', 'true') === 'true';
        const sections = [
          { title: 'Meeting Metadata', body: `Meeting: ${topic}\nDate: Optional user-fill meeting date\nTime: Optional user-fill start and end time\nLocation/link: Optional user-fill room or meeting link\nChair/facilitator: Optional user-fill name\nNote taker: Optional user-fill name\nStyle: ${titleCase(style.replace(/-/g, ' '))}\nDetail level: ${titleCase(detail)}`, note: 'MoM header' },
          { title: 'Attendees', body: `Present: Optional user-fill names\nAbsent: Optional user-fill names\nGuests: Optional user-fill names or roles`, note: 'Verify names' },
          { title: 'Summary', body: `The group reviewed ${topic}, discussed current status, captured decisions, and identified follow-up actions. Replace this with a factual summary from the actual meeting notes.`, note: 'Executive recap' },
          { title: 'Decisions', body: `Decision 1: Optional user-fill decision\nDecision owner: Optional user-fill owner\nRationale or context: Optional user-fill short note\nOpen decision: Optional user-fill item that still needs approval`, note: 'Decision log' },
          ...(includeActionTable ? [{ title: 'Action Items', body: `Owner | Action | Due Date | Status\nOptional user-fill owner | Complete follow-up for ${topic} | Optional user-fill date | Open\nOptional user-fill owner | Share notes or materials | Optional user-fill date | Open`, note: 'Readable action table' }] : []),
          { title: 'Discussion Notes', body: `- Key update: Optional user-fill factual note\n- Risk or blocker: Optional user-fill risk\n- Parking lot item: Optional user-fill item for later discussion\n- Next meeting: Optional user-fill date, owner, and agenda focus`, note: 'Structured notes' },
          ...(includeFollowUp ? [{ title: 'Follow-Up Email', body: `Subject: Notes and next steps from ${topic}\n\nHi everyone,\n\nThanks for joining. The key decisions and action items are below. Please review your owner, due date, and any corrections by Optional user-fill review deadline.\n\nBest,\nOptional user-fill sender`, note: 'Copyable follow-up' }] : []),
          { title: 'Review Checklist', body: `Confirm attendee names\nConfirm decisions and owners\nConfirm deadlines\nRemove private or unrelated notes\nShare only with the intended audience`, note: 'Before distribution' }
        ];
        result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
        resultHtml = renderSectionSuite('Minutes Of Meeting Draft', sections, 'Draft record only. Verify names, decisions, obligations, and deadlines before sharing.');
        break;
      }
    }
    case 'event-name-generator': {
      const type = optionValue('event-type', 'conference');
      const vibe = optionValue('vibe', 'professional');
      const built = makeNameIdeaGroups(text || type, {
        kind: `${vibe} ${type} event`,
        style: vibe,
        local: true,
        includeTaglines: true
      });
      result = built.text;
      resultHtml = renderGroupedIdeas(built.groups, 'Event names are creative suggestions; verify venue, sponsor, and trademark conflicts before publishing.');
      break;
    }
    case 'college-name-generator': {
      const type = optionValue('institution-type', 'university');
      const prestige = optionValue('prestige-level', 'traditional');
      const place = compactSeed(text, 'Ashford');

      const prefixes: Record<string, string[]> = {
        elite: ['Aurelian', 'Westhaven', 'St. Jude', 'Kingsley', 'Crown Point'],
        traditional: [place, 'Old ' + place, 'East ' + place, 'West ' + place, 'Saint ' + place],
        progressive: ['Apex', 'Horizon', 'Summit', 'Nexus', 'Pioneer'],
        'public-land': [place + ' State', 'Northern ' + place, 'Central ' + place, place + ' Valley', 'Metro ' + place]
      };

      const typeLabel: Record<string, string> = {
        university: 'University',
        college: 'College',
        institute: 'Institute',
        academy: 'Academy'
      };

      const typeWord = typeLabel[type] || 'University';
      const pool = prefixes[prestige] || prefixes.traditional;

      const groups = [
        {
          title: `College Names (${titleCase(prestige)} / ${titleCase(typeWord)})`,
          note: 'Creative institutional identity drafts.',
          items: pool.map((prefix, idx) => ({
            name: `${prefix} ${typeWord}`,
            reason: `Prestige style: ${prestige}.`,
            extra: `Concept Option ${idx + 1}`
          }))
        }
      ];

      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Safe naming note: institution names are creative drafts only. Check existing school registries and trademark databases before use.');
      break;
    }
    case 'diner-name-generator': {
      const seed = compactSeed(text, 'Maple Street');
      const core = seed.split(/\s+/)[0] || 'Maple';
      const groups = [
        { title: 'Retro', note: 'Nostalgic diner names with 50s energy.', items: [{ name: core + ' Rocket Diner', reason: 'Retro and upbeat.', extra: 'Best use: throwback diner.' }, { name: 'The ' + seed + ' Counter', reason: 'Classic counter-service cue.', extra: 'Best use: lunch counter.' }, { name: core + ' Soda Grill', reason: 'Old-school Americana.', extra: 'Best use: retro grill.' }] },
        { title: 'Local', note: 'Neighborhood-friendly diner names.', items: [{ name: seed + ' Diner', reason: 'Direct local fit.', extra: 'Best use: local diner.' }, { name: core + ' Corner Kitchen', reason: 'Community feel.', extra: 'Best use: neighborhood cafe.' }, { name: seed + ' Table', reason: 'Warm and place-based.', extra: 'Best use: local eatery.' }] },
        { title: 'Family', note: 'Friendly names for broad audiences.', items: [{ name: core + ' Family Grill', reason: 'Clear family positioning.', extra: 'Best use: family diner.' }, { name: 'The Happy Plate', reason: 'Simple and welcoming.', extra: 'Best use: casual restaurant.' }, { name: seed + ' Kitchen', reason: 'Home-style tone.', extra: 'Best use: breakfast spot.' }] },
        { title: 'Funny', note: 'Light puns without misleading claims.', items: [{ name: 'Griddle Me This', reason: 'Memorable food pun.', extra: 'Best use: playful diner.' }, { name: core + ' Bite Club', reason: 'Cheeky and food-focused.', extra: 'Best use: casual concept.' }, { name: 'Toast Office', reason: 'Short breakfast joke.', extra: 'Best use: brunch diner.' }] },
        { title: 'Premium', note: 'More polished diner and cafe names.', items: [{ name: core + ' Brass Diner', reason: 'Elevated material cue.', extra: 'Best use: premium diner.' }, { name: seed + ' Supper Club', reason: 'Classic upscale feel.', extra: 'Best use: evening diner.' }, { name: 'The ' + core + ' Room', reason: 'Minimal and refined.', extra: 'Best use: modern diner.' }] },
        { title: 'Roadside', note: 'Travel-stop and highway-friendly names.', items: [{ name: core + ' Mile Diner', reason: 'Road-trip cue.', extra: 'Best use: roadside diner.' }, { name: seed + ' Stop', reason: 'Simple traveler signal.', extra: 'Best use: highway eatery.' }, { name: 'Blue Plate Roadhouse', reason: 'Classic roadside mood.', extra: 'Best use: comfort food spot.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('diner-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: diner names are creative suggestions only. This tool does not check business, trademark, domain, or local availability.');
      break;
    }
    case 'flower-name-generator': {
      const seed = compactSeed(text, 'moon');
      const cap = titleCase(seed);
      const groups = [
        { title: 'Botanical', note: 'Believable field-guide style names.', items: [{ name: cap + ' Bellflower', reason: 'Natural common-name shape.', extra: 'Best use: fictional botany.' }, { name: 'Silver ' + cap + ' Lily', reason: 'Botanical and visual.', extra: 'Best use: garden lore.' }, { name: cap + ' Meadowcup', reason: 'Soft plant-name cadence.', extra: 'Best use: nature writing.' }] },
        { title: 'Fantasy', note: 'Magical flora for stories and RPGs.', items: [{ name: cap + ' Glowbloom', reason: 'Fantasy light cue.', extra: 'Best use: fantasy flower.' }, { name: 'Starfall ' + cap + ' Rose', reason: 'Mythic and visual.', extra: 'Best use: worldbuilding.' }, { name: cap + ' Wishpetal', reason: 'Gentle magical tone.', extra: 'Best use: fairy garden.' }] },
        { title: 'Elegant', note: 'Graceful flower names for refined settings.', items: [{ name: 'Velvet ' + cap + ' Orchid', reason: 'Luxurious flower texture.', extra: 'Best use: elegant bouquet.' }, { name: cap + ' Lace Iris', reason: 'Delicate and formal.', extra: 'Best use: noble garden.' }, { name: 'Ivory ' + cap + ' Bloom', reason: 'Soft premium feel.', extra: 'Best use: wedding floral.' }] },
        { title: 'Color Based', note: 'Names that foreground color and appearance.', items: [{ name: 'Blue ' + cap + ' Aster', reason: 'Clear color image.', extra: 'Best use: illustrated flora.' }, { name: 'Amber ' + cap + ' Poppy', reason: 'Warm visual cue.', extra: 'Best use: meadow flower.' }, { name: 'Crimson ' + cap + ' Dahlia', reason: 'Dramatic color note.', extra: 'Best use: fantasy garden.' }] },
        { title: 'Latin Inspired', note: 'Fictional Latin-style names, not real taxonomy.', items: [{ name: cap + 'flora Luminis', reason: 'Scientific-style cadence.', extra: 'Best use: fictional field guide.' }, { name: cap + 'ia Aurea', reason: 'Latin-inspired ending.', extra: 'Best use: invented species.' }, { name: 'Floralis ' + cap.toLowerCase(), reason: 'Botanical mood only.', extra: 'Best use: lore entry.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('flower-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: flower names are fictional creative suggestions. Latin-inspired results are not real scientific classifications.');
      break;
    }
    case 'newspaper-name-generator': {
      const place = compactSeed(text, 'Cedar Falls');
      const groups = [
        { title: 'Local', note: 'Community paper names.', items: [{ name: 'The ' + place + ' Ledger', reason: 'Local and credible.', extra: 'Best use: town newspaper.' }, { name: place + ' Weekly', reason: 'Simple publication cadence.', extra: 'Best use: local weekly.' }, { name: 'The ' + place + ' Neighbor', reason: 'Community-first tone.', extra: 'Best use: neighborhood paper.' }] },
        { title: 'Classic', note: 'Traditional newspaper suffixes.', items: [{ name: 'The ' + place + ' Gazette', reason: 'Classic newspaper form.', extra: 'Best use: fictional paper.' }, { name: place + ' Tribune', reason: 'Authoritative and familiar.', extra: 'Best use: city paper.' }, { name: 'The ' + place + ' Herald', reason: 'Established feel.', extra: 'Best use: historical setting.' }] },
        { title: 'Modern', note: 'Digital-first publication names.', items: [{ name: place + ' Signal', reason: 'Modern news cue.', extra: 'Best use: digital publication.' }, { name: place + ' Current', reason: 'Fresh and concise.', extra: 'Best use: online news.' }, { name: 'The ' + place + ' Brief', reason: 'Newsletter-friendly.', extra: 'Best use: daily digest.' }] },
        { title: 'Campus', note: 'School and university paper names.', items: [{ name: 'The ' + place + ' Quill', reason: 'Student-journalism feel.', extra: 'Best use: campus paper.' }, { name: place + ' Student Voice', reason: 'Clear audience.', extra: 'Best use: student publication.' }, { name: 'The ' + place + ' Desk', reason: 'Editorial room cue.', extra: 'Best use: campus newsroom.' }] },
        { title: 'Fictional World', note: 'Worldbuilding publication names.', items: [{ name: 'The ' + place + ' Courier', reason: 'Fits fantasy or historical worlds.', extra: 'Best use: worldbuilding.' }, { name: place + ' Watchtower', reason: 'Setting-specific signal.', extra: 'Best use: fictional city.' }, { name: 'The ' + place + ' Chronicle', reason: 'Broad fictional fit.', extra: 'Best use: RPG setting.' }] },
        { title: 'Investigative', note: 'Names with accountability and reporting focus.', items: [{ name: place + ' Review', reason: 'Analytical news tone.', extra: 'Best use: investigative outlet.' }, { name: 'The ' + place + ' Record', reason: 'Fact-recording cue.', extra: 'Best use: civic reporting.' }, { name: place + ' Watch', reason: 'Oversight and public interest.', extra: 'Best use: watchdog publication.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('newspaper-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: newspaper names are creative suggestions only. Check existing publications, brands, and local registrations before use.');
      break;
    }
    case 'papyrus-generator': {
      if (!text) { result = 'Enter text above to turn it into a papyrus-style scroll.'; break; }
      const style = optionValue('papyrus-style', 'scroll');
      const border = optionValue('include-border', 'true') === 'true';
      const title = style === 'tablet' ? 'CLAY TABLET RECORD' : style === 'ceremonial' ? 'CEREMONIAL SCROLL' : 'PAPYRUS SCROLL';
      const body = text.split(/[.!?]+/).map(line => line.trim()).filter(Boolean).map(line => ':: ' + line).join('\n');
      const frame = border ? 'o--o--o--o--o--o--o\n' : '';
      result = frame + title + '\n' + '-'.repeat(title.length) + '\n' + body + '\n' + (border ? 'o--o--o--o--o--o--o' : '');

      let bgStyle = '';
      let borderStyle = '';
      let fontColor = '#3f2f1f';

      if (style === 'tablet') {
        bgStyle = 'background: #d2b48c; box-shadow: inset 0 0 10px rgba(0,0,0,0.3); border-radius: 8px; font-family: Courier, monospace;';
        borderStyle = border ? 'border: 6px double #8b5a2b;' : '';
        fontColor = '#5c3e21';
      } else if (style === 'ceremonial') {
        bgStyle = 'background: #f4ecd8; box-shadow: 0 4px 15px rgba(0,0,0,0.15); border-radius: 4px; font-family: Garamond, serif;';
        borderStyle = border ? 'border: 4px solid #b8860b; outline: 1px solid #b8860b; outline-offset: 4px;' : '';
        fontColor = '#1f1f1f';
      } else {
        bgStyle = 'background: #fdf5e6; box-shadow: inset 0 0 20px rgba(139,90,43,0.15); border-radius: 4px; font-family: Georgia, serif;';
        borderStyle = border ? 'border: 3px dashed #8b5a2b; padding: 12px;' : '';
        fontColor = '#4a3525';
      }

      const previewHtml = `<div style="padding: 24px; min-height: 180px; display: grid; place-items: center; background: #faf8f5;"><div style="width: 100%; max-width: 500px; padding: 20px; box-sizing: border-box; color: ${fontColor}; ${bgStyle} ${borderStyle}"><div style="text-align: center; font-weight: bold; font-size: 1.2rem; margin-bottom: 12px; letter-spacing: 2px;">${escapeHtml(title)}</div><div style="white-space: pre-wrap; line-height: 1.6; font-size: 1rem;">${escapeHtml(body)}</div></div></div>`;
      
      const sections = [
        {
          title: 'Transformed Text Output',
          body: result,
          note: `Style: ${titleCase(style)}. Border: ${border ? 'Yes' : 'No'}.`
        }
      ];

      resultHtml = previewHtml + renderSectionSuite('Ancient Manuscript Preview', sections, 'Aesthetic scroll and tablet formatting helper. Use for creative writing, gaming props, classroom sheets, and fantasy notes.');
      break;
    }
    case 'serif-generator': {
      if (!text) { result = 'Enter text above to generate serif Unicode styles.'; break; }
      const style = optionValue('serif-style', 'mixed');
      const maps: Record<string, [number, number]> = {
        bold: [0x1D400, 0x1D41A],
        italic: [0x1D434, 0x1D44E]
      };
      const convert = (value: string, map: [number, number]) => value.split('').map(ch => {
        const code = ch.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(map[0] + code - 65);
        if (code >= 97 && code <= 122) return String.fromCodePoint(map[1] + code - 97);
        return ch;
      }).join('');

      const boldVal = convert(text, maps.bold);
      const italicVal = convert(text, maps.italic);
      const headlineVal = convert(text.toUpperCase(), maps.bold);

      const sections = [
        ...(style === 'bold' || style === 'mixed' ? [{ title: 'Bold Serif', body: boldVal, note: 'Mathematical bold serif Unicode variants.' }] : []),
        ...(style === 'italic' || style === 'mixed' ? [{ title: 'Italic Serif', body: italicVal, note: 'Mathematical italic serif Unicode variants.' }] : []),
        ...(style === 'headline' || style === 'mixed' ? [{ title: 'Headline Serif', body: headlineVal, note: 'All-caps bold serif Unicode variant.' }] : [])
      ];

      result = sections.map(sec => sec.title + '\n' + sec.body).join('\n\n');
      resultHtml = renderSectionSuite('Serif Font Variations', sections, 'Unicode styles use mathematical characters. Some platforms or screen readers may not read them correctly; check compatibility before using in critical copy.');
      break;
    }
    case 'plant-name-generator': {
      const seed = compactSeed(text, 'sage');
      const cap = titleCase(seed);
      const groups = [
        { title: 'Houseplant', note: 'Friendly names for indoor plant concepts.', items: [{ name: cap + ' Pothos', reason: 'Approachable houseplant shape.', extra: 'Best use: indoor plant.' }, { name: 'Little ' + cap + ' Vine', reason: 'Cute and compact.', extra: 'Best use: shelf plant.' }, { name: cap + ' Windowleaf', reason: 'Indoor-light cue.', extra: 'Best use: fictional houseplant.' }] },
        { title: 'Fantasy Flora', note: 'Worldbuilding plants with light lore hooks.', items: [{ name: cap + ' Root', reason: 'Ingredient-friendly.', extra: 'Best use: alchemy herb.' }, { name: 'Moon ' + cap + ' Fern', reason: 'Magical but gentle.', extra: 'Best use: fantasy forest.' }, { name: cap + ' Thornbloom', reason: 'Adventure-ready plant name.', extra: 'Best use: RPG flora.' }] },
        { title: 'Garden', note: 'Names for garden beds and fictional landscaping.', items: [{ name: cap + ' Gardenia', reason: 'Elegant garden cadence.', extra: 'Best use: garden plant.' }, { name: 'Summer ' + cap + ' Sprig', reason: 'Seasonal and bright.', extra: 'Best use: cottage garden.' }, { name: cap + ' Borderleaf', reason: 'Landscape-design cue.', extra: 'Best use: garden border.' }] },
        { title: 'Scientific Style', note: 'Fictional botanical wording, not real taxonomy.', items: [{ name: cap + 'ia Viridis', reason: 'Latin-inspired structure.', extra: 'Best use: field guide.' }, { name: 'Floralis ' + cap.toLowerCase(), reason: 'Scientific-style mood.', extra: 'Best use: invented species.' }, { name: cap + 'um Lumen', reason: 'Catalog-like phrasing.', extra: 'Best use: sci-fi botany.' }] },
        { title: 'Cute', note: 'Soft, playful plant names.', items: [{ name: cap + ' Buddy', reason: 'Friendly personified name.', extra: 'Best use: plant nickname.' }, { name: 'Sprouty ' + cap, reason: 'Playful and tiny.', extra: 'Best use: cute houseplant.' }, { name: cap + ' Buttonleaf', reason: 'Small and charming.', extra: 'Best use: cozy plant.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('plant-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: plant names are fictional creative suggestions. Scientific-style names are not real botanical classifications.');
      break;
    }
    case 'sibling-name-generator': {
      const style = optionValue('matching-style', 'same-origin-vibe');
      const gender = optionValue('target-gender', 'mixed-neutral');
      const seed = text.trim() ? titleCase(text.trim()) : '';

      const boyNames = ['Miles', 'Theo', 'Jonah', 'Felix', 'Arthur', 'Caleb', 'Nolan', 'Elliot', 'Lucas', 'Liam', 'Silas', 'Henry'];
      const girlNames = ['Mia', 'Clara', 'Elise', 'Nora', 'Ivy', 'Hazel', 'Lena', 'Violet', 'Aria', 'Siena', 'Iris', 'Alice'];
      const neutralNames = ['Rowan', 'Quinn', 'Avery', 'Riley', 'Morgan', 'Sage', 'Finley', 'Emery', 'Harper', 'Arden', 'Jordan', 'Robin'];

      const pool = gender === 'boys' ? boyNames : gender === 'girls' ? girlNames : neutralNames;

      const getPair = (first: string): string => {
        if (style === 'same-starting-letter') {
          const letter = first ? first.charAt(0).toUpperCase() : randomFrom(['A', 'E', 'L', 'M', 'N', 'R']);
          const filtered = pool.filter(n => n.toUpperCase().startsWith(letter) && n.toUpperCase() !== first.toUpperCase());
          const match = filtered.length ? randomFrom(filtered) : randomFrom(pool);
          return first ? `${first} & ${match}` : `${match} & ${randomFrom(pool.filter(n => n !== match))}`;
        }
        if (style === 'rhyming') {
          const suffix = first ? first.slice(-2).toLowerCase() : '';
          const vowels = ['a','e','i','o','u','y'];
          const filtered = pool.filter(n => {
            if (n.toUpperCase() === first.toUpperCase()) return false;
            if (!first) return false;
            const nLast = n.slice(-2).toLowerCase();
            return nLast.slice(-1) === suffix.slice(-1) || (vowels.includes(nLast.slice(-1)) && vowels.includes(suffix.slice(-1)));
          });
          const match = filtered.length ? randomFrom(filtered) : randomFrom(pool);
          return first ? `${first} & ${match}` : `${randomFrom(pool)} & ${randomFrom(pool)}`;
        }
        if (style === 'classic') {
          const classics = {
            boys: ['Henry', 'James', 'Thomas', 'William', 'Arthur', 'Charles', 'George', 'Edward'],
            girls: ['Alice', 'Eleanor', 'Clara', 'Rose', 'Beatrice', 'Charlotte', 'Jane', 'Margaret'],
            'mixed-neutral': ['Francis', 'Robin', 'Morgan', 'Ellis', 'Evelyn', 'Christian', 'Julian', 'Sydney']
          };
          const subPool = classics[gender] || classics['mixed-neutral'];
          const match = randomFrom(subPool.filter(n => n.toUpperCase() !== first.toUpperCase()));
          return first ? `${first} & ${match}` : `${randomFrom(subPool)} & ${randomFrom(subPool)}`;
        }
        const vibes = {
          boys: ['Miles', 'Theo', 'Jonah', 'Felix', 'Caleb', 'Nolan', 'Silas', 'Levi'],
          girls: ['Mia', 'Clara', 'Elise', 'Nora', 'Ivy', 'Hazel', 'Lena', 'Iris'],
          'mixed-neutral': ['Rowan', 'Quinn', 'Avery', 'Riley', 'Sage', 'Finley', 'Emery', 'Arden']
        };
        const subPool = vibes[gender] || vibes['mixed-neutral'];
        const match = randomFrom(subPool.filter(n => n.toUpperCase() !== first.toUpperCase()));
        return first ? `${first} & ${match}` : `${randomFrom(subPool)} & ${randomFrom(subPool)}`;
      };

      const pairsList: { name: string, reason: string, extra: string }[] = [];
      for (let i = 0; i < 5; i++) {
        let pairStr = '';
        if (seed) {
          pairStr = getPair(seed);
        } else {
          const first = randomFrom(pool);
          pairStr = getPair(first);
        }
        pairsList.push({
          name: pairStr,
          reason: `Coordinated sibling matching style: ${style.replace(/-/g, ' ')}.`,
          extra: `Target gender preference: ${gender}.`
        });
      }

      const groups = [
        {
          title: `Sibling Name Pairings (${titleCase(style.replace(/-/g, ' '))})`,
          note: seed ? `Matching partner name: ${seed}.` : 'Random matching pairs.',
          items: pairsList
        }
      ];

      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Check cultural naming flow, spelling compatibility, initials (avoid unintended acronyms), and family preferences before choosing.');
      break;
    }
    case 'pick-a-name-generator': {
      const entries = text.split(/[\n,;]+/).map(item => item.trim()).filter(Boolean);
      const names = Array.from(new Set(entries.length ? entries : ['Avery', 'Jordan', 'Morgan', 'Taylor', 'Riley', 'Casey', 'Sam']));
      const mode = optionValue('picker-mode', 'simple');
      const backupCount = Math.max(0, Math.min(5, Number(optionValue('picker-backups', '2')) || 2));
      const animationEnabled = optionValue('animation', 'true') === 'true';
      const showRemaining = optionValue('remove-selected', 'false') === 'true';

      let shuffled = [...names];
      try {
        const randomInt = (max: number) => {
          const arr = new Uint32Array(1);
          crypto.getRandomValues(arr);
          return arr[0] % max;
        };
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = randomInt(i + 1);
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
      } catch (e) {
        shuffled.sort(() => Math.random() - 0.5);
      }

      const picked = shuffled[0];
      const backups = shuffled.slice(1, 1 + backupCount);
      const announcement = `Mode: ${titleCase(mode)}\nSelected Name: ${picked}\nBackup Picks: ${backups.length ? backups.join(', ') : 'None'}\nEntry Count: ${names.length}\nAnimation: ${animationEnabled ? 'Enabled' : 'Disabled'}`;

      const sections = [
        { title: 'Selected Name', body: picked, note: `${titleCase(mode)} picker result.` },
        { title: 'Backup Picks', body: backups.length ? backups.map((name, index) => `${index + 1}. ${name}`).join('\n') : 'No backup picks requested.', note: 'Use if the first pick is unavailable.' },
        { title: 'Copyable Result', body: announcement, note: 'Ready to paste into chat, class notes, or meeting notes.' },
        ...(showRemaining ? [{ title: 'Remaining Names', body: names.filter(name => name !== picked).join('\n') || 'No remaining names.', note: 'Useful for repeat rounds.' }] : [])
      ];

      result = announcement;
      resultHtml = renderSectionSuite('Random Name Picker Result', sections, 'Browser-side informal random picker. Keep your own records for important draws.');
      break;
    }
    case 'name-generator-wheel': {
      const entries = text.split(/[\n]+/).map(item => item.trim()).filter(Boolean);
      const names = Array.from(new Set(entries.length ? entries : ['Avery', 'Blake', 'Casey', 'Drew', 'Emery', 'Finley', 'Harper', 'Jordan']));
      const mode = optionValue('wheel-mode', 'classroom');
      const theme = optionValue('wheel-theme', 'bright');
      const shuffled = [...names].sort(() => Math.random() - 0.5);
      const winner = shuffled[0];
      const history = shuffled.slice(0, Math.min(4, shuffled.length));
      const removeSelected = optionValue('remove-selected-names', 'false') === 'true';
      const sound = optionValue('sound-effects', 'true') === 'true' ? 'enabled' : 'muted';
      result = 'Wheel result\n\nWinner: ' + winner + '\nEntries on wheel: ' + names.length + '\nMode: ' + titleCase(mode) + '\nSound effects: ' + sound;
      if (removeSelected) {
        result += '\n\nNext round entries:\n' + names.filter(name => name !== winner).join('\n');
      }
      resultHtml = renderPickerWheel('Wheel Selection Result', winner, names, history, `${titleCase(mode)} wheel with ${names.length} entries. Sound setting: ${sound}.` + (removeSelected ? ' Next-round entries are listed in the copied result.' : ''), theme);
      break;
    }
    case 'cake-company-names-generator': {
      const seed = compactSeed(text, 'Sweet');
      const core = seed.split(/\s+/)[0] || 'Sweet';
      const groups = [
        { title: 'Elegant', note: 'Refined cake company names.', items: [{ name: core + ' & Pearl Cakes', reason: 'Elegant event cue.', extra: 'Best use: boutique cakes.' }, { name: 'Ivory ' + core + ' Atelier', reason: 'Polished and premium.', extra: 'Best use: custom cake studio.' }, { name: core + ' Velvet Bakery', reason: 'Soft luxury texture.', extra: 'Best use: elegant bakery.' }] },
        { title: 'Cute', note: 'Friendly names for playful dessert brands.', items: [{ name: core + ' Sprinkle Co.', reason: 'Bright and approachable.', extra: 'Best use: cute bakery.' }, { name: 'Happy ' + core + ' Cakes', reason: 'Simple cheerful tone.', extra: 'Best use: family orders.' }, { name: core + ' Button Bakery', reason: 'Small and charming.', extra: 'Best use: home bakery.' }] },
        { title: 'Premium', note: 'High-end cake and dessert positioning.', items: [{ name: core + ' Reserve Cakes', reason: 'Curated premium signal.', extra: 'Best use: premium cake brand.' }, { name: 'The ' + core + ' Tier', reason: 'Cake-specific and refined.', extra: 'Best use: luxury cakes.' }, { name: core + ' Fine Bakes', reason: 'Upscale but clear.', extra: 'Best use: dessert studio.' }] },
        { title: 'Bakery', note: 'Storefront and everyday bakery names.', items: [{ name: core + ' Crumb Bakery', reason: 'Bakery vocabulary.', extra: 'Best use: storefront bakery.' }, { name: 'The Frosted ' + core, reason: 'Cake-forward and memorable.', extra: 'Best use: cake bakery.' }, { name: core + ' Whisk House', reason: 'Craft and warmth.', extra: 'Best use: neighborhood bakery.' }] },
        { title: 'Wedding', note: 'Names for wedding cake specialists.', items: [{ name: core + ' Vows Cakes', reason: 'Wedding-specific.', extra: 'Best use: wedding cakes.' }, { name: 'Lace & ' + core + ' Bakery', reason: 'Bridal visual cue.', extra: 'Best use: wedding studio.' }, { name: core + ' Tier Studio', reason: 'Elegant cake structure.', extra: 'Best use: tiered cakes.' }] },
        { title: 'Local', note: 'Community-friendly bakery names.', items: [{ name: core + ' Street Cakes', reason: 'Local business feel.', extra: 'Best use: local bakery.' }, { name: core + ' Corner Bakery', reason: 'Neighborhood warmth.', extra: 'Best use: walk-in shop.' }, { name: core + ' County Sweets', reason: 'Regional cue.', extra: 'Best use: local cake company.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('cake-company-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: cake company names are creative suggestions only. This tool does not check trademarks, domains, social handles, or business registrations.');
      break;
    }
    case 'car-name-generator': {
      const seed = compactSeed(text, 'Nova');
      const groups = [
        { title: 'Sports', note: 'Fast, model-style car names.', items: [{ name: seed + ' Apex', reason: 'Performance peak cue.', extra: 'Best use: sports model.' }, { name: seed + ' Sprint', reason: 'Speed and agility.', extra: 'Best use: coupe.' }, { name: seed + ' GT', reason: 'Classic performance suffix.', extra: 'Best use: grand tourer.' }] },
        { title: 'Luxury', note: 'Smooth, premium vehicle names.', items: [{ name: seed + ' Monarch', reason: 'Upscale authority.', extra: 'Best use: luxury sedan.' }, { name: seed + ' Sterling', reason: 'Refined material cue.', extra: 'Best use: premium model.' }, { name: seed + ' Grande', reason: 'Spacious luxury tone.', extra: 'Best use: executive car.' }] },
        { title: 'Rugged', note: 'Truck and adventure vehicle names.', items: [{ name: seed + ' Ridge', reason: 'Outdoor terrain cue.', extra: 'Best use: SUV.' }, { name: seed + ' Trail', reason: 'Adventure-ready.', extra: 'Best use: off-road trim.' }, { name: seed + ' Boulder', reason: 'Strong and durable.', extra: 'Best use: truck.' }] },
        { title: 'Futuristic', note: 'Fictional future vehicle names.', items: [{ name: seed + ' Flux', reason: 'Future-tech sound.', extra: 'Best use: concept car.' }, { name: seed + ' Orbit', reason: 'Sci-fi motion cue.', extra: 'Best use: electric concept.' }, { name: seed + ' Vector', reason: 'Clean technical name.', extra: 'Best use: futuristic model.' }] },
        { title: 'Classic', note: 'Timeless car nickname and model ideas.', items: [{ name: seed + ' Cruiser', reason: 'Old-school comfort.', extra: 'Best use: classic car.' }, { name: seed + ' Roadster', reason: 'Vintage body-style cue.', extra: 'Best use: convertible.' }, { name: seed + ' Deluxe', reason: 'Classic trim feel.', extra: 'Best use: retro model.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('car-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: car names are creative suggestions only. This tool does not check trademarks, model names, domains, or live availability.');
      break;
    }
    case 'title-name-generator': {
      const topic = compactSeed(text, 'Hidden Patterns');
      const groups = [
        { title: 'Book', note: 'Book and manuscript title ideas.', items: [{ name: 'The ' + topic + ' Letters', reason: 'Narrative object hook.', extra: 'Best use: book title.' }, { name: 'A Field Guide to ' + topic, reason: 'Clear nonfiction shape.', extra: 'Best use: guidebook.' }, { name: 'After ' + topic, reason: 'Short emotional arc.', extra: 'Best use: novel.' }] },
        { title: 'Article', note: 'Readable editorial titles.', items: [{ name: 'What ' + topic + ' Changes', reason: 'Clear reader question.', extra: 'Best use: article.' }, { name: 'A Practical Look at ' + topic, reason: 'Grounded and useful.', extra: 'Best use: explainer.' }, { name: 'Why ' + topic + ' Matters', reason: 'Classic argument frame.', extra: 'Best use: essay.' }] },
        { title: 'Project', note: 'Project and initiative titles.', items: [{ name: 'Project ' + topic, reason: 'Simple internal title.', extra: 'Best use: project.' }, { name: topic + ' Roadmap', reason: 'Planning-friendly.', extra: 'Best use: initiative.' }, { name: topic + ' Studio', reason: 'Creative project feel.', extra: 'Best use: design project.' }] },
        { title: 'Chapter', note: 'Chapter and section headings.', items: [{ name: 'Chapter One: ' + topic, reason: 'Direct chapter framing.', extra: 'Best use: chapter.' }, { name: 'The ' + topic + ' Turn', reason: 'Story beat cue.', extra: 'Best use: section title.' }, { name: 'Before ' + topic, reason: 'Transition and suspense.', extra: 'Best use: chapter heading.' }] },
        { title: 'Premium', note: 'Polished public-facing titles.', items: [{ name: topic + ' Reserve', reason: 'Elevated and concise.', extra: 'Best use: premium project.' }, { name: 'The ' + topic + ' Standard', reason: 'Authority and clarity.', extra: 'Best use: report title.' }, { name: topic + ' Editions', reason: 'Curated feel.', extra: 'Best use: publication series.' }] },
        { title: 'Concise', note: 'Short titles for clean layouts.', items: [{ name: topic, reason: 'Uses the input cleanly.', extra: 'Best use: concise title.' }, { name: topic + ' Notes', reason: 'Short and useful.', extra: 'Best use: article series.' }, { name: 'On ' + topic, reason: 'Classic essay shape.', extra: 'Best use: essay title.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('title-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: title ideas are creative suggestions only. Check existing works, brands, and series names before commercial publishing.');
      break;
    }
    case 'geo-tag-generator': {
      const place = (text.trim() || 'Austin TX').replace(/[^\w\s-]/g, '').trim();
      const format = optionValue('format', 'hashtags-');
      const parts = place.split(/\s+/).filter(Boolean);
      const joined = parts.join('');
      const tags = [
        joined,
        joined + 'Local',
        joined + 'Business',
        joined + 'Events',
        joined + 'Eats',
        joined + 'Makers',
        joined + 'Life',
        'Visit' + joined
      ];
      if (format === 'plain-text') result = tags.join('\n');
      else if (format === 'comma-separated') result = tags.map(tag => '#' + tag).join(', ');
      else result = tags.map(tag => '#' + tag).join('\n');
      break;
    }
    case 'pet-tag-generator': {
      const petName = compactSeed(text, 'Luna');
      const style = optionValue('pet-tag-style', 'safety');
      const layout = optionValue('pet-tag-layout', 'front-back');
      const microchip = optionValue('include-microchip-line', 'true') === 'true';
      const styleLine = style === 'cute' ? 'I AM LOVED' : style === 'minimal' ? 'CALL MY HUMAN' : 'IF FOUND PLEASE CALL';
      const front = layout === 'tiny-tag' ? `${petName}\nCALL: Optional user-fill phone` : `${petName}\n${styleLine}`;
      const backLines = ['Owner: Optional user-fill owner name', 'Phone: Optional user-fill phone number'];
      if (style !== 'minimal') backLines.push('Backup: Optional user-fill alternate phone');
      if (microchip) backLines.push('Microchip: Optional user-fill registry note');
      const sections = [
        { title: 'Front Tag Copy', body: front, note: `${titleCase(style)} style, ${titleCase(layout.replace(/-/g, ' '))}` },
        ...(layout !== 'front-only' ? [{ title: 'Back Tag Copy', body: backLines.join('\n'), note: 'User-fill contact placeholders only' }] : []),
        { title: 'Safety Layout', body: `${petName}\nCALL: Optional user-fill phone\nREWARD IF FOUND`, note: 'Readable lost-pet wording' },
        { title: 'Minimal Layout', body: `${petName}\nOptional user-fill phone`, note: 'For very small tags' },
        { title: 'Engraving Checklist', body: 'Keep each line short, confirm the phone number, choose a readable font, and avoid crowding the tag with long addresses.', note: 'Before ordering' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Pet Tag Copy Suite', sections, 'No official ID claim: this creates collar tag wording only, not registration, licensing, tracking, or microchip verification.');
      break;
    }
    case 'dj-tag-generator': {
      const name = compactSeed(text, 'Nova');
      const groups = [
        { title: 'Clean', note: 'Simple tags that stay usable across genres.', items: ['Made by ' + name, name + ' on the mix, Clean signal from ' + name] },
        { title: 'Hype', note: 'High-energy intro drops.', items: ['Turn it up, ' + name + ' is in the mix', name + ' just set the room in motion', 'This one starts with ' + name] },
        { title: 'Minimal', note: 'Short tags for tight audio edits.', items: [name, name + ' made it', 'By ' + name] },
        { title: 'Intro Drop', note: 'Opening phrases for mixes and sets.', items: ['You are listening to ' + name, 'Live from the decks, ' + name, 'Start the night with ' + name] },
        { title: 'Audio Brand', note: 'Repeatable phrases for producer identity.', items: ['The ' + name + ' sound', name + ' on the frequency', 'Signature signal: ' + name] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('dj-tag-style', 'clean'));
      result = visibleGroups.map(group => group.title + '\n' + (group.items || []).join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Original DJ tag drafts only. Do not imitate real artists, voices, labels, or protected catchphrases.');
      break;
    }
    case 'clan-tag-generator': {
      const style = optionValue('clan-tag-style', 'gaming');
      const length = Math.max(3, Math.min(5, Number(optionValue('clan-tag-length', '4')) || 4));
      const seed = (text.trim().replace(/[^a-z0-9]/gi, '').toUpperCase() || 'NOVA').slice(0, 5);
      const make = (raw: string) => (raw + seed + 'XXXXX').replace(/[^A-Z0-9]/g, '').slice(0, length);
      const groups = [
        { title: 'Competitive', note: 'Sharp scoreboard-friendly tags.', items: [{ name: make('APEX'), reason: 'Strong competitive tone.', extra: `${length} characters` }, { name: make('VOLT'), reason: 'Fast and energetic.', extra: `${length} characters` }, { name: make('GRIT'), reason: 'Tough but clean.', extra: `${length} characters` }] },
        { title: 'Casual', note: 'Friendly tags for groups and Discord squads.', items: [{ name: make('VIBE'), reason: 'Relaxed group feel.', extra: `${length} characters` }, { name: make('CREW'), reason: 'Simple friend-squad cue.', extra: `${length} characters` }, { name: make('MATE'), reason: 'Team-friendly.', extra: `${length} characters` }] },
        { title: 'Fantasy', note: 'Guild and RPG-ready short tags.', items: [{ name: make('RUNE'), reason: 'Fantasy signal.', extra: `${length} characters` }, { name: make('WYRM'), reason: 'Mythic and compact.', extra: `${length} characters` }, { name: make('VALE'), reason: 'Worldbuilding tone.', extra: `${length} characters` }] },
        { title: 'Gaming', note: 'General gaming clan tag ideas.', items: [{ name: make('NOVA'), reason: 'Clean gaming style.', extra: `${length} characters` }, { name: make('ECHO'), reason: 'Memorable and short.', extra: `${length} characters` }, { name: make('CTRL'), reason: 'Tech and play cue.', extra: `${length} characters` }] },
        { title: 'Aesthetic', note: 'Cool compact tags with softer tone.', items: [{ name: make('LUX'), reason: 'Minimal visual feel.', extra: `${length} characters` }, { name: make('ONYX'), reason: 'Dark aesthetic style.', extra: `${length} characters` }, { name: make('AURA'), reason: 'Soft and modern.', extra: `${length} characters` }] }];
      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Availability-friendly note: these are tag ideas only. Check your game, server, or platform before choosing one.');
      break;
    }
    case 'hang-tag-generator': {
      const product = compactSeed(text, 'Handmade Linen Apron');
      const style = optionValue('hang-tag-style', 'retail');
      const purpose = optionValue('hang-tag-purpose', 'apparel');
      const includePrice = optionValue('hang-tag-include-price', 'true') === 'true';
      const includeSku = optionValue('hang-tag-include-sku', 'true') === 'true';
      const sku = 'HT-' + toSafeHandle(product, 'item').toUpperCase().replace(/-/g, '').slice(0, 9);
      const price = includePrice ? '$24.00' : 'Price available at checkout';
      const styleIntro = style === 'luxury' ? 'Quiet detail, refined materials, and a polished finish.' : style === 'handmade' ? 'Made in small batches with practical details and visible care.' : style === 'minimalist' ? 'Essential information, clean spacing, and a simple product promise.' : 'Retail-ready details for quick shelf and checkout use.';
      const material = purpose === 'gift' ? 'Gift-ready packaging with reusable paper tag' : purpose === 'accessory' ? 'Durable accessory material with soft-touch finish' : purpose === 'home-goods' ? 'Natural fiber blend for everyday home use' : 'Cotton blend garment with easy-care finish';
      const retailData = `${includeSku ? 'SKU: ' + sku + '\n' : ''}Price: ${price}\nMaterial/details: ${material}\nCare: Keep dry, clean gently, and store flat when possible.`;
      const barcodeNote = includeSku ? `Barcode/QR note: ${sku} is an internal product code. Generate any real barcode or QR code with your inventory or checkout system before printing.` : 'Barcode/QR note: no barcode or QR code is generated by this tool.';
      const sections = [
        { title: 'Front Hang Tag', body: `${product}\n${styleIntro}\n${price}`, note: `${titleCase(style)} front` },
        { title: 'Back Hang Tag', body: `${retailData}\nCTA: Visit our shop for care details and matching pieces.`, note: 'Retail back' },
        { title: 'Brand Story', body: `${product} is designed for people who like useful objects with a clear purpose, simple care, and a finished look that still feels personal.`, note: 'Short story copy' },
        { title: 'Barcode / QR Guidance', body: barcodeNote, note: 'No fake scannable codes' },
        { title: 'Vendor Checklist', body: `Confirm price, SKU, material, care note, origin details, trim size, hole placement, and attachment method before production.`, note: 'Print handoff' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Retail Hang Tag Layout Suite', sections, 'This tool provides copy and layout guidance only, not barcode generation or legal label certification.');
      break;
    }
    case 'art-tag-generator': {
      const subject = compactSeed(text, 'portrait study');
      const tag = toSafeHandle(subject, 'art').replace(/-/g, '');
      const groups = [
        { title: 'Digital Art', note: 'Tags for digital paintings and concept work.', items: ['#digitalart', '#conceptart', '#' + tag, '#' + tag + 'art'] },
        { title: 'Painting', note: 'Traditional medium labels.', items: ['#painting', '#watercolor', '#oilpainting', '#' + tag] },
        { title: 'Sketch', note: 'Drawing, ink, and linework tags.', items: ['#sketchbook', '#lineart', '#drawingstudy', '#' + tag + 'sketch'] },
        { title: '3D', note: 'Render and modeling tags.', items: ['#3dart', '#3dmodeling', '#renderart', '#' + tag] },
        { title: 'Gallery', note: 'Plain labels for exhibition context.', items: ['Medium: Optional user-fill medium', 'Title: ' + subject, 'Series: Optional user-fill series', 'Year: Optional user-fill year'] },
        { title: 'Portfolio', note: 'Portfolio taxonomy labels.', items: ['portfolio/' + tag, 'medium/optional-user-fill', 'project/' + tag, 'status/final'] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('art-tag-style', 'digital-art'));
      result = visibleGroups.map(group => group.title + '\n' + (group.items || []).join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups, 'Use relevant tags only. Remove hashtag symbols for gallery labels, file names, or portfolio filters.');
      break;
    }
    case 'email-tag-generator': {
      const category = optionValue('email-tag-category', 'newsletters');
      const format = optionValue('email-tag-format', 'labels');
      const base = (text.trim() || 'name@example.com').toLowerCase();
      const local = base.includes('@') ? base.split('@')[0] : 'name';
      const domain = base.includes('@') ? base.split('@')[1] : 'example.com';
      const pools: Record<string, string[]> = {
        shopping: ['receipts', 'returns', 'coupons', 'orders'],
        newsletters: ['daily-read', 'weekly-roundup', 'industry-news', 'creator-updates'],
        projects: ['client-a', 'launch', 'research', 'design-review'],
        accounts: ['utilities', 'subscriptions', 'memberships', 'security-notices'],
        family: ['school', 'appointments', 'travel', 'household'],
        work: ['clients', 'team-updates', 'invoices-to-review', 'follow-ups']
      };
      const tags = pools[category] || pools.newsletters;
      const sections = [
        { title: 'Inbox Labels', body: tags.map(tag => category + '/' + tag).join('\n'), note: 'Folder or label names' },
        { title: 'Plus Address Tags', body: tags.map(tag => local + '+' + tag + '@' + domain).join('\n'), note: 'Provider support varies' },
        { title: 'Folder Groups', body: `${category}/active\n${category}/waiting\n${category}/archive\n${category}/reference`, note: 'Simple organization structure' },
        { title: 'Filter Notes', body: 'Create filters manually in your email provider. Do not use these for spam, impersonation, tracking, or unsolicited outreach.', note: 'No tracking or sending' }];
      const visible = format === 'plus-tags' ? [sections[1], sections[3]] : format === 'folders' ? [sections[2], sections[3]] : [sections[0], sections[3]];
      result = visible.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Email Tag Organization Suite', visible, 'Personal organization only. This tool does not send email, track recipients, or create spam systems.');
      break;
    }
    case 'tag-team-name-generator': {
      const seed = compactSeed(text, 'Double Spark');
      const groups = [
        { title: 'Wrestling', note: 'Generic duo names for ring-style characters.', items: [{ name: 'The ' + seed + ' Connection', reason: 'Classic duo cadence.', extra: 'Best use: wrestling duo.' }, { name: 'Twin Impact', reason: 'Punchy and chantable.', extra: 'Best use: ring team.' }, { name: 'The Final Bell', reason: 'Event-style energy.', extra: 'Best use: fictional team.' }] },
        { title: 'Sports', note: 'Names for pairs and doubles teams.', items: [{ name: seed + ' Rally', reason: 'Sports comeback cue.', extra: 'Best use: doubles team.' }, { name: 'The Power Pair', reason: 'Clear sports duo.', extra: 'Best use: tournament team.' }, { name: seed + ' United', reason: 'Team-first feel.', extra: 'Best use: sports pair.' }] },
        { title: 'Event', note: 'Names for competitions and parties.', items: [{ name: seed + ' Crew', reason: 'Flexible event naming.', extra: 'Best use: event team.' }, { name: 'The Double Feature', reason: 'Entertainment cue.', extra: 'Best use: show duo.' }, { name: seed + ' Booth', reason: 'Event activation feel.', extra: 'Best use: promo team.' }] },
        { title: 'Team', note: 'General two-person team names.', items: [{ name: seed + ' Partners', reason: 'Simple and clear.', extra: 'Best use: work duo.' }, { name: 'The Rally Point', reason: 'Positive team tone.', extra: 'Best use: partner team.' }, { name: seed + ' Alliance', reason: 'Cooperative feel.', extra: 'Best use: gaming or project duo.' }] },
        { title: 'Funny', note: 'Light names without franchise references.', items: [{ name: 'Team Maybe', reason: 'Dry and memorable.', extra: 'Best use: casual duo.' }, { name: 'Two Left Boots', reason: 'Playful and safe.', extra: 'Best use: event pair.' }, { name: seed + ' Snack Attack', reason: 'Friendly comic energy.', extra: 'Best use: fun team.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('tag-team-style', 'team'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Generic duo names only. No franchise, league, promotion, or real team affiliation is implied.');
      break;
    }
    case 'secret-santa-name-generator': {
      const mode = optionValue('output-mode', 'pair-list');
      const includeAlternates = optionValue('include-alternates', 'true') === 'true';
      const names = [...new Set((text || '')
        .split(/[\n,;]+/)
        .map((name) => name.trim())
        .filter(Boolean))];
      
      if (text && names.length < 2) {
        result = 'Please enter at least 2 distinct participant names to draw names.';
        resultHtml = renderSectionSuite('Secret Santa Draw Suite', [
          { title: 'Error', body: 'Please enter at least 2 distinct participant names to draw names.', note: 'Validation error' }
        ], 'At least two participants are required to perform a Secret Santa swap.');
        break;
      }
      
      const participants = names.length >= 2 ? names : ['Alex', 'Morgan', 'Priya', 'Sam'];
      
      // Secure cryptographic shuffle using Fisher-Yates and crypto.getRandomValues
      const secureShuffle = <T>(arr: T[]): T[] => {
        const copy = [...arr];
        const randomValues = new Uint32Array(copy.length);
        crypto.getRandomValues(randomValues);
        for (let i = copy.length - 1; i > 0; i--) {
          const j = randomValues[i] % (i + 1);
          const temp = copy[i];
          copy[i] = copy[j];
          copy[j] = temp;
        }
        return copy;
      };
      const shuffled = secureShuffle(participants);
      const pairs = shuffled.map((giver, index) => ({
        giver,
        receiver: shuffled[(index + 1) % shuffled.length]}));
      const alternates = pairs.map((pair, index) => pair.giver + ' backup: ' + shuffled[(index + 2) % shuffled.length]).join('\n');
      const sections = [
        { title: 'Pair List', body: pairs.map(pair => pair.giver + ' -> ' + pair.receiver).join('\n'), note: `${participants.length} participants` },
        { title: 'Giver Cards', body: pairs.map((pair, index) => 'Card ' + (index + 1) + ': ' + pair.giver + ' gives to ' + pair.receiver).join('\n'), note: 'Copy one card at a time if needed' },
        { title: 'Private Reveal List', body: pairs.map(pair => pair.giver + ': reveal privately -> ' + pair.receiver).join('\n'), note: 'Do not post publicly if the exchange is secret' },
        ...(includeAlternates ? [{ title: 'Alternate Backups', body: alternates, note: 'Use only if someone drops out' }] : []),
        { title: 'Exclusions Note', body: 'This simple draw does not enforce household, spouse, coworker, or repeated-recipient exclusions. Redraw or manually review if your group needs exclusions.', note: 'Privacy-safe limitation' }];
      const visible = mode === 'giver-cards' ? [sections[1], ...sections.slice(3)] : mode === 'private-reveal' ? [sections[2], ...sections.slice(3)] : [sections[0], ...sections.slice(3)];
      result = visible.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Secret Santa Draw Suite', visible, 'Privacy note: enter names or nicknames only. Do not paste addresses, payment details, private notes, or sensitive information.');
      break;
    }
    case 'anagram-of-name-generator': {
      const style = optionValue('anagram-style', 'full-name');
      const sourceLabel = text || 'Marina Stone';
      const source = sourceLabel.replace(/[^a-z]/gi, '').toLowerCase();
      const localTitle = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
      const rotateLetters = (letters: string, offset: number) =>
        letters.split('').map((_, index, arr) => arr[(index + offset) % arr.length]).join('');
      const splitPhrase = (letters: string, offset: number) => {
        const rotated = rotateLetters(letters, offset);
        const splitAt = Math.max(3, Math.min(rotated.length - 3, Math.ceil(rotated.length / 2)));
        return localTitle(rotated.slice(0, splitAt)) + ' ' + localTitle(rotated.slice(splitAt));
      };
      const letters = source.length >= 3 ? source : 'marinastone';
      const groups = [
        { title: 'Full Name', note: 'Uses every available letter in rotated phrase form.', items: Array.from({ length: 4 }, (_, i) => splitPhrase(letters, i + 1)) },
        { title: 'Partial', note: 'Readable shorter variants from the same letter pool.', items: Array.from({ length: 4 }, (_, i) => localTitle(rotateLetters(letters, i + 2).slice(0, Math.min(8, letters.length)))) },
        { title: 'Readable', note: 'Spaced forms optimized for easier reading.', items: Array.from({ length: 4 }, (_, i) => splitPhrase(letters, i + 4)) },
        { title: 'Initials And Short', note: 'Compact options for aliases or labels.', items: Array.from({ length: 4 }, (_, i) => rotateLetters(letters, i + 1).slice(0, 2).toUpperCase() + ' - ' + localTitle(rotateLetters(letters, i + 3).slice(0, 6))) }];
      const visibleGroups = filterGroupsByOption(groups, style);
      result = 'Anagrams using letters from "' + sourceLabel + '"\n\n' + visibleGroups.map(group => group.title + '\n' + [...new Set(group.items || [])].join('\n')).join('\n\n');
      resultHtml = renderHeadlineGroups(visibleGroups.map(group => ({ ...group, items: [...new Set(group.items || [])] })), 'Letter note: variants are built from your input letters. Partial variants may not use every letter.');
      break;
    }
    case 'cyberpunk-name-generator': {
      const seed = compactSeed(text, 'Sector Nine');
      const groups = [
        { title: 'Neon', note: 'Bright future-noir aliases.', items: [{ name: 'Neon Vale', reason: 'Compact city-night feel.', extra: 'Best use: street alias.' }, { name: 'Rin Signal', reason: 'Tech and personality cue.', extra: 'Best use: character.' }, { name: 'Kade Lumen', reason: 'Light and edge together.', extra: 'Best use: club contact.' }] },
        { title: 'Corporate', note: 'Clean names for executive or agency characters.', items: [{ name: 'Mira Glass', reason: 'Boardroom future tone.', extra: 'Best use: corporate agent.' }, { name: 'Soren Ledger', reason: 'Finance and control cue.', extra: 'Best use: executive.' }, { name: 'Vale Directive', reason: 'Institutional and cold.', extra: 'Best use: corporate codename.' }] },
        { title: 'Street', note: 'Ground-level aliases and crew names.', items: [{ name: 'Patch Alley', reason: 'Street-tech texture.', extra: 'Best use: fixer.' }, { name: 'Juno Rail', reason: 'Transit and city cue.', extra: 'Best use: runner.' }, { name: 'Vex Nightmarket', reason: 'Underground economy feel.', extra: 'Best use: broker.' }] },
        { title: 'Hacker', note: 'Original hacker handles without real platform claims.', items: [{ name: 'Cipher Root', reason: 'Classic access vocabulary.', extra: 'Best use: hacker.' }, { name: 'Zero Packet', reason: 'Network texture.', extra: 'Best use: net specialist.' }, { name: 'Ghostline Mira', reason: 'Stealthy but readable.', extra: 'Best use: digital alias.' }] },
        { title: 'Dystopian', note: 'Names for controlled future settings.', items: [{ name: 'Unit ' + seed, reason: 'Surveillance-state label.', extra: 'Best use: dystopian character.' }, { name: 'Gray District Vale', reason: 'City-zone mood.', extra: 'Best use: resistance story.' }, { name: 'Citizen Kade Nine', reason: 'Numbered identity cue.', extra: 'Best use: future society.' }] },
        { title: 'City Name', note: 'Fictional cyberpunk city names.', items: [{ name: seed + ' Grid', reason: 'Urban technology cue.', extra: 'Best use: city.' }, { name: 'Neon ' + seed, reason: 'Clear cyberpunk city feel.', extra: 'Best use: setting name.' }, { name: seed + ' Arcology', reason: 'Dense future-city wording.', extra: 'Best use: megacity district.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('cyberpunk-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: cyberpunk names are original worldbuilding suggestions only. No franchise terms or live handle availability claims are included.');
      break;
    }
    case 'goth-name-generator': {
      const seed = compactSeed(text, 'Raven');
      const core = seed.split(/\s+/)[0] || 'Raven';
      const groups = [
        { title: 'Elegant Goth', note: 'Refined gothic-inspired names.', items: [{ name: core + ' Blackwell', reason: 'Classic dark elegance.', extra: 'Best use: character.' }, { name: 'Seraphine ' + core, reason: 'Graceful and dramatic.', extra: 'Best use: elegant alias.' }, { name: core + ' Ashcroft', reason: 'Old-world surname feel.', extra: 'Best use: fiction.' }] },
        { title: 'Dark Romantic', note: 'Soft, dramatic names for romance and poetry.', items: [{ name: 'Evelina ' + core, reason: 'Romantic and lyrical.', extra: 'Best use: dark romance.' }, { name: core + ' Vesper', reason: 'Evening mood cue.', extra: 'Best use: poetic persona.' }, { name: 'Lucien ' + core, reason: 'Classic gothic cadence.', extra: 'Best use: romantic character.' }] },
        { title: 'Poetic', note: 'Aesthetic names for writing projects.', items: [{ name: core + ' Nocturne', reason: 'Music and night imagery.', extra: 'Best use: poetry project.' }, { name: 'Iris Mourning', reason: 'Floral and reflective.', extra: 'Best use: literary alias.' }, { name: core + ' Moonwell', reason: 'Soft mystical image.', extra: 'Best use: aesthetic name.' }] },
        { title: 'Vintage', note: 'Older-feeling gothic names.', items: [{ name: 'Theodore ' + core, reason: 'Victorian cadence.', extra: 'Best use: period character.' }, { name: 'Cordelia Vale', reason: 'Vintage and elegant.', extra: 'Best use: gothic fiction.' }, { name: core + ' Whitlock', reason: 'Antique surname tone.', extra: 'Best use: historical setting.' }] },
        { title: 'Stage Name', note: 'Safe aesthetic stage or creator aliases.', items: [{ name: core + ' Velvet', reason: 'Memorable stage texture.', extra: 'Best use: performer alias.' }, { name: 'Night ' + core, reason: 'Short and visual.', extra: 'Best use: creator name.' }, { name: core + ' Static', reason: 'Modern gothic edge.', extra: 'Best use: music project.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('goth-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: goth names are aesthetic creative suggestions only. Check artist, brand, and handle conflicts before public use.');
      break;
    }
    case 'project-name-generator-keywords': {
      const style = optionValue('project-style', 'professional');
      const format = optionValue('name-format', 'two-word');
      const words = (text || 'customer insights')
        .split(/[^a-z0-9]+/i)
        .map((word) => word.trim())
        .filter(Boolean)
        .slice(0, 4);
      const keywords = words.length ? words : ['customer', 'insights'];
      const title = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      const banks: Record<string, string[]> = {
        professional: ['Initiative', 'Program', 'Plan', 'Roadmap', 'Launch'],
        tech: ['Stack', 'Flow', 'Grid', 'Signal', 'Hub'],
        creative: ['Studio', 'Spark', 'Canvas', 'Workshop', 'Forge'],
        research: ['Study', 'Lab', 'Index', 'Pilot', 'Review'],
        'internal-codename': ['Project', 'Atlas', 'Beacon', 'Harbor', 'Northstar']
      };
      
      const pool = banks[style] || banks.professional;
      const namesList: string[] = [];
      for (let i = 0; i < 6; i++) {
        const keyword = title(keywords[i % keywords.length]);
        const companion = pool[i % pool.length];
        let name = '';
        if (format === 'compound') name = keyword + companion;
        else if (format === 'prefix-keyword') name = companion + ' ' + keyword;
        else if (format === 'codename') name = 'Project ' + keyword + ' ' + companion;
        else name = keyword + ' ' + companion;
        namesList.push(name);
      }

      const groups = [
        {
          title: `Project Names (${titleCase(style.replace(/-/g, ' '))})`,
          note: `Format: ${format.replace(/-/g, ' ')}.`,
          items: namesList.map((name, idx) => ({
            name,
            reason: `Keywords: ${keywords.join(', ')}.`,
            extra: `Draft Option ${idx + 1}`
          }))
        }
      ];

      result = groups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(groups, 'Check internal project registries, trademarks, and domain availability before public project launches.');
      break;
    }
    case 'scifi-name-generator': {
      const seed = compactSeed(text, 'Orion');
      const groups = [
        { title: 'Starship', note: 'Original starship and vessel names.', items: [{ name: 'SS ' + seed + ' Meridian', reason: 'Exploration-ready.', extra: 'Best use: starship.' }, { name: 'The ' + seed + ' Lantern', reason: 'Hopeful spacefaring image.', extra: 'Best use: research vessel.' }, { name: seed + ' Vector', reason: 'Clean technical tone.', extra: 'Best use: scout ship.' }] },
        { title: 'Planet', note: 'Planet and system names.', items: [{ name: seed + ' Prime', reason: 'Classic planet naming shape.', extra: 'Best use: planet.' }, { name: 'Caldus ' + seed, reason: 'Believable system cadence.', extra: 'Best use: star system.' }, { name: seed + '-7', reason: 'Catalog-friendly.', extra: 'Best use: colony world.' }] },
        { title: 'Character', note: 'Science fiction character names.', items: [{ name: 'Commander Elara ' + seed, reason: 'Rank and surname structure.', extra: 'Best use: officer.' }, { name: 'Ren ' + seed, reason: 'Short future tone.', extra: 'Best use: pilot.' }, { name: 'Dr. Mira ' + seed, reason: 'Research character cue.', extra: 'Best use: scientist.' }] },
        { title: 'Faction', note: 'Civilization, crew, and alliance names.', items: [{ name: 'The ' + seed + ' Accord', reason: 'Diplomatic group feel.', extra: 'Best use: faction.' }, { name: seed + ' Frontier Union', reason: 'Settler coalition cue.', extra: 'Best use: alliance.' }, { name: 'The ' + seed + ' Choir', reason: 'Alien cultural texture.', extra: 'Best use: species faction.' }] },
        { title: 'Project Codename', note: 'Research mission and operation names.', items: [{ name: 'Project ' + seed, reason: 'Clean codename.', extra: 'Best use: mission.' }, { name: seed + ' Protocol', reason: 'High-stakes tech cue.', extra: 'Best use: research project.' }, { name: 'Operation ' + seed + ' Gate', reason: 'Mission structure.', extra: 'Best use: exploration program.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('scifi-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Safe originality note: sci-fi names are original worldbuilding suggestions only. No franchise terms, trademark checks, or live availability claims are included.');
      break;
    }
    case 'last-name-and-first-name-generator': {
      const style = optionValue('name-style', 'neutral');
      const format = optionValue('name-format', 'first-last');
      const seedLast = text.trim().replace(/[^a-z\s'-]/gi, '').trim();
      const firstNames: Record<string, string[]> = {
        feminine: ['Avery', 'Clara', 'Maya', 'Elena', 'Nora', 'Iris', 'Sofia', 'Lena'],
        masculine: ['Miles', 'Ethan', 'Julian', 'Caleb', 'Theo', 'Jonah', 'Rowan', 'Felix'],
        neutral: ['Alex', 'Riley', 'Jordan', 'Morgan', 'Casey', 'Taylor', 'Quinn', 'Emery']
      };
      const middleNames = ['James', 'Rose', 'Lee', 'Grace', 'Ellis', 'June', 'Reid', 'Mae'];
      const lastNames = seedLast ? [seedLast] : ['Bennett', 'Hayes', 'Morgan', 'Ellis', 'Reed', 'Sullivan', 'Parker', 'Brooks'];
      const pool = firstNames[style] || firstNames.neutral;
      const sampleNames = Array.from({ length: 6 }, (_, index) => {
        const first = pool[index % pool.length];
        const middle = middleNames[index % middleNames.length];
        const last = lastNames[index % lastNames.length];
        return { first, middle, last };
      });
      const sections = [
        { title: 'First Last', body: sampleNames.map(n => n.first + ' ' + n.last).join('\n'), note: `${titleCase(style)} display names` },
        { title: 'Last, First', body: sampleNames.map(n => n.last + ', ' + n.first).join('\n'), note: 'Roster or sortable list format' },
        { title: 'First Middle Last', body: sampleNames.map(n => n.first + ' ' + n.middle + ' ' + n.last).join('\n'), note: 'Formal full-name format' },
        { title: 'Initials', body: sampleNames.map(n => n.first.charAt(0) + '. ' + n.last.charAt(0) + '. (' + n.first + ' ' + n.last + ')').join('\n'), note: 'Compact label format' },
        { title: 'Directory Style', body: sampleNames.map(n => n.last + ', ' + n.first + ' ' + n.middle.charAt(0) + '. | Display: ' + n.first + ' ' + n.last).join('\n'), note: 'Directory or sample data style' }];
      const visible = format === 'all' ? sections : sections.filter(section => toSafeHandle(section.title, 'section') === format);
      result = visible.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Full Name Format Suite', visible, 'Use these as character, sample, guest-list, or formatting ideas only. Do not use generated names to impersonate real people.');
      break;
    }
    case 'baby-name-generator-with-last-name': {
      const lastName = text.trim().replace(/[^a-z\s'-]/gi, '').trim() || 'Parker';
      const style = optionValue('baby-name-style', 'modern');
      const gender = optionValue('gender', 'neutral');
      const names: Record<string, Record<string, string[]>> = {
        modern: {
          girl: ['Ava', 'Mila', 'Harper', 'Nova', 'Isla'],
          boy: ['Leo', 'Ezra', 'Milo', 'Kai', 'Asher'],
          neutral: ['Rowan', 'Sage', 'River', 'Quinn', 'Avery']
        },
        classic: {
          girl: ['Charlotte', 'Eleanor', 'Alice', 'Clara', 'Rose'],
          boy: ['Henry', 'Arthur', 'Thomas', 'Edward', 'James'],
          neutral: ['Francis', 'Robin', 'Marion', 'Morgan', 'Ellis']
        },
        short: {
          girl: ['Lia', 'Mae', 'Ivy', 'Ada', 'Noa'],
          boy: ['Max', 'Ian', 'Eli', 'Nico', 'Owen'],
          neutral: ['Ash', 'Lee', 'Ren', 'Kit', 'Ari']
        },
        elegant: {
          girl: ['Serena', 'Vivienne', 'Elodie', 'Amara', 'Juliet'],
          boy: ['Sebastian', 'August', 'Julian', 'Lucian', 'Benedict'],
          neutral: ['Emerson', 'Auden', 'Bellamy', 'Linden', 'Camille']
        },
        unique: {
          girl: ['Zella', 'Maris', 'Elowen', 'Veda', 'Solene'],
          boy: ['Caspian', 'Orion', 'Soren', 'Evren', 'Callum'],
          neutral: ['Indigo', 'Arden', 'Hollis', 'Lior', 'Wren']
        }
      };
      const makeItems = (styleKey: string) => {
        const set = (names[styleKey] || names.modern)[gender] || names[styleKey]?.neutral || names.modern.neutral;
        return set.slice(0, 5).map(first => {
          const syllables = Math.max(1, first.replace(/[^aeiouy]/gi, '').length);
          const transition = first.slice(-1).toLowerCase() === lastName.charAt(0).toLowerCase() ? 'soft repeated sound' : 'clear transition';
          return { name: first + ' ' + lastName, reason: `${syllables} first-name vowel beat(s); ${transition}.`, extra: 'Say aloud with any middle name before shortlisting.' };
        });
      };
      const groups = [
        { title: 'Modern', note: 'Current, easy-to-say names.', items: makeItems('modern') },
        { title: 'Classic', note: 'Timeless names with familiar rhythm.', items: makeItems('classic') },
        { title: 'Short', note: 'Compact names that balance longer surnames.', items: makeItems('short') },
        { title: 'Elegant', note: 'Graceful names with a formal feel.', items: makeItems('elegant') },
        { title: 'Unique', note: 'Distinctive but readable options.', items: makeItems('unique') }];
      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Name flow is subjective. Check initials, pronunciation, family preferences, and cultural context before choosing.');
      break;
    }
    case 'nickname-generator-based-on-name': {
      const rawName = text.trim().replace(/[^a-z\s'-]/gi, '').trim() || 'Alex';
      const first = rawName.split(/\s+/)[0];
      const clean = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
      const base = clean.length <= 3 ? clean : clean.slice(0, Math.max(3, Math.ceil(clean.length / 2)));
      const initial = clean.charAt(0).toUpperCase();
      const style = optionValue('nickname-style', 'cute');
      const nicknames: Record<string, string[]> = {
        cute: [base + 'y', base + 'ie', 'Little ' + clean, clean + ' Bean', initial + '-Bee'],
        cool: [initial + ' Ace', base + 'x', clean + ' Nova', 'Captain ' + initial, base + ' Prime'],
        professional: [clean, initial + '.', base, clean + ' ' + initial + '.', initial + clean.slice(1, 3)],
        funny: [base + 'ster', clean + 'o', initial + '-Pop', base + 'aroo', 'Team ' + clean],
        short: [base, initial, clean.slice(0, 4), initial + clean.slice(1, 2), clean.slice(0, 3)]
      };
      const groups = Object.entries(nicknames).map(([key, values]) => ({
        title: titleCase(key),
        note: key === 'professional' ? 'Workplace-friendly forms.' : key === 'funny' ? 'Light and friendly only.' : `${titleCase(key)} nickname options.`,
        items: values.map(name => ({ name, reason: 'Built from ' + clean + ' or its initial.', extra: key === 'professional' ? 'Best use: professional context.' : 'Best use: friendly context.' }))
      }));
      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Friendly nickname suggestions only. Avoid using any nickname for someone publicly unless they are comfortable with it.');
      break;
    }
    case 'phonetic-spelling-of-name-generator': {
      const format = optionValue('format', 'simple-english');
      const detail = optionValue('detail-level', 'short');
      const raw = text.trim().replace(/[^a-z\s'-]/gi, '').trim() || 'Alexis Morgan';
      const parts = raw.split(/\s+/).filter(Boolean);
      
      // Advanced syllable division algorithm following VCV, VCCV, and VCCCV rules
      const splitSyllables = (word: string): string => {
        const vowels = /[aeiouy]/i;
        if (word.length <= 3) return word;
        let res = '';
        let i = 0;
        while (i < word.length) {
          const char = word[i];
          res += char;
          const isVowel = vowels.test(char);
          if (isVowel && i < word.length - 1) {
            let nextVowelIdx = -1;
            for (let j = i + 1; j < word.length; j++) {
              if (vowels.test(word[j])) {
                nextVowelIdx = j;
                break;
              }
            }
            if (nextVowelIdx !== -1) {
              const consonantsBetween = nextVowelIdx - i - 1;
              if (consonantsBetween === 1) {
                res += '-';
              } else if (consonantsBetween === 2) {
                res += word[i + 1] + '-';
                i += 1;
              } else if (consonantsBetween >= 3) {
                res += word[i + 1] + '-';
                i += 1;
              }
            }
          }
          i++;
        }
        return res.replace(/-+/g, '-').replace(/-$/, '').replace(/^-/, '');
      };

      const syllables = parts.map(part => splitSyllables(part));
      const simple = syllables.join(' ').toUpperCase();
      const ipaStyle = syllables.join(' ').toLowerCase().replace(/-/g, '.');

      const natoDict: Record<string, string> = {
        A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf',
        H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November',
        O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform',
        V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu'
      };
      const natoSpelling = [...raw.toUpperCase()].map(c => natoDict[c] || c).filter(c => c.trim()).join(' ');

      const sections = [
        { title: 'Simple English', body: simple, note: 'Plain-English pronunciation helper' },
        { title: 'Syllable Guide', body: syllables.map((part, index) => 'Part ' + (index + 1) + ': ' + part).join('\n'), note: `${syllables.length} part(s)` },
        { title: 'NATO Spelling', body: natoSpelling, note: 'International radio phonetic alphabet' },
        { title: 'Stress Note', body: 'Suggested stress: emphasize the clearest first syllable unless the name owner says otherwise.\nPractice: ' + syllables.join(' ... ') + ' -> ' + raw, note: 'Confirm with the person whenever possible' },
        { title: 'IPA-Style Text', body: '/' + ipaStyle + '/\nNote: IPA-style helper only, not official transcription.', note: 'Not verified IPA' }];
      
      const visible = format === 'all' ? sections : sections.filter(section => toSafeHandle(section.title, 'section') === format);
      result = visible.map(section => section.title + '\n' + section.body).join('\n\n') + (detail === 'detailed' ? '\n\nTip: Say each hyphenated part slowly first, then smooth the full name together.' : '');
      resultHtml = renderSectionSuite('Phonetic Spelling Guide', visible, 'Text pronunciation guidance only. No audio is generated, and formal linguistic accuracy is not guaranteed.');
      break;
    }
    case 'ipa-generator': {
      const format = optionValue('ipa-output-format', 'all');
      const accent = optionValue('ipa-accent-style', 'neutral-learning');
      const detail = optionValue('ipa-detail-level', 'detailed');
      const source = text.trim().replace(/[^a-z\s'-]/gi, '').trim() || 'Amara Studio';
      const cleanWords = source.split(/\s+/).filter(Boolean);
      const syllableParts = cleanWords.map((word) =>
        word.replace(/([aeiouy]+)(?=[bcdfghjklmnpqrstvwxyz])/gi, '$1-').replace(/-$/g, '')
      );
      const syllableLine = syllableParts.join(' ');
      const plainEnglish = syllableParts.join(' ').toUpperCase();
      const accentNote = accent === 'general-american'
        ? 'Draft bias: General American English.'
        : accent === 'received-pronunciation'
          ? 'Draft bias: Received Pronunciation / British learning style.'
          : 'Draft bias: neutral English-learning approximation.';
      const vowelMap: Record<string, string> = {
        a: 'É‘', e: 'É›', i: 'Éª', o: 'oÊŠ', u: 'u', y: 'i',
        ai: 'eÉª', ay: 'eÉª', ee: 'i', ea: 'i', oo: 'u', ou: 'aÊŠ', ow: 'aÊŠ', er: 'É™r', ar: 'É‘r', or: 'É”r'
      };
      const consonantMap: Record<string, string> = {
        ch: 'tÊƒ', sh: 'Êƒ', th: 'Î¸', ph: 'f', ng: 'Å‹', j: 'dÊ’', r: 'r', x: 'ks', c: 'k', q: 'k'
      };
      const roughIpaWord = (word: string) => {
        let value = word.toLowerCase().replace(/[^a-z'-]/g, '');
        Object.entries(consonantMap).forEach(([from, to]) => { value = value.replace(new RegExp(from, 'g'), to); });
        Object.entries(vowelMap)
          .sort((a, b) => b[0].length - a[0].length)
          .forEach(([from, to]) => { value = value.replace(new RegExp(from, 'g'), to); });
        return value.replace(/-/g, '.').replace(/'/g, '');
      };
      const ipaWords = cleanWords.map(roughIpaWord);
      const ipaDraft = '/Ëˆ' + ipaWords.join(' ') + '/';
      const primaryStress = syllableParts[0]?.split('-')[0] || cleanWords[0] || source;
      const sections = [
        {
          title: 'IPA-Style Guide Card',
          body: `Input: ${source}\nIPA-style draft: ${ipaDraft}\nPlain-English guide: ${plainEnglish}\n${accentNote}\nUse note: include both IPA-style and plain-English lines when readers may not know IPA.`,
          note: 'Premium pronunciation card'
        },
        {
          title: 'Plain-English Pronunciation',
          body: `${source}: ${plainEnglish}\nSpeaking cue: say each hyphenated part slowly, then smooth the full word or name together.${detail === 'detailed' ? '\nReader note: this is useful for names, brand names, scripts, rosters, bios, and learning pronunciation.' : ''}`,
          note: 'Readable helper text'
        },
        {
          title: 'Syllable Breakdown And Stress',
          body: `Syllables: ${syllableLine}\nPrimary stress marker: Ëˆ before the strongest syllable in the IPA-style draft.\nSuggested stress note: start by stressing "${primaryStress.toUpperCase()}" unless a speaker, dictionary, or language expert confirms a different stress pattern.`,
          note: 'Stress marker note'
        },
        {
          title: 'Common IPA Symbol Guide',
          body: `Ëˆ = primary stress before a syllable\nÉ‘ = open "ah" vowel\nÉ› = "eh" vowel\nÉª = short "ih" vowel\ni = "ee" vowel\nÉ™ = relaxed schwa vowel\nÊƒ = "sh" sound\ntÊƒ = "ch" sound\nÎ¸ = voiceless "th" as in thin\nÅ‹ = "ng" sound`,
          note: 'Quick symbol reference'
        },
        {
          title: 'Word And Name Example Output',
          body: `Name example: Amara -> /É™ËˆmÉ‘rÉ™/ -> uh-MAH-ruh\nWord example: Studio -> /ËˆstuËdioÊŠ/ -> STOO-dee-oh\nBrand-name example: ${source} -> ${ipaDraft} -> ${plainEnglish}\nReview note: verify important names with the person, a dictionary, or a trained linguist before publishing.`,
          note: 'Practical examples'
        },
        {
          title: 'Educational Disclaimer',
          body: 'Educational approximation only. This is an IPA-style pronunciation draft, not a certified linguistic transcription, dictionary entry, trained-linguist review, or audio pronunciation. It should not replace a trained linguist, a reliable pronunciation dictionary, or confirmation from a name owner.',
          note: 'Accuracy boundary'
        }];
      const sectionMap: Record<string, string[]> = {
        'guide-card': ['IPA-Style Guide Card'],
        'plain-english': ['Plain-English Pronunciation'],
        'syllables-stress': ['Syllable Breakdown And Stress'],
        'symbol-guide': ['Common IPA Symbol Guide'],
        examples: ['Word And Name Example Output', 'Educational Disclaimer']
      };
      const wantedTitles = sectionMap[format] || [];
      const visible = format === 'all' ? sections : sections.filter(section => wantedTitles.includes(section.title));
      result = visible.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('IPA-Style Pronunciation Guide Cards', visible, 'Written pronunciation guidance only. No audio is generated or implied; confirm high-stakes or public transcriptions with a reliable source.');
      break;
    }
    case 'name-combination-generator': {
      const mode = optionValue('combination-mode', 'all');
      const style = optionValue('blend-style', 'seamless-portmanteau');
      const names = (text || 'Avery, Jordan')
        .split(/[\n,;&+]+/)
        .map((name) => name.trim().replace(/[^a-z0-9'-]/gi, ''))
        .filter(Boolean);
      const list = names.length >= 2 ? names : ['Avery', 'Jordan'];
      const cap = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      const blend = (a: string, b: string) => {
        const first = a.slice(0, Math.max(2, Math.ceil(a.length / 2)));
        const second = b.slice(Math.max(1, Math.floor(b.length / 2)));
        return cap(first + second);
      };
      const makeItems = (label: string) => Array.from({ length: Math.min(5, list.length + 3) }, (_, index) => {
        const a = list[index % list.length];
        const b = list[(index + 1) % list.length];
        const name = style === 'paired' ? cap(a) + ' & ' + cap(b) : style === 'first-half-last-half' ? cap(a.slice(0, Math.ceil(a.length / 2)) + b.slice(Math.floor(b.length / 2))) : style === 'short-blend' ? cap((a.slice(0, 2) + b.slice(0, 3)).slice(0, 6)) : blend(a, b);
        return { name, reason: 'Combines ' + cap(a) + ' + ' + cap(b) + '.', extra: 'Best use: ' + label + '.' };
      });
      const groups = [
        { title: 'Couple', note: 'Soft paired or blended names.', items: makeItems('couple name') },
        { title: 'Baby', note: 'Name-blend inspiration only.', items: makeItems('baby name brainstorming') },
        { title: 'Brand', note: 'Brandable blends from input names.', items: makeItems('brand concept') },
        { title: 'Username', note: 'Shorter handle-style blends.', items: makeItems('username idea') }];
      const visibleGroups = filterGroupsByOption(groups, mode);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Combination ideas only. Check name meaning, comfort, trademarks, and handle availability before public use.');
      break;
    }
    case 'performer-names-generator': {
      const seed = compactSeed(text, 'Nova');
      const core = seed.split(/\s+/)[0] || 'Nova';
      const groups = [
        { title: 'Stage', note: 'Flexible stage and creator names.', items: [{ name: core + ' Sterling', reason: 'Polished stage rhythm.', extra: 'Best use: performer.' }, { name: 'Ari ' + core, reason: 'Short and announceable.', extra: 'Best use: host.' }, { name: core + ' Vale', reason: 'Simple and memorable.', extra: 'Best use: artist.' }] },
        { title: 'Creator', note: 'Creator-brand friendly names.', items: [{ name: core + ' Studio', reason: 'Flexible public brand.', extra: 'Best use: creator.' }, { name: 'Hello ' + core, reason: 'Warm social handle shape.', extra: 'Best use: channel.' }, { name: core + ' Daily', reason: 'Content-series feel.', extra: 'Best use: social creator.' }] },
        { title: 'Artist', note: 'Music and visual artist names.', items: [{ name: core + ' Rhodes', reason: 'Musical surname tone.', extra: 'Best use: musician.' }, { name: core + ' Blue', reason: 'Stylized but simple.', extra: 'Best use: artist alias.' }, { name: 'The ' + core + ' Method', reason: 'Project identity.', extra: 'Best use: art project.' }] },
        { title: 'Elegant', note: 'Refined public-facing aliases.', items: [{ name: core + ' Laurent', reason: 'Elegant cadence.', extra: 'Best use: formal stage.' }, { name: 'Vivian ' + core, reason: 'Graceful and readable.', extra: 'Best use: actor.' }, { name: core + ' Winslow', reason: 'Classic polished tone.', extra: 'Best use: performer.' }] },
        { title: 'Bold', note: 'High-energy performer names.', items: [{ name: 'Vega ' + core, reason: 'Strong stage sound.', extra: 'Best use: bold act.' }, { name: core + ' Blaze', reason: 'Energetic but safe.', extra: 'Best use: live performer.' }, { name: 'Jett ' + core, reason: 'Fast and punchy.', extra: 'Best use: music act.' }] },
        { title: 'Minimal', note: 'Clean, short aliases.', items: [{ name: core, reason: 'Single-name identity.', extra: 'Best use: minimal alias.' }, { name: core + ' One', reason: 'Simple variant.', extra: 'Best use: creator.' }, { name: 'M. ' + core, reason: 'Initial-led style.', extra: 'Best use: formal credit.' }] },
        { title: 'Memorable', note: 'Distinct but generic aliases.', items: [{ name: core + ' Mercury', reason: 'Bright and memorable.', extra: 'Best use: stage persona.' }, { name: 'Echo ' + core, reason: 'Audio-friendly cue.', extra: 'Best use: musician.' }, { name: core + ' Motion', reason: 'Performance energy.', extra: 'Best use: dancer or variety.' }] }];
      const visibleGroups = filterGroupsByOption(groups, optionValue('performer-name-style', 'all'));
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Original performer name suggestions only. Do not imitate real celebrities, performers, brands, or protected personas.');
      break;
    }
    case 'disc-jockey-names-generator': {
      const style = optionValue('dj-name-style', 'all');
      const format = optionValue('name-format', 'two-word');
      const seed = compactSeed(text, 'Nova');
      const initials = seed.split(/\s+/).map(part => part.charAt(0).toUpperCase()).join('').slice(0, 3) || 'DJ';
      const make = (a: string, b: string) => format === 'one-word' ? a + b : format === 'initials' ? initials + ' ' + b : format === 'dj-prefix' ? 'DJ ' + seed.split(/\s+/)[0] + ' ' + b : a + ' ' + b;
      const groups = [
        { title: 'Club', note: 'Dancefloor-friendly aliases.', items: [{ name: make('Tempo', 'Nova'), reason: 'Rhythmic and easy to announce.', extra: 'Best use: club DJ.' }, { name: make('Velvet', 'Deck'), reason: 'Smooth nightlife tone.', extra: 'Best use: lounge set.' }, { name: make('Metro', 'Pulse'), reason: 'Urban club cue.', extra: 'Best use: resident DJ.' }] },
        { title: 'Radio', note: 'Broadcast and show-friendly names.', items: [{ name: make('Wave', 'Signal'), reason: 'Radio vocabulary.', extra: 'Best use: radio show.' }, { name: make('Echo', 'Dial'), reason: 'Audio identity.', extra: 'Best use: mix series.' }, { name: make(seed.split(/\s+/)[0], 'FM'), reason: 'Station-style shape.', extra: 'Best use: radio alias.' }] },
        { title: 'EDM', note: 'Electronic producer aliases.', items: [{ name: make('Circuit', 'Phase'), reason: 'Electronic texture.', extra: 'Best use: EDM producer.' }, { name: make('Voltage', 'Loop'), reason: 'High-energy sound.', extra: 'Best use: festival set.' }, { name: make('Neon', 'Shift'), reason: 'Bright dance cue.', extra: 'Best use: electronic act.' }] },
        { title: 'Hip-Hop', note: 'Clean DJ aliases for hip-hop sets.', items: [{ name: make('Break', 'Pilot'), reason: 'Beat and movement cue.', extra: 'Best use: hip-hop DJ.' }, { name: make('Scratch', 'Nova'), reason: 'Turntable reference.', extra: 'Best use: open-format DJ.' }, { name: make('Cipher', 'Deck'), reason: 'Music-community feel.', extra: 'Best use: mixtape DJ.' }] },
        { title: 'Minimal', note: 'Short and restrained names.', items: [{ name: make('Mono', 'Line'), reason: 'Minimal sound.', extra: 'Best use: minimal DJ.' }, { name: make('Sub', 'Point'), reason: 'Clean technical tone.', extra: 'Best use: underground set.' }, { name: make('Blank', 'Phase'), reason: 'Simple and abstract.', extra: 'Best use: producer alias.' }] },
        { title: 'Brandable', note: 'Flexible public-facing DJ names.', items: [{ name: make(seed.split(/\s+/)[0], 'Groove'), reason: 'Input-aware and memorable.', extra: 'Best use: brandable alias.' }, { name: make(seed.split(/\s+/)[0], 'Sound'), reason: 'Clear music identity.', extra: 'Best use: performer brand.' }, { name: make(seed.split(/\s+/)[0], 'Sessions'), reason: 'Series-ready.', extra: 'Best use: mix project.' }] }];
      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Original DJ alias ideas only. Check artist names, labels, domains, and handles before public use.');
      break;
    }
    case 'name-pronunciation-generator': {
      const format = optionValue('pronunciation-format', 'all');
      const detail = optionValue('detail-level', 'short');
      const name = text.trim().replace(/[^a-z\s'-]/gi, '').trim() || 'Amara Chen';
      const parts = name.split(/\s+/).filter(Boolean);
      const syllables = parts.map((part) =>
        part.replace(/([aeiouy]+)(?=[bcdfghjklmnpqrstvwxyz])/gi, '$1-').replace(/-$/g, '')
      );
      const phonetic = syllables.join(' ').toUpperCase();
      const tips = [
        'Say each hyphenated part separately first, then smooth the name together.',
        'Keep the stress on the clearest capitalized syllable when you share this guide.',
        'Ask the name owner to confirm the final pronunciation before publishing it.'];
      const similar = syllables.map(part => part.replace(/-/g, ' like ')).join(', ');
      const sections = [
        { title: 'Simple Phonetic', body: name + '\n' + phonetic, note: 'Plain text guide' },
        { title: 'Syllable Breakdown', body: syllables.map((part, index) => 'Part ' + (index + 1) + ': ' + part).join('\n'), note: `${syllables.length} syllable group(s)` },
        { title: 'Professional Note', body: 'Pronunciation note: ' + name + ' (' + phonetic + ')\n' + (detail === 'detailed' ? tips[0] : 'Text pronunciation guide only.'), note: 'For email signatures or rosters' },
        { title: 'Similar Sound', body: 'Similar-sound hint: ' + similar + '\nPlease confirm the final pronunciation with the name owner.', note: 'Approximation only' }];
      const visible = format === 'all' ? sections : sections.filter(section => toSafeHandle(section.title, 'section') === format);
      result = visible.map(section => section.title + '\n' + section.body).join('\n\n') + (detail === 'detailed' ? '\n\nTip: ' + tips[1] : '');
      resultHtml = renderSectionSuite('Name Pronunciation Guide Cards', visible, 'No fake audio claim: this creates written pronunciation guidance only. Confirm important names with the person who owns the name.');
      break;
    }
    case 'fantasy-language-generator': {
      const theme = compactSeed(text, 'river kingdom');
      const sound = optionValue('aesthetic-sound', 'flowing-melodic');
      const useCase = optionValue('language-use', 'naming-system');
      const banks: Record<string, { sounds: string; syllables: string[]; endings: string[]; phrase: string }> = {
        'harsh-guttural': { sounds: 'Hard k, g, r, and th sounds; short stressed words.', syllables: ['kar', 'gro', 'thak', 'dur', 'vorn'], endings: ['ak', 'gor', 'thun'], phrase: 'Kar durun = safe road' },
        'flowing-melodic': { sounds: 'Open vowels, l, m, n, and soft r sounds; longer flowing words.', syllables: ['lae', 'mira', 'salo', 'nua', 'vel'], endings: ['ia', 'ara', 'iel'], phrase: 'Lae mirana = bright water' },
        'clicking-insectoid': { sounds: 'Click-like syllable breaks shown with apostrophes; compact clustered words.', syllables: ['tik', 'ka', 'zri', 'qet', 'nuk'], endings: ['ik', 'qa', 'zun'], phrase: "Tik'qa zri = many paths" },
        'ancient-formal': { sounds: 'Formal vowels, repeated titles, and stone-tablet cadence.', syllables: ['ar', 'dom', 'vala', 'sen', 'kor'], endings: ['um', 'ael', 'or'], phrase: 'Ar domum vala = oath of home' }};
      const bank = banks[sound] || banks['flowing-melodic'];
      const makeWord = (i: number) => titleCase(bank.syllables[i % bank.syllables.length] + bank.endings[i % bank.endings.length]);
      const sections = [
        { title: 'Sound Rules', body: `Language concept for ${theme}\n${bank.sounds}\nUse case: ${titleCase(useCase.replace(/-/g, ' '))}`, note: 'Fictional language sketch' },
        { title: 'Sample Words', body: Array.from({ length: 8 }, (_, i) => makeWord(i) + ' = Optional user-fill meaning ' + (i + 1)).join('\n'), note: 'Invented vocabulary' },
        { title: 'Naming Patterns', body: `People: ${makeWord(1)} ${makeWord(2)}\nPlaces: ${makeWord(3)}-${makeWord(4)}\nClans or houses: House ${makeWord(5)}\nArtifacts: ${makeWord(6)} Stone`, note: 'Worldbuilding names' },
        { title: 'Short Phrase Examples', body: bank.phrase + '\n' + makeWord(2) + ' ' + makeWord(7).toLowerCase() + ' = Optional user-fill phrase\n' + makeWord(4) + ' ' + makeWord(1).toLowerCase() + ' = Optional user-fill greeting', note: 'Phrase starters' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Fantasy Language Concept Suite', sections, 'Fictional conlang starter only. No real-language translation, cultural authenticity, or linguistic accuracy is claimed.');
      break;
    }
    case 'color-palette-generator-from-name': {
      const name = text.trim() || 'Aurora Lane';
      const harmony = optionValue('harmony-type', 'analogous');
      const mood = optionValue('palette-mood', 'balanced');
      const count = Math.max(4, Math.min(6, Number.parseInt(optionValue('palette-count', '5'), 10) || 5));
      const hash = Array.from(name + harmony + mood).reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 3), 0);
      const baseHue = hash % 360;
      const sat = mood === 'soft' ? 42 : mood === 'bold' ? 72 : 56;
      const light = mood === 'soft' ? 72 : mood === 'bold' ? 42 : 54;
      const offsets: Record<string, number[]> = {
        analogous: [0, 22, 44, -22, -44, 66],
        complementary: [0, 180, 28, 208, -24, 156],
        monochromatic: [0, 0, 0, 0, 0, 0],
        pastel: [0, 38, 76, 114, 152, 190],
        brand: [0, 32, 168, 212, 12, 300]
      };
      const roles = ['Primary', 'Secondary', 'Accent', 'Background', 'Text / Deep', 'Highlight'];
      const palette = (offsets[harmony] || offsets.analogous).slice(0, count).map((offset, index) => {
        const h = (baseHue + offset + 360) % 360;
        const adjustedLight = harmony === 'monochromatic' ? Math.max(18, Math.min(88, light + (index - 2) * 12)) : index === 3 ? 90 : index === 4 ? 18 : light;
        const rgb = hslToRgb(h, harmony === 'pastel' ? 38 : sat, harmony === 'pastel' ? Math.max(adjustedLight, 76) : adjustedLight);
        return { label: roles[index] || `Color ${index + 1}`, hex: rgbToHex(rgb), rgb, hsl: `HSL ${h}, ${harmony === 'pastel' ? 38 : sat}%, ${harmony === 'pastel' ? Math.max(adjustedLight, 76) : adjustedLight}%` };
      });
      const cssVars = palette.map(color => `--${toSafeHandle(color.label, 'color')}: ${color.hex};`).join('\n');
      const json = '{\n' + palette.map(color => `  "${color.label}": "${color.hex}"`).join(',\n') + '\n}';
      const note = `${titleCase(mood)} ${titleCase(harmony)} palette seeded from "${name}". Suggested use: primary for main actions, accent for highlights, background for panels, and deep color for readable text after contrast checking.`;
      const sections = [
        { title: 'CSS Variables', body: cssVars, note: 'Copy into a design system or stylesheet.' },
        { title: 'JSON Palette', body: json, note: 'Useful for tokens and docs.' },
        { title: 'Usage Suggestions', body: note + '\nRun final foreground/background pairs through a contrast checker before launch.', note: 'Practical guidance' }];
      result = 'Palette from name: ' + name + '\nMood: ' + mood + '\nHarmony: ' + harmony + '\n\n' + palette.map(color => color.label + ': ' + color.hex).join('\n') + '\n\nCopyable palette: ' + palette.map(color => color.hex).join(' ');
      resultHtml = renderColorPalette(name + ' Palette', note, palette, 'Same input and options generate the same colors. Contrast guidance is advisory until checked against final text/background pairings.') + renderSectionSuite('Palette Export And Usage', sections, 'Copy individual colors, the full palette, CSS variables, or JSON tokens.');
      break;
    }
    case 'mountain-name-generator': {
      const style = optionValue('mountain-style', 'fantasy');
      const feature = optionValue('feature-type', 'peak');
      const seed = text.trim().replace(/[^a-z\s'-]/gi, '').trim();
      const banks: Record<string, string[]> = {
        fantasy: ['Eldervale', 'Stormcrown', 'Runebreak', 'Dragonmere', 'High Ardent'],
        realistic: ['Granite', 'Pinecrest', 'Redstone', 'Silver Ridge', 'Northfall'],
        ancient: ['Kharadon', 'Old Veyr', 'Mourn Keld', 'Asteron', 'Thalen'],
        snowy: ['Frostspire', 'Whitecap', 'Glacierhorn', 'Snowmantle', 'Iceveil'],
        volcanic: ['Ashen', 'Embercrag', 'Blackglass', 'Cinderpeak', 'Smokefall']
      };
      const endings: Record<string, string[]> = {
        peak: ['Peak', 'Mount', 'Spire', 'Summit'],
        range: ['Range', 'Mountains', 'Highlands', 'Ridge'],
        pass: ['Pass', 'Ridge', 'Gap', 'Heights']
      };
      const suffixes = endings[feature] || endings.peak;
      const groups = Object.keys(banks).map(key => ({
        title: titleCase(key),
        note: key === 'volcanic' ? 'Smoke, ash, and black stone region notes.' : key === 'snowy' ? 'Cold, high-altitude region notes.' : `${titleCase(key)} mountain naming style.`,
        items: banks[key].slice(0, 4).map((root, index) => {
          const name = (seed ? seed + ' ' : '') + root + ' ' + suffixes[index % suffixes.length];
          return { name, reason: 'Region note: ' + (key === 'realistic' ? 'visible terrain and local geography.' : key === 'ancient' ? 'old road, ruins, or ancestral border.' : key === 'snowy' ? 'glacier routes and white ridges.' : key === 'volcanic' ? 'ash fields and warm stone.' : 'mythic landmark or quest region.'), extra: 'Feature: ' + titleCase(feature) };
        })
      }));
      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Fictional geography names only. Verify real-world place-name conflicts if using names in a public project.');
      break;
    }
    case 'forest-name-generator': {
      const style = optionValue('forest-style', 'enchanted');
      const type = optionValue('forest-type', 'forest');
      const seed = text.trim().replace(/[^a-z\s'-]/gi, '').trim();
      const styles: Record<string, string[]> = {
        enchanted: ['Glimmerleaf', 'Moonwillow', 'Starlace', 'Feybloom', 'Silverbough'],
        dark: ['Blackroot', 'Dreadpine', 'Hollowshade', 'Grimwood', 'Nightfen'],
        ancient: ['Elderbranch', 'Old Barrow', 'Thousand Ring', 'Deep Yew', 'Firstwood'],
        peaceful: ['Quiet Fern', 'Greenhaven', 'Softmoss', 'Dawnbrook', 'Larkshade'],
        fantasy: ['Mythwood', 'Runegrove', 'Wyldermere', 'Thornvale', 'Evershade']
      };
      const typeLabels: Record<string, string> = {
        forest: 'Forest',
        woods: 'Woods',
        grove: 'Grove',
        wilds: 'Wilds'
      };
      const label = typeLabels[type] || 'Forest';
      const groups = Object.keys(styles).map(key => ({
        title: titleCase(key),
        note: key === 'dark' ? 'Shadowed woods with safe, atmospheric lore.' : key === 'peaceful' ? 'Gentle woodland names for calm regions.' : `${titleCase(key)} woodland style.`,
        items: styles[key].slice(0, 4).map(root => {
          const name = (seed ? seed + ' ' : '') + root + ' ' + label;
          const lore = key === 'ancient' ? 'Lore note: old paths, elder trees, and forgotten boundary stones.' : key === 'dark' ? 'Lore note: low light, thick roots, and cautious travelers.' : key === 'peaceful' ? 'Lore note: clear streams, moss beds, and safe camps.' : key === 'fantasy' ? 'Lore note: map-worthy landmark for quests and settlements.' : 'Lore note: strange lights, old songs, and hidden groves.';
          return { name, reason: lore, extra: 'Type: ' + label };
        })
      }));
      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.reason).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Fictional forest names only. Use lore notes as editable worldbuilding prompts.');
      break;
    }
    case 'team-name-generator-using-keywords': {
      const vibe = optionValue('team-vibe', 'fun');
      const placement = optionValue('keyword-placement', 'include-keyword');
      const keywords = (text || 'Falcon')
        .split(/[^a-z0-9]+/i)
        .map((word) => word.trim())
        .filter(Boolean);
      const keyword = (keywords[0] || 'Falcon').charAt(0).toUpperCase() + (keywords[0] || 'Falcon').slice(1).toLowerCase();
      const initial = keyword.charAt(0);
      const banks: Record<string, string[]> = {
        competitive: ['Runners', 'Racers', 'Titans', 'Chargers', 'Champions'],
        fun: ['Squad', 'Club', 'Crew', 'Bunch', 'Makers'],
        professional: ['Collective', 'Group', 'Alliance', 'Crew', 'Unit'],
        local: ['Neighbors', 'County Crew', 'Street Team', 'Community', 'Circle'],
        gaming: ['Guild', 'Raiders', 'Party', 'Legends', 'Strike Team']};
      const makeName = (word: string) => {
        const alliterative = ['Force', 'Flyers', 'Frontline', 'Fusion', 'Foundry', 'Fellows'].filter(item => item.startsWith(initial));
        if (placement === 'alliteration') return keyword + ' ' + (alliterative[0] || word);
        if (placement === 'mascot-style') return 'The ' + keyword + ' ' + word;
        return keyword + ' ' + word;
      };
      const groups = Object.entries(banks).map(([key, words]) => ({
        title: titleCase(key),
        note: `${titleCase(key)} names using keyword: ${keyword}.`,
        items: words.slice(0, 4).map(word => ({ name: makeName(word), reason: 'Keeps the input keyword visible.', extra: 'Best use: ' + key.replace(/-/g, ' ') + ' team.' }))
      }));
      const visibleGroups = filterGroupsByOption(groups, vibe);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name + ' - ' + item.extra).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Team name ideas only. Check school, league, platform, or event naming rules before use.');
      break;
    }
    case 'ancient-greek-inspired-name-generator': {
      const style = optionValue('greek-name-style', 'classical');
      const seed = compactSeed(text, '');
      const banks: Record<string, string[]> = {
        classical: ['Damon Lysandros', 'Helene Thaleia', 'Nikon Dorios', 'Callista Menon', 'Ione Theron', 'Theron Kallias'],
        mythic: ['Asterion Vale', 'Melia Sunward', 'Orionis Thalos', 'Lyra Phaedon', 'Selene Kallias', 'Nymera Helion'],
        scholarly: ['Theon Grammatikos', 'Eudora Philon', 'Dorian of the Archive', 'Mira Sophene', 'Kleon the Reader', 'Sophon Melia'],
        'city-state': ['Alexis of Myra', 'Nerea of Ilyra', 'Demos of Asteron', 'Thalia of Nerikos', 'Phaon of Kydra', 'Delion of the Agora']
      };
      
      const groups = Object.keys(banks).map(key => ({
        title: titleCase(key),
        note: `${titleCase(key)} ancient Greek-inspired fictional style.`,
        items: banks[key].map(name => {
          const formattedName = seed ? name + ' ' + seed : name;
          const originInfo: Record<string, string> = {
            classical: 'Traditional Greek naming structure combining first name and ancestral group.',
            mythic: 'Inspirational name hinting at astronomical, stellar, or natural fantasy themes.',
            scholarly: 'Philosophical or scholarly tone, ideal for academic or historical characters.',
            'city-state': 'Linked to regional fictional geography or historic cities.'
          };
          return {
            name: formattedName,
            reason: originInfo[key] || 'Ancient-inspired historical fictional name.',
            extra: `Style: ${titleCase(key)}`
          };
        })
      }));

      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Respectful fictional inspiration only. These are not historically authoritative names, translations, or identity claims.');
      break;
    }
    case 'roman-inspired-character-name-generator': {
      const style = optionValue('roman-name-style', 'citizen');
      const seed = compactSeed(text, '');
      const banks: Record<string, string[]> = {
        citizen: ['Marcus Virellus', 'Claudia Marena', 'Titus Aurelian', 'Livia Corvina', 'Gaius Severan', 'Julia Sabina'],
        patrician: ['Aurelia Valeriana', 'Lucius Cassian Varro', 'Octavia Marcellina', 'Quintus Drusus Vale', 'Cornelia Sabina', 'Valerius Corvus'],
        legionary: ['Flavius Ironcrest', 'Tiberius Redshield', 'Cassia Fortis', 'Varro Stonehand', 'Marcellus of the Gate', 'Decimus Secundus'],
        'poet-scholar': ['Ovidian Lector', 'Sabina Quill', 'Felix Archivus', 'Marina Veritas', 'Julius Scriptor', 'Lucretia Sapiens']
      };

      const groups = Object.keys(banks).map(key => ({
        title: titleCase(key === 'poet-scholar' ? 'Poet / Scholar' : key),
        note: `${titleCase(key === 'poet-scholar' ? 'Poet / Scholar' : key)} Roman-inspired style.`,
        items: banks[key].map(name => {
          const formattedName = seed ? name + ' ' + seed : name;
          const originInfo: Record<string, string> = {
            citizen: 'Common Roman citizen style suitable for main characters, merchants, or historical cast.',
            patrician: 'Noble Roman family names combining class markers and high-status titles.',
            legionary: 'Martial or protective naming hints, great for guards, centurions, or commanders.',
            'poet-scholar': 'Academic or poetic Roman persona, ideal for historians, writers, or advisors.'
          };
          return {
            name: formattedName,
            reason: originInfo[key] || 'Roman-inspired historical fictional name.',
            extra: `Style: ${titleCase(key === 'poet-scholar' ? 'Poet / Scholar' : key)}`
          };
        })
      }));

      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Respectful fictional inspiration only. These are not historically authoritative names, translations, or identity claims.');
      break;
    }
    case 'ancient-egyptian-inspired-name-generator': {
      const style = optionValue('egyptian-name-style', 'river-court');
      const seed = compactSeed(text, '');
      const banks: Record<string, string[]> = {
        'river-court': ['Nehara of the River Court', 'Kamenet Reedborn', 'Satra of the Blue Hall', 'Menka Lotusward', 'Tiaresh Dawnwater', 'Merit Reedbloom'],
        'scribe-scholar': ['Djehuti Scribehand', 'Merit of the Ink House', 'Paser Reedquill', 'Nefra Tabletkeeper', 'Hori of the Archive', 'Amenemhat Lector'],
        'desert-guardian': ['Seten Sandwatch', 'Meryra Dune Guard', 'Khepri Stonepath', 'Ankhu of the West Gate', 'Tamit Sunveil', 'Nekht Shield'],
        'mythic-royal': ['Neseret Goldcrown', 'Amunet Starhall', 'Khaem Sunthrone', 'Isetra Bright Lotus', 'Ramesu Falconcourt', 'Nefertari Sunborn']
      };

      const groups = Object.keys(banks).map(key => ({
        title: titleCase(key.replace(/-/g, ' ')),
        note: `${titleCase(key.replace(/-/g, ' '))} Egyptian-inspired fictional style.`,
        items: banks[key].map(name => {
          const formattedName = seed ? name + ' ' + seed : name;
          const originInfo: Record<string, string> = {
            'river-court': 'Linked to river life, court customs, and Nile valley scenery.',
            'scribe-scholar': 'Scholarly or historical theme, perfect for records keepers or wise advisors.',
            'desert-guardian': 'Sturdy, protective name for military, scouts, border patrols, or guardians.',
            'mythic-royal': 'Grand regal tone referencing gold, thrones, stars, and symbols of authority.'
          };
          return {
            name: formattedName,
            reason: originInfo[key] || 'Egyptian-inspired historical fictional name.',
            extra: `Style: ${titleCase(key.replace(/-/g, ' '))}`
          };
        })
      }));

      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Respectful fictional inspiration only. These are not historically authoritative names, translations, or identity claims.');
      break;
    }
    case 'iupac-name-generator': {
      const compoundType = optionValue('compound-type', 'organic');
      const detail = optionValue('detail-level', 'explained');
      const inputValue = text.trim() || 'C2H6O';
      const patterns: Record<string, { pattern: string; examples: string[]; explanation: string }> = {
        organic: {
          pattern: 'parent chain + locants + functional group suffix/prefix',
          examples: ['ethanol style: two-carbon alcohol', 'propanoic acid style: three-carbon acid', 'but-2-ene style: four-carbon alkene'],
          explanation: 'Organic names usually identify the carbon skeleton, unsaturation, substituents, and the highest-priority functional group.'
        },
        inorganic: {
          pattern: 'element or ion name + oxidation state when needed + counter-ion',
          examples: ['iron(III) oxide style', 'copper(II) chloride style', 'dinitrogen pentoxide style'],
          explanation: 'Inorganic names often describe ions, oxidation states, or stoichiometric prefixes for molecular compounds.'
        },
        salt: {
          pattern: 'cation name + anion name',
          examples: ['sodium chloride style', 'calcium carbonate style', 'ammonium nitrate style'],
          explanation: 'Salt names generally place the positive ion first and the negative ion second.'
        },
        practice: {
          pattern: 'identify compound class -> choose root -> add suffix or ion ending',
          examples: ['alkane practice name', 'carboxylic acid practice name', 'binary ionic practice name'],
          explanation: 'Practice naming starts by identifying the compound family before choosing the naming pattern.'
        }
      };
      const data = patterns[compoundType] || patterns.organic;
      result = 'Educational chemistry-style naming idea\n\nInput: ' + inputValue + '\nCompound type: ' + compoundType + '\nNaming pattern: ' + data.pattern + '\nSuggested study name: ' + inputValue + ' naming practice\nExamples:\n- ' + data.examples.join('\n- ') + (detail === 'explained' ? '\n\nExplanation: ' + data.explanation + '\nCheck the final name against official IUPAC or course references.' : '');
      break;
    }
    case 'victorian-name-generator': {
      const style = optionValue('victorian-style', 'middle-class');
      const format = optionValue('name-format', 'full-name');
      const seed = compactSeed(text, '');

      const firstNames: Record<string, string[]> = {
        'upper-class': ['Beatrice', 'Cecil', 'Arabella', 'Percival', 'Evangeline', 'Montague'],
        'middle-class': ['Clara', 'Arthur', 'Edith', 'Walter', 'Florence', 'Henry'],
        literary: ['Dorothea', 'Basil', 'Marian', 'Silas', 'Rosamund', 'Tobias'],
        gothic: ['Lenora', 'Edmund', 'Isolde', 'Ambrose', 'Viola', 'Lucian']
      };

      const lastNames: Record<string, string[]> = {
        'upper-class': ['Ashbourne', 'Fairfax', 'Blackwood', 'Harrington', 'Winthrop'],
        'middle-class': ['Whitmore', 'Bennett', 'Hawkins', 'Ellis', 'Pritchard'],
        literary: ['Marchmont', 'Rivers', 'Vale', 'Trelawney', 'Wickham'],
        gothic: ['Graves', 'Ravenscroft', 'Mourne', 'Holloway', 'Winterbourne']
      };

      const titles = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Lady'];

      const groups = Object.keys(firstNames).map(key => {
        const firstPool = firstNames[key];
        const lastPool = lastNames[key];
        
        return {
          title: titleCase(key.replace(/-/g, ' ')),
          note: `${titleCase(key.replace(/-/g, ' '))} Victorian style. Format: ${titleCase(format)}.`,
          items: firstPool.map((first, index) => {
            const last = seed ? titleCase(seed) : lastPool[index % lastPool.length];
            let name = '';
            if (format === 'with-title') {
              name = titles[index % titles.length] + ' ' + first + ' ' + last;
            } else if (format === 'initials') {
              name = first.charAt(0) + '. ' + last.charAt(0) + '. ' + last;
            } else {
              name = first + ' ' + last;
            }

            const reasons: Record<string, string> = {
              'upper-class': 'Gentry or aristocratic naming vibe, perfect for high-society characters.',
              'middle-class': 'Authentic industrial-era common name suited for merchants or townspeople.',
              literary: 'Romantic or dramatic Victorian tone, ideal for complex protagonists.',
              gothic: 'Darker, atmospheric name inspired by Victorian gothic horror and ghost stories.'
            };

            return {
              name,
              reason: reasons[key] || 'Victorian period-inspired fictional name.',
              extra: `Style: ${titleCase(key.replace(/-/g, ' '))}`
            };
          })
        };
      });

      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Fictional creative period name ideas. Check historical records to confirm local authenticity if writing period-accurate stories.');
      break;
    }
    case 'racehorse-name-generator': {
      const style = optionValue('racehorse-style', 'elegant');
      const seed = compactSeed(text, '');
      const banks: Record<string, string[]> = {
        elegant: ['Silk Meridian', 'Velvet Promise', 'Silver Court', 'Royal Lantern', 'Pearl Tempo', 'Golden Sovereign'],
        fast: ['Rapid Horizon', 'Thunder Mile', 'Fleet Signal', 'Comet Sprint', 'Velocity Lane', 'Aero Dash'],
        lucky: ['Lucky Laurel', 'Golden Chance', 'Fortune Step', 'Clover Run', 'Bright Wager', 'Double Jackpot'],
        classic: ['Morning Regent', 'Blue Saddle', 'Noble Circuit', 'County Fair', 'Heritage Lane', 'Grand Sovereign'],
        funny: ['Snack Break', 'Hoof Hearted', 'Nap Then Sprint', 'Carrot Invoice', 'Maybe Faster', 'Hay Burner']
      };

      const groups = Object.keys(banks).map(key => ({
        title: titleCase(key),
        note: `${titleCase(key)} style racehorse name ideas.`,
        items: banks[key].map(name => {
          const formattedName = seed ? name + ' ' + seed : name;
          const originInfo: Record<string, string> = {
            elegant: 'Polished name hinting at high status, lineage, or graceful presentation.',
            fast: 'Dynamic, movement-oriented name suggestion emphasizing quickness.',
            lucky: 'Chance or fortune-based naming conventions common in racing culture.',
            classic: 'Traditional, heritage-sounding name reminiscent of old-school champions.',
            funny: 'Lighthearted wordplay or humorous phrase for a memorable horse identity.'
          };
          return {
            name: formattedName,
            reason: originInfo[key] || 'Racehorse-style naming idea.',
            extra: `Style: ${titleCase(key)}`
          };
        })
      }));

      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'Generated names are original suggestions only. Check availability and avoid names that could be confused with real racehorses, stables, or racing brands.');
      break;
    }
    case 'emo-name-generator': {
      const style = optionValue('emo-style', 'poetic');
      const seed = compactSeed(text, '');
      const banks: Record<string, string[]> = {
        poetic: ['Violet Static', 'Paper Moon', 'Rain Archive', 'Silver Letter', 'Velvet Echo', 'Pencil Sketch'],
        'dark-aesthetic': ['Midnight Velvet', 'Black Iris', 'Shadow Radio', 'Nocturne Lane', 'Raven Glass', 'Onyx Petal'],
        'soft-emo': ['Soft Static', 'Sunday Ash', 'Cloud Diary', 'Blue Cardigan', 'Quiet Chorus', 'Soft Echo'],
        'music-inspired': ['Basement Anthem', 'Feedback Heart', 'Cassette Bloom', 'Minor Chord', 'Encore Rain', 'Vinyl Hiss']
      };

      const groups = Object.keys(banks).map(key => ({
        title: titleCase(key.replace(/-/g, ' ')),
        note: `${titleCase(key.replace(/-/g, ' '))} emo aesthetic naming ideas.`,
        items: banks[key].map(name => {
          const formattedName = seed ? name + ' ' + seed : name;
          const originInfo: Record<string, string> = {
            poetic: 'Soft, literary-focused combination with a nostalgic vibe.',
            'dark-aesthetic': 'Deeper tones referencing night, shadows, obsidian, or vintage glass.',
            'soft-emo': 'Cozy, quiet imagery centered on cards, rain, diaries, and calm static.',
            'music-inspired': 'Indie-rock or cassette-era vocabulary matching instruments, chords, and tape hiss.'
          };
          return {
            name: formattedName,
            reason: originInfo[key] || 'Emo-style creative name.',
            extra: `Style: ${titleCase(key.replace(/-/g, ' '))}`
          };
        })
      }));

      const visibleGroups = filterGroupsByOption(groups, style);
      result = visibleGroups.map(group => group.title + '\n' + group.items.map(item => item.name).join('\n')).join('\n\n');
      resultHtml = renderGroupedIdeas(visibleGroups, 'This generator is for safe aesthetic and creative naming only. It avoids unsafe, self-harm, and harmful stereotype language.');
      break;
    }
    case 'poster-generator': {
      const eventType = optionValue('event-type', 'event');
      const tone = optionValue('poster-tone', 'bold');
      const headlineStyle = optionValue('headline-style', 'direct');
      const format = optionValue('poster-format', 'print');
      const ctaValue = optionValue('call-to-action', 'join');
      const subject = text.trim() || 'Spring Makers Market, Saturday 10 AM, downtown hall';
      const toneWords: Record<string, string> = {
        bold: 'high-contrast type, strong spacing, confident wording',
        friendly: 'warm colors, welcoming language, clear details',
        premium: 'elegant layout, restrained copy, polished visual hierarchy',
        minimal: 'short copy, clean grid, generous white space'
      };
      const ctas: Record<string, string> = {
        join: 'Join us',
        register: 'Register today',
        shop: 'Shop now',
        learn: 'Learn more'
      };
      const modeDetails: Record<string, string> = {
        event: 'Date, time, location, host, and one reason to attend.',
        sale: 'Offer, deadline, featured product, and where to shop.',
        announcement: 'Main news, who it affects, and the next action.',
        workshop: 'Topic, skill outcome, instructor, date, and registration path.',
        community: 'Purpose, location, participation details, and community benefit.'
      };
      const headline = headlineStyle === 'question'
        ? 'Ready for ' + subject + '?'
        : headlineStyle === 'benefit'
          ? 'Make time for ' + subject
          : subject;
      const subhead = eventType === 'sale' ? `A focused offer poster for ${subject} with the deal and deadline easy to spot.` : eventType === 'workshop' ? `A learning-focused poster that makes the topic, outcome, and registration path clear.` : eventType === 'community' ? `A welcoming community poster that explains who it is for and how to take part.` : `A clear invitation built around ${subject}.`;
      const sections = [
        { title: 'Poster Copy', body: `Headline: ${headline}\nSubheadline: ${subhead}\nCTA: ${ctas[ctaValue] || ctas.join}`, note: `${titleCase(eventType)} mode` },
        { title: 'Event / Details Block', body: `${modeDetails[eventType] || modeDetails.event}\nSubject: ${subject}\nDetail order: date first, place second, action third.\nKeep the final line reserved for ${ctas[ctaValue] || ctas.join}.`, note: 'Information hierarchy' },
        { title: 'Layout Concept', body: `Format: ${titleCase(format)}\nTop: oversized headline with strong contrast\nMiddle: subheadline plus one visual cue\nLower third: details block with date, place, and action\nFooter: organizer, website, or social handle`, note: 'Designer handoff' },
        { title: 'Visual Direction', body: `${toneWords[tone] || toneWords.bold}.\nSuggested color approach: one dominant background, one high-contrast text color, and one accent for the CTA.\nStyle cue: use a single strong image or graphic motif tied to ${subject}.`, note: `${titleCase(tone)} style` },
        { title: 'Production Checklist', body: `Verify dates, venue, pricing, accessibility details, sponsor logos, image rights, and final print dimensions before publishing.`, note: 'Safe launch checks' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Poster Layout Concept Suite', sections, 'Copy full poster copy or individual layout blocks. This does not export final artwork.');
      break;
    }
    case 'flyer-generator': {
      const mode = optionValue('flyer-mode', 'business');
      const tone = optionValue('flyer-tone', 'clear');
      const offerType = optionValue('flyer-offer', 'discount');
      const subject = text.trim() || 'Grand opening discount for a neighborhood bakery';
      const offers: Record<string, string> = {
        business: 'Featured offer: introduce the main service, product, or discount.',
        event: 'Event details: include date, time, location, and what guests can expect.',
        'real-estate': 'Property angle: lead with location, standout feature, viewing path, and contact method.',
        'local-service': 'Service angle: problem, service area, fast benefit, and booking path.',
        community: 'Community note: explain who it helps, where to go, and how to participate.'
      };
      const toneLine: Record<string, string> = {
        clear: 'simple, direct, easy to scan',
        energetic: 'upbeat, action-forward, lively',
        local: 'neighborly, warm, community-focused',
        premium: 'polished, concise, benefit-led'
      };
      const cta = offerType === 'booking' ? 'Book your spot today' : offerType === 'information' ? 'Learn the details today' : offerType === 'announcement' ? 'See what is new' : 'Claim the offer today';
      const sections = [
        { title: 'Flyer Headline Set', body: `${subject}\nDo not miss ${subject}\nA quick local guide to ${subject}`, note: `${titleCase(mode)} mode` },
        { title: 'Offer / Details', body: `${offers[mode] || offers.business}\nOffer type: ${titleCase(offerType)}\nPrimary message: ${subject}\nTone: ${toneLine[tone] || toneLine.clear}`, note: 'Promotional core' },
        { title: 'Benefit Bullets', body: `- Easy to understand at a glance\n- Clear next step for readers\n- Focused on one offer or announcement\n- Works as a handout, counter flyer, or local notice`, note: 'Flyer body' },
        { title: 'CTA And Contact Footer', body: `CTA: ${cta}\nContact footer: ${toSafeHandle(subject, 'local-offer')}.com | +1 555 014 2087 | @${toSafeHandle(subject, 'localoffer').replace(/-/g, '')}`, note: 'Bottom strip' },
        { title: 'Layout Map', body: `Top third: headline and one-line hook\nMiddle: offer details and benefit bullets\nBottom: CTA, contact line, location or social handle\nKeep one action per flyer so the handout stays scannable.`, note: 'Distinct from poster layout' }];
      result = sections.map(section => section.title + '\n' + section.body).join('\n\n');
      resultHtml = renderSectionSuite('Flyer Copy And Layout Suite', sections, 'Flyers prioritize offers, details, and contact paths. Posters prioritize visual impact.');
      break;
    }
    case 'fantasy-map-generator': {
      const generated = generateFantasyMap(
        optionValue('map-scope', 'region'),
        optionValue('terrain-bias', 'balanced'),
        optionValue('settlement-density', 'moderate'),
        optionValue('map-tone', 'classic'),
        optionValue('include-legend', 'true') === 'true',
        optionValue('detail-level', 'campaign'),
        text
      );
      result = generated.blueprint;
      resultHtml = generated.html;
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

