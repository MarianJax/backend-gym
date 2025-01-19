import { Injectable } from '@nestjs/common';
import { CreateHorarioEntrenadorDto } from './dto/create-horario_entrenador.dto';
import { UpdateHorarioEntrenadorDto } from './dto/update-horario_entrenador.dto';

@Injectable()
export class HorarioEntrenadorService {
  create(createHorarioEntrenadorDto: CreateHorarioEntrenadorDto) {
    return 'This action adds a new horarioEntrenador';
  }

  findAll() {
    return `This action returns all horarioEntrenador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horarioEntrenador`;
  }

  update(id: number, updateHorarioEntrenadorDto: UpdateHorarioEntrenadorDto) {
    return `This action updates a #${id} horarioEntrenador`;
  }

  remove(id: number) {
    return `This action removes a #${id} horarioEntrenador`;
  }
}
