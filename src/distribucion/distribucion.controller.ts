import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DistribucionService } from './distribucion.service';
import { CreateDistribucionDto } from './dto/create-distribucion.dto';
import { UpdateDistribucionDto } from './dto/update-distribucion.dto';

@Controller('distribucion')
export class DistribucionController {
  constructor(private readonly distribucionService: DistribucionService) {}

  @Post()
  create(@Body() createRolDto: CreateDistribucionDto) {
    return this.distribucionService.create(createRolDto);
  }

  @Get()
  findAll() {
    return this.distribucionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distribucionService.findOne(id);
  }

  @Get('nombre/:nombre')
  findOneByRol(@Param('nombre') nombre: string) {
    return this.distribucionService.findOneByRolName(nombre);
  }

  @Get('usuario/:id')
  findOneByUsuario(@Param('id') id: string) {
    return this.distribucionService.findOneByUsuario(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateDistribucionDto) {
    return this.distribucionService.update(id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.distribucionService.remove(id);
  }
}
