let CACHE_NAME = 'workavdenture-cache';
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
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    // CRITICAL FIX: Skip service worker for POST requests and login API to avoid hangs
    if (event.request.method === 'POST' || event.request.url.includes('anonymLogin') || event.request.url.includes('/api/')) {
        return; // Let the browser handle it directly
    }

    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                return response;
            })
            .catch(function() {
                // If network fails, try to match from cache as a fallback
                return caches.match(event.request);
            })
    );
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