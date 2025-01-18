import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendamientoDto } from './create-agendamiento.dto';

export class UpdateAgendamientoDto extends PartialType(CreateAgendamientoDto) {}
