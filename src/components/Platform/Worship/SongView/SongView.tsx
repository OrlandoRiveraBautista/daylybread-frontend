import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { expandOutline, contractOutline } from "ionicons/icons";
import { useGetSong } from "../../../../hooks/SongHooks";
import { ChordSheet } from "../ChordSheet/ChordSheet";
import { PageHeader } from "../../PageHeader";
import "./SongView.scss";

export const SongView: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [isZenMode, setIsZenMode] = useState(false);

  const { data, loading } = useGetSong(id);
  const song = data?.getSong?.results;

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

  return (
    <div className={`song-view ${isZenMode ? "song-view--zen" : ""}`}>
      <PageHeader
        className="song-view__header"
        title={song.title}
        subtitle={song.artist ?? undefined}
        onBack={() => history.goBack()}
        badges={song.bpm ? [{ label: `${song.bpm} BPM`, color: "medium" }] : []}
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
      </div>
    </div>
  );
};
