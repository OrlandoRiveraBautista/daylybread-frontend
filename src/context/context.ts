import constate from "constate";
import { useState } from "react";

/* Interfaces */
import {
  ITranslation,
  IBookInterface,
  IChapterInterface,
} from "../interfaces/BibleInterfaces";

const context = constate(() => {
  const [chosenTranslation, setChosenTranslation] = useState<ITranslation>();
  const [chosenBook, setChosenBook] = useState<IBookInterface>();
  const [chosenChapter, setChosenChapter] = useState<IChapterInterface>();

  const setTranslation = (dto: ITranslation) => {
    setChosenTranslation(dto);
  };

  const setBook = (dto: IBookInterface) => {
    setChosenBook(dto);
  };

  const setChapter = (dto: IChapterInterface) => {
    setChosenChapter(dto);
  };

  return {
    chosenTranslation,
    chosenBook,
    chosenChapter,
    setTranslation,
    setBook,
    setChapter,
  };
});

export const [ContextProvider, useAppContext] = context;
