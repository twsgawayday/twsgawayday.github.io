const version = '1'
const cacheName = 'shiokApp-v' + version
const dataCacheName = 'shiokPhotos-v' + version
const appShellFilesToCache = [
  './',
  './index.html',
  './photobook.html',
  './photobookv2.html',
  './bundle.js',
  './open-sans.css',
  './styles.css',
  './colors.gif'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(appShellFilesToCache)
    })
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keylist => {
      return Promise.all(keylist.map(key => {
        if (key !== cacheName) {
          return caches.delete(key)
        }
      }))
    })
  )

  self.addEventListener('fetch', e => {
    if (
      (e.request.url.indexOf('show_picture?style=profile') !== -1) ||
      (e.request.url.indexOf('img/') !== -1)
    ) {
      e.respondWith(
        caches.match(e.request.clone()).then(response => {
          return response || fetch(e.request.clone()).then(res => {
            return caches.open(dataCacheName).then(cache => {
              cache.put(e.request.url, res.clone())
              return res.clone
            })
          })
        })
      )
    } else {
      e.respondWith(
        caches.match(e.request).then(response => {
          return response || fetch(e.request)
        })
      )
    }
  })
})
