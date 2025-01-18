import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { Pago } from './entities/pago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { Mantenimiento } from 'src/maquina/entities/mantenimiento.entity';
import { Membresia } from './entities/membresia.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Pago, Mantenimiento])],
  controllers: [PagoController],
  providers: [PagoService],
})
export class PagoModule {}
