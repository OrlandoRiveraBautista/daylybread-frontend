import React from "react";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
} from "@ionic/react";

/* Components */
import BibleSearchLanguages from "./BibleSearchLanguages";

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
      initialBreakpoint={0.5}
      breakpoints={[0, 0.25, 0.5, 0.75]}
      isOpen={isOpen}
      onDidDismiss={onDismiss}
    >
      <IonContent className="ion-padding">
        <IonTitle className="ion-text-center">Bibles</IonTitle>
        <IonButton
          shape="round"
          fill="clear"
          color="dark"
          size="large"
          id="select-language"
          className="flat full-width"
        >
          Language:
        </IonButton>
        {renderModalOptions()}
      </IonContent>

      {/* Languages Modal */}
      <IonModal
        initialBreakpoint={0.75}
        // breakpoints={[0, 0.25, 0.5, 0.75]}
        trigger="select-language"
      >
        <BibleSearchLanguages />
      </IonModal>
    </IonModal>
  );
};

export default BibleTranslationModal;
