import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { S3Module } from '@/s3/s3.module';

@Module({
  imports: [
    S3Module,
    MulterModule.register({
      storage: undefined, // Multer en memoria
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
        ];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'), false);
        }
      },
    }),
  ],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}
