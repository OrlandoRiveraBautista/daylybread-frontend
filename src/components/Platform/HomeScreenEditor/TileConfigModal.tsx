import React, { useState, useEffect } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonToggle,
} from "@ionic/react";
import { close, checkmark } from "ionicons/icons";
import * as IonIcons from "ionicons/icons";
import { TileConfig, TileSize, TILE_PRESETS } from "../../NFC/iPhoneHomeScreen/types";

interface TileConfigModalProps {
  tile: TileConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (tile: TileConfig) => void;
}

const COLOR_PRESETS = [
  "#007AFF", // Blue
  "#34C759", // Green
  "#FF9500", // Orange
  "#FF3B30", // Red
  "#AF52DE", // Purple
  "#FF2D55", // Pink
  "#5856D6", // Indigo
  "#00C7BE", // Teal
  "#8E8E93", // Gray
  "#1877F2", // Facebook
  "#E4405F", // Instagram
  "#1DA1F2", // Twitter
];

/**
 * Modal for configuring a tile's properties
 */
export const TileConfigModal: React.FC<TileConfigModalProps> = ({
  tile,
  isOpen,
  onClose,
  onSave,
}) => {
  const [label, setLabel] = useState(tile.label);
  const [url, setUrl] = useState(tile.url);
  const [subtitle, setSubtitle] = useState(tile.subtitle || "");
  const [size, setSize] = useState<TileSize>(tile.size);
  const [color, setColor] = useState(tile.color || "#007AFF");
  const [isInDock, setIsInDock] = useState(tile.isInDock || false);

  // Reset form when tile changes
  useEffect(() => {
    setLabel(tile.label);
    setUrl(tile.url);
    setSubtitle(tile.subtitle || "");
    setSize(tile.size);
    setColor(tile.color || "#007AFF");
    setIsInDock(tile.isInDock || false);
  }, [tile]);

  const handleSave = () => {
    onSave({
      ...tile,
      label,
      url,
      subtitle: subtitle || undefined,
      size,
      color,
      isInDock,
    });
  };

  // Get the icon from ionicons
  const getIcon = (iconName: string) => {
    const icons = IonIcons as Record<string, string>;
    const camelCase = iconName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return icons[camelCase] || icons["linkOutline"];
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.75, 1]}
      initialBreakpoint={0.75}
      className="tile-config-modal"
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Tile</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave} strong>
              <IonIcon slot="start" icon={checkmark} />
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="tile-config-content">
        <div className="tile-config">
          {/* Preview */}
          <div className="tile-preview">
            <div
              className={`preview-tile preview-${size}`}
              style={{
                background: `linear-gradient(135deg, ${color}, ${adjustColor(color, -20)})`,
              }}
            >
              <div className="preview-icon">
                <IonIcon icon={getIcon(tile.icon)} />
              </div>
              <span className="preview-label">{label || "Label"}</span>
            </div>
          </div>

          {/* Form */}
          <div className="config-form">
            <IonItem>
              <IonLabel position="stacked">Label</IonLabel>
              <IonInput
                value={label}
                placeholder="Enter tile label"
                onIonChange={(e) => setLabel(e.detail.value || "")}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">URL</IonLabel>
              <IonInput
                type="url"
                value={url}
                placeholder="https://example.com"
                onIonChange={(e) => setUrl(e.detail.value || "")}
              />
            </IonItem>

            {(size === "medium" || size === "large") && (
              <IonItem>
                <IonLabel position="stacked">Subtitle (optional)</IonLabel>
                <IonInput
                  value={subtitle}
                  placeholder="Brief description"
                  onIonChange={(e) => setSubtitle(e.detail.value || "")}
                />
              </IonItem>
            )}

            <IonItem>
              <IonLabel position="stacked">Size</IonLabel>
              <IonSelect
                value={size}
                onIonChange={(e) => setSize(e.detail.value)}
              >
                <IonSelectOption value="small">Small (1x1)</IonSelectOption>
                <IonSelectOption value="medium">Medium (2x1)</IonSelectOption>
                <IonSelectOption value="large">Large (2x2)</IonSelectOption>
              </IonSelect>
            </IonItem>

            <div className="color-section">
              <IonLabel>Color</IonLabel>
              <div className="color-grid">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c}
                    className={`color-option ${color === c ? "active" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>

            <IonItem>
              <IonLabel>Show in Dock</IonLabel>
              <IonToggle
                checked={isInDock}
                onIonChange={(e) => setIsInDock(e.detail.checked)}
              />
            </IonItem>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

// Helper to darken/lighten colors
function adjustColor(color: string, amount: number): string {
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export default TileConfigModal;
