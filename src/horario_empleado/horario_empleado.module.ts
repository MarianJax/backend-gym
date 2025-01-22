import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioEmpleadoController } from './horario_empleado.controller';
import { HorarioEmpleadoService } from './horario_empleado.service';
import { HorarioEmpleado } from './entities/horario_empleado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioEmpleado])],
  controllers: [HorarioEmpleadoController],
  providers: [HorarioEmpleadoService],
  exports: [TypeOrmModule],
})
export class HorarioEmpleadoModule {}
