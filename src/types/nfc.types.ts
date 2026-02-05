import { TileConfig } from "../components/NFC/iPhoneHomeScreen/types";

/**
 * NFCDevice interface
 * Represents an NFC device configuration in the platform
 */
export interface NFCDevice {
  id: string;
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
  tiles?: TileConfig[];
  wallpaper?: string;
}
