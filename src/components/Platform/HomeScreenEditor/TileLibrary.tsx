import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
} from "@ionic/react";
import { close, add } from "ionicons/icons";
import * as IonIcons from "ionicons/icons";
import { TILE_PRESETS, TilePreset } from "../../NFC/iPhoneHomeScreen/types";

interface TileLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: TilePreset) => void;
}

/**
 * Library of tile presets that can be added to the home screen
 */
export const TileLibrary: React.FC<TileLibraryProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  // Get the icon from ionicons
  const getIcon = (iconName: string) => {
    const icons = IonIcons as Record<string, string>;
    const camelCase = iconName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return icons[camelCase] || icons["linkOutline"];
  };

  // Group presets by category
  const categories = {
    "Church Essentials": TILE_PRESETS.filter((p) =>
      ["website", "give", "newmember", "events"].includes(p.type)
    ),
    "Engagement": TILE_PRESETS.filter((p) =>
      ["sermons", "prayer", "groups", "contact"].includes(p.type)
    ),
    "Social Media": TILE_PRESETS.filter((p) =>
      ["facebook", "instagram", "twitter", "youtube"].includes(p.type)
    ),
    "Custom": TILE_PRESETS.filter((p) => p.type === "custom"),
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.75, 1]}
      initialBreakpoint={0.75}
      className="tile-library-modal"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Tile</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="tile-library-content">
        <div className="tile-library">
          {Object.entries(categories).map(([category, presets]) => (
            <div key={category} className="category-section">
              <h3 className="category-title">{category}</h3>
              <div className="presets-grid">
                {presets.map((preset) => (
                  <button
                    key={preset.type}
                    className="preset-card"
                    onClick={() => onSelectPreset(preset)}
                  >
                    <div
                      className="preset-icon"
                      style={{ backgroundColor: preset.color }}
                    >
                      <IonIcon icon={getIcon(preset.icon)} />
                    </div>
                    <div className="preset-info">
                      <span className="preset-label">{preset.label}</span>
                      <span className="preset-description">
                        {preset.description}
                      </span>
                    </div>
                    <div className="preset-action">
                      <IonIcon icon={add} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default TileLibrary;
