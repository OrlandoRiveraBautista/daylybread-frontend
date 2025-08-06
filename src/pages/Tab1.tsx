import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonImg,
  IonPage,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { book, happy, library, star, chevronForward } from "ionicons/icons";

/* Context */
import { useAppContext } from "../context/context";

/* Images */
import DaylybreadLogo from "../assets/images/daylybread-logo-pink.svg";

/* Styles */
import "./Tab1.scss";

const Tab1: React.FC = () => {
  const history = useHistory();
  const { userInfo, chosenBible, chosenBook, chosenChapterNumber } =
    useAppContext();

  const handleQuickRead = () => {
    if (chosenBible && chosenBook && chosenChapterNumber) {
      history.push(
        `/read/${chosenBible.languageId}/${chosenBible.abbr}/${chosenBook.bookId}/${chosenChapterNumber}`
      );
    } else {
      history.push("/read");
    }
  };

  const handleViewProfile = () => {
    history.push("/me");
  };

  const featuredActions = [
    {
      title: "Continue Reading",
      description: chosenBook
        ? `${chosenBook.name} ${chosenChapterNumber}`
        : "Pick up where you left off",
      icon: book,
      color: "primary",
      action: handleQuickRead,
    },
    {
      title: "My Profile",
      description: userInfo?.firstName
        ? `Welcome back, ${userInfo.firstName}`
        : "View your reading progress",
      icon: happy,
      color: "secondary",
      action: handleViewProfile,
    },
  ];

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
    <IonPage>
      <Helmet>
        <title>Home - Daylybread: Smart Bible with AI</title>
        <meta
          name="description"
          content="Welcome to Daylybread - your smart Bible reading companion with AI assistance, multiple translations, and personalized features."
        />
      </Helmet>

      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-content">
        <div className="home-hero">
          <IonImg
            src={DaylybreadLogo}
            alt="Daylybread Logo"
            className="home-logo"
          />
          <IonText>
            <h1>Welcome to Daylybread</h1>
            <p>Your smart Bible reading companion</p>
          </IonText>
        </div>

        <IonGrid className="home-grid">
          {/* Quick Actions */}
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h2>Quick Actions</h2>
              </IonText>
            </IonCol>
          </IonRow>

          {featuredActions.map((action, index) => (
            <IonRow key={index}>
              <IonCol size="12">
                <IonCard className="action-card" button onClick={action.action}>
                  <IonCardContent>
                    <div className="card-content">
                      <div className="card-icon">
                        <IonIcon icon={action.icon} color={action.color} />
                      </div>
                      <div className="card-text">
                        <IonCardTitle>{action.title}</IonCardTitle>
                        <IonText>
                          <p>{action.description}</p>
                        </IonText>
                      </div>
                      <div className="card-arrow">
                        <IonIcon icon={chevronForward} />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}

          {/* App Features */}
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

          {/* Call to Action */}
          <IonRow>
            <IonCol size="12">
              <div className="cta-section">
                <IonText>
                  <h3>Ready to dive deeper?</h3>
                  <p>
                    Explore the Bible with our advanced reading tools and AI
                    assistance.
                  </p>
                </IonText>
                <IonButton
                  expand="block"
                  shape="round"
                  color="primary"
                  size="large"
                  onClick={handleQuickRead}
                >
                  Start Reading
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
