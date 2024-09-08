import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { useHistory } from "react-router";

/* Components */
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import BreadCrumbsModal from "../BreadCrumbsModal/BreadCrumbsModal";
import BibleTranslationModal from "../BibleNavModal/BibleTranslationModal";
import InitialBiblePicker from "../InitialBiblePicker/InitialBiblePicker";
import Copyright from "./Copyright/Copyright";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleChapterViewer.scss";
import "swiper/css";
import "swiper/css/effect-cards";

/* Query Hooks */
import { useLazyGetListOfVersesFromBookChapter } from "../../hooks/BibleBrainHooks";
import { useLazySetUserHistory } from "../../hooks/BibleHooks";

/* React Hooks */
import useSetBibleHistory from "../utility/hooks/useSetBibleHistory";
import useBibleNavigator from "../utility/hooks/useBibleNavigator";

/* Types */
import { BbVerse } from "../../__generated__/graphql";
import { IChosenChapterVerses } from "../../interfaces/BibleInterfaces";
import { Swiper as SwiperType } from "swiper/types";
import TextViewer from "./TextViewer/TextViewer";

interface IIsProgrammaticSlide {
  value: boolean;
  callback?: () => void;
}

const BibleChapterViewer: React.FC = () => {
  /* Context */
  const {
    chosenChapterNumber,
    chosenChapterVerses,
    chosenBook,
    chosenBible,
    chosenBibleBooks,
    setChapterVerses,
    handleResetChapterData,
  } = useAppContext();

  /* State */
  const [swiper, setSwiper] = useState<SwiperType>();
  const [localChapters, setLocalChapters] = useState<BbVerse[][] | undefined>();
  const [isProgrammaticSlide, setIsProgrammaticSlide] =
    useState<IIsProgrammaticSlide>({
      value: true,
    }); // flag to track programmatic slide changes

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

  // Hooks
  useSetBibleHistory();
  const { nextChapter, backChapter } = useBibleNavigator();

  /* Router */
  const history = useHistory();

  /* Side Effects */
  useEffect(() => {
    if (
      !isProgrammaticSlide.value ||
      isProgrammaticSlide.callback === undefined
    )
      return;
    isProgrammaticSlide.callback();
    setIsProgrammaticSlide({ value: false });
  }, [isProgrammaticSlide]);

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

    // get index of current book in the bible
    const indexOfBookInBible = chosenBibleBooks?.indexOf(chosenBook!);

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

    // check if the book is at the end
    if (chosenChapterNumber === chosenBook?.chapters?.length) {
      // check if the book is not the final book of the bible
      if (indexOfBookInBible !== chosenBibleBooks?.length) {
        // get the next chapter's data
        getNextChapter({
          variables: {
            options: {
              bibleId: textBibleId,
              bookId: chosenBibleBooks![indexOfBookInBible! + 1]?.bookId!,
              chapterNumber: 1,
            },
          },
        });
      }
    } else {
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
    }

    // check if the book is at the beginng
    if (chosenChapterNumber === 1) {
      // check if the book is the first book (it cannot go back)
      if (indexOfBookInBible !== 0) {
        // get the previous chapter's data
        getPreviousChapter({
          variables: {
            options: {
              bibleId: textBibleId,
              bookId: chosenBibleBooks![indexOfBookInBible! - 1]?.bookId!,
              chapterNumber:
                chosenBibleBooks![indexOfBookInBible! - 1].chapters?.length!,
            },
          },
        });
      }
    } else {
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
    }

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
  }, [chosenChapterNumber, chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect to set verses when verses are present
  useEffect(() => {
    // function should fail early if any of the data is loading or if the current verse data is empty
    if (loading || !versesData || previousChapterLoading || nextChapterLoading)
      return;

    // create obj for the state
    const dto: IChosenChapterVerses = {
      previous: previousVersesData?.getListOfVerseFromBookChapter.data,
      current: versesData.getListOfVerseFromBookChapter.data,
      next: nextVersesData?.getListOfVerseFromBookChapter.data,
    };

    // set data to state
    setChapterVerses(dto);

    // set the rendered chapter
    setLocalChapters((prevVal) => {
      if (!prevVal) return Object.values(dto);

      // Add previous to the beginning if it doesn't exist
      if (
        dto.previous &&
        !prevVal.some((chapter) => chapter === dto.previous)
      ) {
        prevVal = [dto.previous, ...prevVal];
        setIsProgrammaticSlide({
          value: true,
          callback: () => swiper?.slideTo(1, 0),
        });
      }

      // Add current chapter if it doesn't exist (normally should already exist as middle, so this is more of a safeguard)
      if (dto.current && !prevVal.some((chapter) => chapter === dto.current)) {
        prevVal = [...prevVal, dto.current];
      }

      // Add next to the end if it doesn't exist
      if (dto.next && !prevVal.some((chapter) => chapter === dto.next)) {
        prevVal = [...prevVal, dto.next];
      }

      return prevVal;
    });
  }, [versesData, previousVersesData, nextVersesData]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // useEffect to call the handleNavAction function whenever a book changes
  useEffect(() => {
    if (!chosenBook) return;
    handleResetChapterData();
    // setLocalChapters([]);
    console.log("We should delete the: ", localChapters);
  }, [chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="chapter-viewer-container">
      {localChapters && localChapters.length ? (
        <>
          <Swiper
            init={true}
            onInit={(s: SwiperType) => {
              setSwiper(s);
            }}
            onSwiper={(s: SwiperType) => {
              setIsProgrammaticSlide({ value: false });
              if (!chosenChapterVerses?.previous) return;
              // set the flag that the slides will change programmaticly
              s.slideTo(1, 0); // set the slide index
            }}
            grabCursor={true}
            modules={[EffectCards]}
            className="bibleSwiper ion-padding"
            autoHeight={true}
            longSwipes={true}
            onSlideNextTransitionStart={() => {
              if (isProgrammaticSlide.value) return;
              nextChapter();
            }}
            onSlidePrevTransitionStart={() => {
              if (isProgrammaticSlide.value) return;

              backChapter();
            }}
            slidesPerView={1}
            spaceBetween={30}
          >
            {localChapters.map((value, key) =>
              value ? (
                <SwiperSlide key={key}>
                  <div id="chapter-viewer">
                    <TextViewer verses={value} isLoading={loading} />

                    <NavigationButtons />
                  </div>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>

          <Copyright />
        </>
      ) : (
        <InitialBiblePicker />
      )}

      {/* bible assistant modal */}
      {/* <BreadCrumbsModal
        isOpen={openSelectedVersesModal}
        onDismiss={handleOpenVerseModal}
        selectedText={selectedElement}
        initialBreakpoint={initialModalBreakpoint}
      /> */}
    </div>
  );
};

export default BibleChapterViewer;
