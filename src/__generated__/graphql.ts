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
  /** Custom scalar type for representing JSON data */
  JSON: any;
};

export type BbBible = {
  __typename?: 'BBBible';
  abbr?: Maybe<Scalars['String']>;
  autonym?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  filesets?: Maybe<Scalars['JSON']>;
  iso?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  languageId?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  vname?: Maybe<Scalars['String']>;
};

export type BbBook = {
  __typename?: 'BBBook';
  bookGroup?: Maybe<Scalars['String']>;
  bookId?: Maybe<Scalars['String']>;
  bookIdOsis?: Maybe<Scalars['String']>;
  bookIdUsfx?: Maybe<Scalars['String']>;
  bookOrder?: Maybe<Scalars['String']>;
  chapters?: Maybe<Array<Scalars['Float']>>;
  contentTypes?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  nameShort?: Maybe<Scalars['String']>;
  testament?: Maybe<Scalars['String']>;
  testamentOrder?: Maybe<Scalars['Float']>;
};

export type BbCopyright = {
  __typename?: 'BBCopyright';
  asset_id?: Maybe<Scalars['String']>;
  copyright?: Maybe<Copyright>;
  id?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type BbLanguage = {
  __typename?: 'BBLanguage';
  autonym?: Maybe<Scalars['String']>;
  bibles: Scalars['Float'];
  countryPopulation?: Maybe<Scalars['Float']>;
  filesets?: Maybe<Scalars['Float']>;
  glottoId?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  iso?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rolvCode?: Maybe<Scalars['String']>;
  translations?: Maybe<Scalars['JSON']>;
};

export type BbLogo = {
  __typename?: 'BBLogo';
  icon?: Maybe<Scalars['Float']>;
  language_id?: Maybe<Scalars['Float']>;
  language_iso?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type BbMetadata = {
  __typename?: 'BBMetadata';
  pagination: BbPagination;
};

export type BbOrganization = {
  __typename?: 'BBOrganization';
  abbreviation?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_director?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  inactive?: Maybe<Scalars['Float']>;
  laravel_through_key?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  logos?: Maybe<Array<BbLogo>>;
  longitude?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['String']>;
  primaryColor?: Maybe<Scalars['String']>;
  secondaryColor?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<BbTranslation>>;
  url_donate?: Maybe<Scalars['String']>;
  url_facebook?: Maybe<Scalars['String']>;
  url_twitter?: Maybe<Scalars['String']>;
  url_website?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type BbPagination = {
  __typename?: 'BBPagination';
  count?: Maybe<Scalars['Float']>;
  currentPage?: Maybe<Scalars['Float']>;
  from?: Maybe<Scalars['Float']>;
  lastPage?: Maybe<Scalars['Float']>;
  links?: Maybe<Scalars['JSON']>;
  nextPageUrl?: Maybe<Scalars['String']>;
  perPage?: Maybe<Scalars['Float']>;
  prevPageUrl?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type BbTranslation = {
  __typename?: 'BBTranslation';
  alt?: Maybe<Scalars['Float']>;
  description_short?: Maybe<Scalars['String']>;
  language_id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  vernacular?: Maybe<Scalars['Float']>;
};

export type BbVerse = {
  __typename?: 'BBVerse';
  bookId?: Maybe<Scalars['String']>;
  bookName?: Maybe<Scalars['String']>;
  bookNameAlt?: Maybe<Scalars['String']>;
  chapter?: Maybe<Scalars['Float']>;
  chapterAlt?: Maybe<Scalars['String']>;
  verseEnd?: Maybe<Scalars['Float']>;
  verseEndAlt?: Maybe<Scalars['String']>;
  verseStart?: Maybe<Scalars['Float']>;
  verseStartAlt?: Maybe<Scalars['String']>;
  verseText?: Maybe<Scalars['String']>;
};

export type BibleArgs = {
  languageCode?: InputMaybe<Scalars['String']>;
  mediaExclude?: InputMaybe<Scalars['String']>;
  mediaInclude?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type BibleHistory = {
  __typename?: 'BibleHistory';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  current: Scalars['Boolean'];
  history: Array<History>;
  owner: User;
  updatedAt: Scalars['String'];
};

export type BibleReponse = {
  __typename?: 'BibleReponse';
  data: Array<BbBible>;
  meta: BbMetadata;
};

export type BibleSearchArgs = {
  languageCode?: InputMaybe<Scalars['String']>;
  mediaExclude?: InputMaybe<Scalars['String']>;
  mediaInclude?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Book = {
  __typename?: 'Book';
  _id: Scalars['ID'];
  bibleId: Scalars['String'];
  bookName: Scalars['String'];
  chapters: Array<BookChapter>;
  translation: TranslationField;
};

export type BookArgs = {
  bibleId: Scalars['String'];
};

export type BookChapter = {
  __typename?: 'BookChapter';
  bibleId: Scalars['String'];
  chapterName: Scalars['String'];
};

export type BookResponse = {
  __typename?: 'BookResponse';
  data: Array<BbBook>;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  _id: Scalars['ID'];
  author: User;
  bibleId?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  newVerses?: Maybe<Array<BbVerse>>;
  note?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  verses: Array<Verse>;
};

export type BookmarkOptions = {
  bibleId?: InputMaybe<Scalars['String']>;
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

export type Copyright = {
  __typename?: 'Copyright';
  copyright?: Maybe<Scalars['String']>;
  copyright_date?: Maybe<Scalars['String']>;
  copyright_description?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  open_access?: Maybe<Scalars['Float']>;
  organizations?: Maybe<Array<BbOrganization>>;
  updated_at?: Maybe<Scalars['String']>;
};

export type CopyrightArgs = {
  bibleId: Scalars['String'];
};

export type CopyrightResponse = {
  __typename?: 'CopyrightResponse';
  data: Array<BbCopyright>;
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

export type History = {
  __typename?: 'History';
  bibleAbbr: Scalars['String'];
  bookId: Scalars['String'];
  chapterNumber: Scalars['Float'];
  language: Scalars['Float'];
  viewedAt: Scalars['String'];
};

export type HistoryOptions = {
  bibleAbbr: Scalars['String'];
  bookId: Scalars['String'];
  chapterNumber: Scalars['Float'];
  language: Scalars['Float'];
};

export type HistoryResponse = {
  __typename?: 'HistoryResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Scalars['Boolean']>;
};

export type LanguageReponse = {
  __typename?: 'LanguageReponse';
  data: Array<BbLanguage>;
  meta: BbMetadata;
};

export type LanguagesArgs = {
  country?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark: BookmarkResponse;
  deleteBookmarks: Scalars['Boolean'];
  invalidateTokens: Scalars['Boolean'];
  register: UserResponse;
  setUserHistory: HistoryResponse;
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


export type MutationSetUserHistoryArgs = {
  options: HistoryOptions;
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
  getCopyRightByBibleId: CopyrightResponse;
  getListOFBibles: BibleReponse;
  getListOfBooksForBible: BookResponse;
  getListOfLanguages: LanguageReponse;
  getListOfVerseFromBookChapter: VerseResponse;
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
  searchListOFBibles: BibleReponse;
  searchListOfLanguages: LanguageReponse;
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


export type QueryGetCopyRightByBibleIdArgs = {
  options: CopyrightArgs;
};


export type QueryGetListOfBiblesArgs = {
  options: BibleArgs;
};


export type QueryGetListOfBooksForBibleArgs = {
  options: BookArgs;
};


export type QueryGetListOfLanguagesArgs = {
  options: LanguagesArgs;
};


export type QueryGetListOfVerseFromBookChapterArgs = {
  options: VerseArgs;
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


export type QuerySearchListOfBiblesArgs = {
  options: BibleSearchArgs;
};


export type QuerySearchListOfLanguagesArgs = {
  options: SearchLanguageArgs;
};

export type SearchLanguageArgs = {
  mediaInclude?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
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
  bibleHistory?: Maybe<Array<BibleHistory>>;
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

export type VerseArgs = {
  bibleId: Scalars['String'];
  bookId: Scalars['String'];
  chapterNumber: Scalars['Float'];
};

export type VerseResponse = {
  __typename?: 'VerseResponse';
  data: Array<BbVerse>;
};

export type LoginQueryVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, dob?: any | null, count: number, bioText?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, dob?: any | null, count: number, bioText?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetListOfLanguagesQueryVariables = Exact<{
  options: LanguagesArgs;
}>;


export type GetListOfLanguagesQuery = { __typename?: 'Query', getListOfLanguages: { __typename?: 'LanguageReponse', data: Array<{ __typename?: 'BBLanguage', id: number, glottoId?: string | null, iso?: string | null, name?: string | null, autonym?: string | null, bibles: number, filesets?: number | null, rolvCode?: string | null, countryPopulation?: number | null, translations?: any | null }>, meta: { __typename?: 'BBMetadata', pagination: { __typename?: 'BBPagination', total?: number | null, count?: number | null, perPage?: number | null, currentPage?: number | null, totalPages?: number | null, links?: any | null, lastPage?: number | null, nextPageUrl?: string | null, prevPageUrl?: string | null, from?: number | null, to?: number | null } } } };

export type SearchLangueagesQueryVariables = Exact<{
  options: SearchLanguageArgs;
}>;


export type SearchLangueagesQuery = { __typename?: 'Query', searchListOfLanguages: { __typename?: 'LanguageReponse', data: Array<{ __typename?: 'BBLanguage', id: number, glottoId?: string | null, iso?: string | null, name?: string | null, autonym?: string | null, bibles: number, rolvCode?: string | null }>, meta: { __typename?: 'BBMetadata', pagination: { __typename?: 'BBPagination', total?: number | null, count?: number | null, perPage?: number | null, currentPage?: number | null, totalPages?: number | null, links?: any | null } } } };

export type GetListOfBiblesQueryVariables = Exact<{
  options: BibleArgs;
}>;


export type GetListOfBiblesQuery = { __typename?: 'Query', getListOFBibles: { __typename?: 'BibleReponse', data: Array<{ __typename?: 'BBBible', name?: string | null, vname?: string | null, abbr?: string | null, language?: string | null, autonym?: string | null, languageId?: number | null, iso?: string | null, date?: string | null, filesets?: any | null }>, meta: { __typename?: 'BBMetadata', pagination: { __typename?: 'BBPagination', total?: number | null, count?: number | null, from?: number | null, to?: number | null, nextPageUrl?: string | null, perPage?: number | null, prevPageUrl?: string | null, totalPages?: number | null, lastPage?: number | null, currentPage?: number | null, links?: any | null } } } };

export type GetListOfBooksFromBibleQueryVariables = Exact<{
  options: BookArgs;
}>;


export type GetListOfBooksFromBibleQuery = { __typename?: 'Query', getListOfBooksForBible: { __typename?: 'BookResponse', data: Array<{ __typename?: 'BBBook', bookId?: string | null, bookIdUsfx?: string | null, bookIdOsis?: string | null, name?: string | null, testament?: string | null, testamentOrder?: number | null, bookOrder?: string | null, bookGroup?: string | null, nameShort?: string | null, chapters?: Array<number> | null, contentTypes?: any | null }> } };

export type GetListOfVerseFromBookChapterQueryVariables = Exact<{
  options: VerseArgs;
}>;


export type GetListOfVerseFromBookChapterQuery = { __typename?: 'Query', getListOfVerseFromBookChapter: { __typename?: 'VerseResponse', data: Array<{ __typename?: 'BBVerse', bookId?: string | null, bookName?: string | null, bookNameAlt?: string | null, chapter?: number | null, chapterAlt?: string | null, verseStart?: number | null, verseStartAlt?: string | null, verseEnd?: number | null, verseEndAlt?: string | null, verseText?: string | null }> } };

export type GetCopyRightByBibleIdQueryVariables = Exact<{
  options: CopyrightArgs;
}>;


export type GetCopyRightByBibleIdQuery = { __typename?: 'Query', getCopyRightByBibleId: { __typename?: 'CopyrightResponse', data: Array<{ __typename?: 'BBCopyright', id?: string | null, asset_id?: string | null, type?: string | null, size?: string | null, copyright?: { __typename?: 'Copyright', copyright_date?: string | null, copyright?: string | null, copyright_description?: string | null, created_at?: string | null, updated_at?: string | null, open_access?: number | null, organizations?: Array<{ __typename?: 'BBOrganization', id?: number | null, slug?: string | null, abbreviation?: string | null, primaryColor?: string | null, secondaryColor?: string | null, inactive?: number | null, url_facebook?: string | null, url_website?: string | null, url_donate?: string | null, url_twitter?: string | null, address?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, zip?: string | null, phone?: string | null, email?: string | null, email_director?: string | null, latitude?: number | null, longitude?: number | null, laravel_through_key?: string | null, logos?: Array<{ __typename?: 'BBLogo', language_id?: number | null, language_iso?: string | null, url?: string | null, icon?: number | null }> | null, translations?: Array<{ __typename?: 'BBTranslation', language_id?: number | null, vernacular?: number | null, alt?: number | null, name?: string | null, description_short?: string | null }> | null }> | null } | null }> } };

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

export type SetUserHistoryMutationVariables = Exact<{
  options: HistoryOptions;
}>;


export type SetUserHistoryMutation = { __typename?: 'Mutation', setUserHistory: { __typename?: 'HistoryResponse', results?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type OpenAiQueryVariables = Exact<{
  options: GptArgs;
}>;


export type OpenAiQuery = { __typename?: 'Query', getOpen: string };

export type SubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionSubscription = { __typename?: 'Subscription', aiChatReponseUpdated: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, bioText?: string | null, dob?: any | null, count: number } | null } | null };

export type UserBibleHistoryQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserBibleHistoryQueryQuery = { __typename?: 'Query', me?: { __typename?: 'UserResponse', user?: { __typename?: 'User', bibleHistory?: Array<{ __typename?: 'BibleHistory', _id: string, current: boolean, createdAt: string, updatedAt: string, history: Array<{ __typename?: 'History', language: number, bibleAbbr: string, bookId: string, chapterNumber: number, viewedAt: string }> }> | null } | null } | null };

export type GetBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookmarksQuery = { __typename?: 'Query', getMyBookmarks: { __typename?: 'GetBookmarkResponse', results?: Array<{ __typename?: 'Bookmark', _id: string, createdAt: string, updatedAt: string, bibleId?: string | null, note?: string | null, author: { __typename?: 'User', _id: string }, newVerses?: Array<{ __typename?: 'BBVerse', bookId?: string | null, bookName?: string | null, bookNameAlt?: string | null, chapter?: number | null, chapterAlt?: string | null, verseStart?: number | null, verseStartAlt?: string | null, verseEnd?: number | null, verseEndAlt?: string | null, verseText?: string | null }> | null, verses: Array<{ __typename?: 'Verse', _id: string, bookName: string, chapterNumber: string, verse: string, text: string, bibleId: string, translation: { __typename?: 'TranslationField', name: string, abbreviation: string } }> }> | null } };

export type CreateBookmarkMutationVariables = Exact<{
  options: BookmarkOptions;
}>;


export type CreateBookmarkMutation = { __typename?: 'Mutation', createBookmark: { __typename?: 'BookmarkResponse', results?: { __typename?: 'Bookmark', _id: string, createdAt: string, updatedAt: string, bibleId?: string | null, note?: string | null, author: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, dob?: any | null, count: number, bioText?: string | null, bookmarks?: Array<{ __typename?: 'Bookmark', _id: string, createdAt: string, updatedAt: string, bibleId?: string | null, note?: string | null }> | null }, newVerses?: Array<{ __typename?: 'BBVerse', bookId?: string | null, bookName?: string | null, bookNameAlt?: string | null, chapter?: number | null, chapterAlt?: string | null, verseStart?: number | null, verseStartAlt?: string | null, verseEnd?: number | null, verseEndAlt?: string | null, verseText?: string | null }> | null, verses: Array<{ __typename?: 'Verse', _id: string, bookName: string, chapterNumber: string, verse: string, text: string, bibleId: string, translation: { __typename?: 'TranslationField', name: string, abbreviation: string } }> } | null } };

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
export const GetListOfLanguagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListOfLanguages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LanguagesArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListOfLanguages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"glottoId"}},{"kind":"Field","name":{"kind":"Name","value":"iso"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"autonym"}},{"kind":"Field","name":{"kind":"Name","value":"bibles"}},{"kind":"Field","name":{"kind":"Name","value":"filesets"}},{"kind":"Field","name":{"kind":"Name","value":"rolvCode"}},{"kind":"Field","name":{"kind":"Name","value":"countryPopulation"}},{"kind":"Field","name":{"kind":"Name","value":"translations"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"links"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"nextPageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"prevPageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetListOfLanguagesQuery, GetListOfLanguagesQueryVariables>;
export const SearchLangueagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchLangueages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchLanguageArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchListOfLanguages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"glottoId"}},{"kind":"Field","name":{"kind":"Name","value":"iso"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"autonym"}},{"kind":"Field","name":{"kind":"Name","value":"bibles"}},{"kind":"Field","name":{"kind":"Name","value":"rolvCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"links"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchLangueagesQuery, SearchLangueagesQueryVariables>;
export const GetListOfBiblesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListOfBibles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BibleArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListOFBibles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"vname"}},{"kind":"Field","name":{"kind":"Name","value":"abbr"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"autonym"}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"iso"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"filesets"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"nextPageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"prevPageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"links"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetListOfBiblesQuery, GetListOfBiblesQueryVariables>;
export const GetListOfBooksFromBibleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListOfBooksFromBible"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListOfBooksForBible"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookIdUsfx"}},{"kind":"Field","name":{"kind":"Name","value":"bookIdOsis"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"testament"}},{"kind":"Field","name":{"kind":"Name","value":"testamentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"bookOrder"}},{"kind":"Field","name":{"kind":"Name","value":"bookGroup"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"}},{"kind":"Field","name":{"kind":"Name","value":"contentTypes"}}]}}]}}]}}]} as unknown as DocumentNode<GetListOfBooksFromBibleQuery, GetListOfBooksFromBibleQueryVariables>;
export const GetListOfVerseFromBookChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListOfVerseFromBookChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerseArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListOfVerseFromBookChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bookNameAlt"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"chapterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseStart"}},{"kind":"Field","name":{"kind":"Name","value":"verseStartAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseEnd"}},{"kind":"Field","name":{"kind":"Name","value":"verseEndAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseText"}}]}}]}}]}}]} as unknown as DocumentNode<GetListOfVerseFromBookChapterQuery, GetListOfVerseFromBookChapterQueryVariables>;
export const GetCopyRightByBibleIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCopyRightByBibleId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CopyrightArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCopyRightByBibleId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"asset_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"copyright"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"copyright_date"}},{"kind":"Field","name":{"kind":"Name","value":"copyright"}},{"kind":"Field","name":{"kind":"Name","value":"copyright_description"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"open_access"}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"inactive"}},{"kind":"Field","name":{"kind":"Name","value":"url_facebook"}},{"kind":"Field","name":{"kind":"Name","value":"url_website"}},{"kind":"Field","name":{"kind":"Name","value":"url_donate"}},{"kind":"Field","name":{"kind":"Name","value":"url_twitter"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_director"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"laravel_through_key"}},{"kind":"Field","name":{"kind":"Name","value":"logos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language_id"}},{"kind":"Field","name":{"kind":"Name","value":"language_iso"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language_id"}},{"kind":"Field","name":{"kind":"Name","value":"vernacular"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description_short"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCopyRightByBibleIdQuery, GetCopyRightByBibleIdQueryVariables>;
export const GetTranslationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTranslations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTranslations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]}}]} as unknown as DocumentNode<GetTranslationsQuery, GetTranslationsQueryVariables>;
export const GetBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"translationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"translationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"translationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetBookByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bibleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapterName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const GetChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bibleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetChapterQuery, GetChapterQueryVariables>;
export const GetVerseByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVerseById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVerseByBibleId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bibleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]} as unknown as DocumentNode<GetVerseByIdQuery, GetVerseByIdQueryVariables>;
export const SetUserHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetUserHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HistoryOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setUserHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"}}]}}]}}]} as unknown as DocumentNode<SetUserHistoryMutation, SetUserHistoryMutationVariables>;
export const OpenAiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OpenAi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GptArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOpen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}]}]}}]} as unknown as DocumentNode<OpenAiQuery, OpenAiQueryVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aiChatReponseUpdated"}}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UserBibleHistoryQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserBibleHistoryQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bibleHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"bibleAbbr"}},{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"viewedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserBibleHistoryQueryQuery, UserBibleHistoryQueryQueryVariables>;
export const GetBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"newVerses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bookNameAlt"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"chapterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseStart"}},{"kind":"Field","name":{"kind":"Name","value":"verseStartAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseEnd"}},{"kind":"Field","name":{"kind":"Name","value":"verseEndAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookmarksQuery, GetBookmarksQueryVariables>;
export const CreateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"newVerses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bookNameAlt"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"chapterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseStart"}},{"kind":"Field","name":{"kind":"Name","value":"verseStartAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseEnd"}},{"kind":"Field","name":{"kind":"Name","value":"verseEndAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBookmarkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBookmarkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>;
export const DeleteBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBookmarks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteBookmarksMutation, DeleteBookmarksMutationVariables>;