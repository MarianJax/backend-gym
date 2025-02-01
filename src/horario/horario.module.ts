import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { RolModule } from 'src/rol/rol.module';
import { RolService } from 'src/rol/rol.service';

@Module({
  imports: [TypeOrmModule.forFeature([Horario]), RolModule],

  controllers: [HorarioController],
  providers: [HorarioService, RolService],
  exports: [TypeOrmModule],
})
export class HorarioModule {}
