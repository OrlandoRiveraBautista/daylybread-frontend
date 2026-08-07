import React from "react";
import { IonLoading, IonToast } from "@ionic/react";
import { MoodOption, useMoodCheckIn } from "./hooks/useMoodCheckIn";
import MoodCheckInHeader from "./components/MoodCheckInHeader";
import MoodSelector from "./components/MoodSelector";
import VerseResponse from "./components/VerseResponse";
import { MOOD_OPTIONS } from "./constants/moodOptions";
import { useHaptic } from "../../../hooks/useHaptic";
import { SignInModal } from "../../Modals";

/* Styles */
import "./MoodCheckIn.scss";

const MoodCheckIn: React.FC = () => {
  const {
    selectedMood,
    currentResponse,
    nextRequestAllowed,
    showErrorToast,
    showSignInModal,
    verseLoading,
    verseError,
    moodsError,
    saveStatus,
    bookmarkLoading,
    handleMoodSelect,
    handleNewCheckIn,
    handleErrorToastDismiss,
    handleSignInModalDismiss,
    handleSaveMoodVerse,
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

  const handleSaveWithHaptic = async () => {
    await handleSaveMoodVerse();
    triggerSuccessHaptic();
  };

  if (!selectedMood || !currentResponse) {
    return (
      <section className="mood-checkin" aria-label="Mood check-in">
        <div className="mood-checkin-surface">
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
        </div>

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

        <SignInModal
          isOpen={showSignInModal}
          onDismiss={handleSignInModalDismiss}
        />
      </section>
    );
  }

  return (
    <section className="mood-checkin" aria-label="Mood check-in">
      <VerseResponse
        response={currentResponse}
        bibleVersion={getUserPreferredBibleVersion()}
        nextRequestAllowed={nextRequestAllowed}
        onNewCheckIn={handleNewCheckInWithHaptic}
        onSave={handleSaveWithHaptic}
        saveStatus={saveStatus}
        isSaving={bookmarkLoading}
      />

      <IonLoading
        isOpen={verseLoading}
        message="Getting your verse..."
        duration={0}
      />

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

      <SignInModal
        isOpen={showSignInModal}
        onDismiss={handleSignInModalDismiss}
      />
    </section>
  );
};

export default MoodCheckIn;
