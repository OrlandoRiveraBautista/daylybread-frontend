import LogRocket from "logrocket";
import { User } from "../__generated__/graphql";

/**
 * LogRocket Service
 * Handles initialization and configuration of LogRocket for session replay and error tracking
 */

class LogRocketService {
  private initialized: boolean = false;

  /**
   * Initialize LogRocket with the app ID from environment variables
   * Should be called once at application startup
   */
  init(): void {
    const appId = process.env.REACT_APP_LOGROCKET_APP_ID;

    // Only initialize in production or if explicitly enabled
    if (!appId) {
      console.warn(
        "LogRocket app ID not found. LogRocket will not be initialized.",
      );
      return;
    }

    // Don't initialize if already initialized
    if (this.initialized) {
      console.warn("LogRocket is already initialized.");
      return;
    }

    try {
      const isEnabled =
        process.env.REACT_APP_LOGROCKET_ENABLED === "true" ||
        process.env.NODE_ENV === "production";

      // Only initialize LogRocket if explicitly enabled or in production
      if (!isEnabled) {
        console.log("LogRocket is disabled in this environment.");
        return;
      }

      LogRocket.init(appId, {
        // Console logging configuration
        console: {
          isEnabled: isEnabled,
          shouldAggregateConsoleErrors: true,
        },
        // Network request/response capture
        network: {
          isEnabled: true,
        },
        // DOM recording
        dom: {
          isEnabled: true,
        },
        // Automatically detect JS errors
        shouldDetectExceptions: true,
      });

      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize LogRocket:", error);
    }
  }

  /**
   * Identify a user in LogRocket
   * Call this when a user logs in or when user data is available
   */
  identifyUser(user: User): void {
    if (!this.initialized) {
      console.warn("LogRocket is not initialized. Cannot identify user.");
      return;
    }

    try {
      const userName =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.firstName || user.lastName || user.email || "Anonymous";

      const userTraits: Record<string, string | number | boolean> = {
        name: userName,
        email: user.email,
        id: user._id,
      };

      // Only add optional fields if they exist
      if (user.firstName && typeof user.firstName === "string") {
        userTraits.firstName = user.firstName;
      }
      if (user.lastName && typeof user.lastName === "string") {
        userTraits.lastName = user.lastName;
      }

      LogRocket.identify(user._id, userTraits);
    } catch (error) {
      console.error("Failed to identify user in LogRocket:", error);
    }
  }

  /**
   * Clear user identification
   * Call this when a user logs out
   */
  clearUser(): void {
    if (!this.initialized) {
      return;
    }

    try {
      // LogRocket doesn't have a direct clear method, but we can identify as anonymous
      LogRocket.identify("anonymous", {
        name: "Anonymous",
      });
    } catch (error) {
      console.error("Failed to clear user in LogRocket:", error);
    }
  }

  /**
   * Capture an exception manually
   */
  captureException(
    error: Error,
    context?: Record<string, string | number | boolean>,
  ): void {
    if (!this.initialized) {
      return;
    }

    try {
      LogRocket.captureException(error, {
        extra: context,
      });
    } catch (err) {
      console.error("Failed to capture exception in LogRocket:", err);
    }
  }

  /**
   * Log a custom event
   */
  logEvent(eventName: string, properties?: Record<string, any>): void {
    if (!this.initialized) {
      return;
    }

    try {
      LogRocket.log(eventName, properties);
    } catch (error) {
      console.error("Failed to log event in LogRocket:", error);
    }
  }

  /**
   * Check if LogRocket is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

// Export a singleton instance
export const logrocketService = new LogRocketService();
export default logrocketService;
