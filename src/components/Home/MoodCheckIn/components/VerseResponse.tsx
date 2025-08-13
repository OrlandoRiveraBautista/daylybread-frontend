import React from "react";
import {
  IonCard,
  IonCardContent,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { share, chatbubble, bookmark, arrowBack } from "ionicons/icons";
import { VerseResponse as VerseResponseType } from "../hooks/useMoodCheckIn";
import NextMoodTimer from "./NextMoodTimer";
import "./VerseResponse.scss";

interface VerseResponseProps {
  response: VerseResponseType;
  bibleVersion: string;
  nextRequestAllowed?: string | Date | null;
  onNewCheckIn: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onTalkToGod?: () => void;
}

const VerseResponse: React.FC<VerseResponseProps> = ({
  response,
  bibleVersion,
  nextRequestAllowed,
  onNewCheckIn,
  onSave,
  onShare,
  onTalkToGod,
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      console.log("Saving verse to bookmarks...");
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else if (navigator.share) {
      navigator.share({
        title: "Daily Scripture",
        text: `"${response.verse}" - ${response.reference}\n\n${response.reflection}`,
      });
    }
  };

  const handleTalkToGod = () => {
    if (onTalkToGod) {
      onTalkToGod();
    } else {
      console.log("Opening prayer chat...");
    }
  };

  return (
    <IonCard className="mood-response-card">
      <IonCardContent>
        {/* Timer for next mood check-in */}
        <NextMoodTimer
          nextRequestAllowed={nextRequestAllowed}
          className="verse-response-timer"
        />
        <div className="response-header">
          <IonText>
            <h3>A word for your heart today</h3>
          </IonText>
          <IonButton
            fill="outline"
            size="small"
            onClick={onNewCheckIn}
            className="new-checkin-btn"
          >
            <IonIcon icon={arrowBack} slot="start" />
            Check in again
          </IonButton>
        </div>

        <div className="verse-content">
          <IonText>
            <p className="verse-text">"{response.verse}"</p>
            <p className="verse-reference">
              — {response.reference}
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--ion-color-medium)",
                  marginLeft: "8px",
                }}
              >
                ({bibleVersion})
              </span>
            </p>
          </IonText>
        </div>

        <div className="reflection-content">
          <IonText>
            <p className="reflection-text">{response.reflection}</p>
          </IonText>
        </div>

        <div className="action-buttons">
          <IonButton
            fill="outline"
            size="small"
            onClick={handleSave}
            className="action-btn"
          >
            <IonIcon icon={bookmark} slot="start" />
            Save
          </IonButton>
          <IonButton
            fill="outline"
            size="small"
            onClick={handleShare}
            className="action-btn"
          >
            <IonIcon icon={share} slot="start" />
            Share
          </IonButton>
          <IonButton
            fill="solid"
            size="small"
            color="primary"
            onClick={handleTalkToGod}
            className="action-btn talk-btn"
          >
            <IonIcon icon={chatbubble} slot="start" />
            Talk to God
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default VerseResponse;
