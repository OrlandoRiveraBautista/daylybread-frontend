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
    "\n  query GetTranslations {\n    getTranslations {\n      _id\n      name\n      abbreviation\n      language\n      lang\n      books {\n        bookName\n        bibleId\n      }\n    }\n  }\n": types.GetTranslationsDocument,
    "\n  query GetBooks($translationId: String!) {\n    getBooks(translationId: $translationId) {\n      bookName\n      bibleId\n    }\n  }\n": types.GetBooksDocument,
    "\n  query GetBookById($bibleId: String!) {\n  getBookById(bibleId: $bibleId) {\n    _id\n    bookName\n    bibleId\n    chapters {\n      chapterName\n      bibleId\n    }\n    translation {\n      abbreviation\n      name\n    }\n  }\n}\n": types.GetBookByIdDocument,
    "\n  query GetChapter($bibleId: String!) {\n    getChapter(bibleId: $bibleId) {\n      _id\n      chapterNumber\n      bibleId\n      bookName\n      verses {\n        verse\n        bibleId\n        text\n      }\n      translation {\n        abbreviation\n        name\n      }\n    }\n  }\n": types.GetChapterDocument,
    "\n    query OpenAi($promptText: String!) {\n        getOpen(promptText: $promptText)\n    }\n": types.OpenAiDocument,
};

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
export function gql(source: "\n    query OpenAi($promptText: String!) {\n        getOpen(promptText: $promptText)\n    }\n"): (typeof documents)["\n    query OpenAi($promptText: String!) {\n        getOpen(promptText: $promptText)\n    }\n"];

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