import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { Pago } from './entities/pago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { Mantenimiento } from 'src/mantenimiento/entities/mantenimiento.entity';
import { Membresia } from 'src/membresia/entities/membresia.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Pago, Membresia]), Agendamiento],
  controllers: [PagoController],
  providers: [PagoService],
  exports: [TypeOrmModule],
})
export class PagoModule {}
