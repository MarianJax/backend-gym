import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/user/entities/roles.entity';
import { Horario } from './entities/horario.entity';
import { Entrenadores } from 'src/user/entities/entrenadores.entity';
import { User } from 'src/user/entities/user.entity';
import { Horario2 } from './entities/horario2.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Horario, Horario2])],
  
  controllers: [HorarioController],
  providers: [HorarioService],
})
export class HorarioModule {}
