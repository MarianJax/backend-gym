import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgendamientoService } from 'src/agendamiento/agendamiento.service';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { DistribucionService } from 'src/distribucion/distribucion.service';
import { MembresiaService } from 'src/membresia/membresia.service';
import { ILike, Repository } from 'typeorm';
import { DiaSemana, Jornada } from '../enum/entities.enum';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';


type fetchHourAndDate = {
  horarios: Horario[],
  agendamientos: Agendamiento[]
}
@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario)
    private readonly HorarioRepository: Repository<Horario>,

    private readonly AgendamientoService: AgendamientoService,

    private distribucionService: DistribucionService,
    private readonly membresiaService: MembresiaService,
  ) { }

  async create(createHorarioDto: CreateHorarioDto): Promise<Horario> {
    try {
      const rol = await this.distribucionService.findOne(createHorarioDto.rol_id);

      const horario = this.HorarioRepository.create({
        ...createHorarioDto,
        distribucion: rol,
      });

      return await this.HorarioRepository.save(horario);
    } catch (error) {
      console.error('El rol no existe', error);
      if (error.code === '22P02' && error.routine === 'string_to_uuid') {
        throw new BadRequestException('El Rol no existe');
      }
    }
  }

  async findAll(): Promise<Horario[]> {
    return await this.HorarioRepository.find({ relations: ['distribucion'] });
  }

  async findOne(id: string): Promise<Horario> {
    return await this.HorarioRepository.findOne({
      where: { id },
      relations: ['distribucion'],
    });
  }

  async findHorarioRol(rol: string): Promise<Horario[]> {
    return await this.HorarioRepository.find({
      where: {
        distribucion: {
          rol_id: ILike(rol),
        },
      },
      select: ['id', 'jornada', 'dia_semana', 'hora_inicio', 'hora_fin', 'distribucion'],
    });
  }

  async findHorarioRolFecha(
    rol: string,
    dia: DiaSemana,
    fecha: string
  ): Promise<fetchHourAndDate> {
    const agendamientos = await this.AgendamientoService.findByDateAndHours(fecha);
    const horarios = await this.HorarioRepository.createQueryBuilder('horario')
      .select(['horario.hora_inicio', 'horario.hora_fin', 'horario.jornada'])
      .innerJoin('horario.distribucion', 'distribucion')
      .addSelect(['distribucion.pago_diario', 'distribucion.pago_semanal', 'distribucion.pago_mensual', 'distribucion.tiempo', 'distribucion.cupo'])
      .where('distribucion.rol_id ILIKE :rol', { rol })
      .andWhere(':dia = ANY(horario.dia_semana)', { dia })
      .getMany();

    return {
      horarios, agendamientos
    }
  }

  private normalizarDiaSemana(fecha: Date): DiaSemana {
    const dia = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(fecha);
    const sinTildes = dia.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return (sinTildes.charAt(0).toUpperCase() + sinTildes.slice(1)) as DiaSemana;
  }

  async findHorarioMembresia(fecha: Date, usuario: string, rol: string, jornada?: Jornada) {
    try {
      const formatoFecha = new Date(fecha);

      const membresia = await this.membresiaService.findByPersonaIdAndDate(
        usuario, formatoFecha);

      if (!membresia) {
        return [];
      }

      const dia = this.normalizarDiaSemana(formatoFecha);
      const query = this.HorarioRepository.createQueryBuilder('horario')
        .where(':dia = ANY(horario.dia_semana)', { dia });
query.innerJoin('horario.distribucion', 'distribucion')
      query.andWhere('distribucion.rol_id ILIKE :rol', { rol });
      if (jornada) {
        query.andWhere('horario.jornada = :jornada', { jornada });
      }

      const horarios = await query.getMany();
      return horarios;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(
    id: string,
    { rol_id, ...updateHorarioDto }: UpdateHorarioDto,
  ): Promise<void> {
    const rol = await this.distribucionService.findOne(rol_id);
    await this.HorarioRepository.update(id, { ...updateHorarioDto, distribucion: rol });
  }

  async remove(id: string): Promise<void> {
    await this.HorarioRepository.delete(id);
  }
}
