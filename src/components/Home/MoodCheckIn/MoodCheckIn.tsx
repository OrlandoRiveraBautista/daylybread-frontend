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
import { MoodOption, useMoodCheckIn } from "./hooks/useMoodCheckIn";
import MoodCheckInHeader from "./components/MoodCheckInHeader";
import MoodSelector from "./components/MoodSelector";
import VerseResponse from "./components/VerseResponse";
import { MOOD_OPTIONS } from "./constants/moodOptions";
import { useHaptic } from "../../../hooks/useHaptic";

/* Styles */
import "./MoodCheckIn.scss";

const MoodCheckIn: React.FC = () => {
  const {
    selectedMood,
    currentResponse,
    nextRequestAllowed,
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
  const { triggerSuccessHaptic, triggerErrorHaptic } = useHaptic();

  const handleMoodSelectWithHaptic = (mood: MoodOption) => {
    triggerSuccessHaptic();
    handleMoodSelect(mood);
  };

  const handleNewCheckInWithHaptic = () => {
    triggerSuccessHaptic();
    handleNewCheckIn();
  };

  if (!selectedMood || !currentResponse) {
    return (
      <IonGrid className="mood-checkin-grid">
        <IonRow>
          <IonCol size="12">
            <IonCard className="mood-checkin-card">
              <IonCardContent>
                <MoodCheckInHeader
                  key={getUserPreferredBibleVersion()}
                  bibleVersion={getUserPreferredBibleVersion()}
                  bibleContext={getBibleHistoryContext()}
                />

                <MoodSelector
                  moodOptions={MOOD_OPTIONS}
                  onMoodSelect={handleMoodSelectWithHaptic}
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
            nextRequestAllowed={nextRequestAllowed}
            onNewCheckIn={handleNewCheckInWithHaptic}
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
        onDidDismiss={() => {
          triggerErrorHaptic();
          handleErrorToastDismiss();
        }}
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
