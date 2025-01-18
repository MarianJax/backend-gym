import { Module } from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { AgendamientoController } from './agendamiento.controller';
import { Agendamiento } from './entities/agendamiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from 'src/pago/entities/pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamiento])],
  controllers: [AgendamientoController],
  providers: [AgendamientoService],
    
})
export class AgendamientoModule {}
