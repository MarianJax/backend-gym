import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';

@Controller('agendamiento')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) {}

  @Post()
  create(@Body() createAgendamientoDto: CreateAgendamientoDto) {
    const user = this.agendamientoService.findUserRolId(createAgendamientoDto.usuario_id);


    const maximoAlcanzado = this.agendamientoService.verificarMaximoReservas();
    if (maximoAlcanzado) {
      throw new BadRequestException('Número máximo de reservas alcanzado.');
    }
    return this.agendamientoService.create(createAgendamientoDto);
  }

  @Get()
  findAll() {
    return this.agendamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendamientoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAgendamientoDto: UpdateAgendamientoDto,
  ) {
    return this.agendamientoService.update(+id, updateAgendamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendamientoService.remove(id);
  }
}
