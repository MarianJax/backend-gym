import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./ruta/a/tu/clave.key'), // Cambiar la ruta a la ubicación de la clave privada
    cert: fs.readFileSync('./ruta/a/tu/certificado.crt'), // Cambiar la ruta a la ubicación de la certificado
  };

  const server = express();
  // Configurar la zona horaria directamente en la app
  Intl.DateTimeFormat().resolvedOptions().timeZone = 'America/Guayaquil';

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    httpsOptions,
  });
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
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

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
