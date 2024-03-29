import React, { useState } from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperEvent } from "swiper/types";

/* Components */
import {
  IonSegmentCustomEvent,
  SegmentChangeEventDetail,
} from "@ionic/core/dist/types/components";
import BookmarkAssetList from "./BookmarkAssetList";

/* Styles */
import "./UserAssetsViewer.scss";

const UserAssetsViewer: React.FC = () => {
  const [segmentState, setSegmentState] = useState<string>("bookmarks");
  const [swiper, setSwiper] = useState<SwiperEvent>();

  const slideOpts = {
    initalSlide: 0,
    speed: 300,
  };

  const options = ["posts", "bookmarks"];

  const onSegmentChange = (
    e: IonSegmentCustomEvent<SegmentChangeEventDetail>
  ) => {
    swiper?.slideTo(options.indexOf(e.detail.value!));
  };

  const onSlideChange = (e: SwiperEvent) => {
    setSegmentState(options[e.activeIndex]);
  };

  return (
    <div className="user-assets-viewer-container">
      <IonSegment value={segmentState} onIonChange={(e) => onSegmentChange(e)}>
        {/* <IonSegmentButton value="posts">
          <IonLabel>Posts</IonLabel>
        </IonSegmentButton> */}
        <IonSegmentButton value="bookmarks">
          <IonLabel>Bookmarks</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <Swiper
        initialSlide={slideOpts.initalSlide}
        tabIndex={1}
        speed={slideOpts.speed}
        onSlideChange={(e: SwiperEvent) => onSlideChange(e)}
        onSwiper={(s: SwiperEvent) => setSwiper(s)}
      >
        {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        <SwiperSlide>
          <BookmarkAssetList />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default UserAssetsViewer;
