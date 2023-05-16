import React, { useEffect, useState } from "react";
import { IonFab, IonFabButton, IonIcon, IonImg, IonText } from "@ionic/react";
import {
  chevronBack,
  chevronForward,
  ellipsisHorizontalOutline,
} from "ionicons/icons";

/* Context */
import { useAppContext } from "../../context/context";
import BreadCrumbsModal from "../BibleNavModal/BreadCrumbsModal";

/* Styles */
import "./BibleChapterViewer.scss";

/* Images */
import PatternImage from "../../assets/images/Patterns - 4x4.png";

/* Query Hooks */
import { useGetChapterById, useGetBooksById } from "../../hooks/BibleHooks";

/* Utils */
import { zeroPad } from "../../utils/support";

const BibleChapterViewer: React.FC = () => {
  /* Context */
  const { chosenChapter, setChapter, chosenBook, setBook } = useAppContext();

  /* State */
  const [chapterId, setChapterId] = useState(chosenChapter?.bibleId);
  const [bookId, setBookId] = useState<string>();
  const [navAction, setNavAction] = useState<
    "previous chapter" | "next chapter" | undefined
  >(undefined);
  const [selectedElement, setSelectedElement] = useState<Array<string>>([]);
  const [openSelectedVersesModal, setOpenSelectedVersesModal] =
    useState<boolean>(false);

  // getting chapters
  const { data: chapterData } = useGetChapterById(chapterId!);
  const { data: bookData } = useGetBooksById(bookId!);

  useEffect(() => {
    // check if chapter data is empty
    if (!chapterData) return;

    const chapter = chapterData.getChapter;
    // check if the chapter is the same as the in the context
    if (chosenChapter?.bibleId === chapter.bibleId) return;

    // !-------- check that this doesnt call the api too often

    // set new chapter to the context
    setChapter(chapter);
  }, [chapterData]);

  useEffect(() => {
    if (!chosenChapter) return;

    if (chosenChapter.bibleId.slice(0, -3) !== bookId) {
      setBookId(chosenChapter.bibleId.slice(0, -3));
    }
  }, [chosenChapter]);

  // useEffect to set a new book to the context state
  useEffect(() => {
    if (!bookData?.getBookById) return;
    setBook(bookData.getBookById);
  }, [bookData]);

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
  };

  // useEffect to call the handleNavAction function whenever a book changes
  useEffect(() => {
    handleNavAction();
    handleReset();
  }, [chosenBook]);

  // function to handle going to the next chapter
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

  // function to handle going to the previous chapter
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

    // check if the state is empty
    if (selectedElement.length === 0) {
      setSelectedElement([text]);
      span.classList.add("verse-selected");
      return;
    }

    // check if the value selected is in the list
    if (selectedElement.includes(text)) {
      const valueIndex = selectedElement.indexOf(text);
      if (valueIndex > -1) {
        selectedElement.splice(valueIndex, 1);
        setSelectedElement(selectedElement);
        span.classList.remove("verse-selected");
      }

      return;
    }

    var tempValue = [...selectedElement];
    tempValue.push(text);

    setSelectedElement(tempValue);
    span.classList.add("verse-selected");
  };

  const handleOpenModal = () =>
    setOpenSelectedVersesModal(!openSelectedVersesModal);

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
          </div>
        )}
      </div>
      {chosenChapter ? (
        <IonFab>
          {/* Back button */}
          <IonFabButton size="small" className="right">
            <IonIcon
              icon={chevronBack}
              onClick={() => backChapter(chosenChapter.bibleId)}
            />
          </IonFabButton>

          {/* Button to open the bible assistant modal */}
          <IonFabButton size="small" onClick={handleOpenModal}>
            <IonIcon icon={ellipsisHorizontalOutline} />
          </IonFabButton>

          {/* Forward button */}
          <IonFabButton size="small" className="right">
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
        onDismiss={handleOpenModal}
        selectedText={selectedElement}
      />
    </div>
  );
};

export default BibleChapterViewer;
