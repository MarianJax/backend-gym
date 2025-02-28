import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { Agendamiento } from './entities/agendamiento.entity';
import { MembresiaService } from 'src/membresia/membresia.service';
import { PagoService } from 'src/pago/pago.service';
import { RolService } from 'src/rol/rol.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,

    private membresiaService: MembresiaService,
    private pagoService: PagoService,
    private rolService: RolService,
    private userService: UserService,

  ) {}

  async verificarMaximoReservas({
    hora_inicio,
    hora_fin,
    fecha,
    cupo,
  }: {
    hora_inicio: Date;
    hora_fin: Date;
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
    hora_inicio: Date;
    hora_fin: Date;
    rol: string;
  }): Promise<void> {
    const fetchRol = await this.rolService.findOneByName(rol);

    const horarios = fetchRol.horarios;

    const isWithinRoleHours = horarios.some(
      (horario) =>
        hora_inicio >= horario.hora_inicio && hora_fin <= horario.hora_fin,
    );

    if (!isWithinRoleHours)
      throw new BadRequestException(
        'Las horas seleccionadas no están dentro del horario permitido por su rol',
      );

    if (hora_fin.getHours() - hora_inicio.getHours() > fetchRol.tiempo)
      throw new BadRequestException(
        'El tiempo de reserva excede el tiempo permitido por su rol',
      );
  }

  async create(
    createAgendamientoDto: CreateAgendamientoDto,
  ): Promise<Agendamiento> {
    const user = await this.userService.findOne(createAgendamientoDto.usuario_id);

    const fetchRol = await this.rolService.findOneByName(createAgendamientoDto.rol);

    const maximoAlcanzado = await this.verificarMaximoReservas({
      hora_inicio: createAgendamientoDto.hora_inicio,
      hora_fin: createAgendamientoDto.hora_fin,
      fecha: createAgendamientoDto.fecha,
      cupo: fetchRol.cupo,
    });

    if (maximoAlcanzado) {
      throw new BadRequestException(
        `Número máximo de reservas alcanzado para los ${fetchRol.nombre}`,
      );
    }

    await this.verificarHorasPorRol({
      hora_inicio: createAgendamientoDto.hora_inicio,
      hora_fin: createAgendamientoDto.hora_fin,
      rol: createAgendamientoDto.rol,
    });

    const membresias = await this.membresiaService.findActiveMembresiaByIdAndDate(
      createAgendamientoDto.membresia_id,
      createAgendamientoDto.fecha,
    );

    const pagos = await this.pagoService.findOne(createAgendamientoDto.pago_id);

    const agendamiento = this.agendamientoRepository.create({
      ...createAgendamientoDto,
      user,
      membresias,
      pagos,
    });

    return await this.agendamientoRepository.save(agendamiento);
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
