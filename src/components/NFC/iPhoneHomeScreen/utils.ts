import * as IonIcons from "ionicons/icons";

/**
 * Converts a kebab-case icon name to the corresponding Ionic icon
 * @param iconName - Icon name in kebab-case (e.g., "globe-outline")
 * @returns The Ionic icon or a default fallback icon
 */
export const getIonIcon = (iconName: string): string => {
  const icons = IonIcons as Record<string, string>;
  // Convert kebab-case to camelCase
  const camelCase = iconName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return icons[camelCase] || icons["linkOutline"];
};

/**
 * Adjusts a hex color by darkening or lightening it
 * @param color - Hex color string (e.g., "#007AFF")
 * @param amount - Amount to adjust (-255 to 255, negative for darker, positive for lighter)
 * @returns Adjusted hex color string
 */
export const adjustColor = (color: string, amount: number): string => {
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

/**
 * Handles navigation for tiles in NFC homescreen
 * Always opens links in a new tab to prevent navigating away from the NFC page
 * @param url - URL to navigate to
 * @param event - Optional event to prevent default behavior
 */
export const handleTileNavigation = (url: string, event?: React.MouseEvent | React.KeyboardEvent): void => {
  if (!url) return;

  // Prevent any default navigation behavior
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // For NFC homescreen, always open links in a new tab
  // This ensures the NFC page stays open and doesn't navigate away
  const normalizedUrl = url.startsWith("http://") || url.startsWith("https://") 
    ? url 
    : `https://${url}`;
  
  window.open(normalizedUrl, "_blank", "noopener,noreferrer");
};

/**
 * Handles keyboard events for accessible interactions
 * @param event - Keyboard event
 * @param callback - Function to call when Enter or Space is pressed
 */
export const handleKeyPress = (
  event: React.KeyboardEvent,
  callback: () => void
): void => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    callback();
  }
};
