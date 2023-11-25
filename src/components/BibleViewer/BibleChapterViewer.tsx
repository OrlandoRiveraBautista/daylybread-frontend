import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonText,
} from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import { useHistory, useParams } from "react-router";

/* Context */
import { useAppContext } from "../../context/context";
import BreadCrumbsModal from "../BreadCrumbsModal/BreadCrumbsModal";

/* Styles */
import "./BibleChapterViewer.scss";

/* Images */
import PatternImage from "../../assets/images/Patterns - 4x4.png";
import BreadCrumbsIcon from "../../assets/icons/BreadCrumbs-icon.svg";

/* Query Hooks */
import {
  useGetChapterById,
  useGetBooksById,
  useLazyGetTranslation,
} from "../../hooks/BibleHooks";

/* Utils */
import { zeroPad } from "../../utils/support";
import BibleTranslationModal from "../BibleNavModal/BibleTranslationModal";

/* Types */
type BibleChapterViewerUrlParams = {
  currentBibleId: string;
};

const BibleChapterViewer: React.FC = () => {
  /* Context */
  const {
    chosenChapter,
    chosenBook,
    chosenTranslation,
    selectedVerseList,
    setChapter,
    setBook,
    setTranslation,
    addVerseToList,
    removeVerseFromList,
    resetVersesInList,
  } = useAppContext();

  /* State */
  const [chapterId, setChapterId] = useState(chosenChapter?.bibleId);
  const [bookId, setBookId] = useState<string>();
  const [navAction, setNavAction] = useState<
    "previous chapter" | "next chapter" | undefined
  >(undefined);
  const [selectedElement, setSelectedElement] = useState<Array<string>>([]);
  const [openSelectedVersesModal, setOpenSelectedVersesModal] =
    useState<boolean>(false);
  const [openSelectedTranslationModal, setOpenSelectedTranslationModal] =
    useState<boolean>(false);
  const [initialModalBreakpoint, setInitialModalBreakpoint] =
    useState<number>(0.25);

  /* API/GraphQL */
  // calls the api to get chapterData by id upon local state value chapterId change
  const { data: chapterData } = useGetChapterById(chapterId!);
  // calls the api to get bookData by id upon local state value bookId change
  const { data: bookData } = useGetBooksById(bookId!);
  // lazy api call for getting all translation
  const { getAllTranslations, data: translationData } = useLazyGetTranslation();

  /* Router */
  const history = useHistory();
  const { currentBibleId } = useParams<BibleChapterViewerUrlParams>();

  /* Side Effects */
  // checks the urls param [currentBibleId] to set the current bible id in local state
  useEffect(() => {
    if (!currentBibleId) return;
    if (chapterId === currentBibleId) return;

    setChapterId(currentBibleId);
  }, [currentBibleId]); // eslint-disable-line react-hooks/exhaustive-deps

  // checks the chapter api call response [chapterData] to set the chapter data into the global state
  useEffect(() => {
    // check if chapter data is empty
    if (!chapterData) return;

    const chapter = chapterData.getChapter;
    // check if the chapter is the same as the in the context
    if (chosenChapter?.bibleId === chapter.bibleId) return;

    // set new chapter to the context
    setChapter(chapter);

    // check if the chapter's bible's id is not the same as the current chosenBook and set current chapter's book's id
    if (chapter.bibleId.slice(0, -3) !== chosenBook?.bibleId) {
      setBookId(chapter.bibleId.slice(0, -3));
    }

    // check if the translation is set
    if (!chosenTranslation) {
      if (!translationData) {
        getAllTranslations();
        return;
      }
      let currentTranslation = translationData.getTranslations.find(
        (translation) =>
          translation.abbreviation === chapter.translation.abbreviation
      );
      setTranslation(currentTranslation!);
    }
  }, [chapterData]); // eslint-disable-line react-hooks/exhaustive-deps

  // checks for change in the global state for [chosenChapter] and pushes the route with param
  useEffect(() => {
    if (!chosenChapter) return;

    // push route to include chapter id
    history.push(`/read/${chosenChapter.bibleId}`);
  }, [chosenChapter]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect to set a new book to the context state
  useEffect(() => {
    if (!bookData?.getBookById) return;
    setBook(bookData.getBookById);
  }, [bookData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const chapterViewerWrapper = document.getElementById("chapter-viewer");

    if (chapterViewerWrapper?.style) {
      if (!openSelectedVersesModal) {
        chapterViewerWrapper.style.gap = "0px";
      } else {
        chapterViewerWrapper.style.gap = "106px";
      }
    }
  }, [openSelectedVersesModal]);

  /**
   *  function will check navAction to do something
   *  "previous chapter" will cause the function to set the final chapter in a book. This is useful when a user wants to navigate back one chapter from the begging of another
   * @returns nothing
   */
  const handleNavAction = () => {
    if (!navAction) return;
    switch (navAction) {
      case "previous chapter":
        let bookChapterCount = chosenBook?.chapters.length;
        const currentBibleId = chosenChapter?.bibleId!;

        // get bible id number as string
        const currentBookAndChapterNumber = currentBibleId.substring(
          currentBibleId.length - 5
        );
        // reset the chapter to the first
        const resetChapterNumber =
          currentBookAndChapterNumber.slice(0, 2) +
          zeroPad(bookChapterCount, 3);

        const newBookAndChapterNumber = parseInt(resetChapterNumber, 10) - 1000;
        let newChapter =
          currentBibleId.slice(0, -newBookAndChapterNumber.toString().length) +
          newBookAndChapterNumber.toString();

        setNavAction(undefined); // reset nav action
        setChapterId(newChapter);

        // exit function
        return;
    }
  };

  /**
   * Function will be used to reset anything that is chapter specific
   * @returns N/A
   */
  const handleReset = () => {
    // reset the selected elements
    setSelectedElement([]);
    resetVersesInList();
  };

  // useEffect to call the handleNavAction function whenever a book changes
  useEffect(() => {
    if (!chosenBook) return;
    handleNavAction();
    handleReset();
  }, [chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function to handle navigating to the next chapter in the bible
   */
  const nextChapter = (currentBibleId: string) => {
    const bookChapters = chosenBook?.chapters;

    // get current chapter number as a number
    const currentChapterNumber = parseInt(
      currentBibleId.substring(currentBibleId.length - 3),
      10
    );

    // check to see if this is the last chapter in the book
    if (currentChapterNumber === bookChapters?.length) {
      // get bible id number as string
      const currentBookAndChapterNumber = currentBibleId.substring(
        currentBibleId.length - 5
      );
      // reset the chapter to the first
      const resetChapterNumber =
        currentBookAndChapterNumber.slice(0, 2) + "001";
      const newBookAndChapterNumber = parseInt(resetChapterNumber, 10) + 1000;

      let newChapter =
        currentBibleId.slice(0, -newBookAndChapterNumber.toString().length) +
        newBookAndChapterNumber.toString();

      setChapterId(newChapter);
      handleReset();

      // exit function
      return;
    }

    // incriment by one.
    let nextChapterNumber = currentChapterNumber + 1;

    let newChapter =
      currentBibleId.slice(0, -nextChapterNumber.toString().length) +
      nextChapterNumber.toString();

    setChapterId(newChapter);
    handleReset();

    return;
  };

  /**
   * Function to handle navigating to the previous chapter in the bible
   */
  const backChapter = (currentBibleId: string) => {
    // get current chapter number as a number
    const currentChapterNumber = parseInt(
      currentBibleId.substring(currentBibleId.length - 3),
      10
    );

    // check to see if this is the first chapter in the book
    // ? user needs to go back a chapter if possible
    if (currentChapterNumber === 1) {
      // get bible id number as string
      const currentBookAndChapterNumber = currentBibleId.substring(
        currentBibleId.length - 5
      );
      // get book id
      const parsedBookId = currentBookAndChapterNumber.slice(0, 2); //! this has to be set to the last chapter in the book

      // go back one chapter
      const newBookAndChapterNumber = parseInt(parsedBookId, 10) - 1;

      // parse new bookId
      let newBookId =
        currentBibleId.slice(
          0,
          currentBookAndChapterNumber[0] !== "0"
            ? -currentBookAndChapterNumber.length
            : -currentBookAndChapterNumber.length + 1
        ) + newBookAndChapterNumber.toString();

      setNavAction("previous chapter");
      setBookId(newBookId);
      handleReset();

      // exit function
      return;
    }

    // decriment by one.
    let nextChapterNumber = zeroPad(currentChapterNumber - 1, 3);

    let newChapter =
      currentBibleId.slice(0, -nextChapterNumber.toString().length) +
      nextChapterNumber.toString();

    setChapterId(newChapter);
    handleReset();

    return;
  };

  const handleMouseDown = (event: string) => {
    // get the desired html element
    const span = document.getElementById(event);
    // get the verse numbers
    const text = span?.innerText.split(":")[0];

    // if no text exit function
    if (!text) return;

    const verseObj = chosenChapter?.verses[Number(text) - 1];

    if (!verseObj) return;
    setInitialModalBreakpoint(0.25);

    // check if the state is empty
    if (selectedElement.length === 0) {
      addVerseToList(verseObj);
      setSelectedElement([text]);
      setOpenSelectedVersesModal(true);
      return;
    }

    var tempValue = [...selectedElement];
    // check if the value selected is in the list
    if (selectedElement.includes(text)) {
      const valueIndex = selectedElement.indexOf(text);
      if (valueIndex > -1) {
        tempValue.splice(valueIndex, 1);
        removeVerseFromList(verseObj);
        setSelectedElement(tempValue);
      }
      if (tempValue.length === 0) {
        setOpenSelectedVersesModal(false);
      }

      return;
    }

    tempValue.push(text);

    setSelectedElement(tempValue);
    setOpenSelectedVersesModal(true);

    addVerseToList(verseObj!);
    return;
  };

  const handleOpenVerseModal = () => {
    if (!openSelectedVersesModal === false) {
      resetVersesInList();
    }

    setOpenSelectedVersesModal(!openSelectedVersesModal);
    setInitialModalBreakpoint(0.75);
  };

  const handleOpenTranslationModal = () =>
    setOpenSelectedTranslationModal(!openSelectedTranslationModal);

  return (
    <div id="chapter-viewer">
      <div className="text-viewer">
        {chosenChapter ? (
          <>
            <strong className="chapter-number">
              {chosenChapter?.chapterNumber}
            </strong>
            {chosenChapter.verses.map((verse) => (
              <span
                onClick={() => handleMouseDown(verse.bibleId)}
                id={verse.bibleId}
                key={verse.bibleId}
                className={
                  selectedVerseList.some((sv) => sv.bibleId === verse.bibleId)
                    ? "verse-selected"
                    : ""
                }
              >
                <b>{verse.verse}:</b> {verse.text}
              </span>
            ))}
          </>
        ) : (
          <div className="helper-container">
            <IonImg
              src={PatternImage}
              alt="Pattern image"
              className="helper-image"
            />
            <IonText>Please pick a translation to begin</IonText>
            <IonButton
              shape="round"
              fill="outline"
              color="primary"
              size="large"
              onClick={handleOpenTranslationModal}
              className="translation-button"
            >
              {chosenTranslation?.abbreviation ?? "Pick translation"}
            </IonButton>
          </div>
        )}
      </div>
      {chosenChapter ? (
        <IonFab>
          {/* Back button */}
          <IonFabButton color="light" size="small" className="right">
            <IonIcon
              icon={chevronBack}
              onClick={() => backChapter(chosenChapter.bibleId)}
            />
          </IonFabButton>

          {/* Button to open the bible assistant modal */}
          <IonFabButton
            color="light"
            size="small"
            onClick={handleOpenVerseModal}
          >
            <IonIcon
              class="bread-crumbs-icon"
              color="light"
              icon={BreadCrumbsIcon}
            />
          </IonFabButton>

          {/* Forward button */}
          <IonFabButton color="light" size="small" className="right">
            <IonIcon
              icon={chevronForward}
              onClick={() => nextChapter(chosenChapter.bibleId)}
            />
          </IonFabButton>
        </IonFab>
      ) : null}

      {/* bible assistant modal */}
      <BreadCrumbsModal
        isOpen={openSelectedVersesModal}
        onDismiss={handleOpenVerseModal}
        selectedText={selectedElement}
        initialBreakpoint={initialModalBreakpoint}
      />
      <BibleTranslationModal
        isOpen={openSelectedTranslationModal}
        onDismiss={handleOpenTranslationModal}
      />
    </div>
  );
};

export default BibleChapterViewer;
