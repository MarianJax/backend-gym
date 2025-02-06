import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AgendamientoController } from './agendamiento.controller';
import { AgendamientoService } from './agendamiento.service';
import { Agendamiento } from './entities/agendamiento.entity';
import { MembresiaModule } from 'src/membresia/membresia.module';
import { MembresiaService } from 'src/membresia/membresia.service';
import { UserService } from 'src/user/user.service';
import { PagoModule } from 'src/pago/pago.module';
import { PagoService } from 'src/pago/pago.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamiento]), UserModule, MembresiaModule, PagoModule],
  controllers: [AgendamientoController],
  providers: [AgendamientoService, MembresiaService, UserService, PagoService],
  exports: [TypeOrmModule],
})
export class AgendamientoModule { }
