import { gql } from "../__generated__/gql";
import { useQuery } from "@apollo/client";

/* Queries */
// Name should be changed to getChatGpt
const getOpenAI = gql(`
    query OpenAi($promptText: String!) {
        getOpen(promptText: $promptText)
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
