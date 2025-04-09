import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Raw, Repository } from 'typeorm';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';
import { RolService } from 'src/rol/rol.service';
import { DiaSemana, Jornada } from '../enum/entities.enum';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario)
    private readonly HorarioRepository: Repository<Horario>,

    private rolService: RolService,
  ) {}

  async create(createHorarioDto: CreateHorarioDto): Promise<Horario> {
    try {
      const rol = await this.rolService.findOne(createHorarioDto.rol_id);

      const horario = this.HorarioRepository.create({
        ...createHorarioDto,
        rol,
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
    return await this.HorarioRepository.find({ relations: ['rol'] });
  }

  async findOne(id: string): Promise<Horario> {
    return await this.HorarioRepository.findOne({
      where: { id },
      relations: ['rol'],
    });
  }

  async findHorarioRol(rol: string): Promise<Horario[]> {
    return await this.HorarioRepository.find({
      where: {
        rol: {
          nombre: ILike(rol),
        },
      },
      select: ['id', 'jornada', 'dia_semana', 'hora_inicio', 'hora_fin', 'rol'],
    });
  }

  async findHorarioRolFecha(rol: string, dia: DiaSemana): Promise<Horario[]> {
    return await this.HorarioRepository.find({
      where: {
        rol: {
          nombre: ILike(rol),
        },
        dia_semana: dia,
      },
    });
  }

  async findHorarioMembresia(fecha: Date, jornada?: Jornada) {
    try {
      let diaSemana = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
      }).format(new Date(fecha));

      diaSemana = diaSemana.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const dia_semana = (diaSemana.charAt(0).toUpperCase() +
        diaSemana.slice(1)) as DiaSemana;

      const whereConditions: any = {
        dia_semana,
      };

      console.log(jornada.length);

      // Si jornada está definida, agrégala a las condiciones de búsqueda
      if (jornada && jornada !== undefined) {
        whereConditions.jornada = jornada;
      }

      console.log(whereConditions);

      const horarios = await this.HorarioRepository.find({
        where: whereConditions,
      });

      return horarios;
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    id: string,
    { rol_id, ...updateHorarioDto }: UpdateHorarioDto,
  ): Promise<void> {
    const rol = await this.rolService.findOne(rol_id);
    await this.HorarioRepository.update(id, { ...updateHorarioDto, rol });
  }

  async remove(id: string): Promise<void> {
    await this.HorarioRepository.delete(id);
  }
}
