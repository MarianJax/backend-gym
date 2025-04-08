import { IsOptional, IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateValidacionesPagoDto {
  @IsISO8601()
  @IsOptional()
  fecha_validacion?: Date;

  @IsNotEmpty({ message: 'La evidencia no puede estar vacía' })
  evidencia: Buffer;

  @IsNotEmpty({ message: 'El tipo no puede estar vacío' })
  tipo: string;

  @IsNotEmpty({ message: 'El pago no puede estar vacío' })
  pago_id: string;
  

  @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
  usuario_id: string;
}
