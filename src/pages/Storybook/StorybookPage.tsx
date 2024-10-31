import React, { useEffect, useState } from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./StorybookPage.scss";
import { IonCard, IonCardContent } from "@ionic/react";
import { useAppContext } from "../../context/context";
import { BbVerse } from "../../__generated__/graphql";
import useBibleNavigator from "../../components/utility/hooks/useBibleNavigator";

/* Types */
import { Swiper as SwiperType } from "swiper/types";
import Skeleton from "../../components/Loading/Skeleton";
import TextViewer from "../../components/BibleViewer/TextViewer/TextViewer";
import { useLazyGenerateImage } from "../../hooks/AI/MediaAIHooks";

const StorybookPage: React.FC = () => {
  /* Context */
  const { chosenChapterVerses, localChapters } = useAppContext();

  /* Hooks */
  const { nextChapter, backChapter } = useBibleNavigator();
  const { getGenerateImage, data, loading } = useLazyGenerateImage();

  /* State */
  const [swiper, setSwiper] = useState<SwiperType>();
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
    if (!chosenChapterVerses?.current.length) return;

    const currentChapter = localChapters.find(
      (chap) =>
        chap?.length &&
        chap[0].chapter === chosenChapterVerses.current[0].chapter &&
        chap[0].bookId === chosenChapterVerses.current[0].bookId
    );

    if (!currentChapter?.length) return;

    const arrayOfBatch = batchArray(currentChapter);
    setBatchedVerses(arrayOfBatch);
    if (chosenChapterVerses.previous?.length) {
      if (!swiper) return;
      swiper?.slideTo(1);

      getGenerateImage({
        variables: {
          prompt: currentChapter.slice(0, 3).toLocaleString(),
        },
      });
    }
  }, [chosenChapterVerses]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderSlides = () => {
    let renderedSlides = [];
    if (!batchedVerses?.length) return;

    const previousChaptersVerses = chosenChapterVerses?.previous?.length
      ? chosenChapterVerses?.previous?.slice(-3)
      : [];
    const nextChaptersVerses = chosenChapterVerses?.next?.length
      ? chosenChapterVerses?.next?.slice(0, 3)
      : [];

    if (previousChaptersVerses?.length) {
      renderedSlides.push(
        <SwiperSlide key={-1}>
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png"
            />
            <IonCardContent>
              <TextViewer
                verses={previousChaptersVerses}
                isLoading={false}
                // ref={TextViewerRef}
              />
            </IonCardContent>
          </IonCard>
        </SwiperSlide>
      );
    }

    batchedVerses.map((versesInBatch, index) => {
      renderedSlides.push(
        <SwiperSlide key={index}>
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src={data?.generateImage.generatedImage?.at(0)}
            />
            <IonCardContent>
              <TextViewer
                verses={versesInBatch}
                isLoading={false}
                // ref={TextViewerRef}
              />
            </IonCardContent>
          </IonCard>
        </SwiperSlide>
      );
    });

    if (nextChaptersVerses?.length) {
      renderedSlides.push(
        <SwiperSlide key={renderedSlides.length + 1}>
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png"
            />
            <IonCardContent>
              <TextViewer
                verses={nextChaptersVerses}
                isLoading={false}
                // ref={TextViewerRef}
              />
            </IonCardContent>
          </IonCard>
        </SwiperSlide>
      );
    }

    return renderedSlides;
  };

  return (
    <div id="storybook-container">
      {chosenChapterVerses?.current.length ? (
        <Swiper
          modules={[EffectCards]}
          className="bibleSwiper ion-padding"
          direction="vertical"
          effect="slide"
          autoHeight={true}
          slidesPerView={1}
          spaceBetween={30}
          onSwiper={(e: SwiperType) => {
            if (chosenChapterVerses.previous?.length) {
              e?.slideTo(1);

              getGenerateImage({
                variables: {
                  prompt: chosenChapterVerses?.current
                    ?.slice(0, 3)
                    .toLocaleString(),
                },
              });
            }
            setSwiper(e);
          }}
          onSlideNextTransitionStart={(e: SwiperType) => {
            if (!e.slides.length) return;
            if (!e.isEnd) return;

            nextChapter();
          }}
          onSlidePrevTransitionStart={(e: SwiperType) => {
            if (!e.slides.length) return;

            if (!e.isBeginning) return;

            backChapter();
          }}
          onSlideChange={(e: SwiperType) => {
            if (!e.slides.length) return;
            const { innerText } = e.slides.at(e.realIndex)!;
            getGenerateImage({
              variables: {
                prompt: innerText,
              },
            });
          }}
        >
          {batchedVerses?.length ? renderSlides() : null}
        </Swiper>
      ) : (
        <div className="ion-padding">
          <Skeleton height="100%" width="100%" shape="square" />
        </div>
      )}
    </div>
  );
};

export default StorybookPage;
