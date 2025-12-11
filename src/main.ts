import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './utils/logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors({
    origin: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  logger.log(`✅ Connected to de DB`);
  logger.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}/`,
  );
}
bootstrap().catch((error) =>
  logger.error(`A error is ocurred in the backend: ${error}`),
);
