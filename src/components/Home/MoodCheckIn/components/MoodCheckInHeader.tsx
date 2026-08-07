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
        <h2 className="mood-checkin-title">How are you feeling?</h2>
      </IonText>
      <p className="mood-checkin-subtitle">
        Let God&apos;s Word speak to your heart
      </p>
      <p className="bible-context-label">
        Using {bibleVersion} {bibleContext}
      </p>
    </div>
  );
};

export default MoodCheckInHeader;
