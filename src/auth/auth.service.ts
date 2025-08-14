import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Agent } from 'https';
import { firstValueFrom, map } from 'rxjs';
import { CreateAuthDto } from './dto/create-auth.dto';

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
        console.log(dat.value)
        return {
          state: 'success',
          user: {
            id: dat.value.cedula,
            nombres: dat.value.nombres,
            correo: AuthDto.correo,
            roles_array:
              this.switchRolForUser(dat.value.tipo_usuario_array) ===
                'ADMINISTRADOR GYM' &&
              this.getAllowedRoles(dat.value.tipo_usuario_array),
            rol: this.switchRolForUser(dat.value.tipo_usuario_array),
            datos_estudio: dat.value.datos_estudio,
            iddepartamento: dat.value.iddepartamento,
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

  switchRolForUser(Array_Roles: string[]) {
    if (Array_Roles.includes('165|ADMINISTRADOR GYM')) {
      return 'ADMINISTRADOR GYM';
    } else if (Array_Roles.includes('166|ENTRENADOR')) {
      return 'ENTRENADOR';
    } else if (
      Array_Roles.includes('5|DOCENTE') ||
      Array_Roles.includes('51|DOCENTE TIPO 2')
    ) {
      return 'DOCENTE';
    } else if (
      Array_Roles.includes('1|ESTUDIANTE') ||
      Array_Roles.includes('55|ASPIRANTE')
    ) {
      return 'ESTUDIANTE';
    } else if (Array_Roles.includes('75|FUNCIONARIO')) {
      return 'FUNCIONARIO';
    } else {
      return 'FUNCIONARIO';
    }
  }

  getAllowedRoles(roles: string[]): string[] {
    const allowedRoles = [];
    if (roles.includes('165|ADMINISTRADOR GYM')) {
      allowedRoles.push('ADMINISTRADOR GYM');
    }
    if (roles.includes('166|ENTRENADOR')) {
  
      allowedRoles.push('ENTRENADOR');
    }
    if (roles.includes('5|DOCENTE') || roles.includes('51|DOCENTE TIPO 2')) {
      allowedRoles.push('DOCENTE');
    }
    if (roles.includes('1|ESTUDIANTE') || roles.includes('55|ASPIRANTE')) {
      allowedRoles.push('ESTUDIANTE');
    } 
    if (roles.includes('75|FUNCIONARIO')) {
      allowedRoles.push('FUNCIONARIO');
    }
    return allowedRoles;
  }

  async authenticateUser(data: { usuario: string; clave: string }) {
    const loginUrl = this.configService.get('config.DEV')
      ? this.configService.get('config.LOGIN_URL_DEV')
      : this.configService.get('config.LOGIN_URL_PROD');

    const httpsAgent = new Agent({
      rejectUnauthorized: false,
      family: 4,
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
