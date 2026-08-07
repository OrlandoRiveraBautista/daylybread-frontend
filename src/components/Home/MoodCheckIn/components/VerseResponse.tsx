import React, { useState } from "react";
import {
  IonText,
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import {
  share,
  chatbubbleEllipsesOutline,
  bookmarkOutline,
  checkmarkCircle,
  arrowBack,
} from "ionicons/icons";
import { VerseResponse as VerseResponseType } from "../hooks/useMoodCheckIn";
import NextMoodTimer from "./NextMoodTimer";
import { getBibleUrl } from "../../../../utils/support";
import BreadCrumbsModal from "../../../BreadCrumbsModal/BreadCrumbsModal";
import "./VerseResponse.scss";

interface VerseResponseProps {
  response: VerseResponseType;
  bibleVersion: string;
  nextRequestAllowed?: string | Date | null;
  onNewCheckIn: () => void;
  onSave?: () => void;
  onShare?: () => void;
  saveStatus?: "idle" | "saving" | "saved" | "error";
  isSaving?: boolean;
}

const VerseResponse: React.FC<VerseResponseProps> = ({
  response,
  bibleVersion,
  nextRequestAllowed,
  onNewCheckIn,
  onSave,
  onShare,
  saveStatus = "idle",
  isSaving = false,
}) => {
  const [showAiModal, setShowAiModal] = useState(false);

  const handleSave = () => {
    if (saveStatus === "saved" || isSaving) return;
    if (onSave) {
      onSave();
    }
  };

  const getSaveButtonContent = () => {
    if (isSaving || saveStatus === "saving") {
      return (
        <>
          <IonSpinner
            name="crescent"
            style={{ width: "16px", height: "16px", marginRight: "8px" }}
          />
          Saving...
        </>
      );
    }
    if (saveStatus === "saved") {
      return (
        <>
          <IonIcon icon={checkmarkCircle} slot="start" />
          Saved
        </>
      );
    }
    return (
      <>
        <IonIcon icon={bookmarkOutline} slot="start" />
        Save
      </>
    );
  };

  const handleShare = () => {
    const appUrl = getBibleUrl();
    const shareText = `"${response.verse}"\n\n— ${response.reference} (${bibleVersion})\n\n${response.reflection}\n\nDiscover personalized verses for your mood:\n${appUrl}\n\nShared via Daylybread`;

    if (onShare) {
      onShare();
    } else if (navigator.share) {
      navigator.share({
        title: "A verse for your heart - Daylybread",
        text: shareText,
        url: appUrl,
      });
    }
  };

  return (
    <>
      <div className="mood-response-card">
        <NextMoodTimer
          nextRequestAllowed={nextRequestAllowed}
          className="verse-response-timer"
        />

        <div className="response-header">
          <IonText>
            <h3 className="response-title">A word for your heart</h3>
          </IonText>
          <IonButton
            fill="clear"
            size="small"
            onClick={onNewCheckIn}
            className="new-checkin-btn"
          >
            <IonIcon icon={arrowBack} slot="start" />
            Again
          </IonButton>
        </div>

        <div className="verse-content">
          <IonText>
            <p className="verse-text">&ldquo;{response.verse}&rdquo;</p>
            <p className="verse-reference">
              — {response.reference}
              <span className="verse-version-badge">({bibleVersion})</span>
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
            fill={saveStatus === "saved" ? "solid" : "outline"}
            size="small"
            onClick={handleSave}
            className={`action-btn ${saveStatus === "saved" ? "saved" : ""}`}
            disabled={isSaving || saveStatus === "saving"}
            color={saveStatus === "saved" ? "success" : undefined}
          >
            {getSaveButtonContent()}
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
            onClick={() => setShowAiModal(true)}
            className="action-btn talk-btn"
          >
            <IonIcon icon={chatbubbleEllipsesOutline} slot="start" />
            Talk to God
          </IonButton>
        </div>
      </div>

      <BreadCrumbsModal
        isOpen={showAiModal}
        onDismiss={() => setShowAiModal(false)}
      />
    </>
  );
};

export default VerseResponse;
