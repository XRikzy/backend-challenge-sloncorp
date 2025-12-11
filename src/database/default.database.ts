import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const getSupaDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: [join(__dirname + '/../**/*.entity{.ts,.js}')],
  logging: ['error', 'warn'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
