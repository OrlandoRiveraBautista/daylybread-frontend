/**
 * Types for the iPhone-style home screen NFC page
 */

export interface TilePosition {
  x: number;
  y: number;
}

export interface TileConfig {
  id: string;
  type: TileType;
  label: string;
  icon: string;
  url: string;
  size: TileSize;
  position: TilePosition;
  color?: string;
  subtitle?: string;
  isInDock?: boolean;
}

export type TileSize = "small" | "medium" | "large";

export type TileType =
  | "website"
  | "give"
  | "events"
  | "sermons"
  | "prayer"
  | "groups"
  | "contact"
  | "newmember"
  | "facebook"
  | "instagram"
  | "twitter"
  | "youtube"
  | "custom";

export interface TilePreset {
  type: TileType;
  label: string;
  icon: string;
  color: string;
  defaultSize: TileSize;
  description: string;
}

// Church-friendly tile presets
export const TILE_PRESETS: TilePreset[] = [
  {
    type: "website",
    label: "Website",
    icon: "globe-outline",
    color: "#007AFF",
    defaultSize: "large",
    description: "Main church website link",
  },
  {
    type: "give",
    label: "Give",
    icon: "heart-outline",
    color: "#34C759",
    defaultSize: "medium",
    description: "Online giving/donations",
  },
  {
    type: "newmember",
    label: "New Here?",
    icon: "person-add-outline",
    color: "#FF9500",
    defaultSize: "medium",
    description: "New member registration",
  },
  {
    type: "events",
    label: "Events",
    icon: "calendar-outline",
    color: "#FF3B30",
    defaultSize: "medium",
    description: "Upcoming events calendar",
  },
  {
    type: "sermons",
    label: "Sermons",
    icon: "mic-outline",
    color: "#AF52DE",
    defaultSize: "small",
    description: "Watch/listen to sermons",
  },
  {
    type: "prayer",
    label: "Prayer",
    icon: "hand-left-outline",
    color: "#5856D6",
    defaultSize: "small",
    description: "Submit prayer requests",
  },
  {
    type: "groups",
    label: "Groups",
    icon: "people-outline",
    color: "#FF2D55",
    defaultSize: "small",
    description: "Connect groups/small groups",
  },
  {
    type: "contact",
    label: "Contact",
    icon: "mail-outline",
    color: "#00C7BE",
    defaultSize: "small",
    description: "Contact information",
  },
  {
    type: "facebook",
    label: "Facebook",
    icon: "logo-facebook",
    color: "#1877F2",
    defaultSize: "small",
    description: "Facebook page",
  },
  {
    type: "instagram",
    label: "Instagram",
    icon: "logo-instagram",
    color: "#E4405F",
    defaultSize: "small",
    description: "Instagram profile",
  },
  {
    type: "twitter",
    label: "Twitter",
    icon: "logo-twitter",
    color: "#1DA1F2",
    defaultSize: "small",
    description: "Twitter/X profile",
  },
  {
    type: "youtube",
    label: "YouTube",
    icon: "logo-youtube",
    color: "#FF0000",
    defaultSize: "small",
    description: "YouTube channel",
  },
  {
    type: "custom",
    label: "Custom",
    icon: "link-outline",
    color: "#8E8E93",
    defaultSize: "small",
    description: "Custom link",
  },
];

// Grid configuration
export const GRID_CONFIG = {
  columns: 4,
  smallSize: 1,
  mediumSize: 2,
  largeSize: 2,
  gapSize: 16,
  tileSize: 76, // Base size for small tile
};

// Get preset by type
export const getPresetByType = (type: TileType): TilePreset | undefined => {
  return TILE_PRESETS.find((preset) => preset.type === type);
};

// Generate unique tile ID
export const generateTileId = (): string => {
  return `tile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Default tiles for new NFC configs
export const getDefaultTiles = (): TileConfig[] => [
  {
    id: generateTileId(),
    type: "website",
    label: "Visit Us",
    icon: "globe-outline",
    url: "",
    size: "large",
    position: { x: 0, y: 0 },
    color: "#007AFF",
  },
  {
    id: generateTileId(),
    type: "give",
    label: "Give",
    icon: "heart-outline",
    url: "",
    size: "medium",
    position: { x: 2, y: 0 },
    color: "#34C759",
  },
  {
    id: generateTileId(),
    type: "newmember",
    label: "New Here?",
    icon: "person-add-outline",
    url: "",
    size: "small",
    position: { x: 0, y: 2 },
    color: "#FF9500",
  },
  {
    id: generateTileId(),
    type: "events",
    label: "Events",
    icon: "calendar-outline",
    url: "",
    size: "small",
    position: { x: 1, y: 2 },
    color: "#FF3B30",
  },
  {
    id: generateTileId(),
    type: "sermons",
    label: "Sermons",
    icon: "mic-outline",
    url: "",
    size: "small",
    position: { x: 2, y: 2 },
    color: "#AF52DE",
  },
  {
    id: generateTileId(),
    type: "contact",
    label: "Contact",
    icon: "mail-outline",
    url: "",
    size: "small",
    position: { x: 3, y: 2 },
    color: "#00C7BE",
  },
];
