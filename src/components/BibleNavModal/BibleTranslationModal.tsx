import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToggle,
} from "@ionic/react";
import { useParams, useHistory } from "react-router";

/* Components */
import BibleSearchLanguages from "./BibleSearchLanguages";
import Skeleton from "../Loading/Skeleton";

/* Icons */
import { text, play } from "ionicons/icons";

/* Context */
import { useAppContext } from "../../context/context";
import { useTour } from "../../context/TourContext";

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
    setIsProgrammaticSlide,
  } = useAppContext();
  const { nextStep, stepIndex, run: tourIsRunning } = useTour();

  const history = useHistory();

  /* Local state */
  const [isNewBible, setIsNewBible] = useState<boolean>(false); // flag to determine if the bible should be set to the begining
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [startFromBeginning, setStartFromBeginning] = useState<boolean>(false); // toggle for starting from beginning

  /* Queries */
  // lazy api call to search languages
  const { searchListOfLanguages, data: languageData } =
    useLazySearchListOfLanguages();
  const {
    getListOfBibles,
    data: biblesData,
    loading: biblesLoading,
  } = useLazyGetListOfBibles();
  const { getListOfBooksFromBible, data: booksData } =
    useLazyGetListOfBooksFromBible();

  /* Url params */
  const urlParams = useParams<BibleReadParams>();

  /* Refs */
  const modal = useRef<HTMLIonModalElement>(null);

  /**
   *  Functions bellow deal with the changing of languages upon the url params for the current language changes
   */
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

    // If startFromBeginning is enabled, always start with first book and first chapter
    if (startFromBeginning) {
      setBook(booksData.getListOfBooksForBible.data[0]);
      setChapterNumber(1);
    } else {
      setBook(
        urlParams.currentBookId
          ? booksData.getListOfBooksForBible.data.find(
              (book) => book.bookId === urlParams.currentBookId
            )!
          : booksData.getListOfBooksForBible.data[0]
      );
      setChapterNumber(
        urlParams.currentChapterNumber
          ? Number(urlParams.currentChapterNumber)
          : 1
      );
    }
    setIsNewBible(false);
    setIsProgrammaticSlide({ value: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    booksData,
    urlParams?.currentBookId,
    urlParams?.currentChapterNumber,
    startFromBeginning,
  ]);

  /*--- Setting Url --- */
  const handlePathSetting = (bible: BbBible) => {
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
  };

  const tourFunc = () => {
    if (!tourIsRunning) return;
    if (stepIndex >= 5) return;

    nextStep();
  };

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

    handlePathSetting(bible);

    // dismiss the modal
    modal.current?.dismiss();

    // tour
    setTimeout(tourFunc, 2000);
  };

  /**
   * Function to toggle start from beginning
   */
  const handleToggleStartFromBeginning = () => {
    setStartFromBeginning(!startFromBeginning);
  };

  /**
   * Function to render loading skeleton animation for bible list
   * @returns JSX.Element[]
   */
  const renderBiblesSkeleton = () => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push(
        <div key={i} style={{ marginBottom: "12px" }}>
          <Skeleton height="64px" width="100%" shape="square" />
        </div>
      );
    }
    return items;
  };

  // function to render modal options
  const renderModalOptions = () => {
    // Show loading skeleton when fetching bibles
    if (biblesLoading) {
      return <div className="ion-padding">{renderBiblesSkeleton()}</div>;
    }

    return biblesData ? (
      <IonList className="tour-step-5">
        {/* Start from Beginning Toggle */}
        <IonItem className="start-beginning-toggle">
          <IonIcon icon={play} slot="start" />
          <IonLabel>
            <h2>Start from Beginning</h2>
            <p>Begin reading from first book, first chapter</p>
          </IonLabel>
          <IonToggle
            checked={startFromBeginning}
            onIonChange={handleToggleStartFromBeginning}
            slot="end"
          />
        </IonItem>

        {biblesData.getListOFBibles.data
          .filter(
            (bible) =>
              bible.filesets["dbp-prod"] &&
              bible.filesets["dbp-prod"].some((fileset: any) =>
                fileset.type.startsWith("text_")
              )
          )
          .map((bible, index) => (
            <IonItem
              button
              key={index}
              onClick={() => handleSettingBible(bible)}
            >
              <IonLabel>
                <h2>{bible.vname ? bible.vname : bible.name}</h2>
                <p>
                  <IonIcon icon={text} />
                  {bible.filesets["dbp-prod"].some((fileset: any) =>
                    fileset.type.startsWith("audio")
                  ) ? (
                    <IonIcon icon={play} />
                  ) : null}
                </p>
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
          className="flat full-width tour-step-2"
          onClick={() => setTimeout(nextStep, 100)}
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
