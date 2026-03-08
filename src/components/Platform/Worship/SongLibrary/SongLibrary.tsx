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
import { add, musicalNotes, trash, arrowBack, cloudUploadOutline, expandOutline } from "ionicons/icons";
import { useGetSongs, useCreateSong, useDeleteSong } from "../../../../hooks/SongHooks";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { ChordSheet } from "../ChordSheet/ChordSheet";
import { ChordImporter } from "../ChordSheet/ChordImporter";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import "./SongLibrary.scss";

export const SongLibrary: React.FC = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showSongDetail, setShowSongDetail] = useState<any>(null);
  const [showImporter, setShowImporter] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "", artist: "", defaultKey: "", bpm: "",
    lyrics: "", chordChart: "", youtubeLink: "", notes: "",
  });

  const { data, loading, error, refetch } = useGetSongs();
  const [createSong, { loading: isCreating }] = useCreateSong();
  const [deleteSong, { loading: isDeleting }] = useDeleteSong();

  const songs: any[] = data?.getSongs?.results || [];

  const filteredSongs = songs.filter((song) => {
    const q = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(q) ||
      (song.artist && song.artist.toLowerCase().includes(q)) ||
      deletingId === song._id
    );
  });

  const handleCreate = async () => {
    if (!newSong.title.trim()) return;
    try {
      await createSong({
        variables: {
          options: {
            title: newSong.title,
            artist: newSong.artist || undefined,
            defaultKey: newSong.defaultKey || undefined,
            bpm: newSong.bpm ? parseInt(newSong.bpm) : undefined,
            lyrics: newSong.lyrics || undefined,
            chordChart: newSong.chordChart || undefined,
            youtubeLink: newSong.youtubeLink || undefined,
            notes: newSong.notes || undefined,
          },
        },
      });
      setShowCreateModal(false);
      setNewSong({ title: "", artist: "", defaultKey: "", bpm: "", lyrics: "", chordChart: "", youtubeLink: "", notes: "" });
    } catch (err) {
      console.error("Error creating song:", err);
    }
  };

  const handleDelete = async (songId: string) => {
    try {
      setDeletingId(songId);
      setShowDeleteConfirm(null);
      setTimeout(async () => {
        try {
          await deleteSong({ variables: { id: songId } });
          await refetch();
        } finally {
          setDeletingId(null);
        }
      }, 300);
    } catch (err) {
      console.error("Error deleting song:", err);
      setDeletingId(null);
    }
  };

  return (
    <div className="songs-container">
      <WorshipNav />
      <div className="songs-header">
        <div className="songs-header__left">
          <IonButton fill="clear" size="small" shape="round" onClick={() => history.push("/worship")}>
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <div>
            <h1>Song Library</h1>
            <p>Manage your church's song collection</p>
          </div>
        </div>
        <IonButton size="large" fill="solid" shape="round" color="primary" onClick={() => setShowCreateModal(true)}>
          <IonIcon slot="start" icon={add} />
          Add Song
        </IonButton>
      </div>

      <div className="songs-search">
        <IonSearchbar
          value={searchQuery}
          onIonInput={(e) => setSearchQuery(e.detail.value || "")}
          placeholder="Search by title or artist..."
          debounce={300}
        />
      </div>

      {loading && (
        <div className="loading-state">
          <IonSpinner name="crescent" />
          <p>Loading songs...</p>
        </div>
      )}

      {!loading && !error && filteredSongs.length === 0 && (
        <div className="empty-state-container">
          <IonCard className="empty-state-card">
            <IonCardContent>
              <div className="empty-state">
                <div className="empty-state-icon-wrapper">
                  <IonIcon icon={musicalNotes} className="empty-state-icon" />
                </div>
                <h2>No Songs Yet</h2>
                <p className="empty-state-description">Add songs to your library to use in setlists.</p>
                <IonButton size="large" fill="solid" shape="round" color="primary" onClick={() => setShowCreateModal(true)} className="empty-state-button">
                  <IonIcon slot="start" icon={add} />
                  Add Song
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      )}

      {!loading && !error && filteredSongs.length > 0 && (
        <div className="songs-grid">
          <IonCard className="song-card new-song-card" onClick={() => setShowCreateModal(true)} button>
            <IonCardContent>
              <div className="new-song-content">
                <IonIcon icon={add} className="add-icon" />
                <span>Add Song</span>
              </div>
            </IonCardContent>
          </IonCard>

          {filteredSongs.map((song) => {
            const isBeingDeleted = deletingId === song._id;
            return (
              <IonCard
                key={song._id}
                className={`song-card ${isBeingDeleted ? "deleting" : ""}`}
                onClick={() => !isBeingDeleted && setShowSongDetail(song)}
                button={!isBeingDeleted}
              >
                <IonCardContent>
                  <div className="song-card__header">
                    <IonIcon icon={musicalNotes} className="song-icon" />
                    {song.defaultKey && <IonBadge color="tertiary">{song.defaultKey}</IonBadge>}
                  </div>
                  <h3 className="song-card__title">{song.title}</h3>
                  {song.artist && <p className="song-card__artist">{song.artist}</p>}
                  <div className="song-card__meta">
                    {song.bpm && <IonBadge color="medium">{song.bpm} BPM</IonBadge>}
                  </div>
                  <div className="song-card__actions" onClick={(e) => e.stopPropagation()}>
                    <IonButton fill="clear" size="small" shape="round" color="danger" disabled={isBeingDeleted}
                      onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(song._id); }}>
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>
      )}

      {/* Song Detail Modal */}
      <IonModal isOpen={!!showSongDetail} onDidDismiss={() => setShowSongDetail(null)} breakpoints={[0, 0.75, 1]} initialBreakpoint={0.75}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{showSongDetail?.title || "Song"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {showSongDetail && (
            <div className="song-detail-modal worship-modal-content">
              <h2>{showSongDetail.title}</h2>
              {showSongDetail.artist && <p className="song-detail__artist">{showSongDetail.artist}</p>}
              <div className="song-detail__tags">
                {showSongDetail.defaultKey && <IonBadge color="tertiary">Key: {showSongDetail.defaultKey}</IonBadge>}
                {showSongDetail.bpm && <IonBadge color="medium">{showSongDetail.bpm} BPM</IonBadge>}
                <IonButton
                  fill="clear"
                  size="small"
                  shape="round"
                  onClick={() => {
                    setShowSongDetail(null);
                    history.push(`/worship/songs/${showSongDetail._id}`);
                  }}
                >
                  <IonIcon slot="start" icon={expandOutline} />
                  Full Screen
                </IonButton>
              </div>
              {showSongDetail.chordChart && (
                <div className="song-detail__section">
                  <h3>Chord Chart</h3>
                  <ChordSheet
                    chordPro={showSongDetail.chordChart}
                    originalKey={showSongDetail.defaultKey || ""}
                  />
                </div>
              )}
              {showSongDetail.lyrics && !showSongDetail.chordChart && (
                <div className="song-detail__section">
                  <h3>Lyrics</h3>
                  <pre className="song-detail__lyrics">{showSongDetail.lyrics}</pre>
                </div>
              )}
              {showSongDetail.notes && (
                <div className="song-detail__section">
                  <h3>Notes</h3>
                  <p>{showSongDetail.notes}</p>
                </div>
              )}
              {showSongDetail.youtubeLink && (
                <div className="song-detail__section">
                  <h3>Reference</h3>
                  <a href={showSongDetail.youtubeLink} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
                </div>
              )}
            </div>
          )}
        </IonContent>
      </IonModal>

      {/* Add Song Modal */}
      <PlatformBottomSheet
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); setShowImporter(false); setNewSong({ title: "", artist: "", defaultKey: "", bpm: "", lyrics: "", chordChart: "", youtubeLink: "", notes: "" }); }}
        title="Add Song"
        onSave={handleCreate}
        saveLabel="Add Song"
        saveDisabled={!newSong.title.trim()}
        isSaving={isCreating}
        breakpoints={[0, 0.85, 1]}
        initialBreakpoint={0.85}
      >
        <IonItem lines="none">
          <IonLabel position="stacked">Title *</IonLabel>
          <IonInput
            value={newSong.title}
            onIonInput={(e) => setNewSong({ ...newSong, title: e.detail.value || "" })}
            placeholder="Song title"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Artist</IonLabel>
          <IonInput
            value={newSong.artist}
            onIonInput={(e) => setNewSong({ ...newSong, artist: e.detail.value || "" })}
            placeholder="Artist or band"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Key</IonLabel>
          <IonInput
            value={newSong.defaultKey}
            onIonInput={(e) => setNewSong({ ...newSong, defaultKey: e.detail.value || "" })}
            placeholder="e.g. G"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">BPM</IonLabel>
          <IonInput
            value={newSong.bpm}
            onIonInput={(e) => setNewSong({ ...newSong, bpm: e.detail.value || "" })}
            placeholder="e.g. 120"
            type="number"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Chord Chart</IonLabel>
          {!showImporter ? (
            <>
              <IonTextarea
                value={newSong.chordChart}
                onIonInput={(e) => setNewSong({ ...newSong, chordChart: e.detail.value || "" })}
                placeholder={`ChordPro format: [Am]Lyrics go [G]here\nOr use the import button below to paste from another site.`}
                rows={6}
                autoGrow
                className="chordpro-textarea"
              />
              <IonButton
                fill="outline"
                size="small"
                shape="round"
                color="tertiary"
                onClick={() => setShowImporter(true)}
                style={{ marginTop: "8px", alignSelf: "flex-start" }}
              >
                <IonIcon slot="start" icon={cloudUploadOutline} />
                Import from another site
              </IonButton>
            </>
          ) : (
            <ChordImporter
              onImport={(chordPro) => {
                setNewSong({ ...newSong, chordChart: chordPro });
                setShowImporter(false);
              }}
              onCancel={() => setShowImporter(false)}
            />
          )}
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Lyrics (without chords)</IonLabel>
          <IonTextarea
            value={newSong.lyrics}
            onIonInput={(e) => setNewSong({ ...newSong, lyrics: e.detail.value || "" })}
            placeholder="Optional — only needed if you want plain lyrics separate from the chord chart"
            rows={3}
            autoGrow
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">YouTube Link</IonLabel>
          <IonInput
            value={newSong.youtubeLink}
            onIonInput={(e) => setNewSong({ ...newSong, youtubeLink: e.detail.value || "" })}
            placeholder="https://youtube.com/..."
            type="url"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Notes</IonLabel>
          <IonTextarea
            value={newSong.notes}
            onIonInput={(e) => setNewSong({ ...newSong, notes: e.detail.value || "" })}
            placeholder="Optional notes..."
            rows={2}
            autoGrow
          />
        </IonItem>
      </PlatformBottomSheet>

      {/* Delete Confirmation Modal */}
      <IonModal isOpen={!!showDeleteConfirm} onDidDismiss={() => setShowDeleteConfirm(null)} breakpoints={[0, 0.45]} initialBreakpoint={0.45}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Delete Song</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="worship-delete-confirm">
            <IonIcon icon={trash} className="worship-delete-icon" />
            <h2>Delete Song?</h2>
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
              {isDeleting ? <IonSpinner name="crescent" /> : "Delete Song"}
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
