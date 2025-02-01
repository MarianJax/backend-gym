import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, MinDate } from "class-validator";
import { Estado } from "../entities/mantenimiento.entity";

export class CreateMantenimientoDto {

    @IsEnum(Estado, { message: 'Estado de maquina inválido. Debe ser uno de los valores: Pendiente, En proceso o Finalizado.' })
    estado: Estado;

    @Type(() => Date)
    @MinDate(() => new Date(), { message: 'La fecha no puede ser menor a hoy' })
    @IsDate({ message: 'La fecha de manteninento debe válida' })
    date_mantenimiento: Date;

    @IsNotEmpty({ message: 'Las observación no puede estar vacío' })
    observaciones: string;

    @IsNotEmpty({ message: 'La maquina es requerida' })
    maquina_id: string;
}
