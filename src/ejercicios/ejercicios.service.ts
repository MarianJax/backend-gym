import { Injectable } from '@nestjs/common';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';
import { RutinaService } from 'src/rutina/rutina.service';
import { Repository } from 'typeorm';
import { Ejercicio } from './entities/ejercicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MaquinaService } from 'src/maquina/maquina.service';

@Injectable()
export class EjerciciosService {

  constructor(
    @InjectRepository(Ejercicio)
    private readonly ejercicioRepository: Repository<Ejercicio>,

    private readonly rutinaService: RutinaService,
    private readonly maquinaService: MaquinaService,
  ) { }

  async create(createEjercicioDto: CreateEjercicioDto): Promise<Ejercicio> {

    const rutinas = await this.rutinaService.findAllById(createEjercicioDto.rutinas);
    const maquinas = await this.maquinaService.findAllById(createEjercicioDto.maquinas);

    const ejercicio = this.ejercicioRepository.create({
      ...createEjercicioDto,
      rutinas,
      maquinas,
    });

    await this.ejercicioRepository.save(ejercicio);

    return ejercicio;
  }
  async findAll(): Promise<Ejercicio[]> {
    return await this.ejercicioRepository.find();
  }

  async findOne(id: string): Promise<Ejercicio> {
    return await this.ejercicioRepository.findOneBy({ id });
  }

  async update(id: string, updateEjercicioDto: UpdateEjercicioDto): Promise<void> {
    const rutinas = await this.rutinaService.findAllById(updateEjercicioDto.rutinas);
    const maquinas = await this.maquinaService.findAllById(updateEjercicioDto.maquinas);

    await this.ejercicioRepository.update(id, {
      ...updateEjercicioDto,
      rutinas,
      maquinas,
    });
  }

  async remove(id: string): Promise<void> {
    await this.ejercicioRepository.delete(id);
  }
}
