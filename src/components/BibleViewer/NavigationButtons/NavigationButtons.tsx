import React, { useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";

/* Components */
import BreadCrumbsModal from "../../BreadCrumbsModal/BreadCrumbsModal";

/* Context */
import { useAppContext } from "../../../context/context";

/* Styles */
import "./NavigationButtons.scss";

/* Hooks */
import useBibleNavigator from "../../utility/hooks/useBibleNavigator";

/* Images */
import BreadCrumbsIcon from "../../../assets/icons/BreadCrumbs-icon.svg";

/* Types */
import { Swiper as SwiperType } from "swiper/types";
interface INavigationButtons {
  swiper: SwiperType;
}

const NavigationButtons: React.FC<INavigationButtons> = ({
  swiper,
}: INavigationButtons) => {
  /* Context */
  const { resetVersesInList, setIsProgrammaticSlide } = useAppContext();

  const { nextChapter, backChapter } = useBibleNavigator();

  //   const [selectedElement, setSelectedElement] = useState<Array<string>>([]);
  const [openSelectedVersesModal, setOpenSelectedVersesModal] =
    useState<boolean>(false);
  const [initialModalBreakpoint, setInitialModalBreakpoint] =
    useState<number>(0.25);

  const handleOpenVerseModal = () => {
    if (!openSelectedVersesModal) resetVersesInList();

    setOpenSelectedVersesModal(!openSelectedVersesModal);
    setInitialModalBreakpoint(0.75);
  };

  return (
    <>
      <IonFab id="navigation-buttons">
        {/* Back button */}
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
        </IonFabButton>

        {/* Button to open the bible assistant modal */}
        <IonFabButton
          color="light"
          size="small"
          className="bread-crumbs-button"
          // onClick={handleOpenVerseModal}
          id="bread-crumbs-modal"
        >
          <IonIcon
            class="bread-crumbs-icon"
            color="light"
            icon={BreadCrumbsIcon}
          />
        </IonFabButton>

        {/* Forward button */}
        <IonFabButton color="primary" size="small" className="right">
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
        </IonFabButton>
      </IonFab>
      {/* bible assistant modal */}
      <BreadCrumbsModal
        isOpen={openSelectedVersesModal}
        onDismiss={handleOpenVerseModal}
        // selectedText={selectedElement}
        initialBreakpoint={initialModalBreakpoint}
      />
    </>
  );
};

export default NavigationButtons;
