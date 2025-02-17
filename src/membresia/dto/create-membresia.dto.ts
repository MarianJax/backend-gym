import { IsISO8601, IsNotEmpty, IsOptional, IsString, Min, MinDate } from "class-validator";

export class CreateMembresiaDto {

    @IsISO8601()
    @MinDate(() => new Date(), { message: 'La fecha no puede ser menor a hoy' })
    fecha_inicio: Date;

    @IsOptional()
    @IsISO8601()
    fecha_fin?: Date;

    @Min(0.25, { message: 'El costo debe ser mayor a 0.25' })
    @IsNotEmpty({ message: 'El costo no puede estar vacío' })
    costo: number;

    @IsString({ message: 'El usuario debe ser un texto' })
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    usuario_id: string;

    @IsString({ message: 'El pago debe ser un texto' })
    @IsNotEmpty({ message: 'El pago no puede estar vacío' })
    pago_id: string;

}
