import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonToast } from "@ionic/react";
import { Redirect } from "react-router";
import "./Platform.scss";

/* Context */
import { useAppContext } from "../../../context/context";

/* Hooks */
import { useToast } from "../../../hooks/useToast";
import { useNFCConfig } from "../../../hooks/useNFCConfig";

/* Components */
import CheckingAuthentication from "../../../components/Auth/CheckingAuthentication";
import Header from "../Header/Header";
import { NFCConfigForm } from "../../../components/Platform/NFCConfigForm";

const Platform: React.FC = () => {
  const { userInfo } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { showToast, toastMessage, toastOptions, show, hide } = useToast();
  const { nfcConfigData, isSaving, isUpdating, fetchConfig, saveConfig } =
    useNFCConfig(userInfo?._id!);

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
        fetchConfig();
        return;
      }

      tries++;
    };

    setTimeout(() => {
      checkAuth();
    }, 1500);
  }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async (formData: {
    title: string;
    description: string;
    mainButton: {
      url: string;
      text: string;
    };
  }) => {
    try {
      if (!userInfo?._id) {
        throw new Error("User not authenticated");
      }

      await saveConfig(formData);
      show("NFC config saved successfully");
    } catch (error) {
      console.error("Error saving NFC config:", error);
      show(
        error instanceof Error ? error.message : "Failed to save NFC config"
      );
    }
  };

  if (isLoading) {
    return <CheckingAuthentication />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <Header />
      <IonContent
        className="ion-padding"
        style={{ "--background": "var(--ion-background-color)" }}
      >
        <div className="platform-content-container">
          <NFCConfigForm
            initialData={nfcConfigData?.getNFCConfigByOwner}
            onSave={handleSave}
            isSaving={isSaving}
            isUpdating={isUpdating}
          />
        </div>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={hide}
        message={toastMessage}
        duration={toastOptions.duration}
        position={toastOptions.position}
      />
    </IonPage>
  );
};

export default Platform;
