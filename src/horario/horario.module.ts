import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { DistribucionModule } from 'src/distribucion/distribucion.module';
import { MembresiaModule } from 'src/membresia/membresia.module';
import { AgendamientoModule } from 'src/agendamiento/agendamiento.module';

@Module({
  imports: [TypeOrmModule.forFeature([Horario]), DistribucionModule, MembresiaModule, AgendamientoModule],
  controllers: [HorarioController],
  providers: [HorarioService],
  exports: [HorarioService],
})
export class HorarioModule {}
