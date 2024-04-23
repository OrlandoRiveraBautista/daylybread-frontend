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

const searchListOfLanguagesQuery = gql(`
  query SearchLangueages($options: SearchLanguageArgs!) {
    searchListOfLanguages(options: $options) {
      data {
        id
        glottoId
        iso
        name
        autonym
        bibles
        rolvCode
      }
      meta {
        pagination {
          total
          count
          perPage
          currentPage
          totalPages
          links
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

const getCopyrightForBibleQuery = gql(`
  query GetCopyRightByBibleId($options: CopyrightArgs!) {
    getCopyRightByBibleId(options: $options) {
      data {
        id
        asset_id
        type
        size
        copyright {
          copyright_date
          copyright
          copyright_description
          created_at
          updated_at
          open_access
          organizations {
            id
            slug
            abbreviation
            primaryColor
            secondaryColor
            inactive
            url_facebook
            url_website
            url_donate
            url_twitter
            address
            address2
            city
            state
            country
            zip
            phone
            email
            email_director
            latitude
            longitude
            laravel_through_key
            logos {
              language_id
              language_iso
              url
              icon
            }
            translations {
              language_id
              vernacular
              alt
              name
              description_short
            }
          }
        }
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

export const useLazySearchListOfLanguages = () => {
  const [searchListOfLanguages, { loading, error, data }] = useLazyQuery(
    searchListOfLanguagesQuery
  );

  return {
    searchListOfLanguages,
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

export const useLazyGetCopyrightForBible = () => {
  const [getCopyrightForBible, { loading, error, data }] = useLazyQuery(
    getCopyrightForBibleQuery
  );

  return {
    getCopyrightForBible,
    loading,
    error,
    data,
  };
};
