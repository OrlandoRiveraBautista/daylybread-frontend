import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonSearchbar,
  IonToast,
} from "@ionic/react";
import { musicalNotes, bookmarkOutline } from "ionicons/icons";
import { AddCard } from "../../AddCard";
import { ItemCard } from "../../ItemCard";
import {
  useGetSongs,
  useCreateSong,
  useDeleteSong,
} from "../../../../hooks/SongHooks";
import { useAppContext } from "../../../../context/context";
import { useDeleteWithAnimation } from "../../../../hooks/useDeleteWithAnimation";
import { useSaveToLibrary } from "../../../../hooks/useSaveToLibrary";
import { buildMySongTitles } from "../../../../utils/worshipConstants";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import { WorshipPageHeader } from "../shared/WorshipPageHeader";
import { WorshipLoadingState } from "../shared/WorshipLoadingState";
import EmptyState from "../../../EmptyState/EmptyState";
import { WorshipDeleteModal } from "../shared/WorshipDeleteModal";
import { SongForm, SongFormValues, EMPTY_SONG_FORM } from "./SongForm";
import { SongDetailSheet } from "./SongDetailSheet";
import "./SongLibrary.scss";

export const SongLibrary: React.FC = () => {
  const history = useHistory();
  const { userInfo } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showSongDetail, setShowSongDetail] = useState<any>(null);
  const [showImporter, setShowImporter] = useState(false);
  const [toast, setToast] = useState<{ message: string; color: string } | null>(null);
  const [newSong, setNewSong] = useState<SongFormValues>(EMPTY_SONG_FORM);

  const { data, loading, error, refetch } = useGetSongs();
  const [createSong, { loading: isCreating }] = useCreateSong();
  const [deleteSong, { loading: isDeleting }] = useDeleteSong();

  const songs: any[] = data?.getSongs?.results || [];
  const mySongTitles = buildMySongTitles(songs, userInfo?._id);

  const { deletingId, handleDelete } = useDeleteWithAnimation(
    (opts) => deleteSong(opts),
    refetch,
  );

  const { savingToLibraryId, saveToLibrary: handleSaveToLibrary } = useSaveToLibrary(
    (title) => setToast({ message: `"${title}" saved to your library.`, color: "success" }),
    () => setToast({ message: "Failed to save song. Please try again.", color: "danger" }),
  );

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
      setNewSong(EMPTY_SONG_FORM);
    } catch (err) {
      console.error("Error creating song:", err);
    }
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setShowImporter(false);
    setNewSong(EMPTY_SONG_FORM);
  };

  return (
    <div className="songs-container">
      <WorshipNav />

      <WorshipPageHeader
        classPrefix="songs"
        title="Song Library"
        subtitle="Manage your church's song collection"
        onBack={() => history.push("/worship")}
        actionLabel="Add Song"
        onAction={() => setShowCreateModal(true)}
      />

      <div className="songs-search">
        <IonSearchbar
          value={searchQuery}
          onIonInput={(e) => setSearchQuery(e.detail.value || "")}
          placeholder="Search by title or artist..."
          debounce={300}
        />
      </div>

      {loading && <WorshipLoadingState message="Loading songs..." />}

      {!loading && !error && filteredSongs.length === 0 && (
        <EmptyState
          icon={musicalNotes}
          title="No Songs Yet"
          description="Add songs to your library to use in setlists."
          actionLabel="Add Song"
          onAction={() => setShowCreateModal(true)}
          color="tertiary"
        />
      )}

      {!loading && !error && filteredSongs.length > 0 && (
        <div className="songs-grid">
          <AddCard
            label="Add Song"
            onClick={() => setShowCreateModal(true)}
            color="tertiary"
            className="song-card"
          />
          {filteredSongs.map((song) => {
            const isBeingDeleted = deletingId === song._id;
            const isSavingThis = savingToLibraryId === song._id;
            const isOwner = song.author?._id === userInfo?._id;
            const alreadyInMyLibrary = mySongTitles.has(song.title.toLowerCase().trim());
            const badges = [];
            if (song.defaultKey) badges.push({ text: song.defaultKey, color: "tertiary" as const });
            if (song.bpm) badges.push({ text: `${song.bpm} BPM`, color: "medium" as const });

            return (
              <ItemCard
                key={song._id}
                icon={musicalNotes}
                iconClassName="song-icon"
                title={song.title}
                subtitle={song.artist}
                badges={badges}
                onClick={() => setShowSongDetail(song)}
                onDelete={isOwner ? () => setShowDeleteConfirm(song._id) : undefined}
                customActions={
                  !isOwner && !alreadyInMyLibrary
                    ? [{ icon: bookmarkOutline, color: "tertiary", onClick: () => handleSaveToLibrary(song), hidden: isSavingThis }]
                    : undefined
                }
                isDeleting={isBeingDeleted || isSavingThis}
                className="song-card"
                color="tertiary"
                searchWords={searchQuery ? [searchQuery] : []}
              />
            );
          })}
        </div>
      )}

      <SongDetailSheet
        song={showSongDetail}
        onDismiss={() => setShowSongDetail(null)}
        mySongTitles={mySongTitles}
        currentUserId={userInfo?._id}
        onSaveToLibrary={handleSaveToLibrary}
        savingToLibraryId={savingToLibraryId}
      />

      <SongForm
        isOpen={showCreateModal}
        onClose={closeCreateModal}
        onSave={handleCreate}
        values={newSong}
        onChange={setNewSong}
        isSaving={isCreating}
        showImporter={showImporter}
        onShowImporter={setShowImporter}
      />

      <WorshipDeleteModal
        isOpen={!!showDeleteConfirm}
        onDismiss={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDelete(showDeleteConfirm!, () => setShowDeleteConfirm(null))}
        isDeleting={isDeleting}
        title="Delete Song"
        message="This action cannot be undone."
        confirmLabel="Delete Song"
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
