var cachelist = [
  '/static1/index.js',
  '/static1/index.html'
]
var CACHEName = 'sw1'
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



  // 激活回调的逻辑处理
// self.addEventListener('activate', function(event) {  
  
//   event.waitUntil(
//     // Get all the cache names
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         // Get all the items that are stored under a different cache name than the current one
//         cacheNames.filter(function(cacheName) {
//           return cacheName != CACHEName;
//         }).map(function(cacheName) {
//           // Delete the items
//           return caches.delete(cacheName);
//         })
//       ); // end Promise.all()
//     }) // end caches.keys()
//   );
//   console.log('service worker 激活成功') // end event.waitUntil()
// });

//网络上的actived事件处理
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


/*  有网的情况下先从服务器获取，没有网再从service worker缓存获取    */

self.addEventListener('fetch',function ( event ) {
  console.log('正在对请求进行处理');
  console.log(event.request.url);
  event.respondWith(
    fetch(event.request).then(res=>{
      if(res){
        console.log(res)
        // caches.open(CACHEName).then(
        //   cache.put(event.request,res)
        // )
        return res
      }
    })
    .catch(() => {
      return caches.match(event.request).then(
        (res) =>{
          console.log("正在冲serviceworker缓存中存取数据")
          console.log(res)
          if(res) return res
        }
      ).catch(() => {
        alert("失败了")
      })
    })
    // fetch(event.request).then(
    //   res=>{
    //       console.log('从服务器获取成功')
    //       console.log(res)
    //       caches.open(CACHEName).then(cache=>{
    //         cache.put(event.request,res)
    //       })
    //       return res    
    //   }
    // ).catch(
    //   console.log('从服务器获取失败,正在尝试从service worker获取'),
    //   caches.match(event.request).then(
    //     res=>{
          
    //         console.log('从service worker获取成功')
    //         console.log(res)
    //         return res
          
    //     }
    //   )
    // )
//     caches.match(event.request).then(
//       function (res){
//         return fetch(event.request).then(
//           res=>{
//            resclone = res.clone() 
//            return res   
//         }).then(res=>{
//           console.log('从服务器获取成功')
//           caches.open(CACHEName).then(cache=>{
//             cache.put(event.request,resclone)
//           })
//           return res
//         }).catch(
//           function(err){
//             console.log(err+"即将从serviceworker中获取缓存数据")
//             event.match(event.request).then(res=>{
//               if(res) return res
//             })
//           }
//         )
//       }
//     )
  )
})



/*  先从缓存中找再从服务器获取然后缓存      */
// self.addEventListener('fetch', function (event) {
//   event.respondWith(     
//       caches.match(event.request).then(function (response) {
//           // 如果 service worker 有自己的返回，就直接返回，减少一次 http 请求
//           if (response) {
//               return response;
//           }
//           // 如果 service worker 没有返回，从服务器请求资源
//           var request = event.request.clone(); // 把原始请求拷过来
//           return fetch(request).then(function (httpRes) {
//               // 请求失败了，直接返回失败的结果就好了。。
//               if (!httpRes && httpRes.status !== 200) {
//                   return response;
//               }
//               // 请求成功的话，再一次缓存起来。
//               var responseClone = httpRes.clone();
//               caches.open(CACHEName).then(function (cache) {
//                   cache.put(event.request, responseClone);
//               });
//               return httpRes;
//           });
//       })
//   );
// });


// self.addEventListener('fetch', function(event) {
//   console.log('Handling fetch event for', event.request.url);
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       if (response) {
//         console.log('Found response in cache:', response);
//         return response;
//       }
//       console.log('No response found in cache. About to fetch from network...');
//       return fetch(event.request).then(function(response) {
//         var resclone = response.clone()
//         console.log('Response from network is:', response)
//         caches.open(CACHEName).then(cache =>{
//           cache.put(event.request,resclone)
//         })
//         return response;
//       }).catch(function(error) {
//         console.error('Fetching failed:', error);
//         throw error;
//       });
//     })
//   );
// });
// self.addEventListener('message', function(event) {
//   console.log('it`s message event')
//   });

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//       caches.match(event.request).then(function (response) {
//           // 如果匹配到缓存里的资源，则直接返回
//           if (response) {
//               return response;
//           }
//           // 匹配失败则继续请求
//           var request = event.request.clone(); // 把原始请求拷过来

//           // //默认情况下，从不支持 CORS 的第三方网址中获取资源将会失败。
//           // // 您可以向请求中添加 no-CORS 选项来克服此问题，不过这可能会导致“不透明”的响应，这意味着您无法辨别响应是否成功。
//           // if (request.mode !== 'navigate' && request.url.indexOf(request.referrer) === -1)                        {
//           //     request = new Request(request, { mode: 'no-cors' })
//           // }

//           return fetch(request).then(function (httpRes) {
//               //拿到了http请求返回的数据，进行一些操作
//               //请求失败了则直接返回、对于post请求也直接返回，sw不能缓存post请求
//               if (!httpRes  || ( httpRes.status !== 200 && httpRes.status !== 304 && httpRes.type !== 'opaque') || request.method === 'POST') {
//                   return httpRes;
//               }

//               // 请求成功的话，将请求缓存起来。
//               var responseClone = httpRes.clone();
//               caches.open(CACHEName).then(function (cache) {
//                   cache.put(event.request, responseClone);
//               });
//               return httpRes;
//           });
//       })
//   );
// });