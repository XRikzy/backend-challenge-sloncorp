import { logger } from '@/utils/logger';
import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
@Injectable()
export class SupabaseService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: SupabaseClient,
  ) {}
  async onModuleInit() {
    const res = await this.supabaseClient.from('sites').select().limit(1);
    if (res?.error) {
      logger.error('❌ Error to connected to the database');
    } else {
      logger.log('✅ Connection to the database created sucessfully');
    }
  }
  getClient() {
    return this.supabaseClient;
  }
}
