import { Injectable } from '@nestjs/common';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrenadores } from './entities/entrenador.entity';

@Injectable()
export class EntrenadorService {
  constructor(
    @InjectRepository(Entrenadores)
    private readonly EntrenadoresRepository: Repository<Entrenadores>,
  ) {}

  async create(createEntrenadoresDto: CreateEntrenadorDto): Promise<Entrenadores> {
    return await this.EntrenadoresRepository.save(createEntrenadoresDto);
  }

  async findAll(): Promise<Entrenadores[]> {
    return await this.EntrenadoresRepository.find();
  }

  async findOne(id: string): Promise<Entrenadores> {
    return await this.EntrenadoresRepository.findOneBy({ id });
  }

  async update(id: string, updateEntrenadoresDto: UpdateEntrenadorDto): Promise<void> {
    await this.EntrenadoresRepository.update(id, updateEntrenadoresDto);
  }

  async remove(id: string): Promise<void> {
    await this.EntrenadoresRepository.delete(id);
  }
}
