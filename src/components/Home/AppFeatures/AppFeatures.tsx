import React, { useState } from "react";
import { IonText, IonIcon } from "@ionic/react";
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
      tone: "tertiary" as const,
      action: () => history.push("/read"),
    },
    {
      title: "BreadCrumbs AI",
      description: "Get spiritual insights and answers with our AI assistant",
      icon: sparkles,
      tone: "primary" as const,
      action: () => setShowAiModal(true),
    },
  ];

  return (
    <>
      <section className="app-features" aria-label="Discover features">
        <div className="home-section-header">
          <IonText>
            <h2 className="home-section-title">Discover</h2>
          </IonText>
          <p className="home-section-subtitle">Tools to deepen your study</p>
        </div>

        <div className="app-features-list">
          {appFeatures.map((feature) => (
            <button
              type="button"
              className="home-list-card"
              key={feature.title}
              onClick={feature.action}
            >
              <div
                className={`home-list-icon home-list-icon--${feature.tone}`}
                aria-hidden="true"
              >
                <IonIcon icon={feature.icon} />
              </div>
              <div className="home-list-text">
                <span className="home-list-title">{feature.title}</span>
                <span className="home-list-description">
                  {feature.description}
                </span>
              </div>
              <IonIcon className="home-list-chevron" icon={chevronForward} />
            </button>
          ))}
        </div>
      </section>

      <BreadCrumbsModal
        isOpen={showAiModal}
        onDismiss={() => setShowAiModal(false)}
      />
    </>
  );
};

export default AppFeatures;
