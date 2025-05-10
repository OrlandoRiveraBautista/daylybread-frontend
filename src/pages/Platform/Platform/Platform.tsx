import React, { useState } from "react";
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
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonRouterOutlet,
} from "@ionic/react";
import { Redirect, Route, Switch } from "react-router";
import "./Platform.scss";

/* Images */
import SmallWordLogo from "../../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../../assets/images/small-word-logo-dark.svg";

/* Context */
import { useAppContext } from "../../../context/context";
import Auth from "../../Auth/Auth";

interface NFCContent {
  type: "link" | "file";
  title: string;
  description: string;
  content: string;
}

const Platform: React.FC = () => {
  const { userInfo } = useAppContext();
  const [nfcContent, setNfcContent] = useState<NFCContent>({
    type: "link",
    title: "",
    description: "",
    content: "",
  });

  const handleTryMe = () => {
    const currentDomain = window.location.hostname
      .split(".")
      .slice(-2)
      .join(".");
    const newUrl = `https://bible.${currentDomain}`;
    window.location.href = newUrl;
  };

  const handleSave = () => {
    // TODO: Implement saving NFC content
    console.log("Saving NFC content:", nfcContent);
  };

  // Redirect to login if not authenticated
  if (!document.cookie.includes("refresh-token") && !userInfo) {
    console.log("Redirecting to login");
    return <Redirect to="/login" />;
  }

  const MainApp = () => {
    return (
      <>
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
          <div className="platform-content-container">
            <IonCard className="platform-card">
              <IonCardContent>
                <IonTitle className="platform-title">
                  NFC Tag Configuration
                </IonTitle>

                <div className="platform-form">
                  <IonItem>
                    <IonLabel position="stacked">Content Type</IonLabel>
                    <IonSelect
                      value={nfcContent.type}
                      onIonChange={(e) =>
                        setNfcContent({ ...nfcContent, type: e.detail.value })
                      }
                    >
                      <IonSelectOption value="link">Link</IonSelectOption>
                      <IonSelectOption value="file">File</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Title</IonLabel>
                    <IonInput
                      value={nfcContent.title}
                      onIonChange={(e) =>
                        setNfcContent({ ...nfcContent, title: e.detail.value! })
                      }
                      placeholder="Enter title for the NFC tag"
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Description</IonLabel>
                    <IonTextarea
                      value={nfcContent.description}
                      onIonChange={(e) =>
                        setNfcContent({
                          ...nfcContent,
                          description: e.detail.value!,
                        })
                      }
                      placeholder="Enter description for the NFC tag"
                      rows={3}
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">
                      {nfcContent.type === "link" ? "URL" : "File"}
                    </IonLabel>
                    {nfcContent.type === "link" ? (
                      <IonInput
                        type="url"
                        value={nfcContent.content}
                        onIonChange={(e) =>
                          setNfcContent({
                            ...nfcContent,
                            content: e.detail.value!,
                          })
                        }
                        placeholder="Enter URL"
                      />
                    ) : (
                      <IonButton
                        fill="clear"
                        onClick={() =>
                          document.getElementById("fileInput")?.click()
                        }
                      >
                        Choose File
                      </IonButton>
                    )}
                  </IonItem>

                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNfcContent({ ...nfcContent, content: file.name });
                      }
                    }}
                  />

                  <IonButton
                    expand="block"
                    size="large"
                    onClick={handleSave}
                    className="platform-save-button"
                  >
                    Save NFC Content
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </>
    );
  };

  return (
    <IonPage>
      {/* App Router */}
      <IonRouterOutlet animated={false}>
        {/* Switch needs to wrap all the routes */}
        {/* 
                  Anything inside of the switch can be used with the
                  useHistory hook, anything outside will now.
                 */}
        <Switch>
          <Route path="/">
            <MainApp />
          </Route>

          {/* Auth routes */}
          <Route path="/login">
            <Auth />
          </Route>
          <Route path="/signup">
            <Auth />
          </Route>
          <Route path="/signupupdateuser">
            <Auth />
          </Route>
        </Switch>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Platform;
