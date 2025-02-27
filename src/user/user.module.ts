import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from 'src/horario/entities/horario.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Rol]), Rol, Horario],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
