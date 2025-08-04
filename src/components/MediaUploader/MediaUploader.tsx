import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonProgressBar,
  IonText,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import {
  trashOutline,
  documentOutline,
  imageOutline,
  eyeOutline,
} from "ionicons/icons";
import { MediaPurpose } from "../../__generated__/graphql";
import { useMediaUpload } from "../../hooks/useMediaUpload";

interface MediaUploaderProps {
  purpose: MediaPurpose;
  onUploadSuccess?: (mediaId: string, url: string) => void;
  onUploadError?: (error: string) => void;
  buttonText?: string;
  accept?: string;
  initialFile?: {
    url: string;
    fileName?: string;
  } | null;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  purpose,
  onUploadSuccess,
  onUploadError,
  buttonText = "Upload File",
  accept,
  initialFile,
}) => {
  const [uploadedFile, setUploadedFile] = useState<{
    mediaId: string;
    url: string;
    fileName: string;
    fileType: string;
  } | null>(null);

  // Helper function to extract clean filename from URL
  const extractFileName = (url: string, providedFileName?: string): string => {
    if (providedFileName) return providedFileName;

    let fileName = "uploaded-file";
    try {
      const urlPath = url.split("?")[0]; // Remove query parameters
      const pathParts = urlPath.split("/");
      const rawFileName = pathParts[pathParts.length - 1];

      // Decode URI component in case filename is encoded
      fileName = decodeURIComponent(rawFileName) || "uploaded-file";

      // If it's still a long UUID-like string, create a more user-friendly name
      if (fileName.length > 50 || /^[a-f0-9-]{20,}/.test(fileName)) {
        const extension = fileName.split(".").pop();
        fileName = `uploaded-file${extension ? "." + extension : ""}`;
      }
    } catch (error) {
      console.warn("Error parsing filename from URL:", error);
      fileName = "uploaded-file";
    }
    return fileName;
  };

  // Set initial file if provided
  useEffect(() => {
    if (initialFile?.url) {
      const fileName = extractFileName(initialFile.url, initialFile.fileName);
      const fileType = fileName.split(".").pop()?.toLowerCase() || "";

      setUploadedFile({
        mediaId: "", // Initial files might not have mediaId
        url: initialFile.url,
        fileName,
        fileType,
      });
    }
  }, [initialFile]);

  const handleOnUploadSuccess = (mediaId: string, url: string) => {
    const fileName = extractFileName(url);
    const fileType = fileName.split(".").pop()?.toLowerCase() || "";

    setUploadedFile({
      mediaId,
      url,
      fileName,
      fileType,
    });
    onUploadSuccess?.(mediaId, url);
  };

  const { uploadFile, isUploading, progress, error } = useMediaUpload({
    onSuccess: handleOnUploadSuccess,
    onError: onUploadError,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file, purpose);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    // Optionally notify parent component that file was removed
    onUploadSuccess?.("", "");

    // Clear the file input
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const isImage = (fileType: string) => {
    return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(fileType);
  };

  const isVideo = (fileType: string) => {
    return ["mp4", "webm", "ogg", "mov", "avi"].includes(fileType);
  };

  const isAudio = (fileType: string) => {
    return ["mp3", "wav", "ogg", "aac", "m4a"].includes(fileType);
  };

  return (
    <div style={{ margin: "16px 0" }}>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept={accept}
      />

      {!uploadedFile ? (
        <IonItem>
          <IonLabel>
            <IonButton
              fill="outline"
              onClick={() => document.getElementById("fileInput")?.click()}
              disabled={isUploading}
              expand="block"
            >
              {buttonText}
            </IonButton>
          </IonLabel>
        </IonItem>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IonIcon
                icon={
                  isImage(uploadedFile.fileType)
                    ? imageOutline
                    : documentOutline
                }
                size="small"
              />
              <IonText>
                <a
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>{uploadedFile.fileName}</strong>
                </a>
              </IonText>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <IonButton
                fill="clear"
                color="primary"
                size="small"
                onClick={() =>
                  window.open(uploadedFile.url, "_blank", "noopener,noreferrer")
                }
                class="icon-button"
              >
                <IonIcon icon={eyeOutline} />
              </IonButton>
              <IonButton
                fill="clear"
                color="danger"
                onClick={handleRemoveFile}
                class="icon-button"
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </div>
          </div>

          {/* Preview based on file type */}
          {isImage(uploadedFile.fileType) && (
            <div style={{ textAlign: "center", marginBottom: "12px" }}>
              <img
                src={uploadedFile.url}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "8px",
                  border: "1px solid var(--ion-color-light)",
                }}
              />
            </div>
          )}

          {isVideo(uploadedFile.fileType) && (
            <div style={{ textAlign: "center", marginBottom: "12px" }}>
              <video
                src={uploadedFile.url}
                controls
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          {isAudio(uploadedFile.fileType) && (
            <div style={{ textAlign: "center", marginBottom: "12px" }}>
              <audio
                src={uploadedFile.url}
                controls
                style={{ width: "100%" }}
              />
            </div>
          )}

          <IonButton
            fill="outline"
            size="small"
            onClick={() => document.getElementById("fileInput")?.click()}
            disabled={isUploading}
          >
            Replace File
          </IonButton>
        </div>
      )}

      {isUploading && (
        <IonItem>
          <IonLabel>
            <IonText>Uploading... {Math.round(progress)}%</IonText>
            <IonProgressBar value={progress / 100} />
          </IonLabel>
        </IonItem>
      )}

      {error && (
        <IonItem>
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        </IonItem>
      )}
    </div>
  );
};
