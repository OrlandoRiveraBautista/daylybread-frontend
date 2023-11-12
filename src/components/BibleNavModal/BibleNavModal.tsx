import React, { useState } from "react";
import {
  IonContent,
  IonModal,
  IonGrid,
  IonCol,
  IonRow,
  IonTitle,
  IonCard,
  IonText,
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

  // bible navigation butons
  const renderNavButtons = () => {
    const stages = {
      book: chosenBook?.bookName.slice(0, 3),
      chapter: chosenChapter?.chapterNumber,
      verse: "verse",
    };

    const render = Object.keys(stages).map((stage) => (
      <IonCol>
        <IonCard
          button
          onClick={() => setNavTab(stage as bibleNavOptions)}
          className={navTab === stage ? "selected" : ""}
        >
          <IonTitle className="chosen-bible-option">
            {stages[stage as bibleNavOptions]}
          </IonTitle>
          <IonText>{stage}</IonText>
        </IonCard>
      </IonCol>
    ));
    return render;
  };

  return (
    <IonModal
      trigger="open-bible-nav-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      className="nav-modal"
    >
      <IonContent className="ion-padding nav-container">
        {/* Navigation Toolbar */}
        <IonGrid className="nav-toolbar">
          <IonRow>{renderNavButtons()}</IonRow>
        </IonGrid>
        {/* Options */}
        <IonGrid className="nav-selection-container">
          {navTab === "book" ? (
            <BooksPicker />
          ) : navTab === "chapter" ? (
            <ChapterPicker />
          ) : (
            <div>verse</div>
          )}
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default BibleNavModal;
