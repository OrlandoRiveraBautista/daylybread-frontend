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
import { NFCShare } from "../../../../components/Platform/NFCShare";

/* Images */
import SmallWordLogo from "../../../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../../../assets/images/small-word-logo-dark.svg";

/* Hooks */
import { useGetNFCConfig } from "../../../../hooks/NFCConfigHooks";

const NFC: React.FC = () => {
  const id = new URLSearchParams(window.location.search).get("id") || "";
  const { data: nfcConfig } = useGetNFCConfig(id);

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
    window.location.href = nfcConfig?.getNFCConfig?.url! || "";
  };

  return (
    <IonPage id="nfc-page">
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
                Try Daylybread
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        style={{ "--background": "var(--ion-background-color)" }}
      >
        <div className="nfc-container">
          <div className="nfc-content-container">
            <IonCard className="nfc-card">
              <IonCardContent>
                <IonTitle className="nfc-title">
                  {nfcConfig?.getNFCConfig?.title}
                </IonTitle>

                <IonText color="medium" className="nfc-description">
                  <p>{nfcConfig?.getNFCConfig?.description}</p>
                </IonText>

                <IonButton
                  expand="block"
                  size="large"
                  onClick={handleBlockButton}
                  className="nfc-get-started-button"
                >
                  Navigate to link
                </IonButton>

                <NFCShare />
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NFC;
