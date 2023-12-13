import { gql } from "../__generated__/gql";
import { useQuery, useSubscription } from "@apollo/client";

/* Queries */
// Name should be changed to getChatGpt
const getOpenAI = gql(`
    query OpenAi($promptText: String!) {
        getOpen(promptText: $promptText)
    }
`);

const OPEN_AI_STREAM_RESPONSE = gql(`
  subscription Subscription {
    aiChatReponseUpdated
  }
`);

export const useOpenAI = (promptText: string) => {
  const response = useQuery(getOpenAI, {
    variables: {
      promptText: promptText,
    },
  });

  return response;
};

export const useOpenAIResponseStream = () => {
  const { data, loading, error } = useSubscription(OPEN_AI_STREAM_RESPONSE);

  return { data, loading, error };
};
