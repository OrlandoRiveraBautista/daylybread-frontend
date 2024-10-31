import React from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const StorybookPage: React.FC = () => {
  return (
    <div>
      <>
        <Swiper
          // onInit={(s: SwiperType) => {
          //   setSwiper(s);
          // }}
          // onSwiper={(s: SwiperType) => {
          //   setIsProgrammaticSlide({ value: false });
          //   if (!chosenChapterVerses?.previous) return;
          //   const index = localChapters.findIndex(
          //     (chap) =>
          //       chap[0].chapter === chosenChapterVerses?.current[0].chapter
          //   );
          //   // set the flag that the slides will change programmaticly
          //   s.slideTo(index, 0); // set the slide index
          // }}
          // grabCursor={true}
          modules={[EffectCards]}
          className="bibleSwiper ion-padding"
          autoHeight={true}

          // autoHeight={true}
          // longSwipes={true}
          // onSlideNextTransitionStart={() => {
          //   if (isProgrammaticSlide.value) return;
          //   nextChapter();
          // }}
          // onSlidePrevTransitionStart={() => {
          //   if (isProgrammaticSlide.value) return;

          //   backChapter();
          // }}
          // slidesPerView={1}
          // spaceBetween={30}
        >
          {/* {localChapters.map((value, key) =>
              value ? (
                <SwiperSlide key={key}>
                  <div id="chapter-viewer">
                    
                  </div>
                </SwiperSlide>
              ) : null
            )} */}
          <SwiperSlide>
            <div> We are here</div>
          </SwiperSlide>
          <SwiperSlide>
            <div> We are here 2</div>
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default StorybookPage;
