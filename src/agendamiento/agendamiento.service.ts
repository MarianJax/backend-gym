import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membresia } from 'src/membresia/entities/membresia.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { Agendamiento } from './entities/agendamiento.entity';

@Injectable()
export class AgendamientoService {
  private readonly MAX_RESERVAS = 40;

  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,

    // Se importa el repositorio para realizar consulta a la entidad/tabla Usuario
    @InjectRepository(Membresia)
    private readonly MembresiaRepository: Repository<Membresia>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async verificarMaximoReservas({ hora_inicio, hora_fin }: { hora_inicio: Date, hora_fin: Date }): Promise<boolean> {
    const count = await this.agendamientoRepository.count({ where: { hora_inicio, hora_fin } });
    console.log(count >= 40);
    return count >= 40;
  }

  async create(
    createAgendamientoDto: CreateAgendamientoDto,
  ): Promise<Agendamiento> {


    const maximoAlcanzado = await this.verificarMaximoReservas({ hora_inicio: createAgendamientoDto.hora_inicio, hora_fin: createAgendamientoDto.hora_fin });
    if (maximoAlcanzado) {
      throw new BadRequestException('Número máximo de reservas alcanzado.');
    }
    const membresia = await this.findMembresiaId(createAgendamientoDto.membresia_id);

    const user = await this.findUserRolId(createAgendamientoDto.usuario_id);

    const agendamiento = this.agendamientoRepository.create({
      ...createAgendamientoDto,
      user: user,
      membresias: membresia,
    });

    return await this.agendamientoRepository.save(agendamiento);
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
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['roles'],
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Usuario no encontrado');

    }
  }

  // metodoo para obtener la membresia del usuario
  async findMembresiaId(id: string): Promise<Membresia> {
    try {
      return await this.MembresiaRepository.findOneByOrFail({
        id
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Membresia no encontrado');

    }
  }
}
