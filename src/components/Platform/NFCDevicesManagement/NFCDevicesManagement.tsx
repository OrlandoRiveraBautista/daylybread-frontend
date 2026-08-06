import React, { useState } from "react";
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
import {
  card,
  cart,
  trash,
  link as linkIcon,
  qrCode,
  checkmarkCircle,
  phonePortraitOutline,
} from "ionicons/icons";
import { NFCProducts } from "../NFCProducts";
import { AddCard } from "../AddCard";
import EmptyState from "../../EmptyState/EmptyState";
import { PageHeader } from "../PageHeader";
import "./NFCDevicesManagement.scss";

export interface NFCDeviceConfig {
  _id: string;
  nfcId: string;
  name: string;
  deviceType?: string;
  homeScreen?: {
    _id: string;
    name: string;
    shareableLink: string;
  };
  views: number;
  lastScannedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface NFCDevicesManagementProps {
  nfcDevices?: NFCDeviceConfig[];
  onAssignToHomeScreen?: (nfcId: string, homeScreenId: string) => Promise<void>;
  onUnassign?: (deviceId: string) => Promise<void>;
  onDelete?: (deviceId: string) => Promise<void>;
}

export const NFCDevicesManagement: React.FC<NFCDevicesManagementProps> = ({
  nfcDevices = [],
  onUnassign,
  onDelete,
}) => {
  const [showNFCProducts, setShowNFCProducts] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteClick = (deviceId: string) => {
    setDeviceToDelete(deviceId);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    if (deviceToDelete && onDelete) {
      try {
        await onDelete(deviceToDelete);
        setDeviceToDelete(null);
      } catch (error) {
        console.error("Error deleting NFC device:", error);
      }
    }
    setShowDeleteAlert(false);
  };

  return (
    <div className="devices-page-container">
      <PageHeader
        title="NFC Devices"
        subtitle="Manage your physical NFC tags and assign them to home screens. Shop for NFC products to expand your collection."
      />

      {nfcDevices.length === 0 ? (
        <EmptyState
          icon={qrCode}
          title="No NFC Devices Yet"
          description="Get started by shopping for NFC tags. Once you have them, you can assign them to your home screens for tap-to-access functionality."
          actionLabel="Shop NFC Tags"
          actionIcon={cart}
          onAction={() => setShowNFCProducts(true)}
        />
      ) : (
        <div className="devices-grid">
          <AddCard
            label="Add NFC Device"
            onClick={() => setShowNFCProducts(true)}
            color="primary"
            size="large"
            className="device-card"
          />

          {nfcDevices.map((device) => (
            <IonCard key={device._id} className="device-card">
              <IonCardHeader>
                <div className="device-card-header">
                  <div className="device-info">
                    <IonCardTitle>{device.name}</IonCardTitle>
                    <div className="device-meta">
                      <IonBadge color="success">Active</IonBadge>
                      <IonChip color="secondary">
                        <IonIcon icon={card} />
                        <IonLabel>ID: {device.nfcId.slice(0, 8)}...</IonLabel>
                      </IonChip>
                      {device.homeScreen ? (
                        <IonChip color="primary">
                          <IonIcon icon={phonePortraitOutline} />
                          <IonLabel>Assigned</IonLabel>
                        </IonChip>
                      ) : (
                        <IonChip color="medium" outline>
                          <IonIcon icon={phonePortraitOutline} />
                          <IonLabel>Unassigned</IonLabel>
                        </IonChip>
                      )}
                    </div>
                  </div>
                  <div className="device-actions">
                    <IonButton
                      fill="clear"
                      shape="round"
                      color="danger"
                      onClick={() => handleDeleteClick(device._id)}
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonButton>
                  </div>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <div className="device-stats">
                  <div className="stat-item">
                    <IonText color="medium">Type</IonText>
                    <strong>{device.deviceType || "NFC Tag"}</strong>
                  </div>
                  <div className="stat-item">
                    <IonText color="medium">Views</IonText>
                    <strong>{device.views}</strong>
                  </div>
                  <div className="stat-item">
                    <IonText color="medium">Created</IonText>
                    <strong>
                      {device.createdAt
                        ? new Date(
                            Number(device.createdAt) || device.createdAt,
                          ).toLocaleDateString()
                        : "—"}
                    </strong>
                  </div>
                </div>

                <div className="nfc-status-row">
                  {device.homeScreen ? (
                    <span className="nfc-status-tag nfc-status-tag--connected">
                      <IonIcon icon={checkmarkCircle} />
                      Linked to {device.homeScreen.name}
                    </span>
                  ) : (
                    <span className="nfc-status-tag nfc-status-tag--none">
                      <IonIcon icon={linkIcon} />
                      Not assigned to any home screen
                    </span>
                  )}
                </div>

                {device.homeScreen && onUnassign && (
                  <IonButton
                    expand="block"
                    fill="outline"
                    shape="round"
                    color="medium"
                    size="small"
                    onClick={() => onUnassign(device._id)}
                  >
                    Unassign from Home Screen
                  </IonButton>
                )}
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      )}

      <NFCProducts
        isOpen={showNFCProducts}
        onClose={() => setShowNFCProducts(false)}
        onSelectProduct={(productId) => {
          console.log("Selected product:", productId);
        }}
      />

      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => {
          setShowDeleteAlert(false);
          setDeviceToDelete(null);
        }}
        header="Remove NFC Device"
        message="Are you sure you want to remove this NFC device? This will unassign it from any home screens."
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Remove",
            role: "destructive",
            handler: handleConfirmDelete,
          },
        ]}
      />
    </div>
  );
};
