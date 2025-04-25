import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { RolModule } from 'src/rol/rol.module';
import { HorarioModule } from 'src/horario/horario.module';
import { FacultadModule } from 'src/facultad/facultad.module';
import { CarreraModule } from 'src/carrera/carrera.module';

@Module({
  imports: [TypeOrmModule.forFeature([Persona]), RolModule, HorarioModule, FacultadModule, CarreraModule],
  controllers: [PersonaController],
  providers: [PersonaService],
  exports: [PersonaService],
})
export class PersonaModule { }
