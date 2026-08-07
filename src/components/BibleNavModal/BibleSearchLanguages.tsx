import React, { useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
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
import { searchOutline, globeOutline, checkmarkCircle } from "ionicons/icons";

/* Components */
import Skeleton from "../Loading/Skeleton";
import EmptyState from "../EmptyState/EmptyState";

/* Context */
import { useAppContext } from "../../context/context";
import { useTour } from "../../context/TourContext";

/* GraphQL */
import { useLazySearchListOfLanguages } from "../../hooks/BibleBrainHooks";

/* Services */
import { hapticService } from "../../services/hapticService";

/* Styles */
import "./BibleSearchLanguages.scss";

/* Types */
import { BbLanguage } from "../../__generated__/graphql";

const BibleSearchLanguages: React.FC = () => {
  const { setBibleLanguage, chosenLanguage } = useAppContext();
  const { stepIndex, nextStep, run: tourIsRunning } = useTour();

  const { searchListOfLanguages, data, loading } =
    useLazySearchListOfLanguages();

  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    if (!data?.searchListOfLanguages.data) return;
    if (stepIndex >= 3) return;
    setTimeout(nextStep, 500);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSettingLanguage = (language: BbLanguage) => {
    void hapticService.triggerSuccessHaptic();
    setBibleLanguage(language);
    modal.current?.dismiss();

    if (!tourIsRunning) return;
    if (stepIndex >= 4) return;
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

    return data.searchListOfLanguages.data.map((lang) => {
      const isSelected = chosenLanguage?.id === lang.id;
      return (
        <IonItem
          button
          key={lang.id}
          onClick={() => handleSettingLanguage(lang)}
          className={`language-list-item ${
            isSelected ? "language-list-item--selected" : ""
          }`}
        >
          <IonLabel>
            <h2>{lang.name}</h2>
            <p>
              {lang.bibles}{" "}
              {lang.bibles === 1 ? "translation" : "translations"}
            </p>
          </IonLabel>
          {isSelected ? (
            <IonIcon
              icon={checkmarkCircle}
              color="primary"
              slot="end"
              className="language-selected-check"
            />
          ) : null}
        </IonItem>
      );
    });
  };

  return (
    <IonModal
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75, 1]}
      handle={true}
      trigger="select-language"
      className="language-modal"
      ref={modal}
    >
      <IonHeader className="language-modal-header ion-no-border">
        <IonTitle className="language-modal-title">Languages</IonTitle>
        <IonSearchbar
          placeholder="Search a language…"
          onIonInput={handleSearch}
          className="language-searchbar tour-step-3"
          debounce={200}
          enterkeyhint="search"
        />
      </IonHeader>
      <IonContent className="tour-step-4 language-modal-content">
        <div className="language-list-container">{renderContent()}</div>
      </IonContent>
    </IonModal>
  );
};

export default BibleSearchLanguages;
