import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facultad } from 'src/facultad/entities/facultad.entity';
import { Carrera } from './entities/carrera.entity';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Facultad)
    private readonly facultadRepository: Repository<Facultad>,

    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(createCarreraDto: CreateCarreraDto) {

    const facultad = await this.findFacultadById(createCarreraDto.facultad_id);

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

  async findOne(id: string): Promise<Carrera> {
    return await this.carreraRepository.findOneBy({ id });
  }

  async update(id: string, updateCarreraDto: UpdateCarreraDto): Promise<void> {
    await this.carreraRepository.update(id, updateCarreraDto);
  }

  async remove(id: string): Promise<void> {
    await this.carreraRepository.delete(id);
  }

  private async findFacultadById(id: string): Promise<Facultad> {
    try {
      return await this.facultadRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      console.error('La facultad no existe', error);
      if (error.code === '22P02' && error.routine === 'string_to_uuid') {
        throw new BadRequestException('La Facultad seleccionada no existe');
      }
    }
  }
}
