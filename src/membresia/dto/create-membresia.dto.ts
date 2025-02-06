import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, Min, MinDate } from "class-validator";

export class CreateMembresiaDto {

    @IsDate({ message: 'Debe ser una fecha válida' })
    @Transform(({ value }) => new Date(value + 'T05:00:00.000Z'))
    @MinDate(() => new Date(), { message: 'La fecha no puede ser menor a hoy' })
    fecha_inicio: Date;

    @IsOptional()
    @IsDate({ message: 'Debe ser una fecha de fin válida' })
    @Transform(({ value }) => new Date(value + 'T05:00:00.000Z'))
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
