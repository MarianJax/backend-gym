import { Transform } from "class-transformer";
import { IsDate, IsMilitaryTime, IsNotEmpty, MinDate } from "class-validator";

export class CreateHorarioEmpleadoDto {

    @IsDate({ message: 'La fecha ingresada no es válida' })
    @Transform(({ value }) => new Date(value + 'T05:00:00.000Z'))
    @MinDate(new Date(), { message: 'La fecha no puede ser menor a la fecha actual' })
    fecha: Date;

    @IsNotEmpty({ message: 'La franja de hora de inicio es requerida' })
    @IsMilitaryTime({ message: 'La franja de hora de inicio debe ser una hora válida' })
    franja_hora_inicio: string;

    @IsNotEmpty({ message: 'La franja de hora de fin es requerida' })
    @IsMilitaryTime({ message: 'La franja de hora de fin debe ser una hora válida' })
    franja_hora_fin: string;

    @IsNotEmpty({ message: 'El entrenador es requerido' })
    entrenador_id: string;
}
