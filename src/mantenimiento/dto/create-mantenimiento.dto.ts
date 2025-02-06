import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, MinDate } from "class-validator";
import { Estado } from "../entities/mantenimiento.entity";

export class CreateMantenimientoDto {
    @IsEnum(Estado, { message: 'El estado del mantenimiento inválido. Debe ser uno de los valores: Pendiente, En proceso o Finalizado.' })
    @IsNotEmpty({ message: 'El estado del mantenimiento es requerido' })
    estado: Estado;

    @IsDate({ message: 'La fecha de mantenimiento ingresada no es válida' })
    @Transform(({ value }) => new Date(value + 'T05:00:00.000Z'))
    @MinDate(new Date(), { message: 'La fecha del mantenimiento no puede ser menor a la fecha actual' })
    fecha_mantenimiento: Date;

    @IsNotEmpty({ message: 'Las observación no puede estar vacío' })
    observaciones: string;

    @IsNotEmpty({ message: 'La máquina es requerida' })
    maquina_id: string;
}
