import { useState } from "react";
import { MediaPurpose } from "../__generated__/graphql";
import { MediaService } from "../services/MediaService";

interface UseMediaUploadOptions {
  onSuccess?: (mediaId: string, url: string) => void;
  onError?: (error: string) => void;
}

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export const useMediaUpload = (options?: UseMediaUploadOptions) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
  });

  const uploadFile = async (
    file: File,
    purpose: MediaPurpose,
    description?: string,
    isPublic: boolean = false
  ) => {
    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
    });

    try {
      const result = await MediaService.uploadFile({
        file,
        purpose,
        description,
        isPublic,
      });

      if (result.success && result.mediaId && result.url) {
        options?.onSuccess?.(result.mediaId, result.url);
        setUploadState({
          isUploading: false,
          progress: 100,
          error: null,
        });
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      options?.onError?.(errorMessage);
      setUploadState({
        isUploading: false,
        progress: 0,
        error: errorMessage,
      });
    }
  };

  return {
    uploadFile,
    ...uploadState,
  };
};
