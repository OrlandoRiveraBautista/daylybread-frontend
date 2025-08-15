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

/* Styles */
import "./Tab2.scss";

/* Graphics */
import { caretDownOutline } from "ionicons/icons";

/* Utils */
import { displayBibleAbbr } from "../utils/support";

const Tab2: React.FC = () => {
  // Context
  const { chosenBible, chosenBook, chosenChapterMedia, chosenChapterNumber } =
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

  // Generate SEO configuration
  const seoConfig = generateBiblePageSEO({
    book: chosenBook?.name || params.currentBookId,
    chapter:
      chosenChapterNumber || parseInt(params.currentChapterNumber || "0"),
    translation: chosenBible?.abbr || params.currentBibleId,
    language: params.currentLanguage || "en",
  });

  return (
    <IonPage style={{ overflow: "clip" }}>
      {/* Enhanced SEO Head */}
      <SEOHead {...seoConfig} />
      {/* Header */}
      <IonHeader className="ion-no-border padding-left-right">
        {/* Toolbar */}
        <IonToolbar>
          {/* Header Title Button */}
          {chosenBible ? (
            <>
              <IonButton
                expand="full"
                fill="clear"
                color="dark"
                className="header-button"
                onClick={() => setOpenBibleNavModal(!openBibleNavModal)}
                id="open-bible-nav-modal"
                disabled={chosenBible ? false : true}
              >
                {chosenBook ? (
                  <>
                    {chosenBook.name}{" "}
                    <IonIcon icon={caretDownOutline}></IonIcon>
                  </>
                ) : null}
              </IonButton>
              {/* Header secondary buttons */}
              <IonButtons slot="end">
                <IonButton
                  shape="round"
                  fill="clear"
                  color="dark"
                  size="large"
                  onClick={() => setOpenModal(!openModal)}
                  id="open-modal"
                  className="translation-button"
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

      {/* Body */}
      <IonContent>
        <BibleChapterViewer />

        {/* Modals */}
        {/* translation selection */}
        <BibleTranslationModal
          isOpen={openModal}
          onDismiss={() => setOpenModal(!openModal)}
        />

        {/* bible navigation */}
        <BibleNavModal
          isOpen={openBibleNavModal}
          onDismiss={() => setOpenBibleNavModal(!openBibleNavModal)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
