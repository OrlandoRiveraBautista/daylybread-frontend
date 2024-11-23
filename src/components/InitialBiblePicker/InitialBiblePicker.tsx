import React, { useState } from "react";

/* Components */
import { IonButton, IonImg, IonText } from "@ionic/react";
import BibleTranslationModal from "../BibleNavModal/BibleTranslationModal";

/* Images */
import PatternImage from "../../assets/images/Patterns - 4x4.png";

/* Context */
import { useAppContext } from "../../context/context";
import { useTour } from "../../context/TourContext";

/* Utils */
import { displayBibleAbbr } from "../../utils/support";

/* Styles */
import "./InitialBiblePicker.scss";

const InitialBiblePicker: React.FC = () => {
  const { chosenBible } = useAppContext();

  const [openSelectedTranslationModal, setOpenSelectedTranslationModal] =
    useState<boolean>(false);

  const { nextStep, run: tourIsRunning } = useTour();

  const handleOpenTranslationModal = () => {
    setOpenSelectedTranslationModal(!openSelectedTranslationModal);
    if (openSelectedTranslationModal || !tourIsRunning) return;
    setTimeout(nextStep, 100);
  };

  return (
    <>
      <div className="helper-container">
        <div className="image-and-text">
          <IonImg
            src={PatternImage}
            alt="Pattern image"
            className="helper-image"
          />
          <IonText>Please pick a bible to begin</IonText>
        </div>
        <IonButton
          shape="round"
          color="primary"
          size="large"
          onClick={handleOpenTranslationModal}
          className="translation-button tour-step-1"
        >
          {chosenBible?.abbr
            ? displayBibleAbbr(chosenBible?.abbr)
            : "Pick bible"}
        </IonButton>
      </div>

      <BibleTranslationModal
        isOpen={openSelectedTranslationModal}
        onDismiss={handleOpenTranslationModal}
      />
    </>
  );
};

export default InitialBiblePicker;
