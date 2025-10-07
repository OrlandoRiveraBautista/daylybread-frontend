// Frontend service for managing push notifications
// Use this in your React/Vue/Angular frontend

export class PushNotificationService {
  private vapidPublicKey: string;

  constructor(vapidPublicKey: string) {
    this.vapidPublicKey = vapidPublicKey;
  }

  // Check if push notifications are supported
  isSupported(): boolean {
    return "serviceWorker" in navigator && "PushManager" in window;
  }

  // Register service worker and request permission
  async initialize(): Promise<boolean> {
    if (!this.isSupported()) {
      return false;
    }

    try {
      // Use the existing CRA service worker registration; do not register a second SW
      // Wait until the current service worker is ready
      await navigator.serviceWorker.ready;

      // Request permission
      const permission = await Notification.requestPermission();

      return permission === "granted";
    } catch (error) {
      console.error("Error initializing push notifications:", error);
      return false;
    }
  }

  // Subscribe to push notifications
  async subscribe(): Promise<PushSubscription | null> {
    try {
      const registration = await navigator.serviceWorker.ready;

      // Convert VAPID key from base64 to Uint8Array
      const applicationServerKey = this.urlBase64ToUint8Array(
        this.vapidPublicKey
      );

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      });

      return subscription;
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
      return null;
    }
  }

  // Unsubscribe from push notifications
  async unsubscribe(): Promise<boolean> {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
      return false;
    }
  }

  // Get current subscription
  async getSubscription(): Promise<PushSubscription | null> {
    try {
      const registration = await navigator.serviceWorker.ready;
      return await registration.pushManager.getSubscription();
    } catch (error) {
      console.error("Error getting push subscription:", error);
      return null;
    }
  }

  // Send subscription to your backend
  async sendSubscriptionToBackend(
    subscription: PushSubscription,
    userId: string
  ): Promise<boolean> {
    try {
      // Ensure we hit the GraphQL endpoint in production, e.g. https://api.dev.../graphql
      const baseUrl = process.env.REACT_APP_API_URL || "";
      const graphqlUrl = baseUrl.endsWith("/graphql")
        ? baseUrl
        : `${baseUrl.replace(/\/$/, "")}/graphql`;

      const response = await fetch(graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: document.cookie,
        },
        credentials: "include",
        body: JSON.stringify({
          query: `
            mutation UpdateNotificationSettings($input: NotificationSettingsInput!) {
              updateNotificationSettings(input: $input) {
                errors {
                  message
                }
                settings {
                  enableBrowserPushNotifications
                  pushSubscriptionEndpoint
                }
              }
            }
          `,
          variables: {
            input: {
              enableBrowserPushNotifications: true,
              pushSubscriptionEndpoint: subscription.endpoint,
              pushSubscriptionKeys: JSON.stringify({
                p256dh: this.arrayBufferToBase64(subscription.getKey("p256dh")),
                auth: this.arrayBufferToBase64(subscription.getKey("auth")),
              }),
            },
          },
        }),
      });

      const result = await response.json();

      // Check if there are errors
      if (result.data?.updateNotificationSettings?.errors?.length > 0) {
        console.error(
          "Notification settings errors:",
          result.data.updateNotificationSettings.errors
        );
        return false;
      }

      // Check if settings were updated successfully
      return !!result.data?.updateNotificationSettings?.settings;
    } catch (error) {
      console.error("Error sending subscription to backend:", error);
      return false;
    }
  }

  // Helper function to convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Helper function to convert ArrayBuffer to base64
  private arrayBufferToBase64(buffer: ArrayBuffer | null): string {
    if (!buffer) return "";

    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}

// Usage example:
/*
const pushService = new PushNotificationService('YOUR_VAPID_PUBLIC_KEY');

// Initialize and request permission
const hasPermission = await pushService.initialize();

if (hasPermission) {
  // Subscribe to notifications
  const subscription = await pushService.subscribe();
  
  if (subscription) {
    // Send subscription to backend
    const success = await pushService.sendSubscriptionToBackend(subscription, userId);
  }
}
*/
