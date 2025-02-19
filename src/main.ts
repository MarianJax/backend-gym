import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Configurar la zona horaria directamente en la app
  Intl.DateTimeFormat().resolvedOptions().timeZone = 'America/Guayaquil';

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
     // whitelist: true,
      //forbidNonWhitelisted: true,
      //transform: true,
      exceptionFactory: (errors) => {
        if (errors.length > 0) {
          const formattedErrors = errors.reduce((acc, error) => {
            acc[error.property] = Object.values(error.constraints)[0];
            return acc;
          }, {});
          return new BadRequestException({
            statusCode: 400,
            message: 'Validation failed',
            errors: formattedErrors,
          });
        }

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: {},
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
