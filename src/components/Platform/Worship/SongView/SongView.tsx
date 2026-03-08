import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonBadge,
} from "@ionic/react";
import { arrowBack, expandOutline, contractOutline } from "ionicons/icons";
import { useGetSong } from "../../../../hooks/SongHooks";
import { ChordSheet } from "../ChordSheet/ChordSheet";
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
        <IonButton fill="clear" onClick={() => history.goBack()}>
          <IonIcon slot="start" icon={arrowBack} /> Back
        </IonButton>
        <p>Song not found.</p>
      </div>
    );
  }

  return (
    <div className={`song-view ${isZenMode ? "song-view--zen" : ""}`}>
      <div className="song-view__header">
        <div className="song-view__header-left">
          <IonButton fill="clear" size="small" shape="round" onClick={() => history.goBack()}>
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <div className="song-view__title-block">
            <h1>{song.title}</h1>
            {song.artist && <p className="song-view__artist">{song.artist}</p>}
          </div>
        </div>
        <div className="song-view__header-right">
          {song.bpm && <IonBadge color="medium">{song.bpm} BPM</IonBadge>}
          <IonButton
            fill="clear"
            size="small"
            shape="round"
            onClick={() => setIsZenMode(!isZenMode)}
            title={isZenMode ? "Exit zen mode" : "Zen mode"}
          >
            <IonIcon slot="icon-only" icon={isZenMode ? contractOutline : expandOutline} />
          </IonButton>
        </div>
      </div>

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
