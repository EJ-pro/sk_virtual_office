let CACHE_NAME = 'workavdenture-cache-dev';
let urlsToCache = [
    '/'
];

self.addEventListener('install', function(event) {
    // url to cache
    if(event.target && event.target.serviceWorker && event.target.serviceWorker.scriptURL){
        const url = new URL(event.target.serviceWorker.scriptURL);
        const searchParams = new URLSearchParams(url.search);
        const playUri = searchParams.get('playUri');
        urlsToCache = [playUri];
    }

    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    // Basic pass-through for development to ensure requests aren't blocked
    event.respondWith(fetch(event.request));
});

self.addEventListener('wait', function(event) {
    //TODO wait
});

self.addEventListener('update', function(event) {
    //TODO update
});

self.addEventListener('beforeinstallprompt', (e) => {
    //TODO change prompt
});

