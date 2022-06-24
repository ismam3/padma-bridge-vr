const cache_name = "cache_v@1.0.0";

self.addEventListener("install",e=>{
    self.skipWaiting();
    e.waitUntil(
        caches.open(cache_name).then(cache=>{
            return cache.addAll()
        })
    )
})

self.addEventListener("activate", e=>{
    e.waitUntil(
        caches.keys().then(keys=>{
            console.log(keys)
            return Promise.all(keys
                .filter(key=>key !== cache_name)
                .map(key=> caches.delete(key))
            )
        })
    )
})

self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response||fetch(e.request)
        })
    );
})