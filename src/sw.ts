import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";
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
registerRoute(
  ({ url }) => url.origin === import.meta.env.VITE_API_BASE_URL, // Adjust to match your API domain
  new NetworkFirst({
    cacheName: "api-cache",
    networkTimeoutSeconds: 5, // Wait 5s before using cache fallback
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 }), // Cache API responses for 1 hour
    ],
  })
);

// Activate new service worker immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.claim().then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => client.navigate(client.url)); // Force refresh
      });
    })
  );
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
