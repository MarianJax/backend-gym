import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolModule } from 'src/rol/rol.module';
import { HorarioModule } from 'src/horario/horario.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolModule, HorarioModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
