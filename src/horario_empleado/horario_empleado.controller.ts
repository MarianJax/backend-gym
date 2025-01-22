import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HorarioEmpleadoService } from './horario_empleado.service';
import { CreateHorarioEmpleadoDto } from './dto/create-horario_empleado.dto';
import { UpdateHorarioEmpleadoDto } from './dto/update-horario_empleado.dto';

@Controller('horario-empleado')
export class HorarioEmpleadoController {
  constructor(
    private readonly horarioEntrenadorService: HorarioEmpleadoService,
  ) {}

  @Post()
  create(@Body() createHorarioEntrenadorDto: CreateHorarioEmpleadoDto) {
    return this.horarioEntrenadorService.create(createHorarioEntrenadorDto);
  }

  @Get()
  findAll() {
    return this.horarioEntrenadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horarioEntrenadorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHorarioEntrenadorDto: UpdateHorarioEmpleadoDto,
  ) {
    return this.horarioEntrenadorService.update(
      id,
      updateHorarioEntrenadorDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horarioEntrenadorService.remove(id);
  }
}
