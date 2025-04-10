import { Injectable } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entities/carrera.entity';
import { FacultadService } from 'src/facultad/facultad.service';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,

    private facultadService: FacultadService,
  ) { }

  async create(createCarreraDto: CreateCarreraDto) {

    const facultad = await this.facultadService.findOne(createCarreraDto.facultad_id);

    const carrera = this.carreraRepository.create({
      ...createCarreraDto,
      facultad,
    });

    await this.carreraRepository.save(carrera);

    return carrera;
  }

  async findAll(): Promise<Carrera[]> {
    return await this.carreraRepository.find();
  }

  async findAllByFacultad(id: string): Promise<Carrera[]> {
    return await this.carreraRepository.find({
      where: { facultad: { id } },
    });
  }

  async findOne(id: string): Promise<Carrera> {
    return await this.carreraRepository.findOneBy({ id });
  }

  async update(id: string, updateCarreraDto: UpdateCarreraDto): Promise<void> {
    await this.carreraRepository.update(id, updateCarreraDto);
  }

  async remove(id: string): Promise<void> {
    await this.carreraRepository.delete(id);
  }
}
