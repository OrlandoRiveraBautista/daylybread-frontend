import { gql } from "../__generated__/gql";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

/* Queries */
const Me = gql(`
    query Me {
        me {
            user {
              _id
              createdAt
              updatedAt
              email
              firstName
              lastName
              churchName
              bioText
              dob
              count
            }
        }
    }
`);
const getBookmarks = gql(`
  query getBookmarks {
    getMyBookmarks {
      errors {
        field
        message
      }
      results {
        _id
        createdAt
        updatedAt
        author {
          _id
        }
        note
        verses {
          _id
          bookName
          chapterNumber
          verse
          text
          bibleId
          translation {
            abbreviation
            name
          }
        }
      }
    }
  }
`);

/* Mutations */
const createBookmark = gql(`
  mutation Mutation($options: BookmarkOptions!) {
    createBookmark(options: $options) {
      errors {
        field
        message
      }
      results {
        _id
        createdAt
        updatedAt
        author {
          _id
          firstName
          lastName
        }
        note
        verses {
          _id
          translation {
            name
            abbreviation
          }
          bookName
          chapterNumber
          verse
          text
          bibleId
        }
      }
    }
  }
`);

const userUpdate = gql(`
  mutation UpdateUser($options: UserUpdateInput!) {
    updateUser(options: $options) {
      user {
        _id
        createdAt
        updatedAt
        email
        firstName
        lastName
        churchName
        bioText
        dob
        count
      }
      errors {
        field
        message
      }
    }
  }
`);

const updateBookmark = gql(`
  mutation UpdateBookmark($updateBookmarkId: String!, $options: BookmarkOptions!) {
    updateBookmark(id: $updateBookmarkId, options: $options) {
      errors {
        field
        message
      }
      results {
        _id
        createdAt
        updatedAt
        author {
          _id
        }
        note
        verses {
          _id
          translation {
            name
            abbreviation
          }
          bookName
          chapterNumber
          verse
          text
          bibleId
        }
      }
    }
  }
`);

/* When using lazy  */
export const useMe = () => {
  const [getMe, { loading, error, data }] = useLazyQuery(Me);

  return {
    getMe,
    loading,
    error,
    data,
  };
};

export const useUserUpdate = () => {
  const [setUserUpdate, { loading, error, data }] = useMutation(userUpdate);

  return {
    setUserUpdate,
    loading,
    error,
    data,
  };
};

export const useUpdateBookmark = () => {
  const [setBookmarkUpdate, { loading, error, data }] =
    useMutation(updateBookmark);

  return {
    setBookmarkUpdate,
    loading,
    error,
    data,
  };
};

export const useCreateBookmarks = () => {
  const [setBookmarks, { loading, error, data }] = useMutation(createBookmark);

  return {
    setBookmarks,
    loading,
    error,
    data,
  };
};

//hook for upon mount
export const useGetBookmarks = () => {
  return useQuery(getBookmarks);
};

export const useLazyGetBookmarks = () => {
  const [getLazyBookmarks, { loading, error, data }] = useLazyQuery(
    getBookmarks,
    { fetchPolicy: "cache-and-network" }
  );

  return {
    getLazyBookmarks,
    loading,
    error,
    data,
  };
};
