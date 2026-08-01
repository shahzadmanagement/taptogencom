/**
 * Safe Enterprise Service Worker Registration
 * Prevents hydration mismatches & duplicate registrations
 */
if (
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  (window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1')
) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function (registration) {
        // SW Registered successfully
      })
      .catch(function (err) {
        console.warn('[PWA] ServiceWorker registration failed: ', err);
      });
  });
}
