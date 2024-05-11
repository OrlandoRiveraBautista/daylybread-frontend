import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonRow,
  IonSpinner,
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
  const [audio, setAudio] = useState("");
  const [playAudio, setPlayAudio] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  //   const [progress, setProgress] = useState();
  const audioRef = useRef<HTMLAudioElement>(null);

  // const { setAudioCurrentTime } = useAppContext();

  useEffect(() => {
    const audio = audioRef?.current;

    const handleTimeUpdate = () => {
      // setAudioCurrentTime(audio?.currentTime!);
    };

    audio?.addEventListener("timeupdate", handleTimeUpdate);

    // Clean up the event listener
    return () => {
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // use effect to call download audio handler
  useEffect(() => {
    if (playAudio) {
      setPlayAudio(false);
    }

    if (!src) return;

    handleDownloadAudio();
  }, [src]);

  /**
   * Function handles downloading an audio file based on the src provided.
   * Src prop must be a link from AWS S3
   */
  const handleDownloadAudio = async () => {
    setLoading(true);
    try {
      // const blob = await new aws().downloadFileFromS3(src!);
      // const url = URL.createObjectURL(blob!);
      setAudio(src!);
      setLoading(false);
    } catch (error) {
      console.error("Error downloading audio file:", error);
      setLoading(false);
    }
  };

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
                onClick={handleDownloadAudio}
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
          {!loading ? (
            <IonIcon src={playAudio ? pause : play} />
          ) : (
            <IonSpinner color="dark" />
          )}
        </IonButton>
      )}
      <audio ref={audioRef} src={audio} />
    </div>
  );
};

export default Player;
