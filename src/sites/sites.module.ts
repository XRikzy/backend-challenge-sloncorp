import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { S3Module } from '@/s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Contact } from './entities/contacts.entity';

@Module({
  imports: [S3Module, TypeOrmModule.forFeature([Site, Contact])],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}
