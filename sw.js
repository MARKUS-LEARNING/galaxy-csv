const CACHE_NAME = 'galaxy-artifact-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/vendor/three.module.min.js',
  '/vendor/controls/OrbitControls.js',
  '/vendor/postprocessing/EffectComposer.js',
  '/vendor/postprocessing/RenderPass.js',
  '/vendor/postprocessing/UnrealBloomPass.js',
  '/vendor/shaders/CopyShader.js',
  '/vendor/shaders/LuminosityHighPassShader.js',
  '/manifest.json',
];

// Install: precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for HTML/CSV, cache-first for vendor assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache-first for vendor/ (immutable libraries)
  if (url.pathname.startsWith('/vendor/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
    return;
  }

  // Network-first for everything else (HTML, CSV)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
