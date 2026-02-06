import { gql } from "../__generated__/gql";
import { gql as gqlTag } from "@apollo/client";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

/* Queries */
const GetNFCConfig = gql(`
  query GetNFCConfig($id: String!) {
    getNFCConfig(id: $id) {
      results {
        _id
        owner {
          _id
        }
        nfcIds
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

const GetNFCConfigByOwner = gql(`
  query GetNFCConfigByOwner($ownerId: String!) {
    getNFCConfigByOwner(ownerId: $ownerId) {
      results {
        _id
        owner {
          _id
        }
        nfcIds
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

/* Mutations */
const CreateNFCConfig = gql(`
  mutation CreateNFCConfig($options: NFCConfigInput!) {
    createNFCConfig(options: $options) {
      results {
        _id
        owner {
          _id
        }
        nfcIds
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

const UpdateNFCConfig = gql(`
  mutation UpdateNFCConfig($id: String!, $options: NFCConfigInput!) {
    updateNFCConfig(id: $id, options: $options) {
      results {
        _id
        owner {
          _id
        }
        nfcIds
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

// Note: This mutation uses raw gql tag because the types haven't been regenerated yet.
// Run `npm run compile` after starting the backend to generate proper types.
const UpdateNFCTiles = gqlTag`
  mutation UpdateNFCTiles($id: String!, $tiles: [TileConfigInput!]!, $wallpaper: String) {
    updateNFCTiles(id: $id, tiles: $tiles, wallpaper: $wallpaper) {
      results {
        _id
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
      errors {
        field
        message
      }
    }
  }
`;

const DeleteNFCConfig = gql(`
  mutation DeleteNFCConfig($id: String!) {
    deleteNFCConfig(id: $id) {
      results {
        _id
        owner {
          _id
        }
        nfcIds
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
export const useGetNFCConfig = (id: string) => {
  return useQuery(GetNFCConfig, {
    variables: { id },
    skip: !id,
  });
};

export const useGetNFCConfigByOwner = () => {
  return useLazyQuery(GetNFCConfigByOwner);
};

export const useLazyGetNFCConfig = () => {
  return useLazyQuery(GetNFCConfig);
};

export const useCreateNFCConfig = () => {
  return useMutation(CreateNFCConfig);
};

export const useUpdateNFCConfig = () => {
  return useMutation(UpdateNFCConfig);
};

export const useUpdateNFCTiles = () => {
  return useMutation(UpdateNFCTiles);
};

export const useDeleteNFCConfig = () => {
  return useMutation(DeleteNFCConfig);
};
