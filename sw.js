const CACHE_NAME = 'ershisifan-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/js/app.js',
  '/js/svgs.js',
  '/data/flowers.js',
  '/data/quiz.js',
  '/data/achievements.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// 安装：缓存核心静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// 激活：清理旧版本缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 请求拦截：Cache First（花卉图片），Network First（其他）
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 花卉图片：Cache First，缓存命中直接返回，否则网络获取并缓存
  if (url.pathname.startsWith('/images/flower_')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // 静态资源：Cache First
  if (
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.json') ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html')
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const network = fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
        return cached || network;
      })
    );
    return;
  }
});
