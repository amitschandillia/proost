/* eslint-disable */

const CACHE_NAME = '5bfdb2669aae3c5cbf8c423ac976ce46';
const URLS_TO_CACHE = [
  '/',
  '/about',
  '/blog',
  '/index',
  'android-chrome-144x144.png',
  'android-chrome-192x192.png',
  'android-chrome-256x256.png',
  'android-chrome-36x36.png',
  'android-chrome-384x384.png',
  'android-chrome-48x48.png',
  'android-chrome-512x512.png',
  'android-chrome-72x72.png',
  'android-chrome-96x96.png',
  'apple-touch-icon-114x114-precomposed.png',
  'apple-touch-icon-114x114.png',
  'apple-touch-icon-120x120-precomposed.png',
  'apple-touch-icon-120x120.png',
  'apple-touch-icon-144x144-precomposed.png',
  'apple-touch-icon-144x144.png',
  'apple-touch-icon-152x152-precomposed.png',
  'apple-touch-icon-152x152.png',
  'apple-touch-icon-180x180-precomposed.png',
  'apple-touch-icon-180x180.png',
  'apple-touch-icon-57x57-precomposed.png',
  'apple-touch-icon-57x57.png',
  'apple-touch-icon-60x60-precomposed.png',
  'apple-touch-icon-60x60.png',
  'apple-touch-icon-72x72-precomposed.png',
  'apple-touch-icon-72x72.png',
  'apple-touch-icon-76x76-precomposed.png',
  'apple-touch-icon-76x76.png',
  'apple-touch-icon-precomposed.png',
  'apple-touch-icon.png',
  'browserconfig.xml',
  'favicon-16x16.png',
  'favicon-194x194.png',
  'favicon-32x32.png',
  'favicon.ico',
  'mstile-144x144.png',
  'mstile-150x150.png',
  'mstile-310x150.png',
  'mstile-310x310.png',
  'mstile-70x70.png',
  'safari-pinned-tab.svg',
  'site.webmanifest',
  'icon-128x128.png',
  'icon-144x144.png',
  'icon-152x152.png',
  'icon-192x192.png',
  'icon-384x384.png',
  'icon-512x512.png',
  'icon-72x72.png',
  'icon-96x96.png',
  'manifest.json',
  '/_f/fonts/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7l.woff2',
  '/_f/fonts/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
  '/_f/fonts/KFOmCnqEu92Fr1Mu4mxK.woff2',
];

// Call install event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting()),
  );
});

// Call activate event
self.addEventListener('activate', (e) => {
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

// Call fetch event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request)),
  );
});
