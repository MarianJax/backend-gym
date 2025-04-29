import { Controller, Get } from '@nestjs/common';
import { InstitucionService } from './institucion.service';

@Controller('institucion')
export class InstitucionController {
  constructor(private readonly institucionService: InstitucionService) {}

  @Get()
  findAll() {
    return this.institucionService.findAll();
  }
}
