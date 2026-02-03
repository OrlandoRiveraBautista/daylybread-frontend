import React from "react";
import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonTitle,
} from "@ionic/react";
import { arrowBack, save, cloudDone } from "ionicons/icons";
import { EditorHeaderProps } from "../types";

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  isNew,
  hasChanges,
  lastSaved,
  isSaving,
  onBack,
  onSave,
}) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={onBack} fill="clear" shape="round">
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonButtons>
        <IonTitle>{isNew ? "New Sermon" : "Edit Sermon"}</IonTitle>
        <IonButtons slot="end">
          {lastSaved && !hasChanges && (
            <div className="save-status saved">
              <IonIcon icon={cloudDone} />
              <span>All changes saved</span>
            </div>
          )}
          {hasChanges && !isSaving && (
            <div className="save-status unsaved">
              <span>Unsaved changes</span>
            </div>
          )}
          <IonButton
            onClick={onSave}
            disabled={isSaving || (!hasChanges && !isNew)}
            fill="solid"
            shape="round"
            color="primary"
            className="save-button"
          >
            {isSaving ? (
              <>
                <IonSpinner name="crescent" className="button-spinner" />
                Saving...
              </>
            ) : (
              <>
                <IonIcon slot="start" icon={save} className="button-icon" />
                Save
              </>
            )}
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
