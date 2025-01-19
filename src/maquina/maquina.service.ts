import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maquina } from './entities/maquina.entity';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';

@Injectable()
export class MaquinaService {
  constructor(
    @InjectRepository(Maquina)
    private readonly maquinaRepository: Repository<Maquina>,
  ) {}

  async create(createMaquinaDto: CreateMaquinaDto): Promise<Maquina> {
    return await this.maquinaRepository.save(createMaquinaDto);
  }

  async findAll(): Promise<Maquina[]> {
    return await this.maquinaRepository.find();
  }

  async findOne(id: string): Promise<Maquina> {
    return await this.maquinaRepository.findOneBy({ id });
  }

  async update(id: number, updateMaquinaDto: UpdateMaquinaDto): Promise<void> {
    await this.maquinaRepository.update(id, UpdateMaquinaDto);
  }

  async remove(id: number): Promise<void> {
    await this.maquinaRepository.delete(id);
  }
}
