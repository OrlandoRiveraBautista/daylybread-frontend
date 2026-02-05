import { useCallback } from "react";
import { useNFCConfig } from "./useNFCConfig";
import { useUpdateNFCTiles } from "./NFCConfigHooks";
import { TileConfig, TileType, TileSize } from "../components/NFC/iPhoneHomeScreen/types";
import { NFCDevice } from "../types/nfc.types";

export interface UsePlatformNFCDevicesResult {
  devices: NFCDevice[];
  isSavingTiles: boolean;
  saveTiles: (deviceId: string, tiles: TileConfig[], wallpaper?: string) => Promise<void>;
  deleteDevice: (deviceId: string) => void;
  fetchConfig: () => Promise<any>;
}

/**
 * Custom hook to manage NFC devices in the platform.
 * Centralizes all NFC device and tiles logic.
 */
export const usePlatformNFCDevices = (userId: string): UsePlatformNFCDevicesResult => {
  const { nfcConfigData, fetchConfig } = useNFCConfig(userId);
  const [updateTiles, { loading: isSavingTiles }] = useUpdateNFCTiles();

  /**
   * Transform NFC config data into device array format
   */
  const getDevices = useCallback((): NFCDevice[] => {
    const results = nfcConfigData?.getNFCConfigByOwner?.results;
    if (!results) return [];

    // Transform tiles to match TileConfig type
    const transformedTiles: TileConfig[] | undefined = results.tiles
      ? results.tiles.map((tile) => ({
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

    return [
      {
        id: results._id,
        _id: results._id,
        name: "Primary NFC Device",
        title: results.title,
        description: results.description,
        type: results.type,
        mainButton: results.mainButton,
        socialMedia: results.socialMedia ?? undefined,
        givingLink: results.givingLink,
        memberRegistrationLink: results.memberRegistrationLink,
        eventsLink: results.eventsLink,
        status: "active" as const,
        createdAt: results.createdAt,
        tapCount: 0,
        tiles: transformedTiles,
        wallpaper: results.wallpaper ?? undefined,
      },
    ];
  }, [nfcConfigData]);

  /**
   * Save tiles configuration for a device
   */
  const saveTiles = useCallback(
    async (deviceId: string, tiles: TileConfig[], wallpaper?: string): Promise<void> => {
      try {
        const result = await updateTiles({
          variables: {
            id: deviceId,
            tiles: tiles.map((tile) => ({
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
              color: tile.color,
              subtitle: tile.subtitle,
              isInDock: tile.isInDock,
            })),
            wallpaper: wallpaper || null,
          },
        });

        // Check for errors in the response
        const errors = result.data?.updateNFCTiles?.errors;
        if (errors && errors.length > 0) {
          const errorMessage = errors.map((e: any) => e.message).join(", ");
          throw new Error(errorMessage);
        }

        // Refresh config after successful save
        await fetchConfig();
      } catch (error) {
        throw error;
      }
    },
    [updateTiles, fetchConfig]
  );

  /**
   * Delete a device (placeholder for future implementation)
   */
  const deleteDevice = useCallback((deviceId: string) => {
    console.log("Delete device:", deviceId);
    // TODO: Implement device deletion when needed
  }, []);

  return {
    devices: getDevices(),
    isSavingTiles,
    saveTiles,
    deleteDevice,
    fetchConfig,
  };
};
