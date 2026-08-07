import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonModal,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";

/** Components */
import { BooksPicker, ChapterPicker } from "./BibleNavStages";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleNavModal.scss";

type bibleNavOptions = "book" | "chapter";
// | "verse";

interface IBibleNavModal {
  isOpen?: boolean;
  onDismiss?: () => void;
}

const BibleNavModal: React.FC<IBibleNavModal> = ({ isOpen, onDismiss }) => {
  // state
  const [navTab, setNavTab] = useState<bibleNavOptions>("book");

  // context values
  const { chosenChapterNumber, chosenBook } = useAppContext();

  // bible navigation buttons
  const renderNavButtons = () => {
    const stages: Record<bibleNavOptions, { label: string; value: string | number | undefined }> = {
      book: { label: "Book", value: chosenBook?.name ?? undefined },
      chapter: { label: "Chapter", value: chosenChapterNumber },
    };

    return Object.entries(stages).map(([stage, { label, value }]) => (
      <IonCol key={stage}>
        <button
          className={`nav-stage-pill ${navTab === stage ? "nav-stage-pill--active" : ""}`}
          onClick={() => setNavTab(stage as bibleNavOptions)}
        >
          <span className="nav-stage-pill-value">{value ?? "—"}</span>
          <span className="nav-stage-pill-label">{label}</span>
        </button>
      </IonCol>
    ));
  };

  return (
    <IonModal
      trigger="open-bible-nav-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      className="nav-modal"
      isOpen={isOpen}
      onDidDismiss={onDismiss}
    >
      <IonHeader className="nav-modal-header ion-no-border">
        <IonGrid className="nav-toolbar">
          <IonRow>{renderNavButtons()}</IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent className="ion-padding nav-container">
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
