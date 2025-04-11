import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import {
  CreateAgendamientoDto,
  CreateAgendamientoForMembresia,
} from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { Agendamiento } from './entities/agendamiento.entity';
import { MembresiaService } from 'src/membresia/membresia.service';
import { PagoService } from 'src/pago/pago.service';
import { RolService } from 'src/rol/rol.service';
import { UserService } from 'src/user/user.service';
import { diasEn, EstadoPago, Metodo } from '../enum/entities.enum';
import { ValidacionesPagoService } from 'src/validaciones_pago/validaciones_pago.service';

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
      await this.pagoService.save(pagos);

      const buffer = Buffer.from(createAgendamientoDto.evidencia_pago);

      const evicendia_pago = await this.validacionesPagoService.create({
        tipo: createAgendamientoDto.tipo,
        usuario_id: createAgendamientoDto.usuario_id,
        pago_id: pagos.id,
        evidencia: buffer,
      });

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

      await this.validacionesPagoService.save(evicendia_pago);

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

  async findAllWithPendingValidation(
    take: number,
    all: boolean,
  ): Promise<Agendamiento[]> {
    const pagos = all
      ? {
          validacion_pago: {
            fecha_validacion: null,
            estado: EstadoPago.PENDIENTE,
          },
        }
      : {};

    return await this.agendamientoRepository.find({
      where: [
        {
          user: {
            roles: {
              nombre: In(['Estudiante', 'Funcionario', 'Docente']),
            },
          },
          pagos,
        },
        {
          user: {
            roles: {
              nombre: In(['Estudiante', 'Funcionario', 'Docente']),
            },
          },
          membresias: {
            pagos,
          },
        },
      ],
      select: {
        id: true,
        fecha: true,
        user: {
          nombre: true,
          apellido: true,
          cedula: true,
          roles: {
            nombre: true,
          },
        },
        membresias: {
          id: true,
          pagos: {
            id: true,
            metodo_pago: true,
            validacion_pago: {
              id: true,
              fecha_validacion: true,
              estado: true,
            },
          },
        },
        pagos: {
          id: true,
          metodo_pago: true,
          validacion_pago: {
            id: true,
            fecha_validacion: true,
            estado: true,
          },
        },
      },
      relations: [
        'user',
        'user.roles',
        'pagos',
        'membresias',
        'membresias.pagos',
        'pagos.validacion_pago',
        'membresias.pagos.validacion_pago',
      ],
      take,
    });
  }

  async findAllDate(fecha: string): Promise<Agendamiento[]> {
    const fecha_agendamiento = new Date(fecha);
    const startDate = new Date(fecha_agendamiento);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(fecha_agendamiento);
    endDate.setHours(23, 59, 59, 999);

    return await this.agendamientoRepository.find({
      where: {
        fecha: Between(startDate, endDate),
      },
    });
  }

  async createAgendamientoForMembresia({
    fecha,
    hora_fin,
    hora_inicio,
    membresia,
    usuario_id,
  }: CreateAgendamientoForMembresia): Promise<Agendamiento> {
    const user = await this.userService.findOne(usuario_id);

    const memb = await this.membresiaService.findOne(membresia);
    if (!memb) {
      throw new BadRequestException('Membresía no encontrada');
    }

    const agendamiento = this.agendamientoRepository.create({
      fecha,
      hora_fin,
      hora_inicio,
      user,
      membresias: memb,
    });
    return await this.agendamientoRepository.save(agendamiento);
  }

  async findByUsuarioId(id: string, dat: string): Promise<Agendamiento[]> {
    const fecha_agendamiento = new Date(dat);

    const startDate = new Date(fecha_agendamiento);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(fecha_agendamiento);
    endDate.setHours(23, 59, 59, 999);

    return await this.agendamientoRepository.find({
      where: {
        user: {
          id,
        },
        fecha: Between(startDate, endDate),
      },
    });
  }

  async findAll(): Promise<Agendamiento[]> {
    return await this.agendamientoRepository.find({
      where: {
        user: {
          roles: {
            nombre: In(['Estudiante', 'Funcionario', 'Docente']),
          },
        },
      },
      select: {
        id: true,
        fecha: true,
        asistio: true,
        hora_fin: true,
        hora_inicio: true,
        user: {
          nombre: true,
          apellido: true,
          cedula: true,
          roles: {
            nombre: true,
          },
        },
      },
      relations: ['user', 'user.roles'],
    });
  }

  async findOne(id: string): Promise<Agendamiento> {
    return await this.agendamientoRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateAgendamientoDto: UpdateAgendamientoDto,
  ): Promise<void> {
    await this.agendamientoRepository.update(id, updateAgendamientoDto);
  }

  async remove(id: string): Promise<void> {
    await this.agendamientoRepository.delete(id);
  }

  async findAllByRol(
    facultad?: string,
    carrera?: string,
    tipoPago?: string,
  ): Promise<{ rol: string; total: number }[]> {
    const queryBuilder = this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .innerJoin('agendamiento.user', 'user')
      .innerJoin('user.roles', 'role')
      .select('role.nombre', 'rol')
      .addSelect('COUNT(*)', 'total')
      .where('role.nombre IN (:...roles)', {
        roles: ['Estudiante', 'Funcionario', 'Docente'],
      })
      .groupBy('role.nombre');

    // Condiciones opcionales
    if (facultad) {
      if (!carrera) {
        queryBuilder
          .addSelect('user.carrera', 'car')
          .addSelect('user.facultad', 'fac')
          .leftJoin('user.carrera', 'carr')
          .leftJoin('user.facultad', 'facultad')
          .addGroupBy('user.carrera')
          .addGroupBy('user.facultad');

        queryBuilder.andWhere(
          '((user.facultad_id IS NOT NULL AND user.facultad_id = :facultad) OR (user.carrera_id IS NOT NULL AND carr.facultad_id = :facultad))',
          { facultad },
        );
      } else {
        queryBuilder
          .innerJoin('user.carrera', 'carrera')
          .andWhere('(user.carrera_id IS NOT NULL AND carrera.id = :carrera)', {
            facultad,
            carrera,
          });
      }
    }
    if (tipoPago) {
      queryBuilder.leftJoin('agendamiento.pagos', 'pagos');
      queryBuilder.leftJoin('agendamiento.membresias', 'membresia');
      queryBuilder.leftJoin('membresia.pagos', 'm_pagos');
      queryBuilder.andWhere(
        '((agendamiento.pago_id IS NOT NULL AND pagos.metodo_pago = :tipoPago) OR (agendamiento.membresia_id IS NOT NULL AND  m_pagos.metodo_pago = :tipoPago))',
        { tipoPago },
      );
    }

    return await queryBuilder
      .getRawMany()
      .then((data) =>
        data.map(({ rol, total }) => ({ rol, total: Number(total) })),
      );
  }

  async findAllByRolAndDia(
    facultad?: string,
    carrera?: string,
    tipoPago?: string,
  ): Promise<{ rol: string; dia: string; total: number }[]> {
    const queryBuilder = this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .innerJoin('agendamiento.user', 'user')
      .innerJoin('user.roles', 'role')
      .select('role.nombre', 'rol')
      .addSelect("TO_CHAR(agendamiento.fecha, 'Day')", 'dia')
      .addSelect('COUNT(*)', 'total')
      .where('role.nombre IN (:...roles)', {
        roles: ['Estudiante', 'Funcionario', 'Docente'],
      })
      .groupBy('role.nombre')
      .addGroupBy("TO_CHAR(agendamiento.fecha, 'Day')")
      .orderBy('MIN(agendamiento.fecha)', 'ASC');

    // Condiciones opcionales
    if (facultad && !carrera) {
      queryBuilder
        .leftJoin('user.facultad', 'fac')
        .leftJoin('user.carrera', 'carr')
        .andWhere(
          '((user.facultad_id IS NOT NULL AND user.facultad_id = :facultad) OR (user.carrera_id IS NOT NULL AND carr.facultad_id = :facultad))',
          {
            facultad,
          },
        );
    } else if (carrera) {
      queryBuilder.andWhere('user.carrera_id = :carrera', { carrera });
    }
    if (tipoPago) {
      queryBuilder.leftJoin('agendamiento.pagos', 'pagos');
      queryBuilder.leftJoin('agendamiento.membresias', 'membresia');
      queryBuilder.leftJoin('membresia.pagos', 'm_pagos');
      queryBuilder.andWhere(
        '((agendamiento.pago_id IS NOT NULL AND pagos.metodo_pago = :tipoPago) OR (agendamiento.membresia_id IS NOT NULL AND  m_pagos.metodo_pago = :tipoPago))',
        { tipoPago },
      );
    }

    return await queryBuilder.getRawMany().then((data) =>
      data.map(({ rol, dia, total }) => ({
        rol,
        dia: diasEn[dia.trim()] ?? dia.trim(),
        total: Number(total),
      })),
    );
  }

  async findAllByDia(
    facultad?: string,
    carrera?: string,
    tipoPago?: string,
  ): Promise<{ dia: string; total: number }[]> {
    const queryBuilder = this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .innerJoin('agendamiento.user', 'user')
      .select("TRIM(TO_CHAR(agendamiento.fecha, 'Day'))", 'dia')
      .addSelect('COUNT(*)', 'total')
      .addSelect('EXTRACT(DOW FROM agendamiento.fecha)', 'orden');

    // Condiciones opcionales
    if (facultad) {
      if (!carrera) {
        queryBuilder
          .leftJoin('user.carrera', 'carr')
          .leftJoin('user.facultad', 'fac')
          .leftJoin('carr.facultad', 'c_fac')
          .andWhere(
            '((user.facultad_id IS NOT NULL AND fac.id = :facultad) OR (user.carrera_id IS NOT NULL AND c_fac.id = :facultad))',
            { facultad },
          );
      } else {
        queryBuilder.andWhere(
          '(user.carrera_id IS NOT NULL AND user.carrera_id = :carrera)',
          { facultad, carrera },
        );
      }
    }
    if (tipoPago) {
      queryBuilder.leftJoin('agendamiento.pagos', 'pagos');
      queryBuilder.leftJoin('agendamiento.membresias', 'membresia');
      queryBuilder.leftJoin('membresia.pagos', 'm_pagos');
      queryBuilder.andWhere(
        '((agendamiento.pago_id IS NOT NULL AND pagos.metodo_pago = :tipoPago) OR (agendamiento.membresia_id IS NOT NULL AND  m_pagos.metodo_pago = :tipoPago))',
        { tipoPago },
      );
    }

    return await queryBuilder
      .groupBy("TRIM(TO_CHAR(agendamiento.fecha, 'Day'))")
      .addGroupBy('EXTRACT(DOW FROM agendamiento.fecha)')
      .orderBy('orden', 'ASC')
      .getRawMany()
      .then((data) =>
        data.map(({ dia, total }) => ({
          dia: diasEn[dia.trim()],
          total: Number(total),
        })),
      );
  }

  async findAllByEstado(
    facultad?: string,
    carrera?: string,
    tipoPago?: string,
  ): Promise<{ asistio: string; total: number }[]> {
    const queryBuilder = this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .select([
        'CASE ' +
          "WHEN agendamiento.asistio IS NULL THEN 'Pendientes'" +
          " WHEN agendamiento.asistio = true THEN 'Asistidos'" +
          " ELSE 'Inasistidos' END AS asistio",
        'COUNT(*) AS total',
      ])
      .innerJoin('agendamiento.user', 'user');

    // Condiciones opcionales
    if (facultad) {
      queryBuilder
        .leftJoin('user.carrera', 'carr')
        .leftJoin('user.facultad', 'fac')
        .leftJoin('carr.facultad', 'c_fac');
      if (!carrera) {
        queryBuilder.andWhere(
          '((user.facultad_id IS NOT NULL AND fac.id = :facultad) OR (user.carrera_id IS NOT NULL AND c_fac.id = :facultad))',
          { facultad },
        );
      } else {
        queryBuilder.andWhere(
          '(user.carrera_id IS NOT NULL AND user.carrera_id = :carrera)',
          { facultad, carrera },
        );
      }
    }
    if (tipoPago) {
      queryBuilder.leftJoin('agendamiento.pagos', 'pagos');
      queryBuilder.leftJoin('agendamiento.membresias', 'membresia');
      queryBuilder.leftJoin('membresia.pagos', 'm_pagos');
      queryBuilder.andWhere(
        '((agendamiento.pago_id IS NOT NULL AND pagos.metodo_pago = :tipoPago) OR (agendamiento.membresia_id IS NOT NULL AND  m_pagos.metodo_pago = :tipoPago))',
        { tipoPago },
      );
    }

    queryBuilder.groupBy('agendamiento.asistio');

    return await queryBuilder
      .getRawMany()
      .then((data) =>
        data.map(({ asistio, total }) => ({ asistio, total: Number(total) })),
      );
  }
}
