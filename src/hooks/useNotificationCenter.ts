import { useState, useEffect, useCallback } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

// ===============================
// GraphQL Documents
// ===============================

const GET_MY_IN_APP_NOTIFICATIONS = gql`
  query GetMyInAppNotifications {
    getMyInAppNotifications {
      _id
      title
      message
      contentType
      deliveryType
      status
      actionUrl
      actionText
      metadata
      createdAt
    }
  }
`;

const MARK_NOTIFICATION_READ = gql`
  mutation MarkNotificationRead($notificationId: String!) {
    markNotificationRead(notificationId: $notificationId)
  }
`;

const RESPOND_TO_INVITE = gql`
  mutation RespondToTeamInvite($inviteId: String!, $accept: Boolean!) {
    respondToInvite(inviteId: $inviteId, accept: $accept) {
      results {
        _id
        status
      }
      errors {
        field
        message
      }
    }
  }
`;

// ===============================
// Types
// ===============================

export type NotificationContentType =
  | "mood_request_available"
  | "daily_verse"
  | "church_event"
  | "prayer_reminder"
  | "community_update"
  | "achievement"
  | "team_invite";

export interface InAppNotification {
  _id: string;
  title: string;
  message: string;
  contentType: NotificationContentType;
  deliveryType: string;
  status: string;
  actionUrl?: string | null;
  actionText?: string | null;
  metadata?: string | null;
  createdAt: string;
}

export interface ParsedNotificationMetadata {
  inviteId?: string;
  teamId?: string;
  type?: string;
  [key: string]: unknown;
}

// ===============================
// Hook
// ===============================

export const useNotificationCenter = () => {
  const [notifications, setNotifications] = useState<InAppNotification[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data, loading, error: queryError, refetch } = useQuery(
    GET_MY_IN_APP_NOTIFICATIONS,
    { fetchPolicy: "network-only", errorPolicy: "all" }
  );

  const [markReadMutation, { loading: markReadLoading }] = useMutation(
    MARK_NOTIFICATION_READ
  );

  const [respondMutation, { loading: respondLoading }] =
    useMutation(RESPOND_TO_INVITE);

  useEffect(() => {
    if (data?.getMyInAppNotifications) {
      setNotifications(data.getMyInAppNotifications);
      setError(null);
    }
  }, [data]);

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    }
  }, [queryError]);

  const parseMetadata = useCallback(
    (raw?: string | null): ParsedNotificationMetadata => {
      if (!raw) return {};
      try {
        return JSON.parse(raw);
      } catch {
        return {};
      }
    },
    []
  );

  const markRead = useCallback(
    async (notificationId: string) => {
      try {
        await markReadMutation({ variables: { notificationId } });
        setNotifications((prev) =>
          prev.filter((n) => n._id !== notificationId)
        );
      } catch (err) {
        console.error("Failed to mark notification as read:", err);
      }
    },
    [markReadMutation]
  );

  const respondToInvite = useCallback(
    async (notification: InAppNotification, accept: boolean) => {
      const meta = parseMetadata(notification.metadata);
      const inviteId = meta.inviteId;

      if (!inviteId) {
        setError("Could not find invite ID in notification");
        return { success: false };
      }

      try {
        const result = await respondMutation({
          variables: { inviteId, accept },
        });

        if (result.data?.respondToInvite?.errors?.length) {
          const msg = result.data.respondToInvite.errors[0].message;
          setError(msg);
          return { success: false, error: msg };
        }

        // Remove the notification after responding
        await markRead(notification._id);
        return { success: true };
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Failed to respond to invite";
        setError(msg);
        return { success: false, error: msg };
      }
    },
    [respondMutation, markRead, parseMetadata]
  );

  const unreadCount = notifications.length;

  return {
    notifications,
    loading,
    markReadLoading,
    respondLoading,
    error,
    unreadCount,
    refetch,
    markRead,
    respondToInvite,
    parseMetadata,
  };
};
