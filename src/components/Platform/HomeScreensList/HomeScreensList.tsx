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
} from "@ionic/react";
import { create, qrCode, card, link, shareSocial, cart, trash, add } from "ionicons/icons";
import { HomeScreenEditor } from "../HomeScreenEditor";
import { TileConfig } from "../../NFC/iPhoneHomeScreen/types";
import { NFCDevice } from "../../../types/nfc.types";
import "./HomeScreensList.scss";

interface HomeScreensListProps {
  devices?: NFCDevice[];
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
  onManageNFC?: (device: NFCDevice) => void;
}

export const HomeScreensList: React.FC<HomeScreensListProps> = ({
  devices = [],
  onSaveTiles,
  onCreateHomeScreen,
  onDelete,
  isSaving,
  onManageNFC,
}) => {
  const [showHomeScreenEditor, setShowHomeScreenEditor] = useState(false);
  const [editingDevice, setEditingDevice] = useState<NFCDevice | null>(null);
  const [deviceToDelete, setDeviceToDelete] = useState<NFCDevice | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Sync editingDevice with devices prop when it updates (after save)
  useEffect(() => {
    if (editingDevice && devices.length > 0) {
      const deviceId = editingDevice._id || editingDevice.id;
      const updatedDevice = devices.find(
        (d) => d._id === deviceId || d.id === deviceId,
      );
      if (updatedDevice && updatedDevice.tiles) {
        // Only update if tiles exist (meaning data was fetched from server)
        setEditingDevice(updatedDevice);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devices]);

  // Open home screen editor modal
  const handleEditDevice = (device: NFCDevice) => {
    setEditingDevice(device);
    setShowHomeScreenEditor(true);
  };

  const handleSaveTiles = async (tiles: TileConfig[], wallpaper?: string, name?: string) => {
    const deviceId = editingDevice?._id ?? editingDevice?.id;

    if (deviceId) {
      // Update existing home screen
      await onSaveTiles(deviceId, tiles, wallpaper, name);

      // Update editingDevice with saved data immediately
      // This ensures if modal is reopened immediately, it shows the saved data
      if (editingDevice) {
        setEditingDevice({
          ...editingDevice,
          tiles,
          wallpaper,
          name: name || editingDevice.name,
        });
      }
    } else {
      // Create new home screen
      await onCreateHomeScreen(
        name || "New Home Screen",
        tiles,
        wallpaper,
      );
    }
    setShowHomeScreenEditor(false);
  };

  const getDeviceUrl = (device: NFCDevice) => {
    const configId = device.id;
    const { hostname, protocol, port } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `${window.location.origin}/nfc?id=${configId}`;
    }
    const parts = hostname.split(".");
    parts[0] = "nfc";
    const nfcHost = parts.join(".");
    const portSuffix = port ? `:${port}` : "";
    return `${protocol}//${nfcHost}${portSuffix}/?id=${configId}`;
  };

  const handleDeleteClick = (device: NFCDevice) => {
    setDeviceToDelete(device);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    if (deviceToDelete) {
      const deviceId = deviceToDelete._id || deviceToDelete.id;
      if (deviceId) {
        try {
          await onDelete(deviceId);
          setDeviceToDelete(null);
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

      {devices.length === 0 ? (
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
              setEditingDevice(null);
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
          {devices.map((device) => (
            <IonCard key={device._id} className="device-card">
              <IonCardHeader>
                <div className="device-card-header">
                  <div className="device-info">
                    <IonCardTitle>{device.name || "Home Screen"}</IonCardTitle>
                    <div className="device-meta">
                      <IonBadge
                        color={
                          device.status === "active" ? "success" : "medium"
                        }
                      >
                        {device.status || "active"}
                      </IonBadge>
                      <IonChip color="primary">
                        <IonIcon icon={link} />
                        <IonLabel>Shareable Link</IonLabel>
                      </IonChip>
                      {device.nfcIds.length > 0 ? (
                        <IonChip color="secondary">
                          <IonIcon icon={card} />
                          <IonLabel>
                            {device.nfcIds.length} NFC Tag
                            {device.nfcIds.length !== 1 ? "s" : ""}
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
                      onClick={() => handleEditDevice(device)}
                    >
                      <IonIcon slot="icon-only" icon={create} />
                    </IonButton>
                    <IonButton
                      fill="clear"
                      shape="round"
                      color="danger"
                      onClick={() => handleDeleteClick(device)}
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
                    <strong>{device.tiles?.length || 0}</strong>
                  </div>
                  <div className="stat-item">
                    <IonText color="medium">Created</IonText>
                    <strong>
                      {device.createdAt
                        ? new Date(
                            Number(device.createdAt),
                          ).toLocaleDateString()
                        : "—"}
                    </strong>
                  </div>
                  <div className="stat-item">
                    <IonText color="medium">Taps</IonText>
                    <strong>{device.tapCount || 0}</strong>
                  </div>
                </div>

                {device.nfcIds.length === 0 ? (
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
                      {device.nfcIds.length} NFC device
                      {device.nfcIds.length !== 1 ? "s" : ""} connected
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
                    href={getDeviceUrl(device)}
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
                      navigator.clipboard.writeText(getDeviceUrl(device));
                      // TODO: Show toast notification
                    }}
                  >
                    <IonIcon slot="icon-only" icon={link} />
                  </IonButton>
                </div>

                {onManageNFC && (
                  <IonButton
                    expand="block"
                    fill="clear"
                    shape="round"
                    color="medium"
                    size="small"
                    onClick={() => onManageNFC(device)}
                  >
                    <IonIcon
                      slot="start"
                      icon={device.nfcIds.length === 0 ? cart : card}
                    />
                    {device.nfcIds.length === 0
                      ? "Shop NFC Tags"
                      : "Manage NFC Devices"}
                  </IonButton>
                )}
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      )}

      {/* Home Screen Editor Modal */}
      <HomeScreenEditor
        tiles={editingDevice?.tiles || []}
        wallpaper={editingDevice?.wallpaper}
        title={editingDevice?.name}
        isOpen={showHomeScreenEditor}
        isSaving={isSaving}
        onClose={() => {
          setShowHomeScreenEditor(false);
          // Clear editingDevice when modal closes
          setTimeout(() => {
            setEditingDevice(null);
          }, 300); // Small delay to allow modal close animation
        }}
        onSave={handleSaveTiles}
      />

      {/* Delete Confirmation Alert */}
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => {
          setShowDeleteAlert(false);
          setDeviceToDelete(null);
        }}
        header="Delete Home Screen"
        message={`Are you sure you want to delete "${deviceToDelete?.name || "this home screen"}"? This action cannot be undone.`}
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
