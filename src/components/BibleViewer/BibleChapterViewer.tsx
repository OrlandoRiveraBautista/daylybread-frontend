import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

/* Components */
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import InitialBiblePicker from "../InitialBiblePicker/InitialBiblePicker";
import Copyright from "./Copyright/Copyright";
import TextViewer, { TextViewerRefType } from "./TextViewer/TextViewer";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleChapterViewer.scss";
import "swiper/css";
import "swiper/css/effect-cards";

/* React Hooks */
import useBibleHistory from "../utility/hooks/useBibleHistory";
import useBibleNavigator from "../utility/hooks/useBibleNavigator";
import useBible from "../utility/hooks/useBible";

/* Hooks */
import { useHaptic } from "../../hooks/useHaptic";

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
  useBibleHistory();
  const { nextChapter, backChapter } = useBibleNavigator();
  const { currentVersesLoading } = useBible();
  const { triggerSlideHaptic } = useHaptic();

  /**
   * Scrolls the IonContent to the top of the page
   * Called after sliding to a new chapter
   */
  const scrollToTop = () => {
    const ionContent = document.querySelector("ion-content");
    if (ionContent) {
      (ionContent as HTMLIonContentElement).scrollToTop(100);
    }
  };

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
                  chap &&
                  chap[0].chapter === chosenChapterVerses?.current[0].chapter
              );

              // set the flag that the slides will change programmaticly
              s.slideTo(index, 0); // set the slide index
            }}
            grabCursor={true}
            modules={[EffectCards]}
            className="bibleSwiper ion-padding"
            autoHeight={true}
            longSwipes={false}
            onSlideNextTransitionStart={() => {
              if (isProgrammaticSlide.value) return;
              // Trigger haptic feedback for slide change
              triggerSlideHaptic();
              nextChapter();
            }}
            onSlidePrevTransitionStart={() => {
              if (isProgrammaticSlide.value) return;
              // Trigger haptic feedback for slide change
              triggerSlideHaptic();
              backChapter();
            }}
            onSlideChangeTransitionEnd={() => {
              // Scroll to top of the page after sliding to a new chapter
              if (!isProgrammaticSlide.value) {
                scrollToTop();
              }
            }}
            slidesPerView={1}
            spaceBetween={30}
          >
            {localChapters.map((value, key) =>
              value ? (
                <SwiperSlide key={key} className="tour-step-6">
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
        <InitialBiblePicker />
      )}
    </div>
  );
};

export default BibleChapterViewer;
