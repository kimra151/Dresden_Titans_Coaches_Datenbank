import { Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private bucketName = process.env.S3_BUCKET_NAME;

  constructor() {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
      },
      forcePathStyle: true,
    });
  }

  async generateTemporaryStreamUrl(videoKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: videoKey,
    });

    // Link verfällt automatisch nach 15 Minuten (900 Sekunden)
    return getSignedUrl(this.s3Client, command, { expiresIn: 900 });
  }
}