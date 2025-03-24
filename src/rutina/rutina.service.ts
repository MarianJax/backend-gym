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

  async updatedCantidadEjercicios(rutinas: Rutina[]): Promise<void> {
    await this.rutinaRepository.save(rutinas);
  }
}
