import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AgendamientoController } from './agendamiento.controller';
import { AgendamientoService } from './agendamiento.service';
import { Agendamiento } from './entities/agendamiento.entity';
import { MembresiaModule } from 'src/membresia/membresia.module';
import { PagoModule } from 'src/pago/pago.module';
import { RolModule } from 'src/rol/rol.module';
import { ValidacionesPagoModule } from 'src/validaciones_pago/validaciones_pago.module';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamiento]), UserModule, MembresiaModule, PagoModule, RolModule, ValidacionesPagoModule],
  controllers: [AgendamientoController],
  providers: [AgendamientoService],
  exports: [AgendamientoService],
})
export class AgendamientoModule { }
