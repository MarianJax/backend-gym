import { Injectable } from '@nestjs/common';
import { CreateFacultadDto } from './dto/create-facultad.dto';
import { UpdateFacultadDto } from './dto/update-facultad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Facultad } from './entities/facultad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacultadService {

  constructor(
      @InjectRepository(Facultad)
      private readonly facultadRepository: Repository<Facultad>,
    ) { }

  async create(createFacultadDto: CreateFacultadDto): Promise<Facultad> {
      const facultad = this.facultadRepository.create({
        ...createFacultadDto,
      });
  
      await this.facultadRepository.save(facultad);
  
      return facultad;
    }
  
    async findAll(): Promise<Facultad[]> {
      return await this.facultadRepository.find();
    }
  
    async findOne(id: string): Promise<Facultad> {
      return await this.facultadRepository.findOneBy({ id });
    }
  
    async update(id: string, updateFacultadDto: UpdateFacultadDto): Promise<void> {
      await this.facultadRepository.update(id, updateFacultadDto);
    }
  
    async remove(id: string): Promise<void> {
      await this.facultadRepository.delete(id);
    }
}
