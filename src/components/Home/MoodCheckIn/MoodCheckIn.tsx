import React, { useEffect, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonButton,
  IonChip,
  IonIcon,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { share, chatbubble, bookmark } from "ionicons/icons";
import { useMoodApi, MoodRequestInput } from "../../../hooks/useMoodApi";
import { useAppContext } from "../../../context/context";
import { useUserBibleHistory } from "../../../hooks/UserHooks";

/* Styles */
import "./MoodCheckIn.scss";

interface MoodOption {
  emoji: string;
  label: string;
  tag: string;
  color: string;
}

interface VerseResponse {
  verse: string;
  reference: string;
  reflection: string;
}

const MoodCheckIn: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentResponse, setCurrentResponse] = useState<VerseResponse | null>(
    null
  );
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Get user's current Bible translation from global context
  const { chosenTranslation } = useAppContext();

  // Get user's Bible history to use their most recently read Bible translation
  const { data: userBibleHistoryData } = useUserBibleHistory();

  // Function to get the user's most recently used Bible translation
  const getUserPreferredBibleVersion = (): string => {
    // First, try to get from Bible history (most recent reading activity)
    if (userBibleHistoryData) {
      const currentUserBibleHistory =
        userBibleHistoryData.me?.user?.bibleHistory?.find(
          (history) => history.current
        );

      if (
        currentUserBibleHistory &&
        currentUserBibleHistory.history.length > 0
      ) {
        const latestHistory = currentUserBibleHistory.history[0];
        if (latestHistory?.bibleAbbr) {
          return latestHistory.bibleAbbr;
        }
      }
    }

    // Fallback to current translation if available
    if (chosenTranslation?.abbreviation) {
      return chosenTranslation.abbreviation;
    }

    // Final fallback to NIV
    return "NIV";
  };

  // Function to get additional context about the user's Bible reading
  const getBibleHistoryContext = (): string => {
    if (userBibleHistoryData) {
      const currentUserBibleHistory =
        userBibleHistoryData.me?.user?.bibleHistory?.find(
          (history) => history.current
        );

      if (
        currentUserBibleHistory &&
        currentUserBibleHistory.history.length > 0
      ) {
        const latestHistory = currentUserBibleHistory.history[0];
        if (latestHistory?.bibleAbbr && latestHistory?.bookId) {
          return `from your recent reading in ${latestHistory.bookId}`;
        }
        return "from your reading history";
      }
    }

    if (chosenTranslation) {
      return "from your current selection";
    }

    return "(default)";
  };

  // Use the more complex mood API hook
  const {
    getMoodBasedVerse,
    verseLoading,
    verseError,
    verseData,
    resetVerse,
    fetchSupportedMoods,
    moodsError,
    moods,
  } = useMoodApi();

  const moodOptions: MoodOption[] = [
    { emoji: "😇", label: "Peaceful", tag: "peaceful", color: "success" },
    { emoji: "🙏", label: "Grateful", tag: "grateful", color: "primary" },
    { emoji: "😞", label: "Downcast", tag: "downcast", color: "medium" },
    { emoji: "😤", label: "Frustrated", tag: "frustrated", color: "warning" },
    { emoji: "💭", label: "Anxious", tag: "anxious", color: "tertiary" },
    { emoji: "❤️", label: "Loved", tag: "loved", color: "secondary" },
    { emoji: "😔", label: "Guilty", tag: "guilty", color: "dark" },
    { emoji: "🌱", label: "Hopeful", tag: "hopeful", color: "success" },
  ];

  const handleMoodSelect = async (mood: MoodOption) => {
    setSelectedMood(mood.tag);
    setCurrentResponse(null); // Clear previous response

    try {
      // Get user's preferred Bible version based on their reading history
      const userBibleVersion = getUserPreferredBibleVersion();

      console.log(
        `Getting mood verse for "${
          mood.tag
        }" using ${userBibleVersion} translation ${getBibleHistoryContext()}`
      );

      // Prepare input object for the API
      const input: MoodRequestInput = {
        mood: mood.tag,
        additionalContext: undefined, // Could add a text input for this later
        preferredBibleVersion: userBibleVersion,
      };

      // Call the more complex API
      const response = await getMoodBasedVerse(input);

      if (response.errors) {
        // Handle API errors
        console.error("API errors:", response.errors);
        setShowErrorToast(true);
      } else if (response.result) {
        // Handle successful response
        setCurrentResponse({
          verse: response.result.verse,
          reference: response.result.reference,
          reflection: response.result.reflection,
        });
      } else {
        // Fallback error
        setShowErrorToast(true);
      }
    } catch (err) {
      console.error("Error getting mood-based verse:", err);
      setShowErrorToast(true);
    }
  };

  const handleNewCheckIn = () => {
    setSelectedMood(null);
    setCurrentResponse(null);
    resetVerse(); // Reset the verse data
    setShowErrorToast(false);
  };

  // Show error toast when there's an API error
  React.useEffect(() => {
    if (verseError || moodsError) {
      setShowErrorToast(true);
    }
  }, [verseError, moodsError]);

  const handleErrorToastDismiss = () => {
    setShowErrorToast(false);
  };

  // Automatically use verse data from the hook when available
  useEffect(() => {
    if (verseData && !currentResponse) {
      setCurrentResponse({
        verse: verseData.verse,
        reference: verseData.reference,
        reflection: verseData.reflection,
      });
    }
  }, [verseData, currentResponse]);

  // Optional: Fetch supported moods on component mount (for future use)
  useEffect(() => {
    if (moods.length === 0) {
      fetchSupportedMoods();
    }
  }, [moods.length, fetchSupportedMoods]);

  const handleSaveVerse = () => {
    // TODO: Implement save functionality
    console.log("Saving verse to bookmarks...");
  };

  const handleShareVerse = () => {
    // TODO: Implement share functionality
    if (currentResponse && navigator.share) {
      navigator.share({
        title: "Daily Scripture",
        text: `"${currentResponse.verse}" - ${currentResponse.reference}\n\n${currentResponse.reflection}`,
      });
    }
  };

  const handleTalkToGod = () => {
    // TODO: Navigate to AI chat/prayer feature
    console.log("Opening prayer chat...");
  };

  if (!selectedMood || !currentResponse) {
    return (
      <IonGrid className="mood-checkin-grid">
        <IonRow>
          <IonCol size="12">
            <IonCard className="mood-checkin-card">
              <IonCardContent>
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
                      Using {getUserPreferredBibleVersion()}{" "}
                      {getBibleHistoryContext()}
                    </p>
                  </IonText>
                </div>

                <div className="mood-options">
                  {verseLoading ? (
                    <div className="mood-loading-container">
                      <div className="mood-loading-spinner">
                        <div className="loading-ring"></div>
                        <div className="loading-ring"></div>
                        <div className="loading-ring"></div>
                      </div>
                      <p className="mood-loading-text">Finding your verse...</p>
                    </div>
                  ) : (
                    moodOptions.map((mood, index) => (
                      <IonChip
                        key={index}
                        className={`mood-chip chip-${mood.color}`}
                        onClick={() => handleMoodSelect(mood)}
                        disabled={verseLoading}
                      >
                        <span className="mood-emoji">{mood.emoji}</span>
                        <span className="mood-label">{mood.label}</span>
                      </IonChip>
                    ))
                  )}
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }

  return (
    <IonGrid className="mood-checkin-grid">
      <IonRow>
        <IonCol size="12">
          <IonCard className="mood-response-card">
            <IonCardContent>
              <div className="response-header">
                <IonText>
                  <h3>A word for your heart today</h3>
                </IonText>
                <IonButton
                  fill="clear"
                  size="small"
                  onClick={handleNewCheckIn}
                  className="new-checkin-btn"
                >
                  Check in again
                </IonButton>
              </div>

              <div className="verse-content">
                <IonText>
                  <p className="verse-text">"{currentResponse.verse}"</p>
                  <p className="verse-reference">
                    — {currentResponse.reference}
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--ion-color-medium)",
                        marginLeft: "8px",
                      }}
                    >
                      ({getUserPreferredBibleVersion()})
                    </span>
                  </p>
                </IonText>
              </div>

              <div className="reflection-content">
                <IonText>
                  <p className="reflection-text">
                    {currentResponse.reflection}
                  </p>
                </IonText>
              </div>

              <div className="action-buttons">
                <IonButton
                  fill="outline"
                  size="small"
                  onClick={handleSaveVerse}
                  className="action-btn"
                >
                  <IonIcon icon={bookmark} slot="start" />
                  Save
                </IonButton>
                <IonButton
                  fill="outline"
                  size="small"
                  onClick={handleShareVerse}
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
