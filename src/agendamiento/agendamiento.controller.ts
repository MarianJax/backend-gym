import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';

@Controller('agendamiento')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) { }

  @Post()
  create(@Body() createAgendamientoDto: CreateAgendamientoDto) {
    return this.agendamientoService.create(createAgendamientoDto);
  }

  @Get('with-pending-validation')
  findAllWithPendingValidation(@Query('_limit') limit: number, @Query('_all') all: boolean) {
    return this.agendamientoService.findAllWithPendingValidation(limit, all);
  }

  @Get()
  findAll() {
    return this.agendamientoService.findAll();
  }

  @Get('/usuario/:id')
  findByUsuarioId(@Param('id') id: string, @Query('_fecha') fecha: string) {
    return this.agendamientoService.findByUsuarioId(id, fecha);
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
    return this.agendamientoService.update(id, updateAgendamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendamientoService.remove(id);
  }
}
