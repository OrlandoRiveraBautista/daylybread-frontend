import { gql } from "../__generated__/gql";
import { useLazyQuery, useQuery } from "@apollo/client";

// Types matching the GraphQL schema
export interface MoodRequestInput {
  mood: string;
  additionalContext?: string;
  preferredBibleVersion?: string;
}

export interface VerseResponseType {
  verse: string;
  reference: string;
  reflection: string;
  mood: string;
  fromCache: boolean;
  nextRequestAllowed?: Date;
}

export interface FieldError {
  message: string;
}

export interface MoodCache {
  _id: string;
  userId: string;
  mood: string;
  verse: string;
  reference: string;
  reflection: string;
  additionalContext?: string;
  preferredBibleVersion?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MoodResponse {
  errors?: FieldError[];
  result?: VerseResponseType;
}

// GraphQL queries using gql
const getMoodBasedVerseQuery = gql(`
  query GetMoodBasedVerse($input: MoodRequestInput!) {
    getMoodBasedVerse(input: $input) {
      errors {
        message
      }
      result {
        verse
        reference
        reflection
        mood
        fromCache
        nextRequestAllowed
      }
    }
  }
`);

const getSupportedMoodsQuery = gql(`
  query GetSupportedMoods {
    getSupportedMoods
  }
`);

const getUserMoodHistoryQuery = gql(`
  query GetUserMoodHistory {
    getUserMoodHistory {
      _id
      userId
      mood
      verse
      reference
      reflection
      additionalContext
      preferredBibleVersion
      expiresAt
      createdAt
      updatedAt
    }
  }
`);

const getNextMoodRequestTimeQuery = gql(`
  query GetNextMoodRequestTime($mood: String!) {
    getNextMoodRequestTime(mood: $mood)
  }
`);

// Hook for getting mood-based verses
export const useMoodBasedVerse = () => {
  const [getMoodBasedVerse, { loading, error, data }] = useLazyQuery(
    getMoodBasedVerseQuery
  );

  const fetchMoodBasedVerse = async (
    input: MoodRequestInput
  ): Promise<MoodResponse> => {
    try {
      const result = await getMoodBasedVerse({
        variables: { input },
      });

      if (result.error) {
        const errorMessage = result.error.message;
        return { errors: [{ message: errorMessage }] };
      }

      const moodResponse = result.data?.getMoodBasedVerse;

      if (moodResponse?.errors && moodResponse.errors.length > 0) {
        return { errors: moodResponse.errors };
      }

      if (moodResponse?.result) {
        return { result: moodResponse.result };
      }

      return { errors: [{ message: "No result found" }] };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      return { errors: [{ message: errorMessage }] };
    }
  };

  const reset = () => {
    // Apollo handles resetting internally
  };

  return {
    getMoodBasedVerse: fetchMoodBasedVerse,
    loading,
    error: error?.message || null,
    data: data?.getMoodBasedVerse?.result || null,
    reset,
  };
};

// Hook for getting supported moods
export const useSupportedMoods = () => {
  const { loading, error, data } = useQuery(getSupportedMoodsQuery);

  return {
    fetchSupportedMoods: () => {}, // Not needed with useQuery
    loading,
    error: error?.message || null,
    moods: data?.getSupportedMoods || [],
  };
};

// Hook for getting user's mood history
export const useMoodHistory = () => {
  const { loading, error, data, refetch } = useQuery(getUserMoodHistoryQuery);

  return {
    loading,
    error: error?.message || null,
    moodHistory: data?.getUserMoodHistory || [],
    refetchHistory: refetch,
  };
};

// Hook for getting next allowed request time for a specific mood
export const useNextMoodRequestTime = () => {
  const [getNextRequestTime, { loading, error, data }] = useLazyQuery(
    getNextMoodRequestTimeQuery
  );

  const checkNextRequestTime = async (mood: string): Promise<Date | null> => {
    try {
      const result = await getNextRequestTime({
        variables: { mood },
      });

      if (result.error) {
        console.error("Error getting next request time:", result.error.message);
        return null;
      }

      return result.data?.getNextMoodRequestTime || null;
    } catch (err) {
      console.error("Error checking next request time:", err);
      return null;
    }
  };

  return {
    checkNextRequestTime,
    loading,
    error: error?.message || null,
    nextRequestTime: data?.getNextMoodRequestTime || null,
  };
};

// Combined hook for convenience
export const useMoodApi = () => {
  const moodVerse = useMoodBasedVerse();
  const supportedMoods = useSupportedMoods();
  const moodHistory = useMoodHistory();
  const nextRequestTime = useNextMoodRequestTime();

  return {
    // Mood-based verse functionality
    getMoodBasedVerse: moodVerse.getMoodBasedVerse,
    verseLoading: moodVerse.loading,
    verseError: moodVerse.error,
    verseData: moodVerse.data,
    resetVerse: moodVerse.reset,

    // Supported moods functionality
    fetchSupportedMoods: supportedMoods.fetchSupportedMoods,
    moodsLoading: supportedMoods.loading,
    moodsError: supportedMoods.error,
    moods: supportedMoods.moods,

    // Mood history functionality
    moodHistory: moodHistory.moodHistory,
    historyLoading: moodHistory.loading,
    historyError: moodHistory.error,
    refetchHistory: moodHistory.refetchHistory,

    // Next request time functionality
    checkNextRequestTime: nextRequestTime.checkNextRequestTime,
    nextRequestLoading: nextRequestTime.loading,
    nextRequestError: nextRequestTime.error,
    nextRequestTime: nextRequestTime.nextRequestTime,
  };
};

// Utility function to validate mood input
export const validateMoodInput = (input: MoodRequestInput): string | null => {
  if (!input.mood || input.mood.trim() === "") {
    return "Mood is required";
  }

  if (input.mood.length > 50) {
    return "Mood must be less than 50 characters";
  }

  if (input.additionalContext && input.additionalContext.length > 500) {
    return "Additional context must be less than 500 characters";
  }

  return null;
};

// Constants for supported moods (can be used for validation)
export const SUPPORTED_MOODS = [
  "peaceful",
  "grateful",
  "downcast",
  "frustrated",
  "anxious",
  "loved",
  "guilty",
  "hopeful",
] as const;

export type SupportedMood = (typeof SUPPORTED_MOODS)[number];
