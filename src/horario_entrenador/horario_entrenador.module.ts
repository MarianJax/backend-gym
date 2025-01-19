import { Module } from '@nestjs/common';
import { HorarioEntrenadorService } from './horario_entrenador.service';
import { HorarioEntrenadorController } from './horario_entrenador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrenadores } from 'src/entrenador/entities/entrenador.entity';
import { HorarioEntrenador } from './entities/horario_entrenador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioEntrenador])],
  controllers: [HorarioEntrenadorController],
  providers: [HorarioEntrenadorService],
  exports: [TypeOrmModule],
})
export class HorarioEntrenadorModule {}
