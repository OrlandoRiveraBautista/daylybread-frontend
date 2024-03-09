import constate from "constate";
import { useState } from "react";

/* API/GraphQL */
import { useLazyGetBookmarks } from "../hooks/UserHooks";

/* Interfaces */
import {
  ITranslation,
  IBookInterface,
  IChapterInterface,
  IVerseInterface,
} from "../interfaces/BibleInterfaces";
import { IDeviceInfo } from "../interfaces/AuthInterfaces";
/**
 * !Potentially we should start using the graphql types that are being generated from the backend
 * Unless it is unneccessary
 */
import { Bookmark, User, BbLanguage } from "../__generated__/graphql";

const context = constate(() => {
  /** API/GraphQL Decunstruction */
  // Bookmarks API
  const {
    getLazyBookmarks,
    data: bookmarksResponse,
    loading: bookmarksLoading,
    error: bookmarksError,
  } = useLazyGetBookmarks();

  /** State declaration */
  // Bible State
  const [chosenLanguage, setChosenLanguage] = useState<BbLanguage>();
  const [chosenTranslation, setChosenTranslation] = useState<ITranslation>();
  const [chosenBook, setChosenBook] = useState<IBookInterface>();
  const [chosenChapter, setChosenChapter] = useState<IChapterInterface>();
  const [selectedVerseList, setSelectedVerseList] = useState<IVerseInterface[]>(
    []
  );

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
   */
  const setTranslation = (dto: ITranslation) => {
    setChosenTranslation(dto);
  };

  /**
   * Sets the bible book to global state
   */
  const setBook = (dto: IBookInterface) => {
    setChosenBook(dto);
  };

  /**
   * Sets the bible chapter to global state
   */
  const setChapter = (dto: IChapterInterface) => {
    setChosenChapter(dto);
  };

  /**
   * Adds chosen bible verses to the list of selecteVerseList
   */
  const addVerseToList = (dto: IVerseInterface) => {
    // add new verse into state
    setSelectedVerseList([...selectedVerseList, dto]);
  };

  /**
   * Removes chosen bible verses from the list of selecteVerseList
   */
  const removeVerseFromList = (dto: IVerseInterface) => {
    //grab the selected verse list into temp
    var temp = selectedVerseList.filter((obj) => {
      return obj.verse !== dto.verse;
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
    chosenTranslation,
    chosenBook,
    chosenChapter,
    userInfo,
    deviceInfo,
    selectedVerseList,
    selectedUserAssets,
    bookmarksResponse,
    bookmarksLoading,
    bookmarksError,
    setBibleLanguage,
    setTranslation,
    setBook,
    setChapter,
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
