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
  mood?: string;
  type?: string;
  scheduledFor: Date;
  deviceId?: string | null;
  message?: string | null;
  contentType: string;
  deliveryType: string;
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
  userId: string;
  mood?: string | null;
  type: string;
  scheduledFor?: Date | null;
  deviceId?: string | null;
  message?: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MoodNotificationMessage {
  mood?: string | null;
  message: string;
  timestamp: Date;
  userId: string;
}

export interface FieldError {
  message: string;
}

export interface NotificationSettingsResponse {
  errors?: FieldError[];
  settings?: UserNotificationSettings;
}

export interface ScheduleNotificationResponse {
  errors?: FieldError[];
  notification?: MoodNotification;
}

// ===============================
// GraphQL Queries, Mutations & Subscriptions
// ===============================

const getUserNotificationSettingsQuery = gql(`
  query GetUserNotificationSettingsDetailed {
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
  mutation UpdateNotificationSettingsDetailed($input: NotificationSettingsInput!) {
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
  mutation ScheduleMoodNotificationDetailed($input: ScheduleNotificationInput!) {
    scheduleMoodNotification(input: $input) {
      errors {
        message
      }
      notification {
        _id
        userId
        mood
        type
        scheduledFor
        deviceId
        message
        status
        createdAt
        updatedAt
      }
    }
  }
`);

const getUserPendingNotificationsQuery = gql(`
  query GetUserPendingNotifications {
    getUserPendingNotifications {
      _id
      userId
      mood
      type
      scheduledFor
      deviceId
      message
      status
      createdAt
      updatedAt
    }
  }
`);

const cancelNotificationMutation = gql(`
  mutation CancelNotification($notificationId: String!) {
    cancelNotification(notificationId: $notificationId)
  }
`);

const moodRequestAvailableSubscription = gql(`
  subscription MoodRequestAvailableDetailed($userId: String!) {
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

export const validateNotificationInput = (
  input: ScheduleNotificationInput
): string | null => {
  if (!input.mood?.trim()) {
    return "Mood is required";
  }

  if (!input.type?.trim()) {
    return "Notification type is required";
  }

  if (!input.scheduledFor) {
    return "Scheduled date is required";
  }

  if (input.scheduledFor <= new Date()) {
    return "Scheduled date must be in the future";
  }

  const validMoods = [
    "peaceful",
    "grateful",
    "downcast",
    "frustrated",
    "anxious",
    "loved",
    "guilty",
    "hopeful",
  ];
  if (!validMoods.includes(input.mood.toLowerCase())) {
    return `Invalid mood. Must be one of: ${validMoods.join(", ")}`;
  }

  const validTypes = ["websocket", "browser_push", "email"];
  if (!validTypes.includes(input.type.toLowerCase())) {
    return `Invalid notification type. Must be one of: ${validTypes.join(
      ", "
    )}`;
  }

  return null;
};

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

// ===============================
// Notification Settings Hook
// ===============================

export const useNotificationSettings = () => {
  const [settings, setSettings] = useState<UserNotificationSettings | null>(
    null
  );
  const [settingsError, setSettingsError] = useState<string | null>(null);

  const {
    data: settingsData,
    loading: settingsLoading,
    error: settingsQueryError,
    refetch: refetchSettings,
  } = useQuery(getUserNotificationSettingsQuery);

  const [updateSettings, { loading: updateLoading, error: updateError }] =
    useMutation(updateNotificationSettingsMutation);

  // Update local state when query data changes
  useEffect(() => {
    if (settingsData?.getUserNotificationSettings) {
      const response = settingsData.getUserNotificationSettings;
      if (response.errors && response.errors.length > 0) {
        setSettingsError(response.errors[0].message);
        setSettings(null);
      } else if (response.settings) {
        setSettings(response.settings);
        setSettingsError(null);
      }
    }
  }, [settingsData]);

  // Handle query errors
  useEffect(() => {
    if (settingsQueryError) {
      setSettingsError(settingsQueryError.message);
    }
  }, [settingsQueryError]);

  // Handle update errors
  useEffect(() => {
    if (updateError) {
      setSettingsError(updateError.message);
    }
  }, [updateError]);

  const updateNotificationSettings = useCallback(
    async (input: NotificationSettingsInput) => {
      try {
        setSettingsError(null);
        const result = await updateSettings({ variables: { input } });

        if (result.data?.updateNotificationSettings?.errors) {
          const error =
            result.data.updateNotificationSettings.errors[0]?.message ||
            "Failed to update settings";
          setSettingsError(error);
          return { success: false, error };
        }

        if (result.data?.updateNotificationSettings?.settings) {
          setSettings(result.data.updateNotificationSettings.settings);
          return {
            success: true,
            settings: result.data.updateNotificationSettings.settings,
          };
        }

        return { success: false, error: "Unknown error occurred" };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to update settings";
        setSettingsError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [updateSettings]
  );

  const clearSettingsError = useCallback(() => {
    setSettingsError(null);
  }, []);

  return {
    settings,
    settingsLoading: settingsLoading || updateLoading,
    settingsError,
    updateNotificationSettings,
    clearSettingsError,
    refetchSettings,
  };
};

// ===============================
// Notification Scheduling Hook
// ===============================

export const useNotificationScheduling = () => {
  const [schedulingError, setSchedulingError] = useState<string | null>(null);
  const [lastScheduledNotification, setLastScheduledNotification] =
    useState<MoodNotification | null>(null);

  const [
    scheduleNotification,
    { loading: schedulingLoading, error: scheduleMutationError },
  ] = useMutation(scheduleMoodNotificationMutation);

  const [cancelNotification, { loading: cancelLoading, error: cancelError }] =
    useMutation(cancelNotificationMutation);

  // Handle mutation errors
  useEffect(() => {
    if (scheduleMutationError) {
      setSchedulingError(scheduleMutationError.message);
    }
  }, [scheduleMutationError]);

  useEffect(() => {
    if (cancelError) {
      setSchedulingError(cancelError.message);
    }
  }, [cancelError]);

  const scheduleMoodNotification = useCallback(
    async (input: ScheduleNotificationInput) => {
      // Validate input
      const validationError = validateNotificationInput(input);
      if (validationError) {
        setSchedulingError(validationError);
        return { success: false, error: validationError };
      }

      try {
        setSchedulingError(null);
        const result = await scheduleNotification({ variables: { input } });

        if (result.data?.scheduleMoodNotification?.errors) {
          const error =
            result.data.scheduleMoodNotification.errors[0]?.message ||
            "Failed to schedule notification";
          setSchedulingError(error);
          return { success: false, error };
        }

        if (result.data?.scheduleMoodNotification?.notification) {
          const notification =
            result.data.scheduleMoodNotification.notification;
          setLastScheduledNotification(notification);
          return { success: true, notification };
        }

        return { success: false, error: "Unknown error occurred" };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to schedule notification";
        setSchedulingError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [scheduleNotification]
  );

  const cancelScheduledNotification = useCallback(
    async (notificationId: string) => {
      try {
        setSchedulingError(null);
        const result = await cancelNotification({
          variables: { notificationId },
        });

        if (result.data?.cancelNotification) {
          return { success: true };
        }

        return { success: false, error: "Failed to cancel notification" };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to cancel notification";
        setSchedulingError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [cancelNotification]
  );

  const clearSchedulingError = useCallback(() => {
    setSchedulingError(null);
  }, []);

  return {
    schedulingLoading: schedulingLoading || cancelLoading,
    schedulingError,
    lastScheduledNotification,
    scheduleMoodNotification,
    cancelScheduledNotification,
    clearSchedulingError,
  };
};

// ===============================
// Pending Notifications Hook
// ===============================

export const usePendingNotifications = () => {
  const [notifications, setNotifications] = useState<MoodNotification[]>([]);
  const [notificationsError, setNotificationsError] = useState<string | null>(
    null
  );

  const {
    data: notificationsData,
    loading: notificationsLoading,
    error: notificationsQueryError,
    refetch: refetchNotifications,
  } = useQuery(getUserPendingNotificationsQuery);

  // Update local state when query data changes
  useEffect(() => {
    if (notificationsData?.getUserPendingNotifications) {
      setNotifications(notificationsData.getUserPendingNotifications);
      setNotificationsError(null);
    }
  }, [notificationsData]);

  // Handle query errors
  useEffect(() => {
    if (notificationsQueryError) {
      setNotificationsError(notificationsQueryError.message);
    }
  }, [notificationsQueryError]);

  const clearNotificationsError = useCallback(() => {
    setNotificationsError(null);
  }, []);

  return {
    notifications,
    notificationsLoading,
    notificationsError,
    clearNotificationsError,
    refetchNotifications,
  };
};

// ===============================
// Real-time Notifications Hook (WebSocket)
// ===============================

export const useRealTimeNotifications = (userId: string) => {
  const [realtimeNotifications, setRealtimeNotifications] = useState<
    MoodNotificationMessage[]
  >([]);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(
    null
  );

  const {
    data: subscriptionData,
    loading: subscriptionLoading,
    error: subscriptionErrorData,
  } = useSubscription(moodRequestAvailableSubscription, {
    variables: { userId },
    skip: !userId,
  });

  // Add new real-time notifications to the list
  useEffect(() => {
    if (subscriptionData?.moodRequestAvailable) {
      const newNotification = subscriptionData.moodRequestAvailable;
      setRealtimeNotifications((prev) => [newNotification, ...prev]);
      setSubscriptionError(null);
    }
  }, [subscriptionData]);

  // Handle subscription errors
  useEffect(() => {
    if (subscriptionErrorData) {
      setSubscriptionError(subscriptionErrorData.message);
    }
  }, [subscriptionErrorData]);

  const clearRealtimeNotifications = useCallback(() => {
    setRealtimeNotifications([]);
  }, []);

  const removeNotification = useCallback((timestamp: Date) => {
    setRealtimeNotifications((prev) =>
      prev.filter((notification) => notification.timestamp !== timestamp)
    );
  }, []);

  const clearSubscriptionError = useCallback(() => {
    setSubscriptionError(null);
  }, []);

  return {
    realtimeNotifications,
    subscriptionLoading,
    subscriptionError,
    clearRealtimeNotifications,
    removeNotification,
    clearSubscriptionError,
  };
};

// ===============================
// Complete Notification API Hook
// ===============================

export const useNotificationApi = (userId?: string) => {
  const settingsHook = useNotificationSettings();
  const schedulingHook = useNotificationScheduling();
  const pendingHook = usePendingNotifications();
  const realtimeHook = useRealTimeNotifications(userId || "");

  const isLoading =
    settingsHook.settingsLoading ||
    schedulingHook.schedulingLoading ||
    pendingHook.notificationsLoading ||
    realtimeHook.subscriptionLoading;

  const hasError =
    settingsHook.settingsError ||
    schedulingHook.schedulingError ||
    pendingHook.notificationsError ||
    realtimeHook.subscriptionError;

  const clearAllErrors = useCallback(() => {
    settingsHook.clearSettingsError();
    schedulingHook.clearSchedulingError();
    pendingHook.clearNotificationsError();
    realtimeHook.clearSubscriptionError();
  }, [settingsHook, schedulingHook, pendingHook, realtimeHook]);

  return {
    // Settings
    settings: settingsHook.settings,
    settingsLoading: settingsHook.settingsLoading,
    settingsError: settingsHook.settingsError,
    updateNotificationSettings: settingsHook.updateNotificationSettings,
    refetchSettings: settingsHook.refetchSettings,

    // Scheduling
    schedulingLoading: schedulingHook.schedulingLoading,
    schedulingError: schedulingHook.schedulingError,
    lastScheduledNotification: schedulingHook.lastScheduledNotification,
    scheduleMoodNotification: schedulingHook.scheduleMoodNotification,
    cancelScheduledNotification: schedulingHook.cancelScheduledNotification,

    // Pending notifications
    notifications: pendingHook.notifications,
    notificationsLoading: pendingHook.notificationsLoading,
    notificationsError: pendingHook.notificationsError,
    refetchNotifications: pendingHook.refetchNotifications,

    // Real-time notifications
    realtimeNotifications: realtimeHook.realtimeNotifications,
    subscriptionLoading: realtimeHook.subscriptionLoading,
    subscriptionError: realtimeHook.subscriptionError,
    clearRealtimeNotifications: realtimeHook.clearRealtimeNotifications,
    removeNotification: realtimeHook.removeNotification,

    // Global state
    isLoading,
    hasError,
    clearAllErrors,
  };
};
