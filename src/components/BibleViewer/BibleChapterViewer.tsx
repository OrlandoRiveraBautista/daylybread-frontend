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
import { useLazyGetListOfVersesFromBookChapter } from "../../hooks/BibleBrainHooks";

/* Utils */
import BibleTranslationModal from "../BibleNavModal/BibleTranslationModal";
import { BibleReadParams } from "../../assets/ts/types";

const BibleChapterViewer: React.FC = () => {
  /* Context */
  const {
    chosenChapterNumber,
    chosenChapterVerses,
    chosenBook,
    chosenBible,
    chosenBibleBooks,
    setChapterVerses,
    setChapterNumber,
    setBook,
    selectedVerseList,
    addVerseToList,
    removeVerseFromList,
    resetVersesInList,
  } = useAppContext();

  /* State */
  const [urlParams, setUrlParams] = useState<BibleReadParams>();
  const [selectedElement, setSelectedElement] = useState<Array<string>>([]);
  const [openSelectedVersesModal, setOpenSelectedVersesModal] =
    useState<boolean>(false);
  const [openSelectedTranslationModal, setOpenSelectedTranslationModal] =
    useState<boolean>(false);
  const [initialModalBreakpoint, setInitialModalBreakpoint] =
    useState<number>(0.25);

  /* API/GraphQL */
  const {
    getListOfVersesFromBookChapter,
    data: versesData,
    loading,
  } = useLazyGetListOfVersesFromBookChapter();

  /* Router */
  const history = useHistory();
  const params = useParams<BibleReadParams>();

  /* Side Effects */
  // watches for url params
  useEffect(() => {
    if (Object.keys(params).length > 0) {
      setUrlParams(params);
    }
  }, [params]);

  useEffect(() => {
    const testament = chosenBook?.testament;
    const filesets = chosenBible?.filesets["dbp-prod"];
    if (!filesets) return;

    const textBibleId = filesets.find((fileset: any) => {
      return (
        fileset.size === "C" ||
        (fileset.type === "text_plain" && fileset.size === testament)
      );
    }).id;

    getListOfVersesFromBookChapter({
      variables: {
        options: {
          bibleId: textBibleId,
          bookId: chosenBook?.bookId!,
          chapterNumber: chosenChapterNumber!,
        },
      },
    });
  }, [chosenChapterNumber, chosenBook]);

  useEffect(() => {
    if (loading || !versesData) return;

    setChapterVerses(versesData.getListOfVerseFromBookChapter.data);
  }, [versesData]);

  // checks for change in the global state for bible changes and pushes the route with param
  useEffect(() => {
    if (!chosenBook || !chosenChapterNumber) return;

    /*--- Setting Url --- */
    // Get the current URL
    const currentUrl = history.location.pathname;

    // Split the current URL into parts
    const parts = currentUrl.split("/");

    // Check if the position exists
    if (!parts[5]) {
      history.push(
        `${currentUrl}/${chosenBook?.bookId}/${chosenChapterNumber}`
      );
      return;
    }

    // Replace the value at the third position with the new Bible ID
    parts[4] = chosenBook?.bookId!;
    parts[5] = chosenChapterNumber?.toString()!;

    // Join the parts back together to form the new URL
    const newUrl = parts.join("/");
    history.push(newUrl);
  }, [chosenChapterNumber, chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const chapterViewerWrapper = document.getElementById("chapter-viewer");

    if (chapterViewerWrapper?.style) {
      if (!openSelectedVersesModal) {
        chapterViewerWrapper.style.gap = "0px";
      } else {
        chapterViewerWrapper.style.gap = "120px";
      }
    }
  }, [openSelectedVersesModal]);

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
    handleReset();
  }, [chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function to handle navigating to the next chapter in the bible
   */
  const nextChapter = () => {
    if (!chosenChapterNumber) return;
    const bookChapters = chosenBook?.chapters!;

    // check if the book is at the end of the chapter
    if (bookChapters?.length <= chosenChapterNumber) {
      // get index of current book in the bible
      const indexOfBookInBible = chosenBibleBooks?.indexOf(chosenBook!);

      // set the next book
      setBook(chosenBibleBooks![indexOfBookInBible! + 1]);
      // and reset the chapter to 1
      setChapterNumber(1);
      handleReset();
      return; // exit function
    }

    setChapterNumber(chosenChapterNumber + 1);
    handleReset();
    return;
  };

  /**
   * Function to handle navigating to the previous chapter in the bible
   */
  const backChapter = () => {
    if (!chosenChapterNumber) return;
    const bookChapters = chosenBook?.chapters!;

    // check if the book is at the beginng
    if (chosenChapterNumber === 1) {
      // get index of current book in the bible
      const indexOfBookInBible = chosenBibleBooks?.indexOf(chosenBook!);

      // check if the book is the first book (it cannot go back)
      if (indexOfBookInBible === 0) return;

      // set the next book
      setBook(chosenBibleBooks![indexOfBookInBible! - 1]);
      // and reset the chapter to 1
      setChapterNumber(
        chosenBibleBooks![indexOfBookInBible! - 1].chapters?.length!
      );
      handleReset();
      return; // exit function
    }

    setChapterNumber(chosenChapterNumber - 1);
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

    const verseObj = chosenChapterVerses![Number(text) - 1];

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
        {chosenChapterVerses ? (
          <>
            <strong className="chapter-number">{chosenChapterNumber}</strong>
            {chosenChapterVerses.map((verse) => (
              <span
                onClick={() =>
                  handleMouseDown(
                    chosenBible?.abbr! +
                      chosenBook?.bookId! +
                      chosenChapterNumber +
                      verse.verseStart?.toString()
                  )
                }
                id={
                  chosenBible?.abbr! +
                  chosenBook?.bookId! +
                  chosenChapterNumber +
                  verse.verseStart?.toString()
                }
                key={verse.verseStart?.toString()}
                className={
                  selectedVerseList.some(
                    (sv) => sv.verseStart === verse.verseStart
                  )
                    ? "verse-selected"
                    : ""
                }
              >
                <b>{verse.verseStart}:</b> {verse.verseText}
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
            <IonText>Please pick a bible to begin</IonText>
            <IonButton
              shape="round"
              fill="clear"
              color="dark"
              size="large"
              onClick={handleOpenTranslationModal}
              className="translation-button"
            >
              {chosenBible?.abbr ?? "Pick bible"}
            </IonButton>
          </div>
        )}
      </div>
      {chosenChapterVerses ? (
        <IonFab>
          {/* Back button */}
          <IonFabButton color="light" size="small" className="right">
            <IonIcon icon={chevronBack} onClick={() => backChapter()} />
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
            <IonIcon icon={chevronForward} onClick={nextChapter} />
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
