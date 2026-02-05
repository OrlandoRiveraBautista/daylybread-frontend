import React, { useState, useCallback } from "react";
import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonModal,
} from "@ionic/react";
import {
  checkmark,
  close,
  add,
  colorPalette,
  refresh,
} from "ionicons/icons";
import { IPhoneHomeScreen } from "../../NFC/iPhoneHomeScreen";
import { TileLibrary } from "./TileLibrary";
import { TileConfigModal } from "./TileConfigModal";
import {
  TileConfig,
  generateTileId,
  getDefaultTiles,
  TilePreset,
} from "../../NFC/iPhoneHomeScreen/types";
import "./HomeScreenEditor.scss";

interface HomeScreenEditorProps {
  tiles: TileConfig[];
  wallpaper?: string;
  title?: string;
  isOpen: boolean;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (tiles: TileConfig[], wallpaper?: string) => Promise<void>;
}

/**
 * Full-screen editor for the iPhone home screen layout
 * Features iOS-style edit mode with jiggle animation and drag-to-reorder
 */
export const HomeScreenEditor: React.FC<HomeScreenEditorProps> = ({
  tiles: initialTiles,
  wallpaper: initialWallpaper,
  title,
  isOpen,
  isSaving = false,
  onClose,
  onSave,
}) => {
  const [tiles, setTiles] = useState<TileConfig[]>(
    initialTiles?.length > 0 ? initialTiles : getDefaultTiles()
  );
  const [wallpaper, setWallpaper] = useState(initialWallpaper || "");
  const [isEditMode, setIsEditMode] = useState(true);
  const [showTileLibrary, setShowTileLibrary] = useState(false);
  const [editingTile, setEditingTile] = useState<TileConfig | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Reset state when modal opens - but only once per open
  React.useEffect(() => {
    if (isOpen && !isInitialized) {
      const tilesToSet = initialTiles?.length > 0 ? initialTiles : getDefaultTiles();
      
      setTiles(tilesToSet);
      setWallpaper(initialWallpaper || "");
      setIsEditMode(true);
      setHasChanges(false);
      setIsInitialized(true);
    } else if (!isOpen) {
      // Reset initialization flag when modal closes
      setIsInitialized(false);
    }
  }, [isOpen, initialTiles, initialWallpaper, isInitialized]);

  // Handle tile deletion
  const handleDeleteTile = useCallback((tile: TileConfig) => {
    setTiles((prev) => prev.filter((t) => t.id !== tile.id));
    setHasChanges(true);
  }, []);

  // Handle tile edit
  const handleEditTile = useCallback((tile: TileConfig) => {
    setEditingTile(tile);
  }, []);

  // Handle tile update from config modal
  const handleUpdateTile = useCallback((updatedTile: TileConfig) => {
    setTiles((prev) =>
      prev.map((t) => (t.id === updatedTile.id ? updatedTile : t))
    );
    setEditingTile(null);
    setHasChanges(true);
  }, []);

  // Handle tiles change from drag and drop
  const handleTilesChange = useCallback((newTiles: TileConfig[]) => {
    setTiles(newTiles);
    setHasChanges(true);
  }, []);

  // Add new tile from library
  const handleAddTile = useCallback((preset: TilePreset) => {
    const GRID_COLS = 4;
    const GRID_ROWS = 6;
    
    // Get tile dimensions
    const tileWidth = preset.defaultSize === "small" ? 1 : 2;
    const tileHeight = preset.defaultSize === "large" ? 2 : 1;
    
    // Find next available position that fits the tile
    let newX = 0;
    let newY = 0;
    let found = false;
    
    outer: for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLS; x++) {
        // Check if tile would fit at this position
        if (x + tileWidth > GRID_COLS || y + tileHeight > GRID_ROWS) {
          continue;
        }
        
        // Check for collisions
        const hasCollision = tiles.some((tile) => {
          if (tile.isInDock) return false;
          
          const otherWidth = tile.size === "small" ? 1 : 2;
          const otherHeight = tile.size === "large" ? 2 : 1;
          
          // Check for overlap
          return !(
            x + tileWidth <= tile.position.x ||
            x >= tile.position.x + otherWidth ||
            y + tileHeight <= tile.position.y ||
            y >= tile.position.y + otherHeight
          );
        });
        
        if (!hasCollision) {
          newX = x;
          newY = y;
          found = true;
          break outer;
        }
      }
    }
    
    if (!found) {
      alert("No space available for this tile size. Try removing some tiles first.");
      return;
    }

    const newTile: TileConfig = {
      id: generateTileId(),
      type: preset.type,
      label: preset.label,
      icon: preset.icon,
      url: "",
      size: preset.defaultSize,
      position: { x: newX, y: newY },
      color: preset.color,
    };

    setTiles((prev) => [...prev, newTile]);
    setShowTileLibrary(false);
    setHasChanges(true);
    
    // Open config modal for new tile
    setEditingTile(newTile);
  }, [tiles]);

  // Reset to default layout
  const handleReset = useCallback(() => {
    setTiles(getDefaultTiles());
    setHasChanges(true);
  }, []);

  // Save changes
  const handleSave = async () => {
    try {
      await onSave(tiles, wallpaper);
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving tiles:", error);
      // Don't reset hasChanges if save failed
    }
  };

  // Cancel and close
  const handleCancel = () => {
    onClose();
  };

  // Wallpaper presets
  const wallpaperPresets = [
    "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    "linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    "linear-gradient(180deg, #232526 0%, #414345 100%)",
    "linear-gradient(180deg, #134e5e 0%, #71b280 100%)",
    "linear-gradient(180deg, #ee0979 0%, #ff6a00 100%)",
    "linear-gradient(180deg, #2c3e50 0%, #3498db 100%)",
  ];

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={handleCancel}
      className="homescreen-editor-modal"
    >
      <div className="homescreen-editor">
        {/* Header */}
        <div className="editor-header">
          <IonButton fill="clear" onClick={handleCancel} disabled={isSaving}>
            <IonIcon slot="icon-only" icon={close} />
          </IonButton>
          
          <h2>Edit Home Screen</h2>
          
          <IonButton
            fill="solid"
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
          >
            {isSaving ? (
              <IonSpinner name="crescent" />
            ) : (
              <>
                <IonIcon slot="start" icon={checkmark} />
                Done
              </>
            )}
          </IonButton>
        </div>

        {/* Toolbar */}
        <div className="editor-toolbar">
          <IonButton
            fill="outline"
            size="small"
            onClick={() => setShowTileLibrary(true)}
          >
            <IonIcon slot="start" icon={add} />
            Add Tile
          </IonButton>
          
          <IonButton fill="outline" size="small" onClick={handleReset}>
            <IonIcon slot="start" icon={refresh} />
            Reset
          </IonButton>
        </div>

        {/* Wallpaper Picker */}
        <div className="wallpaper-picker">
          <span className="picker-label">
            <IonIcon icon={colorPalette} />
            Background
          </span>
          <div className="wallpaper-options">
            {wallpaperPresets.map((wp, index) => (
              <button
                key={index}
                className={`wallpaper-option ${wallpaper === wp ? "active" : ""}`}
                style={{ background: wp }}
                onClick={() => {
                  setWallpaper(wp);
                  setHasChanges(true);
                }}
              />
            ))}
          </div>
        </div>

        {/* Phone Preview */}
        <div className="phone-preview-container">
          <div className="phone-frame">
            <div className="phone-notch" />
            <IPhoneHomeScreen
              tiles={tiles}
              wallpaper={wallpaper}
              title={title}
              isEditMode={isEditMode}
              onTileDelete={handleDeleteTile}
              onTileEdit={handleEditTile}
              onTilesChange={handleTilesChange}
              showStatusBar={true}
              showDock={true}
            />
            <div className="phone-home-indicator" />
          </div>
        </div>

        {/* Instructions */}
        <div className="editor-instructions">
          <p>Drag tiles to reorder. Tap a tile to edit its settings.</p>
        </div>

        {/* Tile Library Modal */}
        <TileLibrary
          isOpen={showTileLibrary}
          onClose={() => setShowTileLibrary(false)}
          onSelectPreset={handleAddTile}
        />

        {/* Tile Config Modal */}
        {editingTile && (
          <TileConfigModal
            tile={editingTile}
            isOpen={!!editingTile}
            onClose={() => setEditingTile(null)}
            onSave={handleUpdateTile}
          />
        )}
      </div>
    </IonModal>
  );
};

export default HomeScreenEditor;
