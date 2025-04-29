import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { Agent } from 'https'

@Injectable()
export class InstitucionService {

  constructor(private configService: ConfigService, private readonly httpService: HttpService) { }

  findAll() {
    const token = this.configService.get('config.X_API_KEY');
    const url = this.configService.get('config.URL_INSTITUCION');
    const httpsAgent = new Agent({
      rejectUnauthorized: false, // Permitir certificados no válidos (no recomendado para producción)
      family: 4, // IPv4
    });

    try {
          return firstValueFrom(
            this.httpService
              .post(url,'', {
                headers: {
                  'Content-Type': 'application/json',
                  'X-Api-Key': token as string,
                },
                httpsAgent
              })
              .pipe(
                map((response) => {
                  return response.data;
                }),
              ),
          );
              } catch (error) {
                console.log('->', error);
                throw new BadRequestException('Ocurrió un error de autenticación');
              }
  }
}
