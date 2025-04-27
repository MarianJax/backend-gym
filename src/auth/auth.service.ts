import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import {
  firstValueFrom,
  map
} from 'rxjs';
import { Agent } from 'https';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,

    private readonly httpService: HttpService,
  ) {}

  async findByEmail(AuthDto: CreateAuthDto) {
    try {
      const dat = await this.authenticateUser({
        usuario: AuthDto.correo,
        clave: AuthDto.contrasena,
      });
      if (dat.state === 'success') {
        
        const upsertedUser = {
          nombre: dat.value,
        };

        return {
          state: 'success',
          user: {
            id: dat.value.cedula,
            nombres: dat.value.nombres,
            correo: AuthDto.correo,
            roles_array: dat.value.tipo_usuario_array,
            rol: dat.value.tipo_usuario
          },
        };
      } else {
        console.log(dat);
        throw new BadRequestException({ response: dat });
      }
    } catch (error) {
      console.log(error);

      if (
        error.response &&
        error.response.response &&
        error.response.response.state === 'error'
      ) {
        throw new BadRequestException({
          state: 'error',
          response: error.response.response.error,
        });
      }
      throw new BadRequestException(
        'Ocurrió un error al autenticar el usuario',
      );
    }
  }

  async authenticateUser(data: { usuario: string; clave: string }) {
    const loginUrl = this.configService.get('config.DEV')
      ? this.configService.get('config.LOGIN_URL_DEV')
      : this.configService.get('config.LOGIN_URL_PROD');

    const httpsAgent = new Agent({
      rejectUnauthorized: false,
      family: 4
    });

    try {
      return firstValueFrom(
        this.httpService
          .post(loginUrl, data, {
            headers: {
              'Content-Type': 'application/json',
              'X-Api-Key': this.configService.get('config.X_API_KEY') as string,
            },
            httpsAgent,
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
