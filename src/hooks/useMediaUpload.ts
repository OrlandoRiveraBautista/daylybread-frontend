import { useState } from "react";
import { MediaPurpose } from "../__generated__/graphql";
import { MediaService } from "../services/MediaService";
import { useCreateMedia, useGetPostSignedUrl } from "./MediaHooks";

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

  const [getPostSignedUrl] = useGetPostSignedUrl();
  const [createMedia] = useCreateMedia();

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

    const { data, errors } = await getPostSignedUrl({
      variables: {
        options: {
          filename: file.name,
          mimeType: file.type,
          purpose,
        },
      },
    });

    const { signedUrl, fields, fileKey } = data?.getPostSignedUrl || {};

    if (errors || !signedUrl || !fields || !fileKey) {
      throw new Error(errors?.[0]?.message || "Failed to get signed URL");
    }

    try {
      const result = await MediaService.uploadFileWithPresignedPost({
        file,
        url: signedUrl,
        fields: JSON.parse(fields),
      });

      if (result.success) {
        // 3. Create media record
        const { data, errors } = await createMedia({
          variables: {
            options: {
              filename: file.name,
              mimeType: file.type,
              size: file.size,
              purpose,
              isPublic,
              description,
              url: `https://daylybread.s3.us-east-2.amazonaws.com/${fileKey}`,
            },
          },
        });

        if (errors || !data?.createMedia.results) {
          throw new Error(
            errors?.[0]?.message || "Failed to create media record"
          );
        }

        options?.onSuccess?.(
          data.createMedia.results._id,
          data.createMedia.results.url
        );
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
