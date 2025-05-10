import React from "react";
import {
  IonButton,
  IonProgressBar,
  IonText,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { MediaPurpose } from "../../__generated__/graphql";
import { useMediaUpload } from "../../hooks/useMediaUpload";

interface MediaUploaderProps {
  purpose: MediaPurpose;
  onUploadSuccess?: (mediaId: string, url: string) => void;
  onUploadError?: (error: string) => void;
  buttonText?: string;
  accept?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  purpose,
  onUploadSuccess,
  onUploadError,
  buttonText = "Upload File",
  accept,
}) => {
  const { uploadFile, isUploading, progress, error } = useMediaUpload({
    onSuccess: onUploadSuccess,
    onError: onUploadError,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file, purpose);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept={accept}
      />
      <IonItem>
        <IonLabel>
          <IonButton
            fill="clear"
            onClick={() => document.getElementById("fileInput")?.click()}
            disabled={isUploading}
          >
            {buttonText}
          </IonButton>
        </IonLabel>
      </IonItem>

      {isUploading && (
        <IonItem>
          <IonProgressBar value={progress / 100} />
        </IonItem>
      )}

      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
    </div>
  );
};
