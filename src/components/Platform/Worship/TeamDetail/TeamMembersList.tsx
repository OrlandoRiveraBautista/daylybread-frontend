import React from "react";
import {
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { trash, musicalNote, shieldCheckmark } from "ionicons/icons";
import { TEAM_ROLES } from "../../../../utils/worshipConstants";

// Generate a consistent hue from a string so each member gets a unique avatar color
function stringToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function getInitials(firstName?: string, lastName?: string): string {
  const f = firstName?.[0] ?? "";
  const l = lastName?.[0] ?? "";
  return (f + l).toUpperCase() || "?";
}

interface TeamMembersListProps {
  members: any[];
  isOwner: boolean;
  removingMemberId: string | null;
  onRemoveMember: (memberId: string) => void;
  /** The team author's user ID — used to show the owner crown */
  authorId?: string;
}

export const TeamMembersList: React.FC<TeamMembersListProps> = ({
  members,
  isOwner,
  removingMemberId,
  onRemoveMember,
  authorId,
}) => {
  if (members.length === 0) {
    return (
      <div className="empty-section">
        <p>No members yet. Send an invite to get started.</p>
      </div>
    );
  }

  return (
    <div className="members-list">
      {members.map((member: any) => {
        const name = [member.user?.firstName, member.user?.lastName]
          .filter(Boolean)
          .join(" ") || "Unknown";
        const initials = getInitials(member.user?.firstName, member.user?.lastName);
        const hue = stringToHue(member.user?._id ?? name);
        const roleLabel =
          TEAM_ROLES.find((r) => r.value === member.role)?.label ?? member.role;
        const isRemoving = removingMemberId === member._id;
        const isTeamOwner = authorId && member.user?._id === authorId;

        return (
          <div key={member._id} className={`member-card${isRemoving ? " member-card--removing" : ""}`}>
            {/* Avatar */}
            <div
              className="member-card__avatar"
              style={{
                background: `linear-gradient(135deg, hsl(${hue}, 65%, 52%), hsl(${(hue + 30) % 360}, 65%, 42%))`,
              }}
              aria-hidden="true"
            >
              {initials}
            </div>

            {/* Main content */}
            <div className="member-card__body">
              <div className="member-card__name-row">
                <span className="member-card__name">{name}</span>
                {isTeamOwner && (
                  <span className="member-card__owner-badge" title="Team owner">
                    <IonIcon icon={shieldCheckmark} />
                    Owner
                  </span>
                )}
              </div>

              <span className="member-card__email">{member.user?.email}</span>

              <div className="member-card__tags">
                <span className="member-card__role-pill">{roleLabel}</span>
                {member.skills?.map((skill: string) => (
                  <span key={skill} className="member-card__skill-chip">
                    <IonIcon icon={musicalNote} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Remove action */}
            {isOwner && !isTeamOwner && (
              <IonButton
                fill="clear"
                size="small"
                shape="round"
                color="danger"
                className="member-card__remove-btn"
                disabled={isRemoving}
                onClick={() => onRemoveMember(member._id)}
                title="Remove member"
              >
                {isRemoving ? (
                  <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
                ) : (
                  <IonIcon slot="icon-only" icon={trash} />
                )}
              </IonButton>
            )}
          </div>
        );
      })}
    </div>
  );
};
