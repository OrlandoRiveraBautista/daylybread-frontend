import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonText,
  IonLabel,
  IonBadge,
  IonChip,
  IonAlert,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import {
  create,
  qrCode,
  card,
  link,
  shareSocial,
  cart,
  trash,
  add,
  close,
} from "ionicons/icons";
import { HomeScreenEditor } from "../HomeScreenEditor";
import { TileConfig } from "../../NFC/iPhoneHomeScreen/types";
import "./HomeScreensList.scss";

export interface HomeScreen {
  _id: string;
  id: string;
  name?: string;
  shareableLink: string;
  status?: "active" | "inactive";
  createdAt: string;
  tapCount?: number;
  tiles?: TileConfig[];
  wallpaper?: string;
  nfcIds: string[];
}

export interface AvailableNFCDevice {
  _id: string;
  nfcId: string;
  name: string;
  deviceType?: string;
}

export interface AssignedNFCDevice {
  _id: string;
  nfcId: string;
  name: string;
  deviceType?: string;
  homeScreenId: string;
}

interface HomeScreensListProps {
  homeScreens?: HomeScreen[];
  availableNFCDevices?: AvailableNFCDevice[];
  assignedNFCDevices?: AssignedNFCDevice[];
  onSaveTiles: (
    deviceId: string,
    tiles: TileConfig[],
    wallpaper?: string,
    name?: string,
  ) => Promise<void>;
  onCreateHomeScreen: (
    name: string,
    tiles: TileConfig[],
    wallpaper?: string,
  ) => Promise<void>;
  onDelete: (deviceId: string) => void;
  isSaving: boolean;
  onAssignNFC?: (nfcDeviceId: string, homeScreenId: string) => Promise<void>;
  onUnassignNFC?: (nfcDeviceId: string) => Promise<void>;
  onShopNFC?: () => void;
}

export const HomeScreensList: React.FC<HomeScreensListProps> = ({
  homeScreens = [],
  availableNFCDevices = [],
  assignedNFCDevices = [],
  onSaveTiles,
  onCreateHomeScreen,
  onDelete,
  isSaving,
  onAssignNFC,
  onUnassignNFC,
  onShopNFC,
}) => {
  const [showHomeScreenEditor, setShowHomeScreenEditor] = useState(false);
  const [editingHomeScreen, setEditingHomeScreen] = useState<HomeScreen | null>(null);
  const [homeScreenToDelete, setHomeScreenToDelete] = useState<HomeScreen | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Sync editingHomeScreen with homeScreens prop when it updates (after save)
  useEffect(() => {
    if (editingHomeScreen && homeScreens.length > 0) {
      const homeScreenId = editingHomeScreen._id || editingHomeScreen.id;
      const updatedHomeScreen = homeScreens.find(
        (hs) => hs._id === homeScreenId || hs.id === homeScreenId,
      );
      if (updatedHomeScreen && updatedHomeScreen.tiles) {
        // Only update if tiles exist (meaning data was fetched from server)
        setEditingHomeScreen(updatedHomeScreen);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeScreens]);

  // Open home screen editor modal
  const handleEditHomeScreen = (homeScreen: HomeScreen) => {
    setEditingHomeScreen(homeScreen);
    setShowHomeScreenEditor(true);
  };

  const handleSaveTiles = async (
    tiles: TileConfig[],
    wallpaper?: string,
    name?: string,
  ) => {
    const homeScreenId = editingHomeScreen?._id ?? editingHomeScreen?.id;

    if (homeScreenId) {
      // Update existing home screen
      await onSaveTiles(homeScreenId, tiles, wallpaper, name);

      // Update editingHomeScreen with saved data immediately
      // This ensures if modal is reopened immediately, it shows the saved data
      if (editingHomeScreen) {
        setEditingHomeScreen({
          ...editingHomeScreen,
          tiles,
          wallpaper,
          name: name || editingHomeScreen.name,
        });
      }
    } else {
      // Create new home screen
      await onCreateHomeScreen(name || "New Home Screen", tiles, wallpaper);
    }
    setShowHomeScreenEditor(false);
  };

  const getHomeScreenUrl = (homeScreen: HomeScreen) => {
    const shareableLink = homeScreen.shareableLink || homeScreen._id;
    const { hostname, protocol, port } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `${window.location.origin}/nfc?hs=${shareableLink}`;
    }
    const parts = hostname.split(".");
    parts[0] = "nfc";
    const nfcHost = parts.join(".");
    const portSuffix = port ? `:${port}` : "";
    return `${protocol}//${nfcHost}${portSuffix}/?hs=${shareableLink}`;
  };

  const handleDeleteClick = (homeScreen: HomeScreen) => {
    setHomeScreenToDelete(homeScreen);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    if (homeScreenToDelete) {
      const homeScreenId = homeScreenToDelete._id || homeScreenToDelete.id;
      if (homeScreenId) {
        try {
          await onDelete(homeScreenId);
          setHomeScreenToDelete(null);
        } catch (error) {
          console.error("Error deleting home screen:", error);
        }
      }
    }
    setShowDeleteAlert(false);
  };

  return (
    <div className="home-screens-container">
      <div className="screens-header">
        <div>
          <h1>Home Screens</h1>
          <p>
            Create multiple home screens and share them via link instantly.
            Design custom layouts for different purposes.
          </p>
        </div>
      </div>

      {homeScreens.length === 0 ? (
        <IonCard className="empty-state-card">
          <IonCardContent>
            <div className="empty-state">
              <IonIcon icon={qrCode} className="empty-state-icon" />
              <h2>Create Your First Home Screen</h2>
              <p>
                Design home screen layouts and share them via link instantly.
                Add NFC tags to enable tap-to-access functionality.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "16px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <IonButton
                  shape="round"
                  color="primary"
                  onClick={() => setShowHomeScreenEditor(true)}
                >
                  <IonIcon slot="start" icon={create} />
                  Create Home Screen
                </IonButton>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      ) : (
        <div className="devices-grid">
          {/* New Home Screen Card */}
          <IonCard
            className="device-card new-home-screen-card"
            onClick={() => {
              setEditingHomeScreen(null);
              setShowHomeScreenEditor(true);
            }}
            button
          >
            <IonCardContent>
              <div className="new-home-screen-content">
                <IonIcon icon={add} className="add-icon" />
                <span>New Home Screen</span>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Existing Home Screens */}
          {homeScreens.map((homeScreen) => (
            <IonCard key={homeScreen._id} className="device-card">
              <IonCardHeader>
                <div className="device-card-header">
                  <div className="device-info">
                    <IonCardTitle>{homeScreen.name || "Home Screen"}</IonCardTitle>
                    <div className="device-meta">
                      <IonBadge
                        color={
                          homeScreen.status === "active" ? "success" : "medium"
                        }
                      >
                        {homeScreen.status || "active"}
                      </IonBadge>
                      <IonChip color="primary">
                        <IonIcon icon={link} />
                        <IonLabel>Shareable Link</IonLabel>
                      </IonChip>
                      {homeScreen.nfcIds.length > 0 ? (
                        <IonChip color="secondary">
                          <IonIcon icon={card} />
                          <IonLabel>
                            {homeScreen.nfcIds.length} NFC Tag
                            {homeScreen.nfcIds.length !== 1 ? "s" : ""}
                          </IonLabel>
                        </IonChip>
                      ) : (
                        <IonChip color="medium" outline>
                          <IonIcon icon={card} />
                          <IonLabel>No NFC Tags</IonLabel>
                        </IonChip>
                      )}
                    </div>
                  </div>
                  <div className="device-actions">
                    <IonButton
                      fill="clear"
                      shape="round"
                      color="primary"
                      onClick={() => handleEditHomeScreen(homeScreen)}
                    >
                      <IonIcon slot="icon-only" icon={create} />
                    </IonButton>
                    <IonButton
                      fill="clear"
                      shape="round"
                      color="danger"
                      onClick={() => handleDeleteClick(homeScreen)}
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonButton>
                  </div>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <div className="device-stats">
                  <div className="stat-item">
                    <IonText color="medium">Tiles</IonText>
                    <strong>{homeScreen.tiles?.length || 0}</strong>
                  </div>
                  <div className="stat-item">
                    <IonText color="medium">Created</IonText>
                    <strong>
                      {homeScreen.createdAt
                        ? new Date(
                            Number(homeScreen.createdAt),
                          ).toLocaleDateString()
                        : "—"}
                    </strong>
                  </div>
                  <div className="stat-item">
                    <IonText color="medium">Taps</IonText>
                    <strong>{homeScreen.tapCount || 0}</strong>
                  </div>
                </div>

                {homeScreen.nfcIds.length === 0 ? (
                  <div
                    style={{
                      background: "var(--ion-color-light)",
                      padding: "12px",
                      borderRadius: "12px",
                      marginBottom: "12px",
                      textAlign: "center",
                    }}
                  >
                    <IonText color="medium" style={{ fontSize: "13px" }}>
                      <IonIcon
                        icon={card}
                        style={{ verticalAlign: "middle", marginRight: "4px" }}
                      />
                      No NFC devices assigned
                    </IonText>
                  </div>
                ) : (
                  <div
                    style={{
                      background: "var(--ion-color-success-tint)",
                      padding: "12px",
                      borderRadius: "12px",
                      marginBottom: "12px",
                      textAlign: "center",
                    }}
                  >
                    <IonText
                      color="success"
                      style={{ fontSize: "13px", fontWeight: "500" }}
                    >
                      <IonIcon
                        icon={card}
                        style={{ verticalAlign: "middle", marginRight: "4px" }}
                      />
                      {homeScreen.nfcIds.length} NFC device
                      {homeScreen.nfcIds.length !== 1 ? "s" : ""} connected
                    </IonText>
                  </div>
                )}

                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
                >
                  <IonButton
                    expand="block"
                    fill="solid"
                    shape="round"
                    color="primary"
                    href={getHomeScreenUrl(homeScreen)}
                    target="_blank"
                    style={{ flex: 1 }}
                  >
                    <IonIcon slot="start" icon={shareSocial} />
                    Open
                  </IonButton>
                  <IonButton
                    fill="outline"
                    shape="round"
                    color="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(getHomeScreenUrl(homeScreen));
                      // TODO: Show toast notification
                    }}
                  >
                    <IonIcon slot="icon-only" icon={link} />
                  </IonButton>
                </div>

                {/* Show assigned NFC devices */}
                {(() => {
                  const homeScreenId = homeScreen._id || homeScreen.id;
                  const assignedToThisScreen = assignedNFCDevices.filter(
                    (nfc) => nfc.homeScreenId === homeScreenId,
                  );

                  return assignedToThisScreen.length > 0 ? (
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                      {assignedToThisScreen.map((nfcDevice) => (
                        <div
                          key={nfcDevice._id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "8px 12px",
                            background: "var(--ion-color-light)",
                            borderRadius: "8px",
                            marginBottom: "4px",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <IonText
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              {nfcDevice.name}
                            </IonText>
                            <br />
                            <IonText
                              color="medium"
                              style={{ fontSize: "12px" }}
                            >
                              {nfcDevice.nfcId.slice(0, 12)}...
                            </IonText>
                          </div>
                          {onUnassignNFC && (
                            <IonButton
                              fill="clear"
                              size="small"
                              color="medium"
                              onClick={() => onUnassignNFC(nfcDevice._id)}
                            >
                              <IonIcon slot="icon-only" icon={close} />
                            </IonButton>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null;
                })()}

                {/* Show selector for available NFC devices or shop button */}
                {availableNFCDevices.length > 0 ? (
                  <div style={{ marginTop: "8px" }}>
                    <IonSelect
                      interface="action-sheet"
                      placeholder="Assign NFC Device"
                      onIonChange={(e) => {
                        const nfcDeviceId = e.detail.value;
                        if (nfcDeviceId && onAssignNFC) {
                          const homeScreenId = homeScreen._id || homeScreen.id;
                          if (homeScreenId) {
                            onAssignNFC(nfcDeviceId, homeScreenId);
                          }
                        }
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid var(--ion-color-medium)",
                        borderRadius: "12px",
                      }}
                    >
                      {availableNFCDevices.map((nfcDevice) => (
                        <IonSelectOption
                          key={nfcDevice._id}
                          value={nfcDevice._id}
                        >
                          {nfcDevice.name} ({nfcDevice.nfcId.slice(0, 8)}...)
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </div>
                ) : (
                  (() => {
                    const homeScreenId = homeScreen._id || homeScreen.id;
                    const assignedToThisScreen = assignedNFCDevices.filter(
                      (nfc) => nfc.homeScreenId === homeScreenId,
                    );
                    return assignedToThisScreen.length === 0 && onShopNFC ? (
                      <IonButton
                        expand="block"
                        fill="clear"
                        shape="round"
                        color="medium"
                        size="small"
                        onClick={onShopNFC}
                      >
                        <IonIcon slot="start" icon={cart} />
                        Shop NFC Tags
                      </IonButton>
                    ) : null;
                  })()
                )}
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      )}

      {/* Home Screen Editor Modal */}
      <HomeScreenEditor
        tiles={editingHomeScreen?.tiles || []}
        wallpaper={editingHomeScreen?.wallpaper}
        title={editingHomeScreen?.name}
        isOpen={showHomeScreenEditor}
        isSaving={isSaving}
        onClose={() => {
          setShowHomeScreenEditor(false);
          // Clear editingHomeScreen when modal closes
          setTimeout(() => {
            setEditingHomeScreen(null);
          }, 300); // Small delay to allow modal close animation
        }}
        onSave={handleSaveTiles}
      />

      {/* Delete Confirmation Alert */}
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => {
          setShowDeleteAlert(false);
          setHomeScreenToDelete(null);
        }}
        header="Delete Home Screen"
        message={`Are you sure you want to delete "${homeScreenToDelete?.name || "this home screen"}"? This action cannot be undone.`}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Delete",
            role: "destructive",
            handler: handleConfirmDelete,
          },
        ]}
      />
    </div>
  );
};
