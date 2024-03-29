import { gql } from "../__generated__/gql";
import { useLazyQuery } from "@apollo/client";

/* Queries */
const getListOfLanguagesQuery = gql(`
    query GetListOfLanguages($options: LanguagesArgs!) {
        getListOfLanguages(options: $options) {
            data {
                id
                glottoId
                iso
                name
                autonym
                bibles
                filesets
                rolvCode
                countryPopulation
                translations
            }
            meta {
                pagination {
                    total
                    count
                    perPage
                    currentPage
                    totalPages
                    links
                    lastPage
                    nextPageUrl
                    prevPageUrl
                    from
                    to
                }
            }
        }
    }
`);

const getListOfBiblesQuery = gql(`
    query GetListOfBibles($options: BibleArgs!) {
        getListOFBibles(options: $options){
            data {
                name
                vname
                abbr
                language
                autonym
                languageId
                iso
                date
                filesets
            }
            meta {
                pagination {
                    total
                    count
                    from
                    to
                    nextPageUrl
                    perPage
                    prevPageUrl
                    totalPages
                    lastPage
                    currentPage
                    links
                }
            }
        }
    }
`);

const getListOfBooksFromBibleQuery = gql(`
    query GetListOfBooksFromBible($options: BookArgs!) {
        getListOfBooksForBible(options: $options) {
            data {
                bookId
                bookIdUsfx
                bookIdOsis
                name
                testament
                testamentOrder
                bookOrder
                bookGroup
                nameShort
                chapters
                contentTypes
            }
        }
    }
`);

const getListOfVersesFromBookChapterQuery = gql(`
    query GetListOfVerseFromBookChapter($options: VerseArgs!) {
        getListOfVerseFromBookChapter(options: $options){
            data {
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
        }
    }
`);

export const useLazyGetListOfLanguages = () => {
  const [getListOfLanguages, { loading, error, data }] = useLazyQuery(
    getListOfLanguagesQuery
  );

  return {
    getListOfLanguages,
    loading,
    error,
    data,
  };
};

export const useLazyGetListOfBibles = () => {
  const [getListOfBibles, { loading, error, data }] =
    useLazyQuery(getListOfBiblesQuery);

  return {
    getListOfBibles,
    loading,
    error,
    data,
  };
};

export const useLazyGetListOfBooksFromBible = () => {
  const [getListOfBooksFromBible, { loading, error, data }] = useLazyQuery(
    getListOfBooksFromBibleQuery
  );

  return {
    getListOfBooksFromBible,
    loading,
    error,
    data,
  };
};

export const useLazyGetListOfVersesFromBookChapter = () => {
  const [getListOfVersesFromBookChapter, { loading, error, data }] =
    useLazyQuery(getListOfVersesFromBookChapterQuery);

  return {
    getListOfVersesFromBookChapter,
    loading,
    error,
    data,
  };
};
