import { Injectable } from '@nestjs/common';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';

@Injectable()
export class EntrenadorService {
  create(createEntrenadorDto: CreateEntrenadorDto) {
    return 'This action adds a new entrenador';
  }

  findAll() {
    return `This action returns all entrenador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entrenador`;
  }

  update(id: number, updateEntrenadorDto: UpdateEntrenadorDto) {
    return `This action updates a #${id} entrenador`;
  }

  remove(id: number) {
    return `This action removes a #${id} entrenador`;
  }
}
