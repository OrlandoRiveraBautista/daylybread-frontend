import { gql } from "../__generated__/gql";
import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import { gql as rawGql } from "@apollo/client";

/* Queries */
const GetSermons = gql(`
  query GetSermons {
    getSermons {
      results {
        _id
        title
        content
        status
        createdAt
        updatedAt
        author {
          _id
          firstName
          lastName
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const GetSermon = gql(`
  query GetSermon($id: String!) {
    getSermon(id: $id) {
      results {
        _id
        title
        content
        status
        createdAt
        updatedAt
        author {
          _id
          firstName
          lastName
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

/* Mutations */
const CreateSermon = gql(`
  mutation CreateSermon($options: SermonInput!) {
    createSermon(options: $options) {
      results {
        _id
        title
        content
        status
        createdAt
        updatedAt
        author {
          _id
          firstName
          lastName
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const UpdateSermon = gql(`
  mutation UpdateSermon($id: String!, $options: SermonInput!) {
    updateSermon(id: $id, options: $options) {
      results {
        _id
        title
        content
        status
        createdAt
        updatedAt
        author {
          _id
          firstName
          lastName
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const DeleteSermon = gql(`
  mutation DeleteSermon($id: String!) {
    deleteSermon(id: $id) {
      results {
        _id
        title
      }
      errors {
        field
        message
      }
    }
  }
`);

/* Hooks */
export const useGetSermons = () => {
  return useQuery(GetSermons);
};

export const useLazyGetSermons = () => {
  return useLazyQuery(GetSermons);
};

export const useGetSermon = (id: string) => {
  return useQuery(GetSermon, {
    variables: { id },
    skip: !id,
  });
};

export const useLazyGetSermon = () => {
  return useLazyQuery(GetSermon);
};

export const useCreateSermon = () => {
  return useMutation(CreateSermon, {
    refetchQueries: [{ query: GetSermons }],
  });
};

export const useUpdateSermon = () => {
  return useMutation(UpdateSermon, {
    refetchQueries: [{ query: GetSermons }],
  });
};

export const useDeleteSermon = () => {
  return useMutation(DeleteSermon, {
    refetchQueries: [{ query: GetSermons }],
  });
};

/* Sermon AI Types - Values must match GraphQL enum keys exactly */
export enum SermonAIPromptType {
  // Structure
  OPENING_STORY = "OPENING_STORY",
  MAIN_POINTS = "MAIN_POINTS",
  CALL_TO_ACTION = "CALL_TO_ACTION",
  TRANSITIONS = "TRANSITIONS",
  SERMON_OUTLINE = "SERMON_OUTLINE",
  // Scripture
  RELEVANT_VERSES = "RELEVANT_VERSES",
  HISTORICAL_CONTEXT = "HISTORICAL_CONTEXT",
  CROSS_REFERENCES = "CROSS_REFERENCES",
  TESTAMENT_CONNECTION = "TESTAMENT_CONNECTION",
  VERSE_EXPLANATION = "VERSE_EXPLANATION",
  // Illustrations
  PERSONAL_TESTIMONY = "PERSONAL_TESTIMONY",
  MODERN_EXAMPLE = "MODERN_EXAMPLE",
  DAILY_LIFE_ANALOGY = "DAILY_LIFE_ANALOGY",
  CURRENT_EVENTS = "CURRENT_EVENTS",
  // Application
  PRACTICAL_APPLICATION = "PRACTICAL_APPLICATION",
  ADDRESS_CHALLENGES = "ADDRESS_CHALLENGES",
  ACTIONABLE_STEPS = "ACTIONABLE_STEPS",
  REFLECTION_QUESTIONS = "REFLECTION_QUESTIONS",
  // General
  EXPAND_CONTENT = "EXPAND_CONTENT",
  SUMMARIZE = "SUMMARIZE",
  IMPROVE_CLARITY = "IMPROVE_CLARITY",
  ADD_DEPTH = "ADD_DEPTH",
  CUSTOM = "CUSTOM",
  // Inline editing
  INLINE_EDIT = "INLINE_EDIT",
}

export interface SermonAIInput {
  promptType: SermonAIPromptType;
  customPrompt?: string;
  sermonTitle?: string;
  sermonContent?: string;
  highlightedText?: string;
  additionalContext?: string;
  language?: string;
  sessionId?: string; // Required for streaming
}

export interface SermonAIContent {
  content: string;
  suggestions?: string;
  relatedVerses?: string[];
  promptType: string;
}

export interface SermonAIResponse {
  result?: SermonAIContent;
  errors?: { field?: string; message: string }[];
}

export interface SermonAIPromptInfo {
  type: SermonAIPromptType;
  category: string;
  label: string;
  description: string;
}

/* Sermon AI Mutations */
const GenerateSermonContent = rawGql`
  mutation GenerateSermonContent($input: SermonAIInput!) {
    generateSermonContent(input: $input) {
      result {
        content
        suggestions
        relatedVerses
        promptType
      }
      errors {
        message
      }
    }
  }
`;

/* Sermon AI Queries */
const GetSermonAIPromptTypes = rawGql`
  query GetSermonAIPromptTypes {
    getSermonAIPromptTypes {
      type
      category
      label
      description
    }
  }
`;

/* Sermon AI Hooks */
export const useGenerateSermonContent = () => {
  return useMutation<
    { generateSermonContent: SermonAIResponse },
    { input: SermonAIInput }
  >(GenerateSermonContent);
};

export const useGetSermonAIPromptTypes = () => {
  return useQuery<{ getSermonAIPromptTypes: SermonAIPromptInfo[] }>(
    GetSermonAIPromptTypes
  );
};

export const useLazyGetSermonAIPromptTypes = () => {
  return useLazyQuery<{ getSermonAIPromptTypes: SermonAIPromptInfo[] }>(
    GetSermonAIPromptTypes
  );
};

/* Sermon AI Streaming */
const StreamSermonContent = rawGql`
  mutation StreamSermonContent($input: SermonAIInput!) {
    streamSermonContent(input: $input)
  }
`;

const SermonAIStreamSubscription = rawGql`
  subscription SermonAIStream($sessionId: String!) {
    sermonAIStream(sessionId: $sessionId)
  }
`;

export const useStreamSermonContent = () => {
  return useMutation<{ streamSermonContent: boolean }, { input: SermonAIInput }>(
    StreamSermonContent
  );
};

export const useSermonAIStream = (sessionId: string, skip: boolean = true) => {
  return useSubscription<{ sermonAIStream: string }>(
    SermonAIStreamSubscription,
    {
      variables: { sessionId },
      skip,
    }
  );
};
