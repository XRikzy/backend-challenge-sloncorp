import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  logger.log(
    `SITES-BACKEND IS INIT SUCESSFULLY ON PORT ${process.env.PORT ?? 3000}`,
  );
}
bootstrap().catch((error) =>
  logger.error(`A error is ocurred in the backend: ${error}`),
);
