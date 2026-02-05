import React from "react";
import { IonIcon } from "@ionic/react";
import * as IonIcons from "ionicons/icons";
import { TileConfig } from "./types";
import { getIonIcon, handleTileNavigation, handleKeyPress } from "./utils";

interface DockProps {
  tiles: TileConfig[];
  isEditMode?: boolean;
  onTileTap?: (tile: TileConfig) => void;
  onTileDelete?: (tile: TileConfig) => void;
  onTileEdit?: (tile: TileConfig) => void;
}

/**
 * iPhone-style dock at the bottom of the home screen
 * Optimized with React.memo to prevent unnecessary re-renders
 */
export const Dock: React.FC<DockProps> = React.memo(({
  tiles,
  isEditMode = false,
  onTileTap,
  onTileDelete,
  onTileEdit,
}) => {
  const handleTileClick = (tile: TileConfig, e?: React.MouseEvent | React.KeyboardEvent) => {
    if (isEditMode) {
      onTileEdit?.(tile);
      return;
    }
    
    if (tile.url) {
      if (e) {
        handleTileNavigation(tile.url, e);
      } else {
        handleTileNavigation(tile.url);
      }
      // Don't call onTileTap when navigating to prevent current tab navigation
      return;
    }
    
    onTileTap?.(tile);
  };

  // Only show dock tiles (max 4)
  const dockTiles = tiles.filter((t) => t.isInDock).slice(0, 4);

  if (dockTiles.length === 0) return null;

  return (
    <div className={`iphone-dock ${isEditMode ? "edit-mode" : ""}`}>
      <div className="dock-container" role="toolbar" aria-label="Dock">
        {dockTiles.map((tile) => (
          <div
            key={tile.id}
            className={`dock-tile ${isEditMode ? "edit-mode" : ""}`}
            onClick={(e) => handleTileClick(tile, e)}
            onKeyPress={(e) => handleKeyPress(e, () => handleTileClick(tile, e))}
            role="button"
            tabIndex={0}
            aria-label={`${tile.label}${isEditMode ? ", tap to edit" : ", tap to open"}`}
          >
            {isEditMode && (
              <button
                className="delete-badge"
                onClick={(e) => {
                  e.stopPropagation();
                  onTileDelete?.(tile);
                }}
                aria-label={`Delete ${tile.label}`}
              >
                <IonIcon icon={IonIcons.close} />
              </button>
            )}
            
            <div
              className="dock-icon"
              style={{ backgroundColor: tile.color || "#007AFF" }}
              aria-hidden="true"
            >
              <IonIcon icon={getIonIcon(tile.icon)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
