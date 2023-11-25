import React from "react";
import { IonContent, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";

/* Context */
import { useAppContext } from "../../context/context";

/* GraphQL */
import { useGetTranslation } from "../../hooks/BibleHooks";

/**
 * Interface for the BreadCrumbs modal
 * @property {boolean} isOpen
 * @property {() => void} onDismiss
 * @property {string[]} selectedText
 */
interface IBibleTranslationModal {
  isOpen?: boolean;
  onDismiss?: () => void;
  selectedText?: string[];
}

const BibleTranslationModal: React.FC<IBibleTranslationModal> = ({
  isOpen,
  onDismiss,
}) => {
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
      initialBreakpoint={0.25}
      breakpoints={[0, 0.25, 0.5, 0.75]}
      isOpen={isOpen}
      onDidDismiss={onDismiss}
    >
      <IonContent className="ion-padding">{renderModalOptions()}</IonContent>
    </IonModal>
  );
};

export default BibleTranslationModal;
