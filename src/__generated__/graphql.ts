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

export type AudioMediaArgs = {
  bookId: Scalars['String'];
  chapterNumber: Scalars['Float'];
  filesetId: Scalars['String'];
};

export type AudioMediaResponse = {
  __typename?: 'AudioMediaResponse';
  data: Array<BbAudioFile>;
};

export type BbAudioFile = {
  __typename?: 'BBAudioFile';
  book_id?: Maybe<Scalars['String']>;
  book_name?: Maybe<Scalars['String']>;
  chapter_end?: Maybe<Scalars['Float']>;
  chapter_start?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  path?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
  verse_end?: Maybe<Scalars['Float']>;
  verse_start?: Maybe<Scalars['Float']>;
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

export type BbVerseTimestamp = {
  __typename?: 'BBVerseTimestamp';
  book?: Maybe<Scalars['String']>;
  chapter?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Float']>;
  verse_start?: Maybe<Scalars['String']>;
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

export type BibleInteraction = {
  __typename?: 'BibleInteraction';
  _id: Scalars['ID'];
  bibleId: Scalars['String'];
  book: Scalars['String'];
  chapter: Scalars['Float'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  highlightColor?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
  type: InteractionType;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  verses: Array<Scalars['Float']>;
};

export type BibleInteractionInput = {
  bibleId: Scalars['String'];
  book: Scalars['String'];
  chapter: Scalars['Float'];
  content?: InputMaybe<Scalars['String']>;
  highlightColor?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['String']>;
  type: InteractionType;
  verses: Array<Scalars['Float']>;
};

export type BibleInteractionResponse = {
  __typename?: 'BibleInteractionResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<BibleInteraction>;
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

export type GetBibleInteractionsResponse = {
  __typename?: 'GetBibleInteractionsResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<BibleInteraction>>;
};

export type GetBookmarkResponse = {
  __typename?: 'GetBookmarkResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<Bookmark>>;
};

export type GetSignedUrlResponse = {
  __typename?: 'GetSignedUrlResponse';
  errors?: Maybe<Array<FieldError>>;
  fileKey?: Maybe<Scalars['String']>;
  signedUrl?: Maybe<Scalars['String']>;
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

/** Type of interaction with a Bible verse */
export enum InteractionType {
  Bookmark = 'BOOKMARK',
  Highlight = 'HIGHLIGHT',
  Note = 'NOTE'
}

export type LanguageReponse = {
  __typename?: 'LanguageReponse';
  data: Array<BbLanguage>;
  meta: BbMetadata;
};

export type LanguagesArgs = {
  country?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type LinkSettings = {
  __typename?: 'LinkSettings';
  isVisible: Scalars['Boolean'];
  url: Scalars['String'];
};

export type LinkSettingsInput = {
  isVisible?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type LogInWithGoogleArgs = {
  credentials: Scalars['String'];
};

export type MainButtonInput = {
  text: Scalars['String'];
  url: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ID'];
  cache?: Maybe<MediaCache>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fileKey: Scalars['String'];
  filename: Scalars['String'];
  isPublic: Scalars['Boolean'];
  mimeType: Scalars['String'];
  owner: User;
  purpose: MediaPurpose;
  size: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type MediaCache = {
  __typename?: 'MediaCache';
  duration?: Maybe<Scalars['Float']>;
  expiresAt: Scalars['String'];
  url: Scalars['String'];
};

export type MediaInput = {
  description?: InputMaybe<Scalars['String']>;
  fileKey: Scalars['String'];
  filename: Scalars['String'];
  isPublic?: InputMaybe<Scalars['Boolean']>;
  mimeType: Scalars['String'];
  purpose: MediaPurpose;
  size: Scalars['Float'];
};

/** The purpose of the media file */
export enum MediaPurpose {
  ChurchLogo = 'CHURCH_LOGO',
  ContentImage = 'CONTENT_IMAGE',
  Other = 'OTHER',
  ProfilePicture = 'PROFILE_PICTURE'
}

export type MediaResponse = {
  __typename?: 'MediaResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Media>;
};

export type MediaTimestampResponse = {
  __typename?: 'MediaTimestampResponse';
  data: Array<BbVerseTimestamp>;
};

export type MediaUrlResponse = {
  __typename?: 'MediaUrlResponse';
  errors?: Maybe<Array<FieldError>>;
  signedUrl?: Maybe<Scalars['String']>;
};

export type MoodCache = {
  __typename?: 'MoodCache';
  _id: Scalars['String'];
  additionalContext?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  mood: Scalars['String'];
  preferredBibleVersion?: Maybe<Scalars['String']>;
  reference: Scalars['String'];
  reflection: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  verse: Scalars['String'];
};

export type MoodNotification = {
  __typename?: 'MoodNotification';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deviceId?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  mood: Scalars['String'];
  pushSubscription?: Maybe<Scalars['String']>;
  scheduledFor: Scalars['DateTime'];
  sentAt?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type MoodNotificationMessage = {
  __typename?: 'MoodNotificationMessage';
  message: Scalars['String'];
  mood: Scalars['String'];
  timestamp: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type MoodRequestInput = {
  additionalContext?: InputMaybe<Scalars['String']>;
  mood: Scalars['String'];
  preferredBibleVersion?: InputMaybe<Scalars['String']>;
};

export type MoodResponse = {
  __typename?: 'MoodResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<VerseResponseType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelNotification: Scalars['Boolean'];
  createBookmark: BookmarkResponse;
  createInteraction: BibleInteractionResponse;
  createMedia: MediaResponse;
  createNFCConfig: NfcConfigResponse;
  deleteBookmarks: Scalars['Boolean'];
  deleteInteraction: Scalars['Boolean'];
  deleteMedia: MediaResponse;
  deleteNFCConfig: NfcConfigResponse;
  getGetSignedUrl: GetSignedUrlResponse;
  getPostSignedUrl: PostSignedUrlResponse;
  invalidateTokens: Scalars['Boolean'];
  loginWithGoogle: UserResponse;
  refreshMediaCache: MediaResponse;
  register: UserResponse;
  scheduleMoodNotification: ScheduleNotificationResponse;
  setUserHistory: HistoryResponse;
  updateBookmark: BookmarkResponse;
  updateInteraction: BibleInteractionResponse;
  updateMedia: MediaResponse;
  updateNFCConfig: NfcConfigResponse;
  updateNotificationSettings: NotificationSettingsResponse;
  updateUser: UserResponse;
};


export type MutationCancelNotificationArgs = {
  notificationId: Scalars['String'];
};


export type MutationCreateBookmarkArgs = {
  options: BookmarkOptions;
};


export type MutationCreateInteractionArgs = {
  options: BibleInteractionInput;
};


export type MutationCreateMediaArgs = {
  options: MediaInput;
};


export type MutationCreateNfcConfigArgs = {
  options: NfcConfigInput;
};


export type MutationDeleteBookmarksArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeleteInteractionArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMediaArgs = {
  id: Scalars['String'];
};


export type MutationDeleteNfcConfigArgs = {
  id: Scalars['String'];
};


export type MutationGetGetSignedUrlArgs = {
  options: SignedUrlInput;
};


export type MutationGetPostSignedUrlArgs = {
  options: SignedUrlInput;
};


export type MutationLoginWithGoogleArgs = {
  options: LogInWithGoogleArgs;
};


export type MutationRefreshMediaCacheArgs = {
  id: Scalars['String'];
  longTerm?: InputMaybe<Scalars['Boolean']>;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationScheduleMoodNotificationArgs = {
  input: ScheduleNotificationInput;
};


export type MutationSetUserHistoryArgs = {
  options: HistoryOptions;
};


export type MutationUpdateBookmarkArgs = {
  id: Scalars['String'];
  options: BookmarkOptions;
};


export type MutationUpdateInteractionArgs = {
  id: Scalars['String'];
  options: BibleInteractionInput;
};


export type MutationUpdateMediaArgs = {
  id: Scalars['String'];
  options: MediaInput;
};


export type MutationUpdateNfcConfigArgs = {
  id: Scalars['String'];
  options: NfcConfigInput;
};


export type MutationUpdateNotificationSettingsArgs = {
  input: NotificationSettingsInput;
};


export type MutationUpdateUserArgs = {
  options: UserUpdateInput;
};

export type NfcConfig = {
  __typename?: 'NFCConfig';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  eventsLink?: Maybe<LinkSettings>;
  givingLink?: Maybe<LinkSettings>;
  mainButton: MainButton;
  media?: Maybe<Media>;
  mediaId?: Maybe<Scalars['String']>;
  memberRegistrationLink?: Maybe<LinkSettings>;
  nfcIds: Array<Scalars['String']>;
  owner: User;
  socialMedia: SocialMediaSettings;
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type NfcConfigInput = {
  description: Scalars['String'];
  eventsLink?: InputMaybe<LinkSettingsInput>;
  givingLink?: InputMaybe<LinkSettingsInput>;
  mainButton: MainButtonInput;
  mediaId?: InputMaybe<Scalars['String']>;
  memberRegistrationLink?: InputMaybe<LinkSettingsInput>;
  socialMedia?: InputMaybe<SocialMediaSettingsInput>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type NfcConfigResponse = {
  __typename?: 'NFCConfigResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<NfcConfig>;
};

export type NotificationSettingsInput = {
  enableBrowserPushNotifications?: InputMaybe<Scalars['Boolean']>;
  enableEmailNotifications?: InputMaybe<Scalars['Boolean']>;
  enableWebSocketNotifications?: InputMaybe<Scalars['Boolean']>;
  pushSubscriptionEndpoint?: InputMaybe<Scalars['String']>;
  pushSubscriptionKeys?: InputMaybe<Scalars['String']>;
};

export type NotificationSettingsResponse = {
  __typename?: 'NotificationSettingsResponse';
  errors?: Maybe<Array<FieldError>>;
  settings?: Maybe<UserNotificationSettings>;
};

export type PostSignedUrlResponse = {
  __typename?: 'PostSignedUrlResponse';
  errors?: Maybe<Array<FieldError>>;
  fields?: Maybe<Scalars['String']>;
  fileKey?: Maybe<Scalars['String']>;
  signedUrl?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getAudioMedia: AudioMediaResponse;
  getBookById: Book;
  getBookByName: Book;
  getBooks: Array<TranslationBook>;
  getChapter: Chapter;
  getChapterListByBookBibleId: Array<BookChapter>;
  getCopyRightByBibleId: CopyrightResponse;
  getInteraction: BibleInteractionResponse;
  getListOFBibles: BibleReponse;
  getListOfBooksForBible: BookResponse;
  getListOfLanguages: LanguageReponse;
  getListOfVerseFromBookChapter: VerseResponse;
  getMedia: Media;
  getMediaByPurpose: Array<Media>;
  getMediaCacheInfo: Scalars['String'];
  getMediaTimestamps: MediaTimestampResponse;
  getMediaUrl: MediaUrlResponse;
  getMoodBasedVerse: MoodResponse;
  getMyBookmarks: GetBookmarkResponse;
  getMyInteractions: GetBibleInteractionsResponse;
  getNFCConfig: NfcConfigResponse;
  getNFCConfigByOwner: NfcConfigResponse;
  getNextMoodRequestTime?: Maybe<Scalars['DateTime']>;
  getOpen: Scalars['String'];
  getSupportedMoods: Array<Scalars['String']>;
  getTestData: Array<Test>;
  getTranslationByAbbreviation?: Maybe<Translation>;
  getTranslationByLang?: Maybe<Array<Translation>>;
  getTranslationByLanguage?: Maybe<Array<Translation>>;
  getTranslationByName?: Maybe<Translation>;
  getTranslations: Array<Translation>;
  getUserMoodHistory: Array<MoodCache>;
  getUserNotificationSettings: NotificationSettingsResponse;
  getUserPendingNotifications: Array<MoodNotification>;
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


export type QueryGetAudioMediaArgs = {
  options: AudioMediaArgs;
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


export type QueryGetInteractionArgs = {
  id: Scalars['String'];
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


export type QueryGetMediaArgs = {
  id: Scalars['String'];
};


export type QueryGetMediaByPurposeArgs = {
  purpose: Scalars['String'];
};


export type QueryGetMediaCacheInfoArgs = {
  id: Scalars['String'];
};


export type QueryGetMediaTimestampsArgs = {
  options: AudioMediaArgs;
};


export type QueryGetMediaUrlArgs = {
  fileKey: Scalars['String'];
};


export type QueryGetMoodBasedVerseArgs = {
  input: MoodRequestInput;
};


export type QueryGetMyInteractionsArgs = {
  type?: InputMaybe<InteractionType>;
};


export type QueryGetNfcConfigArgs = {
  id: Scalars['String'];
};


export type QueryGetNfcConfigByOwnerArgs = {
  ownerId: Scalars['String'];
};


export type QueryGetNextMoodRequestTimeArgs = {
  mood: Scalars['String'];
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

export type ScheduleNotificationInput = {
  deviceId?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  mood: Scalars['String'];
  scheduledFor: Scalars['DateTime'];
  type: Scalars['String'];
};

export type ScheduleNotificationResponse = {
  __typename?: 'ScheduleNotificationResponse';
  errors?: Maybe<Array<FieldError>>;
  notification?: Maybe<MoodNotification>;
};

export type SearchLanguageArgs = {
  mediaInclude?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type SignedUrlInput = {
  filename: Scalars['String'];
  mimeType: Scalars['String'];
  purpose: MediaPurpose;
};

export type SocialMediaSettings = {
  __typename?: 'SocialMediaSettings';
  facebook: Scalars['Boolean'];
  instagram: Scalars['Boolean'];
  twitter: Scalars['Boolean'];
};

export type SocialMediaSettingsInput = {
  facebook?: InputMaybe<Scalars['Boolean']>;
  instagram?: InputMaybe<Scalars['Boolean']>;
  twitter?: InputMaybe<Scalars['Boolean']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  aiChatReponseUpdated: Scalars['String'];
  moodRequestAvailable: MoodNotificationMessage;
};


export type SubscriptionAiChatReponseUpdatedArgs = {
  deviceId: Scalars['String'];
};


export type SubscriptionMoodRequestAvailableArgs = {
  userId: Scalars['String'];
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

export type UserNotificationSettings = {
  __typename?: 'UserNotificationSettings';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  enableBrowserPushNotifications: Scalars['Boolean'];
  enableEmailNotifications: Scalars['Boolean'];
  enableWebSocketNotifications: Scalars['Boolean'];
  pushSubscriptionEndpoint?: Maybe<Scalars['String']>;
  pushSubscriptionKeys?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
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

export type VerseResponseType = {
  __typename?: 'VerseResponseType';
  fromCache: Scalars['Boolean'];
  mood: Scalars['String'];
  nextRequestAllowed?: Maybe<Scalars['DateTime']>;
  reference: Scalars['String'];
  reflection: Scalars['String'];
  verse: Scalars['String'];
};

export type MainButton = {
  __typename?: 'mainButton';
  text: Scalars['String'];
  url: Scalars['String'];
};

export type LoginQueryVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, dob?: any | null, count: number, bioText?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, dob?: any | null, count: number, bioText?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginWithGoogleMutationMutationVariables = Exact<{
  options: LogInWithGoogleArgs;
}>;


export type LoginWithGoogleMutationMutation = { __typename?: 'Mutation', loginWithGoogle: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: string, createdAt: string, updatedAt: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null, dob?: any | null, count: number, bioText?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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

export type GetAudioMediaQueryVariables = Exact<{
  options: AudioMediaArgs;
}>;


export type GetAudioMediaQuery = { __typename?: 'Query', getAudioMedia: { __typename?: 'AudioMediaResponse', data: Array<{ __typename?: 'BBAudioFile', book_id?: string | null, book_name?: string | null, chapter_start?: number | null, chapter_end?: number | null, verse_start?: number | null, verse_end?: number | null, thumbnail?: string | null, timestamp?: string | null, path?: string | null, duration?: number | null }> } };

export type GetMediaTimestampsQueryVariables = Exact<{
  options: AudioMediaArgs;
}>;


export type GetMediaTimestampsQuery = { __typename?: 'Query', getMediaTimestamps: { __typename?: 'MediaTimestampResponse', data: Array<{ __typename?: 'BBVerseTimestamp', book?: string | null, chapter?: string | null, verse_start?: string | null, timestamp?: number | null }> } };

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

export type GetMediaQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMediaQuery = { __typename?: 'Query', getMedia: { __typename?: 'Media', _id: string, fileKey: string, filename: string, mimeType: string, size: number, purpose: MediaPurpose, isPublic: boolean, description?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, cache?: { __typename?: 'MediaCache', url: string, expiresAt: string, duration?: number | null } | null } };

export type GetMediaByPurposeQueryVariables = Exact<{
  purpose: Scalars['String'];
}>;


export type GetMediaByPurposeQuery = { __typename?: 'Query', getMediaByPurpose: Array<{ __typename?: 'Media', _id: string, fileKey: string, filename: string, mimeType: string, size: number, purpose: MediaPurpose, isPublic: boolean, description?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, cache?: { __typename?: 'MediaCache', url: string, expiresAt: string, duration?: number | null } | null }> };

export type GetMediaUrlQueryVariables = Exact<{
  fileKey: Scalars['String'];
}>;


export type GetMediaUrlQuery = { __typename?: 'Query', getMediaUrl: { __typename?: 'MediaUrlResponse', signedUrl?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetGetSignedUrlMutationVariables = Exact<{
  options: SignedUrlInput;
}>;


export type GetGetSignedUrlMutation = { __typename?: 'Mutation', getGetSignedUrl: { __typename?: 'GetSignedUrlResponse', signedUrl?: string | null, fileKey?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetPostSignedUrlMutationVariables = Exact<{
  options: SignedUrlInput;
}>;


export type GetPostSignedUrlMutation = { __typename?: 'Mutation', getPostSignedUrl: { __typename?: 'PostSignedUrlResponse', signedUrl?: string | null, fields?: string | null, fileKey?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateMediaMutationVariables = Exact<{
  options: MediaInput;
}>;


export type CreateMediaMutation = { __typename?: 'Mutation', createMedia: { __typename?: 'MediaResponse', results?: { __typename?: 'Media', _id: string, fileKey: string, filename: string, mimeType: string, size: number, purpose: MediaPurpose, isPublic: boolean, description?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, cache?: { __typename?: 'MediaCache', url: string, expiresAt: string, duration?: number | null } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateMediaMutationVariables = Exact<{
  id: Scalars['String'];
  options: MediaInput;
}>;


export type UpdateMediaMutation = { __typename?: 'Mutation', updateMedia: { __typename?: 'MediaResponse', results?: { __typename?: 'Media', _id: string, fileKey: string, filename: string, mimeType: string, size: number, purpose: MediaPurpose, isPublic: boolean, description?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, cache?: { __typename?: 'MediaCache', url: string, expiresAt: string, duration?: number | null } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteMediaMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMediaMutation = { __typename?: 'Mutation', deleteMedia: { __typename?: 'MediaResponse', results?: { __typename?: 'Media', _id: string, fileKey: string, filename: string, mimeType: string, size: number, purpose: MediaPurpose, isPublic: boolean, description?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, cache?: { __typename?: 'MediaCache', url: string, expiresAt: string, duration?: number | null } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetNfcConfigQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetNfcConfigQuery = { __typename?: 'Query', getNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, type: string, title: string, description: string, nfcIds: Array<string>, mediaId?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, mainButton: { __typename?: 'mainButton', url: string, text: string }, socialMedia: { __typename?: 'SocialMediaSettings', facebook: boolean, instagram: boolean, twitter: boolean }, givingLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, memberRegistrationLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, eventsLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetNfcConfigByOwnerQueryVariables = Exact<{
  ownerId: Scalars['String'];
}>;


export type GetNfcConfigByOwnerQuery = { __typename?: 'Query', getNFCConfigByOwner: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, type: string, title: string, description: string, nfcIds: Array<string>, mediaId?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, mainButton: { __typename?: 'mainButton', url: string, text: string }, socialMedia: { __typename?: 'SocialMediaSettings', facebook: boolean, instagram: boolean, twitter: boolean }, givingLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, memberRegistrationLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, eventsLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateNfcConfigMutationVariables = Exact<{
  options: NfcConfigInput;
}>;


export type CreateNfcConfigMutation = { __typename?: 'Mutation', createNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, type: string, title: string, description: string, nfcIds: Array<string>, mediaId?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, mainButton: { __typename?: 'mainButton', url: string, text: string }, socialMedia: { __typename?: 'SocialMediaSettings', facebook: boolean, instagram: boolean, twitter: boolean }, givingLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, memberRegistrationLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, eventsLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateNfcConfigMutationVariables = Exact<{
  id: Scalars['String'];
  options: NfcConfigInput;
}>;


export type UpdateNfcConfigMutation = { __typename?: 'Mutation', updateNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, type: string, title: string, description: string, nfcIds: Array<string>, mediaId?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, mainButton: { __typename?: 'mainButton', url: string, text: string }, socialMedia: { __typename?: 'SocialMediaSettings', facebook: boolean, instagram: boolean, twitter: boolean }, givingLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, memberRegistrationLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, eventsLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteNfcConfigMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteNfcConfigMutation = { __typename?: 'Mutation', deleteNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, type: string, title: string, description: string, nfcIds: Array<string>, mediaId?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, mainButton: { __typename?: 'mainButton', url: string, text: string }, socialMedia: { __typename?: 'SocialMediaSettings', facebook: boolean, instagram: boolean, twitter: boolean }, givingLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, memberRegistrationLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null, eventsLink?: { __typename?: 'LinkSettings', isVisible: boolean, url: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type OpenAiQueryVariables = Exact<{
  options: GptArgs;
}>;


export type OpenAiQuery = { __typename?: 'Query', getOpen: string };

export type SubscriptionSubscriptionVariables = Exact<{
  deviceId: Scalars['String'];
}>;


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

export type GetMoodBasedVerseQueryVariables = Exact<{
  input: MoodRequestInput;
}>;


export type GetMoodBasedVerseQuery = { __typename?: 'Query', getMoodBasedVerse: { __typename?: 'MoodResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, result?: { __typename?: 'VerseResponseType', verse: string, reference: string, reflection: string, mood: string, fromCache: boolean, nextRequestAllowed?: any | null } | null } };

export type GetSupportedMoodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSupportedMoodsQuery = { __typename?: 'Query', getSupportedMoods: Array<string> };

export type GetUserMoodHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserMoodHistoryQuery = { __typename?: 'Query', getUserMoodHistory: Array<{ __typename?: 'MoodCache', _id: string, userId: string, mood: string, verse: string, reference: string, reflection: string, additionalContext?: string | null, preferredBibleVersion?: string | null, expiresAt: any, createdAt: any, updatedAt: any }> };

export type GetNextMoodRequestTimeQueryVariables = Exact<{
  mood: Scalars['String'];
}>;


export type GetNextMoodRequestTimeQuery = { __typename?: 'Query', getNextMoodRequestTime?: any | null };

export type GetUserNotificationSettingsDetailedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNotificationSettingsDetailedQuery = { __typename?: 'Query', getUserNotificationSettings: { __typename?: 'NotificationSettingsResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, settings?: { __typename?: 'UserNotificationSettings', _id: string, userId: string, enableWebSocketNotifications: boolean, enableBrowserPushNotifications: boolean, enableEmailNotifications: boolean, pushSubscriptionEndpoint?: string | null, pushSubscriptionKeys?: string | null, createdAt: any, updatedAt: any } | null } };

export type UpdateNotificationSettingsDetailedMutationVariables = Exact<{
  input: NotificationSettingsInput;
}>;


export type UpdateNotificationSettingsDetailedMutation = { __typename?: 'Mutation', updateNotificationSettings: { __typename?: 'NotificationSettingsResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, settings?: { __typename?: 'UserNotificationSettings', _id: string, userId: string, enableWebSocketNotifications: boolean, enableBrowserPushNotifications: boolean, enableEmailNotifications: boolean, pushSubscriptionEndpoint?: string | null, pushSubscriptionKeys?: string | null, createdAt: any, updatedAt: any } | null } };

export type ScheduleMoodNotificationDetailedMutationVariables = Exact<{
  input: ScheduleNotificationInput;
}>;


export type ScheduleMoodNotificationDetailedMutation = { __typename?: 'Mutation', scheduleMoodNotification: { __typename?: 'ScheduleNotificationResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, notification?: { __typename?: 'MoodNotification', _id: string, userId: string, mood: string, type: string, scheduledFor: any, deviceId?: string | null, message?: string | null, status: string, createdAt: any, updatedAt: any } | null } };

export type GetUserPendingNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserPendingNotificationsQuery = { __typename?: 'Query', getUserPendingNotifications: Array<{ __typename?: 'MoodNotification', _id: string, userId: string, mood: string, type: string, scheduledFor: any, deviceId?: string | null, message?: string | null, status: string, createdAt: any, updatedAt: any }> };

export type CancelNotificationMutationVariables = Exact<{
  notificationId: Scalars['String'];
}>;


export type CancelNotificationMutation = { __typename?: 'Mutation', cancelNotification: boolean };

export type MoodRequestAvailableDetailedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type MoodRequestAvailableDetailedSubscription = { __typename?: 'Subscription', moodRequestAvailable: { __typename?: 'MoodNotificationMessage', mood: string, message: string, timestamp: any, userId: string } };

export type GetUserNotificationSettingsBasicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNotificationSettingsBasicQuery = { __typename?: 'Query', getUserNotificationSettings: { __typename?: 'NotificationSettingsResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, settings?: { __typename?: 'UserNotificationSettings', _id: string, userId: string, enableWebSocketNotifications: boolean, enableBrowserPushNotifications: boolean, enableEmailNotifications: boolean, pushSubscriptionEndpoint?: string | null, pushSubscriptionKeys?: string | null, createdAt: any, updatedAt: any } | null } };

export type UpdateNotificationSettingsBasicMutationVariables = Exact<{
  input: NotificationSettingsInput;
}>;


export type UpdateNotificationSettingsBasicMutation = { __typename?: 'Mutation', updateNotificationSettings: { __typename?: 'NotificationSettingsResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, settings?: { __typename?: 'UserNotificationSettings', _id: string, userId: string, enableWebSocketNotifications: boolean, enableBrowserPushNotifications: boolean, enableEmailNotifications: boolean, pushSubscriptionEndpoint?: string | null, pushSubscriptionKeys?: string | null, createdAt: any, updatedAt: any } | null } };

export type ScheduleMoodNotificationBasicMutationVariables = Exact<{
  input: ScheduleNotificationInput;
}>;


export type ScheduleMoodNotificationBasicMutation = { __typename?: 'Mutation', scheduleMoodNotification: { __typename?: 'ScheduleNotificationResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, notification?: { __typename?: 'MoodNotification', _id: string, mood: string, type: string, scheduledFor: any, message?: string | null, status: string } | null } };

export type MoodRequestAvailableBasicSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type MoodRequestAvailableBasicSubscription = { __typename?: 'Subscription', moodRequestAvailable: { __typename?: 'MoodNotificationMessage', mood: string, message: string, timestamp: any, userId: string } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UsernamePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UsernamePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginWithGoogleMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithGoogleMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogInWithGoogleArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginWithGoogleMutationMutation, LoginWithGoogleMutationMutationVariables>;
export const GetListOfLanguagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListOfLanguages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LanguagesArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListOfLanguages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"glottoId"}},{"kind":"Field","name":{"kind":"Name","value":"iso"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"autonym"}},{"kind":"Field","name":{"kind":"Name","value":"bibles"}},{"kind":"Field","name":{"kind":"Name","value":"filesets"}},{"kind":"Field","name":{"kind":"Name","value":"rolvCode"}},{"kind":"Field","name":{"kind":"Name","value":"countryPopulation"}},{"kind":"Field","name":{"kind":"Name","value":"translations"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"links"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"nextPageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"prevPageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetListOfLanguagesQuery, GetListOfLanguagesQueryVariables>;
export const SearchLangueagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchLangueages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchLanguageArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchListOfLanguages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"glottoId"}},{"kind":"Field","name":{"kind":"Name","value":"iso"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"autonym"}},{"kind":"Field","name":{"kind":"Name","value":"bibles"}},{"kind":"Field","name":{"kind":"Name","value":"rolvCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"links"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchLangueagesQuery, SearchLangueagesQueryVariables>;
export const GetListOfBiblesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListOfBibles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BibleArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListOFBibles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"vname"}},{"kind":"Field","name":{"kind":"Name","value":"abbr"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"autonym"}},{"kind":"Field","name":{"kind":"Name","value":"languageId"}},{"kind":"Field","name":{"kind":"Name","value":"iso"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"filesets"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"nextPageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"perPage"}},{"kind":"Field","name":{"kind":"Name","value":"prevPageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"links"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetListOfBiblesQuery, GetListOfBiblesQueryVariables>;
export const GetListOfBooksFromBibleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListOfBooksFromBible"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListOfBooksForBible"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookIdUsfx"}},{"kind":"Field","name":{"kind":"Name","value":"bookIdOsis"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"testament"}},{"kind":"Field","name":{"kind":"Name","value":"testamentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"bookOrder"}},{"kind":"Field","name":{"kind":"Name","value":"bookGroup"}},{"kind":"Field","name":{"kind":"Name","value":"nameShort"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"}},{"kind":"Field","name":{"kind":"Name","value":"contentTypes"}}]}}]}}]}}]} as unknown as DocumentNode<GetListOfBooksFromBibleQuery, GetListOfBooksFromBibleQueryVariables>;
export const GetListOfVerseFromBookChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetListOfVerseFromBookChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerseArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListOfVerseFromBookChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bookNameAlt"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"chapterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseStart"}},{"kind":"Field","name":{"kind":"Name","value":"verseStartAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseEnd"}},{"kind":"Field","name":{"kind":"Name","value":"verseEndAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseText"}}]}}]}}]}}]} as unknown as DocumentNode<GetListOfVerseFromBookChapterQuery, GetListOfVerseFromBookChapterQueryVariables>;
export const GetCopyRightByBibleIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCopyRightByBibleId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CopyrightArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCopyRightByBibleId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"asset_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"copyright"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"copyright_date"}},{"kind":"Field","name":{"kind":"Name","value":"copyright"}},{"kind":"Field","name":{"kind":"Name","value":"copyright_description"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"open_access"}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"inactive"}},{"kind":"Field","name":{"kind":"Name","value":"url_facebook"}},{"kind":"Field","name":{"kind":"Name","value":"url_website"}},{"kind":"Field","name":{"kind":"Name","value":"url_donate"}},{"kind":"Field","name":{"kind":"Name","value":"url_twitter"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"email_director"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"laravel_through_key"}},{"kind":"Field","name":{"kind":"Name","value":"logos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language_id"}},{"kind":"Field","name":{"kind":"Name","value":"language_iso"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language_id"}},{"kind":"Field","name":{"kind":"Name","value":"vernacular"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description_short"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCopyRightByBibleIdQuery, GetCopyRightByBibleIdQueryVariables>;
export const GetAudioMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAudioMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AudioMediaArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAudioMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"book_id"}},{"kind":"Field","name":{"kind":"Name","value":"book_name"}},{"kind":"Field","name":{"kind":"Name","value":"chapter_start"}},{"kind":"Field","name":{"kind":"Name","value":"chapter_end"}},{"kind":"Field","name":{"kind":"Name","value":"verse_start"}},{"kind":"Field","name":{"kind":"Name","value":"verse_end"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]}}]} as unknown as DocumentNode<GetAudioMediaQuery, GetAudioMediaQueryVariables>;
export const GetMediaTimestampsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMediaTimestamps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AudioMediaArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMediaTimestamps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"book"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"verse_start"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<GetMediaTimestampsQuery, GetMediaTimestampsQueryVariables>;
export const GetTranslationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTranslations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTranslations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]}}]} as unknown as DocumentNode<GetTranslationsQuery, GetTranslationsQueryVariables>;
export const GetBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"translationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"translationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"translationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetBookByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bibleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapterName"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const GetChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bibleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetChapterQuery, GetChapterQueryVariables>;
export const GetVerseByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVerseById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVerseByBibleId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bibleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bibleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}}]}}]} as unknown as DocumentNode<GetVerseByIdQuery, GetVerseByIdQueryVariables>;
export const SetUserHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetUserHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HistoryOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setUserHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"}}]}}]}}]} as unknown as DocumentNode<SetUserHistoryMutation, SetUserHistoryMutationVariables>;
export const GetMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMediaQuery, GetMediaQueryVariables>;
export const GetMediaByPurposeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMediaByPurpose"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purpose"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMediaByPurpose"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"purpose"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purpose"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMediaByPurposeQuery, GetMediaByPurposeQueryVariables>;
export const GetMediaUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMediaUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMediaUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetMediaUrlQuery, GetMediaUrlQueryVariables>;
export const GetGetSignedUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetGetSignedUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignedUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGetSignedUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetGetSignedUrlMutation, GetGetSignedUrlMutationVariables>;
export const GetPostSignedUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetPostSignedUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignedUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostSignedUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fields"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostSignedUrlMutation, GetPostSignedUrlMutationVariables>;
export const CreateMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMediaMutation, CreateMediaMutationVariables>;
export const UpdateMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMediaMutation, UpdateMediaMutationVariables>;
export const DeleteMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMediaMutation, DeleteMediaMutationVariables>;
export const GetNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nfcIds"}},{"kind":"Field","name":{"kind":"Name","value":"mainButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"socialMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givingLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberRegistrationLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventsLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetNfcConfigQuery, GetNfcConfigQueryVariables>;
export const GetNfcConfigByOwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNFCConfigByOwner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNFCConfigByOwner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nfcIds"}},{"kind":"Field","name":{"kind":"Name","value":"mainButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"socialMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givingLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberRegistrationLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventsLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetNfcConfigByOwnerQuery, GetNfcConfigByOwnerQueryVariables>;
export const CreateNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NFCConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nfcIds"}},{"kind":"Field","name":{"kind":"Name","value":"mainButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"socialMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givingLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberRegistrationLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventsLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateNfcConfigMutation, CreateNfcConfigMutationVariables>;
export const UpdateNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NFCConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nfcIds"}},{"kind":"Field","name":{"kind":"Name","value":"mainButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"socialMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givingLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberRegistrationLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventsLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateNfcConfigMutation, UpdateNfcConfigMutationVariables>;
export const DeleteNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nfcIds"}},{"kind":"Field","name":{"kind":"Name","value":"mainButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"socialMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}}]}},{"kind":"Field","name":{"kind":"Name","value":"givingLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberRegistrationLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventsLink"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVisible"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteNfcConfigMutation, DeleteNfcConfigMutationVariables>;
export const OpenAiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OpenAi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GptArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOpen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}]}]}}]} as unknown as DocumentNode<OpenAiQuery, OpenAiQueryVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aiChatReponseUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}}]}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UserBibleHistoryQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserBibleHistoryQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bibleHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"bibleAbbr"}},{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"viewedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserBibleHistoryQueryQuery, UserBibleHistoryQueryQueryVariables>;
export const GetBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"newVerses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bookNameAlt"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"chapterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseStart"}},{"kind":"Field","name":{"kind":"Name","value":"verseStartAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseEnd"}},{"kind":"Field","name":{"kind":"Name","value":"verseEndAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookmarksQuery, GetBookmarksQueryVariables>;
export const CreateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"newVerses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bookNameAlt"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"chapterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseStart"}},{"kind":"Field","name":{"kind":"Name","value":"verseStartAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseEnd"}},{"kind":"Field","name":{"kind":"Name","value":"verseEndAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBookmarkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBookmarkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>;
export const DeleteBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBookmarks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteBookmarksMutation, DeleteBookmarksMutationVariables>;
export const GetMoodBasedVerseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMoodBasedVerse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MoodRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMoodBasedVerse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"reflection"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"fromCache"}},{"kind":"Field","name":{"kind":"Name","value":"nextRequestAllowed"}}]}}]}}]}}]} as unknown as DocumentNode<GetMoodBasedVerseQuery, GetMoodBasedVerseQueryVariables>;
export const GetSupportedMoodsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSupportedMoods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSupportedMoods"}}]}}]} as unknown as DocumentNode<GetSupportedMoodsQuery, GetSupportedMoodsQueryVariables>;
export const GetUserMoodHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserMoodHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserMoodHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"reflection"}},{"kind":"Field","name":{"kind":"Name","value":"additionalContext"}},{"kind":"Field","name":{"kind":"Name","value":"preferredBibleVersion"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserMoodHistoryQuery, GetUserMoodHistoryQueryVariables>;
export const GetNextMoodRequestTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNextMoodRequestTime"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mood"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNextMoodRequestTime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mood"}}}]}]}}]} as unknown as DocumentNode<GetNextMoodRequestTimeQuery, GetNextMoodRequestTimeQueryVariables>;
export const GetUserNotificationSettingsDetailedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserNotificationSettingsDetailed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserNotificationSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"enableWebSocketNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableBrowserPushNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableEmailNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionEndpoint"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionKeys"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserNotificationSettingsDetailedQuery, GetUserNotificationSettingsDetailedQueryVariables>;
export const UpdateNotificationSettingsDetailedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNotificationSettingsDetailed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNotificationSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"enableWebSocketNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableBrowserPushNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableEmailNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionEndpoint"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionKeys"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateNotificationSettingsDetailedMutation, UpdateNotificationSettingsDetailedMutationVariables>;
export const ScheduleMoodNotificationDetailedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ScheduleMoodNotificationDetailed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleNotificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleMoodNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledFor"}},{"kind":"Field","name":{"kind":"Name","value":"deviceId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ScheduleMoodNotificationDetailedMutation, ScheduleMoodNotificationDetailedMutationVariables>;
export const GetUserPendingNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserPendingNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserPendingNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledFor"}},{"kind":"Field","name":{"kind":"Name","value":"deviceId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserPendingNotificationsQuery, GetUserPendingNotificationsQueryVariables>;
export const CancelNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"notificationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}}}]}]}}]} as unknown as DocumentNode<CancelNotificationMutation, CancelNotificationMutationVariables>;
export const MoodRequestAvailableDetailedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MoodRequestAvailableDetailed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moodRequestAvailable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<MoodRequestAvailableDetailedSubscription, MoodRequestAvailableDetailedSubscriptionVariables>;
export const GetUserNotificationSettingsBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserNotificationSettingsBasic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserNotificationSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"enableWebSocketNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableBrowserPushNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableEmailNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionEndpoint"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionKeys"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserNotificationSettingsBasicQuery, GetUserNotificationSettingsBasicQueryVariables>;
export const UpdateNotificationSettingsBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNotificationSettingsBasic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNotificationSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"enableWebSocketNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableBrowserPushNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableEmailNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionEndpoint"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionKeys"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateNotificationSettingsBasicMutation, UpdateNotificationSettingsBasicMutationVariables>;
export const ScheduleMoodNotificationBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ScheduleMoodNotificationBasic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleNotificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleMoodNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledFor"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<ScheduleMoodNotificationBasicMutation, ScheduleMoodNotificationBasicMutationVariables>;
export const MoodRequestAvailableBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MoodRequestAvailableBasic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moodRequestAvailable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<MoodRequestAvailableBasicSubscription, MoodRequestAvailableBasicSubscriptionVariables>;