import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PagoModule } from 'src/pago/pago.module';
import { PersonaModule } from 'src/persona/persona.module';
import { MaquinaModule } from 'src/maquina/maquina.module';
import { MantenimientoModule } from 'src/mantenimiento/mantenimiento.module';
import { AgendamientoModule } from 'src/agendamiento/agendamiento.module';

@Module({
  imports: [PagoModule, PersonaModule, MaquinaModule, MantenimientoModule, AgendamientoModule],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
