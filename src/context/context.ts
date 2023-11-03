import constate from "constate";
import { useState } from "react";

/* Interfaces */
import {
  ITranslation,
  IBookInterface,
  IChapterInterface,
  IVerseInterface,
} from "../interfaces/BibleInterfaces";
/**
 * !Potentially we should start using the graphql types that are being generated from the backend
 * Unless it is unneccessary
 */
import { Bookmark, User } from "../__generated__/graphql";

const context = constate(() => {
  /** State declaration */
  const [userInfo, setUserInfo] = useState<User>();
  const [chosenTranslation, setChosenTranslation] = useState<ITranslation>();
  const [chosenBook, setChosenBook] = useState<IBookInterface>();
  const [chosenChapter, setChosenChapter] = useState<IChapterInterface>();
  const [selectedVerseList, setSelectedVerseList] = useState<IVerseInterface[]>(
    []
  );
  const [selectedUserAssets, setSelectedUserAssets] = useState<Bookmark[]>([]);

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
   * Checks if asset is in list
   */
  const isUserAssetInList = (dto: Bookmark) => {
    return selectedUserAssets.includes(dto);
  };

  /**
   * Resets selected user asset list
   */
  const resetUserAssetList = () => {
    //set to state
    setSelectedUserAssets([]);
  };

  return {
    chosenTranslation,
    chosenBook,
    chosenChapter,
    userInfo,
    selectedVerseList,
    selectedUserAssets,
    setTranslation,
    setBook,
    setChapter,
    setUser,
    addVerseToList,
    removeVerseFromList,
    resetVersesInList,
    addUserAssetToList,
    removeUserAssetFromList,
    resetUserAssetList,
    isUserAssetInList,
  };
});

export const [ContextProvider, useAppContext] = context;
