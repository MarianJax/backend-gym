import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHorarioEmpleadoDto } from './dto/create-horario_empleado.dto';
import { UpdateHorarioEmpleadoDto } from './dto/update-horario_empleado.dto';
import { HorarioEmpleado } from './entities/horario_empleado.entity';
import { RolService } from 'src/rol/rol.service';

@Injectable()
export class HorarioEmpleadoService {
  constructor(
    @InjectRepository(HorarioEmpleado)
    private readonly HorarioEmpleadoRepository: Repository<HorarioEmpleado>,

    private readonly rolService: RolService,

  ) { }

  async create(
    createHorarioEmpleadoDto: CreateHorarioEmpleadoDto,
  ): Promise<HorarioEmpleado> {
    try {
      const rol = await this.rolService.findOneByName('Entrenador');
      const horarioEntrenador = this.HorarioEmpleadoRepository.create({
        ...createHorarioEmpleadoDto,
        rol,
      });

      return await this.HorarioEmpleadoRepository.save(horarioEntrenador);
    } catch (error) {
      console.error('El horario no existe', error);
      if (error.code === '22P02' && error.routine === 'string_to_uuid') {
        throw new BadRequestException('El entrenador no existe');
      }
      if (error.code === '23505') {
        throw new BadRequestException('El horario ya existe');
      } else {
        throw new BadRequestException('Error al crear el horario');
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
