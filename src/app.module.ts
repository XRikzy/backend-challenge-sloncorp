import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SitesModule } from './sites/sites.module';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getSupaDatabaseConfig } from './database/default.database';
import { logger } from './utils/logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const config = getSupaDatabaseConfig(configService);
        logger.log(`🔗 Connecting to the main supabase DB`);
        return config;
      },
      inject: [ConfigService],
    }),
    SitesModule,
    AuthModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
