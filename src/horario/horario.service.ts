import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { Repository } from 'typeorm';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario)
    private readonly HorarioRepository: Repository<Horario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) { }

  async create(createHorarioDto: CreateHorarioDto): Promise<Horario> {
    try {
      const rol = await this.rolRepository.findOneByOrFail({ id: createHorarioDto.rol_id });

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
    return await this.HorarioRepository.find();
  }

  async findOne(id: string): Promise<Horario> {
    return await this.HorarioRepository.findOneBy({ id });
  }

  async update(id: string, updateHorarioDto: UpdateHorarioDto): Promise<void> {
    await this.HorarioRepository.update(id, updateHorarioDto);
  }

  async remove(id: string): Promise<void> {
    await this.HorarioRepository.delete(id);
  }
}
