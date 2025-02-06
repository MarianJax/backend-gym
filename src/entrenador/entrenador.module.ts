import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrenadores } from './entities/entrenador.entity';
import { EntrenadorController } from './entrenador.controller';
import { EntrenadorService } from './entrenador.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entrenadores])],
  controllers: [EntrenadorController],
  providers: [EntrenadorService],
  exports: [TypeOrmModule],
})
export class EntrenadorModule { }
