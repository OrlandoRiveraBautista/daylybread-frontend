import React, { useEffect, useState } from "react";
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

/* Services */
import { hapticService } from "../../services/hapticService";

/* Styles */
import "./BibleNavModal.scss";

type bibleNavOptions = "book" | "chapter";

interface IBibleNavModal {
  isOpen?: boolean;
  onDismiss?: () => void;
}

const BibleNavModal: React.FC<IBibleNavModal> = ({ isOpen, onDismiss }) => {
  const [navTab, setNavTab] = useState<bibleNavOptions>("book");
  const { chosenChapterNumber, chosenBook } = useAppContext();

  // Open to the most useful stage; keep spatial memory while the sheet is up
  useEffect(() => {
    if (!isOpen) return;
    setNavTab(chosenBook ? "chapter" : "book");
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStageChange = (stage: bibleNavOptions) => {
    if (stage === navTab) return;
    void hapticService.triggerNavigationHaptic();
    setNavTab(stage);
  };

  const handleBookSelected = () => {
    void hapticService.triggerSuccessHaptic();
    setNavTab("chapter");
  };

  const handleChapterSelected = () => {
    void hapticService.triggerSuccessHaptic();
    onDismiss?.();
  };

  const renderNavButtons = () => {
    const stages: Record<
      bibleNavOptions,
      { label: string; value: string | number | undefined }
    > = {
      book: { label: "Book", value: chosenBook?.name ?? undefined },
      chapter: { label: "Chapter", value: chosenChapterNumber },
    };

    return Object.entries(stages).map(([stage, { label, value }]) => (
      <IonCol key={stage}>
        <button
          type="button"
          className={`nav-stage-pill ${
            navTab === stage ? "nav-stage-pill--active" : ""
          }`}
          onClick={() => handleStageChange(stage as bibleNavOptions)}
          aria-pressed={navTab === stage}
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
      handle={true}
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
            <BooksPicker onBookSelected={handleBookSelected} />
          ) : (
            <ChapterPicker onChapterSelected={handleChapterSelected} />
          )}
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default BibleNavModal;
