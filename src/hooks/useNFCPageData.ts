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
  owner?: { _id: string };
  nfcIds: string[];
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
 * Custom hook to fetch and transform NFC page data
 */
export const useNFCPageData = (configId: string): UseNFCPageDataResult => {
  const { data: nfcConfigResults, loading, refetch } = useGetNFCConfig(configId);

  const nfcConfig = useMemo(() => {
    return nfcConfigResults?.getNFCConfig?.results as NFCConfigExtended | undefined;
  }, [nfcConfigResults]);

  // Get tiles from NFC config or use defaults
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

    // Return default tiles if none configured
    return getDefaultTiles();
  }, [nfcConfig]);

  return {
    nfcConfig,
    tiles,
    loading,
    refetch,
  };
};
