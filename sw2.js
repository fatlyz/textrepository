var cachelist = [
  '/static2/index.js',
  '/static2/index.html'
]
var CACHEName = 'sw2'
self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHEName).then(
        cache =>{
          cache.addAll(cachelist)
        }
      ),
        console.log('install sucessfully!'),
        self.skipWaiting()
    )
});

self.addEventListener('activate', (event) => {
  console.log('activate事件')
  var cacheWhitelist = [CACHEName]
  self.clients.claim() // 保证 激活之后能够马上作用于所有的终端
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // cacheNames.map((cacheName) => {
        //   if (cacheWhitelist.indexOf(cacheName) === -1) {
        //     return caches.delete(cacheName)
        //   }
        // })
        cacheNames.filter(function(cacheName){}).map(
          function(cacheName){ return caches.delete(cacheName) }
        )
      )
    })
  )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        console.log('fetch event')
        return response || fetch(event.request);
      })
    );
  });