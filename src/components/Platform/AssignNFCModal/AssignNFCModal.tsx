import React, { useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonBadge,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { close, card, checkmarkCircle, cart } from "ionicons/icons";
import { NFCDeviceConfig } from "../NFCDevicesManagement/NFCDevicesManagement";
import "./AssignNFCModal.scss";

interface AssignNFCModalProps {
  isOpen: boolean;
  onClose: () => void;
  homeScreenId: string;
  homeScreenName: string;
  availableDevices: NFCDeviceConfig[];
  onAssign: (nfcId: string, homeScreenId: string) => Promise<void>;
  onShopNFCTags: () => void;
}

export const AssignNFCModal: React.FC<AssignNFCModalProps> = ({
  isOpen,
  onClose,
  homeScreenId,
  homeScreenName,
  availableDevices,
  onAssign,
  onShopNFCTags,
}) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssign = async () => {
    if (!selectedDeviceId) return;

    setIsAssigning(true);
    try {
      await onAssign(selectedDeviceId, homeScreenId);
      setSelectedDeviceId(null);
      onClose();
    } catch (error) {
      console.error("Error assigning NFC device:", error);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleClose = () => {
    setSelectedDeviceId(null);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Assign NFC Device</IonTitle>
          <IonButton slot="end" fill="clear" onClick={handleClose}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="assign-nfc-modal-content">
        <div className="modal-header-info">
          <h3>Assign to: {homeScreenName}</h3>
          <p>
            Select an available NFC device to link with this home screen.
            When someone taps the NFC device, they'll be directed to this home screen.
          </p>
        </div>

        {availableDevices.length === 0 ? (
          <IonCard className="empty-state-card">
            <IonCardContent>
              <div className="empty-state">
                <IonIcon icon={cart} className="empty-state-icon" />
                <h2>No Available NFC Devices</h2>
                <p>
                  You don't have any unassigned NFC devices yet. Shop for NFC tags
                  to enable tap-to-access functionality for your home screens.
                </p>
                <IonButton
                  shape="round"
                  color="primary"
                  onClick={() => {
                    onShopNFCTags();
                    handleClose();
                  }}
                >
                  <IonIcon slot="start" icon={cart} />
                  Shop NFC Tags
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        ) : (
          <>
            <IonList>
              {availableDevices.map((device) => (
                <IonItem
                  key={device._id}
                  button
                  onClick={() => setSelectedDeviceId(device._id)}
                  className={selectedDeviceId === device._id ? "selected" : ""}
                >
                  <IonIcon icon={card} slot="start" color="primary" />
                  <IonLabel>
                    <h2>{device.name}</h2>
                    <p>
                      ID: {device.nfcId.slice(0, 12)}...
                      {device.deviceType && ` • ${device.deviceType}`}
                    </p>
                  </IonLabel>
                  {selectedDeviceId === device._id && (
                    <IonIcon
                      icon={checkmarkCircle}
                      slot="end"
                      color="success"
                    />
                  )}
                </IonItem>
              ))}
            </IonList>

            <div className="modal-actions">
              <IonButton
                expand="block"
                shape="round"
                color="primary"
                onClick={handleAssign}
                disabled={!selectedDeviceId || isAssigning}
              >
                {isAssigning ? "Assigning..." : "Assign Device"}
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                shape="round"
                color="medium"
                onClick={handleClose}
              >
                Cancel
              </IonButton>
            </div>

            <div className="shop-link">
              <IonText color="medium">
                <p>
                  Need more NFC devices?{" "}
                  <span
                    className="link-text"
                    onClick={() => {
                      onShopNFCTags();
                      handleClose();
                    }}
                  >
                    Shop NFC Tags
                  </span>
                </p>
              </IonText>
            </div>
          </>
        )}
      </IonContent>
    </IonModal>
  );
};
