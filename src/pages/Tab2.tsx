import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";

/* Context */
import { useAppContext } from "../context/context";

/** Hooks */
import { generateBiblePageSEO } from "../hooks/useSEO";

/* Components */
import SEOHead from "../components/SEO/SEOHead";
import BibleNavModal from "../components/BibleNavModal/BibleNavModal";
import BibleTranslationModal from "../components/BibleNavModal/BibleTranslationModal";
import BibleChapterViewer from "../components/BibleViewer/BibleChapterViewer";
import Player from "../components/Player/Player";

/* Services */
import { hapticService } from "../services/hapticService";

/* Styles */
import "./Tab2.scss";

/* Graphics */
import { caretDownOutline } from "ionicons/icons";

/* Utils */
import { displayBibleAbbr } from "../utils/support";

const Tab2: React.FC = () => {
  // Context
  const { chosenBible, chosenBook, chosenChapterMedia, chosenChapterNumber, chosenChapterVerses } =
    useAppContext();

  // Get URL parameters for SEO
  const params = useParams<{
    currentLanguage?: string;
    currentBibleId?: string;
    currentBookId?: string;
    currentChapterNumber?: string;
  }>();

  /* States */
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openBibleNavModal, setOpenBibleNavModal] = useState<boolean>(false);

  // Use the first verse of the current chapter as the SEO preview text
  const firstVerseText = chosenChapterVerses?.current?.[0]?.verseText ?? undefined;

  // Generate SEO configuration
  const seoConfig = generateBiblePageSEO({
    book: chosenBook?.name || params.currentBookId,
    chapter:
      chosenChapterNumber || parseInt(params.currentChapterNumber || "0"),
    translation: chosenBible?.abbr || params.currentBibleId,
    languageId: params.currentLanguage
      ? parseInt(params.currentLanguage)
      : undefined,
    verseText: firstVerseText,
  });

  const openBibleNav = () => {
    void hapticService.triggerNavigationHaptic();
    setOpenBibleNavModal(true);
  };

  const openTranslationPicker = () => {
    void hapticService.triggerNavigationHaptic();
    setOpenModal(true);
  };

  return (
    <IonPage style={{ overflow: "clip" }} className="tab2-page">
      <SEOHead {...seoConfig} />

      <IonHeader className="ion-no-border tab2-header">
        <IonToolbar>
          {chosenBible ? (
            <>
              <IonButton
                fill="clear"
                color="dark"
                className="header-nav-pill"
                onClick={openBibleNav}
                id="open-bible-nav-modal"
                disabled={!chosenBible}
              >
                {chosenBook ? (
                  <span className="nav-pill-inner">
                    <span className="nav-pill-text">
                      {chosenBook.name}
                      {chosenChapterNumber ? (
                        <span className="nav-pill-chapter">
                          {" "}
                          {chosenChapterNumber}
                        </span>
                      ) : null}
                    </span>
                    <IonIcon
                      icon={caretDownOutline}
                      className="nav-pill-chevron"
                    />
                  </span>
                ) : null}
              </IonButton>

              <IonButtons slot="end" className="header-end-buttons">
                <IonButton
                  shape="round"
                  fill="clear"
                  color="dark"
                  onClick={openTranslationPicker}
                  id="open-modal"
                  className="translation-chip"
                >
                  {chosenBible
                    ? displayBibleAbbr(chosenBible.abbr!)
                    : "Pick bible"}
                </IonButton>

                {chosenChapterMedia?.length ? (
                  <Player type="button" src={chosenChapterMedia![0].path!} />
                ) : null}
              </IonButtons>
            </>
          ) : null}
        </IonToolbar>
      </IonHeader>

      {/* fullscreen: verses scroll under translucent chrome */}
      <IonContent fullscreen className="tab2-content">
        <div className="tab2-atmosphere" aria-hidden="true" />
        <BibleChapterViewer />

        <BibleTranslationModal
          isOpen={openModal}
          onDismiss={() => setOpenModal(false)}
        />

        <BibleNavModal
          isOpen={openBibleNavModal}
          onDismiss={() => setOpenBibleNavModal(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
