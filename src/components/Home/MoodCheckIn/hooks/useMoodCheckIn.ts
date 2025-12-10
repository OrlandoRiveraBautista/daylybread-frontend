import { useState, useEffect } from "react";
import { useMoodApi, MoodRequestInput } from "../../../../hooks/useMoodApi";
import { useAppContext } from "../../../../context/context";
import {
  useUserBibleHistory,
  useCreateBookmarks,
} from "../../../../hooks/UserHooks";

export interface MoodOption {
  emoji: string;
  label: string;
  tag: string;
  color: string;
}

export interface VerseResponse {
  verse: string;
  reference: string;
  reflection: string;
}

export const useMoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentResponse, setCurrentResponse] = useState<VerseResponse | null>(
    null
  );
  const [nextRequestAllowed, setNextRequestAllowed] = useState<string | null>(
    null
  );
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // Get user's current Bible translation from global context
  const { chosenTranslation, userInfo } = useAppContext();

  // Bookmark mutation
  const { setBookmarks, loading: bookmarkLoading } = useCreateBookmarks();

  // Get user's Bible history to use their most recently read Bible translation
  const { data: userBibleHistoryData } = useUserBibleHistory();

  // Use the mood API hook
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

  const handleMoodSelect = async (mood: MoodOption) => {
    // Check if user is authenticated
    if (!userInfo) {
      setShowSignInModal(true);
      return;
    }

    setSelectedMood(mood.tag);
    setCurrentResponse(null); // Clear previous response

    try {
      // Get user's preferred Bible version based on their reading history
      const userBibleVersion = getUserPreferredBibleVersion();

      // Prepare input object for the API
      const input: MoodRequestInput = {
        mood: mood.tag,
        additionalContext: undefined, // Could add a text input for this later
        preferredBibleVersion: userBibleVersion.slice(-3),
        language: userBibleVersion.slice(0, 3),
      };

      // Call the API
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

        // Store the next request allowed time if provided
        if (response.result.nextRequestAllowed) {
          // Convert Date object to ISO string for consistent handling
          const nextRequestTime =
            typeof response.result.nextRequestAllowed === "string"
              ? response.result.nextRequestAllowed
              : response.result.nextRequestAllowed.toISOString();

          console.log("Next request allowed:", nextRequestTime);
          setNextRequestAllowed(nextRequestTime);
        }
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
    setNextRequestAllowed(null); // Reset the timer
    resetVerse(); // Reset the verse data
    setShowErrorToast(false);
    setSaveStatus("idle"); // Reset save status
  };

  const handleErrorToastDismiss = () => {
    setShowErrorToast(false);
  };

  const handleSignInModalDismiss = () => {
    setShowSignInModal(false);
  };

  /**
   * Parses a Bible reference string like "John 3:16" or "1 Corinthians 13:4-7"
   * Returns parsed book name, chapter, and verse information
   */
  const parseReference = (
    reference: string
  ): {
    bookName: string;
    chapter: number;
    verseStart: number;
    verseEnd?: number;
  } | null => {
    try {
      // Match patterns like "John 3:16", "1 John 4:8", "Song of Solomon 2:4", "Romans 8:28-30"
      const match = reference.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
      if (!match) return null;

      const [, bookName, chapter, verseStart, verseEnd] = match;
      return {
        bookName: bookName.trim(),
        chapter: parseInt(chapter, 10),
        verseStart: parseInt(verseStart, 10),
        verseEnd: verseEnd ? parseInt(verseEnd, 10) : undefined,
      };
    } catch {
      return null;
    }
  };

  /**
   * Saves the current mood verse to bookmarks
   */
  const handleSaveMoodVerse = async () => {
    if (!currentResponse || !userInfo) {
      if (!userInfo) {
        setShowSignInModal(true);
      }
      return;
    }

    setSaveStatus("saving");

    try {
      const bibleVersion = getUserPreferredBibleVersion();
      const parsed = parseReference(currentResponse.reference);

      // Create a verse object that matches the BbVerse structure
      const verseObject = {
        bookName: parsed?.bookName || currentResponse.reference,
        bookId:
          parsed?.bookName?.toUpperCase().replace(/\s+/g, "") || undefined,
        chapter: parsed?.chapter,
        verseStart: parsed?.verseStart,
        verseEnd: parsed?.verseEnd || parsed?.verseStart,
        verseText: currentResponse.verse,
      };

      // Create a note that includes the reflection (verse is already saved in verseText)
      const noteText = `💭 Reflection:\n${currentResponse.reflection}\n\n🙏 Mood check-in verse`;

      await setBookmarks({
        variables: {
          options: {
            bibleId: bibleVersion,
            verses: [JSON.stringify(verseObject)],
            note: noteText,
          },
        },
      });

      setSaveStatus("saved");

      // Reset status after a delay
      setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
    } catch (err) {
      console.error("Error saving mood verse to bookmarks:", err);
      setSaveStatus("error");
      setShowErrorToast(true);
    }
  };

  // Show error toast when there's an API error
  useEffect(() => {
    if (verseError || moodsError) {
      setShowErrorToast(true);
    }
  }, [verseError, moodsError]);

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

  return {
    // State
    selectedMood,
    currentResponse,
    nextRequestAllowed,
    showErrorToast,
    showSignInModal,
    verseLoading,
    verseError,
    moodsError,
    moods,
    saveStatus,
    bookmarkLoading,

    // Functions
    handleMoodSelect,
    handleNewCheckIn,
    handleErrorToastDismiss,
    handleSignInModalDismiss,
    handleSaveMoodVerse,
    getUserPreferredBibleVersion,
    getBibleHistoryContext,
  };
};
