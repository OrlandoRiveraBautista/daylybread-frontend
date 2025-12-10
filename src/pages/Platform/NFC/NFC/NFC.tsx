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
  const { data: nfcConfigResults, loading } = useGetNFCConfig(id);

  const handleBlockButton = () => {
    // Replace with your desired link
    window.location.href =
      nfcConfigResults?.getNFCConfig?.results?.mainButton.url! || "";
  };

  const handleCash = () => {
    // Replace with your desired link
    window.location.href =
      nfcConfigResults?.getNFCConfig?.results?.givingLink?.url || "";
  };

  const handleNewMember = () => {
    // Replace with your desired link
    window.location.href =
      nfcConfigResults?.getNFCConfig?.results?.memberRegistrationLink?.url ||
      "";
  };

  const handleEventLink = () => {
    // Replace with your desired link
    window.location.href =
      nfcConfigResults?.getNFCConfig?.results?.eventsLink?.url || "";
  };

  const tabs = (): Tab[] => {
    const tabsPrototype: Tab[] = [];
    const nfcConfig = nfcConfigResults?.getNFCConfig?.results;

    if (nfcConfig?.givingLink?.isVisible) {
      tabsPrototype.push({
        icon: cash,
        label: "Give",
        value: "give",
        onClick: handleCash,
      });
    }

    if (nfcConfig?.memberRegistrationLink?.isVisible) {
      tabsPrototype.push({
        icon: personAdd,
        label: "New Member",
        value: "new-member",
        onClick: handleNewMember,
      });
    }

    if (nfcConfig?.eventsLink?.isVisible) {
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
        const shareUrl = nfcConfig?.mainButton.url || window.location.href;
        const shareTitle = nfcConfig?.title || "Check this out!";
        const shareDescription = nfcConfig?.description || "";

        Share.share({
          title: shareTitle,
          text: `${shareTitle}\n\n${shareDescription}\n\n🔗 ${shareUrl}`,
          url: shareUrl,
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
                    {nfcConfigResults?.getNFCConfig?.results?.title}
                  </IonTitle>

                  <IonText color="medium" className="nfc-description">
                    <p>
                      {nfcConfigResults?.getNFCConfig?.results?.description}
                    </p>
                  </IonText>

                  {/* <NFCShare nfcConfig={nfcConfig?.getNFCConfig!} /> */}

                  <IonButton onClick={handleBlockButton}>
                    {nfcConfigResults?.getNFCConfig?.results?.mainButton.text}
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
