import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistribucionService } from 'src/distribucion/distribucion.service';
import { MembresiaService } from 'src/membresia/membresia.service';
import { PagoService } from 'src/pago/pago.service';
import { ValidacionesPagoService } from 'src/validaciones_pago/validaciones_pago.service';
import {
  Between,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { diasEn, EstadoPago, Metodo } from '../enum/entities.enum';
import {
  CreateAgendamientoDto,
  CreateAgendamientoForMembresia,
} from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { Agendamiento } from './entities/agendamiento.entity';

import { Membresia } from 'src/membresia/entities/membresia.entity';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,

    private membresiaService: MembresiaService,
    private pagoService: PagoService,
    private distribucionService: DistribucionService,
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
    const fetchRol = await this.distribucionService.findOneByRolName(rol);

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
      const agendamientoActual = await this.agendamientoRepository.findOne({
        where: {
          fecha: createAgendamientoDto.fecha,
        },
      });

      if (agendamientoActual) {
        throw new BadRequestException(
          'Ya existe un agendamiento para la fecha seleccionada',
        );
      }

      let membresia: Membresia | null = null;

      const fetchRol = await this.distribucionService.findOneByRolName(
        createAgendamientoDto.distribucion,
      );

      const maximoAlcanzado = await this.verificarMaximoReservas({
        hora_inicio: createAgendamientoDto.hora_inicio as string,
        hora_fin: createAgendamientoDto.hora_fin as string,
        fecha: createAgendamientoDto.fecha,
        cupo: fetchRol.cupo,
      });

      if (maximoAlcanzado) {
        throw new BadRequestException(
          `Número máximo de reservas alcanzado para el rol seleccionado`,
        );
      }

      await this.verificarHorasPorRol({
        hora_inicio: createAgendamientoDto.hora_inicio as string,
        hora_fin: createAgendamientoDto.hora_fin as string,
        rol: createAgendamientoDto.distribucion,
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
      if (createAgendamientoDto.metodo_pago === Metodo.MENSUAL) {
        const membprev = await this.membresiaService.create({
          costo: createAgendamientoDto.monto,
          fecha_inicio: createAgendamientoDto.fecha,
          pago_id: pagos.id,
          usuario_id: createAgendamientoDto.usuario_id,
        });
        const membSave = await this.membresiaService.findOne(membprev.id);
        membresia = membSave;
      }

      //#region CONSULTAR API DE USUARIOS PARA OBTENER ID DE CARRERA O FACULTAD
      const { carr_id, facu_id, dep_id } = await this.findFacuOrCarr(
        createAgendamientoDto.usuario_id,
      );

      const agprev = this.agendamientoRepository.create({
        membresias: membresia,
        pagos: !membresia ? pagos : null,
        fecha: createAgendamientoDto.fecha,
        hora_inicio: createAgendamientoDto.hora_inicio as Date,
        hora_fin: createAgendamientoDto.hora_fin as Date,
        asistio: false,
        usuario_id: createAgendamientoDto.usuario_id,
        facu_id: facu_id,
        carr_id: carr_id,
        dep_id: dep_id,
      });

      await this.validacionesPagoService.save(evicendia_pago);

      await this.agendamientoRepository.save(agprev);

      return {
        status: 'success',
        message: 'Agendamiento creado correctamente',
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Error al crear el agendamiento',
        status: 'error',
      };
    }
  }

  //#region  LOGICA PARA OBTENER ID DE CARRERA O FACULTAD
  async findFacuOrCarr(id_usuario: string) {
    let facu_id = null;
    let carr_id = null;
    let dep_id = null;
    // Fetch the user data from the API PARA METODO GET
    const response = await fetch(`http://localhost:3000/usuario/${id_usuario}`);

    /* FETCH PARA METODO POST
  const response = await fetch(
    `http://localhost:3000/usuario/${id_usuario}`
  ,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cedula: id_usuario }),
  });*/

    if (!response.ok) {
      throw new BadRequestException('Error al obtener los datos del usuario');
    }
    const data = await response.json();
    // Check if the user has a faculty or career
    if (data.facultad_id) {
      facu_id = data.facultad_id;
    } else if (data.carrera_id) {
      carr_id = data.carrera_id;
    } else if (data.departamento_id) {
      dep_id = data.departamento_id;
    } else {
      throw new BadRequestException('El usuario no tiene facultad o carrera');
    }

    return { facu_id, carr_id, dep_id };
  }

  async findAllWithPendingValidation(
    take: number,
    all: boolean,
  ): Promise<any[]> {
    const pagos = all
      ? {
          validacion_pago: {
            fecha_validacion: null,
            estado: EstadoPago.PENDIENTE,
          },
        }
      : {};

    const agendamientos = await this.agendamientoRepository.find({
      where: [
        {
          distribución: {
            rol_id: In(['Estudiante', 'Funcionario', 'Docente']),
          },
          pagos,
        },
        {
          distribución: {
            rol_id: In(['Estudiante', 'Funcionario', 'Docente']),
          },
          membresias: {
            pagos,
          },
        },
      ],
      select: {
        id: true,
        fecha: true,
        usuario_id: true,
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
        'pagos',
        'membresias',
        'membresias.pagos',
        'pagos.validacion_pago',
        'membresias.pagos.validacion_pago',
      ],
      take,
    });

    //#region CONSULTAR API DE USUARIOS
    const formatterPagos = [];

    agendamientos.map(async (agendamiento) => {
      // EndPoint de la API para obtener el usuario por ID
      const user = await fetch(
        'http://localhost:3000/api/user/' + agendamiento.usuario_id,
      ); // GET
      // const userPOST = await fetch('http://localhost:3000/api/user/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ cedula: pago.validacion_pago[0].usuario_id }),
      // });

      const userData = await user.json(); // { id_personal: 1546546, nombres: "NOMBRE DEL USUARIO", roles: "ESTUDIANTE", FACULTAD: "CIENCIAS .." }

      return {
        ...agendamiento,
        user: {
          nombres: userData.nombres,
          roles: userData.roles,
        },
      };
    });

    return formatterPagos;
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
    const memb = await this.membresiaService.findOne(membresia);
    if (!memb) {
      throw new BadRequestException('Membresía no encontrada');
    }

    const agendamiento = this.agendamientoRepository.create({
      fecha,
      hora_fin,
      hora_inicio,
      usuario_id,
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
        usuario_id: id,
        fecha: Between(startDate, endDate),
      },
    });
  }

  async findAll(): Promise<any[]> {
    const agendamientos = await this.agendamientoRepository.find({
      select: {
        id: true,
        fecha: true,
        asistio: true,
        hora_fin: true,
        hora_inicio: true,
        usuario_id: true,
      },
      relations: ['distribucion'],
    });

    //#region CONSULTAR API DE USUARIOS
    const formatterPagos = [];

    agendamientos.map(async (agendamiento) => {
      // EndPoint de la API para obtener el usuario por ID
      const user = await fetch(
        'http://localhost:3000/api/user/' + agendamiento.usuario_id,
      ); // GET
      // const userPOST = await fetch('http://localhost:3000/api/user/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ cedula: pago.validacion_pago[0].usuario_id }),
      // });

      const userData = await user.json(); // { id_personal: 1546546, nombres: "NOMBRE DEL USUARIO", roles: "ESTUDIANTE", FACULTAD: "CIENCIAS .." }

      return {
        ...agendamiento,
        user: {
          nombres: userData.nombres,
          roles: userData.roles,
        },
      };
    });

    return formatterPagos;
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

  async countUsers(): Promise<number> {
    const total = await this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .select('COUNT(DISTINCT agendamiento.usuario_id)', 'total')
      .getRawOne();

    return total.total;
  }

  async countAgendamientos(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const total = await this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .select('COUNT(*)', 'total')
      .where(
        'agendamiento.fecha >= :today AND agendamiento.fecha < :tomorrow',
        {
          today,
          tomorrow,
        },
      )
      .getRawOne();

    return total.total;
  }

  async findAllByRol(
    facultad?: string,
    carrera?: string,
    tipoPago?: string,
  ): Promise<{ rol: string; total: number }[]> {
    const queryBuilder = this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .innerJoin('agendamiento.persona', 'persona')
      .innerJoin('persona.roles', 'role')
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
          .addSelect('persona.carrera', 'car')
          .addSelect('persona.facultad', 'fac')
          .leftJoin('persona.carrera', 'carr')
          .leftJoin('persona.facultad', 'facultad')
          .addGroupBy('persona.carrera')
          .addGroupBy('persona.facultad');

        queryBuilder.andWhere(
          '((persona.facultad_id IS NOT NULL AND persona.facultad_id = :facultad) OR (persona.carrera_id IS NOT NULL AND carr.facultad_id = :facultad))',
          { facultad },
        );
      } else {
        queryBuilder
          .innerJoin('persona.carrera', 'carrera')
          .andWhere(
            '(persona.carrera_id IS NOT NULL AND carrera.id = :carrera)',
            {
              facultad,
              carrera,
            },
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
      .innerJoin('agendamiento.persona', 'persona')
      .innerJoin('persona.roles', 'role')
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
        .leftJoin('persona.facultad', 'fac')
        .leftJoin('persona.carrera', 'carr')
        .andWhere(
          '((persona.facultad_id IS NOT NULL AND persona.facultad_id = :facultad) OR (persona.carrera_id IS NOT NULL AND carr.facultad_id = :facultad))',
          {
            facultad,
          },
        );
    } else if (carrera) {
      queryBuilder.andWhere('persona.carrera_id = :carrera', { carrera });
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
      .innerJoin('agendamiento.persona', 'persona')
      .select("TRIM(TO_CHAR(agendamiento.fecha, 'Day'))", 'dia')
      .addSelect('COUNT(*)', 'total')
      .addSelect('EXTRACT(DOW FROM agendamiento.fecha)', 'orden');

    // Condiciones opcionales
    if (facultad) {
      if (!carrera) {
        queryBuilder
          .leftJoin('persona.carrera', 'carr')
          .leftJoin('persona.facultad', 'fac')
          .leftJoin('carr.facultad', 'c_fac')
          .andWhere(
            '((persona.facultad_id IS NOT NULL AND fac.id = :facultad) OR (persona.carrera_id IS NOT NULL AND c_fac.id = :facultad))',
            { facultad },
          );
      } else {
        queryBuilder.andWhere(
          '(persona.carrera_id IS NOT NULL AND persona.carrera_id = :carrera)',
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
      .innerJoin('agendamiento.persona', 'persona');

    // Condiciones opcionales
    if (facultad) {
      queryBuilder
        .leftJoin('persona.carrera', 'carr')
        .leftJoin('persona.facultad', 'fac')
        .leftJoin('carr.facultad', 'c_fac');
      if (!carrera) {
        queryBuilder.andWhere(
          '((persona.facultad_id IS NOT NULL AND fac.id = :facultad) OR (persona.carrera_id IS NOT NULL AND c_fac.id = :facultad))',
          { facultad },
        );
      } else {
        queryBuilder.andWhere(
          '(persona.carrera_id IS NOT NULL AND persona.carrera_id = :carrera)',
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
