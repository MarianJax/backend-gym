import { IsEnum, IsISO8601, IsNotEmpty, Min, MinDate } from 'class-validator';
import { Estado } from '../entities/mantenimiento.entity';

export class CreateMantenimientoDto {
  @IsEnum(Estado, {
    message:
      'El estado del mantenimiento inválido. Debe ser uno de los valores: Pendiente, En proceso o Finalizado.',
  })
  @IsNotEmpty({ message: 'El estado del mantenimiento es requerido' })
  estado: Estado;

  @Min(0.25, { message: 'El costo debe ser mayor a 0.25' })
  @IsNotEmpty({ message: 'El costo es requerido' })
  costo: number;

  @IsISO8601()
  @MinDate(new Date(), {
    message: 'La fecha del mantenimiento no puede ser menor a la fecha actual',
  })
  fecha_mantenimiento: Date;

  @IsNotEmpty({ message: 'Las observación no puede estar vacío' })
  observaciones: string;

  @IsNotEmpty({ message: 'La máquina es requerida' })
  maquina_id: string;
}
