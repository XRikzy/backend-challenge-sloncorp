import {
  BadRequestException,
  Injectable,
  Inject,
  Optional,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { logger as defaultLogger } from '@/utils/logger';
@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  private readonly sitesFolder: string;
  private readonly region: string;
  private readonly logger: typeof defaultLogger;

  constructor(
    private readonly configService: ConfigService,
    @Optional() @Inject('S3_CLIENT') s3Client?: S3Client,
    @Optional() @Inject('LOGGER') loggerInstance?: typeof defaultLogger,
  ) {
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET') || '';
    this.sitesFolder =
      this.configService.get<string>('AWS_S3_SITES_FOLDER') || 'sites/';
    this.region = this.configService.get<string>('AWS_S3_REGION') || '';
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    if (!accessKeyId || !secretAccessKey) {
      throw new Error(
        'AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be defined',
      );
    }
    this.s3 =
      s3Client ||
      new S3Client({
        region: this.region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
    this.logger = loggerInstance || defaultLogger;
    this.logger.log(`S3Service initialized with bucket: ${this.bucketName}`);
  }

  async uploadImageToS3(
    file: Express.Multer.File,
    customPath?: string,
  ): Promise<string> {
    this.validateFile(file);
    const fileExtension = this.getFileExtension(file.originalname);
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const s3Key = customPath
      ? `${customPath}${uniqueFileName}`
      : `${this.sitesFolder}${uniqueFileName}`;

    this.logger.log(`Uploading file to S3: ${s3Key}`);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: s3Key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
      CacheControl: 'max-age=31536000',
    });

    try {
      await this.s3.send(command);
      const publicUrl = this.getPublicUrl(s3Key);
      this.logger.log(`File uploaded successfully: ${publicUrl}`);
      return publicUrl;
    } catch (error) {
      this.logger.error(`Error uploading to S3: ${error}`);
      throw new BadRequestException(`Failed to upload image: ${error}`);
    }
  }

  private validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const validMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ];
    if (!validMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and WebP are allowed',
      );
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File size must be less than 5MB');
    }
  }

  private getFileExtension(filename: string): string {
    const ext = filename.split('.').pop();
    return ext || 'jpg';
  }

  private getPublicUrl(s3Key: string): string {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${s3Key}`;
  }
}
