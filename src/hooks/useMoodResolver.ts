import { gql } from "../__generated__/gql";
import { useLazyQuery, useQuery } from "@apollo/client";

// Types matching your existing component and GraphQL schema
export interface MoodRequestInput {
  mood: string;
  additionalContext?: string;
  preferredBibleVersion?: string;
}

export interface VerseResponse {
  verse: string;
  reference: string;
  reflection: string;
  mood: string;
  fromCache: boolean;
  nextRequestAllowed?: Date;
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

// Hook for getting mood-based verses (using lazy query)
export const useMoodResolver = () => {
  const [getMoodBasedVerse, { loading, error }] = useLazyQuery(
    getMoodBasedVerseQuery
  );

  const fetchMoodBasedVerse = async (
    mood: string,
    additionalContext?: string,
    preferredBibleVersion: string = "NIV"
  ): Promise<VerseResponse | null> => {
    try {
      const input: MoodRequestInput = {
        mood: mood.toLowerCase(),
        additionalContext,
        preferredBibleVersion,
      };

      const result = await getMoodBasedVerse({
        variables: { input },
      });

      if (result.error) {
        console.error("Apollo error:", result.error);
        return null;
      }

      const moodResponse = result.data?.getMoodBasedVerse;

      if (moodResponse?.errors && moodResponse.errors.length > 0) {
        console.error("API errors:", moodResponse.errors);
        return null;
      }

      if (!moodResponse?.result) {
        console.error("No verse found for this mood");
        return null;
      }

      return moodResponse.result;
    } catch (err) {
      console.error("Error getting mood-based verse:", err);
      return null;
    }
  };

  return {
    getMoodBasedVerse: fetchMoodBasedVerse,
    loading,
    error: error?.message || null,
    clearError: () => {}, // Apollo handles error clearing
  };
};

// Hook for getting supported moods
export const useSupportedMoods = () => {
  const { loading, error, data } = useQuery(getSupportedMoodsQuery);

  return {
    moods: data?.getSupportedMoods || [],
    loading,
    error: error?.message || null,
    fetchSupportedMoods: () => {}, // Not needed with useQuery as it auto-fetches
  };
};

// Constants that match your resolver
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
