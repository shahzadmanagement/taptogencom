import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const configUrl = new URL('../.vercel/output/config.json', import.meta.url);

if (!existsSync(configUrl)) {
  console.warn('[patch-vercel-redirects] .vercel/output/config.json not found; skipping.');
  process.exit(0);
}

const config = JSON.parse(readFileSync(configUrl, 'utf8'));
const redirectRoutes = [
  ['/tools/tiktok-username-generator/', '/tools/username-generator/'],
  ['/tools/roblox-username-generator/', '/tools/username-generator/'],
  ['/tools/spongebob-text-generator/', '/tools/fancy-text-generator/'],
  ['/tools/undertale-text-generator/', '/tools/fancy-text-generator/'],
  ['/tools/pokemon-text-generator/', '/tools/fancy-text-generator/'],
  ['/tools/minecraft-text-generator/', '/tools/fancy-text-generator/'],
  ['/tools/star-wars-text-generator/', '/tools/fancy-text-generator/'],
  ['/tools/dark-souls-text-generator/', '/tools/fancy-text-generator/'],
  ['/tools/roblox-name-generator/', '/tools/gaming-name-generator/'],
  ['/tools/fortnite-name-generator/', '/tools/gaming-name-generator/'],
  ['/tools/minecraft-name-generator/', '/tools/gaming-name-generator/'],
  ['/tools/valorant-name-generator/', '/tools/gaming-name-generator/'],
  ['/tools/league-of-legends-name-generator/', '/tools/gaming-name-generator/'],
  ['/tools/harry-potter-name-generator/', '/tools/wizard-name-generator/'],
  ['/tools/pokemon-name-generator/', '/tools/fantasy-name-generator/'],
  ['/tools/sith-name-generator/', '/tools/fantasy-name-generator/'],
  ['/tools/star-wars-name-generator/', '/tools/fantasy-name-generator/'],
  ['/tools/facebook-hashtag-generator/', '/tools/hashtag-generator/'],
  ['/tools/instagram-hashtag-generator/', '/tools/hashtag-generator/'],
  ['/tools/tiktok-hashtag-generator/', '/tools/hashtag-generator/'],
].map(([from, to]) => ({
  src: `^${from.replaceAll('/', '\\/')}?$`,
  headers: {
    Location: to,
  },
  status: 301,
}));

const routes = Array.isArray(config.routes) ? config.routes : [];
const redirectSrcs = new Set(redirectRoutes.map((route) => route.src));
const withoutExisting = routes.filter((route) => !redirectSrcs.has(route.src));
const trailingSlashIndex = withoutExisting.findIndex((route) => route.src === '^/((?:[^/]+/)*[^/\\.]+)$');
const filesystemIndex = withoutExisting.findIndex((route) => route.handle === 'filesystem');
const insertIndex = trailingSlashIndex >= 0 ? trailingSlashIndex : filesystemIndex >= 0 ? filesystemIndex : 0;

withoutExisting.splice(insertIndex, 0, ...redirectRoutes);
config.routes = withoutExisting;

writeFileSync(configUrl, `${JSON.stringify(config, null, '\t')}\n`);
console.log(`[patch-vercel-redirects] Added ${redirectRoutes.length} tool merge 301 redirects.`);
