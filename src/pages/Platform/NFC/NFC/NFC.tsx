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
  IonSpinner,
} from "@ionic/react";

/* Components */
import { NFCShare } from "../../../../components/NFC/NFCShare";
import { NFCMoreActions } from "../../../../components/NFC/NFCMoreActions";

/* Styles */
import "./NFC.scss";

/* Images */
import SmallWordLogo from "../../../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../../../assets/images/small-word-logo-dark.svg";

/* Hooks */
import { useGetNFCConfig } from "../../../../hooks/NFCConfigHooks";

const NFC: React.FC = () => {
  const id = new URLSearchParams(window.location.search).get("id") || "";
  const { data: nfcConfig, loading } = useGetNFCConfig(id);

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
    window.location.href = nfcConfig?.getNFCConfig?.mainButton.url! || "";
  };

  const handleCash = () => {
    // Replace with your desired link
    window.location.href = nfcConfig?.getNFCConfig?.givingLink?.url || "";
  };

  const handleNewMember = () => {
    // Replace with your desired link
    window.location.href =
      nfcConfig?.getNFCConfig?.memberRegistrationLink?.url || "";
  };

  const handleEventLink = () => {
    // Replace with your desired link
    window.location.href = nfcConfig?.getNFCConfig?.eventsLink?.url || "";
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
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
              }}
            >
              <IonSpinner name="crescent" style={{ width: 48, height: 48 }} />
            </div>
          ) : (
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

                  <NFCShare nfcConfig={nfcConfig?.getNFCConfig!} />
                </IonCardContent>
              </IonCard>
            </div>
          )}
        </div>

        {(nfcConfig?.getNFCConfig?.givingLink?.isVisible ||
          nfcConfig?.getNFCConfig?.memberRegistrationLink?.isVisible ||
          nfcConfig?.getNFCConfig?.eventsLink?.isVisible) && (
          <NFCMoreActions
            onCash={
              nfcConfig?.getNFCConfig?.givingLink?.isVisible
                ? handleCash
                : undefined
            }
            onNewMember={
              nfcConfig?.getNFCConfig?.memberRegistrationLink?.isVisible
                ? handleNewMember
                : undefined
            }
            onEventLink={
              nfcConfig?.getNFCConfig?.eventsLink?.isVisible
                ? handleEventLink
                : undefined
            }
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default NFC;
