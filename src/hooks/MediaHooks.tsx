import { gql } from "../__generated__/gql";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

/* Queries */
const GetMedia = gql(`
  query GetMedia($id: String!) {
    getMedia(id: $id) {
      _id
      fileKey
      filename
      mimeType
      size
      purpose
      isPublic
      description
      owner {
        _id
      }
      cache {
        url
        expiresAt
        duration
      }
      createdAt
      updatedAt
    }
  }
`);

const GetMediaByPurpose = gql(`
  query GetMediaByPurpose($purpose: String!) {
    getMediaByPurpose(purpose: $purpose) {
      _id
      fileKey
      filename
      mimeType
      size
      purpose
      isPublic
      description
      owner {
        _id
      }
      cache {
        url
        expiresAt
        duration
      }
      createdAt
      updatedAt
    }
  }
`);

const GetMediaUrl = gql(`
  query GetMediaUrl($fileKey: String!) {
    getMediaUrl(fileKey: $fileKey) {
      signedUrl
      errors {
        field
        message
      }
    }
  }
`);

/* Mutations */
const GetGetSignedUrl = gql(`
  mutation GetGetSignedUrl($options: SignedUrlInput!) {
    getGetSignedUrl(options: $options) {
      signedUrl
      fileKey
      errors {
        field
        message
      }
    }
  }
`);

const GetPostSignedUrl = gql(`
  mutation GetPostSignedUrl($options: SignedUrlInput!) {
    getPostSignedUrl(options: $options) {
      signedUrl
      fields
      fileKey
      errors {
        field
        message
      }
    }
  }
`);

const CreateMedia = gql(`
  mutation CreateMedia($options: MediaInput!) {
    createMedia(options: $options) {
      results {
        _id
        fileKey
        filename
        mimeType
        size
        purpose
        isPublic
        description
        owner {
          _id
        }
        cache {
          url
          expiresAt
          duration
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
`);

const UpdateMedia = gql(`
  mutation UpdateMedia($id: String!, $options: MediaInput!) {
    updateMedia(id: $id, options: $options) {
      results {
        _id
        fileKey
        filename
        mimeType
        size
        purpose
        isPublic
        description
        owner {
          _id
        }
        cache {
          url
          expiresAt
          duration
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
`);

const DeleteMedia = gql(`
  mutation DeleteMedia($id: String!) {
    deleteMedia(id: $id) {
      results {
        _id
        fileKey
        filename
        mimeType
        size
        purpose
        isPublic
        description
        owner {
          _id
        }
        cache {
          url
          expiresAt
          duration
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
`);

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

export const useLazyGetMediaUrl = () => {
  return useLazyQuery(GetMediaUrl);
};

export const useGetGetSignedUrl = () => {
  return useMutation(GetGetSignedUrl);
};

export const useGetPostSignedUrl = () => {
  return useMutation(GetPostSignedUrl);
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
