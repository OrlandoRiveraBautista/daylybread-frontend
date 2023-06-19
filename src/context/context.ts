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

  const setTranslation = (dto: ITranslation) => {
    setChosenTranslation(dto);
  };

  const setBook = (dto: IBookInterface) => {
    setChosenBook(dto);
  };

  const setChapter = (dto: IChapterInterface) => {
    setChosenChapter(dto);
  };

  const addVerseToList = (dto: IVerseInterface) => {
    //grab the selected verse list into temp
    var temp = selectedVerseList;

    // add to the temp
    temp?.push(dto);

    //set to state
    setSelectedVerseList(temp);
  };

  const removeVerseFromList = (dto: IVerseInterface) => {
    //grab the selected verse list into temp
    var temp = selectedVerseList?.filter((obj) => {
      return obj.verse !== dto.verse;
    });

    //set to state
    setSelectedVerseList(temp);
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
  };
});

export const [ContextProvider, useAppContext] = context;
