import { useMemo, useState, useEffect } from "react";
import { useGetNFCConfig } from "./NFCConfigHooks";
import {
  TileConfig,
  TileType,
  TileSize,
  getDefaultTiles,
} from "../components/NFC/iPhoneHomeScreen/types";

interface NFCConfigExtended {
  _id: string;
  type: string;
  title: string;
  description: string;
  owner?: { _id: string };
  mainButton?: { url?: string; text?: string };
  socialMedia?: { facebook?: boolean; instagram?: boolean; twitter?: boolean };
  givingLink?: { isVisible?: boolean; url?: string };
  memberRegistrationLink?: { isVisible?: boolean; url?: string };
  eventsLink?: { isVisible?: boolean; url?: string };
  tiles?: TileConfig[];
  wallpaper?: string;
}

export interface UseNFCPageDataResult {
  nfcConfig: NFCConfigExtended | undefined;
  tiles: TileConfig[];
  loading: boolean;
  refetch: () => Promise<any>;
}

/**
 * Convert legacy NFC config to tiles format
 */
const convertLegacyConfigToTiles = (nfcConfig: NFCConfigExtended | undefined): TileConfig[] => {
  if (!nfcConfig) return getDefaultTiles();

  const legacyTiles: TileConfig[] = [];
  let position = 0;

  // Main button as a large tile
  if (nfcConfig.mainButton?.url) {
    legacyTiles.push({
      id: "main-button",
      type: "website",
      label: nfcConfig.mainButton.text || "Visit",
      icon: "globe-outline",
      url: nfcConfig.mainButton.url,
      size: "large",
      position: { x: 0, y: 0 },
      color: "#007AFF",
      subtitle: nfcConfig.description,
    });
    position = 2;
  }

  // Giving link
  if (nfcConfig.givingLink?.isVisible && nfcConfig.givingLink.url) {
    legacyTiles.push({
      id: "giving",
      type: "give",
      label: "Give",
      icon: "heart-outline",
      url: nfcConfig.givingLink.url,
      size: "small",
      position: { x: legacyTiles.length % 4, y: position },
      color: "#34C759",
    });
  }

  // Member registration link
  if (nfcConfig.memberRegistrationLink?.isVisible && nfcConfig.memberRegistrationLink.url) {
    legacyTiles.push({
      id: "newmember",
      type: "newmember",
      label: "New Here?",
      icon: "person-add-outline",
      url: nfcConfig.memberRegistrationLink.url,
      size: "small",
      position: { x: legacyTiles.length % 4, y: position },
      color: "#FF9500",
    });
  }

  // Events link
  if (nfcConfig.eventsLink?.isVisible && nfcConfig.eventsLink.url) {
    legacyTiles.push({
      id: "events",
      type: "events",
      label: "Events",
      icon: "calendar-outline",
      url: nfcConfig.eventsLink.url,
      size: "small",
      position: { x: legacyTiles.length % 4, y: position },
      color: "#FF3B30",
    });
  }

  // Social media tiles
  if (nfcConfig.socialMedia?.facebook) {
    legacyTiles.push({
      id: "facebook",
      type: "facebook",
      label: "Facebook",
      icon: "logo-facebook",
      url: "#",
      size: "small",
      position: { x: legacyTiles.length % 4, y: Math.floor(legacyTiles.length / 4) + position },
      color: "#1877F2",
      isInDock: true,
    });
  }

  if (nfcConfig.socialMedia?.instagram) {
    legacyTiles.push({
      id: "instagram",
      type: "instagram",
      label: "Instagram",
      icon: "logo-instagram",
      url: "#",
      size: "small",
      position: { x: legacyTiles.length % 4, y: Math.floor(legacyTiles.length / 4) + position },
      color: "#E4405F",
      isInDock: true,
    });
  }

  if (nfcConfig.socialMedia?.twitter) {
    legacyTiles.push({
      id: "twitter",
      type: "twitter",
      label: "Twitter",
      icon: "logo-twitter",
      url: "#",
      size: "small",
      position: { x: legacyTiles.length % 4, y: Math.floor(legacyTiles.length / 4) + position },
      color: "#1DA1F2",
      isInDock: true,
    });
  }

  // If still no tiles, return defaults
  if (legacyTiles.length === 0) {
    return getDefaultTiles();
  }

  return legacyTiles;
};

/**
 * Custom hook to fetch and transform NFC page data
 */
export const useNFCPageData = (configId: string): UseNFCPageDataResult => {
  const { data: nfcConfigResults, loading, refetch } = useGetNFCConfig(configId);

  const nfcConfig = useMemo(() => {
    return nfcConfigResults?.getNFCConfig?.results as NFCConfigExtended | undefined;
  }, [nfcConfigResults]);

  // Convert NFC config to tiles format
  const tiles = useMemo((): TileConfig[] => {
    // If tiles exist, use them
    if (nfcConfig?.tiles && nfcConfig.tiles.length > 0) {
      return nfcConfig.tiles.map((tile) => ({
        id: tile.id,
        type: tile.type as TileType,
        label: tile.label,
        icon: tile.icon,
        url: tile.url,
        size: tile.size as TileSize,
        position: tile.position,
        color: tile.color ?? undefined,
        subtitle: tile.subtitle ?? undefined,
        isInDock: tile.isInDock ?? undefined,
      }));
    }

    // Otherwise, convert from legacy config
    return convertLegacyConfigToTiles(nfcConfig);
  }, [nfcConfig]);

  return {
    nfcConfig,
    tiles,
    loading,
    refetch,
  };
};
