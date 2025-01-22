import { Injectable } from '@nestjs/common';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenimiento } from './entities/mantenimiento.entity';

@Injectable()
export class MantenimientoService {
  constructor(
      @InjectRepository(Mantenimiento)
      private readonly MantenimientoRepository: Repository<Mantenimiento>,
    ) {}
  
    async create(createMantenimientoDto: CreateMantenimientoDto): Promise<Mantenimiento> {
      return await this.MantenimientoRepository.save(createMantenimientoDto);
    }
  
    async findAll(): Promise<Mantenimiento[]> {
      return await this.MantenimientoRepository.find();
    }
  
    async findOne(id: string): Promise<Mantenimiento> {
      return await this.MantenimientoRepository.findOneBy({ id });
    }
  
    async update(id: string, updateMantenimientoDto: UpdateMantenimientoDto): Promise<void> {
      await this.MantenimientoRepository.update(id, updateMantenimientoDto);
    }
  
    async remove(id: string): Promise<void> {
      await this.MantenimientoRepository.delete(id);
    }
  }
  