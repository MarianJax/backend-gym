import { PartialType } from '@nestjs/mapped-types';
import { CreateHorarioEmpleadoDto } from './create-horario_empleado.dto';

export class UpdateHorarioEmpleadoDto extends PartialType(CreateHorarioEmpleadoDto) {}
