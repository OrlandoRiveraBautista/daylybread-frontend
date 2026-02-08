import { useCallback, useEffect } from "react";
import { useHomeScreens } from "./useHomeScreens";
import {
  TileConfig,
  TileType,
  TileSize,
} from "../components/NFC/iPhoneHomeScreen/types";
import { NFCDevice } from "../types/nfc.types";

export interface UsePlatformNFCDevicesResult {
  devices: NFCDevice[];
  isSavingTiles: boolean;
  saveTiles: (
    deviceId: string,
    tiles: TileConfig[],
    wallpaper?: string,
    name?: string,
  ) => Promise<void>;
  createHomeScreen: (
    name: string,
    tiles: TileConfig[],
    wallpaper?: string,
  ) => Promise<void>;
  deleteDevice: (deviceId: string) => void;
  fetchConfig: () => Promise<any>;
}

/**
 * Custom hook to manage NFC devices (HomeScreens) in the platform.
 * Now uses the new HomeScreen architecture where HomeScreens are separate entities.
 */
export const usePlatformNFCDevices = (
  userId: string,
): UsePlatformNFCDevicesResult => {
  const {
    homeScreens,
    isSaving,
    updateHomeScreen,
    createHomeScreen,
    deleteHomeScreen,
    fetchHomeScreens,
  } = useHomeScreens(userId);

  // Fetch on mount
  useEffect(() => {
    fetchHomeScreens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Transform HomeScreens into device array format for backward compatibility
   */
  const getDevices = useCallback((): NFCDevice[] => {
    if (!homeScreens || homeScreens.length === 0) return [];

    return homeScreens.map((homeScreen: any) => {
      // Transform tiles to match TileConfig type
      const transformedTiles: TileConfig[] | undefined = homeScreen.tiles
        ? homeScreen.tiles.map((tile: any) => ({
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
          }))
        : undefined;

      return {
        id: homeScreen._id,
        _id: homeScreen._id,
        name: homeScreen.name || "Home Screen",
        nfcIds: [], // NFC devices are now separate entities
        status: "active" as const,
        createdAt: homeScreen.createdAt,
        tapCount: homeScreen.views || 0,
        tiles: transformedTiles,
        wallpaper: homeScreen.wallpaper ?? undefined,
      };
    });
  }, [homeScreens]);

  /**
   * Save tiles configuration for a HomeScreen
   */
  const saveTiles = useCallback(
    async (
      homeScreenId: string,
      tiles: TileConfig[],
      wallpaper?: string,
      name?: string,
    ): Promise<void> => {
      try {
        // Find the home screen to get its name if not provided
        const homeScreen = homeScreens.find(
          (hs: any) => hs._id === homeScreenId,
        );
        if (!homeScreen) {
          throw new Error("Home screen not found");
        }

        // Ensure name is not empty
        const finalName = (name && name.trim()) || homeScreen.name || "Home Screen";
        
        // Ensure tiles is always an array and properly formatted
        const finalTiles = tiles ? tiles.map(tile => ({
          id: tile.id,
          type: tile.type,
          label: tile.label,
          icon: tile.icon,
          url: tile.url,
          size: tile.size,
          position: {
            x: tile.position.x,
            y: tile.position.y,
          },
          color: tile.color || undefined,
          subtitle: tile.subtitle || undefined,
          isInDock: tile.isInDock || undefined,
        })) : [];
        
        console.log('Sending update with:', { name: finalName, tilesCount: finalTiles.length, wallpaper });
        
        const updateData: any = {
          name: finalName,
          tiles: finalTiles,
        };
        
        // Only include wallpaper if it exists
        if (wallpaper) {
          updateData.wallpaper = wallpaper;
        }
        
        await updateHomeScreen(homeScreenId, updateData);

        // Refresh after successful save
        await fetchHomeScreens();
      } catch (error) {
        throw error;
      }
    },
    [homeScreens, updateHomeScreen, fetchHomeScreens],
  );

  /**
   * Create a new HomeScreen
   */
  const createNewHomeScreen = useCallback(
    async (
      name: string,
      tiles: TileConfig[],
      wallpaper?: string,
    ): Promise<void> => {
      try {
        await createHomeScreen({
          name,
          tiles,
          wallpaper,
        });

        // Refresh after successful create
        await fetchHomeScreens();
      } catch (error) {
        throw error;
      }
    },
    [createHomeScreen, fetchHomeScreens],
  );

  /**
   * Delete a HomeScreen
   */
  const deleteDevice = useCallback(
    async (homeScreenId: string) => {
      try {
        await deleteHomeScreen(homeScreenId);
        await fetchHomeScreens();
      } catch (error) {
        console.error("Delete home screen error:", error);
        throw error;
      }
    },
    [deleteHomeScreen, fetchHomeScreens],
  );

  return {
    devices: getDevices(),
    isSavingTiles: isSaving,
    saveTiles,
    createHomeScreen: createNewHomeScreen,
    deleteDevice,
    fetchConfig: fetchHomeScreens,
  };
};
