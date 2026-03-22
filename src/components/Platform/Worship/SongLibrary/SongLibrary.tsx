import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonIcon,
  IonSearchbar,
  IonToast,
} from "@ionic/react";
import { musicalNotes, bookmarkOutline, logoYoutube } from "ionicons/icons";
import { AddCard } from "../../AddCard";
import { ItemCard } from "../../ItemCard";
import {
  useGetSongs,
  useCreateSong,
  useUpdateSong,
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
import {
  SongForm,
  SongFormValues,
  EMPTY_SONG_FORM,
  songToFormValues,
} from "./SongForm";
import { SongDetailSheet } from "./SongDetailSheet";
import "./SongLibrary.scss";

function formatSongOwnerLine(
  author: { firstName?: string | null; lastName?: string | null } | undefined,
  isOwner: boolean,
): string {
  if (isOwner) return "Yours";
  if (!author) return "";
  const first = author.firstName?.trim() || "";
  const last = author.lastName?.trim() || "";
  if (first && last) return `${first} ${last.charAt(0)}.`;
  if (first) return first;
  if (last) return last;
  return "Community";
}

function hasYoutubeLink(link: string | null | undefined): boolean {
  return typeof link === "string" && link.trim().length > 0;
}

export const SongLibrary: React.FC = () => {
  const history = useHistory();
  const { userInfo } = useAppContext();
  const isLoggedIn = !!userInfo?._id;
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showSongDetail, setShowSongDetail] = useState<any>(null);
  const [showImporter, setShowImporter] = useState(false);
  const [toast, setToast] = useState<{ message: string; color: string } | null>(null);
  const [newSong, setNewSong] = useState<SongFormValues>(EMPTY_SONG_FORM);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [editSong, setEditSong] = useState<SongFormValues>(EMPTY_SONG_FORM);
  const [showEditImporter, setShowEditImporter] = useState(false);

  const { data, loading, error, refetch } = useGetSongs();
  const [createSong, { loading: isCreating }] = useCreateSong();
  const [updateSong, { loading: isUpdating }] = useUpdateSong();
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
            chordsUrl: newSong.chordsUrl || undefined,
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

  const openEditModal = (song: any) => {
    setShowCreateModal(false);
    setEditingSongId(song._id);
    setEditSong(songToFormValues(song));
    setShowEditImporter(false);
  };

  const closeEditModal = () => {
    setEditingSongId(null);
    setEditSong(EMPTY_SONG_FORM);
    setShowEditImporter(false);
  };

  const handleUpdate = async () => {
    if (!editingSongId || !editSong.title.trim()) return;
    try {
      const result = await updateSong({
        variables: {
          id: editingSongId,
          options: {
            title: editSong.title,
            artist: editSong.artist || undefined,
            defaultKey: editSong.defaultKey || undefined,
            bpm: editSong.bpm ? parseInt(editSong.bpm, 10) : undefined,
            lyrics: editSong.lyrics || undefined,
            chordChart: editSong.chordChart || undefined,
            youtubeLink: editSong.youtubeLink || undefined,
            chordsUrl: editSong.chordsUrl || undefined,
            notes: editSong.notes || undefined,
          },
        },
      });
      if (result.data?.updateSong?.errors?.length) {
        setToast({
          message: result.data.updateSong.errors[0].message || "Could not save song.",
          color: "danger",
        });
        return;
      }
      closeEditModal();
      setToast({ message: "Song updated.", color: "success" });
      if (showSongDetail?._id === editingSongId) {
        await refetch();
        const updated = result.data?.updateSong?.results;
        if (updated) setShowSongDetail(updated);
      }
    } catch (err) {
      console.error("Error updating song:", err);
      setToast({ message: "Failed to update song.", color: "danger" });
    }
  };

  return (
    <div className="songs-container">
      <WorshipNav />

      <WorshipPageHeader
        classPrefix="songs"
        title="Song Library"
        subtitle="Browse the community song collection"
        onBack={() => history.push("/worship")}
        actionLabel={isLoggedIn ? "Add Song" : undefined}
        onAction={isLoggedIn ? () => setShowCreateModal(true) : undefined}
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
          description={isLoggedIn ? "Add songs to your library to use in setlists." : "No songs have been added yet."}
          actionLabel={isLoggedIn ? "Add Song" : undefined}
          onAction={isLoggedIn ? () => setShowCreateModal(true) : undefined}
          color="tertiary"
        />
      )}

      {!loading && !error && filteredSongs.length > 0 && (
        <div className="songs-grid">
          {isLoggedIn && (
            <AddCard
              label="Add Song"
              onClick={() => setShowCreateModal(true)}
              color="tertiary"
              className="song-card"
            />
          )}
          {filteredSongs.map((song) => {
            const isBeingDeleted = deletingId === song._id;
            const isSavingThis = savingToLibraryId === song._id;
            const isOwner = isLoggedIn && song.author?._id === userInfo?._id;
            const alreadyInMyLibrary = mySongTitles.has(song.title.toLowerCase().trim());
            const ownerLine = formatSongOwnerLine(song.author, isOwner);
            const withVideo = hasYoutubeLink(song.youtubeLink);
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
                metadata={
                  <div className="song-card__meta">
                    {ownerLine && (
                      <div className="song-card__meta-owner">
                        <span className="song-card__meta-kicker">
                          {isOwner ? "Your song" : "Added by"}
                        </span>
                        {!isOwner && (
                          <span className="song-card__meta-owner-name">{ownerLine}</span>
                        )}
                      </div>
                    )}
                    {ownerLine && <span className="song-card__meta-sep" aria-hidden="true" />}
                    <span
                      className={`song-card__meta-video${withVideo ? " song-card__meta-video--has" : ""}`}
                      title={withVideo ? "Includes a YouTube link" : "No YouTube link"}
                    >
                      <IonIcon icon={logoYoutube} aria-hidden="true" />
                      <span className="song-card__meta-video-label">
                        {withVideo ? "Video" : "No video"}
                      </span>
                    </span>
                  </div>
                }
                badges={badges}
                onClick={() => setShowSongDetail(song)}
                onEdit={isLoggedIn ? () => openEditModal(song) : undefined}
                onDelete={isOwner ? () => setShowDeleteConfirm(song._id) : undefined}
                customActions={
                  isLoggedIn && !isOwner && !alreadyInMyLibrary
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
        isLoggedIn={isLoggedIn}
        onSaveToLibrary={handleSaveToLibrary}
        savingToLibraryId={savingToLibraryId}
        onEdit={(s) => {
          setShowSongDetail(null);
          openEditModal(s);
        }}
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
        mode="create"
      />

      <SongForm
        isOpen={!!editingSongId}
        onClose={closeEditModal}
        onSave={handleUpdate}
        values={editSong}
        onChange={setEditSong}
        isSaving={isUpdating}
        showImporter={showEditImporter}
        onShowImporter={setShowEditImporter}
        mode="edit"
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
