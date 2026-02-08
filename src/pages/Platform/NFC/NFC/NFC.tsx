import React, { useState } from "react";
import { IonPage, IonSpinner, IonButton, IonIcon, IonToast } from "@ionic/react";
import { save, close, create } from "ionicons/icons";

/* Components */
import { IPhoneHomeScreen } from "../../../../components/NFC/iPhoneHomeScreen";
import { TileConfig } from "../../../../components/NFC/iPhoneHomeScreen/types";

/* Styles */
import "./NFC.scss";

/* Hooks */
import { useAppContext } from "../../../../context/context";
import { useNFCPageData } from "../../../../hooks/useNFCPageData";
import { useNFCEditMode } from "../../../../hooks/useNFCEditMode";

/**
 * Public NFC page that displays an iPhone-style home screen
 * Accessed via /nfc?id=xxx or nfc.subdomain.com?id=xxx
 */
const NFC: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id") || "";
  
  const { userInfo } = useAppContext();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch and transform NFC data
  const { nfcConfig, tiles, wallpaper, loading, refetch } = useNFCPageData(id);

  // Edit mode management
  const {
    isEditMode,
    isOwner,
    currentTiles,
    currentWallpaper,
    isSaving,
    setCurrentTiles,
    saveTiles,
    enterEditMode,
    exitEditMode,
  } = useNFCEditMode({
    homeScreenId: nfcConfig?.homeScreen?._id,
    initialTiles: tiles,
    initialWallpaper: wallpaper,
    ownerId: nfcConfig?.owner?._id,
    currentUserId: userInfo?._id,
    onSaveSuccess: async () => {
      setToastMessage("Changes saved successfully!");
      setShowToast(true);
      await refetch();
    },
    onSaveError: (error) => {
      setToastMessage(`Failed to save: ${error}`);
      setShowToast(true);
    },
  });

  // Handle tile click
  const handleTileClick = (tile: TileConfig) => {
    if (tile.url && tile.url !== "#") {
      window.location.href = tile.url;
    }
  };

  return (
    <IonPage id="nfc-page" className="nfc-homescreen-page">
      {loading ? (
        <div className="nfc-loading">
          <IonSpinner name="crescent" />
        </div>
      ) : (
        <>
          {/* Edit Mode Controls */}
          {isEditMode && (
            <div className="nfc-edit-controls">
              <IonButton 
                fill="solid" 
                shape="round"
                color="primary" 
                onClick={saveTiles}
                disabled={isSaving}
              >
                <IonIcon slot="start" icon={save} />
                {isSaving ? "Saving..." : "Save Changes"}
              </IonButton>
              <IonButton 
                fill="outline" 
                shape="round"
                color="medium" 
                onClick={exitEditMode}
                disabled={isSaving}
              >
                <IonIcon slot="start" icon={close} />
                Exit Edit Mode
              </IonButton>
            </div>
          )}
          
          {/* Edit Page Button (when owner is viewing but not editing) */}
          {!isEditMode && isOwner && (
            <div className="nfc-owner-controls">
              <IonButton 
                fill="solid" 
                shape="round"
                color="primary" 
                onClick={enterEditMode}
                size="small"
              >
                <IonIcon slot="start" icon={create} />
                Edit Page
              </IonButton>
            </div>
          )}
          
          <IPhoneHomeScreen
            tiles={currentTiles}
            wallpaper={currentWallpaper}
            isEditMode={isEditMode}
            onTileClick={handleTileClick}
            onTilesChange={setCurrentTiles}
            showStatusBar={true}
            showDock={true}
          />
          
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={3000}
            position="top"
          />
        </>
      )}
    </IonPage>
  );
};

export default NFC;
