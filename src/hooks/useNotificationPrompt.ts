import { useState, useEffect, useCallback } from "react";
import { Database } from "@ionic/storage";
import {
  PushNotificationService,
  NotificationPermissionStatus,
} from "../services/pushNotificationService";

// Constants for notification prompting
const NOTIFICATION_PROMPT_KEY = "notificationPromptData";
const PROMPT_INTERVAL_DAYS = 2; // Re-prompt every 2 days
const MIN_SESSION_COUNT = 2; // Wait for at least 2 sessions before first prompt

interface NotificationPromptData {
  lastPromptDate: string | null;
  promptCount: number;
  sessionCount: number;
  permanentlyDismissed: boolean;
}

interface UseNotificationPromptReturn {
  shouldShowPrompt: boolean;
  permissionStatus: NotificationPermissionStatus;
  isLoading: boolean;
  requestPermission: () => Promise<boolean>;
  dismissPrompt: (permanent?: boolean) => void;
  resetPromptData: () => void;
}

const getDefaultPromptData = (): NotificationPromptData => ({
  lastPromptDate: null,
  promptCount: 0,
  sessionCount: 0,
  permanentlyDismissed: false,
});

export const useNotificationPrompt = (
  localStorage: Database | undefined,
  hasSession: boolean,
  userId?: string
): UseNotificationPromptReturn => {
  const [shouldShowPrompt, setShouldShowPrompt] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermissionStatus>("default");
  const [isLoading, setIsLoading] = useState(true);
  const [promptData, setPromptData] = useState<NotificationPromptData>(
    getDefaultPromptData()
  );
  const [pushService, setPushService] =
    useState<PushNotificationService | null>(null);

  // Initialize push service
  useEffect(() => {
    const vapidPublicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;
    if (vapidPublicKey) {
      setPushService(new PushNotificationService(vapidPublicKey));
    }
  }, []);

  // Load prompt data from storage
  useEffect(() => {
    const loadPromptData = async () => {
      if (!localStorage || !pushService) return;

      try {
        const storedData = await localStorage.get(NOTIFICATION_PROMPT_KEY);
        const data: NotificationPromptData =
          storedData || getDefaultPromptData();

        // Increment session count
        data.sessionCount = (data.sessionCount || 0) + 1;
        await localStorage.set(NOTIFICATION_PROMPT_KEY, data);

        setPromptData(data);
        setPermissionStatus(pushService.getPermissionStatus());
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading notification prompt data:", error);
        setIsLoading(false);
      }
    };

    loadPromptData();
  }, [localStorage, pushService]);

  // Determine if we should show the prompt
  useEffect(() => {
    if (isLoading || !pushService || !hasSession) {
      setShouldShowPrompt(false);
      return;
    }

    const currentStatus = pushService.getPermissionStatus();
    setPermissionStatus(currentStatus);

    // Don't show if:
    // 1. Already has permission
    // 2. Notifications not supported
    // 3. User permanently dismissed
    // 4. Not enough sessions yet
    if (
      currentStatus === "granted" ||
      currentStatus === "unsupported" ||
      promptData.permanentlyDismissed ||
      promptData.sessionCount < MIN_SESSION_COUNT
    ) {
      setShouldShowPrompt(false);
      return;
    }

    // Check if enough time has passed since last prompt
    if (promptData.lastPromptDate) {
      const lastPrompt = new Date(promptData.lastPromptDate);
      const now = new Date();
      const daysSinceLastPrompt = Math.floor(
        (now.getTime() - lastPrompt.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastPrompt < PROMPT_INTERVAL_DAYS) {
        setShouldShowPrompt(false);
        return;
      }
    }

    // All conditions met - show the prompt
    setShouldShowPrompt(true);
  }, [isLoading, pushService, hasSession, promptData]);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!pushService || !localStorage) return false;

    try {
      const hasPermission = await pushService.initialize();
      setPermissionStatus(pushService.getPermissionStatus());

      // Update prompt data
      const newPromptData: NotificationPromptData = {
        ...promptData,
        lastPromptDate: new Date().toISOString(),
        promptCount: promptData.promptCount + 1,
      };
      await localStorage.set(NOTIFICATION_PROMPT_KEY, newPromptData);
      setPromptData(newPromptData);

      if (hasPermission) {
        setShouldShowPrompt(false);

        // Subscribe to notifications if user ID is available
        const subscription = await pushService.subscribe();
        if (subscription && userId) {
          await pushService.sendSubscriptionToBackend(subscription, userId);
        }
      }

      return hasPermission;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }, [pushService, localStorage, promptData, userId]);

  // Dismiss the prompt
  const dismissPrompt = useCallback(
    async (permanent: boolean = false) => {
      if (!localStorage) return;

      setShouldShowPrompt(false);

      const newPromptData: NotificationPromptData = {
        ...promptData,
        lastPromptDate: new Date().toISOString(),
        promptCount: promptData.promptCount + 1,
        permanentlyDismissed: permanent,
      };

      await localStorage.set(NOTIFICATION_PROMPT_KEY, newPromptData);
      setPromptData(newPromptData);
    },
    [localStorage, promptData]
  );

  // Reset prompt data (for testing or user request)
  const resetPromptData = useCallback(async () => {
    if (!localStorage) return;

    const defaultData = getDefaultPromptData();
    await localStorage.set(NOTIFICATION_PROMPT_KEY, defaultData);
    setPromptData(defaultData);
    setShouldShowPrompt(false);
  }, [localStorage]);

  return {
    shouldShowPrompt,
    permissionStatus,
    isLoading,
    requestPermission,
    dismissPrompt,
    resetPromptData,
  };
};

export default useNotificationPrompt;
