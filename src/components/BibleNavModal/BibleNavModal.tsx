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
import "./BibleNavModal.css";

type bibleNavOptions = "book" | "chapter" | "verse";

const BibleNavModal: React.FC = () => {
  // state
  const [navTab, setNavTab] = useState<bibleNavOptions>("book");

  // context values
  const { chosenChapter, chosenBook } = useAppContext();

  return (
    <IonModal
      trigger="open-bible-nav-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      className="nav-modal"
    >
      <IonContent className="ion-padding nav-container">
        <div className="nav-selection-container">
          <IonGrid>
            {/* Navigation Toolbar */}
            <IonRow className="nav-toolbar">
              <IonCol>
                <IonCard button onClick={() => setNavTab("book")}>
                  <IonTitle className="chosen-bible-option">
                    {chosenBook?.bookName.slice(0, 3)}
                  </IonTitle>
                  <p>Book</p>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard button onClick={() => setNavTab("chapter")}>
                  <IonTitle className="chosen-bible-option">
                    {chosenChapter?.chapterNumber}
                  </IonTitle>
                  <p>Chapter</p>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard button onClick={() => setNavTab("verse")}>
                  <IonTitle className="chosen-bible-option">3</IonTitle>
                  <p>Verse</p>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Options */}
            {navTab === "book" ? (
              <BooksPicker />
            ) : navTab === "chapter" ? (
              <ChapterPicker />
            ) : (
              <div>verse</div>
            )}
          </IonGrid>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default BibleNavModal;
