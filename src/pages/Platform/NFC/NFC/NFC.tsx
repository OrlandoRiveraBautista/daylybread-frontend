import React, { useMemo, useState, useEffect } from "react";
import { IonPage, IonSpinner, IonButton, IonIcon, IonToast } from "@ionic/react";
import { save, close, create } from "ionicons/icons";

/* Components */
import { IPhoneHomeScreen } from "../../../../components/NFC/iPhoneHomeScreen";
import {
  TileConfig,
  TileType,
  TileSize,
  getDefaultTiles,
} from "../../../../components/NFC/iPhoneHomeScreen/types";

/* Styles */
import "./NFC.scss";

/* Hooks */
import { useGetNFCConfig, useUpdateNFCTiles } from "../../../../hooks/NFCConfigHooks";
import { useAppContext } from "../../../../context/context";

/**
 * Public NFC page that displays an iPhone-style home screen
 * Accessed via /nfc?id=xxx or nfc.subdomain.com?id=xxx
 */
// Extended type until codegen is run with updated backend schema
interface NFCConfigExtended {
  _id: string;
  type: string;
  title: string;
  description: string;
  owner?: { _id: string };
  mainButton?: { url?: string; text?: string };
  socialMedia?: { facebook?: boolean; instagram?: boolean; twitter?: boolean };
  givingLink?: { isVisible?: boolean; url?: string };
  memberRegistrationLink?: { isVisible?: boolean; url?: string };
  eventsLink?: { isVisible?: boolean; url?: string };
  tiles?: TileConfig[];
  wallpaper?: string;
}

const NFC: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id") || "";
  const isEditModeRequested = urlParams.get("edit") === "true";
  
  const { data: nfcConfigResults, loading, refetch } = useGetNFCConfig(id);
  const { userInfo } = useAppContext();
  const [updateTiles, { loading: isSaving }] = useUpdateNFCTiles();
  
  const [currentTiles, setCurrentTiles] = useState<TileConfig[]>([]);
  const [currentWallpaper, setCurrentWallpaper] = useState<string | undefined>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Cast to extended type to access tiles and wallpaper fields
  const nfcConfig = nfcConfigResults?.getNFCConfig?.results as NFCConfigExtended | undefined;
  
  // Check if the current user is the owner (admin) of this NFC config
  const isOwner = useMemo(() => {
    if (!userInfo?._id || !nfcConfig?.owner?._id) return false;
    return userInfo._id === nfcConfig.owner._id;
  }, [userInfo, nfcConfig]);
  
  // Only allow edit mode if user is the owner
  const isEditMode = isEditModeRequested && isOwner;

  // Convert legacy NFC config to tiles if tiles don't exist
  const tiles = useMemo((): TileConfig[] => {
    // If tiles exist, use them - transform to match TileConfig type
    if (nfcConfig?.tiles && nfcConfig.tiles.length > 0) {
      return nfcConfig.tiles.map((tile) => ({
        id: tile.id,
        type: tile.type as TileType,
        label: tile.label,
        icon: tile.icon,
        url: tile.url,
        size: tile.size as TileSize,
        position: tile.position,
        color: tile.color ?? undefined,
        subtitle: tile.subtitle ?? undefined,
        isInDock: tile.isInDock ?? undefined,
      }));
    }

    // Otherwise, generate tiles from legacy config
    const legacyTiles: TileConfig[] = [];
    let position = 0;

    // Main button as a large tile
    if (nfcConfig?.mainButton?.url) {
      legacyTiles.push({
        id: "main-button",
        type: "website",
        label: nfcConfig.mainButton.text || "Visit",
        icon: "globe-outline",
        url: nfcConfig.mainButton.url,
        size: "large",
        position: { x: 0, y: 0 },
        color: "#007AFF",
        subtitle: nfcConfig.description,
      });
      position = 2;
    }

    // Giving link
    if (nfcConfig?.givingLink?.isVisible && nfcConfig.givingLink.url) {
      legacyTiles.push({
        id: "giving",
        type: "give",
        label: "Give",
        icon: "heart-outline",
        url: nfcConfig.givingLink.url,
        size: "small",
        position: { x: legacyTiles.length % 4, y: position },
        color: "#34C759",
      });
    }

    // Member registration link
    if (
      nfcConfig?.memberRegistrationLink?.isVisible &&
      nfcConfig.memberRegistrationLink.url
    ) {
      legacyTiles.push({
        id: "newmember",
        type: "newmember",
        label: "New Here?",
        icon: "person-add-outline",
        url: nfcConfig.memberRegistrationLink.url,
        size: "small",
        position: { x: legacyTiles.length % 4, y: position },
        color: "#FF9500",
      });
    }

    // Events link
    if (nfcConfig?.eventsLink?.isVisible && nfcConfig.eventsLink.url) {
      legacyTiles.push({
        id: "events",
        type: "events",
        label: "Events",
        icon: "calendar-outline",
        url: nfcConfig.eventsLink.url,
        size: "small",
        position: { x: legacyTiles.length % 4, y: position },
        color: "#FF3B30",
      });
    }

    // Social media tiles
    if (nfcConfig?.socialMedia?.facebook) {
      legacyTiles.push({
        id: "facebook",
        type: "facebook",
        label: "Facebook",
        icon: "logo-facebook",
        url: "#", // Would need actual URL
        size: "small",
        position: { x: legacyTiles.length % 4, y: Math.floor(legacyTiles.length / 4) + position },
        color: "#1877F2",
        isInDock: true,
      });
    }

    if (nfcConfig?.socialMedia?.instagram) {
      legacyTiles.push({
        id: "instagram",
        type: "instagram",
        label: "Instagram",
        icon: "logo-instagram",
        url: "#", // Would need actual URL
        size: "small",
        position: { x: legacyTiles.length % 4, y: Math.floor(legacyTiles.length / 4) + position },
        color: "#E4405F",
        isInDock: true,
      });
    }

    if (nfcConfig?.socialMedia?.twitter) {
      legacyTiles.push({
        id: "twitter",
        type: "twitter",
        label: "Twitter",
        icon: "logo-twitter",
        url: "#", // Would need actual URL
        size: "small",
        position: { x: legacyTiles.length % 4, y: Math.floor(legacyTiles.length / 4) + position },
        color: "#1DA1F2",
        isInDock: true,
      });
    }

    // If still no tiles, return defaults
    if (legacyTiles.length === 0) {
      return getDefaultTiles();
    }

    return legacyTiles;
  }, [nfcConfig]);
  
  // Update current tiles and wallpaper when nfcConfig changes
  useEffect(() => {
    setCurrentTiles(tiles);
    setCurrentWallpaper(nfcConfig?.wallpaper);
  }, [tiles, nfcConfig]);

  // Handle tile click
  const handleTileClick = (tile: TileConfig) => {
    if (tile.url && tile.url !== "#") {
      window.location.href = tile.url;
    }
  };
  
  // Handle tiles change in edit mode
  const handleTilesChange = (updatedTiles: TileConfig[]) => {
    setCurrentTiles(updatedTiles);
  };
  
  // Handle save tiles
  const handleSaveTiles = async () => {
    if (!id) return;
    
    try {
      const result = await updateTiles({
        variables: {
          id,
          tiles: currentTiles.map((tile) => ({
            id: tile.id,
            type: tile.type,
            label: tile.label,
            icon: tile.icon,
            url: tile.url,
            size: tile.size,
            position: {
              x: tile.position.x,
              y: tile.position.y,
            },
            color: tile.color,
            subtitle: tile.subtitle,
            isInDock: tile.isInDock,
          })),
          wallpaper: currentWallpaper || null,
        },
      });
      
      // Check for errors in the response
      const errors = result.data?.updateNFCTiles?.errors;
      if (errors && errors.length > 0) {
        const errorMessage = errors.map((e: any) => e.message).join(", ");
        console.error("Error saving tiles:", errorMessage);
        setToastMessage(`Failed to save: ${errorMessage}`);
        setShowToast(true);
        return;
      }
      
      // Update local state with the saved data from the response
      const savedData = result.data?.updateNFCTiles?.results;
      if (savedData) {
        if (savedData.tiles) {
          setCurrentTiles(savedData.tiles as TileConfig[]);
        }
        if (savedData.wallpaper !== undefined) {
          setCurrentWallpaper(savedData.wallpaper || undefined);
        }
      }
      
      setToastMessage("Changes saved successfully!");
      setShowToast(true);
      await refetch();
    } catch (error) {
      console.error("Error saving tiles:", error);
      setToastMessage("Failed to save changes");
      setShowToast(true);
    }
  };
  
  // Handle exit edit mode
  const handleExitEditMode = () => {
    const baseUrl = window.location.href.split("?")[0];
    window.location.href = `${baseUrl}?id=${id}`;
  };
  
  // Handle enter edit mode
  const handleEnterEditMode = () => {
    const baseUrl = window.location.href.split("?")[0];
    window.location.href = `${baseUrl}?id=${id}&edit=true`;
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
                color="primary" 
                onClick={handleSaveTiles}
                disabled={isSaving}
              >
                <IonIcon slot="start" icon={save} />
                {isSaving ? "Saving..." : "Save Changes"}
              </IonButton>
              <IonButton 
                fill="outline" 
                color="medium" 
                onClick={handleExitEditMode}
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
                color="primary" 
                onClick={handleEnterEditMode}
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
            title={nfcConfig?.title}
            isEditMode={isEditMode}
            onTileClick={handleTileClick}
            onTilesChange={handleTilesChange}
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
