// The previous version of this site shipped a precaching service worker.
// This replacement clears its caches, unregisters itself and reloads open
// tabs so returning visitors get the current pre-rendered pages.
self.addEventListener("install", () => self.skipWaiting())

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
      await self.registration.unregister()
      const clients = await self.clients.matchAll({ type: "window" })
      clients.forEach((client) => client.navigate(client.url))
    })(),
  )
})
