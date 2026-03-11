import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { IonIcon, IonSpinner } from "@ionic/react";
import {
  notificationsOutline,
  notifications,
  peopleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  calendarOutline,
  sparklesOutline,
  informationCircleOutline,
} from "ionicons/icons";
import {
  useNotificationCenter,
  InAppNotification,
  NotificationContentType,
} from "../../../hooks/useNotificationCenter";
import "./NotificationCenter.scss";

// ─── Helpers ────────────────────────────────────────────────────────────────

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
};

const typeConfig: Record<
  NotificationContentType,
  { icon: string; accent: string; label: string }
> = {
  team_invite: {
    icon: peopleOutline,
    accent: "#2989e3",
    label: "Team Invite",
  },
  church_event: {
    icon: calendarOutline,
    accent: "#f02c89",
    label: "Event",
  },
  achievement: {
    icon: sparklesOutline,
    accent: "#ffc409",
    label: "Achievement",
  },
  daily_verse: {
    icon: informationCircleOutline,
    accent: "#724498",
    label: "Daily Verse",
  },
  mood_request_available: {
    icon: informationCircleOutline,
    accent: "#2dd36f",
    label: "Mood",
  },
  prayer_reminder: {
    icon: informationCircleOutline,
    accent: "#724498",
    label: "Prayer",
  },
  community_update: {
    icon: informationCircleOutline,
    accent: "#2989e3",
    label: "Update",
  },
};

// ─── Notification Item ───────────────────────────────────────────────────────

const NotificationItem: React.FC<{
  notification: InAppNotification;
  onMarkRead: (id: string) => void;
  onAcceptInvite: (n: InAppNotification) => void;
  onDeclineInvite: (n: InAppNotification) => void;
  isActioning: boolean;
}> = ({
  notification,
  onMarkRead,
  onAcceptInvite,
  onDeclineInvite,
  isActioning,
}) => {
  const isInvite = notification.contentType === "team_invite";
  const config =
    typeConfig[notification.contentType] ??
    typeConfig["community_update"];

  return (
    <div
      className="nc-item"
      style={{ "--nc-accent": config.accent } as React.CSSProperties}
    >
      <div className="nc-item-accent" />

      <div className="nc-item-icon-wrap">
        <IonIcon icon={config.icon} className="nc-item-icon" />
      </div>

      <div className="nc-item-body">
        <div className="nc-item-meta">
          <span className="nc-item-type-label">{config.label}</span>
          <span className="nc-item-time">{timeAgo(notification.createdAt)}</span>
        </div>
        <p className="nc-item-title">{notification.title}</p>
        <p className="nc-item-message">{notification.message}</p>

        {isInvite ? (
          <div className="nc-item-actions">
            <button
              className="nc-btn nc-btn-accept"
              disabled={isActioning}
              onClick={() => onAcceptInvite(notification)}
            >
              <IonIcon icon={checkmarkCircleOutline} />
              Accept
            </button>
            <button
              className="nc-btn nc-btn-decline"
              disabled={isActioning}
              onClick={() => onDeclineInvite(notification)}
            >
              <IonIcon icon={closeCircleOutline} />
              Decline
            </button>
          </div>
        ) : (
          <div className="nc-item-actions">
            {notification.actionUrl && (
              <a
                className="nc-btn nc-btn-view"
                href={notification.actionUrl}
                onClick={() => onMarkRead(notification._id)}
              >
                {notification.actionText || "View"}
              </a>
            )}
            <button
              className="nc-btn nc-btn-dismiss"
              onClick={() => onMarkRead(notification._id)}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelPos, setPanelPos] = useState({ top: 0, right: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const {
    notifications: notifs,
    loading,
    respondLoading,
    error,
    unreadCount,
    markRead,
    respondToInvite,
    refetch,
  } = useNotificationCenter();

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen) {
      refetch();
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPanelPos({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right,
        });
      }
    }
    setIsOpen((o) => !o);
  };

  const panel = (
    <div
      className="nc-panel"
      ref={panelRef}
      style={{ top: panelPos.top, right: panelPos.right }}
    >
      {/* Header */}
      <div className="nc-panel-header">
        <div className="nc-panel-header-left">
          <IonIcon icon={notificationsOutline} className="nc-panel-header-icon" />
          <span className="nc-panel-title">Notifications</span>
        </div>
        {unreadCount > 0 && (
          <span className="nc-panel-badge">{unreadCount} new</span>
        )}
      </div>

      {/* Body */}
      <div className="nc-panel-body">
        {loading && (
          <div className="nc-state">
            <IonSpinner name="crescent" color="primary" />
            <span>Loading…</span>
          </div>
        )}

        {!loading && error && (
          <div className="nc-state nc-state--error">
            <IonIcon icon={informationCircleOutline} />
            <span>Couldn't load notifications</span>
            <button className="nc-retry-btn" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && notifs.length === 0 && (
          <div className="nc-state nc-state--empty">
            <div className="nc-empty-illustration">
              <IonIcon icon={notificationsOutline} />
            </div>
            <p className="nc-empty-title">You're all caught up!</p>
            <p className="nc-empty-sub">No new notifications</p>
          </div>
        )}

        {!loading && notifs.length > 0 && (
          <div className="nc-list">
            {notifs.map((n) => (
              <NotificationItem
                key={n._id}
                notification={n}
                onMarkRead={markRead}
                onAcceptInvite={(item) => respondToInvite(item, true)}
                onDeclineInvite={(item) => respondToInvite(item, false)}
                isActioning={respondLoading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="nc-root">
      {/* Bell trigger */}
      <button
        ref={triggerRef}
        className={`nc-trigger-btn ${isOpen ? "nc-trigger-btn--active" : ""}`}
        onClick={handleToggle}
        aria-label="Notifications"
      >
        <IonIcon icon={isOpen ? notifications : notificationsOutline} />
        {unreadCount > 0 && (
          <span className="nc-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
        )}
      </button>

      {/* Portal: renders into document.body to escape Ionic header overflow:hidden */}
      {isOpen && ReactDOM.createPortal(panel, document.body)}
    </div>
  );
};
