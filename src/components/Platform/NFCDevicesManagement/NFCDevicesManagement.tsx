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
  add, 
  link as linkIcon,
  qrCode 
} from "ionicons/icons";
import { NFCProducts } from "../NFCProducts";
import { NFCDevice } from "../../../types/nfc.types";
import "./NFCDevicesManagement.scss";

interface NFCDevicesManagementProps {
  devices?: NFCDevice[];
  onAssignToHomeScreen?: (nfcId: string, homeScreenId: string) => Promise<void>;
  onUnassign?: (nfcId: string) => Promise<void>;
  onDelete?: (nfcId: string) => Promise<void>;
  homeScreens?: NFCDevice[];
}

export const NFCDevicesManagement: React.FC<NFCDevicesManagementProps> = ({
  devices = [],
  onAssignToHomeScreen,
  onUnassign,
  onDelete,
  homeScreens = [],
}) => {
  const [showNFCProducts, setShowNFCProducts] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteClick = (nfcId: string) => {
    setDeviceToDelete(nfcId);
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

  // Get all NFC IDs from all home screens
  const getAllNFCDevices = () => {
    const nfcMap = new Map<string, { homeScreenName: string; homeScreenId: string }>();
    
    homeScreens.forEach((homeScreen) => {
      homeScreen.nfcIds?.forEach((nfcId) => {
        nfcMap.set(nfcId, {
          homeScreenName: homeScreen.name || "Unnamed Screen",
          homeScreenId: homeScreen.id || homeScreen._id || "",
        });
      });
    });

    return Array.from(nfcMap.entries()).map(([nfcId, info]) => ({
      nfcId,
      ...info,
    }));
  };

  const nfcDevices = getAllNFCDevices();

  return (
    <div className="nfc-devices-management-container">
      <div className="management-header">
        <div>
          <h1>NFC Devices</h1>
          <p>
            Manage your physical NFC tags and assign them to home screens.
            Shop for NFC products to expand your collection.
          </p>
        </div>
      </div>

      {nfcDevices.length === 0 ? (
        <IonCard className="empty-state-card">
          <IonCardContent>
            <div className="empty-state">
              <IonIcon icon={qrCode} className="empty-state-icon" />
              <h2>No NFC Devices Yet</h2>
              <p>
                Get started by shopping for NFC tags. Once you have them,
                you can assign them to your home screens for tap-to-access functionality.
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
                  onClick={() => setShowNFCProducts(true)}
                >
                  <IonIcon slot="start" icon={cart} />
                  Shop NFC Tags
                </IonButton>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      ) : (
        <div className="nfc-devices-grid">
          {/* Add NFC Device Card */}
          <IonCard
            className="nfc-device-card new-nfc-device-card"
            onClick={() => setShowNFCProducts(true)}
            button
          >
            <IonCardContent>
              <div className="new-nfc-device-content">
                <IonIcon icon={add} className="add-icon" />
                <span>Add NFC Device</span>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Existing NFC Devices */}
          {nfcDevices.map((device) => (
            <IonCard key={device.nfcId} className="nfc-device-card">
              <IonCardHeader>
                <div className="nfc-device-card-header">
                  <div className="nfc-device-info">
                    <IonCardTitle>NFC Tag</IonCardTitle>
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
                      onClick={() => handleDeleteClick(device.nfcId)}
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonButton>
                  </div>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <div className="nfc-device-stats">
                  <div className="stat-item">
                    <IonText color="medium">Assigned To</IonText>
                    <strong>{device.homeScreenName}</strong>
                  </div>
                </div>

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
                    Linked to {device.homeScreenName}
                  </IonText>
                </div>

                {onUnassign && (
                  <IonButton
                    expand="block"
                    fill="outline"
                    shape="round"
                    color="medium"
                    size="small"
                    onClick={() => onUnassign(device.nfcId)}
                  >
                    Unassign from Home Screen
                  </IonButton>
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
