import { Injectable } from '@nestjs/common';
import { AgendamientoService } from 'src/agendamiento/agendamiento.service';
import { MantenimientoService } from 'src/mantenimiento/mantenimiento.service';
import { MaquinaService } from 'src/maquina/maquina.service';
import { PagoService } from 'src/pago/pago.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly userService: UserService,
    private readonly maquinaService: MaquinaService,
    private readonly mantenimientoService: MantenimientoService,
    private readonly pagoService: PagoService,
    private readonly agendamientoService: AgendamientoService
  ) { }

  async findAll() {
    const [users, maquinas, mantenimientos, pagos] = await Promise.all([
      await this.userService.count(),
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
    const reservasRolFormatter = this.formatForChart(reservasRol)

    const reservasPorRolesYDias = await this.agendamientoService.findAllByRolAndDia(facultad, carrera, tipoPago)
    const reservasPorRolesYDiasFormatter = this.formatDataByDia(reservasPorRolesYDias)

    const reservasPorDias = await this.agendamientoService.findAllByDia(facultad, carrera, tipoPago)
    const reservasPorDiasFormatter = this.formatAgendamientoData(reservasPorDias)

    const reservasPorEstados = await this.agendamientoService.findAllByEstado(facultad, carrera, tipoPago)
    const reservasPorEstadosFormatter = this.transformAsistioData(reservasPorEstados)

    return {
      reservasRol: reservasRolFormatter,
      reservasPorRolesYDias: reservasPorRolesYDiasFormatter,
      reservasPorDias: reservasPorDiasFormatter,
      reservasPorEstados: reservasPorEstadosFormatter,
    };
  }

  private formatForChart(input: { rol: string; total: number }[]): { roles: string[]; data: number[] } {
    const roles = Array.from(new Set(input.map(item => item.rol))); 
  
    const data = roles.map(role => {
      const match = input.find(item => item.rol === role);
      return match ? Number(match.total) : 0;
    });
  
    return { roles, data };
  }

  private formatDataByDia(input: { rol: string; dia: string; total: number }[]): { dias: string[], datas: { label: string, data: number[] }[] } {
    // Extraer los días únicos
    const dias = Array.from(new Set(input.map(item => item.dia)));
  
    // Obtener los roles únicos
    const roles = Array.from(new Set(input.map(item => item.rol)));
  
    // Crear el array de `datas` para cada rol
    const datas = roles.map(role => {
      const data = dias.map(dia => {
        const match = input.find(item => item.rol === role && item.dia === dia);
        return match ? match.total : 0;
      });
      return { label: role, data };
    });
    return { dias, datas };
  }

  private formatAgendamientoData(input: { dia: string; total: number }[]): { labels: string[], data: { label: string, data: number[] }[] } {
    // Extraer los días únicos
    const labels = Array.from(new Set(input.map(item => item.dia)));
  
    const data = labels.map(dia => {
      const match = input.find(item => item.dia === dia);
      return match ? match.total : 0;
    });
  
    return { labels, data: [{ label: 'agendamiento', data }] };
  }
  
  private transformAsistioData(data: { asistio: string, total: number }[]): { labels: string[], data: number[] } {
    const labels: string[] = [];
    const dataValues: number[] = [];
  
    // Iteramos sobre los datos y agregamos los valores correspondientes a las listas
    data.forEach(item => {
      labels.push(item.asistio);  // Asignamos el valor de 'asistio' a 'labels'
      dataValues.push(item.total); // Asignamos el valor de 'total' a 'data'
    });
  
    return {
      labels,
      data: dataValues
    };
  }
}
