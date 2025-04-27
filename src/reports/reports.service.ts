import { Injectable } from '@nestjs/common';
import { AgendamientoService } from 'src/agendamiento/agendamiento.service';
import { MantenimientoService } from 'src/mantenimiento/mantenimiento.service';
import { MaquinaService } from 'src/maquina/maquina.service';
import { PagoService } from 'src/pago/pago.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly maquinaService: MaquinaService,
    private readonly mantenimientoService: MantenimientoService,
    private readonly pagoService: PagoService,
    private readonly agendamientoService: AgendamientoService
  ) { }

  async findAll() {
    const [users, maquinas, mantenimientos, pagos] = await Promise.all([
      await this.agendamientoService.countUsers(),
      await this.maquinaService.count(),
      await this.mantenimientoService.totalCosto(),
      await this.pagoService.totalCosto(),
    ]);
    return {
      users: parseFloat(users.toFixed(2)),
      maquinas: parseFloat(maquinas.toFixed(2)),
      mantenimientos: parseFloat(mantenimientos.toFixed(2)),
      pagos: parseFloat(pagos.toFixed(2))
    };
  }

  async findForGraphics(facultad?: string, carrera?: string, tipoPago?: string) {
    const reservasRol = await this.agendamientoService.findAllByRol(facultad, carrera, tipoPago)

    const reservasPorRolesYDias = await this.agendamientoService.findAllByRolAndDia(facultad, carrera, tipoPago)

    const reservasPorDias = await this.agendamientoService.findAllByDia(facultad, carrera, tipoPago)

    const reservasPorEstados = await this.agendamientoService.findAllByEstado(facultad, carrera, tipoPago)

    console.log(reservasPorEstados, 'reservasPorEstados')
    console.log(reservasPorRolesYDias, 'reservasPorRolesYDias');
    console.log(reservasPorDias, 'reservasPorDias');
    console.log(reservasRol, 'reservasRol');

    return {
      reservasRol,
      reservasPorRolesYDias,
      reservasPorDias,
      reservasPorEstados,
    };
  }
}
