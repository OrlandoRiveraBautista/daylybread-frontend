import constate from "constate";
import { useEffect, useState } from "react";

/* API/GraphQL */
import { useLazyGetBookmarks } from "../hooks/UserHooks";

/* Interfaces */
import { ITranslation } from "../interfaces/BibleInterfaces";
import { IDeviceInfo } from "../interfaces/AuthInterfaces";
/**
 * !Potentially we should start using the graphql types that are being generated from the backend
 * Unless it is unneccessary
 */
import {
  Bookmark,
  User,
  BbLanguage,
  BbBible,
  BbBook,
  BbVerse,
  BbCopyright,
  BbAudioFile,
} from "../__generated__/graphql";
import { getCitationVerbage } from "../utils/support";
import { useLazyGetCopyrightForBible } from "../hooks/BibleBrainHooks";

const context = constate(() => {
  /** API/GraphQL Decunstruction */
  // Bookmarks API
  const {
    getLazyBookmarks,
    data: bookmarksResponse,
    loading: bookmarksLoading,
    error: bookmarksError,
  } = useLazyGetBookmarks();
  const { getCopyrightForBible, data: copyrightData } =
    useLazyGetCopyrightForBible();

  /** State declaration */
  // Bible State
  const [chosenLanguage, setChosenLanguage] = useState<BbLanguage>();
  const [chosenBible, setChosenBible] = useState<BbBible>();
  const [chosenBibleCopyright, setChosenBibleCopyright] =
    useState<BbCopyright>();
  const [chosenBibleBooks, setChosenBibleBooks] = useState<BbBook[]>();
  const [chosenBook, setChosenBook] = useState<BbBook>();
  const [chosenTranslation, setChosenTranslation] = useState<ITranslation>();
  const [chosenChapterNumber, setChosenChapterNumber] = useState<number>();
  const [chosenChapterVerses, setChosenChapterVerses] = useState<BbVerse[]>();
  const [chosenChapterMedia, setChosenChapterMedia] = useState<BbAudioFile[]>();
  const [currentMediaTimeStamp, setCurrentMediaTimestamp] = useState<number>();
  const [selectedVerseList, setSelectedVerseList] = useState<BbVerse[]>([]);
  const [selectedVersesCitation, setSelectedVersesCitation] = useState<
    string | undefined
  >();

  // User State
  const [userInfo, setUserInfo] = useState<User>();
  const [deviceInfo, setDeviceInfo] = useState<IDeviceInfo>();

  // Assets State
  const [selectedUserAssets, setSelectedUserAssets] = useState<Bookmark[]>([]);

  /**
   * Sets the bible translation to global state
   */
  const setBibleLanguage = (dto: BbLanguage) => {
    setChosenLanguage(dto);
  };

  /**
   * Sets the bible translation to global state
   * and gets copyright information
   */
  const setBible = (dto: BbBible) => {
    setChosenBible(dto);

    // get copyright information for the bible
    getCopyrightForBible({
      variables: {
        options: {
          bibleId: dto.abbr!,
        },
      },
    });
  };

  useEffect(() => {
    if (!copyrightData?.getCopyRightByBibleId.data) return;
    const filteredCopyright = copyrightData.getCopyRightByBibleId.data.filter(
      (entry) => entry.type?.includes("text")
    )[0];

    setChosenBibleCopyright(filteredCopyright);
  }, [copyrightData]);

  /**
   * Sets the bible book to global state
   */
  const setBibleBooks = (dto: BbBook[]) => {
    setChosenBibleBooks(dto);
  };

  /**
   * Sets the bible book to global state
   */
  const setBook = (dto: BbBook) => {
    setChosenBook(dto);
  };

  /**
   * Sets the bible translation to global state
   */
  const setTranslation = (dto: ITranslation) => {
    setChosenTranslation(dto);
  };

  /**
   * Sets the bible chapter to global state
   */
  const setChapterNumber = (dto: number) => {
    setChosenChapterNumber(dto);
  };

  /**
   * Sets the bible chapter to global state
   */
  const setChapterVerses = (dto: BbVerse[]) => {
    setChosenChapterVerses(dto);
  };

  /**
   * Sets the chapter's available media
   * and gets the times stamps
   */
  const setChapterMedia = (dto: BbAudioFile[]) => {
    setChosenChapterMedia(dto);
  };

  /**
   * Adds chosen bible verses to the list of selecteVerseList
   */
  const addVerseToList = (dto: BbVerse) => {
    // add new verse into state
    setSelectedVerseList([...selectedVerseList, dto]);
  };

  /**
   * Removes chosen bible verses from the list of selecteVerseList
   */
  const removeVerseFromList = (dto: BbVerse) => {
    //grab the selected verse list into temp
    var temp = selectedVerseList.filter((obj) => {
      return obj.verseStart !== dto.verseStart;
    });

    //set to state
    setSelectedVerseList(temp);
  };

  /**
   * Resets chosen bible verses in the list of selecteVerseList
   */
  const resetVersesInList = () => {
    //set to state
    setSelectedVerseList([]);
  };

  // useEffect to set selected verse citations verbage
  useEffect(() => {
    // exit function if there are no selected verses
    if (
      !selectedVerseList ||
      !chosenBible ||
      !chosenBook ||
      !chosenChapterNumber
    )
      return;
    if (selectedVerseList.length < 1) {
      setSelectedVersesCitation(undefined);
      return;
    }

    const text = getCitationVerbage(
      selectedVerseList,
      chosenBible,
      chosenBook,
      chosenChapterNumber
    );

    setSelectedVersesCitation(text);
    //for some reason selectedText needs to be watched to timely modify
  }, [selectedVerseList]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Sets the user into the context
   */
  const setUser = (dto: User) => {
    setUserInfo(dto);
  };

  /**
   * Sets the device info to the context
   */
  const setDevice = (dto: IDeviceInfo) => {
    setDeviceInfo(dto);
  };

  /**
   * Adds a user asset to the selected asset list
   */
  const addUserAssetToList = (dto: Bookmark) => {
    // add new item into state
    setSelectedUserAssets([...selectedUserAssets, dto]);
  };

  /**
   * Removes a user asset from the selected asset list
   */
  const removeUserAssetFromList = (dto: Bookmark) => {
    //grab the selected verse list into temp
    var temp = selectedUserAssets.filter((obj) => {
      return obj._id !== dto._id;
    });

    //set to state
    setSelectedUserAssets(temp);
  };

  /**
   * Resets selected user asset list
   */
  const resetUserAssetList = () => {
    //set to state
    setSelectedUserAssets([]);
  };

  /**
   * Checks if asset is in list
   */
  const isUserAssetInList = (dto: Bookmark) => {
    return selectedUserAssets.includes(dto);
  };

  /**
   * Gets user booksmarks
   * Returns the bookmark list and sets the bookmarks to state
   */
  const handleGetBookmarks = async () => {
    getLazyBookmarks();
  };

  return {
    chosenLanguage,
    chosenBible,
    chosenBibleCopyright,
    chosenBibleBooks,
    chosenTranslation,
    chosenBook,
    chosenChapterNumber,
    chosenChapterVerses,
    chosenChapterMedia,
    currentMediaTimeStamp,
    userInfo,
    deviceInfo,
    selectedVerseList,
    selectedVersesCitation,
    selectedUserAssets,
    bookmarksResponse,
    bookmarksLoading,
    bookmarksError,
    setBibleLanguage,
    setBible,
    setBibleBooks,
    setTranslation,
    setBook,
    setChapterNumber,
    setChapterVerses,
    setChapterMedia,
    setCurrentMediaTimestamp,
    setUser,
    setDevice,
    addVerseToList,
    removeVerseFromList,
    resetVersesInList,
    addUserAssetToList,
    removeUserAssetFromList,
    resetUserAssetList,
    isUserAssetInList,
    handleGetBookmarks,
  };
});

export const [ContextProvider, useAppContext] = context;
