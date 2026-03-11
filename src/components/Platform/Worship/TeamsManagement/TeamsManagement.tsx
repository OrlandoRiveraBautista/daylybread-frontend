import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonSearchbar,
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonBadge,
  IonIcon,
  IonText,
} from "@ionic/react";
import { people, personCircle, mailOutline, businessOutline, checkmark, close, shieldCheckmark } from "ionicons/icons";
import {
  useGetWorshipTeams,
  useCreateWorshipTeam,
  useDeleteWorshipTeam,
  useGetMyInvites,
  useRespondToInvite,
} from "../../../../hooks/WorshipTeamHooks";
import { AddCard } from "../../AddCard";
import { ItemCard } from "../../ItemCard";
import { useAppContext } from "../../../../context/context";
import { useDeleteWithAnimation } from "../../../../hooks/useDeleteWithAnimation";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import { WorshipPageHeader } from "../shared/WorshipPageHeader";
import { WorshipLoadingState } from "../shared/WorshipLoadingState";
import EmptyState from "../../../EmptyState/EmptyState";
import { WorshipDeleteModal } from "../shared/WorshipDeleteModal";
import "./TeamsManagement.scss";

type Tab = "all" | "mine" | "invited";

export const TeamsManagement: React.FC = () => {
  const history = useHistory();
  const { userInfo } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newTeam, setNewTeam] = useState({ name: "", description: "" });
  const [respondingId, setRespondingId] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetWorshipTeams();
  const { data: invitesData, loading: invitesLoading, refetch: refetchInvites } = useGetMyInvites();
  const [createTeam, { loading: isCreating }] = useCreateWorshipTeam();
  const [deleteTeam, { loading: isDeleting }] = useDeleteWorshipTeam();
  const [respondToInvite] = useRespondToInvite();

  const allTeams = data?.getWorshipTeams?.results ?? [];
  const myInvites = invitesData?.getMyInvites?.results ?? [];

  const myTeams = allTeams.filter((t) => t.author?._id === userInfo?._id);
  const joinedTeams = allTeams.filter((t) => t.author?._id !== userInfo?._id);

  const { deletingId, handleDelete } = useDeleteWithAnimation(
    (opts) => deleteTeam(opts),
    refetch,
  );

  const filterTeams = (teams: typeof allTeams) =>
    teams.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deletingId === t._id,
    );

  const handleCreate = async () => {
    if (!newTeam.name.trim()) return;
    try {
      await createTeam({
        variables: {
          options: {
            name: newTeam.name,
            description: newTeam.description || undefined,
          },
        },
      });
      setShowCreateModal(false);
      setNewTeam({ name: "", description: "" });
    } catch (err) {
      console.error("Error creating team:", err);
    }
  };

  const handleRespond = async (inviteId: string, accept: boolean) => {
    setRespondingId(inviteId);
    try {
      await respondToInvite({ variables: { inviteId, accept } });
      await Promise.all([refetch(), refetchInvites()]);
    } catch (err) {
      console.error("Error responding to invite:", err);
    } finally {
      setRespondingId(null);
    }
  };

  const ownerName = (team: (typeof allTeams)[number]) => {
    const { firstName, lastName } = team.author ?? {};
    return [firstName, lastName].filter(Boolean).join(" ") || "Unknown";
  };

  const teamGrid = (teams: typeof allTeams, showAddCard = false, showInvitedBadge = false) => {
    const filtered = filterTeams(teams);
    if (!loading && !error && filtered.length === 0 && !showAddCard) {
      return (
        <EmptyState
          icon={people}
          title="No Teams Here"
          description={activeTab === "mine" ? "Create your first worship team to get started." : "You haven't joined any teams yet."}
          actionLabel={activeTab === "mine" ? "Create Team" : undefined}
          onAction={activeTab === "mine" ? () => setShowCreateModal(true) : undefined}
        />
      );
    }
    return (
      <div className="teams-grid">
        {showAddCard && (
          <AddCard label="New Team" onClick={() => setShowCreateModal(true)} color="primary" className="team-card" />
        )}
        {filtered.map((team) => {
          const isBeingDeleted = deletingId === team._id;
          const isOwner = team.author?._id === userInfo?._id;
          const isInvited = !isOwner;
          const badges: { text: string; color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "medium" }[] = [
            { text: `${team.members?.length ?? 0} members`, color: "primary" },
          ];
          if (showInvitedBadge && isInvited) {
            badges.push({ text: "Invited", color: "tertiary" });
          }
          return (
            <ItemCard
              key={team._id}
              icon={people}
              iconClassName="team-icon"
              title={team.name}
              subtitle={team.description ?? undefined}
              badges={badges}
              metadata={
                <div className="team-card__owner">
                  <IonIcon icon={personCircle} />
                  <span>{isOwner ? "You (owner)" : ownerName(team)}</span>
                </div>
              }
              onClick={() => history.push(`/worship/teams/${team._id}`)}
              onEdit={() => history.push(`/worship/teams/${team._id}`)}
              onDelete={isOwner ? () => setShowDeleteConfirm(team._id) : undefined}
              isDeleting={isBeingDeleted}
              className="team-card"
              searchWords={searchQuery ? [searchQuery] : []}
            />
          );
        })}
      </div>
    );
  };

  const invitedByName = (invite: (typeof myInvites)[number]) => {
    const { firstName, lastName } = invite.invitedBy ?? {};
    return [firstName, lastName].filter(Boolean).join(" ") || "Someone";
  };

  const pendingInviteCount = myInvites.length;
  const invitedTabCount = pendingInviteCount + joinedTeams.length;

  return (
    <div className="teams-container">
      <WorshipNav />

      <WorshipPageHeader
        classPrefix="teams"
        title="Worship Teams"
        subtitle="Manage your worship teams and members"
        onBack={() => history.push("/worship")}
        actionLabel="New Team"
        onAction={() => setShowCreateModal(true)}
      />

      <IonSegment
        value={activeTab}
        onIonChange={(e) => setActiveTab(e.detail.value as Tab)}
        className="teams-tabs"
      >
        <IonSegmentButton value="all">
          <IonLabel>All Teams</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="mine">
          <IonLabel>My Teams</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="invited">
          <IonLabel>
            Invited
            {invitedTabCount > 0 && (
              <IonBadge color={pendingInviteCount > 0 ? "danger" : "tertiary"} className="teams-tabs__badge">{invitedTabCount}</IonBadge>
            )}
          </IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {activeTab !== "invited" && (
        <div className="teams-search">
          <IonSearchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value || "")}
            placeholder="Search teams..."
            debounce={300}
          />
        </div>
      )}

      {/* ── All Teams ── */}
      {activeTab === "all" && (
        <>
          {loading && <WorshipLoadingState message="Loading teams..." />}
          {error && (
            <IonCard className="error-card">
              <IonCardContent>
                <p>Error loading teams. Please try again.</p>
                <IonButton onClick={() => refetch()} shape="round" color="primary">Retry</IonButton>
              </IonCardContent>
            </IonCard>
          )}
          {!loading && !error && filterTeams(allTeams).length === 0 && (
            <EmptyState
              icon={people}
              title="No Teams Yet"
              description="Create your first worship team to get started."
              actionLabel="Create Team"
              onAction={() => setShowCreateModal(true)}
            />
          )}
          {!loading && !error && filterTeams(allTeams).length > 0 && teamGrid(allTeams, true, true)}
        </>
      )}

      {/* ── My Teams ── */}
      {activeTab === "mine" && (
        <>
          {loading && <WorshipLoadingState message="Loading teams..." />}
          {!loading && (
              myTeams.length === 0 && !searchQuery
              ? (
                <EmptyState
                  icon={people}
                  title="No Teams Yet"
                  description="Create your first worship team to get started."
                  actionLabel="Create Team"
                  onAction={() => setShowCreateModal(true)}
                />
              )
              : teamGrid(myTeams, true, false)
          )}
        </>
      )}

      {/* ── Joined (non-owned) Teams ── */}
      {activeTab === "all" && joinedTeams.length > 0 && !loading && !error && (
        <></>
      )}

      {/* ── Invited Tab ── */}
      {activeTab === "invited" && (
        <>
          {(invitesLoading || loading) && <WorshipLoadingState message="Loading invitations..." />}

          {/* Pending invites section */}
          {!invitesLoading && myInvites.length > 0 && (
            <div className="invited-section">
              <div className="invited-section__header">
                <h2 className="invited-section__title">Pending Invitations</h2>
                <IonBadge color="danger" className="invited-section__count">{myInvites.length}</IonBadge>
              </div>
              <div className="invites-list">
                {myInvites.map((invite) => {
                  const by = invite.invitedBy;
                  const isResponding = respondingId === invite._id;
                  return (
                    <IonCard key={invite._id} className="invite-card">
                      <IonCardContent>
                        <div className="invite-card__top">
                          <div className="invite-card__team-info">
                            <IonIcon icon={people} className="invite-card__team-icon" />
                            <div>
                              <h3 className="invite-card__team-name">{invite.team?.name}</h3>
                              {invite.team?.description && (
                                <p className="invite-card__team-desc">{invite.team.description}</p>
                              )}
                            </div>
                          </div>
                          <IonBadge color="warning" className="invite-card__role-badge">
                            {invite.role?.replace(/_/g, " ")}
                          </IonBadge>
                        </div>

                        <div className="invite-card__divider" />

                        <div className="invite-card__owner">
                          <p className="invite-card__owner-label">Invited by</p>
                          <div className="invite-card__owner-row">
                            <IonIcon icon={personCircle} className="invite-card__owner-avatar" />
                            <div className="invite-card__owner-details">
                              <span className="invite-card__owner-name">{invitedByName(invite)}</span>
                              {by?.churchName && (
                                <span className="invite-card__owner-meta">
                                  <IonIcon icon={businessOutline} />
                                  {by.churchName}
                                </span>
                              )}
                              {by?.email && (
                                <a
                                  href={`mailto:${by.email}`}
                                  className="invite-card__owner-meta invite-card__owner-email"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <IonIcon icon={mailOutline} />
                                  {by.email}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {invite.skills && invite.skills.length > 0 && (
                          <div className="invite-card__skills">
                            {invite.skills.map((s) => (
                              <IonBadge key={s} color="medium" className="invite-card__skill-badge">
                                {s}
                              </IonBadge>
                            ))}
                          </div>
                        )}

                        <IonText color="medium" className="invite-card__expires">
                          Expires {new Date(invite.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </IonText>

                        <div className="invite-card__actions">
                          <IonButton
                            fill="solid"
                            shape="round"
                            color="success"
                            disabled={isResponding}
                            onClick={() => handleRespond(invite._id, true)}
                          >
                            <IonIcon slot="start" icon={checkmark} />
                            Accept
                          </IonButton>
                          <IonButton
                            fill="outline"
                            shape="round"
                            color="danger"
                            disabled={isResponding}
                            onClick={() => handleRespond(invite._id, false)}
                          >
                            <IonIcon slot="start" icon={close} />
                            Decline
                          </IonButton>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* Joined teams section */}
          {!loading && (
            <div className="invited-section">
              <div className="invited-section__header">
                <IonIcon icon={shieldCheckmark} className="invited-section__icon" />
                <h2 className="invited-section__title">Teams You've Joined</h2>
              </div>
              {joinedTeams.length === 0 ? (
                <EmptyState
                  icon={personCircle}
                  title="No Joined Teams"
                  description="Teams you've been invited to and accepted will appear here."
                />
              ) : (
                <div className="teams-grid">
                  {joinedTeams.map((team) => {
                    const isBeingDeleted = deletingId === team._id;
                    return (
                      <ItemCard
                        key={team._id}
                        icon={people}
                        iconClassName="team-icon"
                        title={team.name}
                        subtitle={team.description ?? undefined}
                        badges={[
                          { text: `${team.members?.length ?? 0} members`, color: "primary" },
                          { text: "Invited", color: "tertiary" },
                        ]}
                        metadata={
                          <div className="team-card__owner">
                            <IonIcon icon={personCircle} />
                            <span>{ownerName(team)}</span>
                          </div>
                        }
                        onClick={() => history.push(`/worship/teams/${team._id}`)}
                        onEdit={() => history.push(`/worship/teams/${team._id}`)}
                        isDeleting={isBeingDeleted}
                        className="team-card"
                        searchWords={searchQuery ? [searchQuery] : []}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Empty state when nothing at all */}
          {!invitesLoading && !loading && myInvites.length === 0 && joinedTeams.length === 0 && (
            <EmptyState
              icon={personCircle}
              title="No Invitations Yet"
              description="When someone invites you to a worship team, it will appear here."
            />
          )}
        </>
      )}

      <PlatformBottomSheet
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); setNewTeam({ name: "", description: "" }); }}
        title="Create Team"
        onSave={handleCreate}
        saveLabel="Create Team"
        saveDisabled={!newTeam.name.trim()}
        isSaving={isCreating}
        breakpoints={[0, 0.65, 0.85]}
        initialBreakpoint={0.65}
      >
        <IonItem lines="none">
          <IonLabel position="stacked">Team Name *</IonLabel>
          <IonInput
            value={newTeam.name}
            onIonInput={(e) => setNewTeam({ ...newTeam, name: e.detail.value || "" })}
            placeholder="e.g. Sunday Morning Team"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Description</IonLabel>
          <IonTextarea
            value={newTeam.description}
            onIonInput={(e) => setNewTeam({ ...newTeam, description: e.detail.value || "" })}
            placeholder="Optional description..."
            rows={3}
            autoGrow
          />
        </IonItem>
      </PlatformBottomSheet>

      <WorshipDeleteModal
        isOpen={!!showDeleteConfirm}
        onDismiss={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDelete(showDeleteConfirm!, () => setShowDeleteConfirm(null))}
        isDeleting={isDeleting}
        title="Delete Team"
        message="This will remove the team and all its members. This action cannot be undone."
        confirmLabel="Delete Team"
      />
    </div>
  );
};
