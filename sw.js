/* ============================================================================
   SERVICE WORKER — SỔ CĐHA — BỆNH VIỆN VĨNH PHÚC VPI
   Hỗ trợ cài đặt PWA App trên Điện thoại / Máy tính & Chế độ Xem Ngoại Viện Offline
   ============================================================================ */

var CACHE_NAME = 'vpi-cdha-cache-v3.2';

var PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/css/modalities.css',
  './assets/css/responsive.css',
  './assets/images/logo-vpi.jpg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/favicon.png',
  './assets/js/data-clinical-knowledge.js',
  './assets/js/data-quytrinh.js',
  './assets/js/data-ct-checklists.js',
  './assets/js/data-mrimaster.js',
  './assets/js/data-sieuam.js',
  './assets/js/data-canthiep.js',
  './assets/js/data-doloangxuong.js',
  './assets/js/data-thuoccanquang.js',
  './assets/js/data-taibien.js',
  './assets/js/data-congcu.js',
  './assets/js/auth-lms.js',
  './assets/js/app.js'
];

// Cài đặt Service Worker: Lưu trước toàn bộ tài nguyên cốt lõi vào bộ nhớ đệm
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// Kích hoạt: Xóa bỏ các phiên bản cache cũ
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cache) {
          if (cache !== CACHE_NAME) {
            return caches["delete"](cache);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// Xử lý truy vấn (Fetch Strategy): Stale-While-Revalidate & Cache-First
self.addEventListener('fetch', function (event) {
  var request = event.request;

  // Bỏ qua các yêu cầu không phải GET hoặc ngoài phạm vi
  if (request.method !== 'GET') return;

  // Với điều hướng trang (HTML navigation): Network trước, nếu mất mạng thì lấy Cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)["catch"](function () {
        return caches.match('./index.html') || caches.match('./');
      })
    );
    return;
  }

  // Với tệp tĩnh (CSS, JS, hình ảnh, icon): Ưu tiên Cache, đồng thời cập nhật nền nếu có mạng
  event.respondWith(
    caches.match(request).then(function (cachedResponse) {
      if (cachedResponse) {
        // Tải cập nhật ngầm nếu có kết nối
        fetch(request).then(function (networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(request, networkResponse);
            });
          }
        })["catch"](function () {
          // Ngoại tuyến: Vẫn dùng dữ liệu đã cache
        });
        return cachedResponse;
      }

      // Nếu chưa có trong cache, fetch từ mạng và lưu vào cache
      return fetch(request).then(function (networkResponse) {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        var responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(request, responseToCache);
        });
        return networkResponse;
      })["catch"](function () {
        // Nếu offline và tệp là hình ảnh, có thể trả về placeholder hoặc rỗng
        if (request.destination === 'image') {
          return caches.match('./assets/images/logo-vpi.jpg');
        }
      });
    })
  );
});
