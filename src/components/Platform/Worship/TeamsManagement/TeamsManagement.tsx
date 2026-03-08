import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSpinner,
  IonSearchbar,
  IonInput,
  IonTextarea,
  IonBadge,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { add, people, trash, create, arrowBack } from "ionicons/icons";
import {
  useGetWorshipTeams,
  useCreateWorshipTeam,
  useDeleteWorshipTeam,
} from "../../../../hooks/WorshipTeamHooks";
import { useAppContext } from "../../../../context/context";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import "./TeamsManagement.scss";

export const TeamsManagement: React.FC = () => {
  const history = useHistory();
  const { userInfo } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newTeam, setNewTeam] = useState({ name: "", description: "" });

  const { data, loading, error, refetch } = useGetWorshipTeams();
  const [createTeam, { loading: isCreating }] = useCreateWorshipTeam();
  const [deleteTeam, { loading: isDeleting }] = useDeleteWorshipTeam();

  const teams: any[] = data?.getWorshipTeams?.results || [];

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch || deletingId === team._id;
  });

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

  const handleDelete = async (teamId: string) => {
    try {
      setDeletingId(teamId);
      setShowDeleteConfirm(null);
      setTimeout(async () => {
        try {
          await deleteTeam({ variables: { id: teamId } });
          await refetch();
        } finally {
          setDeletingId(null);
        }
      }, 300);
    } catch (err) {
      console.error("Error deleting team:", err);
      setDeletingId(null);
    }
  };

  return (
    <div className="teams-container">
      <WorshipNav />
      <div className="teams-header">
        <div className="teams-header__left">
          <IonButton fill="clear" size="small" shape="round" onClick={() => history.push("/worship")}>
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <div>
            <h1>Worship Teams</h1>
            <p>Manage your worship teams and members</p>
          </div>
        </div>
        <IonButton size="large" fill="solid" shape="round" color="primary" onClick={() => setShowCreateModal(true)}>
          <IonIcon slot="start" icon={add} />
          New Team
        </IonButton>
      </div>

      <div className="teams-search">
        <IonSearchbar
          value={searchQuery}
          onIonInput={(e) => setSearchQuery(e.detail.value || "")}
          placeholder="Search teams..."
          debounce={300}
        />
      </div>

      {loading && (
        <div className="loading-state">
          <IonSpinner name="crescent" />
          <p>Loading teams...</p>
        </div>
      )}

      {error && (
        <IonCard className="error-card">
          <IonCardContent>
            <p>Error loading teams. Please try again.</p>
            <IonButton onClick={() => refetch()} shape="round" color="primary">Retry</IonButton>
          </IonCardContent>
        </IonCard>
      )}

      {!loading && !error && filteredTeams.length === 0 && (
        <div className="empty-state-container">
          <IonCard className="empty-state-card">
            <IonCardContent>
              <div className="empty-state">
                <div className="empty-state-icon-wrapper">
                  <IonIcon icon={people} className="empty-state-icon" />
                </div>
                <h2>No Teams Yet</h2>
                <p className="empty-state-description">Create your first worship team to get started.</p>
                <IonButton size="large" fill="solid" shape="round" color="primary" onClick={() => setShowCreateModal(true)} className="empty-state-button">
                  <IonIcon slot="start" icon={add} />
                  Create Team
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      )}

      {!loading && !error && filteredTeams.length > 0 && (
        <div className="teams-grid">
          <IonCard className="team-card new-team-card" onClick={() => setShowCreateModal(true)} button>
            <IonCardContent>
              <div className="new-team-content">
                <IonIcon icon={add} className="add-icon" />
                <span>New Team</span>
              </div>
            </IonCardContent>
          </IonCard>

          {filteredTeams.map((team) => {
            const isBeingDeleted = deletingId === team._id;
            const isOwner = team.author?._id === userInfo?._id;
            return (
              <IonCard
                key={team._id}
                className={`team-card ${isBeingDeleted ? "deleting" : ""}`}
                onClick={() => !isBeingDeleted && history.push(`/worship/teams/${team._id}`)}
                button={!isBeingDeleted}
              >
                <IonCardContent>
                  <div className="team-card__header">
                    <IonIcon icon={people} className="team-icon" />
                    <IonBadge color="primary">{team.members?.length || 0} members</IonBadge>
                  </div>
                  <h3 className="team-card__name">{team.name}</h3>
                  {team.description && <p className="team-card__desc">{team.description}</p>}
                  <div className="team-card__actions" onClick={(e) => e.stopPropagation()}>
                    <IonButton fill="clear" size="small" shape="round" color="primary" disabled={isBeingDeleted}
                      onClick={(e) => { e.stopPropagation(); history.push(`/worship/teams/${team._id}`); }}>
                      <IonIcon slot="icon-only" icon={create} />
                    </IonButton>
                    {isOwner && (
                      <IonButton fill="clear" size="small" shape="round" color="danger" disabled={isBeingDeleted}
                        onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(team._id); }}>
                        <IonIcon slot="icon-only" icon={trash} />
                      </IonButton>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>
      )}

      {/* Create Team Modal */}
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

      {/* Delete Confirmation Modal */}
      <IonModal
        isOpen={!!showDeleteConfirm}
        onDidDismiss={() => setShowDeleteConfirm(null)}
        breakpoints={[0, 0.45]}
        initialBreakpoint={0.45}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Delete Team</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="worship-delete-confirm">
            <IonIcon icon={trash} className="worship-delete-icon" />
            <h2>Delete Team?</h2>
            <p>This will remove the team and all its members. This action cannot be undone.</p>
            <IonButton
              expand="block"
              size="large"
              shape="round"
              color="danger"
              style={{ width: "100%" }}
              onClick={() => handleDelete(showDeleteConfirm!)}
              disabled={isDeleting}
            >
              {isDeleting ? <IonSpinner name="crescent" /> : "Delete Team"}
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
