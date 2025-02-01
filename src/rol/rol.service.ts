import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    const rol = this.rolRepository.create(createRolDto);
    console.log(rol);
    return await this.rolRepository.save(rol);
  }

  async findAll(): Promise<Rol[]> {
    return await this.rolRepository.find();
  }

  async findOne(id: string): Promise<Rol> {
    return await this.rolRepository.findOneBy({ id });
  }

  async update(id: string, updateRolDto: UpdateRolDto): Promise<void> {
    await this.rolRepository.update(id, updateRolDto);
  }

  async remove(id: string): Promise<void> {
    await this.rolRepository.delete(id);
  }
}
