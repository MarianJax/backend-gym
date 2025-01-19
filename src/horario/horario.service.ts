import { Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horario } from './entities/horario.entity';

@Injectable()
export class HorarioService {
  constructor(
      @InjectRepository(Horario)
      private readonly HorarioRepository: Repository<Horario>,
    ) {}
  
    async create(createHorarioDto: CreateHorarioDto): Promise<Horario> {
      return await this.HorarioRepository.save(createHorarioDto);
    }
  
    async findAll(): Promise<Horario[]> {
      return await this.HorarioRepository.find();
    }
  
    async findOne(id: number): Promise<Horario> {
      return await this.HorarioRepository.findOneBy({ id });
    }
  
    async update(id: number, updateHorarioDto: UpdateHorarioDto): Promise<void> {
      await this.HorarioRepository.update(id, updateHorarioDto);
    }
  
    async remove(id: number): Promise<void> {
      await this.HorarioRepository.delete(id);
    }
  }
  