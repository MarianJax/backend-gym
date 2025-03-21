/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Rol } from 'src/rol/entities/rol.entity';
import { UserService } from 'src/user/user.service';
import { RolService } from 'src/rol/rol.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map, Observable, timeInterval, timeout } from 'rxjs';
import { Agent } from 'https';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,

    private rolService: RolService,

    private configService: ConfigService,

    private readonly httpService: HttpService
  ) { }

  async findByEmail(AuthDto: CreateAuthDto) {
    const user = await this.userService.findOneByEmail(AuthDto.correo);

    if (!user || (user && !user.contrasena)) {
      try {
        const dat = await this.authenticateUser({ usuario: AuthDto.correo, clave: AuthDto.contrasena });
        if (dat.state === 'success') {
          let userUpsert: User = user ? user : new User();
          const rol = await this.validateRol(dat.value.tipo_usuario_array);

          const upsertedUser = await this.userService.upsertUser({
            nombre: dat.value.nombres.split(' ').slice(2).join(' ') ?? '',
            apellido: dat.value.nombres.split(' ').slice(0, 2).join(' ') ?? '',
            correo: AuthDto.correo,
            cedula: dat.value.cedula ?? '',
            roles: [rol],
          });

          if (upsertedUser.user !== undefined && upsertedUser.user.identifiers[0].id !== undefined) {
            userUpsert = await this.userService.findOne(upsertedUser.user.identifiers[0].id);
          }

          userUpsert.roles = [rol];

          const newUser = await this.userService.save(userUpsert);

          return {
            state: 'success', user: {
              id: newUser.id,
              nombres: newUser.nombre,
              apellidos: newUser.apellido,
              correo: newUser.correo,
              roles: newUser.roles.map((rol) => rol.nombre),
            }
          };
        } else {
          console.log(dat);
          throw new BadRequestException({ response: dat });
        }

      } catch (error) {
        console.log(error);

        if (error.response && error.response.response && error.response.response.state === 'error') {
          throw new BadRequestException({ state: 'error', response: error.response.response.error });
        }
        throw new BadRequestException('Ocurrió un error al autenticar el usuario');
      }
    }

    const comparaPassword = await bcrypt.compare(
      AuthDto.contrasena,
      user.contrasena,
    );

    if (!comparaPassword) {
      throw new BadRequestException('La contraseña ingresada es incorrecta');
    }

    const { contrasena, roles, ...newUser } = user;

    return newUser;
  }

  async validateRol(tipo_usuario_array: string[]): Promise<Rol> {
    if (tipo_usuario_array.includes('75|FUNCIONARIO')) {
      return await this.rolService.findOneByName('Funcionario');
    } else if (
      tipo_usuario_array.includes('5|DOCENTE') ||
      tipo_usuario_array.includes('51|DOCENTE TIPO 2')
    ) {
      return await this.rolService.findOneByName('Docente');
    }
    return await this.rolService.findOneByName('Estudiante');
  }

  async authenticateUser(data: { usuario: string; clave: string; }) {
    const httpsAgent = new Agent({ rejectUnauthorized: false });
    const loginUrl = this.configService.get('config.DEV')
      ? this.configService.get('config.LOGIN_URL_DEV')
      : this.configService.get('config.LOGIN_URL_PROD');

    try {
      return firstValueFrom(
        this.httpService.post(loginUrl, data,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': this.configService.get('config.X_API_KEY'),
            },
            timeout: 10000,
            httpsAgent,
          },
        ).pipe(
          map((response) => {
            return response.data;
          }),
        )
      );
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Ocurrió un error de autenticación');
    }
  }
}
