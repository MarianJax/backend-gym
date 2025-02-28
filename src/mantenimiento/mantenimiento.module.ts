import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaquinaModule } from 'src/maquina/maquina.module';
import { Mantenimiento } from './entities/mantenimiento.entity';
import { MantenimientoController } from './mantenimiento.controller';
import { MantenimientoService } from './mantenimiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mantenimiento]), MaquinaModule],
  controllers: [MantenimientoController],
  providers: [MantenimientoService],
  exports: [MantenimientoService],

})
export class MantenimientoModule { }
