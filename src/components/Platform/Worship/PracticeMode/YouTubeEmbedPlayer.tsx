import React, { useState } from "react";
import {
  IonBadge,
  IonButton,
  IonContent,
  IonIcon,
  IonPopover,
} from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import "./YouTubeEmbedPlayer.scss";

interface YouTubeEmbedPlayerProps {
  youtubeVideoId: string;
  /** Pitch shift in semitones — displayed as a badge only (no audio processing in embed mode). */
  pitchSemitones: number;
  songTitle?: string;
}

function formatPitchLabel(semitones: number): string {
  if (semitones === 0) return "Original pitch";
  const n = Math.abs(semitones);
  const unit = n === 1 ? "semitone" : "semitones";
  if (semitones > 0) return `+${n} ${unit}`;
  return `−${n} ${unit}`;
}

export const YouTubeEmbedPlayer: React.FC<YouTubeEmbedPlayerProps> = ({
  youtubeVideoId,
  pitchSemitones,
  songTitle,
}) => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoEvent, setInfoEvent] = useState<Event | undefined>(undefined);

  const embedSrc = `https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`;

  return (
    <div
      className="yt-embed-player"
      role="region"
      aria-label={songTitle ? `Reference video: ${songTitle}` : "Reference video player"}
    >
      <div className="yt-embed-player__header">
        <div className="yt-embed-player__title-row">
          <span className="yt-embed-player__eyebrow">Reference video</span>
          <IonButton
            fill="clear"
            color="tertiary"
            size="small"
            shape="round"
            className="yt-embed-player__info-btn"
            aria-label="About reference playback"
            aria-expanded={infoOpen}
            aria-haspopup="dialog"
            onClick={(e) => {
              setInfoEvent(e.nativeEvent);
              setInfoOpen(true);
            }}
          >
            <IonIcon slot="icon-only" icon={informationCircleOutline} />
          </IonButton>
        </div>
        <IonBadge
          color={pitchSemitones === 0 ? "medium" : "warning"}
          className="yt-embed-player__pitch-badge"
        >
          {pitchSemitones !== 0
            ? `${formatPitchLabel(pitchSemitones)} (manual)`
            : formatPitchLabel(pitchSemitones)}
        </IonBadge>
      </div>

      <IonPopover
        isOpen={infoOpen}
        event={infoEvent}
        reference="event"
        onDidDismiss={() => setInfoOpen(false)}
        className="yt-embed-player__info-popover"
        side="bottom"
        alignment="start"
        backdropDismiss
      >
        <IonContent className="ion-padding yt-embed-player__info-popover-body">
          <p className="yt-embed-player__info-popover-title">Reference video</p>
          <p className="yt-embed-player__info-popover-text">
            YouTube is embedded directly in the browser. Audio pitch is{" "}
            <strong>not</strong> automatically transposed — the video plays at
            its original pitch.
          </p>
          <p className="yt-embed-player__info-popover-note">
            The key badge shows the target transposition for reference. To hear
            the transposed audio, run the app locally where pitch-shifting is
            supported.
          </p>
        </IonContent>
      </IonPopover>

      <div className="yt-embed-player__frame-wrap">
        <iframe
          className="yt-embed-player__iframe"
          src={embedSrc}
          title={songTitle ? `${songTitle} — YouTube` : "YouTube reference video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
