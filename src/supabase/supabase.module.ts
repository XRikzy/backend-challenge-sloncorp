import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { createClient } from '@supabase/supabase-js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { logger } from '@/utils/logger';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_SUPABASE_URL');
        const key = config.get<string>('DATABASE_SUPABASE_ANON_KEY');
        if (!url || !key) {
          logger.error(
            'SUPABASE_URL and SUPABASE_KEY must be defined in environment',
          );
          throw new Error('SUPABASE_URL and SUPABASE_KEY must be defined');
        }
        return createClient(url, key);
      },
      inject: [ConfigService],
    },
    SupabaseService,
  ],
  exports: [SupabaseService, 'SUPABASE_CLIENT'],
})
export class SupabaseModule {}
