import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMembresiaDto } from './dto/create-membresia.dto';
import { UpdateMembresiaDto } from './dto/update-membresia.dto';
import { Membresia } from './entities/membresia.entity';

@Injectable()
export class MembresiaService {
  constructor(
    @InjectRepository(Membresia)
    private readonly MembresiaRepository: Repository<Membresia>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(
    createMembresiaDto: CreateMembresiaDto,
  ): Promise<Membresia> {
    try {
      const user = await this.userRepository.findOneByOrFail({ id: createMembresiaDto.usuario_id });

      const membresia = this.MembresiaRepository.create({
        ...createMembresiaDto,
        users: user
      });

      return await this.MembresiaRepository.save(membresia);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new Error('El usuario ya tiene una membresía activa');
      }
    }
  }

  async findAll(): Promise<Membresia[]> {
    return await this.MembresiaRepository.find({
      order: {
        fecha_inicio: 'ASC'
      }
    });
  }

  async findOne(id: string): Promise<Membresia> {
    return await this.MembresiaRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateMembresiaDto: UpdateMembresiaDto,
  ): Promise<void> {
    await this.MembresiaRepository.update(
      id,
      updateMembresiaDto,
    );
  }

  async remove(id: string): Promise<void> {
    await this.MembresiaRepository.delete(id);
  }
}
