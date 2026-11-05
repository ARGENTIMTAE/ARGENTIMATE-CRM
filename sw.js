/* Hace que la app abra aunque no haya internet.
   Primero intenta traer la versión nueva; si no hay conexión, usa la última guardada.
   Los datos de clientes y cupones no pasan por acá: quedan en el almacenamiento del dispositivo. */
const CACHE = 'sellos-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(function (r) {
        if (r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
        return r;
      })
      .catch(function () {
        return caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
          return hit || (e.request.mode === 'navigate' ? caches.match('index.html') : Response.error());
        });
      })
  );
});
