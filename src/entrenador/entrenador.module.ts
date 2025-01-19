import { Module } from '@nestjs/common';
import { EntrenadorService } from './entrenador.service';
import { EntrenadorController } from './entrenador.controller';
import { HorarioEntrenador } from 'src/horario_entrenador/entities/horario_entrenador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrenadores } from './entities/entrenador.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Entrenadores]), HorarioEntrenador],
  controllers: [EntrenadorController],
  providers: [EntrenadorService],
  exports: [TypeOrmModule],

})
export class EntrenadorModule {}
