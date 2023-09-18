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
              dob
              count
            }
        }
    }
`);

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
          firstName
          lastName
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

export const useCreateBookmarks = () => {
  const [setBookmarks, { loading, error, data }] = useMutation(createBookmark);

  return {
    setBookmarks,
    loading,
    error,
    data,
  };
};

export const useGetBookmarks = () => {
  return useQuery(getBookmarks);
};
