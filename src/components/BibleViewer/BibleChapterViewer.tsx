import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

/* Components */
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import Copyright from "./Copyright/Copyright";
import TextViewer, { TextViewerRefType } from "./TextViewer/TextViewer";
import Skeleton from "../Loading/Skeleton";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleChapterViewer.scss";
import "swiper/css";
import "swiper/css/effect-cards";

/* React Hooks */
import useBibleNavigator from "../utility/hooks/useBibleNavigator";
import useBible from "../utility/hooks/useBible";

/* Types */
import { Swiper as SwiperType } from "swiper/types";

const BibleChapterViewer: React.FC = () => {
  /* Context */
  const {
    chosenChapterVerses,
    chosenBook,
    handleResetChapterData,
    localChapters,
    isProgrammaticSlide,
    setIsProgrammaticSlide,
  } = useAppContext();

  /* State */
  const [swiper, setSwiper] = useState<SwiperType>();

  /* Refs */
  const TextViewerRef = useRef<TextViewerRefType>(null);

  // Hooks
  const { nextChapter, backChapter } = useBibleNavigator();
  const { currentVersesLoading } = useBible();

  /* Side Effects */
  useEffect(() => {
    if (
      !isProgrammaticSlide.value ||
      isProgrammaticSlide.callback === undefined
    )
      return;
    isProgrammaticSlide.callback();
    setIsProgrammaticSlide({ value: false });
  }, [isProgrammaticSlide]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect to call the handleNavAction function whenever a book changes
  useEffect(() => {
    if (!chosenBook) return;
    handleResetChapterData();
  }, [chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!localChapters || !localChapters.length) return;
    if (localChapters[1][0].chapter !== chosenChapterVerses?.current[0].chapter)
      return;

    setIsProgrammaticSlide({
      value: true,
      callback: () => swiper?.slideTo(1, 0),
    });
  }, [localChapters]); // eslint-disable-line react-hooks/exhaustive-deps

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
              const index = localChapters.findIndex(
                (chap) =>
                  chap[0].chapter === chosenChapterVerses?.current[0].chapter &&
                  chap[0].bookId === chosenChapterVerses.current[0].bookId
              );
              // set the flag that the slides will change programmaticly
              s.slideTo(index, 0); // set the slide index
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
                      ref={TextViewerRef}
                    />

                    <NavigationButtons
                      swiper={swiper!}
                      handleOpenBreadCrumbsModal={
                        TextViewerRef.current?.handleOpenVerseModal!
                      }
                    />
                  </div>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>

          <Copyright />
        </>
      ) : (
        <div className="ion-padding">
          <Skeleton height="400px" width="100%" shape="square" />
        </div>
      )}
    </div>
  );
};

export default BibleChapterViewer;
