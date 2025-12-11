import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './utils/logger';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Sites Management API')
    .setDescription(
      'API RESTful para gestión de sitios con autenticación JWT e integración S3',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .addTag('Auth', 'Autenticación y autorización')
    .addTag('Sites', 'Gestión de sitios')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`✅ Connected to the DB`);
  logger.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}/`,
  );
  logger.log(
    `📚 Swagger documentation available at: http://localhost:${process.env.PORT ?? 3000}/api/docs`,
  );
}
bootstrap().catch((error) =>
  logger.error(`A error is ocurred in the backend: ${error}`),
);
