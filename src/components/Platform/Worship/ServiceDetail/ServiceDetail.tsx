import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonInput,
  IonItem,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonReorder,
  IonReorderGroup,
} from "@ionic/react";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import {
  arrowBack,
  personAdd,
  checkmarkCircle,
  closeCircle,
  time,
  add,
  trash,
  playCircle,
  createOutline,
} from "ionicons/icons";
import {
  useGetWorshipService,
  useCreateServiceAssignment,
  useRemoveServiceAssignment,
  useCreateSetlist,
  useAddSetlistItem,
  useRemoveSetlistItem,
  useUpdateSetlistItem,
  useReorderSetlistItems,
} from "../../../../hooks/WorshipServiceHooks";
import { useGetTeamMembers } from "../../../../hooks/WorshipTeamHooks";
import { ServiceStatus, TeamRole } from "../../../../__generated__/graphql";
import { useGetSongs } from "../../../../hooks/SongHooks";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import "./ServiceDetail.scss";

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

export const ServiceDetail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"assignments" | "setlist">("assignments");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [removingAssignmentId, setRemovingAssignmentId] = useState<string | null>(null);
  const [removingSongId, setRemovingSongId] = useState<string | null>(null);
  const [assignForm, setAssignForm] = useState({ memberId: "", role: "OTHER" });
  const [songForm, setSongForm] = useState({ songId: "", key: "", bpm: "", notes: "" });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editForm, setEditForm] = useState({ key: "", bpm: "", notes: "" });

  const { data, loading, refetch } = useGetWorshipService(id);
  const [createAssignment, { loading: isAssigning }] = useCreateServiceAssignment();
  const [removeAssignment] = useRemoveServiceAssignment();
  const [createSetlist] = useCreateSetlist();
  const [addSetlistItem, { loading: isAddingSong }] = useAddSetlistItem();
  const [removeSetlistItem] = useRemoveSetlistItem();
  const [updateSetlistItem, { loading: isUpdatingItem }] = useUpdateSetlistItem();
  const [reorderSetlistItems] = useReorderSetlistItems();

  const service = data?.getWorshipService?.results;
  const teamId = service?.team?._id;

  const { data: membersData } = useGetTeamMembers(teamId || "");
  const { data: songsData } = useGetSongs();

  const assignments = service?.assignments || [];
  const setlist = service?.setlist;
  const setlistItems = setlist?.items || [];
  const teamMembers = membersData?.getTeamMembers?.results || [];
  const songs = songsData?.getSongs?.results || [];

  const handleAssign = async () => {
    if (!assignForm.memberId) return;
    try {
      await createAssignment({
        variables: {
          options: {
            serviceId: id,
            memberId: assignForm.memberId,
            role: assignForm.role as TeamRole,
          },
        },
      });
      setShowAssignModal(false);
      setAssignForm({ memberId: "", role: "OTHER" });
      refetch();
    } catch (err) {
      console.error("Error assigning member:", err);
    }
  };

  const handleRemoveAssignment = async (assignmentId: string) => {
    try {
      setRemovingAssignmentId(assignmentId);
      await removeAssignment({ variables: { id: assignmentId } });
      refetch();
    } catch (err) {
      console.error("Error removing assignment:", err);
    } finally {
      setRemovingAssignmentId(null);
    }
  };

  const handleAddSong = async () => {
    if (!songForm.songId) return;

    let setlistId = setlist?._id;

    // Create setlist if it doesn't exist
    if (!setlistId) {
      try {
        const result = await createSetlist({
          variables: {
            options: {
              name: `${service?.name} Setlist`,
              serviceId: id,
            },
          },
        });
        setlistId = result.data?.createSetlist?.results?._id;
      } catch (err) {
        console.error("Error creating setlist:", err);
        return;
      }
    }

    try {
      await addSetlistItem({
        variables: {
          setlistId: setlistId!,
          options: {
            songId: songForm.songId,
            order: setlistItems.length + 1,
            key: songForm.key || undefined,
            bpm: songForm.bpm ? parseInt(songForm.bpm) : undefined,
            notes: songForm.notes || undefined,
          },
        },
      });
      setShowAddSongModal(false);
      setSongForm({ songId: "", key: "", bpm: "", notes: "" });
      refetch();
    } catch (err) {
      console.error("Error adding song to setlist:", err);
    }
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setEditForm({
      key: item.key || item.song?.defaultKey || "",
      bpm: item.bpm?.toString() || item.song?.bpm?.toString() || "",
      notes: item.notes || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    try {
      await updateSetlistItem({
        variables: {
          id: editingItem._id,
          options: {
            songId: editingItem.song._id,
            order: editingItem.order,
            key: editForm.key || undefined,
            bpm: editForm.bpm ? parseInt(editForm.bpm) : undefined,
            notes: editForm.notes || undefined,
          },
        },
      });
      setEditingItem(null);
      refetch();
    } catch (err) {
      console.error("Error updating setlist item:", err);
    }
  };

  const handleReorder = async (event: CustomEvent) => {
    const sortedItemsCopy = [...setlistItems].sort((a: any, b: any) => a.order - b.order);
    const movedItem = sortedItemsCopy.splice(event.detail.from, 1)[0];
    sortedItemsCopy.splice(event.detail.to, 0, movedItem);
    event.detail.complete();

    if (!setlist?._id) return;
    try {
      await reorderSetlistItems({
        variables: {
          setlistId: setlist._id,
          itemIds: sortedItemsCopy.map((item: any) => item._id),
        },
      });
      refetch();
    } catch (err) {
      console.error("Error reordering setlist:", err);
    }
  };

  const handleRemoveSongFromSetlist = async (itemId: string) => {
    try {
      setRemovingSongId(itemId);
      await removeSetlistItem({ variables: { id: itemId } });
      refetch();
    } catch (err) {
      console.error("Error removing song from setlist:", err);
    } finally {
      setRemovingSongId(null);
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
      default: return "warning";
    }
  };

  if (loading) {
    return (
      <div className="service-detail">
        <div className="loading-state"><IonSpinner name="crescent" /><p>Loading service...</p></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="service-detail">
        <IonButton fill="clear" onClick={() => history.push("/worship/services")}>
          <IonIcon slot="start" icon={arrowBack} />Back to Services
        </IonButton>
        <p>Service not found.</p>
      </div>
    );
  }

  const serviceDate = new Date(Number(service.date));

  return (
    <div className="service-detail">
      <WorshipNav />
      <div className="service-detail__header">
        <div className="service-detail__header-left">
          <IonButton fill="clear" size="small" shape="round" onClick={() => history.push("/worship/services")}>
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <div>
            <h1>{service.name}</h1>
            <div className="service-detail__meta">
              <span>{serviceDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              <span>·</span>
              <span>{service.team?.name}</span>
            </div>
          </div>
        </div>
        <div className="service-detail__header-right">
          {setlistItems.length > 0 && (
            <IonButton
              fill="solid"
              shape="round"
              color="primary"
              onClick={() => history.push(`/worship/services/${id}/live`)}
            >
              <IonIcon slot="start" icon={playCircle} />
              Start Service
            </IonButton>
          )}
          <IonBadge color={getStatusColor(service.status === ServiceStatus.Scheduled ? "accepted" : service.status)} className="service-detail__status">
            {service.status}
          </IonBadge>
        </div>
      </div>

      {service.notes && (
        <IonCard className="service-detail__notes-card">
          <IonCardContent>
            <IonText color="medium"><p>{service.notes}</p></IonText>
          </IonCardContent>
        </IonCard>
      )}

      <IonSegment value={activeTab} onIonChange={(e) => setActiveTab(e.detail.value as any)} className="service-detail__tabs">
        <IonSegmentButton value="assignments">
          <IonLabel>Lineup ({assignments.length})</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="setlist">
          <IonLabel>Setlist ({setlistItems.length})</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {activeTab === "assignments" && (
        <div className="assignments-section">
          <div className="section-action-bar">
            <IonButton fill="solid" shape="round" color="primary" onClick={() => setShowAssignModal(true)}>
              <IonIcon slot="start" icon={personAdd} />
              Assign Member
            </IonButton>
          </div>

          {assignments.length === 0 ? (
            <div className="empty-section"><p>No members assigned yet.</p></div>
          ) : (
            <div className="assignments-list">
              {assignments.map((assignment: any) => (
                <IonCard key={assignment._id} className="assignment-card">
                  <IonCardContent>
                    <div className="assignment-card__info">
                      <IonIcon icon={getStatusIcon(assignment.status)} color={getStatusColor(assignment.status)} className="assignment-card__status" />
                      <div className="assignment-card__details">
                        <h3>{assignment.member?.user?.firstName} {assignment.member?.user?.lastName}</h3>
                        <IonBadge color="primary">
                          {TEAM_ROLES.find((r) => r.value === assignment.role)?.label || assignment.role}
                        </IonBadge>
                      </div>
                    </div>
                    <IonButton fill="clear" size="small" shape="round" color="danger"
                      disabled={removingAssignmentId === assignment._id}
                      onClick={() => handleRemoveAssignment(assignment._id)}>
                      {removingAssignmentId === assignment._id
                        ? <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
                        : <IonIcon slot="icon-only" icon={trash} />}
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "setlist" && (
        <div className="setlist-section">
          <div className="section-action-bar">
            <IonButton fill="solid" shape="round" color="primary" onClick={() => setShowAddSongModal(true)}>
              <IonIcon slot="start" icon={add} />
              Add Song
            </IonButton>
          </div>

          {setlistItems.length === 0 ? (
            <div className="empty-section"><p>No songs in the setlist yet.</p></div>
          ) : (
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder} className="setlist-list">
              {[...setlistItems]
                .sort((a: any, b: any) => a.order - b.order)
                .map((item: any, index: number) => (
                  <IonCard key={item._id} className="setlist-item-card" button
                    onClick={() => history.push(`/worship/services/${id}/live?song=${index}`)}>
                    <IonCardContent>
                      <IonReorder slot="start" className="setlist-item__reorder" />
                      <div className="setlist-item__order">{index + 1}</div>
                      <div className="setlist-item__info">
                        <h3>{item.song?.title}</h3>
                        <div className="setlist-item__meta">
                          {item.song?.artist && <span>{item.song.artist}</span>}
                          {item.key && <IonBadge color="tertiary">{item.key}</IonBadge>}
                          {item.bpm && <IonBadge color="medium">{item.bpm} BPM</IonBadge>}
                        </div>
                        {item.notes && <IonText color="medium"><p className="setlist-item__notes">{item.notes}</p></IonText>}
                      </div>
                      <div className="setlist-item__actions" onClick={(e) => e.stopPropagation()}>
                        <IonButton fill="clear" size="small" shape="round" color="medium"
                          onClick={() => handleEditItem(item)}>
                          <IonIcon slot="icon-only" icon={createOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" shape="round" color="danger"
                          disabled={removingSongId === item._id}
                          onClick={() => handleRemoveSongFromSetlist(item._id)}>
                          {removingSongId === item._id
                            ? <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
                            : <IonIcon slot="icon-only" icon={trash} />}
                        </IonButton>
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}
            </IonReorderGroup>
          )}
        </div>
      )}

      {/* Assign Member Modal */}
      <PlatformBottomSheet
        isOpen={showAssignModal}
        onClose={() => { setShowAssignModal(false); setAssignForm({ memberId: "", role: "OTHER" }); }}
        title="Assign Member"
        onSave={handleAssign}
        saveLabel="Assign"
        saveDisabled={!assignForm.memberId}
        isSaving={isAssigning}
        breakpoints={[0, 0.6, 0.75]}
        initialBreakpoint={0.6}
      >
        <IonItem lines="none">
          <IonLabel position="stacked">Member *</IonLabel>
          <IonSelect
            value={assignForm.memberId}
            onIonChange={(e) => {
              const memberId = e.detail.value;
              const member = teamMembers.find((m: any) => m._id === memberId);
              setAssignForm({
                memberId,
                role: member?.role || "OTHER",
              });
            }}
            interface="action-sheet"
            placeholder="Select a member"
          >
            {teamMembers.map((m: any) => (
              <IonSelectOption key={m._id} value={m._id}>
                {m.user?.firstName} {m.user?.lastName}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Role</IonLabel>
          <IonSelect
            value={assignForm.role}
            onIonChange={(e) => setAssignForm({ ...assignForm, role: e.detail.value })}
            interface="action-sheet"
            placeholder="Select a role"
          >
            {TEAM_ROLES.map((role) => (
              <IonSelectOption key={role.value} value={role.value}>{role.label}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </PlatformBottomSheet>

      {/* Add Song to Setlist Modal */}
      <PlatformBottomSheet
        isOpen={showAddSongModal}
        onClose={() => { setShowAddSongModal(false); setSongForm({ songId: "", key: "", bpm: "", notes: "" }); }}
        title="Add Song to Setlist"
        onSave={handleAddSong}
        saveLabel="Add Song"
        saveDisabled={!songForm.songId}
        isSaving={isAddingSong}
        breakpoints={[0, 0.7, 0.9]}
        initialBreakpoint={0.7}
      >
        <IonItem lines="none">
          <IonLabel position="stacked">Song *</IonLabel>
          <IonSelect
            value={songForm.songId}
            onIonChange={(e) => {
              const selectedSong = songs.find((s: any) => s._id === e.detail.value);
              setSongForm({
                ...songForm,
                songId: e.detail.value,
                key: selectedSong?.defaultKey || "",
                bpm: selectedSong?.bpm?.toString() || "",
              });
            }}
            interface="action-sheet"
            placeholder="Select a song"
          >
            {songs.map((s: any) => (
              <IonSelectOption key={s._id} value={s._id}>
                {s.title}{s.artist ? ` - ${s.artist}` : ""}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Key</IonLabel>
          <IonInput
            value={songForm.key}
            onIonInput={(e) => setSongForm({ ...songForm, key: e.detail.value || "" })}
            placeholder="e.g. G"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">BPM</IonLabel>
          <IonInput
            value={songForm.bpm}
            onIonInput={(e) => setSongForm({ ...songForm, bpm: e.detail.value || "" })}
            placeholder="e.g. 120"
            type="number"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Notes</IonLabel>
          <IonInput
            value={songForm.notes}
            onIonInput={(e) => setSongForm({ ...songForm, notes: e.detail.value || "" })}
            placeholder="Optional notes..."
            clearInput
          />
        </IonItem>
      </PlatformBottomSheet>

      {/* Edit Setlist Item Modal */}
      <PlatformBottomSheet
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title={`Edit: ${editingItem?.song?.title || "Song"}`}
        onSave={handleSaveEdit}
        saveLabel="Save Changes"
        saveDisabled={false}
        isSaving={isUpdatingItem}
        breakpoints={[0, 0.6, 0.75]}
        initialBreakpoint={0.6}
      >
        <IonItem lines="none">
          <IonLabel position="stacked">Key</IonLabel>
          <IonInput
            value={editForm.key}
            onIonInput={(e) => setEditForm({ ...editForm, key: e.detail.value || "" })}
            placeholder="e.g. G, Am, Bb"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">BPM</IonLabel>
          <IonInput
            value={editForm.bpm}
            onIonInput={(e) => setEditForm({ ...editForm, bpm: e.detail.value || "" })}
            placeholder="e.g. 120"
            type="number"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Notes</IonLabel>
          <IonInput
            value={editForm.notes}
            onIonInput={(e) => setEditForm({ ...editForm, notes: e.detail.value || "" })}
            placeholder="Optional notes for this service..."
            clearInput
          />
        </IonItem>
      </PlatformBottomSheet>
    </div>
  );
};
