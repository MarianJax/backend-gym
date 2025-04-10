import {
  IsISO8601,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateAgendamientoDto {
  @IsISO8601(
    { strict: true },
    { message: 'La fecha debe tener el formato YYYY-MM-DD' },
  )
  @IsNotEmpty({ message: 'La fecha no puede estar vacío' })
  fecha: Date;

  @IsNotEmpty({ message: 'El usuario es requerido' })
  usuario_id: string;

  @IsMilitaryTime({ message: 'La hora de inicio debe ser una hora válida' })
  @IsNotEmpty({ message: 'La hora de inicio es requerida' })
  hora_inicio: string | Date;

  @IsMilitaryTime({ message: 'La hora de fin debe ser una hora válida' })
  @IsNotEmpty({ message: 'La hora de fin es requerida' })
  hora_fin: string | Date;

  @IsNotEmpty({ message: 'El metodo de pago es requerida' })
  metodo_pago: string;

  @IsNotEmpty({ message: 'El tipo de imagen es requerida' })
  tipo: string;

  @IsNotEmpty({ message: 'El monto del pago es requerida' })
  monto: number;

  @IsNotEmpty({ message: 'La evidencia del pago es necesario' })
  @IsNumber({}, { each: true })
  evidencia_pago: number[];

  @IsNotEmpty({ message: 'El rol es requerido' })
  rol: string;
}

export class CreateAgendamientoForMembresia {
  @IsISO8601(
    { strict: true },
    { message: 'La fecha debe tener el formato YYYY-MM-DD' },
  )
  @IsNotEmpty({ message: 'La fecha no puede estar vacío' })
  fecha: Date;

  @IsNotEmpty({ message: 'El usuario es requerido' })
  usuario_id: string;


  @IsNotEmpty({ message: 'La membresía es requerida' })
  membresia: string;

  @IsMilitaryTime({ message: 'La hora de inicio debe ser una hora válida' })
  @IsNotEmpty({ message: 'La hora de inicio es requerida' })
  hora_inicio: string | Date;

  @IsMilitaryTime({ message: 'La hora de fin debe ser una hora válida' })
  @IsNotEmpty({ message: 'La hora de fin es requerida' })
  hora_fin: string | Date;
}
