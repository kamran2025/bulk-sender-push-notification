self.addEventListener('install', function(event) {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activated');
  return self.clients.claim();
});

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'New Post Available!';
  const options = {
      body: data.body || 'Check out the latest content on our blog.',
      icon: 'https://res.cloudinary.com/dzqufw45x/image/upload/v1700247508/Screenshot_2023-11-18_002618_jcfbfx.png',
      badge: 'https://res.cloudinary.com/dzqufw45x/image/upload/v1700247508/Screenshot_2023-11-18_002618_jcfbfx.png',
      data: {
          url: data.url || 'https://www.modfurninteriors.in'
      }
  };

  event.waitUntil(
      self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
      clients.openWindow(event.notification.data.url)
  );
});
