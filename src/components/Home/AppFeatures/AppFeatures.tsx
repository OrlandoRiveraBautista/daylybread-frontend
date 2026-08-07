import React, { useState } from "react";
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
import { library, sparkles, chevronForward } from "ionicons/icons";
import { useHistory } from "react-router";
import BreadCrumbsModal from "../../BreadCrumbsModal/BreadCrumbsModal";

/* Styles */
import "./AppFeatures.scss";

const AppFeatures: React.FC = () => {
  const history = useHistory();
  const [showAiModal, setShowAiModal] = useState(false);

  const appFeatures = [
    {
      title: "Multiple Translations",
      description: "Explore the Bible in 1,600+ languages and translations",
      icon: library,
      action: () => history.push("/read"),
    },
    {
      title: "BreadCrumbs AI",
      description: "Get spiritual insights and answers with our AI assistant",
      icon: sparkles,
      action: () => setShowAiModal(true),
    },
  ];

  return (
    <>
      <IonGrid className="app-features-grid">
        <IonRow>
          <IonCol size="12">
            <IonText>
              <h2>Discover Features</h2>
            </IonText>
          </IonCol>
        </IonRow>

        <IonRow>
          {appFeatures.map((feature, index) => (
            <IonCol size="12" sizeMd="6" key={index}>
              <IonCard
                className="feature-card"
                button
                onClick={feature.action}
              >
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
                    <div className="feature-arrow">
                      <IonIcon icon={chevronForward} />
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>

      <BreadCrumbsModal
        isOpen={showAiModal}
        onDismiss={() => setShowAiModal(false)}
      />
    </>
  );
};

export default AppFeatures;
