import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonBadge,
  IonSpinner,
} from "@ionic/react";
import {
  trash,
  refresh,
  checkmarkCircle,
  closeCircle,
  time,
  mailOutline,
  chevronDown,
  chevronUp,
} from "ionicons/icons";
import { TEAM_ROLES } from "../../../../utils/worshipConstants";

// ─── Per-status config ────────────────────────────────────────────────────────
// The GraphQL client returns uppercase enum values ("ACCEPTED", "PENDING", etc.)
// Normalise to lowercase before lookup so both cases are handled.

interface StatusConfig {
  icon: string;
  color: string;
  badgeColor: string;
  label: string;
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
  accepted: {
    icon: checkmarkCircle,
    color: "success",
    badgeColor: "success",
    label: "Accepted",
  },
  declined: {
    icon: closeCircle,
    color: "danger",
    badgeColor: "danger",
    label: "Declined",
  },
  pending: {
    icon: mailOutline,
    color: "warning",
    badgeColor: "warning",
    label: "Pending",
  },
  expired: {
    icon: time,
    color: "medium",
    badgeColor: "medium",
    label: "Expired",
  },
};

function normaliseStatus(status: string): string {
  return status?.toLowerCase() ?? "pending";
}

function getStatusConfig(status: string): StatusConfig {
  return STATUS_CONFIG[normaliseStatus(status)] ?? STATUS_CONFIG.pending;
}

// ─── Single invite row ────────────────────────────────────────────────────────

interface InviteRowProps {
  invite: any;
  resendingInviteId: string | null;
  cancellingInviteId: string | null;
  onResendInvite: (inviteId: string, email: string) => void;
  onCancelInvite: (inviteId: string) => void;
  dimmed?: boolean;
}

const InviteRow: React.FC<InviteRowProps> = ({
  invite,
  resendingInviteId,
  cancellingInviteId,
  onResendInvite,
  onCancelInvite,
  dimmed = false,
}) => {
  const status = normaliseStatus(invite.status);
  const cfg = getStatusConfig(status);
  const isAccepted = status === "accepted";
  const isBusy =
    resendingInviteId === invite._id || cancellingInviteId === invite._id;

  const displayName = invite.invitedUser?.firstName
    ? `${invite.invitedUser.firstName} ${invite.invitedUser.lastName ?? ""}`.trim()
    : invite.email;

  const roleLabel =
    TEAM_ROLES.find((r) => r.value === invite.role)?.label ?? invite.role;

  const isCancelling = cancellingInviteId === invite._id;

  return (
    <IonCard
      className={`invite-card invite-card--${status}${dimmed ? " invite-card--dimmed" : ""}${isCancelling ? " invite-card--removing" : ""}`}
    >
      <IonCardContent>
        <div className="invite-card__info">
          {/* Status icon */}
          <div className={`invite-card__status-icon-wrap invite-card__status-icon-wrap--${status}`}>
            <IonIcon icon={cfg.icon} className="invite-card__status-icon" />
          </div>

          {/* Text details */}
          <div className="invite-card__details">
            <h3>{displayName}</h3>
            <IonText color="medium">
              <p>
                {roleLabel}
                {" · "}via {invite.method?.toLowerCase?.() ?? invite.method}
              </p>
            </IonText>
            <IonBadge
              color={cfg.badgeColor}
              className="invite-card__badge"
            >
              {cfg.label}
            </IonBadge>
          </div>
        </div>

        {/* Actions — only for non-accepted invites */}
        {!isAccepted && (
          <div className="invite-card__actions">
            <IonButton
              fill="clear"
              size="small"
              shape="round"
              color="primary"
              disabled={isBusy}
              onClick={() =>
                onResendInvite(
                  invite._id,
                  invite.invitedUser?.email ?? invite.email,
                )
              }
              title="Resend invite"
            >
              {resendingInviteId === invite._id ? (
                <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
              ) : (
                <IonIcon slot="icon-only" icon={refresh} />
              )}
            </IonButton>
            <IonButton
              fill="clear"
              size="small"
              shape="round"
              color="danger"
              disabled={isBusy}
              onClick={() => onCancelInvite(invite._id)}
              title="Cancel invite"
            >
              {cancellingInviteId === invite._id ? (
                <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
              ) : (
                <IonIcon slot="icon-only" icon={trash} />
              )}
            </IonButton>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

// ─── Main list ────────────────────────────────────────────────────────────────

interface TeamInvitesListProps {
  invites: any[];
  resendingInviteId: string | null;
  cancellingInviteId: string | null;
  onResendInvite: (inviteId: string, email: string) => void;
  onCancelInvite: (inviteId: string) => void;
}

export const TeamInvitesList: React.FC<TeamInvitesListProps> = ({
  invites,
  resendingInviteId,
  cancellingInviteId,
  onResendInvite,
  onCancelInvite,
}) => {
  const [acceptedExpanded, setAcceptedExpanded] = useState(false);

  const activeInvites = invites.filter((i) => normaliseStatus(i.status) !== "accepted");
  const acceptedInvites = invites.filter((i) => normaliseStatus(i.status) === "accepted");

  if (invites.length === 0) {
    return (
      <div className="empty-section">
        <p>No invites yet.</p>
      </div>
    );
  }

  const rowProps = { resendingInviteId, cancellingInviteId, onResendInvite, onCancelInvite };

  return (
    <div className="invites-list">
      {/* Active invites (pending / declined / expired) */}
      {activeInvites.length === 0 && acceptedInvites.length > 0 && (
        <div className="empty-section empty-section--small">
          <p>All invites have been accepted.</p>
        </div>
      )}

      {activeInvites.map((invite) => (
        <InviteRow key={invite._id} invite={invite} {...rowProps} />
      ))}

      {/* Accepted invites — collapsed section at the bottom */}
      {acceptedInvites.length > 0 && (
        <div className="invites-accepted-section">
          <button
            className="invites-accepted-section__toggle"
            onClick={() => setAcceptedExpanded((v) => !v)}
            aria-expanded={acceptedExpanded}
          >
            <div className="invites-accepted-section__toggle-left">
              <IonIcon icon={checkmarkCircle} className="invites-accepted-section__check-icon" />
              <span>
                {acceptedInvites.length} accepted
                {acceptedInvites.length === 1 ? " invite" : " invites"}
              </span>
            </div>
            <IonIcon
              icon={acceptedExpanded ? chevronUp : chevronDown}
              className="invites-accepted-section__chevron"
            />
          </button>

          {acceptedExpanded && (
            <div className="invites-accepted-section__list">
              {acceptedInvites.map((invite) => (
                <InviteRow key={invite._id} invite={invite} {...rowProps} dimmed />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
