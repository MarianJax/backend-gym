import { Module } from '@nestjs/common';
import { EjerciciosService } from './ejercicios.service';
import { EjerciciosController } from './ejercicios.controller';
import { Ejercicio } from './entities/ejercicio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutinaModule } from 'src/rutina/rutina.module';
import { MaquinaModule } from 'src/maquina/maquina.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ejercicio]), RutinaModule, MaquinaModule],
  controllers: [EjerciciosController],
  providers: [EjerciciosService],
  exports: [EjerciciosService]
})
export class EjerciciosModule { }
