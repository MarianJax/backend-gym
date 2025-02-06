import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';
import { Entrenadores } from './entities/entrenador.entity';

@Injectable()
export class EntrenadorService {
  constructor(
    @InjectRepository(Entrenadores)
    private readonly EntrenadoresRepository: Repository<Entrenadores>,
  ) { }

  async create(createEntrenadoresDto: CreateEntrenadorDto): Promise<Entrenadores> {
    try {
      const entrenador = this.EntrenadoresRepository.create({
        ...createEntrenadoresDto,
      },);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userSaved = await this.EntrenadoresRepository.save(entrenador);

      return userSaved;
    } catch (error) {
      console.error('El horario no existe', error);
      throw new BadRequestException('El horario no existe');

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
