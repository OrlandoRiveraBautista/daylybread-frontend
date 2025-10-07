import { gql } from "../__generated__/gql";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import { useHaptic } from "./useHaptic";

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
  const [streamBuffer, setStreamBuffer] = useState<string>("");
  const { triggerChatHaptic } = useHaptic();

  const { data, loading, error } = useSubscription(OPEN_AI_STREAM_RESPONSE, {
    variables: { deviceId },
    shouldResubscribe: false,
    skip: !deviceId, // Skip subscription if deviceId is not available
    onData: ({ data }) => {
      if (data?.data?.aiChatReponseUpdated) {
        if (data?.data?.aiChatReponseUpdated === "[DONE]") {
          setStreamBuffer("");
          return;
        }

        // Trigger haptic feedback for each streaming chunk
        triggerChatHaptic();
        setStreamBuffer((prev) => prev + data?.data?.aiChatReponseUpdated);
      }
    },
    onError: (error) => {
      console.error("Subscription error:", error);
    },
  });

  return {
    data,
    loading,
    error,
    streamBuffer,
  };
};
