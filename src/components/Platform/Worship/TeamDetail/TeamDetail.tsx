import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonToast,
} from "@ionic/react";
import { personAdd, mail } from "ionicons/icons";
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
import { WorshipPageHeader } from "../shared/WorshipPageHeader";
import { WorshipLoadingState } from "../shared/WorshipLoadingState";
import { TeamMembersList } from "./TeamMembersList";
import { TeamInvitesList } from "./TeamInvitesList";
import { TEAM_ROLES } from "../../../../utils/worshipConstants";
import "./TeamDetail.scss";

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
  const [inviteForm, setInviteForm] = useState({ email: "", role: "OTHER", method: "BOTH", skills: "" });

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
      setToast({ message: `Invite sent to ${inviteForm.email} via ${methodLabel}.`, color: "success" });
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

  if (loading) {
    return (
      <div className="team-detail">
        <WorshipLoadingState message="Loading team..." />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="team-detail">
        <IonButton fill="clear" onClick={() => history.push("/worship/teams")}>
          Back to Teams
        </IonButton>
        <p>Team not found.</p>
      </div>
    );
  }

  return (
    <div className="team-detail">
      <WorshipNav />

      <WorshipPageHeader
        classPrefix="team-detail"
        title={team.name}
        subtitle={team.description ?? undefined}
        onBack={() => history.push("/worship/teams")}
        actionLabel="Invite"
        actionIcon={personAdd}
        onAction={() => setShowInviteModal(true)}
        showAction={isOwner}
      />

      <IonSegment
        value={activeTab}
        onIonChange={(e) => setActiveTab(e.detail.value as any)}
        className="team-detail__tabs"
      >
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
        <TeamMembersList
          members={members}
          isOwner={isOwner}
          removingMemberId={removingMemberId}
          onRemoveMember={handleRemoveMember}
          authorId={team.author?._id}
        />
      )}

      {activeTab === "invites" && (
        <TeamInvitesList
          invites={invites}
          resendingInviteId={resendingInviteId}
          cancellingInviteId={cancellingInviteId}
          onResendInvite={handleResendInvite}
          onCancelInvite={handleCancelInvite}
        />
      )}

      <IonToast
        isOpen={!!toast}
        message={toast?.message}
        color={toast?.color}
        duration={4000}
        position="top"
        onDidDismiss={() => setToast(null)}
      />

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
