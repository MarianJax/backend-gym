import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';
import { RolService } from 'src/rol/rol.service';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario)
    private readonly HorarioRepository: Repository<Horario>,

    private rolService: RolService,
  ) { }

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
    return await this.HorarioRepository.findOne({ where: { id }, relations: ['rol'] });
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

  async update(id: string, updateHorarioDto: UpdateHorarioDto): Promise<void> {
    await this.HorarioRepository.update(id, updateHorarioDto);
  }

  async remove(id: string): Promise<void> {
    await this.HorarioRepository.delete(id);
  }
}
