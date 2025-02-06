/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByEmail(AuthDto: CreateAuthDto) {

    const user = await this.userRepository.findOne({
      where: { correo: AuthDto.correo },
      select: ['id', 'correo', 'contrasena', 'nombre'],

    });

    if (!user) {
      throw new BadRequestException('El correo ingresado no existe');
    }

    const comparaPassword = await bcrypt.compare(AuthDto.contrasena, user.contrasena);

    if (!comparaPassword) {
      throw new BadRequestException('La contraseña ingresada es incorrecta');
    }

    console.log(user)

    const { contrasena, roles, ...newUser } = user;

    return newUser;
  }
}
