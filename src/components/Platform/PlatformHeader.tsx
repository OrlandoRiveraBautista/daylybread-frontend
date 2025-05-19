import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonImg,
  IonButtons,
  IonButton,
} from "@ionic/react";
import SmallWordLogo from "../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../assets/images/small-word-logo-dark.svg";

interface PlatformHeaderProps {
  onTryMe: () => void;
}

export const PlatformHeader: React.FC<PlatformHeaderProps> = ({ onTryMe }) => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar style={{ "--background": "var(--ion-background-color)" }}>
        <div className="platform-header-container">
          <IonImg
            src={
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? SmallWordLogoDark
                : SmallWordLogo
            }
            alt="DaylyBread Logo"
            className="platform-logo"
          />
          <IonButtons slot="end">
            <IonButton
              shape="round"
              fill="clear"
              color="dark"
              size="large"
              className="translation-button"
              onClick={onTryMe}
            >
              Try Daylybread
            </IonButton>
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};
