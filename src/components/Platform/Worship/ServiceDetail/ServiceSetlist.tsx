import React, { useState, useMemo } from "react";
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
  IonItem,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  IonToast,
  IonSearchbar,
} from "@ionic/react";
import { add, trash, createOutline, bookmarkOutline, musicalNotes, checkmarkCircle } from "ionicons/icons";
import Highlighter from "react-highlight-words";
import {
  useCreateSetlist,
  useAddSetlistItem,
  useRemoveSetlistItem,
  useUpdateSetlistItem,
  useReorderSetlistItems,
} from "../../../../hooks/WorshipServiceHooks";
import { useCreateSong } from "../../../../hooks/SongHooks";
import { useSaveToLibrary } from "../../../../hooks/useSaveToLibrary";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { SongForm, SongFormValues, EMPTY_SONG_FORM } from "../SongLibrary/SongForm";

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
  const [songSearchQuery, setSongSearchQuery] = useState("");
  const [showNewSongForm, setShowNewSongForm] = useState(false);
  const [newSongForm, setNewSongForm] = useState<SongFormValues>(EMPTY_SONG_FORM);
  const [showImporter, setShowImporter] = useState(false);

  const [createSetlist] = useCreateSetlist();
  const [addSetlistItem, { loading: isAddingSong }] = useAddSetlistItem();
  const [removeSetlistItem] = useRemoveSetlistItem();
  const [updateSetlistItem, { loading: isUpdatingItem }] = useUpdateSetlistItem();
  const [reorderSetlistItems] = useReorderSetlistItems();
  const [createSong, { loading: isCreatingSong }] = useCreateSong();

  const { savingToLibraryId, saveToLibrary: handleSaveToLibrary } = useSaveToLibrary(
    (title) => setToast({ message: `"${title}" saved to your library.`, color: "success" }),
    () => setToast({ message: "Failed to save song. Please try again.", color: "danger" }),
  );

  const setlistItems: any[] = setlist?.items || [];

  const filteredSongs = useMemo(() => {
    const q = songSearchQuery.toLowerCase().trim();
    if (!q) return songs;
    return songs.filter(
      (s: any) =>
        s.title?.toLowerCase().includes(q) ||
        s.artist?.toLowerCase().includes(q),
    );
  }, [songs, songSearchQuery]);

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

  const handleCreateSong = async () => {
    if (!newSongForm.title.trim()) return;
    try {
      const result = await createSong({
        variables: {
          options: {
            title: newSongForm.title,
            artist: newSongForm.artist || undefined,
            defaultKey: newSongForm.defaultKey || undefined,
            bpm: newSongForm.bpm ? parseInt(newSongForm.bpm) : undefined,
            lyrics: newSongForm.lyrics || undefined,
            chordChart: newSongForm.chordChart || undefined,
            youtubeLink: newSongForm.youtubeLink || undefined,
            chordsUrl: newSongForm.chordsUrl || undefined,
            notes: newSongForm.notes || undefined,
          },
        },
      });
      const created = result.data?.createSong?.results;
      setShowNewSongForm(false);
      setShowImporter(false);
      setNewSongForm(EMPTY_SONG_FORM);
      if (created?._id) {
        setSongForm({
          songId: created._id,
          key: created.defaultKey || "",
          bpm: created.bpm?.toString() || "",
          notes: "",
        });
        setSongSearchQuery("");
      }
      onRefetch();
    } catch (err) {
      console.error("Error creating song:", err);
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
        onClose={() => {
          setShowAddSongModal(false);
          setSongForm({ songId: "", key: "", bpm: "", notes: "" });
          setSongSearchQuery("");
        }}
        title="Add Song to Setlist"
        onSave={handleAddSong}
        saveLabel="Add Song"
        saveDisabled={!songForm.songId}
        isSaving={isAddingSong}
        breakpoints={[0, 0.85, 1]}
        initialBreakpoint={0.85}
      >
        <div className="song-picker">
          <IonSearchbar
            value={songSearchQuery}
            onIonInput={(e) => setSongSearchQuery(e.detail.value || "")}
            placeholder="Search by title or artist..."
            debounce={200}
            className="song-picker__searchbar"
          />

          {songForm.songId && (() => {
            const selected = songs.find((s: any) => s._id === songForm.songId);
            return selected ? (
              <div className="song-picker__selected-banner">
                <IonIcon icon={checkmarkCircle} color="tertiary" />
                <span>
                  <strong>{selected.title}</strong>
                  {selected.artist ? ` — ${selected.artist}` : ""}
                </span>
              </div>
            ) : null;
          })()}

          <div className="song-picker__list">
            {filteredSongs.length === 0 ? (
              <div className="song-picker__empty">
                <p>{songSearchQuery ? "No songs match your search." : "No songs in the library yet."}</p>
                <IonButton
                  fill="outline"
                  size="small"
                  shape="round"
                  color="tertiary"
                  onClick={() => setShowNewSongForm(true)}
                >
                  <IonIcon slot="start" icon={add} />
                  Create New Song
                </IonButton>
              </div>
            ) : (
              <>
              {filteredSongs.map((s: any) => (
                <div
                  key={s._id}
                  className={`song-picker__item${songForm.songId === s._id ? " song-picker__item--selected" : ""}`}
                  onClick={() =>
                    setSongForm({
                      ...songForm,
                      songId: s._id,
                      key: s.defaultKey || "",
                      bpm: s.bpm?.toString() || "",
                    })
                  }
                >
                  <div className="song-picker__item-icon">
                    <IonIcon icon={musicalNotes} className="song-picker__item-icon-note" />
                    <IonIcon icon={checkmarkCircle} className="song-picker__item-icon-check" />
                  </div>
                  <div className="song-picker__item-info">
                    <span className="song-picker__item-title">
                      <Highlighter
                        searchWords={songSearchQuery ? [songSearchQuery] : []}
                        autoEscape
                        textToHighlight={s.title}
                        highlightClassName="item-card__highlight"
                      />
                    </span>
                    {s.artist && (
                      <span className="song-picker__item-artist">
                        <Highlighter
                          searchWords={songSearchQuery ? [songSearchQuery] : []}
                          autoEscape
                          textToHighlight={s.artist}
                          highlightClassName="item-card__highlight"
                        />
                      </span>
                    )}
                  </div>
                  <div className="song-picker__item-badges">
                    {s.defaultKey && <IonBadge color="tertiary">{s.defaultKey}</IonBadge>}
                    {s.bpm && <IonBadge color="medium">{s.bpm} BPM</IonBadge>}
                  </div>
                </div>
              ))}
              <div className="song-picker__create-row" onClick={() => setShowNewSongForm(true)}>
                <div className="song-picker__item-icon song-picker__item-icon--add">
                  <IonIcon icon={add} />
                </div>
                <span className="song-picker__create-label">Create New Song</span>
              </div>
              </>
            )}
          </div>
        </div>

        <div className="song-form-fields">
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
        </div>
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

      <SongForm
        isOpen={showNewSongForm}
        onClose={() => {
          setShowNewSongForm(false);
          setShowImporter(false);
          setNewSongForm(EMPTY_SONG_FORM);
        }}
        onSave={handleCreateSong}
        values={newSongForm}
        onChange={setNewSongForm}
        isSaving={isCreatingSong}
        showImporter={showImporter}
        onShowImporter={setShowImporter}
      />

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
