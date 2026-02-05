import { useState, useEffect, useMemo, useCallback } from "react";
import { useUpdateNFCTiles } from "./NFCConfigHooks";
import { TileConfig } from "../components/NFC/iPhoneHomeScreen/types";

export interface UseNFCEditModeResult {
  isEditMode: boolean;
  isOwner: boolean;
  currentTiles: TileConfig[];
  currentWallpaper: string | undefined;
  isSaving: boolean;
  setCurrentTiles: (tiles: TileConfig[]) => void;
  setCurrentWallpaper: (wallpaper: string | undefined) => void;
  saveTiles: () => Promise<void>;
  enterEditMode: () => void;
  exitEditMode: () => void;
}

interface UseNFCEditModeParams {
  configId: string;
  initialTiles: TileConfig[];
  initialWallpaper: string | undefined;
  ownerId: string | undefined;
  currentUserId: string | undefined;
  onSaveSuccess?: () => void;
  onSaveError?: (error: string) => void;
}

/**
 * Custom hook to manage NFC page edit mode functionality
 */
export const useNFCEditMode = ({
  configId,
  initialTiles,
  initialWallpaper,
  ownerId,
  currentUserId,
  onSaveSuccess,
  onSaveError,
}: UseNFCEditModeParams): UseNFCEditModeResult => {
  const urlParams = new URLSearchParams(window.location.search);
  const isEditModeRequested = urlParams.get("edit") === "true";

  const [updateTiles, { loading: isSaving }] = useUpdateNFCTiles();
  const [currentTiles, setCurrentTiles] = useState<TileConfig[]>(initialTiles);
  const [currentWallpaper, setCurrentWallpaper] = useState<string | undefined>(initialWallpaper);

  // Check if the current user is the owner
  const isOwner = useMemo(() => {
    if (!currentUserId || !ownerId) return false;
    return currentUserId === ownerId;
  }, [currentUserId, ownerId]);

  // Only allow edit mode if user is the owner
  const isEditMode = isEditModeRequested && isOwner;

  // Update current tiles and wallpaper when initial values change
  useEffect(() => {
    setCurrentTiles(initialTiles);
    setCurrentWallpaper(initialWallpaper);
  }, [initialTiles, initialWallpaper]);

  // Save tiles to server
  const saveTiles = useCallback(async () => {
    if (!configId) return;

    try {
      const result = await updateTiles({
        variables: {
          id: configId,
          tiles: currentTiles.map((tile) => ({
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
          wallpaper: currentWallpaper || null,
        },
      });

      // Check for errors in the response
      const errors = result.data?.updateNFCTiles?.errors;
      if (errors && errors.length > 0) {
        const errorMessage = errors.map((e: any) => e.message).join(", ");
        onSaveError?.(errorMessage);
        return;
      }

      // Update local state with the saved data from the response
      const savedData = result.data?.updateNFCTiles?.results;
      if (savedData) {
        if (savedData.tiles) {
          setCurrentTiles(savedData.tiles as TileConfig[]);
        }
        if (savedData.wallpaper !== undefined) {
          setCurrentWallpaper(savedData.wallpaper || undefined);
        }
      }

      onSaveSuccess?.();
    } catch (error) {
      console.error("Error saving tiles:", error);
      onSaveError?.(error instanceof Error ? error.message : "Failed to save changes");
    }
  }, [configId, currentTiles, currentWallpaper, updateTiles, onSaveSuccess, onSaveError]);

  // Enter edit mode
  const enterEditMode = useCallback(() => {
    const baseUrl = window.location.href.split("?")[0];
    window.location.href = `${baseUrl}?id=${configId}&edit=true`;
  }, [configId]);

  // Exit edit mode
  const exitEditMode = useCallback(() => {
    const baseUrl = window.location.href.split("?")[0];
    window.location.href = `${baseUrl}?id=${configId}`;
  }, [configId]);

  return {
    isEditMode,
    isOwner,
    currentTiles,
    currentWallpaper,
    isSaving,
    setCurrentTiles,
    setCurrentWallpaper,
    saveTiles,
    enterEditMode,
    exitEditMode,
  };
};
