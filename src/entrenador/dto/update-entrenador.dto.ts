import { PartialType } from '@nestjs/mapped-types';
import { CreateEntrenadorDto } from './create-entrenador.dto';

export class UpdateEntrenadorDto extends PartialType(CreateEntrenadorDto) {}
