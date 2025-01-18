import { Injectable } from '@nestjs/common';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';

@Injectable()
export class AgendamientoService {
  create(createAgendamientoDto: CreateAgendamientoDto) {
    return 'This action adds a new agendamiento';
  }

  findAll() {
    return `This action returns all agendamiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agendamiento`;
  }

  update(id: number, updateAgendamientoDto: UpdateAgendamientoDto) {
    return `This action updates a #${id} agendamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} agendamiento`;
  }
}
