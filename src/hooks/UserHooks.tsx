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

const UserBibleHistoryQuery = gql(`
    query UserBibleHistoryQuery {
        me {
          user{
            bibleHistory {
              _id
              history {
                language
                bibleAbbr
                bookId
                chapterNumber
                viewedAt
              }
              current
              createdAt
              updatedAt
            }
          }
        }
    }
`);

const getBookmarks = gql(`
  query getBookmarks {
    getMyBookmarks {
      results {
        _id
        createdAt
        updatedAt
        author {
          _id
        }
        bibleId
        newVerses {
          bookId
          bookName
          bookNameAlt
          chapter
          chapterAlt
          verseStart
          verseStartAlt
          verseEnd
          verseEndAlt
          verseText
        }
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
        note
      }
    }
  }
`);

/* Mutations */
const createBookmark = gql(`
  mutation CreateBookmark($options: BookmarkOptions!) {
    createBookmark(options: $options) {
      results {
        _id
        createdAt
        updatedAt
        author {
          _id
          createdAt
          updatedAt
          email
          firstName
          lastName
          churchName
          dob
          count
          bookmarks {
            _id
            createdAt
            updatedAt
            bibleId
            note
          }
          bioText
        }
        bibleId
        newVerses {
          bookId
          bookName
          bookNameAlt
          chapter
          chapterAlt
          verseStart
          verseStartAlt
          verseEnd
          verseEndAlt
          verseText
        }
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
        note
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
        }
      }
    }
  }
`);

const deleteBooksmarksGQL = gql(`
  mutation DeleteBookmarks($ids: [String!]!) {
    deleteBookmarks(ids: $ids)
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

export const useUserBibleHistory = () => {
  return useQuery(UserBibleHistoryQuery);
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

export const useDeleteBookmarks = () => {
  const [deleteBookmarks, { loading, error, data }] =
    useMutation(deleteBooksmarksGQL);

  return {
    deleteBookmarks,
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
