import { useMemo } from "react";
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
  nfcId: string;
  name: string;
  homeScreen?: {
    _id: string;
    tiles?: TileConfig[];
    wallpaper?: string;
  };
}

export interface UseNFCPageDataResult {
  nfcConfig: NFCConfigExtended | undefined;
  tiles: TileConfig[];
  wallpaper: string | undefined;
  loading: boolean;
  refetch: () => Promise<any>;
}

/**
 * Custom hook to fetch and transform NFC page data
 */
export const useNFCPageData = (configId: string): UseNFCPageDataResult => {
  const {
    data: nfcConfigResults,
    loading,
    refetch,
  } = useGetNFCConfig(configId);

  const nfcConfig = useMemo(() => {
    return nfcConfigResults?.getNFCConfig?.results as
      | NFCConfigExtended
      | undefined;
  }, [nfcConfigResults]);

  // Get tiles from HomeScreen or use defaults
  const tiles = useMemo((): TileConfig[] => {
    // If homeScreen exists and has tiles, use them
    if (nfcConfig?.homeScreen?.tiles && nfcConfig.homeScreen.tiles.length > 0) {
      return nfcConfig.homeScreen.tiles.map((tile) => ({
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

  // Get wallpaper from HomeScreen
  const wallpaper = useMemo((): string | undefined => {
    return nfcConfig?.homeScreen?.wallpaper;
  }, [nfcConfig]);

  return {
    nfcConfig,
    tiles,
    wallpaper,
    loading,
    refetch,
  };
};
