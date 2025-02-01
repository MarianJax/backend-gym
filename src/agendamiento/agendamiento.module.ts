import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AgendamientoController } from './agendamiento.controller';
import { AgendamientoService } from './agendamiento.service';
import { Agendamiento } from './entities/agendamiento.entity';
import { MembresiaModule } from 'src/membresia/membresia.module';
import { MembresiaService } from 'src/membresia/membresia.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamiento]), UserModule, MembresiaModule],
  controllers: [AgendamientoController],
  providers: [AgendamientoService, MembresiaService, UserService],
  exports: [TypeOrmModule],
})
export class AgendamientoModule { }
