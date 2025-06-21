import {
  IonHeader,
  IonToolbar,
  IonImg,
  IonButtons,
  IonButton,
} from "@ionic/react";
import React from "react";
import SmallWordLogo from "../../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../../assets/images/small-word-logo-dark.svg";

/* Styles */
import "./Header.scss";

const PlatformHeader: React.FC = () => {
  const handleTryMe = () => {
    const currentDomain = window.location.hostname
      .split(".")
      .slice(-2)
      .join(".");
    const newUrl = `https://bible.${currentDomain}`;
    window.location.href = newUrl;
  };

  return (
    <IonHeader className="ion-no-border" id="platform-header">
      <IonToolbar style={{ "--background": "var(--ion-background-color)" }}>
        <div className="header-container">
          <IonImg
            src={
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? SmallWordLogoDark
                : SmallWordLogo
            }
            alt="DaylyBread Logo"
            className="logo"
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
              Try Daylybread
            </IonButton>
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default PlatformHeader;
