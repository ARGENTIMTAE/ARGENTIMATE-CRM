/* Deja la app disponible sin internet. Los datos no pasan por acá: Firebase los guarda aparte. */
const CACHE = 'argentimate-os-202611060120';
const LOCAL = ['./', 'index.html', 'firebase-config.js', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
const CDN = [
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];
const HOSTS = ['www.gstatic.com', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(LOCAL).then(function () {
      return Promise.all(CDN.map(function (u) { return fetch(u, { mode: 'no-cors' }).then(function (r) { return c.put(u, r); }).catch(function () {}); }));
    });
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (x) { return x !== CACHE; }).map(function (x) { return caches.delete(x); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var u = new URL(e.request.url);
  if (u.origin === self.location.origin) {
    e.respondWith(fetch(e.request).then(function (r) {
      if (r.ok) { var c = r.clone(); caches.open(CACHE).then(function (x) { x.put(e.request, c); }); }
      return r;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (h) { return h || (e.request.mode === 'navigate' ? caches.match('index.html') : Response.error()); });
    }));
  } else if (HOSTS.indexOf(u.hostname) >= 0) {
    e.respondWith(caches.match(e.request).then(function (h) {
      return h || fetch(e.request).then(function (r) { var c = r.clone(); caches.open(CACHE).then(function (x) { x.put(e.request, c); }); return r; });
    }));
  }
});
