import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { library, star } from "ionicons/icons";

/* Styles */
import "./AppFeatures.scss";

const AppFeatures: React.FC = () => {
  const appFeatures = [
    {
      title: "Multiple Translations",
      description: "Access the Bible in various languages and translations",
      icon: library,
    },
    {
      title: "AI Assistant",
      description: "Get insights and answers with our BreadCrumbs AI",
      icon: star,
    },
  ];
  return (
    <IonGrid className="app-features-grid">
      <IonRow>
        <IonCol size="12">
          <IonText>
            <h2>Discover Features</h2>
          </IonText>
        </IonCol>
      </IonRow>

      {appFeatures.map((feature, index) => (
        <IonRow key={index}>
          <IonCol size="12" size-md="6">
            <IonCard className="feature-card">
              <IonCardContent>
                <div className="feature-content">
                  <div className="feature-icon">
                    <IonIcon icon={feature.icon} color="tertiary" />
                  </div>
                  <div className="feature-text">
                    <IonCardTitle>{feature.title}</IonCardTitle>
                    <IonText>
                      <p>{feature.description}</p>
                    </IonText>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default AppFeatures;
