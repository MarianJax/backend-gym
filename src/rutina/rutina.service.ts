import { Injectable } from '@nestjs/common';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rutina } from './entities/rutina.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RutinaService {

  constructor(
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
  ) { }

  async create(createRutinaDto: CreateRutinaDto): Promise<Rutina> {
    const rutina = this.rutinaRepository.create({
      ...createRutinaDto,
    });

    await this.rutinaRepository.save(rutina);

    return rutina;
  }
  async findAll(): Promise<Rutina[]> {
    return await this.rutinaRepository.find();
  }
  async findAllById(ids: string[]): Promise<Rutina[]> {
    return await this.rutinaRepository.find({
      where: {
        id: In(ids)
      }
    });
  }

  async findOne(id: string): Promise<Rutina> {
    return await this.rutinaRepository.findOne({ where: { id }, relations: ['ejercicios', 'ejercicios.maquinas'] });
  }

  async update(id: string, updateRutinaDto: UpdateRutinaDto): Promise<void> {
    await this.rutinaRepository.update(id, updateRutinaDto);
  }

  async remove(id: string): Promise<void> {
    await this.rutinaRepository.delete(id);
  }

  async save (rutina: Rutina): Promise<Rutina> {
    return await this.rutinaRepository.save(rutina);
  }

  async updatedCantidadEjercicios(rutinas: Rutina[]): Promise<void> {
    await this.rutinaRepository.save(rutinas);
  }

  async disconectedEjercicios(id: string, ejercicioId: string) {
    try {
      const rutina = await this.findOne(id);

      rutina.cantidad_ejercicios = rutina.cantidad_ejercicios - 1;
      await this.rutinaRepository.save(rutina)

      await this.rutinaRepository
        .createQueryBuilder()
        .relation(Rutina, "ejercicios")
        .of(rutina)
        .remove(ejercicioId);

      return {
        message: 'Ejercicio eliminado de la rutina',
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Error al eliminar el ejercicio de la rutina',
        success: false,
      };
    }
  }
}
