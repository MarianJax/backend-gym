import { Injectable } from '@nestjs/common';
import { CreateMembresiaDto } from './dto/create-membresia.dto';
import { UpdateMembresiaDto } from './dto/update-membresia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membresia } from './entities/membresia.entity';

@Injectable()
export class MembresiaService {
  constructor(
    @InjectRepository(Membresia)
    private readonly MembresiaRepository: Repository<Membresia>,
  ) {}

  async create(
    createMembresiaDto: CreateMembresiaDto,
  ): Promise<Membresia> {
    return await this.MembresiaRepository.save(
      createMembresiaDto,
    );
  }

  async findAll(): Promise<Membresia[]> {
    return await this.MembresiaRepository.find({
      order: {
        fecha_inicio: 'ASC'
      }
    });
  }

  async findOne(id: number): Promise<Membresia> {
    return await this.MembresiaRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateMembresiaDto: UpdateMembresiaDto,
  ): Promise<void> {
    await this.MembresiaRepository.update(
      id,
      updateMembresiaDto,
    );
  }

  async remove(id: number): Promise<void> {
    await this.MembresiaRepository.delete(id);
  }
}
