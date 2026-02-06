import React, { useMemo, useState, useCallback, useRef } from "react";
import { IonIcon } from "@ionic/react";
import {
  wifiOutline,
  cellularOutline,
  batteryFullOutline,
} from "ionicons/icons";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { AppTile } from "./AppTile";
import { WidgetTile } from "./WidgetTile";
import { Dock } from "./Dock";
import { DraggableTile } from "./DraggableTile";
import { TileConfig, GRID_CONFIG } from "./types";
import "./iPhoneHomeScreen.scss";

interface IPhoneHomeScreenProps {
  tiles: TileConfig[];
  wallpaper?: string;
  title?: string;
  isEditMode?: boolean;
  onTileClick?: (tile: TileConfig) => void;
  onTileDelete?: (tile: TileConfig) => void;
  onTileEdit?: (tile: TileConfig) => void;
  onTilesChange?: (tiles: TileConfig[]) => void;
  showStatusBar?: boolean;
  showDock?: boolean;
}

/**
 * iPhone-style home screen for NFC pages
 * Displays tiles in a grid layout with iOS styling
 */
export const IPhoneHomeScreen: React.FC<IPhoneHomeScreenProps> = ({
  tiles,
  wallpaper,
  title,
  isEditMode = false,
  onTileClick,
  onTileDelete,
  onTileEdit,
  onTilesChange,
  showStatusBar = true,
  showDock = true,
}) => {
  const [activeTile, setActiveTile] = useState<TileConfig | null>(null);
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const initialDragPosRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configure sensors for drag detection with reduced activation distance
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required to start drag (more responsive)
      },
    }),
  );

  // Get current time for status bar
  const currentTime = useMemo(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  // Use grid dimensions from GRID_CONFIG
  const GRID_COLUMNS = GRID_CONFIG.columns;
  const GRID_ROWS = 6; // Keep rows at 6 as it's not in GRID_CONFIG yet

  // Separate dock tiles from main grid tiles
  const { gridTiles, dockTiles } = useMemo(() => {
    const dock = tiles.filter((t) => t.isInDock);
    const grid = tiles.filter((t) => !t.isInDock);
    return { gridTiles: grid, dockTiles: dock };
  }, [tiles]);

  // Handle drag start
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const tile = tiles.find((t) => t.id === event.active.id);
      if (tile && containerRef.current) {
        setActiveTile(tile);
        const containerRect = containerRef.current.getBoundingClientRect();
        const activeRect = event.active.rect.current.translated;
        if (activeRect) {
          const initialPos = {
            x: activeRect.left - containerRect.left,
            y: activeRect.top - containerRect.top,
          };
          initialDragPosRef.current = initialPos;
          setDragPosition(initialPos);
        }
      }
    },
    [tiles],
  );

  // Handle drag move - add delta to initial position
  const handleDragMove = useCallback((event: DragMoveEvent) => {
    if (initialDragPosRef.current) {
      setDragPosition({
        x: initialDragPosRef.current.x + event.delta.x,
        y: initialDragPosRef.current.y + event.delta.y,
      });
    }
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTile(null);
      setDragPosition(null);
      initialDragPosRef.current = null;

      const { active, over } = event;

      if (!over || !onTilesChange) return;

      // Find the active tile
      const activeTileObj = tiles.find((t) => t.id === active.id);
      if (!activeTileObj) return;

      // Parse drop zone coordinates
      const dropData = over.data.current;
      if (
        !dropData ||
        typeof dropData.x !== "number" ||
        typeof dropData.y !== "number"
      ) {
        return;
      }

      const newX = dropData.x;
      const newY = dropData.y;

      // Check if position changed
      if (
        activeTileObj.position.x === newX &&
        activeTileObj.position.y === newY
      ) {
        return;
      }

      // Get tile dimensions
      const tileWidth = activeTileObj.size === "small" ? 1 : 2;
      const tileHeight = activeTileObj.size === "large" ? 2 : 1;

      // Check bounds (4 columns x 6 rows)
      const outOfBounds =
        newX < 0 ||
        newX + tileWidth > GRID_COLUMNS ||
        newY < 0 ||
        newY + tileHeight > GRID_ROWS;

      if (outOfBounds) {
        return;
      }

      // Check for collisions with other tiles
      const wouldCollide = tiles.some((tile) => {
        if (tile.id === activeTileObj.id || tile.isInDock) return false;

        const otherWidth = tile.size === "small" ? 1 : 2;
        const otherHeight = tile.size === "large" ? 2 : 1;

        // Check for overlap using rectangle collision
        const overlaps = !(
          newX + tileWidth <= tile.position.x ||
          newX >= tile.position.x + otherWidth ||
          newY + tileHeight <= tile.position.y ||
          newY >= tile.position.y + otherHeight
        );

        return overlaps;
      });

      if (wouldCollide) {
        return; // Don't update if collision
      }

      // Update tile position
      const updatedTiles = tiles.map((tile) =>
        tile.id === activeTileObj.id
          ? { ...tile, position: { x: newX, y: newY } }
          : tile,
      );

      onTilesChange(updatedTiles);
    },
    [tiles, onTilesChange, GRID_COLUMNS, GRID_ROWS],
  );

  // Render a tile based on its size
  const renderTile = (tile: TileConfig, isDragging?: boolean) => {
    const isWidget = tile.size === "medium" || tile.size === "large";

    if (isWidget) {
      return (
        <WidgetTile
          tile={tile}
          isEditMode={isEditMode}
          onTap={() => !isEditMode && onTileClick?.(tile)}
          onDelete={() => onTileDelete?.(tile)}
          onEdit={() => onTileEdit?.(tile)}
        />
      );
    }

    return (
      <AppTile
        tile={tile}
        isEditMode={isEditMode}
        onTap={() => !isEditMode && onTileClick?.(tile)}
        onDelete={() => onTileDelete?.(tile)}
        onEdit={() => onTileEdit?.(tile)}
      />
    );
  };

  // Generate drop zones for the fixed 4x6 grid
  const dropZones = useMemo(() => {
    const zones = [];
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLUMNS; x++) {
        zones.push({ x, y });
      }
    }
    return zones;
  }, [GRID_COLUMNS, GRID_ROWS]);

  // Background style
  const backgroundStyle: React.CSSProperties = wallpaper
    ? wallpaper.startsWith("http") || wallpaper.startsWith("data:")
      ? { backgroundImage: `url(${wallpaper})` }
      : { background: wallpaper }
    : {};

  const content = (
    <div
      ref={containerRef}
      className={`iphone-homescreen ${isEditMode ? "edit-mode" : ""}`}
      style={{ ...backgroundStyle, position: "relative" }}
    >
      {/* Status Bar */}
      {showStatusBar && (
        <div className="status-bar">
          <div className="status-left">
            <span className="time">{currentTime}</span>
          </div>
          <div className="status-right">
            <IonIcon icon={cellularOutline} />
            <IonIcon icon={wifiOutline} />
            <IonIcon icon={batteryFullOutline} />
          </div>
        </div>
      )}

      {/* Main Grid - Fixed 4x6 */}
      <div
        className="homescreen-grid"
        style={{
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        }}
        role="grid"
        aria-label={`Home screen grid${isEditMode ? ", edit mode active" : ""}`}
      >
        {/* Drop zones (only visible in edit mode) */}
        {isEditMode &&
          dropZones.map(({ x, y }) => (
            <DraggableTile
              key={`drop-${x}-${y}`}
              id={`drop-${x}-${y}`}
              x={x}
              y={y}
              isDropZone
            >
              <div className="drop-zone" />
            </DraggableTile>
          ))}

        {/* Tiles */}
        {gridTiles.map((tile) => {
          const colSpan = tile.size === "small" ? 1 : 2;
          const rowSpan = tile.size === "large" ? 2 : 1;

          return (
            <DraggableTile
              key={tile.id}
              id={tile.id}
              x={tile.position.x}
              y={tile.position.y}
              size={tile.size}
              disabled={!isEditMode}
              colSpan={colSpan}
              rowSpan={rowSpan}
            >
              <div className={`grid-cell ${isEditMode ? "edit-mode" : ""}`}>
                {renderTile(tile)}
              </div>
            </DraggableTile>
          );
        })}
      </div>

      {/* Page Dots */}
      <div className="page-dots">
        <div className="dot active" />
      </div>

      {/* Dock */}
      {showDock && (
        <Dock
          tiles={dockTiles}
          isEditMode={isEditMode}
          onTileTap={onTileClick}
          onTileDelete={onTileDelete}
          onTileEdit={onTileEdit}
        />
      )}

      {/* Custom drag overlay - rendered inside container to work in modals */}
      {activeTile && dragPosition && isEditMode && (
        <div
          className="dragging-overlay"
          style={{
            position: "absolute",
            left: dragPosition.x,
            top: dragPosition.y,
            pointerEvents: "none",
            zIndex: 9999,
            width: activeTile.size === "small" ? "60px" : "140px",
          }}
        >
          {renderTile(activeTile, true)}
        </div>
      )}
    </div>
  );

  if (!isEditMode) {
    return content;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      {content}
    </DndContext>
  );
};

export default IPhoneHomeScreen;
