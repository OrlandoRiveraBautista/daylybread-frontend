import React, { useState, useEffect } from "react";
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
  IonSpinner,
} from "@ionic/react";
import { Redirect, Route, Switch, useHistory } from "react-router";
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
  const history = useHistory();
  const { userInfo } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nfcContent, setNfcContent] = useState<NFCContent>({
    type: "link",
    title: "",
    description: "",
    content: "",
  });

  useEffect(() => {
    let tries = 0;
    const checkAuth = () => {
      const hasUserInfo = !!userInfo;

      if (tries > 10) {
        setIsAuthenticated(hasUserInfo);
        setIsLoading(false);
        return;
      }

      if (hasUserInfo) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      tries++;
    };

    setTimeout(() => {
      checkAuth();
    }, 1500);

    // Set up an interval to check periodically
    const intervalId = setInterval(checkAuth, 1500);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userInfo]);

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

  const MainApp: React.FC = () => {
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

  if (isLoading) {
    return (
      <IonPage>
        <div className="platform-loading">
          <IonSpinner name="crescent" />

          <IonText>Checking authentication...</IonText>
          {/* Go to signup button */}
          <IonButton
            shape="round"
            color="light"
            onClick={(e) => {
              e.preventDefault();
              history.push("/signup");
            }}
          >
            <IonText>
              <b>
                Don&apos;t have an account? <u>Sign up</u>
              </b>
            </IonText>
          </IonButton>
        </div>
      </IonPage>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <MainApp />
    </IonPage>
  );
};

export default Platform;
