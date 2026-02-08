import { TileConfig } from "../components/NFC/iPhoneHomeScreen/types";

/**
 * NFCDevice interface
 * Represents an NFC device configuration in the platform
 * Note: This is actually HomeScreen data, confusingly named
 */
export interface NFCDevice {
  id: string;
  _id: string;
  name?: string;
  shareableLink: string;
  nfcIds: string[];
  status?: "active" | "inactive";
  createdAt: string;
  tapCount?: number;
  tiles?: TileConfig[];
  wallpaper?: string;
}
