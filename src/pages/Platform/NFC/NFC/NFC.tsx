import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonText,
  IonCard,
  IonCardContent,
  IonButtons,
} from "@ionic/react";
import "./NFC.scss";

/* Images */
import SmallWordLogo from "../../../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../../../assets/images/small-word-logo-dark.svg";

const NFC: React.FC = () => {
  const handleTryMe = () => {
    const currentDomain = window.location.hostname
      .split(".")
      .slice(-2)
      .join(".");
    const newUrl = `https://bible.${currentDomain}`;
    window.location.href = newUrl;
  };

  const handleBlockButton = () => {
    // Replace with your desired link
    window.location.href = "https://your-chosen-link.com";
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ "--background": "var(--ion-background-color)" }}>
          <div className="nfc-header-container">
            <IonImg
              src={
                window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? SmallWordLogoDark
                  : SmallWordLogo
              }
              alt="DaylyBread Logo"
              className="nfc-logo"
            />
            {/* Header secondary buttons */}
            <IonButtons slot="end">
              <IonButton
                shape="round"
                fill="clear"
                color="dark"
                size="large"
                className="translation-button"
                onClick={handleTryMe}
              >
                Try Me
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        style={{ "--background": "var(--ion-background-color)" }}
      >
        <div className="nfc-content-container">
          <IonCard className="nfc-card">
            <IonCardContent>
              <IonTitle className="nfc-title">Welcome to DaylyBread</IonTitle>

              <IonText color="medium" className="nfc-description">
                <p>
                  Your daily source of spiritual nourishment. Discover
                  meaningful insights and grow in your faith journey with us.
                </p>
              </IonText>

              <IonButton
                expand="block"
                size="large"
                onClick={handleBlockButton}
                className="nfc-get-started-button"
              >
                Get Started
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NFC;
