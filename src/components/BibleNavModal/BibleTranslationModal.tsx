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
import {
  useLazyGetListOfBibles,
  useLazyGetListOfBooksFromBible,
} from "../../hooks/BibleBrainHooks";

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
  // context global state
  const {
    setBible,
    setBibleBooks,
    setBook,
    setChapterNumber,
    chosenLanguage,
    chosenBible,
  } = useAppContext();

  /* Queries */
  const { getListOfBibles, data: biblesData } = useLazyGetListOfBibles();
  const { getListOfBooksFromBible, data: booksData } =
    useLazyGetListOfBooksFromBible();

  // use effect watching the change of language and searching for bibles
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

  // use effect watching for change in chosen bible to search for the books of the bible
  useEffect(() => {
    if (!chosenBible) return;

    getListOfBooksFromBible({
      variables: {
        options: {
          bibleId: chosenBible.abbr!,
        },
      },
    });
  }, [chosenBible]);

  // use effect watching the change in the books data to set the books to state and setting the chosen book to the first book to start
  useEffect(() => {
    if (!booksData) return;

    setBibleBooks(booksData.getListOfBooksForBible.data);
    setBook(booksData.getListOfBooksForBible.data[0]);
    setChapterNumber(1); // set the chapter to 1
  }, [booksData]);

  // function to render modal options
  const renderModalOptions = () => {
    return biblesData ? (
      <IonList>
        {biblesData.getListOFBibles.data.map((bible, index) => (
          <IonItem button key={index} onClick={() => setBible(bible)}>
            <IonLabel>
              <h2>{bible.name}</h2>
              <p>Date: {bible.date}</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    ) : (
      <div className="ion-text-center">Please select a language</div>
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
