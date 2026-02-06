import { TileConfig } from "../components/NFC/iPhoneHomeScreen/types";

/**
 * NFCDevice interface
 * Represents an NFC device configuration in the platform
 */
export interface NFCDevice {
  id: string;
  _id: string;
  name?: string;
  nfcIds: string[];
  status?: "active" | "inactive";
  createdAt: string;
  tapCount?: number;
  tiles?: TileConfig[];
  wallpaper?: string;
}
