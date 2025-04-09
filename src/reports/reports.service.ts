import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }
}
