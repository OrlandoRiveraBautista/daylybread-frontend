import { gql } from "../__generated__/gql";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

/* Queries */
const GetMedia = gql(`
  query GetMedia($id: String!) {
    getMedia(id: $id) {
      _id
      url
      filename
      mimeType
      size
      purpose
      isPublic
      description
      owner {
        _id
      }
      createdAt
      updatedAt
    }
  }
`) as DocumentNode;

const GetMediaByPurpose = gql(`
  query GetMediaByPurpose($purpose: String!) {
    getMediaByPurpose(purpose: $purpose) {
      _id
      url
      filename
      mimeType
      size
      purpose
      isPublic
      description
      owner {
        _id
      }
      createdAt
      updatedAt
    }
  }
`) as DocumentNode;

/* Mutations */
const GetSignedUrl = gql(`
  mutation GetSignedUrl($options: SignedUrlInput!) {
    getSignedUrl(options: $options) {
      signedUrl
      fileKey
      errors {
        field
        message
      }
    }
  }
`) as DocumentNode;

const CreateMedia = gql(`
  mutation CreateMedia($options: MediaInput!) {
    createMedia(options: $options) {
      results {
        _id
        url
        filename
        mimeType
        size
        purpose
        isPublic
        description
        owner {
          _id
        }
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`) as DocumentNode;

const UpdateMedia = gql(`
  mutation UpdateMedia($id: String!, $options: MediaInput!) {
    updateMedia(id: $id, options: $options) {
      results {
        _id
        url
        filename
        mimeType
        size
        purpose
        isPublic
        description
        owner {
          _id
        }
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`) as DocumentNode;

const DeleteMedia = gql(`
  mutation DeleteMedia($id: String!) {
    deleteMedia(id: $id) {
      results {
        _id
        url
        filename
        mimeType
        size
        purpose
        isPublic
        description
        owner {
          _id
        }
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`) as DocumentNode;

/* Hooks */
export const useGetMedia = (id: string) => {
  return useQuery(GetMedia, {
    variables: { id },
    skip: !id,
  });
};

export const useLazyGetMedia = () => {
  return useLazyQuery(GetMedia);
};

export const useGetMediaByPurpose = (purpose: string) => {
  return useQuery(GetMediaByPurpose, {
    variables: { purpose },
    skip: !purpose,
  });
};

export const useLazyGetMediaByPurpose = () => {
  return useLazyQuery(GetMediaByPurpose);
};

export const useGetSignedUrl = () => {
  return useMutation(GetSignedUrl);
};

export const useCreateMedia = () => {
  return useMutation(CreateMedia);
};

export const useUpdateMedia = () => {
  return useMutation(UpdateMedia);
};

export const useDeleteMedia = () => {
  return useMutation(DeleteMedia);
};
