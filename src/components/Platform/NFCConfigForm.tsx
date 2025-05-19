import React from "react";
import {
  IonCard,
  IonCardContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonSpinner,
} from "@ionic/react";
import { MediaUploader } from "../MediaUploader/MediaUploader";
import { MediaPurpose } from "../../__generated__/graphql";

interface NFCContent {
  type: "link" | "file";
  title: string;
  description: string;
  content: string;
}

interface NFCConfigFormProps {
  nfcContent: NFCContent;
  setNfcContent: (content: NFCContent) => void;
  onSave: () => void;
  isSaving: boolean;
  isUpdating: boolean;
}

export const NFCConfigForm: React.FC<NFCConfigFormProps> = ({
  nfcContent,
  setNfcContent,
  onSave,
  isSaving,
  isUpdating,
}) => {
  return (
    <IonCard className="platform-card">
      <IonCardContent>
        <IonTitle className="platform-title">NFC Tag Configuration</IonTitle>
        <div className="platform-form">
          <IonItem>
            <IonLabel position="stacked">Content Type</IonLabel>
            <IonSelect
              value={nfcContent.type}
              onIonChange={(e) =>
                setNfcContent({ ...nfcContent, type: e.detail.value })
              }
            >
              <IonSelectOption value="link">Link</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              value={nfcContent.title}
              onIonChange={(e) =>
                setNfcContent({ ...nfcContent, title: e.detail.value! })
              }
              placeholder="Enter title for the NFC tag"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={nfcContent.description}
              onIonChange={(e) =>
                setNfcContent({
                  ...nfcContent,
                  description: e.detail.value!,
                })
              }
              placeholder="Enter description for the NFC tag"
              rows={3}
            />
          </IonItem>

          {nfcContent.type === "link" ? (
            <IonItem>
              <IonLabel position="stacked">URL</IonLabel>
              <IonInput
                type="url"
                value={nfcContent.content}
                onIonChange={(e) =>
                  setNfcContent({
                    ...nfcContent,
                    content: e.detail.value!,
                  })
                }
                placeholder="Enter URL"
              />
            </IonItem>
          ) : (
            <MediaUploader
              purpose={MediaPurpose.Other}
              onUploadSuccess={(mediaId, url) => {
                setNfcContent({ ...nfcContent, content: url });
              }}
            />
          )}

          <IonButton
            expand="block"
            size="large"
            onClick={onSave}
            className="platform-save-button"
          >
            {isSaving && <IonSpinner name="crescent" />}
            {isUpdating ? "Update NFC Content" : "Save NFC Content"}
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
