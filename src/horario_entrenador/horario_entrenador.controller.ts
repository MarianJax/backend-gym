import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HorarioEntrenadorService } from './horario_entrenador.service';
import { CreateHorarioEntrenadorDto } from './dto/create-horario_entrenador.dto';
import { UpdateHorarioEntrenadorDto } from './dto/update-horario_entrenador.dto';

@Controller('horario-entrenador')
export class HorarioEntrenadorController {
  constructor(private readonly horarioEntrenadorService: HorarioEntrenadorService) {}

  @Post()
  create(@Body() createHorarioEntrenadorDto: CreateHorarioEntrenadorDto) {
    return this.horarioEntrenadorService.create(createHorarioEntrenadorDto);
  }

  @Get()
  findAll() {
    return this.horarioEntrenadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horarioEntrenadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorarioEntrenadorDto: UpdateHorarioEntrenadorDto) {
    return this.horarioEntrenadorService.update(+id, updateHorarioEntrenadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horarioEntrenadorService.remove(+id);
  }
}
