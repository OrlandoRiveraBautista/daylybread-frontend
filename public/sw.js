/* eslint-disable no-restricted-globals */

// Service Worker for handling push notifications
self.addEventListener("push", function (event) {
  if (!event.data) {
    return;
  }

  const data = event.data.json();

  // Check if notifications are supported and permission is granted
  if (!("Notification" in self) || self.Notification.permission !== "granted") {
    return;
  }

  const options = {
    body: data.body,
    icon: data.icon || "/icon-192x192.png",
    badge: data.badge || "/badge-72x72.png",
    tag: data.tag || "daylybread-notification",
    data: data.data,
    requireInteraction: false, // Let it auto-dismiss
    silent: false, // Enable sound
    timestamp: Date.now(),
    vibrate: [200, 100, 200], // Vibration pattern for mobile
    sound: data.sound || "/assets/media/sounds/notification-sound.wav", // Custom sound
    actions: [
      {
        action: "open",
        title: "Open App",
        icon: "/action-icon.png",
      },
      {
        action: "dismiss",
        title: "Dismiss",
        icon: "/action-icon.png",
      },
    ],
    renotify: true, // Show notification even if same tag exists
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // Handle action buttons
  if (event.action === "dismiss") {
    return; // Just close the notification
  }

  const url = event.notification.data?.url || event.notification.url || "/";

  event.waitUntil(
    // eslint-disable-next-line no-undef
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        // Check if there's already a window/tab open with the target URL
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes(url) && "focus" in client) {
            return client.focus();
          }
        }

        // If no window/tab is open, open a new one
        // eslint-disable-next-line no-undef
        if (clients.openWindow) {
          // eslint-disable-next-line no-undef
          return clients.openWindow(url);
        }
      })
  );
});

// Track notification dismissal
self.addEventListener("notificationclose", function (event) {
  // Optional: Send analytics data about notification dismissal
});
