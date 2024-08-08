import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonText,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { chevronBack, chevronForward } from "ionicons/icons";
import { useHistory } from "react-router";

/* Components */
import Skeleton from "../Loading/Skeleton";
import BreadCrumbsModal from "../BreadCrumbsModal/BreadCrumbsModal";
import BibleTranslationModal from "../BibleNavModal/BibleTranslationModal";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleChapterViewer.scss";
import "swiper/css";
import "swiper/css/effect-cards";

/* Images */
import PatternImage from "../../assets/images/Patterns - 4x4.png";
import BreadCrumbsIcon from "../../assets/icons/BreadCrumbs-icon.svg";

/* Query Hooks */
import {
  useLazyGetAudioMedia,
  useLazyGetListOfVersesFromBookChapter,
  useLazyGetMediaTimestamps,
} from "../../hooks/BibleBrainHooks";
import { useLazySetUserHistory } from "../../hooks/BibleHooks";
import useSetBibleHistory from "../utility/hooks/useSetBibleHistory";

/* Utils */
import { displayBibleAbbr, getHighestBitrateAudio } from "../../utils/support";

/* Types */
import { BbVerse, VerseArgs } from "../../__generated__/graphql";
import { IChosenChapterVerses } from "../../interfaces/BibleInterfaces";

/**
 * Function to render loading skeleton animation
 * @augments -
 * @returns JSX.Element[]
 */
const renderSkeleton = () => {
  const items = [];
  for (let i = 0; i < 24; i++) {
    items.push(
      <React.Fragment key={i}>
        <IonCol size="12" key={i}>
          <Skeleton height="20px" width="100%" shape="square" />
        </IonCol>
      </React.Fragment>
    );
  }

  return items;
};

const BibleChapterViewer: React.FC = () => {
  /* Context */
  const {
    chosenChapterNumber,
    chosenChapterVerses,
    chosenBook,
    chosenBible,
    chosenBibleCopyright,
    chosenBibleBooks,
    currentMediaTimeStamp,
    selectedVerseList,
    setChapterVerses,
    setChapterNumber,
    setBook,
    setChapterMedia,
    setCurrentMediaTimestamp,
    addVerseToList,
    removeVerseFromList,
    resetVersesInList,
  } = useAppContext();

  /* State */
  const [selectedElement, setSelectedElement] = useState<Array<string>>([]);
  const [openSelectedVersesModal, setOpenSelectedVersesModal] =
    useState<boolean>(false);
  const [openSelectedTranslationModal, setOpenSelectedTranslationModal] =
    useState<boolean>(false);
  const [initialModalBreakpoint, setInitialModalBreakpoint] =
    useState<number>(0.25);

  /* API/GraphQL */
  // to get chapter verses
  // Instance to get the current chapter
  const {
    getListOfVersesFromBookChapter,
    data: versesData,
    loading,
  } = useLazyGetListOfVersesFromBookChapter();
  // Instance to get the previous chapter
  const {
    getListOfVersesFromBookChapter: getPreviousChapter,
    data: previousVersesData,
    loading: previousChapterLoading,
  } = useLazyGetListOfVersesFromBookChapter();
  // Instance to get the next chapter
  const {
    getListOfVersesFromBookChapter: getNextChapter,
    data: nextVersesData,
    loading: nextChapterLoading,
  } = useLazyGetListOfVersesFromBookChapter();

  const { setUserHistory } = useLazySetUserHistory();
  useSetBibleHistory();
  const { getAudioMedia, data: audioMediaData } = useLazyGetAudioMedia();
  const { getMediaTimestamps, data: mediaTimestamps } =
    useLazyGetMediaTimestamps();

  /* Router */
  const history = useHistory();

  /* Side Effects */

  // useEffect to get verses when book or chapther changes
  useEffect(() => {
    // get the testament
    const testament = chosenBook?.testament;
    // get the filesets
    const filesets = chosenBible?.filesets["dbp-prod"];
    if (!filesets) return;

    // get the bible id for the text
    const textBibleId = filesets.find((fileset: any) => {
      return (
        fileset.size === "C" ||
        (fileset.type === "text_plain" && fileset.size === testament)
      );
    }).id;

    /**
     * Getting the chapter verse
     * ?Note that graphql caches responses so if we call the same verse it will never touch the api,
     * ?it will return the cached response.
     */
    getListOfVersesFromBookChapter({
      variables: {
        options: {
          bibleId: textBibleId,
          bookId: chosenBook?.bookId!,
          chapterNumber: chosenChapterNumber!,
        },
      },
    });
    // get the previous chapter's data
    getPreviousChapter({
      variables: {
        options: {
          bibleId: textBibleId,
          bookId: chosenBook?.bookId!,
          chapterNumber: chosenChapterNumber! - 1,
        },
      },
    });
    // get the next chapter's data
    getNextChapter({
      variables: {
        options: {
          bibleId: textBibleId,
          bookId: chosenBook?.bookId!,
          chapterNumber: chosenChapterNumber! + 1,
        },
      },
    });

    // set the user history
    setUserHistory({
      variables: {
        options: {
          bibleAbbr: chosenBible.abbr!,
          bookId: chosenBook?.bookId!,
          chapterNumber: chosenChapterNumber!,
          language: chosenBible.languageId!,
        },
      },
    });

    // Get the file set
    const audioFileSet = getHighestBitrateAudio(
      chosenBible?.filesets["dbp-prod"].filter(
        (fileset: any) => fileset.size === "C" || fileset.size === testament
      )
    );

    // check if any audio media filesets are not found
    if (!audioFileSet) {
      // reset the media and timestamp context
      setCurrentMediaTimestamp(0);
      setChapterMedia([]);
      return;
    }

    const mediaOptions = {
      filesetId: audioFileSet.id,
      bookId: chosenBook?.bookId!,
      chapterNumber: chosenChapterNumber!,
    };

    // Getting new media
    getAudioMedia({
      variables: {
        options: mediaOptions,
      },
    });

    // Getting new media timestamps
    getMediaTimestamps({
      variables: {
        options: mediaOptions,
      },
    });
  }, [chosenChapterNumber, chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect to set verses when verses are present
  useEffect(() => {
    if (loading || !versesData) return;
    console.log("current", versesData);
    console.log("before", previousVersesData);
    console.log("next", nextVersesData);

    const dto: IChosenChapterVerses = {
      current: versesData.getListOfVerseFromBookChapter.data,
      previous: [],
      next: [],
    };

    setChapterVerses(dto);
  }, [versesData]); // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    if (!audioMediaData) return;
    setChapterMedia(audioMediaData.getAudioMedia.data);
  }, [audioMediaData]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function will be used to reset anything that is chapter specific
   * @returns N/A
   */
  const handleReset = () => {
    // reset the selected elements
    setSelectedElement([]);
    resetVersesInList();

    // reset the media and timestamp context
    setCurrentMediaTimestamp(0);
    setChapterMedia([]);
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
    const verseNumber = span?.innerText.split(":")[0];

    // if no text exit function
    if (!verseNumber) return;

    const verseObj = chosenChapterVerses?.current![Number(verseNumber) - 1];

    if (!verseObj) return;
    setInitialModalBreakpoint(0.25);

    // check if the state is empty
    if (selectedElement.length === 0) {
      addVerseToList(verseObj);
      setSelectedElement([verseNumber]);
      setOpenSelectedVersesModal(true);
      return;
    }

    var tempValue = [...selectedElement];
    // check if the value selected is in the list
    if (selectedElement.includes(verseNumber)) {
      const valueIndex = selectedElement.indexOf(verseNumber);
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

    tempValue.push(verseNumber);

    setSelectedElement(tempValue);
    setOpenSelectedVersesModal(true);

    addVerseToList(verseObj!);
    return;
  };

  const handleOpenVerseModal = () => {
    if (!openSelectedVersesModal) resetVersesInList();

    setOpenSelectedVersesModal(!openSelectedVersesModal);
    setInitialModalBreakpoint(0.75);
  };

  const handleOpenTranslationModal = () =>
    setOpenSelectedTranslationModal(!openSelectedTranslationModal);

  /**
   * Determines the class name for a verse based on the current media timestamp.
   */
  const getVerseClass = (verse: BbVerse) => {
    if (
      currentMediaTimeStamp &&
      mediaTimestamps?.getMediaTimestamps?.data.length
    ) {
      const timestamps = mediaTimestamps.getMediaTimestamps.data;
      const firstTimestamp = Number(timestamps[0].timestamp);
      const verseStart = verse.verseStart!;
      const lastIndex = timestamps.length - 1;

      const startTimestampIndex =
        firstTimestamp > 0 || verseStart === timestamps.length
          ? verseStart - 1
          : verseStart;
      const endTimestampIndex =
        firstTimestamp > 0
          ? verseStart
          : verseStart < lastIndex
          ? verseStart + 1
          : lastIndex;

      const startTimestamp = Number(timestamps[startTimestampIndex].timestamp);
      const endTimestamp =
        (firstTimestamp > 0 && verseStart <= lastIndex) ||
        (firstTimestamp === 0 && verseStart < lastIndex)
          ? Number(timestamps[endTimestampIndex].timestamp)
          : Infinity; // Use Infinity to handle the last verse properly

      const isCurrentlyPlayingVerse =
        currentMediaTimeStamp >= startTimestamp &&
        currentMediaTimeStamp < endTimestamp;

      const element = document.getElementsByClassName(
        "currently-playing-verse"
      );

      element[0]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return isCurrentlyPlayingVerse ? "currently-playing-verse" : "";
    }
    return "";
  };

  return (
    <div id="chapter-viewer-container">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="bibleSwiper ion-padding"
      >
        <SwiperSlide>
          <div id="chapter-viewer">
            <div className="text-viewer">
              {chosenChapterVerses?.current ? (
                <>
                  <strong className="chapter-number">
                    {chosenChapterNumber}
                  </strong>
                  {loading ? (
                    renderSkeleton()
                  ) : (
                    <>
                      {chosenChapterVerses.current.map((verse) => (
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
                          className={`${
                            selectedVerseList.some(
                              (sv) => sv.verseStart === verse.verseStart
                            )
                              ? "verse-selected"
                              : ""
                          } 
                    ${getVerseClass(verse)}
                    `}
                        >
                          <b>{verse.verseStart}:</b> {verse.verseText}
                        </span>
                      ))}
                    </>
                  )}
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
                    {chosenBible?.abbr
                      ? displayBibleAbbr(chosenBible?.abbr)
                      : "Pick bible"}
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
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>

      <div className="copyright">
        {chosenBibleCopyright?.copyright?.copyright}
        {chosenBibleCopyright?.copyright?.organizations![0].logos?.length ? (
          <IonImg
            src={
              chosenBibleCopyright?.copyright?.organizations![0].logos![0].url!
            }
            alt={chosenBible?.abbr + "copyright"}
            className="copyright-image"
          />
        ) : null}
      </div>

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
