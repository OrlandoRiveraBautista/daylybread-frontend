import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { useMoodCheckIn } from "./hooks/useMoodCheckIn";
import MoodCheckInHeader from "./components/MoodCheckInHeader";
import MoodSelector from "./components/MoodSelector";
import VerseResponse from "./components/VerseResponse";
import { MOOD_OPTIONS } from "./constants/moodOptions";

/* Styles */
import "./MoodCheckIn.scss";

const MoodCheckIn: React.FC = () => {
  const {
    selectedMood,
    currentResponse,
    showErrorToast,
    verseLoading,
    verseError,
    moodsError,
    handleMoodSelect,
    handleNewCheckIn,
    handleErrorToastDismiss,
    getUserPreferredBibleVersion,
    getBibleHistoryContext,
  } = useMoodCheckIn();

  if (!selectedMood || !currentResponse) {
    return (
      <IonGrid className="mood-checkin-grid">
        <IonRow>
          <IonCol size="12">
            <IonCard className="mood-checkin-card">
              <IonCardContent>
                <MoodCheckInHeader
                  bibleVersion={getUserPreferredBibleVersion()}
                  bibleContext={getBibleHistoryContext()}
                />

                <MoodSelector
                  moodOptions={MOOD_OPTIONS}
                  onMoodSelect={handleMoodSelect}
                  isLoading={verseLoading}
                  disabled={verseLoading}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

        {/* Error toast */}
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={handleErrorToastDismiss}
          message={
            verseError ||
            moodsError ||
            "Something went wrong. Please try again."
          }
          duration={4000}
          color="danger"
          position="top"
        />
      </IonGrid>
    );
  }

  return (
    <IonGrid className="mood-checkin-grid">
      <IonRow>
        <IonCol size="12">
          <VerseResponse
            response={currentResponse}
            bibleVersion={getUserPreferredBibleVersion()}
            onNewCheckIn={handleNewCheckIn}
          />
        </IonCol>
      </IonRow>

      {/* Loading overlay */}
      <IonLoading
        isOpen={verseLoading}
        message="Getting your verse..."
        duration={0}
      />

      {/* Error toast */}
      <IonToast
        isOpen={showErrorToast}
        onDidDismiss={handleErrorToastDismiss}
        message={
          verseError || moodsError || "Something went wrong. Please try again."
        }
        duration={4000}
        color="danger"
        position="top"
      />
    </IonGrid>
  );
};

export default MoodCheckIn;
