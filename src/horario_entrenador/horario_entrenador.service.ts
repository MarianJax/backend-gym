import { Injectable } from '@nestjs/common';
import { CreateHorarioEntrenadorDto } from './dto/create-horario_entrenador.dto';
import { UpdateHorarioEntrenadorDto } from './dto/update-horario_entrenador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HorarioEntrenador } from './entities/horario_entrenador.entity';

@Injectable()
export class HorarioEntrenadorService {
  constructor(
    @InjectRepository(HorarioEntrenador)
    private readonly HorarioEntrenadorRepository: Repository<HorarioEntrenador>,
  ) {}

  async create(
    createHorarioEntrenadorDto: CreateHorarioEntrenadorDto,
  ): Promise<HorarioEntrenador> {
    return await this.HorarioEntrenadorRepository.save(
      createHorarioEntrenadorDto,
    );
  }

  async findAll(): Promise<HorarioEntrenador[]> {
    return await this.HorarioEntrenadorRepository.find();
  }

  async findOne(id: number): Promise<HorarioEntrenador> {
    return await this.HorarioEntrenadorRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateHorarioEntrenadorDto: UpdateHorarioEntrenadorDto,
  ): Promise<void> {
    await this.HorarioEntrenadorRepository.update(
      id,
      updateHorarioEntrenadorDto,
    );
  }

  async remove(id: number): Promise<void> {
    await this.HorarioEntrenadorRepository.delete(id);
  }
}
