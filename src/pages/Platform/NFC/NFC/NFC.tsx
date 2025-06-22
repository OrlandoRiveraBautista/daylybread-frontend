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
import { shareSocial } from "ionicons/icons";
import { Share } from "@capacitor/share";

/* Components */
import PlatformHeader from "../../Header/Header";

/* Styles */
import "./NFC.scss";

/* Hooks */
import { useGetNFCConfig } from "../../../../hooks/NFCConfigHooks";
import { cash, personAdd, calendar } from "ionicons/icons";
import Tabs, { Tab } from "../../Tabs/Tabs";

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

  const tabs = (): Tab[] => {
    const tabsPrototype: Tab[] = [];

    if (nfcConfig?.getNFCConfig?.givingLink?.isVisible) {
      tabsPrototype.push({
        icon: cash,
        label: "Give",
        value: "give",
        onClick: handleCash,
      });
    }

    if (nfcConfig?.getNFCConfig?.memberRegistrationLink?.isVisible) {
      tabsPrototype.push({
        icon: personAdd,
        label: "New Member",
        value: "new-member",
        onClick: handleNewMember,
      });
    }

    if (nfcConfig?.getNFCConfig?.eventsLink?.isVisible) {
      tabsPrototype.push({
        icon: calendar,
        label: "Events",
        value: "events",
        onClick: handleEventLink,
      });
    }

    tabsPrototype.push({
      icon: shareSocial,
      label: "Share",
      value: "share",
      onClick: () => {
        Share.share({
          title: "Share with everyone!",
          // text: "Shar",
          url: nfcConfig?.getNFCConfig.mainButton.url,
        });
      },
    });

    return tabsPrototype;
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

                  {/* <NFCShare nfcConfig={nfcConfig?.getNFCConfig!} /> */}

                  <IonButton onClick={handleBlockButton}>
                    {nfcConfig?.getNFCConfig?.mainButton.text}
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          )}
        </div>

        <Tabs tabs={tabs()} />
      </IonContent>
    </IonPage>
  );
};

export default NFC;
