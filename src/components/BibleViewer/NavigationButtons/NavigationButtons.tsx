import React from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
// import { chevronBack, chevronForward } from "ionicons/icons";

/* Context */
// import { useAppContext } from "../../../context/context";

/* Styles */
import "./NavigationButtons.scss";

/* Hooks */
// import useBibleNavigator from "../../utility/hooks/useBibleNavigator";

/* Images */
import BreadCrumbsIcon from "../../../assets/icons/BreadCrumbs-icon.svg";

/* Types */
import { Swiper as SwiperType } from "swiper/types";
interface INavigationButtons {
  swiper: SwiperType;
  handleOpenBreadCrumbsModal: () => void;
}

const NavigationButtons: React.FC<INavigationButtons> = ({
  swiper,
  handleOpenBreadCrumbsModal,
}: INavigationButtons) => {
  /* Context */
  // const { setIsProgrammaticSlide } = useAppContext();

  // const { nextChapter, backChapter } = useBibleNavigator();

  return (
    <>
      <IonFab id="navigation-buttons">
        {/* Back button
        <IonFabButton color="light" size="small" className="left">
          <IonIcon
            icon={chevronBack}
            onClick={() => {
              setIsProgrammaticSlide({
                callback: () => swiper.slidePrev(),
                value: true,
              });
              backChapter();
            }}
          />
        </IonFabButton> */}

        {/* Button to open the bible assistant modal */}
        <IonFabButton
          color="light"
          size="small"
          className="bread-crumbs-button"
          onClick={handleOpenBreadCrumbsModal}
          id="bread-crumbs-modal"
        >
          <IonIcon
            class="bread-crumbs-icon"
            color="light"
            icon={BreadCrumbsIcon}
          />
        </IonFabButton>

        {/* Forward button */}
        {/* <IonFabButton color="primary" size="small" className="right">
          <IonIcon
            icon={chevronForward}
            onClick={() => {
              setIsProgrammaticSlide({
                callback: () => swiper.slideNext(),
                value: true,
              });
              nextChapter();
            }}
          />
        </IonFabButton> */}
      </IonFab>
    </>
  );
};

export default NavigationButtons;
