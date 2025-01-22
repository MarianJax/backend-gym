import { Module } from '@nestjs/common';
import { EntrenadorService } from './entrenador.service';
import { EntrenadorController } from './entrenador.controller';
import { HorarioEmpleado } from 'src/horario_empleado/entities/horario_empleado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrenadores } from './entities/entrenador.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Entrenadores]), HorarioEmpleado],
  controllers: [EntrenadorController],
  providers: [EntrenadorService],
  exports: [TypeOrmModule],
})
export class EntrenadorModule {}
