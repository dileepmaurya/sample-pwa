const CACHE_NAME="my-site-cache-v2";
const cacheAssets = [
    '/',
    './main.css',
    './main.js'
];

self.addEventListener('message', (e) => {
    console.log(e.data);
});

self.addEventListener('install', (event) => {
    console.log('ServiceWorker installing');
    event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(cacheAssets);
    }));
});

self.addEventListener('activate', (event) => {
    console.log('ServiceWorker activate');
    var cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                      }
                })
            );
        })
    );
});
self.addEventListener('fetch', (event) => {
    console.log('ServiceWorking intercepting the fetch');
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if(response) {
                console.log('ServiceWorker send cached response');
                return response;
            }
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                var responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    console.log('Storing the fresh response');
                    cache.put(event.request, responseToCache);
                });
                console.log('Fetching the fresh response');
                return response;
            });
        })
    );
});
