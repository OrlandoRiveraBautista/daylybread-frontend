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
    if (!batchedVerses?.length) return;

    return batchedVerses.map((versesInBatch, index) => {
      return (
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
      >
        {batchedVerses?.length ? renderSlides() : null}
      </Swiper>
    </div>
  );
};

export default StorybookPage;
