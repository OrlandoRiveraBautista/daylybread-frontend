import React from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";

/* Styles */
import "./NavigationButtons.scss";

/* Hooks */
import useBibleNavigator from "../../utility/hooks/useBibleNavigator";

/* Images */
import BreadCrumbsIcon from "../../../assets/icons/BreadCrumbs-icon.svg";

const NavigationButtons: React.FC = () => {
  const { nextChapter, backChapter } = useBibleNavigator();
  return (
    <>
      <IonFab id="navigation-buttons">
        {/* Back button */}
        <IonFabButton color="light" size="small" className="right">
          <IonIcon icon={chevronBack} onClick={() => backChapter()} />
        </IonFabButton>

        {/* Button to open the bible assistant modal */}
        <IonFabButton
          color="light"
          size="small"
          // onClick={handleOpenVerseModal}
        >
          <IonIcon
            class="bread-crumbs-icon"
            color="light"
            icon={BreadCrumbsIcon}
          />
        </IonFabButton>

        {/* Forward button */}
        <IonFabButton color="light" size="small" className="right">
          <IonIcon icon={chevronForward} onClick={nextChapter} />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default NavigationButtons;
