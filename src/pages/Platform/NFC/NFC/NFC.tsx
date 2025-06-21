import React from "react";
import {
  IonContent,
  IonPage,
  IonTitle,
  IonButton,
  IonText,
  IonCard,
  IonCardContent,
  IonSpinner,
} from "@ionic/react";

/* Components */
import { NFCShare } from "../../../../components/NFC/NFCShare";
import { NFCMoreActions } from "../../../../components/NFC/NFCMoreActions";
import PlatformHeader from "../../Header/Header";

/* Styles */
import "./NFC.scss";

/* Hooks */
import { useGetNFCConfig } from "../../../../hooks/NFCConfigHooks";

const NFC: React.FC = () => {
  const id = new URLSearchParams(window.location.search).get("id") || "";
  const { data: nfcConfig, loading } = useGetNFCConfig(id);

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
      <PlatformHeader />

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
                    {nfcConfig?.getNFCConfig?.mainButton.text}
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
