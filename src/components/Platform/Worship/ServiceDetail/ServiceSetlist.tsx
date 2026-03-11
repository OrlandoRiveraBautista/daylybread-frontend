import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
  IonBadge,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  IonToast,
} from "@ionic/react";
import { add, trash, createOutline, bookmarkOutline } from "ionicons/icons";
import {
  useCreateSetlist,
  useAddSetlistItem,
  useRemoveSetlistItem,
  useUpdateSetlistItem,
  useReorderSetlistItems,
} from "../../../../hooks/WorshipServiceHooks";
import { useSaveToLibrary } from "../../../../hooks/useSaveToLibrary";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";

interface ServiceSetlistProps {
  serviceId: string;
  serviceName: string;
  setlist: any;
  songs: any[];
  mySongTitles: Set<string>;
  isOwner: boolean;
  onRefetch: () => void;
}

export const ServiceSetlist: React.FC<ServiceSetlistProps> = ({
  serviceId,
  serviceName,
  setlist,
  songs,
  mySongTitles,
  isOwner,
  onRefetch,
}) => {
  const history = useHistory();
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [removingSongId, setRemovingSongId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editForm, setEditForm] = useState({ key: "", bpm: "", notes: "" });
  const [songForm, setSongForm] = useState({ songId: "", key: "", bpm: "", notes: "" });
  const [toast, setToast] = useState<{ message: string; color: string } | null>(null);

  const [createSetlist] = useCreateSetlist();
  const [addSetlistItem, { loading: isAddingSong }] = useAddSetlistItem();
  const [removeSetlistItem] = useRemoveSetlistItem();
  const [updateSetlistItem, { loading: isUpdatingItem }] = useUpdateSetlistItem();
  const [reorderSetlistItems] = useReorderSetlistItems();

  const { savingToLibraryId, saveToLibrary: handleSaveToLibrary } = useSaveToLibrary(
    (title) => setToast({ message: `"${title}" saved to your library.`, color: "success" }),
    () => setToast({ message: "Failed to save song. Please try again.", color: "danger" }),
  );

  const setlistItems: any[] = setlist?.items || [];

  const handleAddSong = async () => {
    if (!songForm.songId) return;

    let setlistId = setlist?._id;

    if (!setlistId) {
      try {
        const result = await createSetlist({
          variables: {
            options: { name: `${serviceName} Setlist`, serviceId },
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
      onRefetch();
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
      onRefetch();
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
      onRefetch();
    } catch (err) {
      console.error("Error reordering setlist:", err);
    }
  };

  const handleRemoveSong = async (itemId: string) => {
    try {
      setRemovingSongId(itemId);
      await removeSetlistItem({ variables: { id: itemId } });
      onRefetch();
    } catch (err) {
      console.error("Error removing song from setlist:", err);
    } finally {
      setRemovingSongId(null);
    }
  };

  return (
    <>
      <div className="setlist-section">
        {isOwner && (
          <div className="section-action-bar">
            <IonButton fill="solid" shape="round" color="primary" onClick={() => setShowAddSongModal(true)}>
              <IonIcon slot="start" icon={add} />
              Add Song
            </IonButton>
          </div>
        )}

        {setlistItems.length === 0 ? (
          <div className="empty-section"><p>No songs in the setlist yet.</p></div>
        ) : (
          <IonReorderGroup disabled={!isOwner} onIonItemReorder={handleReorder} className="setlist-list">
            {[...setlistItems]
              .sort((a: any, b: any) => a.order - b.order)
              .map((item: any, index: number) => (
                <IonCard
                  key={item._id}
                  className="setlist-item-card"
                  button
                  onClick={() => history.push(`/worship/services/${serviceId}/live?song=${index}`)}
                >
                  <IonCardContent>
                    {isOwner && <IonReorder slot="start" className="setlist-item__reorder" />}
                    <div className="setlist-item__order">{index + 1}</div>
                    <div className="setlist-item__info">
                      <h3>{item.song?.title}</h3>
                      <div className="setlist-item__meta">
                        {item.song?.artist && <span>{item.song.artist}</span>}
                        {item.key && <IonBadge color="tertiary">{item.key}</IonBadge>}
                        {item.bpm && <IonBadge color="medium">{item.bpm} BPM</IonBadge>}
                      </div>
                      {item.notes && (
                        <IonText color="medium">
                          <p className="setlist-item__notes">{item.notes}</p>
                        </IonText>
                      )}
                    </div>
                    {isOwner ? (
                      <div className="setlist-item__actions" onClick={(e) => e.stopPropagation()}>
                        <IonButton fill="clear" size="small" shape="round" color="medium"
                          onClick={() => handleEditItem(item)}>
                          <IonIcon slot="icon-only" icon={createOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" shape="round" color="danger"
                          disabled={removingSongId === item._id}
                          onClick={() => handleRemoveSong(item._id)}>
                          {removingSongId === item._id
                            ? <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
                            : <IonIcon slot="icon-only" icon={trash} />}
                        </IonButton>
                      </div>
                    ) : !mySongTitles.has(item.song?.title?.toLowerCase().trim()) && (
                      <div className="setlist-item__actions" onClick={(e) => e.stopPropagation()}>
                        <IonButton fill="clear" size="small" shape="round" color="tertiary"
                          disabled={savingToLibraryId === item.song?._id}
                          onClick={() => handleSaveToLibrary(item.song)}>
                          {savingToLibraryId === item.song?._id
                            ? <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
                            : <IonIcon slot="icon-only" icon={bookmarkOutline} />}
                        </IonButton>
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              ))}
          </IonReorderGroup>
        )}
      </div>

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

      <IonToast
        isOpen={!!toast}
        message={toast?.message}
        color={toast?.color}
        duration={3000}
        position="top"
        onDidDismiss={() => setToast(null)}
      />
    </>
  );
};
