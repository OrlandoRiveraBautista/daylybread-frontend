import { useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";

import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";

const getTranslations = gql(`
  query GetTranslations {
    getTranslations {
      _id
      name
      abbreviation
      language
      lang
      books {
        bookName
        bibleId
      }
    }
  }
`);

const Tab2: React.FC = () => {
  const { loading, error, data } = useQuery(getTranslations);

  useEffect(() => {
    console.log(loading);
    console.log(data);
  });

  return (
    <IonPage>
      {/* Header for Android */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {loading ? "loading..." : data?.getTranslations[0].name}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton>
              {loading ? "loading..." : data?.getTranslations[0].abbreviation}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* Header for iOS */}
      <IonContent fullscreen>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
