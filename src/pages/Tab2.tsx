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

/* Context */
import { useAppContext } from "../context/context";

/** Hooks */

/* Components */
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
  const { chosenBible, chosenBook, chosenChapterMedia } = useAppContext();

  /* States */
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openBibleNavModal, setOpenBibleNavModal] = useState<boolean>(false);

  return (
    <IonPage style={{ overflow: "clip" }}>
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
