import { Module } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { FacultadModule } from 'src/facultad/facultad.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera]), FacultadModule],
  controllers: [CarreraController],
  providers: [CarreraService],
  exports: [CarreraService],
})
export class CarreraModule {}
