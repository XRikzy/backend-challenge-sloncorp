import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { S3Module } from '@/s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Contact } from './entities/contacts.entity';

@Module({
  imports: [
    S3Module,
    TypeOrmModule.forFeature([Site, Contact]),
    MulterModule.register({
      storage: undefined,
      limits: {
        fileSize: 5 * 1024 * 1024,
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
