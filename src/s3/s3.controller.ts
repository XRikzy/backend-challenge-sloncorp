import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class S3Controller {
  constructor(private readonly s3Services: S3Service) {}
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async UploadImage(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException(`File is required`);
    }
    const imageUrl = await this.s3Services.uploadImageToS3(image);
    return {
      success: true,
      imageUrl,
      message: 'Image uploaded successfully',
    };
  }
}
