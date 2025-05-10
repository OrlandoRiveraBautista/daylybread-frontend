import { MediaPurpose } from "../__generated__/graphql";
import { useCreateMedia, useGetSignedUrl } from "../hooks/MediaHooks";

interface UploadFileOptions {
  file: File;
  purpose: MediaPurpose;
  description?: string;
  isPublic?: boolean;
}

interface UploadResponse {
  success: boolean;
  mediaId?: string;
  error?: string;
  url?: string;
}

export class MediaService {
  private static async getSignedUrl(
    filename: string,
    fileType: string,
    purpose: MediaPurpose
  ): Promise<{ signedUrl: string; fileKey: string }> {
    const [getSignedUrl] = useGetSignedUrl();
    const { data, errors } = await getSignedUrl({
      variables: {
        options: {
          filename,
          mimeType: fileType,
          purpose,
        },
      },
    });

    if (
      errors ||
      !data?.getSignedUrl.signedUrl ||
      !data?.getSignedUrl.fileKey
    ) {
      throw new Error(errors?.[0]?.message || "Failed to get signed URL");
    }

    return {
      signedUrl: data.getSignedUrl.signedUrl,
      fileKey: data.getSignedUrl.fileKey,
    };
  }

  private static async uploadToS3(
    file: File,
    signedUrl: string
  ): Promise<boolean> {
    try {
      const response = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Error uploading to S3:", error);
      return false;
    }
  }

  public static async uploadFile({
    file,
    purpose,
    description,
    isPublic = false,
  }: UploadFileOptions): Promise<UploadResponse> {
    try {
      // 1. Get signed URL
      const { signedUrl, fileKey } = await this.getSignedUrl(
        file.name,
        file.type,
        purpose
      );
      if (!signedUrl) {
        throw new Error("Failed to get signed URL");
      }

      // 2. Upload to S3
      const uploadSuccess = await this.uploadToS3(file, signedUrl);
      if (!uploadSuccess) {
        throw new Error("Failed to upload to S3");
      }

      // 3. Create media record
      const [createMedia] = useCreateMedia();
      const { data, errors } = await createMedia({
        variables: {
          options: {
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            purpose,
            isPublic,
            description,
            url: `https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${fileKey}`,
          },
        },
      });

      if (errors || !data?.createMedia.results) {
        throw new Error(
          errors?.[0]?.message || "Failed to create media record"
        );
      }

      return {
        success: true,
        mediaId: data.createMedia.results._id,
        url: data.createMedia.results.url,
      };
    } catch (error) {
      console.error("Error in uploadFile:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
