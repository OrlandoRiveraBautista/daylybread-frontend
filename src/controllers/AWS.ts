import AWS from "aws-sdk";

export class aws {
  constructor() {
    // Set AWS credentials and region
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCES_KEY,
      region: "us-east-2", // e.g., 'us-east-1'
    });
  }

  async downloadFileFromS3(url: string) {
    const s3 = new AWS.S3();

    const { pathname } = new URL(url);
    const obj = await s3
      .getObject({
        Bucket: process.env.REACT_APP_BUCKET_NAME!,
        Key: pathname.substring(1),
      })
      .promise();

    if (!obj.Body) return;
    const blob = new Blob([new Uint8Array(obj.Body as any)], {
      type: "audio/mp3",
    });

    return blob;
  }
}
