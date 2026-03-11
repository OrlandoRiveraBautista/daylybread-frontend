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

export type AdminNfcConfigInput = {
  deviceType?: InputMaybe<Scalars['String']>;
  homeScreenId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nfcId: Scalars['String'];
  ownerId: Scalars['String'];
};

/** Status of a service assignment */
export enum AssignmentStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

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

export type HomeScreen = {
  __typename?: 'HomeScreen';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  lastViewedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: User;
  shareableLink: Scalars['String'];
  tiles?: Maybe<Array<TileConfig>>;
  updatedAt: Scalars['String'];
  views: Scalars['Float'];
  wallpaper?: Maybe<Scalars['String']>;
};

export type HomeScreenInput = {
  name: Scalars['String'];
  tiles?: InputMaybe<Array<TileConfigInput>>;
  wallpaper?: InputMaybe<Scalars['String']>;
};

export type HomeScreenResponse = {
  __typename?: 'HomeScreenResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<HomeScreen>;
};

export type HomeScreensResponse = {
  __typename?: 'HomeScreensResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<HomeScreen>>;
};

/** Type of interaction with a Bible verse */
export enum InteractionType {
  Bookmark = 'BOOKMARK',
  Highlight = 'HIGHLIGHT',
  Note = 'NOTE'
}

/** Method used to send the invite */
export enum InviteMethod {
  Both = 'BOTH',
  Email = 'EMAIL',
  Notification = 'NOTIFICATION'
}

/** Status of a team invite */
export enum InviteStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
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

export type LogInWithGoogleArgs = {
  credentials: Scalars['String'];
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

export type MoodNotificationMessage = {
  __typename?: 'MoodNotificationMessage';
  message: Scalars['String'];
  mood: Scalars['String'];
  timestamp: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type MoodRequestInput = {
  additionalContext?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
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
  acceptInviteByToken: TeamInviteResponse;
  addSetlistItem: SetlistItemResponse;
  addTeamMember: TeamMemberResponse;
  adminCreateNFCConfig: NfcConfigResponse;
  assignHomeScreenToNFCConfig: NfcConfigResponse;
  cancelNotification: Scalars['Boolean'];
  cancelTeamInvite: TeamInviteResponse;
  createBookmark: BookmarkResponse;
  createHomeScreen: HomeScreenResponse;
  createInteraction: BibleInteractionResponse;
  createMedia: MediaResponse;
  createNFCConfig: NfcConfigResponse;
  createRehearsal: RehearsalResponse;
  createSermon: SermonResponse;
  createServiceAssignment: ServiceAssignmentResponse;
  createSetlist: SetlistResponse;
  createSong: SongResponse;
  createWorshipService: WorshipServiceResponse;
  createWorshipTeam: WorshipTeamResponse;
  deleteBookmarks: Scalars['Boolean'];
  deleteHomeScreen: HomeScreenResponse;
  deleteInteraction: Scalars['Boolean'];
  deleteMedia: MediaResponse;
  deleteNFCConfig: NfcConfigResponse;
  deleteRehearsal: RehearsalResponse;
  deleteSermon: SermonResponse;
  deleteSetlist: SetlistResponse;
  deleteSong: SongResponse;
  deleteWorshipService: WorshipServiceResponse;
  deleteWorshipTeam: WorshipTeamResponse;
  generateSermonContent: SermonAiResponse;
  getGetSignedUrl: GetSignedUrlResponse;
  getPostSignedUrl: PostSignedUrlResponse;
  incrementHomeScreenViews: HomeScreenResponse;
  incrementNFCConfigViews: NfcConfigResponse;
  invalidateTokens: Scalars['Boolean'];
  loginWithGoogle: UserResponse;
  markNotificationRead: Scalars['Boolean'];
  publishWorshipService: WorshipServiceResponse;
  refreshMediaCache: MediaResponse;
  register: UserResponse;
  removeServiceAssignment: ServiceAssignmentResponse;
  removeSetlistItem: SetlistItemResponse;
  removeTeamMember: TeamMemberResponse;
  reorderSetlistItems: SetlistResponse;
  resendTeamInvite: TeamInviteResponse;
  respondToAssignment: ServiceAssignmentResponse;
  respondToInvite: TeamInviteResponse;
  scheduleMoodNotification: ScheduleNotificationResponse;
  sendTeamInvite: TeamInviteResponse;
  setUserHistory: HistoryResponse;
  streamSermonContent: Scalars['Boolean'];
  testPushNotification: Scalars['Boolean'];
  updateBookmark: BookmarkResponse;
  updateHomeScreen: HomeScreenResponse;
  updateInteraction: BibleInteractionResponse;
  updateMedia: MediaResponse;
  updateNFCConfig: NfcConfigResponse;
  updateNotificationSettings: NotificationSettingsResponse;
  updateRehearsal: RehearsalResponse;
  updateSermon: SermonResponse;
  updateSetlistItem: SetlistItemResponse;
  updateSong: SongResponse;
  updateTeamMember: TeamMemberResponse;
  updateUser: UserResponse;
  updateWorshipService: WorshipServiceResponse;
  updateWorshipTeam: WorshipTeamResponse;
};


export type MutationAcceptInviteByTokenArgs = {
  token: Scalars['String'];
};


export type MutationAddSetlistItemArgs = {
  options: SetlistItemInput;
  setlistId: Scalars['String'];
};


export type MutationAddTeamMemberArgs = {
  options: TeamMemberInput;
};


export type MutationAdminCreateNfcConfigArgs = {
  options: AdminNfcConfigInput;
};


export type MutationAssignHomeScreenToNfcConfigArgs = {
  homeScreenId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationCancelNotificationArgs = {
  notificationId: Scalars['String'];
};


export type MutationCancelTeamInviteArgs = {
  inviteId: Scalars['String'];
};


export type MutationCreateBookmarkArgs = {
  options: BookmarkOptions;
};


export type MutationCreateHomeScreenArgs = {
  options: HomeScreenInput;
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


export type MutationCreateRehearsalArgs = {
  options: RehearsalInput;
};


export type MutationCreateSermonArgs = {
  options: SermonInput;
};


export type MutationCreateServiceAssignmentArgs = {
  options: ServiceAssignmentInput;
};


export type MutationCreateSetlistArgs = {
  options: SetlistInput;
};


export type MutationCreateSongArgs = {
  options: SongInput;
};


export type MutationCreateWorshipServiceArgs = {
  options: WorshipServiceInput;
};


export type MutationCreateWorshipTeamArgs = {
  options: WorshipTeamInput;
};


export type MutationDeleteBookmarksArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeleteHomeScreenArgs = {
  id: Scalars['String'];
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


export type MutationDeleteRehearsalArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSermonArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSetlistArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSongArgs = {
  id: Scalars['String'];
};


export type MutationDeleteWorshipServiceArgs = {
  id: Scalars['String'];
};


export type MutationDeleteWorshipTeamArgs = {
  id: Scalars['String'];
};


export type MutationGenerateSermonContentArgs = {
  input: SermonAiInput;
};


export type MutationGetGetSignedUrlArgs = {
  options: SignedUrlInput;
};


export type MutationGetPostSignedUrlArgs = {
  options: SignedUrlInput;
};


export type MutationIncrementHomeScreenViewsArgs = {
  id: Scalars['String'];
};


export type MutationIncrementNfcConfigViewsArgs = {
  id: Scalars['String'];
};


export type MutationLoginWithGoogleArgs = {
  options: LogInWithGoogleArgs;
};


export type MutationMarkNotificationReadArgs = {
  notificationId: Scalars['String'];
};


export type MutationPublishWorshipServiceArgs = {
  id: Scalars['String'];
};


export type MutationRefreshMediaCacheArgs = {
  id: Scalars['String'];
  longTerm?: InputMaybe<Scalars['Boolean']>;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationRemoveServiceAssignmentArgs = {
  id: Scalars['String'];
};


export type MutationRemoveSetlistItemArgs = {
  id: Scalars['String'];
};


export type MutationRemoveTeamMemberArgs = {
  id: Scalars['String'];
};


export type MutationReorderSetlistItemsArgs = {
  itemIds: Array<Scalars['String']>;
  setlistId: Scalars['String'];
};


export type MutationResendTeamInviteArgs = {
  inviteId: Scalars['String'];
};


export type MutationRespondToAssignmentArgs = {
  accept: Scalars['Boolean'];
  assignmentId: Scalars['String'];
};


export type MutationRespondToInviteArgs = {
  accept: Scalars['Boolean'];
  inviteId: Scalars['String'];
};


export type MutationScheduleMoodNotificationArgs = {
  input: ScheduleNotificationInput;
};


export type MutationSendTeamInviteArgs = {
  options: TeamInviteInput;
};


export type MutationSetUserHistoryArgs = {
  options: HistoryOptions;
};


export type MutationStreamSermonContentArgs = {
  input: SermonAiInput;
};


export type MutationUpdateBookmarkArgs = {
  id: Scalars['String'];
  options: BookmarkOptions;
};


export type MutationUpdateHomeScreenArgs = {
  id: Scalars['String'];
  options: HomeScreenInput;
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


export type MutationUpdateRehearsalArgs = {
  id: Scalars['String'];
  options: RehearsalInput;
};


export type MutationUpdateSermonArgs = {
  id: Scalars['String'];
  options: SermonInput;
};


export type MutationUpdateSetlistItemArgs = {
  id: Scalars['String'];
  options: SetlistItemInput;
};


export type MutationUpdateSongArgs = {
  id: Scalars['String'];
  options: SongInput;
};


export type MutationUpdateTeamMemberArgs = {
  id: Scalars['String'];
  options: UpdateTeamMemberInput;
};


export type MutationUpdateUserArgs = {
  options: UserUpdateInput;
};


export type MutationUpdateWorshipServiceArgs = {
  id: Scalars['String'];
  options: WorshipServiceInput;
};


export type MutationUpdateWorshipTeamArgs = {
  id: Scalars['String'];
  options: WorshipTeamInput;
};

export type NfcConfig = {
  __typename?: 'NFCConfig';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  deviceType?: Maybe<Scalars['String']>;
  homeScreen?: Maybe<HomeScreen>;
  lastScannedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nfcId: Scalars['String'];
  owner: User;
  updatedAt: Scalars['String'];
  views: Scalars['Float'];
};

export type NfcConfigInput = {
  deviceType?: InputMaybe<Scalars['String']>;
  homeScreenId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nfcId: Scalars['String'];
};

export type NfcConfigResponse = {
  __typename?: 'NFCConfigResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<NfcConfig>;
};

export type NfcConfigsResponse = {
  __typename?: 'NFCConfigsResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<NfcConfig>>;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['String'];
  actionText?: Maybe<Scalars['String']>;
  actionUrl?: Maybe<Scalars['String']>;
  contentType: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deliveryType: Scalars['String'];
  deviceId?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  metadata?: Maybe<Scalars['String']>;
  mood?: Maybe<Scalars['String']>;
  priority: Scalars['String'];
  readAt?: Maybe<Scalars['DateTime']>;
  retryCount: Scalars['Float'];
  scheduledFor?: Maybe<Scalars['DateTime']>;
  sentAt?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type NotificationSettingsInput = {
  enableBrowserPushNotifications?: InputMaybe<Scalars['Boolean']>;
  enableChurchEventNotifications?: InputMaybe<Scalars['Boolean']>;
  enableCommunityUpdates?: InputMaybe<Scalars['Boolean']>;
  enableDailyVerseNotifications?: InputMaybe<Scalars['Boolean']>;
  enableEmailNotifications?: InputMaybe<Scalars['Boolean']>;
  enableInAppNotifications?: InputMaybe<Scalars['Boolean']>;
  enableMoodRequestNotifications?: InputMaybe<Scalars['Boolean']>;
  enablePrayerReminders?: InputMaybe<Scalars['Boolean']>;
  enableWebSocketNotifications?: InputMaybe<Scalars['Boolean']>;
  pushSubscriptionEndpoint?: InputMaybe<Scalars['String']>;
  pushSubscriptionKeys?: InputMaybe<Scalars['String']>;
  quietHoursEnd?: InputMaybe<Scalars['String']>;
  quietHoursStart?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
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
  adminGetAllNFCConfigs: NfcConfigsResponse;
  getAudioMedia: AudioMediaResponse;
  getBookById: Book;
  getBookByName: Book;
  getBooks: Array<TranslationBook>;
  getChapter: Chapter;
  getChapterListByBookBibleId: Array<BookChapter>;
  getCopyRightByBibleId: CopyrightResponse;
  getHomeScreen: HomeScreenResponse;
  getHomeScreenByLink: HomeScreenResponse;
  getHomeScreensByOwner: HomeScreensResponse;
  getHomeScreensByOwnerId: HomeScreensResponse;
  getInteraction: BibleInteractionResponse;
  getInviteByToken: TeamInviteResponse;
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
  getMyInAppNotifications: Array<Notification>;
  getMyInteractions: GetBibleInteractionsResponse;
  getMyInvites: TeamInvitesResponse;
  getNFCConfig: NfcConfigResponse;
  getNFCConfigByNfcId: NfcConfigResponse;
  getNFCConfigsByOwner: NfcConfigsResponse;
  getNextMoodRequestTime?: Maybe<Scalars['DateTime']>;
  getOpen: Scalars['String'];
  getRehearsal: RehearsalResponse;
  getRehearsals: RehearsalsResponse;
  getSermon: SermonResponse;
  getSermonAIPromptTypes: Array<SermonAiPromptInfo>;
  getSermons: SermonsResponse;
  getSetlist: SetlistResponse;
  getSong: SongResponse;
  getSongs: SongsResponse;
  getSupportedMoods: Array<Scalars['String']>;
  getTeamInvites: TeamInvitesResponse;
  getTeamMembers: TeamMembersResponse;
  getTestData: Array<Test>;
  getTranslationByAbbreviation?: Maybe<Translation>;
  getTranslationByLang?: Maybe<Array<Translation>>;
  getTranslationByLanguage?: Maybe<Array<Translation>>;
  getTranslationByName?: Maybe<Translation>;
  getTranslations: Array<Translation>;
  getUserById: UserResponse;
  getUserMoodHistory: Array<MoodCache>;
  getUserNotificationSettings: NotificationSettingsResponse;
  getUserPendingNotifications: Array<Notification>;
  getVapidPublicKey: Scalars['String'];
  getVerseByBibleId: Verse;
  getVerseListByChapterBibleId: Array<ChapterVerse>;
  getWorshipService: WorshipServiceResponse;
  getWorshipServices: WorshipServicesResponse;
  getWorshipTeam: WorshipTeamResponse;
  getWorshipTeams: WorshipTeamsResponse;
  hello: Scalars['String'];
  login: UserResponse;
  me?: Maybe<UserResponse>;
  searchBible: Array<Chapter>;
  searchListOFBibles: BibleReponse;
  searchListOfLanguages: LanguageReponse;
  searchSongs: SongsResponse;
  searchUsers: UsersSearchResponse;
  signout: Scalars['Boolean'];
};


export type QueryAdminGetAllNfcConfigsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
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


export type QueryGetHomeScreenArgs = {
  id: Scalars['String'];
};


export type QueryGetHomeScreenByLinkArgs = {
  shareableLink: Scalars['String'];
};


export type QueryGetHomeScreensByOwnerIdArgs = {
  ownerId: Scalars['String'];
};


export type QueryGetInteractionArgs = {
  id: Scalars['String'];
};


export type QueryGetInviteByTokenArgs = {
  token: Scalars['String'];
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


export type QueryGetNfcConfigByNfcIdArgs = {
  nfcId: Scalars['String'];
};


export type QueryGetNfcConfigsByOwnerArgs = {
  ownerId: Scalars['String'];
};


export type QueryGetNextMoodRequestTimeArgs = {
  mood: Scalars['String'];
};


export type QueryGetOpenArgs = {
  options: GptArgs;
};


export type QueryGetRehearsalArgs = {
  id: Scalars['String'];
};


export type QueryGetRehearsalsArgs = {
  serviceId?: InputMaybe<Scalars['String']>;
  teamId?: InputMaybe<Scalars['String']>;
};


export type QueryGetSermonArgs = {
  id: Scalars['String'];
};


export type QueryGetSetlistArgs = {
  serviceId: Scalars['String'];
};


export type QueryGetSongArgs = {
  id: Scalars['String'];
};


export type QueryGetTeamInvitesArgs = {
  teamId: Scalars['String'];
};


export type QueryGetTeamMembersArgs = {
  teamId: Scalars['String'];
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


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetVerseByBibleIdArgs = {
  bibleId: Scalars['String'];
};


export type QueryGetVerseListByChapterBibleIdArgs = {
  chapterBibleId: Scalars['String'];
};


export type QueryGetWorshipServiceArgs = {
  id: Scalars['String'];
};


export type QueryGetWorshipServicesArgs = {
  teamId?: InputMaybe<Scalars['String']>;
};


export type QueryGetWorshipTeamArgs = {
  id: Scalars['String'];
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


export type QuerySearchSongsArgs = {
  searchTerm: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  searchTerm: Scalars['String'];
};

export type Rehearsal = {
  __typename?: 'Rehearsal';
  _id: Scalars['ID'];
  author: User;
  createdAt: Scalars['String'];
  date: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  service?: Maybe<WorshipService>;
  songIds?: Maybe<Array<Scalars['String']>>;
  team: WorshipTeam;
  updatedAt: Scalars['String'];
};

export type RehearsalInput = {
  date: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  serviceId: Scalars['String'];
  songIds?: InputMaybe<Array<Scalars['String']>>;
  teamId: Scalars['String'];
};

export type RehearsalResponse = {
  __typename?: 'RehearsalResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Rehearsal>;
};

export type RehearsalsResponse = {
  __typename?: 'RehearsalsResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<Rehearsal>>;
};

export type ScheduleNotificationInput = {
  contentType: Scalars['String'];
  deliveryType: Scalars['String'];
  deviceId?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['String']>;
  scheduledFor: Scalars['DateTime'];
};

export type ScheduleNotificationResponse = {
  __typename?: 'ScheduleNotificationResponse';
  errors?: Maybe<Array<FieldError>>;
  notification?: Maybe<Notification>;
};

export type SearchLanguageArgs = {
  mediaInclude?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Sermon = {
  __typename?: 'Sermon';
  _id: Scalars['ID'];
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  status: SermonStatus;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SermonAiContent = {
  __typename?: 'SermonAIContent';
  content: Scalars['String'];
  promptType: Scalars['String'];
  relatedVerses?: Maybe<Array<Scalars['String']>>;
  suggestions?: Maybe<Scalars['String']>;
};

export type SermonAiInput = {
  additionalContext?: InputMaybe<Scalars['String']>;
  customPrompt?: InputMaybe<Scalars['String']>;
  highlightedText?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  promptType: SermonAiPromptType;
  sermonContent?: InputMaybe<Scalars['String']>;
  sermonTitle?: InputMaybe<Scalars['String']>;
  sessionId?: InputMaybe<Scalars['String']>;
};

export type SermonAiPromptInfo = {
  __typename?: 'SermonAIPromptInfo';
  category: Scalars['String'];
  description: Scalars['String'];
  label: Scalars['String'];
  type: SermonAiPromptType;
};

/** Types of AI assistance available for sermon writing */
export enum SermonAiPromptType {
  ActionableSteps = 'ACTIONABLE_STEPS',
  AddressChallenges = 'ADDRESS_CHALLENGES',
  AddDepth = 'ADD_DEPTH',
  CallToAction = 'CALL_TO_ACTION',
  CrossReferences = 'CROSS_REFERENCES',
  CurrentEvents = 'CURRENT_EVENTS',
  Custom = 'CUSTOM',
  DailyLifeAnalogy = 'DAILY_LIFE_ANALOGY',
  ExpandContent = 'EXPAND_CONTENT',
  HistoricalContext = 'HISTORICAL_CONTEXT',
  ImproveClarity = 'IMPROVE_CLARITY',
  InlineEdit = 'INLINE_EDIT',
  MainPoints = 'MAIN_POINTS',
  ModernExample = 'MODERN_EXAMPLE',
  OpeningStory = 'OPENING_STORY',
  PersonalTestimony = 'PERSONAL_TESTIMONY',
  PracticalApplication = 'PRACTICAL_APPLICATION',
  ReflectionQuestions = 'REFLECTION_QUESTIONS',
  RelevantVerses = 'RELEVANT_VERSES',
  SermonOutline = 'SERMON_OUTLINE',
  Summarize = 'SUMMARIZE',
  TestamentConnection = 'TESTAMENT_CONNECTION',
  Transitions = 'TRANSITIONS',
  VerseExplanation = 'VERSE_EXPLANATION'
}

export type SermonAiResponse = {
  __typename?: 'SermonAIResponse';
  errors?: Maybe<Array<FieldError>>;
  result?: Maybe<SermonAiContent>;
};

export type SermonInput = {
  content: Scalars['String'];
  status?: InputMaybe<SermonStatus>;
  title: Scalars['String'];
};

export type SermonResponse = {
  __typename?: 'SermonResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Sermon>;
};

/** The status of a sermon */
export enum SermonStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type SermonsResponse = {
  __typename?: 'SermonsResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<Sermon>>;
};

export type ServiceAssignment = {
  __typename?: 'ServiceAssignment';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  member: TeamMember;
  notes?: Maybe<Scalars['String']>;
  role: TeamRole;
  service: WorshipService;
  status: AssignmentStatus;
  updatedAt: Scalars['String'];
};

export type ServiceAssignmentInput = {
  memberId: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  role: TeamRole;
  serviceId: Scalars['String'];
};

export type ServiceAssignmentResponse = {
  __typename?: 'ServiceAssignmentResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<ServiceAssignment>;
};

/** Status of a worship service */
export enum ServiceStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Draft = 'DRAFT',
  Scheduled = 'SCHEDULED'
}

export type Setlist = {
  __typename?: 'Setlist';
  _id: Scalars['ID'];
  author: User;
  createdAt: Scalars['String'];
  items?: Maybe<Array<SetlistItem>>;
  name: Scalars['String'];
  service: WorshipService;
  updatedAt: Scalars['String'];
};

export type SetlistInput = {
  name: Scalars['String'];
  serviceId: Scalars['String'];
};

export type SetlistItem = {
  __typename?: 'SetlistItem';
  _id: Scalars['ID'];
  bpm?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  order: Scalars['Float'];
  setlist: Setlist;
  song: Song;
  updatedAt: Scalars['String'];
};

export type SetlistItemInput = {
  bpm?: InputMaybe<Scalars['Float']>;
  key?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  order: Scalars['Float'];
  songId: Scalars['String'];
};

export type SetlistItemResponse = {
  __typename?: 'SetlistItemResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<SetlistItem>;
};

export type SetlistResponse = {
  __typename?: 'SetlistResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Setlist>;
};

export type SignedUrlInput = {
  filename: Scalars['String'];
  mimeType: Scalars['String'];
  purpose: MediaPurpose;
};

export type Song = {
  __typename?: 'Song';
  _id: Scalars['ID'];
  artist?: Maybe<Scalars['String']>;
  author: User;
  bpm?: Maybe<Scalars['Float']>;
  chordChart?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  defaultKey?: Maybe<Scalars['String']>;
  lyrics?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  youtubeLink?: Maybe<Scalars['String']>;
};

export type SongInput = {
  artist?: InputMaybe<Scalars['String']>;
  bpm?: InputMaybe<Scalars['Float']>;
  chordChart?: InputMaybe<Scalars['String']>;
  defaultKey?: InputMaybe<Scalars['String']>;
  lyrics?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  youtubeLink?: InputMaybe<Scalars['String']>;
};

export type SongResponse = {
  __typename?: 'SongResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Song>;
};

export type SongsResponse = {
  __typename?: 'SongsResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<Song>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  aiChatReponseUpdated: Scalars['String'];
  moodRequestAvailable: MoodNotificationMessage;
  sermonAIStream: Scalars['String'];
};


export type SubscriptionAiChatReponseUpdatedArgs = {
  deviceId: Scalars['String'];
};


export type SubscriptionMoodRequestAvailableArgs = {
  userId: Scalars['String'];
};


export type SubscriptionSermonAiStreamArgs = {
  sessionId: Scalars['String'];
};

export type TeamInvite = {
  __typename?: 'TeamInvite';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  expiresAt: Scalars['String'];
  inviteToken: Scalars['String'];
  invitedBy: User;
  invitedUser?: Maybe<User>;
  method: InviteMethod;
  role: TeamRole;
  skills?: Maybe<Array<Scalars['String']>>;
  status: InviteStatus;
  team: WorshipTeam;
  updatedAt: Scalars['String'];
};

export type TeamInviteInput = {
  email?: InputMaybe<Scalars['String']>;
  method: InviteMethod;
  role: TeamRole;
  skills?: InputMaybe<Array<Scalars['String']>>;
  teamId: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type TeamInviteResponse = {
  __typename?: 'TeamInviteResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<TeamInvite>;
};

export type TeamInvitesResponse = {
  __typename?: 'TeamInvitesResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<TeamInvite>>;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  role: TeamRole;
  skills?: Maybe<Array<Scalars['String']>>;
  team: WorshipTeam;
  updatedAt: Scalars['String'];
  user: User;
};

export type TeamMemberInput = {
  role: TeamRole;
  skills?: InputMaybe<Array<Scalars['String']>>;
  teamId: Scalars['String'];
  userId: Scalars['String'];
};

export type TeamMemberResponse = {
  __typename?: 'TeamMemberResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<TeamMember>;
};

export type TeamMembersResponse = {
  __typename?: 'TeamMembersResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<TeamMember>>;
};

/** Role of a team member in a worship team */
export enum TeamRole {
  AcousticGuitar = 'ACOUSTIC_GUITAR',
  Bass = 'BASS',
  Drums = 'DRUMS',
  ElectricGuitar = 'ELECTRIC_GUITAR',
  Guitar = 'GUITAR',
  Keys = 'KEYS',
  Media = 'MEDIA',
  Other = 'OTHER',
  Piano = 'PIANO',
  Sound = 'SOUND',
  Vocals = 'VOCALS',
  WorshipLeader = 'WORSHIP_LEADER'
}

export type Test = {
  __typename?: 'Test';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  ipAddress: Scalars['String'];
  lastName: Scalars['String'];
};

export type TileConfig = {
  __typename?: 'TileConfig';
  color?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  id: Scalars['String'];
  isInDock?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  position: TilePosition;
  size: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  url: Scalars['String'];
};

export type TileConfigInput = {
  color?: InputMaybe<Scalars['String']>;
  icon: Scalars['String'];
  id: Scalars['String'];
  isInDock?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  position: TilePositionInput;
  size: Scalars['String'];
  subtitle?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  url: Scalars['String'];
};

export type TilePosition = {
  __typename?: 'TilePosition';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type TilePositionInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
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

export type UpdateTeamMemberInput = {
  role?: InputMaybe<TeamRole>;
  skills?: InputMaybe<Array<Scalars['String']>>;
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
  enableChurchEventNotifications: Scalars['Boolean'];
  enableCommunityUpdates: Scalars['Boolean'];
  enableDailyVerseNotifications: Scalars['Boolean'];
  enableEmailNotifications: Scalars['Boolean'];
  enableInAppNotifications: Scalars['Boolean'];
  enableMoodRequestNotifications: Scalars['Boolean'];
  enablePrayerReminders: Scalars['Boolean'];
  enableWebSocketNotifications: Scalars['Boolean'];
  pushSubscriptionEndpoint?: Maybe<Scalars['String']>;
  pushSubscriptionKeys?: Maybe<Scalars['String']>;
  quietHoursEnd?: Maybe<Scalars['String']>;
  quietHoursStart?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
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

export type UsersSearchResponse = {
  __typename?: 'UsersSearchResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<User>>;
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

export type WorshipService = {
  __typename?: 'WorshipService';
  _id: Scalars['ID'];
  assignments?: Maybe<Array<ServiceAssignment>>;
  author: User;
  createdAt: Scalars['String'];
  date: Scalars['String'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  setlist?: Maybe<Setlist>;
  status: ServiceStatus;
  team: WorshipTeam;
  updatedAt: Scalars['String'];
};

export type WorshipServiceInput = {
  date: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ServiceStatus>;
  teamId: Scalars['String'];
};

export type WorshipServiceResponse = {
  __typename?: 'WorshipServiceResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<WorshipService>;
};

export type WorshipServicesResponse = {
  __typename?: 'WorshipServicesResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<WorshipService>>;
};

export type WorshipTeam = {
  __typename?: 'WorshipTeam';
  _id: Scalars['ID'];
  author: User;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<TeamMember>>;
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type WorshipTeamInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type WorshipTeamResponse = {
  __typename?: 'WorshipTeamResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<WorshipTeam>;
};

export type WorshipTeamsResponse = {
  __typename?: 'WorshipTeamsResponse';
  errors?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<WorshipTeam>>;
};

export type SignoutQueryVariables = Exact<{ [key: string]: never; }>;


export type SignoutQuery = { __typename?: 'Query', signout: boolean };

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

export type GetHomeScreenQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetHomeScreenQuery = { __typename?: 'Query', getHomeScreen: { __typename?: 'HomeScreenResponse', results?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string, wallpaper?: string | null, views: number, lastViewedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, tiles?: Array<{ __typename?: 'TileConfig', id: string, type: string, label: string, icon: string, url: string, size: string, color?: string | null, subtitle?: string | null, isInDock?: boolean | null, position: { __typename?: 'TilePosition', x: number, y: number } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetHomeScreenByLinkQueryVariables = Exact<{
  shareableLink: Scalars['String'];
}>;


export type GetHomeScreenByLinkQuery = { __typename?: 'Query', getHomeScreenByLink: { __typename?: 'HomeScreenResponse', results?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string, wallpaper?: string | null, views: number, lastViewedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, tiles?: Array<{ __typename?: 'TileConfig', id: string, type: string, label: string, icon: string, url: string, size: string, color?: string | null, subtitle?: string | null, isInDock?: boolean | null, position: { __typename?: 'TilePosition', x: number, y: number } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetHomeScreensByOwnerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomeScreensByOwnerQuery = { __typename?: 'Query', getHomeScreensByOwner: { __typename?: 'HomeScreensResponse', results?: Array<{ __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string, wallpaper?: string | null, views: number, lastViewedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, tiles?: Array<{ __typename?: 'TileConfig', id: string, type: string, label: string, icon: string, url: string, size: string, color?: string | null, subtitle?: string | null, isInDock?: boolean | null, position: { __typename?: 'TilePosition', x: number, y: number } }> | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateHomeScreenMutationVariables = Exact<{
  options: HomeScreenInput;
}>;


export type CreateHomeScreenMutation = { __typename?: 'Mutation', createHomeScreen: { __typename?: 'HomeScreenResponse', results?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string, wallpaper?: string | null, views: number, lastViewedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, tiles?: Array<{ __typename?: 'TileConfig', id: string, type: string, label: string, icon: string, url: string, size: string, color?: string | null, subtitle?: string | null, isInDock?: boolean | null, position: { __typename?: 'TilePosition', x: number, y: number } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateHomeScreenMutationVariables = Exact<{
  id: Scalars['String'];
  options: HomeScreenInput;
}>;


export type UpdateHomeScreenMutation = { __typename?: 'Mutation', updateHomeScreen: { __typename?: 'HomeScreenResponse', results?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string, wallpaper?: string | null, views: number, lastViewedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, tiles?: Array<{ __typename?: 'TileConfig', id: string, type: string, label: string, icon: string, url: string, size: string, color?: string | null, subtitle?: string | null, isInDock?: boolean | null, position: { __typename?: 'TilePosition', x: number, y: number } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteHomeScreenMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteHomeScreenMutation = { __typename?: 'Mutation', deleteHomeScreen: { __typename?: 'HomeScreenResponse', results?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type IncrementHomeScreenViewsMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type IncrementHomeScreenViewsMutation = { __typename?: 'Mutation', incrementHomeScreenViews: { __typename?: 'HomeScreenResponse', results?: { __typename?: 'HomeScreen', _id: string, views: number, lastViewedAt?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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


export type GetNfcConfigQuery = { __typename?: 'Query', getNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, nfcId: string, name: string, deviceType?: string | null, views: number, lastScannedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, homeScreen?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string, wallpaper?: string | null, tiles?: Array<{ __typename?: 'TileConfig', id: string, type: string, label: string, icon: string, url: string, size: string, color?: string | null, subtitle?: string | null, isInDock?: boolean | null, position: { __typename?: 'TilePosition', x: number, y: number } }> | null } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetNfcConfigsByOwnerQueryVariables = Exact<{
  ownerId: Scalars['String'];
}>;


export type GetNfcConfigsByOwnerQuery = { __typename?: 'Query', getNFCConfigsByOwner: { __typename?: 'NFCConfigsResponse', results?: Array<{ __typename?: 'NFCConfig', _id: string, nfcId: string, name: string, deviceType?: string | null, views: number, lastScannedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, homeScreen?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateNfcConfigMutationVariables = Exact<{
  options: NfcConfigInput;
}>;


export type CreateNfcConfigMutation = { __typename?: 'Mutation', createNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, nfcId: string, name: string, deviceType?: string | null, views: number, lastScannedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, homeScreen?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateNfcConfigMutationVariables = Exact<{
  id: Scalars['String'];
  options: NfcConfigInput;
}>;


export type UpdateNfcConfigMutation = { __typename?: 'Mutation', updateNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, nfcId: string, name: string, deviceType?: string | null, views: number, lastScannedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string }, homeScreen?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteNfcConfigMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteNfcConfigMutation = { __typename?: 'Mutation', deleteNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, nfcId: string, name: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AssignHomeScreenToNfcConfigMutationVariables = Exact<{
  id: Scalars['String'];
  homeScreenId?: InputMaybe<Scalars['String']>;
}>;


export type AssignHomeScreenToNfcConfigMutation = { __typename?: 'Mutation', assignHomeScreenToNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, nfcId: string, name: string, homeScreen?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type OpenAiQueryVariables = Exact<{
  options: GptArgs;
}>;


export type OpenAiQuery = { __typename?: 'Query', getOpen: string };

export type SubscriptionSubscriptionVariables = Exact<{
  deviceId: Scalars['String'];
}>;


export type SubscriptionSubscription = { __typename?: 'Subscription', aiChatReponseUpdated: string };

export type GetSermonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSermonsQuery = { __typename?: 'Query', getSermons: { __typename?: 'SermonsResponse', results?: Array<{ __typename?: 'Sermon', _id: string, title: string, content: string, status: SermonStatus, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetSermonQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSermonQuery = { __typename?: 'Query', getSermon: { __typename?: 'SermonResponse', results?: { __typename?: 'Sermon', _id: string, title: string, content: string, status: SermonStatus, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateSermonMutationVariables = Exact<{
  options: SermonInput;
}>;


export type CreateSermonMutation = { __typename?: 'Mutation', createSermon: { __typename?: 'SermonResponse', results?: { __typename?: 'Sermon', _id: string, title: string, content: string, status: SermonStatus, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateSermonMutationVariables = Exact<{
  id: Scalars['String'];
  options: SermonInput;
}>;


export type UpdateSermonMutation = { __typename?: 'Mutation', updateSermon: { __typename?: 'SermonResponse', results?: { __typename?: 'Sermon', _id: string, title: string, content: string, status: SermonStatus, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteSermonMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteSermonMutation = { __typename?: 'Mutation', deleteSermon: { __typename?: 'SermonResponse', results?: { __typename?: 'Sermon', _id: string, title: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GenerateSermonContentMutationVariables = Exact<{
  input: SermonAiInput;
}>;


export type GenerateSermonContentMutation = { __typename?: 'Mutation', generateSermonContent: { __typename?: 'SermonAIResponse', result?: { __typename?: 'SermonAIContent', content: string, suggestions?: string | null, relatedVerses?: Array<string> | null, promptType: string } | null, errors?: Array<{ __typename?: 'FieldError', message: string }> | null } };

export type GetSermonAiPromptTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSermonAiPromptTypesQuery = { __typename?: 'Query', getSermonAIPromptTypes: Array<{ __typename?: 'SermonAIPromptInfo', type: SermonAiPromptType, category: string, label: string, description: string }> };

export type StreamSermonContentMutationVariables = Exact<{
  input: SermonAiInput;
}>;


export type StreamSermonContentMutation = { __typename?: 'Mutation', streamSermonContent: boolean };

export type SermonAiStreamSubscriptionVariables = Exact<{
  sessionId: Scalars['String'];
}>;


export type SermonAiStreamSubscription = { __typename?: 'Subscription', sermonAIStream: string };

export type GetSongsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSongsQuery = { __typename?: 'Query', getSongs: { __typename?: 'SongsResponse', results?: Array<{ __typename?: 'Song', _id: string, title: string, artist?: string | null, defaultKey?: string | null, bpm?: number | null, lyrics?: string | null, chordChart?: string | null, youtubeLink?: string | null, notes?: string | null, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetSongQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSongQuery = { __typename?: 'Query', getSong: { __typename?: 'SongResponse', results?: { __typename?: 'Song', _id: string, title: string, artist?: string | null, defaultKey?: string | null, bpm?: number | null, lyrics?: string | null, chordChart?: string | null, youtubeLink?: string | null, notes?: string | null, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SearchSongsQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SearchSongsQuery = { __typename?: 'Query', searchSongs: { __typename?: 'SongsResponse', results?: Array<{ __typename?: 'Song', _id: string, title: string, artist?: string | null, defaultKey?: string | null, bpm?: number | null, lyrics?: string | null, chordChart?: string | null, youtubeLink?: string | null, notes?: string | null, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateSongMutationVariables = Exact<{
  options: SongInput;
}>;


export type CreateSongMutation = { __typename?: 'Mutation', createSong: { __typename?: 'SongResponse', results?: { __typename?: 'Song', _id: string, title: string, artist?: string | null, defaultKey?: string | null, bpm?: number | null, lyrics?: string | null, chordChart?: string | null, youtubeLink?: string | null, notes?: string | null, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateSongMutationVariables = Exact<{
  id: Scalars['String'];
  options: SongInput;
}>;


export type UpdateSongMutation = { __typename?: 'Mutation', updateSong: { __typename?: 'SongResponse', results?: { __typename?: 'Song', _id: string, title: string, artist?: string | null, defaultKey?: string | null, bpm?: number | null, lyrics?: string | null, chordChart?: string | null, youtubeLink?: string | null, notes?: string | null, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteSongMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteSongMutation = { __typename?: 'Mutation', deleteSong: { __typename?: 'SongResponse', results?: { __typename?: 'Song', _id: string, title: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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

export type GetWorshipServicesQueryVariables = Exact<{
  teamId?: InputMaybe<Scalars['String']>;
}>;


export type GetWorshipServicesQuery = { __typename?: 'Query', getWorshipServices: { __typename?: 'WorshipServicesResponse', results?: Array<{ __typename?: 'WorshipService', _id: string, name: string, date: string, notes?: string | null, status: ServiceStatus, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null }, team: { __typename?: 'WorshipTeam', _id: string, name: string }, assignments?: Array<{ __typename?: 'ServiceAssignment', _id: string, role: TeamRole, status: AssignmentStatus, notes?: string | null, member: { __typename?: 'TeamMember', _id: string, role: TeamRole, user: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } }> | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetWorshipServiceQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetWorshipServiceQuery = { __typename?: 'Query', getWorshipService: { __typename?: 'WorshipServiceResponse', results?: { __typename?: 'WorshipService', _id: string, name: string, date: string, notes?: string | null, status: ServiceStatus, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null }, team: { __typename?: 'WorshipTeam', _id: string, name: string }, assignments?: Array<{ __typename?: 'ServiceAssignment', _id: string, role: TeamRole, status: AssignmentStatus, notes?: string | null, member: { __typename?: 'TeamMember', _id: string, role: TeamRole, user: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } }> | null, setlist?: { __typename?: 'Setlist', _id: string, name: string, items?: Array<{ __typename?: 'SetlistItem', _id: string, order: number, key?: string | null, bpm?: number | null, notes?: string | null, song: { __typename?: 'Song', _id: string, title: string, artist?: string | null, defaultKey?: string | null, bpm?: number | null, lyrics?: string | null, chordChart?: string | null } }> | null } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateWorshipServiceMutationVariables = Exact<{
  options: WorshipServiceInput;
}>;


export type CreateWorshipServiceMutation = { __typename?: 'Mutation', createWorshipService: { __typename?: 'WorshipServiceResponse', results?: { __typename?: 'WorshipService', _id: string, name: string, date: string, status: ServiceStatus, team: { __typename?: 'WorshipTeam', _id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateWorshipServiceMutationVariables = Exact<{
  id: Scalars['String'];
  options: WorshipServiceInput;
}>;


export type UpdateWorshipServiceMutation = { __typename?: 'Mutation', updateWorshipService: { __typename?: 'WorshipServiceResponse', results?: { __typename?: 'WorshipService', _id: string, name: string, date: string, status: ServiceStatus } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteWorshipServiceMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteWorshipServiceMutation = { __typename?: 'Mutation', deleteWorshipService: { __typename?: 'WorshipServiceResponse', results?: { __typename?: 'WorshipService', _id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type PublishWorshipServiceMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type PublishWorshipServiceMutation = { __typename?: 'Mutation', publishWorshipService: { __typename?: 'WorshipServiceResponse', results?: { __typename?: 'WorshipService', _id: string, name: string, status: ServiceStatus } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateServiceAssignmentMutationVariables = Exact<{
  options: ServiceAssignmentInput;
}>;


export type CreateServiceAssignmentMutation = { __typename?: 'Mutation', createServiceAssignment: { __typename?: 'ServiceAssignmentResponse', results?: { __typename?: 'ServiceAssignment', _id: string, role: TeamRole, status: AssignmentStatus, member: { __typename?: 'TeamMember', _id: string, user: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RespondToAssignmentMutationVariables = Exact<{
  assignmentId: Scalars['String'];
  accept: Scalars['Boolean'];
}>;


export type RespondToAssignmentMutation = { __typename?: 'Mutation', respondToAssignment: { __typename?: 'ServiceAssignmentResponse', results?: { __typename?: 'ServiceAssignment', _id: string, status: AssignmentStatus } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveServiceAssignmentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveServiceAssignmentMutation = { __typename?: 'Mutation', removeServiceAssignment: { __typename?: 'ServiceAssignmentResponse', results?: { __typename?: 'ServiceAssignment', _id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetSetlistQueryVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetSetlistQuery = { __typename?: 'Query', getSetlist: { __typename?: 'SetlistResponse', results?: { __typename?: 'Setlist', _id: string, name: string, items?: Array<{ __typename?: 'SetlistItem', _id: string, order: number, key?: string | null, bpm?: number | null, notes?: string | null, song: { __typename?: 'Song', _id: string, title: string, artist?: string | null, defaultKey?: string | null, bpm?: number | null, lyrics?: string | null, chordChart?: string | null } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateSetlistMutationVariables = Exact<{
  options: SetlistInput;
}>;


export type CreateSetlistMutation = { __typename?: 'Mutation', createSetlist: { __typename?: 'SetlistResponse', results?: { __typename?: 'Setlist', _id: string, name: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AddSetlistItemMutationVariables = Exact<{
  setlistId: Scalars['String'];
  options: SetlistItemInput;
}>;


export type AddSetlistItemMutation = { __typename?: 'Mutation', addSetlistItem: { __typename?: 'SetlistItemResponse', results?: { __typename?: 'SetlistItem', _id: string, order: number, key?: string | null, bpm?: number | null, notes?: string | null, song: { __typename?: 'Song', _id: string, title: string, artist?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateSetlistItemMutationVariables = Exact<{
  id: Scalars['String'];
  options: SetlistItemInput;
}>;


export type UpdateSetlistItemMutation = { __typename?: 'Mutation', updateSetlistItem: { __typename?: 'SetlistItemResponse', results?: { __typename?: 'SetlistItem', _id: string, order: number, key?: string | null, bpm?: number | null, notes?: string | null, song: { __typename?: 'Song', _id: string, title: string, artist?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveSetlistItemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveSetlistItemMutation = { __typename?: 'Mutation', removeSetlistItem: { __typename?: 'SetlistItemResponse', results?: { __typename?: 'SetlistItem', _id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ReorderSetlistItemsMutationVariables = Exact<{
  setlistId: Scalars['String'];
  itemIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type ReorderSetlistItemsMutation = { __typename?: 'Mutation', reorderSetlistItems: { __typename?: 'SetlistResponse', results?: { __typename?: 'Setlist', _id: string, items?: Array<{ __typename?: 'SetlistItem', _id: string, order: number, song: { __typename?: 'Song', _id: string, title: string } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetRehearsalsQueryVariables = Exact<{
  teamId?: InputMaybe<Scalars['String']>;
  serviceId?: InputMaybe<Scalars['String']>;
}>;


export type GetRehearsalsQuery = { __typename?: 'Query', getRehearsals: { __typename?: 'RehearsalsResponse', results?: Array<{ __typename?: 'Rehearsal', _id: string, date: string, notes?: string | null, songIds?: Array<string> | null, createdAt: string, team: { __typename?: 'WorshipTeam', _id: string, name: string }, service?: { __typename?: 'WorshipService', _id: string, name: string, date: string } | null, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateRehearsalMutationVariables = Exact<{
  options: RehearsalInput;
}>;


export type CreateRehearsalMutation = { __typename?: 'Mutation', createRehearsal: { __typename?: 'RehearsalResponse', results?: { __typename?: 'Rehearsal', _id: string, date: string, notes?: string | null, songIds?: Array<string> | null, team: { __typename?: 'WorshipTeam', _id: string, name: string }, service?: { __typename?: 'WorshipService', _id: string, name: string, date: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateRehearsalMutationVariables = Exact<{
  id: Scalars['String'];
  options: RehearsalInput;
}>;


export type UpdateRehearsalMutation = { __typename?: 'Mutation', updateRehearsal: { __typename?: 'RehearsalResponse', results?: { __typename?: 'Rehearsal', _id: string, date: string, notes?: string | null, songIds?: Array<string> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteRehearsalMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRehearsalMutation = { __typename?: 'Mutation', deleteRehearsal: { __typename?: 'RehearsalResponse', results?: { __typename?: 'Rehearsal', _id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetWorshipTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorshipTeamsQuery = { __typename?: 'Query', getWorshipTeams: { __typename?: 'WorshipTeamsResponse', results?: Array<{ __typename?: 'WorshipTeam', _id: string, name: string, description?: string | null, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null }, members?: Array<{ __typename?: 'TeamMember', _id: string, role: TeamRole, skills?: Array<string> | null, user: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, email: string } }> | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetWorshipTeamQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetWorshipTeamQuery = { __typename?: 'Query', getWorshipTeam: { __typename?: 'WorshipTeamResponse', results?: { __typename?: 'WorshipTeam', _id: string, name: string, description?: string | null, createdAt: string, updatedAt: string, author: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null }, members?: Array<{ __typename?: 'TeamMember', _id: string, role: TeamRole, skills?: Array<string> | null, user: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, email: string } }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateWorshipTeamMutationVariables = Exact<{
  options: WorshipTeamInput;
}>;


export type CreateWorshipTeamMutation = { __typename?: 'Mutation', createWorshipTeam: { __typename?: 'WorshipTeamResponse', results?: { __typename?: 'WorshipTeam', _id: string, name: string, description?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateWorshipTeamMutationVariables = Exact<{
  id: Scalars['String'];
  options: WorshipTeamInput;
}>;


export type UpdateWorshipTeamMutation = { __typename?: 'Mutation', updateWorshipTeam: { __typename?: 'WorshipTeamResponse', results?: { __typename?: 'WorshipTeam', _id: string, name: string, description?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteWorshipTeamMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteWorshipTeamMutation = { __typename?: 'Mutation', deleteWorshipTeam: { __typename?: 'WorshipTeamResponse', results?: { __typename?: 'WorshipTeam', _id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetTeamMembersQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type GetTeamMembersQuery = { __typename?: 'Query', getTeamMembers: { __typename?: 'TeamMembersResponse', results?: Array<{ __typename?: 'TeamMember', _id: string, role: TeamRole, skills?: Array<string> | null, createdAt: string, user: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, email: string }, team: { __typename?: 'WorshipTeam', _id: string, name: string } }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AddTeamMemberMutationVariables = Exact<{
  options: TeamMemberInput;
}>;


export type AddTeamMemberMutation = { __typename?: 'Mutation', addTeamMember: { __typename?: 'TeamMemberResponse', results?: { __typename?: 'TeamMember', _id: string, role: TeamRole, skills?: Array<string> | null, user: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, email: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateTeamMemberMutationVariables = Exact<{
  id: Scalars['String'];
  options: UpdateTeamMemberInput;
}>;


export type UpdateTeamMemberMutation = { __typename?: 'Mutation', updateTeamMember: { __typename?: 'TeamMemberResponse', results?: { __typename?: 'TeamMember', _id: string, role: TeamRole, skills?: Array<string> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveTeamMemberMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveTeamMemberMutation = { __typename?: 'Mutation', removeTeamMember: { __typename?: 'TeamMemberResponse', results?: { __typename?: 'TeamMember', _id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetTeamInvitesQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type GetTeamInvitesQuery = { __typename?: 'Query', getTeamInvites: { __typename?: 'TeamInvitesResponse', results?: Array<{ __typename?: 'TeamInvite', _id: string, email?: string | null, role: TeamRole, status: InviteStatus, method: InviteMethod, inviteToken: string, expiresAt: string, createdAt: string, skills?: Array<string> | null, invitedBy: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null }, invitedUser?: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, email: string } | null, team: { __typename?: 'WorshipTeam', _id: string, name: string } }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetMyInvitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyInvitesQuery = { __typename?: 'Query', getMyInvites: { __typename?: 'TeamInvitesResponse', results?: Array<{ __typename?: 'TeamInvite', _id: string, email?: string | null, role: TeamRole, status: InviteStatus, method: InviteMethod, expiresAt: string, createdAt: string, skills?: Array<string> | null, invitedBy: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, email: string, churchName?: string | null }, team: { __typename?: 'WorshipTeam', _id: string, name: string, description?: string | null } }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SendTeamInviteMutationVariables = Exact<{
  options: TeamInviteInput;
}>;


export type SendTeamInviteMutation = { __typename?: 'Mutation', sendTeamInvite: { __typename?: 'TeamInviteResponse', results?: { __typename?: 'TeamInvite', _id: string, email?: string | null, role: TeamRole, status: InviteStatus, method: InviteMethod, inviteToken: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RespondToInviteMutationVariables = Exact<{
  inviteId: Scalars['String'];
  accept: Scalars['Boolean'];
}>;


export type RespondToInviteMutation = { __typename?: 'Mutation', respondToInvite: { __typename?: 'TeamInviteResponse', results?: { __typename?: 'TeamInvite', _id: string, status: InviteStatus } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetInviteByTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetInviteByTokenQuery = { __typename?: 'Query', getInviteByToken: { __typename?: 'TeamInviteResponse', results?: { __typename?: 'TeamInvite', _id: string, role: TeamRole, skills?: Array<string> | null, status: InviteStatus, expiresAt: string, team: { __typename?: 'WorshipTeam', _id: string, name: string }, invitedBy: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AcceptInviteByTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type AcceptInviteByTokenMutation = { __typename?: 'Mutation', acceptInviteByToken: { __typename?: 'TeamInviteResponse', results?: { __typename?: 'TeamInvite', _id: string, status: InviteStatus, team: { __typename?: 'WorshipTeam', _id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CancelTeamInviteMutationVariables = Exact<{
  inviteId: Scalars['String'];
}>;


export type CancelTeamInviteMutation = { __typename?: 'Mutation', cancelTeamInvite: { __typename?: 'TeamInviteResponse', results?: { __typename?: 'TeamInvite', _id: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ResendTeamInviteMutationVariables = Exact<{
  inviteId: Scalars['String'];
}>;


export type ResendTeamInviteMutation = { __typename?: 'Mutation', resendTeamInvite: { __typename?: 'TeamInviteResponse', results?: { __typename?: 'TeamInvite', _id: string, status: InviteStatus, expiresAt: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SearchUsersQueryVariables = Exact<{
  searchTerm: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'UsersSearchResponse', results?: Array<{ __typename?: 'User', _id: string, email: string, firstName?: string | null, lastName?: string | null, churchName?: string | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AdminGetAllNfcConfigsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type AdminGetAllNfcConfigsQuery = { __typename?: 'Query', adminGetAllNFCConfigs: { __typename?: 'NFCConfigsResponse', results?: Array<{ __typename?: 'NFCConfig', _id: string, nfcId: string, name: string, deviceType?: string | null, views: number, lastScannedAt?: string | null, createdAt: string, updatedAt: string, owner: { __typename?: 'User', _id: string, email: string, firstName?: string | null, lastName?: string | null }, homeScreen?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string } | null }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AdminCreateNfcConfigMutationVariables = Exact<{
  options: AdminNfcConfigInput;
}>;


export type AdminCreateNfcConfigMutation = { __typename?: 'Mutation', adminCreateNFCConfig: { __typename?: 'NFCConfigResponse', results?: { __typename?: 'NFCConfig', _id: string, nfcId: string, name: string, deviceType?: string | null, views: number, createdAt: string, owner: { __typename?: 'User', _id: string, email: string, firstName?: string | null, lastName?: string | null }, homeScreen?: { __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string } | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetHomeScreensByOwnerIdQueryVariables = Exact<{
  ownerId: Scalars['String'];
}>;


export type GetHomeScreensByOwnerIdQuery = { __typename?: 'Query', getHomeScreensByOwnerId: { __typename?: 'HomeScreensResponse', results?: Array<{ __typename?: 'HomeScreen', _id: string, name: string, shareableLink: string }> | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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


export type ScheduleMoodNotificationDetailedMutation = { __typename?: 'Mutation', scheduleMoodNotification: { __typename?: 'ScheduleNotificationResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, notification?: { __typename?: 'Notification', _id: string, userId: string, mood?: string | null, type: string, scheduledFor?: any | null, deviceId?: string | null, message: string, status: string, createdAt: any, updatedAt: any } | null } };

export type GetUserPendingNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserPendingNotificationsQuery = { __typename?: 'Query', getUserPendingNotifications: Array<{ __typename?: 'Notification', _id: string, userId: string, mood?: string | null, type: string, scheduledFor?: any | null, deviceId?: string | null, message: string, status: string, createdAt: any, updatedAt: any }> };

export type CancelNotificationMutationVariables = Exact<{
  notificationId: Scalars['String'];
}>;


export type CancelNotificationMutation = { __typename?: 'Mutation', cancelNotification: boolean };

export type MoodRequestAvailableDetailedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type MoodRequestAvailableDetailedSubscription = { __typename?: 'Subscription', moodRequestAvailable: { __typename?: 'MoodNotificationMessage', mood: string, message: string, timestamp: any, userId: string } };

export type GetMyInAppNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyInAppNotificationsQuery = { __typename?: 'Query', getMyInAppNotifications: Array<{ __typename?: 'Notification', _id: string, title: string, message: string, contentType: string, deliveryType: string, status: string, actionUrl?: string | null, actionText?: string | null, metadata?: string | null, createdAt: any }> };

export type MarkNotificationReadMutationVariables = Exact<{
  notificationId: Scalars['String'];
}>;


export type MarkNotificationReadMutation = { __typename?: 'Mutation', markNotificationRead: boolean };

export type RespondToTeamInviteMutationVariables = Exact<{
  inviteId: Scalars['String'];
  accept: Scalars['Boolean'];
}>;


export type RespondToTeamInviteMutation = { __typename?: 'Mutation', respondToInvite: { __typename?: 'TeamInviteResponse', results?: { __typename?: 'TeamInvite', _id: string, status: InviteStatus } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetUserNotificationSettingsBasicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNotificationSettingsBasicQuery = { __typename?: 'Query', getUserNotificationSettings: { __typename?: 'NotificationSettingsResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, settings?: { __typename?: 'UserNotificationSettings', _id: string, userId: string, enableWebSocketNotifications: boolean, enableBrowserPushNotifications: boolean, enableEmailNotifications: boolean, pushSubscriptionEndpoint?: string | null, pushSubscriptionKeys?: string | null, createdAt: any, updatedAt: any } | null } };

export type UpdateNotificationSettingsBasicMutationVariables = Exact<{
  input: NotificationSettingsInput;
}>;


export type UpdateNotificationSettingsBasicMutation = { __typename?: 'Mutation', updateNotificationSettings: { __typename?: 'NotificationSettingsResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, settings?: { __typename?: 'UserNotificationSettings', _id: string, userId: string, enableWebSocketNotifications: boolean, enableBrowserPushNotifications: boolean, enableEmailNotifications: boolean, pushSubscriptionEndpoint?: string | null, pushSubscriptionKeys?: string | null, createdAt: any, updatedAt: any } | null } };

export type ScheduleMoodNotificationBasicMutationVariables = Exact<{
  input: ScheduleNotificationInput;
}>;


export type ScheduleMoodNotificationBasicMutation = { __typename?: 'Mutation', scheduleMoodNotification: { __typename?: 'ScheduleNotificationResponse', errors?: Array<{ __typename?: 'FieldError', message: string }> | null, notification?: { __typename?: 'Notification', _id: string, mood?: string | null, type: string, scheduledFor?: any | null, message: string, status: string } | null } };

export type MoodRequestAvailableBasicSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type MoodRequestAvailableBasicSubscription = { __typename?: 'Subscription', moodRequestAvailable: { __typename?: 'MoodNotificationMessage', mood: string, message: string, timestamp: any, userId: string } };


export const SignoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Signout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signout"}}]}}]} as unknown as DocumentNode<SignoutQuery, SignoutQueryVariables>;
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
export const GetHomeScreenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomeScreen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}},{"kind":"Field","name":{"kind":"Name","value":"tiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"isInDock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpaper"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastViewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeScreenQuery, GetHomeScreenQueryVariables>;
export const GetHomeScreenByLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeScreenByLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shareableLink"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomeScreenByLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"shareableLink"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shareableLink"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}},{"kind":"Field","name":{"kind":"Name","value":"tiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"isInDock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpaper"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastViewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeScreenByLinkQuery, GetHomeScreenByLinkQueryVariables>;
export const GetHomeScreensByOwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeScreensByOwner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomeScreensByOwner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}},{"kind":"Field","name":{"kind":"Name","value":"tiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"isInDock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpaper"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastViewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeScreensByOwnerQuery, GetHomeScreensByOwnerQueryVariables>;
export const CreateHomeScreenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHomeScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HomeScreenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHomeScreen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}},{"kind":"Field","name":{"kind":"Name","value":"tiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"isInDock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpaper"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastViewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateHomeScreenMutation, CreateHomeScreenMutationVariables>;
export const UpdateHomeScreenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHomeScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HomeScreenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHomeScreen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}},{"kind":"Field","name":{"kind":"Name","value":"tiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"isInDock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpaper"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastViewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateHomeScreenMutation, UpdateHomeScreenMutationVariables>;
export const DeleteHomeScreenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteHomeScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHomeScreen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteHomeScreenMutation, DeleteHomeScreenMutationVariables>;
export const IncrementHomeScreenViewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IncrementHomeScreenViews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"incrementHomeScreenViews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastViewedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<IncrementHomeScreenViewsMutation, IncrementHomeScreenViewsMutationVariables>;
export const GetMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMediaQuery, GetMediaQueryVariables>;
export const GetMediaByPurposeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMediaByPurpose"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purpose"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMediaByPurpose"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"purpose"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purpose"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMediaByPurposeQuery, GetMediaByPurposeQueryVariables>;
export const GetMediaUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMediaUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMediaUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetMediaUrlQuery, GetMediaUrlQueryVariables>;
export const GetGetSignedUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetGetSignedUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignedUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGetSignedUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetGetSignedUrlMutation, GetGetSignedUrlMutationVariables>;
export const GetPostSignedUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetPostSignedUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignedUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostSignedUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"fields"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostSignedUrlMutation, GetPostSignedUrlMutationVariables>;
export const CreateMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMediaMutation, CreateMediaMutationVariables>;
export const UpdateMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMediaMutation, UpdateMediaMutationVariables>;
export const DeleteMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"purpose"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cache"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMediaMutation, DeleteMediaMutationVariables>;
export const GetNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nfcId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deviceType"}},{"kind":"Field","name":{"kind":"Name","value":"homeScreen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}},{"kind":"Field","name":{"kind":"Name","value":"tiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"isInDock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallpaper"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastScannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetNfcConfigQuery, GetNfcConfigQueryVariables>;
export const GetNfcConfigsByOwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNFCConfigsByOwner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNFCConfigsByOwner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nfcId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deviceType"}},{"kind":"Field","name":{"kind":"Name","value":"homeScreen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastScannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetNfcConfigsByOwnerQuery, GetNfcConfigsByOwnerQueryVariables>;
export const CreateNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NFCConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nfcId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deviceType"}},{"kind":"Field","name":{"kind":"Name","value":"homeScreen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastScannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateNfcConfigMutation, CreateNfcConfigMutationVariables>;
export const UpdateNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NFCConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nfcId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deviceType"}},{"kind":"Field","name":{"kind":"Name","value":"homeScreen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastScannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateNfcConfigMutation, UpdateNfcConfigMutationVariables>;
export const DeleteNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"nfcId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteNfcConfigMutation, DeleteNfcConfigMutationVariables>;
export const AssignHomeScreenToNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignHomeScreenToNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"homeScreenId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignHomeScreenToNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"homeScreenId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"homeScreenId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"nfcId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"homeScreen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AssignHomeScreenToNfcConfigMutation, AssignHomeScreenToNfcConfigMutationVariables>;
export const OpenAiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OpenAi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GptArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOpen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}]}]}}]} as unknown as DocumentNode<OpenAiQuery, OpenAiQueryVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aiChatReponseUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}}]}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;
export const GetSermonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSermons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSermons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetSermonsQuery, GetSermonsQueryVariables>;
export const GetSermonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSermon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSermon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetSermonQuery, GetSermonQueryVariables>;
export const CreateSermonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSermon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SermonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSermon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSermonMutation, CreateSermonMutationVariables>;
export const UpdateSermonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSermon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SermonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSermon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSermonMutation, UpdateSermonMutationVariables>;
export const DeleteSermonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSermon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSermon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteSermonMutation, DeleteSermonMutationVariables>;
export const GenerateSermonContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateSermonContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SermonAIInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateSermonContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"suggestions"}},{"kind":"Field","name":{"kind":"Name","value":"relatedVerses"}},{"kind":"Field","name":{"kind":"Name","value":"promptType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GenerateSermonContentMutation, GenerateSermonContentMutationVariables>;
export const GetSermonAiPromptTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSermonAIPromptTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSermonAIPromptTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetSermonAiPromptTypesQuery, GetSermonAiPromptTypesQueryVariables>;
export const StreamSermonContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StreamSermonContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SermonAIInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streamSermonContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<StreamSermonContentMutation, StreamSermonContentMutationVariables>;
export const SermonAiStreamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SermonAIStream"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sermonAIStream"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}]}]}}]} as unknown as DocumentNode<SermonAiStreamSubscription, SermonAiStreamSubscriptionVariables>;
export const GetSongsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSongs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSongs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"defaultKey"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"chordChart"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeLink"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetSongsQuery, GetSongsQueryVariables>;
export const GetSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"defaultKey"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"chordChart"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeLink"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetSongQuery, GetSongQueryVariables>;
export const SearchSongsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchSongs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchSongs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"defaultKey"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"chordChart"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeLink"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SearchSongsQuery, SearchSongsQueryVariables>;
export const CreateSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SongInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"defaultKey"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"chordChart"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeLink"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSongMutation, CreateSongMutationVariables>;
export const UpdateSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SongInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"defaultKey"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"chordChart"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeLink"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSongMutation, UpdateSongMutationVariables>;
export const DeleteSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteSongMutation, DeleteSongMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UserBibleHistoryQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserBibleHistoryQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bibleHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"bibleAbbr"}},{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"viewedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserBibleHistoryQueryQuery, UserBibleHistoryQueryQueryVariables>;
export const GetBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"newVerses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bookNameAlt"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"chapterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseStart"}},{"kind":"Field","name":{"kind":"Name","value":"verseStartAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseEnd"}},{"kind":"Field","name":{"kind":"Name","value":"verseEndAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookmarksQuery, GetBookmarksQueryVariables>;
export const CreateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}},{"kind":"Field","name":{"kind":"Name","value":"newVerses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookId"}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"bookNameAlt"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"chapterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseStart"}},{"kind":"Field","name":{"kind":"Name","value":"verseStartAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseEnd"}},{"kind":"Field","name":{"kind":"Name","value":"verseEndAlt"}},{"kind":"Field","name":{"kind":"Name","value":"verseText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"translation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookName"}},{"kind":"Field","name":{"kind":"Name","value":"chapterNumber"}},{"kind":"Field","name":{"kind":"Name","value":"verse"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"bibleId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}},{"kind":"Field","name":{"kind":"Name","value":"bioText"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBookmarkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkOptions"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBookmarkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"verses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>;
export const DeleteBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBookmarks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<DeleteBookmarksMutation, DeleteBookmarksMutationVariables>;
export const GetWorshipServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorshipServices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWorshipServices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorshipServicesQuery, GetWorshipServicesQueryVariables>;
export const GetWorshipServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorshipService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWorshipService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"setlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"defaultKey"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"chordChart"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorshipServiceQuery, GetWorshipServiceQueryVariables>;
export const CreateWorshipServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorshipService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorshipServiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorshipService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWorshipServiceMutation, CreateWorshipServiceMutationVariables>;
export const UpdateWorshipServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorshipService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorshipServiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorshipService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWorshipServiceMutation, UpdateWorshipServiceMutationVariables>;
export const DeleteWorshipServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorshipService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorshipService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteWorshipServiceMutation, DeleteWorshipServiceMutationVariables>;
export const PublishWorshipServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishWorshipService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishWorshipService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<PublishWorshipServiceMutation, PublishWorshipServiceMutationVariables>;
export const CreateServiceAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateServiceAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ServiceAssignmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createServiceAssignment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateServiceAssignmentMutation, CreateServiceAssignmentMutationVariables>;
export const RespondToAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RespondToAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignmentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accept"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"respondToAssignment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assignmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignmentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accept"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accept"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RespondToAssignmentMutation, RespondToAssignmentMutationVariables>;
export const RemoveServiceAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveServiceAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeServiceAssignment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveServiceAssignmentMutation, RemoveServiceAssignmentMutationVariables>;
export const GetSetlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSetlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSetlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"defaultKey"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"chordChart"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetSetlistQuery, GetSetlistQueryVariables>;
export const CreateSetlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSetlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetlistInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSetlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSetlistMutation, CreateSetlistMutationVariables>;
export const AddSetlistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSetlistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setlistId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetlistItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSetlistItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"setlistId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setlistId"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AddSetlistItemMutation, AddSetlistItemMutationVariables>;
export const UpdateSetlistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSetlistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetlistItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSetlistItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSetlistItemMutation, UpdateSetlistItemMutationVariables>;
export const RemoveSetlistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSetlistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSetlistItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveSetlistItemMutation, RemoveSetlistItemMutationVariables>;
export const ReorderSetlistItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReorderSetlistItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setlistId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reorderSetlistItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"setlistId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setlistId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ReorderSetlistItemsMutation, ReorderSetlistItemsMutationVariables>;
export const GetRehearsalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRehearsals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRehearsals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}},{"kind":"Argument","name":{"kind":"Name","value":"serviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serviceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"songIds"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetRehearsalsQuery, GetRehearsalsQueryVariables>;
export const CreateRehearsalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRehearsal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RehearsalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRehearsal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"songIds"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRehearsalMutation, CreateRehearsalMutationVariables>;
export const UpdateRehearsalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRehearsal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RehearsalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRehearsal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"songIds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRehearsalMutation, UpdateRehearsalMutationVariables>;
export const DeleteRehearsalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRehearsal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRehearsal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteRehearsalMutation, DeleteRehearsalMutationVariables>;
export const GetWorshipTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorshipTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWorshipTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorshipTeamsQuery, GetWorshipTeamsQueryVariables>;
export const GetWorshipTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorshipTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWorshipTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorshipTeamQuery, GetWorshipTeamQueryVariables>;
export const CreateWorshipTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorshipTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorshipTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorshipTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWorshipTeamMutation, CreateWorshipTeamMutationVariables>;
export const UpdateWorshipTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorshipTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorshipTeamInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorshipTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWorshipTeamMutation, UpdateWorshipTeamMutationVariables>;
export const DeleteWorshipTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorshipTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorshipTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteWorshipTeamMutation, DeleteWorshipTeamMutationVariables>;
export const GetTeamMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTeamMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamMembersQuery, GetTeamMembersQueryVariables>;
export const AddTeamMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTeamMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TeamMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTeamMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AddTeamMemberMutation, AddTeamMemberMutationVariables>;
export const UpdateTeamMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTeamMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTeamMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTeamMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTeamMemberMutation, UpdateTeamMemberMutationVariables>;
export const RemoveTeamMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTeamMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTeamMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveTeamMemberMutation, RemoveTeamMemberMutationVariables>;
export const GetTeamInvitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamInvites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTeamInvites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"inviteToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"invitedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invitedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamInvitesQuery, GetTeamInvitesQueryVariables>;
export const GetMyInvitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyInvites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyInvites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"invitedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyInvitesQuery, GetMyInvitesQueryVariables>;
export const SendTeamInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendTeamInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TeamInviteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendTeamInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"inviteToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SendTeamInviteMutation, SendTeamInviteMutationVariables>;
export const RespondToInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RespondToInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accept"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"respondToInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accept"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accept"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RespondToInviteMutation, RespondToInviteMutationVariables>;
export const GetInviteByTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInviteByToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInviteByToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"invitedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetInviteByTokenQuery, GetInviteByTokenQueryVariables>;
export const AcceptInviteByTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptInviteByToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptInviteByToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AcceptInviteByTokenMutation, AcceptInviteByTokenMutationVariables>;
export const CancelTeamInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelTeamInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelTeamInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CancelTeamInviteMutation, CancelTeamInviteMutationVariables>;
export const ResendTeamInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendTeamInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendTeamInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ResendTeamInviteMutation, ResendTeamInviteMutationVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"churchName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const AdminGetAllNfcConfigsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetAllNFCConfigs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminGetAllNFCConfigs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"nfcId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deviceType"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"lastScannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"homeScreen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AdminGetAllNfcConfigsQuery, AdminGetAllNfcConfigsQueryVariables>;
export const AdminCreateNfcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminCreateNFCConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"options"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminNFCConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCreateNFCConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"Variable","name":{"kind":"Name","value":"options"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"nfcId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deviceType"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"homeScreen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AdminCreateNfcConfigMutation, AdminCreateNfcConfigMutationVariables>;
export const GetHomeScreensByOwnerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeScreensByOwnerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomeScreensByOwnerId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shareableLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeScreensByOwnerIdQuery, GetHomeScreensByOwnerIdQueryVariables>;
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
export const GetMyInAppNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyInAppNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyInAppNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"actionUrl"}},{"kind":"Field","name":{"kind":"Name","value":"actionText"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetMyInAppNotificationsQuery, GetMyInAppNotificationsQueryVariables>;
export const MarkNotificationReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkNotificationRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markNotificationRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"notificationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notificationId"}}}]}]}}]} as unknown as DocumentNode<MarkNotificationReadMutation, MarkNotificationReadMutationVariables>;
export const RespondToTeamInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RespondToTeamInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accept"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"respondToInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accept"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accept"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RespondToTeamInviteMutation, RespondToTeamInviteMutationVariables>;
export const GetUserNotificationSettingsBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserNotificationSettingsBasic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserNotificationSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"enableWebSocketNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableBrowserPushNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableEmailNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionEndpoint"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionKeys"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserNotificationSettingsBasicQuery, GetUserNotificationSettingsBasicQueryVariables>;
export const UpdateNotificationSettingsBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNotificationSettingsBasic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNotificationSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"enableWebSocketNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableBrowserPushNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"enableEmailNotifications"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionEndpoint"}},{"kind":"Field","name":{"kind":"Name","value":"pushSubscriptionKeys"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateNotificationSettingsBasicMutation, UpdateNotificationSettingsBasicMutationVariables>;
export const ScheduleMoodNotificationBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ScheduleMoodNotificationBasic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ScheduleNotificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleMoodNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledFor"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<ScheduleMoodNotificationBasicMutation, ScheduleMoodNotificationBasicMutationVariables>;
export const MoodRequestAvailableBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MoodRequestAvailableBasic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moodRequestAvailable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mood"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<MoodRequestAvailableBasicSubscription, MoodRequestAvailableBasicSubscriptionVariables>;