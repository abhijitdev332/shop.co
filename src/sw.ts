import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

// Precache files (Workbox will inject manifest here)
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache CSS and JS files
registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "script",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

// Cache Images
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 }),
    ],
  })
);

// Activate new service worker immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// import { BackgroundSyncPlugin } from "workbox-background-sync";

// // Background Sync
// const bgSyncPlugin = new BackgroundSyncPlugin("offline-queue", {
//   maxRetentionTime: 24 * 60, // Retry for 24 hours
// });

// registerRoute(
//   ({ url }) => url.pathname.startsWith("/api/"),
//   new StaleWhileRevalidate({
//     cacheName: "api-cache",
//     plugins: [bgSyncPlugin],
//   })
// );
