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
    // Basic pass-through to ensure requests aren't blocked, with a fallback to the original caching logic if needed
    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // If you want to enable caching later, you can do it here. 
                // For now, we just return the network response to fix the hang.
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