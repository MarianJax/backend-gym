import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Min, MinDate } from "class-validator";
import { Tipo } from "../entities/membresia.entity";

export class CreateMembresiaDto {
    @Type(() => Date)
    @IsDate({ message: 'Debe ser una fecha válida' })
    @MinDate(() => new Date(), { message: 'La fecha no puede ser menor a hoy' })
    fecha_inicio: Date;

    @Type(() => Date)
    @IsOptional()
    @IsDate({ message: 'Debe ser una fecha de fin válida' })
    fecha_fin?: Date;

    @IsEnum(Tipo, { message: 'Tipo de pago inválido. Debe ser uno de los valores: Diario o Mensual.' })
    tipo_pago: Tipo;

    @Min(0.25, { message: 'El costo debe ser mayor a 0.25' })
    @IsNotEmpty({ message: 'El costo no puede estar vacío' })
    costo: number;

    @IsString({ message: 'El id del usuario debe ser un texto' })
    @IsNotEmpty({ message: 'El id del usuario no puede estar vacío' })
    usuario_id: string;

}
