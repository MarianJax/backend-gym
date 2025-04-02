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

    const ejercicio = await this.ejercicioRepository.findOne({
      where: { id },
      relations: ['rutinas'], // Asegúrate de cargar las rutinas asociadas al ejercicio
    });

    if (!ejercicio) {
      throw new BadRequestException('Ejercicio no encontrado');
    }

    // Restar el ejercicio de las rutinas antiguas
    for (const rutina of ejercicio.rutinas) {
      rutina.cantidad_ejercicios = Math.max(0, rutina.cantidad_ejercicios - 1); // Asegura que la cantidad no sea negativa
      await this.rutinaService.save(rutina); // Guarda las rutinas con la cantidad actualizada
    }

    // Actualizar los datos del ejercicio
    Object.assign(ejercicio, data);
    ejercicio.rutinas = rutinas;
    ejercicio.maquinas = maquinas;

    // Aumentar el contador de ejercicios en las nuevas rutinas
    for (const rutina of rutinas) {
      rutina.cantidad_ejercicios += 1;
      await this.rutinaService.save(rutina); // Guarda las rutinas con la cantidad actualizada
    }

    // Guardar el ejercicio con las nuevas rutinas y máquinas
    await this.ejercicioRepository.save(ejercicio);
  }

  async remove(id: string): Promise<void> {
    // Buscar el ejercicio a eliminar
    const ejercicio = await this.ejercicioRepository.findOne({
      where: { id },
      relations: ['rutinas'], // Cargar las rutinas asociadas al ejercicio
    });

    if (!ejercicio) {
      throw new BadRequestException('Ejercicio no encontrado');
    }

    // Iterar sobre las rutinas asociadas al ejercicio y restar el ejercicio de ellas
    for (const rutina of ejercicio.rutinas) {
      // Reducir la cantidad de ejercicios en la rutina
      if (rutina.cantidad_ejercicios > 0) {
        rutina.cantidad_ejercicios = Math.max(0, rutina.cantidad_ejercicios - 1);
        await this.rutinaService.save(rutina); // Guardar la rutina con la cantidad actualizada
      }
    }

    // Eliminar el ejercicio de la base de datos
    await this.ejercicioRepository.delete(id);
  }
}
