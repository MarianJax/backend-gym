import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { Agendamiento } from './entities/agendamiento.entity';
import { MembresiaService } from 'src/membresia/membresia.service';
import { PagoService } from 'src/pago/pago.service';
import { RolService } from 'src/rol/rol.service';
import { UserService } from 'src/user/user.service';
import { Metodo } from '../enum/entities.enum';
import { ValidacionesPagoService } from 'src/validaciones_pago/validaciones_pago.service';

import dayjs from 'dayjs';
import { Membresia } from 'src/membresia/entities/membresia.entity';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,

    private membresiaService: MembresiaService,
    private pagoService: PagoService,
    private rolService: RolService,
    private userService: UserService,
    private readonly validacionesPagoService: ValidacionesPagoService,
  ) {}

  async verificarMaximoReservas({
    hora_inicio,
    hora_fin,
    fecha,
    cupo,
  }: {
    hora_inicio: string;
    hora_fin: string;
    fecha: Date;
    cupo: number;
  }): Promise<boolean> {
    const count = await this.agendamientoRepository.count({
      where: {
        hora_inicio: MoreThanOrEqual(hora_inicio),
        hora_fin: LessThanOrEqual(hora_fin),
        fecha: fecha,
      },
    });
    return count >= cupo;
  }

  async verificarHorasPorRol({
    hora_inicio,
    hora_fin,
    rol,
  }: {
    hora_inicio: string;
    hora_fin: string;
    rol: string;
  }): Promise<void> {
    const fetchRol = await this.rolService.findOneByName(rol);

    const horarios = fetchRol.horarios;

    const isWithinRoleHours = horarios.some((horario) => {
      const start = horario.hora_inicio.toString();
      const end = horario.hora_fin.toString();
      return hora_inicio >= start.slice(0, 5) && hora_fin <= end.slice(0, 5);
    });

    if (!isWithinRoleHours)
      throw new BadRequestException(
        'Las horas seleccionadas no están dentro del horario permitido por su rol',
      );
  }

  async create(createAgendamientoDto: CreateAgendamientoDto): Promise<any> {
    try {
      let membresia: Membresia | null = null;
      const users = await this.userService.findOne(
        createAgendamientoDto.usuario_id,
      );

      const fetchRol = await this.rolService.findOneByName(
        createAgendamientoDto.rol,
      );

      const maximoAlcanzado = await this.verificarMaximoReservas({
        hora_inicio: createAgendamientoDto.hora_inicio as string,
        hora_fin: createAgendamientoDto.hora_fin as string,
        fecha: createAgendamientoDto.fecha,
        cupo: fetchRol.cupo,
      });

      if (maximoAlcanzado) {
        throw new BadRequestException(
          `Número máximo de reservas alcanzado para los ${fetchRol.nombre}`,
        );
      }

      await this.verificarHorasPorRol({
        hora_inicio: createAgendamientoDto.hora_inicio as string,
        hora_fin: createAgendamientoDto.hora_fin as string,
        rol: createAgendamientoDto.rol,
      });

      const pagos = await this.pagoService.create({
        fecha_pago: createAgendamientoDto.fecha,
        monto: createAgendamientoDto.monto,
        metodo_pago: createAgendamientoDto.metodo_pago as Metodo,
      });
      console.log('Pago creado:');
      await this.pagoService.save(pagos);
      console.log('Pago guardado:');

      const evicendia_pago = await this.validacionesPagoService.create({
        usuario_id: createAgendamientoDto.usuario_id,
        pago_id: pagos.id,
        evidencia: createAgendamientoDto.evidencia_pago,
      });
      console.log('Evidencia de pago creada:');

      if (!evicendia_pago) {
        throw new BadRequestException('Error al guardar la evidencia de pago');
      }
      if (!pagos) {
        throw new BadRequestException('Error al guardar el pago');
      }
      if (!users) {
        throw new BadRequestException('Error al guardar el usuario');
      }
      if (createAgendamientoDto.metodo_pago === Metodo.MENSUAL) {
        const membprev = await this.membresiaService.create({
          costo: createAgendamientoDto.monto,
          fecha_inicio: createAgendamientoDto.fecha,
          pago_id: pagos.id,
          usuario_id: users.id,
        });
        const membSave = await this.membresiaService.findOne(membprev.id);
        membresia = membSave;
      }

      const agprev = this.agendamientoRepository.create({
        membresias: membresia,
        pagos: !membresia ? pagos : null,
        fecha: createAgendamientoDto.fecha,
        hora_inicio: createAgendamientoDto.hora_inicio as Date,
        hora_fin: createAgendamientoDto.hora_fin as Date,
        asistio: false,
        user: users,
      });
      console.log('Agendamiento creado:');

      await this.validacionesPagoService.save(evicendia_pago);
      console.log('Agendamiento guardado:');

      await this.agendamientoRepository.save(agprev);

      return {
        status: 'success',
        message: 'Agendamiento creado correctamente',
      };
    } catch (error) {
      return {
        message: 'Error al crear el agendamiento',
        status: 'error',
      };
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Agendamiento[]> {
    return await this.agendamientoRepository.find();
  }

  async findOne(id: string): Promise<Agendamiento> {
    return await this.agendamientoRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAgendamientoDto: UpdateAgendamientoDto,
  ): Promise<void> {
    await this.agendamientoRepository.update(id, updateAgendamientoDto);
  }

  async remove(id: string): Promise<void> {
    await this.agendamientoRepository.delete(id);
  }
}
