import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { useHistory } from "react-router";

/* Components */
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import InitialBiblePicker from "../InitialBiblePicker/InitialBiblePicker";
import Copyright from "./Copyright/Copyright";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleChapterViewer.scss";
import "swiper/css";
import "swiper/css/effect-cards";

/* React Hooks */
import useBibleHistory from "../utility/hooks/useBibleHistory";
import useBibleNavigator from "../utility/hooks/useBibleNavigator";

/* Types */
import { BbVerse } from "../../__generated__/graphql";
import { IChosenChapterVerses } from "../../interfaces/BibleInterfaces";
import { Swiper as SwiperType } from "swiper/types";
import TextViewer from "./TextViewer/TextViewer";
import useBible from "../utility/hooks/useBible";

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

  // Hooks
  useBibleHistory();
  const { nextChapter, backChapter } = useBibleNavigator();
  const {
    currentVersesData,
    currentVersesLoading,
    previousVersesData,
    previousVersesLoading,
    nextVersesData,
    nextVersesLoading,
  } = useBible();

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

  // useEffect to set verses when verses are present
  useEffect(() => {
    // function should fail early if any of the data is loading or if the current verse data is empty
    if (
      currentVersesLoading ||
      !currentVersesData ||
      previousVersesLoading ||
      nextVersesLoading
    )
      return;

    // create obj for the state
    const dto: IChosenChapterVerses = {
      previous: previousVersesData?.getListOfVerseFromBookChapter.data,
      current: currentVersesData.getListOfVerseFromBookChapter.data,
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
  }, [currentVersesData, previousVersesData, nextVersesData]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <TextViewer
                      verses={value}
                      isLoading={currentVersesLoading}
                    />

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
    </div>
  );
};

export default BibleChapterViewer;
