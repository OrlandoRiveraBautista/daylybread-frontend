import React, { useRef } from "react";
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

/* Components */
import Skeleton from "../Loading/Skeleton";

/* Context */
import { useAppContext } from "../../context/context";

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
  // local

  // lazy api call to search languages
  const { searchListOfLanguages, data, loading } =
    useLazySearchListOfLanguages();

  const modal = useRef<HTMLIonModalElement>(null);

  /**
   * Function to handle setting the language for the bible and pushing the url.
   */
  const handleSettingLanguage = (language: BbLanguage) => {
    // set bible language to global state
    setBibleLanguage(language);

    modal.current?.dismiss();
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
            className="flat"
          ></IonSearchbar>
        </div>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <div className="flex-column gap-4">{renderSkeleton()}</div>
        ) : (
          data?.searchListOfLanguages.data.map((lang, index) => {
            return (
              <IonItem
                button
                key={index}
                onClick={() => handleSettingLanguage(lang)}
              >
                <IonLabel>
                  <h2>{lang.name}</h2>
                  <p>Bibles: {lang.bibles}</p>
                </IonLabel>
              </IonItem>
            );
          })
        )}
      </IonContent>
    </IonModal>
  );
};

export default BibleSearchLanguages;
