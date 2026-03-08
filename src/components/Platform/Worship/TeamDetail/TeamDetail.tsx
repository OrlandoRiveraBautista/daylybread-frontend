import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonChip,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonItem,
  IonToast,
} from "@ionic/react";
import {
  arrowBack,
  personAdd,
  mail,
  trash,
  musicalNote,
  checkmarkCircle,
  closeCircle,
  time,
  refresh,
} from "ionicons/icons";
import {
  useGetWorshipTeam,
  useSendTeamInvite,
  useGetTeamInvites,
  useRemoveTeamMember,
  useCancelTeamInvite,
  useResendTeamInvite,
} from "../../../../hooks/WorshipTeamHooks";
import { InviteMethod, TeamRole } from "../../../../__generated__/graphql";
import { useAppContext } from "../../../../context/context";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import "./TeamDetail.scss";

const TEAM_ROLES = [
  { value: "WORSHIP_LEADER", label: "Worship Leader" },
  { value: "GUITAR", label: "Guitar" },
  { value: "ELECTRIC_GUITAR", label: "Electric Guitar" },
  { value: "ACOUSTIC_GUITAR", label: "Acoustic Guitar" },
  { value: "BASS", label: "Bass" },
  { value: "PIANO", label: "Piano" },
  { value: "KEYS", label: "Keys" },
  { value: "DRUMS", label: "Drums" },
  { value: "VOCALS", label: "Vocals" },
  { value: "SOUND", label: "Sound" },
  { value: "MEDIA", label: "Media" },
  { value: "OTHER", label: "Other" },
];

export const TeamDetail: React.FC = () => {
  const history = useHistory();
  const { userInfo } = useAppContext();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"members" | "invites">("members");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; color: string } | null>(null);
  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);
  const [cancellingInviteId, setCancellingInviteId] = useState<string | null>(null);
  const [resendingInviteId, setResendingInviteId] = useState<string | null>(null);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "OTHER",
    method: "BOTH",
    skills: "",
  });

  const { data, loading, refetch } = useGetWorshipTeam(id);
  const { data: invitesData, refetch: refetchInvites } = useGetTeamInvites(id);
  const [sendInvite, { loading: isSending }] = useSendTeamInvite();
  const [removeMember] = useRemoveTeamMember();
  const [cancelInvite] = useCancelTeamInvite();
  const [resendInvite] = useResendTeamInvite();

  const team = data?.getWorshipTeam?.results;
  const members = team?.members || [];
  const invites = invitesData?.getTeamInvites?.results || [];
  const isOwner = team?.author?._id === userInfo?._id;

  const METHOD_LABELS: Record<string, string> = {
    EMAIL: "email",
    NOTIFICATION: "in-app notification",
    BOTH: "email and in-app notification",
  };

  const handleSendInvite = async () => {
    if (!inviteForm.email.trim()) return;
    try {
      await sendInvite({
        variables: {
          options: {
            teamId: id,
            email: inviteForm.email,
            role: inviteForm.role as TeamRole,
            method: inviteForm.method as InviteMethod,
            skills: inviteForm.skills
              ? inviteForm.skills.split(",").map((s: string) => s.trim())
              : undefined,
          },
        },
      });
      const methodLabel = METHOD_LABELS[inviteForm.method] ?? inviteForm.method;
      setToast({
        message: `Invite sent to ${inviteForm.email} via ${methodLabel}.`,
        color: "success",
      });
      setShowInviteModal(false);
      setInviteForm({ email: "", role: "OTHER", method: "BOTH", skills: "" });
      refetchInvites();
      refetch();
    } catch (err) {
      console.error("Error sending invite:", err);
      setToast({ message: "Failed to send invite. Please try again.", color: "danger" });
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      setRemovingMemberId(memberId);
      await removeMember({ variables: { id: memberId } });
      refetch();
    } catch (err) {
      console.error("Error removing member:", err);
    } finally {
      setRemovingMemberId(null);
    }
  };

  const handleCancelInvite = async (inviteId: string) => {
    try {
      setCancellingInviteId(inviteId);
      await cancelInvite({ variables: { inviteId } });
      refetchInvites();
    } catch (err) {
      console.error("Error cancelling invite:", err);
    } finally {
      setCancellingInviteId(null);
    }
  };

  const handleResendInvite = async (inviteId: string, email: string) => {
    try {
      setResendingInviteId(inviteId);
      const result = await resendInvite({ variables: { inviteId } });
      const errors = result.data?.resendTeamInvite?.errors;
      if (errors?.length) {
        setToast({ message: errors[0].message, color: "danger" });
      } else {
        setToast({ message: `Invite resent to ${email}.`, color: "success" });
        refetchInvites();
      }
    } catch (err) {
      console.error("Error resending invite:", err);
      setToast({ message: "Failed to resend invite. Please try again.", color: "danger" });
    } finally {
      setResendingInviteId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return checkmarkCircle;
      case "declined": return closeCircle;
      default: return time;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "success";
      case "declined": return "danger";
      case "expired": return "medium";
      default: return "warning";
    }
  };

  if (loading) {
    return (
      <div className="team-detail">
        <div className="loading-state">
          <IonSpinner name="crescent" />
          <p>Loading team...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="team-detail">
        <IonButton fill="clear" onClick={() => history.push("/worship/teams")}>
          <IonIcon slot="start" icon={arrowBack} />
          Back to Teams
        </IonButton>
        <p>Team not found.</p>
      </div>
    );
  }

  return (
    <div className="team-detail">
      <WorshipNav />
      <div className="team-detail__header">
        <div className="team-detail__header-left">
          <IonButton fill="clear" size="small" shape="round" onClick={() => history.push("/worship/teams")}>
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <div>
            <h1>{team.name}</h1>
            {team.description && <p>{team.description}</p>}
          </div>
        </div>
        {isOwner && (
          <IonButton size="large" fill="solid" shape="round" color="primary" onClick={() => setShowInviteModal(true)}>
            <IonIcon slot="start" icon={personAdd} />
            Invite
          </IonButton>
        )}
      </div>

      <IonSegment value={activeTab} onIonChange={(e) => setActiveTab(e.detail.value as any)} className="team-detail__tabs">
        <IonSegmentButton value="members">
          <IonLabel>Members ({members.length})</IonLabel>
        </IonSegmentButton>
        {isOwner && (
          <IonSegmentButton value="invites">
            <IonLabel>Invites ({invites.length})</IonLabel>
          </IonSegmentButton>
        )}
      </IonSegment>

      {activeTab === "members" && (
        <div className="members-list">
          {members.length === 0 ? (
            <div className="empty-section">
              <p>No members yet. Send an invite to get started.</p>
            </div>
          ) : (
            members.map((member: any) => (
              <IonCard key={member._id} className="member-card">
                <IonCardContent>
                  <div className="member-card__info">
                    <div className="member-card__avatar">
                      {(member.user?.firstName?.[0] || "?").toUpperCase()}
                    </div>
                    <div className="member-card__details">
                      <h3>{member.user?.firstName} {member.user?.lastName}</h3>
                      <IonText color="medium"><p>{member.user?.email}</p></IonText>
                      <div className="member-card__tags">
                        <IonBadge color="primary">
                          {TEAM_ROLES.find((r) => r.value === member.role)?.label || member.role}
                        </IonBadge>
                        {member.skills?.map((skill: string) => (
                          <IonChip key={skill} outline>
                            <IonIcon icon={musicalNote} />
                            <IonLabel>{skill}</IonLabel>
                          </IonChip>
                        ))}
                      </div>
                    </div>
                  </div>
                  {isOwner && (
                    <IonButton fill="clear" size="small" shape="round" color="danger"
                      disabled={removingMemberId === member._id}
                      onClick={() => handleRemoveMember(member._id)}>
                      {removingMemberId === member._id
                        ? <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
                        : <IonIcon slot="icon-only" icon={trash} />}
                    </IonButton>
                  )}
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>
      )}

      {activeTab === "invites" && (
        <div className="invites-list">
          {invites.length === 0 ? (
            <div className="empty-section">
              <p>No pending invites.</p>
            </div>
          ) : (
            invites.map((invite: any) => (
              <IonCard key={invite._id} className="invite-card">
                <IonCardContent>
                  <div className="invite-card__info">
                    <IonIcon
                      icon={getStatusIcon(invite.status)}
                      className="invite-card__status-icon"
                      color={getStatusColor(invite.status)}
                    />
                    <div className="invite-card__details">
                      <h3>
                        {invite.invitedUser?.firstName
                          ? `${invite.invitedUser.firstName} ${invite.invitedUser.lastName}`
                          : invite.email}
                      </h3>
                      <IonText color="medium">
                        <p>
                          {TEAM_ROLES.find((r) => r.value === invite.role)?.label || invite.role}
                          {" · "}via {invite.method}
                        </p>
                      </IonText>
                      <IonBadge color={getStatusColor(invite.status)}>{invite.status}</IonBadge>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {invite.status !== "accepted" && (
                      <IonButton fill="clear" size="small" shape="round" color="primary"
                        disabled={resendingInviteId === invite._id || cancellingInviteId === invite._id}
                        onClick={() => handleResendInvite(invite._id, invite.invitedUser?.email || invite.email)}>
                        {resendingInviteId === invite._id
                          ? <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
                          : <IonIcon slot="icon-only" icon={refresh} />}
                      </IonButton>
                    )}
                    {invite.status !== "accepted" && (
                      <IonButton fill="clear" size="small" shape="round" color="danger"
                        disabled={cancellingInviteId === invite._id || resendingInviteId === invite._id}
                        onClick={() => handleCancelInvite(invite._id)}>
                        {cancellingInviteId === invite._id
                          ? <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
                          : <IonIcon slot="icon-only" icon={trash} />}
                      </IonButton>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>
      )}

      <IonToast
        isOpen={!!toast}
        message={toast?.message}
        color={toast?.color}
        duration={4000}
        position="top"
        onDidDismiss={() => setToast(null)}
      />

      {/* Invite Modal */}
      <PlatformBottomSheet
        isOpen={showInviteModal}
        onClose={() => { setShowInviteModal(false); setInviteForm({ email: "", role: "OTHER", method: "BOTH", skills: "" }); }}
        title="Invite Member"
        onSave={handleSendInvite}
        saveLabel="Send Invite"
        saveDisabled={!inviteForm.email.trim()}
        isSaving={isSending}
        breakpoints={[0, 0.8, 0.95]}
        initialBreakpoint={0.8}
        footer={
          <div className="worship-form-hint">
            <IonIcon icon={mail} />
            <span>Email invites include a unique sign-up link for users without an account.</span>
          </div>
        }
      >
        <IonItem lines="none">
          <IonLabel position="stacked">Email Address *</IonLabel>
          <IonInput
            value={inviteForm.email}
            onIonInput={(e) => setInviteForm({ ...inviteForm, email: e.detail.value || "" })}
            placeholder="member@example.com"
            type="email"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Role</IonLabel>
          <IonSelect
            value={inviteForm.role}
            onIonChange={(e) => setInviteForm({ ...inviteForm, role: e.detail.value })}
            interface="action-sheet"
            placeholder="Select a role"
          >
            {TEAM_ROLES.map((role) => (
              <IonSelectOption key={role.value} value={role.value}>{role.label}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Invite Method</IonLabel>
          <IonSelect
            value={inviteForm.method}
            onIonChange={(e) => setInviteForm({ ...inviteForm, method: e.detail.value })}
            interface="action-sheet"
          >
            <IonSelectOption value="EMAIL">Email Only</IonSelectOption>
            <IonSelectOption value="NOTIFICATION">Notification Only</IonSelectOption>
            <IonSelectOption value="BOTH">Email + Notification</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Skills</IonLabel>
          <IonInput
            value={inviteForm.skills}
            onIonInput={(e) => setInviteForm({ ...inviteForm, skills: e.detail.value || "" })}
            placeholder="Guitar, Vocals (comma separated)"
            clearInput
          />
        </IonItem>
      </PlatformBottomSheet>
    </div>
  );
};
