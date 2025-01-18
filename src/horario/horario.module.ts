import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/user/entities/roles.entity';
import { Horario } from './entities/horario.entity';
import { Entrenadores } from 'src/user/entities/entrenadores.entity';
import { HorarioEmpleado } from './entities/horario_empleado.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Horario, HorarioEmpleado]), Entrenadores, Rol],

  controllers: [HorarioController],
  providers: [HorarioService],
  exports: [TypeOrmModule],
})
export class HorarioModule {}
