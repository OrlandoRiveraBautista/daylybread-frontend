import React from "react";
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

const StorybookPage: React.FC = () => {
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
        <SwiperSlide>
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png"
            />

            <IonCardHeader>
              <IonCardTitle>Verse: 1-3</IonCardTitle>
              <IonCardSubtitle>Chapter: 1</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>kjfaskldjflaksdj</IonCardContent>
          </IonCard>
        </SwiperSlide>
        <SwiperSlide>
          <IonCard>
            <IonCardHeader>Hello</IonCardHeader>
          </IonCard>
        </SwiperSlide>
        <SwiperSlide>
          <IonCard>
            <IonCardHeader>Hello</IonCardHeader>
          </IonCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default StorybookPage;
