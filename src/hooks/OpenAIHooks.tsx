import { gql } from "../__generated__/gql";
import { useLazyQuery, useSubscription } from "@apollo/client";

/* Queries */
// Name should be changed to getChatGpt
const GET_CHAT_GPT = gql(`
    query OpenAi($options: GptArgs!) {
        getOpen(options: $options)
    }
`);

const OPEN_AI_STREAM_RESPONSE = gql(`
  subscription Subscription($deviceId: String!) {
    aiChatReponseUpdated(deviceId: $deviceId)
  }
`);

export const useLazyOpenAI = () => {
  const [getChatGpt, { loading, error, data }] = useLazyQuery(GET_CHAT_GPT);

  return {
    getChatGpt,
    loading,
    error,
    data,
  };
};

export const useOpenAIResponseStream = (deviceId: string) => {
  const { data, loading, error } = useSubscription(OPEN_AI_STREAM_RESPONSE, {
    variables: { deviceId }, // Pass the actual deviceId
  });

  return { data, loading, error };
};
