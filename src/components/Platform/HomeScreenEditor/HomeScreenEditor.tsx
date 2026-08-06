import React, { useState, useCallback } from "react";
import {
  IonButton,
  IonIcon,
  IonModal,
  IonAlert,
  IonContent,
  IonFooter,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  colorPalette,
  refresh,
  create,
} from "ionicons/icons";
import { IPhoneHomeScreen } from "../../NFC/iPhoneHomeScreen";
import { TileLibrary } from "./TileLibrary";
import { TileConfigModal } from "./TileConfigModal";
import { PlatformModalHeader } from "../PlatformModalHeader";
import { PlatformForm, PlatformFormInput } from "../PlatformFormInput";
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
  onSave: (tiles: TileConfig[], wallpaper?: string, name?: string) => Promise<void>;
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
    initialTiles?.length > 0 ? initialTiles : getDefaultTiles(),
  );
  const [wallpaper, setWallpaper] = useState(initialWallpaper || "");
  const [name, setName] = useState(title || "New Home Screen");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showTileLibrary, setShowTileLibrary] = useState(false);
  const [editingTile, setEditingTile] = useState<TileConfig | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showNoSpaceAlert, setShowNoSpaceAlert] = useState(false);

  // Reset state when modal opens - but only once per open
  React.useEffect(() => {
    if (isOpen && !isInitialized) {
      const tilesToSet =
        initialTiles?.length > 0 ? initialTiles : getDefaultTiles();

      setTiles(tilesToSet);
      setWallpaper(initialWallpaper || "");
      setName(title || "New Home Screen");
      setIsEditMode(false);
      setHasChanges(false);
      setIsInitialized(true);
    } else if (!isOpen) {
      // Reset initialization flag when modal closes
      setIsInitialized(false);
    }
  }, [isOpen, initialTiles, initialWallpaper, title, isInitialized]);

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
      prev.map((t) => (t.id === updatedTile.id ? updatedTile : t)),
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
  const handleAddTile = useCallback(
    (preset: TilePreset) => {
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
        setShowNoSpaceAlert(true);
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
    },
    [tiles],
  );

  // Reset to default layout
  const handleReset = useCallback(() => {
    setTiles(getDefaultTiles());
    setHasChanges(true);
  }, []);

  // Save changes
  const handleSave = async () => {
    try {
      // Validate name is not empty
      const trimmedName = name?.trim();
      const finalName = (trimmedName && trimmedName.length > 0) 
        ? trimmedName 
        : (title || "New Home Screen");
      
      await onSave(tiles, wallpaper, finalName);
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
        <PlatformModalHeader
          title="Edit Home Screen"
          onClose={handleCancel}
          onSave={handleSave}
          saveLabel="Done"
          isSaving={isSaving}
          canSave={hasChanges}
          showSaveButton={true}
        />

        {/* Two-column layout: controls on left, preview on right (desktop) */}
        <IonContent className="editor-body-content">
          <div className="editor-body">
            {/* Left: Controls Panel */}
            <div className="editor-controls-panel">
              {/* Name Input */}
              <div className="editor-section">
                <PlatformForm>
                  <PlatformFormInput
                    label="Home Screen Name"
                    value={name}
                    placeholder="Enter home screen name"
                    onIonInput={(e) => {
                      setName(e.detail.value || "");
                      setHasChanges(true);
                    }}
                  />
                </PlatformForm>
              </div>

              {/* Toolbar */}
              <div className="editor-section">
                <p className="editor-section-label">Edit Buttons</p>
                <p className="editor-section-hint">
                  {isEditMode
                    ? "Drag tiles to reorder. Tap a tile to edit it."
                    : "Click on the buttons of the screen to edit them."}
                </p>
                <div className="editor-toolbar">
                  <IonButton
                    fill={isEditMode ? "solid" : "outline"}
                    size="small"
                    shape="round"
                    onClick={() => setIsEditMode(!isEditMode)}
                    color="primary"
                  >
                    <IonIcon slot="start" icon={create} />
                    {isEditMode ? "Exit Edit" : "Edit"}
                  </IonButton>

                  <IonButton
                    fill="outline"
                    size="small"
                    shape="round"
                    color="primary"
                    onClick={() => setShowTileLibrary(true)}
                    disabled={!isEditMode}
                  >
                    <IonIcon slot="start" icon={add} />
                    Add title
                  </IonButton>

                  <IonButton
                    fill="clear"
                    size="small"
                    shape="round"
                    color="medium"
                    onClick={handleCancel}
                  >
                    Cancel
                  </IonButton>
                </div>
              </div>

              {/* Wallpaper Picker */}
              <div className="editor-section wallpaper-picker">
                <p className="editor-section-label">
                  <IonIcon icon={colorPalette} />
                  Background
                </p>
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
                      aria-label={`Wallpaper preset ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div className="editor-section">
                <IonButton
                  fill="outline"
                  size="small"
                  shape="round"
                  color="medium"
                  onClick={handleReset}
                >
                  <IonIcon slot="start" icon={refresh} />
                  Reset to default
                </IonButton>
              </div>
            </div>

            {/* Right: Phone Preview */}
            <div className="editor-preview-panel">
              <div className="phone-frame-scale">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <IPhoneHomeScreen
                    tiles={tiles}
                    wallpaper={wallpaper}
                    title={title}
                    isEditMode={isEditMode}
                    onTileClick={handleEditTile}
                    onTileDelete={handleDeleteTile}
                    onTileEdit={handleEditTile}
                    onTilesChange={handleTilesChange}
                    showStatusBar={true}
                    showDock={true}
                  />
                  <div className="phone-home-indicator" />
                </div>
              </div>
            </div>
          </div>
        </IonContent>

        {/* Save Footer */}
        <IonFooter className="editor-footer">
          <IonToolbar>
            <div className="editor-footer-actions">
              <IonButton
                fill="solid"
                shape="round"
                color="primary"
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
              >
                {isSaving ? "Saving…" : "Save"}
              </IonButton>
              <IonButton
                fill="clear"
                shape="round"
                color="medium"
                onClick={handleCancel}
              >
                Cancel
              </IonButton>
            </div>
          </IonToolbar>
        </IonFooter>

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

        {/* No Space Alert */}
        <IonAlert
          isOpen={showNoSpaceAlert}
          onDidDismiss={() => setShowNoSpaceAlert(false)}
          header="No Space Available"
          message="There's no space available for this tile size. Try removing some tiles first or choose a smaller size."
          buttons={["OK"]}
        />
      </div>
    </IonModal>
  );
};

export default HomeScreenEditor;
