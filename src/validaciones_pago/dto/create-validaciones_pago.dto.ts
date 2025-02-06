import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, MinDate } from "class-validator";

export class CreateValidacionesPagoDto {
    @IsDate({ message: 'Debe ser una fecha válida' })
    @Transform(({ value }) => new Date(value + 'T05:00:00.000Z'))
    @MinDate(() => new Date(), { message: 'La fecha no puede ser menor a hoy' })
    fecha_validacion: Date;

    @IsNotEmpty({ message: 'La evidencia no puede estar vacía' })
    evidencia: string;

    @IsNotEmpty({ message: 'El token de pago no puede estar vacío' })
    token_pago: string;

    @IsNotEmpty({ message: 'El pago no puede estar vacío' })
    pago_id: string;

    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    usuario_id: string;
}
