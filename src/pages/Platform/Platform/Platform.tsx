import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonToast } from "@ionic/react";
import { Redirect } from "react-router";
import "./Platform.scss";

/* Context */
import { useAppContext } from "../../../context/context";

/* Hooks */
import {
  useCreateNFCConfig,
  useGetNFCConfigByOwner,
  useUpdateNFCConfig,
} from "../../../hooks/NFCConfigHooks";

/* Components */
import CheckingAuthentication from "../../../components/Auth/CheckingAuthentication";
import { PlatformHeader } from "../../../components/Platform/PlatformHeader";
import { NFCConfigForm } from "../../../components/Platform/NFCConfigForm";

const Platform: React.FC = () => {
  const { userInfo } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleSave = async (formData: {
    title: string;
    description: string;
    url: string;
  }) => {
    try {
      if (!userInfo?._id) {
        throw new Error("User not authenticated");
      }

      setIsSaving(true);
      const nfcConfig = nfcConfigData?.getNFCConfigByOwner;

      if (nfcConfig) {
        // Update existing config
        const { data: updateData } = await updateNFCConfig({
          variables: {
            id: nfcConfig._id,
            options: formData,
          },
        });

        if (updateData?.updateNFCConfig.errors) {
          throw new Error(updateData.updateNFCConfig.errors[0].message);
        }
      } else {
        // Create new config
        const { data: createData } = await createNFCConfig({
          variables: {
            options: formData,
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

  if (isLoading) {
    return <CheckingAuthentication />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <PlatformHeader onTryMe={handleTryMe} />
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
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        position="bottom"
      />
    </IonPage>
  );
};

export default Platform;
