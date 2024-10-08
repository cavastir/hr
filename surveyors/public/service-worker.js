const CACHE_NAME = 'hr-surveyors-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/images/hr-surveyors-logo-dark.png',
  '/images/hr-surveyors-logo-light.png',
  // Add more URLs to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});