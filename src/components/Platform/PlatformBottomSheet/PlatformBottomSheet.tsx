import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonSpinner,
} from "@ionic/react";
import "./PlatformBottomSheet.scss";
import "../../../pages/Platform/Platform/Platform.scss";

interface PlatformBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** If provided, renders the gradient save button at the bottom */
  onSave?: () => void;
  saveLabel?: string;
  saveDisabled?: boolean;
  isSaving?: boolean;
  /** Rendered between the form and the save button (e.g. info hints) */
  footer?: React.ReactNode;
  initialBreakpoint?: number;
  breakpoints?: number[];
  /** Form fields — rendered inside platform-form-container > platform-form */
  children: React.ReactNode;
}

/**
 * Reusable bottom-sheet modal matching the TileConfigModal pattern.
 * Provides IonHeader + IonToolbar with Cancel button, glass-card form fields,
 * and the gradient platform-save-button at the bottom.
 */
export const PlatformBottomSheet: React.FC<PlatformBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  onSave,
  saveLabel = "Save",
  saveDisabled = false,
  isSaving = false,
  footer,
  initialBreakpoint = 0.75,
  breakpoints = [0, 0.75, 1],
  children,
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={breakpoints}
      initialBreakpoint={initialBreakpoint}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="platform-bottom-sheet-content">
        <div className="platform-bottom-sheet-body">
          <div className="platform-form-container">
            <div className="platform-form">{children}</div>
          </div>

          {footer}

          {onSave && (
            <IonButton
              expand="block"
              fill="solid"
              shape="round"
              className="platform-save-button"
              onClick={onSave}
              disabled={saveDisabled || isSaving}
            >
              {isSaving ? <IonSpinner name="crescent" /> : saveLabel}
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};
