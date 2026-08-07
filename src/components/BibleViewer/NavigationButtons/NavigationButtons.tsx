import React from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

/* Styles */
import "./NavigationButtons.scss";

/* Images */
import BreadCrumbsIcon from "../../../assets/icons/BreadCrumbs-icon.svg";

/* Services */
import { hapticService } from "../../../services/hapticService";

/* Types */
import { Swiper as SwiperType } from "swiper/types";

interface INavigationButtons {
  swiper: SwiperType;
  handleOpenBreadCrumbsModal: () => void;
}

const NavigationButtons: React.FC<INavigationButtons> = ({
  handleOpenBreadCrumbsModal,
}: INavigationButtons) => {
  const handleOpen = () => {
    void hapticService.triggerNavigationHaptic();
    handleOpenBreadCrumbsModal();
  };

  return (
    <IonFab id="navigation-buttons">
      <IonFabButton
        color="light"
        size="small"
        className="bread-crumbs-button"
        onClick={handleOpen}
        id="bread-crumbs-modal"
        aria-label="Open Breadcrumbs assistant"
      >
        <IonIcon
          class="bread-crumbs-icon"
          color="light"
          icon={BreadCrumbsIcon}
        />
      </IonFabButton>
    </IonFab>
  );
};

export default NavigationButtons;
