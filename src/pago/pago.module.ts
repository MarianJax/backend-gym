import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membresia } from 'src/membresia/entities/membresia.entity';
import { Pago } from './entities/pago.entity';
import { PagoController } from './pago.controller';
import { PagoService } from './pago.service';
@Module({
  imports: [TypeOrmModule.forFeature([Pago, Membresia])],
  controllers: [PagoController],
  providers: [PagoService],
  exports: [TypeOrmModule],
})
export class PagoModule { }
