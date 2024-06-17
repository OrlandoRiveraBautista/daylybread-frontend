import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";

/* Context */
import { useAppContext } from "../../context/context";

/* Icons */
import { pause, play, playSkipBack, playSkipForward } from "ionicons/icons";

/* Styles */
import "./Player.scss";

/* Interfaces */
interface IPlayer {
  src?: string;
  type?: "button" | "player";
}

/**
 * This component is unfinished. Decided to change the UX mid way lol sorry future Orlando
 */
const Player: React.FC<IPlayer> = ({ src, type }: IPlayer) => {
  const [playAudio, setPlayAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { setCurrentMediaTimestamp } = useAppContext();

  useEffect(() => {
    const audio = audioRef?.current;

    const handleTimeUpdate = () => {
      setCurrentMediaTimestamp(audio?.currentTime!);
    };

    audio?.addEventListener("timeupdate", handleTimeUpdate);

    // Clean up the event listener
    return () => {
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
    };
    // Empty dependency array ensures the effect runs only once
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // use effect to call download audio handler
  useEffect(() => {
    if (playAudio) {
      setPlayAudio(false);
    }

    if (!src) return;
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleAudio = () => {
    if (playAudio) {
      audioRef.current?.pause();
      setPlayAudio(false);
      return;
    }

    audioRef.current?.play();
    setPlayAudio(true);
    return;
  };

  return (
    <div id="player">
      {type === "player" ? (
        <IonCard>
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
          <IonCardContent>
            <div className="playing-container">
              <IonRow>
                <IonText className="now-playing-text">
                  <sub>Now playing:</sub>
                </IonText>
              </IonRow>
              <IonRow>
                <IonText className="playing-text">Gen 4</IonText>
              </IonRow>
            </div>
            <div className="controls-contianer">
              <IonButton
                fill="clear"
                className="textarea-send-button"
                color="dark"
                // onClick={handleDownloadAudio}
              >
                <IonIcon src={playSkipBack} />
              </IonButton>
              <IonButton
                fill="clear"
                className="textarea-send-button"
                color="dark"
                onClick={toggleAudio}
              >
                <IonIcon src={play} />
              </IonButton>
              <IonButton
                fill="clear"
                className="textarea-send-button"
                color="dark"
              >
                <IonIcon src={playSkipForward} />
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      ) : (
        <IonButton
          fill="clear"
          className="play-button-player-standalone"
          color="dark"
          onClick={toggleAudio}
        >
          <IonIcon src={playAudio ? pause : play} />
        </IonButton>
      )}
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default Player;
