import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from 'src/horario/entities/horario.entity';
import { Repository } from 'typeorm';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';
import { Entrenadores } from './entities/entrenador.entity';

@Injectable()
export class EntrenadorService {
  constructor(
    @InjectRepository(Entrenadores)
    private readonly EntrenadoresRepository: Repository<Entrenadores>,

    @InjectRepository(Horario)
    private readonly HorarioRepository: Repository<Horario>
  ) { }

  async create(createEntrenadoresDto: CreateEntrenadorDto): Promise<Entrenadores> {
    try {
      const horario = await this.HorarioRepository.findOneByOrFail({ id: createEntrenadoresDto.id_horario });

      const entrenador = this.EntrenadoresRepository.create({
        ...createEntrenadoresDto,
        horario,

      },);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userSaved = await this.EntrenadoresRepository.save(entrenador);

      return userSaved;
    } catch (error) {
      console.error('El horario no existe', error);
      if (error.code === '22P02' && error.routine === 'string_to_uuid') {
        throw new BadRequestException('El horario no existe');
      }
    }
  }

  async findAll(): Promise<Entrenadores[]> {
    return await this.EntrenadoresRepository.find();
  }

  async findOne(id: string): Promise<Entrenadores> {
    return await this.EntrenadoresRepository.findOneBy({ id });
  }

  async update(id: string, updateEntrenadoresDto: UpdateEntrenadorDto): Promise<void> {
    await this.EntrenadoresRepository.update(id, updateEntrenadoresDto);
  }

  async remove(id: string): Promise<void> {
    await this.EntrenadoresRepository.delete(id);
  }
}
