interface UploadFileOptions {
  file: File;
  signedUrl?: string;
}

interface UploadResponse {
  success: boolean;
  error?: string;
}

export class MediaService {
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error("S3 Upload Error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error uploading to S3:", error);
      return false;
    }
  }

  public static async uploadFile({
    file,
    signedUrl,
  }: UploadFileOptions): Promise<UploadResponse> {
    try {
      if (!signedUrl) {
        throw new Error("Failed to get signed URL");
      }

      const uploadSuccess = await this.uploadToS3(file, signedUrl);
      if (!uploadSuccess) {
        throw new Error("Failed to upload to S3");
      }

      return {
        success: true,
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

  public static async uploadFileWithPresignedPost(options: {
    file: File;
    url: string;
    fields: Record<string, string>;
  }): Promise<UploadResponse> {
    console.log("uploadFileWithPresignedPost", options);

    const formData = new FormData();
    Object.entries(options.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", options.file);

    try {
      const response = await fetch(options.url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload to S3");
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error in uploadFileWithPresignedPost:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
