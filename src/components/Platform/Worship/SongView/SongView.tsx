import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { expandOutline, contractOutline, createOutline } from "ionicons/icons";
import { useGetSong, useUpdateSong } from "../../../../hooks/SongHooks";
import { useAppContext } from "../../../../context/context";
import { ChordSheet } from "../ChordSheet/ChordSheet";
import { PageHeader } from "../../PageHeader";
import {
  SongForm,
  SongFormValues,
  EMPTY_SONG_FORM,
  songToFormValues,
} from "../SongLibrary/SongForm";
import "./SongView.scss";

export const SongView: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { userInfo } = useAppContext();
  const isLoggedIn = !!userInfo?._id;
  const [isZenMode, setIsZenMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<SongFormValues>(EMPTY_SONG_FORM);
  const [showEditImporter, setShowEditImporter] = useState(false);
  const [toast, setToast] = useState<{ message: string; color: string } | null>(
    null,
  );

  const { data, loading, refetch } = useGetSong(id);
  const [updateSong, { loading: isUpdating }] = useUpdateSong();
  const song = data?.getSong?.results;

  useEffect(() => {
    if (song && showEditModal) {
      setEditForm(songToFormValues(song));
    }
  }, [song, showEditModal]);

  if (loading) {
    return (
      <div className="song-view">
        <div className="song-view__loading">
          <IonSpinner name="crescent" />
          <p>Loading song...</p>
        </div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="song-view">
        <PageHeader title="Song not found" onBack={() => history.goBack()} />
      </div>
    );
  }

  const closeEdit = () => {
    setShowEditModal(false);
    setShowEditImporter(false);
    setEditForm(EMPTY_SONG_FORM);
  };

  const handleSaveEdit = async () => {
    if (!editForm.title.trim()) return;
    try {
      const result = await updateSong({
        variables: {
          id: song._id,
          options: {
            title: editForm.title,
            artist: editForm.artist || undefined,
            defaultKey: editForm.defaultKey || undefined,
            bpm: editForm.bpm ? parseInt(editForm.bpm, 10) : undefined,
            lyrics: editForm.lyrics || undefined,
            chordChart: editForm.chordChart || undefined,
            youtubeLink: editForm.youtubeLink || undefined,
            chordsUrl: editForm.chordsUrl || undefined,
            notes: editForm.notes || undefined,
          },
        },
      });
      if (result.data?.updateSong?.errors?.length) {
        setToast({
          message:
            result.data.updateSong.errors[0].message || "Could not save song.",
          color: "danger",
        });
        return;
      }
      closeEdit();
      setToast({ message: "Song updated.", color: "success" });
      await refetch();
    } catch (e) {
      console.error(e);
      setToast({ message: "Failed to update song.", color: "danger" });
    }
  };

  return (
    <div className={`song-view ${isZenMode ? "song-view--zen" : ""}`}>
      <PageHeader
        className="song-view__header"
        title={song.title}
        subtitle={song.artist ?? undefined}
        onBack={() => history.goBack()}
        badges={song.bpm ? [{ label: `${song.bpm} BPM`, color: "medium" }] : []}
        actions={
          isLoggedIn
            ? [
                {
                  label: "Edit",
                  icon: createOutline,
                  onClick: () => setShowEditModal(true),
                  fill: "outline" as const,
                },
              ]
            : []
        }
        rightSlot={
          <IonButton
            fill="clear"
            size="small"
            shape="round"
            onClick={() => setIsZenMode(!isZenMode)}
            title={isZenMode ? "Exit zen mode" : "Zen mode"}
            aria-label={isZenMode ? "Exit zen mode" : "Enter zen mode"}
          >
            <IonIcon
              slot="icon-only"
              icon={isZenMode ? contractOutline : expandOutline}
            />
          </IonButton>
        }
      />

      <div className="song-view__body">
        {song.chordChart ? (
          <ChordSheet
            chordPro={song.chordChart}
            originalKey={song.defaultKey || ""}
            fontSize={16}
          />
        ) : song.lyrics ? (
          <pre className="song-view__lyrics">{song.lyrics}</pre>
        ) : (
          <div className="song-view__empty">
            <p>No chord chart or lyrics available for this song.</p>
          </div>
        )}

        {song.notes && (
          <div className="song-view__notes">
            <h3>Notes</h3>
            <p>{song.notes}</p>
          </div>
        )}

        {song.youtubeLink && (
          <div className="song-view__reference">
            <a href={song.youtubeLink} target="_blank" rel="noopener noreferrer">
              Watch on YouTube
            </a>
          </div>
        )}
        {song.chordsUrl && (
          <div className="song-view__reference">
            <a href={song.chordsUrl} target="_blank" rel="noopener noreferrer">
              View chords on {(() => {
                try {
                  return new URL(song.chordsUrl).hostname.replace("www.", "");
                } catch {
                  return "source site";
                }
              })()}
            </a>
          </div>
        )}
      </div>

      <SongForm
        isOpen={showEditModal}
        onClose={closeEdit}
        onSave={handleSaveEdit}
        values={editForm}
        onChange={setEditForm}
        isSaving={isUpdating}
        showImporter={showEditImporter}
        onShowImporter={setShowEditImporter}
        mode="edit"
      />

      <IonToast
        isOpen={!!toast}
        message={toast?.message}
        color={toast?.color}
        duration={3000}
        position="top"
        onDidDismiss={() => setToast(null)}
      />
    </div>
  );
};
