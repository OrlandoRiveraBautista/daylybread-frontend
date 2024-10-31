import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { Helmet } from "react-helmet";

/* Context */
import { useAppContext } from "../context/context";

/** Hooks */

/* Components */
import BibleNavModal from "../components/BibleNavModal/BibleNavModal";
import BibleTranslationModal from "../components/BibleNavModal/BibleTranslationModal";
import BibleChapterViewer from "../components/BibleViewer/BibleChapterViewer";
import Player from "../components/Player/Player";
import { Swiper, SwiperSlide } from "swiper/react";

/* Styles */
import "./Tab2.scss";

/* Graphics */
import { caretDownOutline } from "ionicons/icons";

/* Utils */
import { displayBibleAbbr } from "../utils/support";

/* Types */
import { Swiper as SwiperEvent } from "swiper/types";

const Tab2: React.FC = () => {
  // Context
  const { chosenBible, chosenBook, chosenChapterMedia, chosenChapterNumber } =
    useAppContext();

  /* States */
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openBibleNavModal, setOpenBibleNavModal] = useState<boolean>(false);
  const [segmentState, setSegmentState] = useState<string>("text");
  const [swiper, setSwiper] = useState<SwiperEvent | null>(null);

  const canonicalUrl = window.location.href;

  return (
    <IonPage style={{ overflow: "clip" }}>
      <Helmet>
        <title>
          {`Read ${chosenBook?.name} ${chosenChapterNumber} | ${chosenBible?.name} |
          - Daylybread`}
        </title>
        <meta
          name="description"
          content={`Read ${chosenBook?.name} ${chosenChapterNumber} of the ${chosenBible?.name} Bible.`}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      {/* Header */}
      <IonHeader className="ion-no-border padding-left-right">
        {/* Toolbar */}
        <IonToolbar>
          {/* Header Title Button */}
          {chosenBible ? (
            <>
              <IonButton
                expand="full"
                fill="clear"
                color="dark"
                className="header-button"
                onClick={() => setOpenBibleNavModal(!openBibleNavModal)}
                id="open-bible-nav-modal"
                disabled={chosenBible ? false : true}
              >
                {chosenBook ? (
                  <>
                    {chosenBook.name}{" "}
                    <IonIcon icon={caretDownOutline}></IonIcon>
                  </>
                ) : null}
              </IonButton>
              {/* Header secondary buttons */}
              <IonButtons slot="end">
                <IonButton
                  shape="round"
                  fill="clear"
                  color="dark"
                  size="large"
                  onClick={() => setOpenModal(!openModal)}
                  id="open-modal"
                  className="translation-button"
                >
                  {chosenBible
                    ? displayBibleAbbr(chosenBible.abbr!)
                    : "Pick bible"}
                </IonButton>

                {chosenChapterMedia?.length ? (
                  <Player type="button" src={chosenChapterMedia![0].path!} />
                ) : null}
              </IonButtons>
            </>
          ) : null}
        </IonToolbar>
      </IonHeader>

      {/* Body */}
      <IonContent>
        <div>
          <IonSegment
            value={segmentState}
            onIonChange={(e) => {
              if (!e.detail.value) return;
              setSegmentState(e.detail.value);
              swiper?.slideTo(["text", "storybook"].indexOf(e.detail.value));
            }}
          >
            <IonSegmentButton value="text">
              <IonLabel>Text</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="storybook">
              <IonLabel>Storybook</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <Swiper
            allowTouchMove={false} // Disable manual swipe
            className="reading-type-swiper-wrapper"
            onSwiper={setSwiper}
            speed={300}
          >
            <SwiperSlide>
              <BibleChapterViewer />
            </SwiperSlide>
            <SwiperSlide>Hello</SwiperSlide>
          </Swiper>
        </div>

        {/* Modals */}
        {/* translation selection */}
        <BibleTranslationModal
          isOpen={openModal}
          onDismiss={() => setOpenModal(!openModal)}
        />

        {/* bible navigation */}
        <BibleNavModal
          isOpen={openBibleNavModal}
          onDismiss={() => setOpenBibleNavModal(!openBibleNavModal)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
