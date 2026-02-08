import { gql as gqlTag } from "@apollo/client";
import { useLazyQuery, useMutation } from "@apollo/client";

/* Queries */
// Note: Using gqlTag until codegen runs - run `npm run compile` to generate proper types
const GetHomeScreen = gqlTag`
  query GetHomeScreen($id: String!) {
    getHomeScreen(id: $id) {
      results {
        _id
        owner {
          _id
        }
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
        views
        lastViewedAt
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

const GetHomeScreenByLink = gqlTag`
  query GetHomeScreenByLink($shareableLink: String!) {
    getHomeScreenByLink(shareableLink: $shareableLink) {
      results {
        _id
        owner {
          _id
        }
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
        views
        lastViewedAt
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

const GetHomeScreensByOwner = gqlTag`
  query GetHomeScreensByOwner {
    getHomeScreensByOwner {
      results {
        _id
        owner {
          _id
        }
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
        views
        lastViewedAt
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
const CreateHomeScreen = gqlTag`
  mutation CreateHomeScreen($options: HomeScreenInput!) {
    createHomeScreen(options: $options) {
      results {
        _id
        owner {
          _id
        }
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
        views
        lastViewedAt
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

const UpdateHomeScreen = gqlTag`
  mutation UpdateHomeScreen($id: String!, $options: HomeScreenInput!) {
    updateHomeScreen(id: $id, options: $options) {
      results {
        _id
        owner {
          _id
        }
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
        views
        lastViewedAt
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

const DeleteHomeScreen = gqlTag`
  mutation DeleteHomeScreen($id: String!) {
    deleteHomeScreen(id: $id) {
      results {
        _id
        name
        shareableLink
      }
      errors {
        field
        message
      }
    }
  }
` as any;

const IncrementHomeScreenViews = gqlTag`
  mutation IncrementHomeScreenViews($id: String!) {
    incrementHomeScreenViews(id: $id) {
      results {
        _id
        views
        lastViewedAt
      }
      errors {
        field
        message
      }
    }
  }
` as any;

/* Hooks */
export const useGetHomeScreenByLink = () => {
  return useLazyQuery(GetHomeScreenByLink as any);
};

export const useGetHomeScreensByOwner = () => {
  return useLazyQuery(GetHomeScreensByOwner as any);
};

export const useLazyGetHomeScreen = () => {
  return useLazyQuery(GetHomeScreen as any);
};

export const useCreateHomeScreen = () => {
  return useMutation(CreateHomeScreen as any);
};

export const useUpdateHomeScreen = () => {
  return useMutation(UpdateHomeScreen as any);
};

export const useDeleteHomeScreen = () => {
  return useMutation(DeleteHomeScreen as any);
};

export const useIncrementHomeScreenViews = () => {
  return useMutation(IncrementHomeScreenViews as any);
};
