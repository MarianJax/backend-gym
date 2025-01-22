import { Module } from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { AgendamientoController } from './agendamiento.controller';
import { Agendamiento } from './entities/agendamiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membresia } from 'src/membresia/entities/membresia.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamiento]), UserModule],
  controllers: [AgendamientoController],
  providers: [AgendamientoService],
  exports: [TypeOrmModule],
})
export class AgendamientoModule {}
