import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBadge,
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { expandOutline, bookmarkOutline, createOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { ChordSheet } from "../ChordSheet/ChordSheet";

interface SongDetailSheetProps {
  song: any | null;
  onDismiss: () => void;
  /** The current user's owned song titles (lowercase trimmed) for the "save" guard */
  mySongTitles: Set<string>;
  currentUserId: string | undefined;
  /** Logged-in users can edit any song */
  isLoggedIn: boolean;
  onSaveToLibrary: (song: any) => void;
  savingToLibraryId: string | null;
  onEdit?: (song: any) => void;
}

export const SongDetailSheet: React.FC<SongDetailSheetProps> = ({
  song,
  onDismiss,
  mySongTitles,
  currentUserId,
  isLoggedIn,
  onSaveToLibrary,
  savingToLibraryId,
  onEdit,
}) => {
  const history = useHistory();

  const isOwner = song?.author?._id === currentUserId;
  const alreadySaved = song
    ? mySongTitles.has(song.title.toLowerCase().trim())
    : false;

  return (
    <IonModal
      isOpen={!!song}
      onDidDismiss={onDismiss}
      breakpoints={[0, 0.75, 1]}
      initialBreakpoint={0.75}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{song?.title || "Song"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {song && (
          <div className="song-detail-modal worship-modal-content">
            <h2>{song.title}</h2>
            {song.artist && (
              <p className="song-detail__artist">{song.artist}</p>
            )}
            <div className="song-detail__tags">
              {song.defaultKey && (
                <IonBadge color="tertiary">Key: {song.defaultKey}</IonBadge>
              )}
              {song.bpm && (
                <IonBadge color="medium">{song.bpm} BPM</IonBadge>
              )}
              <IonButton
                fill="clear"
                size="small"
                shape="round"
                onClick={() => {
                  onDismiss();
                  history.push(`/worship/songs/${song._id}`);
                }}
              >
                <IonIcon slot="start" icon={expandOutline} />
                Full Screen
              </IonButton>
              {isLoggedIn && onEdit && (
                <IonButton
                  fill="outline"
                  size="small"
                  shape="round"
                  color="primary"
                  onClick={() => onEdit(song)}
                >
                  <IonIcon slot="start" icon={createOutline} />
                  Edit
                </IonButton>
              )}
              {!isOwner && !alreadySaved && (
                <IonButton
                  fill="outline"
                  size="small"
                  shape="round"
                  color="tertiary"
                  disabled={savingToLibraryId === song._id}
                  onClick={() => onSaveToLibrary(song)}
                >
                  {savingToLibraryId === song._id ? (
                    <IonSpinner name="crescent" style={{ width: 16, height: 16 }} />
                  ) : (
                    <>
                      <IonIcon slot="start" icon={bookmarkOutline} />
                      Save to My Library
                    </>
                  )}
                </IonButton>
              )}
            </div>

            {song.chordChart && (
              <div className="song-detail__section">
                <h3>Chord Chart</h3>
                <ChordSheet
                  chordPro={song.chordChart}
                  originalKey={song.defaultKey || ""}
                />
              </div>
            )}
            {song.lyrics && !song.chordChart && (
              <div className="song-detail__section">
                <h3>Lyrics</h3>
                <pre className="song-detail__lyrics">{song.lyrics}</pre>
              </div>
            )}
            {song.notes && (
              <div className="song-detail__section">
                <h3>Notes</h3>
                <p>{song.notes}</p>
              </div>
            )}
            {song.youtubeLink && (
              <div className="song-detail__section">
                <h3>Reference</h3>
                <a
                  href={song.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube
                </a>
              </div>
            )}
            {song.chordsUrl && (
              <div className="song-detail__section">
                <h3>Chords Reference</h3>
                <a
                  href={song.chordsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
        )}
      </IonContent>
    </IonModal>
  );
};
