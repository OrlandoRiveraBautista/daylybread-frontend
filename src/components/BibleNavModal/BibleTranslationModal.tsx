import React, { useEffect, useRef, useState } from "react";
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
import { useParams, useHistory } from "react-router";

/* Components */
import BibleSearchLanguages from "./BibleSearchLanguages";

/* Context */
import { useAppContext } from "../../context/context";

/* GraphQL */
import {
  useLazyGetListOfBibles,
  useLazyGetListOfBooksFromBible,
  useLazySearchListOfLanguages,
} from "../../hooks/BibleBrainHooks";

/* Types */
import { BibleReadParams } from "../../assets/ts/types";
import { BbBible } from "../../__generated__/graphql";

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
    setBibleLanguage,
    setBible,
    setBibleBooks,
    setBook,
    setChapterNumber,
    chosenLanguage,
    chosenBible,
    chosenBook,
  } = useAppContext();

  const history = useHistory();

  /* Local state */
  const [urlParams, setUrlParams] = useState<BibleReadParams>();
  const [isNewBible, setIsNewBible] = useState<boolean>(false); // flag to determine if the bible should be set to the begining
  const [firstRender, setFirstRender] = useState<boolean>(true);

  /* Queries */
  // lazy api call to search languages
  const { searchListOfLanguages, data: languageData } =
    useLazySearchListOfLanguages();
  const { getListOfBibles, data: biblesData } = useLazyGetListOfBibles();
  const { getListOfBooksFromBible, data: booksData } =
    useLazyGetListOfBooksFromBible();

  /* Url params */
  const params = useParams<BibleReadParams>();

  /* Refs */
  const modal = useRef<HTMLIonModalElement>(null);

  // watches for url params and sets them to local state
  useEffect(() => {
    if (Object.keys(params).length > 0) {
      setUrlParams(params);
    }
  }, [params]);

  /*
   * Functions bellow deal with the changing of languages
   */
  // use effect watching the params of current language to change
  useEffect(() => {
    if (!urlParams?.currentLanguage) return;
    if (
      chosenLanguage &&
      chosenLanguage.id.toString() === urlParams.currentLanguage
    )
      // checks if any language was already chosen and if it's the same as the url param
      return;

    getListOfBibles({
      variables: {
        options: {
          languageCode: urlParams.currentLanguage,
          mediaInclude: "text_plain",
        },
      },
    });
  }, [urlParams?.currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  // use effect watching the change of language and searching for bibles
  useEffect(() => {
    // check if there is no chosen bible or if the bibles returned are the same language as the chosen language
    if (
      !chosenLanguage ||
      (biblesData?.getListOFBibles.data.length &&
        biblesData?.getListOFBibles.data[0].languageId === chosenLanguage.id)
    )
      return;

    getListOfBibles({
      variables: {
        options: {
          languageCode: chosenLanguage.id.toString(),
          mediaInclude: "text_plain",
        },
      },
    });
  }, [chosenLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  // use effect watching over the language data that we get once we have set a bible from url params
  useEffect(() => {
    if (!languageData) return;
    const filteredLanguage = languageData?.searchListOfLanguages.data.find(
      (language) => language.id === Number(urlParams?.currentLanguage)
    );
    setBibleLanguage(filteredLanguage!);
  }, [languageData]); // eslint-disable-line react-hooks/exhaustive-deps

  // use effect watching the params of current bible id to change
  useEffect(() => {
    // check for empty url param and bibles data
    if (!urlParams?.currentBibleId || !biblesData) return;
    // check if the url param is the same as the chosen bible
    if (chosenBible && chosenBible.abbr === urlParams.currentBibleId) return;

    // find the bible that the url param is refering to
    const urlBible = biblesData.getListOFBibles.data.find((bible) => {
      return bible.abbr === urlParams.currentBibleId;
    });

    // check if no bible was returned
    if (!urlBible) return;

    // set the returned bible
    setBible(urlBible);

    searchListOfLanguages({
      variables: { options: { search: urlBible.language } },
    });
  }, [urlParams?.currentBibleId, biblesData]); // eslint-disable-line react-hooks/exhaustive-deps

  // use effect watching for change in chosen bible to search for the books of the bible
  useEffect(() => {
    if (
      !chosenBible ||
      booksData?.getListOfBooksForBible.data[0].bookId === chosenBible.abbr
    )
      return;

    // get list of books for this bible
    getListOfBooksFromBible({
      variables: {
        options: {
          bibleId: chosenBible.abbr!,
        },
      },
    });
  }, [chosenBible]); // eslint-disable-line react-hooks/exhaustive-deps

  // use effect watching the change in the books data to set the books to state and setting the chosen book to the first book to start
  useEffect(() => {
    if (!booksData) return;
    if (booksData?.getListOfBooksForBible.data[0] !== chosenBook)
      setBibleBooks(booksData.getListOfBooksForBible.data);

    // this if statemet should only run if the user did not select a new bible and it is the first render
    if (!isNewBible) {
      if (!firstRender) return;
      if (!urlParams?.currentBookId && !urlParams?.currentChapterNumber) return;

      // This logic is meant to set the proper bible values when a user opens the app with a link
      const urlBook = booksData.getListOfBooksForBible.data.find(
        (book) => book.bookId === urlParams.currentBookId
      );

      setBook(urlBook!);
      setChapterNumber(Number(urlParams.currentChapterNumber));
      setFirstRender(false); // set the first render flag to false
      return;
    }

    setBook(booksData.getListOfBooksForBible.data[0]);
    setChapterNumber(1); // set the chapter to 1
    setIsNewBible(false);
  }, [booksData, urlParams?.currentBookId, urlParams?.currentChapterNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function to handle setting the bible and pushing the path
   */
  const handleSettingBible = (bible: BbBible) => {
    // set the bible to the global state
    setBible(bible);
    setIsNewBible(true); // set the new bible flag to true

    // find the books associated with the bible
    getListOfBooksFromBible({
      variables: {
        options: {
          bibleId: bible.abbr!,
        },
      },
    });

    /*--- Setting Url --- */
    // Get the current URL
    const currentUrl = history.location.pathname;

    // Split the current URL into parts
    const parts = currentUrl.split("/");

    // Check if the position exists
    if (!parts[3]) {
      history.push(`${currentUrl}/${chosenLanguage?.id}/${bible.abbr}`);
      return;
    }

    // add the language id to the url
    parts[2] = chosenLanguage?.id.toString()!;

    // Replace the value at the third position with the new Bible ID
    parts[3] = bible.abbr!;

    // Join the parts back together to form the new URL
    const newUrl = parts.join("/");
    history.push(newUrl);

    // dismiss the modal
    modal.current?.dismiss();
  };

  // function to render modal options
  const renderModalOptions = () => {
    return biblesData ? (
      <IonList>
        {biblesData.getListOFBibles.data.map((bible, index) => (
          <IonItem button key={index} onClick={() => handleSettingBible(bible)}>
            <IonLabel>
              <h2>{bible.vname ? bible.vname : bible.name}</h2>
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
      ref={modal}
    >
      <IonHeader className="ion-padding">
        <IonTitle className="ion-text-center">
          {biblesData ? biblesData?.getListOFBibles.data.length : null} Bibles
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
      <BibleSearchLanguages />
    </IonModal>
  );
};

export default BibleTranslationModal;
