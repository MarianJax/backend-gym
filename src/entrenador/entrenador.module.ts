import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioModule } from 'src/horario/horario.module';
import { Entrenadores } from './entities/entrenador.entity';
import { EntrenadorController } from './entrenador.controller';
import { EntrenadorService } from './entrenador.service';
import { HorarioService } from 'src/horario/horario.service';
import { RolModule } from 'src/rol/rol.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entrenadores]), HorarioModule, RolModule],
  controllers: [EntrenadorController],
  providers: [EntrenadorService, HorarioService],
  exports: [TypeOrmModule],
})
export class EntrenadorModule { }
