import { Module } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { FacultadModule } from 'src/facultad/facultad.module';
import { FacultadService } from 'src/facultad/facultad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera]), FacultadModule],
  controllers: [CarreraController],
  providers: [CarreraService, FacultadService],
  exports: [TypeOrmModule],
})
export class CarreraModule {}
