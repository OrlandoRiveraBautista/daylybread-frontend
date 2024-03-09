import React, { useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
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
import { useLazyGetListOfBibles } from "../../hooks/BibleBrainHooks";

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
  const { setBible, chosenLanguage, chosenBible } = useAppContext();

  /* Queries */
  const { data: translationData } = useGetTranslation();
  const { getListOfBibles, data: biblesData } = useLazyGetListOfBibles();

  useEffect(() => {
    if (!chosenLanguage) return;

    getListOfBibles({
      variables: {
        options: {
          languageCode: chosenLanguage.id.toString(),
        },
      },
    });
  }, [chosenLanguage]);

  useEffect(() => {
    console.log(chosenBible);
  }, [chosenBible]);

  // function to render modal options
  const renderModalOptions = () => {
    if (!translationData) return; // dont show anything if no data is present

    return (
      <IonList>
        {biblesData ? (
          biblesData.getListOFBibles.data.map((bible, index) => (
            <IonItem button key={index} onClick={() => setBible(bible)}>
              <IonLabel>
                <h2>{bible.name}</h2>
                <p>Date: {bible.date}</p>
              </IonLabel>
            </IonItem>
          ))
        ) : (
          <div className="ion-text-center">Please select a language</div>
        )}
      </IonList>
    );
  };

  return (
    <IonModal
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75, 1]}
      isOpen={isOpen}
      onDidDismiss={onDismiss}
    >
      <IonHeader className="ion-padding">
        <IonTitle className="ion-text-center">
          {chosenLanguage ? chosenLanguage.bibles : null} Bibles
        </IonTitle>
        <IonButton
          shape="round"
          fill="clear"
          color="dark"
          size="large"
          id="select-language"
          className="flat full-width"
        >
          Language: {chosenLanguage ? chosenLanguage.name : null}
        </IonButton>
      </IonHeader>
      <IonContent className="ion-padding">{renderModalOptions()}</IonContent>

      {/* Languages Modal */}
      <IonModal
        initialBreakpoint={0.75}
        breakpoints={[0, 0.75, 1]}
        trigger="select-language"
      >
        <BibleSearchLanguages />
      </IonModal>
    </IonModal>
  );
};

export default BibleTranslationModal;
