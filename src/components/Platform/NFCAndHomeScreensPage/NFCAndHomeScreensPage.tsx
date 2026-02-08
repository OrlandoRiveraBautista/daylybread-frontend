import React, { useState, useMemo } from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { HomeScreensList, AvailableNFCDevice, AssignedNFCDevice } from "../HomeScreensList";
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

  // Filter available (unassigned) NFC devices
  const availableNFCDevices: AvailableNFCDevice[] = useMemo(() => {
    if (!nfcDevices) return [];
    return nfcDevices
      .filter((device) => !device.homeScreen)
      .map((device) => ({
        _id: device._id,
        nfcId: device.nfcId,
        name: device.name,
        deviceType: device.deviceType,
      }));
  }, [nfcDevices]);

  // Get assigned NFC devices with their home screen IDs
  const assignedNFCDevices: AssignedNFCDevice[] = useMemo(() => {
    if (!nfcDevices) return [];
    return nfcDevices
      .filter((device) => device.homeScreen)
      .map((device) => ({
        _id: device._id,
        nfcId: device.nfcId,
        name: device.name,
        deviceType: device.deviceType,
        homeScreenId: device.homeScreen!._id,
      }));
  }, [nfcDevices]);

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
            homeScreens={devices}
            availableNFCDevices={availableNFCDevices}
            assignedNFCDevices={assignedNFCDevices}
            onSaveTiles={onSaveTiles}
            onCreateHomeScreen={onCreateHomeScreen}
            onDelete={onDeleteHomeScreen}
            isSaving={isSaving}
            onAssignNFC={onAssignNFCToHomeScreen}
            onUnassignNFC={onUnassignNFC}
            onShopNFC={() => setShowNFCProducts(true)}
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
        onClose={() => setShowNFCProducts(false)}
        onSelectProduct={(productId) => {
          console.log("Selected product:", productId);
          // TODO: Handle product selection and NFC device assignment
        }}
      />
    </div>
  );
};
