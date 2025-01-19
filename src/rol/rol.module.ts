import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { Horario } from 'src/horario/entities/horario.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Rol]), Rol, User, Horario],

  controllers: [RolController],
  providers: [RolService],
  exports: [TypeOrmModule],

})
export class RolModule {}
