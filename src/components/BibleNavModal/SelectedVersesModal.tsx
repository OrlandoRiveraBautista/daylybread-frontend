import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonModal,
  IonGrid,
  IonCol,
  IonRow,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonButton,
} from "@ionic/react";

/** Components */
import { BooksPicker, ChapterPicker } from "./BibleNavStages";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleNavModal.scss";

type bibleNavOptions = "book" | "chapter" | "verse";

const BibleNavModal: React.FC = () => {
  // state
  const [navTab, setNavTab] = useState<bibleNavOptions>("book");

  // context values
  const { chosenChapter, chosenBook } = useAppContext();

  return (
    <IonModal
      trigger="open-selected-verses-modal"
      initialBreakpoint={0.5}
      breakpoints={[0, 1]}
      className="nav-modal"
    >
      <IonContent className="ion-padding nav-container"></IonContent>
    </IonModal>
  );
};

export default BibleNavModal;
