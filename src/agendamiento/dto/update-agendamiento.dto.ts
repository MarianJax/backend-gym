import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendamientoDto } from './create-agendamiento.dto';
import { IsOptional } from 'class-validator';

export class UpdateAgendamientoDto extends PartialType(CreateAgendamientoDto) {
    @IsOptional({ message: 'La distribución es requerido' })
      distribucion: string; 
}
