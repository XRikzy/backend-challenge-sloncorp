import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { SitesModule } from './sites/sites.module';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';
import { ContactsModule } from './contacts/contacts.module';
@Module({
  imports: [
    SupabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SitesModule,
    AuthModule,
    S3Module,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
