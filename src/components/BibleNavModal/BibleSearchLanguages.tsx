import React, { useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonSearchbar,
  IonTitle,
} from "@ionic/react";
import {
  IonSearchbarCustomEvent,
  SearchbarInputEventDetail,
} from "@ionic/core";

/* Icons */
import { searchOutline, globeOutline } from "ionicons/icons";

/* Components */
import Skeleton from "../Loading/Skeleton";
import EmptyState from "../EmptyState/EmptyState";

/* Context */
import { useAppContext } from "../../context/context";
import { useTour } from "../../context/TourContext";

/* GraphQL */
import { useLazySearchListOfLanguages } from "../../hooks/BibleBrainHooks";

/* Styles */
import "./BibleSearchLanguages.scss";

/* Types */
import { BbLanguage } from "../../__generated__/graphql";

const BibleSearchLanguages: React.FC = () => {
  /* State */
  // global
  const { setBibleLanguage } = useAppContext();
  const { stepIndex, nextStep, run: tourIsRunning } = useTour();

  // lazy api call to search languages
  const { searchListOfLanguages, data, loading } =
    useLazySearchListOfLanguages();

  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    if (!data?.searchListOfLanguages.data) return;
    if (stepIndex >= 3) return;
    setTimeout(nextStep, 500);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function to handle setting the language for the bible and pushing the url.
   */
  const handleSettingLanguage = (language: BbLanguage) => {
    // set bible language to global state
    setBibleLanguage(language);

    modal.current?.dismiss();

    // check if tour is running
    if (!tourIsRunning) return;
    // check the step
    if (stepIndex >= 4) return;
    //  go to the next step
    setTimeout(nextStep, 500);
  };

  const handleSearch = (
    e: IonSearchbarCustomEvent<SearchbarInputEventDetail>
  ) => {
    const { value } = e.detail;

    searchListOfLanguages({
      variables: {
        options: {
          search: value,
          /**
           * ! 3/29/2024 mediaInclude is down
           */
          // mediaInclude: "text_plain",
        },
      },
    });
  };

  /**
   * Function to render loading skeleton animation
   * @augments -
   * @returns JSX.Element[]
   */
  const renderSkeleton = () => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push(
        <Skeleton height="66px" width="100%" shape="square" key={i} />
      );
    }

    return items;
  };

  /**
   * Function to render content based on state
   * @returns JSX.Element
   */
  const renderContent = () => {
    // Loading state
    if (loading) {
      return <div className="flex-column gap-4">{renderSkeleton()}</div>;
    }

    // No data yet (initial state)
    if (!data) {
      return (
        <EmptyState
          icon={globeOutline}
          title="Search for a Language"
          description="Type in the search bar above to find Bible translations in your preferred language"
        />
      );
    }

    // Data exists but no results
    if (data.searchListOfLanguages.data.length === 0) {
      return (
        <EmptyState
          icon={searchOutline}
          title="No Languages Found"
          description="Try searching with a different term or check your spelling"
        />
      );
    }

    // Data with results
    return data.searchListOfLanguages.data.map((lang, index) => (
      <IonItem button key={index} onClick={() => handleSettingLanguage(lang)}>
        <IonLabel>
          <h2>{lang.name}</h2>
          <p>Bibles: {lang.bibles}</p>
        </IonLabel>
      </IonItem>
    ));
  };

  return (
    <IonModal
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75, 1]}
      trigger="select-language"
      ref={modal}
    >
      <IonHeader className="ion-padding">
        <div className="header-container">
          <IonTitle className="ion-text-center">Languages</IonTitle>
          <IonSearchbar
            placeholder="Search a language"
            onIonInput={handleSearch}
            className="flat tour-step-3"
          ></IonSearchbar>
        </div>
      </IonHeader>
      <IonContent className="ion-padding tour-step-4">
        {renderContent()}
      </IonContent>
    </IonModal>
  );
};

export default BibleSearchLanguages;
