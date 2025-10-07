import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { Capacitor } from "@capacitor/core";

export interface HapticOptions {
  style?: ImpactStyle;
  duration?: number;
  intensity?: "light" | "medium" | "heavy";
}

export class HapticService {
  private static instance: HapticService;
  private isAvailable: boolean = false;

  private constructor() {
    this.checkAvailability();
  }

  public static getInstance(): HapticService {
    if (!HapticService.instance) {
      HapticService.instance = new HapticService();
    }
    return HapticService.instance;
  }

  private async checkAvailability(): Promise<void> {
    try {
      // Check if we're running on a native platform with Capacitor
      if (Capacitor.isNativePlatform()) {
        // Check if haptics is available
        await Haptics.impact({ style: ImpactStyle.Light });
        this.isAvailable = true;
      } else {
        // For PWA, check if the device supports vibration
        this.isAvailable = "vibrate" in navigator;
      }
    } catch (error) {
      console.warn("Haptic feedback not available:", error);
      this.isAvailable = false;
    }
  }

  public async isHapticAvailable(): Promise<boolean> {
    await this.checkAvailability();
    return this.isAvailable;
  }

  /**
   * Trigger haptic feedback for chat streaming events
   */
  public async triggerChatHaptic(): Promise<void> {
    if (!(await this.isHapticAvailable())) return;

    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor Haptics for native platforms
        await Haptics.impact({ style: ImpactStyle.Light });
      } else {
        // Use Web Vibration API for PWA
        navigator.vibrate([50, 30, 50]);
      }
    } catch (error) {
      console.warn("Failed to trigger chat haptic:", error);
    }
  }

  /**
   * Trigger haptic feedback for text viewer slide changes
   */
  public async triggerSlideHaptic(): Promise<void> {
    if (!(await this.isHapticAvailable())) return;

    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor Haptics for native platforms
        await Haptics.impact({ style: ImpactStyle.Medium });
      } else {
        // Use Web Vibration API for PWA
        navigator.vibrate([100, 50, 100]);
      }
    } catch (error) {
      console.warn("Failed to trigger slide haptic:", error);
    }
  }

  /**
   * Trigger haptic feedback for page navigation
   */
  public async triggerNavigationHaptic(): Promise<void> {
    if (!(await this.isHapticAvailable())) return;

    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor Haptics for native platforms
        await Haptics.impact({ style: ImpactStyle.Heavy });
      } else {
        // Use Web Vibration API for PWA
        navigator.vibrate([150, 75, 150]);
      }
    } catch (error) {
      console.warn("Failed to trigger navigation haptic:", error);
    }
  }

  /**
   * Trigger haptic feedback for successful actions
   */
  public async triggerSuccessHaptic(): Promise<void> {
    if (!(await this.isHapticAvailable())) return;

    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor Haptics for native platforms
        await Haptics.impact({ style: ImpactStyle.Light });
      } else {
        // Use Web Vibration API for PWA - single vibration
        navigator.vibrate(50);
      }
    } catch (error) {
      console.warn("Failed to trigger success haptic:", error);
    }
  }

  /**
   * Trigger haptic feedback for error states
   */
  public async triggerErrorHaptic(): Promise<void> {
    if (!(await this.isHapticAvailable())) return;

    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor Haptics for native platforms
        await Haptics.notification({ type: NotificationType.Error });
      } else {
        // Use Web Vibration API for PWA - error pattern
        navigator.vibrate([200, 100, 200, 100, 200]);
      }
    } catch (error) {
      console.warn("Failed to trigger error haptic:", error);
    }
  }

  /**
   * Trigger custom haptic feedback
   */
  public async triggerCustomHaptic(options: HapticOptions): Promise<void> {
    if (!(await this.isHapticAvailable())) return;

    try {
      if (Capacitor.isNativePlatform()) {
        // Use Capacitor Haptics for native platforms
        await Haptics.impact({ style: options.style || ImpactStyle.Medium });
      } else {
        // Use Web Vibration API for PWA
        const duration = options.duration || 100;
        const pattern =
          options.intensity === "heavy"
            ? [duration, duration / 2, duration]
            : options.intensity === "light"
            ? [duration / 2, duration / 4, duration / 2]
            : [duration, duration / 2, duration];

        navigator.vibrate(pattern);
      }
    } catch (error) {
      console.warn("Failed to trigger custom haptic:", error);
    }
  }
}

// Export singleton instance
export const hapticService = HapticService.getInstance();
