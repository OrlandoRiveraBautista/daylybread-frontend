import { gql } from "../__generated__/gql";
import { useLazyQuery, useQuery } from "@apollo/client";

/* Queries */
const getTranslations = gql(`
  query GetTranslations {
    getTranslations {
      _id
      name
      abbreviation
      language
      lang
      books {
        bookName
        bibleId
      }
    }
  }
`);

const getBooks = gql(`
  query GetBooks($translationId: String!) {
    getBooks(translationId: $translationId) {
      bookName
      bibleId
    }
  }
`);

const getBooksById = gql(`
  query GetBookById($bibleId: String!) {
  getBookById(bibleId: $bibleId) {
    _id
    bookName
    bibleId
    chapters {
      chapterName
      bibleId
    }
    translation {
      abbreviation
      name
    }
  }
}
`);

const getChapter = gql(`
  query GetChapter($bibleId: String!) {
    getChapter(bibleId: $bibleId) {
      _id
      chapterNumber
      bibleId
      bookName
      verses {
        verse
        bibleId
        text
      }
      translation {
        abbreviation
        name
      }
    }
  }
`);

const getVerseByIdQuery = gql(`
  query GetVerseById($bibleId: String!) {
    getVerseByBibleId(bibleId: $bibleId) {
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
`);

const setUserHistoryMutation = gql(`
  mutation SetUserHistory($options: HistoryOptions!) {
    setUserHistory(options: $options) {
      errors {
        field
        message
      }
      results
    }
  }
`);

export const useGetTranslation = () => {
  return useQuery(getTranslations);
};

export const useLazyGetTranslation = () => {
  const [getAllTranslations, { loading, error, data }] =
    useLazyQuery(getTranslations);

  return {
    getAllTranslations,
    loading,
    error,
    data,
  };
};

export const useLazySetUserHistory = () => {
  const [setUserHistory, { loading, error, data }] = useLazyQuery(
    setUserHistoryMutation
  );

  return {
    setUserHistory,
    loading,
    error,
    data,
  };
};

export const useGetBooks = (translationId: string) => {
  // if (!translationId) {
  //   return new Error("translation id is not found");
  // }
  return useQuery(getBooks, {
    variables: {
      translationId: translationId,
    },
  });
};

export const useGetBooksById = (bibleId: string) => {
  return useQuery(getBooksById, {
    variables: {
      bibleId: bibleId,
    },
  });
};

export const useLazyGetBookById = () => {
  const [getBookById, { loading, error, data }] = useLazyQuery(getBooksById);

  return {
    getBookById,
    loading,
    error,
    data,
  };
};

export const useGetChapterById = (bibleId: string) => {
  return useQuery(getChapter, {
    variables: {
      bibleId: bibleId,
    },
  });
};

export const useLazyGetChapterById = () => {
  const [getChapterById, { loading, error, data }] = useLazyQuery(getChapter);

  return {
    getChapterById,
    loading,
    error,
    data,
  };
};

/* When using lazy  */
export const useGetVerseById = () => {
  const [getVerseById, { loading, error, data }] =
    useLazyQuery(getVerseByIdQuery);

  return {
    getVerseById,
    loading,
    error,
    data,
  };
};
