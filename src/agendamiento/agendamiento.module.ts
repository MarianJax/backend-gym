import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamientoController } from './agendamiento.controller';
import { AgendamientoService } from './agendamiento.service';
import { Agendamiento } from './entities/agendamiento.entity';
import { MembresiaModule } from 'src/membresia/membresia.module';
import { PagoModule } from 'src/pago/pago.module';
import { DistribucionModule } from 'src/distribucion/distribucion.module';
import { ValidacionesPagoModule } from 'src/validaciones_pago/validaciones_pago.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agendamiento]),
    MembresiaModule,
    PagoModule,
    DistribucionModule,
    ValidacionesPagoModule,
  ],
  controllers: [AgendamientoController],
  providers: [AgendamientoService],
  exports: [AgendamientoService],
})
export class AgendamientoModule {}
