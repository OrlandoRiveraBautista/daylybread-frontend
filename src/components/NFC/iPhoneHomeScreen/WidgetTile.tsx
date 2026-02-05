import React from "react";
import { IonIcon } from "@ionic/react";
import * as IonIcons from "ionicons/icons";
import { TileConfig } from "./types";
import { getIonIcon, adjustColor, handleTileNavigation, handleKeyPress } from "./utils";

interface WidgetTileProps {
  tile: TileConfig;
  isEditMode?: boolean;
  onTap?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

/**
 * Medium (2x1) or Large (2x2) widget-style tile
 * Optimized with React.memo to prevent unnecessary re-renders during drag operations
 */
export const WidgetTile: React.FC<WidgetTileProps> = React.memo(({
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

  const isLarge = tile.size === "large";

  return (
    <div
      className={`widget-tile widget-${tile.size} ${isEditMode ? "edit-mode" : ""}`}
      onClick={handleClick}
      onKeyPress={(e) => handleKeyPress(e, () => handleClick(e))}
      role="button"
      tabIndex={0}
      aria-label={`${tile.label}${isEditMode ? ", tap to edit" : ", tap to open"}`}
      style={{
        background: `linear-gradient(135deg, ${tile.color || "#007AFF"}, ${adjustColor(tile.color || "#007AFF", -20)})`,
      }}
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

      <div className="widget-content">
        <div className="widget-header">
          <div className="widget-icon" aria-hidden="true">
            <IonIcon icon={getIonIcon(tile.icon)} />
          </div>
          <span className="widget-label">{tile.label}</span>
        </div>

        {tile.subtitle && (
          <p className="widget-subtitle">{tile.subtitle}</p>
        )}

        {isLarge && (
          <div className="widget-cta">
            <span>Tap to open</span>
            <IonIcon icon={IonIcons.chevronForward} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
});
