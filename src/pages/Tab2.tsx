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
import "./Tab2.scss";

/* Graphics */
import { caretDownOutline } from "ionicons/icons";

const Tab2: React.FC = () => {
  // Context
  const { chosenTranslation, chosenBook, setBook, setChapter } =
    useAppContext();

  /* States */
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openBibleNavModal, setOpenBibleNavModal] = useState<boolean>(false);
  const [bookId, setBookId] = useState<string>();

  /* API Hooks */
  // getting chapters
  const { data: chapterData } = useGetChapterById(chosenBook?.bibleId + "001");
  // getting a book
  const { data: bookData } = useGetBooksById(bookId!);

  /**
   * Use Effect for handling changes in translation
   */
  useEffect(() => {
    // check if there is already a chosen chapter
    setBookId(chosenTranslation?.books[0].bibleId!);
  }, [chosenTranslation]);

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
      <IonHeader className="ion-no-border">
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
            {chosenBook ? (
              <>
                {chosenBook.bookName}{" "}
                <IonIcon icon={caretDownOutline}></IonIcon>
              </>
            ) : null}
          </IonButton>

          {/* Header secondary buttons */}
          <IonButtons slot="end">
            <IonButton
              shape="round"
              fill="outline"
              color="primary"
              size="large"
              onClick={() => setOpenModal(!openModal)}
              id="open-modal"
              className="translation-button"
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
        <BibleTranslationModal
          isOpen={openModal}
          onDismiss={() => setOpenModal(!openModal)}
        />

        {/* bible navigation */}
        <BibleNavModal />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
