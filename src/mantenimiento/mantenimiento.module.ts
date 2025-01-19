import { Module } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service';
import { MantenimientoController } from './mantenimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maquina } from 'src/maquina/entities/maquina.entity';
import { Mantenimiento } from './entities/mantenimiento.entity';
import { Pago } from 'src/pago/entities/pago.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Mantenimiento]), Pago],
  controllers: [MantenimientoController],
  providers: [MantenimientoService],
  exports: [TypeOrmModule],

})
export class MantenimientoModule {}
