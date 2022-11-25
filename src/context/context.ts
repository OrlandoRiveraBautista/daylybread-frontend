import { useState } from "react";
import constate from "constate";

/* Interfaces */
import { ITranslation } from "../interfaces/TranslationInterfaces";

const context = constate(() => {
  const [chosenTranslation, setChosenTranslation] = useState<ITranslation>();

  const setTranslation = (dto: ITranslation) => {
    setChosenTranslation(dto);
  };

  return {
    chosenTranslation,
    setTranslation,
  };
});

export const [ContextProvider, useAppContext] = context;
