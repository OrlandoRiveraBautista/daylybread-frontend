import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSpinner,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { add, trash, arrowBack, people, musicalNotes, time } from "ionicons/icons";
import { useGetRehearsals, useCreateRehearsal, useDeleteRehearsal } from "../../../../hooks/WorshipServiceHooks";
import { useGetWorshipTeams } from "../../../../hooks/WorshipTeamHooks";
import { useGetSongs } from "../../../../hooks/SongHooks";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import "./RehearsalsManagement.scss";

export const RehearsalsManagement: React.FC = () => {
  const history = useHistory();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newRehearsal, setNewRehearsal] = useState({ teamId: "", date: "", notes: "", songIds: [] as string[] });

  const { data, loading, error, refetch } = useGetRehearsals();
  const { data: teamsData } = useGetWorshipTeams();
  const { data: songsData } = useGetSongs();
  const [createRehearsal, { loading: isCreating }] = useCreateRehearsal();
  const [deleteRehearsal, { loading: isDeleting }] = useDeleteRehearsal();

  const rehearsals: any[] = data?.getRehearsals?.results || [];
  const teams: any[] = teamsData?.getWorshipTeams?.results || [];
  const songs: any[] = songsData?.getSongs?.results || [];

  const handleCreate = async () => {
    if (!newRehearsal.teamId || !newRehearsal.date) return;
    try {
      await createRehearsal({
        variables: {
          options: {
            teamId: newRehearsal.teamId,
            date: newRehearsal.date,
            notes: newRehearsal.notes || undefined,
            songIds: newRehearsal.songIds.length > 0 ? newRehearsal.songIds : undefined,
          },
        },
      });
      setShowCreateModal(false);
      setNewRehearsal({ teamId: "", date: "", notes: "", songIds: [] });
    } catch (err) {
      console.error("Error creating rehearsal:", err);
    }
  };

  const handleDelete = async (rehearsalId: string) => {
    try {
      setDeletingId(rehearsalId);
      setShowDeleteConfirm(null);
      setTimeout(async () => {
        try {
          await deleteRehearsal({ variables: { id: rehearsalId } });
          await refetch();
        } finally { setDeletingId(null); }
      }, 300);
    } catch (err) { setDeletingId(null); }
  };

  return (
    <div className="rehearsals-container">
      <WorshipNav />
      <div className="rehearsals-header">
        <div className="rehearsals-header__left">
          <IonButton fill="clear" size="small" shape="round" onClick={() => history.push("/worship")}>
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <div>
            <h1>Rehearsals</h1>
            <p>Schedule and manage practice sessions</p>
          </div>
        </div>
        <IonButton size="large" fill="solid" shape="round" color="primary" onClick={() => setShowCreateModal(true)}>
          <IonIcon slot="start" icon={add} />
          New Rehearsal
        </IonButton>
      </div>

      {loading && (
        <div className="loading-state"><IonSpinner name="crescent" /><p>Loading rehearsals...</p></div>
      )}

      {!loading && !error && rehearsals.length === 0 && (
        <div className="empty-state-container">
          <IonCard className="empty-state-card">
            <IonCardContent>
              <div className="empty-state">
                <div className="empty-state-icon-wrapper">
                  <IonIcon icon={time} className="empty-state-icon" />
                </div>
                <h2>No Rehearsals Yet</h2>
                <p className="empty-state-description">Schedule a rehearsal to prepare your worship team.</p>
                <IonButton size="large" fill="solid" shape="round" color="primary" onClick={() => setShowCreateModal(true)} className="empty-state-button">
                  <IonIcon slot="start" icon={add} />
                  Schedule Rehearsal
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      )}

      {!loading && !error && rehearsals.length > 0 && (
        <div className="rehearsals-list">
          {rehearsals.map((rehearsal: any) => {
            const isBeingDeleted = deletingId === rehearsal._id;
            const rehearsalDate = new Date(Number(rehearsal.date));
            const rehearsalSongs = rehearsal.songIds
              ? songs.filter((s: any) => rehearsal.songIds.includes(s._id))
              : [];

            return (
              <IonCard key={rehearsal._id} className={`rehearsal-card ${isBeingDeleted ? "deleting" : ""}`}>
                <IonCardContent>
                  <div className="rehearsal-card__date">
                    <span className="rehearsal-card__day">{rehearsalDate.toLocaleDateString("en-US", { day: "numeric" })}</span>
                    <span className="rehearsal-card__month">{rehearsalDate.toLocaleDateString("en-US", { month: "short" })}</span>
                  </div>
                  <div className="rehearsal-card__info">
                    <h3>Rehearsal</h3>
                    <div className="rehearsal-card__meta">
                      <span className="rehearsal-card__meta-item">
                        <IonIcon icon={people} />
                        {rehearsal.team?.name}
                      </span>
                      {rehearsalSongs.length > 0 && (
                        <span className="rehearsal-card__meta-item">
                          <IonIcon icon={musicalNotes} />
                          {rehearsalSongs.length} songs
                        </span>
                      )}
                    </div>
                    {rehearsal.notes && (
                      <IonText color="medium"><p className="rehearsal-card__notes">{rehearsal.notes}</p></IonText>
                    )}
                    {rehearsalSongs.length > 0 && (
                      <div className="rehearsal-card__songs">
                        {rehearsalSongs.map((song: any) => (
                          <span key={song._id} className="rehearsal-song-tag">{song.title}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <IonButton fill="clear" size="small" shape="round" color="danger" disabled={isBeingDeleted}
                    onClick={() => setShowDeleteConfirm(rehearsal._id)}>
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonButton>
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>
      )}

      {/* Create Rehearsal Modal */}
      <PlatformBottomSheet
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); setNewRehearsal({ teamId: "", date: "", notes: "", songIds: [] }); }}
        title="Schedule Rehearsal"
        onSave={handleCreate}
        saveLabel="Schedule Rehearsal"
        saveDisabled={!newRehearsal.teamId || !newRehearsal.date}
        isSaving={isCreating}
        breakpoints={[0, 0.75, 0.95]}
        initialBreakpoint={0.75}
      >
        <IonItem lines="none">
          <IonLabel position="stacked">Team *</IonLabel>
          <IonSelect
            value={newRehearsal.teamId}
            onIonChange={(e) => setNewRehearsal({ ...newRehearsal, teamId: e.detail.value })}
            interface="action-sheet"
            placeholder="Select a team"
          >
            {teams.map((team: any) => (
              <IonSelectOption key={team._id} value={team._id}>{team.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Date *</IonLabel>
          <IonInput
            value={newRehearsal.date}
            onIonInput={(e) => setNewRehearsal({ ...newRehearsal, date: e.detail.value || "" })}
            type="date"
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Songs to Practice</IonLabel>
          <IonSelect
            value={newRehearsal.songIds}
            onIonChange={(e) => setNewRehearsal({ ...newRehearsal, songIds: e.detail.value || [] })}
            interface="action-sheet"
            placeholder="Select songs (optional)"
            multiple
          >
            {songs.map((song: any) => (
              <IonSelectOption key={song._id} value={song._id}>{song.title}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Notes</IonLabel>
          <IonTextarea
            value={newRehearsal.notes}
            onIonInput={(e) => setNewRehearsal({ ...newRehearsal, notes: e.detail.value || "" })}
            placeholder="Optional notes..."
            rows={3}
            autoGrow
          />
        </IonItem>
      </PlatformBottomSheet>

      {/* Delete Confirmation Modal */}
      <IonModal isOpen={!!showDeleteConfirm} onDidDismiss={() => setShowDeleteConfirm(null)} breakpoints={[0, 0.45]} initialBreakpoint={0.45}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Delete Rehearsal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="worship-delete-confirm">
            <IonIcon icon={trash} className="worship-delete-icon" />
            <h2>Delete Rehearsal?</h2>
            <p>This action cannot be undone.</p>
            <IonButton
              expand="block"
              size="large"
              shape="round"
              color="danger"
              style={{ width: "100%" }}
              onClick={() => handleDelete(showDeleteConfirm!)}
              disabled={isDeleting}
            >
              {isDeleting ? <IonSpinner name="crescent" /> : "Delete"}
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
