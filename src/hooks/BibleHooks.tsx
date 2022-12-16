import { gql } from "../__generated__/gql";
import { useQuery } from "@apollo/client";

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

export const useGetTranslation = () => {
  return useQuery(getTranslations);
};

export const useGetBooksById = (translationId: string) => {
  return useQuery(getBooks, {
    variables: {
      translationId: translationId,
    },
  });
};

export const useGetChapterById = (bibleId: string) => {
  return useQuery(getChapter, {
    variables: {
      bibleId: bibleId,
    },
  });
};
