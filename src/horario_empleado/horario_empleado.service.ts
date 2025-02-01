import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHorarioEmpleadoDto } from './dto/create-horario_empleado.dto';
import { UpdateHorarioEmpleadoDto } from './dto/update-horario_empleado.dto';
import { HorarioEmpleado } from './entities/horario_empleado.entity';
import { Entrenadores } from 'src/entrenador/entities/entrenador.entity';

@Injectable()
export class HorarioEmpleadoService {
  constructor(
    @InjectRepository(HorarioEmpleado)
    private readonly HorarioEmpleadoRepository: Repository<HorarioEmpleado>,

    @InjectRepository(Entrenadores)
    private readonly EntradorRepository: Repository<Entrenadores>,
  ) { }

  async create(
    createHorarioEmpleadoDto: CreateHorarioEmpleadoDto,
  ): Promise<HorarioEmpleado> {
    try {
      const entrenador = await this.EntradorRepository.findOneByOrFail({ id: createHorarioEmpleadoDto.id_entrenador });
      const horarioEntrenador = this.HorarioEmpleadoRepository.create({
        ...createHorarioEmpleadoDto,
        entrenador,
      });

      return await this.HorarioEmpleadoRepository.save(horarioEntrenador);
    } catch (error) {
      console.error('El horario no existe', error);
      if (error.code === '22P02' && error.routine === 'string_to_uuid') {
        throw new BadRequestException('El horario no existe');
      }
    }
  }

  async findAll(): Promise<HorarioEmpleado[]> {
    return await this.HorarioEmpleadoRepository.find();
  }

  async findOne(id: string): Promise<HorarioEmpleado> {
    return await this.HorarioEmpleadoRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateHorarioEmpleadoDto: UpdateHorarioEmpleadoDto,
  ): Promise<void> {
    await this.HorarioEmpleadoRepository.update(
      id,
      updateHorarioEmpleadoDto,
    );
  }

  async remove(id: string): Promise<void> {
    await this.HorarioEmpleadoRepository.delete(id);
  }
}
