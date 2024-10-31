import { gql } from "../../__generated__/gql";
import { useLazyQuery } from "@apollo/client";

/* Queries */
// Name should be changed to getChatGpt
const GET_GENERATE_IMAGE = gql(`
    query GenerateImage($prompt: String!) {
        generateImage(prompt: $prompt) {
            generatedImage
        }
    }
`);

export const useLazyGenerateImage = () => {
  const [getGenerateImage, { loading, error, data }] =
    useLazyQuery(GET_GENERATE_IMAGE);

  return {
    getGenerateImage,
    loading,
    error,
    data,
  };
};
