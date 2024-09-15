import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

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
import { Swiper as SwiperType } from "swiper/types";
import TextViewer from "./TextViewer/TextViewer";
import useBible from "../utility/hooks/useBible";

interface IIsProgrammaticSlide {
  value: boolean;
  callback?: () => void;
}

const BibleChapterViewer: React.FC = () => {
  /* Context */
  const { chosenChapterVerses, chosenBook, handleResetChapterData } =
    useAppContext();

  /* State */
  const [swiper, setSwiper] = useState<SwiperType>();
  const [isProgrammaticSlide, setIsProgrammaticSlide] =
    useState<IIsProgrammaticSlide>({
      value: true,
    }); // flag to track programmatic slide changes

  // Hooks
  useBibleHistory();
  const { nextChapter, backChapter } = useBibleNavigator();
  const { currentVersesLoading, localChapters } = useBible();

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

  // useEffect to call the handleNavAction function whenever a book changes
  useEffect(() => {
    if (!chosenBook) return;
    handleResetChapterData();
  }, [chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log(localChapters);
    if (!localChapters) return;
    if (localChapters[1][0].chapter !== chosenChapterVerses?.current[0].chapter)
      return;

    setIsProgrammaticSlide({
      value: true,
      callback: () => swiper?.slideTo(1, 0),
    });
  }, [localChapters]);

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
