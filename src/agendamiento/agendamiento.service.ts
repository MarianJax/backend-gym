import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membresia } from 'src/membresia/entities/membresia.entity';
import { User } from 'src/user/entities/user.entity';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { Agendamiento } from './entities/agendamiento.entity';
import { Pago } from 'src/pago/entities/pago.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,

    @InjectRepository(Membresia)
    private readonly MembresiaRepository: Repository<Membresia>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,

    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
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
    const fetchRol = await this.findHorariosByRol(rol);
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
    const user = await this.findUserRolId(createAgendamientoDto.usuario_id);

    const fetchRol = await this.findHorariosByRol(createAgendamientoDto.rol);

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

    const membresias = await this.findMembresiaId(
      createAgendamientoDto.membresia_id,
      createAgendamientoDto.fecha,
    );

    const pagos = await this.findPagoId(createAgendamientoDto.pago_id);

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

  // Metodo para buscar un usuario, horarios y rol por su id
  async findUserRolId(id: string): Promise<User> {
    try {
      const rl = await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['roles'],
      });
      return rl;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Usuario no encontrado');
    }
  }

  // metodoo para obtener la membresia del usuario
  async findMembresiaId(id: string, fecha: Date): Promise<Membresia> {
    try {
      return await this.MembresiaRepository.findOneOrFail({
        where: {
          id,
          fecha_fin: MoreThanOrEqual(fecha),
          fecha_inicio: LessThanOrEqual(fecha),
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'No posee una membresia activa para agendar',
      );
    }
  }

  // metodoo para obtener el pago del usuario
  async findPagoId(id: string): Promise<Pago> {
    try {
      return await this.pagoRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('El pago no se ha encontrado');
    }
  }

  async findHorariosByRol(rol: string): Promise<Rol> {
    return this.rolRepository.findOne({
      where: { nombre: ILike(rol) },
      relations: ['horarios'],
    });
  }
}
