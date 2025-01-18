import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Entrenadores } from './entities/entrenadores.entity';
import { Rol } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Entrenadores, Rol]), Rol, Horario],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
