import { Injectable } from '@nestjs/common';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { Agendamiento } from './entities/agendamiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AgendamientoService {
  private readonly MAX_RESERVAS = 40;

  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,

    // Se importa el repositorio para realizar consulta a la entidad/tabla Usuario
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async findOne(id: string): Promise<Agendamiento> {
    return await this.agendamientoRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAgendamientoDto: UpdateAgendamientoDto,
  ): Promise<void> {
    await this.agendamientoRepository.update(id, updateAgendamientoDto);
  }

  async remove(id: string): Promise<void> {
    await this.agendamientoRepository.delete(id);
  }

  // Metodo para buscar un usuario, horarios y rol por su id
  async findUserRolId(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'horario'],
    });
  }
}
