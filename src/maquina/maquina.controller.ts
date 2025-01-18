import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaquinaService } from './maquina.service';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';

@Controller('maquina')
export class MaquinaController {
  constructor(private readonly maquinaService: MaquinaService) 
  {}
  @Post()
  create(@Body() createMaquinaDto: CreateMaquinaDto) {
    return this.maquinaService.create(createMaquinaDto);
  }

  @Get()
  findAll() {
    return maquinas;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return maquinas.filter((maquina) => maquina.item === id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaquinaDto: UpdateMaquinaDto) {
    const equipos= maquinas.filter((maquina) => maquina.nombre === id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maquinaService.remove(+id);

  }

}
interface Maquina {
  nombre: string;
  grupoMuscular: string;
  item: string;
  cpc: string;
  catalogado: boolean;
}

const maquinas: Maquina[] = [
  {
    nombre: 'Máquina de Prensa de Piernas',
    grupoMuscular: 'Piernas',
    item: 'MP001',
    cpc: '$1,200',
    catalogado: false,
  },
  {
    nombre: 'Máquina de Pecho',
    grupoMuscular: 'Pectorales',
    item: 'MP002',
    cpc: '$900',
    catalogado: false,
  },
  {
    nombre: 'Máquina de Bíceps',
    grupoMuscular: 'Brazos',
    item: 'MB001',
    cpc: '$800',
    catalogado: false,
  },
  {
    nombre: 'Máquina de Espalda',
    grupoMuscular: 'Espalda',
    item: 'ME001',
    cpc: '$950',
    catalogado: false,
  },
  {
    nombre: 'Máquina de Abdominales',
    grupoMuscular: 'Abdomen',
    item: 'MA001',
    cpc: '$700',
    catalogado: false,
  },
  {
    nombre: 'Máquina de Hombros',
    grupoMuscular: 'Hombros',
    item: 'MH001',
    cpc: '$850',
    catalogado: false,
  },
];

console.log(maquinas);
