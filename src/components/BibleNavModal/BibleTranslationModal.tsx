import React from "react";
import { IonContent, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";

/* Context */
import { useAppContext } from "../../context/context";

/* GraphQL */
import { useGetTranslation } from "../../hooks/BibleHooks";

const BibleTranslationModal: React.FC = () => {
  const { setTranslation } = useAppContext();

  /* Queries */
  const { data: translationData } = useGetTranslation();

  // function to render modal options
  const renderModalOptions = () => {
    if (!translationData) return; // dont show anything if no data is present

    return (
      <IonList>
        {translationData?.getTranslations.map((translation, index) => (
          <IonItem
            button
            key={index}
            onClick={() => setTranslation(translation)}
          >
            <IonLabel>
              <h2>{translation.name}</h2>
              <p>{translation.language}</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  };

  return (
    <IonModal
      trigger="open-modal"
      initialBreakpoint={0.25}
      breakpoints={[0, 0.25, 0.5, 0.75]}
    >
      <IonContent className="ion-padding">{renderModalOptions()}</IonContent>
    </IonModal>
  );
};

export default BibleTranslationModal;
