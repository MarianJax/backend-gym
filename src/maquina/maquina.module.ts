import { Module } from '@nestjs/common';
import { MaquinaService } from './maquina.service';
import { MaquinaController } from './maquina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maquina } from './entities/maquina.entity';
import { Mantenimiento } from 'src/mantenimiento/entities/mantenimiento.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Maquina, Mantenimiento])],
  controllers: [MaquinaController],
  providers: [MaquinaService],
  exports: [TypeOrmModule],
})
export class MaquinaModule {}
