import { useState, useEffect, useCallback } from "react";
import { gql } from "../__generated__/gql";
import {
  useLazyQuery,
  useQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";

// ===============================
// Types (matching GraphQL schema)
// ===============================

export interface NotificationSettingsInput {
  enableWebSocketNotifications?: boolean;
  enableBrowserPushNotifications?: boolean;
  enableEmailNotifications?: boolean;
  pushSubscriptionEndpoint?: string;
  pushSubscriptionKeys?: string;
}

export interface ScheduleNotificationInput {
  mood: string;
  type: string;
  scheduledFor: Date;
  deviceId?: string | null;
  message?: string | null;
}

export interface UserNotificationSettings {
  _id: string;
  userId: string;
  enableWebSocketNotifications: boolean;
  enableBrowserPushNotifications: boolean;
  enableEmailNotifications: boolean;
  pushSubscriptionEndpoint?: string | null;
  pushSubscriptionKeys?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MoodNotification {
  _id: string;
  mood: string;
  type: string;
  scheduledFor: Date;
  message?: string | null;
  status: string;
}

export interface MoodNotificationMessage {
  mood: string;
  message: string;
  timestamp: Date;
  userId: string;
}

export interface FieldError {
  message: string;
}

export interface NotificationApiResponse {
  errors?: FieldError[];
  success: boolean;
}

// ===============================
// GraphQL Operations
// ===============================

const getUserNotificationSettingsQuery = gql(`
  query GetUserNotificationSettingsBasic {
    getUserNotificationSettings {
      errors {
        message
      }
      settings {
        _id
        userId
        enableWebSocketNotifications
        enableBrowserPushNotifications
        enableEmailNotifications
        pushSubscriptionEndpoint
        pushSubscriptionKeys
        createdAt
        updatedAt
      }
    }
  }
`);

const updateNotificationSettingsMutation = gql(`
  mutation UpdateNotificationSettingsBasic($input: NotificationSettingsInput!) {
    updateNotificationSettings(input: $input) {
      errors {
        message
      }
      settings {
        _id
        userId
        enableWebSocketNotifications
        enableBrowserPushNotifications
        enableEmailNotifications
        pushSubscriptionEndpoint
        pushSubscriptionKeys
        createdAt
        updatedAt
      }
    }
  }
`);

const scheduleMoodNotificationMutation = gql(`
  mutation ScheduleMoodNotificationBasic($input: ScheduleNotificationInput!) {
    scheduleMoodNotification(input: $input) {
      errors {
        message
      }
      notification {
        _id
        mood
        type
        scheduledFor
        message
        status
      }
    }
  }
`);

const moodRequestAvailableSubscription = gql(`
  subscription MoodRequestAvailableBasic($userId: String!) {
    moodRequestAvailable(userId: $userId) {
      mood
      message
      timestamp
      userId
    }
  }
`);

// ===============================
// Utility Functions
// ===============================

export const SUPPORTED_NOTIFICATION_TYPES = [
  "websocket",
  "browser_push",
  "email",
] as const;

export type SupportedNotificationType =
  (typeof SUPPORTED_NOTIFICATION_TYPES)[number];

export const SUPPORTED_MOODS = [
  "peaceful",
  "grateful",
  "downcast",
  "frustrated",
  "anxious",
  "loved",
  "guilty",
  "hopeful",
] as const;

export type SupportedMood = (typeof SUPPORTED_MOODS)[number];

export const validateNotificationInput = (
  input: ScheduleNotificationInput
): string | null => {
  if (!input.mood?.trim()) return "Mood is required";
  if (!input.type?.trim()) return "Notification type is required";
  if (!input.scheduledFor) return "Scheduled date is required";
  if (input.scheduledFor <= new Date())
    return "Scheduled date must be in the future";

  const validMoods = SUPPORTED_MOODS.map((mood) => mood.toLowerCase());
  if (!validMoods.includes(input.mood.toLowerCase())) {
    return `Invalid mood. Must be one of: ${SUPPORTED_MOODS.join(", ")}`;
  }

  const validTypes = SUPPORTED_NOTIFICATION_TYPES.map((type) =>
    type.toLowerCase()
  );
  if (!validTypes.includes(input.type.toLowerCase())) {
    return `Invalid type. Must be one of: ${SUPPORTED_NOTIFICATION_TYPES.join(
      ", "
    )}`;
  }

  return null;
};

// ===============================
// Main Hook
// ===============================

export const useNotificationResolver = (userId?: string) => {
  // State
  const [settings, setSettings] = useState<UserNotificationSettings | null>(
    null
  );
  const [lastNotification, setLastNotification] =
    useState<MoodNotification | null>(null);
  const [realtimeMessages, setRealtimeMessages] = useState<
    MoodNotificationMessage[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  // Apollo hooks
  const {
    data: settingsData,
    loading: settingsLoading,
    error: settingsError,
    refetch: refetchSettings,
  } = useQuery(getUserNotificationSettingsQuery);

  const [updateSettings, { loading: updateLoading, error: updateError }] =
    useMutation(updateNotificationSettingsMutation);

  const [
    scheduleNotification,
    { loading: scheduleLoading, error: scheduleError },
  ] = useMutation(scheduleMoodNotificationMutation);

  const {
    data: subscriptionData,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useSubscription(moodRequestAvailableSubscription, {
    variables: { userId: userId || "" },
    skip: !userId,
  });

  // Update settings when data changes
  useEffect(() => {
    if (settingsData?.getUserNotificationSettings) {
      const response = settingsData.getUserNotificationSettings;
      if (response.errors && response.errors.length > 0) {
        setError(response.errors[0].message);
      } else if (response.settings) {
        setSettings(response.settings);
        setError(null);
      }
    }
  }, [settingsData]);

  // Handle real-time subscription data
  useEffect(() => {
    if (subscriptionData?.moodRequestAvailable) {
      const newMessage = subscriptionData.moodRequestAvailable;
      setRealtimeMessages((prev) => [newMessage, ...prev.slice(0, 9)]); // Keep last 10 messages
    }
  }, [subscriptionData]);

  // Handle errors
  useEffect(() => {
    const errors = [
      settingsError,
      updateError,
      scheduleError,
      subscriptionError,
    ].filter(Boolean);
    if (errors.length > 0) {
      setError(errors[0]?.message || "An error occurred");
    }
  }, [settingsError, updateError, scheduleError, subscriptionError]);

  // API methods
  const updateNotificationSettings = useCallback(
    async (
      input: NotificationSettingsInput
    ): Promise<NotificationApiResponse> => {
      try {
        setError(null);
        const result = await updateSettings({ variables: { input } });

        if (result.data?.updateNotificationSettings?.errors) {
          const errorMsg =
            result.data.updateNotificationSettings.errors[0]?.message ||
            "Failed to update settings";
          setError(errorMsg);
          return {
            success: false,
            errors: result.data.updateNotificationSettings.errors,
          };
        }

        if (result.data?.updateNotificationSettings?.settings) {
          setSettings(result.data.updateNotificationSettings.settings);
          return { success: true };
        }

        return {
          success: false,
          errors: [{ message: "Unknown error occurred" }],
        };
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to update settings";
        setError(errorMsg);
        return { success: false, errors: [{ message: errorMsg }] };
      }
    },
    [updateSettings]
  );

  const scheduleMoodNotification = useCallback(
    async (
      input: ScheduleNotificationInput
    ): Promise<NotificationApiResponse> => {
      // Validate input
      const validationError = validateNotificationInput(input);
      if (validationError) {
        setError(validationError);
        return { success: false, errors: [{ message: validationError }] };
      }

      try {
        setError(null);
        const result = await scheduleNotification({ variables: { input } });

        if (result.data?.scheduleMoodNotification?.errors) {
          const errorMsg =
            result.data.scheduleMoodNotification.errors[0]?.message ||
            "Failed to schedule notification";
          setError(errorMsg);
          return {
            success: false,
            errors: result.data.scheduleMoodNotification.errors,
          };
        }

        if (result.data?.scheduleMoodNotification?.notification) {
          setLastNotification(
            result.data.scheduleMoodNotification.notification
          );
          return { success: true };
        }

        return {
          success: false,
          errors: [{ message: "Unknown error occurred" }],
        };
      } catch (err) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Failed to schedule notification";
        setError(errorMsg);
        return { success: false, errors: [{ message: errorMsg }] };
      }
    },
    [scheduleNotification]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearRealtimeMessages = useCallback(() => {
    setRealtimeMessages([]);
  }, []);

  const removeRealtimeMessage = useCallback((timestamp: Date) => {
    setRealtimeMessages((prev) =>
      prev.filter((msg) => msg.timestamp !== timestamp)
    );
  }, []);

  // Loading state
  const loading =
    settingsLoading || updateLoading || scheduleLoading || subscriptionLoading;

  return {
    // Settings
    settings,
    updateNotificationSettings,
    refetchSettings,

    // Scheduling
    lastNotification,
    scheduleMoodNotification,

    // Real-time
    realtimeMessages,
    clearRealtimeMessages,
    removeRealtimeMessage,

    // State
    loading,
    error,
    clearError,

    // Utils
    validateNotificationInput,
    SUPPORTED_MOODS,
    SUPPORTED_NOTIFICATION_TYPES,
  };
};
