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
} from "@ionic/react";
import { create, qrCode, card } from "ionicons/icons";
import { HomeScreenEditor } from "../HomeScreenEditor";
import { TileConfig } from "../../NFC/iPhoneHomeScreen/types";
import { NFCDevice } from "../../../types/nfc.types";
import "./NFCDevicesList.scss";

interface NFCDevicesListProps {
  devices?: NFCDevice[];
  onSaveTiles: (
    deviceId: string,
    tiles: TileConfig[],
    wallpaper?: string,
  ) => Promise<void>;
  onDelete: (deviceId: string) => void;
  isSaving: boolean;
}

export const NFCDevicesList: React.FC<NFCDevicesListProps> = ({
  devices = [],
  onSaveTiles,
  onDelete,
  isSaving,
}) => {
  const [showHomeScreenEditor, setShowHomeScreenEditor] = useState(false);
  const [editingDevice, setEditingDevice] = useState<NFCDevice | null>(null);

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

  const handleSaveTiles = async (tiles: TileConfig[], wallpaper?: string) => {
    const deviceId = editingDevice?._id ?? editingDevice?.id;

    if (deviceId) {
      await onSaveTiles(deviceId, tiles, wallpaper);

      // Update editingDevice with saved data immediately
      // This ensures if modal is reopened immediately, it shows the saved data
      if (editingDevice) {
        setEditingDevice({
          ...editingDevice,
          tiles,
          wallpaper,
        });
      }
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

  return (
    <div className="nfc-devices-container">
      <div className="devices-header">
        <div>
          <h1>NFC Devices</h1>
          <p>Manage your organization's NFC devices and configurations</p>
        </div>
      </div>

      {devices.length === 0 ? (
        <IonCard className="empty-state-card">
          <IonCardContent>
            <div className="empty-state">
              <IonIcon icon={qrCode} className="empty-state-icon" />
              <h2>No NFC Devices Yet</h2>
              <p>
                Create your first NFC device configuration to get started with
                contactless engagement
              </p>
            </div>
          </IonCardContent>
        </IonCard>
      ) : (
        <div className="devices-grid">
          {devices.map((device) => (
            <IonCard key={device._id} className="device-card">
              <IonCardHeader>
                <div className="device-card-header">
                  <div className="device-info">
                    <IonCardTitle>
                      {device.name || `NFC Device ${device.id.slice(-6)}`}
                    </IonCardTitle>
                    <div className="device-meta">
                      <IonBadge
                        color={
                          device.status === "active" ? "success" : "medium"
                        }
                      >
                        {device.status || "active"}
                      </IonBadge>
                      {device.nfcIds.length > 0 && (
                        <IonChip>
                          <IonIcon icon={card} />
                          <IonLabel>
                            {device.nfcIds.length} NFC ID
                            {device.nfcIds.length !== 1 ? "s" : ""}
                          </IonLabel>
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
                  </div>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <div className="device-stats">
                  <div className="stat-item">
                    <IonText color="medium">Taps</IonText>
                    <strong>{device.tapCount || 0}</strong>
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
                    <IonText color="medium">Tiles</IonText>
                    <strong>{device.tiles?.length || 0}</strong>
                  </div>
                </div>

                <IonButton
                  expand="block"
                  fill="outline"
                  shape="round"
                  color="primary"
                  href={getDeviceUrl(device)}
                  target="_blank"
                >
                  <IonIcon slot="start" icon={qrCode} />
                  View NFC Page
                </IonButton>
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
    </div>
  );
};
