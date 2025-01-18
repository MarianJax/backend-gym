import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Horario2 } from 'src/horario/entities/horario2.entity';
import { Entrenadores } from './entities/entrenadores.entity';
import { Rol } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Entrenadores, Rol])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
