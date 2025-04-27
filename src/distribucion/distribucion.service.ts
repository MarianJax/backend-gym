import { Injectable } from '@nestjs/common';
import { CreateDistribucionDto } from './dto/create-distribucion.dto';
import { UpdateDistribucionDto } from './dto/update-distribucion.dto';
import { Distribucion } from './entities/distribucion.entity';
import { ILike, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DistribucionService {
  constructor(
    @InjectRepository(Distribucion)
    private readonly distribucionRepository: Repository<Distribucion>,
  ) {}

  async create(createRolDto: CreateDistribucionDto) {
    const rol = this.distribucionRepository.create(createRolDto);
    return await this.distribucionRepository.save(rol);
  }

  async findAll(): Promise<Distribucion[]> {
    return await this.distribucionRepository.find();
  }

  async findAllById(id: string[]): Promise<Distribucion[]> {
    return await this.distribucionRepository.find({
      where: { id: In(id) },
    });
  }

  async findOne(id: string): Promise<Distribucion> {
    return await this.distribucionRepository.findOneBy({ id });
  }

  /*async findOneByName(nombre: string): Promise<Distribucion> {
    return await this.distribucionRepository.findOne({
      where: { nombre: ILike(nombre) },
      relations: ['horarios'],
    });
  }*/

  async findOneByUsuario(id: string): Promise<Distribucion[]> {
    return await this.distribucionRepository.find({
      where: {
        rol_id: id,
      },
    });
  }

  async update(id: string, updateRolDto: UpdateDistribucionDto): Promise<void> {
    await this.distribucionRepository.update(id, updateRolDto);
  }

  async remove(id: string): Promise<void> {
    await this.distribucionRepository.delete(id);
  }
}
