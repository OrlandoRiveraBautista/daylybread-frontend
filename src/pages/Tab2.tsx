import { useEffect, useState } from "react";
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
import { useGetBooksById, useGetChapterById } from "../hooks/BibleHooks";

/* Components */
import BibleNavModal from "../components/BibleNavModal/BibleNavModal";
import BibleTranslationModal from "../components/BibleNavModal/BibleTranslationModal";
import BibleChapterViewer from "../components/BibleViewer/BibleChapterViewer";

/* Styles */
import "./Tab2.css";

/* Graphics */
import { caretDownOutline } from "ionicons/icons";

const Tab2: React.FC = () => {
  // Context
  const { chosenTranslation, chosenBook, setBook, setChapter } =
    useAppContext();

  /* States */
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openBibleNavModal, setOpenBibleNavModal] = useState<boolean>(false);

  // getting chapters
  const { data: chapterData } = useGetChapterById(chosenBook?.bibleId + "001");
  const { data: bookData } = useGetBooksById(
    chosenTranslation?.books[0].bibleId!
  );

  useEffect(() => {
    if (!chosenTranslation || !bookData) return;

    setBook(bookData?.getBookById);
  }, [bookData]);

  useEffect(() => {
    if (!chosenBook || !chapterData) return;

    setChapter(chapterData.getChapter);
  }, [chosenBook, chapterData]);

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        {/* Toolbar */}
        <IonToolbar>
          {/* Header Title Button */}
          <IonButton
            expand="full"
            fill="clear"
            color="dark"
            className="header-button"
            onClick={() => setOpenBibleNavModal(!openBibleNavModal)}
            id="open-bible-nav-modal"
            disabled={chosenTranslation ? false : true}
          >
            {chosenBook ? chosenBook.bookName : "Pick a translation"}
            <IonIcon icon={caretDownOutline}></IonIcon>
          </IonButton>

          {/* Header secondary buttons */}
          <IonButtons slot="end">
            <IonButton
              shape="round"
              fill="outline"
              color="dark"
              size="large"
              onClick={() => setOpenModal(!openModal)}
              id="open-modal"
              className="header-button-translation"
            >
              {chosenTranslation
                ? chosenTranslation.abbreviation
                : "Pick translation"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Body */}
      <IonContent fullscreen className="ion-padding">
        <BibleChapterViewer />

        {/* Modals */}
        {/* translation selection */}
        <BibleTranslationModal />

        {/* bible navigation */}
        <BibleNavModal />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
