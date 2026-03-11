import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { trash, people, musicalNotes, time, calendar } from "ionicons/icons";
import { useGetRehearsals, useCreateRehearsal, useDeleteRehearsal, useGetWorshipServices } from "../../../../hooks/WorshipServiceHooks";
import { useGetWorshipTeams } from "../../../../hooks/WorshipTeamHooks";
import { useGetSongs } from "../../../../hooks/SongHooks";
import { parseServiceDate } from "../../../../utils/serviceDate";
import { useAppContext } from "../../../../context/context";
import { useDeleteWithAnimation } from "../../../../hooks/useDeleteWithAnimation";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import { WorshipPageHeader } from "../shared/WorshipPageHeader";
import { WorshipLoadingState } from "../shared/WorshipLoadingState";
import EmptyState from "../../../EmptyState/EmptyState";
import { WorshipDeleteModal } from "../shared/WorshipDeleteModal";
import "./RehearsalsManagement.scss";

export const RehearsalsManagement: React.FC = () => {
  const history = useHistory();
  const { userInfo } = useAppContext();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newRehearsal, setNewRehearsal] = useState({ teamId: "", serviceId: "", date: "", notes: "", songIds: [] as string[] });

  const { data, loading, error, refetch } = useGetRehearsals();
  const { data: teamsData } = useGetWorshipTeams();
  const { data: servicesData } = useGetWorshipServices();
  const { data: songsData } = useGetSongs();
  const [createRehearsal, { loading: isCreating }] = useCreateRehearsal();
  const [deleteRehearsal, { loading: isDeleting }] = useDeleteRehearsal();

  const rehearsals: any[] = data?.getRehearsals?.results || [];
  const teams: any[] = teamsData?.getWorshipTeams?.results || [];
  const services: any[] = servicesData?.getWorshipServices?.results || [];
  const songs: any[] = songsData?.getSongs?.results || [];
  const ownedTeams = teams.filter((t) => t.author?._id === userInfo?._id);
  const canCreateRehearsal = ownedTeams.length > 0;

  const { deletingId, handleDelete } = useDeleteWithAnimation(
    (opts) => deleteRehearsal(opts),
    refetch,
  );

  const handleCreate = async () => {
    if (!newRehearsal.teamId || !newRehearsal.serviceId || !newRehearsal.date) return;
    try {
      await createRehearsal({
        variables: {
          options: {
            teamId: newRehearsal.teamId,
            serviceId: newRehearsal.serviceId,
            date: newRehearsal.date,
            notes: newRehearsal.notes || undefined,
            songIds: newRehearsal.songIds.length > 0 ? newRehearsal.songIds : undefined,
          },
        },
      });
      setShowCreateModal(false);
      setNewRehearsal({ teamId: "", serviceId: "", date: "", notes: "", songIds: [] });
    } catch (err) {
      console.error("Error creating rehearsal:", err);
    }
  };

  return (
    <div className="rehearsals-container">
      <WorshipNav />

      <WorshipPageHeader
        classPrefix="rehearsals"
        title="Rehearsals"
        subtitle="Schedule and manage practice sessions"
        onBack={() => history.push("/worship")}
        actionLabel="New Rehearsal"
        onAction={() => setShowCreateModal(true)}
        showAction={canCreateRehearsal}
      />

      {loading && <WorshipLoadingState message="Loading rehearsals..." />}

      {!loading && !error && rehearsals.length === 0 && (
        <EmptyState
          icon={time}
          title="No Rehearsals Yet"
          description="Schedule a rehearsal to prepare your worship team."
          actionLabel={canCreateRehearsal ? "Schedule Rehearsal" : undefined}
          onAction={canCreateRehearsal ? () => setShowCreateModal(true) : undefined}
        />
      )}

      {!loading && !error && rehearsals.length > 0 && (
        <div className="rehearsals-list">
          {rehearsals.map((rehearsal: any) => {
            const isBeingDeleted = deletingId === rehearsal._id;
            const isOwner = rehearsal.author?._id === userInfo?._id;
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
                      {rehearsal.service && (
                        <span className="rehearsal-card__meta-item">
                          <IonIcon icon={calendar} />
                          {rehearsal.service.name}
                        </span>
                      )}
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
                  {isOwner && (
                    <IonButton fill="clear" size="small" shape="round" color="danger" disabled={isBeingDeleted}
                      onClick={() => setShowDeleteConfirm(rehearsal._id)}>
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonButton>
                  )}
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>
      )}

      <PlatformBottomSheet
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); setNewRehearsal({ teamId: "", serviceId: "", date: "", notes: "", songIds: [] }); }}
        title="Schedule Rehearsal"
        onSave={handleCreate}
        saveLabel="Schedule Rehearsal"
        saveDisabled={!newRehearsal.teamId || !newRehearsal.serviceId || !newRehearsal.date}
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
            {ownedTeams.map((team: any) => (
              <IonSelectOption key={team._id} value={team._id}>{team.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Service *</IonLabel>
          <IonSelect
            value={newRehearsal.serviceId}
            onIonChange={(e) => setNewRehearsal({ ...newRehearsal, serviceId: e.detail.value })}
            interface="action-sheet"
            placeholder="Select a service"
          >
            {services.map((service: any) => (
              <IonSelectOption key={service._id} value={service._id}>
                {service.name} — {parseServiceDate(service.date).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}
              </IonSelectOption>
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

      <WorshipDeleteModal
        isOpen={!!showDeleteConfirm}
        onDismiss={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDelete(showDeleteConfirm!, () => setShowDeleteConfirm(null))}
        isDeleting={isDeleting}
        title="Delete Rehearsal"
        message="This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
};
