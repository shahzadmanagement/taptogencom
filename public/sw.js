/**
 * TapToGen Enterprise Service Worker v1.0
 *
 * Strategies:
 * 1. Cache-First: CSS, JS, Fonts, Images, Icons
 * 2. Stale-While-Revalidate: HTML Pages, Tool Workspaces, Localization Pages
 * 3. Network-First: Analytics
 * 4. Exclusions: /admin, /api/, non-GET requests
 * 5. Offline Fallback: /offline.html
 */

const CACHE_NAME_STATIC = 'taptogen-static-v1';
const CACHE_NAME_PAGES = 'taptogen-pages-v1';
const CACHE_NAME_ASSETS = 'taptogen-assets-v1';

const PRECACHE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/offline.html',
  '/sw-register.js'
];

// Install Event — Pre-cache Core Critical Shell & Offline Page
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME_STATIC).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// Activate Event — Clean up Legacy Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (
            key !== CACHE_NAME_STATIC &&
            key !== CACHE_NAME_PAGES &&
            key !== CACHE_NAME_ASSETS
          ) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event Router
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Exclude non-GET, admin, api calls
  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api')) return;

  // 1. Network-First for Analytics
  if (
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('googletagmanager.com') ||
    url.hostname.includes('doubleclick.net')
  ) {
    event.respondWith(
      fetch(request).catch(() => new Response('', { status: 204 }))
    );
    return;
  }

  // 2. Cache-First for Static Assets (JS, CSS, Fonts, Images)
  const isStaticAsset =
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    request.destination === 'image' ||
    url.pathname.startsWith('/_astro/') ||
    url.pathname.match(/\.(css|js|woff2?|ttf|png|jpg|jpeg|svg|webp|ico)$/i);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME_ASSETS).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Stale-While-Revalidate for HTML Pages & Tool Endpoints
  const isHtmlPage =
    request.mode === 'navigate' ||
    request.headers.get('accept')?.includes('text/html') ||
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('.html');

  if (isHtmlPage) {
    event.respondWith(
      caches.open(CACHE_NAME_PAGES).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => {
              // Return cached response or fallback to pre-cached offline page
              return cachedResponse || caches.match('/offline.html');
            });

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }
});
