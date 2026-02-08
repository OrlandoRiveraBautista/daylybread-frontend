import { gql } from "../__generated__/gql";
import { gql as gqlTag } from "@apollo/client";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

/* Queries */
const GetNFCConfig = gqlTag`
  query GetNFCConfig($id: String!) {
    getNFCConfig(id: $id) {
      results {
        _id
        owner {
          _id
        }
        nfcId
        name
        deviceType
        homeScreen {
          _id
          name
          shareableLink
          tiles {
            id
            type
            label
            icon
            url
            size
            position {
              x
              y
            }
            color
            subtitle
            isInDock
          }
          wallpaper
        }
        views
        lastScannedAt
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
` as any;

// Note: Using gqlTag because this query hasn't been regenerated yet
// Run `npm run compile` after backend is running to generate proper types
const GetNFCConfigsByOwner = gqlTag`
  query GetNFCConfigsByOwner($ownerId: String!) {
    getNFCConfigsByOwner(ownerId: $ownerId) {
      results {
        _id
        owner {
          _id
        }
        nfcId
        name
        deviceType
        homeScreen {
          _id
          name
          shareableLink
        }
        views
        lastScannedAt
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
` as any;

/* Mutations */
const CreateNFCConfig = gqlTag`
  mutation CreateNFCConfig($options: NFCConfigInput!) {
    createNFCConfig(options: $options) {
      results {
        _id
        owner {
          _id
        }
        nfcId
        name
        deviceType
        homeScreen {
          _id
          name
          shareableLink
        }
        views
        lastScannedAt
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
` as any;

const UpdateNFCConfig = gqlTag`
  mutation UpdateNFCConfig($id: String!, $options: NFCConfigInput!) {
    updateNFCConfig(id: $id, options: $options) {
      results {
        _id
        owner {
          _id
        }
        nfcId
        name
        deviceType
        homeScreen {
          _id
          name
          shareableLink
        }
        views
        lastScannedAt
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
` as any;

const DeleteNFCConfig = gqlTag`
  mutation DeleteNFCConfig($id: String!) {
    deleteNFCConfig(id: $id) {
      results {
        _id
        nfcId
        name
      }
      errors {
        field
        message
      }
    }
  }
` as any;

/* Hooks */
export const useGetNFCConfig = (id: string) => {
  return useQuery(GetNFCConfig as any, {
    variables: { id },
    skip: !id,
  });
};

export const useGetNFCConfigsByOwner = () => {
  return useLazyQuery(GetNFCConfigsByOwner as any);
};

// Backward compatibility - deprecated, use useGetNFCConfigsByOwner instead
// Note: This now returns an array, not a single config
export const useGetNFCConfigByOwner = () => {
  return useLazyQuery(GetNFCConfigsByOwner as any);
};

export const useLazyGetNFCConfig = () => {
  return useLazyQuery(GetNFCConfig as any);
};

export const useCreateNFCConfig = () => {
  return useMutation(CreateNFCConfig as any);
};

export const useUpdateNFCConfig = () => {
  return useMutation(UpdateNFCConfig as any);
};

export const useDeleteNFCConfig = () => {
  return useMutation(DeleteNFCConfig as any);
};
