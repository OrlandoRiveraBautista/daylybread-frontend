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
  qrCode 
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
  onAssignToHomeScreen,
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
    <div className="nfc-devices-management-container">
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
        <div className="nfc-devices-grid">
          <AddCard
            label="Add NFC Device"
            onClick={() => setShowNFCProducts(true)}
            color="primary"
            className="nfc-device-card"
          />

          {/* Existing NFC Devices */}
          {nfcDevices.map((device) => (
            <IonCard key={device._id} className="nfc-device-card">
              <IonCardHeader>
                <div className="nfc-device-card-header">
                  <div className="nfc-device-info">
                    <IonCardTitle>{device.name}</IonCardTitle>
                    <div className="nfc-device-meta">
                      <IonBadge color="success">Active</IonBadge>
                      <IonChip color="secondary">
                        <IonIcon icon={card} />
                        <IonLabel>ID: {device.nfcId.slice(0, 8)}...</IonLabel>
                      </IonChip>
                    </div>
                  </div>
                  <div className="nfc-device-actions">
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
                <div className="nfc-device-stats">
                  <div className="stat-item">
                    <IonText color="medium">Type</IonText>
                    <strong>{device.deviceType || "NFC Tag"}</strong>
                  </div>
                  <div className="stat-item">
                    <IonText color="medium">Views</IonText>
                    <strong>{device.views}</strong>
                  </div>
                </div>

                {device.homeScreen ? (
                  <>
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
                          icon={linkIcon}
                          style={{ verticalAlign: "middle", marginRight: "4px" }}
                        />
                        Linked to {device.homeScreen.name}
                      </IonText>
                    </div>

                    {onUnassign && (
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
                  </>
                ) : (
                  <div
                    style={{
                      background: "var(--ion-color-medium-tint)",
                      padding: "12px",
                      borderRadius: "12px",
                      marginBottom: "12px",
                      textAlign: "center",
                    }}
                  >
                    <IonText
                      color="medium"
                      style={{ fontSize: "13px", fontWeight: "500" }}
                    >
                      Not assigned to any home screen
                    </IonText>
                  </div>
                )}
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      )}

      {/* NFC Products Modal */}
      <NFCProducts
        isOpen={showNFCProducts}
        onClose={() => setShowNFCProducts(false)}
        onSelectProduct={(productId) => {
          console.log("Selected product:", productId);
          // TODO: Handle product selection and NFC device registration
        }}
      />

      {/* Delete Confirmation Alert */}
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
