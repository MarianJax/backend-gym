import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHorarioEmpleadoDto } from './dto/create-horario_empleado.dto';
import { UpdateHorarioEmpleadoDto } from './dto/update-horario_empleado.dto';
import { HorarioEmpleado } from './entities/horario_empleado.entity';

@Injectable()
export class HorarioEmpleadoService {
  constructor(
    @InjectRepository(HorarioEmpleado)
    private readonly HorarioEmpleadoRepository: Repository<HorarioEmpleado>,
  ) {}

  async create(
    createHorarioEmpleadoDto: CreateHorarioEmpleadoDto,
  ): Promise<HorarioEmpleado> {
    return await this.HorarioEmpleadoRepository.save(
      createHorarioEmpleadoDto,
    );
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
