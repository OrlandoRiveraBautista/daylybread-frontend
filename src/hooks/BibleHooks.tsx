import { gql } from "../__generated__/gql";
import { useLazyQuery, useQuery } from "@apollo/client";

/* Queries */
const GetTranslations = gql(`
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

const GetBooks = gql(`
  query GetBooks($translationId: String!) {
    getBooks(translationId: $translationId) {
      bookName
      bibleId
    }
  }
`);

const GetBooksById = gql(`
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

const GetChapter = gql(`
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

const GetVerseByIdQuery = gql(`
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

export const useGetTranslation = () => {
  return useQuery(GetTranslations);
};

export const useGetBooks = (translationId: string) => {
  // if (!translationId) {
  //   return new Error("translation id is not found");
  // }
  return useQuery(GetBooks, {
    variables: {
      translationId: translationId,
    },
  });
};

export const useGetBooksById = (bibleId: string) => {
  return useQuery(GetBooksById, {
    variables: {
      bibleId: bibleId,
    },
  });
};

export const useLazyGetBooksById = () => {
  const [getBooksById, { loading, error, data }] = useLazyQuery(GetBooksById);

  return {
    getBooksById,
    loading,
    error,
    data,
  };
};

export const useGetChapterById = (bibleId: string) => {
  return useQuery(GetChapter, {
    variables: {
      bibleId: bibleId,
    },
  });
};

export const useLazyGetChapterById = () => {
  const [getChapterById, { loading, error, data }] = useLazyQuery(GetChapter);

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
    useLazyQuery(GetVerseByIdQuery);

  return {
    getVerseById,
    loading,
    error,
    data,
  };
};
