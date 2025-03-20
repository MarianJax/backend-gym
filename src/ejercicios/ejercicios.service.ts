import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaquinaService } from 'src/maquina/maquina.service';
import { RutinaService } from 'src/rutina/rutina.service';
import { Repository } from 'typeorm';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';
import { Ejercicio } from './entities/ejercicio.entity';

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

    rutinas.forEach(rutina => {
      rutina.cantidad_ejercicios += 1;
    });

    await this.rutinaService.updatedCantidadEjercicios(rutinas);

    await this.ejercicioRepository.save(ejercicio);

    return ejercicio;
  }
  async findAll(): Promise<Ejercicio[]> {
    return await this.ejercicioRepository.find({ relations: ['rutinas', 'maquinas'] });
  }

  async findOne(id: string): Promise<Ejercicio> {
    return await this.ejercicioRepository.findOne({ where: { id }, relations: ['rutinas', 'maquinas'] });
  }

  async update(id: string, { maquinas: mqs, rutinas: rts, ...data }: UpdateEjercicioDto): Promise<void> {
    const rutinas = await this.rutinaService.findAllById(rts);
    const maquinas = await this.maquinaService.findAllById(mqs);

    const ejercicio = await this.ejercicioRepository.findOne({ where: { id } });

    if (!ejercicio) {
      throw new BadRequestException('Ejercicio no encontrado');
    }

    Object.assign(ejercicio, data);
    ejercicio.rutinas = rutinas;
    ejercicio.maquinas = maquinas;

    await this.ejercicioRepository.save(ejercicio);
  }

  async remove(id: string): Promise<void> {
    await this.ejercicioRepository.delete(id);
  }
}
