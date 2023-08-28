import constate from "constate";
import { useState } from "react";

/* Interfaces */
import {
  ITranslation,
  IBookInterface,
  IChapterInterface,
  IVerseInterface,
} from "../interfaces/BibleInterfaces";

const context = constate(() => {
  const [chosenTranslation, setChosenTranslation] = useState<ITranslation>();
  const [chosenBook, setChosenBook] = useState<IBookInterface>();
  const [chosenChapter, setChosenChapter] = useState<IChapterInterface>();
  const [selectedVerseList, setSelectedVerseList] = useState<IVerseInterface[]>(
    []
  );

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
    //grab the selected verse list into temp
    var temp = selectedVerseList;

    // add to the temp
    temp.push(dto);

    //set to state
    setSelectedVerseList(temp);
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

  return {
    chosenTranslation,
    chosenBook,
    chosenChapter,
    selectedVerseList,
    setTranslation,
    setBook,
    setChapter,
    addVerseToList,
    removeVerseFromList,
    resetVersesInList,
  };
});

export const [ContextProvider, useAppContext] = context;
