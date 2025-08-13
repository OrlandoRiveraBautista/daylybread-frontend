import React from "react";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

/* Components */
import QuickActions from "../components/Home/QuickActions";
import AppFeatures from "../components/Home/AppFeatures";
import MoodCheckIn from "../components/Home/MoodCheckIn";
import PersonalizedDashboard from "../components/Home/PersonalizedDashboard";

/* Context */
import { useAppContext } from "../context/context";

/* Styles */
import "./Tab1.scss";

const Tab1: React.FC = () => {
  const history = useHistory();
  const { chosenBible, chosenBook, chosenChapterNumber } = useAppContext();

  const handleQuickRead = () => {
    if (chosenBible && chosenBook && chosenChapterNumber) {
      history.push(
        `/read/${chosenBible.languageId}/${chosenBible.abbr}/${chosenBook.bookId}/${chosenChapterNumber}`
      );
    } else {
      history.push("/read");
    }
  };

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
        {/* Personalized Dashboard */}
        <PersonalizedDashboard />

        <IonGrid className="home-grid">
          {/* Mood Check-In */}
          <MoodCheckIn />

          {/* Quick Actions */}
          <QuickActions />

          {/* App Features */}
          <AppFeatures />

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
