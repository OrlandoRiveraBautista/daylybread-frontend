import { gql } from "../__generated__/gql";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

/* Queries */
const GetNFCConfig = gql(`
  query GetNFCConfig($id: String!) {
    getNFCConfig(id: $id) {
      results {
        _id
        type
        title
        description
        owner {
          _id
        }
        nfcIds
        mainButton {
          url
          text
        }
        socialMedia {
          facebook
          instagram
          twitter
        }
        givingLink {
          isVisible
          url
        }
        memberRegistrationLink {
          isVisible
          url
        }
        eventsLink {
          isVisible
          url
        }
        mediaId
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
        type
        title
        description
        owner {
          _id
        }
        nfcIds
        mainButton {
          url
          text
        }
        socialMedia {
          facebook
          instagram
          twitter
        }
        givingLink {
          isVisible
          url
        }
        memberRegistrationLink {
          isVisible
          url
        }
        eventsLink {
          isVisible
          url
        }
        mediaId
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
        type
        title
        description
        owner {
          _id
        }
        nfcIds
        mainButton {
          url
          text
        }
        socialMedia {
          facebook
          instagram
          twitter
        }
        givingLink {
          isVisible
          url
        }
        memberRegistrationLink {
          isVisible
          url
        }
        eventsLink {
          isVisible
          url
        }
        mediaId
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
        type
        title
        description
        owner {
          _id
        }
        nfcIds
        mainButton {
          url
          text
        }
        socialMedia {
          facebook
          instagram
          twitter
        }
        givingLink {
          isVisible
          url
        }
        memberRegistrationLink {
          isVisible
          url
        }
        eventsLink {
          isVisible
          url
        }
        mediaId
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

const DeleteNFCConfig = gql(`
  mutation DeleteNFCConfig($id: String!) {
    deleteNFCConfig(id: $id) {
      results {
        _id
        type
        title
        description
        owner {
          _id
        }
        nfcIds
        mainButton {
          url
          text
        }
        socialMedia {
          facebook
          instagram
          twitter
        }
        givingLink {
          isVisible
          url
        }
        memberRegistrationLink {
          isVisible
          url
        }
        eventsLink {
          isVisible
          url
        }
        mediaId
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

export const useDeleteNFCConfig = () => {
  return useMutation(DeleteNFCConfig);
};
