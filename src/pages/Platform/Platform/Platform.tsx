import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonCard,
  IonCardContent,
  IonButtons,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { Redirect, useHistory } from "react-router";
import "./Platform.scss";

/* Images */
import SmallWordLogo from "../../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../../assets/images/small-word-logo-dark.svg";

/* Context */
import { useAppContext } from "../../../context/context";
import { MediaUploader } from "../../../components/MediaUploader/MediaUploader";
import { MediaPurpose } from "../../../__generated__/graphql";

/* Hooks */
import {
  useCreateNFCConfig,
  useGetNFCConfigByOwner,
  useUpdateNFCConfig,
} from "../../../hooks/NFCConfigHooks";

/* Components */
import CheckingAuthentication from "../../../components/Auth/CheckingAuthentication";

interface NFCContent {
  type: "link" | "file";
  title: string;
  description: string;
  content: string;
}

const Platform: React.FC = () => {
  const { userInfo } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nfcContent, setNfcContent] = useState<NFCContent>({
    type: "link",
    title: "",
    description: "",
    content: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [getNFCConfigByOwner, { data: nfcConfigData }] =
    useGetNFCConfigByOwner();
  const [createNFCConfig] = useCreateNFCConfig();
  const [updateNFCConfig] = useUpdateNFCConfig();

  useEffect(() => {
    let tries = 0;
    const checkAuth = () => {
      const hasUserInfo = !!userInfo;

      if (tries > 3) {
        setIsAuthenticated(hasUserInfo);
        setIsLoading(false);
        return;
      }

      if (hasUserInfo) {
        setIsAuthenticated(true);
        setIsLoading(false);
        console.log("userInfo", userInfo);
        getNFCConfigByOwner({ variables: { ownerId: userInfo?._id! } });
        return;
      }

      tries++;
    };

    setTimeout(() => {
      checkAuth();
    }, 1500);
  }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (nfcConfigData) {
      setIsUpdating(true);
      setNfcContent({
        type: "link",
        title: nfcConfigData.getNFCConfigByOwner.title,
        description: nfcConfigData.getNFCConfigByOwner.description,
        content: nfcConfigData.getNFCConfigByOwner.url,
      });
      return;
    }
    setIsUpdating(false);
  }, [nfcConfigData]);
  const handleTryMe = () => {
    const currentDomain = window.location.hostname
      .split(".")
      .slice(-2)
      .join(".");
    const newUrl = `https://bible.${currentDomain}`;
    window.location.href = newUrl;
  };

  const handleSave = async () => {
    try {
      if (!userInfo?._id) {
        throw new Error("User not authenticated");
      }

      // Validate required fields
      if (!nfcContent.title.trim()) {
        throw new Error("Title is required");
      }
      if (!nfcContent.description.trim()) {
        throw new Error("Description is required");
      }
      if (!nfcContent.content.trim()) {
        throw new Error("URL is required");
      }

      setIsSaving(true);
      const nfcConfig = nfcConfigData?.getNFCConfigByOwner;
      const configData = {
        title: nfcContent.title.trim(),
        description: nfcContent.description.trim(),
        url: nfcContent.content.trim(),
      };

      if (nfcConfig) {
        // Update existing config
        const { data: updateData } = await updateNFCConfig({
          variables: {
            id: nfcConfig._id,
            options: configData,
          },
        });

        if (updateData?.updateNFCConfig.errors) {
          throw new Error(updateData.updateNFCConfig.errors[0].message);
        }
      } else {
        // Create new config
        const { data: createData } = await createNFCConfig({
          variables: {
            options: configData,
          },
        });

        if (createData?.createNFCConfig.errors) {
          throw new Error(createData.createNFCConfig.errors[0].message);
        }
      }

      setToastMessage("NFC config saved successfully");
      setShowToast(true);
    } catch (error) {
      console.error("Error saving NFC config:", error);
      setToastMessage(
        error instanceof Error ? error.message : "Failed to save NFC config"
      );
      setShowToast(true);
    } finally {
      setIsSaving(false);
    }
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
                      {/* <IonSelectOption value="file">File</IonSelectOption> */}
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

                  {nfcContent.type === "link" ? (
                    <IonItem>
                      <IonLabel position="stacked">
                        {nfcContent.type === "link" ? "URL" : "File"}
                      </IonLabel>
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
                    </IonItem>
                  ) : (
                    <MediaUploader
                      purpose={MediaPurpose.Other}
                      onUploadSuccess={(mediaId, url) => {
                        setNfcContent({ ...nfcContent, content: url });
                      }}
                    />
                  )}

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
                    {isSaving && <IonSpinner name="crescent" />}
                    {isUpdating ? "Update NFC Content" : "Save NFC Content"}
                  </IonButton>
                  {/* <IonButton
                    expand="block"
                    color="light"
                    className="platform-save-button"
                    // onClick={handlePreview}
                  >
                    Preview
                  </IonButton> */}
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </>
    );
  };

  if (isLoading) {
    return <CheckingAuthentication />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <MainApp />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        position="bottom"
      />
    </IonPage>
  );
};

export default Platform;
