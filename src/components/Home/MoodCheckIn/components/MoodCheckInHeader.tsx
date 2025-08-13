import React from "react";
import { IonText } from "@ionic/react";
import "./MoodCheckInHeader.scss";

interface MoodCheckInHeaderProps {
  bibleVersion: string;
  bibleContext: string;
}

const MoodCheckInHeader: React.FC<MoodCheckInHeaderProps> = ({
  bibleVersion,
  bibleContext,
}) => {
  return (
    <div className="mood-checkin-header">
      <IonText>
        <h2>🤔 How are you feeling today?</h2>
        <p>Let God's Word speak to your heart</p>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--ion-color-medium)",
            marginTop: "4px",
          }}
        >
          Using {bibleVersion} {bibleContext}
        </p>
      </IonText>
    </div>
  );
};

export default MoodCheckInHeader;
