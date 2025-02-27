import { IsISO8601, IsMilitaryTime, IsNotEmpty, MinDate } from "class-validator";

export class CreateAgendamientoDto {
    @IsISO8601()
    @MinDate(new Date(), { message: 'La fecha no puede ser menor a la fecha actual' })
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

    @IsNotEmpty({ message: 'La membresía es requerida' })
    pago_id: string;

    @IsNotEmpty({ message: 'El rol es necesario' })
    rol: string;

}
