import { Injectable } from '@nestjs/common';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { Agendamiento } from './entities/agendamiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AgendamientoService {
  private readonly MAX_RESERVAS = 40;

  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,
  ) {}

  async verificarMaximoReservas(): Promise<boolean> {
    const count = await this.agendamientoRepository.count();
    return count >= this.MAX_RESERVAS;
  }

  async create(
    createAgendamientoDto: CreateAgendamientoDto,
  ): Promise<Agendamiento> {
    return await this.agendamientoRepository.save(createAgendamientoDto);
  }

  async findAll(): Promise<Agendamiento[]> {
    return await this.agendamientoRepository.find();
  }

  async findOne(id: number): Promise<Agendamiento> {
    return await this.agendamientoRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAgendamientoDto: UpdateAgendamientoDto,
  ): Promise<void> {
    await this.agendamientoRepository.update(id, UpdateAgendamientoDto);
  }

  async remove(id: number): Promise<void> {
    await this.agendamientoRepository.delete(id);
  }
}
