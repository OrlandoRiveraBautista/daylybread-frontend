/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    query Login($options: UsernamePasswordInput!) {\n        login(options: $options) {\n            user {\n               _id\n                createdAt\n                updatedAt\n                email\n                firstName\n                lastName\n                churchName\n                dob\n                count\n                bioText\n            }\n            errors {\n              field\n              message\n            }\n        }\n    }\n": types.LoginDocument,
    "\n    mutation Register($options: UsernamePasswordInput!) {\n      register(options: $options) {\n        user {\n          _id\n          createdAt\n          updatedAt\n          email\n          firstName\n          lastName\n          churchName\n          dob\n          count\n          bioText\n        }\n        errors {\n          field\n          message\n        }\n      }\n    }\n": types.RegisterDocument,
    "\n    query GetListOfLanguages($options: LanguagesArgs!) {\n        getListOfLanguages(options: $options) {\n            data {\n                id\n                glottoId\n                iso\n                name\n                autonym\n                bibles\n                filesets\n                rolvCode\n                countryPopulation\n                translations\n            }\n            meta {\n                pagination {\n                    total\n                    count\n                    perPage\n                    currentPage\n                    totalPages\n                    links\n                    lastPage\n                    nextPageUrl\n                    prevPageUrl\n                    from\n                    to\n                }\n            }\n        }\n    }\n": types.GetListOfLanguagesDocument,
    "\n  query SearchLangueages($options: SearchLanguageArgs!) {\n    searchListOfLanguages(options: $options) {\n      data {\n        id\n        glottoId\n        iso\n        name\n        autonym\n        bibles\n        rolvCode\n      }\n      meta {\n        pagination {\n          total\n          count\n          perPage\n          currentPage\n          totalPages\n          links\n        }\n      }\n    }\n  }\n": types.SearchLangueagesDocument,
    "\n    query GetListOfBibles($options: BibleArgs!) {\n        getListOFBibles(options: $options){\n            data {\n                name\n                vname\n                abbr\n                language\n                autonym\n                languageId\n                iso\n                date\n                filesets\n            }\n            meta {\n                pagination {\n                    total\n                    count\n                    from\n                    to\n                    nextPageUrl\n                    perPage\n                    prevPageUrl\n                    totalPages\n                    lastPage\n                    currentPage\n                    links\n                }\n            }\n        }\n    }\n": types.GetListOfBiblesDocument,
    "\n    query GetListOfBooksFromBible($options: BookArgs!) {\n        getListOfBooksForBible(options: $options) {\n            data {\n                bookId\n                bookIdUsfx\n                bookIdOsis\n                name\n                testament\n                testamentOrder\n                bookOrder\n                bookGroup\n                nameShort\n                chapters\n                contentTypes\n            }\n        }\n    }\n": types.GetListOfBooksFromBibleDocument,
    "\n    query GetListOfVerseFromBookChapter($options: VerseArgs!) {\n        getListOfVerseFromBookChapter(options: $options){\n            data {\n                bookId\n                bookName\n                bookNameAlt\n                chapter\n                chapterAlt\n                verseStart\n                verseStartAlt\n                verseEnd\n                verseEndAlt\n                verseText\n            } \n        }\n    }\n": types.GetListOfVerseFromBookChapterDocument,
    "\n  query GetCopyRightByBibleId($options: CopyrightArgs!) {\n    getCopyRightByBibleId(options: $options) {\n      data {\n        id\n        asset_id\n        type\n        size\n        copyright {\n          copyright_date\n          copyright\n          copyright_description\n          created_at\n          updated_at\n          open_access\n          organizations {\n            id\n            slug\n            abbreviation\n            primaryColor\n            secondaryColor\n            inactive\n            url_facebook\n            url_website\n            url_donate\n            url_twitter\n            address\n            address2\n            city\n            state\n            country\n            zip\n            phone\n            email\n            email_director\n            latitude\n            longitude\n            laravel_through_key\n            logos {\n              language_id\n              language_iso\n              url\n              icon\n            }\n            translations {\n              language_id\n              vernacular\n              alt\n              name\n              description_short\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetCopyRightByBibleIdDocument,
    "\n  query GetTranslations {\n    getTranslations {\n      _id\n      name\n      abbreviation\n      language\n      lang\n      books {\n        bookName\n        bibleId\n      }\n    }\n  }\n": types.GetTranslationsDocument,
    "\n  query GetBooks($translationId: String!) {\n    getBooks(translationId: $translationId) {\n      bookName\n      bibleId\n    }\n  }\n": types.GetBooksDocument,
    "\n  query GetBookById($bibleId: String!) {\n  getBookById(bibleId: $bibleId) {\n    _id\n    bookName\n    bibleId\n    chapters {\n      chapterName\n      bibleId\n    }\n    translation {\n      abbreviation\n      name\n    }\n  }\n}\n": types.GetBookByIdDocument,
    "\n  query GetChapter($bibleId: String!) {\n    getChapter(bibleId: $bibleId) {\n      _id\n      chapterNumber\n      bibleId\n      bookName\n      verses {\n        verse\n        bibleId\n        text\n      }\n      translation {\n        abbreviation\n        name\n      }\n    }\n  }\n": types.GetChapterDocument,
    "\n  query GetVerseById($bibleId: String!) {\n    getVerseByBibleId(bibleId: $bibleId) {\n      _id\n      translation {\n        name\n        abbreviation\n      }\n      bookName\n      chapterNumber\n      verse\n      text\n      bibleId\n    }\n  }\n": types.GetVerseByIdDocument,
    "\n  mutation SetUserHistory($options: HistoryOptions!) {\n    setUserHistory(options: $options) {\n      errors {\n        field\n        message\n      }\n      results\n    }\n  }\n": types.SetUserHistoryDocument,
    "\n    query OpenAi($options: GptArgs!) {\n        getOpen(options: $options)\n    }\n": types.OpenAiDocument,
    "\n  subscription Subscription {\n    aiChatReponseUpdated\n  }\n": types.SubscriptionDocument,
    "\n    query Me {\n        me {\n            user {\n              _id\n              createdAt\n              updatedAt\n              email\n              firstName\n              lastName\n              churchName\n              bioText\n              dob\n              count\n            }\n        }\n    }\n": types.MeDocument,
    "\n    query UserBibleHistoryQuery {\n        me {\n          user{\n            bibleHistory {\n              _id\n              history {\n                language\n                bibleAbbr\n                bookId\n                chapterNumber\n                viewedAt\n              }\n              current\n              createdAt\n              updatedAt\n            }\n          }\n        }\n    }\n": types.UserBibleHistoryQueryDocument,
    "\n  query getBookmarks {\n    getMyBookmarks {\n      results {\n        _id\n        createdAt\n        updatedAt\n        author {\n          _id\n        }\n        bibleId\n        newVerses {\n          bookId\n          bookName\n          bookNameAlt\n          chapter\n          chapterAlt\n          verseStart\n          verseStartAlt\n          verseEnd\n          verseEndAlt\n          verseText\n        }\n        verses {\n          _id\n          translation {\n            name\n            abbreviation\n          }\n          bookName\n          chapterNumber\n          verse\n          text\n          bibleId\n        }\n        note\n      }\n    }\n  }\n": types.GetBookmarksDocument,
    "\n  mutation CreateBookmark($options: BookmarkOptions!) {\n    createBookmark(options: $options) {\n      results {\n        _id\n        createdAt\n        updatedAt\n        author {\n          _id\n          createdAt\n          updatedAt\n          email\n          firstName\n          lastName\n          churchName\n          dob\n          count\n          bookmarks {\n            _id\n            createdAt\n            updatedAt\n            bibleId\n            note\n          }\n          bioText\n        }\n        bibleId\n        newVerses {\n          bookId\n          bookName\n          bookNameAlt\n          chapter\n          chapterAlt\n          verseStart\n          verseStartAlt\n          verseEnd\n          verseEndAlt\n          verseText\n        }\n        verses {\n          _id\n          translation {\n            name\n            abbreviation\n          }\n          bookName\n          chapterNumber\n          verse\n          text\n          bibleId\n        }\n        note\n      }\n    }\n  }\n": types.CreateBookmarkDocument,
    "\n  mutation UpdateUser($options: UserUpdateInput!) {\n    updateUser(options: $options) {\n      user {\n        _id\n        createdAt\n        updatedAt\n        email\n        firstName\n        lastName\n        churchName\n        bioText\n        dob\n        count\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation UpdateBookmark($updateBookmarkId: String!, $options: BookmarkOptions!) {\n    updateBookmark(id: $updateBookmarkId, options: $options) {\n      errors {\n        field\n        message\n      }\n      results {\n        _id\n        createdAt\n        updatedAt\n        author {\n          _id\n        }\n        note\n        verses {\n          _id\n        }\n      }\n    }\n  }\n": types.UpdateBookmarkDocument,
    "\n  mutation DeleteBookmarks($ids: [String!]!) {\n    deleteBookmarks(ids: $ids)\n  }\n": types.DeleteBookmarksDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Login($options: UsernamePasswordInput!) {\n        login(options: $options) {\n            user {\n               _id\n                createdAt\n                updatedAt\n                email\n                firstName\n                lastName\n                churchName\n                dob\n                count\n                bioText\n            }\n            errors {\n              field\n              message\n            }\n        }\n    }\n"): (typeof documents)["\n    query Login($options: UsernamePasswordInput!) {\n        login(options: $options) {\n            user {\n               _id\n                createdAt\n                updatedAt\n                email\n                firstName\n                lastName\n                churchName\n                dob\n                count\n                bioText\n            }\n            errors {\n              field\n              message\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Register($options: UsernamePasswordInput!) {\n      register(options: $options) {\n        user {\n          _id\n          createdAt\n          updatedAt\n          email\n          firstName\n          lastName\n          churchName\n          dob\n          count\n          bioText\n        }\n        errors {\n          field\n          message\n        }\n      }\n    }\n"): (typeof documents)["\n    mutation Register($options: UsernamePasswordInput!) {\n      register(options: $options) {\n        user {\n          _id\n          createdAt\n          updatedAt\n          email\n          firstName\n          lastName\n          churchName\n          dob\n          count\n          bioText\n        }\n        errors {\n          field\n          message\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetListOfLanguages($options: LanguagesArgs!) {\n        getListOfLanguages(options: $options) {\n            data {\n                id\n                glottoId\n                iso\n                name\n                autonym\n                bibles\n                filesets\n                rolvCode\n                countryPopulation\n                translations\n            }\n            meta {\n                pagination {\n                    total\n                    count\n                    perPage\n                    currentPage\n                    totalPages\n                    links\n                    lastPage\n                    nextPageUrl\n                    prevPageUrl\n                    from\n                    to\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetListOfLanguages($options: LanguagesArgs!) {\n        getListOfLanguages(options: $options) {\n            data {\n                id\n                glottoId\n                iso\n                name\n                autonym\n                bibles\n                filesets\n                rolvCode\n                countryPopulation\n                translations\n            }\n            meta {\n                pagination {\n                    total\n                    count\n                    perPage\n                    currentPage\n                    totalPages\n                    links\n                    lastPage\n                    nextPageUrl\n                    prevPageUrl\n                    from\n                    to\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchLangueages($options: SearchLanguageArgs!) {\n    searchListOfLanguages(options: $options) {\n      data {\n        id\n        glottoId\n        iso\n        name\n        autonym\n        bibles\n        rolvCode\n      }\n      meta {\n        pagination {\n          total\n          count\n          perPage\n          currentPage\n          totalPages\n          links\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchLangueages($options: SearchLanguageArgs!) {\n    searchListOfLanguages(options: $options) {\n      data {\n        id\n        glottoId\n        iso\n        name\n        autonym\n        bibles\n        rolvCode\n      }\n      meta {\n        pagination {\n          total\n          count\n          perPage\n          currentPage\n          totalPages\n          links\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetListOfBibles($options: BibleArgs!) {\n        getListOFBibles(options: $options){\n            data {\n                name\n                vname\n                abbr\n                language\n                autonym\n                languageId\n                iso\n                date\n                filesets\n            }\n            meta {\n                pagination {\n                    total\n                    count\n                    from\n                    to\n                    nextPageUrl\n                    perPage\n                    prevPageUrl\n                    totalPages\n                    lastPage\n                    currentPage\n                    links\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetListOfBibles($options: BibleArgs!) {\n        getListOFBibles(options: $options){\n            data {\n                name\n                vname\n                abbr\n                language\n                autonym\n                languageId\n                iso\n                date\n                filesets\n            }\n            meta {\n                pagination {\n                    total\n                    count\n                    from\n                    to\n                    nextPageUrl\n                    perPage\n                    prevPageUrl\n                    totalPages\n                    lastPage\n                    currentPage\n                    links\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetListOfBooksFromBible($options: BookArgs!) {\n        getListOfBooksForBible(options: $options) {\n            data {\n                bookId\n                bookIdUsfx\n                bookIdOsis\n                name\n                testament\n                testamentOrder\n                bookOrder\n                bookGroup\n                nameShort\n                chapters\n                contentTypes\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetListOfBooksFromBible($options: BookArgs!) {\n        getListOfBooksForBible(options: $options) {\n            data {\n                bookId\n                bookIdUsfx\n                bookIdOsis\n                name\n                testament\n                testamentOrder\n                bookOrder\n                bookGroup\n                nameShort\n                chapters\n                contentTypes\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetListOfVerseFromBookChapter($options: VerseArgs!) {\n        getListOfVerseFromBookChapter(options: $options){\n            data {\n                bookId\n                bookName\n                bookNameAlt\n                chapter\n                chapterAlt\n                verseStart\n                verseStartAlt\n                verseEnd\n                verseEndAlt\n                verseText\n            } \n        }\n    }\n"): (typeof documents)["\n    query GetListOfVerseFromBookChapter($options: VerseArgs!) {\n        getListOfVerseFromBookChapter(options: $options){\n            data {\n                bookId\n                bookName\n                bookNameAlt\n                chapter\n                chapterAlt\n                verseStart\n                verseStartAlt\n                verseEnd\n                verseEndAlt\n                verseText\n            } \n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCopyRightByBibleId($options: CopyrightArgs!) {\n    getCopyRightByBibleId(options: $options) {\n      data {\n        id\n        asset_id\n        type\n        size\n        copyright {\n          copyright_date\n          copyright\n          copyright_description\n          created_at\n          updated_at\n          open_access\n          organizations {\n            id\n            slug\n            abbreviation\n            primaryColor\n            secondaryColor\n            inactive\n            url_facebook\n            url_website\n            url_donate\n            url_twitter\n            address\n            address2\n            city\n            state\n            country\n            zip\n            phone\n            email\n            email_director\n            latitude\n            longitude\n            laravel_through_key\n            logos {\n              language_id\n              language_iso\n              url\n              icon\n            }\n            translations {\n              language_id\n              vernacular\n              alt\n              name\n              description_short\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCopyRightByBibleId($options: CopyrightArgs!) {\n    getCopyRightByBibleId(options: $options) {\n      data {\n        id\n        asset_id\n        type\n        size\n        copyright {\n          copyright_date\n          copyright\n          copyright_description\n          created_at\n          updated_at\n          open_access\n          organizations {\n            id\n            slug\n            abbreviation\n            primaryColor\n            secondaryColor\n            inactive\n            url_facebook\n            url_website\n            url_donate\n            url_twitter\n            address\n            address2\n            city\n            state\n            country\n            zip\n            phone\n            email\n            email_director\n            latitude\n            longitude\n            laravel_through_key\n            logos {\n              language_id\n              language_iso\n              url\n              icon\n            }\n            translations {\n              language_id\n              vernacular\n              alt\n              name\n              description_short\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTranslations {\n    getTranslations {\n      _id\n      name\n      abbreviation\n      language\n      lang\n      books {\n        bookName\n        bibleId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTranslations {\n    getTranslations {\n      _id\n      name\n      abbreviation\n      language\n      lang\n      books {\n        bookName\n        bibleId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBooks($translationId: String!) {\n    getBooks(translationId: $translationId) {\n      bookName\n      bibleId\n    }\n  }\n"): (typeof documents)["\n  query GetBooks($translationId: String!) {\n    getBooks(translationId: $translationId) {\n      bookName\n      bibleId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBookById($bibleId: String!) {\n  getBookById(bibleId: $bibleId) {\n    _id\n    bookName\n    bibleId\n    chapters {\n      chapterName\n      bibleId\n    }\n    translation {\n      abbreviation\n      name\n    }\n  }\n}\n"): (typeof documents)["\n  query GetBookById($bibleId: String!) {\n  getBookById(bibleId: $bibleId) {\n    _id\n    bookName\n    bibleId\n    chapters {\n      chapterName\n      bibleId\n    }\n    translation {\n      abbreviation\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetChapter($bibleId: String!) {\n    getChapter(bibleId: $bibleId) {\n      _id\n      chapterNumber\n      bibleId\n      bookName\n      verses {\n        verse\n        bibleId\n        text\n      }\n      translation {\n        abbreviation\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetChapter($bibleId: String!) {\n    getChapter(bibleId: $bibleId) {\n      _id\n      chapterNumber\n      bibleId\n      bookName\n      verses {\n        verse\n        bibleId\n        text\n      }\n      translation {\n        abbreviation\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetVerseById($bibleId: String!) {\n    getVerseByBibleId(bibleId: $bibleId) {\n      _id\n      translation {\n        name\n        abbreviation\n      }\n      bookName\n      chapterNumber\n      verse\n      text\n      bibleId\n    }\n  }\n"): (typeof documents)["\n  query GetVerseById($bibleId: String!) {\n    getVerseByBibleId(bibleId: $bibleId) {\n      _id\n      translation {\n        name\n        abbreviation\n      }\n      bookName\n      chapterNumber\n      verse\n      text\n      bibleId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SetUserHistory($options: HistoryOptions!) {\n    setUserHistory(options: $options) {\n      errors {\n        field\n        message\n      }\n      results\n    }\n  }\n"): (typeof documents)["\n  mutation SetUserHistory($options: HistoryOptions!) {\n    setUserHistory(options: $options) {\n      errors {\n        field\n        message\n      }\n      results\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query OpenAi($options: GptArgs!) {\n        getOpen(options: $options)\n    }\n"): (typeof documents)["\n    query OpenAi($options: GptArgs!) {\n        getOpen(options: $options)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription Subscription {\n    aiChatReponseUpdated\n  }\n"): (typeof documents)["\n  subscription Subscription {\n    aiChatReponseUpdated\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Me {\n        me {\n            user {\n              _id\n              createdAt\n              updatedAt\n              email\n              firstName\n              lastName\n              churchName\n              bioText\n              dob\n              count\n            }\n        }\n    }\n"): (typeof documents)["\n    query Me {\n        me {\n            user {\n              _id\n              createdAt\n              updatedAt\n              email\n              firstName\n              lastName\n              churchName\n              bioText\n              dob\n              count\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query UserBibleHistoryQuery {\n        me {\n          user{\n            bibleHistory {\n              _id\n              history {\n                language\n                bibleAbbr\n                bookId\n                chapterNumber\n                viewedAt\n              }\n              current\n              createdAt\n              updatedAt\n            }\n          }\n        }\n    }\n"): (typeof documents)["\n    query UserBibleHistoryQuery {\n        me {\n          user{\n            bibleHistory {\n              _id\n              history {\n                language\n                bibleAbbr\n                bookId\n                chapterNumber\n                viewedAt\n              }\n              current\n              createdAt\n              updatedAt\n            }\n          }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getBookmarks {\n    getMyBookmarks {\n      results {\n        _id\n        createdAt\n        updatedAt\n        author {\n          _id\n        }\n        bibleId\n        newVerses {\n          bookId\n          bookName\n          bookNameAlt\n          chapter\n          chapterAlt\n          verseStart\n          verseStartAlt\n          verseEnd\n          verseEndAlt\n          verseText\n        }\n        verses {\n          _id\n          translation {\n            name\n            abbreviation\n          }\n          bookName\n          chapterNumber\n          verse\n          text\n          bibleId\n        }\n        note\n      }\n    }\n  }\n"): (typeof documents)["\n  query getBookmarks {\n    getMyBookmarks {\n      results {\n        _id\n        createdAt\n        updatedAt\n        author {\n          _id\n        }\n        bibleId\n        newVerses {\n          bookId\n          bookName\n          bookNameAlt\n          chapter\n          chapterAlt\n          verseStart\n          verseStartAlt\n          verseEnd\n          verseEndAlt\n          verseText\n        }\n        verses {\n          _id\n          translation {\n            name\n            abbreviation\n          }\n          bookName\n          chapterNumber\n          verse\n          text\n          bibleId\n        }\n        note\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateBookmark($options: BookmarkOptions!) {\n    createBookmark(options: $options) {\n      results {\n        _id\n        createdAt\n        updatedAt\n        author {\n          _id\n          createdAt\n          updatedAt\n          email\n          firstName\n          lastName\n          churchName\n          dob\n          count\n          bookmarks {\n            _id\n            createdAt\n            updatedAt\n            bibleId\n            note\n          }\n          bioText\n        }\n        bibleId\n        newVerses {\n          bookId\n          bookName\n          bookNameAlt\n          chapter\n          chapterAlt\n          verseStart\n          verseStartAlt\n          verseEnd\n          verseEndAlt\n          verseText\n        }\n        verses {\n          _id\n          translation {\n            name\n            abbreviation\n          }\n          bookName\n          chapterNumber\n          verse\n          text\n          bibleId\n        }\n        note\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBookmark($options: BookmarkOptions!) {\n    createBookmark(options: $options) {\n      results {\n        _id\n        createdAt\n        updatedAt\n        author {\n          _id\n          createdAt\n          updatedAt\n          email\n          firstName\n          lastName\n          churchName\n          dob\n          count\n          bookmarks {\n            _id\n            createdAt\n            updatedAt\n            bibleId\n            note\n          }\n          bioText\n        }\n        bibleId\n        newVerses {\n          bookId\n          bookName\n          bookNameAlt\n          chapter\n          chapterAlt\n          verseStart\n          verseStartAlt\n          verseEnd\n          verseEndAlt\n          verseText\n        }\n        verses {\n          _id\n          translation {\n            name\n            abbreviation\n          }\n          bookName\n          chapterNumber\n          verse\n          text\n          bibleId\n        }\n        note\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($options: UserUpdateInput!) {\n    updateUser(options: $options) {\n      user {\n        _id\n        createdAt\n        updatedAt\n        email\n        firstName\n        lastName\n        churchName\n        bioText\n        dob\n        count\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($options: UserUpdateInput!) {\n    updateUser(options: $options) {\n      user {\n        _id\n        createdAt\n        updatedAt\n        email\n        firstName\n        lastName\n        churchName\n        bioText\n        dob\n        count\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateBookmark($updateBookmarkId: String!, $options: BookmarkOptions!) {\n    updateBookmark(id: $updateBookmarkId, options: $options) {\n      errors {\n        field\n        message\n      }\n      results {\n        _id\n        createdAt\n        updatedAt\n        author {\n          _id\n        }\n        note\n        verses {\n          _id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBookmark($updateBookmarkId: String!, $options: BookmarkOptions!) {\n    updateBookmark(id: $updateBookmarkId, options: $options) {\n      errors {\n        field\n        message\n      }\n      results {\n        _id\n        createdAt\n        updatedAt\n        author {\n          _id\n        }\n        note\n        verses {\n          _id\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteBookmarks($ids: [String!]!) {\n    deleteBookmarks(ids: $ids)\n  }\n"): (typeof documents)["\n  mutation DeleteBookmarks($ids: [String!]!) {\n    deleteBookmarks(ids: $ids)\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;