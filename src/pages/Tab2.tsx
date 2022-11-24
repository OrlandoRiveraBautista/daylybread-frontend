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

import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const Tab2: React.FC = () => {
  const { loading, error, data } = useQuery(gql`
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
            {loading ? "loading..." : data.getTranslations[0].name}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton>
              {loading ? "loading..." : data.getTranslations[0].abbreviation}
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
