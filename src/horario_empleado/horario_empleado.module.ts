import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioEmpleado } from './entities/horario_empleado.entity';
import { HorarioEmpleadoController } from './horario_empleado.controller';
import { HorarioEmpleadoService } from './horario_empleado.service';
import { RolModule } from 'src/rol/rol.module';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioEmpleado]), RolModule],
  controllers: [HorarioEmpleadoController],
  providers: [HorarioEmpleadoService],
  exports: [HorarioEmpleadoService],
})
export class HorarioEmpleadoModule { }
