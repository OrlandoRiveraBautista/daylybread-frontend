import React from "react";
import { IonIcon } from "@ionic/react";
import * as IonIcons from "ionicons/icons";
import { TileConfig } from "./types";
import { getIonIcon, handleTileNavigation, handleKeyPress } from "./utils";

interface AppTileProps {
  tile: TileConfig;
  isEditMode?: boolean;
  onTap?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

/**
 * Small 1x1 app-style tile that looks like an iPhone app icon
 * Optimized with React.memo to prevent unnecessary re-renders during drag operations
 */
export const AppTile: React.FC<AppTileProps> = React.memo(({
  tile,
  isEditMode = false,
  onTap,
  onDelete,
  onEdit,
}) => {
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (isEditMode) {
      onEdit?.();
      return;
    }
    
    if (tile.url) {
      handleTileNavigation(tile.url, e);
      // Don't call onTap when navigating to prevent current tab navigation
      return;
    }
    
    onTap?.();
  };

  return (
    <div
      className={`app-tile ${isEditMode ? "edit-mode" : ""}`}
      onClick={handleClick}
      onKeyPress={(e) => handleKeyPress(e, () => handleClick(e))}
      role="button"
      tabIndex={0}
      aria-label={`${tile.label}${isEditMode ? ", tap to edit" : ", tap to open"}`}
    >
      {isEditMode && (
        <button
          className="delete-badge"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          aria-label={`Delete ${tile.label}`}
        >
          <IonIcon icon={IonIcons.close} />
        </button>
      )}

      <div
        className="app-icon"
        style={{ backgroundColor: tile.color || "#007AFF" }}
        aria-hidden="true"
      >
        <IonIcon icon={getIonIcon(tile.icon)} />
      </div>

      <span className="app-label">{tile.label}</span>
    </div>
  );
});
