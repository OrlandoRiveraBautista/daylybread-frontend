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

  const renderSkeleton = () =>
    Array.from({ length: 8 }).map((_, i) => (
      <div className="language-skeleton-row" key={i}>
        <div className="language-skeleton-left">
          <Skeleton height="15px" width="120px" shape="square" />
          <Skeleton height="11px" width="72px" shape="square" />
        </div>
        <Skeleton height="26px" width="26px" shape="round" />
      </div>
    ));

  const renderContent = () => {
    if (loading) {
      return <>{renderSkeleton()}</>;
    }

    if (!data) {
      return (
        <EmptyState
          card={false}
          icon={globeOutline}
          title="Search for a Language"
          description="Type above to find Bible translations in your language"
          iconSize="48px"
        />
      );
    }

    if (data.searchListOfLanguages.data.length === 0) {
      return (
        <EmptyState
          card={false}
          icon={searchOutline}
          title="No Languages Found"
          description="Try a different search term"
          iconSize="48px"
        />
      );
    }

    return data.searchListOfLanguages.data.map((lang, index) => (
      <IonItem
        button
        key={index}
        onClick={() => handleSettingLanguage(lang)}
        className="language-list-item"
      >
        <IonLabel>
          <h2>{lang.name}</h2>
          <p>{lang.bibles} {lang.bibles === 1 ? "translation" : "translations"}</p>
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
      <IonHeader className="language-modal-header ion-no-border">
        <IonTitle className="language-modal-title">Languages</IonTitle>
        <IonSearchbar
          placeholder="Search a language..."
          onIonInput={handleSearch}
          className="language-searchbar tour-step-3"
          debounce={200}
        />
      </IonHeader>
      <IonContent className="tour-step-4">
        <div className="language-list-container">
          {renderContent()}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default BibleSearchLanguages;
