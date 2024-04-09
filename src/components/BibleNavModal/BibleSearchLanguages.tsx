import React from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonTitle,
} from "@ionic/react";
import {
  IonSearchbarCustomEvent,
  SearchbarInputEventDetail,
} from "@ionic/core";
import { useHistory } from "react-router";

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
  const { setBibleLanguage } = useAppContext();

  const history = useHistory();

  // lazy api call to search languages
  const { searchListOfLanguages, data, error, loading } =
    useLazySearchListOfLanguages();

  /**
   * Function to handle setting the language for the bible and pushing the url.
   */
  const handleSettingLanguage = (language: BbLanguage) => {
    setBibleLanguage(language);
    history.push("/read/" + language.id);
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
    <>
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
    </>
  );
};

export default BibleSearchLanguages;
