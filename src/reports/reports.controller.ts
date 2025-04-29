import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @Get()
  async findAll() {
    return this.reportsService.findAll();
  }

  @Get('/graphics')
  async findForGraphics(@Query('_facultad') facultad?: string, @Query('_carrera') carrera?: string, @Query('_departamento') departamento?: string, @Query('_tipoPago') tipoPago?: string) {
    return this.reportsService.findForGraphics(facultad, carrera, departamento, tipoPago);
  }

}
