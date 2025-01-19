import { PartialType } from '@nestjs/mapped-types';
import { CreateHorarioEntrenadorDto } from './create-horario_entrenador.dto';

export class UpdateHorarioEntrenadorDto extends PartialType(CreateHorarioEntrenadorDto) {}
