import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntrenadorService } from './entrenador.service';
import { CreateEntrenadorDto } from './dto/create-entrenador.dto';
import { UpdateEntrenadorDto } from './dto/update-entrenador.dto';

@Controller('entrenador')
export class EntrenadorController {
  constructor(private readonly entrenadorService: EntrenadorService) {}

  @Post()
  create(@Body() createEntrenadorDto: CreateEntrenadorDto) {
    return this.entrenadorService.create(createEntrenadorDto);
  }

  @Get()
  findAll() {
    return this.entrenadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entrenadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntrenadorDto: UpdateEntrenadorDto) {
    return this.entrenadorService.update(+id, updateEntrenadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entrenadorService.remove(+id);
  }
}
