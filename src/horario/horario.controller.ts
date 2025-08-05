import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { DiaSemana, Jornada } from 'src/enum/entities.enum';

@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) { }

  @Post()
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horarioService.create(createHorarioDto);
  }

  @Get()
  findAll() {
    return this.horarioService.findAll();
  }


  @Get('roles/:rol')
  findHorarioRol(@Param('rol') rol: string) {
    return this.horarioService.findHorarioRol(rol);
  }

  @Get('rol/:rol/:dia/:fecha')
  findHorarioRolDia(@Param('rol') rol: string, @Param('dia') dia: string, @Param('fecha') fecha: string) {
    return this.horarioService.findHorarioRolFecha(rol, dia as DiaSemana, fecha);
  }

  @Get('membresia')
  findHorarioMembresias(@Query('fecha') fecha: Date,@Query('usuario') usuario: string,@Query('rol') rol:string,@Query('jornada') jornada: string) {
    return this.horarioService.findHorarioMembresia(fecha, usuario, rol, jornada as Jornada);

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
    console.log(updateHorarioDto);
    return this.horarioService.update(id, updateHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horarioService.remove(id);
  }
}
