/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Rol } from 'src/rol/entities/rol.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,

    private configService: ConfigService,
  ) {}

  async findByEmail(AuthDto: CreateAuthDto) {
    const user = await this.userRepository.findOne({
      where: { correo: AuthDto.correo },
    });

    // user  :{ nombre: '', contrana: 'fdgfds'}
    if (!user || (user && !user.contrasena)) {
      try {
        const loginUrl = this.configService.get('config.DEV')
          ? this.configService.get('config.LOGIN_URL_DEV')
          : this.configService.get('config.LOGIN_URL_PROD');
        const https = require('https');
        const xApiKey = this.configService.get('config.X_API_KEY');

        const httpsAgent = new https.Agent({
          rejectUnauthorized: false, // Ignorar certificados no válidos
        });

        const response = await axios.post(
          loginUrl,
          {
            usuario: AuthDto.correo,
            clave: AuthDto.contrasena,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Api-Key': xApiKey,
            },
            httpsAgent,
          },
        );

        const user = await this.upsertUser({
          nombre: response.data.value.nombres,
          correo: AuthDto.correo,
          tipo_usuario_array: response.data.value.tipo_usuario_array,
        });

        return user;
      } catch (error) {
        console.log(error);
        return { error, message: 'Usuario no encontrado' };
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

  async upsertUser(user: {
    nombre: string;
    correo: string;
    tipo_usuario_array: string[];
  }): Promise<{
    id: string;
    correo: string;
    nombre: string;
    rol: { id: string; nombre: string }[];
  }> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          correo: user.correo,
        },
        relations: ['roles'],
      });

      const rol = await this.validateRol(user.tipo_usuario_array);

      const userData = {
        nombre: user.nombre,
        contrasena: null,
        correo: user.correo,
        roles: [rol],
      };

      if (existingUser) {
        const existeRol = existingUser.roles.some(
          (existingRol) => existingRol.id === rol.id,
        );
        if (!existeRol) existingUser.roles.push(rol);
        if (existingUser.nombre !== user.nombre)
          existingUser.nombre = user.nombre;

        const updatedUser = await this.userRepository.save(existingUser);

        const { contrasena, roles, ...newUser } = updatedUser;
        return {
          ...newUser,
          rol: roles.map((r) => ({ id: r.id, nombre: r.nombre })),
        };
      } else {
        const userCreate = this.userRepository.create(userData);
        const newUser = await this.userRepository.save(userCreate);
        const { contrasena, roles, ...newUs } = newUser;
        return {
          ...newUs,
          rol: roles,
        };
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async validateRol(tipo_usuario_array: string[]): Promise<Rol> {
    if (tipo_usuario_array.includes('75|FUNCIONARIO')) {
      return await this.rolRepository.findOne({
        where: { nombre: ILike('Funcionario') },
      });
    } else if (
      tipo_usuario_array.includes('5|DOCENTE') ||
      tipo_usuario_array.includes('51|DOCENTE TIPO 2')
    ) {
      return await this.rolRepository.findOne({
        where: { nombre: 'Docente' },
      });
    }
    return await this.rolRepository.findOne({
      where: { nombre: 'Estudiante' },
    });
  }
}
