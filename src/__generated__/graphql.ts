/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Book = {
  __typename?: 'Book';
  _id: Scalars['ID'];
  bibleId: Scalars['String'];
  bookName: Scalars['String'];
  chapters: Array<BookChapter>;
  translation: TranslationField;
};

export type BookChapter = {
  __typename?: 'BookChapter';
  bibleId: Scalars['String'];
  chapterName: Scalars['String'];
};

export type Bookmark = {
  __typename?: 'Bookmark';
  _id: Scalars['ID'];
  author: User;
  createdAt: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  verses: Array<Verse>;
};

export type BookmarkOptions = {
  note?: InputMaybe<Scalars['String']>;
  verses?: InputMaybe<Array<Scalars['String']>>;
};

export type BookmarkResponse = {
  __typename?: 'BookmarkResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Bookmark>;
};

export type Chapter = {
  __typename?: 'Chapter';
  _id: Scalars['ID'];
  bibleId: Scalars['String'];
  bookName: Scalars['String'];
  chapterNumber: Scalars['String'];
  translation: TranslationField;
  verses: Array<ChapterVerse>;
};

export type ChapterVerse = {
  __typename?: 'ChapterVerse';
  bibleId: Scalars['String'];
  text: Scalars['String'];
  verse: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetBookmarkResponse = {
  __typename?: 'GetBookmarkResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<Bookmark>>;
};

export type GptArgs = {
  deviceId: Scalars['String'];
  promptText: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark: BookmarkResponse;
  deleteBookmarks: Scalars['Boolean'];
  invalidateTokens: Scalars['Boolean'];
  register: UserResponse;
  updateBookmark: BookmarkResponse;
  updateUser: UserResponse;
};


export type MutationCreateBookmarkArgs = {
  options: BookmarkOptions;
};


export type MutationDeleteBookmarksArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateBookmarkArgs = {
  id: Scalars['String'];
  options: BookmarkOptions;
};


export type MutationUpdateUserArgs = {
  options: UserUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  getBookById: Book;
  getBookByName: Book;
  getBooks: Array<TranslationBook>;
  getChapter: Chapter;
  getChapterListByBookBibleId: Array<BookChapter>;
  getMyBookmarks: GetBookmarkResponse;
  getOpen: Scalars['String'];
  getTestData: Array<Test>;
  getTranslationByAbbreviation?: Maybe<Translation>;
  getTranslationByLang?: Maybe<Array<Translation>>;
  getTranslationByLanguage?: Maybe<Array<Translation>>;
  getTranslationByName?: Maybe<Translation>;
  getTranslations: Array<Translation>;
  getVerseByBibleId: Verse;
  getVerseListByChapterBibleId: Array<ChapterVerse>;
  hello: Scalars['String'];
  login: UserResponse;
  me?: Maybe<UserResponse>;
  searchBible: Array<Chapter>;
  signout: Scalars['Boolean'];
};


export type QueryGetBookByIdArgs = {
  bibleId: Scalars['String'];
};


export type QueryGetBookByNameArgs = {
  bookName: Scalars['String'];
  translationId: Scalars['String'];
};


export type QueryGetBooksArgs = {
  translationId: Scalars['String'];
};


export type QueryGetChapterArgs = {
  bibleId: Scalars['String'];
};


export type QueryGetChapterListByBookBibleIdArgs = {
  bookBibleId: Scalars['String'];
};


export type QueryGetOpenArgs = {
  options: GptArgs;
};


export type QueryGetTranslationByAbbreviationArgs = {
  abbreviation: Scalars['String'];
};


export type QueryGetTranslationByLangArgs = {
  lang: Scalars['String'];
};


export type QueryGetTranslationByLanguageArgs = {
  language: Scalars['String'];
};


export type QueryGetTranslationByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetVerseByBibleIdArgs = {
  bibleId: Scalars['String'];
};


export type QueryGetVerseListByChapterBibleIdArgs = {
  chapterBibleId: Scalars['String'];
};


export type QueryLoginArgs = {
  options: UsernamePasswordInput;
};


export type QuerySearchBibleArgs = {
  search: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  aiChatReponseUpdated: Scalars['String'];
};

export type Test = {
  __typename?: 'Test';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  ipAddress: Scalars['String'];
  lastName: Scalars['String'];
};

export type Translation = {
  __typename?: 'Translation';
  _id: Scalars['ID'];
  abbreviation: Scalars['String'];
  books: Array<TranslationBook>;
  lang: Scalars['String'];
  language: Scalars['String'];
  name: Scalars['String'];
};

export type TranslationBook = {
  __typename?: 'TranslationBook';
  bibleId: Scalars['String'];
  bookName: Scalars['String'];
};

export type TranslationField = {
  __typename?: 'TranslationField';
  abbreviation: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  bioText?: Maybe<Scalars['String']>;
  bookmarks?: Maybe<Array<Bookmark>>;
  churchName?: Maybe<Scalars['String']>;
  count: Scalars['Float'];
  createdAt: Scalars['String'];
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserUpdateInput = {
  bioText?: InputMaybe<Scalars['String']>;
  churchName?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['DateTime']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Verse = {
  __typename?: 'Verse';
  _id: Scalars['ID'];
  bibleId: Scalars['String'];
  bookName: Scalars['String'];
  chapterNumber: Scalars['String'];
  text: Scalars['String'];
  translation: TranslationField;
  verse: Scalars['String'];
};

export type LoginQueryVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, dob?: any | null, count: number, bioText?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, dob?: any | null, count: number, bioText?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetTranslationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTranslationsQuery = { __typename?: 'Query', getTranslations: Array<{ __typename?: 'Translation', _id: string, name: string, abbreviation: string, language: string, lang: string, books: Array<{ __typename?: 'TranslationBook', bookName: string, bibleId: string }> }> };

export type GetBooksQueryVariables = Exact<{
  translationId: Scalars['String'];
}>;


export type GetBooksQuery = { __typename?: 'Query', getBooks: Array<{ __typename?: 'TranslationBook', bookName: string, bibleId: string }> };

export type GetBookByIdQueryVariables = Exact<{
  bibleId: Scalars['String'];
}>;


export type GetBookByIdQuery = { __typename?: 'Query', getBookById: { __typename?: 'Book', _id: string, bookName: string, bibleId: string, chapters: Array<{ __typename?: 'BookChapter', chapterName: string, bibleId: string }>, translation: { __typename?: 'TranslationField', abbreviation: string, name: string } } };

export type GetChapterQueryVariables = Exact<{
  bibleId: Scalars['String'];
}>;


export type GetChapterQuery = { __typename?: 'Query', getChapter: { __typename?: 'Chapter', _id: string, chapterNumber: string, bibleId: string, bookName: string, verses: Array<{ __typename?: 'ChapterVerse', verse: string, bibleId: string, text: string }>, translation: { __typename?: 'TranslationField', abbreviation: string, name: string } } };

export type GetVerseByIdQueryVariables = Exact<{
  bibleId: Scalars['String'];
}>;


export type GetVerseByIdQuery = { __typename?: 'Query', getVerseByBibleId: { __typename?: 'Verse', _id: string, bookName: string, chapterNumber: string, verse: string, text: string, bibleId: string, translation: { __typename?: 'TranslationField', name: string, abbreviation: string } } };

export type OpenAiQueryVariables = Exact<{
  options: GptArgs;
}>;


export type OpenAiQuery = { __typename?: 'Query', getOpen: string };

export type SubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionSubscription = { __typename?: 'Subscription', aiChatReponseUpdated: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, bioText?: string | null, dob?: any | null, count: number } | null } | null };

export type GetBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookmarksQuery = { __typename?: 'Query', getMyBookmarks: { __typename?: 'GetBookmarkResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, results?: Array<{ __typename?: 'Bookmark', _id: string, createdAt: string, updatedAt: string, note?: string | null, author: { __typename?: 'User', _id: string }, verses: Array<{ __typename?: 'Verse', _id: string, bookName: string, chapterNumber: string, verse: string, text: string, bibleId: string, translation: { __typename?: 'TranslationField', abbreviation: string, name: string } }> }> | null } };

export type MutationMutationVariables = Exact<{
  options: BookmarkOptions;
}>;


export type MutationMutation = { __typename?: 'Mutation', createBookmark: { __typename?: 'BookmarkResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, results?: { __typename?: 'Bookmark', _id: string, createdAt: string, updatedAt: string, note?: string | null, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null }, verses: Array<{ __typename?: 'Verse', _id: string, bookName: string, chapterNumber: string, verse: string, text: string, bibleId: string, translation: { __typename?: 'TranslationField', name: string, abbreviation: string } }> } | null } };

export type UpdateUserMutationVariables = Exact<{
  options: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, bioText?: string | null, dob?: any | null, count: number } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateBookmarkMutationVariables = Exact<{
  updateBookmarkId: Scalars['String'];
  options: BookmarkOptions;
}>;


export type UpdateBookmarkMutation = { __typename?: 'Mutation', updateBookmark: { __typename?: 'BookmarkResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, results?: { __typename?: 'Bookmark', _id: string, createdAt: string, updatedAt: string, note?: string | null, author: { __typename?: 'User', _id: string }, verses: Array<{ __typename?: 'Verse', _id: string }> } | null } };

export type DeleteBookmarksMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteBookmarksMutation = { __typename?: 'Mutation', deleteBookmarks: boolean };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UsernamePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UsernamePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetTranslationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTranslations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTranslations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]}}]} as unknown as DocumentNode<GetTranslationsQuery, GetTranslationsQueryVariables>;
export const GetBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"translationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"translationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"translationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetBookByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bibleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapterName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const GetChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bibleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetChapterQuery, GetChapterQueryVariables>;
export const GetVerseByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVerseById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVerseByBibleId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bibleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]} as unknown as DocumentNode<GetVerseByIdQuery, GetVerseByIdQueryVariables>;
export const OpenAiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OpenAi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GptArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOpen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}]}]}}]} as unknown as DocumentNode<OpenAiQuery, OpenAiQueryVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aiChatReponseUpdated"}}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GetBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBookmarksQuery, GetBookmarksQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBookmarkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBookmarkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>;
export const DeleteBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBookmarks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteBookmarksMutation, DeleteBookmarksMutationVariables>;