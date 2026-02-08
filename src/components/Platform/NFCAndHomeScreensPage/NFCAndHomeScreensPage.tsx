import React, { useState } from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { HomeScreensList } from "../HomeScreensList";
import { NFCDevicesManagement, NFCDeviceConfig } from "../NFCDevicesManagement";
import { NFCProducts } from "../NFCProducts";
import { TileConfig } from "../../NFC/iPhoneHomeScreen/types";
import { NFCDevice } from "../../../types/nfc.types";
import "./NFCAndHomeScreensPage.scss";

type TabType = "home-screens" | "nfc-devices";

interface NFCAndHomeScreensPageProps {
  // Home Screens props
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
  onDeleteHomeScreen: (deviceId: string) => void;
  isSaving: boolean;

  // NFC Devices props
  nfcDevices?: NFCDeviceConfig[];
  onAssignNFCToHomeScreen?: (nfcId: string, homeScreenId: string) => Promise<void>;
  onUnassignNFC?: (deviceId: string) => Promise<void>;
  onDeleteNFC?: (deviceId: string) => Promise<void>;
}

export const NFCAndHomeScreensPage: React.FC<NFCAndHomeScreensPageProps> = ({
  devices,
  onSaveTiles,
  onCreateHomeScreen,
  onDeleteHomeScreen,
  isSaving,
  nfcDevices,
  onAssignNFCToHomeScreen,
  onUnassignNFC,
  onDeleteNFC,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("home-screens");
  const [showNFCProducts, setShowNFCProducts] = useState(false);
  const [selectedDeviceForNFC, setSelectedDeviceForNFC] = useState<NFCDevice | null>(null);

  const handleManageNFC = (device: NFCDevice) => {
    setSelectedDeviceForNFC(device);
    setShowNFCProducts(true);
  };

  return (
    <div className="nfc-and-home-screens-page">
      <div className="page-header">
        <div className="header-content">
          <h1>NFC & Home Screens</h1>
          <p>
            Manage your home screen layouts and physical NFC devices in one place.
          </p>
        </div>
      </div>

      <div className="tab-selector">
        <IonSegment
          value={activeTab}
          onIonChange={(e) => setActiveTab(e.detail.value as TabType)}
        >
          <IonSegmentButton value="home-screens">
            <IonLabel>Home Screens</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="nfc-devices">
            <IonLabel>NFC Devices</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>

      <div className="tab-content">
        {activeTab === "home-screens" && (
          <HomeScreensList
            devices={devices}
            onSaveTiles={onSaveTiles}
            onCreateHomeScreen={onCreateHomeScreen}
            onDelete={onDeleteHomeScreen}
            isSaving={isSaving}
            onManageNFC={handleManageNFC}
          />
        )}

        {activeTab === "nfc-devices" && (
          <NFCDevicesManagement
            nfcDevices={nfcDevices}
            onAssignToHomeScreen={onAssignNFCToHomeScreen}
            onUnassign={onUnassignNFC}
            onDelete={onDeleteNFC}
          />
        )}
      </div>

      {/* NFC Products Modal */}
      <NFCProducts
        isOpen={showNFCProducts}
        onClose={() => {
          setShowNFCProducts(false);
          setSelectedDeviceForNFC(null);
        }}
        onSelectProduct={(productId) => {
          console.log(
            "Selected product:",
            productId,
            "for home screen:",
            selectedDeviceForNFC?.id,
          );
          // TODO: Handle product selection and NFC device assignment
        }}
      />
    </div>
  );
};
