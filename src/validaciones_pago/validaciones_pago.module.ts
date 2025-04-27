import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoModule } from 'src/pago/pago.module';
import { ValidacionesPago } from './entities/validaciones_pago.entity';
import { ValidacionesPagoController } from './validaciones_pago.controller';
import { ValidacionesPagoService } from './validaciones_pago.service';

@Module({
  imports: [TypeOrmModule.forFeature([ValidacionesPago]), PagoModule,],
  controllers: [ValidacionesPagoController],
  providers: [ValidacionesPagoService],
  exports: [ValidacionesPagoService],
})
export class ValidacionesPagoModule { }
