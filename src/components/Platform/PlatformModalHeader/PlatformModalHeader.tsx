import React from "react";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonSpinner,
} from "@ionic/react";
import { close, checkmark } from "ionicons/icons";
import "./PlatformModalHeader.scss";

interface PlatformModalHeaderProps {
  title: string;
  onClose: () => void;
  onSave?: () => void;
  saveLabel?: string;
  isSaving?: boolean;
  canSave?: boolean;
  showSaveButton?: boolean;
  className?: string;
}

/**
 * Reusable modal header component for platform modals
 * Matches the Edit Home Screen modal header structure
 */
export const PlatformModalHeader: React.FC<PlatformModalHeaderProps> = ({
  title,
  onClose,
  onSave,
  saveLabel = "Done",
  isSaving = false,
  canSave = true,
  showSaveButton = false,
  className = "",
}) => {
  return (
    <IonToolbar className={`platform-modal-header ${className}`}>
      <IonButtons slot="start">
        <IonButton
          fill="clear"
          onClick={onClose}
          disabled={isSaving}
          shape="round"
          color="dark"
        >
          <IonIcon icon={close} />
        </IonButton>
      </IonButtons>

      <IonTitle>{title}</IonTitle>

      {showSaveButton && onSave && (
        <IonButtons slot="end">
          <IonButton
            fill="solid"
            onClick={onSave}
            disabled={isSaving || !canSave}
            shape="round"
            color="primary"
            strong
          >
            {isSaving ? (
              <IonSpinner name="crescent" />
            ) : (
              <>
                <IonIcon slot="start" icon={checkmark} />
                {saveLabel}
              </>
            )}
          </IonButton>
        </IonButtons>
      )}
    </IonToolbar>
  );
};
