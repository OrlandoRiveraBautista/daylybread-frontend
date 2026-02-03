import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonText,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonContent,
  IonBadge,
  IonChip,
} from "@ionic/react";
import {
  // add, // used by Add Device - commented out for now
  create,
  trash,
  qrCode,
  link,
  checkmarkCircle,
  alertCircle,
} from "ionicons/icons";
import { NFCConfigForm } from "../NFCConfigForm";
import "./NFCDevicesList.scss";

interface NFCDevice {
  id?: string;
  _id: string;
  name: string;
  title: string;
  description: string;
  type: string;
  mainButton: {
    url: string;
    text: string;
  };
  socialMedia?: {
    facebook?: boolean;
    instagram?: boolean;
    twitter?: boolean;
  };
  givingLink?: {
    isVisible: boolean;
    url: string;
  } | null;
  memberRegistrationLink?: {
    isVisible: boolean;
    url: string;
  } | null;
  eventsLink?: {
    isVisible: boolean;
    url: string;
  } | null;
  status: "active" | "inactive";
  createdAt: string;
  tapCount?: number;
}

interface NFCDevicesListProps {
  devices?: NFCDevice[];
  onSave: (deviceId: string | null, data: any) => Promise<void>;
  onDelete: (deviceId: string) => void;
  isSaving: boolean;
}

export const NFCDevicesList: React.FC<NFCDevicesListProps> = ({
  devices = [],
  onSave,
  onDelete,
  isSaving,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState<NFCDevice | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  // Add Device - commented out for now
  // const handleAddDevice = () => {
  //   setEditingDevice(null);
  //   setShowModal(true);
  // };

  const handleEditDevice = (device: NFCDevice) => {
    setEditingDevice(device);
    setShowModal(true);
  };

  const handleSaveDevice = async (formData: any) => {
    await onSave(editingDevice?._id ?? editingDevice?.id ?? null, formData);
    setShowModal(false);
    setEditingDevice(null);
  };

  const handleDeleteDevice = (deviceId: string) => {
    onDelete(deviceId);
    setShowDeleteConfirm(null);
  };

  const getDeviceUrl = (device: NFCDevice) => {
    console.log(device);
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
        {/* Add Device - commented out for now
        <IonButton size="large" onClick={handleAddDevice}>
          <IonIcon slot="start" icon={add} />
          Add Device
        </IonButton>
        */}
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
              {/* Add Device - commented out for now
              <IonButton size="large" onClick={handleAddDevice}>
                <IonIcon slot="start" icon={add} />
                Create First Device
              </IonButton>
              */}
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
                    <IonCardTitle>{device.name || device.title}</IonCardTitle>
                    <div className="device-meta">
                      <IonBadge
                        color={
                          device.status === "active" ? "success" : "medium"
                        }
                      >
                        {device.status}
                      </IonBadge>
                      <IonChip>
                        <IonIcon icon={link} />
                        <IonLabel>{device.type}</IonLabel>
                      </IonChip>
                    </div>
                  </div>
                  <div className="device-actions">
                    <IonButton
                      fill="clear"
                      onClick={() => handleEditDevice(device)}
                    >
                      <IonIcon slot="icon-only" icon={create} />
                    </IonButton>
                    {/* <IonButton
                      fill="clear"
                      color="danger"
                      onClick={() => setShowDeleteConfirm(device._id)}
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonButton> */}
                  </div>
                </div>
              </IonCardHeader>
              <IonCardContent>
                <IonText color="medium" className="device-description">
                  <p>{device.description}</p>
                </IonText>

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
                </div>

                <div className="device-features">
                  {device.givingLink?.isVisible && (
                    <IonChip color="success">
                      <IonIcon icon={checkmarkCircle} />
                      <IonLabel>Giving Link</IonLabel>
                    </IonChip>
                  )}
                  {device.memberRegistrationLink?.isVisible && (
                    <IonChip color="primary">
                      <IonIcon icon={checkmarkCircle} />
                      <IonLabel>Registration</IonLabel>
                    </IonChip>
                  )}
                  {device.eventsLink?.isVisible && (
                    <IonChip color="secondary">
                      <IonIcon icon={checkmarkCircle} />
                      <IonLabel>Events</IonLabel>
                    </IonChip>
                  )}
                </div>

                <IonButton
                  expand="block"
                  fill="outline"
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

      {/* Edit/Create Modal - Bottom Sheet */}
      <IonModal
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        breakpoints={[0, 0.75, 1]}
        initialBreakpoint={0.75}
      >
        <IonContent className="ion-padding">
          <IonTitle className="ion-text-center">
            {editingDevice ? "Edit Device" : "Add New Device"}
          </IonTitle>
          <NFCConfigForm
            initialData={editingDevice || undefined}
            onSave={handleSaveDevice}
            isSaving={isSaving}
            isUpdating={!!editingDevice}
          />
        </IonContent>
      </IonModal>

      {/* Delete Confirmation Modal - Bottom Sheet */}
      <IonModal
        isOpen={!!showDeleteConfirm}
        onDidDismiss={() => setShowDeleteConfirm(null)}
        breakpoints={[0, 1]}
        initialBreakpoint={1}
      >
        <IonContent className="ion-padding">
          <div className="delete-confirmation">
            <IonTitle className="ion-text-center">Confirm Delete</IonTitle>
            <IonIcon icon={alertCircle} className="warning-icon" />
            <h2>Delete NFC Device?</h2>
            <p>
              Are you sure you want to delete this device? This action cannot be
              undone.
            </p>
            <div className="button-group">
              <IonButton
                shape="round"
                expand="block"
                fill="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </IonButton>
              <IonButton
                shape="round"
                expand="block"
                color="danger"
                onClick={() => handleDeleteDevice(showDeleteConfirm!)}
              >
                Delete
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
