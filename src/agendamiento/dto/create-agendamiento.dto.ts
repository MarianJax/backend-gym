import { Transform } from "class-transformer";
import { IsDate, IsMilitaryTime, IsNotEmpty } from "class-validator";

export class CreateAgendamientoDto {
    @IsDate({ message: 'La fecha ingresada no es válida' })
    @Transform(({ value }) => new Date(value + 'T05:00:00.000Z'))
    fecha: Date;

    @IsNotEmpty({ message: 'El usuario es requerido' })
    usuario_id: string;

    @IsMilitaryTime({ message: 'La hora de inicio debe ser una hora válida' })
    @IsNotEmpty({ message: 'La hora de inicio es requerida' })
    hora_inicio: Date;

    @IsMilitaryTime({ message: 'La hora de fin debe ser una hora válida' })
    @IsNotEmpty({ message: 'La hora de fin es requerida' })
    hora_fin: Date;

    @IsNotEmpty({ message: 'La membresía es requerida' })
    membresia_id: string;

}
