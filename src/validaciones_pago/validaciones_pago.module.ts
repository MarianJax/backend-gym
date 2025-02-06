import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoModule } from 'src/pago/pago.module';
import { UserModule } from 'src/user/user.module';
import { ValidacionesPago } from './entities/validaciones_pago.entity';
import { ValidacionesPagoController } from './validaciones_pago.controller';
import { ValidacionesPagoService } from './validaciones_pago.service';

@Module({
  imports: [TypeOrmModule.forFeature([ValidacionesPago]), UserModule, PagoModule,],
  controllers: [ValidacionesPagoController],
  providers: [ValidacionesPagoService, UserModule, PagoModule],
  exports: [TypeOrmModule],
})
export class ValidacionesPagoModule { }
