import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrenadorModule } from 'src/entrenador/entrenador.module';
import { EntrenadorService } from 'src/entrenador/entrenador.service';
import { HorarioEmpleado } from './entities/horario_empleado.entity';
import { HorarioEmpleadoController } from './horario_empleado.controller';
import { HorarioEmpleadoService } from './horario_empleado.service';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioEmpleado]), EntrenadorModule],
  controllers: [HorarioEmpleadoController],
  providers: [HorarioEmpleadoService, EntrenadorService],
  exports: [TypeOrmModule],
})
export class HorarioEmpleadoModule { }
