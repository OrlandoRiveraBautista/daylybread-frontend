import React, { useState } from "react";

/* Components */
import { IonButton, IonImg, IonText } from "@ionic/react";
import BibleTranslationModal from "../BibleNavModal/BibleTranslationModal";

/* Images */
import PatternImage from "../../assets/images/Patterns - 4x4.png";

/* Context */
import { useAppContext } from "../../context/context";

/* Utils */
import { displayBibleAbbr } from "../../utils/support";

/* Styles */
import "./InitialBiblePicker.scss";

const InitialBiblePicker: React.FC = () => {
  const { chosenBible } = useAppContext();

  const [openSelectedTranslationModal, setOpenSelectedTranslationModal] =
    useState<boolean>(false);

  const handleOpenTranslationModal = () =>
    setOpenSelectedTranslationModal(!openSelectedTranslationModal);

  return (
    <>
      <div className="helper-container">
        <IonImg
          src={PatternImage}
          alt="Pattern image"
          className="helper-image"
        />
        <IonText>Please pick a bible to begin</IonText>
        <IonButton
          shape="round"
          fill="clear"
          color="dark"
          size="large"
          onClick={handleOpenTranslationModal}
          className="translation-button"
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
