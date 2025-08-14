import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import {
  CreateAgendamientoDto,
  CreateAgendamientoForMembresia,
} from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';

@Controller('agendamiento')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) {}

  @Post()
  create(@Body() createAgendamientoDto: CreateAgendamientoDto) {
    return this.agendamientoService.create(createAgendamientoDto);
  }

  @Post('membresia')
  createAgendamientoForMembresia(@Body() data: CreateAgendamientoForMembresia) {
    return this.agendamientoService.createAgendamientoForMembresia(data);
  }

  @Get('with-pending-validation')
  findAllWithPendingValidation(
    @Query('_limit') limit: number,
    @Query('_all') all: boolean,
  ) {
    return this.agendamientoService.findAllWithPendingValidation(limit, all);
  }

  @Get('for-date')
  findAllDate(@Query('_fecha') fecha: string) {
    return this.agendamientoService.findAllDate(fecha);
  }

  @Get()
  findAll(@Query('_fecha') fecha: string) {
    return this.agendamientoService.findAll(fecha);
  }

  @Get('/usuario/:id')
  findByUsuarioId(
    @Param('id') id: string,
    @Query('_fecha') fecha: string,
    @Query('_rol') rol: string,
  ) {
    return this.agendamientoService.findByUsuarioId(id, fecha, rol);
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
