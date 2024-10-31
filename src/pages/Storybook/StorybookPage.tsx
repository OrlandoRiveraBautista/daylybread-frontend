import React, { useEffect, useState } from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./StorybookPage.scss";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useAppContext } from "../../context/context";
import { BbVerse } from "../../__generated__/graphql";
import useBibleNavigator from "../../components/utility/hooks/useBibleNavigator";

const StorybookPage: React.FC = () => {
  /* Context */
  const {
    chosenChapterVerses,
    chosenBook,
    handleResetChapterData,
    localChapters,
    isProgrammaticSlide,
    setIsProgrammaticSlide,
  } = useAppContext();

  /* Hooks */
  const { nextChapter, backChapter } = useBibleNavigator();

  const [batchedVerses, setBatchedVerses] = useState<BbVerse[][]>();

  function batchArray(arr: BbVerse[], size = 3) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  useEffect(() => {
    if (!localChapters?.length) return;
    if (!chosenChapterVerses?.current) return;

    const currentChapter = localChapters.find(
      (chap) => chap[0].chapter === chosenChapterVerses.current[0].chapter
    );

    if (!currentChapter?.length) return;

    const arrayOfBatch = batchArray(currentChapter);
    setBatchedVerses(arrayOfBatch);
  }, [chosenChapterVerses]);

  const renderSlides = () => {
    let renderedSlides = [];
    if (!batchedVerses?.length) return;

    const previousChaptersVerses = chosenChapterVerses?.previous?.slice(-3);
    const nextChaptersVerses = chosenChapterVerses?.next?.slice(0, 3);

    if (previousChaptersVerses?.length) {
      renderedSlides.push(
        <SwiperSlide key={-1}>
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png"
            />

            <IonCardHeader>
              <IonCardTitle>
                Verse:
                {`${previousChaptersVerses[0].verseStart} -
                ${
                  previousChaptersVerses[previousChaptersVerses?.length - 1]
                    .verseStart
                }`}
              </IonCardTitle>
              <IonCardSubtitle>
                Chapter: {previousChaptersVerses[0].chapter}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
          </IonCard>
        </SwiperSlide>
      );
    }

    console.log(nextChaptersVerses);

    batchedVerses.map((versesInBatch, index) => {
      renderedSlides.push(
        <SwiperSlide key={index}>
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png"
            />

            <IonCardHeader>
              <IonCardTitle>
                Verse:
                {`${versesInBatch[0].verseStart} -
                ${versesInBatch[versesInBatch?.length - 1].verseStart}`}
              </IonCardTitle>
              <IonCardSubtitle>
                Chapter: {versesInBatch[0].chapter}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
          </IonCard>
        </SwiperSlide>
      );
    });

    if (nextChaptersVerses?.length) {
      renderedSlides.push(
        <SwiperSlide key={-1}>
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png"
            />

            <IonCardHeader>
              <IonCardTitle>
                Verse:
                {`${nextChaptersVerses[0].verseStart} -
                ${
                  nextChaptersVerses[nextChaptersVerses?.length - 1].verseStart
                }`}
              </IonCardTitle>
              <IonCardSubtitle>
                Chapter: {nextChaptersVerses[0].chapter}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
          </IonCard>
        </SwiperSlide>
      );
    }

    return renderedSlides;
  };

  return (
    <div id="storybook-container">
      <Swiper
        modules={[EffectCards]}
        className="bibleSwiper ion-padding"
        direction="vertical"
        effect="slide"
        autoHeight={true}
        slidesPerView={1}
        spaceBetween={30}
        // onSwiper={(s: ) => {
        //   console.log(s);
        // }}
        // onSlideNextTransitionStart={() => {
        //   if (isProgrammaticSlide.value) return;
        //   nextChapter();
        // }}
        // onSlidePrevTransitionStart={() => {
        //   if (isProgrammaticSlide.value) return;

        //   backChapter();
        // }}
      >
        {batchedVerses?.length ? renderSlides() : null}
      </Swiper>
    </div>
  );
};

export default StorybookPage;
