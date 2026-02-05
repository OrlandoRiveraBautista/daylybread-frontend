import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { TileSize } from "./types";

interface DraggableTileProps {
  id: string;
  x: number;
  y: number;
  size?: TileSize;
  disabled?: boolean;
  isDropZone?: boolean;
  colSpan?: number;
  rowSpan?: number;
  children: React.ReactNode;
}

/**
 * Wrapper component that makes tiles draggable and droppable
 * Uses @dnd-kit for accessible drag-and-drop functionality
 */
export const DraggableTile: React.FC<DraggableTileProps> = ({
  id,
  x,
  y,
  size = "small",
  disabled = false,
  isDropZone = false,
  colSpan = 1,
  rowSpan = 1,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id,
    disabled: disabled || isDropZone,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id,
    data: {
      x,
      y,
      size,
    },
  });

  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
    setDragRef(element);
    setDropRef(element);
  };

  const gridStyle: React.CSSProperties = {
    gridColumn: `${x + 1} / span ${colSpan}`,
    gridRow: `${y + 1} / span ${rowSpan}`,
  };

  if (isDropZone) {
    return (
      <div
        ref={setDropRef}
        style={{
          ...gridStyle,
          position: "relative",
          zIndex: 1,
        }}
        className={`drop-zone-cell ${isOver ? "drop-zone-active" : ""}`}
      >
        {children}
      </div>
    );
  }

  const tileStyle: React.CSSProperties = {
    ...gridStyle,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
    cursor: !disabled ? "grab" : "default",
    zIndex: 10,
    position: "relative",
  };

  return (
    <div
      ref={setRefs}
      style={tileStyle}
      {...listeners}
      {...attributes}
      className={`draggable-tile ${isDragging ? "dragging" : ""}`}
    >
      {children}
    </div>
  );
};
