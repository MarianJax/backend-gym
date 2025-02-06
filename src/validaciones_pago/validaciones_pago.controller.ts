import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidacionesPagoService } from './validaciones_pago.service';
import { CreateValidacionesPagoDto } from './dto/create-validaciones_pago.dto';
import { UpdateValidacionesPagoDto } from './dto/update-validaciones_pago.dto';

@Controller('validaciones-pago')
export class ValidacionesPagoController {
  constructor(private readonly validacionesPagoService: ValidacionesPagoService) {}

  @Post()
  create(@Body() createValidacionesPagoDto: CreateValidacionesPagoDto) {
    return this.validacionesPagoService.create(createValidacionesPagoDto);
  }

  @Get()
  findAll() {
    return this.validacionesPagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.validacionesPagoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateValidacionesPagoDto: UpdateValidacionesPagoDto) {
    return this.validacionesPagoService.update(id, updateValidacionesPagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.validacionesPagoService.remove(id);
  }
}
